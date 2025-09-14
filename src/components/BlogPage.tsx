import React from 'react';

const BlogPage = () => {
    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen">
            {/* --- Header Section --- */}
            <section className="pt-32 pb-20 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Our <span className="text-zan-blue">Blog</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Stay updated with the latest news, tutorials, and insights from the Zantech team.
                    </p>
                </div>
            </section>

            {/* --- Content Section --- */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Coming Soon!
                    </h2>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        We're working hard to bring you valuable content. Please check back later!
                    </p>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;