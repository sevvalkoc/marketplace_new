import { useEffect, useState } from 'react';
import type { Product } from '../../types/product';
import { getShopifySourceForBrand } from './sources';
import { fetchShopifyProductsForBrand } from './client';

interface UseShopifyProductsResult {
  products: Product[];
  loading: boolean;
  /** True once a fetch has been attempted, regardless of outcome. */
  attempted: boolean;
  /** Set when the brand isn't configured for Shopify at all (not an error — just manual). */
  isShopifyConnected: boolean;
  error?: string;
}

/**
 * Loads a brand's live product feed from Shopify, if that brand has been
 * configured in `lib/shopify/sources.ts`. If the brand isn't connected to
 * Shopify, this resolves immediately with an empty, non-error result so
 * pages can fall back to manually-entered products without extra branching.
 *
 * Usage:
 *   const { products, loading, error, isShopifyConnected } = useShopifyProducts('studio-clay', 'home');
 */
export const useShopifyProducts = (brandSlug: string, categorySlug: string): UseShopifyProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const source = getShopifySourceForBrand(brandSlug);

  useEffect(() => {
    if (!source) {
      setAttempted(true);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetchShopifyProductsForBrand(source, categorySlug).then((result) => {
      if (cancelled) return;
      setLoading(false);
      setAttempted(true);
      if (result.status === 'error') {
        setError(result.error);
        setProducts([]);
      } else {
        setError(undefined);
        setProducts(result.products);
      }
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandSlug, categorySlug]);

  return {
    products,
    loading,
    attempted,
    isShopifyConnected: Boolean(source),
    error,
  };
};
