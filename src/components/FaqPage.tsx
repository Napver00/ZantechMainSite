import React, { useState, useEffect } from 'react';
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
        <div className="bg-zan-light dark:bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            <section className="pt-32 pb-24 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl mb-6 animate-bounce">
                            <HelpCircle className="w-8 h-8 text-zan-blue dark:text-blue-400" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white font-heading mb-6">
                            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-blue to-zan-red">Questions</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Have a question? We're here to help. Find answers to our most common inquiries below.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {loading && (
                            <div className="text-center text-gray-600 dark:text-gray-300 py-12">
                                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-zan-blue mb-4"></div>
                                <p>Loading FAQs...</p>
                            </div>
                        )}

                        {error && (
                            <div className="text-center py-8 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-500/20">
                                <p className="text-red-600 dark:text-red-400 font-medium">Error: {error}</p>
                            </div>
                        )}

                        {!loading && !error && faqs.map((faq) => {
                            const isOpen = openFaqId === faq.id;
                            return (
                                <div
                                    key={faq.id}
                                    className={`bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                                            ? 'border-zan-blue/50 shadow-lg shadow-blue-500/10'
                                            : 'border-gray-100 dark:border-white/10 shadow-sm hover:border-zan-blue/30 hover:shadow-md'
                                        }`}
                                >
                                    <button
                                        onClick={() => handleToggle(faq.id)}
                                        className="w-full flex justify-between items-center p-6 text-left group"
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-zan-blue text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-zan-blue'
                                                }`}>
                                                <MessageCircle className="w-4 h-4" />
                                            </div>
                                            <span className={`text-lg font-bold font-heading transition-colors ${isOpen ? 'text-zan-blue dark:text-blue-400' : 'text-gray-900 dark:text-white group-hover:text-zan-blue dark:group-hover:text-blue-400'
                                                }`}>
                                                {faq.question}
                                            </span>
                                        </div>
                                        <ChevronDown
                                            className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-zan-blue dark:text-blue-400' : 'text-gray-400 group-hover:text-zan-blue'
                                                }`}
                                        />
                                    </button>
                                    <div
                                        className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="px-6 pb-6 pl-[4.5rem]">
                                            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
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