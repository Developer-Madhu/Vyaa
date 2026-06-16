import { Router } from "express";
import { supabase } from "../services/supabase.js";
const router = Router();
router.get("/", async (_req, res) => {
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
export default router;
//# sourceMappingURL=categories.js.map