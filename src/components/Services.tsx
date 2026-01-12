import { ArrowRight, Sparkles, Cpu, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            title: "Fostering Tech Education",
            description: "We create access to practical, hands-on technical education for students nationwide. Zantech partners with schools, colleges, and universities to deliver free workshops on robotics, programming, and AI/ML.",
            imageUrl: "/IMG-20251102-WA0087.jpg",
            learnMoreUrl: "/workshops",
            color: "from-blue-500 to-cyan-400",
            icon: <Sparkles className="w-6 h-6" />
        },
        {
            title: "Empowering Women",
            description: "We support and uplift women by giving them easy access to robotics and electronics tools. From Arduino Uno to ESP modules and sensors everything in one place to help women learn, build, and lead in tech.",
            imageUrl: "/20251101_123434.jpg",
            learnMoreUrl: "https://store.zantechbd.com",
            color: "from-zan-red to-orange-500",
            icon: <Cpu className="w-6 h-6" />
        },
        {
            title: "Accelerating Innovation",
            description: "We use our deep technical expertise to help other companies solve complex engineering problems. ZAN Tech offers custom Research and Development (R&D) services to design, prototype, and develop innovative products.",
            imageUrl: "/IMG_7483.HEI.jpg",
            learnMoreUrl: "/projects",
            color: "from-purple-500 to-indigo-500",
            icon: <Rocket className="w-6 h-6" />
        }
    ];

    return (
        <section id="services" className="py-16 md:py-24 bg-zan-dark relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-zan-cyan/5 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-zan-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-2">
                        &lt;Capabilities /&gt;
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight font-heading">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Services</span>
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed border-b border-white/5 pb-8">
                        We are dedicated to bridging the gap between education and industry through innovation, training, and resource accessibility.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
                    {services.map((service, index) => {
                        const isExternal = service.learnMoreUrl.startsWith('http');

                        return (
                            <div key={index} className="group relative bg-surface-dark backdrop-blur-sm rounded-sm overflow-hidden border border-white/5 hover:border-zan-cyan/50 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full shadow-[0_0_0_1px_rgba(0,0,0,0.3)]">
                                {/* Tech Corner Accents */}
                                <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <div className="w-2 h-2 border-t border-r border-zan-cyan"></div>
                                </div>
                                <div className="absolute bottom-0 left-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <div className="w-2 h-2 border-b border-l border-zan-cyan"></div>
                                </div>

                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden clip-path-slant-bottom">
                                    <div className={`absolute inset-0 bg-gradient-to-b ${service.color} opacity-20 group-hover:opacity-10 transition-opacity z-10`}></div>
                                    <img
                                        src={service.imageUrl}
                                        alt={service.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute top-4 left-4 bg-zan-dark/80 backdrop-blur-md p-2 border border-zan-cyan/30 rounded-sm shadow-sm z-20 text-zan-cyan group-hover:text-white transition-colors">
                                        {service.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow relative bg-surface-dark">
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-zan-cyan transition-colors font-heading uppercase tracking-wide">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 mb-8 flex-grow leading-relaxed text-sm">
                                        {service.description}
                                    </p>

                                    {isExternal ? (
                                        <a
                                            href={service.learnMoreUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center space-x-2 text-zan-cyan font-bold uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform mt-auto"
                                        >
                                            <span>Learn More</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    ) : (
                                        <Link
                                            to={service.learnMoreUrl}
                                            className="inline-flex items-center space-x-2 text-zan-cyan font-bold uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform mt-auto"
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