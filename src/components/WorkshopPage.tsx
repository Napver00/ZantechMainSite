import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';
import Pagination from './Pagination';

// Workshop Card Component (Consistent with WorkshopsSection)
const WorkshopCard = ({ workshop }: { workshop: any }) => (
    <div className="group h-full flex flex-col">
        <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col">
            <div className="relative overflow-hidden h-56">
                <img
                    src={workshop.thumbnail}
                    alt={workshop.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-zan-blue dark:text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        Workshop
                    </div>
                </div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 font-heading group-hover:text-zan-blue dark:group-hover:text-blue-400 transition-colors">
                    {workshop.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 flex-grow leading-relaxed text-sm">
                    {workshop.excerpt || 'Join us for an exciting hands-on workshop experience.'}
                </p>

                <Link
                    to={`/workshop/${workshop.slug}`}
                    className="w-full mt-auto bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white py-4 rounded-xl font-semibold text-center hover:bg-zan-blue hover:text-white dark:hover:bg-zan-blue transition-all duration-300 flex items-center justify-center space-x-2 group/btn border border-gray-100 dark:border-white/5"
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
        <section className="pt-32 pb-24 bg-zan-light dark:bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] right-[-5%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-blue to-zan-red">Workshops</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Explore our hands-on workshops designed to inspire the next generation of innovators in robotics, programming, and AI.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center text-gray-600 dark:text-gray-300 py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-zan-blue"></div>
                        <p className="mt-4 font-medium">Loading workshops...</p>
                    </div>
                ) : (
                    <>
                        {workshops.length === 0 ? (
                            <div className="text-center text-gray-600 dark:text-gray-300 py-20 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
                                <p className="text-lg">No workshops available at the moment. Check back soon!</p>
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