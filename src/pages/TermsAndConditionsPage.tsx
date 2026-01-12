import React from 'react';

const TermsAndConditionsPage = () => {
    return (
        <div className="bg-zan-light dark:bg-zan-dark min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] right-[-10%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold text-gray-900 dark:text-white font-heading mb-4">
                            Terms and Conditions
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium bg-white dark:bg-white/5 px-4 py-2 rounded-full inline-block backdrop-blur-sm border border-gray-100 dark:border-white/10">
                            Last Updated: September 15, 2025
                        </p>
                    </div>

                    <div className="bg-white dark:bg-white/5 backdrop-blur-md p-6 md:p-12 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl">
                        <div className="prose prose-lg dark:prose-invert max-w-none 
                            prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                            prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                            prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-li:marker:text-zan-blue
                            prose-strong:text-gray-900 dark:prose-strong:text-white">

                            <p>
                                Welcome to Zantech. These Terms and Conditions ("Terms") govern your use of the Zantech website, purchase of products, and participation in our services, workshops, and programs ("Services"). Please read these Terms carefully. By accessing or using our Services, you agree to be bound by these Terms.
                            </p>

                            <h2>1. General Use</h2>
                            <p>You agree to use our Services only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of, our Services by any third party.</p>

                            <h2>2. Accounts</h2>
                            <p>To access certain features, such as purchasing products, you may need to create an account. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account.</p>

                            <h2>3. Sale of Products (Robotics & IoT Equipment)</h2>
                            <ul>
                                <li><strong>Product Descriptions:</strong> We strive to ensure that all product descriptions, images, and prices are accurate. However, we do not warrant that they are error-free. If a product is not as described, your sole remedy is to return it in unused condition.</li>
                                <li><strong>Orders:</strong> All orders are subject to acceptance and availability. We reserve the right to refuse or cancel an order for any reason, including limitations on quantities available for purchase, inaccuracies in product or pricing information, or problems identified by our fraud avoidance department.</li>
                                <li><strong>Payment:</strong> All prices are listed in Bangladeshi Taka (BDT). Payment must be made in full before dispatch of any products. We accept payments through our designated third-party payment gateways.</li>
                                <li><strong>Shipping:</strong> We will arrange for the shipment of the products to you. Shipping schedules are estimates only and cannot be guaranteed. The risk of loss and title for all products ordered pass to you upon our delivery to the carrier.</li>
                                <li><strong>Returns and Refunds:</strong> Please refer to our separate "Return Policy" page for detailed information on returning products. Generally, returns are accepted for defective or incorrect items within 7 days of receipt, provided they are in their original condition and packaging.</li>
                            </ul>

                            <h2>4. Workshops and Educational Services</h2>
                            <ul>
                                <li><strong>Registration:</strong> Our workshops are offered free of charge to students and educators as part of our mission. Registration is required and is subject to availability.</li>
                                <li><strong>Code of Conduct:</strong> All participants are expected to behave respectfully and collaboratively. We reserve the right to remove any participant who is disruptive or fails to comply with the instructions of Zantech staff.</li>
                                <li><strong>Photography and Videography Consent:</strong> By participating in our workshops or events, you grant Zantech the perpetual, worldwide right to use your likeness, image, and voice in photographs, videos, and other media for promotional, educational, and archival purposes without compensation. If you do not wish to be photographed or recorded, you must inform a Zantech representative at the start of the event.</li>
                                <li><strong>Materials:</strong> All hardware, tools, and instructional materials provided during workshops remain the property of Zantech unless otherwise specified.</li>
                            </ul>

                            <h2>5. Research & Development (R&D) Services</h2>
                            <p>Our custom R&D services for businesses are governed by separate, individual contracts. The terms outlined in those contracts will supersede these general Terms and Conditions for the scope of that specific project.</p>

                            <h2>6. Intellectual Property</h2>
                            <p>All content included on our website, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the site, is the property of Zantech or its suppliers and is protected by copyright and other laws.</p>
                            <p>You retain ownership of the intellectual property rights in the projects you create using our components or during our workshops. However, by sharing your project with us or our community, you grant us a non-exclusive, royalty-free license to feature, share, and display your project (with attribution to you) for promotional and educational purposes.</p>

                            <h2>7. Limitation of Liability</h2>
                            <p>To the fullest extent permitted by law, Zantech shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from: (a) your use of our Services or products; (b) any unauthorized access to or use of our servers and/or any personal information stored therein. (c) any defects or malfunctioning of components sold. Our liability is strictly limited to the replacement or refund of the purchased product.</p>

                            <h2>8. Indemnification</h2>
                            <p>You agree to indemnify and hold harmless Zantech and its employees from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, a-rising out of or in any way connected with your access to or use of the Services or your violation of these Terms.</p>

                            <h2>9. Governing Law</h2>
                            <p>These Terms shall be governed and construed in accordance with the laws of the People's Republic of Bangladesh, without regard to its conflict of law provisions. Any disputes will be resolved in the competent courts of Dhaka, Bangladesh.</p>

                            <h2>10. Changes to Terms</h2>
                            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes by posting the new Terms on our website.</p>

                            <h2>11. Contact Us</h2>
                            <p>If you have any questions about these Terms, please contact us at: Email: contact@zantech.com.bd</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsAndConditionsPage;