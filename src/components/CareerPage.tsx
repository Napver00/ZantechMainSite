import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, MapPin, Clock } from 'lucide-react';
import { API_BASE_URL } from '../config';

const CareerPage = () => {
    const [careers, setCareers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/careers/active`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const apiResponse = await response.json();
                if (apiResponse.success && apiResponse.data) {
                    setCareers(apiResponse.data);
                } else {
                    throw new Error(apiResponse.message || 'Failed to fetch careers');
                }
            } catch (err: any) {
                setError(err.message);
                console.error('Error fetching careers:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCareers();
    }, []);

    const DepartmentTag = ({ department }: { department: string }) => (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-zan-blue dark:text-blue-300 border border-blue-100 dark:border-blue-500/20">
            {department}
        </span>
    );

    const JobTypeTag = ({ type }: { type: string }) => (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/5">
            <Clock className="w-3 h-3 mr-1" />
            {type}
        </span>
    );

    return (
        <section className="pt-32 pb-24 bg-zan-light dark:bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                        Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-blue to-zan-red">Team</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        We're looking for passionate individuals to help us build the future of technology. Explore our open positions below.
                    </p>
                </div>

                <div className="space-y-6">
                    {loading && (
                        <div className="text-center text-gray-600 dark:text-gray-300 py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-zan-blue"></div>
                            <p className="mt-4 font-medium">Loading positions...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-3xl border border-red-100 dark:border-red-500/20">
                            <p className="text-red-600 dark:text-red-400 font-medium">Error: {error}</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            {careers.length > 0 ? (
                                careers.map((job) => (
                                    <div key={job.id} className="group bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex-grow space-y-3">
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <DepartmentTag department={job.department} />
                                                    <JobTypeTag type={job.job_type} />
                                                </div>
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-heading group-hover:text-zan-blue dark:group-hover:text-blue-400 transition-colors">
                                                    {job.job_title}
                                                </h2>
                                                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                                    <MapPin className="w-4 h-4 mr-1.5" />
                                                    <span>Zantech HQ (Dhaka)</span>
                                                </div>
                                            </div>

                                            <div className="flex-shrink-0">
                                                <Link
                                                    to={`/career/${job.id}`}
                                                    className="inline-flex items-center justify-center w-full md:w-auto bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-semibold hover:bg-zan-blue hover:text-white dark:hover:bg-zan-blue transition-all duration-300 group/btn"
                                                >
                                                    <span>View Details</span>
                                                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-600 dark:text-gray-300 py-20 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
                                    <Briefcase className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                    <p className="text-lg">There are currently no open positions. Please check back later!</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CareerPage;