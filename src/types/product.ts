export interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  description: string;
  specifications: Record<string, string>;
  badge?: 'new' | 'sale' | 'hot';
  inStock: boolean;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'popular' | 'newest';
