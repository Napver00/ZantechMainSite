import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Users, ArrowRight, Flame, Images } from 'lucide-react';
import {
    type BootcampSummary, bootcampStatus, STATUS_LABEL, fmtRange, dayCount, seatsLeft,
    realPrice, hasDiscount, fmtTk, daysUntil,
} from '../utils/bootcamp';

// Bootcamp card used on the Bootcamps page and the home page section
const BootcampCard = ({ b, past = false }: { b: BootcampSummary; past?: boolean }) => {
    const status = bootcampStatus(b);
    const days = dayCount(b.start_date, b.end_date);
    const left = seatsLeft(b);
    const price = realPrice(b);
    const startsIn = daysUntil(b.start_date);
    const start = b.start_date ? new Date(`${b.start_date}T00:00:00`) : null;

    return (
        <Link to={`/bootcamp/${b.slug}`}
            className={`group flex flex-col bg-surface-dark border border-white/5 rounded-sm overflow-hidden hover:border-zan-cyan/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-500 hover:-translate-y-1 ${past ? 'opacity-70 hover:opacity-100' : ''}`}>
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-zan-cyan/20 via-surface-dark to-zan-red/20">
                {b.thumbnail && (
                    <img src={b.thumbnail} alt={b.title} loading="lazy"
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${past ? 'grayscale light:grayscale-0' : ''}`}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zan-dark/90 to-transparent light:from-zan-dark/30"></div>
                {start && (
                    <div className="absolute top-3 left-3 bg-zan-dark/90 border border-zan-cyan/30 rounded-sm text-center px-3 py-1.5 leading-none">
                        <div className="text-2xl font-bold text-white font-heading">{start.getDate()}</div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-zan-cyan mt-1">
                            {start.toLocaleDateString('en-GB', { month: 'short' })}
                        </div>
                    </div>
                )}
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-sm text-[11px] font-mono font-bold uppercase tracking-wider ${
                    status === 'open' ? 'bg-zan-neon/90 text-zan-dark'
                    : status === 'closing' ? 'bg-orange-500 text-zan-dark'
                    : status === 'soldout' ? 'bg-zan-red text-[#fff]'
                    : 'bg-gray-700 text-gray-200'}`}>
                    {status === 'closing' && <Flame className="w-3 h-3 inline -mt-0.5 mr-1" />}
                    {STATUS_LABEL[status]}
                </span>
                {past && b.recap_link && (
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-zan-cyan text-zan-dark text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                        <Images className="w-3.5 h-3.5" /> Highlights
                    </span>
                )}
                {!past && startsIn !== null && startsIn > 0 && startsIn <= 30 && (
                    <span className="absolute bottom-3 left-3 text-xs font-mono text-white/90">Starts in {startsIn} day{startsIn !== 1 ? 's' : ''}</span>
                )}
            </div>

            <div className="flex-1 flex flex-col p-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-zan-cyan mb-1.5">{b.category || 'Bootcamp'}</p>
                <h3 className="text-lg font-bold text-white font-heading uppercase tracking-wide leading-snug mb-2 group-hover:text-zan-cyan transition-colors">{b.title}</h3>
                {b.short_description && <p className="text-sm text-gray-400 font-light line-clamp-2 mb-4">{b.short_description}</p>}

                <div className="space-y-1.5 text-sm text-gray-300 mb-4">
                    <div className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-zan-cyan shrink-0" />{fmtRange(b.start_date, b.end_date)}{days && days > 1 ? ` · ${days} days` : ''}</div>
                    {b.venue && <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-zan-cyan shrink-0" /><span className="truncate">{b.venue}</span></div>}
                    {b.age_group && <div className="flex items-center gap-2"><Users className="w-4 h-4 text-zan-cyan shrink-0" />{b.age_group}</div>}
                </div>

                <div className="mt-auto pt-4 border-t border-white/5 flex items-end justify-between gap-3">
                    <div>
                        {price != null && Number(price) > 0 ? (
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-white font-heading">৳{fmtTk(price)}</span>
                                {hasDiscount(b) && <span className="text-sm text-gray-500 line-through">৳{fmtTk(b.price)}</span>}
                            </div>
                        ) : <span className="text-xl font-bold text-zan-cyan font-heading">Free</span>}
                        {!past && left !== null && (
                            <span className={`text-xs font-mono ${left <= 5 ? 'text-orange-400' : 'text-gray-500'}`}>
                                {left > 0 ? `${left} seat${left !== 1 ? 's' : ''} left` : 'No seats left'}
                            </span>
                        )}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold font-heading uppercase tracking-wider text-zan-cyan">
                        Details <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default BootcampCard;
