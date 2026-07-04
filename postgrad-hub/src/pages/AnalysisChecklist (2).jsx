import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { analysisChecklist } from '../lib/db.js';
import { usePageTitle } from '../lib/usePageTitle.js';
import { IconCheck, IconArrow, IconSpark, IconBook, IconChart, IconCalendar } from '../components/Icons.jsx';

/**
 * ═════════════════════════════════════════════════════════════════
 *  ANALYSIS CHECKLIST — 9 stages, step-by-step post-data workflow
 *  Kenyan postgrad-specific. Every item ties back to a lesson/service.
 * ═════════════════════════════════════════════════════════════════
 *  Data model: each item has a stable ID (used to persist ticks).
 *  IDs use format `s{stage}-{item}` — DO NOT rename retroactively,
 *  or students will lose their progress.
 */

const STAGES = [
  {
    id: 1,
    title: 'Set up your dataset properly',
    icon: '🗂️',
    intro: 'Before ANY analysis, get your file into a state that won\'t betray you at 2am the day before the deadline.',
    items: [
      { id: 's1-backup',    text: 'Save a backup of your raw file (labelled _RAW) — never edit it directly' },
      { id: 's1-workcopy',  text: 'Open a working copy in SPSS for all cleaning' },
      { id: 's1-varnames',  text: 'Verify every variable has a short name, a clear label, and correct type (numeric / string)' },
      { id: 's1-measlevel', text: 'Set the measurement level (nominal / ordinal / scale) for every variable' },
      { id: 's1-missing',   text: 'Declare your missing-value codes (e.g. 999, 998) in Variable View → Missing column' },
    ],
    links: [
      { label: '📚 Defining variables & labels — KES 350', to: '/app/spss' },
      { label: '📚 Data view vs Variable view — KES 350', to: '/app/spss' },
    ],
  },
  {
    id: 2,
    title: 'Clean your data',
    icon: '🧹',
    intro: '60% of the work of analysis is cleaning. Skip this at your peril — supervisors and reviewers CAN spot dirty data.',
    items: [
      { id: 's2-freq',       text: 'Run Frequencies on every variable — catches 80% of data-entry errors in 5 minutes' },
      { id: 's2-impossible', text: 'Check for impossible values (age = 500? income = -300?)' },
      { id: 's2-duplicates', text: 'Check for and handle duplicate cases (Data → Identify Duplicate Cases)' },
      { id: 's2-missing',    text: 'Decide how to handle missing data (delete cases? impute? report as-is?) — and document your choice' },
      { id: 's2-reverse',    text: 'Reverse-code negatively-worded Likert items (formula: new = (n + 1) − old)' },
      { id: 's2-outliers',   text: 'Check for outliers (Explore → box plots, or standardised z-scores > ±3)' },
    ],
    links: [
      { label: '📚 Data Cleaning Basics — KES 500 (or 250 after 3 paid lessons)', to: '/app/spss' },
      { label: '📚 Handling missing values — KES 350', to: '/app/spss' },
    ],
  },
  {
    id: 3,
    title: 'Compute composite scores',
    icon: '➕',
    intro: 'If you used multi-item scales (Likert questionnaires), you need to combine those items into single composite scores per construct.',
    items: [
      { id: 's3-compute',  text: 'Use Transform → Compute Variable to create composite scores for each scale' },
      { id: 's3-mean',     text: 'Use MEAN() function (not SUM) if some items may be missing — it\'s more forgiving' },
      { id: 's3-label',    text: 'Give the new composite variable a clear label (e.g. "Job Satisfaction — composite mean")' },
      { id: 's3-save',     text: 'Save your syntax so the calculation is reproducible (Paste → save as .sps)' },
    ],
    links: [
      { label: '📚 Data Cleaning Basics covers Compute — KES 500', to: '/app/spss' },
    ],
  },
  {
    id: 4,
    title: 'Test reliability of your scales',
    icon: '🎯',
    intro: 'Before you trust a Likert scale as a measure, prove that its items actually hang together statistically.',
    items: [
      { id: 's4-alpha',     text: "Run Cronbach's Alpha for every multi-item scale (Analyze → Scale → Reliability Analysis)" },
      { id: 's4-threshold', text: 'Confirm α ≥ .70 (acceptable), ≥ .80 (good). Below .70? Investigate.' },
      { id: 's4-itemtotal', text: 'Check "if item deleted" column — remove problem items only if theoretically defensible' },
      { id: 's4-note',      text: 'Note the final α value for each scale — you\'ll report this in Chapter 4' },
      { id: 's4-splithalf', text: 'For very short scales (2-4 items), consider Split-half reliability instead' },
    ],
    links: [
      { label: "📚 Cronbach's Alpha basics — KES 650", to: '/app/spss' },
      { label: '📚 Item-total statistics — KES 650', to: '/app/spss' },
      { label: '📚 Split-half reliability — KES 650', to: '/app/spss' },
    ],
  },
  {
    id: 5,
    title: 'Descriptive analysis',
    icon: '📊',
    intro: 'Paint a clear picture of your sample and your variables before diving into hypothesis tests.',
    items: [
      { id: 's5-response',   text: 'Calculate your response rate (returned ÷ distributed × 100)' },
      { id: 's5-demos',      text: 'Run frequencies + percentages for demographics (gender, age, education, county, etc.)' },
      { id: 's5-central',    text: 'Report central tendency (mean, median, mode) for scale variables' },
      { id: 's5-dispersion', text: 'Report dispersion (standard deviation, range, variance) for scale variables' },
      { id: 's5-graphs',     text: 'Produce clean charts (bar, pie, histogram) for your key variables — export as .png' },
      { id: 's5-table',      text: 'Build a demographics table (age × gender × county etc.) ready to paste into Chapter 4' },
    ],
    links: [
      { label: '📚 Frequencies & percentages — KES 350', to: '/app/spss' },
      { label: '📚 Mean, median, mode — KES 350', to: '/app/spss' },
      { label: '📚 Standard deviation & variance — KES 350', to: '/app/spss' },
      { label: '📚 Producing graphs & charts — KES 400', to: '/app/spss' },
    ],
  },
  {
    id: 6,
    title: 'Inferential analysis (test your hypotheses)',
    icon: '🔬',
    intro: 'Now the main event — testing whether the patterns you see in your data are statistically significant.',
    items: [
      { id: 's6-plan',        text: 'For EACH research objective / hypothesis, decide which statistical test fits' },
      { id: 's6-selector',    text: 'Use the Statistical Test Selector if you\'re unsure which test to run' },
      { id: 's6-assumptions', text: 'CHECK the assumptions of each test BEFORE running it (normality, homogeneity of variance, independence)' },
      { id: 's6-run',         text: 'Run each test in SPSS and save the output (.spv file)' },
      { id: 's6-effect',      text: 'Note the effect size (Cohen\'s d, r, η², φ) — reviewers ask for this, not just p-values' },
      { id: 's6-fallback',    text: 'If assumptions are violated, switch to the non-parametric equivalent (Mann-Whitney, Wilcoxon, Kruskal-Wallis, Spearman etc.)' },
    ],
    links: [
      { label: '🎯 Open the Statistical Test Selector', to: '/app/tests' },
      { label: '📚 The Master Decision Tree — FREE after 2 paid lessons', to: '/app/spss' },
      { label: '📚 T-tests, ANOVA, Correlation, Regression — KES 1,750 each', to: '/app/spss' },
      { label: '📚 Non-parametric tests — KES 1,750 each', to: '/app/spss' },
    ],
  },
  {
    id: 7,
    title: 'Interpret your output',
    icon: '💡',
    intro: 'SPSS gives you numbers. YOU turn them into meaning. This is where students get stuck — take your time here.',
    items: [
      { id: 's7-pvalue',     text: 'Read BOTH the p-value AND the effect size for every test' },
      { id: 's7-plain',      text: 'Write a one-sentence plain-English interpretation for every significant result' },
      { id: 's7-hypothesis', text: 'Compare each result against your hypothesis (fully supported? partially? rejected?)' },
      { id: 's7-unexpected', text: 'Note anything unexpected — surprising directions, non-significant relationships you predicted, etc.' },
      { id: 's7-context',    text: 'Think about the CONTEXT: could Kenyan-specific factors (culture, economics, geography) explain what you see?' },
    ],
    links: [
      { label: '📚 Every statistical lesson in the Academy covers interpretation', to: '/app/spss' },
      { label: '📚 Interpreting correlation matrices — KES 1,350', to: '/app/spss' },
      { label: '📚 Regression: assumptions & diagnostics — KES 1,350', to: '/app/spss' },
    ],
  },
  {
    id: 8,
    title: 'Format for Chapter 4',
    icon: '📝',
    intro: 'Turn your SPSS tables + your interpretations into a defensible, APA-formatted Chapter 4.',
    items: [
      { id: 's8-copy',      text: 'Copy tables from SPSS into Word (paste as picture or Rich Text Format)' },
      { id: 's8-apa',       text: 'Format tables in APA 7 style (no vertical lines, only horizontal at top/bottom of header + bottom of table)' },
      { id: 's8-narrative', text: 'Write findings paragraphs for each objective (Table → interpretation → decision)' },
      { id: 's8-numbers',   text: 'Include actual numbers in-text: n, mean, SD, p-value, effect size — never just "significant"' },
      { id: 's8-hypcheck',  text: 'For each hypothesis, explicitly write "H1 was supported" or "H1 was rejected"' },
    ],
    links: [
      { label: '📚 Writing Chapter 4 (package with APA 7 reporting) — KES 1,500', to: '/app/spss' },
      { label: '✨ Overwhelmed? Order Analysis + Chapter 4 write-up — from KES 12,000', to: '/app/analysis' },
    ],
  },
  {
    id: 9,
    title: 'Prepare for Chapter 5 & defence',
    icon: '🎓',
    intro: 'One more push — discussion, recommendations, and readiness for supervisor + defence questions.',
    items: [
      { id: 's9-discussion',   text: 'For each finding, discuss: how does it compare with prior literature? (agree / disagree / new)' },
      { id: 's9-conclusions',  text: 'Write one clear conclusion per research objective' },
      { id: 's9-recommendations', text: 'Give recommendations in 3 buckets: theoretical, practical, policy' },
      { id: 's9-further',      text: 'Suggest areas for further study (based on your unexpected findings + limitations)' },
      { id: 's9-defence',      text: 'Anticipate likely defence questions: "Why this test?", "What if you\'d done X instead?", "How generalisable is this to Kenya more broadly?"' },
    ],
    links: [
      { label: '✨ Full Analysis + Chapter 4 + Chapter 5 — KES 35,000 (loyalty rate 30,000)', to: '/app/analysis' },
      { label: '📅 Book a defence-prep consultation — KES 2,000', to: '/app/consultations' },
    ],
  },
];

