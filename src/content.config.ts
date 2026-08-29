import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { slugify } from './utils/slugify';

// Content lives INSIDE this repo at `<project>/content`. It used to be read
// from the sibling Hugo project via an absolute Desktop path, which broke any
// deployment (Vercel has no `C:/Users/...`). Keeping it in-repo makes the
// project self-contained: one folder to edit, one folder to push.
const HUGO_CONTENT = pathToFileURL(
  fileURLToPath(new URL('../content', import.meta.url))
).href;

// The glob loader hands us the RELATIVE file path as `entry`, e.g.
// "psych/relationship/attachment-styles/index.md". We strip only `.md` and keep
// the `/index` (article) and `/_index` (section) markers so urlFromId /
// kindFromId can tell articles apart from section pages and reproduce Hugo's
// exact URL slugs. (The default glob id strips `/index`, collapsing
// `foo/index.md` and `foo.md` to the same id — which is exactly what we must
// avoid for a faithful rebuild.)
const hugoGlob = glob({
  base: HUGO_CONTENT,
  pattern: '**/*.md',
  generateId: ({ entry }: { entry: string }) =>
    entry.replace(/\\/g, '/').replace(/\.md$/i, ''),
});

// Drop scratch/tooling dirs that must never become pages: Obsidian config, the
// trash folder, and the stray nested content/content directory.
const filteredHugo = {
  name: 'filtered-hugo',
  async load(ctx: Parameters<typeof hugoGlob.load>[0]) {
    await hugoGlob.load(ctx);
    for (const key of [...ctx.store.keys()]) {
      if (
        key.startsWith('.') ||
        key.includes('.trash/') ||
        key.includes('.obsidian/') ||
        key.startsWith('content/')
      ) {
        ctx.store.delete(key);
      }
    }
  },
};

// Loose schema: capture the fields we render, pass the rest through.
const page = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    summary: z.string().optional(),
    author: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
    tags: z.array(z.string()).optional(),
    directory: z.string().optional(),
    layout: z.string().optional(),
    type: z.string().optional(),
    aliases: z.array(z.string()).optional(),
    sitemap: z.any().optional(),
    draft: z.boolean().optional(),
  })
  .passthrough();

export const collections = {
  pages: defineCollection({ loader: filteredHugo, schema: page }),
};

export { slugify };
