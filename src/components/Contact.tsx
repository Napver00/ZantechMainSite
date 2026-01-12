import { Mail, Phone, MapPin, CheckCircle, Send, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [contactInfo, setContactInfo] = useState({ email: '', phone: '', location: '' });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/company`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setContactInfo({
                        email: data.data.email,
                        phone: data.data.phone,
                        location: data.data.location
                    });
                }
            })
            .catch(error => console.error('Error fetching contact data:', error));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            formDataToSend.append('project_type', formData.subject); // Mapping subject to project_type for backend compatibility
            formDataToSend.append('message', formData.message);

            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                setStatusMessage('Message sent successfully! We will get back to you soon.');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                setStatusMessage('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatusMessage('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-zan-dark relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-zan-cyan/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-zan-red/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-2">
                        &lt;Communication Channel /&gt;
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-heading">
                        Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Touch</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Ready to bring your innovative ideas to life? Let's discuss your project.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Contact Info & Value Prop */}
                    <div className="space-y-8">
                        <div className="grid gap-6">
                            {[
                                { icon: <Mail className="w-6 h-6" />, label: "Email Us", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
                                { icon: <Phone className="w-6 h-6" />, label: "Call Us", value: contactInfo.phone, href: `tel:${contactInfo.phone}` },
                                { icon: <MapPin className="w-6 h-6" />, label: "Visit Us", value: contactInfo.location, href: null }
                            ].map((contact, index) => (
                                <div key={index} className="group flex items-center p-6 bg-surface-dark backdrop-blur-sm rounded-sm border border-white/5 hover:border-zan-cyan/50 transition-all duration-300 relative overflow-hidden">
                                    <div className="absolute left-0 top-0 h-full w-[2px] bg-zan-cyan/20 group-hover:bg-zan-cyan transition-colors"></div>
                                    <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-zan-cyan/5 text-zan-cyan border border-zan-cyan/20 group-hover:bg-zan-cyan group-hover:text-black transition-all duration-300">
                                        {contact.icon}
                                    </div>
                                    <div className="ml-6">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{contact.label}</h4>
                                        {contact.href ? (
                                            <a href={contact.href} className="text-lg font-medium text-white hover:text-zan-cyan transition-colors font-mono">
                                                {contact.value}
                                            </a>
                                        ) : (
                                            <p className="text-lg font-medium text-white font-mono">{contact.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-surface-dark border border-zan-cyan/20 rounded-sm p-8 text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-zan-cyan/5"></div>
                            <h3 className="text-2xl font-bold mb-6 relative z-10 font-heading text-zan-cyan">Why Choose Zantech?</h3>
                            <div className="space-y-4 relative z-10">
                                {[
                                    "Expert team with technical depth",
                                    "Custom robotics & AI solutions",
                                    "End-to-end development lifecycle",
                                    "Dedicated support & maintenance"
                                ].map((reason, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-zan-neon shrink-0" />
                                        <span className="text-gray-300 text-sm tracking-wide">{reason}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-surface-dark backdrop-blur-md rounded-sm p-8 lg:p-10 border border-white/10 shadow-2xl relative">
                        {/* Corner Decors */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zan-cyan"></div>
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-zan-cyan"></div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-zan-cyan"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zan-cyan"></div>

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
                                <label className="text-xs font-bold text-zan-cyan uppercase tracking-widest">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-sm focus:border-zan-cyan focus:ring-1 focus:ring-zan-cyan outline-none transition-all text-white placeholder-gray-600 font-mono text-sm"
                                    placeholder="Project Inquiry"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zan-cyan uppercase tracking-widest">Message</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-sm focus:border-zan-cyan focus:ring-1 focus:ring-zan-cyan outline-none transition-all text-white placeholder-gray-600 font-mono text-sm resize-none"
                                    placeholder="Tell us about your project..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-zan-cyan text-black py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Transmitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                </div>
            </div>
        </section>
    );
};

export default Contact;