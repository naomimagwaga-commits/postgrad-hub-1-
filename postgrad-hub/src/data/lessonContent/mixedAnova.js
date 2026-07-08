/**
 * Advanced ANOVA · Lesson 3 — Mixed ANOVA (between × within)
 * Combining a between-subjects factor with a within-subjects (repeated) factor.
 * Renovated to Nakuru Wellness SBP × Time × Sex standard.
 */

export const MIXED_ANOVA_LESSON = {
  id: 'advanova-3',
  title: 'Mixed ANOVA — between × within designs',
  subtitle: 'Module 03 · Course: Advanced ANOVA · Lesson 3 of 3',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'Three time points × two groups — the most useful ANOVA you may not know yet',
      blocks: [
        { type: 'scene', body: [
          'You are analysing the Nakuru Wellness Study (N = 45) — a 12-week lifestyle intervention on adults with elevated blood pressure. You measured systolic blood pressure (SBP) at THREE time points: baseline (T0), mid-programme (T1, week 6), and end-programme (T2, week 12). Overall the sample shows a healthy decline: T0 = 142.4, T1 = 138.9, T2 = 134.2 mmHg. Your repeated-measures ANOVA (Lesson 2 of ANOVA course) already confirmed the time effect is significant.',
          'But your reviewer asks: *"Did the intervention work equally well for men and women? Or do the sexes have different TRAJECTORIES over time?"* That question — does the within-subjects effect (time) DEPEND on the between-subjects factor (sex)? — is exactly what **Mixed ANOVA** answers. Mixed ANOVA combines a between-subjects factor (Sex: 22 men, 23 women) with a within-subjects factor (Time: T0, T1, T2) in one model, and the headline statistic is the **Sex × Time interaction**. A significant interaction means "the trajectories differ across sexes" — typically the focal hypothesis of any intervention study with repeated measurement.',
          'This lesson teaches you Mixed ANOVA: how to set it up, the three effects it produces (between main effect, within main effect, between × within interaction), how to handle sphericity for the within factor, and how to interpret the interaction plot. By the end you will own the workhorse analysis for pre-post-follow-up intervention studies — by far the most common quasi-experimental design in Kenyan postgrad research.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise** the situations where Mixed ANOVA is the right test (a between-subjects factor + a within-subjects factor measured on every participant).',
            '**Distinguish** the three effects Mixed ANOVA produces: the between main effect, the within main effect, and (most importantly) the between × within INTERACTION.',
            '**Run** Mixed ANOVA in SPSS via Analyze → General Linear Model → Repeated Measures, with the between-subjects factor entered separately.',
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

    /* ════════════════════ 1.5 WHAT/WHY/WHERE/WHEN ════════════════════ */
    {
      id: 'wwww',
      title: 'What / Why / Where / When — read THIS first',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'Before touching the SPSS dialog, understand: (1) What Mixed ANOVA IS, (2) Why you use it, (3) Where a Kenyan postgraduate would use it, (4) When to CHOOSE it over separate between and within analyses.',
            'The WWWW card and key-terms callout below answer all 4 in 3 minutes.',
          ]},

        { type: 'illustration', component: 'NakuruMixedWWWW',
          caption: 'Figure 0. Mixed ANOVA WHAT/WHY/WHERE/WHEN reference card using Nakuru Wellness SBP measured at 3 time points (within factor) crossed with Sex (between factor).' },

        { type: 'callout', tone: 'brand', title: 'Key terms you will meet in the walkthrough',
          body: [
            '**Between-subjects factor** — a grouping variable where each participant belongs to ONE level only (e.g. Sex: male or female; Treatment vs Control).',
            '**Within-subjects factor** — a variable where every participant provides data at ALL levels (e.g. Time: T0, T1, T2). Also called "repeated measures".',
            '**Mixed design** — one between factor + one within factor combined in the same model.',
            '**Between × Within interaction** — the KEY effect in Mixed ANOVA: do the trajectories on the within factor DIFFER across levels of the between factor?',
            '**Mauchly\'s sphericity** — the assumption that variances of the differences between all pairs of within-subjects levels are equal. Tested automatically; use Greenhouse-Geisser correction if violated.',
            '**Partial eta-squared (partial η²)** — effect size for each of the three effects. Same benchmarks: .01 small, .06 medium, .14 large.',
          ]},
      ],
    },

    /* ════════════════════ 2. BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — three effects, one model',
      blocks: [
        { type: 'heading', level: 2, text: 'Three F-tests, three questions' },

        { type: 'paragraph', text:
          'Mixed ANOVA produces THREE F-tests in one analysis, each answering a different question about the design:' },

        { type: 'comparison',
          headers: ['Effect', 'Question it answers', 'Nakuru example'],
          rows: [
            ['**Within main effect (Time)**',                'Does the OUTCOME change over the within-subjects levels, averaged across the between-subjects groups?', 'Does SBP change over T0, T1, T2 combining men and women?'],
            ['**Between main effect (Sex)**',                'Does the OUTCOME differ across the between-subjects groups, averaged across the within-subjects levels?', 'Do men and women differ in average SBP across the whole study?'],
            ['**Between × Within interaction (Sex × Time)**', 'Does the TRAJECTORY over time DEPEND on the between-subjects group?',                                    'Do men and women change DIFFERENTLY over T0 → T1 → T2?'],
          ]},

        { type: 'definition', term: 'Between × Within interaction',
          body: 'The most important test in Mixed ANOVA. A significant interaction means the pattern of change over the within-subjects factor (time) is NOT the same across levels of the between-subjects factor (sex). For example, women may drop from 143 → 132 mmHg while men only drop from 141 → 136 mmHg — different trajectories. This is exactly the question intervention researchers care about most: "Did our intervention work MORE for one group than another?"' },

        { type: 'analogy', title: 'Two runners on a track — different speeds AND different paces?',
          body: 'Two runners start the same race. The **within main effect** is whether either speeds up or slows down as the race progresses (do people generally get faster or slower over laps?). The **between main effect** is whether one runner is faster overall (a whole-race advantage). The **interaction** is whether they change speed at different rates — maybe Runner A starts strong and fades while Runner B starts slow and accelerates. Mixed ANOVA gives you all three pieces of information in one analysis: overall pace change (time), overall speed advantage (group), and different pacing strategies (interaction).' },

        { type: 'reveal',
          prompt: 'You find: significant Time main effect (p < .001, partial η² = .47); non-significant Sex main effect (p = .147); significant Sex × Time interaction (p = .006, partial η² = .12). What does this combination mean?',
          answer: '**SBP dropped overall across the three time points AND the pattern of dropping differed between men and women — but the sexes did not differ in AVERAGE SBP across the whole study.** (1) The intervention worked overall — SBP fell over time regardless of sex (Time main effect, LARGE). (2) Men and women had similar OVERALL average SBP across all three time points combined (Sex main effect ns) — because their averages happened to be roughly the same across the whole 12 weeks. (3) BUT the interaction is significant — meaning the SHAPE of the decline differed. Perhaps women dropped steeply between T0 and T1 and levelled off, while men dropped more gradually across all three time points. The interaction is the practically interesting result: the intervention affects the two sexes DIFFERENTLY over time, even if they end at similar overall averages. Next step: inspect the interaction plot to describe the pattern.' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When Mixed ANOVA is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The conditions' },

        { type: 'steps', steps: [
          { title: 'Continuous outcome (Y is Scale)',
            body: 'SBP, exam score, self-esteem index, yield, etc.' },
          { title: 'At least ONE between-subjects factor',
            body: 'A grouping variable where each participant belongs to one level (Sex: M/F; Treatment: A/B/C).' },
          { title: 'At least ONE within-subjects factor',
            body: 'A repeated measurement where every participant provides data at each level (Time: T0/T1/T2; Condition: baseline/stress/recovery).' },
          { title: 'Same participants measured at each within level',
            body: 'The 45 Nakuru participants each provide 3 SBP readings. No participant missing at any time point (or use listwise deletion / MANOVA-approach for missing data).' },
          { title: 'Assumptions: normality per cell, sphericity for within factor, homogeneity of between-group variance',
            body: 'Roughly normal within each cell of the design. Mauchly for sphericity (within). Levene / Box\'s M for homogeneity across between groups. Sample per group ≥ 15 for stability.' },
        ]},

        { type: 'comparison',
          headers: ['Design', 'Right test'],
          rows: [
            ['1 group, 1 continuous outcome measured at 2+ time points', 'Repeated-measures ANOVA (Lesson 2)'],
            ['2+ groups, 1 continuous outcome measured ONCE',           'One-way / Two-way ANOVA'],
            ['**2+ groups, 1 continuous outcome measured at 2+ time points**', '**Mixed ANOVA (this lesson)**'],
            ['2 groups, 1 outcome measured at exactly 2 time points',   'Mixed ANOVA (still) — or a difference-score t-test if you prefer'],
            ['Multiple outcomes measured repeatedly',                    'Doubly-multivariate / repeated-measures MANOVA (advanced)'],
          ]},
      ],
    },

    /* ════════════════════ 4. SPHERICITY REVISITED ════════════════════ */
    {
      id: 'sphericity',
      title: 'Sphericity — the within-factor assumption',
      blocks: [
        { type: 'heading', level: 2, text: 'The same Mauchly check as ordinary repeated measures' },

        { type: 'paragraph', text:
          'Mixed ANOVA inherits sphericity from its within-subjects part. Sphericity means the variances of the differences between all pairs of within levels are approximately equal (T1−T0 has the same variance as T2−T1 as T2−T0). SPSS runs Mauchly\'s test automatically.' },

        { type: 'comparison',
          headers: ['Mauchly result', 'What to do'],
          rows: [
            ['**W significant (p ≤ .05)**',    'Sphericity VIOLATED. Read the **Greenhouse-Geisser** row of the Tests of Within-Subjects Effects table. Corrected df are non-integer (e.g. 1.68 instead of 2).'],
            ['**W non-significant (p > .05)**', 'Sphericity assumed. Read the **Sphericity Assumed** row. Report those F, df, p.'],
            ['**Only 2 within-level factor**', 'Sphericity trivially met (only one pair of differences). No correction needed.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Greenhouse-Geisser is safe',
          body: 'If in doubt, report Greenhouse-Geisser regardless. It is a conservative correction that is nearly identical to the uncorrected version when sphericity holds, so you rarely lose information. Some journals now recommend always reporting Greenhouse-Geisser for repeated measures.' },
      ],
    },

    /* ════════════════════ 5. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'The Nakuru procedure',
      blocks: [
        { type: 'heading', level: 2, text: 'Same menu as Repeated Measures, plus one extra step' },

        { type: 'paragraph', text:
          'Mixed ANOVA uses the SAME menu as ordinary repeated measures: **Analyze → General Linear Model → Repeated Measures**. The only extra step is that AFTER defining the within-subjects factor, you also drop the between-subjects factor into its own box in the main dialog. That single extra move turns your repeated-measures ANOVA into a Mixed ANOVA.' },

        { type: 'steps', steps: [
          { title: 'Open the Define Factor(s) dialog',
            body: 'Analyze → General Linear Model → Repeated Measures. SPSS opens a small preliminary dialog first.' },
          { title: 'Name the within-subjects factor',
            body: 'Within-Subject Factor Name: type "Time". Number of Levels: type "3" (we have T0, T1, T2). Click Add. The list shows "Time(3)". Click Define.' },
          { title: 'Set the within-subjects variables',
            body: 'The main Repeated Measures dialog opens with three empty slots labelled _?_(1), _?_(2), _?_(3). Move SBP_T0 into slot (1), SBP_T1 into slot (2), SBP_T2 into slot (3). ORDER MATTERS.' },
          { title: 'Move the BETWEEN factor into Between-Subjects Factor(s)',
            body: 'This is the ONE step that distinguishes Mixed ANOVA from ordinary repeated measures. Drop Sex into the Between-Subjects Factor(s) box on the lower right.' },
          { title: 'Click Plots…',
            body: 'Move Time to Horizontal Axis and Sex to Separate Lines. Click Add. Tick "Include Error Bars" with 95% CI. Click Continue.' },
          { title: 'Click EM Means…',
            body: 'Move Time, Sex, and Time*Sex into Display Means for. Tick Compare main effects with Bonferroni. Click Continue.' },
          { title: 'Click Options…',
            body: 'Tick **Descriptive statistics**, **Estimates of effect size**, **Homogeneity tests**. Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces: Within-Subjects Factors, Between-Subjects Factors, Descriptive Statistics, Box\'s Test, Mauchly\'s Test, Tests of Within-Subjects Effects (Time + Time*Sex), Tests of Between-Subjects Effects (Sex), and the Profile Plot.' },
        ]},

        { type: 'reasoning', headers: ['Setting', 'What we chose', 'Why'],
          rows: [
            ['Within-Subject Factor Name', '"Time"', 'A descriptive name that will appear in output tables. Any label works.'],
            ['Number of Levels',           '3',      'Three time points: T0 (baseline), T1 (mid), T2 (end).'],
            ['Slot order',                 'SBP_T0 → SBP_T1 → SBP_T2', 'Chronological order so trends read left-to-right.'],
            ['Between-Subjects Factor',    'Sex',    'The grouping variable that turns this into a Mixed design.'],
            ['Plots: Horizontal = Time, Lines = Sex', 'Chosen', 'This visualisation lets you SEE the interaction — parallel = no interaction; diverging = interaction.'],
            ['EM Means: include Time*Sex',  'Chosen', 'Gives cell means for interpreting the interaction if significant.'],
            ['Options: Homogeneity',       'Ticked', 'Levene per time point + Box\'s M for between-group covariance equality.'],
          ]},

        { type: 'illustration', component: 'NakuruMixedDialog',
          caption: 'Figure 1. The two-dialog Mixed ANOVA setup. First (top): the Define Factors sub-dialog naming Time with 3 levels. Second (bottom): the main Repeated Measures dialog with SBP_T0/T1/T2 in the Within-Subjects Variables slots AND Sex in the Between-Subjects Factor(s) box (highlighted gold — THIS is what makes it Mixed). Plots button highlighted because the Time × Sex profile plot is what visualises the interaction.' },

        { type: 'illustration', component: 'NakuruMixedOutput',
          caption: 'Figure 2. Mixed ANOVA output. Top: Mauchly W = .812, p = .014 → sphericity violated → use Greenhouse-Geisser. Middle: Within-subjects Time effect (Greenhouse-Geisser) F(1.68, 72.24) = 38.42, p < .001, partial η² = .472 (LARGE); Time × Sex interaction F(1.68, 72.24) = 5.94, p = .006, partial η² = .121 (medium-significant) — THE KEY RESULT. Bottom: Between-subjects Sex main effect F(1, 43) = 2.18, p = .147, ns.' },
      ],
    },

    /* ════════════════════ 6. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the Mixed ANOVA output in the right order',
      blocks: [
        { type: 'heading', level: 2, text: 'Two tables, three effects' },

        { type: 'paragraph', text:
          'The output splits your three effects across TWO tables. Within-subjects effects (Time, Time × Sex) appear in the Tests of Within-Subjects Effects table. Between-subjects effects (Sex) appear in the Tests of Between-Subjects Effects table. Read them in this order:' },

        { type: 'steps', steps: [
          { title: 'Step 1 — Mauchly\'s Test (assumption check)',
            body: 'Look at W and its p. If p ≤ .05 → sphericity violated → read Greenhouse-Geisser rows in the next table. If p > .05 → read Sphericity Assumed rows.' },
          { title: 'Step 2 — Tests of Within-Subjects Effects → Time × Sex interaction row',
            body: 'THE headline. If significant, the trajectories differ across sexes. This changes how you interpret everything else.' },
          { title: 'Step 3 — Tests of Within-Subjects Effects → Time main effect row',
            body: 'Does SBP change over time, averaged across sexes? If significant, there is an overall time trend.' },
          { title: 'Step 4 — Tests of Between-Subjects Effects → Sex main effect row',
            body: 'Do men and women differ in overall (averaged over time) SBP? If significant, there is an overall sex difference in mean.' },
          { title: 'Step 5 — Profile plot + pairwise comparisons',
            body: 'If the interaction is significant, look at the plot to describe the pattern. Use pairwise comparisons (Bonferroni-adjusted) to identify which specific cells differ.' },
        ]},

        { type: 'comparison',
          headers: ['Row', 'Table it appears in', 'What it tests'],
          rows: [
            ['**Time**',        'Within-subjects effects',   'Main effect of the within-subjects factor.'],
            ['**Time × Sex**',  'Within-subjects effects',   'THE KEY interaction — does trajectory depend on group?'],
            ['**Sex**',         'Between-subjects effects',  'Main effect of the between-subjects factor (averaged over time).'],
            ['**Error (Within)**', 'Within-subjects effects', 'Residual variance for within terms.'],
            ['**Error (Between)**', 'Between-subjects effects', 'Residual variance for between terms.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Interpret the interaction FIRST',
          body: 'As with two-way ANOVA, a significant Time × Sex interaction changes how you interpret the main effects. The "Time main effect" describes an average trajectory that may not match either sex\'s actual trajectory. Always describe the interaction pattern from the plot BEFORE generalising about main effects.' },

        { type: 'reveal',
          prompt: 'Mauchly p = .014. Time × Sex (Greenhouse-Geisser) F(1.68, 72.24) = 5.94, p = .006, partial η² = .12. Time main effect (Greenhouse-Geisser) F(1.68, 72.24) = 38.42, p < .001, partial η² = .47. Sex F(1, 43) = 2.18, p = .147. How do you interpret this pattern?',
          answer: '**SBP fell substantially over time overall (large Time effect), the two sexes did not differ in overall averaged SBP, and — most importantly — the two sexes had DIFFERENT trajectories over the three time points (significant Time × Sex interaction).** (1) Sphericity was violated (Mauchly p = .014); Greenhouse-Geisser corrections applied. (2) Time × Sex interaction is significant (p = .006, medium effect) → the intervention affected men and women differently over the 12 weeks. Inspect the profile plot to describe the pattern — perhaps women showed a steeper decline than men, or one sex plateaued earlier. (3) The main Time effect (LARGE, partial η² = .47) confirms an overall drop in SBP across the sample. (4) The Sex main effect is non-significant, meaning that when you average SBP across all three time points, men and women had similar averages. (5) The bottom-line message for the write-up: the intervention worked (big time effect), BUT it did NOT work equally for both sexes (significant interaction). Follow up with sex-specific descriptive stats: e.g. women T0 = 144.1 → T2 = 132.6 (Δ = −11.5), men T0 = 140.8 → T2 = 135.9 (Δ = −4.9) — women dropped over twice as much.' },
      ],
    },

    /* ════════════════════ 7. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — Nakuru Wellness Mixed ANOVA',
      blocks: [
        { type: 'workedExample', title: 'A PhD study in public health at Egerton University',
          body: [
            { label: 'The research question',
              text: 'Did a 12-week lifestyle intervention reduce systolic blood pressure equally in men and women, or do the sexes show different trajectories over T0 → T1 → T2?' },
            { label: 'The data',
              text: 'N = 45 adults with elevated SBP. Sex: 22 men, 23 women. Three within-subjects levels: SBP_T0 (baseline), SBP_T1 (week 6), SBP_T2 (week 12). Overall means (across both sexes): T0 = 142.4, T1 = 138.9, T2 = 134.2 mmHg.' },
            { label: 'Step 1 — Check assumptions',
              text: 'Mauchly\'s W = .812, p = .014 → sphericity violated → use Greenhouse-Geisser. Box\'s M p = .088 → covariance homogeneity OK. Levene per time point all p > .10.' },
            { label: 'Step 2 — Run the Mixed ANOVA',
              text: 'Analyze → GLM → Repeated Measures → Define Factor Time (3) → Slots SBP_T0/T1/T2 → Between-Subjects Factor: Sex → Plots: Time (Horizontal), Sex (Lines) → EM Means: Time, Sex, Time*Sex (Bonferroni) → Options: Descriptive, Effect size, Homogeneity → OK.' },
            { label: 'Step 3 — Read the F-tests (Greenhouse-Geisser rows)',
              text: 'Time: F(1.68, 72.24) = 38.42, p < .001, partial η² = .472 (LARGE). Time × Sex: F(1.68, 72.24) = 5.94, p = .006, partial η² = .121 (medium — the KEY result). Sex: F(1, 43) = 2.18, p = .147, partial η² = .048 (small, ns).' },
            { label: 'Step 4 — Interpret the interaction from the plot',
              text: 'Cell means: Women T0 = 144.1, T1 = 138.2, T2 = 132.6 (Δ = −11.5). Men T0 = 140.8, T1 = 139.5, T2 = 135.9 (Δ = −4.9). The women\'s line drops steeply; the men\'s line is much flatter. Lines diverge → clear interaction pattern.' },
            { label: 'Step 5 — Simple-effects follow-up',
              text: 'Within-women: RM-ANOVA F(2, 44) = 24.15, p < .001, partial η² = .52 — significant drop across time. Within-men: RM-ANOVA F(2, 42) = 6.83, p = .003, partial η² = .25 — smaller but still significant drop across time. So both sexes improved, but women improved much more.' },
            { label: 'Step 6 — APA write-up',
              text: '*"A 2 (Sex: male, female) × 3 (Time: T0, T1, T2) mixed-design analysis of variance was conducted to examine changes in systolic blood pressure across a 12-week lifestyle intervention among 45 adults (22 men, 23 women) in Nakuru. Mauchly\'s test indicated a violation of sphericity for the Time factor (W = .812, p = .014), so Greenhouse-Geisser corrected values are reported. There was a significant main effect of Time, F(1.68, 72.24) = 38.42, p < .001, partial η² = .47, indicating that systolic blood pressure decreased significantly across the three time points overall. The main effect of Sex was not significant, F(1, 43) = 2.18, p = .147, partial η² = .05. A significant Time × Sex interaction emerged, F(1.68, 72.24) = 5.94, p = .006, partial η² = .12, indicating that the trajectory of blood-pressure change differed between the sexes. Follow-up simple-effects analyses showed that both sexes improved significantly (women: F(2, 44) = 24.15, p < .001, partial η² = .52; men: F(2, 42) = 6.83, p = .003, partial η² = .25), but women showed a larger overall reduction (M_T0 = 144.1, M_T2 = 132.6; Δ = −11.5 mmHg) than men (M_T0 = 140.8, M_T2 = 135.9; Δ = −4.9 mmHg). These findings suggest that the lifestyle intervention was effective for both sexes but produced substantially larger blood-pressure reductions in women."*' },
          ]},
      ],
    },

    /* ════════════════════ 8. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing Mixed ANOVA up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A [K]-group by [T]-time-point mixed-design analysis of variance was conducted to examine changes in [OUTCOME] across [OCCASIONS] among [N] [respondents] ([n1 in group 1, n2 in group 2]). Mauchly\'s test [indicated / did not indicate] a violation of sphericity for the [within] factor (W = [.XX], p = [p]), [so Greenhouse-Geisser corrected values are reported / so sphericity-assumed values are reported]. The main effect of [WITHIN] was [significant/non-significant], F([df]) = [F], p = [p], partial η² = [.XX]. The main effect of [BETWEEN] was [significant/non-significant], F([df]) = [F], p = [p], partial η² = [.XX]. A [significant/non-significant] [WITHIN] × [BETWEEN] interaction emerged, F([df]) = [F], p = [p], partial η² = [.XX]. [If interaction significant: describe pattern from plot and pairwise / simple-effects follow-ups.]' },

        { type: 'callout', tone: 'success', title: 'Six things every Mixed ANOVA write-up needs',
          body: '**1.** The design labelled clearly as "K × T mixed-design ANOVA". **2.** Sample size overall AND per between-group. **3.** Mauchly\'s W and p, plus whether Greenhouse-Geisser was applied. **4.** F, df, p, and partial η² for ALL THREE effects (within, between, interaction). **5.** Interpretation ORDER: interaction first; main effects qualified. **6.** Cell means or the profile plot for the interaction. Six items — a reviewer will look for every single one.' },
      ],
    },

    /* ════════════════════ 9. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common Mixed ANOVA mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Reporting Sphericity-Assumed rows when Mauchly is significant',
          body: 'Mauchly p = .014 → sphericity violated. But you report the Sphericity-Assumed F, df, and p from the top row of the Within-Subjects Effects table. Your df are inflated and your p understated.',
          fix: 'ALWAYS check Mauchly first. If p ≤ .05, read the **Greenhouse-Geisser** row (or Huynh-Feldt for larger samples). The df will be non-integer (e.g. 1.68 instead of 2). Report those corrected values. Mention the sphericity violation in the write-up.' },

        { type: 'mistake',
          title: 'Mistake 2 — Interpreting the Time main effect without checking the interaction',
          body: 'The Time main effect is large and highly significant. You write "SBP dropped significantly from 142 to 134 mmHg over 12 weeks" — but the Time × Sex interaction was ALSO significant. Your statement hides the fact that the drop was much bigger for women than men.',
          fix: 'Interpret the INTERACTION first. If significant, the main effect describes an "average trajectory" that may not match any specific group. Report the main effect but qualify: "The overall time effect was significant, though a significant Time × Sex interaction indicated the pattern differed between men and women."' },

        { type: 'mistake',
          title: 'Mistake 3 — Confusing Mixed ANOVA with MANOVA',
          body: 'You have one outcome measured at three time points crossed with sex. You run MANOVA thinking the multiple time points make it multivariate.',
          fix: 'Multiple measurements of the SAME variable over time = repeated-measures / mixed ANOVA, NOT MANOVA. MANOVA is for multiple DIFFERENT outcomes measured once. In your Mixed ANOVA, SBP_T0/T1/T2 are three measurements of ONE variable (SBP), so it is a within-subjects factor, not three separate DVs.' },

        { type: 'mistake',
          title: 'Mistake 4 — Skipping the profile plot',
          body: 'You report the three F-tests and stop. The reader cannot see the interaction pattern. The profile plot is the most memorable image in a Mixed ANOVA write-up and you have omitted it.',
          fix: 'ALWAYS tick Plots and set Time (Horizontal) × Between-Factor (Lines). Include the resulting Profile Plot in Chapter 4 as a numbered figure. Describe its pattern in the narrative. Examiners often look at the plot before reading the text.' },
      ],
    },

    /* ════════════════════ 10. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Mixed ANOVA = one between-subjects factor + one within-subjects factor in the same model.',
          'Produces THREE F-tests: within main effect, between main effect, and (the KEY) within × between interaction.',
          'The interaction tests whether the trajectory over the within-subjects factor DIFFERS across between-subjects groups — the focal hypothesis of most intervention studies.',
          'Menu: Analyze → General Linear Model → Repeated Measures. Define the within factor first, then drop the between factor into Between-Subjects Factor(s).',
          'Assumptions: normality per cell, sphericity for the within factor (Mauchly + Greenhouse-Geisser if violated), homogeneity of between-group variances (Box\'s M).',
          'Interpret in ORDER: interaction first; main effects qualified by the interaction.',
          'Always include the profile plot (Time on x-axis, between-factor as separate lines) — it visualises the interaction.',
          'Nakuru example: Time × Sex interaction F(1.68, 72.24) = 5.94, p = .006, partial η² = .12 — women dropped 11.5 mmHg vs men only 4.9 mmHg.',
          'Effect size = partial η² for each of the three effects (.01 small, .06 medium, .14 large).',
          'Avoid the four mistakes: ignoring Mauchly, misreading main effects without checking the interaction, confusing Mixed with MANOVA, skipping the profile plot.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Course complete!',
          body: 'You have now finished the entire ANOVA course — nine lessons from One-way ANOVA through Kruskal-Wallis, Two-way, Repeated Measures, Friedman, ANCOVA, MANOVA, and now Mixed. Together with the SPSS Basics, Data Cleaning, Descriptive Statistics, Correlation, Regression, T-Tests, Chi-Square, Reliability, and Writing Up courses, you have covered every core inferential procedure Kenyan postgraduate examiners expect to see in a well-designed thesis. Your Chapter 4 is now armed for anything.' },

        { type: 'paragraph', text:
          'Before moving on, find a dataset with a between-subjects factor AND a within-subjects factor. Run Mixed ANOVA in SPSS. Check Mauchly. Interpret the interaction from the profile plot. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'What makes an ANOVA design "mixed"?',
          choices: [
            'It uses mixed data types',
            'It combines a BETWEEN-subjects factor (different people in each level) with a WITHIN-subjects factor (same people measured at each level)',
            'It runs multiple analyses',
            'It handles missing data',
          ],
          answer: 1,
          explanation: 'A mixed design has at least one between-subjects factor AND at least one within-subjects (repeated) factor in the same model. In Nakuru: Sex is between (each person is either male or female); Time is within (every person is measured at T0, T1, and T2). Mixed ANOVA analyses them jointly.' },

        { type: 'check',
          question: 'In a Mixed ANOVA on the Nakuru data, which effect is USUALLY the most important to interpret?',
          choices: [
            'The Time main effect',
            'The Sex main effect',
            'The Time × Sex INTERACTION — does the trajectory over time DEPEND on sex?',
            'The Mauchly test',
          ],
          answer: 2,
          explanation: 'The between × within interaction is the focal hypothesis of most intervention studies with repeated measurement: "Did our intervention have a DIFFERENT effect over time for different groups?" The two main effects are useful context, but the interaction is the practically interesting result — it tells you whether the intervention worked equally across your subgroups.' },

        { type: 'check',
          question: 'Mauchly\'s test gives W = .812, p = .014. What do you do?',
          choices: [
            'Ignore it; Mixed ANOVA has no sphericity assumption',
            'Report the SPHERICITY ASSUMED row of the Within-Subjects Effects table',
            'Report the GREENHOUSE-GEISSER row (sphericity violated → correction required); df will be non-integer',
            'Switch to a completely different test',
          ],
          answer: 2,
          explanation: 'Sphericity is violated when Mauchly p ≤ .05. The fix is to read the Greenhouse-Geisser corrected row of the Within-Subjects Effects table. The df become non-integer (e.g. 1.68 instead of 2), and the correction makes the F-test more conservative. Mention the correction in your write-up.' },

        { type: 'check',
          question: 'Where do you put the between-subjects factor in the SPSS Mixed ANOVA dialog?',
          choices: [
            'In the Within-Subjects Variables box',
            'In the Covariates box',
            'In the Between-Subjects Factor(s) box in the main Repeated Measures dialog',
            'In the Post Hoc dialog',
          ],
          answer: 2,
          explanation: 'AFTER you define the within factor and fill the within-subjects variable slots, the main Repeated Measures dialog also has a "Between-Subjects Factor(s)" box on the lower right. Dropping your grouping variable there is what turns a plain repeated-measures ANOVA into a Mixed ANOVA.' },

        { type: 'check',
          question: 'You find a significant Time main effect AND a significant Time × Sex interaction. Which do you interpret first, and why?',
          choices: [
            'Time main effect first; it is bigger',
            'INTERACTION first — the interaction tells you the trajectory differs across sexes, which qualifies any statement about the "average" time trend',
            'Sex main effect first',
            'Doesn\'t matter',
          ],
          answer: 1,
          explanation: 'Just as in two-way ANOVA, a significant interaction changes how the main effects are interpreted. The Time main effect describes an "average trajectory" that may not match either group\'s actual pattern. Lead with the interaction; describe the main effect afterwards, qualified by the interaction.' },

        { type: 'check',
          question: 'Nakuru output: Time F(1.68, 72.24) = 38.42, p < .001, partial η² = .47. Sex F(1, 43) = 2.18, p = .147. Time × Sex F(1.68, 72.24) = 5.94, p = .006, partial η² = .12. How do you interpret?',
          choices: [
            '"Only the intervention worked."',
            '"Men and women differ significantly."',
            '"SBP dropped significantly over 12 weeks (LARGE Time effect), the sexes did not differ in overall average SBP, and — crucially — the sexes had DIFFERENT trajectories (significant Time × Sex interaction). Follow-up: describe the pattern from the profile plot."',
            '"Nothing is significant."',
          ],
          answer: 2,
          explanation: 'Option C is the correct interpretation. It reports all three effects with their correct meaning, leads with the interaction, and points to the plot for pattern description. The Time effect confirms overall improvement; the ns Sex main effect means neither sex was higher OVERALL; the significant interaction means the shape of improvement differed between the sexes — the practically interesting finding.' },
      ],
    },
  ],
};
