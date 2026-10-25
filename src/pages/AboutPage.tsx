import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Anchor, ArrowRight, ArrowUpRight, BookOpen, Brain, Code, Compass, Cpu, Eye, FlaskConical, Flag, Globe, GraduationCap,
    Heart, Microscope, Monitor, Satellite, ShoppingBag, Target, Users, Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCompany } from '../hooks/useCompany';
import { CORE_TEAM, FOUNDERS } from '../data/team';
import { achievements } from '../data/achievements';
import { scopeOf } from '../data/achievementMeta';

const INTRO =
    'ZAN Tech is a Dhaka-based technology company working in robotics, IoT, AI and machine learning. From busy city schools to remote rural colleges, we are on a mission to put modern technology skills in every student’s hands.';

const PILLARS: { icon: LucideIcon; title: string; text: string; points: string[]; link: { to?: string; href?: string; label: string } }[] = [
    {
        icon: BookOpen,
        title: 'Education',
        text: 'Free Project Uddipon workshops, plus structured courses and bootcamps for students who want to go further.',
        points: ['Free school & college workshops', 'Courses and bootcamps', 'Teacher training & STEM clubs'],
        link: { to: '/courses', label: 'Explore courses' },
    },
    {
        icon: ShoppingBag,
        title: 'Products',
        text: 'Affordable, quality robotics kits and components so learning does not stop when the workshop ends.',
        points: ['Uddipon, RC, LFR & Soccer kits', 'CanSat, IoT & AI/ML kits', 'Arduino, ESP32 & sensors'],
        link: { href: 'https://store.zantechbd.com', label: 'Visit the store' },
    },
    {
        icon: FlaskConical,
        title: 'R&D',
        text: 'We design and build real technology for businesses, NGOs and researchers, and help students prototype their ideas.',
        points: ['Idea to working prototype', 'PCB, firmware & apps', 'Testing and hand-over'],
        link: { to: '/projects', label: 'View projects' },
    },
];

const TEACHING: { icon: LucideIcon; title: string; text: string; tint: string }[] = [
    { icon: Cpu, title: 'Robotics', text: 'Build real robots, from line followers to obstacle-avoiding machines on Arduino.', tint: 'text-zan-cyan bg-zan-cyan/10' },
    { icon: Code, title: 'Programming', text: 'Beginner-friendly coding with visual examples and step-by-step guidance.', tint: 'text-violet-500 bg-violet-500/10' },
    { icon: Brain, title: 'AI & ML', text: 'Real-world AI concepts and experiments that solve actual problems.', tint: 'text-zan-red bg-zan-red/10' },
    { icon: Globe, title: 'IoT', text: 'Smart devices and connected sensors that bridge the physical and digital worlds.', tint: 'text-blue-500 bg-blue-500/10' },
    { icon: GraduationCap, title: 'STEM education', text: 'Hands-on projects and teacher training to run effective school STEM clubs.', tint: 'text-emerald-500 bg-emerald-500/10' },
    { icon: Zap, title: 'Girls in Tech', text: 'Dedicated sessions that bring 30–50% female participation into STEM.', tint: 'text-amber-500 bg-amber-500/10' },
];

const RD_PROJECTS: { name: string; icon: LucideIcon }[] = [
    { name: 'Portable Attendance System', icon: Monitor },
    { name: 'IoT Salinity Detection', icon: Globe },
    { name: 'BILI Robot', icon: Cpu },
    { name: 'Autonomous Submarine', icon: Anchor },
    { name: 'CanSat Nano-Satellite', icon: Satellite },
];

const GOALS: { icon: LucideIcon; text: string }[] = [
    { icon: Microscope, text: 'Build an advanced robotics R&D centre for local innovation' },
    { icon: Brain, text: 'Develop AI and ML solutions tailored to Bangladesh’s needs' },
    { icon: Cpu, text: 'Bring automation to agriculture, industry and public services' },
    { icon: Globe, text: 'Expand Project Uddipon to every district' },
    { icon: Flag, text: 'Represent Bangladesh in international tech competitions' },
    { icon: Users, text: 'Create a nationwide pipeline of skilled STEM graduates' },
];

const Eyebrow = ({ children }: { children: string }) => (
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-zan-cyan">{children}</p>
);

