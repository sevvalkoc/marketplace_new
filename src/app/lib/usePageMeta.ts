import { useEffect } from 'react';

/**
 * Sets the document title and meta description for the current page.
 *
 * This SPA doesn't use react-helmet or similar — for a project this size,
 * a small dependency-free hook covers what's needed: a unique <title> and
 * meta description per route, which matters for search results and for
 * anyone sharing a link. If Studio Marche later needs richer per-page
 * metadata (Open Graph images per product, JSON-LD, etc.) it's worth
 * reaching for react-helmet-async at that point instead of growing this
 * file into one.
 *
 * Usage, at the top of a page component:
 *   usePageMeta({
 *     title: 'Home — Studio Marche',
 *     description: 'Considered home objects from independent makers.',
 *   });
 */
interface PageMetaOptions {
  title: string;
  description?: string;
}

const DEFAULT_DESCRIPTION =
  'Studio Marche is a curated marketplace for independent brands and small businesses.';

export const usePageMeta = ({ title, description }: PageMetaOptions) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute('content') ?? undefined;

    if (metaDescription) {
      metaDescription.setAttribute('content', description ?? DEFAULT_DESCRIPTION);
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription && previousDescription !== undefined) {
        metaDescription.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
};
