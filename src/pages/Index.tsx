import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import QuickViewModal from "@/components/products/QuickViewModal";
import HeroBanner from "@/components/home/HeroBanner";
import CategoriesSection from "@/components/home/CategoriesSection";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import PromoBanner from "@/components/home/PromoBanner";
import NewsletterSection from "@/components/home/NewsletterSection";
import { Product } from "@/types/product";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";

const Index = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { items: recentlyViewed } = useRecentlyViewed();

  const featured = products.filter(p => p.badge === "new" || p.rating >= 4.7).slice(0, 4);
  const bestSellers = products.filter(p => p.reviewCount > 200).slice(0, 4);

  return (
    <div>
      <HeroBanner />

      {/* Featured Products */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">Our handpicked selections for you</p>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm font-medium text-accent hover:underline">
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      <CategoriesSection />

      {/* Best Sellers */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-title">Best Sellers</h2>
              <p className="section-subtitle">Most loved by our customers</p>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm font-medium text-accent hover:underline">
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      <PromoBanner />
      <TestimonialsSlider />

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="py-20">
          <div className="container-custom">
            <h2 className="section-title mb-8">Recently Viewed</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {recentlyViewed.slice(0, 4).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterSection />

      <QuickViewModal product={quickViewProduct} open={!!quickViewProduct} onOpenChange={(open) => !open && setQuickViewProduct(null)} />
    </div>
  );
};

export default Index;
