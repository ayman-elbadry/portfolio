import { Code2, Brain, Lightbulb, Target, Puzzle, Users, MapPin, GraduationCap, Briefcase, Languages } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import { User } from 'lucide-react';

export default function About({ profile }) {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader icon={User} tag="À propos" title="Qui suis-je ?" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
          {/* Text */}
          <div className="animate-reveal">
            <p className="text-text-muted mb-4">
              Étudiant de <strong className="text-white font-semibold">21 ans</strong> basé à <strong className="text-white font-semibold">Casablanca, Maroc</strong>, je suis animé par une double passion :
            </p>

            <div className="flex flex-col gap-5 my-8">
              <div className="flex gap-5 p-5 bg-surface border border-border rounded-2xl hover:border-purple hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:-translate-y-0.5 transition-all group max-md:flex-col">
                <div className="w-12 h-12 min-w-12 flex items-center justify-center bg-[rgba(124,58,237,0.15)] text-purple-l rounded-xl">
                  <Code2 size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Ingénierie Logicielle</h3>
                  <p className="text-sm text-text-muted">Maîtrise des frameworks modernes — Angular, React, .NET et Laravel — pour concevoir des applications web performantes et scalables.</p>
                </div>
              </div>
              <div className="flex gap-5 p-5 bg-surface border border-border rounded-2xl hover:border-cyan hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:-translate-y-0.5 transition-all group max-md:flex-col">
                <div className="w-12 h-12 min-w-12 flex items-center justify-center bg-[rgba(6,182,212,0.15)] text-cyan-l rounded-xl">
                  <Brain size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Intelligence Artificielle</h3>
                  <p className="text-sm text-text-muted">Modélisation avancée en Data Science & IA — Machine Learning, Deep Learning, NLP — pour extraire de la valeur des données.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {[
                { icon: Lightbulb, label: 'Curieux' },
                { icon: Target, label: 'Autonome' },
                { icon: Puzzle, label: 'Problem Solver' },
                { icon: Users, label: "Esprit d'équipe" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[rgba(255,255,255,0.04)] border border-border rounded-full text-sm text-text hover:border-cyan hover:text-cyan-l transition-all">
                  <Icon size={14} /> {label}
                </span>
              ))}
            </div>
          </div>

          {/* Info card */}
          <div className="bg-surface border border-border rounded-3xl overflow-hidden relative animate-reveal">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient" />
            <div className="p-8">
              {[
                { icon: MapPin, label: 'Localisation', value: profile?.location || 'Casablanca, Maroc' },
                { icon: GraduationCap, label: 'Formation', value: "Master d'Excellence en IA" },
                { icon: Briefcase, label: 'Disponibilité', value: 'Stage / Alternance' },
                { icon: Languages, label: 'Langues', value: 'Arabe · Français · Anglais' },
              ].map(({ icon: Icon, label, value }, i, arr) => (
                <div key={label} className={`flex items-center gap-4 py-4 ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
                  <Icon size={20} className="text-purple-l min-w-5" />
                  <div>
                    <span className="block text-xs text-text-dim uppercase tracking-wide font-medium">{label}</span>
                    <span className="block text-sm font-semibold text-white">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
