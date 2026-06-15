const API_BASE = import.meta.env.PUBLIC_API_URL || "http://localhost:3001/api";

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("vyaa-token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  products: {
    list: (params?: Record<string, string>) => {
      const qs = params ? `?${new URLSearchParams(params)}` : "";
      return request<{ products: any[]; total: number }>(`/products${qs}`);
    },
    get: (slug: string) => request<any>(`/products/${slug}`),
  },
  categories: {
    list: () => request<any[]>("/categories"),
  },
  cart: {
    get: () => request<any>("/cart"),
    addItem: (data: { product_id: string; size: string; quantity: number }) =>
      request<any>("/cart/items", { method: "POST", body: JSON.stringify(data) }),
    updateItem: (id: string, data: { quantity: number }) =>
      request<any>(`/cart/items/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    removeItem: (id: string) =>
      request<void>(`/cart/items/${id}`, { method: "DELETE" }),
  },
  wishlist: {
    list: () => request<any[]>("/wishlist"),
    add: (productId: string) =>
      request<any>("/wishlist", { method: "POST", body: JSON.stringify({ product_id: productId }) }),
    remove: (productId: string) =>
      request<void>(`/wishlist/${productId}`, { method: "DELETE" }),
  },
  orders: {
    list: () => request<any[]>("/orders"),
    get: (id: string) => request<any>(`/orders/${id}`),
    create: (data: any) =>
      request<any>("/orders", { method: "POST", body: JSON.stringify(data) }),
  },
  checkout: {
    init: (data: any) =>
      request<{ order_id: string; razorpay_order_id: string; amount: number }>("/checkout/init", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    verify: (data: any) =>
      request<any>("/checkout/verify", { method: "POST", body: JSON.stringify(data) }),
  },
  coupons: {
    validate: (code: string, amount: number) =>
      request<any>("/coupons/validate", {
        method: "POST",
        body: JSON.stringify({ code, amount }),
      }),
  },
  admin: {
    dashboard: () => request<any>("/admin/dashboard"),
    products: {
      list: () => request<any[]>("/admin/products"),
      create: (data: any) =>
        request<any>("/admin/products", { method: "POST", body: JSON.stringify(data) }),
      update: (id: string, data: any) =>
        request<any>(`/admin/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
      delete: (id: string) =>
        request<void>(`/admin/products/${id}`, { method: "DELETE" }),
    },
    categories: {
      list: () => request<any[]>("/admin/categories"),
      create: (data: any) =>
        request<any>("/admin/categories", { method: "POST", body: JSON.stringify(data) }),
      update: (id: string, data: any) =>
        request<any>(`/admin/categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),
      delete: (id: string) =>
        request<void>(`/admin/categories/${id}`, { method: "DELETE" }),
    },
    orders: {
      list: () => request<any[]>("/admin/orders"),
      updateStatus: (id: string, status: string) =>
        request<any>(`/admin/orders/${id}/status`, {
          method: "PUT",
          body: JSON.stringify({ status }),
        }),
    },
    coupons: {
      list: () => request<any[]>("/admin/coupons"),
      create: (data: any) =>
        request<any>("/admin/coupons", { method: "POST", body: JSON.stringify(data) }),
      update: (id: string, data: any) =>
        request<any>(`/admin/coupons/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    },
    customers: {
      list: () => request<any[]>("/admin/customers"),
    },
  },
  auth: {
    register: (data: { email: string; password: string; name: string }) =>
      request<{ user: any; token: string }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    login: (data: { email: string; password: string }) =>
      request<{ user: any; token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    me: () => request<any>("/auth/me"),
    updateProfile: (data: { name?: string; phone?: string }) =>
      request<any>("/auth/me", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    forgotPassword: (email: string) =>
      request<void>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
  },
};
