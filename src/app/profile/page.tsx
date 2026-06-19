"use client";

import React, { useState, useContext } from 'react';
import { User, Phone, MapPin, Save } from 'lucide-react';

import { AppContext } from '@/context/AppContext';

const ProfilePage = () => {
  const { user, updateProfile, showMessage }: any = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.user_metadata?.full_name || '',
    phone: user?.user_metadata?.phone || '',
    address: user?.user_metadata?.address || '',
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await updateProfile({
      full_name: formData.full_name,
      phone: formData.phone,
      address: formData.address,
    });

    if (error) {
      showMessage(error.message);
    } else {
      showMessage('Profile updated successfully!');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <div className="bg-slate-800/40 rounded-[2.5rem] border border-slate-700 shadow-2xl overflow-hidden backdrop-blur-sm">
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-10 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="relative z-10">
            <div className="inline-block p-5 bg-white/20 rounded-3xl backdrop-blur-md mb-6 border border-white/20">
              <User size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-black mb-1">My Profile</h2>
            <p className="text-white/80 font-medium">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="p-8 md:p-12 space-y-8">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-slate-400 ml-1">
              <User size={16} className="mr-2 text-green-500" /> Full Name
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full p-4 bg-slate-900 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-white transition"
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-slate-400 ml-1">
              <Phone size={16} className="mr-2 text-green-500" /> Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-4 bg-slate-900 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-white transition"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-slate-400 ml-1">
              <MapPin size={16} className="mr-2 text-green-500" /> Delivery Address
            </label>
            <textarea
              rows={3}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-4 bg-slate-900 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-white transition resize-none"
              placeholder="Where should we send your eco-friendly items?"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-green-900/20 hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 text-lg"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <><Save size={20} /> <span>Save Changes</span></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
