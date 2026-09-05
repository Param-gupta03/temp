"use client";

import React, { useState, useContext } from 'react';
import { Mail, CheckCircle2, Sparkles, Shield, Gift, ArrowRight } from 'lucide-react';
import { AppContext } from '@/context/AppContext';
import { apiUrl } from '@/config/api';

interface StayUpdatedSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function StayUpdatedSection({
  className = "",
  title = "Stay Updated with The Green Turtles",
  subtitle = "Join over 5,000+ conscious consumers receiving weekly curated sustainable drops, zero-greenwash guides, and exclusive eco-rewards."
}: StayUpdatedSectionProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { showMessage }: any = useContext(AppContext) || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      showMessage?.('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(apiUrl('/api/subscribe'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        showMessage?.('Thank you for subscribing! Check your email.');
        setEmail('');
      } else {
        showMessage?.(data.message || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      showMessage?.('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`w-full max-w-5xl mx-auto my-12 ${className}`}>
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#ffffff] via-[#f7f4ee] to-[#ece5d8] dark:from-[#1b2620] dark:via-[#161f1a] dark:to-[#121815] border-2 border-[#d9cebe] dark:border-[#2f4739] p-8 md:p-14 lg:p-16 shadow-[0_20px_50px_rgba(47,71,57,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        {/* Subtle decorative glow accents */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#2f4739]/10 dark:bg-[#489a69]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#8d6b4f]/10 dark:bg-[#d4a373]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-[#2f4739]/10 dark:bg-[#489a69]/20 border border-[#2f4739]/20 dark:border-[#489a69]/40 px-4 py-2 rounded-full text-[#2f4739] dark:text-[#489a69] font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Stay Updated · Never Miss A Drop
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] dark:text-[#f4f0ea] leading-tight tracking-tight">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[#374151] dark:text-[#d1d5db] font-normal leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* Form */}
          {isSuccess ? (
            <div className="p-6 bg-[#e8ede9] dark:bg-[#1c2e23] border border-[#2f4739]/30 rounded-2xl animate-in fade-in duration-300">
              <div className="flex items-center justify-center gap-3 text-[#2f4739] dark:text-[#489a69] font-bold text-lg">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <span>You're in! Welcome to our conscious community 🌱</span>
              </div>
              <p className="text-sm text-[#374151] dark:text-[#d1d5db] mt-2">
                We've sent a welcome confirmation note to your email. Check your inbox!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="pt-2 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch shadow-soft rounded-2xl sm:rounded-full bg-white dark:bg-[#121815] p-2 border-2 border-[#d9cebe] dark:border-[#33463a] focus-within:border-[#2f4739] dark:focus-within:border-[#489a69] transition">
                <div className="flex items-center gap-3 px-4 py-2 flex-grow">
                  <Mail className="w-5 h-5 text-[#2f4739] dark:text-[#489a69] shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for eco updates & perks..."
                    required
                    className="w-full bg-transparent text-[#111827] dark:text-[#f4f0ea] placeholder:text-[#6b7280] dark:placeholder:text-[#9ca3af] focus:outline-none text-base font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] font-semibold text-base px-8 py-3.5 rounded-xl sm:rounded-full transition active:scale-95 flex items-center justify-center gap-2 shrink-0 disabled:opacity-75 shadow-sm"
                >
                  {loading ? "Subscribing..." : "Stay Updated"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Three Key Perks Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
            <div className="bg-white/80 dark:bg-[#121815]/60 backdrop-blur-xs border border-[#e7e0d5] dark:border-[#2a3d33] p-4 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 text-[#2f4739] dark:text-[#489a69] font-bold text-sm">
                <Gift className="w-4 h-4 shrink-0" />
                <span>Early Bird Drops</span>
              </div>
              <p className="text-xs text-[#4b5563] dark:text-[#9ca3af] leading-relaxed">
                First access to limited batch eco-products & artisan collaborations.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-[#121815]/60 backdrop-blur-xs border border-[#e7e0d5] dark:border-[#2a3d33] p-4 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 text-[#2f4739] dark:text-[#489a69] font-bold text-sm">
                <Shield className="w-4 h-4 shrink-0" />
                <span>Zero Greenwashing</span>
              </div>
              <p className="text-xs text-[#4b5563] dark:text-[#9ca3af] leading-relaxed">
                Clear material breakdowns, certifications, and unbiased reviews.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-[#121815]/60 backdrop-blur-xs border border-[#e7e0d5] dark:border-[#2a3d33] p-4 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 text-[#2f4739] dark:text-[#489a69] font-bold text-sm">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Bonus Eco-Coins</span>
              </div>
              <p className="text-xs text-[#4b5563] dark:text-[#9ca3af] leading-relaxed">
                Subscribers earn reward coins for everyday sustainable shopping.
              </p>
            </div>
          </div>

          <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] font-medium pt-2">
            No spam, ever. Unsubscribe anytime with a single click.
          </p>
        </div>
      </div>
    </section>
  );
}
