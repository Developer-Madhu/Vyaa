import { Router, Response } from "express";
import { supabase } from "../services/supabase.js";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, items:order_items(*)")
    .eq("user_id", req.userId)
    .order("created_at", { ascending: false });

  if (error) {
    res.status(500).json({ message: error.message });
    return;
  }

  res.json(data || []);
});

router.get("/:id", async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id as string;

  const { data, error } = await supabase
    .from("orders")
    .select("*, items:order_items(*)")
    .eq("id", id)
    .eq("user_id", req.userId)
    .single();

  if (error || !data) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  res.json(data);
});

export default router;
