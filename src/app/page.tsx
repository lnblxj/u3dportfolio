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
  const heroImageUrl = 'https://img.sboxm.top/unity/hero.jpg';

  if (!isLoaded) {
    return <LoadingScreen onComplete={() => setIsLoaded(true)} heroImageUrl={heroImageUrl} />;
  }

  return (
    <main className="relative overflow-x-hidden" style={{ background: '#0E0E10', color: '#E8E8E8' }}>
      <NavBar />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
