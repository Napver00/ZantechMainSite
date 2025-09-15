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
    const mobileMenuNode = useRef(null); 

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    // Effect to handle clicks outside of all menus
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
            if (mobileMenuNode.current && !mobileMenuNode.current.contains(event.target)) {
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
    
    const handleMobileLinkClick = (path) => {
        setMobileMenuOpen(false);
        navigate(path);
    };

    const handleNavClick = (e, hash) => {
        setMobileMenuOpen(false);
        if (location.pathname !== '/') {
            e.preventDefault();
            navigate('/');
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.querySelector(hash);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
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
        <nav className="fixed w-full z-50 bg-gray-900 shadow-md" ref={mobileMenuNode}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2">
                        <img src="/zantech_logo.png" alt="ZAN Tech Logo" className="w-15 h-10" />
                        <span className="text-2xl font-bold text-white">ZAN <span className="text-white">Tech</span></span>
                    </Link>

                    {/* --- Desktop Menu --- */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => {
                            const linkClasses = "font-bold text-white";
                            if (link.text === 'About Us') {
                                return (
                                    <div key={link.text} className="relative" ref={aboutDropdownRef}>
                                        <button onClick={() => setAboutDropdownOpen(p => !p)} className={`flex items-center space-x-1 ${linkClasses}`}>
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
                                        <button onClick={() => setShowcaseDropdownOpen(p => !p)} className={`flex items-center space-x-1 ${linkClasses}`}>
                                            <span>Showcase</span> <ChevronDown className="w-4 h-4" />
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
                                        <button onClick={() => setCareerDropdownOpen(p => !p)} className={`flex items-center space-x-1 ${linkClasses}`}>
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

                    {/* --- Right side buttons & Mobile Toggle --- */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-4">
                            <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-700"><Moon className="w-5 h-5 text-white" /></button>
                            <a href="https://zantechbd.com/"><button className="bg-zan-red text-white px-6 py-2 rounded-full">Store</button></a>
                        </div>
                        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-lg text-white">
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Mobile Menu --- */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-900 absolute w-full left-0 shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {/* Mobile Links */}
                        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="block text-white px-3 py-2 rounded-md text-base font-medium">Home</a>
                        
                        {/* Mobile About Us Dropdown */}
                        <div>
                            <button onClick={() => setAboutDropdownOpen(p => !p)} className="w-full flex justify-between items-center text-white px-3 py-2 rounded-md text-base font-medium">
                                <span>About Us</span> <ChevronDown className={`w-5 h-5 transition-transform ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isAboutDropdownOpen && <div className="pl-4 mt-1 space-y-1">
                                <Link to="/about" onClick={() => setMobileMenuOpen(true)} className="block text-gray-300 px-3 py-2 rounded-md">About Company</Link>
                                <a href="#team" onClick={(e) => handleNavClick(e, '#team')} className="block text-gray-300 px-3 py-2 rounded-md">About Team</a>
                                <Link to="/impact" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 px-3 py-2 rounded-md">Impact</Link>
                            </div>}
                        </div>

                        {/* Mobile Showcase Dropdown */}
                        <div>
                            <button onClick={() => setShowcaseDropdownOpen(p => !p)} className="w-full flex justify-between items-center text-white px-3 py-2 rounded-md text-base font-medium">
                                <span>Showcase</span> <ChevronDown className={`w-5 h-5 transition-transform ${isShowcaseDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isShowcaseDropdownOpen && <div className="pl-4 mt-1 space-y-1">
                                <Link to="/workshops" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 px-3 py-2 rounded-md">Workshops</Link>
                                <Link to="/projects" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 px-3 py-2 rounded-md">Projects</Link>
                                <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 px-3 py-2 rounded-md">Blog</Link>
                            </div>}
                        </div>

                        {/* Mobile Career Dropdown */}
                        <div>
                            <button onClick={() => setCareerDropdownOpen(p => !p)} className="w-full flex justify-between items-center text-white px-3 py-2 rounded-md text-base font-medium">
                                <span>Career</span> <ChevronDown className={`w-5 h-5 transition-transform ${isCareerDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isCareerDropdownOpen && <div className="pl-4 mt-1 space-y-1">
                                <Link to="/career" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 px-3 py-2 rounded-md">Join Our Team</Link>
                                <Link to="/ambassadors" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 px-3 py-2 rounded-md">Become an Ambassador</Link>
                            </div>}
                        </div>
                        
                        <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="block text-white px-3 py-2 rounded-md text-base font-medium">Contact</a>

                        {/* Mobile Buttons */}
                        <div className="pt-4 border-t border-gray-700 flex items-center justify-center space-x-4">
                             <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-700"><Moon className="w-5 h-5 text-white" /></button>
                            <a href="https://zantechbd.com/"><button className="bg-zan-red text-white px-6 py-2 rounded-full">Store</button></a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;