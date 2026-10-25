import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, ArrowUpRight, BookOpen, Check, Cpu, FileText, Flag, Globe2, GraduationCap, Heart, Medal,
    School, ShieldCheck, Sparkles, Trophy, Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { achievements } from '../data/achievements';
import { scopeOf, tierOf } from '../data/achievementMeta';
import AchievementCard from '../components/AchievementCard';

const UDDIPON_URL = 'https://projectuddipon.zantechbd.com/';
const IMPACT_REPORT_URL = 'https://projectuddipon.zantechbd.com/portfolio.html';

interface Workshop { id: number; title: string; slug: string; thumbnail?: string | null; created_at?: string }

const JOURNEY: { icon: LucideIcon; step: string; title: string; text: string; link: { to: string; label: string } }[] = [
    { icon: Sparkles, step: 'Spark', title: 'Free workshops', text: 'Project Uddipon puts a working robot in students’ hands for the first time, free of charge.', link: { to: '/workshops', label: 'See workshops' } },
    { icon: BookOpen, step: 'Learn', title: 'Courses & bootcamps', text: 'Curious students continue with structured robotics, coding, IoT and AI tracks.', link: { to: '/courses', label: 'Browse courses' } },
    { icon: Cpu, step: 'Build', title: 'Kits & R&D', text: 'Affordable local kits and real R&D projects turn skills into working products.', link: { to: '/projects', label: 'View projects' } },
    { icon: Trophy, step: 'Compete', title: 'Global stage', text: 'Our teams carry the Bangladesh flag to national and international competitions.', link: { to: '/achievements', label: 'Our awards' } },
];

const INSTITUTIONS = [
    'Feni Govt. College', 'Sharishadi High School', "Sonagazi Girls' Pilot High School", 'St. Joseph International School',
    'Sreemangal Govt. College', 'Sunshine High School', 'Adamjee Cantonment Public School', 'Scholastica',
    'IUBAT', 'IEEE IUB', 'UAP EEE Project Club',
];

// The backend stores some en dashes as U+FFFD; show them properly.
const cleanTitle = (t: string) => t.replace(/�/g, '–');

