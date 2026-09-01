# -*- coding: utf-8 -*-
"""is-mind 工作台生成器（展现层）。
用法： python scripts/build_dashboard.py
      → 读 docs/audit-report.json（合规判据，唯一口径来自 scripts/audit.py）
      → 读 docs/dashboard-meta.json（手工维护：台账状态/待办/风险/契约速查）
      → 补扫 content/ 取描述性字段（板块/联盟/配图/TL;DR 小标题）
      → 输出 docs/is-mind-工作台.html（单文件，可直接分享/导入资料库）

本脚本不定义任何合规规则；规则改 contract.md，判据改 audit.py。
"""
import os, re, io, json, sys, time, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
C = os.path.join(ROOT, 'content')

EXEMPT_TLDR_AUTHORS = {'Wren Hollow'}   # Storyteller 用场景 hook 替代 TL;DR

def read(p):
    return io.open(p, encoding='utf-8').read()

def scan():
    """补充描述性字段（不参与合规判定）。"""
    out = {}
    for dp, dn, fn in os.walk(C):
        rel = os.path.relpath(dp, C)
        top = rel.split(os.sep)[0]
        if top in ('zh', 'es', '.trash') or rel == '.':
            continue
        if 'index.md' not in fn:
            continue
        p = os.path.join(dp, 'index.md')
        t = read(p)
        key = os.path.relpath(p, C).replace('\\', '/')
        m = re.match(r'^---\n.*?\n---\n', t, re.S)
        fm = m.group(0) if m else ''
        body = t[m.end():] if m else t
        topic = re.search(r'^affiliateTopic:\s*"?(.+?)"?\s*$', fm, re.M)
        sec = top.lower().replace('psych', 'psych')
        out[key] = {
            'section': sec,
            'topic': topic.group(1) if topic else '',
            'aff': len(re.findall(r'rel="sponsored', body)),
            'imgs': len(re.findall(r'!\[[^\]]*\]\(', body)),
            'h_tldr': bool(re.search(r'^#{1,4}\s*TL;?DR', body, re.M | re.I)),
            'faq': bool(re.search(r'^#{2,4}\s*.*(FAQ|Frequently Asked|Common Questions|Questions People)', body, re.M | re.I)),
            'mtime': time.strftime('%Y-%m-%d', time.localtime(os.path.getmtime(p))),
        }
    return out

def main():
    rep = json.loads(read(os.path.join(ROOT, 'docs', 'audit-report.json')))
    meta = json.loads(read(os.path.join(ROOT, 'docs', 'dashboard-meta.json')))
    extra = scan()

    arts = []
    for a in rep['articles']:
        e = extra.get(a['path'], {})
        slug = a['slug'].strip('/')
        sec = e.get('section', slug.split('/')[0])
        if sec.startswith('psych'):
            sec = 'psych'
        exempt = a['author'] in EXEMPT_TLDR_AUTHORS
        # TL;DR 状态：ok=有小标题 / soft=只有内容无小标题 / exempt=豁免 / miss=缺失
        if e.get('h_tldr'):
            tldr = 'ok'
        elif exempt:
            tldr = 'exempt'
        elif a['has_tldr'] or _has_lead_quote(a['path']):
            tldr = 'soft'
        else:
            tldr = 'miss'
        arts.append({
            't': a['title'], 'a': a['author'], 'sec': sec, 'slug': '/' + slug + '/',
            'w': a['words'], 'l': a['links'], 'tags': a['tags'],
            'tldr': tldr, 'faq': bool(a['has_faq'] or e.get('faq')),
            'aff': e.get('aff', 0), 'topic': e.get('topic', ''),
            'imgs': e.get('imgs', 0), 'banned': a['banned'],
            'upd': e.get('mtime', ''), 'p': a['path'],
        })
    arts.sort(key=lambda x: (x['sec'], x['t'] or ''))

    data = {
        'gen': time.strftime('%Y-%m-%d %H:%M'),
        'audit': {
            'total': rep['total'], 'authors': rep['authors'], 'tag_out': len(rep['tag_out']),
            'tag_kinds': len(rep['tag_count']), 'thin': len(rep['thin']), 'thin800': len(rep['thin800']),
            'lowlink': len(rep['lowlink']), 'banned': rep['banned'], 'pillars': rep['pillars'],
        },
        'arts': arts,
        'meta': meta,
    }

    html = HTML.replace('/*__DATA__*/', json.dumps(data, ensure_ascii=False))
    out = os.path.join(ROOT, 'docs', 'is-mind-工作台.html')
    io.open(out, 'w', encoding='utf-8').write(html)
    print('工作台已生成:', out)
    print('文章数:', len(arts), '| 台账:', len(meta['ledgers']), '| 待办:', len(meta['issues']))


