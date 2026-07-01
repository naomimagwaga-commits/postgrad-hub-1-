import { useEffect, useState } from 'react';
import { analysisOrders, ANALYSIS_TIERS, ANALYSIS_STATUSES } from '../lib/db.js';
import {
  IconChart, IconCheck, IconArrow, IconShield, IconClose, IconPlus, IconClock,
} from '../components/Icons.jsx';

export default function AnalysisServices() {
  const [view, setView] = useState('catalog'); // catalog | order | mine | detail
  const [mine, setMine] = useState([]);
  const [activeTier, setActiveTier] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);

  const refresh = async () => setMine(await analysisOrders.list());
  useEffect(() => { refresh(); }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <span className="eyebrow">— Module 05</span>
          <h1 className="display text-4xl lg:text-5xl text-brand mt-2">
            Done-for-You Analysis & Interpretation
          </h1>
          <p className="mt-3 text-slate-600 max-w-3xl leading-relaxed">
            Don't want to run the analysis or write up the findings yourself? Our team of <strong>well-knowledgeable PhD researchers</strong> handles it for you. Choose exactly what you need —
            just the <strong>tables</strong>, just the <strong>interpretation</strong>, or the <strong>full chapter</strong>. Each tier is priced separately so you only pay for what you actually need.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => setView('catalog')}
            className={view === 'catalog' ? 'btn-primary' : 'btn-outline'}>Services</button>
          <button onClick={() => setView('mine')}
            className={view === 'mine' ? 'btn-primary' : 'btn-outline'}>
            My orders ({mine.length})
          </button>
        </div>
      </div>

      {view === 'catalog' && (
        <Catalog onOrder={(t) => { setActiveTier(t); setView('order'); }}/>
      )}
      {view === 'order' && activeTier && (
        <OrderForm tier={activeTier}
          onDone={async () => { await refresh(); setView('mine'); }}
          onCancel={() => setView('catalog')}/>
      )}
      {view === 'mine' && (
        <MyOrders list={mine} onOpen={(o) => { setActiveOrder(o); setView('detail'); }}
          onBrowse={() => setView('catalog')}/>
      )}
      {view === 'detail' && activeOrder && (
        <OrderDetail order={activeOrder} onBack={() => setView('mine')}/>
      )}
    </div>
  );
}

