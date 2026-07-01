/**
 * T-Tests · Lesson 2 — Paired-Samples t-test
 * Comparing two related measurements from the same participants.
 */

export const PAIRED_TTEST_LESSON = {
  id: 'ttest-2',
  title: 'Paired-samples t-test',
  subtitle: 'Module 03 · Course: T-Tests · Lesson 2 of 3',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When the SAME people are measured twice',
      blocks: [
        { type: 'scene', body: [
          'You are doing your PhD at the University of Nairobi. You designed an 8-week financial literacy programme for 28 micro-entrepreneurs at Gikomba market. You measured each entrepreneur\'s record-keeping score (out of 50) BEFORE the programme started and AGAIN at the end. Before the training, the average score was 21.6. After the training, it was 32.9 — an 11.3-point jump.',
          'Looking at those means you want to declare victory. But your supervisor asks the obvious question: **is the 11.3-point improvement REAL, or could it have happened by chance?** And more importantly: this is the SAME 28 people measured twice — you can\'t use the regular (independent) t-test, because that one assumes the two sets of numbers come from DIFFERENT people.',
          'The correct test here is the **paired-samples t-test** (also called the dependent or repeated-measures t-test). It is built specifically for the situation where each participant appears in both conditions — before/after, pre/post, condition A/condition B. This lesson teaches you why it exists, how it differs from the independent t-test, how to run it, and how to write it up.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise** paired-data situations and choose this test instead of the independent t-test.',
            '**Explain** why paired tests work on DIFFERENCE scores and why this gives more statistical power.',
            '**Set up your dataset correctly** — two columns, one per measurement occasion, same person across rows.',
            '**Run** the test in SPSS via Analyze → Compare Means → Paired-Samples T Test.',
            '**Read** the three SPSS output tables (Paired Statistics, Paired Correlations, Paired Test).',
            '**Compute and report** Cohen\'s d for paired data (the formula differs slightly from the independent version).',
            '**Write up** the result in APA style with all the elements examiners expect.',
          ]},

        { type: 'why', body:
          'Paired designs are everywhere in postgraduate research — pre/post interventions, training-effect studies, treatment comparisons within the same patient, marketing A/B tests with the same respondents. Using the right test (paired vs independent) is the most common t-test error students make, and getting it right is non-negotiable for examiners.' },
      ],
    },

    /* ════════════════════ 2. BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — analyse the DIFFERENCE, not the two columns',
      blocks: [
        { type: 'heading', level: 2, text: 'A paired t-test is secretly a one-sample t-test on the differences' },

        { type: 'paragraph', text:
          'Here is the trick that makes paired t-tests so elegant. Instead of comparing the BEFORE column to the AFTER column as if they came from different people, SPSS computes a NEW column: the difference score for each person (After − Before). Then it asks one simple question: **is the average difference score significantly different from zero?**' },

        { type: 'illustration', component: 'PairedDifferenceLogic',
          caption: 'Figure 1. How the paired t-test really works. Left: 28 entrepreneurs, two columns (before and after training). Middle: SPSS computes a NEW column — the per-person difference (after − before). Right: SPSS tests whether the mean of this difference column is significantly different from zero. If it is, the intervention worked.' },

        { type: 'definition', term: 'Paired t-statistic',
          body: 'The mean of the difference scores divided by the standard error of those differences: **t = M_d ÷ (SD_d ÷ √n)**. Here M_d is the average per-person change, SD_d is how much that change varied across people, and n is the number of pairs. The test asks: is M_d far enough from zero, relative to its standard error, to be unlikely under chance?' },

        { type: 'analogy', title: 'The 28 personal scoreboards',
          body: 'Imagine each entrepreneur has a tiny scoreboard with two numbers — their before-score and their after-score. The paired t-test ignores the actual numbers and only looks at the GAP on each scoreboard (after − before). If almost every scoreboard shows a positive gap of similar size, the intervention clearly worked, even if some people started high and others started low. The independent t-test would have washed this out because it treats the before column and the after column as two separate clouds of points — losing the crucial per-person link.' },

        { type: 'callout', tone: 'gold', title: 'Why paired tests are more powerful',
          body: 'Because each participant acts as their own control, the paired t-test removes the variation between people. Two people might start at very different baselines (one at 15, one at 30) but both gain 10 points — the paired test sees the consistent 10-point gain and gets a strong signal. The independent t-test would have lumped the baselines and the post-scores together, and the between-person variation would have drowned out the 10-point effect. This is why a paired design needs a smaller sample to detect the same effect.' },

        { type: 'reveal',
          prompt: 'You have 28 entrepreneurs each measured before and after a programme. Average before = 21.6. Average after = 32.9. The MEAN of the per-person difference column is 11.3. What does the paired t-test really test?',
          answer: '**Whether 11.3 is significantly different from 0.** The paired t-test is mathematically a one-sample t-test asking "is the mean difference score different from zero?" If the mean of the difference column is, say, 11.3 with SD = 6.8 across the 28 people, SPSS computes t = 11.3 ÷ (6.8 ÷ √28) = 11.3 ÷ 1.285 = 8.79. With df = n − 1 = 27, that\'s p < .001 — strong evidence the average gain is not zero. The intervention worked.' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When the paired-samples t-test is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The three telltale designs' },

        { type: 'steps', steps: [
          { title: 'Before-and-after (pre-post) on the same people',
            body: 'You measure outcome Y on a sample, deliver an intervention, and measure Y again. The classic example: scores BEFORE training and scores AFTER training on the same participants. Two columns in your dataset, one row per participant.' },
          { title: 'Two conditions completed by the same people',
            body: 'You ask each participant to perform both Task A and Task B and you record their performance on each. Or each respondent rates both Product A and Product B. The pairing is "same person" across the two conditions.' },
          { title: 'Naturally matched pairs (twins, husband-wife, mother-child)',
            body: 'You haven\'t measured the same individual twice, but each Group 1 case is uniquely linked to a specific Group 2 case (e.g. each husband is paired with his own wife). The two scores share something — genetics, household environment, the same researcher — that creates dependence between them.' },
        ]},

        { type: 'comparison',
          headers: ['Situation', 'Pairing?', 'Right test'],
          rows: [
            ['28 entrepreneurs measured before AND after training', 'Yes — same person twice',  '**Paired-samples t-test (this lesson)**'],
            ['32 nurses in Level 5 vs 32 different nurses in Level 4', 'No — different people', 'Independent-samples t-test (Lesson 1)'],
            ['40 patients tested with both Drug A and Drug B (crossover)', 'Yes — same patient',  '**Paired-samples t-test**'],
            ['25 mother-child pairs comparing anxiety scores',         'Yes — naturally matched',  '**Paired-samples t-test**'],
            ['Same people measured at 3 time points',                   'Yes — but more than 2',  'Repeated-measures ANOVA (ANOVA Lesson 4)'],
            ['Same people, ordinal outcome (Likert difference)',        'Yes — but not normal',   'Wilcoxon signed-rank test'],
          ]},

        { type: 'callout', tone: 'warning', title: 'The dataset must be in WIDE format',
          body: 'For a paired t-test, your dataset must have **two columns** — one per condition (e.g. score_before, score_after) — and **one row per participant**. If your data is in LONG format (one column with all scores, another column flagging time = 1 or 2), you must first restructure to wide via Data → Restructure → Restructure selected cases into variables. Many beginners run the wrong test because their data is shaped wrong.' },
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running it in SPSS — the 5-step click path',
      blocks: [
        { type: 'heading', level: 2, text: 'From dataset to output in under a minute' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → Compare Means → Paired-Samples T Test.' },
          { title: 'Move the FIRST variable of the pair',
            body: 'Click your before/condition-A variable (e.g. **score_before**) and click the arrow → it appears under Pair 1 in the "Variable1" column.' },
          { title: 'Move the SECOND variable of the pair',
            body: 'Click your after/condition-B variable (e.g. **score_after**) → it appears under Pair 1 in the "Variable2" column. You should now see Pair 1 listed as **score_before — score_after**. You can add additional pairs on rows 2, 3, etc. if you need to compare several pre/post pairs.' },
          { title: 'Click Options (optional)',
            body: 'Leave Confidence Interval at 95%. Under Missing Values pick "Exclude cases analysis by analysis" (case is dropped only from pairs with a missing value). Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces three tables: **Paired Samples Statistics** (means and SDs per condition), **Paired Samples Correlations** (correlation between the two measurements), and **Paired Samples Test** (the t-test itself).' },
        ]},

        { type: 'illustration', component: 'PairedTTestDialog',
          caption: 'Figure 2. The Paired-Samples T Test dialog. The Paired Variables box shows the two-column layout. Drag your first variable into the Variable1 slot of Pair 1, then your second variable into Variable2. SPSS will compute the per-person difference (Variable1 − Variable2) and test whether its mean differs from zero.' },

        { type: 'callout', tone: 'warning', title: 'Direction matters: mean difference = Var1 − Var2',
          body: 'SPSS always computes the difference as **the first variable MINUS the second variable**. If you put score_before in Variable1 and score_after in Variable2, the mean difference will be NEGATIVE (because after > before in our example). Many students panic at a negative mean difference — it just means the second variable was higher. To avoid confusion, put the "later" or "experimental" condition as Variable1 — then a positive mean difference means improvement.' },
      ],
    },

    /* ════════════════════ 5. NO LEVENE — DIFFERENT ASSUMPTIONS ════════════════════ */
    {
      id: 'assumptions',
      title: 'Assumptions — and why there is NO Levene\'s test here',
      blocks: [
        { type: 'heading', level: 2, text: 'The three things to check' },

        { type: 'paragraph', text:
          'A common student question: "where is Levene\'s test in the paired t-test output?" Answer: there isn\'t one, and that\'s correct. Levene\'s tests whether two groups have equal variances — but in a paired test there is only ONE distribution that matters: the distribution of the difference scores. Homogeneity of variance is not a concept that applies here.' },

        { type: 'steps', steps: [
          { title: 'The PAIRS are independent of each other',
            body: 'Each pair (each participant\'s before/after combination) is independent of every other pair. The before-after pairing INSIDE a person is expected; the dependence BETWEEN people must be absent. This is almost always satisfied by sampling design.' },
          { title: 'The DIFFERENCE scores are approximately normally distributed',
            body: 'Compute the difference (Transform → Compute Variable → diff = score_after − score_before) and run Shapiro-Wilk on that new variable. If p > .05, normality is met. If p < .05 but n ≥ 30, the test is robust. If badly non-normal with small n, switch to **Wilcoxon signed-rank** (the non-parametric equivalent).' },
          { title: 'The outcome is CONTINUOUS (interval or ratio)',
            body: 'Test scores, weights, ratings, BP readings — all fine. For ordinal data (Likert items being treated rigorously) use Wilcoxon signed-rank.' },
        ]},

        { type: 'callout', tone: 'gold', title: 'You normality-test the DIFFERENCE, not the two columns',
          body: 'Beginners often run Shapiro-Wilk on score_before and score_after separately. That is not what the paired t-test requires. The single relevant distribution is the per-person DIFFERENCE column. Create it with Compute Variable, then test that. Each column can be wildly non-normal but the differences can still be normal (and vice versa).' },
      ],
    },

    /* ════════════════════ 6. READING OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the SPSS output — three tables',
      blocks: [
        { type: 'heading', level: 2, text: 'What each table tells you' },

        { type: 'illustration', component: 'PairedTTestOutput',
          caption: 'Figure 3. The three Paired-Samples output tables. Table 1 (Paired Samples Statistics): the descriptive means and SDs for each condition. Table 2 (Paired Samples Correlations): how strongly the two measurements correlate across people — high r means the test will be more powerful. Table 3 (Paired Samples Test): the actual t-test on the difference scores, including mean difference, SD of the differences, t, df, and Sig. (2-tailed).' },

        { type: 'heading', level: 3, text: 'Table 1 — Paired Samples Statistics' },

        { type: 'comparison',
          headers: ['Column', 'What it shows'],
          rows: [
            ['**Mean (per condition)**', 'The average for each of the two measurements (e.g. before = 21.6, after = 32.9). Both go in your write-up.'],
            ['**N**',                     'Number of valid PAIRS (cases with both values present).'],
            ['**Std. Deviation**',        'Spread of scores within each condition. Reported alongside the mean.'],
            ['Std. Error Mean',           'Precision of each mean estimate (mostly used internally).'],
          ]},

        { type: 'heading', level: 3, text: 'Table 2 — Paired Samples Correlations' },

        { type: 'paragraph', text:
          'This is a quick correlation between the two measurements. If r is large and positive (say r > 0.6), it confirms that people who scored high on Condition 1 also tended to score high on Condition 2 — exactly the pattern that gives the paired test its power advantage. A non-significant r doesn\'t invalidate the test; it just means the paired design didn\'t help much for this particular outcome.' },

        { type: 'heading', level: 3, text: 'Table 3 — Paired Samples Test' },

        { type: 'comparison',
          headers: ['Column', 'What it shows'],
          rows: [
            ['**Mean (of the differences)**', 'M_d — the average per-person difference. The headline number for your interpretation.'],
            ['**Std. Deviation (of the differences)**', 'SD_d — how much the differences varied across people. Smaller SD_d = stronger test.'],
            ['Std. Error Mean',               'SD_d ÷ √n — the standard error of the mean difference; denominator of t.'],
            ['**95% CI of the Difference (Lower / Upper)**', 'Plausible range for the true population mean difference. If it excludes 0, the result is significant.'],
            ['**t**',                          'The t-statistic = Mean ÷ Std. Error Mean.'],
            ['**df**',                         'Number of pairs minus 1 (n − 1). For 28 pairs, df = 27.'],
            ['**Sig. (2-tailed)**',           'The p-value. If < .05, the mean difference is significantly different from zero.'],
          ]},

        { type: 'reveal',
          prompt: 'Your Paired Samples Test row shows Mean = 11.30, SD = 6.80, t = 8.79, df = 27, Sig. (2-tailed) = .000, 95% CI [8.66, 13.94]. What do you report?',
          answer: '**A statistically significant increase from before to after.** On average, participants gained 11.30 points (SD = 6.80) on the record-keeping score after the 8-week programme; t(27) = 8.79, p < .001, 95% CI [8.66, 13.94]. The confidence interval does not include zero — strong evidence the gain is real, not chance. Next, compute Cohen\'s d for paired data: d = M_d / SD_d = 11.30 / 6.80 = 1.66 — a very large effect. The programme worked.' },
      ],
    },

    /* ════════════════════ 7. EFFECT SIZE ════════════════════ */
    {
      id: 'effect-size',
      title: 'Effect size for paired data',
      blocks: [
        { type: 'heading', level: 2, text: 'Cohen\'s d for paired samples' },

        { type: 'paragraph', text:
          'Cohen\'s d for paired data is computed differently from the independent version. Instead of dividing by a pooled SD of the two columns, you divide by the **standard deviation of the difference scores** — the very same SD_d that already appears in your Paired Samples Test table.' },

        { type: 'definition', term: 'Cohen\'s d (paired version)',
          body: '**d_z = M_d ÷ SD_d**, where M_d is the mean of the difference scores and SD_d is their standard deviation. (Sometimes written d_z to distinguish it from the independent-sample d.) Same Cohen benchmarks apply: **0.2 small, 0.5 medium, 0.8 large**.' },

        { type: 'workedExample', title: 'Computing Cohen\'s d from the Paired Test table',
          body: [
            { label: 'Read M_d and SD_d from the Paired Samples Test row',
              text: 'Mean = 11.30 (this is M_d). Std. Deviation = 6.80 (this is SD_d).' },
            { label: 'Compute',
              text: 'd = 11.30 ÷ 6.80 = **1.66**.' },
            { label: 'Interpret',
              text: 'd = 1.66 is far above Cohen\'s 0.8 large benchmark — a VERY LARGE effect. The average per-person improvement is more than 1.5 standard deviations of the change distribution.' },
            { label: 'Report in APA',
              text: '"t(27) = 8.79, p < .001, Cohen\'s d = 1.66 (very large effect)."' },
          ]},

        { type: 'callout', tone: 'gold', title: 'SPSS 27+ gives you d automatically',
          body: 'If you are on SPSS 27 or newer, look for the **Paired Samples Effect Sizes** table at the bottom of the output — it lists Cohen\'s d, Hedges\' correction, and 95% CI for the effect size. Use the value SPSS provides instead of hand-computing. If you\'re on an older version, the hand formula above gives the same number.' },
      ],
    },

    /* ════════════════════ 8. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — financial literacy at Gikomba',
      blocks: [
        { type: 'workedExample', title: 'A PhD study at the University of Nairobi',
          body: [
            { label: 'The research question',
              text: 'Did an 8-week financial literacy programme produce a significant improvement in record-keeping scores among micro-entrepreneurs?' },
            { label: 'The design',
              text: 'n = 28 entrepreneurs at Gikomba market. Each completed a record-keeping assessment (score out of 50) BEFORE the programme and AGAIN at the end. Paired (within-subjects) design.' },
            { label: 'Step 1 — Inspect descriptives',
              text: 'Before: M = 21.6, SD = 7.9. After: M = 32.9, SD = 8.4. Visually, scores went up by about 11 points on average.' },
            { label: 'Step 2 — Check the difference for normality',
              text: 'Transform → Compute Variable → diff = score_after − score_before. Analyze → Descriptives → Explore on diff → Shapiro-Wilk p = .31. NON-significant → differences are roughly normal → paired t-test is appropriate.' },
            { label: 'Step 3 — Run the paired t-test',
              text: 'Analyze → Compare Means → Paired-Samples T Test → score_after into Variable1, score_before into Variable2 → OK.' },
            { label: 'Step 4 — Read the output',
              text: 'Paired Samples Correlations: r = .72, p < .001 — strong positive correlation between pre and post (as expected). Paired Samples Test: Mean = 11.30, SD = 6.80, t(27) = 8.79, p < .001, 95% CI [8.66, 13.94].' },
            { label: 'Step 5 — Compute Cohen\'s d',
              text: 'd = 11.30 / 6.80 = 1.66 — very large effect.' },
            { label: 'Step 6 — APA write-up',
              text: '*"A paired-samples t-test was conducted to evaluate the effect of an 8-week financial literacy programme on record-keeping scores. Twenty-eight micro-entrepreneurs at Gikomba market completed the assessment before and after the programme. Mean scores increased from 21.6 (SD = 7.9) before the programme to 32.9 (SD = 8.4) after, a mean difference of 11.30 points (SD = 6.80). The increase was statistically significant; t(27) = 8.79, p < .001, 95% CI [8.66, 13.94], Cohen\'s d = 1.66, indicating a very large effect. The two measurements were strongly correlated (r = .72, p < .001), confirming that participants\' relative rankings were largely preserved across the programme. The findings provide robust evidence that the financial literacy programme produced a substantial improvement in entrepreneurs\' record-keeping practices."*' },
          ]},
      ],
    },

    /* ════════════════════ 9. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing the paired t-test up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A paired-samples t-test was conducted to compare [OUTCOME] [before vs. after / under condition A vs. condition B] in the same [n] participants. Mean [OUTCOME] [increased / decreased] from [M_before] (SD = [SD_before]) at [Time 1] to [M_after] (SD = [SD_after]) at [Time 2], a mean difference of [M_d] (SD = [SD_d]). The change was [statistically significant / not statistically significant]; t([df]) = [t-value], p = [p-value], 95% CI [[lower, upper]], Cohen\'s d = [d-value], indicating a [small / medium / large / very large] effect.' },

        { type: 'callout', tone: 'success', title: 'Seven things every paired t-test write-up must include',
          body: '**1.** The test name and what was compared. **2.** Number of pairs (participants). **3.** Both means and SDs (one per condition). **4.** The mean difference and its SD. **5.** t with degrees of freedom. **6.** The p-value and 95% CI of the difference. **7.** Cohen\'s d with verbal interpretation. Note: NO Levene\'s test is reported — that\'s for the independent-samples version only.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why a paired-samples t-test rather than an independent-samples t-test?',
              a: 'The same 28 entrepreneurs were measured twice — before the programme and after — so the two sets of scores are not independent. Each participant\'s after-score is intrinsically linked to their own before-score. An independent-samples t-test would have treated the two columns as if they came from different people, ignoring the within-participant correlation and substantially reducing statistical power. The paired-samples t-test correctly analyses the per-person difference scores, accounting for the dependence.' },
            { q: 'Did you check the assumption of normality?',
              a: 'Yes. In a paired-samples design the relevant distribution is the difference scores, not the two raw columns. A new variable was computed as (score_after − score_before) and tested with Shapiro-Wilk, which was non-significant (p = .31). The differences could be considered approximately normally distributed, satisfying the assumption.' },
            { q: 'Why report Cohen\'s d in addition to the p-value?',
              a: 'The p-value indicates the likelihood that the observed change arose by chance, but it does not quantify the magnitude of the change. Cohen\'s d standardises the mean difference into standard-deviation units, allowing the reader to assess practical importance. A d of 1.66 indicates that the average per-person gain is more than 1.5 standard deviations of the change distribution — a very large effect by Cohen\'s (1988) benchmarks.' },
          ]},
      ],
    },

    /* ════════════════════ 10. MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five common paired t-test mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Running an independent t-test on paired data',
          body: 'You have before and after scores from the same 28 entrepreneurs and you run an independent-samples t-test, treating before and after as two separate groups of 28. This wastes the pairing — the p-value will be larger and you may miss a real effect.',
          fix: 'Whenever the SAME participants appear in both conditions, use the **paired-samples t-test**. It works on the per-person differences and is substantially more powerful when pre and post scores are correlated.' },

        { type: 'mistake',
          title: 'Mistake 2 — Data in LONG format instead of WIDE',
          body: 'Your dataset has one column of scores and another column flagging time = 1 or 2. SPSS\'s paired-samples dialog expects two SEPARATE variables (one per condition), not one variable with a time indicator.',
          fix: 'Restructure first: Data → Restructure → Restructure selected cases into variables. Choose your time variable as the ID for the restructure. You\'ll end up with two columns (e.g. score.1 and score.2) — exactly what the paired-samples dialog needs.' },

        { type: 'mistake',
          title: 'Mistake 3 — Testing normality on the two columns instead of the difference',
          body: 'You run Shapiro-Wilk on score_before AND score_after, see one or both are non-normal, and switch to Wilcoxon. But the paired t-test only assumes the DIFFERENCES are normal — not the two raw columns.',
          fix: 'Compute the difference (Transform → Compute Variable → diff = after − before) and run Shapiro-Wilk on THAT. The two raw columns can be wildly non-normal and the differences still normal — only the differences matter for this test.' },

        { type: 'mistake',
          title: 'Mistake 4 — Confusion over the sign of the mean difference',
          body: 'You put score_before in Variable1 and score_after in Variable2. SPSS computes diff = before − after, so when after > before the mean difference is NEGATIVE. You then write that the programme caused a decrease — the opposite of reality.',
          fix: 'Always think about the direction. SPSS computes **Variable1 − Variable2**. If you want a positive number when post > pre, put the post-score as Variable1. Otherwise, just interpret the negative sign correctly in your write-up. Either way, check the means in Table 1 to confirm which condition was actually higher.' },

        { type: 'mistake',
          title: 'Mistake 5 — Quoting Levene\'s test for a paired t-test',
          body: 'You report "Levene\'s test was non-significant, p = .67" for a paired-samples t-test. There is no Levene\'s test in paired output — your reader will know you copied a sentence from an independent-samples write-up.',
          fix: 'The paired t-test does NOT have a homogeneity-of-variance assumption (there is only one relevant distribution — the differences). Replace the Levene\'s sentence with the normality check on the difference scores (Shapiro-Wilk on the computed diff variable).' },
      ],
    },

    /* ════════════════════ 11. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Paired-samples t-test compares two RELATED measurements from the SAME (or matched) participants on a continuous outcome.',
          'The test is mathematically a one-sample t-test on the per-person DIFFERENCE scores — asking whether their mean differs from zero.',
          'Use it for: pre/post designs, two conditions completed by the same people, naturally matched pairs.',
          'Dataset must be in WIDE format — two columns, one row per participant. Restructure long data first.',
          'Run via Analyze → Compare Means → Paired-Samples T Test → drag both variables into Pair 1 → OK.',
          'No Levene\'s test here. The only normality check is on the DIFFERENCE scores (compute, then Shapiro-Wilk).',
          'Report Mean (of differences) with SD, t(df), p, 95% CI of the difference, and Cohen\'s d (= M_d / SD_d).',
          'Effect-size benchmarks: 0.2 small, 0.5 medium, 0.8 large.',
          'Five mistakes to avoid: wrong test for paired data, long format, normality on raw columns, sign confusion, quoting Levene\'s.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 3: One-sample t-test** we cover the simplest t-test of all — comparing one sample\'s mean to a known fixed value (a population benchmark, a budget figure, an industry standard).' },

        { type: 'paragraph', text:
          'Before moving on, find a dataset with pre/post or two-condition measurements on the same people. Run the test, compute the difference and check its normality, compute Cohen\'s d, and write the APA paragraph. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 12. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'You measured 28 entrepreneurs\' record-keeping scores before and after a training programme. Which test compares the means?',
          choices: [
            'Independent-samples t-test',
            'Paired-samples t-test — the same people are measured twice, so the two columns are linked',
            'One-sample t-test',
            'Chi-square test',
          ],
          answer: 1,
          explanation: 'When the same participants appear in both conditions (before AND after), the two sets of scores are paired. The paired-samples t-test analyses the per-person difference scores, accounting for the within-person correlation. An independent-samples t-test would wrongly treat the two columns as coming from different people, wasting the design\'s extra power.' },

        { type: 'check',
          question: 'What does the paired t-test actually test?',
          choices: [
            'Whether two correlations are equal',
            'Whether the MEAN of the per-person DIFFERENCE scores is significantly different from zero',
            'Whether the variances of the two columns are equal (via Levene\'s)',
            'Whether both columns are normally distributed',
          ],
          answer: 1,
          explanation: 'Mathematically, the paired t-test is a one-sample t-test on a new variable: the per-person difference (Variable1 − Variable2). It asks whether the mean of those differences is significantly different from zero. If yes, there\'s a real change/difference between the two conditions.' },

        { type: 'check',
          question: 'Where is Levene\'s test in the paired-samples output?',
          choices: [
            'In the Paired Samples Correlations table',
            'It is not produced — Levene\'s only applies to the independent-samples t-test',
            'In the bottom row of the Paired Samples Test table',
            'In a separate Reliability table',
          ],
          answer: 1,
          explanation: 'Levene\'s tests whether two independent groups have equal variance. In a paired t-test the only distribution that matters is the difference scores — there is no homogeneity-of-variance assumption to check. SPSS correctly omits Levene\'s from the paired output. Quoting it in your write-up is a red flag.' },

        { type: 'check',
          question: 'Your paired test gives Mean (of differences) = 11.30, SD = 6.80, t(27) = 8.79, p < .001. How do you compute Cohen\'s d?',
          choices: [
            'd = t × √n = 8.79 × √28 = 46.5',
            'd = M_d / SD_d = 11.30 / 6.80 = 1.66 — a very large effect',
            'd = p / .05',
            'd = SD_d / M_d = 6.80 / 11.30 = 0.60',
          ],
          answer: 1,
          explanation: 'For paired data, Cohen\'s d is the mean of the differences divided by the SD of the differences (both already in the Paired Samples Test row). 11.30 / 6.80 = 1.66 — well above the 0.8 large benchmark, so a very large effect.' },

        { type: 'check',
          question: 'How should you check the normality assumption for a paired t-test?',
          choices: [
            'Run Shapiro-Wilk on the BEFORE column and the AFTER column separately',
            'Compute the per-person DIFFERENCE (after − before), then run Shapiro-Wilk on THAT new variable',
            'Use Levene\'s test',
            'Skip — normality doesn\'t apply to paired tests',
          ],
          answer: 1,
          explanation: 'The paired t-test only assumes the DIFFERENCE scores are approximately normally distributed — not the two raw columns. Create the difference variable via Transform → Compute Variable, then run Shapiro-Wilk on it. The two raw columns can each look non-normal and the differences still be perfectly normal (and vice versa).' },

        { type: 'check',
          question: 'Which sentence is the most professional paired t-test report?',
          choices: [
            '"The paired test was significant."',
            '"p < .001 so it worked."',
            '"A paired-samples t-test indicated that record-keeping scores increased significantly from before the programme (M = 21.6, SD = 7.9) to after (M = 32.9, SD = 8.4), a mean difference of 11.30 (SD = 6.80); t(27) = 8.79, p < .001, 95% CI [8.66, 13.94], Cohen\'s d = 1.66, a very large effect."',
            '"t = 8.79, very significant."',
          ],
          answer: 2,
          explanation: 'Option C hits every element examiners look for: names the test, gives both means and SDs, the mean difference and its SD, t with df, p, 95% CI, and Cohen\'s d with verbal interpretation. The other options are vague or missing critical numbers.' },
      ],
    },
  ],
};
