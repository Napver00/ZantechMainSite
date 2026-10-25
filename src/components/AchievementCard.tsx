import { ArrowRight, Calendar, Globe2, MapPin, Trophy } from 'lucide-react';
import type { Achievement } from '../data/achievements';
import { scopeOf, tierOf, TIER_STYLE, yearOf } from '../data/achievementMeta';

/** One award: photo with the result badge, where/when, team and what they won. */
const AchievementCard = ({ item, onClick }: { item: Achievement; onClick?: () => void }) => {
    const tier = tierOf(item);
    const scope = scopeOf(item);
    const year = yearOf(item);

    const body = (
        <>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5">
                <img
                    src={item.image}
                    alt={item.team}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                <span className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-lg ${TIER_STYLE[tier].chip}`}>
                    <Trophy className="h-3.5 w-3.5" /> {item.badge}
                </span>
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    {scope === 'International' ? <Globe2 className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />} {scope}
                </span>
                {year && (
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                        <Calendar className="h-3.5 w-3.5" /> {year}
                    </span>
                )}
            </div>
            <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold leading-snug text-white font-heading group-hover:text-zan-cyan">{item.team}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-400">{item.description}</p>
                {onClick && (
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-zan-cyan">
                        Read the story <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                )}
            </div>
        </>
    );

    const cls = 'group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-dark text-left transition-all duration-300';

    return onClick ? (
        <button type="button" onClick={onClick} className={`${cls} cursor-pointer hover:-translate-y-1 hover:border-zan-cyan/40 hover:shadow-xl`}>
            {body}
        </button>
    ) : (
        <div className={cls}>{body}</div>
    );
};

export default AchievementCard;
