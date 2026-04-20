import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-1 mb-4">
              <span className="font-display text-2xl font-bold">LUXE</span>
              <span className="text-accent text-2xl font-display">.</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Curated collection of premium products for modern living. Quality meets design.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[{ name: "Home", path: "/" }, { name: "Shop", path: "/shop" }, { name: "About", path: "/about" }, { name: "Contact", path: "/contact" }].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <MapPin size={16} className="shrink-0" /> 123 Design Street, NYC 10001
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone size={16} className="shrink-0" /> +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail size={16} className="shrink-0" /> hello@luxestore.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">Subscribe for exclusive offers and new arrivals.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 bg-primary-foreground/10 rounded-lg text-sm placeholder:text-primary-foreground/40 outline-none focus:ring-1 focus:ring-accent"
                required
              />
              <button type="submit" className="px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-sm text-primary-foreground/50">© 2026 LUXE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
