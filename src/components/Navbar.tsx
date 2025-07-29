import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isDark, setIsDark] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

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

    const handleNavClick = (e, hash) => {
        if (location.pathname !== '/') {
            e.preventDefault();
            navigate('/');
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };


    const navLinks = [
        { href: '#home', text: 'Home' },
        { href: '#services', text: 'Services' },
        { href: '#projects', text: 'Projects' },
        { href: '#ambassadors', text: 'Campus Ambassadors' },
        { href: '#about', text: 'About' },
        { href: '#contact', text: 'Contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg'
                : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src="/Asset 2.png" alt="ZAN Tech Logo" className="w-10 h-10" />
                        <span className="text-2xl font-bold text-zan-blue">
                            ZAN <span className="text-zan-red">Tech</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        {navLinks.map(link => {
                            if (link.href.startsWith('/')) {
                                return (
                                    <Link key={link.text} to={link.href} className="text-gray-700 dark:text-gray-300 hover:text-zan-red dark:hover:text-red-400 transition-colors">
                                        {link.text}
                                    </Link>
                                );
                            }
                            return (
                                <a key={link.text} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-gray-700 dark:text-gray-300 hover:text-zan-red dark:hover:text-red-400 transition-colors">
                                    {link.text}
                                </a>
                            );
                        })}
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <a href="https://zantechbd.com/">
                            <button className="bg-zan-red text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-105">
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