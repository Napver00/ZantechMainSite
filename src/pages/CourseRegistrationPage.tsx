import { useState, useEffect, type FormEvent, type ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, ArrowRight, CheckCircle2, Copy, Check, User, Users,
    CalendarClock, Wallet, Landmark, Smartphone, AlertCircle, Loader2,
} from 'lucide-react';
import { API_BASE_URL } from '../config';

/* ─── Interfaces ─────────────────────────────────────────── */
interface Course {
    id: number; title: string; slug: string; thumbnail: string; category: string;
    price: number | null; discount_price: number | null;
    payment_type: 'one_time' | 'monthly';
    admission_fee: number | null; duration_months: number | null; monthly_fee: number | null;
    age_group?: string | null; session_duration?: string | null;
    class_slots?: string[]; status: string; is_active: boolean;
}
interface PaymentMethod {
    id: number; type: 'bkash' | 'nagad' | 'rocket' | 'bank' | 'other'; title: string;
    account_number: string; account_name: string | null; account_type: string | null;
    bank_name: string | null; branch_name: string | null; routing_number: string | null;
    instructions: string | null;
}
interface Success { reference: string; course_title: string; }

type Errors = Record<string, string>;

const emptyForm = {
    student_name: '', email: '', age_class: '', school_name: '',
    guardian_name: '', contact_number: '', alt_contact_number: '',
    class_slot: '', payment_method_id: '', payer_account: '', transaction_id: '', amount: '',
};

/* Brand colour per wallet so the selected method is easy to recognise */
const METHOD_STYLE: Record<PaymentMethod['type'], { ring: string; text: string; bg: string }> = {
    bkash:  { ring: 'border-pink-500',   text: 'text-pink-400',   bg: 'bg-pink-500/10' },
    nagad:  { ring: 'border-orange-500', text: 'text-orange-400', bg: 'bg-orange-500/10' },
    rocket: { ring: 'border-purple-500', text: 'text-purple-400', bg: 'bg-purple-500/10' },
    bank:   { ring: 'border-zan-cyan',   text: 'text-zan-cyan',   bg: 'bg-zan-cyan/10' },
    other:  { ring: 'border-zan-cyan',   text: 'text-zan-cyan',   bg: 'bg-zan-cyan/10' },
};

const fmt = (n: number | string | null | undefined) =>
    n == null || n === '' ? '' : Number(n).toLocaleString('en-BD', { maximumFractionDigits: 2 });

/* ─── Small building blocks ─────────────────────────────── */
const Section = ({ icon, step, title, children }: { icon: ReactNode; step: number; title: string; children: ReactNode }) => (
    <section className="bg-surface-dark border border-white/5 rounded-xl p-5 sm:p-7">
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="flex items-center justify-center w-9 h-9 rounded-md bg-zan-cyan/10 text-zan-cyan shrink-0">{icon}</span>
            <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-gray-500">Step {step}</p>
                <h2 className="text-base sm:text-lg font-bold text-white font-heading uppercase tracking-wide">{title}</h2>
            </div>
        </div>
        {children}
    </section>
);

const Field = ({
    label, name, value, onChange, error, required, type = 'text', placeholder, hint, inputMode,
}: {
    label: string; name: string; value: string; onChange: (name: string, v: string) => void;
    error?: string; required?: boolean; type?: string; placeholder?: string; hint?: string;
    inputMode?: 'text' | 'tel' | 'email' | 'numeric' | 'decimal';
}) => (
    <label className="block">
        <span className="block text-sm text-gray-300 mb-1.5">
            {label} {required && <span className="text-zan-red">*</span>}
        </span>
        <input
            type={type}
            name={name}
            value={value}
            inputMode={inputMode}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder={placeholder}
            aria-invalid={!!error}
            className={`w-full bg-zan-dark border rounded-md px-3.5 py-2.5 text-white text-sm placeholder:text-gray-600 outline-none transition-colors focus:border-zan-cyan ${error ? 'border-zan-red' : 'border-white/10'}`}
        />
        {error ? (
            <span className="flex items-center gap-1 text-xs text-zan-red mt-1.5"><AlertCircle className="w-3 h-3 shrink-0" /> {error}</span>
        ) : hint ? (
            <span className="block text-xs text-gray-500 mt-1.5">{hint}</span>
        ) : null}
    </label>
);

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    return (
        <button
            type="button"
            onClick={() => {
                navigator.clipboard?.writeText(text).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                }).catch(() => undefined);
            }}
            className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-zan-cyan hover:text-white transition-colors"
        >
            {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
        </button>
    );
};

