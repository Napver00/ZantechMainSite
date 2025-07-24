const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "Smart Agriculture Robot",
            description: "Autonomous farming robot with AI-powered crop monitoring and precision agriculture capabilities.",
            image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=500",
            technologies: ["IoT", "AI/ML", "Robotics"],
            status: "Completed"
        },
        {
            id: 2,
            title: "Smart Home IoT System",
            description: "Complete home automation solution with voice control, energy monitoring, and security features.",
            image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=500",
            technologies: ["IoT", "Mobile App", "Cloud"],
            status: "In Progress"
        },
        {
            id: 3,
            title: "Medical Assistance Robot",
            description: "Healthcare robot for patient monitoring, medication delivery, and emergency response.",
            image: "https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=500",
            technologies: ["Robotics", "AI", "Healthcare"],
            status: "Research Phase"
        }
    ];

    return (
        <section id="projects" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Projects</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Explore our innovative projects that showcase the power of robotics, IoT, and cutting-edge technology solutions.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="group">
                            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'Completed' ? 'bg-green-500 text-white' :
                                                project.status === 'In Progress' ? 'bg-blue-500 text-white' :
                                                    'bg-orange-500 text-white'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;