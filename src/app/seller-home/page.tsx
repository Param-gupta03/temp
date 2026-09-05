"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Store,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  PackageCheck,
  Wallet,
  CheckCircle2,
  Share2,
  Eye,
  BarChart3,
  Layers,
  Award
} from 'lucide-react';
import { AppContext } from '@/context/AppContext';
import StayUpdatedSection from '@/components/StayUpdatedSection';

const SellerHomePage = () => {
  const router = useRouter();
  const { user, role } = useContext(AppContext) || {};
  const isSeller = role === 'seller' || role === 'admin';

  const handleStartSelling = () => {
    if (user && isSeller) {
      router.push('/seller-dashboard');
    } else if (user) {
      router.push('/why-partner-us');
    } else {
      router.push('/register');
    }
  };

  return (
    <div className="py-6 space-y-16 text-[#1c1917] dark:text-[#f4f0ea]">
      {/* HERO SECTION FOR SELLERS */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#f2f6f3] via-[#faf7f2] to-[#e6ded1] dark:from-[#1b2620] dark:via-[#161f1a] dark:to-[#121815] py-16 md:py-24 rounded-[2.5rem] border border-[#e7e0d5] dark:border-[#2a3d33] shadow-card">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#2f4739]/10 dark:bg-[#489a69]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#8d6b4f]/10 dark:bg-[#d4a373]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#2f4739]/10 dark:bg-[#489a69]/20 border border-[#2f4739]/20 dark:border-[#489a69]/40 px-4 py-2 rounded-full text-[#2f4739] dark:text-[#489a69] font-bold text-xs uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" />
            For Eco-Brands & Sustainable Makers
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[1.12] text-[#111827] dark:text-[#f4f0ea] tracking-tight">
            Grow Your Sustainable Brand on <span className="italic font-serif text-[#2f4739] dark:text-[#489a69]">The Green Turtles</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto text-[#374151] dark:text-[#d1d5db] font-normal leading-relaxed">
            Stop competing against cheap fast-fashion and misleading greenwashing. Join an exclusive collective of verified eco-makers reaching mindful shoppers who value genuine impact.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleStartSelling}
              className="bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] py-4 px-9 rounded-full font-semibold shadow-soft transition active:scale-95 text-base flex items-center justify-center gap-2"
            >
              {isSeller ? "Go to Seller Dashboard" : "Start Selling Now"} <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => router.push('/why-partner-us')}
              className="bg-white dark:bg-[#1a241f] border border-[#cfc4b2] dark:border-[#354a3e] text-[#111827] dark:text-[#f4f0ea] py-4 px-9 rounded-full font-semibold hover:border-[#2f4739] dark:hover:border-[#489a69] transition active:scale-95 text-base shadow-soft"
            >
              Why Partner With Us
            </button>
          </div>
        </div>
      </div>

      {/* FOUR SELLER ADVANTAGES */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] font-bold text-[#8d6b4f] dark:text-[#d4a373]">
            Seller Advantages
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] dark:text-[#f4f0ea]">
            Built Specifically for <span className="italic font-serif text-[#2f4739] dark:text-[#489a69]">Eco-Makers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: "0% Greenwashing Clutter",
              desc: "Every product is vetted. Your sustainable certifications and ethical materials stand out instead of being diluted.",
            },
            {
              icon: TrendingUp,
              title: "High-Intent Shoppers",
              desc: "Our members shop intentionally. Average order value and repeat-purchase rates are significantly higher than generic sites.",
            },
            {
              icon: Wallet,
              title: "Direct Wallet & Payouts",
              desc: "Clear, transparent seller balance tracking with automated wallet credits on every fulfilled order.",
            },
            {
              icon: PackageCheck,
              title: "Turnkey Inventory Tools",
              desc: "Easily add products, track stock, upload images, and update prices with our intuitive seller dashboard.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] p-7 rounded-3xl shadow-card space-y-3"
              >
                <div className="p-3.5 bg-[#e8ede9] dark:bg-[#223028] text-[#2f4739] dark:text-[#489a69] rounded-2xl w-fit">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#111827] dark:text-[#f4f0ea]">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-[#4b5563] dark:text-[#9ca3af] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* HOW SELLING WORKS (4 STEPS) */}
      <div className="bg-white dark:bg-[#161f1a] border border-[#e7e0d5] dark:border-[#2a3d33] py-16 md:py-20 rounded-[2.5rem] px-6 md:px-12 shadow-card space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] font-bold text-[#8d6b4f] dark:text-[#d4a373]">
            Simple 4-Step Process
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] dark:text-[#f4f0ea]">
            How Selling Works
          </h2>
          <p className="text-base md:text-lg text-[#4b5563] dark:text-[#9ca3af]">
            Get your sustainable brand onboarded and discoverable in four straightforward steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Create Seller Account",
              desc: "Register with your shop name, address, and GST or artisan identifier.",
            },
            {
              step: "02",
              title: "List Your Catalog",
              desc: "Add your eco-products with details on materials, weight, and pricing.",
            },
            {
              step: "03",
              title: "Fast Verification",
              desc: "Our curation team reviews and awards the verified eco badge.",
            },
            {
              step: "04",
              title: "Receive Orders & Earn",
              desc: "Ship directly to conscious customers and receive wallet payouts.",
            },
          ].map((s, idx) => (
            <div
              key={idx}
              className="bg-[#faf7f2] dark:bg-[#1a241f] border border-[#ede4d5] dark:border-[#2a3d33] p-6 rounded-3xl space-y-3 relative"
            >
              <span className="text-xs font-bold text-[#2f4739] dark:text-[#489a69] bg-[#e8ede9] dark:bg-[#223028] px-3 py-1 rounded-full w-fit inline-block">
                Step {s.step}
              </span>
              <h4 className="font-serif text-xl font-bold text-[#111827] dark:text-[#f4f0ea]">
                {s.title}
              </h4>
              <p className="text-sm text-[#4b5563] dark:text-[#9ca3af] leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={handleStartSelling}
            className="bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] py-4 px-10 rounded-full font-semibold transition active:scale-95 shadow-soft text-base inline-flex items-center gap-2"
          >
            {isSeller ? "Access Your Inventory Dashboard" : "Register as a Seller Today"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* WHY PARTNER CALLOUT BANNER */}
      <div className="rounded-[2.5rem] bg-gradient-to-r from-[#e8ede9] via-[#f4efe6] to-[#ece5d8] dark:from-[#1b2620] dark:via-[#161f1a] dark:to-[#121815] border-2 border-[#2f4739]/30 dark:border-[#489a69]/40 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-card">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2f4739] dark:text-[#489a69]">
            <Award className="w-4 h-4" /> Deep Dive
          </div>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#111827] dark:text-[#f4f0ea]">
            Want to learn more about our Brand Collective?
          </h3>
          <p className="text-base text-[#374151] dark:text-[#d1d5db] leading-relaxed">
            Read our in-depth partnership guide exploring our 4 pillars: Reach, Visibility, Insights, and Trust Standards.
          </p>
        </div>
        <Link
          href="/why-partner-us"
          className="bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] font-semibold py-4 px-8 rounded-full shadow-soft transition active:scale-95 text-base shrink-0 inline-flex items-center gap-2"
        >
          Explore Why Partner With Us <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* STAY UPDATED SECTION FOR SELLERS */}
      <StayUpdatedSection
        title="Stay Updated on Seller Insights & Eco Trends"
        subtitle="Subscribe to our Brand Partner newsletter for data on consumer sustainability demand, seasonal merchandising tips, and platform updates."
      />
    </div>
  );
};

export default SellerHomePage;
