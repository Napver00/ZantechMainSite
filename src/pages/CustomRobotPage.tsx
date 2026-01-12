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
        <div className="min-h-screen bg-zan-dark pt-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

            {/* Hero Section */}
            <section className="relative py-16 md:py-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] right-[-5%] w-96 h-96 bg-zan-cyan/10 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[10%] left-[-5%] w-96 h-96 bg-zan-red/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-4">
                        &lt;Fabrication Unit /&gt;
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading">
                        Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Custom Robot</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8 md:mb-12 font-light">
                        Turn your robotic concepts into reality. Whether it's for industrial automation, educational purposes, or a unique prototype, our team of experts is ready to build it for you.
                    </p>
                </div>
            </section>

            {/* Features/Steps */}
            <section className="max-w-7xl mx-auto px-4 pb-20 relative z-10">
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: <Bot className="w-8 h-8" />, title: "Concept Design", desc: "We help finalize your robot's design and specifications." },
                        { icon: <Cpu className="w-8 h-8" />, title: "Engineering", desc: "Advanced electronics and mechanical engineering." },
                        { icon: <Zap className="w-8 h-8" />, title: "Prototyping", desc: "Rapid prototyping and functional testing." }
                    ].map((feature, index) => (
                        <div key={index} className="bg-surface-dark backdrop-blur-md p-8 rounded-sm border border-white/5 shadow-lg hover:border-zan-cyan/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all group">
                            <div className="w-14 h-14 bg-zan-cyan/10 rounded-sm flex items-center justify-center text-zan-cyan mb-6 border border-zan-cyan/20 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-heading tracking-wide">{feature.title}</h3>
                            <p className="text-gray-400 font-light text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Order Form */}
                <div className="max-w-3xl mx-auto bg-surface-dark backdrop-blur-md rounded-sm p-8 lg:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
                    {/* Tech Decors */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-zan-cyan/5 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-zan-cyan to-transparent"></div>

                    <div className="flex items-center space-x-3 mb-8">
                        <Settings className="w-6 h-6 text-zan-cyan animate-spin-slow" />
                        <h2 className="text-2xl font-bold text-white font-heading tracking-wide">Custom Order Request</h2>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zan-cyan uppercase tracking-widest">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-sm focus:border-zan-cyan focus:ring-1 focus:ring-zan-cyan outline-none transition-all text-white placeholder-gray-600 font-mono text-sm"
                                    placeholder="John"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zan-cyan uppercase tracking-widest">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-sm focus:border-zan-cyan focus:ring-1 focus:ring-zan-cyan outline-none transition-all text-white placeholder-gray-600 font-mono text-sm"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zan-cyan uppercase tracking-widest">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-sm focus:border-zan-cyan focus:ring-1 focus:ring-zan-cyan outline-none transition-all text-white placeholder-gray-600 font-mono text-sm"
                                placeholder="john@example.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zan-cyan uppercase tracking-widest">Robot Type / Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-sm focus:border-zan-cyan focus:ring-1 focus:ring-zan-cyan outline-none transition-all text-white placeholder-gray-600 font-mono text-sm"
                                placeholder="e.g., Autonomous Delivery Robot"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zan-cyan uppercase tracking-widest">Project Details</label>
                            <textarea
                                name="message"
                                rows={6}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-sm focus:border-zan-cyan focus:ring-1 focus:ring-zan-cyan outline-none transition-all text-white placeholder-gray-600 font-mono text-sm resize-none"
                                placeholder="Describe the specifications and requirements for your custom robot..."
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-zan-cyan text-black py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Processing Request...</span>
                                </>
                            ) : (
                                <>
                                    <span>Submit Order Request</span>
                                    <Send className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        {statusMessage && (
                            <div className={`p-4 rounded-sm text-center text-xs font-mono uppercase tracking-wide border ${statusMessage.includes('success') ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-red-500/10 border-red-500 text-red-400'}`}>
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
