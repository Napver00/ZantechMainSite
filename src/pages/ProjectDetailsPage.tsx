import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    AlertTriangle, ArrowLeft, ArrowRight, Calendar, Check, ChevronDown, Cpu, FlaskConical,
    LifeBuoy, Lightbulb, Link2, ListOrdered, MessageSquare, Rocket, Share2, Wrench, X,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { API_BASE_URL } from '../config';

interface Technology { id: number | string; name: string }

interface Project {
    id: number | string;
    title: string;
    slug: string;
    description?: string;
    longdescription?: string;
    image_url?: string | null;
    technologies?: Technology[];
    created_at?: string;
}

interface TocItem { id: string; text: string; level: 2 | 3 }

const WHATSAPP = '8801894634149';

const slugify = (t: string) =>
    t.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60) || 'section';

const fmtMonth = (d?: string) =>
    d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '';

const normalise = (t = '') => t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const STEPS = [
    { icon: Lightbulb, title: 'Share the idea', text: 'Tell us the problem, the users and your budget. A rough sketch is enough.' },
    { icon: FlaskConical, title: 'Prototype', text: 'We pick the hardware and software and build a working proof of concept.' },
    { icon: Wrench, title: 'Build & test', text: 'Custom PCB, firmware, app and enclosure, tested in real conditions.' },
    { icon: LifeBuoy, title: 'Deliver & support', text: 'Hand-over, training and support while it goes into use.' },
];

