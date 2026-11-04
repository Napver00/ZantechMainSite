import { useState, useEffect } from 'react';
import { Calendar, Code, GraduationCap, FlaskConical, LayoutGrid } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { PROJECT_CATEGORIES, categoryOf, categoryBadgeClass, isProjectCategory } from '../utils/projectCategory';

const TAB_ICON = { rnd: FlaskConical, student: GraduationCap };

const ProjectPage = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    // ?type=rnd or ?type=student opens that tab, so each list has its own link
    const [params, setParams] = useSearchParams();
    const asked = params.get('type');
    const type = isProjectCategory(asked) ? asked : 'all';
    const pick = (next: string) => setParams(next === 'all' ? {} : { type: next }, { replace: true });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/projects/active`)
            .then(response => response.json())
            .then(data => {
                if (data.success && Array.isArray(data.data)) {
                    setProjects(data.data);
                } else if (Array.isArray(data)) { // Fallback just in case
                    setProjects(data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                setLoading(false);
            });
    }, []);

    const countOf = (c: string) => (c === 'all' ? projects.length : projects.filter((p) => categoryOf(p) === c).length);
    const displayProjects = type === 'all' ? projects : projects.filter((p) => categoryOf(p) === type);
    const current = PROJECT_CATEGORIES.find((c) => c.value === type);
    const tabs = [{ value: 'all', label: 'All projects', Icon: LayoutGrid }, ...PROJECT_CATEGORIES.map((c) => ({ value: c.value, label: c.label, Icon: TAB_ICON[c.value] }))];

    return (
        <div className="bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] left-[-10%] w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-[100px]"></div>
            </div>

            {/* --- Header Section --- */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-20 text-center relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-4">
                        &lt;Innovation Showcase /&gt;
                    </p>
                    <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 md:mb-8 font-heading leading-tight">
                        Our Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Projects</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                        From autonomous robots to IoT solutions: R&amp;D built by the ZAN Tech team, and projects our students made in our courses and bootcamps.
                    </p>
                </div>
            </section>

            {/* --- Projects Grid --- */}
            <section className="pb-20 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div role="tablist" aria-label="Project type" className="mb-4 flex flex-wrap justify-center gap-2">
                        {tabs.map(({ value, label, Icon }) => {
                            const on = type === value;
                            return (
                                <button
                                    key={value}
                                    role="tab"
                                    aria-selected={on}
                                    onClick={() => pick(value)}
                                    className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${on ? 'border-zan-cyan bg-zan-cyan text-zan-dark' : 'border-white/15 text-gray-300 hover:border-zan-cyan/50 hover:text-zan-cyan'}`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                    {!loading && <span className={`rounded-full px-2 py-0.5 text-xs ${on ? 'bg-zan-dark/15' : 'bg-white/10'}`}>{countOf(value)}</span>}
                                </button>
                            );
                        })}
                    </div>
                    <p className="mb-10 text-center text-sm text-gray-400">{current ? current.blurb : 'Everything we and our students have built.'}</p>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-zan-cyan"></div>
                            <p className="mt-4 text-gray-400 font-mono tracking-widest">Loading schematics...</p>
                        </div>
                    ) : displayProjects.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-surface-dark px-6 py-16 text-center">
                            <p className="text-lg font-bold text-white">No {current ? current.label.toLowerCase() : 'projects'} to show yet</p>
                            <p className="mt-2 text-sm text-gray-400">New projects are added as they are finished. See the other tab in the meantime.</p>
                            {type !== 'all' && (
                                <button onClick={() => pick('all')} className="mt-6 inline-flex h-11 items-center rounded-lg border border-zan-cyan/40 px-5 text-sm font-semibold text-zan-cyan hover:bg-zan-cyan/10">
                                    Show all projects
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayProjects.map((project) => (
                                <Link to={`/project/${project.slug}`} key={project.id} className="block h-full">
                                    <div className="bg-surface-dark backdrop-blur-md rounded-sm border border-white/5 overflow-hidden group hover:border-zan-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
                                        <div className="relative h-48 overflow-hidden">
                                            <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                                            <img
                                                src={project.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600"}
                                                alt={project.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale light:grayscale-0 group-hover:grayscale-0"
                                                loading="lazy"
                                            />
                                            <div className={`absolute top-2 left-2 z-20 rounded-sm border px-2 py-1 text-xs font-bold ${categoryBadgeClass(categoryOf(project))}`}>
                                                {categoryOf(project) === 'student' ? 'Student project' : 'ZAN Tech R&D'}
                                            </div>
                                            <div className="absolute top-2 right-2 z-20 bg-black/80 text-zan-cyan text-xs font-mono px-2 py-1 rounded-sm border border-zan-cyan/30 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {project.created_at ? new Date(project.created_at).getFullYear() : "2024"}
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold text-white mb-3 font-heading uppercase tracking-wide group-hover:text-zan-cyan transition-colors">{project.title}</h3>
                                            <p className="text-gray-400 text-sm mb-4 line-clamp-3 font-light flex-grow">{project.description}</p>

                                            <div className="mb-6">
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies && project.technologies.slice(0, 3).map((tech: any, index: number) => (
                                                        <span key={index} className="px-2 py-1 bg-white/5 text-gray-300 text-xs rounded-sm border border-white/10 font-mono flex items-center">
                                                            <Code className="w-3 h-3 mr-1 text-zan-neon" />
                                                            {tech.name}
                                                        </span>
                                                    ))}
                                                    {project.technologies && project.technologies.length > 3 && (
                                                        <span className="px-2 py-1 bg-white/5 text-gray-500 text-xs rounded-sm border border-white/10 font-mono">
                                                            +{project.technologies.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 mt-auto">
                                                <span className="flex-1 flex items-center justify-center gap-2 py-2 bg-zan-cyan/10 border border-zan-cyan/30 rounded-sm text-sm text-zan-cyan group-hover:bg-zan-cyan group-hover:text-zan-dark transition-all font-mono uppercase tracking-wider">
                                                    View Details
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProjectPage;