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
  Sun,
  Moon,
  Menu,
  X,
  Store,
  ShoppingBag,
  Handshake
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

import SvgLogo from '../svg';
import { AppContext } from '../context/AppContext';

interface HeaderProps {
  isComingSoon?: boolean;
  isSubscriptionPage?: boolean;
}

const Header = ({ isComingSoon, isSubscriptionPage }: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, role, showMessage, logoutUser, cart, theme, toggleTheme } = useContext(AppContext) || {};
  const router = useRouter();
  const pathname = usePathname();

  // Role & View Logic
  const isAdmin = role === 'admin';
  const isSeller = role === 'seller';
  const isSellerView = pathname?.startsWith('/seller') || pathname === '/why-partner-us';

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

  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    if (logoutUser) {
      const { error } = await logoutUser();
      if (error) {
        showMessage?.(error.message);
        return;
      }
    }

    showMessage?.('Logged out successfully');
    router.push('/home');
    setIsProfileOpen(false);
  };

  const goTo = (page: string) => {
    router.push(`/${page}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#faf7f2]/95 dark:bg-[#121815]/95 backdrop-blur-md border-b border-[#e7e0d5] dark:border-[#2a3d33] py-3.5 sticky top-0 z-50 transition-colors duration-200">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        {/* LOGO: Clean, Completely Transparent Background, No Box */}
        <button
          type="button"
          onClick={() => {
            if (isAdmin) {
              router.push('/admin/dashboard');
            } else if (isSeller || isSellerView) {
              router.push('/seller-home');
            } else {
              router.push('/home');
            }
          }}
          className="text-2xl font-bold flex items-center gap-3 hover:opacity-90 transition-opacity group"
        >
          <div className="shrink-0 bg-transparent flex items-center justify-center">
            <SvgLogo className="w-10 h-10 shrink-0 pointer-events-none drop-shadow-xs" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#2f4739] dark:text-[#489a69] group-hover:underline decoration-1 underline-offset-4">
            The Green Turtles
          </span>
        </button>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-semibold">
          {!(isComingSoon || isSubscriptionPage) && (
            <>
              {isAdmin && (
                <button
                  onClick={() => goTo('admin/dashboard')}
                  className="flex items-center gap-1.5 text-[#111827] dark:text-[#f4f0ea] hover:text-[#2f4739] dark:hover:text-[#489a69] transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Admin Panel
                </button>
              )}

              {/* SELLER NAVIGATION (Only shown in seller context) */}
              {isSellerView ? (
                <>
                  <button
                    onClick={() => goTo('seller-home')}
                    className="flex items-center gap-1.5 text-[#111827] dark:text-[#f4f0ea] hover:text-[#2f4739] dark:hover:text-[#489a69] transition-colors"
                  >
                    <Home className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Home
                  </button>

                  <button
                    onClick={() => goTo('why-partner-us')}
                    className="flex items-center gap-1.5 text-[#111827] dark:text-[#f4f0ea] hover:text-[#2f4739] dark:hover:text-[#489a69] transition-colors"
                  >
                    <Handshake className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Why Partner Us
                  </button>

                  <button
                    onClick={() => goTo('products')}
                    className="flex items-center gap-1.5 text-[#111827] dark:text-[#f4f0ea] hover:text-[#2f4739] dark:hover:text-[#489a69] transition-colors"
                  >
                    <Package className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Products
                  </button>

                  {isSeller && (
                    <button
                      onClick={() => goTo('seller-dashboard')}
                      className="flex items-center gap-1.5 text-[#111827] dark:text-[#f4f0ea] hover:text-[#2f4739] dark:hover:text-[#489a69] transition-colors"
                    >
                      <Package className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Dashboard
                    </button>
                  )}
                </>
              ) : (
                /* BUYER NAVIGATION (Standard navbar, no Why Partner Us, just "Home") */
                <>
                  <button
                    onClick={() => goTo('home')}
                    className="flex items-center gap-1.5 text-[#111827] dark:text-[#f4f0ea] hover:text-[#2f4739] dark:hover:text-[#489a69] transition-colors"
                  >
                    <Home className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Home
                  </button>

                  <button
                    onClick={() => goTo('products')}
                    className="flex items-center gap-1.5 text-[#111827] dark:text-[#f4f0ea] hover:text-[#2f4739] dark:hover:text-[#489a69] transition-colors"
                  >
                    <Package className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Products
                  </button>

                  <button
                    onClick={() => goTo('about')}
                    className="flex items-center gap-1.5 text-[#111827] dark:text-[#f4f0ea] hover:text-[#2f4739] dark:hover:text-[#489a69] transition-colors"
                  >
                    <Info className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> About
                  </button>

                  <button
                    onClick={() => goTo('contact')}
                    className="flex items-center gap-1.5 text-[#111827] dark:text-[#f4f0ea] hover:text-[#2f4739] dark:hover:text-[#489a69] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Contact
                  </button>

                  <button
                    onClick={() => goTo('cart')}
                    className="relative flex items-center gap-1.5 text-[#111827] dark:text-[#f4f0ea] hover:text-[#2f4739] dark:hover:text-[#489a69] transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" />
                    Cart
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-3 bg-[#2f4739] dark:bg-[#489a69] text-[#faf7f2] text-[11px] font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center shadow-xs">
                        {cartItemCount}
                      </span>
                    )}
                  </button>

                  {user && role === 'buyer' && (
                    <div className="flex items-center gap-1.5 text-[#2f4739] dark:text-[#489a69] font-bold text-xs bg-[#e8ede9] dark:bg-[#1a2c21] px-3 py-1.5 rounded-full border border-[#d2dfd5] dark:border-[#2f4739]">
                      <Leaf className="w-3.5 h-3.5" /> {ecoCoins} Coins
                    </div>
                  )}
                </>
              )}

              {/* THEME TOGGLE BUTTON (Light / Dark variant) */}
              <button
                type="button"
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Variant'}
                className="p-2 rounded-full border border-[#d9cebe] dark:border-[#2f4739] bg-white dark:bg-[#1c2620] text-[#2f4739] dark:text-[#489a69] hover:scale-105 active:scale-95 transition shadow-xs"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[#d4a373]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#2f4739]" />
                )}
              </button>

              {/* AUTH / PROFILE */}
              {!user ? (
                <button
                  onClick={() => goTo('login')}
                  className="flex items-center gap-2 bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] px-6 py-2.5 rounded-full transition shadow-soft font-semibold text-sm active:scale-95"
                >
                  <User className="w-4 h-4" /> Login
                </button>
              ) : (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2.5 bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-2 rounded-full hover:border-[#2f4739] transition-colors shadow-xs"
                  >
                    <div className="bg-[#e8ede9] dark:bg-[#223028] p-1 rounded-full">
                      <User className="w-3.5 h-3.5 text-[#2f4739] dark:text-[#489a69]" />
                    </div>
                    <span className="text-xs font-bold text-[#111827] dark:text-[#f4f0ea]">
                      {user.email?.split('@')[0]}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[#6b7280] transition-transform ${
                        isProfileOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] shadow-card rounded-2xl p-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                      {!isAdmin && (
                        <button
                          onClick={() => goTo('profile')}
                          className="w-full text-left flex items-center px-4 py-2.5 text-sm font-medium text-[#111827] dark:text-[#f4f0ea] hover:bg-[#f7f4ee] dark:hover:bg-[#223028] rounded-xl transition-colors"
                        >
                          <Settings className="w-4 h-4 mr-3 text-[#6b7280]" />
                          Profile Settings
                        </button>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2.5 text-sm font-semibold text-[#a74338] hover:bg-[#fdf4f2] dark:hover:bg-[#331c19] rounded-xl transition-colors"
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

        {/* MOBILE MENU TOGGLE & THEME TOGGLE */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[#d9cebe] dark:border-[#2f4739] bg-white dark:bg-[#1c2620] text-[#2f4739] dark:text-[#489a69]"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#d4a373]" /> : <Moon className="w-4 h-4 text-[#2f4739]" />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] text-[#111827] dark:text-[#f4f0ea]"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#e7e0d5] dark:border-[#2a3d33] bg-[#faf7f2] dark:bg-[#121815] px-6 py-6 space-y-3 shadow-xl">
          <div className="space-y-2 text-base font-semibold">
            {isSellerView ? (
              <>
                <button
                  onClick={() => goTo('seller-home')}
                  className="w-full text-left py-2 text-[#111827] dark:text-[#f4f0ea] flex items-center gap-2"
                >
                  <Home className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Home
                </button>
                <button
                  onClick={() => goTo('why-partner-us')}
                  className="w-full text-left py-2 text-[#111827] dark:text-[#f4f0ea] flex items-center gap-2"
                >
                  <Handshake className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Why Partner Us
                </button>
                <button
                  onClick={() => goTo('products')}
                  className="w-full text-left py-2 text-[#111827] dark:text-[#f4f0ea] flex items-center gap-2"
                >
                  <Package className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Products
                </button>
                {isSeller && (
                  <button
                    onClick={() => goTo('seller-dashboard')}
                    className="w-full text-left py-2 text-[#111827] dark:text-[#f4f0ea] flex items-center gap-2"
                  >
                    <Package className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Dashboard
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => goTo('home')}
                  className="w-full text-left py-2 text-[#111827] dark:text-[#f4f0ea] flex items-center gap-2"
                >
                  <Home className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Home
                </button>
                <button
                  onClick={() => goTo('products')}
                  className="w-full text-left py-2 text-[#111827] dark:text-[#f4f0ea] flex items-center gap-2"
                >
                  <Package className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Products
                </button>
                <button
                  onClick={() => goTo('about')}
                  className="w-full text-left py-2 text-[#111827] dark:text-[#f4f0ea] flex items-center gap-2"
                >
                  <Info className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> About
                </button>
                <button
                  onClick={() => goTo('contact')}
                  className="w-full text-left py-2 text-[#111827] dark:text-[#f4f0ea] flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Contact
                </button>
                <button
                  onClick={() => goTo('cart')}
                  className="w-full text-left py-2 text-[#111827] dark:text-[#f4f0ea] flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-[#2f4739] dark:text-[#489a69]" /> Cart
                  </span>
                  {cartItemCount > 0 && (
                    <span className="bg-[#2f4739] text-white px-2 py-0.5 rounded-full text-xs font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </>
            )}
          </div>

          <div className="pt-4 border-t border-[#e7e0d5] dark:border-[#2a3d33]">
            {!user ? (
              <button
                onClick={() => goTo('login')}
                className="w-full bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] py-3 rounded-full font-semibold text-center"
              >
                Login to Account
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full bg-[#a74338] text-white py-3 rounded-full font-semibold text-center"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
