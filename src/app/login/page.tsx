"use client";

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import SvgLogo from '@/svg';
import { AppContext } from '@/context/AppContext';

const LoginPage = () => {
  const { loginUser, requestPasswordReset, showMessage }: any =
    useContext(AppContext) || {};
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showMessage?.('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const { error, role } = await loginUser({ email, password });
    setLoading(false);

    if (error) {
      showMessage?.(error.message);
      return;
    }

    showMessage?.('Logged in successfully!');
    if (role === 'seller') {
      router.push('/seller-home');
    } else if (role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/home');
    }
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
      showMessage?.('Please enter your email to receive a reset link.');
      return;
    }

    setIsSendingReset(true);
    const { error, mode } = await requestPasswordReset(resetEmail);
    setIsSendingReset(false);

    if (error) {
      showMessage?.(`Error: ${error.message}`);
      return;
    }

    showMessage?.(
      mode === 'local'
        ? 'Demo mode: password reset simulated locally.'
        : 'Password reset link sent! Check your email.'
    );
    setEmail(resetEmail);
    setShowForgotPassword(false);
  };

  return (
    <section className="py-16 px-4 max-w-lg mx-auto text-[#111827] dark:text-[#f4f0ea]">
      <div className="bg-white dark:bg-[#1a241f] border-2 border-[#e7e0d5] dark:border-[#2a3d33] rounded-[2.5rem] p-8 md:p-12 shadow-card space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <SvgLogo className="w-14 h-14 bg-transparent" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#8d6b4f] dark:text-[#d4a373] font-bold">
            Welcome Back
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold">
            Login to <span className="text-[#2f4739] dark:text-[#489a69]">The Green Turtles</span>
          </h1>
          <p className="text-sm text-[#4b5563] dark:text-[#9ca3af]">
            Access your conscious shopping cart, eco-coin balance, and seller tools.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8d6b4f] dark:text-[#d4a373] w-4 h-4" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3.5 pl-11 rounded-2xl focus:border-[#2f4739] focus:outline-none text-[#111827] dark:text-[#f4f0ea] placeholder:text-[#9ca3af] transition text-sm font-medium"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">
                Password
              </label>
              <button
                type="button"
                onClick={toggleForgotPassword}
                className="text-xs text-[#8d6b4f] dark:text-[#d4a373] hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8d6b4f] dark:text-[#d4a373] w-4 h-4" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3.5 pl-11 rounded-2xl focus:border-[#2f4739] focus:outline-none text-[#111827] dark:text-[#f4f0ea] placeholder:text-[#9ca3af] transition text-sm font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {showForgotPassword && (
            <div className="rounded-2xl border border-[#e7e0d5] dark:border-[#2a3d33] bg-[#f7f4ee] dark:bg-[#161f1a] p-5 space-y-3 animate-in fade-in duration-300">
              <h3 className="text-sm font-serif font-bold">Reset Password</h3>
              <p className="text-xs text-[#4b5563] dark:text-[#9ca3af]">
                Enter your email address to receive instructions.
              </p>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full bg-white dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-2.5 rounded-xl text-sm"
                placeholder="your@email.com"
              />
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isSendingReset}
                  className="flex-1 bg-[#2f4739] text-[#faf7f2] font-semibold py-2 px-4 rounded-full text-xs hover:bg-[#23372c]"
                >
                  {isSendingReset ? 'Sending...' : 'Send Link'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="px-4 py-2 rounded-full border text-xs text-[#6b7280]"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] font-semibold py-4 px-6 rounded-full transition shadow-soft text-base active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? 'Logging in...' : 'Login'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#e7e0d5] dark:border-[#2a3d33]">
          <p className="text-sm text-[#4b5563] dark:text-[#9ca3af]">
            Don't have an account yet?{' '}
            <Link
              href="/register"
              className="text-[#2f4739] dark:text-[#489a69] font-bold hover:underline"
            >
              Join as Buyer or Seller
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
