/**
 * Advanced ANOVA · Lesson 2 — MANOVA (Multivariate ANOVA)
 * Comparing groups on MULTIPLE outcome variables simultaneously.
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
          'You are doing a PhD at Egerton University on cognitive-behavioural therapy (CBT) for university students with exam anxiety. You assigned 90 students to one of three conditions — CBT, Peer Support, or Wait-list Control — and measured FIVE outcomes at the end of the 8-week trial: GAD-7 anxiety, PHQ-9 depression, PSS-10 stress, study self-efficacy, and exam-avoidance behaviour.',
          'Your first instinct: run five separate one-way ANOVAs, one per outcome. But your supervisor frowns. "If you run five tests at α = .05, your cumulative false-positive rate balloons to about 23%. AND — more interestingly — those five outcomes are clearly related. Anxiety, depression, and stress correlate strongly. By running five separate ANOVAs you ignore that structure. There\'s a better way."',
          'That better way is **MANOVA** (Multivariate Analysis of Variance). MANOVA tests whether your groups differ on the JOINT distribution of all five outcomes simultaneously. Instead of asking "do groups differ on anxiety?" then "do groups differ on depression?" five times, it asks ONE question: "do the groups differ on the multivariate cluster of psychological outcomes?". One omnibus test. One p-value. Family-wise error preserved. And when it\'s significant, follow-up tests tell you WHICH outcomes are driving the multivariate difference.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise** the moments in your data when MANOVA is preferable to several separate ANOVAs.',
            '**Explain** the multivariate test statistics — Wilks\' Lambda, Pillai\'s Trace, Hotelling\'s Trace, Roy\'s Largest Root.',
            '**Run** MANOVA in SPSS via Analyze → General Linear Model → Multivariate.',
            '**Check the multivariate assumptions** — multivariate normality and homogeneity of covariance matrices (Box\'s M test).',
            '**Read the output** — the multivariate tests table FIRST, then the univariate follow-ups.',
            '**Follow up a significant MANOVA** with univariate ANOVAs (with Bonferroni-adjusted α) — and explain why.',
            '**Compute and report partial η²** for the multivariate effect.',
            '**Write up** the result in APA style with all the elements your reviewer will look for.',
          ]},

        { type: 'why', body:
          'Many Kenyan postgrad theses — especially in psychology, education, public health, and organisational behaviour — measure several related outcomes per participant. MANOVA is the principled way to compare groups across those outcomes jointly. Running separate ANOVAs inflates Type I error AND misses the multivariate structure your outcomes share. Master MANOVA once and you have the right tool for an entire class of research designs.' },
      ],
    },

    /* ════════════════════ 2. BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — one multivariate omnibus test, then univariate follow-ups',
      blocks: [
        { type: 'heading', level: 2, text: 'A "weighted combination" of outcomes that maximises group separation' },

        { type: 'paragraph', text:
          'MANOVA does not literally run five separate tests behind the scenes. Instead, it mathematically constructs a NEW VARIABLE — a weighted combination of all five outcomes — that maximises the separation between groups. Then it tests whether the groups differ on that combination. The weighting is automatic; you do not specify it. SPSS reports four equivalent multivariate test statistics, of which Wilks\' Lambda and Pillai\'s Trace are most commonly reported.' },

        { type: 'illustration', component: 'ManovaLogic',
          caption: 'Figure 1. The MANOVA intuition for two outcomes. Each dot is a participant; X = anxiety, Y = depression. The three coloured clusters are the three treatment groups. A univariate ANOVA on anxiety alone could miss the cluster separation if the groups happen to overlap on anxiety; same for depression. But MANOVA finds the DIAGONAL axis (the dashed line) that maximally separates the groups in the joint space — and tests significance on THAT combination. Multivariate differences become visible even when univariate ones are weak.' },

        { type: 'definition', term: 'Wilks\' Lambda (Λ)',
          body: 'The most-reported multivariate test statistic. **Λ ranges from 0 to 1**. Λ near 1 = no group separation in multivariate space (the groups overlap fully); Λ near 0 = strong group separation. SPSS converts Λ to an approximate F via a transformation and reports the F, df, and p. Report all four: F([df1], [df2]) = value, p = value, Wilks\' Λ = value, partial η² = value.' },

        { type: 'comparison',
          headers: ['Multivariate statistic', 'When to prefer it'],
          rows: [
            ['**Wilks\' Lambda**',     'The default and most-reported. Use unless you have a specific reason otherwise.'],
            ['**Pillai\'s Trace**',     'MOST ROBUST when assumptions (homogeneity of covariance, multivariate normality) are violated. Use when Box\'s M is significant.'],
            ['**Hotelling\'s Trace**',  'Best when groups are well separated. Rarely the primary choice in social-science theses.'],
            ['**Roy\'s Largest Root**', 'Most powerful when there is a single dominant dimension of separation, but very sensitive to violations. Cautious use.'],
          ]},

        { type: 'analogy', title: 'Three KCSE classes evaluated on their full subject portfolio',
          body: 'Three Form 4 classes are being compared. You could compare their average Maths score, then English, then Kiswahili, then Chemistry, then Biology — five separate tests. Or you could ask, "looking at the WHOLE PORTFOLIO of five subjects together, do these classes meaningfully differ?". MANOVA is the second question. It captures the FULL profile of performance, not just one subject at a time, and gives a single answer about whether classes differ overall before drilling down into which subjects are responsible.' },

        { type: 'reveal',
          prompt: 'Why is running five separate ANOVAs at α = .05 worse than running one MANOVA?',
          answer: '**Two reasons.** (1) **Type I error inflation**: with five independent tests at α = .05, the cumulative false-positive risk rises to ~23% (1 − 0.95⁵). MANOVA performs ONE omnibus test at α = .05 — family-wise error preserved. (2) **Multivariate structure ignored**: your five outcomes are correlated (anxiety, depression, stress share variance). Separate ANOVAs treat each as independent, throwing away that structure. MANOVA exploits the shared variance to find effects that may be invisible univariately — a group difference along a DIAGONAL combination of outcomes that no single ANOVA could detect. The standard workflow: MANOVA first; if significant, follow up with Bonferroni-adjusted ANOVAs.' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When MANOVA is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The four conditions' },

        { type: 'steps', steps: [
          { title: 'You have 2+ INDEPENDENT GROUPS as the factor',
            body: 'Same as ANOVA — categorical factor (treatment / control / placebo, three teaching methods, etc.). Can also be extended to factorial MANOVA (multiple factors).' },
          { title: 'You have 2+ CONTINUOUS OUTCOMES that are CONCEPTUALLY RELATED',
            body: 'The multiple outcomes should belong to a shared construct or theoretical domain — e.g. five psychological wellbeing scales, multiple subject scores, multiple physiological markers. Throwing in unrelated outcomes (anxiety + income + height) makes the multivariate test hard to interpret.' },
          { title: 'Outcomes are MODERATELY correlated',
            body: 'Sweet spot: outcomes correlate around r = .3 to .7 with each other. If outcomes are uncorrelated, MANOVA gains nothing over separate ANOVAs. If outcomes are extremely highly correlated (r > .9), they are essentially the same variable and multicollinearity hurts MANOVA — combine them into a single composite first.' },
          { title: 'Adequate sample size',
            body: 'Rule of thumb: at least 20 cases per group AND more cases per group than the number of dependent variables. With 5 DVs you need n > 5 per group at the absolute minimum; ideally 30+ per group.' },
        ]},

        { type: 'comparison',
          headers: ['Situation', 'Factor(s)', 'Outcome(s)', 'Right test'],
          rows: [
            ['Compare 3 treatments on a single anxiety score',         '1 factor', '1 continuous',     'One-way ANOVA (anova-1)'],
            ['Compare 3 treatments on a single anxiety score, controlling for baseline', '1 factor', '1 continuous + covariate', 'ANCOVA (Lesson 1)'],
            ['Compare 3 treatments on a SET of 5 related outcomes',   '1 factor', '5 continuous',     '**One-way MANOVA (this lesson)**'],
            ['Compare gender × treatment on a set of outcomes',       '2 factors', 'multiple continuous', '**Factorial MANOVA** (extension)'],
            ['Compare 3 treatments on 5 outcomes, adjusting for baseline scores', '1 factor', 'multiple + covariates', 'MANCOVA (extension of MANOVA)'],
            ['Compare same participants across 3 time points on 5 outcomes', 'within-subjects',  'multiple continuous', 'Repeated-measures MANOVA / doubly-multivariate'],
          ]},

        { type: 'callout', tone: 'warning', title: 'If outcomes are unrelated, do NOT use MANOVA',
          body: 'MANOVA assumes the multiple outcomes belong to a shared multivariate construct. If you have a continuous outcome (anxiety score), a categorical outcome (treatment success Y/N), and a count (days off work) — those are different scales and conceptual domains. Use SEPARATE tests appropriate to each outcome\'s type, and apply Bonferroni correction to control family-wise error.' },
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running MANOVA in SPSS — the 7-step click path',
      blocks: [
        { type: 'heading', level: 2, text: 'The Multivariate dialog — first cousin of Univariate' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → General Linear Model → Multivariate. (Note: NOT Univariate — that\'s for ANOVA / ANCOVA.)' },
          { title: 'Move your MULTIPLE outcomes to Dependent Variables',
            body: 'E.g. **gad7_anxiety, phq9_depression, pss10_stress, self_efficacy, exam_avoidance** — all five into the Dependent Variables box.' },
          { title: 'Move your grouping variable to Fixed Factor(s)',
            body: 'E.g. **treatment_group** (1 = CBT, 2 = Peer Support, 3 = Control).' },
          { title: 'Click Options',
            body: 'Move treatment_group to Display Means for. Tick **Compare main effects**, set Confidence interval adjustment to **Bonferroni**. Tick **Descriptive statistics**, **Estimates of effect size** (partial η²), **Homogeneity tests** (this gives you Box\'s M for multivariate homogeneity, and Levene\'s per outcome). Click Continue.' },
          { title: 'Click EM Means (newer SPSS only)',
            body: 'Confirms which factors get adjusted means.' },
          { title: 'Click OK',
            body: 'SPSS produces many tables. The KEY ones in order: Box\'s Test of Equality of Covariance Matrices, Multivariate Tests (Wilks\' Λ, Pillai, etc.), Levene\'s Test of Equality of Error Variances (one per DV), Tests of Between-Subjects Effects (the univariate follow-ups, one per DV), Pairwise Comparisons.' },
          { title: 'Read in order: Box\'s M → Multivariate Tests → Levene\'s → Univariate ANOVAs → Pairwise',
            body: 'The hierarchy: first confirm assumptions hold; then read the multivariate omnibus to confirm "groups differ overall"; then drill down into which specific outcomes drive the difference.' },
        ]},

        { type: 'illustration', component: 'ManovaDialog',
          caption: 'Figure 2. The Multivariate (GLM) dialog. Dependent Variables = the FIVE related outcomes simultaneously. Fixed Factor(s) = treatment_group. Options (highlighted) = where you request the homogeneity tests, adjusted means with Bonferroni pairwise, descriptives, and partial η².' },
      ],
    },

    /* ════════════════════ 5. READING OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the MANOVA output',
      blocks: [
        { type: 'heading', level: 2, text: 'Read top-down: assumptions → multivariate → univariate' },

        { type: 'illustration', component: 'ManovaOutput',
          caption: 'Figure 3. The MANOVA output flow. (1) Box\'s M tests homogeneity of covariance matrices — Sig. should be > .001 (Box\'s is sensitive; use a stricter threshold). (2) Multivariate Tests reports four equivalent statistics; Wilks\' Λ is the default to report. (3) Levene\'s Test (one row per outcome) checks univariate homogeneity. (4) Tests of Between-Subjects Effects is the univariate follow-up (one ANOVA per outcome). (5) Pairwise Comparisons gives Bonferroni-adjusted contrasts per outcome.' },

        { type: 'heading', level: 3, text: 'Step 1 — Box\'s Test of Equality of Covariance Matrices' },

        { type: 'paragraph', text:
          'Tests whether the variance-covariance structure of the outcomes is the same across groups (the multivariate analog of Levene\'s test). Box\'s M is extremely sensitive — use a STRICTER threshold (Sig. > .001 = assumption met, not the usual .05). If Sig. ≤ .001, the assumption is violated → report **Pillai\'s Trace** instead of Wilks\' Λ (Pillai is robust to this violation).' },

        { type: 'heading', level: 3, text: 'Step 2 — Multivariate Tests (the omnibus)' },

        { type: 'comparison',
          headers: ['Column', 'What it shows'],
          rows: [
            ['**Effect**',           'The factor (e.g. treatment_group). Intercept row usually ignored.'],
            ['**Value**',             'The multivariate statistic — Wilks\' Λ, Pillai\'s Trace, etc. Different scales but all test the same null hypothesis.'],
            ['**F**',                 'Approximate F derived from the statistic. Compare across rows — should be similar.'],
            ['**Hypothesis df, Error df**', 'Degrees of freedom. Larger Hypothesis df = more outcomes × (more groups − 1).'],
            ['**Sig.**',              'p-value. If < .05, groups differ on the multivariate combination of outcomes.'],
            ['**Partial Eta Squared**', 'Effect size. .01 small, .06 medium, .14 large — same benchmarks as ANOVA.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Which row to report',
          body: 'Standard practice: **Wilks\' Lambda** unless Box\'s M is significant (use Pillai\'s Trace instead). Report: "There was a significant multivariate effect of treatment on the combined outcomes, Wilks\' Λ = .73, F(10, 166) = 2.85, p = .003, partial η² = .15." All four rows should give similar p-values; large divergence indicates assumption problems.' },

        { type: 'heading', level: 3, text: 'Step 3 — Univariate follow-ups (only if MANOVA is significant)' },

        { type: 'paragraph', text:
          'If the multivariate test is non-significant, STOP — there is no multivariate group effect, and looking at individual outcomes is fishing. If significant, proceed to the **Tests of Between-Subjects Effects** table, which reports one ANOVA per outcome. CRUCIAL: apply Bonferroni correction to the alpha — divide .05 by the number of outcomes (e.g. .05 / 5 = .01) and only treat outcome p-values below that threshold as significant.' },

        { type: 'reveal',
          prompt: 'Your MANOVA shows: Wilks\' Λ = .73, F(10, 166) = 2.85, p = .003. Box\'s M Sig. = .25. The univariate Tests of Between-Subjects Effects gives: anxiety p = .003, depression p = .04, stress p = .12, self-efficacy p = .008, avoidance p = .15. With 5 outcomes, what conclusions are defensible?',
          answer: '**Box\'s M (p = .25) confirms homogeneity of covariance matrices — Wilks\' Λ is appropriate. The multivariate effect is significant (p = .003, partial η² ≈ .15, large), so the groups differ on the joint outcome profile.** With 5 outcomes, the Bonferroni-adjusted α is .05 / 5 = .01. Outcomes that meet this stricter threshold: anxiety (p = .003 ✓) and self-efficacy (p = .008 ✓). Depression (p = .04) and stress (p = .12) and avoidance (p = .15) do NOT survive Bonferroni correction. Defensible conclusions: "the multivariate effect is driven primarily by group differences in anxiety and self-efficacy". Depression\'s univariate p < .05 is suggestive but not robust to multiple-comparison correction; mention it cautiously as exploratory.' },
      ],
    },

    /* ════════════════════ 6. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — three treatments on five outcomes',
      blocks: [
        { type: 'workedExample', title: 'A PhD study at Egerton University',
          body: [
            { label: 'The research question',
              text: 'Do three treatments (CBT, Peer Support, Control) differ in their effect on the multivariate profile of psychological outcomes (anxiety, depression, stress, self-efficacy, exam avoidance) in 90 university students with exam anxiety?' },
            { label: 'The data',
              text: 'n = 90 students (30 per condition). Factor: **treatment_group** (1 = CBT, 2 = Peer Support, 3 = Control). Outcomes (all continuous, post-treatment): gad7_anxiety, phq9_depression, pss10_stress, self_efficacy, exam_avoidance.' },
            { label: 'Step 1 — Justify MANOVA over five separate ANOVAs',
              text: 'The five outcomes are conceptually related (all psychological wellbeing measures), correlations among them range from .42 to .68 (moderate, ideal for MANOVA), and running five separate ANOVAs at α = .05 would inflate family-wise error to ~23%.' },
            { label: 'Step 2 — Run MANOVA',
              text: 'Analyze → General Linear Model → Multivariate. Dependent Variables = all five outcomes. Fixed Factor = treatment_group. Options tick Descriptive statistics, Estimates of effect size, Homogeneity tests; Display Means for treatment_group with Bonferroni pairwise. OK.' },
            { label: 'Step 3 — Check Box\'s M',
              text: 'Box\'s M = 28.6, F = 1.34, Sig. = .14. Non-significant (well above .001 threshold) — homogeneity of covariance matrices met → report Wilks\' Λ.' },
            { label: 'Step 4 — Read the multivariate test',
              text: 'Wilks\' Λ = .73, F(10, 166) = 2.85, p = .003, partial η² = .147 (large multivariate effect). Significant — proceed to univariate follow-ups.' },
            { label: 'Step 5 — Check Levene\'s per outcome',
              text: 'All five Levene\'s tests p > .15. Univariate homogeneity OK.' },
            { label: 'Step 6 — Univariate Tests of Between-Subjects Effects (Bonferroni α = .01)',
              text: 'anxiety F(2, 87) = 6.4, p = .003, partial η² = .128 (✓ survives Bonferroni); self-efficacy F(2, 87) = 5.1, p = .008, partial η² = .105 (✓); depression F(2, 87) = 3.4, p = .04, partial η² = .072 (× exploratory); stress F(2, 87) = 2.2, p = .12 (×); avoidance F(2, 87) = 1.9, p = .15 (×).' },
            { label: 'Step 7 — Bonferroni pairwise on the significant outcomes',
              text: 'For anxiety: CBT vs Control p < .001 (CBT lower); Peer vs Control p = .03 (Peer lower); CBT vs Peer p = .18 (n.s.). For self-efficacy: CBT vs Control p = .002 (CBT higher); Peer vs Control p = .09; CBT vs Peer p = .12.' },
            { label: 'Step 8 — APA write-up',
              text: '*"A one-way MANOVA was conducted to compare three treatments (CBT, n = 30; Peer Support, n = 30; Control, n = 30) on the multivariate profile of five psychological outcomes — GAD-7 anxiety, PHQ-9 depression, PSS-10 stress, study self-efficacy, and exam avoidance — in 90 university students with exam anxiety at Egerton University. Box\'s M test confirmed homogeneity of covariance matrices, M = 28.6, F = 1.34, p = .14. There was a significant multivariate effect of treatment on the combined outcomes, Wilks\' Λ = .73, F(10, 166) = 2.85, p = .003, partial η² = .15, indicating a large multivariate effect. With α = .05 / 5 = .01 (Bonferroni adjusted) for the univariate follow-ups, treatment significantly affected anxiety (F(2, 87) = 6.4, p = .003, partial η² = .13) and self-efficacy (F(2, 87) = 5.1, p = .008, partial η² = .11); depression showed a non-Bonferroni-significant trend (p = .04). Bonferroni-corrected pairwise comparisons indicated that CBT participants reported significantly lower anxiety than Controls (mean difference = −4.2, p < .001) and significantly higher self-efficacy than Controls (mean difference = +5.1, p = .002); CBT and Peer Support did not differ significantly on either outcome. The findings suggest CBT produces broad improvement across the anxiety-and-confidence domain, while peer support may have a narrower effect."*' },
          ]},
      ],
    },

    /* ════════════════════ 7. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing MANOVA up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A one-way MANOVA was conducted to compare [k] [groups description] on the multivariate profile of [list outcomes] in [n] [participants]. Box\'s M test [confirmed / indicated a violation of] homogeneity of covariance matrices, M = [value], F = [value], p = [value]. There was a [significant / non-significant] multivariate effect of [factor] on the combined outcomes, [Wilks\' Λ / Pillai\'s Trace] = [value], F([df1], [df2]) = [value], p = [value], partial η² = [value], indicating a [small / medium / large] multivariate effect. [If significant:] With Bonferroni-adjusted α = .05 / [number of outcomes] = [adjusted α] for the univariate follow-ups, [list which outcomes survived correction with their F, df, p, partial η², and which did not]. Bonferroni-corrected pairwise comparisons revealed [list significant pairwise contrasts with adjusted mean differences]. The findings suggest [substantive interpretation].' },

        { type: 'callout', tone: 'success', title: 'Eight things every MANOVA write-up must include',
          body: '**1.** Test name and the justification for multivariate over separate ANOVAs (correlated outcomes, family-wise error control). **2.** Sample sizes per group. **3.** Box\'s M test result. **4.** Multivariate test statistic (Wilks\' Λ or Pillai\'s) with F, dfs, p, partial η². **5.** Bonferroni-adjusted α for univariate follow-ups (.05 / number of outcomes). **6.** Univariate results per outcome — clearly flag which survive Bonferroni and which are exploratory. **7.** Bonferroni-corrected pairwise comparisons. **8.** Substantive interpretation of the multivariate pattern.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why MANOVA rather than five separate one-way ANOVAs?',
              a: 'Two reasons. First, running five independent ANOVAs at α = .05 would inflate the family-wise Type I error rate to approximately 23%. MANOVA performs ONE omnibus test at α = .05, preserving family-wise error. Second, the five outcomes were conceptually related (all psychological wellbeing measures) and moderately correlated (r = .42 to .68), so separate ANOVAs would have ignored the multivariate structure of the outcome space. MANOVA exploits that structure, producing a more powerful test of overall group difference and a clearer interpretation of the multivariate effect.' },
            { q: 'Did you check the assumption of homogeneity of covariance matrices?',
              a: 'Yes. Box\'s M test was non-significant, M = 28.6, F = 1.34, p = .14 (using the recommended stricter threshold of p > .001 for this notoriously sensitive test). This justified the use of Wilks\' Lambda as the multivariate test statistic. Had Box\'s M been significant, I would have reported Pillai\'s Trace instead, which is more robust to the violation.' },
            { q: 'Why apply Bonferroni correction to the univariate follow-ups when MANOVA already controls family-wise error?',
              a: 'MANOVA controls the family-wise error rate for the OMNIBUS test — the joint hypothesis that all groups are equal on all outcomes. Once that omnibus is rejected, the univariate follow-ups answer separate questions ("which outcomes drive the multivariate effect?") and the family-wise rate must be re-controlled across those follow-ups. The standard correction is α / number of outcomes (here .05 / 5 = .01). Without this, a significant MANOVA followed by five uncorrected ANOVAs would re-introduce the inflated false-positive rate that MANOVA was used to avoid.' },
          ]},
      ],
    },

    /* ════════════════════ 8. MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five common MANOVA mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Running MANOVA on unrelated outcomes',
          body: 'You threw anxiety, monthly income, and height-in-cm into a MANOVA. The multivariate test runs, but the result is meaningless — these outcomes do not share a multivariate construct.',
          fix: 'MANOVA outcomes should be CONCEPTUALLY RELATED (all psychological measures, all subject scores, all physiological markers). If your outcomes belong to different domains, use SEPARATE univariate tests with Bonferroni correction across them, not MANOVA.' },

        { type: 'mistake',
          title: 'Mistake 2 — Skipping the multivariate test and going straight to ANOVAs',
          body: 'You ran MANOVA but only reported the five univariate Tests of Between-Subjects Effects. You ignored Wilks\' Lambda entirely. You\'ve effectively done the bad thing (five separate ANOVAs) and pretended you used MANOVA.',
          fix: 'Wilks\' Lambda (or Pillai\'s Trace) IS the MANOVA result. Report it FIRST as the omnibus test. Only proceed to univariate follow-ups if the multivariate test is significant. Univariate ANOVAs without the multivariate omnibus is not MANOVA.' },

        { type: 'mistake',
          title: 'Mistake 3 — Ignoring Bonferroni correction in the univariate follow-ups',
          body: 'Your MANOVA is significant. You report the five univariate ANOVAs and call any p < .05 "significant", without correcting the alpha for multiple comparisons. You\'ve re-introduced the Type I error inflation MANOVA was supposed to prevent.',
          fix: 'For the univariate follow-ups after a significant MANOVA, use Bonferroni-adjusted α = .05 / number of outcomes. With 5 outcomes that\'s α = .01. Only treat outcome p-values below the adjusted threshold as robust; flag outcomes with .01 < p < .05 as exploratory or marginal.' },

        { type: 'mistake',
          title: 'Mistake 4 — Using Wilks\' Lambda when Box\'s M is significant',
          body: 'Box\'s M is significant (p < .001), meaning the covariance structure of your outcomes differs across groups. You reported Wilks\' Λ anyway. Wilks\' is sensitive to this violation and your p-value is biased.',
          fix: 'When Box\'s M is significant (use p > .001 as the threshold — Box\'s M is famously over-sensitive), report **Pillai\'s Trace** instead. Pillai\'s is the most robust multivariate statistic to violations of homogeneity of covariance matrices. Report Pillai\'s value, F, df, p, partial η² in your write-up.' },

        { type: 'mistake',
          title: 'Mistake 5 — Too many outcomes per group',
          body: 'You ran MANOVA on 12 outcomes with 15 cases per group. With more outcomes than cases-per-group, MANOVA estimates become unstable and the test loses power dramatically.',
          fix: 'Rule of thumb: at least 20 cases per group AND more cases per group than the number of outcomes. With 12 outcomes you need at least 20 cases per group (ideally 30+). If your sample is small, reduce the outcome set to the most theoretically central 3-5 measures, or run separate univariate tests with Bonferroni instead.' },
      ],
    },

    /* ════════════════════ 9. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'MANOVA compares groups on a SET of related continuous outcomes simultaneously — one omnibus multivariate test, then univariate follow-ups.',
          'Use when: 2+ groups, 2+ conceptually related continuous outcomes (correlations roughly .3 to .7), adequate sample size (≥ 20 per group AND > number of outcomes).',
          'The math: MANOVA finds the optimally weighted combination of outcomes that maximises group separation, then tests significance on that combination.',
          'Run via Analyze → General Linear Model → Multivariate → multiple outcomes to Dependent Variables, factor to Fixed Factor(s), Options tick everything (Bonferroni pairwise, descriptives, effect size, homogeneity tests) → OK.',
          'Read in order: Box\'s M → Multivariate Tests (Wilks\' Λ or Pillai\'s) → Levene\'s per outcome → Univariate Tests of Between-Subjects Effects → Pairwise Comparisons.',
          'If Box\'s M Sig. > .001 → use Wilks\' Λ. If Box\'s M Sig. ≤ .001 → use Pillai\'s Trace (more robust).',
          'If multivariate omnibus is significant → univariate ANOVAs with Bonferroni-adjusted α = .05 / number of outcomes. If non-significant → STOP (no fishing for individual outcomes).',
          'Effect size: partial η² for both multivariate and univariate effects. Benchmarks: .01 small, .06 medium, .14 large.',
          'Report: Box\'s M, multivariate statistic with F/df/p/partial η², Bonferroni α, univariate results clearly flagged, pairwise contrasts, substantive interpretation.',
          'Five mistakes to avoid: unrelated outcomes, skipping multivariate test, no Bonferroni on follow-ups, ignoring Box\'s M, too many outcomes per group.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 3: Mixed ANOVA** we combine between-subjects and within-subjects factors in a single analysis — e.g. comparing three treatment groups across three time points on the same participants.' },

        { type: 'paragraph', text:
          'Before moving on, find a dataset with 2-3 groups and 3+ related continuous outcomes. Run MANOVA, check Box\'s M, report Wilks\' Λ (or Pillai\'s if Box\'s M is significant), do Bonferroni-adjusted univariate follow-ups, write the APA paragraph. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 10. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'When should you use MANOVA instead of running several separate one-way ANOVAs?',
          choices: [
            'Whenever you have multiple outcomes',
            'When you have 2+ groups AND 2+ CONCEPTUALLY RELATED continuous outcomes that are moderately correlated — to control family-wise error AND exploit the multivariate structure',
            'When your sample size is small',
            'When normality is violated',
          ],
          answer: 1,
          explanation: 'Two motivations: (1) family-wise error control — five separate ANOVAs at α = .05 inflate cumulative false-positive risk to ~23%; MANOVA performs ONE omnibus test at α = .05. (2) Multivariate structure — correlated outcomes share variance; MANOVA exploits that to find effects that may be invisible to univariate tests. Outcomes must be conceptually related (all psychological measures, all subject scores). Unrelated outcomes belong in separate univariate tests with Bonferroni correction.' },

        { type: 'check',
          question: 'Your Box\'s M test returns Sig. = .03. Which multivariate statistic should you report?',
          choices: [
            'Wilks\' Lambda — it\'s always the default',
            'Pillai\'s Trace — Box\'s M is significant (using p < .001 as the threshold for this very sensitive test, p = .03 is actually not significant; but if it were significant Pillai\'s is the most robust)',
            'Neither — abandon MANOVA',
            'All four equally',
          ],
          answer: 1,
          explanation: 'Box\'s M is notoriously over-sensitive, so the convention is to use p > .001 as the threshold (NOT the usual .05). p = .03 is actually above .001, so Box\'s M is fine → Wilks\' Λ is OK. The principle stands though: when Box\'s M IS significant (p ≤ .001), switch to Pillai\'s Trace — it\'s the most robust of the four multivariate statistics to violations of covariance homogeneity. Wilks\' Λ is the default; Pillai\'s is the fallback when assumptions are violated.' },

        { type: 'check',
          question: 'Your MANOVA is significant: Wilks\' Λ = .73, F(10, 166) = 2.85, p = .003. You have 5 outcomes. What is the appropriate alpha threshold for the univariate follow-ups?',
          choices: [
            '.05 — MANOVA already controlled error',
            '.05 / 5 = .01 (Bonferroni-corrected) — to re-control family-wise error across the five univariate tests',
            '.10 — relax because you used MANOVA first',
            '.001',
          ],
          answer: 1,
          explanation: 'MANOVA controls family-wise error for the JOINT omnibus null. The univariate follow-ups answer different sub-questions ("which outcomes drive the effect?") and the family-wise rate must be re-controlled across them. Bonferroni-adjusted α = .05 / number of outcomes = .05 / 5 = .01. Without this correction, you re-introduce the very inflation MANOVA was supposed to prevent.' },

        { type: 'check',
          question: 'Your MANOVA returns Wilks\' Λ = .92, F(10, 166) = 0.71, p = .71 (non-significant). What should you do next?',
          choices: [
            'Run all five univariate ANOVAs anyway',
            'STOP — the multivariate omnibus is non-significant, so there is no overall multivariate group effect. Looking at individual outcomes is fishing and inflates Type I error',
            'Switch to Pillai\'s Trace',
            'Increase your sample size',
          ],
          answer: 1,
          explanation: 'A non-significant multivariate omnibus means there is no detectable group effect on the joint outcome profile. Running univariate ANOVAs anyway is fishing — you\'re likely to stumble on one "significant" outcome by chance (with 5 tests at α = .05, ~23% chance of at least one false positive). The disciplined response: report the non-significant MANOVA, do not proceed to univariate follow-ups, and discuss in your limitations.' },

        { type: 'check',
          question: 'What does partial η² = .15 for a multivariate MANOVA effect mean?',
          choices: [
            '15% of cases are in the largest group',
            '15% of the variance in the multivariate combination of outcomes is accounted for by group membership — a LARGE effect (above the .14 Cohen large-effect benchmark for ANOVA family)',
            '15% chance of a Type I error',
            'The model needs 15 more cases',
          ],
          answer: 1,
          explanation: 'Partial η² is the proportion of variance in the multivariate combination of outcomes attributable to the factor, after accounting for other sources. Cohen\'s benchmarks (same as ANOVA): .01 small, .06 medium, .14 large. Partial η² = .15 is solidly in the large range — a substantively meaningful multivariate effect. Always report partial η² alongside Wilks\' Λ / F / p.' },

        { type: 'check',
          question: 'Which sentence is the most professional MANOVA report?',
          choices: [
            '"MANOVA was significant."',
            '"All five outcomes differed between groups."',
            '"A one-way MANOVA showed groups differed on the combined outcomes, Wilks\' Λ = .73, F(10, 166) = 2.85, p = .003, partial η² = .15. Box\'s M was non-significant (p = .14). With Bonferroni-adjusted α = .01 for the five univariate follow-ups, treatment significantly affected anxiety (F(2, 87) = 6.4, p = .003, partial η² = .13) and self-efficacy (F(2, 87) = 5.1, p = .008, partial η² = .11); depression showed a non-Bonferroni-significant trend (p = .04)."',
            '"There were multivariate differences across groups."',
          ],
          answer: 2,
          explanation: 'Option C hits every required element: names the test, reports the multivariate statistic with F/df/p/partial η², confirms Box\'s M is non-significant, applies and reports the Bonferroni-corrected α for univariate follow-ups, distinguishes between outcomes that survive correction versus exploratory trends, and includes partial η² for each. The other options are vague or missing critical information.' },
      ],
    },
  ],
};
