import PublicNav from '../components/PublicNav.jsx';
import Footer from '../components/Footer.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';

const DATASETS = [
  {
    name: 'Machakos Digital Learning',
    slug: 'machakos-digital-learning',
    file: 'machakos-digital-learning.csv',
    n: 274,
    vars: 21,
    emoji: '💻',
    color: 'blue',
    desc: '8 principals, 54 teachers, 212 students across Machakos County schools. Measures digital learning adoption.',
    useFor: ['Correlation', 'Multiple Regression', 'Descriptive Statistics', 'Data Cleaning'],
    keyVars: ['Digital_Devices', 'Teacher_Competency', 'Internet_Connectivity', 'InvestmentPerStudent', 'Math_KCSE_Mean'],
    scenario: 'Your study examines how digital device access, teacher competency, and internet connectivity relate to KCSE Mathematics mean scores in Machakos County secondary schools.'
  },
  {
    name: 'Kiambu Maize',
    slug: 'kiambu-maize',
    file: 'kiambu-maize.csv',
    n: 180,
    vars: 10,
    emoji: '🌽',
    color: 'emerald',
    desc: '180 farms comparing three fertilizer types (DAP, CAN, Organic) on maize yield.',
    useFor: ['Independent t-test', 'One-way ANOVA', 'ANCOVA', 'MANOVA', 'Post-hoc'],
    keyVars: ['Fertilizer (DAP/CAN/Organic)', 'Yield_kg_per_acre', 'FarmSizeAcres', 'GrainQuality_Score'],
    scenario: 'An agricultural study comparing the effect of three fertilizer types on maize yield, with farm size as a covariate and grain quality as a secondary outcome.'
  },
  {
    name: 'Nakuru Wellness',
    slug: 'nakuru-wellness',
    file: 'nakuru-wellness.csv',
    n: 45,
    vars: 12,
    emoji: '❤️',
    color: 'rose',
    desc: '45 participants (22 men, 23 women) in a wellness intervention. Blood pressure measured at 3 time points.',
    useFor: ['Paired t-test', 'Repeated Measures ANOVA', 'Mixed ANOVA', 'Friedman'],
    keyVars: ['SBP_T0, SBP_T1, SBP_T2', 'DBP_T0, DBP_T1, DBP_T2', 'Gender', 'Group (Intervention/Control)'],
    scenario: 'A clinical study measuring systolic and diastolic blood pressure at baseline, 4 weeks, and 8 weeks to evaluate a wellness intervention.'
  },
  {
    name: 'Mombasa Patient Satisfaction',
    slug: 'mombasa-patient-satisfaction',
    file: 'mombasa-patient-satisfaction.csv',
    n: 240,
    vars: 20,
    emoji: '🏥',
    color: 'violet',
    desc: '240 patients rating a 15-item Patient Satisfaction Scale (PSS) across multiple facilities.',
    useFor: ['Cronbach\'s Alpha', 'Item-Total Analysis', 'Split-Half Reliability'],
    keyVars: ['PSS_1 through PSS_15 (1–5 Likert)', 'Visit_Type', 'WaitTime_Minutes'],
    scenario: 'Evaluating the internal consistency and reliability of a 15-item patient satisfaction questionnaire administered across hospitals in Mombasa.'
  },
  {
    name: 'Nyandarua Vaccine',
    slug: 'nyandarua-vaccine',
    file: 'nyandarua-vaccine.csv',
    n: 320,
    vars: 9,
    emoji: '💉',
    color: 'amber',
    desc: '320 community members — education level and vaccine acceptance in Nyandarua County.',
    useFor: ['Chi-Square', 'Logistic Regression', 'Frequencies', 'Cross-tabulation'],
    keyVars: ['Education (5 levels)', 'Vaccine_Acceptance (Yes/No)', 'Age', 'Gender', 'HealthWorker_Contact'],
    scenario: 'A public health study examining whether education level is associated with willingness to accept vaccination in Nyandarua County.'
  }
];

const colorMap = {
  blue: 'bg-blue-50 border-blue-200',
  emerald: 'bg-emerald-50 border-emerald-200',
  rose: 'bg-rose-50 border-rose-200',
  violet: 'bg-violet-50 border-violet-200',
  amber: 'bg-amber-50 border-amber-200',
};

