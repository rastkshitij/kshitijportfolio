import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, scroller } from 'react-scroll';
import GooeyNav from './GooeyNav';

const navLinks = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Resume', to: 'resume' },
  { name: 'Experience', to: 'experience' },
  { name: 'LeetCode', to: 'leetcode' },
  { name: 'Certificates', to: 'certificates' },
  { name: 'Projects', to: 'projects' },
  { name: 'Education', to: 'education' },
  { name: 'Contact', to: 'contact' }
];

const gooeyItems = navLinks.map((link) => ({
  label: link.name,
  href: `#${link.to}`,
  to: link.to
}));

export default function Navbar({
  onScrollStart,
  onScrollEnd
}: {
  onScrollStart: (type: 'walk' | 'run') => void;
  onScrollEnd: () => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);

          // Update active index based on visible section
          const scrollPosition = window.scrollY + 200;
          for (let i = navLinks.length - 1; i >= 0; i--) {
            const el = document.getElementById(navLinks[i].to);
            if (el && el.offsetTop <= scrollPosition) {
              setActiveIndex(i);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDesktopNavChange = (index: number) => {
    const item = gooeyItems[index];
    if (!item) return;

    setActiveIndex(index);
    onScrollStart(item.to === 'home' ? 'walk' : 'run');

    scroller.scrollTo(item.to, {
      smooth: true,
      duration: 2000,
      offset: -70
    });

    setTimeout(() => {
      onScrollEnd();
    }, 2050);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 backdrop-blur-xl bg-[#0e1014]/85 border-b border-border/80 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 relative flex items-center justify-between md:justify-center">
        {/* Brand Logo with Charcoal, White & Crimson accent (anchored left on desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:absolute md:left-6 lg:left-8 text-2xl lg:text-3xl font-black tracking-tighter text-white select-none cursor-pointer flex-shrink-0 z-10"
          onClick={() => handleDesktopNavChange(0)}
        >
          KR<span className="text-[#dc2626] drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]">.</span>
        </motion.div>

        {/* Desktop Centered GooeyNav - Increased Size */}
        <div className="hidden md:flex items-center justify-center">
          <GooeyNav
            items={gooeyItems}
            initialActiveIndex={0}
            activeIndex={activeIndex}
            theme="dark"
            size="md"
            frame
            particleCount={15}
            spread={56}
            animationTime={600}
            timeVariance={300}
            gooeyness={0.5}
            wobble={0.5}
            hoverEffect
            color="#16a34a"
            colors={['#16a34a', '#22c55e', '#15803d', '#dc2626']}
            activeTextColor="#ffffff"
            onChange={(index) => handleDesktopNavChange(index)}
          />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 rounded-xl bg-card border border-border focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (kept as it was, with cohesive charcoal & forest green styling) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden border-t border-border mt-3 mx-4 rounded-2xl shadow-2xl"
          >
            <div className="flex flex-col p-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={2000}
                  onSetActive={() => onScrollEnd()}
                  onClick={() => {
                    onScrollStart(link.to === 'home' ? 'walk' : 'run');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-base font-bold text-white/90 hover:text-primary transition-colors cursor-pointer uppercase tracking-wider py-1.5 border-b border-border/40 last:border-b-0"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
