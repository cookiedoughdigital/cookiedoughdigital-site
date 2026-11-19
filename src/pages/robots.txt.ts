import type { APIRoute } from 'astro';
// CD-261026: production allows crawl + sitemap; staging disallows everything.
// CD-261119-1 (Webster G1): no Disallow for draft routes. Drafts are handled by noindex + sitemap exclusion (src/draft.mjs);
// a Disallow would stop crawlers from seeing the noindex.
export const GET: APIRoute = ({ site }) => {
  const prod = import.meta.env.INDEXABLE === 'true';
  const body = prod
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
