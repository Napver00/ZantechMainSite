import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const About = () => {
    const [aboutData, setAboutData] = useState({
        about_title: '',
        about_description1: '',
        about_description2: ''
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/company`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setAboutData({
                        about_title: data.data.about_title,
                        about_description1: data.data.about_description1,
                        about_description2: data.data.about_description2
                    });
                }
            })
            .catch(error => console.error('Error fetching about data:', error));
    }, []);

    // Content adapted for ZAN Tech's focus areas, matching the new UI structure
    const ourFocus = [
        {
            title: 'Students & Educators',
            description: 'We partner with schools, colleges, and universities across Bangladesh to conduct free, hands-on workshops. Our mission is to ignite a passion for technology by teaching students the fundamentals of robotics, programming, and AI/ML, preparing them for the challenges of tomorrow.'
        },
        {
            title: 'Innovators & Hobbyists',
            description: 'For the builders, dreamers, and creators, we provide a curated selection of high-quality robotic equipment. From essentials like Arduino Uno and ESP modules to motor drivers and sensors, we supply the crucial components needed to bring innovative projects to life.'
        },
        {
            title: 'Future Creators',
            description: 'Our next frontier is developing intuitive and engaging educational products. We are designing kits and tools that will make learning robotics and programming a simple and enjoyable experience for students and children, breaking down complex concepts into fun, accessible projects.'
        },
        {
            title: 'Business & Industry Partners',
            description: 'We leverage our technical expertise to drive corporate innovation. Zantech offers specialized Research and Development (R&D) services, collaborating with other companies to design, build, and prototype cutting-edge solutions for their unique business challenges.'
        }
    ];

    return (
        <section id="about" className="py-20 bg-zan-blue text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-16 items-start">

                    {/* Left Column: "Who We Are" */}
                    <div className="lg:col-span-1">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                            {aboutData.about_title}
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {aboutData.about_description1}
                        </p>
                    </div>

                    {/* Right Column: List of focus areas */}
                    <div className="lg:col-span-2">
                        <div>
                            {ourFocus.map((item, index) => (
                                <div key={index}>
                                    {index > 0 && <hr className="my-8 border-blue-900" />}
                                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;