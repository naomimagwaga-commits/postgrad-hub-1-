import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from './Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { IconMenu, IconClose } from './Icons.jsx';

export default function PublicNav() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/#features', label: 'Services' },
    { to: '/#about', label: 'About' },
    { to: '/pricing', label: 'Pricing' },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-parchment/85 backdrop-blur-md border-b border-brand/5 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="shrink-0"><Logo /></Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {links.map((l) => (
            <a key={l.to} href={l.to}
              className="px-4 py-2 rounded-full text-slate-700 hover:text-brand hover:bg-brand/5 transition">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link to="/app/dashboard" className="btn-primary">Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">Sign in</Link>
              <Link to="/register" className="btn-gold">Get Started</Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-brand">
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-brand/10 bg-parchment/95 backdrop-blur">
          <div className="px-4 py-4 space-y-2">
            {links.map((l) => (
              <a key={l.to} href={l.to} onClick={() => setOpen(false)}
                 className="block py-2.5 px-3 rounded-lg text-slate-700 hover:bg-brand/5">{l.label}</a>
            ))}
            <div className="pt-3 grid grid-cols-2 gap-2 border-t border-brand/5">
              {user ? (
                <Link to="/app/dashboard" className="btn-primary col-span-2">Dashboard</Link>
              ) : (
                <>
                  <Link to="/login" className="btn-outline">Sign in</Link>
                  <Link to="/register" className="btn-gold">Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
