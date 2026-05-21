'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, ExternalLink, Tag } from 'lucide-react';
import { researchPapers } from '@/lib/data';

export default function Research() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="research" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#ffb300]/10 to-transparent" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#6a1b9a]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="section-label mb-3">// 05. RESEARCH</p>
          <h2
            className="text-white"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '0.05em' }}
          >
            RESEARCH <span className="gradient-text-red">PAPERS</span>
          </h2>
          <p className="text-[#8888aa] text-sm mt-4 max-w-xl" style={{ fontFamily: 'var(--font-body)' }}>
            Published research papers written for academic and industrial clients. All work represents
            original research contributions to the engineering field.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {researchPapers.map((paper, i) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group hud-border bg-[#111120]/50 p-6 hover:bg-[#c62828]/3 transition-all duration-300"
            >
              {/* Top line accent */}
              <div className="h-px w-full mb-5" style={{ background: `linear-gradient(90deg, ${paper.color}, transparent)` }} />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border" style={{ borderColor: `${paper.color}30` }}>
                  <BookOpen size={16} style={{ color: paper.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3
                      className="text-white text-sm font-semibold leading-snug"
                      style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.03em' }}
                    >
                      {paper.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-3">
                    <span
                      className="text-xs"
                      style={{ color: paper.color, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}
                    >
                      {paper.journal}
                    </span>
                    <span className="text-[#444466] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                      {paper.year}
                    </span>
                  </div>

                  <p className="text-[#8888aa] text-xs leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                    {paper.abstract}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {paper.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2 py-0.5 text-[9px] border border-[#1e1e32] text-[#666680]"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          <Tag size={7} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span
                      className="text-[10px] px-2 py-1 border"
                      style={{ borderColor: `${paper.color}30`, color: paper.color, fontFamily: 'var(--font-mono)' }}
                    >
                      {paper.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 p-5 border border-[#ffb300]/20 bg-[#ffb300]/3"
        >
          <p className="text-[#8888aa] text-sm" style={{ fontFamily: 'var(--font-body)' }}>
            <span className="text-[#ffb300]" style={{ fontFamily: 'var(--font-mono)' }}>⚡ NOTE: </span>
            These research papers were authored for clients as ghost-writing / academic consulting services.
            Additional research work is available under NDA. Contact for academic or industrial research inquiries.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
