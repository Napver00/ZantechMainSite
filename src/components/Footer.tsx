import { Bot } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 dark:bg-black text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold">ZantechBD</span>
                        </div>
                        <p className="text-gray-400">
                            Empowering the future through innovative robotics and IoT solutions.
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
                            <p>info@zantechbd.com</p>
                            <p>zantechbd@gmail.com</p>
                            <p>Our Team</p>
                            <p>Careers</p>
                            <p>Contact</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <div className="space-y-2 text-gray-400">
                            <p>LinkedIn</p>
                            <p>Facebook</p>
                            <p>Instagram</p>
                            <p>Youtube</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 ZantechBD. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;