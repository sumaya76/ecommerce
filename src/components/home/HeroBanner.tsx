import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroBanner = () => {
const backgrounds = [
  'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1920&auto=format&fit=crop&q=85', // 🛍️ Shopping bags
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&auto=format&fit=crop&q=85', // 👗 Fashion lifestyle
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1920&auto=format&fit=crop&q=85', // 🎧 Tech gadgets
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&auto=format&fit=crop&q=85'  // ⌚ Watch (NEW - working)
];
 
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={backgrounds[bgIndex]} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1.5 bg-accent/20 text-accent-foreground backdrop-blur-sm rounded-full text-sm font-medium mb-6"
          >
            New Collection 2026
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-display text-5xl md:text-7xl font-bold leading-tight text-primary-foreground"
          >
            Curated for
            <br />
            <span className="text-accent">Modern</span> Living
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-lg text-primary-foreground/80 max-w-md leading-relaxed"
          >
            Discover our handpicked collection of premium products designed for those who appreciate quality and aesthetics.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex gap-4"
          >
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:opacity-90 px-8 h-12 text-base">
              <Link to="/shop">
                Shop Now <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 h-12 text-base">
              <Link to="/about">Our Story</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;

