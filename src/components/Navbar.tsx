import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
    const [isDark, setIsDark] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg'
                : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-2">
                        {/* Changed from Bot icon to img tag */}
                        <img src="/Asset 2.png" alt="ZAN Tech Logo" className="w-10 h-10" />
                        {/* Changed text from ZantechBD to ZAN Tech */}
                        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                            ZAN Tech
                        </span>
                    </div>

                    <div className="hidden md:flex space-x-8">
                        <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Home</a>
                        <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Services</a>
                        <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Projects</a>
                        <a href="#ambassadors" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Campus Ambassadors</a>
                        <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">About</a>
                        <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Contact</a>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <a href="https://zantechbd.com/">
                            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                Store
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;