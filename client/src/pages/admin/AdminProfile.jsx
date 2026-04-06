import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { Save, Check } from 'lucide-react';

export default function AdminProfile() {
  const [form, setForm] = useState({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/api/profile').then(r => { setForm(r.data); setLoading(false); });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put('/api/profile', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-purple border-t-transparent rounded-full animate-spin" /></div>;

  const fields = [
    { name: 'name', label: 'Nom complet', type: 'text' },
    { name: 'title', label: 'Titre principal', type: 'text' },
    { name: 'description', label: 'Description (Hero)', type: 'textarea' },
    { name: 'about', label: 'À propos (texte long)', type: 'textarea' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Téléphone', type: 'text' },
    { name: 'linkedin', label: 'LinkedIn URL', type: 'text' },
    { name: 'github', label: 'GitHub URL', type: 'text' },
    { name: 'location', label: 'Localisation', type: 'text' },
    { name: 'avatarUrl', label: "URL de l'avatar", type: 'text' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Gestion du Profil</h1>
        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.25)] text-green rounded-full text-sm font-medium">
            <Check size={14} /> Sauvegardé
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map(({ name, label, type }) => (
            <div key={name} className={type === 'textarea' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-semibold text-text mb-1.5">{label}</label>
              {type === 'textarea' ? (
                <textarea value={form[name] || ''} onChange={e => setForm({ ...form, [name]: e.target.value })} rows={3}
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple transition-all" />
              ) : (
                <input type={type} value={form[name] || ''} onChange={e => setForm({ ...form, [name]: e.target.value })}
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple transition-all" />
              )}
            </div>
          ))}
        </div>

        <button type="submit" className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-gradient text-white font-semibold rounded-full glow-purple hover:-translate-y-0.5 transition-all">
          <Save size={18} /> Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}
