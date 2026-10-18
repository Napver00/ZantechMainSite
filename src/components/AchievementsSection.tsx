import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Trophy, Medal } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { achievements } from '../data/achievements';
import AchievementCard from './AchievementCard';

// Home page: student awards from data/achievements, full list on /achievements
const AchievementsSection = () => {
    const navigate = useNavigate();
    if (achievements.length === 0) return null;

    const goldCount = achievements.filter((a) => a.badge.toLowerCase().includes('gold')).length;
    const openAll = () => navigate('/achievements');

    return (
        <section id="achievements" className="py-16 md:py-24 bg-surface-dark relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-10 md:mb-12">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-2">&lt;Hall of Fame /&gt;</p>
                    <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-white font-heading mb-4">
                        Our Students' <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Achievements</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
                        From national rounds to international stages — teams mentored by ZAN Tech keep bringing home medals.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 md:mb-12">
                    <div className="flex items-center gap-3 px-5 py-3 bg-zan-dark border border-zan-cyan/20 rounded-sm">
                        <Trophy className="w-6 h-6 text-zan-cyan" />
                        <div className="text-left">
                            <div className="text-2xl font-bold text-white font-heading leading-none">{achievements.length}</div>
                            <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mt-1">Awards won</div>
                        </div>
                    </div>
                    {goldCount > 0 && (
                        <div className="flex items-center gap-3 px-5 py-3 bg-zan-dark border border-yellow-400/30 rounded-sm">
                            <Medal className="w-6 h-6 text-yellow-400" />
                            <div className="text-left">
                                <div className="text-2xl font-bold text-white font-heading leading-none">{goldCount}</div>
                                <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mt-1">Gold medals</div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="course-slider-container">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={24}
                        loop={achievements.length > 3}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        navigation={achievements.length > 3}
                        autoplay={{ delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
                        modules={[Pagination, Navigation, Autoplay]}
                        breakpoints={{
                            768: { slidesPerView: 2, spaceBetween: 24 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                        }}
                        className="!pb-16"
                    >
                        {achievements.map((item) => (
                            <SwiperSlide key={item.team + item.badge} className="h-auto">
                                <AchievementCard item={item} onClick={openAll} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="mt-6 flex justify-center">
                    <Link
                        to="/achievements"
                        className="inline-flex items-center space-x-2 bg-zan-cyan text-black px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                    >
                        <span>View All Achievements</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AchievementsSection;
