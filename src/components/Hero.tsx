import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

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

    // Using the stats from your original component as they are relevant to a tech company
    const stats = [
        { number: "50+", label: "Projects Completed" },
        { number: "25+", label: "Happy Clients" },
        { number: "5+", label: "Years Experience" },
        { number: "100%", label: "Innovation Focus" }
    ];

    // Split the title into two lines for the hero display
    const titleWords = heroData.hero_title.split(' ');
    const firstLine = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' ');
    const secondLine = titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ');

    return (
        <section id="home" className="min-h-screen flex flex-col justify-between items-center relative text-white text-center p-4">
            {/* Background Image & Overlay */}
            {/* You can replace the URL with your own background image */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-2]"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1606818266942-7c5769aacdd5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
            ></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-80 z-[-1]"></div>

            {/* Main Title Content (takes up remaining space) */}
            <div className="relative z-10 flex-grow flex flex-col justify-center items-center w-full">
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight drop-shadow-md">
                        {firstLine}
                        <br />
                        {secondLine}
                    </h1>
                </div>
            </div>

            {/* Stats Section at the bottom */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                                {stat.number}
                            </h3>
                            <p className="text-sm md:text-base text-gray-300 mt-1">
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