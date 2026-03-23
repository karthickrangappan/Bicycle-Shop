import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@bicycleshop.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    const result = login(email, password);
    if (result.success) navigate('/admin');
    else setError(result.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4" style={{fontFamily:"'DM Sans', system-ui, sans-serif"}}>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-amber-500/20">🚲</div>
            <h1 className="text-2xl font-black text-white tracking-tight">VeloAdmin</h1>
            <p className="text-gray-500 text-sm mt-1">Bicycle Shop Control Panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="admin@bicycleshop.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 text-red-400 text-sm">{error}</div>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" className="accent-amber-500" />
                Remember me
              </label>
              <button type="button" className="text-amber-400 hover:text-amber-300">Forgot password?</button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide"
            >
              {loading ? '⟳ Signing in...' : 'Sign In to Admin Panel'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <p className="text-xs text-gray-500 text-center font-medium">Demo Credentials</p>
            <p className="text-xs text-gray-400 text-center mt-1">admin@bicycleshop.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
