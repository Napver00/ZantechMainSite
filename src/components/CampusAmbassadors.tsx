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
        <div className="bg-surface-dark backdrop-blur-md rounded-sm p-8 border border-white/5 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] hover:border-zan-cyan/30 transition-all duration-500 transform hover:-translate-y-2 text-center flex-grow flex flex-col relative overflow-hidden">
            {/* Tech Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zan-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative mb-6 inline-block mx-auto">
                <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-br from-zan-cyan/50 to-zan-neon/50 group-hover:from-zan-cyan group-hover:to-zan-neon transition-all duration-500">
                    <img
                        src={ambassador.image_url}
                        alt={ambassador.name}
                        className="w-full h-full rounded-full object-cover border-4 border-black group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    />
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black/80 backdrop-blur-md text-zan-cyan px-4 py-1 rounded-sm text-xs font-bold uppercase tracking-wider shadow-lg border border-zan-cyan/30 whitespace-nowrap">
                        Ambassador
                    </div>
                </div>
            </div>
            <div className="flex-grow flex flex-col pt-4 relative z-10">
                <h3 className="text-xl font-bold text-white mb-2 font-heading group-hover:text-zan-cyan transition-colors uppercase tracking-wide">{ambassador.name}</h3>
                <p className="text-zan-neon font-mono text-xs mb-4 uppercase tracking-widest">{ambassador.campus}</p>
                <p className="text-gray-400 mb-4 leading-relaxed flex-grow text-sm font-light">{ambassador.bio}</p>
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
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-lg animate-fadeIn">
            <div className="bg-surface-dark rounded-sm shadow-2xl w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto border border-zan-cyan/20 animate-scaleIn">
                {/* Tech Overlay */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zan-cyan via-zan-neon to-zan-cyan animate-shine"></div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-zan-cyan/10 text-zan-cyan mb-4 border border-zan-cyan/20">
                        <Star className="w-6 h-6 animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-heading uppercase tracking-wide">Become an Ambassador</h3>
                    <p className="text-gray-400 mt-2 font-light text-sm">Join our community and lead the change!</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-5">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-zan-cyan uppercase tracking-widest">Full Name</label>
                            <input name="name" type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-sm focus:border-zan-cyan focus:ring-1 focus:ring-zan-cyan outline-none transition-all text-white placeholder-gray-600 font-mono text-sm" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-zan-cyan uppercase tracking-widest">Email Address</label>
                            <input name="email" type="email" placeholder="your.email@university.com" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-sm focus:border-zan-cyan focus:ring-1 focus:ring-zan-cyan outline-none transition-all text-white placeholder-gray-600 font-mono text-sm" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-zan-cyan uppercase tracking-widest">University/Campus</label>
                            <input name="campus" type="text" placeholder="Your University" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-sm focus:border-zan-cyan focus:ring-1 focus:ring-zan-cyan outline-none transition-all text-white placeholder-gray-600 font-mono text-sm" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-zan-cyan uppercase tracking-widest">Phone Number</label>
                            <input name="phone" type="tel" placeholder="Your Phone Number" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-sm focus:border-zan-cyan focus:ring-1 focus:ring-zan-cyan outline-none transition-all text-white placeholder-gray-600 font-mono text-sm" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-zan-cyan uppercase tracking-widest">Your Photo</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-sm hover:bg-white/5 transition-colors group cursor-pointer relative bg-black/20">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-10 w-10 text-gray-500 group-hover:text-zan-cyan transition-colors" />
                                    <div className="flex text-sm text-gray-400 justify-center font-mono">
                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-sm font-medium text-zan-cyan hover:text-cyan-400 focus-within:outline-none">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="image" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    {fileName ? (
                                        <p className="text-xs text-zan-cyan font-medium mt-2 bg-zan-cyan/10 py-1 px-2 rounded-sm inline-block border border-zan-cyan/20">{fileName}</p>
                                    ) : (
                                        <p className="text-xs text-gray-600">PNG, JPG up to 2MB</p>
                                    )}
                                </div>
                                <div className="absolute inset-0" onClick={() => document.getElementById('file-upload')?.click()}></div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-zan-cyan uppercase tracking-widest">Why do you want to join?</label>
                            <textarea name="message" placeholder="Tell us about your passion for tech..." rows={4} className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-sm focus:border-zan-cyan focus:ring-1 focus:ring-zan-cyan outline-none transition-all text-white placeholder-gray-600 font-mono text-sm resize-none"></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-zan-cyan text-black py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <span>Apply Now</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    {statusMessage && (
                        <div className={`flex items-center justify-center space-x-2 p-3 rounded-sm ${statusMessage.includes('success') ? 'bg-green-500/10 border border-green-500 text-green-400' : 'bg-red-500/10 border border-red-500 text-red-400'}`}>
                            {statusMessage.includes('success') && <CheckCircle className="w-5 h-5" />}
                            <p className="text-sm font-mono tracking-wide">{statusMessage}</p>
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
            <section id="ambassadors" className="py-16 md:py-24 bg-zan-dark relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12 md:mb-16">
                        <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-4">
                            &lt;Field Operatives /&gt;
                        </p>
                        <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-white mb-6 font-heading uppercase tracking-wide">
                            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Campus Ambassadors</span>
                        </h2>
                        <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                            Our passionate ambassadors are driving tech innovation at universities across the nation. Join the movement!
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center text-gray-400 py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-zan-cyan"></div>
                            <p className="mt-4 font-mono text-sm tracking-widest uppercase">Initializing operatives...</p>
                        </div>
                    ) : ambassadors.length === 0 ? (
                        <div className="text-center text-gray-400 py-20 bg-surface-dark rounded-sm border border-white/10">
                            <p className="text-lg font-mono">No field operatives found. Be the first to join!</p>
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
                            className="inline-flex items-center space-x-2 bg-zan-cyan text-black px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
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