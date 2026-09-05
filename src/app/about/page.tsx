"use client";

import React from 'react';
import { Leaf, Recycle, HeartHandshake, Lightbulb, ArrowRight } from 'lucide-react'; 
import { useRouter } from 'next/navigation';
import StayUpdatedSection from '@/components/StayUpdatedSection';

const AboutPage = () => {
  const router = useRouter(); 
  return (
    <div className="py-6 space-y-16 text-[#111827] dark:text-[#f4f0ea]">
      {/* Hero Section for About Page */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#f4efe6] via-[#faf7f2] to-[#ede4d5] dark:from-[#1b2620] dark:via-[#161f1a] dark:to-[#121815] py-16 md:py-24 rounded-[2.5rem] border border-[#e7e0d5] dark:border-[#2a3d33] shadow-card">
        <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#8d6b4f] dark:text-[#d4a373] mb-3">
            Our Philosophy
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 text-[#111827] dark:text-[#f4f0ea] tracking-tight">
            Nurturing a <span className="text-[#2f4739] dark:text-[#489a69] italic font-serif">Greener</span> Tomorrow
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-[#374151] dark:text-[#d1d5db] font-normal leading-relaxed">
            At The Green Turtles, we believe every conscious choice makes a monumental difference. Discover our passion for making verified sustainable products discoverable and accessible.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white dark:bg-[#1a241f] rounded-[2.5rem] border border-[#e7e0d5] dark:border-[#2a3d33] p-8 md:p-14 shadow-card">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/2 w-full">
            <div className="relative">
              <img
                src="/mission.jpg"
                alt="Our Mission"
                className="rounded-3xl border border-[#e7e0d5] dark:border-[#2a3d33] shadow-card w-full h-[380px] object-cover"
              />
            </div>
          </div>
          <div className="lg:w-1/2 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#e8ede9] dark:bg-[#223028] px-4 py-2 rounded-full border border-[#d2dfd5] dark:border-[#2f4739] text-[#2f4739] dark:text-[#489a69] font-bold text-xs uppercase tracking-wider">
              <Leaf className="w-4 h-4" /> Our Mission
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] dark:text-[#f4f0ea] leading-tight">
              Saving the planet, one mindful choice at a time.
            </h2>
            <p className="text-base md:text-lg text-[#374151] dark:text-[#d1d5db] leading-relaxed font-normal">
              The Green Turtles is your curated online marketplace for authentic sustainable and eco-friendly products. Our mission is to make conscious living transparent, trustworthy, and rewarding.
            </p>
            <p className="text-base text-[#4b5563] dark:text-[#9ca3af] leading-relaxed font-normal">
              We carefully curate goods from circular textiles and zero-waste living essentials to clean technology, verifying every claim against strict environmental and ethical standards.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] font-bold text-[#8d6b4f] dark:text-[#d4a373]">
            Built on Integrity
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] dark:text-[#f4f0ea]">
            Our Core <span className="text-[#2f4739] dark:text-[#489a69] italic font-serif">Values</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Recycle, title: 'Sustainability', desc: 'Committed to products and packaging that protect our planet’s future.' },
            { icon: HeartHandshake, title: 'Integrity', desc: 'Transparent claims, verified certifications, and 0% greenwashing.' },
            { icon: Lightbulb, title: 'Innovation', desc: 'Championing circular design, natural materials, and carbon-negative tech.' },
            { icon: Leaf, title: 'Community', desc: 'Building a shared collective of conscious consumers and ethical makers.' }
          ].map((value, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] p-8 rounded-3xl text-center hover:border-[#2f4739] dark:hover:border-[#489a69] transition shadow-card group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#f7f4ee] dark:bg-[#223028] border border-[#ede4d5] dark:border-[#2f4739] flex items-center justify-center mx-auto mb-5 text-[#2f4739] dark:text-[#489a69] group-hover:scale-110 transition duration-300">
                <value.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#111827] dark:text-[#f4f0ea] mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-[#4b5563] dark:text-[#9ca3af] font-normal leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative overflow-hidden bg-[#2f4739] dark:bg-[#1a2c21] border border-[#2f4739] rounded-[2.5rem] p-10 md:p-16 text-center shadow-card text-[#faf7f2]">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#faf7f2] mb-4 relative z-10">
          Join The Green Turtles Movement!
        </h2>
        <p className="text-base sm:text-lg text-[#faf7f2]/90 max-w-xl mx-auto mb-8 relative z-10 font-normal leading-relaxed">
          Every choice matters. Connect with our community and discover how simple choosing better can be.
        </p>
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          <button
            onClick={() => router.push('/contact')}
            className="bg-[#faf7f2] hover:bg-white text-[#2f4739] font-semibold py-4 px-8 rounded-full shadow-soft transition active:scale-95 text-base"
          >
            Get in Touch
          </button>
          <button
            onClick={() => router.push('/why-partner-us')}
            className="bg-transparent border-2 border-[#faf7f2] hover:bg-[#faf7f2]/10 text-[#faf7f2] font-semibold py-4 px-8 rounded-full transition active:scale-95 text-base"
          >
            Partner With Us
          </button>
        </div>
      </div>

      {/* STAY UPDATED SECTION */}
      <StayUpdatedSection />
    </div>
  );
};

export default AboutPage;
