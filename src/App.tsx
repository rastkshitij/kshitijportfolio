import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useVelocity, useTransform, useMotionValueEvent } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import ThreeBackground from './components/ThreeBackground';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [movementMode, setMovementMode] = useState<'idle' | 'walk' | 'run'>('idle');
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [autoScrollType, setAutoScrollType] = useState<'walk' | 'run'>('walk');

  const { scrollYProgress, scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest * 100);
    
    // Stop at the very ends
    if (latest <= 0.001 || latest >= 0.999) {
      setMovementMode('idle');
    }
  });

  useMotionValueEvent(scrollVelocity, "change", (latest) => {
    const absVelocity = Math.abs(latest);
    const progress = scrollYProgress.get();
    
    if (progress <= 0.001 || progress >= 0.999) {
      setMovementMode('idle');
      return;
    }

    if (isAutoScrolling) {
      setMovementMode(autoScrollType);
    } else if (absVelocity > 10) {
      setMovementMode('walk');
    } else {
      // If we were moving but stopped manually in the middle, stay walking as per previous request
      // but the user now says "it should stays walking even if fast scrolling is made"
      // and "it should run only if any top link is clicked"
      setMovementMode('walk');
    }
  });

  const handleNavScrollStart = (type: 'walk' | 'run') => {
    setIsAutoScrolling(true);
    setAutoScrollType(type);
  };

  const handleNavScrollEnd = () => {
    setIsAutoScrolling(false);
  };

  useEffect(() => {
    // Force dark theme
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');

    // Loading screen simulation
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-primary/30 bg-background text-foreground">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-4"
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-foreground font-mono tracking-widest"
            >
              LOADING...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <ThreeBackground mode={movementMode} />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
        <motion.div 
          className="h-full bg-primary"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navbar onScrollStart={handleNavScrollStart} onScrollEnd={handleNavScrollEnd} />
      
      <main>
        <Hero />
        <About />
        <Resume />
        <Experience />
        <Certificates />
        <Projects />
        <Education />
        <Contact />
      </main>

      <footer className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-black text-foreground mb-2">Kshitij Rastogi</h2>
            <p className="text-primary font-bold uppercase tracking-widest text-xs">Full Stack Developer</p>
          </motion.div>
          <p className="text-muted-foreground text-sm font-medium">
            © {new Date().getFullYear()} Kshitij Rastogi. Built with <span className="text-primary">React</span>, <span className="text-primary">Tailwind</span> & <span className="text-primary">Framer Motion , ThreeJs</span>.
          </p>
        </div>
      </footer>
    </div>
  );
}
