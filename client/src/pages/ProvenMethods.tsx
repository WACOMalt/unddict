import React from 'react';
import { Brain, Users, Zap, Heart, BookOpen, ExternalLink, Sprout } from 'lucide-react';

const ProvenMethods: React.FC = () => {
  const methods = [
    {
      title: "Mindset Shift (CBT)",
      icon: <Brain className="w-7 h-7 text-emerald-600" />,
      description: "Identifies and corrects problematic behaviors by applying various skills to stop drug use and address co-occurring problems.",
      tips: ["Identify your triggers", "Develop coping strategies", "Practice refusal skills"]
    },
    {
      title: "Find Your Spark (MET)",
      icon: <Zap className="w-7 h-7 text-yellow-600" />,
      description: "A counseling approach that helps resolve ambivalence about stopping drug use and engages internal motivation for change.",
      tips: ["Connect with your values", "Visualize a drug-free future", "Build a plan for change"]
    },
    {
      title: "Growing Together",
      icon: <Users className="w-7 h-7 text-blue-600" />,
      description: "Programs like Marijuana Anonymous (MA) or SMART Recovery provide peer support and proven frameworks for recovery.",
      tips: ["Attend a local or online meeting", "Find a sponsor or accountability partner", "Share your journey"]
    },
    {
      title: "Flourish with Health",
      icon: <Heart className="w-7 h-7 text-rose-600" />,
      description: "Replace the dopamine hit from marijuana with healthy alternatives that regulate mood and improve sleep.",
      tips: ["High-intensity exercise", "New hobbies or creative outlets", "Mindfulness and meditation"]
    }
  ];

  return (
    <div className="space-y-16 py-12">
      <div className="text-center space-y-4">
        <div className="bg-white p-3 rounded-2xl inline-block shadow-sm mb-4 border border-emerald-50">
          <Sprout className="w-10 h-10 text-emerald-500" />
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Recovery Methods</h1>
        <p className="text-xl text-emerald-700 font-medium max-w-2xl mx-auto leading-relaxed">
          Evidence-based strategies to help you realize your potential. 
          Growth is a journey of small, intentional steps.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {methods.map((method, index) => (
          <div key={index} className="bg-white border border-emerald-50 rounded-3xl p-10 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all group">
            <div className="flex items-center gap-5 mb-6">
              <div className="bg-emerald-50 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                {method.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-800">{method.title}</h3>
            </div>
            <p className="text-slate-600 mb-8 leading-relaxed font-medium">
              {method.description}
            </p>
            <div className="space-y-4">
              <h4 className="text-xs font-black text-emerald-800 uppercase tracking-[0.2em] ml-1">Key Practices</h4>
              <ul className="grid gap-3">
                {method.tips.map((tip, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-12 text-center space-y-8 shadow-2xl shadow-emerald-200 relative overflow-hidden">
        <BookOpen className="w-12 h-12 text-emerald-200 mx-auto relative z-10" />
        <div className="space-y-4 relative z-10">
          <h2 className="text-3xl font-black text-white">Need a Hand?</h2>
          <p className="text-emerald-50 text-xl font-medium max-w-xl mx-auto leading-relaxed">
            You don't have to grow alone. Reach out to these communities 
            of people who have walked this path before.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-5 relative z-10">
          <a 
            href="https://www.marijuana-anonymous.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-emerald-900/20 hover:-translate-y-1"
          >
            Marijuana Anonymous <ExternalLink className="w-5 h-5" />
          </a>
          <a 
            href="https://www.smartrecovery.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-emerald-800/30 text-white hover:bg-emerald-800/40 border border-white/20 px-8 py-4 rounded-2xl font-black transition-all hover:-translate-y-1"
          >
            SMART Recovery <ExternalLink className="w-5 h-5" />
          </a>
        </div>
        <div className="absolute top-0 right-0 p-10 opacity-10">
           <Heart className="w-64 h-64 text-white -rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default ProvenMethods;
