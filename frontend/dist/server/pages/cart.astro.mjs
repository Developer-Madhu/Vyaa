import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_DWnod6f9.mjs';
import 'piccolore';
import { a as $cart, b as $cartTotal, r as removeFromCart, u as updateQuantity, $ as $$MainLayout } from '../chunks/MainLayout_BirBghid.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { X, Minus, Plus } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { f as formatPrice } from '../chunks/utils_FnLTpj-f.mjs';
export { renderers } from '../renderers.mjs';

function Cart() {
  const items = useStore($cart);
  const total = useStore($cartTotal);
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-heading text-4xl font-medium mb-12", children: "Shopping Bag" }),
    items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-24 text-muted-foreground", children: [
      /* @__PURE__ */ jsx("p", { className: "text-lg mb-4", children: "Your shopping bag is empty." }),
      /* @__PURE__ */ jsx("a", { href: "/shop", className: "text-accent underline text-sm", children: "Continue Shopping" })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx("div", { className: "border-t border-border", children: items.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex py-8 border-b border-border relative group", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => removeFromCart(item.id, item.size),
            className: "absolute right-0 top-8 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity",
            children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-24 h-32 bg-muted rounded-[8px] overflow-hidden shrink-0 mr-6", children: /* @__PURE__ */ jsx("img", { src: item.image, alt: item.name, className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col justify-between py-1", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base font-medium mb-1", children: item.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Size: ",
              item.size
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center border border-border rounded-full px-3 py-1", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => updateQuantity(item.id, item.size, item.quantity - 1), className: "p-1", children: /* @__PURE__ */ jsx(Minus, { className: "w-3 h-3" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm px-4", children: item.quantity }),
              /* @__PURE__ */ jsx("button", { onClick: () => updateQuantity(item.id, item.size, item.quantity + 1), className: "p-1", children: /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" }) })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatPrice(item.price * item.quantity) })
          ] })
        ] })
      ] }, `${item.id}-${item.size}`)) }) }),
      /* @__PURE__ */ jsx("div", { className: "w-full lg:w-[400px]", children: /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 p-8 rounded-[16px]", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg mb-6", children: "Order Summary" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm mb-6 pb-6 border-b border-border", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
            /* @__PURE__ */ jsx("span", { children: formatPrice(total) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
            /* @__PURE__ */ jsx("span", { children: "Free" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Tax" }),
            /* @__PURE__ */ jsx("span", { children: "Calculated at checkout" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-medium text-lg mb-8", children: [
          /* @__PURE__ */ jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsx("span", { children: formatPrice(total) })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/checkout",
            className: "w-full bg-primary text-primary-foreground py-4 rounded-[16px] font-medium hover:bg-primary/90 transition-colors flex justify-center",
            children: "Proceed to Checkout"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-2", children: [
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Promo code", className: "flex-1 bg-background border border-border rounded-[8px] px-4 py-2 text-sm focus:outline-none focus:border-foreground" }),
          /* @__PURE__ */ jsx("button", { className: "px-4 py-2 bg-foreground text-background text-sm font-medium rounded-[8px]", children: "Apply" })
        ] })
      ] }) })
    ] })
  ] });
}

const $$Cart = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Cart", Cart, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Vyaa/frontend/src/islands/Cart", "client:component-export": "Cart" })} ` })}`;
}, "D:/Vyaa/frontend/src/pages/cart.astro", void 0);

const $$file = "D:/Vyaa/frontend/src/pages/cart.astro";
const $$url = "/cart";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cart,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
