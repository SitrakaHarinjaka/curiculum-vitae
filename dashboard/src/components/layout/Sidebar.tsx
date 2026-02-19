import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Mail, User, Wrench,
  GraduationCap, Briefcase, Settings, Link2, X, Globe
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/visitors', icon: Users, label: 'Visiteurs' },
  { to: '/messages', icon: Mail, label: 'Messages' },
  { to: '/biography', icon: User, label: 'Biographie' },
  { to: '/skills', icon: Wrench, label: 'Compétences' },
  { to: '/education', icon: GraduationCap, label: 'Formation' },
  { to: '/experiences', icon: Briefcase, label: 'Expériences' },
  { to: '/services', icon: Globe, label: 'Services' },
  { to: '/social-links', icon: Link2, label: 'Liens sociaux' },
  { to: '/settings', icon: Settings, label: 'Paramètres' },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={clsx(
          'fixed top-0 left-0 h-full w-64 z-50 transition-transform duration-300',
          'lg:translate-x-0 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:shrink-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ backgroundColor: 'var(--bg-sidebar)', borderRight: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-between h-16 px-6" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: 'var(--accent)', color: '#0f172a' }}>
              SH
            </div>
            <span className="font-semibold" style={{ color: 'var(--text-sidebar)' }}>Dashboard</span>
          </div>
          <button onClick={onClose} className="lg:hidden hover:opacity-80" style={{ color: 'var(--text-sidebar-secondary)' }}>
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                  isActive ? '' : 'hover:opacity-90'
                )
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? 'var(--accent-bg)' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-sidebar-secondary)',
              })}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
