'use client';

import Section from './Section';
import { portfolioData } from '@/data/portfolio';
import { ExternalLink, Github, Folder } from 'lucide-react';
import Image from 'next/image';

export default function Projects() {
  return (
    <Section id="projects" title="Projets" lead="Réalisations académiques et personnelles" className="bg-slate-900">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioData.projects.map((project, index) => (
          <div key={index} className="group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col h-full">
            <div className="relative h-48 overflow-hidden bg-slate-900 flex items-center justify-center">
              {project.image ? (
                <div className="relative w-full h-full">
                    {/* Using a standard img tag for external/local assets initially to avoid Next/Image config issues if domains vary, 
                        but here we use Next/Image for optimization if it's local. 
                        Since we just moved assets, we assume they are in public/assets */}
                    <Image 
                        src={`${process.env.BASE_PATH || ''}${project.image}`}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        {project.link && (
                            <a href={project.link} target="_blank" className="p-2 bg-white text-slate-900 rounded-full hover:bg-blue-50 transition-colors" title="Voir le site">
                                <ExternalLink size={20} />
                            </a>
                        )}
                        {project.repo && (
                            <a href={project.repo} target="_blank" className="p-2 bg-slate-900 text-white border border-slate-700 rounded-full hover:bg-slate-800 transition-colors" title="Code Source">
                                <Github size={20} />
                            </a>
                        )}
                    </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 group-hover:bg-slate-750 transition-colors">
                    <span className="text-6xl"><Folder size={64} className="text-slate-600" /></span>
                    <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        {project.repo && (
                            <a href={project.repo} target="_blank" className="p-2 bg-slate-900 text-white border border-slate-700 rounded-full hover:bg-slate-800 transition-colors">
                                <Github size={20} />
                            </a>
                        )}
                    </div>
                </div>
              )}
              <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-white border border-slate-700">
                {project.context}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-grow">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
