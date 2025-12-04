import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isDark, setIsDark] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [isCareerDropdownOpen, setCareerDropdownOpen] = useState(false);
    const [isShowcaseDropdownOpen, setShowcaseDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const aboutDropdownRef = useRef<HTMLDivElement>(null);
    const careerDropdownRef = useRef<HTMLDivElement>(null);
    const showcaseDropdownRef = useRef<HTMLDivElement>(null);
    const mobileMenuNode = useRef<HTMLElement>(null);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effect to handle clicks outside of all menus
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (window.innerWidth < 768) return;

            if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
                setAboutDropdownOpen(false);
            }
            if (careerDropdownRef.current && !careerDropdownRef.current.contains(event.target as Node)) {
                setCareerDropdownOpen(false);
            }
            if (showcaseDropdownRef.current && !showcaseDropdownRef.current.contains(event.target as Node)) {
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

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
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
        { href: '/workshops', text: 'Workshops' },
        { href: '#showcase', text: 'Showcase' },
        { href: '/career', text: 'Career' },
        { href: 'https://projectuddipon.zantechbd.com/', text: 'Project Uddipon' },
        { href: '#contact', text: 'Contact' },
    ];

    const isHomePage = location.pathname === '/';
    const shouldBeSolid = isScrolled || !isHomePage;

    const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${shouldBeSolid
        ? 'bg-white/90 dark:bg-zan-dark/90 backdrop-blur-md shadow-lg py-2'
        : 'bg-transparent py-4'
        }`;

    const linkClasses = `font-medium transition-colors duration-200 ${shouldBeSolid
        ? 'text-gray-700 dark:text-gray-200 hover:text-zan-red'
        : 'text-white/90 hover:text-white'
        }`;

    const dropdownClasses = "absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white/95 dark:bg-zan-dark/95 backdrop-blur-md rounded-xl shadow-xl py-2 border border-gray-100 dark:border-gray-800 transform origin-top transition-all duration-200";
    const dropdownItemClasses = "block w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-zan-red dark:hover:text-zan-red transition-colors";

    return (
        <nav className={navbarClasses} ref={mobileMenuNode}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2 group">
                        <img src="/zantech_logo.png" alt="ZAN Tech Logo" className="w-12 h-auto transition-transform duration-300 group-hover:scale-105" />
                        <span className={`text-2xl font-bold tracking-tight ${shouldBeSolid ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                            ZAN <span className={shouldBeSolid ? 'text-zan-red' : 'text-white'}>Tech</span>
                        </span>
                    </Link>

                    {/* --- Desktop Menu --- */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => {
                            if (link.text === 'About Us') {
                                return (
                                    <div key={link.text} className="relative" ref={aboutDropdownRef}>
                                        <button onClick={() => setAboutDropdownOpen(p => !p)} className={`flex items-center space-x-1 ${linkClasses}`}>
                                            <span>About Us</span> <ChevronDown className={`w-4 h-4 transition-transform ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isAboutDropdownOpen && (
                                            <div className={dropdownClasses}>
                                                <Link to="/about" className={dropdownItemClasses} onClick={() => setAboutDropdownOpen(false)}>About Company</Link>
                                                <a href="#team" className={dropdownItemClasses} onClick={() => setAboutDropdownOpen(false)}>About Team</a>
                                                <Link to="/impact" className={dropdownItemClasses} onClick={() => setAboutDropdownOpen(false)}>Impact</Link>
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            if (link.text === 'Showcase') {
                                return (
                                    <div key={link.text} className="relative" ref={showcaseDropdownRef}>
                                        <button onClick={() => setShowcaseDropdownOpen(p => !p)} className={`flex items-center space-x-1 ${linkClasses}`}>
                                            <span>Showcase</span> <ChevronDown className={`w-4 h-4 transition-transform ${isShowcaseDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isShowcaseDropdownOpen && (
                                            <div className={dropdownClasses}>
                                                <Link to="/projects" className={dropdownItemClasses} onClick={() => setShowcaseDropdownOpen(false)}>Projects</Link>
                                                <Link to="/blog" className={dropdownItemClasses} onClick={() => setShowcaseDropdownOpen(false)}>Blog</Link>
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            if (link.text === 'Career') {
                                return (
                                    <div key={link.text} className="relative" ref={careerDropdownRef}>
                                        <button onClick={() => setCareerDropdownOpen(p => !p)} className={`flex items-center space-x-1 ${linkClasses}`}>
                                            <span>Career</span> <ChevronDown className={`w-4 h-4 transition-transform ${isCareerDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isCareerDropdownOpen && (
                                            <div className={dropdownClasses}>
                                                <Link to="/career" className={dropdownItemClasses} onClick={() => setCareerDropdownOpen(false)}>Join Our Team</Link>
                                                <Link to="/ambassadors" className={dropdownItemClasses} onClick={() => setCareerDropdownOpen(false)}>Become an Ambassador</Link>
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            if (link.href.startsWith('http')) {
                                return (
                                    <a
                                        key={link.text}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={linkClasses}
                                    >
                                        {link.text}
                                    </a>
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
                            <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${shouldBeSolid ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                            <a href="https://store.zantechbd.com">
                                <button className="bg-zan-red hover:bg-red-600 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5">
                                    Store
                                </button>
                            </a>
                        </div>
                        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className={`md:hidden p-2 rounded-lg ${shouldBeSolid ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Mobile Menu --- */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-zan-dark border-t border-gray-100 dark:border-gray-800 shadow-xl absolute w-full left-0 max-h-[80vh] overflow-y-auto">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {/* Mobile Links */}
                        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="block text-gray-700 dark:text-gray-200 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 font-medium">Home</a>

                        {/* Mobile About Us Dropdown */}
                        <div>
                            <button onClick={() => setAboutDropdownOpen(p => !p)} className="w-full flex justify-between items-center text-gray-700 dark:text-gray-200 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 font-medium">
                                <span>About Us</span> <ChevronDown className={`w-5 h-5 transition-transform ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isAboutDropdownOpen && <div className="pl-4 space-y-1 bg-gray-50 dark:bg-white/5 rounded-lg my-1">
                                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 dark:text-gray-300 px-4 py-2.5 text-sm">About Company</Link>
                                <a href="#team" onClick={(e) => handleNavClick(e, '#team')} className="block text-gray-600 dark:text-gray-300 px-4 py-2.5 text-sm">About Team</a>
                                <Link to="/impact" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 dark:text-gray-300 px-4 py-2.5 text-sm">Impact</Link>
                            </div>}
                        </div>

                        <Link to="/workshops" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 dark:text-gray-200 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 font-medium">Workshops</Link>

                        {/* Mobile Showcase Dropdown */}
                        <div>
                            <button onClick={() => setShowcaseDropdownOpen(p => !p)} className="w-full flex justify-between items-center text-gray-700 dark:text-gray-200 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 font-medium">
                                <span>Showcase</span> <ChevronDown className={`w-5 h-5 transition-transform ${isShowcaseDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isShowcaseDropdownOpen && <div className="pl-4 space-y-1 bg-gray-50 dark:bg-white/5 rounded-lg my-1">
                                <Link to="/projects" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 dark:text-gray-300 px-4 py-2.5 text-sm">Projects</Link>
                                <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 dark:text-gray-300 px-4 py-2.5 text-sm">Blog</Link>
                            </div>}
                        </div>

                        {/* Mobile Career Dropdown */}
                        <div>
                            <button onClick={() => setCareerDropdownOpen(p => !p)} className="w-full flex justify-between items-center text-gray-700 dark:text-gray-200 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 font-medium">
                                <span>Career</span> <ChevronDown className={`w-5 h-5 transition-transform ${isCareerDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isCareerDropdownOpen && <div className="pl-4 space-y-1 bg-gray-50 dark:bg-white/5 rounded-lg my-1">
                                <Link to="/career" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 dark:text-gray-300 px-4 py-2.5 text-sm">Join Our Team</Link>
                                <Link to="/ambassadors" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 dark:text-gray-300 px-4 py-2.5 text-sm">Become an Ambassador</Link>
                            </div>}
                        </div>

                        <a
                            href="https://projectuddipon.zantechbd.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-gray-700 dark:text-gray-200 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Project Uddipon
                        </a>

                        <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="block text-gray-700 dark:text-gray-200 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 font-medium">Contact</a>

                        {/* Mobile Buttons */}
                        <div className="pt-6 mt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between px-4">
                            <button onClick={toggleTheme} className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                            <a href="https://store.zantechbd.com" className="flex-1 ml-4">
                                <button className="w-full bg-zan-red text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-red-500/20">Store</button>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
