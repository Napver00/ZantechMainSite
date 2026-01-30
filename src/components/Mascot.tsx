
import { useState, useEffect } from 'react';
import mascotImg from '../assets/mascot.png';
import { X, MessageCircle } from 'lucide-react';

const Mascot = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showBubble, setShowBubble] = useState(false);
    const [message, setMessage] = useState("Hi! I'm Mascode. Welcome to Zantech!");
    const [isHovered, setIsHovered] = useState(false);

    // Show mascot after a delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Random messages
    const messages = [
        "Need help finding a course?",
        "Check out our new workshops!",
        "I run on React and Coffee!",
        "Have you seen our robotics kits?",
        "Building the future, together.",
        "Click me for a tip!",
        "Welcome to the tech revolution!"
    ];

    const handleInteraction = () => {
        if (!showBubble) {
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            setMessage(randomMsg);
        }
        setShowBubble(!showBubble);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Speech Bubble */}
            <div
                className={`mb-4 bg-white text-zan-dark p-4 rounded-lg shadow-xl relative max-w-xs transform transition-all duration-300 pointer-events-auto border-2 border-zan-cyan ${showBubble ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                    }`}
            >
                <button
                    onClick={() => setShowBubble(false)}
                    className="absolute -top-2 -right-2 bg-zan-red text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                >
                    <X size={14} />
                </button>
                <div className="text-sm font-medium font-mono leading-relaxed">
                    {message}
                </div>
                {/* Bubble tail */}
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-b-2 border-r-2 border-zan-cyan transform rotate-45"></div>
            </div>

            {/* Mascot Image */}
            <div
                className="relative cursor-pointer pointer-events-auto group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleInteraction}
            >
                {/* Ripple Effect Background */}
                <div className="absolute inset-0 bg-zan-cyan/20 rounded-full animate-ping opacity-75 group-hover:bg-zan-cyan/40"></div>

                {/* Glowing Aura */}
                <div className={`absolute inset-0 bg-zan-cyan/30 rounded-full blur-xl transition-all duration-500 ${isHovered ? 'scale-125 opacity-100' : 'scale-100 opacity-50'}`}></div>

                <img
                    src={mascotImg}
                    alt="Mascode"
                    className={`w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl transition-transform duration-500 ease-in-out ${isHovered ? 'scale-110 -rotate-3' : 'animate-float'
                        }`}
                />

                {/* Status Indicator */}
                <div className="absolute bottom-1 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>

            {/* Simple CSS animation style injection for cleaner code without external css file requirement if keyframes missing */}
            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Mascot;
