import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';

const ProjectCard = ({ project }: { project: any }) => (
    <div className="group h-full flex flex-col">
        <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col">
            <div className="relative overflow-hidden h-56">
                <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-zan-blue dark:text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        Project
                    </div>
                </div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 font-heading group-hover:text-zan-blue dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 flex-grow leading-relaxed text-sm">
                    {project.description}
                </p>

                <Link
                    to={`/project/${project.slug}`}
                    className="w-full mt-auto bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white py-4 rounded-xl font-semibold text-center hover:bg-zan-blue hover:text-white dark:hover:bg-zan-blue transition-all duration-300 flex items-center justify-center space-x-2 group/btn border border-gray-100 dark:border-white/5"
                >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    </div>
);

const ProjectPage = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/projects/active`)
            .then(response => response.json())
            .then(apiResponse => {
                if (apiResponse.success && apiResponse.data) {
                    setProjects(apiResponse.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching projects:', error)
                setLoading(false);
            });
    }, []);

    return (
        <section className="pt-32 pb-24 bg-zan-light dark:bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-blue to-zan-red">Projects</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Explore our innovative projects that showcase the power of robotics, IoT, and cutting-edge technology solutions.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center text-gray-600 dark:text-gray-300 py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-zan-blue"></div>
                        <p className="mt-4 font-medium">Loading projects...</p>
                    </div>
                ) : (
                    <>
                        {projects.length === 0 ? (
                            <div className="text-center text-gray-600 dark:text-gray-300 py-20 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
                                <p className="text-lg">No projects available at the moment. Check back soon!</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default ProjectPage;