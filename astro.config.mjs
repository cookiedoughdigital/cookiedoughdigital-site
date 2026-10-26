// @ts-check
import { defineConfig } from 'astro/config';

// One codebase, two targets (CD-261025-27). Defaults = staging (project Pages, noindex).
// Production build sets: SITE=https://www.cookiedoughdigital.com BASE=/ INDEXABLE=true
const SITE = process.env.SITE || 'https://cookiedoughdigital.github.io';
const BASE = process.env.BASE || '/cookiedoughdigital-site';
const PROD = process.env.INDEXABLE === 'true';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
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
