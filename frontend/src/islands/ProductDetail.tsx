import { useState } from "react";
import { Heart, ChevronRight, Star, Truck, RefreshCcw } from "lucide-react";
import { motion } from "motion/react";
import { addToCart } from "../store/cartStore";
import type { Product } from "../lib/products";

interface ProductDetailProps {
  slug: string;
  product: Product | null;
}

export function ProductDetail({ slug, product }: ProductDetailProps) {
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-muted-foreground">
        Product not found
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.size || "M");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        size: selectedSize,
        quantity: 1,
        image: product.images?.[0]?.url || "",
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // Revert cart counter if backend fails
      // This would require accessing the cart store to revert the state
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-xs text-muted-foreground mb-8">
        <span>Home</span> <ChevronRight className="w-3 h-3 mx-2" />
        <span>{product.category?.name || "Products"}</span> <ChevronRight className="w-3 h-3 mx-2" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Image Gallery */}
        <div className="flex-1 flex flex-col-reverse lg:flex-row gap-4">
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-24 lg:w-24 lg:h-32 shrink-0 rounded-[8px] overflow-hidden border-2 transition-colors ${selectedImage === idx ? 'border-accent' : 'border-transparent'}`}
              >
                <img src={img.url} alt={img.alt_text || `${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-[3/4] bg-muted rounded-[16px] overflow-hidden">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={product.images[selectedImage]?.url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-[400px] xl:w-[480px] flex flex-col pt-4">
          <h1 className="font-heading text-3xl font-medium mb-2">{product.name}</h1>
          <p className="text-xl mb-6">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(product.price)}</p>

          <div className="flex items-center space-x-1 text-accent mb-8">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground ml-2">(24 reviews)</span>
          </div>

          {product.sizes.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">Size</span>
                <button className="text-xs text-muted-foreground underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`w-12 h-12 rounded-[8px] border flex items-center justify-center text-sm transition-colors ${selectedSize === s.size ? 'border-foreground bg-foreground text-background' : 'border-border hover:border-foreground'}`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex-1 bg-primary text-primary-foreground py-4 rounded-[16px] font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </button>
            <button className="w-14 shrink-0 border border-border rounded-[16px] flex items-center justify-center hover:bg-muted transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6 border-t border-border pt-8 text-sm">
            <p className="text-foreground/80 leading-relaxed font-light">
              {product.description}
            </p>

            <ul className="space-y-4 pt-4 border-t border-border">
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Truck className="w-5 h-5 text-foreground" />
                <span>Free shipping on orders over ₹5,000</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <RefreshCcw className="w-5 h-5 text-foreground" />
                <span>30-day return policy</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
