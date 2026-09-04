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
    <header className="bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#e7e0d5] py-4 sticky top-0 z-50">
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
          className="text-2xl font-bold flex items-center gap-2.5 hover:opacity-90 transition-opacity"
        >
          <div className="p-1.5 rounded-xl bg-[#e8ede9]">
            <SvgLogo className="w-8 h-8 text-[#2f4739] shrink-0 pointer-events-none" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#2f4739]">The Green Turtles</span>
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-7">
          {!(isComingSoon || isSubscriptionPage) && (
            <>
              {isAdmin && (
                <button
                  onClick={() => goTo('admin/dashboard')}
                  className="flex items-center gap-2 text-[#1c1917]/80 hover:text-[#2f4739] text-sm font-medium transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-[#2f4739]" /> Admin Panel
                </button>
              )}
              {canAccessDashboard ? (
                <button
                  onClick={() => goTo('seller-dashboard')}
                  className="flex items-center gap-2 text-[#1c1917]/80 hover:text-[#2f4739] text-sm font-medium transition-colors"
                >
                  <Package className="w-4 h-4 text-[#2f4739]" /> Dashboard
                </button>
              ) : (
                <>
                  <button onClick={() => goTo('home')} className="flex items-center gap-1.5 text-[#1c1917]/80 hover:text-[#2f4739] text-sm font-medium transition-colors">
                    <Home className="w-4 h-4 text-[#2f4739]" /> Home
                  </button>

                  <button
                    onClick={() => goTo('products')}
                    className="flex items-center gap-1.5 text-[#1c1917]/80 hover:text-[#2f4739] text-sm font-medium transition-colors"
                  >
                    <Package className="w-4 h-4 text-[#2f4739]" /> Products
                  </button>

                  <button onClick={() => goTo('about')} className="flex items-center gap-1.5 text-[#1c1917]/80 hover:text-[#2f4739] text-sm font-medium transition-colors">
                    <Info className="w-4 h-4 text-[#2f4739]" /> About
                  </button>

                  <button
                    onClick={() => goTo('contact')}
                    className="flex items-center gap-1.5 text-[#1c1917]/80 hover:text-[#2f4739] text-sm font-medium transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#2f4739]" /> Contact
                  </button>

                  <button onClick={() => goTo('cart')} className="relative flex items-center gap-1.5 text-[#1c1917]/80 hover:text-[#2f4739] text-sm font-medium transition-colors">
                    <ShoppingCart className="w-4 h-4 text-[#2f4739]" />
                    Cart
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1.5 -right-2.5 bg-[#2f4739] text-[#faf7f2] text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                  {user && role === 'buyer' && (
                    <div className="flex items-center gap-1.5 text-[#2f4739] font-semibold text-xs bg-[#e8ede9] px-3 py-1 rounded-full border border-[#d2dfd5]">
                      <Leaf className="w-3.5 h-3.5" /> {ecoCoins} Coins
                    </div>
                  )}
                </>
              )}

              {!user ? (
                <button 
                  onClick={() => goTo('login')} 
                  className="flex items-center gap-2 bg-[#2f4739] text-[#faf7f2] px-6 py-2.5 rounded-full hover:bg-[#23372c] transition shadow-sm font-medium text-sm active:scale-[0.98]"
                >
                  <User className="w-4 h-4" /> Login
                </button>
              ) : (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2.5 bg-white border border-[#e7e0d5] px-3.5 py-1.5 rounded-full hover:border-[#cfc4b2] transition-colors shadow-sm"
                  >
                    <div className="bg-[#e8ede9] p-1 rounded-full">
                      <User className="w-3.5 h-3.5 text-[#2f4739]" />
                    </div>
                    <span className="text-xs font-semibold text-[#1c1917]">
                      {user.email?.split('@')[0]}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#8a847c] transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white border border-[#e7e0d5] shadow-[0_16px_40px_-6px_rgba(47,71,57,0.12)] rounded-2xl p-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                      {!isAdmin && (
                        <button 
                          onClick={() => goTo('profile')} 
                          className="w-full text-left flex items-center px-4 py-2.5 text-sm text-[#1c1917]/80 hover:bg-[#f7f4ee] rounded-xl transition-colors"
                        >
                          <Settings className="w-4 h-4 mr-3 text-[#8a847c]" />
                          Profile
                        </button>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2.5 text-sm text-[#a74338] hover:bg-[#fdf4f2] rounded-xl transition-colors font-medium"
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
