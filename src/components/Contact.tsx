import { Mail, Phone, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('Sending...');

        try {
            // Create FormData object with the API's expected field names
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
                setStatusMessage('Message sent successfully!');
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
        }
    };

    return (
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Get In <span className="text-zan-blue">Touch</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Ready to bring your innovative ideas to life? Let's discuss your project and explore how we can help you achieve your goals.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            {[
                                { icon: <Mail className="w-6 h-6" />, label: "Email", value: contactInfo.email },
                                { icon: <Phone className="w-6 h-6" />, label: "Phone", value: contactInfo.phone },
                                { icon: <MapPin className="w-6 h-6" />, label: "Location", value: contactInfo.location }
                            ].map((contact, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="bg-zan-blue text-white rounded-lg p-3">
                                        {contact.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{contact.label}</h4>
                                        <p className="text-gray-600 dark:text-gray-300">{contact.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Why Choose Zantech?</h3>
                            <div className="space-y-3">
                                {[
                                    "Expert team with years of experience",
                                    "Custom solutions tailored to your needs",
                                    "End-to-end project management",
                                    "Ongoing support and maintenance"
                                ].map((reason, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-700 dark:text-gray-300">{reason}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-zan-blue focus:border-transparent transition-all duration-300"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-zan-blue focus:border-transparent transition-all duration-300"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-zan-blue focus:border-transparent transition-all duration-300"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Project Type
                                </label>
                                <select
                                    name="projectType"
                                    value={formData.projectType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-zan-blue focus:border-transparent transition-all duration-300"
                                >
                                    <option>Robotics Prototyping</option>
                                    <option>IoT Development</option>
                                    <option>R&D Solutions</option>
                                    <option>Consultation</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-zan-blue focus:border-transparent transition-all duration-300"
                                    placeholder="Tell us about your project..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-zan-blue text-white py-4 rounded-xl font-semibold hover:bg-blue-800 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                            >
                                <span>Send Message</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            {statusMessage && <p className="text-center text-gray-600 dark:text-gray-300 mt-4">{statusMessage}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;