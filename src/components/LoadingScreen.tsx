'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('./HeroSection'), {
  ssr: false,
});

interface LoadingScreenProps {
  onComplete: () => void;
  onVRReady: () => void;
  vrReady: boolean;
}

export default function LoadingScreen({ onComplete, onVRReady, vrReady }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    let completed = false;

    const completeLoading = () => {
      if (completed) return;
      completed = true;

      if (progressInterval) clearInterval(progressInterval);
      if (timeoutId) clearTimeout(timeoutId);

      setProgress(100);

      // Wait for progress bar animation to complete
      setTimeout(() => {
        // Fade out loading screen
        const loadingEl = document.querySelector('.loading-screen');
        if (loadingEl) {
          gsap.to(loadingEl, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              onComplete();
            },
          });
        } else {
          onComplete();
        }
      }, 300);
    };

    // Simulate progress - ensure it only increases
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return prev; // Stay at 90% waiting for VR ready
        }
        const increment = Math.random() * 15;
        return Math.min(prev + increment, 90);
      });
    }, 150);

    // Timeout protection: max 8 seconds
    timeoutId = setTimeout(() => {
      console.warn('Loading timeout reached, forcing completion');
      completeLoading();
    }, 8000);

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [onComplete]);

  // Complete loading when VR is ready
  useEffect(() => {
    if (vrReady && progress >= 90) {
      setProgress(100);
      setTimeout(() => {
        const loadingEl = document.querySelector('.loading-screen');
        if (loadingEl) {
          gsap.to(loadingEl, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              onComplete();
            },
          });
        } else {
          onComplete();
        }
      }, 300);
    }
  }, [vrReady, progress, onComplete]);

  return (
    <>
      {/* Hidden HeroSection that loads VR in background */}
      <div className="fixed inset-0 -z-50 invisible pointer-events-none">
        <HeroSection onVRReady={onVRReady} />
      </div>

      {/* Loading Screen Overlay */}
      <div
        className="loading-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #0E0E10 0%, #1A1A1D 100%)',
        }}
      >
        {/* Loading text */}
        <div className="text-center mb-8">
          <h2
            className="text-3xl font-bold mb-3"
            style={{
              color: '#00D9FF',
              letterSpacing: '-0.02em',
            }}
          >
            内容即将呈现
          </h2>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(0, 217, 255, 0.1)' }}>
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00D9FF 0%, #00F0FF 100%)',
              boxShadow: '0 0 10px rgba(0, 217, 255, 0.5)',
            }}
          />
        </div>

        {/* Progress percentage */}
        <div
          className="mt-4 text-sm font-mono"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {Math.round(progress)}%
        </div>

        {/* Decorative grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 217, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>
    </>
  );
}
