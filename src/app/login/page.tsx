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
      <div className="bg-white border border-[#ede4d5] rounded-3xl p-8 md:p-10 max-w-md mx-auto shadow-sm">
        <div className="text-center mb-8 space-y-1">
          <span className="text-xs uppercase tracking-wider text-[#8d6b4f] font-semibold">Welcome Back</span>
          <h2 className="text-3xl font-serif font-bold text-[#1c1917]">
            Login to <span className="text-[#2f4739]">The Green Turtles</span>
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1c1917]">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#faf7f2] border border-[#ede4d5] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition text-sm"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1c1917]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#faf7f2] border border-[#ede4d5] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition text-sm"
              placeholder="••••••••"
              required
            />

            <div className="text-right mt-1.5">
              <button
                type="button"
                onClick={toggleForgotPassword}
                className="text-xs text-[#8d6b4f] hover:text-[#2f4739] transition font-medium"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {showForgotPassword && (
            <div className="rounded-2xl border border-[#ede4d5] bg-[#f7f4ee] p-5 space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <div>
                <h3 className="text-sm font-serif font-bold text-[#1c1917]">Reset Password</h3>
                <p className="text-xs text-[#66615b] mt-0.5">
                  Enter your email and we'll send you a recovery link.
                </p>
              </div>

              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full bg-white border border-[#ede4d5] px-4 py-2.5 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition text-sm"
                placeholder="your.email@example.com"
              />

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isSendingReset}
                  className="flex-[2] bg-[#2f4739] text-[#faf7f2] font-semibold py-2 px-4 rounded-full hover:bg-[#23372c] transition disabled:opacity-70 text-xs shadow-xs"
                >
                  {isSendingReset ? 'Sending...' : 'Send Link'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="flex-1 border border-[#ede4d5] bg-white text-[#66615b] font-medium py-2 px-4 rounded-full hover:bg-[#f7f4ee] transition text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#2f4739] text-[#faf7f2] font-semibold py-3.5 px-6 rounded-full hover:bg-[#23372c] transition shadow-sm text-sm"
          >
            Login
          </button>
        </form>

        <p className="text-center text-[#66615b] mt-6 text-xs font-medium">
          Don't have an account?{' '}
          <button
            onClick={() => router.push('/register')}
            className="text-[#2f4739] hover:underline font-semibold"
          >
            Join now
          </button>
        </p>

      </div>
    </section>
  );
};

export default LoginPage;
