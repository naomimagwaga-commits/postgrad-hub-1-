import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../lib/db.js';
import Logo from '../components/Logo.jsx';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null); setMsg(null);
    try {
      await auth.resetPassword({ email, newPassword: pwd });
      setMsg('Password updated successfully. You can now sign in.');
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-light opacity-60"/>
      <div className="absolute top-20 right-20 w-72 h-72 bg-gold/15 rounded-full blur-3xl"/>

      <div className="relative w-full max-w-md card-elevated p-8 lg:p-10">
        <div className="flex justify-center mb-6"><Logo size="lg"/></div>
        <span className="eyebrow block text-center">— Reset password</span>
        <h1 className="display text-3xl text-brand text-center mt-3">Forgotten password</h1>
        <p className="mt-2 text-sm text-slate-500 text-center">
          Enter your email and choose a new password.
        </p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="label">Email</label>
            <input type="email" required value={email} className="input"
              onChange={(e) => setEmail(e.target.value)} placeholder="you@institution.ac.ke"/>
          </div>
          <div>
            <label className="label">New password</label>
            <input type="password" required value={pwd} className="input"
              onChange={(e) => setPwd(e.target.value)} placeholder="At least 6 characters"/>
          </div>
          {err && <p className="text-sm bg-red-50 text-red-700 p-3 rounded-xl">{err}</p>}
          {msg && <p className="text-sm bg-emerald-50 text-emerald-700 p-3 rounded-xl">{msg}</p>}
          <button className="btn-primary w-full py-3.5">Update password</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          <Link to="/login" className="text-brand font-bold hover:text-gold-600">← Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
