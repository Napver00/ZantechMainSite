import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import { API_BASE_URL } from '../config';

// --- Swiper Imports ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// --------------------

// Card component for displaying a workshop
const WorkshopCard = ({ workshop }) => (
    <div className="group h-full flex flex-col">
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col">
            <div className="relative overflow-hidden">
                <img
                    src={workshop.thumbnail}
                    alt={workshop.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                    <div className="bg-zan-blue text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Workshop
                    </div>
                </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {workshop.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                    {workshop.excerpt || 'Join us for an exciting hands-on workshop experience.'}
                </p>
                <Link 
                    to={`/workshop/${workshop.id}`} 
                    className="w-full mt-auto bg-zan-blue text-white py-3 rounded-lg font-semibold text-center hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    </div>
);

// Main Workshops section component
const WorkshopsSection = () => {
    const [workshops, setWorkshops] = useState([]);
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
        <section id="workshops" className="py-20 bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Explore Our <span className="text-zan-blue">Workshops</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Hands-on learning experiences designed to inspire the next generation of innovators in robotics, programming, and AI.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center text-gray-600 dark:text-gray-300 py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-zan-blue"></div>
                        <p className="mt-4">Loading workshops...</p>
                    </div>
                ) : workshops.length === 0 ? (
                    <div className="text-center text-gray-600 dark:text-gray-300 py-12">
                        <p className="text-lg">No workshops available at the moment. Check back soon!</p>
                    </div>
                ) : workshops.length > 3 ? (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        pagination={{ clickable: true }}
                        navigation={true}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        modules={[Pagination, Navigation, Autoplay]}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="mySwiper"
                    >
                        {workshops.map((workshop) => (
                            <SwiperSlide key={workshop.id} className="pb-12">
                                <WorkshopCard workshop={workshop} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
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
                        className="inline-flex items-center space-x-2 bg-zan-blue text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-800 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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