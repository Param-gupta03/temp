"use client";

import React, { useState, useContext } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, Globe, Instagram } from 'lucide-react';
import { AppContext } from '@/context/AppContext';
import { apiUrl } from '@/config/api';

const ContactPage = () => {
    const { showMessage, setIsGeneratingImage }: any = useContext(AppContext);

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
            // 1. Save to MongoDB
            const dbResponse = await fetch(apiUrl('/api/contact'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!dbResponse.ok) {
                console.error('Contact Inquiry Save Error:', await dbResponse.text());
            }

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
            <div className="max-w-xl mx-auto py-20 px-4 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-[#e8ede9] rounded-full flex items-center justify-center mx-auto mb-5 text-[#2f4739]">
                    <CheckCircle className="w-9 h-9 text-[#2f4739]" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3 text-[#1c1917]">Message Sent!</h2>
                <p className="text-[#66615b] text-base mb-8 font-normal">
                    Thank you for reaching out. We've received your note and our team will get back to you soon.
                </p>
                <button 
                    onClick={() => setSent(false)}
                    className="bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] px-8 py-3 rounded-full font-semibold transition text-sm shadow-sm"
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto py-10 px-4">
            <div className="text-center mb-14">
                <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8d6b4f] mb-2">We'd love to hear from you</p>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1c1917] mb-3">
                    Get in <span className="text-[#2f4739] italic font-serif">Touch</span>
                </h2>
                <p className="text-[#66615b] text-base max-w-xl mx-auto font-normal">
                    Have questions about our eco-friendly products or interested in partnering? We're here to help.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#e7e0d5] shadow-[0_8px_30px_rgba(47,71,57,0.05)]">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1c1917] mb-6 flex items-center gap-2.5">
                        <Send className="text-[#2f4739] w-5 h-5" /> Send us a Message
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#8a847c] ml-1">Your Name</label>
                                <input
                                    type="text"
                                    name="Name"
                                    value={formData.Name}
                                    onChange={handleChange}
                                    className="w-full bg-[#f7f4ee] border border-[#ede4d5] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#2f4739] focus:bg-white outline-none text-[#1c1917] transition text-sm"
                                    placeholder="Jane Doe"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#8a847c] ml-1">Email Address</label>
                                <input
                                    type="email"
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleChange}
                                    className="w-full bg-[#f7f4ee] border border-[#ede4d5] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#2f4739] focus:bg-white outline-none text-[#1c1917] transition text-sm"
                                    placeholder="jane@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#8a847c] ml-1">Message</label>
                            <textarea
                                name="Message"
                                rows={5}
                                value={formData.Message}
                                onChange={handleChange}
                                className="w-full bg-[#f7f4ee] border border-[#ede4d5] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#2f4739] focus:bg-white outline-none text-[#1c1917] transition text-sm resize-none"
                                placeholder="Tell us how we can help..."
                                required
                            />
                        </div>

                        <button type="submit" className="w-full bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] font-semibold py-3.5 px-6 rounded-full transition shadow-sm flex items-center justify-center gap-2 text-sm active:scale-[0.99]">
                            Send Message <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-[#e7e0d5] shadow-[0_4px_20px_rgba(47,71,57,0.03)]">
                        <h3 className="font-serif text-xl font-bold text-[#1c1917] mb-6">Contact Information</h3>
                        <div className="space-y-5">
                            <div className="flex items-start gap-3.5">
                                <div className="p-2.5 bg-[#e8ede9] text-[#2f4739] rounded-xl shrink-0">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#1c1917] text-sm">Our Location</p>
                                    <p className="text-[#66615b] text-xs mt-0.5">Delhi Technological University, Rohini, New Delhi-110042</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5">
                                <div className="p-2.5 bg-[#e8ede9] text-[#2f4739] rounded-xl shrink-0">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#1c1917] text-sm">Phone Number</p>
                                    <p className="text-[#66615b] text-xs mt-0.5">+91 9254579730</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5">
                                <div className="p-2.5 bg-[#e8ede9] text-[#2f4739] rounded-xl shrink-0">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#1c1917] text-sm">Email Address</p>
                                    <p className="text-[#66615b] text-xs mt-0.5">
                                        <a href="mailto:dishasikka@thegreenturtles.in" className="hover:text-[#2f4739] transition">
                                            dishasikka@thegreenturtles.in
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5">
                                <div className="p-2.5 bg-[#e8ede9] text-[#2f4739] rounded-xl shrink-0">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#1c1917] text-sm">Website</p>
                                    <p className="text-[#66615b] text-xs mt-0.5">
                                        <a href="https://thegreenturtles.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#2f4739] transition">
                                            thegreenturtles.in
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5">
                                <div className="p-2.5 bg-[#e8ede9] text-[#2f4739] rounded-xl shrink-0">
                                    <Instagram className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#1c1917] text-sm">Instagram</p>
                                    <p className="text-[#66615b] text-xs mt-0.5">
                                        <a href="https://instagram.com/thegreenturtles.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#2f4739] transition">
                                            @thegreenturtles.in
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl overflow-hidden border border-[#e7e0d5] shadow-sm h-[260px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6995.957613964086!2d77.11045685582977!3d28.7500497068004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0138a74f7da7%3A0xf09fad683c23bd5d!2sDelhi%20Technological%20University!5e0!3m2!1sen!2sin!4v1754087038301!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            title="Delhi Technological University Location Map"
                            className="grayscale-[30%] opacity-90"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
