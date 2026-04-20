import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import { toast } from "sonner";

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = useCallback((product: Product) => {
    setItems(prev => {
      if (prev.find(p => p.id === product.id)) return prev;
      return [...prev, product];
    });
    toast.success(`${product.title} added to wishlist`);
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setItems(prev => prev.filter(p => p.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId: number) => {
    return items.some(p => p.id === productId);
  }, [items]);

  const toggleWishlist = useCallback((product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info(`${product.title} removed from wishlist`);
    } else {
      addToWishlist(product);
    }
  }, [isInWishlist, removeFromWishlist, addToWishlist]);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
