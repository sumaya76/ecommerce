import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Shopping Cart ({totalItems})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingBag size={48} className="opacity-30" />
            <p className="text-sm">Your cart is empty</p>
            <Button variant="outline" onClick={() => setIsCartOpen(false)} asChild>
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map(item => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 p-3 rounded-lg bg-secondary/30"
                  >
                    <img src={item.product.image} alt={item.product.title} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.product.title}</h4>
                      <p className="text-sm font-semibold text-accent mt-1">${item.product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded bg-secondary hover:bg-secondary/80 transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded bg-secondary hover:bg-secondary/80 transition-colors">
                          <Plus size={14} />
                        </button>
                        <button onClick={() => removeFromCart(item.product.id)} className="ml-auto p-1 rounded text-destructive hover:bg-destructive/10 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal</span>
                <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-accent text-accent-foreground hover:opacity-90" asChild>
                <Link to="/cart" onClick={() => setIsCartOpen(false)}>View Cart</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