/** R&D / client project case study: pitch header, readable write-up, tech snapshot, "work with us" calls. */
const ProjectDetailsPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [others, setOthers] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [toc, setToc] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState('');
    const [copied, setCopied] = useState(false);
    const [lightbox, setLightbox] = useState<string | null>(null);
    const articleRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError('');
        window.scrollTo(0, 0);
        (async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/projects/${slug}`);
                const json = await res.json();
                if (!res.ok || !json.success || !json.data) throw new Error('not found');
                if (cancelled) return;
                setProject(json.data);
                setLoading(false);
                document.title = `${json.data.title} | ZAN Tech Projects`;
                const list = await fetch(`${API_BASE_URL}/api/projects/active`).then((r) => r.json()).catch(() => null);
                const items: Project[] = Array.isArray(list?.data) ? list.data : (list?.data?.data ?? []);
                if (!cancelled) setOthers(items.filter((p) => p.slug !== slug).slice(0, 3));
            } catch {
                if (!cancelled) setError('This project is not available.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [slug]);

    // Write-ups often start with the title again; drop that so it isn't shown twice.
    const content = useMemo(() => {
        const html = project?.longdescription || project?.description || '';
        if (!project || typeof DOMParser === 'undefined') return html;
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const first = doc.body.querySelector('h1, h2');
        if (first && normalise(first.textContent || '') === normalise(project.title)) first.remove();
        return doc.body.innerHTML;
    }, [project]);

    // Enhance the rendered HTML: heading anchors, responsive media, tap-to-zoom photos
    useEffect(() => {
        const root = articleRef.current;
        if (!root || !project || loading) return;

        const heads = [...root.querySelectorAll<HTMLElement>('h2, h3')].filter((h) => h.textContent?.trim());
        const nested = heads.filter((h) => h.tagName === 'H2').length >= 2;
        const used: Record<string, number> = {};
        setToc(heads.map((h) => {
            const text = h.textContent!.trim();
            let id = slugify(text);
            used[id] = (used[id] || 0) + 1;
            if (used[id] > 1) id = `${id}-${used[id]}`;
            h.id = id;
            return { id, text, level: nested && h.tagName === 'H3' ? 3 : 2 };
        }));

        root.querySelectorAll('iframe').forEach((f) => {
            if (f.parentElement?.classList.contains('video-frame')) return;
            f.removeAttribute('width'); f.removeAttribute('height'); f.removeAttribute('style');
            f.setAttribute('loading', 'lazy');
            const wrap = document.createElement('div');
            wrap.className = 'video-frame';
            f.replaceWith(wrap); wrap.appendChild(f);
        });

        root.querySelectorAll('table').forEach((t) => {
            if (t.parentElement?.classList.contains('table-scroll')) return;
            const wrap = document.createElement('div');
            wrap.className = 'table-scroll';
            t.replaceWith(wrap); wrap.appendChild(t);
        });

        const cleanups: Array<() => void> = [];
        root.querySelectorAll('img').forEach((img) => {
            img.removeAttribute('width'); img.removeAttribute('height');
            img.setAttribute('loading', 'lazy');
            if (!img.alt) img.alt = project.title;
            img.classList.add('zoomable');
            const open = () => setLightbox(img.currentSrc || img.src);
            img.addEventListener('click', open);
            cleanups.push(() => img.removeEventListener('click', open));
        });
        return () => cleanups.forEach((fn) => fn());
    }, [project, loading, content]);

    // Highlight the section being read
    useEffect(() => {
        if (!toc.length) return;
        const onScroll = () => {
            let current = '';
            for (const item of toc) {
                const h = document.getElementById(item.id);
                if (h && h.getBoundingClientRect().top < 140) current = item.id;
            }
            setActiveId(current);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [toc]);

    // Close the photo viewer with Escape
    useEffect(() => {
        if (!lightbox) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightbox]);

    // Contact lives on the home page (zantechbd.com/#contact). The home page loads in
    // pieces, so wait for the section to exist before scrolling to it.
    const goToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let new-tab clicks through
        e.preventDefault();
        navigate('/#contact');
        // Sections above it keep growing while images load, so re-aim until it holds still.
        let tries = 0;
        let settled = 0;
        const timer = window.setInterval(() => {
            const el = document.getElementById('contact');
            if (!el) {
                if (++tries > 50) window.clearInterval(timer);
                return;
            }
            const offset = el.getBoundingClientRect().top - 80;
            if (Math.abs(offset) > 40) {
                settled = 0;
                window.scrollBy({ top: offset, behavior: tries++ < 2 ? 'smooth' : 'auto' });
            } else if (++settled >= 3 || ++tries > 60) {
                window.clearInterval(timer);
            }
        }, 250);
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch { /* clipboard blocked */ }
    };
    const share = async () => {
        if (navigator.share) {
            try { await navigator.share({ title: project?.title, url: shareUrl }); } catch { /* closed */ }
        } else copyLink();
    };

    if (loading) {
        return (
            <section className="min-h-screen bg-zan-dark pt-28 pb-20">
                <div className="max-w-6xl mx-auto px-4 animate-pulse">
                    <div className="h-4 w-32 bg-white/10 rounded mb-6" />
                    <div className="grid gap-8 lg:grid-cols-2">
                        <div>
                            <div className="h-5 w-40 bg-white/10 rounded-full mb-5" />
                            <div className="h-10 w-full bg-white/10 rounded mb-3" />
                            <div className="h-10 w-2/3 bg-white/10 rounded mb-6" />
                            <div className="h-4 w-full bg-white/10 rounded mb-2" />
                            <div className="h-4 w-5/6 bg-white/10 rounded" />
                        </div>
                        <div className="aspect-[4/3] w-full bg-white/10 rounded-2xl" />
                    </div>
                </div>
            </section>
        );
    }

    if (error || !project) {
        return (
            <section className="min-h-screen bg-zan-dark pt-32 pb-20 flex items-center justify-center px-4">
                <div className="text-center max-w-sm">
                    <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zan-red/10 text-zan-red">
                        <AlertTriangle className="h-7 w-7" />
                    </span>
                    <h1 className="text-2xl font-bold text-white">This project isn't available</h1>
                    <p className="mt-2 text-sm text-gray-400">It may have been moved or unpublished.</p>
                    <Link to="/projects" className="mt-6 inline-flex items-center gap-2 font-bold text-zan-cyan">
                        <ArrowLeft className="h-4 w-4" /> All projects
                    </Link>
                </div>
            </section>
        );
    }

    const techs = (project.technologies || []).filter((t) => t?.name);
    const built = fmtMonth(project.created_at);
    const waText = encodeURIComponent(`Hi ZAN Tech, I saw your project "${project.title}" and I'd like to discuss a similar project.`);
    const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${waText}`;

    const TocList = ({ onPick }: { onPick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => (
        <ol className="space-y-1 text-sm">
            {toc.map((item) => (
                <li key={item.id}>
                    <a
                        href={`#${item.id}`}
                        onClick={onPick}
                        className={`block rounded-md border-l-2 py-1.5 pr-2 transition-colors ${item.level === 3 ? 'pl-6' : 'pl-3'} ${
                            activeId === item.id
                                ? 'border-zan-cyan bg-zan-cyan/10 font-semibold text-zan-cyan'
                                : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                    >
                        {item.text}
                    </a>
                </li>
            ))}
        </ol>
    );

    const Snapshot = () => (
        <div className="rounded-2xl border border-white/10 bg-surface-dark p-5">
            <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-gray-400">
                <Cpu className="h-3.5 w-3.5 text-zan-cyan" /> Project snapshot
            </p>
            <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                    <dt className="text-gray-400">Type</dt>
                    <dd className="font-semibold text-white">R&amp;D project</dd>
                </div>
                {built && (
                    <div className="flex items-center justify-between gap-3">
                        <dt className="text-gray-400">Built</dt>
                        <dd className="font-semibold text-white">{built}</dd>
                    </div>
                )}
                <div className="flex items-center justify-between gap-3">
                    <dt className="text-gray-400">Engineered by</dt>
                    <dd className="font-semibold text-white">ZAN Tech</dd>
                </div>
            </dl>
            {techs.length > 0 && (
                <>
                    <p className="mt-5 mb-2.5 text-xs font-semibold uppercase tracking-wider text-gray-400">Tech stack</p>
                    <div className="flex flex-wrap gap-1.5">
                        {techs.map((t) => (
                            <span key={t.id} className="rounded-md border border-zan-cyan/20 bg-zan-cyan/10 px-2 py-1 text-xs font-semibold text-zan-cyan">
                                {t.name}
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-zan-dark">
            {/* Header */}
            <section className="relative overflow-hidden border-b border-white/10 bg-surface-dark pt-24 md:pt-28">
                <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
                <div className="relative max-w-6xl mx-auto px-4 pb-10 md:pb-14">
                    <Link to="/projects" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-zan-cyan">
                        <ArrowLeft className="h-4 w-4" /> All projects
                    </Link>

                    <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
                        <div>
                            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-zan-cyan/30 bg-zan-cyan/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-zan-cyan">
                                <FlaskConical className="h-3.5 w-3.5" /> R&amp;D project · ZAN Tech Lab
                            </span>
                            <h1 className="text-3xl md:text-[2.5rem] font-bold leading-tight text-white font-heading">{project.title}</h1>
                            {project.description && (
                                <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-400">{project.description}</p>
                            )}

                            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400">
                                {built && <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {built}</span>}
                                {techs.length > 0 && (
                                    <span className="flex items-center gap-1.5"><Cpu className="h-4 w-4" /> {techs.length} technologies</span>
                                )}
                            </div>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-zan-cyan px-5 text-sm font-bold text-zan-dark shadow-lg shadow-zan-cyan/20 transition-colors hover:bg-white"
                                >
                                    <FaWhatsapp className="h-4 w-4" /> Build something like this
                                </a>
                                <a
                                    href="/#contact"
                                    onClick={goToContact}
                                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 px-5 text-sm font-bold text-white transition-colors hover:border-zan-cyan/50 hover:text-zan-cyan"
                                >
                                    <MessageSquare className="h-4 w-4" /> Talk to our team
                                </a>
                                <button
                                    onClick={share}
                                    aria-label="Share this project"
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-gray-300 transition-colors hover:border-zan-cyan/50 hover:text-zan-cyan"
                                >
                                    {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {project.image_url && (
                            <button
                                type="button"
                                onClick={() => setLightbox(project.image_url!)}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zan-dark shadow-xl"
                                aria-label="View the project photo larger"
                            >
                                <img src={project.image_url} alt={project.title} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                                {techs.length > 0 && (
                                    <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 bg-gradient-to-t from-black/75 to-transparent p-4 pt-10">
                                        {techs.slice(0, 4).map((t) => (
                                            <span key={t.id} className="rounded-md bg-black/50 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">{t.name}</span>
                                        ))}
                                        {techs.length > 4 && (
                                            <span className="rounded-md bg-black/50 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">+{techs.length - 4} more</span>
                                        )}
                                    </div>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Body */}
            <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
                    <div className="min-w-0">
                        {/* Phones: snapshot and contents above the write-up */}
                        <div className="mb-8 space-y-4 lg:hidden">
                            <Snapshot />
                            {toc.length > 1 && (
                                <details className="group rounded-xl border border-white/10 bg-surface-dark">
                                    <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-semibold text-white">
                                        <span className="flex items-center gap-2"><ListOrdered className="h-4 w-4 text-zan-cyan" /> On this page</span>
                                        <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" />
                                    </summary>
                                    <div className="border-t border-white/10 px-2 py-3">
                                        <TocList onPick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')} />
                                    </div>
                                </details>
                            )}
                        </div>

                        <article
                            ref={articleRef}
                            className="article-body project-article mx-auto max-w-[760px]"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />

                        <div className="mx-auto mt-10 flex max-w-[760px] flex-wrap items-center gap-2 border-t border-white/10 pt-6">
                            <span className="mr-1 text-sm font-semibold text-gray-400">Share this project</span>
                            <a href={`https://wa.me/?text=${encodeURIComponent(`${project.title} ${shareUrl}`)}`} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-sm font-semibold text-gray-300 hover:border-zan-cyan/50 hover:text-zan-cyan">
                                <FaWhatsapp className="h-4 w-4" /> WhatsApp
                            </a>
                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center rounded-lg border border-white/10 px-3 text-sm font-semibold text-gray-300 hover:border-zan-cyan/50 hover:text-zan-cyan">
                                LinkedIn
                            </a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center rounded-lg border border-white/10 px-3 text-sm font-semibold text-gray-300 hover:border-zan-cyan/50 hover:text-zan-cyan">
                                Facebook
                            </a>
                            <button onClick={copyLink} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-sm font-semibold text-gray-300 hover:border-zan-cyan/50 hover:text-zan-cyan">
                                {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />} {copied ? 'Copied' : 'Copy link'}
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="hidden lg:block">
                        {/* The snapshot can be long (12+ technologies), so only the parts below stay pinned */}
                        <Snapshot />
                        <div className="sticky top-28 mt-5 space-y-5">
                            {toc.length > 1 && (
                                <div className="rounded-2xl border border-white/10 bg-surface-dark p-4">
                                    <p className="mb-3 flex items-center gap-2 px-2 font-mono text-[11px] uppercase tracking-[0.14em] text-gray-400">
                                        <ListOrdered className="h-3.5 w-3.5 text-zan-cyan" /> On this page
                                    </p>
                                    <div className="max-h-[34vh] overflow-y-auto pr-1"><TocList /></div>
                                </div>
                            )}
                            <div className="rounded-2xl border border-zan-cyan/25 bg-zan-cyan/5 p-5">
                                <Rocket className="h-6 w-6 text-zan-cyan" />
                                <p className="mt-3 font-bold text-white">Need something similar?</p>
                                <p className="mt-1 text-sm text-gray-400">We design custom electronics, IoT and robotics from idea to finished product.</p>
                                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zan-cyan py-2.5 text-sm font-bold text-zan-dark transition-colors hover:bg-white">
                                    <FaWhatsapp className="h-4 w-4" /> Chat on WhatsApp
                                </a>
                                <a href="/#contact" onClick={goToContact} className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold text-zan-cyan hover:underline">
                                    Other ways to reach us <ArrowRight className="h-3.5 w-3.5" />
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* How we work */}
            <section className="border-t border-white/10 bg-surface-dark">
                <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-zan-cyan">Work with ZAN Tech</p>
                    <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white font-heading">How we'd build yours</h2>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {STEPS.map((step, i) => (
                            <div key={step.title} className="relative rounded-2xl border border-white/10 bg-zan-dark p-5">
                                <span className="absolute right-4 top-4 font-mono text-xs font-bold text-gray-500">0{i + 1}</span>
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zan-cyan/10 text-zan-cyan">
                                    <step.icon className="h-5 w-5" />
                                </span>
                                <p className="mt-4 font-bold text-white">{step.title}</p>
                                <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{step.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-zan-cyan/25 bg-gradient-to-r from-zan-cyan/10 to-transparent p-6 md:flex-row md:items-center md:p-8">
                        <div>
                            <p className="text-xl md:text-2xl font-bold text-white font-heading">Have a project in mind?</p>
                            <p className="mt-1 text-sm md:text-base text-gray-400">Tell us what you want to build. We usually reply the same day.</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-lg bg-zan-cyan px-5 text-sm font-bold text-zan-dark transition-colors hover:bg-white">
                                <FaWhatsapp className="h-4 w-4" /> Start on WhatsApp
                            </a>
                            <a href="/#contact" onClick={goToContact} className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 px-5 text-sm font-bold text-white transition-colors hover:border-zan-cyan/50 hover:text-zan-cyan">
                                Contact us
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* More projects */}
            {others.length > 0 && (
                <section className="border-t border-white/10">
                    <div className="max-w-6xl mx-auto px-4 py-12">
                        <div className="mb-6 flex items-end justify-between gap-4">
                            <h2 className="text-2xl font-bold text-white font-heading">More from our lab</h2>
                            <Link to="/projects" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-zan-cyan">
                                All projects <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {others.map((p) => (
                                <Link key={p.slug} to={`/project/${p.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-surface-dark transition-all hover:-translate-y-1 hover:border-zan-cyan/40">
                                    <div className="aspect-video overflow-hidden bg-white/5">
                                        {p.image_url && (
                                            <img src={p.image_url} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <p className="line-clamp-2 font-bold leading-snug text-white group-hover:text-zan-cyan">{p.title}</p>
                                        {p.description && <p className="mt-1.5 line-clamp-2 text-sm text-gray-400">{p.description}</p>}
                                        <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-zan-cyan">View project <ArrowRight className="h-3.5 w-3.5" /></p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Link to="/projects" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-zan-cyan sm:hidden">
                            All projects <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>
            )}

            {/* Photo viewer */}
            {lightbox && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Project photo"
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        onClick={() => setLightbox(null)}
                        aria-label="Close"
                        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <img src={lightbox} alt={project.title} className="max-h-[88vh] max-w-full rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </div>
    );
};

export default ProjectDetailsPage;
