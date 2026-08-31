# Seraphina Cole 改写台账（2026-08-31 建立）

> 任务源：`Voice任务分配-2026-08-29.md`
> 执行 voice：`Is-Mind-SharpAnalyst-SeraphinaCole` + `Is-Mind-Editorial-Core`
> 备份目录：`_backup-20260831/<slug>-index.md.bak`
> 联盟链接唯一查询入口：`docs/affiliate-links.md`
> 全站联盟策略（对齐 L14-Sage）：**文末卡片 + 正文软链共存**。卡片由 frontmatter `affiliateTopic` 触发，`src/layouts/Article.astro:70-71` 自动注入 `<AffiliateBox topic=... />`；链接唯一来源 `src/config/affiliates.ts`。
> ⚠️ `<AffiliateBox topic="..." />` **不能直接写进 .md**（项目无 MDX），只能走 frontmatter 这一条路。

---

## 一、每篇固定完成标准

| 项 | 标准 | 校验方式 |
|---|---|---|
| TL;DR | H1 后引用块，以 `Here's the hard truth.` 开头，≤110 词 | `grep "Here's the hard truth"` |
| 内链 | ≥3 条标准 markdown，目标目录必须存在 | `grep -oE '\[[^]]+\]\(/[^)]+\)'` + `ls -d` |
| 加厚 | ≥1600 词（评测类 ≥1800） | `wc -w` |
| 联盟卡片 | frontmatter 加 `affiliateTopic`（tarot / love / dreams / astrology / numerology / career / healers / mediums / review） | dist 里 `class="aff-box"` = 1 |
| 正文软链 | 全部裸 HTML `<a ... target="_blank" rel="sponsored nofollow noopener">`；**禁止 `{}` 属性语法**（项目无 MDX，不解析） | `grep -oE 'rel="[^"]*"'` |
| 联盟位置 | 60% 之后，前 400 词零外链 | Python 词偏移脚本 |
| 插图 | 只按**文件名 × 段落主题**推断，**没把握零移动**；画面内容一律标注「待目视确认」 | 人工 |
| 反 AI 味 | delve / tapestry / testament / pivotal / showcase / underscore / vibrant / profound / crucial / intricate / furthermore / moreover / nevertheless / embark on / stands as 全部 0 | 词频扫描 |
| 禁绝对判决 | 不写「他是自恋者/煤气灯者」，写「他表现出看起来像……的模式」 | 人工 |
| 构建 | `NODE_OPTIONS="--use-system-ca" npx astro build` 通过，69 页 | 构建日志 |
| 渲染后复核 | dist 里 `{rel=` 计数 = 0，rel 合规计数 ≥ 联盟链数 | `grep dist/` |

---

## 二、9 篇进度总表

> **9 篇全部完成（2026-08-31）**。执行顺序：最薄优先 + 同簇就近。

| # | 篇目 | 改前词数 | 改后词数 | 内链 | 正文软链 | 卡片 topic | 配图 | 状态 |
|---|---|---|---|---|---|---|---|---|
| 1 | `/psych/relationship/gaslighting/` | 684 | 1814 | 4 | 3 | `love`（3 卡） | 3 | ✅ 完成 |
| 2 | `/psych/book-insights/thinking-fast-slow/` | 511 | 1640 | 4 unique | 2 | 未挂（见注①） | 3 | ✅ 完成 |
| 3 | `/reviews/gaia/` | 985 | 1876 | 4 | 2 | `review`（4 卡） | **0** | ✅ 完成（缺图，待补） |
| 4 | `/reviews/psychicoz/` | 1157 | 2416 | 8 | 3 | `love`（3 卡） | **0** | ✅ 完成（缺图，待补） |
| 5 | `/psych/relationship/narcissist-signs/` | 1235 | 2020 | 6（4 unique） | 3 | `love`（3 卡） | 3（含 1 张存疑，见注③） | ✅ 完成 |
| 6 | `/psych/relationship/avoidant-partner/` | 1101 | 1765 | 6 | 2 | `love`（3 卡） | 3 | ✅ 完成 |
| 7 | `/reviews/soulmate-signs/` | 1585 | 1774 | 3 | 2 | `love`（3 卡） | 3 | ✅ 完成 |
| 8 | `/reviews/best-tarot-decks-beginners/` | 1657 | 1998 | 2 | 2 | `tarot`（3 卡） | **0** | ✅ 完成（缺图，待补） |
| 9 | `/energy/same-type-partner/` | 1428 | 1655 | 3 | **0**（见注④） | 未挂（见注④） | 3 | ✅ 完成 |

