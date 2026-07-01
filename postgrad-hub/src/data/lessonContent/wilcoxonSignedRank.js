/**
 * Non-parametric · Lesson 2 — Wilcoxon Signed-Rank Test
 * The non-parametric alternative to the paired-samples t-test.
 */

export const WILCOXON_SIGNED_RANK_LESSON = {
  id: 'np-2',
  title: 'Wilcoxon signed-rank test',
  subtitle: 'Module 03 · Course: Non-parametric tests · Lesson 2 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'Paired data when the differences are not normal',
      blocks: [
        { type: 'scene', body: [
          'You are doing a Master\'s study at Egerton University on the effectiveness of a single counselling session for 24 final-year students experiencing exam anxiety. You administered the GAD-7 anxiety scale BEFORE the session and AGAIN one week after. The mean before was 14.2 and the mean after was 11.8 — a 2.4-point drop.',
          'You start with the natural choice — a paired-samples t-test. You compute the per-person difference (after − before), and run Shapiro-Wilk on those differences. The result: W = .82, p = .002. The differences are NOT normally distributed. A few students improved dramatically (their differences are around −8), most improved modestly (−1 to −3), and two actually got worse (+2 and +4). This long-tailed pattern violates the paired t-test\'s only real assumption.',
          'You need a test that does the same job as the paired-samples t-test — compare two related measurements on the same people — but **without** requiring the difference scores to be normal. That test is the **Wilcoxon signed-rank test**. It works on the RANKS of the absolute differences, weighted by their signs (positive vs negative), so a couple of dramatic improvements no longer destroy your analysis.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise** the moments in your data when Wilcoxon signed-rank is the right replacement for a paired t-test.',
            '**Explain** how signed ranks combine direction (improved vs got worse) with magnitude (rank of |difference|).',
            '**Set up your data correctly** — two columns, same person across rows (wide format).',
            '**Run** the test in SPSS via Analyze → Nonparametric Tests → Legacy Dialogs → 2 Related Samples.',
            '**Read** the Ranks and Test Statistics tables and identify the right p-value.',
            '**Compute and report** the standard effect size r = |Z| / √N.',
            '**Write up** the result in APA style with all the elements your reviewer will look for.',
          ]},

          { type: 'why', body:
            'Pre/post interventions, training-effect studies, and within-subject experiments are everywhere in Kenyan postgrad research — and very often the difference scores are NOT normal because a few participants respond dramatically while most respond modestly. Wilcoxon signed-rank is the standard non-parametric backup you will need at least once in your degree.' },
      ],
    },

    /* ════════════════════ 2. BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — sign the rank',
      blocks: [
        { type: 'heading', level: 2, text: 'Direction × magnitude, on ranks' },

        { type: 'paragraph', text:
          'The paired t-test tests whether the mean of the per-person difference scores is significantly different from zero. Wilcoxon signed-rank does the same job but in two careful steps. First, it computes the absolute difference for each participant and RANKS those. Second, it attaches each participant\'s ORIGINAL SIGN (positive if "after > before", negative if "before > after") back onto its rank. It then asks: do the positive-signed ranks sum to roughly the same value as the negative-signed ranks (no real change), or is the rank weight clearly tipped to one side (real change)?' },

        { type: 'illustration', component: 'WilcoxonSignedRanks',
          caption: 'Figure 1. How Wilcoxon signed-rank works. (1) For each participant compute the difference. (2) Drop any ties (difference = 0). (3) Take the ABSOLUTE values of the remaining differences and rank them from smallest to largest. (4) Re-attach the original sign of each difference to its rank. (5) Sum the positive-signed ranks and the negative-signed ranks separately. (6) The smaller of the two sums is the Wilcoxon test statistic W (also called T).' },

        { type: 'definition', term: 'Wilcoxon signed-rank statistic (W or T)',
          body: 'The smaller of two sums: the sum of the positive-signed ranks (Σ R+) and the sum of the negative-signed ranks (Σ R−). If the intervention had no effect, the positive and negative ranks should sum to roughly the same value, making both sums similar. If the intervention worked, one sum will be much smaller than the other (because most ranks will have one sign), and W will be small.' },

        { type: 'analogy', title: 'Voting at a hostel meeting',
          body: 'Imagine 24 students voting on whether to switch the hostel WiFi provider. Each student gives a strength-of-feeling rating from −5 (strongly oppose) to +5 (strongly support), with 0 meaning "don\'t care". Wilcoxon ignores the people who voted 0 (no change), takes the ABSOLUTE strength of feeling of everyone else, ranks those strengths, then re-attaches the original sign. If most of the loud votes were in favour (high positive ranks dominate), the policy passes. If most loud votes were against (high negative ranks dominate), it fails. If positive and negative strengths balance out, the meeting is split and no change is detected.' },

        { type: 'reveal',
          prompt: 'Two students in your anxiety study had a DIFFERENCE score of exactly 0 (their before and after were identical). How does Wilcoxon handle them?',
          answer: '**They are DROPPED from the analysis.** Wilcoxon signed-rank cannot meaningfully rank a zero (it has no direction). SPSS automatically excludes ties at zero — your "effective N" for the test becomes the number of participants who showed ANY change, positive or negative. This is why the Ranks table in SPSS will show a "Ties" row counting how many cases had a difference of zero. If your effective N drops below about 10, your statistical power suffers — consider whether the test was the right choice.' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When Wilcoxon signed-rank is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The three telltale signs' },

        { type: 'steps', steps: [
          { title: 'Your design is PAIRED (within-subjects)',
            body: 'Same participants measured twice (before/after, condition A/B), or naturally matched pairs (husband-wife, mother-child, twin pairs). Each row of your dataset has TWO related measurements.' },
          { title: 'Your outcome is at least ORDINAL',
            body: 'Continuous, ordinal Likert items, scores out of X, counts. The test works on signed ranks, so any outcome that can be ranked is fair game.' },
          { title: 'You CANNOT defend a parametric paired t-test',
            body: 'Either (a) the per-person DIFFERENCE scores fail Shapiro-Wilk (p < .05) AND your sample is smallish (n < 25 pairs), or (b) the outcome is genuinely ordinal (single Likert items), or (c) extreme outlier differences are present.' },
        ]},

        { type: 'comparison',
          headers: ['Situation', 'Sample / outcome', 'Right test'],
          rows: [
            ['Before vs after anxiety, large n, normal differences',         'n ≥ 30, Shapiro p > .05',  'Paired-samples t-test'],
            ['Before vs after anxiety, small n, skewed differences',          'n = 24, Shapiro p < .05',  '**Wilcoxon signed-rank (this lesson)**'],
            ['Likert satisfaction before vs after a service redesign',        'Ordinal outcome',           '**Wilcoxon signed-rank**'],
            ['Same patients on Drug A vs Drug B (crossover), non-normal diffs','2 conditions, paired',     '**Wilcoxon signed-rank**'],
            ['Two different groups compared, non-normal',                     '2 independent groups',      'Mann-Whitney U (Lesson 1)'],
            ['Same patients across 3+ time points, non-normal',               '3+ paired measurements',    'Friedman test (Lesson 4)'],
            ['Sample mean compared to a hypothesised constant',               '1 sample vs. a value',      'Wilcoxon signed-rank (one-sample variant)'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Dataset must be in WIDE format',
          body: 'Just like the paired t-test, Wilcoxon needs your dataset in WIDE format — two columns, one row per participant (e.g. anxiety_before, anxiety_after). If your data is in LONG format (one column for the score, another for time = 1 or 2), restructure first via Data → Restructure → Restructure selected cases into variables.' },
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running Wilcoxon in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'The 6-step click path' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → Nonparametric Tests → Legacy Dialogs → 2 Related Samples.' },
          { title: 'Move the FIRST variable into the Pair 1 → Variable 1 slot',
            body: 'Click your before/condition-A variable (e.g. **anxiety_before**) → it appears under Pair 1.' },
          { title: 'Move the SECOND variable into the Pair 1 → Variable 2 slot',
            body: 'Click your after/condition-B variable (e.g. **anxiety_after**) → it appears next to the first. You should see Pair 1 listed as **anxiety_before — anxiety_after**.' },
          { title: 'Tick Wilcoxon under Test Type',
            body: 'It\'s the default — confirm it\'s ticked. (Sign, McNemar, and Marginal Homogeneity are alternative paired non-parametric tests for specific situations.)' },
          { title: 'Click OK',
            body: 'SPSS produces two tables: **Ranks** (counts of positive ranks, negative ranks, and ties, plus their sums and mean ranks) and **Test Statistics** (Z statistic and the asymptotic p-value).' },
          { title: 'Read the Ranks table BEFORE the p-value',
            body: 'Always look at the direction first — are there more positive ranks (Variable 2 > Variable 1) or negative ranks (Variable 1 > Variable 2)? This tells you which way the effect goes. The p-value tells you whether that direction is statistically significant.' },
        ]},

        { type: 'illustration', component: 'WilcoxonDialog',
          caption: 'Figure 2. The 2 Related Samples dialog. Drag the first measurement into the Pair 1 → Variable 1 slot, the second into the Variable 2 slot. SPSS computes diff = Variable 2 − Variable 1 (so positive = Variable 2 was higher). Make sure Wilcoxon is ticked under Test Type.' },

        { type: 'callout', tone: 'warning', title: 'Direction matters: SPSS\'s diff = Var2 − Var1',
          body: 'SPSS subtracts Variable 1 from Variable 2 — opposite to the paired t-test dialog. If you put anxiety_before as Variable 1 and anxiety_after as Variable 2, the differences are (after − before). When anxiety drops, the differences are NEGATIVE, so the negative ranks will dominate. This is not a problem; just interpret it correctly. Many students panic at negative-rank dominance — it just means Variable 1 was higher than Variable 2 on average.' },
      ],
    },

    /* ════════════════════ 5. READING OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the SPSS output',
      blocks: [
        { type: 'heading', level: 2, text: 'The two tables that matter' },

        { type: 'illustration', component: 'WilcoxonOutput',
          caption: 'Figure 3. The two Wilcoxon output tables. The Ranks table breaks down the N of negative ranks (Var2 < Var1 → improvement in our anxiety example), positive ranks (Var2 > Var1 → got worse), and ties (no change). The Test Statistics table reports Z and the p-value. A small p with a clear directional dominance in the Ranks table = real change.' },

        { type: 'heading', level: 3, text: 'Table 1 — Ranks' },

        { type: 'comparison',
          headers: ['Row', 'What it shows'],
          rows: [
            ['**Negative Ranks**',  'Number of cases where Variable 2 < Variable 1 (in our anxiety example: students whose anxiety dropped after the session).'],
            ['**Positive Ranks**',  'Number of cases where Variable 2 > Variable 1 (students whose anxiety rose).'],
            ['**Ties**',            'Number of cases where Variable 2 = Variable 1. These are DROPPED from the test.'],
            ['**Total**',           'Sum of all three (full sample size).'],
            ['**Mean Rank** & **Sum of Ranks**', 'Mean rank within each direction and the sum of those ranks. The smaller of the two rank sums is Wilcoxon W.'],
          ]},

        { type: 'heading', level: 3, text: 'Table 2 — Test Statistics' },

        { type: 'comparison',
          headers: ['Row', 'What it shows'],
          rows: [
            ['**Z**',                       'A normal approximation. For effective N > 15-20 (after removing ties) Z is reliable.'],
            ['**Asymp. Sig. (2-tailed)**', 'The p-value from the Z approximation. Use this when your effective N is reasonable.'],
            ['**Exact Sig. (2-tailed)**',  'The exact p-value, shown for smaller samples. Use this when N is small or there are many ties.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Reading the Z direction',
          body: 'SPSS reports Z as either positive or negative. The SIGN of Z tells you the direction: if Z is negative AND there are more negative ranks, your Variable 2 tends to be SMALLER than Variable 1 (in our anxiety example: anxiety decreased — the intervention worked). The MAGNITUDE of Z (and the p-value) tells you whether that change is statistically significant. Report |Z| in your write-up.' },

        { type: 'reveal',
          prompt: 'Your output shows: Negative Ranks N = 18, Positive Ranks N = 4, Ties N = 2; Z = −3.16, Asymp. Sig. (2-tailed) = .002. What do you conclude?',
          answer: '**The counselling session significantly reduced anxiety.** 18 of 22 students who showed any change improved (negative ranks), only 4 got worse, and 2 had identical before/after scores (dropped from the analysis). Z = −3.16, p = .002. The reduction is highly statistically significant. Report: Z = −3.16, p = .002, with a strong negative-rank dominance (18 of 22 students showed improvement). Then compute the effect size r = |Z| / √N where N is the full sample, including ties = 3.16 / √24 = 0.65 — a large effect.' },
      ],
    },

    /* ════════════════════ 6. EFFECT SIZE ════════════════════ */
    {
      id: 'effect-size',
      title: 'Effect size for Wilcoxon signed-rank',
      blocks: [
        { type: 'heading', level: 2, text: 'r = |Z| / √N — same as Mann-Whitney' },

        { type: 'definition', term: 'r (effect size from Z)',
          body: '**r = |Z| ÷ √N**, where Z is from Test Statistics and N is the TOTAL sample (including ties — this is the convention; some sources use effective N excluding ties, but the inclusive N is the more common reporting standard). Cohen\'s benchmarks: **r ≈ .10 small, r ≈ .30 medium, r ≈ .50 large**.' },

        { type: 'workedExample', title: 'Computing r for the anxiety example',
          body: [
            { label: 'Read Z and N',
              text: 'Z = −3.16. Total N = 24 (including the 2 tied cases).' },
            { label: 'Compute',
              text: 'r = |−3.16| / √24 = 3.16 / 4.90 = **0.65**.' },
            { label: 'Interpret',
              text: 'r = 0.65 is well above the .50 large benchmark. The single counselling session produced a large reduction in anxiety, not just a statistically significant one.' },
            { label: 'Report in APA',
              text: '"Z = −3.16, p = .002, r = .65 (large effect)."' },
          ]},

        { type: 'callout', tone: 'gold', title: 'Matched-pairs rank-biserial correlation (alternative)',
          body: 'An alternative effect size sometimes used for Wilcoxon is the **matched-pairs rank-biserial correlation**: r_rb = (Σ R+ − Σ R−) / Σ |R|, where Σ R+ and Σ R− are the positive and negative rank sums, and Σ |R| is the total of all rank magnitudes. SPSS 27+ provides this in the Effect Sizes table. Cohen\'s benchmarks still apply. Either r or r_rb is acceptable; r (Z-based) is more widely reported in education and health journals.' },
      ],
    },

    /* ════════════════════ 7. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — counselling session for exam anxiety',
      blocks: [
        { type: 'workedExample', title: 'A Master\'s study at Egerton University',
          body: [
            { label: 'The research question',
              text: 'Does a single 60-minute counselling session reduce GAD-7 anxiety scores among final-year students experiencing exam anxiety?' },
            { label: 'The design',
              text: 'n = 24 final-year students. GAD-7 administered BEFORE the session and again ONE WEEK after. Paired (within-subject) design.' },
            { label: 'Step 1 — Inspect descriptives and difference distribution',
              text: 'Before: Mdn = 14, IQR = 12-17. After: Mdn = 12, IQR = 9-14. Compute the difference column (after − before): most differences are between −1 and −3, but two students improved dramatically (differences of −8 and −7) and two got slightly worse (+2, +4). Shapiro-Wilk on differences p = .002 → non-normal. Decision: paired t-test not defensible → use Wilcoxon signed-rank.' },
            { label: 'Step 2 — Run Wilcoxon',
              text: 'Analyze → Nonparametric Tests → Legacy Dialogs → 2 Related Samples → drag anxiety_before to Variable 1 and anxiety_after to Variable 2 → Wilcoxon ticked → OK.' },
            { label: 'Step 3 — Read the Ranks table',
              text: 'Negative Ranks (anxiety_after < anxiety_before, i.e. improvement) = 18, Mean Rank = 12.4, Sum of Ranks = 223.5. Positive Ranks (got worse) = 4, Mean Rank = 7.1, Sum of Ranks = 28.5. Ties = 2. Overwhelming negative-rank dominance — improvement.' },
            { label: 'Step 4 — Read the Test Statistics table',
              text: 'Z = −3.16. Asymp. Sig. (2-tailed) = .002.' },
            { label: 'Step 5 — Compute effect size',
              text: 'r = |−3.16| / √24 = 0.65. Large effect.' },
            { label: 'Step 6 — APA write-up',
              text: '*"A Wilcoxon signed-rank test was conducted to evaluate whether a single 60-minute counselling session reduced GAD-7 anxiety scores in 24 final-year students at Egerton University. The non-parametric test was selected because the per-person difference scores were not normally distributed (Shapiro-Wilk p = .002). Median anxiety decreased from 14 (IQR = 12-17) before the session to 12 (IQR = 9-14) one week after. Eighteen of the 22 students who showed any change reported lower scores, four reported higher scores, and two showed no change. The reduction was statistically significant, Z = −3.16, p = .002, r = .65, indicating a large effect. The findings suggest that even a single counselling session produces a substantial short-term reduction in exam anxiety."*' },
          ]},
      ],
    },

    /* ════════════════════ 8. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing Wilcoxon up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A Wilcoxon signed-rank test was conducted to compare [OUTCOME] [before vs. after / under condition A vs. condition B] in [n] [participants description]. The non-parametric test was selected because [the per-person difference scores were not normally distributed (Shapiro-Wilk p = X) / the outcome was ordinal]. Median [OUTCOME] [increased / decreased / did not change] from [Mdn_before] (IQR = [Q1-Q3]) at [Time 1] to [Mdn_after] (IQR = [Q1-Q3]) at [Time 2]. [N_neg] of the [N_changed] participants who showed any change reported [direction], [N_pos] reported [opposite], and [N_ties] showed no change. The [direction] was [statistically significant / not statistically significant], Z = [Z-value], p = [p-value], r = [r-value], indicating a [small / medium / large] effect.' },

        { type: 'callout', tone: 'success', title: 'Eight things every Wilcoxon write-up must include',
          body: '**1.** The test name. **2.** Why you chose non-parametric (the assumption violation). **3.** Number of pairs (total and effective, after dropping ties). **4.** MEDIANS and IQRs for each condition (not means). **5.** Direction summary (how many improved, how many got worse, how many tied). **6.** Z. **7.** The p-value. **8.** Effect size r with verbal interpretation.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why a Wilcoxon signed-rank test rather than a paired-samples t-test?',
              a: 'The per-person difference scores (anxiety_after − anxiety_before) failed Shapiro-Wilk normality (p = .002), driven by two outlier improvements and a small sample (n = 24). The paired t-test\'s normality assumption could not be defended at this sample size. Wilcoxon signed-rank is the non-parametric equivalent — it works on signed ranks of the differences rather than the raw values, is robust to outliers, and does not assume normality.' },
            { q: 'Why did you report medians and IQRs rather than means and SDs?',
              a: 'Wilcoxon compares signed-rank distributions, not means. Reporting mean ± SD alongside a non-parametric test would be inconsistent — those statistics are exactly what the test was chosen to avoid. The MEDIAN and IQR are the appropriate descriptive summaries for non-parametric tests because they describe central tendency and spread without being distorted by outlier differences.' },
            { q: 'Two participants had a difference of zero. How were they handled?',
              a: 'Wilcoxon signed-rank cannot meaningfully rank zero differences (they have no direction), so SPSS automatically excludes ties. The two participants with zero change were dropped from the test itself, reducing the effective N to 22 ranked cases. They are still counted in the descriptive statistics and reported in the Ranks table as "Ties = 2", as is standard practice.' },
          ]},
      ],
    },

    /* ════════════════════ 9. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five common Wilcoxon mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Confusing Wilcoxon signed-rank with Wilcoxon rank-sum (= Mann-Whitney)',
          body: 'Two completely different tests, both named after Frank Wilcoxon. **Wilcoxon signed-rank** is for PAIRED data (this lesson). **Wilcoxon rank-sum** is mathematically equivalent to Mann-Whitney U and is for INDEPENDENT data. They are NOT interchangeable.',
          fix: 'Check your design first. Same participants in both conditions → signed-rank. Different participants in each condition → rank-sum (= Mann-Whitney). If your supervisor just says "Wilcoxon", ask them to specify which.' },

        { type: 'mistake',
          title: 'Mistake 2 — Reporting means and SDs with a non-parametric test',
          body: 'You ran Wilcoxon because the differences were non-normal, then in Chapter 4 you wrote "Anxiety dropped from M = 14.2, SD = 3.1 to M = 11.8, SD = 4.7." Means and SDs are exactly the statistics that the non-parametric framework avoids — and your SD is inflated by the two outlier improvements that drove you to Wilcoxon in the first place.',
          fix: 'Report MEDIAN and IQR for each condition. "Anxiety dropped from Mdn = 14 (IQR = 12-17) to Mdn = 12 (IQR = 9-14)." Means and SDs belong with parametric tests.' },

        { type: 'mistake',
          title: 'Mistake 3 — Testing normality on the two raw columns instead of the differences',
          body: 'You ran Shapiro-Wilk on anxiety_before and anxiety_after separately, found both non-normal, and switched to Wilcoxon. But the paired test only assumes the DIFFERENCE scores are normal — the two raw columns can be wildly non-normal and the differences still perfectly fine.',
          fix: 'Always compute the difference (Transform → Compute Variable → diff = after − before), then run Shapiro-Wilk on THAT new variable. Only switch to Wilcoxon if the differences fail normality, not if the raw columns do.' },

        { type: 'mistake',
          title: 'Mistake 4 — Ignoring the Ranks table and jumping to the p-value',
          body: 'You report "Wilcoxon was significant, p = .002" but never look at the Ranks table. Your reader has no idea whether anxiety went UP or DOWN, or by how much, or whether most people moved in the same direction or whether the result is driven by a handful of outliers.',
          fix: 'Always read the Ranks table FIRST. Report the count of negative ranks, positive ranks, and ties. Use direction language: "18 of 22 changed students improved, 4 got worse, 2 showed no change."' },

        { type: 'mistake',
          title: 'Mistake 5 — Omitting effect size r',
          body: 'You report "Z = −3.16, p = .002" and stop. With a moderate sample, even a small change can be significant; the reader cannot tell whether the intervention produced a trivial or substantial effect.',
          fix: 'Always compute **r = |Z| / √N** with N = full sample (including ties), and interpret with Cohen\'s benchmarks (.10 small, .30 medium, .50 large). For our example r = .65 — a large effect that justifies the substantive claim.' },
      ],
    },

    /* ════════════════════ 10. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Wilcoxon signed-rank is the non-parametric alternative to the paired-samples t-test — same data shape, different (more robust) maths.',
          'It works on the SIGNED RANKS of the per-person differences — magnitudes ranked, then the original signs (+ for after > before, − for before > after) re-attached.',
          'Use it when: paired data, ordinal-or-worse outcome, difference scores fail Shapiro-Wilk with smallish samples, or extreme outlier differences.',
          'Dataset must be in WIDE format (one row per participant, two columns).',
          'Run via Analyze → Nonparametric Tests → Legacy Dialogs → 2 Related Samples → drag both variables into Pair 1 → Wilcoxon ticked → OK.',
          'Cases with a difference of zero (ties) are dropped from the analysis — effective N = total N minus ties.',
          'Report MEDIANS and IQRs for each condition (not means).',
          'Always look at the Ranks table FIRST (direction), then the Test Statistics (significance).',
          'Effect size r = |Z| / √N. Benchmarks: .10 small, .30 medium, .50 large.',
          'Five mistakes to avoid: confusing with rank-sum, mean ± SD reporting, normality-testing the raw columns, skipping the Ranks table, omitting r.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 3: Kruskal-Wallis test** we generalise from 2 groups to 3+ independent groups — the non-parametric equivalent of the one-way ANOVA.' },

        { type: 'paragraph', text:
          'Before moving on, find a paired dataset (before/after, condition A/B) where the differences are non-normal. Run Wilcoxon, report medians + IQRs, count the negative/positive/tied ranks, compute r, and write the APA paragraph. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'When is Wilcoxon signed-rank the right test instead of a paired-samples t-test?',
          choices: [
            'When you have 2 independent groups',
            'When you have paired (within-subject) data AND the per-person DIFFERENCE scores are not normally distributed',
            'When the two raw columns are not normal but the differences ARE',
            'Always — non-parametric is safer',
          ],
          answer: 1,
          explanation: 'Wilcoxon signed-rank is the non-parametric equivalent of the paired-samples t-test. Use it when (a) data is paired AND (b) the per-person DIFFERENCE scores fail normality (Shapiro-Wilk on the diff column) — not when the raw columns fail. With independent groups use Mann-Whitney U. With normal differences and reasonable sample size the parametric paired t-test is more powerful.' },

        { type: 'check',
          question: 'In Wilcoxon signed-rank, what happens to a participant whose difference score is exactly 0?',
          choices: [
            'They count as a negative rank',
            'They count as a positive rank',
            'They are DROPPED from the analysis (ties at zero cannot be meaningfully ranked); the effective N is reduced',
            'They are weighted twice',
          ],
          answer: 2,
          explanation: 'A difference of zero has no direction — it cannot be assigned a positive or negative sign. SPSS automatically excludes these "ties" and computes the test on the remaining cases. The Ranks table reports how many ties were dropped. If too many cases are dropped (effective N becomes very small), statistical power suffers.' },

        { type: 'check',
          question: 'You ran Wilcoxon because anxiety differences were non-normal. What descriptives should you report?',
          choices: [
            'Mean and standard deviation per condition',
            'MEDIAN and INTERQUARTILE RANGE (IQR) per condition — the descriptive statistics consistent with a non-parametric test',
            'Variance and skewness',
            'Only the Z statistic',
          ],
          answer: 1,
          explanation: 'Non-parametric tests like Wilcoxon work on ranks, not means. Reporting mean ± SD alongside Wilcoxon is inconsistent — those statistics are exactly what the test was chosen to avoid. The MEDIAN (with IQR for spread) is the appropriate descriptive for non-parametric tests because it isn\'t distorted by outliers or skew in the difference scores.' },

        { type: 'check',
          question: 'Your output gives Z = −3.16, p = .002, total N = 24. What is the effect size r?',
          choices: [
            'r = N × Z = 24 × 3.16 = 75.8',
            'r = |Z| / √N = 3.16 / √24 = 0.65 — a large effect',
            'r = p × 100 = 0.2',
            'r = Z / 2 = −1.58',
          ],
          answer: 1,
          explanation: 'The standard effect size for Wilcoxon signed-rank is r = |Z| / √N, where N is the total sample (including ties). Here 3.16 / √24 = 3.16 / 4.90 = 0.65 — well above the .50 large-effect benchmark. The intervention produced a large reduction in anxiety, not just a statistically significant one.' },

        { type: 'check',
          question: 'Your Ranks table shows: Negative Ranks N = 18, Positive Ranks N = 4, Ties = 2. In an anxiety pre/post design (with anxiety_before as Variable 1 and anxiety_after as Variable 2), what does this mean?',
          choices: [
            '18 students got more anxious',
            '18 of the 22 students who showed any change had LOWER anxiety after the session (improvement); 4 got worse; 2 had no change',
            'There were 4 conditions in the study',
            'The test is invalid',
          ],
          answer: 1,
          explanation: 'SPSS computes diff = Variable 2 − Variable 1. Negative ranks mean Variable 2 < Variable 1 — in our setup, anxiety_after < anxiety_before — i.e. the student\'s anxiety dropped. 18 students improved, 4 got worse, 2 showed no change. Always read the Ranks table first to establish direction BEFORE jumping to the p-value.' },

        { type: 'check',
          question: 'Wilcoxon signed-rank and Wilcoxon rank-sum are the same test, right?',
          choices: [
            'Yes — they are identical',
            'No — Wilcoxon signed-rank is for PAIRED data (= non-parametric paired t-test); Wilcoxon rank-sum is for INDEPENDENT data (= Mann-Whitney U)',
            'Yes, but only on weekends',
            'They differ only in sample size requirements',
          ],
          answer: 1,
          explanation: 'Two completely different tests named after Frank Wilcoxon. SIGNED-RANK is for paired/within-subject designs and uses the signs of difference scores. RANK-SUM is mathematically equivalent to Mann-Whitney U and is for two independent groups. They are NOT interchangeable. Always specify which one you mean.' },
      ],
    },
  ],
};
