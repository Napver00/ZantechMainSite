import React from 'react';
import { Users, Cpu, Globe, Lightbulb } from 'lucide-react';

const ImpactPage = () => {
    const impactAreas = [
        {
            icon: <Users className="w-8 h-8 text-white" />,
            title: "Cultivating a Generation of Tech Leaders",
            description: "Through our free, hands-on workshops in schools, colleges, and universities nationwide, we have reached thousands of students. We are bridging the critical gap between theoretical knowledge and practical application, transforming complex subjects like robotics, programming, and AI from intimidating concepts into exciting, achievable skills. We are not just teaching code; we are igniting a lifelong passion for problem-solving and innovation."
        },
        {
            icon: <Cpu className="w-8 h-8 text-white" />,
            title: "Strengthening the National Tech Ecosystem",
            description: "By providing accessible, high-quality robotic components, we empower a thriving community of makers, startups, and researchers. Our R&D services for local companies drive industrial innovation, creating homegrown solutions for local and global problems. This two-pronged approach builds a skilled, future-ready workforce and strengthens Bangladesh's position in the global tech landscape."
        },
        {
            icon: <Globe className="w-8 h-8 text-white" />,
            title: "Democratizing Access to Technology",
            description: "Our commitment to free education and affordable hardware ensures that financial barriers do not stand in the way of curiosity and talent. We are creating an inclusive ecosystem where any student, regardless of their background, has the opportunity to explore, invent, and prepare for a future driven by technology."
        }
    ];

    return (
        <div className="bg-zan-light dark:bg-zan-dark overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] right-[-10%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            {/* --- Header Section --- */}
            <section className="pt-32 pb-20 text-center relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 font-heading leading-tight">
                        Our Impact: Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-blue to-zan-red">Future of Bangladesh</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        At Zantech, our impact extends beyond selling components; we are building a foundation for technological self-reliance and innovation across Bangladesh. We believe that by placing the tools of creation and knowledge into the hands of our youth and businesses, we can collectively solve the challenges of tomorrow.
                    </p>
                </div>
            </section>

            {/* --- Key Areas Section --- */}
            <section className="py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white font-heading">Our Contributions Are Focused on Three Key Areas</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {impactAreas.map((area, index) => (
                            <div key={index} className="bg-white dark:bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full flex flex-col">
                                <div className="flex justify-center mb-8">
                                    <div className="w-16 h-16 bg-gradient-to-br from-zan-red to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        {area.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center font-heading">{area.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm flex-grow text-justify">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Vision for the Future Section --- */}
            <section className="py-20 relative z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-white dark:bg-white/5 backdrop-blur-md p-10 md:p-16 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl">
                        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                            <Lightbulb className="w-10 h-10 text-zan-blue dark:text-blue-400" />
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8 font-heading">Our Vision for the Future</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                            Our impact journey is just beginning. We are channeling our experience from workshops and R&D into creating simple, intuitive educational kits. Our vision is to see a Zantech robotics kit in the hands of every aspiring young innovator in Bangladesh, making the first step into programming and engineering as simple and joyful as possible.
                        </p>
                        <p className="text-xl font-bold text-zan-blue dark:text-blue-400 max-w-3xl mx-auto">
                            Zantech is more than a company; we are a catalyst for change, committed to empowering a brighter, more innovative future for Bangladesh, one student, one project, and one breakthrough at a time.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ImpactPage;