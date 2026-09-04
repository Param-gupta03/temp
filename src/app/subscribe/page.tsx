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
      <div className="bg-white border border-[#ede4d5] rounded-3xl p-8 md:p-12 max-w-md mx-auto shadow-sm text-center relative overflow-hidden">
        <div className="bg-[#f7f4ee] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#ede4d5]">
          <Mail className="text-[#2f4739] w-8 h-8" />
        </div>

        <div className="space-y-1 mb-4">
          <span className="text-xs uppercase tracking-wider text-[#8d6b4f] font-semibold">Newsletter</span>
          <h2 className="text-3xl font-serif font-bold text-[#1c1917]">
            Stay <span className="text-[#2f4739]">Updated</span>
          </h2>
        </div>
        
        <p className="text-xs text-[#66615b] mb-8 leading-relaxed">
          Join our green community and receive the latest eco-news, launch updates, and exclusive sustainable offers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-[#1c1917]">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8d6b4f] w-4 h-4" />
              <input
                type="email"
                className="w-full bg-[#faf7f2] border border-[#ede4d5] px-4 py-2.5 pl-10 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition text-sm"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2f4739] text-[#faf7f2] font-semibold py-3.5 px-6 rounded-full shadow-sm hover:bg-[#23372c] transition text-sm"
          >
            Subscribe Now
          </button>
        </form>

        <p className="text-[11px] text-[#8d6b4f] mt-4 italic">
          We promise to never spam you. Only green goodness.
        </p>

        <button
          onClick={() => router.push('/')}
          className="mt-8 text-xs text-[#66615b] hover:text-[#2f4739] font-medium transition flex items-center justify-center gap-1.5 mx-auto"
        >
          <span>&larr;</span> Back
        </button>
      </div>
    </section>
  );
};

export default SubscriptionPage;
