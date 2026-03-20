import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { supabase, showMessage } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');

  const handleRegister = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: role,
      },
    },
  });

  if (error) {
    showMessage(error.message);
    return;
  }

  // 🔥 optional but best practice
  if (data.user) {
    await supabase.from('users').insert([
      {
        id: data.user.id,
        email: email,
        role: role,
      },
    ]);
  }

  showMessage('Registered successfully!');
  navigate('/login');
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
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🔥 Role Selection */}
        <div className="flex gap-4">
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
        </div>

        <button className="w-full bg-green-600 text-white py-2">
          Register
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;