'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Zap, Cpu, Globe } from 'lucide-react';
import { siteConfig } from '@/lib/data';

const IronManScene = dynamic(() => import('./IronManScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-[#c62828] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#c62828] text-xs tracking-widest font-mono">INITIALIZING SUIT...</p>
      </div>
    </div>
  ),
});

const words = ['Mechatronics', 'Automation', 'Robotics', 'Embedded', 'AI / ML'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const modelY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const modelScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.7]);
  const modelOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    const word = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayText.length < word.length) {
        timeout = setTimeout(() => setDisplayText(word.slice(0, displayText.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 45);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, typing, wordIndex]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden hud-grid"
    >
      {/* Background gradients */}
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c62828]/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#ffb300]/6 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00bcd4]/5 rounded-full blur-[80px]" />
      </motion.div>

      {/* HUD corner decorations */}
      <div className="absolute top-24 left-6 w-20 h-20 border-l-2 border-t-2 border-[#c62828]/40" />
      <div className="absolute top-24 right-6 w-20 h-20 border-r-2 border-t-2 border-[#c62828]/40" />
      <div className="absolute bottom-16 left-6 w-20 h-20 border-l-2 border-b-2 border-[#ffb300]/40" />
      <div className="absolute bottom-16 right-6 w-20 h-20 border-r-2 border-b-2 border-[#ffb300]/40" />

      {/* HUD scan line */}
      <motion.div
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c62828]/60 to-transparent pointer-events-none z-10"
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center pt-24 pb-16 min-h-screen">
        {/* Left — Text content */}
        <motion.div style={{ y: textY }} className="relative z-20">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-[#c62828]/30 bg-[#c62828]/5"
          >
            <span className="w-2 h-2 rounded-full bg-[#4caf50] animate-pulse" />
            <span
              className="text-xs text-[#8888aa]"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}
            >
              AVAILABLE FOR WORK
            </span>
          </motion.div>

          {/* Main heading */}
          <div className="overflow-hidden mb-2">
            <motion.p
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
              className="section-label mb-3"
            >
              // ENGINEER · INNOVATOR · CREATOR
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
              className="text-white leading-none mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                letterSpacing: '0.05em',
              }}
            >
              AHMAD
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
              className="gradient-text-red leading-none mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                letterSpacing: '0.05em',
              }}
            >
              RAZA
            </motion.h1>
          </div>

          {/* Typewriter subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-2 mb-4"
          >
            <span
              className="text-2xl md:text-3xl text-[#ffb300]"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '0.05em' }}
            >
              {displayText}
            </span>
            <span className="text-2xl text-[#c62828] cursor-blink font-light">|</span>
            <span
              className="text-2xl md:text-3xl text-[#8888aa]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Engineer
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-[#8888aa] text-base leading-relaxed mb-8 max-w-lg"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Specializing in industrial automation, beverage line engineering (KHS · Sidel · Krones · Tetra Pak),
            embedded systems, and AI-powered mechatronic solutions. Transforming complex engineering
            challenges into elegant, efficient systems.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {[
              { icon: Zap, label: '50+ Projects', color: '#c62828' },
              { icon: Cpu, label: '3+ Years XP', color: '#ffb300' },
              { icon: Globe, label: '15+ Countries', color: '#00bcd4' },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-1.5 border border-[#1e1e32] bg-[#111120]/60"
              >
                <Icon size={12} style={{ color }} />
                <span
                  className="text-xs text-[#8888aa]"
                  style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="group relative px-8 py-3 bg-[#c62828] hover:bg-[#ef5350] text-white font-semibold transition-all duration-300 overflow-hidden"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.1em' }}
            >
              <span className="relative z-10">VIEW PROJECTS</span>
              <span className="absolute inset-0 bg-[#ffb300] translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-0" />
              <span className="relative z-10 group-hover:text-[#0a0a14] transition-colors duration-300" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>VIEW PROJECTS</span>
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-[#c62828]/50 hover:border-[#c62828] text-[#c62828] hover:text-white hover:bg-[#c62828]/10 font-semibold transition-all duration-300"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.1em' }}
            >
              HIRE ME
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex items-center gap-4 mt-8"
          >
            <span
              className="text-xs text-[#444466]"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}
            >
              CONNECT //
            </span>
            {[
              { label: 'LI', href: siteConfig.linkedin, color: '#0077b5' },
              { label: 'UP', href: siteConfig.upwork, color: '#1dbf73' },
              { label: 'FV', href: siteConfig.fiverr, color: '#1dbf73' },
              { label: 'FL', href: siteConfig.freelancer, color: '#29b2fe' },
            ].map(({ label, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-[#1e1e32] hover:border-current text-[#444466] text-xs font-bold transition-all duration-300 hover:scale-110"
                style={{ fontFamily: 'var(--font-mono)', color: color }}
              >
                {label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — 3D Iron Man */}
        <motion.div
          style={{ y: modelY, scale: modelScale, opacity: modelOpacity }}
          className="relative w-full h-[500px] lg:h-[700px]"
        >
          {/* Glow rings behind model */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 rounded-full border border-[#c62828]/15 animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-52 h-52 rounded-full border border-[#ffb300]/20 animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute w-80 h-80 rounded-full bg-[#c62828]/4 blur-3xl" />
          </div>

          {/* HUD data overlay */}
          <div
            className="absolute top-8 right-4 text-right pointer-events-none"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#c62828', opacity: 0.6 }}
          >
            <div className="mb-1">SYS: ONLINE</div>
            <div className="mb-1">ARC REACTOR: 100%</div>
            <div className="mb-1">SUIT INTEGRITY: OPTIMAL</div>
            <div>MARK VII — READY</div>
          </div>
          <div
            className="absolute bottom-8 left-4 pointer-events-none"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#ffb300', opacity: 0.5 }}
          >
            <div className="mb-1">ENG. AHMAD RAZA</div>
            <div>MECHATRONICS DIVISION</div>
          </div>

          <IronManScene />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#444466]"
      >
        <span
          className="text-[10px] tracking-[0.3em]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-[#c62828]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
