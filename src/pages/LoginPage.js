import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../context/AppContext';

const LoginPage = () => {
  const { loginUser, requestPasswordReset, showMessage, isSupabaseConfigured } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showMessage('Please enter both email and password.');
      return;
    }

    const { error, role } = await loginUser({ email, password });

    if (error) {
      showMessage(error.message);
      return;
    }

    navigate(role === 'seller' || role === 'admin' ? '/seller-dashboard' : '/home');
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword((prev) => {
      const nextValue = !prev;

      if (!prev) {
        setResetEmail(email);
      }

      return nextValue;
    });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!resetEmail) {
      showMessage('Please enter your email to receive a reset link.');
      return;
    }

    setIsSendingReset(true);

    const { error, mode } = await requestPasswordReset(resetEmail);

    setIsSendingReset(false);

    if (error) {
      showMessage(`Error: ${error.message}`);
      return;
    }

    showMessage(
      mode === 'local'
        ? 'Demo mode: password reset is simulated locally.'
        : 'Password reset link sent! Check your email.'
    );
    setEmail(resetEmail);
    setShowForgotPassword(false);
  };

  return (
    <section className="py-8 bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Login to Green Turtle
      </h2>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="********"
            required
          />

          <div className="text-right mt-1">
            <button
              type="button"
              onClick={toggleForgotPassword}
              className="text-sm text-gray-500 hover:text-green-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {showForgotPassword && (
          <div className="rounded-lg border border-green-100 bg-green-50 p-4 space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-green-900">Reset your password</h3>
              <p className="text-sm text-green-800 mt-1">
                Enter your email and we&apos;ll send you a password reset link.
              </p>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Reset Email
              </label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isSendingReset}
                className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-70"
              >
                {isSendingReset ? 'Sending...' : 'Send Reset Link'}
              </button>

              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition duration-300"
              >
                Cancel
              </button>
            </div>

            {!isSupabaseConfigured && (
              <p className="text-xs text-gray-600">
                Demo mode is active, so the reset request will be simulated locally.
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
        >
          Login
        </button>
      </form>

      <p className="text-center text-gray-600 mt-6">
        Don't have an account?{' '}
        <button
          onClick={() => navigate('/register')}
          className="text-green-600 hover:underline"
        >
          Register
        </button>
      </p>

      {!isSupabaseConfigured && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Demo mode is active. Use any email and password to explore the storefront.
        </p>
      )}
    </section>
  );
};

export default LoginPage;
