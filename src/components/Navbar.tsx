import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isDark, setIsDark] = useState(false);
    const [isAboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [isCareerDropdownOpen, setCareerDropdownOpen] = useState(false);
    const [isShowcaseDropdownOpen, setShowcaseDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const aboutDropdownRef = useRef(null);
    const careerDropdownRef = useRef(null);
    const showcaseDropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    // Effect to handle clicks outside
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
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setAboutDropdownOpen(false);
        setCareerDropdownOpen(false);
        setShowcaseDropdownOpen(false);
    };

    const handleNavClick = (e, hash) => {
        closeMobileMenu();
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
        { href: '#about', text: 'About Us' },
        { href: '#showcase', text: 'Showcase' },
        { href: '/career', text: 'Career' },
        { href: '#contact', text: 'Contact' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-gray-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                        <img src="/zantech_logo.png" alt="ZAN Tech Logo" className="w-15 h-10" />
                        <span className="text-2xl font-bold text-white">
                            ZAN <span className="text-white">Tech</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => {
                            const linkClasses = "font-bold text-white hover:text-gray-300 transition-colors";

                            if (link.text === 'About Us') {
                                return (
                                    <div key={link.text} className="relative" ref={aboutDropdownRef}>
                                        <button 
                                            onClick={() => setAboutDropdownOpen(prev => !prev)} 
                                            className={`flex items-center space-x-1 ${linkClasses}`}
                                        >
                                            <span>About Us</span> 
                                            <ChevronDown className={`w-4 h-4 transition-transform ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
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
                                        <button 
                                            onClick={() => setShowcaseDropdownOpen(prev => !prev)} 
                                            className={`flex items-center space-x-1 ${linkClasses}`}
                                        >
                                            <span>Showcase</span> 
                                            <ChevronDown className={`w-4 h-4 transition-transform ${isShowcaseDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isShowcaseDropdownOpen && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                                                <Link to="/workshops" className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setShowcaseDropdownOpen(false)}>Workshops</Link>
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
                                        <button 
                                            onClick={() => setCareerDropdownOpen(prev => !prev)} 
                                            className={`flex items-center space-x-1 ${linkClasses}`}
                                        >
                                            <span>Career</span> 
                                            <ChevronDown className={`w-4 h-4 transition-transform ${isCareerDropdownOpen ? 'rotate-180' : ''}`} />
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

                    {/* Right side buttons */}
                    <div className="flex items-center space-x-4">
                        {/* Theme toggle */}
                        <button 
                            onClick={toggleTheme} 
                            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
                        </button>
                        
                        {/* Store */}
                        <a href="https://zantechbd.com/" target="_blank" rel="noopener noreferrer">
                            <button className="bg-zan-red text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-105">
                                Store
                            </button>
                        </a>

                        {/* Mobile menu button */}
                        <button 
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div ref={mobileMenuRef} className="md:hidden bg-gray-800 border-t border-gray-700 py-4">
                        <div className="space-y-2">
                            {navLinks.map(link => {
                                const mobileNavLinkClasses = "block w-full text-left px-4 py-3 text-white hover:bg-gray-700 transition-colors";

                                if (link.text === 'About Us') {
                                    return (
                                        <div key={link.text} className="border-b border-gray-700 pb-2">
                                            <button 
                                                onClick={() => setAboutDropdownOpen(prev => !prev)} 
                                                className={`flex items-center justify-between w-full ${mobileNavLinkClasses}`}
                                            >
                                                <span>About Us</span>
                                                <ChevronDown className={`w-4 h-4 transition-transform ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            {isAboutDropdownOpen && (
                                                <div className="bg-gray-700 mt-2 rounded-md">
                                                    <Link to="/about" className="block px-6 py-2 text-sm text-gray-300 hover:bg-gray-600" onClick={closeMobileMenu}>About Company</Link>
                                                    <a href="#team" className="block px-6 py-2 text-sm text-gray-300 hover:bg-gray-600" onClick={closeMobileMenu}>About Team</a>
                                                    <Link to="/impact" className="block px-6 py-2 text-sm text-gray-300 hover:bg-gray-600" onClick={closeMobileMenu}>Impact</Link>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                if (link.text === 'Showcase') {
                                    return (
                                        <div key={link.text} className="border-b border-gray-700 pb-2">
                                            <button 
                                                onClick={() => setShowcaseDropdownOpen(prev => !prev)} 
                                                className={`flex items-center justify-between w-full ${mobileNavLinkClasses}`}
                                            >
                                                <span>Showcase</span>
                                                <ChevronDown className={`w-4 h-4 transition-transform ${isShowcaseDropdownOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            {isShowcaseDropdownOpen && (
                                                <div className="bg-gray-700 mt-2 rounded-md">
                                                    <Link to="/workshops" className="block px-6 py-2 text-sm text-gray-300 hover:bg-gray-600" onClick={closeMobileMenu}>Workshops</Link>
                                                    <Link to="/projects" className="block px-6 py-2 text-sm text-gray-300 hover:bg-gray-600" onClick={closeMobileMenu}>Projects</Link>
                                                    <Link to="/blog" className="block px-6 py-2 text-sm text-gray-300 hover:bg-gray-600" onClick={closeMobileMenu}>Blog</Link>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                if (link.text === 'Career') {
                                    return (
                                        <div key={link.text} className="border-b border-gray-700 pb-2">
                                            <button 
                                                onClick={() => setCareerDropdownOpen(prev => !prev)} 
                                                className={`flex items-center justify-between w-full ${mobileNavLinkClasses}`}
                                            >
                                                <span>Career</span>
                                                <ChevronDown className={`w-4 h-4 transition-transform ${isCareerDropdownOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            {isCareerDropdownOpen && (
                                                <div className="bg-gray-700 mt-2 rounded-md">
                                                    <Link to="/career" className="block px-6 py-2 text-sm text-gray-300 hover:bg-gray-600" onClick={closeMobileMenu}>Join Our Team</Link>
                                                    <Link to="/ambassadors" className="block px-6 py-2 text-sm text-gray-300 hover:bg-gray-600" onClick={closeMobileMenu}>Become an Ambassador</Link>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                if (link.href.startsWith('/') && !link.href.startsWith('/#')) {
                                    return (
                                        <Link 
                                            key={link.text} 
                                            to={link.href} 
                                            className={`${mobileNavLinkClasses} border-b border-gray-700`}
                                            onClick={closeMobileMenu}
                                        >
                                            {link.text}
                                        </Link>
                                    );
                                }
                                
                                return (
                                    <a 
                                        key={link.text} 
                                        href={link.href} 
                                        onClick={(e) => handleNavClick(e, link.href)} 
                                        className={`${mobileNavLinkClasses} border-b border-gray-700`}
                                    >
                                        {link.text}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
