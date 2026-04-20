import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const PromoBanner = () => (
  <section className="py-20">
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-10 md:p-16"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 rounded-l-full blur-3xl" />
        <div className="relative z-10 max-w-lg">
          <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground backdrop-blur-sm rounded-full text-sm font-medium mb-4">Limited Time</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground leading-tight">
            Up to <span className="text-accent">40% Off</span>
            <br />Spring Collection
          </h2>
          <p className="mt-4 text-primary-foreground/70 text-lg">Don't miss out on our biggest sale of the season. Premium quality at unbeatable prices.</p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:opacity-90 px-8 h-12">
            <Link to="/shop">Shop the Sale <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default PromoBanner;
