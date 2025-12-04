import React from 'react';

const PrivacyPolicyPage = () => {
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
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white font-heading mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium bg-white dark:bg-white/5 px-4 py-2 rounded-full inline-block backdrop-blur-sm border border-gray-100 dark:border-white/10">
                            Last Updated: September 15, 2025
                        </p>
                    </div>

                    <div className="bg-white dark:bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl">
                        <div className="prose prose-lg dark:prose-invert max-w-none 
                            prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                            prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                            prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-li:marker:text-zan-blue
                            prose-strong:text-gray-900 dark:prose-strong:text-white">

                            <h2>1. Introduction</h2>
                            <p>
                                Welcome to Zantech. We are dedicated to building Bangladesh's next generation of innovators. This Privacy Policy explains how Zantech ("we," "us," or "our") collects, uses, shares, and protects information about you when you use our website, purchase our products, participate in our workshops, or use any of our other services (collectively, the "Services").
                            </p>
                            <p>
                                We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. By using our Services, you agree to the collection and use of information in accordance with this policy.
                            </p>

                            <h2>2. Information We Collect</h2>
                            <p>We collect information in several ways to provide and improve our Services:</p>
                            <h3>Information You Provide to Us:</h3>
                            <ul>
                                <li><strong>Account & Purchase Information:</strong> When you create an account or purchase products from us, we collect your name, shipping address, email address, phone number, and order details. Payment information is processed securely by our third-party payment gateways; we do not store your credit card details.</li>
                                <li><strong>Workshop Registration:</strong> When you register for our free workshops, we collect information such as your name, school/college/university name, grade or academic level, email address, and phone number.</li>
                                <li><strong>Communications:</strong> When you contact us for support, R&D inquiries, or general questions, we may keep a record of that communication, including your contact details.</li>
                                <li><strong>Community Engagement:</strong> If you participate in our community forums or submit projects, we may collect your username and the content you provide.</li>
                            </ul>
                            <h3>Information from Workshops and Events:</h3>
                            <ul>
                                <li><strong>Photography and Videography:</strong> We frequently take photographs and record videos during our workshops and events to showcase our impact, use in promotional materials, and share with our community. Your participation in these events implies consent to be included in such media. If you do not wish to be photographed or recorded, please inform a Zantech representative at the event.</li>
                            </ul>
                            <h3>Information We Collect Automatically:</h3>
                            <ul>
                                <li><strong>Usage Data:</strong> When you visit our website, we may automatically collect information such as your IP address, browser type, operating system, pages viewed, and the dates/times of your visits.</li>
                                <li><strong>Cookies and Similar Technologies:</strong> We use cookies to enhance your experience on our website, such as keeping you logged in and remembering your cart contents. You can instruct your browser to refuse all cookies, but some parts of our Service may not function properly.</li>
                            </ul>

                            <h2>3. How We Use Your Information</h2>
                            <p>We use the information we collect for the following purposes:</p>
                            <h3>To Provide and Manage Our Services:</h3>
                            <ul>
                                <li>To process and fulfill your orders for robotic components and educational kits.</li>
                                <li>To manage your registration and participation in our workshops.</li>
                                <li>To provide R&D services and communicate with our business partners.</li>
                                <li>To provide customer support and respond to your inquiries.</li>
                            </ul>
                            <h3>To Improve and Personalize Our Services:</h3>
                            <ul>
                                <li>To understand how our users interact with our website and services to make improvements.</li>
                                <li>To develop new products, services, and educational content.</li>
                            </ul>
                            <h3>For Communication and Marketing:</h3>
                            <ul>
                                <li>To send you important updates about your orders, our workshops, or changes to our policies.</li>
                                <li>To inform you about new products, events, and opportunities, but only with your explicit consent. You can opt-out of marketing communications at any time.</li>
                            </ul>
                            <h3>To Fulfill Our Mission:</h3>
                            <ul>
                                <li>To showcase our impact and community projects on our website and social media (using photos, videos, and project details, always with respect for privacy).</li>
                            </ul>

                            <h2>4. How We Share Your Information</h2>
                            <p>We do not sell your personal information to third parties. We may share your information only in the following circumstances:</p>
                            <ul>
                                <li><strong>Service Providers:</strong> We share information with third-party companies that help us operate our business, such as payment processors, shipping carriers, and email service providers. These partners are obligated to protect your information and use it only for the services they provide to us.</li>
                                <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to a valid request from a public authority.</li>
                                <li><strong>Educational Partners:</strong> We may share aggregated, non-identifiable data with our partner schools, colleges, and universities to report on workshop attendance and impact.</li>
                            </ul>

                            <h2>5. Data Security</h2>
                            <p>We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee its absolute security.</p>

                            <h2>6. Children's Privacy</h2>
                            <p>Our mission involves educating students of all ages. For users under the age of 16, we require consent from a parent or legal guardian to register for our workshops or create an account. If we learn that we have collected personal information from a child without parental consent, we will take steps to delete that information as soon as possible.</p>

                            <h2>7. Your Rights</h2>
                            <p>You have the right to access, correct, or delete your personal information. If you have an account with us, you can review and update your information by logging in. For other requests, please contact us at privacy@zantech.com.bd.</p>

                            <h2>8. Changes to This Privacy Policy</h2>
                            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.</p>

                            <h2>9. Contact Us</h2>
                            <p>If you have any questions about this Privacy Policy, please contact us at: Email: contact@zantech.com.bd</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;