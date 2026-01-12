import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Briefcase, Users, Banknote, CalendarClock, ArrowRight, ArrowLeft } from 'lucide-react';
import { API_BASE_URL } from '../config';

const CareerDetailsPage = () => {
    const { id } = useParams();
    const [job, setJob] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/careers/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch job details');
                }
                const apiResponse = await response.json();
                if (apiResponse.success && apiResponse.data) {
                    setJob(apiResponse.data);
                } else {
                    throw new Error(apiResponse.message || 'Could not find job details');
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zan-light dark:bg-zan-dark">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-zan-blue"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zan-light dark:bg-zan-dark text-gray-600 dark:text-gray-300">
                <p className="text-red-500 mb-4">Error: {error}</p>
                <Link to="/career" className="text-zan-blue hover:underline">Back to Careers</Link>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zan-light dark:bg-zan-dark text-gray-600 dark:text-gray-300">
                <p className="text-xl mb-4">Job not found.</p>
                <Link to="/career" className="text-zan-blue hover:underline">Back to Careers</Link>
            </div>
        );
    }

    const detailItems = [
        { icon: <Users className="w-5 h-5" />, label: 'Vacancy', value: job.vacancy },
        { icon: <Briefcase className="w-5 h-5" />, label: 'Job Type', value: job.job_type },
        { icon: <Banknote className="w-5 h-5" />, label: 'Salary', value: `BDT ${Number(job.salary).toLocaleString()}` },
        { icon: <CalendarClock className="w-5 h-5" />, label: 'Deadline', value: formatDate(job.deadline) },
    ];

    return (
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-zan-light dark:bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] right-[-5%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] left-[-5%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <Link to="/career" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-zan-blue dark:hover:text-blue-400 mb-8 transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Careers
                </Link>

                <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-12 border border-gray-100 dark:border-white/10 shadow-xl">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-gray-100 dark:border-white/10 pb-10">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-zan-blue dark:text-blue-300 border border-blue-100 dark:border-blue-500/20 mb-3">
                                {job.department}
                            </span>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white font-heading leading-tight">
                                {job.job_title}
                            </h1>
                            <div className="flex items-center text-gray-500 dark:text-gray-400 mt-3 text-sm">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>Zantech HQ (Dhaka)</span>
                            </div>
                        </div>

                        <Link
                            to={`/career/${id}/apply`}
                            className="w-full md:w-auto bg-gradient-to-r from-zan-blue to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-sm uppercase tracking-wide"
                        >
                            <span>Apply Now</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Key Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
                        {detailItems.map(item => (
                            <div key={item.label} className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                                <div className="text-zan-blue dark:text-blue-400 mb-2">{item.icon}</div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.label}</h3>
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 font-heading">About the Role</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                            {job.description}
                        </p>
                    </div>

                    {/* Responsibilities */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-heading">Job Responsibilities</h2>
                        <div
                            className="prose prose-sm md:prose-lg dark:prose-invert max-w-none 
                            prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                            prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                            prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-li:marker:text-zan-blue"
                            dangerouslySetInnerHTML={{ __html: job.responsibilities }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerDetailsPage;