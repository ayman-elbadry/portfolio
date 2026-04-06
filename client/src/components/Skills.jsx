import { BrainCircuit, Monitor, Server, Database, Wrench, Globe, Layers } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

const categoryConfig = {
  ai:    { icon: BrainCircuit, label: 'Intelligence Artificielle & Data', iconClass: 'icon-ai',    tagClass: 'tag-ai' },
  front: { icon: Monitor,      label: 'Développement Front-end',         iconClass: 'icon-front',  tagClass: 'tag-front' },
  back:  { icon: Server,       label: 'Développement Back-end',          iconClass: 'icon-back',   tagClass: 'tag-back' },
  db:    { icon: Database,      label: 'Bases de données',               iconClass: 'icon-db',     tagClass: 'tag-db' },
  tool:  { icon: Wrench,        label: 'Outils & Déploiement',           iconClass: 'icon-tool',   tagClass: 'tag-tool' },
  lang:  { icon: Globe,         label: 'Langues',                        iconClass: 'icon-lang',   tagClass: 'tag-lang' },
};

export default function Skills({ skills }) {
  // Group skills by category
  const grouped = {};
  for (const s of skills) {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  }

  return (
    <section id="skills" className="py-24 px-6 bg-bg-alt">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader icon={Layers} tag="Compétences" title="Mon arsenal technique" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(categoryConfig).map(([key, cfg]) => {
            const items = grouped[key] || [];
            if (items.length === 0) return null;
            const Icon = cfg.icon;
            return (
              <div key={key} className="bg-surface border border-border rounded-2xl p-7 relative overflow-hidden group hover:border-border-h hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-reveal">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-[42px] h-[42px] min-w-[42px] flex items-center justify-center rounded-xl ${cfg.iconClass}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-sm font-bold text-white">{cfg.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <span key={skill._id} className={`px-3.5 py-1.5 rounded-full text-xs font-medium border ${cfg.tagClass} hover:-translate-y-0.5 transition-all cursor-default`}>
                      {skill.name}
                      {skill.icon && <small className="opacity-70 ml-1">({skill.icon})</small>}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
