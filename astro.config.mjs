import { defineConfig } from 'astro/config';
import 'dotenv/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// Determine base path based on the command being run
const defaultBase = process.env.npm_lifecycle_event === 'build'
  ? '/catalogo100ecomm'
  : '/';
const base = process.env.BASE_PATH || defaultBase;
const siteUrl = process.env.SITE_URL || 'https://aldoruizluna.github.io';

// https://astro.build/config
export default defineConfig({
  adapter: node(),
  integrations: [tailwind()],
  output: 'server',  
  site: siteUrl,
  base: base,
  build: {
    // If you have assets that need special handling
    assets: '_assets'
  },
  server: {
    port: 3000 // Changed to port 3000 as requested
  }
});
