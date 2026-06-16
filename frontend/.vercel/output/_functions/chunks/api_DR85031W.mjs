const API_BASE = "https://vyaa-backend.vercel.app/api";
async function request(endpoint, options = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("vyaa-token") : null;
  const headers = {
    "Content-Type": "application/json",
    ...token ? { Authorization: `Bearer ${token}` } : {},
    ...options.headers
  };
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }
  return res.json();
}
const api = {
  products: {
    list: (params) => {
      const qs = params ? `?${new URLSearchParams(params)}` : "";
      return request(`/products${qs}`);
    },
    get: (slug) => request(`/products/${slug}`)
  },
  categories: {
    list: () => request("/categories")
  },
  cart: {
    get: () => request("/cart"),
    addItem: (data) => request("/cart/items", { method: "POST", body: JSON.stringify(data) }),
    updateItem: (id, data) => request(`/cart/items/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    removeItem: (id) => request(`/cart/items/${id}`, { method: "DELETE" })
  },
  wishlist: {
    list: () => request("/wishlist"),
    add: (productId) => request("/wishlist", { method: "POST", body: JSON.stringify({ product_id: productId }) }),
    remove: (productId) => request(`/wishlist/${productId}`, { method: "DELETE" })
  },
  orders: {
    list: () => request("/orders"),
    get: (id) => request(`/orders/${id}`),
    create: (data) => request("/orders", { method: "POST", body: JSON.stringify(data) })
  },
  checkout: {
    init: (data) => request("/checkout/init", {
      method: "POST",
      body: JSON.stringify(data)
    }),
    verify: (data) => request("/checkout/verify", { method: "POST", body: JSON.stringify(data) })
  },
  coupons: {
    validate: (code, amount) => request("/coupons/validate", {
      method: "POST",
      body: JSON.stringify({ code, amount })
    })
  },
  admin: {
    dashboard: () => request("/admin/dashboard"),
    products: {
      list: () => request("/admin/products"),
      create: (data) => request("/admin/products", { method: "POST", body: JSON.stringify(data) }),
      update: (id, data) => request(`/admin/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
      delete: (id) => request(`/admin/products/${id}`, { method: "DELETE" })
    },
    categories: {
      list: () => request("/admin/categories"),
      create: (data) => request("/admin/categories", { method: "POST", body: JSON.stringify(data) }),
      update: (id, data) => request(`/admin/categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),
      delete: (id) => request(`/admin/categories/${id}`, { method: "DELETE" })
    },
    orders: {
      list: () => request("/admin/orders"),
      updateStatus: (id, status) => request(`/admin/orders/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status })
      })
    },
    coupons: {
      list: () => request("/admin/coupons"),
      create: (data) => request("/admin/coupons", { method: "POST", body: JSON.stringify(data) }),
      update: (id, data) => request(`/admin/coupons/${id}`, { method: "PUT", body: JSON.stringify(data) })
    },
    customers: {
      list: () => request("/admin/customers")
    }
  },
  auth: {
    register: (data) => request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data)
    }),
    login: (data) => request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data)
    }),
    me: () => request("/auth/me"),
    updateProfile: (data) => request("/auth/me", {
      method: "PUT",
      body: JSON.stringify(data)
    }),
    forgotPassword: (email) => request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email })
    })
  }
};

export { api as a };
