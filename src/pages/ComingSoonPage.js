import React from 'react';
import { useNavigate } from 'react-router-dom';
import SvgLogo from '../svg';

const ComingSoonPage = () => {
    const navigate = useNavigate();

    const handleStayUpdatedClick = () => {
        navigate('/subscribe');
    };

    const handleSneakPeekClick = () => {
        navigate('/home');
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center py-8 px-4 bg-gradient-to-br from-green-50 to-teal-100 rounded-lg shadow-xl">
            <div className="animate-bounce-slow mb-4 md:mb-6">
                <SvgLogo width="100" height="100" className="text-green-600 mx-auto md:w-28 md:h-28" />
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-green-800 mb-4 md:mb-5 animate-fade-in">
                Green Turtle
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-6 md:mb-7 animate-fade-in delay-200">
                Launching Soon!
            </p>

            <p className="text-md md:text-lg text-gray-600 max-w-xl mx-auto mb-8 md:mb-9 animate-fade-in delay-400">
                Get ready for a revolutionary marketplace connecting you with the best eco-friendly products. We're building a greener future, one sustainable choice at a time.
            </p>

            <button
                onClick={handleStayUpdatedClick}
                className="bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 animate-fade-in delay-600 mb-3"
            >
                Stay Updated
            </button>

            <button
                onClick={handleSneakPeekClick}
                className="text-green-700 hover:text-green-900 font-semibold py-1 px-3 rounded-md transition duration-300 animate-fade-in delay-700 text-sm md:text-base"
            >
                Take a sneak peek of the website →
            </button>

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