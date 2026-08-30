# is-mind 联盟链接总清单（写作速查表）

> **这是唯一的查询入口**（2026-08-30 从三份原始文档整理）。
> 原始文档 `ismind-affiliate-links-板块映射.md`、`Kasamba-links-清洗与插入指南.md`、`psychicoz-banners.csv` 已全部并入本表和 `src/config/affiliates.ts`，可以归档。
> 平台改参数时：**只改 `src/config/affiliates.ts` 一处**，然后告诉我重新生成本表。

---

## 一、怎么用（三种姿势）

### ① 文章里最省事：转化框组件（推荐）

在文章模板里加一行，按主题自动出 1-4 张平台卡（链接自动带 rel 合规标签）：

```astro
<AffiliateBox topic="tarot" />
<AffiliateBox topic="love" heading="Stuck on this with someone?" />
```

可选 topic：`tarot` · `love` · `dreams` · `astrology` · `numerology` · `career` · `healers` · `mediums` · `review`

### ② 手写 HTML / Markdown 链接（合规三件套）

```html
<a href="这里粘贴下表的链接" target="_blank" rel="sponsored nofollow noopener">锚文本</a>
```

`rel` 三件套缺一不可（sponsored 声明商业、nofollow 不传权重、noopener 安全）。

### ③ intro 静态页

链接已直接写死在 `public/reviews/*-intro.html`。改链接直接 sed 或告诉我。

---

## 二、按文章主题速查（首选 → 备选）

| 文章主题 | 首选 CTA | 备选 |
|---------|---------|------|
| 塔罗牌义 / 牌阵 | Oranum Tarot 落地页 | Psychicoz Tarot 320×250 · PG Tarot (9) · Kasamba 塔罗专家 (18) |
| 每月星座运势 | PG Horoscope (10) | PG Astrology (11) · Kasamba 占星 (104/19) |
| 本命盘 / 合盘 | PG Astrology (11) | Kasamba top-astrology (19) |
| 生命数字 / 灵数 | Kasamba Numerology (56) | — |
| 情感 / 关系 / 复合 | Oranum Love 落地页 | Keen Love (29) · Keen 2026 (99) · Kasamba Love (102) · 免费爱情 (17) |
| 梦境 / 潜意识 / 阴影 | Oranum Dreams 搜索页 | — |
| 通灵 / 与逝者连接 | Keen Mediums (30) | Kasamba Medium (88) |
| 事业 / 职场转折 | Kasamba Career (90) | — |
| 灵性疗愈 / 能量 | PG Spiritual Healers (179) | PG Psychic Talk (183) |
| 平台横评 / 对比 | 四家 Default 链（见下） | Psychicoz 通用链 |
| 任意文末通用 CTA | Oranum Signup 页 | Kasamba Psychic Reading (103) |

---

## 三、全部链接（按平台）

### Oranum（wmorajmp.com，真人视频直播）

| 用途 | 链接 |
|------|------|
| 通用首页（默认 CTA） | `https://wmorajmp.com/?pageName=home&siteId=oranum&prm[psid]=HuMaster&prm[pstool]=606_1&prm[psprogram]=revs&prm[campaign_id]=&subAffId=` |
| 注册页（强转化） | 同上，`pageName=signup` |
| 新手介绍页 | 同上，`pageName=intro&subSiteId=about&prm[topic]=Live` |
| Tarot 落地页 | 同上，`subSiteId=tarot&prm[topic]=Live` |
| Love 落地页 | 同上，`subSiteId=love&prm[topic]=Live` |
| Dreams 搜索页 | 同上，`pageName=search&prm[topic]=Dreams` |
| 随机匹配聊天 | 同上，`pageName=random` |

> 嵌入式动态 banner / 直播流 iframe 暂缓使用（第三方脚本拖慢页面），需要时从板块映射表取。

### PsychicOz（psychicoz.com，a_aid=3b186vp94x73d）

