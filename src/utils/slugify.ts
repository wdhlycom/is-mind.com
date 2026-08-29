/**
 * slugify.ts
 *
 * Reproduces Hugo's default URL sanitization so Astro generates the SAME
 * slugs the Hugo site used — no redirects needed, even though the site has
 * no ranking yet (kept for parity + correctness).
 *
 * Hugo rules (net/url.PathEscaper / MakePath) in practice:
 *   - lowercase everything
 *   - spaces and underscores become hyphens
 *   - only a-z 0-9 and hyphen survive; other chars dropped
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics
    .replace(/[\s_]+/g, '-') // spaces & underscores -> hyphen
    .replace(/[^a-z0-9-]+/g, '') // drop anything else
    .replace(/-+/g, '-') // collapse repeats
    .replace(/^-|-$/g, ''); // trim edges
}
