import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    ArrowLeft, ArrowRight, BookOpen, Calendar, Check, ChevronDown, Clock,
    Link2, ListOrdered, Share2, ShoppingBag, GraduationCap, AlertTriangle,
} from 'lucide-react';
import { API_BASE_URL } from '../config';

interface Post {
    id: number | string;
    title: string;
    slug: string;
    content: string;
    category?: string;
    tags?: string[];
    author_name?: string;
    created_at: string;
    meta_title?: string;
    meta_description?: string;
    thumbnail_url?: string;
    thumbnail?: string;
}

interface TocItem { id: string; text: string; level: 2 | 3 }

const STORE_URL = 'https://store.zantechbd.com';

const slugify = (t: string) =>
    t.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60) || 'section';

const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const initials = (name = '') =>
    name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('') || 'ZT';

/** Free tutorial reader: framed header, readable article, contents sidebar, related tutorials. */
const TutorialDetailsPage = () => {
    const { slug } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [related, setRelated] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [toc, setToc] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState('');
    const [progress, setProgress] = useState(0);
    const [copied, setCopied] = useState(false);
    const articleRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError('');
        (async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/posts/${slug}`);
                const json = await res.json();
                if (!res.ok || !json.success || !json.data) throw new Error('not found');
                if (cancelled) return;
                setPost(json.data);
                setLoading(false);
                document.title = `${json.data.meta_title || json.data.title} | ZAN Tech`;
                const rel = await fetch(`${API_BASE_URL}/api/posts/published?category=tutorial&page=1&limit=4`)
                    .then((r) => r.json()).catch(() => null);
                if (!cancelled && rel?.success && Array.isArray(rel.data)) {
                    setRelated(rel.data.filter((p: Post) => p.slug !== slug).slice(0, 3));
                }
            } catch {
                if (!cancelled) setError('This tutorial is not available.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [slug]);

    // Enhance the rendered HTML: heading anchors, responsive video, scrollable tables, code panels
    useEffect(() => {
        const root = articleRef.current;
        if (!root || !post || loading) return;

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

        root.querySelectorAll('img').forEach((img) => {
            img.removeAttribute('width'); img.removeAttribute('height');
            img.setAttribute('loading', 'lazy');
            if (!img.alt) img.alt = post.title;
        });

        root.querySelectorAll('pre').forEach((pre) => {
            if (pre.parentElement?.classList.contains('code-panel')) return;
            // Code pasted from ChatGPT etc. keeps that site's toolbar markup inside <pre>;
            // keep only the real code text (innerText turns <br> into new lines).
            const codeEl = pre.querySelector('code');
            const lang = (codeEl?.className.match(/language-([\w+-]+)/) || [])[1];
            const text = ((codeEl || pre) as HTMLElement).innerText.replace(/\n{3,}/g, '\n\n').trim();
            pre.textContent = text;
            const panel = document.createElement('div');
            panel.className = 'code-panel';
            const bar = document.createElement('div');
            bar.className = 'code-panel-bar';
            const label = document.createElement('span');
            label.textContent = lang ? lang.replace('cpp', 'C++') : 'Code';
            bar.appendChild(label);
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = 'Copy';
            btn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(pre.innerText);
                    btn.textContent = 'Copied!';
                    setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
                } catch { /* clipboard blocked */ }
            });
            bar.appendChild(btn);
            pre.replaceWith(panel);
            panel.append(bar, pre);
        });
    }, [post, loading]);

    // Reading progress + active section
    useEffect(() => {
        if (!post) return;
        const onScroll = () => {
            const el = articleRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const total = Math.max(el.offsetHeight - window.innerHeight * 0.6, 1);
            const done = Math.min(Math.max(-rect.top + 120, 0), total);
            setProgress(Math.round((done / total) * 100));
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
    }, [post, toc]);

    const readingMinutes = useMemo(() => {
        const words = (post?.content || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
        return Math.max(1, Math.round(words / 200));
    }, [post?.content]);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch { /* clipboard blocked */ }
    };
    const nativeShare = async () => {
        if (navigator.share) {
            try { await navigator.share({ title: post?.title, url: shareUrl }); } catch { /* closed */ }
        } else copyLink();
    };

    if (loading) {
        return (
            <section className="min-h-screen bg-zan-dark pt-28 pb-20">
                <div className="max-w-6xl mx-auto px-4 animate-pulse">
                    <div className="h-4 w-32 bg-white/10 rounded mb-6" />
                    <div className="h-10 w-3/4 bg-white/10 rounded mb-4" />
                    <div className="h-5 w-1/2 bg-white/10 rounded mb-10" />
                    <div className="aspect-video w-full bg-white/10 rounded-2xl mb-10" />
                    {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-4 w-full bg-white/10 rounded mb-3" />)}
                </div>
            </section>
        );
    }

    if (error || !post) {
        return (
            <section className="min-h-screen bg-zan-dark pt-32 pb-20 flex items-center justify-center px-4">
                <div className="text-center max-w-sm">
                    <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zan-red/10 text-zan-red">
                        <AlertTriangle className="h-7 w-7" />
                    </span>
                    <h1 className="text-2xl font-bold text-white">This tutorial isn't available</h1>
                    <p className="mt-2 text-sm text-gray-400">It may have been moved or unpublished.</p>
                    <Link to="/tutorials" className="mt-6 inline-flex items-center gap-2 font-bold text-zan-cyan">
                        <ArrowLeft className="h-4 w-4" /> All tutorials
                    </Link>
                </div>
            </section>
        );
    }

    const tags = Array.isArray(post.tags) ? post.tags.filter(Boolean) : [];
    const cover = post.thumbnail_url || post.thumbnail || '';
    const shopQuery = encodeURIComponent(tags[0] || post.title.split(' ').slice(0, 2).join(' '));

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

    const shareBtn = 'inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 px-3.5 text-sm font-semibold text-gray-300 transition-colors hover:border-zan-cyan/50 hover:text-zan-cyan';

    return (
        <div className="min-h-screen bg-zan-dark">
            {/* Reading progress */}
            <div className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px]" aria-hidden>
                <div className="h-full bg-zan-cyan transition-[width] duration-150" style={{ width: `${progress}%` }} />
            </div>

            {/* Header */}
            <section className="relative overflow-hidden border-b border-white/10 bg-surface-dark pt-24 md:pt-28">
                <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
                <div className="relative max-w-6xl mx-auto px-4 pb-10 md:pb-14">
                    <Link to="/tutorials" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-zan-cyan">
                        <ArrowLeft className="h-4 w-4" /> All tutorials
                    </Link>

                    <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
                        <div>
                            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-zan-cyan/30 bg-zan-cyan/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-zan-cyan">
                                <BookOpen className="h-3.5 w-3.5" /> {post.category || 'Tutorial'} · Free
                            </span>
                            <h1 className="text-3xl md:text-[2.6rem] font-bold leading-tight text-white font-heading">{post.title}</h1>
                            {post.meta_description && (
                                <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-400">{post.meta_description}</p>
                            )}
                            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-400">
                                {post.author_name && (
                                    <span className="flex items-center gap-2.5">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zan-cyan/15 text-xs font-bold text-zan-cyan">
                                            {initials(post.author_name)}
                                        </span>
                                        <span className="font-semibold text-white">{post.author_name}</span>
                                    </span>
                                )}
                                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {fmtDate(post.created_at)}</span>
                                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {readingMinutes} min read</span>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-2">
                                <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${shareUrl}`)}`} target="_blank" rel="noreferrer" className={shareBtn}>WhatsApp</a>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className={shareBtn}>Facebook</a>
                                <button onClick={copyLink} className={shareBtn}>
                                    {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />} {copied ? 'Copied' : 'Copy link'}
                                </button>
                            </div>
                        </div>
                        {cover && (
                            <div className="overflow-hidden rounded-2xl border border-white/10 bg-zan-dark shadow-xl">
                                <img src={cover} alt={post.title} className="aspect-video w-full object-cover" />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Body */}
            <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
                    <div className="min-w-0">
                        {toc.length > 1 && (
                            <details className="group mb-8 rounded-xl border border-white/10 bg-surface-dark lg:hidden">
                                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-semibold text-white">
                                    <span className="flex items-center gap-2"><ListOrdered className="h-4 w-4 text-zan-cyan" /> On this page</span>
                                    <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="border-t border-white/10 px-2 py-3">
                                    <TocList onPick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')} />
                                </div>
                            </details>
                        )}

                        <article
                            ref={articleRef}
                            className="article-body mx-auto max-w-[760px]"
                            dangerouslySetInnerHTML={{ __html: post.content || '' }}
                        />

                        {tags.length > 0 && (
                            <div className="mx-auto mt-12 max-w-[760px] border-t border-white/10 pt-6">
                                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-gray-400">Topics</p>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-gray-300">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mx-auto mt-10 grid max-w-[760px] gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-surface-dark p-5">
                                <p className="font-bold text-white">Found this helpful?</p>
                                <p className="mt-1 text-sm text-gray-400">Share it with a friend who's building too.</p>
                                <button onClick={nativeShare} className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-zan-cyan px-4 text-sm font-bold text-zan-dark transition-colors hover:bg-white">
                                    <Share2 className="h-4 w-4" /> Share
                                </button>
                            </div>
                            <div className="rounded-2xl border border-zan-cyan/25 bg-zan-cyan/5 p-5">
                                <p className="font-bold text-white">Build it yourself</p>
                                <p className="mt-1 text-sm text-gray-400">Get the parts used in this guide from the ZAN Tech store.</p>
                                <a href={`${STORE_URL}/search?q=${shopQuery}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-zan-cyan/40 px-4 text-sm font-bold text-zan-cyan transition-colors hover:bg-zan-cyan hover:text-zan-dark">
                                    <ShoppingBag className="h-4 w-4" /> Shop the parts
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-28 space-y-5">
                            {toc.length > 1 && (
                                <div className="rounded-2xl border border-white/10 bg-surface-dark p-4">
                                    <p className="mb-3 flex items-center gap-2 px-2 font-mono text-[11px] uppercase tracking-[0.14em] text-gray-400">
                                        <ListOrdered className="h-3.5 w-3.5 text-zan-cyan" /> On this page
                                    </p>
                                    <div className="max-h-[50vh] overflow-y-auto pr-1"><TocList /></div>
                                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                                        <div className="h-full rounded-full bg-zan-cyan transition-[width]" style={{ width: `${progress}%` }} />
                                    </div>
                                    <p className="mt-1.5 px-1 text-xs text-gray-400">{progress}% read</p>
                                </div>
                            )}
                            <div className="rounded-2xl border border-white/10 bg-surface-dark p-5">
                                <GraduationCap className="h-6 w-6 text-zan-cyan" />
                                <p className="mt-3 font-bold text-white">Want guided learning?</p>
                                <p className="mt-1 text-sm text-gray-400">Join a ZAN Tech course and build with a mentor.</p>
                                <Link to="/courses" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zan-cyan py-2.5 text-sm font-bold text-zan-dark transition-colors hover:bg-white">
                                    View courses <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
                <section className="border-t border-white/10 bg-surface-dark">
                    <div className="max-w-6xl mx-auto px-4 py-12">
                        <div className="mb-6 flex items-end justify-between gap-4">
                            <h2 className="text-2xl font-bold text-white font-heading">Keep learning</h2>
                            <Link to="/tutorials" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-zan-cyan">
                                All tutorials <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((p) => (
                                <Link key={p.slug} to={`/tutorial/${p.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-zan-dark transition-all hover:-translate-y-1 hover:border-zan-cyan/40">
                                    <div className="aspect-video overflow-hidden bg-white/5">
                                        {(p.thumbnail || p.thumbnail_url) && (
                                            <img src={p.thumbnail || p.thumbnail_url} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <p className="line-clamp-2 font-bold leading-snug text-white group-hover:text-zan-cyan">{p.title}</p>
                                        <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-zan-cyan">Read <ArrowRight className="h-3.5 w-3.5" /></p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default TutorialDetailsPage;
