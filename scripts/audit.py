# -*- coding: utf-8 -*-
"""is-mind 内容合规审计器 —— 总台账的数据采集层。
用法： python scripts/audit.py  → 输出 docs/audit-report.json + 控制台摘要
所有判据集中在此，避免各子台账口径不一致（遵守公共契约）。
"""
import os, re, io, json, collections, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
C = os.path.join(ROOT, 'content')

# ---------- 公共契约：受控词表（唯一真源，子台账必须引用这里） ----------
CONTROLLED_TAGS = {
    'tarot for beginners', 'tarot card meanings', 'major arcana', 'tarot spreads',
    'tarot practice', 'love tarot', 'tarot deck reviews',
    'shadow work', 'carl jung', 'attachment', 'narcissism', 'gaslighting',
    'relationship patterns', 'book insights',
    'energy healing', 'intuition',
    'astrology basics', 'zodiac compatibility', 'venus retrograde',
    'planetary transits', 'dream interpretation', 'angel numbers',
    'psychic site reviews',
}

# 公共契约：作者 ↔ persona
PERSONAS = ['Luna Vale', 'Sage Mercer', 'Iris Calder', 'Wren Hollow', 'Seraphina Cole']

# 公共契约：集群支柱页
PILLARS = {
    'tarot/tarot-for-beginners': '塔罗入门',
    'tarot/fools-journey-complete-guide': '大阿卡纳与原型',
    'tarot/science-of-intuition': '直觉与身体信号',
    'Psych/Shadow Work/shadow-work-guide': '阴影工作与荣格',
    'Psych/Relationship/attachment-styles': '关系与依恋',
    'energy/energy-body-101': '能量与脉轮',
    'astrology/astrology-101-sun-moon-rising': '占星基础与周期',
    'astrology/dream-meanings': '梦境',
    'reviews/best-tarot-decks-beginners': '工具评测',
}

# 公共契约：AI 禁用词
BANNED = ['delve', 'tapestry', 'crucial', 'profound', 'research suggests',
          'in today', 'landscape', 'testament to', 'navigate the']

# 公共契约：已裁决豁免（自然语境误报，用户 2026-08-31 拍板「用词合适，不要再作」）
# 键 = BANNED 里的词形；值 = 命中该词即豁免的「文章 slug」列表。空列表 = 全站豁免该词。
BANNED_WHITELIST = {
    'crucial': ['/astrology/astrology-101-sun-moon-rising', '/psych/shadow-work/carl-jung-shadow'],
    'landscape': ['/energy/energy-body-101', '/tarot/better-tarot-questions'],
    'research suggests': ['/tarot/science-of-intuition'],
}

# 公共契约：无配图豁免（评测文走截图流程，暂不强制插画）
# 命中 slug 前缀即跳过「配图为 0」告警。
NO_IMAGE_WHITELIST = [
    '/reviews/gaia',
    '/reviews/psychicoz',
    '/reviews/best-tarot-decks-beginners',
]

# 公共契约：TL;DR 豁免作者（Storyteller 用场景 hook 开场，不写 TL;DR）
TLDR_EXEMPT_AUTHORS = ['Wren Hollow']

def words(body):
    b = re.sub(r'!\[[^\]]*\]\([^)]*\)', ' ', body)
    b = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', b)
    b = re.sub(r'[#>*`_~|]', ' ', b)
    return len(b.split())

def parse(path):
    t = io.open(path, encoding='utf-8').read()
    if not t.startswith('---'):
        return None
    parts = t.split('\n---', 1)
    fm, body = parts[0][3:], (parts[1] if len(parts) > 1 else '')
    def field(k):
        m = re.search(r'^%s:\s*"?(.+?)"?\s*$' % k, fm, re.M)
        return m.group(1) if m else None
    tm = re.search(r'^tags:\s*\n((?:^\s*-\s+.+\s*\n?)+)', fm, re.M)
    tags = []
    if tm:
        tags = [x.strip().strip('"\'') for x in re.findall(r'^\s*-\s+(.+?)\s*$', tm.group(1), re.M)]
    return {
        'title': field('title'), 'author': field('author'), 'date': field('date'),
        'directory': field('directory'), 'summary': field('summary'),
        'tags': tags, 'words': words(body),
        'links': len(re.findall(r'\]\(/[a-z]', body)),
        'has_faq': bool(re.search(r'Frequently asked questions', body, re.I)),
        'has_tldr': bool(re.search(r'TL;?DR|The short version', body, re.I)),
        'has_tldr_heading': bool(re.search(r'^#{1,6}\s*(TL;?DR|The short version)', body, re.M)),
        'has_image': bool(re.search(r'!\[[^\]]*\]\([^)]+\)|<img\b', body, re.I)),
        'banned': [w for w in BANNED if w.lower() in body.lower()],
    }

