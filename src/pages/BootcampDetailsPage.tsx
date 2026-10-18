import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, ArrowRight, CalendarDays, MapPin, Users, Clock, Timer, CheckCircle2,
    Rocket, ChevronDown, HelpCircle, Sparkles, Flame, Download,
} from 'lucide-react';
import { API_BASE_URL } from '../config';
import {
    type BootcampSummary, bootcampStatus, STATUS_LABEL, fmtRange, fmtDay, dayCount, seatsLeft,
    realPrice, hasDiscount, fmtTk, daysUntil,
} from '../utils/bootcamp';

interface Lesson { id: number; title: string; description: string | null; }
interface AgendaDay { id: number; module_no: number; title: string; description: string; lessons?: Lesson[]; }
interface Mentor { id: number; name: string; image: string; description: string; experience: string; is_student_mentor: boolean; }
interface Bootcamp extends BootcampSummary {
    kind?: string; description: string; session_duration?: string | null;
    includes?: string[]; skills?: string[]; projects?: { title: string; description?: string | null }[];
    faqs?: { question: string; answer?: string | null }[]; class_slots?: string[];
    certificate_description?: string | null; curriculum_link?: string | null;
    curriculums: AgendaDay[]; mentors: Mentor[]; status: string; is_active: boolean;
}

const SectionTitle = ({ kicker, title }: { kicker: string; title: string }) => (
    <div className="mb-6 sm:mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-zan-cyan mb-1">{kicker}</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-heading uppercase tracking-wide">{title}</h2>
    </div>
);

