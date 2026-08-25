"use client";

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';

import { AppContext } from '@/context/AppContext';

const LoginPage = () => {
  const { loginUser, requestPasswordReset, showMessage }: any =
    useContext(AppContext);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showMessage('Please enter both email and password.');
      return;
    }

    const { error, role } = await loginUser({ email, password });

    if (error) {
      showMessage(error.message);
      return;
    }

    router.push(role === 'seller' || role === 'admin' ? '/seller-dashboard' : '/landing');
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword((prev) => {
      const nextValue = !prev;

      if (!prev) {
        setResetEmail(email);
      }

      return nextValue;
    });
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetEmail) {
      showMessage('Please enter your email to receive a reset link.');
      return;
    }

    setIsSendingReset(true);

    const { error, mode } = await requestPasswordReset(resetEmail);

    setIsSendingReset(false);

    if (error) {
      showMessage(`Error: ${error.message}`);
      return;
    }

    showMessage(
      mode === 'local'
        ? 'Demo mode: password reset is simulated locally.'
        : 'Password reset link sent! Check your email.'
    );
    setEmail(resetEmail);
    setShowForgotPassword(false);
  };

  return (
    <section className="py-12 px-4">
      <div className="bg-slate-800/40 border border-slate-700 rounded-[2.5rem] p-8 md:p-12 max-w-lg mx-auto shadow-2xl backdrop-blur-sm">
        <h2 className="text-4xl font-black text-white text-center mb-10">
          Login to <span className="text-green-500">The Green Turtles</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-white transition"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-white transition"
              placeholder="••••••••"
              required
            />

            <div className="text-right mt-2">
              <button
                type="button"
                onClick={toggleForgotPassword}
                className="text-sm text-slate-500 hover:text-green-500 transition font-bold"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {showForgotPassword && (
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <div>
                <h3 className="text-lg font-bold text-green-400">Reset Password</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Enter your email and we'll send you a recovery link.
                </p>
              </div>

              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 px-5 py-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-white transition"
                placeholder="your.email@example.com"
              />

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isSendingReset}
                  className="flex-[2] bg-green-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-700 transition disabled:opacity-70"
                >
                  {isSendingReset ? 'Sending...' : 'Send Link'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="flex-1 border border-slate-700 text-slate-400 font-bold py-3 px-4 rounded-xl hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black py-5 px-6 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-green-900/20"
          >
            Login
          </button>
        </form>

        <p className="text-center text-slate-400 mt-8 font-medium">
          Don't have an account?{' '}
          <button
            onClick={() => router.push('/register')}
            className="text-green-500 hover:text-green-400 font-black"
          >
            Join now
          </button>
        </p>

      </div>
    </section>
  );
};

export default LoginPage;
