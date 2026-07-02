import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Logo from '../components/Logo.jsx';
import { IconUser, IconMail, IconPhone, IconLock, IconCheck } from '../components/Icons.jsx';

function EyeIcon({ open }) {
  return open ? (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 19c-7 0-10-7-10-7a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 10 7 10 7a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '',
  });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    setBusy(true);
    try {
      // Note: institution is optional and can be filled in later from Profile Settings
      await register({ ...form, institution: '' });
      navigate('/app/dashboard');
    } catch (err) {
      setError(err.message);
    } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-parchment">
      {/* Left brand panel */}
      <div className="hidden lg:flex flex-col justify-between bg-ink text-white p-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-50"/>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-glow"/>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-400/15 rounded-full blur-3xl"/>

        <div className="relative">
          <Link to="/"><Logo variant="light" size="lg"/></Link>
        </div>

        <div className="relative">
          <span className="eyebrow text-gold-300">— Join us</span>
          <h2 className="display text-4xl mt-4 leading-tight">
            Kenya's most focused research workspace.
          </h2>
          <ul className="mt-10 space-y-4 text-brand-100/90">
            {[
              'Submit your draft, receive a refined research instrument',
              'Unlock individual statistical tests as you need them',
              'Per-lesson SPSS modules — no bundled curriculum',
              'M-Pesa friendly — no card required',
            ].map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 mt-0.5">
                  <IconCheck className="w-3.5 h-3.5"/>
                </span>{b}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-brand-100/60">© {new Date().getFullYear()} The Postgraduate Data Hub, Kenya</p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-6"><Logo/></div>
          <span className="eyebrow">— Create account</span>
          <h1 className="display text-4xl text-brand mt-3">Start your journey</h1>
          <p className="mt-3 text-slate-600 text-sm">
            Set up your account in under a minute using your <strong>personal email</strong>. No card required.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <Field icon={IconUser} label="Full name" value={form.name} onChange={update('name')} placeholder="Jane Wanjiku" required autoComplete="name"/>
            <Field icon={IconMail} label="Personal email" type="email" value={form.email} onChange={update('email')}
              placeholder="jane.wanjiku@gmail.com" required autoComplete="email"/>
            <Field icon={IconPhone} label="Phone number" value={form.phone} onChange={update('phone')}
              placeholder="+254 712 345 678" required autoComplete="tel"/>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <IconLock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={update('password')}
                  placeholder="At least 6 characters" required autoComplete="new-password"
                  className="input pl-11 pr-12"/>
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-brand transition rounded-lg hover:bg-slate-100">
                  <EyeIcon open={showPwd}/>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-500 -mt-1 pl-1">
              💡 Use a personal email (Gmail, Yahoo, Outlook) — we send your survey links and deliverables there. You can add your institution later from Profile Settings.
            </p>

            {error && <p className="text-sm bg-red-50 text-red-700 p-3 rounded-xl">{error}</p>}

            <button disabled={busy} className="btn-primary w-full py-3.5 text-base">
              {busy ? 'Creating account…' : 'Create account'}
            </button>
            <p className="text-xs text-center text-slate-500">
              By signing up you agree to our{' '}
              <Link to="/terms" className="text-brand font-semibold hover:text-gold-600 underline">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-brand font-semibold hover:text-gold-600 underline">Privacy Policy</Link>.
            </p>
          </form>

          <p className="mt-7 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-brand font-bold hover:text-gold-600">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, ...props }) {
  return (
    <div>
      <label className="label">{label}</label>
      <div className="relative">
        <Icon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
        <input {...props} className="input pl-11"/>
      </div>
    </div>
  );
}