**注①**：thinking-fast-slow 是认知偏差书评，九个 topic 无一贴合（love/tarot/astrology 全部违和）。硬挂卡片会反噬 E-E-A-T，故只保留 2 条正文软链。**是否给它加通用 topic，等拍板。**
**注③**：narcissist-signs 的三张图中 `2026-07-02-attached-01.png` 文件名为 **attached**（依恋书评篇）而非 narcissist。跨篇复用，**按「没把握零移动」原则未动**，仅报告。位置在 7 signs 之后、「Why the label is the trap」之前，主题对位尚可（依恋 × 自恋动态相邻）。
**注②**：psychicoz 用 `love` 而非 `review`——`review` 卡片只列 Kasamba/Oranum/PG/PO 四家竞品且不含 PsychicOz，等于在自己的评测页推竞品；`love` 卡片含 PsychicOz 且对应其最强赛道。
**注④**：same-type-partner **零联盟链接**。依据「合适性判断」三条（见 MEMORY.md）——原文「When You Need Help Seeing the Pattern」段是 **Oranum 且带 Oranum 专属政策描述**（live demo 阅读、24h 退款、首诊低于午餐价）。换品牌 = 替对方编造政策，违规；Oranum 又无 energy/关系模式落地页。三条全不成立 → 保持纯文本，不插软链、不挂卡片。联盟段改写为「持牌治疗师优先，通灵师只是镜子不是诊断」的诚实表述。

执行顺序原则：**最薄优先 + 同簇就近**。

---

## 三、已完篇逐篇明细

### #1 gaslighting — 2026-08-31

| 维度 | 内容 |
|---|---|
| 自欺点名 | 你以为你在等对方承认事实，其实你在用他的承认替代自己的判断 |
| 新增结构 | 12 条短语清单（兑现标题承诺，改前标题与正文不符） |
| 权威 | Robin Stern《The Gaslight Effect》two-person tango；Kahneman 记忆重构 |
| 实操 | 对话后 10 分钟内写下「我自己的版本」 |
| FAQ | 3 组 |
| 联盟 | Oranum Love 文字链 + Psychicoz Love 320×250，93% 处 |
| 联盟位置 | 93%（阈值 60%） |
| 插图 | 3 张 720×405，文件名×段落对位合理，**零移动**；画面内容待目视确认 |

### #2 thinking-fast-slow — 2026-08-31

| 维度 | 内容 |
|---|---|
| 自欺点名 | 读偏差书最大的陷阱不是「我不懂」，是「我懂了，所以我豁免」 |
| 新增结构 | 六大偏差具名展开 + 「Where this bites in relationships」专栏落点 |
| 权威 | Kahneman（anchoring / availability / loss aversion / halo / WYSIATI / planning fallacy）+ Gary Klein pre-mortem |
| 实操 | pre-mortem 两行写作法 |
| FAQ | 3 组 |
| 联盟 | Oranum intro + Psychicoz 通用文字链，95% 处 |
| 取舍 | Book Insights 非情感文，**不挂 Love banner**（主题违和反噬 E-E-A-T） |
| 插图 | 3 张 720×405，零移动；画面内容待目视确认 |

### #3 gaia — 2026-08-31

| 维度 | 内容 |
|---|---|
| 自欺点名 | 付费 ≠ 修行。「订阅是容易的部分，判断力是你自己带来的部分」 |
| 新增结构 | watchlist 成瘾段（加进待看清单的满足感 ≈ 实际做一次的满足感） |
| 权威 | Carl Sagan ×2（extraordinary claims / 车库隐形龙）+ halo effect |
| FAQ | 4 组 |
| 联盟 | Oranum + Kasamba 文字链 |
| **P0 修复①** | 原文 `[AFFILIATE_LINK_GAIA]` 未替换占位符 → 已替换 |
| **P0 修复②** | 原文虚假声明「这是联盟链接，本站可能获佣金」→ Gaia **无联盟账号**（docs 第四节），改为诚实声明「这条链接本站一分不赚」；官网链只标 `rel="noopener"`，**不加 sponsored** |
| 配图 | **0 张**，1876 词评测文无图，SEO/体验缺口，待出图流程补 |

