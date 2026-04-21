import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, TrendingUp, Wallet, Clock, Heart } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center py-16">
      <div className="bg-emerald-100/80 p-5 rounded-3xl mb-8 shadow-xl shadow-emerald-200">
        <Sprout className="w-14 h-14 text-emerald-600" />
      </div>
      <h1 className="text-6xl font-black mb-4 tracking-tighter text-slate-900">
        Unddict
      </h1>
      <p className="text-2xl font-semibold text-emerald-700 mb-8 italic">
        Your potential, realized.
      </p>
      <p className="text-xl text-slate-600 mb-12 max-w-2xl leading-relaxed">
        Shed the habits that hold you back. Flourish with a brighter, 
        science-backed approach to reclaim your time, money, and clarity.
      </p>
      
      <div className="flex flex-wrap justify-center gap-5 mb-20">
        <Link to="/signup" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl font-black text-xl shadow-xl shadow-emerald-200 transition-all hover:scale-105 hover:-translate-y-1">
          Start Your Growth
        </Link>
        <Link to="/methods" className="bg-white hover:bg-emerald-50 text-emerald-700 border-2 border-emerald-100 px-10 py-4 rounded-2xl font-bold text-xl transition-all hover:border-emerald-200">
          Learn the Methods
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full">
        <div className="bg-white p-10 rounded-3xl border border-emerald-50 shadow-xl shadow-emerald-100/50 flex flex-col items-center hover:scale-105 transition-transform">
          <Clock className="w-10 h-10 text-emerald-500 mb-5" />
          <h3 className="text-2xl font-bold mb-3 text-slate-800">Growth Clock</h3>
          <p className="text-slate-600">Track every second of your new life with our precision timer.</p>
        </div>
        <div className="bg-white p-10 rounded-3xl border border-emerald-50 shadow-xl shadow-emerald-100/50 flex flex-col items-center hover:scale-105 transition-transform">
          <Wallet className="w-10 h-10 text-emerald-500 mb-5" />
          <h3 className="text-2xl font-bold mb-3 text-slate-800">Harvest Wealth</h3>
          <p className="text-slate-600">Calculate exactly how much money returns to your pocket.</p>
        </div>
        <div className="bg-white p-10 rounded-3xl border border-emerald-50 shadow-xl shadow-emerald-100/50 flex flex-col items-center hover:scale-105 transition-transform">
          <Heart className="w-10 h-10 text-emerald-500 mb-5" />
          <h3 className="text-2xl font-bold mb-3 text-slate-800">Personal Care</h3>
          <p className="text-slate-600">Focus on the reasons you chose to flourish today.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
