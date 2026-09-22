'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
          <div className="bg-blue-600 px-2 text-sm rounded rotate-12 absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2">
            Page non trouvée
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-300 mb-4">
              Oups ! Vous semblez vous être égaré.
            </h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              La page que vous recherchez n’existe pas ou a été déplacée. 
              Pas d’inquiétude, le chemin du retour est juste ici.
            </p>
            
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all group"
            >
              <Home size={18} />
              Retourner à l’accueil
            </Link>
          </div>
        </motion.div>
        
        {/* Background decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      </div>
    </div>
  );
}
