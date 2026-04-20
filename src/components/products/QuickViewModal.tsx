import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuickViewModal = ({ product, open, onOpenChange }: QuickViewModalProps) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="aspect-square bg-secondary/30">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.brand}</p>
              <h2 className="font-display text-xl font-bold mt-1">{product.title}</h2>
              <div className="flex items-center gap-1 mt-2">
                <Star size={14} className="text-accent fill-accent" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-base text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{product.description}</p>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-secondary transition-colors"><Minus size={16} /></button>
                  <span className="px-4 text-sm font-medium">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-secondary transition-colors"><Plus size={16} /></button>
                </div>
                <Button onClick={() => { addToCart(product, qty); onOpenChange(false); setQty(1); }} className="flex-1 bg-accent text-accent-foreground hover:opacity-90">
                  <ShoppingCart size={16} className="mr-2" /> Add to Cart
                </Button>
              </div>
              <Link
                to={`/product/${product.id}`}
                onClick={() => onOpenChange(false)}
                className="block text-center text-sm text-accent hover:underline"
              >
                View Full Details →
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
