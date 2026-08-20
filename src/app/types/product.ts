/**
 * Canonical product & brand data model for Studio Marche.
 *
 * This is the shape every product on the site is normalised into,
 * regardless of where it came from — hand-entered mock data today,
 * or a partner brand's Shopify store once the integration in
 * `src/app/lib/shopify` is connected.
 *
 * Keeping one shape means ProductCard, CategoryPage, Shop, etc. never
 * need to know or care whether a product came from Shopify or not.
 */

export type ProductAvailability = 'in_stock' | 'low_stock' | 'out_of_stock' | 'unknown';

export interface ProductImage {
  url: string;
  altText?: string;
}

export interface Product {
  /** Internal Studio Marche product id (stable across re-syncs). */
  id: string;

  /** Product title as shown to buyers. */
  name: string;

  /** Full description. May contain simple HTML if sourced from Shopify. */
  description: string;

  /** Selling price, in the currency below — always a number, never formatted. */
  price: number;

  /** Original / "compare at" price, if the item is reduced. */
  originalPrice?: number;

  /** ISO 4217 currency code. Studio Marche displays GBP by default. */
  currency: string;

  /** One or more images; the first is used as the primary product image. */
  images: ProductImage[];

  /** Convenience accessor mirroring images[0]?.url, used by existing UI. */
  image: string;

  /** Display name of the brand / vendor selling this product. */
  seller: string;

  /** URL-safe slug for the seller's profile page on Studio Marche. */
  sellerSlug: string;

  /** Studio Marche category slug, e.g. "home", "beauty", "objects". */
  category: string;

  /** Free-form tags, used for search and filtering. */
  tags: string[];

  /** Stock count if known. Use availability for a coarser signal. */
  stock?: number;

  availability: ProductAvailability;

  /** Internal SKU. */
  sku?: string;

  isNew?: boolean;
  isFeatured?: boolean;

  createdAt?: string;
  updatedAt?: string;

  /**
   * Provenance of this product record. "manual" products are entered
   * directly through the seller dashboard; "shopify" products are
   * synced automatically from a partner's Shopify store.
   */
  source: 'manual' | 'shopify';

  /** If source is "shopify", the originating product's Shopify ID. */
  shopifyProductId?: string;

  /** If source is "shopify", a link back to the product on the brand's own store. */
  externalUrl?: string;
}

/**
 * Configuration for a single partner brand's Shopify store.
 * One entry per brand that wants their catalogue pulled into Studio Marche.
 */
export interface ShopifyBrandSource {
  /** Must match an existing seller slug in the marketplace. */
  brandSlug: string;

  /** Display name, used in fallback / error messaging. */
  brandName: string;

  /** e.g. "brand-name.myshopify.com" — no protocol, no trailing slash. */
  shopifyDomain: string;

  /**
   * Name of the environment variable holding this brand's Storefront API
   * access token. We store the *variable name*, not the token itself —
   * the token is only ever read server-side via getShopifyEnv(). This
   * keeps secrets out of any object that might end up logged or shipped
   * to the client.
   */
  accessTokenEnvVar: string;

  /** Whether this source is actively synced. Lets a brand be paused without deletion. */
  enabled: boolean;
}

/** Result of attempting to fetch a brand's product feed. */
export interface ShopifyFetchResult {
  brandSlug: string;
  status: 'ok' | 'empty' | 'error';
  products: Product[];
  /** Present when status is "error" — safe to log, never shown verbatim to buyers. */
  error?: string;
  fetchedAt: string;
}
