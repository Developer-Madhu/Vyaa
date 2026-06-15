import { Outlet, Link } from "react-router";
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-xs md:text-sm font-medium tracking-wide">
        Free Shipping on all orders over ₹5,000. Shop New Arrivals.
      </div>

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
          <Link to="/" className="font-heading text-2xl font-semibold tracking-wide text-foreground">
            VYAA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/shop" className="text-sm font-medium text-foreground hover:text-accent transition-colors">New In</Link>
            <Link to="/shop" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Clothing</Link>
            <Link to="/shop" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Dresses</Link>
            <Link to="/shop" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Accessories</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-foreground hover:text-accent transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/account" className="hidden md:block p-2 text-foreground hover:text-accent transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <button className="hidden md:block p-2 text-foreground hover:text-accent transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <Link to="/cart" className="p-2 text-foreground hover:text-accent transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-background"></span>
            </Link>
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
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">New In</Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Clothing</Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Dresses</Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Accessories</Link>
              </div>
              <div className="p-6 border-t border-border/40 flex flex-col space-y-4">
                <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 text-sm">
                  <User className="w-5 h-5" /> <span>My Account</span>
                </Link>
                <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 text-sm">
                  <Heart className="w-5 h-5" /> <span>Wishlist</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-6">VYAA</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
                Elevating everyday elegance. Premium womenswear crafted for the modern muse.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-6">Shop</h4>
              <ul className="space-y-4 text-sm text-primary-foreground/70">
                <li><Link to="/shop" className="hover:text-white transition-colors">New Arrivals</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Clothing</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Accessories</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Sale</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-primary-foreground/70">
                <li><Link to="/" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">FAQs</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Size Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-6">Newsletter</h4>
              <p className="text-primary-foreground/70 text-sm mb-4">
                Subscribe to receive updates, access to exclusive deals, and more.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="bg-transparent border-b border-primary-foreground/30 py-2 w-full text-sm focus:outline-none focus:border-white transition-colors placeholder:text-primary-foreground/50"
                />
                <button className="border-b border-primary-foreground/30 py-2 px-4 text-sm hover:border-white transition-colors shrink-0">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/50 text-xs">
              © {new Date().getFullYear()} VYAA. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs text-primary-foreground/50">
              <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