const TOTAL_ITEMS = STAGES.reduce((sum, s) => sum + s.items.length, 0);

export default function AnalysisChecklist() {
  usePageTitle('Data Analysis Checklist');
  const [ticked, setTicked] = useState([]);
  const [openStage, setOpenStage] = useState(1);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const list = await analysisChecklist.list();
      setTicked(Array.isArray(list) ? list : []);
    } catch (e) {
      console.warn('[Checklist] failed to load, showing empty state', e);
      setTicked([]);
    } finally {
      setLoading(false);   // ALWAYS clear the loading spinner
    }
  };
  useEffect(() => { refresh(); }, []);

  const toggle = async (itemId) => {
    // Optimistic UI — flip immediately, persist in background
    setTicked((t) => t.includes(itemId) ? t.filter((x) => x !== itemId) : [...t, itemId]);
    await analysisChecklist.toggle(itemId);
  };

  const resetAll = async () => {
    if (!window.confirm('Reset ALL your ticks? This can\'t be undone.')) return;
    await analysisChecklist.reset();
    setTicked([]);
  };

  const completedCount = ticked.length;
  const percent = Math.round((completedCount / TOTAL_ITEMS) * 100);
  const stageStats = STAGES.map((s) => {
    const done = s.items.filter((i) => ticked.includes(i.id)).length;
    return { id: s.id, done, total: s.items.length, complete: done === s.items.length };
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ─── Header ─── */}
      <div>
        <span className="eyebrow">— Module</span>
        <h1 className="display text-4xl lg:text-5xl text-brand mt-2">
          Data Analysis Checklist
        </h1>
        <p className="text-sm text-slate-600 mt-3 max-w-2xl leading-relaxed">
          Every step from <strong>"I just finished collecting data"</strong> to <strong>"my Chapter 4 & 5 are ready to submit"</strong>. Tick items as you go — your progress is saved automatically. Free to use.
        </p>
      </div>

      {/* ─── Overall progress ─── */}
      <div className="card-elevated p-6 lg:p-8 bg-gradient-to-br from-brand/5 to-gold/5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-wider font-bold text-slate-500">Overall progress</p>
            <p className="display text-4xl text-brand font-bold mt-1">
              {completedCount}<span className="text-slate-400 text-2xl"> / {TOTAL_ITEMS}</span>
            </p>
            <p className="text-sm text-slate-600 mt-1">{percent}% complete</p>
          </div>
          <div className="flex items-center gap-3">
            {percent === 100 && (
              <span className="badge bg-emerald-100 text-emerald-700 font-bold">
                🎉 Ready for submission
              </span>
            )}
            {completedCount > 0 && (
              <button onClick={resetAll} className="text-xs text-slate-500 hover:text-red-600 underline">
                Reset all
              </button>
            )}
          </div>
        </div>
        <div className="h-2 bg-slate-100 rounded-full mt-5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gold-300 to-gold transition-all duration-700"
               style={{ width: `${percent}%` }}/>
        </div>
        {/* Stage dots */}
        <div className="mt-5 flex items-center gap-1.5 flex-wrap">
          {stageStats.map((s) => (
            <button
              key={s.id}
              onClick={() => setOpenStage(s.id)}
              className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition ${
                s.complete ? 'bg-gold text-brand' :
                s.done > 0 ? 'bg-gold/30 text-brand-700' :
                'bg-slate-200 text-slate-500 hover:bg-slate-300'
              }`}
              title={`Stage ${s.id}: ${s.done}/${s.total}`}
            >
              {s.complete ? '✓' : s.id}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="card-elevated p-10 text-center text-slate-500">Loading your progress…</div>
      ) : (
        /* ─── Stages ─── */
        <div className="space-y-4">
          {STAGES.map((stage) => {
            const stats = stageStats.find((x) => x.id === stage.id);
            const isOpen = openStage === stage.id;
            return (
              <div key={stage.id} className={`card-elevated overflow-hidden transition-all ${
                stats.complete ? 'border-2 border-emerald-300' : ''
              }`}>
                {/* Stage header — click to expand */}
                <button
                  onClick={() => setOpenStage(isOpen ? null : stage.id)}
                  className="w-full p-5 lg:p-6 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition text-left"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                      stats.complete ? 'bg-emerald-100' : stats.done > 0 ? 'bg-gold/20' : 'bg-slate-100'
                    }`}>
                      {stats.complete ? '✅' : stage.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider font-bold text-slate-500">
                        Stage {stage.id}
                      </p>
                      <h3 className="font-display font-bold text-brand text-lg lg:text-xl leading-tight truncate">
                        {stage.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-bold ${
                      stats.complete ? 'text-emerald-700' : 'text-slate-500'
                    }`}>
                      {stats.done}/{stats.total}
                    </span>
                    <span className={`text-xs text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
                  </div>
                </button>

                {/* Stage body — visible when open */}
                {isOpen && (
                  <div className="px-5 lg:px-6 pb-6 border-t border-slate-100">
                    <p className="text-sm text-slate-600 mt-4 leading-relaxed italic">{stage.intro}</p>

                    <ul className="mt-5 space-y-2.5">
                      {stage.items.map((item) => {
                        const checked = ticked.includes(item.id);
                        return (
                          <li key={item.id}>
                            <label className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition ${
                              checked ? 'bg-emerald-50/50' : 'hover:bg-slate-50'
                            }`}>
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggle(item.id)}
                                className="mt-0.5 w-5 h-5 rounded border-2 border-slate-300 text-brand focus:ring-brand-200 cursor-pointer shrink-0"
                              />
                              <span className={`text-sm leading-relaxed ${
                                checked ? 'text-slate-500 line-through' : 'text-slate-700'
                              }`}>
                                {item.text}
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>

                    {stage.links && stage.links.length > 0 && (
                      <div className="mt-5 pt-5 border-t border-slate-100">
                        <p className="text-[11px] uppercase tracking-wider font-bold text-gold-700 mb-3">
                          Related lessons & services
                        </p>
                        <ul className="space-y-2">
                          {stage.links.map((link, i) => (
                            <li key={i}>
                              <Link
                                to={link.to}
                                className="flex items-center justify-between gap-2 p-2 px-3 rounded-lg bg-brand/5 hover:bg-brand/10 text-sm text-brand font-semibold transition"
                              >
                                <span>{link.label}</span>
                                <IconArrow className="w-4 h-4 shrink-0 opacity-60"/>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ─── Bottom CTA ─── */}
      <div className="card-elevated p-6 lg:p-8 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-40"/>
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/20 rounded-full blur-3xl"/>
        <div className="relative">
          <span className="eyebrow text-gold-300">— Stuck?</span>
          <h3 className="display text-2xl mt-2">You don't have to do this alone.</h3>
          <p className="text-brand-100/80 text-sm mt-3 max-w-lg leading-relaxed">
            Every stage above links to the lesson that walks you through it. And if you're truly overwhelmed, our PhD team can take the analysis off your hands entirely.
          </p>
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <Link to="/app/spss" className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm">
              <IconBook className="w-4 h-4 text-gold"/> SPSS Academy
            </Link>
            <Link to="/app/tests" className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm">
              <IconChart className="w-4 h-4 text-gold"/> Test Selector
            </Link>
            <Link to="/app/analysis" className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm">
              <IconSpark className="w-4 h-4 text-gold"/> Analysis Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
