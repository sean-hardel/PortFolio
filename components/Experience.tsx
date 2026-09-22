'use client';

import Section from './Section';
import { portfolioData } from '@/data/portfolio';
import { Briefcase, Calendar, GraduationCap } from 'lucide-react';

export default function Experience() {
  return (
    <div className="bg-slate-900">
        <Section id="education" title="Formation" className="bg-slate-900">
        <div className="grid md:grid-cols-3 gap-6">
            {portfolioData.education.map((edu, index) => (
            <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                    <GraduationCap size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-white">{edu.degree}</h3>
                    <p className="text-sm text-slate-400">{edu.school}</p>
                </div>
                </div>
                <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                <Calendar size={12} /> {edu.year}
                </p>
                <p className="text-slate-300 text-sm">{edu.description}</p>
            </div>
            ))}
        </div>
        </Section>

        <Section id="experience" title="Expériences" className="bg-slate-950">
        <div className="space-y-12">
            {portfolioData.experience.map((job, index) => (
            <div key={index} className="relative pl-8 md:pl-0">
                <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2"></div>
                
                <div className={`md:flex items-start justify-between gap-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 mb-8 md:mb-0">
                   <div className={`flex items-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl w-full hover:border-emerald-500/50 transition-all shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{job.title}</h3>
                                <p className="text-emerald-400 font-medium">{job.company}</p>
                            </div>
                            <span className="text-xs font-mono bg-slate-700 text-slate-300 px-2 py-1 rounded">{job.period}</span>
                        </div>
                        <p className="text-slate-400 text-sm mb-4 italic">{job.summary}</p>
                        <ul className="space-y-2 mb-4">
                            {job.tasks.map((task, i) => (
                                <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                                    {task}
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                            {job.stack.map((tech) => (
                                <span key={tech} className="text-xs px-2 py-1 rounded bg-slate-700/50 text-slate-300 border border-slate-600">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                   </div>
                </div>
                
                <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-slate-900 border-4 border-emerald-500 -translate-x-1/3 md:-translate-x-1/2 flex items-center justify-center z-10">
                    <Briefcase size={14} className="text-emerald-500" />
                </div>

                <div className="hidden md:block md:w-1/2" />
                </div>
            </div>
            ))}
        </div>
        </Section>
    </div>
  );
}