const ImpactPage = () => {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [loadingWorkshops, setLoadingWorkshops] = useState(true);

    useEffect(() => {
        document.title = 'Impact | ZAN Tech';
        fetch(`${API_BASE_URL}/api/posts/published?category=workshop&limit=6`)
            .then((r) => r.json())
            .then((res) => setWorkshops(Array.isArray(res?.data) ? res.data : []))
            .catch(() => setWorkshops([]))
            .finally(() => setLoadingWorkshops(false));
    }, []);

    const awards = useMemo(() => {
        const intl = achievements.filter((a) => scopeOf(a) === 'International');
        return {
            total: achievements.length,
            international: intl.length,
            featured: intl.filter((a) => tierOf(a) === 'gold').concat(intl.filter((a) => tierOf(a) !== 'gold')).slice(0, 3),
        };
    }, []);

    const stats = [
        { value: '5,000+', label: 'Students reached', note: 'Schools, colleges & universities', icon: GraduationCap },
        { value: '30–50%', label: 'Female participation', note: 'In our Girls-in-Tech sessions', icon: Heart },
        { value: '15+', label: 'R&D projects', note: 'Built and tested in Bangladesh', icon: Cpu },
        { value: `${awards.total}`, label: 'Competition awards', note: `${awards.international} of them international`, icon: Medal },
    ];

    return (
        <div className="min-h-screen bg-zan-dark">
            {/* Hero */}
            <header className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20">
                <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.07]" />
                <div className="pointer-events-none absolute -top-40 left-[-10%] h-[480px] w-[480px] rounded-full bg-zan-cyan/10 blur-[120px]" />
                <div className="pointer-events-none absolute top-20 right-[-10%] h-[380px] w-[380px] rounded-full bg-zan-red/10 blur-[120px]" />
                <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-zan-cyan">Social impact</p>
                    <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white font-heading md:text-6xl">
                        Measuring success in <span className="text-zan-cyan">minds ignited</span>, not kits sold
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
                        From city classrooms to rural colleges, ZAN Tech is building the foundation for technological self-reliance in Bangladesh, one student,
                        one project and one breakthrough at a time.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a href={IMPACT_REPORT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-zan-cyan px-6 py-3.5 text-sm font-bold text-zan-dark transition-opacity hover:opacity-90">
                            <FileText className="h-4 w-4" /> Read the Uddipon impact report
                        </a>
                        <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-zan-cyan/40">
                            Host a workshop <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
                        {stats.map(({ value, label, note, icon: Icon }) => (
                            <div key={label} className="rounded-2xl border border-white/10 bg-surface-dark p-5 md:p-6">
                                <Icon className="h-5 w-5 text-zan-cyan" />
                                <p className="mt-4 text-3xl font-bold text-white font-heading md:text-4xl">{value}</p>
                                <p className="mt-1 text-sm font-semibold text-gray-300">{label}</p>
                                <p className="mt-0.5 text-xs text-gray-500">{note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Journey */}
            <section className="border-y border-white/10 bg-surface-dark py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-zan-cyan">How change happens</p>
                    <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white font-heading md:text-4xl">From a first robot to the world stage</h2>
                    <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {JOURNEY.map(({ icon: Icon, step, title, text, link }, i) => (
                            <li key={step} className="relative flex flex-col rounded-2xl border border-white/10 bg-zan-dark p-6">
                                <div className="flex items-center justify-between">
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zan-cyan/10 text-zan-cyan"><Icon className="h-5 w-5" /></span>
                                    <span className="font-mono text-xs text-gray-500">0{i + 1} · {step}</span>
                                </div>
                                <h3 className="mt-5 text-lg font-bold text-white font-heading">{title}</h3>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">{text}</p>
                                <Link to={link.to} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-zan-cyan hover:underline">
                                    {link.label} <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Project Uddipon */}
            <section className="py-16 md:py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="grid overflow-hidden rounded-3xl border border-zan-red/20 bg-surface-dark lg:grid-cols-[1.1fr_1fr]">
                        <div className="p-6 sm:p-10">
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zan-red">Flagship initiative</p>
                            <h2 className="mt-3 text-3xl font-bold text-white font-heading md:text-4xl">Project Uddipon <span className="text-gray-500">· উদ্দীপন</span></h2>
                            <p className="mt-4 leading-relaxed text-gray-400">
                                “Uddipon” means inspiration. Our free workshops travel across Bangladesh, especially to underserved and rural areas where access to
                                technology is limited, so that no talented learner is left behind.
                            </p>
                            <ul className="mt-6 space-y-3">
                                {[
                                    'Free, hands-on robotics & coding workshops',
                                    '150+ students in a typical session',
                                    'Dedicated Girls-in-Tech sessions',
                                    'Support to set up school STEM clubs and train teachers',
                                ].map((t) => (
                                    <li key={t} className="flex gap-3 text-gray-300">
                                        <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-zan-red/15 text-zan-red"><Check className="h-3.5 w-3.5" /></span>
                                        {t}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a href={UDDIPON_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-zan-red px-5 py-3 text-sm font-bold text-[#fff] transition-opacity hover:opacity-90">
                                    Visit Project Uddipon <ArrowUpRight className="h-4 w-4" />
                                </a>
                                <a href={IMPACT_REPORT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-zan-red/40">
                                    <FileText className="h-4 w-4" /> Impact report
                                </a>
                            </div>
                        </div>
                        <div className="border-t border-white/10 bg-zan-dark/60 p-6 sm:p-10 lg:border-l lg:border-t-0">
                            <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                <School className="h-4 w-4 text-zan-cyan" /> Where we have taught
                            </div>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {INSTITUTIONS.map((n) => (
                                    <span key={n} className="rounded-full border border-white/10 bg-surface-dark px-3 py-1.5 text-xs font-medium text-gray-300">{n}</span>
                                ))}
                                <span className="rounded-full border border-dashed border-white/15 px-3 py-1.5 text-xs font-medium text-gray-500">and many more</span>
                            </div>
                            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                                {['Schools', 'Colleges', 'Universities'].map((t) => (
                                    <div key={t} className="rounded-xl border border-white/10 bg-surface-dark px-2 py-3 text-xs font-semibold text-gray-300">
                                        <Check className="mx-auto mb-1 h-4 w-4 text-zan-cyan" /> {t}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent workshops */}
            <section className="border-y border-white/10 bg-surface-dark py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zan-cyan">On the ground</p>
                            <h2 className="mt-3 text-3xl font-bold text-white font-heading md:text-4xl">Recent workshops & bootcamps</h2>
                        </div>
                        <Link to="/workshops" className="inline-flex items-center gap-1.5 font-semibold text-zan-cyan hover:underline">All workshops <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {loadingWorkshops
                            ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-72 animate-pulse rounded-2xl bg-white/5" />)
                            : workshops.map((w) => (
                                <Link key={w.id} to={`/workshop/${w.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zan-dark transition-all hover:-translate-y-1 hover:border-zan-cyan/40">
                                    <div className="aspect-video overflow-hidden bg-white/5">
                                        {w.thumbnail && <img src={w.thumbnail} alt={cleanTitle(w.title)} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                                    </div>
                                    <div className="flex flex-1 flex-col p-5">
                                        {w.created_at && (
                                            <p className="text-xs font-medium text-gray-500">
                                                {new Date(w.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                                            </p>
                                        )}
                                        <p className="mt-1 line-clamp-2 font-bold leading-snug text-white group-hover:text-zan-cyan">{cleanTitle(w.title)}</p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                    {!loadingWorkshops && workshops.length === 0 && <p className="mt-4 text-gray-400">Workshop stories will appear here soon.</p>}
                </div>
            </section>

            {/* Ecosystem */}
            <section className="py-16 md:py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-zan-cyan">A stronger ecosystem</p>
                    <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white font-heading md:text-4xl">Two gaps we are closing</h2>
                    <div className="mt-10 grid gap-5 md:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-surface-dark p-6 md:p-8">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500"><Users className="h-6 w-6" /></span>
                            <h3 className="mt-5 text-xl font-bold text-white font-heading">Girls in technology</h3>
                            <p className="mt-3 leading-relaxed text-gray-400">
                                Dedicated sessions inspire young women to enter STEM. With 30–50% female participation, we are actively closing the gender gap in
                                Bangladesh’s tech landscape.
                            </p>
                            <div className="mt-6">
                                <div className="flex justify-between text-xs font-semibold text-gray-400"><span>Female participation</span><span>up to 50%</span></div>
                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                                    <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-pink-500 to-zan-red" />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-surface-dark p-6 md:p-8">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zan-cyan/10 text-zan-cyan"><ShieldCheck className="h-6 w-6" /></span>
                            <h3 className="mt-5 text-xl font-bold text-white font-heading">National self-reliance</h3>
                            <p className="mt-3 leading-relaxed text-gray-400">
                                Affordable local kits and R&D consulting reduce our dependence on imports and help local innovators build solutions “Made in
                                Bangladesh” for the world.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {['BILI Robot', 'Autonomous Submarine', 'CanSat', 'IoT Salinity Detection', 'Attendance System'].map((t) => (
                                    <span key={t} className="rounded-md bg-zan-cyan/10 px-2 py-1 text-xs font-semibold text-zan-cyan">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recognition */}
            <section className="border-y border-white/10 bg-surface-dark py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zan-cyan">Recognition</p>
                            <h2 className="mt-3 text-3xl font-bold text-white font-heading md:text-4xl">Our students on the world stage</h2>
                            <p className="mt-3 flex items-center gap-2 text-gray-400">
                                <Globe2 className="h-4 w-4 text-zan-cyan" /> {awards.total} awards, {awards.international} won abroad
                            </p>
                        </div>
                        <Link to="/achievements" className="inline-flex items-center gap-1.5 font-semibold text-zan-cyan hover:underline">All achievements <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {awards.featured.map((a) => (
                            <Link key={a.team} to="/achievements" className="block">
                                <AchievementCard item={a} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl border border-zan-cyan/30 bg-gradient-to-br from-zan-cyan/10 via-surface-dark to-surface-dark p-8 text-center md:p-14">
                        <Flag className="mx-auto h-10 w-10 text-zan-cyan" />
                        <h2 className="mt-5 text-3xl font-bold text-white font-heading md:text-4xl">Be part of the impact</h2>
                        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-gray-400">
                            Host a free workshop at your school, sponsor a session in a rural district, or partner with us on R&D. Together we can make
                            Bangladesh a technology-building nation.
                        </p>
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-zan-cyan px-6 py-3.5 text-sm font-bold text-zan-dark transition-opacity hover:opacity-90">
                                Partner with us <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/courses" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-zan-cyan/40">
                                Start learning
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ImpactPage;
