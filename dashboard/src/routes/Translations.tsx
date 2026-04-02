import { useState, useEffect } from 'react';
import api from '../lib/api';
import { TranslatableData, TranslatableItem } from '../lib/types';
import { Save, Check } from 'lucide-react';

const ENTITY_LABELS: Record<string, string> = {
  biography: 'Biographie',
  skill: 'Compétences',
  education: 'Formation',
  experience: 'Expériences',
  service: 'Services',
};

const FIELD_LABELS: Record<string, string> = {
  title: 'Titre',
  subtitle: 'Sous-titre',
  aboutText: 'À propos',
  aboutLongText:'A propos de moi',  
  nationality: 'Nationalité',
  languages: 'Langues',
  freelance: 'Freelance',
  name: 'Nom',
  category: 'Catégorie',
  degree: 'Diplôme',
  field: 'Domaine',
  description: 'Description',
  role: 'Poste',
};

export function Translations() {
  const [data, setData] = useState<TranslatableData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('biography');
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/admin/translations/all')
      .then(res => setData(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (entity: string, entityId: number, field: string, value: string) => {
    setEdits(prev => ({ ...prev, [`${entity}:${entityId}:${field}`]: value }));
    setSaved(false);
  };

  const getValue = (entity: string, item: TranslatableItem, field: string) => {
    const key = `${entity}:${item.id}:${field}`;
    if (key in edits) return edits[key];
    return item.fields[field]?.en || '';
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);

    const translations: Array<{ entity: string; entityId: number; field: string; locale: string; value: string }> = [];

    const entities = Object.keys(ENTITY_LABELS) as Array<keyof TranslatableData>;
    for (const entity of entities) {
      const items = data[entity] || [];
      for (const item of items) {
        for (const field of Object.keys(item.fields)) {
          const value = getValue(entity, item, field);
          translations.push({ entity, entityId: item.id, field, locale: 'en', value });
        }
      }
    }

    try {
      await api.put('/admin/translations', { translations });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const currentItems = data ? data[activeTab as keyof TranslatableData] || [] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>Traductions (EN)</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          style={{ backgroundColor: 'var(--accent)', color: '#0f172a' }}
        >
          {saved ? <><Check size={16} /> Sauvegardé !</> : <><Save size={16} /> {saving ? 'Sauvegarde...' : 'Sauvegarder'}</>}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        {Object.entries(ENTITY_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            style={{
              backgroundColor: activeTab === key ? 'var(--accent)' : 'transparent',
              color: activeTab === key ? '#0f172a' : 'var(--text-secondary)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {currentItems.map(item => (
          <div
            key={item.id}
            className="rounded-xl p-6 space-y-4"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <h3 className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{item.label}</h3>
            <div className="space-y-3">
              {Object.entries(item.fields).map(([field, values]) => (
                <div key={field} className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                      {FIELD_LABELS[field] || field} (FR)
                    </label>
                    <div
                      className="w-full px-3 py-2 rounded-lg text-sm opacity-60"
                      style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    >
                      {values.fr || <span className="italic">Vide</span>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                      {FIELD_LABELS[field] || field} (EN)
                    </label>
                    {String(values.fr).length > 100 ? (
                      <textarea
                        rows={3}
                        value={getValue(activeTab, item, field)}
                        onChange={e => handleChange(activeTab, item.id, field, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-sm resize-none focus:outline-none"
                        style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                        placeholder={`English translation...`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={getValue(activeTab, item, field)}
                        onChange={e => handleChange(activeTab, item.id, field, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none"
                        style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                        placeholder={`English translation...`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {currentItems.length === 0 && (
          <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
            Aucun contenu à traduire pour cette catégorie.
          </div>
        )}
      </div>
    </div>
  );
}
