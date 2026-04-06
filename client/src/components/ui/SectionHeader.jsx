export default function SectionHeader({ icon: Icon, tag, title }) {
  return (
    <div className="text-center mb-16">
      <span className="inline-flex items-center gap-2 font-mono text-sm font-medium text-purple-l bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] px-4 py-1.5 rounded-full mb-4">
        {Icon && <Icon size={14} />}
        {tag}
      </span>
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">{title}</h2>
      <div className="w-15 h-0.5 bg-gradient mx-auto rounded-full"></div>
    </div>
  );
}
