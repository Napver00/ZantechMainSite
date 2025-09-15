import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
    // Updated data structure with learnMoreUrl
    const services = [
        {
            title: "Fostering Tech Education Across Bangladesh",
            description: "We create access to practical, hands-on technical education for students nationwide. Zantech partners with schools, colleges, and universities to deliver free workshops on robotics, programming, and AI/ML. We provide all the necessary hardware and expert instruction, using a project-based model to build foundational skills and inspire a passion for technology in the next generation of Bangladeshi innovators.",
            imageUrl: "/RoboFostering Tech Education Across Bangladeshtics Prototyping.png",
            learnMoreUrl: "/workshops"
        },
        {
            title: "Empowering Innovators with Quality Components",
            description: "We empower creators by providing a one-stop solution for all their robotics and electronics needs. Our platform offers a curated supply of essential components like Arduino Uno, ESP modules, motor drivers, and sensors, combined with reliable access and support. This enables students, hobbyists, and researchers to get the quality parts they need to seamlessly move from idea to prototype.",
            imageUrl: "/Empowering Innovators with Quality Components.png",
            learnMoreUrl: "https://store.zantechbd.com"
        },
        {
            title: "Accelerating Innovation for Businesses",
            description: "We use our deep technical expertise to help other companies solve complex engineering problems. Zantech offers custom Research and Development (R&D) services, working with businesses to design, prototype, and develop innovative products and automated systems. This provides our partners with a competitive edge, allowing them to leverage cutting-edge technology without the overhead of a large in-house R&D team.",
            imageUrl: "/Accelerating Innovation for Businesses.jpg",
            learnMoreUrl: "/projects"
        }
    ];

    return (
        <section id="services" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-24">
                    {services.map((service, index) => {
                        const isReversed = index % 2 === 1;
                        const isExternal = service.learnMoreUrl.startsWith('http');

                        const buttonContent = (
                            <>
                                <span>Learn More</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        );

                        const buttonClasses = "inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors";

                        return (
                            <div key={index} className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                                {/* Text Content */}
                                <div className={`space-y-6 ${isReversed ? 'md:order-2' : ''}`}>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                                        {service.title}
                                    </h3>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {isExternal ? (
                                        <a href={service.learnMoreUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses}>
                                            {buttonContent}
                                        </a>
                                    ) : (
                                        <Link to={service.learnMoreUrl} className={buttonClasses}>
                                            {buttonContent}
                                        </Link>
                                    )}
                                </div>

                                {/* Image Content */}
                                <div className={`${isReversed ? 'md:order-1' : ''}`}>
                                    <img
                                        src={service.imageUrl}
                                        alt={service.title}
                                        className="rounded-xl shadow-lg w-full h-auto aspect-[4/3] object-cover"
                                    />
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