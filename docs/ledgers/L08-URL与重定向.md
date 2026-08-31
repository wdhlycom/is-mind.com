# L08 · URL 与重定向

> 上级：[总台账](../总台账.md)　|　契约：[contract.md](../contract.md) C-6　|　状态：✅ 完成

## 目标
规范 slug，任何 URL 变更都配 301，避免已收录页变 404 丢权重。

## 现有重定向（`vercel.json`，全部 `permanent: true`）

| 旧 URL | 新 URL | 原因 |
|---|---|---|
| `/energy/physical-signs-gut/` | `/tarot/7-signs-intuition/` | 内容合并（L02） |
| `/psych/shadow-work/shadow-work-101/` | `/psych/shadow-work/shadow-work-guide/` | 内容合并（L02） |
| `/astrology/dreams-tell-you/` | `/astrology/dream-meanings/` | 内容合并（L02） |
| `/astrology/decoding-recurring-dreams/` | `/astrology/dream-meanings/` | slug 改名 |

## 已完成
- [x] slug 规范化：`decoding-recurring-dreams` → `dream-meanings`（目录 `mv` 改名，非删除）
- [x] 内链引用同步更新（shadow-work-guide → dream-meanings）
- [x] 旧 slug 全部 cleared（审计确认 4 项）
- [x] 幽灵页（旧构建残留 `/energy/tarot-love-cards/`、嵌套重复）已随干净重建消失

## 操作铁律（契约 C-8）
- 目录改名用 **`mv`**（重命名），**不用 `git rm` / `rmtree`** —— 沙箱 safe-delete 拦截器会级联吞掉整个 `content/` 树
- 任何新的 URL 变更必须**同时**追加 301 到 `vercel.json`

## 待办
- [ ] 部署后在 GSC「网页索引」核对 4 条 301 生效、旧 URL 无 404 报错

## 参考
- `mind-astro/URL-MAPPING.md`（迁移期 URL 映射表）
