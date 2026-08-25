"use client";
import React from 'react';

const Footer = () => (
  <footer className="bg-slate-900 border-t border-slate-800 text-center text-sm text-slate-500 py-8 mt-12">
    <div className="container mx-auto px-4">
      <p>© {new Date().getFullYear()} The Green Turtles · Discover. Compare. Choose Better.</p>
      <div className="mt-2 flex justify-center gap-6">
        <button className="hover:text-green-500 transition">Terms</button>
        <button className="hover:text-green-500 transition">Privacy</button>
        <button className="hover:text-green-500 transition">Cookies</button>
      </div>
    </div>
  </footer>
);

export default Footer;
