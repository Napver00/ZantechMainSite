import React from 'react';
import { Newspaper } from 'lucide-react';

const BlogPage = () => {
    return (
        <section className="pt-32 pb-24 bg-zan-light dark:bg-zan-dark min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[20%] left-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-lg border border-gray-100 dark:border-white/10 animate-float">
                        <Newspaper className="w-10 h-10 text-zan-blue dark:text-blue-400" />
                    </div>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-blue to-zan-red">Blog</span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Stay updated with the latest news, tutorials, and insights from the Zantech team. We're crafting valuable content for you.
                </p>

                <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-white/10 shadow-xl max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Coming Soon!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        We are working hard to bring you the best articles on robotics, IoT, and technology. Please check back later!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default BlogPage;