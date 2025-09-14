import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/projects/active`)
            .then(response => response.json())
            .then(apiResponse => {
                if (apiResponse.success && apiResponse.data) {
                    // Show only the first 3 projects on the homepage
                    setProjects(apiResponse.data.slice(0, 3));
                }
            })
            .catch(error => console.error('Error fetching projects:', error));
    }, []);

    const renderProjectCard = (project) => (
        <div className="group h-full flex flex-col">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col">
                <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed flex-grow">{project.description}</p>
                    <Link to={`/project/${project.id}`} className="w-full mt-auto bg-white/90 text-zan-blue py-2 rounded-xl font-semibold text-center hover:bg-white transition-all duration-300 transform hover:scale-105">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <section id="projects" className="py-20 bg-zan-blue">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        Our <span className="text-blue-300">Projects</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Explore our innovative projects that showcase the power of robotics, IoT, and cutting-edge technology solutions.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id}>
                            {renderProjectCard(project)}
                        </div>
                    ))}
                </div>
                <div className="text-center mt-16">
                    <Link to="/projects" className="bg-white text-zan-blue px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                        View All Projects
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Projects;