| 用途 | 链接 |
|------|------|
| 通用首页 | `https://psychicoz.com/?a_aid=3b186vp94x73d` |
| 通用读心 320×250 图 | `https://psychicoz.com/psychics/psychic-readings?a_aid=3b186vp94x73d&a_bid=2126146c` |
| Tarot 320×250 图 | `https://psychicoz.com/psychics/tarot-card-psychic-readers?a_aid=3b186vp94x73d&a_bid=c163dfbf` |
| Love 320×250 图 | `https://psychicoz.com/psychics/love-relationship-psychic-readers?a_aid=3b186vp94x73d&a_bid=5dd1df23` |
| Love 320×50 横条 | 同上，`a_bid=161570ac` |
| Career 320×50 图 | `https://psychicoz.com/psychics/career-forecasts-psychic-readers?a_aid=3b186vp94x73d&a_bid=1e499872` |
| 素材图库 | `https://affiliate.psychicoz.com/accounts/default1/b854uw/<a_bid>.jpg`（psychicoz-banners.csv 全量 30 条） |

### Kasamba（bargestech go2cloud，offer 191，文字 chat + 免费分钟）

| 用途 | 链接 |
|------|------|
| 官网默认（评测/对比） | `https://bargestech.go2cloud.org/aff_c?offer_id=191&aff_id=2559` |
| 塔罗专家列表 (18) | 同上 + `&url_id=18` |
| 塔罗 5 折促销 (50) | 同上 + `&url_id=50` |
| 占星类目 (104) | 同上 + `&url_id=104` |
| 顶级占星师 (19) | 同上 + `&url_id=19` |
| 灵数 3 免+5 折 (56) | 同上 + `&url_id=56` |
| 爱情类目 (102) | 同上 + `&url_id=102` |
| 免费爱情读心 (17) | 同上 + `&url_id=17` |
| 通灵类目 (88) | 同上 + `&url_id=88` |
| 事业预测 (90) | 同上 + `&url_id=90` |
| 综合通读 (103) | 同上 + `&url_id=103` |

### Keen（offer 209，电话+文字，爱情最强）

| 用途 | 链接 |
|------|------|
| 官网默认 | `https://bargestech.go2cloud.org/aff_c?offer_id=209&aff_id=2559` |
| 灵媒/通灵 (30) | 同上 + `&url_id=30` |
| Love 主推 (29) | 同上 + `&url_id=29` |
| Love 2026 专题 (99) | 同上 + `&url_id=99` |

### Purple Garden（offer 30，视频 App，$30 新客额度）

| 用途 | 链接 |
|------|------|
| 官网默认 | `https://bargestech.go2cloud.org/aff_c?offer_id=30&aff_id=2559` |
| 在线塔罗 (9) | 同上 + `&url_id=9` |
| 占星落地 (11) | 同上 + `&url_id=11` |
| 星座运势 (10) | 同上 + `&url_id=10` |
| 灵性疗愈师 (179) | 同上 + `&url_id=179` |
| 通用通灵 (183) | 同上 + `&url_id=183` |

### Purple Ocean（offer 33，纯文字低价）

| 用途 | 链接 |
|------|------|
| 官网默认 | `https://bargestech.go2cloud.org/aff_c?offer_id=33&aff_id=2559` |

### Gaia（⚠️ 暂无联盟账号）

| 用途 | 链接 |
|------|------|
| 官网（**暂不计佣金**） | `https://www.gaia.com/` |

---

## 四、遗留备注

1. **Gaia 无联盟账号**——intro 页与 Reviews 卡的 Gaia 链接暂为品牌链，不开联盟就始终零佣金。
2. Oranum 的 `performerName=Humaster` 与 `psid=HuMaster` 大小写不一致（原始抓取如此），追踪异常先查这里。
3. Psychicoz 的 `a_bid=618f5aa3` 名叫 "Top Rated" 实际落地 love 页——按 Love 使用。
4. Oranum 的动态 banner / iframe / 主播 API 素材暂未入配置（拖速），要用从板块映射表取。
5. 追踪异常先查 bargestech 后台对应 url_id 是否仍生效。
