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

// 将所有技能扁平化并打乱
const getAllSkills = () => {
  const allSkills: { skill: string; color: string }[] = [];
  skillGroups.forEach((group) => {
    group.skills.forEach((skill) => {
      allSkills.push({ skill, color: group.color });
    });
  });
  return allSkills;
};

// Fisher-Yates 洗牌算法
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 将技能分配到多个流
const createMarqueeRows = (numRows: number) => {
  const allSkills = getAllSkills();
  const rows: { skill: string; color: string }[][] = Array.from({ length: numRows }, () => []);

  // 打乱技能顺序
  const shuffledSkills = shuffleArray(allSkills);

  // 均匀分配到各行
  shuffledSkills.forEach((skill, index) => {
    rows[index % numRows].push(skill);
  });

  // 每行再次打乱并重复3次以实现无缝循环
  return rows.map((row) => {
    const shuffledRow = shuffleArray(row);
    return [...shuffledRow, ...shuffledRow, ...shuffledRow];
  });
};

export default function SkillsSectionMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const numRows = 5; // 5 行弹幕流
  const marqueeRows = createMarqueeRows(numRows);

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
      className="relative py-14 sm:py-20 md:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ background: '#0E0E10' }}
    >
      {/* 背景装饰 */}
      <div className="unity-grid opacity-10" />

      <div className="max-w-7xl mx-auto relative mb-10 sm:mb-16">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
            <div className="w-8 sm:w-12 h-px" style={{ background: 'var(--color-unity-cyan)' }} />
            <p className="section-eyebrow">// 技术能力</p>
            <div className="w-8 sm:w-12 h-px" style={{ background: 'var(--color-unity-cyan)' }} />
          </div>

          <h2 className="section-title mb-6">
            构建复杂系统的
            <br />
            <span style={{ color: 'var(--color-text-tertiary)' }}>全栈技术储备</span>
          </h2>

          <p className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            从场景设计到系统架构，覆盖虚拟仿真与数字孪生全链路
          </p>
        </div>
      </div>

      {/* 弹幕瀑布流 */}
      <div className="relative py-4 sm:py-8 -mx-4 sm:mx-0">
        {marqueeRows.map((rowItems, rowIndex) => {
          const isEven = rowIndex % 2 === 0;
          const duration = 40 + rowIndex * 3; // 不同行不同速度

          return (
            <div
              key={rowIndex}
              className="mb-2 sm:mb-3 overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
              }}
            >
              {/* 滚动容器 */}
              <div className="relative flex">
                <div
                  className="flex gap-3"
                  style={{
                    animation: `marquee-${isEven ? 'left' : 'right'} ${duration}s linear infinite`,
                  }}
                >
                  {rowItems.map((item, index) => (
                    <div
                      key={`row${rowIndex}-${index}`}
                      className="flex-shrink-0 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer"
                      style={{
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}33`,
                        color: 'var(--color-text-primary)',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '13px',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${item.color}25`;
                        e.currentTarget.style.borderColor = `${item.color}66`;
                        e.currentTarget.style.boxShadow = `0 4px 20px ${item.color}33`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${item.color}15`;
                        e.currentTarget.style.borderColor = `${item.color}33`;
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {item.skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 底部统计 */}
      <div className="mt-12 sm:mt-20 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: '技术栈', value: skillGroups.length },
          { label: '总技能数', value: skillGroups.reduce((acc, g) => acc + g.skills.length, 0) },
          { label: '主力语言', value: 'C#' },
          { label: '开发经验', value: '2年+' },
        ].map((stat, i) => (
          <div
            key={i}
            className="text-center p-4 sm:p-6 rounded-xl"
            style={{
              background: 'rgba(0, 217, 255, 0.05)',
              border: '1px solid rgba(0, 217, 255, 0.1)',
            }}
          >
            <div
              className="text-2xl sm:text-3xl font-bold mb-2"
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

      {/* 动画样式 */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
