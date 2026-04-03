import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  ShoppingCart,
  User,
  Home,
  Phone,
  Package,
  Info,
  LogOut,
  ChevronDown,
  Settings,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import SvgLogo from '../svg';
import { AppContext } from '../context/AppContext';

const Header = ({ isComingSoon, isSubscriptionPage }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { user, role, showMessage, logoutUser, cart } = useContext(AppContext);
  const navigate = useNavigate();

  // Role Logic
  const isAdmin = role === 'admin';
  const isSeller = role === 'seller';
  const canAccessDashboard = isAdmin || isSeller;

  const cartItemCount =
    cart?.reduce((count, item) => count + (item.quantity || 0), 0) || 0;

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const { error } = await logoutUser();
    if (error) {
      showMessage(error.message);
      return;
    }

    showMessage('Logged out successfully');
    navigate('/home');
    setIsProfileOpen(false);
  };

  // Helper for consistent navigation
  const goTo = (page) => {
    navigate(`/${page}`);
  };

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50 rounded-b-lg">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo Button - Fixed Logic */}
        <button
          type="button"
          onClick={() => navigate(canAccessDashboard ? '/seller-dashboard' : '/home')}
          className="text-2xl font-bold text-green-700 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <SvgLogo className="w-10 h-10 text-green-600 shrink-0 pointer-events-none" />
          <span>Green Turtle</span>
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {!(isComingSoon || isSubscriptionPage) && (
            <>
              {canAccessDashboard ? (
                <button
                  onClick={() => goTo('seller-dashboard')}
                  className="flex items-center gap-1 hover:text-green-600 transition-colors"
                >
                  <Package className="w-5 h-5" /> Dashboard
                </button>
              ) : (
                <>
                  <button onClick={() => goTo('home')} className="flex items-center gap-1 hover:text-green-600 transition-colors">
                    <Home className="w-5 h-5" /> Home
                  </button>

                  <button
                    onClick={() => goTo('products')}
                    className="flex items-center gap-1 hover:text-green-600 transition-colors"
                  >
                    <Package className="w-5 h-5" /> Products
                  </button>

                  <button onClick={() => goTo('about')} className="flex items-center gap-1 hover:text-green-600 transition-colors">
                    <Info className="w-5 h-5" /> About
                  </button>

                  <button
                    onClick={() => goTo('contact')}
                    className="flex items-center gap-1 hover:text-green-600 transition-colors"
                  >
                    <Phone className="w-5 h-5" /> Contact
                  </button>

                  <button onClick={() => goTo('cart')} className="relative flex items-center gap-1 hover:text-green-600 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    Cart
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                </>
              )}

              {!user ? (
                <button 
                  onClick={() => goTo('login')} 
                  className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  <User className="w-5 h-5" /> Login
                </button>
              ) : (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <div className="bg-green-100 p-1 rounded-full">
                      <User className="w-4 h-4 text-green-700" />
                    </div>
                    <span className="text-sm font-medium">
                      {user.email?.split('@')[0]}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl border border-gray-100 rounded-xl p-2 z-[60]">
                      {!isAdmin && (
                        <button 
                          onClick={() => goTo('profile')} 
                          className="w-full text-left flex items-center px-4 py-2 text-sm hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Settings className="w-4 h-4 mr-2 text-gray-500" />
                          Profile
                        </button>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;