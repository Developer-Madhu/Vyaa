import { Router } from "express";
import { supabase } from "../services/supabase.js";
import { razorpay, verifyPaymentSignature } from "../services/razorpay.js";
import { sendEmail, orderConfirmationEmail } from "../services/resend.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { checkoutInitSchema, checkoutVerifySchema } from "../validators/index.js";
import crypto from "crypto";
const router = Router();
const rawBodyMiddleware = (req, _res, next) => {
    let data = "";
    req.on("data", (chunk) => {
        data += chunk;
    });
    req.on("end", () => {
        req.rawBody = data;
        next();
    });
};
router.use(requireAuth);
router.post("/init", validate(checkoutInitSchema), async (req, res) => {
    const { address_id, coupon_code } = req.body;
    const { data: cartItems, error: cartError } = await supabase
        .from("cart_items")
        .select("*, product:products(id, name, price)")
        .eq("user_id", req.userId);
    if (cartError || !cartItems || cartItems.length === 0) {
        res.status(400).json({ message: "Cart is empty" });
        return;
    }
    // Stale Price Validation - Re-fetch current prices from database
    const productIds = cartItems.map((item) => item.product_id);
    const { data: currentProducts, error: productsError } = await supabase
        .from("products")
        .select("id, price")
        .in("id", productIds)
        .eq("is_active", true);
    if (productsError) {
        res.status(500).json({ message: productsError.message });
        return;
    }
    const currentPrices = new Map();
    (currentProducts || []).forEach((product) => {
        currentPrices.set(product.id, product.price);
    });
    // Validate prices and calculate subtotal with current prices
    let subtotal = 0;
    for (const item of cartItems) {
        const currentPrice = currentPrices.get(item.product_id);
        if (!currentPrice) {
            res.status(400).json({ message: `Product ${item.product_id} is no longer available` });
            return;
        }
        subtotal += currentPrice * item.quantity;
    }
    let shipping = 0;
    if (subtotal < 5000)
        shipping = 199;
    let discount = 0;
    if (coupon_code) {
        const { data: coupon } = await supabase
            .from("coupons")
            .select("*")
            .eq("code", coupon_code.toUpperCase())
            .eq("is_active", true)
            .single();
        if (coupon &&
            subtotal >= coupon.min_amount &&
            (!coupon.max_uses || coupon.used_count < coupon.max_uses) &&
            (!coupon.expires_at || new Date(coupon.expires_at) > new Date())) {
            discount = coupon.type === "percentage" ? Math.round(subtotal * coupon.value / 100) : coupon.value;
            await supabase
                .from("coupons")
                .update({ used_count: coupon.used_count + 1 })
                .eq("id", coupon.id);
        }
    }
    const total = Math.max(0, subtotal + shipping - discount);
    // Stock Check before Razorpay order_id generation
    for (const item of cartItems) {
        const { data: sizeData } = await supabase
            .from("product_sizes")
            .select("inventory")
            .eq("product_id", item.product_id)
            .eq("size", item.size)
            .single();
        if (!sizeData || sizeData.inventory < item.quantity) {
            res.status(400).json({ message: `Insufficient stock for product ${item.product_id}, size ${item.size}` });
            return;
        }
    }
    // Idempotency - Check if this request has already been processed
    const idempotencyKey = req.headers['idempotency-key'];
    if (idempotencyKey) {
        const { data: existingOrder } = await supabase
            .from("orders")
            .select("id, razorpay_order_id, status, total")
            .eq("user_id", req.userId)
            .eq("payment_id", idempotencyKey)
            .single();
        if (existingOrder) {
            res.json({
                order_id: existingOrder.id,
                razorpay_order_id: existingOrder.razorpay_order_id,
                amount: existingOrder.total || 0,
                status: existingOrder.status,
            });
            return;
        }
    }
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;
    const razorpayOrder = await razorpay.orders.create({
        amount: total * 100,
        currency: "INR",
        receipt: orderNumber,
    });
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
        user_id: req.userId,
        order_number: orderNumber,
        status: "PENDING",
        subtotal,
        shipping,
        total,
        payment_id: razorpayOrder.id,
        payment_status: "pending",
        shipping_address_id: address_id,
    })
        .select()
        .single();
    if (orderError) {
        res.status(500).json({ message: orderError.message });
        return;
    }
    // Store idempotency key if provided
    if (idempotencyKey) {
        await supabase
            .from("orders")
            .update({ payment_id: idempotencyKey })
            .eq("id", order.id);
    }
    const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        size: item.size,
        quantity: item.quantity,
        price: currentPrices.get(item.product_id),
    }));
    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) {
        await supabase.from("orders").delete().eq("id", order.id);
        res.status(500).json({ message: itemsError.message });
        return;
    }
    await supabase.from("cart_items").delete().eq("user_id", req.userId);
    res.json({
        order_id: order.id,
        razorpay_order_id: razorpayOrder.id,
        amount: total,
    });
});
router.post("/verify", validate(checkoutVerifySchema), async (req, res) => {
    const { order_id, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const isValid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    if (!isValid) {
        res.status(400).json({
            message: "Payment verification failed",
            error_code: "INVALID_SIGNATURE",
            error_description: "The payment signature verification failed. Please try again or contact support."
        });
        return;
    }
    const { data: order } = await supabase
        .from("orders")
        .select("*, items:order_items(*)")
        .eq("id", order_id)
        .eq("user_id", req.userId)
        .single();
    if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
    }
    await supabase
        .from("orders")
        .update({
        status: "PAID",
        payment_status: "completed",
        updated_at: new Date().toISOString(),
    })
        .eq("id", order_id);
    for (const item of order.items) {
        await supabase.rpc("decrement_inventory", {
            p_product_id: item.product_id,
            p_size: item.size,
            p_quantity: item.quantity,
        });
    }
    const { data: user } = await supabase
        .from("users")
        .select("name, email")
        .eq("id", req.userId)
        .single();
    try {
        const emailHtml = orderConfirmationEmail(user?.name || "Valued Customer", order.order_number, order.items.map((i) => ({
            name: i.product_id,
            size: i.size,
            quantity: i.quantity,
            price: i.price,
        })), order.total);
        await sendEmail({
            to: req.userEmail,
            subject: `Order Confirmed - ${order.order_number}`,
            html: emailHtml,
        });
    }
    catch (e) {
        console.error("Failed to send confirmation email:", e);
    }
    res.json({ success: true, order_id: order.id });
});
// Webhook listener for Razorpay payment.captured
router.post("/webhook/razorpay", rawBodyMiddleware, async (req, res) => {
    const signature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!signature || !webhookSecret) {
        return res.status(400).json({ message: "Missing signature or webhook secret" });
    }
    const rawBody = req.rawBody;
    const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");
    if (signature !== expectedSignature) {
        return res.status(400).json({ message: "Invalid signature" });
    }
    const { event, payload } = JSON.parse(rawBody);
    if (event === "payment.captured") {
        const payment = payload.payment.entity;
        const orderId = payment.order_id;
        const { data: order } = await supabase
            .from("orders")
            .select("*, items:order_items(*)")
            .eq("payment_id", orderId)
            .single();
        if (!order) {
            console.error("Order not found for payment:", orderId);
            return res.status(404).json({ message: "Order not found" });
        }
        if (order.status === "PAID") {
            return res.json({ message: "Order already paid" });
        }
        await supabase
            .from("orders")
            .update({
            status: "PAID",
            payment_status: "completed",
            updated_at: new Date().toISOString(),
        })
            .eq("id", order.id);
        for (const item of order.items) {
            await supabase.rpc("decrement_inventory", {
                p_product_id: item.product_id,
                p_size: item.size,
                p_quantity: item.quantity,
            });
        }
        const { data: user } = await supabase
            .from("users")
            .select("name, email")
            .eq("id", order.user_id)
            .single();
        try {
            const emailHtml = orderConfirmationEmail(user?.name || "Valued Customer", order.order_number, order.items.map((i) => ({
                name: i.product_id,
                size: i.size,
                quantity: i.quantity,
                price: i.price,
            })), order.total);
            await sendEmail({
                to: user?.email || "",
                subject: `Order Confirmed - ${order.order_number}`,
                html: emailHtml,
            });
        }
        catch (e) {
            console.error("Failed to send confirmation email:", e);
        }
        console.log(`Payment captured for order: ${order.id}`);
    }
    res.json({ message: "Webhook processed successfully" });
});
export default router;
//# sourceMappingURL=checkout.js.map