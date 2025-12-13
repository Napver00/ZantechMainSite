import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Tag, Calendar, Clock, Share2 } from 'lucide-react';
import { API_BASE_URL } from '../config';

const WorkshopDetailsPage = () => {
    const { slug } = useParams();
    const [workshop, setWorkshop] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        fetch(`${API_BASE_URL}/api/posts/${slug}`)
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
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-zan-blue rounded-full animate-spin"></div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-zan-blue rounded-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!workshop) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 p-4">
                <div className="text-6xl mb-4">😕</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Workshop Not Found</h2>
                <p className="text-lg mb-8 text-center max-w-md">The workshop you're looking for might have been removed or is temporarily unavailable.</p>
                <Link
                    to="/workshops"
                    className="inline-flex items-center px-6 py-3 bg-zan-blue hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg hover:shadow-zan-blue/30 font-medium"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Workshops
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                {/* Background Image with Parallax-like effect */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
                    style={{ backgroundImage: `url(${workshop.thumbnail_url})` }}
                >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                </div>

                {/* Navbar Placeholder/Back Button */}
                <div className="absolute top-0 left-0 w-full p-6 z-20">
                    <div className="max-w-7xl mx-auto">
                        <Link
                            to="/workshops"
                            className="inline-flex items-center text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full transition-all border border-white/10"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Workshops
                        </Link>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 pb-16 z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {workshop.tags && workshop.tags.map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 bg-zan-blue/90 text-white text-xs font-bold uppercase tracking-wider rounded-md backdrop-blur-sm shadow-sm"
                                >
                                    <Tag className="w-3 h-3 mr-1.5" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
                            {workshop.title}
                        </h1>
                        <div className="flex items-center flex-wrap gap-6 text-gray-300 text-sm md:text-base">
                            {/* Assuming workshop has created_at, if not, this is a placeholder or can be removed */}
                            {workshop.created_at && (
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-zan-blue" />
                                    <span>{new Date(workshop.created_at).toLocaleDateString()}</span>
                                </div>
                            )}
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-zan-blue" />
                                <span>10 min read</span> {/* Placeholder or calculate reading time */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 -mt-10 px-4 pb-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">

                        {/* Article Content */}
                        <div className="p-8 md:p-12">
                            <article
                                className="prose prose-lg dark:prose-invert max-w-none
                                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                                prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                                prose-a:text-zan-blue dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-gray-900 dark:prose-strong:text-white
                                prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-li:mb-2
                                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-img:w-full
                                prose-blockquote:border-l-4 prose-blockquote:border-zan-blue prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:italic"
                                dangerouslySetInnerHTML={{ __html: workshop.content }}
                            />
                        </div>

                        {/* Image Gallery */}
                        {workshop.images && workshop.images.length > 0 && (
                            <div className="px-8 md:px-12 pb-12">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gallery</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {workshop.images.map((img: string, index: number) => (
                                        <div key={index} className="group relative overflow-hidden rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 h-64 md:h-72">
                                            <img
                                                src={img}
                                                alt={`Gallery image ${index + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Footer / Share Section */}
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-8 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <p className="text-gray-500 dark:text-gray-400 font-medium">
                                    Share this workshop
                                </p>
                                <div className="flex gap-3">
                                    <button className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-zan-blue hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors border border-gray-200 dark:border-gray-700 shadow-sm">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                    {/* Add more social buttons here if needed */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkshopDetailsPage;