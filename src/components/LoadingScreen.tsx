'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
  heroImageUrl: string;
}

export default function LoadingScreen({ onComplete, heroImageUrl }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

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

      // 等待一小段时间让进度条完成动画
      setTimeout(() => {
        setIsLoaded(true);

        // 淡出加载屏幕
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

    // 预加载 Hero 图片
    const img = new Image();

    // 模拟进度条
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    // 图片加载成功
    img.onload = () => {
      completeLoading();
    };

    // 图片加载失败
    img.onerror = () => {
      console.warn('Hero image failed to load, continuing anyway');
      completeLoading();
    };

    // 设置超时保护：最多等待 5 秒
    timeoutId = setTimeout(() => {
      console.warn('Loading timeout reached, forcing completion');
      completeLoading();
    }, 5000);

    // 开始加载图片
    img.src = heroImageUrl;

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [heroImageUrl, onComplete]);

  return (
    <div
      className="loading-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #0E0E10 0%, #1A1A1D 100%)',
      }}
    >
      {/* 加载文本 */}
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold mb-3"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            color: '#00D9FF',
            letterSpacing: '-0.02em',
          }}
        >
          内容即将呈现
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
          正在加载虚拟世界...
        </p>
      </div>

      {/* 进度条 */}
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

      {/* 进度百分比 */}
      <div
        className="mt-4 text-sm font-mono"
        style={{ color: 'var(--color-text-tertiary)', fontFamily: 'JetBrains Mono, monospace' }}
      >
        {Math.round(progress)}%
      </div>

      {/* 装饰网格 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 217, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
