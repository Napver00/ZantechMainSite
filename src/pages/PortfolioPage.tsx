import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, Calendar, Code, Trophy, Mail, Phone, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { API_BASE_URL } from '../config';
import CoursesSection from '../components/CoursesSection';
import WorkshopsSection from '../components/WorkshopsSection';
import Partners from '../components/Partners';

const sliderBreakpoints = {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 30 },
    1024: { slidesPerView: 3, spaceBetween: 30 },
};

const ProjectCard = ({ project }: { project: any }) => (
    <div className="group h-full flex flex-col">
        <div className="bg-surface-dark backdrop-blur-md rounded-sm border border-white/5 overflow-hidden group hover:border-zan-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                <img
                    src={project.image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600'}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 z-20 bg-black/80 text-zan-cyan text-xs font-mono px-2 py-1 rounded-sm border border-zan-cyan/30 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.created_at ? new Date(project.created_at).getFullYear() : '2024'}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-3 font-heading uppercase tracking-wide group-hover:text-zan-cyan transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 font-light flex-grow">{project.description}</p>
                <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies && project.technologies.slice(0, 3).map((tech: any, index: number) => (
                        <span key={index} className="px-2 py-1 bg-white/5 text-gray-300 text-xs rounded-sm border border-white/10 font-mono flex items-center">
                            <Code className="w-3 h-3 mr-1 text-zan-neon" />
                            {tech.name}
                        </span>
                    ))}
                </div>
                <Link
                    to={`/project/${project.slug}`}
                    className="w-full mt-auto bg-transparent text-zan-cyan py-3 rounded-sm font-bold uppercase tracking-widest text-xs border border-zan-cyan/30 hover:bg-zan-cyan hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    </div>
);

