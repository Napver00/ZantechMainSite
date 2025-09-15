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
];

const Partners = () => {
    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                        Our Trusted Collaborators
                    </h2>
                </div>

                <div className="mt-12 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                    <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-scroll">
                        {/* Render the list of logos */}
                        {partners.map((partner, index) => (
                            <li key={index}>
                                <img src={partner.src} alt={partner.alt} className="max-h-16" />
                            </li>
                        ))}
                        {/* Render the list of logos again for a seamless loop */}
                        {partners.map((partner, index) => (
                             <li key={`clone-${index}`} aria-hidden="true">
                                <img src={partner.src} alt={partner.alt} className="max-h-16" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Partners;