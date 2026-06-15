import { Link } from "react-router";

export function Checkout() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Form */}
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-medium mb-6">Contact Information</h2>
            <input type="email" placeholder="Email" className="w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors mb-4" />
            <label className="flex items-center space-x-3 text-sm text-muted-foreground">
              <input type="checkbox" className="w-4 h-4 rounded border-border accent-foreground" />
              <span>Email me with news and offers</span>
            </label>
          </div>

          <div className="mb-12">
            <h2 className="font-heading text-2xl font-medium mb-6">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <select className="col-span-2 w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors bg-background">
                <option>India</option>
                <option>United States</option>
              </select>
              <input type="text" placeholder="First Name" className="w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
              <input type="text" placeholder="Last Name" className="w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
              <input type="text" placeholder="Address" className="col-span-2 w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
              <input type="text" placeholder="Apartment, suite, etc. (optional)" className="col-span-2 w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
              <input type="text" placeholder="City" className="w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
              <div className="grid grid-cols-2 gap-4 col-span-2 md:col-span-1">
                <input type="text" placeholder="State" className="w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
                <input type="text" placeholder="PIN code" className="w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
              </div>
              <input type="tel" placeholder="Phone" className="col-span-2 w-full border border-border rounded-[8px] px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-heading text-2xl font-medium mb-6">Payment</h2>
            <p className="text-sm text-muted-foreground mb-4">All transactions are secure and encrypted.</p>
            <div className="border border-border rounded-[8px] p-6 bg-muted/20 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-sm">
                <span className="font-bold text-blue-600 text-xl">R</span>
              </div>
              <p className="text-sm font-medium text-center">After clicking "Pay now", you will be redirected to Razorpay Secure to complete your purchase securely.</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
            <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Return to cart
            </Link>
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-[16px] font-medium hover:bg-primary/90 transition-colors">
              Pay now
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[420px] bg-muted/30 p-8 rounded-[16px] h-fit sticky top-24">
          <h2 className="font-medium text-lg mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6 pb-6 border-b border-border/50">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center space-x-4">
                <div className="relative w-16 h-20 bg-background rounded-[8px] overflow-hidden shrink-0 border border-border">
                  <img src="https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400" alt="Product" className="w-full h-full object-cover" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-foreground text-background text-xs rounded-full flex items-center justify-center">1</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Silk Wrap Midi Dress</h4>
                  <p className="text-xs text-muted-foreground">Ivory / M</p>
                </div>
                <span className="text-sm font-medium">₹8,990</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-sm mb-6 pb-6 border-b border-border/50">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹17,980</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <span className="text-lg">Total</span>
            <div className="text-right">
              <span className="text-xs text-muted-foreground mr-2">INR</span>
              <span className="text-2xl font-medium">₹17,980</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
