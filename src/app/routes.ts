import type { ComponentType } from 'react';
import { Navigate, type RouteObject } from 'react-router';
import { Layout } from './layout/Layout';

// Public pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { NewArrivals } from './pages/NewArrivals';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetail } from './pages/ProductDetail';
import { SellerProfile } from './pages/SellerProfile';
import { BrandDirectory } from './pages/BrandDirectory';
import { TheEdit } from './pages/TheEdit';
import { TheEditArticle } from './pages/TheEditArticle';
import { About } from './pages/About';
import { SearchResults } from './pages/SearchResults';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { Support } from './pages/Support';
import { NotFound } from './pages/NotFound';

// Buyer, seller and checkout screens are account-only, never prerendered or
// indexed, and carry the heaviest dependencies (charts, forms). They load on
// demand via react-router's `lazy` so shoppers and crawlers landing on the
// public storefront don't download them up front.
const page = <T extends Record<string, ComponentType>>(load: () => Promise<T>, name: keyof T) =>
  () => load().then((m) => ({ Component: m[name] }));

const HomeLivingRedirect = () => Navigate({ to: '/category/home', replace: true });

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'shop', Component: Shop },
      { path: 'new-arrivals', Component: NewArrivals },
      { path: 'category/:category', Component: CategoryPage },
      // Legacy slug seen in earlier navigation/indexed URLs — client-side
      // redirect so any inbound links or cached search results still land
      // on the one canonical Home & Living address. Hosting config (see
      // vercel.json / public/_redirects) also 301s this at the server level,
      // which is what search engines actually consolidate signals on.
      { path: 'category/home-living', Component: HomeLivingRedirect },
      { path: 'product/:id', Component: ProductDetail },
      { path: 'seller/:slug', Component: SellerProfile },
      { path: 'brands', Component: BrandDirectory },
      { path: 'the-edit', Component: TheEdit },
      { path: 'the-edit/:id', Component: TheEditArticle },
      { path: 'about', Component: About },
      { path: 'search', Component: SearchResults },
      { path: 'wishlist', Component: Wishlist },
      { path: 'cart', Component: Cart },
      { path: 'checkout', lazy: page(() => import('./pages/Checkout'), 'Checkout') },
      { path: 'support', Component: Support },

      // Buyer routes
      { path: 'buyer/login', lazy: page(() => import('./pages/buyer/BuyerLogin'), 'BuyerLogin') },
      { path: 'buyer/signup', lazy: page(() => import('./pages/buyer/BuyerSignup'), 'BuyerSignup') },
      { path: 'buyer/account', lazy: page(() => import('./pages/buyer/BuyerAccount'), 'BuyerAccount') },
      { path: 'buyer/orders', lazy: page(() => import('./pages/buyer/BuyerOrders'), 'BuyerOrders') },
      { path: 'buyer/addresses', lazy: page(() => import('./pages/buyer/BuyerAddresses'), 'BuyerAddresses') },
      { path: 'buyer/payment', lazy: page(() => import('./pages/buyer/BuyerPayment'), 'BuyerPayment') },
      { path: 'buyer/settings', lazy: page(() => import('./pages/buyer/BuyerSettings'), 'BuyerSettings') },
    ]
  },
  {
    path: '/seller',
    children: [
      { path: 'login', lazy: page(() => import('./pages/seller/SellerLogin'), 'SellerLogin') },
      {
        path: '',
        lazy: page(() => import('./layout/SellerLayout'), 'SellerLayout'),
        children: [
          { path: 'dashboard', lazy: page(() => import('./pages/seller/SellerDashboard'), 'SellerDashboard') },
          { path: 'add-product', lazy: page(() => import('./pages/seller/AddProduct'), 'AddProduct') },
          { path: 'products', lazy: page(() => import('./pages/seller/ProductList'), 'ProductList') },
          { path: 'products/:id/edit', lazy: page(() => import('./pages/seller/EditProduct'), 'EditProduct') },
          { path: 'orders', lazy: page(() => import('./pages/seller/SellerOrders'), 'SellerOrders') },
          { path: 'inventory', lazy: page(() => import('./pages/seller/Inventory'), 'Inventory') },
          { path: 'payouts', lazy: page(() => import('./pages/seller/Payouts'), 'Payouts') },
          { path: 'settings', lazy: page(() => import('./pages/seller/SellerSettings'), 'SellerSettings') },
          { path: 'support', lazy: page(() => import('./pages/seller/SellerSupport'), 'SellerSupport') },
        ]
      }
    ]
  },
  { path: '*', Component: NotFound }
];