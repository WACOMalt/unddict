import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { intervalToDuration, isAfter, parseISO, format, subDays } from 'date-fns';
import { Clock, Wallet, Timer, Quote, Edit2, Check, X, TrendingUp, Calendar, Sprout, Leaf, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

interface TrackerData {
  start_date: string;
  daily_spend: number;
  daily_hours: number;
  why_statement: string;
}

interface DailyLog {
  date: string;
  status: 'clean' | 'used';
  notes: string;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<TrackerData | null>(null);
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<TrackerData>({
    start_date: new Date().toISOString().slice(0, 16),
    daily_spend: 10,
    daily_hours: 2,
    why_statement: ''
  });
  const [now, setNow] = useState(new Date());

  const fetchData = useCallback(async () => {
    try {
      const [trackerRes, logsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/tracker'),
        axios.get('http://localhost:5000/api/tracker/logs')
      ]);
      
      if (trackerRes.data.start_date) {
        setData(trackerRes.data);
        setFormData(trackerRes.data);
      } else {
        setIsEditing(true);
      }
      setLogs(logsRes.data || []);
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogSubmit = async (status: 'clean' | 'used') => {
    const date = format(new Date(), 'yyyy-MM-dd');
    try {
      await axios.post('http://localhost:5000/api/tracker/log', { date, status, notes: '' });
      fetchData(); // Refresh logs
    } catch (err) {
      console.error('Failed to save daily log', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tracker', formData);
      setData(formData);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update tracker', err);
    }
  };

  if (loading) return <div className="text-center py-20 text-emerald-600 font-bold">Nurturing your data...</div>;

  const getDuration = () => {
    if (!data) return null;
    const start = parseISO(data.start_date);
    if (isAfter(start, now)) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return intervalToDuration({ start, end: now });
  };

  const getSavings = () => {
    if (!data) return { money: 0, hours: 0 };
    const start = parseISO(data.start_date);
    const diffDays = Math.max(0, (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return {
      money: diffDays * data.daily_spend,
      hours: diffDays * data.daily_hours
    };
  };

  const duration = getDuration();
  const savings = getSavings();
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayLog = logs.find(l => l.date === todayStr);

  return (
    <div className="space-y-8 py-4 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-1 flex items-center gap-3">
            <Leaf className="text-emerald-500 w-8 h-8" />
            Your Dashboard
          </h1>
          <p className="text-emerald-700 font-medium italic">Your potential, realized.</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-white hover:bg-emerald-50 p-3 rounded-2xl border border-emerald-100 shadow-sm transition-all text-emerald-600 hover:scale-105"
        >
          {isEditing ? <X className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white border-2 border-emerald-100 rounded-3xl p-10 space-y-8 shadow-2xl shadow-emerald-100">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <Sprout className="w-6 h-6 text-emerald-500" />
              Your Baseline
            </h2>
            <p className="text-slate-600">Tell us about your habits so we can calculate your growth.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-emerald-800 uppercase tracking-wider ml-1">
                Last Time Used
                <HelpCircle className="w-4 h-4 text-slate-400" />
              </label>
              <input
                type="datetime-local"
                required
                className="w-full bg-emerald-50/50 border-2 border-emerald-100 rounded-2xl px-5 py-4 text-emerald-900 focus:border-emerald-500 outline-none transition-colors"
                value={formData.start_date.slice(0, 16)}
                onChange={(e) => setFormData({...formData, start_date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-emerald-800 uppercase tracking-wider ml-1">
                Daily Spending ($)
              </label>
              <input
                type="number"
                required
                className="w-full bg-emerald-50/50 border-2 border-emerald-100 rounded-2xl px-5 py-4 text-emerald-900 focus:border-emerald-500 outline-none transition-colors"
                value={formData.daily_spend}
                onChange={(e) => setFormData({...formData, daily_spend: Number(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-emerald-800 uppercase tracking-wider ml-1">
                Hours Per Day Spent
              </label>
              <input
                type="number"
                required
                className="w-full bg-emerald-50/50 border-2 border-emerald-100 rounded-2xl px-5 py-4 text-emerald-900 focus:border-emerald-500 outline-none transition-colors"
                value={formData.daily_hours}
                onChange={(e) => setFormData({...formData, daily_hours: Number(e.target.value)})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-emerald-800 uppercase tracking-wider ml-1">Your Vision Statement</label>
            <textarea
              className="w-full bg-emerald-50/50 border-2 border-emerald-100 rounded-2xl px-5 py-4 text-emerald-900 focus:border-emerald-500 outline-none h-32 transition-colors"
              placeholder="What will you realize now that you are free?"
              value={formData.why_statement}
              onChange={(e) => setFormData({...formData, why_statement: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-emerald-200">
            Save & Start Growing
          </button>
        </form>
      ) : (
        <div className="space-y-8">
          {/* Daily Check-in */}
          <div className="bg-white border-2 border-emerald-100 rounded-3xl p-8 shadow-xl shadow-emerald-100/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black text-slate-800 mb-1">Daily Check-in</h3>
                <p className="text-slate-500 font-medium">How is your journey going today, {format(new Date(), 'MMMM do')}?</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleLogSubmit('clean')}
                  className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-black transition-all ${todayLog?.status === 'clean' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-2 border-emerald-100'}`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  I'm Clean
                </button>
                <button 
                  onClick={() => handleLogSubmit('used')}
                  className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-black transition-all ${todayLog?.status === 'used' ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' : 'bg-rose-50 text-rose-600 hover:bg-rose-100 border-2 border-rose-100'}`}
                >
                  <AlertCircle className="w-5 h-5" />
                  I Used
                </button>
              </div>
            </div>
          </div>

          {/* Main Counter */}
          <div className="bg-white border-2 border-emerald-50 rounded-3xl p-12 text-center shadow-2xl shadow-emerald-100/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
            <Sprout className="w-16 h-16 text-emerald-500 mx-auto mb-8" />
            <h2 className="text-sm font-black text-emerald-600 mb-8 uppercase tracking-[0.3em]">Total Clean Time</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-6xl font-black text-slate-900 tracking-tighter">{duration?.days || 0}</div>
                <div className="text-xs text-emerald-700 uppercase font-black tracking-widest">Days</div>
              </div>
              <div className="space-y-2">
                <div className="text-6xl font-black text-slate-900 tracking-tighter">{duration?.hours || 0}</div>
                <div className="text-xs text-emerald-700 uppercase font-black tracking-widest">Hours</div>
              </div>
              <div className="space-y-2">
                <div className="text-6xl font-black text-slate-900 tracking-tighter">{duration?.minutes || 0}</div>
                <div className="text-xs text-emerald-700 uppercase font-black tracking-widest">Mins</div>
              </div>
              <div className="space-y-2">
                <div className="text-6xl font-black text-slate-900 tracking-tighter">{duration?.seconds || 0}</div>
                <div className="text-xs text-emerald-700 uppercase font-black tracking-widest">Secs</div>
              </div>
            </div>
          </div>

          {/* Consistency Grid */}
          <div className="bg-white border border-emerald-50 rounded-3xl p-10 shadow-xl shadow-emerald-100/30">
            <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              Consistency Grid
            </h3>
            <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-15 gap-2">
              {[...Array(30)].map((_, i) => {
                const date = format(subDays(new Date(), 29 - i), 'yyyy-MM-dd');
                const log = logs.find(l => l.date === date);
                return (
                  <div 
                    key={i} 
                    title={date}
                    className={`aspect-square rounded-md border transition-all ${
                      log?.status === 'clean' ? 'bg-emerald-500 border-emerald-600 shadow-sm shadow-emerald-200' : 
                      log?.status === 'used' ? 'bg-rose-400 border-rose-500' : 
                      'bg-slate-100 border-slate-200'
                    }`}
                  ></div>
                );
              })}
            </div>
            <div className="mt-6 flex items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                 Clean Day
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-rose-400 rounded"></div>
                 Used
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-slate-100 rounded"></div>
                 No Entry
               </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-emerald-50 rounded-3xl p-10 space-y-8 shadow-xl shadow-emerald-100/30">
              <div className="flex items-center gap-4 border-b border-emerald-50 pb-6">
                <Wallet className="w-7 h-7 text-emerald-600" />
                <h3 className="text-2xl font-black text-slate-800">Your Harvest</h3>
              </div>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="bg-emerald-50 p-4 rounded-2xl">
                    <Wallet className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-emerald-700 text-sm font-bold uppercase tracking-wider mb-1">Money Saved</div>
                    <div className="text-4xl font-black text-slate-900">${savings.money.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-emerald-50 p-4 rounded-2xl">
                    <Timer className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-emerald-700 text-sm font-bold uppercase tracking-wider mb-1">Time Gained Back</div>
                    <div className="text-4xl font-black text-slate-900">{savings.hours.toFixed(1)} <span className="text-lg">h</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-10 space-y-6 shadow-xl shadow-emerald-200 relative overflow-hidden group">
              <div className="flex items-center gap-4 border-b border-white/20 pb-6 relative z-10">
                <Quote className="w-7 h-7 text-emerald-200" />
                <h3 className="text-2xl font-black text-white">Your "Why"</h3>
              </div>
              <div className="italic text-emerald-50 text-2xl font-medium leading-relaxed relative z-10 py-4">
                "{data?.why_statement || "What is your vision for a drug-free life?"}"
              </div>
              <Leaf className="absolute -bottom-10 -right-10 w-48 h-48 text-emerald-500/20 -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
