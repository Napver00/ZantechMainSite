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
            icon: <Sparkles className="w-8 h-8 mx-auto mb-3 text-zan-cyan" />,
            title: "Innovation First",
            description: "Encourage creative thinking and problem-solving."
        },
        {
            icon: <Users className="w-8 h-8 mx-auto mb-3 text-zan-cyan" />,
            title: "Equal Access",
            description: "Technology for every student, no matter their background."
        },
        {
            icon: <Flag className="w-8 h-8 mx-auto mb-3 text-zan-cyan" />,
            title: "Made in Bangladesh",
            description: "Nurture local talent to build world-class innovations."
        },
        {
            icon: <HeartHandshake className="w-8 h-8 mx-auto mb-3 text-zan-cyan" />,
            title: "Helping Hand",
            description: "Provide free guidance and support to empower learners."
        },
        {
            icon: <Rocket className="w-8 h-8 mx-auto mb-3 text-zan-cyan" />,
            title: "Future-Focused",
            description: "Prepare students for a tech-driven world from an early age."
        }
    ];

    return (
        <div className="bg-zan-dark overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] left-[-10%] w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-[100px]"></div>
                <div className="absolute top-[40%] left-[20%] w-72 h-72 bg-purple-500/5 rounded-full blur-[100px]"></div>
            </div>

            {/* --- Header Section --- */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-20 text-center relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-4">
                        &lt;Organization Profile /&gt;
                    </p>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 font-heading leading-tight">
                        Building Bangladesh's Next Generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Innovators</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                        Zantech is dedicated to building Bangladesh's next generation of innovators. We provide free, hands-on robotics and programming workshops for students, supply essential components for creators, and offer custom R&D solutions for businesses. Our mission is to make technology accessible and foster a vibrant tech ecosystem across the nation.
                    </p>
                </div>
            </section>

            {/* --- Mission & Vision Section --- */}
            <section className="py-12 md:py-20 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
                    <div className="bg-surface-dark backdrop-blur-md p-10 rounded-sm border border-white/5 shadow-xl hover:shadow-[0_0_20px_rgba(255,0,0,0.1)] hover:border-red-500/30 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-zan-red/10 to-transparent pointer-events-none"></div>
                        <div className="w-16 h-16 bg-red-500/10 rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-red-500/20">
                            <Target className="w-8 h-8 text-zan-red" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4 font-heading uppercase tracking-wide">Our Mission</h2>
                        <p className="text-gray-400 leading-relaxed text-lg font-light">
                            To bring robotics, AI, and new technologies to every corner of Bangladesh. While the world is moving forward by adopting technology from an early age, Zantech is on a mission to make the same happen in Bangladesh through education, free guidance, and hands-on learning.
                        </p>
                    </div>
                    <div className="bg-surface-dark backdrop-blur-md p-10 rounded-sm border border-white/5 shadow-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] hover:border-zan-cyan/30 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-zan-cyan/10 to-transparent pointer-events-none"></div>
                        <div className="w-16 h-16 bg-zan-cyan/10 rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-zan-cyan/20">
                            <Eye className="w-8 h-8 text-zan-cyan" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4 font-heading uppercase tracking-wide">Our Vision</h2>
                        <p className="text-gray-400 leading-relaxed text-lg font-light">
                            To see Bangladesh become self-sufficient in technology and innovation, where every student contributes to the future under the proud tag “Made by Bangladeshi Students, Made in Bangladesh.”
                        </p>
                    </div>
                </div>
            </section>

            {/* --- Problem & Solution Section --- */}
            <section className="py-12 md:py-20 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-start">
                    <div className="bg-surface-dark backdrop-blur-md p-8 rounded-sm border border-white/10 shadow-lg relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-transparent"></div>
                        <h2 className="text-3xl font-bold text-white mb-8 font-heading border-b border-white/10 pb-4 uppercase tracking-wide">The Problem We See</h2>
                        <ul className="space-y-6">
                            <li className="flex items-start group">
                                <XCircle className="w-6 h-6 text-red-500 mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-400 text-lg font-light">The world is adopting robotics and AI education from an early age, but Bangladesh still lags behind.</span>
                            </li>
                            <li className="flex items-start group">
                                <XCircle className="w-6 h-6 text-red-500 mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-400 text-lg font-light">Most students don’t have access to proper training, equipment, or mentorship.</span>
                            </li>
                            <li className="flex items-start group">
                                <XCircle className="w-6 h-6 text-red-500 mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-400 text-lg font-light">Limited awareness about how robotics and AI shape the future economy.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-surface-dark backdrop-blur-md p-8 rounded-sm border border-white/10 shadow-lg relative">
                        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-zan-neon to-transparent"></div>
                        <h2 className="text-3xl font-bold text-white mb-8 font-heading border-b border-white/10 pb-4 uppercase tracking-wide">Our Solution</h2>
                        <ul className="space-y-6">
                            <li className="flex items-start group">
                                <CheckCircle className="w-6 h-6 text-zan-neon mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-400 text-lg font-light">Deliver workshops in schools, colleges, and universities nationwide.</span>
                            </li>
                            <li className="flex items-start group">
                                <CheckCircle className="w-6 h-6 text-zan-neon mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-400 text-lg font-light">Offer free guidance and mentorship for students passionate about robotics.</span>
                            </li>
                            <li className="flex items-start group">
                                <CheckCircle className="w-6 h-6 text-zan-neon mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-400 text-lg font-light">Provide robotics and IoT equipment so learners can practice and innovate.</span>
                            </li>
                            <li className="flex items-start group">
                                <CheckCircle className="w-6 h-6 text-zan-neon mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-400 text-lg font-light">Build a community where students exchange ideas, projects, and innovations.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- Our Culture Section --- */}
            <section className="py-12 md:py-20 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-16 font-heading uppercase tracking-widest">Our Culture & Values</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {cultureValues.map((item, index) => (
                            <div key={index} className="bg-surface-dark backdrop-blur-sm p-6 rounded-sm border border-white/5 hover:border-zan-cyan/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 hover:-translate-y-1 group">
                                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                <h3 className="font-bold text-lg text-white mb-2 font-heading tracking-wide">{item.title}</h3>
                                <p className="text-sm text-gray-400 font-light">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Join Our Journey CTA --- */}
            <section className="py-12 md:py-20 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-gradient-to-r from-zan-dark to-black border border-zan-cyan/20 rounded-sm p-10 md:p-16 shadow-[0_0_30px_rgba(0,240,255,0.1)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-zan-cyan/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-zan-red/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-heading uppercase tracking-wide">Join Our Journey</h2>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                                Whether you are a student with your first project, a hobbyist building something fun, or a business looking for a tech solution, we welcome you.
                            </p>
                            <Link to="/contact">
                                <button className="bg-zan-cyan text-black px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto">
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