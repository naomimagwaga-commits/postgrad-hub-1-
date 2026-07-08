/**
 * Advanced ANOVA · Lesson 1 — ANCOVA (Analysis of Covariance)
 * One-way ANOVA with one or more continuous covariates statistically controlled.
 */

export const ANCOVA_LESSON = {
  id: 'advanova-1',
  title: 'ANCOVA — Analysis of Covariance',
  subtitle: 'Module 03 · Course: Advanced ANOVA · Lesson 1 of 3',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When you want to compare groups AFTER controlling for something',
      blocks: [
        { type: 'scene', body: [
          'You are doing a Master\'s study at Maseno University on three teaching methods (Traditional / Discussion / Flipped) and their effect on KCSE mock scores in 120 Form 4 pupils across three classes. You ran a one-way ANOVA and found F(2, 117) = 5.8, p = .004. The Flipped group scored highest. Done?',
          'Your supervisor frowns. "But the three classes had DIFFERENT BASELINE ability — their KCPE entry scores ranged from 220 to 410, and the Flipped class happened to have a higher entry-score average to begin with. Are you sure the Flipped class scored higher BECAUSE of the method, or because they were already better students?" Good question. And exactly the question **ANCOVA** answers.',
          'ANCOVA (Analysis of Covariance) is essentially one-way ANOVA with one or more continuous COVARIATES — extra variables you didn\'t manipulate but want to STATISTICALLY CONTROL FOR. Add KCPE entry score as a covariate; ANCOVA adjusts the three group means as if every group had the same average KCPE entry score, then compares those ADJUSTED MEANS. If the Flipped group still wins after adjustment, the method effect is real. If they don\'t, the original ANOVA result was just baseline difference dressed up as a teaching effect.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise** the situations where ANCOVA is the right test (one-way ANOVA + a continuous nuisance variable you want to control for).',
            '**Distinguish** "adjusted" (estimated marginal) means from "observed" means and explain why ANCOVA reports both.',
            '**Run** ANCOVA via Analyze → General Linear Model → Univariate (the same dialog as two-way ANOVA, just with a Covariates slot).',
            '**Check the three extra ANCOVA-specific assumptions** — linearity of covariate–outcome relationship, homogeneity of regression slopes, and covariate measured BEFORE the treatment.',
            '**Read the output** — the COVARIATE row, the FACTOR row, and the Estimated Marginal Means table.',
            '**Report partial η²** as the effect size.',
            '**Defend your choice of covariate** in front of an examiner — "I included KCPE entry score because…".',
          ]},

        { type: 'why', body:
          'In real-world Kenyan postgrad research, pre-existing differences between groups are almost universal — different schools have different baseline performance; different counties have different income distributions; different cohorts have different age structures. ANCOVA is the standard statistical tool for "comparing groups fairly" after accounting for those nuisance differences. It appears in nearly every quasi-experimental thesis where random assignment was not possible.' },
      ],
    },

    /* ════════════════════ 1.5 WHAT/WHY/WHERE/WHEN — beginner-first primer ════════════════════ */
    {
      id: 'wwww',
      title: 'What / Why / Where / When — read THIS first',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'ANCOVA (Analysis of Covariance) lets you level the playing field when your groups started off unequal. Before touching the SPSS dialog, understand: (1) What it IS, (2) Why you use it to control for a covariate, (3) Where a postgraduate would use it, (4) When to CHOOSE it over ANOVA.',
            'The WWWW card below answers all 4 in 3 minutes.',
          ]},

        { type: 'illustration', component: 'AncovaWWWW',
          caption: 'Figure 0. ANCOVA WHAT/WHY/WHERE/WHEN reference card. Bookmark this — it answers the questions examiners ask about why you added a covariate.' },
      ]
    },

    /* ════════════════════ 2. BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — adjust the means, then compare',
      blocks: [
        { type: 'heading', level: 2, text: 'A regression and an ANOVA, simultaneously' },

        { type: 'paragraph', text:
          'ANCOVA fits a SINGLE model that does two things at once: (1) a regression of the outcome on the covariate, and (2) an ANOVA on the residuals (the part of the outcome NOT predicted by the covariate). The result is a comparison of group means after their differences on the covariate have been mathematically removed.' },

        { type: 'illustration', component: 'AncovaLogic',
          caption: 'Figure 1. ANCOVA visualised. LEFT — the unadjusted means: Flipped scored highest (320), but the three groups also had different baseline KCPE entry scores. MIDDLE — the regression line of mock score on KCPE entry, drawn through the pooled data. RIGHT — the adjusted means: each group\'s mean is recomputed AS IF every group had the same average KCPE entry. The gap between groups shrinks (or grows, or changes order) once baseline ability is controlled. ANCOVA tests whether the adjusted means still differ significantly.' },

        { type: 'definition', term: 'Estimated marginal means (EMMs / adjusted means)',
          body: 'The group means PREDICTED by the ANCOVA model at the GRAND MEAN of the covariate(s). I.e. "what would each group\'s mean look like if every group had identical average KCPE entry scores?". These are the means you report in your write-up — NOT the raw observed means. SPSS prints them in the "Estimated Marginal Means" table when you click Options → Display Means for.' },

        { type: 'analogy', title: 'Comparing matatu Sacco performance after adjusting for route length',
          body: 'Three matatu Saccos report average daily takings: Sacco A = KES 5,200; Sacco B = KES 4,800; Sacco C = KES 4,400. Sacco A looks best — but Sacco A runs the longest, busiest route (CBD ↔ Kibera), while Sacco C runs short estate routes. The raw comparison is unfair. ANCOVA would treat route length as a covariate, ADJUST each Sacco\'s takings to what they would earn on an average-length route, and ask "after accounting for route length, which Sacco is actually most efficient?" The answer might be C, not A.' },

        { type: 'reveal',
          prompt: 'You run a one-way ANOVA: F(2, 117) = 5.8, p = .004 (significant). You then add KCPE entry score as a covariate (ANCOVA) and the factor row becomes F(2, 116) = 1.2, p = .31 (not significant). What does this mean?',
          answer: '**The "teaching method effect" was almost entirely explained by pre-existing baseline differences between the three classes.** Once you adjust for KCPE entry score, the apparent group differences shrink so much that they disappear into noise. Substantively: the Flipped class scored higher because they STARTED higher, not because of the teaching method. This is a critically important finding and a major risk of skipping ANCOVA in quasi-experimental research. You must report both the unadjusted ANOVA and the covariate-adjusted ANCOVA, and explicitly state that the apparent method effect was confounded by baseline ability.' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When ANCOVA is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The five conditions' },

        { type: 'steps', steps: [
          { title: 'You have one or more CATEGORICAL factors (groups)',
            body: '2+ independent groups, just like one-way ANOVA. Can also be extended to two-way / factorial designs (two factors + covariates).' },
          { title: 'Your outcome is CONTINUOUS',
            body: 'Y must be Scale — exam score, BP, income, weight, etc. For binary outcomes use binary logistic regression with covariates.' },
          { title: 'You have one or more CONTINUOUS COVARIATES to control for',
            body: 'A continuous nuisance variable that is correlated with the outcome but is NOT the focus of your research — baseline scores, age, income, prior achievement.' },
          { title: 'The covariate is MEASURED BEFORE the treatment / independently of the factor',
            body: 'CRITICAL. If the covariate could have been INFLUENCED by the factor (e.g. you measured "motivation" AFTER teaching), then "controlling" for it removes part of the treatment effect itself. Covariates must be pre-existing or measured before any intervention.' },
          { title: 'Homogeneity of regression slopes',
            body: 'The relationship between covariate and outcome must have the same SLOPE in every group. If the slopes differ, your ANCOVA is invalid and you must use an alternative (covered in the Mistakes section).' },
        ]},

        { type: 'comparison',
          headers: ['Situation', 'Factor(s)', 'Covariate(s)', 'Right test'],
          rows: [
            ['Compare 3 teaching methods adjusting for KCPE entry score', '1 factor', '1 covariate', '**ANCOVA (this lesson)**'],
            ['Compare 3 teaching methods on raw mock score',              '1 factor', 'none',         'One-way ANOVA (anova-1)'],
            ['Compare 2 hospitals on stress score',                       '1 factor (2 levels)', 'none', 'Independent-samples t-test'],
            ['Compare gender × method on score, adjusting for age',       '2 factors', '1 covariate',  '**Factorial ANCOVA** (extension of this lesson)'],
            ['Compare 3 methods on FIVE outcome variables jointly',       '1 factor', 'multiple Ys',   'MANOVA (Lesson 2)'],
            ['Compare same patients across 3 time points',                'within-subjects', 'none',    'Repeated-measures ANOVA (anova-4)'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Choose covariates BEFORE looking at the data',
          body: 'Examiners are deeply suspicious of "the kitchen-sink covariate". Pick your covariates from theory and prior literature BEFORE you run the analysis. Document them in your methods chapter ("KCPE entry score was included as a covariate because prior research has established it as a strong predictor of KCSE outcomes (Smith, 2018; Otieno, 2021)."). Adding covariates one by one until your significance result appears is data-dredging.' },
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running ANCOVA in SPSS — the 8-step click path',
      blocks: [
        { type: 'heading', level: 2, text: 'It is two-way ANOVA\'s dialog — with the Covariate(s) box used' },

        { type: 'steps', steps: [
          { title: 'Open the Univariate dialog',
            body: 'Analyze → General Linear Model → Univariate. (Same dialog you use for two-way ANOVA — just with the Covariate(s) slot active.)' },
          { title: 'Move your outcome to Dependent Variable',
            body: 'E.g. **mock_score**.' },
          { title: 'Move your grouping variable(s) to Fixed Factor(s)',
            body: 'E.g. **teaching_method** (coded 1 = Traditional, 2 = Discussion, 3 = Flipped). For factorial ANCOVA add a second factor here too.' },
          { title: 'Move your covariate(s) to Covariate(s)',
            body: 'E.g. **kcpe_entry_score**. You can add multiple covariates.' },
          { title: 'Click Model — confirm "Full factorial" (the default)',
            body: 'For standard ANCOVA, leave on Full factorial — SPSS will fit the factor main effect(s) AND the covariate, but NOT a factor × covariate interaction (which would test the homogeneity-of-slopes assumption).' },
          { title: 'Click Options',
            body: 'Move your factor into "Display Means for" — this gives you the ESTIMATED MARGINAL MEANS (adjusted means). Tick **Compare main effects**, set Confidence interval adjustment to **Bonferroni** for pairwise comparisons. Also tick **Descriptive statistics**, **Estimates of effect size** (partial η²), **Homogeneity tests** (Levene\'s). Click Continue.' },
          { title: 'Click EM Means (newer SPSS) or skip if already done',
            body: 'Confirms which factors you want adjusted means for — should already include your factor.' },
          { title: 'Click OK',
            body: 'SPSS produces several tables. The KEY ones are Tests of Between-Subjects Effects (covariate row + factor row + error), Estimated Marginal Means (the adjusted means with SEs), and Pairwise Comparisons (Bonferroni-adjusted contrasts between adjusted group means).' },
        ]},

        { type: 'illustration', component: 'AncovaDialog',
          caption: 'Figure 2. The Univariate (GLM) dialog set up for ANCOVA. Dependent Variable = mock_score. Fixed Factor(s) = teaching_method (the grouping variable). Covariate(s) = kcpe_entry_score (the variable being statistically controlled for). The Options button (highlighted) is where you request adjusted means, Bonferroni pairwise comparisons, partial η², and Levene\'s test.' },
      ],
    },

    /* ════════════════════ 5. ASSUMPTION — HOMOGENEITY OF SLOPES ════════════════════ */
    {
      id: 'homogeneity-slopes',
      title: 'The critical ANCOVA-specific assumption — homogeneity of regression slopes',
      blocks: [
        { type: 'heading', level: 2, text: 'The single assumption ANCOVA adds beyond ANOVA' },

        { type: 'paragraph', text:
          'Standard ANCOVA assumes the relationship between covariate and outcome (the regression slope) is THE SAME in every group. Geometrically: if you plotted three regression lines — one per group — they should be roughly PARALLEL. If they are not (e.g. the covariate predicts the outcome strongly in one group but weakly in another), the assumption is violated and standard ANCOVA gives misleading results.' },

        { type: 'illustration', component: 'HomogeneitySlopesCheck',
          caption: 'Figure 3. Homogeneity of regression slopes. LEFT — assumption MET: the three within-group regression lines (covariate → outcome) are roughly parallel. ANCOVA is valid; you can report group differences in adjusted means meaningfully. RIGHT — assumption VIOLATED: slopes diverge across groups, meaning the covariate has a different effect in different groups. Standard ANCOVA hides this; report the interaction instead and either describe it or use a moderation analysis.' },

        { type: 'heading', level: 3, text: 'How to test the assumption' },

        { type: 'steps', steps: [
          { title: 'Re-run with the factor × covariate interaction added',
            body: 'Analyze → General Linear Model → Univariate → set up exactly as before, but click Model → choose Custom → add the factor MAIN effect, the covariate MAIN effect, AND the factor × covariate INTERACTION (e.g. teaching_method, kcpe_entry_score, teaching_method × kcpe_entry_score). OK.' },
          { title: 'Read the interaction p-value in Tests of Between-Subjects Effects',
            body: 'If the factor × covariate INTERACTION is NON-significant (p > .05), the slopes are homogeneous → assumption met → proceed with standard ANCOVA (re-run without the interaction term).' },
          { title: 'If interaction IS significant (p < .05) → assumption VIOLATED',
            body: 'Standard ANCOVA results are misleading. Options: (1) report the interaction itself — it means the covariate effect differs across groups, which is an interesting finding in its own right; (2) use Johnson-Neyman analysis to identify the range of covariate values where groups differ; (3) report adjusted means with a strong caveat. For thesis work, option 1 is usually the cleanest defensible response.' },
        ]},

        { type: 'callout', tone: 'warning', title: 'Always test the assumption — and report the result',
          body: 'A common student mistake is running ANCOVA without ever checking homogeneity of slopes. Examiners ask. Run the interaction model FIRST, confirm the interaction is non-significant, then re-run without it for your main results. Report both: "A preliminary test showed the factor × covariate interaction was non-significant, F(2, 114) = 0.42, p = .66, confirming homogeneity of regression slopes." Then the main ANCOVA results follow.' },
      ],
    },

    /* ════════════════════ 6. READING OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the ANCOVA output',
      blocks: [
        { type: 'heading', level: 2, text: 'Three tables you must report' },

        { type: 'illustration', component: 'AncovaOutput',
          caption: 'Figure 4. The ANCOVA output. TOP — Tests of Between-Subjects Effects: the covariate row (kcpe_entry_score) shows whether the covariate significantly predicts the outcome (it usually does). The factor row (teaching_method) shows whether GROUP DIFFERENCES remain significant AFTER adjusting for the covariate. MIDDLE — Estimated Marginal Means: the ADJUSTED group means with standard errors and 95% CIs. BOTTOM — Pairwise Comparisons (Bonferroni-adjusted): which specific adjusted group means differ significantly.' },

        { type: 'heading', level: 3, text: 'Table 1 — Tests of Between-Subjects Effects' },

        { type: 'comparison',
          headers: ['Row', 'What it shows', 'What to do'],
          rows: [
            ['**Corrected Model**', 'Whether the model as a whole (covariate + factor) explains variance.',                                  'Should be significant. If not, neither covariate nor factor matters.'],
            ['**Intercept**',        'Tests whether the overall mean differs from zero.',                                                    'Usually significant; rarely interpreted.'],
            ['**[Covariate name]**', 'Tests whether the covariate significantly predicts the outcome AFTER accounting for the factor.',       'Usually significant — confirms the covariate is doing useful work. Report partial η².'],
            ['**[Factor name]**',    'THE KEY ROW: tests whether group means differ AFTER adjusting for the covariate.',                      'The hero result. Report F, df, p, partial η². Compare to the unadjusted one-way ANOVA F to see how much the covariate adjustment changed things.'],
            ['**Error**',            'The within-groups variance left after the model has done its work.',                                    'Provides the error df. Lower error than ANOVA = ANCOVA more powerful when covariate is well-chosen.'],
          ]},

        { type: 'heading', level: 3, text: 'Table 2 — Estimated Marginal Means (the ADJUSTED means)' },

        { type: 'paragraph', text:
          'Lists each group\'s ADJUSTED mean (what the mean would be if every group had the GRAND MEAN value of the covariate), with standard error and 95% CI. **These are the means you report in your write-up — NOT the observed/raw descriptive means.** The descriptive means should also be reported separately for transparency, but interpretation centres on the adjusted means.' },

        { type: 'heading', level: 3, text: 'Table 3 — Pairwise Comparisons (Bonferroni)' },

        { type: 'paragraph', text:
          'Lists every pairwise difference between adjusted group means, with the Bonferroni-adjusted p-value. This replaces Tukey HSD / Games-Howell from standard ANOVA. Reports which adjusted means differ from which.' },

        { type: 'callout', tone: 'gold', title: 'Partial η² is the effect size',
          body: 'For ANCOVA, the standard effect size is **partial η²** (NOT plain η²). Partial η² = SS_factor / (SS_factor + SS_error) — i.e. the proportion of variance in the outcome explained by the factor AFTER removing variance explained by the covariate. Benchmarks (Cohen): **.01 small, .06 medium, .14 large** — same as ANOVA. SPSS prints it in the Tests of Between-Subjects Effects table when you tick "Estimates of effect size" under Options.' },

        { type: 'reveal',
          prompt: 'Your ANCOVA shows: KCPE entry score F(1, 116) = 89.2, p < .001, partial η² = .43; teaching method F(2, 116) = 4.1, p = .019, partial η² = .066. The original ANOVA (no covariate) had teaching method F(2, 117) = 5.8, p = .004. What do you conclude?',
          answer: '**Teaching method remains a significant predictor of mock score even after adjusting for KCPE entry — but the effect is smaller than the unadjusted ANOVA suggested.** The unadjusted ANOVA reported F = 5.8, p = .004; once KCPE entry is controlled, the factor effect drops to F = 4.1, p = .019. Both are still significant, but partial η² = .066 indicates a medium effect rather than the larger apparent effect of the raw ANOVA. Substantively, some of the original "method effect" was driven by baseline differences in ability, but a genuine method effect remains. The covariate itself is highly significant (F = 89.2, p < .001, partial η² = .43) — KCPE entry score is a strong predictor of mock outcomes, which is unsurprising. Report both the unadjusted and adjusted analyses and emphasise the adjusted means as your main finding.' },
      ],
    },

    /* ════════════════════ 7. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — three teaching methods, KCPE as covariate',
      blocks: [
        { type: 'workedExample', title: 'A Master\'s study at Maseno University',
          body: [
            { label: 'The research question',
              text: 'Do three teaching methods (Traditional / Discussion / Flipped) produce different KCSE mock scores AFTER controlling for pupils\' baseline ability (KCPE entry score)?' },
            { label: 'The data',
              text: 'n = 120 Form 4 pupils across three classes (40 per method). Outcome: **mock_score** (continuous, 0-500). Factor: **teaching_method** (1 = Traditional, 2 = Discussion, 3 = Flipped). Covariate: **kcpe_entry_score** (continuous, 100-500).' },
            { label: 'Step 1 — Inspect descriptives',
              text: 'Traditional: M_mock = 280, SD = 45, M_kcpe = 295. Discussion: M_mock = 310, SD = 42, M_kcpe = 315. Flipped: M_mock = 335, SD = 48, M_kcpe = 340. The Flipped class scored highest on the mock AND highest on KCPE entry — exactly the confound ANCOVA is designed to disentangle.' },
            { label: 'Step 2 — Test homogeneity of regression slopes',
              text: 'Univariate → Model → Custom → include teaching_method, kcpe_entry_score, teaching_method × kcpe_entry_score → OK. Interaction F(2, 114) = 0.42, p = .66 — non-significant. Slopes are homogeneous; standard ANCOVA is valid.' },
            { label: 'Step 3 — Run the main ANCOVA',
              text: 'Univariate → Model → Full factorial. Dependent = mock_score. Fixed Factor = teaching_method. Covariate = kcpe_entry_score. Options → Display Means for teaching_method, Compare main effects, Bonferroni, Descriptive statistics, Estimates of effect size, Homogeneity tests. OK.' },
            { label: 'Step 4 — Check Levene\'s and read the main table',
              text: 'Levene\'s F = 0.32, p = .73 — homogeneity of error variances met. Tests of Between-Subjects Effects: covariate F(1, 116) = 89.2, p < .001, partial η² = .43; teaching method F(2, 116) = 4.1, p = .019, partial η² = .066.' },
            { label: 'Step 5 — Read the Estimated Marginal Means',
              text: 'Adjusted means (at grand mean KCPE = 317): Traditional adjusted = 291, SE = 5.2. Discussion adjusted = 309, SE = 5.1. Flipped adjusted = 325, SE = 5.3. The gap between Flipped and Traditional shrank from 55 raw points to 34 adjusted points — but Flipped is still significantly higher.' },
            { label: 'Step 6 — Read Pairwise Comparisons (Bonferroni)',
              text: 'Traditional vs Discussion: adjusted MD = −18, p = .057 (n.s. after Bonferroni). Traditional vs Flipped: MD = −34, p = .009 (significant). Discussion vs Flipped: MD = −16, p = .12 (n.s.). The Flipped method significantly outperforms Traditional even after baseline adjustment; the Discussion-Flipped contrast is not significant after controlling for ability.' },
            { label: 'Step 7 — APA write-up',
              text: '*"A one-way ANCOVA was conducted to compare KCSE mock scores across three teaching methods (Traditional, n = 40; Discussion, n = 40; Flipped, n = 40), with KCPE entry score included as a covariate to control for pre-existing baseline ability. A preliminary test confirmed homogeneity of regression slopes, F(2, 114) = 0.42, p = .66, and Levene\'s test indicated homogeneity of error variances, F(2, 117) = 0.32, p = .73. KCPE entry score significantly predicted mock score, F(1, 116) = 89.2, p < .001, partial η² = .43. After adjusting for the covariate, teaching method remained a significant predictor of mock score, F(2, 116) = 4.1, p = .019, partial η² = .066, indicating a medium-sized effect. Adjusted (estimated marginal) means were: Traditional M_adj = 291 (SE = 5.2), Discussion M_adj = 309 (SE = 5.1), Flipped M_adj = 325 (SE = 5.3). Bonferroni-adjusted pairwise comparisons revealed that pupils taught by the Flipped method scored significantly higher than those taught by the Traditional method (adjusted MD = 34, p = .009); the Traditional-Discussion and Discussion-Flipped contrasts did not reach significance after adjustment. The findings suggest a genuine method effect — Flipped > Traditional — even when baseline ability is statistically held constant, although a substantial portion of the raw group differences in mock score was attributable to pre-existing KCPE entry-score differences across classes."*' },
          ]},
      ],
    },

    /* ════════════════════ 8. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing ANCOVA up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A one-way ANCOVA was conducted to compare [OUTCOME] across [k] [groups description], with [COVARIATE] included as a covariate to control for [rationale for the covariate]. A preliminary test confirmed homogeneity of regression slopes, F([df1], [df2]) = [value], p = [value], and Levene\'s test indicated homogeneity of error variances, F([df1], [df2]) = [value], p = [value]. [Covariate] significantly predicted [outcome], F([df1], [df2]) = [value], p = [value], partial η² = [value]. After adjusting for the covariate, [factor] [was / was not] a significant predictor of [outcome], F([df1], [df2]) = [value], p = [value], partial η² = [value], indicating a [small / medium / large] effect. Adjusted means were: [Group 1] M_adj = [value] (SE = [value]), [Group 2] M_adj = [value] (SE = [value]), [Group 3] M_adj = [value] (SE = [value]). Bonferroni-adjusted pairwise comparisons revealed [list significant pairs with adjusted mean differences]. The findings suggest [substantive interpretation, contrasting with what the raw ANOVA would have shown].' },

        { type: 'callout', tone: 'success', title: 'Eight things every ANCOVA write-up must include',
          body: '**1.** Test name and rationale for the covariate. **2.** Homogeneity-of-slopes test result. **3.** Levene\'s test result. **4.** Covariate F, df, p, partial η². **5.** Factor F, df, p, partial η². **6.** ADJUSTED means with SEs per group (NOT raw means as the primary report). **7.** Pairwise comparison results (Bonferroni). **8.** Substantive interpretation noting how adjustment changed the picture from a raw ANOVA.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why ANCOVA rather than one-way ANOVA?',
              a: 'The three teaching-method groups were intact classes with markedly different baseline ability (KCPE entry-score means of 295, 315, and 340). A simple one-way ANOVA on mock scores would have confounded any genuine teaching-method effect with pre-existing differences in pupil ability. ANCOVA includes KCPE entry score as a continuous covariate, statistically equates the three groups on baseline ability, and tests whether group differences in mock scores remain after that adjustment. The result is a fairer comparison of methods.' },
            { q: 'Did you check the homogeneity-of-regression-slopes assumption?',
              a: 'Yes. A preliminary model was fitted with the teaching method × KCPE entry interaction included. The interaction was non-significant, F(2, 114) = 0.42, p = .66, confirming that the relationship between KCPE entry score and mock score was comparable across the three teaching-method groups. The standard ANCOVA model (without the interaction) was therefore appropriate.' },
            { q: 'Why report ADJUSTED means rather than raw observed means?',
              a: 'The adjusted (estimated marginal) means are the group means PREDICTED by the ANCOVA model at the grand mean of the covariate — i.e. they answer "what would each group\'s mean be if every group had identical baseline KCPE entry scores?". This is the central comparison ANCOVA is designed to make. Raw observed means confound the teaching-method effect with the baseline-ability differences that ANCOVA was used to control for. Both are reported (raw in the descriptive table; adjusted in the main results) so the reader can see how adjustment changed the picture.' },
          ]},
      ],
    },

    /* ════════════════════ 9. MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five common ANCOVA mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Reporting the raw group means instead of the adjusted means',
          body: 'You ran ANCOVA but in your Chapter 4 you put the raw observed means in the main results table. The reader cannot tell whether your "group differences" survived the covariate adjustment. ANCOVA was effectively decorative.',
          fix: 'Always report the ADJUSTED (estimated marginal) means as the main result, with their SEs and 95% CIs. Raw means can appear in the descriptive table for context, but the interpretation must be based on adjusted means. The whole point of ANCOVA is the adjustment.' },

        { type: 'mistake',
          title: 'Mistake 2 — Using a covariate measured AFTER the treatment',
          body: 'You ran an intervention and measured motivation BOTH before and after. You used the POST-treatment motivation score as a covariate when comparing intervention vs control groups on the outcome. But motivation may have been INFLUENCED by the intervention itself. Controlling for it removes part of the treatment effect — biasing your result toward null.',
          fix: 'Covariates must be measured BEFORE the treatment or be variables the treatment cannot affect (age, gender, baseline ability). Post-treatment covariates contaminate the analysis. If you only have a post-treatment measure of a relevant nuisance variable, do not use it as a covariate.' },

        { type: 'mistake',
          title: 'Mistake 3 — Skipping the homogeneity-of-slopes assumption test',
          body: 'You ran ANCOVA, reported the adjusted means and the factor p-value, and never tested whether the covariate-outcome slope was the same in each group. The assumption may have been violated and your adjusted means may be misleading.',
          fix: 'Always run the assumption test FIRST: include the factor × covariate interaction in a preliminary model. Confirm the interaction is non-significant. Report the test result, then re-run without the interaction for your main ANCOVA. If the interaction IS significant, report it as a moderation finding instead of standard ANCOVA.' },

        { type: 'mistake',
          title: 'Mistake 4 — Adding too many covariates ("kitchen-sink ANCOVA")',
          body: 'You added every variable that seemed relevant — age, gender, family income, distance from school, baseline score, etc. — until your significance result appeared. This is data-dredging and your reviewer will spot the inflated Type I error risk.',
          fix: 'Pick covariates from theory and prior literature BEFORE running the analysis. Cite the rationale in your methods chapter. Two or three well-justified covariates is the norm; more than that needs strong justification. Pre-register your covariate list if possible.' },

        { type: 'mistake',
          title: 'Mistake 5 — Using ANCOVA on a covariate that is poorly correlated with the outcome',
          body: 'You added a covariate that correlated r = .08 with the outcome. The covariate row is non-significant, the error df drops by 1, your power decreases, and you gained nothing.',
          fix: 'A useful covariate should correlate at least r = .3 with the outcome (preferably more). Otherwise it just wastes a degree of freedom without removing meaningful nuisance variance. Check the covariate-outcome correlation before adding it — and drop covariates that contribute nothing.' },
      ],
    },

    /* ════════════════════ 10. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'ANCOVA = one-way ANOVA + one or more continuous covariates statistically controlled.',
          'Conceptually: regress outcome on covariate first, then ANOVA the residuals. Reports ADJUSTED group means (as if every group had the same average covariate value).',
          'Use when: comparing groups + a continuous nuisance variable that correlates with the outcome (baseline ability, age, income).',
          'Critical: the covariate must be measured BEFORE the treatment or be unaffected by it. Pick covariates from theory before running.',
          'Run via Analyze → General Linear Model → Univariate → outcome to Dependent, factor to Fixed Factor(s), covariate to Covariate(s) → Options tick Display Means, Compare main effects (Bonferroni), Descriptive statistics, Estimates of effect size, Homogeneity tests → OK.',
          'TEST the homogeneity-of-regression-slopes assumption FIRST by including factor × covariate interaction. p > .05 = met; proceed with standard ANCOVA.',
          'Report: covariate F/p/partial η²; factor F/p/partial η²; ADJUSTED means with SEs; Bonferroni pairwise comparisons.',
          'Effect size: partial η² (.01 small, .06 medium, .14 large).',
          'Always report BOTH the unadjusted and adjusted findings — readers want to see how much the adjustment changed things.',
          'Five mistakes to avoid: reporting raw means, post-treatment covariates, skipping homogeneity test, kitchen-sink covariates, useless covariates (r < .3).',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 2: MANOVA** we extend the comparison to MULTIPLE outcome variables at once — when you want to compare groups on a SET of related outcomes (e.g. three teaching methods on five different subject scores) jointly.' },

        { type: 'paragraph', text:
          'Before moving on, find a dataset with a factor (3+ groups), a continuous outcome, and a continuous nuisance variable. Test homogeneity of slopes, run ANCOVA, report the adjusted means and Bonferroni pairwise comparisons in APA. Compare with the unadjusted ANOVA result. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'What does ANCOVA do that one-way ANOVA does not?',
          choices: [
            'Tests interactions between two factors',
            'Statistically controls for one or more continuous nuisance variables (covariates) and reports group means ADJUSTED to a common covariate value',
            'Handles repeated measures',
            'Computes Cronbach\'s alpha',
          ],
          answer: 1,
          explanation: 'ANCOVA = ANOVA + covariate(s). It fits a regression of outcome on the covariate AND an ANOVA on the residuals simultaneously. Output reports group differences AFTER adjusting for the covariate — i.e. "what would the group means look like if every group had identical covariate values?". This is exactly the right tool when groups have pre-existing baseline differences on a nuisance variable.' },

        { type: 'check',
          question: 'You ran ANCOVA. Which means should you report as your main result?',
          choices: [
            'The raw observed group means from the descriptive statistics',
            'The ADJUSTED (estimated marginal) means — the model-predicted means at the grand mean of the covariate',
            'Both — but interpret based on whichever supports your hypothesis',
            'Neither — only report the p-value',
          ],
          answer: 1,
          explanation: 'The whole point of ANCOVA is the adjustment. The adjusted (estimated marginal) means represent each group AS IF every group had the same average covariate value — answering the central ANCOVA question fairly. Raw means confound the group effect with baseline differences. Always report adjusted means with SEs as the primary result; raw means can appear in the descriptive table for context.' },

        { type: 'check',
          question: 'Why must the homogeneity-of-regression-slopes assumption be checked BEFORE the main ANCOVA?',
          choices: [
            'It is just a formality',
            'If the covariate-outcome slope differs across groups (interaction is significant), standard ANCOVA is invalid — the adjusted means become misleading because the covariate adjustment is doing different things in different groups',
            'It saves computation time',
            'SPSS won\'t run ANCOVA without it',
          ],
          answer: 1,
          explanation: 'ANCOVA assumes the covariate-outcome relationship has the same slope in every group. If slopes differ markedly (factor × covariate interaction is significant), the very concept of "adjusting" each group\'s mean by the covariate becomes incoherent — the adjustment varies by group. Run a preliminary model with the interaction included; if non-significant, proceed with standard ANCOVA. If significant, report the interaction as a moderation finding.' },

        { type: 'check',
          question: 'You used post-treatment motivation as a covariate when comparing intervention vs control on the outcome. Why is this problematic?',
          choices: [
            'It is not problematic',
            'Motivation may have been INFLUENCED by the intervention. Controlling for it removes part of the treatment effect itself, biasing your result toward null',
            'Motivation is too easy to measure',
            'SPSS does not accept post-treatment covariates',
          ],
          answer: 1,
          explanation: 'Covariates must be measured BEFORE the treatment or be variables the treatment cannot affect (e.g. age, gender, baseline ability). A post-treatment covariate that the treatment itself may have changed acts as a "mediator-in-disguise" — adjusting for it removes part of the very effect you are trying to measure. This is one of the most common ANCOVA misuses in applied research.' },

        { type: 'check',
          question: 'Your unadjusted ANOVA: F(2, 117) = 5.8, p = .004. ANCOVA with KCPE entry as covariate: F(2, 116) = 4.1, p = .019, partial η² = .07. What changed and what do you conclude?',
          choices: [
            'The teaching method effect disappeared after adjustment',
            'The teaching method effect remains significant but is SMALLER than the unadjusted ANOVA suggested. Some of the raw "method effect" was driven by pre-existing baseline differences in KCPE entry score, but a genuine, medium-sized method effect remains after adjustment',
            'The covariate did all the work',
            'You should switch to MANOVA',
          ],
          answer: 1,
          explanation: 'Both are significant but F dropped from 5.8 to 4.1 and partial η² of .07 indicates a medium effect, not the larger apparent effect of the raw ANOVA. Substantively: some of the unadjusted group difference was confounded with baseline ability, but a genuine teaching-method effect survives the adjustment. Always report BOTH analyses and explain how adjustment changed the picture — that contrast is often the most informative part of an ANCOVA result.' },

        { type: 'check',
          question: 'You added 6 covariates to your ANCOVA, including some you hadn\'t pre-specified, because the model "looked better" with them. What\'s the problem?',
          choices: [
            'Nothing — more covariates means more control',
            'Adding covariates post-hoc to make results "look better" is DATA DREDGING. It inflates Type I error and your p-values are no longer trustworthy. Pre-specify covariates based on theory and prior literature; document the list in your methods chapter',
            'Six covariates is too few',
            'You needed to run MANOVA instead',
          ],
          answer: 1,
          explanation: 'Selecting covariates after seeing what makes the result significant is data-dredging — it inflates Type I error and undermines the entire inferential framework. Pick covariates from theory before running, document them with citations in your methods chapter, and stick to that list. 2-3 well-justified covariates is the norm; more requires strong justification.' },
      ],
    },
  ],
};
