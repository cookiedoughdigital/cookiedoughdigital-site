// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// One codebase, two targets (CD-261025-27). Defaults = staging (project Pages, noindex).
// Production build sets: SITE=https://www.cookiedoughdigital.com BASE=/ INDEXABLE=true
const SITE = process.env.SITE || 'https://cookiedoughdigital.github.io';
const BASE = process.env.BASE || '/cookiedoughdigital-site';
const PROD = process.env.INDEXABLE === 'true';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  // Sitemap only on the indexable production build; /work/ is a hidden stub (CD-261026).
  integrations: PROD ? [sitemap({ filter: (page) => !/\/work\/?$/.test(page) && !/\/(home|chat-bots|websites|ai-training|digital-projects)\/?$/.test(page) })] : [],
  // GitHub Pages fallback for old Google Sites paths (meta-refresh, not true 301s). Prod only.
  redirects: PROD ? {
    '/home': '/',
    '/chat-bots': '/services/',
    '/websites': '/services/',
    '/ai-training': '/services/',
    '/digital-projects': '/work/',
  } : {},
  vite: { define: { 'import.meta.env.INDEXABLE': JSON.stringify(PROD ? 'true' : 'false') } },
});
