import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ArrowLeft, Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const CareerApplicationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [jobTitle, setJobTitle] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        const fetchJobTitle = async () => {
            if (!id) return;
            try {
                const response = await fetch(`${API_BASE_URL}/api/careers/${id}`);
                const apiResponse = await response.json();
                if (apiResponse.success) {
                    setJobTitle(apiResponse.data.job_title);
                }
            } catch (error) {
                console.error("Failed to fetch job title", error);
                setJobTitle('the selected position');
            }
        };
        fetchJobTitle();
    }, [id]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCvFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!cvFile) {
            setStatusMessage({ type: 'error', text: 'Please upload your CV.' });
            return;
        }
        if (!coverLetter || coverLetter === '<p><br></p>') {
            setStatusMessage({ type: 'error', text: 'Please write a cover letter.' });
            return;
        }

        setIsLoading(true);
        setStatusMessage({ type: 'info', text: 'Submitting your application...' });

        const target = e.target as typeof e.target & {
            name: { value: string };
            email: { value: string };
            phone: { value: string };
        };

        const formData = new FormData();
        formData.append('name', target.name.value);
        formData.append('email', target.email.value);
        formData.append('phone', target.phone.value);
        formData.append('cover_letter', coverLetter);
        formData.append('cv', cvFile);

        try {
            const response = await fetch(`${API_BASE_URL}/api/careers/forms/${id}`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setStatusMessage({ type: 'success', text: 'Application submitted successfully! Redirecting...' });
                setTimeout(() => navigate(`/career/${id}`), 2000);
            } else {
                const errorMessage = result.message || 'Failed to submit application. Please try again.';
                setStatusMessage({ type: 'error', text: errorMessage });
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatusMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const quillModules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ],
    };

    return (
        <section className="pt-32 pb-24 bg-zan-light dark:bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <Link to={`/career/${id}`} className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-zan-blue dark:hover:text-blue-400 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Job Details
                </Link>

                <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-white/10 shadow-xl">
                    <div className="mb-8">
                        <h1 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-1">
                            You are applying for
                        </h1>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-heading">
                            {jobTitle || "Loading position..."}
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name*</label>
                                <input type="text" name="name" id="name" required className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-zan-blue/50 focus:border-zan-blue outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400" placeholder="Enter Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address*</label>
                                <input type="email" name="email" id="email" required className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-zan-blue/50 focus:border-zan-blue outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400" placeholder="Enter Email" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number*</label>
                            <input type="tel" name="phone" id="phone" required className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-zan-blue/50 focus:border-zan-blue outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400" placeholder="Enter Phone Number" />
                        </div>

                        <div>
                            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Cover Letter*</label>
                            <div className="bg-white dark:bg-black/20 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 focus-within:ring-2 focus-within:ring-zan-blue/50 focus-within:border-zan-blue transition-all">
                                <ReactQuill
                                    theme="snow"
                                    value={coverLetter}
                                    onChange={setCoverLetter}
                                    modules={quillModules}
                                    placeholder="Tell us why you're a great fit for this role..."
                                    className="dark:text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="cv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Upload CV (PDF, DOC, DOCX)*</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 dark:border-white/10 border-dashed rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer relative">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-10 w-10 text-gray-400 group-hover:text-zan-blue transition-colors" />
                                    <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                                        <label htmlFor="cv" className="relative cursor-pointer rounded-md font-medium text-zan-blue hover:text-blue-600 focus-within:outline-none">
                                            <span>Upload a file</span>
                                            <input id="cv" name="cv" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx" required />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    {fileName ? (
                                        <p className="text-xs text-zan-blue font-medium mt-2 bg-blue-50 dark:bg-blue-900/20 py-1 px-2 rounded-lg inline-block">{fileName}</p>
                                    ) : (
                                        <p className="text-xs text-gray-500 dark:text-gray-500">Up to 5MB</p>
                                    )}
                                </div>
                                <div className="absolute inset-0" onClick={() => document.getElementById('cv')?.click()}></div>
                            </div>
                        </div>

                        {statusMessage.text && (
                            <div className={`flex items-center space-x-2 p-4 rounded-xl ${statusMessage.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                                    statusMessage.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                                        'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                }`}>
                                {statusMessage.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                <p className="text-sm font-medium">{statusMessage.text}</p>
                            </div>
                        )}

                        <div className="flex items-center justify-end space-x-4 pt-4">
                            <Link
                                to={`/career/${id}`}
                                className="px-6 py-3 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-8 py-3 bg-gradient-to-r from-zan-blue to-blue-700 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Submitting...
                                    </>
                                ) : 'Apply Now'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CareerApplicationPage;
