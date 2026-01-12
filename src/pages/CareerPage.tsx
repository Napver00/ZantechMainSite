import { useState, useEffect } from 'react';
import { Briefcase, MapPin, ArrowRight, Search, Zap } from 'lucide-react';
import { API_BASE_URL } from '../config';

const CareerPage = () => {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/careers`)
            .then(response => response.json())
            .then(data => {
                if (data && data.success !== false) {
                    // Handle both array and object responses if necessary, 
                    // dependent on API structure, but assuming array or data property here.
                    const jobsData = Array.isArray(data) ? data : (data.data || []);
                    setJobs(jobsData);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
                setLoading(false);
            });
    }, []);

    const displayJobs = jobs;

    return (
        <div className="bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] right-[-10%] w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[20%] left-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-[100px]"></div>
            </div>

            {/* --- Header Section --- */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-20 text-center relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-4">
                        &lt;Join The Crew /&gt;
                    </p>
                    <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 md:mb-8 font-heading leading-tight">
                        Build the Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">With Us</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                        We are always looking for passionate individuals who want to make a difference in the tech landscape of Bangladesh. If you love robots, code, or teaching, you belong here.
                    </p>
                </div>
            </section>

            {/* --- Job Listings Section --- */}
            <section className="py-20 relative z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold text-white font-heading uppercase tracking-wide mb-6 md:mb-0">Open Positions</h2>
                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search roles..."
                                className="w-full md:w-80 bg-surface-dark border border-white/10 rounded-sm py-3 pl-12 pr-4 text-white focus:border-zan-cyan focus:outline-none font-mono text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {loading ? (
                            <div className="text-center py-20">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-zan-cyan"></div>
                                <p className="mt-4 text-gray-400 font-mono tracking-widest">Scanning databases...</p>
                            </div>
                        ) : (
                            displayJobs.map((job) => (
                                <div key={job.id} className="bg-surface-dark backdrop-blur-md p-6 md:p-8 rounded-sm border border-white/5 hover:border-zan-cyan/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 group relative overflow-hidden">
                                    {/* Tech Decor */}
                                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-zan-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-white font-heading tracking-wide group-hover:text-zan-cyan transition-colors">{job.title}</h3>
                                                {job.department && (
                                                    <span className="bg-white/5 text-xs text-gray-400 px-2 py-0.5 rounded-sm border border-white/10 font-mono uppercase">
                                                        {job.department}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-mono">
                                                <div className="flex items-center gap-2">
                                                    <Briefcase className="w-4 h-4 text-zan-cyan" />
                                                    <span>{job.type}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-zan-red" />
                                                    <span>{job.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="bg-transparent border border-white/20 text-white px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-zan-cyan hover:text-black hover:border-zan-cyan transition-all duration-300 flex items-center gap-2 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                                            <span>Apply Now</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {!loading && displayJobs.length === 0 && (
                        <div className="text-center py-20 bg-surface-dark rounded-sm border border-white/10">
                            <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-lg text-gray-400">No open positions at the moment.</p>
                            <p className="text-sm text-gray-600 mt-2">Check back later or send us your resume proactively.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* --- Internship CTA --- */}
            <section className="py-20 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-zan-dark to-black border border-zan-cyan/20 rounded-sm p-10 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-zan-cyan/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <Zap className="w-6 h-6 text-zan-neon" />
                                <h3 className="text-2xl font-bold text-white font-heading uppercase tracking-wide">Looking for an Internship?</h3>
                            </div>
                            <p className="text-gray-400 font-light max-w-lg">
                                Jumpstart your career with hands-on experience in robotics and software development. We offer competitive internships for students.
                            </p>
                        </div>
                        <button className="relative z-10 bg-white/5 text-zan-cyan border border-zan-cyan/30 px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-zan-cyan hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.1)] whitespace-nowrap">
                            Apply for Internship
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CareerPage;