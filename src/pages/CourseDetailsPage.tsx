import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Award, CheckCircle, GraduationCap } from 'lucide-react';
import { API_BASE_URL } from '../config';

interface CourseDetail {
    id: number;
    title: string;
    slug: string;
    content: string;
    thumbnail: string;
    thumbnail_url: string;
    category: string;
    tags: string[];
    meta_title: string;
    meta_description: string;
    views: number;
    status: string;
    created_at: string;
    updated_at: string;
    reg_link: string;
    reg_status: number;
    serial: number;
    author_name: string;
}

const CourseDetailsPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState<CourseDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/posts/${slug}`);
                if (!response.ok) throw new Error('Failed to fetch course details');
                const result = await response.json();

                if (result.success) {
                    setCourse(result.data);
                } else {
                    setError(result.message || 'Course not found');
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred while loading course details.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-zan-dark flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-zan-cyan"></div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-zan-dark flex flex-col items-center justify-center p-4">
                <div className="text-zan-red text-6xl mb-4 animate-pulse">!</div>
                <h2 className="text-2xl font-bold text-white mb-2 font-heading uppercase tracking-wide">
                    {error || 'Course Not Found'}
                </h2>
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

    // Default or calculated values for fields missing in API
    const level = course.tags && course.tags.length > 0 ? course.tags[0] : 'All Levels';

    // Calculate relative time (e.g., "2 weeks ago")
    const getRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
        };

        if (diffInSeconds >= intervals.year) {
            const years = Math.floor(diffInSeconds / intervals.year);
            return `${years} ${years === 1 ? 'year' : 'years'} ago`;
        } else if (diffInSeconds >= intervals.month) {
            const months = Math.floor(diffInSeconds / intervals.month);
            return `${months} ${months === 1 ? 'month' : 'months'} ago`;
        } else if (diffInSeconds >= intervals.week) {
            const weeks = Math.floor(diffInSeconds / intervals.week);
            return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
        } else if (diffInSeconds >= intervals.day) {
            const days = Math.floor(diffInSeconds / intervals.day);
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        }
        return 'Recently';
    };

    const duration = getRelativeTime(course.created_at);

    // Deterministic random students count between 122 and 180 based on ID
    // Range size: 180 - 122 + 1 = 59
    const students = 122 + ((course.id * 13) % 59);

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
                    style={{ backgroundImage: `url(${course.thumbnail_url || course.thumbnail})` }}
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
                                {level}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 font-heading uppercase tracking-wide drop-shadow-2xl">
                            {course.title}
                        </h1>
                        <div className="flex items-center flex-wrap gap-6 text-gray-400 text-sm md:text-base font-mono">
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-zan-cyan" />
                                <span>{duration}</span>
                            </div>
                            <div className="flex items-center">
                                <Users className="w-4 h-4 mr-2 text-zan-neon" />
                                <span>{students} Students</span>
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
                        <div className="bg-surface-dark backdrop-blur-md rounded-sm shadow-2xl border border-white/5 overflow-hidden p-6 md:p-12">
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
                                    <span className="text-gray-300 font-light">Hands-on robotics projects</span>
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

                            {/* Enroll Button Logic */}
                            {course.reg_status === 1 ? (
                                <a
                                    href={course.reg_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block relative z-10"
                                >
                                    <button className="w-full bg-zan-red hover:bg-red-600 text-white py-4 rounded-sm font-bold text-lg transition-all shadow-lg hover:shadow-zan-red/40 font-heading uppercase tracking-wider clip-path-polygon">
                                        Enroll Sequence
                                    </button>
                                </a>
                            ) : (
                                <div className="space-y-4">
                                    <div className="relative group z-10">
                                        <button className="w-full bg-gray-700 text-gray-400 py-4 rounded-sm font-bold text-lg cursor-not-allowed font-heading uppercase tracking-wider border border-white/5">
                                            Registration Closed
                                        </button>

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-[200px] bg-black/90 text-white text-xs p-2 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
                                            Registration process is off
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => window.location.href = '#contact'}
                                        className="w-full bg-zan-cyan/10 hover:bg-zan-cyan/20 text-zan-cyan py-3 rounded-sm font-bold text-sm transition-all border border-zan-cyan/30 hover:border-zan-cyan font-mono uppercase tracking-wider"
                                    >
                                        Contact Support
                                    </button>
                                </div>
                            )}

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
