"use client";

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AdminLoginPage = () => {
  const { role, loginUser, showMessage } = useContext(AppContext);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (role === 'admin') {
      router.push('/admin/dashboard');
    }
  }, [role, router]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await loginUser({ email: loginId, password });
    if (error) {
      showMessage(error.message || "Invalid Admin Credentials");
    } else {
      showMessage("Welcome back, Admin!");
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] py-12 px-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#ede4d5] shadow-sm max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#f7f4ee] border border-[#ede4d5] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7 text-[#2f4739]" />
          </div>
          <span className="text-xs uppercase tracking-wider text-[#8d6b4f] font-semibold">Security</span>
          <h2 className="text-3xl font-serif font-bold text-[#1c1917]">Admin <span className="text-[#2f4739]">Access</span></h2>
          <p className="text-xs text-[#66615b] mt-1">Sign in to manage the platform</p>
        </div>
        <form onSubmit={handleAdminLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1c1917]">Admin ID</label>
            <input 
              type="text" 
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="w-full bg-[#faf7f2] border border-[#ede4d5] px-4 py-2.5 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-sm text-[#1c1917] placeholder:text-[#a8a29e]" 
              placeholder="Enter Admin ID"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1c1917]">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#faf7f2] border border-[#ede4d5] px-4 py-2.5 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-sm text-[#1c1917] placeholder:text-[#a8a29e]" 
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#2f4739] text-[#faf7f2] py-3.5 rounded-full font-semibold text-sm hover:bg-[#23372c] transition shadow-sm flex items-center justify-center gap-2"
          >
            Access Panel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
