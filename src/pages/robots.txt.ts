import type { APIRoute } from 'astro';
// CD-261026: production allows crawl + sitemap; staging disallows everything.
export const GET: APIRoute = ({ site }) => {
  const prod = import.meta.env.INDEXABLE === 'true';
  const body = prod
    ? `User-agent: *\nAllow: /\nDisallow: /work/\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
