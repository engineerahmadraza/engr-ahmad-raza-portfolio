'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, Shield } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onAdminClick: () => void;
}

export default function Navbar({ onAdminClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#060609]/90 backdrop-blur-xl border-b border-[#1e1e32]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-[#c62828] rounded-sm rotate-45 group-hover:rotate-[55deg] transition-transform duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-white font-bold text-sm z-10 relative"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  AR
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div
                className="text-white text-lg font-bold leading-none"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}
              >
                ENGR. AHMAD RAZA
              </div>
              <div
                className="text-[#c62828] text-[10px] tracking-[0.25em] uppercase"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Mechatronics Engineer
              </div>
            </div>
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 group ${
                  activeSection === link.href.slice(1)
                    ? 'text-[#ffb300]'
                    : 'text-[#8888aa] hover:text-white'
                }`}
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.08em' }}
              >
                {link.label.toUpperCase()}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-[#c62828] transition-all duration-300 ${
                    activeSection === link.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative w-10 h-10 flex items-center justify-center rounded-sm border border-[#1e1e32] hover:border-[#c62828] text-[#8888aa] hover:text-[#ffb300] transition-all duration-300 group"
                aria-label="Toggle theme"
              >
                <span className="absolute inset-0 bg-[#c62828] opacity-0 group-hover:opacity-10 transition-opacity rounded-sm" />
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            {/* Admin button */}
            <button
              onClick={onAdminClick}
              className="hidden sm:flex items-center gap-2 px-4 py-2 border border-[#c62828]/40 hover:border-[#c62828] text-[#c62828] hover:text-white hover:bg-[#c62828] text-xs font-medium transition-all duration-300 rounded-sm group"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
            >
              <Shield size={12} />
              ADMIN
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#8888aa] hover:text-white transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#060609]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMenuOpen(false)}
                className="text-4xl text-white hover:text-[#c62828] transition-colors"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
              >
                {link.label.toUpperCase()}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => { onAdminClick(); setMenuOpen(false); }}
              className="mt-4 flex items-center gap-2 px-6 py-3 border border-[#c62828] text-[#c62828] text-sm"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <Shield size={14} />
              ADMIN LOGIN
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
