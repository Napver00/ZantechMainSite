import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { ArrowRight, ExternalLink } from 'lucide-react';

const Projects = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/projects/active`)
            .then(response => response.json())
            .then(apiResponse => {
                if (apiResponse.success && apiResponse.data) {
                    // Show only the first 3 projects on the homepage
                    setProjects(apiResponse.data.slice(0, 3));
                }
            })
            .catch(error => console.error('Error fetching projects:', error))
            .finally(() => setLoading(false));
    }, []);

    const renderProjectCard = (project: any) => (
        <div className="group h-full flex flex-col">
            <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col">
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                        <span className="text-white font-medium flex items-center gap-2">
                            View Project <ArrowRight className="w-4 h-4" />
                        </span>
                    </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-heading group-hover:text-zan-blue dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-grow line-clamp-3">
                        {project.description}
                    </p>
                    <Link
                        to={`/project/${project.id}`}
                        className="inline-flex items-center justify-center w-full bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white py-3 rounded-xl font-semibold hover:bg-zan-blue hover:text-white dark:hover:bg-zan-blue transition-all duration-300 group/btn"
                    >
                        <span>View Details</span>
                        <ExternalLink className="w-4 h-4 ml-2 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <section id="projects" className="py-24 bg-zan-light dark:bg-zan-dark relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-blue to-zan-red">Projects</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Explore our innovative projects that showcase the power of robotics, IoT, and cutting-edge technology solutions.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-zan-blue"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div key={project.id}>
                                {renderProjectCard(project)}
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-16">
                    <Link
                        to="/projects"
                        className="inline-flex items-center bg-zan-blue text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                        <span>View All Projects</span>
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Projects;