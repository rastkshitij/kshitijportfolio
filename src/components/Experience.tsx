import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, CheckCircle2, Maximize2, X, Download } from 'lucide-react';
import image from '../public/offerletter.jpeg'
export default function Experience() {
  const [isOfferLetterOpen, setIsOfferLetterOpen] = useState(false);
  const offerLetterUrl = image;

  return (
    <section id="experience" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-foreground tracking-tighter">Internship Experience</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-primary to-emerald-400 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-2 glass p-8 md:p-12 rounded-[3rem] border border-border relative overflow-hidden bg-card/80 shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 text-primary">
              <Briefcase size={200} />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 relative z-10">
              <div>
                <h3 className="text-3xl font-black text-primary mb-2">Virtual Lab Developer</h3>
                <p className="text-xl font-bold text-foreground">IIT Kanpur</p>
              </div>
              <span className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-lg shadow-primary/30">
                Internship
              </span>
            </div>

            <div className="space-y-6 relative z-10">
              <h4 className="text-lg font-bold mb-6 text-foreground uppercase tracking-widest">Responsibilities:</h4>
              {[
                `Worked as a Student Research Associate at IIT Kanpur for 2 months from January 2026 to March 2026.`
                ,
                "Developed virtual lab experiments for engineering education.",
                "Worked on developing interactive simulations.",
                "Collaborated using Git and GitHub workflows."
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-foreground font-medium leading-relaxed opacity-80">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Offer Letter Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass p-8 rounded-[3rem] border border-border bg-card/50 backdrop-blur-xl flex flex-col"
          >
            <h4 className="text-xl font-black mb-6 flex items-center gap-2 text-foreground uppercase tracking-widest">
              <Briefcase className="text-primary" /> Offer Letter
            </h4>
            
            <div 
              onClick={() => setIsOfferLetterOpen(true)}
              className="relative group cursor-pointer bg-muted rounded-2xl mb-6 overflow-hidden border border-border aspect-[3/4] flex-1"
            >
              <img 
                src={offerLetterUrl} 
                alt="Offer Letter Thumbnail" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-card text-primary p-4 rounded-full shadow-xl">
                  <Maximize2 size={24} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setIsOfferLetterOpen(true)}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-black hover:bg-primary/80 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
              >
                <Maximize2 size={18} /> Full Preview
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Offer Letter Modal */}
      <AnimatePresence>
        {isOfferLetterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setIsOfferLetterOpen(false)}
              className="absolute top-6 right-6 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[110]"
            >
              <X size={32} />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative max-w-4xl w-full h-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={offerLetterUrl} 
                alt="Full Offer Letter" 
                className="w-full h-full object-contain bg-slate-100"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
