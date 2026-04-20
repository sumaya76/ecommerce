import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, Minus, Plus, Share2, Facebook, Twitter } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import Breadcrumbs from "@/components/products/Breadcrumbs";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToRecentlyViewed, items: recentlyViewed } = useRecentlyViewed();
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [reviewSort, setReviewSort] = useState<"newest" | "highest" | "lowest">("newest");

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
      window.scrollTo(0, 0);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="pt-24 pb-16 container-custom text-center">
        <h1 className="section-title">Product Not Found</h1>
        <Link to="/shop" className="text-accent hover:underline mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const recentProducts = recentlyViewed.filter(p => p.id !== product.id).slice(0, 4);
  const sortedReviews = [...product.reviews].sort((a, b) => {
    if (reviewSort === "highest") return b.rating - a.rating;
    if (reviewSort === "lowest") return a.rating - b.rating;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const avgRating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <div className="pt-20 md:pt-24 pb-16">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: "Shop", path: "/shop" }, { label: product.category, path: `/shop?category=${product.category}` }, { label: product.title }]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-4">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div
              className="relative aspect-square rounded-xl overflow-hidden bg-secondary/30 cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300"
                style={isZooming ? { transform: "scale(2)", transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
              />
              {product.badge && <span className={`product-badge-${product.badge}`}>{product.badge}</span>}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? "border-accent" : "border-border"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">{product.brand}</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">{product.title}</h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={16} className={i < Math.round(product.rating) ? "text-accent fill-accent" : "text-muted-foreground/30"} />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-sm font-medium rounded">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>
            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Quantity & Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-secondary transition-colors"><Minus size={18} /></button>
                <span className="px-5 font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-secondary transition-colors"><Plus size={18} /></button>
              </div>
              <Button onClick={() => addToCart(product, qty)} className="flex-1 bg-accent text-accent-foreground hover:opacity-90 h-12 text-base">
                <ShoppingCart size={18} className="mr-2" /> Add to Cart
              </Button>
              <Button onClick={() => toggleWishlist(product)} variant="outline" size="icon" className={`h-12 w-12 ${isInWishlist(product.id) ? "border-destructive text-destructive" : ""}`}>
                <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </Button>
            </div>

            {/* Share */}
            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <Share2 size={16} /> Share:
              <a href="#" className="hover:text-accent transition-colors"><Facebook size={16} /></a>
              <a href="#" className="hover:text-accent transition-colors"><Twitter size={16} /></a>
            </div>

            {/* Specs */}
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="font-display text-lg font-semibold mb-4">Specifications</h3>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <tr key={key} className="border-b border-border">
                      <td className="py-2.5 text-muted-foreground font-medium w-40">{key}</td>
                      <td className="py-2.5">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">Customer Reviews</h2>
            <select value={reviewSort} onChange={e => setReviewSort(e.target.value as typeof reviewSort)} className="px-3 py-2 rounded-lg bg-secondary text-sm border border-border">
              <option value="newest">Newest</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>

          {/* Rating Summary */}
          <div className="flex items-center gap-8 mb-8 p-6 rounded-xl bg-secondary/30">
            <div className="text-center">
              <p className="text-4xl font-bold">{avgRating.toFixed(1)}</p>
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={14} className={i < Math.round(avgRating) ? "text-accent fill-accent" : "text-muted-foreground/30"} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{product.reviews.length} reviews</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5, 4, 3, 2, 1].map(star => {
                const count = product.reviews.filter(r => r.rating === star).length;
                const pct = (count / product.reviews.length) * 100;
                return (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="w-3">{star}</span>
                    <Star size={12} className="text-accent fill-accent" />
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} className="h-full bg-accent rounded-full" />
                    </div>
                    <span className="w-6 text-right text-muted-foreground">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {sortedReviews.map(review => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-5 rounded-xl border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-sm">{review.user}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={12} className={i < review.rating ? "text-accent fill-accent" : "text-muted-foreground/30"} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="section-title mb-8">Related Products</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="section-title mb-8">Recently Viewed</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {recentProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
