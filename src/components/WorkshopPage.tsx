import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';
import Pagination from './Pagination';

// Workshop Card Component (Consistent with WorkshopsSection)
const WorkshopCard = ({ workshop }: { workshop: any }) => (
    <div className="group h-full flex flex-col">
        <div className="bg-surface-dark backdrop-blur-md rounded-sm overflow-hidden border border-white/5 hover:border-zan-cyan/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col relative">
            {/* Tech Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zan-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zan-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative overflow-hidden h-56 clip-path-slant-bottom">
                <img
                    src={workshop.thumbnail}
                    alt={workshop.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zan-dark/90 to-transparent opacity-100"></div>
                <div className="absolute top-4 right-4">
                    <div className="bg-zan-dark/80 backdrop-blur-sm text-zan-cyan px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider border border-zan-cyan/20">
                        Workshop
                    </div>
                </div>
            </div>
            <div className="p-8 flex-grow flex flex-col relative">
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 font-heading group-hover:text-zan-cyan transition-colors uppercase tracking-wide">
                    {workshop.title}
                </h3>
                <p className="text-gray-400 mb-6 line-clamp-3 flex-grow leading-relaxed text-sm font-light">
                    {workshop.excerpt || 'Join us for an exciting hands-on workshop experience.'}
                </p>

                <Link
                    to={`/workshop/${workshop.slug}`}
                    className="w-full mt-auto bg-transparent text-zan-cyan py-3 rounded-sm font-bold uppercase tracking-widest text-xs border border-zan-cyan/30 hover:bg-zan-cyan hover:text-black transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    </div>
);

const WorkshopPage = () => {
    const [workshops, setWorkshops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    // Get current page from URL or default to 1
    const currentPage = parseInt(searchParams.get('page') || '1');
    const itemsPerPage = 6;

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/posts/published?category=workshop`)
            .then(response => response.json())
            .then(apiResponse => {
                if (apiResponse.success && apiResponse.data) {
                    const workshopData = Array.isArray(apiResponse.data) ? apiResponse.data : [apiResponse.data];
                    setWorkshops(workshopData);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching workshops:', error)
                setLoading(false);
            });
    }, []);

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const totalPages = Math.ceil(workshops.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentWorkshops = workshops.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setSearchParams({ page: pageNumber.toString() });
    };

    return (
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] right-[-5%] w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-4">
                        &lt;Workshop Modules /&gt;
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Workshops</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Explore our hands-on workshops designed to inspire the next generation of innovators in robotics, programming, and AI.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center text-gray-400 py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-zan-cyan"></div>
                        <p className="mt-4 font-mono text-sm tracking-widest uppercase">Initializing modules...</p>
                    </div>
                ) : (
                    <>
                        {workshops.length === 0 ? (
                            <div className="text-center text-gray-400 py-20 bg-surface-dark rounded-sm border border-white/10">
                                <p className="text-lg font-mono">No workshop modules found.</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {currentWorkshops.map((workshop) => (
                                        <WorkshopCard key={workshop.id} workshop={workshop} />
                                    ))}
                                </div>

                                {workshops.length > itemsPerPage && (
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

export default WorkshopPage;