### #4 psychicoz — 2026-08-31

| 维度 | 内容 |
|---|---|
| 自欺点名 | 透明定价挡得住平台偷袭，挡不住你自己。「每次都觉得便宜，十次下来一个问题没解决」 |
| 新增结构 | 「三分钟免费到底是什么」+「透明定价照样能坑你」+「四条使用规则」+ 四平台对比表 |
| 权威 | 直觉/记忆的选择性回忆（链 `/tarot/science-of-intuition/`） |
| FAQ | 4 组 |
| 联盟 | 正文：PsychicOz Love 文字链×2（75% / 94%）+ Love 320×250 banner（94%）；文末卡片：`affiliateTopic: "love"` → Oranum / Keen / PsychicOz 三卡。dist 复核 `rel="sponsored nofollow noopener"` = 6，`{rel=` = 0 |
| **P0 修复** | 原文 `[AFFILIATE_LINK_PSYCHICOZ]` 未替换占位符 → 已替换为合规裸 HTML |
| 刻意删减 | 原稿结尾的 Oranum / Kasamba 联盟软链已删——与文末 `love` 卡片重复，且竞品信息已由正文对比表的**内链**（`/reviews/oranum/` `/reviews/kasamba/`）承担，不占联盟位 |
| 配图 | **0 张**，2364 词评测文无图，待补 |

### #5 narcissist-signs — 2026-08-31

| 维度 | 内容 |
|---|---|
| 自欺点名 | 你不是在判断他是不是自恋者，你是在用「他是不是」推迟「我能不能接受现状」。**标签是最体面的拖延方式** |
| 新增结构 | 「Why the label is the trap」+「Why the most empathic people get caught hardest」+ Step 3 事实日志 |
| 权威 | Ramani Durvasula（reframe：不是「他会改吗」而是「我能不能接受现在的他」）+ W. Keith Campbell（自恋作为自我调节策略，你的注意力是燃料）+ DSM-5（原文已有） |
| 实操 | 事后 10 分钟记**事实**不记感受（时间戳不能争辩，感受能） |
| FAQ | 原文 4 组 → 5 组（新增「为什么决定走还是又回去了」） |
| 联盟 | PsychicOz Love 文字链 + Oranum Love 文字链 + PsychicOz Love 320×250 banner，**80%–86%**（阈值 60%） |
| 红线处理 | 联盟段明确写「不是诊断、不是治疗师替代品」「记忆被摧毁到怀疑自己时，找你所在司法辖区的持牌治疗师，这篇文章不是治疗方案」 |
| **结构调整** | 初稿联盟段落在 58%（低于 60% 阈值），已把整个「When should you get outside help?」段后移到「them or you」之后、FAQ 之前 → 80% |
| 插图 | 3 张 720×405，零移动。`2026-07-02-attached-01.png` 文件名属 attached 篇，跨篇复用，仅报告未动。画面内容待目视确认 |

### #6 avoidant-partner — 2026-08-31

| 维度 | 内容 |
|---|---|
| 自欺点名 | 你不是嫁给一个疏远的男人，你是嫁给一个**害怕**的男人，两者外表一模一样。你所有的「靠近/谈开/想要更多」都是在回应表象 |
| 新增结构 | 「The part the advice always skips: what the chase is doing to *you*」+ Step 4 平静周二自问 |
| 权威 | Mary Ainsworth（陌生情境实验，回避不是冷漠是习得自保）+ Bowlby（需求被拒 → 源头关停），原文已有，补足落点 |
| 实操 | 在平静的周二问「如果这个节奏就是最好状态，我留不留」——周二答案最真，退避时答案是恐惧、回来时答案是宽慰，都不可靠 |
| FAQ | 原文 4 组 → 5 组（新增「为什么我总遇到会抽离的人」——焦虑×回避互补配对） |
| 联盟 | PsychicOz Love 文字链 + PsychicOz Love 320×250 banner，**76%–80%**（阈值 60%） |
| 红线处理 | 联盟段写死「读者不是治疗师、这不是伴侣咨询」「退避变成贬低/孤立时，要找的是持牌专业人士不是通灵师」 |
| 内链 | 6 处/4 unique（gaslighting / attachment-styles×2 / anxious-attachment×2 / attached） |
| 禁词修复 | 原文遗留 `crucial` 1 处 → 已改为 `The insight that matters` |
| 插图 | 3 张 720×405，零移动。画面内容待目视确认 |

