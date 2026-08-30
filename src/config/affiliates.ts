/**
 * Single source of truth for every affiliate link on the site.
 *
 * Rules:
 *  - Every rendered affiliate link MUST carry AFFILIATE_REL
 *    (rel="sponsored nofollow noopener") so Google treats it as a compliant
 *    paid placement and neither page leaks rank.
 *  - Never paste raw URLs into components or static pages; import from here.
 *    If a platform rotates parameters, this is the one file to touch.
 *
 * Sources (user-maintained, 2026-08-30):
 *  - ismind-affiliate-links-板块映射.md   (Oranum / Psychicoz / banners)
 *  - Kasamba-links-清洗与插入指南.md      (bargestech matrix, 22 entries)
 *  - psychicoz-banners.csv               (Psychicoz banner inventory)
 */

/** rel attribute every monetised outbound link must carry. */
export const AFFILIATE_REL = 'sponsored nofollow noopener';

export const AFFILIATES = {
  oranum: {
    name: 'Oranum',
    blurb: 'Live video readings with real mediums — you see who you talk to.',
    home: 'https://wmorajmp.com/?pageName=home&siteId=oranum&prm[psid]=HuMaster&prm[pstool]=606_1&prm[psprogram]=revs&prm[campaign_id]=&subAffId=',
    signup:
      'https://wmorajmp.com/?pageName=signup&siteId=oranum&prm[psid]=HuMaster&prm[pstool]=606_1&prm[psprogram]=revs&prm[campaign_id]=&subAffId=',
    intro:
      'https://wmorajmp.com/?pageName=intro&siteId=oranum&subSiteId=about&prm[psid]=HuMaster&prm[pstool]=606_1&prm[topic]=Live&prm[psprogram]=revs&prm[campaign_id]=&subAffId=',
    tarot:
      'https://wmorajmp.com/?pageName=home&siteId=oranum&subSiteId=tarot&prm[psid]=HuMaster&prm[pstool]=606_1&prm[topic]=Live&prm[psprogram]=revs&prm[campaign_id]=&subAffId=',
    love: 'https://wmorajmp.com/?pageName=home&siteId=oranum&subSiteId=love&prm[psid]=HuMaster&prm[pstool]=606_1&prm[topic]=Live&prm[psprogram]=revs&prm[campaign_id]=&subAffId=',
    dreams:
      'https://wmorajmp.com/?pageName=search&siteId=oranum&prm[psid]=HuMaster&prm[pstool]=606_1&prm[topic]=Dreams&prm[psprogram]=revs&prm[campaign_id]=&subAffId=',
    random:
      'https://wmorajmp.com/?pageName=random&siteId=oranum&prm[psid]=HuMaster&prm[pstool]=606_1&prm[psprogram]=revs&prm[campaign_id]=&subAffId=',
  },

  psychicoz: {
    name: 'PsychicOz',
    blurb: 'Vetted psychic readers by speciality — tarot, love, career.',
    home: 'https://psychicoz.com/?a_aid=3b186vp94x73d',
    general:
      'https://psychicoz.com/psychics/psychic-readings?a_aid=3b186vp94x73d&a_bid=2126146c',
    tarot: 'https://psychicoz.com/psychics/tarot-card-psychic-readers?a_aid=3b186vp94x73d&a_bid=c163dfbf',
    love: 'https://psychicoz.com/psychics/love-relationship-psychic-readers?a_aid=3b186vp94x73d&a_bid=5dd1df23',
    loveSmall:
      'https://psychicoz.com/psychics/love-relationship-psychic-readers?a_aid=3b186vp94x73d&a_bid=161570ac',
    career:
      'https://psychicoz.com/psychics/career-forecasts-psychic-readers?a_aid=3b186vp94x73d&a_bid=1e499872',
  },

  kasamba: {
    name: 'Kasamba',
    blurb: 'Text-chat readings since 1999 — three free minutes for new users.',
    home: 'https://bargestech.go2cloud.org/aff_c?offer_id=191&aff_id=2559',
    tarotExperts: 'https://bargestech.go2cloud.org/aff_c?offer_id=191&aff_id=2559&url_id=18',
    tarotHalfOff: 'https://bargestech.go2cloud.org/aff_c?offer_id=191&aff_id=2559&url_id=50',
    astrology: 'https://bargestech.go2cloud.org/aff_c?offer_id=191&aff_id=2559&url_id=104',
    astrologyTop: 'https://bargestech.go2cloud.org/aff_c?offer_id=191&aff_id=2559&url_id=19',
    numerology: 'https://bargestech.go2cloud.org/aff_c?offer_id=191&aff_id=2559&url_id=56',
    love: 'https://bargestech.go2cloud.org/aff_c?offer_id=191&aff_id=2559&url_id=102',
    loveFree: 'https://bargestech.go2cloud.org/aff_c?offer_id=191&aff_id=2559&url_id=17',
    medium: 'https://bargestech.go2cloud.org/aff_c?offer_id=191&aff_id=2559&url_id=88',
    career: 'https://bargestech.go2cloud.org/aff_c?offer_id=191&aff_id=2559&url_id=90',
    psychic: 'https://bargestech.go2cloud.org/aff_c?offer_id=191&aff_id=2559&url_id=103',
  },

  keen: {
    name: 'Keen',
    blurb: 'Phone + chat readings since 1999 — strongest on love and mediums.',
    home: 'https://bargestech.go2cloud.org/aff_c?offer_id=209&aff_id=2559',
    mediums: 'https://bargestech.go2cloud.org/aff_c?offer_id=209&aff_id=2559&url_id=30',
    love: 'https://bargestech.go2cloud.org/aff_c?offer_id=209&aff_id=2559&url_id=29',
    love2026: 'https://bargestech.go2cloud.org/aff_c?offer_id=209&aff_id=2559&url_id=99',
  },

  purpleGarden: {
    name: 'Purple Garden',
    blurb: 'App-first readings over video, voice or chat — $30 welcome credit.',
    home: 'https://bargestech.go2cloud.org/aff_c?offer_id=30&aff_id=2559',
    tarot: 'https://bargestech.go2cloud.org/aff_c?offer_id=30&aff_id=2559&url_id=9',
    astrology: 'https://bargestech.go2cloud.org/aff_c?offer_id=30&aff_id=2559&url_id=11',
    horoscope: 'https://bargestech.go2cloud.org/aff_c?offer_id=30&aff_id=2559&url_id=10',
    healers: 'https://bargestech.go2cloud.org/aff_c?offer_id=30&aff_id=2559&url_id=179',
    talk: 'https://bargestech.go2cloud.org/aff_c?offer_id=30&aff_id=2559&url_id=183',
  },

  purpleOcean: {
    name: 'Purple Ocean',
    blurb: 'Lightweight text readings in an app — the lowest-cost entry point.',
    home: 'https://bargestech.go2cloud.org/aff_c?offer_id=33&aff_id=2559',
  },

  gaia: {
    name: 'Gaia',
    blurb: 'Conscious media & yoga streaming — 8,000+ ad-free titles.',
    // NOTE: no affiliate account yet; brand link until one exists.
    home: 'https://www.gaia.com/',
  },
} as const;
