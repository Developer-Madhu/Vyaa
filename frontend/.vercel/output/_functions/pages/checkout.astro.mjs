import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BnMUGTBB.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_DbtLs1aO.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../renderers.mjs';

function Checkout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  useEffect(() => {
    setIdempotencyKey(crypto.randomUUID());
  }, []);
  const handlePayNow = async () => {
    if (isProcessing || !idempotencyKey) return;
    setIsProcessing(true);
    try {
      const response = await fetch("/api/checkout/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey
        },
        body: JSON.stringify({
          address_id: "temp-address-id",
          coupon_code: null
        })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to initialize payment");
      }
      const data = await response.json();
      const options = {
        key: undefined                                      ,
        amount: data.amount * 100,
        currency: "INR",
        name: "VYAA",
        description: "Payment for order",
        order_id: data.razorpay_order_id,
        handler: async (response2) => {
          const verifyResponse = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              order_id: data.order_id,
              razorpay_order_id: data.razorpay_order_id,
              razorpay_payment_id: response2.razorpay_payment_id,
              razorpay_signature: response2.razorpay_signature
            })
          });
          if (!verifyResponse.ok) {
            const error = await verifyResponse.json();
            throw new Error(error.message || "Payment verification failed");
          }
          window.location.href = `/order-success?order_id=${data.order_id}`;
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999"
        },
        notes: {
          address_id: "temp-address-id"
        },
        theme: {
          color: "#B48E92"
        }
      };
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
          const rzp = new window.Razorpay(options);
          rzp.open();
        };
        script.onerror = () => {
          throw new Error("Failed to load Razorpay SDK");
        };
        document.body.appendChild(script);
      } else {
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(error instanceof Error ? error.message : "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12 lg:gap-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl font-medium mb-6", children: "Contact Information" }),
        /* @__PURE__ */ jsx("input", { type: "email", placeholder: "Email", className: "w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors mb-4" }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", className: "w-4 h-4 rounded border-border accent-foreground" }),
          /* @__PURE__ */ jsx("span", { children: "Email me with news and offers" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl font-medium mb-6", children: "Shipping Address" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("select", { className: "col-span-1 md:col-span-2 w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors bg-background", children: [
            /* @__PURE__ */ jsx("option", { children: "India" }),
            /* @__PURE__ */ jsx("option", { children: "United States" })
          ] }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "First Name", className: "w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Last Name", className: "w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Address", className: "col-span-1 md:col-span-2 w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Apartment, suite, etc. (optional)", className: "col-span-1 md:col-span-2 w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "City", className: "w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "State", className: "w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "PIN code", className: "col-span-1 md:col-span-2 w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" }),
          /* @__PURE__ */ jsx("input", { type: "tel", placeholder: "Phone", className: "col-span-1 md:col-span-2 w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-2xl font-medium mb-6", children: "Payment" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "All transactions are secure and encrypted." }),
        /* @__PURE__ */ jsxs("div", { className: "border border-border rounded-[8px] p-6 bg-muted/20 flex flex-col items-center justify-center space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-blue-600 text-xl", children: "R" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-center", children: 'After clicking "Pay now", you will be redirected to Razorpay Secure to complete your purchase securely.' })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-8 pt-8 border-t border-border", children: [
        /* @__PURE__ */ jsx("a", { href: "/cart", className: "text-sm text-muted-foreground hover:text-foreground transition-colors", children: "Return to cart" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handlePayNow,
            disabled: isProcessing || !idempotencyKey,
            className: "bg-primary text-primary-foreground px-8 py-4 rounded-[16px] font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
            children: isProcessing ? "Processing..." : "Pay now"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-[420px] bg-muted/30 p-8 rounded-[16px] h-fit sticky top-24", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg mb-6", children: "Order Summary" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4 mb-6 pb-6 border-b border-border/50", children: [1, 2].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-16 h-20 bg-background rounded-[8px] overflow-hidden shrink-0 border border-border", children: [
          /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", alt: "Product", className: "w-full h-full object-cover" }),
          /* @__PURE__ */ jsx("span", { className: "absolute -top-2 -right-2 w-5 h-5 bg-foreground text-background text-xs rounded-full flex items-center justify-center", children: "1" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium", children: "Silk Wrap Midi Dress" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Ivory / M" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "₹8,990" })
      ] }, item)) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm mb-6 pb-6 border-b border-border/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: "₹17,980" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium text-green-600", children: "Free" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end", children: [
        /* @__PURE__ */ jsx("span", { className: "text-lg", children: "Total" }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground mr-2", children: "INR" }),
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-medium", children: "₹17,980" })
        ] })
      ] })
    ] })
  ] }) });
}

const $$Checkout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Checkout", Checkout, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Vyaa/frontend/src/islands/Checkout", "client:component-export": "Checkout" })} ` })}`;
}, "D:/Vyaa/frontend/src/pages/checkout.astro", void 0);

const $$file = "D:/Vyaa/frontend/src/pages/checkout.astro";
const $$url = "/checkout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Checkout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
