import type { Product, ShopifyBrandSource, ShopifyFetchResult } from '../../types/product';

/**
 * Shopify Storefront API integration.
 *
 * IMPORTANT — where this should run:
 * This project is currently a client-only Vite SPA. Storefront API tokens
 * are "public" tokens by Shopify's own design (they're scoped to read-only,
 * unauthenticated access), so calling the Storefront API directly from the
 * browser is a supported pattern and is what this file does. It is NOT
 * appropriate to put an Admin API token here, ever — Admin tokens can read
 * and write orders, customers, and payouts, and must only be used from a
 * server you control. If Studio Marche grows a backend (Next.js API route,
 * a small Node service, etc.), move this fetch behind that server instead
 * and keep this file's normalisation logic, which is backend-agnostic.
 *
 * Environment variables (only set what you actually use):
 *   SHOPIFY_STORE_DOMAIN                — fallback single-store domain, optional
 *   SHOPIFY_STOREFRONT_ACCESS_TOKEN     — fallback single-store token, optional
 *   SHOPIFY_<BRAND>_ACCESS_TOKEN        — one per brand in sources.ts
 *
 * Vite only exposes env vars prefixed with VITE_ to client code by default.
 * If you keep this running client-side, prefix accordingly
 * (e.g. VITE_SHOPIFY_STUDIO_CLAY_ACCESS_TOKEN) and update sources.ts to
 * match. That naming is left to you since it depends on your deployment
 * setup — the fetch logic below is agnostic to the prefix.
 */

const STOREFRONT_API_VERSION = '2025-01';

/**
 * Reads an env var by name. Vite only exposes variables prefixed with
 * VITE_ to client-side code (everything else is stripped at build time
 * for safety), so we check for a VITE_-prefixed version first and fall
 * back to the bare name in case this file ever runs server-side instead
 * (e.g. behind a Vite SSR setup or a future Node backend).
 */
const readEnvVar = (name: string): string | undefined => {
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
  return env[`VITE_${name}`] ?? env[name];
};

const PRODUCTS_QUERY = `
  query StorefrontProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          descriptionHtml
          tags
          productType
          createdAt
          updatedAt
          onlineStoreUrl
          images(first: 5) {
            edges { node { url altText } }
          }
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          compareAtPriceRange {
            maxVariantPrice { amount currencyCode }
          }
          totalInventory
          availableForSale
        }
      }
    }
  }
`;

interface StorefrontProductNode {
  id: string;
  title: string;
  descriptionHtml: string;
  tags: string[];
  productType: string;
  createdAt: string;
  updatedAt: string;
  onlineStoreUrl: string | null;
  images: { edges: { node: { url: string; altText: string | null } }[] };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  compareAtPriceRange?: { maxVariantPrice: { amount: string; currencyCode: string } };
  totalInventory: number | null;
  availableForSale: boolean;
}

/**
 * Converts one Shopify Storefront product node into Studio Marche's
 * canonical Product shape. Kept separate from the fetch call so it can
 * be unit-tested without network access.
 */
export const normaliseShopifyProduct = (
  node: StorefrontProductNode,
  brand: ShopifyBrandSource,
  categorySlug: string
): Product => {
  const images = node.images.edges.map((e) => ({
    url: e.node.url,
    altText: e.node.altText ?? node.title,
  }));

  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAt = node.compareAtPriceRange
    ? parseFloat(node.compareAtPriceRange.maxVariantPrice.amount)
    : undefined;

  const availability: Product['availability'] = !node.availableForSale
    ? 'out_of_stock'
    : node.totalInventory !== null && node.totalInventory <= 5
      ? 'low_stock'
      : node.totalInventory !== null
        ? 'in_stock'
        : 'unknown';

  return {
    id: `shopify-${brand.brandSlug}-${node.id}`,
    name: node.title,
    description: node.descriptionHtml.replace(/<[^>]+>/g, '').trim(),
    price,
    originalPrice: compareAt && compareAt > price ? compareAt : undefined,
    currency: node.priceRange.minVariantPrice.currencyCode,
    images,
    image: images[0]?.url ?? '',
    seller: brand.brandName,
    sellerSlug: brand.brandSlug,
    category: categorySlug,
    tags: node.tags,
    stock: node.totalInventory ?? undefined,
    availability,
    isNew: Date.now() - new Date(node.createdAt).getTime() < 1000 * 60 * 60 * 24 * 30,
    createdAt: node.createdAt,
    updatedAt: node.updatedAt,
    source: 'shopify',
    shopifyProductId: node.id,
    externalUrl: node.onlineStoreUrl ?? undefined,
  };
};

/**
 * Fetches a single brand's product catalogue from their Shopify store.
 * Never throws — failures are returned as a result with status "error"
 * so calling pages can render a graceful fallback instead of crashing.
 */
export const fetchShopifyProductsForBrand = async (
  brand: ShopifyBrandSource,
  categorySlug: string,
  first = 50
): Promise<ShopifyFetchResult> => {
  const fetchedAt = new Date().toISOString();
  const token = readEnvVar(brand.accessTokenEnvVar);

  if (!token) {
    return {
      brandSlug: brand.brandSlug,
      status: 'error',
      products: [],
      error: `Missing access token (expected env var ${brand.accessTokenEnvVar}).`,
      fetchedAt,
    };
  }

  try {
    const response = await fetch(`https://${brand.shopifyDomain}/api/${STOREFRONT_API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query: PRODUCTS_QUERY, variables: { first } }),
    });

    if (!response.ok) {
      return {
        brandSlug: brand.brandSlug,
        status: 'error',
        products: [],
        error: `Shopify responded with HTTP ${response.status}.`,
        fetchedAt,
      };
    }

    const json = await response.json();

    if (json.errors?.length) {
      return {
        brandSlug: brand.brandSlug,
        status: 'error',
        products: [],
        error: json.errors[0]?.message ?? 'Unknown Shopify GraphQL error.',
        fetchedAt,
      };
    }

    const edges: { node: StorefrontProductNode }[] = json.data?.products?.edges ?? [];
    const products = edges.map((e) => normaliseShopifyProduct(e.node, brand, categorySlug));

    return {
      brandSlug: brand.brandSlug,
      status: products.length > 0 ? 'ok' : 'empty',
      products,
      fetchedAt,
    };
  } catch (err) {
    return {
      brandSlug: brand.brandSlug,
      status: 'error',
      products: [],
      error: err instanceof Error ? err.message : 'Unknown error fetching from Shopify.',
      fetchedAt,
    };
  }
};

/**
 * Fetches all enabled Shopify brand sources in parallel. Individual brand
 * failures never take down the whole call — each brand's result is
 * isolated, so one broken integration can't blank out the rest of the
 * marketplace.
 */
export const fetchAllShopifyProducts = async (
  sources: ShopifyBrandSource[],
  categoryForBrand: (brandSlug: string) => string
): Promise<ShopifyFetchResult[]> => {
  return Promise.all(
    sources.map((source) => fetchShopifyProductsForBrand(source, categoryForBrand(source.brandSlug)))
  );
};
