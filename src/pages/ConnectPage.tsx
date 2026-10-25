import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowUpRight, BookOpen, Check, ChevronDown, Clock, Copy, Cpu, Gamepad2, Globe, Mail,
    MapPin, Phone, RotateCcw, Rocket, ShoppingBag, Sparkles, UserPlus,
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp, FaYoutube, FaXTwitter } from 'react-icons/fa6';
import { useCompany, WHATSAPP_NUMBER } from '../hooks/useCompany';
import mascot from '../assets/mascot.png';

const SOCIAL_STYLE: Record<string, { icon: JSX.Element; color: string; label: string }> = {
    facebook: { icon: <FaFacebook />, color: '#1877F2', label: 'Facebook' },
    instagram: { icon: <FaInstagram />, color: '#E4405F', label: 'Instagram' },
    linkedin: { icon: <FaLinkedin />, color: '#0A66C2', label: 'LinkedIn' },
    youtube: { icon: <FaYoutube />, color: '#FF0000', label: 'YouTube' },
    tiktok: { icon: <FaTiktok />, color: 'currentColor', label: 'TikTok' },
    twitter: { icon: <FaXTwitter />, color: 'currentColor', label: 'X' },
    x: { icon: <FaXTwitter />, color: 'currentColor', label: 'X' },
};

const LINKS = [
    { title: 'ZAN Tech website', text: 'Who we are, courses, projects and more', to: '/', icon: Globe },
    { title: 'Courses', text: 'Robotics, coding & AI for school students', to: '/courses', icon: BookOpen },
    { title: 'Bootcamps', text: 'Short hands-on build programmes', to: '/bootcamps', icon: Rocket },
    { title: 'ZAN Tech Store', text: 'Arduino, sensors, kits & components', href: 'https://store.zantechbd.com', icon: ShoppingBag },
    { title: 'R&D projects', text: 'Custom electronics, IoT & robotics we have built', to: '/projects', icon: Cpu },
    { title: 'Project Uddipon', text: 'Free STEM workshops across Bangladesh', href: 'https://projectuddipon.zantechbd.com/', icon: Sparkles },
];

