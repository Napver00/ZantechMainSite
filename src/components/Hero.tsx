import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const Hero = () => {
    const [heroData, setHeroData] = useState({
        hero_title: 'Loading...',
    });
    const [decodedTitle, setDecodedTitle] = useState('');

    // Fetch data
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
                setHeroData({ hero_title: 'Innovation for a Better Future' });
            });
    }, []);

    // Decoding Text Effect
    useEffect(() => {
        const originalText = heroData.hero_title;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        let iteration = 0;
        let interval: any = null;

        if (heroData.hero_title !== 'Loading...') {
            interval = setInterval(() => {
                setDecodedTitle(
                    originalText
                        .split('')
                        .map((_, index) => {
                            if (index < iteration) {
                                return originalText[index];
                            }
                            return characters[Math.floor(Math.random() * characters.length)];
                        })
                        .join('')
                );

                if (iteration >= originalText.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 2; // Speed of decoding
            }, 30);
        }

        return () => clearInterval(interval);
    }, [heroData.hero_title]);


    // Animated Counter Component
    const AnimatedCounter = ({ end, duration = 2500, suffix = '', delay = 0 }: { end: number, duration?: number, suffix?: string, delay?: number }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            let startTime: number | null = null;
            let animationFrameId: number;

            // Wait for delay before starting
            const timeoutId = setTimeout(() => {
                const animate = (currentTime: number) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);

                    // Smoother easing: easeOutQuart
                    const easeOutQuart = (x: number): number => {
                        return 1 - Math.pow(1 - x, 4);
                    };

                    setCount(Math.floor(easeOutQuart(progress) * end));

                    if (progress < 1) {
                        animationFrameId = requestAnimationFrame(animate);
                    }
                };

                animationFrameId = requestAnimationFrame(animate);
            }, delay);

            return () => {
                clearTimeout(timeoutId);
                cancelAnimationFrame(animationFrameId);
            };
        }, [end, duration, delay]);

        return <span>{count}{suffix}</span>;
    };

    const stats = [
        { value: 50, suffix: "+", label: "Projects Completed" },
        { value: 25, suffix: "+", label: "Workshops Conducted" },
        { value: 3, suffix: "+", label: "Years Experience" },
        { value: 100, suffix: "%", label: "Innovation Focus" }
    ];

    const titleWords = decodedTitle.split(' ');
    const firstLine = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' ');
    const secondLine = titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ');

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center items-center relative text-white text-center p-4 overflow-hidden bg-zan-dark">
            {/* Background Image & Overlay */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0 opacity-40 mix-blend-luminosity"
                style={{ backgroundImage: `url('/hereo_section_image.jpg')` }}
            ></div>

            {/* Cyberpunk Grid Overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20 z-0"></div>

            {/* Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-zan-dark/90 via-zan-dark/50 to-zan-dark z-0"></div>

            {/* Decorative Tech Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] lg:w-[800px] h-[300px] md:h-[600px] lg:h-[800px] border border-zan-cyan/10 rounded-full animate-spin-slow z-0 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] lg:w-[600px] h-[200px] md:h-[400px] lg:h-[600px] border border-zan-red/10 rounded-full animate-spin-slow animation-delay-2000 z-0 pointer-events-none"></div>

            {/* Main Title Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[40vh] md:min-h-[50vh] px-2 md:px-0">
                <div className="space-y-6 md:space-y-8">
                    {/* Glitch Effect Title Container */}
                    <div className="relative">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight font-heading">
                            <span className="block text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{firstLine}</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan via-white to-zan-cyan animate-shine bg-[length:200%_auto] mt-2 md:mt-0">
                                {secondLine}
                            </span>
                        </h1>
                    </div>

                    <p className="max-w-2xl mx-auto text-base md:text-xl text-gray-300 font-light tracking-wide border-l-2 border-zan-red pl-4 text-left">
                        <span className="text-zan-cyan font-bold mr-2">&gt;</span>
                        Empowering the next generation through robotics, AI, and hands-on technical education.
                        <span className="inline-block w-2 h-4 bg-zan-cyan ml-1 animate-pulse"></span>
                    </p>

                    {/* CTA Button */}
                    <div className="pt-6 md:pt-8 pb-4">
                        <a href="#showcase" className="relative px-6 md:px-8 py-3 bg-transparent border border-zan-cyan text-zan-cyan font-bold uppercase tracking-widest hover:bg-zan-cyan hover:text-black transition-all duration-300 group overflow-hidden text-sm md:text-base inline-block">
                            <span className="relative z-10">Explore Innovations</span>
                            <div className="absolute inset-0 bg-zan-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0"></div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Stats Section as Holographic Cards */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-20 mt-8 md:mt-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="group relative p-4 md:p-6 bg-surface-dark/40 backdrop-blur-md border border-white/10 hover:border-zan-cyan/50 transition-all duration-300 text-center overflow-hidden rounded-sm">
                            {/* Card Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-zan-cyan/0 via-zan-cyan/0 to-zan-cyan/0 group-hover:via-zan-cyan/5 transition-all duration-500"></div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-zan-cyan transition-colors"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-zan-cyan transition-colors"></div>

                            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2 group-hover:text-zan-cyan transition-colors font-heading inline-block min-w-[3ch]">
                                <AnimatedCounter end={stat.value} suffix={stat.suffix} delay={index * 200} />
                            </h3>
                            <p className="text-[10px] md:text-sm text-gray-400 font-mono tracking-widest uppercase">
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