import { useState, FormEvent } from 'react';
import { useCrud } from '../hooks/useCrud';
import { Skill } from '../lib/types';
import { DataTable } from '../components/ui/DataTable';
import { Modal } from '../components/ui/Modal';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export function Skills() {
  const { items, loading, create, update, remove } = useCrud<Skill>('skills');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState({ name: '', percentage: 80, category: 'frontend', sortOrder: 0 });

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', percentage: 80, category: 'frontend', sortOrder: items.length });
    setModalOpen(true);
  };

  const openEdit = (skill: Skill) => {
    setEditing(skill);
    setForm({ name: skill.name, percentage: skill.percentage, category: skill.category, sortOrder: skill.sortOrder });
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
    { key: 'name', header: 'Nom' },
    {
      key: 'percentage',
      header: 'Niveau',
      render: (s: Skill) => (
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 rounded-full themed-progress-bg">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${s.percentage}%` }} />
          </div>
          <span className="text-xs">{s.percentage}%</span>
        </div>
      ),
    },
    { key: 'category', header: 'Catégorie' },
    {
      key: 'actions',
      header: 'Actions',
      render: (s: Skill) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(s)} className="p-1.5 themed-icon-btn hover:text-emerald-400">
            <Pencil size={14} />
          </button>
          <button onClick={() => { if (confirm('Supprimer ?')) remove(s.id); }} className="p-1.5 themed-icon-btn hover:text-red-400">
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold themed-heading">Compétences</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm font-medium">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="themed-card rounded-xl">
        <DataTable columns={columns} data={items} loading={loading} keyExtractor={s => s.id} />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier' : 'Nouvelle compétence'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm themed-label mb-1">Nom</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm themed-label mb-1">Pourcentage ({form.percentage}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={form.percentage}
              onChange={e => setForm({ ...form, percentage: Number(e.target.value) })}
              className="w-full accent-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm themed-label mb-1">Catégorie</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none"
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="tools">Tools</option>
              <option value="design">Design</option>
              <option value="cms">CMS</option>
            </select>
          </div>
          <button type="submit" className="w-full py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium">
            {editing ? 'Modifier' : 'Créer'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
