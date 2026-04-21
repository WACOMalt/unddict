import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout, LayoutDashboard, BookOpen, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="border-b border-emerald-100 bg-white/70 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-black text-2xl tracking-tight text-emerald-600">
          <Sprout className="w-7 h-7 text-emerald-500" />
          <span>Unddict</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/methods" className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-600 font-medium transition-colors">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Methods</span>
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-600 font-medium transition-colors">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <div className="flex items-center gap-4 pl-4 border-l border-emerald-100">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline font-bold text-slate-700">{user.username}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Login</Link>
              <Link to="/signup" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-emerald-100 hover:scale-105 active:scale-95">
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
