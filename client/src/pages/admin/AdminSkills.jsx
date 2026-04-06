import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const categories = [
  { value: 'ai', label: 'IA & Data' },
  { value: 'front', label: 'Front-end' },
  { value: 'back', label: 'Back-end' },
  { value: 'db', label: 'Bases de données' },
  { value: 'tool', label: 'Outils' },
  { value: 'lang', label: 'Langues' },
];

const emptySkill = { name: '', category: 'ai', level: 80, icon: '' };

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptySkill);
  const [editId, setEditId] = useState(null);

  const load = () => API.get('/api/skills').then(r => setSkills(r.data));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptySkill); setEditId(null); setModal(true); };
  const openEdit = (s) => { setForm({ ...s }); setEditId(s._id); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, level: Number(form.level) };
    if (editId) await API.put(`/api/skills/${editId}`, payload);
    else await API.post('/api/skills', payload);
    setModal(false);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette compétence ?')) return;
    await API.delete(`/api/skills/${id}`);
    load();
  };

  const catLabel = (val) => categories.find(c => c.value === val)?.label || val;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Gestion des Compétences</h1>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient text-white text-sm font-semibold rounded-full hover:-translate-y-0.5 transition-all">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead><tr><th>Nom</th><th>Catégorie</th><th>Niveau</th><th>Info</th><th className="text-right">Actions</th></tr></thead>
            <tbody>
              {skills.map(s => (
                <tr key={s._id}>
                  <td className="font-medium text-white">{s.name}</td>
                  <td><span className={`px-2 py-0.5 rounded-full text-xs font-medium tag-${s.category}`}>{catLabel(s.category)}</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-bg rounded-full overflow-hidden">
                        <div className="h-full bg-gradient rounded-full" style={{ width: `${s.level}%` }} />
                      </div>
                      <span className="text-xs text-text-muted">{s.level}%</span>
                    </div>
                  </td>
                  <td className="text-text-muted text-xs">{s.icon || '—'}</td>
                  <td className="text-right">
                    <button onClick={() => openEdit(s)} className="p-1.5 text-text-muted hover:text-purple-l transition-colors"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(s._id)} className="p-1.5 text-text-muted hover:text-rose transition-colors ml-1"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setModal(false)}>
          <div className="bg-surface border border-border rounded-3xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">{editId ? 'Modifier' : 'Nouvelle'} compétence</h2>
              <button onClick={() => setModal(false)} className="text-text-muted hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-text mb-1">Nom</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text mb-1">Catégorie</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple transition-all">
                  {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text mb-1">Niveau ({form.level}%)</label>
                <input type="range" min="0" max="100" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}
                  className="w-full accent-purple" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text mb-1">Info supplémentaire (ex: B2, Maternelle)</label>
                <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple transition-all" />
              </div>
              <button type="submit" className="mt-2 w-full px-6 py-3 bg-gradient text-white font-semibold rounded-full hover:-translate-y-0.5 transition-all">
                {editId ? 'Mettre à jour' : 'Créer'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
