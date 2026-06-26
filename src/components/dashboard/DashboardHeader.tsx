"use client";
import React from 'react';
import { LayoutDashboard } from 'lucide-react';

const DashboardHeader = ({ productCount, walletBalance = 0 }: { productCount: number, walletBalance?: number }) => {
  return (
    <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
          <LayoutDashboard className="text-green-500 w-10 h-10" />
          Seller <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Dashboard</span>
        </h1>
        <p className="text-slate-400">Manage your eco-friendly inventory and sales performance.</p>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 px-6 py-4 rounded-[2rem] flex items-center gap-6">
        <div className="text-center">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Live Products</p>
          <p className="text-3xl font-black text-white">{productCount}</p>
        </div>
        <div className="w-[1px] h-10 bg-slate-700"></div>
        <div className="text-center">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Total Sales</p>
          <p className="text-3xl font-black text-green-500">Rs. 0</p>
        </div>
        <div className="w-[1px] h-10 bg-slate-700"></div>
        <div className="text-center">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Wallet</p>
          <p className="text-3xl font-black text-yellow-500">Rs. {walletBalance}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
