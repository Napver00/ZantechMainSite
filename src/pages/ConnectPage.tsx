import { useState, useEffect, useCallback } from 'react';
import { Mail, Phone, MapPin, Globe, BookOpen, Facebook, Instagram, Linkedin, Youtube, RotateCcw, Play } from 'lucide-react';
import { FaTiktok, FaWhatsapp } from 'react-icons/fa6';
import { API_BASE_URL } from '../config';
import mascot from '../assets/mascot.png';

interface SocialLink {
    platform: string;
    url: string;
}

interface CompanyData {
    email: string;
    phone: string;
    location: string;
    social_links: SocialLink[];
}

const ConnectPage = () => {
    const [companyInfo, setCompanyInfo] = useState<CompanyData>({
        email: 'zantechbd@gmail.com',
        phone: '+8801894634149',
        location: 'Dhaka, Bangladesh',
        social_links: []
    });

    // Tic-Tac-Toe State
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);
    const [isDraw, setIsDraw] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/company`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setCompanyInfo(prev => ({
                        ...prev,
                        ...data.data,
                        social_links: [
                            ...(data.data.social_links || []),
                            { platform: 'whatsapp', url: 'https://wa.me/+8801894634149' }
                        ]
                    }));
                }
            })
            .catch(err => console.error('Error fetching company info:', err));
    }, []);

    // Check for Winner
    const calculateWinner = useCallback((squares: any[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }, []);

    // AI Move
    useEffect(() => {
        if (!xIsNext && !winner && gameStarted) {
            const emptySquares = squares.map((s, i) => s === null ? i : null).filter(s => s !== null);
            if (emptySquares.length > 0) {
                const timeoutId = setTimeout(() => {
                    const randomIndex = Math.floor(Math.random() * emptySquares.length);
                    const move = emptySquares[randomIndex] as number;
                    const newSquares = squares.slice();
                    newSquares[move] = 'O';
                    setSquares(newSquares);
                    setXIsNext(true);

                    const win = calculateWinner(newSquares);
                    if (win) {
                        setWinner(win);
                    } else if (newSquares.every(s => s !== null)) {
                        setIsDraw(true);
                    }
                }, 600);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [xIsNext, winner, squares, gameStarted, calculateWinner]);

    const handleClick = (i: number) => {
        if (winner || squares[i] || !xIsNext || !gameStarted) return;

        const newSquares = squares.slice();
        newSquares[i] = 'X';
        setSquares(newSquares);
        setXIsNext(false);

        const win = calculateWinner(newSquares);
        if (win) {
            setWinner(win);
        } else if (newSquares.every(s => s !== null)) {
            setIsDraw(true);
        }
    };

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setWinner(null);
        setIsDraw(false);
    };

    const links = [
        {
            title: 'Official Website',
            url: '/',
            icon: <Globe className="w-5 h-5 text-zan-cyan" />,
            color: 'border-zan-cyan/50 hover:border-zan-cyan'
        },
        {
            title: 'Our Courses',
            url: '/courses',
            icon: <BookOpen className="w-5 h-5 text-zan-red" />,
            color: 'border-zan-red/50 hover:border-zan-red'
        },
        {
            title: 'ZAN Tech Store',
            url: 'https://store.zantechbd.com',
            icon: <Globe className="w-5 h-5 text-zan-cyan" />,
            color: 'border-zan-cyan/50 hover:border-zan-cyan',
            isExternal: true
        },
        {
            title: 'Project Uddipon',
            url: 'https://projectuddipon.zantechbd.com/',
            icon: <Globe className="w-5 h-5 text-zan-red" />,
            color: 'border-zan-red/50 hover:border-zan-red',
            isExternal: true
        }
    ];

    const getSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'facebook': return <Facebook className="w-5 h-5" />;
            case 'instagram': return <Instagram className="w-5 h-5" />;
            case 'linkedin': return <Linkedin className="w-5 h-5" />;
            case 'youtube': return <Youtube className="w-5 h-5" />;
            case 'tiktok': return <FaTiktok className="w-5 h-5" />;
            case 'whatsapp': return <FaWhatsapp className="w-5 h-5" />;
            default: return <Globe className="w-5 h-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-zan-dark text-white font-sans relative overflow-hidden flex flex-col items-center py-12 px-4 pt-24 selection:bg-zan-cyan/30">
            {/* Background Animations */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-zan-cyan/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-zan-red/10 rounded-full blur-[120px] animate-pulse"></div>

            {/* Scanning Line HUD Effect */}
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-zan-cyan/20 to-transparent absolute top-0 animate-[scan_4s_linear_infinite]"></div>
            </div>

            {/* Tic-Tac-Toe Game Overlay */}
            {!showContent && (
                <div className={`fixed inset-0 z-[100] bg-zan-dark flex flex-col items-center justify-center p-6 transition-all duration-1000 ${winner || isDraw ? 'bg-zan-dark/95' : ''}`}>
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

                    <div className="max-w-md w-full flex flex-col items-center space-y-8 relative z-10">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-black font-heading tracking-widest uppercase italic animate-fade-in">
                                Tic-Tac-<span className="text-zan-red text-shadow-red">TOE</span>
                            </h2>
                            <p className="text-zan-cyan text-[10px] tracking-[0.4em] uppercase font-bold opacity-60">System Access Protocol</p>
                        </div>

                        {/* Game Status */}
                        <div className="h-8 flex items-center justify-center">
                            {winner ? (
                                <span className={`text-xl font-bold uppercase tracking-widest animate-bounce ${winner === 'X' ? 'text-zan-cyan' : 'text-zan-red'}`}>
                                    {winner === 'X' ? 'You Win!' : 'System Wins!'}
                                </span>
                            ) : isDraw ? (
                                <span className="text-xl font-bold uppercase tracking-widest text-gray-400">It's a Draw!</span>
                            ) : gameStarted ? (
                                <span className="text-sm font-mono tracking-widest text-zan-cyan/70 animate-pulse">
                                    {xIsNext ? 'Your Turn (X)' : 'System thinking (O)...'}
                                </span>
                            ) : (
                                <span className="text-sm font-mono tracking-widest text-gray-500">Ready to play?</span>
                            )}
                        </div>

                        {/* Game Board */}
                        <div className="grid grid-cols-3 gap-3 bg-white/5 p-4 rounded-sm border border-white/10 backdrop-blur-md shadow-2xl relative">
                            {/* Board corners */}
                            <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-zan-cyan"></div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-zan-cyan"></div>

                            {squares.map((square, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleClick(i)}
                                    disabled={!gameStarted || !!square || !!winner || isDraw || !xIsNext}
                                    className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-4xl font-black rounded-sm border transition-all duration-300 relative overflow-hidden group
                                        ${!square && gameStarted && xIsNext ? 'border-white/10 hover:border-zan-cyan/50 hover:bg-zan-cyan/5' : 'border-white/5 bg-white/[0.02]'}
                                        ${square === 'X' ? 'text-zan-cyan border-zan-cyan/30 bg-zan-cyan/5 shadow-[0_0_15px_rgba(0,240,255,0.1)]' : ''}
                                        ${square === 'O' ? 'text-zan-red border-zan-red/30 bg-zan-red/5 shadow-[0_0_15px_rgba(237,38,38,0.1)]' : ''}
                                    `}
                                >
                                    {square && (
                                        <span className="animate-scale-in">
                                            {square}
                                        </span>
                                    )}
                                    {!square && gameStarted && xIsNext && (
                                        <span className="opacity-0 group-hover:opacity-10 text-white">X</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col items-center space-y-4 w-full">
                            {!gameStarted ? (
                                <button
                                    onClick={() => setGameStarted(true)}
                                    className="px-10 py-4 bg-zan-cyan text-black font-black uppercase tracking-[0.3em] rounded-sm hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(0,240,255,0.3)] flex items-center space-x-3"
                                >
                                    <Play className="w-5 h-5 fill-current" />
                                    <span>Start System</span>
                                </button>
                            ) : (winner || isDraw) ? (
                                <div className="flex flex-col items-center space-y-6 animate-fade-in w-full">
                                    <button
                                        onClick={() => setShowContent(true)}
                                        className="w-full py-4 bg-gradient-to-r from-zan-cyan to-zan-blue text-white font-black uppercase tracking-[0.3em] rounded-sm border border-zan-cyan/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all transform hover:scale-[1.02]"
                                    >
                                        Proceed to Hub
                                    </button>
                                    <button
                                        onClick={resetGame}
                                        className="flex items-center space-x-2 text-xs text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
                                    >
                                        <RotateCcw className="w-3 h-3" />
                                        <span>Replay System</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.4em]">Grid_Sync: Active...</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content (Fades in after game) */}
            <div className={`w-full max-w-lg flex flex-col items-center transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                {/* Profile Section */}
                <div className="flex flex-col items-center mb-10 relative z-10">
                    <div className="relative group mb-6">
                        <div className="absolute -inset-6 bg-gradient-to-r from-zan-cyan/20 to-zan-red/20 blur-2xl group-hover:opacity-100 transition-opacity rounded-full opacity-50"></div>
                        <div className="relative w-32 h-32 md:w-36 md:h-36 bg-surface-dark border-2 border-zan-cyan/30 rounded-full overflow-hidden flex items-center justify-center p-2 shadow-[0_0_30px_rgba(0,240,255,0.15)] group-hover:shadow-[0_0_40px_rgba(0,240,255,0.25)] transition-all duration-500">
                            <img src={mascot} alt="ZAN Tech Mascot" className="w-full h-auto object-contain animate-float" />
                        </div>
                        {/* HUD corner decorations */}
                        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-zan-cyan/50"></div>
                        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-zan-red/50"></div>
                        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-zan-red/50"></div>
                        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-zan-cyan/50"></div>
                    </div>

                    <div className="flex flex-col items-center space-y-3">
                        <img src="/zantech_logo.png" alt="ZAN Tech Logo" className="h-12 w-auto mb-1 animate-pulse" />
                        <h1 className="text-4xl font-black font-heading tracking-tighter uppercase italic">
                            ZAN<span className="text-zan-red">TECH</span>
                        </h1>
                        <div className="flex items-center space-x-4">
                            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-zan-cyan"></div>
                            <p className="text-zan-cyan text-[10px] tracking-[0.5em] font-bold uppercase whitespace-nowrap">Hub Interface 1.0</p>
                            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-zan-cyan"></div>
                        </div>
                    </div>
                </div>

                {/* Links Section */}
                <div className="w-full space-y-4 relative z-10 px-2 md:px-0">
                    {links.map((link, idx) => (
                        <a
                            key={idx}
                            href={link.url}
                            target={link.isExternal ? "_blank" : "_self"}
                            rel={link.isExternal ? "noopener noreferrer" : ""}
                            className={`group flex items-center bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-xl p-5 border-l-4 ${link.color} rounded-sm transition-all duration-300 hover:translate-x-2 relative overflow-hidden group shadow-lg border-y border-r border-white/5`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-zan-cyan/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                            <div className="mr-6 p-2.5 bg-white/5 rounded-sm border border-white/10 group-hover:border-zan-cyan/30 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all">
                                {link.icon}
                            </div>
                            <span className="flex-1 font-bold tracking-widest uppercase text-sm group-hover:text-zan-cyan transition-colors">{link.title}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-zan-cyan/30 group-hover:bg-zan-cyan animate-ping"></div>
                        </a>
                    ))}

                    <div className="py-2 flex items-center justify-center space-x-4">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                        <span className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.3em]">Neural Connections</span>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
                    </div>

                    {/* Dynamic Social Links */}
                    <div className="grid grid-cols-2 gap-4">
                        {companyInfo.social_links.map((social, idx) => (
                            <a
                                key={`social-${idx}`}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center justify-center bg-white/[0.02] hover:bg-white/[0.07] backdrop-blur-lg p-6 border border-white/5 hover:border-zan-cyan/40 rounded-sm transition-all duration-300 hover:scale-[1.05] relative overflow-hidden text-gray-400 hover:text-white"
                            >
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-zan-cyan"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-zan-cyan"></div>

                                <div className="mb-3 transition-transform duration-300 group-hover:scale-110">
                                    {getSocialIcon(social.platform)}
                                </div>
                                <span className="font-bold tracking-[0.2em] uppercase text-[10px] opacity-70 group-hover:opacity-100">{social.platform}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mt-12 w-full bg-surface-dark/40 border border-white/5 p-8 rounded-sm space-y-6 relative z-10 backdrop-blur-md">
                    <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-zan-red/40 uppercase">Encrypted_Comm_Line</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-4 group">
                            <div className="p-2 bg-zan-red/10 rounded-sm group-hover:bg-zan-red/20 transition-colors">
                                <Mail className="w-4 h-4 text-zan-red" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] text-gray-500 uppercase font-bold tracking-tighter">Email Interface</span>
                                <span className="text-xs font-medium group-hover:text-zan-cyan transition-colors">{companyInfo.email}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 group">
                            <div className="p-2 bg-zan-cyan/10 rounded-sm group-hover:bg-zan-cyan/20 transition-colors">
                                <Phone className="w-4 h-4 text-zan-cyan" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] text-gray-500 uppercase font-bold tracking-tighter">Direct Uplink</span>
                                <span className="text-xs font-medium group-hover:text-zan-cyan transition-colors">{companyInfo.phone}</span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex items-center space-x-4 group">
                        <MapPin className="w-4 h-4 text-zan-red/50 group-hover:text-zan-red transition-colors" />
                        <span className="text-[10px] text-gray-400 group-hover:text-gray-200 transition-colors uppercase tracking-widest">{companyInfo.location}</span>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="mt-16 pb-8 flex flex-col items-center space-y-4 opacity-40 hover:opacity-100 transition-opacity duration-500">
                    <div className="flex space-x-8 text-[9px] font-mono tracking-[0.3em] uppercase">
                        <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-zan-cyan rounded-full animate-pulse"></div>
                            <span>Sys_Ok</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-zan-red rounded-full"></div>
                            <span>Net_Sec_Max</span>
                        </div>
                    </div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-[0.4em]">
                        &copy; {new Date().getFullYear()} ZAN Tech Digital Card System
                    </div>
                </div>
            </div>

            {/* Custom Animations */}
            <style>{`
                @keyframes scan {
                    0% { top: -10%; }
                    100% { top: 110%; }
                }
                @keyframes scale-in {
                    0% { transform: scale(0); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
                .text-shadow-red {
                    text-shadow: 0 0 10px rgba(237, 38, 38, 0.5);
                }
            `}</style>
        </div>
    );
};

export default ConnectPage;
