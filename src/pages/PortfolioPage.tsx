import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, ArrowUpRight, Award, BookOpen, Clock, Cpu, Eye, FlaskConical, GraduationCap, Heart,
    Home, LifeBuoy, Lightbulb, Mail, MapPin, Medal, Phone, Printer, Rocket, ShoppingBag, Target, Trophy, Users, Wrench,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { API_BASE_URL } from '../config';
import { useCompany, WHATSAPP_NUMBER } from '../hooks/useCompany';
import CoursesSection from '../components/CoursesSection';
import WorkshopsSection from '../components/WorkshopsSection';
import Partners from '../components/Partners';
import AchievementCard from '../components/AchievementCard';
import { achievements } from '../data/achievements';
import { CORE_TEAM, FOUNDERS } from '../data/team';

interface Project {
    id: number | string;
    slug: string;
    title: string;
    description?: string;
    image_url?: string | null;
    technologies?: { id: number | string; name: string }[];
}

const SECTIONS = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'What we do' },
    { id: 'impact', label: 'Impact' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Awards' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' },
];

const STATS = [
    { value: '5,000+', label: 'Students reached', icon: GraduationCap },
    { value: '150+', label: 'Students per workshop', icon: Users },
    { value: '30–50%', label: 'Female participation', icon: Heart },
    { value: '15+', label: 'R&D projects built', icon: Cpu },
];

const SERVICES = [
    {
        icon: BookOpen,
        title: 'STEM education',
        text: 'Structured robotics, programming and AI courses and bootcamps for school and college students.',
        points: ['Age-based course tracks', 'Hands-on kits in every class', 'Competition coaching (WRO, WICE…)'],
        link: { to: '/courses', label: 'See courses' },
    },
    {
        icon: Heart,
        title: 'Free workshops',
        text: 'Project Uddipon brings free robotics & coding workshops to schools and rural communities.',
        points: ['150+ students per session', 'Focus on girls in tech', 'Run with schools & partners'],
        link: { href: 'https://projectuddipon.zantechbd.com/', label: 'Project Uddipon' },
    },
    {
        icon: FlaskConical,
        title: 'Custom R&D',
        text: 'We design and build electronics, IoT systems and robots for businesses, NGOs and researchers.',
        points: ['Idea to working prototype', 'PCB, firmware, app & enclosure', 'Testing, hand-over & support'],
        link: { to: '/projects', label: 'View projects' },
    },
    {
        icon: ShoppingBag,
        title: 'Components store',
        text: 'Arduino, sensors, modules and ready kits for makers, students and labs across Bangladesh.',
        points: ['Kits matched to our courses', 'Bulk orders for schools', 'Delivery nationwide'],
        link: { href: 'https://store.zantechbd.com', label: 'Visit the store' },
    },
];

const STEPS = [
    { icon: Lightbulb, title: 'Share the idea', text: 'Tell us the problem, the users and your budget.' },
    { icon: FlaskConical, title: 'Prototype', text: 'We choose hardware & software and build a proof of concept.' },
    { icon: Wrench, title: 'Build & test', text: 'Custom PCB, firmware, app and enclosure, tested for real.' },
    { icon: LifeBuoy, title: 'Deliver & support', text: 'Hand-over, training and support after launch.' },
];

const sliderBreakpoints = {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 24 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zan-cyan">{children}</p>
);

const SectionTitle = ({ eyebrow, title, text, center }: { eyebrow: string; title: string; text?: string; center?: boolean }) => (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold leading-tight text-white font-heading">{title}</h2>
        {text && <p className="mt-3 text-base leading-relaxed text-gray-400">{text}</p>}
    </div>
);

