import PublicNav from '../components/PublicNav.jsx';
import Footer from '../components/Footer.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';
import { Link } from 'react-router-dom';

const TRACKS = [
  {
    id: 'beginner',
    title: 'Beginner Track',
    subtitle: 'Never opened SPSS? Start here.',
    color: 'emerald',
    emoji: '🌱',
    time: '2–3 weeks',
    outcome: 'You can describe your data, run basic tests, and write up simple results.',
    steps: [
      { lesson: 'SPSS Interface', desc: 'Learn the layout — where everything is. The "cockpit" of SPSS.', id: 'spss-interface' },
      { lesson: 'Data View', desc: 'See your data as rows and columns. Enter values, spot problems.', id: 'data-view' },
      { lesson: 'Defining Variables', desc: 'Name your columns, set their types (text, number, scale).', id: 'defining-variables' },
      { lesson: 'Importing Data', desc: 'Bring in your Excel or CSV file. No more re-typing data.', id: 'importing-data' },
      { lesson: 'Missing Values', desc: 'Handle blank spots — the #1 mistake beginners ignore.', id: 'missing-values' },
      { lesson: 'Data Cleaning', desc: 'Fix errors, remove outliers, prepare your dataset.', id: 'data-cleaning-basics' },
      { lesson: 'Frequencies', desc: 'Count and chart your categorical data (gender, groups, yes/no).', id: 'frequencies' },
      { lesson: 'Central Tendency', desc: 'Calculate the mean, median, mode — the "typical" score.', id: 'central-tendency' },
      { lesson: 'Dispersion', desc: 'How spread out are your scores? Standard deviation & variance.', id: 'dispersion' },
      { lesson: 'Graphs', desc: 'Visualize your data — histograms, bar charts, boxplots.', id: 'graphs' },
    ]
  },
  {
    id: 'intermediate',
    title: 'Intermediate Track',
    subtitle: 'Know the basics? Now find relationships & compare groups.',
    color: 'amber',
    emoji: '🔬',
    time: '3–4 weeks',
    outcome: 'You can test hypotheses, run correlations, t-tests, and chi-square — the most common analyses in a Master\'s project.',
    steps: [
      { lesson: 'Pearson Correlation', desc: 'Are two variables related? How strongly?', id: 'pearson' },
      { lesson: 'Spearman Correlation', desc: 'Same idea, but for ranked or non-normal data.', id: 'spearman' },
      { lesson: 'Correlation Matrices', desc: 'See how ALL your variables relate at once.', id: 'matrices' },
      { lesson: 'One-sample t-test', desc: 'Is my group different from a known value?', id: 'one-sample-ttest' },
      { lesson: 'Independent t-test', desc: 'Are two groups different? (e.g., Male vs Female)', id: 'independent-ttest' },
      { lesson: 'Paired t-test', desc: 'Did the SAME people change over time? (before vs after)', id: 'paired-ttest' },
      { lesson: 'Chi-Square', desc: 'Are two categorical variables related?', id: 'chi-square' },
      { lesson: 'Simple Regression', desc: 'Predict one variable from another.', id: 'simple-regression' },
      { lesson: 'Multiple Regression', desc: 'Predict one variable from SEVERAL predictors at once.', id: 'multiple-regression' },
      { lesson: 'Cronbach\'s Alpha', desc: 'Is my questionnaire reliable? Do items hang together?', id: 'cronbach-alpha' },
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Track',
    subtitle: 'Ready for PhD-level analyses.',
    color: 'rose',
    emoji: '🚀',
    time: '4–6 weeks',
    outcome: 'You can run ANOVA, ANCOVA, MANOVA, logistic regression, and write Chapter 4 & 5 to distinction level.',
    steps: [
      { lesson: 'One-way ANOVA', desc: 'Compare 3+ groups. (DAP vs CAN vs Organic yields)', id: 'one-way-anova' },
      { lesson: 'Post-hoc Tests', desc: 'ANOVA was significant — NOW which groups differ?', id: 'post-hoc' },
      { lesson: 'Two-way ANOVA', desc: 'Two factors at once (e.g., fertilizer AND season)', id: 'two-way-anova' },
      { lesson: 'Repeated Measures ANOVA', desc: 'Same people measured 3+ times over time.', id: 'repeated-measures' },
      { lesson: 'Mixed ANOVA', desc: 'Mix of between-group AND repeated-measures factors.', id: 'mixed-anova' },
      { lesson: 'ANCOVA', desc: 'ANOVA + a covariate you want to control for.', id: 'ancova' },
      { lesson: 'MANOVA', desc: 'Multiple dependent variables at once.', id: 'manova' },
      { lesson: 'Regression Diagnostics', desc: 'Check your model is trustworthy.', id: 'regression-diagnostics' },
      { lesson: 'Logistic Regression', desc: 'Predict YES/NO outcomes.', id: 'logistic-regression' },
      { lesson: 'Writing Chapter 4', desc: 'Turn your SPSS output into a thesis chapter.', id: 'writing-chapter-4' },
      { lesson: 'APA 7 Reporting', desc: 'Format everything for your examiner.', id: 'apa7-reporting' },
    ]
  }
];

const colorMap = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', accent: 'text-emerald-700', dot: 'bg-emerald-500', ring: 'ring-emerald-300' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', accent: 'text-amber-700', dot: 'bg-amber-500', ring: 'ring-amber-300' },
  rose: { bg: 'bg-rose-50', border: 'border-rose-200', accent: 'text-rose-700', dot: 'bg-rose-500', ring: 'ring-rose-300' },
};

