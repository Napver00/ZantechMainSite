import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, ArrowRight, ChevronDown,
    Calendar, Award, Tag,
    Users, Video, BookOpen, GraduationCap,
    Monitor, PlayCircle, MapPin, Layers,
    CheckCircle2, Rocket, HelpCircle, Sparkles, Download, FileText,
} from 'lucide-react';
import { API_BASE_URL } from '../config';

/* ─── Interfaces ─────────────────────────────────────────── */
interface Lesson     { id: number; lesson_no: number | null; title: string; description: string | null; }
interface Curriculum { id: number; module_no: number; title: string; description: string; lessons?: Lesson[]; }
interface Project    { title: string; description?: string | null; }
interface Faq        { question: string; answer?: string | null; }
interface Schedule   { id: number; course_type: string; start_datetime: string; }
interface Mentor     { id: number; name: string; image: string; description: string; experience: string; is_student_mentor: boolean; }
interface CourseDetail {
    id: number; title: string; slug: string; thumbnail: string;
    category: string; tags: string[]; short_description: string;
    description: string; price: number | null; discount_price: number | null;
    payment_type: 'one_time' | 'monthly';
    admission_fee: number | null; duration_months: number | null; monthly_fee: number | null;
    reg_link: string; serial_number: number; status: string; is_active: boolean;
    meta_title: string; meta_description: string;
    age_group?: string | null; level?: string | null; session_duration?: string | null;
    total_activities?: string | null; total_quizzes?: number | null;
    includes?: string[]; skills?: string[]; projects?: Project[]; faqs?: Faq[];
    certificate_description?: string | null; curriculum_link?: string | null;
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
    const [openFaq, setOpenFaq]             = useState<number | null>(0);
    const [showFullDesc, setShowFullDesc]   = useState(false);