export default function Datasets() {
  usePageTitle('Practice Datasets');

  return (
    <div className="min-h-screen bg-parchment">
      <PublicNav />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 lg:pt-24 lg:pb-8">
        <span className="eyebrow">— Free downloads</span>
        <h1 className="display text-4xl lg:text-5xl text-brand mt-3">
          Practice <span className="italic font-light">Datasets</span>
        </h1>
        <div className="gold-rule mt-6"/>
        <p className="mt-6 text-slate-600 max-w-2xl leading-relaxed">
          Five real-world Kenyan datasets ready for SPSS practice. Download any dataset as a CSV file, open it in SPSS (<strong>File → Open → Data → CSV</strong>), and follow along with the lessons. Each dataset has a scenario, recommended tests, and key variables listed.
        </p>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <strong>💡 How to open in SPSS:</strong> File → Open → Data → change "Files of type" to <em>Data [*.csv, *.dat, *.txt]</em> → select the downloaded file → OK.
        </div>
      </section>

      {/* Dataset cards */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 space-y-6">
        {DATASETS.map((ds) => (
          <article key={ds.slug} className={`${colorMap[ds.color]} rounded-2xl border overflow-hidden`}>
            <div className="p-5 sm:p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{ds.emoji}</span>
                  <div>
                    <h2 className="display text-xl text-brand">{ds.name}</h2>
                    <p className="text-sm text-slate-600 mt-0.5">{ds.desc}</p>
                  </div>
                </div>
                <a
                  href={`/datasets/${ds.file}`}
                  download
                  className="btn-gold text-sm shrink-0"
                >
                  ↓ Download CSV
                </a>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-4 mt-4 text-sm">
                <div className="bg-white/70 rounded-lg px-3 py-2 border border-slate-200">
                  <span className="font-bold text-brand">{ds.n}</span>
                  <span className="text-slate-500 ml-1">cases</span>
                </div>
                <div className="bg-white/70 rounded-lg px-3 py-2 border border-slate-200">
                  <span className="font-bold text-brand">{ds.vars}</span>
                  <span className="text-slate-500 ml-1">variables</span>
                </div>
              </div>

              {/* Scenario */}
              <div className="mt-4 bg-white/60 rounded-lg p-3 border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">📋 Research Scenario</p>
                <p className="text-sm text-slate-700">{ds.scenario}</p>
              </div>

              {/* Key variables */}
              <div className="mt-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">🔑 Key Variables</p>
                <div className="flex flex-wrap gap-1.5">
                  {ds.keyVars.map(v => (
                    <span key={v} className="text-xs bg-white/80 text-slate-700 px-2 py-0.5 rounded border border-slate-200">{v}</span>
                  ))}
                </div>
              </div>

              {/* Use for */}
              <div className="mt-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">📊 Best for practicing</p>
                <div className="flex flex-wrap gap-1.5">
                  {ds.useFor.map(u => (
                    <span key={u} className="text-xs bg-gold/20 text-gold-800 px-2 py-0.5 rounded font-medium">{u}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Tips section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="bg-white/70 backdrop-blur rounded-xl border border-slate-200 p-6 sm:p-8">
          <h2 className="display text-xl text-brand mb-4">💡 Tips for practicing</h2>
          <ol className="space-y-3 text-sm text-slate-700 list-decimal list-inside">
            <li><strong>Start with the Beginner Track</strong> on the <a href="/pathway" className="text-gold-700 underline">Learning Pathway</a> page. Run Frequencies, Means, and Graphs on any dataset first.</li>
            <li><strong>Save a copy</strong> of the dataset before making changes. Never edit the original.</li>
            <li><strong>Follow the lesson screenshots</strong> — each lesson walks you through the exact clicks for that procedure.</li>
            <li><strong>Write up your results in APA format</strong> using the templates in the "Writing Up" lessons.</li>
            <li><strong>Try it twice</strong> — once following the lesson, once on your own without looking.</li>
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 text-center">
        <div className="bg-white/70 backdrop-blur rounded-xl border border-slate-200 p-8 sm:p-10">
          <h2 className="display text-2xl text-brand">Ready to learn?</h2>
          <p className="mt-3 text-slate-600 max-w-lg mx-auto">
            Each lesson uses these exact datasets for worked examples. Download a dataset, pick a track, and start practicing.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/pathway" className="btn-gold text-sm">See learning pathway</a>
            <a href="/glossary" className="btn glass text-brand hover:bg-white/30 text-sm">Browse glossary</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
