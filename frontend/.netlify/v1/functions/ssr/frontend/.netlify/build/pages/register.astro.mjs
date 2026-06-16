import { c as createComponent, i as renderComponent, r as renderTemplate } from '../chunks/astro/server_CW-lBEoZ.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_BCBVXyCX.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { motion } from 'motion/react';
import { EyeOff, Eye, Loader2 } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { $ as $authToken, a as $user, b as login } from '../chunks/authStore_L5dEO1VH.mjs';
import { a as api } from '../chunks/api_DR85031W.mjs';
export { renderers } from '../renderers.mjs';

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useStore($authToken);
  useStore($user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const data = await api.auth.register({ name, email, password });
      login(data.token, data.user);
      window.location.href = "/account";
    } catch (e2) {
      setError(e2.message || "Registration failed. Please try again.");
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
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
          /* @__PURE__ */ jsx("h1", { className: "font-heading text-3xl font-medium mb-2", children: "Create Account" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Join VYAA and start your journey" })
        ] }),
        error && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "mb-6 p-4 bg-red-50 text-red-700 rounded-[12px] text-sm",
            children: error
          }
        ),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "text-sm text-muted-foreground mb-2 block", children: "Full Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "name",
                type: "text",
                value: name,
                onChange: (e) => setName(e.target.value),
                required: true,
                autoComplete: "name",
                className: "w-full bg-input-background border border-border rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-foreground focus:ring-2 focus:ring-accent/20 transition-all",
                placeholder: "Your name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "text-sm text-muted-foreground mb-2 block", children: "Email" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "email",
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                required: true,
                autoComplete: "email",
                className: "w-full bg-input-background border border-border rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-foreground focus:ring-2 focus:ring-accent/20 transition-all",
                placeholder: "you@example.com"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "text-sm text-muted-foreground mb-2 block", children: "Password" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "password",
                  type: showPassword ? "text" : "password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  required: true,
                  autoComplete: "new-password",
                  minLength: 6,
                  className: "w-full bg-input-background border border-border rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-foreground focus:ring-2 focus:ring-accent/20 transition-all pr-12",
                  placeholder: "At least 6 characters"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowPassword(!showPassword),
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                  children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Eye, { className: "w-5 h-5" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "confirmPassword", className: "text-sm text-muted-foreground mb-2 block", children: "Confirm Password" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "confirmPassword",
                type: showPassword ? "text" : "password",
                value: confirmPassword,
                onChange: (e) => setConfirmPassword(e.target.value),
                required: true,
                autoComplete: "new-password",
                className: "w-full bg-input-background border border-border rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-foreground focus:ring-2 focus:ring-accent/20 transition-all",
                placeholder: "Confirm your password"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                id: "terms",
                required: true,
                className: "mt-1 w-4 h-4 rounded border-border accent-foreground focus:ring-accent/20"
              }
            ),
            /* @__PURE__ */ jsxs("label", { htmlFor: "terms", className: "text-sm text-muted-foreground", children: [
              "I agree to the",
              " ",
              /* @__PURE__ */ jsx("a", { href: "/", className: "text-accent hover:underline", children: "Terms of Service" }),
              " ",
              "and",
              " ",
              /* @__PURE__ */ jsx("a", { href: "/", className: "text-accent hover:underline", children: "Privacy Policy" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: loading,
              className: "w-full bg-primary text-primary-foreground py-4 rounded-[16px] font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2",
              children: loading ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : "Create Account"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-8 text-center text-sm text-muted-foreground", children: [
          "Already have an account?",
          " ",
          /* @__PURE__ */ jsx("a", { href: "/login", className: "font-medium text-accent hover:underline", children: "Sign in" })
        ] })
      ]
    }
  ) });
}

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "RegisterForm", RegisterForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Vyaa/frontend/src/islands/RegisterForm", "client:component-export": "RegisterForm" })} ` })}`;
}, "D:/Vyaa/frontend/src/pages/register.astro", void 0);

const $$file = "D:/Vyaa/frontend/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
