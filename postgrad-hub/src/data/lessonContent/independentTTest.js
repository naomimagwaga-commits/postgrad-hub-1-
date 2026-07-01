/**
 * T-Tests · Lesson 1 — Independent-Samples t-test
 * Comparing the means of two independent groups on one continuous outcome.
 */

export const INDEPENDENT_TTEST_LESSON = {
  id: 'ttest-1',
  title: 'Independent-samples t-test',
  subtitle: 'Module 03 · Course: T-Tests · Lesson 1 of 3',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'Comparing two different groups of people',
      blocks: [
        { type: 'scene', body: [
          'You are doing a Master\'s study at Kenyatta University on workplace stress. You collected the Perceived Stress Scale (PSS-10) from 64 nurses working in two hospitals — 32 from a busy Level 5 referral hospital in Nairobi and 32 from a quieter Level 4 county hospital in Kiambu. The Level 5 nurses scored an average of 22.4 on the PSS-10. The Level 4 nurses scored an average of 18.1.',
          'Looking at those numbers your instinct says, "the referral nurses are more stressed". But your supervisor will ask, **is the 4.3-point gap REAL, or could it just be random sampling noise?** If you sampled 32 different nurses from each hospital tomorrow, would you get the same gap, or might it disappear?',
          'That single question — "is the difference between these two group means bigger than chance would predict?" — is exactly what an **independent-samples t-test** answers. It is one of the three most-used tests in postgraduate research. This lesson will turn it from a mysterious dialog box into something you understand, run confidently, and write up in APA style without hesitation.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise** the moment in your data when an independent-samples t-test is the right choice.',
            '**Explain** what the t-statistic actually represents — the signal-to-noise ratio of a mean difference.',
            '**Run** the test in SPSS via Analyze → Compare Means → Independent-Samples T Test.',
            '**Check Levene\'s test** and pick the correct row of the SPSS output (equal vs. unequal variances).',
            '**Compute and report Cohen\'s d** — the effect size every examiner now expects.',
            '**Write up** the result in the APA template, including the assumption check.',
            '**Spot and avoid** the five mistakes beginners make with t-tests.',
          ]},

        { type: 'why', body:
          'The independent-samples t-test is the workhorse comparison test. Every thesis that compares two groups on a continuous outcome — men vs. women, treatment vs. control, urban vs. rural, public vs. private — uses it. Master it once and you have the skill for life.' },
      ],
    },

    /* ════════════════════ 2. BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — signal divided by noise',
      blocks: [
        { type: 'heading', level: 2, text: 'What the t-statistic really is' },

        { type: 'paragraph', text:
          'The t-statistic is not a magical number SPSS conjures up. It is a simple ratio you could compute on paper if you had to. The numerator is the difference between the two group means — the SIGNAL you want to detect. The denominator is the standard error of that difference — the NOISE you would expect from random sampling. Divide signal by noise and you get t.' },

        { type: 'illustration', component: 'TTestLogic',
          caption: 'Figure 1. The t-test as signal-to-noise ratio. Top: two group means with a small gap and noisy spread inside each group → tiny signal, large noise → small t → likely just chance. Bottom: same gap but tight spread inside each group → same signal, small noise → large t → real difference. The t-test asks: is the gap between means big RELATIVE to the natural variation within groups?' },

        { type: 'definition', term: 't-statistic',
          body: 'The number of standard errors that separate the two group means: **t = (M₁ − M₂) ÷ SE_diff**. A t near 0 means the two means are essentially identical (relative to noise); a large |t| (say ≥ 2) means the means are far apart relative to the noise we would expect by chance. SPSS converts t into a p-value using the t-distribution and the degrees of freedom.' },

        { type: 'analogy', title: 'Two M-Pesa queues at lunchtime',
          body: 'Imagine two M-Pesa queues outside a Tuskys supermarket — one at the Westlands branch and one at the Karen branch. You time how long each customer waits. The two AVERAGE wait times are 4 minutes (Westlands) and 5 minutes (Karen). Is Karen really slower? It depends on how MUCH the individual wait times bounce around. If everyone in each queue is within a few seconds of the average, a 1-minute gap is huge — that\'s a real difference (large t). But if waits at both branches swing wildly between 1 minute and 12 minutes, a 1-minute gap could easily be random luck (tiny t).' },

        { type: 'reveal',
          prompt: 'You compute t = 0.4 on a sample comparing two groups. What does that tell you?',
          answer: '**The group means are essentially indistinguishable relative to the noise.** A t-value of 0.4 means the gap between means is less than half a standard error wide — far inside the range of normal sampling fluctuation. SPSS will return a non-significant p-value (typically > .60). You would conclude there is **no statistically detectable difference between the groups** on this outcome. Reporting language: "No statistically significant difference was found, t(df) = 0.4, p = .69."' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When the independent-samples t-test is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The five conditions' },

        { type: 'steps', steps: [
          { title: 'You have EXACTLY TWO independent groups',
            body: 'Your grouping (independent) variable is categorical with exactly two levels — e.g. male/female, public/private, treatment/control. With 3+ groups use one-way ANOVA instead. With paired or matched data use the paired-samples t-test (Lesson 2).' },
          { title: 'The two groups are INDEPENDENT of each other',
            body: 'Each participant belongs to ONE group only. No participant\'s score in Group 1 is linked to a participant\'s score in Group 2. If the same people were measured twice (before/after), or if each Group 1 person is paired with a specific Group 2 person, you need the paired-samples t-test.' },
          { title: 'Your outcome variable is CONTINUOUS',
            body: 'Y must be Scale (test score, weight, BMI, stress score, income). For ordinal outcomes use the Mann-Whitney U test (the non-parametric equivalent). For binary outcomes use chi-square.' },
          { title: 'Outcome is APPROXIMATELY NORMAL within each group',
            body: 'Check with Shapiro-Wilk per group, or with a histogram and Q-Q plot. The t-test is reasonably robust to mild non-normality when n is at least 25-30 per group. For badly skewed data with small samples, switch to Mann-Whitney U.' },
          { title: 'HOMOGENEITY OF VARIANCE (checked with Levene\'s)',
            body: 'The spread of Y should be roughly similar in the two groups. SPSS runs Levene\'s test automatically. If Levene\'s is significant, you read the "Equal variances NOT assumed" row instead of the standard row. This is a 30-second fix, not a deal-breaker.' },
        ]},

        { type: 'comparison',
          headers: ['Situation', 'Groups', 'Outcome', 'Right test'],
          rows: [
            ['Male vs. female stress scores',           '2 independent', 'Continuous', '**Independent-samples t-test (this lesson)**'],
            ['Before vs. after training on same staff', '2 paired',      'Continuous', 'Paired-samples t-test (Lesson 2)'],
            ['Sample mean vs. a known population mean', '1 vs. constant','Continuous', 'One-sample t-test (Lesson 3)'],
            ['Three teaching methods on the same exam', '3+ independent','Continuous', 'One-way ANOVA'],
            ['Male vs. female on a Likert item (1-5)',   '2 independent', 'Ordinal',    'Mann-Whitney U'],
            ['Pass/fail by gender',                     '2 independent', 'Binary',     'Chi-square test'],
          ]},
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running it in SPSS — the 7-step click path',
      blocks: [
        { type: 'heading', level: 2, text: 'From dataset to output in under a minute' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → Compare Means → Independent-Samples T Test.' },
          { title: 'Move your outcome to Test Variable(s)',
            body: 'The continuous variable you want to compare. E.g. drag **stress_score** to the Test Variable(s) box. You can put more than one outcome here — SPSS will run a separate t-test for each.' },
          { title: 'Move your grouping variable to Grouping Variable',
            body: 'The categorical variable with two levels. E.g. **hospital_level** (1 = Level 5, 2 = Level 4). It will appear as **hospital_level(? ?)** — those question marks are the next problem to fix.' },
          { title: 'Click Define Groups',
            body: 'Type the two codes that identify your groups. Group 1: **1** (Level 5). Group 2: **2** (Level 4). Click Continue. The grouping variable should now read **hospital_level(1 2)**.' },
          { title: 'Click Options (optional but recommended)',
            body: 'Leave Confidence Interval at 95% (the standard). Under "Missing Values" pick Exclude cases analysis by analysis. Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces two tables: **Group Statistics** (means, SDs, sample sizes per group) and **Independent Samples Test** (Levene\'s + the two t-test rows).' },
          { title: 'Read Levene\'s FIRST, then pick the right t-row',
            body: 'If Levene\'s Sig. > .05 → read the top row "Equal variances assumed". If Levene\'s Sig. < .05 → read the bottom row "Equal variances NOT assumed" (this uses the Welch correction and adjusts the df).' },
        ]},

        { type: 'illustration', component: 'IndependentTTestDialog',
          caption: 'Figure 2. The Independent-Samples T Test dialog. Test Variable(s) = the continuous outcome (stress_score). Grouping Variable = the categorical grouping variable (hospital_level). After dragging the grouping variable across, click Define Groups and type the two value codes (1 and 2 in this example).' },
      ],
    },

    /* ════════════════════ 5. ASSUMPTION CHECK ════════════════════ */
    {
      id: 'assumptions',
      title: 'Checking assumptions — Levene\'s test in plain English',
      blocks: [
        { type: 'heading', level: 2, text: 'The one assumption SPSS checks for you' },

        { type: 'paragraph', text:
          'Independent-samples t-tests assume the two groups have roughly equal spread (variance). SPSS automatically tests this with **Levene\'s Test for Equality of Variances** — the first two columns of the Independent Samples Test table. You don\'t have to run it separately; just read it FIRST before you look at the t.' },

        { type: 'comparison',
          headers: ['Levene\'s Sig.', 'What it means', 'Which row to read'],
          rows: [
            ['**p > .05 (non-significant)**', 'Variances are roughly equal — assumption MET.', 'Top row: **"Equal variances assumed"**'],
            ['**p < .05 (significant)**',     'Variances differ — assumption VIOLATED.',       'Bottom row: **"Equal variances NOT assumed"** (Welch correction, adjusted df)'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Levene\'s is not a deal-breaker',
          body: 'A significant Levene\'s test does NOT mean your t-test is invalid. It just means you read the BOTTOM row of the output, which uses the Welch correction. SPSS hands you both rows so you never have to re-run anything. Many students panic at significant Levene\'s — there is nothing to panic about, just pick the right row.' },

        { type: 'heading', level: 3, text: 'Normality, briefly' },

        { type: 'list', items: [
          'Run Shapiro-Wilk PER GROUP (Analyze → Descriptive Statistics → Explore → put your outcome in Dependent List, the grouping variable in Factor List, tick Normality plots with tests).',
          'If both Shapiro-Wilk p-values are > .05, normality is met.',
          'If one or both are < .05 but each group has n ≥ 30, the t-test is robust enough — proceed and note the limitation.',
          'If your samples are small (n < 25 per group) AND normality is badly violated, switch to **Mann-Whitney U** (the non-parametric equivalent).',
        ]},
      ],
    },

    /* ════════════════════ 6. READING OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the SPSS output line by line',
      blocks: [
        { type: 'heading', level: 2, text: 'The two tables that matter' },

        { type: 'illustration', component: 'IndependentTTestOutput',
          caption: 'Figure 3. The Independent-Samples Test output. Levene\'s column on the left → check this first. If Levene\'s p > .05, read the top row. If Levene\'s p < .05, read the bottom row. Each t-test row gives you t, df, Sig. (2-tailed) — that is the p-value — Mean Difference, Std. Error Difference, and 95% confidence interval of the difference.' },

        { type: 'heading', level: 3, text: 'Table 1 — Group Statistics' },

        { type: 'comparison',
          headers: ['Column', 'What it shows', 'Why you need it'],
          rows: [
            ['Group label',          'The category names (Level 5, Level 4).',                    'Confirms SPSS read your value labels correctly.'],
            ['**N**',                'Sample size per group.',                                     'Goes in your write-up and lets the reader judge power.'],
            ['**Mean**',             'Average score per group.',                                   'The headline number — report both.'],
            ['**Std. Deviation**',   'Spread of scores within each group.',                        'Reported alongside the mean (M = 22.4, SD = 4.1).'],
            ['Std. Error Mean',      'How precise the group mean estimate is.',                    'Used internally to compute the t-statistic.'],
          ]},

        { type: 'heading', level: 3, text: 'Table 2 — Independent Samples Test' },

        { type: 'comparison',
          headers: ['Column', 'What it shows'],
          rows: [
            ['**Levene\'s F + Sig.**',                'Tests whether group variances are equal. Read FIRST.'],
            ['**t**',                                  'The t-statistic — your signal-to-noise ratio.'],
            ['**df**',                                 'Degrees of freedom. For equal-variances row, df = N₁ + N₂ − 2. For unequal-variances row, df is adjusted (will often be a decimal).'],
            ['**Sig. (2-tailed)**',                   'The p-value. If < .05, the difference is statistically significant.'],
            ['**Mean Difference**',                   'M₁ − M₂. Direction matters — a negative value means Group 2 was higher.'],
            ['**Std. Error Difference**',             'The standard error of the mean difference — denominator of t.'],
            ['**95% CI of the Difference (Lower / Upper)**', 'The plausible range for the true population difference. If the CI does NOT include zero, the difference is significant.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Sig. (2-tailed) = your p-value',
          body: 'SPSS labels the p-value as "Sig. (2-tailed)". This is the standard two-tailed p-value you report. Unless your hypothesis was directional AND pre-registered (very unusual at Master\'s level), always use the two-tailed value. Do NOT halve it casually to chase significance — that\'s a red flag in any defence.' },

        { type: 'reveal',
          prompt: 'Your output shows Levene\'s p = .021, then in the "Equal variances NOT assumed" row: t = −4.18, df = 58.7, Sig. (2-tailed) = .000, Mean Difference = −4.31, 95% CI [−6.37, −2.25]. What do you report?',
          answer: '**Use the bottom row (Welch corrected) because Levene\'s was significant.** Report: t(58.7) = −4.18, p < .001, with a mean difference of −4.31 points (95% CI [−6.37, −2.25]). The negative sign means Group 2 scored 4.31 points HIGHER than Group 1 (because Mean Difference = Group 1 − Group 2). The confidence interval does not contain zero, confirming significance. Don\'t round df to a whole number — the decimal df (58.7) is correct and expected when using Welch\'s correction.' },
      ],
    },

    /* ════════════════════ 7. EFFECT SIZE ════════════════════ */
    {
      id: 'effect-size',
      title: 'Effect size — Cohen\'s d',
      blocks: [
        { type: 'heading', level: 2, text: 'Significance is not enough — report MAGNITUDE too' },

        { type: 'paragraph', text:
          'A significant p-value tells you the difference is unlikely to be due to chance. But how BIG is the difference? With a very large sample, even trivial differences become "significant". Cohen\'s d converts the mean difference into a standardised unit so you can judge its practical importance.' },

        { type: 'definition', term: 'Cohen\'s d',
          body: 'The standardised mean difference: **d = (M₁ − M₂) ÷ SD_pooled**, where SD_pooled is the pooled standard deviation of the two groups. It expresses the gap between means in standard-deviation units. Benchmarks (Cohen, 1988): **|d| ≈ 0.2 small**, **|d| ≈ 0.5 medium**, **|d| ≈ 0.8 large**.' },

        { type: 'paragraph', text:
          'Recent versions of SPSS (27+) provide Cohen\'s d automatically in the Independent-Samples Effect Sizes table. If your version is older, compute it by hand using the Group Statistics table:' },

        { type: 'workedExample', title: 'Computing Cohen\'s d from Group Statistics',
          body: [
            { label: 'Read the two means and SDs',
              text: 'Level 5 nurses: M₁ = 22.4, SD₁ = 4.1, n₁ = 32. Level 4 nurses: M₂ = 18.1, SD₂ = 4.3, n₂ = 32.' },
            { label: 'Compute the pooled SD',
              text: 'SD_pooled = √[((n₁ − 1) × SD₁² + (n₂ − 1) × SD₂²) ÷ (n₁ + n₂ − 2)] = √[(31 × 16.81 + 31 × 18.49) ÷ 62] = √[1094.30 ÷ 62] = √17.65 = 4.20.' },
            { label: 'Compute d',
              text: 'd = (22.4 − 18.1) ÷ 4.20 = 4.3 ÷ 4.20 = **1.02**.' },
            { label: 'Interpret',
              text: 'd = 1.02 is a LARGE effect (above Cohen\'s 0.8 benchmark). On average, Level 5 nurses score more than one full standard deviation higher on the PSS-10 than Level 4 nurses — a substantively meaningful difference.' },
            { label: 'Report in APA',
              text: '"t(62) = 4.07, p < .001, d = 1.02 (large effect)."' },
          ]},

        { type: 'callout', tone: 'gold', title: 'Effect size benchmarks for Cohen\'s d',
          body: '**|d| ≈ 0.2 small** · **|d| ≈ 0.5 medium** · **|d| ≈ 0.8 large** · **|d| > 1.0 very large**. Always report d alongside t and p. A significant t with d = 0.15 is statistically real but tiny. A significant t with d = 0.9 is both real AND substantively meaningful.' },
      ],
    },

    /* ════════════════════ 8. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — nurse stress in two hospitals',
      blocks: [
        { type: 'workedExample', title: 'A Master\'s study at Kenyatta University',
          body: [
            { label: 'The research question',
              text: 'Do nurses working in a Level 5 referral hospital report higher perceived stress than nurses at a Level 4 county hospital?' },
            { label: 'The data',
              text: 'n = 64 nurses (32 per hospital). Outcome: **stress_score** (PSS-10 total, range 0-40, continuous). Grouping variable: **hospital_level** (1 = Level 5, 2 = Level 4).' },
            { label: 'Step 1 — Inspect descriptives',
              text: 'Level 5 (n = 32): M = 22.4, SD = 4.1. Level 4 (n = 32): M = 18.1, SD = 4.3. Visually it looks like Level 5 nurses are more stressed — by about 4.3 points.' },
            { label: 'Step 2 — Run the t-test',
              text: 'Analyze → Compare Means → Independent-Samples T Test → stress_score in Test Variable(s), hospital_level in Grouping Variable → Define Groups (1, 2) → Continue → OK.' },
            { label: 'Step 3 — Read Levene\'s FIRST',
              text: 'Levene\'s F = 0.18, p = .67. NON-significant → variances are roughly equal → read the TOP row ("Equal variances assumed").' },
            { label: 'Step 4 — Read the t-test result',
              text: 't(62) = 4.07, p < .001. Mean Difference = 4.31 (95% CI [2.20, 6.42]). The CI does not contain zero, confirming significance.' },
            { label: 'Step 5 — Compute Cohen\'s d',
              text: 'SD_pooled = 4.20 → d = 4.3 ÷ 4.20 = 1.02. Large effect.' },
            { label: 'Step 6 — APA write-up',
              text: '*"An independent-samples t-test was conducted to compare perceived stress scores between nurses at a Level 5 referral hospital (n = 32) and a Level 4 county hospital (n = 32). Levene\'s test indicated homogeneity of variance was met, F = 0.18, p = .67. Nurses at the Level 5 hospital reported significantly higher stress (M = 22.4, SD = 4.1) than nurses at the Level 4 hospital (M = 18.1, SD = 4.3); t(62) = 4.07, p < .001, mean difference = 4.31 (95% CI [2.20, 6.42]), Cohen\'s d = 1.02, indicating a large effect. The findings suggest that the workload and acuity demands of referral-level care are associated with substantially elevated perceived stress."*' },
          ]},
      ],
    },

    /* ════════════════════ 9. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing the independent t-test up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'An independent-samples t-test was conducted to compare [OUTCOME] between [Group 1 name] (n = [n₁]) and [Group 2 name] (n = [n₂]). Levene\'s test indicated [homogeneity of variance was met / violated], F = [value], p = [p]. [Group 1] participants scored [significantly higher / significantly lower / not significantly different from] [Group 2] on [OUTCOME] (Group 1: M = [M₁], SD = [SD₁]; Group 2: M = [M₂], SD = [SD₂]); t([df]) = [t-value], p = [p-value], mean difference = [diff] (95% CI [[lower, upper]]), Cohen\'s d = [d-value], indicating a [small/medium/large] effect.' },

        { type: 'callout', tone: 'success', title: 'Seven things every t-test write-up must include',
          body: '**1.** The test name and what was compared. **2.** Sample sizes per group. **3.** Levene\'s test result. **4.** Both group means and SDs. **5.** t with its degrees of freedom. **6.** The p-value. **7.** Cohen\'s d with verbal interpretation (small/medium/large). Optionally add the 95% CI of the mean difference — many examiners now consider this mandatory.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why an independent-samples t-test rather than a paired-samples or one-sample test?',
              a: 'The two groups were composed of DIFFERENT nurses sampled from two distinct hospitals — there was no pairing or matching between participants. Each nurse belonged to one hospital only. This makes the groups independent, so the independent-samples (between-subjects) t-test is the correct choice. A paired test would require the same participants measured twice; a one-sample test would compare one sample to a known constant.' },
            { q: 'Did you check the assumption of homogeneity of variance?',
              a: 'Yes — Levene\'s test for equality of variances was non-significant, F = 0.18, p = .67, indicating equal variances across the two groups. This permitted use of the standard t-test (the "Equal variances assumed" row) rather than the Welch-corrected version. Normality within each group was also checked using Shapiro-Wilk; both p-values exceeded .05.' },
            { q: 'Why report Cohen\'s d in addition to the p-value?',
              a: 'The p-value tells the reader whether the difference is likely to be due to chance, but it says nothing about how LARGE the difference is — a trivial difference can become statistically significant in a large sample. Cohen\'s d standardises the mean difference into SD units, allowing the reader to judge practical importance. A d of 1.02 indicates the two group means are more than one full standard deviation apart — a large, substantively meaningful effect.' },
          ]},
      ],
    },

    /* ════════════════════ 10. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five common independent t-test mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Using a t-test when groups are paired',
          body: 'You measured the same participants before and after a training programme and ran an independent-samples t-test. The test assumes the two groups are independent; pairing breaks that assumption and the resulting p-value is invalid.',
          fix: 'When the same participants appear in BOTH conditions (before/after, husband/wife, twin pairs), use the **paired-samples t-test** instead (Lesson 2). It accounts for the within-participant correlation and has much greater statistical power.' },

        { type: 'mistake',
          title: 'Mistake 2 — Reading the wrong row when Levene\'s is significant',
          body: 'Levene\'s shows p = .03 (significant), but you read the top "Equal variances assumed" row anyway. Your t and df are biased because the standard formula assumes equal variances.',
          fix: 'Always check Levene\'s FIRST. If Levene\'s p < .05, read the BOTTOM row ("Equal variances NOT assumed"), which uses the Welch correction and adjusts df. SPSS gives you both rows for free; pick the right one.' },

        { type: 'mistake',
          title: 'Mistake 3 — Running a t-test on three groups',
          body: 'You have three teaching methods (A, B, C) and you run three separate t-tests (A vs B, A vs C, B vs C). The cumulative Type I error inflates from 5% to about 14%.',
          fix: 'For 3+ independent groups use **one-way ANOVA**, then post-hoc tests to compare specific pairs. ANOVA controls family-wise error at .05; multiple t-tests do not.' },

        { type: 'mistake',
          title: 'Mistake 4 — Reporting t without df',
          body: 'You write "t = 4.07, p < .001" with no degrees of freedom. The reader can\'t verify the test or reconstruct your sample size.',
          fix: 'Always report **t(df)** — e.g. t(62) = 4.07. For the standard row df = n₁ + n₂ − 2. For the Welch (unequal variances) row df is adjusted and often appears as a decimal (e.g. 58.7) — write it as SPSS gives it.' },

        { type: 'mistake',
          title: 'Mistake 5 — Omitting the effect size',
          body: 'Your t-test is significant with a huge sample (n = 800). You report "p < .001" and stop. The reader has no idea whether the effect is real but trivial, or real and important.',
          fix: 'Always report **Cohen\'s d** with a verbal interpretation (small / medium / large). With large samples even a d of 0.05 will be significant — without d the reader cannot judge whether your finding matters in the real world.' },
      ],
    },

    /* ════════════════════ 11. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Independent-samples t-test compares the means of TWO INDEPENDENT groups on a continuous outcome.',
          'The t-statistic is signal ÷ noise: mean difference divided by the standard error of that difference.',
          'Use it when you have 2 independent groups, a continuous outcome, approximate normality within each group, and you have checked Levene\'s test.',
          'Run via Analyze → Compare Means → Independent-Samples T Test → drag the outcome into Test Variable(s), the grouping variable into Grouping Variable, click Define Groups, then OK.',
          'Read Levene\'s FIRST. Non-significant (p > .05) → top row. Significant (p < .05) → bottom row (Welch corrected).',
          'Report t(df) = [value], p = [value], plus Mean Difference, 95% CI of the difference, and Cohen\'s d.',
          'Effect-size benchmarks for d: 0.2 small, 0.5 medium, 0.8 large.',
          'Five mistakes to avoid: wrong test for paired data, wrong row after Levene\'s, t-tests for 3+ groups, omitting df, omitting effect size.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 2: Paired-samples t-test** we cover the version of the t-test you use when the SAME participants are measured TWICE — before and after an intervention, or in two conditions. The logic is similar but the maths and the SPSS dialog are different.' },

        { type: 'paragraph', text:
          'Before moving on, find a dataset with a continuous outcome and a 2-level categorical grouping variable. Run the test, check Levene\'s, pick the right row, compute Cohen\'s d, and write the APA paragraph. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 12. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'You want to compare mean exam scores between male and female students. Which test?',
          choices: [
            'One-sample t-test',
            'Paired-samples t-test',
            'Independent-samples t-test — two different groups of people, one continuous outcome',
            'One-way ANOVA',
          ],
          answer: 2,
          explanation: 'Male and female students are TWO INDEPENDENT groups (no student is in both groups, no pairing) and the outcome is continuous (exam score). That\'s the textbook independent-samples t-test scenario. One-sample is for comparing a sample mean to a known constant; paired-samples is for the same people measured twice; one-way ANOVA is for 3+ groups.' },

        { type: 'check',
          question: 'Your Levene\'s test shows p = .01. What should you do?',
          choices: [
            'Stop the analysis — your data is unusable',
            'Read the bottom row of the output ("Equal variances NOT assumed"), which uses the Welch correction',
            'Read the top row anyway',
            'Re-collect your data',
          ],
          answer: 1,
          explanation: 'A significant Levene\'s (p < .05) means group variances differ — the equal-variances assumption is violated. SPSS handles this for you: read the BOTTOM row ("Equal variances NOT assumed"), which uses the Welch correction and adjusts the df (often producing a decimal df like 58.7). The t-test is NOT invalidated — you just pick the right row.' },

        { type: 'check',
          question: 'You measured the same 30 patients before and after a 6-week intervention. Independent-samples t-test?',
          choices: [
            'Yes — you have 30 before scores and 30 after scores',
            'No — the same patients were measured twice, so you need the PAIRED-samples t-test (Lesson 2)',
            'Yes, but only with the Welch correction',
            'No — use one-way ANOVA',
          ],
          answer: 1,
          explanation: 'When the SAME participants appear in both conditions (before AND after), the two sets of scores are paired (each before-score is linked to a specific after-score). The independent-samples t-test wrongly assumes the two groups are independent. Use the PAIRED-samples t-test, which accounts for the within-participant correlation and is statistically more powerful.' },

        { type: 'check',
          question: 'What does Cohen\'s d = 0.85 mean for your t-test?',
          choices: [
            '85% of cases were in Group 1',
            'The two group means differ by 0.85 standard deviations — a LARGE effect (above Cohen\'s 0.8 benchmark)',
            'Your model explains 85% of variance',
            'p = .085',
          ],
          answer: 1,
          explanation: 'Cohen\'s d expresses the gap between two means in standard-deviation units. d = 0.85 means the means are 0.85 SDs apart. Cohen\'s benchmarks: 0.2 small, 0.5 medium, 0.8 large. d = 0.85 sits in the large range — a substantively meaningful difference, not just statistically significant.' },

        { type: 'check',
          question: 'When reporting your t-test, you must include t with...',
          choices: [
            'Just the value (e.g. "t = 4.07")',
            'Its degrees of freedom in parentheses (e.g. "t(62) = 4.07")',
            'The sample size in parentheses (e.g. "t(64) = 4.07")',
            'The standard error in parentheses',
          ],
          answer: 1,
          explanation: 'APA style requires the degrees of freedom in parentheses immediately after t — e.g. t(62) = 4.07, p < .001. For the standard t-test row df = n₁ + n₂ − 2. For the Welch-corrected (unequal variances) row, df is adjusted and often appears as a decimal — report it as SPSS gives it.' },

        { type: 'check',
          question: 'Which sentence is the most professional t-test report?',
          choices: [
            '"The t-test was significant."',
            '"t = 4.07, p < .001."',
            '"There was a difference between the groups."',
            '"An independent-samples t-test indicated that Level 5 nurses reported significantly higher stress (M = 22.4, SD = 4.1) than Level 4 nurses (M = 18.1, SD = 4.3); t(62) = 4.07, p < .001, mean difference = 4.31 (95% CI [2.20, 6.42]), Cohen\'s d = 1.02, a large effect. Levene\'s test confirmed equal variances, p = .67."',
          ],
          answer: 3,
          explanation: 'Option D hits every element examiners look for: names the test, identifies what was compared, reports both means and SDs, t with df, p, mean difference with 95% CI, Cohen\'s d with verbal interpretation, and notes the Levene\'s assumption check. The other options are vague, incomplete, or missing critical numbers.' },
      ],
    },
  ],
};
