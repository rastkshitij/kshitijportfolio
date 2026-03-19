import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Download, FileText } from 'lucide-react';

export default function Resume() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const resumeUrl = "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000&auto=format&fit=crop";

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Kshitij_Rastogi_Resume.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="py-24 bg-muted relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-foreground tracking-tighter">My Resume</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-[3rem] border border-border shadow-2xl bg-card/50 backdrop-blur-xl flex flex-col md:flex-row gap-12 items-center"
          >
            <div 
              onClick={() => setIsResumeOpen(true)}
              className="relative group cursor-pointer bg-muted rounded-3xl overflow-hidden border border-border aspect-[3/4] w-full md:w-1/2 shadow-2xl"
            >
              <img 
                src={resumeUrl} 
                alt="Resume Thumbnail" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-card text-primary p-6 rounded-full shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Maximize2 size={32} />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-foreground flex items-center gap-3">
                  <FileText className="text-primary" size={32} /> Professional Summary
                </h3>
                <p className="text-lg text-foreground/80 leading-relaxed font-medium">
               My resume reflects my journey as a developer, combining strong technical skills, academic achievements, and hands-on experience, with a focus on building impactful and high-quality projects.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => setIsResumeOpen(true)}
                  className="w-full px-8 py-5 bg-primary text-primary-foreground rounded-2xl font-black hover:bg-primary/80 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 text-lg"
                >
                  <Maximize2 size={20} /> View Full Resume
                </button>
                <button 
                  onClick={handleDownload}
                  className="w-full px-8 py-5 border-2 border-primary text-primary rounded-2xl font-black hover:bg-primary/10 transition-all flex items-center justify-center gap-3 text-lg"
                >
                  <Download size={20} /> Download Resume
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Resume Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
          >
            <motion.button
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              onClick={() => setIsResumeOpen(false)}
              className="absolute top-8 right-8 p-5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-[110] border border-white/20"
            >
              <X size={32} />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 100 }}
              className="relative max-w-5xl w-full h-full bg-white rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            >
              <img 
                src={resumeUrl} 
                alt="Full Resume" 
                className="w-full h-full object-contain bg-slate-100"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
