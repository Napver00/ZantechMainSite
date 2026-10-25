import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock, ChevronDown, Clock, Mail, Phone, Printer } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCompany } from '../hooks/useCompany';

export interface LegalSection { id: string; title: string; content: ReactNode }
export interface LegalHighlight { icon: LucideIcon; title: string; text: string }

interface Props {
    eyebrow: string;
    title: string;
    intro: string;
    updated: string;
    highlights: LegalHighlight[];
    sections: LegalSection[];
    /** The other legal page, linked at the bottom. */
    related: { to: string; label: string };
}

/** Paragraph and bullet helpers so each policy reads the same. */
export const P = ({ children }: { children: ReactNode }) => (
    <p className="text-[15px] leading-7 text-gray-400 md:text-base">{children}</p>
);

export const Sub = ({ children }: { children: ReactNode }) => (
    <h3 className="pt-2 text-sm font-bold uppercase tracking-wider text-white">{children}</h3>
);

export const Points = ({ items }: { items: (string | [string, string])[] }) => (
    <ul className="space-y-3">
        {items.map((item, i) => {
            const [label, text] = Array.isArray(item) ? item : [null, item];
            return (
                <li key={i} className="flex gap-3 text-[15px] leading-7 text-gray-400 md:text-base">
                    <span className="mt-[11px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zan-cyan" />
                    <span>{label && <strong className="font-semibold text-white">{label}: </strong>}{text}</span>
                </li>
            );
        })}
    </ul>
);

/** Shared page for the privacy policy and terms: summary cards, contents list, numbered sections. */
const LegalLayout = ({ eyebrow, title, intro, updated, highlights, sections, related }: Props) => {
    const company = useCompany();
    const [active, setActive] = useState(sections[0]?.id ?? '');

    useEffect(() => {
        document.title = `${title} | ZAN Tech`;
        const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: '-96px 0px -65% 0px' },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [sections, title]);

    const jump = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: 'smooth' });
        setActive(id);
    };

    const readMins = Math.max(3, Math.round(sections.length * 0.6));

    const contents = (
        <ol className="space-y-1">
            {sections.map((s, i) => (
                <li key={s.id}>
                    <button
                        type="button"
                        onClick={() => jump(s.id)}
                        className={`flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${active === s.id ? 'bg-zan-cyan/10 font-semibold text-zan-cyan' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="w-5 flex-shrink-0 font-mono text-xs leading-5 opacity-70">{String(i + 1).padStart(2, '0')}</span>
                        <span className="leading-5">{s.title}</span>
                    </button>
                </li>
            ))}
        </ol>
    );

    return (
        <div className="min-h-screen bg-zan-dark">
            {/* Header */}
            <header className="relative overflow-hidden border-b border-white/10 pt-28 pb-12 md:pt-36 md:pb-16">
                <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.07]" />
                <div className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-zan-cyan/10 blur-[110px]" />
                <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-zan-cyan">{eyebrow}</p>
                    <h1 className="mt-4 text-4xl font-bold leading-tight text-white font-heading md:text-6xl">{title}</h1>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">{intro}</p>
                    <div className="mt-7 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-400 sm:text-sm">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-surface-dark px-3 py-1.5">
                            <CalendarClock className="h-4 w-4 text-zan-cyan" /> Last updated {updated}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-surface-dark px-3 py-1.5">
                            <Clock className="h-4 w-4 text-zan-cyan" /> {readMins} min read
                        </span>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-surface-dark px-3 py-1.5 transition-colors hover:border-zan-cyan/40 hover:text-white"
                        >
                            <Printer className="h-4 w-4 text-zan-cyan" /> Print / save PDF
                        </button>
                    </div>
                </div>
            </header>

            {/* The short version */}
            <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
                <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-gray-500">The short version</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {highlights.map(({ icon: Icon, title: t, text }) => (
                        <div key={t} className="rounded-2xl border border-white/10 bg-surface-dark p-5">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zan-cyan/10 text-zan-cyan">
                                <Icon className="h-5 w-5" />
                            </span>
                            <h3 className="mt-4 font-bold text-white font-heading">{t}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[260px_1fr] lg:gap-12 lg:px-8">
                {/* Contents */}
                <aside className="lg:sticky lg:top-28 lg:self-start print:hidden">
                    <details className="group rounded-2xl border border-white/10 bg-surface-dark lg:hidden">
                        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold text-white">
                            On this page <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="border-t border-white/10 p-2">{contents}</div>
                    </details>
                    <nav className="hidden lg:block" aria-label="Contents">
                        <p className="mb-3 px-3 font-mono text-xs uppercase tracking-[0.2em] text-gray-500">On this page</p>
                        {contents}
                    </nav>
                </aside>

                {/* Sections */}
                <article className="min-w-0 space-y-4">
                    {sections.map((s, i) => (
                        <section key={s.id} id={s.id} className="scroll-mt-28 rounded-2xl border border-white/10 bg-surface-dark p-6 md:p-8">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-zan-cyan/10 font-mono text-xs font-bold text-zan-cyan">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h2 className="text-xl font-bold text-white font-heading md:text-2xl">{s.title}</h2>
                            </div>
                            <div className="space-y-4">{s.content}</div>
                        </section>
                    ))}

                    {/* Questions */}
                    <div className="rounded-2xl border border-zan-cyan/30 bg-gradient-to-br from-zan-cyan/10 to-transparent p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white font-heading md:text-2xl">Questions about this page?</h2>
                        <p className="mt-2 text-gray-400">We reply within one working day. Reach us any way you like.</p>
                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <a href={`mailto:${company.email}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-zan-cyan px-5 py-3 text-sm font-bold text-zan-dark transition-opacity hover:opacity-90">
                                <Mail className="h-4 w-4" /> {company.email}
                            </a>
                            <a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-zan-cyan/40">
                                <Phone className="h-4 w-4" /> {company.phone}
                            </a>
                        </div>
                        <p className="mt-5 text-sm text-gray-500">{company.location}</p>
                    </div>

                    <Link
                        to={related.to}
                        className="group flex items-center justify-between rounded-2xl border border-white/10 bg-surface-dark p-5 transition-colors hover:border-zan-cyan/40 print:hidden"
                    >
                        <span>
                            <span className="block font-mono text-xs uppercase tracking-[0.2em] text-gray-500">Also read</span>
                            <span className="mt-1 block font-bold text-white font-heading">{related.label}</span>
                        </span>
                        <ArrowRight className="h-5 w-5 text-zan-cyan transition-transform group-hover:translate-x-1" />
                    </Link>
                </article>
            </div>
        </div>
    );
};

export default LegalLayout;
