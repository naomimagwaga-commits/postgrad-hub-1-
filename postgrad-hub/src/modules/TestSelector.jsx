import { useEffect, useState } from 'react';
import { recommend } from '../data/testEngine.js';
import { activities, unlocks } from '../lib/db.js';
import { TEST_SELECTOR_UNLOCK_PRICE } from '../data/prices.js';
import MpesaModal from '../components/MpesaModal.jsx';
import {
  IconChart, IconCheck, IconArrow, IconSpark, IconLock,
} from '../components/Icons.jsx';

const QUESTIONS = [
  {
    key: 'design', title: 'What is your research design?',
    options: [
      { id: 'crosssectional', label: 'Cross-sectional / Survey', desc: 'A snapshot of your sample at one point in time.' },
      { id: 'experimental', label: 'Experimental / Quasi-experimental', desc: 'You manipulate a variable and compare outcomes.' },
      { id: 'correlational', label: 'Correlational', desc: 'Examining how variables vary together.' },
      { id: 'longitudinal', label: 'Longitudinal', desc: 'Repeated measurements over time.' },
    ],
  },
  {
    key: 'objective', title: 'What is your primary objective?',
    options: [
      { id: 'describe', label: 'Describe / Summarize', desc: 'Profile the sample, report frequencies & means.' },
      { id: 'relationship', label: 'Test a relationship', desc: 'How do two variables co-vary?' },
      { id: 'difference', label: 'Compare groups', desc: 'Are the means or proportions different?' },
      { id: 'predict', label: 'Predict an outcome', desc: 'Model how predictors influence an outcome.' },
      { id: 'association', label: 'Test association (categorical)', desc: 'Are two categories related?' },
    ],
  },
  {
    key: 'variableType', title: 'What is the type of your main variables?',
    options: [
      { id: 'continuous', label: 'Continuous (interval/ratio)', desc: 'e.g. income, age, scores.' },
      { id: 'ordinal', label: 'Ordinal', desc: 'e.g. Likert items treated as ranks.' },
      { id: 'categorical', label: 'Categorical / Nominal', desc: 'e.g. gender, county, treatment group.' },
      { id: 'mixed', label: 'Mixed types', desc: 'A combination of continuous and categorical.' },
    ],
  },
  {
    key: 'numVariables', title: 'How many variables (or groups) are involved?',
    options: [
      { id: '1', label: 'One variable' },
      { id: '2', label: 'Two variables / two groups' },
      { id: '3+', label: 'Three or more variables / groups' },
    ],
  },
];

const testKey = (k) => `test:${k}`;

