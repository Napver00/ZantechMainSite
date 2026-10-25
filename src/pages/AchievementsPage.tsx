import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, ChevronLeft, ChevronRight, Globe2, GraduationCap, Medal, MapPin, Rocket, Trophy, X } from 'lucide-react';
import { achievements, type Achievement } from '../data/achievements';
import { countryOf, scopeOf, tierOf, TIER_STYLE, yearOf } from '../data/achievementMeta';
import AchievementCard from '../components/AchievementCard';

type Filter = 'All' | 'International' | 'National' | 'Gold & 1st';
const FILTERS: Filter[] = ['All', 'International', 'National', 'Gold & 1st'];

const matches = (a: Achievement, f: Filter) =>
    f === 'All' ? true : f === 'Gold & 1st' ? tierOf(a) === 'gold' : scopeOf(a) === f;

/** Hall of fame: headline numbers, a featured win, filterable award cards and a story viewer. */
const AchievementsPage = () => {
    const [filter, setFilter] = useState<Filter>('All');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => { document.title = 'Achievements | ZAN Tech'; }, []);

    const list = useMemo(() => achievements.filter((a) => matches(a, filter)), [filter]);

    const stats = useMemo(() => {
        const countries = new Set(achievements.map(countryOf).filter(Boolean));
        return [
            { value: achievements.length, label: 'Awards & top finishes', icon: Trophy },
            { value: achievements.filter((a) => tierOf(a) === 'gold').length, label: 'Gold, champion & 1st place', icon: Medal },
            { value: achievements.filter((a) => scopeOf(a) === 'International').length, label: 'International results', icon: Globe2 },
            { value: countries.size + 1, label: 'Countries competed in', icon: MapPin }, // + Bangladesh
        ];
    }, []);

    // The headline: the first international gold, else the first award.
    const featured = useMemo(
        () => achievements.find((a) => scopeOf(a) === 'International' && tierOf(a) === 'gold') || achievements[0],
        []
    );

    const selected = openIndex !== null ? list[openIndex] : null;

    useEffect(() => {
        if (!selected) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpenIndex(null);
            if (e.key === 'ArrowRight') setOpenIndex((i) => (i === null ? i : (i + 1) % list.length));
            if (e.key === 'ArrowLeft') setOpenIndex((i) => (i === null ? i : (i - 1 + list.length) % list.length));
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [selected, list.length]);

    const openItem = (item: Achievement) => {
        const i = list.indexOf(item);
        if (i >= 0) setOpenIndex(i);
        else {
            setFilter('All');
            setOpenIndex(achievements.indexOf(item));
        }
    };

    const step = (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + list.length) % list.length));

    return (
        <div className="min-h-screen bg-zan-dark">
            {/* Header */}
            <section className="relative overflow-hidden border-b border-white/10 bg-surface-dark pt-24 md:pt-28">
                <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" />
                <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-amber-400/10 blur-[110px]" />
                <div className="relative mx-auto max-w-6xl px-4 pb-12 md:pb-16">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zan-cyan">Hall of fame</p>
                    <h1 className="mt-3 max-w-3xl text-4xl md:text-5xl font-bold leading-[1.1] text-white font-heading">
                        Our students <span className="text-amber-400">win</span> — at home and on the world stage.
                    </h1>
                    <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-gray-400">
                        Robot olympiads, science fairs and international STEM competitions — every result here was earned by ZAN Tech students, mentored teams and our own engineers.
                    </p>
                    <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {stats.map((s) => (
                            <div key={s.label} className="rounded-2xl border border-white/10 bg-zan-dark/60 p-5 backdrop-blur-sm">
                                <s.icon className="h-5 w-5 text-amber-400" />
                                <p className="mt-3 text-3xl font-bold text-white font-heading">{s.value}</p>
                                <p className="mt-1 text-sm text-gray-400">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured win */}
            {featured && (
                <section className="mx-auto max-w-6xl px-4 pt-12 md:pt-16">
                    <button
                        type="button"
                        onClick={() => openItem(featured)}
                        className={`group grid w-full overflow-hidden rounded-3xl border border-white/10 bg-surface-dark text-left ring-1 ${TIER_STYLE[tierOf(featured)].ring} transition-shadow hover:shadow-2xl md:grid-cols-[1.1fr_0.9fr]`}
                    >
                        {/* Photo fills the text column's height (some award photos are tall portraits) */}
                        <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[320px]">
                            <img src={featured.image} alt={featured.team} className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="flex flex-col justify-center p-6 md:p-10">
                            <p className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-400">
                                <Award className="h-4 w-4" /> Featured win
                            </p>
                            <span className={`mt-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${TIER_STYLE[tierOf(featured)].chip}`}>
                                <Trophy className="h-3.5 w-3.5" /> {featured.badge}
                                {countryOf(featured) && <span className="opacity-75">· {countryOf(featured)}</span>}
                            </span>
                            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white font-heading">{featured.team}</h2>
                            <p className="mt-3 leading-relaxed text-gray-400">{featured.description}</p>
                            <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-zan-cyan">
                                Read the story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </span>
                        </div>
                    </button>
                </section>
            )}

            {/* Filters + grid */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold text-white font-heading">All achievements</h2>
                    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter achievements">
                        {FILTERS.map((f) => {
                            const count = achievements.filter((a) => matches(a, f)).length;
                            return (
                                <button
                                    key={f}
                                    role="tab"
                                    aria-selected={filter === f}
                                    onClick={() => setFilter(f)}
                                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                                        filter === f
                                            ? 'border-zan-cyan bg-zan-cyan text-zan-dark'
                                            : 'border-white/10 bg-surface-dark text-gray-300 hover:border-zan-cyan/50 hover:text-zan-cyan'
                                    }`}
                                >
                                    {f}
                                    <span className={`rounded-full px-1.5 text-xs ${filter === f ? 'bg-zan-dark/15' : 'bg-white/10'}`}>{count}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((item, i) => (
                        <AchievementCard key={item.team + item.badge} item={item} onClick={() => setOpenIndex(i)} />
                    ))}
                </div>
            </section>

            {/* Call to action */}
            <section className="border-t border-white/10 bg-surface-dark">
                <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 md:flex-row md:items-center">
                    <div>
                        <p className="text-2xl font-bold text-white font-heading">Want your students on this page next?</p>
                        <p className="mt-2 max-w-xl text-gray-400">Our courses and bootcamps prepare teams for WRO, science fairs and international competitions — with kits, mentors and practice rounds.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link to="/courses" className="inline-flex h-11 items-center gap-2 rounded-lg bg-zan-cyan px-5 text-sm font-bold text-zan-dark transition-colors hover:bg-white">
                            <GraduationCap className="h-4 w-4" /> View courses
                        </Link>
                        <Link to="/bootcamps" className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 px-5 text-sm font-bold text-white transition-colors hover:border-zan-cyan/50 hover:text-zan-cyan">
                            <Rocket className="h-4 w-4" /> Bootcamps
                        </Link>
                    </div>
                </div>
            </section>

            {/* Story viewer */}
            {selected && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={selected.team}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    onClick={() => setOpenIndex(null)}
                >
                    <div
                        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-surface-dark shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={() => setOpenIndex(null)} aria-label="Close" className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80">
                            <X className="h-5 w-5" />
                        </button>
                        <div className="max-h-[80vh] overflow-y-auto">
                            <img src={selected.image} alt={selected.team} className="max-h-[50vh] w-full bg-black object-contain" />
                            <div className="p-6 md:p-8">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${TIER_STYLE[tierOf(selected)].chip}`}>
                                        <Trophy className="h-3.5 w-3.5" /> {selected.badge}
                                    </span>
                                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-gray-300">
                                        {scopeOf(selected)}{countryOf(selected) ? ` · ${countryOf(selected)}` : ''}
                                    </span>
                                    {yearOf(selected) && <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-gray-300">{yearOf(selected)}</span>}
                                </div>
                                <h3 className="mt-4 text-2xl md:text-3xl font-bold text-white font-heading">{selected.team}</h3>
                                <p className="mt-3 leading-relaxed text-gray-300">{selected.description}</p>
                            </div>
                        </div>
                        {list.length > 1 && (
                            <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
                                <button onClick={() => step(-1)} className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-zan-cyan">
                                    <ChevronLeft className="h-4 w-4" /> Previous
                                </button>
                                <span className="text-xs text-gray-500">{(openIndex ?? 0) + 1} / {list.length}</span>
                                <button onClick={() => step(1)} className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-zan-cyan">
                                    Next <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AchievementsPage;
