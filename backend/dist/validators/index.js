import { z } from "zod";
export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1),
});
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});
export const forgotPasswordSchema = z.object({
    email: z.string().email(),
});
export const productCreateSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().default(""),
    price: z.number().positive(),
    original_price: z.number().positive().nullable().optional(),
    color: z.string().default(""),
    category_id: z.string().uuid(),
    status: z.enum(["active", "draft", "archived"]).default("draft"),
    is_active: z.boolean().default(true),
    images: z
        .array(z.object({
        url: z.string().url(),
        alt_text: z.string().default(""),
        sort_order: z.number().int().min(0).default(0),
    }))
        .default([]),
    sizes: z
        .array(z.object({
        size: z.enum(["S", "M", "L", "XL"]),
        inventory: z.number().int().min(0).default(0),
    }))
        .default([]),
});
export const productUpdateSchema = productCreateSchema.partial();
export const cartItemSchema = z.object({
    product_id: z.string().uuid(),
    size: z.enum(["S", "M", "L", "XL"]),
    quantity: z.number().int().min(1).max(10),
});
export const cartItemUpdateSchema = z.object({
    quantity: z.number().int().min(1).max(10),
});
export const wishlistSchema = z.object({
    product_id: z.string().uuid(),
});
export const checkoutInitSchema = z.object({
    address_id: z.string().uuid(),
    coupon_code: z.string().optional(),
});
export const checkoutVerifySchema = z.object({
    order_id: z.string().uuid(),
    razorpay_order_id: z.string(),
    razorpay_payment_id: z.string(),
    razorpay_signature: z.string(),
});
export const couponValidateSchema = z.object({
    code: z.string().min(1),
    amount: z.number().positive(),
});
export const couponCreateSchema = z.object({
    code: z.string().min(1).transform((v) => v.toUpperCase()),
    type: z.enum(["percentage", "fixed"]),
    value: z.number().positive(),
    min_amount: z.number().min(0).default(0),
    max_uses: z.number().int().positive().nullable().optional(),
    expires_at: z.string().datetime().nullable().optional(),
});
export const orderStatusUpdateSchema = z.object({
    status: z.enum([
        "PENDING",
        "PAID",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
        "REFUNDED",
    ]),
});
export const categoryCreateSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().optional(),
    is_active: z.boolean().default(true),
});
export const updateProfileSchema = z.object({
    name: z.string().min(1).optional(),
    phone: z.string().optional(),
});
//# sourceMappingURL=index.js.map