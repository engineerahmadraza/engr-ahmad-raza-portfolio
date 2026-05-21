'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '@/lib/data';

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="skills" className="py-32 relative bg-[#0c0c14]">
      <div className="absolute inset-0 hud-grid opacity-50" />
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#c62828]/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="section-label mb-3">// 02. TECHNICAL SKILLS</p>
          <h2
            className="text-white"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '0.05em' }}
          >
            SKILL <span className="gradient-text-red">MATRIX</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              className="hud-border bg-[#111120]/60 p-6 hover:bg-[#c62828]/3 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{group.icon}</span>
                <h3
                  className="text-white text-lg"
                  style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.08em', fontWeight: 600 }}
                >
                  {group.category.toUpperCase()}
                </h3>
              </div>

              <div className="space-y-4">
                {group.items.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span
                        className="text-[#8888aa] text-sm"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {skill.name}
                      </span>
                      <span
                        className="text-[#c62828] text-xs"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1 bg-[#1e1e32] relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.2, delay: gi * 0.1 + si * 0.08, ease: 'easeOut' }}
                        className="h-full relative"
                        style={{
                          background: `linear-gradient(90deg, #c62828, ${skill.level > 85 ? '#ffb300' : '#ef5350'})`,
                        }}
                      >
                        {/* Glowing tip */}
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ffb300] shadow-[0_0_8px_#ffb300]" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech tags cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16"
        >
          <p className="section-label mb-6">// TOOLS &amp; TECHNOLOGIES</p>
          <div className="flex flex-wrap gap-3">
            {[
              'AutoCAD', 'SolidWorks', 'MATLAB', 'Simulink', 'Abaqus', 'Arduino', 'ESP32',
              'PIC18', 'Tiva C', 'Blynk IoT', 'PLC', 'HMI', 'SCADA', 'Python', 'TensorFlow',
              'OpenCV', 'C/C++', 'C#', 'SQL Server', 'HTML/CSS', 'KHS', 'Krones', 'Tetra Pak',
              'Sidel', 'MAC Valves', 'Pneumatics', 'CNC', '3D Printing', 'Git',
            ].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.02 }}
                className="px-3 py-1.5 border border-[#1e1e32] text-[#8888aa] text-xs hover:border-[#c62828]/50 hover:text-[#ffb300] transition-all duration-200 cursor-default"
                style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
