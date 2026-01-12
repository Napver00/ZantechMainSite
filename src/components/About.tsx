import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { GraduationCap, Cpu, Rocket, Briefcase, ChevronRight } from 'lucide-react';

const About = () => {
    const [aboutData, setAboutData] = useState({
        about_title: '',
        about_description1: '',
        about_description2: ''
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/company`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setAboutData({
                        about_title: data.data.about_title,
                        about_description1: data.data.about_description1,
                        about_description2: data.data.about_description2
                    });
                }
            })
            .catch(error => console.error('Error fetching about data:', error));
    }, []);

    // Content adapted for ZAN Tech's focus areas
    const ourFocus = [
        {
            title: 'Students & Educators',
            description: 'We partner with schools, colleges, and universities across Bangladesh to conduct free, hands-on workshops. Our mission is to ignite a passion for technology by teaching students the fundamentals of robotics, programming, and AI/ML.',
            icon: <GraduationCap className="w-6 h-6 text-zan-cyan" />
        },
        {
            title: 'Innovators & Hobbyists',
            description: 'For the builders, dreamers, and creators, we provide a curated selection of high-quality robotic equipment. From essentials like Arduino Uno and ESP modules to motor drivers and sensors, we supply the crucial components.',
            icon: <Cpu className="w-6 h-6 text-zan-cyan" />
        },
        {
            title: 'Future Creators',
            description: 'Our next frontier is developing intuitive and engaging educational products. We are designing kits and tools that will make learning robotics and programming a simple and enjoyable experience for students and children.',
            icon: <Rocket className="w-6 h-6 text-zan-cyan" />
        },
        {
            title: 'Business & Industry Partners',
            description: 'We leverage our technical expertise to drive corporate innovation. Zantech offers specialized Research and Development (R&D) services, collaborating with other companies to design, build, and prototype cutting-edge solutions.',
            icon: <Briefcase className="w-6 h-6 text-zan-cyan" />
        }
    ];

    return (
        <section id="about" className="py-16 md:py-24 bg-zan-dark relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-zan-blue/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-zan-red/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-2">
                        &lt;Identity /&gt;
                    </p>
                    <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold mb-6 text-white font-heading">
                        {aboutData.about_title || 'Who We Are'}
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed font-light">
                        {aboutData.about_description1}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {ourFocus.map((item, index) => (
                        <div
                            key={index}
                            className="group relative p-8 bg-surface-dark border border-white/5 shadow-lg hover:border-zan-cyan/50 transition-all duration-300 hover:bg-white/5 overflow-hidden"
                        >
                            {/* Decorative Line */}
                            <div className="absolute left-0 top-0 h-full w-[2px] bg-zan-cyan/20 group-hover:bg-zan-cyan transition-colors"></div>

                            <div className="flex items-start gap-6 relative z-10">
                                <div className="p-3 rounded-sm bg-zan-cyan/5 border border-zan-cyan/20 group-hover:bg-zan-cyan/20 transition-colors duration-300 shrink-0">
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-zan-cyan transition-colors font-heading uppercase tracking-wide">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed mb-4 text-sm font-light">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center text-zan-cyan font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                                        Learn more <ChevronRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;