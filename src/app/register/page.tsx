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
    <section className="max-w-lg mx-auto p-8 bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
        Join The Green Turtles
      </h2>

      <div className="flex justify-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => setRole('buyer')}
          className={`px-6 py-2 rounded-full transition ${role === 'buyer' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
        >
          Buyer
        </button>
        <button
          type="button"
          onClick={() => setRole('seller')}
          className={`px-6 py-2 rounded-full transition ${role === 'seller' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
        >
          Seller
        </button>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">Email Address</label>
          <input
            type="email"
            placeholder="name@company.com"
            className="w-full bg-gray-800 border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-gray-800 border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {role === 'seller' && (
          <div className="space-y-5 animate-in fade-in slide-in-from-top-4 duration-300">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Shop Name</label>
              <input
                type="text"
                placeholder="Turtle's Green Shop"
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                onChange={(e) => setShopName(e.target.value)}
                value={shopName}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">GST Number</label>
              <input
                type="text"
                placeholder="22AAAAA0000A1Z5"
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition uppercase"
                onChange={(e) => setGstNo(e.target.value)}
                value={gstNo}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Shop Location / Address</label>
              <textarea
                placeholder="Full address of your shop"
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition h-24"
                onChange={(e) => setShopLocation(e.target.value)}
                value={shopLocation}
                required
              />
            </div>
          </div>
        )}

        <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-[1.02] active:scale-[0.98] shadow-lg">
          Create Account
        </button>
      </form>

    </section>
  );
};

export default RegisterPage;
