"use client";

import React, { useState, useContext } from 'react';
import { Mail, MessageSquare, Phone, ShieldCheck, BarChart3, Eye, Share2, CheckCircle2, Globe, Instagram } from 'lucide-react';
import { AppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { apiUrl } from '@/config/api';

const PartnerPage = () => {
    const { showMessage, setIsGeneratingImage }: any = useContext(AppContext);
    const router = useRouter();

    const [formData, setFormData] = useState({
        contact_name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.contact_name || !formData.email) {
            showMessage('Please fill in all required fields.');
            return;
        }

        showMessage('Sending partnership inquiry...');
        setIsGeneratingImage(true);

        try {
            const dbResponse = await fetch(apiUrl('/api/partner'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!dbResponse.ok) {
                console.warn('Partner inquiry save failed');
                showMessage('Failed to send inquiry.');
            } else {
                // Send Email via our API
                try {
                    const response = await fetch(apiUrl('/api/send-email'), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: formData.contact_name,
                            email: formData.email,
                            phone: formData.phone,
                            message: formData.message,
                            type: 'Partner Inquiry'
                        })
                    });

                    if (response.ok) {
                        showMessage('Partnership inquiry submitted successfully!');
                    } else {
                        showMessage('Inquiry saved, but email notification failed.');
                    }
                } catch (emailErr) {
                    console.error('Email error:', emailErr);
                    showMessage('Inquiry saved, but email notification failed.');
                }
                
                setFormData({ contact_name: '', email: '', phone: '', message: '' });
            }
        } catch (error: any) {
            console.warn('Error submitting partner form:', error.message);
            showMessage('An unexpected error occurred. Please try again later.');
        } finally {
            setIsGeneratingImage(false);
        }
    };

    return (
        <section className="py-12 px-4 max-w-7xl mx-auto space-y-16">
            {/* Header Section / For Brands */}
            <div className="relative overflow-hidden bg-[#f7f4ee] rounded-3xl border border-[#ede4d5] p-8 md:p-14 shadow-sm">
                <div className="text-center max-w-4xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 bg-[#ede4d5]/60 px-3.5 py-1.5 rounded-full border border-[#cfc4b2]/60 text-[#8d6b4f] font-semibold text-xs uppercase tracking-widest">
                        FOR BRANDS
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#1c1917] leading-tight">
                        Have a sustainable product worth discovering?
                    </h1>
                    <p className="text-base md:text-lg text-[#66615b] leading-relaxed max-w-3xl mx-auto">
                        The Green Turtles gives brands a structured place to showcase their products, sustainability information and story to consumers looking for better alternatives.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 pt-2 text-sm font-medium text-[#2f4739]">
                        {["Discoverability", "Visibility", "Consumer Insights", "Sustainability Story"].map((tag, idx) => (
                            <span key={idx} className="bg-white border border-[#ede4d5] px-4 py-1.5 rounded-full shadow-xs">
                                • {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Information Column (Left) */}
                <div className="lg:col-span-7 space-y-12">
                    
                    {/* Why Partner Section */}
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <span className="text-xs uppercase tracking-wider text-[#8d6b4f] font-semibold">Value Proposition</span>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1c1917]">Why Partner With Us?</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {[
                                { icon: Share2, title: "Reach", desc: "Get discovered by consumers looking for sustainable alternatives." },
                                { icon: Eye, title: "Visibility", desc: "Give your products a dedicated, structured presence on the platform." },
                                { icon: BarChart3, title: "Insights", desc: "Access product engagement and visibility data as the platform grows." },
                                { icon: ShieldCheck, title: "Trust", desc: "Present your sustainability story, certifications and product information clearly." }
                            ].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div key={idx} className="bg-white border border-[#ede4d5] p-6 rounded-2xl flex gap-4 shadow-sm">
                                        <div className="p-3 bg-[#f7f4ee] border border-[#ede4d5] text-[#2f4739] rounded-xl shrink-0 h-fit">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-serif font-bold text-[#1c1917] text-base mb-1">{item.title}</h4>
                                            <p className="text-xs text-[#66615b] leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <span className="text-xs uppercase tracking-wider text-[#8d6b4f] font-semibold">Process</span>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1c1917]">How It Works</h2>
                        </div>
                        <div className="relative border-l-2 border-[#ede4d5] pl-6 space-y-7 ml-3">
                            {[
                                { step: "01", title: "Share", desc: "Your brand and product details" },
                                { step: "02", title: "Review", desc: "Product information and sustainability credentials" },
                                { step: "03", title: "List", desc: "Your products go live for discovery" },
                                { step: "04", title: "Grow", desc: "Build visibility and understand consumer interest" }
                            ].map((item, idx) => (
                                <div key={idx} className="relative">
                                    {/* Timeline dot */}
                                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 bg-[#2f4739] rounded-full border-2 border-[#faf7f2]"></div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-semibold text-[#2f4739] bg-[#f7f4ee] px-2.5 py-0.5 rounded-full border border-[#ede4d5]">{item.step}</span>
                                        <h4 className="text-base font-serif font-bold text-[#1c1917]">{item.title}</h4>
                                    </div>
                                    <p className="text-[#66615b] text-xs mt-1">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trust-First Approach */}
                    <div className="bg-[#f7f4ee] border border-[#ede4d5] p-8 rounded-2xl space-y-5">
                        <h2 className="text-xl font-serif font-bold text-[#1c1917] flex items-center gap-2">
                            <ShieldCheck className="text-[#2f4739] w-5 h-5" /> A Trust-First Approach
                        </h2>
                        <p className="text-[#66615b] leading-relaxed text-sm">
                            We believe sustainability should be <strong className="text-[#1c1917]">demonstrated, not simply claimed</strong>. The Green Turtles aims to make product information more transparent by considering:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-medium text-[#66615b]">
                            {[
                                "Sustainability-related certifications",
                                "Product composition and materials",
                                "Available environmental information",
                                "Relevant lifecycle considerations",
                                "Brand-provided documentation",
                                "A defined product-validation framework"
                            ].map((bullet, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <CheckCircle2 className="text-[#2f4739] w-4 h-4 shrink-0" />
                                    <span>{bullet}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-[#66615b] text-xs italic border-t border-[#ede4d5] pt-4">
                            Consumers will be able to understand <strong>why a product is considered sustainable</strong>, rather than relying solely on marketing claims.
                        </p>
                    </div>

                </div>

                {/* Form Column (Right) */}
                <div className="lg:col-span-5 bg-white border border-[#ede4d5] rounded-3xl p-8 md:p-10 shadow-sm">
                    <div className="space-y-3 mb-8">
                        <span className="text-xs uppercase tracking-wider text-[#8d6b4f] font-semibold">Join the Collective</span>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1c1917]">
                            Become an Early Partner
                        </h2>
                        <p className="text-xs text-[#66615b] leading-relaxed">
                            Interested in joining our platform? Share your details and let's work together to make sustainable products easier to choose.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#1c1917]">Your Name / Contact Person</label>
                            <input
                                type="text"
                                name="contact_name"
                                value={formData.contact_name}
                                onChange={handleChange}
                                className="w-full bg-[#faf7f2] border border-[#ede4d5] px-4 py-2.5 text-sm rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition"
                                placeholder="Contact Name"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#1c1917]">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8d6b4f] w-4 h-4" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-[#faf7f2] border border-[#ede4d5] px-4 py-2.5 pl-10 text-sm rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#1c1917]">Phone Number (Optional)</label>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8d6b4f] w-4 h-4" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-[#faf7f2] border border-[#ede4d5] px-4 py-2.5 pl-10 text-sm rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition"
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#1c1917]">Brand Name & Proposal Details</label>
                            <div className="relative">
                                <MessageSquare className="absolute left-3.5 top-3 text-[#8d6b4f] w-4 h-4" />
                                <textarea
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-[#faf7f2] border border-[#ede4d5] px-4 py-2.5 pl-10 text-sm rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition resize-none"
                                    placeholder="Tell us about your brand and products..."
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#2f4739] text-[#faf7f2] font-semibold py-3 px-6 rounded-full hover:bg-[#23372c] transition text-sm shadow-sm"
                        >
                            Submit Partnership Inquiry
                        </button>
                    </form>

                    {/* Direct Contact Details Block */}
                    <div className="mt-8 pt-6 border-t border-[#ede4d5] space-y-3 text-xs font-medium text-[#66615b]">
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-[#2f4739] shrink-0" />
                            <span>Contact: <a href="mailto:dishasikka@thegreenturtles.in" className="text-[#2f4739] font-semibold hover:underline">dishasikka@thegreenturtles.in</a></span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Globe className="w-4 h-4 text-[#2f4739] shrink-0" />
                            <span>Website: <a href="https://thegreenturtles.in" target="_blank" rel="noopener noreferrer" className="text-[#2f4739] font-semibold hover:underline">thegreenturtles.in</a></span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Instagram className="w-4 h-4 text-[#2f4739] shrink-0" />
                            <span>Instagram: <a href="https://instagram.com/thegreenturtles.in" target="_blank" rel="noopener noreferrer" className="text-[#2f4739] font-semibold hover:underline">@thegreenturtles.in</a></span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Slogan Section */}
            <div className="bg-[#f7f4ee] border border-[#ede4d5] rounded-3xl p-8 md:p-12 text-center space-y-3">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1c1917]">Let's Make Sustainable Products Easier to Choose.</h3>
                <p className="text-[#66615b] max-w-2xl mx-auto text-sm">
                    We would love to learn about your brand, understand your products and explore how we can help more consumers discover them.
                </p>
                <div className="text-xs uppercase tracking-wider text-[#8d6b4f] font-semibold pt-2">
                    The Green Turtles · Discover. Compare. Choose Better.
                </div>
            </div>
        </section>
    );
};

export default PartnerPage;