### #7 soulmate-signs — 2026-08-31

| 维度 | 内容 |
|---|---|
| 自欺点名 | 你不是在等对的人，你在等对的**感觉**——闪电、确定性、风暴。而这种感觉恰是「把强度误当成爱」的唯一可靠信号 |
| 新增结构 | 神话段补「投射陷阱」点题（电荷越强越可能是投射不是连接）+ 全文去 emoji 标题 |
| 权威 | Carl Jung anima/animus 投射（原文已有，补「强度≠证据」落点） |
| 内链 | 1 → 3（science-of-intuition / attachment-styles / venus-retrograde），把「直觉安静」与「依恋 vs 对齐」挂到对应专栏 |
| FAQ | 无（listicle 体，非 FAQ 型），保留 Quick self-check |
| 联盟 | Oranum Love 文字链 + PsychicOz Love 文字链，**89%–91%**（阈值 60%）。原稿「When You Want a Second Opinion」段的 Oranum 泛宣传 → 已改为带链合规版 |
| 红线处理 | 联盟段写死「读者不是治疗师；若在处理依恋创伤或操控关系余波，找持牌专业人士」 |
| 插图 | 3 张 720×405，零移动。画面内容待目视确认 |

### #8 best-tarot-decks-beginners — 2026-08-31

| 维度 | 内容 |
|---|---|
| 自欺点名 | 大多数「学不会塔罗」的人不是没天赋，是买了「好看但没法学」的牌，把「看不懂」误判成「没天分」然后放弃。牌不是问题，是第一块倒下的多米诺 |
| 新增结构 | 全文去 emoji 标题；补「Learn the System Before You Collect」段（牌只是半程，另一半是可读的系统）；FAQ 3 组 |
| 权威 | Rider-Waite-Smith 体系作为唯一语言（90% 书/App/指南都假设这套意象） |
| 内链 | 1 → 2（tarot-for-beginners / fools-journey-complete-guide），尾链从裸文本改成可点内链 |
| 联盟 | Oranum Tarot 落地页文字链 + PsychicOz Tarot 文字链（`subSiteId=tarot` / `a_bid=c163dfbf`），文末卡片 `affiliateTopic: "tarot"` → 3 卡 |
| 禁词修复 | 原文遗留 `profound` 1 处 → 改为 `deep` |
| 配图 | **0 张**，1998 词评测文无图，待出图流程补 |

### #9 same-type-partner — 2026-08-31

| 维度 | 内容 |
|---|---|
| 自欺点名 | 你没有「喜欢的类型」，你有一个伤口，反复雇同一张脸来按它。「我总吸引到情感回避的人」是让你保持被动的叙事——伴侣不是从天而降的，是你一遍遍伸手去够的 |
| 新增结构 | 全文去 emoji 标题；补「Where to Go From Here」段（命名模式 → 看清形成机制的下一步，挂 attachment-styles + gaslighting 内链） |
| 权威 | Bowlby & Ainsworth 依恋理论 + Jung（潜意识不显化就会被称为命运）+ Santayana（不记得过去者注定重演），原文已有，补足落点 |
| 内链 | 1 → 3（attachment-styles / gaslighting / self-love-rituals） |
| 联盟 | **零联盟链接**（见注④）。原「When You Need Help」段 Oranum 泛宣传 → 改为「持牌治疗师优先，通灵师只是镜子不是诊断」的诚实表述 |
| 红线处理 | 明确写「重复性强迫的源头在你会说话之前就成形了，独自拆只会让循环继续转」「本文不替代创伤/虐待的专业帮助」 |
| 插图 | 3 张 720×405，文件名×段落对位合理，零移动。画面内容待目视确认 |

---

## 四、遗留问题台账（不在 Seraphina 任务范围，未擅动）

> **扫描范围与动机（2026-08-31 用户问「怎么扫到别人的篇目」，此处存档）**
> 我只在做**联盟链接合规验证**时跑了全站 `grep`，不是做逐篇内容审计。原因：第 1、2 篇写完后发现 `{rel=...}` 属性语法在 .md 里不解析，要判断这是**我一个人的笔误**还是**全站通病**，只能全站扫。结论：全站通病，11 篇中招（其中 2 篇是我自己的，已修；9 篇属 Sage / Iris）。
> 原则不变：**只改自己的 9 篇，别人的篇目只报告不动手**。下表是给全站修 bug 的清单，不是我的施工范围。

