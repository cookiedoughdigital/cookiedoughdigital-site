// @ts-check
import { defineConfig } from 'astro/config';

// Staging: GitHub project Pages. No custom domain until Gary approves cutover.
export default defineConfig({
  site: 'https://cookiedoughdigital.github.io',
  base: '/cookiedoughdigital-site',
  output: 'static',
});
