import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_DWnod6f9.mjs';
import 'piccolore';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { TrendingUp, Package, Users, DollarSign, Search, Bell, Settings } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: TrendingUp },
  { id: "products", label: "Products", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
  { id: "orders", label: "Orders", icon: DollarSign }
];
function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
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
        activeTab === "dashboard" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl font-medium mb-6", children: "Dashboard Overview" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [
            { label: "Revenue", value: "₹2,45,890", change: "+12.5%", icon: TrendingUp },
            { label: "Orders", value: "156", change: "+8.2%", icon: Package },
            { label: "Customers", value: "2,340", change: "+24.1%", icon: Users },
            { label: "Avg. Order Value", value: "₹1,576", change: "+3.4%", icon: DollarSign }
          ].map((stat) => /* @__PURE__ */ jsxs("div", { className: "bg-background border border-border rounded-[16px] p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
              /* @__PURE__ */ jsx(stat.icon, { className: "w-5 h-5 text-muted-foreground" }),
              /* @__PURE__ */ jsx("span", { className: `text-xs font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`, children: stat.change })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-medium", children: stat.value }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: stat.label })
          ] }, stat.label)) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-background border border-border rounded-[16px] overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-border flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "Recent Orders" }),
              /* @__PURE__ */ jsx("button", { className: "text-sm text-accent hover:underline", children: "View All" })
            ] }),
            /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border text-muted-foreground", children: [
                /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Order" }),
                /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Customer" }),
                /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Status" }),
                /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Total" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: [
                { order: "#1005", customer: "Priya Sharma", status: "Delivered", total: "₹8,990" },
                { order: "#1004", customer: "Ananya Patel", status: "Shipped", total: "₹14,500" },
                { order: "#1003", customer: "Riya Kapoor", status: "Processing", total: "₹6,200" }
              ].map((row) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-b-0", children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: row.order }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: row.customer }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs rounded-full ${row.status === "Delivered" ? "bg-green-100 text-green-700" : row.status === "Shipped" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`, children: row.status }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: row.total })
              ] }, row.order)) })
            ] })
          ] })
        ] }),
        activeTab === "products" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl font-medium", children: "Products" }),
            /* @__PURE__ */ jsx("button", { className: "bg-primary text-primary-foreground px-4 py-2 rounded-[16px] text-sm font-medium", children: "+ Add Product" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-background border border-border rounded-[16px] overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border text-muted-foreground", children: [
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Product" }),
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Category" }),
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Price" }),
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Stock" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: [
              { name: "Silk Wrap Midi Dress", category: "Dresses", price: "₹8,990", stock: 24 },
              { name: "Tailored Wool Coat", category: "Outerwear", price: "₹14,500", stock: 12 },
              { name: "Leather Crossbody Bag", category: "Accessories", price: "₹6,200", stock: 8 }
            ].map((p) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-b-0", children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium", children: p.name }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-muted-foreground", children: p.category }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: p.price }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `${p.stock < 10 ? "text-red-600" : "text-green-600"}`, children: p.stock }) })
            ] }, p.name)) })
          ] }) })
        ] }),
        activeTab === "customers" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl font-medium mb-6", children: "Customers" }),
          /* @__PURE__ */ jsx("div", { className: "bg-background border border-border rounded-[16px] overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border text-muted-foreground", children: [
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Name" }),
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Email" }),
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Orders" }),
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Spent" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: [
              { name: "Priya Sharma", email: "priya@example.com", orders: 12, spent: "₹1,24,500" },
              { name: "Ananya Patel", email: "ananya@example.com", orders: 8, spent: "₹89,200" },
              { name: "Riya Kapoor", email: "riya@example.com", orders: 5, spent: "₹42,800" }
            ].map((c) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-b-0", children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium", children: c.name }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-muted-foreground", children: c.email }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: c.orders }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: c.spent })
            ] }, c.email)) })
          ] }) })
        ] }),
        activeTab === "orders" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl font-medium mb-6", children: "Orders" }),
          /* @__PURE__ */ jsx("div", { className: "bg-background border border-border rounded-[16px] overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border text-muted-foreground", children: [
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Order" }),
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Customer" }),
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Date" }),
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Status" }),
              /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Total" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: [
              { order: "#1005", customer: "Priya Sharma", date: "Mar 15", status: "Delivered", total: "₹8,990" },
              { order: "#1004", customer: "Ananya Patel", date: "Mar 12", status: "Shipped", total: "₹14,500" },
              { order: "#1003", customer: "Riya Kapoor", date: "Mar 10", status: "Processing", total: "₹6,200" }
            ].map((o) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-b-0", children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: o.order }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: o.customer }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-muted-foreground", children: o.date }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs rounded-full ${o.status === "Delivered" ? "bg-green-100 text-green-700" : o.status === "Shipped" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`, children: o.status }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: o.total })
            ] }, o.order)) })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}

const $$Admin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Admin", Admin, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Vyaa/frontend/src/islands/Admin", "client:component-export": "Admin" })}`;
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
