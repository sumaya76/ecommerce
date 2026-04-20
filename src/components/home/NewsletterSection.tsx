import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Welcome aboard! Check your inbox for exclusive offers.");
    setEmail("");
  };

  return (
    <section className="py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-6">
            <Mail size={24} className="text-accent" />
          </div>
          <h2 className="section-title">Stay in the Loop</h2>
          <p className="section-subtitle mb-8">Subscribe for early access to new arrivals, exclusive deals, and style inspiration.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-lg border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-accent/50"
              required
            />
            <Button type="submit" className="bg-accent text-accent-foreground hover:opacity-90 px-8 h-12">Subscribe</Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