/** Shareable company profile: who ZAN Tech is, what it does, proof of work, and how to reach it. */
const PortfolioPage = () => {
    const company = useCompany();
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectsLoading, setProjectsLoading] = useState(true);
    const [active, setActive] = useState('');

    useEffect(() => {
        document.title = 'ZAN Tech — Company Profile';
        fetch(`${API_BASE_URL}/api/projects/active`)
            .then((r) => r.json())
            .then((res) => {
                const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : res?.data?.data;
                if (Array.isArray(list)) setProjects(list);
            })
            .catch(() => { /* section shows an empty state */ })
            .finally(() => setProjectsLoading(false));
    }, []);

    // Highlight the section in view in the jump bar
    useEffect(() => {
        const onScroll = () => {
            let current = '';
            for (const s of SECTIONS) {
                const el = document.getElementById(s.id);
                if (el && el.getBoundingClientRect().top < 160) current = s.id;
            }
            // The last section can't reach the top of the screen, so count the page end as it.
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40) {
                current = SECTIONS[SECTIONS.length - 1].id;
            }
            setActive(current);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // On phones the jump bar scrolls sideways: keep the current section's button visible
    useEffect(() => {
        if (!active) return;
        document.querySelector(`header nav a[href="#${active}"]`)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    }, [active]);

    const awardSummary = useMemo(() => {
        const gold = achievements.filter((a) => /gold|champion|1st/i.test(a.badge)).length;
        const international = achievements.filter((a) => /world|global|malaysia|international/i.test(`${a.badge} ${a.description}`)).length;
        return [
            { value: achievements.length, label: 'Awards & podiums', icon: Trophy },
            { value: gold, label: 'Gold, 1st place & champion', icon: Medal },
            { value: international, label: 'On the world stage', icon: Award },
        ];
    }, []);

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi ZAN Tech, I saw your company profile and I'd like to talk.")}`;
    const phoneDigits = company.phone.replace(/[^\d+]/g, '');
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`ZAN Tech, ${company.location}`)}`;

    return (
        <div className="relative min-h-screen bg-zan-dark text-white">
            {/* Top bar: brand, jump links, home */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-zan-dark/85 backdrop-blur-md print:hidden">
                <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
                    <Link to="/" className="flex shrink-0 items-center gap-2">
                        <img src="/zantech_logo.png" alt="ZAN Tech" className="h-7 w-auto" />
                        <span className="hidden font-heading font-bold tracking-wider text-white sm:inline">ZAN<span className="text-zan-red">TECH</span></span>
                    </Link>
                    <nav className="no-scrollbar -mx-1 flex flex-1 gap-1 overflow-x-auto px-1" aria-label="Profile sections">
                        {SECTIONS.map((s) => (
                            <a
                                key={s.id}
                                href={`#${s.id}`}
                                className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                                    active === s.id ? 'bg-zan-cyan/15 text-zan-cyan' : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {s.label}
                            </a>
                        ))}
                    </nav>
                    <button
                        onClick={() => window.print()}
                        className="hidden h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-sm font-semibold text-gray-300 hover:border-zan-cyan/40 hover:text-zan-cyan md:inline-flex"
                    >
                        <Printer className="h-4 w-4" /> Print / PDF
                    </button>
                    <Link to="/" aria-label="Home" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-gray-300 hover:border-zan-cyan/40 hover:text-zan-cyan">
                        <Home className="h-4 w-4" />
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="relative overflow-hidden border-b border-white/10 bg-surface-dark">
                <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" />
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-zan-cyan/10 blur-[110px]" />
                <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <Eyebrow>Company profile</Eyebrow>
                        <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-[1.1] text-white font-heading">
                            Building Bangladesh's next generation of <span className="text-zan-cyan">innovators</span>.
                        </h1>
                        <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-gray-400">
                            {company.hero_description ||
                                'ZAN Tech teaches robotics, programming and AI to students, supplies components to makers, and builds custom electronics, IoT and robotics solutions for businesses.'}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-lg bg-zan-cyan px-6 font-bold text-zan-dark shadow-lg shadow-zan-cyan/20 transition-colors hover:bg-white">
                                <FaWhatsapp className="h-5 w-5" /> Work with us
                            </a>
                            <a href="#projects" className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/15 px-6 font-bold text-white transition-colors hover:border-zan-cyan/50 hover:text-zan-cyan">
                                See our work <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {STATS.map((s) => (
                            <div key={s.label} className="rounded-2xl border border-white/10 bg-zan-dark/60 p-5 backdrop-blur-sm">
                                <s.icon className="h-5 w-5 text-zan-cyan" />
                                <p className="mt-3 text-3xl font-bold text-white font-heading">{s.value}</p>
                                <p className="mt-1 text-sm text-gray-400">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About + mission/vision */}
            <section id="about" className="scroll-mt-20 py-16 md:py-20">
                <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <SectionTitle eyebrow="About ZAN Tech" title="Robotics, coding and AI — made accessible across Bangladesh" />
                        <div className="mt-5 space-y-4 text-base leading-relaxed text-gray-400">
                            <p>{company.about_description1 || 'ZAN Tech is a technology company dedicated to fostering innovation and technical skills across Bangladesh. We make robotics, programming and AI/ML accessible to everyone, from young students to established businesses.'}</p>
                            {company.about_description2 && <p>{company.about_description2}</p>}
                        </div>
                        <Link to="/about" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-zan-cyan hover:underline">
                            More about us <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid content-start gap-4">
                        <div className="rounded-2xl border border-white/10 bg-surface-dark p-6">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zan-cyan/10 text-zan-cyan"><Target className="h-5 w-5" /></span>
                            <p className="mt-4 font-bold text-white">Our mission</p>
                            <p className="mt-1.5 text-sm leading-relaxed text-gray-400">Bring robotics, programming and AI education to every corner of Bangladesh — so no talented student is left behind.</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-surface-dark p-6">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zan-red/10 text-zan-red"><Eye className="h-5 w-5" /></span>
                            <p className="mt-4 font-bold text-white">Our vision</p>
                            <p className="mt-1.5 text-sm leading-relaxed text-gray-400">A generation ready for the Fourth Industrial Revolution, building technology for Bangladesh and the world.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="scroll-mt-20 border-y border-white/10 bg-surface-dark py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <SectionTitle eyebrow="What we do" title="Four ways we turn ideas into skills and products" />
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {SERVICES.map((s) => (
                            <div key={s.title} className="flex flex-col rounded-2xl border border-white/10 bg-zan-dark p-6">
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-zan-cyan/10 text-zan-cyan"><s.icon className="h-5 w-5" /></span>
                                <p className="mt-4 text-lg font-bold text-white">{s.title}</p>
                                <p className="mt-2 text-sm leading-relaxed text-gray-400">{s.text}</p>
                                <ul className="mt-4 flex-1 space-y-1.5 text-sm text-gray-300">
                                    {s.points.map((p) => (
                                        <li key={p} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zan-cyan" />{p}</li>
                                    ))}
                                </ul>
                                {'to' in s.link ? (
                                    <Link to={s.link.to!} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-zan-cyan hover:underline">{s.link.label} <ArrowRight className="h-4 w-4" /></Link>
                                ) : (
                                    <a href={s.link.href} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-zan-cyan hover:underline">{s.link.label} <ArrowUpRight className="h-4 w-4" /></a>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 rounded-2xl border border-white/10 bg-zan-dark p-6 md:p-8">
                        <p className="font-bold text-white">How an R&amp;D project with us works</p>
                        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {STEPS.map((step, i) => (
                                <div key={step.title} className="flex gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zan-cyan text-sm font-bold text-zan-dark">{i + 1}</span>
                                    <div>
                                        <p className="flex items-center gap-1.5 font-semibold text-white"><step.icon className="h-4 w-4 text-zan-cyan" />{step.title}</p>
                                        <p className="mt-1 text-sm text-gray-400">{step.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact */}
            <section id="impact" className="scroll-mt-20 py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <SectionTitle eyebrow="Impact" title="Real classrooms, real students, real results" text="Every number below comes from workshops, courses and competitions we have run ourselves." />
                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {STATS.map((s) => (
                            <div key={s.label} className="rounded-2xl border border-white/10 bg-surface-dark p-6 text-center">
                                <p className="text-4xl font-bold text-zan-cyan font-heading">{s.value}</p>
                                <p className="mt-2 text-sm font-semibold text-gray-300">{s.label}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-zan-red/20 bg-zan-red/5 p-6 md:flex-row md:items-center">
                        <div>
                            <p className="font-bold text-white">Project Uddipon — উদ্দীপন</p>
                            <p className="mt-1 max-w-2xl text-sm text-gray-400">Our flagship social initiative brings free robotics, programming and AI workshops to underserved and rural schools across Bangladesh.</p>
                        </div>
                        <a href="https://projectuddipon.zantechbd.com/" target="_blank" rel="noreferrer" className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-zan-red/40 px-5 text-sm font-bold text-zan-red hover:bg-zan-red hover:text-white">
                            Visit Project Uddipon <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section id="projects" className="scroll-mt-20 border-y border-white/10 bg-surface-dark py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <SectionTitle eyebrow="R&D portfolio" title="Things we have designed and built" />
                        <Link to="/projects" className="inline-flex items-center gap-1.5 font-semibold text-zan-cyan hover:underline">All projects <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                    {projectsLoading ? (
                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-72 animate-pulse rounded-2xl bg-white/5" />)}
                        </div>
                    ) : projects.length === 0 ? (
                        <p className="mt-8 text-gray-400">Projects will appear here soon.</p>
                    ) : (
                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.slice(0, 6).map((p) => (
                                <Link key={p.id} to={`/project/${p.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zan-dark transition-all hover:-translate-y-1 hover:border-zan-cyan/40">
                                    <div className="aspect-video overflow-hidden bg-white/5">
                                        {p.image_url && <img src={p.image_url} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                                    </div>
                                    <div className="flex flex-1 flex-col p-5">
                                        <p className="line-clamp-2 font-bold leading-snug text-white group-hover:text-zan-cyan">{p.title}</p>
                                        {p.description && <p className="mt-2 line-clamp-2 text-sm text-gray-400">{p.description}</p>}
                                        {!!p.technologies?.length && (
                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                {p.technologies.slice(0, 3).map((t) => (
                                                    <span key={t.id} className="rounded-md bg-zan-cyan/10 px-2 py-0.5 text-xs font-semibold text-zan-cyan">{t.name}</span>
                                                ))}
                                                {p.technologies.length > 3 && <span className="rounded-md bg-white/5 px-2 py-0.5 text-xs font-semibold text-gray-400">+{p.technologies.length - 3}</span>}
                                            </div>
                                        )}
                                        <p className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-semibold text-zan-cyan">Case study <ArrowRight className="h-3.5 w-3.5" /></p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Achievements */}
            <section id="achievements" className="scroll-mt-20 py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <SectionTitle eyebrow="Awards" title="Our students win — at home and abroad" />
                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        {awardSummary.map((a) => (
                            <div key={a.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-surface-dark p-5">
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400"><a.icon className="h-6 w-6" /></span>
                                <div>
                                    <p className="text-2xl font-bold text-white font-heading">{a.value}</p>
                                    <p className="text-sm text-gray-400">{a.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={20}
                            loop={achievements.length > 3}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            navigation
                            autoplay={{ delay: 4500, disableOnInteraction: true }}
                            modules={[Pagination, Navigation, Autoplay]}
                            breakpoints={sliderBreakpoints}
                            className="!pb-14"
                        >
                            {achievements.map((item) => (
                                <SwiperSlide key={item.team + item.badge} className="h-auto">
                                    <AchievementCard item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <Link to="/achievements" className="inline-flex items-center gap-1.5 font-semibold text-zan-cyan hover:underline">All achievements <ArrowRight className="h-4 w-4" /></Link>
                </div>
            </section>

            {/* Courses & workshops (shared with the home page) */}
            <div className="border-t border-white/10">
                <CoursesSection />
                <WorkshopsSection />
            </div>

            {/* Team */}
            <section id="team" className="scroll-mt-20 border-y border-white/10 bg-surface-dark py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <SectionTitle eyebrow="Team" title="Engineers and educators behind ZAN Tech" />
                    <div className="mt-10 grid gap-5 md:grid-cols-2">
                        {FOUNDERS.map((f) => (
                            <div key={f.name} className="flex items-center gap-5 rounded-2xl border border-white/10 bg-zan-dark p-5">
                                <img src={f.image} alt={f.name} loading="lazy" className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
                                <div>
                                    <p className="text-lg font-bold text-white">{f.name}</p>
                                    <p className="mt-1 text-sm font-semibold text-zan-cyan">{f.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        {CORE_TEAM.map((m) => (
                            <div key={m.name} className="rounded-2xl border border-white/10 bg-zan-dark p-3 text-center">
                                <img src={m.image} alt={m.name} loading="lazy" className="mx-auto aspect-square w-full rounded-xl object-cover" />
                                <p className="mt-3 text-sm font-bold leading-snug text-white">{m.name}</p>
                                <p className="mt-1 text-xs leading-snug text-gray-400">{m.role}</p>
                            </div>
                        ))}
                    </div>
                    <Link to="/team" className="mt-8 inline-flex items-center gap-1.5 font-semibold text-zan-cyan hover:underline">Meet the whole team <ArrowRight className="h-4 w-4" /></Link>
                </div>
            </section>

            {/* Partners (shared with the home page) */}
            <Partners />

            {/* Contact */}
            <section id="contact" className="scroll-mt-20 py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="overflow-hidden rounded-3xl border border-zan-cyan/25 bg-gradient-to-br from-zan-cyan/10 via-surface-dark to-surface-dark">
                        <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1.1fr_0.9fr]">
                            <div>
                                <Eyebrow>Get in touch</Eyebrow>
                                <h2 className="mt-2 text-3xl md:text-4xl font-bold leading-tight text-white font-heading">Let's build something together.</h2>
                                <p className="mt-4 max-w-lg text-gray-400">Courses for your school, a workshop for your community, components in bulk, or a custom R&amp;D project — tell us what you need and we'll reply the same day.</p>
                                <div className="mt-7 flex flex-wrap gap-3">
                                    <a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-lg bg-zan-cyan px-6 font-bold text-zan-dark transition-colors hover:bg-white">
                                        <FaWhatsapp className="h-5 w-5" /> WhatsApp us
                                    </a>
                                    <Link to="/contact" className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/15 px-6 font-bold text-white hover:border-zan-cyan/50 hover:text-zan-cyan">
                                        All our links <Rocket className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                            <ul className="space-y-4 text-sm">
                                <li>
                                    <a href={`tel:${phoneDigits}`} className="flex items-center gap-3 rounded-xl border border-white/10 bg-zan-dark/60 p-4 hover:border-zan-cyan/40">
                                        <Phone className="h-5 w-5 shrink-0 text-zan-cyan" /><span className="font-semibold text-white">{company.phone}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={`mailto:${company.email}`} className="flex items-center gap-3 rounded-xl border border-white/10 bg-zan-dark/60 p-4 hover:border-zan-cyan/40">
                                        <Mail className="h-5 w-5 shrink-0 text-zan-cyan" /><span className="truncate font-semibold text-white">{company.email}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={mapUrl} target="_blank" rel="noreferrer" className="flex gap-3 rounded-xl border border-white/10 bg-zan-dark/60 p-4 hover:border-zan-cyan/40">
                                        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-zan-red" />
                                        <span className="text-gray-300">{company.location}<span className="mt-1 flex items-center gap-1 font-semibold text-zan-cyan">Open in Maps <ArrowUpRight className="h-3.5 w-3.5" /></span></span>
                                    </a>
                                </li>
                                <li className="flex items-center gap-3 px-4 text-gray-400"><Clock className="h-5 w-5 shrink-0" /> Saturday – Thursday, 10 AM – 6 PM</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500">
                <Link to="/" className="font-semibold text-zan-cyan hover:underline">zantechbd.com</Link> · © {new Date().getFullYear()} ZAN Tech
            </footer>
        </div>
    );
};

export default PortfolioPage;
