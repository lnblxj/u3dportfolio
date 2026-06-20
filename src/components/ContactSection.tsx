'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contacts = [
  {
    label: '博客',
    value: 'blog.sboxm.top',
    href: 'https://blog.sboxm.top',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 8h6M7 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    description: '技术文章 · 项目分享 · 学习笔记',
  },
  {
    label: 'GitHub',
    value: 'github.com/lnblxj',
    href: 'https://github.com/lnblxj',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    description: '开源代码 · 项目仓库 · 贡献记录',
  },
  {
    label: '邮件',
    value: 'mail@sboxm.eu.org',
    href: 'mailto:mail@sboxm.eu.org',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    description: '项目合作 · 技术交流 · 工作机会',
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景 blob 动画 - 围绕圆心旋转
      if (blobsRef.current) {
        const blobs = blobsRef.current.querySelectorAll('.blob');

        // 第一组 - 围绕共同圆心旋转
        // Blob 0 - 逆时针旋转 + 半径变化
        const blob0InitialRadius = 80;
        gsap.to({}, {
          duration: 5,
          repeat: -1,
          ease: 'none',
          onUpdate: function() {
            const progress = this.progress();
            const angle = -progress * Math.PI * 2; // 逆时针
            const radiusOffset = Math.sin(progress * Math.PI * 4) * 30; // 半径动态变化
            const radius = blob0InitialRadius + radiusOffset;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            gsap.set(blobs[0], { x, y });
          }
        });

        // Blob 1 - 逆时针旋转 + 半径变化（不同相位）
        const blob1InitialRadius = 60;
        gsap.to({}, {
          duration: 6.25,
          repeat: -1,
          ease: 'none',
          onUpdate: function() {
            const progress = this.progress();
            const angle = -progress * Math.PI * 2 + Math.PI; // 逆时针，起始位置偏移
            const radiusOffset = Math.sin(progress * Math.PI * 3) * 40;
            const radius = blob1InitialRadius + radiusOffset;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            gsap.set(blobs[1], { x, y });
          }
        });

        // 第二组 - 围绕共同圆心旋转
        // Blob 2 - 逆时针旋转 + 半径变化
        const blob2InitialRadius = 70;
        gsap.to({}, {
          duration: 5.5,
          repeat: -1,
          ease: 'none',
          onUpdate: function() {
            const progress = this.progress();
            const angle = -progress * Math.PI * 2 + Math.PI * 0.5;
            const radiusOffset = Math.sin(progress * Math.PI * 5) * 35;
            const radius = blob2InitialRadius + radiusOffset;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            gsap.set(blobs[2], { x, y });
          }
        });

        // Blob 3 - 逆时针旋转 + 半径变化
        const blob3InitialRadius = 55;
        gsap.to({}, {
          duration: 7,
          repeat: -1,
          ease: 'none',
          onUpdate: function() {
            const progress = this.progress();
            const angle = -progress * Math.PI * 2 - Math.PI * 0.5;
            const radiusOffset = Math.sin(progress * Math.PI * 4) * 25;
            const radius = blob3InitialRadius + radiusOffset;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            gsap.set(blobs[3], { x, y });
          }
        });
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduceMotion } = context.conditions as { reduceMotion?: boolean };

          if (reduceMotion) return;
          gsap.set([headerRef.current, cardsRef.current], { opacity: 1 });

          // 标题动画
          gsap.from(headerRef.current, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });

          // 卡片动画
          if (cardsRef.current) {
            const cards = cardsRef.current.querySelectorAll('.contact-card');
            gsap.from(cards, {
              y: 80,
              opacity: 0,
              scale: 0.9,
              duration: 0.8,
              stagger: 0.2,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            });
          }
        }
      );

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-14 sm:py-20 md:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ background: '#0E0E10' }}
    >
      {/* 动画背景元素 - SVG */}
      <div ref={blobsRef} className="absolute inset-0 pointer-events-none opacity-70">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <filter id="blob-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
            </filter>
          </defs>

          {/* 第一组 - 左侧偏上 */}
          <g className="blob" filter="url(#blob-blur)">
            <circle cx="300" cy="350" r="160" fill="rgb(225, 102, 182)" fillOpacity="0.8" />
          </g>

          <g className="blob" filter="url(#blob-blur)">
            <circle cx="420" cy="420" r="130" fill="rgb(187, 107, 240)" fillOpacity="0.7" />
          </g>

          {/* 第二组 - 右侧偏下 */}
          <g className="blob" filter="url(#blob-blur)">
            <circle cx="1600" cy="620" r="145" fill="rgb(255, 198, 163)" fillOpacity="0.8" />
          </g>

          <g className="blob" filter="url(#blob-blur)">
            <circle cx="1500" cy="700" r="120" fill="rgb(255, 255, 255)" fillOpacity="0.36" />
          </g>
        </svg>
      </div>

      {/* 毛玻璃覆盖层 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: 'blur(80px)',
          WebkitBackdropFilter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* 分隔线 */}
        <div className="divider mb-10 sm:mb-16 md:mb-24" />

        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
            <div className="w-8 sm:w-12 h-px" style={{ background: 'var(--color-unity-cyan)' }} />
            <p className="section-eyebrow">// 联系方式</p>
            <div className="w-8 sm:w-12 h-px" style={{ background: 'var(--color-unity-cyan)' }} />
          </div>

          <h2 className="section-title mb-6">期待与你交流</h2>

          <p className="text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            无论是项目合作、技术探讨，还是工作机会，都欢迎通过以下方式联系我。
          </p>
        </div>

        {/* 联系卡片 */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="contact-card group relative flex min-h-[200px] flex-col p-6 sm:min-h-[220px] sm:p-8 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                textDecoration: 'none',
              }}
            >
              {/* 背景发光 */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10"
                style={{ background: '#FFFFFF' }}
              />

              {/* 图标 */}
              <div
                className="flex h-8 w-8 items-center justify-start mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  color: '#FFFFFF',
                }}
              >
                {contact.icon}
              </div>

              {/* 标签 */}
              <p
                className="text-xl font-bold mb-3"
                style={{
                  color: '#FFFFFF',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {contact.label}
              </p>

              {/* 描述 */}
              <p className="text-xs leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                {contact.description}
              </p>

              {/* 链接 + 箭头 */}
              <div className="flex items-center gap-2 mt-auto">
                <span className="text-sm font-semibold break-all" style={{ color: 'var(--color-text-primary)', fontFamily: 'JetBrains Mono, monospace' }}>
                  {contact.value}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="flex-shrink-0"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}>
          <div className="text-center">
            <p className="text-xs mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
              © 2026 SBOXM. Built with Unity3D · Next.js · Three.js · GSAP
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-tertiary)', opacity: 0.5 }}>
              Designed with for the virtual world
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
