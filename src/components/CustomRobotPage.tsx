import { Send, Loader2, Bot, Cpu, Zap, Settings } from 'lucide-react';
import { useState } from 'react';
import { API_BASE_URL } from '../config';

const CustomRobotPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage('');
        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('f_name', formData.firstName);
            formDataToSend.append('l_name', formData.lastName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('project_type', formData.subject); // Mapping subject to project_type for backend API
            formDataToSend.append('message', formData.message);

            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                setStatusMessage('Order request sent successfully! We will contact you shortly.');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                setStatusMessage('Failed to send request. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatusMessage('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-zan-light dark:bg-zan-dark pt-20">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] right-[-5%] w-96 h-96 bg-zan-blue/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[10%] left-[-5%] w-96 h-96 bg-zan-red/10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                        Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-blue to-zan-red">Custom Robot</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                        Turn your robotic concepts into reality. Whether it's for industrial automation, educational purposes, or a unique prototype, our team of experts is ready to build it for you.
                    </p>
                </div>
            </section>

            {/* Features/Steps */}
            <section className="max-w-7xl mx-auto px-4 pb-20">
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: <Bot className="w-8 h-8" />, title: "Concept Design", desc: "We help finalize your robot's design and specifications." },
                        { icon: <Cpu className="w-8 h-8" />, title: "Engineering", desc: "Advanced electronics and mechanical engineering." },
                        { icon: <Zap className="w-8 h-8" />, title: "Prototyping", desc: "Rapid prototyping and functional testing." }
                    ].map((feature, index) => (
                        <div key={index} className="bg-white dark:bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-lg hover:shadow-xl transition-all">
                            <div className="w-14 h-14 bg-zan-blue/10 rounded-xl flex items-center justify-center text-zan-blue mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Order Form */}
                <div className="max-w-3xl mx-auto bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-gray-100 dark:border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-zan-blue/20 to-transparent rounded-bl-full pointer-events-none"></div>

                    <div className="flex items-center space-x-3 mb-8">
                        <Settings className="w-6 h-6 text-zan-red animate-spin-slow" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Custom Order Request</h2>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-zan-blue/50 focus:border-zan-blue outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                                    placeholder="John"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-zan-blue/50 focus:border-zan-blue outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-zan-blue/50 focus:border-zan-blue outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                                placeholder="john@example.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Robot Type / Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-zan-blue/50 focus:border-zan-blue outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                                placeholder="e.g., Autonomous Delivery Robot"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Details</label>
                            <textarea
                                name="message"
                                rows={6}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-zan-blue/50 focus:border-zan-blue outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 resize-none"
                                placeholder="Describe the specifications and requirements for your custom robot..."
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-zan-blue to-blue-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Sending Request...</span>
                                </>
                            ) : (
                                <>
                                    <span>Submit Order Request</span>
                                    <Send className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        {statusMessage && (
                            <div className={`p-4 rounded-xl text-center text-sm font-medium ${statusMessage.includes('success') ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'}`}>
                                {statusMessage}
                            </div>
                        )}
                    </form>
                </div>
            </section>
        </div>
    );
};

export default CustomRobotPage;
