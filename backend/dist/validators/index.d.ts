import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export declare const productCreateSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    price: z.ZodNumber;
    original_price: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    color: z.ZodDefault<z.ZodString>;
    category_id: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<["active", "draft", "archived"]>>;
    is_active: z.ZodDefault<z.ZodBoolean>;
    images: z.ZodDefault<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        alt_text: z.ZodDefault<z.ZodString>;
        sort_order: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        alt_text: string;
        sort_order: number;
    }, {
        url: string;
        alt_text?: string | undefined;
        sort_order?: number | undefined;
    }>, "many">>;
    sizes: z.ZodDefault<z.ZodArray<z.ZodObject<{
        size: z.ZodEnum<["S", "M", "L", "XL"]>;
        inventory: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        size: "S" | "M" | "L" | "XL";
        inventory: number;
    }, {
        size: "S" | "M" | "L" | "XL";
        inventory?: number | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    status: "active" | "draft" | "archived";
    slug: string;
    description: string;
    price: number;
    color: string;
    category_id: string;
    is_active: boolean;
    images: {
        url: string;
        alt_text: string;
        sort_order: number;
    }[];
    sizes: {
        size: "S" | "M" | "L" | "XL";
        inventory: number;
    }[];
    original_price?: number | null | undefined;
}, {
    name: string;
    slug: string;
    price: number;
    category_id: string;
    status?: "active" | "draft" | "archived" | undefined;
    description?: string | undefined;
    original_price?: number | null | undefined;
    color?: string | undefined;
    is_active?: boolean | undefined;
    images?: {
        url: string;
        alt_text?: string | undefined;
        sort_order?: number | undefined;
    }[] | undefined;
    sizes?: {
        size: "S" | "M" | "L" | "XL";
        inventory?: number | undefined;
    }[] | undefined;
}>;
export declare const productUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    price: z.ZodOptional<z.ZodNumber>;
    original_price: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    color: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    category_id: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "draft", "archived"]>>>;
    is_active: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    images: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        alt_text: z.ZodDefault<z.ZodString>;
        sort_order: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        alt_text: string;
        sort_order: number;
    }, {
        url: string;
        alt_text?: string | undefined;
        sort_order?: number | undefined;
    }>, "many">>>;
    sizes: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        size: z.ZodEnum<["S", "M", "L", "XL"]>;
        inventory: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        size: "S" | "M" | "L" | "XL";
        inventory: number;
    }, {
        size: "S" | "M" | "L" | "XL";
        inventory?: number | undefined;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    status?: "active" | "draft" | "archived" | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    price?: number | undefined;
    original_price?: number | null | undefined;
    color?: string | undefined;
    category_id?: string | undefined;
    is_active?: boolean | undefined;
    images?: {
        url: string;
        alt_text: string;
        sort_order: number;
    }[] | undefined;
    sizes?: {
        size: "S" | "M" | "L" | "XL";
        inventory: number;
    }[] | undefined;
}, {
    name?: string | undefined;
    status?: "active" | "draft" | "archived" | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    price?: number | undefined;
    original_price?: number | null | undefined;
    color?: string | undefined;
    category_id?: string | undefined;
    is_active?: boolean | undefined;
    images?: {
        url: string;
        alt_text?: string | undefined;
        sort_order?: number | undefined;
    }[] | undefined;
    sizes?: {
        size: "S" | "M" | "L" | "XL";
        inventory?: number | undefined;
    }[] | undefined;
}>;
export declare const cartItemSchema: z.ZodObject<{
    product_id: z.ZodString;
    size: z.ZodEnum<["S", "M", "L", "XL"]>;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    size: "S" | "M" | "L" | "XL";
    product_id: string;
    quantity: number;
}, {
    size: "S" | "M" | "L" | "XL";
    product_id: string;
    quantity: number;
}>;
export declare const cartItemUpdateSchema: z.ZodObject<{
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    quantity: number;
}, {
    quantity: number;
}>;
export declare const wishlistSchema: z.ZodObject<{
    product_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    product_id: string;
}, {
    product_id: string;
}>;
export declare const checkoutInitSchema: z.ZodObject<{
    address_id: z.ZodString;
    coupon_code: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    address_id: string;
    coupon_code?: string | undefined;
}, {
    address_id: string;
    coupon_code?: string | undefined;
}>;
export declare const checkoutVerifySchema: z.ZodObject<{
    order_id: z.ZodString;
    razorpay_order_id: z.ZodString;
    razorpay_payment_id: z.ZodString;
    razorpay_signature: z.ZodString;
}, "strip", z.ZodTypeAny, {
    order_id: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}, {
    order_id: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}>;
export declare const couponValidateSchema: z.ZodObject<{
    code: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    code: string;
    amount: number;
}, {
    code: string;
    amount: number;
}>;
export declare const couponCreateSchema: z.ZodObject<{
    code: z.ZodEffects<z.ZodString, string, string>;
    type: z.ZodEnum<["percentage", "fixed"]>;
    value: z.ZodNumber;
    min_amount: z.ZodDefault<z.ZodNumber>;
    max_uses: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    expires_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    value: number;
    code: string;
    type: "percentage" | "fixed";
    min_amount: number;
    max_uses?: number | null | undefined;
    expires_at?: string | null | undefined;
}, {
    value: number;
    code: string;
    type: "percentage" | "fixed";
    min_amount?: number | undefined;
    max_uses?: number | null | undefined;
    expires_at?: string | null | undefined;
}>;
export declare const orderStatusUpdateSchema: z.ZodObject<{
    status: z.ZodEnum<["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"]>;
}, "strip", z.ZodTypeAny, {
    status: "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
}, {
    status: "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
}>;
export declare const categoryCreateSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    is_active: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    is_active: boolean;
    description?: string | undefined;
}, {
    name: string;
    slug: string;
    description?: string | undefined;
    is_active?: boolean | undefined;
}>;
export declare const updateProfileSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    phone?: string | undefined;
}, {
    name?: string | undefined;
    phone?: string | undefined;
}>;
//# sourceMappingURL=index.d.ts.map