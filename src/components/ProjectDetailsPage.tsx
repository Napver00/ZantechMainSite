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
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!project) {
        return <div className="min-h-screen flex items-center justify-center">Project not found.</div>;
    }

    return (
        <section className="pt-32 pb-20 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <img src={project.image_url} alt={project.title} className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{project.title}</h1>
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                        <span key={tech.id} className="px-3 py-1 bg-blue-100 dark:bg-zan-blue/30 text-zan-blue dark:text-blue-300 rounded-full text-sm font-medium">
                            {tech.name}
                        </span>
                    ))}
                </div>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: project.details || project.description }} />
            </div>
        </section>
    );
};

export default ProjectDetailsPage;