/**
 * ANOVA · Lesson 1 — One-Way ANOVA
 * Comparing means across three or more independent groups.
 */

export const ONE_WAY_ANOVA_LESSON = {
  id: 'anova-1',
  title: 'One-way ANOVA',
  subtitle: 'Module 03 · Course: ANOVA · Lesson 1 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When you have three or more groups to compare',
      blocks: [
        { type: 'scene', body: [
          'You ran a study comparing three teaching methods at a Nairobi secondary school. Method A used traditional lectures. Method B used group discussion. Method C used flipped-classroom video lessons. After eight weeks, every pupil took the same end-of-term mathematics exam. You collected scores for 117 pupils — about 40 per method.',
          'You want to know: **do the three teaching methods produce different mean exam scores?** Method A averaged 60. Method B averaged 72. Method C averaged 78. Are these differences REAL, or just sampling noise? You cannot run three separate t-tests (A vs B, A vs C, B vs C) — that would multiply your chances of a false positive and is methodologically frowned upon. You need ONE test that compares ALL three groups at the same time.',
          'That test is **one-way ANOVA** — Analysis of Variance with one grouping factor and three or more levels. It is the natural extension of the independent-samples t-test to three or more groups. This lesson teaches you what ANOVA does, how to run it, how to read the output (including the famous F-statistic), and how to follow up with post-hoc tests (covered in detail in Lesson 2).',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Explain what one-way ANOVA does** — and why you do not just run three t-tests.',
            '**Recognise when one-way ANOVA is the right test** (one categorical factor with 3+ groups, one continuous outcome).',
            '**Run one-way ANOVA in SPSS** via Analyze → Compare Means → One-Way ANOVA.',
            '**Read the ANOVA table** — Sum of Squares, df, Mean Square, F, p-value.',
            '**Understand the F-statistic** — the ratio of between-group variance to within-group variance.',
            '**Interpret a significant F** — it tells you SOMETHING differs, but not which groups.',
            '**Check assumptions** — Levene\'s test for homogeneity of variance, normality within groups, independence.',
            '**Write up one-way ANOVA results** following the APA template every examiner expects.',
          ]},

        { type: 'why', body:
          'One-way ANOVA is one of the three most-used statistical tests in postgraduate research (alongside t-tests and regression). Every thesis comparing pupils across forms, employees across departments, patients across treatment groups, or any three-or-more independent groups will use it. Confidence with ANOVA opens up huge swathes of research designs.' },
      ],
    },

    /* ════════════════════ 2. WHY NOT MULTIPLE T-TESTS ════════════════════ */
    {
      id: 'why-not-ttests',
      title: 'Why not just run three t-tests?',
      blocks: [
        { type: 'heading', level: 2, text: 'The hidden danger of multiple comparisons' },

        { type: 'paragraph', text:
          'A common beginner instinct: "I have three groups, I\'ll just run three t-tests (A vs B, A vs C, B vs C). Three p-values, easy." This is the WRONG approach. Here is why.' },

        { type: 'paragraph', text:
          'Every t-test at α = .05 has a 5% chance of producing a false positive (Type I error). If you run ONE test, the false-positive rate is 5%. If you run THREE independent tests, the cumulative chance of getting AT LEAST ONE false positive jumps to roughly 14%. Run FIVE tests and you are at about 23%. Statistical inflation by accident.' },

        { type: 'comparison',
          headers: ['Number of t-tests', 'Cumulative false-positive rate (at α = .05)'],
          rows: [
            ['1', '5%'],
            ['3 (comparing 3 groups)', '~14%'],
            ['6 (comparing 4 groups)', '~26%'],
            ['10 (comparing 5 groups)', '~40%'],
          ]},

        { type: 'paragraph', text:
          'ANOVA solves this by running ONE OVERALL test that asks: "is there any difference somewhere among the three groups?" If yes (the F-test is significant), THEN you follow up with post-hoc tests that are mathematically adjusted to keep the overall false-positive rate at 5%. The two-step approach — ANOVA then post-hoc — is the methodologically clean way to compare 3+ groups.' },

        { type: 'callout', tone: 'gold', title: 'The two-step ANOVA workflow',
          body: '**Step 1: One-way ANOVA** — is there ANY difference among the groups? (This lesson.) **Step 2: Post-hoc tests** — IF the ANOVA is significant, which specific pairs of groups differ? (Lesson 2.) Never skip step 1 and jump to multiple t-tests; never skip step 2 if step 1 is significant and you want to know which groups differ.' },
      ],
    },

    /* ════════════════════ 3. THE BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — variance between vs variance within',
      blocks: [
        { type: 'heading', level: 2, text: 'Why it is called ANALYSIS OF VARIANCE' },

        { type: 'paragraph', text:
          'The name "ANOVA" (ANalysis Of VAriance) sounds odd because we are comparing MEANS. Why "variance"? Because the test\'s logic is based on partitioning total variance into two parts: variance BETWEEN groups and variance WITHIN groups.' },

        { type: 'illustration', component: 'AnovaLogic',
          caption: 'Figure 1. The ANOVA logic. Three groups (Method A, B, C) each with 8 pupils. BETWEEN-group variance: how far apart are the colored mean lines? WITHIN-group variance: how spread are the dots WITHIN each color cloud? F = Between / Within. If between-group variance is much bigger than within-group variance, the F-statistic is large and we conclude the groups differ.' },

        { type: 'definition', term: 'F-statistic',
          body: 'The ratio of between-group variance to within-group variance: **F = MS_between / MS_within**, where MS stands for "Mean Square" (variance). A large F means the differences between groups are big compared to the random scatter within groups — strong evidence that group membership matters. A small F (near 1) means group differences are no bigger than the random variation we see within any group.' },

        { type: 'analogy', title: 'Three queues at the matatu stage',
          body: 'Imagine three matatu queues going to Westlands, Karen, and Kibera. Within each queue, people arrived over a wide range of times — some early, some late. The BETWEEN-queue variation is how different the AVERAGE arrival time is for the three queues. The WITHIN-queue variation is how spread out arrivals were inside each queue. ANOVA asks: are the queues meaningfully different from each other compared to the natural variation inside any single queue? If yes (large F), the queues represent different "types" of travellers; if no (small F), they are just three random samples.' },

        { type: 'reveal',
          prompt: 'In an ANOVA, what would a large F-statistic (say, F = 12.5) suggest?',
          answer: '**Strong evidence that at least one group mean differs from the others.** A large F means the between-group variance is much larger than the within-group variance — the group means are spread far apart relative to the random scatter within each group. F = 12.5 with reasonable df would typically be highly significant (p < .001). The next step would be a post-hoc test to find out WHICH specific groups differ. By contrast, an F near 1 (say, F = 0.8) would mean between-group differences are no bigger than within-group noise — no evidence the groups differ.' },
      ],
    },

    /* ════════════════════ 4. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When one-way ANOVA is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The four conditions' },

        { type: 'steps', steps: [
          { title: 'Outcome variable is CONTINUOUS',
            body: 'Y must be Scale (exam score, weight, income, etc.). For ordinal outcomes use Kruskal-Wallis (the non-parametric equivalent). For binary outcomes use chi-square or logistic regression.' },
          { title: 'Predictor (factor) is CATEGORICAL with 3+ INDEPENDENT GROUPS',
            body: 'Your grouping variable has at least 3 levels — teaching method (A/B/C), education level (Primary/Secondary/Tertiary/Postgrad), county group. With only 2 levels, use an independent-samples t-test (it gives the same answer as ANOVA in this case). Independence is critical: each case belongs to ONE group only, and cases are not paired or matched across groups.' },
          { title: 'Outcome is APPROXIMATELY NORMAL within each group',
            body: 'Check with Shapiro-Wilk per group, or histograms. ANOVA is reasonably robust to mild non-normality in larger samples (n ≥ 30 per group). For badly non-normal data use Kruskal-Wallis.' },
          { title: 'HOMOGENEITY OF VARIANCE — equal variances across groups',
            body: 'The spread of Y should be roughly similar across the three groups. Check with Levene\'s Test (covered in Section 6). If violated, use the Welch-corrected ANOVA (SPSS provides it automatically when you tick Options).' },
        ]},

        { type: 'comparison',
          headers: ['Number of groups', 'Outcome type', 'Right test'],
          rows: [
            ['2 (e.g. male vs female)',           'Continuous',  'Independent-samples t-test'],
            ['2 paired/matched',                   'Continuous',  'Paired-samples t-test'],
            ['3+ independent groups',              'Continuous',  '**One-way ANOVA (this lesson)**'],
            ['3+ independent groups',              'Ordinal',     'Kruskal-Wallis test'],
            ['3+ measurements on same people',     'Continuous',  'Repeated-measures ANOVA (Lesson 4)'],
            ['Two factors (e.g. method × gender)',  'Continuous',  'Two-way ANOVA (Lesson 3)'],
          ]},

        { type: 'illustration', component: 'AnovaDecisionTree',
          caption: 'Figure 2. The ANOVA decision tree. Start with the number of factors. With ONE factor and independent groups → one-way ANOVA (this lesson). With ONE factor and repeated measures on the same people → repeated-measures ANOVA (Lesson 4). With TWO factors → two-way ANOVA (Lesson 3).' },
      ],
    },

    /* ════════════════════ 5. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running one-way ANOVA in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'The 6-step click path' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → Compare Means → One-Way ANOVA.' },
          { title: 'Move your outcome to Dependent List',
            body: 'The continuous variable (e.g. math_score).' },
          { title: 'Move your grouping variable to Factor',
            body: 'The categorical variable with 3+ levels (e.g. teaching_method coded 1 = A, 2 = B, 3 = C).' },
          { title: 'Click Post Hoc…',
            body: 'Tick **Tukey** (the default choice when variances are equal) AND **Games-Howell** (the choice when variances are unequal). This gives you both — you pick the right one to interpret AFTER you check Levene\'s. Leave significance level at 0.05. Click Continue.' },
          { title: 'Click Options',
            body: 'Tick **Descriptive** (means and SDs per group), **Homogeneity of variance test** (Levene\'s test), and **Means plot** (visual comparison of group means). Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces four key tables: Descriptives, Test of Homogeneity of Variances, ANOVA, and Post Hoc Tests. Plus the Means plot graph.' },
        ]},

        { type: 'illustration', component: 'OneWayAnovaDialog',
          caption: 'Figure 3. The One-Way ANOVA dialog. Dependent List = the continuous outcome (math_score). Factor = the categorical grouping variable (teaching_method). The three highlighted buttons (Contrasts, Post Hoc, Options) let you customise — always click Post Hoc (tick Tukey + Games-Howell) AND Options (tick Descriptive, Homogeneity of variance test, Means plot).' },
      ],
    },

    /* ════════════════════ 6. CHECKING ASSUMPTIONS ════════════════════ */
    {
      id: 'assumptions',
      title: 'Checking the assumptions — especially Levene\'s test',
      blocks: [
        { type: 'heading', level: 2, text: 'The single most important assumption check' },

        { type: 'paragraph', text:
          'Before reading the F-statistic, look at the **Test of Homogeneity of Variances** table — specifically the **Levene\'s Test** row. This single number determines whether you use the standard ANOVA F-test or the Welch-corrected version.' },

        { type: 'comparison',
          headers: ['Levene\'s Sig.', 'What it means', 'What to do'],
          rows: [
            ['**p > .05 (non-significant)**', 'Variances across groups are roughly equal — homogeneity assumption MET.', 'Use the standard ANOVA F-test row. Use **Tukey HSD** for post-hoc.'],
            ['**p < .05 (significant)**',     'Variances differ across groups — homogeneity assumption VIOLATED.',      'Use the **Welch** row in the Robust Tests of Equality of Means table. Use **Games-Howell** for post-hoc (not Tukey).'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Levene\'s direction is the same as most tests',
          body: 'Unlike Hosmer-Lemeshow (where you want non-significance), Levene\'s acts like a normal hypothesis test. The null is "variances are equal" — so a NON-significant result (p > .05) is good (you can keep using standard ANOVA). A SIGNIFICANT result (p < .05) is bad (use Welch instead). Many students confuse this with Hosmer-Lemeshow, so check the direction carefully.' },

        { type: 'heading', level: 3, text: 'Other assumptions, briefly' },

        { type: 'list', items: [
          '**Independence** — each case belongs to ONE group, no pairing/clustering. Usually satisfied by sampling design.',
          '**Approximate normality WITHIN each group** — run Shapiro-Wilk per group, or inspect histograms. ANOVA is robust to mild violations with n ≥ 30 per group.',
          '**No extreme outliers** — boxplot per group reveals them. Investigate and decide whether to keep.',
        ]},
      ],
    },

    /* ════════════════════ 7. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the ANOVA output table',
      blocks: [
        { type: 'heading', level: 2, text: 'The F-test and what it tells you' },

        { type: 'illustration', component: 'AnovaOutput',
          caption: 'Figure 4. A clean ANOVA output. Between Groups row: Sum of Squares = 2880.4, df = 2, Mean Square = 1440.2, F = 14.8, Sig. = .000. Within Groups row: Sum of Squares = 11136.5, df = 114, Mean Square = 97.7. F(2, 114) = 14.8, p < .001 — at least ONE group mean differs significantly.' },

        { type: 'comparison',
          headers: ['Column', 'What it shows'],
          rows: [
            ['**Sum of Squares (Between)**',  'Total variation EXPLAINED by group differences.'],
            ['**Sum of Squares (Within)**',   'Total variation NOT explained by group — residual scatter.'],
            ['**df (Between)**',              'k − 1, where k = number of groups. For 3 groups, df = 2.'],
            ['**df (Within)**',               'N − k, where N = total sample size. For 117 pupils across 3 groups, df = 114.'],
            ['**Mean Square (MS)**',          'Sum of Squares ÷ df. The variance estimate for each source.'],
            ['**F**',                         'MS_between ÷ MS_within. The test statistic.'],
            ['**Sig.**',                      'The p-value. If < .05, at least one group mean differs.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Reporting F with both degrees of freedom',
          body: 'Always report F with BOTH degrees of freedom: **F(df_between, df_within) = value**. For example: F(2, 114) = 14.8, p < .001. The (2, 114) tells the reader you had 3 groups (df between = 2) and 117 total cases (df within = 114). Reporting just "F = 14.8" without the degrees of freedom is incomplete.' },

        { type: 'heading', level: 3, text: 'What a significant F does (and does not) tell you' },

        { type: 'paragraph', text:
          'A significant F (p < .05) tells you that **AT LEAST ONE group mean differs from at least one other**. It does NOT tell you WHICH specific pairs differ. To find that out, look at the post-hoc tests — which is the entire focus of Lesson 2.' },

        { type: 'reveal',
          prompt: 'You see F(2, 114) = 14.8, p < .001, and your descriptive statistics show Method A: M = 60, Method B: M = 72, Method C: M = 78. Can you conclude that ALL THREE methods differ significantly from each other?',
          answer: '**Not yet — you need the post-hoc tests.** The significant F tells you SOMETHING differs, but not which specific pairs. With these means it LOOKS like all three differ, but the test for that is the post-hoc. It is entirely possible that A is significantly different from B and C, but B and C are not significantly different from each other (their gap is only 6 points and may be within the range of normal sampling variation). Post-hoc tests give you the pair-by-pair p-values that confirm which differences are real. Always run them after a significant ANOVA.' },
      ],
    },

    /* ════════════════════ 8. EFFECT SIZE ════════════════════ */
    {
      id: 'effect-size',
      title: 'Reporting effect size — eta squared',
      blocks: [
        { type: 'heading', level: 2, text: 'Significance is not enough — report magnitude too' },

        { type: 'paragraph', text:
          'A significant ANOVA tells you the differences are unlikely to be due to chance. But how BIG are those differences? Reporting only the p-value misses the practical importance. Eta squared (η²) is the standard ANOVA effect size.' },

        { type: 'definition', term: 'Eta squared (η²)',
          body: 'The proportion of total variance in Y that is explained by group membership. Calculated as: **η² = SS_between ÷ SS_total**. Ranges from 0 to 1. Interpretation benchmarks: η² ≈ .01 small, η² ≈ .06 medium, η² ≈ .14 large.' },

        { type: 'paragraph', text:
          'SPSS does not give you η² directly in the One-Way ANOVA output, but you can compute it from the ANOVA table:' },

        { type: 'workedExample', title: 'Computing η² from the ANOVA output',
          body: [
            { label: 'Read SS from the ANOVA table',
              text: 'In our example: SS_between = 2880.4 and SS_total = 2880.4 + 11136.5 = 14016.9 (the Total row).' },
            { label: 'Compute',
              text: 'η² = 2880.4 ÷ 14016.9 = 0.205.' },
            { label: 'Interpret',
              text: 'η² = .21 is in the "large" range (above .14). About 21% of variance in exam scores is accounted for by teaching method — a substantively meaningful effect.' },
            { label: 'Report in APA style',
              text: '"F(2, 114) = 14.8, p < .001, η² = .21."' },
          ]},

        { type: 'callout', tone: 'gold', title: 'Effect size benchmarks for ANOVA',
          body: '**η² ≈ .01 = small effect** · **η² ≈ .06 = medium effect** · **η² ≈ .14 = large effect**. Always report η² alongside the F-test. A significant ANOVA with η² = .02 is statistically significant but practically tiny. A significant ANOVA with η² = .25 is both real AND large.' },
      ],
    },

    /* ════════════════════ 9. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — three teaching methods',
      blocks: [
        { type: 'workedExample', title: 'A Master\'s study at the University of Nairobi',
          body: [
            { label: 'The research question',
              text: 'Do three teaching methods (A = traditional lecture, B = group discussion, C = flipped classroom) produce different mean mathematics scores in Form 3 pupils?' },
            { label: 'The data',
              text: 'n = 117 pupils randomly assigned across 3 methods (39 per group on average). Outcome: **math_score** (continuous, 0-100). Factor: **teaching_method** (1 = A, 2 = B, 3 = C).' },
            { label: 'Step 1 — Inspect descriptives first',
              text: 'Method A: M = 60.2, SD = 9.4, n = 38. Method B: M = 71.6, SD = 10.1, n = 40. Method C: M = 78.3, SD = 9.7, n = 39. Visually, B and C look higher than A, with C slightly higher than B.' },
            { label: 'Step 2 — Run one-way ANOVA',
              text: 'Analyze → Compare Means → One-Way ANOVA → math_score Dependent, teaching_method Factor → Post Hoc tick Tukey AND Games-Howell → Options tick Descriptive, Homogeneity of variance test, Means plot → OK.' },
            { label: 'Step 3 — Check Levene\'s',
              text: 'Levene\'s F = 0.41, p = .67. NON-significant → homogeneity met → standard ANOVA F is fine, use Tukey for post-hoc.' },
            { label: 'Step 4 — Read the ANOVA table',
              text: 'F(2, 114) = 14.8, p < .001. Highly significant — at least one group mean differs.' },
            { label: 'Step 5 — Compute eta squared',
              text: 'η² = 2880.4 / 14016.9 = .21. Large effect — teaching method accounts for 21% of variance in scores.' },
            { label: 'Step 6 — Look at post-hoc Tukey (preview)',
              text: 'A vs B: mean difference = −11.4, p < .001. A vs C: mean difference = −18.1, p < .001. B vs C: mean difference = −6.7, p = .009. All three pairwise differences are significant — every method significantly outperforms every other.' },
            { label: 'Step 7 — APA write-up',
              text: '*"A one-way analysis of variance was conducted to compare end-of-term mathematics scores across three teaching methods (A = traditional lecture, n = 38; B = group discussion, n = 40; C = flipped classroom, n = 39). Descriptive statistics indicated mean scores of 60.2 (SD = 9.4), 71.6 (SD = 10.1), and 78.3 (SD = 9.7) for Methods A, B, and C respectively. Levene\'s test indicated homogeneity of variance was met, F(2, 114) = 0.41, p = .67. The ANOVA was statistically significant with a large effect size, F(2, 114) = 14.8, p < .001, η² = .21, indicating that teaching method accounted for 21% of the variance in exam scores. Post-hoc Tukey HSD tests confirmed that all three pairwise comparisons were significant (all p < .01): Method C scored higher than both A and B; Method B scored higher than A. The flipped-classroom approach produced the strongest outcomes in this sample."*' },
          ]},
      ],
    },

    /* ════════════════════ 10. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing one-way ANOVA up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A one-way analysis of variance was conducted to compare [OUTCOME] across [k] [groups description]. Descriptive statistics indicated mean [OUTCOME] of [M_1] (SD = [SD_1]), [M_2] (SD = [SD_2]), [M_3] (SD = [SD_3]) for [groups]. Levene\'s test indicated [homogeneity of variance was met / violated], F([df1], [df2]) = [value], p = [p]. The ANOVA was [significant/non-significant], F([df_between], [df_within]) = [F-value], p = [p-value], η² = [.XX], indicating that [grouping variable] accounted for [XX]% of the variance in [outcome]. Post-hoc [Tukey HSD / Games-Howell] tests revealed [which pairs differed — see Lesson 2 for templates].' },

        { type: 'callout', tone: 'success', title: 'Six things to include in every ANOVA write-up',
          body: '**1.** What you compared (groups + sample sizes). **2.** Descriptive statistics (M and SD per group). **3.** Levene\'s test result. **4.** F-value with BOTH degrees of freedom. **5.** p-value. **6.** Effect size η² with interpretation. (And, if F is significant, Lesson 2 covers the post-hoc reporting.)' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why didn\'t you run three independent-samples t-tests?',
              a: 'Running multiple t-tests inflates the family-wise Type I error rate. With three t-tests at α = .05, the cumulative false-positive risk rises to about 14%. One-way ANOVA controls this by running a single overall test, followed by post-hoc tests (Tukey HSD in this case) that are mathematically adjusted to preserve the overall .05 error rate.' },
            { q: 'Did you check the homogeneity of variance assumption?',
              a: 'Yes — Levene\'s test was non-significant, F(2, 114) = 0.41, p = .67, indicating equal variances across the three groups. This permitted use of the standard ANOVA F-test and Tukey HSD post-hoc tests rather than the Welch-corrected variants.' },
            { q: 'Why did you report eta squared rather than Cohen\'s d?',
              a: 'Cohen\'s d is the standard effect-size statistic for two-group comparisons (t-tests). For ANOVA with three or more groups, **eta squared (η²)** is the conventional effect size — it expresses the proportion of total variance in the outcome attributable to group membership. Cohen\'s benchmarks for η² are .01 small, .06 medium, .14 large.' },
          ]},
      ],
    },

    /* ════════════════════ 11. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common one-way ANOVA mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Running multiple t-tests instead of ANOVA',
          body: 'You have three groups and run A vs B, A vs C, B vs C as separate t-tests. You report three p-values. The cumulative false-positive rate is about 14%, not 5%.',
          fix: 'Use one-way ANOVA for the overall comparison, then post-hoc tests for specific pairs. This controls the family-wise error rate at .05.' },

        { type: 'mistake',
          title: 'Mistake 2 — Skipping post-hoc when ANOVA is significant',
          body: 'You report "F(2, 114) = 14.8, p < .001 — teaching methods differ significantly" and stop there. The reader has no idea which methods differ from which.',
          fix: 'A significant F tells you SOMETHING differs; post-hoc tests tell you WHICH. Always run post-hoc (Tukey if Levene non-significant, Games-Howell if significant) and report the pairwise comparisons.' },

        { type: 'mistake',
          title: 'Mistake 3 — Ignoring Levene\'s test',
          body: 'You read the F-test and move on without checking Levene\'s. Levene\'s was significant (variances unequal), so your standard F-test is biased. The Welch-corrected F would have given a more accurate result.',
          fix: 'Always check Levene\'s FIRST. If significant (p < .05), report the Welch F (in the Robust Tests of Equality of Means table) and use Games-Howell for post-hoc. If non-significant (p > .05), use standard F and Tukey HSD.' },

        { type: 'mistake',
          title: 'Mistake 4 — Reporting F without both degrees of freedom',
          body: 'You write "F = 14.8, p < .001" without specifying that df_between = 2 and df_within = 114. The reader cannot reconstruct the sample size or assess the test.',
          fix: 'Always report F(df_between, df_within), e.g. F(2, 114) = 14.8. Both dfs are essential.' },

        { type: 'mistake',
          title: 'Mistake 5 — Omitting effect size',
          body: 'Your ANOVA is significant with p < .001 and you report only "ANOVA was significant". With a large sample, even tiny mean differences become significant; the reader cannot tell whether the effect is large or trivial.',
          fix: 'Always compute and report **η²** alongside F. Use the benchmarks: .01 small, .06 medium, .14 large. A significant ANOVA with η² = .02 is statistically real but practically tiny.' },
      ],
    },

    /* ════════════════════ 12. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'One-way ANOVA compares means across 3+ independent groups using a single overall F-test.',
          'It avoids the multiple-comparisons problem of running several t-tests — the cumulative false-positive rate stays at .05.',
          'F = between-group variance ÷ within-group variance. Large F = real group differences.',
          'Assumptions: continuous outcome, categorical factor with 3+ independent groups, approximate normality within groups, homogeneity of variance.',
          'Always check Levene\'s test FIRST. Non-significant (p > .05) = use standard F + Tukey. Significant (p < .05) = use Welch F + Games-Howell.',
          'Run via Analyze → Compare Means → One-Way ANOVA → tick Post Hoc (Tukey + Games-Howell) and Options (Descriptive, Homogeneity, Means plot).',
          'A significant F tells you SOMETHING differs; post-hoc tests (Lesson 2) tell you WHICH pairs differ.',
          'Always report F(df_between, df_within) and the effect size η² (small .01, medium .06, large .14).',
          'Avoid the five mistakes: multiple t-tests, no post-hoc, ignoring Levene\'s, omitting df, omitting η².',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 2: Post-hoc tests** we dive into the follow-up tests that tell you WHICH specific groups differ after a significant ANOVA. You\'ll learn the difference between Tukey HSD, Bonferroni, Games-Howell, and LSD — and which to use when.' },

        { type: 'paragraph', text:
          'Before moving on, find a categorical variable in your dataset with 3+ levels and a continuous outcome. Run one-way ANOVA with all the right options ticked. Check Levene\'s, then the F, then compute η². Write the APA paragraph. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 13. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'You want to compare exam scores across three teaching methods (A, B, C). Why not just run three t-tests?',
          choices: [
            'T-tests give the same answer',
            'Multiple t-tests inflate the cumulative Type I error rate — running 3 tests at α = .05 produces a ~14% false-positive risk. ANOVA controls this with one overall test.',
            'T-tests are slower',
            'SPSS does not allow multiple t-tests',
          ],
          answer: 1,
          explanation: 'The cumulative false-positive rate compounds with each test. Three t-tests at α = .05 produces ~14% chance of at least one false positive. ANOVA runs one overall F-test that controls error at .05, and IF significant, follow-up post-hoc tests are adjusted to maintain the .05 family-wise rate. Always prefer ANOVA + post-hoc over multiple t-tests for 3+ groups.' },

        { type: 'check',
          question: 'Your Levene\'s test shows p = .03 (significant). What should you do?',
          choices: [
            'Use the standard ANOVA F-test and Tukey HSD',
            'Use the Welch-corrected F-test (in Robust Tests of Equality of Means) and Games-Howell post-hoc — the homogeneity assumption is violated',
            'Re-run the analysis',
            'Drop one of the groups',
          ],
          answer: 1,
          explanation: 'Significant Levene\'s (p < .05) means variances differ across groups — homogeneity is violated. Switch to the WELCH F (which does not assume equal variances) reported in the "Robust Tests of Equality of Means" table, and use **Games-Howell** for post-hoc instead of Tukey HSD. Reading the standard F when Levene\'s is significant gives biased results.' },

        { type: 'check',
          question: 'Your one-way ANOVA shows F(2, 114) = 14.8, p < .001. What can you conclude?',
          choices: [
            'All three groups differ significantly from each other',
            'At least ONE group mean differs significantly from at least one other — but post-hoc tests are needed to identify WHICH pairs differ',
            'No groups differ',
            'The first group has the highest mean',
          ],
          answer: 1,
          explanation: 'A significant overall F tells you SOMETHING differs, not which specific pairs. With three groups, several pairwise scenarios are possible (A differs from both B and C, but B = C; or A = B but both differ from C; etc.). Post-hoc tests (Lesson 2) provide the pair-by-pair p-values that identify which differences are statistically significant.' },

        { type: 'check',
          question: 'What does η² = .21 mean for your ANOVA?',
          choices: [
            '21% of cases are in the largest group',
            '21% of total variance in the outcome is accounted for by group membership — a LARGE effect (above the .14 large-effect benchmark)',
            'The model is wrong',
            'You need more groups',
          ],
          answer: 1,
          explanation: 'Eta squared is the proportion of total variance explained by the factor (group membership). η² = .21 means the grouping variable accounts for 21% of variance in the outcome. Cohen\'s benchmarks: .01 small, .06 medium, .14 large. .21 is solidly in the large range — a substantively meaningful effect, not just statistically significant.' },

        { type: 'check',
          question: 'When reporting your F-statistic, why must you include BOTH degrees of freedom (e.g. F(2, 114) = 14.8)?',
          choices: [
            'It is a stylistic preference',
            'The two dfs (df_between = k − 1 and df_within = N − k) let the reader reconstruct the number of groups and the sample size, and verify the F-test',
            'SPSS requires it',
            'It makes the report longer',
          ],
          answer: 1,
          explanation: 'F(2, 114) instantly tells the reader: df_between = 2 means 3 groups (k − 1); df_within = 114 means total N = 117 (N − k). Without both dfs the test cannot be reconstructed and the report is incomplete. Always write F(df_between, df_within) = F-value.' },

        { type: 'check',
          question: 'Which sentence is the most professional ANOVA report?',
          choices: [
            '"ANOVA was significant."',
            '"F was 14.8."',
            '"A one-way ANOVA showed teaching methods differed significantly in mathematics scores, F(2, 114) = 14.8, p < .001, η² = .21. Levene\'s test confirmed homogeneity of variance was met, p = .67."',
            '"There was a difference."',
          ],
          answer: 2,
          explanation: 'Option C hits all the elements examiners look for: names the test, identifies what was compared, reports F with both dfs, p-value, η² for effect size, and notes the Levene\'s assumption check. The other options are either vague or missing critical components.' },
      ],
    },
  ],
};
