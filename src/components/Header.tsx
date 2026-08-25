"use client";
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
  ShieldCheck,
  Leaf,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import SvgLogo from '../svg';
import { AppContext } from '../context/AppContext';

interface HeaderProps {
  isComingSoon?: boolean;
  isSubscriptionPage?: boolean;
}

const Header = ({ isComingSoon, isSubscriptionPage }: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, role, showMessage, logoutUser, cart } = useContext(AppContext);
  const router = useRouter();

  // Role Logic
  const isAdmin = role === 'admin';
  const isSeller = role === 'seller';
  const canAccessDashboard = isSeller;

  const cartItemCount =
    cart?.reduce((count: number, item: any) => count + (item.quantity || 0), 0) || 0;

  const ecoCoins = user?.user_metadata?.eco_coins || 0;

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
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
    router.push('/home');
    setIsProfileOpen(false);
  };

  // Helper for consistent navigation
  const goTo = (page: string) => {
    router.push(`/${page}`);
  };

  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 py-4 sticky top-0 z-50">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo Button - Fixed Logic */}
        <button
          type="button"
          onClick={() => {
            if (isAdmin) {
              router.push('/admin/dashboard');
            } else if (isSeller) {
              router.push('/seller-dashboard');
            } else {
              router.push('/landing');
            }
          }}
          className="text-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <div className=" p-2 rounded-xl">
            <SvgLogo className="w-8 h-8 text-green-500 shrink-0 pointer-events-none" />
          </div>
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">The Green Turtles</span>
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {!(isComingSoon || isSubscriptionPage) && (
            <>
              {isAdmin && (
                <button
                  onClick={() => goTo('admin/dashboard')}
                  className="flex items-center gap-2 text-slate-300 hover:text-purple-400 font-medium transition-colors"
                >
                  <ShieldCheck className="w-5 h-5" /> Admin Panel
                </button>
              )}
              {canAccessDashboard ? (
                <button
                  onClick={() => goTo('seller-dashboard')}
                  className="flex items-center gap-2 text-slate-300 hover:text-green-400 font-medium transition-colors"
                >
                  <Package className="w-5 h-5" /> Dashboard
                </button>
              ) : (
                <>
                  <button onClick={() => goTo('home')} className="flex items-center gap-2 text-slate-300 hover:text-green-400 font-medium transition-colors">
                    <Home className="w-5 h-5" /> Home
                  </button>

                  <button
                    onClick={() => goTo('products')}
                    className="flex items-center gap-2 text-slate-300 hover:text-green-400 font-medium transition-colors"
                  >
                    <Package className="w-5 h-5" /> Products
                  </button>

                  <button onClick={() => goTo('about')} className="flex items-center gap-2 text-slate-300 hover:text-green-400 font-medium transition-colors">
                    <Info className="w-5 h-5" /> About
                  </button>

                  <button
                    onClick={() => goTo('contact')}
                    className="flex items-center gap-2 text-slate-300 hover:text-green-400 font-medium transition-colors"
                  >
                    <Phone className="w-5 h-5" /> Contact
                  </button>

                  <button onClick={() => goTo('cart')} className="relative flex items-center gap-2 text-slate-300 hover:text-green-400 font-medium transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    Cart
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-2 bg-green-500 text-slate-900 text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow-lg">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                  {user && role === 'buyer' && (
                    <div className="flex items-center gap-2 text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                      <Leaf className="w-4 h-4" /> {ecoCoins} Coins
                    </div>
                  )}
                </>
              )}

              {!user ? (
                <button 
                  onClick={() => goTo('login')} 
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-xl hover:from-green-700 hover:to-emerald-700 transition shadow-lg font-bold"
                >
                  <User className="w-5 h-5" /> Login
                </button>
              ) : (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-2xl hover:bg-slate-800 transition-colors"
                  >
                    <div className="bg-green-500/20 p-1.5 rounded-full">
                      <User className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-sm font-semibold text-slate-200">
                      {user.email?.split('@')[0]}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-slate-800 border border-slate-700 shadow-2xl rounded-2xl p-2 z-[60] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                      {!isAdmin && (
                        <button 
                          onClick={() => goTo('profile')} 
                          className="w-full text-left flex items-center px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 rounded-xl transition-colors"
                        >
                          <Settings className="w-4 h-4 mr-3 text-slate-500" />
                          Profile
                        </button>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
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
