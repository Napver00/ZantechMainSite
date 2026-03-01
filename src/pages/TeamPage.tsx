import {
    Mail,
    Linkedin,
    Globe,
    Microscope,
    Rocket,
    GraduationCap,
    ScrollText,
    Briefcase
} from 'lucide-react';

const TeamPage = () => {
    const founders = [
        {
            name: "Nakibul Islam",
            role: "Co-Founder & Chief Executive Officer (CEO)",
            image: "/assets/team/nakibul_islam.png",
            bio: "Nakibul Islam leads strategic technological development and oversees software operations. He is a Software Engineer with over 7 years of experience spanning academia and industry.",
            highlights: [
                "Former Senior Software Engineer at Jayga",
                "3 years as Software Instructor at Instructory",
                "Research Associate at Independent University Bangladesh (IUB)",
                "Authored 4 peer-reviewed research publications",
                "Expert in software architecture and product strategy"
            ],
            socials: {
                linkedin: "#",
                email: "nakibul@zantech.com.bd",
                website: "#"
            },
            accent: "zan-cyan"
        },
        {
            name: "Hana Sultan Chowdhury",
            role: "Co-Founder & Chief Operating Officer (COO)",
            image: "/assets/team/hana_sultan_chowdhury.jpg",
            bio: "Hana Sultan Chowdhury leads company operations and drives strategic growth. He brings over 6 years of experience in Robotics, AI, and Automation, specializing in operational Excellence.",
            highlights: [
                "NASA CANSAT USA 2024 Program Participant",
                "AUV development experience in Singapore (2024–2025)",
                "3 years as Research Associate at FABLAB IUB",
                "Authored 5+ international research publications (Q2 indexed)",
                "Specialist in embedded systems and robotic navigation"
            ],
            socials: {
                linkedin: "#",
                email: "hana@zantech.com.bd",
                website: "#"
            },
            accent: "zan-red"
        },
        {
            name: "Ali Daud Hossain",
            role: "Co-Founder & Chief Technology Officer (CTO)",
            image: "/assets/team/ali_daud_hossain.jpg",
            bio: "Ali Daud Hossain leads ZAN Tech's AI-driven innovation initiatives, specializing in AI/ML, Large Language Models (LLMs), and intelligent software systems. With an interdisciplinary background spanning advanced software development, robotics, and embodied AI research, he positions the company at the forefront of next-generation AI and automation.",
            highlights: [
                "AI-integrated software platforms",
                "IoT-enabled intelligent systems",
                "LLM-powered applications",
                "Autonomous AI agent frameworks",
                "Intelligent automation architectures"
            ],
            socials: {
                linkedin: "#",
                email: "ali@zantech.com.bd",
                website: "#"
            },
            accent: "zan-cyan"
        }
    ];

    return (
        <div className="bg-zan-dark min-h-screen pt-24 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] left-[-10%] w-[600px] h-[600px] bg-zan-cyan/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[5%] right-[-10%] w-[600px] h-[600px] bg-zan-red/5 rounded-full blur-[120px]"></div>
            </div>

            {/* --- Hero Section --- */}
            <section className="relative z-10 py-12 md:py-24 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <span className="inline-block py-1 px-3 rounded-full bg-zan-cyan/10 border border-zan-cyan/20 text-zan-cyan text-xs font-mono uppercase tracking-widest mb-6">
                        &lt;Leadership_Team /&gt;
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 font-heading">
                        Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Founders</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-light leading-relaxed">
                        The minds behind ZAN Tech are a blend of academic researchers, industry veterans, and passionate educators driven by a single goal: making Bangladesh a global hub for technological innovation.
                    </p>
                </div>
            </section>

            {/* --- Founders Section --- */}
            <section className="relative z-10 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-16">
                        {founders.map((founder, idx) => (
                            <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 group`}>
                                {/* Image Container */}
                                <div className="w-full lg:w-2/5 relative">
                                    <div className={`absolute -inset-4 bg-${founder.accent}/20 blur-3xl opacity-30 rounded-full group-hover:opacity-50 transition-opacity`}></div>
                                    <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-sm border border-white/10 group-hover:border-white/20 transition-all shadow-2xl">
                                        <img
                                            src={founder.image}
                                            alt={founder.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60`}></div>
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="flex gap-4">
                                                <a href={founder.socials.linkedin} className="text-white hover:text-zan-cyan transition-colors"><Linkedin size={20} /></a>
                                                <a href={`mailto:${founder.socials.email}`} className="text-white hover:text-zan-cyan transition-colors"><Mail size={20} /></a>
                                                <a href={founder.socials.website} className="text-white hover:text-zan-cyan transition-colors"><Globe size={20} /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="w-full lg:w-3/5 space-y-6">
                                    <h2 className="text-3xl md:text-5xl font-bold text-white font-heading">{founder.name}</h2>
                                    <div className="flex items-center gap-3">
                                        <div className={`h-[2px] w-12 bg-${founder.accent}`}></div>
                                        <span className={`text-${founder.accent} font-mono uppercase tracking-widest text-sm font-bold`}>{founder.role}</span>
                                    </div>
                                    <p className="text-lg text-gray-400 leading-relaxed font-light whitespace-pre-line">
                                        {founder.bio}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        {founder.highlights.map((highlight, hIdx) => (
                                            <div key={hIdx} className="flex items-start gap-3 group/item">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zan-cyan/40 group-hover/item:bg-zan-cyan transition-colors"></div>
                                                <span className="text-gray-300 text-sm font-light leading-snug">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Philosophy Section --- */}
            <section className="relative z-10 py-24 bg-black/30">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="w-16 h-16 bg-zan-cyan/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-zan-cyan/20">
                        <Rocket className="w-8 h-8 text-zan-cyan" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-6 font-heading uppercase tracking-widest">Our Leadership Philosophy</h2>
                    <p className="text-gray-400 text-lg font-light leading-relaxed mb-12">
                        We believe that the best way to lead is by example. Every founder at ZAN Tech is hands-on—whether it's writing code, designing circuitry, conducting research, or teaching at a rural workshop. Our diversity in expertise is our greatest strength.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: <Microscope size={24} />, label: "Research Driven" },
                            { icon: <Briefcase size={24} />, label: "Industry Proven" },
                            { icon: <GraduationCap size={24} />, label: "Academic Depth" },
                            { icon: <ScrollText size={24} />, label: "Published Work" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-3">
                                <div className="text-zan-cyan/50">{item.icon}</div>
                                <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA Section --- */}
            <section className="relative z-10 pt-20 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-surface-dark/40 backdrop-blur-md border border-white/5 p-12 md:p-20 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-zan-cyan/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-heading tracking-wide uppercase">Want to work with us?</h2>
                        <p className="text-gray-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
                            ZAN Tech is constantly looking for brilliant minds to join our mission. If you're passionate about robotics, AI, or tech education, we'd love to hear from you.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a href="/career" className="bg-zan-red text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">Join the Team</a>
                            <a href="/contact" className="border border-white/20 text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Get in Touch</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TeamPage;
