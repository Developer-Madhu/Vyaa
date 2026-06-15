import { Link } from "react-router";
import { ProductCard } from "../components/ProductCard";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const newArrivals = [
  { id: "1", name: "Silk Wrap Midi Dress", price: "₹8,990", category: "Dresses", image: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmZW1pbmluZSUyMGZhc2hpb24lMjBtb2RlbCUyMGRyZXNzfGVufDF8fHx8MTc4MTUwMjAyMnww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "2", name: "Tailored Wool Coat", price: "₹14,500", category: "Outerwear", image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZWxlZ2FudCUyMHdvbWVuJTIwb3V0Zml0JTIwY29hdHxlbnwxfHx8fDE3ODE1MDIwMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "3", name: "Leather Crossbody Bag", price: "₹6,200", category: "Accessories", image: "https://images.unsplash.com/photo-1705909237050-7a7625b47fac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3b21lbiUyMGxlYXRoZXIlMjBiYWclMjBwdXJzZXxlbnwxfHx8fDE3ODE1MDIwMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "4", name: "Gold Plated Pendant", price: "₹3,400", category: "Jewelry", image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwamV3ZWxyeSUyMG5lY2tsYWNlJTIwZmFzaGlvbnxlbnwxfHx8fDE3ODE1MDIwMjV8MA&ixlib=rb-4.1.0&q=80&w=1080" }
];

export function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full bg-muted flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1606143412458-acc5f86de897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwc3R5bGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3ODE1MDIwMjJ8MA&ixlib=rb-4.1.0&q=80&w=1920" 
            alt="Editorial fashion" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <h1 className="font-heading text-4xl md:text-6xl text-white font-medium mb-6 leading-tight">
              The Art of <br/>Everyday Elegance
            </h1>
            <p className="text-lg text-white/90 mb-10 font-light">
              Discover our new Autumn/Winter collection. Crafted for the modern woman who appreciates subtle luxury.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-[16px] text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Shop Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-heading text-3xl font-medium">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Dresses", "Outerwear", "Accessories"].map((category, i) => (
            <Link to="/shop" key={category} className="group relative aspect-[4/5] overflow-hidden rounded-[16px] bg-muted block">
              <img 
                src={[
                  "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmZW1pbmluZSUyMGZhc2hpb24lMjBtb2RlbCUyMGRyZXNzfGVufDF8fHx8MTc4MTUwMjAyMnww&ixlib=rb-4.1.0&q=80&w=800",
                  "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZWxlZ2FudCUyMHdvbWVuJTIwb3V0Zml0JTIwY29hdHxlbnwxfHx8fDE3ODE1MDIwMjJ8MA&ixlib=rb-4.1.0&q=80&w=800",
                  "https://images.unsplash.com/photo-1705909237050-7a7625b47fac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3b21lbiUyMGxlYXRoZXIlMjBiYWclMjBwdXJzZXxlbnwxfHx8fDE3ODE1MDIwMjJ8MA&ixlib=rb-4.1.0&q=80&w=800"
                ][i]} 
                alt={category} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white font-heading text-2xl font-medium mb-2">{category}</h3>
                <span className="text-white/80 text-sm flex items-center group-hover:text-white transition-colors">
                  Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl font-medium mb-2">New Arrivals</h2>
              <p className="text-muted-foreground text-sm">Discover the latest additions to our collection.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-sm font-medium hover:text-accent transition-colors">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <Link to="/shop" className="mt-8 flex md:hidden items-center justify-center text-sm font-medium">
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Editorial / Testimonial Block */}
      <section className="py-32 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] md:aspect-square rounded-[16px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1617370447481-f4691f05d6f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB3b21hbiUyMHNtaWxpbmclMjBvdXRkb29ycyUyMGZhc2hpb258ZW58MXx8fHwxNzgxNTAyMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Brand imagery" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col space-y-8">
            <h2 className="font-heading text-4xl font-medium leading-tight">
              Redefining luxury through minimalist design and sustainable practices.
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed font-light">
              "VYAA has completely transformed my wardrobe. Their pieces are timeless, elegant, and incredibly well-made. It's the only brand I trust for both everyday essentials and statement pieces."
            </p>
            <div className="flex items-center space-x-4 pt-4 border-t border-border">
              <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" alt="Customer" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium">Priya Sharma</p>
                <p className="text-xs text-muted-foreground">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
