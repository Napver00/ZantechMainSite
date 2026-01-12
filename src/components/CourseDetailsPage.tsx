import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Award, CheckCircle, GraduationCap } from 'lucide-react';
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
            <div className="min-h-screen bg-zan-dark flex flex-col items-center justify-center p-4">
                <div className="text-zan-red text-6xl mb-4 animate-pulse">!</div>
                <h2 className="text-2xl font-bold text-white mb-2 font-heading uppercase tracking-wide">Course Not Found</h2>
                <button
                    onClick={() => navigate('/courses')}
                    className="mt-6 bg-white/5 text-zan-cyan border border-zan-cyan/30 px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-zan-cyan hover:text-black transition-all duration-300 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Courses
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zan-dark font-sans relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-zan-cyan/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-zan-red/5 rounded-full blur-[120px]"></div>
            </div>

            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden border-b border-white/10">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
                    style={{ backgroundImage: `url(${course.thumbnail})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-zan-dark via-zan-dark/80 to-transparent"></div>
                </div>

                <div className="absolute top-0 left-0 w-full p-6 z-20 pt-24">
                    <div className="max-w-7xl mx-auto">
                        <button
                            onClick={() => navigate('/courses')}
                            className="inline-flex items-center text-zan-cyan bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-sm transition-all border border-zan-cyan/20 hover:border-zan-cyan/50 font-mono text-xs uppercase tracking-widest"
                        >
                            <ArrowLeft className="w-3 h-3 mr-2" />
                            Back to Courses
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 pb-16 z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="inline-flex items-center px-3 py-1 bg-zan-cyan/10 text-zan-cyan border border-zan-cyan/20 text-xs font-mono uppercase tracking-wider rounded-sm backdrop-blur-sm">
                                <GraduationCap className="w-3 h-3 mr-1.5" />
                                {course.level}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 font-heading uppercase tracking-wide drop-shadow-2xl">
                            {course.title}
                        </h1>
                        <div className="flex items-center flex-wrap gap-6 text-gray-400 text-sm md:text-base font-mono">
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-zan-cyan" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center">
                                <Users className="w-4 h-4 mr-2 text-zan-neon" />
                                <span>{course.students} Enrolled</span>
                            </div>
                            <div className="flex items-center">
                                <Award className="w-4 h-4 mr-2 text-zan-red" />
                                <span>Certification Included</span>
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
                        <div className="bg-surface-dark backdrop-blur-md rounded-sm shadow-2xl border border-white/5 overflow-hidden p-8 md:p-12">
                            <article
                                className="prose prose-lg prose-invert max-w-none
                                prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-white
                                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h3:text-zan-cyan
                                prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-6 prose-p:font-light
                                prose-a:text-zan-cyan prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-white prose-strong:font-bold
                                prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-400 prose-li:mb-2
                                prose-img:rounded-sm prose-img:shadow-lg prose-img:my-8 prose-img:w-full prose-img:border prose-img:border-white/10
                                prose-blockquote:border-l-4 prose-blockquote:border-zan-cyan prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r-sm prose-blockquote:italic"
                                dangerouslySetInnerHTML={{ __html: course.content }}
                            />
                        </div>
                    </div>

                    {/* Sidebar / Enrollment */}
                    <div className="lg:col-span-1">
                        <div className="bg-surface-dark backdrop-blur-md rounded-sm shadow-2xl border border-white/10 p-8 sticky top-24">
                            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none rounded-sm"></div>

                            <h3 className="text-2xl font-bold text-white mb-6 font-heading uppercase tracking-wide flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-zan-neon" />
                                Neural Access
                            </h3>

                            <div className="space-y-4 mb-8 relative z-10">
                                <div className="flex items-start">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-zan-cyan mr-3 shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
                                    <span className="text-gray-300 font-light">Hands-on autonomous projects</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-zan-neon mr-3 shadow-[0_0_10px_rgba(57,255,20,0.5)]"></div>
                                    <span className="text-gray-300 font-light">Expert engineering mentorship</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-zan-red mr-3 shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>
                                    <span className="text-gray-300 font-light">Lifetime system access</span>
                                </div>
                            </div>

                            <a href="#contact" className="block relative z-10">
                                <button className="w-full bg-zan-red hover:bg-red-600 text-white py-4 rounded-sm font-bold text-lg transition-all shadow-lg hover:shadow-zan-red/40 font-heading uppercase tracking-wider clip-path-polygon">
                                    Enroll Sequence
                                </button>
                            </a>
                            <p className="text-center text-xs text-gray-500 mt-4 font-mono uppercase tracking-wider">
                                Secure your slot via encrypted channel
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsPage;