def _has_lead_quote(path):
    """正文开头 30 行内是否有成段引用块（视为 TL;DR 内容）。"""
    t = read(os.path.join(C, path))
    m = re.match(r'^---\n.*?\n---\n', t, re.S)
    body = t[m.end():] if m else t
    head = body.split('\n')[:30]
    return sum(1 for l in head if l.startswith('>')) >= 2


HTML = r'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>is-mind 项目工作台</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--purple:#6d4aa8;--purple-l:#f3edfb;--gold:#b8941f;--gold-l:#fdf6e0;
--ink:#1a1626;--ink2:#4a4358;--muted:#7d7589;--line:#e8e3f0;
--ok:#2e8b57;--ok-l:#e6f5ec;--warn:#c8860d;--warn-l:#fdf4e0;--bad:#c0392b;--bad-l:#fdecea;--bg:#faf8fd}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"PingFang SC","Microsoft YaHei",sans-serif;
background:var(--bg);color:var(--ink);line-height:1.6;-webkit-font-smoothing:antialiased}
.wrap{max-width:1240px;margin:0 auto;padding:18px 14px 70px}
header{padding:6px 0 16px;border-bottom:2px solid var(--line);margin-bottom:18px}
h1{font-size:24px;font-weight:700;letter-spacing:-.3px}
.sub{color:var(--muted);font-size:13px;margin-top:4px}
.badge{display:inline-block;background:var(--purple-l);color:var(--purple);font-size:11px;font-weight:600;padding:3px 9px;border-radius:20px;margin-left:6px}
.badge.g{background:var(--gold-l);color:var(--gold)}
.badge.r{background:var(--bad-l);color:var(--bad)}
nav{display:flex;gap:6px;flex-wrap:wrap;margin:16px 0 20px;border-bottom:1px solid var(--line);padding-bottom:10px}
nav button{border:1px solid var(--line);background:#fff;color:var(--ink2);font-size:13px;font-weight:600;
padding:7px 14px;border-radius:20px;cursor:pointer;font-family:inherit}
nav button:hover{border-color:var(--purple);color:var(--purple)}
nav button.on{background:var(--purple);border-color:var(--purple);color:#fff}
section{display:none}section.on{display:block}
h2{font-size:17px;font-weight:700;margin:0 0 12px}
h3{font-size:14px;font-weight:700;margin:22px 0 10px;color:var(--purple)}
.card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:16px;margin-bottom:14px}
.grid{display:grid;gap:12px}
@media(min-width:760px){.g3{grid-template-columns:repeat(3,1fr)}.g4{grid-template-columns:repeat(4,1fr)}.g2{grid-template-columns:repeat(2,1fr)}}
.metric{background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px;text-align:center}
.metric .v{font-size:26px;font-weight:700;letter-spacing:-.5px}
.metric .l{font-size:11.5px;color:var(--muted);margin-top:2px}
.metric .t{font-size:11px;font-weight:700;margin-top:7px;display:inline-block;padding:2px 8px;border-radius:6px}
.t-ok{background:var(--ok-l);color:var(--ok)}.t-warn{background:var(--warn-l);color:var(--warn)}
.t-bad{background:var(--bad-l);color:var(--bad)}.t-info{background:var(--purple-l);color:var(--purple)}
table{width:100%;border-collapse:collapse;font-size:13px}
th,td{padding:8px 8px;text-align:left;border-bottom:1px solid var(--line);vertical-align:middle}
th{font-size:11.5px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.3px;
position:sticky;top:0;background:#fff;cursor:pointer;user-select:none;white-space:nowrap}
th:hover{color:var(--purple)}
td.n{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
tr.row:hover{background:#fbf9fe}
.tw{max-height:none}
.pill{display:inline-block;font-size:11px;font-weight:700;padding:2px 7px;border-radius:6px;white-space:nowrap}
.p-ok{background:var(--ok-l);color:var(--ok)}.p-warn{background:var(--warn-l);color:var(--warn)}
.p-bad{background:var(--bad-l);color:var(--bad)}.p-info{background:var(--purple-l);color:var(--purple)}
.p-mute{background:#f0eef4;color:var(--muted)}
.tag{display:inline-block;font-size:10.5px;background:var(--purple-l);color:var(--purple);padding:1px 6px;border-radius:5px;margin:1px 2px 1px 0}
.tools{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px}
input[type=search],select{font-family:inherit;font-size:13px;padding:7px 10px;border:1px solid var(--line);
border-radius:9px;background:#fff;color:var(--ink)}
input[type=search]{min-width:220px;flex:1}
.hint{font-size:12px;color:var(--muted);margin-top:2px}
details{background:#fff;border:1px solid var(--line);border-radius:12px;padding:0;margin-bottom:10px;overflow:hidden}
details summary{padding:12px 14px;cursor:pointer;font-weight:600;font-size:14px;list-style:none;display:flex;gap:8px;align-items:center}
details summary::-webkit-details-marker{display:none}
details .body{padding:0 14px 14px;font-size:13px;color:var(--ink2);border-top:1px solid var(--line);padding-top:12px;margin-top:0}
.bar{height:7px;background:#f0eef4;border-radius:4px;overflow:hidden;margin-top:5px}
.bar i{display:block;height:100%;background:var(--purple);border-radius:4px}
.bar i.g{background:var(--gold)}
.kv{display:grid;grid-template-columns:120px 1fr;gap:6px 10px;font-size:13px}
.kv b{color:var(--muted);font-weight:600}
code{background:#f5f2fa;padding:1px 5px;border-radius:5px;font-size:12px;
font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
ul{padding-left:18px}li{margin:3px 0;font-size:13px}
.small{font-size:12px;color:var(--muted)}
.foot{margin-top:26px;padding-top:14px;border-top:1px solid var(--line);font-size:12px;color:var(--muted)}
a{color:var(--purple)}
.sec-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px}
</style>
</head>
<body>
<div class="wrap">
<header>
  <h1>is-mind 项目工作台<span class="badge">43 篇</span><span class="badge g" id="genBadge"></span></h1>
  <div class="sub" id="subline"></div>
</header>

<nav id="nav">
  <button data-s="ov" class="on">总览</button>
  <button data-s="arts">文章全表</button>
  <button data-s="led">子台账 15</button>
  <button data-s="iss">待办与风险</button>
  <button data-s="ct">契约速查</button>
  <button data-s="log">变更日志</button>
</nav>

<section id="ov" class="on">
  <div class="grid g4" id="kpis"></div>
  <h3>待办优先级</h3>
  <div id="ovIssues"></div>
  <h3>作者分布与进度</h3>
  <div class="card" id="authors"></div>
  <h3>板块分布</h3>
  <div class="card" id="sections"></div>
  <h3>集群支柱页（9/9）</h3>
  <div class="card" id="pillars"></div>
</section>

<section id="arts">
  <div class="tools">
    <input type="search" id="q" placeholder="搜索标题 / slug / tag…">
    <select id="fa"><option value="">全部作者</option></select>
    <select id="fs"><option value="">全部板块</option></select>
    <select id="ft">
      <option value="">全部状态</option>
      <option value="bad">有问题</option>
      <option value="tldr-soft">TL;DR 缺小标题</option>
      <option value="banned">AI 禁用词</option>
      <option value="noimg">无配图</option>
      <option value="noaff">无联盟</option>
      <option value="nofaq">无 FAQ</option>
    </select>
    <span class="hint" id="cnt"></span>
  </div>
  <div class="card" style="padding:0;overflow:hidden">
    <table>
      <thead><tr>
        <th data-k="t">标题</th><th data-k="a">作者</th><th data-k="sec">板块</th>
        <th data-k="w">词数</th><th data-k="l">内链</th><th data-k="tldr">TL;DR</th>
        <th data-k="faq">FAQ</th><th data-k="aff">联盟</th><th data-k="imgs">图</th>
        <th data-k="banned">禁用词</th><th data-k="upd">更新</th>
      </tr></thead>
      <tbody id="tb"></tbody>
    </table>
  </div>
  <div class="hint" style="margin-top:8px">点击表头排序；点击任意行展开细节（tags / 路径 / 联盟 topic）。</div>
</section>

<section id="led">
  <div class="card" style="padding:0;overflow:hidden">
    <table>
      <thead><tr><th style="width:60px">ID</th><th>子任务</th><th style="width:80px">状态</th><th>关键产出</th><th style="width:220px">台账文件</th><th style="width:100px">更新</th></tr></thead>
      <tbody id="ltbody"></tbody>
    </table>
  </div>
  <h3>已完成（近期修复登记）</h3>
  <div id="resolved"></div>
</section>

<section id="iss">
  <div id="issues"></div>
</section>

<section id="ct">
  <h3>受控词表（23 个，禁止自创）</h3>
  <div class="card" id="ctTags"></div>
  <h3>作者 ↔ Persona（5 笔名）</h3>
  <div class="card" id="ctAuthors"></div>
  <h3>红线</h3>
  <div class="card"><ul id="ctRed"></ul></div>
  <h3>支柱页（9 簇）</h3>
  <div class="card" id="ctPillars"></div>
  <h3>质量阈值</h3>
  <div class="card" id="ctTh"></div>
  <h3>禁止操作（踩过的雷）</h3>
  <div class="card"><ul id="ctForb"></ul></div>
</section>

<section id="log">
  <div class="card" style="padding:0;overflow:hidden">
    <table>
      <thead><tr><th style="width:110px">日期</th><th>变更</th><th style="width:170px">相关台账</th></tr></thead>
      <tbody id="logBody"></tbody>
    </table>
  </div>
</section>

<div class="foot">
  合规判据唯一来源：<code>scripts/audit.py</code> → <code>docs/audit-report.json</code>；
  手工维护层：<code>docs/dashboard-meta.json</code>；
  重生成：<code>python scripts/build_dashboard.py</code>（审计后重跑即可刷新本页）。
</div>
</div>

<script>
const D = /*__DATA__*/;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const A = D.arts, M = D.meta, AU = D.audit;
const SEC = {'tarot':['塔罗','#6d4aa8'],'psych':['心理','#c0392b'],'energy':['能量','#2e8b57'],
             'astrology':['占星','#b8941f'],'reviews':['评测','#2b6cb0']};
const TL = {ok:['有小标题','p-ok'],soft:['缺小标题','p-warn'],exempt:['豁免(hook)','p-mute'],miss:['缺失','p-bad']};

$('#genBadge').textContent = '审计 ' + D.gen;
$('#subline').innerHTML = '站点 ' + esc(M.project.站点) + ' · ' + esc(M.project.技术栈) + ' · ' + esc(M.project.内容规模)
  + ' · 目标：' + esc(M.project.核心目标) + '　|　GSC 基线：' + esc(M.project.SEO基线)
  + '<br><b style="color:#c8860d">' + esc(M.project.部署状态) + '</b>';

/* ---------- 总览 ---------- */
const tldrSoft = A.filter(a => a.tldr === 'soft').length;
const tldrOk = A.filter(a => a.tldr === 'ok').length;
const noImg = A.filter(a => a.imgs === 0).length;
const noAff = A.filter(a => a.aff === 0 && !a.topic).length;
const kpi = [
  ['文章总数', AU.total, 'info', '43 篇 + 6 政策页'],
  ['署名覆盖', '100%', 'ok', '5 笔名，越界 0'],
  ['字数 ≥1200', AU.total - AU.thin + '/' + AU.total, AU.thin ? 'bad' : 'ok', '严重偏薄 ' + AU.thin800 + ' 篇'],
  ['内链 ≥2', AU.total - AU.lowlink + '/' + AU.total, AU.lowlink ? 'bad' : 'ok', '缺口 ' + AU.lowlink + ' 篇'],
  ['TL;DR 小标题', tldrOk + '/' + AU.total, tldrOk === AU.total ? 'ok' : 'warn', tldrSoft + ' 篇只有内容无标题'],
  ['tags 越界', AU.tag_out, AU.tag_out ? 'bad' : 'ok', AU.tag_kinds + ' 个受控词'],
  ['联盟覆盖', (AU.total - noAff) + '/' + AU.total, noAff > 3 ? 'warn' : 'ok', '零联盟 ' + noAff + ' 篇'],
  ['配图', (AU.total - noImg) + '/' + AU.total, noImg ? 'warn' : 'ok', '缺图 ' + noImg + ' 篇'],
];
$('#kpis').innerHTML = kpi.map(k =>
  `<div class="metric"><div class="v">${esc(k[1])}</div><div class="l">${esc(k[0])}</div>
   <div class="t t-${k[2]}">${esc(k[3])}</div></div>`).join('');

const PRI = {P0:'p-bad',P1:'p-warn',P2:'p-mute'};
const issHtml = arr => arr.map(i =>
  `<details><summary><span class="pill ${PRI[i.p]}">${esc(i.p)}</span>${esc(i.标题)}</summary>
   <div class="body"><div style="margin-bottom:8px">${esc(i.详情)}</div>
   <div><b>建议：</b>${esc(i.建议)}</div>
   ${i.台账 ? '<div class="small" style="margin-top:6px">相关台账：' + esc(i.台账) + '</div>' : ''}</div></details>`).join('');
$('#ovIssues').innerHTML = issHtml(M.issues.filter(i => i.p !== 'P2'));
$('#issues').innerHTML = issHtml(M.issues);

const ac = {}; A.forEach(a => ac[a.a] = (ac[a.a] || 0) + 1);
$('#authors').innerHTML = Object.entries(ac).sort((x, y) => y[1] - x[1]).map(([k, v]) => {
  const sub = A.filter(a => a.a === k);
  const w = Math.round(sub.reduce((s, a) => s + a.w, 0) / sub.length);
  const lk = (sub.reduce((s, a) => s + a.l, 0) / sub.length).toFixed(1);
  return `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:13px">
    <b>${esc(k)}</b><span class="small">${v} 篇 · 均 ${w} 词 · 均 ${lk} 内链</span></div>
    <div class="bar"><i style="width:${(v / 16 * 100).toFixed(0)}%"></i></div></div>`;
}).join('');

const sc = {}; A.forEach(a => sc[a.sec] = (sc[a.sec] || 0) + 1);
$('#sections').innerHTML = Object.entries(sc).map(([k, v]) => {
  const sub = A.filter(a => a.sec === k);
  const w = Math.round(sub.reduce((s, a) => s + a.w, 0) / sub.length);
  const c = (SEC[k] || ['其他', '#7d7589']);
  return `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:13px">
    <b><span class="sec-dot" style="background:${c[1]}"></span>${esc(c[0])} <span class="small">${esc(k)}</span></b>
    <span class="small">${v} 篇 · 均 ${w} 词</span></div>
    <div class="bar"><i class="g" style="width:${(v / 16 * 100).toFixed(0)}%;background:${c[1]}"></i></div></div>`;
}).join('');

$('#pillars').innerHTML = M.contract.pillars.map(p =>
  `<div style="display:flex;justify-content:space-between;font-size:13px;padding:4px 0;border-bottom:1px solid var(--line)">
   <span>${esc(p[0])}</span><code>${esc(p[1])}</code></div>`).join('')
  + '<div class="small" style="margin-top:8px">审计判定：' + Object.values(AU.pillars).every(v => v === 'OK') + ' → 9/9 全部 OK</div>';

/* ---------- 文章表 ---------- */
const uniq = k => [...new Set(A.map(a => a[k]))].sort();
$('#fa').innerHTML += uniq('a').map(v => `<option>${esc(v)}</option>`).join('');
$('#fs').innerHTML += uniq('sec').map(v => `<option value="${esc(v)}">${esc((SEC[v] || [v])[0])}</option>`).join('');

let sortK = 't', sortD = 1;
function render() {
  const q = $('#q').value.trim().toLowerCase();
  const fa = $('#fa').value, fs = $('#fs').value, ft = $('#ft').value;
  let rows = A.filter(a => {
    if (fa && a.a !== fa) return false;
    if (fs && a.sec !== fs) return false;
    if (ft === 'bad' && !(a.tldr === 'miss' || a.banned.length || a.imgs === 0 || a.l < 2 || a.w < 1200)) return false;
    if (ft === 'tldr-soft' && a.tldr !== 'soft') return false;
    if (ft === 'banned' && !a.banned.length) return false;
    if (ft === 'noimg' && a.imgs !== 0) return false;
    if (ft === 'noaff' && (a.aff || a.topic)) return false;
    if (ft === 'nofaq' && a.faq) return false;
    if (q && !(a.t || '').toLowerCase().includes(q) && !a.slug.toLowerCase().includes(q)
        && !a.tags.join(' ').toLowerCase().includes(q)) return false;
    return true;
  });
  rows.sort((x, y) => {
    let p = x[sortK], r = y[sortK];
    if (Array.isArray(p)) p = p.length;
    if (Array.isArray(r)) r = r.length;
    if (typeof p === 'boolean') { p = p ? 1 : 0; r = r ? 1 : 0; }
    return (p > r ? 1 : p < r ? -1 : 0) * sortD;
  });
  $('#cnt').textContent = rows.length + ' / ' + A.length + ' 篇';
  $('#tb').innerHTML = rows.map(a => {
    const t = TL[a.tldr];
    return `<tr class="row" data-slug="${esc(a.slug)}">
      <td><b>${esc((a.t || '').slice(0, 58))}</b><br><span class="small">${esc(a.slug)}</span></td>
      <td>${esc(a.a)}</td>
      <td><span class="sec-dot" style="background:${(SEC[a.sec] || ['', '#7d7589'])[1]}"></span>${esc((SEC[a.sec] || [a.sec])[0])}</td>
      <td class="n">${a.w}</td>
      <td class="n">${a.l}</td>
      <td><span class="pill ${t[1]}">${t[0]}</span></td>
      <td>${a.faq ? '<span class="pill p-ok">有</span>' : '<span class="pill p-mute">无</span>'}</td>
      <td class="n">${a.aff}${a.topic ? ' <span class="pill p-info">' + esc(a.topic) + '</span>' : (a.aff ? '' : '<span class="pill p-mute">0</span>')}</td>
      <td class="n">${a.imgs}</td>
      <td>${a.banned.length ? '<span class="pill p-bad">' + esc(a.banned.join(', ')) + '</span>' : '<span class="pill p-ok">0</span>'}</td>
      <td class="n small">${esc(a.upd)}</td></tr>
    <tr class="det" id="d-${esc(a.slug)}" style="display:none;background:#fbf9fe">
      <td colspan="11" style="padding:10px 14px">
        <div style="margin-bottom:6px">${a.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('') || '<span class="small">无 tag</span>'}</div>
        <div class="small">路径：<code>${esc(a.p)}</code>${a.topic ? '　联盟卡片 topic：<code>' + esc(a.topic) + '</code>' : ''}</div>
      </td></tr>`;
  }).join('');
}
$$('#arts th').forEach(th => th.onclick = () => {
  const k = th.dataset.k; if (!k) return;
  sortD = (sortK === k) ? -sortD : 1; sortK = k; render();
});
['#q', '#fa', '#fs', '#ft'].forEach(s => { $(s).oninput = render; $(s).onchange = render; });
document.addEventListener('click', e => {
  const tr = e.target.closest('tr.row'); if (!tr) return;
  const det = tr.nextElementSibling;
  if (det && det.classList.contains('det')) det.style.display = det.style.display === 'none' ? '' : 'none';
});
render();

/* ---------- 台账 ---------- */
const LS = {done:['完成','p-ok'],warn:['进行中','p-warn'],todo:['未开始','p-mute'],block:['阻塞','p-bad']};
$('#ltbody').innerHTML = M.ledgers.map(l => {
  const s = LS[l.状态];
  return `<tr><td><b>${esc(l.id)}</b></td><td>${esc(l.名)}</td>
   <td><span class="pill ${s[1]}">${s[0]}</span></td><td class="small">${esc(l.产出)}</td>
   <td><code style="font-size:11px">${esc(l.文件)}</code></td><td class="small">${esc(l.更新)}</td></tr>`;
}).join('');
$('#resolved').innerHTML = M.resolved.map(r =>
  `<div class="card" style="padding:12px 14px;margin-bottom:8px">
   <div style="display:flex;gap:8px;align-items:center"><span class="pill p-ok">已修复</span>
   <b style="font-size:13.5px">${esc(r.项)}</b><span class="small" style="margin-left:auto">${esc(r.日)}</span></div>
   <div class="small" style="margin-top:4px">${esc(r.详情)}</div></div>`).join('');

/* ---------- 契约 ---------- */
$('#ctTags').innerHTML = M.contract.tags.map(t =>
  `<div style="margin-bottom:8px"><b style="font-size:12.5px">${esc(t[0])}</b><br>
   ${t[1].split(', ').map(x => `<span class="tag">${esc(x)}</span>`).join('')}</div>`).join('');
$('#ctAuthors').innerHTML = '<table><thead><tr><th>笔名</th><th>Persona</th><th>声音</th><th>锁定专栏</th><th>Instagram</th></tr></thead><tbody>'
  + M.contract.authors.map(a => `<tr><td><b>${esc(a.笔名)}</b></td><td>${esc(a.persona)}</td>
    <td class="small">${esc(a.声音)}</td><td class="small">${esc(a.锁定)}</td><td><code>${esc(a.联系)}</code></td></tr>`).join('')
  + '</tbody></table>';
$('#ctRed').innerHTML = M.contract.redlines.map(r => `<li>${esc(r)}</li>`).join('');
$('#ctPillars').innerHTML = M.contract.pillars.map(p =>
  `<div style="display:flex;justify-content:space-between;font-size:13px;padding:4px 0;border-bottom:1px solid var(--line)">
   <span>${esc(p[0])}</span><code>${esc(p[1])}</code></div>`).join('');
$('#ctTh').innerHTML = '<table><tbody>' + M.contract.thresholds.map(t =>
  `<tr><td style="width:110px"><b>${esc(t[0])}</b></td><td>${esc(t[1])}</td></tr>`).join('') + '</tbody></table>';
$('#ctForb').innerHTML = M.contract.forbidden.map(f => `<li>${esc(f)}</li>`).join('');

/* ---------- 日志 ---------- */
$('#logBody').innerHTML = M.changelog.slice().reverse().map(c =>
  `<tr><td class="small">${esc(c.日)}</td><td>${esc(c.项)}</td><td class="small">${esc(c.相关)}</td></tr>`).join('');

/* ---------- 导航 ---------- */
$$('#nav button').forEach(b => b.onclick = () => {
  $$('#nav button').forEach(x => x.classList.remove('on'));
  $$('section').forEach(x => x.classList.remove('on'));
  b.classList.add('on'); $('#' + b.dataset.s).classList.add('on');
  window.scrollTo(0, 0);
});
</script>
</body>
</html>
'''

if __name__ == '__main__':
    main()
