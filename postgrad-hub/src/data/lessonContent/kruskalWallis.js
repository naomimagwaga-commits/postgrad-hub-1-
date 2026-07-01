/**
 * Non-parametric · Lesson 3 — Kruskal-Wallis H test
 * The non-parametric alternative to the one-way ANOVA.
 */

export const KRUSKAL_WALLIS_LESSON = {
  id: 'np-3',
  title: 'Kruskal-Wallis H test',
  subtitle: 'Module 03 · Course: Non-parametric tests · Lesson 3 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'Three or more independent groups, non-normal data',
      blocks: [
        { type: 'scene', body: [
          'You are doing a PhD at Strathmore University on women\'s entrepreneurship. You collected monthly business revenue from 87 women micro-entrepreneurs across THREE different chama (savings group) models: traditional rotating chamas (n = 30), accumulating savings chamas (n = 28), and digital m-chamas linked to Faulu/KCB (n = 29). You want to know whether the type of chama is associated with different revenue levels.',
          'Your first instinct is one-way ANOVA — three groups, one continuous outcome. But when you plot the data you see what every researcher of small-enterprise revenue eventually sees: a sharp peak at the low end, a long tail of a few highly successful businesses, and a Shapiro-Wilk test that returns p < .001 in all three groups. The data is severely right-skewed in every group.',
          'With small-to-moderate group sizes and severe non-normality, you cannot defend a one-way ANOVA in your defence. You need the non-parametric equivalent: a test that compares MEDIANS (or stochastic dominance) across 3+ independent groups without requiring normality. That test is the **Kruskal-Wallis H test** — essentially the Mann-Whitney logic extended from 2 groups to 3 or more.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise** when Kruskal-Wallis is the right replacement for a one-way ANOVA.',
            '**Explain** how it extends the rank-based logic from Mann-Whitney to 3+ groups.',
            '**Run** the test in SPSS via Analyze → Nonparametric Tests → Legacy Dialogs → K Independent Samples.',
            '**Read** the SPSS output — Ranks table, Test Statistics, and the H (chi-square) statistic.',
            '**Follow up** with post-hoc pairwise Mann-Whitney comparisons WITH Bonferroni correction — the standard workflow.',
            '**Compute and report** the standard effect size η²_H.',
            '**Write up** the result in APA style with all the elements your reviewer will look for.',
          ]},

        { type: 'why', body:
          'Almost every Kenyan postgrad project comparing 3+ groups on a continuous outcome — three counties, three teaching methods, three treatment arms, three socio-economic bands — runs into non-normality at some point. Kruskal-Wallis is the standard non-parametric backup you will need at least once in your degree.' },
      ],
    },

    /* ════════════════════ 2. BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — Mann-Whitney with 3+ groups',
      blocks: [
        { type: 'heading', level: 2, text: 'Same ranking trick, extended' },

        { type: 'paragraph', text:
          'Kruskal-Wallis works on exactly the same principle as Mann-Whitney: pool every case from all groups, rank them from smallest to largest, then ask whether the rank sums differ across the groups by more than chance would predict. The mathematical machinery generalises Mann-Whitney from 2 groups to any number of groups (3, 4, 5, …), and the resulting test statistic H follows (approximately) a chi-square distribution with k − 1 degrees of freedom.' },

        { type: 'illustration', component: 'KruskalWallisLogic',
          caption: 'Figure 1. How Kruskal-Wallis works. (1) Pool all cases from all k groups. (2) Rank from smallest to largest. (3) Compute the sum of ranks within each group. (4) If the groups all come from the same distribution, the rank sums should be roughly proportional to group size — no clear group separation. (5) H quantifies how much the observed rank sums deviate from that expectation. A large H = real group differences.' },

        { type: 'definition', term: 'Kruskal-Wallis H statistic',
          body: 'A measure of how unevenly the ranks are distributed across the k groups. Computed as **H = [12 / (N(N+1))] × Σ (R_j² / n_j) − 3(N+1)**, where R_j is the sum of ranks in group j, n_j is its size, and N is the total sample. H is compared to a chi-square distribution with k − 1 degrees of freedom. SPSS reports it as "Chi-Square" in the Test Statistics table.' },

        { type: 'analogy', title: 'Three school tuition queues',
          body: 'Three primary schools (Form 1 from Alliance, Mang\'u, and Starehe) send their pupils to register for KCPE coaching at a single venue. Pupils from all three schools queue together. After registration, you check the queue order: did pupils from Mang\'u tend to arrive earliest (low ranks), pupils from Alliance in the middle, and Starehe latest (high ranks)? Or were they evenly mixed across all positions? Kruskal-Wallis is exactly this kind of comparison — it asks whether the queue POSITIONS of cases from different groups are systematically different, regardless of the actual times.' },

        { type: 'reveal',
          prompt: 'You have 3 groups with very different sizes (n = 5, 25, 50). Why is Kruskal-Wallis safer than ANOVA here?',
          answer: '**Because ANOVA\'s F-test is sensitive to unequal variances AND unequal group sizes simultaneously, while Kruskal-Wallis only assumes the groups\' rank distributions are comparable.** With n = 5, normality is essentially impossible to check (Shapiro-Wilk is unreliable below n = 8) and the Central Limit Theorem does not save you. Kruskal-Wallis doesn\'t care about normality OR group-size imbalance — it just compares mean ranks. Always prefer Kruskal-Wallis when at least one group is small AND the data is non-normal.' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When Kruskal-Wallis is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The three conditions' },

        { type: 'steps', steps: [
          { title: 'THREE OR MORE INDEPENDENT groups',
            body: 'Same set-up as one-way ANOVA — k groups (where k ≥ 3) of different people. Each case belongs to ONE group only, no pairing/clustering. With 2 groups use Mann-Whitney (Lesson 1). With repeated measurements on the same people use Friedman (Lesson 4).' },
          { title: 'Your outcome is at least ORDINAL',
            body: 'Continuous, ordinal Likert items, scores out of X, counts. The test works on ranks, so any outcome that can be ranked is fair game.' },
          { title: 'You CANNOT defend a one-way ANOVA',
            body: 'Either (a) at least one group has small n AND non-normal data, (b) the outcome is genuinely ordinal (single Likert items), (c) extreme outliers are present, or (d) variances are wildly unequal AND non-normal (so Welch ANOVA isn\'t a clean fix either).' },
        ]},

        { type: 'comparison',
          headers: ['Situation', 'Sample & normality', 'Right test'],
          rows: [
            ['3 teaching methods, large samples, normal',                  'n ≥ 30 each, Shapiro p > .05',  'One-way ANOVA (anova-1)'],
            ['3 chama types, small samples, severely skewed revenue',       'n ≈ 30 each, Shapiro p < .001', '**Kruskal-Wallis (this lesson)**'],
            ['3 counties\' Likert satisfaction ratings',                    'Ordinal outcome',                '**Kruskal-Wallis**'],
            ['4 clinics, time-to-treatment, heavy skew + outliers',         'any n, badly skewed',            '**Kruskal-Wallis**'],
            ['2 groups only',                                               'any',                            'Mann-Whitney (Lesson 1)'],
            ['Same patients across 3+ time points',                         'paired',                          'Friedman test (Lesson 4)'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Same shape assumption',
          body: 'Like Mann-Whitney, Kruskal-Wallis strictly compares MEDIANS only when the k distributions have the same SHAPE (just shifted left/right). When shapes differ markedly, the test compares STOCHASTIC DOMINANCE — "do some groups tend to produce higher values than others?". Eyeball the boxplots; if shapes are similar, median language is safe. If shapes differ markedly, use "tend to be higher" instead of "have a higher median".' },
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running Kruskal-Wallis in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'The 6-step click path' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → Nonparametric Tests → Legacy Dialogs → K Independent Samples.' },
          { title: 'Move your outcome to Test Variable List',
            body: 'The continuous or ordinal variable (e.g. **monthly_revenue**).' },
          { title: 'Move your grouping variable to Grouping Variable',
            body: 'The categorical variable with 3+ levels (e.g. **chama_type** coded 1 = traditional, 2 = accumulating, 3 = digital). It will appear as **chama_type(? ?)**.' },
          { title: 'Click Define Range',
            body: 'Type the minimum and maximum codes (Minimum: 1, Maximum: 3 for three groups coded 1, 2, 3). Click Continue.' },
          { title: 'Tick "Kruskal-Wallis H" under Test Type',
            body: 'It\'s the default. (Median test and Jonckheere-Terpstra are alternatives for specific situations.)' },
          { title: 'Click OK',
            body: 'SPSS produces two tables: **Ranks** (mean rank per group) and **Test Statistics** (H labelled "Chi-Square", df, Asymp. Sig.).' },
        ]},

        { type: 'illustration', component: 'KruskalWallisDialog',
          caption: 'Figure 2. The K Independent Samples dialog. Test Variable List = the continuous outcome (monthly_revenue). Grouping Variable = the categorical 3+-level grouping variable (chama_type). After dragging it across, click Define Range and type your minimum and maximum codes (e.g. 1 and 3).' },

        { type: 'callout', tone: 'gold', title: 'For pairwise post-hoc, use the modern dialog',
          body: 'The Legacy K Independent Samples dialog gives you the overall test, but no built-in post-hoc. If you need automatic pairwise post-hoc with Bonferroni correction, run the test through Analyze → Nonparametric Tests → Independent Samples (the MODERN automated dialog). When the overall test is significant, double-click the output to open the Model Viewer, then choose "Pairwise Comparisons" — SPSS does the Mann-Whitney pairs and Bonferroni adjustment for you.' },
      ],
    },

    /* ════════════════════ 5. READING OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the SPSS output',
      blocks: [
        { type: 'heading', level: 2, text: 'The two tables and the H statistic' },

        { type: 'illustration', component: 'KruskalWallisOutput',
          caption: 'Figure 3. The two Kruskal-Wallis output tables. The Ranks table shows the mean rank for each of the k groups. The Test Statistics table reports H (labelled "Chi-Square"), df = k − 1, and Asymp. Sig. (the p-value). A significant H tells you SOMETHING differs across the groups; post-hoc Mann-Whitney comparisons identify WHICH pairs differ.' },

        { type: 'heading', level: 3, text: 'Table 1 — Ranks' },

        { type: 'comparison',
          headers: ['Column', 'What it shows'],
          rows: [
            ['Group label',  'The category names from your value labels (e.g. Traditional, Accumulating, Digital).'],
            ['**N**',         'Number of cases per group.'],
            ['**Mean Rank**', 'Average rank for each group. The group with the highest mean rank tends to have the highest values; the group with the lowest mean rank tends to have the lowest values. Report all three.'],
          ]},

        { type: 'heading', level: 3, text: 'Table 2 — Test Statistics' },

        { type: 'comparison',
          headers: ['Row', 'What it shows'],
          rows: [
            ['**Chi-Square (H)**', 'The H statistic. SPSS labels it "Chi-Square" because H is compared to a chi-square distribution.'],
            ['**df**',              'Degrees of freedom = k − 1, where k = number of groups. For 3 groups, df = 2.'],
            ['**Asymp. Sig.**',     'The p-value. If < .05, at least one group differs from at least one other.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'A significant H is only the BEGINNING',
          body: 'Just like a significant F in one-way ANOVA, a significant H tells you that SOMETHING differs across the groups — but not WHICH pairs differ. You must follow up with **pairwise Mann-Whitney comparisons WITH Bonferroni correction**. The next section walks you through this.' },

        { type: 'reveal',
          prompt: 'Your output shows: Chi-Square (H) = 12.84, df = 2, Asymp. Sig. = .002. Mean ranks: Traditional = 32.1, Accumulating = 41.7, Digital = 58.4. What can you conclude?',
          answer: '**At least one chama type differs significantly in revenue from at least one other, with Digital chamas tending to have the highest revenues and Traditional the lowest.** H = 12.84, df = 2, p = .002 — strong evidence that revenue distributions differ across the three chama types. The mean rank ordering (Digital > Accumulating > Traditional) suggests the direction. But you cannot say "Digital is significantly higher than Accumulating" — that requires pairwise Mann-Whitney follow-up. Next step: run three Mann-Whitney tests (T vs A, T vs D, A vs D) and adjust p-values using Bonferroni (× 3).' },
      ],
    },

    /* ════════════════════ 6. POST-HOC ════════════════════ */
    {
      id: 'post-hoc',
      title: 'Post-hoc — pairwise Mann-Whitney with Bonferroni',
      blocks: [
        { type: 'heading', level: 2, text: 'Identifying which pairs actually differ' },

        { type: 'paragraph', text:
          'When your Kruskal-Wallis is significant, the next question is: WHICH specific pairs of groups differ? The standard procedure is to run **pairwise Mann-Whitney U tests** for every combination of two groups, then **Bonferroni-correct** the resulting p-values to control the family-wise error rate.' },

        { type: 'steps', steps: [
          { title: 'Identify all pairwise combinations',
            body: 'For k groups, the number of pairs is k × (k − 1) / 2. For 3 groups: 3 pairs (1v2, 1v3, 2v3). For 4 groups: 6 pairs. For 5 groups: 10 pairs.' },
          { title: 'Run a Mann-Whitney U for each pair',
            body: 'Use Data → Select Cases to keep only the two groups of interest, then run Mann-Whitney as in Lesson 1. Repeat for every pair. Record each p-value.' },
          { title: 'Apply Bonferroni correction',
            body: 'Multiply each pairwise p-value by the number of pairs, OR compare each raw p to a stricter α (e.g. .05/3 = .017 for 3 pairs). A pair is significant only if its corrected p < .05.' },
          { title: 'Use the SPSS automatic post-hoc (modern dialog)',
            body: 'If you ran Kruskal-Wallis through the MODERN dialog (Analyze → Nonparametric Tests → Independent Samples), double-click the output → "View" → "Pairwise Comparisons". SPSS reports the standardised test statistic for every pair AND an Adj. Sig. column with the Bonferroni-corrected p-value. Use this whenever you have it — it saves you 10 minutes per analysis.' },
        ]},

        { type: 'comparison',
          headers: ['Pair', 'Raw Mann-Whitney p', 'Bonferroni-corrected p', 'Significant?'],
          rows: [
            ['Traditional vs Accumulating', '.041',  '.041 × 3 = .123',  'No'],
            ['Traditional vs Digital',       '.0005', '.0005 × 3 = .0015', 'YES — Digital significantly higher than Traditional'],
            ['Accumulating vs Digital',      '.012',  '.012 × 3 = .036',   'YES — Digital significantly higher than Accumulating'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Report each pairwise comparison',
          body: 'In your write-up, list every pairwise comparison with its corrected p-value, not just the significant ones. Examiners want to see that you ran the full set and that the family-wise error rate is controlled. A typical sentence: "Pairwise Mann-Whitney comparisons (Bonferroni-corrected) showed that digital chamas significantly outperformed both traditional (p = .002) and accumulating (p = .036) chamas; the traditional vs accumulating difference was not significant (p = .123)."' },
      ],
    },

    /* ════════════════════ 7. EFFECT SIZE ════════════════════ */
    {
      id: 'effect-size',
      title: 'Effect size — eta-squared based on H',
      blocks: [
        { type: 'definition', term: 'η²_H (eta-squared based on H)',
          body: '**η²_H = (H − k + 1) ÷ (N − k)**, where H is the test statistic, k is the number of groups, and N is the total sample. Ranges from 0 (no effect) to ≈ 1 (perfect group separation). Interpretation benchmarks (same as ANOVA η²): **.01 small, .06 medium, .14 large**.' },

        { type: 'workedExample', title: 'Computing η²_H for the chama example',
          body: [
            { label: 'Read H, k, N from output',
              text: 'H = 12.84 (the Chi-Square value). k = 3 groups. N = 87 total.' },
            { label: 'Compute',
              text: 'η²_H = (12.84 − 3 + 1) / (87 − 3) = 10.84 / 84 = **0.129**.' },
            { label: 'Interpret',
              text: 'η²_H = .13 sits just below the .14 large benchmark — a medium-to-large effect. Chama type accounts for about 13% of the rank variance in monthly revenue.' },
            { label: 'Report in APA',
              text: '"H(2) = 12.84, p = .002, η²_H = .13 (large effect)."' },
          ]},

        { type: 'callout', tone: 'gold', title: 'For pairwise post-hoc effect sizes',
          body: 'Each pairwise Mann-Whitney comparison should also report its own effect size r = |Z| / √(n₁ + n₂). This gives the magnitude of each specific group-pair difference. Report η²_H for the overall test AND r for each significant pairwise comparison.' },
      ],
    },

    /* ════════════════════ 8. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — revenue across three chama types',
      blocks: [
        { type: 'workedExample', title: 'A PhD study at Strathmore University',
          body: [
            { label: 'The research question',
              text: 'Do women micro-entrepreneurs in three different chama models (traditional rotating, accumulating savings, digital m-chamas) report different monthly business revenues?' },
            { label: 'The data',
              text: 'n = 87 women entrepreneurs (30 in traditional, 28 in accumulating, 29 in digital). Outcome: **monthly_revenue** in KES (continuous but severely right-skewed). Grouping variable: **chama_type** (1 = traditional, 2 = accumulating, 3 = digital).' },
            { label: 'Step 1 — Inspect descriptives and check normality',
              text: 'Traditional: Mdn = KES 18,000, IQR = 12,000-28,000. Accumulating: Mdn = KES 24,000, IQR = 17,000-39,000. Digital: Mdn = KES 36,000, IQR = 24,000-58,000. Shapiro-Wilk significant in all three groups (all p < .001). Decision: one-way ANOVA not defensible → use Kruskal-Wallis.' },
            { label: 'Step 2 — Run Kruskal-Wallis',
              text: 'Analyze → Nonparametric Tests → Legacy Dialogs → K Independent Samples → monthly_revenue to Test Variable List, chama_type(1, 3) to Grouping Variable, Kruskal-Wallis H ticked, OK.' },
            { label: 'Step 3 — Read the Ranks table',
              text: 'Traditional: Mean Rank = 32.1. Accumulating: Mean Rank = 41.7. Digital: Mean Rank = 58.4. Clear ordering — digital chamas rank highest.' },
            { label: 'Step 4 — Read the Test Statistics',
              text: 'Chi-Square (H) = 12.84. df = 2. Asymp. Sig. = .002.' },
            { label: 'Step 5 — Pairwise Mann-Whitney with Bonferroni',
              text: 'T vs A: U = 332.0, p_raw = .041, p_Bonf = .123 (not significant). T vs D: U = 187.5, p_raw = .0005, p_Bonf = .002 (significant). A vs D: U = 248.5, p_raw = .012, p_Bonf = .036 (significant).' },
            { label: 'Step 6 — Compute effect size',
              text: 'η²_H = (12.84 − 3 + 1) / (87 − 3) = 10.84 / 84 = 0.13. Medium-to-large effect.' },
            { label: 'Step 7 — APA write-up',
              text: '*"A Kruskal-Wallis H test was conducted to compare monthly business revenue across three chama types: traditional rotating (n = 30), accumulating savings (n = 28), and digital m-chamas (n = 29). The non-parametric test was chosen because monthly revenue was severely right-skewed in all three groups (all Shapiro-Wilk p < .001). Median revenue was KES 18,000 (IQR = 12,000-28,000) for traditional, KES 24,000 (IQR = 17,000-39,000) for accumulating, and KES 36,000 (IQR = 24,000-58,000) for digital chamas. The omnibus test was significant, H(2) = 12.84, p = .002, η²_H = .13, indicating a medium-to-large effect of chama type on revenue. Pairwise Mann-Whitney comparisons (Bonferroni-corrected) revealed that digital chamas produced significantly higher revenues than both traditional (p = .002) and accumulating (p = .036) chamas; the traditional vs accumulating contrast was not statistically significant (p = .123). The findings suggest that participation in digital m-chama platforms is associated with substantially higher business revenues than either traditional or accumulating models."*' },
          ]},
      ],
    },

    /* ════════════════════ 9. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing Kruskal-Wallis up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A Kruskal-Wallis H test was conducted to compare [OUTCOME] across [k] [groups description]. The non-parametric test was chosen because [the outcome was severely non-normal / ordinal / had extreme outliers]. Median [OUTCOME] was [Mdn₁] (IQR = [Q1-Q3]) for [Group 1], [Mdn₂] (IQR = [Q1-Q3]) for [Group 2], and [Mdn₃] (IQR = [Q1-Q3]) for [Group 3]. The omnibus test was [significant / not significant], H([df]) = [H-value], p = [p-value], η²_H = [value], indicating a [small / medium / large] effect. Pairwise Mann-Whitney comparisons (Bonferroni-corrected) revealed that [list each significant and non-significant pair with corrected p-values].' },

        { type: 'callout', tone: 'success', title: 'Seven things every Kruskal-Wallis write-up must include',
          body: '**1.** The test name. **2.** Why non-parametric (the assumption violation). **3.** Sample sizes per group. **4.** MEDIAN and IQR for each group. **5.** H, df, and p. **6.** Effect size η²_H. **7.** Pairwise Mann-Whitney follow-up with Bonferroni-corrected p-values (if H was significant).' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why a Kruskal-Wallis test rather than a one-way ANOVA?',
              a: 'Monthly business revenue was severely right-skewed in all three chama groups (Shapiro-Wilk p < .001 in each), with extreme outliers driven by a small number of highly successful businesses. Group sample sizes (28-30) were below the rule-of-thumb threshold (n ≥ 30 per group) for confidently invoking the Central Limit Theorem. Under these conditions a parametric one-way ANOVA could not be defended. Kruskal-Wallis H is the standard non-parametric alternative — it compares rank distributions across groups, is robust to outliers and free of the normality assumption, and is the appropriate omnibus test for three or more independent groups.' },
            { q: 'Why did you use Bonferroni correction for the post-hoc comparisons?',
              a: 'Running three pairwise Mann-Whitney comparisons at α = .05 each inflates the family-wise Type I error rate to approximately .14. Bonferroni correction (multiplying each pairwise p by the number of comparisons, or equivalently comparing each raw p to .05/3 = .017) restores the family-wise error rate to the conventional .05 level. This is the standard procedure for Kruskal-Wallis post-hoc analysis.' },
            { q: 'Why report η²_H in addition to the p-value?',
              a: 'The p-value indicates whether the observed group differences are unlikely to be due to chance, but it does not quantify HOW MUCH of the variance in the outcome is explained by group membership. η²_H is the rank-based analog of the ANOVA eta-squared — it expresses the proportion of total rank variance accounted for by group. Cohen\'s standard benchmarks (.01 small, .06 medium, .14 large) apply, allowing the reader to judge practical importance, not just statistical significance.' },
          ]},
      ],
    },

    /* ════════════════════ 10. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five common Kruskal-Wallis mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Skipping post-hoc when H is significant',
          body: 'You report "H(2) = 12.84, p = .002 — the three chama types differ significantly" and stop. The reader has no idea WHICH chamas differ from which. You\'ve run the equivalent of an unfollowed-up ANOVA.',
          fix: 'A significant H tells you SOMETHING differs; pairwise Mann-Whitney comparisons (Bonferroni-corrected) tell you WHICH pairs differ. Always run them after a significant Kruskal-Wallis.' },

        { type: 'mistake',
          title: 'Mistake 2 — Running three pairwise Mann-Whitneys WITHOUT Bonferroni',
          body: 'You skip the omnibus Kruskal-Wallis altogether and just run three Mann-Whitney tests at α = .05. Cumulative false-positive rate rises to about 14%.',
          fix: 'Always start with the omnibus Kruskal-Wallis. If it\'s significant, follow up with pairwise Mann-Whitney comparisons AND apply Bonferroni correction (or use SPSS\'s automatic adjustment in the modern dialog).' },

        { type: 'mistake',
          title: 'Mistake 3 — Reporting means and SDs',
          body: 'You ran Kruskal-Wallis because the data was skewed, then in Chapter 4 you wrote "Traditional: M = KES 22,400, SD = 18,900..." The means and SDs are exactly the statistics the non-parametric test was chosen to avoid.',
          fix: 'Report MEDIAN and IQR for each group. Means and SDs are for ANOVA/t-tests; medians and IQRs are for Kruskal-Wallis/Mann-Whitney/Wilcoxon.' },

        { type: 'mistake',
          title: 'Mistake 4 — Confusing the H statistic for a regular chi-square',
          body: 'You see "Chi-Square = 12.84" in the output and start writing about chi-square tests of independence. You\'ve confused the H statistic (which is COMPARED to a chi-square distribution) with the chi-square test of association.',
          fix: 'SPSS labels H as "Chi-Square" because it follows a chi-square distribution. In your write-up call it the **Kruskal-Wallis H statistic**, not "chi-square". Report it as H(df) = value, p = value.' },

        { type: 'mistake',
          title: 'Mistake 5 — Using Kruskal-Wallis on repeated measurements',
          body: 'You measured the same patients at three time points and ran Kruskal-Wallis. The test assumes the k samples are independent; repeated measurements break that assumption.',
          fix: 'When the same participants are measured 3+ times, use the **Friedman test** (Lesson 4) — the non-parametric equivalent of repeated-measures ANOVA. Kruskal-Wallis is for INDEPENDENT groups only.' },
      ],
    },

    /* ════════════════════ 11. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Kruskal-Wallis H is the non-parametric alternative to one-way ANOVA — for comparing 3+ INDEPENDENT groups when normality fails or the outcome is ordinal.',
          'It works on RANKS pooled across all groups, then tests whether the rank distribution differs across groups.',
          'H is compared to a chi-square distribution with k − 1 degrees of freedom. SPSS labels it "Chi-Square" — but call it H in your write-up.',
          'Use when: 3+ independent groups, ordinal-or-worse outcome, small samples with severe non-normality, extreme outliers, or wildly unequal variances.',
          'Run via Analyze → Nonparametric Tests → Legacy Dialogs → K Independent Samples → outcome in Test Variable List, grouping variable in Grouping Variable, Define Range (min and max codes), Kruskal-Wallis H ticked, OK.',
          'Report MEDIAN and IQR per group (NOT mean ± SD).',
          'A significant H tells you SOMETHING differs; **pairwise Mann-Whitney with Bonferroni correction** tells you WHICH pairs.',
          'Effect size η²_H = (H − k + 1) / (N − k). Benchmarks: .01 small, .06 medium, .14 large.',
          'Five mistakes to avoid: no post-hoc, no Bonferroni, mean/SD reporting, calling H a "chi-square test", using it on repeated measurements.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 4: Friedman test** we cover the non-parametric version for REPEATED measurements (same participants across 3+ time points or conditions) — the non-parametric equivalent of repeated-measures ANOVA.' },

        { type: 'paragraph', text:
          'Before moving on, find a continuous variable in your dataset with a 3+-level grouping variable. Confirm non-normality, run Kruskal-Wallis, report medians + IQRs, follow up with Bonferroni-adjusted Mann-Whitney pairs, compute η²_H, and write the APA paragraph. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 12. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'When is Kruskal-Wallis the right test instead of a one-way ANOVA?',
          choices: [
            'Always — non-parametric tests are safer',
            'When you have 3+ INDEPENDENT groups AND your outcome is severely non-normal, ordinal, or has extreme outliers — and at least one group is small',
            'When you have 2 groups only',
            'When you have repeated measurements on the same people',
          ],
          answer: 1,
          explanation: 'Kruskal-Wallis is the non-parametric one-way ANOVA. Use it for 3+ INDEPENDENT groups when normality fails (especially with small group sizes) OR the outcome is ordinal OR extreme outliers are present. With 2 groups use Mann-Whitney; with repeated measurements use Friedman. With large samples and approximately normal data, ANOVA is more powerful.' },

        { type: 'check',
          question: 'SPSS labels the Kruskal-Wallis test statistic as "Chi-Square = 12.84" in the output. Why?',
          choices: [
            'Because it IS a chi-square test of independence',
            'Because the H statistic is COMPARED to a chi-square distribution with k − 1 degrees of freedom — H itself is the Kruskal-Wallis test statistic, not a chi-square of association',
            'It\'s a typo',
            'Because non-parametric tests are all chi-squares',
          ],
          answer: 1,
          explanation: 'H follows (approximately) a chi-square distribution with k − 1 df under the null. SPSS labels the output column "Chi-Square" for that reason, but it\'s a labelling convention — H is the Kruskal-Wallis statistic, NOT the chi-square test of independence (which is for categorical-by-categorical association). Always call it H in your write-up: "H(2) = 12.84".' },

        { type: 'check',
          question: 'Your Kruskal-Wallis returns H(2) = 12.84, p = .002. What should you do next?',
          choices: [
            'Stop — significance is enough',
            'Run pairwise Mann-Whitney comparisons with Bonferroni correction to identify which specific group pairs differ',
            'Switch to one-way ANOVA',
            'Increase sample size',
          ],
          answer: 1,
          explanation: 'A significant H tells you SOMETHING differs across the groups, but not WHICH pairs. The standard follow-up is pairwise Mann-Whitney comparisons with Bonferroni correction (multiply each pairwise p by the number of pairs, or use SPSS\'s automatic adjustment via the modern dialog). Without post-hoc, your reader cannot tell which groups actually differ.' },

        { type: 'check',
          question: 'You have 4 groups. After a significant Kruskal-Wallis, how many pairwise Mann-Whitney comparisons do you need, and how do you Bonferroni-correct?',
          choices: [
            '3 pairs, multiply each raw p by 3',
            '6 pairs (4 × 3 / 2), multiply each raw p by 6 (or compare each to α = .05/6 = .0083)',
            '4 pairs, multiply each raw p by 4',
            '12 pairs, multiply each raw p by 12',
          ],
          answer: 1,
          explanation: 'For k groups the number of pairs is k(k − 1)/2. With 4 groups that\'s 4×3/2 = 6 pairs. Bonferroni correction multiplies each pairwise p-value by the number of comparisons (6), or equivalently compares each raw p to a stricter α of .05/6 = .0083. A pair is significant only if its corrected p < .05.' },

        { type: 'check',
          question: 'Your output: H = 12.84, k = 3, N = 87. What is the effect size η²_H?',
          choices: [
            'η²_H = H / N = 12.84 / 87 = 0.148',
            'η²_H = (H − k + 1) / (N − k) = (12.84 − 3 + 1) / (87 − 3) = 10.84 / 84 = 0.129 — a medium-to-large effect',
            'η²_H = N − H = 74.16',
            'η²_H = H × k = 38.52',
          ],
          answer: 1,
          explanation: 'The standard effect size for Kruskal-Wallis is η²_H = (H − k + 1) / (N − k). Here (12.84 − 3 + 1) / (87 − 3) = 10.84 / 84 = 0.129. Cohen\'s benchmarks (same as ANOVA): .01 small, .06 medium, .14 large. 0.129 sits just below the .14 large boundary — a medium-to-large effect. Always compute and report η²_H alongside H and p.' },

        { type: 'check',
          question: 'You measured the same 30 patients\' pain scores at baseline, 3 months, and 6 months. Kruskal-Wallis?',
          choices: [
            'Yes — three groups of measurements',
            'No — the data is REPEATED MEASURES (same patients across time). Use the FRIEDMAN test (Lesson 4) instead',
            'Yes, but only if data is normal',
            'No — use Mann-Whitney',
          ],
          answer: 1,
          explanation: 'Kruskal-Wallis assumes the k samples are independent. When the same participants appear across all conditions (e.g. three time points on the same patients), the appropriate non-parametric test is the **Friedman test**, which is the non-parametric equivalent of repeated-measures ANOVA. Using Kruskal-Wallis on repeated measurements wastes the within-subject pairing and produces an invalid p-value.' },
      ],
    },
  ],
};
