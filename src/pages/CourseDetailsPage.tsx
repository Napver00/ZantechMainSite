import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, ArrowRight, ChevronDown,
    Calendar, Award, Tag,
    Users, Video, BookOpen, GraduationCap,
    Monitor, PlayCircle, MapPin, Layers,
} from 'lucide-react';
import { API_BASE_URL } from '../config';

/* ─── Interfaces ─────────────────────────────────────────── */
interface Curriculum { id: number; module_no: number; title: string; description: string; }
interface Schedule   { id: number; course_type: string; start_datetime: string; }
interface Mentor     { id: number; name: string; image: string; description: string; experience: string; is_student_mentor: boolean; }
interface CourseDetail {
    id: number; title: string; slug: string; thumbnail: string;
    category: string; tags: string[]; short_description: string;
    description: string; price: number | null; discount_price: number | null;
    reg_link: string; serial_number: number; status: string; is_active: boolean;
    meta_title: string; meta_description: string;
    created_at: string; updated_at: string;
    curriculums: Curriculum[]; schedules: Schedule[]; mentors: Mentor[];
}

/* ─── Responsive-iframe processor ───────────────────────── */
const processHtml = (html: string): string => {
    if (!html) return '';
    // Wrap every <iframe> in a 16:9 aspect-ratio container
    return html
        .replace(
            /<iframe([^>]*)>/gi,
            (_m, attrs) => {
                const clean = attrs
                    .replace(/\s+width="[^"]*"/gi, '')
                    .replace(/\s+height="[^"]*"/gi, '')
                    .replace(/\s+style="[^"]*"/gi, '');
                return `<div class="vid-wrap"><iframe${clean}>`;
            },
        )
        .replace(/<\/iframe>/gi, '</iframe></div>');
};

