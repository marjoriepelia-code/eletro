export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'smartphones' | 'laptops' | 'audio' | 'wearables' | 'gamer' | 'acessorios';
  categoryLabel: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  specs: {
    key: string;
    value: string;
  }[];
  description: string;
  features: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isFlashDeal?: boolean;
  stock: number;
  colors?: { name: string; hex: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type CategoryId = 'all' | 'smartphones' | 'laptops' | 'audio' | 'wearables' | 'gamer' | 'acessorios';

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  description: string;
  iconName: string;
  productCount: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  title: string;
  comment: string;
  productName: string;
  date: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
