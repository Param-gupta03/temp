"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';

import { AppContext } from '@/context/AppContext';

const ResetPasswordPage = () => {
  const { showMessage, updatePassword }: any = useContext(AppContext);
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      showMessage('Password must be at least 6 characters');
      return;
    }

    const { error } = await updatePassword(password);

    if (error) {
      showMessage(error.message);
      return;
    }

    showMessage('Password updated successfully! Please login.');
    router.push('/login');
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <section className="py-12 px-4">
      <div className="bg-white border border-[#ede4d5] rounded-3xl p-8 md:p-10 max-w-md mx-auto shadow-sm">
        <div className="text-center mb-8 space-y-1">
          <span className="text-xs uppercase tracking-wider text-[#8d6b4f] font-semibold">Account Recovery</span>
          <h2 className="text-3xl font-serif font-bold text-[#1c1917]">
            Set New <span className="text-[#2f4739]">Password</span>
          </h2>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1c1917]">New Password</label>
            <input
              type="password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#faf7f2] border border-[#ede4d5] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2f4739] text-[#faf7f2] font-semibold py-3.5 rounded-full hover:bg-[#23372c] transition shadow-sm text-sm"
          >
            Update Password
          </button>
        </form>

      </div>
    </section>
  );
};

export default ResetPasswordPage;
