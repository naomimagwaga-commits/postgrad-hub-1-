import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Logo from '../components/Logo.jsx';
import { IconMail, IconLock } from '../components/Icons.jsx';

const LAST_EMAIL_KEY = 'pgh_last_email';

// Small eye / eye-off SVG
function EyeIcon({ open }) {
  return open ? (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 19c-7 0-10-7-10-7a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 10 7 10 7a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const next = new URLSearchParams(location.search).get('next') || '/app/dashboard';

  const [form, setForm] = useState({ email: '', password: '', remember: true });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem(LAST_EMAIL_KEY);
    if (last) setForm((f) => ({ ...f, email: last }));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError(null); setBusy(true);
    try {
      await login({ email: form.email, password: form.password });
      if (form.remember) localStorage.setItem(LAST_EMAIL_KEY, form.email);
      else localStorage.removeItem(LAST_EMAIL_KEY);
      navigate(next);
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-light opacity-60"/>
      <div className="absolute top-20 right-20 w-72 h-72 bg-gold/15 rounded-full blur-3xl"/>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-brand/10 rounded-full blur-3xl"/>

      <div className="relative w-full max-w-md card-elevated p-8 lg:p-10">
        <div className="flex justify-center mb-6"><Logo size="lg"/></div>
        <span className="eyebrow block text-center">— Sign in</span>
        <h1 className="display text-3xl text-brand text-center mt-3">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500 text-center">Continue where you left off.</p>

        {/* The hidden username helps password managers correctly remember pairs */}
        <form onSubmit={submit} className="mt-8 space-y-4" autoComplete="on">
          <div>
            <label className="label" htmlFor="login-email">Email</label>
            <div className="relative">
              <IconMail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
              <input id="login-email" name="email" type="email" required value={form.email}
                autoComplete="username"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@gmail.com" className="input pl-11"/>
            </div>
          </div>
          <div>
            <label className="label flex justify-between" htmlFor="login-password">
              <span>Password</span>
              <Link to="/reset" className="text-xs font-bold text-gold-600 hover:text-gold-700 normal-case tracking-normal">Forgot?</Link>
            </label>
            <div className="relative">
              <IconLock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
              <input id="login-password" name="password" type={showPwd ? 'text' : 'password'} required value={form.password}
                autoComplete="current-password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••" className="input pl-11 pr-12"/>
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-brand transition rounded-lg hover:bg-slate-100">
                <EyeIcon open={showPwd}/>
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
            <input type="checkbox" checked={form.remember}
              onChange={(e) => setForm({ ...form, remember: e.target.checked })}
              className="w-4 h-4 rounded text-brand focus:ring-brand-200"/>
            Remember me on this device
          </label>

          {error && <p className="text-sm bg-red-50 text-red-700 p-3 rounded-xl">{error}</p>}

          <button disabled={busy} className="btn-primary w-full py-3.5">
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-600">
          New here?{' '}
          <Link to="/register" className="text-brand font-bold hover:text-gold-600">Create an account</Link>
        </p>
        <p className="mt-3 text-center text-xs text-slate-400">
          <Link to="/" className="hover:text-brand">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
