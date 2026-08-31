# L09 · Astro 迁移

> 上级：[总台账](../总台账.md)　|　契约：[contract.md](../contract.md) C-1　|　状态：✅ 完成

## 目标
从 Hugo 迁到 Astro 5，为后续更丰富的互动（quiz / 计算器 / 岛屿式组件）留出空间；同时保证 SEO 不回退。

## 已完成
- [x] 内容全量迁移至 `mind-astro/content`（43 篇文章 + 政策页 + 3 个互动工具）
- [x] 构建通过（69 页）
- [x] 唯一真源切换：`C:/Users/Holive Hu/mind-astro`（`Desktop/mind` 降为历史归档）
- [x] 之前所有内容改动（加厚 4 篇、tags、支柱页、E-E-A-T 页面）已随迁移进入新站 —— 2026-08-30 审计确认
- [x] 动效组件：`public/js/flowfield.js` + `AtmosFlow.astro` 板块页漂移流层

## 迁移期注意（写入契约）
- `git rm` 删目录会触发 safe-delete 吞树 → 契约 C-8 禁止
- 内容真源唯一：不得在 `Desktop/mind` 再改内容，避免双写冲突

## 待办
- [ ] Astro 的潜力尚未释放：当前互动工具仍是 daily-oracle / yes-no-tarot / sign-compatibility 三个；可后续加 quiz / 计算器（**每次只加 1 个**，避免过度扩张）

## 风险
- 用户曾询问是否迁移 → 当时建议"作为独立项目推进"；实际已于 2026-08-29 完成迁移，现以 Astro 为真源
