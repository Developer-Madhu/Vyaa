import { Heart } from "lucide-react";

interface ProductCardProps {
  id: string;
  slug?: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

export function ProductCard({ id, slug, name, price, image, category }: ProductCardProps) {
  return (
    <a href={`/product/${slug || id}`} className="group flex flex-col">
      <div className="relative aspect-[3/4] mb-4 bg-muted overflow-hidden rounded-[16px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-accent">
          <Heart className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-col space-y-1">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{category}</span>
        <h3 className="text-sm font-medium text-foreground">{name}</h3>
        <span className="text-sm text-foreground/80">{price}</span>
      </div>
    </a>
  );
}
