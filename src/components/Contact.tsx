import { Mail, Phone, MapPin, CheckCircle, Send, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        projectType: 'Robotics Prototyping',
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
            formDataToSend.append('project_type', formData.projectType);
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
                    projectType: 'Robotics Prototyping',
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
        <section id="contact" className="py-24 bg-zan-light dark:bg-zan-dark relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                        Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-blue to-zan-red">Touch</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Ready to bring your innovative ideas to life? Let's discuss your project and explore how we can help you achieve your goals.
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
                                <div key={index} className="group flex items-center p-6 bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zan-blue/10 text-zan-blue group-hover:bg-zan-blue group-hover:text-white transition-all duration-300">
                                        {contact.icon}
                                    </div>
                                    <div className="ml-6">
                                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{contact.label}</h4>
                                        {contact.href ? (
                                            <a href={contact.href} className="text-lg font-medium text-gray-900 dark:text-white hover:text-zan-blue dark:hover:text-zan-red transition-colors">
                                                {contact.value}
                                            </a>
                                        ) : (
                                            <p className="text-lg font-medium text-gray-900 dark:text-white">{contact.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gradient-to-br from-zan-blue to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <h3 className="text-2xl font-bold mb-6 relative z-10">Why Choose Zantech?</h3>
                            <div className="space-y-4 relative z-10">
                                {[
                                    "Expert team with years of experience",
                                    "Custom solutions tailored to your needs",
                                    "End-to-end project management",
                                    "Ongoing support and maintenance"
                                ].map((reason, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                                        <span className="text-blue-50 font-medium">{reason}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-10 border border-gray-100 dark:border-white/10 shadow-xl">
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
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Type</label>
                                <div className="relative">
                                    <select
                                        name="projectType"
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-zan-blue/50 focus:border-zan-blue outline-none transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
                                    >
                                        <option>Robotics Prototyping</option>
                                        <option>IoT Development</option>
                                        <option>R&D Solutions</option>
                                        <option>Consultation</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-zan-blue/50 focus:border-zan-blue outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 resize-none"
                                    placeholder="Tell us about your project..."
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
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
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
                </div>
            </div>
        </section>
    );
};

export default Contact;