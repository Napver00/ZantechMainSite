import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { ArrowRight } from 'lucide-react';
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp, FaTiktok } from 'react-icons/fa6';

// Helper to render the correct social media icon
const SocialIcon = ({ platform }) => {
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
        default:
            return null;
    }
};

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [footerData, setFooterData] = useState({
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
                            ...data.data.social_links,
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
        // NEW: Project Uddipon in footer (external)
        { text: "Project Uddipon", href: "https://projectuddipon.zantechbd.com/" },
    ];

    const legalLinks = [
        { text: "Privacy Policy", href: "/privacy-policy" },
        { text: "Terms & Services", href: "/terms-and-conditions" },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
                    {/* Contact Column */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-white mb-4">Contact</h4>
                        <p>Email</p>
                        <a href={`mailto:${footerData.email}`} className="hover:text-zan-red">{footerData.email}</a>
                        <p className="pt-2">Zantech Helpline</p>
                        <a href={`tel:${footerData.phone}`} className="hover:text-zan-red">{footerData.phone}</a>
                        <p className="pt-2">Calling Hours</p>
                        <p>Sat-Thu, 10AM - 06PM</p>
                    </div>

                    {/* Location Column */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-white mb-4">Location</h4>
                        <p>Bangladesh</p>
                        <p>{footerData.location}</p>
                    </div>

                    {/* Legal Column */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-white mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {legalLinks.map(link => (
                                <li key={link.text}>
                                    <Link to={link.href} className="flex items-center hover:text-zan-red">
                                        <span>{link.text}</span>
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-white mb-4">Company</h4>
                        <ul className="space-y-3">
                            {companyLinks.map(link => (
                                <li key={link.text}>
                                    {link.href.startsWith('http')
                                        ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center hover:text-zan-red"
                                            >
                                                <span>{link.text}</span>
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </a>
                                        ) : (
                                            <Link to={link.href} className="flex items-center hover:text-zan-red">
                                                <span>{link.text}</span>
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Link>
                                        )
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">&copy; {currentYear} ZAN Tech. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        {footerData.social_links.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <SocialIcon platform={social.platform} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
