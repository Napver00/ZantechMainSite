import { Trophy } from 'lucide-react';
import type { Achievement } from '../data/achievements';

const AchievementCard = ({ item, onClick }: { item: Achievement; onClick?: () => void }) => (
    <div
        onClick={onClick}
        className={`h-full bg-surface-dark backdrop-blur-md rounded-sm border border-white/5 overflow-hidden hover:border-zan-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 flex flex-col ${onClick ? 'cursor-pointer transform hover:-translate-y-2' : ''}`}
    >
        <img src={item.image} alt={item.team} className="w-full h-56 object-cover object-top" loading="lazy" />
        <div className="p-6 flex flex-col flex-grow">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-widest text-zan-cyan bg-zan-cyan/10 border border-zan-cyan/30 px-3 py-1 rounded-sm w-fit">
                <Trophy className="w-4 h-4" />
                {item.badge}
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-heading uppercase tracking-wide">{item.team}</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light flex-grow">{item.description}</p>
        </div>
    </div>
);

export default AchievementCard;
