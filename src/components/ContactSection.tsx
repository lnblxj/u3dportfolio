'use client';

const contacts = [
  {
    label: '博客',
    value: 'sboxm.top',
    href: 'https://sboxm.top',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 8h6M7 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    description: '技术文章 · 项目分享 · 学习笔记',
  },
  {
    label: 'GitHub',
    value: 'github.com/yourname',
    href: 'https://github.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    description: '开源代码 · 项目仓库 · 贡献记录',
  },
  {
    label: '邮件',
    value: 'hello@example.com',
    href: 'mailto:hello@example.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    description: '项目合作 · 技术交流 · 工作机会',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6" style={{ background: '#000' }}>
      <div className="max-w-7xl mx-auto">
        {/* Divider */}
        <div className="divider mb-32 reveal" />

        {/* Header */}
        <div className="max-w-2xl mb-20 reveal">
          <p className="section-eyebrow mb-4">联系方式</p>
          <h2 className="section-title mb-6">
            期待与你交流
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            无论是项目合作、技术探讨，还是工作机会，都欢迎通过以下方式联系我。
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px stagger-children"
          style={{ background: 'rgba(255,255,255,0.06)' }}>
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="block p-8 group"
              style={{
                background: '#000',
                textDecoration: 'none',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#000')}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                }}>
                {contact.icon}
              </div>

              {/* Label */}
              <p className="text-xs font-semibold mb-2"
                style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {contact.label}
              </p>

              {/* Value */}
              <p className="text-base font-medium mb-2 group-hover:text-white transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.01em' }}>
                {contact.value}
              </p>

              {/* Description */}
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {contact.description}
              </p>

              {/* Arrow */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 divider reveal" />
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 reveal">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '-0.01em' }}>
            © 2024 Portfolio. Built with Unity3D · Next.js · Three.js
          </p>
          <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Virtual Simulation &amp; Digital Twin Direction
          </p>
        </div>
      </div>
    </section>
  );
}
