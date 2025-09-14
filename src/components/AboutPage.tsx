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
            icon: <Sparkles className="w-8 h-8 mx-auto mb-3 text-zan-blue" />,
            title: "Innovation First",
            description: "Encourage creative thinking and problem-solving."
        },
        {
            icon: <Users className="w-8 h-8 mx-auto mb-3 text-zan-blue" />,
            title: "Equal Access",
            description: "Technology for every student, no matter their background."
        },
        {
            icon: <Flag className="w-8 h-8 mx-auto mb-3 text-zan-blue" />,
            title: "Made in Bangladesh",
            description: "Nurture local talent to build world-class innovations."
        },
        {
            icon: <HeartHandshake className="w-8 h-8 mx-auto mb-3 text-zan-blue" />,
            title: "Helping Hand",
            description: "Provide free guidance and support to empower learners."
        },
        {
            icon: <Rocket className="w-8 h-8 mx-auto mb-3 text-zan-blue" />,
            title: "Future-Focused",
            description: "Prepare students for a tech-driven world from an early age."
        }
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-900">
            {/* --- Header Section --- */}
            <section className="pt-32 pb-20 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Building Bangladesh's Next Generation of <span className="text-zan-blue">Innovators</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Zantech is dedicated to building Bangladesh's next generation of innovators. We provide free, hands-on robotics and programming workshops for students, supply essential components for creators, and offer custom R&D solutions for businesses. Our mission is to make technology accessible and foster a vibrant tech ecosystem across the nation.
                    </p>
                </div>
            </section>

            {/* --- Mission & Vision Section --- */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
                    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl">
                        <Target className="w-12 h-12 text-zan-red mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            To bring robotics, AI, and new technologies to every corner of Bangladesh. While the world is moving forward by adopting technology from an early age, Zantech is on a mission to make the same happen in Bangladesh through education, free guidance, and hands-on learning.
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl">
                        <Eye className="w-12 h-12 text-zan-blue mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            To see Bangladesh become self-sufficient in technology and innovation, where every student contributes to the future under the proud tag “Made by Bangladeshi Students, Made in Bangladesh.”
                        </p>
                    </div>
                </div>
            </section>
            
            {/* --- Problem & Solution Section --- */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Problem We See</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start"><XCircle className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" /><span>The world is adopting robotics and AI education from an early age, but Bangladesh still lags behind.</span></li>
                            <li className="flex items-start"><XCircle className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" /><span>Most students don’t have access to proper training, equipment, or mentorship.</span></li>
                            <li className="flex items-start"><XCircle className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" /><span>Limited awareness about how robotics and AI shape the future economy.</span></li>
                        </ul>
                    </div>
                     <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Solution</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start"><CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Deliver workshops in schools, colleges, and universities nationwide.</span></li>
                            <li className="flex items-start"><CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Offer free guidance and mentorship for students passionate about robotics.</span></li>
                            <li className="flex items-start"><CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Provide robotics and IoT equipment so learners can practice and innovate.</span></li>
                            <li className="flex items-start"><CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Build a community where students exchange ideas, projects, and innovations.</span></li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- Our Culture Section --- */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12">Our Culture & Values</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {cultureValues.map((item, index) => (
                            <div key={index} className="text-center">
                                {item.icon}
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Join Our Journey CTA --- */}
             <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                     <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Join Our Journey</h2>
                     <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                        Whether you are a student with your first project, a hobbyist building something fun, or a business looking for a tech solution, we welcome you.
                    </p>
                    <Link to="/#contact">
                        <button className="bg-zan-blue text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto">
                            <span>Let's Build a Smarter Future!</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;