import { useEffect, useState, useRef } from 'react';
import { FolderOpen, Send, ChevronsDown } from 'lucide-react';

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero({ profile }) {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden pt-[72px] pb-12 px-6">
      {/* Animated grid bg */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: 'linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        animation: 'grid-pulse 8s ease-in-out infinite',
      }} />

      {/* Glow orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-35 pointer-events-none bg-purple top-[10%] left-[15%]" style={{ animation: 'float-orb 12s ease-in-out infinite' }} />
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-35 pointer-events-none bg-cyan bottom-[10%] right-[15%]" style={{ animation: 'float-orb 12s ease-in-out infinite reverse' }} />

      <div className="relative z-10 max-w-[750px]">
        {/* Avatar */}
        <div className="relative w-[140px] h-[140px] mx-auto mb-8">
          <div className="absolute inset-[-4px] rounded-full bg-gradient" style={{ animation: 'ring-rotate 6s linear infinite' }}>
            <div className="absolute inset-[3px] rounded-full bg-bg" />
          </div>
          <img src="/images/avatar.png" alt={profile?.name || 'Avatar'} className="w-[140px] h-[140px] rounded-full object-cover relative z-10" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.25)] text-green px-4 py-1.5 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-green rounded-full" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
          Ouvert aux opportunités
        </div>

        {/* Title */}
        <p className="text-sm font-medium text-text-muted uppercase tracking-widest mb-1">Bonjour, je suis</p>
        <h1 className="text-4xl md:text-6xl font-black leading-tight text-gradient mb-4">
          {profile?.name || 'Aymane El Badry'}
        </h1>
        <p className="text-base md:text-lg text-text mb-4">
          Étudiant en <span className="text-gradient">Master d'Excellence en IA</span> & <span className="text-gradient">Développeur Web Full Stack</span>
        </p>
        <p className="text-sm text-text-muted max-w-[600px] mx-auto mb-8 leading-relaxed">
          {profile?.description || "Passionné par la conception d'architectures web robustes et le développement de modèles d'Intelligence Artificielle performants."}
        </p>

        {/* CTA */}
        <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
          <a href="#projects" className="inline-flex items-center gap-2 px-7 py-3 bg-gradient text-white font-semibold rounded-full glow-purple hover:-translate-y-0.5 transition-all">
            <FolderOpen size={18} /> Voir mes projets
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3 border border-border-h text-text font-semibold rounded-full hover:border-purple-l hover:text-purple-l hover:-translate-y-0.5 transition-all">
            <Send size={18} /> Me contacter
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 px-8 py-5 bg-[rgba(255,255,255,0.03)] border border-border rounded-2xl backdrop-blur-sm flex-wrap">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-gradient"><CountUp target={6} suffix="+" /></div>
            <div className="text-xs text-text-muted mt-1">Projets</div>
          </div>
          <div className="w-px h-10 bg-border-h hidden sm:block" />
          <div className="text-center">
            <div className="text-3xl font-extrabold text-gradient"><CountUp target={2} /></div>
            <div className="text-xs text-text-muted mt-1">Stages</div>
          </div>
          <div className="w-px h-10 bg-border-h hidden sm:block" />
          <div className="text-center">
            <div className="text-3xl font-extrabold text-gradient"><CountUp target={10} suffix="+" /></div>
            <div className="text-xs text-text-muted mt-1">Technologies</div>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 text-text-dim" style={{ animation: 'bounce-down 2s ease-in-out infinite' }}>
        <ChevronsDown size={28} />
      </a>
    </section>
  );
}
