import { jsxs, jsx } from 'react/jsx-runtime';
import { Heart } from 'lucide-react';

function ProductCard({ id, slug, name, price, image, category }) {
  return /* @__PURE__ */ jsxs("a", { href: `/product/${slug || id}`, className: "group flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative aspect-[3/4] mb-4 bg-muted overflow-hidden rounded-[16px]", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: image,
          alt: name,
          className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        }
      ),
      /* @__PURE__ */ jsx("button", { className: "absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-accent", children: /* @__PURE__ */ jsx(Heart, { className: "w-4 h-4" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: category }),
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-foreground", children: name }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground/80", children: price })
    ] })
  ] });
}

export { ProductCard as P };
