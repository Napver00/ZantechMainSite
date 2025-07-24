import React, { useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';

const CampusAmbassadors = () => {
    const [showAmbassadorForm, setShowAmbassadorForm] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        campusName: '',
        experience: '',
        image: null as File | null
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, image: file }));
    };

    const handleSubmitApplication = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Application submitted:', formData);
        setShowAmbassadorForm(false); // Hide form after submission
        // Reset form
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            campusName: '',
            experience: '',
            image: null
        });
    };

    const ambassadors = [
        {
            id: 1,
            name: "Sarah Ahmed",
            campus: "University of Dhaka",
            image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300",
            bio: "Computer Science student passionate about robotics and AI. Leading tech innovation initiatives on campus.",
            achievements: ["Organized 5+ tech workshops", "50+ students mentored", "3 hackathon wins"]
        },
        {
            id: 2,
            name: "Rafiq Hassan",
            campus: "BUET",
            image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
            bio: "Electrical Engineering student with expertise in IoT and embedded systems. Active in robotics competitions.",
            achievements: ["Built 10+ IoT projects", "Regional robotics champion", "Tech community leader"]
        },
        {
            id: 3,
            name: "Fatima Khan",
            campus: "North South University",
            image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300",
            bio: "Mechatronics student focused on automation and smart manufacturing. Research enthusiast.",
            achievements: ["Published 2 research papers", "Innovation award winner", "Startup co-founder"]
        }
    ];

    return (
        <>
            <section id="ambassadors" className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Campus <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Ambassadors</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                            Meet our passionate student ambassadors who are driving innovation and technology adoption in universities across Bangladesh.
                        </p>
                        <button
                            onClick={() => setShowAmbassadorForm(true)}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
                        >
                            <span>Apply as Campus Ambassador</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ambassadors.map((ambassador) => (
                            <div key={ambassador.id} className="group">
                                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center">
                                    <div className="relative mb-6">
                                        <img
                                            src={ambassador.image}
                                            alt={ambassador.name}
                                            className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-cyan-500 group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                                            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                Ambassador
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {ambassador.name}
                                    </h3>

                                    <p className="text-cyan-600 dark:text-cyan-400 font-semibold mb-4">
                                        {ambassador.campus}
                                    </p>

                                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                        {ambassador.bio}
                                    </p>

                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Key Achievements:</h4>
                                        {ambassador.achievements.map((achievement, idx) => (
                                            <div key={idx} className="flex items-center justify-center space-x-2">
                                                <Star className="w-4 h-4 text-yellow-500" />
                                                <span className="text-sm text-gray-600 dark:text-gray-300">{achievement}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Campus Ambassador Application Modal */}
            {showAmbassadorForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Apply as Campus Ambassador
                            </h3>
                            <button
                                onClick={() => setShowAmbassadorForm(false)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmitApplication} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                                        placeholder="+880 1XXX-XXXXXX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Campus Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="campusName"
                                        value={formData.campusName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                                        placeholder="University/College name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Profile Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    What is your experience? *
                                </label>
                                <textarea
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Tell us about your experience with technology, leadership, projects, achievements, etc."
                                ></textarea>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAmbassadorForm(false)}
                                    className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CampusAmbassadors;