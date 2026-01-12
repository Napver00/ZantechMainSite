import React from 'react';
import { Star, Quote } from 'lucide-react';

// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Helper component to render star ratings
const StarRating = ({ rating }: { rating: number }) => {
    const totalStars = 5;
    return (
        <div className="flex space-x-1">
            {[...Array(totalStars)].map((_, index) => (
                <Star
                    key={index}
                    className={`w-3 h-3 ${index < rating ? 'text-zan-neon fill-zan-neon' : 'text-gray-700'}`}
                />
            ))}
        </div>
    );
};

// Static data for testimonials
const testimonials = [
    {
        id: 1,
        name: 'Afif Rahman',
        course: 'University Robotics Workshop',
        quote: 'একজন ইঞ্জিনিয়ারিং ছাত্র হিসেবে, আমার জ্ঞান বেশিরভাগই তাত্ত্বিক ছিল। zantech হাতে-কলমে কর্মশালা সেই ব্যবধান পুরোপুরি পূরণ করেছিল। একদিনে একটি আসল রোবট তৈরি এবং প্রোগ্রামিং করা ছিল একটি অবিশ্বাস্য অভিজ্ঞতা যা আমাকে ব্যবহারিক চ্যালেঞ্জের জন্য প্রস্তুত করেছিল।',
        rating: 5
    },
    {
        id: 2,
        name: 'Nadia Islam',
        course: 'IoT & Automation Projects',
        quote: 'Finding reliable Arduino and ESP modules used to be difficult. Zantech is my go-to supplier now. Their components are high-quality, and their free guidance helped me troubleshoot my smart home project successfully.',
        rating: 5
    },
    {
        id: 3,
        name: 'Mr. Karim Chowdhury',
        course: 'Educator Partnership',
        quote: 'zantech আমাদের কলেজে এক উত্তেজনার ঢেউ এনেছে। তারা একটি বিনামূল্যের workshop জন্য সমস্ত হার্ডওয়্যার এবং বিশেষজ্ঞ প্রশিক্ষক সরবরাহ করেছে, যার ফলে রোবোটিক্স এমন শিক্ষার্থীদের কাছে সহজলভ্য হয়ে উঠেছে যারা আগে কখনও এই সুযোগ পাননি। তাদের লক্ষ্য সত্যিকার অর্থে ক্ষমতায়ন করা।',
        rating: 5
    },
    {
        id: 4,
        name: 'Samin Yasar',
        course: 'Intro to Programming',
        quote: 'I thought coding was going to be boring and hard, but the Zantech team made it fun and exciting! They helped me build my first game. Now I want to become a programmer and create things myself.',
        rating: 5
    },
    {
        id: 5,
        name: 'Farhana Akhter',
        course: 'Custom R&D Services',
        quote: 'Zantech\'s R&D team was instrumental in developing a prototype for our automated irrigation system. Their technical expertise and innovative approach saved us significant time and resources, giving us a competitive edge.',
        rating: 5
    },
    {
        id: 6,
        name: 'Sumaiya & Tanim',
        course: 'National Science Fair Project',
        quote: 'আমাদের প্রকল্পের মাধ্যমে আমরা প্রথম স্থান অর্জন করেছি, এবং জ্যানটেক ছাড়া আমরা এটি করতে পারতাম না। তারা কেবল আমাদের যন্ত্রাংশ বিক্রি করেনি; তাদের পরামর্শই ছিল চ্যালেঞ্জগুলি কাটিয়ে ওঠার মূল চাবিকাঠি। তারা উদ্ভাবকদের জন্য একটি প্রকৃত সম্প্রদায় তৈরি করছে।',
        rating: 5
    },
    {
        id: 7,
        name: 'Ayesha Siddika',
        course: 'AI/ML for Beginners',
        quote: 'AI felt like a very advanced topic, but Zantech\'s workshop broke it down into simple, understandable concepts. It ignited my passion for data science and showed me a clear path to start my learning journey.',
        rating: 5
    },
    {
        id: 8,
        name: 'Rifat Hossain',
        course: 'Hobbyist & Innovator',
        quote: 'জ্যানটেক কেবল একটি যন্ত্রাংশের দোকানই নয়; এটি বাংলাদেশের নির্মাতা আন্দোলনের প্রাণকেন্দ্র। তাদের পণ্যের গুণমান এবং প্রতিটি শিক্ষার্থীকে শিখতে সাহায্য করার প্রতিশ্রুতি তাদের আমাদের জাতির জন্য এক অমূল্য সম্পদ করে তোলে।',
        rating: 5
    }
];

const Testimonials = () => {
    const renderTestimonialCard = (testimonial: typeof testimonials[0]) => (
        <div className="h-full bg-surface-dark backdrop-blur-md p-8 rounded-sm border border-white/5 flex flex-col shadow-lg hover:border-zan-cyan/30 transition-all duration-300 group relative">
            {/* Tech Decoration */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-zan-cyan/20 group-hover:border-zan-cyan/50 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-zan-cyan/20 group-hover:border-zan-cyan/50 transition-colors"></div>

            <div className="mb-6">
                <div className="w-10 h-10 bg-zan-cyan/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-zan-cyan/10 transition-colors duration-300 border border-zan-cyan/10">
                    <Quote className="w-4 h-4 text-zan-cyan" />
                </div>
                <div className="flex mb-4">
                    <StarRating rating={testimonial.rating} />
                </div>
                <p className="text-gray-400 mb-6 flex-grow leading-relaxed italic relative z-10 text-sm font-light">
                    "{testimonial.quote}"
                </p>
            </div>
            <div className="mt-auto pt-6 border-t border-white/5 flex items-center">
                <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-zan-dark to-black border border-white/10 flex items-center justify-center text-zan-cyan font-bold text-sm mr-3 font-mono">
                    {testimonial.name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm font-heading tracking-wide">{testimonial.name}</h4>
                    <p className="text-xs text-zan-cyan/70 font-mono uppercase tracking-wider">{testimonial.course}</p>
                </div>
            </div>
        </div>
    );

    return (
        <section id="testimonials" className="py-24 bg-zan-dark relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[10%] left-[-5%] w-96 h-96 bg-zan-red/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-2">
                        &lt;Testimonials /&gt;
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white font-heading mb-4">
                        What Learners <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Say About Us</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
                        Real experiences and growth stories from our community.
                    </p>
                </div>

                <div className="testimonial-slider-container">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={true}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        modules={[Pagination, Navigation, Autoplay]}
                        breakpoints={{
                            640: { slidesPerView: 1, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 30 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                        }}
                        className="!pb-16" // Add padding bottom for pagination
                    >
                        {testimonials.map((item) => (
                            <SwiperSlide key={item.id} className="h-auto">
                                {renderTestimonialCard(item)}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;