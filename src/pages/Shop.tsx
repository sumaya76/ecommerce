import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchProducts } from "@/lib/api";
import { Product, SortOption } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import QuickViewModal from "@/components/products/QuickViewModal";
import SkeletonCard from "@/components/products/SkeletonCard";
import Breadcrumbs from "@/components/products/Breadcrumbs";
import { LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 12;

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>(() => (localStorage.getItem("preferredSort") as SortOption) || "popular");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (searchQuery) result = result.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (selectedBrands.length) result = result.filter(p => selectedBrands.includes(p.brand));
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (minRating) result = result.filter(p => p.rating >= minRating);
    if (inStockOnly) result = result.filter(p => p.inStock);

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "popular": result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case "newest": result.sort((a, b) => b.id - a.id); break;
    }
    return result;
  }, [products, selectedCategory, selectedBrands, priceRange, minRating, inStockOnly, sortBy, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(0, page * ITEMS_PER_PAGE);

  const hasActiveFilters = !!selectedCategory || selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 2000 || minRating > 0 || inStockOnly;

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedBrands([]);
    setPriceRange([0, 2000]);
    setMinRating(0);
    setInStockOnly(false);
  };

  return (
    <div className="pt-20 md:pt-24 pb-16">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: "Shop", path: "/shop" }, ...(selectedCategory ? [{ label: selectedCategory }] : [])]} />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="section-title">
              {searchQuery ? `Results for "${searchQuery}"` : selectedCategory || "All Products"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{filteredProducts.length} products</p>
          </div>
          <ProductFilters
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}
            priceRange={priceRange} setPriceRange={setPriceRange}
            minRating={minRating} setMinRating={setMinRating}
            inStockOnly={inStockOnly} setInStockOnly={setInStockOnly}
            sortBy={sortBy} setSortBy={setSortBy}
            clearFilters={clearFilters} hasActiveFilters={hasActiveFilters}
          />
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar filters */}
          <div className="hidden lg:block">
            <ProductFilters
              selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
              selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}
              priceRange={priceRange} setPriceRange={setPriceRange}
              minRating={minRating} setMinRating={setMinRating}
              inStockOnly={inStockOnly} setInStockOnly={setInStockOnly}
              sortBy={sortBy} setSortBy={setSortBy}
              clearFilters={clearFilters} hasActiveFilters={hasActiveFilters}
            />
          </div>

          {/* Products grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
                <button onClick={clearFilters} className="mt-4 text-accent hover:underline text-sm">Clear all filters</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {paginatedProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickViewProduct} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => setPage(p => Math.max(p - 1, 1))}
                      disabled={page === 1}
                      className="p-2 rounded-full border hover:bg-secondary disabled:opacity-50"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-4 py-2 rounded-lg border font-medium ${
                          page === i + 1 ? 'bg-accent text-accent-foreground border-accent' : 'hover:bg-secondary'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(totalPages)}
                      disabled={page === totalPages}
                      className="p-2 rounded-full border hover:bg-secondary disabled:opacity-50"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} open={!!quickViewProduct} onOpenChange={(open) => !open && setQuickViewProduct(null)} />
    </div>
  );
};

export default Shop;
