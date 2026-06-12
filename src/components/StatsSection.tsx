'use client';

const stats = [
  { value: '10+', label: '已构建项目', sub: '覆盖教育 · 工业 · 城市' },
  { value: '2年+', label: 'Unity3D 经验', sub: '虚拟仿真与数字孪生' },
  { value: '1项', label: '知识产权', sub: '软著及发明专利' },
];

export default function StatsSection() {
  return (
    <section
      className="relative px-6 py-16 md:py-28 overflow-hidden"
      style={{ background: '#0E0E10', borderTop: '1px solid rgba(0, 217, 255, 0.1)' }}
    >
      {/* Unity grid background */}
      <div className="unity-grid opacity-30" />

      <div className="max-w-7xl mx-auto relative">
        {/* Two-column layout: text left + stats right */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left: brief intro */}
          <div className="lg:w-[40%] reveal">
            <p className="section-eyebrow mb-5">// 关于我</p>
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6 leading-snug"
              style={{ letterSpacing: '-0.03em', fontFamily: 'JetBrains Mono, monospace' }}
            >
              虚实融合的
              <br />
              探索者
            </h2>
            <p
              className="text-sm leading-loose mb-8"
              style={{ color: 'var(--color-text-secondary)', maxWidth: '380px' }}
            >
              专注于将物理世界的规律与工程数据
              精确还原至数字空间。擅长前后端的全栈研发，
              致力于用技术降低人们感知与理解复杂世界的门槛。
            </p>
            <a href="#projects" className="btn-ghost" style={{ fontSize: '13px', padding: '10px 20px' }}>
              查看作品集 →
            </a>
          </div>

          {/* Right: stats grid */}
          <div className="lg:w-[60%] w-full stagger-children">
            <div
              className="grid grid-cols-2 gap-px"
              style={{ background: 'rgba(0, 217, 255, 0.15)' }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-8 group"
                  style={{
                    background: '#1A1A1D',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = 'rgba(0, 217, 255, 0.05)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = '#1A1A1D')
                  }
                >
                  <p
                    className="text-5xl font-bold mb-2"
                    style={{ letterSpacing: '-0.04em', lineHeight: 1, fontFamily: 'JetBrains Mono, monospace', color: '#00D9FF' }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {stat.label}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                    {stat.sub}
                  </p>
                </div>
              ))}
              {Array.from({ length: stats.length % 2 }).map((_, i) => (
                <div key={`empty-${i}`} style={{ background: '#1A1A1D' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
