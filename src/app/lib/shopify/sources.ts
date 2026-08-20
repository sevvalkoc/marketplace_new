import type { ShopifyBrandSource } from '../../types/product';

/**
 * Registry of partner brands whose products should be pulled in from
 * Shopify automatically. Add a new brand by adding one entry here —
 * nothing else in the app needs to change.
 *
 * `accessTokenEnvVar` is the *name* of an environment variable, not the
 * token itself. Tokens are never stored in source control. See
 * `.env.example` in the project root for the variables this expects.
 *
 * To onboard a new brand:
 *   1. Ask the brand for their Storefront API access token
 *      (Shopify Admin → Apps → Develop apps → create a custom app with
 *      Storefront API scope `unauthenticated_read_product_listings`).
 *   2. Add SHOPIFY_<BRAND>_ACCESS_TOKEN=... to your environment.
 *   3. Add an entry below pointing at that variable name.
 *   4. Make sure brandSlug matches an existing seller in mockSellers
 *      (or your real seller database, once that exists).
 */
export const shopifyBrandSources: ShopifyBrandSource[] = [
  // Example — uncomment and fill in once a real brand is ready to connect:
  // {
  //   brandSlug: 'studio-clay',
  //   brandName: 'Studio Clay',
  //   shopifyDomain: 'studio-clay.myshopify.com',
  //   accessTokenEnvVar: 'SHOPIFY_STUDIO_CLAY_ACCESS_TOKEN',
  //   enabled: true,
  // },
];

/** Look up a brand's Shopify source config by seller slug, if one exists. */
export const getShopifySourceForBrand = (brandSlug: string): ShopifyBrandSource | undefined =>
  shopifyBrandSources.find((s) => s.brandSlug === brandSlug && s.enabled);

/** All brands currently configured to sync from Shopify. */
export const getEnabledShopifySources = (): ShopifyBrandSource[] =>
  shopifyBrandSources.filter((s) => s.enabled);
