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
        <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col">
            <div className="relative overflow-hidden h-56">
                <img
                    src={workshop.thumbnail}
                    alt={workshop.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-zan-blue dark:text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        Workshop
                    </div>
                </div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 font-heading group-hover:text-zan-blue dark:group-hover:text-blue-400 transition-colors">
                    {workshop.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 flex-grow leading-relaxed text-sm">
                    {workshop.excerpt || 'Join us for an exciting hands-on workshop experience.'}
                </p>

                <Link
                    to={`/workshop/${workshop.id}`}
                    className="w-full mt-auto bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white py-4 rounded-xl font-semibold text-center hover:bg-zan-blue hover:text-white dark:hover:bg-zan-blue transition-all duration-300 flex items-center justify-center space-x-2 group/btn border border-gray-100 dark:border-white/5"
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
        fetch(`${API_BASE_URL}/api/posts/published?category=workshop`)
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
        <section id="workshops" className="py-24 bg-zan-light dark:bg-zan-dark relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white font-heading mb-4">
                        Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-blue to-zan-red">Workshops</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Hands-on learning experiences designed to inspire the next generation of innovators in robotics, programming, and AI.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center text-gray-600 dark:text-gray-300 py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-zan-blue"></div>
                        <p className="mt-4 font-medium">Loading workshops...</p>
                    </div>
                ) : workshops.length === 0 ? (
                    <div className="text-center text-gray-600 dark:text-gray-300 py-20 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
                        <p className="text-lg">No workshops available at the moment. Check back soon!</p>
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

                <div className="mt-16 text-center">
                    <Link
                        to="/workshops"
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-zan-blue to-blue-700 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <span>View All Workshops</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default WorkshopsSection;