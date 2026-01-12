import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';

const BlogPage = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/blogs`)
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            });
    }, []);

    const displayPosts = posts;

    return (
        <div className="bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-[100px]"></div>
            </div>

            {/* --- Header Section --- */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-20 text-center relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-4">
                        &lt;Knowledge Base /&gt;
                    </p>
                    <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 md:mb-8 font-heading leading-tight">
                        Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Articles</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                        Stay updated with the latest in robotics, technology trends, and tutorials from our experts.
                    </p>
                </div>
            </section>

            {/* --- Blog Grid --- */}
            <section className="py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-zan-cyan"></div>
                            <p className="mt-4 text-gray-400 font-mono tracking-widest">Loading archives...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayPosts.map((post) => (
                                <article key={post.id} className="bg-surface-dark backdrop-blur-md rounded-sm border border-white/5 overflow-hidden group hover:border-zan-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full relative">
                                    {/* Tech Overlay */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent z-20 pointer-events-none"></div>

                                    <div className="relative h-56 overflow-hidden">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                                        <img
                                            src={post.image_url || "https://images.unsplash.com/photo-1485827404703-89955f3a77ad?auto=format&fit=crop&q=80&w=800"}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="bg-zan-cyan/90 backdrop-blur-sm text-black text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider shadow-lg">
                                                {post.category || "General"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-mono">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3 text-zan-cyan" />
                                                <span>{post.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="w-3 h-3 text-zan-red" />
                                                <span>{post.author}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 font-heading uppercase tracking-wide group-hover:text-zan-cyan transition-colors leading-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-6 line-clamp-3 font-light flex-grow">
                                            {post.excerpt}
                                        </p>

                                        <button className="flex items-center gap-2 text-zan-cyan text-sm font-bold uppercase tracking-widest group/btn mt-auto hover:text-white transition-colors">
                                            Read More
                                            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BlogPage;