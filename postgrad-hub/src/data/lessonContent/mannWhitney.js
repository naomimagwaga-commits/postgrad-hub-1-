/**
 * Non-parametric · Lesson 1 — Mann-Whitney U test
 * The non-parametric alternative to the independent-samples t-test.
 */

export const MANN_WHITNEY_LESSON = {
  id: 'np-1',
  title: 'Mann-Whitney U test',
  subtitle: 'Module 03 · Course: Non-parametric tests · Lesson 1 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When your data refuses to be normal',
      blocks: [
        { type: 'scene', body: [
          'You are doing a Master\'s study at Maseno University on monthly household income in two informal settlements — Obunga (n = 22) and Manyatta (n = 20). You walk through both with a survey team and record every household\'s reported monthly income in Kenyan shillings. When you plot the two distributions, you see what every researcher of urban poverty eventually sees: a sharp peak at the low end, a long thin tail of a few much-richer households (the kiosk owner, the matatu driver, the one teacher), and a Shapiro-Wilk p-value of .003. The data is **severely right-skewed**.',
          'You wanted to run an independent-samples t-test (Obunga vs Manyatta), but the t-test assumes the outcome is roughly normal within each group. With n = 22 and n = 20 (both well below the n ≥ 30 rule-of-thumb that lets the Central Limit Theorem save you) AND a Shapiro-Wilk p < .01, you cannot defend a parametric t-test in your defence.',
          'You need a test that does the same job as the independent-samples t-test — compare two independent groups on a continuous-ish outcome — but **without** requiring normality. That test is the **Mann-Whitney U test** (sometimes called the Wilcoxon rank-sum test — same test, two names). It works on the RANKS of your data rather than the raw values, so a single millionaire household no longer drags the test around the way it would have dragged a mean.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise** the moments in your data when Mann-Whitney U is the right replacement for an independent t-test.',
            '**Explain** how ranking the data sidesteps the normality assumption.',
            '**Run** the test in SPSS via Analyze → Nonparametric Tests → Legacy Dialogs → 2 Independent Samples.',
            '**Read** the SPSS output — Ranks table, Test Statistics, and the all-important p-value.',
            '**Compute and report** the standard rank-biserial effect size, which examiners now expect alongside p.',
            '**Write up** the result in APA style with all the elements your reviewer will look for.',
            '**Spot and avoid** the five mistakes beginners make with non-parametric tests.',
          ]},

        { type: 'why', body:
          'Almost every Kenyan postgrad project that measures income, time, score-out-of-X, or count-of-events runs into non-normality. Refugee/IDP, informal-settlement, micro-enterprise, and rural-household data are almost always skewed. Mann-Whitney is the single most-used non-parametric test in Kenyan postgrad research — master it once and your toolkit for messy real-world data is complete.' },
      ],
    },

    /* ════════════════════ 2. BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — replace values with their ranks',
      blocks: [
        { type: 'heading', level: 2, text: 'Why ranks tame outliers' },

        { type: 'paragraph', text:
          'A t-test compares two MEANS. Means are very sensitive to outliers — a single household earning KES 800,000 in a sample where everyone else earns 5,000-15,000 can shift the mean dramatically. Mann-Whitney sidesteps this by IGNORING the raw values entirely. It pools all the cases from both groups, ranks them from smallest to largest, then asks: are the ranks for Group 1 systematically lower (or higher) than the ranks for Group 2?' },

        { type: 'illustration', component: 'MannWhitneyRanks',
          caption: 'Figure 1. How Mann-Whitney works. Raw income values from both groups are combined, sorted lowest → highest, and replaced with ranks 1, 2, 3, … N. The test then computes whether the SUM of ranks in Group 1 is meaningfully different from what we\'d expect under the null hypothesis (that the two groups come from the same population).' },

        { type: 'definition', term: 'Mann-Whitney U statistic',
          body: 'A count of the number of times a value from Group 1 outranks (or is outranked by) a value from Group 2, computed across every possible pair. Mathematically: **U₁ = n₁n₂ + n₁(n₁+1)/2 − R₁**, where R₁ is the sum of ranks in Group 1. SPSS reports the smaller of U₁ and U₂. A SMALL U means one group consistently outranks the other; a U near n₁n₂/2 means the two groups are interleaved (no difference).' },

        { type: 'analogy', title: 'The marathon finish line',
          body: 'Imagine two athletics clubs sending runners to the Eldoret Marathon — Iten Eagles (n = 22) and Kapsabet Cheetahs (n = 20). At the finish line you don\'t care about the exact times of each runner; you care about their finishing POSITIONS. If most of the top-10 positions go to Iten runners, you conclude Iten was the stronger team — regardless of whether one Iten runner came in at 2:08 and another at 3:45. Mann-Whitney is exactly that finish-line view of your data: positions matter, exact values do not.' },

        { type: 'reveal',
          prompt: 'You\'re comparing income between two settlements. Obunga has one household reporting KES 1.2 million (the local rich uncle). Why might this destroy a t-test but not bother Mann-Whitney?',
          answer: '**The t-test computes a MEAN. One million-shilling household drags the Obunga mean upward by tens of thousands of shillings, distorts the standard deviation, and may invalidate the normality assumption.** Mann-Whitney replaces every value with its rank. KES 1.2 million simply becomes "the highest rank" (e.g. rank 42 out of 42). It contributes one rank to the rank sum, exactly as if the value had been KES 50,000 or KES 5 million — the magnitude is invisible to the test. This is why Mann-Whitney is called "robust to outliers".' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When Mann-Whitney is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The four conditions' },

        { type: 'steps', steps: [
          { title: 'You have EXACTLY TWO independent groups',
            body: 'Same set-up as the independent t-test — two groups of different people (male/female, urban/rural, treatment/control, settlement A / settlement B). With 3+ groups use Kruskal-Wallis (Lesson 3). With paired data use Wilcoxon signed-rank (Lesson 2).' },
          { title: 'Your outcome is at least ORDINAL',
            body: 'Mann-Whitney works on continuous, ordinal, or any outcome that can be ranked. Common uses: continuous outcomes (income, time) when normality fails; Likert items (1-5) where ranking is meaningful but mean-based tests are debated; counts; scores out of X.' },
          { title: 'You CANNOT defend a parametric t-test',
            body: 'Either (a) your sample is small (n < 25 per group) AND Shapiro-Wilk is significant, or (b) your outcome is genuinely ordinal (single Likert items), or (c) there are extreme outliers that you cannot justify removing.' },
          { title: 'The two distributions have SIMILAR SHAPES',
            body: 'Strictly, Mann-Whitney compares medians ONLY if the two distributions have the same shape (skew, kurtosis). When shapes differ, the test compares STOCHASTIC DOMINANCE — "does one group tend to produce higher values than the other?" In practice, eyeball the two histograms; if they look similarly shaped (just shifted left/right), median interpretation is safe.' },
        ]},

        { type: 'comparison',
          headers: ['Situation', 'Sample size & normality', 'Right test'],
          rows: [
            ['Urban vs rural income, large samples, roughly normal',     'n ≥ 30 each, Shapiro p > .05',  'Independent-samples t-test'],
            ['Urban vs rural income, small samples, skewed',              'n < 25 each, Shapiro p < .05',  '**Mann-Whitney U (this lesson)**'],
            ['Likert satisfaction (1-5) by gender',                       'Ordinal outcome',                '**Mann-Whitney U**'],
            ['Time-to-recovery (days) in two treatment arms, severe skew','any n, badly skewed',            '**Mann-Whitney U**'],
            ['Three matatu-route fares compared',                         '3 independent groups',           'Kruskal-Wallis (Lesson 3)'],
            ['Same patients before vs after, non-normal',                 '2 paired conditions',            'Wilcoxon signed-rank (Lesson 2)'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Don\'t panic-switch — check sample size first',
          body: 'Beginners often switch to Mann-Whitney the moment Shapiro-Wilk returns p < .05. But parametric tests are robust to mild non-normality when n is reasonably large (≥ 30 per group). Switch when n is SMALL AND the violation is SEVERE — not just because Shapiro-Wilk is significant in a sample of 200.' },
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running Mann-Whitney in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'Two routes — both work' },

        { type: 'paragraph', text:
          'SPSS gives you two ways to run non-parametric tests: a modern automated route (Analyze → Nonparametric Tests → Independent Samples) and a Legacy Dialogs route that looks more like the t-test dialog. Either works — Legacy Dialogs is what most textbooks and supervisors recognise, so we\'ll use that.' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → Nonparametric Tests → Legacy Dialogs → 2 Independent Samples.' },
          { title: 'Move your outcome to Test Variable List',
            body: 'The continuous or ordinal variable (e.g. **monthly_income**).' },
          { title: 'Move your grouping variable to Grouping Variable',
            body: 'The categorical variable with two levels (e.g. **settlement** coded 1 = Obunga, 2 = Manyatta). It will appear as **settlement(? ?)**.' },
          { title: 'Click Define Groups',
            body: 'Type the two codes (Group 1: 1, Group 2: 2). Click Continue.' },
          { title: 'Tick "Mann-Whitney U" under Test Type',
            body: 'It\'s the default — confirm it\'s ticked. The other options (Moses, Kolmogorov-Smirnov, Wald-Wolfowitz) are rarely used; ignore them unless your supervisor specifies otherwise.' },
          { title: 'Click OK',
            body: 'SPSS produces two tables: **Ranks** (mean rank and rank sum per group) and **Test Statistics** (U, Z, asymptotic p-value, and exact p if your sample is small).' },
        ]},

        { type: 'illustration', component: 'MannWhitneyDialog',
          caption: 'Figure 2. The 2 Independent Samples (Legacy Dialogs) dialog. Test Variable List = the outcome (monthly_income). Grouping Variable = the categorical 2-level variable (settlement). Make sure Mann-Whitney U is ticked under Test Type — that is the default.' },
      ],
    },

    /* ════════════════════ 5. READING OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the SPSS output',
      blocks: [
        { type: 'heading', level: 2, text: 'The two tables that matter' },

        { type: 'illustration', component: 'MannWhitneyOutput',
          caption: 'Figure 3. The two Mann-Whitney output tables. The Ranks table shows the mean rank and sum of ranks per group — Group 1 has mean rank 18.5, Group 2 has mean rank 24.8, suggesting Group 2 tends to have higher values. The Test Statistics table reports U, the Z approximation, and the p-value (Asymp. Sig.). If n is small, also check the Exact Sig. row.' },

        { type: 'heading', level: 3, text: 'Table 1 — Ranks' },

        { type: 'comparison',
          headers: ['Column', 'What it shows'],
          rows: [
            ['**N**',           'Number of cases in each group.'],
            ['**Mean Rank**',   'Average rank for each group. Higher mean rank = that group tends to have higher values. Report this; it\'s the closest non-parametric equivalent of the group mean.'],
            ['**Sum of Ranks**', 'Total of the ranks in each group. Used internally to compute U.'],
          ]},

        { type: 'heading', level: 3, text: 'Table 2 — Test Statistics' },

        { type: 'comparison',
          headers: ['Row', 'What it shows'],
          rows: [
            ['**Mann-Whitney U**',         'The U statistic. SPSS reports the smaller of U₁ and U₂.'],
            ['**Wilcoxon W**',              'The smaller of the two rank sums. (Mann-Whitney and Wilcoxon rank-sum are mathematically equivalent; SPSS prints both names.)'],
            ['**Z**',                       'A normal approximation. For n > 20 per group, Z is reliable.'],
            ['**Asymp. Sig. (2-tailed)**', 'The p-value from the Z approximation. Use this when your samples are reasonably sized (n > 20 per group).'],
            ['**Exact Sig. (2-tailed)**',  'The exact p-value, shown when your samples are small. Use this when n is small or there are many tied ranks.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Which p-value to report?',
          body: 'For n > 20 per group, report **Asymp. Sig. (2-tailed)**. For smaller samples, report **Exact Sig. (2-tailed)** when SPSS provides it — it does not rely on a normal approximation. Either way, "2-tailed" is the convention unless your hypothesis was directional AND pre-registered.' },

        { type: 'reveal',
          prompt: 'Your output shows: Mann-Whitney U = 122.5, Z = −2.14, Asymp. Sig. (2-tailed) = .032. Mean ranks were Obunga = 17.6 (n = 22) and Manyatta = 25.9 (n = 20). What do you conclude?',
          answer: '**Manyatta households reported significantly higher incomes than Obunga households.** Manyatta\'s mean rank (25.9) is meaningfully higher than Obunga\'s (17.6), and U = 122.5 with Z = −2.14 gives p = .032 — a statistically significant difference at the .05 level. Report: U = 122.5, Z = −2.14, p = .032. Then compute the effect size r = |Z|/√N = 2.14/√42 = 0.33 — a medium effect. Defence sentence: "Mann-Whitney U was used because monthly income was severely right-skewed (Shapiro-Wilk p = .003) with small samples; the test confirmed Manyatta\'s incomes were significantly higher (Mdn = X) than Obunga\'s (Mdn = Y)."' },
      ],
    },

    /* ════════════════════ 6. EFFECT SIZE ════════════════════ */
    {
      id: 'effect-size',
      title: 'Effect size — r and rank-biserial correlation',
      blocks: [
        { type: 'heading', level: 2, text: 'Two standard options' },

        { type: 'paragraph', text:
          'A significant p-value tells you the two groups differ; the effect size tells you BY HOW MUCH. Non-parametric tests have their own effect-size conventions — you cannot use Cohen\'s d here (it requires means and SDs which Mann-Whitney does not use). The two standard options are r (Z-based) and the rank-biserial correlation.' },

        { type: 'definition', term: 'r (effect size from Z)',
          body: '**r = |Z| ÷ √N**, where Z is from the Test Statistics table and N = n₁ + n₂ (total sample). Interpretation benchmarks (Cohen, 1988): **r ≈ .10 small, r ≈ .30 medium, r ≈ .50 large**. Quick, easy, widely accepted — the most common choice.' },

        { type: 'definition', term: 'Rank-biserial correlation (r_rb)',
          body: '**r_rb = 1 − (2U / (n₁·n₂))**, where U is the smaller of U₁ and U₂. Ranges from −1 (Group 1 always outranked) to +1 (Group 1 always outranks). Some statisticians prefer this because it does not depend on a normal approximation. SPSS 27+ provides it automatically in the Effect Sizes table.' },

        { type: 'workedExample', title: 'Computing effect size for the Obunga vs Manyatta example',
          body: [
            { label: 'Read Z and U from Test Statistics',
              text: 'Z = −2.14, U = 122.5, n₁ = 22, n₂ = 20, N = 42.' },
            { label: 'Compute r (Z-based)',
              text: 'r = |−2.14| / √42 = 2.14 / 6.48 = **0.33**. Medium effect (above the .30 benchmark).' },
            { label: 'Compute r_rb (rank-biserial)',
              text: 'r_rb = 1 − (2 × 122.5 / (22 × 20)) = 1 − (245 / 440) = 1 − 0.557 = **0.44**. Also medium, on the way to large.' },
            { label: 'Report in APA',
              text: '"Mann-Whitney U = 122.5, Z = −2.14, p = .032, r = .33 (medium effect)." Some journals prefer r_rb; check your discipline.' },
          ]},

        { type: 'callout', tone: 'gold', title: 'Benchmarks for non-parametric r',
          body: '**r ≈ .10 small** · **r ≈ .30 medium** · **r ≈ .50 large**. These are Cohen\'s standard benchmarks applied to the Z-derived r. Always report r alongside U and p — without it, examiners cannot judge whether your significant difference is trivial or substantial.' },
      ],
    },

    /* ════════════════════ 7. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — income across two Kisumu settlements',
      blocks: [
        { type: 'workedExample', title: 'A Master\'s study at Maseno University',
          body: [
            { label: 'The research question',
              text: 'Do households in the Manyatta settlement report higher monthly incomes than those in the Obunga settlement?' },
            { label: 'The data',
              text: 'n = 42 households (22 in Obunga, 20 in Manyatta). Outcome: **monthly_income** in KES (continuous but severely right-skewed). Grouping variable: **settlement** (1 = Obunga, 2 = Manyatta).' },
            { label: 'Step 1 — Inspect descriptives and check normality',
              text: 'Obunga: Mdn = 7,500, IQR = 4,200-12,000, range = 2,000-380,000. Manyatta: Mdn = 11,200, IQR = 7,800-18,500, range = 3,500-1,200,000. Shapiro-Wilk on income p = .003 (severely non-normal). Two outliers visible in Manyatta. Decision: parametric t-test not defensible → use Mann-Whitney U.' },
            { label: 'Step 2 — Run Mann-Whitney',
              text: 'Analyze → Nonparametric Tests → Legacy Dialogs → 2 Independent Samples → monthly_income to Test Variable List, settlement(1, 2) to Grouping Variable, Mann-Whitney U ticked, OK.' },
            { label: 'Step 3 — Read the Ranks table',
              text: 'Obunga: n = 22, Mean Rank = 17.55, Sum of Ranks = 386.0. Manyatta: n = 20, Mean Rank = 25.93, Sum of Ranks = 518.5. Manyatta\'s mean rank is meaningfully higher.' },
            { label: 'Step 4 — Read the Test Statistics table',
              text: 'Mann-Whitney U = 133.0. Z = −2.21. Asymp. Sig. (2-tailed) = .027.' },
            { label: 'Step 5 — Compute effect size',
              text: 'r = |−2.21| / √42 = 2.21 / 6.48 = 0.34. Medium effect.' },
            { label: 'Step 6 — APA write-up',
              text: '*"A Mann-Whitney U test was conducted to compare monthly household income between Obunga (n = 22) and Manyatta (n = 20) settlements. The outcome was severely right-skewed (Shapiro-Wilk p = .003) with two extreme outliers, precluding the use of a parametric t-test. Manyatta households reported significantly higher incomes (Mdn = KES 11,200, IQR = 7,800-18,500) than Obunga households (Mdn = KES 7,500, IQR = 4,200-12,000); U = 133.0, Z = −2.21, p = .027, r = .34, a medium effect. The finding suggests a meaningful income gap between the two settlements that cannot be attributed to sampling variation."*' },
          ]},
      ],
    },

    /* ════════════════════ 8. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing Mann-Whitney up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A Mann-Whitney U test was conducted to compare [OUTCOME] between [Group 1 name] (n = [n₁]) and [Group 2 name] (n = [n₂]). The non-parametric test was selected because [normality was violated (Shapiro-Wilk p = X) / the outcome was ordinal / extreme outliers were present]. [Group 1] reported [significantly higher / significantly lower / not significantly different] [OUTCOME] (Mdn = [Mdn₁], IQR = [Q1-Q3]) compared to [Group 2] (Mdn = [Mdn₂], IQR = [Q1-Q3]); U = [U-value], Z = [Z-value], p = [p-value], r = [r-value], indicating a [small / medium / large] effect.' },

        { type: 'callout', tone: 'success', title: 'Seven things every Mann-Whitney write-up must include',
          body: '**1.** The test name. **2.** Why you chose non-parametric (the assumption violation). **3.** Sample sizes per group. **4.** MEDIAN and IQR for each group (NOT mean ± SD). **5.** U-value and Z. **6.** The p-value. **7.** Effect size r with verbal interpretation (small/medium/large).' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why a Mann-Whitney U test rather than an independent-samples t-test?',
              a: 'Monthly income was severely right-skewed (Shapiro-Wilk p = .003) with two extreme outliers in the Manyatta sample, and group sample sizes (n = 22 and n = 20) were too small to invoke the Central Limit Theorem confidently. Mann-Whitney U is the standard non-parametric alternative — it works on the ranks rather than the raw values, is robust to outliers and free of the normality assumption, and is the appropriate test for this two-group comparison.' },
            { q: 'Why did you report medians and IQRs rather than means and SDs?',
              a: 'Mann-Whitney compares distributions through ranks, not means. Reporting a mean and standard deviation alongside a non-parametric test would be inconsistent — the mean is exactly the descriptive statistic the test was chosen to avoid. The MEDIAN and INTERQUARTILE RANGE are the appropriate descriptive summaries for non-parametric tests because they describe central tendency and spread without being distorted by outliers.' },
            { q: 'Why r as the effect size rather than Cohen\'s d?',
              a: 'Cohen\'s d is computed from means and pooled standard deviations — the very statistics that the non-parametric framework deliberately avoids. The standard effect size for Mann-Whitney is r = |Z| / √N, derived from the test\'s own Z statistic. Cohen\'s benchmarks (.10 small, .30 medium, .50 large) apply, and r is comparable across non-parametric tests for two-group comparisons.' },
          ]},
      ],
    },

    /* ════════════════════ 9. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five common Mann-Whitney mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Reporting means and SDs alongside a non-parametric test',
          body: 'You ran Mann-Whitney because the data was skewed, but in Chapter 4 you wrote "Obunga: M = KES 18,450, SD = 81,200; Manyatta: M = KES 42,300, SD = 268,400." The means and SDs are exactly what you said the data couldn\'t support — and the SDs are huge because of the outliers you used Mann-Whitney to handle.',
          fix: 'Report MEDIAN and IQR with Mann-Whitney, always. "Obunga: Mdn = KES 7,500, IQR = 4,200-12,000." Means and SDs belong with parametric tests.' },

        { type: 'mistake',
          title: 'Mistake 2 — Switching to Mann-Whitney because Shapiro-Wilk is significant in a large sample',
          body: 'You have n = 150 per group, the data is mildly skewed, Shapiro-Wilk returns p = .04, and you abandon the t-test for Mann-Whitney. You\'ve thrown away a more powerful test for no real reason — at n = 150 per group the t-test is robust to mild non-normality.',
          fix: 'Switch only when sample size is small AND the violation is severe. With n ≥ 30 per group and only mild skew, the t-test is fine; cite the Central Limit Theorem as your justification.' },

        { type: 'mistake',
          title: 'Mistake 3 — Using Mann-Whitney on paired data',
          body: 'You measured 30 patients before and after a treatment and ran Mann-Whitney. The test assumes the two samples are independent; pairing breaks that assumption and the p-value is invalid.',
          fix: 'When the SAME participants appear in both conditions (before/after, condition A/B, matched pairs), use the **Wilcoxon signed-rank test** (Lesson 2). It is the non-parametric equivalent of the paired-samples t-test.' },

        { type: 'mistake',
          title: 'Mistake 4 — Forgetting to compute r (or any effect size)',
          body: 'You report "U = 133.0, p = .027" and stop. With a large sample, even tiny stochastic differences become significant; the reader cannot tell whether the effect is real and important or real and trivial.',
          fix: 'Always compute **r = |Z| / √N** (or the rank-biserial correlation) and report it with a verbal interpretation. r = .10 small, .30 medium, .50 large.' },

        { type: 'mistake',
          title: 'Mistake 5 — Misinterpreting Mann-Whitney as "comparing medians"',
          body: 'You write "Mann-Whitney showed Manyatta had a higher median income." Technically true only IF the two distributions have the same SHAPE. If shapes differ, Mann-Whitney is testing whether one group tends to produce higher values overall (stochastic dominance), not strictly the medians.',
          fix: 'Eyeball the two histograms or boxplots. If they look similarly shaped (just shifted), median language is fine. If shapes differ markedly, use "tend to be higher" or "stochastically larger" instead of "have a higher median". Either way, reporting the medians is still informative.' },
      ],
    },

    /* ════════════════════ 10. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Mann-Whitney U is the non-parametric alternative to the independent-samples t-test — for comparing TWO INDEPENDENT groups when normality fails or the outcome is ordinal.',
          'It works on RANKS rather than raw values, making it robust to outliers and free of the normality assumption.',
          'Use it when: 2 independent groups, ordinal-or-worse outcome, small samples with skew, or extreme outliers in continuous data.',
          'Run via Analyze → Nonparametric Tests → Legacy Dialogs → 2 Independent Samples → outcome in Test Variable List, grouping variable in Grouping Variable, Define Groups (1, 2), Mann-Whitney U ticked, OK.',
          'Report MEDIAN and IQR for each group (NOT mean ± SD).',
          'For n > 20 per group, report Asymp. Sig. (2-tailed) as the p-value; for smaller samples, use Exact Sig. (2-tailed).',
          'Always compute and report effect size r = |Z| / √N. Benchmarks: .10 small, .30 medium, .50 large.',
          'Strictly compares medians only when distributions share the same shape; otherwise tests stochastic dominance.',
          'Five mistakes to avoid: mean ± SD with non-parametric tests, panic-switching on a large sample, using it on paired data, omitting effect size, careless median language when shapes differ.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 2: Wilcoxon signed-rank test** we cover the non-parametric version for PAIRED data — same participants measured twice, when normality of the differences fails.' },

        { type: 'paragraph', text:
          'Before moving on, find a skewed continuous variable in your dataset paired with a two-level grouping variable. Run Mann-Whitney, report medians + IQR, compute r, and write the APA paragraph. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'When is Mann-Whitney U the right test instead of an independent-samples t-test?',
          choices: [
            'Always — non-parametric tests are safer',
            'When you have 2 independent groups AND your continuous outcome is severely non-normal (especially with small samples) OR your outcome is ordinal',
            'When you have 3 or more groups',
            'When your data is perfectly normal',
          ],
          answer: 1,
          explanation: 'Mann-Whitney U is the non-parametric alternative to the independent t-test. Use it when (a) 2 independent groups, (b) ordinal outcome, OR (c) continuous outcome with small samples + severe non-normality / extreme outliers. With large samples and approximately normal data, the parametric t-test is more powerful — don\'t switch unnecessarily.' },

        { type: 'check',
          question: 'How does Mann-Whitney avoid the normality assumption?',
          choices: [
            'It uses only positive numbers',
            'It replaces all values with their RANKS — magnitudes disappear, only positions matter, so outliers and skew don\'t distort the test',
            'It assumes a uniform distribution instead',
            'It log-transforms the data automatically',
          ],
          answer: 1,
          explanation: 'Mann-Whitney pools both groups, ranks every case from smallest to largest, and tests whether the rank distributions differ between the two groups. Because the raw magnitudes vanish during ranking, a single extreme value (KES 1.2M) contributes only its rank (e.g. position 42 out of 42) — exactly as if it had been KES 50,000. This is why the test is "robust to outliers" and free of the normality assumption.' },

        { type: 'check',
          question: 'You ran Mann-Whitney because your income data was skewed. What descriptive statistics should you report?',
          choices: [
            'Mean and standard deviation',
            'MEDIAN and interquartile range (IQR) — the descriptive equivalents that don\'t require normality',
            'Skewness and kurtosis',
            'Only the p-value',
          ],
          answer: 1,
          explanation: 'Non-parametric tests like Mann-Whitney work on ranks, not means. Reporting mean ± SD alongside Mann-Whitney is inconsistent — those are the very statistics the test was chosen to avoid. The MEDIAN (with IQR for spread) is the appropriate central-tendency statistic for non-parametric tests because it isn\'t distorted by outliers or skew.' },

        { type: 'check',
          question: 'Your output gives U = 122.5, Z = −2.14, p = .032, n₁ = 22, n₂ = 20. What is the effect size r?',
          choices: [
            'r = U / N = 122.5 / 42 = 2.92',
            'r = |Z| / √N = 2.14 / √42 = 0.33 — a medium effect',
            'r = p × N = .032 × 42 = 1.34',
            'r = n₁ / n₂ = 22 / 20 = 1.10',
          ],
          answer: 1,
          explanation: 'The standard effect size for Mann-Whitney is r = |Z| / √N, where N = total sample (n₁ + n₂). Here 2.14 / √42 = 2.14 / 6.48 = 0.33 — at the .30 medium benchmark. Always compute and report r alongside p; without it you cannot judge whether a significant difference is large or trivial.' },

        { type: 'check',
          question: 'You measured 30 patients\' pain scores before AND after a treatment. Mann-Whitney?',
          choices: [
            'Yes — Mann-Whitney handles two groups of measurements',
            'No — the data is PAIRED (same patients measured twice). Use the WILCOXON SIGNED-RANK test (Lesson 2) instead',
            'Yes, but only if data is normal',
            'No — use a chi-square test',
          ],
          answer: 1,
          explanation: 'Mann-Whitney assumes the two samples are independent. When the SAME participants appear in both conditions (before/after, condition A vs B, matched pairs), the appropriate non-parametric test is **Wilcoxon signed-rank**, which works on the per-person difference ranks. Using Mann-Whitney on paired data wastes the within-subject pairing and produces an invalid p-value.' },

        { type: 'check',
          question: 'Which sentence is the most professional Mann-Whitney report?',
          choices: [
            '"Mann-Whitney was significant."',
            '"M = 18,450, p = .03."',
            '"A Mann-Whitney U test (chosen because monthly income was severely right-skewed, Shapiro-Wilk p = .003) showed that Manyatta households reported significantly higher incomes (Mdn = KES 11,200, IQR = 7,800-18,500) than Obunga households (Mdn = KES 7,500, IQR = 4,200-12,000); U = 133.0, Z = −2.21, p = .027, r = .34, a medium effect."',
            '"The two groups were different at the 5% level."',
          ],
          answer: 2,
          explanation: 'Option C hits every element: names the test, justifies the choice (assumption violation), reports sample sizes implicitly via the descriptive sentence, gives MEDIAN and IQR per group, U, Z, p, and effect size r with verbal interpretation. The other options are vague, use the wrong descriptive statistics, or omit critical elements.' },
      ],
    },
  ],
};