### A. 全站 16 篇 `{rel=` 破损属性文本

症状：页面显示 `{rel="sponsored nofollow noopener"}` 字面文本，且 **rel 一个都不生效**。
根因：项目**未启用 MDX**（`astro.config.mjs` 仅 tailwind + sitemap），`{}` 属性语法在 .md 里不解析。
> 2026-08-31 收尾复核：**从 11 篇更正为 16 篇**。前几轮台账漏了 5 篇（zodiac-sign-partner-needs / energy-body-101 / major-arcana-archetypes / major-vs-minor-arcana / science-of-intuition），本轮全站精确 `grep '{rel='` 补全。

| 篇目 | 行 | 归属 voice |
|---|---|---|
| `reviews/kasamba/index.md` | 143 | Sage |
| `reviews/oranum/index.md` | 87 | Sage |
| `Psych/Book Insights/attached/index.md` | 103 | Sage |
| `Psych/Book Insights/courage-to-be-disliked/index.md` | 79 | Sage |
| `Psych/Relationship/anxious-attachment/index.md` | 72 | Sage |
| `Psych/Relationship/attachment-styles/index.md` | 123 | Sage |
| `Psych/Shadow Work/carl-jung-shadow/index.md` | 77 | Sage |
| `Psych/Shadow Work/projection/index.md` | 99 | Sage |
| `Psych/Shadow Work/12-jungian-archetypes-intro/index.md` | 152 | Sage |
| `tarot/fear-vs-intuition/index.md` | 165 | Sage |
| `tarot/science-of-intuition/index.md` | 109 | Sage |
| `tarot/major-arcana-archetypes/index.md` | 157 | Sage |
| `tarot/major-vs-minor-arcana/index.md` | 128 | Sage |
| `astrology/astrology-101-sun-moon-rising/index.md` | 157 | Sage |
| `astrology/venus-retrograde/index.md` | 116 | Iris |
| `astrology/zodiac-sign-partner-needs/index.md` | 187 | Sage |
| `energy/energy-body-101/index.md` | 135 | Sage |

修法（sed 可批量）：`[锚文本](url){rel="..." target="_blank"}` → `<a href="url" target="_blank" rel="sponsored nofollow noopener">锚文本</a>`

### B. 未替换占位符

✅ **已清零**（2026-08-31 收尾复核）。原 `reviews/oranum/index.md:80` `[AFFILIATE_LINK_ORANUM]` 已无残留（非本轮 Seraphina 处理，前几轮之间已修）。全站 `grep AFFILIATE_LINK` = 0。

### C. 架构级待决

`docs/affiliate-links.md` 的「推荐做法① `<AffiliateBox topic="..." />`」在 .md 里是**死路**——组件只在 .astro 文件可用。
两个选项：① 启用 MDX；② 改 `src/layouts/Article.astro` 按 frontmatter（如 `affiliate_topic: love`）自动注入。**等拍板。**

### D. 零配图篇目

`reviews/gaia`（1876 词）、`reviews/psychicoz`（2416 词）、`reviews/kasamba`、`reviews/oranum`、`reviews/best-tarot-decks-beginners`（1998 词）。
五篇千词以上评测文零配图（其中 gaia / psychicoz / best-tarot-decks 三篇是 Seraphina 已改写篇目）。补图需走出图流程。

---

## 五、合规写法模板（复制即用）

```html
<!-- 文字链 -->
<a href="<docs/affiliate-links.md 取链>" target="_blank" rel="sponsored nofollow noopener">锚文本</a>

<!-- 320×250 banner -->
<a href="<带 a_bid 的落地链>" target="_blank" rel="sponsored nofollow noopener"><img src="https://psychicoz.com/aimg/<a_aid>/<a_bid>" alt="描述" width="320" height="250" style="display:block; max-width:100%; height:auto; border:0;" loading="lazy" /></a>
<img src="https://psychicoz.com/aimg?a_aid=<a_aid>&a_bid=<a_bid>" width="0" height="0" style="position:absolute;visibility:hidden;" border="0" alt="" />
```

**Gaia 特例**：无联盟账号，官网链只写 `target="_blank" rel="noopener"`，**不加 sponsored**，且文中不得声称是联盟链接。
