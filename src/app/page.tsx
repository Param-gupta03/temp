"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import SvgLogo from '@/svg';

const ComingSoonPage = () => {
    const router = useRouter();

    const handleStayUpdatedClick = () => {
        router.push('/subscribe');
    };

    const handleSneakPeekClick = () => {
        router.push('/home');
    };

    return (
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center py-12 px-4 bg-slate-800/40 rounded-[3rem] border border-slate-700 shadow-2xl relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-500/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>

            <div className="animate-bounce-slow mb-8 relative z-10">
                <div className="bg-green-500/20 p-6 rounded-[2rem] border border-green-500/20">
                    <SvgLogo width="100" height="100" className="text-green-500 mx-auto md:w-28 md:h-28" />
                </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 animate-fade-in relative z-10">
                Green <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Turtle</span>
            </h1>

            <p className="text-2xl md:text-3xl font-bold text-slate-300 mb-8 animate-fade-in delay-200 relative z-10 uppercase tracking-widest">
                Launching Soon
            </p>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 animate-fade-in delay-400 relative z-10 leading-relaxed font-medium">
                Get ready for a revolutionary marketplace connecting you with the best eco-friendly products. We're building a greener future, one sustainable choice at a time.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                <button
                    onClick={handleStayUpdatedClick}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-green-900/20 hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-105 animate-fade-in delay-600"
                >
                    Stay Updated
                </button>

                <button
                    onClick={handleSneakPeekClick}
                    className="bg-slate-900 border border-slate-700 text-slate-200 font-bold py-4 px-10 rounded-2xl hover:bg-slate-800 transition transform hover:scale-105 animate-fade-in delay-700 flex items-center gap-2"
                >
                    Sneak Peek <span>→</span>
                </button>
            </div>

            {/* Note: In Next.js, we prefer Tailwind for animations or CSS modules, but style jsx works if configured. 
                Standard Tailwind animations are already in tailwind.config.ts if added.
                For now, keeping inline styles as they were. */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 1s ease-out forwards; }
                .animate-fade-in.delay-200 { animation-delay: 0.2s; }
                .animate-fade-in.delay-400 { animation-delay: 0.4s; }
                .animate-fade-in.delay-600 { animation-delay: 0.6s; }
                .animate-fade-in.delay-700 { animation-delay: 0.7s; }

                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
            `}</style>
        </section>
    );
};

export default ComingSoonPage;
