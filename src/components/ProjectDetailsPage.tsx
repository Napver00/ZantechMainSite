import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Code2 } from 'lucide-react';
import { API_BASE_URL } from '../config';

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetch(`${API_BASE_URL}/api/projects/${id}`)
            .then(response => response.json())
            .then(apiResponse => {
                if (apiResponse.success && apiResponse.data) {
                    setProject(apiResponse.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching project details:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zan-light dark:bg-zan-dark">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-zan-blue"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zan-light dark:bg-zan-dark text-gray-600 dark:text-gray-300">
                <p className="text-xl mb-4">Project not found.</p>
                <Link to="/projects" className="text-zan-blue hover:underline">Back to Projects</Link>
            </div>
        );
    }

    return (
        <section className="pt-32 pb-24 bg-zan-light dark:bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <Link to="/projects" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-zan-blue dark:hover:text-blue-400 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Projects
                </Link>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column: Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl p-2 border border-gray-100 dark:border-white/10 shadow-lg">
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-auto object-cover rounded-2xl"
                            />
                        </div>

                        <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-lg space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies && project.technologies.map((tech: any) => (
                                        <span key={tech.id} className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-zan-blue dark:text-blue-300 rounded-full text-sm font-medium border border-blue-100 dark:border-blue-500/20">
                                            <Code2 className="w-3 h-3 mr-1.5" />
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-white/10 shadow-lg">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 font-heading leading-tight">
                                {project.title}
                            </h1>

                            <div
                                className="prose prose-lg dark:prose-invert max-w-none 
                                prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                                prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                                prose-a:text-zan-blue dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-gray-900 dark:prose-strong:text-white
                                prose-ul:list-disc prose-ul:pl-5 prose-li:text-gray-600 dark:prose-li:text-gray-300
                                prose-img:rounded-2xl prose-img:shadow-md"
                                dangerouslySetInnerHTML={{ __html: project.longdescription || project.description }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetailsPage;