'use client'
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setMessage(data.message);
    } catch (err) {
      setError('Server error. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6">

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter your email to reset password
          </p>
        </div>

        {message && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

        </form>

      </div>
    </div>
  );
}