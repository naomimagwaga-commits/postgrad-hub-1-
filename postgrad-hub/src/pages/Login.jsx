import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Logo from '../components/Logo.jsx';
import { IconMail, IconLock } from '../components/Icons.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';

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
  usePageTitle('Sign in');
  const { login, sessionKicked, clearKicked } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const next = new URLSearchParams(location.search).get('next') || '/app/dashboard';

  const [form, setForm] = useState({ email: '', password: '', remember: true });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState(null);
  const [deviceLimitDevices, setDeviceLimitDevices] = useState(null);   // list of devices when limit hit
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem(LAST_EMAIL_KEY);
    if (last) setForm((f) => ({ ...f, email: last }));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError(null); setDeviceLimitDevices(null); setBusy(true);
    try {
      await login({ email: form.email, password: form.password });
      if (form.remember) localStorage.setItem(LAST_EMAIL_KEY, form.email);
      else localStorage.removeItem(LAST_EMAIL_KEY);
      navigate(next);
    } catch (err) {
      if (err && err.code === 'DEVICE_LIMIT') {
        // Store the list so we can show it in the error banner.
        setDeviceLimitDevices(err.existingDevices || []);
        setError(err.message);
      } else {
        setError(err.message);
      }
    } finally { setBusy(false); }
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
          <p className="text-[11px] text-slate-500 -mt-1 pl-6 leading-relaxed">
            🔒 Your account supports <strong>up to 2 devices</strong> (e.g. one phone + one laptop). Manage them in Profile → My Devices.
          </p>

          {sessionKicked && (
            <div className="text-sm bg-amber-50 text-amber-800 border border-amber-200 p-3 rounded-xl">
              <p className="font-bold">⚠️ You were signed out</p>
              <p className="mt-1 text-xs">
                This device was removed from your account (either by you from Profile → My Devices, or automatically). Sign in again to re-register this device — as long as your account still has an open slot (max 2 devices).
              </p>
              <button type="button" onClick={clearKicked}
                className="text-xs text-amber-700 underline mt-2">Dismiss</button>
            </div>
          )}

          {deviceLimitDevices ? (
            <div className="text-sm bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl">
              <p className="font-bold">🚫 Device limit reached</p>
              <p className="mt-1 text-xs leading-relaxed">
                Your account is already registered on <strong>2 devices</strong>. That's the maximum allowed
                (one phone + one laptop, or two of either).
              </p>
              {deviceLimitDevices.length > 0 && (
                <ul className="mt-2 text-xs space-y-1">
                  {deviceLimitDevices.map((d) => (
                    <li key={d.id} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"/>
                      <span className="font-mono">{d.name || 'Unnamed device'}</span>
                      <span className="text-red-500 text-[10px]">
                        (added {new Date(d.added_at).toLocaleDateString('en-GB')})
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-3 pt-3 border-t border-red-200 text-xs space-y-1.5">
                <p className="font-semibold">To sign in here, do ONE of these:</p>
                <p>• On one of your existing devices → open <strong>Profile → My Devices → Remove</strong></p>
                <p>• Lost access to both devices? WhatsApp us on{' '}
                  <a href={`https://wa.me/254779568272?text=${encodeURIComponent('Hi, I need help removing devices from my Postgraduate Data Hub account. Email: ' + form.email)}`}
                     target="_blank" rel="noopener" className="font-bold underline">+254 779 568 272</a>
                </p>
              </div>
            </div>
          ) : error ? (
            <p className="text-sm bg-red-50 text-red-700 p-3 rounded-xl">{error}</p>
          ) : null}

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
