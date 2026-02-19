import { useState, useEffect } from 'react';
import { Menu, Bell, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { logout } from '../../lib/auth';
import api from '../../lib/api';

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    api.get('/admin/contacts/unread-count')
      .then(res => setUnreadCount(res.data.data.count))
      .catch(() => {});
  }, []);

  return (
    <header className="h-16 border-b flex items-center justify-between px-4 lg:px-6"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
      <button onClick={onMenuClick} className="lg:hidden hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
        <Menu size={24} />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors hover:opacity-80"
          style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--accent)' }}
          title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button className="relative transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent-bg)' }}>
            <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>
              {user?.name?.charAt(0) || 'A'}
            </span>
          </div>
          <span className="hidden sm:block text-sm" style={{ color: 'var(--text-secondary)' }}>
            {user?.name || 'Admin'}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="transition-colors hover:text-red-400"
          style={{ color: 'var(--text-secondary)' }}
          title="Déconnexion"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
