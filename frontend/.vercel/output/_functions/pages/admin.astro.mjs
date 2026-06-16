import { e as createComponent, l as renderHead, n as renderSlot, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_BnMUGTBB.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                 */
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { TrendingUp, Package, Users, DollarSign, Search, Bell, Settings, Plus, X } from 'lucide-react';
import { a as api } from '../chunks/api_DR85031W.mjs';
export { renderers } from '../renderers.mjs';

const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>VYAA — Admin</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "D:/Vyaa/frontend/src/layouts/AdminLayout.astro", void 0);

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: TrendingUp },
  { id: "products", label: "Products", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
  { id: "orders", label: "Orders", icon: DollarSign }
];
const ORDER_STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-purple-100 text-purple-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-700"
};
function formatPrice(paise) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(paise);
}
function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("vyaa-token");
    if (!token) {
      window.location.href = "/account";
      return;
    }
    api.auth.me().then((data) => {
      if (data.role !== "admin") {
        window.location.href = "/";
      } else {
        setAuthorized(true);
      }
    }).catch(() => {
      window.location.href = "/account";
    });
  }, []);
  useEffect(() => {
    if (!authorized) return;
    fetchDashboard();
    fetchProducts();
    fetchCustomers();
    fetchOrders();
    fetchCategories();
  }, [authorized]);
  async function fetchDashboard() {
    try {
      const data = await api.admin.dashboard();
      setDashboard(data);
    } catch (e) {
      console.error("Failed to fetch dashboard:", e);
    }
  }
  async function fetchProducts() {
    try {
      const data = await api.admin.products.list();
      setProducts(data);
    } catch (e) {
      console.error("Failed to fetch products:", e);
    }
  }
  async function fetchCustomers() {
    try {
      const data = await api.admin.customers.list();
      setCustomers(data);
    } catch (e) {
      console.error("Failed to fetch customers:", e);
    }
  }
  async function fetchOrders() {
    try {
      const data = await api.admin.orders.list();
      setOrders(data);
    } catch (e) {
      console.error("Failed to fetch orders:", e);
    }
  }
  async function fetchCategories() {
    try {
      const data = await api.admin.categories.list();
      setCategories(data);
    } catch (e) {
      console.error("Failed to fetch categories:", e);
    }
  }
  useEffect(() => {
    if (authorized) setLoading(false);
  }, [authorized]);
  if (authorized === null || loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Loading..." }) });
  }
  const avgOrderValue = dashboard && dashboard.orders_count > 0 ? Math.round(dashboard.total_revenue / dashboard.orders_count) : 0;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-muted flex", children: [
    /* @__PURE__ */ jsxs("aside", { className: "w-64 bg-background border-r border-border hidden md:flex flex-col pt-8 px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-4 mb-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-heading font-medium", children: "VYAA" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Admin Panel" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "flex-1 space-y-1", children: TABS.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setActiveTab(id),
          className: `w-full flex items-center space-x-3 px-4 py-3 rounded-[12px] text-sm transition-colors ${activeTab === id ? "bg-accent/15 text-accent font-medium" : "text-foreground hover:bg-muted"}`,
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: label })
          ]
        },
        id
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col min-h-screen", children: [
      /* @__PURE__ */ jsxs("header", { className: "bg-background border-b border-border px-6 py-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-80", children: [
          /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search...",
              className: "w-full pl-9 pr-4 py-2 bg-input-background rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsxs("button", { className: "relative p-2 hover:bg-muted rounded-full transition-colors", children: [
            /* @__PURE__ */ jsx(Bell, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { className: "absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "p-2 hover:bg-muted rounded-full transition-colors", children: /* @__PURE__ */ jsx(Settings, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-accent", children: "A" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 p-6", children: [
        activeTab === "dashboard" && /* @__PURE__ */ jsx(DashboardTab, { data: dashboard, avgOrderValue }),
        activeTab === "products" && /* @__PURE__ */ jsx(
          ProductsTab,
          {
            products,
            categories,
            showAddProduct,
            setShowAddProduct,
            onProductAdded: fetchProducts
          }
        ),
        activeTab === "customers" && /* @__PURE__ */ jsx(CustomersTab, { customers }),
        activeTab === "orders" && /* @__PURE__ */ jsx(OrdersTab, { orders })
      ] })
    ] })
  ] });
}
function DashboardTab({ data, avgOrderValue }) {
  const stats = [
    { label: "Revenue", value: data ? formatPrice(data.total_revenue) : "—", icon: TrendingUp },
    { label: "Orders", value: data ? String(data.orders_count) : "—", icon: Package },
    { label: "Customers", value: data ? String(data.customers_count) : "—", icon: Users },
    { label: "Avg. Order Value", value: data ? formatPrice(avgOrderValue) : "—", icon: DollarSign }
  ];
  const recent = data?.recent_orders || [];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl font-medium mb-6", children: "Dashboard Overview" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: stats.map((stat) => /* @__PURE__ */ jsxs("div", { className: "bg-background border border-border rounded-[16px] p-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-between items-start mb-4", children: /* @__PURE__ */ jsx(stat.icon, { className: "w-5 h-5 text-muted-foreground" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl font-medium", children: stat.value }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: stat.label })
    ] }, stat.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-background border border-border rounded-[16px] overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-b border-border flex justify-between items-center", children: /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "Recent Orders" }) }),
      recent.length > 0 ? /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border text-muted-foreground", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Order" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Customer" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Total" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: recent.map((row) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-b-0", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: row.order_number }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: row.user?.name || "—" }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs rounded-full ${ORDER_STATUS_COLORS[row.status] || "bg-gray-100 text-gray-700"}`, children: row.status }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: formatPrice(row.total) })
        ] }, row.id)) })
      ] }) : /* @__PURE__ */ jsx("div", { className: "p-6 text-center text-muted-foreground text-sm", children: "No orders yet." })
    ] })
  ] });
}
function ProductsTab({
  products,
  categories,
  showAddProduct,
  setShowAddProduct,
  onProductAdded
}) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    original_price: "",
    color: "",
    category_id: "",
    status: "draft",
    images: [{ url: "", alt_text: "", sort_order: 0 }],
    sizes: [{ size: "M", inventory: 0 }]
  });
  const [submitting, setSubmitting] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.slug || !form.price || !form.category_id) return;
    setSubmitting(true);
    try {
      await api.admin.products.create({
        name: form.name,
        slug: form.slug,
        description: form.description,
        price: Number(form.price),
        original_price: form.original_price ? Number(form.original_price) : null,
        color: form.color,
        category_id: form.category_id,
        status: form.status,
        images: form.images.filter((i) => i.url),
        sizes: form.sizes.filter((s) => s.inventory > 0)
      });
      setShowAddProduct(false);
      setForm({
        name: "",
        slug: "",
        description: "",
        price: "",
        original_price: "",
        color: "",
        category_id: "",
        status: "draft",
        images: [{ url: "", alt_text: "", sort_order: 0 }],
        sizes: [{ size: "M", inventory: 0 }]
      });
      onProductAdded();
    } catch (e2) {
      console.error("Failed to create product:", e2);
      alert("Failed to create product");
    } finally {
      setSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl font-medium", children: "Products" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setShowAddProduct(true),
          className: "bg-primary text-primary-foreground px-4 py-2 rounded-[16px] text-sm font-medium flex items-center space-x-2",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "Add Product" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-background border border-border rounded-[16px] overflow-hidden", children: products.length > 0 ? /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border text-muted-foreground", children: [
        /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Product" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Category" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Price" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Stock" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: products.map((p) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-b-0", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium", children: p.name }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-muted-foreground", children: p.category?.name || "—" }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: formatPrice(p.price) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: p.sizes?.reduce((a, s) => a + s.inventory, 0) < 10 ? "text-red-600" : "text-green-600", children: p.sizes?.reduce((a, s) => a + s.inventory, 0) || 0 }) })
      ] }, p.id)) })
    ] }) : /* @__PURE__ */ jsx("div", { className: "p-6 text-center text-muted-foreground text-sm", children: "No products yet." }) }),
    showAddProduct && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-background rounded-[16px] w-full max-w-2xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b border-border", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium", children: "Add Product" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setShowAddProduct(false), className: "p-1 hover:bg-muted rounded-full", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground mb-1 block", children: "Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                required: true,
                value: form.name,
                onChange: (e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }),
                className: "w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground mb-1 block", children: "Slug" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                required: true,
                value: form.slug,
                onChange: (e) => setForm({ ...form, slug: e.target.value }),
                className: "w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground mb-1 block", children: "Description" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: form.description,
                onChange: (e) => setForm({ ...form, description: e.target.value }),
                className: "w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground h-20"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground mb-1 block", children: "Price (paise)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                required: true,
                type: "number",
                value: form.price,
                onChange: (e) => setForm({ ...form, price: e.target.value }),
                className: "w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground mb-1 block", children: "Original Price" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: form.original_price,
                onChange: (e) => setForm({ ...form, original_price: e.target.value }),
                className: "w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground mb-1 block", children: "Color" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                value: form.color,
                onChange: (e) => setForm({ ...form, color: e.target.value }),
                className: "w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground mb-1 block", children: "Category" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                required: true,
                value: form.category_id,
                onChange: (e) => setForm({ ...form, category_id: e.target.value }),
                className: "w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select category" }),
                  categories.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name }, c.id))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground mb-1 block", children: "Status" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: form.status,
                onChange: (e) => setForm({ ...form, status: e.target.value }),
                className: "w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "draft", children: "Draft" }),
                  /* @__PURE__ */ jsx("option", { value: "active", children: "Active" }),
                  /* @__PURE__ */ jsx("option", { value: "archived", children: "Archived" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground mb-2 block", children: "Images" }),
          form.images.map((img, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-2", children: [
            /* @__PURE__ */ jsx("input", { placeholder: "Image URL", value: img.url, onChange: (e) => {
              const imgs = [...form.images];
              imgs[i] = { ...img, url: e.target.value };
              setForm({ ...form, images: imgs });
            }, className: "flex-1 bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground" }),
            /* @__PURE__ */ jsx("input", { placeholder: "Alt text", value: img.alt_text, onChange: (e) => {
              const imgs = [...form.images];
              imgs[i] = { ...img, alt_text: e.target.value };
              setForm({ ...form, images: imgs });
            }, className: "w-40 bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground" }),
            i === form.images.length - 1 ? /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setForm({ ...form, images: [...form.images, { url: "", alt_text: "", sort_order: form.images.length }] }),
                className: "px-3 py-2 border border-border rounded-[8px] text-sm hover:bg-muted",
                children: "+"
              }
            ) : /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setForm({ ...form, images: form.images.filter((_, j) => j !== i) }),
                className: "px-3 py-2 border border-border rounded-[8px] text-sm hover:bg-muted text-red-500",
                children: "X"
              }
            )
          ] }, i))
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground mb-2 block", children: "Sizes" }),
          form.sizes.map((sz, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-2", children: [
            /* @__PURE__ */ jsx("select", { value: sz.size, onChange: (e) => {
              const sizes = [...form.sizes];
              sizes[i] = { ...sz, size: e.target.value };
              setForm({ ...form, sizes });
            }, className: "w-20 bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground", children: ["S", "M", "L", "XL"].map((s) => /* @__PURE__ */ jsx("option", { value: s, children: s }, s)) }),
            /* @__PURE__ */ jsx("input", { type: "number", placeholder: "Inventory", value: sz.inventory, onChange: (e) => {
              const sizes = [...form.sizes];
              sizes[i] = { ...sz, inventory: Number(e.target.value) };
              setForm({ ...form, sizes });
            }, className: "w-24 bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground" }),
            i === form.sizes.length - 1 ? /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setForm({ ...form, sizes: [...form.sizes, { size: "L", inventory: 0 }] }),
                className: "px-3 py-2 border border-border rounded-[8px] text-sm hover:bg-muted",
                children: "+"
              }
            ) : /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setForm({ ...form, sizes: form.sizes.filter((_, j) => j !== i) }),
                className: "px-3 py-2 border border-border rounded-[8px] text-sm hover:bg-muted text-red-500",
                children: "X"
              }
            )
          ] }, i))
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-3 pt-4 border-t border-border", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowAddProduct(false),
              className: "px-4 py-2 border border-border rounded-[16px] text-sm font-medium hover:bg-muted",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: submitting,
              className: "bg-primary text-primary-foreground px-6 py-2 rounded-[16px] text-sm font-medium disabled:opacity-50",
              children: submitting ? "Creating..." : "Create Product"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