const vCard = (c: { name: string; phone: string; email: string; location: string }) =>
    [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${c.name}`,
        `ORG:${c.name}`,
        `TEL;TYPE=WORK,VOICE:${c.phone.replace(/\s+/g, '')}`,
        `EMAIL;TYPE=WORK:${c.email}`,
        `ADR;TYPE=WORK:;;${c.location.replace(/,/g, '\\,')};;;;`,
        'URL:https://zantechbd.com',
        'END:VCARD',
    ].join('\r\n');

/** Optional mini-game kept from the old page, now behind a toggle instead of in the way. */
const TicTacToe = () => {
    const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const winnerOf = useCallback((sq: (string | null)[]) => {
        const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (const [a, b, c] of lines) if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
        return null;
    }, []);

    const winner = winnerOf(squares);
    const draw = !winner && squares.every(Boolean);

    useEffect(() => {
        if (xIsNext || winner || draw) return;
        const empty = squares.map((s, i) => (s ? null : i)).filter((i): i is number => i !== null);
        const t = setTimeout(() => {
            const next = squares.slice();
            next[empty[Math.floor(Math.random() * empty.length)]] = 'O';
            setSquares(next);
            setXIsNext(true);
        }, 450);
        return () => clearTimeout(t);
    }, [xIsNext, winner, draw, squares]);

    const play = (i: number) => {
        if (!xIsNext || squares[i] || winner) return;
        const next = squares.slice();
        next[i] = 'X';
        setSquares(next);
        setXIsNext(false);
    };

    return (
        <div className="flex flex-col items-center gap-4 py-2">
            <p className="text-sm font-semibold text-gray-400">
                {winner ? (winner === 'X' ? 'You win! 🎉' : 'ZAN Bot wins 🤖') : draw ? "It's a draw" : xIsNext ? 'Your turn (X)' : 'ZAN Bot is thinking…'}
            </p>
            <div className="grid grid-cols-3 gap-2">
                {squares.map((sq, i) => (
                    <button
                        key={i}
                        onClick={() => play(i)}
                        aria-label={`Square ${i + 1}${sq ? `, ${sq}` : ''}`}
                        className={`h-16 w-16 rounded-xl border text-2xl font-black transition-colors ${
                            sq === 'X' ? 'border-zan-cyan/40 bg-zan-cyan/10 text-zan-cyan' : sq === 'O' ? 'border-zan-red/40 bg-zan-red/10 text-zan-red' : 'border-white/10 bg-white/5 hover:border-zan-cyan/40'
                        }`}
                    >
                        {sq}
                    </button>
                ))}
            </div>
            <button
                onClick={() => { setSquares(Array(9).fill(null)); setXIsNext(true); }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-zan-cyan hover:underline"
            >
                <RotateCcw className="h-4 w-4" /> New game
            </button>
        </div>
    );
};

/** "Link in bio" hub: everything about ZAN Tech one tap away. */
const ConnectPage = () => {
    const company = useCompany();
    const [copied, setCopied] = useState('');

    useEffect(() => { document.title = 'Connect with ZAN Tech'; }, []);

    const phoneDigits = company.phone.replace(/[^\d+]/g, '');
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi ZAN Tech, I found you through your links page.')}`;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`ZAN Tech, ${company.location}`)}`;

    const copy = async (label: string, value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(label);
            setTimeout(() => setCopied(''), 1600);
        } catch { /* clipboard blocked */ }
    };

    const saveContact = () => {
        const blob = new Blob([vCard(company)], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ZAN-Tech.vcf';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1500);
    };

    const quick = [
        { label: 'WhatsApp', icon: <FaWhatsapp className="h-5 w-5" />, href: waUrl, external: true, accent: true },
        { label: 'Call', icon: <Phone className="h-5 w-5" />, href: `tel:${phoneDigits}` },
        { label: 'Email', icon: <Mail className="h-5 w-5" />, href: `mailto:${company.email}` },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-zan-dark px-4 pb-16 pt-24 md:pt-28">
            <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-zan-cyan/10 blur-[110px]" />

            <div className="relative mx-auto w-full max-w-lg">
                {/* Profile */}
                <header className="flex flex-col items-center text-center">
                    <div className="relative">
                        <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-zan-cyan/30 to-zan-red/20 blur-xl" />
                        <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-zan-cyan/40 bg-surface-dark p-2 shadow-xl">
                            <img src={mascot} alt="ZAN Tech mascot" className="h-full w-full object-contain" />
                        </div>
                        <img src="/zantech_logo.png" alt="" className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full border-2 border-zan-dark bg-white p-1" />
                    </div>
                    <h1 className="mt-5 text-3xl font-bold font-heading text-white">
                        ZAN<span className="text-zan-red">TECH</span>
                    </h1>
                    <p className="mt-1.5 text-sm font-semibold text-zan-cyan">Robotics · IoT · STEM education</p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-400">
                        Hands-on robotics, coding &amp; AI for students, components for makers, and custom R&amp;D for businesses — from Dhaka, Bangladesh.
                    </p>
                </header>

                {/* Quick actions */}
                <div className="mt-7 grid grid-cols-4 gap-2.5">
                    {quick.map((q) => (
                        <a
                            key={q.label}
                            href={q.href}
                            target={q.external ? '_blank' : undefined}
                            rel={q.external ? 'noreferrer' : undefined}
                            className={`flex flex-col items-center gap-1.5 rounded-2xl border py-3 text-xs font-bold transition-all hover:-translate-y-0.5 ${
                                q.accent
                                    ? 'border-transparent bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25'
                                    : 'border-white/10 bg-surface-dark text-white hover:border-zan-cyan/40'
                            }`}
                        >
                            {q.icon}
                            {q.label}
                        </a>
                    ))}
                    <button
                        onClick={saveContact}
                        className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-surface-dark py-3 text-xs font-bold text-white transition-all hover:-translate-y-0.5 hover:border-zan-cyan/40"
                    >
                        <UserPlus className="h-5 w-5" />
                        Save
                    </button>
                </div>

                {/* Links */}
                <nav className="mt-7 space-y-3" aria-label="ZAN Tech links">
                    {LINKS.map((l) => {
                        const inner = (
                            <>
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zan-cyan/10 text-zan-cyan">
                                    <l.icon className="h-5 w-5" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block font-bold text-white">{l.title}</span>
                                    <span className="block truncate text-sm text-gray-400">{l.text}</span>
                                </span>
                                <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-zan-cyan" />
                            </>
                        );
                        const cls = 'group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-surface-dark p-3.5 transition-all hover:-translate-y-0.5 hover:border-zan-cyan/40 hover:shadow-lg';
                        return l.to ? (
                            <Link key={l.title} to={l.to} className={cls}>{inner}</Link>
                        ) : (
                            <a key={l.title} href={l.href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
                        );
                    })}
                </nav>

                {/* Socials */}
                {company.social_links.length > 0 && (
                    <section className="mt-8">
                        <p className="mb-3 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">Follow ZAN Tech</p>
                        <div className="flex flex-wrap justify-center gap-2.5">
                            {company.social_links.map((s) => {
                                const style = SOCIAL_STYLE[s.platform.toLowerCase()];
                                return (
                                    <a
                                        key={s.url}
                                        href={s.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={style?.label || s.platform}
                                        className="group flex h-12 items-center gap-2 rounded-full border border-white/10 bg-surface-dark px-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                                        style={{ ['--brand' as string]: style?.color || '#00f0ff' }}
                                    >
                                        <span className="text-lg text-[color:var(--brand)] transition-transform group-hover:scale-110">{style?.icon || <Globe />}</span>
                                        {style?.label || s.platform}
                                    </a>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Visit / contact details */}
                <section className="mt-8 rounded-2xl border border-white/10 bg-surface-dark p-5">
                    <p className="mb-4 font-bold text-white">Visit or reach us</p>
                    <ul className="space-y-3.5 text-sm">
                        <li className="flex gap-3">
                            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-zan-red" />
                            <span className="text-gray-300">
                                {company.location}
                                <a href={mapUrl} target="_blank" rel="noreferrer" className="mt-1 flex items-center gap-1 font-semibold text-zan-cyan hover:underline">
                                    Open in Google Maps <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Clock className="h-5 w-5 shrink-0 text-zan-cyan" />
                            <span className="text-gray-300">Saturday – Thursday, 10 AM – 6 PM</span>
                        </li>
                        {[
                            { label: 'phone', icon: <Phone className="h-5 w-5 shrink-0 text-zan-cyan" />, value: company.phone, href: `tel:${phoneDigits}` },
                            { label: 'email', icon: <Mail className="h-5 w-5 shrink-0 text-zan-cyan" />, value: company.email, href: `mailto:${company.email}` },
                        ].map((row) => (
                            <li key={row.label} className="flex items-center gap-3">
                                {row.icon}
                                <a href={row.href} className="min-w-0 flex-1 truncate text-gray-300 hover:text-zan-cyan">{row.value}</a>
                                <button
                                    onClick={() => copy(row.label, row.value)}
                                    aria-label={`Copy ${row.label}`}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-white/5 hover:text-zan-cyan"
                                >
                                    {copied === row.label ? <Check className="h-4 w-4 text-zan-cyan" /> : <Copy className="h-4 w-4" />}
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Optional mini-game */}
                <details className="group mt-4 rounded-2xl border border-white/10 bg-surface-dark">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold text-white">
                        <span className="flex items-center gap-2"><Gamepad2 className="h-5 w-5 text-zan-cyan" /> Got a minute? Beat ZAN Bot at Tic-Tac-Toe</span>
                        <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-white/10 px-5 pb-5 pt-3">
                        <TicTacToe />
                    </div>
                </details>

                <p className="mt-10 text-center text-xs text-gray-500">© {new Date().getFullYear()} ZAN Tech · zantechbd.com</p>
            </div>
        </div>
    );
};

export default ConnectPage;
