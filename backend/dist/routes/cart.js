import { Router } from "express";
import { supabase } from "../services/supabase.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { cartItemSchema, cartItemUpdateSchema } from "../validators/index.js";
const router = Router();
router.use(requireAuth);
router.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("cart_items")
        .select("*, product:products(id, name, price)")
        .eq("user_id", req.userId);
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    res.json(data || []);
});
router.post("/items", validate(cartItemSchema), async (req, res) => {
    const { product_id, size, quantity } = req.body;
    const { data: sizeData } = await supabase
        .from("product_sizes")
        .select("inventory")
        .eq("product_id", product_id)
        .eq("size", size)
        .single();
    if (!sizeData || sizeData.inventory < quantity) {
        res.status(400).json({ message: "Insufficient stock" });
        return;
    }
    const { data: existing } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", req.userId)
        .eq("product_id", product_id)
        .eq("size", size)
        .single();
    if (existing) {
        const newQty = Math.min(existing.quantity + quantity, 10);
        const { data, error } = await supabase
            .from("cart_items")
            .update({ quantity: newQty })
            .eq("id", existing.id)
            .select()
            .single();
        if (error) {
            res.status(500).json({ message: error.message });
            return;
        }
        res.json(data);
        return;
    }
    const { data, error } = await supabase
        .from("cart_items")
        .insert({ user_id: req.userId, product_id, size, quantity })
        .select()
        .single();
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    res.status(201).json(data);
});
router.put("/items/:id", validate(cartItemUpdateSchema), async (req, res) => {
    const id = req.params.id;
    const { quantity } = req.body;
    const { data: item } = await supabase
        .from("cart_items")
        .select("product_id, size")
        .eq("id", id)
        .eq("user_id", req.userId)
        .single();
    if (!item) {
        res.status(404).json({ message: "Cart item not found" });
        return;
    }
    const { data: sizeData } = await supabase
        .from("product_sizes")
        .select("inventory")
        .eq("product_id", item.product_id)
        .eq("size", item.size)
        .single();
    if (!sizeData || sizeData.inventory < quantity) {
        res.status(400).json({ message: "Insufficient stock" });
        return;
    }
    const { data, error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", id)
        .eq("user_id", req.userId)
        .select()
        .single();
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    res.json(data);
});
router.delete("/items/:id", async (req, res) => {
    const id = req.params.id;
    const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", id)
        .eq("user_id", req.userId);
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    res.status(204).end();
});
export default router;
//# sourceMappingURL=cart.js.map