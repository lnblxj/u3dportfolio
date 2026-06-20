'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

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

          if (reduceMotion || !cardRef.current) return;

          // 滚动触发进入动画
          gsap.from(cardRef.current, {
            y: 80,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });

          // 鼠标悬停 3D 倾斜效果
          const card = cardRef.current;
          const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            gsap.to(card, {
              rotationX: rotateX,
              rotationY: rotateY,
              transformPerspective: 1000,
              duration: 0.3,
              ease: 'power2.out',
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              duration: 0.5,
              ease: 'power2.out',
            });
          };

          card.addEventListener('mousemove', handleMouseMove);
          card.addEventListener('mouseleave', handleMouseLeave);

          return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
          };
        }
      );

      return () => mm.revert();
    }, cardRef);

    return () => ctx.revert();
  }, []);

  // 图片轮播
  useEffect(() => {
    if (showVideo || project.images.length <= 1) return;
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % project.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [showVideo, project.images.length]);

  // 图片切换动画
  useEffect(() => {
    if (showVideo || !imageRef.current) return;
    const sliderContainer = imageRef.current.querySelector('.slider-wrapper');
    if (sliderContainer) {
      gsap.to(sliderContainer, {
        x: `-${activeImage * 100}%`,
        duration: 0.6,
        ease: 'power2.inOut',
      });
    }
  }, [activeImage, showVideo]);

  const categoryLabel = project.category === 'digital-twin' ? '数字孪生' : '虚拟仿真';
  const categoryColor = project.category === 'digital-twin' ? '#F4F7FA' : '#B8B8C2';

  return (
    <div
      ref={cardRef}
      className="group relative w-full rounded-2xl overflow-hidden cursor-pointer transition-colors duration-300"
      style={{
        background: '#0E0E10',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#1A1A1D';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#0E0E10';
      }}
    >
      {/* 图片容器 */}
      <div
        ref={imageRef}
        className="relative w-full aspect-video overflow-hidden bg-black"
      >
        {showVideo && project.videoUrl ? (
          <video
            src={project.videoUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            {/* 图片滑动轨道 */}
            <div className="slider-wrapper flex h-full" style={{ width: '100%' }}>
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className="slider-item flex-shrink-0 w-full h-full relative overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${project.title} - ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{
                      transform: i === activeImage ? 'scale(1)' : 'scale(1)',
                    }}
                    onMouseEnter={(e) => {
                      if (i === activeImage) {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </div>
              ))}
            </div>
            {/* 渐变遮罩 */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(14,14,16,0.8) 0%, transparent 50%)',
              }}
            />
          </>
        )}

        {/* 年份标签 */}
        <div
          className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2.5 sm:px-3 py-1 rounded-lg backdrop-blur-md"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.24)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px',
            color: 'var(--color-text-primary)',
          }}
        >
          {project.year}
        </div>

        {/* 类别标签 */}
        <div
          className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2.5 sm:px-3 py-1 rounded-lg backdrop-blur-md"
          style={{
            background: `${categoryColor}22`,
            border: `1px solid ${categoryColor}66`,
            fontSize: '12px',
            color: categoryColor,
            fontWeight: 600,
          }}
        >
          {categoryLabel}
        </div>

        {/* 图片指示器 */}
        {project.images.length > 1 && !showVideo && (
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeImage ? '24px' : '8px',
                  height: '8px',
                  background: i === activeImage ? '#fff' : 'rgba(255,255,255,0.3)',
                }}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div ref={contentRef} className="p-4 sm:p-6">
        {/* 高亮标签 */}
        {project.highlight && (
          <div
            className="inline-flex items-center gap-2 mb-3 text-xs"
            style={{ color: 'var(--color-text-tertiary)', fontFamily: 'JetBrains Mono, monospace' }}
          >
            {project.highlight}
          </div>
        )}

        {/* 标题 */}
        <h3
          className="text-lg sm:text-xl font-bold mb-2 leading-tight group-hover:text-gradient-cyan transition-all duration-300"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '-0.01em',
          }}
        >
          {project.title}
        </h3>

        {/* 副标题 */}
        <p className="text-xs mb-3" style={{ color: 'var(--color-text-tertiary)' }}>
          {project.subtitle}
        </p>

        {/* 描述 */}
        <p className="text-sm mb-4 leading-relaxed mobile-line-clamp" style={{ color: 'var(--color-text-secondary)' }}>
          {project.description}
        </p>

        {/* 标签 */}
        <div ref={tagsRef} className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col min-[380px]:flex-row flex-wrap items-stretch min-[380px]:items-center gap-3">
          {project.videoUrl && (
            <button
              onClick={() => setShowVideo(!showVideo)}
              className="btn-ghost text-xs"
              style={{ padding: '8px 16px' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <polygon points="3,2 10,6 3,10" fill="currentColor" />
              </svg>
              {showVideo ? '查看截图' : '演示视频'}
            </button>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs"
              style={{ padding: '8px 16px' }}
            >
              在线体验
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 8L8 2M8 2H3.5M8 2V6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="GitHub"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* 发光边框效果 */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.18)',
        }}
      />
    </div>
  );
}
