"use client";

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Store } from 'lucide-react';
import SvgLogo from '@/svg';
import { AppContext } from '@/context/AppContext';

const RegisterPage = () => {
  const { registerUser, showMessage }: any = useContext(AppContext) || {};
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [gstNo, setGstNo] = useState('');
  const [shopLocation, setShopLocation] = useState('');
  const [shopName, setShopName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const registrationData = {
      email,
      password,
      nextRole: role,
      metadata:
        role === 'seller'
          ? {
              gst_no: gstNo,
              shop_location: shopLocation,
              shop_name: shopName,
            }
          : {},
    };

    setLoading(true);
    const { error, mode } = await registerUser(registrationData);
    setLoading(false);

    if (error) {
      showMessage?.(error.message);
      return;
    }

    showMessage?.(
      mode === 'local'
        ? 'Demo account created! Welcome.'
        : 'Registered successfully!'
    );

    if (role === 'seller') {
      router.push('/seller-home');
    } else {
      router.push('/home');
    }
  };

  return (
    <section className="py-16 px-4 max-w-lg mx-auto text-[#111827] dark:text-[#f4f0ea]">
      <div className="bg-white dark:bg-[#1a241f] border-2 border-[#e7e0d5] dark:border-[#2a3d33] rounded-[2.5rem] p-8 md:p-12 shadow-card space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <SvgLogo className="w-14 h-14 bg-transparent" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#8d6b4f] dark:text-[#d4a373] font-bold">
            Join The Movement
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold">
            Join <span className="text-[#2f4739] dark:text-[#489a69]">The Green Turtles</span>
          </h1>
          <p className="text-sm text-[#4b5563] dark:text-[#9ca3af]">
            Select your account type to get started.
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-[#f7f4ee] dark:bg-[#121815] p-1.5 rounded-full border border-[#ede4d5] dark:border-[#2a3d33]">
          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition ${
              role === 'buyer'
                ? 'bg-[#2f4739] text-[#faf7f2] shadow-xs'
                : 'text-[#4b5563] dark:text-[#9ca3af] hover:text-[#111827] dark:hover:text-[#f4f0ea]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> As a Buyer
          </button>
          <button
            type="button"
            onClick={() => setRole('seller')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition ${
              role === 'seller'
                ? 'bg-[#2f4739] text-[#faf7f2] shadow-xs'
                : 'text-[#4b5563] dark:text-[#9ca3af] hover:text-[#111827] dark:hover:text-[#f4f0ea]'
            }`}
          >
            <Store className="w-4 h-4" /> As a Seller
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#111827] dark:text-[#f4f0ea] placeholder:text-[#9ca3af] transition text-sm font-medium"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">
              Password *
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#111827] dark:text-[#f4f0ea] placeholder:text-[#9ca3af] transition text-sm font-medium"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          {role === 'seller' && (
            <div className="space-y-4 pt-2 border-t border-[#e7e0d5] dark:border-[#2a3d33] animate-in fade-in duration-300">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">
                  Shop or Brand Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. EcoCraft Studios"
                  className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#111827] dark:text-[#f4f0ea] placeholder:text-[#9ca3af] transition text-sm font-medium"
                  onChange={(e) => setShopName(e.target.value)}
                  value={shopName}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">
                  GST Number or Artisan ID *
                </label>
                <input
                  type="text"
                  placeholder="22AAAAA0000A1Z5"
                  className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#111827] dark:text-[#f4f0ea] placeholder:text-[#9ca3af] transition uppercase text-sm font-medium"
                  onChange={(e) => setGstNo(e.target.value)}
                  value={gstNo}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">
                  Shop Location / Address *
                </label>
                <textarea
                  placeholder="Full operating address of your sustainable brand"
                  className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#111827] dark:text-[#f4f0ea] placeholder:text-[#9ca3af] transition text-sm font-medium h-24 resize-none"
                  onChange={(e) => setShopLocation(e.target.value)}
                  value={shopLocation}
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] font-semibold py-4 rounded-full transition shadow-soft text-base flex items-center justify-center gap-2 active:scale-95"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#e7e0d5] dark:border-[#2a3d33]">
          <p className="text-sm text-[#4b5563] dark:text-[#9ca3af]">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#2f4739] dark:text-[#489a69] font-bold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
