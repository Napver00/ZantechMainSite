import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Users } from 'lucide-react';
import Pagination from '../components/Pagination';
import { API_BASE_URL } from '../config';

interface Course {
    id: number;
    title: string;
    slug: string;
    thumbnail: string;
    category: string;
    tags: string[];
    meta_description: string;
    created_at: string;
    serial: number | null;
}

const CourseCard = ({ course }: { course: Course }) => {
    // Show category name as requested
    const category = course.category || 'Course';

    // Calculate relative time (e.g., "2 weeks ago")
    const getRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
        };

        if (diffInSeconds >= intervals.year) {
            const years = Math.floor(diffInSeconds / intervals.year);
            return `${years} ${years === 1 ? 'year' : 'years'} ago`;
        } else if (diffInSeconds >= intervals.month) {
            const months = Math.floor(diffInSeconds / intervals.month);
            return `${months} ${months === 1 ? 'month' : 'months'} ago`;
        } else if (diffInSeconds >= intervals.week) {
            const weeks = Math.floor(diffInSeconds / intervals.week);
            return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
        } else if (diffInSeconds >= intervals.day) {
            const days = Math.floor(diffInSeconds / intervals.day);
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        }
        return 'Recently';
    };

    const duration = getRelativeTime(course.created_at);

    // Deterministic random students count between 122 and 180 based on ID
    // Range size: 180 - 122 + 1 = 59
    const students = 122 + ((course.id * 13) % 59);

    return (
        <div className="group h-full flex flex-col">
            <div className="bg-surface-dark backdrop-blur-md rounded-sm overflow-hidden border border-white/5 hover:border-zan-cyan/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col relative">
                {/* Tech Corner Accents */}
                <div className="absolute top-0 right-0 w-8 h-8 flex justify-end">
                    <div className="w-full h-full border-t border-r border-zan-cyan/20 group-hover:border-zan-cyan/50 transition-colors"></div>
                </div>

                <div className="relative overflow-hidden h-56 clip-path-slant-bottom">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zan-dark/90 to-transparent opacity-100"></div>
                    <div className="absolute top-4 right-4">
                        <div className="bg-zan-dark/80 backdrop-blur-sm text-zan-cyan px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider border border-zan-cyan/20">
                            {category}
                        </div>
                    </div>
                </div>
                <div className="p-6 md:p-8 flex-grow flex flex-col relative">
                    <div className="flex items-center space-x-6 mb-4 text-xs font-mono uppercase tracking-wide text-gray-500">
                        <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1.5 text-zan-cyan" />
                            <span>{duration}</span>
                        </div>
                        <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1.5 text-zan-cyan" />
                            <span>{students} Students</span>
                        </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 line-clamp-2 font-heading group-hover:text-zan-cyan transition-colors tracking-wide">
                        {course.title}
                    </h3>
                    <p className="text-gray-400 mb-6 line-clamp-3 flex-grow leading-relaxed text-sm font-light">
                        {course.meta_description}
                    </p>

                    <Link
                        to={`/course/${course.slug}`}
                        className="w-full mt-auto bg-transparent text-zan-cyan py-3 rounded-sm font-bold uppercase tracking-widest text-xs border border-zan-cyan/30 hover:bg-zan-cyan hover:text-black transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                    >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

const CoursesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Derived state from URL
    const activeTab = (searchParams.get('tab') as 'premium' | 'free') || 'premium';
    const currentPage = parseInt(searchParams.get('page') || '1');

    const [paidCourses, setPaidCourses] = useState<Course[]>([]);
    const [freeCourses, setFreeCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                // Fetch Paid Courses (Category: Course)
                const paidResponsePromise = fetch(`${API_BASE_URL}/api/posts/published?category=Course&limit=100`);
                // Fetch Free Courses (Category: tutorial)
                const freeResponsePromise = fetch(`${API_BASE_URL}/api/posts/published?category=tutorial&limit=100`);

                const [paidResponse, freeResponse] = await Promise.all([paidResponsePromise, freeResponsePromise]);

                if (!paidResponse.ok || !freeResponse.ok) throw new Error('Failed to fetch courses');

                const paidResult = await paidResponse.json();
                const freeResult = await freeResponse.json();

                // Process Paid Courses
                if (paidResult.success) {
                    let fetchedPaidCourses: Course[] = Array.isArray(paidResult.data) ? paidResult.data : [paidResult.data];
                    fetchedPaidCourses.sort((a, b) => {
                        if (a.serial && b.serial) return a.serial - b.serial;
                        if (a.serial && a.serial > 0) {
                            if (!b.serial || b.serial <= 0) return -1;
                            return a.serial - b.serial;
                        }
                        if (b.serial && b.serial > 0) return 1;
                        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                    });
                    setPaidCourses(fetchedPaidCourses);
                } else {
                    console.error('Failed to load paid courses:', paidResult.message);
                }

                // Process Free Courses
                if (freeResult.success) {
                    let fetchedFreeCourses: Course[] = Array.isArray(freeResult.data) ? freeResult.data : [freeResult.data];
                    fetchedFreeCourses.sort((a, b) => {
                        if (a.serial && b.serial) return a.serial - b.serial;
                        if (a.serial && a.serial > 0) {
                            if (!b.serial || b.serial <= 0) return -1;
                            return a.serial - b.serial;
                        }
                        if (b.serial && b.serial > 0) return 1;
                        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                    });
                    setFreeCourses(fetchedFreeCourses);
                } else {
                    console.error('Failed to load free courses:', freeResult.message);
                }

            } catch (err) {
                console.error(err);
                setError('An error occurred while loading courses.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Active Courses based on Tab
    const currentList = activeTab === 'premium' ? paidCourses : freeCourses;

    // Pagination
    const totalPages = Math.ceil(currentList.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCourses = currentList.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setSearchParams({ tab: activeTab, page: pageNumber.toString() });
    };

    const handleTabChange = (tab: 'premium' | 'free') => {
        setSearchParams({ tab, page: '1' });
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, activeTab]);

    if (loading) {
        return (
            <div className="min-h-screen bg-zan-dark flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-zan-cyan"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-zan-dark flex flex-col items-center justify-center text-white">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-zan-cyan text-black rounded hover:bg-zan-cyan/80 transition"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-4">
                        &lt;Education Database /&gt;
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
                        Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Courses</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Expand your skills with our industry-leading courses in robotics, AI, and engineering.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="bg-surface-dark border border-white/10 p-1 rounded-sm inline-flex">
                        <button
                            onClick={() => handleTabChange('premium')}
                            className={`px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-sm transition-all duration-300 ${activeTab === 'premium'
                                    ? 'bg-zan-cyan text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Premium Courses
                        </button>
                        <button
                            onClick={() => handleTabChange('free')}
                            className={`px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-sm transition-all duration-300 ${activeTab === 'free'
                                    ? 'bg-zan-red text-white shadow-[0_0_15px_rgba(255,50,50,0.3)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Free Tutorials
                        </button>
                    </div>
                </div>

                {currentList.length === 0 ? (
                    <div className="text-center text-gray-400 py-20 bg-surface-dark rounded-sm border border-white/10">
                        <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-lg font-mono">
                            No {activeTab === 'premium' ? 'premium courses' : 'free tutorials'} found.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>

                        {currentList.length > itemsPerPage && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default CoursesPage;
