import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Logo from './Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { COURSES } from '../data/courses.js';
import {
  IconDashboard, IconForm, IconChart, IconBook, IconCalendar,
  IconUser, IconLogout, IconMenu, IconClose, IconShield, IconSpark, IconCheck, IconStar,
} from './Icons.jsx';

/**
 * Sidebar navigation.
 * Each item can be a simple link OR an "expandable" one with children
 * (used by SPSS Academy to reveal the 14 courses in-line).
 */
const nav = [
  { to: '/app/dashboard',      label: 'Dashboard',                icon: IconDashboard },
  { to: '/app/questionnaire',  label: 'Data Collection Tools',    icon: IconForm },
  { to: '/app/tests',          label: 'Statistical Test Selector', icon: IconChart },
  {
    to: '/app/spss',
    label: 'SPSS Academy',
    icon: IconBook,
    expandable: true,   // reveals the 14 courses as sub-items
  },
  { to: '/app/analysis',       label: 'Analysis & Interpretation', icon: IconSpark },
  { to: '/app/checklist',      label: 'Analysis Checklist',        icon: IconCheck },
  { to: '/app/publishing',     label: 'Publishing Guide',          icon: IconStar },
  { to: '/app/consultations',  label: 'Consultation Booking',      icon: IconCalendar },
  { to: '/app/profile',        label: 'Profile Settings',          icon: IconUser },
];
const adminNav = { to: '/app/admin', label: 'Admin Dashboard', icon: IconShield };

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);           // mobile sidebar
  const [spssExpanded, setSpssExpanded] = useState(  // SPSS Academy dropdown
    location.pathname.startsWith('/app/spss')
  );

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const items = user?.role === 'admin' ? [...nav, adminNav] : nav;

  const NavItems = ({ onClick }) => (
    <nav className="space-y-1 px-3">
      {items.map((item) => {
        const { to, label, icon: Icon, expandable } = item;
        if (expandable) {
          return (
            <ExpandableItem
              key={to}
              to={to} label={label} Icon={Icon}
              expanded={spssExpanded}
              onToggle={() => setSpssExpanded((v) => !v)}
              onClick={onClick}
            />
          );
        }
        return (
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
        );
      })}
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
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-brand-100/80 hover:text-white hover:bg-white/5 rounded-xl transition">
                <IconLogout className="w-4 h-4" /> Sign out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden h-16 flex items-center justify-between px-4 bg-ink text-white sticky top-0 z-40 shadow-elevated">
          <button onClick={() => setOpen(true)}><IconMenu /></button>
          <Logo variant="light" size="sm" />
          <div className="w-6"/>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/**
 * A sidebar item that both routes on click AND reveals a list of sub-items below.
 * Sub-items = the 14 SPSS Academy courses.
 * Clicking the arrow toggles the dropdown; clicking the label navigates to the parent page.
 */
function ExpandableItem({ to, label, Icon, expanded, onToggle, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(to + '/');

  return (
    <div>
      <div className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
        isActive
          ? 'bg-gradient-to-r from-gold/20 to-transparent text-white'
          : 'text-brand-100/80 hover:bg-white/5 hover:text-white'
      }`}>
        {isActive && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-gold"/>}
        <Icon className="w-5 h-5 shrink-0"/>
        <Link
          to={to}
          onClick={onClick}
          className="flex-1"
        >
          {label}
        </Link>
        {/* Chevron button — toggles the dropdown independently of navigation */}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
          className={`p-1 rounded transition-transform text-brand-100/60 hover:text-white ${expanded ? 'rotate-180' : ''}`}
          aria-label={expanded ? 'Collapse courses' : 'Expand courses'}
          aria-expanded={expanded}
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>

      {/* Courses list */}
      {expanded && (
        <ul className="mt-1 mb-2 ml-6 border-l border-white/10 space-y-0.5 pl-3">
          {COURSES.map((c) => (
            <li key={c.slug}>
              <Link
                to={`${to}?course=${c.slug}`}
                onClick={onClick}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs text-brand-100/70 hover:bg-white/5 hover:text-white transition"
              >
                <span className="truncate">{c.name}</span>
                <span className="text-[10px] text-brand-100/40 shrink-0">{c.lessons.length}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
