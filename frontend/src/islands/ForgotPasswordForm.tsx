import { useState } from "react";
import { motion } from "motion/react";
import { Loader2, Mail, CheckCircle } from "lucide-react";
import { api } from "../lib/api";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"email" | "success">("email");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.auth.forgotPassword(email);
      setStep("success");
    } catch (e: any) {
      setError(e.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-background rounded-[24px] p-8 sm:p-10 border border-border/50"
      >
        <div className="text-center mb-10">
          {step === "email" ? (
            <>
              <h1 className="font-heading text-3xl font-medium mb-2">Forgot Password?</h1>
              <p className="text-muted-foreground text-sm">
                Enter your email and we'll send you a reset link
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="font-heading text-3xl font-medium mb-2">Check Your Email</h1>
              <p className="text-muted-foreground text-sm">
                We've sent a password reset link to <span className="font-medium">{email}</span>
              </p>
            </>
          )}
        </div>

        {step === "email" && error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 text-red-700 rounded-[12px] text-sm"
          >
            {error}
          </motion.div>
        )}

        {step === "email" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full bg-input-background border border-border rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-foreground focus:ring-2 focus:ring-accent/20 transition-all pl-11"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-4 rounded-[16px] font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Didn't receive the email? Check your spam folder or
            </p>
            <button
              onClick={() => { setStep("email"); setEmail(""); }}
              className="w-full bg-primary text-primary-foreground py-4 rounded-[16px] font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Resend Email
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <a href="/login" className="font-medium text-accent hover:underline">
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
}