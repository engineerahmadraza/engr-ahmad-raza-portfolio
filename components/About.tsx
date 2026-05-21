'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { siteConfig, stats } from '@/lib/data';

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-1/2 h-px bg-gradient-to-r from-[#c62828] to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/2 h-px bg-gradient-to-l from-[#ffb300] to-transparent" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#c62828]/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">// 01. ABOUT ME</p>
          <h2
            className="text-white"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              letterSpacing: '0.05em',
            }}
          >
            THE <span className="gradient-text-red">ENGINEER</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Bio */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="hud-border p-8 bg-[#111120]/50 mb-8"
            >
              {/* Profile image placeholder with HUD styling */}
              <div className="flex items-start gap-6 mb-6">
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#c62828] to-[#8e0000] flex items-center justify-center text-3xl font-bold text-white"
                    style={{ fontFamily: 'var(--font-display)', clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)' }}>
                    AR
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#4caf50] border-2 border-[#060609]" />
                </div>
                <div>
                  <h3
                    className="text-white text-2xl mb-1"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}
                  >
                    ENGINEER AHMAD RAZA
                  </h3>
                  <p className="text-[#c62828] text-sm mb-3" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}>
                    MECHATRONICS &amp; AUTOMATION SPECIALIST
                  </p>
                  <div className="flex items-center gap-2 text-[#8888aa] text-xs">
                    <MapPin size={10} className="text-[#c62828]" />
                    <span style={{ fontFamily: 'var(--font-mono)' }}>Sargodha, Punjab, Pakistan</span>
                  </div>
                </div>
              </div>

              <p className="text-[#8888aa] text-sm leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                Throughout my career, I have successfully led numerous projects from conception to completion.
                My expertise encompasses designing automatic systems, coding microcontrollers, and integrating
                IoT for enhanced performance. I have a proven track record of managing project timelines and
                budgets, ensuring high-quality deliverables within strict deadlines.
              </p>
              <p className="text-[#8888aa] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                Currently contributing to FMCG beverage line automation at Projexon Engineering Solutions while
                maintaining a strong freelance presence globally via Fiverr and Upwork, serving clients across
                15+ countries with AI/ML models, robotics simulations, and embedded system designs.
              </p>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-1 gap-3"
            >
              {[
                { icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
                { icon: Phone, label: siteConfig.phone, href: `tel:${siteConfig.phone}` },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 px-4 py-3 border border-[#1e1e32] hover:border-[#c62828]/50 bg-[#111120]/30 hover:bg-[#c62828]/5 transition-all duration-300 group"
                >
                  <Icon size={14} className="text-[#c62828]" />
                  <span className="text-[#8888aa] group-hover:text-white text-sm transition-colors"
                    style={{ fontFamily: 'var(--font-mono)' }}>
                    {label}
                  </span>
                  <ExternalLink size={10} className="ml-auto text-[#444466] group-hover:text-[#c62828] transition-colors" />
                </a>
              ))}
            </motion.div>

            {/* Freelance profiles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-3 mt-6"
            >
              {[
                { label: 'UPWORK', href: siteConfig.upwork, color: '#14a800' },
                { label: 'FIVERR', href: siteConfig.fiverr, color: '#1dbf73' },
                { label: 'LINKEDIN', href: siteConfig.linkedin, color: '#0077b5' },
                { label: 'FREELANCER', href: siteConfig.freelancer, color: '#29b2fe' },
              ].map(({ label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border text-xs font-bold transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.15em',
                    borderColor: `${color}40`,
                    color,
                  }}
                >
                  {label} ↗
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Stats */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 * i }}
                  className="hud-border bg-[#111120]/50 p-6 group hover:bg-[#c62828]/5 transition-colors duration-300"
                >
                  <div className="stat-number gradient-text-red">
                    {stat.value}{stat.suffix}
                  </div>
                  <p className="text-[#8888aa] text-xs mt-1"
                    style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                    {stat.label.toUpperCase()}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="hud-border p-6 bg-[#111120]/50"
            >
              <p className="section-label mb-4">// EDUCATION</p>
              <div className="space-y-4">
                {[
                  {
                    degree: 'B.E. Mechatronics & Control Systems',
                    school: 'University of Engineering & Technology',
                    location: 'Lahore, Pakistan',
                    year: '2021 – 2025',
                    color: '#c62828',
                  },
                  {
                    degree: 'F.Sc Pre-Engineering',
                    school: 'The Hope College of Science',
                    location: 'Pakistan',
                    year: '2017 – 2019',
                    color: '#ffb300',
                  },
                ].map((edu) => (
                  <div key={edu.degree} className="flex gap-4">
                    <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: edu.color }} />
                    <div>
                      <p className="text-white text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                        {edu.degree}
                      </p>
                      <p className="text-[#8888aa] text-xs">{edu.school}</p>
                      <p className="text-xs mt-0.5" style={{ color: edu.color, fontFamily: 'var(--font-mono)' }}>
                        {edu.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
