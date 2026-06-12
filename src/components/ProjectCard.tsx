'use client';

import { useState, useRef, useEffect } from 'react';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (showVideo || project.images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % project.images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [showVideo, project.images.length, activeSlide]);

  const goTo = (i: number) => {
    setActiveSlide(i);
    setShowVideo(false);
  };

  const prev = () => goTo((activeSlide - 1 + project.images.length) % project.images.length);
  const next = () => goTo((activeSlide + 1) % project.images.length);

  const isEven = index % 2 === 0;
  const categoryLabel = project.category === 'digital-twin' ? '数字孪生' : '虚拟仿真';
  const categoryColor = project.category === 'digital-twin'
    ? 'rgba(96,165,250,0.15)'
    : 'rgba(167,139,250,0.15)';
  const categoryTextColor = project.category === 'digital-twin'
    ? 'rgb(147,197,253)'
    : 'rgb(196,181,253)';

  return (
    <div
      ref={cardRef}
      className={`project-card group w-full rounded-2xl overflow-hidden reveal${isEven ? '' : '-right'} ${isVisible ? 'visible' : ''}`}
      style={{
        background: '#1A1A1D',
        border: '1px solid rgba(0, 217, 255, 0.1)',
        transitionDelay: `${index * 60}ms`,
      }}
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        {/* Media section */}
        <div className="relative lg:w-[55%] aspect-video lg:aspect-auto overflow-hidden min-h-[200px] sm:min-h-[250px] lg:min-h-[320px]">
          {showVideo && project.videoUrl ? (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <video
                src={project.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain outline-none"
                title={project.title}
              />
            </div>
          ) : (
            <>
              {/* Carousel */}
              <div ref={carouselRef} className="relative w-full h-full overflow-hidden">
                <div
                  className="carousel-track absolute inset-0"
                  style={{ width: `${project.images.length * 100}%`, transform: `translateX(-${activeSlide * (100 / project.images.length)}%)` }}
                >
                  {project.images.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="object-cover"
                      style={{ width: `${100 / project.images.length}%`, height: '100%', float: 'left' }}
                      loading="lazy"
                    />
                  ))}
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background: isEven
                      ? 'linear-gradient(to right, transparent 70%, rgba(0,0,0,0.5) 100%)'
                      : 'linear-gradient(to left, transparent 70%, rgba(0,0,0,0.5) 100%)'
                  }}
                />

                {/* Carousel controls */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
                      aria-label="Previous"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10 12L6 8L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
                      aria-label="Next"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4L10 8L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Slide dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className="rounded-full transition-all duration-200"
                      style={{
                        width: i === activeSlide ? '20px' : '6px',
                        height: '6px',
                        background: i === activeSlide ? '#fff' : 'rgba(255,255,255,0.4)',
                      }}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Year badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="text-xs font-mono"
              style={{ color: 'rgba(255,255,255,0.5)' }}>
              {project.year}
            </span>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 right-4 z-10">
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                background: categoryColor,
                color: categoryTextColor,
                border: `1px solid ${categoryTextColor}33`,
              }}
            >
              {categoryLabel}
            </span>
          </div>
        </div>

        {/* Content section */}
        <div className="flex flex-col justify-center lg:w-[45%] p-6 md:p-8 lg:p-10 xl:p-12">
          {/* Highlight */}
          {project.highlight && (
            <p className="text-xs font-mono mb-3" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
              ● {project.highlight}
            </p>
          )}

          {/* Title */}
          <h3 className="text-2xl lg:text-3xl font-bold mb-1 leading-tight" style={{ letterSpacing: '-0.02em' }}>
            {project.title}
          </h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {project.videoUrl && (
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="btn-ghost text-sm py-2.5 px-5"
                style={{ padding: '10px 20px', fontSize: '13px' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <polygon points="4,2 12,7 4,12" fill="currentColor" />
                </svg>
                {showVideo ? '查看截图' : '演示视频'}
              </button>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
                style={{ padding: '10px 20px', fontSize: '13px' }}
              >
                在线体验
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                title="GitHub"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