const BootcampDetailsPage = () => {
    const { slug } = useParams();
    const [b, setB] = useState<Bootcamp | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showMore, setShowMore] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        fetch(`${API_BASE_URL}/api/courses/${slug}`)
            .then((r) => r.json())
            .then((res) => {
                if (!res.success || !res.data) throw new Error();
                setB(res.data);
            })
            .catch(() => setError('Bootcamp not found.'))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen bg-zan-dark flex items-center justify-center">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-zan-cyan"></div>
        </div>
    );
    if (error || !b) return (
        <div className="min-h-screen bg-zan-dark flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-4 font-heading uppercase tracking-wide">{error || 'Bootcamp not found'}</h2>
            <Link to="/bootcamps" className="text-zan-cyan font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> All Bootcamps
            </Link>
        </div>
    );

    const status = bootcampStatus(b);
    const canRegister = (status === 'open' || status === 'closing') && b.status === 'published' && b.is_active;
    const days = dayCount(b.start_date, b.end_date);
    const left = seatsLeft(b);
    const price = realPrice(b);
    const save = hasDiscount(b) ? Math.round((1 - Number(b.discount_price) / Number(b.price)) * 100) : 0;
    const kitFee = Number(b.admission_fee) > 0 ? Number(b.admission_fee) : 0;
    const startsIn = daysUntil(b.start_date);
    const filled = b.seats ? Math.min(100, Math.round(((b.seats_taken || 0) / b.seats) * 100)) : 0;
    const agenda = [...(b.curriculums || [])].sort((x, y) => x.module_no - y.module_no);

    const ctaLabel = canRegister ? 'Register Now' : STATUS_LABEL[status];
    const RegisterButton = ({ className }: { className: string }) => canRegister ? (
        <Link to={`/bootcamp/${b.slug}/register`} className={`bg-zan-red hover:bg-red-600 text-white ${className}`}>
            {ctaLabel} <ArrowRight className="w-4 h-4" />
        </Link>
    ) : (
        <span className={`bg-gray-700 text-gray-400 cursor-not-allowed ${className}`}>{ctaLabel}</span>
    );
    const btn = 'inline-flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-sm transition-all font-heading uppercase tracking-wider text-sm';

    return (
        <div className="min-h-screen bg-zan-dark font-sans">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

            {/* ── HERO ── */}
            <section className="relative overflow-hidden pt-24 pb-12 sm:pt-28 lg:pt-32 lg:pb-20">
                <div className="absolute top-0 right-0 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-zan-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link to="/bootcamps"
                        className="inline-flex items-center mb-6 text-zan-cyan bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-sm border border-white/10 font-mono text-xs uppercase tracking-widest">
                        <ArrowLeft className="w-3 h-3 mr-2" /> All Bootcamps
                    </Link>

                    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                        <div className="lg:col-span-3 order-2 lg:order-1">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-zan-cyan/10 border border-zan-cyan/20 text-zan-cyan font-mono text-xs uppercase tracking-widest">
                                    Bootcamp{b.category ? ` · ${b.category}` : ''}
                                </span>
                                <span className={`px-2.5 py-1 rounded-sm text-[11px] font-mono font-bold uppercase tracking-wider ${
                                    status === 'open' ? 'bg-zan-neon/90 text-black' : status === 'closing' ? 'bg-orange-500 text-black'
                                    : status === 'soldout' ? 'bg-zan-red text-white' : 'bg-gray-700 text-gray-200'}`}>
                                    {status === 'closing' && <Flame className="w-3 h-3 inline -mt-0.5 mr-1" />}{STATUS_LABEL[status]}
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 font-heading uppercase tracking-wide">{b.title}</h1>
                            {b.short_description && <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light mb-6">{b.short_description}</p>}

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {[
                                    { icon: CalendarDays, label: 'Dates', value: `${fmtRange(b.start_date, b.end_date)}${days && days > 1 ? ` · ${days} days` : ''}` },
                                    { icon: MapPin, label: 'Venue', value: b.venue },
                                    { icon: Users, label: 'Age', value: b.age_group },
                                    { icon: Clock, label: 'Daily', value: b.session_duration },
                                ].filter((x) => x.value).map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="flex items-start gap-2.5 p-3 bg-surface-dark border border-white/5 rounded-lg">
                                        <Icon className="w-4 h-4 text-zan-cyan shrink-0 mt-0.5" />
                                        <div className="min-w-0">
                                            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">{label}</p>
                                            <p className="text-sm text-white leading-snug">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Booking card */}
                        <aside className="lg:col-span-2 order-1 lg:order-2 lg:sticky lg:top-24 bg-surface-dark border border-zan-cyan/20 rounded-xl overflow-hidden">
                            {b.thumbnail && (
                                <div className="relative">
                                    <img src={b.thumbnail} alt={b.title} className="w-full h-48 sm:h-56 object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    {startsIn !== null && startsIn > 0 && status !== 'ended' && (
                                        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-zan-dark/90 border border-zan-cyan/30 text-white text-xs font-mono px-2.5 py-1 rounded-sm">
                                            <Timer className="w-3.5 h-3.5 text-zan-cyan" /> Starts in {startsIn} day{startsIn !== 1 ? 's' : ''}
                                        </span>
                                    )}
                                </div>
                            )}
                            <div className="p-5 sm:p-6">
                                <p className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2">
                                    Bootcamp fee
                                    {save > 0 && <span className="px-1.5 py-0.5 rounded-sm bg-zan-red text-white text-[10px] tracking-wider">Save {save}%</span>}
                                </p>
                                {price != null && Number(price) > 0 ? (
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-3xl font-bold text-white font-heading">৳{fmtTk(price)}</span>
                                        {hasDiscount(b) && <span className="text-base text-gray-500 line-through">৳{fmtTk(b.price)}</span>}
                                    </div>
                                ) : <div className="text-3xl font-bold text-zan-cyan font-heading mb-1">Free</div>}
                                {kitFee > 0 && <p className="text-xs text-gray-400">+ ৳{fmtTk(kitFee)} {b.admission_fee_label || 'Admission fee'} (one-time)</p>}

                                {b.seats ? (
                                    <div className="mt-5">
                                        <div className="flex justify-between text-xs font-mono mb-1.5">
                                            <span className={left !== null && left <= 5 ? 'text-orange-400' : 'text-gray-400'}>
                                                {left ? `${left} of ${b.seats} seats left` : 'All seats booked'}
                                            </span>
                                            <span className="text-gray-500">{filled}% booked</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${filled >= 85 ? 'bg-zan-red' : 'bg-zan-cyan'}`} style={{ width: `${filled}%` }}></div>
                                        </div>
                                    </div>
                                ) : null}
                                {b.registration_deadline && status !== 'ended' && (
                                    <p className="text-xs text-gray-400 mt-3">Registration closes {fmtDay(b.registration_deadline)}</p>
                                )}

                                <RegisterButton className={`${btn} w-full mt-5`} />
                                {b.curriculum_link && (
                                    <a href={b.curriculum_link} target="_blank" rel="noopener noreferrer"
                                        className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-zan-cyan/40 text-zan-cyan hover:bg-zan-cyan hover:text-black rounded-sm text-xs font-bold font-heading uppercase tracking-wider transition-colors">
                                        <Download className="w-4 h-4" /> Bootcamp Plan (PDF)
                                    </a>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* ── ABOUT ── */}
            {b.description && (
                <section className="py-12 sm:py-16 bg-surface-dark border-t border-white/5">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionTitle kicker="Overview" title="About this Bootcamp" />
                        <div className={`relative ${showMore ? '' : 'max-h-64 overflow-hidden'}`}>
                            <div className="text-gray-300 font-light leading-7 [&_p]:mb-4 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h2]:font-bold [&_h3]:font-bold [&_h2]:mt-6 [&_h2]:mb-2 [&_h3]:mt-4 [&_h3]:mb-2 [&_strong]:text-white [&_a]:text-zan-cyan [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_img]:rounded-lg [&_img]:my-4 [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-lg"
                                dangerouslySetInnerHTML={{ __html: b.description }} />
                            {!showMore && <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none"></div>}
                        </div>
                        <button onClick={() => setShowMore((v) => !v)}
                            className="mt-3 inline-flex items-center gap-1.5 text-zan-cyan font-mono text-xs uppercase tracking-widest hover:text-white">
                            {showMore ? 'Show less' : 'Show more'} <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </section>
            )}

            {/* ── AGENDA ── */}
            {agenda.length > 0 && (
                <section className="py-12 sm:py-16 bg-zan-dark border-t border-white/5">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionTitle kicker="Day by day" title="Bootcamp Agenda" />
                        <ol className="relative border-l border-zan-cyan/20 ml-3 space-y-6">
                            {agenda.map((d, i) => {
                                const date = b.start_date ? new Date(`${b.start_date}T00:00:00`) : null;
                                if (date) date.setDate(date.getDate() + i);
                                return (
                                    <li key={d.id} className="pl-6 relative">
                                        <span className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-zan-dark border-2 border-zan-cyan flex items-center justify-center text-[10px] font-bold text-zan-cyan">{i + 1}</span>
                                        <p className="font-mono text-xs uppercase tracking-widest text-zan-cyan mb-1">
                                            Day {i + 1}{date && days && i < days ? ` · ${date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}` : ''}
                                        </p>
                                        <h3 className="text-white font-bold font-heading uppercase tracking-wide">{d.title}</h3>
                                        {d.description && <p className="text-sm text-gray-400 font-light leading-relaxed mt-1">{d.description}</p>}
                                        {(d.lessons?.length ?? 0) > 0 && (
                                            <ul className="mt-2 space-y-1">
                                                {d.lessons!.map((l) => (
                                                    <li key={l.id} className="flex gap-2 text-sm text-gray-300">
                                                        <CheckCircle2 className="w-4 h-4 text-zan-cyan shrink-0 mt-0.5" />
                                                        <span>{l.title}{l.description ? <span className="text-gray-500"> — {l.description}</span> : null}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </section>
            )}

            {/* ── BATCHES ── */}
            {(b.class_slots?.length ?? 0) > 0 && (
                <section className="py-12 sm:py-16 bg-surface-dark border-t border-white/5">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionTitle kicker="Pick your time" title="Batches" />
                        <div className="grid sm:grid-cols-2 gap-3">
                            {b.class_slots!.map((s) => (
                                <div key={s} className="flex items-center gap-3 p-4 bg-zan-dark border border-white/5 rounded-lg">
                                    <Clock className="w-5 h-5 text-zan-cyan shrink-0" /><span className="text-sm text-gray-200">{s}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── BUILD + INCLUDED ── */}
            {((b.projects?.length ?? 0) > 0 || (b.includes?.length ?? 0) > 0 || (b.skills?.length ?? 0) > 0) && (
                <section className="py-12 sm:py-16 bg-zan-dark border-t border-white/5">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
                        {(b.projects?.length ?? 0) > 0 && (
                            <div>
                                <SectionTitle kicker="Build as you learn" title="What Kids Will Build" />
                                <div className="space-y-3">
                                    {b.projects!.map((p, i) => (
                                        <div key={i} className="flex gap-3 p-4 bg-surface-dark border border-white/5 rounded-lg">
                                            <Rocket className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                                            <div>
                                                <h3 className="text-white font-bold text-sm uppercase tracking-wide">{p.title}</h3>
                                                {p.description && <p className="text-sm text-gray-400 font-light mt-0.5">{p.description}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {((b.includes?.length ?? 0) > 0 || (b.skills?.length ?? 0) > 0) && (
                            <div>
                                <SectionTitle kicker="Everything included" title="What You Get" />
                                <ul className="space-y-2.5">
                                    {(b.includes ?? []).map((x, i) => (
                                        <li key={`i${i}`} className="flex gap-2.5 text-gray-300 text-sm"><CheckCircle2 className="w-4 h-4 text-zan-cyan shrink-0 mt-0.5" />{x}</li>
                                    ))}
                                    {(b.skills ?? []).map((x, i) => (
                                        <li key={`s${i}`} className="flex gap-2.5 text-gray-300 text-sm"><Sparkles className="w-4 h-4 text-zan-neon shrink-0 mt-0.5" />{x}</li>
                                    ))}
                                </ul>
                                {b.certificate_description && (
                                    <p className="mt-5 p-4 border border-zan-cyan/20 bg-zan-cyan/5 rounded-lg text-sm text-gray-300">{b.certificate_description}</p>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ── MENTORS ── */}
            {b.mentors?.length > 0 && (
                <section className="py-12 sm:py-16 bg-surface-dark border-t border-white/5">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionTitle kicker="Your mentors" title="Meet the Mentors" />
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {b.mentors.map((m) => (
                                <div key={m.id} className="flex items-center gap-4 p-4 bg-zan-dark border border-white/5 rounded-lg">
                                    <img src={m.image?.startsWith('http') ? m.image : `${API_BASE_URL}/${m.image}`} alt={m.name}
                                        className="w-16 h-16 rounded-full object-cover border border-zan-cyan/30 shrink-0"
                                        onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=006970&color=fff`; }} />
                                    <div className="min-w-0">
                                        <h3 className="text-white font-bold leading-tight">{m.name}</h3>
                                        <p className="text-xs font-mono uppercase tracking-wider text-zan-cyan">{m.is_student_mentor ? 'Student Mentor' : 'Mentor'}</p>
                                        {m.experience && <p className="text-xs text-gray-400 mt-0.5 truncate">{m.experience}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── FAQ ── */}
            {(b.faqs?.length ?? 0) > 0 && (
                <section className="py-12 sm:py-16 bg-zan-dark border-t border-white/5">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionTitle kicker="Parents ask" title="FAQ" />
                        <div className="space-y-2">
                            {b.faqs!.map((f, i) => (
                                <div key={i} className={`bg-surface-dark border rounded-sm ${openFaq === i ? 'border-zan-cyan/30' : 'border-white/5'}`}>
                                    <button className="w-full flex items-center justify-between p-4 text-left gap-3" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                        <span className="flex items-center gap-3"><HelpCircle className="w-4 h-4 text-zan-cyan shrink-0" /><span className="text-white font-semibold text-sm">{f.question}</span></span>
                                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openFaq === i && f.answer && <p className="px-4 pb-4 pl-11 text-sm text-gray-400 font-light leading-relaxed whitespace-pre-line">{f.answer}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── FINAL CTA ── */}
            <section className="py-12 sm:py-16 bg-surface-dark border-t border-white/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading uppercase tracking-wide mb-3">
                        {status === 'ended' ? 'This bootcamp has finished' : 'Save your seat'}
                    </h2>
                    <p className="text-gray-400 font-light mb-7">
                        {status === 'ended' ? 'See what’s coming next.' : `${fmtRange(b.start_date, b.end_date)}${b.venue ? ` · ${b.venue}` : ''}`}
                    </p>
                    {status === 'ended' ? (
                        <Link to="/bootcamps" className={`${btn} bg-zan-cyan text-black hover:bg-white`}>Upcoming Bootcamps <ArrowRight className="w-4 h-4" /></Link>
                    ) : <RegisterButton className={btn} />}
                </div>
            </section>

            {/* ── MOBILE BAR ── */}
            {canRegister && (
                <div className="fixed bottom-0 left-0 w-full px-4 py-3 bg-surface-dark/95 backdrop-blur-md border-t border-white/10 z-40 lg:hidden flex justify-between items-center gap-3">
                    <div className="min-w-0">
                        <p className="text-white font-bold text-sm font-heading uppercase truncate">{fmtRange(b.start_date, b.end_date)}</p>
                        <p className="text-zan-cyan text-xs font-mono">{price ? `৳${fmtTk(price)}` : 'Free'}{left !== null ? ` · ${left} seats left` : ''}</p>
                    </div>
                    <Link to={`/bootcamp/${b.slug}/register`} className="shrink-0 bg-zan-red hover:bg-red-600 text-white px-5 py-2.5 rounded-sm font-bold text-xs font-heading uppercase tracking-wider">
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
};

export default BootcampDetailsPage;
