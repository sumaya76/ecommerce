import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";

interface RecentlyViewedContextType {
  items: Product[];
  addToRecentlyViewed: (product: Product) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export const RecentlyViewedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem("recentlyViewed");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("recentlyViewed", JSON.stringify(items));
  }, [items]);

  const addToRecentlyViewed = useCallback((product: Product) => {
    setItems(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ items, addToRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return ctx;
};
