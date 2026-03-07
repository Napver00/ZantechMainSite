import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, PlayCircle, Clock, BookOpen } from 'lucide-react';
import { API_BASE_URL } from '../config';
import Pagination from '../components/Pagination';

// Tutorial Card Component
const TutorialCard = ({ tutorial }: { tutorial: any }) => {
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

    const duration = tutorial.created_at ? getRelativeTime(tutorial.created_at) : 'Recently';

    return (
        <div className="group h-full flex flex-col">
            <div className="bg-surface-dark backdrop-blur-md rounded-sm overflow-hidden border border-white/5 hover:border-zan-red/50 hover:shadow-[0_0_15px_rgba(255,50,50,0.1)] transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col relative">
                {/* Tech Corner Accents */}
                <div className="absolute top-0 right-0 w-8 h-8 flex justify-end">
                    <div className="w-full h-full border-t border-r border-zan-red/20 group-hover:border-zan-red/50 transition-colors"></div>
                </div>

                <div className="relative overflow-hidden h-56 clip-path-slant-bottom">
                    <img
                        src={tutorial.thumbnail}
                        alt={tutorial.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                        loading="lazy"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zan-dark/90 to-transparent opacity-100"></div>
                    <div className="absolute top-4 right-4">
                        <div className="bg-zan-dark/80 backdrop-blur-sm text-zan-red px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider border border-zan-red/20 flex items-center gap-2">
                            <PlayCircle className="w-3 h-3" />
                            Tutorial
                        </div>
                    </div>
                </div>
                <div className="p-6 md:p-8 flex-grow flex flex-col relative">
                    <div className="flex items-center space-x-6 mb-4 text-xs font-mono uppercase tracking-wide text-gray-500">
                        <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1.5 text-zan-red" />
                            <span>{duration}</span>
                        </div>
                        <div className="flex items-center">
                            <BookOpen className="w-3 h-3 mr-1.5 text-zan-red" />
                            <span>Free Content</span>
                        </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 line-clamp-2 font-heading group-hover:text-zan-red transition-colors tracking-wide uppercase">
                        {tutorial.title}
                    </h3>
                    <p className="text-gray-400 mb-6 line-clamp-3 flex-grow leading-relaxed text-sm font-light">
                        {tutorial.meta_description || tutorial.excerpt || 'Learn step-by-step with our comprehensive robotics and technology tutorials.'}
                    </p>

                    <Link
                        to={`/course/${tutorial.slug}`}
                        className="w-full mt-auto bg-transparent text-zan-red py-3 rounded-sm font-bold uppercase tracking-widest text-xs border border-zan-red/30 hover:bg-zan-red hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                    >
                        <span>Start Learning</span>
                        <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

const TutorialsPage = () => {
    const [tutorials, setTutorials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    // Get current page from URL or default to 1
    const currentPage = parseInt(searchParams.get('page') || '1');
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        setLoading(true);
        fetch(`${API_BASE_URL}/api/posts/published?category=tutorial&limit=${itemsPerPage}&page=${currentPage}`)
            .then(response => response.json())
            .then(apiResponse => {
                if (apiResponse.success && apiResponse.data) {
                    const tutorialData = Array.isArray(apiResponse.data) ? apiResponse.data : [apiResponse.data];
                    setTutorials(tutorialData);
                    if (apiResponse.pagination) {
                        setTotalPages(apiResponse.pagination.total_pages);
                    }
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tutorials:', error)
                setLoading(false);
            });
    }, [currentPage]);

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const handlePageChange = (pageNumber: number) => {
        setSearchParams({ page: pageNumber.toString() });
    };

    return (
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] right-[-5%] w-96 h-96 bg-zan-red/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-zan-red font-mono text-sm tracking-widest uppercase mb-4">
                        &lt;Learning Lab /&gt;
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
                        Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-red to-zan-cyan">Tutorials</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Master the fundamentals of robotics, coding, and AI with our easy-to-follow, hands-on tutorials.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center text-gray-400 py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-zan-red"></div>
                        <p className="mt-4 font-mono text-sm tracking-widest uppercase">Fetching knowledge...</p>
                    </div>
                ) : (
                    <>
                        {tutorials.length === 0 ? (
                            <div className="text-center text-gray-400 py-20 bg-surface-dark rounded-sm border border-white/10">
                                <p className="text-lg font-mono">No tutorials found at this time.</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {tutorials.map((tutorial) => (
                                        <TutorialCard key={tutorial.id} tutorial={tutorial} />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default TutorialsPage;
