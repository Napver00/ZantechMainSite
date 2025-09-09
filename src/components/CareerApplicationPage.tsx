import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '/src/config';
// Import ReactQuill and its CSS
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CareerApplicationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [jobTitle, setJobTitle] = useState('');
    // State for the rich text editor content
    const [coverLetter, setCoverLetter] = useState('');
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);

    // Fetch job title to display on the form
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
        if (e.target.files) {
            setCvFile(e.target.files[0]);
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

        // Manually create FormData to include Quill content and file
        const target = e.target as typeof e.target & {
            name: { value: string };
            email: { value: string };
            phone: { value: string };
        };

        const formData = new FormData();
        formData.append('name', target.name.value);
        formData.append('email', target.email.value);
        formData.append('phone', target.phone.value);
        formData.append('cover_letter', coverLetter); // Add rich text content from state
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

    // Configuration for the Quill editor toolbar
    const quillModules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
             {'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            ['clean']
        ],
    };

    return (
        <section className="pt-32 pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                        You are applying for
                    </h1>
                    <h2 className="text-3xl font-extrabold text-zan-blue dark:text-blue-400 mb-8">
                        {jobTitle || "Loading position..."}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name*</label>
                            <input type="text" name="name" id="name" required className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-zan-blue focus:border-zan-blue dark:bg-gray-700" placeholder="Enter Name" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email*</label>
                            <input type="email" name="email" id="email" required className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-zan-blue focus:border-zan-blue dark:bg-gray-700" placeholder="Enter Email" />
                        </div>
                         <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone*</label>
                            <input type="tel" name="phone" id="phone" required className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-zan-blue focus:border-zan-blue dark:bg-gray-700" placeholder="Enter Phone Number" />
                        </div>
                        <div>
                            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cover Letter*</label>
                            {/* Replace textarea with ReactQuill */}
                            <div className="bg-white dark:bg-gray-700 dark:text-gray-200">
                                <ReactQuill 
                                    theme="snow" 
                                    value={coverLetter} 
                                    onChange={setCoverLetter}
                                    modules={quillModules}
                                    placeholder="Tell us why you're a great fit for this role..."
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="cv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">CV*</label>
                            <input type="file" name="cv" id="cv" required onChange={handleFileChange} accept=".pdf,.doc,.docx" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zan-blue/10 file:text-zan-blue hover:file:bg-zan-blue/20 dark:file:bg-blue-300/20 dark:file:text-blue-300 dark:hover:file:bg-blue-300/30"/>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX up to 5MB.</p>
                        </div>
                        
                        {statusMessage.text && (
                            <div className={`text-center p-3 rounded-md ${
                                statusMessage.type === 'success' ? 'bg-green-100 text-green-800' :
                                statusMessage.type === 'error' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                            }`}>
                                {statusMessage.text}
                            </div>
                        )}

                        <div className="flex items-center justify-end space-x-4 pt-4">
                            <Link to={`/career/${id}`} className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                Cancel
                            </Link>
                            <button type="submit" disabled={isLoading} className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {isLoading ? 'Submitting...' : 'Apply Now'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CareerApplicationPage;

