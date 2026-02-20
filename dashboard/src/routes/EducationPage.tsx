import { useState, FormEvent } from 'react';
import { useCrud } from '../hooks/useCrud';
import { Education } from '../lib/types';
import { DataTable } from '../components/ui/DataTable';
import { Modal } from '../components/ui/Modal';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export function EducationPage() {
  const { items, loading, create, update, remove } = useCrud<Education>('education');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Education | null>(null);
  const [form, setForm] = useState({ school: '', degree: '', field: '', startDate: '', endDate: '', description: '', sortOrder: 0 });

  const openCreate = () => {
    setEditing(null);
    setForm({ school: '', degree: '', field: '', startDate: '', endDate: '', description: '', sortOrder: items.length });
    setModalOpen(true);
  };

  const openEdit = (edu: Education) => {
    setEditing(edu);
    setForm({
      school: edu.school,
      degree: edu.degree,
      field: edu.field || '',
      startDate: edu.startDate ? edu.startDate.split('T')[0] : '',
      endDate: edu.endDate ? edu.endDate.split('T')[0] : '',
      description: edu.description || '',
      sortOrder: edu.sortOrder,
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
    { key: 'school', header: 'École' },
    { key: 'degree', header: 'Diplôme' },
    { key: 'field', header: 'Domaine', render: (e: Education) => e.field || '-' },
    {
      key: 'dates',
      header: 'Dates',
      render: (e: Education) => `${format(new Date(e.startDate), 'MMM yyyy')} - ${e.endDate ? format(new Date(e.endDate), 'MMM yyyy') : "Aujourd'hui"}`,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (e: Education) => (
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
        <h1 className="text-2xl font-bold themed-heading">Formation</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm font-medium">
          <Plus size={16} /> Ajouter
        </button>
      </div>
      <div className="themed-card rounded-xl">
        <DataTable columns={columns} data={items} loading={loading} keyExtractor={e => e.id} />
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier' : 'Nouvelle formation'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="École" value={form.school} onChange={v => setForm({ ...form, school: v })} required />
          <InputField label="Diplôme" value={form.degree} onChange={v => setForm({ ...form, degree: v })} required />
          <InputField label="Domaine" value={form.field} onChange={v => setForm({ ...form, field: v })} />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Date début" type="date" value={form.startDate} onChange={v => setForm({ ...form, startDate: v })} required />
            <InputField label="Date fin" type="date" value={form.endDate} onChange={v => setForm({ ...form, endDate: v })} />
          </div>
          <div>
            <label className="block text-sm themed-label mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3}
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
