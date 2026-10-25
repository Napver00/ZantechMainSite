import type { Achievement } from './achievements';

export type Tier = 'gold' | 'silver' | 'podium';
export type Scope = 'International' | 'National';

// Where an international result happened, read from the description.
const COUNTRIES: [RegExp, string][] = [
    [/malaysia/i, 'Malaysia'],
    [/singapore|sauvc/i, 'Singapore'],
    [/usa|virginia|cansat/i, 'USA'],
    [/india|new delhi|technoxian/i, 'India'],
];

export const tierOf = (a: Achievement): Tier =>
    /gold|champion|1st/i.test(a.badge) ? 'gold' : /silver|2nd/i.test(a.badge) ? 'silver' : 'podium';

export const countryOf = (a: Achievement): string | null =>
    COUNTRIES.find(([re]) => re.test(a.description))?.[1] ?? null;

// "World Robot Olympiad Bangladesh ... National Round" is a national event, so the word
// "world" alone doesn't count — only a foreign venue or a global ranking does.
export const scopeOf = (a: Achievement): Scope =>
    countryOf(a) || /globally|international/i.test(`${a.badge} ${a.description}`) ? 'International' : 'National';

export const yearOf = (a: Achievement): string | null => (a.description.match(/\b(20\d{2})\b/) || [])[1] ?? null;

export const TIER_STYLE: Record<Tier, { chip: string; ring: string }> = {
    gold: { chip: 'bg-amber-400 text-amber-950', ring: 'ring-amber-400/40' },
    silver: { chip: 'bg-slate-300 text-slate-900', ring: 'ring-slate-300/40' },
    podium: { chip: 'bg-zan-cyan text-zan-dark', ring: 'ring-zan-cyan/40' },
};
