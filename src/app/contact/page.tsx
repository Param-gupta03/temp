"use client";

import React, { useState, useContext } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { AppContext } from '@/context/AppContext';
import { apiUrl } from '@/config/api';

const ContactPage = () => {
    const { supabase, showMessage, setIsGeneratingImage }: any = useContext(AppContext);

    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Message: ''
    });
    const [sent, setSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.Name || !formData.Email || !formData.Message) {
            showMessage('Please fill in all fields.');
            return;
        }

        showMessage('Sending message...');
        setIsGeneratingImage(true);

        try {
            // 1. Save to Supabase
            const { error: dbError } = await supabase
                .from('contact_inquiries')
                .insert([formData]);

            if (dbError) console.error('Supabase Error:', dbError);

            // 2. Send Email via our new server
            const response = await fetch(apiUrl('/api/send-email'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.Name,
                    email: formData.Email,
                    message: formData.Message,
                    type: 'Contact Inquiry'
                })
            });

            if (response.ok) {
                setSent(true);
                showMessage('Your message has been sent successfully!');
                setFormData({ Name: '', Email: '', Message: '' });
            } else {
                showMessage('Message saved, but email notification failed.');
            }
        } catch (err) {
            console.error(err);
            showMessage('An unexpected error occurred.');
        } finally {
            setIsGeneratingImage(false);
        }
    };

    if (sent) {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-500 w-12 h-12" />
                </div>
                <h2 className="text-4xl font-bold mb-4 text-white">Message Sent!</h2>
                <p className="text-slate-400 text-lg mb-8">
                    Thank you for reaching out. We've sent an auto-reply to your email and our team will get back to you soon.
                </p>
                <button 
                    onClick={() => setSent(false)}
                    className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition"
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto py-12 px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent inline-block">
                    Get in Touch
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Have questions about our eco-friendly products or interested in partnering? We're here to help.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="bg-slate-800/40 p-8 md:p-12 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                        <Send className="text-green-500 w-6 h-6" /> Send us a Message
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Your Name</label>
                                <input
                                    type="text"
                                    name="Name"
                                    value={formData.Name}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900/50 border border-slate-700 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-white transition"
                                    placeholder="Jane Doe"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Email Address</label>
                                <input
                                    type="email"
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900/50 border border-slate-700 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-white transition"
                                    placeholder="jane@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Message</label>
                            <textarea
                                name="Message"
                                rows={5}
                                value={formData.Message}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-slate-700 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-white transition resize-none"
                                placeholder="Tell us how we can help..."
                                required
                            />
                        </div>

                        <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-2">
                            Send Message <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700 shadow-xl backdrop-blur-sm">
                        <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-500/10 rounded-xl">
                                    <MapPin className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <p className="font-bold text-white">Our Location</p>
                                    <p className="text-slate-400">Delhi Technological University, Rohini, New Delhi-110042</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-xl">
                                    <Phone className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <p className="font-bold text-white">Phone Number</p>
                                    <p className="text-slate-400">+91 9254579730</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-purple-500/10 rounded-xl">
                                    <Mail className="w-6 h-6 text-purple-500" />
                                </div>
                                <div>
                                    <p className="font-bold text-white">Email Address</p>
                                    <p className="text-slate-400">greenturtle.marketplace@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl h-[300px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6995.957613964086!2d77.11045685582977!3d28.7500497068004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0138a74f7da7%3A0xf09fad683c23bd5d!2sDelhi%20Technological%20University!5e0!3m2!1sen!2sin!4v1754087038301!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            title="Delhi Technological University Location Map"
                            className="grayscale contrast-125 opacity-80"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
