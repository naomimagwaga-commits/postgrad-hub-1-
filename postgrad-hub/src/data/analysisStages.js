/**
 * ═════════════════════════════════════════════════════════════════
 *  ANALYSIS CHECKLIST — 9-stage step-by-step workflow definition
 *
 *  Single source of truth used by BOTH:
 *    • /app/checklist  (AnalysisChecklist.jsx — the full page)
 *    • /app/dashboard  (Dashboard.jsx — the compact "Your Analysis Journey" card)
 *
 *  ⚠️ NEVER change existing item IDs — students will lose their ticks.
 *  Only ADD new items to the end of a stage, or ADD new stages.
 * ═════════════════════════════════════════════════════════════════
 */
export const STAGES = [
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
      { id: 's9-discussion',      text: 'For each finding, discuss: how does it compare with prior literature? (agree / disagree / new)' },
      { id: 's9-conclusions',     text: 'Write one clear conclusion per research objective' },
      { id: 's9-recommendations', text: 'Give recommendations in 3 buckets: theoretical, practical, policy' },
      { id: 's9-further',         text: 'Suggest areas for further study (based on your unexpected findings + limitations)' },
      { id: 's9-defence',         text: 'Anticipate likely defence questions: "Why this test?", "What if you\'d done X instead?", "How generalisable is this to Kenya more broadly?"' },
    ],
    links: [
      { label: '✨ Full Analysis + Chapter 4 + Chapter 5 — KES 35,000 (loyalty rate 30,000)', to: '/app/analysis' },
      { label: '📅 Book a defence-prep consultation — KES 2,000', to: '/app/consultations' },
      { label: '🎓 Ready to publish? See the Publishing Guide', to: '/app/publishing' },
    ],
  },
];

// Total items across all stages — used to compute % complete.
export const TOTAL_ITEMS = STAGES.reduce((sum, s) => sum + s.items.length, 0);

/**
 * Given a list of ticked item IDs, compute per-stage stats.
 * Returns [{ id, done, total, complete, percent }].
 */
export const computeStageStats = (tickedIds = []) => {
  const set = new Set(tickedIds);
  return STAGES.map((s) => {
    const done = s.items.filter((i) => set.has(i.id)).length;
    return {
      id: s.id,
      done,
      total: s.items.length,
      complete: done === s.items.length,
      inProgress: done > 0 && done < s.items.length,
      percent: Math.round((done / s.items.length) * 100),
    };
  });
};

/**
 * Overall progress across ALL stages.
 * Returns { done, total, percent, nextStage }.
 */
export const computeOverallProgress = (tickedIds = []) => {
  const set = new Set(tickedIds);
  const done = tickedIds.filter((id) =>
    STAGES.some((s) => s.items.some((i) => i.id === id))
  ).length;
  const percent = TOTAL_ITEMS === 0 ? 0 : Math.round((done / TOTAL_ITEMS) * 100);
  // Find the first stage that isn't 100% complete
  const nextStage = STAGES.find((s) => s.items.some((i) => !set.has(i.id))) || null;
  return { done, total: TOTAL_ITEMS, percent, nextStage };
};
