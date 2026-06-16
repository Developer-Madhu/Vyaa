async function getProduct(slug) {
  const API_URL = "http://localhost:3001/api";
  try {
    const res = await fetch(`${API_URL}/products/${slug}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
async function getProducts(params) {
  const API_URL = "http://localhost:3001/api";
  const qs = "";
  try {
    const res = await fetch(`${API_URL}/products${qs}`);
    if (!res.ok) return { products: [], total: 0 };
    return res.json();
  } catch {
    return { products: [], total: 0 };
  }
}
async function getCategories() {
  const API_URL = "http://localhost:3001/api";
  try {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export { getProducts as a, getCategories as b, getProduct as g };
