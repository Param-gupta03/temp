"use client";

import React, { useState, useContext } from 'react';
import { Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { AppContext } from '@/context/AppContext';
import { apiUrl } from '@/config/api';

const SubscriptionPage = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { showMessage, setIsGeneratingImage }: any =
    useContext(AppContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showMessage('Please enter your email address.');
      return;
    }

    showMessage('Subscribing...');
    setIsGeneratingImage(true);

    try {
      const response = await fetch(apiUrl('/api/subscribe'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showMessage('Subscription successful! Check your email.');
        setEmail('');
      } else {
        showMessage(data.message || 'Subscription failed.');
      }
    } catch (err: any) {
      console.error('Subscription error:', err);
      showMessage('An unexpected error occurred.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="bg-slate-800/40 border border-slate-700 rounded-[2.5rem] p-8 md:p-12 max-w-lg mx-auto shadow-2xl backdrop-blur-sm text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
        
        <div className="bg-green-500/10 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-green-500/20">
          <Mail className="text-green-500 w-10 h-10" />
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          Stay <span className="text-green-500">Updated</span>
        </h2>
        
        <p className="text-lg text-slate-400 mb-10 leading-relaxed font-medium">
          Join our green community and receive the latest eco-news, launch updates, and exclusive sustainable offers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-left">
            <label className="text-sm font-bold text-slate-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="email"
                className="w-full bg-slate-900 border border-slate-700 px-5 py-4 pl-12 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-white transition font-medium"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black py-5 px-6 rounded-2xl shadow-xl shadow-green-900/20 hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-[1.02] active:scale-[0.98] text-lg"
          >
            Subscribe Now
          </button>
        </form>

        <p className="text-xs text-slate-600 mt-6 italic">
          We promise to never spam you. Only green goodness.
        </p>

        <button
          onClick={() => router.push('/')}
          className="mt-10 text-slate-500 hover:text-green-500 font-bold transition flex items-center justify-center gap-2 mx-auto"
        >
          <span>&larr;</span> Back
        </button>
      </div>
    </section>
  );
};

export default SubscriptionPage;
