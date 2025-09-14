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
    { id: 1, name: 'Shornika', course: '3D Design & Printing', quote: 'Their tech lab is one of the finest in Bangladesh and here we got to learn 3D Printing, Robotics and Arduino. I am hoping this would help me in my future.', rating: 5 },
    { id: 2, name: 'Dariya Sohayla', course: 'Python Basic Course', quote: 'DIP Foundation থেকে আমি প্রোগ্রামিং শিখেছি। অনেকখানি আমার करियर এর জন্যে এগুলো দরকারি।', rating: 5 },
    { id: 3, name: 'Junayed Rafi', course: 'Robotics & Drones', quote: 'হাই, আমি তোমাদের রাফি, গত ছয়-মাস থেকে আমি DIP Foundation এর DIP Tech ল্যাবে কাজ করছি।', rating: 5 },
    { id: 4, name: 'Junayed Rafi', course: 'Robotics & Drones', quote: 'হাই, আমি তোমাদের রাফি, গত ছয়-মাস থেকে আমি DIP Foundation এর DIP Tech ল্যাবে কাজ করছি।', rating: 5 },
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