export default function Pathway() {
  usePageTitle('Learning Pathway');

  return (
    <div className="min-h-screen bg-parchment">
      <PublicNav />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 lg:pt-24 lg:pb-12">
        <span className="eyebrow">— Where do I start?</span>
        <h1 className="display text-4xl lg:text-5xl text-brand mt-3">
          Learning <span className="italic font-light">Pathway</span>
        </h1>
        <div className="gold-rule mt-6"/>
        <p className="mt-6 text-slate-600 max-w-2xl leading-relaxed">
          39 lessons can feel overwhelming. So here's a clear path — pick the track that matches where you are right now. Each step builds on the one before it. Do them in order.
        </p>

        {/* Quick self-assessment */}
        <div className="mt-8 bg-white/70 backdrop-blur rounded-xl border border-slate-200 p-5 sm:p-6">
          <h3 className="display text-lg text-brand mb-3">🤔 Which track is right for you?</h3>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <p className="font-bold text-emerald-800">Choose Beginner if…</p>
              <p className="text-emerald-700 mt-1">You've never opened SPSS. Or you opened it once and closed it again.</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <p className="font-bold text-amber-800">Choose Intermediate if…</p>
              <p className="text-amber-700 mt-1">You can run frequencies and means, but you don't know which test to use for your project.</p>
            </div>
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
              <p className="font-bold text-rose-800">Choose Advanced if…</p>
              <p className="text-rose-700 mt-1">You've run t-tests and regressions before. You need ANOVA, ANCOVA, or logistic regression.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 space-y-12">
        {TRACKS.map((track) => {
          const c = colorMap[track.color];
          return (
            <div key={track.id} className={`${c.bg} rounded-2xl border ${c.border} overflow-hidden`}>
              {/* Track header */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-3xl mb-1">{track.emoji}</p>
                    <h2 className="display text-2xl sm:text-3xl text-brand">{track.title}</h2>
                    <p className={`mt-1 ${c.accent} font-medium`}>{track.subtitle}</p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-bold text-brand">{track.steps.length}</p>
                      <p className="text-slate-500 text-xs">lessons</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-brand">{track.time}</p>
                      <p className="text-slate-500 text-xs">estimated</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-700">
                  <strong>By the end you can:</strong> {track.outcome}
                </p>
              </div>

              {/* Steps timeline */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="relative">
                  {/* Vertical line */}
                  <div className={`absolute left-4 top-0 bottom-0 w-0.5 ${c.dot} opacity-20`} />

                  <div className="space-y-3">
                    {track.steps.map((step, i) => (
                      <div key={step.id} className="relative flex items-start gap-4">
                        {/* Number dot */}
                        <div className={`relative z-10 shrink-0 w-8 h-8 rounded-full ${c.dot} text-white flex items-center justify-center text-xs font-bold shadow-sm`}>
                          {i + 1}
                        </div>
                        {/* Content card */}
                        <div className="flex-1 bg-white/80 rounded-lg border border-slate-200 p-4 hover:border-gold/40 transition">
                          <p className="font-semibold text-brand">{step.lesson}</p>
                          <p className="text-sm text-slate-600 mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Decision tree CTA */}
        <div className="bg-white/70 backdrop-blur rounded-xl border border-slate-200 p-8 sm:p-10 text-center">
          <h2 className="display text-2xl text-brand">Not sure which track?</h2>
          <p className="mt-3 text-slate-600 max-w-lg mx-auto">
            The <strong>Master Decision Tree</strong> asks you a few questions about your project and tells you exactly which tests to run — and which lessons cover them. It's free with any 2 paid lessons.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/register" className="btn-gold text-sm">Start free</Link>
            <a href="/glossary" className="btn glass text-brand hover:bg-white/30 text-sm">Browse glossary</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
