"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Leaf,
  Recycle,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Truck,
  CheckCircle,
  Globe,
  Coins,
  ArrowDown,
  Lock,
  HeartHandshake
} from 'lucide-react';
import SvgLogo from '@/svg';

const WhyJoinUsPage = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const handleJoinMovement = () => {
    router.push('/register');
  };

  const handleExploreShop = () => {
    router.push('/home');
  };

  const steps = [
    {
      title: "1. Sourcing",
      icon: Leaf,
      subtitle: "Regenerative & Organic Raw Materials",
      desc: "Every product starts with materials harvested in harmony with nature. We restrict virgin plastics and prioritize FSC-certified wood, organic cotton, and post-consumer recycled fabrics."
    },
    {
      title: "2. Clean Production",
      icon: ShieldCheck,
      subtitle: "Low Emission & Ethical Labor",
      desc: "We ensure our manufacturing partners employ renewable energy, eliminate toxic water discharge, and respect human rights by enforcing living wage compliance across the board."
    },
    {
      title: "3. Compostable Shipping",
      icon: Truck,
      subtitle: "Plastic-Free, Zero-Waste Delivery",
      desc: "No bubble wrap, no plastic tapes. Our logistics model uses 100% biodegradable cornstarch mailers and recycled paper boxes, and every shipment has its carbon footprint offset by 110%."
    },
    {
      title: "4. Conscious Usage",
      icon: Sparkles,
      subtitle: "Durability, Health, & Energy Efficiency",
      desc: "Products are engineered to last, repairable by design, and strictly free from endocrine disruptors, VOCs, or forever-chemicals (PFAS) that could harm your household."
    },
    {
      title: "5. The Circular Loop",
      icon: Recycle,
      subtitle: "Product Return & Reward Economy",
      desc: "Instead of throwing worn-out items away, ship them back to us. We break them down or upcycle them, rewarding you with Green Turtle Eco-Coins for keeping materials out of landfills."
    }
  ];

  return (
    <div className="min-h-screen min-w-screen bg-slate-950 text-slate-100 selection:bg-green-500/30 overflow-x-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[10%] w-[35rem] h-[35rem] bg-green-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[10%] right-[10%] w-[30rem] h-[30rem] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-[25rem] h-[25rem] bg-teal-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Grid Overlay for Premium Feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* HERO SECTION */}
      <section className="relative z-10 pt-24 pb-20 md:pt-36 md:pb-32 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-green-400 font-semibold text-xs md:text-sm uppercase tracking-widest mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-green-400 animate-spin" style={{ animationDuration: '3s' }} />
          A New Standard for Green Commerce
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-none max-w-5xl">
          Where sustainability <br />
          meets <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">uncompromising integrity</span>.
        </h1>

        <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mb-12 font-medium leading-relaxed">
          Green Turtle is a verified circular marketplace. We filter out greenwashing to connect you with brands that hold certified ecological integrity.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <button
            onClick={handleExploreShop}
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-slate-950 font-black py-4 px-10 rounded-2xl shadow-xl shadow-green-950/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 text-lg flex items-center justify-center gap-3"
          >
            Enter Marketplace <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>
          <button
            onClick={() => {
              document.getElementById('story-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold py-4 px-10 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-200 text-lg"
          >
            Learn Our Story
          </button>
        </div>

        <div className="mt-20 animate-bounce">
          <button
            onClick={() => {
              document.getElementById('story-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-3 bg-slate-900 border border-slate-800 rounded-full hover:border-green-500/50 transition-colors"
          >
            <ArrowDown className="w-5 h-5 text-green-400" />
          </button>
        </div>
      </section>

      {/* THE FULL STORY SECTION */}
      <section id="story-section" className="relative z-10 py-24 border-t border-slate-900 bg-slate-950/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Title / Hook */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-500/10 px-3.5 py-1.5 rounded-xl border border-green-500/20 text-green-400 font-bold text-xs uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" /> The Turtle's Origin
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Our Story: <br />
                Born out of a simple, frustrating truth.
              </h2>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                In a sea of "eco-friendly" claims, greenwashing is the norm. Corporations sell plastic under the guise of recycle tags, and finding genuine, circular products is a part-time job.
              </p>
            </div>

            {/* Main Story Content */}
            <div className="lg:col-span-7 bg-slate-900/50 border border-slate-800/80 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-all duration-500"></div>
              <div className="space-y-6 text-slate-300 font-medium leading-relaxed text-base md:text-lg">
                <p>
                  Green Turtle wasn't created by looking at market charts. It began with our founder, Param, trying to transition to a zero-waste household. Hour after hour was wasted digging through obscure carbon statements, looking up plastic polymer structures, and verifying fake organic stamps.
                </p>
                <p className="text-slate-400 border-l-2 border-green-500 pl-6 my-6 italic">
                  "If we want the world to change, we must make sustainable shopping effortless, clear, and mathematically honest."
                </p>
                <p>
                  We realized that consumer choice alone cannot fix our environment unless consumers have complete, audited transparency. That's why we created a marketplace with a core commitment: **to build a circular commerce engine that does the vetting for you.**
                </p>
                <p>
                  Today, we stand as a gatekeeper. We curate authentic eco-pioneers, verify their supply chains, trace every product's lifetime journey, and reward conscious actions to keep plastics out of oceans. One verified choice at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS DIFFERENT SECTION */}
      <section className="relative z-10 py-24 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-6">
              <Recycle className="w-4 h-4" /> The Green Turtle Difference
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              What we are creating is completely different.
            </h2>
            <p className="text-lg text-slate-400 font-medium">
              We aren't just selling products. We are building a closed-loop economy that ties purchases directly back to circular reuse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/30 border border-slate-800 p-8 md:p-10 rounded-[2rem] hover:border-green-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition duration-300">
                <Coins className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">The Eco-Coins Economy</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                Earn Green Turtle Eco-Coins automatically when you purchase sustainable goods or return packaging. Spend them to offset prices, trade for eco-rewards, or donate them to audited reforestation and cleanup charities.
              </p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 p-8 md:p-10 rounded-[2rem] hover:border-emerald-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition duration-300">
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Exhaustive 4-Step Vendor Auditing</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                No self-declarations. Every merchant on Green Turtle submits material logs, energy audit bills, packaging compositions, and social equity reports. If a brand cannot prove its green claims under audit, we don't list them.
              </p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 p-8 md:p-10 rounded-[2rem] hover:border-teal-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition duration-300">
                <Globe className="w-7 h-7 text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Open Material Ledgers</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                Click any product to trace its raw material origins, manufacturing location, and calculated footprint. We present structured lifecycle assessments so you make decisions based on data, not corporate storytelling.
              </p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 p-8 md:p-10 rounded-[2rem] hover:border-green-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition duration-300">
                <Truck className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Zero-Plastic Delivery Loop</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                We manage logistics partnerships directly. All packages are shipped in water-soluble, biodegradable, or highly reusable mailers. We coordinate local pickup systems to return packaging, keeping waste at absolute zero.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LIFE CYCLE SECTION (INTERACTIVE) */}
      <section className="relative z-10 py-24 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-green-500/10 px-3.5 py-1.5 rounded-xl border border-green-500/20 text-green-400 font-bold text-xs uppercase tracking-wider mb-6">
              <Recycle className="w-4 h-4" /> The Green Turtle Loop
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Our Circular Lifecycle
            </h2>
            <p className="text-lg text-slate-400 font-medium">
              We design and audit for a closed-loop system. Select a phase below to explore how a Green Turtle product travels.
            </p>
          </div>

          {/* Interactive Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-12">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 flex lg:flex-col justify-between items-start gap-4 ${
                    isActive
                      ? 'bg-slate-900 border-green-500 shadow-lg shadow-green-950/20'
                      : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-green-500 text-slate-950' : 'bg-slate-900 text-green-400'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base md:text-lg">{step.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 hidden lg:block">Click to reveal details</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 shrink-0">
                {React.createElement(steps[activeStep].icon, { className: "w-10 h-10" })}
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-green-400 uppercase tracking-widest">{steps[activeStep].title} Details</h4>
                <h3 className="text-2xl md:text-3xl font-black text-white">{steps[activeStep].subtitle}</h3>
                <p className="text-slate-300 font-medium text-lg leading-relaxed max-w-4xl">
                  {steps[activeStep].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY TRUST US SECTION */}
      <section className="relative z-10 py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Radical Trust
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Why you should trust Green Turtle.
              </h2>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                Trust shouldn't be blindly given—it should be calculated and proven. We establish trust through direct, publicly available validation.
              </p>

              <div className="space-y-6 pt-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0 font-bold">✓</div>
                  <div>
                    <h4 className="font-bold text-white">Public Vendor Auditing Logs</h4>
                    <p className="text-sm text-slate-400">All audit assessments are uploaded directly to the platform for open user verification.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0 font-bold">✓</div>
                  <div>
                    <h4 className="font-bold text-white">Double-Tier Vetting Process</h4>
                    <p className="text-sm text-slate-400">First, we verify official globally-recognized certificates; second, we run independent local material tests.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0 font-bold">✓</div>
                  <div>
                    <h4 className="font-bold text-white">Zero Tolerance Policy</h4>
                    <p className="text-sm text-slate-400">Any vendor caught providing falsified certifications is blacklisted and fined, with proceeds split among affected buyers.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Trust Grid / Creative Element */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-4">
                <div className="text-5xl font-black text-green-400">100%</div>
                <div className="font-bold text-white text-lg">Verified Sellers</div>
                <p className="text-slate-400 text-sm font-medium">Every brand undergo strict material checks and site inspection protocols.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-4">
                <div className="text-5xl font-black text-emerald-400">0%</div>
                <div className="font-bold text-white text-lg">Virgin Plastics</div>
                <p className="text-slate-400 text-sm font-medium">No raw materials are sourced from single-use synthetic hydrocarbon processes.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-4">
                <div className="text-5xl font-black text-teal-400">110%</div>
                <div className="font-bold text-white text-lg">Carbon Offset</div>
                <p className="text-slate-400 text-sm font-medium">We offset 10% more than the calculated emissions of all shipping deliveries.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-4">
                <div className="text-5xl font-black text-green-400">24/7</div>
                <div className="font-bold text-white text-lg">Community Moderation</div>
                <p className="text-slate-400 text-sm font-medium">Open-source reporting system. Flagged listings lead to instant platform suspension.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE CERTIFICATE SECTION */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-slate-950 to-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-green-500/10 px-3.5 py-1.5 rounded-xl border border-green-500/20 text-green-400 font-bold text-xs uppercase tracking-wider mb-6">
              <Award className="w-4 h-4" /> Certification of Excellence
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              The Green Turtle Standard
            </h2>
            <p className="text-lg text-slate-400 font-medium">
              Every seller who passes our audit receives our digital certificate of compliance. It represents our oath to protect the biosphere.
            </p>
          </div>

          {/* Interactive Glowing Holographic Certificate Card */}
          <div className="flex justify-center">
            <div className="relative group max-w-3xl w-full">
              {/* Outer Border Glowing Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

              {/* The Certificate Wrapper */}
              <div className="relative bg-slate-900 border-2 border-slate-800/80 rounded-[2rem] p-8 md:p-16 text-slate-100 overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:border-green-500/40">
                {/* Decorative lines & standard certificate borders */}
                <div className="absolute inset-4 border border-slate-800/40 rounded-[1.5rem] pointer-events-none"></div>
                <div className="absolute inset-8 border border-green-500/5 rounded-[1.2rem] pointer-events-none"></div>
                
                {/* Subtle corner elements */}
                <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-green-500/30 rounded-tl-lg"></div>
                <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-green-500/30 rounded-tr-lg"></div>
                <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-green-500/30 rounded-bl-lg"></div>
                <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-green-500/30 rounded-br-lg"></div>

                {/* Certificate Content */}
                <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 mb-2">
                    <SvgLogo className="w-16 h-16 pointer-events-none text-green-400" />
                  </div>

                  <h3 className="font-serif text-slate-400 text-xs md:text-sm tracking-[0.3em] uppercase">Certificate of Sustainable Commerce</h3>
                  <h4 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight font-sans">THE GREEN TURTLE STANDARD</h4>
                  
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent my-4"></div>

                  <p className="text-slate-300 font-medium text-sm md:text-base max-w-xl leading-relaxed">
                    This document verifies that affiliated suppliers conform to **GT-CONSCIOUS-2026** directives: guaranteeing ethical trade, biodegradable materials, zero fossil fuel plastics in delivery, and full trace audit compliance.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full pt-8 text-left max-w-2xl mx-auto border-t border-slate-800/80">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Standard ID</div>
                      <div className="text-xs md:text-sm font-mono text-slate-300 mt-1">GT-STD-V1.0</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Verified Score</div>
                      <div className="text-xs md:text-sm font-mono text-green-400 mt-1 font-bold">A+ Certified</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Materials</div>
                      <div className="text-xs md:text-sm font-mono text-slate-300 mt-1">Non-toxic</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Offset Code</div>
                      <div className="text-xs md:text-sm font-mono text-slate-300 mt-1">#GT-110P-CO2</div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center w-full pt-8 max-w-2xl mx-auto gap-4">
                    <div className="flex items-center gap-2.5 text-xs text-slate-500">
                      <Lock className="w-4 h-4 text-green-500/50" /> Secure digital verification token
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Audit Authority</div>
                        <div className="text-xs text-slate-300 font-bold font-mono">Green Turtle Trust Board</div>
                      </div>
                      {/* Interactive Badge Icon */}
                      <div className="w-12 h-12 rounded-full border border-green-500/30 flex items-center justify-center bg-green-500/10 text-green-400 hover:rotate-12 transition-transform duration-300">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative z-10 py-24 border-t border-slate-900 bg-slate-950">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Ready to shop with <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">true confidence</span>?
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Join the collective of conscious shoppers and audited sellers today. Every purchase makes a small difference. Let's make it count.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4 items-center">
            <button
              onClick={handleExploreShop}
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-slate-950 font-black py-4.5 px-12 rounded-2xl shadow-xl shadow-green-950/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 text-lg"
            >
              Start Shopping
            </button>
            <button
              onClick={handleJoinMovement}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold py-4.5 px-12 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-200 text-lg"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyJoinUsPage;
