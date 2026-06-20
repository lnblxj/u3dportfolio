'use client';

import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: '引擎',
    skills: ['Unity3D', 'URP / HDRP', 'VR', 'DoTween', 'UniStorm', 'Animator', 'AI'],
  },
  {
    category: '开发语言',
    skills: ['C#', 'Java', 'Python', 'TypeScript', 'SQL', 'C++', 'Vue', 'HTML'],
  },
  {
    category: '数字孪生',
    skills: ['IoT 集成', 'WebSocket', 'MQTT', 'REST API'],
  },
  {
    category: '后端开发',
    skills: ['SpringBoot', 'JWT', 'Spring Cloud', 'Redis', 'Elasticsearch', 'MinIO', 'MyBatis-Plus', 'RabbitMQ'],
  },
  {
    category: '云服务',
    skills: ['CDN', 'Docker', 'Debian', 'Workers', 'R2'],
  },
  {
    category: '工具链',
    skills: ['Git', 'Blender', 'Figma', 'CI/CD', 'MySQL', 'PostgreSQL', 'MongoDB'],
  },
];

const prioritySkills = new Set(['Unity3D', 'VR', 'C#', 'WebSocket', 'MQTT', 'SpringBoot', 'Blender', 'Docker']);

type SkillItem = { skill: string; group: string };

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createMarqueeRows = (numRows: number) => {
  const allSkills: SkillItem[] = [];

  skillGroups.forEach((group) => {
    group.skills.forEach((skill) => {
      allSkills.push({ skill, group: group.category });
    });
  });

  const rows: SkillItem[][] = Array.from({ length: numRows }, () => []);
  const shuffledSkills = shuffleArray(allSkills);

  shuffledSkills.forEach((skill, index) => {
    rows[index % numRows].push(skill);
  });

  return rows.map((row) => {
    const shuffledRow = shuffleArray(row);
    return [...shuffledRow, ...shuffledRow, ...shuffledRow];
  });
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeRows = useMemo(() => createMarqueeRows(5), []);

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

          gsap.from(headerRef.current, {
            y: 48,
            opacity: 0,
            duration: 0.9,
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
      className="skills-marquee-surface relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 md:py-32"
    >
      <div className="unity-grid opacity-10" />

      <div className="relative mx-auto mb-10 max-w-7xl sm:mb-16">
        <div ref={headerRef} className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3 sm:mb-6">
            <div className="h-px w-8 sm:w-12" style={{ background: 'var(--color-ue-blue)' }} />
            <p className="section-eyebrow">// 技术能力</p>
          </div>

          <h2 className="section-title mb-6">
            构建复杂系统的
            <br />
            <span style={{ color: 'var(--color-text-tertiary)' }}>全栈技术储备</span>
          </h2>

          <p className="max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: 'var(--color-text-secondary)' }}>
            从场景设计到系统架构，覆盖虚拟仿真与数字孪生全链路。
          </p>
        </div>
      </div>

      <div className="relative -mx-4 py-4 sm:mx-0 sm:py-8">
        {marqueeRows.map((rowItems, rowIndex) => {
          const isEven = rowIndex % 2 === 0;
          const duration = 40 + rowIndex * 3;

          return (
            <div
              key={rowIndex}
              className="mb-2 overflow-hidden sm:mb-3"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)',
              }}
            >
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
                      className="skill-chip cursor-pointer"
                      data-priority={prioritySkills.has(item.skill)}
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
