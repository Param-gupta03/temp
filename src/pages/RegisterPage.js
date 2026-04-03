import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../context/AppContext';

const RegisterPage = () => {
  const { registerUser, showMessage, isSupabaseConfigured } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');

  const handleRegister = async (e) => {
    e.preventDefault();

    const { error, mode } = await registerUser({
      email,
      password,
      nextRole: role,
    });

    if (error) {
      showMessage(error.message);
      return;
    }

    showMessage(
      mode === 'local'
        ? 'Demo account ready. You can start shopping now.'
        : 'Registered successfully!'
    );
    navigate(role === 'seller' || role === 'admin' ? '/seller-dashboard' : '/home');
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        {/* <div className="flex gap-4">
          <label>
            <input
              type="radio"
              value="buyer"
              checked={role === 'buyer'}
              onChange={(e) => setRole(e.target.value)}
            />
            Buyer
          </label>

          <label>
            <input
              type="radio"
              value="seller"
              checked={role === 'seller'}
              onChange={(e) => setRole(e.target.value)}
            />
            Seller
          </label>
        </div> */}

        <button className="w-full bg-green-600 text-white py-2">Register</button>
      </form>

      {!isSupabaseConfigured && (
        <p className="mt-4 text-sm text-gray-500">
          Demo mode is active. Registration is stored locally in this browser.
        </p>
      )}
    </section>
  );
};

export default RegisterPage;
