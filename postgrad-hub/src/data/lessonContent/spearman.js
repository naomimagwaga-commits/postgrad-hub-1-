/**
 * Correlation Analysis · Lesson 2 — Spearman rank correlation (and Kendall)
 * Non-parametric alternative to Pearson. Same teaching depth as Pearson lesson.
 */

export const SPEARMAN_LESSON = {
  id: 'cor-2',
  title: 'Spearman rank correlation',
  subtitle: 'Module 03 · Course: Correlation Analysis · Lesson 2 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When Pearson is wrong — meet its non-parametric cousin',
      blocks: [
        { type: 'scene', body: [
          'You went through Lesson 1 with confidence. You learned Pearson r — when to use it, how to run it, how to interpret it, how to defend it. You sat down to analyse your own dataset. You want to correlate two variables: pupils\' satisfaction with their teacher (rated on a 5-point Likert scale: 1 = very poor → 5 = excellent) and their end-of-term mathematics score.',
          'You open SPSS, click through to Bivariate Correlations, move both variables across — then pause. Wait. Is satisfaction CONTINUOUS? It is a 5-point Likert item, with numeric codes but the gaps between "Poor" and "Average" might not be the same as between "Good" and "Excellent". This is *ordinal* data. And you remember from Pearson Lesson 1: ordinal data violates Pearson\'s assumptions.',
          'You are right to pause. **Pearson is the wrong test here.** What you need is **Spearman\'s rho** — the non-parametric cousin of Pearson, designed specifically for ordinal data and for continuous data that violates normality. This lesson teaches you when to use Spearman, how it works, how to run it in SPSS, and the standard write-up — including a quick note on Kendall\'s tau, a related alternative.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Explain in plain English** how Spearman\'s rho differs from Pearson r — it works on RANKS, not raw values.',
            '**Recognise the three situations** where Spearman is the right tool (ordinal data, non-normal continuous data, outlier-rich continuous data).',
            '**Run Spearman in SPSS** in 30 seconds — same menu as Pearson, just tick a different box.',
            '**Read the output** and interpret rho (ρ) using the same benchmarks as Pearson r.',
            '**Decide between Spearman and Kendall** — they almost always agree; here\'s when each shines.',
            '**Write up Spearman results** following the APA template every examiner expects.',
            '**Defend your choice** of Spearman vs Pearson under examiner questioning.',
          ]},

        { type: 'why', body:
          'Every postgraduate questionnaire-based study has Likert items. Every supervisor will eventually ask whether Pearson is appropriate for them. The student who confidently switches to Spearman for ordinal items, explains WHY, and reports rho correctly looks methodologically mature. The student who runs Pearson on everything without thinking gets a red question mark in the margin.' },
      ],
    },

    /* ════════════════════ 1.5 WHAT/WHY/WHERE/WHEN — beginner-first primer ════════════════════ */
    {
      id: 'wwww',
      title: 'What / Why / Where / When — read THIS first',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'Spearman is the non-parametric alternative to Pearson — used when Pearson\'s assumptions fail. Before touching the SPSS dialog, understand: (1) What Spearman IS, (2) Why you would use it instead of Pearson, (3) Where a Kenyan postgraduate would use it, (4) When to CHOOSE it.',
            'If you can answer all 4 in one sentence each, you\'re ready for the walkthrough. If not, spend 3 minutes here.',
          ]},

        { type: 'illustration', component: 'MachakosSpearmanWWWW',
          caption: 'Figure 0. Spearman Rank Correlation WHAT/WHY/WHERE/WHEN reference card. The bottom banner gives the golden rule: run both Pearson and Spearman if unsure — if they agree, either is fine.' },

        { type: 'callout', tone: 'brand', title: 'Key terms you\'ll meet in the walkthrough',
          body: [
            '**ρ (rho)** — the Spearman rank correlation coefficient. Same -1 to +1 range as Pearson r. Machakos: Form ↔ Math_KCSE ρ = .284.',
            '**Rank** — the position of a value when sorted (1st, 2nd, 3rd...). Spearman correlates RANKS, not the original values.',
            '**Monotonic** — a relationship that consistently rises OR consistently falls, but not necessarily in a straight line.',
            '**Ordinal** — a variable with ordered categories where the spacing between categories may not be equal (Likert 1-5, Form 2/3/4).',
            '**Non-parametric** — doesn\'t assume any particular distribution (unlike Pearson which assumes normal-ish data).',
            '**Ties** — when two respondents have the same value. Spearman handles ties automatically with average ranks.',
          ]},
      ],
    },

    /* ════════════════════ 2. THE BIG IDEA — RANKS ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — Spearman works on ranks, not raw values',
      blocks: [
        { type: 'heading', level: 2, text: 'Convert to ranks first, then correlate' },

        { type: 'paragraph', text:
          'Pearson r looks at the raw values of your variables and asks: "do they move together along a straight line?" Spearman\'s rho does almost the same thing, but FIRST it converts each variable to **ranks**. The smallest value becomes rank 1, the next smallest becomes rank 2, all the way up to the largest. Spearman then computes a Pearson-like correlation on the ranks instead of the raw values.' },

        { type: 'illustration', component: 'SpearmanRanks',
          caption: 'Figure 1. The Spearman idea. On the LEFT: raw values for six pupils — study hours (X) and exam scores (Y). On the RIGHT: the same data converted to RANKS within each variable. Spearman correlates the rank columns, not the raw value columns. Notice how Hassan (raw: 18 hours, 58%) becomes rank 6 for hours but only rank 2 for exam — his pair of ranks breaks the otherwise tight pattern, which Spearman captures.' },

        { type: 'analogy', title: 'The race that doesn\'t care about times',
          body: 'Imagine a 100m race. Pearson is the timekeeper who records every runner\'s EXACT time — 11.42, 11.78, 12.01, 12.55 seconds. Spearman is the spectator who just records the FINISHING ORDER — 1st, 2nd, 3rd, 4th. Both methods tell you who won and roughly how the race went, but Spearman doesn\'t care whether the gap between 1st and 2nd was 0.36 seconds or 3.6 seconds — only that 1st came before 2nd. This is exactly the difference between continuous and ordinal data.' },

        { type: 'definition', term: 'Spearman\'s rho (ρ)',
          body: 'A non-parametric correlation coefficient, ranging from −1 to +1, that measures the strength and direction of the MONOTONIC relationship between two variables. "Monotonic" means: as one variable goes up, the other consistently goes up (or down) — but the relationship does not have to be a straight line. It can curve, as long as it keeps going one direction.' },

        { type: 'callout', tone: 'gold', title: 'The key difference, in one sentence',
          body: '**Pearson measures linear (straight-line) relationships on raw values. Spearman measures monotonic (always-increasing or always-decreasing) relationships on ranks.** That subtle difference is why Spearman is more flexible — it captures curved-but-consistent patterns that Pearson misses.' },

        { type: 'why', body:
          'Why does converting to ranks help? Because ranks discard outlier magnitude. If your highest income is 2,500,000 KSh and your second highest is 80,000 — Pearson treats the gap as huge (and gets pulled around by it). Spearman just sees rank 1 and rank 2 — the gap disappears. Ranks tame outliers and free you from the normality assumption.' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE SPEARMAN ════════════════════ */
    {
      id: 'when-to-use',
      title: 'Three situations where Spearman is right',
      blocks: [
        { type: 'heading', level: 2, text: 'The three classic use cases' },

        { type: 'paragraph', text:
          'Spearman is the right tool in three specific situations. Recognise any one of them in your own data and switch from Pearson to Spearman with confidence.' },

        { type: 'steps', steps: [
          { title: 'Situation 1 — At least one variable is ORDINAL',
            body: [
              'Variables like "Form 1, 2, 3, 4", "low / medium / high satisfaction", or individual Likert items (1-5 strongly disagree to strongly agree) are ordinal: the categories have a meaningful order, but the gaps between them are not guaranteed to be equal.',
              'Pearson assumes equal-interval data — that the distance between 1 and 2 is the same as between 4 and 5. Ordinal data violates this. Spearman, working on ranks, doesn\'t make this assumption.',
              '**Most common use case:** correlating Likert items with each other or with continuous variables. Almost every questionnaire-based thesis uses Spearman somewhere.',
            ]},
          { title: 'Situation 2 — Continuous data that violates NORMALITY',
            body: [
              'You have two continuous variables, but a Shapiro-Wilk test or visual inspection shows one of them is badly skewed or otherwise non-normal. Pearson is moderately robust to non-normality in large samples (n > 100), but for smaller samples normality violation can mislead.',
              'Switch to Spearman. The rank transformation removes the influence of non-normality.',
            ]},
          { title: 'Situation 3 — Continuous data with influential OUTLIERS',
            body: [
              'You inspected your scatter plot and noticed one or two extreme points that are dragging the relationship. With outliers, Pearson can give wildly different results depending on whether the outliers are included.',
              'Spearman is robust to outliers because ranks compress them. A point that is 5 SD above the mean becomes just "rank N" — the same as if it were 1 SD above. Outlier influence shrinks dramatically.',
              '**Tip:** report BOTH Pearson and Spearman in this case. If they agree, report Pearson and note the agreement. If they disagree, report Spearman and explain why.',
            ]},
        ]},

        { type: 'comparison',
          headers: ['Variable types', 'Recommended', 'Why'],
          rows: [
            ['Two continuous, both normal, no outliers',           'Pearson',     'Maximum statistical power; assumptions met.'],
            ['One ordinal + one continuous',                        'Spearman',    'Ordinal violates Pearson\'s interval assumption.'],
            ['Two ordinal variables (e.g. two Likert items)',       'Spearman',    'Both variables ordinal — Spearman is the standard.'],
            ['Two continuous, but one is badly skewed',             'Spearman',    'Rank transformation handles non-normality.'],
            ['Two continuous with influential outliers',            'Spearman (and Pearson as comparison)', 'Spearman is robust to outliers.'],
            ['One nominal variable (gender, county)',               'Neither — use chi-square or t-test', 'Correlation does not apply to unordered categorical data.'],
          ]},

        { type: 'reveal',
          prompt: 'You want to correlate "supervisor support" (a single Likert item, 1-5) with "monthly income" (a continuous variable in KSh, positively skewed). Which test?',
          answer: '**Spearman.** TWO of the three Spearman conditions apply here: (1) supervisor support is a single ordinal Likert item, and (2) income is positively skewed. Pearson would be inappropriate on two counts. Spearman handles both issues by working on ranks rather than raw values. Standard write-up: *"Spearman\'s rank correlation was computed to examine the association between supervisor support and monthly income, as supervisor support was measured on a single ordinal Likert item and income was positively skewed."*' },
      ],
    },

    /* ════════════════════ 4. RUNNING IT IN SPSS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running Spearman in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'Same dialog as Pearson, different checkbox' },

        { type: 'paragraph', text:
          'Spearman lives in the SAME menu as Pearson — Analyze → Correlate → Bivariate. The only difference is which checkbox you tick.' },

        { type: 'steps', steps: [
          { title: 'Open the Bivariate Correlations dialog',
            body: 'Analyze → Correlate → Bivariate.' },
          { title: 'Move your two (or more) variables into the Variables box',
            body: 'Click each variable on the left, then the blue arrow to move them across. You can include several at once for a Spearman correlation matrix.' },
          { title: 'Under "Correlation Coefficients", tick Spearman',
            body: 'Untick the Pearson box (or leave it ticked to get both side-by-side — useful for direct comparison).' },
          { title: 'Tick "Flag significant correlations"',
            body: 'Same as Pearson — gets you the * and ** flags in the output.' },
          { title: 'Click Options for descriptives and missing-data handling',
            body: 'Tick "Means and standard deviations" for context. For missing data, choose "Exclude cases pairwise" (each pair uses all available cases). Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces a correlation matrix labelled "Spearman\'s rho" in the Output Viewer. The format is almost identical to Pearson output — same cells, same asterisks, same N counts.' },
        ]},

        { type: 'callout', tone: 'info', title: 'Tip — request Pearson AND Spearman together',
          body: 'Tick BOTH the Pearson AND the Spearman boxes in one run. SPSS gives you two correlation matrices side by side, letting you directly compare them. If they agree closely, you have strong evidence the relationship is real regardless of statistical method. If they disagree substantially, the discrepancy itself is informative — usually pointing to outliers or non-normality that Pearson is sensitive to.' },
      ],
    },

    /* ════════════════════ 4.4 BEFORE YOU CLICK — UNDERSTAND YOUR VARIABLES ════════════════════ */
    {
      id: 'variables-first',
      title: 'Before you click ANYTHING — understand your variables',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'Choosing between Pearson and Spearman is one of the most common mistakes in postgraduate SPSS work. Students see "correlation" in their objectives and click whichever they saw first — usually Pearson, because it\'s more famous.',
            'But Pearson has strict assumptions. If your variables violate them, your correlation coefficient is misleading, your p-value is wrong, and your defence will fall apart when your examiner asks "why did you use Pearson here?"',
            'This section teaches you the ONE question to ask before every correlation — so you always pick the right test.',
          ]},

        { type: 'heading', level: 2, text: 'The ONE question to ask' },

        { type: 'callout', tone: 'brand', title: 'Look at your two variables. What TYPE is each one?',
          body: [
            '**Both variables are CONTINUOUS (Scale)?** → Use Pearson (previous lesson).',
            '**At least ONE variable is ORDINAL (Likert 1-5, Form 2/3/4, rank)?** → Use Spearman (this lesson).',
            '**Data is badly non-normal or has strong outliers?** → Use Spearman even if both variables are technically continuous.',
            '**Either variable is NOMINAL (Gender, County, Category)?** → Neither correlation works. Use Chi-square instead (later lesson).',
          ]},

        { type: 'heading', level: 2, text: 'Applied to the Machakos study' },

        { type: 'paragraph', text:
          'In the Pearson lesson we tested the 4 continuous IVs against the continuous DV — that was Pearson\'s natural home. In this Spearman lesson we\'ll test a variable that Pearson CAN\'T properly handle: `Form` (an ordinal variable with just 3 values: 2, 3, 4).' },

        { type: 'comparison',
          headers: ['Variable name', 'Real data example', 'Measurement type (SPSS icon)', 'Correlation choice'],
          rows: [
            ['**Form**',            '2 / 3 / 4',                       '📊 Ordinal (bar-chart icon)',    '⚠️ Ordinal — Pearson NOT valid → use **Spearman**'],
            ['**Math_KCSE_Mean**',  '5.92 / 6.4 / 7.1 …',              '📏 Scale (ruler icon)',          '✅ Continuous — either would work, but partner\'s type decides'],
            ['**Combining the two**', 'Form × Math_KCSE_Mean',         'Ordinal × Continuous',           '**→ Spearman** (whenever one side is ordinal, Spearman wins)'],
          ]},

        { type: 'callout', tone: 'info', title: 'Why Pearson would technically be WRONG here',
          body: [
            'Pearson assumes both variables are measured on an **interval or ratio scale** — meaning the "distance" between values is equal and meaningful (Age 20 → 21 is the same distance as Age 40 → 41).',
            'Form has only 3 values (2, 3, 4). Is the "distance" between Form 2 and Form 3 really equal to the distance between Form 3 and Form 4? In terms of biological age? Maybe. In terms of academic maturity, exam preparation, hormones? Almost certainly not.',
            'Because Form violates Pearson\'s interval assumption, Spearman is the honest choice. Your examiner will ask this question. Now you have the answer.',
          ]},

        { type: 'heading', level: 2, text: 'What variables will go into the SPSS dialog' },

        { type: 'comparison',
          headers: ['Machakos variable', 'Where does it go?', 'Why?'],
          rows: [
            ['**Form**',           'Variables: box (right side of dialog)', 'Ordinal → Spearman handles it correctly'],
            ['**Math_KCSE_Mean**', 'Variables: box (right side of dialog)', 'Continuous — Spearman also accepts continuous partners'],
            ['**Digital_Devices, Teacher_Competency, etc.**', '🚫 Skip for this run', 'Continuous — better tested with Pearson (previous lesson)'],
            ['**Gender, Category**', '🚫 Never for correlation',           'Nominal (labels, not orderable numbers) → use Chi-square instead'],
          ]},

        { type: 'callout', tone: 'brand', title: 'Locked in — 2 variables into the Spearman dialog',
          body: 'Form · Math_KCSE_Mean. Now we\'re ready to click.',
        },
      ],
    },

    /* ════════════════════ 4.5 THE MACHAKOS PROCEDURE ════════════════════ */
    {
      id: 'machakos-walkthrough',
      title: 'The Machakos procedure',
      blocks: [
        { type: 'callout', tone: 'brand', title: 'The Machakos objective we\'re answering',
          body: [
            'While the Pearson lesson tested Objectives 1-4 (continuous IVs), a real thesis often includes a supplementary question: **"Does academic progression (Form level) itself relate to Math performance?"**',
            'This isn\'t one of the 4 original objectives, but it\'s the kind of exploratory analysis examiners love to see. And it\'s the perfect Spearman test.',
            '**Hypothesis:** Higher-Form students have higher Mathematics KCSE mean scores. **Variables:** Form (ordinal 2/3/4) × Math_KCSE_Mean (continuous). **Test:** Spearman\'s rank-order correlation (rho).',
          ]},

        /* ─────── STEP 1 — menu path ─────── */
        { type: 'heading', level: 3, text: 'STEP 1 — Open the Bivariate Correlations dialog' },

        { type: 'paragraph', text:
          'Spearman lives in the SAME dialog as Pearson — just with a different checkbox. From the SPSS main menu:' },

        { type: 'callout', tone: 'brand', title: 'The click path',
          body: '**Analyze → Correlate → Bivariate…** (same as Pearson lesson)',
        },

        { type: 'illustration', component: 'MachakosPearsonMenuPath',
          caption: 'Figure 1. The SPSS menu path — identical to the one used for Pearson. Analyze → Correlate → Bivariate. (Reused from the Pearson lesson because the click path is the same.)' },

        /* ─────── STEP 2 — main dialog ─────── */
        { type: 'heading', level: 3, text: 'STEP 2 — Move Form and Math_KCSE_Mean into the Variables box' },

        { type: 'paragraph', text:
          'In the left-hand variable list, find `Form` (has the little 📊 bar-chart icon indicating ordinal) and `Math_KCSE_Mean` (has the 📏 ruler icon indicating continuous). Click `Form` first, then Ctrl-click `Math_KCSE_Mean`, then click the blue **▶** arrow to move both into the **Variables** box on the right.' },

        { type: 'paragraph', text:
          'CRITICAL setting change — under "Correlation Coefficients", **UNTICK Pearson and TICK Spearman**:' },

        { type: 'comparison',
          headers: ['Setting', 'What to select', 'Why'],
          rows: [
            ['**Correlation Coefficients**', '☐ Pearson (UNTICK it)  ☑ Spearman',
              'Pearson would be wrong for ordinal data — untick it. Spearman handles ranked data correctly.'],
            ['**Test of Significance**', '⚫ Two-tailed',
              'Two-tailed unless you have a specific one-directional hypothesis (rare in postgrad work).'],
            ['**Flag significant correlations**', '☑ (leave ticked)',
              'Adds * and ** to the output so you spot significant correlations quickly.'],
          ]},

        { type: 'illustration', component: 'MachakosSpearmanDialog',
          caption: 'Figure 2. The Bivariate Correlations dialog configured for Spearman. Form and Math_KCSE_Mean are in the Variables box on the right. Only the Spearman checkbox is ticked — Pearson and Kendall are unchecked.' },

        { type: 'callout', tone: 'info', title: 'Pro tip — you CAN tick both Pearson AND Spearman',
          body: [
            'If you want to compare both methods side by side, tick BOTH Pearson AND Spearman. SPSS produces both matrices in one output.',
            'When Pearson r and Spearman ρ closely agree, it means the relationship is robust — real. When they disagree substantially, the discrepancy tells you something (usually outliers or non-normality affecting Pearson).',
            'For strict thesis reporting, however, pick ONE test (the right one for your data) and report that. Reporting both can confuse examiners.',
          ]},

        /* ─────── STEP 3 — options ─────── */
        { type: 'heading', level: 3, text: 'STEP 3 — Options sub-dialog (same as Pearson)' },

        { type: 'paragraph', text:
          'Click **Options…** and use the same settings as the Pearson lesson:' },

        { type: 'callout', tone: 'brand', title: 'Options settings',
          body: [
            '☑ Means and standard deviations (adds context to the output)',
            '⚫ Exclude cases pairwise (safer than listwise — see the Pearson lesson for details)',
            'Click **Continue**.',
          ]},

        { type: 'illustration', component: 'MachakosPearsonOptions',
          caption: 'Figure 3. The Options sub-dialog — identical settings to the Pearson lesson. Means and standard deviations ticked, Exclude cases pairwise selected. (Reused image — the sub-dialog is the same for both Pearson and Spearman.)' },

        /* ─────── STEP 4 — output ─────── */
        { type: 'heading', level: 3, text: 'STEP 4 — Click OK and read the output' },

        { type: 'paragraph', text:
          'Click **OK**. The Output Viewer opens with your Spearman results. NOTICE — SPSS labels this differently from Pearson output:' },

        { type: 'illustration', component: 'MachakosSpearmanOutput',
          caption: 'Figure 4. The Spearman output. TOP: Descriptive Statistics — Form has N=212 (students only), Math_KCSE_Mean has N=274 (all respondents). BOTTOM: the Correlations matrix headed "Spearman\'s rho". Each cell shows Correlation Coefficient, Sig. (2-tailed), and N. The .284** in the Form × Math_KCSE_Mean cell means a small-to-moderate significant positive correlation.' },

        { type: 'callout', tone: 'gold', title: '3 visual differences from Pearson output',
          body: [
            '**Title says "Nonparametric Correlations"** (red heading) — not just "Correlations". This is SPSS\'s way of marking that this analysis doesn\'t assume normality.',
            '**Table sub-header says "Spearman\'s rho"** — not "Pearson Correlation".',
            '**Row label says "Correlation Coefficient"** — not "Pearson Correlation". Since Spearman uses ranks, SPSS uses the generic name.',
            'These differences matter when reporting — always call it ρ (rho) not r, and always cite "Spearman\'s rank-order correlation" in your write-up.',
          ]},

        /* ─────── STEP 5 — annotated cell ─────── */
        { type: 'heading', level: 3, text: 'STEP 5 — Read the correlation cell in detail' },

        { type: 'paragraph', text:
          'The critical cell in the matrix is where `Form` meets `Math_KCSE_Mean`. Here it is annotated:' },

        { type: 'illustration', component: 'MachakosSpearmanAnnotated',
          caption: 'Figure 5. The Form × Math_KCSE_Mean cell with four color-coded annotations. Gold = ρ = 0.284 explained (small-to-medium positive monotonic relationship). Red = the significance asterisks. Navy = Sig. (2-tailed) = .000 (i.e. p < .001). Green = N = 212 (only students had a Form value). Bottom: exact APA write-up template.' },

        /* ─────── STEP 6 — scatter check ─────── */
        { type: 'heading', level: 3, text: 'STEP 6 — Confirm with a scatter plot' },

        { type: 'paragraph', text:
          'A scatter plot of an ordinal variable looks unusual — the points STACK into vertical columns (one column per Form level). But that\'s the correct visualization, and it clearly shows the monotonic trend:' },

        { type: 'illustration', component: 'MachakosSpearmanScatter',
          caption: 'Figure 6. Scatter plot of Form vs Math_KCSE_Mean across 212 students. Points stack vertically at Form 2, 3, and 4 (because Form has only 3 discrete values). The gold trend line shows the positive monotonic pattern — Form 4 students tend to have slightly higher KCSE means than Form 2 students. Spearman\'s rho = .284 quantifies exactly this pattern.' },

        { type: 'callout', tone: 'gold', title: 'What "monotonic but not linear" means (and why it matters)',
          body: [
            '**Linear** = a straight-line pattern. When X increases by 1, Y increases by a constant amount.',
            '**Monotonic** = a consistently-going-up (or consistently-going-down) pattern, but the rate can change. When X increases by 1, Y might jump a lot or barely at all — but Y never REVERSES direction.',
            'For ordinal data (Form 2/3/4), we can\'t claim linearity because we can\'t assume "Form 2 to Form 3" is the same "distance" as "Form 3 to Form 4". But we CAN claim monotonicity — Form 4 students consistently score higher than Form 2 students on average.',
            'Spearman measures monotonic relationships. Pearson measures linear ones. That\'s why Spearman is the right choice here.',
          ]},

        /* ─────── STEP 7 — write-up ─────── */
        { type: 'heading', level: 3, text: 'STEP 7 — Write it up for Chapter 4' },

        { type: 'callout', tone: 'brand', title: 'APA Chapter-4 template for Spearman',
          body: [
            '_"A Spearman rank-order correlation was computed to assess the relationship between [IV name] and [DV name]. There was a [strength] [direction] correlation between the two variables, ρ(N-2) = [rho value to 2 dp], p [< .001 or exact value], N = [sample size]."_',
            '',
            '**Example for Form × Math_KCSE_Mean:** _"A Spearman rank-order correlation was computed to assess the relationship between student Form level and Mathematics KCSE mean score. There was a **small-to-moderate positive** correlation between the two variables, **ρ(210) = .28, p < .001, N = 212**."_',
            '',
            'Note: use the Greek letter **ρ** (rho), not r. Report N because it may differ from your total sample (as it does here — 212 students, not 274 total respondents).',
          ]},
      ],
    },

    /* ════════════════════ 5. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the Spearman output',
      blocks: [
        { type: 'heading', level: 2, text: 'Almost identical to the Pearson table' },

        { type: 'paragraph', text:
          'The Spearman correlation matrix looks structurally identical to the Pearson one. Each cell still has three numbers: the correlation coefficient (now called rho instead of r), the p-value, and the sample size. Diagonals are still 1.000. Asterisks still flag significance.' },

        { type: 'paragraph', text:
          'Use the SAME interpretation benchmarks as Pearson — Spearman\'s rho ranges from −1 to +1, with the same Cohen guidelines for strength:' },

        { type: 'comparison',
          headers: ['Absolute value of rho', 'Strength', 'Plain-English meaning'],
          rows: [
            ['|ρ| ≈ 0.10', 'Small / weak',     'A real but very faint monotonic link.'],
            ['|ρ| ≈ 0.30', 'Medium / moderate', 'A noticeable monotonic association.'],
            ['|ρ| ≈ 0.50', 'Large / strong',    'A strong monotonic relationship.'],
            ['|ρ| ≈ 0.70+', 'Very strong',      'The two variables track each other closely in rank order.'],
          ]},

        { type: 'heading', level: 3, text: 'Reading a single cell — example' },

        { type: 'paragraph', text:
          'A cell shows ρ = .42**, p = .003, N = 198. What does this mean?' },

        { type: 'list', items: [
          '**ρ = .42** — a moderate positive monotonic relationship. As one variable goes up in rank, the other tends to go up in rank too.',
          '**p = .003** (well below .05) — the relationship is statistically significant. Unlikely to be due to chance.',
          '**N = 198** — the relationship was computed on 198 pairs of values. Any cases with missing values for either variable in this pair were excluded.',
          '**Two asterisks (**)** — flags significance at the p < .01 level (stricter than p < .05).',
        ]},

        { type: 'reveal',
          prompt: 'You computed Pearson r = .18 (p = .08) and Spearman ρ = .39 (p = .003) on the same pair of variables, n = 120. How do you interpret the discrepancy?',
          answer: 'A substantial difference — Pearson says weak and non-significant, Spearman says moderate and significant. The most likely cause: **outliers or non-linearity** in your data. Pearson got dragged down by extreme values or a curved pattern; Spearman, working on ranks, captured the underlying monotonic relationship. Report Spearman as your primary result and explain: *"Pearson r was .18 (p = .08), but Spearman\'s ρ was .39 (p = .003). Inspection of the scatter plot revealed two influential outliers and a slightly curved pattern, both of which compromise Pearson\'s assumptions. Spearman, being robust to both, is reported as the more appropriate measure of association."*' },
      ],
    },

    /* ════════════════════ 6. KENDALL'S TAU ════════════════════ */
    {
      id: 'kendall',
      title: 'A quick word on Kendall\'s tau',
      blocks: [
        { type: 'heading', level: 2, text: 'The third option in the Bivariate dialog' },

        { type: 'paragraph', text:
          'You will have noticed a third checkbox in the Bivariate Correlations dialog: **Kendall\'s tau-b**. Like Spearman, Kendall is a non-parametric rank-based correlation. The two are close cousins, both designed for ordinal data and outlier robustness, but they compute the rank correlation slightly differently.' },

        { type: 'definition', term: 'Kendall\'s tau (τ)',
          body: 'A non-parametric correlation coefficient based on counting "concordant" pairs (where both variables move the same direction) versus "discordant" pairs (where they move opposite ways). Like Spearman, ranges from −1 to +1. Like Spearman, robust to outliers and non-normality. Unlike Spearman, tends to give smaller absolute values for the same underlying relationship.' },

        { type: 'comparison',
          headers: ['Feature', 'Spearman\'s rho (ρ)', 'Kendall\'s tau (τ)'],
          rows: [
            ['How it works', 'Pearson r computed on ranks', 'Counts concordant vs discordant pairs'],
            ['Typical magnitude', 'Closer to Pearson r',     'Usually SMALLER absolute value than Spearman'],
            ['How often reported in postgraduate research', 'Much more common (90%+ of cases)', 'Less common — used when ties are frequent or sample is small'],
            ['Sensitivity to TIES (equal values)', 'Slightly affected by ties', 'Handles ties more cleanly (tau-b version)'],
            ['When to prefer',  'Default choice for non-parametric correlation', 'When you have many tied ranks (e.g. a 5-point Likert × 5-point Likert with many same-pair responses)'],
          ]},

        { type: 'callout', tone: 'gold', title: 'The practical answer for thesis work',
          body: 'For almost every postgraduate thesis: **report Spearman**. It is the more widely recognised non-parametric correlation, easier for examiners to interpret, and closer in scale to Pearson r. Use Kendall only if (a) your supervisor specifically requests it, (b) you have many tied ranks (e.g. correlating two 3-point ordinal scales with hundreds of respondents), or (c) you want a second opinion as a robustness check. If you do report Kendall, expect it to be SMALLER than Spearman — that does not mean the relationship is weaker; it is just how Kendall calibrates.' },

        { type: 'why', body:
          'Spearman and Kendall almost always agree on direction and significance. They sometimes disagree on the exact magnitude. For your thesis, agreement matters far more than the second decimal place — pick one (usually Spearman), report it clearly, and move on.' },
      ],
    },

    /* ════════════════════ 7. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — Likert satisfaction and exam score',
      blocks: [
        { type: 'workedExample', title: 'A Master\'s study at Kenyatta University',
          body: [
            { label: 'The research question',
              text: 'A Master of Education student wants to know whether university students\' satisfaction with teaching (a single Likert item, 1 = very poor → 5 = excellent) is related to their end-of-term examination mark (out of 100). She suspects a positive relationship — more satisfied students put in more effort and score higher.' },
            { label: 'The data',
              text: 'She collects responses from **n = 156 undergraduate students** at three faculties. For each student she has two variables: **teach_sat** (a single 5-point Likert item) and **exam_mark** (end-of-term examination score out of 100).' },
            { label: 'Step 1 — Why Spearman, not Pearson',
              text: '**teach_sat is a single Likert item** — ordinal data, not strictly continuous. The intervals between "Very poor" and "Poor", or between "Good" and "Excellent", are not guaranteed to be equal. Pearson assumes equal-interval data; Spearman does not. Spearman is the appropriate test.' },
            { label: 'Step 2 — Visualise first',
              text: 'She creates a scatter plot of teach_sat (X) against exam_mark (Y). Because teach_sat has only 5 possible values, the points cluster in 5 vertical lines. The plot shows a generally upward trend with substantial scatter within each column — consistent with a positive but moderate relationship.' },
            { label: 'Step 3 — Run Spearman in SPSS',
              text: 'Analyze → Correlate → Bivariate → move both variables across → tick Spearman → tick "Flag significant correlations" → Options → tick Means and standard deviations → Continue → OK.' },
            { label: 'Step 4 — Read the output',
              text: 'The Correlations table shows **Spearman\'s rho = .31**, **Sig. (2-tailed) = .000** (which SPSS rounds — actual p < .001), **N = 156**. Flagged with two asterisks.' },
            { label: 'Step 5 — Interpret honestly',
              text: 'ρ = .31 is just above Cohen\'s medium benchmark (.30) — a small-to-moderate positive monotonic relationship. The relationship is highly statistically significant (p < .001) thanks to the reasonable sample size of 156. Students who rated teaching higher tended to score higher in exams, but the modest strength (ρ² = .10, about 10% shared variance) means many other factors influence exam scores too.' },
            { label: 'Step 6 — APA write-up',
              text: '*"A Spearman rank-order correlation was computed to assess the relationship between students\' satisfaction with teaching (measured on a 5-point Likert scale) and end-of-term examination scores. There was a small-to-moderate, statistically significant positive monotonic association between the two variables, ρ(154) = .31, p < .001. Although students who rated teaching higher tended to achieve higher exam scores, the modest strength of the association suggests that teaching satisfaction is one of several factors influencing examination performance."*' },
          ]},
      ],
    },

    /* ════════════════════ 8. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing Spearman results for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The APA template' },

        { type: 'apa', text:
          'A Spearman rank-order correlation was computed to assess the [linear/monotonic] relationship between [VARIABLE 1] and [VARIABLE 2] among [N] [type of respondent]. Spearman was selected because [reason — e.g. one variable was ordinal / data was non-normal / outliers were present]. There was a [strong/moderate/weak] [positive/negative] monotonic association between the two variables, **ρ([df]) = [.XX], p = [.XXX]**. [One-sentence plain-language interpretation tied to your research objective.]' },

        { type: 'heading', level: 3, text: 'A second worked example — comparing Pearson and Spearman' },

        { type: 'apa', text:
          'Both Pearson and Spearman correlations were computed between monthly household income (positively skewed, skewness = +1.4) and self-reported well-being (a continuous 50-point sum scale). Pearson r was .14 (p = .12), while Spearman\'s ρ was .31 (p < .001). The discrepancy reflects the strong positive skew of the income variable: the Pearson coefficient was diluted by a small number of very high incomes, whereas Spearman — working on ranks — was unaffected. Spearman is reported as the more appropriate measure of association for this pair of variables, ρ(196) = .31, p < .001.' },

        { type: 'callout', tone: 'success', title: 'Four things to include in every Spearman write-up',
          body: '**1.** The reason you chose Spearman over Pearson (one phrase). **2.** ρ value with df (df = N − 2). **3.** The exact p-value. **4.** A plain-language interpretation. Examiners scanning your Chapter 4 look for all four — having them makes the section feel polished.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why did you use Spearman instead of Pearson here?',
              a: 'The variable [X] was measured on a single 5-point Likert item, making it ordinal rather than strictly continuous. Pearson assumes equal-interval data; Spearman does not require this assumption. As best practice, I also ran Pearson as a robustness check; the two coefficients agreed in direction and significance, supporting the conclusion.' },
            { q: 'Did you check the assumptions before computing Spearman?',
              a: 'Spearman is non-parametric and has fewer assumptions than Pearson. Its main requirement is that the relationship is monotonic — that as one variable increases, the other consistently increases (or consistently decreases). I confirmed this visually using a scatter plot of the ranked variables; the pattern was consistently positive with no curvilinear reversal.' },
            { q: 'Why didn\'t you use Kendall\'s tau?',
              a: 'Spearman and Kendall are close cousins and almost always agree on direction and significance. Spearman is more widely reported in the published literature and easier for examiners to interpret because it is scaled similarly to Pearson r. I ran Kendall as a robustness check and obtained τ = [.XX], consistent with the Spearman ρ = [.XX], confirming the result is not artefactual.' },
          ]},
      ],
    },

    /* ════════════════════ 9. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common Spearman mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Running Pearson on Likert items because they "look" numeric',
          body: 'A 1-5 Likert item has numbers, so you assume Pearson works. But Likert items are ordinal — the gaps between "Disagree" and "Neutral" may not equal the gaps between "Agree" and "Strongly Agree". Pearson silently treats them as equal-interval and gives a slightly wrong answer.',
          fix: 'For SINGLE Likert items, use Spearman. For SUMMED multi-item Likert scales (e.g. the total of 10 satisfaction items), Pearson is acceptable because summation tends to produce something that behaves like continuous data. Always state your choice and the reason in Chapter 3.' },

        { type: 'mistake',
          title: 'Mistake 2 — Forgetting that Spearman captures monotonic, not just linear, relationships',
          body: 'You see a clearly U-shaped relationship in your scatter plot and dismiss it. You assume Spearman won\'t see it either — because you confused "monotonic" with "linear".',
          fix: 'A U-shape is NOT monotonic — the direction reverses at the bottom of the U. Spearman captures it about as poorly as Pearson. For genuinely curved or non-monotonic relationships, you need polynomial regression or variable transformation. Spearman\'s superpower is curved-but-monotonic patterns (e.g. an exponential growth) — not U-shapes.' },

        { type: 'mistake',
          title: 'Mistake 3 — Reporting Spearman as "Pearson"',
          body: 'In your Chapter 4 you write "Pearson r = .31" but you actually ran Spearman. The number is the same format, the cell looks the same — it is easy to confuse.',
          fix: 'Always use the correct symbol: **ρ (rho)** for Spearman, **r** for Pearson, **τ (tau)** for Kendall. Name the test explicitly in the sentence ("A Spearman rank-order correlation was computed…"). Examiners notice these details.' },

        { type: 'mistake',
          title: 'Mistake 4 — Not explaining WHY you chose Spearman',
          body: 'You run Spearman and report ρ = .31, p < .001 — but never explain to the reader why Spearman was the right choice over Pearson. The reader is left wondering.',
          fix: 'Always include the rationale in one phrase: "Spearman was chosen because the [variable] was measured on a single ordinal Likert item" or "because [variable] was positively skewed (skewness = +1.4)". One phrase = no follow-up reviewer question.' },
      ],
    },

    /* ════════════════════ 10. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Spearman\'s rho is a non-parametric correlation that works on RANKS rather than raw values, measuring monotonic (always-increasing or always-decreasing) relationships.',
          'Use Spearman in three situations: one or both variables are ORDINAL (Likert items, ranked categories); continuous data violates NORMALITY; continuous data has influential OUTLIERS.',
          'Run Spearman via Analyze → Correlate → Bivariate → tick Spearman (same menu as Pearson, different checkbox).',
          'Interpret rho using the same Cohen benchmarks as Pearson: ≥.10 small, ≥.30 medium, ≥.50 large.',
          'Read the same matrix output — diagonals = 1, off-diagonal cells show rho + p-value + N + significance asterisks.',
          'For thesis work, prefer Spearman over Kendall — both are non-parametric, but Spearman is more widely reported and scaled similarly to Pearson.',
          'When unsure between Pearson and Spearman, run BOTH side by side. Close agreement = methodology is robust. Disagreement = investigate (usually outliers or non-normality favouring Spearman).',
          'Write up Spearman using the standard APA template: state Spearman, give the reason for choosing it, report ρ(df) = X, p = X, and a plain-language interpretation.',
          'Avoid the four mistakes — Pearson on single Likert items, confusing monotonic with linear, mislabelling rho as r, omitting the rationale.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 3: Partial correlation** we tackle the situation where you suspect a THIRD variable is contaminating your X-Y relationship. Partial correlation lets you statistically remove that third variable\'s influence and see the "pure" association between the two you care about. Then **Lesson 4** closes the Correlation Analysis course with a deep walkthrough of how to read and present full correlation matrices.' },

        { type: 'paragraph', text:
          'Before moving on, find a pair of variables in your own dataset where Spearman is the right choice (any Likert item correlated with another variable will do). Run it. Compare to Pearson on the same pair. Note whether they agree. Write the APA-style sentence including the rationale. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'How does Spearman\'s rho differ mathematically from Pearson r?',
          choices: [
            'Spearman uses the same formula but with bigger numbers',
            'Spearman converts each variable to RANKS first, then computes a Pearson-like correlation on the ranks',
            'Spearman ignores half the data',
            'Spearman is the same as Pearson — different name only',
          ],
          answer: 1,
          explanation: 'Spearman ranks each variable (smallest = 1, next = 2, …, largest = N), then runs the Pearson formula on the ranks instead of the raw values. This rank transformation makes Spearman robust to outliers and non-normality — extreme values just become "rank N" instead of pulling the calculation around.' },

        { type: 'check',
          question: 'In which situation is Spearman the RIGHT choice over Pearson?',
          choices: [
            'Two perfectly normal continuous variables',
            'A 5-point Likert satisfaction item correlated with monthly income (which is positively skewed)',
            'Two nominal variables like gender and county',
            'Two binary yes/no variables',
          ],
          answer: 1,
          explanation: 'Two reasons here: (1) the Likert item is ordinal (Pearson assumes equal-interval) and (2) income is positively skewed (Pearson assumes approximate normality). Spearman handles both issues by working on ranks. For option C (two nominal) you need chi-square; for option D (two binary) you need phi or chi-square — correlation is not appropriate for either.' },

        { type: 'check',
          question: 'You computed Pearson r = .18 (p = .09) and Spearman ρ = .38 (p = .002) on the same data. What is the most likely explanation?',
          choices: [
            'SPSS made an error',
            'Your data has outliers or non-linearity that Pearson is sensitive to; Spearman, working on ranks, captures the underlying monotonic relationship more accurately',
            'The two tests should never disagree',
            'You need more participants',
          ],
          answer: 1,
          explanation: 'A substantial disagreement between Pearson and Spearman almost always signals outliers, non-normality, or a curved-but-monotonic pattern. Pearson gets dragged around by these; Spearman, using ranks, is robust. When this happens, report Spearman as the primary measure and explain the discrepancy in one sentence — examiners reward this kind of methodological awareness.' },

        { type: 'check',
          question: 'Your scatter plot shows a clear U-shape between two continuous variables. Will Spearman handle this well?',
          choices: [
            'Yes — Spearman handles any pattern',
            'No — Spearman captures monotonic relationships (consistently up OR consistently down), not curves that reverse direction. A U-shape is non-monotonic.',
            'Yes, as long as both variables are ordinal',
            'No — switch to chi-square',
          ],
          answer: 1,
          explanation: 'Spearman captures monotonic relationships — patterns that go consistently in one direction (always up or always down, even if curved). A U-shape REVERSES direction at the bottom, so it is NOT monotonic. Spearman will report a value near zero just like Pearson. For genuine U-shapes, use polynomial regression or variable transformation. Spearman\'s superpower is curved-but-still-going-one-way patterns, not curves that turn around.' },

        { type: 'check',
          question: 'Which symbol is correct for Spearman\'s rank correlation?',
          choices: ['r', 'ρ (rho)', 'τ (tau)', 'R²'],
          answer: 1,
          explanation: 'Spearman is **ρ (rho)**. Pearson is **r**. Kendall is **τ (tau)**. R² (capital R squared) is the coefficient of determination from regression. Always use the correct Greek symbol in your write-up — examiners notice these details.' },

        { type: 'check',
          question: 'Which write-up is most professional?',
          choices: [
            '"r was significant."',
            '"Spearman was big."',
            '"A Spearman rank-order correlation was computed because [variable X] was measured on a single ordinal Likert item. There was a moderate positive monotonic association, ρ(154) = .31, p < .001."',
            '"There was a relationship."',
          ],
          answer: 2,
          explanation: 'Option C hits all the elements examiners look for: names the test (Spearman), states the rationale (ordinal Likert item), reports ρ with df, gives the exact p-value, and provides a plain-language interpretation. The other options are either vague, use the wrong symbol, or omit the rationale.' },
      ],
    },
  ],
};
