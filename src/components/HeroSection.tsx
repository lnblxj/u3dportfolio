'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
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
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gridLinesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as { isDesktop?: boolean; reduceMotion?: boolean };

          if (reduceMotion) {
            gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, statsRef.current], {
              opacity: 1,
              y: 0,
            });
            return;
          }

          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

          if (gridLinesRef.current) {
            const lines = gridLinesRef.current.querySelectorAll('.grid-line');
            tl.from(
              lines,
              {
                scaleX: 0,
                scaleY: 0,
                transformOrigin: 'center center',
                opacity: 0,
                duration: 1.2,
                stagger: {
                  amount: 0.4,
                  from: 'center',
                },
                ease: 'power2.out',
              },
              0
            );
          }

          if (titleRef.current) {
            const chars = titleRef.current.querySelectorAll('.char');
            tl.from(
              chars,
              {
                y: 100,
                opacity: 0,
                rotationX: -90,
                transformOrigin: 'center bottom',
                duration: 0.8,
                stagger: 0.03,
                ease: 'back.out(1.7)',
              },
              0.3
            );
          }

          tl.from(
            subtitleRef.current,
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
            },
            '-=0.4'
          );

          tl.from(
            ctaRef.current,
            {
              scale: 0,
              opacity: 0,
              duration: 0.6,
              ease: 'back.out(1.7)',
            },
            '-=0.2'
          );

          if (statsRef.current) {
            const statItems = statsRef.current.querySelectorAll('.stat-item');
            tl.from(
              statItems,
              {
                x: isDesktop ? -50 : 0,
                y: isDesktop ? 0 : 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
              },
              '-=0.3'
            );
          }

          gsap.to(titleRef.current, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }
      );

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const title1 = '构建虚实共生的';
  const title2 = '数字世界';

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: 'min(700px, 100svh)' }}
    >
      <VRHeroBackground />

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(14,14,16,0.3) 0%, rgba(14,14,16,0.1) 30%, rgba(14,14,16,0.6) 70%, rgba(14,14,16,0.95) 95%, #0E0E10 100%)',
        }}
      />

      <div
        ref={gridLinesRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ perspective: '1000px' }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="grid-line absolute h-full w-px"
            style={{
              left: `${(i + 1) * 11}%`,
              background: 'linear-gradient(to bottom, transparent, rgba(0, 217, 255, 0.15), transparent)',
              transformStyle: 'preserve-3d',
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="grid-line absolute w-full h-px"
            style={{
              top: `${(i + 1) * 14}%`,
              background: 'linear-gradient(to right, transparent, rgba(0, 217, 255, 0.12), transparent)',
              transformStyle: 'preserve-3d',
            }}
          />
        ))}
      </div>

      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 sm:gap-8 lg:gap-12">
          <div className="flex-1 flex flex-col justify-center lg:pt-0 pt-16 sm:pt-20">
            <div className="flex items-center gap-2 mb-5 sm:mb-8">
              <span className="glow-dot" />
              <span
                className="text-[10px] sm:text-xs font-bold tracking-wider"
                style={{
                  color: '#00D9FF',
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.1em',
                }}
              >
                Unity3D · 虚拟仿真 · 数字孪生
              </span>
            </div>

            <h1
              ref={titleRef}
              className="text-[clamp(2.25rem,12vw,3.5rem)] md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '-0.02em',
              }}
            >
              {title1.split('').map((char, i) => (
                <span key={`char1-${i}`} className="char inline-block">
                  {char === ' ' ? ' ' : char}
                </span>
              ))}
              <br />
              {title2.split('').map((char, i) => (
                <span
                  key={`char2-${i}`}
                  className="char inline-block text-gradient-cyan"
                >
                  {char === ' ' ? ' ' : char}
                </span>
              ))}
            </h1>

            <p
              ref={subtitleRef}
              className="text-sm sm:text-base md:text-lg mb-7 sm:mb-10 max-w-xl leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              专注虚拟仿真与数字孪生方向，将真实系统精准映射至数字空间，
              推动教育、工业与城市领域的智能化升级。
            </p>

            <div ref={ctaRef} className="flex flex-col min-[380px]:flex-row flex-wrap items-stretch min-[380px]:items-center gap-3 sm:gap-4">
              <button onClick={scrollToProjects} className="btn-primary group">
                查看作品
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-y-1">
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
          </div>

          <div
            ref={statsRef}
            className="hidden sm:grid grid-cols-3 lg:flex lg:flex-col gap-3 lg:gap-4 w-full lg:w-auto lg:min-w-[280px]"
          >
            <div className="stat-item frosted-card rounded-2xl p-4 lg:p-6 backdrop-blur-xl">
              <div className="text-2xl lg:text-4xl font-bold mb-1 lg:mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00D9FF' }}>
                10+
              </div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                已构建项目
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                覆盖教育 · 工业 · 城市
              </div>
            </div>

            <div className="stat-item frosted-card rounded-2xl p-4 lg:p-6 backdrop-blur-xl">
              <div className="text-2xl lg:text-4xl font-bold mb-1 lg:mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00D9FF' }}>
                2年+
              </div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                Unity3D 经验
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                虚拟仿真与数字孪生
              </div>
            </div>

            <div className="stat-item frosted-card rounded-2xl p-4 lg:p-6 backdrop-blur-xl">
              <div className="text-2xl lg:text-4xl font-bold mb-1 lg:mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00D9FF' }}>
                1项
              </div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                知识产权
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                软著及发明专利
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-30">
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
