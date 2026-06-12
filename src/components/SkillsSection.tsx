'use client';

const skillGroups = [
  {
    category: '引擎',
    color: 'rgba(251,191,36,0.08)',
    textColor: 'rgba(251,191,36,0.85)',
    skills: ['Unity3D', 'URP / HDRP', 'VR', 'DoTween', 'UniStorm', 'Animator', 'AI'],
  },
  {
    category: '开发语言',
    color: 'rgba(96,165,250,0.08)',
    textColor: 'rgba(96,165,250,0.85)',
    skills: ['C#', 'Java', 'Python', 'TypeScript', 'SQL', 'C++', 'Vue', 'HTML'],
  },
  {
    category: '数字孪生',
    color: 'rgba(52,211,153,0.08)',
    textColor: 'rgba(52,211,153,0.85)',
    skills: ['IoT 集成', 'WebSocket', 'MQTT', 'REST API'],
  },
  {
    category: '后端开发',
    color: 'rgba(167,139,250,0.08)',
    textColor: 'rgba(167,139,250,0.85)',
    skills: ['SpringBoot', 'JWT', 'Spring Cloud', 'Redis', 'Elasticsearch', 'MinIO', 'MyBatis-Plus', 'RabbitMQ'],
  },
  {
    category: '云服务',
    color: 'rgba(251,113,133,0.08)',
    textColor: 'rgba(251,113,133,0.85)',
    skills: ['CDN', 'Docker', 'Debian', 'Workers', 'R2'],
  },
  {
    category: '工具链',
    color: 'rgba(251,146,60,0.08)',
    textColor: 'rgba(251,146,60,0.85)',
    skills: ['Git', 'Blender', 'Figma', 'CI/CD', 'MySQL', 'PostgreSQL', 'MongoDB'],
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-12 md:py-24 px-6 relative overflow-hidden"
      style={{ background: '#0E0E10', borderTop: '1px solid rgba(0, 217, 255, 0.1)' }}
    >
      {/* Unity grid background */}
      <div className="unity-grid opacity-20" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-8 md:mb-12 reveal">
          <p className="section-eyebrow mb-5">// 技术能力</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="section-title max-w-2xl">
              构建复杂系统的
              <br />
              <span style={{ color: 'var(--color-text-tertiary)' }}>全栈技术储备</span>
            </h2>
            <p
              className="text-sm max-w-xs lg:text-right leading-loose"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              从场景设计到系统架构，
              <br />
              覆盖虚拟仿真与数字孪生全链路
            </p>
          </div>
        </div>

        {/* Skills grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px stagger-children mt-6"
          style={{ background: 'rgba(0, 217, 255, 0.1)' }}
        >
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="p-6 md:p-8 group relative overflow-hidden"
              style={{
                background: '#1A1A1D',
                transition: 'background 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = group.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#1A1A1D';
              }}
            >
              {/* Category Title */}
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: group.textColor }}
                />
                <h3
                  className="text-base font-semibold"
                  style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="tag-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="divider mt-8 md:mt-12 reveal" />
      </div>
    </section>
  );
}
