import React from 'react';
import { Target, Eye, ShoppingBag, FlaskConical, Cpu, Users, LayoutGrid, MapPin, Sparkles, HeartHandshake, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    // Data for "What We Do" section
    const whatWeDo = [
        {
            icon: <ShoppingBag className="w-10 h-10 mb-4 text-zan-blue" />,
            title: "Selling Robotics and IoT Parts",
            description: "We sell high-quality, original parts for your projects. From basics like Arduino boards and sensors to advanced components, we have everything you need to get started. We always make sure our products are reliable."
        },
        {
            icon: <FlaskConical className="w-10 h-10 mb-4 text-zan-red" />,
            title: "Research and Development (R&D) Help",
            description: "Have a great idea but need some help? Our expert team is here for you. We can help you design, build, and test your projects, from simple school projects to complex inventions for your business."
        },
        {
            icon: <Cpu className="w-10 h-10 mb-4 text-zan-red" />,
            title: "Making Our Own IoT Devices",
            description: "We are not just sellers; we are makers, too! We design and build our own IoT devices right here in Bangladesh. Our products are made to solve local problems, from smart farming to making industries more efficient."
        },
        {
            icon: <Users className="w-10 h-10 mb-4 text-zan-blue" />,
            title: "Community and Support",
            description: "We believe that learning together is best. We run a helpful Facebook community, host workshops, and provide friendly support even after you purchase a product. You are never alone on your tech journey with Zantech."
        }
    ];

    // Data for "Why Choose Zantech?" section
    const whyChooseUs = [
        { icon: <LayoutGrid className="w-8 h-8 text-white" />, text: "Everything in One Place" },
        { icon: <MapPin className="w-8 h-8 text-white" />, text: "Local Experts" },
        { icon: <Sparkles className="w-8 h-8 text-white" />, text: "We Love Innovation" },
        { icon: <HeartHandshake className="w-8 h-8 text-white" />, text: "Friendly Support" }
    ];

    return (
        <section className="pt-32 pb-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <img src="/ZAN Tech Logo.png" alt="ZAN Tech Logo" className="w-40 mx-auto mb-6" />
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Welcome to <span className="text-zan-blue">ZAN Tech</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        We are more than just a company; we are a dream to make technology easy to access for everyone in Bangladesh. We don’t just sell parts—we build a community where students, hobbyists, and businesses can learn, create, and grow together.
                    </p>
                </div>

                {/* Mission and Vision Cards with 3D effect */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 [perspective:1000px]">
                    <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:rotate-x-3">
                        <Target className="w-12 h-12 text-zan-red mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Our mission is simple: to give every student, creator, and company in Bangladesh the tools, knowledge, and support they need to build amazing things with robotics and the Internet of Things (IoT).
                        </p>
                    </div>
                    <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:rotate-x-3">
                        <Eye className="w-12 h-12 text-zan-blue mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            We dream of a Bangladesh that is a leader in technology. We want the "Made in Bangladesh" tag to be famous for high-quality, innovative smart devices. We are here to help build that future, one project at a time.
                        </p>
                    </div>
                </div>

                {/* What We Do Section */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12">What We Do</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        {whatWeDo.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 dark:border-gray-700/50">
                                {item.icon}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Zantech Section */}
                <div className="bg-zan-blue text-white p-12 rounded-2xl mb-20">
                    <h2 className="text-3xl lg:text-4xl font-bold text-center mb-10">Why Choose ZAN Tech?</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {whyChooseUs.map((item, index) => (
                            <div key={index} className="flex flex-col items-center transition-transform duration-300 hover:scale-110">
                                <div className="bg-white/10 p-4 rounded-full mb-3">
                                    {item.icon}
                                </div>
                                <p className="font-semibold">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Join Our Journey CTA */}
                <div className="text-center">
                     <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Join Our Journey</h2>
                     <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                        Whether you are a student with your first project, a hobbyist building something fun, or a business looking for a tech solution, we welcome you. Explore our products, join our online community, or contact us to talk about your next big idea.
                    </p>
                    <Link to="/#contact">
                        <button className="bg-zan-blue text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center space-x-2 mx-auto">
                            <span>Let's build a smarter future!</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;