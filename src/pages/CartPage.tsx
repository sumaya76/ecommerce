import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/products/Breadcrumbs";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();

  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="pt-20 md:pt-24 pb-16">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: "Cart" }]} />
        <h1 className="section-title mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <ShoppingBag size={64} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-lg text-muted-foreground mb-6">Your cart is empty</p>
            <Button asChild className="bg-accent text-accent-foreground hover:opacity-90">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <motion.div key={item.product.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-4 md:gap-6 p-4 rounded-xl border border-border bg-card">
                  <Link to={`/product/${item.product.id}`} className="shrink-0">
                    <img src={item.product.image} alt={item.product.title} className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.id}`} className="font-medium hover:text-accent transition-colors">{item.product.title}</Link>
                    <p className="text-sm text-muted-foreground mt-1">{item.product.brand}</p>
                    <p className="font-bold text-lg mt-2">${item.product.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-border rounded-lg">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-secondary transition-colors"><Minus size={14} /></button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-secondary transition-colors"><Plus size={14} /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                      <span className="ml-auto font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              <button onClick={clearCart} className="text-sm text-destructive hover:underline">Clear Cart</button>
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="p-6 rounded-xl border border-border bg-card space-y-4">
                <h3 className="font-display text-lg font-semibold">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
                  {shipping > 0 && <p className="text-xs text-accent">Free shipping on orders over $100</p>}
                </div>
                <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-accent text-accent-foreground hover:opacity-90 h-12 text-base">
                  Proceed to Checkout <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
