import { ArrowRight, Sparkles, Cpu, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            title: "Fostering Tech Education",
            description: "We create access to practical, hands-on technical education for students nationwide. Zantech partners with schools, colleges, and universities to deliver free workshops on robotics, programming, and AI/ML.",
            imageUrl: "/RoboFostering Tech Education Across Bangladeshtics Prototyping.png",
            learnMoreUrl: "/workshops",
            color: "from-blue-500 to-cyan-400",
            icon: <Sparkles className="w-6 h-6" />
        },
        {
            title: "Empowering Innovators",
            description: "We empower creators by providing a one-stop solution for all their robotics and electronics needs. Our platform offers a curated supply of essential components like Arduino Uno, ESP modules, and sensors.",
            imageUrl: "/Empowering Innovators with Quality Components.png",
            learnMoreUrl: "https://store.zantechbd.com",
            color: "from-zan-red to-orange-500",
            icon: <Cpu className="w-6 h-6" />
        },
        {
            title: "Accelerating Innovation",
            description: "We use our deep technical expertise to help other companies solve complex engineering problems. Zantech offers custom Research and Development (R&D) services to design, prototype, and develop innovative products.",
            imageUrl: "/Accelerating Innovation for Businesses.jpg",
            learnMoreUrl: "/projects",
            color: "from-purple-500 to-indigo-500",
            icon: <Rocket className="w-6 h-6" />
        }
    ];

    return (
        <section id="services" className="py-24 bg-zan-light dark:bg-zan-dark relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-200/50 dark:from-white/5 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight font-heading">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-blue to-zan-red">Services</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        We are dedicated to bridging the gap between education and industry through innovation, training, and resource accessibility.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
                    {services.map((service, index) => {
                        const isExternal = service.learnMoreUrl.startsWith('http');

                        return (
                            <div key={index} className="group relative bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-white/10 flex flex-col h-full">
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className={`absolute inset-0 bg-gradient-to-b ${service.color} opacity-20 group-hover:opacity-10 transition-opacity z-10`}></div>
                                    <img
                                        src={service.imageUrl}
                                        alt={service.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/50 backdrop-blur-md p-2 rounded-lg shadow-sm z-20 text-gray-900 dark:text-white">
                                        {service.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-zan-blue dark:group-hover:text-zan-red transition-colors font-heading">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-8 flex-grow leading-relaxed">
                                        {service.description}
                                    </p>

                                    {isExternal ? (
                                        <a
                                            href={service.learnMoreUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center space-x-2 text-zan-blue dark:text-zan-red font-semibold group-hover:translate-x-2 transition-transform mt-auto"
                                        >
                                            <span>Learn More</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    ) : (
                                        <Link
                                            to={service.learnMoreUrl}
                                            className="inline-flex items-center space-x-2 text-zan-blue dark:text-zan-red font-semibold group-hover:translate-x-2 transition-transform mt-auto"
                                        >
                                            <span>Learn More</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default Services;