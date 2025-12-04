import React from 'react';
import {
    Target,
    Eye,
    XCircle,
    CheckCircle,
    Sparkles,
    Users,
    Flag,
    HeartHandshake,
    Rocket,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    // Data for "Our Culture" section
    const cultureValues = [
        {
            icon: <Sparkles className="w-8 h-8 mx-auto mb-3 text-zan-blue dark:text-blue-400" />,
            title: "Innovation First",
            description: "Encourage creative thinking and problem-solving."
        },
        {
            icon: <Users className="w-8 h-8 mx-auto mb-3 text-zan-blue dark:text-blue-400" />,
            title: "Equal Access",
            description: "Technology for every student, no matter their background."
        },
        {
            icon: <Flag className="w-8 h-8 mx-auto mb-3 text-zan-blue dark:text-blue-400" />,
            title: "Made in Bangladesh",
            description: "Nurture local talent to build world-class innovations."
        },
        {
            icon: <HeartHandshake className="w-8 h-8 mx-auto mb-3 text-zan-blue dark:text-blue-400" />,
            title: "Helping Hand",
            description: "Provide free guidance and support to empower learners."
        },
        {
            icon: <Rocket className="w-8 h-8 mx-auto mb-3 text-zan-blue dark:text-blue-400" />,
            title: "Future-Focused",
            description: "Prepare students for a tech-driven world from an early age."
        }
    ];

    return (
        <div className="bg-zan-light dark:bg-zan-dark overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] left-[-10%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
                <div className="absolute top-[40%] left-[20%] w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            {/* --- Header Section --- */}
            <section className="pt-32 pb-20 text-center relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 font-heading leading-tight">
                        Building Bangladesh's Next Generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-blue to-zan-red">Innovators</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        Zantech is dedicated to building Bangladesh's next generation of innovators. We provide free, hands-on robotics and programming workshops for students, supply essential components for creators, and offer custom R&D solutions for businesses. Our mission is to make technology accessible and foster a vibrant tech ecosystem across the nation.
                    </p>
                </div>
            </section>

            {/* --- Mission & Vision Section --- */}
            <section className="py-20 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
                    <div className="bg-white dark:bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Target className="w-8 h-8 text-zan-red" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-heading">Our Mission</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            To bring robotics, AI, and new technologies to every corner of Bangladesh. While the world is moving forward by adopting technology from an early age, Zantech is on a mission to make the same happen in Bangladesh through education, free guidance, and hands-on learning.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Eye className="w-8 h-8 text-zan-blue dark:text-blue-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-heading">Our Vision</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            To see Bangladesh become self-sufficient in technology and innovation, where every student contributes to the future under the proud tag “Made by Bangladeshi Students, Made in Bangladesh.”
                        </p>
                    </div>
                </div>
            </section>

            {/* --- Problem & Solution Section --- */}
            <section className="py-20 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-start">
                    <div className="bg-white dark:bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-gray-100 dark:border-white/10 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 font-heading border-b border-gray-100 dark:border-white/10 pb-4">The Problem We See</h2>
                        <ul className="space-y-6">
                            <li className="flex items-start group">
                                <XCircle className="w-6 h-6 text-red-500 mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-600 dark:text-gray-300 text-lg">The world is adopting robotics and AI education from an early age, but Bangladesh still lags behind.</span>
                            </li>
                            <li className="flex items-start group">
                                <XCircle className="w-6 h-6 text-red-500 mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-600 dark:text-gray-300 text-lg">Most students don’t have access to proper training, equipment, or mentorship.</span>
                            </li>
                            <li className="flex items-start group">
                                <XCircle className="w-6 h-6 text-red-500 mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-600 dark:text-gray-300 text-lg">Limited awareness about how robotics and AI shape the future economy.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-gray-100 dark:border-white/10 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 font-heading border-b border-gray-100 dark:border-white/10 pb-4">Our Solution</h2>
                        <ul className="space-y-6">
                            <li className="flex items-start group">
                                <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-600 dark:text-gray-300 text-lg">Deliver workshops in schools, colleges, and universities nationwide.</span>
                            </li>
                            <li className="flex items-start group">
                                <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-600 dark:text-gray-300 text-lg">Offer free guidance and mentorship for students passionate about robotics.</span>
                            </li>
                            <li className="flex items-start group">
                                <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-600 dark:text-gray-300 text-lg">Provide robotics and IoT equipment so learners can practice and innovate.</span>
                            </li>
                            <li className="flex items-start group">
                                <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-600 dark:text-gray-300 text-lg">Build a community where students exchange ideas, projects, and innovations.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- Our Culture Section --- */}
            <section className="py-20 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-16 font-heading">Our Culture & Values</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {cultureValues.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Join Our Journey CTA --- */}
            <section className="py-20 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-gradient-to-r from-zan-blue to-blue-700 rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-heading">Join Our Journey</h2>
                            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                                Whether you are a student with your first project, a hobbyist building something fun, or a business looking for a tech solution, we welcome you.
                            </p>
                            <Link to="/#contact">
                                <button className="bg-white text-zan-blue px-10 py-4 rounded-full font-bold hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto">
                                    <span>Let's Build a Smarter Future!</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;