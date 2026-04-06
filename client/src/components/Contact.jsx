import { useState } from 'react';
import { Phone, Mail as MailIcon, MapPin, User, AtSign, MessageSquare, PenLine, Send, Mail } from 'lucide-react';
import { LinkedinIcon } from './ui/BrandIcons';
import SectionHeader from './ui/SectionHeader';

export default function Contact({ profile }) {
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get('name'), email = fd.get('email'), subject = fd.get('subject'), message = fd.get('message');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: 'error', msg: 'Veuillez entrer une adresse email valide.' });
      return;
    }

    const mailto = `mailto:${profile?.email || 'elbaderyayman47@gmail.com'}?subject=${encodeURIComponent(`${subject} — de ${name}`)}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailto, '_blank');
    setStatus({ type: 'success', msg: "Merci ! Votre client email va s'ouvrir pour envoyer le message." });
    e.target.reset();
    setTimeout(() => setStatus({ type: '', msg: '' }), 5000);
  };

  const channels = [
    { icon: Phone, label: 'Téléphone', value: profile?.phone || '+212 684 795 036', href: `tel:${profile?.phone || '+212684795036'}` },
    { icon: MailIcon, label: 'Email', value: profile?.email || 'elbaderyayman47@gmail.com', href: `mailto:${profile?.email || 'elbaderyayman47@gmail.com'}` },
    { icon: LinkedinIcon, label: 'LinkedIn', value: 'Aymane El Badry', href: profile?.linkedin || '#' },
    { icon: MapPin, label: 'Localisation', value: profile?.location || 'Casablanca, Maroc', href: '#' },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-bg-alt">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader icon={Mail} tag="Contact" title="Travaillons ensemble" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10">
          {/* Channels */}
          <div className="animate-reveal">
            <p className="text-text-muted mb-8 leading-relaxed">
              Vous avez un projet en tête ou souhaitez collaborer ? N'hésitez pas à me contacter via le formulaire ou directement par les canaux ci-dessous.
            </p>
            <div className="flex flex-col gap-3">
              {channels.map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="flex items-center gap-4 px-5 py-4 bg-surface border border-border rounded-2xl hover:border-purple hover:translate-x-1 hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] transition-all group max-[480px]:flex-col max-[480px]:text-center">
                  <div className="w-[42px] h-[42px] min-w-[42px] flex items-center justify-center icon-ai rounded-xl">
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className="block text-xs text-text-dim uppercase tracking-wide font-medium">{label}</span>
                    <span className="block text-sm font-semibold text-white">{value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-3xl p-8 animate-reveal">
            {[
              { name: 'name', label: 'Nom complet', type: 'text', icon: User, placeholder: 'Votre nom' },
              { name: 'email', label: 'Adresse email', type: 'email', icon: AtSign, placeholder: 'votre@email.com' },
              { name: 'subject', label: 'Sujet', type: 'text', icon: MessageSquare, placeholder: 'Sujet de votre message' },
            ].map(({ name, label, type, icon: Icon, placeholder }) => (
              <div key={name} className="mb-5">
                <label className="block text-sm font-semibold text-text mb-2">{label}</label>
                <div className="relative">
                  <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
                  <input name={name} type={type} placeholder={placeholder} required
                    className="w-full pl-11 pr-4 py-3 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple focus:shadow-[0_0_0_3px_rgba(124,58,237,0.35)] transition-all placeholder:text-text-dim" />
                </div>
              </div>
            ))}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-text mb-2">Message</label>
              <div className="relative">
                <PenLine size={18} className="absolute left-4 top-4 text-text-dim pointer-events-none" />
                <textarea name="message" placeholder="Votre message..." rows={5} required
                  className="w-full pl-11 pr-4 py-3 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple focus:shadow-[0_0_0_3px_rgba(124,58,237,0.35)] transition-all placeholder:text-text-dim resize-y min-h-[120px]" />
              </div>
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-7 py-3 bg-gradient text-white font-semibold rounded-full glow-purple hover:-translate-y-0.5 transition-all">
              <Send size={18} /> Envoyer le message
            </button>
            {status.msg && (
              <div className={`mt-4 text-center text-sm font-medium px-4 py-3 rounded-xl border ${status.type === 'success' ? 'text-green bg-[rgba(16,185,129,0.1)] border-[rgba(16,185,129,0.25)]' : 'text-rose bg-[rgba(244,63,94,0.1)] border-[rgba(244,63,94,0.25)]'}`}>
                {status.msg}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
