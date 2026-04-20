import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Heart, Menu, X, Moon, Sun, ChevronDown, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { products } from "@/data/products";
import { Product } from "@/types/product";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, setIsCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/shop?search=${encodeURIComponent(query)}`);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} className="bg-accent/30 rounded px-0.5">{part}</mark> : part
    );
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-sm border-b border-border" : "bg-background"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold tracking-tight">LUXE</span>
            <span className="text-accent font-display text-2xl">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-accent ${
                  location.pathname === link.path ? "text-accent" : "text-foreground/70"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-card rounded-lg shadow-xl border border-border overflow-hidden"
                  >
                    <div className="p-3">
                      <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
                        <Search size={16} className="text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          onKeyDown={e => e.key === "Enter" && handleSearch(searchQuery)}
                          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                          autoFocus
                        />
                      </div>
                    </div>
                    {searchResults.length > 0 && (
                      <div className="border-t border-border">
                        {searchResults.map(product => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors"
                          >
                            <img src={product.image} alt={product.title} className="w-10 h-10 rounded object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{highlightMatch(product.title, searchQuery)}</p>
                              <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    {!searchQuery && recentSearches.length > 0 && (
                      <div className="border-t border-border p-3">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Recent Searches</p>
                        <div className="flex flex-wrap gap-1">
                          {recentSearches.map((s, i) => (
                            <button
                              key={i}
                              onClick={() => { setSearchQuery(s); handleSearch(s); }}
                              className="text-xs px-2.5 py-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auth */}
            <div className="flex items-center gap-1">
              {user ? (
                <Button variant="ghost" size="sm" asChild className="h-9 px-2">
                  <Link to="/profile">{user.name}</Link>
                </Button>
              ) : (
                <Button variant="ghost" size="sm" asChild className="h-9 px-2">
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>

            {/* Theme toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Toggle theme">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="p-2 rounded-full hover:bg-secondary transition-colors relative" aria-label="Wishlist">
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button onClick={() => setIsCartOpen(true)} className="p-2 rounded-full hover:bg-secondary transition-colors relative" aria-label="Cart">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

  {/* Mobile Menu */}
  <AnimatePresence>
    {mobileMenuOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="md:hidden bg-background border-t border-border overflow-hidden"
      >
        <nav className="container-custom py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`py-3 px-4 rounded-lg text-sm font-medium tracking-wide uppercase transition-colors ${
                location.pathname === link.path ? "bg-secondary text-accent" : "hover:bg-secondary/50"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <Button variant="ghost" onClick={logout} className="justify-start w-full h-auto p-3 text-left">
              Logout
            </Button>
          )}
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
