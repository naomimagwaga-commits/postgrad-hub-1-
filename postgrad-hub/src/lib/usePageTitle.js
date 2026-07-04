import { useEffect } from 'react';

/**
 * Updates the browser tab title when a page mounts.
 * Restores the original title on unmount so navigation keeps titles fresh.
 *
 * NOTE: For social share previews (WhatsApp/Twitter), this does NOT help
 * because those crawlers only read the STATIC index.html. This is purely
 * for the browser tab and bookmarks.
 *
 * Usage in a page component:
 *   usePageTitle('Pricing');   →  "Pricing — The Postgraduate Data Hub, Kenya"
 */
const SITE_NAME = 'The Postgraduate Data Hub, Kenya';
const DEFAULT_TITLE = 'The Postgraduate Data Hub, Kenya — SPSS Academy, Statistical Test Selector & Analysis Services';

export function usePageTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} — ${SITE_NAME}` : DEFAULT_TITLE;
    return () => { document.title = DEFAULT_TITLE; };
  }, [pageTitle]);
}
