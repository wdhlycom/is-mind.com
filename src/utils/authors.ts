/**
 * authors.ts — single source of truth for the is-mind.com editorial team.
 *
 * Bios here mirror the "Author Bio Hook" in each is-mind-voice-* skill, so the
 * byline bio box and the skill stay in lockstep. Edit a bio once and every
 * article that carries that author updates.
 *
 * is-mind-editorial-core requires: every article ends with a 50-80 word author
 * bio that includes one real, verifiable association, and the byline / URL /
 * bio box names must match exactly.
 */
export interface Author {
  /** Exact byline string — must match the frontmatter `author:` value. */
  name: string;
  /** Persona codename from the voice skill. */
  persona: string;
  /** Column this writer owns, for display in the bio box. */
  column: string;
  /** 50-80 word bio, mirrors the voice skill's Author Bio Hook. */
  bio: string;
  /** Public avatar in /public/avatars (spaces URL-encoded). */
  avatar: string;
  /** X profile URL. */
  x: string;
  /** X handle for display. */
  xHandle: string;
  /** Author page URL. Founder has a dedicated bio page; others link to the team page. */
  url: string;
}

export const AUTHORS: Record<string, Author> = {
  'Luna Vale': {
    name: 'Luna Vale',
    persona: 'The Intuitive',
    column: 'Dreams, energy & symbol',
    bio: "I read dreams the way other people read weather — by the feel of the air before the rain. I don't analyze symbols so much as listen to what they're already saying. If your body has been trying to tell you something, I'm the one who takes notes.",
    avatar: '/avatars/Luna%20Vale.jpg',
    x: 'https://instagram.com/ismindLunaVale',
    xHandle: '@ismindLunaVale',
    url: '/about/editorial-team/',
  },
  'Sage Mercer': {
    name: 'Sage Mercer',
    persona: 'The Scholar',
    column: 'Psychology & mechanism',
    bio: "I've studied Jungian and Adlerian frameworks since 2018, with a side interest in the history of divination. I don't tell you the cards are magic; I tell you why they work on a mind that's paying attention. If that sounds unromantic, I'm fine with it.",
    avatar: '/avatars/Sage%20Mercer.jpg',
    x: 'https://instagram.com/ismindSageMercer',
    xHandle: '@ismindSageMercer',
    url: '/about/editorial-team/',
  },
  'Iris Calder': {
    name: 'Iris Calder',
    persona: 'The Warm Narrator',
    column: 'Shadow work & self-compassion',
    bio: "I've spent years sitting with my own shadows — grief, burnout, the quiet mornings after a hard night. I don't write from textbooks; I write from the chair where I've held space for myself and others. Here to remind you: you're not broken, just human.",
    avatar: '/avatars/Iris%20Calder.jpg',
    x: 'https://instagram.com/ismindiriscalder',
    xHandle: '@ismindiriscalder',
    url: '/about/editorial-team/',
  },
  'Wren Hollow': {
    name: 'Wren Hollow',
    persona: 'The Storyteller',
    column: 'Card stories, myth & dreams',
    bio: "I collect moments — the 2 a.m. ceiling-stares, the unmade beds, the conversations that never got finished. I write tarot and myth the way I remember them: as stories with people in them. Every card has a face if you look long enough.",
    avatar: '/avatars/Wren%20Hollow.jpg',
    x: 'https://instagram.com/ismindwrenhollow',
    xHandle: '@ismindwrenhollow',
    url: '/about/editorial-team/',
  },
  'Seraphina Cole': {
    name: 'Seraphina Cole',
    persona: 'The Sharp Analyst',
    column: 'Relationships, bias & reviews',
    bio: "I've spent years deconstructing gaslighting and attachment patterns in real relationships — mine included. I don't soften the truth to protect your feelings, because the truth is the only thing that's ever actually helped. If you want comfort, that's not my seat.",
    avatar: '/avatars/Seraphina%20Cole.jpg',
    x: 'https://instagram.com/ismindSeraphinaCole',
    xHandle: '@ismindSeraphinaCole',
    url: '/about/editorial-team/',
  },
  'Holive Hu': {
    name: 'Holive Hu',
    persona: 'Founder & Editor',
    column: 'Editorial direction',
    bio: "Holive founded is-mind.com to explore where modern psychology and ancient symbolic systems meet. Every article here is researched with AI assistance, then reviewed and edited by him before publication. He is not a licensed therapist, and nothing on this site is medical or clinical advice.",
    avatar: '/avatars/Holive%20Hu.jpg',
    x: '',
    xHandle: '',
    url: '/about/holive-hu/',
  },
};

/** Look up an author by the frontmatter byline. Falls back to null for unknown names. */
export function getAuthor(name?: string): Author | null {
  if (!name) return null;
  return AUTHORS[name.trim()] ?? null;
}
