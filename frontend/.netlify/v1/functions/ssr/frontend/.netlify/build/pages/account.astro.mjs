import { c as createComponent, i as renderComponent, r as renderTemplate } from '../chunks/astro/server_CW-lBEoZ.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_BCBVXyCX.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Loader2, User, Package, Heart, MapPin, LogOut } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { $ as $authToken, a as $user, l as logout } from '../chunks/authStore_L5dEO1VH.mjs';
import { a as api } from '../chunks/api_DR85031W.mjs';
export { renderers } from '../renderers.mjs';

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "logout", label: "Logout", icon: LogOut }
];
function Account() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const token = useStore($authToken);
  const user = useStore($user);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
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
        phone: data.phone || ""
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
      const { data: addrData } = await fetch(`${"https://vyaa-backend.vercel.app/api"}/addresses`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((r) => r.json());
      setAddresses(addrData || []);
    } catch (e) {
      console.error("Failed to fetch addresses:", e);
    }
  }
  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await api.auth.updateProfile({
        name: profile.name,
        phone: profile.phone
      });
      setMessage({ type: "success", text: "Profile updated successfully" });
    } catch (e2) {
      setMessage({ type: "error", text: e2.message || "Failed to update profile" });
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
    return /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin text-accent" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-heading text-4xl font-medium mb-12", children: "My Account" }),
    message && /* @__PURE__ */ jsx("div", { className: `mb-6 p-4 rounded-[12px] text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`, children: message.text }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12", children: [
      /* @__PURE__ */ jsx("aside", { className: "w-full lg:w-64 shrink-0", children: /* @__PURE__ */ jsx("nav", { className: "flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible", children: TABS.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            if (id === "logout") handleLogout();
            else setActiveTab(id);
          },
          className: `flex items-center space-x-3 px-4 py-3 rounded-[12px] text-sm transition-colors whitespace-nowrap ${activeTab === id ? "bg-accent/15 text-accent font-medium" : id === "logout" ? "text-muted-foreground hover:text-foreground hover:bg-muted" : "text-foreground hover:bg-muted"}`,
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: label })
          ]
        },
        id
      )) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        activeTab === "profile" && /* @__PURE__ */ jsxs("div", { className: "max-w-lg space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsx(User, { className: "w-8 h-8 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium", children: profile.name || "—" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: profile.email })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-muted-foreground mb-2 block", children: "Full Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: profile.name,
                  onChange: (e) => setProfile({ ...profile, name: e.target.value }),
                  className: "w-full bg-input-background border border-border rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-muted-foreground mb-2 block", children: "Email" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  value: profile.email,
                  readOnly: true,
                  className: "w-full bg-muted/50 border border-border rounded-[12px] px-4 py-3 text-sm focus:outline-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-muted-foreground mb-2 block", children: "Phone" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  value: profile.phone,
                  onChange: (e) => setProfile({ ...profile, phone: e.target.value }),
                  className: "w-full bg-input-background border border-border rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: saving,
                className: "w-full bg-primary text-primary-foreground px-6 py-3 rounded-[16px] font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50",
                children: saving ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin mx-auto" }) : "Save Changes"
              }
            )
          ] })
        ] }),
        activeTab === "orders" && /* @__PURE__ */ jsx("div", { className: "space-y-6", children: orders.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "No orders yet." }) : orders.map((order) => /* @__PURE__ */ jsxs("div", { className: "border border-border rounded-[16px] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: order.order_number }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              "Placed on ",
              new Date(order.created_at).toLocaleDateString()
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm mt-4 font-medium", children: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(order.total) })
          ] }),
          /* @__PURE__ */ jsx("span", { className: `px-3 py-1 text-xs font-medium rounded-full ${order.status === "DELIVERED" ? "bg-green-100 text-green-700" : order.status === "SHIPPED" ? "bg-blue-100 text-blue-700" : order.status === "PROCESSING" ? "bg-purple-100 text-purple-700" : order.status === "PAID" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`, children: order.status })
        ] }, order.id)) }),
        activeTab === "wishlist" && /* @__PURE__ */ jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Heart, { className: "w-12 h-12 mx-auto mb-4 text-muted-foreground/50" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Your wishlist is empty." })
        ] }),
        activeTab === "addresses" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          addresses.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "No addresses saved." }) : addresses.map((addr) => /* @__PURE__ */ jsxs("div", { className: "border border-border rounded-[16px] p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium", children: addr.full_name }),
              addr.is_default && /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-accent/15 text-accent px-2 py-0.5 rounded-full", children: "Default" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
              addr.street,
              /* @__PURE__ */ jsx("br", {}),
              addr.city,
              ", ",
              addr.state,
              " ",
              addr.pincode,
              /* @__PURE__ */ jsx("br", {}),
              addr.phone
            ] })
          ] }, addr.id)),
          /* @__PURE__ */ jsx("button", { className: "w-full border border-dashed border-border rounded-[16px] py-4 text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-colors", children: "+ Add New Address" })
        ] })
      ] })
    ] })
  ] });
}

const $$Account = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Account", Account, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Vyaa/frontend/src/islands/Account", "client:component-export": "Account" })} ` })}`;
}, "D:/Vyaa/frontend/src/pages/account.astro", void 0);

const $$file = "D:/Vyaa/frontend/src/pages/account.astro";
const $$url = "/account";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Account,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
