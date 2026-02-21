import { useState, FormEvent } from 'react';
import { useCrud } from '../hooks/useCrud';
import { SocialLink } from '../lib/types';
import { DataTable } from '../components/ui/DataTable';
import { Modal } from '../components/ui/Modal';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export function SocialLinks() {
  const { items, loading, create, update, remove } = useCrud<SocialLink>('social-links');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SocialLink | null>(null);
  const [form, setForm] = useState({ platform: '', url: '', icon: '', sortOrder: 0 });

  const openCreate = () => {
    setEditing(null);
    setForm({ platform: '', url: '', icon: '', sortOrder: items.length });
    setModalOpen(true);
  };

  const openEdit = (link: SocialLink) => {
    setEditing(link);
    setForm({ platform: link.platform, url: link.url, icon: link.icon, sortOrder: link.sortOrder });
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (editing) {
      await update(editing.id, form);
    } else {
      await create(form);
    }
    setModalOpen(false);
  };

  const columns = [
    { key: 'platform', header: 'Plateforme' },
    { key: 'url', header: 'URL', render: (l: SocialLink) => (
      <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline truncate max-w-[200px] block">{l.url}</a>
    )},
    { key: 'icon', header: 'Icône' },
    {
      key: 'actions',
      header: 'Actions',
      render: (l: SocialLink) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(l)} className="p-1.5 themed-icon-btn hover:text-emerald-400"><Pencil size={14} /></button>
          <button onClick={() => { if (confirm('Supprimer ?')) remove(l.id); }} className="p-1.5 themed-icon-btn hover:text-red-400"><Trash2 size={14} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold themed-heading">Liens sociaux</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm font-medium">
          <Plus size={16} /> Ajouter
        </button>
      </div>
      <div className="themed-card rounded-xl">
        <DataTable columns={columns} data={items} loading={loading} keyExtractor={l => l.id} />
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier' : 'Nouveau lien'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm themed-label mb-1">Plateforme</label>
            <select value={form.platform} onChange={e => { setForm({ ...form, platform: e.target.value, icon: e.target.value }); }}
              className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none">
              <option value="">Choisir...</option>
              <option value="linkedin">LinkedIn</option>
              <option value="facebook">Facebook</option>
              <option value="github">GitHub</option>
              <option value="twitter">Twitter/X</option>
              <option value="upwork">Upwork</option>
              <option value="behance">Behance</option>
              <option value="dribbble">Dribbble</option>
            </select>
          </div>
          <div>
            <label className="block text-sm themed-label mb-1">URL</label>
            <input type="url" required value={form.url} onChange={e => setForm({ ...form, url: e.target.value })}
              className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none"
              placeholder="https://..." />
          </div>
          <button type="submit" className="w-full py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium">
            {editing ? 'Modifier' : 'Créer'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
