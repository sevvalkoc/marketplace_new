import { RouterProvider } from 'react-router';
import { useEffect } from 'react';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { initAnalytics } from './lib/analytics';

export default function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <CartProvider>
      <WishlistProvider>
        <RouterProvider router={router} />
      </WishlistProvider>
    </CartProvider>
  );
}
