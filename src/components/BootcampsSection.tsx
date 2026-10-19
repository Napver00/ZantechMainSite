import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { type BootcampSummary, bootcampStatus } from '../utils/bootcamp';
import BootcampCard from './BootcampCard';

// Home page: up to 3 upcoming bootcamps; if none are scheduled, the latest finished
// ones (with their highlights). Hidden when there are no bootcamps at all.
const BootcampsSection = () => {
    const [bootcamps, setBootcamps] = useState<BootcampSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/courses/published?kind=bootcamp&limit=50&page=1`)
            .then((r) => r.json())
            .then((res) => {
                if (res.success && res.data) setBootcamps(Array.isArray(res.data) ? res.data : [res.data]);
            })
            .catch(() => setBootcamps([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading || bootcamps.length === 0) return null;

    const upcoming = bootcamps.filter((b) => bootcampStatus(b) !== 'ended');
    const showingPast = upcoming.length === 0;
    const shown = (showingPast ? bootcamps.filter((b) => bootcampStatus(b) === 'ended').reverse() : upcoming).slice(0, 3);

    return (
        <section id="bootcamps" className="py-16 md:py-24 bg-zan-dark relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-zan-red/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-zan-cyan font-mono text-sm tracking-widest uppercase mb-2">
                        &lt;Hands-on Bootcamps /&gt;
                    </p>
                    <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-white font-heading mb-4">
                        {showingPast ? 'Recent ' : 'Upcoming '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-cyan to-zan-red">Bootcamps</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
                        {showingPast
                            ? 'See what kids built at our recent bootcamps — the next one is coming soon.'
                            : 'Short, intensive camps where kids build real robots and code real projects in just a few days. Seats are limited.'}
                    </p>
                </div>

                <div className={`grid gap-6 lg:gap-8 ${shown.length === 1 ? 'max-w-md mx-auto' : shown.length === 2 ? 'sm:grid-cols-2 max-w-4xl mx-auto' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
                    {shown.map((b) => <BootcampCard key={b.id} b={b} past={showingPast} />)}
                </div>

                <div className="mt-12 md:mt-16 flex justify-center">
                    <Link
                        to="/bootcamps"
                        className="inline-flex items-center space-x-2 bg-zan-cyan text-zan-dark px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                    >
                        <span>View All Bootcamps</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BootcampsSection;
