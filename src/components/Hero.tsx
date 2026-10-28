import React, { Suspense, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { motion as motion3d } from 'framer-motion-3d';
import { Typewriter } from 'react-simple-typewriter';
import { Github, Linkedin, Mail, ChevronDown, Sparkles, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Instagram, Twitter, ArrowRight, Terminal } from 'lucide-react';
import { Link, scroller } from 'react-scroll';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, Icosahedron, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import image from '../public/newProfilebg.png';
import ProfileCard from './ProfileCard';

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
        color="#16a34a"
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
        <div className="absolute inset-0 bg-[radial-gradient(#16a34a18_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Scanning Line */}
        <motion.div 
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10"
        />

        <Canvas className="opacity-20 dark:opacity-10">
          <PerspectiveCamera makeDefault position={[0, 0, 25]} {...({} as any)} />
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
        
        {/* Data Rail - Forest Green */}
        <div className="absolute top-1/2 left-3 xl:left-6 -translate-y-1/2 hidden lg:flex flex-col gap-6 items-center z-10 pointer-events-none select-none">
          <div className="w-[1.5px] h-24 bg-gradient-to-b from-transparent via-[#22c55e] to-transparent shadow-[0_0_10px_#22c55e]" />
          <span className="text-[11px] font-mono font-bold text-[#22c55e] [writing-mode:vertical-rl] tracking-[0.55em] uppercase drop-shadow-[0_0_12px_rgba(34,197,94,0.8)]">
            BUILD • DEVELOP • CODE
          </span>
          <div className="w-[1.5px] h-24 bg-gradient-to-b from-transparent via-[#22c55e] to-transparent shadow-[0_0_10px_#22c55e]" />
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
            {/* Tagline matching reference: SAME ROADS / NEW PERSPECTIVES */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] md:text-xs font-mono text-[#94a3b8] tracking-[0.45em] uppercase font-bold">
                SAME PASSION / NEW PERSPECTIVES
              </span>
            </div>
            
            {/* Title matching reference image: BUILT (Red) DIFFERENTLY (Mint White) */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-7 tracking-tight leading-[0.88] select-none">
              <span className="block text-[#dc2626] drop-shadow-[0_0_35px_rgba(220,38,38,0.5)]">
                KSHITIJ
              </span>
              <span className="block text-[#e6f4ea] font-serif tracking-normal md:tracking-tight font-bold">
                RASTOGI<span className="text-[#dc2626]">.</span>
              </span>
            </h1>

            <div className="flex flex-col gap-6 mb-10">
              <div className="text-xl md:text-3xl font-semibold text-[#cbd5e1] leading-relaxed max-w-2xl">
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
                <div className="px-4 py-2 bg-secondary/60 border border-border rounded-xl backdrop-blur-sm">
                  <div className="text-[10px] font-mono text-[#dc2626] uppercase mb-0.5 flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-pulse" />
                    Status
                  </div>
                  <div className="text-xs font-bold text-white">AVAILABLE_FOR_HIRE</div>
                </div>
                <div className="px-4 py-2 bg-secondary/60 border border-border rounded-xl backdrop-blur-sm">
                  <div className="text-[10px] font-mono text-primary uppercase mb-0.5 font-bold">Location</div>
                  <div className="text-xs font-bold text-white">28.6139° N, 77.2090° E</div>
                </div>
              </div>
            </div>
            
            {/* Explore Button matching the reference image */}
            <div className="flex flex-wrap gap-8 items-center">
              <Link to="projects" smooth={true} duration={2000} offset={-70}>
                <motion.button 
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative px-9 py-4 bg-[#14161d] border border-white/20 hover:border-[#dc2626] text-white rounded-full font-bold text-xs uppercase tracking-[0.3em] transition-all flex items-center gap-3 shadow-xl hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    EXPLORE <ArrowRight size={16} className="text-[#dc2626] group-hover:translate-x-1.5 transition-transform" />
                  </span>
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
                    whileHover={{ scale: 1.3, color: '#dc2626', y: -6 }}
                    className="text-foreground/50 transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Content - Interactive Holographic ProfileCard */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[580px] lg:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex justify-center w-full"
            >
              <ProfileCard
                name="Kshitij Rastogi"
                title="Full Stack & AI Developer"
                handle="rastkshitij"
                status="Online"
                statusColor="#16a34a"
                contactText="Contact"
                avatarUrl={image}
                miniAvatarUrl={image}
                holo={1}
                glare={0.25}
                tiltStrength={14}
                parallax={8}
                radius={16}
                enableTilt
                intro
                showUserInfo
                enableMobileTilt={false}
                theme="dark"
                onContactClick={() => {
                  scroller.scrollTo('contact', {
                    smooth: true,
                    duration: 2000,
                    offset: -70
                  });
                }}
              />
            </motion.div>

            {/* Ambient HUD Accent Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-primary/10 rounded-full animate-[spin_80s_linear_infinite] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] border border-dashed border-[#dc2626]/15 rounded-full animate-[spin_60s_linear_infinite_reverse] pointer-events-none" />
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
