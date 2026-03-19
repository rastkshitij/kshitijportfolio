import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';

const education = [
  {
    degree: 'B.Tech – Information Technology with Honors in Cybersecurity',
    institution: 'Rajkiya Engineering College Banda',
    university: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
    period: '2023 - Present',
    details: 'Currently in Pre-final Year with a CGPA of 8.04/10',
    icon: <GraduationCap />
  },
  {
    degree: '12th Grade',
    institution: 'Takshashila Public School',
    period: '2021 - 2022',
    details: 'Score: 93% with Science Stream (PCM)',
    icon: <Calendar />
  },
  {
    degree: '10th Grade',
    institution: 'Takshashila Public School',
    period: '2019 - 2020',
    details: 'Score: 87%',
    icon: <Calendar />
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-foreground tracking-tighter">Educational Journey</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="glass p-8 rounded-[3rem] border border-border hover:border-primary/40 transition-all duration-500 flex flex-col h-full group bg-card/80 shadow-xl"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg">
                {item.icon}
              </div>
              
              <div className="flex-grow">
                <span className="text-xs font-black text-primary mb-4 block uppercase tracking-widest">{item.period}</span>
                <h3 className="text-2xl font-black mb-4 leading-tight text-foreground">{item.degree}</h3>
                <p className="text-foreground font-bold mb-2 opacity-80">{item.institution}</p>
                {item.university && <p className="text-xs text-muted-foreground mb-6 italic">{item.university}</p>}
              </div>

              <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
                <span className="text-sm font-black text-primary">{item.details}</span>
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
