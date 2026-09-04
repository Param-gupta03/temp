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
      <div className="bg-white rounded-3xl border border-[#ede4d5] shadow-sm overflow-hidden">
        <div className="bg-[#2f4739] p-8 md:p-10 text-center text-[#faf7f2] relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-block p-4 bg-white/10 rounded-2xl backdrop-blur-md mb-4 border border-white/20">
              <User size={40} className="text-[#faf7f2]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-1">My Profile</h2>
            <p className="text-xs text-[#faf7f2]/80 font-medium">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="p-8 md:p-10 space-y-6">
          <div className="space-y-1.5">
            <label className="flex items-center text-xs font-semibold text-[#1c1917]">
              <User size={14} className="mr-2 text-[#2f4739]" /> Full Name
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ede4d5] rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition text-sm"
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center text-xs font-semibold text-[#1c1917]">
              <Phone size={14} className="mr-2 text-[#2f4739]" /> Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ede4d5] rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition text-sm"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center text-xs font-semibold text-[#1c1917]">
              <MapPin size={14} className="mr-2 text-[#2f4739]" /> Delivery Address
            </label>
            <textarea
              rows={3}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ede4d5] rounded-xl focus:border-[#2f4739] focus:outline-none text-[#1c1917] placeholder:text-[#a8a29e] transition resize-none text-sm"
              placeholder="Where should we send your eco-friendly items?"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2f4739] text-[#faf7f2] py-3.5 rounded-full font-semibold shadow-sm hover:bg-[#23372c] transition flex items-center justify-center space-x-2 text-sm"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#faf7f2]/30 border-t-[#faf7f2] rounded-full animate-spin"></div>
            ) : (
              <><Save size={18} /> <span>Save Changes</span></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