export default function TestSelector() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [unlocked, setUnlocked] = useState([]);
  const [payItem, setPayItem] = useState(null);

  const refreshUnlocks = async () => {
    const all = await unlocks.list();
    setUnlocked(all.filter((u) => u.itemType === 'test' && u.status === 'unlocked').map((u) => u.itemKey));
  };
  useEffect(() => { refreshUnlocks(); }, []);

  const pick = (key, val) => {
    const next = { ...answers, [key]: val };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else { setDone(true); activities.log('analysis', 'Used the Statistical Test Selector'); }
  };

  const reset = () => { setAnswers({}); setStep(0); setDone(false); };
  const results = done ? recommend(answers) : [];

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <span className="eyebrow">— Module 02</span>
            <h1 className="display text-4xl lg:text-5xl text-brand mt-2">Statistical Test Selector</h1>
            <p className="mt-3 text-slate-600 max-w-2xl leading-relaxed">
              Answer four guided questions and we'll recommend the right analysis for your study.
              Each test is unlocked individually at <strong>KES {TEST_SELECTOR_UNLOCK_PRICE.toLocaleString('en-KE')}</strong> — pay only for the analyses you actually need.
            </p>
          </div>
          <span className="badge-gold shrink-0">
            <IconChart className="w-3.5 h-3.5"/> Premium access
          </span>
        </div>

        {!done && (
          <>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${
                    i <= step ? 'bg-gradient-to-r from-gold-300 to-gold' : 'bg-slate-200'
                  }`}/>
                ))}
              </div>
              <p className="text-xs text-slate-500">Step {step + 1} of {QUESTIONS.length}</p>
            </div>

            <div className="card-elevated p-8 lg:p-12 reveal" key={step}>
              <h2 className="display text-2xl lg:text-3xl text-brand">{QUESTIONS[step].title}</h2>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {QUESTIONS[step].options.map((opt) => (
                  <button key={opt.id} onClick={() => pick(QUESTIONS[step].key, opt.id)}
                    className="group text-left p-6 rounded-2xl border-2 border-slate-200 hover:border-gold hover:bg-gold/5 hover:-translate-y-0.5 transition-all">
                    <p className="font-display font-bold text-lg text-brand">{opt.label}</p>
                    {opt.desc && <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{opt.desc}</p>}
                    <IconArrow className="w-4 h-4 mt-4 text-slate-300 group-hover:text-gold group-hover:translate-x-1 transition-all"/>
                  </button>
                ))}
              </div>
              {step > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between text-sm">
                  <button onClick={() => setStep(step - 1)} className="btn-ghost">← Back</button>
                  <button onClick={reset} className="btn-ghost text-slate-500">Start over</button>
                </div>
              )}
            </div>
          </>
        )}

        {done && (
          <>
            <div className="card-elevated p-6 lg:p-7 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold-600 flex items-center justify-center">
                  <IconSpark className="w-6 h-6"/>
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-brand">Your recommendations</p>
                  <p className="text-xs text-slate-500 mt-0.5">Based on: {Object.values(answers).join(' · ')}</p>
                </div>
              </div>
              <button onClick={reset} className="btn-outline">Start new selection</button>
            </div>

            <div className="space-y-6">
              {results.map((r, i) => {
                const isUnlocked = unlocked.includes(testKey(r.key));
                return (
                  <TestCard key={r.key} test={r} rank={i + 1} isUnlocked={isUnlocked}
                    onUnlock={() => setPayItem({
                      itemKey: testKey(r.key),
                      itemType: 'test',
                      itemName: r.name,
                      priceKES: TEST_SELECTOR_UNLOCK_PRICE,
                    })}/>
                );
              })}
            </div>
          </>
        )}
      </div>

      <MpesaModal open={!!payItem} item={payItem}
        onClose={() => setPayItem(null)} onClaimed={refreshUnlocks}/>
    </>
  );
}

function TestCard({ test, rank, isUnlocked, onUnlock }) {
  return (
    <article className="relative card-elevated p-7 lg:p-8 overflow-hidden">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <span className="eyebrow">
            {rank === 1 ? '— Best match' : `— Option ${rank}`}
          </span>
          <h3 className="display text-2xl lg:text-3xl text-brand mt-2">{test.name}</h3>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="badge-brand">Match score {test.score}</span>
          {isUnlocked ? (
            <span className="badge bg-emerald-100 text-emerald-700">
              <IconCheck className="w-3 h-3"/> Unlocked
            </span>
          ) : (
            <span className="badge bg-slate-100 text-slate-500">
              <IconLock className="w-3 h-3"/> Locked
            </span>
          )}
        </div>
      </div>

      <div className="mt-2 pt-2">
        <p className="eyebrow">Why this fits</p>
        <p className="mt-2 text-sm text-slate-700">{test.why}</p>
      </div>

      <div className="relative mt-6">
        <div className={`space-y-6 transition ${isUnlocked ? '' : 'blur-sm pointer-events-none select-none'}`}>
          <Section title="Assumptions">
            <ul className="space-y-2">
              {test.assumptions.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-slate-700">
                  <IconCheck className="w-4 h-4 text-gold mt-0.5 shrink-0"/> {a}
                </li>
              ))}
            </ul>
          </Section>
          <Section title="SPSS click-path">
            <ol className="text-sm text-slate-700 space-y-1.5 list-decimal pl-5 marker:text-gold marker:font-bold">
              {test.spssSteps.map((s, idx) => <li key={idx}>{s}</li>)}
            </ol>
          </Section>
          <Section title="How to interpret">
            <p className="text-sm text-slate-700">{test.interpretation}</p>
          </Section>
        </div>

        {!isUnlocked && (
          <div className="lock-overlay">
            <div className="w-16 h-16 rounded-full bg-gold/20 text-gold-700 flex items-center justify-center">
              <IconLock className="w-7 h-7"/>
            </div>
            <p className="display text-xl text-brand mt-4">Unlock the full guide</p>
            <p className="text-sm text-slate-600 max-w-xs mt-2">
              Assumptions checklist, full SPSS steps, sample output, and interpretation walkthrough.
            </p>
            <button onClick={onUnlock} className="btn-gold mt-5">
              <IconLock className="w-4 h-4"/> Unlock · KES {TEST_SELECTOR_UNLOCK_PRICE.toLocaleString('en-KE')}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
