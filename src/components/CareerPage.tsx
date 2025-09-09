import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';

const CareerPage = () => {
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            } catch (err) {
                setError(err.message);
                console.error('Error fetching careers:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCareers();
    }, []);

    const DepartmentTag = ({ department }) => (
        <span className="inline-block bg-teal-100 text-teal-800 text-sm font-medium mr-2 px-3 py-1 rounded-full">
            {department}
        </span>
    );

    const JobTypeTag = ({ type }) => (
        <span className="inline-block border border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium px-4 py-1 rounded-md">
            {type}
        </span>
    );

    return (
        <section className="pt-32 pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Join Our <span className="text-zan-blue">Team</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        We're looking for passionate individuals to help us build the future of technology. Explore our open positions below.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-8">
                    {loading && <p className="text-center text-gray-600 dark:text-gray-300">Loading positions...</p>}
                    {error && <p className="text-center text-red-500">Error: {error}</p>}
                    
                    {!loading && !error && (
                        <div>
                            {careers.length > 0 ? (
                                <div className="space-y-4">
                                    {careers.map((job) => (
                                        <div key={job.id} className="border-b border-gray-200 dark:border-gray-700 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                                            <div className="flex-grow">
                                                <DepartmentTag department={job.department} />
                                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                                                    {job.job_title}
                                                </h2>
                                            </div>
                                            <div className="flex items-center space-x-6 w-full sm:w-auto">
                                                <div className="flex-shrink-0">
                                                  <JobTypeTag type={job.job_type} />
                                                </div>
                                                {/* Updated Link */}
                                                <Link to={`/career/${job.id}`} className="flex-shrink-0 text-zan-blue dark:text-blue-400 font-semibold flex items-center space-x-2 group">
                                                    <span>SEE DETAILS</span>
                                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-600 dark:text-gray-300 py-8">
                                    There are currently no open positions. Please check back later!
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CareerPage;