function CustomersTab({ customers }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl font-medium mb-6", children: "Customers" }),
    customers.length > 0 ? /* @__PURE__ */ jsx("div", { className: "bg-background border border-border rounded-[16px] overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border text-muted-foreground", children: [
        /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Name" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Orders" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Joined" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: customers.map((c) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-b-0", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium", children: c.name || "—" }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-muted-foreground", children: c.email || "—" }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: c.orders_count ?? 0 }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-muted-foreground", children: c.created_at ? new Date(c.created_at).toLocaleDateString() : "—" })
      ] }, c.id)) })
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "p-6 text-center text-muted-foreground text-sm bg-background border border-border rounded-[16px]", children: "No customers yet." })
  ] });
}
function OrdersTab({ orders }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl font-medium mb-6", children: "Orders" }),
    orders.length > 0 ? /* @__PURE__ */ jsx("div", { className: "bg-background border border-border rounded-[16px] overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border text-muted-foreground", children: [
        /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Order" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Customer" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Date" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Total" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: orders.map((o) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-b-0", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: o.order_number }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: o.user?.name || "—" }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-muted-foreground", children: new Date(o.created_at).toLocaleDateString() }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs rounded-full ${ORDER_STATUS_COLORS[o.status] || "bg-gray-100 text-gray-700"}`, children: o.status }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: formatPrice(o.total) })
      ] }, o.id)) })
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "p-6 text-center text-muted-foreground text-sm bg-background border border-border rounded-[16px]", children: "No orders yet." })
  ] });
}

const $$Admin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Admin", Admin, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Vyaa/frontend/src/islands/Admin", "client:component-export": "Admin" })} ` })}`;
}, "D:/Vyaa/frontend/src/pages/admin.astro", void 0);

const $$file = "D:/Vyaa/frontend/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
