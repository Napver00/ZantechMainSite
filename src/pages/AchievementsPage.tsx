import { useState, useEffect, useMemo } from 'react';
import { X, Trophy, Award } from 'lucide-react';
import { achievements, type Achievement } from '../data/achievements';
import AchievementCard from '../components/AchievementCard';

const AchievementsPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selected, setSelected] = useState<Achievement | null>(null);

    const filters = useMemo(() => ['All', ...Array.from(new Set(achievements.map((a) => a.badge)))], []);

    const filteredAchievements = useMemo(
        () => (activeFilter === 'All' ? achievements : achievements.filter((a) => a.badge === activeFilter)),
        [activeFilter]
    );

    const goldCount = achievements.filter((a) => a.badge.toLowerCase().includes('gold')).length;

    // Close modal on Escape key
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelected(null);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    // Lock body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = selected ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [selected]);

    return (
        <div className="bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] left-[-10%] w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-[100px]"></div>
            </div>

            {/* --- Header Section --- */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-16 text-center relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-4">
                        &lt;Hall of Fame /&gt;
                    </p>
                    <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 md:mb-8 font-heading leading-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Achievements</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-2xl mx-auto">
                        From national robot olympiads to international STEM competitions — the wins earned by our students and mentored teams.
                    </p>
                </div>
            </section>

            {/* --- Stats --- */}
            <section className="pb-12 relative z-10">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
                    <div className="bg-surface-dark backdrop-blur-md rounded-sm border border-white/5 p-6 text-center">
                        <div className="text-3xl font-bold text-zan-cyan font-heading mb-1">{achievements.length}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Total Wins</div>
                    </div>
                    <div className="bg-surface-dark backdrop-blur-md rounded-sm border border-white/5 p-6 text-center">
                        <div className="text-3xl font-bold text-zan-cyan font-heading mb-1">{goldCount}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Gold Medals</div>
                    </div>
                    <div className="bg-surface-dark backdrop-blur-md rounded-sm border border-white/5 p-6 text-center col-span-2 sm:col-span-1">
                        <div className="text-3xl font-bold text-zan-cyan font-heading mb-1">{filters.length - 1}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Competitions</div>
                    </div>
                </div>
            </section>

            {/* --- Filter Chips --- */}
            <section className="pb-10 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-3">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${activeFilter === filter
                                    ? 'bg-zan-cyan text-black border-zan-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                                    : 'bg-surface-dark text-gray-300 border-white/10 hover:border-zan-cyan/50 hover:text-zan-cyan'
                                }`}
                        >
                            {filter === 'All' ? <Award className="w-3.5 h-3.5" /> : <Trophy className="w-3.5 h-3.5" />}
                            {filter}
                        </button>
                    ))}
                </div>
            </section>

            {/* --- Achievements Grid --- */}
            <section className="pb-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredAchievements.length === 0 ? (
                        <div className="text-center text-gray-400 py-20 bg-surface-dark rounded-sm border border-white/10">
                            <p className="text-lg font-light">No achievements found for this filter.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredAchievements.map((item) => (
                                <AchievementCard key={item.team} item={item} onClick={() => setSelected(item)} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* --- Detail Modal --- */}
            {selected && (
                <div
                    className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="relative bg-surface-dark border border-zan-cyan/20 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_40px_rgba(0,240,255,0.15)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-zan-cyan hover:text-black text-white rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <img src={selected.image} alt={selected.team} className="w-full max-h-[50vh] object-cover object-top" />
                        <div className="p-6 md:p-8">
                            <div className="inline-flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-zan-cyan bg-zan-cyan/10 border border-zan-cyan/30 px-3 py-1 rounded-sm">
                                <Trophy className="w-4 h-4" />
                                {selected.badge}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading uppercase tracking-wide">
                                {selected.team}
                            </h3>
                            <p className="text-gray-300 leading-relaxed font-light">{selected.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AchievementsPage;
