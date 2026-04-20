import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/products/Breadcrumbs";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="pt-20 md:pt-24 pb-16">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: "Contact" }]} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto py-8">
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {[
              { icon: MapPin, title: "Visit Us", text: "123 Design Street\nNew York, NY 10001" },
              { icon: Phone, title: "Call Us", text: "+1 (555) 123-4567\nMon-Fri 9am-6pm" },
              { icon: Mail, title: "Email Us", text: "hello@luxestore.com\nsupport@luxestore.com" },
            ].map(item => (
              <div key={item.title} className="flex gap-4 p-5 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line mt-1">{item.text}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-secondary">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop&auto=format" alt="Map" className="w-full h-full object-cover opacity-70" />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit} className="lg:col-span-2 p-8 rounded-xl border border-border bg-card space-y-6">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Name</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border bg-background text-sm outline-none transition-colors focus:ring-2 focus:ring-accent/50 ${errors.name ? "border-destructive" : "border-border"}`}
                placeholder="Your name"
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border bg-background text-sm outline-none transition-colors focus:ring-2 focus:ring-accent/50 ${errors.email ? "border-destructive" : "border-border"}`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Message</label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border bg-background text-sm outline-none transition-colors focus:ring-2 focus:ring-accent/50 resize-none ${errors.message ? "border-destructive" : "border-border"}`}
                placeholder="How can we help you?"
              />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:opacity-90 h-12 text-base" disabled={submitted}>
              {submitted ? "Message Sent ✓" : <><Send size={18} className="mr-2" /> Send Message</>}
            </Button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
