/**
 * Master Decision Tree · Lesson 1 — Choosing your test in 60 seconds
 * The teaching companion to the Statistical Test Selector module.
 *
 * UNLOCK RULE: This lesson is FREE for any student who has unlocked at least
 * one lesson in the "SPSS Basics" course. See SpssAcademy.jsx → hasFormat().
 */

export const MASTER_DECISION_TREE_LESSON = {
  id: 'master-1',
  title: 'The Master Decision Tree — choosing your test in 60 seconds',
  subtitle: 'Module 03 · Course: Master Decision Tree · Lesson 1 of 1',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'The one question every postgrad student asks',
      blocks: [
        { type: 'scene', body: [
          'You sit down in front of SPSS with your dataset open and the Analyze menu staring back at you. There are eight top-level menus, dozens of sub-menus, and hundreds of statistical tests buried inside. Your data is fine. Your research questions are fine. But there is one terrifying step in the middle: **which test do I actually run?**',
          'You ask your supervisor. They say "it depends." You ask Google. You get 47 different answers. You watch three YouTube videos and end up more confused than when you started. You finally pick a test that sounds clever, run it, paste the output into Chapter 4, and pray your examiner doesn\'t notice.',
          'This is the single biggest source of anxiety in Kenyan postgraduate research, and it doesn\'t need to be. The truth is that 95% of all postgraduate analyses fit into about a dozen standard tests, and choosing between them follows a simple four-question logic that you can learn in this one lesson. By the end of this lesson, you will be able to walk into any analysis with confidence — point to your variables, answer four short questions, and arrive at the correct test in under a minute.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Look at any dataset** and instantly identify the type of each variable (continuous, categorical, ordinal, binary).',
            '**Translate any research question** into the four diagnostic questions that pick the test.',
            '**Navigate the Master Decision Tree** for the 12 most common tests in postgrad research.',
            '**Know the parametric/non-parametric pairs** — every test has a backup if assumptions fail.',
            '**Cross-link to the right lesson** in the SPSS Academy for the test you land on.',
            '**Use the Test Selector module** confidently as a quick reference tool when working on your thesis.',
            '**Defend your choice of test** in front of an examiner — \"I chose this test because…\" in one sentence.',
          ]},

        { type: 'why', body:
          'Choosing the wrong test is the single most common reason Master\'s and PhD theses are sent back for revision. Examiners will forgive imperfect interpretation, weak discussion, even a small assumption violation — they will NOT forgive a fundamental mismatch between the question and the test. Master this lesson and you eliminate the deepest source of analysis anxiety in your entire degree.' },
      ],
    },

    /* ════════════════════ 2. THE FOUR QUESTIONS ════════════════════ */
    {
      id: 'four-questions',
      title: 'The four diagnostic questions',
      blocks: [
        { type: 'heading', level: 2, text: 'Everything reduces to four questions' },

        { type: 'paragraph', text:
          'No matter how complicated your research question sounds in English, picking the right test reduces to answering four short diagnostic questions about your variables. Learn these four questions once and the entire SPSS Analyze menu becomes navigable.' },

        { type: 'steps', steps: [
          { title: 'Q1. What is the TYPE of your OUTCOME variable?',
            body: 'The outcome (dependent variable, Y, "the thing you\'re trying to predict or explain") is either **continuous** (height, score, income, time), **ordinal** (rank, Likert when treated rigorously), **binary** (pass/fail, yes/no), or **categorical with 3+ levels** (county group, education category). This single answer cuts the menu by 80%.' },
          { title: 'Q2. How many GROUPS or PREDICTORS are involved?',
            body: 'Are you comparing **one sample** to a benchmark? **Two groups** to each other? **Three or more groups**? Or are you using **continuous predictors** to predict an outcome (regression territory)? This answer narrows the family of tests further.' },
          { title: 'Q3. Are the groups INDEPENDENT or PAIRED/REPEATED?',
            body: '**Independent** means each participant is in ONE group only — male vs female, treatment vs control, urban vs rural. **Paired/repeated** means the same participants appear in BOTH (or all) conditions — before vs after, time 1 vs time 2 vs time 3, or matched pairs. Independent and paired versions of the same test give DIFFERENT answers; getting this wrong is the #1 t-test error.' },
          { title: 'Q4. Are the parametric ASSUMPTIONS met?',
            body: 'Mainly **normality** of the outcome and **homogeneity of variance**. If yes → use the parametric test (t-test, ANOVA, Pearson, regression). If badly violated AND your sample is small → use the **non-parametric equivalent** (Mann-Whitney, Wilcoxon, Kruskal-Wallis, Spearman). Every parametric test has a non-parametric backup.' },
        ]},

        { type: 'callout', tone: 'gold', title: 'The order matters',
          body: 'Always answer the questions in this order: outcome TYPE first, then NUMBER of groups, then INDEPENDENCE, then ASSUMPTIONS. Beginners often start with assumptions ("is my data normal?") and get confused. Assumptions are the LAST question, not the first — they only tell you whether to use the parametric version or its non-parametric backup of a test you have ALREADY chosen.' },
      ],
    },

    /* ════════════════════ 3. KNOW YOUR VARIABLE TYPES ════════════════════ */
    {
      id: 'variable-types',
      title: 'Step 0 — Knowing your variable types',
      blocks: [
        { type: 'heading', level: 2, text: 'Before the tree, classify every variable' },

        { type: 'paragraph', text:
          'Q1 of the Master Decision Tree asks "what is your outcome?" — but you can\'t answer that until you can correctly classify any variable in your dataset. Open your dataset in SPSS, go to Variable View, and check the Measure column for each variable. Then sanity-check against the table below.' },

        { type: 'comparison',
          headers: ['Type', 'What it means', 'Real Kenyan examples', 'SPSS \"Measure\"'],
          rows: [
            ['**Continuous (Scale)**', 'Numbers on a true scale — meaningful gaps, can have decimals.', 'Age in years, weight in kg, exam score 0-100, income in KES, BP reading, time in minutes.', 'Scale'],
            ['**Ordinal**',            'Ordered categories — order matters but the gap between them does not.', 'Education (Primary/Secondary/Tertiary/Postgrad), poverty band (Lowest 20% / Lower 20% / …), Likert items (1-5).', 'Ordinal'],
            ['**Binary**',             'Exactly two unordered categories.',                  'Gender (M/F), employed (Y/N), pass/fail KCSE, urban/rural, owns smartphone (Y/N).',    'Nominal (2 values)'],
            ['**Categorical (3+ levels)**', 'Unordered categories with 3 or more values.',  'County of residence, language of instruction, religion, marital status, teaching method (A/B/C).', 'Nominal'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Likert items — the perpetual battleground',
          body: 'A single Likert item ("Strongly disagree" to "Strongly agree", coded 1-5) is technically **ordinal**. A composite Likert SCALE (the average of 10 such items) is widely treated as **continuous** by convention. For single items, prefer non-parametric tests (Spearman, Mann-Whitney, Kruskal-Wallis). For composite scale scores with α > .70, treat as continuous and use Pearson/t-test/ANOVA/regression. Defend this clearly in your methods chapter.' },

        { type: 'reveal',
          prompt: 'A respondent\'s county (Nairobi, Kisumu, Mombasa, Eldoret, Nakuru) — what type of variable is this?',
          answer: '**Categorical with 4+ levels (nominal).** The categories have no meaningful order — Nairobi is not "higher" or "lower" than Mombasa, and the gap between Kisumu and Eldoret has no numeric meaning. SPSS Measure = Nominal. When county is your OUTCOME, the only test you can run is chi-square (or multinomial logistic regression with predictors). When county is a PREDICTOR with multiple levels, it leads you into ANOVA territory.' },
      ],
    },

    /* ════════════════════ 4. THE MASTER DECISION TREE ════════════════════ */
    {
      id: 'the-tree',
      title: 'The Master Decision Tree itself',
      blocks: [
        { type: 'heading', level: 2, text: 'One picture, twelve tests' },

        { type: 'illustration', component: 'MasterDecisionTree',
          caption: 'Figure 1. The Master Decision Tree. Start at the top with your OUTCOME variable type. Each branch asks one question. Within four questions you reach the correct test. Every test on the tree has a dedicated lesson elsewhere in this SPSS Academy — go to that lesson once you\'ve landed on it.' },

        { type: 'paragraph', text:
          'The tree above looks busy, but it is just the four questions in visual form. Use it like a flowchart: read your way down from the top, answering each question with what your data actually IS, and the test you should run will be at the leaf node. If the parametric test fails its assumptions, switch to the corresponding non-parametric box on the right.' },

        { type: 'callout', tone: 'gold', title: 'Print this tree and tape it above your laptop',
          body: 'Seriously. Until the four-question logic becomes second nature (it will, after about three theses\' worth of analyses), keep the tree visible. Every time you reach for a test, walk down the tree first. Within a few weeks the walk happens in your head and you no longer need the printout.' },
      ],
    },

    /* ════════════════════ 5. THE 12 STANDARD TESTS ════════════════════ */
    {
      id: 'standard-tests',
      title: 'The 12 tests that cover 95% of postgrad research',
      blocks: [
        { type: 'heading', level: 2, text: 'Continuous outcome' },

        { type: 'comparison',
          headers: ['You want to…', 'Predictor / group structure', 'Parametric test', 'Non-parametric backup'],
          rows: [
            ['Compare your sample mean to a benchmark', '1 sample vs. a constant',     '**One-sample t-test** (ttest-3)',         'Wilcoxon signed-rank (vs. median)'],
            ['Compare TWO independent groups',          '2 independent groups',         '**Independent-samples t-test** (ttest-1)','Mann-Whitney U'],
            ['Compare TWO related conditions',          '2 paired / before-after',      '**Paired-samples t-test** (ttest-2)',     'Wilcoxon signed-rank'],
            ['Compare 3+ independent groups',           '3+ independent groups',        '**One-way ANOVA** (anova-1)',             'Kruskal-Wallis'],
            ['Compare 3+ repeated conditions',          '3+ measurements on same people','**Repeated-measures ANOVA** (anova-4)',   'Friedman test'],
            ['Compare on TWO factors at once',          '2 factors (e.g. method × gender)','**Two-way ANOVA** (anova-3)',           '(none — split your data)'],
            ['Compare groups while adjusting for a covariate', '1 factor + 1 continuous covariate', '**ANCOVA** (advanova-1)',          '(transform / robust ANCOVA)'],
            ['Compare groups on MULTIPLE related outcomes',    '1 factor + 2+ related outcomes',     '**MANOVA** (advanova-2)',          '(separate Mann-Whitneys + Bonferroni)'],
            ['Compare groups × time on the same participants', '1 between + 1 within (repeated)',    '**Mixed ANOVA** (advanova-3)',     '(linear mixed-effects model)'],
            ['Measure linear association',              '2 continuous variables',       '**Pearson correlation** (cor-1)',         'Spearman rank correlation (cor-2)'],
            ['Predict an outcome from ONE predictor',   '1 continuous predictor',       '**Simple linear regression** (reg-1)',    '(transform / Spearman)'],
            ['Predict an outcome from MULTIPLE predictors','Several predictors',        '**Multiple regression** (reg-2)',         '(transform / robust regression)'],
            ['Predict from THEORY-DRIVEN BLOCKS of predictors', 'Block 1 → Block 2 → Block 3', '**Hierarchical regression** (advreg-1)', '(same fallback as multiple)'],
          ]},

        { type: 'heading', level: 2, text: 'Binary or categorical outcome' },

        { type: 'comparison',
          headers: ['You want to…', 'Predictor / group structure', 'Test'],
          rows: [
            ['Test if two categorical variables are related', 'Categorical × categorical', '**Chi-square test of independence** (chi-1)'],
            ['Test if observed counts match expected proportions', '1 categorical variable', '**Chi-square goodness-of-fit** (chi-1)'],
            ['Predict a binary outcome (yes/no)',            'Several predictors → binary Y', '**Binary logistic regression** (reg-4)'],
            ['Predict a 3+ UNORDERED category outcome',     'Predictors → unordered Y',       '**Multinomial logistic regression** (advreg-2)'],
            ['Predict a 3+ ORDERED category outcome',       'Predictors → ordered Y',         '**Ordinal logistic regression** (advreg-2)'],
          ]},

        { type: 'heading', level: 2, text: 'Scale validation' },

        { type: 'comparison',
          headers: ['You want to…', 'Test'],
          rows: [
            ['Test internal consistency of a multi-item scale', '**Cronbach\'s alpha** (rel-1)'],
            ['Identify weak items in a scale',                  '**Item-total statistics** (rel-2)'],
            ['Use an alternative reliability check',            '**Split-half reliability** (rel-3)'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Every test on the tree → its own SPSS Academy lesson',
          body: 'Lesson IDs in brackets (e.g. ttest-1) are the SPSS Academy lessons that walk you through that test in full Pearson depth — scene, SPSS click path, output reading, worked example, APA write-up, common mistakes, and a knowledge check. Land on a test using this tree, then open the corresponding lesson to actually run it.' },
      ],
    },

    /* ════════════════════ 6. WORKED EXAMPLE 1 — t-TEST ════════════════════ */
    {
      id: 'example-ttest',
      title: 'Worked example 1 — picking between an independent and paired t-test',
      blocks: [
        { type: 'workedExample', title: 'A common Master\'s scenario',
          body: [
            { label: 'The research question',
              text: '"Does the financial literacy programme at Gikomba improve record-keeping scores among micro-entrepreneurs?"' },
            { label: 'Step 1 — Identify the OUTCOME and its type',
              text: 'Outcome = record-keeping score (0-50). **Continuous** (Scale). → Top branch of the tree.' },
            { label: 'Step 2 — Identify the predictor / groups',
              text: 'We are comparing scores BEFORE the programme to scores AFTER the programme. → TWO conditions.' },
            { label: 'Step 3 — Independent or paired?',
              text: 'The SAME 28 entrepreneurs are measured at both time points. → **Paired**. (If we had compared 28 trained entrepreneurs to 28 different untrained entrepreneurs, that would have been independent.)' },
            { label: 'Step 4 — Assumptions',
              text: 'Compute the difference scores (after − before). Run Shapiro-Wilk on the differences. If p > .05, normality is met → paired-samples t-test. If badly violated → Wilcoxon signed-rank.' },
            { label: 'Final answer',
              text: '**Paired-samples t-test** (lesson `ttest-2`). One-sentence defence to an examiner: *"I used a paired-samples t-test because the same 28 participants were measured before and after the programme, producing dependent observations on a continuous outcome."*' },
          ]},
      ],
    },

    /* ════════════════════ 7. WORKED EXAMPLE 2 — ANOVA vs REGRESSION ════════════════════ */
    {
      id: 'example-anova',
      title: 'Worked example 2 — ANOVA or regression?',
      blocks: [
        { type: 'workedExample', title: 'A typical PhD-level confusion',
          body: [
            { label: 'The research question',
              text: '"Does household income predict food security among urban poor households in Mathare?"' },
            { label: 'Step 1 — Outcome type',
              text: 'Outcome = food-security index (continuous, 0-100). → Continuous branch.' },
            { label: 'Step 2 — Predictor type',
              text: 'Income is **continuous** (KES per month). → This is the giveaway: when the predictor is CONTINUOUS rather than a small number of GROUPS, you are in **regression** territory, not ANOVA territory.' },
            { label: 'Step 3 — How many predictors?',
              text: 'Just one (income). → **Simple linear regression** (lesson `reg-1`). If you added age, education, household size as additional predictors → multiple regression (`reg-2`).' },
            { label: 'Common wrong turn',
              text: 'Beginners sometimes split income into three groups (low / medium / high) and run a one-way ANOVA. This loses information — you go from a fine-grained continuous predictor to three crude buckets, and your statistical power drops sharply. Only categorise continuous predictors if there is a strong substantive reason (e.g. official poverty bands defined by KNBS).' },
            { label: 'Final answer',
              text: '**Simple linear regression** with food security as Y and income as the continuous X. Defence: *"Because the predictor (income) is measured on a continuous scale, regression preserves all the variation in the predictor and yields a more powerful test than collapsing income into categories for an ANOVA."*' },
          ]},
      ],
    },

    /* ════════════════════ 8. WORKED EXAMPLE 3 — CHI-SQUARE ════════════════════ */
    {
      id: 'example-chisq',
      title: 'Worked example 3 — when both variables are categorical',
      blocks: [
        { type: 'workedExample', title: 'A KDHS-style cross-tab question',
          body: [
            { label: 'The research question',
              text: '"Is there an association between county of residence (Nairobi / Kisumu / Mombasa) and contraceptive method use (modern / traditional / none)?"' },
            { label: 'Step 1 — Outcome type',
              text: 'Outcome = contraceptive method (3 unordered categories). → **Categorical**. NOT continuous, so the top branch of the tree shuts down — no t-tests, no ANOVA, no regression.' },
            { label: 'Step 2 — Predictor type',
              text: 'Predictor = county (3 unordered categories). → Also categorical.' },
            { label: 'Step 3 — Walk the categorical branch',
              text: 'Categorical outcome × categorical predictor → **Chi-square test of independence**. (Goodness-of-fit is for ONE categorical variable tested against expected proportions; independence is for TWO categorical variables tested for association.)' },
            { label: 'Step 4 — Sample-size check',
              text: 'If any expected cell count drops below 5 (common with small samples or rare categories), switch to **Fisher\'s Exact Test**. SPSS gives you both in the Crosstabs output.' },
            { label: 'Final answer',
              text: '**Chi-square test of independence**, run via Analyze → Descriptive Statistics → Crosstabs → Statistics → tick Chi-square. Report χ², df, p, and Cramer\'s V for effect size. (Chi-square lesson is being added next — for now, see the Statistical Test Selector module for a guided unlock.)' },
          ]},
      ],
    },

    /* ════════════════════ 9. PARAMETRIC vs NON-PARAMETRIC ════════════════════ */
    {
      id: 'parametric',
      title: 'When to switch to a non-parametric test',
      blocks: [
        { type: 'heading', level: 2, text: 'Every parametric test has a non-parametric twin' },

        { type: 'paragraph', text:
          'Parametric tests (t-tests, ANOVA, Pearson, regression) assume your outcome is approximately normally distributed. When that assumption is badly violated — especially with small samples — switch to the non-parametric equivalent. Non-parametric tests work on RANKS rather than raw values, so they care about the order of your data points, not their exact magnitudes.' },

        { type: 'comparison',
          headers: ['If your parametric test would have been…', '…and assumptions fail badly, use:'],
          rows: [
            ['One-sample t-test',           'Wilcoxon signed-rank test (against a hypothesised median)'],
            ['Independent-samples t-test',  '**Mann-Whitney U** test'],
            ['Paired-samples t-test',       '**Wilcoxon signed-rank** test'],
            ['One-way ANOVA',               '**Kruskal-Wallis** test'],
            ['Repeated-measures ANOVA',     '**Friedman** test'],
            ['Pearson correlation',         '**Spearman** rank correlation (cor-2)'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Sample size matters more than perfection',
          body: 'Parametric tests are robust to mild non-normality when your sample is reasonably large (rule of thumb: n ≥ 30 per group). Don\'t panic-switch to non-parametric just because Shapiro-Wilk came up p = .04 with n = 200 — at that sample size the parametric test is fine. Switch when n is small AND the violation is severe (heavy skew, obvious outliers, bimodality).' },
      ],
    },

    /* ════════════════════ 10. THE TEST SELECTOR MODULE ════════════════════ */
    {
      id: 'test-selector',
      title: 'Using the platform\'s Test Selector module',
      blocks: [
        { type: 'heading', level: 2, text: 'Your shortcut once the logic clicks' },

        { type: 'paragraph', text:
          'The Postgraduate Data Hub includes a built-in **Statistical Test Selector** module (in the left sidebar, under Module 2). It is a guided four-question engine that asks exactly the questions you just learned, and returns the recommended test. Use this lesson to understand WHY it asks each question, and the Test Selector itself when you just need a quick answer mid-analysis.' },

        { type: 'callout', tone: 'gold', title: 'How the Test Selector and this lesson work together',
          body: 'This **lesson** teaches the underlying logic so you can defend your choice to an examiner. The **Test Selector module** is a productivity tool for after you understand the logic. We strongly recommend reading this lesson FIRST, then unlocking the specific test you need in the Test Selector to access the deeper recommendation (including SPSS click path, sample size guidance, and report templates). Together they cover both understanding and execution.' },

        { type: 'reveal',
          prompt: 'Your examiner asks "why did you use a Mann-Whitney U test instead of an independent-samples t-test?" What\'s a one-sentence defence?',
          answer: '*"I chose Mann-Whitney U because my outcome variable was severely right-skewed (Shapiro-Wilk p < .001) and my sample size was small (n = 18 per group), so the parametric t-test\'s normality assumption was not met; Mann-Whitney U is the non-parametric equivalent that ranks the values rather than using their raw magnitudes, and is the appropriate test in this scenario."* — that\'s the kind of clean, two-clause defence the four-question logic equips you to give for any test on the tree.' },
      ],
    },

    /* ════════════════════ 11. MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five test-selection mistakes that sink theses',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Picking a test because "everyone uses it"',
          body: 'You see other students using regression and decide to run regression too, even though your outcome is binary (yes/no). Logistic regression would have been correct; linear regression is mathematically inappropriate for binary outcomes and your examiner will see it immediately.',
          fix: 'Always start from YOUR variables, not from what other people did. Walk the four questions on YOUR dataset. The right test depends on YOUR data, not on convention.' },

        { type: 'mistake',
          title: 'Mistake 2 — Running an independent t-test on paired data',
          body: 'You measured the same 30 patients before and after a 6-week treatment and ran an independent-samples t-test. The test assumes independence; your data is paired. The p-value is wrong, the effect size is wrong, and you\'ve thrown away half your statistical power.',
          fix: 'Q3 of the four questions: same people in both conditions? → Paired test. Different people in each condition? → Independent test. This is the single most common t-test error.' },

        { type: 'mistake',
          title: 'Mistake 3 — Running multiple t-tests instead of ANOVA',
          body: 'You have three teaching methods (A, B, C) and you run three separate independent t-tests (A vs B, A vs C, B vs C). Cumulative false-positive rate rises to about 14%, not 5%. Examiner spots it instantly.',
          fix: 'For 3+ independent groups, run **one-way ANOVA** (anova-1) for the overall test, then post-hoc tests (anova-2) for specific pairs. The two-step ANOVA + post-hoc workflow controls family-wise error at .05.' },

        { type: 'mistake',
          title: 'Mistake 4 — Categorising a continuous predictor for no reason',
          body: 'Your predictor is income (continuous, KES). You split it into three buckets and run ANOVA. You\'ve thrown away most of the variation in income and reduced your statistical power dramatically.',
          fix: 'Keep continuous predictors continuous. Use **regression** (simple or multiple) when at least one predictor is continuous. Only categorise when there\'s a strong substantive justification (official poverty bands, clinical cut-points, etc.).' },

        { type: 'mistake',
          title: 'Mistake 5 — Skipping assumption checks',
          body: 'You run a t-test, get p = .01, and report it without checking normality, equal variances, or sample size. The examiner asks "did you check Levene\'s?" You don\'t know what Levene\'s is. You fail the defence.',
          fix: 'Assumption checking is Q4 of the four questions — it is part of the test selection process, not an afterthought. Every parametric test has assumptions. Every assumption has a specific check (Shapiro-Wilk, Levene\'s, Mauchly\'s, VIF, residual plots). Know them for the test you choose, and report them.' },
      ],
    },

    /* ════════════════════ 12. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          '95% of postgraduate analyses fit a dozen standard tests; choosing among them reduces to four questions.',
          'Q1 — TYPE of outcome: continuous, ordinal, binary, categorical.',
          'Q2 — Number of GROUPS or PREDICTORS: 1 sample, 2, 3+, or continuous-predictor (regression).',
          'Q3 — Independence: are the same participants in multiple conditions (paired) or different people in each (independent)?',
          'Q4 — Parametric ASSUMPTIONS: if normality/equal-variance hold, use the parametric test; if not, use the non-parametric backup.',
          'Walk the four questions in order. Outcome type FIRST, assumptions LAST.',
          'Every parametric test has a non-parametric twin (Mann-Whitney, Wilcoxon, Kruskal-Wallis, Friedman, Spearman).',
          'Use the **Statistical Test Selector** module in the sidebar as a quick reference once you understand the logic.',
          'Always be ready to defend your choice in one sentence: "I chose X because my outcome is Y, my groups are Z, and assumptions [held / were violated, so I used the non-parametric W]."',
          'Land on a test using this tree → open its dedicated SPSS Academy lesson to actually run it.',
        ]},

        { type: 'callout', tone: 'gold', title: 'This lesson is FREE for SPSS Basics students',
          body: 'Because navigating the test menu is essential to using SPSS at all, this Master Decision Tree lesson is unlocked automatically once you own ANY of the SPSS Basics notes packs (basics-1 through basics-5). You do not need to pay a separate notes-pack fee for this lesson — it is included with the Basics. The dedicated test lessons (ttest-1, anova-1, reg-1, etc.) remain individually unlockable.' },

        { type: 'paragraph', text:
          'Before moving on, take your own thesis dataset and pick three research questions from your proposal. Walk each one through the four questions on your own. Write down the test you land on for each. Then open the corresponding SPSS Academy lesson to actually run it. Come back to the knowledge check below to confirm you\'ve internalised the logic.' },
      ],
    },

    /* ════════════════════ 13. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'You want to compare exam scores between two teaching methods (Method A: 25 pupils, Method B: 25 different pupils). Which test?',
          choices: [
            'Paired-samples t-test',
            'Independent-samples t-test — two DIFFERENT groups of pupils, continuous outcome',
            'One-way ANOVA',
            'Chi-square test',
          ],
          answer: 1,
          explanation: 'Q1 outcome = continuous (exam score). Q2 = two groups. Q3 = INDEPENDENT (different pupils in each method, no pairing). → Independent-samples t-test. ANOVA is for 3+ groups; the paired t-test would need the same pupils in both methods.' },

        { type: 'check',
          question: 'You want to predict income (continuous, KES) from years of education (continuous). Which test?',
          choices: [
            'One-way ANOVA',
            'Independent-samples t-test',
            'Simple linear regression — continuous outcome predicted by a continuous predictor',
            'Chi-square test',
          ],
          answer: 2,
          explanation: 'When the predictor is CONTINUOUS rather than a small number of groups, you are in regression territory, not ANOVA. Q1 outcome = continuous (income). Predictor = continuous (years of education). Number of predictors = 1. → Simple linear regression (reg-1). Splitting education into "Primary / Secondary / Tertiary" and running ANOVA would throw away most of the variation in education and reduce power.' },

        { type: 'check',
          question: 'You ask 100 respondents BOTH "do you own a smartphone?" (Y/N) AND "do you have a bank account?" (Y/N). You want to test whether smartphone ownership is associated with bank account ownership. Which test?',
          choices: [
            'Independent-samples t-test',
            'Pearson correlation',
            'Chi-square test of independence — two binary/categorical variables, testing association',
            'One-sample t-test',
          ],
          answer: 2,
          explanation: 'Both variables are categorical (binary in this case). When BOTH the outcome and the predictor are categorical, the appropriate test is chi-square test of independence. Pearson is for two continuous variables; t-tests require a continuous outcome.' },

        { type: 'check',
          question: 'Your outcome variable is severely right-skewed (Shapiro-Wilk p < .001) and your sample is only n = 12 per group. You\'d planned an independent-samples t-test. What should you do?',
          choices: [
            'Run the t-test anyway and ignore the assumption violation',
            'Use the Mann-Whitney U test — the non-parametric equivalent of the independent t-test',
            'Use Pearson correlation',
            'Stop the analysis',
          ],
          answer: 1,
          explanation: 'With a small sample (n = 12 per group) AND a severe normality violation, the parametric t-test is risky — its p-value may be biased. Mann-Whitney U is the non-parametric equivalent: it works on ranks rather than raw values and does not require normality. With n = 200 per group the same Shapiro-Wilk result would not have mattered (parametric tests are robust to mild non-normality at large n).' },

        { type: 'check',
          question: 'In what order should you answer the four diagnostic questions?',
          choices: [
            'Assumptions first, then outcome type',
            'Outcome TYPE → number of groups → independence → assumptions',
            'It doesn\'t matter',
            'Predictor type first, then outcome type',
          ],
          answer: 1,
          explanation: 'Always: outcome TYPE first (cuts the menu by 80%), then number of GROUPS, then INDEPENDENCE, then ASSUMPTIONS last. Assumptions only tell you whether to use the parametric version or its non-parametric backup of a test you have ALREADY chosen — they are the final filter, not the starting point.' },

        { type: 'check',
          question: 'You compare scores from the same 30 patients across THREE time points (baseline, 3 months, 6 months). Which test?',
          choices: [
            'Three separate paired t-tests',
            'One-way ANOVA',
            'Repeated-measures ANOVA — 3+ measurements on the same participants',
            'Chi-square test',
          ],
          answer: 2,
          explanation: 'Q1 outcome = continuous. Q2 = three conditions. Q3 = PAIRED (same patients across all three time points). → Repeated-measures ANOVA (anova-4). Three separate paired t-tests would inflate the cumulative Type I error rate above .05. One-way ANOVA would wrongly treat the three time points as independent groups.' },
      ],
    },
  ],
};
