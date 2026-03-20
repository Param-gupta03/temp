import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const { supabase, showMessage } = useContext(AppContext);
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleRecovery = async () => {
      // Clear any existing session
      await supabase.auth.signOut();

      // Get tokens from URL
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const queryParams = new URLSearchParams(window.location.search);

      const access_token =
        hashParams.get('access_token') || queryParams.get('access_token');
      const refresh_token =
        hashParams.get('refresh_token') || queryParams.get('refresh_token');
      const type =
        hashParams.get('type') || queryParams.get('type');

      if (type !== 'recovery' || !access_token || !refresh_token) {
        showMessage('Invalid or expired reset link');
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        showMessage(error.message);
        setLoading(false);
        return;
      }

      // Clean URL
      window.history.replaceState({}, document.title, '/reset-password');

      setLoading(false);
    };

    handleRecovery();
  }, [supabase, showMessage]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      showMessage('Password must be at least 6 characters');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      showMessage(error.message);
    } else {
      showMessage('Password updated successfully! Please login.');
      await supabase.auth.signOut();
      navigate('/login'); // correct navigation
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <section className="py-8 bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        Set New Password
      </h2>

      <form onSubmit={handleUpdatePassword} className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Update Password
        </button>
      </form>
    </section>
  );
};

export default ResetPasswordPage;