"use client";
import React from 'react';

const Footer = () => (
  <footer className="bg-[#f3ede2] border-t border-[#e7e0d5] text-center text-xs text-[#78716c] py-10 mt-20">
    <div className="container mx-auto px-4 space-y-3">
      <p className="font-serif text-sm font-semibold text-[#2f4739] tracking-wide">
        The Green Turtles
      </p>
      <p className="text-xs text-[#78716c]">
        © {new Date().getFullYear()} The Green Turtles · Discover. Compare. Choose Better.
      </p>
      <div className="mt-2 flex justify-center gap-6 text-xs">
        <button className="hover:text-[#2f4739] transition-colors">Terms</button>
        <button className="hover:text-[#2f4739] transition-colors">Privacy</button>
        <button className="hover:text-[#2f4739] transition-colors">Cookies</button>
      </div>
    </div>
  </footer>
);

export default Footer;
