/**
 * Advanced ANOVA · Lesson 2 — MANOVA (Multivariate Analysis of Variance)
 * Comparing groups on MULTIPLE outcome variables simultaneously.
 * Renovated to Kiambu FertilizerType → Yield_KgPerAcre + GrainQuality_Score standard.
 */

export const MANOVA_LESSON = {
  id: 'advanova-2',
  title: 'MANOVA — Multivariate Analysis of Variance',
  subtitle: 'Module 03 · Course: Advanced ANOVA · Lesson 2 of 3',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When you want to compare groups on SEVERAL outcomes at once',
      blocks: [
        { type: 'scene', body: [
          'You are extending the Kiambu Maize Study (N = 180 farms) beyond just yield. Farmers care about TWO outcomes: **Yield_KgPerAcre** (how much maize you produce) AND **GrainQuality_Score** (a 0–100 quality index based on moisture, size, and pest damage). A high-yield but low-quality harvest sells for less at Kiambu market. To recommend the right fertilizer, you need to know how DAP, CAN, and Organic perform on BOTH outcomes simultaneously.',
          'Your first instinct: run two one-way ANOVAs — one on yield, one on quality. But your supervisor frowns. *"Two ANOVAs at α = .05 gives a family-wise error rate near 10%. AND the two outcomes are clearly correlated (r = .54) — high-quality maize also tends to come in higher yield. Running them separately ignores that structure. There is a better way."*',
          'That better way is **MANOVA** (Multivariate Analysis of Variance). MANOVA tests whether your groups differ on the JOINT distribution of both outcomes at once. One omnibus test. One p-value. Family-wise error controlled. And when significant, follow-up univariate ANOVAs (with Bonferroni-adjusted α) tell you WHICH outcome is driving the difference. In the Kiambu case, MANOVA will confirm whether the three fertilizer types differ on the "farmer\'s bundle" of (yield, quality) — a stronger multivariate claim than two separate yield-and-quality results.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise** the moments in your data when MANOVA is preferable to several separate ANOVAs.',
            '**Explain** the four multivariate test statistics — Pillai\'s Trace, Wilks\' Lambda, Hotelling\'s Trace, and Roy\'s Largest Root.',
            '**Run** MANOVA in SPSS via Analyze → General Linear Model → Multivariate.',
            '**Check the multivariate assumptions** — multivariate normality and homogeneity of covariance matrices (Box\'s M).',
            '**Read the output** — the multivariate tests table FIRST, then the univariate follow-ups.',
            '**Follow up a significant MANOVA** with univariate ANOVAs on each outcome (with Bonferroni-adjusted α) — and explain why.',
            '**Report partial η²** for the multivariate effect (from Pillai\'s Trace).',
            '**Write up** the result in APA style with all the elements your reviewer will look for.',
          ]},

        { type: 'why', body:
          'Many Kenyan postgrad theses — especially in psychology, education, public health, agriculture, and organisational behaviour — measure several related outcomes per participant. MANOVA is the principled way to compare groups across those outcomes jointly. Running separate ANOVAs inflates Type I error AND misses the multivariate structure. Master MANOVA once and you have the right tool for an entire class of research designs.' },
      ],
    },

    /* ════════════════════ 1.5 WHAT/WHY/WHERE/WHEN ════════════════════ */
    {
      id: 'wwww',
      title: 'What / Why / Where / When — read THIS first',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'Before touching the SPSS dialog, understand: (1) What MANOVA IS, (2) Why you use it, (3) Where a Kenyan postgraduate would use it, (4) When to CHOOSE it over multiple separate ANOVAs.',
            'The WWWW card and key-terms callout below answer all 4 in 3 minutes.',
          ]},

        { type: 'illustration', component: 'KiambuMANOVAWWWW',
          caption: 'Figure 0. MANOVA WHAT/WHY/WHERE/WHEN reference card using Kiambu FertilizerType predicting BOTH Yield_KgPerAcre AND GrainQuality_Score simultaneously.' },

        { type: 'callout', tone: 'brand', title: 'Key terms you will meet in the walkthrough',
          body: [
            '**Multivariate test** — one omnibus test across all outcomes jointly, instead of separate tests per outcome.',
            '**Pillai\'s Trace** — the most robust multivariate test statistic. Use it as the headline result, especially when Box\'s M is significant or group sizes are unequal.',
            '**Wilks\' Lambda** — the classic multivariate statistic. Reported alongside Pillai. All four statistics usually agree on significance.',
            '**Box\'s M test** — tests homogeneity of covariance matrices across groups. Non-significant (p > .001) = assumption met.',
            '**Univariate follow-up ANOVA** — separate one-way ANOVA on each outcome, run AFTER a significant MANOVA to identify which outcomes drive the effect. Use Bonferroni-adjusted α (0.05 / k outcomes).',
            '**Partial eta-squared (partial η²)** — effect size for the multivariate effect. Extracted from Pillai\'s Trace. Same benchmarks: .01 small, .06 medium, .14 large.',
          ]},
      ],
    },

    /* ════════════════════ 2. THE BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — testing a bundle of outcomes together',
      blocks: [
        { type: 'heading', level: 2, text: 'Why not just run several ANOVAs?' },

        { type: 'paragraph', text:
          'The temptation is obvious: two outcomes → two ANOVAs. But this approach has two serious problems that MANOVA solves.' },

        { type: 'comparison',
          headers: ['Problem with separate ANOVAs', 'How MANOVA solves it'],
          rows: [
            ['**Family-wise error inflates.** With k outcomes at α = .05, false-positive rate rises toward 1 − (1 − .05)^k. For 2 outcomes ≈ 10%; for 5 outcomes ≈ 23%.', 'ONE omnibus multivariate test at α = .05. Family-wise error stays at 5% until you follow up.'],
            ['**Ignores correlation between outcomes.** Related outcomes carry shared information; separate tests waste that structure.', 'Analyses the JOINT distribution — outcomes considered TOGETHER. Detects group differences that only appear multivariately.'],
            ['**No unified effect-size statement.** You end up with k separate η² values.', 'ONE partial η² for the multivariate group effect.'],
            ['**Can miss effects that ONLY appear jointly.** Two groups may barely differ on yield alone and quality alone, but differ dramatically on the (yield, quality) combination.', 'The multivariate test EXPLICITLY tests the joint pattern — sensitive to bundle-level differences.'],
          ]},

        { type: 'definition', term: 'Multivariate test',
          body: 'A statistical test on TWO OR MORE dependent variables considered together. Where a one-way ANOVA compares means on one Y, MANOVA compares CENTROIDS — the group means on all Ys jointly — represented as a point in multivariate space. The question becomes: are the three group centroids in the same location, or do they differ?' },

        { type: 'definition', term: 'Centroid',
          body: 'A group\'s mean vector — one number per outcome. In Kiambu: DAP\'s centroid is (yield = 1840, quality = 78); CAN\'s is (1620, 72); Organic\'s is (1450, 74). MANOVA asks: are these three points meaningfully far apart in the (yield, quality) plane?' },

        { type: 'analogy', title: 'Comparing towns on ONE dimension vs TWO',
          body: 'Imagine ranking Kenyan towns by ONE measure — say, average income. Nairobi and Mombasa may look similar. Now add a second measure — cost of living. Suddenly Nairobi (high income, high cost) and Mombasa (moderate income, moderate cost) occupy very DIFFERENT positions in the two-dimensional (income, cost) plane. The multivariate view revealed a distinction the univariate view missed. MANOVA does exactly this: it uses the joint geometry of multiple outcomes to detect differences you would miss looking at each outcome one at a time.' },

        { type: 'reveal',
          prompt: 'You have three fertilizer groups measured on yield and quality. The univariate ANOVA on yield alone gives p = .06 (barely non-significant). The univariate ANOVA on quality alone gives p = .09 (non-significant). But your MANOVA gives Pillai\'s Trace p < .001. How can this happen?',
          answer: '**The multivariate difference is stronger than either univariate difference alone.** Group differences on yield and quality may each be modest on their own, but if the two outcomes carry INDEPENDENT information about group membership — for example, DAP is high on yield but only moderate on quality, while Organic is moderate on yield but high on quality — the JOINT pattern of (yield, quality) discriminates the groups far more strongly than either variable alone. MANOVA is sensitive to this "diagonal" separation. This is one of the strongest arguments for MANOVA over separate ANOVAs: it can detect effects that only appear multivariately. Practically, in this scenario you would report the significant MANOVA as the primary result and note that neither outcome alone reaches significance — the effect is a genuine multivariate one.' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When MANOVA is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The conditions' },

        { type: 'steps', steps: [
          { title: 'TWO OR MORE continuous outcomes',
            body: 'All DVs must be Scale. Two is the minimum; 3–6 is typical; more than 8 becomes hard to interpret.' },
          { title: 'Outcomes are CONCEPTUALLY related and moderately correlated',
            body: 'MANOVA works best when the outcomes tap the same broad construct (e.g. yield + quality both = "harvest success"; anxiety + depression + stress all = "psychological distress"). Aim for correlations 0.3–0.7 between outcomes. If r > 0.9 outcomes are redundant; if r < 0.2 they may as well be analysed separately.' },
          { title: 'One or more categorical grouping factors',
            body: 'Typically 2–5 levels. One factor = one-way MANOVA; two factors = factorial MANOVA (same dialog).' },
          { title: 'Sample size adequate for multivariate stability',
            body: 'A common rule: at least 20 cases per cell, and always more cases than outcomes. For Kiambu, N = 60 per group with 2 outcomes is comfortable.' },
          { title: 'Multivariate assumptions met',
            body: 'Multivariate normality (approximately met if each outcome is univariately normal AND sample per cell ≥ 20 — Central Limit Theorem covers you). Homogeneity of covariance matrices (Box\'s M test). Independence of cases.' },
        ]},

        { type: 'comparison',
          headers: ['Design', 'Right test'],
          rows: [
            ['1 factor, 1 outcome',                                            'One-way ANOVA'],
            ['1 factor, 1 outcome, 1+ covariates',                             'ANCOVA'],
            ['**1 factor, 2+ related outcomes**',                              '**One-way MANOVA (this lesson)**'],
            ['2 factors, 2+ related outcomes',                                 'Factorial MANOVA (same dialog, add both to Fixed Factors)'],
            ['1 factor, 2+ outcomes + 1+ covariates',                          'MANCOVA (add to Covariates in the same dialog)'],
            ['Outcomes measured repeatedly on same subjects',                  'Repeated-measures MANOVA (Doubly-multivariate)'],
          ]},
      ],
    },

    /* ════════════════════ 4. THE FOUR MULTIVARIATE STATISTICS ════════════════════ */
    {
      id: 'four-statistics',
      title: 'The four multivariate test statistics — which one to report',
      blocks: [
        { type: 'heading', level: 2, text: 'SPSS gives four; you report one (or two)' },

        { type: 'paragraph', text:
          'The Multivariate Tests table shows four statistics — Pillai\'s Trace, Wilks\' Lambda, Hotelling\'s Trace, Roy\'s Largest Root — and their converted F-values, p-values, and partial η². For most Kenyan-postgraduate purposes they will all agree on significance. The question is which to REPORT as the headline.' },

        { type: 'comparison',
          headers: ['Statistic', 'When it is the right choice', 'Robustness note'],
          rows: [
            ['**Pillai\'s Trace**',      'Default headline for most write-ups. Report this one.',                'MOST ROBUST to violations of homogeneity of covariance and unequal sample sizes.'],
            ['**Wilks\' Lambda**',       'Historically classic; report alongside Pillai for tradition.',         'Slightly less robust than Pillai when Box\'s M is significant.'],
            ['**Hotelling\'s Trace**',   'Sometimes preferred when group sizes are equal and assumptions met.',  'Similar to Wilks in most datasets.'],
            ['**Roy\'s Largest Root**',  'Most powerful when a single dimension dominates. Use with caution.',   'LEAST robust — sensitive to violations. Do not use as sole headline.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'The rule Kenyan postgraduate examiners expect',
          body: '**Report Pillai\'s Trace as the primary multivariate test.** It is the most robust to assumption violations, which are common with real-world data. You can (and often should) note the other three in a parenthetical for tradition, but Pillai is the one your interpretation and effect size should be based on.' },

        { type: 'paragraph', text:
          'All four statistics convert to an approximate F-value, so you report them like: *"Pillai\'s Trace = .384, F(4, 354) = 21.53, p < .001, partial η² = .196."*' },
      ],
    },

    /* ════════════════════ 5. ASSUMPTIONS — SPECIFICALLY BOX\'S M ════════════════════ */
    {
      id: 'manova-assumptions',
      title: 'MANOVA-specific assumptions — Box\'s M and multivariate normality',
      blocks: [
        { type: 'heading', level: 2, text: 'Two extras beyond univariate ANOVA' },

        { type: 'paragraph', text:
          'Beyond the usual normality-within-cells and independence assumptions, MANOVA adds two multivariate assumptions: (1) multivariate normality and (2) homogeneity of covariance matrices, tested by Box\'s M.' },

        { type: 'steps', steps: [
          { title: 'Multivariate normality',
            body: 'Loosely: each outcome is approximately normal within each group, AND the outcomes are jointly normal (their bivariate/multivariate distribution has no bizarre skewness). Rarely tested formally — most postgraduates rely on: (a) univariate normality checks per outcome, and (b) adequate cell sizes (n ≥ 20) invoking the Central Limit Theorem.' },
          { title: 'Homogeneity of covariance matrices (Box\'s M test)',
            body: 'The covariance structure among the outcomes should be the SAME across groups. Tested by Box\'s M. INTERPRETATION: use α = .001 (Box\'s M is oversensitive at .05). If p > .001, assumption is met. If p < .001, homogeneity is violated → report Pillai\'s Trace (most robust) and mention the violation.' },
          { title: 'Independence of cases',
            body: 'Each case belongs to exactly one group and one row of data. Standard for between-subjects designs.' },
        ]},

        { type: 'callout', tone: 'warning', title: 'Box\'s M is oversensitive',
          body: 'Box\'s M test almost always flags a violation with large samples because it is very sensitive. That is why the accepted convention is to use α = .001 (not .05). Even so, if it is violated, MANOVA is still usable — just switch to Pillai\'s Trace as your headline statistic, because Pillai is robust to Box\'s M violations.' },
      ],
    },

    /* ════════════════════ 6. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'The Kiambu procedure',
      blocks: [
        { type: 'heading', level: 2, text: 'A different sub-menu from ANOVA and ANCOVA' },

        { type: 'paragraph', text:
          'MANOVA lives at **Analyze → General Linear Model → Multivariate**. This is a distinct dialog from Univariate — it has a Dependent VariableS box (plural) that accepts two or more outcomes. Everything else looks familiar.' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → General Linear Model → Multivariate.' },
          { title: 'Move BOTH outcomes to Dependent Variables',
            body: 'Move Yield_KgPerAcre AND GrainQuality_Score into the Dependent Variables box. This is what makes it MULTIVARIATE — two or more DVs simultaneously.' },
          { title: 'Move FertilizerType to Fixed Factor(s)',
            body: 'Your grouping variable — three levels.' },
          { title: 'Click Options…',
            body: 'Tick **Descriptive statistics**, **Estimates of effect size**, **Homogeneity tests** (this gives you Box\'s M and Levene\'s per outcome). Click Continue.' },
          { title: 'Click EM Means…',
            body: 'Move FertilizerType into Display Means for. Tick Compare main effects with Bonferroni. Click Continue.' },
          { title: 'Click Post Hoc…',
            body: 'Optional: move FertilizerType into Post Hoc box, tick Tukey. This gives univariate post-hoc for each outcome. Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces: Between-Subjects Factors, Descriptive Statistics, Box\'s Test of Equality of Covariance Matrices, Levene\'s Test (per outcome), **Multivariate Tests** (the omnibus MANOVA — your headline), and **Tests of Between-Subjects Effects** (univariate follow-ups per outcome).' },
        ]},

        { type: 'reasoning', headers: ['Setting', 'What we chose', 'Why'],
          rows: [
            ['Dependent Variables', 'Yield_KgPerAcre AND GrainQuality_Score', 'Two related outcomes that both matter to farmers. Correlated (r = .54) but not redundant.'],
            ['Fixed Factor',        'FertilizerType',                          'The 3-level treatment we want to compare.'],
            ['Options → Homogeneity', 'Ticked',                                'Gives Box\'s M for the multivariate assumption and Levene\'s per outcome.'],
            ['Options → Effect size', 'Ticked',                                'Required for reporting partial η² on the multivariate effect.'],
            ['EM Means → Bonferroni', 'Chosen',                                'Adjusts pairwise comparisons for the family of tests, controlling Type I error.'],
            ['Multivariate stat to report', 'Pillai\'s Trace',                 'Most robust to Box\'s M violation and unequal N — safest headline choice.'],
          ]},

        { type: 'illustration', component: 'KiambuMANOVADialog',
          caption: 'Figure 1. The Multivariate GLM dialog for Kiambu MANOVA. Both Yield_KgPerAcre and GrainQuality_Score in the Dependent Variables box (highlighted gold — this is what makes it MULTIVARIATE). FertilizerType as Fixed Factor. Options button highlighted for the Box\'s M homogeneity test.' },

        { type: 'illustration', component: 'KiambuMANOVAOutput',
          caption: 'Figure 2. MANOVA output. Multivariate Tests table (top): Pillai\'s Trace = .384, F(4, 354) = 21.53, p < .001, partial η² = .196 (LARGE multivariate effect) — the headline result. Wilks, Hotelling, and Roy all agree (all p < .001). Univariate follow-ups (bottom): Yield_KgPerAcre F(2, 177) = 22.40, p < .001, partial η² = .202; GrainQuality_Score F(2, 177) = 15.86, p < .001, partial η² = .152. Both outcomes contribute — use Bonferroni-adjusted α = .025 for each.' },
      ],
    },

    /* ════════════════════ 7. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the MANOVA output in the right order',
      blocks: [
        { type: 'heading', level: 2, text: 'The correct sequence' },

        { type: 'paragraph', text:
          'MANOVA output is inherently multi-layered. Read it in a strict order to avoid mis-interpretation:' },

        { type: 'steps', steps: [
          { title: 'Step 1 — Box\'s M Test of Equality of Covariance Matrices',
            body: 'Assumption check. If Box\'s M has p > .001 → homogeneity of covariance is OK. If p < .001 → violated; make sure to report Pillai\'s Trace as your headline (it is robust to this).' },
          { title: 'Step 2 — Multivariate Tests table (the OMNIBUS test)',
            body: 'THE headline. Look at the FertilizerType row. Report Pillai\'s Trace with its F, df, p, and partial η². If p > .05, stop — the groups do not differ on the joint outcome bundle, and no follow-ups are needed.' },
          { title: 'Step 3 — Levene\'s Test (per outcome)',
            body: 'Assumption check for the univariate follow-ups. Should be non-significant (p > .05) for each outcome.' },
          { title: 'Step 4 — Tests of Between-Subjects Effects (UNIVARIATE follow-ups)',
            body: 'ONLY if the multivariate test in Step 2 was significant. Each row is a one-way ANOVA on one outcome. Use **Bonferroni-adjusted α = .05 / k outcomes** — for 2 outcomes, α = .025. Identify WHICH outcomes drive the multivariate effect.' },
          { title: 'Step 5 — Estimated Marginal Means / Pairwise comparisons',
            body: 'For each univariate outcome that is significant, look at the pairwise comparisons (Bonferroni-adjusted) to see which pairs of groups differ.' },
        ]},

        { type: 'callout', tone: 'warning', title: 'Bonferroni-adjust the univariate follow-ups',
          body: 'A significant MANOVA does NOT license you to interpret every univariate follow-up at α = .05. If you run k separate univariate ANOVAs after MANOVA, use α = .05 / k for each. For Kiambu with 2 outcomes: α = .025. Both Yield (p < .001) and Quality (p < .001) beat that stricter threshold in our example, so both are contributing to the multivariate difference.' },

        { type: 'reveal',
          prompt: 'You get: Box\'s M p = .045 (>.001, OK). Pillai p < .001. Yield univariate p < .001 (< .025). Quality univariate p = .06 (> .025). How do you interpret?',
          answer: '**The multivariate effect is real, and it is driven primarily by yield rather than quality.** Report the multivariate MANOVA (Pillai) as significant — the fertilizer types differ on the joint (yield, quality) bundle. Follow-up ANOVAs indicate that YIELD is where the difference lies (p < .001, well below Bonferroni-adjusted α = .025). Quality does NOT differ significantly across groups after Bonferroni correction (p = .06 > .025). Practically, this means the three fertilizer types produce different amounts of maize, but similar levels of quality — a useful nuanced finding you would miss if you had only run a single ANOVA on yield or a single ANOVA on quality without the multivariate framework.' },
      ],
    },

    /* ════════════════════ 8. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — Kiambu MANOVA',
      blocks: [
        { type: 'workedExample', title: 'A PhD study in agricultural science at Egerton',
          body: [
            { label: 'The research question',
              text: 'Do the three fertilizer types (DAP, CAN, Organic) differ on the JOINT combination of maize yield and grain quality?' },
            { label: 'The data',
              text: 'N = 180 Kiambu smallholder farms. FertilizerType: DAP (n = 60), CAN (n = 60), Organic (n = 60). Outcome 1: Yield_KgPerAcre (Scale). Outcome 2: GrainQuality_Score (0–100 index). Correlation between outcomes: r = .54.' },
            { label: 'Step 1 — Check assumptions',
              text: 'Box\'s M = 12.34, p = .058 (> .001) → covariance homogeneity OK. Levene\'s for Yield p = .134; for Quality p = .208 → equal variances per outcome. Univariate normality checks per outcome per group OK (skewness < |1|).' },
            { label: 'Step 2 — Run the MANOVA',
              text: 'Analyze → GLM → Multivariate → Dependent Variables: Yield_KgPerAcre + GrainQuality_Score → Fixed Factor: FertilizerType → Options: Descriptive, Effect size, Homogeneity → EM Means: FertilizerType, Compare (Bonferroni) → OK.' },
            { label: 'Step 3 — Multivariate omnibus test (Pillai)',
              text: 'Pillai\'s Trace = .384, F(4, 354) = 21.53, p < .001, partial η² = .196 (LARGE). Wilks\' Λ = .624, F(4, 352) = 22.87, p < .001. Hotelling\'s Trace = .592, F(4, 350) = 24.19, p < .001. Roy\'s Largest Root = .580, F(2, 177) = 51.35, p < .001. All four statistics agree.' },
            { label: 'Step 4 — Univariate follow-ups (Bonferroni α = .025)',
              text: 'Yield_KgPerAcre: F(2, 177) = 22.40, p < .001, partial η² = .202 (LARGE). GrainQuality_Score: F(2, 177) = 15.86, p < .001, partial η² = .152 (LARGE). BOTH outcomes contribute significantly to the multivariate effect.' },
            { label: 'Step 5 — Group means',
              text: 'DAP: Yield = 1840, Quality = 78. CAN: Yield = 1620, Quality = 72. Organic: Yield = 1450, Quality = 74. Bonferroni pairwise on Yield: all three pairs differ (p < .001). Bonferroni pairwise on Quality: DAP > CAN (p < .001); DAP vs Organic (p = .028); CAN vs Organic (p = .17, ns).' },
            { label: 'Step 6 — APA write-up',
              text: '*"A one-way multivariate analysis of variance was conducted to examine the effect of fertilizer type (DAP, CAN, Organic) on the joint outcome of maize yield (kg/acre) and grain quality (0–100 index) among 180 Kiambu smallholder farms. Box\'s M test indicated homogeneity of covariance matrices (M = 12.34, p = .058), and Levene\'s tests indicated homogeneity of variance for both outcomes (both p > .13). There was a significant multivariate effect of fertilizer type, Pillai\'s Trace = .384, F(4, 354) = 21.53, p < .001, partial η² = .20, a large effect. Follow-up univariate ANOVAs (Bonferroni-adjusted α = .025) revealed significant effects on both outcomes: yield, F(2, 177) = 22.40, p < .001, partial η² = .20, and grain quality, F(2, 177) = 15.86, p < .001, partial η² = .15. DAP produced the highest yield (M = 1,840 kg/acre) and quality (M = 78/100), followed by CAN (1,620 kg/acre; 72/100) and Organic (1,450 kg/acre; 74/100). Bonferroni pairwise comparisons indicated that on yield, all three fertilizer types differed significantly (all p < .001); on grain quality, DAP scored significantly higher than CAN (p < .001) and Organic (p = .028), while CAN and Organic did not differ significantly (p = .17). Together, DAP was superior on both dimensions of harvest success."*' },
          ]},
      ],
    },

    /* ════════════════════ 9. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing MANOVA up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A one-way multivariate analysis of variance was conducted to examine the effect of [FACTOR] on the joint outcome of [OUTCOME 1] and [OUTCOME 2] [and OUTCOME 3…] among [N] [respondents]. Box\'s M test [was/was not] significant at α = .001, indicating [homogeneity/heterogeneity] of covariance matrices. Levene\'s tests [confirmed / did not confirm] univariate homogeneity of variance for each outcome. There was a [significant/non-significant] multivariate effect of [factor], Pillai\'s Trace = [.XX], F([df]) = [F], p = [p], partial η² = [.XX]. Follow-up univariate ANOVAs (Bonferroni-adjusted α = [.XX]) revealed [pattern per outcome, F, df, p, partial η²]. [Pairwise comparisons for significant outcomes.]' },

        { type: 'callout', tone: 'success', title: 'Five things every MANOVA write-up needs',
          body: '**1.** All outcomes named, plus sample size per group. **2.** Box\'s M and Levene\'s results (assumption evidence). **3.** Multivariate test statistic (Pillai\'s Trace) with F, df, p, partial η². **4.** Univariate follow-ups per outcome with Bonferroni-adjusted α. **5.** Pairwise comparisons and group means for each significant univariate outcome. Examiners look for all five.' },
      ],
    },

    /* ════════════════════ 10. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common MANOVA mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Interpreting univariate follow-ups at α = .05 after MANOVA',
          body: 'You run MANOVA (Pillai p < .001), then interpret each univariate ANOVA at α = .05. But you have inflated the family-wise error rate by running multiple univariate tests.',
          fix: 'ALWAYS Bonferroni-adjust the univariate follow-ups. For k outcomes, use α = .05 / k. For 2 outcomes, α = .025. For 5 outcomes, α = .01. Report both the omnibus MANOVA AND the adjusted α used for follow-ups.' },

        { type: 'mistake',
          title: 'Mistake 2 — Reporting Roy\'s Largest Root as the headline',
          body: 'You see Roy\'s Largest Root gives the smallest p-value and reasonably think it must be the "best". You report it as your primary result.',
          fix: 'Roy\'s Largest Root is the LEAST ROBUST of the four multivariate statistics — it is powerful only when a single dimension dominates and is easily biased by assumption violations. Report **Pillai\'s Trace** as your headline. It is the most robust and is what disciplinary journals expect.' },

        { type: 'mistake',
          title: 'Mistake 3 — Using MANOVA when outcomes are redundant',
          body: 'You have three outcomes: KCSE_Total, KCSE_Math, and KCSE_English. But KCSE_Total = KCSE_Math + KCSE_English + other subjects, so it is redundant with the two subject scores.',
          fix: 'Check the correlation matrix of your outcomes BEFORE running MANOVA. If any two correlate > 0.9, they measure essentially the same construct — drop one, or use factor analysis to combine them. Ideal MANOVA outcomes correlate 0.3–0.7 with each other.' },

        { type: 'mistake',
          title: 'Mistake 4 — Skipping Box\'s M and Levene\'s in the write-up',
          body: 'You run MANOVA, get significant Pillai, report it and move on. But you never mention the assumption checks.',
          fix: 'The MANOVA APA template REQUIRES assumption evidence. Report Box\'s M with its p-value (interpreted at α = .001) and Levene\'s per outcome. If either is violated, use Pillai\'s Trace (robust) and disclose the violation in your Limitations. Skipping this is one of the fastest ways to get returned by a reviewer.' },
      ],
    },

    /* ════════════════════ 11. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'MANOVA compares groups on TWO OR MORE continuous outcomes simultaneously — one omnibus multivariate test instead of many separate ANOVAs.',
          'Controls family-wise error, uses the joint distribution of outcomes, and can detect effects that only appear multivariately.',
          'Menu: Analyze → General Linear Model → Multivariate. Both/all outcomes into Dependent Variables. Grouping factor into Fixed Factor(s).',
          'Four multivariate statistics: Pillai\'s Trace (report this — most robust), Wilks\' Lambda, Hotelling\'s Trace, Roy\'s Largest Root.',
          'Assumptions: multivariate normality, homogeneity of covariance matrices (Box\'s M at α = .001), independence.',
          'Read the output IN ORDER: Box\'s M → Multivariate Tests (Pillai) → Levene\'s per outcome → Univariate follow-ups (Bonferroni α = .05 / k) → Pairwise for significant outcomes.',
          'Effect size = partial η² from Pillai. Same benchmarks: .01 small, .06 medium, .14 large.',
          'Kiambu example: FertilizerType Pillai = .384, F(4, 354) = 21.53, p < .001, partial η² = .20. Both Yield AND Quality contribute significantly after Bonferroni correction.',
          'Avoid the four mistakes: unadjusted univariate follow-ups, reporting Roy instead of Pillai, using redundant outcomes, skipping assumption reporting.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 3: Mixed ANOVA** — combining a between-subjects factor with a within-subjects (repeated) factor in one model. The workhorse for intervention studies with repeated measurement: does the treatment group\'s trajectory over time differ from the control group\'s?' },

        { type: 'paragraph', text:
          'Before moving on, find a dataset with a grouping variable and two related continuous outcomes. Run MANOVA in SPSS. Check Box\'s M. Report Pillai. Follow up with Bonferroni-adjusted univariate ANOVAs. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 12. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'You have 3 groups and want to compare them on 4 related outcomes. Why prefer MANOVA to running 4 separate one-way ANOVAs?',
          choices: [
            'MANOVA is easier to compute',
            'MANOVA controls family-wise Type I error AND uses the joint distribution of outcomes, potentially detecting differences invisible to separate ANOVAs',
            'MANOVA needs fewer participants',
            'MANOVA produces smaller p-values',
          ],
          answer: 1,
          explanation: '4 separate ANOVAs at α = .05 inflate the family-wise error rate to nearly 19%. MANOVA runs ONE omnibus test at α = .05, controlling family-wise error. It also analyses the joint distribution of outcomes, so it can detect group differences that are only visible multivariately.' },

        { type: 'check',
          question: 'Which multivariate test statistic should you report as your headline result, and why?',
          choices: [
            'Roy\'s Largest Root, because it is often the most powerful',
            'Pillai\'s Trace, because it is the MOST ROBUST to violations of assumptions and unequal group sizes',
            'Wilks\' Lambda, because it is the oldest',
            'Whichever gives the smallest p-value',
          ],
          answer: 1,
          explanation: 'Pillai\'s Trace is the accepted headline for MANOVA in most disciplines because it is robust to violations of Box\'s M homogeneity assumption and to unequal cell sizes. Roy\'s Largest Root is the least robust; using it as headline is a common beginner mistake. Report Pillai and (optionally) note the others in parentheses.' },

        { type: 'check',
          question: 'Your MANOVA on 3 outcomes gives Pillai p < .001. You now run 3 follow-up univariate ANOVAs. What α should you use for each?',
          choices: [
            '.05, because MANOVA already controlled it',
            '.05 / 3 = approximately .017 (Bonferroni-adjusted)',
            '.001',
            '.10, to be safe',
          ],
          answer: 1,
          explanation: 'After a significant MANOVA, univariate follow-ups need Bonferroni adjustment: α = .05 / k where k is the number of outcomes. For 3 outcomes, α = .017. Some references round to α = .02. Using .05 for each undoes the family-wise error control the MANOVA gave you.' },

        { type: 'check',
          question: 'Box\'s M test comes back with p = .045. What do you do?',
          choices: [
            'Panic; MANOVA cannot be used',
            'Note that Box\'s M is oversensitive and normally interpreted at α = .001; p = .045 is well above that threshold, so assumption is met. Proceed with MANOVA as usual.',
            'Switch to Roy\'s Largest Root',
            'Reduce the sample size',
          ],
          answer: 1,
          explanation: 'Box\'s M is famously oversensitive, especially with large samples. The accepted convention is to interpret it at α = .001, not .05. A p-value of .045 is comfortably above .001, so the homogeneity assumption is met. Even if it were violated (p < .001), the fix is to report Pillai\'s Trace (robust) rather than abandon MANOVA.' },

        { type: 'check',
          question: 'When are the outcomes for MANOVA "too correlated"?',
          choices: [
            'Correlations above 0.3',
            'Correlations above 0.9 — the outcomes measure essentially the same construct; drop one or combine',
            'Any correlation at all',
            'Correlations are irrelevant',
          ],
          answer: 1,
          explanation: 'Ideal MANOVA outcomes correlate 0.3–0.7 — related but not redundant. If any two correlate above 0.9 they measure essentially the same construct; keeping both wastes degrees of freedom and can cause multicollinearity issues. Drop one, or combine into a composite via factor analysis before running MANOVA.' },

        { type: 'check',
          question: 'Your output shows: Pillai p < .001. Univariate: Yield p < .001, Quality p = .09. Using Bonferroni α = .025 for 2 outcomes, how do you write this up?',
          choices: [
            '"Both outcomes are significant."',
            '"Neither outcome is significant."',
            '"There was a significant multivariate effect of fertilizer type (Pillai\'s Trace = X, p < .001, partial η² = Y). Follow-up univariate ANOVAs (Bonferroni-adjusted α = .025) indicated the effect was driven by yield (p < .001), while grain quality did not differ significantly across groups (p = .09)."',
            '"MANOVA was inappropriate."',
          ],
          answer: 2,
          explanation: 'Option C is the correct APA write-up. It reports the omnibus MANOVA (Pillai), then the univariate follow-ups with the CORRECT Bonferroni-adjusted α (.025), and identifies WHICH outcome carries the multivariate effect. Yield passes the .025 threshold; quality does not (p = .09 > .025). This kind of pattern is a common and useful MANOVA finding — the multivariate effect is real, and one outcome does the heavy lifting.' },
      ],
    },
  ],
};
