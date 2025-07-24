import { Bot, Wifi, Lightbulb, CheckCircle } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <Bot className="w-8 h-8" />,
            title: "Robotics Prototyping",
            description: "From concept to reality - we build intelligent robotic systems that solve real-world problems.",
            features: ["Custom Robot Design", "AI Integration", "Automation Solutions"]
        },
        {
            icon: <Wifi className="w-8 h-8" />,
            title: "IoT Development",
            description: "Connect your world with smart IoT solutions that enhance efficiency and provide valuable insights.",
            features: ["Smart Sensors", "Cloud Integration", "Real-time Analytics"]
        },
        {
            icon: <Lightbulb className="w-8 h-8" />,
            title: "Custom R&D Solutions",
            description: "Innovative research and development tailored to your unique challenges and business goals.",
            features: ["Research Consulting", "Proof of Concepts", "Technology Roadmaps"]
        }
    ];
    return (
        <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Services</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        From concept to deployment, we provide comprehensive technology solutions that drive innovation and growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group">
                            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services;