import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Palette, User, Target, Rocket, Database } from 'lucide-react';
import { data } from 'framer-motion/client';
import { version } from 'os';

const skills = {
  programming: ['JavaScript', 'Python', 'C'],
  web: [ 'JavaScript', 'React', 'Node.js', 'Express.js' , 'threejs' ,'Socket.io' ,'nodemailer' , 'Tailwind CSS' ],
  other: [ 'Graphic Design', 'Photo Editing', 'SVG Design'],
 database : [ 'MongoDB', 'Redis' , 'Firebase' ] ,
 versioncontrol : [ 'Git', 'GitHub' , 'Gen AI' , 'MediaPipe' ]
};

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-foreground tracking-tighter">About Me</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        {/* Part 1: Who I am & My Journey */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="glass p-10 rounded-[3rem] border border-border bg-card/50 backdrop-blur-xl shadow-2xl">
              <h3 className="text-3xl font-black mb-6 text-foreground tracking-tight flex items-center gap-3">
                <User className="text-primary" size={32} /> Who I am
              </h3>
              <p className="text-lg text-foreground leading-relaxed font-medium">
              I’m <span className="font-black text-primary">Kshitij Rastogi</span>, an IT undergraduate at Rajkiya Engineering College, Banda (AKTU), focused on software development, web technologies, and Artificial Intelligence. I enjoy building intelligent, responsive, and user-centric digital solutions.ng interactive digital experiences. 
              </p>
            </div>

            <div className="glass p-10 rounded-[3rem] border border-border bg-card/50 backdrop-blur-xl shadow-2xl">
              <h3 className="text-3xl font-black mb-6 text-foreground tracking-tight flex items-center gap-3">
                <Target className="text-primary" size={32} /> My Mission
              </h3>
              <p className="text-lg text-foreground leading-relaxed font-medium">
             I aim to turn ideas into impactful solutions by applying my technical skills to real-world challenges. Constantly learning and adapting, I strive to stay at the cutting edge of technology.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass p-10 rounded-[3rem] border border-border bg-card/50 backdrop-blur-xl shadow-2xl h-full"
          >
            <h3 className="text-3xl font-black mb-8 text-foreground tracking-tight flex items-center gap-3">
              <Rocket className="text-primary" size={32} /> My Journey
            </h3>
            <div className="space-y-8">
              {[
                { year: '2023 - Present', title: 'B.Tech IT  with Honors in Cyber Security', desc: 'Rajkiya Engineering College Banda' },
                { year: '2022', title: '12th Grade', desc: 'Takshashila Public School (93%)' },
                { year: '2020', title: '10th Grade', desc: 'Takshashila Public School (87%)' }
              ].map((item, i) => (
                <div key={i} className="relative pl-8 border-l-2 border-primary/30">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                  <span className="text-xs font-black text-primary uppercase tracking-widest mb-1 block">{item.year}</span>
                  <h4 className="text-xl font-black text-foreground mb-1">{item.title}</h4>
                  <p className="text-foreground/70 font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Part 2: Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-5xl font-black mb-4 text-foreground tracking-tighter">My Skillset</h3>
          <div className="w-16 h-1.5 bg-primary mx-auto rounded-full mb-12" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Programming', icon: <Code />, items: skills.programming },
              { title: 'Web Development', icon: <Server />, items: skills.web },
               { title: ' Database', icon: <Database />, items: skills.database },
              { title: 'Version Control AND AI', icon: <Code/>, items: skills.versioncontrol },
               { title: 'Other Skills', icon: <Palette />, items: skills.other }
            ].map((skillGroup, idx) => (
              <motion.div 
                key={skillGroup.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-[2.5rem] border border-border bg-card/30 hover:border-primary/50 transition-all group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  {skillGroup.icon}
                </div>
                <h4 className="text-xl font-black mb-6 text-foreground uppercase tracking-wider">
                  {skillGroup.title}
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skillGroup.items.map((skill) => (
                    <span 
                      key={skill}
                      className="px-4 py-2 bg-background rounded-xl text-xs font-black text-foreground border border-border shadow-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
