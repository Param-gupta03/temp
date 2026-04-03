import React, { useState, useContext } from 'react';
import { User, Phone, MapPin, Save } from 'lucide-react';

import { AppContext } from '../context/AppContext';

const ProfilePage = () => {
  const { user, updateProfile, showMessage } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.user_metadata?.full_name || '',
    phone: user?.user_metadata?.phone || '',
    address: user?.user_metadata?.address || '',
  });

  const handleUpdate = async (e) => {
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
    <div className="max-w-xl mx-auto py-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-green-600 p-8 text-center text-white">
          <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
            <User size={48} />
          </div>
          <h2 className="text-2xl font-bold">My Profile</h2>
          <p className="opacity-90">{user?.email}</p>
        </div>

        <form onSubmit={handleUpdate} className="p-8 space-y-6">
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <User size={16} className="mr-2 text-green-600" /> Full Name
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Phone size={16} className="mr-2 text-green-600" /> Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <MapPin size={16} className="mr-2 text-green-600" /> Address
            </label>
            <textarea
              rows="3"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
              placeholder="Your delivery address"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center space-x-2"
          >
            {loading ? 'Updating...' : <><Save size={18} /> <span>Save Changes</span></>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
