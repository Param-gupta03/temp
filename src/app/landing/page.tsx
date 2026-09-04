"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Leaf,
  Recycle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Globe,
  ArrowDown,
  HeartHandshake,
  CheckCircle,
  Mail,
  Instagram,
  Eye,
  BarChart3,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import SvgLogo from '@/svg';

const LandingPage = () => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleExploreShop = () => {
    router.push('/home');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dishasikka@thegreenturtles.in');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen min-w-screen bg-[#faf7f2] text-[#1c1917] selection:bg-[#2f4739]/15 selection:text-[#2f4739] overflow-x-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[10%] w-[35rem] h-[35rem] bg-[#2f4739]/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-[10%] right-[10%] w-[30rem] h-[30rem] bg-[#8d6b4f]/5 rounded-full blur-[100px]"></div>
        <div className="absolute top-[40%] left-[30%] w-[25rem] h-[25rem] bg-[#2f4739]/3 rounded-full blur-[120px]"></div>
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-20 pb-16 md:pt-32 md:pb-24 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-[#e8ede9] border border-[#d2dfd5] px-4 py-2 rounded-full text-[#2f4739] font-semibold text-xs md:text-sm uppercase tracking-widest mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#2f4739]" />
          Discover · Compare · Choose Better
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight max-w-5xl text-[#1c1917]">
          The Green <span className="text-[#2f4739] italic font-serif">Turtles</span>
        </h1>

        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-[#2f4739] max-w-3xl mb-6">
          Making sustainable choices easier to discover.
        </h2>

        <p className="text-base md:text-lg text-[#66615b] max-w-2xl mb-10 font-normal leading-relaxed">
          A curated platform helping people discover, compare and understand sustainable products from emerging and trusted brands.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={handleExploreShop}
            className="w-full sm:w-auto bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] font-semibold py-4 px-9 rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all text-sm md:text-base flex items-center justify-center gap-2.5"
          >
            Enter Marketplace <ArrowRight className="w-4 h-4 text-[#faf7f2]" />
          </button>
          <button
            onClick={() => scrollToSection('brands-section')}
            className="w-full sm:w-auto bg-white hover:bg-[#fcfaf7] text-[#1c1917] font-semibold py-4 px-9 rounded-full border border-[#cfc4b2] hover:border-[#2f4739] transition-all text-sm md:text-base shadow-sm"
          >
            For Brands
          </button>
        </div>

        <div className="mt-16 animate-bounce">
          <button
            onClick={() => scrollToSection('story-section')}
            className="p-3 bg-white border border-[#e7e0d5] rounded-full hover:border-[#2f4739] transition-colors shadow-sm"
          >
            <ArrowDown className="w-4 h-4 text-[#2f4739]" />
          </button>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section id="story-section" className="relative z-10 py-20 border-t border-[#e7e0d5] bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#f2ebe3] px-3.5 py-1.5 rounded-full border border-[#e2d6c7] text-[#8d6b4f] font-semibold text-xs uppercase tracking-wider">
                <HeartHandshake className="w-3.5 h-3.5" /> Our Story
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1c1917] leading-tight">
                 The Green Turtle's Origin
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-[#44403c]">
              <p className="text-lg md:text-xl text-[#1c1917] font-medium leading-relaxed">
                We started The Green Turtles with a simple observation: people want to make better choices, but finding products they can genuinely feel confident about is not always easy.
              </p>
              <p className="text-[#66615b] font-normal leading-relaxed">
                There are countless products labelled <span className="italic text-[#2f4739] font-semibold">eco-friendly</span>, <span className="italic text-[#2f4739] font-semibold">green</span> or <span className="italic text-[#2f4739] font-semibold">sustainable</span>. But what do those claims actually mean? What is the product made from? How is it packaged? Does the brand have supporting credentials? And is there a better alternative?
              </p>
              
              <div className="bg-[#f7f4ee] border-l-4 border-[#2f4739] p-6 rounded-r-2xl my-6">
                <p className="font-serif text-lg md:text-xl text-[#1c1917] font-bold leading-relaxed">
                  "The problem isn't a shortage of solutions. It's knowing which ones are worth choosing."
                </p>
              </div>

              <p className="text-[#66615b] font-normal leading-relaxed">
                The Green Turtles is being built to make that journey simpler: bringing sustainable products together and giving consumers clearer information to discover, compare and choose with more confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR UNIQUENESS SECTION */}
      <section className="relative z-10 py-20 border-t border-[#e7e0d5] bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-[#e8ede9] px-3.5 py-1.5 rounded-full border border-[#d2dfd5] text-[#2f4739] font-semibold text-xs uppercase tracking-wider mb-4">
              <Recycle className="w-3.5 h-3.5" /> Our Uniqueness
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1c1917] mb-4">
               What Makes Us Different
            </h2>
            <p className="font-serif text-xl md:text-2xl font-semibold text-[#8d6b4f]">
              Not Another Eco Store. A Better Way To Choose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white border border-[#e7e0d5] p-8 rounded-3xl shadow-[0_4px_20px_rgba(47,71,57,0.03)] hover:border-[#cfc4b2] transition duration-300">
              <p className="text-base md:text-lg text-[#44403c] font-normal leading-relaxed">
                Most marketplaces focus on selling products. We want to make the <strong className="text-[#1c1917] font-bold">decision before the purchase</strong> easier.
              </p>
            </div>

            <div className="bg-white border border-[#e7e0d5] p-8 rounded-3xl shadow-[0_4px_20px_rgba(47,71,57,0.03)] hover:border-[#cfc4b2] transition duration-300">
              <p className="text-base md:text-lg text-[#44403c] font-normal leading-relaxed">
                We bring product information, sustainability credentials and relevant environmental considerations together so consumers can compare options instead of choosing based only on marketing claims.
              </p>
            </div>
          </div>

          <div className="mt-10 bg-[#f4efe6] border border-[#e7e0d5] rounded-3xl p-7 max-w-3xl mx-auto text-center">
            <p className="font-serif text-lg md:text-xl text-[#2f4739] font-semibold">
              "You don't have to simply trust our taste. You get to see the information behind the choice."
            </p>
          </div>
        </div>
      </section>

      {/* HOW WE REVIEW PRODUCTS SECTION */}
      <section className="relative z-10 py-20 border-t border-[#e7e0d5] bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#e8ede9] px-3.5 py-1.5 rounded-full border border-[#d2dfd5] text-[#2f4739] font-semibold text-xs uppercase tracking-wider mb-4">
              <CheckCircle className="w-3.5 h-3.5" /> How We Review Products
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1c1917] mb-3">
              Our Trust-First Approach
            </h2>
            <p className="font-serif text-xl font-semibold text-[#8d6b4f]">
              We Don't Just Ask "Is It Eco?" We Ask "What Supports The Claim?"
            </p>
            <p className="text-[#66615b] text-base mt-4 font-normal">
              Before a product is listed, we review the information provided by the brand and consider relevant supporting evidence, such as:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              "Materials and product composition",
              "Packaging information",
              "Sustainability-related certifications",
              "Brand-provided documentation",
              "Available environmental information",
              "Relevant lifecycle considerations"
            ].map((criterion, idx) => (
              <div key={idx} className="bg-[#faf7f2] border border-[#e7e0d5] p-6 rounded-2xl hover:border-[#cfc4b2] transition-all duration-300 flex items-start gap-3.5 group">
                <div className="p-2 bg-[#e8ede9] text-[#2f4739] rounded-xl shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <h4 className="font-medium text-[#1c1917] text-base mt-0.5">{criterion}</h4>
              </div>
            ))}
          </div>

          <div className="bg-[#f7f4ee] border border-[#e7e0d5] rounded-3xl p-7 max-w-3xl mx-auto text-center">
            <p className="font-serif text-base md:text-lg text-[#66615b] italic">
              "We are not here to say that any product is perfectly sustainable. Our goal is to make the information behind a product clearer and more useful for consumers."
            </p>
          </div>
        </div>
      </section>

      {/* WHY TRUST US SECTION */}
      <section className="relative z-10 py-20 border-t border-[#e7e0d5] bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 bg-[#e8ede9] px-3.5 py-1.5 rounded-full border border-[#d2dfd5] text-[#2f4739] font-semibold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> Why Trust Us?
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1c1917] leading-tight">
                We're Not Asking For Your Trust. We're Earning It.
              </h2>
              <div className="space-y-4 text-[#44403c] font-normal leading-relaxed text-base">
                <p>
                  We are new, and we're not pretending otherwise. What we can promise is that we will keep our approach transparent and continue improving how we review and present product information.
                </p>
                <p>
                  Brands may pay for listing, visibility or promotional opportunities, but <strong className="text-[#1c1917] font-semibold">payment does not determine whether a product meets our listing criteria.</strong>
                </p>
                <p>
                  We will be clear about what we know, what is supported, and where information is still limited.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white border border-[#e7e0d5] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[0_4px_24px_rgba(47,71,57,0.04)]">
                <div className="flex flex-col items-center text-center space-y-5 relative z-10">
                  <div className="p-4 bg-[#e8ede9] rounded-full text-[#2f4739]">
                    <SvgLogo className="w-14 h-14 text-[#2f4739]" />
                  </div>
                  <p className="font-serif text-xl md:text-2xl text-[#2f4739] font-semibold leading-relaxed">
                    "Trust isn't a badge we hand out. It's something we build with you, one better-informed choice at a time."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR BRANDS SECTION */}
      <section id="brands-section" className="relative z-10 py-20 border-t border-[#e7e0d5] bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-[#f2ebe3] px-3.5 py-1.5 rounded-full border border-[#e2d6c7] text-[#8d6b4f] font-semibold text-xs uppercase tracking-wider mb-4">
              <Leaf className="w-3.5 h-3.5" /> For Brands
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1c1917] mb-4">
              Have a sustainable product worth discovering?
            </h2>
            <p className="text-base md:text-lg text-[#66615b] font-normal">
              The Green Turtles gives brands a structured place to showcase their products, sustainability information and story to consumers looking for better alternatives.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-14 text-xs md:text-sm font-semibold text-[#2f4739]">
            {["Discoverability", "Visibility", "Consumer Insights", "Sustainability Story"].map((tag, idx) => (
              <span key={idx} className="bg-[#f4efe6] border border-[#e7e0d5] px-5 py-2.5 rounded-full">
                • {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
            <div className="bg-[#faf7f2] border border-[#e7e0d5] p-8 rounded-3xl flex flex-col justify-center">
              <p className="text-base md:text-lg text-[#44403c] font-normal leading-relaxed">
                The Green Turtles brings sustainable products and brands together in one place so consumers can <strong className="text-[#1c1917] font-bold">discover, compare and choose</strong> with more confidence.
              </p>
            </div>

            <div className="bg-[#faf7f2] border border-[#e7e0d5] p-8 rounded-3xl space-y-4">
              <h4 className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Our approach focuses on three things:</h4>
              <ul className="space-y-3.5 text-[#66615b] font-normal text-sm">
                <li className="flex gap-3">
                  <span className="text-[#2f4739] font-bold">DISCOVER</span>
                  <span>Help people find sustainable alternatives for everyday needs.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#2f4739] font-bold">COMPARE</span>
                  <span>Make product and sustainability information easier to understand.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#2f4739] font-bold">TRUST</span>
                  <span>Present sustainability claims, certifications and product information clearly.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* WHY PARTNER WITH US */}
          <div className="space-y-10 max-w-6xl mx-auto mb-20">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-center text-[#1c1917]">Why Partner With Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Share2, title: "Reach", desc: "Get discovered by consumers looking for sustainable alternatives." },
                { icon: Eye, title: "Visibility", desc: "Give your products a dedicated, structured presence on the platform." },
                { icon: BarChart3, title: "Insights", desc: "Access product engagement and visibility data as the platform grows." },
                { icon: ShieldCheck, title: "Trust", desc: "Present your sustainability story, certifications and product information clearly." }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-white border border-[#e7e0d5] p-6 rounded-2xl flex flex-col gap-3.5 hover:border-[#cfc4b2] transition-all duration-300 shadow-[0_2px_10px_rgba(47,71,57,0.03)]">
                    <div className="p-3 bg-[#e8ede9] text-[#2f4739] rounded-xl w-fit">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1c1917] text-base mb-1.5">{item.title}</h4>
                      <p className="text-xs text-[#78716c] leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div className="space-y-10 max-w-4xl mx-auto mb-20">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-center text-[#1c1917]">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 relative">
              {[
                { step: "01", title: "Share", desc: "Your brand and product details" },
                { step: "02", title: "Review", desc: "Product information and sustainability credentials" },
                { step: "03", title: "List", desc: "Your products go live for discovery" },
                { step: "04", title: "Grow", desc: "Build visibility and understand consumer interest" }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#faf7f2] border border-[#e7e0d5] p-5 rounded-2xl space-y-3">
                  <div className="text-xs font-bold text-[#2f4739] bg-[#e8ede9] px-2.5 py-1 rounded-full w-fit">
                    {item.step}
                  </div>
                  <h4 className="text-base font-semibold text-[#1c1917]">{item.title}</h4>
                  <p className="text-[#78716c] text-xs leading-relaxed font-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* A TRUST-FIRST APPROACH (FOR BRANDS) */}
          <div className="bg-[#f7f4ee] border border-[#e7e0d5] p-8 md:p-12 rounded-3xl max-w-4xl mx-auto space-y-6">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1c1917] flex items-center gap-3">
              <ShieldCheck className="text-[#2f4739] w-7 h-7" /> A Trust-First Approach
            </h3>
            <p className="text-[#44403c] text-base leading-relaxed font-normal">
              We believe sustainability should be <strong className="text-[#1c1917] font-semibold">demonstrated, not simply claimed.</strong> The Green Turtles aims to make product information more transparent by considering:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs font-medium text-[#66615b] pt-2">
              {[
                "Sustainability-related certifications",
                "Product composition and materials",
                "Available environmental information",
                "Relevant lifecycle considerations",
                "Brand-provided documentation",
                "A defined product-validation framework"
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle className="text-[#2f4739] w-4 h-4 shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
            <p className="font-serif text-base md:text-lg text-[#2f4739] font-medium italic border-t border-[#e7e0d5] pt-5 mt-5">
              "Consumers will be able to understand why a product is considered sustainable, rather than relying solely on marketing claims."
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION SECTION */}
      <section className="relative z-10 py-20 border-t border-[#e7e0d5] bg-[#f4efe6]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1c1917] leading-tight">
            Let's Make Sustainable Products Easier to Choose.
          </h2>
          <p className="text-base md:text-lg text-[#66615b] max-w-2xl mx-auto font-normal">
            Interested in becoming an early partner? We would love to learn about your brand, understand your products and explore how we can help more consumers discover them.
          </p>

          {/* Interactive Card */}
          <div className="bg-white border border-[#e7e0d5] p-8 rounded-3xl max-w-xl mx-auto space-y-6 text-left shadow-[0_8px_30px_rgba(47,71,57,0.05)]">
            <div>
              <h4 className="font-serif text-2xl font-bold text-[#1c1917]">The Green Turtles</h4>
              <p className="text-xs text-[#8d6b4f] font-medium mt-1">Discover. Compare. Choose Better.</p>
            </div>

            <div className="space-y-4 border-t border-[#e7e0d5] pt-5 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#8a847c] font-semibold uppercase tracking-wider text-[11px]">Email Contact</span>
                <div className="flex items-center gap-2">
                  <a href="mailto:dishasikka@thegreenturtles.in" className="text-[#1c1917] hover:text-[#2f4739] hover:underline font-medium text-xs transition duration-200">
                    dishasikka@thegreenturtles.in
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 bg-[#f4efe6] hover:bg-[#e8ded1] rounded-lg text-[#66615b] hover:text-[#1c1917] transition"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#2f4739]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#8a847c] font-semibold uppercase tracking-wider text-[11px]">Website</span>
                <a href="https://thegreenturtles.in" target="_blank" rel="noopener noreferrer" className="text-[#1c1917] hover:text-[#2f4739] hover:underline font-medium text-xs transition duration-200 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#2f4739]" /> thegreenturtles.in
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#8a847c] font-semibold uppercase tracking-wider text-[11px]">Instagram</span>
                <a href="https://instagram.com/thegreenturtles.in" target="_blank" rel="noopener noreferrer" className="text-[#1c1917] hover:text-[#2f4739] hover:underline font-medium text-xs transition duration-200 flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-[#2f4739]" /> @thegreenturtles.in
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2 items-center">
            <a
              href="mailto:dishasikka@thegreenturtles.in"
              className="w-full sm:w-auto bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] font-semibold py-4 px-9 rounded-full shadow-sm transition active:scale-95 text-sm md:text-base flex items-center justify-center gap-2.5"
            >
              <Mail className="w-4 h-4 text-[#faf7f2]" /> Become an Early Partner
            </a>
            <button
              onClick={handleExploreShop}
              className="w-full sm:w-auto bg-white hover:bg-[#fcfaf7] text-[#1c1917] font-semibold py-4 px-9 rounded-full border border-[#cfc4b2] hover:border-[#2f4739] transition active:scale-95 text-sm md:text-base shadow-sm"
            >
              Explore Shop
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
