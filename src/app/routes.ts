import { createBrowserRouter, Navigate } from 'react-router';
import { Layout } from './layout/Layout';
import { SellerLayout } from './layout/SellerLayout';

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
import { Checkout } from './pages/Checkout';
import { Support } from './pages/Support';
import { NotFound } from './pages/NotFound';

// Buyer pages
import { BuyerLogin } from './pages/buyer/BuyerLogin';
import { BuyerSignup } from './pages/buyer/BuyerSignup';
import { BuyerAccount } from './pages/buyer/BuyerAccount';
import { BuyerOrders } from './pages/buyer/BuyerOrders';
import { BuyerAddresses } from './pages/buyer/BuyerAddresses';
import { BuyerPayment } from './pages/buyer/BuyerPayment';
import { BuyerSettings } from './pages/buyer/BuyerSettings';

// Seller pages
import { SellerLogin } from './pages/seller/SellerLogin';
import { SellerDashboard } from './pages/seller/SellerDashboard';
import { AddProduct } from './pages/seller/AddProduct';
import { ProductList } from './pages/seller/ProductList';
import { EditProduct } from './pages/seller/EditProduct';
import { SellerOrders } from './pages/seller/SellerOrders';
import { Inventory } from './pages/seller/Inventory';
import { Payouts } from './pages/seller/Payouts';
import { SellerSettings } from './pages/seller/SellerSettings';
import { SellerSupport } from './pages/seller/SellerSupport';

const HomeLivingRedirect = () => Navigate({ to: '/category/home', replace: true });

export const router = createBrowserRouter([
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
      // vercel.json / netlify.toml) also 301s this at the server level,
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
      { path: 'checkout', Component: Checkout },
      { path: 'support', Component: Support },

      // Buyer routes
      { path: 'buyer/login', Component: BuyerLogin },
      { path: 'buyer/signup', Component: BuyerSignup },
      { path: 'buyer/account', Component: BuyerAccount },
      { path: 'buyer/orders', Component: BuyerOrders },
      { path: 'buyer/addresses', Component: BuyerAddresses },
      { path: 'buyer/payment', Component: BuyerPayment },
      { path: 'buyer/settings', Component: BuyerSettings },
    ]
  },
  {
    path: '/seller',
    children: [
      { path: 'login', Component: SellerLogin },
      {
        path: '',
        Component: SellerLayout,
        children: [
          { path: 'dashboard', Component: SellerDashboard },
          { path: 'add-product', Component: AddProduct },
          { path: 'products', Component: ProductList },
          { path: 'products/:id/edit', Component: EditProduct },
          { path: 'orders', Component: SellerOrders },
          { path: 'inventory', Component: Inventory },
          { path: 'payouts', Component: Payouts },
          { path: 'settings', Component: SellerSettings },
          { path: 'support', Component: SellerSupport },
        ]
      }
    ]
  },
  { path: '*', Component: NotFound }
]);