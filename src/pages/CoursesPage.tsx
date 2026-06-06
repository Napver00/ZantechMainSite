import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, BookOpen, Tag, PlayCircle } from 'lucide-react';
import Pagination from '../components/Pagination';
import { API_BASE_URL } from '../config';

interface Course {
    id: number;
    title: string;
    slug: string;
    thumbnail: string;
    category: string;
    tags: string[];
    short_description: string;
    price: number | null;
    discount_price: number | null;
    reg_link: string;
    serial_number: number;
    created_at: string;
}

interface Tutorial {
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
    const displayPrice = course.discount_price ?? course.price;
    const hasDiscount = course.discount_price != null && course.price != null && course.discount_price < course.price;

    return (
        <div className="group h-full flex flex-col">
            <div className="bg-surface-dark backdrop-blur-md rounded-sm overflow-hidden border border-white/5 hover:border-zan-cyan/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col relative">
                <div className="absolute top-0 right-0 w-8 h-8 flex justify-end z-10">
                    <div className="w-full h-full border-t border-r border-zan-cyan/20 group-hover:border-zan-cyan/50 transition-colors"></div>
                </div>

                <div className="relative overflow-hidden h-52">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zan-dark/90 to-transparent"></div>
                    <div className="absolute top-3 right-3 flex gap-2 flex-wrap justify-end">
                        <div className="bg-zan-dark/80 backdrop-blur-sm text-zan-cyan px-3 py-1 rounded-sm text-xs font-mono uppercase tracking-wider border border-zan-cyan/20">
                            {course.category}
                        </div>
                        {displayPrice != null ? (
                            <div className="bg-zan-red/90 backdrop-blur-sm text-white px-3 py-1 rounded-sm text-xs font-mono font-bold">
                                ৳{displayPrice}
                                {hasDiscount && <span className="line-through ml-1 opacity-60">৳{course.price}</span>}
                            </div>
                        ) : (
                            <div className="bg-zan-cyan/90 backdrop-blur-sm text-black px-3 py-1 rounded-sm text-xs font-mono font-bold">
                                Free
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                    {course.tags && course.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {course.tags.slice(0, 2).map((tag, i) => (
                                <span key={i} className="inline-flex items-center gap-1 text-xs font-mono text-gray-500 border border-white/5 px-2 py-0.5 rounded-sm">
                                    <Tag className="w-2.5 h-2.5" /> {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 font-heading group-hover:text-zan-cyan transition-colors tracking-wide">
                        {course.title}
                    </h3>
                    <p className="text-gray-400 mb-6 line-clamp-3 flex-grow leading-relaxed text-sm font-light">
                        {course.short_description}
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

const TutorialCard = ({ tutorial }: { tutorial: Tutorial }) => {
    const getRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (diff >= 31536000) return `${Math.floor(diff / 31536000)}y ago`;
        if (diff >= 2592000) return `${Math.floor(diff / 2592000)}mo ago`;
        if (diff >= 604800) return `${Math.floor(diff / 604800)}w ago`;
        if (diff >= 86400) return `${Math.floor(diff / 86400)}d ago`;
        return 'Recently';
    };

    return (
        <div className="group h-full flex flex-col">
            <div className="bg-surface-dark backdrop-blur-md rounded-sm overflow-hidden border border-white/5 hover:border-zan-red/50 hover:shadow-[0_0_15px_rgba(255,51,51,0.08)] transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col relative">
                <div className="absolute top-0 right-0 w-8 h-8 flex justify-end z-10">
                    <div className="w-full h-full border-t border-r border-zan-red/20 group-hover:border-zan-red/50 transition-colors"></div>
                </div>

                <div className="relative overflow-hidden h-52">
                    <img
                        src={tutorial.thumbnail}
                        alt={tutorial.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zan-dark/90 to-transparent"></div>
                    <div className="absolute top-3 right-3 flex gap-2">
                        <div className="bg-zan-dark/80 backdrop-blur-sm text-zan-red px-3 py-1 rounded-sm text-xs font-mono uppercase tracking-wider border border-zan-red/20">
                            Free
                        </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle className="w-14 h-14 text-white/80" />
                    </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-3 mb-3 text-xs font-mono uppercase tracking-wide text-gray-500">
                        <span>{getRelativeTime(tutorial.created_at)}</span>
                        {tutorial.tags && tutorial.tags.length > 0 && (
                            <span className="flex items-center gap-1">
                                <Tag className="w-2.5 h-2.5" /> {tutorial.tags[0]}
                            </span>
                        )}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 font-heading group-hover:text-zan-red transition-colors tracking-wide">
                        {tutorial.title}
                    </h3>
                    <p className="text-gray-400 mb-6 line-clamp-3 flex-grow leading-relaxed text-sm font-light">
                        {tutorial.meta_description}
                    </p>
                    <Link
                        to={`/course/${tutorial.slug}`}
                        className="w-full mt-auto bg-transparent text-zan-red py-3 rounded-sm font-bold uppercase tracking-widest text-xs border border-zan-red/30 hover:bg-zan-red hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                    >
                        <span>Watch Free</span>
                        <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

const CoursesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = (searchParams.get('tab') as 'courses' | 'free') || 'courses';
    const currentPage = parseInt(searchParams.get('page') || '1');

    const [courses, setCourses] = useState<Course[]>([]);
    const [tutorials, setTutorials] = useState<Tutorial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [coursesTotalPages, setCoursesTotalPages] = useState(1);
    const [tutorialsTotalPages, setTutorialsTotalPages] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [coursesRes, tutorialsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/courses/published?limit=${itemsPerPage}&page=${activeTab === 'courses' ? currentPage : 1}`),
                    fetch(`${API_BASE_URL}/api/posts/published?category=tutorial&limit=${itemsPerPage}&page=${activeTab === 'free' ? currentPage : 1}`),
                ]);

                if (!coursesRes.ok || !tutorialsRes.ok) throw new Error('Failed to fetch data');

                const [coursesResult, tutorialsResult] = await Promise.all([
                    coursesRes.json(),
                    tutorialsRes.json(),
                ]);

                if (coursesResult.success) {
                    const data = Array.isArray(coursesResult.data) ? coursesResult.data : coursesResult.data ? [coursesResult.data] : [];
                    setCourses(data);
                    if (coursesResult.pagination) setCoursesTotalPages(coursesResult.pagination.total_pages);
                }

                if (tutorialsResult.success) {
                    const data = Array.isArray(tutorialsResult.data) ? tutorialsResult.data : tutorialsResult.data ? [tutorialsResult.data] : [];
                    setTutorials(data);
                    if (tutorialsResult.pagination) setTutorialsTotalPages(tutorialsResult.pagination.total_pages);
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred while loading courses.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage, activeTab]);

    const handleTabChange = (tab: 'courses' | 'free') => setSearchParams({ tab, page: '1' });
    const handlePageChange = (page: number) => setSearchParams({ tab: activeTab, page: page.toString() });

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [currentPage, activeTab]);

    const currentList = activeTab === 'courses' ? courses : tutorials;
    const totalPages = activeTab === 'courses' ? coursesTotalPages : tutorialsTotalPages;

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
                <button onClick={() => window.location.reload()} className="px-4 py-2 bg-zan-cyan text-black rounded hover:bg-zan-cyan/80 transition">Retry</button>
            </div>
        );
    }

    return (
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-zan-dark min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-4">&lt;Education Database /&gt;</p>
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
                            onClick={() => handleTabChange('courses')}
                            className={`px-6 py-2.5 text-sm font-bold uppercase tracking-wider rounded-sm transition-all duration-300 ${activeTab === 'courses' ? 'bg-zan-cyan text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Active Courses
                        </button>
                        <button
                            onClick={() => handleTabChange('free')}
                            className={`px-6 py-2.5 text-sm font-bold uppercase tracking-wider rounded-sm transition-all duration-300 ${activeTab === 'free' ? 'bg-zan-red text-white shadow-[0_0_15px_rgba(255,50,50,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Free Tutorials
                        </button>
                    </div>
                </div>

                {currentList.length === 0 ? (
                    <div className="text-center text-gray-400 py-20 bg-surface-dark rounded-sm border border-white/10">
                        <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-lg font-mono">
                            No {activeTab === 'courses' ? 'courses' : 'free tutorials'} available at this time.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {activeTab === 'courses'
                                ? courses.map(c => <CourseCard key={c.id} course={c} />)
                                : tutorials.map(t => <TutorialCard key={t.id} tutorial={t} />)
                            }
                        </div>
                        {totalPages > 1 && (
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default CoursesPage;
