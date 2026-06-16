export declare const SIZES: readonly ["S", "M", "L", "XL"];
export type Size = (typeof SIZES)[number];
export declare const PRODUCT_STATUS: readonly ["active", "draft", "archived"];
export type ProductStatus = (typeof PRODUCT_STATUS)[number];
export declare const ORDER_STATUS: readonly ["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];
export type OrderStatus = (typeof ORDER_STATUS)[number];
export declare const COUPON_TYPES: readonly ["percentage", "fixed"];
export type CouponType = (typeof COUPON_TYPES)[number];
export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
}
export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    original_price: number | null;
    color: string;
    category_id: string;
    status: ProductStatus;
    created_at: string;
    updated_at: string;
}
export interface ProductImage {
    id: string;
    product_id: string;
    url: string;
    alt_text: string;
    sort_order: number;
}
export interface ProductSize {
    id: string;
    product_id: string;
    size: Size;
    inventory: number;
}
export interface Address {
    id: string;
    user_id: string;
    full_name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    is_default: boolean;
    created_at: string;
}
export interface CartItem {
    id: string;
    user_id: string;
    product_id: string;
    size: Size;
    quantity: number;
    created_at: string;
}
export interface Wishlist {
    id: string;
    user_id: string;
    product_id: string;
    created_at: string;
}
export interface Order {
    id: string;
    user_id: string;
    order_number: string;
    status: OrderStatus;
    subtotal: number;
    shipping: number;
    total: number;
    payment_id: string | null;
    payment_status: string;
    shipping_address_id: string | null;
    created_at: string;
    updated_at: string;
}
export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    size: Size;
    quantity: number;
    price: number;
}
export interface Coupon {
    id: string;
    code: string;
    type: CouponType;
    value: number;
    min_amount: number;
    max_uses: number | null;
    used_count: number;
    expires_at: string | null;
    is_active: boolean;
    created_at: string;
}
export interface AdminLog {
    id: string;
    user_id: string;
    action: string;
    entity: string;
    entity_id: string;
    metadata: Record<string, unknown> | null;
    created_at: string;
}
//# sourceMappingURL=index.d.ts.map