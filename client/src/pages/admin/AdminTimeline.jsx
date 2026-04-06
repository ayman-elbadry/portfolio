import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const emptyItem = { type: 'experience', title: '', company: '', location: 'Casablanca', dates: '', description: '', tags: '', icon: 'building-2', isCurrent: false, order: 0 };

export default function AdminTimeline() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyItem);
  const [editId, setEditId] = useState(null);
  const [tab, setTab] = useState('experience');

  const load = () => API.get('/api/timeline').then(r => setItems(r.data));
  useEffect(() => { load(); }, []);

  const filtered = items.filter(i => i.type === tab);

  const openCreate = () => { setForm({ ...emptyItem, type: tab }); setEditId(null); setModal(true); };
  const openEdit = (item) => { setForm({ ...item, tags: item.tags?.join(', ') || '' }); setEditId(item._id); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), order: Number(form.order) };
    if (editId) await API.put(`/api/timeline/${editId}`, payload);
    else await API.post('/api/timeline', payload);
    setModal(false);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cet élément ?')) return;
    await API.delete(`/api/timeline/${id}`);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Gestion du Parcours</h1>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient text-white text-sm font-semibold rounded-full hover:-translate-y-0.5 transition-all">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[{ key: 'experience', label: 'Expériences' }, { key: 'education', label: 'Formations' }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${tab === t.key ? 'bg-gradient text-white border-transparent' : 'border-border text-text-muted hover:text-white'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead><tr><th>Titre</th><th>Lieu</th><th>Dates</th><th>Statut</th><th className="text-right">Actions</th></tr></thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item._id}>
                  <td className="font-medium text-white">{item.title}</td>
                  <td className="text-text-muted">{item.company}</td>
                  <td className="text-text-muted">{item.dates}</td>
                  <td>{item.isCurrent && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[rgba(16,185,129,0.1)] text-green border border-[rgba(16,185,129,0.3)]">En cours</span>}</td>
                  <td className="text-right">
                    <button onClick={() => openEdit(item)} className="p-1.5 text-text-muted hover:text-purple-l transition-colors"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(item._id)} className="p-1.5 text-text-muted hover:text-rose transition-colors ml-1"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setModal(false)}>
          <div className="bg-surface border border-border rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">{editId ? 'Modifier' : 'Nouvel'} élément</h2>
              <button onClick={() => setModal(false)} className="text-text-muted hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-text mb-1">Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple transition-all">
                  <option value="experience">Expérience</option>
                  <option value="education">Formation</option>
                </select>
              </div>
              {[
                { name: 'title', label: 'Titre du poste / diplôme' },
                { name: 'company', label: 'Entreprise / École' },
                { name: 'location', label: 'Localisation' },
                { name: 'dates', label: 'Dates (ex: 2022 — 2024)' },
                { name: 'icon', label: 'Icône Lucide (ex: building-2, sparkles)' },
                { name: 'tags', label: 'Tags (séparés par virgule)' },
              ].map(({ name, label }) => (
                <div key={name}>
                  <label className="block text-sm font-semibold text-text mb-1">{label}</label>
                  <input value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} required={name === 'title' || name === 'company' || name === 'dates'}
                    className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-text mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple transition-all" />
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isCurrent} onChange={e => setForm({ ...form, isCurrent: e.target.checked })}
                    className="w-4 h-4 accent-purple rounded" />
                  <span className="text-sm text-text">En cours</span>
                </label>
                <div className="flex-1">
                  <input type="number" value={form.order} onChange={e => setForm({ ...form, order: e.target.value })} placeholder="Ordre"
                    className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple transition-all" />
                </div>
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
