import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Determine base path based on the command being run
const base = process.env.npm_lifecycle_event === 'build'
  ? '/catalogo100ecomm' // Use repo name for GitHub Pages build
  : '/'; // Use root for local development

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'static',  // Changed from 'server' to 'static' for GitHub Pages
  site: 'https://aldoruizluna.github.io', // Replace with your GitHub username
  base: base, // Use the conditional base path
  build: {
    // If you have assets that need special handling
    assets: '_assets'
  },
  server: {
    port: 3000 // Changed to port 3000 as requested
  }
});
