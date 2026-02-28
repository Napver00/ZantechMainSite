import {
    Users,
    Lightbulb,
    TrendingUp,
    CheckCircle,
    Zap,
    Heart,
    ShieldCheck,
    ArrowRight,
    MapPin,
    GraduationCap,
    Microscope,
    Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ImpactPage = () => {
    const keyImpacts = [
        {
            icon: <Users className="w-8 h-8 text-zan-cyan" />,
            title: "Future Leaders",
            count: "5,000+",
            label: "Students Reached",
            description: "Bridging the gap between theory and practice across schools, colleges, and universities nationwide."
        },
        {
            icon: <Zap className="w-8 h-8 text-yellow-400" />,
            title: "Inclusive Tech",
            count: "30-50%",
            label: "Female Participation",
            description: "Dedicated Girls-in-Tech sessions to close the gender gap in STEM fields across Bangladesh."
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-zan-red" />,
            title: "R&D Growth",
            count: "15+",
            label: "Core Projects",
            description: "Developing local technology solutions like the BILI Robot and Autonomous Submarine."
        }
    ];

    return (
        <div className="bg-zan-dark overflow-hidden relative selection:bg-zan-cyan/30">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-zan-cyan/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-zan-red/10 rounded-full blur-[120px]"></div>
            </div>

            {/* --- Hero Section: Impact Report --- */}
            <section className="pt-32 pb-16 md:pt-48 md:pb-24 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-zan-cyan/10 border border-zan-cyan/20 text-zan-cyan text-xs font-mono uppercase tracking-widest mb-6">
                        &lt;Social Impact Report /&gt;
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-heading leading-tight">
                        Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan via-purple-500 to-zan-red text-shadow-glow">Progress</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
                        At ZAN Tech, we measure success not just in components sold, but in minds ignited.
                        We are building a foundation for technological self-reliance across Bangladesh.
                    </p>
                </div>
            </section>

            {/* --- Key Metrics Section --- */}
            <section className="py-20 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {keyImpacts.map((impact, idx) => (
                            <div key={idx} className="bg-surface-dark/40 backdrop-blur-md p-10 border border-white/5 rounded-sm hover:border-zan-cyan/30 transition-all group">
                                <div className="mb-6 transform group-hover:scale-110 transition-transform">{impact.icon}</div>
                                <div className="text-4xl font-bold text-white mb-1">{impact.count}</div>
                                <div className="text-zan-cyan text-xs font-mono uppercase tracking-widest mb-4">{impact.label}</div>
                                <p className="text-gray-400 text-sm leading-relaxed font-light">{impact.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Project Uddipon Impact --- */}
            <section className="py-24 bg-black/30 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-zan-cyan/20 blur-3xl rounded-full opacity-30"></div>
                            <div className="relative bg-surface-dark border border-white/10 p-2 rounded-sm overflow-hidden shadow-2xl">
                                <div className="aspect-video bg-zan-dark flex items-center justify-center">
                                    <MapPin className="w-16 h-16 text-zan-cyan opacity-20 animate-bounce" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">Social Outreach</h3>
                                    <p className="text-gray-400 text-sm font-light">Project Uddipon reaches from busy city schools to the most remote rural colleges, ensuring no talent is left behind.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-bold text-white font-heading">Project <span className="text-zan-cyan">Uddipon</span></h2>
                            <p className="text-lg text-gray-400 leading-relaxed font-light">
                                "Uddipon" means inspiration. Our flagship social initiative conducts free workshops across Bangladesh, especially in underserved rural areas where technology access is limited.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { icon: <CheckCircle className="w-5 h-5 text-zan-cyan" />, text: "Free high-quality technology workshops" },
                                    { icon: <CheckCircle className="w-5 h-5 text-zan-cyan" />, text: "Hands-on robotics & coding education" },
                                    { icon: <CheckCircle className="w-5 h-5 text-zan-cyan" />, text: "Setup support for school STEM clubs" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center space-x-3 text-gray-300">
                                        {item.icon}
                                        <span className="font-light">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Diversity & National Ecosystem --- */}
            <section className="py-24 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white font-heading uppercase tracking-widest">A Stronger Ecosystem</h2>
                        <div className="w-24 h-1 bg-zan-red mx-auto mt-4"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Girls in Tech */}
                        <div className="bg-gradient-to-br from-surface-dark to-black p-12 border border-purple-500/20 rounded-sm relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                            <Heart className="w-12 h-12 text-zan-red mb-8 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold text-white mb-6">Girls in Technology</h3>
                            <p className="text-gray-400 leading-relaxed font-light mb-8">
                                We run dedicated sessions to inspire young women to enter STEM fields. With a participation rate of 30-50%, we are actively closing the gender gap in Bangladesh's tech landscape.
                            </p>
                            <Link to="/contact" className="text-zan-cyan font-bold uppercase tracking-widest text-sm hover:text-white transition-colors flex items-center gap-2 group/link">
                                Support Diversity <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* National Self-Reliance */}
                        <div className="bg-gradient-to-br from-surface-dark to-black p-12 border border-zan-cyan/20 rounded-sm relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-zan-cyan/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                            <ShieldCheck className="w-12 h-12 text-zan-cyan mb-8 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold text-white mb-6">National Self-Reliance</h3>
                            <p className="text-gray-400 leading-relaxed font-light mb-8">
                                By providing affordable local kits and R&D consulting, we reduce dependency on imports and empower local innovators to build solutions "Made in Bangladesh" for the world.
                            </p>
                            <Link to="/projects" className="text-zan-cyan font-bold uppercase tracking-widest text-sm hover:text-white transition-colors flex items-center gap-2 group/link">
                                Explore R&D <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Catalyst Vision Section --- */}
            <section className="py-24 bg-black/30 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="w-20 h-20 bg-zan-cyan/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-zan-cyan/20 animate-pulse">
                        <Lightbulb className="w-10 h-10 text-zan-cyan" />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10 font-heading uppercase tracking-wide">The Catalyst for Change</h2>
                    <p className="text-xl text-gray-400 mb-12 leading-relaxed font-light italic">
                        "Our impact journey is just beginning. We envision a ZAN Tech kit in the hands of every aspiring young innovator in Bangladesh, making the first step into engineering simple and joyful."
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center space-x-2 text-gray-500 text-sm font-mono uppercase">
                            <Rocket className="w-4 h-4" />
                            <span>1 Student</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 text-sm font-mono uppercase">
                            <Microscope className="w-4 h-4" />
                            <span>1 Project</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 text-sm font-mono uppercase">
                            <GraduationCap className="w-4 h-4" />
                            <span>1 Breakthrough</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Final CTA --- */}
            <section className="py-20 relative z-10 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-surface-dark to-black border border-white/10 p-12 md:p-20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-zan-red/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-heading uppercase tracking-wide">Be Part of the Impact</h2>
                        <p className="text-lg text-gray-400 mb-12 font-light">
                            Join us in transforming Bangladesh into a technology-building nation.
                            Whether as a partner, student, or innovator, your journey starts here.
                        </p>
                        <Link to="/career">
                            <button className="bg-zan-red text-white px-12 py-5 rounded-none font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(255,0,0,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transform hover:-translate-y-1">
                                Join Our Team
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ImpactPage;
