import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { supabase, showMessage } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ---------------- LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showMessage('Please enter both email and password.');
      return;
    }

    // 🔥 Step 1: Login
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      showMessage(loginError.message);
      return;
    }

    // 🔥 Step 2: Get user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 🔥 Step 3: Get role
    const { data, error: roleError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    // 🔥 Safety check
    if (roleError || !data) {
      console.error('Role not found:', roleError);
      showMessage('Login successful (defaulting to buyer)');
      navigate('/home');
      return;
    }

    // 🔥 Redirect based on role
    if (data.role === 'seller') {
      navigate('/seller-dashboard');
    } else {
      navigate('/home');
    }
  };

  // ---------------- FORGOT PASSWORD ----------------
  const handleForgotPassword = async () => {
    if (!email) {
      showMessage('Please enter your email above to receive a reset link.');
      return;
    }

    const resetUrl = 'https://thegreenturtles.in/reset-password';

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: resetUrl,
    });

    if (error) {
      showMessage(`Error: ${error.message}`);
    } else {
      showMessage('Password reset link sent! Check your email.');
    }
  };

  return (
    <section className="py-8 bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Login to Green Turtle
      </h2>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
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
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
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
              onClick={handleForgotPassword}
              className="text-sm text-gray-500 hover:text-green-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </div>

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
    </section>
  );
};

export default LoginPage;