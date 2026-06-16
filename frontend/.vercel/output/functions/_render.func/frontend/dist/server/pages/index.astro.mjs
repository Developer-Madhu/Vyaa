import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BnMUGTBB.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_DbtLs1aO.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { P as ProductCard } from '../chunks/ProductCard_QrKgkaSU.mjs';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
export { renderers } from '../renderers.mjs';

const newArrivals = [
  { id: "1", name: "Silk Wrap Midi Dress", price: "₹8,990", category: "Dresses", image: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmZW1pbmluZSUyMGZhc2hpb24lMjBtb2RlbCUyMGRyZXNzfGVufDF8fHx8MTc4MTUwMjAyMnww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "2", name: "Tailored Wool Coat", price: "₹14,500", category: "Outerwear", image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZWxlZ2FudCUyMHdvbWVuJTIwb3V0Zml0JTIwY29hdHxlbnwxfHx8fDE3ODE1MDIwMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "3", name: "Leather Crossbody Bag", price: "₹6,200", category: "Accessories", image: "https://images.unsplash.com/photo-1705909237050-7a7625b47fac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3b21lbiUyMGxlYXRoZXIlMjBiYWclMjBwdXJzZXxlbnwxfHx8fDE3ODE1MDIwMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "4", name: "Gold Plated Pendant", price: "₹3,400", category: "Jewelry", image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfGdvbGQlMjBqZXdlbHJ5JTIwbmVja2xhY2UlMjBmYXNoaW9ufGVufDF8fHx8MTc4MTUwMjAyNXww&ixlib=rb-4.1.0&q=80&w=1080" }
];
function Home() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative h-[85vh] min-h-[600px] w-full bg-muted flex items-center overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://images.unsplash.com/photo-1606143412458-acc5f86de897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwc3R5bGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3ODE1MDIwMjJ8MA&ixlib=rb-4.1.0&q=80&w=1920",
            alt: "Editorial fashion",
            className: "w-full h-full object-cover"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/50" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.2 },
          className: "max-w-xl",
          children: [
            /* @__PURE__ */ jsxs("h1", { className: "font-heading text-4xl md:text-6xl text-white font-medium mb-6 leading-tight", children: [
              "The Art of ",
              /* @__PURE__ */ jsx("br", {}),
              "Everyday Elegance"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-white/90 mb-10 font-light", children: "Discover our new Autumn/Winter collection. Crafted for the modern woman who appreciates subtle luxury." }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/shop",
                className: "inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-[16px] text-sm font-medium hover:bg-white/90 transition-colors",
                children: "Shop Collection"
              }
            )
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-12", children: /* @__PURE__ */ jsx("h2", { className: "font-heading text-3xl font-medium", children: "Shop by Category" }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: ["Dresses", "Outerwear", "Accessories"].map((category, i) => /* @__PURE__ */ jsxs("a", { href: "/shop", className: "group relative aspect-[4/5] overflow-hidden rounded-[16px] bg-muted block", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: [
              "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmZW1pbmluZSUyMGZhc2hpb24lMjBtb2RlbCUyMGRyZXNzfGVufDF8fHx8MTc4MTUwMjAyMnww&ixlib=rb-4.1.0&q=80&w=800",
              "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZWxlZ2FudCUyMHdvbWVuJTIwb3V0Zml0JTIwY29hdHxlbnwxfHx8fDE3ODE1MDIwMjJ8MA&ixlib=rb-4.1.0&q=80&w=800",
              "https://images.unsplash.com/photo-1705909237050-7a7625b47fac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3b21lbiUyMGxlYXRoZXIlMjBiYWclMjBwdXJzZXxlbnwxfHx8fDE3ODE1MDIwMjJ8MA&ixlib=rb-4.1.0&q=80&w=800"
            ][i],
            alt: category,
            className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-8 left-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-white font-heading text-2xl font-medium mb-2", children: category }),
          /* @__PURE__ */ jsxs("span", { className: "text-white/80 text-sm flex items-center group-hover:text-white transition-colors", children: [
            "Shop Now ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
          ] })
        ] })
      ] }, category)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-accent/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-12", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-heading text-3xl font-medium mb-2", children: "New Arrivals" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Discover the latest additions to our collection." })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "/shop", className: "hidden md:flex items-center text-sm font-medium hover:text-accent transition-colors", children: [
          "View All ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8", children: newArrivals.map((product) => /* @__PURE__ */ jsx(ProductCard, { ...product }, product.id)) }),
      /* @__PURE__ */ jsxs("a", { href: "/shop", className: "mt-8 flex md:hidden items-center justify-center text-sm font-medium", children: [
        "View All ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-32 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "relative aspect-[3/4] md:aspect-square rounded-[16px] overflow-hidden", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1617370447481-f4691f05d6f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB3b21hbiUyMHNtaWxpbmclMjBvdXRkb29ycyUyMGZhc2hpb258ZW58MXx8fHwxNzgxNTAyMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
          alt: "Brand imagery",
          className: "w-full h-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-4xl font-medium leading-tight", children: "Redefining luxury through minimalist design and sustainable practices." }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-foreground/80 leading-relaxed font-light", children: `"VYAA has completely transformed my wardrobe. Their pieces are timeless, elegant, and incredibly well-made. It's the only brand I trust for both everyday essentials and statement pieces."` }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 pt-4 border-t border-border", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", alt: "Customer", className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Priya Sharma" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Verified Buyer" })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Home", Home, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Vyaa/frontend/src/islands/Home", "client:component-export": "Home" })} ` })}`;
}, "D:/Vyaa/frontend/src/pages/index.astro", void 0);

const $$file = "D:/Vyaa/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
