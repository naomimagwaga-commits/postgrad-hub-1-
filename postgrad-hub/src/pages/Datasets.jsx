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
    scenario: 'Your study examines how digital device access, teacher competency, and internet connectivity relate to KCSE Mathematics mean scores in Machakos County secondary schools.',
    lessons: ['Pearson Correlation', 'Multiple Regression', 'Frequencies', 'Data Cleaning Basics']
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
    scenario: 'An agricultural study comparing the effect of three fertilizer types on maize yield, with farm size as a covariate and grain quality as a secondary outcome.',
    lessons: ['One-way ANOVA', 'Independent t-test', 'ANCOVA', 'MANOVA']
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
    scenario: 'A clinical study measuring systolic and diastolic blood pressure at baseline, 4 weeks, and 8 weeks to evaluate a wellness intervention.',
    lessons: ['Paired t-test', 'Repeated Measures ANOVA', 'Mixed ANOVA']
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
    scenario: 'Evaluating the internal consistency and reliability of a 15-item patient satisfaction questionnaire administered across hospitals in Mombasa.',
    lessons: ['Cronbach\'s Alpha', 'Item-Total Analysis', 'Split-Half Reliability']
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
    scenario: 'A public health study examining whether education level is associated with willingness to accept vaccination in Nyandarua County.',
    lessons: ['Chi-Square', 'Frequencies', 'Logistic Regression']
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
          Five practice datasets coded to match the case studies in your lessons. Download any dataset as a CSV file, open it in SPSS, and follow along with the worked examples. Each dataset produces realistic results so you can verify your work against the lesson screenshots.
        </p>
      </section>

      {/* HOW TO USE - Detailed Instructions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white/80 backdrop-blur rounded-xl border-2 border-gold/30 p-6 sm:p-8">
          <h2 className="display text-2xl text-brand mb-4 flex items-center gap-2">
            <span>📖</span> How to Use These Datasets
          </h2>
          
          <div className="space-y-5 text-sm">
            {/* Step 1 */}
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold-700 flex items-center justify-center text-sm font-bold">1</div>
              <div className="flex-1">
                <p className="font-bold text-brand">Download a dataset</p>
                <p className="text-slate-600 mt-1">Click the "↓ Download CSV" button below for any dataset. The file will save to your <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">Downloads</code> folder (or wherever your browser saves files).</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold-700 flex items-center justify-center text-sm font-bold">2</div>
              <div className="flex-1">
                <p className="font-bold text-brand">Open SPSS</p>
                <p className="text-slate-600 mt-1">Launch IBM SPSS Statistics on your computer. If you see a dialog asking "Open an existing data file," click <strong>Cancel</strong> — we'll open the file manually in the next step.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold-700 flex items-center justify-center text-sm font-bold">3</div>
              <div className="flex-1">
                <p className="font-bold text-brand">Open the CSV file in SPSS</p>
                <div className="mt-1 space-y-2 text-slate-700">
                  <p>Go to the SPSS menu bar at the top:</p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 font-mono text-xs">
                    <p><strong>File → Open → Data...</strong></p>
                  </div>
                  <p>A file browser window opens. At the bottom, look for a dropdown labeled <strong>"Files of type:"</strong> or <strong>"File type:"</strong> — click it and change it to:</p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 font-mono text-xs">
                    <p><em>Data [*.csv, *.dat, *.txt]</em> or <em>All Files</em></p>
                  </div>
                  <p>Navigate to your Downloads folder, select the CSV file you downloaded, and click <strong>Open</strong>.</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold-700 flex items-center justify-center text-sm font-bold">4</div>
              <div className="flex-1">
                <p className="font-bold text-brand">Confirm the import settings</p>
                <p className="text-slate-600 mt-1">SPSS will show a "Read CSV File" dialog. Make sure these options are selected:</p>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-700 ml-2">
                  <li>✓ <strong>"Configure cases manually"</strong> or <strong>"Read variable names from the first line of the file"</strong></li>
                  <li>✓ <strong>Delimiter:</strong> Comma</li>
                  <li>✓ <strong>Text qualifier:</strong> Double quote (")</li>
                </ul>
                <p className="text-slate-600 mt-2">Click <strong>OK</strong>. SPSS will load your data.</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold-700 flex items-center justify-center text-sm font-bold">5</div>
              <div className="flex-1">
                <p className="font-bold text-brand">Verify the data loaded correctly</p>
                <div className="mt-1 space-y-2 text-slate-700">
                  <p>You should now see the <strong>Data View</strong> tab in SPSS — it looks like an Excel spreadsheet with rows (cases) and columns (variables). Check:</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-2">
                    <li>✓ The number of rows matches the dataset size (e.g., 274 for Machakos)</li>
                    <li>✓ The column names match the "Key Variables" listed below</li>
                    <li>✓ Click the <strong>Variable View</strong> tab (bottom-left) to see variable properties</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold-700 flex items-center justify-center text-sm font-bold">6</div>
              <div className="flex-1">
                <p className="font-bold text-brand">Follow along with a lesson</p>
                <p className="text-slate-600 mt-1">Now open the lesson that uses this dataset (see "Lessons that use this dataset" below for each dataset). The lesson will show you exactly which menus to click, which variables to select, and what output to expect. Run the same analysis on this dataset — your results should match the lesson's screenshots.</p>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="font-bold text-amber-900 mb-2">🔧 Troubleshooting</p>
            <ul className="space-y-2 text-xs text-amber-800">
              <li><strong>"I can't find my downloaded file"</strong> → Check your browser's Downloads folder. On Windows, it's usually <code className="bg-amber-100 px-1 rounded">C:\Users\[YourName]\Downloads</code>. On Mac, it's <code className="bg-amber-100 px-1 rounded">~/Downloads</code>.</li>
              <li><strong>"SPSS shows weird characters instead of variable names"</strong> → When importing, make sure you selected "Read variable names from the first line of the file."</li>
              <li><strong>"All my data is in one column"</strong> → The delimiter is wrong. Go back to the import dialog and select "Comma" as the delimiter.</li>
              <li><strong>"I don't have SPSS installed"</strong> → Contact your university's IT department — most universities provide free SPSS licenses to students. Alternatively, you can read the lesson screenshots to learn the process even without running the analysis yourself.</li>
            </ul>
          </div>
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

              {/* Lessons that use this dataset */}
              {ds.lessons && (
                <div className="mt-3">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">📚 Lessons That Use This Dataset</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ds.lessons.map(lesson => (
                      <span key={lesson} className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 font-medium">{lesson}</span>
                    ))}
                  </div>
                </div>
              )}

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
            <li><strong>Save a copy</strong> of the dataset before making changes. In SPSS: <strong>File → Save As...</strong> and save it as a .sav file in your Documents folder. Never edit the original CSV.</li>
            <li><strong>Follow the lesson screenshots</strong> — each lesson walks you through the exact clicks for that procedure.</li>
            <li><strong>Compare your output to the lesson's output</strong> — if your F-value is 22.40 like the lesson says, you know you did it right!</li>
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
            Download a dataset, pick a track on the Learning Pathway, and start practicing. Each lesson uses these exact datasets for worked examples.
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
