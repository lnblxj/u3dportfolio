'use client';

import { useEffect, useState } from 'react';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: '作品', href: '#projects' },
    { label: '技术栈', href: '#skills' },
    { label: '关于', href: '#contact' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {} : { background: 'transparent' }}
    >
      <div
        className="transition-all duration-300"
        style={scrolled ? {
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          background: 'rgba(14,14,16,0.8)',
          borderBottom: '1px solid rgba(0, 217, 255, 0.1)',
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* 空白占位，保持布局 */}
          <div className="w-8" />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm transition-colors duration-200"
                style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-unity-cyan)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="mailto:hello@example.com" className="btn-ghost text-xs"
              style={{ padding: '8px 16px', fontSize: '13px' }}>
              联系我
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className="block w-5 h-px transition-all duration-200"
              style={{ background: 'var(--color-unity-cyan)', ...(menuOpen ? { transform: 'rotate(45deg) translateY(3px)' } : {}) }} />
            <span className="block w-5 h-px transition-all duration-200"
              style={{ background: 'var(--color-unity-cyan)', ...(menuOpen ? { transform: 'rotate(-45deg) translateY(-3px)' } : {}) }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-4 sm:px-6 pb-6 pt-2 flex flex-col gap-4 nav-blur"
            style={{ borderTop: '1px solid rgba(0, 217, 255, 0.1)' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm"
                style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="mailto:hello@example.com" className="btn-ghost text-sm w-fit"
              style={{ padding: '10px 20px', fontSize: '13px' }}>
              联系我
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
