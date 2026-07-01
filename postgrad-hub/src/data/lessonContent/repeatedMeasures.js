/**
 * ANOVA · Lesson 4 — Repeated Measures ANOVA
 * The final lesson — when the same people are measured at multiple time points.
 */

export const REPEATED_MEASURES_LESSON = {
  id: 'anova-4',
  title: 'Repeated-measures ANOVA',
  subtitle: 'Module 03 · Course: ANOVA · Lesson 4 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When the same people are measured at multiple time points',
      blocks: [
        { type: 'scene', body: [
          'You are running an intervention study. You test 60 pupils on a maths exam BEFORE you teach them a new method (pre-test), AGAIN at the midterm (mid-test), and finally at the end of the term (post-test). Three measurements per pupil. You want to know: **did scores change significantly across the three time points?**',
          'You think briefly about one-way ANOVA: three groups (pre, mid, post), one outcome. But STOP — the three groups are not independent. They are the SAME pupils, measured three times. One-way ANOVA assumes independent groups; running it here violates the independence assumption and inflates Type I errors.',
          'The right test is **repeated-measures ANOVA** — designed specifically for situations where each participant is their own control across multiple time points. It accounts for the correlation between repeated measurements on the same person, giving you more accurate results. This final lesson of the course covers the design, the SPSS workflow, the famous **Mauchly\'s sphericity test**, and how to interpret and report.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise when repeated-measures ANOVA is the right test** (same people, multiple measurements).',
            '**Set up the data in SPSS** (wide format — one row per pupil, one column per time point).',
            '**Run repeated-measures ANOVA** via Analyze → General Linear Model → Repeated Measures.',
            '**Read Mauchly\'s test of sphericity** and decide whether to use uncorrected or corrected F.',
            '**Apply the Greenhouse-Geisser correction** when sphericity is violated.',
            '**Follow up with pairwise comparisons** to identify which time points differ.',
            '**Write up repeated-measures ANOVA** following the APA template every examiner expects.',
            '**Avoid the four common mistakes** that confuse beginners with this design.',
          ]},

        { type: 'why', body:
          'Repeated-measures ANOVA is the workhorse of intervention research, longitudinal studies, pre-post evaluations, and any time you measure the same people more than once. Knowing this analysis dramatically expands the questions your thesis can answer — and many of the most-cited findings in education, psychology, and health come from repeated-measures designs.' },
      ],
    },

    /* ════════════════════ 2. THE BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — each participant is their own control',
      blocks: [
        { type: 'heading', level: 2, text: 'Why repeated measures is MORE POWERFUL than independent groups' },

        { type: 'paragraph', text:
          'Repeated-measures designs have a major advantage over between-subjects designs: each participant serves as their OWN CONTROL. The natural between-person variation (some pupils are just better at maths than others, regardless of the intervention) is REMOVED from the analysis because we are comparing each person to themselves at different time points, not to other people.' },

        { type: 'illustration', component: 'RepeatedMeasuresLogic',
          caption: 'Figure 1. Repeated-measures design. Three pupils — Wanjiku, Otieno, Achieng — each measured at pre-test, mid-term, and post-test. Each colored line shows ONE pupil\'s trajectory across time. The analysis focuses on the CHANGE WITHIN each person, removing between-person differences that would otherwise add noise.' },

        { type: 'analogy', title: 'A weight-loss programme',
          body: 'Imagine testing a weight-loss programme. ONE approach: weigh 30 people on the programme and 30 controls, compare averages (between-subjects). Problem: people start at hugely different weights — a person who started at 120kg and lost 5kg is in a different boat from one who started at 60kg. The between-person variation drowns out the programme effect. BETTER approach: weigh the SAME 30 people BEFORE and AFTER the programme. Now you can compare each person to themselves — natural starting-weight differences are subtracted out. The same logic applies to repeated-measures ANOVA: by using each participant as their own control, you get more statistical power.' },

        { type: 'definition', term: 'Within-subjects factor',
          body: 'A factor where the SAME participants experience all levels. Time (pre/mid/post), condition (relaxed/anxious), or any variable where each person contributes data at every level. The opposite of a "between-subjects factor" where each participant belongs to only one level (like teaching method in Lesson 1).' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When repeated-measures ANOVA is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The defining condition — same people, multiple measurements' },

        { type: 'steps', steps: [
          { title: 'Outcome variable is CONTINUOUS',
            body: 'Y must be Scale (exam score, weight, anxiety rating, etc.).' },
          { title: 'Each participant provides data at MULTIPLE LEVELS of the same factor',
            body: 'The classic case: 3+ time points (pre/mid/post). Also: 3+ conditions (relaxed/neutral/anxious; quiet/medium/loud), or 3+ tasks measured on the same people.' },
          { title: 'Cases are MATCHED across levels',
            body: 'Each row in your dataset represents one PARTICIPANT, with multiple columns for their scores at each level. "Wide format" — different from one-way ANOVA, which uses "long format" with each row representing one observation.' },
          { title: 'Sample size — at least 20 per level',
            body: 'Rule of thumb: with 3 time points, you want at least 20 participants. Smaller samples can work but reduce power; with very small n, the related Wilcoxon signed-rank test or Friedman test may be more appropriate.' },
        ]},

        { type: 'comparison',
          headers: ['Design', 'Right test'],
          rows: [
            ['One factor (3+ INDEPENDENT groups), one outcome',                'One-way ANOVA (Lesson 1)'],
            ['One factor (TWO measurements on SAME people)',                    'Paired-samples t-test'],
            ['**One factor (3+ measurements on SAME people)**',                  '**Repeated-measures ANOVA (this lesson)**'],
            ['Two factors — one between, one within (mixed)',                     'Mixed ANOVA (advanced)'],
            ['Non-normal data + repeated measures',                              'Friedman test (non-parametric)'],
          ]},
      ],
    },

    /* ════════════════════ 4. DATA SETUP ════════════════════ */
    {
      id: 'data-setup',
      title: 'Setting up the data in SPSS — wide format',
      blocks: [
        { type: 'heading', level: 2, text: 'One row per pupil, one column per time point' },

        { type: 'paragraph', text:
          'Repeated-measures ANOVA needs data in **wide format**: each row represents ONE participant, and each TIME POINT gets its own column. This is different from independent ANOVAs where you might have time and score as two columns.' },

        { type: 'comparison',
          headers: ['Pupil ID', 'Pre-test', 'Mid-term', 'Post-test'],
          rows: [
            ['1 (Wanjiku)', '58', '64', '72'],
            ['2 (Otieno)',  '50', '58', '67'],
            ['3 (Achieng)', '65', '70', '78'],
            ['4 (Kamau)',   '42', '52', '61'],
          ]},

        { type: 'callout', tone: 'info', title: 'If your data is in long format, restructure first',
          body: 'If your data has each observation as a separate row (e.g. 60 pupils × 3 time points = 180 rows with a "time" column), you need to RESTRUCTURE to wide format. SPSS: Data → Restructure → Restructured selected cases into variables. The wizard walks you through identifying the participant ID and the time-varying variable. Once in wide format, repeated-measures ANOVA can read it correctly.' },
      ],
    },

    /* ════════════════════ 5. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running repeated-measures ANOVA in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'A different dialog from one-way and two-way ANOVA' },

        { type: 'paragraph', text:
          'Repeated-measures ANOVA has its own menu — **Analyze → General Linear Model → Repeated Measures**. The setup process is a bit more involved than other ANOVAs because you have to first DEFINE the within-subjects factor.' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → General Linear Model → Repeated Measures.' },
          { title: 'Define the Within-Subject Factor',
            body: [
              'A small dialog opens first. In "Within-Subject Factor Name" type a name (e.g. **time**). In "Number of Levels" type the number of time points (e.g. **3**).',
              'Click Add. Then click Define.',
            ]},
          { title: 'Move your time-point variables into the Within-Subjects Variables box',
            body: 'A bigger dialog opens with three empty slots labelled (1), (2), (3) — one per level you defined. Move pre_test into slot (1), mid_term into slot (2), post_test into slot (3). Order matters — make sure they\'re in the correct temporal sequence.' },
          { title: 'Click Options for the essentials',
            body: 'Tick **Descriptive statistics**, **Estimates of effect size**, and crucially **Compare main effects** (then in the Confidence Interval dropdown that appears, select Bonferroni for adjusted pairwise comparisons). Click Continue.' },
          { title: 'Click Plots',
            body: 'Move "time" to the Horizontal Axis box. Click Add → Continue. This produces a line plot of mean scores across time.' },
          { title: 'Click OK',
            body: 'SPSS produces several tables: Within-Subjects Factors, Descriptive Statistics, **Mauchly\'s Test of Sphericity**, **Tests of Within-Subjects Effects** (the F-test you care about), Pairwise Comparisons, and Estimated Marginal Means + Plot.' },
        ]},
      ],
    },

    /* ════════════════════ 6. MAUCHLY'S SPHERICITY ════════════════════ */
    {
      id: 'sphericity',
      title: 'Mauchly\'s test of sphericity — the key assumption check',
      blocks: [
        { type: 'heading', level: 2, text: 'The repeated-measures equivalent of Levene\'s test' },

        { type: 'paragraph', text:
          'Repeated-measures ANOVA has a special assumption called **sphericity** — basically, the variances of the differences between all pairs of time points should be approximately equal. (For three time points: variance of pre-mid differences ≈ variance of pre-post differences ≈ variance of mid-post differences.) SPSS tests this with Mauchly\'s test.' },

        { type: 'comparison',
          headers: ['Mauchly\'s Sig.', 'What it means', 'What to do'],
          rows: [
            ['**p > .05 (non-significant)**', 'Sphericity is met — assumption OK.',                       'Use the standard F-test row (Sphericity Assumed) in the Tests of Within-Subjects Effects.'],
            ['**p < .05 (significant)**',     'Sphericity is violated — assumption fails.',               'Use the **Greenhouse-Geisser corrected** F (in the same table). This adjusts the degrees of freedom to compensate.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Sphericity follows the same direction as Levene\'s',
          body: 'Mauchly\'s null hypothesis is "sphericity is met". A NON-significant Mauchly (p > .05) is what you WANT — assumption met. A SIGNIFICANT Mauchly (p < .05) means assumption violated; use the corrected F. The direction is the same as Levene\'s test in one-way ANOVA. Do NOT confuse with Hosmer-Lemeshow (which is the opposite).' },

        { type: 'heading', level: 3, text: 'The Greenhouse-Geisser correction' },

        { type: 'paragraph', text:
          'When Mauchly is significant, SPSS provides several corrected F-values in the Tests of Within-Subjects Effects table. The most widely-used is **Greenhouse-Geisser** — it multiplies the degrees of freedom by an estimate of how far sphericity is violated. This makes the test more conservative (slightly lower power) but more accurate.' },

        { type: 'paragraph', text:
          'Two-step rule: (1) Mauchly non-significant → report the Sphericity Assumed row. (2) Mauchly significant → report the Greenhouse-Geisser row. The F-value is the same; only the degrees of freedom and p-value differ.' },

        { type: 'reveal',
          prompt: 'Your Mauchly\'s test shows W = 0.85, p = .04 (significant). Which row of the Tests of Within-Subjects Effects table should you report?',
          answer: '**The Greenhouse-Geisser row.** Significant Mauchly (p = .04) means sphericity is violated — the standard F-test (Sphericity Assumed row) would have biased p-values. The Greenhouse-Geisser correction adjusts the degrees of freedom downward, making the test more conservative. Report the GG row\'s F, adjusted df, p, and partial η². Your write-up should explicitly mention: "Because Mauchly\'s test indicated a violation of sphericity (p = .04), Greenhouse-Geisser corrected results are reported."' },
      ],
    },

    /* ════════════════════ 7. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the Tests of Within-Subjects Effects',
      blocks: [
        { type: 'heading', level: 2, text: 'The single F-test you care about' },

        { type: 'paragraph', text:
          'The KEY table is **Tests of Within-Subjects Effects**. It has multiple rows per effect: Sphericity Assumed, Greenhouse-Geisser, Huynh-Feldt, and Lower-bound. You read ONLY the row matching your Mauchly result.' },

        { type: 'comparison',
          headers: ['If Mauchly is...', 'Read this row...'],
          rows: [
            ['Non-significant (p > .05)', '**Sphericity Assumed** — standard F-test'],
            ['Significant (p < .05)',     '**Greenhouse-Geisser** — corrected F-test (preferred)'],
            ['(Alternative when sphericity violated)', 'Huynh-Feldt — less conservative correction; some prefer it when GG estimate is high'],
            ['(Most conservative)',       'Lower-bound — extreme worst-case correction; rarely used'],
          ]},

        { type: 'paragraph', text:
          'Each row shows: Type III Sum of Squares, df, Mean Square, F, Sig., partial η². The F-value is the same across all four rows; the df and p-value differ depending on the correction applied.' },

        { type: 'heading', level: 3, text: 'A significant F means scores DIFFER across time points' },

        { type: 'paragraph', text:
          'A significant F-test (p < .05) tells you that **at least one time point differs from at least one other**. Like one-way ANOVA, you need follow-up pairwise comparisons to identify WHICH specific time points differ.' },

        { type: 'heading', level: 3, text: 'Pairwise comparisons' },

        { type: 'paragraph', text:
          'If you ticked "Compare main effects" in Options with Bonferroni adjustment, SPSS produces a **Pairwise Comparisons** table that shows every pair of time points with their mean differences, standard errors, and Bonferroni-adjusted p-values. This is your post-hoc — already corrected for multiple comparisons.' },

        { type: 'reveal',
          prompt: 'Your output shows: Mauchly p = .68 (non-significant). Sphericity Assumed row: F(2, 118) = 42.5, p < .001, partial η² = .42. Pairwise: pre vs mid p < .001, pre vs post p < .001, mid vs post p = .003. How do you interpret?',
          answer: '**Sphericity assumption met; highly significant effect of time with large effect size; all three pairwise comparisons significant.** Scores improved across time (pre → mid → post), and every adjacent pair shows a real difference. Standard write-up: *"Mauchly\'s test indicated sphericity was met (p = .68). A significant main effect of time emerged, F(2, 118) = 42.5, p < .001, partial η² = .42 (large effect). Pairwise comparisons with Bonferroni correction revealed that scores increased significantly from pre-test to mid-term (p < .001), from mid-term to post-test (p = .003), and from pre-test to post-test (p < .001), confirming consistent improvement across the intervention."*' },
      ],
    },

    /* ════════════════════ 8. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — pre/mid/post intervention study',
      blocks: [
        { type: 'workedExample', title: 'A Master\'s intervention study',
          body: [
            { label: 'The research question',
              text: 'Does a new teaching intervention improve mathematics scores over time? Pupils take the same maths exam at pre-test (week 1), mid-term (week 5), and post-test (week 10).' },
            { label: 'The data',
              text: 'n = 60 Form 3 pupils, all taught with the new intervention. Three measurements per pupil: pre_test, mid_term, post_test (all 0-100 scale). Wide format: 60 rows, 3 score columns per pupil.' },
            { label: 'Step 1 — Inspect descriptives',
              text: 'Pre-test: M = 52.3, SD = 11.2. Mid-term: M = 61.7, SD = 10.8. Post-test: M = 70.4, SD = 11.5. Means are rising; question is whether the rises are statistically real.' },
            { label: 'Step 2 — Run repeated-measures ANOVA',
              text: 'Analyze → General Linear Model → Repeated Measures. Define within-subject factor: name = time, levels = 3, Add, Define. Move pre_test to (1), mid_term to (2), post_test to (3). Options: tick Descriptive, Effect size, Compare main effects with Bonferroni. Plots: time to Horizontal, Add. OK.' },
            { label: 'Step 3 — Check Mauchly\'s sphericity',
              text: 'Mauchly\'s W = 0.92, χ²(2) = 4.78, p = .092. NON-significant → sphericity met → use Sphericity Assumed row.' },
            { label: 'Step 4 — Read the F-test',
              text: 'Sphericity Assumed row: F(2, 118) = 38.4, p < .001, partial η² = .39. Large effect; very strong evidence scores changed across time.' },
            { label: 'Step 5 — Read pairwise comparisons',
              text: 'Pre vs Mid: mean difference = −9.4, p < .001. Pre vs Post: mean difference = −18.1, p < .001. Mid vs Post: mean difference = −8.7, p < .001. All three pairs significant — improvement at EVERY step (Bonferroni-adjusted).' },
            { label: 'Step 6 — APA write-up',
              text: '*"A one-way repeated-measures analysis of variance was conducted to examine changes in mathematics scores across three time points (pre-test, mid-term, post-test) among 60 Form 3 pupils participating in a new teaching intervention. Descriptive statistics showed mean scores of 52.3 (SD = 11.2) at pre-test, 61.7 (SD = 10.8) at mid-term, and 70.4 (SD = 11.5) at post-test. Mauchly\'s test indicated that the sphericity assumption was met, W = .92, χ²(2) = 4.78, p = .092. The main effect of time was statistically significant with a large effect size, F(2, 118) = 38.4, p < .001, partial η² = .39, indicating that scores changed significantly across the intervention. Pairwise comparisons with Bonferroni correction revealed that scores increased significantly from pre-test to mid-term (mean difference = 9.4, p < .001), from mid-term to post-test (mean difference = 8.7, p < .001), and from pre-test to post-test (mean difference = 18.1, p < .001). The pattern indicates consistent improvement throughout the 10-week intervention."*' },
          ]},
      ],
    },

    /* ════════════════════ 9. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing repeated-measures ANOVA up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A one-way repeated-measures analysis of variance was conducted to examine changes in [OUTCOME] across [K] time points among [N] [respondents]. Descriptive statistics indicated mean [OUTCOME] of [M] (SD = [SD]) at [time 1], [M] (SD = [SD]) at [time 2], and [M] (SD = [SD]) at [time 3]. Mauchly\'s test indicated that the sphericity assumption was [met/violated], W = [.XX], χ²([df]) = [X.XX], p = [.XXX]. [If violated:] Greenhouse-Geisser corrected results are reported. The main effect of time was [significant/non-significant], F([df]) = [F-value], p = [p-value], partial η² = [.XX]. Pairwise comparisons with Bonferroni correction revealed [pattern of significant pairs].' },

        { type: 'callout', tone: 'success', title: 'Six things every repeated-measures write-up needs',
          body: '**1.** Outcome, number of time points, N. **2.** Descriptive statistics (M, SD) per time point. **3.** Mauchly\'s test result + which row of F-table you read. **4.** F with df, p, partial η². **5.** Pairwise comparisons with Bonferroni-adjusted p-values for each pair. **6.** One-sentence interpretation of the trajectory pattern. Examiners always check for the Mauchly result — never skip it.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why did you use repeated-measures ANOVA instead of running independent t-tests at each time point?',
              a: 'The three measurements are on the SAME participants — they are not independent observations. Independent t-tests would violate the independence assumption and ignore the correlation between repeated measurements on the same person, reducing statistical power and inflating Type I error. Repeated-measures ANOVA correctly accounts for the within-person correlation and provides more accurate inference.' },
            { q: 'Why did you not use the Greenhouse-Geisser correction?',
              a: 'Mauchly\'s test indicated the sphericity assumption was met (p = .092), so the Sphericity Assumed row of the Tests of Within-Subjects Effects table provides the correct F-test. Greenhouse-Geisser would only be appropriate if Mauchly\'s test were significant (sphericity violated).' },
            { q: 'Did the pairwise comparisons account for multiple testing?',
              a: 'Yes. In the Options dialog I ticked "Compare main effects" with the Bonferroni adjustment. The Bonferroni correction divides the alpha by the number of pairwise comparisons (3 in this case) to control the family-wise Type I error rate at .05. The adjusted p-values appear directly in the Pairwise Comparisons output table.' },
          ]},
      ],
    },

    /* ════════════════════ 10. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common repeated-measures mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Using one-way ANOVA when measurements are paired',
          body: 'You have pre/mid/post scores from the same 60 pupils. You run one-way ANOVA treating pre, mid, post as three independent groups. The test ignores the within-person correlation, inflates Type I errors, and is statistically inappropriate.',
          fix: 'When the same people contribute data at multiple levels of a factor, use REPEATED-MEASURES ANOVA. The wide-format setup and the dedicated SPSS menu account for the within-person correlation correctly.' },

        { type: 'mistake',
          title: 'Mistake 2 — Skipping Mauchly\'s test',
          body: 'You read the Sphericity Assumed F-test without checking whether sphericity holds. If Mauchly was significant, your reported F has biased p-values.',
          fix: 'ALWAYS check Mauchly\'s test first. Non-significant (p > .05) → use Sphericity Assumed row. Significant (p < .05) → use Greenhouse-Geisser corrected row. Mention which you used in the write-up.' },

        { type: 'mistake',
          title: 'Mistake 3 — Data in long format instead of wide',
          body: 'Your dataset has 180 rows (60 pupils × 3 time points). You try to run repeated-measures ANOVA but cannot move the variables into the within-subjects slots because you only have one "score" column.',
          fix: 'Repeated-measures ANOVA in SPSS requires WIDE format — one row per pupil, separate columns for each time point. Use Data → Restructure → Restructured selected cases into variables to convert long to wide.' },

        { type: 'mistake',
          title: 'Mistake 4 — No pairwise comparisons to identify which time points differ',
          body: 'You report the main effect F as significant and stop. The reader does not know whether all three time points differ, or only some.',
          fix: 'Always tick "Compare main effects" with Bonferroni in Options. This produces the Pairwise Comparisons table with adjusted p-values for every time-point pair. Report them in your write-up.' },
      ],
    },

    /* ════════════════════ 11. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Repeated-measures ANOVA compares means across 3+ measurements taken on the SAME people (e.g. pre/mid/post).',
          'It is MORE POWERFUL than one-way ANOVA for this design because each participant serves as their own control, removing between-person variation.',
          'Data must be in WIDE format — one row per participant, one column per time point. Use Data → Restructure if needed.',
          'Run via Analyze → General Linear Model → Repeated Measures. Define within-subject factor first (name + number of levels), then move time-point variables into slots.',
          'Always check **Mauchly\'s test of sphericity** before reading the F. Non-significant (p > .05) → use Sphericity Assumed. Significant (p < .05) → use Greenhouse-Geisser corrected.',
          'In Options, tick **Compare main effects with Bonferroni** to get pairwise comparisons with adjusted p-values — your post-hoc.',
          'Report partial η² as effect size; benchmarks .01 small, .06 medium, .14 large.',
          'APA write-up needs six elements: outcome+timepoints+N, descriptives, Mauchly result + which F-row used, F+df+p+partial η², pairwise comparisons, pattern interpretation.',
          'Avoid the four mistakes: using one-way ANOVA on paired data, skipping Mauchly, long format, no pairwise comparisons.',
        ]},

        { type: 'callout', tone: 'gold', title: '🎓 You have completed the entire SPSS curriculum',
          body: 'This is the FINAL lesson of the Postgraduate Data Hub Kenya SPSS Academy. Across **24 lessons spanning 6 courses**, you have mastered: SPSS Basics (5 lessons), Descriptive Statistics (4 lessons), Correlation Analysis (4 lessons), Reliability Testing (3 lessons), Regression Analysis (4 lessons), and ANOVA (4 lessons). Together these cover essentially every quantitative analysis a Master\'s or PhD thesis in social science, education, health, or business will require. Congratulations.' },

        { type: 'paragraph', text:
          'Before finishing, take a repeated-measures dataset (or simulate one with 3 time points), restructure to wide format if needed, and run the full analysis. Check Mauchly. Interpret the F. Report the pairwise comparisons. Write the APA paragraph. Then complete the final knowledge check.' },
      ],
    },

    /* ════════════════════ 12. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'When is repeated-measures ANOVA the right test?',
          choices: [
            'When you have 3+ INDEPENDENT groups',
            'When the SAME participants are measured at 3+ time points (or 3+ conditions on the same people)',
            'When you have two factors',
            'When the outcome is binary',
          ],
          answer: 1,
          explanation: 'Repeated-measures ANOVA is for designs where the SAME participants contribute data at multiple levels of a within-subjects factor — typically multiple time points (pre/mid/post) or multiple conditions. The dependent measurements are correlated within each person, and repeated-measures ANOVA correctly accounts for this. One-way ANOVA is for independent groups; repeated-measures is the matched-data equivalent.' },

        { type: 'check',
          question: 'Why is repeated-measures ANOVA more powerful than one-way ANOVA for the same data?',
          choices: [
            'It uses better software',
            'Each participant serves as their own control, removing between-person variation as a source of noise',
            'It uses bigger F-values',
            'It is faster',
          ],
          answer: 1,
          explanation: 'By measuring the same people at multiple times, repeated-measures removes the between-person differences that would otherwise be lumped into error variance. The remaining "within-person" variability is much smaller, so the F-test has more power to detect real changes. The same data analysed as independent groups (which it isn\'t) would have less power.' },

        { type: 'check',
          question: 'Your Mauchly\'s test of sphericity shows p = .03 (significant). Which row of the Tests of Within-Subjects Effects should you read?',
          choices: [
            'Sphericity Assumed (standard F)',
            'Greenhouse-Geisser corrected F (since sphericity is violated)',
            'Lower-bound',
            'Tukey HSD',
          ],
          answer: 1,
          explanation: 'Significant Mauchly (p < .05) means sphericity is VIOLATED — the variances of differences between time-point pairs are not equal. The standard F (Sphericity Assumed) would have biased p-values. The **Greenhouse-Geisser** correction adjusts the degrees of freedom to compensate, providing more accurate inference. Read the GG row instead and report which you used.' },

        { type: 'check',
          question: 'Your data is in LONG format (180 rows for 60 pupils × 3 time points). Can you run repeated-measures ANOVA?',
          choices: [
            'Yes — SPSS handles both formats',
            'No — repeated-measures ANOVA requires WIDE format. Use Data → Restructure → Restructured selected cases into variables to convert first.',
            'Yes, but only with paired-samples t-test',
            'No — collect more data',
          ],
          answer: 1,
          explanation: 'The SPSS Repeated Measures menu requires WIDE format: one row per participant, separate columns for each time point. With long format you cannot fill the within-subject slots in the dialog. Use Data → Restructure → Restructured selected cases into variables to convert. The wizard walks you through identifying the participant ID and the time-varying variable.' },

        { type: 'check',
          question: 'Your F-test for time is significant, p < .001. The output also shows a Pairwise Comparisons table with Bonferroni adjustments. Why is this table important?',
          choices: [
            'It is for descriptive statistics',
            'It identifies WHICH specific time-point pairs differ. The F-test only says "scores changed across time"; the pairwise comparisons show which specific time points are significantly different.',
            'It is the same as Mauchly',
            'It is irrelevant',
          ],
          answer: 1,
          explanation: 'Like in one-way ANOVA, the omnibus F-test tells you something changed across time, but not which specific time points differ. Bonferroni-adjusted pairwise comparisons answer "did pre differ from mid? from post? did mid differ from post?" — controlling for multiple testing. Report all the pairwise p-values to give a complete picture.' },

        { type: 'check',
          question: 'Which sentence is the most professional repeated-measures ANOVA write-up?',
          choices: [
            '"Scores went up."',
            '"ANOVA was significant."',
            '"A one-way repeated-measures ANOVA found a significant effect of time, F(2, 118) = 38.4, p < .001, partial η² = .39. Mauchly\'s test was non-significant (p = .092) so sphericity was assumed. Bonferroni-adjusted pairwise comparisons revealed significant improvement from pre-test to mid-term (p < .001), mid-term to post-test (p < .001), and pre-test to post-test (p < .001)."',
            '"Some change happened."',
          ],
          answer: 2,
          explanation: 'Option C hits all required elements: names the test, reports F + df + p + partial η², addresses Mauchly\'s sphericity check, presents all pairwise comparisons with adjusted p-values, and uses precise quantitative language. The other options are too vague to communicate the analysis.' },
      ],
    },
  ],
};