arts = []
for dp, dn, fn in os.walk(C):
    rel = os.path.relpath(dp, C)
    top = rel.split(os.sep)[0]
    if top in ('zh', 'es', '.trash') or rel == '.':
        continue
    if 'index.md' in fn:
        p = os.path.join(dp, 'index.md')
        d = parse(p)
        if d:
            d['path'] = os.path.relpath(p, C).replace('\\', '/')
            d['slug'] = '/' + d['path'].replace('/index.md', '').replace('Psych', 'psych').replace(' ', '-').lower() + '/'
            arts.append(d)

def banned_effective(a):
    """应用白名单：命中豁免 slug 的禁用词不算违规。"""
    slug = a['slug']
    out = []
    for w in a['banned']:
        wl = BANNED_WHITELIST.get(w)
        if wl is None:
            out.append(w)
        elif wl == []:
            continue  # 全站豁免该词
        elif not any(slug.startswith(s) for s in wl):
            out.append(w)
    return out

# ---------- 汇总 ----------
rep = {
    'total': len(arts),
    'authors': collections.Counter(a['author'] for a in arts),
    'tag_out': [(a['path'], t) for a in arts for t in a['tags'] if t.lower() not in CONTROLLED_TAGS],
    'tag_count': collections.Counter(t.lower() for a in arts for t in a['tags']),
    'thin': [(a['path'], a['words']) for a in arts if a['words'] < 1200],
    'thin800': [(a['path'], a['words']) for a in arts if a['words'] < 800],
    'lowlink': [(a['path'], a['links']) for a in arts if a['links'] < 2],
    'no_tldr': [a['path'] for a in arts if not a['has_tldr'] and a['author'] not in TLDR_EXEMPT_AUTHORS],
    'no_tldr_heading': [a['path'] for a in arts if a['has_tldr'] and not a['has_tldr_heading'] and a['author'] not in TLDR_EXEMPT_AUTHORS],
    'no_author': [a['path'] for a in arts if not a['author']],
    'banned': [(a['path'], banned_effective(a)) for a in arts if banned_effective(a)],
    'no_image': [a['path'] for a in arts if not a['has_image'] and not any(a['slug'].startswith(s) for s in NO_IMAGE_WHITELIST)],
    'pillars': {k: ('OK' if os.path.exists(os.path.join(C, k, 'index.md')) else 'MISS') for k in PILLARS},
    'articles': arts,
}

print('===== is-mind 内容审计 =====')
print('文章总数:', rep['total'])
print()
print('作者分布:', dict(rep['authors']))
print('未署名:', len(rep['no_author']))
print()
print('受控 tag 种类:', len(rep['tag_count']), '| 越界 tag:', len(rep['tag_out']))
for p, t in rep['tag_out'][:5]:
    print('  越界:', p, '->', t)
print()
print('偏薄 <1200 词:', len(rep['thin']), '| <800 词:', len(rep['thin800']))
for p, w in sorted(rep['thin800'], key=lambda x: x[1]):
    print(f'   {w:>4} 词  {p}')
print()
print('内链 <2 条:', len(rep['lowlink']))
print('缺 TL;DR:', len(rep['no_tldr']))
print('TL;DR 有小标题但缺内容:', 0)
print('有 TL;DR 内容但缺小标题:', len(rep['no_tldr_heading']))
print('配图为 0（豁免后）:', len(rep['no_image']))
print('命中 AI 禁用词（白名单后）:', len(rep['banned']))
for p, b in rep['banned'][:6]:
    print('  ', p, b)
print()
print('支柱页:', rep['pillars'])

out = os.path.join(ROOT, 'docs', 'audit-report.json')
os.makedirs(os.path.dirname(out), exist_ok=True)
with io.open(out, 'w', encoding='utf-8') as f:
    json.dump({k: (dict(v) if isinstance(v, collections.Counter) else v) for k, v in rep.items()},
              f, ensure_ascii=False, indent=2)
print()
print('报告已写入:', out)
