import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Tag, Calendar, Clock, Share2, Cpu, Zap } from 'lucide-react';
import { API_BASE_URL } from '../config';

/* ── Helpers ──────────────────────────────────────────────────────── */

const GalleryImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="group relative w-full h-full overflow-hidden rounded-sm border border-white/10 shadow-lg">
        <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
);

const extractAndStripImages = (html: string): { images: string[]; cleanHtml: string } => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const imgEls = [...doc.querySelectorAll('img')];
    const images = imgEls.map(img => img.src).filter(Boolean);
    imgEls.forEach(img => img.parentElement?.removeChild(img));
    return { images, cleanHtml: doc.body.innerHTML };
};


/* ── Component ────────────────────────────────────────────────────── */

const WorkshopDetailsPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [workshop, setWorkshop] = useState<any>(null);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [cleanContent, setCleanContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        fetch(`${API_BASE_URL}/api/posts/${slug}`)
            .then(r => r.json())
            .then(res => {
                if (res.success && res.data) {
                    const data = res.data;
                    setWorkshop(data);
                    if (data.content) {
                        const { images, cleanHtml } = extractAndStripImages(data.content);
                        setGalleryImages(images);
                        setCleanContent(cleanHtml);
                    }
                }
                setLoading(false);
            })
            .catch(err => { console.error(err); setLoading(false); });
    }, [slug]);

    // Split title: first half white, second half cyan
    const titleWords = workshop?.title?.split(' ') || [];
    const splitAt = Math.ceil(titleWords.length / 2);
    const titleFirst = titleWords.slice(0, splitAt).join(' ');
    const titleSecond = titleWords.slice(splitAt).join(' ');

    /* Loading */
    if (loading) {
        return (
            <div className="min-h-screen bg-zan-dark flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-zan-cyan" />
                    <p className="mt-4 text-gray-400 font-mono tracking-widest">Loading workshop data...</p>
                </div>
            </div>
        );
    }

    /* Not found */
    if (!workshop) {
        return (
            <div className="min-h-screen bg-zan-dark flex flex-col items-center justify-center p-4">
                <div className="text-zan-red text-6xl mb-4 animate-pulse">!</div>
                <h2 className="text-2xl font-bold text-white mb-2 font-heading uppercase tracking-wide">Workshop Not Found</h2>
                <p className="text-lg mb-8 text-center max-w-md text-gray-400 font-light">The workshop data seems to be missing from the mainframe.</p>
                <button onClick={() => navigate(-1)} className="bg-white/5 text-zan-cyan border border-zan-cyan/30 px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-zan-cyan hover:text-black transition-all flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Return to Workshops
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zan-dark font-sans overflow-hidden">

            {/* ── AMBIENT BACKGROUND ──────────────────────────── */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-zan-cyan/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-zan-red/5 rounded-full blur-[120px]" />
            </div>

            {/* ══ SECTION 1 — HERO ════════════════════════════ */}
            <section className="relative min-h-screen flex items-center pt-20" id="home">
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left — text content */}
                    <div className="space-y-6">
                        {/* Back */}
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center text-zan-cyan bg-white/5 hover:bg-zan-cyan/10 px-4 py-2 border border-zan-cyan/20 hover:border-zan-cyan/50 font-mono text-xs uppercase tracking-widest transition-all"
                        >
                            <ArrowLeft className="w-3 h-3 mr-2" /> Back to Workshops
                        </button>

                        {/* Category badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zan-cyan/10 border border-zan-cyan/20">
                            <Cpu className="w-4 h-4 text-zan-cyan" />
                            <span className="font-mono text-zan-cyan text-xs uppercase tracking-widest">
                                {workshop.category || 'Workshop'}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight font-heading">
                            <span className="text-white">{titleFirst}</span>
                            {titleSecond && <> <span className="text-zan-cyan">{titleSecond}</span></>}
                        </h1>

                        {/* Description */}
                        {(workshop.meta_description || contentBlocks[0]?.text) && (
                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl border-l-2 border-zan-red pl-4">
                                {workshop.meta_description || contentBlocks[0]?.text?.slice(0, 220)}
                            </p>
                        )}

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <a
                                href="#gallery"
                                className="bg-zan-cyan text-black px-8 py-4 font-bold uppercase tracking-widest text-sm text-center hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                            >
                                View Gallery
                            </a>
                            <a
                                href="#highlights"
                                className="border-2 border-zan-red text-zan-red px-8 py-4 font-bold uppercase tracking-widest text-sm text-center hover:bg-zan-red/10 transition-colors"
                            >
                                Workshop Details
                            </a>
                        </div>

                        {/* Meta row */}
                        <div className="flex items-center flex-wrap gap-6 text-gray-500 font-mono text-xs uppercase tracking-wide pt-2 border-t border-white/5">
                            {workshop.created_at && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-zan-neon" />
                                    {new Date(workshop.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-zan-cyan" />
                                10 min read
                            </div>
                            {workshop.tags?.[0] && (
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-zan-red" />
                                    {workshop.tags[0]}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right — rotated image card (all screen sizes) */}
                    <div className="relative mt-4 lg:mt-0">
                        <div className="relative overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border border-zan-cyan/20">
                            <img
                                src={workshop.thumbnail_url}
                                alt={workshop.title}
                                className="w-full aspect-[4/3] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zan-dark/60 via-transparent to-transparent" />
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -bottom-6 -left-6 bg-surface-dark/95 backdrop-blur-md p-4 border border-zan-cyan/20 shadow-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-zan-cyan/20 flex items-center justify-center shrink-0">
                                    <Zap className="w-5 h-5 text-zan-cyan" />
                                </div>
                                <div>
                                    <p className="text-white font-mono text-xs tracking-wide">Live Workshop</p>
                                    <p className="text-gray-400 text-xs">Building Future Innovators</p>
                                </div>
                            </div>
                        </div>

                        {/* Corner accents */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-zan-red" />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-zan-cyan" />
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 font-mono text-xs animate-bounce">
                    <span className="uppercase tracking-widest">Scroll</span>
                    <div className="w-px h-8 bg-gradient-to-b from-zan-cyan/50 to-transparent" />
                </div>
            </section>

            {/* ══ SECTION 2 — EVENT GALLERY ═══════════════════ */}
            {galleryImages.length > 0 && (
                <section className="relative py-24 bg-zan-dark" id="gallery">
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Gallery header */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-10">
                            <div>
                                <h2 className="text-2xl font-bold text-white font-heading uppercase tracking-wide">Event Gallery</h2>
                                <p className="text-sm text-gray-400 mt-1">
                                    Capturing moments of innovation, focus, and pure excitement at {workshop.title}.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-px w-16 bg-zan-cyan/30 hidden sm:block" />
                                <span className="text-zan-cyan font-mono text-xs uppercase tracking-widest">Live Workshop Vol. 01</span>
                            </div>
                        </div>

                        {galleryImages.length === 1 && (
                            <div className="h-72 md:h-96">
                                <GalleryImage src={galleryImages[0]} alt="Gallery image 1" />
                            </div>
                        )}

                        {galleryImages.length === 2 && (
                            <div className="grid grid-cols-2 gap-2 h-64 md:h-80">
                                {galleryImages.map((img, i) => (
                                    <GalleryImage key={i} src={img} alt={`Gallery image ${i + 1}`} />
                                ))}
                            </div>
                        )}

                        {galleryImages.length >= 3 && (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    <div className="row-span-2 h-64 md:h-auto" style={{ minHeight: '285px' }}>
                                        <GalleryImage src={galleryImages[0]} alt="Gallery image 1" />
                                    </div>
                                    {galleryImages.slice(1, 5).map((img, i) => (
                                        <div key={i} className="h-32 md:h-[140px]">
                                            <GalleryImage src={img} alt={`Gallery image ${i + 2}`} />
                                        </div>
                                    ))}
                                </div>
                                {galleryImages.length > 5 && (
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {galleryImages.slice(5).map((img, i) => (
                                            <div key={i} className="h-48 md:h-64">
                                                <GalleryImage src={img} alt={`Gallery image ${i + 6}`} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            )}

            {/* ══ SECTION 3 — WORKSHOP HIGHLIGHTS ════════════ */}
            <section className="relative py-16 bg-surface-dark" id="highlights">
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-white font-heading uppercase tracking-wide mb-8 pb-4 border-b border-white/10">
                        Workshop Highlights
                    </h2>
                    <article
                        className="prose prose-lg prose-invert max-w-none
                        prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-white
                        prose-h2:text-2xl prose-h3:text-xl prose-h3:text-zan-cyan
                        prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-6 prose-p:font-light
                        prose-a:text-zan-cyan prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-white prose-strong:font-bold
                        prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-400 prose-li:mb-2
                        prose-blockquote:border-l-4 prose-blockquote:border-zan-cyan prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400"
                        dangerouslySetInnerHTML={{ __html: cleanContent }}
                    />
                </div>
            </section>

            {/* ══ SHARE ════════════════════════════════════════ */}
            <div className="relative bg-surface-dark border-t border-white/5 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Share this workshop</p>
                    <button className="p-3 bg-white/5 text-gray-400 hover:bg-zan-cyan hover:text-black transition-all border border-white/10 hover:border-zan-cyan hover:shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default WorkshopDetailsPage;
