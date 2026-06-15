import { Minus, Plus, X } from "lucide-react";
import { useStore } from "@nanostores/react";
import { $cart, $cartTotal, removeFromCart, updateQuantity } from "../store/cartStore";
import { formatPrice } from "../lib/utils";

export function Cart() {
  const items = useStore($cart);
  const total = useStore($cartTotal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
      <h1 className="font-heading text-4xl font-medium mb-12">Shopping Bag</h1>

      {items.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <p className="text-lg mb-4">Your shopping bag is empty.</p>
          <a href="/shop" className="text-accent underline text-sm">Continue Shopping</a>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <div className="border-t border-border">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex py-8 border-b border-border relative group">
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="absolute right-0 top-8 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="w-24 h-32 bg-muted rounded-[8px] overflow-hidden shrink-0 mr-6">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-base font-medium mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-border rounded-full px-3 py-1">
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="p-1">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm px-4">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="p-1">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-muted/50 p-8 rounded-[16px]">
              <h2 className="font-medium text-lg mb-6">Order Summary</h2>

              <div className="space-y-4 text-sm mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between font-medium text-lg mb-8">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <a
                href="/checkout"
                className="w-full bg-primary text-primary-foreground py-4 rounded-[16px] font-medium hover:bg-primary/90 transition-colors flex justify-center"
              >
                Proceed to Checkout
              </a>

              <div className="mt-6 flex gap-2">
                <input type="text" placeholder="Promo code" className="flex-1 bg-background border border-border rounded-[8px] px-4 py-2 text-sm focus:outline-none focus:border-foreground" />
                <button className="px-4 py-2 bg-foreground text-background text-sm font-medium rounded-[8px]">Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
