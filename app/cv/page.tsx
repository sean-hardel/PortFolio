'use client';

import { portfolioData } from '@/data/portfolio';
import { Mail, MapPin, Github, Linkedin, Globe, ExternalLink, Download } from 'lucide-react';

export default function CV() {
  const { personal, education, experience, projects, stack } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 print:bg-white print:p-0">
      {/* Bouton de téléchargement (Caché à l'impression) */}
      <div className="fixed bottom-8 right-8 print:hidden z-50">
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium shadow-xl transition-all hover:-translate-y-1"
        >
          <Download size={20} />
          Télécharger en PDF
        </button>
      </div>

      {/* Page A4 */}
      <div className="mx-auto bg-white shadow-2xl print:shadow-none w-[210mm] min-h-[297mm] print:w-full print:h-screen overflow-hidden flex flex-col md:flex-row print:flex-row text-slate-800">
        
        {/* Colonne Gauche (Bleu sombre) */}
        <div className="w-full md:w-[35%] print:w-[35%] bg-slate-900 text-white p-8 print:p-6 flex flex-col gap-8 print:!print-color-adjust-exact" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
          
          {/* Photo / Nom */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2 leading-tight">{personal.name}</h1>
            <p className="text-blue-400 font-medium text-lg">{personal.role}</p>
          </div>

          {/* Contact */}
          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-blue-400" />
              <a href={`mailto:${personal.email}`} className="hover:text-white transition-colors">{personal.email}</a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="shrink-0 text-blue-400" />
              <span>{personal.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={16} className="shrink-0 text-blue-400" />
              <a href={personal.social.site} target="_blank" className="hover:text-white transition-colors">sean-hardel.github.io</a>
            </div>
            <div className="flex items-center gap-3">
              <Github size={16} className="shrink-0 text-blue-400" />
              <a href={personal.social.github} target="_blank" className="hover:text-white transition-colors">github.com/sean-hardel</a>
            </div>
            <div className="flex items-center gap-3">
              <Linkedin size={16} className="shrink-0 text-blue-400" />
              <a href={personal.social.linkedin} target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>

          {/* Compétences */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Compétences</h3>
            
            <div className="space-y-4">
              {stack.map(group => (
                <div key={group.label}>
                  <h4 className="text-blue-400 font-medium mb-2 text-sm">{group.label}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-slate-800 text-xs rounded text-slate-300" style={{ backgroundColor: '#1e293b', color: '#cbd5e1' }}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formation */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Formation</h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <h4 className="font-bold text-sm text-white">{edu.degree}</h4>
                  <p className="text-blue-400 text-xs">{edu.school}</p>
                  <p className="text-slate-400 text-xs italic">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Colonne Droite (Blanc) */}
        <div className="w-full md:w-[65%] print:w-[65%] p-8 print:p-6 flex flex-col gap-8">
          
          {/* Profil */}
          <section>
            <h3 className="text-slate-900 font-bold uppercase tracking-wider mb-4 border-b-2 border-blue-600 pb-1 inline-block">Profil</h3>
            <p className="text-slate-600 text-sm leading-relaxed text-justify">
              {personal.bio}
            </p>
          </section>

          {/* Expériences */}
          <section>
            <h3 className="text-slate-900 font-bold uppercase tracking-wider mb-6 border-b-2 border-blue-600 pb-1 inline-block">Expériences</h3>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="relative pl-4 border-l-2 border-slate-200">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-800">{exp.title}</h4>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded print:bg-slate-100" style={{ backgroundColor: '#f1f5f9' }}>{exp.period}</span>
                  </div>
                  <p className="text-blue-600 font-medium text-sm mb-2">{exp.company}</p>
                  <p className="text-slate-600 text-sm mb-2">{exp.summary}</p>
                  <ul className="list-disc list-outside ml-4 text-xs text-slate-500 space-y-1">
                    {exp.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projets */}
          <section>
            <h3 className="text-slate-900 font-bold uppercase tracking-wider mb-6 border-b-2 border-blue-600 pb-1 inline-block">Projets Récents</h3>
            <div className="space-y-5">
              {projects.filter(p => !p.archived).slice(0, 4).map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      {project.title}
                      {project.link && <a href={project.link} target="_blank" className="text-blue-500 hover:text-blue-700 print:hidden"><ExternalLink size={12}/></a>}
                    </h4>
                    <span className="text-[10px] text-slate-400 border border-slate-200 px-1.5 rounded">{project.context}</span>
                  </div>
                  <p className="text-slate-600 text-xs mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.stack.slice(0, 5).map(tech => (
                      <span key={tech} className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded print:bg-blue-50 print:text-blue-600" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
      
      <style jsx global>{`
        @page {
          size: A4;
          margin: 0;
        }
        @media print {
          html, body {
            height: 100%;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden;
          }
          body {
            background: white;
          }
        }
      `}</style>
    </div>
  );
}