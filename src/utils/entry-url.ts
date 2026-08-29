import { slugify } from './slugify';

export type Kind = 'home' | 'section' | 'article' | 'basic';

/**
 * Reproduce the Hugo URL for a content entry, given its glob-loader id.
 * The loader preserves `/index` (article) and `/_index` (section/list) markers.
 *
 *   "psych/Relationship/attachment-styles/index" -> "/psych/relationship/attachment-styles/"
 *   "tarot/_index"                                -> "/tarot/"
 *   "disclosure"                                 -> "/disclosure/"
 *   "about/editorial-policy"                     -> "/about/editorial-policy/"
 *   "_index"                                     -> "/"
 */
export function urlFromId(id: string): string {
  const p = id.replace(/\/_?index$/i, '').replace(/\.md$/i, '');
  const out = p.split('/').filter(Boolean).map(slugify);
  return out.length ? '/' + out.join('/') + '/' : '/';
}

export function kindFromId(id: string): Kind {
  if (id === '_index') return 'home';
  if (id.endsWith('/_index')) return 'section';
  if (id.toLowerCase().endsWith('/index')) return 'article';
  return 'basic';
}

/** First real segment after content root — the Hugo "section". */
export function sectionFromId(id: string): string | null {
  const segs = id.split('/').filter(Boolean);
  for (const s of segs) {
    if (s === '_index' || s === 'index' || s === 'content') continue;
    return slugify(s);
  }
  return null;
}
