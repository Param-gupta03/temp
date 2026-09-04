"use client";

import React from 'react';
import { Leaf, Recycle, HeartHandshake, Lightbulb } from 'lucide-react'; 
import { useRouter } from 'next/navigation';

const AboutPage = () => {
  const router = useRouter(); 
  return (
    <section className="py-6 space-y-16">
        {/* Hero Section for About Page */}
        <div className="relative overflow-hidden bg-[#f4efe6] py-16 md:py-24 rounded-3xl border border-[#e7e0d5] shadow-[0_8px_30px_rgba(47,71,57,0.04)]">
            <div className="container mx-auto px-6 text-center relative z-10">
                <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8d6b4f] mb-3">Our Philosophy</p>
                <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6 text-[#1c1917]">
                    Nurturing a <span className="text-[#2f4739] italic font-serif">Greener</span> Tomorrow
                </h1>
                <p className="text-base md:text-lg max-w-2xl mx-auto text-[#66615b] font-normal leading-relaxed">
                    At Green Turtle, we believe every small step towards sustainability makes a monumental difference. Discover our passion for eco-conscious living.
                </p>
            </div>
        </div>

        {/* About EcoMart - Mission Section */}
        <div className="bg-white rounded-3xl border border-[#e7e0d5] p-8 md:p-14 shadow-[0_8px_30px_rgba(47,71,57,0.05)]">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                <div className="lg:w-1/2">
                    <div className="relative">
                        <img src="/mission.jpg" alt="Our Mission" className="rounded-2xl border border-[#e7e0d5] shadow-sm w-full h-[380px] object-cover"></img>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <div className="inline-flex items-center gap-2 bg-[#e8ede9] px-3.5 py-1.5 rounded-full border border-[#d2dfd5] text-[#2f4739] font-semibold text-xs uppercase tracking-wider mb-4">
                        <Leaf className="w-3.5 h-3.5" /> Our Mission
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1c1917] mb-6">Saving the planet, one turtle at a time.</h2>
                    <p className="text-base text-[#44403c] leading-relaxed mb-4 font-normal">
                        Green Turtle is your dedicated online marketplace for sustainable and eco-friendly products. Our mission is to make conscious consumerism accessible and convenient for everyone.
                    </p>
                    <p className="text-sm text-[#66615b] leading-relaxed font-normal">
                        We carefully curate products from organic apparel to renewable gadgets, ensuring they meet strict environmental and ethical standards.
                    </p>
                </div>
            </div>
        </div>

        {/* Our Values Section */}
        <div>
            <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8d6b4f] text-center mb-2">Built on Integrity</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1c1917] text-center mb-12">Our Core <span className="text-[#2f4739] italic font-serif">Values</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: Recycle, title: 'Sustainability', desc: 'Committed to products that protect our planet\'s future.' },
                    { icon: HeartHandshake, title: 'Integrity', desc: 'Transparent and ethical practices in every step.' },
                    { icon: Lightbulb, title: 'Innovation', desc: 'Constantly seeking new ways to be greener.' },
                    { icon: Leaf, title: 'Community', desc: 'Building a network of conscious consumers.' }
                ].map((value, i) => (
                    <div key={i} className="bg-white border border-[#e7e0d5] p-7 rounded-2xl text-center hover:border-[#cfc4b2] transition shadow-[0_2px_10px_rgba(47,71,57,0.03)] group">
                        <div className="w-14 h-14 rounded-2xl bg-[#f7f4ee] border border-[#ede4d5] flex items-center justify-center mx-auto mb-5 text-[#2f4739] group-hover:scale-105 transition duration-300">
                            <value.icon className="w-6 h-6 text-[#2f4739]" />
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-[#1c1917] mb-2">{value.title}</h3>
                        <p className="text-xs text-[#78716c] font-normal leading-relaxed">{value.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Call to Action / Join Us Section */}
        <div className="relative overflow-hidden bg-[#2f4739] rounded-3xl p-10 md:p-16 text-center shadow-lg text-[#faf7f2]">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#faf7f2] mb-4 relative z-10">Join the Green Turtle Movement!</h2>
            <p className="text-base text-[#faf7f2]/85 max-w-xl mx-auto mb-8 relative z-10 font-normal leading-relaxed">
                Every choice matters. Join us in building a more sustainable future, one eco-friendly product at a time.
            </p>
            <button onClick={() => router.push('/contact')} className="bg-[#faf7f2] text-[#2f4739] font-semibold py-3.5 px-8 rounded-full shadow-sm hover:bg-white transition active:scale-95 relative z-10 text-sm">
                Get in Touch
            </button>
        </div>
    </section>
)};

export default AboutPage;
