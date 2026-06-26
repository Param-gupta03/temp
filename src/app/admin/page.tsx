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
    <div className="flex items-center justify-center min-h-[70vh] text-slate-100">
      <div className="bg-slate-800/60 p-10 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-xl max-w-md w-full animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <ShieldCheck className="w-16 h-16 text-purple-500 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
          <h2 className="text-3xl font-black">Admin <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">Access</span></h2>
          <p className="text-slate-400 mt-2 font-medium">Sign in to manage the platform</p>
        </div>
        <form onSubmit={handleAdminLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Admin ID</label>
            <input 
              type="text" 
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition text-lg" 
              placeholder="Enter Admin ID"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition text-lg" 
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-black text-lg hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-purple-900/30 flex items-center justify-center gap-2"
          >
            Access Panel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
