import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { categories } from "@/data/products";

const CategoriesSection = () => (
  <section className="py-20">
    <div className="container-custom">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="section-title">Shop by Category</h2>
        <p className="section-subtitle">Find exactly what you're looking for</p>
      </motion.div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/shop?category=${cat.name}`} className="group block relative aspect-[4/5] rounded-xl overflow-hidden">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-xl font-bold text-primary-foreground">{cat.name}</h3>
                <p className="text-primary-foreground/70 text-sm mt-1">{cat.count} products</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
