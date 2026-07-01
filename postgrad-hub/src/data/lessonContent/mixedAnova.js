/**
 * Advanced ANOVA · Lesson 3 — Mixed ANOVA (between × within)
 * Combining a between-subjects factor with a within-subjects (repeated) factor.
 */

export const MIXED_ANOVA_LESSON = {
  id: 'advanova-3',
  title: 'Mixed ANOVA — between × within designs',
  subtitle: 'Module 03 · Course: Advanced ANOVA · Lesson 3 of 3',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'Three groups × three time points — the most useful ANOVA you don\'t know yet',
      blocks: [
        { type: 'scene', body: [
          'You are doing a Master\'s study at Kenyatta University Hospital on a 12-week diabetes-education programme. You randomly assigned 75 patients to one of THREE arms — full programme (n = 25), abbreviated programme (n = 25), or usual care (n = 25). You measured their HbA1c at THREE time points — baseline (week 0), mid-trial (week 6), and end-trial (week 12). You now have a perfect 3 × 3 design.',
          'You could split this into pieces. You could run a one-way ANOVA at week 12 (comparing arms at the end) — but that ignores the baseline differences and the trajectory. You could run repeated-measures ANOVA on each arm separately (within-subject change over time) — but that ignores the comparison ACROSS arms. Both miss the most interesting question: **do the three arms have different TRAJECTORIES over time?** Does the full-programme arm improve faster than abbreviated or usual care?',
          'That question — does the within-subjects effect (time) depend on the between-subjects factor (treatment arm)? — is exactly what **mixed ANOVA** answers. It combines a between-subjects factor (treatment arm) with a within-subjects factor (time point) in one model, and the headline statistic is the **treatment × time interaction**. A significant interaction means "the trajectories differ across arms" — typically the focal hypothesis of any intervention study with repeated measurement.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise** the situations where mixed ANOVA is the right test (a between-subjects factor + a within-subjects factor measured on every participant).',
            '**Distinguish** the three effects mixed ANOVA produces: the between main effect, the within main effect, and (most importantly) the between × within INTERACTION.',
            '**Run** mixed ANOVA in SPSS via Analyze → General Linear Model → Repeated Measures, with the between-subjects factor entered separately.',
            '**Check Mauchly\'s sphericity** for the within-subjects effect; apply Greenhouse-Geisser correction if violated.',
            '**Interpret an interaction plot** — parallel lines = no interaction; crossing or diverging lines = interaction.',
            '**Follow up a significant interaction** with simple-effects analyses or pairwise contrasts.',
            '**Report partial η²** for all three effects.',
            '**Write up** the result in APA style with all the elements your reviewer will look for.',
          ]},

        { type: 'why', body:
          'Mixed ANOVA is the workhorse for any intervention study with repeated measurement — by far the most common quasi-experimental design in Kenyan postgrad clinical, education, and organisational research. Master it once and you handle the entire family of pre-post / pre-mid-post / longitudinal-cohort comparison-of-groups designs.' },
      ],
    },

    /* ════════════════════ 2. BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — the interaction is the headline',
      blocks: [
        { type: 'heading', level: 2, text: 'Three effects, but the interaction is what you care about' },

        { type: 'paragraph', text:
          'A mixed ANOVA produces THREE F-tests. They answer three different questions, and most thesis-level interpretations focus on the THIRD.' },

        { type: 'comparison',
          headers: ['Effect', 'Question it answers', 'What it tells you'],
          rows: [
            ['**Between-subjects main effect** (treatment)',  'Do treatment arms differ AVERAGED across all time points?',           'Often hard to interpret on its own — averages over baseline (where groups may be equal) and end-trial. Usually not the focal result.'],
            ['**Within-subjects main effect** (time)',         'Does the outcome change over time AVERAGED across all treatment arms?', 'Tells you whether the outcome generally drifts over time — but doesn\'t tell you whether the intervention drove the change.'],
            ['**Treatment × time INTERACTION**',                'Do the trajectories OVER TIME DIFFER across treatment arms?',           'THE HEADLINE EFFECT. A significant interaction means the time effect depends on which treatment arm you\'re in — i.e. the intervention is doing different things in different arms. This is the focal hypothesis of nearly every intervention study.'],
          ]},

        { type: 'illustration', component: 'MixedAnovaInteraction',
          caption: 'Figure 1. Three patterns of results in a mixed ANOVA. LEFT — no interaction, no main effects: all three arms flat, identical trajectories. MIDDLE — no interaction, main effects only: all arms decline, but the lines are PARALLEL. The change-over-time is the same in every arm. The intervention drives a general improvement but not differential improvement. RIGHT — significant interaction (the focal pattern in intervention research): the three arms have DIFFERENT TRAJECTORIES — the full-programme arm declines faster than abbreviated, which declines faster than usual care. Lines diverge. This is what intervention researchers hope to see and what mixed ANOVA is built to detect.' },

        { type: 'definition', term: 'Treatment × time interaction',
          body: 'The F-test of whether the within-subjects effect (time) DIFFERS across the levels of the between-subjects factor (treatment). Reported as F(df_within, df_within×between) with df adjusted for sphericity. A significant interaction (p < .05) means the trajectories of the outcome over time are not the same across groups — typically the focal evidence that an intervention produced differential change.' },

        { type: 'analogy', title: 'Three matatu Saccos and weekly fuel-price changes',
          body: 'Three Saccos record their daily takings on Monday, Wednesday, and Friday. The week sees a midweek fuel hike that affects how matatus operate. Mixed-ANOVA-style: Sacco × Day. (1) The Sacco main effect: do the three Saccos differ in takings averaged across the week? Maybe. (2) The Day main effect: do takings drop midweek averaged across all Saccos? Yes, the fuel hike hits everyone. (3) THE INTERACTION: does the day-to-day pattern differ across Saccos? If one Sacco operates only short routes (less affected by fuel) and another operates only long routes (much more affected), their day-to-day trajectories will diverge — and the interaction captures exactly that.' },

        { type: 'reveal',
          prompt: 'Your mixed ANOVA shows: treatment main effect F = 0.8, p = .44 (n.s.); time main effect F = 25.6, p < .001 (significant); treatment × time interaction F = 8.4, p < .001 (significant). What does this pattern mean substantively?',
          answer: '**The three treatment arms had no overall mean differences (when averaged across time), but they DID have different trajectories over time — which is exactly what intervention research hopes to find.** The non-significant treatment main effect simply means that at baseline (where the three arms started essentially equal) and averaged across the three time points, the arms look similar — that\'s normal and not concerning. The significant time main effect says the outcome changes over time on average. The significant interaction is the headline: the way the outcome changes over time DEPENDS on which arm you\'re in. Plot the means by time per arm to see whether the full-programme arm improved faster, plateaued earlier, etc. Then do simple-effects follow-ups: within each time point, do arms differ? Within each arm, does the outcome change?' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When mixed ANOVA is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The four telltale signs' },

        { type: 'steps', steps: [
          { title: 'A BETWEEN-SUBJECTS factor with 2+ INDEPENDENT GROUPS',
            body: 'Each participant belongs to ONE group only — e.g. treatment arm (3 levels), gender (2), school type (3). This is the "between" half.' },
          { title: 'A WITHIN-SUBJECTS factor with 2+ LEVELS',
            body: 'Every participant is measured at every level — e.g. time (baseline, mid, end), condition (drug A, drug B, placebo all on the same patients). This is the "within" half.' },
          { title: 'Continuous outcome',
            body: 'Y is Scale — HbA1c, exam score, anxiety scale. For ordinal or non-normal outcomes consider a non-parametric alternative or a mixed-effects model.' },
          { title: 'Complete data on every within-level for every participant',
            body: 'Standard mixed ANOVA is LISTWISE — drops any participant missing even one within-subjects measurement. With substantial attrition (>15%), consider a linear mixed-effects (LMM) model instead, which handles missing data more gracefully.' },
        ]},

        { type: 'comparison',
          headers: ['Situation', 'Design', 'Right test'],
          rows: [
            ['Compare 3 treatments at end-of-trial only',          '1 between, no within',  'One-way ANOVA (anova-1)'],
            ['Compare same patients at 3 time points',              '0 between, 1 within',   'Repeated-measures ANOVA (anova-4)'],
            ['Compare 3 treatments × 3 time points (same pts)',     '1 between × 1 within',  '**Mixed ANOVA (this lesson)**'],
            ['Compare gender × method × time',                       '2 between × 1 within',  '**Mixed ANOVA (3-way extension)**'],
            ['Compare 3 treatments × time on MULTIPLE outcomes',    '1 between × 1 within × multiple Ys', 'Doubly-multivariate / mixed MANOVA (extension)'],
            ['Compare 3 treatments at baseline, adjusting for covariates', '1 between + covariate', 'ANCOVA (Lesson 1)'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Mixed ANOVA is the default for intervention studies with repeated measurement',
          body: 'Any study where you (a) assign participants to different conditions/arms AND (b) measure them at multiple time points or under multiple conditions, fits the mixed-ANOVA template. The treatment × time interaction directly tests "did the arms diverge over time" — the central question of intervention research. If your design fits this template, do not run separate analyses at each time point; do mixed ANOVA.' },
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running mixed ANOVA in SPSS — the 9-step click path',
      blocks: [
        { type: 'heading', level: 2, text: 'The Repeated Measures dialog — but with a between-subjects factor too' },

        { type: 'steps', steps: [
          { title: 'Data must be in WIDE format',
            body: 'One row per participant. Within-subjects levels are SEPARATE COLUMNS (e.g. hba1c_baseline, hba1c_week6, hba1c_week12). Between-subjects factor is ONE column (treatment_arm, coded 1/2/3). If your data is in long format, restructure first via Data → Restructure → Cases to Variables.' },
          { title: 'Open the dialog',
            body: 'Analyze → General Linear Model → Repeated Measures.' },
          { title: 'Define the within-subjects factor',
            body: 'In the "Repeated Measures Define Factor(s)" pop-up: Within-Subject Factor Name = **time** (or another descriptive name); Number of Levels = **3**. Click Add. Click Define.' },
          { title: 'Map your within-subjects variables in order',
            body: 'In the Within-Subjects Variables box, drag your three time-point variables in the CORRECT ORDER: hba1c_baseline → slot (1), hba1c_week6 → slot (2), hba1c_week12 → slot (3). Order matters for interpretation.' },
          { title: 'Add the between-subjects factor',
            body: 'Drag **treatment_arm** into the Between-Subjects Factor(s) box. This is what makes the analysis MIXED rather than pure repeated-measures.' },
          { title: 'Click Plots — request the interaction plot',
            body: 'Move **time** to Horizontal Axis, **treatment_arm** to Separate Lines, click Add. This creates the line-plot showing trajectories per arm — essential for interpreting any significant interaction.' },
          { title: 'Click Options',
            body: 'Move (OVERALL), **time**, **treatment_arm**, and **time*treatment_arm** into Display Means for. Tick **Compare main effects**, set Confidence interval adjustment to **Bonferroni**. Tick **Descriptive statistics**, **Estimates of effect size** (partial η²), **Homogeneity tests**. Click Continue.' },
          { title: 'Click EM Means (newer SPSS) — confirm settings',
            body: 'Confirm the same factors are listed.' },
          { title: 'Click OK',
            body: 'SPSS produces many tables. The KEY ones in order: Box\'s Test (multivariate equality of covariance matrices), Mauchly\'s Test of Sphericity (within-subjects assumption), Tests of Within-Subjects Effects (time main effect AND time × treatment interaction), Levene\'s per time point, Tests of Between-Subjects Effects (treatment main effect), Estimated Marginal Means, Pairwise Comparisons, and the Profile Plot.' },
        ]},

        { type: 'illustration', component: 'MixedAnovaDialog',
          caption: 'Figure 2. The Repeated Measures dialog set up for mixed ANOVA. Within-Subjects Variables = the three time-point columns mapped to (1), (2), (3) in order. Between-Subjects Factor(s) = treatment_arm. Plots configured with time on horizontal axis and treatment_arm as separate lines — produces the trajectory plot. Options requests adjusted means, Bonferroni pairwise, partial η², and homogeneity tests.' },
      ],
    },

    /* ════════════════════ 5. ASSUMPTIONS ════════════════════ */
    {
      id: 'assumptions',
      title: 'The two assumption checks unique to mixed ANOVA',
      blocks: [
        { type: 'heading', level: 2, text: 'Sphericity (within) and homogeneity of covariance matrices (between)' },

        { type: 'paragraph', text:
          'Mixed ANOVA inherits the assumptions of both its parents — homogeneity of variance across groups (Levene\'s) for the between-subjects factor AND sphericity for the within-subjects factor. The two extra checks to run are Mauchly\'s test and Box\'s M.' },

        { type: 'heading', level: 3, text: 'Mauchly\'s Test of Sphericity — within-subjects' },

        { type: 'paragraph', text:
          'Sphericity = the variances of the DIFFERENCES between every pair of within-subjects levels are equal. With 3+ time points, mixed ANOVA assumes this. If Mauchly\'s Sig. > .05, sphericity is assumed; use the "Sphericity Assumed" row. If Mauchly\'s Sig. < .05, sphericity is violated; use the **Greenhouse-Geisser** corrected row (the convention) or Huynh-Feldt corrected row (used when GG correction is severe). Both adjust the dfs upward and produce a more conservative p-value.' },

        { type: 'heading', level: 3, text: 'Box\'s Test of Equality of Covariance Matrices — between × within' },

        { type: 'paragraph', text:
          'Box\'s M tests whether the variance-covariance structure of the within-subjects measurements is the same across the between-subjects groups. Use the lenient p > .001 threshold (Box\'s is over-sensitive). If violated, mixed ANOVA results may be biased; report cautiously and consider a multivariate mixed model.' },

        { type: 'comparison',
          headers: ['Test', 'Tests what', 'Threshold', 'If violated...'],
          rows: [
            ['Mauchly\'s Sphericity',  'Variances of differences between within-subjects levels',  'p > .05',  'Use Greenhouse-Geisser corrected row of the Tests of Within-Subjects Effects.'],
            ['Box\'s M',                 'Covariance matrices equal across between-subjects groups', 'p > .001', 'Report cautiously; consider linear mixed-effects model as a robust alternative.'],
            ['Levene\'s (per time point)', 'Variance of outcome equal across groups at each time point', 'p > .05',  'Robust if group sizes are roughly equal; report cautiously otherwise.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Always report Mauchly\'s and which sphericity row you used',
          body: 'A common student slip is reporting "F(2, 144) = 8.4, p < .001" without specifying which sphericity correction. If Mauchly\'s was non-significant, those dfs come from the Sphericity Assumed row. If significant, they should be Greenhouse-Geisser corrected (and look like F(1.62, 116.7) = 8.4, p < .001 — decimal dfs are normal with GG). Always cite Mauchly\'s result and the correction used.' },
      ],
    },

    /* ════════════════════ 6. READING OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the mixed ANOVA output',
      blocks: [
        { type: 'heading', level: 2, text: 'The order to read it' },

        { type: 'illustration', component: 'MixedAnovaOutput',
          caption: 'Figure 3. Mixed ANOVA output flow. (1) Mauchly\'s sphericity test — pick the right row for within-subjects effects. (2) Tests of Within-Subjects Effects — gives the time main effect AND the time × treatment interaction (the focal effect). (3) Levene\'s per time point — within-time homogeneity of variance check. (4) Tests of Between-Subjects Effects — gives the treatment main effect. (5) Profile Plot — visualises the interaction. (6) Pairwise comparisons — follow-up contrasts.' },

        { type: 'heading', level: 3, text: 'Step 1 — Mauchly\'s Test of Sphericity' },

        { type: 'paragraph', text:
          'Read FIRST. Sig. > .05 → sphericity assumed → in the next table use the "Sphericity Assumed" rows. Sig. < .05 → sphericity violated → use the "Greenhouse-Geisser" rows (decimal dfs).' },

        { type: 'heading', level: 3, text: 'Step 2 — Tests of Within-Subjects Effects' },

        { type: 'paragraph', text:
          'Lists FOUR rows per effect (Sphericity Assumed, Greenhouse-Geisser, Huynh-Feldt, Lower-bound) for EACH of the within-subjects effects: **time** and **time × treatment_arm**. Pick the sphericity row that matches Mauchly\'s result. The **time × treatment interaction** is the focal effect for intervention studies.' },

        { type: 'heading', level: 3, text: 'Step 3 — Tests of Between-Subjects Effects' },

        { type: 'paragraph', text:
          'Lists the treatment main effect (averaged across all time points). Report F, df, p, partial η² — but remember this is averaged across time and often less interpretable than the interaction.' },

        { type: 'heading', level: 3, text: 'Step 4 — Interpret the Profile Plot' },

        { type: 'paragraph', text:
          'The line plot you requested in Plots. If lines are **parallel** → no interaction. If lines **cross or diverge** → significant interaction (the trajectories differ across arms). Always include the plot in your Chapter 4.' },

        { type: 'heading', level: 3, text: 'Step 5 — Follow up a significant interaction' },

        { type: 'paragraph', text:
          'A significant time × treatment interaction tells you trajectories differ, but not WHERE. Two standard follow-ups: (a) **simple main effects of time within each treatment arm** — split the file by treatment_arm and run repeated-measures ANOVA per arm, OR use Bonferroni-adjusted pairwise comparisons from the EM Means table to identify within each arm which time points differ. (b) **simple main effects of treatment at each time point** — at baseline are groups equivalent? At week 12, do groups differ? Use one-way ANOVA per time point with Bonferroni correction across the time points.' },

        { type: 'reveal',
          prompt: 'Your mixed ANOVA: Mauchly\'s p = .03 (violated). Greenhouse-Geisser-corrected results: time F(1.62, 116.7) = 25.6, p < .001, partial η² = .26. Time × arm F(3.24, 116.7) = 8.4, p < .001, partial η² = .19. Treatment main F(2, 72) = 0.8, p = .44, partial η² = .02. The profile plot shows the full-programme arm dropping steeply, abbreviated dropping moderately, control essentially flat. What\'s your headline interpretation?',
          answer: '**The headline finding is the significant time × treatment interaction (large effect, partial η² = .19): the three treatment arms had significantly different HbA1c trajectories over the 12 weeks.** The profile plot reveals that the full-programme arm declined steepest, the abbreviated arm declined moderately, and the usual-care control arm remained essentially flat — exactly the pattern intervention researchers hope to find. The significant time main effect (partial η² = .26) confirms HbA1c changed over time on average; the non-significant treatment main effect (averaged across baseline-where-groups-were-equal-and-end) is expected and not concerning. Follow up: simple-effect tests within each arm should confirm significant drops in the two intervention arms and no significant change in usual care; comparisons at each time point should show no group differences at baseline (good — randomisation worked) but significant differences by week 12 (full < abbreviated < control).' },
      ],
    },

    /* ════════════════════ 7. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — 3 treatment arms × 3 time points',
      blocks: [
        { type: 'workedExample', title: 'A Master\'s study at Kenyatta University Hospital',
          body: [
            { label: 'The research question',
              text: 'Does a 12-week diabetes-education programme produce differential improvement in HbA1c across three arms (full programme, abbreviated, usual care) at baseline, week 6, and week 12?' },
            { label: 'The design',
              text: 'n = 75 patients (25 per arm). Between-subjects factor: **treatment_arm** (1 = full, 2 = abbreviated, 3 = control). Within-subjects factor: **time** (baseline, week 6, week 12), measured as three columns: hba1c_baseline, hba1c_week6, hba1c_week12 (all continuous, %).' },
            { label: 'Step 1 — Verify data is in WIDE format',
              text: 'One row per patient. Three time-point columns + the treatment_arm column. Confirmed.' },
            { label: 'Step 2 — Run mixed ANOVA',
              text: 'Analyze → General Linear Model → Repeated Measures. Within-Subject Factor Name = time, levels = 3, Add, Define. Map hba1c_baseline → (1), hba1c_week6 → (2), hba1c_week12 → (3). Between-Subjects Factor = treatment_arm. Plots: time horizontal, treatment_arm separate lines, Add. Options: Display Means for OVERALL, time, treatment_arm, time*treatment_arm; Compare main effects (Bonferroni); Descriptive statistics; Estimates of effect size; Homogeneity tests. OK.' },
            { label: 'Step 3 — Check Mauchly\'s',
              text: 'Mauchly\'s W = .89, χ²(2) = 8.4, p = .015. SIGNIFICANT — sphericity violated. Use Greenhouse-Geisser (ε = .81) corrected rows for the within-subjects effects.' },
            { label: 'Step 4 — Read Tests of Within-Subjects Effects (Greenhouse-Geisser rows)',
              text: 'time: F(1.62, 116.7) = 25.6, p < .001, partial η² = .26 (large). time × treatment_arm: F(3.24, 116.7) = 8.4, p < .001, partial η² = .19 (large). Strong interaction → trajectories differ across arms.' },
            { label: 'Step 5 — Read Tests of Between-Subjects Effects',
              text: 'treatment_arm: F(2, 72) = 0.8, p = .44, partial η² = .02 (small, n.s.). Expected — at baseline groups were essentially equal, so the average-across-time main effect is small.' },
            { label: 'Step 6 — Interpret the Profile Plot',
              text: 'Full programme: HbA1c declined from 8.4 (baseline) to 7.6 (week 6) to 7.0 (week 12). Abbreviated: declined from 8.5 to 8.0 to 7.6. Control: 8.4 to 8.3 to 8.3 (essentially flat). Clear divergence — full programme steepest, control flat.' },
            { label: 'Step 7 — Simple-effects follow-up',
              text: 'AT EACH TIME POINT (one-way ANOVA per time): baseline F = 0.1, p = .91 (groups equivalent, as expected from randomisation); week 6 F = 4.2, p = .019 (groups differ); week 12 F = 12.8, p < .001 (groups differ strongly). WITHIN EACH ARM (repeated-measures ANOVA per arm, Bonferroni): full programme baseline vs week 12 MD = −1.4, p < .001; abbreviated baseline vs week 12 MD = −0.9, p = .002; control baseline vs week 12 MD = −0.1, p = .58 (n.s.).' },
            { label: 'Step 8 — APA write-up',
              text: '*"A 3 × 3 mixed ANOVA was conducted to examine the effect of three treatment arms (Full Programme, n = 25; Abbreviated, n = 25; Usual Care, n = 25) on HbA1c across three time points (baseline, week 6, week 12) in 75 type-2 diabetic patients at Kenyatta University Hospital. Mauchly\'s test indicated a violation of sphericity, W = .89, χ²(2) = 8.4, p = .015, so Greenhouse-Geisser corrected dfs are reported (ε = .81). There was a significant main effect of time on HbA1c, F(1.62, 116.7) = 25.6, p < .001, partial η² = .26, indicating an overall reduction across the study period. The between-subjects main effect of treatment arm was non-significant, F(2, 72) = 0.8, p = .44, partial η² = .02, reflecting that arms were equivalent at baseline. CRUCIALLY, there was a significant time × treatment arm interaction, F(3.24, 116.7) = 8.4, p < .001, partial η² = .19, indicating that the three arms had significantly different HbA1c trajectories. The Full Programme arm showed the steepest decline (8.4 → 7.0; mean change −1.4, p < .001), Abbreviated showed moderate decline (8.5 → 7.6; mean change −0.9, p = .002), and Usual Care remained essentially unchanged (8.4 → 8.3; mean change −0.1, p = .58). One-way ANOVAs at each time point confirmed that arms did not differ at baseline (F = 0.1, p = .91) but diverged significantly by week 6 (F = 4.2, p = .019) and substantially by week 12 (F = 12.8, p < .001). The findings indicate that the structured 12-week diabetes-education programme produces dose-dependent improvement in glycaemic control, with the full programme delivering the largest and most durable reduction in HbA1c."*' },
          ]},
      ],
    },

    /* ════════════════════ 8. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing mixed ANOVA up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A [between levels] × [within levels] mixed ANOVA was conducted to examine the effect of [between-subjects factor] on [outcome] across [within-subjects factor description] in [n] [participants]. Mauchly\'s test [confirmed sphericity / indicated a violation of sphericity, W = ..., p = ...; Greenhouse-Geisser corrected dfs are reported]. There was a [significant / non-significant] main effect of [within factor], F([df1], [df2]) = [value], p = [value], partial η² = [value]. The between-subjects main effect of [between factor] was [significant / non-significant], F([df1], [df2]) = [value], p = [value], partial η² = [value]. CRUCIALLY, there was a [significant / non-significant] [within × between] interaction, F([df1], [df2]) = [value], p = [value], partial η² = [value]. [Follow-up description: trajectory per group, simple-effect tests at each time point, simple-effect tests within each group, pairwise comparisons.] The findings suggest [substantive interpretation focused on the interaction pattern].' },

        { type: 'callout', tone: 'success', title: 'Nine things every mixed ANOVA write-up must include',
          body: '**1.** Test name with design (e.g. "3 × 3 mixed ANOVA"). **2.** Sample sizes per between-subjects group. **3.** Mauchly\'s sphericity result and which correction (if any) was applied. **4.** Within-subjects main effect — F, df (with decimals if GG corrected), p, partial η². **5.** Between-subjects main effect — F, df, p, partial η². **6.** The INTERACTION effect — same statistics; this is the headline. **7.** Means per cell (per group × per time) — usually in a table or plot. **8.** Simple-effects follow-ups for a significant interaction. **9.** Substantive interpretation focused on the trajectory pattern.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why mixed ANOVA rather than separate ANOVAs at each time point?',
              a: 'A series of separate one-way ANOVAs at each time point would (a) inflate the family-wise Type I error rate across the multiple tests, (b) ignore the within-subjects correlation between repeated measurements on the same patients, throwing away power, and (c) fail to directly test the focal hypothesis — namely, that the three arms had DIFFERENT TRAJECTORIES over time. Mixed ANOVA models the full design in one analysis, accounts for the within-subjects correlation, and provides the treatment × time interaction that directly tests differential change — the headline question of any intervention study with repeated measurement.' },
            { q: 'Why is the non-significant between-subjects main effect not a concern?',
              a: 'The between-subjects main effect tests whether the three arms differ when averaged across all three time points, including baseline. Because randomisation ensured arms were equivalent at baseline (confirmed by the simple-effects test, F = 0.1, p = .91), averaging baseline equality with later differences dilutes the apparent main effect. The interpretive focus is properly on the time × treatment interaction, which directly tests differential change — and which was highly significant with a large effect size (partial η² = .19). The non-significant between-subjects main effect is in fact a desirable indicator that the randomisation worked.' },
            { q: 'Why did you use simple-effects follow-ups rather than just reporting the interaction?',
              a: 'A significant interaction tells us trajectories differ across arms, but does not specify where or how. Simple-effects analyses unpack the interaction in two complementary directions: (a) tests at each time point reveal that arms were equivalent at baseline but diverged significantly by week 6 and substantially by week 12 — confirming the trajectories diverged over the course of the trial; (b) tests within each arm reveal that the Full Programme and Abbreviated arms showed significant pre-post improvement while the Usual Care arm did not — confirming that the differential trajectories reflect intervention effects rather than secular trends. Both simple-effects directions are standard reporting practice for a significant mixed-ANOVA interaction.' },
          ]},
      ],
    },

    /* ════════════════════ 9. MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five common mixed ANOVA mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Treating it as separate one-way ANOVAs at each time point',
          body: 'You ran three one-way ANOVAs (one at each time point) instead of one mixed ANOVA. You inflate family-wise error, ignore within-subject correlation, lose power, and fail to test the focal hypothesis (differential trajectories).',
          fix: 'Use mixed ANOVA when you have a between-subjects factor AND a within-subjects factor measured on the same participants. The time × treatment interaction directly tests differential change. Separate ANOVAs come later, as simple-effects follow-ups to a significant interaction — never as the primary analysis.' },

        { type: 'mistake',
          title: 'Mistake 2 — Reporting "Sphericity Assumed" rows when Mauchly\'s is significant',
          body: 'Mauchly\'s p = .02 (violated) but you reported the "Sphericity Assumed" rows from the Tests of Within-Subjects Effects table. Your p-values are anti-conservative — inflated false-positive risk.',
          fix: 'When Mauchly\'s Sig. < .05, report the **Greenhouse-Geisser** corrected rows. The dfs will look decimal (e.g. F(1.62, 116.7) = 8.4) — that is correct and expected, not a typo. Always cite Mauchly\'s result and the correction you used.' },

        { type: 'mistake',
          title: 'Mistake 3 — Interpreting the between-subjects main effect when the interaction is significant',
          body: 'Your interaction is significant. You then report "treatment had no overall effect, F = 0.8, p = .44". But the between-subjects main effect is averaged across time and is almost always less informative than the interaction. Highlighting it misleads the reader.',
          fix: 'When the interaction is significant, the interaction is the headline. Report all three effects, but interpret the interaction first and most prominently. The between-subjects main effect is often non-significant in well-randomised studies precisely because randomisation makes arms equivalent at baseline — that\'s a good thing.' },

        { type: 'mistake',
          title: 'Mistake 4 — Skipping simple-effects follow-ups after a significant interaction',
          body: 'You reported the significant interaction and stopped. The reader has no idea whether the divergence began at week 6 or only at week 12, whether the control arm changed at all, or whether the Full vs Abbreviated contrast was significant at the end.',
          fix: 'Always follow a significant interaction with simple-effects analyses: (a) tests at each time point (one-way ANOVA per time, Bonferroni-corrected across time points); (b) tests within each group (repeated-measures ANOVA per group, with pairwise comparisons between time points). Report both directions of unpacking.' },

        { type: 'mistake',
          title: 'Mistake 5 — Handling missing data by listwise deletion when attrition is substantial',
          body: 'Of 75 enrolled patients, 14 missed at least one follow-up. Mixed ANOVA dropped them all. Your effective N is 61 (81%), losing power and potentially biasing results if dropouts differed systematically (which they almost always do).',
          fix: 'For attrition > 15%, consider a **linear mixed-effects model (LMM)** instead of standard mixed ANOVA. LMM uses all available data (does not require complete cases on every within-subjects level), handles missing data under MAR assumptions more gracefully, and is the modern standard for longitudinal trials. In SPSS: Analyze → Mixed Models → Linear. For thesis-level work, report mixed ANOVA as the primary analysis if attrition is low; mention LMM as a robustness check if attrition is meaningful.' },
      ],
    },

    /* ════════════════════ 10. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Mixed ANOVA combines a BETWEEN-SUBJECTS factor (groups) with a WITHIN-SUBJECTS factor (repeated measurements on the same people) in one analysis.',
          'Produces THREE effects: between main, within main, AND the interaction. The INTERACTION is typically the headline — it tests whether trajectories differ across groups.',
          'Use when: 2+ independent groups + 2+ repeated measurements on the same participants on a continuous outcome.',
          'Run via Analyze → General Linear Model → Repeated Measures → define within-factor with k levels → map within-variables in order → put between-factor in Between-Subjects Factor(s) → Plots with within on horizontal and between as separate lines → Options for adjusted means, Bonferroni pairwise, partial η², homogeneity tests → OK.',
          'Data must be in WIDE format (one row per participant, one column per within-subjects level).',
          'Always check Mauchly\'s sphericity for the within-subjects effect. p > .05 → Sphericity Assumed rows. p < .05 → Greenhouse-Geisser corrected rows (decimal dfs are normal).',
          'Also check Box\'s M (lenient threshold p > .001) for between × within homogeneity of covariance matrices.',
          'When the interaction is significant, follow up with simple-effects analyses: one-way ANOVA per time point (Bonferroni across time) AND repeated-measures ANOVA per group (Bonferroni pairwise within group).',
          'Effect size: partial η² for all three effects. Benchmarks: .01 small, .06 medium, .14 large.',
          'Five mistakes to avoid: separate ANOVAs per time, ignoring Mauchly, over-interpreting non-significant between effect, skipping simple-effects, listwise-deleting heavy attrition (consider LMM instead).',
        ]},

        { type: 'callout', tone: 'gold', title: 'Course complete — Advanced ANOVA',
          body: 'You\'ve now finished the **Advanced ANOVA** course — ANCOVA for adjusted comparisons with continuous covariates, MANOVA for multiple outcomes simultaneously, and mixed ANOVA for between × within designs. Combined with the base ANOVA course (one-way, two-way, repeated-measures, post-hoc), you now have the entire ANOVA family for nearly any postgrad design.' },

        { type: 'paragraph', text:
          'Before moving on, find a dataset with a between-subjects factor (2+ groups) AND a within-subjects factor (repeated measurements on the same participants). Run mixed ANOVA, check Mauchly\'s, interpret the interaction, follow up with simple-effects analyses, and write up the result in APA. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'Which effect in a mixed ANOVA is typically the HEADLINE finding in intervention research?',
          choices: [
            'The between-subjects main effect',
            'The within-subjects main effect',
            'The between × within INTERACTION — tests whether the trajectories over time DIFFER across treatment groups',
            'Mauchly\'s sphericity test',
          ],
          answer: 2,
          explanation: 'In intervention research with repeated measurement, the central question is "do the treatment arms have different trajectories over time?". The between × within interaction directly tests this. The between-subjects main effect averages across all time points (including baseline where well-randomised groups are equal, so it\'s often non-significant in clean intervention studies). The within-subjects main effect tells you the outcome changes over time on average but not whether intervention drove the change. The interaction is the focal effect.' },

        { type: 'check',
          question: 'You have 3 treatment arms × 3 time points × 75 patients. Which test?',
          choices: [
            'One-way ANOVA',
            'Repeated-measures ANOVA',
            'Mixed ANOVA — 1 between-subjects factor (treatment arm) × 1 within-subjects factor (time)',
            'MANOVA',
          ],
          answer: 2,
          explanation: 'Treatment arm = between-subjects factor (each patient in one arm only). Time = within-subjects factor (every patient measured at every time point). The combination is mixed ANOVA. One-way ANOVA would compare arms at a single time point only. Repeated-measures ANOVA would track change within one group only. MANOVA is for multiple outcome variables at once.' },

        { type: 'check',
          question: 'Mauchly\'s test returns p = .02 (significant). What should you do?',
          choices: [
            'Stop the analysis',
            'Report the "Sphericity Assumed" rows of the Tests of Within-Subjects Effects',
            'Report the "Greenhouse-Geisser" corrected rows — the corrected dfs will look decimal (e.g. F(1.62, 116.7) = 8.4), which is correct and expected',
            'Switch to MANOVA',
          ],
          answer: 2,
          explanation: 'Mauchly\'s p < .05 means sphericity is violated. Use Greenhouse-Geisser corrected rows for ALL within-subjects effects (both the main effect and the interaction). The corrected dfs are non-integer because they\'re multiplied by the epsilon (ε) value from the sphericity test. Cite both: "Mauchly\'s indicated sphericity violated, p = .02; Greenhouse-Geisser corrected dfs are reported (ε = .81)."' },

        { type: 'check',
          question: 'Your treatment × time interaction is significant: F(3.24, 116.7) = 8.4, p < .001, partial η² = .19. What does this mean?',
          choices: [
            'All three arms have the same trajectory',
            'The three arms have SIGNIFICANTLY DIFFERENT TRAJECTORIES over time — a large effect, indicating differential change. Follow up with simple-effects analyses (one-way ANOVA per time point, repeated-measures ANOVA per arm)',
            'Mauchly\'s test failed',
            'Sample size is too small',
          ],
          answer: 1,
          explanation: 'A significant interaction means the within-subjects effect (time) depends on the between-subjects factor (treatment). The arms\' trajectories differ — exactly what intervention research hopes for. Partial η² = .19 (above the .14 large-effect benchmark) confirms substantial differential change. Always plot the profile to see HOW trajectories differ, then do simple-effects to unpack at which time points groups diverge and within which arms change is significant.' },

        { type: 'check',
          question: 'Your between-subjects main effect is non-significant (F = 0.8, p = .44) but your interaction IS significant. Is the non-significant main effect a problem?',
          choices: [
            'Yes — the analysis is invalid',
            'No — when randomisation makes arms equivalent at baseline, averaging baseline equality with later differences dilutes the main effect. A non-significant between-subjects main effect alongside a significant interaction is in fact often a DESIRABLE sign that randomisation worked. The interaction is the focal finding',
            'Yes — you need to drop a treatment arm',
            'No — but you should run separate ANOVAs',
          ],
          answer: 1,
          explanation: 'The between-subjects main effect averages across all time points, including baseline where well-randomised groups are equal. This dilutes the average difference. A non-significant main effect alongside a significant interaction simply means "arms started equal but diverged over time" — exactly the intervention pattern. Report all three effects but interpret the interaction as the headline finding.' },

        { type: 'check',
          question: 'After a significant interaction, why do you follow up with simple-effects analyses?',
          choices: [
            'For decoration',
            'To unpack WHERE the trajectories differ: (a) at which TIME POINTS the groups diverged, and (b) within which GROUPS the outcome changed significantly. Without simple-effects, the reader knows trajectories differ but cannot tell how or when',
            'To prove the interaction was real',
            'To get more p-values',
          ],
          answer: 1,
          explanation: 'A significant interaction means trajectories differ but doesn\'t pinpoint where or how. Simple-effects unpack the interaction in two complementary directions: (1) one-way ANOVA at each time point (Bonferroni-corrected across time) — at baseline are groups equal? At end, do they differ? (2) Repeated-measures ANOVA within each group (Bonferroni pairwise) — did the outcome change significantly in each arm? Both directions are standard reporting practice and answer the substantive questions readers care about.' },
      ],
    },
  ],
};
