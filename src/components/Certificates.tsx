import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import hack2  from '../public/hackfest2.0.png'
import hack1  from '../public/gdgnewdelhi.jpg'
import  hackspace  from '../public/hackspace.png'
import collegehack from '../public/collagehackfest.jpg'
const certificates = [
  {
    title: 'Top 14th in 24hr Hackathon by GDG CLOUD DELHI- Hackfest',
  issuer: 'GDG CLOUD NEW DELHI',
    image: hack1,
  },
  {
    title: 'Top 10th in24hr Hackathon by GDG CLOUD DELHI- Hackfest 2.0',
    issuer: 'GDG CLOUD NEW DELHI',
    image: hack2,
  },
  {
    title: 'Participated in Hackathon by GDG CLOUD Noida - HACKSPACE',
    issuer: 'GDG CLOUD NOIDA',
    image: hackspace,
  },
  {
    title: 'Student Coordinator of College Level Hackathon - HACKFEST 2.0',
    issuer: 'College',
    image: collegehack,
  }
];

export default function Certificates() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % certificates.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + certificates.length) % certificates.length);

  return (
    <section id="certificates" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-foreground tracking-tighter">Hackathons & Certificates</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="overflow-hidden rounded-[3rem] glass border border-border bg-card/80 shadow-2xl"
          >
            <motion.div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {certificates.map((cert, i) => (
                <div key={i} className="min-w-full p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="w-full md:w-1/2 aspect-video rounded-[2rem] overflow-hidden border border-border shadow-xl"
                  >
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="w-full md:w-1/2 text-center md:text-left"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 mx-auto md:mx-0 shadow-lg">
                      <Award size={32} />
                    </div>
                    <h3 className="text-3xl font-black mb-4 text-foreground leading-tight">{cert.title}</h3>
                    <p className="text-foreground mb-8 font-bold text-lg opacity-80">{cert.issuer}</p>
                    <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full text-sm font-black hover:bg-primary/80 transition-all flex items-center gap-3 mx-auto md:mx-0 shadow-xl shadow-primary/30 uppercase tracking-widest">
                      View Certificate <ExternalLink size={16} />
                    </button>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Controls */}
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-8 w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all z-10 shadow-2xl border border-border"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-8 w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all z-10 shadow-2xl border border-border"
          >
            <ChevronRight size={32} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {certificates.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-12 bg-primary' : 'w-2 bg-muted'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
