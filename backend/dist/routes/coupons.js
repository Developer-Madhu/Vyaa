import { Router } from "express";
import { supabase } from "../services/supabase.js";
import { validate } from "../middleware/validate.js";
import { couponValidateSchema } from "../validators/index.js";
const router = Router();
router.post("/validate", validate(couponValidateSchema), async (req, res) => {
    const { code, amount } = req.body;
    const { data: coupon, error } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", code.toUpperCase())
        .eq("is_active", true)
        .single();
    if (error || !coupon) {
        res.status(404).json({ message: "Invalid coupon code" });
        return;
    }
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
        res.status(400).json({ message: "Coupon has expired" });
        return;
    }
    if (coupon.max_uses && coupon.used_count >= coupon.max_uses) {
        res.status(400).json({ message: "Coupon usage limit reached" });
        return;
    }
    if (amount < coupon.min_amount) {
        res.status(400).json({ message: `Minimum order amount of ₹${coupon.min_amount} required` });
        return;
    }
    const discount = coupon.type === "percentage"
        ? Math.round(amount * coupon.value / 100)
        : coupon.value;
    res.json({
        valid: true,
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discount: Math.min(discount, amount),
    });
});
export default router;
//# sourceMappingURL=coupons.js.map