import { Bot, Wifi, Cpu, Zap, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const Hero = () => {
    const [heroData, setHeroData] = useState({ title: '', subtitle: '', description: '' });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/company-info`)
            .then(response => response.json())
            .then(data => setHeroData(data.herosection))
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
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"></div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {heroData.title.split(' ')[0]}
                                </span>
                                <br />
                                <span className="text-gray-900 dark:text-white">{heroData.title.split(' ').slice(1).join(' ')}</span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                                {heroData.subtitle}
                            </p>
                            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
                                {heroData.description}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#contact" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                                <span>Start Your Project</span>
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>

                        <div className="flex items-center space-x-8 pt-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl lg:text-3xl font-bold text-cyan-600 dark:text-cyan-400">
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
                                    { icon: <Bot className="w-12 h-12" />, label: "Robotics", color: "from-cyan-500 to-blue-500" },
                                    { icon: <Wifi className="w-12 h-12" />, label: "IoT", color: "from-purple-500 to-pink-500" },
                                    { icon: <Cpu className="w-12 h-12" />, label: "AI/ML", color: "from-green-500 to-emerald-500" },
                                    { icon: <Zap className="w-12 h-12" />, label: "Innovation", color: "from-orange-500 to-red-500" }
                                ].map((item, index) => (
                                    <div key={index} className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer">
                                        <div className={`bg-gradient-to-r ${item.color} text-white rounded-xl p-3 w-fit mx-auto mb-3`}>
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