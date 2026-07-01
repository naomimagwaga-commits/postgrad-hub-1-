/**
 * Non-parametric · Lesson 4 — Friedman Test
 * The non-parametric alternative to the repeated-measures ANOVA.
 */

export const FRIEDMAN_LESSON = {
  id: 'np-4',
  title: 'Friedman test',
  subtitle: 'Module 03 · Course: Non-parametric tests · Lesson 4 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'Same people, 3+ time points, non-normal',
      blocks: [
        { type: 'scene', body: [
          'You are doing a Master\'s study at Mount Kenya University on glycaemic control among 32 type-2 diabetic patients enrolled in a six-month community health-worker (CHW) education programme in Murang\'a county. You measured each patient\'s HbA1c level at THREE time points: BASELINE (before the programme), at the end of MONTH 3, and at the end of MONTH 6.',
          'Median HbA1c at baseline was 8.4%, at month 3 was 7.8%, and at month 6 was 7.2%. Looking at the medians, glycaemic control improved across the six months — but you cannot trust the eyeball. You need a statistical test.',
          'Your first instinct is **repeated-measures ANOVA** — same patients, 3 time points, continuous outcome. But when you compute the differences between time points and run Shapiro-Wilk, p = .008 — non-normal differences. Worse, two patients showed dramatic improvements (HbA1c dropped from 11.2 → 6.8 and 10.4 → 6.2) while most improved modestly. With n = 32 and clearly non-normal change scores, repeated-measures ANOVA is questionable.',
          'You need a test that does the same job as repeated-measures ANOVA — compare three or more related measurements on the same people — but **without** requiring normality. That test is the **Friedman test**. It works on the RANKS of each patient\'s values across time points, so the dramatic improvers don\'t distort the analysis.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise** when Friedman is the right replacement for a repeated-measures ANOVA.',
            '**Explain** how within-subject ranking removes the normality assumption.',
            '**Set up your data correctly** — wide format, one row per participant, one column per time point.',
            '**Run** the test in SPSS via Analyze → Nonparametric Tests → Legacy Dialogs → K Related Samples.',
            '**Read** the Ranks and Test Statistics tables, including the Friedman χ² statistic.',
            '**Follow up** with pairwise Wilcoxon signed-rank comparisons WITH Bonferroni correction.',
            '**Compute and report** Kendall\'s W as the standard effect size.',
            '**Write up** the result in APA style with all the elements your reviewer will look for.',
          ]},

        { type: 'why', body:
          'Pre/mid/post intervention designs, longitudinal cohort studies, and any "same patients across 3+ time points" set-up will eventually run into non-normal change scores. Friedman is the non-parametric backup that completes your toolkit — and it\'s the last lesson in this non-parametric course.' },
      ],
    },

    /* ════════════════════ 2. BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — rank WITHIN each person',
      blocks: [
        { type: 'heading', level: 2, text: 'Within-row ranking is the trick' },

        { type: 'paragraph', text:
          'Mann-Whitney and Kruskal-Wallis pool all cases and rank everyone together. Friedman does something different: it ranks each PARTICIPANT\'S OWN values across the time points. For each row (patient) in your dataset, Friedman replaces the k values (e.g. baseline, month 3, month 6) with their ranks 1, 2, 3 within that row. Then it sums the ranks within each time-point column and asks: are the column rank-sums different from what we\'d expect if all time points were equivalent?' },

        { type: 'illustration', component: 'FriedmanRanks',
          caption: 'Figure 1. How Friedman works. (1) Take each patient\'s row of HbA1c values across the three time points. (2) Rank those three values from smallest (1) to largest (3) WITHIN THAT ROW. (3) Repeat for every patient. (4) Sum the ranks down each time-point column. (5) If the intervention worked, baseline ranks should mostly be 3 (highest) and month-6 ranks should mostly be 1 (lowest) — producing very different column rank-sums. (6) If no intervention effect, the columns should all sum to roughly the same value.' },

        { type: 'definition', term: 'Friedman χ² statistic',
          body: 'A measure of how unevenly the within-row ranks are distributed across the k time-point columns. Computed as **χ²_F = [12 / (n·k(k+1))] × Σ R_j² − 3n(k+1)**, where R_j is the sum of ranks in column j, n is the number of participants, and k is the number of time points. Compared to a chi-square distribution with k − 1 degrees of freedom. A large χ²_F means time points produce systematically different ranks within participants.' },

        { type: 'analogy', title: 'Three goats per farm at the agricultural show',
          body: 'Imagine 32 farmers each bringing their THREE BEST goats to the Murang\'a County Agricultural Show. A judge ranks each farmer\'s three goats from 1 (best) to 3 (worst) — but the judge only looks INSIDE each farmer\'s flock, never across farmers. After all 32 farmers are done, you ask: did the "first goat brought" (or some other systematic position) consistently rank best? Or worst? Friedman is exactly that within-farmer ranking. It avoids comparing farmer A\'s elite goats to farmer B\'s ordinary ones — because each farmer is their own reference.' },

        { type: 'reveal',
          prompt: 'One of your patients has identical HbA1c at baseline AND month 3 (both = 8.2%). How does Friedman handle ties WITHIN a row?',
          answer: '**The tied values share the average of their would-be ranks.** If a patient\'s three values are 8.2 (baseline), 8.2 (month 3), and 7.0 (month 6), then within that row month 6 gets rank 1 (lowest), and the two 8.2 values share ranks 2 and 3 — each getting the average (2.5). The patient is NOT dropped; their row still contributes to the analysis. This is different from Wilcoxon, where ties at zero (no change in the difference) are dropped. Friedman keeps everyone in unless their entire row is missing.' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When Friedman is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The three telltale signs' },

        { type: 'steps', steps: [
          { title: 'Your design is REPEATED-MEASURES (within-subjects)',
            body: 'The SAME participants are measured at 3+ time points OR across 3+ conditions. Examples: baseline / mid-trial / end-trial; condition A / condition B / condition C completed by the same people. Each row in your dataset has 3+ related measurements.' },
          { title: 'Your outcome is at least ORDINAL',
            body: 'Continuous (HbA1c, weight, BP), ordinal Likert items, scores out of X, counts. The test works on within-row ranks, so any rankable outcome is fair game.' },
          { title: 'You CANNOT defend a repeated-measures ANOVA',
            body: 'Either (a) the difference scores between time points fail Shapiro-Wilk (especially with small samples), (b) the outcome is genuinely ordinal, (c) extreme outliers are present, or (d) Mauchly\'s sphericity test fails AND the Greenhouse-Geisser correction doesn\'t bring things into line.' },
        ]},

        { type: 'comparison',
          headers: ['Situation', 'Sample & normality', 'Right test'],
          rows: [
            ['HbA1c at 3 time points, large n, normal differences',     'n ≥ 30, Shapiro p > .05',   'Repeated-measures ANOVA (anova-4)'],
            ['HbA1c at 3 time points, n = 32, non-normal differences',   'n = 32, Shapiro p < .01',   '**Friedman test (this lesson)**'],
            ['Likert satisfaction at 3 service stages',                  'Ordinal',                    '**Friedman test**'],
            ['Same patients rating 4 different drugs',                   '4 conditions, paired',       '**Friedman test**'],
            ['3 different groups compared (independent)',                'independent',                'Kruskal-Wallis (Lesson 3)'],
            ['Same patients before AND after (2 time points)',           '2 paired conditions',        'Wilcoxon signed-rank (Lesson 2)'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Dataset must be in WIDE format',
          body: 'Just like the repeated-measures ANOVA, Friedman needs your data in WIDE format — one row per participant, one column per time point (e.g. hba1c_baseline, hba1c_month3, hba1c_month6). If your data is in LONG format, restructure first via Data → Restructure → Restructure selected cases into variables.' },
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running Friedman in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'The 5-step click path' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → Nonparametric Tests → Legacy Dialogs → K Related Samples.' },
          { title: 'Move all your repeated-measurement variables into Test Variables',
            body: 'Drag each time-point variable into the Test Variables box. For our example: **hba1c_baseline**, **hba1c_month3**, **hba1c_month6**. The order matters for the Ranks table but not for the test itself.' },
          { title: 'Tick "Friedman" under Test Type',
            body: 'It\'s the default. (Kendall\'s W and Cochran\'s Q are alternative tests for specific situations.)' },
          { title: 'Click Statistics (optional)',
            body: 'Tick "Descriptive" and "Quartiles" to get medians and IQRs for each time point — saves you a separate Explore run.' },
          { title: 'Click OK',
            body: 'SPSS produces three tables: **Ranks** (mean rank for each time point), **Test Statistics** (N, Chi-Square, df, Asymp. Sig.), and optionally Descriptives/Quartiles.' },
        ]},

        { type: 'illustration', component: 'FriedmanDialog',
          caption: 'Figure 2. The K Related Samples dialog. Drag every repeated-measurement variable into the Test Variables box (one for each time point or condition). Make sure Friedman is ticked under Test Type. Click Statistics → tick Descriptive and Quartiles to get medians and IQRs for free.' },
      ],
    },

    /* ════════════════════ 5. READING OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the SPSS output',
      blocks: [
        { type: 'heading', level: 2, text: 'The tables and the χ²_F statistic' },

        { type: 'illustration', component: 'FriedmanOutput',
          caption: 'Figure 3. The Friedman output. The Ranks table shows the mean rank for each time-point column (computed across all participants\' within-row rankings). The Test Statistics table reports N, Chi-Square (the Friedman χ²_F), df = k − 1, and Asymp. Sig. The mean rank progression (e.g. 2.81 → 2.06 → 1.13) indicates the direction of change.' },

        { type: 'heading', level: 3, text: 'Table 1 — Ranks' },

        { type: 'comparison',
          headers: ['Column', 'What it shows'],
          rows: [
            ['Time-point label', 'The variable names (e.g. hba1c_baseline, hba1c_month3, hba1c_month6).'],
            ['**Mean Rank**',     'Average within-row rank for each time point. A higher mean rank = that time point tended to have the highest values within participants. A clear progression from high to low rank across time = systematic change.'],
          ]},

        { type: 'heading', level: 3, text: 'Table 2 — Test Statistics' },

        { type: 'comparison',
          headers: ['Row', 'What it shows'],
          rows: [
            ['**N**',              'Number of complete rows analysed (participants with all k measurements present). Participants with any missing time point are dropped.'],
            ['**Chi-Square (χ²_F)**', 'The Friedman test statistic. SPSS labels it "Chi-Square" because χ²_F follows a chi-square distribution.'],
            ['**df**',              'Degrees of freedom = k − 1 (where k = number of time points). For 3 time points, df = 2.'],
            ['**Asymp. Sig.**',     'The p-value. If < .05, at least one time point differs from at least one other.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Listwise deletion — missing data drops the whole row',
          body: 'Friedman requires COMPLETE cases. If a patient is missing even one time-point measurement, SPSS drops their entire row from the analysis (listwise deletion). Check the N in the Test Statistics table — it should match the number of complete cases. If N is much smaller than your total sample, you may need to address the missing data before relying on the result.' },

        { type: 'reveal',
          prompt: 'Your output shows: N = 32, Chi-Square = 38.94, df = 2, Asymp. Sig. = .000. Mean ranks: baseline = 2.81, month 3 = 2.06, month 6 = 1.13. What do you conclude?',
          answer: '**HbA1c changed significantly across the three time points, with a clear downward progression (improvement in glycaemic control).** χ²_F(2) = 38.94, p < .001 — highly significant. The mean-rank progression (2.81 → 2.06 → 1.13) shows that within each patient, baseline tended to have the highest HbA1c, and month 6 the lowest — exactly the intervention pattern. But Friedman alone cannot tell you WHICH pairs of time points differ significantly. Next step: pairwise Wilcoxon signed-rank comparisons with Bonferroni correction (3 pairs → multiply each p by 3).' },
      ],
    },

    /* ════════════════════ 6. POST-HOC ════════════════════ */
    {
      id: 'post-hoc',
      title: 'Post-hoc — pairwise Wilcoxon with Bonferroni',
      blocks: [
        { type: 'heading', level: 2, text: 'Identifying which time-point pairs differ' },

        { type: 'paragraph', text:
          'When your Friedman is significant, the standard follow-up is **pairwise Wilcoxon signed-rank tests** for every combination of two time points, with **Bonferroni correction** to control the family-wise error rate. This is the within-subjects analog of the Kruskal-Wallis → pairwise-Mann-Whitney workflow you learned in Lesson 3.' },

        { type: 'steps', steps: [
          { title: 'Identify all pairwise combinations',
            body: 'For k time points, the number of pairs is k × (k − 1) / 2. For 3 time points: 3 pairs (baseline vs month3, baseline vs month6, month3 vs month6). For 4 time points: 6 pairs. For 5: 10.' },
          { title: 'Run a Wilcoxon signed-rank test for each pair',
            body: 'Analyze → Nonparametric Tests → Legacy Dialogs → 2 Related Samples → drag the two relevant variables into Pair 1 → Wilcoxon ticked → OK. Repeat for every pair. Record each Z and p-value.' },
          { title: 'Apply Bonferroni correction',
            body: 'Multiply each pairwise p-value by the number of pairs. A pair is significant only if its corrected p < .05.' },
          { title: 'Use the modern dialog for automatic adjustment',
            body: 'If you run Friedman through Analyze → Nonparametric Tests → Related Samples (the MODERN dialog), you can double-click the output → "Pairwise Comparisons" — SPSS does the pairwise Wilcoxons and Bonferroni adjustment automatically. Strongly recommended.' },
        ]},

        { type: 'comparison',
          headers: ['Pair', 'Raw Wilcoxon p', 'Bonferroni-corrected p', 'Significant?'],
          rows: [
            ['Baseline vs Month 3', '.003',  '.003 × 3 = .009', 'YES'],
            ['Baseline vs Month 6', '.0001', '.0001 × 3 = .0003', 'YES'],
            ['Month 3 vs Month 6',  '.012',  '.012 × 3 = .036', 'YES'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Report every pairwise comparison',
          body: 'Just like for Kruskal-Wallis, list every pairwise comparison (significant or not) with its corrected p-value in your write-up. Example: "Pairwise Wilcoxon comparisons (Bonferroni-corrected) confirmed significant reductions from baseline to month 3 (p = .009), from baseline to month 6 (p < .001), and from month 3 to month 6 (p = .036). The improvement was therefore both immediate (by month 3) and continued."' },
      ],
    },

    /* ════════════════════ 7. EFFECT SIZE ════════════════════ */
    {
      id: 'effect-size',
      title: 'Effect size — Kendall\'s W',
      blocks: [
        { type: 'definition', term: 'Kendall\'s W (coefficient of concordance)',
          body: '**W = χ²_F ÷ (n × (k − 1))**, where χ²_F is the Friedman statistic, n is the number of participants (with complete data), and k is the number of time points. Ranges from 0 (no agreement / no effect) to 1 (perfect agreement / maximum effect). Cohen-style benchmarks: **W ≈ .10 small, W ≈ .30 medium, W ≈ .50 large**.' },

        { type: 'workedExample', title: 'Computing Kendall\'s W for the HbA1c example',
          body: [
            { label: 'Read χ²_F, n, k from output',
              text: 'χ²_F = 38.94 (the "Chi-Square" value). n = 32 complete cases. k = 3 time points.' },
            { label: 'Compute',
              text: 'W = 38.94 / (32 × (3 − 1)) = 38.94 / 64 = **0.609**.' },
            { label: 'Interpret',
              text: 'W = 0.61 is well above the .50 large-effect benchmark. The within-participant ranking shows strong, consistent change across time points — the CHW intervention produced a substantial reduction in HbA1c, not just a statistically significant one.' },
            { label: 'Report in APA',
              text: '"χ²_F(2) = 38.94, p < .001, Kendall\'s W = .61, indicating a large effect."' },
          ]},

        { type: 'callout', tone: 'gold', title: 'For pairwise post-hoc effect sizes',
          body: 'Each pairwise Wilcoxon comparison should also report its own effect size r = |Z| / √N (as in Lesson 2). Report Kendall\'s W for the overall test AND r for each significant pairwise comparison. Together they give a complete magnitude picture.' },
      ],
    },

    /* ════════════════════ 8. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — HbA1c across 6 months of a CHW programme',
      blocks: [
        { type: 'workedExample', title: 'A Master\'s study at Mount Kenya University',
          body: [
            { label: 'The research question',
              text: 'Does a six-month community health-worker education programme produce significant improvements in glycaemic control (HbA1c) among type-2 diabetic patients in Murang\'a county?' },
            { label: 'The design',
              text: 'n = 32 type-2 diabetic patients. HbA1c measured at THREE time points: baseline (T0), month 3 (T1), and month 6 (T2). Within-subjects (repeated measures) design.' },
            { label: 'Step 1 — Inspect descriptives and check normality',
              text: 'Baseline: Mdn = 8.4%, IQR = 7.8-9.6. Month 3: Mdn = 7.8%, IQR = 7.2-8.5. Month 6: Mdn = 7.2%, IQR = 6.8-7.9. Compute differences (T1−T0, T2−T1, T2−T0) and run Shapiro-Wilk: p = .008 (non-normal differences, driven by two dramatic improvers). Decision: repeated-measures ANOVA not defensible → use Friedman.' },
            { label: 'Step 2 — Run Friedman',
              text: 'Analyze → Nonparametric Tests → Legacy Dialogs → K Related Samples → drag hba1c_baseline, hba1c_month3, hba1c_month6 into Test Variables → Friedman ticked → Statistics → tick Descriptive and Quartiles → OK.' },
            { label: 'Step 3 — Read the Ranks table',
              text: 'Baseline: Mean Rank = 2.81. Month 3: Mean Rank = 2.06. Month 6: Mean Rank = 1.13. Clear downward progression — within each patient, baseline tended to rank highest, month 6 lowest.' },
            { label: 'Step 4 — Read the Test Statistics',
              text: 'N = 32. Chi-Square (χ²_F) = 38.94. df = 2. Asymp. Sig. = .000.' },
            { label: 'Step 5 — Pairwise Wilcoxon with Bonferroni',
              text: 'Baseline vs Month 3: Z = −3.18, p_raw = .003, p_Bonf = .009 (significant). Baseline vs Month 6: Z = −4.42, p_raw = .0001, p_Bonf < .001 (significant). Month 3 vs Month 6: Z = −2.51, p_raw = .012, p_Bonf = .036 (significant). All three pairwise comparisons significant.' },
            { label: 'Step 6 — Compute Kendall\'s W',
              text: 'W = 38.94 / (32 × 2) = 38.94 / 64 = 0.609. Large effect.' },
            { label: 'Step 7 — APA write-up',
              text: '*"A Friedman test was conducted to examine changes in HbA1c across baseline, month 3, and month 6 of a six-month community health-worker education programme delivered to 32 type-2 diabetic patients in Murang\'a county. The non-parametric test was chosen because the differences between time points were not normally distributed (Shapiro-Wilk p = .008). Median HbA1c declined from 8.4% (IQR = 7.8-9.6) at baseline to 7.8% (IQR = 7.2-8.5) at month 3 and 7.2% (IQR = 6.8-7.9) at month 6. The omnibus test was statistically significant, χ²_F(2) = 38.94, p < .001, Kendall\'s W = .61, indicating a large effect of time. Pairwise Wilcoxon signed-rank comparisons (Bonferroni-corrected) confirmed significant reductions from baseline to month 3 (Z = −3.18, p = .009), from baseline to month 6 (Z = −4.42, p < .001), and from month 3 to month 6 (Z = −2.51, p = .036). The findings indicate that the CHW education programme produced substantial and continuing improvements in glycaemic control over six months."*' },
          ]},
      ],
    },

    /* ════════════════════ 9. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing Friedman up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A Friedman test was conducted to compare [OUTCOME] across [k] [time points / conditions] in [n] [participants description]. The non-parametric test was chosen because [the difference scores between time points were not normally distributed / the outcome was ordinal]. Median [OUTCOME] was [Mdn₁] (IQR = [Q1-Q3]) at [T1], [Mdn₂] (IQR = [Q1-Q3]) at [T2], and [Mdn₃] (IQR = [Q1-Q3]) at [T3]. The omnibus test was [significant / not significant], χ²_F([df]) = [value], p = [value], Kendall\'s W = [value], indicating a [small / medium / large] effect. Pairwise Wilcoxon signed-rank comparisons (Bonferroni-corrected) revealed [list each pair with corrected p-values].' },

        { type: 'callout', tone: 'success', title: 'Seven things every Friedman write-up must include',
          body: '**1.** The test name. **2.** Why non-parametric (the assumption violation on the differences). **3.** N (complete cases) and the number of time points. **4.** MEDIAN and IQR at each time point. **5.** χ²_F, df, and p. **6.** Kendall\'s W as the effect size. **7.** Pairwise Wilcoxon signed-rank follow-up with Bonferroni-corrected p-values (if χ²_F was significant).' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why a Friedman test rather than a repeated-measures ANOVA?',
              a: 'The per-person difference scores between consecutive time points were not normally distributed (Shapiro-Wilk p = .008), driven by two patients who showed dramatic improvements and others who improved modestly. With n = 32 and clearly non-normal change distributions, the repeated-measures ANOVA\'s normality assumption could not be defended. Friedman is the standard non-parametric equivalent — it works on the within-participant ranks across time points rather than the raw values, is robust to outliers, and free of the normality assumption.' },
            { q: 'Why Bonferroni-corrected Wilcoxon for the post-hoc instead of paired t-tests?',
              a: 'Pairwise comparisons within a non-parametric framework should themselves be non-parametric — using paired t-tests as the post-hoc would reintroduce the normality assumption I had specifically rejected for the omnibus test. Wilcoxon signed-rank is the non-parametric equivalent of the paired t-test and is the natural post-hoc test for a significant Friedman. Bonferroni correction (multiplying each pairwise p by the number of comparisons) controls the family-wise Type I error rate at the conventional .05 level.' },
            { q: 'Why Kendall\'s W as the effect size?',
              a: 'Kendall\'s W is the rank-based analog of partial η² for repeated-measures designs. It expresses the proportion of maximum possible rank-agreement across time points — equivalently, the consistency with which participants\' values change in the same direction across measurements. It ranges from 0 (no systematic change) to 1 (perfect monotonic change). Cohen-style benchmarks (.10 small, .30 medium, .50 large) apply, allowing the reader to judge practical importance alongside statistical significance.' },
          ]},
      ],
    },

    /* ════════════════════ 10. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five common Friedman mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Using Kruskal-Wallis on repeated measurements',
          body: 'You measured the same patients at three time points and ran Kruskal-Wallis. The test assumes the three samples are independent; your data is paired across time points within each patient.',
          fix: 'When the same participants appear at all time points, use the **Friedman test** (this lesson). Kruskal-Wallis is for independent groups only.' },

        { type: 'mistake',
          title: 'Mistake 2 — Skipping post-hoc when χ²_F is significant',
          body: 'You report "χ²_F(2) = 38.94, p < .001 — significant change over time" and stop. The reader has no idea whether the change was immediate (baseline → month 3) or only by the end (baseline → month 6), or whether month 3 → month 6 added anything.',
          fix: 'Always follow up a significant Friedman with **pairwise Wilcoxon signed-rank tests (Bonferroni-corrected)** for every time-point pair. Report each with its corrected p-value.' },

        { type: 'mistake',
          title: 'Mistake 3 — Pairwise paired t-tests as the post-hoc',
          body: 'You use paired t-tests for the pairwise follow-up after a significant Friedman. You\'ve reintroduced the normality assumption you rejected for the overall test, which is inconsistent.',
          fix: 'Stay within the non-parametric framework. Use **Wilcoxon signed-rank** for each pairwise comparison, then Bonferroni-correct.' },

        { type: 'mistake',
          title: 'Mistake 4 — Reporting means and SDs',
          body: 'You ran Friedman because the change scores were non-normal, then in Chapter 4 you wrote "HbA1c dropped from M = 8.6, SD = 1.4 to M = 7.4, SD = 1.1..." Means and SDs are exactly what the non-parametric framework avoids.',
          fix: 'Report MEDIAN and IQR at each time point. Means and SDs belong with the parametric repeated-measures ANOVA.' },

        { type: 'mistake',
          title: 'Mistake 5 — Ignoring missing data and listwise deletion',
          body: 'Your total sample is 50 but the Friedman output shows N = 32. You report 50 as your sample size. SPSS dropped 18 patients with at least one missing measurement, and you didn\'t notice or report it.',
          fix: 'Always check the N in the Test Statistics table. If it\'s much smaller than your total sample, report BOTH numbers ("Of the 50 enrolled patients, 32 had complete data across all three time points and were included in the Friedman analysis") and address the missing data in your limitations.' },
      ],
    },

    /* ════════════════════ 11. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Friedman is the non-parametric alternative to repeated-measures ANOVA — for comparing 3+ RELATED measurements on the same participants when normality fails or the outcome is ordinal.',
          'It works on WITHIN-ROW ranks — for each participant, the k values are ranked 1, 2, …, k. Then column rank sums are compared.',
          'Use when: same participants across 3+ time points or conditions, ordinal-or-worse outcome, non-normal differences with smallish samples, extreme outliers.',
          'Dataset must be in WIDE format (one row per participant, one column per time point).',
          'Run via Analyze → Nonparametric Tests → Legacy Dialogs → K Related Samples → drag all repeated variables into Test Variables → Friedman ticked → Statistics tick Descriptive/Quartiles → OK.',
          'Listwise deletion — participants with any missing time point are dropped. Always report the analysis N.',
          'Report MEDIAN and IQR at each time point (NOT mean ± SD).',
          'A significant χ²_F tells you SOMETHING differs; pairwise WILCOXON signed-rank comparisons (Bonferroni-corrected) tell you WHICH time-point pairs differ.',
          'Effect size: Kendall\'s W = χ²_F / (n × (k − 1)). Benchmarks: .10 small, .30 medium, .50 large.',
          'Five mistakes to avoid: using Kruskal-Wallis on paired data, skipping post-hoc, paired t-tests as post-hoc, mean ± SD reporting, ignoring listwise-deletion N.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Course complete — Non-parametric tests',
          body: 'You\'ve now finished the **Non-parametric tests** course — Mann-Whitney (2 independent groups), Wilcoxon signed-rank (2 paired conditions), Kruskal-Wallis (3+ independent groups), and Friedman (3+ paired/repeated conditions). Together with the parametric tests in the T-Tests and ANOVA courses, you now have a complete toolkit for two-condition and many-condition comparisons under any combination of design and assumption violations.' },

        { type: 'paragraph', text:
          'Before moving on, find a dataset with 3+ repeated measurements on the same people and non-normal change scores. Run Friedman, report medians + IQRs, follow up with Bonferroni-adjusted Wilcoxon pairs, compute Kendall\'s W, and write the APA paragraph. Then come back for the final knowledge check.' },
      ],
    },

    /* ════════════════════ 12. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'When is Friedman the right test instead of a repeated-measures ANOVA?',
          choices: [
            'Always — non-parametric is safer',
            'When the SAME participants are measured at 3+ time points (or under 3+ conditions) AND the per-person difference scores are non-normal, the outcome is ordinal, or extreme outliers are present',
            'When you have 3+ independent groups',
            'When sphericity is met',
          ],
          answer: 1,
          explanation: 'Friedman is the non-parametric equivalent of repeated-measures ANOVA. Use it when (a) data is repeated/paired across 3+ measurements AND (b) the difference scores fail normality, OR the outcome is ordinal, OR there are extreme outliers. With independent groups use Kruskal-Wallis; with only 2 paired conditions use Wilcoxon signed-rank.' },

        { type: 'check',
          question: 'How does Friedman differ from Kruskal-Wallis in its ranking?',
          choices: [
            'They are identical',
            'Kruskal-Wallis pools all cases and ranks across the whole sample; Friedman ranks WITHIN each participant\'s row across the time-point columns (within-row ranking)',
            'Friedman uses raw values instead of ranks',
            'Friedman requires normal data',
          ],
          answer: 1,
          explanation: 'Kruskal-Wallis pools all cases from all independent groups and ranks them together. Friedman ranks WITHIN each row across the k time-point columns — each participant\'s k values become ranks 1, 2, …, k. The within-row approach removes between-participant differences (analogous to how repeated-measures ANOVA removes them) and is the source of Friedman\'s power advantage for paired data.' },

        { type: 'check',
          question: 'Your Friedman returns χ²_F(2) = 38.94, p < .001. What should you do next?',
          choices: [
            'Stop — significance is enough',
            'Run pairwise WILCOXON signed-rank comparisons with Bonferroni correction (NOT paired t-tests) to identify which time-point pairs differ',
            'Switch to repeated-measures ANOVA',
            'Use independent-samples t-tests on the time-point pairs',
          ],
          answer: 1,
          explanation: 'A significant Friedman tells you SOMETHING changes across time, but not which specific time-point pairs differ. The standard post-hoc is pairwise WILCOXON signed-rank tests (within the non-parametric framework) with Bonferroni correction. Using paired t-tests as the post-hoc would reintroduce the normality assumption you just rejected for the omnibus test — that\'s inconsistent.' },

        { type: 'check',
          question: 'Your output: χ²_F = 38.94, n = 32, k = 3. What is Kendall\'s W?',
          choices: [
            'W = n × k = 96',
            'W = χ²_F / (n × (k − 1)) = 38.94 / (32 × 2) = 38.94 / 64 = 0.609 — a large effect',
            'W = χ²_F / n = 1.22',
            'W = (k − 1) / χ²_F = 0.051',
          ],
          answer: 1,
          explanation: 'Kendall\'s W = χ²_F / (n × (k − 1)). Here 38.94 / (32 × 2) = 38.94 / 64 = 0.609. Cohen-style benchmarks: .10 small, .30 medium, .50 large. W = 0.61 is well above the .50 large boundary — the within-participant rank agreement is strong, indicating substantial systematic change across time points.' },

        { type: 'check',
          question: 'Your total study sample is 50 patients but the Friedman output shows N = 32. What does this mean?',
          choices: [
            'A bug in SPSS',
            'Friedman uses listwise deletion — 18 patients were dropped because they were missing at least one time-point measurement. You should report both the total sample (50) and the analysed N (32)',
            'Only 32 patients gave consent',
            'Friedman caps the sample at 32',
          ],
          answer: 1,
          explanation: 'Friedman requires COMPLETE cases — a participant with any missing time-point value is dropped entirely from the analysis (listwise deletion). The N in the Test Statistics table shows how many complete cases were used. If much smaller than the total sample, report both numbers and address the missing data in your limitations section.' },

        { type: 'check',
          question: 'You measured 30 patients\' pain at baseline and again 4 weeks later (2 time points, paired). Friedman?',
          choices: [
            'Yes — Friedman handles any number of related measurements',
            'No — with EXACTLY 2 related measurements use the WILCOXON SIGNED-RANK test (Lesson 2). Friedman is for 3 or more',
            'Yes, but only with the Greenhouse-Geisser correction',
            'No — use a paired t-test',
          ],
          answer: 1,
          explanation: 'Friedman generalises to k = 2, but with exactly two related measurements the standard non-parametric test is the Wilcoxon signed-rank test (Lesson 2). Reserve Friedman for 3 or more related measurements. Both would give equivalent results with k = 2, but reviewers expect Wilcoxon for two-condition paired designs and Friedman for three-plus.' },
      ],
    },
  ],
};
