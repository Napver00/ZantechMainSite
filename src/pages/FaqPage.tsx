import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ChevronDown, Mail, Search, ShoppingBag, Sparkles, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { API_BASE_URL } from '../config';
import { brandText } from '../utils/brand';
import { useCompany, WHATSAPP_NUMBER } from '../hooks/useCompany';

interface Faq { id: number; question: string; answer: string; category: string }

type Tab = 'all' | 'landingpage' | 'store';

const TABS: { id: Tab; label: string; icon: LucideIcon }[] = [
    { id: 'all', label: 'All questions', icon: Sparkles },
    { id: 'landingpage', label: 'ZAN Tech & workshops', icon: Building2 },
    { id: 'store', label: 'Store & orders', icon: ShoppingBag },
];

/** Searchable FAQ, grouped by the categories set in the admin panel. */
const FaqPage = () => {
    const company = useCompany();
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [tab, setTab] = useState<Tab>('all');
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState<Set<number>>(new Set());

    useEffect(() => {
        document.title = 'FAQ | ZAN Tech';
        fetch(`${API_BASE_URL}/api/faqs/active`)
            .then((r) => r.json())
            .then((res) => {
                if (!res?.success || !Array.isArray(res.data)) throw new Error();
                const list: Faq[] = res.data.map((f: Faq) => ({ ...f, question: brandText(f.question), answer: brandText(f.answer) }));
                // Company questions first, then the store.
                list.sort((a, b) => (a.category === b.category ? a.id - b.id : a.category === 'landingpage' ? -1 : 1));
                setFaqs(list);
                // A shared link like /faq#faq-12 opens that answer.
                const id = Number(window.location.hash.replace('#faq-', ''));
                if (id) {
                    setOpen(new Set([id]));
                    setTimeout(() => document.getElementById(`faq-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
                }
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    const counts = useMemo(
        () => ({ all: faqs.length, landingpage: faqs.filter((f) => f.category === 'landingpage').length, store: faqs.filter((f) => f.category === 'store').length }),
        [faqs],
    );

    const shown = useMemo(() => {
        const q = query.trim().toLowerCase();
        return faqs.filter(
            (f) => (tab === 'all' || f.category === tab) && (!q || `${f.question} ${f.answer}`.toLowerCase().includes(q)),
        );
    }, [faqs, tab, query]);

    const toggle = (id: number) =>
        setOpen((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });

    const allOpen = shown.length > 0 && shown.every((f) => open.has(f.id));

    return (
        <div className="min-h-screen bg-zan-dark">
            {/* Header with search */}
            <header className="relative overflow-hidden border-b border-white/10 pt-28 pb-12 md:pt-36 md:pb-16">
                <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.07]" />
                <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-zan-cyan/10 blur-[110px]" />
                <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-zan-cyan">Help centre</p>
                    <h1 className="mt-4 text-4xl font-bold leading-tight text-white font-heading md:text-6xl">How can we help?</h1>
                    <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
                        Answers about our free workshops, courses, the online store and working with ZAN Tech.
                    </p>
                    <label className="relative mx-auto mt-8 block max-w-xl">
                        <span className="sr-only">Search questions</span>
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search e.g. delivery, workshop, payment"
                            className="w-full rounded-2xl border border-white/10 bg-surface-dark py-4 pl-12 pr-12 text-white shadow-lg outline-none transition-colors placeholder:text-gray-500 focus:border-zan-cyan/60"
                        />
                        {query && (
                            <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 hover:bg-white/5 hover:text-white">
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </label>
                </div>
            </header>

            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[1fr_300px] lg:px-8">
                <div className="min-w-0">
                    {/* Category tabs */}
                    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
                        {TABS.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                type="button"
                                onClick={() => setTab(id)}
                                className={`inline-flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${tab === id ? 'border-zan-cyan bg-zan-cyan text-zan-dark' : 'border-white/10 bg-surface-dark text-gray-400 hover:border-white/20 hover:text-white'}`}
                            >
                                <Icon className="h-4 w-4" /> {label}
                                <span className={`rounded-full px-1.5 text-xs ${tab === id ? 'bg-black/10' : 'bg-white/5'}`}>{counts[id]}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4 text-sm text-gray-500">
                        <span>
                            {loading ? 'Loading…' : `${shown.length} ${shown.length === 1 ? 'question' : 'questions'}`}
                            {query && !loading && <> for “{query}”</>}
                        </span>
                        {shown.length > 1 && (
                            <button
                                type="button"
                                onClick={() => setOpen(allOpen ? new Set() : new Set(shown.map((f) => f.id)))}
                                className="font-semibold text-zan-cyan hover:underline"
                            >
                                {allOpen ? 'Collapse all' : 'Expand all'}
                            </button>
                        )}
                    </div>

                    <div className="mt-4 space-y-3">
                        {loading &&
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-[68px] animate-pulse rounded-2xl border border-white/10 bg-surface-dark" />
                            ))}

                        {error && (
                            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center text-gray-400">
                                We couldn't load the questions right now. Please refresh, or ask us directly using the links on this page.
                            </div>
                        )}

                        {!loading && !error && shown.length === 0 && (
                            <div className="rounded-2xl border border-white/10 bg-surface-dark p-8 text-center">
                                <p className="font-semibold text-white">No answer matches that yet.</p>
                                <p className="mt-1 text-sm text-gray-400">Try another word, or send us your question on WhatsApp.</p>
                            </div>
                        )}

                        {shown.map((faq) => {
                            const isOpen = open.has(faq.id);
                            return (
                                <div
                                    key={faq.id}
                                    id={`faq-${faq.id}`}
                                    className={`scroll-mt-28 rounded-2xl border bg-surface-dark transition-colors ${isOpen ? 'border-zan-cyan/40' : 'border-white/10 hover:border-white/20'}`}
                                >
                                    <h2>
                                        <button
                                            type="button"
                                            onClick={() => toggle(faq.id)}
                                            aria-expanded={isOpen}
                                            className="flex w-full items-start justify-between gap-4 p-5 text-left md:px-6"
                                        >
                                            <span className={`font-semibold leading-snug md:text-lg ${isOpen ? 'text-zan-cyan' : 'text-white'}`}>{faq.question}</span>
                                            <ChevronDown className={`mt-0.5 h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-zan-cyan' : ''}`} />
                                        </button>
                                    </h2>
                                    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                        <div className="overflow-hidden">
                                            <div className="px-5 pb-5 md:px-6">
                                                <p className="whitespace-pre-line border-t border-white/10 pt-4 leading-7 text-gray-400">{faq.answer}</p>
                                                {tab === 'all' && (
                                                    <span className="mt-4 inline-block rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-500">
                                                        {faq.category === 'store' ? 'Store & orders' : 'ZAN Tech & workshops'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Still stuck */}
                <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
                    <div className="rounded-2xl border border-zan-cyan/30 bg-gradient-to-br from-zan-cyan/10 to-transparent p-6">
                        <h2 className="text-lg font-bold text-white font-heading">Still have a question?</h2>
                        <p className="mt-1.5 text-sm leading-relaxed text-gray-400">Our team replies on WhatsApp within working hours, usually the same day.</p>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi ZAN Tech, I have a question: ')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-[#fff] transition-opacity hover:opacity-90"
                        >
                            <FaWhatsapp className="h-5 w-5" /> Chat on WhatsApp
                        </a>
                        <a
                            href={`mailto:${company.email}`}
                            className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-zan-cyan/40"
                        >
                            <Mail className="h-4 w-4" /> Email us
                        </a>
                    </div>
                    {[
                        { to: '/workshops', title: 'Host a free workshop', text: 'Bring Project Uddipon to your school or college.' },
                        { to: '/courses', title: 'Browse courses', text: 'Robotics, IoT and AI courses for every level.' },
                    ].map((c) => (
                        <Link key={c.to} to={c.to} className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-surface-dark p-5 transition-colors hover:border-zan-cyan/40">
                            <span>
                                <span className="block font-bold text-white font-heading">{c.title}</span>
                                <span className="mt-0.5 block text-sm text-gray-400">{c.text}</span>
                            </span>
                            <ArrowRight className="h-5 w-5 flex-shrink-0 text-zan-cyan transition-transform group-hover:translate-x-1" />
                        </Link>
                    ))}
                </aside>
            </div>
        </div>
    );
};

export default FaqPage;
