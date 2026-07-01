import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { auth } from '../lib/db.js';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', institution: '' });
  const [pwd, setPwd] = useState({ current: '', next: '' });
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email, phone: user.phone || '', institution: user.institution || '' });
  }, [user]);

  const saveProfile = async (e) => {
    e.preventDefault();
    await updateProfile(form);
    setMsg({ type: 'success', text: 'Profile updated.' });
    setTimeout(() => setMsg(null), 2500);
  };

  const changePwd = async (e) => {
    e.preventDefault();
    if (user.password && pwd.current !== user.password) {
      setMsg({ type: 'error', text: 'Current password is incorrect.' }); return;
    }
    if (pwd.next.length < 6) { setMsg({ type: 'error', text: 'New password must be at least 6 characters.' }); return; }
    await auth.updateProfile({ password: pwd.next });
    setPwd({ current: '', next: '' });
    setMsg({ type: 'success', text: 'Password updated.' });
    setTimeout(() => setMsg(null), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <span className="eyebrow">— Account</span>
        <h1 className="display text-4xl text-brand mt-2">Profile Settings</h1>
        <p className="text-sm text-slate-500 mt-2">Manage your account and security preferences.</p>
      </div>

      {msg && (
        <div className={`p-3 rounded-xl text-sm ${
          msg.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
        }`}>{msg.text}</div>
      )}

      <div className="card-elevated p-7 lg:p-9">
        <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-ink text-gold text-2xl font-display font-bold flex items-center justify-center shadow-elevated">
            {(user?.name || 'U').charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="display text-2xl text-brand">{user?.name}</p>
            <p className="text-sm text-slate-500">{user?.institution || user?.email}</p>
          </div>
        </div>

        <form onSubmit={saveProfile} className="mt-7 grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label">Full name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/>
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}/>
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}/>
          </div>
          <div>
            <label className="label">Institution (optional)</label>
            <input className="input" value={form.institution}
              onChange={(e) => setForm({ ...form, institution: e.target.value })}
              placeholder="e.g. University of Nairobi"/>
            <p className="text-xs text-slate-500 mt-1.5">Add this if you'd like our team to tailor outputs to your institution's thesis format.</p>
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <button className="btn-primary">Save changes</button>
          </div>
        </form>
      </div>

      <div className="card-elevated p-7 lg:p-9">
        <span className="eyebrow">— Security</span>
        <h2 className="display text-2xl text-brand mt-3">Change password</h2>
        <form onSubmit={changePwd} className="mt-6 grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label">Current password</label>
            <input type="password" className="input" value={pwd.current}
              onChange={(e) => setPwd({ ...pwd, current: e.target.value })}/>
          </div>
          <div>
            <label className="label">New password</label>
            <input type="password" className="input" value={pwd.next}
              onChange={(e) => setPwd({ ...pwd, next: e.target.value })}/>
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <button className="btn-primary">Update password</button>
          </div>
        </form>
      </div>
    </div>
  );
}
