import { useState, FormEvent } from 'react';
import { useCrud } from '../hooks/useCrud';
import { Experience } from '../lib/types';
import { DataTable } from '../components/ui/DataTable';
import { Modal } from '../components/ui/Modal';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export function Experiences() {
  const { items, loading, create, update, remove } = useCrud<Experience>('experiences');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState({ company: '', role: '', startDate: '', endDate: '', description: '', technologies: '', sortOrder: 0 });

  const openCreate = () => {
    setEditing(null);
    setForm({ company: '', role: '', startDate: '', endDate: '', description: '', technologies: '', sortOrder: items.length });
    setModalOpen(true);
  };

  const openEdit = (exp: Experience) => {
    setEditing(exp);
    setForm({
      company: exp.company,
      role: exp.role,
      startDate: exp.startDate ? exp.startDate.split('T')[0] : '',
      endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
      description: exp.description || '',
      technologies: exp.technologies || '',
      sortOrder: exp.sortOrder,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { ...form, endDate: form.endDate || null };
    if (editing) {
      await update(editing.id, data);
    } else {
      await create(data);
    }
    setModalOpen(false);
  };

  const columns = [
    { key: 'company', header: 'Entreprise' },
    { key: 'role', header: 'Poste' },
    {
      key: 'dates',
      header: 'Période',
      render: (e: Experience) => `${format(new Date(e.startDate), 'MMM yyyy')} - ${e.endDate ? format(new Date(e.endDate), 'MMM yyyy') : "Aujourd'hui"}`,
    },
    { key: 'technologies', header: 'Technologies', render: (e: Experience) => e.technologies || '-' },
    {
      key: 'actions',
      header: 'Actions',
      render: (e: Experience) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(e)} className="p-1.5 themed-icon-btn hover:text-emerald-400"><Pencil size={14} /></button>
          <button onClick={() => { if (confirm('Supprimer ?')) remove(e.id); }} className="p-1.5 themed-icon-btn hover:text-red-400"><Trash2 size={14} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold themed-heading">Expériences</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm font-medium">
          <Plus size={16} /> Ajouter
        </button>
      </div>
      <div className="themed-card rounded-xl">
        <DataTable columns={columns} data={items} loading={loading} keyExtractor={e => e.id} />
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier' : 'Nouvelle expérience'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Entreprise" value={form.company} onChange={v => setForm({ ...form, company: v })} required />
          <InputField label="Poste" value={form.role} onChange={v => setForm({ ...form, role: v })} required />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Date début" type="date" value={form.startDate} onChange={v => setForm({ ...form, startDate: v })} required />
            <InputField label="Date fin" type="date" value={form.endDate} onChange={v => setForm({ ...form, endDate: v })} />
          </div>
          <InputField label="Technologies (séparées par virgule)" value={form.technologies} onChange={v => setForm({ ...form, technologies: v })} />
          <div>
            <label className="block text-sm themed-label mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none resize-none"
            />
          </div>
          <button type="submit" className="w-full py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium">
            {editing ? 'Modifier' : 'Créer'}
          </button>
        </form>
      </Modal>
    </div>
  );
}

function InputField({ label, value, onChange, type = 'text', required = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm themed-label mb-1">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} required={required}
        className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none" />
    </div>
  );
}
