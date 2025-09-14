import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isDark, setIsDark] = useState(false);
    const [isAboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [isCareerDropdownOpen, setCareerDropdownOpen] = useState(false);
    const [isShowcaseDropdownOpen, setShowcaseDropdownOpen] = useState(false); // State for Showcase dropdown
    const location = useLocation();
    const navigate = useNavigate();

    const aboutDropdownRef = useRef(null);
    const careerDropdownRef = useRef(null);
    const showcaseDropdownRef = useRef(null); // Ref for Showcase dropdown

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    // Effect to handle clicks outside of the dropdown menus
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
                setAboutDropdownOpen(false);
            }
            if (careerDropdownRef.current && !careerDropdownRef.current.contains(event.target)) {
                setCareerDropdownOpen(false);
            }
            if (showcaseDropdownRef.current && !showcaseDropdownRef.current.contains(event.target)) {
                setShowcaseDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

    // Updated navLinks to remove items that are now in dropdowns
    const navLinks = [
        { href: '#home', text: 'Home' },
        { href: '#about', text: 'About Us' },
        { href: '#showcase', text: 'Showcase' },
        { href: '/career', text: 'Career' },
        { href: '#contact', text: 'Contact' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-gray-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src="/zantech_logo.png" alt="ZAN Tech Logo" className="w-15 h-10" />
                        <span className="text-2xl font-bold text-white">
                            ZAN <span className="text-white">Tech</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => {
                            const linkClasses = "font-bold text-white";

                            if (link.text === 'About Us') {
                                return (
                                    <div key={link.text} className="relative" ref={aboutDropdownRef}>
                                        <button onClick={() => setAboutDropdownOpen(prev => !prev)} className={`flex items-center space-x-1 ${linkClasses}`}>
                                            <span>About Us</span> <ChevronDown className="w-4 h-4" />
                                        </button>
                                        {isAboutDropdownOpen && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                                                <Link to="/about" className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setAboutDropdownOpen(false)}>About Company</Link>
                                                <a href="#team" className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setAboutDropdownOpen(false)}>About Team</a>
                                                <Link to="/impact" className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setAboutDropdownOpen(false)}>Impact</Link>
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            if (link.text === 'Showcase') {
                                return (
                                    <div key={link.text} className="relative" ref={showcaseDropdownRef}>
                                        <button onClick={() => setShowcaseDropdownOpen(prev => !prev)} className={`flex items-center space-x-1 ${linkClasses}`}>
                                            <span>Showcase</span> <ChevronDown className="w-4 h-4" />
                                        </button>
                                        {isShowcaseDropdownOpen && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                                                {/* Updated Link Here */}
                                                <Link to="/projects" className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setShowcaseDropdownOpen(false)}>Projects</Link>
                                                <Link to="/blog" className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setShowcaseDropdownOpen(false)}>Blog</Link>
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            if (link.text === 'Career') {
                                return (
                                    <div key={link.text} className="relative" ref={careerDropdownRef}>
                                        <button onClick={() => setCareerDropdownOpen(prev => !prev)} className={`flex items-center space-x-1 ${linkClasses}`}>
                                            <span>Career</span> <ChevronDown className="w-4 h-4" />
                                        </button>
                                        {isCareerDropdownOpen && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                                                <Link to="/career" className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setCareerDropdownOpen(false)}>Join Our Team</Link>
                                                <Link to="/ambassadors" className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setCareerDropdownOpen(false)}>Become an Ambassador</Link>
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            if (link.href.startsWith('/') && !link.href.startsWith('/#')) {
                                return (<Link key={link.text} to={link.href} className={linkClasses}>{link.text}</Link>);
                            }
                            return (<a key={link.text} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={linkClasses}>{link.text}</a>);
                        })}
                    </div>

                    <div className="flex items-center space-x-4">
                        <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-700">
                            {isDark ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
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