'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Plus, Eye, EyeOff, Trash2, Edit3, Check } from 'lucide-react';
import { toast } from 'sonner';

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

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  projects: Project[];
  onAddProject: (p: Project) => void;
  onDeleteProject: (id: string) => void;
}

const ADMIN_PASSWORD = 'AhmadRaza@2025';

const emptyProject: Omit<Project, 'id'> = {
  title: '',
  category: 'Embedded Systems',
  tags: [],
  description: '',
  image: '',
  link: '',
  featured: false,
  color: '#c62828',
};

const categories = [
  'Embedded Systems', 'AI & ML', 'Industrial Automation',
  'Robotics & Sensing', 'Software Development', 'Microcontroller', 'Sustainable Energy'
];

export default function AdminModal({ open, onClose, projects, onAddProject, onDeleteProject }: AdminModalProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [view, setView] = useState<'list' | 'add'>('list');
  const [form, setForm] = useState({ ...emptyProject });
  const [tagInput, setTagInput] = useState('');

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      toast.success('Access granted. Welcome, Engineer.');
    } else {
      toast.error('Incorrect password. Access denied.');
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleSubmit = () => {
    if (!form.title || !form.description) {
      toast.error('Title and description are required.');
      return;
    }
    onAddProject({ ...form, id: Date.now().toString() });
    setForm({ ...emptyProject });
    setView('list');
    toast.success('Project added successfully!');
  };

  const handleClose = () => {
    setLoggedIn(false);
    setPassword('');
    setView('list');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(6,6,9,0.95)', backdropFilter: 'blur(20px)' }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0c0c14] border border-[#c62828]/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1e1e32] sticky top-0 bg-[#0c0c14] z-10">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-[#c62828]" />
                <span
                  className="text-white text-lg"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
                >
                  {loggedIn ? 'ADMIN PANEL' : 'ADMIN LOGIN'}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center border border-[#1e1e32] hover:border-[#c62828] text-[#8888aa] hover:text-white transition-all"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-6">
              {!loggedIn ? (
                /* Login form */
                <div className="max-w-sm mx-auto mt-4">
                  <p className="text-[#8888aa] text-sm mb-6 text-center" style={{ fontFamily: 'var(--font-mono)' }}>
                    ENTER ADMIN PASSWORD TO CONTINUE
                  </p>
                  <div className="relative mb-4">
                    <input
                      type={showPw ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                      className="w-full bg-[#060609] border border-[#1e1e32] focus:border-[#c62828]/60 text-white px-4 py-3 pr-12 text-sm outline-none transition-colors"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    />
                    <button
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444466] hover:text-white"
                    >
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  <button
                    onClick={handleLogin}
                    className="w-full py-3 bg-[#c62828] hover:bg-[#ef5350] text-white font-semibold transition-colors"
                    style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.15em' }}
                  >
                    AUTHENTICATE
                  </button>
                  <p className="text-[#444466] text-[10px] text-center mt-4" style={{ fontFamily: 'var(--font-mono)' }}>
                    DEFAULT: AhmadRaza@2025 — change in AdminModal.tsx
                  </p>
                </div>
              ) : view === 'list' ? (
                /* Project list */
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <p className="section-label">// MANAGE PROJECTS ({projects.length})</p>
                    <button
                      onClick={() => setView('add')}
                      className="flex items-center gap-2 px-4 py-2 bg-[#c62828] hover:bg-[#ef5350] text-white text-xs transition-colors"
                      style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
                    >
                      <Plus size={12} />
                      ADD NEW
                    </button>
                  </div>
                  <div className="space-y-3">
                    {projects.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between gap-4 p-4 border border-[#1e1e32] bg-[#111120]/50"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm truncate" style={{ fontFamily: 'var(--font-heading)' }}>
                            {p.title}
                          </p>
                          <p className="text-[#444466] text-xs mt-0.5" style={{ fontFamily: 'var(--font-mono)' }}>
                            {p.category} {p.featured ? '· FEATURED' : ''}
                          </p>
                        </div>
                        <button
                          onClick={() => { onDeleteProject(p.id); toast.success('Project removed.'); }}
                          className="w-8 h-8 flex items-center justify-center border border-[#c62828]/30 hover:bg-[#c62828] text-[#c62828] hover:text-white transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    {projects.length === 0 && (
                      <p className="text-[#444466] text-xs text-center py-8" style={{ fontFamily: 'var(--font-mono)' }}>
                        NO CUSTOM PROJECTS YET
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                /* Add project form */
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => setView('list')} className="text-[#c62828] text-xs hover:text-white" style={{ fontFamily: 'var(--font-mono)' }}>
                      ← BACK
                    </button>
                    <p className="section-label">// ADD PROJECT</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#8888aa] text-xs mb-1.5" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                        PROJECT TITLE *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Smart Conveyor System"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full bg-[#060609] border border-[#1e1e32] focus:border-[#c62828]/60 text-white px-4 py-2.5 text-sm outline-none transition-colors"
                        style={{ fontFamily: 'var(--font-body)' }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#8888aa] text-xs mb-1.5" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>CATEGORY</label>
                        <select
                          value={form.category}
                          onChange={(e) => setForm({ ...form, category: e.target.value })}
                          className="w-full bg-[#060609] border border-[#1e1e32] focus:border-[#c62828]/60 text-white px-3 py-2.5 text-sm outline-none transition-colors"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[#8888aa] text-xs mb-1.5" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>ACCENT COLOR</label>
                        <input
                          type="color"
                          value={form.color}
                          onChange={(e) => setForm({ ...form, color: e.target.value })}
                          className="w-full h-10 bg-[#060609] border border-[#1e1e32] px-1 py-1 outline-none cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#8888aa] text-xs mb-1.5" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>DESCRIPTION *</label>
                      <textarea
                        placeholder="Describe the project..."
                        rows={3}
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full bg-[#060609] border border-[#1e1e32] focus:border-[#c62828]/60 text-white px-4 py-2.5 text-sm outline-none transition-colors resize-none"
                        style={{ fontFamily: 'var(--font-body)' }}
                      />
                    </div>

                    <div>
                      <label className="block text-[#8888aa] text-xs mb-1.5" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>PROJECT LINK</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={form.link}
                        onChange={(e) => setForm({ ...form, link: e.target.value })}
                        className="w-full bg-[#060609] border border-[#1e1e32] focus:border-[#c62828]/60 text-white px-4 py-2.5 text-sm outline-none transition-colors"
                        style={{ fontFamily: 'var(--font-body)' }}
                      />
                    </div>

                    <div>
                      <label className="block text-[#8888aa] text-xs mb-1.5" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>TAGS</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Add tag..."
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                          className="flex-1 bg-[#060609] border border-[#1e1e32] text-white px-3 py-2 text-sm outline-none"
                          style={{ fontFamily: 'var(--font-body)' }}
                        />
                        <button onClick={handleAddTag} className="px-3 py-2 bg-[#c62828]/20 border border-[#c62828]/30 text-[#c62828] hover:bg-[#c62828] hover:text-white transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {form.tags.map((tag) => (
                          <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-[#c62828]/15 border border-[#c62828]/30 text-[#ef5350] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                            {tag}
                            <button onClick={() => setForm({ ...form, tags: form.tags.filter((t) => t !== tag) })} className="hover:text-white ml-0.5">×</button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <div
                        onClick={() => setForm({ ...form, featured: !form.featured })}
                        className={`w-5 h-5 border flex items-center justify-center transition-colors ${form.featured ? 'bg-[#c62828] border-[#c62828]' : 'border-[#1e1e32]'}`}
                      >
                        {form.featured && <Check size={10} className="text-white" />}
                      </div>
                      <span className="text-[#8888aa] text-xs" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>MARK AS FEATURED</span>
                    </label>

                    <button
                      onClick={handleSubmit}
                      className="w-full py-3 bg-[#c62828] hover:bg-[#ef5350] text-white font-semibold transition-colors mt-2"
                      style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.15em' }}
                    >
                      ADD PROJECT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
