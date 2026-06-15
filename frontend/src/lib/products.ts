export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  original_price: number | null;
  color: string;
  category_id: string;
  status: "active" | "draft" | "archived";
  created_at: string;
  updated_at: string;
  category: { name: string; slug: string } | null;
  images: { id: string; url: string; alt_text: string; sort_order: number }[];
  sizes: { id: string; size: string; inventory: number }[];
}

export async function getProduct(slug: string): Promise<Product | null> {
  const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:3001/api";
  try {
    const res = await fetch(`${API_URL}/products/${slug}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getProducts(params?: Record<string, string>): Promise<{ products: Product[]; total: number }> {
  const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:3001/api";
  const qs = params ? `?${new URLSearchParams(params)}` : "";
  try {
    const res = await fetch(`${API_URL}/products${qs}`);
    if (!res.ok) return { products: [], total: 0 };
    return res.json();
  } catch {
    return { products: [], total: 0 };
  }
}

export async function getCategories(): Promise<{ id: string; name: string; slug: string; description: string | null }[]> {
  const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:3001/api";
  try {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
