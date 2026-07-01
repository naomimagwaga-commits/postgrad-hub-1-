import { useEffect, useState } from 'react';
import { submissions, SUBMISSION_STATUSES } from '../lib/db.js';
import {
  IconForm, IconCheck, IconArrow, IconClock, IconShield, IconPlus,
} from '../components/Icons.jsx';

/**
 * Research Instrument Refinement Portal
 * Students submit their draft questionnaire/interview guide.
 * Our team refines it and returns a polished online survey link.
 */
export default function QuestionnaireBuilder() {
  const [list, setList] = useState([]);
  const [view, setView] = useState('list'); // list | submit | detail
  const [selected, setSelected] = useState(null);

  const refresh = async () => setList(await submissions.list());
  useEffect(() => { refresh(); }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <span className="eyebrow">— Module 01</span>
          <h1 className="display text-4xl lg:text-5xl text-brand mt-2">
            Data Collection Tools <span className="italic font-light text-gold">(Questionnaires & Interviews)</span>
          </h1>
          <p className="mt-3 text-slate-600 max-w-3xl leading-relaxed">
            Submit your draft <strong>questionnaire</strong> or <strong>interview guide</strong>. Our research team aligns it to your objectives, polishes the wording, and delivers a ready-to-share <strong>digital data-collection link</strong> — far faster and cheaper than printing, distributing and re-entering paper forms. Responses are securely captured and exported to you ready for analysis.
          </p>
        </div>
        {view === 'list' && (
          <button onClick={() => setView('submit')} className="btn-gold shrink-0">
            <IconPlus className="w-4 h-4"/> New submission
          </button>
        )}
        {view !== 'list' && (
          <button onClick={() => { setView('list'); refresh(); }} className="btn-outline shrink-0">
            ← Back to submissions
          </button>
        )}
      </div>

      {view === 'list' && (
        <SubmissionsList list={list} onOpen={(s) => { setSelected(s); setView('detail'); }}
          onStart={() => setView('submit')}/>
      )}
      {view === 'submit' && (
        <SubmitForm onDone={async () => { await refresh(); setView('list'); }}/>
      )}
      {view === 'detail' && selected && (
        <SubmissionDetail submission={selected} onRefresh={async () => {
          await refresh();
          const fresh = (await submissions.list()).find((s) => s.id === selected.id);
          if (fresh) setSelected(fresh);
        }}/>
      )}
    </div>
  );
}

