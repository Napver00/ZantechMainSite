import React from 'react';
import {
    CheckCircle,
    Sparkles,
    Flag,
    Users,
    ArrowRight,
    Cpu,
    Code,
    Brain,
    Globe,
    Zap,
    GraduationCap,
    ShoppingCart,
    Monitor,
    Microscope,
    Satellite,
    Anchor
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    const stats = [
        { label: "Students Reached", value: "5,000+" },
        { label: "Participants Per Workshop", value: "150+" },
        { label: "Female Participation", value: "Up to 50%" }
    ];

    const teachingAreas = [
        {
            icon: <Cpu className="w-8 h-8 text-zan-cyan" />,
            title: "Robotics",
            description: "Design and build real robots — from simple line-following machines to obstacle-avoiding systems using Arduino."
        },
        {
            icon: <Code className="w-8 h-8 text-purple-400" />,
            title: "Programming",
            description: "Beginner-friendly coding for kids and students using visual examples and step-by-step guidance."
        },
        {
            icon: <Brain className="w-8 h-8 text-zan-red" />,
            title: "AI & ML",
            description: "Real-world AI concepts and experiments with algorithms to solve actual problems."
        },
        {
            icon: <Globe className="w-8 h-8 text-blue-400" />,
            title: "IoT",
            description: "Build smart devices and connected sensors, bridging the physical and digital worlds."
        },
        {
            icon: <GraduationCap className="w-8 h-8 text-green-400" />,
            title: "STEM Education",
            description: "Hands-on projects and teacher training to set up effective STEM clubs in schools."
        },
        {
            icon: <Zap className="w-8 h-8 text-yellow-400" />,
            title: "Girls in Tech",
            description: "Dedicated sessions to inspire young women to enter STEM fields with 30-50% participation."
        }
    ];

    const rdProjects = [
        { name: "Portable Attendance System", icon: <Monitor className="w-5 h-5" /> },
        { name: "IoT Salinity Detection", icon: <Globe className="w-5 h-5" /> },
        { name: "BILI Robot", icon: <Cpu className="w-5 h-5" /> },
        { name: "Autonomous Submarine", icon: <Anchor className="w-5 h-5" /> },
        { name: "CanSat Nano-Satellite", icon: <Satellite className="w-5 h-5" /> }
    ];

    const products = [
        "Uddipon Kits", "RC Kits", "LFR Kits", "Soccer Kits", "CanSat Kits", "IoT Kits", "AI/ML Kits", "Components (Arduino, ESP32, etc.)"
    ];

    const futureGoals = [
        { icon: <Microscope className="w-6 h-6" />, text: "Build an advanced Robotics R&D center for local innovation" },
        { icon: <Brain className="w-6 h-6" />, text: "Develop AI and ML solutions tailored to Bangladesh's needs" },
        { icon: <Cpu className="w-6 h-6" />, text: "Bring automation technology to agriculture, industry, and public services" },
        { icon: <Globe className="w-6 h-6" />, text: "Expand Project Uddipon to reach every district" },
        { icon: <Flag className="w-6 h-6" />, text: "Represent Bangladesh in international tech competitions" },
        { icon: <Users className="w-6 h-6" />, text: "Create a nationwide pipeline of skilled STEM graduates" }
    ];

    const institutions = [
        "Feni Govt. College", "Sharishadi High School", "Sonagazi Girls' Pilot High School",
        "St. Joseph International", "Sreemangal Govt. College", "Sunshine High School",
        "Adamjee Cantonment Public School", "Scholastica", "IUBAT", "IEEE IUB"
    ];

    return (
        <div className="bg-zan-dark overflow-hidden relative selection:bg-zan-cyan/30">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] left-[-10%] w-[500px] h-[500px] bg-zan-cyan/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-zan-red/10 rounded-full blur-[120px]"></div>
            </div>

            {/* --- Hero Section: Who We Are --- */}
            <section className="pt-32 pb-16 md:pt-48 md:pb-24 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-3 rounded-full bg-zan-cyan/10 border border-zan-cyan/20 text-zan-cyan text-xs font-mono uppercase tracking-widest mb-6">
                            &lt;Who We Are /&gt;
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-heading leading-tight">
                            Pioneering <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan via-purple-500 to-zan-red">Future Tech</span> in Bangladesh
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
                            ZAN Tech is a Dhaka-based technology powerhouse specializing in Robotics, IoT, AI, and Machine Learning.
                            From bustling city schools to remote rural colleges, we're on a mission to democratize modern technology skills.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-surface-dark/50 backdrop-blur-md p-8 rounded-sm border border-white/5 text-center group hover:border-zan-cyan/30 transition-all">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-zan-cyan transition-colors">{stat.value}</div>
                                <div className="text-gray-500 font-mono text-sm uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Philosophy & Mission --- */}
            <section id="mission-vision" className="py-20 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white font-heading uppercase tracking-wide">Our Mission</h2>
                            <p className="text-lg text-gray-400 leading-relaxed font-light">
                                Our goal is simple: take robotics, programming, and AI education to <span className="text-white font-medium">every corner of Bangladesh</span> and leave no talented learner behind. We believe every student deserves to learn modern technology skills.
                            </p>
                            <div className="space-y-4">
                                {['Education (Teaching & Training)', 'Products (Affordable Kits)', 'R&D (Local Solutions)'].map((item, idx) => (
                                    <div key={idx} className="flex items-center space-x-3 text-gray-300">
                                        <CheckCircle className="w-5 h-5 text-zan-cyan" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-surface-dark border border-white/5 p-8 rounded-sm relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-zan-cyan to-zan-red opacity-10 group-hover:opacity-20 blur-lg transition-opacity"></div>
                            <div className="relative">
                                <h3 className="text-2xl font-bold text-white mb-4">The Vision</h3>
                                <p className="text-gray-400 font-light leading-relaxed">
                                    We want to ignite technological curiosity in every student, especially those in underserved and rural areas.
                                    Preparing the next generation for the Fourth Industrial Revolution (4IR) is our core drive.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- What We Teach --- */}
            <section className="py-20 bg-black/30 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white font-heading uppercase tracking-widest">What We Teach</h2>
                        <div className="w-24 h-1 bg-zan-cyan mx-auto mt-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teachingAreas.map((area, idx) => (
                            <div key={idx} className="bg-surface-dark p-8 border border-white/5 hover:border-white/20 transition-all group">
                                <div className="mb-6 group-hover:scale-110 transition-transform">{area.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-3">{area.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed font-light">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Project Uddipon --- */}
            <section className="py-24 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-surface-dark to-black p-8 md:p-16 border border-zan-cyan/20 rounded-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-zan-cyan/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>

                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-heading">Project <span className="text-zan-cyan">Uddipon</span> (উদ্দীপন)</h2>
                                    <p className="text-xl text-gray-400 font-light">Free Workshops Nationwide — Our Flagship Social Initiative</p>
                                </div>
                                <div className="flex flex-col items-start md:items-end">
                                    <span className="text-4xl font-bold text-white">5,000+</span>
                                    <span className="text-zan-cyan text-sm uppercase tracking-widest">Students Inspired</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 mt-12">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/10 pb-2">What Happens</h3>
                                    <ul className="space-y-4">
                                        {[
                                            'Build line-following & obstacle robots',
                                            'Beginner programming & AI basics',
                                            'IoT bootcamps with smart sensors',
                                            'Dedicated Girls-in-Tech sessions',
                                            'STEM club setup support',
                                            'Teacher training programs'
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start space-x-3 text-gray-400">
                                                <Sparkles className="w-5 h-5 text-zan-cyan flex-shrink-0 mt-0.5" />
                                                <span className="font-light">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-black/50 p-8 border border-white/5 rounded-sm">
                                    <h3 className="text-xl font-bold text-white mb-6">Reach So Far</h3>
                                    <div className="space-y-2 text-gray-400 italic font-light overflow-y-auto max-h-48 scrollbar-thin scrollbar-thumb-zan-cyan">
                                        {institutions.join(', ')} and many more.
                                    </div>
                                    <div className="mt-8 flex justify-between items-center text-xs font-mono uppercase text-zan-cyan">
                                        <span>✔ Schools</span>
                                        <span>✔ Colleges</span>
                                        <span>✔ Universities</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- R&D Section --- */}
            <section className="py-20 bg-black/30 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">R&D and Consulting</h2>
                            <p className="text-gray-400 text-lg leading-relaxed font-light mb-8">
                                ZAN Tech is not just an education company — we build real technology.
                                Our R&D center supports students and innovators in prototyping ideas and turning concepts into working solutions.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {rdProjects.map((project, idx) => (
                                    <div key={idx} className="flex items-center space-x-3 p-3 bg-surface-dark border border-white/5 rounded-sm group hover:border-zan-cyan/30 transition-all">
                                        <div className="text-zan-cyan">{project.icon}</div>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{project.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-tr from-zan-cyan/20 to-zan-red/20 rounded-full blur-3xl absolute inset-0"></div>
                            <div className="relative bg-surface-dark border border-white/10 p-8 rounded-sm overflow-hidden min-h-[400px] flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <ShoppingCart className="w-6 h-6 text-zan-red" />
                                    Online Store
                                </h3>
                                <p className="text-gray-400 mb-8 font-light">
                                    We make quality robotics components and kits accessible. Shop everything from starter kits to advanced sensors.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {products.map((p, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-gray-400 rounded-full">
                                            {p}
                                        </span>
                                    ))}
                                </div>
                                <a href="https://store.zantechbd.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-zan-cyan font-bold uppercase tracking-widest text-sm hover:text-white transition-colors group">
                                    <span>Visit Store</span>
                                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Future Vision --- */}
            <section className="py-24 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white font-heading uppercase tracking-widest mb-6">Our Future Vision</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed italic">
                            "We want to make Bangladesh a country that builds and exports technology — not just uses it."
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {futureGoals.map((goal, idx) => (
                            <div key={idx} className="p-6 bg-surface-dark border border-white/5 hover:bg-zan-cyan/5 transition-all group">
                                <div className="mb-4 text-zan-cyan group-hover:scale-110 transition-transform">{goal.icon}</div>
                                <p className="text-gray-300 font-light group-hover:text-white transition-colors">{goal.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Final CTA --- */}
            <section className="py-20 relative z-10 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-zan-dark to-black border border-white/10 p-12 md:p-20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-heading uppercase tracking-wide">Ready to shape the future?</h2>
                        <p className="text-lg text-gray-400 mb-12 font-light">
                            Whether you are a student, hobbyist, or business, ZAN Tech is here to nurture your talent into innovation.
                        </p>
                        <Link to="/contact">
                            <button className="bg-zan-cyan text-black px-12 py-5 rounded-none font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:shadow-[0_0_50px_rgba(0,240,255,0.4)] transform hover:-translate-y-1">
                                Let's Build Together
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
