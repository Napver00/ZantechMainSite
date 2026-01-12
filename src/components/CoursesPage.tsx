import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Users } from 'lucide-react';
import Pagination from './Pagination';

// Mock Data for Courses
export const COURSES_DATA = [
    {
        id: 1,
        slug: 'industrial-robotics-mastery',
        title: 'Industrial Robotics Mastery',
        excerpt: 'Master the fundamentals and advanced concepts of industrial robot arms, automation workflows, and safety protocols.',
        content: `
            <h3>Course Overview</h3>
            <p>This comprehensive course takes you from the basics of industrial robotics to advanced programming and system integration. Designed for aspiring robotics engineers and technicians.</p>
            <h3>Curriculum</h3>
            <ul>
                <li>Introduction to Industrial Arms (6-axis kinematics)</li>
                <li>Safety Standards and Protocols</li>
                <li>PLC Integration and Logic Control</li>
                <li>Advanced Path Planning and Optimization</li>
            </ul>
            <h3>Who is this for?</h3>
            <p>Engineering students, technicians, and anyone interested in industrial automation.</p>
        `,
        thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        duration: '8 Weeks',
        students: 150,
        level: 'Intermediate'
    },
    {
        id: 2,
        slug: 'ai-for-autonomous-systems',
        title: 'AI for Autonomous Systems',
        excerpt: 'Learn how to build and deploy artificial intelligence models for autonomous robots, drones, and self-driving vehicles.',
        content: `
            <h3>Course Overview</h3>
            <p>Dive into the world of autonomous systems. Learn how to apply machine learning and computer vision to enable robots to perceive and navigate their environment safely.</p>
            <h3>Curriculum</h3>
            <ul>
                <li>Computer Vision using OpenCV</li>
                <li>SLAM (Simultaneous Localization and Mapping)</li>
                <li>Deep Reinforcement Learning for Control</li>
                <li>Sensor Fusion (LiDAR, Camera, IMU)</li>
            </ul>
            <h3>Who is this for?</h3>
            <p>Computer scientists, electrical engineers, and AI enthusiasts.</p>
        `,
        thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
        duration: '10 Weeks',
        students: 230,
        level: 'Advanced'
    }
];

const CourseCard = ({ course }: { course: any }) => (
    <div className="group h-full flex flex-col">
        <div className="bg-surface-dark backdrop-blur-md rounded-sm overflow-hidden border border-white/5 hover:border-zan-cyan/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col relative">
            {/* Tech Corner Accents */}
            <div className="absolute top-0 right-0 w-8 h-8 flex justify-end">
                <div className="w-full h-full border-t border-r border-zan-cyan/20 group-hover:border-zan-cyan/50 transition-colors"></div>
            </div>

            <div className="relative overflow-hidden h-56 clip-path-slant-bottom">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zan-dark/90 to-transparent opacity-100"></div>
                <div className="absolute top-4 right-4">
                    <div className="bg-zan-dark/80 backdrop-blur-sm text-zan-cyan px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider border border-zan-cyan/20">
                        {course.level}
                    </div>
                </div>
            </div>
            <div className="p-8 flex-grow flex flex-col relative">
                <div className="flex items-center space-x-6 mb-4 text-xs font-mono uppercase tracking-wide text-gray-500">
                    <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1.5 text-zan-cyan" />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1.5 text-zan-cyan" />
                        <span>{course.students} Students</span>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 font-heading group-hover:text-zan-cyan transition-colors tracking-wide">
                    {course.title}
                </h3>
                <p className="text-gray-400 mb-6 line-clamp-3 flex-grow leading-relaxed text-sm font-light">
                    {course.excerpt}
                </p>

                <Link
                    to={`/course/${course.slug}`}
                    className="w-full mt-auto bg-transparent text-zan-cyan py-3 rounded-sm font-bold uppercase tracking-widest text-xs border border-zan-cyan/30 hover:bg-zan-cyan hover:text-black transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    </div>
);

const CoursesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');
    const itemsPerPage = 5;

    // Simulate mock data
    const courses = COURSES_DATA;

    const totalPages = Math.ceil(courses.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setSearchParams({ page: pageNumber.toString() });
    };

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return (
        <section className="pt-32 pb-24 bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-4">
                        &lt;Education Database /&gt;
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-heading">
                        Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Courses</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Expand your skills with our industry-leading courses in robotics, AI, and engineering.
                    </p>
                </div>

                {courses.length === 0 ? (
                    <div className="text-center text-gray-400 py-20 bg-surface-dark rounded-sm border border-white/10">
                        <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-lg font-mono">No database records found.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>

                        {courses.length > itemsPerPage && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default CoursesPage;