/* ─────────── Submissions list ─────────── */
function SubmissionsList({ list, onOpen, onStart }) {
  if (list.length === 0) {
    return (
      <div className="card-elevated p-12 lg:p-16 text-center">
        <div className="w-20 h-20 rounded-full bg-brand/5 mx-auto flex items-center justify-center">
          <IconForm className="w-10 h-10 text-brand"/>
        </div>
        <h2 className="display text-2xl lg:text-3xl text-brand mt-6">No submissions yet</h2>
        <p className="mt-3 text-slate-600 max-w-md mx-auto">
          Start by sending us your draft <strong>questionnaire</strong> or <strong>interview guide</strong>. We'll refine it and return a polished version plus a digital data-collection link — no printing, no postage, no manual data entry.
        </p>
        <button onClick={onStart} className="btn-gold mt-8">
          Submit your draft <IconArrow className="w-4 h-4"/>
        </button>
        <div className="mt-12 pt-8 border-t border-slate-100 grid sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
          {SUBMISSION_STATUSES.map((s, i) => (
            <div key={s.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/15 text-gold-700 font-bold text-sm flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <div>
                <p className="font-bold text-brand text-sm">{s.label}</p>
                <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
              </div>
            </div>
          )).slice(0, 3)}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {list.map((s) => {
        const statusIdx = SUBMISSION_STATUSES.findIndex((x) => x.id === s.status);
        const statusObj = SUBMISSION_STATUSES[statusIdx];
        const pct = ((statusIdx + 1) / SUBMISSION_STATUSES.length) * 100;
        return (
          <button key={s.id} onClick={() => onOpen(s)}
            className="card-elevated p-6 lg:p-7 text-left hover:border-gold/40 hover:-translate-y-0.5 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`badge ${
                    s.status === 'ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-gold/15 text-gold-700'
                  }`}>
                    {s.status === 'ready' && <IconCheck className="w-3 h-3"/>}
                    {statusObj.label}
                  </span>
                  <span className="text-xs text-slate-400 capitalize">{s.researchType}</span>
                </div>
                <h3 className="display text-xl lg:text-2xl text-brand truncate">{s.title}</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Submitted {new Date(s.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gold-300 to-gold rounded-full transition-all"
                       style={{ width: `${pct}%` }}/>
                </div>
              </div>
              <IconArrow className="w-5 h-5 text-slate-300 shrink-0 mt-2"/>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ─────────── Submission detail ─────────── */
function SubmissionDetail({ submission, onRefresh }) {
  const idx = SUBMISSION_STATUSES.findIndex((s) => s.id === submission.status);

  useEffect(() => {
    // Auto-refresh in case the demo progressed it
    const t = setInterval(onRefresh, 2000);
    return () => clearInterval(t);
  }, [onRefresh]);

  return (
    <div className="space-y-6">
      <div className="card-elevated p-8 lg:p-10">
        <span className="badge-gold">Submission</span>
        <h2 className="display text-3xl lg:text-4xl text-brand mt-4">{submission.title}</h2>
        <p className="text-slate-500 mt-1 capitalize">{submission.researchType} research</p>

        {/* Status tracker */}
        <div className="mt-10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand mb-6">Progress</h3>
          <ol className="relative">
            <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-200"/>
            <div className="absolute left-4 top-4 w-px bg-gold transition-all duration-700"
                 style={{ height: `${(idx / (SUBMISSION_STATUSES.length - 1)) * 100}%` }}/>
            {SUBMISSION_STATUSES.map((s, i) => {
              const done = i <= idx;
              const active = i === idx;
              return (
                <li key={s.id} className="relative pl-12 pb-6 last:pb-0">
                  <div className={`absolute left-0 top-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    done ? 'bg-gold text-brand shadow-gold' : 'bg-slate-100 text-slate-400'
                  } ${active ? 'ring-4 ring-gold/20 animate-pulse' : ''}`}>
                    {done ? <IconCheck className="w-4 h-4"/> : i + 1}
                  </div>
                  <p className={`font-display font-bold text-lg ${done ? 'text-brand' : 'text-slate-400'}`}>
                    {s.label}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5">{s.desc}</p>
                  {active && (
                    <p className="text-xs text-gold-700 mt-1 font-semibold">In progress…</p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Survey link ready */}
        {submission.status === 'ready' && submission.surveyLink && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <IconCheck className="w-5 h-5"/> Your survey link is ready
            </div>
            <p className="text-sm text-slate-700 mt-2">
              Share this link with your respondents. Responses are securely collected and exported to you.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <input readOnly value={submission.surveyLink}
                className="input bg-white flex-1 font-mono text-xs"/>
              <button onClick={() => navigator.clipboard.writeText(submission.surveyLink)}
                className="btn-primary shrink-0">Copy link</button>
            </div>
          </div>
        )}

        {submission.status !== 'ready' && (
          <div className="mt-8 p-5 rounded-xl bg-brand-50/60 border border-brand-100 text-sm text-brand-700 flex gap-3">
            <IconClock className="w-5 h-5 shrink-0 mt-0.5"/>
            <div>
              <p className="font-bold">Estimated turnaround: 48–72 hours</p>
              <p className="text-brand-600 mt-1">We'll email you the moment your refined instrument is ready.</p>
            </div>
          </div>
        )}
      </div>

      {/* Details panel */}
      <div className="grid md:grid-cols-2 gap-6">
        <DetailBlock label="Research objectives" value={submission.objectives} />
        <DetailBlock label="Variables" value={submission.variables} />
        <DetailBlock label="Target population" value={submission.population} />
        <DetailBlock label="Special notes" value={submission.notes || '—'} />
      </div>

      {submission.attachmentName && (
        <div className="card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold/15 text-gold-700 flex items-center justify-center">
            <IconForm className="w-5 h-5"/>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-brand text-sm truncate">{submission.attachmentName}</p>
            <p className="text-xs text-slate-500">Attached draft instrument</p>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailBlock({ label, value }) {
  return (
    <div className="card p-6">
      <p className="eyebrow">{label}</p>
      <p className="mt-3 text-slate-700 leading-relaxed whitespace-pre-wrap">{value || '—'}</p>
    </div>
  );
}

/* ─────────── Submit form (3 steps) ─────────── */
function SubmitForm({ onDone }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '',
    researchType: 'quantitative',
    objectives: '',
    variables: '',
    population: '',
    notes: '',
    attachmentName: '',
  });
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    setBusy(true);
    await submissions.create(form);
    setBusy(false);
    onDone();
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setForm({ ...form, attachmentName: f.name });
  };

  return (
    <div className="card-elevated p-8 lg:p-10">
      {/* Stepper */}
      <ol className="flex items-center gap-3 text-sm mb-10">
        {['Study profile', 'Your draft', 'Confirm'].map((label, i) => {
          const n = i + 1;
          const active = step === n; const done = step > n;
          return (
            <li key={label} className="flex items-center gap-3 flex-1">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                done ? 'bg-emerald-500 text-white' :
                active ? 'bg-gold text-brand shadow-gold' :
                'bg-slate-100 text-slate-400'
              }`}>
                {done ? <IconCheck className="w-4 h-4"/> : n}
              </div>
              <span className={`text-sm font-semibold hidden sm:inline ${active ? 'text-brand' : 'text-slate-400'}`}>
                {label}
              </span>
              {n < 3 && <span className="flex-1 h-px bg-slate-200"/>}
            </li>
          );
        })}
      </ol>

      {step === 1 && (
        <div className="space-y-6 reveal">
          <h2 className="display text-2xl lg:text-3xl text-brand">Tell us about your study</h2>
          <div>
            <label className="label">Research title *</label>
            <input className="input" value={form.title} onChange={set('title')}
              placeholder="e.g. Influence of Mobile Banking on SME Growth in Nairobi" />
          </div>
          <div>
            <label className="label">Research type *</label>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { id: 'quantitative', name: 'Quantitative', desc: 'Numerical, hypothesis-driven' },
                { id: 'qualitative', name: 'Qualitative', desc: 'Interviews, narratives, themes' },
                { id: 'mixed', name: 'Mixed Methods', desc: 'Quantitative + qualitative' },
              ].map((t) => (
                <button key={t.id} onClick={() => setForm({ ...form, researchType: t.id })}
                  className={`text-left p-4 rounded-xl border-2 transition ${
                    form.researchType === t.id ? 'border-gold bg-gold/5' : 'border-slate-200 hover:border-brand-200'
                  }`}>
                  <p className="font-display font-bold text-brand">{t.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Research objectives *</label>
            <textarea rows={4} className="input" value={form.objectives} onChange={set('objectives')}
              placeholder="1. To assess the influence of...&#10;2. To examine...&#10;3. To determine..."/>
          </div>
          <div>
            <label className="label">Variables *</label>
            <textarea rows={3} className="input" value={form.variables} onChange={set('variables')}
              placeholder="Independent: Mobile banking adoption&#10;Dependent: SME growth&#10;Moderating: Firm age"/>
          </div>
          <div>
            <label className="label">Target population</label>
            <input className="input" value={form.population} onChange={set('population')}
              placeholder="e.g. SME owners in Nairobi CBD, n ≈ 200"/>
          </div>
          <div className="flex justify-end pt-2">
            <button disabled={!form.title || !form.objectives || !form.variables}
              onClick={() => setStep(2)} className="btn-primary">
              Continue <IconArrow className="w-4 h-4"/>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 reveal">
          <h2 className="display text-2xl lg:text-3xl text-brand">Attach your draft</h2>
          <p className="text-slate-600">
            Upload your existing questionnaire or interview guide. If you don't have one yet, you can skip this and our team will draft one from scratch based on your objectives.
          </p>

          <label className="block">
            <span className="label">Draft questionnaire / interview guide</span>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-gold/50 hover:bg-gold/5 transition cursor-pointer">
              {form.attachmentName ? (
                <>
                  <IconCheck className="w-8 h-8 text-emerald-500 mx-auto"/>
                  <p className="mt-3 font-semibold text-brand">{form.attachmentName}</p>
                  <p className="text-xs text-slate-500 mt-1">Click to replace</p>
                </>
              ) : (
                <>
                  <IconForm className="w-8 h-8 text-slate-300 mx-auto"/>
                  <p className="mt-3 text-sm font-semibold text-brand">Click to upload</p>
                  <p className="text-xs text-slate-500 mt-1">.docx, .pdf, .doc — up to 10 MB</p>
                </>
              )}
              <input type="file" accept=".doc,.docx,.pdf,.txt" onChange={onFile} className="hidden"/>
            </div>
          </label>

          <div>
            <label className="label">Special notes for our team</label>
            <textarea rows={4} className="input" value={form.notes} onChange={set('notes')}
              placeholder="e.g. Need scale items adapted for low-literacy respondents; supervisor wants 5-point Likert; data collection starts in 3 weeks…"/>
          </div>

          <div className="flex justify-between pt-2">
            <button onClick={() => setStep(1)} className="btn-outline">← Back</button>
            <button onClick={() => setStep(3)} className="btn-primary">
              Continue <IconArrow className="w-4 h-4"/>
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 reveal">
          <h2 className="display text-2xl lg:text-3xl text-brand">Confirm & submit</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <Mini label="Title" value={form.title}/>
            <Mini label="Type" value={form.researchType} capitalize/>
            <Mini label="Population" value={form.population || '—'}/>
            <Mini label="Attachment" value={form.attachmentName || 'No file (we\'ll draft from scratch)'}/>
            <div className="sm:col-span-2"><Mini label="Objectives" value={form.objectives}/></div>
            <div className="sm:col-span-2"><Mini label="Variables" value={form.variables}/></div>
            {form.notes && <div className="sm:col-span-2"><Mini label="Notes" value={form.notes}/></div>}
          </div>

          <div className="p-5 rounded-xl bg-brand/5 border border-brand/10 flex gap-3 text-sm text-brand-700">
            <IconShield className="w-5 h-5 shrink-0 mt-0.5 text-gold-600"/>
            <div>
              <p className="font-bold">Your work stays confidential.</p>
              <p className="text-brand-600 mt-1">We never share, publish or reuse your research instruments.</p>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button onClick={() => setStep(2)} className="btn-outline">← Back</button>
            <button onClick={submit} disabled={busy} className="btn-gold">
              {busy ? 'Submitting…' : 'Submit for refinement'} <IconArrow className="w-4 h-4"/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Mini({ label, value, capitalize }) {
  return (
    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`text-sm text-brand mt-1.5 whitespace-pre-wrap ${capitalize ? 'capitalize' : ''}`}>{value}</p>
    </div>
  );
}
