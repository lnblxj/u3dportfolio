'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

const categoryLabel = {
  'virtual-simulation': 'Virtual Simulation',
  'digital-twin': 'Digital Twin',
} as const;

function drawCover(ctx: CanvasRenderingContext2D, source: CanvasImageSource, width: number, height: number) {
  const sourceWidth =
    source instanceof HTMLVideoElement ? source.videoWidth : source instanceof HTMLImageElement ? source.naturalWidth : width;
  const sourceHeight =
    source instanceof HTMLVideoElement ? source.videoHeight : source instanceof HTMLImageElement ? source.naturalHeight : height;

  if (!sourceWidth || !sourceHeight) return;

  const scale = Math.max(width / sourceWidth, height / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  ctx.drawImage(source, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [imageChangeTick, setImageChangeTick] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoFrameRef = useRef(0);
  const activeIndexRef = useRef(0);

  const activeProject = projects[activeIndex];
  const activeImage = activeProject.images[activeImageIndex] ?? activeProject.images[0];
  const projectCount = projects.length;
  const firstImages = useMemo(() => projects.map((project) => project.images[0]), []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    setActiveImageIndex(0);
    setShowVideo(false);
  }, [activeIndex]);

  useEffect(() => {
    if (showVideo || activeProject.images.length <= 1) return;

    const timer = window.setTimeout(() => {
      setActiveImageIndex((current) => (current + 1) % activeProject.images.length);
    }, 4200);

    return () => window.clearTimeout(timer);
  }, [activeProject.images.length, activeIndex, activeImageIndex, imageChangeTick, showVideo]);

  const updateActiveImage = (updater: number | ((current: number) => number)) => {
    setImageChangeTick((current) => current + 1);
    setActiveImageIndex(updater);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || showVideo) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 320;
    const height = 180;
    canvas.width = width;
    canvas.height = height;

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = activeImage;
    image.onload = () => {
      ctx.clearRect(0, 0, width, height);
      drawCover(ctx, image, width, height);
    };
  }, [activeImage, showVideo]);

  useEffect(() => {
    window.cancelAnimationFrame(videoFrameRef.current);
    if (!showVideo) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 320;
    const height = 180;
    canvas.width = width;
    canvas.height = height;

    const drawVideoFrame = () => {
      if (video.readyState >= 2) {
        ctx.clearRect(0, 0, width, height);
        drawCover(ctx, video, width, height);
      }
      videoFrameRef.current = window.requestAnimationFrame(drawVideoFrame);
    };

    drawVideoFrame();
    return () => window.cancelAnimationFrame(videoFrameRef.current);
  }, [showVideo, activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop?: boolean;
            reduceMotion?: boolean;
          };

          if (!isDesktop || reduceMotion) return;

          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${projectCount * window.innerHeight}`,
            pin,
            scrub: 0.65,
            anticipatePin: 1,
            onUpdate: (self) => {
              const nextIndex = Math.min(projectCount - 1, Math.floor(self.progress * projectCount));

              if (nextIndex !== activeIndexRef.current) {
                activeIndexRef.current = nextIndex;
                setActiveIndex(nextIndex);
              }

              gsap.to(progressRef.current, {
                scaleX: self.progress,
                transformOrigin: 'left center',
                duration: 0.24,
                ease: 'power2.out',
                overwrite: true,
              });
            },
          });
        }
      );

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, [projectCount]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const media = mediaRef.current;
    const copy = copyRef.current;
    if (!media || !copy) return;

    gsap.fromTo(
      media,
      { autoAlpha: 0, scale: 0.94, x: 42, filter: 'brightness(0.7) saturate(0.85)' },
      {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        filter: 'brightness(1) saturate(1)',
        duration: 0.78,
        ease: 'power4.out',
        overwrite: true,
      }
    );

    gsap.fromTo(
      copy.querySelectorAll('[data-project-copy]'),
      { autoAlpha: 0, y: 26 },
      { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.055, ease: 'power3.out', overwrite: true }
    );

    gsap.fromTo(
      copy.querySelectorAll('[data-project-tag]'),
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.035, ease: 'power2.out', overwrite: true }
    );
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-showcase relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:min-h-screen lg:py-0"
    >
      <div className="lg:hidden">
        <div className="mb-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--color-ue-blue)]" />
            <p className="section-eyebrow">// Selected Projects</p>
          </div>
          <h2 className="section-title mb-4">精选项目</h2>
        </div>

        <div className="grid gap-6">
          {projects.map((project, projectIndex) => (
            <article key={project.id} className="mobile-project-card">
              <div className="mobile-project-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.images[0]} alt={project.title} />
                <span>{String(projectIndex + 1).padStart(2, '0')}</span>
              </div>
              <div className="p-5">
                <p className="mb-3 text-xs font-semibold" style={{ color: 'var(--color-ue-blue)' }}>
                  {categoryLabel[project.category]}
                </p>
                <h3 className="mb-3 text-2xl font-bold leading-tight">{project.title}</h3>
                <p className="mb-4 text-sm leading-7" style={{ color: 'var(--color-text-secondary)' }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-slide-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div ref={pinRef} className="relative z-10 mx-auto hidden min-h-screen max-w-7xl items-center lg:flex">
        <div className="project-immersive-bg" aria-hidden="true">
          <canvas ref={canvasRef} />
        </div>
        <div className="projects-atmosphere" />

        <div className="relative z-10 grid w-full gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12">
          <div ref={copyRef} className="max-w-2xl lg:pt-10">
            <div data-project-copy className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--color-ue-blue)]" />
              <p className="section-eyebrow">// Selected Projects</p>
            </div>

            <p data-project-copy className="mb-4 font-mono text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(projectCount).padStart(2, '0')}
            </p>

            <p
              data-project-copy
              className="mb-4 inline-flex rounded-md border px-3 py-1 text-xs font-semibold"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.22)',
                background: 'rgba(255, 255, 255, 0.07)',
                color: 'var(--color-text-primary)',
              }}
            >
              {categoryLabel[activeProject.category]}
            </p>

            <h2 data-project-copy className="project-slide-title mb-4">
              {activeProject.title}
            </h2>

            <p data-project-copy className="mb-3 text-sm leading-relaxed sm:text-base" style={{ color: 'var(--color-text-tertiary)' }}>
              {activeProject.subtitle}
            </p>

            <p data-project-copy className="mb-7 max-w-xl text-sm leading-7 sm:text-base" style={{ color: 'var(--color-text-secondary)' }}>
              {activeProject.description}
            </p>

            <div className="mb-8 flex flex-wrap gap-2">
              {activeProject.tags.map((tag) => (
                <span key={tag} data-project-tag className="project-slide-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div data-project-copy className="flex flex-col gap-3 min-[420px]:flex-row">
              {activeProject.videoUrl && (
                <button type="button" onClick={() => setShowVideo((value) => !value)} className="btn-primary">
                  {showVideo ? '查看截图' : '演示视频'}
                </button>
              )}
              {activeProject.demoUrl && (
                <a href={activeProject.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  在线体验
                </a>
              )}
              {activeProject.githubUrl && (
                <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  GitHub
                </a>
              )}
            </div>
          </div>

          <div className="relative">
            <div ref={mediaRef} className="project-slide-media">
              {showVideo && activeProject.videoUrl ? (
                <video ref={videoRef} src={activeProject.videoUrl} controls autoPlay playsInline className="h-full w-full object-cover" />
              ) : (
                <div className="project-image-track" style={{ transform: `translate3d(-${activeImageIndex * 100}%, 0, 0)` }}>
                  {activeProject.images.map((image, index) => (
                    <div key={image} className="project-image-frame">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image} alt={`${activeProject.title} - ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}

              <div className="project-slide-media-overlay" />
              <div className="absolute left-4 top-4 rounded-md border border-white/15 bg-black/35 px-3 py-1 font-mono text-xs text-white/80 backdrop-blur-md">
                {activeProject.year}
              </div>

              {!showVideo && activeProject.images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="project-image-nav left-4"
                    aria-label="上一张项目图片"
                    onClick={() => updateActiveImage((current) => (current === 0 ? activeProject.images.length - 1 : current - 1))}
                  >
                    <span aria-hidden="true">&lsaquo;</span>
                  </button>
                  <button
                    type="button"
                    className="project-image-nav right-4"
                    aria-label="下一张项目图片"
                    onClick={() => updateActiveImage((current) => (current + 1) % activeProject.images.length)}
                  >
                    <span aria-hidden="true">&rsaquo;</span>
                  </button>
                  <div className="project-image-dots">
                    {activeProject.images.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        aria-label={`切换到第 ${index + 1} 张项目图片`}
                        data-active={index === activeImageIndex}
                        onClick={() => updateActiveImage(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="mt-5 hidden grid-cols-5 gap-2 lg:grid">
              {firstImages.map((image, index) => (
                <button
                  key={projects[index].id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="project-thumb"
                  data-active={index === activeIndex}
                  aria-label={`切换到项目 ${index + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 hidden px-4 lg:block">
          <div className="mx-auto h-px max-w-7xl overflow-hidden bg-white/10">
            <div ref={progressRef} className="h-full origin-left scale-x-0 bg-[var(--color-ue-blue)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
