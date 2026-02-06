import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Award, CheckCircle, GraduationCap, X } from 'lucide-react';
import { API_BASE_URL } from '../config';

interface Ambassador {
    id: number;
    name: string;
    campus: string;
    image: string;
    status: string;
    bio: string;
    created_at: string;
    updated_at: string;
}

interface Teacher {
    id: number;
    post_id: number;
    ourambassadors_id: number;
    serial: number;
    status: string;
    created_at: string;
    updated_at: string;
    ambassador: Ambassador;
}

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
    teachers: Teacher[];
}

const CourseDetailsPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState<CourseDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAmbassador, setSelectedAmbassador] = useState<Ambassador | null>(null);

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
            <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden border-b border-white/10">
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
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 font-heading uppercase tracking-wide drop-shadow-2xl">
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
            <div className="relative z-10 -mt-10 px-4 pb-20 w-full max-w-[100vw] overflow-x-hidden">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Course Content */}
                        <div className="bg-surface-dark backdrop-blur-md rounded-sm shadow-2xl border border-white/5 overflow-hidden p-5 md:p-12">
                            <article
                                className="prose prose-base md:prose-lg prose-invert max-w-none
                                prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-white
                                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                                prose-p:text-white prose-p:leading-relaxed prose-p:mb-6 prose-p:font-light prose-p:break-words
                                prose-a:text-zan-cyan prose-a:no-underline hover:prose-a:underline prose-a:break-all
                                prose-strong:text-white prose-strong:font-bold
                                prose-ul:list-disc prose-ul:pl-6 prose-li:text-white prose-li:mb-2
                                prose-img:rounded-sm prose-img:shadow-lg prose-img:my-8 prose-img:w-full prose-img:h-auto prose-img:max-w-full
                                prose-pre:max-w-[calc(100vw-3rem)] prose-pre:overflow-x-auto
                                prose-blockquote:border-l-4 prose-blockquote:border-zan-cyan prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r-sm prose-blockquote:italic
                                [&_*]:!text-white [&_iframe]:w-full [&_iframe]:max-w-full [&_table]:overflow-x-auto [&_table]:block"
                                dangerouslySetInnerHTML={{ __html: course.content }}
                            />
                        </div>

                        {/* Instructors Section */}
                        {course.teachers && course.teachers.length > 0 && (
                            <div className="bg-surface-dark backdrop-blur-md rounded-sm shadow-2xl border border-white/5 overflow-hidden p-6 md:p-8">
                                <h3 className="text-2xl font-bold text-white mb-8 font-heading uppercase tracking-wide flex items-center gap-3">
                                    <span className="w-1 h-8 bg-zan-cyan rounded-full"></span>
                                    Course Instructors
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {course.teachers.map((teacher) => (
                                        <div
                                            key={teacher.id}
                                            onClick={() => setSelectedAmbassador(teacher.ambassador)}
                                            className="group relative bg-black/20 border border-white/5 hover:border-zan-cyan/30 rounded-sm p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                        >
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zan-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                                                <div className="relative shrink-0">
                                                    <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-br from-zan-cyan/30 to-zan-neon/30 group-hover:from-zan-cyan group-hover:to-zan-neon transition-all duration-500">
                                                        <img
                                                            src={teacher.ambassador.image.startsWith('http') ? teacher.ambassador.image : `${API_BASE_URL}/${teacher.ambassador.image}`}
                                                            alt={teacher.ambassador.name}
                                                            className="w-full h-full rounded-full object-cover border-2 border-black"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(teacher.ambassador.name) + '&background=0D8ABC&color=fff';
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex-grow min-w-0">
                                                    <h4 className="text-lg font-bold text-white font-heading uppercase tracking-wide group-hover:text-zan-cyan transition-colors truncate w-full">
                                                        {teacher.ambassador.name}
                                                    </h4>
                                                    <div className="text-xs font-mono text-zan-cyan/80 uppercase tracking-wider mb-2 truncate w-full">
                                                        {teacher.ambassador.campus}
                                                    </div>
                                                    <p className="text-gray-400 text-sm line-clamp-2 md:line-clamp-2 font-light">
                                                        {teacher.ambassador.bio}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
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
            {/* Instructor Details Popup */}
            {selectedAmbassador && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn" onClick={() => setSelectedAmbassador(null)}>
                    <div
                        className="bg-surface-dark rounded-sm shadow-2xl w-full max-w-lg p-0 relative max-h-[90vh] overflow-y-auto border border-zan-cyan/20 animate-scaleIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Tech Overlay */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zan-cyan via-zan-neon to-zan-cyan"></div>

                        <button
                            onClick={() => setSelectedAmbassador(null)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-gray-400 hover:text-white hover:bg-white/10 transition-all z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8">
                            <div className="flex flex-col items-center mb-6 text-center">
                                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-zan-cyan to-zan-neon mb-4">
                                    <img
                                        src={selectedAmbassador.image.startsWith('http') ? selectedAmbassador.image : `${API_BASE_URL}/${selectedAmbassador.image}`}
                                        alt={selectedAmbassador.name}
                                        className="w-full h-full rounded-full object-cover border-4 border-black"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(selectedAmbassador.name) + '&background=0D8ABC&color=fff';
                                        }}
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-white font-heading uppercase tracking-wide text-center">
                                    {selectedAmbassador.name}
                                </h3>
                                <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mt-1 text-center">
                                    {selectedAmbassador.campus}
                                </p>
                            </div>

                            <div className="prose prose-invert prose-sm max-w-none">
                                <p className="text-gray-300 font-light leading-relaxed text-justify">
                                    {selectedAmbassador.bio}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetailsPage;
