import { useState, useEffect } from "react";
import { User, Package, Heart, MapPin, LogOut, Loader2 } from "lucide-react";
import { useStore } from "@nanostores/react";
import { $authToken, $user, logout } from "../store/authStore";
import { api } from "../lib/api";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "logout", label: "Logout", icon: LogOut },
] as const;

export function Account() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]["id"]>("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const token = useStore($authToken);
  const user = useStore($user);
  const [profile, setProfile] = useState<{ name: string; email: string; phone: string }>({
    name: "",
    email: "",
    phone: "",
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    if (token && user) {
      fetchProfile();
      fetchOrders();
      fetchAddresses();
    }
  }, [token, user]);

  async function fetchProfile() {
    try {
      const data = await api.auth.me();
      setProfile({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
      });
    } catch (e) {
      console.error("Failed to fetch profile:", e);
    } finally {
      setLoading(false);
    }
  }

  async function fetchOrders() {
    try {
      const data = await api.orders.list();
      setOrders(data);
    } catch (e) {
      console.error("Failed to fetch orders:", e);
    }
  }

  async function fetchAddresses() {
    try {
      const data = await api.auth.me();
      const { data: addrData } = await fetch(`${import.meta.env.PUBLIC_API_URL || "http://localhost:3001/api"}/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(r => r.json());
      setAddresses(addrData || []);
    } catch (e) {
      console.error("Failed to fetch addresses:", e);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await api.auth.updateProfile({
        name: profile.name,
        phone: profile.phone,
      });
      setMessage({ type: "success", text: "Profile updated successfully" });
    } catch (e: any) {
      setMessage({ type: "error", text: e.message || "Failed to update profile" });
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  useEffect(() => {
    if (!token || !user) {
      window.location.href = "/login";
    }
  }, [token, user]);

  if (!token || !user) {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
      <h1 className="font-heading text-4xl font-medium mb-12">My Account</h1>

      {message && (
        <div className={`mb-6 p-4 rounded-[12px] text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  if (id === "logout") handleLogout();
                  else setActiveTab(id);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-[12px] text-sm transition-colors whitespace-nowrap ${
                  activeTab === id
                    ? "bg-accent/15 text-accent font-medium"
                    : id === "logout"
                      ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                      : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="max-w-lg space-y-8">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">{profile.name || "—"}</h2>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-input-background border border-border rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    readOnly
                    className="w-full bg-muted/50 border border-border rounded-[12px] px-4 py-3 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-input-background border border-border rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-[16px] font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Save Changes"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <p className="text-sm text-muted-foreground mb-6">No orders yet.</p>
              ) : (
                orders.map((order: any) => (
                  <div key={order.id} className="border border-border rounded-[16px] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <p className="text-sm font-medium">{order.order_number}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Placed on {new Date(order.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-sm mt-4 font-medium">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(order.total)}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.status === "DELIVERED" ? "bg-green-100 text-green-700" :
                      order.status === "SHIPPED" ? "bg-blue-100 text-blue-700" :
                      order.status === "PROCESSING" ? "bg-purple-100 text-purple-700" :
                      order.status === "PAID" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="text-center py-16 text-muted-foreground">
              <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-sm">Your wishlist is empty.</p>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="space-y-6">
              {addresses.length === 0 ? (
                <p className="text-sm text-muted-foreground mb-6">No addresses saved.</p>
              ) : (
                addresses.map((addr: any) => (
                  <div key={addr.id} className="border border-border rounded-[16px] p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-sm font-medium">{addr.full_name}</h3>
                      {addr.is_default && (
                        <span className="text-[10px] bg-accent/15 text-accent px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {addr.street}<br />
                      {addr.city}, {addr.state} {addr.pincode}<br />
                      {addr.phone}
                    </p>
                  </div>
                ))
              )}
              <button className="w-full border border-dashed border-border rounded-[16px] py-4 text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
                + Add New Address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}