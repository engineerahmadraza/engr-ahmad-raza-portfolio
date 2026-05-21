'use client';

import { siteConfig } from '@/lib/data';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#1e1e32] bg-[#060609] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div
              className="text-xl text-white mb-1"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
            >
              ENGR. AHMAD RAZA
            </div>
            <p className="text-[#444466] text-xs" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}>
              MECHATRONICS ENGINEER — LAHORE, PAKISTAN
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { label: 'LI', href: siteConfig.linkedin, title: 'LinkedIn' },
              { label: 'UP', href: siteConfig.upwork, title: 'Upwork' },
              { label: 'FV', href: siteConfig.fiverr, title: 'Fiverr' },
              { label: 'FB', href: siteConfig.facebook, title: 'Facebook' },
              { label: 'FL', href: siteConfig.freelancer, title: 'Freelancer' },
            ].map(({ label, href, title }) => (
              <a
                key={label}
                href={href}
                title={title}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-[#1e1e32] hover:border-[#c62828] text-[#444466] hover:text-[#c62828] text-xs font-bold transition-all duration-300"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-[#444466] text-xs" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>
              © {year} ENGINEER AHMAD RAZA
            </p>
            <p className="text-[#c62828] text-[10px] mt-1" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
              BUILT WITH NEXT.JS 15 + THREE.JS
            </p>
          </div>
        </div>

        <div className="section-divider mt-8" />
        <p className="text-center text-[#444466] text-[10px] mt-4" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}>
          // MECHATRONICS · AUTOMATION · EMBEDDED SYSTEMS · AI/ML · ROBOTICS
        </p>
      </div>
    </footer>
  );
}
