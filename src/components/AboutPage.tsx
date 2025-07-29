import React from 'react';

const AboutPage = () => {
    return (
        <section className="pt-32 pb-20 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <img src="/ZAN Tech Logo.png" alt="ZAN Tech Logo" className="w-48 mx-auto mb-6" />
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Welcome to <span className="text-zan-blue">Zantech</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        We are more than just a company; we are a dream.
                    </p>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
                    <p>
                        Our dream is to make technology easy to access for everyone in Bangladesh. We don’t just sell parts—we build a community where students, hobbyists, and businesses can learn, create, and grow together.
                    </p>
                    <p>
                        Our journey started with a simple idea: to give every person with a great idea the tools they need to make it real.
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
                    <p>
                        Our mission is simple: to give every student, creator, and company in Bangladesh the tools, knowledge, and support they need to build amazing things with robotics and the Internet of Things (IoT).
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
                    <p>
                        We dream of a Bangladesh that is a leader in technology. We want the "Made in Bangladesh" tag to be famous for high-quality, innovative smart devices. We are here to help build that future, one project at a time.
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What We Do</h2>
                    <p>
                        Zantech is your complete technology partner. We offer four main services:
                    </p>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <strong>Selling Robotics and IoT Parts:</strong> We sell high-quality, original parts for your projects. From basics like Arduino boards and sensors to advanced components, we have everything you need to get started. We always make sure our products are reliable.
                        </li>
                        <li>
                            <strong>Research and Development (R&D) Help:</strong> Have a great idea but need some help? Our expert team is here for you. We can help you design, build, and test your projects, from simple school projects to complex inventions for your business.
                        </li>
                        <li>
                            <strong>Making Our Own IoT Devices:</strong> We are not just sellers; we are makers, too! We design and build our own IoT devices right here in Bangladesh. Our products are made to solve local problems, from smart farming to making industries more efficient.
                        </li>
                        <li>
                            <strong>Community and Support:</strong> We believe that learning together is best. We run a helpful Facebook community, host workshops, and provide friendly support even after you purchase a product. You are never alone on your tech journey with Zantech.
                        </li>
                    </ol>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose Zantech?</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Everything in One Place:</strong> Find parts, get expert help, and join a community, all with us.</li>
                        <li><strong>Local Experts:</strong> As a Bangladeshi company, we understand the local needs and challenges better than anyone.</li>
                        <li><strong>We Love Innovation:</strong> We are always working with the latest technology and even build our own products.</li>
                        <li><strong>Friendly Support:</strong> We are here to help you succeed. Your success is our success.</li>
                    </ul>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Join Our Journey</h2>
                    <p>
                        Whether you are a student with your first project, a hobbyist building something fun, or a business looking for a tech solution, we welcome you.
                    </p>
                    <p>
                        Explore our products, join our online community, or contact us to talk about your next big idea.
                    </p>
                    <p className="font-semibold text-center text-lg">
                        Let's build a smarter future for Bangladesh, together.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;