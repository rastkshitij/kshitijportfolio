import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Maximize2, X } from 'lucide-react';
import pulsetalk from "../public/pulsetalk.png"
import jhoom from "../public/jhoom.png"
import vlab from "../public/vlab.png"
const projects = [
  {
    id: 1,
    title: 'PulseTalk',
    description: 'An Health Care Aisstant that detects the disease  by image , chat , books appointment with doctor and has a voice asistant with multiple language support for the user to get help with his disease ',
    features: ['Chat and Voice Asistant', 'Google Authentication', 'Appointment Booking', 'Disease Detection throgh Image' , 'Admin Panel'],
    image: pulsetalk,
    github: 'https://github.com/rastkshitij/Pulsetalk.git',
    live: 'https://pulsetalk.vercel.app/'
  },
  {
    id: 2,
    title: 'Virtual Lab Simulation',
    description: 'Designed and developed a virtual lab simulation for engineering students. Hosted On Virtual labs IIT Kanpur offical website.',
    features: ['Interactive Simulations', 'SVG', 'Hosted On Offical Portal Of Virtual Labs'],
    image: vlab,
    github: 'https://github.com/rastkshitij/experimentNo2-Estimating-Wear-Rate.git',
    live: 'https://virtual-labs.github.io/exp-polymer-articulating-pair-iitk/index.html'
  } ,
  {
    id: 3,
    title: 'Jhoom Motion Tracking Music Player',
    description: 'A music player that uses motion tracking to create an interactive and immersive music experience.',
    features: ['Motion Tracking', 'Music Player', 'Interactive UI', 'Responsive Design'],
    image: jhoom,
    github: 'https://github.com',
    live: 'https://jhoom-music-motion.netlify.app/'
  },

  
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-foreground tracking-tighter">Featured Projects</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8, type: "spring" }}
              whileHover={{ y: -15 }}
              className="glass rounded-[3rem] overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 group bg-card/80 shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500 flex items-center justify-center gap-4">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="p-4 bg-background/40 backdrop-blur-md rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-border"
                  >
                    <Maximize2 size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-black mb-3 text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-foreground text-sm mb-6 font-medium line-clamp-3 leading-relaxed opacity-80">
                  {project.description}
                </p>
                 <p className="text-foreground text-sm mb-6 font-medium line-clamp-3 leading-relaxed opacity-80">
                  {project.features.join(' • ')}
                </p>
                <div className="flex gap-6">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-black text-primary hover:underline uppercase tracking-widest">
                    <Github size={18} /> Code
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-black text-primary hover:underline uppercase tracking-widest">
                    <ExternalLink size={18} /> Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass max-w-4xl w-full rounded-3xl overflow-hidden border border-border bg-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-full">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 relative">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors text-foreground"
                  >
                    <X size={20} />
                  </button>
                  <h3 className="text-3xl font-black mb-4 text-foreground">{selectedProject.title}</h3>
                  <p className="text-foreground/80 mb-6 font-medium">
                    {selectedProject.description}
                  </p>
                  <div className="mb-8">
                    <h4 className="font-black mb-3 text-foreground uppercase tracking-widest text-sm">Key Features:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {selectedProject.features.map((feature: string) => (
                        <li key={feature} className="text-sm text-foreground/70 flex items-center gap-2 font-medium">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-4">
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-primary text-primary-foreground rounded-xl font-black text-center hover:bg-primary/80 transition-all shadow-lg shadow-primary/20">
                      View Code
                    </a>
                    <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 border-2 border-primary text-primary rounded-xl font-black text-center hover:bg-primary/10 transition-all">
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
