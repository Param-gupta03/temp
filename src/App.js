import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppContext } from './context/AppContext';

import Header from './components/Header';
import Footer from './components/Footer';

import ComingSoonPage from './pages/ComingSoonPage';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SubscriptionPage from './pages/SubscriptionPage';
import PartnerPage from './pages/PartnerPage';
import ProfilePage from './pages/ProfilePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SellerDashboard from './pages/SellerDashboard';

const App = () => {
  const { showMessageModal, message, setShowMessageModal } = useContext(AppContext);

  // ✅ Hook inside component
  const location = useLocation();
  const isComingSoon = location.pathname === '/';
  const { role } = useContext(AppContext);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      

      {/* Hide header on Coming Soon */}
      {!isComingSoon && <Header />}

      <main className="flex-grow container mx-auto px-4 py-8">
        
        <Routes>
  {/* Seller Protected Route */}
  <Route
    path="/seller-dashboard"
    element={
      role === 'seller' ? (
        <SellerDashboard />
      ) : (
        <HomePage />
      )
    }
  />

  {/* First page */}
  <Route path="/" element={<ComingSoonPage />} />

  <Route path="/home" element={<HomePage />} />
  <Route path="/products" element={<ProductListPage />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/contact" element={<ContactPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/subscribe" element={<SubscriptionPage />} />
  <Route path="/partner" element={<PartnerPage />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="/reset-password" element={<ResetPasswordPage />} />
</Routes>
      </main>

      {!isComingSoon && <Footer />}

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg">
            <p>{message}</p>
            <button
              onClick={() => setShowMessageModal(false)}
              className="mt-3 text-green-600 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;