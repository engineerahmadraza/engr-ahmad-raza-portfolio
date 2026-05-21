'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Plus, Tag } from 'lucide-react';
import { defaultProjects, categories } from '@/lib/data';

interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
  link: string;
  featured: boolean;
  color: string;
}

interface ProjectsProps {
  extraProjects?: Project[];
  onAddProject?: () => void;
}

export default function Projects({ extraProjects = [], onAddProject }: ProjectsProps) {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const allProjects = [...defaultProjects, ...extraProjects];

  const filtered =
    activeFilter === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-32 relative bg-[#0c0c14]">
      <div className="absolute inset-0 hud-grid opacity-30" />
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#ffb300]/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-end justify-between flex-wrap gap-6 mb-12"
        >
          <div>
            <p className="section-label mb-3">// 04. PORTFOLIO</p>
            <h2
              className="text-white"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '0.05em' }}
            >
              FEATURED <span className="gradient-text-red">PROJECTS</span>
            </h2>
          </div>
          {onAddProject && (
            <button
              onClick={onAddProject}
              className="flex items-center gap-2 px-5 py-3 border border-[#c62828]/40 hover:border-[#c62828] text-[#c62828] hover:bg-[#c62828]/10 transition-all duration-300 text-sm"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
            >
              <Plus size={14} />
              ADD PROJECT
            </button>
          )}
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-xs border transition-all duration-300 ${
                activeFilter === cat
                  ? 'border-[#c62828] bg-[#c62828]/15 text-[#ef5350]'
                  : 'border-[#1e1e32] text-[#8888aa] hover:border-[#c62828]/40 hover:text-white'
              }`}
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="project-card group relative border border-[#1e1e32] bg-[#111120]/80 overflow-hidden"
                style={{ borderColor: hoveredId === project.id ? `${project.color}40` : undefined }}
              >
                {/* Colored top accent */}
                <div className="h-1 w-full" style={{ background: project.color }} />

                {/* Image area */}
                <div className="relative h-44 overflow-hidden bg-[#0c0c14]">
                  {/* Placeholder visual with project color */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-20"
                    style={{ background: `radial-gradient(circle at center, ${project.color}, transparent 70%)` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="text-5xl font-bold opacity-20"
                      style={{ fontFamily: 'var(--font-display)', color: project.color }}
                    >
                      {project.category.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-2 py-1 text-[10px] border"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        borderColor: `${project.color}40`,
                        color: project.color,
                        background: '#060609aa',
                        letterSpacing: '0.12em',
                      }}
                    >
                      {project.category.toUpperCase()}
                    </span>
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <span
                        className="px-2 py-1 text-[10px] bg-[#c62828] text-white"
                        style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
                      >
                        FEATURED
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="text-white text-base font-semibold mb-2 line-clamp-2"
                    style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-[#8888aa] text-xs leading-relaxed mb-4 line-clamp-3"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
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

                  {/* Link */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold transition-colors duration-200 hover:opacity-80"
                    style={{ color: project.color, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
                  >
                    VIEW PROJECT <ExternalLink size={10} />
                  </a>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.color}10 0%, transparent 60%)` }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all on freelance platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
        >
          <span className="text-[#444466] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
            MORE PROJECTS ON //
          </span>
          {[
            { label: 'UPWORK', href: 'https://www.upwork.com/freelancers/~01b0e16f3156c649be', color: '#14a800' },
            { label: 'FIVERR', href: 'https://www.fiverr.com/users/engr_ahmadraza', color: '#1dbf73' },
          ].map(({ label, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 border text-xs font-bold transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', borderColor: `${color}40`, color }}
            >
              {label} ↗ <ExternalLink size={10} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
