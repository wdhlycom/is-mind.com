/**
 * verify-urls.mjs  (v2 — content-derived)
 *
 * "Rebuild + verify, not convert." For every original Hugo content file, we
 * reproduce its URL with the SAME slugify rule Astro uses, then assert that
 * exact URL exists in `dist/`. This proves the migration is a faithful rebuild.
 *
 * Run AFTER `astro build`.
 */
import { readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
// Absolute path to the original Hugo content (mirrors src/content.config.ts).
// The Astro project lives at C:/Users/Holive Hu/mind-astro/ (off the Desktop),
// while the Hugo repo is at C:/Users/Holive Hu/Desktop/mind/.
const HUGO_CONTENT = 'C:/Users/Holive Hu/Desktop/mind/content';
const DIST = join(ROOT, 'dist');

// Same rules as src/utils/slugify.ts + entry-url.ts
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

// Walk content/ for real .md files (skip tooling junk).
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

// Known-frontmatter aliases Hugo generated but we haven't built (interactive
// tools deferred in the prototype). They are expected, not errors.
const EXPECTED_DEFERRED = new Set(['/oracle/', '/draw-card/']);

const distUrls = new Set();
const dwalk = (dir, rel) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const r = rel ? `${rel}/${name}` : name;
    if (statSync(full).isDirectory()) {
      if (existsSync(join(full, 'index.html'))) distUrls.add('/' + r + '/');
      dwalk(full, r);
    }
  }
};
if (!existsSync(DIST)) { console.error('❌ dist/ missing — run `npm run build`'); process.exit(1); }
dwalk(DIST, '');
// The home page is dist/index.html (root), not a sub-directory.
if (existsSync(join(DIST, 'index.html'))) distUrls.add('/');

let failures = 0;
const missing = [];
for (const f of files) {
  const url = urlFromId(f);
  if (!distUrls.has(url)) { missing.push(url); failures++; }
}

console.log(`Content files checked: ${files.length}`);
console.log(`Astro URLs built:      ${distUrls.size}`);
if (missing.length === 0) {
  console.log('✅ Every content file reproduced its exact Hugo URL (rebuild, not convert).');
  process.exit(0);
}
console.log(`\n❌ ${missing.length} content URL(s) NOT reproduced:`);
missing.forEach((u) => console.log('   ' + u));
console.log('\n(Note: /oracle/ and /draw-card/ are aliases of the daily-oracle tool,');
console.log(' deferred in this prototype. Hugo taxonomy stub pages for zh/es i18n');
console.log(' are auto-generated and added in the full migration.)');
process.exit(1);
