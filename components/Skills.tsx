'use client';

import Section from './Section';
import { portfolioData } from '@/data/portfolio';

export default function Skills() {
  // Helper to get color based on category
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'frontend': return 'from-blue-500 to-cyan-500';
      case 'backend': return 'from-emerald-500 to-green-500';
      case 'database': return 'from-orange-500 to-amber-500';
      case 'tools': return 'from-purple-500 to-pink-500';
      default: return 'from-slate-500 to-slate-400';
    }
  };

  const categories = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'database', label: 'Base de données' },
    { key: 'tools', label: 'Outils & DevOps' },
  ];

  return (
    <Section id="skills" title="Compétences" className="bg-slate-950">
      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <div key={cat.key} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className={`w-2 h-8 rounded-full bg-gradient-to-b ${getCategoryColor(cat.key)}`}></span>
              {cat.label}
            </h3>
            <div className="flex flex-wrap gap-3">
              {portfolioData.skills[cat.key as keyof typeof portfolioData.skills]?.map((skill: string) => (
                <div key={skill} className="group relative">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${getCategoryColor(cat.key)} rounded-lg opacity-20 group-hover:opacity-75 blur transition duration-200`}></div>
                  <span className="relative block px-4 py-2 bg-slate-900 rounded-lg text-slate-300 font-medium text-sm group-hover:text-white transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
