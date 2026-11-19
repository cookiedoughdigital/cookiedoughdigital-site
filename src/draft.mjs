// CD-261117-5 DRAFT FLAG: single source of truth for draft (pre-go-live) routes.
// A route listed here is noindex (Layout.astro), left out of the production sitemap (astro.config.mjs)
// and shows its draft banner (pricing.astro). GO-LIVE: delete the route from this list (or empty it) in one commit.
// CD-261118-1 go-live: /pricing/ removed from the draft list.
export const DRAFT_ROUTES = [];

/** pathname may include the site base (e.g. /cookiedoughdigital-site/pricing/); base defaults to '/'. */
export function isDraftRoute(pathname, base = '/') {
  const b = base.replace(/\/$/, '');
  let p = b && pathname.startsWith(b) ? pathname.slice(b.length) : pathname;
  p = '/' + p.replace(/^\/+|\/+$/g, '');
  return DRAFT_ROUTES.some((r) => '/' + r.replace(/^\/+|\/+$/g, '') === p);
}
