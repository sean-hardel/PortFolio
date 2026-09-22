'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm">Portfolio 2026</span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mt-4 mb-6 leading-tight">
              Bonjour, je suis <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                {portfolioData.personal.name}
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-slate-400 mb-6">
              {portfolioData.personal.role}
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-lg">
              {portfolioData.personal.bio}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="group px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
              >
                Me contacter
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link 
                href={portfolioData.personal.social.cv}
                className="px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <Download size={18} />
                Mon CV
              </Link>
            </div>

            <div className="mt-12 flex gap-6 text-slate-400">
              <a href={portfolioData.personal.social.github} target="_blank" className="hover:text-white transition-colors">
                <Github size={24} />
              </a>
              <a href={portfolioData.personal.social.linkedin} target="_blank" className="hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
              <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-white transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Visual Content (Code Window) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl blur opacity-30 animate-pulse" />
          <div className="relative bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-800">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-slate-500 font-mono">developer.ts</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed text-slate-300">
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">1</span>
                <span><span className="text-purple-400">class</span> <span className="text-yellow-300">FullStackDeveloper</span> <span className="text-slate-500">{`{`}</span></span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">2</span>
                <span className="pl-4"><span className="text-purple-400">constructor</span>() <span className="text-slate-500">{`{`}</span></span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">3</span>
                <span className="pl-8"><span className="text-blue-400">this</span>.name = <span className="text-green-400">&quot;{portfolioData.personal.name}&quot;</span>;</span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">4</span>
                <span className="pl-8"><span className="text-blue-400">this</span>.role = <span className="text-green-400">&quot;{portfolioData.personal.role}&quot;</span>;</span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">5</span>
                <span className="pl-8"><span className="text-blue-400">this</span>.stack = [<span className="text-green-400">&quot;Next.js&quot;</span>, <span className="text-green-400">&quot;React&quot;</span>, <span className="text-green-400">&quot;Symfony&quot;</span>];</span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">6</span>
                <span className="pl-8"><span className="text-blue-400">this</span>.status = <span className="text-green-400">&quot;Open for Internship&quot;</span>;</span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">7</span>
                <span className="pl-4"><span className="text-slate-500">{`}`}</span></span>
              </div>
              <div className="flex">
                <span className="text-slate-600 mr-4 select-none">8</span>
                <span><span className="text-slate-500">{`}`}</span></span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
