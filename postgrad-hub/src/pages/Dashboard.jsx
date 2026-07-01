import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { submissions, activities, unlocks, SUBMISSION_STATUSES } from '../lib/db.js';
import {
  IconForm, IconChart, IconBook, IconCalendar, IconCheck, IconArrow, IconClock, IconSpark,
} from '../components/Icons.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  const [subs, setSubs] = useState([]);
  const [acts, setActs] = useState([]);
  const [unlocked, setUnlocked] = useState([]);

  useEffect(() => {
    (async () => {
      setSubs(await submissions.list());
      setActs(await activities.list());
      setUnlocked(await unlocks.list());
    })();
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  const milestones = [
    { key: 'topic', label: 'Topic defined', done: true },
    { key: 'proposal', label: 'Proposal drafted', done: true },
    { key: 'instrument', label: 'Instrument refined', done: subs.some((s) => s.status === 'ready') },
    { key: 'collection', label: 'Data collected', done: false },
    { key: 'analysis', label: 'Data analysed', done: unlocked.some((u) => u.itemType === 'test') },
    { key: 'thesis', label: 'Thesis submitted', done: false },
  ];
  const progress = Math.round((milestones.filter((m) => m.done).length / milestones.length) * 100);
  const nextMilestone = milestones.find((m) => !m.done);

  return (
    <div className="space-y-8">
      {/* Welcome hero */}
      <div className="relative rounded-3xl bg-gradient-to-br from-brand-700 via-brand to-brand-600 text-white p-8 lg:p-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-40"/>
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gold/20 rounded-full blur-3xl animate-glow"/>
        <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-brand-400/20 rounded-full blur-3xl"/>

        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-gold-300">— {greeting}</span>
            <h1 className="display text-3xl sm:text-4xl lg:text-5xl mt-3">
              Welcome back, <span className="italic font-light text-gold">{user?.name?.split(' ')[0]}</span>
            </h1>
            <p className="mt-4 text-brand-100/80 max-w-xl">
              {nextMilestone
                ? <>Your next milestone is <span className="text-gold font-semibold">{nextMilestone.label}</span>.</>
                : 'All milestones complete — congratulations!'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/app/questionnaire" className="btn-gold">
              <IconForm className="w-4 h-4"/> Submit instrument
            </Link>
            <Link to="/app/tests" className="btn glass text-white hover:bg-white/15">
              <IconChart className="w-4 h-4"/> Pick a test
            </Link>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi label="Research progress" value={`${progress}%`} icon={IconSpark} bar={progress}/>
        <Kpi label="Active submissions" value={subs.length} icon={IconForm}/>
        <Kpi label="Unlocked items" value={unlocked.length} icon={IconBook}/>
        <Kpi label="Upcoming consultations" value={0} icon={IconCalendar}/>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Progress tracker */}
        <div className="card-elevated p-7 lg:col-span-2">
          <Header title="Research Progress Tracker" sub="Your end-to-end thesis journey"/>
          <ol className="mt-7 space-y-4">
            {milestones.map((m, i) => (
              <li key={m.key} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition ${
                  m.done ? 'bg-gold text-brand shadow-gold' : 'bg-slate-100 text-slate-400'
                }`}>
                  {m.done ? <IconCheck className="w-5 h-5"/> : i + 1}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-display font-bold ${m.done ? 'text-brand' : 'text-slate-500'}`}>
                    {m.label}
                  </p>
                  <div className="h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                    <div className={`h-full transition-all duration-700 ${m.done ? 'bg-gradient-to-r from-gold-300 to-gold' : ''}`}
                         style={{ width: m.done ? '100%' : '0%' }}/>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Recent activity */}
        <div className="card-elevated p-7">
          <Header title="Recent Activity"/>
          <ul className="mt-6 space-y-4">
            {acts.length === 0 && (
              <li className="text-sm text-slate-500">No activity yet. Submit your first instrument to begin.</li>
            )}
            {acts.map((a) => (
              <li key={a.id} className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/15 text-gold-700 flex items-center justify-center shrink-0">
                  <IconClock className="w-4 h-4"/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">{a.message}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{new Date(a.at).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Saved submissions */}
        <div className="card-elevated p-7 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <Header title="Your submissions"/>
            <Link to="/app/questionnaire" className="text-sm text-brand font-semibold hover:text-gold-600 flex items-center gap-1">
              New <IconArrow className="w-4 h-4"/>
            </Link>
          </div>
          {subs.length === 0 ? (
            <div className="mt-6 text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
              <IconForm className="w-12 h-12 mx-auto text-slate-300"/>
              <p className="mt-4 text-sm text-slate-500">No submissions yet.</p>
              <Link to="/app/questionnaire" className="btn-primary mt-5 inline-flex">
                Submit your first instrument
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {subs.slice(0, 5).map((s) => {
                const statusObj = SUBMISSION_STATUSES.find((x) => x.id === s.status);
                return (
                  <li key={s.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-display font-bold text-brand truncate">{s.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 capitalize">
                        {s.researchType} · Updated {new Date(s.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`badge shrink-0 ${
                      s.status === 'ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-gold/15 text-gold-700'
                    }`}>{statusObj?.label}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Quick links */}
        <div className="card-elevated p-7 bg-ink text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dark opacity-40"/>
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/20 rounded-full blur-3xl"/>
          <div className="relative">
            <span className="eyebrow text-gold-300">— Quick start</span>
            <h3 className="display text-2xl mt-2">What do you need today?</h3>
            <ul className="mt-6 space-y-3">
              {[
                { to: '/app/questionnaire', label: 'Refine my questionnaire / interview', icon: IconForm },
                { to: '/app/tests', label: 'Find the right test', icon: IconChart },
                { to: '/app/spss', label: 'Learn an SPSS technique', icon: IconBook },
                { to: '/app/analysis', label: 'Order analysis or interpretation', icon: IconSpark },
                { to: '/app/consultations', label: 'Book a consultation', icon: IconCalendar },
              ].map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link to={to}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition group">
                    <Icon className="w-5 h-5 text-gold"/>
                    <span className="flex-1 text-sm font-semibold">{label}</span>
                    <IconArrow className="w-4 h-4 text-brand-100 group-hover:translate-x-1 transition"/>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ title, sub }) {
  return (
    <div>
      <h3 className="display text-xl text-brand">{title}</h3>
      {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
    </div>
  );
}

function Kpi({ label, value, icon: Icon, bar }) {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{label}</p>
          <p className="display text-3xl text-brand mt-2">{value}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold-700 flex items-center justify-center">
          <Icon className="w-5 h-5"/>
        </div>
      </div>
      {typeof bar === 'number' && (
        <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gold-300 to-gold rounded-full transition-all duration-700"
               style={{ width: `${bar}%` }}/>
        </div>
      )}
    </div>
  );
}
