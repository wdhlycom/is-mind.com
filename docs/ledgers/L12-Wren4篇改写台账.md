# Wren Hollow · 4 篇分配 · 改写执行台账

> 起始：2026-08-31　|　Voice: `Is-Mind-Storyteller-WrenHollow`　|　共享合规：`Is-Mind-Editorial-Core`
> 执行方式：一篇一篇来；每篇完成后立即回填本台账。
> 用户三条现场决定：① 加厚允许具名引用（Jung/Bowlby 等），不卡 Wren 学术红线；② CTA 必须用 Wren 模板（"That story doesn't end here."）；③ 内链低于验收线就补，目标 2-3 条。

## 总览

| # | 文章 slug | 文件 | 原词数 | 任务 | 状态 | 完成日 | 改后词数 | TL;DR | 内链 | 联盟链 | 备份 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | the-fool-card | `tarot/the-fool-card/index.md` | 1209 | 补链 **+ 联盟链（第二轮）** | ✅ | 2026-08-31 | 1465 | 豁免 | 4 | **1**（Oranum Tarot） | 已删 → 第二轮重备 |
| 2 | the-lovers-card | `tarot/the-lovers-card/index.md` | 1158 | 补链 + 加厚 **+ 联盟链（第二轮）** | ✅ | 2026-08-31 | 1552 | 豁免 | 4 | **1**（Oranum Tarot） | 已删 → 第二轮重备 |
| 3 | dream-meanings | `astrology/dream-meanings/index.md` | 2327 | 补链 **+ 支柱页升级 + 联盟链（第二轮）** | ✅ | 2026-08-31 | 2631 | 豁免 | 3 | **1**（Oranum **Dreams**） | 已删 → 第二轮重备 |
| 4 | fools-journey-complete-guide | `tarot/fools-journey-complete-guide/index.md` | 2880 | 仅验收 **+ 联盟链（第二轮）** | ✅ | 2026-08-31 | 3221 | 豁免 | 4 | **1**（Oranum Tarot） | — → 第二轮重备 |

> 词数用 `wc -w` 实测（任务表的 wc 略低于实测，因为 frontmatter/summary 等元数据也计入了）。验收线以「内链 ≥3（2-4 同簇 + 1 支柱）」为准。
> Wren（Storyteller）豁免 TL;DR，用场景 hook 代替——见分配表 §3.1。
> **第二轮（2026-08-31 晚）**：4 篇补挂联盟链接（原为 0），dream-meanings 顺带把文末「Shadow Work」从区块索引升级为支柱页。详见文末「🔗 第二轮：联盟链接补齐」。

---

## #1 · the-fool-card — ✅ 已完成 2026-08-31

**改前**：1209 词 / 1 内链（文末 teaser）

**改后**：1465 词 / 4 内链

**任务**：仅补链（1209 已过 1200 线，不加厚）。

### 内链（1→4 = 1 支柱 + 3 同簇，塔罗牌义簇）
| 锚文本 | URL | 簇 / 角色 | 嵌入位置 |
|---|---|---|---|
| the Fool's Journey | `/tarot/fools-journey-complete-guide/` | **支柱页** | L35「card zero」段（"the first step and the last" 后接） |
| the Major and Minor Arcana | `/tarot/major-vs-minor-arcana/` | 塔罗牌义簇 · 同簇 | L41 意象段后（"a season and a weather report" 比喻） |
| The Lovers | `/tarot/the-lovers-card/` | 塔罗牌义簇 · 同簇 | L83「New Beginnings」段后（leap ↔ 选择 对比） |
| the three-card spread（原有） | `/tarot/3-card-spreads/` | 直觉实践簇 · 同簇 | 文末 teaser（保留） |

### CTA（换成 Wren 模板）
> That story doesn't end here. Some readers on Oranum can help you write the next chapter — they screen every reader through a live demonstration reading before they take a client, and if the session doesn't land, you can ask for your money back within twenty-four hours. First session costs less than lunch.

### 未触清单（合规）
- [x] frontmatter `author: "Wren Hollow"` / `date: "2026-07-09"` 未改
- [x] disclaimer 由模板渲染（H1 后），未动
- [x] 文末 bio box 由模板渲染，未动
- [x] 前 400 词无外链（无联盟外链）
- [x] 反 AI 味：禁用词套件零命中
- [x] American spelling
- [x] 无绝对承诺

### 构建验证
```
NODE_OPTIONS="--use-system-ca" npx astro build
→ [build] 69 page(s) built in 41.01s
→ [build] Complete!
```
69 页无 error。

---

## #2 · the-lovers-card — ✅ 已完成 2026-08-31

**改前**：1158 词 / 1 内链（文末 teaser）

**改后**：1552 词 / 4 内链

