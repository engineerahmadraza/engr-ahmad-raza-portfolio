'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Linkedin, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/data';
import { toast } from 'sonner';

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all required fields.');
      return;
    }
    setSending(true);
    // Simulate submit (replace with your API/emailjs/formspree integration)
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    toast.success('Message received! I\'ll respond within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-32 relative bg-[#0c0c14]">
      <div className="absolute inset-0 hud-grid opacity-30" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#c62828]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="section-label mb-3 justify-center flex">// 06. CONTACT</p>
          <h2
            className="text-white"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '0.05em' }}
          >
            LET&apos;S <span className="gradient-text-red">BUILD</span> TOGETHER
          </h2>
          <p className="text-[#8888aa] text-sm mt-4 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Whether you need automation solutions, embedded system design, AI/ML models, or freelance engineering support —
            I&apos;m ready to bring your vision to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact cards */}
            {[
              { icon: Mail, label: 'EMAIL', value: siteConfig.email, href: `mailto:${siteConfig.email}`, color: '#c62828' },
              { icon: Phone, label: 'PHONE', value: siteConfig.phone, href: `tel:${siteConfig.phone}`, color: '#ffb300' },
              { icon: MapPin, label: 'LOCATION', value: siteConfig.location, href: '#', color: '#00bcd4' },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <a
                key={label}
                href={href}
                className="flex items-start gap-4 p-5 border border-[#1e1e32] bg-[#111120]/50 hover:border-current transition-all duration-300 group"
                style={{ borderColor: 'transparent' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${color}40`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
              >
                <div className="w-10 h-10 flex items-center justify-center border flex-shrink-0" style={{ borderColor: `${color}30` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color, fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}>{label}</p>
                  <p className="text-white text-sm" style={{ fontFamily: 'var(--font-body)' }}>{value}</p>
                </div>
              </a>
            ))}

            {/* Freelance platforms */}
            <div className="hud-border p-5 bg-[#111120]/50">
              <p className="section-label mb-4">// HIRE ON PLATFORMS</p>
              <div className="space-y-3">
                {[
                  { name: 'Upwork', href: siteConfig.upwork, color: '#14a800', label: 'TOP RATED FREELANCER' },
                  { name: 'Fiverr', href: siteConfig.fiverr, color: '#1dbf73', label: 'LEVEL 2 SELLER' },
                  { name: 'Freelancer.com', href: siteConfig.freelancer, color: '#29b2fe', label: 'VERIFIED ENGINEER' },
                ].map(({ name, href, color, label }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-white text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{name}</span>
                      <span className="ml-2 text-[10px]" style={{ color, fontFamily: 'var(--font-mono)' }}>{label}</span>
                    </div>
                    <ExternalLink size={12} className="text-[#444466] group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 hud-border bg-[#111120]/50 p-8"
            onSubmit={handleSubmit}
          >
            <p className="section-label mb-6">// SEND MESSAGE</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {[
                { id: 'name', placeholder: 'Your Name *', type: 'text', required: true },
                { id: 'email', placeholder: 'Email Address *', type: 'email', required: true },
              ].map(({ id, placeholder, type, required }) => (
                <div key={id}>
                  <input
                    id={id}
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    value={form[id as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                    className="w-full bg-[#060609] border border-[#1e1e32] text-white placeholder-[#444466] text-sm px-4 py-3 outline-none focus:border-[#c62828]/60 transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
              ))}
            </div>

            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-[#060609] border border-[#1e1e32] text-white placeholder-[#444466] text-sm px-4 py-3 outline-none focus:border-[#c62828]/60 transition-colors duration-300 mb-4"
              style={{ fontFamily: 'var(--font-body)' }}
            />

            <textarea
              placeholder="Your Message *"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-[#060609] border border-[#1e1e32] text-white placeholder-[#444466] text-sm px-4 py-3 outline-none focus:border-[#c62828]/60 transition-colors duration-300 resize-none mb-6"
              style={{ fontFamily: 'var(--font-body)' }}
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-3 py-4 bg-[#c62828] hover:bg-[#ef5350] disabled:opacity-60 text-white font-semibold transition-all duration-300 group"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.15em' }}
            >
              {sending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  TRANSMITTING...
                </>
              ) : (
                <>
                  <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  SEND MESSAGE
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
