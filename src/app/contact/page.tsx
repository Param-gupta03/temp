"use client";

import React, { useState, useContext } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, Globe, Instagram, Sparkles } from 'lucide-react';
import { AppContext } from '@/context/AppContext';
import { apiUrl } from '@/config/api';
import StayUpdatedSection from '@/components/StayUpdatedSection';

const ContactPage = () => {
  const { showMessage, setIsGeneratingImage }: any = useContext(AppContext) || {};

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
      showMessage?.('Please fill in all fields.');
      return;
    }

    showMessage?.('Sending message...');
    setIsGeneratingImage?.(true);

    try {
      // 1. Save to MongoDB
      try {
        await fetch(apiUrl('/api/contact'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } catch (dbErr) {
        console.warn('Contact db error (proceeding):', dbErr);
      }

      // 2. Send Email
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
        showMessage?.('Your message has been sent successfully!');
        setFormData({ Name: '', Email: '', Message: '' });
      } else {
        showMessage?.('Message saved, but email delivery had a notice.');
      }
    } catch (err) {
      console.error(err);
      showMessage?.('An unexpected error occurred. Please try again.');
    } finally {
      setIsGeneratingImage?.(false);
    }
  };

  if (sent) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center animate-in fade-in zoom-in duration-500 text-[#111827] dark:text-[#f4f0ea]">
        <div className="w-16 h-16 bg-[#e8ede9] dark:bg-[#16251d] rounded-full flex items-center justify-center mx-auto mb-5 text-[#2f4739] dark:text-[#489a69]">
          <CheckCircle className="w-9 h-9 text-[#2f4739] dark:text-[#489a69]" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Message Sent!</h2>
        <p className="text-[#374151] dark:text-[#d1d5db] text-base mb-8 font-normal">
          Thank you for reaching out. We've received your note and our team will get back to you shortly.
        </p>
        <button 
          onClick={() => setSent(false)}
          className="bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] px-8 py-3.5 rounded-full font-semibold transition text-sm shadow-soft"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-16 text-[#111827] dark:text-[#f4f0ea]">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#8d6b4f] dark:text-[#d4a373]">
          We'd love to hear from you
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold">
          Get in <span className="text-[#2f4739] dark:text-[#489a69] italic font-serif">Touch</span>
        </h1>
        <p className="text-base sm:text-lg text-[#374151] dark:text-[#d1d5db] font-normal max-w-xl mx-auto leading-relaxed">
          Have questions about our verified eco-friendly marketplace, products, or brand partnerships? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Contact Form */}
        <div className="bg-white dark:bg-[#1a241f] p-8 md:p-10 rounded-[2.5rem] border border-[#e7e0d5] dark:border-[#2a3d33] shadow-card">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <Send className="text-[#2f4739] dark:text-[#489a69] w-6 h-6" /> Send us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">Your Name *</label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#111827] dark:text-[#f4f0ea] transition text-sm font-medium"
                  placeholder="e.g. Maya Sharma"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">Email Address *</label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#111827] dark:text-[#f4f0ea] transition text-sm font-medium"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">Message *</label>
              <textarea
                name="Message"
                rows={5}
                value={formData.Message}
                onChange={handleChange}
                className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#111827] dark:text-[#f4f0ea] transition text-sm resize-none font-medium"
                placeholder="Tell us how we can help..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] font-semibold py-4 px-6 rounded-full transition shadow-soft flex items-center justify-center gap-2 text-base active:scale-95"
            >
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Contact info & Map */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1a241f] p-8 md:p-10 rounded-[2.5rem] border border-[#e7e0d5] dark:border-[#2a3d33] shadow-card space-y-6">
            <h3 className="font-serif text-2xl font-bold">Contact Information</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#e8ede9] dark:bg-[#223028] text-[#2f4739] dark:text-[#489a69] rounded-2xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#111827] dark:text-[#f4f0ea] text-base">Our Location</p>
                  <p className="text-[#4b5563] dark:text-[#9ca3af] text-sm mt-0.5">
                    Delhi Technological University, Rohini, New Delhi-110042
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#e8ede9] dark:bg-[#223028] text-[#2f4739] dark:text-[#489a69] rounded-2xl shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#111827] dark:text-[#f4f0ea] text-base">Phone Number</p>
                  <p className="text-[#4b5563] dark:text-[#9ca3af] text-sm mt-0.5">
                    +91 9254579730
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#e8ede9] dark:bg-[#223028] text-[#2f4739] dark:text-[#489a69] rounded-2xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#111827] dark:text-[#f4f0ea] text-base">Direct Email</p>
                  <p className="text-sm mt-0.5">
                    <a href="mailto:dishasikka@thegreenturtles.in" className="text-[#2f4739] dark:text-[#489a69] font-semibold hover:underline">
                      dishasikka@thegreenturtles.in
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#e8ede9] dark:bg-[#223028] text-[#2f4739] dark:text-[#489a69] rounded-2xl shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#111827] dark:text-[#f4f0ea] text-base">Instagram</p>
                  <p className="text-sm mt-0.5">
                    <a href="https://instagram.com/thegreenturtles.in" target="_blank" rel="noopener noreferrer" className="text-[#2f4739] dark:text-[#489a69] font-semibold hover:underline">
                      @thegreenturtles.in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] overflow-hidden border border-[#e7e0d5] dark:border-[#2a3d33] shadow-card h-[240px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6995.957613964086!2d77.11045685582977!3d28.7500497068004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0138a74f7da7%3A0xf09fad683c23bd5d!2sDelhi%20Technological%20University!5e0!3m2!1sen!2sin!4v1754087038301!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title="Delhi Technological University Location Map"
              className="opacity-90"
            />
          </div>
        </div>
      </div>

      {/* STAY UPDATED SECTION */}
      <StayUpdatedSection />
    </div>
  );
};

export default ContactPage;
