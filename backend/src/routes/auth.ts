import { Router, Request, Response } from "express";
import crypto from "crypto";
import { supabase, supabaseAnon } from "../services/supabase.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema, forgotPasswordSchema, updateProfileSchema } from "../validators/index.js";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth.js";

const router = Router();

router.post("/register", validate(registerSchema), async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const { data: authData, error: authError } = await supabaseAnon.auth.signUp({
    email,
    password,
  });

  if (authError) {
    res.status(400).json({ message: authError.message });
    return;
  }

  if (!authData.user) {
    res.status(500).json({ message: "Failed to create user" });
    return;
  }

  const { error: profileError } = await supabase.from("users").insert({
    id: authData.user.id,
    email,
    name,
    role: "customer",
  });

  if (profileError) {
    res.status(500).json({ message: profileError.message });
    return;
  }

  res.status(201).json({
    user: { id: authData.user.id, email, name, role: "customer" },
    token: authData.session?.access_token,
  });
});

router.post("/login", validate(loginSchema), async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await supabaseAnon.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const { data: profile } = await supabase
    .from("users")
    .select("name, role")
    .eq("id", data.user.id)
    .single();

  // Guest-to-User Cart Merge
  const guestCart = req.cookies?.guest_cart ? JSON.parse(req.cookies.guest_cart) : [];
  if (guestCart.length > 0) {
    const { data: existingItems } = await supabase
      .from("cart_items")
      .select("id, product_id, size, quantity")
      .eq("user_id", data.user.id);

    const existingMap = new Map();
    (existingItems || []).forEach((item) => {
      existingMap.set(`${item.product_id}-${item.size}`, item);
    });

    const mergedItems = [];
    for (const guestItem of guestCart) {
      const key = `${guestItem.product_id}-${guestItem.size}`;
      const existing = existingMap.get(key);

      if (existing) {
        const newQty = Math.min(existing.quantity + guestItem.quantity, 10);
        mergedItems.push({
          id: existing.id,
          user_id: data.user.id,
          product_id: guestItem.product_id,
          size: guestItem.size,
          quantity: newQty,
        });
      } else {
        mergedItems.push({
          id: crypto.randomUUID(),
          user_id: data.user.id,
          product_id: guestItem.product_id,
          size: guestItem.size,
          quantity: guestItem.quantity,
        });
      }
    }

    if (mergedItems.length > 0) {
      const { error: mergeError } = await supabase
        .from("cart_items")
        .upsert(mergedItems, { onConflict: "id" });

      if (mergeError) {
        console.error("Failed to merge guest cart:", mergeError.message);
      }
    }

    res.cookie("guest_cart", "", { maxAge: 0 });
  }

  res.json({
    user: {
      id: data.user.id,
      email: data.user.email,
      name: profile?.name || "",
      role: profile?.role || "customer",
    },
    token: data.session?.access_token,
  });
});

router.get("/me", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const { data: profile } = await supabase
    .from("users")
    .select("name, role")
    .eq("id", req.userId)
    .single();

  res.json({
    id: req.userId,
    email: req.userEmail,
    name: profile?.name || "",
    role: profile?.role || "customer",
  });
});

router.put("/me", requireAuth, validate(updateProfileSchema), async (req: AuthenticatedRequest, res: Response) => {
  const { name, phone } = req.body;

  const updates: Record<string, any> = {};
  if (name) updates.name = name;
  if (phone) updates.phone = phone;

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ message: "No valid fields to update" });
    return;
  }

  const { data: profile, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", req.userId)
    .select("name, role")
    .single();

  if (error) {
    res.status(500).json({ message: error.message });
    return;
  }

  res.json({
    id: req.userId,
    email: req.userEmail,
    name: profile?.name || "",
    role: profile?.role || "customer",
  });
});

router.post("/forgot-password", validate(forgotPasswordSchema), async (req: Request, res: Response) => {
  const { email } = req.body;

  const { error } = await supabaseAnon.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.FRONTEND_URL || "http://localhost:4321"}/account`,
  });

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  res.json({ message: "Password reset email sent" });
});

export default router;