function Catalog({ onOrder }) {
  return (
    <>
      <div className="grid lg:grid-cols-3 gap-5">
        {ANALYSIS_TIERS.map((t, i) => {
          const isFull = t.id === 'full';
          return (
            <div key={t.id}
              className={`relative card-elevated p-7 lg:p-8 reveal hover:-translate-y-1 transition-all ${
                isFull ? 'border-2 border-gold/40 ring-2 ring-gold/10' : ''
              }`}
              style={{ animationDelay: `${i * 0.06}s` }}>
              {isFull && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge bg-gold text-brand-700 px-3 py-1 font-bold">
                  Most popular
                </span>
              )}
              <div className="text-4xl">{i === 0 ? '📊' : i === 1 ? '✍️' : '🎯'}</div>
              <h3 className="display text-2xl text-brand mt-4">{t.name}</h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed min-h-[5rem]">{t.blurb}</p>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-xs uppercase tracking-wider font-bold text-gold-700 mb-3">You receive</p>
                <ul className="space-y-2">
                  {t.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-slate-700">
                      <IconCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"/> {d}
                    </li>
                  ))}
                </ul>
              </div>

              {t.requires && (
                <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
                  ⚠️ {t.requires}
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-xs text-gold-700 font-semibold uppercase tracking-wider">Priced separately</span>
                <button onClick={() => onOrder(t)}
                  className={isFull ? 'btn-gold' : 'btn-primary'}>
                  Order this <IconArrow className="w-4 h-4"/>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div className="card-elevated p-6 flex items-start gap-4 bg-brand-50/40 border-brand-100">
          <IconShield className="w-6 h-6 text-gold-600 shrink-0 mt-1"/>
          <div>
            <p className="font-display font-bold text-brand">Confidential by default.</p>
            <p className="text-sm text-slate-600 mt-1">
              Your dataset, hypotheses and findings remain entirely yours. We never share, publish or reuse client work.
            </p>
          </div>
        </div>
        <div className="card-elevated p-6 flex items-start gap-4 bg-gold/5 border-gold/20">
          <div className="text-2xl shrink-0">🎓</div>
          <div>
            <p className="font-display font-bold text-brand">Handled by PhD researchers.</p>
            <p className="text-sm text-slate-600 mt-1">
              Every analysis and write-up is delivered by well-knowledgeable PhD researchers with deep experience in thesis-quality work.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function OrderForm({ tier, onDone, onCancel }) {
  const [form, setForm] = useState({
    title: '', objectives: '', hypotheses: '',
    analyses: '', attachmentName: '', notes: '',
  });
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setForm({ ...form, attachmentName: f.name });
  };

  const submit = async () => {
    setBusy(true);
    await analysisOrders.create({
      tierId: tier.id, tierName: tier.name, ...form,
    });
    setBusy(false);
    onDone();
  };

  const needsTables = tier.id === 'interpretation';
  const needsCleanExcel = tier.id === 'tables' || tier.id === 'full';

  return (
    <div className="card-elevated p-8 lg:p-10">
      <button onClick={onCancel} className="text-sm text-slate-500 hover:text-brand mb-6">← Back to services</button>
      <span className="eyebrow">— Order</span>
      <h2 className="display text-3xl text-brand mt-2">{tier.name}</h2>
      <p className="text-sm text-slate-500 mt-1">{tier.blurb}</p>

      <div className="mt-8 space-y-5">
        <div>
          <label className="label">Project title *</label>
          <input className="input" value={form.title} onChange={set('title')}
            placeholder="e.g. Influence of Mobile Banking on SME Growth in Nairobi"/>
        </div>

        <div>
          <label className="label">Research objectives *</label>
          <textarea rows={3} className="input" value={form.objectives} onChange={set('objectives')}
            placeholder="1. To assess...&#10;2. To examine...&#10;3. To determine..."/>
        </div>

        <div>
          <label className="label">Hypotheses (if any)</label>
          <textarea rows={3} className="input" value={form.hypotheses} onChange={set('hypotheses')}
            placeholder="H1: Mobile banking adoption is positively associated with SME growth..."/>
        </div>

        <div>
          <label className="label">Analyses required *</label>
          <textarea rows={3} className="input" value={form.analyses} onChange={set('analyses')}
            placeholder="e.g. Descriptives + Pearson correlation between adoption score and growth score + Multiple regression with firm age as control"/>
          <p className="text-xs text-slate-500 mt-1.5">
            Not sure? Describe your variables in plain language and we'll recommend the right tests.
          </p>
        </div>

        <div>
          <label className="label">
            {needsTables ? 'Upload your SPSS output tables *' : 'Upload your clean Excel dataset *'}
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-gold/50 hover:bg-gold/5 transition cursor-pointer">
            {form.attachmentName ? (
              <>
                <IconCheck className="w-7 h-7 text-emerald-500 mx-auto"/>
                <p className="mt-2 font-semibold text-brand text-sm">{form.attachmentName}</p>
                <p className="text-xs text-slate-500 mt-1">Click to replace</p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-brand">Click to upload</p>
                <p className="text-xs text-slate-500 mt-1">
                  {needsTables ? '.docx / .pdf / .spv' : '.xlsx / .sav / .csv'} — up to 25 MB
                </p>
              </>
            )}
            <input type="file" onChange={onFile} className="hidden"/>
          </div>

          {needsCleanExcel && (
            <div className="mt-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
              <p className="font-bold">⚠️ Dataset requirements (please read)</p>
              <ul className="space-y-1 pl-4 list-disc marker:text-amber-500">
                <li>Provide a <strong>clean Excel sheet (.xlsx)</strong> — one row per case, one column per variable.</li>
                <li>The data must be <strong>objective and well organised</strong> with clear column headers.</li>
                <li><strong>No missing data.</strong> Replace blanks with proper missing codes (e.g. 999) before sending.</li>
                <li>Include a brief variable codebook (in the notes below) if column names are abbreviated.</li>
              </ul>
              <p className="pt-1 text-amber-800">Disorganised or incomplete datasets will be returned for cleanup before analysis can begin.</p>
            </div>
          )}

          {needsTables && (
            <div className="mt-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
              <p className="font-bold">⚠️ Tables requirements (please read)</p>
              <ul className="space-y-1 pl-4 list-disc marker:text-amber-500">
                <li>Supply your <strong>complete SPSS output tables</strong> (.spv or exported .docx/.pdf).</li>
                <li>Tables must be clearly labelled so our PhD researchers can map them to your objectives/hypotheses.</li>
                <li>If any tables are missing or unclear, we'll request them before writing begins.</li>
              </ul>
            </div>
          )}
        </div>

        <div>
          <label className="label">Special notes for our analyst</label>
          <textarea rows={3} className="input" value={form.notes} onChange={set('notes')}
            placeholder="e.g. Supervisor prefers APA 7th edition; deadline is in 5 days; need analysis on subgroup of females only…"/>
        </div>
      </div>

      <div className="mt-8 p-5 rounded-xl bg-brand/5 border border-brand/10 flex gap-3 text-sm text-brand-700">
        <IconShield className="w-5 h-5 shrink-0 mt-0.5 text-gold-600"/>
        <div>
          <p className="font-bold">Handled by well-knowledgeable PhD researchers · 100% confidential.</p>
          <p className="text-brand-600 mt-1">Your data is reviewed and processed by experienced PhD researchers familiar with thesis-level work. We'll review your order and send a quote within 24 hours. Payment via M-Pesa once you accept the quote.</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button onClick={onCancel} className="btn-outline">Cancel</button>
        <button onClick={submit} disabled={busy || !form.title || !form.objectives || !form.analyses}
          className="btn-gold">
          {busy ? 'Submitting…' : 'Submit order'} <IconArrow className="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
}

function MyOrders({ list, onOpen, onBrowse }) {
  if (list.length === 0) {
    return (
      <div className="card-elevated p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-brand/5 mx-auto flex items-center justify-center">
          <IconChart className="w-8 h-8 text-brand"/>
        </div>
        <h2 className="display text-2xl text-brand mt-5">No orders yet</h2>
        <p className="text-slate-600 mt-2 max-w-md mx-auto">
          Pick a tier and send us your project — we'll handle the rest.
        </p>
        <button onClick={onBrowse} className="btn-gold mt-6">
          Browse services <IconArrow className="w-4 h-4"/>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {list.map((o) => {
        const stat = ANALYSIS_STATUSES.find((s) => s.id === o.status);
        return (
          <button key={o.id} onClick={() => onOpen(o)}
            className="card-elevated p-5 lg:p-6 w-full text-left hover:border-gold/40 hover:-translate-y-0.5 transition-all flex items-center gap-4">
            <div className="text-3xl shrink-0">
              {o.tierId === 'tables' ? '📊' : o.tierId === 'interpretation' ? '✍️' : '🎯'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-brand">{o.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {o.tierName} · ordered {new Date(o.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className={`badge shrink-0 ${
              o.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-gold/15 text-gold-700'
            }`}>{stat.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function OrderDetail({ order, onBack }) {
  const idx = ANALYSIS_STATUSES.findIndex((s) => s.id === order.status);
  return (
    <div className="space-y-4">
      <button onClick={onBack} className="btn-outline">← Back to orders</button>
      <div className="card-elevated p-8">
        <span className="eyebrow">— {order.tierName}</span>
        <h2 className="display text-3xl text-brand mt-2">{order.title}</h2>

        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-wider text-brand mb-5">Progress</p>
          <ol className="relative">
            <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-200"/>
            <div className="absolute left-4 top-4 w-px bg-gold transition-all duration-700"
                 style={{ height: `${(idx / (ANALYSIS_STATUSES.length - 1)) * 100}%` }}/>
            {ANALYSIS_STATUSES.map((s, i) => {
              const done = i <= idx;
              return (
                <li key={s.id} className="relative pl-12 pb-6 last:pb-0">
                  <div className={`absolute left-0 top-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                    done ? 'bg-gold text-brand shadow-gold' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {done ? <IconCheck className="w-4 h-4"/> : i + 1}
                  </div>
                  <p className={`font-display font-bold text-lg ${done ? 'text-brand' : 'text-slate-400'}`}>{s.label}</p>
                </li>
              );
            })}
          </ol>
        </div>

        {order.deliverableLink && (
          <div className="mt-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <p className="font-bold text-emerald-700">🎉 Your deliverable is ready</p>
            <a href={order.deliverableLink} target="_blank" rel="noopener"
              className="btn-primary mt-3 inline-flex">Download</a>
          </div>
        )}

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <Detail label="Objectives" value={order.objectives}/>
          <Detail label="Hypotheses" value={order.hypotheses || '—'}/>
          <Detail label="Analyses requested" value={order.analyses}/>
          <Detail label="Attached file" value={order.attachmentName || '—'}/>
          {order.notes && <div className="sm:col-span-2"><Detail label="Notes" value={order.notes}/></div>}
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
