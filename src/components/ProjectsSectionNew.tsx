'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import ProjectCardNew from './ProjectCardNew';

gsap.registerPlugin(ScrollTrigger);

type FilterType = 'all' | 'virtual-simulation' | 'digital-twin';

export default function ProjectsSectionNew() {
  const [filter, setFilter] = useState<FilterType>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduceMotion } = context.conditions as { reduceMotion?: boolean };

          if (reduceMotion) return;

          // 先设置所有元素为可见状态（防止动画未触发时不显示）
          gsap.set([headerRef.current, gridRef.current], { opacity: 1 });

          // 标题进入动画
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

          // 视差效果 - 标题在滚动时上移
          gsap.to(headerRef.current, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      );

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: '全部作品', count: projects.length },
    {
      key: 'virtual-simulation',
      label: '虚拟仿真',
      count: projects.filter((p) => p.category === 'virtual-simulation').length,
    },
    {
      key: 'digital-twin',
      label: '数字孪生',
      count: projects.filter((p) => p.category === 'digital-twin').length,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-14 sm:py-20 md:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ background: '#0E0E10' }}
    >
      {/* 背景装饰 - Unity 网格 */}
      <div className="unity-grid opacity-20" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div ref={headerRef} className="mb-10 sm:mb-16">
          {/* 眉标 */}
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="w-8 sm:w-12 h-px" style={{ background: 'var(--color-unity-cyan)' }} />
            <p className="section-eyebrow">// 精选作品</p>
          </div>

          {/* 标题和描述 */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8 mb-8 sm:mb-12">
            <div className="flex-1">
              <h2 className="section-title mb-4">
                将现实精准映射至
                <br />
                <span style={{ color: 'var(--color-text-tertiary)' }}>数字维度</span>
              </h2>
              <p className="text-sm sm:text-base leading-relaxed max-w-xl" style={{ color: 'var(--color-text-secondary)' }}>
                每一个项目都是对真实世界的精确建模，在虚拟空间中探索无限可能。
              </p>
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-8">
              <div>
                <div
                  className="text-3xl sm:text-4xl font-bold mb-1"
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00D9FF' }}
                >
                  {projects.length}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                  已完成项目
                </div>
              </div>
              <div>
                <div
                  className="text-3xl sm:text-4xl font-bold mb-1"
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00D9FF' }}
                >
                  2+
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                  应用领域
                </div>
              </div>
            </div>
          </div>

          {/* 过滤器 */}
          <div className="-mx-4 sm:mx-0 overflow-x-auto pb-2 sm:overflow-visible">
            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-0 w-max sm:w-auto sm:flex-wrap">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="group relative shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300"
                style={
                  filter === f.key
                    ? {
                        background: 'var(--color-unity-cyan)',
                        color: 'var(--color-base)',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 700,
                        fontSize: '14px',
                      }
                    : {
                        background: 'transparent',
                        color: 'var(--color-text-secondary)',
                        border: '1px solid var(--color-border)',
                        fontSize: '14px',
                      }
                }
              >
                <span className="flex items-center gap-2">
                  {f.label}
                  <span
                    className="inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded text-xs font-bold"
                    style={
                      filter === f.key
                        ? { background: 'rgba(14,14,16,0.3)', color: 'var(--color-base)' }
                        : { background: 'rgba(0, 217, 255, 0.15)', color: 'var(--color-text-tertiary)' }
                    }
                  >
                    {f.count}
                  </span>
                </span>

                {/* 悬停发光效果 */}
                {filter !== f.key && (
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'rgba(0, 217, 255, 0.05)',
                      border: '1px solid rgba(0, 217, 255, 0.3)',
                    }}
                  />
                )}
              </button>
            ))}
            </div>
          </div>
        </div>

        {/* 项目网格 - 响应式对齐布局 */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filtered.map((project, i) => (
            <ProjectCardNew key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* 底部装饰 */}
        <div className="mt-12 sm:mt-20 text-center">
          <div className="inline-flex max-w-full items-center gap-3 px-4 sm:px-6 py-3 rounded-lg" style={{ background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.1)' }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00D9FF' }} />
            <p className="text-xs" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'JetBrains Mono, monospace' }}>
              持续更新中，更多项目即将呈现
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
