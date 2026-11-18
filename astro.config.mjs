// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { isDraftRoute } from './src/draft.mjs';

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
  // Old Google Sites redirect stubs live at the site ROOT only (/home, /chat-bots, /websites, /ai-training, /digital-projects),
  // so match the URL path exactly; /services/ai-training/ and /services/digital-projects/ are real pages and stay in (CD-261117-3).
  integrations: PROD ? [sitemap({ filter: (page) => { const path = new URL(page).pathname.replace(/\/$/, '');
    // Draft routes (src/draft.mjs) are noindex, so they stay out of the sitemap until removed from that list (CD-261117-5).
    return path !== '/work' && !/^\/(home|chat-bots|websites|ai-training|digital-projects)$/.test(path) && !isDraftRoute(new URL(page).pathname, BASE); } })] : [],
  // GitHub Pages fallback for old Google Sites paths (meta-refresh, not true 301s). Prod only.
  redirects: PROD ? {
    '/home': '/',
    '/chat-bots': '/services/chatbots/',
    '/websites': '/services/',
    '/ai-training': '/services/',
    '/digital-projects': '/work/',
  } : {},
  vite: { define: { 'import.meta.env.INDEXABLE': JSON.stringify(PROD ? 'true' : 'false') } },
});
