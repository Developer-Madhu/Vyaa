import { Router } from "express";
import { supabase } from "../services/supabase.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { wishlistSchema } from "../validators/index.js";
const router = Router();
router.use(requireAuth);
router.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("wishlists")
        .select("*, product:products(name, price, images:product_images(url))")
        .eq("user_id", req.userId)
        .order("created_at", { ascending: false });
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    res.json(data || []);
});
router.post("/", validate(wishlistSchema), async (req, res) => {
    const { product_id } = req.body;
    const { data: existing } = await supabase
        .from("wishlists")
        .select("id")
        .eq("user_id", req.userId)
        .eq("product_id", product_id)
        .single();
    if (existing) {
        res.status(409).json({ message: "Product already in wishlist" });
        return;
    }
    const { data, error } = await supabase
        .from("wishlists")
        .insert({ user_id: req.userId, product_id })
        .select()
        .single();
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    res.status(201).json(data);
});
router.delete("/:productId", async (req, res) => {
    const productId = req.params.productId;
    const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("user_id", req.userId)
        .eq("product_id", productId);
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    res.status(204).end();
});
export default router;
//# sourceMappingURL=wishlist.js.map