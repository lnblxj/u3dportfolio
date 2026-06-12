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

export default function ContactSectionNew() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduceMotion } = context.conditions as { reduceMotion?: boolean };

          if (reduceMotion) return;

          // 先设置所有元素为可见状态（防止动画未触发时不显示）
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
      className="relative py-14 sm:py-20 md:py-32 px-4 sm:px-6"
      style={{ background: '#0E0E10' }}
    >
      {/* 背景装饰 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(0, 217, 255, 0.08) 0%, transparent 50%)',
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
          {contacts.map((contact, index) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="contact-card group relative block p-5 sm:p-8 rounded-2xl overflow-hidden"
              style={{
                background: '#1A1A1D',
                border: '1px solid rgba(0, 217, 255, 0.1)',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -8,
                  boxShadow: '0 20px 50px rgba(0, 217, 255, 0.2)',
                  borderColor: 'rgba(0, 217, 255, 0.4)',
                  duration: 0.3,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  boxShadow: 'none',
                  borderColor: 'rgba(0, 217, 255, 0.1)',
                  duration: 0.3,
                });
              }}
            >
              {/* 背景发光 */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: '#00D9FF' }}
              />

              {/* 图标 */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(0, 217, 255, 0.1)',
                  border: '1px solid rgba(0, 217, 255, 0.3)',
                  color: '#00D9FF',
                }}
              >
                {contact.icon}
              </div>

              {/* 标签 */}
              <p
                className="text-xs font-bold mb-3"
                style={{
                  color: 'var(--color-text-tertiary)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {contact.label}
              </p>

              {/* 值 */}
              <p
                className="text-base sm:text-lg font-semibold mb-3 transition-colors duration-200 group-hover:text-gradient-cyan break-all"
                style={{
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.01em',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {contact.value}
              </p>

              {/* 描述 */}
              <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                {contact.description}
              </p>

              {/* 箭头 */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs font-semibold" style={{ color: '#00D9FF', fontFamily: 'JetBrains Mono, monospace' }}>
                  访问
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform group-hover:translate-x-1"
                  style={{ color: '#00D9FF' }}
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t" style={{ borderColor: 'rgba(0, 217, 255, 0.1)' }}>
          <div className="text-center">
            <p className="text-xs mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
              © 2025 SBOXM. Built with Unity3D · Next.js · Three.js · GSAP
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-tertiary)', opacity: 0.5 }}>
              Designed with ❤️ for the virtual world
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
