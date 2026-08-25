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
            <div className="relative overflow-hidden bg-slate-800/40 rounded-[3rem] border border-slate-700 p-8 md:p-16 shadow-xl backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                <div className="text-center max-w-4xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20 text-green-400 font-bold text-sm uppercase tracking-widest">
                        FOR BRANDS
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white">
                        Have a sustainable product worth discovering?
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                        The Green Turtles gives brands a structured place to showcase their products, sustainability information and story to consumers looking for better alternatives.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-4 text-sm md:text-base font-bold text-green-400">
                        {["Discoverability", "Visibility", "Consumer Insights", "Sustainability Story"].map((tag, idx) => (
                            <span key={idx} className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-full shadow-inner">
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
                        <h2 className="text-3xl font-black text-white">Why Partner With Us?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { icon: Share2, title: "Reach", desc: "Get discovered by consumers looking for sustainable alternatives." },
                                { icon: Eye, title: "Visibility", desc: "Give your products a dedicated, structured presence on the platform." },
                                { icon: BarChart3, title: "Insights", desc: "Access product engagement and visibility data as the platform grows." },
                                { icon: ShieldCheck, title: "Trust", desc: "Present your sustainability story, certifications and product information clearly." }
                            ].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div key={idx} className="bg-slate-900/30 border border-slate-850 p-6 rounded-2xl flex gap-4">
                                        <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl shrink-0 h-fit">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg mb-1">{item.title}</h4>
                                            <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black text-white">How It Works</h2>
                        <div className="relative border-l-2 border-slate-800 pl-6 space-y-8 ml-3">
                            {[
                                { step: "01", title: "Share", desc: "Your brand and product details" },
                                { step: "02", title: "Review", desc: "Product information and sustainability credentials" },
                                { step: "03", title: "List", desc: "Your products go live for discovery" },
                                { step: "04", title: "Grow", desc: "Build visibility and understand consumer interest" }
                            ].map((item, idx) => (
                                <div key={idx} className="relative">
                                    {/* Timeline dot */}
                                    <div className="absolute -left-[35px] top-1 w-4 h-4 bg-green-500 rounded-full border-4 border-slate-950"></div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-black text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20 font-mono">{item.step}</span>
                                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                                    </div>
                                    <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trust-First Approach */}
                    <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl space-y-6">
                        <h2 className="text-2xl font-black text-white flex items-center gap-2">
                            <ShieldCheck className="text-green-500 w-6 h-6" /> A Trust-First Approach
                        </h2>
                        <p className="text-slate-300 leading-relaxed text-sm">
                            We believe sustainability should be <strong className="text-white">demonstrated, not simply claimed</strong>. The Green Turtles aims to make product information more transparent by considering:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-slate-400">
                            {[
                                "Sustainability-related certifications",
                                "Product composition and materials",
                                "Available environmental information",
                                "Relevant lifecycle considerations",
                                "Brand-provided documentation",
                                "A defined product-validation framework"
                            ].map((bullet, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <CheckCircle2 className="text-green-500 w-4 h-4 shrink-0" />
                                    <span>{bullet}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-slate-400 text-xs italic border-t border-slate-800 pt-4">
                            Consumers will be able to understand <strong>why a product is considered sustainable</strong>, rather than relying solely on marketing claims.
                        </p>
                    </div>

                </div>

                {/* Form Column (Right) */}
                <div className="lg:col-span-5 bg-slate-800/40 border border-slate-700 rounded-[3rem] p-8 md:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                    
                    <div className="space-y-4 mb-8">
                        <h2 className="text-2xl md:text-3xl font-black text-white">
                            Become an Early Partner
                        </h2>
                        <p className="text-sm text-slate-400">
                            Interested in joining our platform? Share your details and let's work together to make sustainable products easier to choose.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 ml-1">Your Name / Contact Person</label>
                            <input
                                type="text"
                                name="contact_name"
                                value={formData.contact_name}
                                onChange={handleChange}
                                className="w-full bg-slate-900 border border-slate-750 px-4 py-3 text-sm rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-white transition"
                                placeholder="Contact Name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900 border border-slate-750 px-4 py-3 pl-11 text-sm rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-white transition"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 ml-1">Phone Number (Optional)</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900 border border-slate-750 px-4 py-3 pl-11 text-sm rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-white transition"
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 ml-1">Brand Name & Proposal Details</label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-3 text-slate-500 w-4 h-4" />
                                <textarea
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900 border border-slate-750 px-4 py-3 pl-11 text-sm rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-white transition resize-none"
                                    placeholder="Tell us about your brand and products..."
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-green-900/10 text-sm"
                        >
                            Submit Partnership Inquiry
                        </button>
                    </form>

                    {/* Direct Contact Details Block */}
                    <div className="mt-8 pt-8 border-t border-slate-700/60 space-y-4 text-xs font-medium text-slate-400">
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-green-500 shrink-0" />
                            <span>Contact: <a href="mailto:dishasikka@thegreenturtles.in" className="text-green-400 hover:underline">dishasikka@thegreenturtles.in</a></span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Globe className="w-4 h-4 text-green-500 shrink-0" />
                            <span>Website: <a href="https://thegreenturtles.in" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">thegreenturtles.in</a></span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Instagram className="w-4 h-4 text-green-500 shrink-0" />
                            <span>Instagram: <a href="https://instagram.com/thegreenturtles.in" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">@thegreenturtles.in</a></span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Slogan Section */}
            <div className="bg-gradient-to-br from-green-900/20 to-emerald-950/20 border border-green-900/30 rounded-[3rem] p-8 md:p-12 text-center space-y-4">
                <h3 className="text-2xl md:text-3xl font-black text-white">Let's Make Sustainable Products Easier to Choose.</h3>
                <p className="text-slate-400 max-w-2xl mx-auto text-sm font-medium">
                    We would love to learn about your brand, understand your products and explore how we can help more consumers discover them.
                </p>
                <div className="font-bold text-green-400 tracking-wider text-sm font-mono">
                    the green turtles · Discover. Compare. Choose Better.
                </div>
            </div>
        </section>
    );
};

export default PartnerPage;
