import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BnMUGTBB.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_DbtLs1aO.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Mail, Loader2 } from 'lucide-react';
import { a as api } from '../chunks/api_Df0vaV6f.mjs';
export { renderers } from '../renderers.mjs';

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("email");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.auth.forgotPassword(email);
      setStep("success");
    } catch (e2) {
      setError(e2.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-muted/20 px-4 py-12", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
      className: "w-full max-w-md bg-background rounded-[24px] p-8 sm:p-10 border border-border/50",
      children: [
        /* @__PURE__ */ jsx("div", { className: "text-center mb-10", children: step === "email" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("h1", { className: "font-heading text-3xl font-medium mb-2", children: "Forgot Password?" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Enter your email and we'll send you a reset link" })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-8 h-8 text-green-600" }) }),
          /* @__PURE__ */ jsx("h1", { className: "font-heading text-3xl font-medium mb-2", children: "Check Your Email" }),
          /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-sm", children: [
            "We've sent a password reset link to ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: email })
          ] })
        ] }) }),
        step === "email" && error && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "mb-6 p-4 bg-red-50 text-red-700 rounded-[12px] text-sm",
            children: error
          }
        ),
        step === "email" && /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "text-sm text-muted-foreground mb-2 block", children: "Email" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "email",
                  type: "email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  required: true,
                  autoComplete: "email",
                  className: "w-full bg-input-background border border-border rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-foreground focus:ring-2 focus:ring-accent/20 transition-all pl-11",
                  placeholder: "you@example.com"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: loading,
              className: "w-full bg-primary text-primary-foreground py-4 rounded-[16px] font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2",
              children: loading ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : "Send Reset Link"
            }
          )
        ] }),
        step === "success" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center", children: "Didn't receive the email? Check your spam folder or" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setStep("email");
                setEmail("");
              },
              className: "w-full bg-primary text-primary-foreground py-4 rounded-[16px] font-medium text-sm hover:bg-primary/90 transition-colors",
              children: "Resend Email"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-8 text-center text-sm text-muted-foreground", children: [
          "Remember your password?",
          " ",
          /* @__PURE__ */ jsx("a", { href: "/login", className: "font-medium text-accent hover:underline", children: "Sign in" })
        ] })
      ]
    }
  ) });
}

const $$ForgotPassword = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ForgotPasswordForm", ForgotPasswordForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Vyaa/frontend/src/islands/ForgotPasswordForm", "client:component-export": "ForgotPasswordForm" })} ` })}`;
}, "D:/Vyaa/frontend/src/pages/forgot-password.astro", void 0);

const $$file = "D:/Vyaa/frontend/src/pages/forgot-password.astro";
const $$url = "/forgot-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ForgotPassword,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
