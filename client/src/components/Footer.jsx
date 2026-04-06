import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './ui/BrandIcons';

export default function Footer({ profile }) {
  return (
    <footer className="py-10 border-t border-border bg-bg">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between flex-wrap gap-4 max-md:flex-col max-md:text-center">
        <Link to="/" className="font-mono text-lg font-bold text-white">
          <span className="text-purple-l">&lt;</span>AEB<span className="text-purple-l">/&gt;</span>
        </Link>
        <p className="text-sm text-text-muted">
          Conçu et développé par <strong className="text-white">Aymane El Badry</strong> — 2025
        </p>
        <div className="flex gap-3">
          {[
            { icon: LinkedinIcon, href: profile?.linkedin || '#', label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${profile?.email || 'elbaderyayman47@gmail.com'}`, label: 'Email' },
            { icon: GithubIcon, href: profile?.github || '#', label: 'GitHub' },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="w-10 h-10 flex items-center justify-center bg-surface border border-border rounded-xl text-text-muted hover:text-purple-l hover:border-purple hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] transition-all">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
