/**
 * ANOVA · Lesson 3 — Two-way ANOVA
 * Two grouping factors at once + the all-important interaction.
 */

export const TWO_WAY_ANOVA_LESSON = {
  id: 'anova-3',
  title: 'Two-way ANOVA',
  subtitle: 'Module 03 · Course: ANOVA · Lesson 3 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When two grouping factors matter at the same time',
      blocks: [
        { type: 'scene', body: [
          'One-way ANOVA showed that teaching method (A, B, C) affects exam scores. You write it up. Then your supervisor asks: *"Does the BEST METHOD depend on the pupil\'s GENDER? Maybe the flipped classroom works best for boys but group discussion works best for girls? You need a two-way ANOVA — method by gender — to test that."*',
          'She is right. A one-way ANOVA can only look at one factor at a time. To examine whether two factors interact — whether the effect of one DEPENDS on the level of the other — you need a two-way ANOVA. And the interaction effect is often the most interesting finding in social-science research, because it tells you not just "what works" but "what works FOR WHOM".',
          'This lesson teaches you two-way ANOVA: how to run it, the three F-tests it produces (main effect of factor A, main effect of factor B, interaction A × B), and the famous "interaction plot" that lets you SEE the interaction visually. By the end you will understand main effects vs interactions — the most-asked concept in postgraduate ANOVA reviews.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise when two-way ANOVA is the right test** (two categorical factors, one continuous outcome).',
            '**Run two-way ANOVA in SPSS** via Analyze → General Linear Model → Univariate.',
            '**Read the three F-tests** — main effect of factor A, main effect of factor B, interaction A × B.',
            '**Distinguish main effects from interactions** — the single most-asked concept in ANOVA exams.',
            '**Read an interaction plot** — parallel lines = no interaction, crossing or fanning lines = interaction.',
            '**Decide what to interpret first** when both main effects and an interaction are significant.',
            '**Write up two-way ANOVA** following the APA template that examiners expect.',
          ]},

        { type: 'why', body:
          'Two-way ANOVA is heavily used in postgraduate education, psychology, business, and health research because most thesis questions involve more than one grouping factor: treatment × gender, intervention × age group, region × economic class. Examiners often probe for interaction effects — knowing what they are and how to interpret them is a key viva skill.' },
      ],
    },

    /* ════════════════════ 1.5 WHAT/WHY/WHERE/WHEN — beginner-first primer ════════════════════ */
    {
      id: 'wwww',
      title: 'What / Why / Where / When — read THIS first',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'Two-Way ANOVA lets you test two independent variables at once. Before touching the SPSS dialog, understand: (1) What it IS, (2) Why you use it to find interaction effects, (3) Where a postgraduate would use it, (4) When to CHOOSE it over One-Way ANOVA.',
            'The WWWW card below answers all 4 in 3 minutes.',
          ]},

        { type: 'illustration', component: 'AnovaTwoWayWWWW',
          caption: 'Figure 0. Two-Way ANOVA WHAT/WHY/WHERE/WHEN reference card. Bookmark this — it answers the questions examiners ask about why you chose Two-Way ANOVA.' },

        { type: 'callout', tone: 'brand', title: 'Key terms you will meet in the walkthrough',
          body: [
            '**Main Effect** - The individual effect of ONE of your factors on the outcome, ignoring the other factor.',
            '**Interaction Effect** - When the effect of one factor DEPENDS on the level of the other factor (e.g., a teaching method works great for boys, but poorly for girls).',
            '**Profile Plot** - A line graph that visualizes the interaction effect. Parallel lines mean no interaction; crossing lines mean a strong interaction.',
          ]
        }
      ]
    },

    /* ════════════════════ 2. THE BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — main effects vs interaction',
      blocks: [
        { type: 'heading', level: 2, text: 'Three F-tests, three questions' },

        { type: 'paragraph', text:
          'Two-way ANOVA produces THREE F-tests in one analysis, each answering a different question:' },

        { type: 'comparison',
          headers: ['Effect', 'Question it answers', 'Plain-English example'],
          rows: [
            ['**Main effect of Factor A (Method)**', 'Does the OUTCOME differ across levels of Factor A, AVERAGING ACROSS Factor B?', 'Do teaching methods differ in exam scores, ignoring gender?'],
            ['**Main effect of Factor B (Gender)**', 'Does the OUTCOME differ across levels of Factor B, AVERAGING ACROSS Factor A?', 'Do boys and girls differ in exam scores, ignoring teaching method?'],
            ['**Interaction A × B (Method × Gender)**', 'Does the EFFECT of Factor A DEPEND on the level of Factor B?', 'Does the BEST teaching method differ between boys and girls?'],
          ]},

        { type: 'definition', term: 'Main effect',
          body: 'The overall difference in the outcome across levels of one factor, AVERAGING OVER the levels of the other factor. A significant main effect of Method means methods differ — averaged across both genders combined.' },

        { type: 'definition', term: 'Interaction effect',
          body: 'When the effect of one factor DEPENDS on the level of the other factor. A significant Method × Gender interaction means the differences between methods are NOT the same for boys and girls — perhaps Method C is best for boys but Method B is best for girls.' },

        { type: 'analogy', title: 'Two recipes, two diners — when does combination matter?',
          body: 'Imagine you serve two recipes (R1 = traditional, R2 = experimental) to two types of diner (D1 = adults, D2 = children). A **main effect of recipe** means one recipe is generally preferred regardless of diner type. A **main effect of diner** means adults and children rate food differently on average. An **interaction** means: adults love R1 and hate R2, but children love R2 and hate R1 — the BEST recipe DEPENDS on who is eating. The three effects answer fundamentally different questions; all three can be present simultaneously.' },

        { type: 'reveal',
          prompt: 'You found: main effect of Method significant (p < .001); main effect of Gender NOT significant (p = .34); Method × Gender interaction significant (p = .02). What does this combination mean?',
          answer: '**Methods differ overall AND the pattern of method differences depends on gender.** The non-significant gender main effect means boys and girls do not differ in OVERALL average score. But the significant interaction means the COMPARISON BETWEEN methods is not the same for boys vs girls — perhaps Method C is best for boys (large advantage) but Method B is best for girls (smaller advantage). The interaction is the most interesting finding here — it tells you teaching method matters AND that it matters DIFFERENTLY for the two genders. You would follow up by examining the interaction plot and comparing simple effects.' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When two-way ANOVA is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The conditions' },

        { type: 'steps', steps: [
          { title: 'Outcome variable is CONTINUOUS',
            body: 'Y must be Scale.' },
          { title: 'TWO independent categorical factors',
            body: 'Each factor has 2 or more levels. Cases are independent — no person belongs to multiple cells of the design.' },
          { title: 'BALANCED OR UNBALANCED design — both work',
            body: 'A "balanced" design has equal cases per cell (e.g. 20 boys in Method A, 20 boys in Method B, 20 girls in Method A, 20 girls in Method B). Unbalanced designs work too but the interpretation is slightly more sensitive — try to keep cells roughly equal in size where possible.' },
          { title: 'Standard ANOVA assumptions apply per cell',
            body: 'Continuous Y, approximate normality within each cell, homogeneity of variance across cells, independence. Sample size: at least 10-20 cases per cell for stable estimates.' },
        ]},

        { type: 'comparison',
          headers: ['Design', 'Right test'],
          rows: [
            ['One factor (3+ groups), one outcome',                'One-way ANOVA (Lesson 1)'],
            ['**Two factors, one outcome — independent groups**',   '**Two-way ANOVA (this lesson)**'],
            ['Two factors, one outcome — same people in all conditions', 'Two-way repeated-measures ANOVA (advanced)'],
            ['One factor between + one factor within (mixed)',      'Mixed ANOVA (advanced)'],
            ['Three factors, one outcome',                          'Three-way ANOVA (rare; usually overcomplicated)'],
            ['Two outcomes simultaneously',                          'MANOVA (Multivariate ANOVA, advanced)'],
          ]},
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running two-way ANOVA in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'A different menu from one-way ANOVA' },

        { type: 'paragraph', text:
          'Two-way ANOVA uses a different SPSS menu from one-way: **Analyze → General Linear Model → Univariate**. ("Univariate" means one outcome variable, which is what you have.) The GLM Univariate dialog handles ANY ANOVA with one outcome and any number of categorical factors.' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → General Linear Model → Univariate.' },
          { title: 'Move your outcome to Dependent Variable',
            body: 'The continuous variable (e.g. math_score).' },
          { title: 'Move BOTH factors to Fixed Factor(s)',
            body: 'Move teaching_method AND gender into Fixed Factor(s). "Fixed" means the levels are specific categories you care about (not a random sample of possible levels).' },
          { title: 'Click Plots… to set up the interaction plot',
            body: 'In the Profile Plots dialog: move one factor (typically the one with more levels, e.g. teaching_method) to the Horizontal Axis, and the other (e.g. gender) to Separate Lines. Click Add. Tick "Include Error Bars" with 95% CI. Click Continue.' },
          { title: 'Click Post Hoc…',
            body: 'Move the factor with 3+ levels (teaching_method) into the Post Hoc Tests box. Tick Tukey AND Games-Howell. Click Continue.\n\nNote: post-hoc only works for main effects. For interaction follow-ups, you need "simple effects" via syntax (advanced).' },
          { title: 'Click Options…',
            body: 'Move every factor and the interaction (e.g. teaching_method, gender, teaching_method*gender) into Display Means For. Tick **Descriptive statistics**, **Estimates of effect size**, and **Homogeneity tests**. Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces several tables: Between-Subjects Factors, Descriptive Statistics, Levene\'s Test, the all-important **Tests of Between-Subjects Effects** (the three F-tests), and the Profile Plots.' },
        ]},

        { type: 'illustration', component: 'TwoWayAnovaDialog',
          caption: 'Figure 3. The GLM Univariate dialog for Two-Way ANOVA. The red numbers show the click sequence to set up the Dependent Variable, Fixed Factors, Plots, and Options.' },

        { type: 'illustration', component: 'TwoWayAnovaPlots',
          caption: 'Figure 4. The Profile Plots dialog. Move one factor to Horizontal Axis and one to Separate Lines. You MUST click Add so they appear in the Plots list below.' },
      ],
    },

    /* ════════════════════ 5. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the Tests of Between-Subjects Effects',
      blocks: [
        { type: 'heading', level: 2, text: 'Three rows, three F-tests' },

        { type: 'paragraph', text:
          'The KEY table is **Tests of Between-Subjects Effects**. It has one row per effect: factor A alone, factor B alone, the A × B interaction, plus Error and Total rows. The three rows you care about are the main effects and the interaction.' },

        { type: 'comparison',
          headers: ['Row', 'What it tests', 'What to look at'],
          rows: [
            ['**teaching_method**',         'Main effect of teaching method (averaged across gender)', 'F-value and Sig. — is the main effect significant?'],
            ['**gender**',                  'Main effect of gender (averaged across method)',          'F-value and Sig. — is the main effect significant?'],
            ['**teaching_method * gender**', 'Interaction: does method effect depend on gender?',      'F-value and Sig. — is the interaction significant?'],
            ['**Error**',                   'Within-cell variance.',                                   'Use to compute MS_error; usually informational only.'],
            ['**Corrected Total**',         'Total variance in Y.',                                    'Informational.'],
          ]},

        { type: 'heading', level: 3, text: 'Effect size for two-way ANOVA' },

        { type: 'paragraph', text:
          'In two-way ANOVA the standard effect size is **partial eta squared (η²_p)**, which SPSS reports if you ticked Estimates of effect size under Options. Partial η²_p shows the proportion of variance EACH effect accounts for, after removing the variance accounted for by other effects in the model. Same benchmarks as η²: .01 small, .06 medium, .14 large.' },

        { type: 'reveal',
          prompt: 'Your Tests of Between-Subjects Effects shows: teaching_method F(2, 108) = 14.5, p < .001, partial η² = .21. gender F(1, 108) = 2.4, p = .12, partial η² = .02. teaching_method × gender F(2, 108) = 5.8, p = .004, partial η² = .10. How do you interpret?',
          answer: '**Significant main effect of teaching method (large), no significant main effect of gender (small), significant interaction (moderate-large).** Methods differ on average (η² = .21, large). Boys and girls do not differ in overall score (gender main effect not significant). BUT the interaction is significant: the pattern of differences between methods is NOT the same for boys and girls. Some methods may favour one gender over the other. The next step is to inspect the interaction plot to SEE the pattern, then either describe it qualitatively or run "simple effects" tests to compare methods within each gender separately.' },
      ],
    },

    /* ════════════════════ 6. INTERACTION PLOTS ════════════════════ */
    {
      id: 'interaction-plots',
      title: 'Reading interaction plots',
      blocks: [
        { type: 'heading', level: 2, text: 'Three classic shapes' },

        { type: 'paragraph', text:
          'The Profile Plot (interaction plot) is the most informative visual in two-way ANOVA. It shows the mean of your outcome at each combination of the two factors, connected by lines. Three classic patterns appear:' },

        { type: 'illustration', component: 'InteractionPlots',
          caption: 'Figure 1. Three classic interaction plot patterns. LEFT (NO interaction): lines parallel — the effect of Factor A is the same regardless of Factor B. CENTRE (CROSSOVER): lines cross — the effect of Factor A reverses direction depending on Factor B. RIGHT (FAN): lines diverge — Factor A has a stronger effect at one level of B than the other.' },

        { type: 'comparison',
          headers: ['Plot pattern', 'Statistical meaning', 'Plain English'],
          rows: [
            ['**Parallel lines**',          'No interaction (interaction p > .05)',           'The effect of one factor is the same regardless of the other factor. Main effects tell the whole story.'],
            ['**Crossing lines (crossover)**', 'Strong interaction (interaction p < .05)',    'The effect REVERSES — one method is best at one level of B but the OTHER method is best at the other level of B.'],
            ['**Fan / diverging lines**',   'Interaction (interaction p < .05)',              'One factor has a STRONGER effect at one level of the other factor. Not a complete reversal, but the magnitude differs.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Lines parallel = no interaction; lines NOT parallel = interaction',
          body: 'The simple rule for reading interaction plots: **parallel lines mean NO interaction. Non-parallel lines (crossing, fanning, or any visible divergence) mean an interaction is present.** The more dramatic the divergence, the larger the interaction effect.' },

        { type: 'heading', level: 3, text: 'Interaction plots make complex findings easy to communicate' },

        { type: 'paragraph', text:
          'Tables of cell means are hard to digest; interaction plots make the pattern jump out. Always include the interaction plot in your Chapter 4 alongside the ANOVA table — it is often the most memorable image in the entire results section.' },
      ],
    },

    /* ════════════════════ 7. WHAT TO INTERPRET FIRST ════════════════════ */
    {
      id: 'what-first',
      title: 'What to interpret first — interaction, then main effects',
      blocks: [
        { type: 'heading', level: 2, text: 'The order matters' },

        { type: 'paragraph', text:
          'When a two-way ANOVA produces a significant interaction, the interaction CHANGES how you interpret the main effects. Always interpret in this order: **interaction first, then main effects (qualified by the interaction)**.' },

        { type: 'steps', steps: [
          { title: 'Step 1 — Is the interaction significant?',
            body: 'Look at the interaction row first. If significant (p < .05), the picture is complex — the effect of Factor A DEPENDS on Factor B. Examine the interaction plot to see the pattern.' },
          { title: 'Step 2a — IF interaction is significant',
            body: [
              'Describe the pattern from the plot: at which levels of B is A\'s effect strongest? At which levels is it weakest or reversed?',
              'Main effects become LESS interesting because they are misleading on their own — the "average" effect of A across levels of B may not match any specific cell.',
              'Optionally run "simple effects" — basically one-way ANOVAs of A separately at each level of B — to formally test the differences.',
              'Report the interaction prominently. Main effects can be reported but with a note that they should be interpreted in light of the interaction.',
            ]},
          { title: 'Step 2b — IF interaction is NOT significant',
            body: [
              'You can interpret main effects straightforwardly. A significant main effect of A means A matters; a significant main effect of B means B matters; non-significant main effects mean those factors do not matter overall.',
              'Run post-hoc tests on any significant main effect with 3+ levels (Tukey HSD or Games-Howell as appropriate).',
              'No need for simple effects analysis.',
            ]},
        ]},

        { type: 'callout', tone: 'warning', title: 'Significant interaction → reduced focus on main effects',
          body: 'A common beginner mistake: when both a main effect AND an interaction are significant, students report the main effect as if the interaction wasn\'t there. But a significant interaction means the main effect describes an "average" that may not apply to any specific subgroup. Always lead with the interaction; describe main effects in the context of the interaction.' },
      ],
    },

    /* ════════════════════ 8. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — teaching method by gender',
      blocks: [
        { type: 'workedExample', title: 'A PhD study at Kenyatta University',
          body: [
            { label: 'The research question',
              text: 'Does the effect of teaching method on exam scores DIFFER between boys and girls? Stated as a two-way design: Method (A, B, C) × Gender (boys, girls).' },
            { label: 'The data',
              text: 'n = 114 pupils (about 19 in each of the 6 cells). Outcome: math_score. Factors: teaching_method (1 = A, 2 = B, 3 = C) and gender (1 = boys, 2 = girls).' },
            { label: 'Step 1 — Cell means',
              text: 'A-boys: 58, A-girls: 62. B-boys: 75, B-girls: 68. C-boys: 80, C-girls: 76. Boys average: 71; girls average: 69 (similar overall). But the PATTERN looks different — B and C are bigger for boys than girls.' },
            { label: 'Step 2 — Run the GLM Univariate ANOVA',
              text: 'Analyze → General Linear Model → Univariate → math_score Dependent, teaching_method and gender Fixed Factors → Plots: teaching_method on Horizontal, gender Separate Lines → Post Hoc: teaching_method → Options: Descriptive, Effect size, Homogeneity tests → OK.' },
            { label: 'Step 3 — Read the Tests of Between-Subjects Effects',
              text: 'teaching_method: F(2, 108) = 14.5, p < .001, partial η² = .21 (large). gender: F(1, 108) = 0.8, p = .37, partial η² = .01 (negligible). teaching_method × gender: F(2, 108) = 4.2, p = .017, partial η² = .07 (moderate).' },
            { label: 'Step 4 — Interpret the interaction first',
              text: 'The interaction is significant — the EFFECT of method depends on gender. Look at the plot: for boys, scores rise steeply A → B → C. For girls, scores rise too but more gradually, and the B-vs-girls cell is comparatively lower. The newer methods (B and C) benefit boys more than girls.' },
            { label: 'Step 5 — Interpret main effects (with caveat)',
              text: 'Main effect of method significant — methods differ on average. Main effect of gender NOT significant — boys and girls don\'t differ overall. BUT the method effect is bigger for boys, as the interaction shows.' },
            { label: 'Step 6 — APA write-up',
              text: '*"A two-way between-subjects analysis of variance was conducted to examine the effects of teaching method (A, B, C) and gender (boys, girls) on end-of-term mathematics scores among 114 Form 3 pupils. There was a significant main effect of teaching method, F(2, 108) = 14.5, p < .001, partial η² = .21, indicating that methods differed in their overall impact on scores. The main effect of gender was non-significant, F(1, 108) = 0.8, p = .37, partial η² = .01. A significant teaching method × gender interaction emerged, F(2, 108) = 4.2, p = .017, partial η² = .07. Inspection of the interaction plot revealed that the advantage of newer methods (B and C) over the traditional lecture (A) was larger for boys than for girls. While both genders benefited from Methods B and C compared to A, boys gained more from the flipped classroom (M = 80) and group discussion (M = 75) than girls did (M = 76 and M = 68 respectively). This pattern suggests that classroom-based interactive methods may produce stronger gains for boys, though both genders showed improvements over traditional lecturing."*' },
          ]},
      ],
    },

    /* ════════════════════ 9. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing two-way ANOVA up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A two-way between-subjects analysis of variance was conducted to examine the effects of [FACTOR A] and [FACTOR B] on [OUTCOME] among [N] [respondents]. [Describe each effect in turn:] The main effect of [Factor A] was [significant/non-significant], F([df]) = [F], p = [p], partial η² = [.XX]. The main effect of [Factor B] was [significant/non-significant], F([df]) = [F], p = [p], partial η² = [.XX]. The [A × B] interaction was [significant/non-significant], F([df]) = [F], p = [p], partial η² = [.XX]. [If interaction significant, describe the pattern from the interaction plot.]' },

        { type: 'callout', tone: 'success', title: 'Five things every two-way ANOVA write-up needs',
          body: '**1.** Both factors and their levels, plus sample size. **2.** F, df, p, and partial η² for EACH of the three effects (main A, main B, interaction). **3.** Interpretation order: interaction first; main effects qualified by the interaction. **4.** A description of the interaction plot pattern when interaction is significant. **5.** Cell means table or interaction plot in the figure list. Examiners look for all five — completeness signals thoroughness.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why did you interpret the interaction before the main effects?',
              a: 'When a significant interaction is present, the main effects describe averages that may obscure the more nuanced pattern. The interaction tells us the effect of one factor DEPENDS on the level of the other — so the "average" main effect may not apply to any specific subgroup. Leading with the interaction gives the most accurate picture; main effects are then interpreted as qualified summaries.' },
            { q: 'Did you check the homogeneity of variance assumption?',
              a: 'Yes. Levene\'s test was non-significant, F(5, 108) = 1.21, p = .31, indicating equal variances across the six cells of the design. This supported use of the standard two-way ANOVA F-tests without robust adjustments.' },
            { q: 'Why did you use partial eta squared instead of eta squared?',
              a: 'In multi-factor ANOVA, **partial eta squared** is the conventional effect size because it removes the variance accounted for by the OTHER effects in the model when computing each effect\'s contribution. Plain eta squared would treat all variance as a single pool. SPSS reports partial η² by default in the GLM Univariate output when "Estimates of effect size" is ticked.' },
          ]},
      ],
    },

    /* ════════════════════ 10. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common two-way ANOVA mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Interpreting main effects without checking the interaction',
          body: 'You see a significant main effect of Method (p < .001) and report "Method C is best overall". You skip the interaction row, which was also significant — meaning the "best method" actually depends on gender. Your conclusion is misleading.',
          fix: 'ALWAYS check the interaction row first. If significant, the main effects are qualified — describe the interaction pattern before generalising about main effects.' },

        { type: 'mistake',
          title: 'Mistake 2 — Running post-hoc on the interaction term (cannot be done)',
          body: 'You see a significant interaction and try to tick post-hoc tests for it in the dialog. SPSS only offers post-hoc for the main-effect factors with 3+ levels, not the interaction.',
          fix: 'For significant interactions, you need "simple effects" tests — one-way ANOVAs of one factor at each level of the other (e.g. ANOVA of Method separately for boys and again for girls). This requires SPSS syntax (EMMEANS with COMPARE), or you can describe the pattern qualitatively from the interaction plot.' },

        { type: 'mistake',
          title: 'Mistake 3 — Skipping the interaction plot',
          body: 'You report the F-tests and stop. The reader cannot visualise the pattern. The interaction plot is the most memorable image in two-way ANOVA Chapter 4 and you have omitted it.',
          fix: 'Always tick Profile Plots in the dialog. Include the interaction plot in Chapter 4 as a numbered figure. Describe its pattern in the narrative. Examiners often look at the plot before the text.' },

        { type: 'mistake',
          title: 'Mistake 4 — Reporting eta squared instead of partial eta squared',
          body: 'For your two-way ANOVA you compute eta squared by hand from SS values. But this conflates the effect of each factor with the effects of the others.',
          fix: 'For multi-factor ANOVA, use **partial eta squared** (which SPSS provides when you tick Estimates of effect size in Options). Plain eta squared is for one-way ANOVA. Partial η² gives each effect\'s unique contribution after accounting for other effects.' },
      ],
    },

    /* ════════════════════ 11. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Two-way ANOVA examines the effects of TWO categorical factors on one continuous outcome — and the INTERACTION between them.',
          'It produces three F-tests in one analysis: main effect of A, main effect of B, interaction A × B.',
          'Main effect = overall difference across levels of one factor, averaging over the other.',
          'Interaction = the effect of one factor DEPENDS on the level of the other.',
          'Run via Analyze → General Linear Model → Univariate. Move outcome to Dependent, both factors to Fixed Factor(s). Tick Profile Plots, Post Hoc, and Options (Descriptive, Effect size, Homogeneity).',
          'Always check the **interaction row first**. If significant, interpret the interaction pattern via the plot. Main effects are then qualified by the interaction.',
          'Interaction plots: parallel lines = no interaction; crossing lines = crossover interaction; fanning lines = magnitude differs.',
          'Effect size for multi-factor ANOVA is **partial eta squared** (.01 small, .06 medium, .14 large).',
          'For interaction follow-up use simple effects (advanced, requires syntax); main effect post-hoc uses Tukey or Games-Howell as in one-way.',
          'Avoid the four mistakes: ignoring the interaction, trying to post-hoc the interaction, skipping the plot, using regular instead of partial η².',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 4: Repeated-measures ANOVA** — the final lesson of this course AND of the entire platform curriculum — we cover what to do when the same people are measured at multiple time points (pre-test, mid-term, post-test). Repeated measures ANOVA is the workhorse of intervention studies and longitudinal research.' },

        { type: 'paragraph', text:
          'Before moving on, find two categorical factors and a continuous outcome in your dataset (or use a worked dataset). Run two-way ANOVA with all the right options. Look at the three F-tests; identify whether the interaction is significant; describe the pattern from the plot. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 12. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'Two-way ANOVA produces THREE F-tests. What are they?',
          choices: [
            'Three main effects',
            'Main effect of A, main effect of B, and the A × B interaction',
            'Three independent t-tests',
            'Pre-test, mid-test, post-test',
          ],
          answer: 1,
          explanation: 'Two-way ANOVA decomposes the variance into three sources, producing three F-tests in one analysis: the main effect of Factor A (average effect of A, ignoring B), the main effect of Factor B (average effect of B, ignoring A), and the A × B interaction (whether A\'s effect DEPENDS on B). Always check all three.' },

        { type: 'check',
          question: 'In an interaction plot, what does it mean if the two lines are PARALLEL?',
          choices: [
            'There is a strong interaction',
            'There is NO interaction — the effect of one factor is the same regardless of the other',
            'You have made a plotting error',
            'The main effects are significant',
          ],
          answer: 1,
          explanation: 'Parallel lines indicate NO interaction — the effect of Factor A is the same at each level of Factor B. Non-parallel lines (crossing, fanning, or any visible divergence) indicate an interaction is present. The more dramatic the divergence, the larger the interaction effect.' },

        { type: 'check',
          question: 'When both a main effect AND an interaction are significant, which should you interpret first?',
          choices: [
            'Main effect first, then interaction',
            'INTERACTION first — the interaction qualifies the main effect; the "average" main effect may not apply to specific subgroups',
            'Whichever has the larger F',
            'Doesn\'t matter — they are independent',
          ],
          answer: 1,
          explanation: 'Always interpret the interaction first. A significant interaction means the effect of one factor DEPENDS on the level of the other — so the main effect is an "average" that may not match any specific subgroup\'s pattern. Lead with the interaction in your write-up; describe main effects as qualified summaries.' },

        { type: 'check',
          question: 'Why use PARTIAL eta squared instead of regular eta squared for two-way ANOVA?',
          choices: [
            'They are the same',
            'In multi-factor ANOVA, partial η² removes variance accounted for by OTHER effects, giving each effect\'s unique contribution. Regular η² conflates them.',
            'Partial η² is always bigger',
            'SPSS does not compute regular eta squared',
          ],
          answer: 1,
          explanation: 'In a model with multiple effects, partial eta squared isolates each effect\'s contribution after removing the variance accounted for by other effects. Regular eta squared (SS_effect / SS_total) does not adjust for the others, so the values can confound. Partial η² is the standard for multi-factor ANOVA — and SPSS reports it when you tick Estimates of effect size.' },

        { type: 'check',
          question: 'You want post-hoc tests for a significant interaction. SPSS does not offer them in the dialog. Why?',
          choices: [
            'Post-hoc tests do not apply to interactions',
            'You need "simple effects" — one-way ANOVAs of one factor at each level of the other, typically run via syntax with EMMEANS / COMPARE',
            'You need more participants',
            'Interactions cannot be tested',
          ],
          answer: 1,
          explanation: 'Standard post-hoc tests (Tukey, etc.) compare levels of a single factor — they do not apply directly to interactions. To follow up a significant interaction, you use "simple effects" — essentially running one-way ANOVAs of one factor at each level of the other (e.g. ANOVA of Method separately for boys and for girls). This requires syntax in SPSS (EMMEANS with COMPARE), or you can describe the interaction pattern qualitatively from the plot.' },

        { type: 'check',
          question: 'Your output shows: Method F(2,108) = 14.5, p < .001. Gender F(1,108) = 0.8, p = .37. Method × Gender F(2,108) = 4.2, p = .017. How do you write this up?',
          choices: [
            '"Method is significant."',
            '"All effects significant."',
            '"There was a significant main effect of method, F(2, 108) = 14.5, p < .001, partial η² = .21, and a significant method × gender interaction, F(2, 108) = 4.2, p = .017, partial η² = .07. The main effect of gender was non-significant. Inspection of the interaction plot revealed the advantage of newer methods was larger for boys than girls."',
            '"Methods differ."',
          ],
          answer: 2,
          explanation: 'Option C hits all the elements: names all three effects with F, df, p, and partial η²; identifies which are significant and which are not; leads with the interaction\'s descriptive interpretation from the plot; and qualifies the main effects in light of the interaction. The other options are vague or incomplete.' },
      ],
    },
  ],
};
