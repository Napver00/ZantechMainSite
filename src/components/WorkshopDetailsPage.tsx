import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const WorkshopDetailsPage = () => {
    const { id } = useParams();
    const [workshop, setWorkshop] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetch(`${API_BASE_URL}/api/posts/${id}`)
            .then(response => response.json())
            .then(apiResponse => {
                if (apiResponse.success && apiResponse.data) {
                    setWorkshop(apiResponse.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching workshop details:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center pt-24">Loading...</div>;
    }

    if (!workshop) {
        return <div className="min-h-screen flex items-center justify-center pt-24">Workshop not found.</div>;
    }

    return (
        <section className="pt-32 pb-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Two-column grid layout */}
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Left Column: Image, Title, and Tags */}
                    <div className="lg:col-span-1 space-y-6">
                        <img src={workshop.thumbnail_url} alt={workshop.title} className="w-full h-auto object-cover rounded-2xl shadow-lg" />
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{workshop.title}</h1>
                        <div className="flex flex-wrap gap-2">
                            {workshop.tags && workshop.tags.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-zan-blue/30 text-zan-blue dark:text-blue-300 rounded-full text-sm font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="lg:col-span-2">
                        <div
                            className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
                            dangerouslySetInnerHTML={{ __html: workshop.content }}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WorkshopDetailsPage;