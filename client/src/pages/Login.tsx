import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LogIn, AlertCircle, CheckCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white border border-emerald-100 rounded-3xl p-10 shadow-2xl shadow-emerald-100">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-100 p-4 rounded-2xl">
            <LogIn className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
        
        <h2 className="text-3xl font-black text-center mb-8 text-slate-900 tracking-tight">Welcome Back</h2>
        
        {success && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-4 py-3 rounded-xl flex items-center gap-2 mb-6 text-sm font-medium">
            <CheckCircle className="w-5 h-5" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl flex items-center gap-2 mb-6 text-sm font-medium">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2 ml-1">Username or Email</label>
            <input
              type="text"
              required
              className="w-full bg-emerald-50/50 border-2 border-emerald-50 rounded-2xl px-5 py-3.5 text-slate-900 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
              placeholder="johndoe"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2 ml-1">Password</label>
            <input
              type="password"
              required
              className="w-full bg-emerald-50/50 border-2 border-emerald-50 rounded-2xl px-5 py-3.5 text-slate-900 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black py-4 rounded-2xl mt-4 transition-all shadow-xl shadow-emerald-200 hover:-translate-y-1 active:translate-y-0"
          >
            {loading ? 'Opening Doors...' : 'Log In'}
          </button>
        </form>
        
        <p className="text-center text-slate-500 mt-8 font-medium">
          New to Unddict? <Link to="/signup" className="text-emerald-600 font-bold hover:underline underline-offset-4 decoration-2">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
