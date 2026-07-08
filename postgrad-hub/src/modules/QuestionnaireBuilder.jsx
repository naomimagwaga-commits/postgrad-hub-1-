import { useEffect, useState } from 'react';
import { submissions, SUBMISSION_STATUSES, unlocks } from '../lib/db.js';
import { SERVICE_PRICES, SERVICE_TIMELINES, formatKES } from '../data/prices.js';
import {
  IconForm, IconCheck, IconArrow, IconClock, IconShield, IconPlus,
  IconSpark, IconStar, IconChart, IconLocation, IconDownload,
} from '../components/Icons.jsx';
import MpesaModal from '../components/MpesaModal.jsx';

/**
 * Research Instrument Refinement Portal
 * Students submit their draft questionnaire/interview guide.
 * Our team refines it and returns a polished online survey link.
 */
export default function QuestionnaireBuilder() {
  const [list, setList] = useState([]);
  const [view, setView] = useState('list'); // list | submit | detail
  const [selected, setSelected] = useState(null);

  /* Payment gate state — the pay modal must be closed with a valid unlock
     before the SubmitForm is allowed to appear. */
  const [payOpen, setPayOpen] = useState(false);
  const [paidUnlock, setPaidUnlock] = useState(null); // the unlock row that authorises the pending submission

  const refresh = async () => setList(await submissions.list());
  useEffect(() => { refresh(); }, []);

  /* When the student clicks "New submission" we always open the payment modal FIRST.
     A fresh unlock is created each time (one instrument = one payment). */
  const beginNewSubmission = () => {
    setPaidUnlock(null);
    setPayOpen(true);
  };

  /* Fires once the student clicks "I've paid" inside the M-Pesa modal.
     We stash the just-claimed unlock row so SubmitForm can attach its id to
     the submission when it's created — that links payment → work. */
  const handlePaymentClaimed = async () => {
    // Find the most-recent pending questionnaire unlock for this user.
    const all = await unlocks.list();
    const mine = all
      .filter((u) => u.itemType === 'questionnaire_refinement' && u.paymentStatus === 'claimed' && u.status !== 'consumed')
      .sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt));
    if (mine.length) setPaidUnlock(mine[0]);
    setPayOpen(false);
    setView('submit');
  };

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
        <div className="flex flex-col items-end gap-2 shrink-0">
          {/* Price badge */}
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Refinement fee</p>
            <p className="display text-3xl text-brand font-bold">{formatKES(SERVICE_PRICES.questionnaireRefinement)}</p>
            <p className="text-[10px] text-slate-500 italic max-w-[200px] leading-tight">(applies to questionnaire and interview instruments, provided there are no more than 4 respondent groups)</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              <IconClock className="w-3 h-3 text-emerald-700"/>
              <span className="text-[10px] font-bold text-emerald-800">Turnaround: {SERVICE_TIMELINES.questionnaireRefinement.short}</span>
            </div>
          </div>
          {view === 'list' && (
            <button onClick={beginNewSubmission} className="btn-gold">
              <IconPlus className="w-4 h-4"/> New submission
            </button>
          )}
          {view !== 'list' && (
            <button onClick={() => { setView('list'); setPaidUnlock(null); refresh(); }} className="btn-outline">
              ← Back to submissions
            </button>
          )}
        </div>
      </div>

      {view === 'list' && (
        <>
          <WhyDigital onStart={beginNewSubmission}/>
          <SubmissionsList list={list} onOpen={(s) => { setSelected(s); setView('detail'); }}
            onStart={beginNewSubmission}/>
        </>
      )}
      {view === 'submit' && paidUnlock && (
        <SubmitForm
          paidUnlock={paidUnlock}
          onDone={async () => { await refresh(); setPaidUnlock(null); setView('list'); }}
        />
      )}
      {view === 'submit' && !paidUnlock && (
        <PaymentRequiredNotice onPay={beginNewSubmission} onBack={() => setView('list')}/>
      )}
      {view === 'detail' && selected && (
        <SubmissionDetail submission={selected} onRefresh={async () => {
          await refresh();
          const fresh = (await submissions.list()).find((s) => s.id === selected.id);
          if (fresh) setSelected(fresh);
        }}/>
      )}

      {/* Payment gate modal — must be paid BEFORE any submission is accepted */}
      <MpesaModal
        open={payOpen}
        item={payOpen ? {
          itemKey: `questionnaire_refinement:${Date.now()}`,
          itemType: 'questionnaire_refinement',
          itemName: 'Instrument Refinement (Questionnaire / Interview Guide)',
          format: 'service',
          priceKES: SERVICE_PRICES.questionnaireRefinement,
        } : null}
        onClose={() => setPayOpen(false)}
        onClaimed={handlePaymentClaimed}
      />
    </div>
  );
}

