import { useState, useEffect } from "react";
import {
  TrendingUp,
  Package,
  Users,
  DollarSign,
  Search,
  Bell,
  Settings,
  Plus,
  X,
} from "lucide-react";
import { api } from "../lib/api";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: TrendingUp },
  { id: "products", label: "Products", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
  { id: "orders", label: "Orders", icon: DollarSign },
] as const;

const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-purple-100 text-purple-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-700",
};

function formatPrice(paise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise);
}

interface DashboardData {
  total_revenue: number;
  orders_count: number;
  customers_count: number;
  recent_orders: any[];
  revenue_chart: { total: number; created_at: string }[];
}

export function Admin() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]["id"]>("dashboard");
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("vyaa-token");
    if (!token) {
      window.location.href = "/account";
      return;
    }
    // Verify token with backend and check admin role
    api.auth.me()
      .then((data) => {
        if (data.role !== "admin") {
          window.location.href = "/";
        } else {
          setAuthorized(true);
        }
      })
      .catch(() => {
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
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const avgOrderValue = dashboard && dashboard.orders_count > 0
    ? Math.round(dashboard.total_revenue / dashboard.orders_count)
    : 0;

  return (
    <div className="min-h-screen bg-muted flex">
      <aside className="w-64 bg-background border-r border-border hidden md:flex flex-col pt-8 px-4">
        <div className="px-4 mb-8">
          <h1 className="text-2xl font-heading font-medium">VYAA</h1>
          <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-[12px] text-sm transition-colors ${
                activeTab === id
                  ? "bg-accent/15 text-accent font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="relative w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 bg-input-background rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center">
              <span className="text-xs font-medium text-accent">A</span>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <DashboardTab data={dashboard} avgOrderValue={avgOrderValue} />
          )}
          {activeTab === "products" && (
            <ProductsTab
              products={products}
              categories={categories}
              showAddProduct={showAddProduct}
              setShowAddProduct={setShowAddProduct}
              onProductAdded={fetchProducts}
            />
          )}
          {activeTab === "customers" && (
            <CustomersTab customers={customers} />
          )}
          {activeTab === "orders" && (
            <OrdersTab orders={orders} />
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardTab({ data, avgOrderValue }: { data: DashboardData | null; avgOrderValue: number }) {
  const stats = [
    { label: "Revenue", value: data ? formatPrice(data.total_revenue) : "—", icon: TrendingUp },
    { label: "Orders", value: data ? String(data.orders_count) : "—", icon: Package },
    { label: "Customers", value: data ? String(data.customers_count) : "—", icon: Users },
    { label: "Avg. Order Value", value: data ? formatPrice(avgOrderValue) : "—", icon: DollarSign },
  ];

  const recent = data?.recent_orders || [];

  return (
    <div>
      <h2 className="font-heading text-2xl font-medium mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-background border border-border rounded-[16px] p-6">
            <div className="flex justify-between items-start mb-4">
              <stat.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-2xl font-medium">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-background border border-border rounded-[16px] overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
          <h3 className="font-medium">Recent Orders</h3>
        </div>
        {recent.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-6 py-3 font-medium">Order</th>
                <th className="text-left px-6 py-3 font-medium">Customer</th>
                <th className="text-left px-6 py-3 font-medium">Status</th>
                <th className="text-left px-6 py-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((row: any) => (
                <tr key={row.id} className="border-b border-border last:border-b-0">
                  <td className="px-6 py-4">{row.order_number}</td>
                  <td className="px-6 py-4">{row.user?.name || "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${ORDER_STATUS_COLORS[row.status] || "bg-gray-100 text-gray-700"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{formatPrice(row.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-center text-muted-foreground text-sm">No orders yet.</div>
        )}
      </div>
    </div>
  );
}

function ProductsTab({
  products,
  categories,
  showAddProduct,
  setShowAddProduct,
  onProductAdded,
}: {
  products: any[];
  categories: any[];
  showAddProduct: boolean;
  setShowAddProduct: (v: boolean) => void;
  onProductAdded: () => void;
}) {
  const [form, setForm] = useState({
    name: "", slug: "", description: "", price: "", original_price: "",
    color: "", category_id: "", status: "draft",
    images: [{ url: "", alt_text: "", sort_order: 0 }],
    sizes: [{ size: "M", inventory: 0 }],
  });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
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
        sizes: form.sizes.filter((s) => s.inventory > 0),
      });
      setShowAddProduct(false);
      setForm({
        name: "", slug: "", description: "", price: "", original_price: "",
        color: "", category_id: "", status: "draft",
        images: [{ url: "", alt_text: "", sort_order: 0 }],
        sizes: [{ size: "M", inventory: 0 }],
      });
      onProductAdded();
    } catch (e) {
      console.error("Failed to create product:", e);
      alert("Failed to create product");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-2xl font-medium">Products</h2>
        <button
          onClick={() => setShowAddProduct(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-[16px] text-sm font-medium flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-background border border-border rounded-[16px] overflow-hidden">
        {products.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-6 py-3 font-medium">Product</th>
                <th className="text-left px-6 py-3 font-medium">Category</th>
                <th className="text-left px-6 py-3 font-medium">Price</th>
                <th className="text-left px-6 py-3 font-medium">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: any) => (
                <tr key={p.id} className="border-b border-border last:border-b-0">
                  <td className="px-6 py-4 font-medium">{p.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{p.category?.name || "—"}</td>
                  <td className="px-6 py-4">{formatPrice(p.price)}</td>
                  <td className="px-6 py-4">
                    <span className={p.sizes?.reduce((a: number, s: any) => a + s.inventory, 0) < 10 ? "text-red-600" : "text-green-600"}>
                      {p.sizes?.reduce((a: number, s: any) => a + s.inventory, 0) || 0}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-center text-muted-foreground text-sm">No products yet.</div>
        )}
      </div>

      {showAddProduct && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-[16px] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-medium">Add Product</h3>
              <button onClick={() => setShowAddProduct(false)} className="p-1 hover:bg-muted rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs text-muted-foreground mb-1 block">Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })}
                    className="w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-muted-foreground mb-1 block">Slug</label>
                  <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-muted-foreground mb-1 block">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground h-20" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Price (paise)</label>
                  <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Original Price</label>
                  <input type="number" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })}
                    className="w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Color</label>
                  <input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Category</label>
                  <select required value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                    className="w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground">
                    <option value="">Select category</option>
                    {categories.map((c: any) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground">
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Images</label>
                {form.images.map((img, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input placeholder="Image URL" value={img.url} onChange={(e) => {
                      const imgs = [...form.images];
                      imgs[i] = { ...img, url: e.target.value };
                      setForm({ ...form, images: imgs });
                    }} className="flex-1 bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground" />
                    <input placeholder="Alt text" value={img.alt_text} onChange={(e) => {
                      const imgs = [...form.images];
                      imgs[i] = { ...img, alt_text: e.target.value };
                      setForm({ ...form, images: imgs });
                    }} className="w-40 bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground" />
                    {i === form.images.length - 1 ? (
                      <button type="button" onClick={() => setForm({ ...form, images: [...form.images, { url: "", alt_text: "", sort_order: form.images.length }] })}
                        className="px-3 py-2 border border-border rounded-[8px] text-sm hover:bg-muted">+</button>
                    ) : (
                      <button type="button" onClick={() => setForm({ ...form, images: form.images.filter((_, j) => j !== i) })}
                        className="px-3 py-2 border border-border rounded-[8px] text-sm hover:bg-muted text-red-500">X</button>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Sizes</label>
                {form.sizes.map((sz, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <select value={sz.size} onChange={(e) => {
                      const sizes = [...form.sizes];
                      sizes[i] = { ...sz, size: e.target.value };
                      setForm({ ...form, sizes });
                    }} className="w-20 bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground">
                      {["S", "M", "L", "XL"].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <input type="number" placeholder="Inventory" value={sz.inventory} onChange={(e) => {
                      const sizes = [...form.sizes];
                      sizes[i] = { ...sz, inventory: Number(e.target.value) };
                      setForm({ ...form, sizes });
                    }} className="w-24 bg-input-background border border-border rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:border-foreground" />
                    {i === form.sizes.length - 1 ? (
                      <button type="button" onClick={() => setForm({ ...form, sizes: [...form.sizes, { size: "L", inventory: 0 }] })}
                        className="px-3 py-2 border border-border rounded-[8px] text-sm hover:bg-muted">+</button>
                    ) : (
                      <button type="button" onClick={() => setForm({ ...form, sizes: form.sizes.filter((_, j) => j !== i) })}
                        className="px-3 py-2 border border-border rounded-[8px] text-sm hover:bg-muted text-red-500">X</button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-border">
                <button type="button" onClick={() => setShowAddProduct(false)}
                  className="px-4 py-2 border border-border rounded-[16px] text-sm font-medium hover:bg-muted">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-[16px] text-sm font-medium disabled:opacity-50">
                  {submitting ? "Creating..." : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CustomersTab({ customers }: { customers: any[] }) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-medium mb-6">Customers</h2>
      {customers.length > 0 ? (
        <div className="bg-background border border-border rounded-[16px] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-6 py-3 font-medium">Name</th>
                <th className="text-left px-6 py-3 font-medium">Email</th>
                <th className="text-left px-6 py-3 font-medium">Orders</th>
                <th className="text-left px-6 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c: any) => (
                <tr key={c.id} className="border-b border-border last:border-b-0">
                  <td className="px-6 py-4 font-medium">{c.name || "—"}</td>
                  <td className="px-6 py-4 text-muted-foreground">{c.email || "—"}</td>
                  <td className="px-6 py-4">{c.orders_count ?? 0}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {c.created_at ? new Date(c.created_at).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-6 text-center text-muted-foreground text-sm bg-background border border-border rounded-[16px]">No customers yet.</div>
      )}
    </div>
  );
}

function OrdersTab({ orders }: { orders: any[] }) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-medium mb-6">Orders</h2>
      {orders.length > 0 ? (
        <div className="bg-background border border-border rounded-[16px] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-6 py-3 font-medium">Order</th>
                <th className="text-left px-6 py-3 font-medium">Customer</th>
                <th className="text-left px-6 py-3 font-medium">Date</th>
                <th className="text-left px-6 py-3 font-medium">Status</th>
                <th className="text-left px-6 py-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o: any) => (
                <tr key={o.id} className="border-b border-border last:border-b-0">
                  <td className="px-6 py-4">{o.order_number}</td>
                  <td className="px-6 py-4">{o.user?.name || "—"}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(o.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${ORDER_STATUS_COLORS[o.status] || "bg-gray-100 text-gray-700"}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{formatPrice(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-6 text-center text-muted-foreground text-sm bg-background border border-border rounded-[16px]">No orders yet.</div>
      )}
    </div>
  );
}
