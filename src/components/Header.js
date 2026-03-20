import React, { useState, useContext, useRef, useEffect } from 'react';
import { ShoppingCart, User, Home, Phone, Package, Info, LogOut, ChevronDown, Settings } from 'lucide-react';
import SvgLogo from '../svg';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ isComingSoon, isSubscriptionPage }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    // ✅ FIXED: get everything inside component
    const { user, role, showMessage, supabase, cart } = useContext(AppContext);

    const navigate = useNavigate();

    const cartItemCount = cart?.length || 0;

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
        const { error } = await supabase.auth.signOut();
        if (error) {
            showMessage(error.message);
        } else {
            showMessage('Logged out successfully');
            navigate('/home');
            setIsProfileOpen(false);
        }
    };

    const goTo = (page) => {
        navigate(`/${page}`);
    };

    return (
        <header className="bg-white shadow-md py-4 sticky top-0 z-50 rounded-b-lg">
            <nav className="container mx-auto px-4 flex justify-between items-center">

                {/* Logo */}
                <button
                    onClick={() => navigate('/home')}
                    className="text-2xl font-bold text-green-700 flex items-center gap-2"
                >
                    <SvgLogo className="w-10 h-10 text-green-600 shrink-0" />
                    Green Turtle
                </button>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6">
                    {!(isComingSoon || isSubscriptionPage) && (
                        <>
                            {/* 🔥 SELLER VIEW */}
                            {role === 'seller' ? (
                                <>
                                    <button onClick={() => goTo('seller-dashboard')} className="flex items-center gap-1">
                                        <Package className="w-5 h-5" /> Dashboard
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* 🔥 BUYER VIEW */}
                                    <button onClick={() => goTo('home')} className="flex items-center gap-1">
                                        <Home className="w-5 h-5" /> Home
                                    </button>

                                    <button onClick={() => goTo('products')} className="flex items-center gap-1">
                                        <Package className="w-5 h-5" /> Products
                                    </button>

                                    <button onClick={() => goTo('about')} className="flex items-center gap-1">
                                        <Info className="w-5 h-5" /> About
                                    </button>

                                    <button onClick={() => goTo('contact')} className="flex items-center gap-1">
                                        <Phone className="w-5 h-5" /> Contact
                                    </button>

                                    {/* Cart (ONLY BUYER) */}
                                    <button onClick={() => goTo('cart')} className="relative flex items-center gap-1">
                                        <ShoppingCart className="w-5 h-5" />
                                        Cart
                                        {cartItemCount > 0 && (
                                            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                                                {cartItemCount}
                                            </span>
                                        )}
                                    </button>
                                </>
                            )}

                            {/* Auth */}
                            {!user ? (
                                <button onClick={() => goTo('login')} className="flex items-center gap-1">
                                    <User className="w-5 h-5" /> Login
                                </button>
                            ) : (
                                <div className="relative" ref={profileRef}>
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2"
                                    >
                                        <User className="w-4 h-4" />
                                        {user.email?.split('@')[0]}
                                        <ChevronDown className="w-4 h-4" />
                                    </button>

                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2">
                                            <button
                                                onClick={() => goTo('profile')}
                                                className="block px-4 py-2"
                                            >
                                                <Settings className="w-4 h-4 inline mr-2" />
                                                Profile
                                            </button>

                                            <button
                                                onClick={handleLogout}
                                                className="block px-4 py-2 text-red-600"
                                            >
                                                <LogOut className="w-4 h-4 inline mr-2" />
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