const AboutPage = () => {
    const company = useCompany();
    const international = achievements.filter((a) => scopeOf(a) === 'International').length;

    useEffect(() => {
        document.title = 'About | ZAN Tech';
    }, []);

    const stats = [
        { value: '5,000+', label: 'Students reached' },
        { value: '150+', label: 'Students per workshop' },
        { value: 'Up to 50%', label: 'Female participation' },
        { value: `${achievements.length}`, label: `Awards · ${international} international` },
    ];

    return (
        <div className="min-h-screen bg-zan-dark">
            {/* Hero */}
            <header className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20">
                <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.07]" />
                <div className="pointer-events-none absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-zan-cyan/10 blur-[120px]" />
                <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
                    <div>
                        <Eyebrow>Who we are</Eyebrow>
                        <h1 className="mt-4 text-4xl font-bold leading-tight text-white font-heading md:text-6xl">
                            Pioneering <span className="text-zan-cyan">future tech</span> in Bangladesh
                        </h1>
                        <p className="mt-5 text-base leading-relaxed text-gray-400 md:text-lg">{company.about_description1 || INTRO}</p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-zan-cyan px-6 py-3.5 text-sm font-bold text-zan-dark transition-opacity hover:opacity-90">
                                Work with us <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/impact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-zan-cyan/40">
                                See our impact
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="overflow-hidden rounded-3xl border border-white/10 bg-surface-dark">
                            <img src="/hero_section_image.jpg" alt="Students building robots at a ZAN Tech workshop" className="aspect-[4/3] w-full object-cover" />
                        </div>
                        <div className="absolute -bottom-5 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-surface-dark/95 p-4 shadow-xl backdrop-blur sm:left-6 sm:right-auto">
                            <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-zan-red/10 text-zan-red"><Heart className="h-5 w-5" /></span>
                            <div>
                                <p className="text-sm font-bold text-white">Project Uddipon</p>
                                <p className="text-xs text-gray-400">Free workshops across Bangladesh</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-surface-dark lg:grid-cols-4">
                        {stats.map((s, i) => (
                            <div key={s.label} className={`p-5 md:p-6 ${i % 2 ? 'border-l border-white/10' : ''} ${i > 1 ? 'border-t border-white/10 lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}>
                                <p className="text-2xl font-bold text-white font-heading md:text-4xl">{s.value}</p>
                                <p className="mt-1 text-xs font-medium text-gray-400 md:text-sm">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Mission, vision, values */}
            <section id="mission-vision" className="scroll-mt-24 border-y border-white/10 bg-surface-dark py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <Eyebrow>Why we exist</Eyebrow>
                    <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white font-heading md:text-4xl">No talented learner left behind</h2>
                    <div className="mt-10 grid gap-4 md:grid-cols-3">
                        {[
                            { icon: Target, title: 'Mission', text: 'Take robotics, programming and AI education to every corner of Bangladesh. Every student deserves to learn modern technology skills.' },
                            { icon: Eye, title: 'Vision', text: 'Ignite technological curiosity in every student, especially in underserved and rural areas, and prepare a generation for the Fourth Industrial Revolution.' },
                            { icon: Compass, title: 'Belief', text: 'Bangladesh should build and export technology, not just use it. That starts with hands-on learning and local products.' },
                        ].map(({ icon: Icon, title, text }) => (
                            <div key={title} className="rounded-2xl border border-white/10 bg-zan-dark p-6 md:p-7">
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zan-cyan/10 text-zan-cyan"><Icon className="h-5 w-5" /></span>
                                <h3 className="mt-5 text-xl font-bold text-white font-heading">{title}</h3>
                                <p className="mt-2 leading-relaxed text-gray-400">{text}</p>
                            </div>
                        ))}
                    </div>
                    {company.about_description2 && (
                        <p className="mt-8 max-w-3xl leading-relaxed text-gray-400">{company.about_description2}</p>
                    )}
                </div>
            </section>

            {/* Three pillars */}
            <section className="py-16 md:py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <Eyebrow>What we do</Eyebrow>
                    <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white font-heading md:text-4xl">Three pillars, one mission</h2>
                    <p className="mt-3 max-w-2xl text-gray-400">
                        Sales from our store and paid R&D work fund our free workshops, so every kit sold and every project built helps another student
                        start learning.
                    </p>
                    <div className="mt-10 grid gap-5 lg:grid-cols-3">
                        {PILLARS.map(({ icon: Icon, title, text, points, link }, i) => {
                            const cls = 'mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-zan-cyan hover:underline';
                            return (
                                <div key={title} className="flex flex-col rounded-2xl border border-white/10 bg-surface-dark p-6 md:p-7">
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zan-cyan/10 text-zan-cyan"><Icon className="h-6 w-6" /></span>
                                        <span className="font-mono text-xs text-gray-500">0{i + 1}</span>
                                    </div>
                                    <h3 className="mt-5 text-xl font-bold text-white font-heading">{title}</h3>
                                    <p className="mt-2 leading-relaxed text-gray-400">{text}</p>
                                    <ul className="mt-5 flex-1 space-y-2 border-t border-white/10 pt-5">
                                        {points.map((p) => (
                                            <li key={p} className="flex items-center gap-2 text-sm text-gray-300">
                                                <span className="h-1.5 w-1.5 rounded-full bg-zan-cyan" /> {p}
                                            </li>
                                        ))}
                                    </ul>
                                    {link.to ? (
                                        <Link to={link.to} className={cls}>{link.label} <ArrowRight className="h-4 w-4" /></Link>
                                    ) : (
                                        <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>{link.label} <ArrowUpRight className="h-4 w-4" /></a>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* What we teach */}
            <section className="border-y border-white/10 bg-surface-dark py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <Eyebrow>What we teach</Eyebrow>
                    <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white font-heading md:text-4xl">Skills for the Fourth Industrial Revolution</h2>
                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {TEACHING.map(({ icon: Icon, title, text, tint }) => (
                            <div key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-zan-dark p-5">
                                <span className={`inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${tint}`}><Icon className="h-5 w-5" /></span>
                                <div>
                                    <h3 className="font-bold text-white font-heading">{title}</h3>
                                    <p className="mt-1 text-sm leading-relaxed text-gray-400">{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* R&D */}
            <section className="py-16 md:py-24">
                <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <div>
                        <Eyebrow>R&D and consulting</Eyebrow>
                        <h2 className="mt-3 text-3xl font-bold text-white font-heading md:text-4xl">Not just a school. We build real technology.</h2>
                        <p className="mt-4 leading-relaxed text-gray-400">
                            Our R&D team supports students and innovators in prototyping ideas, and builds working solutions for clients, from embedded hardware
                            to connected apps.
                        </p>
                        <Link to="/projects" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-zan-cyan hover:underline">
                            See the case studies <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {RD_PROJECTS.map(({ name, icon: Icon }, i) => (
                            <div key={name} className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-surface-dark p-4 ${i === RD_PROJECTS.length - 1 ? 'sm:col-span-2' : ''}`}>
                                <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-zan-cyan/10 text-zan-cyan"><Icon className="h-5 w-5" /></span>
                                <span className="font-semibold text-white">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="border-y border-white/10 bg-surface-dark py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <Eyebrow>The people</Eyebrow>
                            <h2 className="mt-3 text-3xl font-bold text-white font-heading md:text-4xl">Engineers who love to teach</h2>
                        </div>
                        <Link to="/team" className="inline-flex items-center gap-1.5 font-semibold text-zan-cyan hover:underline">Meet the whole team <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                    <div className="mt-10 grid gap-4 md:grid-cols-2">
                        {FOUNDERS.map((f) => (
                            <div key={f.name} className="flex items-center gap-5 rounded-2xl border border-white/10 bg-zan-dark p-5">
                                <img src={f.image} alt={f.name} loading="lazy" className="h-20 w-20 flex-shrink-0 rounded-2xl object-cover md:h-24 md:w-24" />
                                <div>
                                    <p className="text-lg font-bold text-white">{f.name}</p>
                                    <p className="mt-1 text-sm font-semibold text-zan-cyan">{f.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        {CORE_TEAM.map((m) => (
                            <div key={m.name} className="rounded-2xl border border-white/10 bg-zan-dark p-3 text-center">
                                <img src={m.image} alt={m.name} loading="lazy" className="mx-auto aspect-square w-full rounded-xl object-cover" />
                                <p className="mt-3 text-sm font-bold leading-snug text-white">{m.name}</p>
                                <p className="mt-1 text-xs leading-snug text-gray-400">{m.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Future */}
            <section className="py-16 md:py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <Eyebrow>Where we are going</Eyebrow>
                    <h2 className="mt-3 max-w-3xl text-3xl font-bold text-white font-heading md:text-4xl">
                        “We want Bangladesh to build and export technology, not just use it.”
                    </h2>
                    <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {GOALS.map(({ icon: Icon, text }, i) => (
                            <li key={text} className="flex gap-4 rounded-2xl border border-white/10 bg-surface-dark p-5">
                                <span className="font-mono text-sm font-bold text-zan-cyan">0{i + 1}</span>
                                <div>
                                    <Icon className="h-5 w-5 text-gray-500" />
                                    <p className="mt-2 font-medium leading-snug text-gray-200">{text}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* CTA */}
            <section className="pb-16 md:pb-24">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-zan-cyan/30 bg-gradient-to-br from-zan-cyan/10 via-surface-dark to-surface-dark p-8 text-center md:p-14">
                        <h2 className="text-3xl font-bold text-white font-heading md:text-4xl">Ready to shape the future?</h2>
                        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-gray-400">
                            Whether you are a student, a school, a hobbyist or a business, ZAN Tech is here to turn your talent and ideas into innovation.
                        </p>
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-zan-cyan px-6 py-3.5 text-sm font-bold text-zan-dark transition-opacity hover:opacity-90">
                                Let’s build together <ArrowRight className="h-4 w-4" />
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

export default AboutPage;
