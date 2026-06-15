import { atom, computed, onMount } from "nanostores";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
};

export const $cart = atom<CartItem[]>([]);

export const $cartCount = computed($cart, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export const $cartTotal = computed($cart, (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

onMount($cart, () => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("vyaa-cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          $cart.set(parsed);
        }
      }
    } catch {}
  }

  return $cart.subscribe((items) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vyaa-cart", JSON.stringify(items));
    }
  });
});

export function addToCart(item: Omit<CartItem, "quantity"> & { quantity?: number }) {
  const current = $cart.get();
  const existing = current.find(
    (i) => i.id === item.id && i.size === item.size
  );
  if (existing) {
    $cart.set(
      current.map((i) =>
        i.id === item.id && i.size === item.size
          ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
          : i
      )
    );
  } else {
    $cart.set([
      ...current,
      { ...item, quantity: item.quantity ?? 1 },
    ]);
  }
}

export function removeFromCart(id: string, size: string) {
  $cart.set($cart.get().filter((i) => !(i.id === id && i.size === size)));
}

export function updateQuantity(id: string, size: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(id, size);
    return;
  }
  $cart.set(
    $cart.get().map((i) =>
      i.id === id && i.size === size ? { ...i, quantity } : i
    )
  );
}

export function clearCart() {
  $cart.set([]);
}
