# L03 · Tags 受控词表

> 上级：[总台账](../总台账.md)　|　契约：[contract.md](../contract.md) C-3　|　状态：✅ 完成

## 目标
把碎片化、大小写混乱的 tags 收敛成受控词表，让 tag 页有聚类价值、Related Reading 精准。

## 治理前 → 后

| 指标 | 治理前 | 治理后 |
|---|---|---|
| tag 种类 | 42 | **23（受控）** |
| 单次使用 tag | 40（95%） | 0 |
| 大小写重复 | 3 组（Carl Jung/carl jung 等） | 0 |
| 越界 tag | — | **0**（2026-08-30 审计） |

## 已完成
- [x] 42 → 23 受控词映射表（见契约 C-3）
- [x] 全站文章 tags 批量重写（`tmp/fix_tags3.py`，从 git HEAD 原值映射，幂等）
- [x] 去重 + 每篇上限 4 个 + 统一 2 空格缩进
- [x] 旧碎片 tag 页随重爬自然失效（几乎无权重，不做 301）

## 待办
- [ ] 无（指标已达标）

## 验收口径（契约 C-9）
跑 `python scripts/audit.py` → `tag_out` 必须为 0，`tag_count` 种类 ≤ 23。

## 踩过的坑（写入契约 C-8 的由来）
- 早期用正则贪婪匹配改写 tags，导致只映射了每篇第一个 tag、并破坏 frontmatter 结尾 `---` 换行 → 已用 `git reset` 恢复 + 逐行解析脚本重做
- **教训**：批量改 frontmatter 用逐行解析（line-based），不要用多行贪婪正则；改完立即 commit checkpoint
