"use client";

import React from 'react';
import Link from 'next/link';
import SvgLogo from '@/svg';

const Footer = () => (
  <footer className="bg-[#f3ede2] dark:bg-[#101613] border-t border-[#e7e0d5] dark:border-[#2a3d33] py-14 mt-20 transition-colors duration-200">
    <div className="container mx-auto px-6 max-w-7xl space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand info */}
        <div className="md:col-span-1 space-y-4">
          <Link href="/home" className="flex items-center gap-2.5">
            <SvgLogo className="w-8 h-8 shrink-0 bg-transparent" />
            <span className="font-serif text-xl font-bold text-[#2f4739] dark:text-[#489a69]">
              The Green Turtles
            </span>
          </Link>
          <p className="text-sm text-[#4b5563] dark:text-[#9ca3af] leading-relaxed">
            Discover, compare, and choose better. A curated marketplace connecting mindful shoppers with genuinely sustainable makers.
          </p>
        </div>

        {/* Marketplace (Buyer) */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#8d6b4f] dark:text-[#d4a373]">
            Marketplace
          </h4>
          <ul className="space-y-2 text-sm font-medium text-[#374151] dark:text-[#d1d5db]">
            <li>
              <Link href="/home" className="hover:text-[#2f4739] dark:hover:text-[#489a69] transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-[#2f4739] dark:hover:text-[#489a69] transition">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-[#2f4739] dark:hover:text-[#489a69] transition">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link href="/subscribe" className="hover:text-[#2f4739] dark:hover:text-[#489a69] transition">
                Stay Updated / Newsletter
              </Link>
            </li>
          </ul>
        </div>

        {/* For Sellers & Brands */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#8d6b4f] dark:text-[#d4a373]">
            For Brands
          </h4>
          <ul className="space-y-2 text-sm font-medium text-[#374151] dark:text-[#d1d5db]">
            <li>
              <Link href="/seller-home" className="hover:text-[#2f4739] dark:hover:text-[#489a69] transition">
                Seller Home
              </Link>
            </li>
            <li>
              <Link href="/why-partner-us" className="hover:text-[#2f4739] dark:hover:text-[#489a69] transition font-semibold text-[#2f4739] dark:text-[#489a69]">
                Why Partner With Us
              </Link>
            </li>
            <li>
              <Link href="/partner" className="hover:text-[#2f4739] dark:hover:text-[#489a69] transition">
                Partner Inquiry
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-[#2f4739] dark:hover:text-[#489a69] transition">
                Apply to Sell
              </Link>
            </li>
          </ul>
        </div>

        {/* Mission & Help */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#8d6b4f] dark:text-[#d4a373]">
            Company
          </h4>
          <ul className="space-y-2 text-sm font-medium text-[#374151] dark:text-[#d1d5db]">
            <li>
              <Link href="/about" className="hover:text-[#2f4739] dark:hover:text-[#489a69] transition">
                Our Mission & Story
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#2f4739] dark:hover:text-[#489a69] transition">
                Contact & Support
              </Link>
            </li>
            <li>
              <Link href="/landing" className="hover:text-[#2f4739] dark:hover:text-[#489a69] transition">
                Interactive Presentation
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-[#e7e0d5] dark:border-[#2a3d33] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#6b7280] dark:text-[#9ca3af]">
        <p>
          © {new Date().getFullYear()} The Green Turtles · All rights reserved.
        </p>
        <div className="flex gap-6">
          <span className="hover:text-[#2f4739] dark:hover:text-[#489a69] cursor-pointer">Terms & Conditions</span>
          <span className="hover:text-[#2f4739] dark:hover:text-[#489a69] cursor-pointer">Privacy Policy</span>
          <span className="hover:text-[#2f4739] dark:hover:text-[#489a69] cursor-pointer">Cookie Settings</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
