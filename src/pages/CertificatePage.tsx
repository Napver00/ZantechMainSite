import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    AlertTriangle, ArrowRight, Award, BadgeCheck, CalendarDays, Check, Copy, MapPin, PenLine, Search, ShieldCheck, XCircle,
} from 'lucide-react';
import { API_BASE_URL } from '../config';

interface Program {
    type: 'course' | 'bootcamp' | 'workshop' | 'custom';
    title: string;
    path?: string;
    thumbnail?: string | null;
    summary?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    venue?: string | null;
}

interface Certificate {
    code: string;
    status: 'valid' | 'revoked';
    reason?: string | null;
    title?: string;
    recipient_name?: string;
    description?: string;
    issue_date?: string;
    signers?: { name: string; designation: string }[];
    program?: Program | null;
}

type State = { kind: 'idle' } | { kind: 'loading' } | { kind: 'found'; cert: Certificate } | { kind: 'missing' } | { kind: 'error' };

const KIND_LABEL: Record<string, string> = { course: 'Course', bootcamp: 'Bootcamp', workshop: 'Workshop', custom: 'Programme' };

const day = (d?: string | null) =>
    d ? new Date(`${d.slice(0, 10)}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

const range = (a?: string | null, b?: string | null) => (a ? (b && b.slice(0, 10) !== a.slice(0, 10) ? `${day(a)} – ${day(b)}` : day(a)) : '');

/** Public page behind the certificate QR code: zantechbd.com/certificate/ZT-XXXX-XXXX */
const CertificatePage = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const [input, setInput] = useState(code || '');
    const [state, setState] = useState<State>(code ? { kind: 'loading' } : { kind: 'idle' });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setInput(code || '');
        if (!code) {
            setState({ kind: 'idle' });
            document.title = 'Verify a certificate | ZAN Tech';
            return;
        }
        let cancelled = false;
        setState({ kind: 'loading' });
        fetch(`${API_BASE_URL}/api/certificates/verify/${encodeURIComponent(code)}`, { headers: { Accept: 'application/json' } })
            .then(async (r) => {
                if (cancelled) return;
                if (r.status === 404) return setState({ kind: 'missing' });
                const json = await r.json();
                if (!r.ok || !json?.success) return setState({ kind: 'error' });
                setState({ kind: 'found', cert: json.data });
                document.title = json.data.recipient_name ? `${json.data.recipient_name} · ${json.data.title} | ZAN Tech` : 'Certificate | ZAN Tech';
            })
            .catch(() => !cancelled && setState({ kind: 'error' }));
        return () => {
            cancelled = true;
        };
    }, [code]);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const clean = input.trim().toUpperCase();
        if (clean) navigate(`/certificate/${encodeURIComponent(clean)}`);
    };

    const copyLink = () => {
        navigator.clipboard?.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        });
    };

    return (
        <div className="min-h-screen bg-zan-dark">
            <header className="relative overflow-hidden border-b border-white/10 pt-28 pb-10 md:pt-36 md:pb-14">
                <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.07]" />
                <div className="pointer-events-none absolute -top-32 left-1/2 h-[380px] w-[620px] -translate-x-1/2 rounded-full bg-zan-cyan/10 blur-[110px]" />
                <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
                    <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-zan-cyan">
                        <ShieldCheck className="h-4 w-4" /> Certificate verification
                    </p>
                    <h1 className="mt-4 text-3xl font-bold leading-tight text-white font-heading md:text-5xl">Check a ZAN Tech certificate</h1>
                    <p className="mx-auto mt-4 max-w-xl text-gray-400">
                        Scan the QR code on the certificate, or type the certificate ID printed next to it.
                    </p>
                    <form onSubmit={submit} className="mx-auto mt-7 flex max-w-lg gap-2">
                        <label className="relative flex-1">
                            <span className="sr-only">Certificate ID</span>
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="ZT-XXXX-XXXX"
                                autoCapitalize="characters"
                                spellCheck={false}
                                className="h-12 w-full rounded-xl border border-white/10 bg-surface-dark pl-12 pr-4 font-mono uppercase tracking-wider text-white outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-gray-500 focus:border-zan-cyan/60"
                            />
                        </label>
                        <button type="submit" className="h-12 rounded-xl bg-zan-cyan px-5 font-bold text-zan-dark transition-opacity hover:opacity-90">Verify</button>
                    </form>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14">
                {state.kind === 'loading' && (
                    <div className="space-y-4">
                        <div className="h-28 animate-pulse rounded-2xl bg-surface-dark" />
                        <div className="h-64 animate-pulse rounded-2xl bg-surface-dark" />
                    </div>
                )}

                {state.kind === 'idle' && (
                    <div className="grid gap-4 md:grid-cols-3">
                        {[
                            { icon: Search, title: 'Find the ID', text: 'It is printed beside the QR code, like ZT-7KQ4-M9PX.' },
                            { icon: ShieldCheck, title: 'Check it here', text: 'We show the details saved when ZAN Tech issued it.' },
                            { icon: BadgeCheck, title: 'Compare', text: 'The name and programme should match the paper certificate.' },
                        ].map(({ icon: Icon, title, text }) => (
                            <div key={title} className="rounded-2xl border border-white/10 bg-surface-dark p-6">
                                <Icon className="h-6 w-6 text-zan-cyan" />
                                <h2 className="mt-4 font-bold text-white font-heading">{title}</h2>
                                <p className="mt-1 text-sm text-gray-400">{text}</p>
                            </div>
                        ))}
                    </div>
                )}

                {(state.kind === 'missing' || state.kind === 'error') && (
                    <div className="mx-auto max-w-xl rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8 text-center">
                        <AlertTriangle className="mx-auto h-10 w-10 text-amber-500" />
                        <h2 className="mt-4 text-xl font-bold text-white font-heading">
                            {state.kind === 'missing' ? 'No certificate with this ID' : "We couldn't check right now"}
                        </h2>
                        <p className="mt-2 text-gray-400">
                            {state.kind === 'missing'
                                ? 'Check the ID for typing mistakes. If it still does not match, the certificate was not issued by ZAN Tech.'
                                : 'Please try again in a moment.'}
                        </p>
                        <Link to="/contact" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-zan-cyan hover:underline">
                            Contact ZAN Tech <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                )}

                {state.kind === 'found' && state.cert.status === 'revoked' && (
                    <div className="mx-auto max-w-xl rounded-2xl border border-red-500/30 bg-red-500/5 p-8 text-center">
                        <XCircle className="mx-auto h-10 w-10 text-red-500" />
                        <h2 className="mt-4 text-xl font-bold text-white font-heading">This certificate is no longer valid</h2>
                        <p className="mt-2 font-mono text-sm text-gray-400">{state.cert.code}</p>
                        {state.cert.reason && <p className="mt-3 text-gray-300">Reason: {state.cert.reason}</p>}
                        <p className="mt-3 text-sm text-gray-400">ZAN Tech has withdrawn it. Contact us if you have questions.</p>
                    </div>
                )}

                {state.kind === 'found' && state.cert.status === 'valid' && (
                    <ValidCertificate cert={state.cert} copied={copied} onCopy={copyLink} />
                )}
            </main>
        </div>
    );
};

const ValidCertificate = ({ cert, copied, onCopy }: { cert: Certificate; copied: boolean; onCopy: () => void }) => {
    const p = cert.program;
    return (
        <div className="space-y-5">
            {/* Verified banner */}
            <div className="flex flex-col gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 sm:flex-row sm:items-center md:p-6">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[#fff] shadow-lg shadow-emerald-500/30">
                    <Check className="h-7 w-7" strokeWidth={3} />
                </span>
                <div className="flex-1">
                    <p className="text-lg font-bold text-white font-heading">Verified: issued by ZAN Tech</p>
                    <p className="text-sm text-gray-400">This certificate is genuine and has not been withdrawn.</p>
                </div>
                <button type="button" onClick={onCopy} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-semibold text-white hover:border-zan-cyan/40">
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />} {copied ? 'Link copied' : 'Copy link'}
                </button>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
                {/* Certificate details */}
                <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface-dark p-6 md:p-8">
                    <Award className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-zan-cyan/5" />
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-zan-cyan">{cert.title}</p>
                    <p className="mt-5 text-sm text-gray-400">Awarded to</p>
                    <h2 className="mt-1 text-3xl font-bold text-white font-heading md:text-4xl">{cert.recipient_name}</h2>
                    {cert.description && <p className="mt-5 leading-relaxed text-gray-300">{cert.description}</p>}

                    <dl className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                        <div>
                            <dt className="text-xs uppercase tracking-wider text-gray-500">Certificate ID</dt>
                            <dd className="mt-1 font-mono font-bold text-white">{cert.code}</dd>
                        </div>
                        <div>
                            <dt className="text-xs uppercase tracking-wider text-gray-500">Issued</dt>
                            <dd className="mt-1 font-semibold text-white">{day(cert.issue_date)}</dd>
                        </div>
                    </dl>

                    {!!cert.signers?.length && (
                        <div className="mt-6 border-t border-white/10 pt-5">
                            <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500"><PenLine className="h-3.5 w-3.5" /> Signed by</p>
                            <ul className="mt-3 flex flex-wrap gap-3">
                                {cert.signers.map((s) => (
                                    <li key={`${s.name}-${s.designation}`} className="rounded-xl border border-white/10 bg-zan-dark px-4 py-2.5">
                                        <p className="font-semibold text-white">{s.name}</p>
                                        <p className="text-xs text-gray-400">{s.designation}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>

                {/* Programme */}
                {p ? (
                    <section className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-dark">
                        {p.thumbnail && (
                            <div className="aspect-video overflow-hidden bg-white/5">
                                <img src={p.thumbnail} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
                            </div>
                        )}
                        <div className="flex flex-1 flex-col p-6">
                            <span className="inline-flex w-fit rounded-full bg-zan-cyan/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-zan-cyan">
                                {KIND_LABEL[p.type] || 'Programme'}
                            </span>
                            <h3 className="mt-3 text-xl font-bold text-white font-heading">{p.title}</h3>
                            {p.summary && <p className="mt-2 line-clamp-3 text-sm text-gray-400">{p.summary}</p>}
                            <div className="mt-4 space-y-2 text-sm text-gray-300">
                                {range(p.start_date, p.end_date) && (
                                    <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-gray-500" /> {range(p.start_date, p.end_date)}</p>
                                )}
                                {p.venue && <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-500" /> {p.venue}</p>}
                            </div>
                            {p.path && (
                                <Link to={p.path} className="mt-auto inline-flex items-center gap-1.5 pt-5 font-semibold text-zan-cyan hover:underline">
                                    About this {(KIND_LABEL[p.type] || 'programme').toLowerCase()} <ArrowRight className="h-4 w-4" />
                                </Link>
                            )}
                        </div>
                    </section>
                ) : (
                    <section className="rounded-2xl border border-white/10 bg-surface-dark p-6">
                        <Award className="h-8 w-8 text-zan-cyan" />
                        <h3 className="mt-4 text-lg font-bold text-white font-heading">Learn with ZAN Tech</h3>
                        <p className="mt-2 text-sm text-gray-400">Robotics, coding, IoT and AI courses, bootcamps and free school workshops across Bangladesh.</p>
                    </section>
                )}
            </div>

            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-zan-cyan/30 bg-gradient-to-br from-zan-cyan/10 to-transparent p-6 sm:flex-row sm:items-center">
                <div>
                    <p className="text-lg font-bold text-white font-heading">Want a certificate like this?</p>
                    <p className="text-sm text-gray-400">Join a ZAN Tech course or bootcamp and build real robots and AI projects.</p>
                </div>
                <div className="flex gap-2">
                    <Link to="/courses" className="inline-flex h-11 items-center rounded-xl bg-zan-cyan px-5 text-sm font-bold text-zan-dark hover:opacity-90">Courses</Link>
                    <Link to="/bootcamps" className="inline-flex h-11 items-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white hover:border-zan-cyan/40">Bootcamps</Link>
                </div>
            </div>
        </div>
    );
};

export default CertificatePage;
