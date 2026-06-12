'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import HeroSectionNew from '@/components/HeroSectionNew';
import ProjectsSectionNew from '@/components/ProjectsSectionNew';
import SkillsSectionMarquee from '@/components/SkillsSectionMarquee';
import ContactSectionNew from '@/components/ContactSectionNew';
import ScrollRevealInit from '@/components/ScrollRevealInit';
import LoadingScreen from '@/components/LoadingScreen';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroImageUrl = 'https://img.sboxm.top/unity/hero.jpg';

  if (!isLoaded) {
    return <LoadingScreen onComplete={() => setIsLoaded(true)} heroImageUrl={heroImageUrl} />;
  }

  return (
    <main className="relative overflow-x-hidden" style={{ background: '#0E0E10', color: '#E8E8E8' }}>
      <ScrollRevealInit />
      <NavBar />
      <HeroSectionNew />
      <ProjectsSectionNew />
      <SkillsSectionMarquee />
      <ContactSectionNew />
    </main>
  );
}
