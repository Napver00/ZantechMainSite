import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Make sure Link is imported
import { MapPin, Briefcase, Users, Banknote, CalendarClock, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';

const CareerDetailsPage = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center pt-32 pb-20 bg-gray-50 dark:bg-gray-900"><p>Loading...</p></div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center pt-32 pb-20 bg-gray-50 dark:bg-gray-900"><p className="text-red-500">Error: {error}</p></div>;
    }

    if (!job) {
        return <div className="min-h-screen flex items-center justify-center pt-32 pb-20 bg-gray-50 dark:bg-gray-900"><p>Job not found.</p></div>;
    }
    
    const detailItems = [
        { icon: <Users className="w-5 h-5" />, label: 'Vacancy', value: job.vacancy },
        { icon: <Briefcase className="w-5 h-5" />, label: 'Job Type', value: job.job_type },
        { icon: <Banknote className="w-5 h-5" />, label: 'Salary', value: `BDT ${Number(job.salary).toLocaleString()}` },
        { icon: <CalendarClock className="w-5 h-5" />, label: 'Deadline', value: formatDate(job.deadline) },
    ];

    return (
        <section className="pt-32 pb-20 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                            {job.job_title}
                        </h1>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mt-2">
                            <MapPin className="w-5 h-5 mr-2" />
                            <span>Zantech HQ (Gulshan-2, Dhaka)</span>
                        </div>
                    </div>
                    {/* Updated Link to the application form */}
                    <Link to={`/career/${id}/apply`} className="mt-4 sm:mt-0 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center space-x-2">
                        <span>Apply Now</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Main Content */}
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl">
                    <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                        {job.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-gray-200 dark:border-gray-700 py-6 mb-8">
                        {detailItems.map(item => (
                             <div key={item.label}>
                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{item.label}</h3>
                                <p className="text-md font-bold text-gray-800 dark:text-white mt-1">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Department</h2>
                        <p className="text-gray-600 dark:text-gray-300">{job.department}</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Job Responsibilities</h2>
                        <div
                            className="prose prose-gray dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: job.responsibilities }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerDetailsPage;