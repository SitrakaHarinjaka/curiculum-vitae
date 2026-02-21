import { useState, FormEvent } from 'react';
import api from '../lib/api';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

export function Settings() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setStatus('error');
      setErrorMsg('Les mots de passe ne correspondent pas');
      return;
    }

    setSaving(true);
    try {
      await api.put('/auth/password', {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setStatus('success');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setErrorMsg('Mot de passe actuel incorrect');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold themed-heading">Paramètres</h1>

      <div className="themed-card rounded-xl p-6 max-w-md">
        <h2 className="text-lg font-semibold themed-heading mb-4">Changer le mot de passe</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm themed-label mb-1">Mot de passe actuel</label>
            <input type="password" required value={form.currentPassword}
              onChange={e => setForm({ ...form, currentPassword: e.target.value })}
              className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm themed-label mb-1">Nouveau mot de passe</label>
            <input type="password" required minLength={6} value={form.newPassword}
              onChange={e => setForm({ ...form, newPassword: e.target.value })}
              className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm themed-label mb-1">Confirmer</label>
            <input type="password" required minLength={6} value={form.confirmPassword}
              onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
              className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none" />
          </div>

          {status === 'success' && (
            <div className="flex items-center gap-2 text-emerald-400 text-sm"><CheckCircle size={16} /> Mot de passe modifié</div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-400 text-sm"><AlertCircle size={16} /> {errorMsg}</div>
          )}

          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 font-medium">
            <Save size={16} /> {saving ? 'Enregistrement...' : 'Modifier'}
          </button>
        </form>
      </div>
    </div>
  );
}
