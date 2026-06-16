import { e as createComponent, l as renderHead, k as renderComponent, n as renderSlot, r as renderTemplate } from './astro/server_BnMUGTBB.mjs';
import 'piccolore';
/* empty css                         */
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { Menu, Search, User, Heart, ShoppingBag, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useStore } from '@nanostores/react';
import { atom, computed, onMount } from 'nanostores';

const $cart = atom([]);
const $cartCount = computed(
  $cart,
  (items) => items.reduce((sum, item) => sum + item.quantity, 0)
);
const $cartTotal = computed(
  $cart,
  (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
onMount($cart, () => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("vyaa-cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          $cart.set(parsed);
        }
      }
    } catch {
    }
  }
  return $cart.subscribe((items) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vyaa-cart", JSON.stringify(items));
    }
  });
});
function addToCart(item) {
  const current = $cart.get();
  const existing = current.find(
    (i) => i.id === item.id && i.size === item.size
  );
  if (existing) {
    $cart.set(
      current.map(
        (i) => i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i
      )
    );
  } else {
    $cart.set([
      ...current,
      { ...item, quantity: item.quantity ?? 1 }
    ]);
  }
}
function removeFromCart(id, size) {
  $cart.set($cart.get().filter((i) => !(i.id === id && i.size === size)));
}
function updateQuantity(id, size, quantity) {
  if (quantity <= 0) {
    removeFromCart(id, size);
    return;
  }
  $cart.set(
    $cart.get().map(
      (i) => i.id === id && i.size === size ? { ...i, quantity } : i
    )
  );
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = useStore($cartCount);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "md:hidden p-2 -ml-2",
          onClick: () => setIsMobileMenuOpen(true),
          children: /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5 text-foreground" })
        }
      ),
      /* @__PURE__ */ jsx("a", { href: "/", className: "font-heading text-2xl font-semibold tracking-wide text-foreground", children: "VYAA" }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex space-x-8", children: [
        /* @__PURE__ */ jsx("a", { href: "/shop", className: "text-sm font-medium text-foreground hover:text-accent transition-colors", children: "New In" }),
        /* @__PURE__ */ jsx("a", { href: "/shop", className: "text-sm font-medium text-foreground hover:text-accent transition-colors", children: "Clothing" }),
        /* @__PURE__ */ jsx("a", { href: "/shop", className: "text-sm font-medium text-foreground hover:text-accent transition-colors", children: "Dresses" }),
        /* @__PURE__ */ jsx("a", { href: "/shop", className: "text-sm font-medium text-foreground hover:text-accent transition-colors", children: "Accessories" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx("button", { className: "p-2 text-foreground hover:text-accent transition-colors", children: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsx("a", { href: "/account", className: "hidden md:block p-2 text-foreground hover:text-accent transition-colors", children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsx("button", { className: "hidden md:block p-2 text-foreground hover:text-accent transition-colors", children: /* @__PURE__ */ jsx(Heart, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxs("a", { href: "/cart", className: "p-2 text-foreground hover:text-accent transition-colors relative", children: [
          /* @__PURE__ */ jsx(ShoppingBag, { className: "w-5 h-5" }),
          cartCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent rounded-full text-[10px] font-medium text-white flex items-center justify-center border border-background", children: cartCount > 9 ? "9+" : cartCount })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isMobileMenuOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "fixed inset-0 bg-black/20 z-50 md:hidden",
          onClick: () => setIsMobileMenuOpen(false)
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { x: "-100%" },
          animate: { x: 0 },
          exit: { x: "-100%" },
          transition: { type: "tween", duration: 0.3 },
          className: "fixed inset-y-0 left-0 w-4/5 max-w-sm bg-background z-50 md:hidden shadow-xl flex flex-col",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 flex items-center justify-between border-b border-border/40", children: [
              /* @__PURE__ */ jsx("span", { className: "font-heading text-xl font-semibold", children: "VYAA" }),
              /* @__PURE__ */ jsx("button", { onClick: () => setIsMobileMenuOpen(false), className: "p-2", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto py-4 px-6 flex flex-col space-y-6", children: [
              /* @__PURE__ */ jsx("a", { href: "/shop", onClick: () => setIsMobileMenuOpen(false), className: "text-lg font-medium", children: "New In" }),
              /* @__PURE__ */ jsx("a", { href: "/shop", onClick: () => setIsMobileMenuOpen(false), className: "text-lg font-medium", children: "Clothing" }),
              /* @__PURE__ */ jsx("a", { href: "/shop", onClick: () => setIsMobileMenuOpen(false), className: "text-lg font-medium", children: "Dresses" }),
              /* @__PURE__ */ jsx("a", { href: "/shop", onClick: () => setIsMobileMenuOpen(false), className: "text-lg font-medium", children: "Accessories" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 border-t border-border/40 flex flex-col space-y-4", children: [
              /* @__PURE__ */ jsxs("a", { href: "/account", onClick: () => setIsMobileMenuOpen(false), className: "flex items-center space-x-3 text-sm", children: [
                /* @__PURE__ */ jsx(User, { className: "w-5 h-5" }),
                " ",
                /* @__PURE__ */ jsx("span", { children: "My Account" })
              ] }),
              /* @__PURE__ */ jsxs("a", { href: "/account", onClick: () => setIsMobileMenuOpen(false), className: "flex items-center space-x-3 text-sm", children: [
                /* @__PURE__ */ jsx(Heart, { className: "w-5 h-5" }),
                " ",
                /* @__PURE__ */ jsx("span", { children: "Wishlist" })
              ] })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}

const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>VYAA — Premium Womenswear</title><meta name="description" content="Elevating everyday elegance. Premium womenswear crafted for the modern muse.">${renderHead()}</head> <body class="min-h-screen flex flex-col font-sans text-foreground bg-background"> <!-- Announcement Bar --> <div class="bg-primary text-primary-foreground text-center py-2 text-xs md:text-sm font-medium tracking-wide">
Free Shipping on all orders over ₹5,000. Shop New Arrivals.
</div> ${renderComponent($$result, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Vyaa/frontend/src/components/Header", "client:component-export": "Header" })} <!-- Main Content --> <main class="flex-1 flex flex-col"> ${renderSlot($$result, $$slots["default"])} </main> <!-- Footer --> <footer class="bg-primary text-primary-foreground py-16 px-6 md:px-12"> <div class="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8"> <!-- Column 1: Brand --> <div class="flex flex-col gap-6"> <h3 class="font-serif text-xl font-semibold">VYAA</h3> <p class="text-sm text-gray-300">
Elevating everyday elegance. Premium womenswear crafted for the modern muse.
</p> </div> <!-- Column 2: Shop --> <div class="flex flex-col gap-6"> <h4 class="font-serif text-xl font-semibold">Shop</h4> <ul class="flex flex-col gap-3 text-sm text-gray-300"> <li><a href="/shop" class="hover:text-white transition-colors">New Arrivals</a></li> <li><a href="/shop" class="hover:text-white transition-colors">Clothing</a></li> <li><a href="/shop" class="hover:text-white transition-colors">Accessories</a></li> <li><a href="/shop" class="hover:text-white transition-colors">Sale</a></li> </ul> </div> <!-- Column 3: Support --> <div class="flex flex-col gap-6"> <h4 class="font-serif text-xl font-semibold">Support</h4> <ul class="flex flex-col gap-3 text-sm text-gray-300"> <li><a href="/" class="hover:text-white transition-colors">Contact Us</a></li> <li><a href="/" class="hover:text-white transition-colors">FAQs</a></li> <li><a href="/" class="hover:text-white transition-colors">Shipping & Returns</a></li> <li><a href="/" class="hover:text-white transition-colors">Size Guide</a></li> </ul> </div> <!-- Column 4: Newsletter --> <div class="flex flex-col gap-6"> <h4 class="font-serif text-xl font-semibold">Newsletter</h4> <p class="text-sm text-gray-300">
Subscribe to receive updates, access to exclusive deals, and more.
</p> <div class="flex items-center border-b border-gray-500 pb-2 mt-4"> <input type="email" placeholder="Enter your email address" class="bg-transparent outline-none w-full text-sm placeholder-gray-400 text-white"> <button class="text-sm font-semibold hover:text-[#E5C1CD] transition-colors whitespace-nowrap ml-4">Subscribe</button> </div> </div> </div> <div class="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4 pt-6"> <span>© 2026 VYAA. All rights reserved.</span> <div class="flex gap-6"> <a href="/" class="hover:text-white transition-colors">Privacy Policy</a> <a href="/" class="hover:text-white transition-colors">Terms of Service</a> </div> </div> </footer> </body></html>`;
}, "D:/Vyaa/frontend/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $, $cart as a, $cartTotal as b, addToCart as c, removeFromCart as r, updateQuantity as u };
