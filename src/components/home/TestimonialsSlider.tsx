import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  { name: "Sarah Johnson", role: "Interior Designer", avatar: "https://i.pravatar.cc/80?img=1", rating: 5, text: "The quality of products from LUXE is unmatched. Every piece I've purchased has exceeded my expectations." },
  { name: "Michael Chen", role: "Tech Enthusiast", avatar: "https://i.pravatar.cc/80?img=3", rating: 5, text: "Fast shipping, premium packaging, and incredible products. LUXE is now my go-to for all premium purchases." },
  { name: "Emily Davis", role: "Fashion Blogger", avatar: "https://i.pravatar.cc/80?img=5", rating: 5, text: "I've been recommending LUXE to all my followers. The curation is impeccable and customer service is top-notch." },
  { name: "James Wilson", role: "Photographer", avatar: "https://i.pravatar.cc/80?img=7", rating: 4, text: "Found amazing camera equipment here that I couldn't find anywhere else. The descriptions are accurate and helpful." },
];

const TestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Join thousands of satisfied customers</p>
        </motion.div>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={20} className={i < t.rating ? "text-accent fill-accent" : "text-muted-foreground/30"} />
              ))}
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80 italic mb-8">"{t.text}"</p>
            <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full mx-auto mb-3 object-cover" />
            <p className="font-semibold">{t.name}</p>
            <p className="text-sm text-muted-foreground">{t.role}</p>
          </motion.div>
          <div className="flex justify-center items-center gap-4 mt-8">
            <button onClick={() => setCurrent((current - 1 + testimonials.length) % testimonials.length)} className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"><ChevronLeft size={20} /></button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-accent" : "bg-muted-foreground/30"}`} />
              ))}
            </div>
            <button onClick={() => setCurrent((current + 1) % testimonials.length)} className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
