import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { auth, MAX_DEVICES_PER_USER, REFERRAL_REWARD_KES, REFERRAL_TRIGGER_PRICE_KES } from '../lib/db.js';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', institution: '' });
  const [pwd, setPwd] = useState({ current: '', next: '' });
  const [msg, setMsg] = useState(null);

  // Devices state
  const [devices, setDevices] = useState([]);
  const [thisDeviceId, setThisDeviceId] = useState('');
  const [renaming, setRenaming] = useState(null);   // deviceId currently being renamed
  const [renameValue, setRenameValue] = useState('');

  const refreshDevices = async () => {
    try {
      setDevices(await auth.listDevices());
      setThisDeviceId(auth.getThisDeviceId());
    } catch { /* ignore */ }
  };

  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email, phone: user.phone || '', institution: user.institution || '' });
    refreshDevices();
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

  const startRename = (dev) => {
    setRenaming(dev.id);
    setRenameValue(dev.name || '');
  };

  const saveRename = async (deviceId) => {
    try {
      await auth.renameDevice(deviceId, renameValue);
      setRenaming(null);
      setRenameValue('');
      await refreshDevices();
      setMsg({ type: 'success', text: 'Device renamed.' });
      setTimeout(() => setMsg(null), 2500);
    } catch (e) {
      setMsg({ type: 'error', text: e.message });
    }
  };

  const removeDevice = async (dev) => {
    const isThis = dev.id === thisDeviceId;
    const question = isThis
      ? 'Remove THIS device? You will be signed out immediately and need to sign in again to re-register it.'
      : `Remove "${dev.name || 'this device'}"? The next time it tries to access your account, it will be signed out and forced to re-register.`;
    if (!window.confirm(question)) return;
    try {
      await auth.removeDevice(dev.id);
      if (isThis) {
        await logout();
        window.location.href = '/login';
        return;
      }
      await refreshDevices();
      setMsg({ type: 'success', text: 'Device removed. Slot is now free.' });
      setTimeout(() => setMsg(null), 2500);
    } catch (e) {
      setMsg({ type: 'error', text: e.message });
    }
  };

  const slotsUsed = devices.length;
  const slotsLeft = Math.max(0, MAX_DEVICES_PER_USER - slotsUsed);

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

      {/* ═════════ My Devices ═════════ */}
      <div className="card-elevated p-7 lg:p-9">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="eyebrow">— Security</span>
            <h2 className="display text-2xl text-brand mt-3">My Devices</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xl leading-relaxed">
              Your account is limited to <strong>{MAX_DEVICES_PER_USER} devices</strong> (e.g. one phone + one laptop). This protects your paid content from being shared. Remove any device you don't recognise or no longer use.
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="display text-3xl text-brand font-bold">{slotsUsed}<span className="text-slate-400 text-xl">/{MAX_DEVICES_PER_USER}</span></p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Slots used</p>
            {slotsLeft > 0 ? (
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">{slotsLeft} slot{slotsLeft === 1 ? '' : 's'} free</p>
            ) : (
              <p className="text-[11px] text-red-600 font-semibold mt-1">All slots used</p>
            )}
          </div>
        </div>

        {devices.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500 italic">No devices registered yet.</p>
        ) : (
          <ul className="mt-6 space-y-3">
            {devices.map((dev) => {
              const isThis = dev.id === thisDeviceId;
              const added = new Date(dev.added_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
              const lastSeen = dev.last_seen ? new Date(dev.last_seen).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : added;
              const isEditing = renaming === dev.id;
              return (
                <li key={dev.id} className={`p-4 rounded-2xl border-2 ${isThis ? 'border-emerald-300 bg-emerald-50/50' : 'border-slate-200 bg-slate-50/30'}`}>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-2xl">{/Mobile|iPhone|Android/i.test(dev.user_agent || '') ? '📱' : '💻'}</span>
                        {isEditing ? (
                          <input
                            autoFocus className="input py-1 px-2 text-sm max-w-xs"
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') saveRename(dev.id); if (e.key === 'Escape') setRenaming(null); }}
                            maxLength={40}
                          />
                        ) : (
                          <span className="font-display font-bold text-brand">
                            {dev.name || 'Unnamed device'}
                          </span>
                        )}
                        {isThis && (
                          <span className="badge bg-emerald-500 text-white text-[10px] font-bold">THIS DEVICE</span>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-slate-500 flex items-center gap-3 flex-wrap">
                        <span>Added {added}</span>
                        <span>·</span>
                        <span>Last used {lastSeen}</span>
                      </div>
                      {dev.user_agent && (
                        <p className="mt-1 text-[10px] text-slate-400 font-mono truncate max-w-md">
                          {dev.user_agent.slice(0, 80)}{dev.user_agent.length > 80 ? '…' : ''}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isEditing ? (
                        <>
                          <button onClick={() => saveRename(dev.id)}
                            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-brand text-white hover:bg-brand-700">
                            Save
                          </button>
                          <button onClick={() => setRenaming(null)}
                            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startRename(dev)}
                            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-brand hover:text-brand">
                            Rename
                          </button>
                          <button onClick={() => removeDevice(dev)}
                            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 hover:bg-red-100">
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {slotsLeft === 0 && (
          <p className="mt-4 text-xs text-amber-800 bg-amber-50 border border-amber-200 p-3 rounded-xl">
            💡 To sign in on a new device, you must first <strong>Remove</strong> one from the list above. This frees up a slot.
          </p>
        )}
      </div>

      {/* ═════════ My Referrals ═════════ */}
      <MyReferralsCard user={user} />

      {/* ═════════ Change password ═════════ */}
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

/* ═════════ My Referrals card ═════════ */
function MyReferralsCard({ user }) {
  const [copied, setCopied] = useState(false);
  const code = user?.referral_code || '—';
  const credits = user?.credits_kes || 0;
  const shareUrl = `${window.location.origin}/register?ref=${encodeURIComponent(code)}`;
  const shareText = `Join me on The Postgraduate Data Hub, Kenya — SPSS lessons, statistical test selector, and expert analysis for postgrad students. Use my code ${code} and we BOTH get KES ${REFERRAL_REWARD_KES} off. ${shareUrl}`;

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  };

  return (
    <div className="card-elevated p-7 lg:p-9 bg-gradient-to-br from-gold/5 to-brand/5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <span className="eyebrow">— Rewards</span>
          <h2 className="display text-2xl text-brand mt-3">Refer a friend, save together</h2>
          <p className="text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
            Every time someone joins with your code AND buys a KES {REFERRAL_TRIGGER_PRICE_KES.toLocaleString('en-KE')} lesson, you BOTH get <strong>KES {REFERRAL_REWARD_KES} credit</strong>. Credit auto-applies on your next purchase.
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="display text-4xl text-brand font-bold">KES {credits.toLocaleString('en-KE')}</p>
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Available credit</p>
          {credits > 0 && (
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">🎉 Applied automatically on your next purchase</p>
          )}
        </div>
      </div>

      {/* Referral code display + copy */}
      <div className="mt-6 p-5 rounded-2xl bg-white border-2 border-dashed border-gold/40">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Your referral code</p>
        <div className="mt-2 flex items-center justify-between gap-3 flex-wrap">
          <p className="display text-3xl text-brand font-bold font-mono tracking-widest">{code}</p>
          <button onClick={() => copy(code)} className="btn-outline text-sm">
            {copied ? '✓ Copied!' : '📋 Copy code'}
          </button>
        </div>
      </div>

      {/* Share buttons */}
      <div className="mt-4 grid sm:grid-cols-3 gap-3">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          target="_blank" rel="noopener"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 text-sm"
        >
          💬 Share on WhatsApp
        </a>
        <button
          onClick={() => copy(shareUrl)}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand text-white font-semibold hover:bg-brand-700 text-sm"
        >
          🔗 Copy share link
        </button>
        <a
          href={`mailto:?subject=${encodeURIComponent('Join me on The Postgraduate Data Hub, Kenya')}&body=${encodeURIComponent(shareText)}`}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-200 text-brand font-semibold hover:bg-slate-50 text-sm"
        >
          ✉️ Email a friend
        </a>
      </div>

      <p className="mt-4 text-[11px] text-slate-500 italic leading-relaxed">
        Tip: the reward triggers ONLY when your friend buys a KES {REFERRAL_TRIGGER_PRICE_KES.toLocaleString('en-KE')} lesson (Correlation, Regression, ANOVA, etc.) and admin approves the payment. Credits never expire.
      </p>
    </div>
  );
}
