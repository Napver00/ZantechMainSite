import { Globe, Shield, Users, Star, Bot, Wifi, Lightbulb, Cpu, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

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

    return (
        <section id="about" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                {aboutData.about_title.split(' ')[0]} <span className="text-zan-blue">{aboutData.about_title.split(' ').slice(1).join(' ')}</span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                {aboutData.about_description1}
                            </p>
                            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                                {aboutData.about_description2}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { icon: <Globe className="w-8 h-8" />, title: "Global Reach", desc: "Serving clients worldwide" },
                                { icon: <Shield className="w-8 h-8" />, title: "Quality Assured", desc: "100% tested solutions" },
                                { icon: <Users className="w-8 h-8" />, title: "Expert Team", desc: "Skilled professionals" },
                                { icon: <Star className="w-8 h-8" />, title: "Innovation First", desc: "Cutting-edge technology" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="bg-zan-blue text-white rounded-lg p-2">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link to="/about">
                            <button className="mt-6 bg-zan-blue text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                                <span>See More About Us</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="bg-blue-50 dark:bg-zan-blue/10 rounded-3xl p-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 text-center">
                                    <Bot className="w-12 h-12 text-zan-blue mx-auto mb-3" />
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Robotics</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Advanced automation</p>
                                </div>
                                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 text-center">
                                    <Wifi className="w-12 h-12 text-zan-blue mx-auto mb-3" />
                                    <h4 className="font-semibold text-gray-900 dark:text-white">IoT</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Smart connectivity</p>
                                </div>
                                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 text-center">
                                    <Lightbulb className="w-12 h-12 text-zan-blue mx-auto mb-3" />
                                    <h4 className="font-semibold text-gray-900 dark:text-white">R&D</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Innovation labs</p>
                                </div>
                                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 text-center">
                                    <Cpu className="w-12 h-12 text-zan-blue mx-auto mb-3" />
                                    <h4 className="font-semibold text-gray-900 dark:text-white">AI/ML</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Intelligent systems</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;