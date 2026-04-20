import { motion } from "framer-motion";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/products/Breadcrumbs";

const WishlistPage = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="pt-20 md:pt-24 pb-16">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: "Wishlist" }]} />
        <h1 className="section-title mb-8">My Wishlist ({items.length})</h1>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Heart size={64} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-lg text-muted-foreground mb-6">Your wishlist is empty</p>
            <Button asChild className="bg-accent text-accent-foreground hover:opacity-90">
              <Link to="/shop">Discover Products</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                <Link to={`/product/${product.id}`} className="shrink-0">
                  <img src={product.image} alt={product.title} className="w-24 h-24 rounded-lg object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`} className="font-medium text-sm hover:text-accent transition-colors line-clamp-2">{product.title}</Link>
                  <p className="font-bold mt-1">${product.price.toFixed(2)}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" onClick={() => { addToCart(product); removeFromWishlist(product.id); }} className="bg-accent text-accent-foreground hover:opacity-90 text-xs h-8">
                      <ShoppingCart size={14} className="mr-1" /> Move to Cart
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => removeFromWishlist(product.id)} className="text-destructive border-destructive/30 h-8">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
