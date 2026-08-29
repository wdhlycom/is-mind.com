/**
 * url-mapping.mjs — emit a Hugo-path → Astro-URL mapping table.
 *
 * Uses the EXACT same slugify + url rule as the Astro build
 * (src/utils/slugify.ts + src/utils/entry-url.ts) so the table is a faithful
 * preview of what "rebuild, not convert" produces. Writes URL-MAPPING.md.
 */
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const HUGO_CONTENT = 'C:/Users/Holive Hu/Desktop/mind/content';

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
function urlFromId(id) {
  let p = id.replace(/_index\.md$/i, '').replace(/index\.md$/i, '').replace(/\.md$/i, '');
  const segs = p.split('/').filter(Boolean);
  const out = [];
  for (const s of segs) {
    if (s === '_index' || s === 'content') continue;
    out.push(slugify(s));
  }
  return out.length ? '/' + out.join('/') + '/' : '/';
}
function kindFromPath(rel) {
  if (rel === '_index.md') return 'home';
  if (rel.endsWith('/_index.md')) return 'section';
  if (rel.endsWith('/index.md')) return 'article';
  return 'basic';
}

const files = [];
const walk = (dir, rel) => {
  for (const name of readdirSync(dir)) {
    if (name === '.trash' || name === '.obsidian' || name === 'content') continue;
    const full = join(dir, name);
    const r = rel ? `${rel}/${name}` : name;
    if (statSync(full).isDirectory()) walk(full, r);
    else if (name.endsWith('.md')) files.push(r);
  }
};
walk(HUGO_CONTENT, '');

const rows = files
  .map((f) => ({ path: f, kind: kindFromPath(f), url: urlFromId(f) }))
  .sort((a, b) => a.url.localeCompare(b.url));

const counts = rows.reduce((m, r) => ((m[r.kind] = (m[r.kind] || 0) + 1), m), {});

let md = `# URL Mapping — Hugo → Astro (rebuild, not convert)\n\n`;
md += `Generated from \`${HUGO_CONTENT}\`. Every original Markdown file is read verbatim and\n`;
md += `reproduces its Hugo URL 1:1 via the same slugify rule used by the Astro build.\n\n`;
md += `**Totals:** ${rows.length} content files — ` +
  Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(', ') + `\n\n`;
md += `| # | Hugo path (under content/) | Kind | Reproduced URL |\n`;
md += `|---|---|---|---|\n`;
rows.forEach((r, i) => {
  md += `| ${i + 1} | \`${r.path}\` | ${r.kind} | \`${r.url}\` |\n`;
});

writeFileSync(join(process.cwd(), 'URL-MAPPING.md'), md);
console.log(`Wrote URL-MAPPING.md with ${rows.length} rows.`);
process.exit(0);