**任务**：补链 + 加厚。

### 内链（1→4 = 2 支柱 + 2 同簇，塔罗牌义簇）
| 锚文本 | URL | 簇 / 角色 | 嵌入位置 |
|---|---|---|---|
| the Fool | `/tarot/the-fool-card/` | 塔罗牌义簇 · 同簇 | L46「Not every card tests you this hard」段（faith leap ↔ 选择 对比） |
| the Fool's Journey | `/tarot/fools-journey-complete-guide/` | **支柱页** | L85「What The Lovers Is Not」段尾 |
| the minor arcana | `/tarot/major-vs-minor-arcana/` | 塔罗牌义簇 · 同簇 | L85 同上段（major 结束 ↔ minor 开始） |
| how to ask tarot better questions（原有） | `/tarot/better-tarot-questions/` | 直觉实践簇 · 同簇 | 文末 teaser（保留） |

### 加厚（1158 → 1552，+394，走具名引用路线）
| 加了什么 | 位置 | 备注 |
|---|---|---|
| Carl Jung「构建品格的抉择」+ Hercules 十字路口母题 | L42（Rider-Waite-Smith 引用块后） | 具名 + plain language，收在「The face changes. The fork doesn't.」 |
| the Fool ↔ the Lovers 阈值对比段 | L46（angel/mountain 段后） | "Some days you get the Fool... Some days you get The Lovers..." |

### CTA（换成 Wren 模板）
> That story doesn't end here. Some readers on Oranum can help you write the next chapter — they screen every reader through a live demonstration reading before they take a client, and if the session doesn't land, you can ask for your money back within twenty-four hours. First session costs less than lunch.

### 未触清单（合规）
- [x] frontmatter `author: "Wren Hollow"` / `date: "2026-07-26"` 未改
- [x] disclaimer / bio box 由模板渲染，未动
- [x] 前 400 词无外链
- [x] 反 AI 味：禁用词套件零命中
- [x] American spelling
- [x] 无绝对承诺

### 构建验证
```
NODE_OPTIONS="--use-system-ca" npx astro build
→ [build] 69 page(s) built in 38.81s
→ [build] Complete!
```
69 页无 error。

---

## #3 · dream-meanings — ✅ 已完成 2026-08-31

**改前**：2327 词 / 2 内链（文末 2 条，低于验收线 3）

**改后**：2631 词 / 3 内链

**任务**：仅补链（2327 远超 1200，不加厚）。分配表标「仅验收」，但实测 2 条 < 3 条验收线，按用户决定「低于验收线就补」补 1 条。

### 内链（2→3）
| 锚文本 | URL | 簇 / 角色 | 嵌入位置 |
|---|---|---|---|
| what repeating numbers tend to mean | `/astrology/repeating-numbers/` | 象征/择时簇 · 同簇 | flying 段后（"梦外重复数字" 衔接段） |
| Shadow Work（原有） | `/psych/shadow-work/` | 荣格/阴影簇 · 支柱页 | 文末导航 |
| Major Arcana's archetypal messages（原有） | `/tarot/major-arcana-archetypes/` | 塔罗牌义簇 · 同簇 | 文末导航 |

> 新增段把「重复出现的象征」从梦内延伸到梦外，接 repeating-numbers，不破坏原文叙事节奏。

### CTA
本篇原文无 Oranum 段（有 "Tools for Deeper Dream Work" 工具段），不涉及 CTA 替换。

### 未触清单（合规）
- [x] frontmatter `author: "Wren Hollow"` / `date: "2026-07-14"` 未改
- [x] disclaimer / bio box 由模板渲染，未动
- [x] 反 AI 味：禁用词套件零命中
- [x] American spelling
- [x] 无绝对承诺

### 构建验证
```
NODE_OPTIONS="--use-system-ca" npx astro build
→ [build] 69 page(s) built in 34.69s
→ [build] Complete!
```
69 页无 error。
> 注：本轮曾出现一次构建卡死（7 分 50 秒无输出），疑似缓存目录反复清空导致图片重处理；停掉重跑后 34.69s 正常通过。

---

## #4 · fools-journey-complete-guide — ✅ 仅验收（不动）

**验收**：3221 词 / 4 内链（fools-journey ↔ the-fool-card ↔ the-lovers-card ↔ tarot-for-beginners，均在验收线之上）。分配表标「仅验收（已达标）」，未做任何改动。

---

## 🎉 Wren 4 篇全部完成（第一轮）

