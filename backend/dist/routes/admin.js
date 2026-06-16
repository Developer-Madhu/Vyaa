import { Router } from "express";
import { supabase } from "../services/supabase.js";
import { requireAdmin } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { productCreateSchema, productUpdateSchema, categoryCreateSchema, couponCreateSchema, orderStatusUpdateSchema, } from "../validators/index.js";
const router = Router();
router.use(requireAdmin);
async function logAdminAction(userId, action, entity, entityId, metadata) {
    await supabase.from("admin_logs").insert({
        user_id: userId,
        action,
        entity,
        entity_id: entityId,
        metadata: metadata || null,
    });
}
// Dashboard
router.get("/dashboard", async (req, res) => {
    const { data: revenueData } = await supabase
        .from("orders")
        .select("total")
        .eq("status", "PAID")
        .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
    const totalRevenue = (revenueData || []).reduce((sum, o) => sum + o.total, 0);
    const { count: ordersCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true });
    const { count: customersCount } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("role", "customer");
    const { data: recentOrders } = await supabase
        .from("orders")
        .select("*, user:users(name)")
        .order("created_at", { ascending: false })
        .limit(10);
    const { data: revenueChart } = await supabase
        .from("orders")
        .select("total, created_at")
        .eq("status", "PAID")
        .order("created_at", { ascending: true })
        .limit(12);
    res.json({
        total_revenue: totalRevenue,
        orders_count: ordersCount || 0,
        customers_count: customersCount || 0,
        recent_orders: recentOrders || [],
        revenue_chart: revenueChart || [],
    });
});
// Products
router.get("/products", async (_req, res) => {
    const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(name), images:product_images(*), sizes:product_sizes(*)")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    res.json(data || []);
});
router.post("/products", validate(productCreateSchema), async (req, res) => {
    const { images, sizes, ...productData } = req.body;
    const { data: product, error: prodError } = await supabase
        .from("products")
        .insert(productData)
        .select()
        .single();
    if (prodError) {
        res.status(500).json({ message: prodError.message });
        return;
    }
    if (images.length > 0) {
        await supabase.from("product_images").insert(images.map((img) => ({ ...img, product_id: product.id })));
    }
    if (sizes.length > 0) {
        await supabase.from("product_sizes").insert(sizes.map((sz) => ({ ...sz, product_id: product.id })));
    }
    await logAdminAction(req.userId, "create", "product", product.id, productData);
    res.status(201).json(product);
});
router.put("/products/:id", validate(productUpdateSchema), async (req, res) => {
    const id = req.params.id;
    const { images, sizes, ...productData } = req.body;
    const { data: product, error: prodError } = await supabase
        .from("products")
        .update({ ...productData, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
    if (prodError) {
        res.status(500).json({ message: prodError.message });
        return;
    }
    if (images) {
        await supabase.from("product_images").delete().eq("product_id", id);
        await supabase.from("product_images").insert(images.map((img) => ({ ...img, product_id: id })));
    }
    if (sizes) {
        for (const sz of sizes) {
            await supabase
                .from("product_sizes")
                .upsert({ ...sz, product_id: id }, { onConflict: "product_id, size" });
        }
    }
    await logAdminAction(req.userId, "update", "product", id, productData);
    res.json(product);
});
router.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
    const { error } = await supabase
        .from("products")
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq("id", id);
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    await logAdminAction(req.userId, "soft_delete", "product", id);
    res.status(204).end();
});
// Categories
router.get("/categories", async (_req, res) => {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("name");
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    res.json(data || []);
});
router.post("/categories", validate(categoryCreateSchema), async (req, res) => {
    const { data, error } = await supabase
        .from("categories")
        .insert(req.body)
        .select()
        .single();
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    await logAdminAction(req.userId, "create", "category", data.id, req.body);
    res.status(201).json(data);
});
router.put("/categories/:id", validate(categoryCreateSchema), async (req, res) => {
    const id = req.params.id;
    const { data, error } = await supabase
        .from("categories")
        .update(req.body)
        .eq("id", id)
        .select()
        .single();
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    await logAdminAction(req.userId, "update", "category", id, req.body);
    res.json(data);
});
router.delete("/categories/:id", async (req, res) => {
    const id = req.params.id;
    const { error } = await supabase
        .from("categories")
        .update({ is_active: false })
        .eq("id", id);
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    await logAdminAction(req.userId, "soft_delete", "category", id);
    res.status(204).end();
});
// Orders
router.get("/orders", async (_req, res) => {
    const { data, error } = await supabase
        .from("orders")
        .select("*, items:order_items(*), user:users(name, email)")
        .order("created_at", { ascending: false });
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    res.json(data || []);
});
router.put("/orders/:id/status", validate(orderStatusUpdateSchema), async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    const { data: order } = await supabase
        .from("orders")
        .select("status")
        .eq("id", id)
        .single();
    if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
    }
    if (order.status === "PAID" && status === "PENDING") {
        res.status(400).json({ message: "Paid orders cannot revert to pending" });
        return;
    }
    const { data, error } = await supabase
        .from("orders")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    await logAdminAction(req.userId, "update_status", "order", id, { status });
    res.json(data);
});
// Coupons
router.get("/coupons", async (_req, res) => {
    const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    res.json(data || []);
});
router.post("/coupons", validate(couponCreateSchema), async (req, res) => {
    const { data, error } = await supabase
        .from("coupons")
        .insert(req.body)
        .select()
        .single();
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    await logAdminAction(req.userId, "create", "coupon", data.id, req.body);
    res.status(201).json(data);
});
router.put("/coupons/:id", validate(couponCreateSchema), async (req, res) => {
    const id = req.params.id;
    const { data, error } = await supabase
        .from("coupons")
        .update(req.body)
        .eq("id", id)
        .select()
        .single();
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    await logAdminAction(req.userId, "update", "coupon", id, req.body);
    res.json(data);
});
// Customers
router.get("/customers", async (_req, res) => {
    const { data, error } = await supabase
        .from("users")
        .select("id, name, email, created_at, role")
        .eq("role", "customer")
        .order("created_at", { ascending: false });
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    const customersWithOrders = await Promise.all((data || []).map(async (customer) => {
        const { count } = await supabase
            .from("orders")
            .select("*", { count: "exact", head: true })
            .eq("user_id", customer.id);
        return { ...customer, orders_count: count || 0 };
    }));
    res.json(customersWithOrders);
});
export default router;
//# sourceMappingURL=admin.js.map