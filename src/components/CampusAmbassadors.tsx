import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, X, Upload, CheckCircle, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../config';

// --- Swiper Imports ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// --------------------

// Card component for displaying an ambassador
const AmbassadorCard = ({ ambassador }: { ambassador: any }) => (
    <div className="group h-full flex flex-col">
        <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-white/10 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 text-center flex-grow flex flex-col relative overflow-hidden">
            {/* Gradient Background Effect */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-zan-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative mb-6 inline-block mx-auto">
                <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-br from-zan-blue to-zan-red">
                    <img
                        src={ambassador.image_url}
                        alt={ambassador.name}
                        className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-900 group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white dark:bg-gray-800 text-zan-blue dark:text-blue-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md border border-gray-100 dark:border-gray-700 whitespace-nowrap">
                        Ambassador
                    </div>
                </div>
            </div>
            <div className="flex-grow flex flex-col pt-4 relative z-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-heading group-hover:text-zan-blue dark:group-hover:text-blue-400 transition-colors">{ambassador.name}</h3>
                <p className="text-zan-blue dark:text-blue-400 font-semibold mb-4 text-sm uppercase tracking-wide">{ambassador.campus}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow text-sm">{ambassador.bio}</p>
            </div>
        </div>
    </div>
);

// Popup form component for ambassador applications
const AmbassadorApplicationPopup = ({ onClose }: { onClose: () => void }) => {
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage('');

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch(`${API_BASE_URL}/api/ambassadors`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setStatusMessage('Application submitted successfully!');
                form.reset();
                setFileName('');
                setTimeout(() => onClose(), 2000);
            } else {
                setStatusMessage('Failed to submit. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            setStatusMessage('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-white/10 animate-scaleIn">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-zan-blue dark:text-blue-400 mb-4">
                        <Star className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Become an Ambassador</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Join our community and lead the change!</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                            <input name="name" type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-zan-blue/50 focus:border-zan-blue outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                            <input name="email" type="email" placeholder="your.email@university.com" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-zan-blue/50 focus:border-zan-blue outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">University/Campus</label>
                            <input name="campus" type="text" placeholder="Your University" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-zan-blue/50 focus:border-zan-blue outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
                            <input name="phone" type="tel" placeholder="Your Phone Number" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-zan-blue/50 focus:border-zan-blue outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Your Photo</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 dark:border-white/10 border-dashed rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer relative">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-10 w-10 text-gray-400 group-hover:text-zan-blue transition-colors" />
                                    <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-zan-blue hover:text-blue-600 focus-within:outline-none">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="image" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    {fileName ? (
                                        <p className="text-xs text-zan-blue font-medium mt-2 bg-blue-50 dark:bg-blue-900/20 py-1 px-2 rounded-lg inline-block">{fileName}</p>
                                    ) : (
                                        <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG up to 2MB</p>
                                    )}
                                </div>
                                <div className="absolute inset-0" onClick={() => document.getElementById('file-upload')?.click()}></div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Why do you want to join?</label>
                            <textarea name="message" placeholder="Tell us about your passion for tech..." rows={4} className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-zan-blue/50 focus:border-zan-blue outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-zan-blue to-blue-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <>
                                <span>Apply Now</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    {statusMessage && (
                        <div className={`flex items-center justify-center space-x-2 p-3 rounded-xl ${statusMessage.includes('success') ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`}>
                            {statusMessage.includes('success') && <CheckCircle className="w-5 h-5" />}
                            <p className="text-sm font-medium">{statusMessage}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

// Main Campus Ambassadors section component
const CampusAmbassadors = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [ambassadors, setAmbassadors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/ourambassadors/active`)
            .then(response => response.json())
            .then(apiResponse => {
                if (apiResponse.success && apiResponse.data) {
                    const data = Array.isArray(apiResponse.data) ? apiResponse.data : [apiResponse.data];
                    setAmbassadors(data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching ambassadors:', error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <section id="ambassadors" className="py-24 bg-zan-light dark:bg-zan-dark relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-blue to-zan-red">Campus Ambassadors</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Our passionate ambassadors are driving tech innovation at universities across the nation. Join the movement!
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center text-gray-600 dark:text-gray-300 py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-zan-blue"></div>
                            <p className="mt-4 font-medium">Loading ambassadors...</p>
                        </div>
                    ) : ambassadors.length === 0 ? (
                        <div className="text-center text-gray-600 dark:text-gray-300 py-20 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
                            <p className="text-lg">No ambassadors found. Be the first to join!</p>
                        </div>
                    ) : ambassadors.length > 3 ? (
                        <div className="ambassador-slider-container">
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
                                {ambassadors.map((ambassador) => (
                                    <SwiperSlide key={ambassador.id} className="h-auto">
                                        <AmbassadorCard ambassador={ambassador} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
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
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-zan-blue to-blue-700 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
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