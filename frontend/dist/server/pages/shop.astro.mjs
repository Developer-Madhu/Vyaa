import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_DWnod6f9.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_BirBghid.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { P as ProductCard } from '../chunks/ProductCard_QrKgkaSU.mjs';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { a as getProducts, b as getCategories } from '../chunks/products_Bre5kYYM.mjs';
import { f as formatPrice } from '../chunks/utils_FnLTpj-f.mjs';
export { renderers } from '../renderers.mjs';

function Shop({ products = [], categories = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProducts = products.filter((p) => {
    if (activeCategory !== "All" && p.category !== activeCategory) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });
  const categoryNames = ["All", ...categories.map((c) => c.name)];
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-end mb-12 space-y-6 md:space-y-0", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "font-heading text-4xl font-medium mb-4", children: "The Collection" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm max-w-md", children: "Explore our curated selection of premium pieces designed for the modern wardrobe." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 w-full md:w-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1 md:w-64", children: [
          /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search products...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "w-full pl-9 pr-4 py-2 bg-input-background rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowFilters(!showFilters),
            className: "flex items-center space-x-2 px-4 py-2 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors shrink-0",
            children: [
              /* @__PURE__ */ jsx(SlidersHorizontal, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Filters" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8", children: [
      /* @__PURE__ */ jsx("aside", { className: `${showFilters ? "block" : "hidden"} md:block w-full lg:w-64 shrink-0`, children: /* @__PURE__ */ jsxs("div", { className: "pr-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium mb-4", children: "Categories" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: categoryNames.map((cat) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveCategory(cat),
              className: `text-sm ${activeCategory === cat ? "text-accent font-medium" : "text-muted-foreground hover:text-foreground"} transition-colors`,
              children: cat
            }
          ) }, cat)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-medium mb-4 flex justify-between items-center", children: [
            "Price ",
            /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("input", { type: "range", className: "w-full accent-accent" }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsx("span", { children: "₹0" }),
              /* @__PURE__ */ jsx("span", { children: "₹25,000+" })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex justify-between items-center text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "Showing ",
            filteredProducts.length,
            " results"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx("span", { children: "Sort by:" }),
            /* @__PURE__ */ jsxs("select", { className: "bg-transparent font-medium text-foreground focus:outline-none", children: [
              /* @__PURE__ */ jsx("option", { children: "Featured" }),
              /* @__PURE__ */ jsx("option", { children: "Price: Low to High" }),
              /* @__PURE__ */ jsx("option", { children: "Price: High to Low" }),
              /* @__PURE__ */ jsx("option", { children: "Newest" })
            ] })
          ] })
        ] }),
        filteredProducts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8", children: filteredProducts.map((product) => /* @__PURE__ */ jsx(ProductCard, { ...product }, product.id)) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-24 text-muted-foreground", children: "No products found matching your criteria." })
      ] })
    ] })
  ] });
}

const $$Shop = createComponent(async ($$result, $$props, $$slots) => {
  const raw = await getProducts();
  const categories = await getCategories();
  const products = raw.products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: formatPrice(p.price),
    image: p.images?.[0]?.url || "",
    category: p.category?.name || ""
  }));
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Shop", Shop, { "products": products, "categories": categories, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Vyaa/frontend/src/islands/Shop", "client:component-export": "Shop" })} ` })}`;
}, "D:/Vyaa/frontend/src/pages/shop.astro", void 0);

const $$file = "D:/Vyaa/frontend/src/pages/shop.astro";
const $$url = "/shop";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Shop,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
