# is-mind 项目公共契约（CONTRACT）

> **本文件是唯一规则真源。** 所有子台账、脚本、内容改动、部署动作都必须遵守本契约。
> 子台账**不得**自定义与本文冲突的规则；如需新增规则，先改本文，再同步子台账。
> 版本：v1.0　订立：2026-08-30　Owner：AI（项目 owner 角色）

---

## 1. 唯一真源（Single Source of Truth）

| 项 | 值 |
|---|---|
| 项目目录（唯一） | `C:/Users/Holive Hu/mind-astro`（Astro 5） |
| 内容目录 | `mind-astro/content/` |
| 模板目录 | `mind-astro/src/layouts/`、`src/components/` |
| 文档/台账目录 | `mind-astro/docs/` |
| 审计脚本 | `mind-astro/scripts/audit.py` |
| 审计报告 | `mind-astro/docs/audit-report.json` |
| 线上域名 | `https://is-mind.com` |
| 部署 | Git push → Vercel 自动构建 |

**⚠️ `C:/Users/Holive Hu/Desktop/mind/` 是旧 Hugo 项目，已废弃为工作目录**，仅作历史归档。任何新内容、新改动只在 `mind-astro` 进行。

---

## 2. FrontMatter 契约

所有文章（`content/**/index.md`）必须满足：

```yaml
---
title: "关键词靠前，50-60 字符"     # 必填；标题禁用具体年份
author: "Luna Vale"                  # 必填；必须是 C-4 中 5 个笔名之一
date: "YYYY-MM-DD"                   # 必填；真实日期
tags:                                # 必填；只用 C-3 受控词，2-4 个，全小写
  - intuition
  - carl jung
directory: "/tarot/"                 # 栏目归属，与 URL 板块一致
summary: "150-160 字符元描述"         # 必填；即 <meta description>
pin_a: "金句钩子"                     # 社媒卡用
pin_b: "第二个金句钩子"
---
```

**正文结构契约**（由上到下）：
1. H1（模板渲染）
2. **Disclaimer**（模板自动注入，H1 后第一段前 —— 不得手工重复写）
3. TL;DR（100-200 词，Storyteller 可省）
4. 正文
5. FAQ（3-5 组，吃 PAA / featured snippet）
6. 作者 bio box（模板自动渲染 —— 不得手工重复写）
7. 内链收尾（指向同簇 + 支柱）

---

## 3. 受控词表（C-3）：23 个，禁止自创

| 板块 | 受控 tag |
|---|---|
| Tarot | tarot-for-beginners · tarot-card-meanings · major-arcana · tarot-spreads · tarot-practice · love-tarot · tarot-deck-reviews |
| Psych | shadow-work · carl-jung · attachment · narcissism · gaslighting · relationship-patterns · book-insights |
| Energy | energy-healing · intuition |
| Astrology | astrology-basics · zodiac-compatibility · venus-retrograde · planetary-transits · dream-interpretation · angel-numbers |
| Reviews | psychic-site-reviews |

**规则**：每篇 2-4 个、全小写、必须来自上表。越界 = 不合规（审计器会报 `tag_out`）。

---

## 4. 作者 ↔ Persona 映射（C-4）：5 个笔名

| 笔名 | Persona | 声音 | 锁定专栏 | X |
|---|---|---|---|---|
| Luna Vale | Intuitive | 诗意、象征、身体直觉 | moon energy、chakra sensing、card symbolism、intuition practice | @trueer7 |
| Sage Mercer | Scholar | 冷静、心理学根基、讲机制 | tarot/astrology history、psychological mechanism、"why it works" | @trueer8 |
| Iris Calder | Warm Narrator | 疗愈、共情、陪伴 | shadow work (emotional)、grief、self-compassion、soothing tarot | @trueer9 |
| Wren Hollow | Storyteller | 场景叙事、神话原型 | tarot card stories、myth/archetype retellings、dream narratives | @soywhale |
| Seraphina Cole | Sharp Analyst | 锐利、戳破自欺 | relationship dynamics、self-deception、cognitive bias、gaslighting、NPD | @soyricher |

**两条红线（分配时必须遵守）**：
- **红线 1｜未来向**（占星/塔罗预测）→ 只能 Warm Narrator、Intuitive
- **红线 2｜心理/过去向**（shadow work、relationships、psychology）→ 只能 Sharp Analyst、Scholar

