import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { ArrowRight, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp, FaTiktok, FaYoutube } from 'react-icons/fa6';

// Helper to render the correct social media icon
const SocialIcon = ({ platform }: { platform: string }) => {
    switch (platform?.toLowerCase()) {
        case 'facebook':
            return <FaFacebook className="w-5 h-5" />;
        case 'instagram':
            return <FaInstagram className="w-5 h-5" />;
        case 'twitter':
            return <FaTwitter className="w-5 h-5" />;
        case 'linkedin':
            return <FaLinkedin className="w-5 h-5" />;
        case 'whatsapp':
            return <FaWhatsapp className="w-5 h-5" />;
        case 'tiktok':
            return <FaTiktok className="w-5 h-5" />;
        case 'youtube':
            return <FaYoutube className="w-5 h-5" />;
        default:
            return null;
    }
};

interface SocialLink {
    platform: string;
    url: string;
}

interface FooterData {
    social_links: SocialLink[];
    email: string;
    phone: string;
    location: string;
}

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [footerData, setFooterData] = useState<FooterData>({
        social_links: [],
        email: 'zantechbd@gmail.com',
        phone: '',
        location: ''
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/company`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setFooterData(prevData => ({
                        ...prevData,
                        social_links: [
                            ...(data.data.social_links || []),
                            { platform: 'whatsapp', url: 'https://wa.me/+8801894634149' }
                        ],
                        phone: data.data.phone,
                        location: data.data.location
                    }));
                }
            })
            .catch(error => console.error('Error fetching footer data:', error));
    }, []);

    const companyLinks = [
        { text: "About Us", href: "/about" },
        { text: "Career", href: "/career" },
        { text: "Impact", href: "/impact" },
        { text: "Blog", href: "/blog" },
        { text: "FAQ", href: "/faq" },
        { text: "Project Uddipon", href: "https://projectuddipon.zantechbd.com/" },
    ];

    const legalLinks = [
        { text: "Privacy Policy", href: "/privacy-policy" },
        { text: "Terms & Services", href: "/terms-and-conditions" },
    ];

    return (
        <footer className="bg-zan-dark text-gray-300 border-t border-white/10 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand & Contact Column */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white font-heading mb-2">ZAN Tech</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Bridging the gap between education and industry through innovation.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-zan-red mt-1 shrink-0" />
                                <div>
                                    <p className="text-white font-medium">Bangladesh</p>
                                    <p className="text-sm text-gray-400">{footerData.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-zan-red shrink-0" />
                                <a href={`mailto:${footerData.email}`} className="hover:text-white transition-colors">{footerData.email}</a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-zan-red shrink-0" />
                                <a href={`tel:${footerData.phone}`} className="hover:text-white transition-colors">{footerData.phone}</a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Clock className="w-5 h-5 text-zan-red shrink-0" />
                                <span className="text-sm">Sat-Thu, 10AM - 06PM</span>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-lg">Company</h4>
                        <ul className="space-y-3">
                            {companyLinks.map(link => (
                                <li key={link.text}>
                                    {link.href.startsWith('http') ? (
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center hover:text-zan-red transition-colors"
                                        >
                                            <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                            <span>{link.text}</span>
                                        </a>
                                    ) : (
                                        <Link to={link.href} className="group flex items-center hover:text-zan-red transition-colors">
                                            <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                            <span>{link.text}</span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-lg">Legal</h4>
                        <ul className="space-y-3">
                            {legalLinks.map(link => (
                                <li key={link.text}>
                                    <Link to={link.href} className="group flex items-center hover:text-zan-red transition-colors">
                                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                        <span>{link.text}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / Socials */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-lg">Connect With Us</h4>
                        <p className="text-sm text-gray-400 mb-6">
                            Stay updated with our latest workshops, products, and innovations.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {footerData.social_links.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-zan-red hover:text-white text-gray-400 transition-all duration-300 border border-white/10"
                                >
                                    <SocialIcon platform={social.platform} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {currentYear} ZAN Tech. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">
                        Designed & Developed by ZAN Tech Team
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
