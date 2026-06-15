import { User, Package, Heart, MapPin, LogOut } from "lucide-react";
import { Link } from "react-router";

export function Account() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-medium mb-2">My Account</h1>
            <p className="text-sm text-muted-foreground">Priya Sharma</p>
          </div>
          <nav className="flex flex-col space-y-2">
            <button className="flex items-center space-x-3 px-4 py-3 bg-muted text-foreground rounded-[8px] font-medium text-sm transition-colors text-left">
              <User className="w-4 h-4" /> <span>Profile Details</span>
            </button>
            <button className="flex items-center space-x-3 px-4 py-3 text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-[8px] font-medium text-sm transition-colors text-left">
              <Package className="w-4 h-4" /> <span>Orders</span>
            </button>
            <button className="flex items-center space-x-3 px-4 py-3 text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-[8px] font-medium text-sm transition-colors text-left">
              <Heart className="w-4 h-4" /> <span>Wishlist</span>
            </button>
            <button className="flex items-center space-x-3 px-4 py-3 text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-[8px] font-medium text-sm transition-colors text-left">
              <MapPin className="w-4 h-4" /> <span>Addresses</span>
            </button>
            <div className="pt-4 mt-4 border-t border-border">
              <Link to="/" className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-[8px] font-medium text-sm transition-colors text-left">
                <LogOut className="w-4 h-4" /> <span>Log out</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-card border border-border rounded-[16px] p-8">
            <h2 className="text-xl font-medium mb-6">Profile Details</h2>
            
            <div className="space-y-6 max-w-md">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input type="text" defaultValue="Priya Sharma" className="w-full border border-border rounded-[8px] px-4 py-2 text-sm focus:outline-none focus:border-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" defaultValue="priya.sharma@example.com" className="w-full border border-border rounded-[8px] px-4 py-2 text-sm focus:outline-none focus:border-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input type="tel" defaultValue="+91 98765 43210" className="w-full border border-border rounded-[8px] px-4 py-2 text-sm focus:outline-none focus:border-foreground" />
              </div>
              <button className="bg-foreground text-background px-6 py-3 rounded-[8px] text-sm font-medium hover:bg-foreground/90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
