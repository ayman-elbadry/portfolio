import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import { GithubIcon } from './ui/BrandIcons';
import { FolderOpen } from 'lucide-react';

function getIcon(name) {
  const pascal = name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
  return LucideIcons[pascal] || LucideIcons.Folder;
}

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const filters = [
    { key: 'all', label: 'Tous' },
    { key: 'ai', label: 'Intelligence Artificielle' },
    { key: 'web', label: 'Développement Web' },
  ];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader icon={FolderOpen} tag="Projets" title="Mes réalisations" />

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {filters.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${filter === f.key ? 'bg-gradient text-white border-transparent glow-purple' : 'bg-transparent border-border text-text-muted hover:text-white hover:border-border-h'}`}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(project => {
            const Icon = getIcon(project.icon || 'folder');
            const isAI = project.category === 'ai';
            return (
              <div key={project._id} className="bg-surface border border-border rounded-3xl p-7 relative overflow-hidden group hover:border-purple hover:-translate-y-1.5 hover:shadow-[0_8px_48px_rgba(0,0,0,0.5),0_0_40px_rgba(124,58,237,0.35)] transition-all duration-300 flex flex-col animate-reveal">
                {/* Glow */}
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(124,58,237,0.35)_0%,transparent_60%)] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-center justify-between mb-5 relative z-10">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${isAI ? 'icon-ai' : 'icon-front'}`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-semibold text-text-dim uppercase tracking-wide">
                    {isAI ? 'Intelligence Artificielle' : 'Développement Web'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 relative z-10">{project.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed flex-1 mb-5 relative z-10">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mt-auto relative z-10">
                  {project.tags?.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 bg-[rgba(255,255,255,0.05)] border border-border text-text-muted rounded-full font-medium">{tag}</span>
                  ))}
                </div>

                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="absolute top-5 right-5 text-text-dim hover:text-purple-l transition-colors z-10">
                    <GithubIcon size={20} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
