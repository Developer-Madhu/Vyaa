import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_DWnod6f9.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_BirBghid.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';
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
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-heading text-4xl font-medium mb-12", children: "My Account" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12", children: [
      /* @__PURE__ */ jsx("aside", { className: "w-full lg:w-64 shrink-0", children: /* @__PURE__ */ jsx("nav", { className: "flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible", children: TABS.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => id !== "logout" && setActiveTab(id),
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
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium", children: "Priya Sharma" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "priya@example.com" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-muted-foreground mb-2 block", children: "Full Name" }),
              /* @__PURE__ */ jsx("input", { type: "text", defaultValue: "Priya Sharma", className: "w-full bg-input-background border border-border rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-foreground" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-muted-foreground mb-2 block", children: "Email" }),
              /* @__PURE__ */ jsx("input", { type: "email", defaultValue: "priya@example.com", className: "w-full bg-input-background border border-border rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-foreground" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm text-muted-foreground mb-2 block", children: "Phone" }),
              /* @__PURE__ */ jsx("input", { type: "tel", defaultValue: "+91 98765 43210", className: "w-full bg-input-background border border-border rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-foreground" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "bg-primary text-primary-foreground px-6 py-3 rounded-[16px] font-medium text-sm hover:bg-primary/90 transition-colors", children: "Save Changes" })
        ] }),
        activeTab === "orders" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Your order history will appear here." }),
          [1, 2, 3].map((order) => /* @__PURE__ */ jsxs("div", { className: "border border-border rounded-[16px] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium", children: [
                "Order #100",
                order + 4
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                "Placed on Mar ",
                order + 4,
                ", 2026"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm mt-4 font-medium", children: [
                "₹",
                (order + 1) * 8990
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-accent/15 text-accent text-xs font-medium rounded-full", children: order === 1 ? "Delivered" : order === 2 ? "Shipped" : "Processing" })
          ] }, order))
        ] }),
        activeTab === "wishlist" && /* @__PURE__ */ jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Heart, { className: "w-12 h-12 mx-auto mb-4 text-muted-foreground/50" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Your wishlist is empty." })
        ] }),
        activeTab === "addresses" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "border border-border rounded-[16px] p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium", children: "Home" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-accent/15 text-accent px-2 py-0.5 rounded-full", children: "Default" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
              "42, Indiranagar, Bangalore",
              /* @__PURE__ */ jsx("br", {}),
              "Karnataka 560038",
              /* @__PURE__ */ jsx("br", {}),
              "India"
            ] })
          ] }),
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
