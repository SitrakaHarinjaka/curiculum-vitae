import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../lib/auth';
import { useAuth } from '../context/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      setUser(user);
      navigate('/');
    } catch {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-900 font-bold text-2xl mx-auto mb-4">
            SH
          </div>
          <h1 className="text-2xl font-bold themed-heading">Dashboard Admin</h1>
          <p className="themed-label mt-1">Connectez-vous pour accéder au dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="themed-card rounded-xl p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm themed-label mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none transition-colors"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm themed-label mb-1">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 themed-input rounded-lg focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
