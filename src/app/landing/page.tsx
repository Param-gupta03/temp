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
    <div className="min-h-screen min-w-screen bg-slate-950 text-slate-100 selection:bg-green-500/30 overflow-x-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[10%] w-[35rem] h-[35rem] bg-green-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[10%] right-[10%] w-[30rem] h-[30rem] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-[25rem] h-[25rem] bg-teal-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* HERO SECTION */}
      <section className="relative z-10 pt-24 pb-20 md:pt-36 md:pb-32 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-green-400 font-semibold text-xs md:text-sm uppercase tracking-widest mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-green-400 animate-pulse" />
          Discover · Compare · Choose Better
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-none max-w-5xl">
          The Green <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">Turtles</span>
        </h1>

        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-200 max-w-3xl mb-6">
          Making sustainable choices easier to discover.
        </h2>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 font-medium leading-relaxed">
          A curated platform helping people discover, compare and understand sustainable products from emerging and trusted brands.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <button
            onClick={handleExploreShop}
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-slate-950 font-black py-4 px-10 rounded-2xl shadow-xl shadow-green-950/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 text-lg flex items-center justify-center gap-3"
          >
            Enter Marketplace <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>
          <button
            onClick={() => scrollToSection('brands-section')}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold py-4 px-10 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-200 text-lg"
          >
            For Brands
          </button>
        </div>

        <div className="mt-20 animate-bounce">
          <button
            onClick={() => scrollToSection('story-section')}
            className="p-3 bg-slate-900 border border-slate-800 rounded-full hover:border-green-500/50 transition-colors"
          >
            <ArrowDown className="w-5 h-5 text-green-400" />
          </button>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section id="story-section" className="relative z-10 py-24 border-t border-slate-900 bg-slate-950/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-500/10 px-3.5 py-1.5 rounded-xl border border-green-500/20 text-green-400 font-bold text-xs uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" /> Our Story
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                 The Green Turtle's Origin
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
                We started The Green Turtles with a simple observation: people want to make better choices, but finding products they can genuinely feel confident about is not always easy.
              </p>
              <p className="text-slate-400 font-medium leading-relaxed">
                There are countless products labelled <span className="italic text-green-400 font-semibold">eco-friendly</span>, <span className="italic text-green-400 font-semibold">green</span> or <span className="italic text-green-400 font-semibold">sustainable</span>. But what do those claims actually mean? What is the product made from? How is it packaged? Does the brand have supporting credentials? And is there a better alternative?
              </p>
              
              <div className="bg-slate-900 border-l-4 border-green-500 p-6 rounded-r-2xl my-8">
                <p className="text-xl md:text-2xl text-white font-extrabold leading-relaxed">
                  "The problem isn't a shortage of solutions. It's knowing which ones are worth choosing."
                </p>
              </div>

              <p className="text-slate-300 font-medium leading-relaxed">
                The Green Turtles is being built to make that journey simpler: bringing sustainable products together and giving consumers clearer information to discover, compare and choose with more confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR UNIQUENESS SECTION */}
      <section className="relative z-10 py-24 border-t border-slate-900 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-6">
              <Recycle className="w-4 h-4" /> Our Uniqueness
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
               What Makes Us Different
            </h2>
            <p className="text-2xl font-bold text-green-400">
              Not Another Eco Store. A Better Way To Choose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] hover:border-green-500/20 transition duration-300">
              <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
                Most marketplaces focus on selling products. We want to make the <strong className="text-white font-black">decision before the purchase</strong> easier.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] hover:border-emerald-500/20 transition duration-300">
              <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
                We bring product information, sustainability credentials and relevant environmental considerations together so consumers can compare options instead of choosing based only on marketing claims.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-green-950/20 via-slate-900 to-green-950/20 border border-slate-800 rounded-3xl p-8 max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-green-400 font-black">
              "You don't have to simply trust our taste. You get to see the information behind the choice."
            </p>
          </div>
        </div>
      </section>

      {/* HOW WE REVIEW PRODUCTS SECTION */}
      <section className="relative z-10 py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 px-3.5 py-1.5 rounded-xl border border-teal-500/20 text-teal-400 font-bold text-xs uppercase tracking-wider mb-6">
              <CheckCircle className="w-4 h-4" /> How We Review Products
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Our Trust-First Approach
            </h2>
            <p className="text-2xl font-bold text-slate-300">
              We Don't Just Ask "Is It Eco?" We Ask "What Supports The Claim?"
            </p>
            <p className="text-slate-400 text-lg mt-6">
              Before a product is listed, we review the information provided by the brand and consider relevant supporting evidence, such as:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              "Materials and product composition",
              "Packaging information",
              "Sustainability-related certifications",
              "Brand-provided documentation",
              "Available environmental information",
              "Relevant lifecycle considerations"
            ].map((criterion, idx) => (
              <div key={idx} className="bg-slate-900/30 border border-slate-800/80 p-8 rounded-[2rem] hover:border-green-500/30 transition-all duration-300 flex items-start gap-4 group">
                <div className="p-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl group-hover:bg-green-500 group-hover:text-slate-950 transition-colors duration-300 shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-lg mt-1">{criterion}</h4>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-3xl mx-auto text-center">
            <p className="text-lg md:text-xl text-slate-300 font-medium italic">
              "We are not here to say that any product is perfectly sustainable. Our goal is to make the information behind a product clearer and more useful for consumers."
            </p>
          </div>
        </div>
      </section>

      {/* WHY TRUST US SECTION */}
      <section className="relative z-10 py-24 border-t border-slate-900 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-500/10 px-3.5 py-1.5 rounded-xl border border-green-500/20 text-green-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Why Trust Us?
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                We're Not Asking For Your Trust. We're Earning It.
              </h2>
              <div className="space-y-6 text-slate-300 font-medium leading-relaxed">
                <p>
                  We are new, and we're not pretending otherwise. What we can promise is that we will keep our approach transparent and continue improving how we review and present product information.
                </p>
                <p>
                  Brands may pay for listing, visibility or promotional opportunities, but <strong className="text-white font-bold">payment does not determine whether a product meets our listing criteria.</strong>
                </p>
                <p>
                  We will be clear about what we know, what is supported, and where information is still limited.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-slate-900 border border-slate-800/80 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-all duration-500"></div>
                <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-full text-green-400">
                    <SvgLogo className="w-16 h-16 text-green-400" />
                  </div>
                  <p className="text-2xl md:text-3xl text-green-400 font-black tracking-wide leading-relaxed">
                    "Trust isn't a badge we hand out. It's something we build with you, one better-informed choice at a time."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR BRANDS SECTION */}
      <section id="brands-section" className="relative z-10 py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-6">
              <Leaf className="w-4 h-4" /> For Brands
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Have a sustainable product worth discovering?
            </h2>
            <p className="text-lg md:text-xl text-slate-300 font-medium">
              The Green Turtles gives brands a structured place to showcase their products, sustainability information and story to consumers looking for better alternatives.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 text-sm md:text-base font-bold text-green-400">
            {["Discoverability", "Visibility", "Consumer Insights", "Sustainability Story"].map((tag, idx) => (
              <span key={idx} className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-full shadow-inner">
                • {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] flex flex-col justify-center">
              <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
                The Green Turtles brings sustainable products and brands together in one place so consumers can <strong className="text-white font-bold">discover, compare and choose</strong> with more confidence.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] space-y-4">
              <h4 className="text-lg font-bold text-white uppercase tracking-wider">Our approach focuses on three things:</h4>
              <ul className="space-y-4 text-slate-300 font-medium">
                <li className="flex gap-3">
                  <span className="text-green-400 font-bold">DISCOVER</span>
                  <span>Help people find sustainable alternatives for everyday needs.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold">COMPARE</span>
                  <span>Make product and sustainability information easier to understand.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-teal-400 font-bold">TRUST</span>
                  <span>Present sustainability claims, certifications and product information clearly.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* WHY PARTNER WITH US */}
          <div className="space-y-12 max-w-6xl mx-auto mb-24">
            <h3 className="text-3xl font-black text-center text-white">Why Partner With Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Share2, title: "Reach", desc: "Get discovered by consumers looking for sustainable alternatives." },
                { icon: Eye, title: "Visibility", desc: "Give your products a dedicated, structured presence on the platform." },
                { icon: BarChart3, title: "Insights", desc: "Access product engagement and visibility data as the platform grows." },
                { icon: ShieldCheck, title: "Trust", desc: "Present your sustainability story, certifications and product information clearly." }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-4 group hover:border-green-500/30 transition-all duration-300">
                    <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl w-fit group-hover:bg-green-500 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div className="space-y-12 max-w-4xl mx-auto mb-24">
            <h3 className="text-3xl font-black text-center text-white">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {[
                { step: "01", title: "Share", desc: "Your brand and product details" },
                { step: "02", title: "Review", desc: "Product information and sustainability credentials" },
                { step: "03", title: "List", desc: "Your products go live for discovery" },
                { step: "04", title: "Grow", desc: "Build visibility and understand consumer interest" }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-green-500/25 transition">
                  <div className="text-xs font-black text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20 w-fit font-mono">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold text-white">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* A TRUST-FIRST APPROACH (FOR BRANDS) */}
          <div className="bg-slate-900/40 border border-slate-800 p-8 md:p-12 rounded-[2.5rem] max-w-4xl mx-auto space-y-6">
            <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
              <ShieldCheck className="text-green-500 w-8 h-8" /> A Trust-First Approach
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              We believe sustainability should be <strong className="text-white font-bold">demonstrated, not simply claimed.</strong> the green turtles aims to make product information more transparent by considering:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium text-slate-400 pt-2">
              {[
                "Sustainability-related certifications",
                "Product composition and materials",
                "Available environmental information",
                "Relevant lifecycle considerations",
                "Brand-provided documentation",
                "A defined product-validation framework"
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-5 h-5 shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
            <p className="text-xl text-green-400 font-extrabold italic border-t border-slate-800 pt-6 mt-6">
              "Consumers will be able to understand why a product is considered sustainable, rather than relying solely on marketing claims."
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION SECTION */}
      <section className="relative z-10 py-24 border-t border-slate-900 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Let's Make Sustainable Products Easier to Choose.
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Interested in becoming an early partner? We would love to learn about your brand, understand your products and explore how we can help more consumers discover them.
          </p>

          {/* Interactive Card */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-xl mx-auto space-y-6 text-left shadow-2xl">
            <div>
              <h4 className="text-2xl font-black text-white">the green turtles</h4>
              <p className="text-sm text-green-400 font-bold italic mt-1">Discover. Compare. Choose Better.</p>
            </div>

            <div className="space-y-4 border-t border-slate-800 pt-6 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">Email Contact</span>
                <div className="flex items-center gap-2">
                  <a href="mailto:dishasikka@thegreenturtles.in" className="text-slate-200 hover:text-green-400 hover:underline font-bold transition duration-200">
                    dishasikka@thegreenturtles.in
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">Website</span>
                <a href="https://thegreenturtles.in" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-green-400 hover:underline font-bold transition duration-200 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-green-500" /> thegreenturtles.in
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">Instagram</span>
                <a href="https://instagram.com/thegreenturtles.in" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-green-400 hover:underline font-bold transition duration-200 flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-green-500" /> @thegreenturtles.in
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4 items-center">
            <a
              href="mailto:dishasikka@thegreenturtles.in"
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-slate-950 font-black py-4.5 px-12 rounded-2xl shadow-xl shadow-green-950/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 text-lg flex items-center justify-center gap-3"
            >
              <Mail className="w-5 h-5 text-slate-950" /> Become an Early Partner
            </a>
            <button
              onClick={handleExploreShop}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold py-4.5 px-12 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-200 text-lg"
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
