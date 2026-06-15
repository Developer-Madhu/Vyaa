import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

interface ShopProduct {
  id: string;
  slug: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

interface ShopCategory {
  id: string;
  name: string;
  slug: string;
}

interface ShopProps {
  products: ShopProduct[];
  categories: ShopCategory[];
}

export function Shop({ products = [], categories = [] }: ShopProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(p => {
    if (activeCategory !== "All" && p.category !== activeCategory) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const categoryNames = ["All", ...categories.map((c) => c.name)];

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
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full lg:w-64 shrink-0`}>
          <div className="pr-8">
            <div className="mb-8">
              <h3 className="font-medium mb-4">Categories</h3>
              <ul className="space-y-3">
                {categoryNames.map(cat => (
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
              <div className="space-y-4">
                <input type="range" className="w-full accent-accent" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹0</span>
                  <span>₹25,000+</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

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
