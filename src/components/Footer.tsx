import { useState, useEffect } from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [footerData, setFooterData] = useState({ 
        footer_text: '', 
        social_links: [],
        email: '',
        phone: '',
        location: ''
    });

    useEffect(() => {
        fetch('https://zantechbackend.desklago.com/api/company')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setFooterData({
                        footer_text: data.data.footer_text,
                        social_links: data.data.social_links,
                        email: data.data.email,
                        phone: data.data.phone,
                        location: data.data.location
                    });
                }
            })
            .catch(error => console.error('Error fetching footer data:', error));
    }, []);

    return (
        <footer className="bg-gray-900 dark:bg-black text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <img src="/ZAN Tech Logo.png" alt="ZAN Tech Logo" className="w-32" />
                        <p className="text-gray-400">
                            {footerData.footer_text}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Services</h4>
                        <div className="space-y-2 text-gray-400">
                            <p>Robotics Prototyping</p>
                            <p>IoT Development</p>
                            <p>R&D Solutions</p>
                            <p>Consultation</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <div className="space-y-2 text-gray-400">
                            <p>About Us</p>
                            <p>{footerData.email}</p>
                            <p>{footerData.phone}</p>
                            <p>{footerData.location}</p>
                            <p>Our Team</p>
                            <p>Careers</p>
                            <p>Contact</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <div className="space-y-2 text-gray-400">
                            {footerData.social_links.map(social => (
                                <a 
                                    key={social.id} 
                                    href={social.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block hover:text-white transition-colors duration-200"
                                >
                                    <p>{social.platform}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; {currentYear} ZAN Tech. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;