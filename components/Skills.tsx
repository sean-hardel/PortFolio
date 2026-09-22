'use client';

import Section from './Section';
import { portfolioData } from '@/data/portfolio';

export default function Skills() {
  return (
    <Section id="skills" title="Compétences" className="bg-slate-950">
      <div className="grid md:grid-cols-2 gap-8">
        {portfolioData.stack.map((cat) => (
          <div key={cat.label} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className={`w-2 h-8 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500`}></span>
              {cat.label}
            </h3>
            <div className="flex flex-wrap gap-3">
              {cat.items.map((skill) => (
                <div key={skill} className="group relative">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-20 group-hover:opacity-75 blur transition duration-200`}></div>
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
