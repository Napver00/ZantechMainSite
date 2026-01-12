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
        <div className="bg-zan-dark overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] right-[-10%] w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-[100px]"></div>
            </div>

            {/* --- Header Section --- */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-20 text-center relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-4">
                        &lt;Social Impact Report /&gt;
                    </p>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 font-heading leading-tight">
                        Our Impact: Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Future of Bangladesh</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                        At Zantech, our impact extends beyond selling components; we are building a foundation for technological self-reliance and innovation across Bangladesh. We believe that by placing the tools of creation and knowledge into the hands of our youth and businesses, we can collectively solve the challenges of tomorrow.
                    </p>
                </div>
            </section>

            {/* --- Key Areas Section --- */}
            <section className="py-12 md:py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white font-heading uppercase tracking-wide">Our Contributions Are Focused on Three Key Areas</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {impactAreas.map((area, index) => (
                            <div key={index} className="bg-surface-dark backdrop-blur-md p-8 rounded-sm border border-white/5 shadow-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] hover:border-zan-cyan/30 transition-all duration-300 transform hover:-translate-y-2 group h-full flex flex-col relative overflow-hidden">
                                {/* Tech Decors */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-zan-cyan/5 to-transparent pointer-events-none"></div>

                                <div className="flex justify-center mb-8">
                                    <div className="w-16 h-16 bg-gradient-to-br from-zan-red/80 to-red-600/80 rounded-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/10">
                                        {area.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 text-center font-heading uppercase tracking-wide">{area.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm flex-grow text-justify font-light">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Vision for the Future Section --- */}
            <section className="py-12 md:py-20 relative z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-surface-dark backdrop-blur-md p-10 md:p-16 rounded-sm border border-white/10 shadow-[0_0_20px_rgba(0,240,255,0.05)] relative overflow-hidden">
                        <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-zan-cyan to-transparent opacity-50"></div>

                        <div className="w-20 h-20 bg-zan-cyan/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse border border-zan-cyan/20">
                            <Lightbulb className="w-10 h-10 text-zan-cyan" />
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 font-heading uppercase tracking-wide">Our Vision for the Future</h2>
                        <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto font-light">
                            Our impact journey is just beginning. We are channeling our experience from workshops and R&D into creating simple, intuitive educational kits. Our vision is to see a Zantech robotics kit in the hands of every aspiring young innovator in Bangladesh, making the first step into programming and engineering as simple and joyful as possible.
                        </p>
                        <p className="text-xl font-bold text-zan-cyan max-w-3xl mx-auto font-mono tracking-tight">
                            ZAN Tech is more than a company; we are a catalyst for change, committed to empowering a brighter, more innovative future for Bangladesh, one student, one project, and one breakthrough at a time.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ImpactPage;