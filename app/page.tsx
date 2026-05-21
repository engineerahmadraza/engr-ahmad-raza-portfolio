'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Research from '@/components/Research';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AdminModal from '@/components/AdminModal';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

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

export default function Home() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [extraProjects, setExtraProjects] = useState<Project[]>([]);

  const handleAddProject = (p: Project) => {
    setExtraProjects((prev) => [...prev, p]);
  };

  const handleDeleteProject = (id: string) => {
    setExtraProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <CustomCursor />
      <Navbar onAdminClick={() => setAdminOpen(true)} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects
          extraProjects={extraProjects}
          onAddProject={() => setAdminOpen(true)}
        />
        <Research />
        <Contact />
      </main>

      <Footer />

      <AdminModal
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        projects={extraProjects}
        onAddProject={handleAddProject}
        onDeleteProject={handleDeleteProject}
      />
    </>
  );
}