    /* fetch ─────────────────────────────────────────────── */
    useEffect(() => {
        const fetchCourse = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                const res    = await fetch(`${API_BASE_URL}/api/courses/${slug}`);
                const result = await res.json();
                if (res.ok && result.success) {
                    setCourse(result.data);
                    // First module open by default, like a syllabus preview
                    if (result.data.curriculums?.[0]) setOpenModules(new Set([result.data.curriculums[0].id]));
                    return;
                }

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
                        payment_type: 'one_time', admission_fee: null, duration_months: null, monthly_fee: null,
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
        setOpenModules(prev => { const s = new Set(prev); if (s.has(id)) s.delete(id); else s.add(id); return s; });

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

    const isMonthly    = course.payment_type === 'monthly';
    const displayPrice = isMonthly ? course.monthly_fee : (course.discount_price ?? course.price);
    const hasDiscount  = !isMonthly && course.discount_price != null && course.price != null && course.discount_price < course.price;

    /* "7 Modules · 44 Lessons · 100+ Activities · 44 Quizzes" */
    const moduleCount = course.curriculums?.length ?? 0;
    const lessonCount = course.curriculums?.reduce((n, m) => n + (m.lessons?.length ?? 0), 0) ?? 0;
    const courseStats = [
        moduleCount > 0 && `${moduleCount} Module${moduleCount !== 1 ? 's' : ''}`,
        lessonCount > 0 && `${lessonCount} Lesson${lessonCount !== 1 ? 's' : ''}`,
        course.total_activities && `${course.total_activities} Activities & Projects`,
        course.total_quizzes ? `${course.total_quizzes} Quizzes` : null,
    ].filter(Boolean) as string[];

    /* "This course includes" — admin list, else a sensible default from known data */
    const includes = course.includes?.length ? course.includes : [
        moduleCount > 0 && `${moduleCount} detailed module${moduleCount !== 1 ? 's' : ''}`,
        lessonCount > 0 && `${lessonCount} guided lessons`,
        course.session_duration && course.session_duration,
        course.duration_months && `${course.duration_months} month${course.duration_months !== 1 ? 's' : ''} program`,
        'Hands-on projects with real hardware',
        'Certificate upon completion',
        'Direct mentor support',
    ].filter(Boolean) as string[];

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

                            {/* Course stats + audience */}
                            {(courseStats.length > 0 || course.age_group || course.level) && (
                                <div className="mb-6 sm:mb-8 space-y-3">
                                    {courseStats.length > 0 && (
                                        <p className="font-mono text-xs sm:text-sm text-zan-cyan uppercase tracking-wider">
                                            {courseStats.join(' · ')}
                                        </p>
                                    )}
                                    {(course.age_group || course.level) && (
                                        <div className="flex flex-wrap gap-2">
                                            {course.age_group && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-sm text-xs font-mono text-gray-300">
                                                    <Users className="w-3 h-3 text-zan-cyan shrink-0" /> {course.age_group}
                                                </span>
                                            )}
                                            {course.level && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-sm text-xs font-mono text-gray-300">
                                                    <GraduationCap className="w-3 h-3 text-zan-cyan shrink-0" /> {course.level}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Price + CTA */}
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                {displayPrice != null ? (
                                    <div className="flex flex-col">
                                        <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">
                                            {isMonthly ? 'Monthly Fee' : 'Course Price'}
                                        </span>
                                        <div className="flex items-baseline gap-2 sm:gap-3">
                                            <span className="text-2xl sm:text-3xl font-bold text-white font-heading">
                                                ৳{displayPrice}{isMonthly && <span className="text-sm sm:text-base text-gray-400">/mo</span>}
                                            </span>
                                            {hasDiscount && <span className="text-base text-gray-500 line-through">৳{course.price}</span>}
                                        </div>
                                        {isMonthly && (course.admission_fee != null || course.duration_months != null) && (
                                            <span className="text-xs text-gray-500 font-light mt-1">
                                                {course.admission_fee != null && `৳${course.admission_fee} admission fee`}
                                                {course.admission_fee != null && course.duration_months != null && ' · '}
                                                {course.duration_months != null && `${course.duration_months} month${course.duration_months !== 1 ? 's' : ''} duration`}
                                            </span>
                                        )}
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
                                {course.curriculum_link && (
                                    <a href={course.curriculum_link} target="_blank" rel="noopener noreferrer"
                                        className="px-5 sm:px-7 py-3 sm:py-4 border border-zan-cyan/40 text-zan-cyan hover:bg-zan-cyan hover:text-black font-bold rounded-sm transition-all font-heading uppercase tracking-wider flex items-center gap-2 text-sm">
                                        <Download className="w-4 h-4" /> Download Curriculum
                                    </a>
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
                                    ৳{displayPrice}{isMonthly && '/mo'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                OVERVIEW — "WHAT IS THIS COURSE?" + INCLUDES
            ════════════════════════════════════════════ */}
            <section className="py-12 sm:py-16 lg:py-20 bg-surface-dark border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
                        {/* Left — description with show more */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-4 mb-6 sm:mb-8">
                                <div className="w-1 h-8 bg-zan-cyan rounded-full shrink-0"></div>
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-widest text-zan-cyan mb-0.5">Course Overview</p>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-wide">
                                        What is {course.title}?
                                    </h2>
                                </div>
                            </div>

                            <div className="bg-zan-dark rounded-xl border border-white/5 overflow-hidden">
                                <div className="h-0.5 w-full bg-gradient-to-r from-zan-cyan via-zan-cyan/40 to-transparent"></div>
                                <div className="p-5 sm:p-8">
                                    {descHtml ? (
                                        <>
                                            <div className={`relative ${showFullDesc ? '' : 'max-h-[420px] overflow-hidden'}`}>
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
                                                {!showFullDesc && (
                                                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-zan-dark to-transparent pointer-events-none"></div>
                                                )}
                                            </div>
                                            <button onClick={() => setShowFullDesc(v => !v)}
                                                className="mt-4 inline-flex items-center gap-1.5 text-zan-cyan font-mono text-xs uppercase tracking-widest hover:text-white transition-colors">
                                                {showFullDesc ? 'Show less' : 'Show more'}
                                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFullDesc ? 'rotate-180' : ''}`} />
                                            </button>
                                        </>
                                    ) : (
                                        <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base">
                                            {course.short_description || 'Course details coming soon.'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right — "This course includes" */}
                        <aside className="lg:sticky lg:top-24 p-5 sm:p-7 bg-zan-dark border border-zan-cyan/15 rounded-xl">
                            <h3 className="text-base sm:text-lg font-bold text-white font-heading uppercase tracking-wide mb-4 sm:mb-5">
                                This course includes
                            </h3>
                            <ul className="space-y-3 mb-6">
                                {includes.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300 font-light leading-snug">
                                        <CheckCircle2 className="w-4 h-4 text-zan-cyan shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {course.curriculum_link && (
                                <a href={course.curriculum_link} target="_blank" rel="noopener noreferrer"
                                    className="group/cur relative flex items-center gap-3 mb-6 p-3.5 rounded-lg border border-zan-cyan/50 bg-zan-cyan/10 hover:bg-zan-cyan hover:border-zan-cyan transition-all shadow-[0_0_20px_rgba(0,240,255,0.12)] hover:shadow-[0_0_25px_rgba(0,240,255,0.35)]">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-md bg-zan-cyan/15 group-hover/cur:bg-black/15 shrink-0">
                                        <FileText className="w-5 h-5 text-zan-cyan group-hover/cur:text-black" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block text-sm font-bold text-white group-hover/cur:text-black font-heading uppercase tracking-wide">
                                            View Full Curriculum
                                        </span>
                                        <span className="block text-xs text-gray-400 group-hover/cur:text-black/70 font-light">
                                            Every module & lesson · PDF
                                        </span>
                                    </span>
                                    <Download className="w-4 h-4 text-zan-cyan group-hover/cur:text-black shrink-0" />
                                </a>
                            )}

                            {course.tags?.length > 0 && (
                                <div className="mb-6">
                                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-2">Topics</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {course.tags.map((tag, i) => (
                                            <span key={i} className="inline-flex items-center gap-1 text-xs font-mono text-zan-cyan border border-zan-cyan/20 bg-zan-cyan/5 px-2 py-0.5 rounded-sm">
                                                <Tag className="w-2.5 h-2.5 shrink-0" /> {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="pt-5 border-t border-white/5">
                                {displayPrice != null ? (
                                    <div className="mb-4">
                                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-1">
                                            {isMonthly ? 'Monthly Fee' : 'Price'}
                                        </span>
                                        <span className="text-2xl font-bold text-white font-heading">
                                            ৳{displayPrice}{isMonthly && <span className="text-sm text-gray-400">/mo</span>}
                                        </span>
                                        {hasDiscount && <span className="text-sm text-gray-500 line-through ml-2">৳{course.price}</span>}
                                        {isMonthly && course.admission_fee != null && (
                                            <div className="text-xs text-gray-500 font-light mt-1">৳{course.admission_fee} admission fee</div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="mb-4 text-2xl font-bold text-zan-cyan font-heading">Free</div>
                                )}
                                {course.reg_link ? (
                                    <a href={course.reg_link} target="_blank" rel="noopener noreferrer"
                                        className="w-full px-6 py-3 bg-zan-red hover:bg-red-600 text-white font-bold rounded-sm transition-all font-heading uppercase tracking-wider flex items-center justify-center gap-2 text-sm">
                                        Enroll Now <ArrowRight className="w-4 h-4" />
                                    </a>
                                ) : (
                                    <button disabled className="w-full px-6 py-3 bg-gray-700 text-gray-400 font-bold rounded-sm cursor-not-allowed font-heading uppercase tracking-wider text-sm">
                                        Registration Closed
                                    </button>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                CURRICULUM — MODULES → LESSONS
            ════════════════════════════════════════════ */}
            {course.curriculums?.length > 0 && (
                <section className="py-12 sm:py-16 lg:py-20 bg-zan-dark border-t border-white/5">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4">
                            <div>
                                <p className="font-mono text-xs uppercase tracking-widest text-zan-cyan mb-1">Our Curriculum</p>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-heading uppercase tracking-wide mb-1 sm:mb-2">
                                    Curriculum Breakdown
                                </h2>
                                <p className="text-gray-400 font-light text-sm">
                                    {courseStats.length > 0 ? courseStats.join(' · ') : `${moduleCount} modules — structured for progressive learning.`}
                                </p>
                            </div>
                            {course.curriculum_link ? (
                                <a href={course.curriculum_link} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 bg-surface-dark border border-zan-cyan/30 hover:border-zan-cyan rounded-sm shrink-0 transition-colors">
                                    <Download className="w-4 h-4 text-zan-cyan" />
                                    <span className="text-xs font-mono uppercase tracking-wider text-gray-300">Download Curriculum</span>
                                </a>
                            ) : (
                                <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 bg-surface-dark border border-white/10 rounded-sm shrink-0">
                                    <GraduationCap className="w-4 h-4 text-zan-cyan" />
                                    <span className="text-xs font-mono uppercase tracking-wider text-gray-300">Cert. Included</span>
                                </div>
                            )}
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                            {course.curriculums.map((mod) => {
                                const isOpen = openModules.has(mod.id);
                                const lessons = mod.lessons ?? [];
                                return (
                                    <div key={mod.id} className={`group bg-surface-dark border rounded-sm overflow-hidden transition-colors ${isOpen ? 'border-zan-cyan/30' : 'border-white/5 hover:border-zan-cyan/30'}`}>
                                        <button className="w-full flex items-start justify-between p-4 sm:p-6 text-left gap-3" onClick={() => toggleModule(mod.id)}>
                                            <div className="flex items-start gap-3 sm:gap-5 min-w-0">
                                                <span className="font-mono text-xs text-zan-cyan bg-zan-cyan/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm border border-zan-cyan/20 shrink-0 whitespace-nowrap">
                                                    Module {mod.module_no}
                                                </span>
                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-white font-heading uppercase tracking-wide group-hover:text-zan-cyan transition-colors text-sm md:text-base leading-snug">
                                                        {mod.title}
                                                    </h3>
                                                    {mod.description && (
                                                        <p className="text-gray-400 font-light leading-relaxed mt-1.5 text-xs sm:text-sm">{mod.description}</p>
                                                    )}
                                                    {lessons.length > 0 && (
                                                        <p className="text-gray-500 font-mono text-xs mt-2">{lessons.length} lesson{lessons.length !== 1 ? 's' : ''}</p>
                                                    )}
                                                </div>
                                            </div>
                                            {lessons.length > 0 && (
                                                <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-300 shrink-0 mt-1 ${isOpen ? 'rotate-180' : ''}`} />
                                            )}
                                        </button>
                                        {isOpen && lessons.length > 0 && (
                                            <ol className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-white/5 divide-y divide-white/5">
                                                {lessons.map((lesson, i) => (
                                                    <li key={lesson.id} className="py-3 sm:py-4 flex gap-3 sm:gap-4">
                                                        <span className="font-mono text-xs text-gray-500 shrink-0 w-16 sm:w-20 pt-0.5">
                                                            Lesson {lesson.lesson_no ?? i + 1}
                                                        </span>
                                                        <div className="min-w-0">
                                                            <h4 className="text-white text-sm font-semibold leading-snug">{lesson.title}</h4>
                                                            {lesson.description && (
                                                                <p className="text-gray-400 font-light text-xs sm:text-sm leading-relaxed mt-1">{lesson.description}</p>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ol>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ════════════════════════════════════════════
                SKILLS YOU'LL GAIN
            ════════════════════════════════════════════ */}
            {(course.skills?.length ?? 0) > 0 && (
                <section className="py-12 sm:py-16 lg:py-20 bg-surface-dark border-t border-white/5">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10 sm:mb-14">
                            <p className="font-mono text-xs uppercase tracking-widest text-zan-cyan mb-2">Learning Outcomes</p>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-heading uppercase tracking-wide mb-3">Skills You'll Gain</h2>
                            <div className="w-14 h-0.5 bg-zan-cyan mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {course.skills!.map((skill, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 sm:p-5 bg-zan-dark border border-white/5 rounded-sm hover:border-zan-cyan/30 transition-colors">
                                    <Sparkles className="w-5 h-5 text-zan-cyan shrink-0 mt-0.5" />
                                    <span className="text-gray-300 text-sm font-light leading-relaxed">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ════════════════════════════════════════════
                CERTIFICATE
            ════════════════════════════════════════════ */}
            {course.certificate_description && (
                <section className="py-12 sm:py-16 lg:py-20 bg-zan-dark border-t border-white/5">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative overflow-hidden grid md:grid-cols-[auto,1fr] gap-6 sm:gap-10 items-center p-6 sm:p-10 bg-surface-dark border border-zan-cyan/20 rounded-xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-zan-cyan/5 rounded-full blur-[80px] pointer-events-none"></div>
                            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-zan-cyan/10 border border-zan-cyan/30 flex items-center justify-center mx-auto md:mx-0 relative z-10">
                                <Award className="w-10 h-10 sm:w-14 sm:h-14 text-zan-cyan" />
                            </div>
                            <div className="relative z-10 text-center md:text-left">
                                <p className="font-mono text-xs uppercase tracking-widest text-zan-cyan mb-2">Certification</p>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-heading uppercase tracking-wide mb-3 sm:mb-4">
                                    Earn Your Certificate
                                </h2>
                                <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base whitespace-pre-line">{course.certificate_description}</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ════════════════════════════════════════════
                PROJECTS STUDENTS BUILD
            ════════════════════════════════════════════ */}
            {(course.projects?.length ?? 0) > 0 && (
                <section className="py-12 sm:py-16 lg:py-20 bg-surface-dark border-t border-white/5">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10 sm:mb-14">
                            <p className="font-mono text-xs uppercase tracking-widest text-zan-cyan mb-2">Build As You Learn</p>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-heading uppercase tracking-wide mb-3">Projects You'll Build</h2>
                            <div className="w-14 h-0.5 bg-zan-cyan mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {course.projects!.map((project, i) => (
                                <div key={i} className="p-5 sm:p-6 bg-zan-dark border border-white/5 rounded-sm hover:border-workshop-orange/40 transition-colors">
                                    <div className="text-workshop-orange mb-3 sm:mb-4"><Rocket className="w-6 h-6 sm:w-7 sm:h-7" /></div>
                                    <h3 className="text-white font-bold font-heading uppercase tracking-wide text-sm sm:text-base mb-2">{project.title}</h3>
                                    {project.description && (
                                        <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">{project.description}</p>
                                    )}
                                </div>
                            ))}
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
                FAQ
            ════════════════════════════════════════════ */}
            {(course.faqs?.length ?? 0) > 0 && (
                <section className="py-12 sm:py-16 lg:py-20 bg-zan-dark border-t border-white/5">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10 sm:mb-14">
                            <p className="font-mono text-xs uppercase tracking-widest text-zan-cyan mb-2">Got Questions?</p>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-heading uppercase tracking-wide mb-3">Frequently Asked Questions</h2>
                            <div className="w-14 h-0.5 bg-zan-cyan mx-auto rounded-full"></div>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                            {course.faqs!.map((faq, i) => (
                                <div key={i} className={`bg-surface-dark border rounded-sm overflow-hidden transition-colors ${openFaq === i ? 'border-zan-cyan/30' : 'border-white/5 hover:border-zan-cyan/30'}`}>
                                    <button className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-3" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                        <span className="flex items-center gap-3 min-w-0">
                                            <HelpCircle className="w-4 h-4 text-zan-cyan shrink-0" />
                                            <span className="text-white font-semibold text-sm sm:text-base leading-snug">{faq.question}</span>
                                        </span>
                                        <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openFaq === i && faq.answer && (
                                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pl-11 sm:pl-12">
                                            <p className="text-gray-400 font-light leading-relaxed text-xs sm:text-sm whitespace-pre-line">{faq.answer}</p>
                                        </div>
                                    )}
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
                                    {displayPrice != null ? `Enroll · ৳${displayPrice}${isMonthly ? '/mo' : ''}` : 'Enroll Now'}
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
                        {displayPrice != null && <p className="text-zan-cyan text-xs font-mono">৳{displayPrice}{isMonthly && '/mo'}</p>}
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
