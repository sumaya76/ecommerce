import { SortOption } from "@/types/product";
import { categories, brands } from "@/data/products";
import { X, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ProductFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedBrands: string[];
  setSelectedBrands: (b: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (r: [number, number]) => void;
  minRating: number;
  setMinRating: (r: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (s: boolean) => void;
  sortBy: SortOption;
  setSortBy: (s: SortOption) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
];

const ProductFilters = ({
  selectedCategory, setSelectedCategory,
  selectedBrands, setSelectedBrands,
  priceRange, setPriceRange,
  minRating, setMinRating,
  inStockOnly, setInStockOnly,
  sortBy, setSortBy,
  clearFilters, hasActiveFilters,
}: ProductFiltersProps) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(
      selectedBrands.includes(brand)
        ? selectedBrands.filter(b => b !== brand)
        : [...selectedBrands, brand]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Sort By</h4>
        <select
          value={sortBy}
          onChange={e => { setSortBy(e.target.value as SortOption); localStorage.setItem("preferredSort", e.target.value); }}
          className="w-full px-3 py-2 rounded-lg bg-secondary text-sm border border-border outline-none focus:ring-1 focus:ring-accent"
        >
          {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Category</h4>
        <div className="space-y-1.5">
          <button onClick={() => setSelectedCategory("")} className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${!selectedCategory ? "bg-accent text-accent-foreground" : "hover:bg-secondary"}`}>
            All Categories
          </button>
          {categories.map(cat => (
            <button key={cat.name} onClick={() => setSelectedCategory(cat.name)} className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${selectedCategory === cat.name ? "bg-accent text-accent-foreground" : "hover:bg-secondary"}`}>
              {cat.name} <span className="text-xs opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Price Range</h4>
        <div className="flex gap-2 items-center">
          <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="w-full px-3 py-2 rounded-lg bg-secondary text-sm border border-border outline-none" placeholder="Min" />
          <span className="text-muted-foreground">—</span>
          <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="w-full px-3 py-2 rounded-lg bg-secondary text-sm border border-border outline-none" placeholder="Max" />
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Brand</h4>
        <div className="space-y-1.5">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer hover:text-accent transition-colors">
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="rounded border-border accent-accent" />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Min Rating</h4>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(star => (
            <button key={star} onClick={() => setMinRating(minRating === star ? 0 : star)} className={`px-3 py-1.5 rounded text-sm border transition-colors ${minRating >= star ? "bg-accent text-accent-foreground border-accent" : "border-border hover:border-accent"}`}>
              {star}★
            </button>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} className="rounded border-border accent-accent" />
        In Stock Only
      </label>

      {/* Clear */}
      {hasActiveFilters && (
        <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-destructive hover:underline">
          <X size={14} /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <button onClick={() => setMobileFiltersOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-secondary transition-colors">
        <SlidersHorizontal size={16} /> Filters
        {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-accent" />}
      </button>

      {/* Desktop sidebar */}
      <div className="hidden lg:block sticky top-24 w-64 shrink-0">
        <FilterContent />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileFiltersOpen(false)} className="lg:hidden fixed inset-0 bg-foreground/30 z-50" />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-background z-50 overflow-auto p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-lg font-bold">Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-2 rounded-full hover:bg-secondary"><X size={20} /></button>
              </div>
              <FilterContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductFilters;
