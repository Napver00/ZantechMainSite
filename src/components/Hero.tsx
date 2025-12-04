import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { ArrowRight, ChevronRight } from 'lucide-react';

const Hero = () => {
    const [heroData, setHeroData] = useState({
        hero_title: 'Loading...',
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/company`)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.data.hero_title) {
                    setHeroData({
                        hero_title: data.data.hero_title,
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching hero data:', error)
                setHeroData({ hero_title: 'Innovation for a Better Future' }); // Fallback title
            });
    }, []);

    const stats = [
        { number: "50+", label: "Projects Completed" },
        { number: "25+", label: "Workshops Conducted" },
        { number: "3+", label: "Years Experience" },
        { number: "100%", label: "Innovation Focus" }
    ];

    const titleWords = heroData.hero_title.split(' ');
    const firstLine = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' ');
    const secondLine = titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ');

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center items-center relative text-white text-center p-4 overflow-hidden">
            {/* Background Image & Overlay */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-2]"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1606818266942-7c5769aacdd5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
            ></div>

            {/* Modern Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/90 z-[-1]"></div>

            {/* Main Title Content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
                <div className="space-y-6">

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight drop-shadow-xl">
                        <span className="block">{firstLine}</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                            {secondLine}
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
                        Empowering the next generation through robotics, AI, and hands-on technical education.
                    </p>

                </div>
            </div>

            {/* Stats Section as Floating Glass Cards */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="group p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 text-center">
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-zan-red transition-colors">
                                {stat.number}
                            </h3>
                            <p className="text-sm md:text-base text-gray-400 font-medium tracking-wide uppercase">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Hero;