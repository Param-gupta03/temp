"use client";

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';

import { AppContext } from '@/context/AppContext';

const RegisterPage = () => {
  const { registerUser, showMessage }: any = useContext(AppContext);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [gstNo, setGstNo] = useState('');
  const [shopLocation, setShopLocation] = useState('');
  const [shopName, setShopName] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const registrationData = {
      email,
      password,
      nextRole: role,
      metadata: role === 'seller' ? {
        gst_no: gstNo,
        shop_location: shopLocation,
        shop_name: shopName
      } : {}
    };

    const { error, mode } = await registerUser(registrationData);

    if (error) {
      showMessage(error.message);
      return;
    }

    showMessage(
      mode === 'local'
        ? 'Demo account ready. You can start shopping now.'
        : 'Registered successfully!'
    );
    router.push(role === 'seller' || role === 'admin' ? '/seller-dashboard' : '/landing');
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-md mx-auto p-8 md:p-10 bg-white text-[#1c1917] rounded-3xl shadow-sm border border-[#ede4d5]">
        <div className="text-center mb-6 space-y-1">
          <span className="text-xs uppercase tracking-wider text-[#8d6b4f] font-semibold">Join the Movement</span>
          <h2 className="text-3xl font-serif font-bold text-[#1c1917]">
            Join <span className="text-[#2f4739]">The Green Turtles</span>
          </h2>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition ${role === 'buyer' ? 'bg-[#2f4739] text-[#faf7f2] shadow-xs' : 'bg-[#f7f4ee] border border-[#ede4d5] text-[#66615b] hover:bg-[#ede4d5]/60'}`}
          >
            Buyer
          </button>
          <button
            type="button"
            onClick={() => setRole('seller')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition ${role === 'seller' ? 'bg-[#2f4739] text-[#faf7f2] shadow-xs' : 'bg-[#f7f4ee] border border-[#ede4d5] text-[#66615b] hover:bg-[#ede4d5]/60'}`}
          >
            Seller
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-[#1c1917]">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full bg-[#faf7f2] border border-[#ede4d5] px-4 py-2.5 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition text-sm"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-[#1c1917]">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#faf7f2] border border-[#ede4d5] px-4 py-2.5 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition text-sm"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          {role === 'seller' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <div>
                <label className="block text-xs font-semibold mb-1 text-[#1c1917]">Shop Name</label>
                <input
                  type="text"
                  placeholder="Turtle's Green Shop"
                  className="w-full bg-[#faf7f2] border border-[#ede4d5] px-4 py-2.5 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition text-sm"
                  onChange={(e) => setShopName(e.target.value)}
                  value={shopName}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-[#1c1917]">GST Number</label>
                <input
                  type="text"
                  placeholder="22AAAAA0000A1Z5"
                  className="w-full bg-[#faf7f2] border border-[#ede4d5] px-4 py-2.5 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition uppercase text-sm"
                  onChange={(e) => setGstNo(e.target.value)}
                  value={gstNo}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-[#1c1917]">Shop Location / Address</label>
                <textarea
                  placeholder="Full address of your shop"
                  className="w-full bg-[#faf7f2] border border-[#ede4d5] px-4 py-2.5 rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition h-20 text-sm resize-none"
                  onChange={(e) => setShopLocation(e.target.value)}
                  value={shopLocation}
                  required
                />
              </div>
            </div>
          )}

          <button className="w-full bg-[#2f4739] text-[#faf7f2] font-semibold py-3 rounded-full hover:bg-[#23372c] transition shadow-sm text-sm mt-2">
            Create Account
          </button>
        </form>

        <p className="text-center text-[#66615b] mt-6 text-xs font-medium">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-[#2f4739] hover:underline font-semibold"
          >
            Login
          </button>
        </p>

      </div>
    </section>
  );
};

export default RegisterPage;
