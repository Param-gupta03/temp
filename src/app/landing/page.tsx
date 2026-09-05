"use client";

import React, { useState, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  HeartHandshake,
  Recycle,
  ShieldCheck,
  CheckCircle,
  Leaf,
  ShoppingBag,
  Store,
  Sun,
  Moon,
  Handshake,
  Check,
  Copy,
  Globe,
  Instagram,
  Mail
} from 'lucide-react';
import SvgLogo from '@/svg';
import { AppContext } from '@/context/AppContext';

const TOTAL_SLIDES = 6;

const LandingPage = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [copied, setCopied] = useState(false);
  const { theme, toggleTheme } = useContext(AppContext) || {};

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dishasikka@thegreenturtles.in');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const height = containerRef.current.clientHeight;
    containerRef.current.scrollTo({
      top: index * height,
      behavior: 'smooth',
    });
    setActiveSlide(index);
  };

  // Track active slide on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const height = container.clientHeight;
      const index = Math.round(container.scrollTop / height);
      setActiveSlide(Math.min(TOTAL_SLIDES - 1, Math.max(0, index)));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation support for projector slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        if (activeSlide < TOTAL_SLIDES - 1) {
          e.preventDefault();
          scrollToSlide(activeSlide + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (activeSlide > 0) {
          e.preventDefault();
          scrollToSlide(activeSlide - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide]);

  return (
    <div className="relative h-screen h-[100dvh] w-screen overflow-hidden bg-[#faf7f2] dark:bg-[#121815] text-[#111827] dark:text-[#f4f0ea] selection:bg-[#2f4739]/20 selection:text-[#2f4739] transition-colors duration-200">
      {/* FLOATING PROJECTOR TOPBAR */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-[#faf7f2]/90 dark:from-[#121815]/90 to-transparent backdrop-blur-xs">
        <button
          onClick={() => scrollToSlide(0)}
          className="flex items-center gap-3 hover:opacity-90 transition group"
        >
          {/* Logo with 100% transparent background */}
          <div className="bg-transparent shrink-0">
            <SvgLogo className="w-9 h-9 shrink-0 pointer-events-none" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#2f4739] dark:text-[#489a69]">
            The Green Turtles
          </span>
        </button>

        <div className="flex items-center gap-5 text-sm font-semibold">
          <Link
            href="/home"
            className="hidden sm:flex items-center gap-1.5 text-[#111827] dark:text-[#f4f0ea] hover:text-[#2f4739] dark:hover:text-[#489a69] transition"
          >
            Home
          </Link>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Variant'}
            className="p-2 rounded-full border border-[#d9cebe] dark:border-[#2f4739] bg-white dark:bg-[#1c2620] text-[#2f4739] dark:text-[#489a69] hover:scale-105 active:scale-95 transition shadow-xs"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#d4a373]" /> : <Moon className="w-4 h-4 text-[#2f4739]" />}
          </button>

          <button
            onClick={() => scrollToSlide(TOTAL_SLIDES - 1)}
            className="bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] font-semibold text-xs md:text-sm px-5 py-2.5 rounded-full shadow-soft transition active:scale-95 flex items-center gap-1.5"
          >
            Explore Home <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* PROJECTOR SLIDE INDICATOR (Right side dots & numbers) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
        {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSlide(idx)}
            className="group flex items-center gap-2 relative focus:outline-none"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <span
              className={`text-[11px] font-mono font-bold transition-all ${
                activeSlide === idx
                  ? 'text-[#2f4739] dark:text-[#489a69] opacity-100 scale-110'
                  : 'text-[#9ca3af] opacity-0 group-hover:opacity-100'
              }`}
            >
              0{idx + 1}
            </span>
            <span
              className={`rounded-full transition-all duration-300 ${
                activeSlide === idx
                  ? 'w-3 h-8 bg-[#2f4739] dark:bg-[#489a69] shadow-soft'
                  : 'w-2.5 h-2.5 bg-[#cfc4b2] dark:bg-[#3d5045] group-hover:bg-[#2f4739]'
              }`}
            />
          </button>
        ))}
      </div>

      {/* BOTTOM SLIDE CONTROLLER (Next / Prev arrows) */}
      <div className="absolute bottom-6 right-6 z-40 flex items-center gap-3">
        {activeSlide > 0 && (
          <button
            onClick={() => scrollToSlide(activeSlide - 1)}
            className="p-3 bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] rounded-full shadow-card text-[#2f4739] dark:text-[#489a69] hover:scale-105 active:scale-95 transition"
            title="Previous Slide (Arrow Up)"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {activeSlide < TOTAL_SLIDES - 1 ? (
          <button
            onClick={() => scrollToSlide(activeSlide + 1)}
            className="flex items-center gap-2 bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] font-semibold text-xs md:text-sm px-5 py-3 rounded-full shadow-card active:scale-95 transition"
            title="Next Slide (Arrow Down or Space)"
          >
            <span>Next Slide</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => router.push('/home')}
            className="flex items-center gap-2 bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] text-[#faf7f2] font-semibold text-xs md:text-sm px-6 py-3 rounded-full shadow-card active:scale-95 transition"
          >
            <span>Enter Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* FULL-SCREEN SCROLL-SNAP PROJECTOR CONTAINER */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {/* SLIDE 1: HERO SCREEN */}
        <section className="h-screen h-[100dvh] w-full snap-start snap-always flex flex-col justify-center items-center px-6 md:px-12 text-center relative overflow-hidden">
          {/* Background Ambient Glows */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[35rem] h-[35rem] bg-[#2f4739]/5 dark:bg-[#489a69]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[30rem] h-[30rem] bg-[#8d6b4f]/5 dark:bg-[#d4a373]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-fade-in">
            {/* Transparent Logo Display */}
            <div className="flex justify-center mb-2">
              <div className="bg-transparent p-2">
                <SvgLogo className="w-20 h-20 md:w-24 md:h-24 pointer-events-none drop-shadow-md" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#2f4739]/10 dark:bg-[#489a69]/20 border border-[#2f4739]/20 dark:border-[#489a69]/40 px-4 py-2 rounded-full text-[#2f4739] dark:text-[#489a69] font-bold text-xs md:text-sm uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              Discover · Compare · Choose Better
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-tight text-[#111827] dark:text-[#f4f0ea]">
              The Green <span className="text-[#2f4739] dark:text-[#489a69] italic font-serif">Turtles</span>
            </h1>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2f4739] dark:text-[#489a69] max-w-3xl mx-auto">
              Making sustainable choices easier to discover.
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-[#374151] dark:text-[#d1d5db] max-w-2xl mx-auto font-normal leading-relaxed">
              A curated platform helping mindful shoppers discover, compare, and understand verified eco-friendly products from trusted and emerging brands.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button
                onClick={() => scrollToSlide(TOTAL_SLIDES - 1)}
                className="w-full sm:w-auto bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] font-semibold py-4 px-9 rounded-full shadow-soft hover:scale-[1.02] active:scale-95 transition text-base flex items-center justify-center gap-2.5"
              >
                Enter Marketplace <ArrowRight className="w-4 h-4 text-[#faf7f2]" />
              </button>

              <button
                onClick={() => scrollToSlide(4)}
                className="w-full sm:w-auto bg-white dark:bg-[#1a241f] hover:bg-[#fcfaf7] dark:hover:bg-[#223028] text-[#111827] dark:text-[#f4f0ea] font-semibold py-4 px-9 rounded-full border border-[#cfc4b2] dark:border-[#354a3e] hover:border-[#2f4739] transition text-base shadow-soft"
              >
                For Brands & Sellers
              </button>
            </div>

            <p className="text-xs font-semibold text-[#6b7280] dark:text-[#9ca3af] uppercase tracking-widest pt-4">
              Scroll down or press space to project next slide ↓
            </p>
          </div>
        </section>

        {/* SLIDE 2: OUR STORY / ORIGIN */}
        <section className="h-screen h-[100dvh] w-full snap-start snap-always flex flex-col justify-center items-center px-6 md:px-12 text-center relative overflow-hidden bg-white/50 dark:bg-[#161f1a]/50">
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#f2ebe3] dark:bg-[#261f1a] px-4 py-2 rounded-full border border-[#e2d6c7] dark:border-[#423227] text-[#8d6b4f] dark:text-[#d4a373] font-bold text-xs uppercase tracking-widest">
              <HeartHandshake className="w-4 h-4" /> 02 · Our Story
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#111827] dark:text-[#f4f0ea] leading-tight">
              The Green Turtle's Origin
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-[#111827] dark:text-[#f4f0ea] font-medium leading-relaxed max-w-3xl mx-auto">
              We started The Green Turtles with a simple observation: people want to make better choices, but finding products they can genuinely feel confident about is not easy.
            </p>

            <div className="bg-[#f7f4ee] dark:bg-[#1c2620] border-l-4 border-[#2f4739] dark:border-[#489a69] p-8 rounded-r-3xl shadow-card max-w-3xl mx-auto text-left">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#111827] dark:text-[#f4f0ea] font-bold leading-snug">
                "The problem isn't a shortage of solutions. It's knowing which ones are genuinely worth choosing."
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#374151] dark:text-[#d1d5db] font-normal leading-relaxed max-w-2xl mx-auto">
              Countless products are labelled <span className="italic font-semibold text-[#2f4739] dark:text-[#489a69]">eco-friendly</span> or <span className="italic font-semibold text-[#2f4739] dark:text-[#489a69]">green</span> without proof. The Green Turtles brings sustainable products together and gives consumers clear information to discover, compare, and choose with total confidence.
            </p>
          </div>
        </section>

        {/* SLIDE 3: OUR UNIQUENESS */}
        <section className="h-screen h-[100dvh] w-full snap-start snap-always flex flex-col justify-center items-center px-6 md:px-12 text-center relative overflow-hidden bg-[#faf7f2] dark:bg-[#121815]">
          <div className="relative z-10 max-w-5xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#e8ede9] dark:bg-[#1f2b23] px-4 py-2 rounded-full border border-[#d2dfd5] dark:border-[#2f4739] text-[#2f4739] dark:text-[#489a69] font-bold text-xs uppercase tracking-widest">
              <Recycle className="w-4 h-4" /> 03 · Our Uniqueness
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#111827] dark:text-[#f4f0ea]">
              What Makes Us Different
            </h2>

            <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#8d6b4f] dark:text-[#d4a373]">
              Not Another Eco Store. A Better Way To Choose.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
              <div className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] p-8 rounded-3xl shadow-card">
                <h3 className="font-serif text-2xl font-bold text-[#111827] dark:text-[#f4f0ea] mb-3">
                  The Decision Before The Purchase
                </h3>
                <p className="text-base sm:text-lg text-[#374151] dark:text-[#d1d5db] font-normal leading-relaxed">
                  Most marketplaces focus merely on pushing sales. We focus on making the decision before the purchase transparent, verified, and effortless.
                </p>
              </div>

              <div className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] p-8 rounded-3xl shadow-card">
                <h3 className="font-serif text-2xl font-bold text-[#111827] dark:text-[#f4f0ea] mb-3">
                  Information Behind The Choice
                </h3>
                <p className="text-base sm:text-lg text-[#374151] dark:text-[#d1d5db] font-normal leading-relaxed">
                  We bring materials, supply chain ethics, certifications, and carbon footprint comparisons together so you choose based on real evidence rather than marketing claims.
                </p>
              </div>
            </div>

            <div className="bg-[#f4efe6] dark:bg-[#1c2620] border border-[#e7e0d5] dark:border-[#2a3d33] rounded-3xl p-6 max-w-3xl mx-auto">
              <p className="font-serif text-lg sm:text-xl text-[#2f4739] dark:text-[#489a69] font-semibold">
                "You don't have to simply trust our taste. You get to see the data and story behind each product."
              </p>
            </div>
          </div>
        </section>

        {/* SLIDE 4: HOW WE REVIEW PRODUCTS */}
        <section className="h-screen h-[100dvh] w-full snap-start snap-always flex flex-col justify-center items-center px-6 md:px-12 text-center relative overflow-hidden bg-white/60 dark:bg-[#161f1a]/60">
          <div className="relative z-10 max-w-5xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#e8ede9] dark:bg-[#1f2b23] px-4 py-2 rounded-full border border-[#d2dfd5] dark:border-[#2f4739] text-[#2f4739] dark:text-[#489a69] font-bold text-xs uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> 04 · Trust-First Approach
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#111827] dark:text-[#f4f0ea]">
              How We Review Products
            </h2>

            <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#8d6b4f] dark:text-[#d4a373]">
              We Don't Just Ask "Is It Eco?" We Ask "What Supports The Claim?"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
              {[
                "Materials and raw composition",
                "Plastic-free & recyclable packaging",
                "Accredited eco-certifications",
                "Verified brand documentation",
                "Trackable carbon and water savings",
                "End-of-life circularity & recyclability"
              ].map((criterion, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] p-5 rounded-2xl flex items-center gap-3.5 shadow-soft"
                >
                  <div className="p-2 bg-[#e8ede9] dark:bg-[#223028] text-[#2f4739] dark:text-[#489a69] rounded-xl shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-base text-[#111827] dark:text-[#f4f0ea]">
                    {criterion}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-sm md:text-base text-[#4b5563] dark:text-[#9ca3af] italic max-w-2xl mx-auto">
              "We are not here to claim any product is magically flawless. Our goal is to make the information behind every sustainable choice transparent."
            </p>
          </div>
        </section>

        {/* SLIDE 5: FOR BRANDS & ECOSYSTEM (With Link to Why Partner Us Standalone Page) */}
        <section className="h-screen h-[100dvh] w-full snap-start snap-always flex flex-col justify-center items-center px-6 md:px-12 text-center relative overflow-hidden bg-[#faf7f2] dark:bg-[#121815]">
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#f2ebe3] dark:bg-[#261f1a] px-4 py-2 rounded-full border border-[#e2d6c7] dark:border-[#423227] text-[#8d6b4f] dark:text-[#d4a373] font-bold text-xs uppercase tracking-widest">
              <Leaf className="w-4 h-4" /> 05 · For Brands & Sellers
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#111827] dark:text-[#f4f0ea]">
              Have a Sustainable Product Worth Discovering?
            </h2>

            <p className="text-lg sm:text-xl text-[#374151] dark:text-[#d1d5db] max-w-2xl mx-auto font-normal leading-relaxed">
              The Green Turtles gives ethical brands a structured, dedicated platform to showcase products, verify sustainability credentials, and connect directly with mindful consumers.
            </p>

            <div className="flex flex-wrap justify-center gap-3 text-sm font-bold text-[#2f4739] dark:text-[#489a69]">
              {["Reach Intent Shoppers", "Zero Greenwashing Clutter", "Audience Insights", "Verified Trust Seal"].map((tag, idx) => (
                <span key={idx} className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] px-5 py-2.5 rounded-full shadow-xs">
                  • {tag}
                </span>
              ))}
            </div>

            {/* Prominent link to the standalone Why Partner Us page */}
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/why-partner-us"
                className="bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] font-semibold py-4 px-9 rounded-full shadow-soft transition active:scale-95 text-base flex items-center justify-center gap-2.5"
              >
                Explore Why Partner With Us <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/seller-home"
                className="bg-white dark:bg-[#1a241f] border border-[#cfc4b2] dark:border-[#354a3e] text-[#111827] dark:text-[#f4f0ea] hover:border-[#2f4739] font-semibold py-4 px-9 rounded-full transition active:scale-95 text-base shadow-soft"
              >
                Go to Seller Home
              </Link>
            </div>
          </div>
        </section>

        {/* SLIDE 6: THE HOME PAGE SNAP (Full-View Snapping Destination) */}
        <section className="h-screen h-[100dvh] w-full snap-start snap-always flex flex-col justify-center items-center px-6 md:px-12 text-center relative overflow-hidden bg-gradient-to-br from-[#f7f4ee] via-[#faf7f2] to-[#e8ede9] dark:from-[#1b2620] dark:via-[#161f1a] dark:to-[#121815]">
          <div className="relative z-10 max-w-5xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#2f4739]/10 dark:bg-[#489a69]/20 border border-[#2f4739]/20 dark:border-[#489a69]/40 px-4 py-2 rounded-full text-[#2f4739] dark:text-[#489a69] font-bold text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" /> 06 · Welcome Home
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#111827] dark:text-[#f4f0ea] tracking-tight leading-tight">
              Enter The <span className="text-[#2f4739] dark:text-[#489a69] italic font-serif">Green Turtles</span> Experience
            </h2>

            <p className="text-lg sm:text-xl text-[#374151] dark:text-[#d1d5db] max-w-2xl mx-auto font-normal leading-relaxed">
              Your journey starts here. Choose your destination to discover verified sustainable goods or grow your ethical brand.
            </p>

            {/* TWO LARGE SNAP CARDS: BUYER HOME & SELLER HOME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto pt-2">
              {/* Buyer Home Portal Card */}
              <div className="bg-white dark:bg-[#1a241f] border-2 border-[#2f4739]/30 dark:border-[#489a69]/40 p-8 md:p-10 rounded-[2.5rem] shadow-card hover:shadow-hover hover:border-[#2f4739] dark:hover:border-[#489a69] transition duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="p-4 bg-[#e8ede9] dark:bg-[#223028] text-[#2f4739] dark:text-[#489a69] rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-[#111827] dark:text-[#f4f0ea]">
                    Buyer Marketplace
                  </h3>
                  <p className="text-base text-[#4b5563] dark:text-[#9ca3af] leading-relaxed">
                    Shop vetted eco-goods across fashion, living, and wellness. Earn Eco-Coins on every purchase and track your carbon savings.
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => router.push('/home')}
                    className="w-full bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] font-semibold py-4 px-6 rounded-full shadow-soft transition active:scale-95 text-base flex items-center justify-center gap-2"
                  >
                    Enter Buyer Home <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Seller Home Portal Card */}
              <div className="bg-white dark:bg-[#1a241f] border-2 border-[#8d6b4f]/30 dark:border-[#d4a373]/40 p-8 md:p-10 rounded-[2.5rem] shadow-card hover:shadow-hover hover:border-[#8d6b4f] dark:hover:border-[#d4a373] transition duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="p-4 bg-[#f2ebe3] dark:bg-[#281e18] text-[#8d6b4f] dark:text-[#d4a373] rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    <Store className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-[#111827] dark:text-[#f4f0ea]">
                    Seller & Brand Hub
                  </h3>
                  <p className="text-base text-[#4b5563] dark:text-[#9ca3af] leading-relaxed">
                    Join our collective of certified eco-brands. Access transparent fee structures, inventory management, and high-intent buyers.
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => router.push('/seller-home')}
                    className="w-full bg-[#8d6b4f] hover:bg-[#6e5038] text-[#faf7f2] font-semibold py-4 px-6 rounded-full shadow-soft transition active:scale-95 text-base flex items-center justify-center gap-2"
                  >
                    Enter Seller Home <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links in Snap footer */}
            <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm font-semibold text-[#4b5563] dark:text-[#9ca3af]">
              <Link href="/why-partner-us" className="hover:text-[#2f4739] dark:hover:text-[#489a69] underline underline-offset-4">
                Why Partner With Us
              </Link>
              <span>·</span>
              <Link href="/subscribe" className="hover:text-[#2f4739] dark:hover:text-[#489a69] underline underline-offset-4">
                Stay Updated Newsletter
              </Link>
              <span>·</span>
              <Link href="/about" className="hover:text-[#2f4739] dark:hover:text-[#489a69] underline underline-offset-4">
                Our Mission & Story
              </Link>
              <span>·</span>
              <Link href="/contact" className="hover:text-[#2f4739] dark:hover:text-[#489a69] underline underline-offset-4">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
