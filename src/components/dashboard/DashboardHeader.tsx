"use client";
import React from 'react';
import { LayoutDashboard } from 'lucide-react';

const DashboardHeader = ({ productCount, walletBalance = 0 }: { productCount: number, walletBalance?: number }) => {
  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-1">
        <span className="text-xs uppercase tracking-widest text-[#8d6b4f] dark:text-[#d4a373] font-bold">Seller Portal</span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold flex items-center gap-3 text-[#111827] dark:text-[#f4f0ea]">
          <LayoutDashboard className="text-[#2f4739] dark:text-[#489a69] w-8 h-8" />
          Seller <span className="text-[#2f4739] dark:text-[#489a69]">Dashboard</span>
        </h1>
        <p className="text-sm text-[#4b5563] dark:text-[#9ca3af]">Manage your eco-friendly inventory, verify credentials, and track earnings.</p>
      </div>

      <div className="bg-white dark:bg-[#1a241f] border border-[#ede4d5] dark:border-[#2a3d33] px-7 py-4 rounded-3xl shadow-card flex items-center gap-6">
        <div className="text-center">
          <p className="text-xs text-[#8d6b4f] dark:text-[#d4a373] uppercase tracking-wider font-bold mb-0.5">Live Products</p>
          <p className="text-2xl font-serif font-bold text-[#111827] dark:text-[#f4f0ea]">{productCount}</p>
        </div>
        <div className="w-[1px] h-8 bg-[#ede4d5] dark:bg-[#2a3d33]"></div>
        <div className="text-center">
          <p className="text-xs text-[#8d6b4f] dark:text-[#d4a373] uppercase tracking-wider font-bold mb-0.5">Total Sales</p>
          <p className="text-2xl font-serif font-bold text-[#2f4739] dark:text-[#489a69]">Rs. 0</p>
        </div>
        <div className="w-[1px] h-8 bg-[#ede4d5] dark:bg-[#2a3d33]"></div>
        <div className="text-center">
          <p className="text-xs text-[#8d6b4f] dark:text-[#d4a373] uppercase tracking-wider font-bold mb-0.5">Wallet Balance</p>
          <p className="text-2xl font-serif font-bold text-[#111827] dark:text-[#f4f0ea]">Rs. {walletBalance}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
