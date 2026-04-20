import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
}

const ProductCard = ({ product, index = 0, onQuickView }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
    >
      {/* Badge */}
      {product.badge && (
        <span className={`product-badge-${product.badge}`}>
          {product.badge}
        </span>
      )}

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-secondary/30">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/50 to-secondary animate-shimmer bg-[length:200%_100%]" />
        )}
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
        />
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="p-2.5 rounded-full bg-card text-foreground shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className={`p-2.5 rounded-full shadow-lg transition-colors ${
              isInWishlist(product.id) ? "bg-destructive text-destructive-foreground" : "bg-card text-foreground hover:bg-destructive hover:text-destructive-foreground"
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
          </motion.button>
          {onQuickView && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.preventDefault(); onQuickView(product); }}
              className="p-2.5 rounded-full bg-card text-foreground shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Quick view"
            >
              <Eye size={18} />
            </motion.button>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-sm leading-tight hover:text-accent transition-colors line-clamp-2">{product.title}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-2">
          <Star size={14} className="text-accent fill-accent" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-base">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
