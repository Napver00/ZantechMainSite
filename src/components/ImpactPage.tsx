import React from 'react';
import { Users, Cpu, Globe, Lightbulb } from 'lucide-react';

const ImpactPage = () => {
    const impactAreas = [
        {
            icon: <Users className="w-10 h-10 text-white" />,
            title: "Cultivating a Generation of Tech Leaders",
            description: "Through our free, hands-on workshops in schools, colleges, and universities nationwide, we have reached thousands of students. We are bridging the critical gap between theoretical knowledge and practical application, transforming complex subjects like robotics, programming, and AI from intimidating concepts into exciting, achievable skills. We are not just teaching code; we are igniting a lifelong passion for problem-solving and innovation."
        },
        {
            icon: <Cpu className="w-10 h-10 text-white" />,
            title: "Strengthening the National Tech Ecosystem",
            description: "By providing accessible, high-quality robotic components, we empower a thriving community of makers, startups, and researchers. Our R&D services for local companies drive industrial innovation, creating homegrown solutions for local and global problems. This two-pronged approach builds a skilled, future-ready workforce and strengthens Bangladesh's position in the global tech landscape."
        },
        {
            icon: <Globe className="w-10 h-10 text-white" />,
            title: "Democratizing Access to Technology",
            description: "Our commitment to free education and affordable hardware ensures that financial barriers do not stand in the way of curiosity and talent. We are creating an inclusive ecosystem where any student, regardless of their background, has the opportunity to explore, invent, and prepare for a future driven by technology."
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-900">
            {/* --- Header Section --- */}
            <section className="pt-32 pb-20 bg-gray-50 dark:bg-gray-800 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Our Impact: Engineering the <span className="text-zan-blue">Future of Bangladesh</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        At Zantech, our impact extends beyond selling components; we are building a foundation for technological self-reliance and innovation across Bangladesh. We believe that by placing the tools of creation and knowledge into the hands of our youth and businesses, we can collectively solve the challenges of tomorrow.
                    </p>
                </div>
            </section>

            {/* --- Key Areas Section --- */}
            <section className="py-20 bg-zan-blue text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold">Our Contributions Are Focused on Three Key Areas</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        {impactAreas.map((area, index) => (
                            <div key={index} className="bg-white/10 p-8 rounded-2xl text-center backdrop-blur-md">
                                <div className="flex justify-center mb-4">
                                    <div className="bg-zan-red p-4 rounded-full">
                                        {area.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                                <p className="text-gray-300">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* --- Vision for the Future Section --- */}
            <section className="py-20 bg-white dark:bg-gray-900">
                 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Lightbulb className="w-12 h-12 text-zan-blue mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Vision for the Future</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                        Our impact journey is just beginning. We are channeling our experience from workshops and R&D into creating simple, intuitive educational kits. Our vision is to see a Zantech robotics kit in the hands of every aspiring young innovator in Bangladesh, making the first step into programming and engineering as simple and joyful as possible.
                    </p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        Zantech is more than a company; we are a catalyst for change, committed to empowering a brighter, more innovative future for Bangladesh, one student, one project, and one breakthrough at a time.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default ImpactPage;