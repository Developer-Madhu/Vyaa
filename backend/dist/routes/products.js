import { Router } from "express";
import { supabase } from "../services/supabase.js";
const router = Router();
router.get("/", async (req, res) => {
    const { category, search, sort, page = "1", limit = "12" } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;
    let query = supabase
        .from("products")
        .select("*, category:categories(name, slug), images:product_images(*), sizes:product_sizes(*)", { count: "exact" })
        .eq("status", "active")
        .eq("is_active", true);
    if (category) {
        query = query.eq("category_id", category);
    }
    if (search) {
        query = query.ilike("name", `%${search}%`);
    }
    switch (sort) {
        case "price_asc":
            query = query.order("price", { ascending: true });
            break;
        case "price_desc":
            query = query.order("price", { ascending: false });
            break;
        case "newest":
            query = query.order("created_at", { ascending: false });
            break;
        default:
            query = query.order("created_at", { ascending: false });
    }
    const { data, count, error } = await query.range(offset, offset + limitNum - 1);
    if (error) {
        res.status(500).json({ message: error.message });
        return;
    }
    res.json({
        products: data || [],
        total: count || 0,
        page: pageNum,
        limit: limitNum,
    });
});
router.get("/:slug", async (req, res) => {
    const { slug } = req.params;
    const { data: product, error } = await supabase
        .from("products")
        .select("*, category:categories(name, slug), images:product_images(*), sizes:product_sizes(*)")
        .eq("slug", slug)
        .eq("status", "active")
        .eq("is_active", true)
        .single();
    if (error || !product) {
        res.status(404).json({ message: "Product not found" });
        return;
    }
    res.json(product);
});
export default router;
//# sourceMappingURL=products.js.map