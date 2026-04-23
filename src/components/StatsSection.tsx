'use client';

const stats = [
  { value: '20+', label: '已交付项目', sub: '覆盖教育 · 工业 · 城市' },
  { value: '3年+', label: 'Unity3D 经验', sub: '虚拟仿真与数字孪生' },
  { value: '5万+', label: '用户使用', sub: '国家虚仿平台接入' },
  { value: '6项', label: '知识产权', sub: '软著及发明专利' },
];

export default function StatsSection() {
  return (
    <section
      className="relative px-6 py-28 overflow-hidden"
      style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Two-column layout: text left + stats right */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left: brief intro */}
          <div className="lg:w-[40%] reveal">
            <p className="section-eyebrow mb-5">关于我</p>
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6 leading-snug"
              style={{ letterSpacing: '-0.03em' }}
            >
              虚实融合的
              <br />
              探索者
            </h2>
            <p
              className="text-sm leading-loose mb-8"
              style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '380px' }}
            >
              深耕 Unity3D 领域，专注于将物理世界的规律与工程数据
              精确还原至数字空间。擅长从底层渲染到系统架构的全链路研发，
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
              style={{ background: 'rgba(255,255,255,0.07)' }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-8 group"
                  style={{
                    background: '#000',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = '#000')
                  }
                >
                  <p
                    className="text-5xl font-bold mb-2"
                    style={{ letterSpacing: '-0.04em', lineHeight: 1 }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                  >
                    {stat.label}
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
