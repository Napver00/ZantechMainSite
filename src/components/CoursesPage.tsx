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
        <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex-grow flex flex-col">
            <div className="relative overflow-hidden h-56">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-zan-blue dark:text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        {course.level}
                    </div>
                </div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5 text-zan-blue" />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1.5 text-zan-blue" />
                        <span>{course.students} Students</span>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 font-heading group-hover:text-zan-blue dark:group-hover:text-blue-400 transition-colors">
                    {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 flex-grow leading-relaxed text-sm">
                    {course.excerpt}
                </p>

                <Link
                    to={`/course/${course.slug}`}
                    className="w-full mt-auto bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white py-4 rounded-xl font-semibold text-center hover:bg-zan-blue hover:text-white dark:hover:bg-zan-blue transition-all duration-300 flex items-center justify-center space-x-2 group/btn border border-gray-100 dark:border-white/5"
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
        <section className="pt-32 pb-24 bg-zan-light dark:bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-blue to-zan-red">Courses</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Expand your skills with our industry-leading courses in robotics, AI, and engineering.
                    </p>
                </div>

                {courses.length === 0 ? (
                    <div className="text-center text-gray-600 dark:text-gray-300 py-20 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg">No courses available at the moment. Check back soon!</p>
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
