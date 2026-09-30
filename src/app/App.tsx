import { RouterProvider, createBrowserRouter } from 'react-router';
import { useEffect } from 'react';
import { routes } from './routes';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { initAnalytics } from './lib/analytics';

// Created here rather than in routes.ts so the build-time prerender
// (src/entry-server.tsx) can import the route table without touching
// browser-only APIs.
const router = createBrowserRouter(routes);

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
