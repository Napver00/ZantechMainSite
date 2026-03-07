import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';

// --- Swiper Imports ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// --------------------

// Card component for displaying a workshop
const WorkshopCard = ({ workshop }: { workshop: any }) => (
    <div className="group h-full flex flex-col">
        <div className="bg-surface-dark backdrop-blur-md rounded-sm overflow-hidden border border-white/5 hover:border-zan-cyan/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col relative">
            {/* Tech Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zan-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zan-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative overflow-hidden h-56 clip-path-slant-bottom">
                <img
                    src={workshop.thumbnail}
                    alt={workshop.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zan-dark/90 to-transparent opacity-100"></div>
                <div className="absolute top-4 right-4">
                    <div className="bg-zan-dark/80 backdrop-blur-sm text-zan-cyan px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider border border-zan-cyan/20">
                        Workshop
                    </div>
                </div>
            </div>
            <div className="p-8 flex-grow flex flex-col relative">
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 font-heading group-hover:text-zan-cyan transition-colors uppercase tracking-wide">
                    {workshop.title}
                </h3>
                <p className="text-gray-400 mb-6 line-clamp-3 flex-grow leading-relaxed text-sm font-light">
                    {workshop.excerpt || 'Join us for an exciting hands-on workshop experience.'}
                </p>

                <Link
                    to={`/workshop/${workshop.slug}`}
                    className="w-full mt-auto bg-transparent text-zan-cyan py-3 rounded-sm font-bold uppercase tracking-widest text-xs border border-zan-cyan/30 hover:bg-zan-cyan hover:text-black transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    </div>
);

// Main Workshops section component
const WorkshopsSection = () => {
    const [workshops, setWorkshops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/posts/published?category=workshop&limit=6`)
            .then(response => response.json())
            .then(apiResponse => {
                if (apiResponse.success && apiResponse.data) {
                    const workshopData = Array.isArray(apiResponse.data) ? apiResponse.data : [apiResponse.data];
                    setWorkshops(workshopData);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching workshops:', error);
                setLoading(false);
            });
    }, []);

    return (
        <section id="workshops" className="py-16 md:py-24 bg-zan-dark relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-2">
                        &lt;Training Modules /&gt;
                    </p>
                    <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-white font-heading mb-4">
                        Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Workshops</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
                        Hands-on learning experiences designed to inspire the next generation of innovators in robotics, programming, and AI.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center text-gray-400 py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-zan-cyan"></div>
                        <p className="mt-4 font-mono text-sm tracking-widest uppercase">Initializing modules...</p>
                    </div>
                ) : workshops.length === 0 ? (
                    <div className="text-center text-gray-400 py-20 bg-surface-dark rounded-sm border border-white/10">
                        <p className="text-lg font-light">No workshops available at the moment. Check back soon!</p>
                    </div>
                ) : workshops.length > 3 ? (
                    <div className="workshop-slider-container">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            loop={true}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            navigation={true}
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            modules={[Pagination, Navigation, Autoplay]}
                            breakpoints={{
                                640: { slidesPerView: 1, spaceBetween: 20 },
                                768: { slidesPerView: 2, spaceBetween: 30 },
                                1024: { slidesPerView: 3, spaceBetween: 30 },
                            }}
                            className="!pb-16"
                        >
                            {workshops.map((workshop) => (
                                <SwiperSlide key={workshop.id} className="h-auto">
                                    <WorkshopCard workshop={workshop} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {workshops.map((workshop) => (
                            <WorkshopCard key={workshop.id} workshop={workshop} />
                        ))}
                    </div>
                )}

                <div className="mt-16 flex flex-col items-center space-y-4">
                    <Link
                        to="/workshops"
                        className="inline-flex items-center space-x-2 bg-zan-cyan text-black px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                    >
                        <span>View All Workshops</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>

                    <a
                        href="https://projectuddipon.zantechbd.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-transparent text-zan-red border border-zan-red/30 px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-zan-red hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_15px_rgba(255,51,51,0.1)] hover:shadow-[0_0_25px_rgba(255,51,51,0.3)]"
                    >
                        <span>Explore Project Uddipon</span>
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default WorkshopsSection;