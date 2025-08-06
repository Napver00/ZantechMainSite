import { Bot, Wifi, Cpu, Zap, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const Hero = () => {
    const [heroData, setHeroData] = useState({ 
        hero_title: '', 
        hero_subtitle: '', 
        hero_description: '' 
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/company`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setHeroData({
                        hero_title: data.data.hero_title,
                        hero_subtitle: data.data.hero_subtitle,
                        hero_description: data.data.hero_description
                    });
                }
            })
            .catch(error => console.error('Error fetching hero data:', error));
    }, []);

    const stats = [
        { number: "50+", label: "Projects Completed" },
        { number: "25+", label: "Happy Clients" },
        { number: "5+", label: "Years Experience" },
        { number: "100%", label: "Innovation Focus" }
    ];

    return (
        <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-white dark:bg-gray-900">
            <div className="absolute inset-0 bg-white dark:bg-gray-900"></div>

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-zan-blue/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-zan-red/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-zan-blue/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                <span className="text-zan-blue">
                                    {heroData.hero_title.split(' ')[0]}
                                </span>
                                <br />
                                <span className="text-gray-900 dark:text-white">{heroData.hero_title.split(' ').slice(1).join(' ')}</span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                                {heroData.hero_subtitle}
                            </p>
                            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
                                {heroData.hero_description}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#contact" className="bg-zan-blue text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                                <span>Start Your Project</span>
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>

                        <div className="flex items-center space-x-8 pt-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl lg:text-3xl font-bold text-zan-blue dark:text-blue-400">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative z-10 bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-gray-700/20">
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { icon: <Bot className="w-12 h-12" />, label: "Robotics", color: "bg-zan-blue" },
                                    { icon: <Wifi className="w-12 h-12" />, label: "IoT", color: "bg-zan-blue" },
                                    { icon: <Cpu className="w-12 h-12" />, label: "AI/ML", color: "bg-zan-blue" },
                                    { icon: <Zap className="w-12 h-12" />, label: "Innovation", color: "bg-zan-blue" }
                                ].map((item, index) => (
                                    <div key={index} className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer">
                                        <div className={`${item.color} text-white rounded-xl p-3 w-fit mx-auto mb-3`}>
                                            {item.icon}
                                        </div>
                                        <div className="font-semibold text-gray-700 dark:text-gray-300">
                                            {item.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;