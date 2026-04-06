import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '#about', label: 'À propos' },
  { href: '#skills', label: 'Compétences' },
  { href: '#experience', label: 'Expérience' },
  { href: '#education', label: 'Formation' },
  { href: '#projects', label: 'Projets' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, href) => {
    if (isHome && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      setOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 h-[72px] z-50 transition-all duration-300 ${scrolled ? 'bg-[rgba(6,6,14,0.85)] backdrop-blur-xl border-b border-border shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="font-mono text-xl font-bold text-white">
          <span className="text-purple-l">&lt;</span>AEB<span className="text-purple-l">/&gt;</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <li key={item.href}>
              <a href={item.href} onClick={(e) => handleClick(e, item.href)}
                className="px-4 py-2 text-sm font-medium text-text-muted rounded-full hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" onClick={(e) => handleClick(e, '#contact')}
              className="px-5 py-2 text-sm font-medium text-white bg-gradient rounded-full hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] transition-all">
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-text p-1" aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-[rgba(6,6,14,0.97)] backdrop-blur-xl border-b border-border p-6 flex flex-col gap-2">
          {navItems.map(item => (
            <a key={item.href} href={item.href} onClick={(e) => handleClick(e, item.href)}
              className="w-full text-center py-3 text-text-muted hover:text-white rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-all">
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={(e) => handleClick(e, '#contact')}
            className="w-full text-center py-3 mt-2 text-white bg-gradient rounded-full">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
