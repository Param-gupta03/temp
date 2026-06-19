"use client";

import React, { useState, useContext } from 'react';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import { AppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { apiUrl } from '@/config/api';

const getSupabaseErrorMessage = (error: unknown) => {
    if (!error) {
        return 'Unknown Supabase error.';
    }

    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'object') {
        const supabaseError = error as {
            message?: string;
            details?: string;
            hint?: string;
            code?: string;
        };

        if (supabaseError.code === 'PGRST205') {
            return 'Partnership inquiries are not set up in Supabase yet. Please create the partner_inquiries table.';
        }

        const message = [
            supabaseError.message,
            supabaseError.details,
            supabaseError.hint,
            supabaseError.code ? `Code: ${supabaseError.code}` : null,
        ].filter(Boolean).join(' ');

        return message || 'Unknown Supabase error.';
    }

    return String(error);
};

const PartnerPage = () => {
    const { supabase, showMessage, setIsGeneratingImage, isSupabaseConfigured }: any = useContext(AppContext);
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

        if (!isSupabaseConfigured || !supabase) {
            showMessage('Supabase is not configured. Please check your environment variables.');
            return;
        }

        showMessage('Sending partnership inquiry...');
        setIsGeneratingImage(true);

        try {
            const { error } = await supabase
                .from('partner_inquiries')
                .insert([formData]);

            if (error) {
                const errorMessage = getSupabaseErrorMessage(error);
                console.warn('Supabase partner inquiry insert failed:', errorMessage, error);
                showMessage(errorMessage || 'Failed to send inquiry.');
            } else {
                // 2. Send Email via our API
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
        } catch (error) {
            const errorMessage = getSupabaseErrorMessage(error);
            console.warn('Error submitting partner form:', errorMessage, error);
            showMessage(errorMessage || 'An unexpected error occurred. Please try again later.');
        } finally {
            setIsGeneratingImage(false);
        }
    };

    return (
        <section className="py-12 px-4">
            <div className="bg-slate-800/40 border border-slate-700 rounded-[3rem] p-8 md:p-16 max-w-3xl mx-auto shadow-2xl backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                
                <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-8">
                    Become a <span className="text-green-500">Partner</span>
                </h2>

                <p className="text-xl text-slate-400 text-center mb-12 font-medium">
                    Join us in creating a greener future. If your brand aligns with our mission, let's connect and grow together.
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-400 ml-1">Your Name</label>
                            <input
                                type="text"
                                name="contact_name"
                                value={formData.contact_name}
                                onChange={handleChange}
                                className="w-full bg-slate-900 border border-slate-700 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-white transition"
                                placeholder="Contact Name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-400 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900 border border-slate-700 px-5 py-4 pl-12 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-white transition"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 ml-1">Phone (Optional)</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-slate-900 border border-slate-700 px-5 py-4 pl-12 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-white transition"
                                placeholder="+91 XXXXX XXXXX"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 ml-1">Message / Proposal</label>
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 text-slate-500 w-5 h-5" />
                            <textarea
                                name="message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-slate-900 border border-slate-700 px-5 py-4 pl-12 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-white transition resize-none"
                                placeholder="Tell us about your brand and vision..."
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black py-5 px-6 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-green-900/20"
                    >
                        Submit Partnership Inquiry
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <button
                        onClick={() => router.push('/products')}
                        className="text-slate-500 hover:text-green-500 font-bold transition flex items-center justify-center gap-2 mx-auto"
                    >
                        <span>←</span> Back to Marketplace
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PartnerPage;
