import { Request, Response, NextFunction } from "express";
import { supabase } from "../services/supabase.js";

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userEmail?: string;
  isAdmin?: boolean;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }

  req.userId = data.user.id;
  req.userEmail = data.user.email;

  const { data: meta } = await supabase
    .from("users")
    .select("role")
    .eq("id", data.user.id)
    .single();

  req.isAdmin = meta?.role === "admin";

  next();
}

export async function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  await requireAuth(req, res, () => {
    if (!req.isAdmin) {
      res.status(403).json({ message: "Admin access required" });
      return;
    }
    next();
  });
}
