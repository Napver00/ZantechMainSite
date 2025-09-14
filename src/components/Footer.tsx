import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { ArrowRight, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

// Custom component for the TikTok icon
const TikTokIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.88-1.59-1.94-2.3-4.48-2.06-7.08.25-2.61 1.88-4.83 4.09-6.08 2.21-1.25 4.88-1.34 7.21-.24.59.27 1.15.59 1.71.93v-4.17c-.94-.13-1.87-.29-2.8-.44-1.31-.21-2.62-.43-3.93-.66-.08-1.53-.63-3.09-1.75-4.17-1.12-1.1-2.7-1.62-4.24-1.78V.02h4.17z" />
    </svg>
);

// Helper to render the correct social media icon
const SocialIcon = ({ platform }) => {
    switch (platform?.toLowerCase()) {
        case 'facebook':
            return <Facebook className="w-5 h-5" />;
        case 'instagram':
            return <Instagram className="w-5 h-5" />;
        case 'twitter':
            return <Twitter className="w-5 h-5" />;
        case 'linkedin':
            return <Linkedin className="w-5 h-5" />;
        case 'tiktok':
            return <TikTokIcon className="w-5 h-5" />;
        default:
            return null;
    }
};

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [footerData, setFooterData] = useState({
        social_links: [],
        email: '',
        phone: '',
        location: ''
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/company`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setFooterData({
                        social_links: data.data.social_links,
                        email: data.data.email,
                        phone: data.data.phone,
                        location: data.data.location
                    });
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
    ];

    const legalLinks = [
        { text: "Privacy Policy", href: "#" },
        { text: "Terms & Services", href: "#" },
    ];

    return (
        // Updated Footer Styles: Dark background and light text
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
                        {/* <p className="pt-2">Visiting Hours</p>
                        <p>Sun-Thu, (Appointment Basis)</p> */}
                    </div>

                    {/* Business Information Column (Commented out as per your code) */}
                    {/* <div className="space-y-4">
                        <h4 className="font-bold text-white mb-4">Business Information</h4>
                        <p>Trade License Number</p>
                        <p>TRAD/DNCC/123456/2024</p>
                        <p className="pt-2">BIN Number</p>
                        <p>001234567-0101</p>
                    </div> */}

                    {/* Legal Column */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-white mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {legalLinks.map(link => (
                                <li key={link.text}>
                                    <a href={link.href} className="flex items-center hover:text-zan-red">
                                        <span>{link.text}</span>
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </a>
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
                                    <Link to={link.href} className="flex items-center hover:text-zan-red">
                                        <span>{link.text}</span>
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">&copy; {currentYear} ZAN Tech. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        {footerData.social_links.map((social) => (
                            <a
                                key={social.id}
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