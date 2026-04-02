import { useState, useEffect, FormEvent } from 'react';
import api from '../lib/api';
import { Biography } from '../lib/types';
import { Save, CheckCircle } from 'lucide-react';

export function BiographyPage() {
  const [form, setForm] = useState<Partial<Biography>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/biography')
      .then(res => setForm(res.data.data || {}))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/admin/biography', form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold themed-heading">Biographie</h1>

      <form onSubmit={handleSubmit} className="themed-card rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Nom complet" value={form.fullName || ''} onChange={v => updateField('fullName', v)} required />
          <Field label="Titre" value={form.title || ''} onChange={v => updateField('title', v)} required />
          <Field label="Sous-titre" value={form.subtitle || ''} onChange={v => updateField('subtitle', v)} />
          <Field label="Email" value={form.email || ''} onChange={v => updateField('email', v)} type="email" />
          <Field label="Téléphone" value={form.phone || ''} onChange={v => updateField('phone', v)} />
          <Field label="Adresse" value={form.address || ''} onChange={v => updateField('address', v)} />
          <Field label="Nationalité" value={form.nationality || ''} onChange={v => updateField('nationality', v)} />
          <Field label="Langues" value={form.languages || ''} onChange={v => updateField('languages', v)} />
          <Field label="Freelance" value={form.freelance || ''} onChange={v => updateField('freelance', v)} />
          <Field label="URL CV" value={form.cvUrl || ''} onChange={v => updateField('cvUrl', v)} />
        </div>

        <div>
          <label className="block text-sm themed-label mb-1">À propos</label>
          <textarea
            value={form.aboutText || ''}
            onChange={e => updateField('aboutText', e.target.value)}
            rows={5}
            required
            className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm themed-label mb-1">À propos de moi ( longue desciption )</label>
          <textarea
            value={form.aboutLongText || ''}
            onChange={e => updateField('aboutLongText', e.target.value)}
            rows={5}
            required
            className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none resize-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 font-medium"
          >
            <Save size={16} /> {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
          {saved && (
            <span className="flex items-center gap-1 text-emerald-400 text-sm">
              <CheckCircle size={16} /> Enregistré !
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', required = false }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm themed-label mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none transition-colors"
      />
    </div>
  );
}
