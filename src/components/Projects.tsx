import projectsData from '../data/projects.json';

// 1. Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Projects = () => {
    const projects = projectsData;

    const renderProjectCard = (project) => (
        <div className="group h-full flex flex-col">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col">
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

                <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-medium">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <button className="w-full mt-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );

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

                {/* 2. Conditionally render Swiper or grid */}
                {projects.length > 3 ? (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        pagination={{ clickable: true }}
                        navigation={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        modules={[Pagination, Navigation, Autoplay]}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="mySwiper"
                    >
                        {projects.map((project) => (
                            <SwiperSlide key={project.id} className="pb-12">
                                {renderProjectCard(project)}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map(renderProjectCard)}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;