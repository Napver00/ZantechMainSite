import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Tag, Calendar, Clock, Share2, MapPin } from 'lucide-react';
import { API_BASE_URL } from '../config';

const WorkshopDetailsPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [workshop, setWorkshop] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        fetch(`${API_BASE_URL}/api/posts/${slug}`)
            .then(response => response.json())
            .then(apiResponse => {
                if (apiResponse.success && apiResponse.data) {
                    setWorkshop(apiResponse.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching workshop details:', error);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-zan-dark flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-zan-cyan"></div>
                    <p className="mt-4 text-gray-400 font-mono tracking-widest">Loading workshop data...</p>
                </div>
            </div>
        );
    }

    if (!workshop) {
        return (
            <div className="min-h-screen bg-zan-dark flex flex-col items-center justify-center p-4">
                <div className="text-zan-red text-6xl mb-4 animate-pulse">!</div>
                <h2 className="text-2xl font-bold text-white mb-2 font-heading uppercase tracking-wide">Workshop Not Found</h2>
                <p className="text-lg mb-8 text-center max-w-md text-gray-400 font-light">The workshop data seems to be missing from the mainframe.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-white/5 text-zan-cyan border border-zan-cyan/30 px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-zan-cyan hover:text-black transition-all duration-300 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Return to Workshops
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zan-dark font-sans relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-zan-cyan/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-zan-neon/5 rounded-full blur-[120px]"></div>
            </div>

            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden border-b border-white/10">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
                    style={{ backgroundImage: `url(${workshop.thumbnail_url})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-zan-dark via-zan-dark/80 to-transparent"></div>
                </div>

                <div className="absolute top-0 left-0 w-full p-6 z-20 pt-24">
                    <div className="max-w-7xl mx-auto">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center text-zan-cyan bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-sm transition-all border border-zan-cyan/20 hover:border-zan-cyan/50 font-mono text-xs uppercase tracking-widest"
                        >
                            <ArrowLeft className="w-3 h-3 mr-2" />
                            Back to Workshops
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 pb-16 z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {workshop.tags && workshop.tags.map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 bg-zan-cyan/10 text-zan-cyan border border-zan-cyan/20 text-xs font-mono uppercase tracking-wider rounded-sm backdrop-blur-sm"
                                >
                                    <Tag className="w-3 h-3 mr-1.5" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 font-heading uppercase tracking-wide drop-shadow-2xl">
                            {workshop.title}
                        </h1>
                        <div className="flex items-center flex-wrap gap-6 text-gray-400 text-sm md:text-base font-mono">
                            {workshop.created_at && (
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-zan-neon" />
                                    <span>{new Date(workshop.created_at).toLocaleDateString()}</span>
                                </div>
                            )}
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-zan-cyan" />
                                <span>10 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 -mt-10 px-4 pb-20">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-surface-dark backdrop-blur-md rounded-sm shadow-2xl border border-white/5 overflow-hidden">

                        {/* Article Content */}
                        <div className="p-8 md:p-12">
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
                                dangerouslySetInnerHTML={{ __html: workshop.content }}
                            />
                        </div>

                        {/* Image Gallery */}
                        {workshop.images && workshop.images.length > 0 && (
                            <div className="px-8 md:px-12 pb-12 border-t border-white/5 pt-12">
                                <h3 className="text-2xl font-bold text-white mb-8 font-heading uppercase tracking-wide flex items-center gap-3">
                                    <Tag className="w-6 h-6 text-zan-neon" />
                                    Gallery
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {workshop.images.map((img: string, index: number) => (
                                        <div key={index} className="group relative overflow-hidden rounded-sm shadow-lg border border-white/10 h-64 md:h-72">
                                            <img
                                                src={img}
                                                alt={`Gallery image ${index + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Footer / Share Section */}
                        <div className="bg-black/40 p-8 border-t border-white/5">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                                    Share this workshop
                                </p>
                                <div className="flex gap-3">
                                    <button className="p-3 rounded-sm bg-white/5 text-gray-400 hover:text-white hover:bg-zan-cyan hover:text-black transition-all border border-white/10 shadow-lg">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkshopDetailsPage;