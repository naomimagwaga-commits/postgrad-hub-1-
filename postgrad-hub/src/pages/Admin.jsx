import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  admin, submissions as subApi, unlocks as unlockApi, bookings as bookApi,
  analysisOrders as orderApi, SUBMISSION_STATUSES, BOOKING_STATUSES, ANALYSIS_STATUSES,
} from '../lib/db.js';
import { sendUnlockApprovedEmail } from '../lib/emails.js';
import {
  IconUser, IconForm, IconChart, IconBook, IconCalendar, IconCheck, IconClose,
  IconArrow, IconLock, IconPlus, IconTrash, IconClock, IconSpark,
} from '../components/Icons.jsx';

const TABS = [
  { id: 'overview',    label: 'Overview',    icon: IconChart },
  { id: 'users',       label: 'Users',       icon: IconUser },
  { id: 'submissions', label: 'Submissions', icon: IconForm },
  { id: 'unlocks',     label: 'Unlock requests', icon: IconLock },
  { id: 'analysis',    label: 'Analysis orders', icon: IconSpark },
  { id: 'bookings',    label: 'Bookings',    icon: IconCalendar },
  { id: 'services',    label: 'Services',    icon: IconBook },
  { id: 'availability',label: 'Availability',icon: IconClock },
];

export default function Admin() {
  const { user } = useAuth();
  const [tab, setTab] = useState('overview');
  const [pendingCounts, setPendingCounts] = useState({ unlocks: 0, submissions: 0, analysis: 0, bookings: 0 });

  // Poll pending counts every 30s so the badges stay fresh.
  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    const refreshCounts = async () => {
      try {
        const [u, s, a, b] = await Promise.all([
          admin.unlocks(), admin.submissions(), admin.analysisOrders(), admin.bookings(),
        ]);
        setPendingCounts({
          unlocks:     u.filter((x) => x.status === 'pending' && x.paymentStatus === 'claimed').length,
          submissions: s.filter((x) => x.status === 'submitted').length,
          analysis:    a.filter((x) => x.status === 'submitted').length,
          bookings:    b.filter((x) => x.status === 'pending').length,
        });
      } catch { /* ignore */ }
    };
    refreshCounts();
    const iv = setInterval(refreshCounts, 30000);
    return () => clearInterval(iv);
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto card-elevated p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
          <IconLock className="w-8 h-8"/>
        </div>
        <h1 className="display text-3xl text-brand mt-5">Admin access only</h1>
        <p className="text-slate-600 mt-3">
          This area is restricted to administrators. If you need access, contact the platform team.
        </p>
        <p className="text-xs text-slate-400 mt-6">
          If you should have admin access but don't, contact the platform owner to be added to the admin allow-list.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="eyebrow">— Admin</span>
        <h1 className="display text-4xl lg:text-5xl text-brand mt-2">Operations Dashboard</h1>
        <p className="text-sm text-slate-500 mt-2">Manage the platform end-to-end.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-slate-200 -mx-4 sm:mx-0 px-4 sm:px-0">
        {TABS.map(({ id, label, icon: Icon }) => {
          const badge = pendingCounts[id];
          return (
            <button key={id} onClick={() => setTab(id)}
              className={`px-4 py-3 text-sm font-bold whitespace-nowrap flex items-center gap-2 border-b-2 -mb-px transition ${
                tab === id ? 'border-gold text-brand' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}>
              <Icon className="w-4 h-4"/> {label}
              {badge > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold bg-red-500 text-white animate-pulse">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="reveal">
        {tab === 'overview' && <Overview/>}
        {tab === 'users' && <Users/>}
        {tab === 'submissions' && <Submissions/>}
        {tab === 'unlocks' && <Unlocks/>}
        {tab === 'analysis' && <AnalysisOrders/>}
        {tab === 'bookings' && <Bookings/>}
        {tab === 'services' && <Services/>}
        {tab === 'availability' && <Availability/>}
      </div>
    </div>
  );
}

/* ─────────── OVERVIEW ─────────── */
function Overview() {
  const [m, setM] = useState(null);
  const [recent, setRecent] = useState({ subs: [], unlocks: [], bookings: [] });

  useEffect(() => {
    (async () => {
      setM(await admin.metrics());
      setRecent({
        subs: (await admin.submissions()).slice(0, 5),
        unlocks: (await admin.unlocks()).slice(0, 5),
        bookings: (await admin.bookings()).slice(0, 5),
      });
    })();
  }, []);

  if (!m) return null;

  const cards = [
    { label: 'Total users', value: m.users, icon: IconUser, accent: 'brand' },
    { label: 'Submissions in progress', value: m.submissionsPending, icon: IconForm, accent: 'gold' },
    { label: 'Submissions ready', value: m.submissionsReady, icon: IconCheck, accent: 'emerald' },
    { label: 'Pending unlocks', value: m.unlocksPending, icon: IconLock, accent: 'amber' },
    { label: '🔔 Payments to verify', value: m.unlocksClaimed, icon: IconCheck, accent: m.unlocksClaimed > 0 ? 'red' : 'gold' },
    { label: 'Analysis orders open', value: m.analysisOrdersOpen, icon: IconSpark, accent: 'gold' },
    { label: 'Bookings pending', value: m.bookingsPending, icon: IconCalendar, accent: 'gold' },
    { label: 'Upcoming sessions', value: m.bookingsUpcoming, icon: IconClock, accent: 'brand' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => <KpiCard key={c.label} {...c}/>)}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <RecentList title="Recent submissions" items={recent.subs} empty="No submissions yet"
          render={(s) => (
            <>
              <p className="font-bold text-brand text-sm truncate">{s.title}</p>
              <p className="text-xs text-slate-500">{s.user?.name} · {SUBMISSION_STATUSES.find((x) => x.id === s.status)?.label}</p>
            </>
          )}/>
        <RecentList title="Pending unlock requests" items={recent.unlocks.filter((u) => u.status === 'pending')}
          empty="No pending requests"
          render={(u) => (
            <>
              <p className="font-bold text-brand text-sm truncate">{u.itemName}</p>
              <p className="text-xs text-slate-500">{u.user?.name} · {u.itemType}</p>
            </>
          )}/>
        <RecentList title="Upcoming bookings" items={recent.bookings}
          empty="No bookings yet"
          render={(b) => (
            <>
              <p className="font-bold text-brand text-sm truncate">{b.serviceName}</p>
              <p className="text-xs text-slate-500">{b.user?.name} · {b.date} {b.time}</p>
            </>
          )}/>
      </div>
    </div>
  );
}

function KpiCard({ label, value, icon: Icon, accent }) {
  const colors = {
    brand: 'bg-brand/10 text-brand',
    gold: 'bg-gold/15 text-gold-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
  };
  return (
    <div className="card-elevated p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{label}</p>
          <p className="display text-3xl text-brand mt-2">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[accent]}`}>
          <Icon className="w-5 h-5"/>
        </div>
      </div>
    </div>
  );
}

function RecentList({ title, items, render, empty }) {
  return (
    <div className="card-elevated p-6">
      <h3 className="display text-lg text-brand">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.length === 0 && <li className="text-sm text-slate-400 italic">{empty}</li>}
        {items.map((it, i) => (
          <li key={i} className="pb-3 border-b border-slate-100 last:border-0 last:pb-0">{render(it)}</li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────── USERS ─────────── */
function Users() {
  const [list, setList] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const refresh = () => admin.users().then(setList);
  useEffect(() => { refresh(); }, []);

  const clearAllDevices = async (userId, userName) => {
    if (!window.confirm(`Force-clear ALL devices from ${userName}'s account? They'll be signed out and their next login will register as device #1.`)) return;
    await admin.clearUserDevices(userId);
    await refresh();
    alert(`✅ Cleared all devices for ${userName}.`);
  };

  const removeOneDevice = async (userId, deviceId, deviceName, userName) => {
    if (!window.confirm(`Remove "${deviceName}" from ${userName}'s account? They'll be signed out from that device.`)) return;
    await admin.removeUserDevice(userId, deviceId);
    await refresh();
  };

  return (
    <div className="card-elevated overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="display text-2xl text-brand">Users</h2>
        <span className="badge-brand">{list.length} total</span>
      </div>
      {list.length === 0 ? (
        <div className="p-10 text-center text-slate-500">No users yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr className="text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Devices</th>
                <th className="px-6 py-3">Joined</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((u) => {
                const deviceCount = (u.devices || []).length;
                const isExpanded = expandedId === u.id;
                return [
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-brand text-gold font-bold flex items-center justify-center text-sm">
                            {(u.name || 'U').charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-brand">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{u.email}</td>
                      <td className="px-6 py-4 text-slate-600">
                        {u.phone ? (
                          <a href={`https://wa.me/${(u.phone || '').replace(/\D/g, '').replace(/^0/, '254')}`}
                             target="_blank" rel="noopener"
                             className="text-emerald-700 hover:underline">
                            {u.phone}
                          </a>
                        ) : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`badge text-xs ${
                          deviceCount === 0 ? 'bg-slate-100 text-slate-500' :
                          deviceCount === 1 ? 'bg-emerald-100 text-emerald-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {deviceCount}/2 devices
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => setExpandedId(isExpanded ? null : u.id)}
                          className="text-xs font-bold text-brand hover:text-gold-600">
                          {isExpanded ? 'Close ▲' : 'Manage ▼'}
                        </button>
                      </td>
                    </tr>
                    ,
                    isExpanded && (
                      <tr key={u.id + '-devices'} className="bg-slate-50/60">
                        <td colSpan={6} className="px-6 py-5">
                          <div className="max-w-3xl">
                            <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                              <p className="font-display font-bold text-brand text-sm">
                                Registered devices ({deviceCount}/2)
                              </p>
                              {deviceCount > 0 && (
                                <button onClick={() => clearAllDevices(u.id, u.name)}
                                  className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 hover:bg-red-100">
                                  🚨 Force-clear ALL devices
                                </button>
                              )}
                            </div>
                            {deviceCount === 0 ? (
                              <p className="text-xs text-slate-500 italic">No devices registered.</p>
                            ) : (
                              <ul className="space-y-2">
                                {(u.devices || []).map((dev) => (
                                  <li key={dev.id} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-3 flex-wrap">
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="text-lg">{/Mobile|iPhone|Android/i.test(dev.user_agent || '') ? '📱' : '💻'}</span>
                                        <span className="font-bold text-brand text-sm">{dev.name || 'Unnamed'}</span>
                                      </div>
                                      <p className="text-[11px] text-slate-500 mt-0.5">
                                        Added {new Date(dev.added_at).toLocaleDateString('en-GB')}
                                        {dev.last_seen && <> · Last used {new Date(dev.last_seen).toLocaleDateString('en-GB')}</>}
                                      </p>
                                      {dev.user_agent && (
                                        <p className="text-[10px] text-slate-400 mt-0.5 font-mono truncate max-w-md">
                                          {dev.user_agent.slice(0, 80)}
                                        </p>
                                      )}
                                    </div>
                                    <button onClick={() => removeOneDevice(u.id, dev.id, dev.name || 'this device', u.name)}
                                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 shrink-0">
                                      Remove
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                            <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
                              💡 Use "Force-clear ALL devices" when a student contacts support saying they lost access to both devices. Their next login registers a fresh device #1.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ),
                  ];
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─────────── SUBMISSIONS ─────────── */
function Submissions() {
  const [list, setList] = useState([]);
  const [active, setActive] = useState(null);

  const refresh = async () => setList(await admin.submissions());
  useEffect(() => { refresh(); }, []);

  if (active) return <SubmissionDetail item={active}
    onBack={() => { setActive(null); refresh(); }}
    onUpdate={async (patch) => {
      const updated = await subApi.update(active.id, patch);
      setActive({ ...active, ...updated });
      await refresh();
    }}/>;

  return (
    <div className="card-elevated overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="display text-2xl text-brand">Submissions</h2>
        <span className="badge-brand">{list.length} total</span>
      </div>
      {list.length === 0 ? (
        <div className="p-10 text-center text-slate-500">No submissions yet.</div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {list.map((s) => {
            const stat = SUBMISSION_STATUSES.find((x) => x.id === s.status);
            return (
              <li key={s.id}>
                <button onClick={() => setActive(s)}
                  className="w-full text-left px-6 py-4 hover:bg-slate-50 flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-brand truncate">{s.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {s.user?.name} · {s.user?.institution} · {new Date(s.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`badge shrink-0 ${
                    s.status === 'ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-gold/15 text-gold-700'
                  }`}>{stat?.label}</span>
                  <IconArrow className="w-4 h-4 text-slate-300"/>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function SubmissionDetail({ item, onBack, onUpdate }) {
  const [link, setLink] = useState(item.surveyLink || '');
  const [note, setNote] = useState(item.adminNote || '');

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="btn-outline">← Back to submissions</button>

      <div className="card-elevated p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="eyebrow">— Submission</span>
            <h2 className="display text-3xl text-brand mt-2">{item.title}</h2>
            <p className="text-sm text-slate-500 mt-1 capitalize">
              {item.researchType} · {item.user?.name} · {item.user?.email}
            </p>
          </div>
          <span className={`badge ${
            item.status === 'ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-gold/15 text-gold-700'
          }`}>
            {SUBMISSION_STATUSES.find((x) => x.id === item.status)?.label}
          </span>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Detail label="Objectives" value={item.objectives}/>
          <Detail label="Variables" value={item.variables}/>
          <Detail label="Population" value={item.population || '—'}/>
          <Detail label="Attached file" value={item.attachmentName || 'None'}/>
          {item.notes && <div className="sm:col-span-2"><Detail label="Notes from student" value={item.notes}/></div>}
        </div>

        {/* Status updater */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="font-display font-bold text-brand text-lg">Update status</h3>
          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2">
            {SUBMISSION_STATUSES.map((s) => (
              <button key={s.id} onClick={() => onUpdate({ status: s.id })}
                className={`p-3 rounded-xl border-2 text-sm font-bold transition ${
                  item.status === s.id
                    ? 'border-gold bg-gold/10 text-brand'
                    : 'border-slate-200 hover:border-brand-200 text-slate-600'
                }`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Survey link */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="font-display font-bold text-brand text-lg">Deliver survey link</h3>
          <p className="text-xs text-slate-500 mt-1">Paste the final survey link. The student will see it on their dashboard once you save.</p>
          <div className="mt-3 flex flex-col sm:flex-row gap-3">
            <input value={link} onChange={(e) => setLink(e.target.value)}
              placeholder="https://surveys.postgraddatahub.co.ke/s/…"
              className="input flex-1 font-mono text-xs"/>
            <button onClick={() => onUpdate({ surveyLink: link, status: 'ready' })}
              className="btn-gold shrink-0">Save & mark ready</button>
          </div>
        </div>

        {/* Internal note */}
        <div className="mt-6">
          <label className="label">Internal note (admin only)</label>
          <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)}
            onBlur={() => onUpdate({ adminNote: note })}
            placeholder="Any internal notes about this submission…" className="input"/>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="text-sm text-brand mt-1.5 whitespace-pre-wrap leading-relaxed">{value || '—'}</p>
    </div>
  );
}

/* ─────────── UNLOCKS ─────────── */
function Unlocks() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('pending');

  const refresh = async () => setList(await admin.unlocks());
  useEffect(() => { refresh(); }, []);

  const filtered = list.filter((u) => filter === 'all' || u.status === filter);

  const approve = async (unlockRow) => {
    const updated = await unlockApi.approve(unlockRow.id);
    // Fire-and-forget: notify the student their access is now live.
    if (unlockRow.user?.email) {
      sendUnlockApprovedEmail({
        studentEmail: unlockRow.user.email,
        studentName:  unlockRow.user.name,
        itemName:     unlockRow.itemName,
        expiresAt:    updated?.expires_at || updated?.expiresAt,
      }).catch(() => {});
    }
    refresh();
  };
  const decline = async (id) => { await unlockApi.decline(id); refresh(); };

  return (
    <div className="card-elevated overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="display text-2xl text-brand">Unlock requests</h2>
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 text-xs">
          {['pending', 'unlocked', 'declined', 'all'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg font-bold capitalize ${
                filter === f ? 'bg-white shadow-sm text-brand' : 'text-slate-500 hover:text-brand'
              }`}>
              {f} {f !== 'all' && `(${list.filter((u) => u.status === f).length})`}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-10 text-center text-slate-500">No requests in this view.</div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {filtered.map((u) => {
            const isPackage = u.itemType === 'package' && Array.isArray(u.packageLessonIds);
            const isClaimed = u.paymentStatus === 'claimed' && u.status === 'pending';
            return (
              <li key={u.id} className={`px-6 py-5 flex items-start justify-between gap-4 ${
                isClaimed ? 'bg-amber-50/40' : ''
              }`}>
                <div className="min-w-0 flex-1">
                  {/* AMOUNT — big and unmissable */}
                  {u.priceKES != null && (
                    <div className="mb-2 flex items-center gap-2 flex-wrap">
                      <span className="display text-2xl font-bold text-brand">
                        KES {Number(u.priceKES).toLocaleString('en-KE')}
                      </span>
                      {u.creditApplied > 0 && (
                        <span className="badge bg-emerald-500 text-white text-[10px] font-bold">
                          🎁 KES {u.creditApplied} referral credit applied
                        </span>
                      )}
                      {isPackage && (
                        <span className="badge bg-emerald-500 text-white text-[10px] font-bold">
                          📦 Package · {u.packageLessonIds.length} lessons
                        </span>
                      )}
                      {u.isRenewal && (
                        <span className="badge bg-purple-500 text-white text-[10px] font-bold">
                          🔄 Renewal
                        </span>
                      )}
                      {isClaimed && (
                        <span className="badge bg-amber-500 text-white text-[10px] font-bold animate-pulse">
                          🔔 Verify against M-Pesa
                        </span>
                      )}
                    </div>
                  )}
                  {u.creditApplied > 0 && u.priceBeforeCredit && (
                    <p className="text-[11px] text-slate-500 -mt-1 mb-1">
                      Original: KES {u.priceBeforeCredit.toLocaleString('en-KE')} · Verify M-Pesa payment of <strong>KES {u.priceKES.toLocaleString('en-KE')}</strong>
                    </p>
                  )}

                  {/* Item name */}
                  <p className="font-bold text-brand">{u.itemName}</p>

                  {/* Package expansion (which lessons will unlock) */}
                  {isPackage && (
                    <p className="text-[11px] text-emerald-700 mt-0.5 font-semibold">
                      Approving this unlocks: {u.packageLessonIds.join(', ')}
                    </p>
                  )}

                  {/* Student details */}
                  <div className="mt-2 text-xs text-slate-600 space-y-0.5">
                    <p>
                      👤 <strong>{u.user?.name || '(no name)'}</strong>
                      {u.user?.phone && <> · 📞 <a href={`https://wa.me/${(u.user.phone || '').replace(/\D/g, '').replace(/^0/, '254')}`} target="_blank" rel="noopener" className="text-emerald-700 font-semibold hover:underline">{u.user.phone}</a></>}
                    </p>
                    <p>
                      ✉️ <a href={`mailto:${u.user?.email}`} className="text-brand font-semibold hover:underline">{u.user?.email}</a>
                    </p>
                    <p className="text-slate-400">
                      Requested {new Date(u.requestedAt).toLocaleString('en-GB', { timeZone: 'Africa/Nairobi' })}
                      {u.claimedAt && <> · Claimed {new Date(u.claimedAt).toLocaleString('en-GB', { timeZone: 'Africa/Nairobi' })}</>}
                    </p>
                  </div>
                </div>
                {u.status === 'pending' ? (
                  <div className="flex flex-col gap-2 shrink-0 items-end">
                    <button onClick={() => approve(u)} className="btn-gold text-xs py-2 px-4">
                      <IconCheck className="w-4 h-4"/> Confirm & unlock
                    </button>
                    <button onClick={() => decline(u.id)} className="btn-outline text-xs py-1.5 px-3">
                      <IconClose className="w-4 h-4"/> Decline
                    </button>
                  </div>
                ) : (
                  <span className={`badge shrink-0 ${
                    u.status === 'unlocked' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}>{u.status}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ─────────── ANALYSIS ORDERS ─────────── */
function AnalysisOrders() {
  const [list, setList] = useState([]);
  const [active, setActive] = useState(null);

  const refresh = async () => setList(await admin.analysisOrders());
  useEffect(() => { refresh(); }, []);

  if (active) {
    return (
      <div className="space-y-4">
        <button onClick={() => { setActive(null); refresh(); }} className="btn-outline">← Back to orders</button>
        <div className="card-elevated p-8">
          <span className="eyebrow">— {active.tierName}</span>
          <h2 className="display text-3xl text-brand mt-2">{active.title}</h2>
          <p className="text-sm text-slate-500 mt-1">{active.user?.name} · {active.user?.email}</p>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Field label="Objectives" value={active.objectives}/>
            <Field label="Hypotheses" value={active.hypotheses}/>
            <Field label="Analyses requested" value={active.analyses}/>
            <Field label="Attached file" value={active.attachmentName || 'None'}/>
            {active.notes && <div className="sm:col-span-2"><Field label="Notes" value={active.notes}/></div>}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="font-display font-bold text-brand text-lg">Update status</h3>
            <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2">
              {ANALYSIS_STATUSES.map((s) => (
                <button key={s.id} onClick={async () => {
                  await orderApi.update(active.id, { status: s.id });
                  await refresh();
                  const fresh = (await admin.analysisOrders()).find((o) => o.id === active.id);
                  if (fresh) setActive(fresh);
                }}
                  className={`p-3 rounded-xl border-2 text-sm font-bold transition ${
                    active.status === s.id ? 'border-gold bg-gold/10 text-brand' :
                    'border-slate-200 hover:border-brand-200 text-slate-600'
                  }`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-display font-bold text-brand text-lg">Deliverable link</h3>
            <p className="text-xs text-slate-500 mt-1">Paste a link to the completed file (Drive, Dropbox, etc.).</p>
            <div className="mt-3 flex flex-col sm:flex-row gap-3">
              <input defaultValue={active.deliverableLink || ''} id="deliverable-link"
                className="input flex-1 font-mono text-xs"
                placeholder="https://drive.google.com/…"/>
              <button onClick={async () => {
                const v = document.getElementById('deliverable-link').value;
                await orderApi.update(active.id, { deliverableLink: v, status: 'delivered' });
                await refresh();
                const fresh = (await admin.analysisOrders()).find((o) => o.id === active.id);
                if (fresh) setActive(fresh);
              }} className="btn-gold shrink-0">Save & deliver</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-elevated overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="display text-2xl text-brand">Analysis & Interpretation orders</h2>
        <span className="badge-brand">{list.length} total</span>
      </div>
      {list.length === 0 ? (
        <div className="p-10 text-center text-slate-500">No orders yet.</div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {list.map((o) => {
            const stat = ANALYSIS_STATUSES.find((s) => s.id === o.status);
            return (
              <li key={o.id}>
                <button onClick={() => setActive(o)}
                  className="w-full text-left px-6 py-4 hover:bg-slate-50 flex items-center justify-between gap-4">
                  <div className="text-2xl shrink-0">
                    {o.tierId === 'tables' ? '📊' : o.tierId === 'interpretation' ? '✍️' : '🎯'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-brand truncate">{o.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {o.tierName} · {o.user?.name} · {new Date(o.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`badge shrink-0 ${
                    o.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-gold/15 text-gold-700'
                  }`}>{stat.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="text-sm text-brand mt-1.5 whitespace-pre-wrap leading-relaxed">{value || '—'}</p>
    </div>
  );
}

/* ─────────── BOOKINGS ─────────── */
function Bookings() {
  const [list, setList] = useState([]);
  const refresh = async () => setList(await admin.bookings());
  useEffect(() => { refresh(); }, []);

  const setStatus = async (id, status) => { await bookApi.update(id, { status }); refresh(); };

  return (
    <div className="card-elevated overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="display text-2xl text-brand">Bookings</h2>
        <span className="badge-brand">{list.length} total</span>
      </div>
      {list.length === 0 ? (
        <div className="p-10 text-center text-slate-500">No bookings yet.</div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {list.map((b) => {
            const stat = BOOKING_STATUSES.find((x) => x.id === b.status);
            const colorMap = {
              amber: 'bg-amber-100 text-amber-700',
              emerald: 'bg-emerald-100 text-emerald-700',
              brand: 'bg-brand/10 text-brand',
              slate: 'bg-slate-100 text-slate-600',
            };
            return (
              <li key={b.id} className="px-6 py-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-ink text-gold flex flex-col items-center justify-center shrink-0">
                  <span className="text-[9px] uppercase tracking-wider font-bold">
                    {new Date(b.date).toLocaleDateString('en-GB', { month: 'short' })}
                  </span>
                  <span className="text-xl font-display font-bold leading-none">
                    {new Date(b.date).getDate()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-brand">{b.serviceName}</p>
                  <p className="text-xs text-slate-500">
                    {b.user?.name} · {b.user?.email} · {b.time}
                  </p>
                  {b.notes && <p className="text-xs text-slate-400 mt-1 line-clamp-1">"{b.notes}"</p>}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={`badge ${colorMap[stat.color]}`}>{stat.label}</span>
                  <select value={b.status} onChange={(e) => setStatus(b.id, e.target.value)}
                    className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white">
                    {BOOKING_STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ─────────── SERVICES ─────────── */
function Services() {
  const [list, setList] = useState([]);
  useEffect(() => { admin.getServices().then(setList); }, []);

  const save = async (next) => { setList(next); await admin.setServices(next); };
  const addService = () => save([...list, {
    id: 'srv-' + Math.random().toString(36).slice(2, 7),
    name: 'New service', active: true,
  }]);
  const updateField = (id, k, v) => save(list.map((s) => s.id === id ? { ...s, [k]: v } : s));
  const remove = (id) => save(list.filter((s) => s.id !== id));

  return (
    <div className="card-elevated overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="display text-2xl text-brand">Services</h2>
        <button onClick={addService} className="btn-gold text-sm"><IconPlus className="w-4 h-4"/> Add service</button>
      </div>
      <ul className="divide-y divide-slate-100">
        {list.map((s) => (
          <li key={s.id} className="px-6 py-4 grid grid-cols-12 gap-3 items-center">
            <input value={s.name} onChange={(e) => updateField(s.id, 'name', e.target.value)}
              className="input col-span-12 sm:col-span-8"/>
            <label className="col-span-8 sm:col-span-3 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={s.active} onChange={(e) => updateField(s.id, 'active', e.target.checked)}
                className="w-4 h-4"/>
              Active
            </label>
            <button onClick={() => remove(s.id)} className="col-span-4 sm:col-span-1 text-slate-300 hover:text-red-500 justify-self-end">
              <IconTrash className="w-5 h-5"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────── AVAILABILITY ─────────── */
function Availability() {
  const [av, setAv] = useState(null);
  useEffect(() => { admin.getAvailability().then(setAv); }, []);

  if (!av) return null;

  const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
  const allSlots = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];

  const toggle = async (day, time) => {
    const next = { ...av };
    if (next[day].includes(time)) next[day] = next[day].filter((t) => t !== time);
    else next[day] = [...next[day], time].sort();
    setAv(next);
    await admin.setAvailability(next);
  };

  return (
    <div className="card-elevated p-6">
      <h2 className="display text-2xl text-brand">Weekly availability</h2>
      <p className="text-sm text-slate-500 mt-1">Click to toggle time slots. Students will only see selected slots when booking.</p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left p-2 text-xs uppercase tracking-wider text-slate-500">Time</th>
              {days.map((d) => (
                <th key={d} className="text-center p-2 text-xs uppercase tracking-wider text-slate-500 capitalize">
                  {d.slice(0, 3)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allSlots.map((time) => (
              <tr key={time}>
                <td className="p-2 font-bold text-brand text-sm">{time}</td>
                {days.map((d) => {
                  const on = av[d].includes(time);
                  return (
                    <td key={d} className="p-1 text-center">
                      <button onClick={() => toggle(d, time)}
                        className={`w-full py-2 rounded-lg border-2 text-xs font-bold transition ${
                          on ? 'bg-gold text-brand border-gold' :
                          'border-slate-200 hover:border-brand-200 text-slate-400'
                        }`}>
                        {on ? '✓' : '·'}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
