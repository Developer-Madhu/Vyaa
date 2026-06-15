import { useState } from "react";
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useStore } from "@nanostores/react";
import { $cartCount } from "../store/cartStore";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = useStore($cartCount);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          {/* Logo */}
          <a href="/" className="font-heading text-2xl font-semibold tracking-wide text-foreground">
            VYAA
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/shop" className="text-sm font-medium text-foreground hover:text-accent transition-colors">New In</a>
            <a href="/shop" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Clothing</a>
            <a href="/shop" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Dresses</a>
            <a href="/shop" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Accessories</a>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-foreground hover:text-accent transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <a href="/account" className="hidden md:block p-2 text-foreground hover:text-accent transition-colors">
              <User className="w-5 h-5" />
            </a>
            <button className="hidden md:block p-2 text-foreground hover:text-accent transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <a href="/cart" className="p-2 text-foreground hover:text-accent transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent rounded-full text-[10px] font-medium text-white flex items-center justify-center border border-background">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-background z-50 md:hidden shadow-xl flex flex-col"
            >
              <div className="p-4 flex items-center justify-between border-b border-border/40">
                <span className="font-heading text-xl font-semibold">VYAA</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-6 flex flex-col space-y-6">
                <a href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">New In</a>
                <a href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Clothing</a>
                <a href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Dresses</a>
                <a href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Accessories</a>
              </div>
              <div className="p-6 border-t border-border/40 flex flex-col space-y-4">
                <a href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 text-sm">
                  <User className="w-5 h-5" /> <span>My Account</span>
                </a>
                <a href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 text-sm">
                  <Heart className="w-5 h-5" /> <span>Wishlist</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
