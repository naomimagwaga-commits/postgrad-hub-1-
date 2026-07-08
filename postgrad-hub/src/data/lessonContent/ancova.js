/**
 * Advanced ANOVA · Lesson 1 — ANCOVA (Analysis of Covariance)
 * One-way ANOVA with one or more continuous covariates statistically controlled.
 * Renovated to Kiambu FertilizerType × FarmSizeAcres covariate standard.
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
          'You are analysing the Kiambu Maize Study (N = 180 farms) comparing three fertilizer types on maize yield. Your one-way ANOVA already showed a significant effect: DAP = 1840, CAN = 1620, Organic = 1450 kg/acre, F(2, 177) = 22.40, p < .001. Done, right?',
          'Your supervisor frowns. *"But the farms weren\'t the same size. The DAP farms averaged 3.1 acres, the CAN farms 2.4 acres, and the Organic farms only 1.8 acres. Bigger farms may naturally yield more per acre because owners can afford better preparation. Are you sure DAP wins because of the fertilizer, or because DAP-using farmers already had bigger, better-managed plots?"* Excellent question — and exactly what **ANCOVA** answers.',
          'ANCOVA (Analysis of Covariance) is one-way ANOVA plus one or more continuous COVARIATES — extra variables you did not manipulate but want to STATISTICALLY CONTROL. Add FarmSizeAcres as a covariate; ANCOVA adjusts the three fertilizer means AS IF every group had the same average farm size (2.34 acres), then compares those ADJUSTED means. If DAP still wins after adjustment, the fertilizer effect is real. If it doesn\'t, the original ANOVA was just farm-size differences dressed up as a fertilizer effect.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise** the situations where ANCOVA is the right test (one-way ANOVA + a continuous nuisance variable you want to control for).',
            '**Distinguish** "adjusted" (estimated marginal) means from "observed" means and explain why ANCOVA reports both.',
            '**Run** ANCOVA via Analyze → General Linear Model → Univariate (the same dialog as two-way ANOVA, just with a Covariates slot).',
            '**Check the three extra ANCOVA-specific assumptions** — linearity of covariate–outcome relationship, homogeneity of regression slopes, and covariate measured BEFORE the treatment.',
            '**Read the output** — the COVARIATE row, the FACTOR row, and the Estimated Marginal Means table.',
            '**Report partial η²** as the effect size.',
            '**Defend your choice of covariate** in front of an examiner — "I included FarmSizeAcres because…".',
          ]},

        { type: 'why', body:
          'In real-world Kenyan postgrad research, pre-existing differences between groups are almost universal — different schools have different baseline performance; different counties have different income distributions; different cohorts have different age structures. ANCOVA is the standard statistical tool for "comparing groups fairly" after accounting for those nuisance differences. It appears in nearly every quasi-experimental thesis where random assignment was not possible.' },
      ],
    },

    /* ════════════════════ 1.5 WHAT/WHY/WHERE/WHEN ════════════════════ */
    {
      id: 'wwww',
      title: 'What / Why / Where / When — read THIS first',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'Before touching the SPSS dialog, understand: (1) What ANCOVA IS, (2) Why you use it, (3) Where a Kenyan postgraduate would use it, (4) When to CHOOSE it over regular ANOVA.',
            'The WWWW card and key-terms callout below answer all 4 in 3 minutes.',
          ]},

        { type: 'illustration', component: 'KiambuANCOVAWWWW',
          caption: 'Figure 0. ANCOVA WHAT/WHY/WHERE/WHEN reference card using the Kiambu FertilizerType comparison with FarmSizeAcres as a covariate.' },

        { type: 'callout', tone: 'brand', title: 'Key terms you will meet in the walkthrough',
          body: [
            '**Covariate** — a continuous variable you did NOT manipulate but want to control for (e.g. FarmSizeAcres, KCPE entry score, baseline blood pressure).',
            '**Adjusted mean** (also **estimated marginal mean / EMM**) — group mean adjusted as if every group had the same average value on the covariate.',
            '**Observed mean** — the raw group mean from your data before any adjustment.',
            '**Homogeneity of regression slopes** — the covariate must relate to the outcome IN THE SAME WAY within each group. Tested by looking at the Group × Covariate interaction.',
            '**Partial eta-squared (partial η²)** — effect size for ANCOVA. Same benchmarks: .01 small, .06 medium, .14 large.',
            '**Type III Sum of Squares** — SPSS default; correctly handles the adjustment for covariate and unequal group sizes.',
          ]},
      ],
    },

    /* ════════════════════ 2. THE BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — adjusting group means for a nuisance variable',
      blocks: [
        { type: 'heading', level: 2, text: 'What ANCOVA actually does under the hood' },

        { type: 'paragraph', text:
          'Regular ANOVA compares raw group means. ANCOVA does something cleverer: it fits a regression line of outcome-on-covariate WITHIN each group, then slides all groups to the same covariate value (the grand mean of the covariate) and compares them THERE. The result: differences that remain after removing whatever the covariate could explain.' },

        { type: 'comparison',
          headers: ['Question', 'One-way ANOVA answers', 'ANCOVA answers'],
          rows: [
            ['Do the groups differ on Y?', 'Yes/no — using RAW means.', 'Yes/no — using ADJUSTED means (after equalising on the covariate).'],
            ['Does a nuisance variable affect the answer?', 'You cannot tell — it is baked in.', 'It is REMOVED. The group effect is the effect that remains AFTER accounting for the covariate.'],
            ['What effect size does it report?', 'Eta² or partial η² for group.', 'Partial η² for group AND partial η² for the covariate separately.'],
            ['What are the reported means?', 'Observed means only.', 'Both observed AND estimated marginal means (adjusted).'],
          ]},

        { type: 'definition', term: 'Covariate',
          body: 'A continuous variable you did NOT manipulate but that you suspect affects the outcome and may differ across your groups. Adding it to the model "cleans" the group comparison by removing the covariate\'s share of the variance. In Kiambu: FarmSizeAcres is a covariate because farm size affects yield AND differs across fertilizer groups.' },

        { type: 'definition', term: 'Adjusted (estimated marginal) mean',
          body: 'The group mean AS IF every group had the same average value on the covariate. For Kiambu: what the DAP yield would look like if DAP farmers had the average farm size of 2.34 acres instead of their actual 3.1-acre average. Adjusted means are the ones you report in an ANCOVA write-up — NOT the raw observed means.' },

        { type: 'analogy', title: 'Two runners, one uphill and one flat — who is faster?',
          body: 'Two runners finish a 5 km race: Runner A in 22 min running uphill, Runner B in 24 min on flat ground. Raw comparison: A wins. But that ignores the terrain (the covariate). If you STATISTICALLY REMOVE the effect of terrain — imagine both ran the same course — Runner B might actually be faster. ANCOVA does exactly this for group comparisons: strips out the nuisance variable (terrain / farm size / baseline score) so the group comparison is FAIR.' },

        { type: 'reveal',
          prompt: 'Raw yield means: DAP 1840, CAN 1620, Organic 1450. After adjusting for FarmSizeAcres, ANCOVA gives adjusted means: DAP 1832, CAN 1619, Organic 1453. The adjustments barely changed anything. What does this tell you?',
          answer: '**Farm size was NOT the confounder your supervisor feared it would be.** Even after ANCOVA equalised the three groups on farm size, DAP still leads by a large margin. The original ANOVA conclusion holds up: DAP genuinely outperforms CAN and Organic, not just because DAP farmers happened to have bigger farms. This is a "credibility-boosting" ANCOVA finding — you can now defend the original ANOVA against the "but the farms were different sizes" objection with a specific number and a citation to your ANCOVA table. Note also that the COVARIATE itself (FarmSizeAcres) IS significant in the model (p < .001, partial η² = .12) — larger farms do yield more — but that effect is now separated from the fertilizer effect, which is what we care about.' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When ANCOVA is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The conditions' },

        { type: 'steps', steps: [
          { title: 'Outcome variable is CONTINUOUS',
            body: 'Y must be Scale (yield in kg, exam score, blood pressure, income).' },
          { title: 'Grouping variable is CATEGORICAL',
            body: 'Two or more groups. Independent cases — each participant belongs to one group only.' },
          { title: 'You have at least ONE continuous COVARIATE',
            body: 'A variable that (a) is correlated with the outcome, and (b) plausibly differs across groups. Multiple covariates are allowed but keep it to 1–3 to preserve interpretability and degrees of freedom.' },
          { title: 'Covariate measured BEFORE the treatment',
            body: 'Critical. If the covariate is measured AFTER the treatment (or is affected by it), ANCOVA gives biased results. In Kiambu, FarmSizeAcres is fine — farm size does not change because of fertilizer choice. But "farmer satisfaction" measured post-harvest would NOT be a valid covariate.' },
          { title: 'Standard ANOVA assumptions apply',
            body: 'Continuous Y, normality within each group, homogeneity of variance across groups, independence of cases. PLUS two ANCOVA-specific assumptions covered in the next section.' },
        ]},

        { type: 'comparison',
          headers: ['Design', 'Right test'],
          rows: [
            ['One factor (2+ groups), continuous outcome, NO covariate', 'One-way ANOVA'],
            ['**One factor + one or more continuous covariates**',        '**ANCOVA (this lesson)**'],
            ['Two categorical factors, no covariate',                      'Two-way ANOVA'],
            ['Two categorical factors + a covariate',                      'Factorial ANCOVA (advanced — same dialog, just add both to Fixed Factor(s))'],
            ['Continuous outcome, purely continuous predictors',           'Multiple regression'],
          ]},
      ],
    },

    /* ════════════════════ 4. THE THREE EXTRA ASSUMPTIONS ════════════════════ */
    {
      id: 'ancova-assumptions',
      title: 'The three ANCOVA-specific assumptions',
      blocks: [
        { type: 'heading', level: 2, text: 'Beyond the usual ANOVA checks' },

        { type: 'paragraph', text:
          'ANCOVA inherits all the assumptions of one-way ANOVA (normality, homogeneity of variance, independence). It ALSO adds three assumptions specific to the covariate. If you skip these checks, your ANCOVA can produce misleading results — and any half-decent examiner will ask about them.' },

        { type: 'steps', steps: [
          { title: 'Assumption 1 — Covariate measured BEFORE the treatment (or independent of it)',
            body: 'The covariate must be logically PRIOR to the treatment. Otherwise the treatment may have changed the covariate, and adjusting for it distorts the effect estimate. Check: was this variable collected before assignment/treatment? For Kiambu, FarmSizeAcres was measured at recruitment — safe.' },
          { title: 'Assumption 2 — Linear relationship between covariate and outcome',
            body: 'ANCOVA fits a straight line of Y on the covariate. If the relationship is curved (e.g. yield rises with farm size up to 5 acres then plateaus), a straight-line adjustment is wrong. Check: make a scatterplot of covariate vs outcome — should look roughly linear.' },
          { title: 'Assumption 3 — Homogeneity of regression slopes',
            body: 'The relationship between covariate and outcome must be the SAME across groups. If DAP has a steep yield-vs-farmsize slope but Organic has a flat slope, one-adjustment-fits-all is wrong. TEST: add a Group × Covariate interaction term to the model. It should be NON-significant (p > .05). If significant → homogeneity of slopes is violated → use a moderation analysis or Johnson-Neyman procedure instead.' },
        ]},

        { type: 'callout', tone: 'warning', title: 'How to test homogeneity of slopes in SPSS',
          body: 'Analyze → General Linear Model → Univariate. Set up as normal (DV, Fixed Factor, Covariate). Then click **Model…** → select **Build terms** → move BOTH FertilizerType and FarmSizeAcres AND the FertilizerType*FarmSizeAcres interaction into the model → Continue → OK. Look at the Tests of Between-Subjects Effects: if FertilizerType*FarmSizeAcres has p > .05, slopes are equal → proceed with ANCOVA. If p < .05, slopes differ → do not report a simple ANCOVA.' },
      ],
    },

    /* ════════════════════ 5. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'The Kiambu procedure',
      blocks: [
        { type: 'heading', level: 2, text: 'Same GLM Univariate menu as two-way ANOVA, one extra slot' },

        { type: 'paragraph', text:
          'ANCOVA uses the SAME menu as two-way ANOVA: **Analyze → General Linear Model → Univariate**. The only new element is the Covariate(s) box on the right. Move FertilizerType to Fixed Factor(s), FarmSizeAcres to Covariate(s), Yield_KgPerAcre to Dependent Variable. That single extra assignment turns your one-way ANOVA into an ANCOVA.' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → General Linear Model → Univariate.' },
          { title: 'Move Yield_KgPerAcre to Dependent Variable',
            body: 'The continuous outcome.' },
          { title: 'Move FertilizerType to Fixed Factor(s)',
            body: 'Your grouping variable — three levels (DAP, CAN, Organic).' },
          { title: 'Move FarmSizeAcres to Covariate(s)',
            body: 'The nuisance variable you want to statistically control. THIS is the step that makes it ANCOVA rather than ANOVA.' },
          { title: 'Click EM Means…',
            body: 'Move FertilizerType into the "Display Means for" box. Tick "Compare main effects" and choose Bonferroni from the confidence-interval adjustment dropdown. Click Continue. This gives you the ADJUSTED means and pairwise comparisons between them.' },
          { title: 'Click Options…',
            body: 'Tick **Descriptive statistics**, **Estimates of effect size**, and **Homogeneity tests**. Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces: Between-Subjects Factors, Descriptive Statistics, Levene\'s Test, the **Tests of Between-Subjects Effects** table (the covariate row + the factor row), and the **Estimated Marginal Means** table.' },
        ]},

        { type: 'reasoning', headers: ['Setting', 'What we chose', 'Why'],
          rows: [
            ['Dependent Variable', 'Yield_KgPerAcre', 'The continuous outcome we want to compare across fertilizer groups.'],
            ['Fixed Factor', 'FertilizerType', 'The treatment we care about (DAP vs CAN vs Organic).'],
            ['Covariate', 'FarmSizeAcres', 'Larger farms tend to yield more per acre. Groups differ on farm size. Controlling for it strengthens the treatment comparison.'],
            ['EM Means → Compare main effects', 'Bonferroni', 'Gives adjusted pairwise comparisons with family-wise error control — safer than LSD.'],
            ['Options → Effect size', 'Ticked', 'ANCOVA reporting requires partial η² for BOTH covariate and factor.'],
            ['Options → Homogeneity tests', 'Ticked', 'Levene\'s test verifies equal variance across groups (a background ANOVA assumption).'],
          ]},

        { type: 'illustration', component: 'KiambuANCOVADialog',
          caption: 'Figure 1. The Univariate GLM dialog set up for ANCOVA. Yield_KgPerAcre as Dependent Variable, FertilizerType as Fixed Factor, FarmSizeAcres in the Covariate(s) box (highlighted gold — this is what makes it ANCOVA). The EM Means button is highlighted because that is where you request adjusted means and pairwise comparisons.' },

        { type: 'illustration', component: 'KiambuANCOVAOutput',
          caption: 'Figure 2. ANCOVA output. Covariate FarmSizeAcres F(1, 176) = 24.83, p < .001, partial η² = .124 → farm size significantly predicts yield (the covariate is "doing its job"). FertilizerType F(2, 176) = 21.69, p < .001, partial η² = .198 (LARGE) → treatment effect remains after adjustment. The Estimated Marginal Means table gives ADJUSTED means: DAP 1832, CAN 1619, Organic 1453 (all evaluated at FarmSizeAcres = 2.34, the sample average).' },
      ],
    },

    /* ════════════════════ 6. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the ANCOVA output',
      blocks: [
        { type: 'heading', level: 2, text: 'The two key tables' },

        { type: 'paragraph', text:
          'ANCOVA output has two headline tables: (1) **Tests of Between-Subjects Effects** — the F-tests for the covariate and the factor; (2) **Estimated Marginal Means** — the adjusted group means and their pairwise comparisons.' },

        { type: 'comparison',
          headers: ['Row', 'What it tests', 'What to look at'],
          rows: [
            ['**Corrected Model**', 'Does the whole model (covariate + factor) explain variance in Y?', 'Should be significant if any effect is present. R² tells overall model fit.'],
            ['**Intercept**',       'Nuisance row — just the grand mean.',                              'Ignore.'],
            ['**FarmSizeAcres**',   'Does the COVARIATE predict Y, holding group constant?',           'Sig. and partial η². If NOT significant, the covariate may not be worth including — but still report it.'],
            ['**FertilizerType**',  'Do the ADJUSTED group means differ (after controlling for covariate)?', 'THE headline result. Sig. + partial η² for the treatment effect.'],
            ['**Error**',           'Residual variance.',                                                'Informational.'],
            ['**Corrected Total**', 'Total variance in Y.',                                              'Informational.'],
          ]},

        { type: 'heading', level: 3, text: 'Compare raw means vs adjusted means' },

        { type: 'paragraph', text:
          'Always inspect both tables. Descriptive Statistics gives OBSERVED means (raw, unadjusted). Estimated Marginal Means gives ADJUSTED means (equalised on the covariate). If they are close → the covariate was not confounding the group comparison. If they differ substantially → the raw ANOVA was misleading, and the adjusted means are the ones you report.' },

        { type: 'reveal',
          prompt: 'Your ANCOVA output shows: Covariate FarmSizeAcres F(1, 176) = 24.83, p < .001, partial η² = .12. FertilizerType F(2, 176) = 21.69, p < .001, partial η² = .20. Observed means DAP = 1840, CAN = 1620, Organic = 1450. Adjusted means DAP = 1832, CAN = 1619, Organic = 1453. What is the correct interpretation?',
          answer: '**The fertilizer effect is real AND large, even after controlling for farm size.** (1) The covariate FarmSizeAcres significantly predicts yield (larger farms → more yield per acre), with a medium effect (η² = .12). (2) After removing the variance attributable to farm size, FertilizerType STILL has a large effect on yield (partial η² = .20, well above the .14 large-effect threshold). (3) The observed and adjusted means are almost identical (differences of 1–8 kg out of ~1500), meaning farm size was NOT a serious confounder — the raw ANOVA result holds up. (4) Report the ADJUSTED means (DAP 1832, CAN 1619, Organic 1453) in your Chapter 4 with a note that they are estimated marginal means adjusted for average farm size (2.34 acres). This is a "credibility-boosting" ANCOVA: your supervisor\'s concern was legitimate, you addressed it rigorously, and the conclusion survives.' },
      ],
    },

    /* ════════════════════ 7. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — Kiambu ANCOVA',
      blocks: [
        { type: 'workedExample', title: 'A Master\'s study in agricultural economics at JKUAT',
          body: [
            { label: 'The research question',
              text: 'Does maize yield differ significantly across three fertilizer types (DAP, CAN, Organic), AFTER controlling for the confounding effect of farm size?' },
            { label: 'The data',
              text: 'N = 180 smallholder farms in Kiambu County. Fertilizer type: DAP (n = 60), CAN (n = 60), Organic (n = 60). Outcome: Yield_KgPerAcre (continuous). Covariate: FarmSizeAcres (continuous, range 0.5–6.2, mean 2.34).' },
            { label: 'Step 1 — Check assumptions',
              text: 'Homogeneity of slopes: Group × Covariate interaction F(2, 174) = 1.42, p = .246 → slopes equal, safe to proceed. Levene\'s p = .134 → equal variances. Scatterplot of FarmSize vs Yield roughly linear across all three groups. All ANCOVA assumptions met.' },
            { label: 'Step 2 — Run the ANCOVA',
              text: 'Analyze → GLM → Univariate → Yield_KgPerAcre Dependent, FertilizerType Fixed Factor, FarmSizeAcres Covariate → EM Means: FertilizerType, Compare main effects (Bonferroni) → Options: Descriptive, Effect size, Homogeneity → OK.' },
            { label: 'Step 3 — Read the F-tests',
              text: 'FarmSizeAcres (covariate): F(1, 176) = 24.83, p < .001, partial η² = .124 (medium — farm size predicts yield). FertilizerType (factor): F(2, 176) = 21.69, p < .001, partial η² = .198 (LARGE — fertilizer effect after adjustment).' },
            { label: 'Step 4 — Compare observed vs adjusted means',
              text: 'Observed: DAP 1840, CAN 1620, Organic 1450. Adjusted (at FarmSize = 2.34 acres): DAP 1832, CAN 1619, Organic 1453. Almost identical → farm size was not a serious confounder.' },
            { label: 'Step 5 — Pairwise comparisons (Bonferroni)',
              text: 'DAP vs CAN: adjusted mean difference = 213 kg/acre, p < .001. DAP vs Organic: 379 kg/acre, p < .001. CAN vs Organic: 166 kg/acre, p = .002. All three pairwise differences remain significant after covariate adjustment.' },
            { label: 'Step 6 — APA write-up',
              text: '*"A one-way analysis of covariance was conducted to examine differences in maize yield across three fertilizer types (DAP, CAN, Organic) among 180 smallholder farms in Kiambu County, controlling for farm size (acres) as a covariate. Assumption checks confirmed homogeneity of regression slopes (F(2, 174) = 1.42, p = .246) and homogeneity of variance (Levene\'s p = .134). The covariate was significantly related to yield, F(1, 176) = 24.83, p < .001, partial η² = .12, with larger farms producing higher yield per acre. After controlling for farm size, there was a significant effect of fertilizer type on yield, F(2, 176) = 21.69, p < .001, partial η² = .20, a large effect. Estimated marginal means (adjusted to the mean farm size of 2.34 acres) were 1,832 kg/acre for DAP, 1,619 kg/acre for CAN, and 1,453 kg/acre for Organic. Bonferroni-adjusted pairwise comparisons showed all three fertilizer types differed significantly from one another (all p < .01), with DAP producing the highest adjusted yield. The pattern of results was consistent with the unadjusted one-way ANOVA, confirming that the fertilizer effect is not attributable to farm-size differences across groups."*' },
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
          'A one-way analysis of covariance was conducted to examine differences in [OUTCOME] across [K] levels of [FACTOR] among [N] [respondents], controlling for [COVARIATE] as a covariate. Homogeneity of regression slopes was [confirmed / violated]. Levene\'s test [was / was not] significant, indicating [equal / unequal] variances. The covariate was [significantly / non-significantly] related to [outcome], F([df]) = [F], p = [p], partial η² = [.XX]. After controlling for [covariate], there was a [significant / non-significant] effect of [factor] on [outcome], F([df]) = [F], p = [p], partial η² = [.XX]. Estimated marginal means (adjusted to the mean [covariate] of [X.XX]) were [group 1: MM], [group 2: MM], and [group 3: MM]. Bonferroni-adjusted pairwise comparisons showed [pattern].' },

        { type: 'callout', tone: 'success', title: 'Five things every ANCOVA write-up needs',
          body: '**1.** State the factor, covariate, and sample size. **2.** Report homogeneity-of-slopes and Levene\'s test results (assumption evidence). **3.** F, df, p, and partial η² for BOTH the covariate and the factor. **4.** ADJUSTED means (not observed means) plus the value of the covariate at which they are evaluated. **5.** Bonferroni-adjusted pairwise comparisons for the factor. Examiners look for all five.' },
      ],
    },

    /* ════════════════════ 9. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common ANCOVA mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Reporting observed means instead of adjusted means',
          body: 'You run ANCOVA, then report DAP 1840 / CAN 1620 / Organic 1450 in your results — the same numbers a one-way ANOVA would produce. But those are OBSERVED means, ignoring the covariate adjustment. The whole point of ANCOVA was to report the ADJUSTED numbers.',
          fix: 'Always report the ESTIMATED MARGINAL MEANS from the EM Means table (DAP 1832 / CAN 1619 / Organic 1453 in the Kiambu example), and always state the covariate value they are adjusted to ("at the mean farm size of 2.34 acres"). Otherwise the reader cannot tell you actually ran ANCOVA.' },

        { type: 'mistake',
          title: 'Mistake 2 — Skipping the homogeneity of regression slopes check',
          body: 'You go straight to the ANCOVA without testing whether the covariate–outcome relationship is the same across groups. If slopes differ, the ANCOVA F-test for the factor is biased and the adjusted means are misleading.',
          fix: 'ALWAYS check the Group × Covariate interaction FIRST (Model → Build terms → add the interaction). If p > .05, remove the interaction and run the ANCOVA properly. If p < .05, do not use ANCOVA — consider moderation analysis or the Johnson-Neyman procedure. Report the test either way as evidence you checked.' },

        { type: 'mistake',
          title: 'Mistake 3 — Using a POST-treatment covariate',
          body: 'You have a fertilizer study and someone suggests adding "Farmer_Satisfaction_Rating" (measured after harvest) as a covariate to "control for farmer effort". But satisfaction was influenced BY the harvest — it is post-treatment. Adjusting for it removes some of the treatment effect itself.',
          fix: 'Covariates must be measured BEFORE the treatment or be logically independent of it (age, gender, baseline scores, farm size, KCPE entry score). Anything measured after the treatment, or that could plausibly have been affected by the treatment, cannot be a valid covariate.' },

        { type: 'mistake',
          title: 'Mistake 4 — Including too many covariates',
          body: 'You add five covariates "just to be safe": farm size, rainfall, soil pH, farmer age, years of schooling. But now interpretation is a mess, degrees of freedom drain, and each covariate steals variance from the model in unpredictable ways.',
          fix: 'Include 1–3 covariates that (a) are strongly justified by theory or prior evidence, and (b) actually correlate with the outcome. Report a Pearson r between each candidate covariate and Y before including it. Prefer parsimony — a clean ANCOVA with one well-chosen covariate is more publishable than a bloated one with five.' },
      ],
    },

    /* ════════════════════ 10. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'ANCOVA = one-way ANOVA + one or more continuous covariates statistically controlled.',
          'Answers: "Do the groups differ AFTER equalising them on the covariate?"',
          'Reports two effects: the COVARIATE (does it predict Y?) and the FACTOR (does the treatment matter after adjustment?).',
          'Report ADJUSTED (estimated marginal) means — NOT observed means — plus the covariate value they are evaluated at.',
          'Three ANCOVA-specific assumptions: covariate measured pre-treatment, linear covariate–outcome relationship, homogeneity of regression slopes (Group × Covariate interaction NON-significant).',
          'Menu: Analyze → General Linear Model → Univariate. Fixed Factor = grouping variable. Covariate(s) = the continuous nuisance variable. EM Means for adjusted means and Bonferroni pairwise.',
          'Effect size = partial η² (.01 small, .06 medium, .14 large) for BOTH covariate and factor.',
          'Kiambu example: FertilizerType partial η² = .198 (large) after adjusting for FarmSizeAcres — fertilizer effect is real, not confounded by farm size.',
          'Avoid the four mistakes: reporting observed instead of adjusted means, skipping the slopes check, using post-treatment covariates, including too many covariates.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 2: MANOVA** — compare groups on MULTIPLE outcomes simultaneously. When you have several correlated outcomes (yield AND grain quality; anxiety AND depression AND stress), running separate ANOVAs inflates Type I error. MANOVA is the principled multivariate alternative.' },

        { type: 'paragraph', text:
          'Before moving on, take a dataset with a grouping variable and one continuous covariate. Run ANCOVA in SPSS. Check the homogeneity-of-slopes assumption. Compare observed vs adjusted means. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'What is the main purpose of adding a covariate to an ANOVA (i.e. running ANCOVA)?',
          choices: [
            'To make the analysis more complicated',
            'To statistically REMOVE the effect of a nuisance variable so the group comparison is fairer',
            'To increase the number of groups',
            'To replace one-way ANOVA when you have too many participants',
          ],
          answer: 1,
          explanation: 'ANCOVA adjusts group means as if every group had the same average value on the covariate, then compares those ADJUSTED means. This removes the covariate\'s share of the variance from the group comparison — critical when groups differ on the covariate in ways that could confound your treatment effect.' },

        { type: 'check',
          question: 'In the Kiambu ANCOVA, observed means were DAP 1840, CAN 1620, Organic 1450. Adjusted means were DAP 1832, CAN 1619, Organic 1453. What does the near-identity of these two sets tell you?',
          choices: [
            'The ANCOVA was run incorrectly',
            'FarmSizeAcres was not a serious confounder — the fertilizer effect holds up after controlling for it',
            'You should remove the covariate',
            'The three groups do not really differ',
          ],
          answer: 1,
          explanation: 'When observed and adjusted means are nearly identical, the covariate was not confounding the group comparison. The original one-way ANOVA conclusion (DAP wins) is credible — it was not driven by DAP farms happening to be bigger. This is a "credibility-boosting" ANCOVA finding: you addressed the concern rigorously and the answer survived.' },

        { type: 'check',
          question: 'What is the "homogeneity of regression slopes" assumption in ANCOVA, and how do you test it?',
          choices: [
            'That variances are equal across groups; test with Levene\'s',
            'That the covariate-outcome relationship is the SAME across groups; test by adding a Group × Covariate interaction — it should be NON-significant',
            'That the outcome is normally distributed',
            'That sample sizes are equal',
          ],
          answer: 1,
          explanation: 'ANCOVA assumes the slope of Y-on-covariate is the same in every group (so one adjustment fits all). Test by fitting a preliminary model with the Group × Covariate interaction term. If p > .05, slopes are equal and ANCOVA is valid. If p < .05, slopes differ and simple ANCOVA is inappropriate — consider moderation analysis instead.' },

        { type: 'check',
          question: 'Which of the following is NOT a valid covariate for a study comparing three teaching methods on end-of-term exam scores?',
          choices: [
            'KCPE entry score (measured on admission, before treatment)',
            'Pupil age (measured at study start)',
            'Family income (measured at study start)',
            'Pupil satisfaction with the teaching method (measured at end of term)',
          ],
          answer: 3,
          explanation: 'Covariates must be measured BEFORE the treatment (or be logically independent of it). Pupil satisfaction was measured AFTER the treatment and was almost certainly influenced by it — treating it as a covariate would remove some of the treatment effect itself, biasing the results. The other three are pre-treatment variables and are valid.' },

        { type: 'check',
          question: 'When you write up ANCOVA results, which means should you report as the primary result?',
          choices: [
            'Observed (raw) means',
            'Estimated marginal means (adjusted means), together with the value of the covariate at which they are evaluated',
            'Both, but observed means first',
            'Only the group with the highest mean',
          ],
          answer: 1,
          explanation: 'The whole point of ANCOVA is to compare ADJUSTED (estimated marginal) means. Report those, together with the value of the covariate at which they are computed (e.g. "adjusted to the mean farm size of 2.34 acres"). You can mention observed means for context, but the ADJUSTED means are the ones your F-test refers to and the ones your interpretation must reflect.' },

        { type: 'check',
          question: 'Your ANCOVA shows: FarmSize covariate F(1, 176) = 24.83, p < .001, partial η² = .12. FertilizerType F(2, 176) = 21.69, p < .001, partial η² = .20. How do you interpret?',
          choices: [
            '"Only farm size matters."',
            '"Only fertilizer matters."',
            '"Both farm size and fertilizer independently predict yield. Larger farms yield more, AND after removing that effect, fertilizer type still has a LARGE effect on yield (partial η² = .20)."',
            '"Nothing is significant."',
          ],
          answer: 2,
          explanation: 'Option C hits both effects and their interpretation correctly. The covariate (farm size) is significant AND the factor (fertilizer) is significant even after removing farm-size variance. This is exactly what a well-designed ANCOVA hopes to show: the treatment effect survives adjustment for a plausible confounder, strengthening the causal argument.' },
      ],
    },
  ],
};