/* ─── Page ───────────────────────────────────────────────── */
const CourseRegistrationPage = () => {
    const { slug } = useParams();
    const [course, setCourse] = useState<Course | null>(null);
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState<Errors>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [success, setSuccess] = useState<Success | null>(null);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        Promise.all([
            fetch(`${API_BASE_URL}/api/courses/${slug}`).then((r) => r.json()),
            fetch(`${API_BASE_URL}/api/payment-methods/active`).then((r) => r.json()).catch(() => ({ data: [] })),
        ])
            .then(([c, m]) => {
                if (!c?.success || !c.data) throw new Error('Course not found.');
                const data: Course = c.data;
                setCourse(data);
                const list: PaymentMethod[] = Array.isArray(m?.data) ? m.data : [];
                setMethods(list);
                setForm((f) => ({
                    ...f,
                    payment_method_id: list[0] ? String(list[0].id) : '',
                    class_slot: data.class_slots?.length === 1 ? data.class_slots[0] : '',
                }));
            })
            .catch(() => setLoadError('We could not load this course. Please try again.'))
            .finally(() => setLoading(false));
    }, [slug]);

    const set = (name: string, value: string) => {
        setForm((f) => ({ ...f, [name]: value }));
        if (errors[name]) setErrors((e) => { const n = { ...e }; delete n[name]; return n; });
    };

    /* What to pay now: admission + first month for monthly courses, else the course price */
    const isMonthly = course?.payment_type === 'monthly';
    const payNow = course
        ? isMonthly
            ? Number(course.admission_fee ?? 0) + Number(course.monthly_fee ?? 0) || null
            : (course.discount_price ?? course.price) || null
        : null;

    useEffect(() => {
        if (payNow && !form.amount) setForm((f) => ({ ...f, amount: String(payNow) }));
        // only prefill once the course is known
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payNow]);

    const method = methods.find((m) => String(m.id) === form.payment_method_id) || null;
    const isBank = method?.type === 'bank';
    const slots = (course?.class_slots ?? []).filter(Boolean);

    const validate = (): Errors => {
        const e: Errors = {};
        const req: [keyof typeof emptyForm, string][] = [
            ['student_name', "Please enter the student's full name."],
            ['email', 'Please enter an email address.'],
            ['age_class', 'Please enter age or class level.'],
            ['school_name', 'Please enter the school or institution.'],
            ['guardian_name', "Please enter the parent/guardian's name."],
            ['contact_number', 'Please enter a contact number.'],
            ['payment_method_id', 'Please choose a payment method.'],
            ['payer_account', isBank ? 'Please enter the account you paid from.' : 'Please enter the number you paid from.'],
            ['transaction_id', 'Please enter the transaction ID.'],
            ['amount', 'Please enter the amount you paid.'],
        ];
        req.forEach(([k, msg]) => { if (!String(form[k]).trim()) e[k] = msg; });
        if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email address.';
        if (form.contact_number && !/^[0-9+\-\s]{10,20}$/.test(form.contact_number)) e.contact_number = 'Please enter a valid phone number.';
        if (slots.length && !form.class_slot) e.class_slot = 'Please choose a class slot.';
        if (form.amount && !(Number(form.amount) > 0)) e.amount = 'Please enter a valid amount.';
        return e;
    };

    const handleSubmit = async (ev: FormEvent) => {
        ev.preventDefault();
        setSubmitError(null);
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length) {
            document.querySelector(`[name="${Object.keys(e)[0]}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/courses/${slug}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ ...form, payment_method_id: Number(form.payment_method_id), amount: Number(form.amount) }),
            });
            const result = await res.json().catch(() => null);

            if (res.ok && result?.success) {
                setSuccess({ reference: result.data.reference, course_title: result.data.course_title });
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            if (res.status === 422 && result?.errors && typeof result.errors === 'object') {
                const serverErrors: Errors = {};
                Object.entries(result.errors as Record<string, string[] | string>).forEach(([k, v]) => {
                    serverErrors[k] = Array.isArray(v) ? v[0] : String(v);
                });
                setErrors(serverErrors);
                setSubmitError('Please check the highlighted fields.');
            } else if (res.status === 429 || result?.message === 'Too Many Attempts.') {
                setSubmitError('Too many attempts. Please wait a minute and try again.');
            } else {
                setSubmitError(result?.message || 'Something went wrong. Please try again.');
            }
        } catch {
            setSubmitError('Network error. Please check your connection and try again.');
        } finally {
            setSubmitting(false);
        }
    };

    /* ── states ── */
    if (loading) return (
        <div className="min-h-screen bg-zan-dark flex items-center justify-center">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-zan-cyan"></div>
        </div>
    );

    if (loadError || !course) return (
        <div className="min-h-screen bg-zan-dark flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-4 font-heading uppercase tracking-wide">{loadError || 'Course not found'}</h2>
            <Link to="/courses" className="text-zan-cyan font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Courses
            </Link>
        </div>
    );

    const closed = course.status !== 'published' || !course.is_active;

    if (success) return (
        <div className="min-h-screen bg-zan-dark pt-28 pb-16 px-4">
            <div className="max-w-xl mx-auto text-center bg-surface-dark border border-zan-cyan/20 rounded-xl p-8 sm:p-12">
                <CheckCircle2 className="w-16 h-16 text-zan-neon mx-auto mb-5" />
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading uppercase tracking-wide mb-3">Registration Received!</h1>
                <p className="text-gray-400 font-light leading-relaxed mb-6">
                    Thank you for enrolling in <span className="text-white font-semibold">{success.course_title}</span>.
                    Our team will verify your payment and contact you on <span className="text-white">{form.contact_number}</span> to confirm the seat.
                </p>
                <div className="inline-block bg-zan-dark border border-white/10 rounded-lg px-6 py-4 mb-8">
                    <p className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-1">Your reference</p>
                    <p className="text-2xl font-bold text-zan-cyan font-mono tracking-wider">{success.reference}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to={`/course/${course.slug}`} className="px-6 py-3 border border-white/20 hover:border-white/50 text-white font-bold rounded-sm font-heading uppercase tracking-wider text-sm">
                        Back to Course
                    </Link>
                    <Link to="/courses" className="px-6 py-3 bg-zan-cyan text-black hover:bg-white font-bold rounded-sm font-heading uppercase tracking-wider text-sm">
                        Browse Courses
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-zan-dark font-sans pt-24 sm:pt-28 pb-16">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to={`/course/${course.slug}`}
                    className="inline-flex items-center mb-6 text-zan-cyan bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-sm border border-white/10 font-mono text-xs uppercase tracking-widest">
                    <ArrowLeft className="w-3 h-3 mr-2" /> Back to Course
                </Link>

                <div className="mb-8 sm:mb-10">
                    <p className="font-mono text-xs uppercase tracking-widest text-zan-cyan mb-2">Enrollment Form</p>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-heading uppercase tracking-wide leading-tight">
                        {course.title}
                    </h1>
                    <p className="text-gray-400 font-light mt-2 text-sm sm:text-base">
                        Fill out the form and send the payment to reserve a seat. Our team will verify it and contact you.
                    </p>
                </div>

                {closed ? (
                    <div className="bg-surface-dark border border-white/10 rounded-xl p-8 text-center text-gray-300">
                        Registration for this course is currently closed.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
                        <div className="lg:col-span-2 space-y-5 sm:space-y-6">

                            <Section icon={<User className="w-5 h-5" />} step={1} title="Student Information">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <Field label="Student's Full Name" name="student_name" value={form.student_name} onChange={set} error={errors.student_name} required />
                                    </div>
                                    <Field label="Email" name="email" type="email" inputMode="email" value={form.email} onChange={set} error={errors.email} required />
                                    <Field label="Age / Class Level" name="age_class" value={form.age_class} onChange={set} error={errors.age_class} required placeholder="e.g. 12 years / Class 7" />
                                    <div className="sm:col-span-2">
                                        <Field label="School / Institution" name="school_name" value={form.school_name} onChange={set} error={errors.school_name} required />
                                    </div>
                                </div>
                            </Section>

                            <Section icon={<Users className="w-5 h-5" />} step={2} title="Parent / Guardian">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <Field label="Parent / Guardian Name" name="guardian_name" value={form.guardian_name} onChange={set} error={errors.guardian_name} required />
                                    </div>
                                    <Field label="Contact Number (WhatsApp preferred)" name="contact_number" type="tel" inputMode="tel" value={form.contact_number} onChange={set} error={errors.contact_number} required placeholder="01XXXXXXXXX" />
                                    <Field label="Alternative Contact Number" name="alt_contact_number" type="tel" inputMode="tel" value={form.alt_contact_number} onChange={set} error={errors.alt_contact_number} placeholder="Optional" />
                                </div>
                            </Section>

                            {slots.length > 0 && (
                                <Section icon={<CalendarClock className="w-5 h-5" />} step={3} title="Preferred Class Slot">
                                    <div role="radiogroup" className="space-y-2.5" data-name="class_slot">
                                        {slots.map((slot) => {
                                            const active = form.class_slot === slot;
                                            return (
                                                <label key={slot}
                                                    className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${active ? 'border-zan-cyan bg-zan-cyan/10' : 'border-white/10 hover:border-white/30'}`}>
                                                    <input type="radio" name="class_slot" value={slot} checked={active}
                                                        onChange={() => set('class_slot', slot)} className="mt-1 accent-[#00f0ff]" />
                                                    <span className={`text-sm ${active ? 'text-white' : 'text-gray-300'}`}>{slot}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                    {errors.class_slot && (
                                        <p className="flex items-center gap-1 text-xs text-zan-red mt-2"><AlertCircle className="w-3 h-3" /> {errors.class_slot}</p>
                                    )}
                                </Section>
                            )}

                            <Section icon={<Wallet className="w-5 h-5" />} step={slots.length ? 4 : 3} title="Payment">
                                {methods.length === 0 ? (
                                    <p className="text-sm text-gray-400">Payment details are not available right now. Please contact us to complete your enrollment.</p>
                                ) : (
                                    <>
                                        <p className="text-sm text-gray-400 mb-3">Choose how you will pay:</p>
                                        <div role="radiogroup" className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
                                            {methods.map((m) => {
                                                const active = String(m.id) === form.payment_method_id;
                                                const st = METHOD_STYLE[m.type] ?? METHOD_STYLE.other;
                                                return (
                                                    <button type="button" key={m.id} role="radio" aria-checked={active}
                                                        onClick={() => set('payment_method_id', String(m.id))}
                                                        className={`flex items-center gap-2 p-3 rounded-lg border text-left transition-colors ${active ? `${st.ring} ${st.bg}` : 'border-white/10 hover:border-white/30'}`}>
                                                        {m.type === 'bank'
                                                            ? <Landmark className={`w-5 h-5 shrink-0 ${active ? st.text : 'text-gray-400'}`} />
                                                            : <Smartphone className={`w-5 h-5 shrink-0 ${active ? st.text : 'text-gray-400'}`} />}
                                                        <span className={`text-sm font-semibold ${active ? 'text-white' : 'text-gray-300'}`}>{m.title}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {method && (
                                            <div className={`rounded-lg border p-4 sm:p-5 mb-5 ${METHOD_STYLE[method.type]?.ring ?? 'border-zan-cyan'} bg-zan-dark`}>
                                                <div className="flex items-center justify-between gap-3 mb-1">
                                                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500">
                                                        {isBank ? 'Account Number' : `${method.title} Number`}
                                                    </span>
                                                    <CopyButton text={method.account_number} />
                                                </div>
                                                <p className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-wider break-all">{method.account_number}</p>
                                                <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                                                    {method.account_type && <div><dt className="inline text-gray-500">Type: </dt><dd className="inline text-gray-200">{method.account_type}</dd></div>}
                                                    {method.account_name && <div><dt className="inline text-gray-500">Account name: </dt><dd className="inline text-gray-200">{method.account_name}</dd></div>}
                                                    {method.bank_name && <div><dt className="inline text-gray-500">Bank: </dt><dd className="inline text-gray-200">{method.bank_name}</dd></div>}
                                                    {method.branch_name && <div><dt className="inline text-gray-500">Branch: </dt><dd className="inline text-gray-200">{method.branch_name}</dd></div>}
                                                    {method.routing_number && <div><dt className="inline text-gray-500">Routing no.: </dt><dd className="inline text-gray-200">{method.routing_number}</dd></div>}
                                                </dl>
                                                {method.instructions && (
                                                    <p className="mt-3 text-sm text-gray-300 leading-relaxed whitespace-pre-line border-t border-white/5 pt-3">{method.instructions}</p>
                                                )}
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Field
                                                label={isBank ? 'Your Account Name / Number' : `Your ${method?.title ?? ''} Number (sent from)`}
                                                name="payer_account" value={form.payer_account} onChange={set} error={errors.payer_account} required
                                                inputMode={isBank ? 'text' : 'tel'} placeholder={isBank ? 'Account you paid from' : '01XXXXXXXXX'} />
                                            <Field label="Transaction ID" name="transaction_id" value={form.transaction_id} onChange={set} error={errors.transaction_id} required
                                                placeholder={isBank ? 'Bank reference no.' : 'e.g. 8N7A6D5C4B'} />
                                            <Field label="Amount Paid (৳)" name="amount" type="number" inputMode="decimal" value={form.amount} onChange={set} error={errors.amount} required
                                                hint={payNow ? `Amount due now: ৳${fmt(payNow)}` : undefined} />
                                        </div>
                                        {errors.payment_method_id && (
                                            <p className="flex items-center gap-1 text-xs text-zan-red mt-2"><AlertCircle className="w-3 h-3" /> {errors.payment_method_id}</p>
                                        )}
                                    </>
                                )}
                            </Section>

                            {submitError && (
                                <div className="flex items-start gap-2 p-4 rounded-lg border border-zan-red/40 bg-zan-red/10 text-sm text-red-200">
                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {submitError}
                                </div>
                            )}

                            <button type="submit" disabled={submitting || methods.length === 0}
                                className="w-full sm:w-auto px-10 py-4 bg-zan-red hover:bg-red-600 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-sm transition-all font-heading uppercase tracking-wider text-sm inline-flex items-center justify-center gap-2">
                                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : <>Submit Registration <ArrowRight className="w-4 h-4" /></>}
                            </button>
                        </div>

                        {/* ── Summary ── */}
                        <aside className="lg:sticky lg:top-24 bg-surface-dark border border-zan-cyan/15 rounded-xl overflow-hidden">
                            {course.thumbnail && (
                                <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
                            )}
                            <div className="p-5 sm:p-6">
                                <p className="font-mono text-xs uppercase tracking-widest text-zan-cyan mb-1">{course.category}</p>
                                <h3 className="text-white font-bold font-heading uppercase tracking-wide mb-4 leading-snug">{course.title}</h3>
                                <dl className="space-y-2.5 text-sm">
                                    {isMonthly ? (
                                        <>
                                            {course.monthly_fee != null && <div className="flex justify-between gap-3"><dt className="text-gray-400">Monthly fee</dt><dd className="text-white font-semibold">৳{fmt(course.monthly_fee)}</dd></div>}
                                            {course.admission_fee != null && <div className="flex justify-between gap-3"><dt className="text-gray-400">Admission fee</dt><dd className="text-white font-semibold">৳{fmt(course.admission_fee)}</dd></div>}
                                            {course.duration_months != null && <div className="flex justify-between gap-3"><dt className="text-gray-400">Duration</dt><dd className="text-white">{course.duration_months} months</dd></div>}
                                        </>
                                    ) : (
                                        (course.discount_price ?? course.price) != null && (
                                            <div className="flex justify-between gap-3"><dt className="text-gray-400">Course fee</dt><dd className="text-white font-semibold">৳{fmt(course.discount_price ?? course.price)}</dd></div>
                                        )
                                    )}
                                    {course.age_group && <div className="flex justify-between gap-3"><dt className="text-gray-400">Age group</dt><dd className="text-white">{course.age_group}</dd></div>}
                                    {course.session_duration && <div className="flex justify-between gap-3"><dt className="text-gray-400">Class</dt><dd className="text-white text-right">{course.session_duration}</dd></div>}
                                </dl>
                                {payNow != null && (
                                    <div className="mt-5 pt-4 border-t border-white/5 flex items-baseline justify-between gap-3">
                                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Pay now</span>
                                        <span className="text-2xl font-bold text-zan-cyan font-heading">৳{fmt(payNow)}</span>
                                    </div>
                                )}
                                {isMonthly && payNow != null && (
                                    <p className="text-xs text-gray-500 mt-1">Admission fee + first month. Later months are paid at the start of each month.</p>
                                )}
                            </div>
                        </aside>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CourseRegistrationPage;
