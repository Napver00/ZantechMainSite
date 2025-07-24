import React, { useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import ambassadorsData from '../data/ambassadors.json';

// --- Swiper Imports ---
// Make sure these lines are present and correct
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// --------------------

// A dedicated component for the ambassador card
const AmbassadorCard = ({ ambassador }) => (
    <div className="group h-full flex flex-col">
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center flex-grow flex flex-col">
            <div className="relative mb-6">
                <img
                    src={ambassador.image}
                    alt={ambassador.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-cyan-500 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Ambassador
                    </div>
                </div>
            </div>

            <div className="flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {ambassador.name}
                </h3>
                <p className="text-cyan-600 dark:text-cyan-400 font-semibold mb-4">
                    {ambassador.campus}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                    {ambassador.bio}
                </p>
            </div>
        </div>
    </div>
);

const CampusAmbassadors = () => {
    const [showAmbassadorForm, setShowAmbassadorForm] = useState(false);

    const ambassadors = ambassadorsData;

    return (
        <>
            <section id="ambassadors" className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        {/* ... (section header remains the same) ... */}
                    </div>

                    {ambassadors.length > 3 ? (
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
                            {ambassadors.map((ambassador) => (
                                <SwiperSlide key={ambassador.id} className="pb-12">
                                    <AmbassadorCard ambassador={ambassador} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {ambassadors.map((ambassador) => (
                                <AmbassadorCard key={ambassador.id} ambassador={ambassador} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default CampusAmbassadors;