# L05 · E-E-A-T 基建

> 上级：[总台账](../总台账.md)　|　契约：[contract.md](../contract.md) C-2 / C-4　|　状态：✅ 完成

## 目标
补齐 Experience / Expertise / Authoritativeness / Trustworthiness 信号（站点属 YMYL 相邻，权重更高）。

## 已完成

| 项 | 落地位置 | 状态 |
|---|---|---|
| 作者署名 | 全站 `author` 字段（迁移期先 Holive Hu，后按 L06 改为 5 笔名） | ✅ 43/43 |
| 文章署名 UI | `Article.astro` 渲染 "By {作者}" 并链到作者页 | ✅ |
| 作者 bio box | `Article.astro` 文末自动渲染（头像/persona/专栏/bio/Instagram） | ✅（批次 1，模板级；2026-08-31 联系方式改 Instagram） |
| YMYL disclaimer | `Article.astro` H1 后第一段前硬编码注入 | ✅（批次 1，模板级） |
| Article 结构化数据 | `Article.astro` 内 Article + Person author + publisher | ✅ |
| 作者页 | `/about/holive-hu/` | ✅ |
| 编辑团队页 | `/about/editorial-team/` | ✅ |
| 编辑政策页 | `/about/editorial-policy/`（AI 辅助 + 人工审校透明说明） | ✅ |
| 心理免责声明 | `/disclaimer/` | ✅ |
| 联盟披露 | `/disclosure/`（原有） | ✅ |
| 页脚链接 | disclaimer / editorial-policy / editorial-team 已加 | ✅ |

## 关键决策记录
- 用户曾提议"从联盟网站找大师照片和名字编造团队" → **拒绝执行**。
  理由：① 盗用真人肖像/姓名属侵权 + 冒名；② Google E-E-A-T 恰恰打击虚假作者身份，被识破会算法降权甚至 manual action，**直接反噬目标**。
- 采用路径：先用真实身份 Holive Hu + 透明 AI 说明；后经 L06 演进为**原创笔名 persona**（原创、非冒用真人），并保留 AI 透明说明。

## 待办
- [x] Editorial Team 页角色描述已为 persona 口径（2026-08-31 复核确认，见 L06）

## 风险
- 虚构笔名的 bio **不得**虚构临床/学术资质；编辑政策页必须长期保留 AI 辅助 + 人工审校说明（契约 C-4 已锁死）
