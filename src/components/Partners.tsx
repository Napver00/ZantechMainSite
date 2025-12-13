import React from 'react';

// NOTE: Replace these with your actual partner logos and alt text
const partners = [
    { src: 'https://th.bing.com/th/id/R.89b3484f0bb1c6fb12f7e4c7880d42bf?rik=pvnkVQjLqY%2bR9g&riu=http%3a%2f%2fiub.ac.bd%2fmeta_logo.png&ehk=e%2fdCGi3JgAIpePSCFgf2Rc8Zm7CZdJMZilKKHYLI31w%3d&risl=&pid=ImgRaw&r=0', alt: 'IUB Logo' },
    { src: 'https://tse4.mm.bing.net/th/id/OIP.CrWcbldpESZqELMjlxqurwHaJ7?rs=1&pid=ImgDetMain&o=7&rm=3', alt: 'Feni Government College  Logo' },
    { src: 'https://wikiwandv2-19431.kxcdn.com/_next/image?url=https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Adamjee_Cantonment_College_Monogram.svg/640px-Adamjee_Cantonment_College_Monogram.svg.png&w=640&q=50', alt: 'adamjee cantonment college Logo' },
    { src: 'https://th.bing.com/th/id/R.648c35d20baa133db5aeb29162fab957?rik=oO7gWAI4delLnw&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fen%2f3%2f3f%2fScholastica_school_logo.png&ehk=C5ybHRv99T1v3uXfVIw4KE2qoD%2f6PWlq3vG2Urrviqg%3d&risl=&pid=ImgRaw&r=0', alt: 'scholastica school Logo' },
    { src: 'https://media.licdn.com/dms/image/C560BAQG6yYchlzVRxg/company-logo_200_200/0/1672760960978/faridpur_engineering_college_fec_logo?e=2147483647&v=beta&t=RM_zsJK96MNKMMFPzc4aVgFWOTWU4_-OfIM637zZ-Dg', alt: 'faridpur engineering college Logo' },
    { src: 'https://iiec.iubat.edu/assets/images/iiec-logo.png', alt: 'iubat iiec Logo' },
    { src: 'https://th.bing.com/th/id/R.ad08d41a78fa1b957b689cd79df9deaa?rik=A0QumI1J%2bDVQ9g&riu=http%3a%2f%2ffablabiub.com%2fwp-content%2fuploads%2f2022%2f03%2ffab-logo-1.png&ehk=05M%2bajETtNeRKGrGoSlBWWTpIa4osY9Vwo%2brcZvjFZI%3d&risl=&pid=ImgRaw&r=0', alt: 'iub fablab Logo' },
    { src: 'https://upload.wikimedia.org/wikipedia/bn/d/da/%E0%A6%AB%E0%A7%87%E0%A6%A8%E0%A7%80_%E0%A6%B8%E0%A6%B0%E0%A6%95%E0%A6%BE%E0%A6%B0%E0%A6%BF_%E0%A6%AA%E0%A6%BE%E0%A6%87%E0%A6%B2%E0%A6%9F_%E0%A6%89%E0%A6%9A%E0%A7%8D%E0%A6%9A_%E0%A6%AC%E0%A6%BF%E0%A6%A6%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B2%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.jpeg', alt: 'ফেনী সরকারি পাইলট উচ্চ বিদ্যালয়' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-HgNpLXrm6gRYAzs_hrqMIHXK5_skV18GJQ&s', alt: 'Sonagazi Girl Pilot hign School' },
    { src: 'https://lh5.googleusercontent.com/proxy/0FzVLVmdXW-li9fPXf37oCSQxiOXUz6WsoIHS-GqJa_uiQbP9ilV_W9KlQ-svPiXBiQKb7ST', alt: 'Sharishadi High School' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7HLUi-ZK7sNWYcU_dUj6zqmbBB62Vn509Pg&s', alt: 'Feni Govt. College Science Club' },
    { src: 'https://tse3.mm.bing.net/th/id/OIP.M7nIQsm1yCHG2LNeE5N1oAHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', alt: 'St Joseph International School' },
];

const Partners = () => {
    return (
        <section className="py-24 bg-zan-light dark:bg-zan-dark relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-zan-blue/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-zan-red/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white font-heading mb-4">
                        Our Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-zan-blue to-zan-red">Collaborators</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We collaborate with top organizations to deliver excellence and innovation.
                    </p>
                </div>

                <div className="relative w-full overflow-hidden">
                    {/* Gradient Masks for smooth fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-zan-light dark:from-zan-dark to-transparent"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-zan-light dark:from-zan-dark to-transparent"></div>

                    <div className="flex w-full">
                        <ul className="flex items-center gap-12 animate-scroll py-8">
                            {/* Original List */}
                            {partners.map((partner, index) => (
                                <li key={index} className="flex-shrink-0 group">
                                    <div className="bg-white dark:bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-lg transition-all duration-300 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transform hover:-translate-y-1">
                                        <img
                                            src={partner.src}
                                            alt={partner.alt}
                                            className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                </li>
                            ))}
                            {/* Clone List for Loop */}
                            {partners.map((partner, index) => (
                                <li key={`clone-${index}`} className="flex-shrink-0 group" aria-hidden="true">
                                    <div className="bg-white dark:bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-lg transition-all duration-300 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transform hover:-translate-y-1">
                                        <img
                                            src={partner.src}
                                            alt={partner.alt}
                                            className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;