/* Fallback shown if a user somehow lands on the submit view without a paid unlock
   (e.g. refresh mid-flow). Guides them back to the payment button. */
function PaymentRequiredNotice({ onPay, onBack }) {
  return (
    <div className="card-elevated p-10 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-gold/15 mx-auto flex items-center justify-center">
        <IconShield className="w-8 h-8 text-gold-700"/>
      </div>
      <h2 className="display text-2xl text-brand">Payment required to begin</h2>
      <p className="text-slate-600 max-w-md mx-auto">
        Instrument refinement is a paid service. Once your payment is received we'll unlock the submission
        form so you can share your draft with our research team.
      </p>
      <div className="flex gap-3 justify-center pt-2">
        <button onClick={onBack} className="btn-outline">← Back</button>
        <button onClick={onPay} className="btn-gold">
          Pay {formatKES(SERVICE_PRICES.questionnaireRefinement)} to continue <IconArrow className="w-4 h-4"/>
        </button>
      </div>
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

        {/* Payment badge (always visible) */}
        {submission.paymentStatus === 'paid_pending_verification' && (
          <div className="mt-8 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-sm flex gap-3">
            <IconClock className="w-5 h-5 shrink-0 mt-0.5 text-amber-700"/>
            <div className="flex-1">
              <p className="font-bold text-amber-900">Payment received \u2014 awaiting admin verification</p>
              <p className="text-amber-800/80 mt-0.5">
                Our team will confirm your M-Pesa payment against the paybill records and start the refinement.
                Once verified, delivery is within <strong>{SERVICE_TIMELINES.questionnaireRefinement.short}</strong>. You'll be notified by email at every step.
              </p>
            </div>
          </div>
        )}
        {submission.paymentStatus === 'paid' && submission.status !== 'ready' && (
          <div className="mt-8 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-sm flex gap-3">
            <IconCheck className="w-5 h-5 shrink-0 mt-0.5 text-emerald-700"/>
            <div className="flex-1">
              <p className="font-bold text-emerald-900">Payment confirmed \u00b7 refinement in progress</p>
              <p className="text-emerald-800/80 mt-0.5">
                Delivery within <strong>{SERVICE_TIMELINES.questionnaireRefinement.short}</strong>. We'll email you the moment it's ready.
              </p>
            </div>
          </div>
        )}

        {/* Survey link ready — full delivery package (ONLY shows once admin approves) */}
        {submission.status === 'ready' && submission.paymentStatus !== 'paid_pending_verification' && (
          <ReadyDeliveryPackage submission={submission}/>
        )}

        {submission.status !== 'ready' && !submission.paymentStatus && (
          <div className="mt-8 p-5 rounded-xl bg-brand-50/60 border border-brand-100 text-sm text-brand-700 flex gap-3">
            <IconClock className="w-5 h-5 shrink-0 mt-0.5"/>
            <div>
              <p className="font-bold">Estimated turnaround: {SERVICE_TIMELINES.questionnaireRefinement.short}</p>
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
function SubmitForm({ onDone, paidUnlock }) {
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
    // Attach the payment unlock id so admin can see this submission is paid-for.
    // Also stamp paymentStatus='paid_pending_verification' — admin verifies against
    // M-Pesa records and flips it to 'paid' before starting the refinement.
    await submissions.create({
      ...form,
      unlockId: paidUnlock?.id || null,
      paymentStatus: 'paid_pending_verification',
      priceKES: paidUnlock?.priceKES ?? SERVICE_PRICES.questionnaireRefinement,
    });
    setBusy(false);
    onDone();
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setForm({ ...form, attachmentName: f.name });
  };

  return (
    <div className="card-elevated p-8 lg:p-10">
      {/* Payment-confirmed ribbon */}
      {paidUnlock && (
        <div className="mb-8 -mt-2 flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
          <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <IconCheck className="w-5 h-5"/>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-emerald-800 text-sm">Payment received — thank you!</p>
            <p className="text-xs text-emerald-700/80 mt-0.5">
              KES {(paidUnlock.priceKES ?? SERVICE_PRICES.questionnaireRefinement).toLocaleString('en-KE')} claimed via M-Pesa.
              Complete this form and we'll deliver your refined instrument within <strong>{SERVICE_TIMELINES.questionnaireRefinement.short}</strong> of payment verification.
            </p>
          </div>
        </div>
      )}

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

/* ─────────────────────────────────────────────────────────────
   "Your refined instrument is ready" — the full delivery package
   shown to the student once admin marks their submission ready.
   Includes: the survey link, the XLSForm download (if provided),
   the researcher setup PDF guide, and an embedded tutorial video
   walking them through the entire launch process.
   ───────────────────────────────────────────────────────────── */
function ReadyDeliveryPackage({ submission }) {
  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    if (!submission.surveyLink) return;
    navigator.clipboard.writeText(submission.surveyLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Success banner */}
      <div className="p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <IconCheck className="w-6 h-6"/>
          </div>
          <div>
            <h3 className="display text-2xl text-emerald-900 font-bold">Your refined instrument is ready! 🎉</h3>
            <p className="text-sm text-emerald-800/80 mt-0.5">
              Everything you need to launch, collect responses, and export clean data is right here.
            </p>
          </div>
        </div>
      </div>

      {/* Survey link (if provided) */}
      {submission.surveyLink && (
        <div className="card-elevated p-6 lg:p-7">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-gold">1</span>
            <h4 className="display text-xl text-brand font-bold">Your survey link</h4>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            This is the link you'll share with your respondents via WhatsApp, email, or any messaging platform.
            Anyone who opens it can fill the form — no account required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input readOnly value={submission.surveyLink}
              className="input bg-slate-50 flex-1 font-mono text-xs"/>
            <button onClick={copyLink} className="btn-primary shrink-0 min-w-[120px]">
              {copied ? '✓ Copied!' : 'Copy link'}
            </button>
          </div>
        </div>
      )}

      {/* XLSForm download (if provided) */}
      {submission.xlsFormUrl && (
        <div className="card-elevated p-6 lg:p-7">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-gold">2</span>
            <h4 className="display text-xl text-brand font-bold">Your XLSForm file (.xlsx)</h4>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            This is the Excel spreadsheet version of your form. You'll upload this file to your account on
            the data-collection platform (see the guide below for step-by-step instructions).
          </p>
          <a href={submission.xlsFormUrl} download
            className="btn-gold inline-flex">
            <IconDownload className="w-4 h-4"/> Download XLSForm (.xlsx)
          </a>
        </div>
      )}

      {/* Researcher Setup Guide PDF */}
      <div className="card-elevated p-6 lg:p-7 bg-gradient-to-br from-brand/[0.03] to-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge-gold">{submission.xlsFormUrl ? '3' : '2'}</span>
          <h4 className="display text-xl text-brand font-bold">Researcher Setup &amp; Usage Guide (PDF)</h4>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          A complete 5-page guide walking you through every step: creating your free account, uploading
          your form, deploying it, sharing the link with respondents, monitoring responses in real time, and
          downloading your data for SPSS analysis. Print it or keep it open while you work.
        </p>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {[
            { n: '1', t: 'Create free account' },
            { n: '2', t: 'Upload your form' },
            { n: '3', t: 'Deploy &amp; go live' },
            { n: '4', t: 'Share with respondents' },
            { n: '5', t: 'Monitor responses' },
            { n: '6', t: 'Download for SPSS' },
          ].map((s) => (
            <div key={s.n} className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-100">
              <span className="w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center shrink-0">{s.n}</span>
              <span className="text-xs text-slate-700" dangerouslySetInnerHTML={{ __html: s.t }}/>
            </div>
          ))}
        </div>
        <a href="/downloads/researcher-guide.pdf" download
          className="btn-gold inline-flex">
          <IconDownload className="w-4 h-4"/> Download the guide (PDF, ~150 KB)
        </a>
      </div>

      {/* Embedded video tutorial */}
      <div className="card-elevated p-6 lg:p-7">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge-gold">{submission.xlsFormUrl ? '4' : '3'}</span>
          <h4 className="display text-xl text-brand font-bold">Video walkthrough — watch first, then follow the PDF</h4>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          This short official tutorial (under 5 minutes) shows exactly what your dashboard looks like and
          how to upload your Excel form. Once you've watched it, the PDF guide will feel obvious to follow.
        </p>
        <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/xpeBCy9p1Ys"
            title="Getting started tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <p className="text-xs text-slate-500 mt-3 italic">
          💡 Tip: Watch the video once end-to-end BEFORE opening your account. Then have the PDF guide open
          on the side as you work through each step.
        </p>
      </div>

      {/* Support callout */}
      <div className="p-5 rounded-xl bg-gold/[0.06] border border-gold/30 flex items-start gap-3">
        <span className="text-2xl">🙋‍♀️</span>
        <div className="text-sm">
          <p className="font-bold text-brand">Stuck at any step?</p>
          <p className="text-slate-600 mt-1">
            WhatsApp us on <a href="https://wa.me/254779568272" className="text-brand font-bold underline">+254 779 568 272</a> or
            email <a href="mailto:postgraduatedatahub@gmail.com" className="text-brand font-bold underline">postgraduatedatahub@gmail.com</a>.
            We'll walk you through it screen-share style if needed.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   "Why digital data collection?" — the pitch section that sells
   digital over paper questionnaires. Shown on the list view
   so every visitor understands WHY they should use this route.
   ───────────────────────────────────────────────────────────── */
function WhyDigital({ onStart }) {
  const advantages = [
    {
      icon: IconSpark,
      title: 'Efficiency',
      color: 'from-amber-50 to-amber-100/40 border-amber-200',
      accent: 'text-amber-700 bg-amber-100',
      points: [
        'Data collected and stored instantly — no transferring from paper to Excel to SPSS',
        'Multiple respondents can fill the questionnaire simultaneously, from anywhere',
        'Saves weeks of manual data-entry time',
      ],
    },
    {
      icon: IconCheck,
      title: 'Data quality',
      color: 'from-emerald-50 to-emerald-100/40 border-emerald-200',
      accent: 'text-emerald-700 bg-emerald-100',
      points: [
        'Mandatory fields prevent missing responses',
        'Constraints catch errors in real time — e.g. impossible ages are blocked at entry',
        'No handwriting-interpretation errors',
        'Skip logic routes respondents automatically — they never see irrelevant questions',
      ],
    },
    {
      icon: IconStar,
      title: 'Cost',
      color: 'from-yellow-50 to-yellow-100/40 border-yellow-200',
      accent: 'text-yellow-700 bg-yellow-100',
      points: [
        'No printing, no paper, no physical distribution costs',
        'Free for basic academic use',
        'No need to hire data-entry assistants',
      ],
    },
    {
      icon: IconChart,
      title: 'Data management',
      color: 'from-sky-50 to-sky-100/40 border-sky-200',
      accent: 'text-sky-700 bg-sky-100',
      points: [
        'All responses automatically aggregated in one place',
        'Direct export to Excel and SPSS — no manual transfer',
        'Timestamps show exactly when each response was submitted',
      ],
    },
    {
      icon: IconLocation,
      title: 'Reach',
      color: 'from-rose-50 to-rose-100/40 border-rose-200',
      accent: 'text-rose-700 bg-rose-100',
      points: [
        'Works offline on mobile devices — critical for rural areas with unreliable internet',
        'Data syncs automatically when connection is restored',
        'Respondents complete the survey on their own phones',
      ],
    },
    {
      icon: IconShield,
      title: 'Security',
      color: 'from-slate-50 to-slate-100/40 border-slate-200',
      accent: 'text-slate-700 bg-slate-100',
      points: [
        'Data stored securely on cloud servers with encrypted access',
        'No risk of losing or damaging paper questionnaires',
        'Confidentiality easier to maintain and audit',
      ],
    },
  ];

  return (
    <section className="space-y-8">
      {/* Section intro */}
      <div className="card-elevated p-8 lg:p-10 bg-gradient-to-br from-brand/[0.03] via-white to-gold/[0.04]">
        <span className="eyebrow">— Why this matters</span>
        <h2 className="display text-3xl lg:text-4xl text-brand mt-2">
          Why digital data collection beats paper — <span className="italic text-gold">every time</span>
        </h2>
        <p className="mt-3 text-slate-600 leading-relaxed max-w-3xl">
          We refine your instrument and deliver it as a ready-to-share <strong>online survey</strong> using a
          professional digital data-collection platform trusted by universities, UN agencies, WHO, and Kenyan
          NGOs. Here's why it's the right choice for your postgraduate research:
        </p>

        {/* Paper vs Digital comparison strip */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-red-50/60 border border-red-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📄</span>
              <p className="font-bold text-red-700 uppercase text-xs tracking-wider">The paper way</p>
            </div>
            <ul className="text-sm text-slate-600 space-y-1.5">
              <li>❌ Print hundreds of copies</li>
              <li>❌ Physically travel to each respondent</li>
              <li>❌ Manually type every response into Excel</li>
              <li>❌ Handwriting errors, missing answers, lost forms</li>
              <li>❌ Wait weeks to see even preliminary results</li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📱</span>
              <p className="font-bold text-emerald-700 uppercase text-xs tracking-wider">The digital way</p>
            </div>
            <ul className="text-sm text-slate-700 space-y-1.5">
              <li>✅ Share ONE link via WhatsApp / email</li>
              <li>✅ Collect from the comfort of your home</li>
              <li>✅ Data flows straight into your dashboard</li>
              <li>✅ Watch responses arrive in real time</li>
              <li>✅ Export clean data to SPSS in one click</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 6 advantage cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {advantages.map((a) => {
          const Icon = a.icon;
          return (
            <div key={a.title} className={`p-6 rounded-2xl bg-gradient-to-br ${a.color} border`}>
              <div className={`w-11 h-11 rounded-xl ${a.accent} flex items-center justify-center`}>
                <Icon className="w-5 h-5"/>
              </div>
              <h3 className="display text-xl text-brand mt-4 font-bold">{a.title}</h3>
              <ul className="mt-3 space-y-2">
                {a.points.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700 leading-relaxed">
                    <span className="text-brand mt-1 shrink-0">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Bonus card — the "personal comfort" advantages Naomi highlighted */}
      <div className="card-elevated p-8 bg-gradient-to-br from-gold/[0.06] via-white to-brand/[0.03] border-gold/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold-700 flex items-center justify-center shrink-0">
            <IconClock className="w-6 h-6"/>
          </div>
          <div className="flex-1">
            <h3 className="display text-2xl text-brand font-bold">And the game-changing bit for postgraduates…</h3>
            <p className="mt-2 text-slate-700 leading-relaxed">
              You can <strong>collect data from the comfort of your home</strong>. No traveling from school to
              school with a stack of forms. Log in to your dashboard and <strong>see exactly how many people
              have responded</strong>, watch new submissions arrive live, and follow up with your sample only
              when you need to. Your Chapter 4 analysis can start the same day you close the survey.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="card-elevated p-8 lg:p-10 text-center bg-brand text-white">
        <h3 className="display text-2xl lg:text-3xl">Ready to go digital?</h3>
        <p className="mt-3 text-white/80 max-w-2xl mx-auto">
          Submit your draft questionnaire or interview guide. We'll refine the wording, align every question
          to your objectives, and return a ready-to-deploy digital survey form — plus a plain PDF copy for
          your appendix and a step-by-step guide showing you exactly how to launch it and collect responses.
        </p>
        <button onClick={onStart} className="btn-gold mt-6 inline-flex">
          Submit your draft <IconArrow className="w-4 h-4"/>
        </button>
        <p className="mt-4 text-xs text-white/60 max-w-xl">
          Refinement fee: <strong className="text-gold">{formatKES(SERVICE_PRICES.questionnaireRefinement)}</strong> (applies to questionnaire and interview instruments, provided there are no more than 4 respondent groups) \u00b7 Turnaround: <strong className="text-gold">{SERVICE_TIMELINES.questionnaireRefinement.short}</strong> after payment verification
        </p>
      </div>

      {/* Divider before the submissions list */}
      <div className="flex items-center gap-4 pt-4">
        <div className="h-px bg-slate-200 flex-1"/>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Your submissions</span>
        <div className="h-px bg-slate-200 flex-1"/>
      </div>
    </section>
  );
}
