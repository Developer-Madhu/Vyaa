import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ALL_PRODUCTS = [
  { id: "1", name: "Silk Wrap Midi Dress", price: "₹8,990", category: "Dresses", image: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: "2", name: "Tailored Wool Coat", price: "₹14,500", category: "Outerwear", image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: "3", name: "Leather Crossbody Bag", price: "₹6,200", category: "Accessories", image: "https://images.unsplash.com/photo-1705909237050-7a7625b47fac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: "4", name: "Gold Plated Pendant", price: "₹3,400", category: "Jewelry", image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: "5", name: "Linen Wide-Leg Trousers", price: "₹4,500", category: "Clothing", image: "https://images.unsplash.com/photo-1606143412458-acc5f86de897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: "6", name: "Cashmere Turtleneck", price: "₹9,800", category: "Clothing", image: "https://images.unsplash.com/photo-1617370447481-f4691f05d6f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
];

const CATEGORIES = ["All", "Clothing", "Dresses", "Outerwear", "Accessories", "Jewelry"];

export function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = ALL_PRODUCTS.filter(p => {
    if (activeCategory !== "All" && p.category !== activeCategory) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-6 md:space-y-0">
        <div>
          <h1 className="font-heading text-4xl font-medium mb-4">The Collection</h1>
          <p className="text-muted-foreground text-sm max-w-md">
            Explore our curated selection of premium pieces designed for the modern wardrobe.
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input-background rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden md:inline">Filters</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <AnimatePresence>
          {(showFilters || window.innerWidth > 768) && (
            <motion.aside 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: showFilters ? "16rem" : (window.innerWidth > 768 ? "16rem" : "0") }}
              exit={{ opacity: 0, width: 0 }}
              className="md:block shrink-0 overflow-hidden"
            >
              <div className="w-64 pr-8">
                <div className="mb-8">
                  <h3 className="font-medium mb-4">Categories</h3>
                  <ul className="space-y-3">
                    {CATEGORIES.map(cat => (
                      <li key={cat}>
                        <button 
                          onClick={() => setActiveCategory(cat)}
                          className={`text-sm ${activeCategory === cat ? 'text-accent font-medium' : 'text-muted-foreground hover:text-foreground'} transition-colors`}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="font-medium mb-4 flex justify-between items-center">
                    Price <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </h3>
                  {/* Mock Price Filter */}
                  <div className="space-y-4">
                    <input type="range" className="w-full accent-accent" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹0</span>
                      <span>₹25,000+</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
            <span>Showing {filteredProducts.length} results</span>
            <div className="flex items-center space-x-2">
              <span>Sort by:</span>
              <select className="bg-transparent font-medium text-foreground focus:outline-none">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-muted-foreground">
              No products found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
