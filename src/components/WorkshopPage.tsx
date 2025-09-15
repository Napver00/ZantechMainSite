import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const WorkshopCard = ({ workshop }) => (
    <div className="group h-full flex flex-col">
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col">
            <div className="relative overflow-hidden">
                <img
                    src={workshop.thumbnail}
                    alt={workshop.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {workshop.title}
                </h3>
                <Link to={`/workshop/${workshop.id}`} className="w-full mt-auto bg-zan-blue text-white py-2 rounded-xl font-semibold text-center hover:bg-blue-800 transition-all duration-300 transform hover:scale-105">
                    View Details
                </Link>
            </div>
        </div>
    </div>
);

const WorkshopPage = () => {
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/posts/published?category=workshop`)
            .then(response => response.json())
            .then(apiResponse => {
                // Correctly handle the API response structure
                if (apiResponse.success && apiResponse.data) {
                    // If the data is not an array (i.e., it's a single object), wrap it in an array
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

    return (
        <section className="pt-32 pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Our <span className="text-zan-blue">Workshops</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Explore our hands-on workshops designed to inspire the next generation of innovators in robotics, programming, and AI.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center text-gray-600 dark:text-gray-300">Loading workshops...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {workshops.map((workshop) => (
                            <WorkshopCard key={workshop.id} workshop={workshop} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default WorkshopPage;