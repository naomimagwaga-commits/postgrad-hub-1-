import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from './Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import {
  IconDashboard, IconForm, IconChart, IconBook, IconCalendar,
  IconUser, IconLogout, IconMenu, IconClose, IconShield, IconSpark,
} from './Icons.jsx';

const nav = [
  { to: '/app/dashboard', label: 'Dashboard', icon: IconDashboard },
  { to: '/app/questionnaire', label: 'Data Collection Tools', icon: IconForm },
  { to: '/app/tests', label: 'Statistical Test Selector', icon: IconChart },
  { to: '/app/spss', label: 'SPSS Academy', icon: IconBook },
  { to: '/app/analysis', label: 'Analysis & Interpretation', icon: IconSpark },
  { to: '/app/consultations', label: 'Consultation Booking', icon: IconCalendar },
  { to: '/app/profile', label: 'Profile Settings', icon: IconUser },
];
const adminNav = { to: '/app/admin', label: 'Admin Dashboard', icon: IconShield };

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const items = user?.role === 'admin' ? [...nav, adminNav] : nav;

  const NavItems = ({ onClick }) => (
    <nav className="space-y-1 px-3">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onClick}
          end
          className={({ isActive }) =>
            `relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
              isActive
                ? 'bg-gradient-to-r from-gold/20 to-transparent text-white'
                : 'text-brand-100/80 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-gold"/>}
              <Icon className="w-5 h-5 shrink-0"/>
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen flex bg-parchment">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-72 flex-col bg-ink text-white relative">
        <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none"/>
        <div className="relative h-20 flex items-center px-6 border-b border-white/10">
          <Link to="/"><Logo variant="light" /></Link>
        </div>
        <div className="relative py-6 flex-1 overflow-y-auto">
          <NavItems />
        </div>
        <div className="relative p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-white/5">
            <div className="w-10 h-10 rounded-full bg-gold text-brand font-bold flex items-center justify-center shadow-gold">
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user?.name}</p>
              <p className="text-xs text-brand-100/70 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-brand-100/80 hover:text-white hover:bg-white/5 rounded-xl transition">
            <IconLogout className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="relative w-72 bg-ink text-white flex flex-col">
            <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none"/>
            <div className="relative h-20 flex items-center justify-between px-6 border-b border-white/10">
              <Logo variant="light" />
              <button onClick={() => setOpen(false)}><IconClose /></button>
            </div>
            <div className="relative py-6 flex-1 overflow-y-auto">
              <NavItems onClick={() => setOpen(false)} />
            </div>
            <div className="relative p-4 border-t border-white/10">
              <button onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-brand-100/80 hover:bg-white/5 rounded-lg">
                <IconLogout className="w-4 h-4" /> Sign out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/60 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
          <button className="lg:hidden text-brand" onClick={() => setOpen(true)}>
            <IconMenu />
          </button>
          <div className="lg:hidden"><Logo size="sm" /></div>
          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden sm:inline text-sm text-slate-500">
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <Link to="/app/profile"
              className="w-10 h-10 rounded-full bg-brand text-gold font-bold flex items-center justify-center hover:shadow-elevated transition">
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </Link>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