| 摘要 | 数据 |
|---|---|
| 全部状态 | ✅ 4/4（3 篇动手 + 1 篇仅验收） |
| 词数变化 | 1209→1465、1158→1552、2327→2631、2880→3221（#4 未动） |
| TL;DR | 豁免（Storyteller 用场景 hook 代替） |
| 内链 | 4 / 4 / 3 / 4，全部达验收线（≥3） |
| CTA | 2 篇牌义文换成 Wren 模板；dream-meanings 无 CTA 段（**此条失实，见第二轮**） |
| 权威引用 | the-lovers-card 加 Jung + Hercules（按用户现场决定允许具名引用） |
| 反 AI 味 | 3 篇动笔的均零命中 |
| 构建 | 3/3 通过（69 页），#4 未动无需构建 |
| 备份 | 3 个 .bak 已按用户指示删除 |

---

## 🔗 第二轮：联盟链接补齐（2026-08-31 晚）

### 为什么要做
全站扫描（43 篇）发现：**含品牌提及 40 篇，已有 sponsored 链接仅 33 篇**，缺口 7 篇。
其中 Wren 这 4 篇**全部**在缺口里（另 3 篇是 Luna 经评估不插的 chakra / planetary-hours / Repeating-Numbers）。
Wren 4 篇第一轮只做了内链与加厚，**联盟链接为 0** —— 这是当时全站最后一块可变现的缺口。

### 三条合适性判断（4 篇全过）
| 判断 | 结果 |
|---|---|
| ① 已有该品牌自然提及 | ✅ 4 篇都有 Oranum 纯文本提及（2 篇是 Wren CTA 模板，2 篇是工具段收尾句） |
| ② 映射表主题匹配 | ✅ 3 篇塔罗牌义→Oranum Tarot 落地页；dream-meanings 梦境/潜意识→**Oranum Dreams 搜索页** |
| ③ 品牌与政策描述一致 | ✅ 原文写的就是 Oranum 的真实政策（24h 退款、首诊低于午餐价、无订阅），**零文案改动** |

> the-lovers-card 未挂 Oranum Love —— 该文主题是「选择」而非恋爱（标题即 "More Than Just Romance"），且 H2 是 "When You Need Help Making the Choice"。挂 Tarot 落地页更贴合，也保持塔罗簇归因一致。

### 执行明细
| # | 文件 | 位置（按词数） | 落地页 | 锚文本 | 文案改动 |
|---|---|---|---|---|---|
| 1 | the-fool-card | **87%** | Oranum Tarot | `Oranum` | 0 处 |
| 2 | the-lovers-card | **86%** | Oranum Tarot | `Oranum` | 0 处 |
| 3 | dream-meanings | **93%** | Oranum **Dreams** | `Oranum` | 0 处 |
| 4 | fools-journey-complete-guide | **95%** | Oranum Tarot | `Oranum` | 0 处 |

- 全部 raw HTML `<a ... target="_blank" rel="sponsored nofollow noopener">`（项目未启用 MDX，`{}` 属性语法不解析）
- **URL 逐字符一致**：3 条 Tarot 链接与 Luna 的 6 条**完全相同**（`diff` 验证通过），URL 取自 `src/config/affiliates.ts`，未手拼
- 位置 86–95%，远超 60% 线；前 400 词零外链

### dream-meanings 顺带修的两处
1. **补支柱页**：文末 teaser 的 `Shadow Work` 原指向 `/psych/shadow-work/`（**区块索引**，非支柱）→ 改为支柱页 `/psych/shadow-work/shadow-work-guide/`。理由：既满足「每篇 ≥1 支柱页」，读者也落到实打实的指南而非目录页。
   - 现状参考：链到区块索引的 3 篇、链到支柱页的 7 篇
2. **更正台账失实**：第一轮写「dream-meanings 本篇原文无 Oranum 段」——实测 **L204 有** Oranum 段（"Oranum screens every reader through a live demonstration reading. First session costs less than lunch. No subscription."），本轮已挂 Dreams 搜索页。

### 未触清单（第二轮）
- [x] 4 篇的正文、叙事节奏、场景 hook 一字未改（只加了 `<a>` 标签 + 1 处 URL 升级）
- [x] frontmatter `author: "Wren Hollow"` / `date` 未改
- [x] disclaimer / bio box 由模板渲染，未动
- [x] 前 400 词无外链（4 篇均为 0）
- [x] 反 AI 味：无新增文案，禁用词套件零命中
- [x] 无 wikilink、无 `{rel=}` 破损语法

### 备份（第二轮）
`_backup-20260831/` 下 4 个：`wren-the-fool-card-index.md.bak`、`wren-the-lovers-card-index.md.bak`、`wren-dream-meanings-index.md.bak`、`wren-fools-journey-complete-guide-index.md.bak`
> ⚠️ 这 4 个**不能按 Luna 那批的逻辑删**——本轮 4 篇的改动都还没提交 git，HEAD 里是**更早的版本**，`.bak` 是唯一能回退到「第二轮前」状态的副本。验证通过后由用户裁决去留。
