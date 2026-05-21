'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, Calendar, MapPin, Briefcase } from 'lucide-react';
import { experience } from '@/lib/data';

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-transparent via-[#c62828]/10 to-transparent" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#c62828]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="section-label mb-3">// 03. EXPERIENCE</p>
          <h2
            className="text-white"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '0.05em' }}
          >
            CAREER <span className="gradient-text-red">TIMELINE</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-2"
          >
            {experience.map((exp, i) => (
              <button
                key={exp.company}
                onClick={() => setActive(i)}
                className={`w-full text-left px-5 py-4 border transition-all duration-300 group ${
                  active === i
                    ? 'border-[#c62828]/60 bg-[#c62828]/10'
                    : 'border-[#1e1e32] hover:border-[#c62828]/30 hover:bg-[#c62828]/3'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className={`text-sm font-semibold transition-colors ${active === i ? 'text-white' : 'text-[#8888aa] group-hover:text-white'}`}
                      style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}
                    >
                      {exp.company}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ fontFamily: 'var(--font-mono)', color: active === i ? exp.color : '#444466' }}
                    >
                      {exp.role}
                    </div>
                  </div>
                  <ChevronRight
                    size={14}
                    className={`transition-all duration-300 ${active === i ? 'text-[#c62828] translate-x-1' : 'text-[#444466]'}`}
                  />
                </div>
                {/* Active indicator bar */}
                <div
                  className="h-px mt-3 transition-all duration-500"
                  style={{ background: active === i ? exp.color : 'transparent', width: active === i ? '100%' : '0%' }}
                />
              </button>
            ))}
          </motion.div>

          {/* Detail panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="hud-border bg-[#111120]/50 p-8 h-full"
              >
                {/* Header */}
                <div className="mb-6">
                  <div
                    className="h-1 w-12 mb-5"
                    style={{ background: experience[active].color }}
                  />
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <h3
                        className="text-white text-2xl mb-1"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.06em' }}
                      >
                        {experience[active].role.toUpperCase()}
                      </h3>
                      <p
                        className="text-lg font-semibold"
                        style={{ color: experience[active].color, fontFamily: 'var(--font-heading)' }}
                      >
                        {experience[active].company}
                      </p>
                    </div>
                    <span
                      className="px-3 py-1 text-xs border capitalize"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        borderColor: `${experience[active].color}40`,
                        color: experience[active].color,
                        letterSpacing: '0.15em',
                      }}
                    >
                      {experience[active].type.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2 text-[#8888aa] text-xs">
                      <Calendar size={10} className="text-[#c62828]" />
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{experience[active].period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8888aa] text-xs">
                      <Briefcase size={10} className="text-[#ffb300]" />
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{experience[active].duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8888aa] text-xs">
                      <MapPin size={10} className="text-[#00bcd4]" />
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{experience[active].location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#8888aa] text-sm leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                  {experience[active].description}
                </p>

                {/* Highlights */}
                <div>
                  <p className="section-label mb-4">// KEY CONTRIBUTIONS</p>
                  <ul className="space-y-2">
                    {experience[active].highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-sm text-[#8888aa]">
                        <span className="mt-1.5 w-1.5 h-1.5 flex-shrink-0" style={{ background: experience[active].color }} />
                        <span style={{ fontFamily: 'var(--font-body)' }}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
