'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';

type FilterType = 'all' | 'virtual-simulation' | 'digital-twin';

export default function ProjectsSection() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: '全部作品', count: projects.length },
    { key: 'virtual-simulation', label: '虚拟仿真', count: projects.filter(p => p.category === 'virtual-simulation').length },
    { key: 'digital-twin', label: '数字孪生', count: projects.filter(p => p.category === 'digital-twin').length },
  ];

  return (
    <section id="projects" className="py-16 md:py-32 px-6" style={{ background: '#0E0E10' }}>
      <div className="max-w-7xl mx-auto">

        {/* Section intro */}
        <div className="mb-12 md:mb-16">
          <div className="reveal">
            <p className="section-eyebrow mb-5">// 精选作品</p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <h2 className="section-title max-w-xl">
                将现实精准映射至
                <br />
                <span style={{ color: 'var(--color-text-tertiary)' }}>数字维度</span>
              </h2>
              <p
                className="text-sm max-w-sm leading-loose lg:text-right"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                每一个项目都是对真实世界的精确建模，
                <br />
                在虚拟空间中探索无限可能。
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="divider mt-8 md:mt-12 mb-6 md:mb-8 reveal" />

          {/* Filter pills */}
          <div className="flex items-center gap-2 flex-wrap reveal">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={
                  filter === f.key
                    ? { background: 'var(--color-unity-cyan)', color: 'var(--color-base)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }
                    : {
                        background: 'transparent',
                        color: 'var(--color-text-secondary)',
                        border: '1px solid var(--color-border)',
                      }
                }
              >
                {f.label}
                <span
                  className="text-xs rounded px-1.5 py-0.5 min-w-[22px] text-center font-semibold"
                  style={
                    filter === f.key
                      ? { background: 'rgba(14,14,16,0.2)', color: 'var(--color-base)' }
                      : { background: 'rgba(0, 217, 255, 0.1)', color: 'var(--color-text-tertiary)' }
                  }
                >
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 md:mt-16 text-center reveal">
          <p className="text-xs" style={{ color: 'var(--color-text-tertiary)', letterSpacing: '0.08em', opacity: 0.5 }}>
            — 持续更新中，更多项目即将呈现 —
          </p>
        </div>
      </div>
    </section>
  );
}
