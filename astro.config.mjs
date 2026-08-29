// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// is-mind.com Astro rebuild
// Content is reused verbatim from the Hugo site's content/ directory.
// URL slugs are reproduced 1:1 via a custom slugify (see src/utils/slugify.ts).
export default defineConfig({
  site: 'https://is-mind.com/',
  // We keep trailing slash to match Hugo's directory-style URLs exactly.
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  i18n: {
    locales: ['en', 'zh', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [tailwind()],
  vite: {
    // Allow reading the original Hugo content dir (sibling of this repo).
  },
});
