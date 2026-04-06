import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const emptyProject = { title: '', description: '', category: 'ai', tags: '', icon: '', githubUrl: '', imageUrl: '', order: 0 };

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyProject);
  const [editId, setEditId] = useState(null);

  const load = () => API.get('/api/projects').then(r => setProjects(r.data));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyProject); setEditId(null); setModal(true); };
  const openEdit = (p) => { setForm({ ...p, tags: p.tags?.join(', ') || '' }); setEditId(p._id); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), order: Number(form.order) };
    if (editId) await API.put(`/api/projects/${editId}`, payload);
    else await API.post('/api/projects', payload);
    setModal(false);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce projet ?')) return;
    await API.delete(`/api/projects/${id}`);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Gestion des Projets</h1>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient text-white text-sm font-semibold rounded-full hover:-translate-y-0.5 transition-all">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead><tr><th>Titre</th><th>Catégorie</th><th>Tags</th><th>Ordre</th><th className="text-right">Actions</th></tr></thead>
            <tbody>
              {projects.map(p => (
                <tr key={p._id}>
                  <td className="font-medium text-white">{p.title}</td>
                  <td><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.category === 'ai' ? 'tag-ai' : 'tag-front'}`}>{p.category === 'ai' ? 'IA' : 'Web'}</span></td>
                  <td><div className="flex flex-wrap gap-1">{p.tags?.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-[rgba(255,255,255,0.05)] rounded-full text-text-muted">{t}</span>)}</div></td>
                  <td>{p.order}</td>
                  <td className="text-right">
                    <button onClick={() => openEdit(p)} className="p-1.5 text-text-muted hover:text-purple-l transition-colors"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(p._id)} className="p-1.5 text-text-muted hover:text-rose transition-colors ml-1"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setModal(false)}>
          <div className="bg-surface border border-border rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">{editId ? 'Modifier' : 'Nouveau'} projet</h2>
              <button onClick={() => setModal(false)} className="text-text-muted hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { name: 'title', label: 'Titre', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'icon', label: 'Icône Lucide (ex: bot, film)', type: 'text' },
                { name: 'tags', label: 'Tags (séparés par virgule)', type: 'text' },
                { name: 'githubUrl', label: 'Lien GitHub', type: 'text' },
                { name: 'imageUrl', label: "URL de l'image", type: 'text' },
                { name: 'order', label: 'Ordre', type: 'number' },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label className="block text-sm font-semibold text-text mb-1">{label}</label>
                  {type === 'textarea' ? (
                    <textarea value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} rows={3}
                      className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple transition-all" />
                  ) : (
                    <input type={type} value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })}
                      className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple transition-all" />
                  )}
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-text mb-1">Catégorie</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple transition-all">
                  <option value="ai">Intelligence Artificielle</option>
                  <option value="web">Développement Web</option>
                </select>
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
