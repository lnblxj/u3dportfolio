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
    <section id="projects" className="py-32 px-6" style={{ background: '#000' }}>
      <div className="max-w-7xl mx-auto">

        {/* Section intro */}
        <div className="mb-16">
          <div className="reveal">
            <p className="section-eyebrow mb-5">精选作品</p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <h2 className="section-title max-w-xl">
                将现实精准映射至
                <br />
                <span style={{ color: 'rgba(255,255,255,0.38)' }}>数字维度</span>
              </h2>
              <p
                className="text-sm max-w-sm leading-loose lg:text-right"
                style={{ color: 'rgba(255,255,255,0.42)' }}
              >
                每一个项目都是对真实世界的精确建模，
                <br />
                在虚拟空间中探索无限可能。
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="divider mt-12 mb-8 reveal" />

          {/* Filter pills */}
          <div className="flex items-center gap-2 flex-wrap reveal">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={
                  filter === f.key
                    ? { background: '#fff', color: '#000' }
                    : {
                        background: 'transparent',
                        color: 'rgba(255,255,255,0.5)',
                        border: '1px solid rgba(255,255,255,0.12)',
                      }
                }
              >
                {f.label}
                <span
                  className="text-xs rounded-full px-1.5 py-0.5 min-w-[22px] text-center font-semibold"
                  style={
                    filter === f.key
                      ? { background: 'rgba(0,0,0,0.12)', color: '#000' }
                      : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)' }
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
        <div className="mt-16 text-center reveal">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em' }}>
            — 持续更新中，更多项目即将呈现 —
          </p>
        </div>
      </div>
    </section>
  );
}
