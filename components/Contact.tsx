'use client';

import Section from './Section';
import { portfolioData } from '@/data/portfolio';
import { Mail, MapPin, Github, Linkedin, CheckCircle } from 'lucide-react';

export default function Contact() {
  return (
    <Section id="contact" title="Contact" className="bg-slate-900 pb-32">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 border border-slate-700 shadow-2xl relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Parlons de votre projet</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Je suis actuellement à la recherche d’un <strong className="text-white">stage de 3 mois minimum</strong> (Avril - Août 2026).
              N’hésitez pas à me contacter si mon profil vous intéresse !
            </p>

            <div className="space-y-6">
              <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center gap-4 text-slate-300 hover:text-blue-400 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="font-medium">{portfolioData.personal.email}</p>
                </div>
              </a>
              

              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Localisation</p>
                  <p className="font-medium">{portfolioData.personal.location}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <a href={portfolioData.personal.social.github} target="_blank" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                <Github size={18} /> GitHub
              </a>
              <a href={portfolioData.personal.social.linkedin} target="_blank" className="px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </div>

          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
             <div className="h-full flex flex-col justify-center items-center text-center p-8">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={32} className="text-emerald-500" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Disponible</h4>
                <p className="text-slate-400 mb-6">{portfolioData.status.label}</p>
                <p className="text-sm text-slate-500 max-w-xs">
                    Je suis mobile sur La Rochelle et ses environs, et ouvert au télétravail.
                </p>
             </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
