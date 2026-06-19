"use client";

import React from 'react';
import { Leaf, Recycle, HeartHandshake, Lightbulb } from 'lucide-react'; 
import { useRouter } from 'next/navigation';

const AboutPage = () => {
  const router = useRouter(); 
  return (
    <section className="py-4 space-y-16">
        {/* Hero Section for About Page */}
        <div className="relative overflow-hidden bg-slate-800/50 py-20 md:py-32 rounded-[2.5rem] border border-slate-700 shadow-2xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-500/10 rounded-full blur-[100px]"></div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-7xl font-black leading-tight mb-8">
                    Nurturing a <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Greener</span> Tomorrow
                </h1>
                <p className="text-lg md:text-2xl max-w-3xl mx-auto text-slate-400 font-medium">
                    At Green Turtle, we believe every small step towards sustainability makes a monumental difference. Discover our passion for eco-conscious living.
                </p>
            </div>
        </div>

        {/* About EcoMart - Mission Section */}
        <div className="bg-slate-800/40 rounded-[3rem] border border-slate-700 p-8 md:p-16 shadow-xl backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <img src="/mission.jpg" alt="Our Mission" className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover"></img>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <div className="inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20 text-green-400 font-bold text-sm uppercase tracking-widest mb-6">
                        <Leaf className="w-4 h-4" /> Our Mission
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-8">Saving the planet, one turtle at a time.</h2>
                    <p className="text-lg text-slate-300 leading-relaxed mb-6 font-medium">
                        Green Turtle is your dedicated online marketplace for sustainable and eco-friendly products. Our mission is to make conscious consumerism accessible and convenient for everyone.
                    </p>
                    <p className="text-lg text-slate-400 leading-relaxed font-medium">
                        We carefully curate products from organic apparel to renewable gadgets, ensuring they meet strict environmental and ethical standards.
                    </p>
                </div>
            </div>
        </div>

        {/* Our Values Section */}
        <div>
            <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-16">Our Core <span className="text-green-500">Values</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { icon: Recycle, title: 'Sustainability', desc: 'Committed to products that protect our planet\'s future.', color: 'text-green-400' },
                    { icon: HeartHandshake, title: 'Integrity', desc: 'Transparent and ethical practices in every step.', color: 'text-blue-400' },
                    { icon: Lightbulb, title: 'Innovation', desc: 'Constantly seeking new ways to be greener.', color: 'text-yellow-400' },
                    { icon: Leaf, title: 'Community', desc: 'Building a network of conscious consumers.', color: 'text-emerald-400' }
                ].map((value, i) => (
                    <div key={i} className="bg-slate-800/40 border border-slate-700 p-8 rounded-[2rem] text-center hover:border-slate-600 transition group">
                        <div className={`w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition duration-500`}>
                            <value.icon className={`w-8 h-8 ${value.color}`} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                        <p className="text-slate-400 font-medium">{value.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Call to Action / Join Us Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-emerald-700 rounded-[3rem] p-10 md:p-20 text-center shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 relative z-10">Join the Green Turtle Movement!</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 relative z-10 font-medium">
                Every choice matters. Join us in building a more sustainable future, one eco-friendly product at a time.
            </p>
            <button onClick={() => router.push('/contact')} className="bg-white text-green-700 font-black py-5 px-12 rounded-2xl shadow-2xl hover:bg-slate-50 transition transform hover:scale-105 active:scale-95 relative z-10 text-lg">
                Get in Touch
            </button>
        </div>
    </section>
)};

export default AboutPage;
