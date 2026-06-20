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
    <main
      className="relative overflow-x-hidden"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(255, 255, 255, 0.06), transparent 34%), linear-gradient(180deg, #101014 0%, #18181c 100%)',
        color: '#f4f7fa',
      }}
    >
      <NavBar />
      <HeroSection onVRReady={() => setVRReady(true)} />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
