import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { ChevronDown } from 'lucide-react';

const FaqPage = () => {
    const [faqs, setFaqs] = useState([]);
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
            } catch (err) {
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
        // Changed background to a light gray for better contrast
        <section className="pt-32 pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                        Frequently Asked Questions
                    </h1>
                </div>

                <div className="space-y-4">
                    {loading && <p className="text-center text-gray-600 dark:text-gray-300">Loading FAQs...</p>}
                    {error && <p className="text-center text-red-500">Error: {error}</p>}

                    {!loading && !error && faqs.map((faq) => (
                        // Updated container for each FAQ item
                        <div key={faq.id} className="bg-emerald-50 dark:bg-gray-800 rounded-lg shadow-sm">
                            <button
                                onClick={() => handleToggle(faq.id)}
                                className="w-full flex justify-between items-center p-5 text-left text-lg font-semibold text-gray-800 dark:text-gray-200"
                            >
                                <span>{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 transition-transform duration-300 ${openFaqId === faq.id ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {/* Animated container for the answer */}
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaqId === faq.id ? 'max-h-screen' : 'max-h-0'
                                    }`}
                            >
                                <div className="px-5 pb-5 border-t border-emerald-200 dark:border-gray-700 pt-4">
                                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqPage;