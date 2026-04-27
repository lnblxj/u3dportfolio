import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import ScrollRevealInit from '@/components/ScrollRevealInit';

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden" style={{ background: '#000', color: '#fff' }}>
      <ScrollRevealInit />
      <NavBar />
      <HeroSection />
      <StatsSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