/* ─── Component ──────────────────────────────────────────── */
const CourseDetailsPage = () => {
    const { slug }   = useParams();
    const navigate   = useNavigate();
    const [course, setCourse]               = useState<CourseDetail | null>(null);
    const [loading, setLoading]             = useState(true);
    const [error, setError]                 = useState<string | null>(null);
    const [openModules, setOpenModules]     = useState<Set<number>>(new Set());

    /* fetch ─────────────────────────────────────────────── */
    useEffect(() => {
        const fetchCourse = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                const res    = await fetch(`${API_BASE_URL}/api/courses/${slug}`);
                const result = await res.json();
                if (res.ok && result.success) { setCourse(result.data); return; }

                // Fallback → old posts API (free tutorials)
                const fbRes    = await fetch(`${API_BASE_URL}/api/posts/${slug}`);
                if (!fbRes.ok) throw new Error('Not found');
                const fbResult = await fbRes.json();
                if (fbResult.success) {
                    const p = fbResult.data;
                    setCourse({
                        id: p.id, title: p.title, slug: p.slug,
                        thumbnail: p.thumbnail_url || p.thumbnail || '',
                        category: p.category || 'Tutorial', tags: p.tags || [],
                        short_description: p.meta_description || '',
                        description: p.content || '', price: null, discount_price: null,
                        reg_link: p.reg_link || '', serial_number: p.serial || 0,
                        status: p.status || 'published', is_active: true,
                        meta_title: p.meta_title || '', meta_description: p.meta_description || '',
                        created_at: p.created_at, updated_at: p.updated_at,
                        curriculums: [], schedules: [],
                        mentors: (p.teachers || []).map((t: any) => ({
                            id: t.id, name: t.ambassador?.name || '',
                            image: t.ambassador?.image || '',
                            description: t.ambassador?.bio || '',
                            experience: t.ambassador?.campus || '',
                            is_student_mentor: false,
                        })),
                    });
                } else { setError('Course not found'); }
            } catch { setError('An error occurred while loading course details.'); }
            finally  { setLoading(false); }
        };
        fetchCourse();
    }, [slug]);

    const toggleModule = (id: number) =>
        setOpenModules(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

    /* processed description HTML */
    const descHtml = useMemo(() => processHtml(course?.description || ''), [course?.description]);

    /* ── loading / error states ─────────────────────────── */
    if (loading) return (
        <div className="min-h-screen bg-zan-dark flex items-center justify-center">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-zan-cyan"></div>
        </div>
    );
    if (error || !course) return (
        <div className="min-h-screen bg-zan-dark flex flex-col items-center justify-center p-6 text-center">
            <div className="text-zan-red text-5xl mb-4 animate-pulse">!</div>
            <h2 className="text-xl font-bold text-white mb-2 font-heading uppercase tracking-wide">{error || 'Course Not Found'}</h2>
            <button onClick={() => navigate('/courses')}
                className="mt-6 bg-white/5 text-zan-cyan border border-zan-cyan/30 px-5 py-2.5 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-zan-cyan hover:text-black transition-all duration-300 flex items-center gap-2 mx-auto">
                <ArrowLeft className="w-4 h-4" /> Back to Courses
            </button>
        </div>
    );

    const displayPrice = course.discount_price ?? course.price;
    const hasDiscount  = course.discount_price != null && course.price != null && course.discount_price < course.price;

    return (
        <div className="min-h-screen bg-zan-dark font-sans">
            {/* Responsive video iframe CSS */}
            <style>{`
                .vid-wrap{position:relative;width:100%;aspect-ratio:16/9;margin:1.25rem 0;border-radius:8px;overflow:hidden;background:#111}
                .vid-wrap iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
                @media(max-width:640px){.vid-wrap{border-radius:6px}}
            `}</style>

            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

            {/* ════════════════════════════════════════════
                HERO
            ════════════════════════════════════════════ */}
            <section className="relative overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-14 lg:pt-32 lg:pb-24">
                <div className="absolute top-0 right-0 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-zan-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 sm:w-[400px] h-64 sm:h-[400px] bg-zan-red/5 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Back */}
                    <button onClick={() => navigate('/courses')}
                        className="inline-flex items-center mb-6 sm:mb-8 text-zan-cyan bg-white/5 hover:bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm transition-all border border-white/10 hover:border-zan-cyan/40 font-mono text-xs uppercase tracking-widest">
                        <ArrowLeft className="w-3 h-3 mr-2" /> Back to Courses
                    </button>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left — text */}
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zan-cyan/10 border border-zan-cyan/20 text-zan-cyan mb-4 sm:mb-6">
                                <Tag className="w-3 h-3 shrink-0" />
                                <span className="font-mono text-xs uppercase tracking-widest truncate max-w-[220px]">
                                    {course.category}{course.tags?.length > 0 ? ` · ${course.tags[0]}` : ''}
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 sm:mb-5 font-heading uppercase tracking-wide">
                                {course.title}
                            </h1>

                            {course.short_description && (
                                <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed font-light">
                                    {course.short_description}
                                </p>
                            )}

                            {/* Price + CTA */}
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                {displayPrice != null ? (
                                    <div className="flex flex-col">
                                        <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">Course Price</span>
                                        <div className="flex items-baseline gap-2 sm:gap-3">
                                            <span className="text-2xl sm:text-3xl font-bold text-white font-heading">৳{displayPrice}</span>
                                            {hasDiscount && <span className="text-base text-gray-500 line-through">৳{course.price}</span>}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">Course</span>
                                        <span className="text-2xl font-bold text-zan-cyan font-heading">Free</span>
                                    </div>
                                )}
                                {course.reg_link ? (
                                    <a href={course.reg_link} target="_blank" rel="noopener noreferrer"
                                        className="px-7 sm:px-10 py-3 sm:py-4 bg-zan-red hover:bg-red-600 text-white font-bold rounded-sm transition-all shadow-lg hover:shadow-zan-red/40 font-heading uppercase tracking-wider flex items-center gap-2 sm:gap-3 text-sm">
                                        Enroll Now <ArrowRight className="w-4 h-4" />
                                    </a>
                                ) : (
                                    <button disabled className="px-7 sm:px-10 py-3 sm:py-4 bg-gray-700 text-gray-400 font-bold rounded-sm cursor-not-allowed font-heading uppercase tracking-wider text-sm">
                                        Registration Closed
                                    </button>
                                )}
                            </div>

                            {/* Schedule pills */}
                            {course.schedules?.length > 0 && (
                                <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                                    {course.schedules.map(s => (
                                        <div key={s.id} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-sm text-xs font-mono text-gray-300">
                                            <Calendar className="w-3 h-3 text-zan-cyan shrink-0" />
                                            <span className="text-zan-cyan uppercase">{s.course_type}:</span>
                                            {new Date(s.start_datetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right — thumbnail */}
                        <div className="relative group order-1 lg:order-2">
                            <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-zan-cyan/15 to-zan-red/15 rounded-2xl blur-2xl group-hover:blur-3xl transition-all"></div>
                            <img src={course.thumbnail} alt={course.title}
                                className="relative rounded-xl shadow-2xl border border-white/10 w-full h-48 sm:h-64 md:h-80 lg:h-[380px] object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x500?text=Course'; }} />
                            {displayPrice != null && (
                                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-zan-red text-white font-bold font-heading px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-xs sm:text-sm uppercase tracking-wider shadow-lg">
                                    ৳{displayPrice}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                COURSE OVERVIEW — BENTO GRID
            ════════════════════════════════════════════ */}
            <section className="py-12 sm:py-16 lg:py-20 bg-surface-dark border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 sm:mb-14">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-heading uppercase tracking-wide mb-3">
                            Transforming Knowledge Into Skills
                        </h2>
                        <div className="w-14 h-0.5 bg-zan-cyan mx-auto rounded-full"></div>
                    </div>

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        {/* Description */}
                        <div className="md:col-span-2 p-5 sm:p-8 bg-zan-dark rounded-sm border border-white/5">
                            <h3 className="text-base sm:text-xl font-bold text-white font-heading uppercase tracking-wide mb-4 sm:mb-5">
                                Detailed Description
                            </h3>
                            <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base">
                                {course.short_description || 'Course details coming soon.'}
                            </p>
                        </div>
                        {/* Info card */}
                        <div className="p-5 sm:p-8 bg-zan-dark border border-zan-cyan/10 rounded-sm flex flex-col gap-4 sm:gap-5">
                            <div>
                                <span className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1">Category</span>
                                <span className="text-white font-bold font-heading uppercase">{course.category}</span>
                            </div>
                            {course.tags?.length > 0 && (
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-2">Topics</span>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {course.tags.map((tag, i) => (
                                            <span key={i} className="inline-flex items-center gap-1 text-xs font-mono text-zan-cyan border border-zan-cyan/20 bg-zan-cyan/5 px-2 py-0.5 rounded-sm">
                                                <Tag className="w-2.5 h-2.5 shrink-0" /> {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {course.schedules?.length > 0 && (
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1.5">Schedule</span>
                                    {course.schedules.map(s => (
                                        <div key={s.id} className="text-sm mb-1">
                                            <span className="text-zan-cyan text-xs font-mono uppercase">{s.course_type}: </span>
                                            <span className="text-gray-300 font-light">
                                                {new Date(s.start_datetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {displayPrice != null && (
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1">Price</span>
                                    <span className="text-xl sm:text-2xl font-bold text-white font-heading">৳{displayPrice}</span>
                                    {hasDiscount && <span className="text-sm text-gray-500 line-through ml-2">৳{course.price}</span>}
                                </div>
                            )}
                            <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
                                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-zan-cyan shrink-0" />
                                <div>
                                    <div className="text-white text-xs sm:text-sm font-bold font-heading uppercase">Certification Included</div>
                                    <div className="text-gray-500 text-xs font-light">Upon completion</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════════
                DESCRIPTION — FULL CONTENT
            ════════════════════════════════════════════ */}
            {course.description && (
                <section className="py-12 sm:py-16 lg:py-20 bg-zan-dark border-t border-white/5">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section header */}
                        <div className="flex items-center gap-4 mb-8 sm:mb-10">
                            <div className="w-1 h-8 bg-zan-cyan rounded-full shrink-0"></div>
                            <div>
                                <p className="font-mono text-xs uppercase tracking-widest text-zan-cyan mb-0.5">Full Content</p>
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-wide">Course Description</h2>
                            </div>
                        </div>

                        {/* Content card */}
                        <div className="bg-surface-dark rounded-xl border border-white/5 overflow-hidden">
                            {/* Top accent bar */}
                            <div className="h-0.5 w-full bg-gradient-to-r from-zan-cyan via-zan-cyan/40 to-transparent"></div>

                            <div className="p-5 sm:p-8 md:p-10">
                                <article
                                    className="
                                        max-w-none text-sm sm:text-base leading-7 sm:leading-8 text-gray-300 font-light

                                        [&_h1]:text-white [&_h1]:font-heading [&_h1]:uppercase [&_h1]:tracking-wide
                                        [&_h1]:text-xl [&_h1]:sm:text-2xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4
                                        [&_h1]:pb-2 [&_h1]:border-b [&_h1]:border-white/10

                                        [&_h2]:text-white [&_h2]:font-heading [&_h2]:uppercase [&_h2]:tracking-wide
                                        [&_h2]:text-lg [&_h2]:sm:text-xl [&_h2]:font-bold [&_h2]:mt-7 [&_h2]:mb-3
                                        [&_h2]:flex [&_h2]:items-center [&_h2]:gap-2
                                        [&_h2]:before:content-[''] [&_h2]:before:w-1 [&_h2]:before:h-5 [&_h2]:before:bg-zan-cyan [&_h2]:before:rounded-full [&_h2]:before:shrink-0

                                        [&_h3]:text-gray-100 [&_h3]:font-bold [&_h3]:font-heading [&_h3]:uppercase
                                        [&_h3]:text-base [&_h3]:sm:text-lg [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:tracking-wide

                                        [&_p]:text-gray-300 [&_p]:leading-7 [&_p]:sm:leading-8 [&_p]:mb-4 [&_p]:font-light

                                        [&_a]:text-zan-cyan [&_a]:underline [&_a]:underline-offset-2
                                        [&_a:hover]:text-white [&_a]:transition-colors [&_a]:break-all

                                        [&_strong]:text-white [&_strong]:font-semibold
                                        [&_em]:text-gray-200 [&_em]:italic

                                        [&_ul]:my-4 [&_ul]:pl-0 [&_ul]:space-y-2
                                        [&_ol]:my-4 [&_ol]:pl-0 [&_ol]:space-y-2
                                        [&_li]:text-gray-300 [&_li]:font-light [&_li]:flex [&_li]:gap-2 [&_li]:items-start
                                        [&_li]:before:content-['▸'] [&_li]:before:text-zan-cyan [&_li]:before:shrink-0 [&_li]:before:mt-0.5

                                        [&_blockquote]:my-6 [&_blockquote]:pl-4 [&_blockquote]:border-l-2 [&_blockquote]:border-zan-cyan
                                        [&_blockquote]:bg-zan-cyan/5 [&_blockquote]:py-3 [&_blockquote]:pr-4 [&_blockquote]:rounded-r-sm
                                        [&_blockquote]:text-gray-200 [&_blockquote]:italic

                                        [&_pre]:bg-black/60 [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-lg
                                        [&_pre]:p-4 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:text-xs [&_pre]:sm:text-sm
                                        [&_code]:font-mono [&_code]:text-zan-cyan [&_code]:text-xs [&_code]:sm:text-sm

                                        [&_img]:w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-5 [&_img]:border [&_img]:border-white/10
                                        [&_img]:shadow-lg [&_img]:object-cover

                                        [&_table]:w-full [&_table]:my-5 [&_table]:overflow-x-auto [&_table]:block
                                        [&_th]:text-left [&_th]:text-xs [&_th]:font-mono [&_th]:uppercase [&_th]:tracking-wider
                                        [&_th]:text-gray-400 [&_th]:border-b [&_th]:border-white/10 [&_th]:pb-2 [&_th]:px-3
                                        [&_td]:text-gray-300 [&_td]:text-sm [&_td]:py-2 [&_td]:px-3 [&_td]:border-b [&_td]:border-white/5
                                        [&_tr:hover_td]:bg-white/3

                                        [&_hr]:my-8 [&_hr]:border-white/10

                                        [&_.vid-wrap]:w-full [&_.vid-wrap]:rounded-lg [&_.vid-wrap]:overflow-hidden
                                        [&_.vid-wrap]:shadow-2xl [&_.vid-wrap]:my-6 [&_.vid-wrap]:border [&_.vid-wrap]:border-white/10
                                    "
                                    dangerouslySetInnerHTML={{ __html: descHtml }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ════════════════════════════════════════════
                COURSE FEATURES STRIP
            ════════════════════════════════════════════ */}
            <section className="py-10 sm:py-14 bg-surface-dark border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">

                        {/* Card 1 — dynamic from schedule (or fallback) */}
                        {(() => {
                            const s = course.schedules?.[0];
                            const type = s?.course_type?.toLowerCase().trim() ?? '';
                            let icon   = <Video className="w-6 h-6 sm:w-7 sm:h-7" />;
                            let label  = 'Live Classes';
                            let desc   = 'Real-time sessions with industry experts.';
                            let color  = 'text-zan-cyan';

                            if (s) {
                                if (type.includes('online') || type.includes('live')) {
                                    icon = <Monitor className="w-6 h-6 sm:w-7 sm:h-7" />; label = 'Online Live Class'; desc = 'Real-time interactive sessions with industry experts.';
                                } else if (type.includes('record')) {
                                    icon = <PlayCircle className="w-6 h-6 sm:w-7 sm:h-7" />; label = 'Recorded Class'; desc = 'Learn at your own pace with pre-recorded sessions.'; color = 'text-workshop-orange';
                                } else if (type.includes('offline') || type.includes('in-person')) {
                                    icon = <MapPin className="w-6 h-6 sm:w-7 sm:h-7" />; label = 'Offline / In-Person'; desc = 'Hands-on learning at our physical lab facility.';
                                } else if (type.includes('hybrid')) {
                                    icon = <Layers className="w-6 h-6 sm:w-7 sm:h-7" />; label = 'Hybrid Class'; desc = 'Flexible mix of online and in-person sessions.'; color = 'text-zan-neon';
                                } else {
                                    label = s.course_type; desc = 'Flexible learning format tailored to your needs.';
                                }
                            }

                            return (
                                <div className="p-4 sm:p-6 bg-zan-dark border border-white/5 rounded-sm hover:bg-white/3 transition-all">
                                    <div className={`${color} mb-3 sm:mb-4`}>{icon}</div>
                                    <h4 className="text-white font-bold font-heading uppercase tracking-wide text-xs sm:text-sm mb-1.5 sm:mb-2">{label}</h4>
                                    <p className="text-gray-500 text-xs font-light leading-relaxed hidden sm:block">{desc}</p>
                                    {s && (
                                        <p className={`text-xs font-mono mt-1 ${color} opacity-70 hidden sm:flex items-center gap-1`}>
                                            <Calendar className="w-3 h-3 shrink-0" />
                                            {new Date(s.start_datetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    )}
                                </div>
                            );
                        })()}

                        {/* Card 2 — Hands-on Projects */}
                        <div className="p-4 sm:p-6 bg-zan-dark border border-white/5 rounded-sm hover:bg-white/3 transition-all">
                            <div className="text-workshop-orange mb-3 sm:mb-4"><BookOpen className="w-6 h-6 sm:w-7 sm:h-7" /></div>
                            <h4 className="text-white font-bold font-heading uppercase tracking-wide text-xs sm:text-sm mb-1.5 sm:mb-2">Hands-on Projects</h4>
                            <p className="text-gray-500 text-xs font-light leading-relaxed hidden sm:block">Hardware kits and simulation software.</p>
                        </div>

                        {/* Card 3 — Certification */}
                        <div className="p-4 sm:p-6 bg-zan-dark border border-white/5 rounded-sm hover:bg-white/3 transition-all">
                            <div className="text-zan-cyan mb-3 sm:mb-4"><Award className="w-6 h-6 sm:w-7 sm:h-7" /></div>
                            <h4 className="text-white font-bold font-heading uppercase tracking-wide text-xs sm:text-sm mb-1.5 sm:mb-2">Certification</h4>
                            <p className="text-gray-500 text-xs font-light leading-relaxed hidden sm:block">Certificate recognised by top tech firms.</p>
                        </div>

                        {/* Card 4 — 1:1 Mentorship */}
                        <div className="p-4 sm:p-6 bg-zan-dark border border-white/5 rounded-sm hover:bg-white/3 transition-all">
                            <div className="text-workshop-orange mb-3 sm:mb-4"><Users className="w-6 h-6 sm:w-7 sm:h-7" /></div>
                            <h4 className="text-white font-bold font-heading uppercase tracking-wide text-xs sm:text-sm mb-1.5 sm:mb-2">1:1 Mentorship</h4>
                            <p className="text-gray-500 text-xs font-light leading-relaxed hidden sm:block">Direct mentor access for code review.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                CURRICULUM
            ════════════════════════════════════════════ */}
            {course.curriculums?.length > 0 && (
                <section className="py-12 sm:py-16 lg:py-20 bg-zan-dark border-t border-white/5">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4">
                            <div>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-heading uppercase tracking-wide mb-1 sm:mb-2">
                                    Curriculum Breakdown
                                </h2>
                                <p className="text-gray-400 font-light text-sm">
                                    {course.curriculums.length} module{course.curriculums.length !== 1 ? 's' : ''} — structured for progressive learning.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 bg-surface-dark border border-white/10 rounded-sm shrink-0">
                                <GraduationCap className="w-4 h-4 text-zan-cyan" />
                                <span className="text-xs font-mono uppercase tracking-wider text-gray-300">Cert. Included</span>
                            </div>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                            {course.curriculums.map((mod) => (
                                <div key={mod.id} className="group bg-surface-dark border border-white/5 rounded-sm overflow-hidden hover:border-zan-cyan/30 transition-colors">
                                    <button className="w-full flex items-center justify-between p-4 sm:p-6 text-left gap-3" onClick={() => toggleModule(mod.id)}>
                                        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                                            <span className="font-mono text-xs text-zan-cyan bg-zan-cyan/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm border border-zan-cyan/20 shrink-0 whitespace-nowrap">
                                                {String(mod.module_no).padStart(2, '0')}
                                            </span>
                                            <h3 className="font-bold text-white font-heading uppercase tracking-wide group-hover:text-zan-cyan transition-colors text-xs sm:text-sm md:text-base leading-snug">
                                                {mod.title}
                                            </h3>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-300 shrink-0 ${openModules.has(mod.id) ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openModules.has(mod.id) && mod.description && (
                                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-white/5">
                                            <p className="text-gray-400 font-light leading-relaxed mt-3 sm:mt-4 text-xs sm:text-sm">{mod.description}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ════════════════════════════════════════════
                MENTORS
            ════════════════════════════════════════════ */}
            {course.mentors?.length > 0 && (
                <section className="py-12 sm:py-16 lg:py-20 bg-surface-dark border-t border-white/5">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10 sm:mb-14">
                            <p className="font-mono text-xs uppercase tracking-widest text-zan-cyan mb-2">Expert Mentors</p>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-heading uppercase tracking-wide mb-3">Guided by Industry Leaders</h2>
                            <div className="w-14 h-0.5 bg-zan-cyan mx-auto rounded-full"></div>
                        </div>
                        <div className="space-y-12 sm:space-y-16">
                            {course.mentors.map((mentor, idx) => (
                                <div key={mentor.id} className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
                                    {/* Image with offset box */}
                                    <div className={`w-full max-w-xs sm:max-w-sm lg:max-w-none lg:w-1/3 relative shrink-0 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                                        <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-full h-full bg-zan-cyan/20 rounded-xl z-0"></div>
                                        <img
                                            src={mentor.image?.startsWith('http') ? mentor.image : `${API_BASE_URL}/${mentor.image}`}
                                            alt={mentor.name}
                                            className="relative z-10 w-full rounded-xl shadow-xl grayscale hover:grayscale-0 transition-all duration-500 object-cover aspect-square"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src =
                                                    'https://ui-avatars.com/api/?name=' + encodeURIComponent(mentor.name) + '&background=006970&color=fff&size=400';
                                            }}
                                        />
                                    </div>
                                    {/* Info */}
                                    <div className={`w-full lg:w-2/3 text-center lg:text-left ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                                        <span className="font-mono text-xs uppercase tracking-widest text-zan-cyan mb-2 sm:mb-3 block">
                                            {mentor.is_student_mentor ? 'Student Mentor' : 'Expert Mentor'}
                                        </span>
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-heading uppercase tracking-wide mb-3 sm:mb-4">
                                            {mentor.name}
                                        </h2>
                                        <p className="text-gray-400 font-light leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base">
                                            {mentor.description || 'Experienced professional passionate about cultivating the next generation of engineers.'}
                                        </p>
                                        {mentor.experience && (
                                            <div className="flex justify-center lg:justify-start gap-8 mb-5 sm:mb-6">
                                                <div>
                                                    <h4 className="text-xl sm:text-2xl font-bold text-zan-cyan font-heading mb-0.5">{mentor.experience}</h4>
                                                    <p className="font-mono text-xs uppercase tracking-widest text-gray-500">Experience</p>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ════════════════════════════════════════════
                FINAL CTA
            ════════════════════════════════════════════ */}
            <section className="py-12 sm:py-16 lg:py-20 bg-zan-dark border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-sm border border-zan-cyan/20 bg-surface-dark p-8 sm:p-12 md:p-16 lg:p-20 text-center">
                        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-zan-cyan/5 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none"></div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white font-heading uppercase tracking-wide mb-3 sm:mb-4 relative z-10">
                            Ready to Build the Future?
                        </h2>
                        <p className="text-gray-400 font-light mb-7 sm:mb-10 max-w-xl mx-auto relative z-10 text-sm sm:text-base">
                            {course.short_description || 'Limited seats available. Secure your spot now.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center relative z-10">
                            {course.reg_link && (
                                <a href={course.reg_link} target="_blank" rel="noopener noreferrer"
                                    className="px-8 sm:px-12 py-4 sm:py-5 bg-white text-zan-dark font-bold rounded-sm hover:bg-zan-cyan transition-colors shadow-xl font-heading uppercase tracking-wider text-sm sm:text-base">
                                    {displayPrice != null ? `Enroll · ৳${displayPrice}` : 'Enroll Now'}
                                </a>
                            )}
                            <button onClick={() => navigate('/courses')}
                                className="px-8 sm:px-12 py-4 sm:py-5 border-2 border-white/20 hover:border-white/50 text-white font-bold rounded-sm transition-all font-heading uppercase tracking-wider text-sm sm:text-base">
                                Browse Courses
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                MOBILE STICKY BAR
            ════════════════════════════════════════════ */}
            {course.reg_link && (
                <div className="fixed bottom-0 left-0 w-full px-4 py-3 bg-surface-dark/95 backdrop-blur-md border-t border-white/10 z-40 lg:hidden flex justify-between items-center gap-3 shadow-[0_-8px_30px_rgba(0,0,0,0.5)]">
                    <div className="min-w-0">
                        <p className="text-white font-bold text-sm font-heading tracking-wide uppercase truncate">Ready to start?</p>
                        {displayPrice != null && <p className="text-zan-cyan text-xs font-mono">৳{displayPrice}</p>}
                    </div>
                    <a href={course.reg_link} target="_blank" rel="noopener noreferrer"
                        className="shrink-0 bg-zan-red hover:bg-red-600 text-white px-5 py-2.5 rounded-sm font-bold text-xs transition-all font-heading uppercase tracking-wider">
                        Enroll Now
                    </a>
                </div>
            )}

        </div>
    );
};

export default CourseDetailsPage;
