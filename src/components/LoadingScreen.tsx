'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const completeDelayRef = useRef<NodeJS.Timeout | null>(null);
  const completedRef = useRef(false);

  const clearProgressTimers = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const completeLoading = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    clearProgressTimers();
    setProgress(100);

    completeDelayRef.current = setTimeout(() => {
      onComplete();
    }, 300);
  }, [clearProgressTimers, onComplete]);

  useEffect(() => {
    // Simulate progress - ensure it only increases
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return prev; // Stay at 90% waiting for VR ready
        }
        const increment = Math.random() * 15;
        return Math.min(prev + increment, 90);
      });
    }, 150);

    // Timeout protection: max 8 seconds
    timeoutRef.current = setTimeout(() => {
      console.warn('Loading timeout reached, forcing completion');
      completeLoading();
    }, 8000);

    return clearProgressTimers;
  }, [clearProgressTimers, completeLoading]);

  // Complete loading when VR is ready
  useEffect(() => {
    if (vrReady && progress >= 90) {
      completeLoading();
    }
  }, [vrReady, progress, completeLoading]);

  useEffect(() => {
    return () => {
      clearProgressTimers();
      if (completeDelayRef.current) {
        clearTimeout(completeDelayRef.current);
        completeDelayRef.current = null;
      }
    };
  }, [clearProgressTimers]);

  return (
    <>
      {/* Hidden HeroSection that loads VR in background */}
      <div className="fixed inset-0 -z-50 invisible pointer-events-none">
        <HeroSection onVRReady={onVRReady} />
      </div>

      {/* Loading Screen Overlay */}
      <div
        className="loading-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ background: '#000' }}
      >
        {/* Loading text */}
        <div className="text-center mb-8">
          <h2
            className="text-3xl font-bold mb-3"
            style={{
              color: '#fff',
              letterSpacing: '0',
            }}
          >
            内容即将呈现
          </h2>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 rounded-full overflow-hidden border border-white" style={{ background: '#000' }}>
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              background: '#fff',
            }}
          />
        </div>

        {/* Progress percentage */}
        <div
          className="mt-4 text-sm font-mono"
          style={{ color: '#fff' }}
        >
          {Math.round(progress)}%
        </div>
      </div>
    </>
  );
}
