'use client';

const skillGroups = [
  {
    category: '引擎与渲染',
    icon: '⬡',
    color: 'rgba(251,191,36,0.08)',
    borderColor: 'rgba(251,191,36,0.15)',
    iconColor: 'rgba(251,191,36,0.7)',
    skills: ['Unity3D', 'URP / HDRP', 'Shader Graph', 'VFX Graph', 'Particle System', 'Post Processing'],
  },
  {
    category: '编程语言',
    icon: '◈',
    color: 'rgba(96,165,250,0.08)',
    borderColor: 'rgba(96,165,250,0.15)',
    iconColor: 'rgba(96,165,250,0.7)',
    skills: ['C#', 'HLSL / GLSL', 'Python', 'TypeScript', 'SQL', 'Lua'],
  },
  {
    category: '数字孪生',
    icon: '◎',
    color: 'rgba(52,211,153,0.08)',
    borderColor: 'rgba(52,211,153,0.15)',
    iconColor: 'rgba(52,211,153,0.7)',
    skills: ['IoT 集成', 'WebSocket', 'MQTT', 'REST API', 'GIS / BIM', '时序数据库'],
  },
  {
    category: 'XR 开发',
    icon: '◇',
    color: 'rgba(167,139,250,0.08)',
    borderColor: 'rgba(167,139,250,0.15)',
    iconColor: 'rgba(167,139,250,0.7)',
    skills: ['XR Interaction Toolkit', 'Meta Quest', 'HTC Vive', 'AR Foundation', 'WebXR', 'OpenXR'],
  },
  {
    category: '仿真技术',
    icon: '○',
    color: 'rgba(251,113,133,0.08)',
    borderColor: 'rgba(251,113,133,0.15)',
    iconColor: 'rgba(251,113,133,0.7)',
    skills: ['物理引擎', 'Agent 仿真', 'NavMesh AI', 'GPU Instancing', 'LOD 优化', '流体仿真'],
  },
  {
    category: '工具链',
    icon: '▣',
    color: 'rgba(251,146,60,0.08)',
    borderColor: 'rgba(251,146,60,0.15)',
    iconColor: 'rgba(251,146,60,0.7)',
    skills: ['Git', 'Blender', 'Figma', 'Docker', 'Jenkins CI/CD', 'Jira'],
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-32 px-6 relative overflow-hidden"
      style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-20 reveal">
          <p className="section-eyebrow mb-5">技术能力</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="section-title max-w-2xl">
              构建复杂系统的
              <br />
              <span style={{ color: 'rgba(255,255,255,0.38)' }}>全栈技术储备</span>
            </h2>
            <p
              className="text-sm max-w-xs lg:text-right leading-loose"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              从底层着色器到系统架构，
              <br />
              覆盖虚拟仿真与数字孪生全链路
            </p>
          </div>
        </div>

        {/* Skills grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px stagger-children"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="p-8 group relative overflow-hidden"
              style={{
                background: '#000',
                transition: 'background 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = group.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#000';
              }}
            >
              {/* Icon */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                  style={{
                    background: group.color,
                    border: `1px solid ${group.borderColor}`,
                    color: group.iconColor,
                    fontFamily: 'monospace',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {group.icon}
                </div>
                <h3
                  className="text-sm font-semibold"
                  style={{ color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.01em' }}
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
        <div className="divider mt-20 reveal" />
      </div>
    </section>
  );
}
