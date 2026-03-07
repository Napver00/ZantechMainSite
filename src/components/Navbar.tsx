import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isDark, setIsDark] = useState(true); // Default to dark for robotic theme
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [isShowcaseDropdownOpen, setShowcaseDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const aboutDropdownRef = useRef<HTMLDivElement>(null);
    const showcaseDropdownRef = useRef<HTMLDivElement>(null);

    // Initial Theme Setup
    useEffect(() => {
        // Enforce dark mode initially for the robotic feel
        if (!localStorage.getItem('theme')) {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            if (localStorage.getItem('theme') === 'dark') {
                document.documentElement.classList.add('dark');
                setIsDark(true);
            } else {
                document.documentElement.classList.remove('dark');
                setIsDark(false);
            }
        }
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
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
            if (showcaseDropdownRef.current && !showcaseDropdownRef.current.contains(event.target as Node)) {
                setShowcaseDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);




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
        { href: '/courses', text: 'Courses' },
        { href: '#showcase', text: 'Showcase' },
        { href: '/custom-robot', text: 'Custom Robot' },
        { href: '#contact', text: 'Contact' },
    ];


    const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'py-2 bg-zan-dark/80 backdrop-blur-xl border-b border-zan-cyan/20 shadow-[0_0_15px_rgba(0,240,255,0.1)]'
        : 'py-4 bg-transparent'
        }`;

    // HUD-style link classes
    const linkClasses = `relative text-sm uppercase tracking-wider font-medium transition-all duration-200 ${'text-gray-300 hover:text-zan-cyan'
        } group`;

    // Dropdown with tech styling
    const dropdownClasses = "absolute top-full left-0 mt-4 w-56 bg-surface-dark border border-zan-cyan/30 shadow-[0_0_15px_rgba(0,240,255,0.1)] rounded-sm py-2 origin-top-left transition-all duration-200 backdrop-blur-md";
    const dropdownItemClasses = "block w-full text-left px-4 py-2.5 text-sm uppercase tracking-wide text-gray-300 hover:bg-zan-cyan/10 hover:text-zan-cyan hover:pl-6 transition-all duration-200 border-l-2 border-transparent hover:border-zan-cyan";

    return (
        <>
            <nav className={navbarClasses}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center bg-transparent">
                        {/* Logo Section */}
                        <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2 group relative">
                            {/* Tech decoration around logo */}
                            <div className="absolute -inset-2 bg-zan-cyan/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <img src="/zantech_logo.png" alt="ZAN Tech Logo" className="w-10 h-auto relative z-10" />
                            <div className="flex flex-col relative z-10">
                                <span className="text-xl font-bold tracking-widest text-white font-heading leading-none">
                                    ZAN<span className="text-zan-red">TECH</span>
                                </span>
                                <span className="text-[0.6rem] text-zan-cyan tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                                    Robotics
                                </span>
                            </div>
                        </Link>

                        {/* --- Desktop Menu --- */}
                        <div className="hidden lg:flex items-center space-x-8 bg-surface-dark/50 px-8 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                            {navLinks.map(link => {
                                if (link.text === 'About Us') {
                                    return (
                                        <div key={link.text} className="relative" ref={aboutDropdownRef}>
                                            <button onClick={() => setAboutDropdownOpen(p => !p)} className={`flex items-center space-x-1 ${linkClasses} ${isAboutDropdownOpen ? 'text-zan-cyan' : ''}`}>
                                                <span>About Us</span>
                                                <ChevronDown className={`w-3 h-3 transition-transform ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                                                {/* Hover underline effect */}
                                                <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-zan-cyan transition-all duration-300 group-hover:w-full"></span>
                                            </button>
                                            {isAboutDropdownOpen && (
                                                <div className={dropdownClasses}>
                                                    {/* Corner decorations for tech look */}
                                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zan-cyan"></div>
                                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zan-cyan"></div>

                                                    <Link to="/about" className={dropdownItemClasses} onClick={() => setAboutDropdownOpen(false)}>About Company</Link>
                                                    <Link to="/team" className={dropdownItemClasses} onClick={() => setAboutDropdownOpen(false)}>About Team</Link>
                                                    <Link to="/impact" className={dropdownItemClasses} onClick={() => setAboutDropdownOpen(false)}>Impact</Link>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                if (link.text === 'Showcase') {
                                    return (
                                        <div key={link.text} className="relative" ref={showcaseDropdownRef}>
                                            <button onClick={() => setShowcaseDropdownOpen(p => !p)} className={`flex items-center space-x-1 ${linkClasses} ${isShowcaseDropdownOpen ? 'text-zan-cyan' : ''}`}>
                                                <span>Showcase</span> <ChevronDown className={`w-3 h-3 transition-transform ${isShowcaseDropdownOpen ? 'rotate-180' : ''}`} />
                                                <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-zan-cyan transition-all duration-300 group-hover:w-full"></span>
                                            </button>
                                            {isShowcaseDropdownOpen && (
                                                <div className={dropdownClasses}>
                                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zan-cyan"></div>
                                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zan-cyan"></div>

                                                    <Link to="/workshops" className={dropdownItemClasses} onClick={() => setShowcaseDropdownOpen(false)}>Workshops</Link>
                                                    <Link to="/tutorials" className={dropdownItemClasses} onClick={() => setShowcaseDropdownOpen(false)}>Tutorials</Link>
                                                    <a href="https://projectuddipon.zantechbd.com/" target="_blank" rel="noopener noreferrer" className={dropdownItemClasses} onClick={() => setShowcaseDropdownOpen(false)}>Project Uddipon</a>
                                                    <Link to="/projects" className={dropdownItemClasses} onClick={() => setShowcaseDropdownOpen(false)}>Projects</Link>

                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                if (link.href.startsWith('/#')) { // Anchor link handling
                                    return (<a key={link.text} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={linkClasses}>{link.text}
                                        <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-zan-cyan transition-all duration-300 group-hover:w-full"></span>
                                    </a>);
                                }

                                // External Link
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
                                            <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-zan-cyan transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    );
                                }

                                // Adjusting logic: if it's #contact or #home, treat as anchor if on homepage, else nav click
                                if (link.href.startsWith('#')) {
                                    return (<a key={link.text} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={linkClasses}>{link.text}
                                        <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-zan-cyan transition-all duration-300 group-hover:w-full"></span>
                                    </a>);
                                }


                                return (<Link key={link.text} to={link.href} className={linkClasses}>{link.text}
                                    <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-zan-cyan transition-all duration-300 group-hover:w-full"></span>
                                </Link>);
                            })}
                        </div>

                        {/* --- Right side buttons & Mobile Toggle --- */}
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-4">

                                <a href="https://store.zantechbd.com">
                                    <button className="relative overflow-hidden group bg-transparent border border-zan-red text-white px-6 py-2 font-medium transition-all hover:shadow-[0_0_15px_rgba(237,38,38,0.5)] skew-x-[-10deg]">
                                        <div className="absolute inset-0 w-full h-full bg-zan-red/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                                        <span className="block skew-x-[10deg] tracking-wider uppercase text-sm">Store</span>
                                    </button>
                                </a>
                            </div>
                            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-white border border-white/20 rounded hover:bg-white/10">
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- Mobile Menu Overlay --- */}
            <div className={`fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMobileMenuOpen(false)}
            ></div>

            {/* --- Mobile Menu Drawer --- */}
            <div className={`fixed inset-y-0 right-0 z-[100] w-full max-w-sm bg-zan-dark border-l border-zan-cyan/20 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                        <span className="text-xl font-bold font-heading text-white tracking-widest">MENU</span>
                        <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2">
                        {/* Mobile Links */}
                        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="block text-lg text-gray-300 hover:text-zan-cyan px-4 py-4 border-l-2 border-transparent hover:border-zan-cyan bg-white/5 hover:bg-white/10 transition-all font-medium rounded-r-sm">Home</a>

                        {/* Mobile About Us Dropdown */}
                        <div>
                            <button onClick={() => setAboutDropdownOpen(p => !p)} className="w-full flex justify-between items-center text-lg text-gray-300 hover:text-zan-cyan px-4 py-4 border-l-2 border-transparent hover:border-zan-cyan bg-white/5 hover:bg-white/10 transition-all font-medium rounded-r-sm">
                                <span>About Us</span> <ChevronDown className={`w-5 h-5 transition-transform ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isAboutDropdownOpen && <div className="ml-4 pl-4 border-l border-white/10 space-y-1 my-2">
                                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-gray-400 hover:text-white py-3 text-base">About Company</Link>
                                <Link to="/team" onClick={() => setMobileMenuOpen(false)} className="block text-gray-400 hover:text-white py-3 text-base">About Team</Link>
                                <Link to="/impact" onClick={() => setMobileMenuOpen(false)} className="block text-gray-400 hover:text-white py-3 text-base">Impact</Link>
                            </div>}
                        </div>


                        <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="block text-lg text-gray-300 hover:text-zan-cyan px-4 py-4 border-l-2 border-transparent hover:border-zan-cyan bg-white/5 hover:bg-white/10 transition-all font-medium rounded-r-sm">Courses</Link>

                        {/* Mobile Showcase Dropdown */}
                        <div>
                            <button onClick={() => setShowcaseDropdownOpen(p => !p)} className="w-full flex justify-between items-center text-lg text-gray-300 hover:text-zan-cyan px-4 py-4 border-l-2 border-transparent hover:border-zan-cyan bg-white/5 hover:bg-white/10 transition-all font-medium rounded-r-sm">
                                <span>Showcase</span> <ChevronDown className={`w-5 h-5 transition-transform ${isShowcaseDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isShowcaseDropdownOpen && <div className="ml-4 pl-4 border-l border-white/10 space-y-1 my-2">
                                <Link to="/workshops" onClick={() => setMobileMenuOpen(false)} className="block text-gray-400 hover:text-white py-3 text-base">Workshops</Link>
                                <Link to="/tutorials" onClick={() => setMobileMenuOpen(false)} className="block text-gray-400 hover:text-white py-3 text-base">Tutorials</Link>
                                <a href="https://projectuddipon.zantechbd.com/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="block text-gray-400 hover:text-white py-3 text-base">Project Uddipon</a>
                                <Link to="/projects" onClick={() => setMobileMenuOpen(false)} className="block text-gray-400 hover:text-white py-3 text-base">Projects</Link>

                            </div>}
                        </div>

                        <Link to="/custom-robot" onClick={() => setMobileMenuOpen(false)} className="block text-lg text-gray-300 hover:text-zan-cyan px-4 py-4 border-l-2 border-transparent hover:border-zan-cyan bg-white/5 hover:bg-white/10 transition-all font-medium rounded-r-sm">Custom Robot</Link>

                        <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="block text-lg text-gray-300 hover:text-zan-cyan px-4 py-4 border-l-2 border-transparent hover:border-zan-cyan bg-white/5 hover:bg-white/10 transition-all font-medium rounded-r-sm">Contact</a>
                    </div>

                    <div className="pt-6 mt-4 border-t border-white/10 space-y-4">

                        <a href="https://store.zantechbd.com" className="block">
                            <button className="w-full py-4 bg-zan-red text-white font-bold uppercase tracking-widest skew-x-[-10deg] hover:bg-red-600 transition-colors shadow-[0_0_15px_rgba(237,38,38,0.3)]">
                                <span className="block skew-x-[10deg]">Store</span>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
