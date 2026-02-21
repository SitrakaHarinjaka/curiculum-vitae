import { useState, FormEvent } from 'react';
import { useCrud } from '../hooks/useCrud';
import { Service } from '../lib/types';
import { DataTable } from '../components/ui/DataTable';
import { Modal } from '../components/ui/Modal';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export function Services() {
  const { items, loading, create, update, remove } = useCrud<Service>('services');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({ title: '', icon: 'code', description: '', sortOrder: 0 });

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', icon: 'code', description: '', sortOrder: items.length });
    setModalOpen(true);
  };

  const openEdit = (svc: Service) => {
    setEditing(svc);
    setForm({ title: svc.title, icon: svc.icon, description: svc.description, sortOrder: svc.sortOrder });
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
    { key: 'icon', header: 'Icône' },
    { key: 'title', header: 'Titre' },
    { key: 'description', header: 'Description', render: (s: Service) => (
      <span className="max-w-[300px] block truncate">{s.description}</span>
    )},
    {
      key: 'actions',
      header: 'Actions',
      render: (s: Service) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(s)} className="p-1.5 themed-icon-btn hover:text-emerald-400"><Pencil size={14} /></button>
          <button onClick={() => { if (confirm('Supprimer ?')) remove(s.id); }} className="p-1.5 themed-icon-btn hover:text-red-400"><Trash2 size={14} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold themed-heading">Services</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm font-medium">
          <Plus size={16} /> Ajouter
        </button>
      </div>
      <div className="themed-card rounded-xl">
        <DataTable columns={columns} data={items} loading={loading} keyExtractor={s => s.id} />
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier' : 'Nouveau service'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm themed-label mb-1">Titre</label>
            <input type="text" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm themed-label mb-1">Icône</label>
            <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}
              className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none">
              <option value="code">Code</option>
              <option value="wordpress">WordPress</option>
              <option value="palette">Palette/Design</option>
            </select>
          </div>
          <div>
            <label className="block text-sm themed-label mb-1">Description</label>
            <textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4}
              className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none resize-none" />
          </div>
          <button type="submit" className="w-full py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium">
            {editing ? 'Modifier' : 'Créer'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
