import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

const FaqPage = () => {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [openFaqId, setOpenFaqId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/faqs/active?category=landingpage`);
                if (!response.ok) {
                    throw new Error('Failed to fetch FAQs.');
                }
                const apiResponse = await response.json();
                if (apiResponse.success && Array.isArray(apiResponse.data)) {
                    setFaqs(apiResponse.data);
                } else {
                    throw new Error('Invalid data format from API.');
                }
            } catch (err: any) {
                setError(err.message);
                console.error('Error fetching FAQs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, []);

    const handleToggle = (id: number) => {
        setOpenFaqId(openFaqId === id ? null : id);
    };

    return (
        <div className="bg-[#0b0c10] min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px]"></div>
            </div>

            <section className="pt-32 pb-24 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0f1115] rounded-3xl mb-8 border border-white/5 shadow-2xl shadow-blue-500/10 animate-pulse">
                            <HelpCircle className="w-10 h-10 text-blue-500" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-white">
                            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Questions</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Have a question? We're here to help. Find answers to our most common inquiries below.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {loading && (
                            <div className="text-center text-gray-400 py-12">
                                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-white/10 border-t-blue-500 mb-4"></div>
                                <p>Loading FAQs...</p>
                            </div>
                        )}

                        {error && (
                            <div className="text-center py-8 bg-red-900/10 rounded-2xl border border-red-500/20">
                                <p className="text-red-400 font-medium">Error: {error}</p>
                            </div>
                        )}

                        {!loading && !error && faqs.map((faq) => {
                            const isOpen = openFaqId === faq.id;
                            return (
                                <div
                                    key={faq.id}
                                    className={`bg-[#0f1115]/80 backdrop-blur-xl rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                                        ? 'border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                                        : 'border-white/5 hover:border-white/10'
                                        }`}
                                >
                                    <button
                                        onClick={() => handleToggle(faq.id)}
                                        className="w-full flex justify-between items-center p-6 text-left group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'
                                                }`}>
                                                <MessageCircle className="w-4 h-4" />
                                            </div>
                                            <span className={`text-lg font-bold font-heading transition-colors duration-300 ${isOpen ? 'text-blue-400' : 'text-gray-200 group-hover:text-white'
                                                }`}>
                                                {faq.question}
                                            </span>
                                        </div>
                                        <ChevronDown
                                            className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 text-blue-400' : 'text-gray-500 group-hover:text-white'
                                                }`}
                                        />
                                    </button>
                                    <div
                                        className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="px-6 pb-8 pl-[4.5rem]">
                                            <div className="prose prose-lg prose-invert max-w-none text-gray-400 leading-relaxed">
                                                <p>{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FaqPage;