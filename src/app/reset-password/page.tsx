"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';

import { AppContext } from '@/context/AppContext';

const ResetPasswordPage = () => {
  const { supabase, showMessage, updatePassword, isSupabaseConfigured }: any =
    useContext(AppContext);
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    const handleRecovery = async () => {
      await supabase.auth.signOut();

      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const queryParams = new URLSearchParams(window.location.search);

      const access_token =
        hashParams.get('access_token') || queryParams.get('access_token');
      const refresh_token =
        hashParams.get('refresh_token') || queryParams.get('refresh_token');
      const type = hashParams.get('type') || queryParams.get('type');

      if (type !== 'recovery' || !access_token || !refresh_token) {
        showMessage('Invalid or expired reset link');
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        showMessage(error.message);
        setLoading(false);
        return;
      }

      window.history.replaceState({}, document.title, '/reset-password');
      setLoading(false);
    };

    handleRecovery();
  }, [isSupabaseConfigured, showMessage, supabase]);

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

    showMessage(
      isSupabaseConfigured
        ? 'Password updated successfully! Please login.'
        : 'Demo mode: password reset completed.'
    );

    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }

    router.push('/login');
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <section className="py-12 px-4">
      <div className="bg-slate-800/40 border border-slate-700 rounded-[2.5rem] p-8 md:p-12 max-w-lg mx-auto shadow-2xl backdrop-blur-sm">
        <h2 className="text-4xl font-black text-white text-center mb-8">Set New <span className="text-green-500">Password</span></h2>

        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-1">New Password</label>
            <input
              type="password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-white transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black py-5 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-[1.02] shadow-xl shadow-green-900/20"
          >
            Update Password
          </button>
        </form>

        {!isSupabaseConfigured && (
          <p className="mt-8 text-center text-xs text-slate-600 italic">
            Demo mode active. This is a UI simulation.
          </p>
        )}
      </div>
    </section>
  );
};

export default ResetPasswordPage;
