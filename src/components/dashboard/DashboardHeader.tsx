"use client";
import React from 'react';
import { LayoutDashboard } from 'lucide-react';

const DashboardHeader = ({ productCount, walletBalance = 0 }: { productCount: number, walletBalance?: number }) => {
  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-1">
        <span className="text-xs uppercase tracking-wider text-[#8d6b4f] font-semibold">Seller Portal</span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold flex items-center gap-3 text-[#1c1917]">
          <LayoutDashboard className="text-[#2f4739] w-8 h-8" />
          Seller <span className="text-[#2f4739]">Dashboard</span>
        </h1>
        <p className="text-xs text-[#66615b]">Manage your eco-friendly inventory and sales performance.</p>
      </div>

      <div className="bg-white border border-[#ede4d5] px-6 py-3.5 rounded-3xl shadow-sm flex items-center gap-6">
        <div className="text-center">
          <p className="text-[11px] text-[#8d6b4f] uppercase tracking-wider font-semibold mb-0.5">Live Products</p>
          <p className="text-2xl font-serif font-bold text-[#1c1917]">{productCount}</p>
        </div>
        <div className="w-[1px] h-8 bg-[#ede4d5]"></div>
        <div className="text-center">
          <p className="text-[11px] text-[#8d6b4f] uppercase tracking-wider font-semibold mb-0.5">Total Sales</p>
          <p className="text-2xl font-serif font-bold text-[#2f4739]">Rs. 0</p>
        </div>
        <div className="w-[1px] h-8 bg-[#ede4d5]"></div>
        <div className="text-center">
          <p className="text-[11px] text-[#8d6b4f] uppercase tracking-wider font-semibold mb-0.5">Wallet</p>
          <p className="text-2xl font-serif font-bold text-[#1c1917]">Rs. {walletBalance}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
