import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Award, CheckCircle } from 'lucide-react';
import { COURSES_DATA } from './CoursesPage'; // Importing mock data

const CourseDetailsPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState<any>(null);

    useEffect(() => {
        // Find course from mock data
        const foundCourse = COURSES_DATA.find(c => c.slug === slug);
        if (foundCourse) {
            setCourse(foundCourse);
        }
    }, [slug]);

    if (!course && !slug) return null; // Or some loading state

    if (!course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 p-4">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Course Not Found</h2>
                <button
                    onClick={() => navigate('/courses')}
                    className="mt-6 inline-flex items-center px-6 py-3 bg-zan-blue hover:bg-blue-700 text-white rounded-xl transition-all font-medium"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Courses
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
                    style={{ backgroundImage: `url(${course.thumbnail})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                </div>

                <div className="absolute top-0 left-0 w-full p-6 z-20">
                    <div className="max-w-7xl mx-auto">
                        <button
                            onClick={() => navigate('/courses')}
                            className="inline-flex items-center text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full transition-all border border-white/10"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Courses
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 pb-16 z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="inline-flex items-center px-3 py-1 bg-zan-blue/90 text-white text-xs font-bold uppercase tracking-wider rounded-md backdrop-blur-sm shadow-sm">
                                {course.level}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
                            {course.title}
                        </h1>
                        <div className="flex items-center flex-wrap gap-6 text-gray-300 text-sm md:text-base">
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-zan-blue" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center">
                                <Users className="w-4 h-4 mr-2 text-zan-blue" />
                                <span>{course.students} Enrolled</span>
                            </div>
                            <div className="flex items-center">
                                <Award className="w-4 h-4 mr-2 text-zan-blue" />
                                <span>Certificate of Completion</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content & Enroll */}
            <div className="relative z-10 -mt-10 px-4 pb-20">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden p-8 md:p-12">
                            <article
                                className="prose prose-lg dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: course.content }}
                            />
                        </div>
                    </div>

                    {/* Sidebar / Enrollment */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 sticky top-24">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ready to Learn?</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                                    <span className="text-gray-600 dark:text-gray-300">Hands-on projects</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                                    <span className="text-gray-600 dark:text-gray-300">Expert mentorship</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                                    <span className="text-gray-600 dark:text-gray-300">Lifetime access</span>
                                </div>
                            </div>

                            <a href="#contact">
                                <button className="w-full bg-zan-red text-white py-4 rounded-xl font-bold text-lg hover:bg-red-600 transition-all shadow-lg hover:shadow-red-500/25">
                                    Enroll Now
                                </button>
                            </a>
                            <p className="text-center text-sm text-gray-400 mt-4">
                                Contact us to secure your spot.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsPage;
