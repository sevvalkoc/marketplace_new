import { createContext, useContext, useState, ReactNode } from 'react';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  seller: string;
  sellerSlug?: string;
  image: string;
  isNew?: boolean;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

const initialItems: WishlistItem[] = [
  {
    id: '7',
    name: 'Sculptural Table Lamp',
    price: 220.00,
    seller: 'Light & Form',
    sellerSlug: 'light-form',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=500&fit=crop',
    isNew: true,
  },
  {
    id: '8',
    name: 'Silk Bias-Cut Dress',
    price: 248.00,
    seller: 'Atelier Rose',
    sellerSlug: 'atelier-rose',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
    isNew: true,
  },
  {
    id: '5',
    name: 'Botanical Vitamin C Serum',
    price: 68.00,
    seller: 'Pure Botanics',
    sellerSlug: 'pure-botanics',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=500&fit=crop',
    isNew: true,
  },
];

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>(initialItems);

  const addToWishlist = (item: WishlistItem) => {
    setItems(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const isWishlisted = (id: string) => items.some(i => i.id === id);

  const toggleWishlist = (item: WishlistItem) => {
    if (isWishlisted(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const itemCount = items.length;

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist, itemCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
