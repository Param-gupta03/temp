"use client";

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Share2,
  Eye,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Leaf,
  Globe,
  Instagram,
  Mail,
  Phone,
  MessageSquare,
  Building2,
  Award,
  BadgeCheck,
  Check
} from 'lucide-react';
import { AppContext } from '@/context/AppContext';
import { apiUrl } from '@/config/api';
import StayUpdatedSection from '@/components/StayUpdatedSection';

const WhyPartnerUsPage = () => {
  const router = useRouter();
  const { showMessage, setIsGeneratingImage }: any = useContext(AppContext) || {};

  const [formData, setFormData] = useState({
    contact_name: '',
    email: '',
    phone: '',
    brand_name: '',
    website_url: '',
    category: 'Home & Living',
    certifications: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.contact_name || !formData.email || !formData.brand_name) {
      showMessage?.('Please fill in all required fields (Name, Email, and Brand Name).');
      return;
    }

    showMessage?.('Submitting your partnership application...');
    setIsGeneratingImage?.(true);

    try {
      const response = await fetch(apiUrl('/api/send-email'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.contact_name,
          email: formData.email,
          phone: formData.phone,
          message: `Brand: ${formData.brand_name}\nWebsite: ${formData.website_url}\nCategory: ${formData.category}\nCertifications: ${formData.certifications}\n\nProposal:\n${formData.message}`,
          type: 'Partner Inquiry',
        }),
      });

      // Also record in partner DB if available
      try {
        await fetch(apiUrl('/api/partner'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contact_name: formData.contact_name,
            email: formData.email,
            phone: formData.phone,
            message: `Brand: ${formData.brand_name} | Category: ${formData.category} | ${formData.message}`,
          }),
        });
      } catch (dbErr) {
        console.warn('Partner db save skipped', dbErr);
      }

      setSubmitted(true);
      showMessage?.('Application submitted successfully! Our partnership team will contact you shortly.');
    } catch (err: any) {
      console.error('Partner submission error:', err);
      showMessage?.('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsGeneratingImage?.(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 max-w-7xl mx-auto space-y-20 text-[#1c1917] dark:text-[#f4f0ea]">
      {/* Breadcrumb & Navigation helper */}
      <div className="flex items-center gap-2 text-sm font-medium text-[#4b5563] dark:text-[#9ca3af]">
        <Link href="/home" className="hover:text-[#2f4739] dark:hover:text-[#489a69] transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/seller-home" className="hover:text-[#2f4739] dark:hover:text-[#489a69] transition">
          For Sellers
        </Link>
        <span>/</span>
        <span className="text-[#1c1917] dark:text-[#f4f0ea] font-semibold">Why Partner With Us</span>
      </div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f4efe6] via-[#f7f4ee] to-[#e8ede9] dark:from-[#1b2620] dark:via-[#161f1a] dark:to-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] p-8 md:p-16 shadow-soft text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#2f4739]/10 dark:bg-[#489a69]/20 border border-[#2f4739]/20 dark:border-[#489a69]/40 px-4 py-2 rounded-full text-[#2f4739] dark:text-[#489a69] font-bold text-xs md:text-sm uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            Brand Collective & Partnership
          </div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-[#1c1917] dark:text-[#f4f0ea]">
            Why Partner With <span className="text-[#2f4739] dark:text-[#489a69] italic font-serif">The Green Turtles</span>?
          </h1>

          <p className="text-lg md:text-xl text-[#374151] dark:text-[#d1d5db] leading-relaxed max-w-3xl mx-auto font-normal">
            A dedicated ecosystem created to help genuinely sustainable brands cut through the greenwashing noise, reach mindful buyers, and scale with integrity.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="#apply-form"
              className="bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] font-semibold py-4 px-8 rounded-full shadow-soft transition active:scale-95 text-base inline-flex items-center gap-2"
            >
              Apply as Partner <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => router.push('/seller-home')}
              className="bg-white dark:bg-[#1a241f] border border-[#cfc4b2] dark:border-[#3d5045] text-[#1c1917] dark:text-[#f4f0ea] hover:border-[#2f4739] font-semibold py-4 px-8 rounded-full transition active:scale-95 text-base shadow-soft"
            >
              Visit Seller Home
            </button>
          </div>
        </div>
      </section>

      {/* THE 4 PILLARS OF PARTNERSHIP */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#8d6b4f] dark:text-[#d4a373]">
            Core Value Proposition
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1c1917] dark:text-[#f4f0ea]">
            Four Pillars That Drive Your Brand Forward
          </h2>
          <p className="text-base md:text-lg text-[#4b5563] dark:text-[#9ca3af]">
            Everything we build is engineered to solve the real distribution and trust challenges sustainable makers face today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Share2,
              title: "Pre-Qualified Reach",
              subtitle: "Connect with high-intent shoppers",
              desc: "Stop wasting ad spend on passive browsers. Our audience is actively seeking, comparing, and paying for genuine eco-friendly alternatives.",
              badge: "Audience Fit",
            },
            {
              icon: Eye,
              title: "Dedicated Visibility",
              subtitle: "No fast-fashion clutter",
              desc: "Your products are never buried beneath mass-produced, drop-shipped items. You receive curated editorial spots and category highlights.",
              badge: "Zero Noise",
            },
            {
              icon: BarChart3,
              title: "Sustainability Insights",
              subtitle: "Actionable demand data",
              desc: "Access proprietary analytics on consumer environmental priorities, search trends, eco-material interest, and repeat-buy intent.",
              badge: "Data & Growth",
            },
            {
              icon: ShieldCheck,
              title: "The Trust Seal",
              subtitle: "Credentials that validate value",
              desc: "We spotlight your certificates, supply-chain documentation, and circular materials, turning sustainability into your ultimate competitive edge.",
              badge: "Verified Claims",
            },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] rounded-3xl p-8 flex flex-col justify-between shadow-card hover:border-[#2f4739] dark:hover:border-[#489a69] transition duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 bg-[#e8ede9] dark:bg-[#223028] text-[#2f4739] dark:text-[#489a69] rounded-2xl group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8d6b4f] dark:text-[#d4a373] bg-[#f7f4ee] dark:bg-[#121815] px-3 py-1 rounded-full border border-[#e7e0d5] dark:border-[#2a3d33]">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1c1917] dark:text-[#f4f0ea]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#2f4739] dark:text-[#489a69]">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm md:text-base text-[#4b5563] dark:text-[#9ca3af] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* COMPARISON TABLE: THE GREEN TURTLES VS TRADITIONAL PLATFORMS */}
      <section className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] rounded-3xl p-8 md:p-12 shadow-card space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#8d6b4f] dark:text-[#d4a373]">
            Platform Comparison
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1c1917] dark:text-[#f4f0ea]">
            Traditional Marketplaces vs. The Green Turtles
          </h2>
          <p className="text-sm md:text-base text-[#4b5563] dark:text-[#9ca3af]">
            Why ethical and sustainable brands thrive better in a purpose-aligned marketplace.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[#e7e0d5] dark:border-[#2a3d33] text-xs font-bold uppercase tracking-wider text-[#4b5563] dark:text-[#9ca3af]">
                <th className="py-4 px-4">Feature / Platform Dynamic</th>
                <th className="py-4 px-4 text-[#a74338] bg-[#fdf4f2] dark:bg-[#2d1b19] rounded-t-xl">Conventional Marketplaces</th>
                <th className="py-4 px-4 text-[#2f4739] dark:text-[#489a69] bg-[#e8ede9] dark:bg-[#16251d] rounded-t-xl font-bold">The Green Turtles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7e0d5] dark:divide-[#2a3d33] text-sm md:text-base">
              {[
                {
                  feature: "Listing Curation & Quality",
                  traditional: "Unfiltered millions of generic items & cheap knockoffs",
                  green: "Strictly curated: 100% sustainable and eco-vetted brands",
                },
                {
                  feature: "Handling of Greenwashing",
                  traditional: "Self-declared tags with zero review or accountability",
                  green: "Verified credentials, materials, and documentation framework",
                },
                {
                  feature: "Shopper Mindset",
                  traditional: "Driven almost exclusively by the lowest price",
                  green: "Mindful buyers seeking quality, ethics, and planet impact",
                },
                {
                  feature: "Eco-Storytelling",
                  traditional: "Crammed into basic bullet points",
                  green: "Dedicated brand spotlight, materials breakdown & certifications",
                },
                {
                  feature: "Incentives for Conscious Purchases",
                  traditional: "None / standard credit card points",
                  green: "Eco-Coins reward ecosystem driving repeat orders to verified sellers",
                },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#faf7f2] dark:hover:bg-[#141d18] transition">
                  <td className="py-4 px-4 font-semibold text-[#1c1917] dark:text-[#f4f0ea]">
                    {row.feature}
                  </td>
                  <td className="py-4 px-4 text-[#4b5563] dark:text-[#9ca3af] bg-[#fdf4f2]/40 dark:bg-[#2d1b19]/40">
                    ✕ {row.traditional}
                  </td>
                  <td className="py-4 px-4 font-medium text-[#2f4739] dark:text-[#489a69] bg-[#e8ede9]/40 dark:bg-[#16251d]/40">
                    ✓ {row.green}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* HOW THE PARTNERSHIP JOURNEY WORKS */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#8d6b4f] dark:text-[#d4a373]">
            Simple Onboarding
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1c1917] dark:text-[#f4f0ea]">
            Four Steps to Join the Collective
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Apply & Share",
              desc: "Submit your brand details, story, and product catalog through our simple partner form.",
            },
            {
              step: "02",
              title: "Review & Verification",
              desc: "Our team verifies your materials, packaging standards, and environmental certifications.",
            },
            {
              step: "03",
              title: "Live Listing",
              desc: "Your products go live with verified badges, detailed storytelling, and immediate discovery.",
            },
            {
              step: "04",
              title: "Grow & Impact",
              desc: "Track orders, access buyer engagement insights, and receive direct wallet payouts.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] rounded-3xl p-6 relative shadow-soft space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#2f4739] text-[#faf7f2] font-serif font-bold text-xl flex items-center justify-center shadow-xs">
                {item.step}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1c1917] dark:text-[#f4f0ea]">
                {item.title}
              </h3>
              <p className="text-sm text-[#4b5563] dark:text-[#9ca3af] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* APPLICATION FORM & CONTACT SECTION */}
      <section id="apply-form" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left info column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#f7f4ee] dark:bg-[#161f1a] border border-[#e7e0d5] dark:border-[#2a3d33] p-8 md:p-10 rounded-3xl space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-[#8d6b4f] dark:text-[#d4a373]">
              Let's Connect
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1c1917] dark:text-[#f4f0ea]">
              Start Your Brand Partnership
            </h2>
            <p className="text-base text-[#374151] dark:text-[#d1d5db] leading-relaxed">
              Whether you are an emerging eco-artisan or an established sustainable manufacturer, we want to hear about your mission.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#e7e0d5] dark:border-[#2a3d33] text-sm font-medium">
              <div className="flex items-center gap-3 text-[#1c1917] dark:text-[#f4f0ea]">
                <Mail className="w-5 h-5 text-[#2f4739] dark:text-[#489a69] shrink-0" />
                <span>
                  Direct email:{' '}
                  <a href="mailto:dishasikka@thegreenturtles.in" className="font-semibold underline hover:text-[#2f4739]">
                    dishasikka@thegreenturtles.in
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-3 text-[#1c1917] dark:text-[#f4f0ea]">
                <Globe className="w-5 h-5 text-[#2f4739] dark:text-[#489a69] shrink-0" />
                <span>
                  Official Web:{' '}
                  <a href="https://thegreenturtles.in" target="_blank" rel="noreferrer" className="font-semibold underline hover:text-[#2f4739]">
                    thegreenturtles.in
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-3 text-[#1c1917] dark:text-[#f4f0ea]">
                <Instagram className="w-5 h-5 text-[#2f4739] dark:text-[#489a69] shrink-0" />
                <span>
                  Instagram:{' '}
                  <a href="https://instagram.com/thegreenturtles.in" target="_blank" rel="noreferrer" className="font-semibold underline hover:text-[#2f4739]">
                    @thegreenturtles.in
                  </a>
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] p-5 rounded-2xl space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#2f4739] dark:text-[#489a69]">
                Early Partner Benefit
              </p>
              <p className="text-xs text-[#4b5563] dark:text-[#9ca3af] leading-relaxed">
                Early cohort partners receive 0% listing fee, premium homepage feature rotation, and dedicated social spotlight for their initial 6 months.
              </p>
            </div>
          </div>
        </div>

        {/* Right application form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] rounded-3xl p-8 md:p-12 shadow-card">
          <div className="mb-8 space-y-2">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1c1917] dark:text-[#f4f0ea]">
              Partnership Inquiry Form
            </h3>
            <p className="text-sm text-[#4b5563] dark:text-[#9ca3af]">
              Please fill in your brand details and our partnership team will reach out within 24-48 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-[#e8ede9] dark:bg-[#16251d] rounded-2xl border border-[#2f4739]/30 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#2f4739] dark:text-[#489a69] mx-auto" />
              <h4 className="font-serif text-2xl font-bold text-[#1c1917] dark:text-[#f4f0ea]">
                Thank You for Applying!
              </h4>
              <p className="text-sm text-[#374151] dark:text-[#d1d5db]">
                We have received your brand inquiry. A confirmation has been logged and our team is excited to review your submission.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="bg-[#2f4739] text-[#faf7f2] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#23372c] transition"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#1c1917] dark:text-[#f4f0ea]">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleChange}
                    className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] dark:text-[#f4f0ea] text-sm"
                    placeholder="e.g. Maya Sharma"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#1c1917] dark:text-[#f4f0ea]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] dark:text-[#f4f0ea] text-sm"
                    placeholder="partner@yourbrand.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#1c1917] dark:text-[#f4f0ea]">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    name="brand_name"
                    value={formData.brand_name}
                    onChange={handleChange}
                    className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] dark:text-[#f4f0ea] text-sm"
                    placeholder="Your Eco Brand"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#1c1917] dark:text-[#f4f0ea]">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] dark:text-[#f4f0ea] text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#1c1917] dark:text-[#f4f0ea]">
                    Website or Social Handle
                  </label>
                  <input
                    type="text"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleChange}
                    className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] dark:text-[#f4f0ea] text-sm"
                    placeholder="https://yourbrand.com or @handle"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#1c1917] dark:text-[#f4f0ea]">
                    Primary Product Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] dark:text-[#f4f0ea] text-sm"
                  >
                    <option value="Home & Living">Home & Living</option>
                    <option value="Apparel & Textiles">Apparel & Textiles</option>
                    <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                    <option value="Electronics & Clean Tech">Electronics & Clean Tech</option>
                    <option value="Zero Waste Food & Drink">Zero Waste Food & Drink</option>
                    <option value="Other Sustainable Goods">Other Sustainable Goods</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#1c1917] dark:text-[#f4f0ea]">
                  Key Sustainability Credentials or Materials (Optional)
                </label>
                <input
                  type="text"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] dark:text-[#f4f0ea] text-sm"
                  placeholder="e.g. Organic GOTS cotton, FSC certified bamboo, plastic-free packaging"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#1c1917] dark:text-[#f4f0ea]">
                  Tell Us About Your Brand & Proposal
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] dark:text-[#f4f0ea] text-sm resize-none"
                  placeholder="What makes your products sustainable? What are your goals with The Green Turtles?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] font-semibold py-4 px-8 rounded-full shadow-soft transition active:scale-95 text-base flex items-center justify-center gap-2"
              >
                Submit Partnership Application <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* STAY UPDATED SECTION */}
      <StayUpdatedSection />
    </div>
  );
};

export default WhyPartnerUsPage;
