import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { API_BASE_URL } from '../config';

interface Course {
    id: number;
    title: string;
    slug: string;
    thumbnail: string;
    category: string;
    short_description: string;
    price: number | null;
    discount_price: number | null;
    payment_type: 'one_time' | 'monthly';
    monthly_fee: number | null;
}

const CourseCard = ({ course }: { course: Course }) => {
    const isMonthly = course.payment_type === 'monthly';
    const displayPrice = isMonthly ? course.monthly_fee : (course.discount_price ?? course.price);

    return (
        <div className="group h-full flex flex-col">
            <div className="bg-surface-dark backdrop-blur-md rounded-sm overflow-hidden border border-white/5 hover:border-zan-cyan/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col relative">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zan-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zan-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative overflow-hidden h-52">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Course'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zan-dark/90 to-transparent"></div>
                    <div className="absolute top-4 right-4 flex gap-2">
                        <div className="bg-zan-dark/80 backdrop-blur-sm text-zan-cyan px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider border border-zan-cyan/20">
                            {course.category || 'Course'}
                        </div>
                        {displayPrice != null && (
                            <div className="bg-zan-red/90 text-white px-3 py-1.5 rounded-sm text-xs font-bold font-mono">
                                ৳{displayPrice}{isMonthly && <span className="opacity-80">/mo</span>}
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 font-heading group-hover:text-zan-cyan transition-colors uppercase tracking-wide">
                        {course.title}
                    </h3>
                    <p className="text-gray-400 mb-6 line-clamp-3 flex-grow leading-relaxed text-sm font-light">
                        {course.short_description || 'Join us for an exciting hands-on course experience.'}
                    </p>
                    <Link
                        to={`/course/${course.slug}`}
                        className="w-full mt-auto bg-transparent text-zan-cyan py-3 rounded-sm font-bold uppercase tracking-widest text-xs border border-zan-cyan/30 hover:bg-zan-cyan hover:text-black transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                    >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

const CoursesSection = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/courses/published?limit=6`)
            .then(res => res.json())
            .then(result => {
                if (result.success && result.data) {
                    const data = Array.isArray(result.data) ? result.data : [result.data];
                    setCourses(data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching courses:', err);
                setLoading(false);
            });
    }, []);

    return (
        <section id="courses" className="py-16 md:py-24 bg-surface-dark relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-2">
                        &lt;Education Modules /&gt;
                    </p>
                    <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-white font-heading mb-4">
                        Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Courses</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
                        Structured learning programmes in robotics, AI, and programming — designed for the next generation of innovators.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center text-gray-400 py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-zan-cyan"></div>
                        <p className="mt-4 font-mono text-sm tracking-widest uppercase">Loading courses...</p>
                    </div>
                ) : courses.length === 0 ? (
                    <div className="text-center text-gray-400 py-20 bg-zan-dark rounded-sm border border-white/10">
                        <p className="text-lg font-light">No courses available at the moment. Check back soon!</p>
                    </div>
                ) : courses.length > 3 ? (
                    <div className="course-slider-container">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            loop={true}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            navigation={true}
                            autoplay={{ delay: 3800, disableOnInteraction: false }}
                            modules={[Pagination, Navigation, Autoplay]}
                            breakpoints={{
                                640: { slidesPerView: 1, spaceBetween: 20 },
                                768: { slidesPerView: 2, spaceBetween: 30 },
                                1024: { slidesPerView: 3, spaceBetween: 30 },
                            }}
                            className="!pb-16"
                        >
                            {courses.map(course => (
                                <SwiperSlide key={course.id} className="h-auto">
                                    <CourseCard course={course} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map(course => <CourseCard key={course.id} course={course} />)}
                    </div>
                )}

                <div className="mt-16 flex justify-center">
                    <Link
                        to="/courses"
                        className="inline-flex items-center space-x-2 bg-zan-cyan text-black px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                    >
                        <span>View All Courses</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;
