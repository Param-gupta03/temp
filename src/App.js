import React, { useContext } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { AppContext } from './context/AppContext';
import Footer from './components/Footer';
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import ComingSoonPage from './pages/ComingSoonPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PartnerPage from './pages/PartnerPage';
import ProductDetail from './pages/ProductDetail';
import ProductListPage from './pages/ProductListPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SellerDashboard from './pages/SellerDashboard';
import SubscriptionPage from './pages/SubscriptionPage';

const App = () => {
  const { showMessageModal, message, setShowMessageModal, role } =
    useContext(AppContext);
  const location = useLocation();
  const isComingSoon = location.pathname === '/';
  const isAdmin = role === 'admin';
  const canAccessDashboard = role === 'seller' || role === 'admin';
  const adminOnlyRoute = (element) => (isAdmin ? <Navigate to="/seller-dashboard" replace /> : element);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isComingSoon && <Header />}

      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={adminOnlyRoute(<ComingSoonPage />)} />
          <Route path="/home" element={adminOnlyRoute(<HomePage />)} />
          <Route path="/products" element={adminOnlyRoute(<ProductListPage />)} />
          <Route path="/products/:productId" element={adminOnlyRoute(<ProductDetail />)} />
          <Route path="/cart" element={adminOnlyRoute(<CartPage />)} />
          <Route path="/about" element={adminOnlyRoute(<AboutPage />)} />
          <Route path="/contact" element={adminOnlyRoute(<ContactPage />)} />
          <Route path="/login" element={adminOnlyRoute(<LoginPage />)} />
          <Route path="/register" element={adminOnlyRoute(<RegisterPage />)} />
          <Route path="/subscribe" element={adminOnlyRoute(<SubscriptionPage />)} />
          <Route path="/partner" element={adminOnlyRoute(<PartnerPage />)} />
          <Route path="/profile" element={adminOnlyRoute(<ProfilePage />)} />
          <Route path="/reset-password" element={adminOnlyRoute(<ResetPasswordPage />)} />
          <Route
            path="/seller-dashboard"
            element={
              canAccessDashboard ? (
                <SellerDashboard />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="*"
            element={<Navigate to={isAdmin ? '/seller-dashboard' : '/home'} replace />}
          />
        </Routes>
      </main>

      {!isComingSoon && <Footer />}

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
