import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { type BootcampSummary, bootcampStatus } from '../utils/bootcamp';
import BootcampCard from '../components/BootcampCard';

const BootcampsPage = () => {
    const [bootcamps, setBootcamps] = useState<BootcampSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/courses/published?kind=bootcamp&limit=100&page=1`)
            .then((r) => r.json())
            .then((res) => {
                if (!res.success) throw new Error();
                const data = res.data;
                setBootcamps(Array.isArray(data) ? data : data ? [data] : []);
            })
            .catch(() => setError('We could not load bootcamps right now. Please try again.'))
            .finally(() => setLoading(false));
    }, []);

    const upcoming = bootcamps.filter((b) => bootcampStatus(b) !== 'ended');
    const past = bootcamps.filter((b) => bootcampStatus(b) === 'ended').reverse();

    return (
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-zan-dark min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-zan-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-4">&lt;Hands-on Bootcamps /&gt;</p>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
                        Robotics &amp; Coding <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Bootcamps</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Short, intensive camps where kids build real robots and code real projects — in just a few days.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zan-cyan"></div></div>
                ) : error ? (
                    <p className="text-center text-zan-red py-16">{error}</p>
                ) : (
                    <>
                        {upcoming.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {upcoming.map((b) => <BootcampCard key={b.id} b={b} />)}
                            </div>
                        ) : (
                            <div className="max-w-xl mx-auto text-center bg-surface-dark border border-white/10 rounded-xl p-10">
                                <Rocket className="w-12 h-12 text-zan-cyan mx-auto mb-4" />
                                <h2 className="text-xl font-bold text-white font-heading uppercase tracking-wide mb-2">New bootcamps coming soon</h2>
                                <p className="text-gray-400 font-light mb-6">Follow us or explore our courses while we plan the next camp.</p>
                                <Link to="/courses" className="inline-flex items-center gap-2 px-6 py-3 bg-zan-cyan text-zan-dark font-bold rounded-sm font-heading uppercase tracking-wider text-sm hover:bg-white">
                                    Browse Courses <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}

                        {past.length > 0 && (
                            <div className="mt-16 md:mt-20">
                                <h2 className="text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-wide mb-6">Past Bootcamps</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                    {past.map((b) => <BootcampCard key={b.id} b={b} past />)}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default BootcampsPage;