// Single-scroll company portfolio page. Sections are placeholders —
// swap the bracketed text for real copy once content is provided.
const PortfolioPage = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [projectsLoading, setProjectsLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/projects/active`)
            .then(res => res.json())
            .then(result => {
                if (result.success && Array.isArray(result.data)) {
                    setProjects(result.data);
                } else if (Array.isArray(result)) {
                    setProjects(result);
                }
            })
            .catch(err => console.error('Error fetching projects:', err))
            .finally(() => setProjectsLoading(false));
    }, []);

    const stats = [
        { label: 'Students Reached', value: '5,000+' },
        { label: 'Participants Per Workshop', value: '150+' },
        { label: 'Female Participation', value: 'Up to 50%' },
    ];

    const topSections = [
        {
            id: 'about',
            title: 'About Us',
            body: 'We teach students robotics, programming, and AI/ML — and beyond the classroom, we work on R&D and automation, building real-world tech solutions for Bangladesh.',
            link: { to: '/about', label: 'Read More About Us' },
        },
        {
            id: 'mission-vision',
            title: 'Mission & Vision',
            body: 'Our mission is to bring robotics, programming, and AI education to every corner of Bangladesh. Our vision is to prepare the next generation for the Fourth Industrial Revolution (4IR).',
            link: { to: '/about#mission-vision', label: 'Read More About Our Mission & Vision' },
        },
        {
            id: 'services',
            title: 'What We Do',
            body: 'We foster tech education through free robotics, programming, and AI/ML workshops nationwide; empower women with accessible robotics and electronics tools; and accelerate innovation through custom R&D — designing, prototyping, and building real products.',
            link: { to: '/#services', label: 'See Our Services' },
        },
    ];

    const achievements = [
        {
            image: '/wro-Quantum-Physics.jpg',
            team: 'Team Quantum Physics',
            description: 'Won Gold Medal in the Future Innovators category (Elementary Section) at the World Robot Olympiad (WRO) Bangladesh 2026 National Round.',
        },
        {
            image: '/wro-Cybernetic-Apex.jpg',
            team: 'Team Cybernetic Apex',
            description: 'Won Gold Medal in the Future Innovators category (Junior Section) at the World Robot Olympiad (WRO) Bangladesh 2026 National Round.',
        },
    ];

    const bottomSections = [
        {
            id: 'team',
            title: 'Our Team',
            body: 'ZAN Tech is led by Nakibul Islam (Co-Founder & Chief Everything Officer) and Hana Sultan Chowdhury (Co-Founder & Chief Technology Officer) — a blend of software engineering, robotics, and AI expertise driving the company forward.',
            link: { to: '/team', label: 'Meet Our Team' },
        },
    ];

    const renderSection = (section: { id: string; title: string; body: string; link?: { to: string; label: string } }, index: number) => (
        <section
            key={section.id}
            id={section.id}
            className={`py-16 relative z-10 ${index % 2 === 1 ? 'bg-surface-dark/40' : ''}`}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading uppercase tracking-wide text-white">
                    {section.title}
                </h2>
                <p className="text-gray-400 leading-relaxed font-light">{section.body}</p>
                {section.link && (
                    <Link
                        to={section.link.to}
                        className="inline-flex items-center gap-2 mt-4 text-sm uppercase tracking-wider text-zan-cyan hover:text-white transition-colors group"
                    >
                        {section.link.label}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                )}
            </div>
        </section>
    );

    return (
        <div className="bg-zan-dark min-h-screen relative overflow-hidden text-white">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] left-[-10%] w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Home button — the only nav control on this standalone page */}
            <Link
                to="/"
                className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-2 bg-surface-dark/80 border border-zan-cyan/30 backdrop-blur-md px-4 py-2 rounded-full text-sm uppercase tracking-wider text-gray-200 hover:text-zan-cyan hover:border-zan-cyan transition-all"
            >
                <Home className="w-4 h-4" />
                Home
            </Link>

            {/* --- Cover / Hero --- */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-24 text-center relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <img src="/zantech_logo.png" alt="ZAN Tech Logo" className="w-20 h-auto mx-auto mb-6" />
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-4">
                        &lt;Company Portfolio /&gt;
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading leading-tight">
                        ZAN<span className="text-zan-red">TECH</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-2xl mx-auto">
                        Awaken Your Hidden Talent
                    </p>
                </div>
            </section>

            {/* --- Quick Stats --- */}
            <section className="pb-16 relative z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-surface-dark backdrop-blur-md rounded-sm border border-white/5 p-6 text-center"
                        >
                            <div className="text-3xl font-bold text-zan-cyan font-heading mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Top Content Sections (About, Mission & Vision, What We Do) --- */}
            {topSections.map((section, index) => renderSection(section, index))}

            {/* --- Achievements --- */}
            <section id="achievements" className="py-16 relative z-10 bg-surface-dark/40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 font-heading uppercase tracking-wide text-white text-center">
                        Achievements
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {achievements.map((item) => (
                            <div
                                key={item.team}
                                className="bg-surface-dark backdrop-blur-md rounded-sm border border-white/5 overflow-hidden hover:border-zan-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300"
                            >
                                <img src={item.image} alt={item.team} className="w-full h-56 object-cover object-top" loading="lazy" />
                                <div className="p-6">
                                    <div className="inline-flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-widest text-zan-cyan bg-zan-cyan/10 border border-zan-cyan/30 px-3 py-1 rounded-sm">
                                        <Trophy className="w-4 h-4" />
                                        Gold Medal
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 font-heading uppercase tracking-wide">{item.team}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed font-light">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 flex justify-center">
                        <Link
                            to="/impact"
                            className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-zan-cyan hover:text-white transition-colors group"
                        >
                            See Our Impact
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- Projects (same slider style as Courses) --- */}
            <section id="projects" className="py-16 relative z-10 bg-surface-dark/40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 font-heading uppercase tracking-wide text-white text-center">
                        Projects
                    </h2>
                    {projectsLoading ? (
                        <div className="text-center text-gray-400 py-12">
                            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-white/10 border-t-zan-cyan"></div>
                        </div>
                    ) : projects.length === 0 ? (
                        <p className="text-center text-gray-400">No projects available at the moment. Check back soon!</p>
                    ) : projects.length > 3 ? (
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            loop={true}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            navigation={true}
                            autoplay={{ delay: 3800, disableOnInteraction: false }}
                            modules={[Pagination, Navigation, Autoplay]}
                            breakpoints={sliderBreakpoints}
                            className="!pb-16"
                        >
                            {projects.map(project => (
                                <SwiperSlide key={project.id} className="h-auto">
                                    <ProjectCard project={project} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map(project => <ProjectCard key={project.id} project={project} />)}
                        </div>
                    )}
                    <div className="mt-10 flex justify-center">
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-zan-cyan hover:text-white transition-colors group"
                        >
                            View All Projects
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- Project Uddipon --- */}
            <section id="project-uddipon" className="py-16 relative z-10 bg-surface-dark/40">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading uppercase tracking-wide text-white">
                        Project Uddipon
                    </h2>
                    <p className="text-gray-400 leading-relaxed font-light">
                        "Uddipon" (উদ্দীপন) means inspiration. It's our flagship social initiative, bringing free
                        robotics, programming, and AI workshops to underserved and rural communities across
                        Bangladesh — making sure no talented learner is left behind.
                    </p>
                    <a
                        href="https://projectuddipon.zantechbd.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-sm uppercase tracking-wider text-zan-cyan hover:text-white transition-colors group"
                    >
                        Visit Project Uddipon
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </section>

            {/* --- Courses & Workshops (same sections as the homepage) --- */}
            <CoursesSection />
            <WorkshopsSection />

            {/* --- Team --- */}
            {renderSection(bottomSections[0], 6)}

            {/* --- Partners (same as the homepage's Trusted Collaborators) --- */}
            <Partners />

            {/* --- Get In Touch --- */}
            <section id="contact" className="py-16 relative z-10 bg-surface-dark/40">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading uppercase tracking-wide text-white">
                        Get In Touch
                    </h2>
                    <p className="text-gray-400 leading-relaxed font-light mb-10 max-w-2xl mx-auto">
                        Have a project in mind or want to partner with us? We'd love to hear from you.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-6 mb-10">
                        <a
                            href="mailto:zantechbd@gmail.com"
                            className="bg-surface-dark backdrop-blur-md rounded-sm border border-white/5 p-6 hover:border-zan-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 flex flex-col items-center gap-3"
                        >
                            <Mail className="w-6 h-6 text-zan-cyan" />
                            <span className="text-sm text-gray-300 break-all">zantechbd@gmail.com</span>
                        </a>
                        <a
                            href="tel:+8801894634149"
                            className="bg-surface-dark backdrop-blur-md rounded-sm border border-white/5 p-6 hover:border-zan-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 flex flex-col items-center gap-3"
                        >
                            <Phone className="w-6 h-6 text-zan-cyan" />
                            <span className="text-sm text-gray-300">+880 1894-634149</span>
                        </a>
                        <div className="bg-surface-dark backdrop-blur-md rounded-sm border border-white/5 p-6 flex flex-col items-center gap-3">
                            <MapPin className="w-6 h-6 text-zan-cyan" />
                            <span className="text-sm text-gray-300">Dhaka, Bangladesh</span>
                        </div>
                    </div>
                    <Link
                        to="/connect"
                        className="inline-flex items-center gap-2 bg-zan-cyan text-black px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                    >
                        Contact Us
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* --- Footer / back to home --- */}
            <section className="py-16 text-center relative z-10 border-t border-white/10">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-zan-cyan/10 border border-zan-cyan/30 rounded-sm px-6 py-3 text-sm uppercase tracking-wider text-zan-cyan hover:bg-zan-cyan hover:text-black transition-all font-mono"
                >
                    <Home className="w-4 h-4" />
                    Back to Home
                </Link>
            </section>
        </div>
    );
};

export default PortfolioPage;
