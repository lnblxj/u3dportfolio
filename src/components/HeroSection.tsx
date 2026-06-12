'use client';

import dynamic from 'next/dynamic';

const VRHeroBackground = dynamic(() => import('./VRHeroBackground'), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0"
      style={{
        background: '#0a0a0a',
        backgroundImage: `url('https://img.sboxm.top/unity/hero.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
      }}
    />
  ),
});

export default function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '640px' }}
    >
      {/* VR Background */}
      <VRHeroBackground />

      {/* Dark gradient overlay — bottom fade to base */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(14,14,16,0.18) 0%, rgba(14,14,16,0.05) 35%, rgba(14,14,16,0.35) 65%, rgba(14,14,16,0.92) 90%, #0E0E10 100%)',
        }}
      />

      {/* Vignette edges */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(14,14,16,0.55) 100%)',
        }}
      />

      {/* Unity scene grid overlay - signature element */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 217, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)',
        }}
      />

      {/* Hero content — vertically centered with slight bias downward */}
      <div
        className="relative z-20 flex flex-col items-center justify-end h-full pb-20 md:pb-28 px-6 text-center"
      >
        {/* Eyebrow badge */}
        <div
          className="flex items-center gap-2.5 mb-7 px-4 py-2 rounded-lg"
          style={{
            background: 'rgba(0, 217, 255, 0.08)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <span className="glow-dot" />
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: '#00D9FF', fontFamily: 'JetBrains Mono, monospace' }}
          >
            Unity3D &nbsp;·&nbsp; 虚拟仿真 &nbsp;·&nbsp; 数字孪生
          </span>
        </div>

        {/* Main title */}
        <h1 className="hero-title mb-5 max-w-5xl">
          构建虚实共生的
          <br />
          <span className="text-gradient-cyan">数字世界</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mb-10 max-w-2xl">
          专注虚拟仿真与数字孪生方向，将真实系统精准映射至数字空间，
          <br className="hidden md:block" />
          推动教育、工业与城市领域的智能化升级。
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={scrollToProjects} className="btn-primary">
            查看作品
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 2v10M3 8l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <a href="#contact" className="btn-ghost">
            联系我
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div
            className="w-5 h-8 rounded-lg flex items-start justify-center pt-1.5"
            style={{ border: '1px solid rgba(0, 217, 255, 0.3)' }}
          >
            <div
              className="w-0.5 h-2 rounded-full"
              style={{
                background: 'var(--color-unity-cyan)',
                animation: 'scrollDot 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(0); opacity: 1; }
          60%  { transform: translateY(10px); opacity: 0.2; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
