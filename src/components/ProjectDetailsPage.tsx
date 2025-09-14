import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
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
        return <div className="min-h-screen flex items-center justify-center pt-24">Loading...</div>;
    }

    if (!project) {
        return <div className="min-h-screen flex items-center justify-center pt-24">Project not found.</div>;
    }

    return (
        <section className="pt-32 pb-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Two-column grid layout */}
                <div className="grid lg:grid-cols-3 gap-12">
                    
                    {/* Left Column: Image, Title, and Technologies */}
                    <div className="lg:col-span-1 space-y-6">
                        <img src={project.image_url} alt={project.title} className="w-full h-auto object-cover rounded-2xl shadow-lg" />
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.title}</h1>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies && project.technologies.map((tech) => (
                                <span key={tech.id} className="px-3 py-1 bg-blue-100 dark:bg-zan-blue/30 text-zan-blue dark:text-blue-300 rounded-full text-sm font-medium">
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Long Description */}
                    <div className="lg:col-span-2">
                        <div 
                            className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300" 
                            dangerouslySetInnerHTML={{ __html: project.longdescription || project.description }} 
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProjectDetailsPage;