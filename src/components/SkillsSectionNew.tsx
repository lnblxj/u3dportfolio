'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: '引擎',
    color: '#FBB040',
    skills: ['Unity3D', 'URP / HDRP', 'VR', 'DoTween', 'UniStorm', 'Animator', 'AI'],
  },
  {
    category: '开发语言',
    color: '#60A5FA',
    skills: ['C#', 'Java', 'Python', 'TypeScript', 'SQL', 'C++', 'Vue', 'HTML'],
  },
  {
    category: '数字孪生',
    color: '#34D399',
    skills: ['IoT 集成', 'WebSocket', 'MQTT', 'REST API'],
  },
  {
    category: '后端开发',
    color: '#A78BFA',
    skills: ['SpringBoot', 'JWT', 'Spring Cloud', 'Redis', 'Elasticsearch', 'MinIO', 'MyBatis-Plus', 'RabbitMQ'],
  },
  {
    category: '云服务',
    color: '#FB7185',
    skills: ['CDN', 'Docker', 'Debian', 'Workers', 'R2'],
  },
  {
    category: '工具链',
    color: '#FB923C',
    skills: ['Git', 'Blender', 'Figma', 'CI/CD', 'MySQL', 'PostgreSQL', 'MongoDB'],
  },
];

export default function SkillsSectionNew() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

          // 中心圆形动画
          if (circleRef.current && isDesktop) {
            gsap.from(circleRef.current, {
              scale: 0,
              opacity: 0,
              duration: 1.2,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: circleRef.current,
                start: 'top 70%',
              },
            });

            // 持续旋转
            gsap.to(circleRef.current, {
              rotation: 360,
              duration: 20,
              repeat: -1,
              ease: 'none',
            });
          }

          // 卡片动画 - 从中心向外扩散
          if (cardsRef.current) {
            const cards = cardsRef.current.querySelectorAll('.skill-card');

            // 设置初始状态为可见，避免闪烁
            gsap.set(cards, { opacity: 1, scale: 1 });

            gsap.from(cards, {
              scale: 0.8,
              opacity: 0,
              y: 40,
              duration: 0.6,
              stagger: 0.1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 80%',
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
      id="skills"
      className="relative py-20 md:py-32 px-6 overflow-hidden"
      style={{ background: '#0E0E10' }}
    >
      {/* 背景装饰 */}
      <div className="unity-grid opacity-10" />

      {/* 径向渐变背景 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.05) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px" style={{ background: 'var(--color-unity-cyan)' }} />
            <p className="section-eyebrow">// 技术能力</p>
            <div className="w-12 h-px" style={{ background: 'var(--color-unity-cyan)' }} />
          </div>

          <h2 className="section-title mb-6">
            构建复杂系统的
            <br />
            <span style={{ color: 'var(--color-text-tertiary)' }}>全栈技术储备</span>
          </h2>

          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            从场景设计到系统架构，覆盖虚拟仿真与数字孪生全链路
          </p>
        </div>

        {/* 技能展示 - 环形布局 */}
        <div className="relative">
          {/* 技能卡片网格 */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillGroups.map((group, index) => (
              <div
                key={group.category}
                className="skill-card group relative p-6 rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: '#1A1A1D',
                  border: '1px solid rgba(0, 217, 255, 0.1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    y: -8,
                    boxShadow: `0 20px 40px ${group.color}33`,
                    borderColor: `${group.color}66`,
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
                {/* 背景装饰 */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: group.color }}
                />

                {/* 类别标题 */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: `${group.color}22`,
                      border: `1px solid ${group.color}66`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: group.color }}
                    />
                  </div>
                  <h3
                    className="text-lg font-bold"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {group.category}
                  </h3>
                </div>

                {/* 技能标签 */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, i) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
                      style={{
                        background: `${group.color}15`,
                        border: `1px solid ${group.color}33`,
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'JetBrains Mono, monospace',
                        animationDelay: `${i * 50}ms`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* 技能数量标识 */}
                <div
                  className="absolute bottom-4 right-4 text-5xl font-bold opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: group.color }}
                >
                  {group.skills.length}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部统计 */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: '技术栈', value: skillGroups.length },
            { label: '总技能数', value: skillGroups.reduce((acc, g) => acc + g.skills.length, 0) },
            { label: '主力语言', value: 'C#' },
            { label: '开发经验', value: '2年+' },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-xl"
              style={{
                background: 'rgba(0, 217, 255, 0.05)',
                border: '1px solid rgba(0, 217, 255, 0.1)',
              }}
            >
              <div
                className="text-3xl font-bold mb-2"
                style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00D9FF' }}
              >
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
