import React from 'react';
import { ArrowRight, Star, Quote } from 'lucide-react';

// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Helper component to render star ratings
const StarRating = ({ rating }) => {
    const totalStars = 5;
    return (
        <div className="flex">
            {[...Array(totalStars)].map((_, index) => (
                <Star
                    key={index}
                    className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
            ))}
        </div>
    );
};

// Static data for testimonials - Corrected and without imageUrl
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
        name: 'Farhana Akhter, CEO of AgriTech Solutions',
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
    const renderTestimonialCard = (testimonial) => (
        // Updated Card Styles for Dark Background
        <div className="h-full bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-white/20 flex flex-col">
            <Quote className="w-10 h-10 text-gray-400 mb-4" />
            <p className="text-gray-300 mb-6 flex-grow">
                {testimonial.quote}
            </p>
            <div>
                <h4 className="font-bold text-white">{testimonial.name}</h4>
                <p className="text-sm text-gray-400">{testimonial.course}</p>
                <div className="mt-1">
                    <StarRating rating={testimonial.rating} />
                </div>
            </div>
        </div>
    );

    return (
        // Updated Section Styles
        <section id="testimonials" className="py-20 bg-zan-blue">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        What Learners Say's About Us
                    </h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-4">
                        Hear from our students—real experiences, real growth.
                    </p>
                </div>

                {testimonials.length > 3 ? (
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
                        {testimonials.map((item) => (
                            <SwiperSlide key={item.id} className="pb-12">
                                {renderTestimonialCard(item)}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((item) => (
                            <div key={item.id}>
                                {renderTestimonialCard(item)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Testimonials;