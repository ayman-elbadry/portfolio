import * as LucideIcons from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import { Briefcase, MapPin } from 'lucide-react';

function getIcon(name) {
  // Convert kebab-case icon name to PascalCase
  const pascal = name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
  return LucideIcons[pascal] || LucideIcons.Circle;
}

function TimelineItem({ item, isLast }) {
  const Icon = getIcon(item.icon || 'building-2');
  return (
    <div className="relative mb-8 last:mb-0">
      {/* Marker */}
      <div className={`absolute left-[-40px] top-6 w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 ${item.isCurrent ? 'bg-purple border-purple-l text-white glow-purple' : 'bg-surface border-purple text-purple-l'}`}>
        <Icon size={14} />
      </div>

      {/* Card */}
      <div className="bg-surface border border-border rounded-2xl p-7 hover:border-border-h hover:translate-x-1 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
          <h3 className="text-lg font-bold text-white">{item.title}</h3>
          <span className={`font-mono text-xs px-3 py-1 rounded-full whitespace-nowrap border ${item.isCurrent ? 'bg-[rgba(16,185,129,0.1)] border-[rgba(16,185,129,0.3)] text-green' : 'bg-[rgba(124,58,237,0.1)] border-[rgba(124,58,237,0.2)] text-purple-l'}`}>
            {item.dates}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-text-muted mb-2">
          <MapPin size={14} /> {item.company} — {item.location}
        </span>
        <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
        {item.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {item.tags.map(tag => (
              <span key={tag} className="text-xs px-2.5 py-1 bg-[rgba(124,58,237,0.1)] text-purple-l rounded-full font-medium">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Experience({ experiences }) {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader icon={Briefcase} tag="Expérience" title="Parcours professionnel" />

        <div className="max-w-[720px] mx-auto relative pl-10">
          {/* Timeline line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple via-cyan to-transparent rounded-full" />
          {experiences.map((item, i) => (
            <TimelineItem key={item._id} item={item} isLast={i === experiences.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Education({ education }) {
  return (
    <section id="education" className="py-24 px-6 bg-bg-alt">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader icon={LucideIcons.GraduationCap} tag="Formation" title="Parcours académique" />

        <div className="max-w-[720px] mx-auto relative pl-10">
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple via-cyan to-transparent rounded-full" />
          {education.map((item, i) => (
            <TimelineItem key={item._id} item={item} isLast={i === education.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