**⚠️ 不可违反**：笔名为原创虚构署名，**严禁盗用真实人物（尤其联盟网站占卜师）的照片与姓名**；作者 bio 不得虚构临床/学术资质。编辑政策页必须保留 AI 辅助 + 人工审校的透明说明。

---

## 5. 集群与支柱页（C-5）：9 簇 / 9 支柱

| 簇 | 支柱页 |
|---|---|
| 塔罗入门 | `/tarot/tarot-for-beginners/` |
| 大阿卡纳与原型 | `/tarot/fools-journey-complete-guide/` |
| 直觉与身体信号 | `/tarot/science-of-intuition/` |
| 阴影工作与荣格 | `/psych/shadow-work/shadow-work-guide/` |
| 关系与依恋 | `/psych/relationship/attachment-styles/` |
| 能量与脉轮 | `/energy/energy-body-101/` |
| 占星基础与周期 | `/astrology/astrology-101-sun-moon-rising/` |
| 梦境 | `/astrology/dream-meanings/` |
| 工具评测 | `/reviews/best-tarot-decks-beginners/` |

**内链契约**：每篇正文 2-4 条同簇链接 + 1 条支柱页链接；保留 "Tomorrow:" 系列预告链；**禁用** Obsidian `[[wikilink]]`，用 `[文字](/路径/)`。

---

## 6. URL 与重定向（C-6）

- slug 全小写、连字符分词（如 `dream-meanings`）。
- **任何 URL 变更必须同时加 301**，写入 `vercel.json` 的 `redirects`（`permanent: true`）。
- 现有重定向：
  - `/energy/physical-signs-gut/` → `/tarot/7-signs-intuition/`
  - `/psych/shadow-work/shadow-work-101/` → `/psych/shadow-work/shadow-work-guide/`
  - `/astrology/dreams-tell-you/` → `/astrology/dream-meanings/`
  - `/astrology/decoding-recurring-dreams/` → `/astrology/dream-meanings/`
- 目录改名用 `mv`（重命名），**不用删除**（见 C-8）。

---

## 7. 质量阈值（C-7）：验收标准

| 指标 | 阈值 | 审计字段 |
|---|---|---|
| 字数 | ≥ 1200 词（<800 为严重偏薄） | `words` |
| 内链 | 2-4 同簇 + 1 支柱 | `links` |
| TL;DR | 有（Storyteller 可省） | `has_tldr` |
| FAQ | 有 | `has_faq` |
| 署名 | 5 笔名之一 | `author` |
| tags | 2-4 个受控词 | `tags` |
| AI 禁用词 | 0 | `banned` |

**AI 禁用词清单**：delve、tapestry、crucial、profound、research suggests、in today、landscape、testament to、navigate the

---

## 8. 禁止操作（C-8）：踩过的雷，不得再犯

1. **禁止 `git rm` 删 content 子目录** —— 沙箱 safe-delete 拦截器会级联吞掉整个 `content/` 树（2026-08-24/25 事故，194 文件险些全丢）。
   - 删单文件：`rm -f "C:/绝对路径"`
   - 删目录：`mv` 移走 → `git add -A` 登记删除
   - 清构建产物 `public/`：`mv public public.old` 后重建（rmtree 会被拦截）
2. **禁止在工作区外改内容** —— 只在 `mind-astro`。
3. **禁止手改模板已自动渲染的 disclaimer / 作者 bio** —— 改模板，不改文章。
4. **大改后立即 `git commit` 做 checkpoint** —— 防拦截器/同步工具在空窗期破坏工作区；用户确认后再 `push`。
5. **禁止在文章里预填真实隐私数据**（部署后公网可访问）。

---

## 9. 审计与口径（C-9）

- **唯一审计入口**：`python scripts/audit.py`（判据写在脚本里，子台账引用脚本输出，不得各自口算）。
- 审计输出：`docs/audit-report.json`。
- 子台账的"当前状态"必须以最近一次 `audit.py` 输出为准，并注明审计日期。

---

## 10. 变更流程（C-10）

1. 改动前：确认目标文件 + 改动内容（用户明确授权后执行）。
2. 改动中：遵守 C-8 禁止操作；大改分批 + 边做边 commit checkpoint。
3. 改动后：跑 `scripts/audit.py` → 更新对应子台账 → 更新总台账状态 → 汇报。
4. 部署：用户确认 → `git push origin main` → Vercel 构建 → 核对线上。
