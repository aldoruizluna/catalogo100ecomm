import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'static',  // Changed from 'server' to 'static' for GitHub Pages
  site: 'https://aldoruizluna.github.io', // Replace with your GitHub username
  base: '/catalogo100ecomm', // Repository name
  build: {
    // If you have assets that need special handling
    assets: '_assets'
  },
  server: {
    port: 4321 // Use default Astro port
  }
});
