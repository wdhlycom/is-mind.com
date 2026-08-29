// Generates dist/sitemap.xml from the built pages.
// Zero-dependency on purpose: npm install keeps getting killed by the
// safe-delete interceptor, so @astrojs/sitemap is not installable here.
// Runs after `astro build` via the package.json build script.
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const SITE = 'https://is-mind.com/';
const DIST = join(process.cwd(), 'dist');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (name === 'index.html') out.push(p);
  }
  return out;
}

const pages = walk(DIST)
  .map((p) => {
    const rel = relative(DIST, p).replace(/\\/g, '/');
    const url = SITE + rel.replace(/index\.html$/, '');
    const lastmod = statSync(p).mtime.toISOString().slice(0, 10);
    return { url, lastmod };
  })
  .sort((a, b) => a.url.localeCompare(b.url));

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages
    .map(
      (pg) =>
        `  <url><loc>${pg.url}</loc><lastmod>${pg.lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
    )
    .join('\n') +
  '\n</urlset>\n';

writeFileSync(join(DIST, 'sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml: ${pages.length} URLs written`);
