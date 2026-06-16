'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import LoadingScreen from '@/components/LoadingScreen';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [vrReady, setVRReady] = useState(false);

  if (!isLoaded) {
    return (
      <LoadingScreen
        onComplete={() => setIsLoaded(true)}
        onVRReady={() => setVRReady(true)}
        vrReady={vrReady}
      />
    );
  }

  return (
    <main className="relative overflow-x-hidden" style={{ background: '#0E0E10', color: '#E8E8E8' }}>
      <NavBar />
      <HeroSection onVRReady={() => setVRReady(true)} />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
