import React, { Suspense, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { motion as motion3d } from 'framer-motion-3d';
import { Typewriter } from 'react-simple-typewriter';
import { Github, Linkedin, Mail, ChevronDown, Sparkles, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Instagram, Twitter, ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-scroll';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, Icosahedron, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import image from '../public/profile2.jpeg';

function GradientMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[15, 64, 64]}>
      <MeshDistortMaterial
        color="#10b981"
        speed={1.5}
        distort={0.4}
        radius={1}
        opacity={0.15}
        transparent
      />
    </Sphere>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 50;
      const y = (clientY / innerHeight - 0.5) * 50;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { stiffness: 150, damping: 30, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const y = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // High-precision futuristic transition
  const rotateXRaw = useTransform(scrollYProgress, [0, 0.3], [45, 0]);
  const rotateYRaw = useTransform(scrollYProgress, [0, 0.3], [-35, 0]);
  const rotateZRaw = useTransform(scrollYProgress, [0, 0.3], [15, 0]);
  const cardScaleRaw = useTransform(scrollYProgress, [0, 0.3], [0.65, 1]);
  const cardXRaw = useTransform(scrollYProgress, [0, 0.3], [150, 0]);

  const scrollRotateX = useSpring(rotateXRaw, springConfig);
  const scrollRotateY = useSpring(rotateYRaw, springConfig);
  const scrollRotateZ = useSpring(rotateZRaw, springConfig);
  const cardScale = useSpring(cardScaleRaw, springConfig);
  const cardX = useSpring(cardXRaw, springConfig);

  const finalRotateX = useTransform([scrollRotateX, smoothMouseY], ([s, m]) => (s as number) - (m as number) * 0.4);
  const finalRotateY = useTransform([scrollRotateY, smoothMouseX], ([s, m]) => (s as number) + (m as number) * 0.4);

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-background transition-colors duration-1000">
      {/* Advanced Futuristic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#10b98115_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Scanning Line */}
        <motion.div 
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-10"
        />

        <Canvas className="opacity-20 dark:opacity-10">
          <PerspectiveCamera makeDefault position={[0, 0, 25]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <GradientMesh />
          </Suspense>
        </Canvas>
      </div>

      {/* HUD Overlays */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Corner Accents */}
        <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
        <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl" />
        <div className="absolute bottom-10 left-10 w-24 h-24 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-primary/30 rounded-br-3xl" />
        
        {/* Data Rails */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden xl:flex flex-col gap-12 items-center">
          <div className="w-[1px] h-40 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
          <span className="text-[10px] font-mono text-primary/50 vertical-rl rotate-180 tracking-[0.6em] uppercase">Code
Develop
Build</span>
          <div className="w-[1px] h-40 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Content - Bold & Formal (7 cols) */}
          <motion.div
            style={{ y, opacity }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="px-4 py-1.5 rounded-sm bg-primary/10 border border-primary/30 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                System_Protocol: Active
              </div>
              <div className="h-[1px] w-16 bg-primary/30" />
              <span className="text-[10px] font-mono text-foreground/50 uppercase tracking-[0.4em]">Deploy
Debug
Compile
Execute</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.85] text-foreground">
              KSHITIJ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-teal-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                RASTOGI
              </span>
            </h1>

            <div className="flex flex-col gap-8 mb-12">
              <div className="text-2xl md:text-4xl font-bold text-foreground/90 leading-tight max-w-2xl">
                <Typewriter
                  words={['Architecting high-performance digital systems.', 'Designing immersive futuristic interfaces.', 'Pioneering next-gen web architectures.']}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={50}
                  deleteSpeed={30}
                  delaySpeed={2500}
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-secondary/50 border border-border rounded-lg backdrop-blur-sm">
                  <div className="text-[10px] font-mono text-primary/70 uppercase mb-1">Status</div>
                  <div className="text-xs font-bold">AVAILABLE_FOR_HIRE</div>
                </div>
                <div className="px-4 py-2 bg-secondary/50 border border-border rounded-lg backdrop-blur-sm">
                  <div className="text-[10px] font-mono text-primary/70 uppercase mb-1">Location</div>
                  <div className="text-xs font-bold">28.6139° N, 77.2090° E</div>
                </div>
                <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg backdrop-blur-sm">
                  <div className="text-[10px] font-mono text-primary/70 uppercase mb-1">Movement_Vector</div>
                  <div className="text-xs font-bold font-mono">
                    {window.scrollY < (document.documentElement.scrollHeight - window.innerHeight) * 0.3 ? '(1.0, 0.0, 0.0) IDLE' : 
                     window.scrollY < (document.documentElement.scrollHeight - window.innerHeight) * 0.7 ? '(0.0, 1.0, 0.0) WALK' : 
                     '(0.0, 0.0, 1.0) RUN'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-8 items-center">
              <Link to="projects" smooth={true} duration={1000} offset={-70}>
                <motion.button 
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-14 py-7 bg-foreground text-background rounded-none font-black text-xs uppercase tracking-[0.4em] transition-all overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.1)]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Initiate_Protocol <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                </motion.button>
              </Link>
              
              <div className="flex gap-10">
                {[
                  { icon: <Github size={24} />, href: 'https://github.com' },
                  { icon: <Linkedin size={24} />, href: 'https://linkedin.com' },
                  { icon: <Mail size={24} />, href: 'mailto:rastkshitij@gmail.com' }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3, color: 'var(--primary)', y: -8 }}
                    className="text-foreground/40 transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Content - Precision Card Positioning (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-center perspective-3000 min-h-[600px] lg:px-12">
            <motion.div
              style={{ 
                rotateX: finalRotateX, 
                rotateY: finalRotateY, 
                rotateZ: scrollRotateZ, 
                scale: cardScale,
                x: cardX
              }}
              initial={{ opacity: 0, scale: 0.4, rotateY: -70, x: 300 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              {/* The Formal Futuristic Card */}
              <div className="w-[340px] bg-card/70 backdrop-blur-3xl rounded-none border-t-2 border-l-2 border-primary/50 shadow-[30px_30px_80px_rgba(0,0,0,0.4)] dark:shadow-[30px_30px_80px_rgba(0,0,0,0.7)] overflow-hidden transform-gpu group">
                {/* Header */}
                <div className="p-7 flex items-center justify-between bg-primary/10 border-b border-primary/20">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-primary uppercase tracking-[0.4em] mb-1">Identity_Verified</span>
                    <h3 className="text-sm font-black text-foreground tracking-tighter">KSHITIJ_RASTOGI.SYS</h3>
                  </div>
                  <div className="w-10 h-10 rounded-sm bg-primary/20 flex items-center justify-center">
                    <Sparkles size={20} className="text-primary animate-pulse" />
                  </div>
                </div>

                {/* Image Area */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src={image} 
                    alt="Profile" 
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                  {/* Scanline Effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%),linear-gradient(90deg,rgba(255,0,0,0.08),rgba(0,255,0,0.04),rgba(0,0,255,0.08))] bg-[size:100%_3px,4px_100%] pointer-events-none opacity-30" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_#10b981]" />
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">System_Online</span>
                    </div>
                    <p className="text-white/70 text-xs font-mono leading-relaxed">Status: Architecting_Next_Gen_Interfaces</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-8 space-y-8 bg-primary/5">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-foreground/5 border border-foreground/10 backdrop-blur-sm">
                      <p className="text-[9px] font-mono text-foreground/50 uppercase mb-2 tracking-widest">Projects</p>
                      <p className="text-2xl font-black text-primary">5+</p>
                    </div>
                    <div className="p-4 bg-foreground/5 border border-foreground/10 backdrop-blur-sm">
                      <p className="text-[9px] font-mono text-foreground/50 uppercase mb-2 tracking-widest">Experience</p>
                      <p className="text-2xl font-black text-primary">2Y+</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-foreground/10">
                    <Link to="contact" smooth={true} duration={1000} offset={-70}>
                      <button className="text-[11px] font-black uppercase tracking-[0.4em] text-primary hover:text-foreground transition-all flex items-center gap-2">
                        Connect_Terminal <ArrowRight size={14} />
                      </button>
                    </Link>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-primary/20 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative HUD Elements around card */}
              <div className="absolute -top-12 -right-12 w-40 h-40 border-t-2 border-r-2 border-primary/40 pointer-events-none rounded-tr-3xl" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 border-b-2 border-l-2 border-primary/40 pointer-events-none rounded-bl-3xl" />
              <div className="absolute top-1/2 -right-20 -translate-y-1/2 flex flex-col gap-3">
                <div className="w-1.5 h-1.5 bg-primary shadow-[0_0_10px_#10b981]" />
                <div className="w-1.5 h-1.5 bg-primary/50" />
                <div className="w-1.5 h-1.5 bg-primary/20" />
              </div>
            </motion.div>

            {/* Background HUD Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-primary/5 rounded-full animate-[spin_80s_linear_infinite] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-dashed border-primary/10 rounded-full animate-[spin_50s_linear_infinite_reverse] pointer-events-none" />
          </div>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-foreground"
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
}
