import React, { useState } from 'react';
import { ArrowRight, Star, X, Upload } from 'lucide-react';
import ambassadorsData from '../data/ambassadors.json';

// --- Swiper Imports ---
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

const AmbassadorApplicationPopup = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
                <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Become an Ambassador</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Fill out the form below to apply for this exciting opportunity!</p>
            <form className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input type="text" placeholder="Your Name" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-cyan-500 transition-all" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <input type="email" placeholder="your.email@university.com" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-cyan-500 transition-all" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">University/Campus</label>
                    <input type="text" placeholder="Your University" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-cyan-500 transition-all" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Photo</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-cyan-600 hover:text-cyan-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Why do you want to join?</label>
                    <textarea placeholder="Tell us about your passion for tech..." rows={4} className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-cyan-500 transition-all"></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                    <span>Apply Now</span>
                    <ArrowRight className="w-5 h-5" />
                </button>
            </form>
        </div>
    </div>
);


const CampusAmbassadors = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const ambassadors = ambassadorsData;

    return (
        <>
            <section id="ambassadors" className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Meet Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Campus Ambassadors</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Our passionate ambassadors are driving tech innovation at universities across the nation.
                        </p>
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

                    <div className="mt-16 text-center">
                        <button
                            onClick={() => setPopupOpen(true)}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
                        >
                            <Star className="w-5 h-5" />
                            <span>Become an Ambassador</span>
                        </button>
                    </div>
                </div>
            </section>
            {isPopupOpen && <AmbassadorApplicationPopup onClose={() => setPopupOpen(false)} />}
        </>
    );
};

export default CampusAmbassadors;