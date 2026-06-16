import { c as createComponent, i as renderComponent, r as renderTemplate, f as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_CW-lBEoZ.mjs';
import 'piccolore';
import { c as addToCart, $ as $$MainLayout } from '../../chunks/MainLayout_BCBVXyCX.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { ChevronRight, Star, Heart, Truck, RefreshCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { g as getProduct } from '../../chunks/products_BygUdmxr.mjs';
export { renderers } from '../../renderers.mjs';

function ProductDetail({ slug, product }) {
  if (!product) {
    return /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 py-24 text-center text-muted-foreground", children: "Product not found" });
  }
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.size || "M");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        size: selectedSize,
        quantity: 1,
        image: product.images?.[0]?.url || ""
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full", children: [
    /* @__PURE__ */ jsxs("nav", { className: "flex items-center text-xs text-muted-foreground mb-8", children: [
      /* @__PURE__ */ jsx("span", { children: "Home" }),
      " ",
      /* @__PURE__ */ jsx(ChevronRight, { className: "w-3 h-3 mx-2" }),
      /* @__PURE__ */ jsx("span", { children: product.category?.name || "Products" }),
      " ",
      /* @__PURE__ */ jsx(ChevronRight, { className: "w-3 h-3 mx-2" }),
      /* @__PURE__ */ jsx("span", { className: "text-foreground", children: product.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col-reverse lg:flex-row gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible no-scrollbar", children: product.images.map((img, idx) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedImage(idx),
            className: `w-20 h-24 lg:w-24 lg:h-32 shrink-0 rounded-[8px] overflow-hidden border-2 transition-colors ${selectedImage === idx ? "border-accent" : "border-transparent"}`,
            children: /* @__PURE__ */ jsx("img", { src: img.url, alt: img.alt_text || `${product.name} view ${idx + 1}`, className: "w-full h-full object-cover" })
          },
          img.id
        )) }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 aspect-[3/4] bg-muted rounded-[16px] overflow-hidden", children: /* @__PURE__ */ jsx(
          motion.img,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.3 },
            src: product.images[selectedImage]?.url,
            alt: product.name,
            className: "w-full h-full object-cover"
          },
          selectedImage
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-[400px] xl:w-[480px] flex flex-col pt-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-heading text-3xl font-medium mb-2", children: product.name }),
        /* @__PURE__ */ jsx("p", { className: "text-xl mb-6", children: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(product.price) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1 text-accent mb-8", children: [
          /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 fill-current" }),
          /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 fill-current" }),
          /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 fill-current" }),
          /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 fill-current" }),
          /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground ml-2", children: "(24 reviews)" })
        ] }),
        product.sizes.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Size" }),
            /* @__PURE__ */ jsx("button", { className: "text-xs text-muted-foreground underline", children: "Size Guide" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: product.sizes.map((s) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedSize(s.size),
              className: `w-12 h-12 rounded-[8px] border flex items-center justify-center text-sm transition-colors ${selectedSize === s.size ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`,
              children: s.size
            },
            s.size
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-4 mb-8", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleAddToCart,
              disabled: isAddingToCart,
              className: "flex-1 bg-primary text-primary-foreground py-4 rounded-[16px] font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
              children: isAddingToCart ? "Adding..." : "Add to Cart"
            }
          ),
          /* @__PURE__ */ jsx("button", { className: "w-14 shrink-0 border border-border rounded-[16px] flex items-center justify-center hover:bg-muted transition-colors", children: /* @__PURE__ */ jsx(Heart, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6 border-t border-border pt-8 text-sm", children: [
          /* @__PURE__ */ jsx("p", { className: "text-foreground/80 leading-relaxed font-light", children: product.description }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4 pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-3 text-muted-foreground", children: [
              /* @__PURE__ */ jsx(Truck, { className: "w-5 h-5 text-foreground" }),
              /* @__PURE__ */ jsx("span", { children: "Free shipping on orders over ₹5,000" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-3 text-muted-foreground", children: [
              /* @__PURE__ */ jsx(RefreshCcw, { className: "w-5 h-5 text-foreground" }),
              /* @__PURE__ */ jsx("span", { children: "30-day return policy" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const product = await getProduct(slug || "");
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": async ($$result2) => renderTemplate`${product ? renderTemplate`${renderComponent($$result2, "ProductDetail", ProductDetail, { "slug": slug, "product": product, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Vyaa/frontend/src/islands/ProductDetail", "client:component-export": "ProductDetail" })}` : renderTemplate`${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-muted-foreground">
Product not found
</div>`}` })}`;
}, "D:/Vyaa/frontend/src/pages/product/[slug].astro", void 0);

const $$file = "D:/Vyaa/frontend/src/pages/product/[slug].astro";
const $$url = "/product/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
