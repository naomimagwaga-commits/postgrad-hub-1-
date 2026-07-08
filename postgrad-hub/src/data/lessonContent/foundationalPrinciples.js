/**
 * SPSS Basics · Foundational Principles
 * Understanding variables, measurement, and how to think about statistics
 * Priority 1: Understanding variables and measurement
 */

export const FOUNDATIONAL_PRINCIPLES_LESSON = {
  id: 'foundational-principles',
  title: 'Foundational Principles — Think Like a Researcher',
  subtitle: 'Module 01 · Course: SPSS Basics · Prerequisite for ALL lessons',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'Before you run any test, understand your variables',
      blocks: [
        { type: 'scene', body: [
          'You\'ve collected data for your thesis. You have 200 respondents, 15 variables, and a research question. You open SPSS and think: "Now what?"',
          'Most students jump straight to "which test do I run?" But that\'s the WRONG question to ask first. The right sequence is:',
          '**1. What type of variables do I have?** (categorical? continuous? ordinal?)',
          '**2. What am I trying to find out?** (compare groups? find relationships? predict outcomes?)',
          '**3. Which test matches my variable types AND my research question?**',
          'This lesson teaches you Priority 1: understanding your variables so deeply that choosing the right test becomes obvious.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Why this lesson exists',
          body: [
            'Every statistical test has ASSUMPTIONS about what type of data it works with.',
            'If you put categorical data into a test that expects continuous data, your results are INVALID.',
            'This lesson teaches you to identify variable types INSTANTLY — so you never make that mistake.',
          ]},
      ],
    },

    /* ════════════════════ 2. VARIABLE TYPES ════════════════════ */
    {
      id: 'variable-types',
      title: 'The 3 types of variables (and why they matter)',
      blocks: [
        { type: 'heading', level: 2, text: 'Every variable in your dataset is one of these three types' },

        { type: 'definition', term: 'Categorical Variable (Nominal)',
          body: 'Categories with NO natural order. You can COUNT them but you CANNOT average them.' },

        { type: 'examples', title: 'Examples of categorical variables',
          body: [
            '• **Gender** (Male / Female / Other)',
            '• **Fertilizer type** (DAP / CAN / Organic) — Kiambu dataset',
            '• **Vaccine acceptance** (Yes / No) — Nyandarua dataset',
            '• **School type** (Public / Private) — Machakos dataset',
          ]},

        { type: 'callout', tone: 'warning', title: 'What you CAN and CANNOT do with categorical variables',
          body: [
            '✅ **CAN**: Count frequencies (how many males? how many said "Yes"?)',
            '✅ **CAN**: Calculate percentages (19.7% were teachers)',
            '❌ **CANNOT**: Calculate a mean (what\'s the "average" gender?)',
            '❌ **CANNOT**: Run a t-test or ANOVA (these require continuous outcomes)',
          ]},

        { type: 'definition', term: 'Ordinal Variable',
          body: 'Categories with a NATURAL ORDER, but the gaps between categories are NOT necessarily equal.' },

        { type: 'examples', title: 'Examples of ordinal variables',
          body: [
            '• **Likert scales** (1 = Strongly Disagree → 5 = Strongly Agree)',
            '• **Education level** (Primary < Secondary < Diploma < Degree < Postgrad) — Nyandarua dataset',
            '• **Satisfaction ratings** (1 = Very dissatisfied → 5 = Very satisfied) — Mombasa dataset',
            '• **Pain level** (None / Mild / Moderate / Severe)',
          ]},

        { type: 'callout', tone: 'warning', title: 'What you CAN and CANNOT do with ordinal variables',
          body: [
            '✅ **CAN**: Rank them (we know 5 > 4 > 3 > 2 > 1)',
            '✅ **CAN**: Calculate medians (the middle value)',
            '⚠️ **MAYBE**: Calculate means (debatable — some statisticians say no, others say yes for Likert scales)',
            '❌ **CANNOT**: Use parametric tests that assume equal intervals (use non-parametric tests instead)',
          ]},

        { type: 'definition', term: 'Continuous Variable (Scale)',
          body: 'Real numbers where the gaps between values ARE meaningful and equal. You can average them.' },

        { type: 'examples', title: 'Examples of continuous variables',
          body: [
            '• **Yield_kg_per_acre** (1,840 kg) — Kiambu dataset',
            '• **SBP_T0** (142.4 mmHg blood pressure) — Nakuru dataset',
            '• **Math_KCSE_Mean** (6.72 grade) — Machakos dataset',
            '• **Age** (28 years)',
            '• **Income** (KES 45,000)',
          ]},

        { type: 'callout', tone: 'success', title: 'What you CAN do with continuous variables',
          body: [
            '✅ **CAN**: Calculate means, standard deviations',
            '✅ **CAN**: Run parametric tests (t-tests, ANOVA, Pearson correlation, regression)',
            '✅ **CAN**: Create histograms, boxplots, scatterplots',
            'This is the MOST flexible variable type — most statistical tests are designed for continuous data.',
          ]},

        { type: 'comparison',
          headers: ['Variable Type', 'Can Average?', 'Can Rank?', 'Example Tests'],
          rows: [
            ['Categorical', '❌ No', '❌ No', 'Chi-square, frequencies'],
            ['Ordinal', '⚠️ Debatable', '✅ Yes', 'Mann-Whitney, Kruskal-Wallis, Spearman'],
            ['Continuous', '✅ Yes', '✅ Yes', 't-test, ANOVA, Pearson, regression'],
          ]},
      ],
    },

    /* ════════════════════ 3. INDEPENDENT VS DEPENDENT VARIABLES ════════════════════ */
    {
      id: 'iv-dv',
      title: 'Independent variable vs dependent variable (IV vs DV)',
      blocks: [
        { type: 'heading', level: 2, text: 'Every research question has an IV and a DV' },

        { type: 'definition', term: 'Independent Variable (IV) — the predictor',
          body: 'The variable you think CAUSES or PREDICTS the outcome. It\'s what you manipulate or measure as the "input."' },

        { type: 'definition', term: 'Dependent Variable (DV) — the outcome',
          body: 'The variable you think is AFFECTED by the IV. It\'s the "output" or "result" you\'re measuring.' },

        { type: 'workedExample', title: 'Identifying IV and DV in real studies',
          body: [
            { label: 'Kiambu Maize Study',
              text: '**Research question**: Does fertilizer type affect maize yield?\n**IV**: Fertilizer type (DAP / CAN / Organic) — this is categorical\n**DV**: Yield_kg_per_acre — this is continuous\n\n**Why it matters**: Continuous DV + categorical IV with 3 groups → ANOVA' },
            { label: 'Machakos Digital Learning',
              text: '**Research question**: Does internet connectivity predict math scores?\n**IV**: Internet_Connectivity (continuous score)\n**DV**: Math_KCSE_Mean (continuous grade)\n\n**Why it matters**: Continuous DV + continuous IV → Pearson correlation or regression' },
            { label: 'Nakuru Wellness',
              text: '**Research question**: Did blood pressure change over time?\n**IV**: Time (T0, T1, T2) — same people measured 3 times\n**DV**: SBP (systolic blood pressure, continuous)\n\n**Why it matters**: Continuous DV + same people measured 3+ times → Repeated Measures ANOVA' },
            { label: 'Nyandarua Vaccine',
              text: '**Research question**: Is education level associated with vaccine acceptance?\n**IV**: Education (Primary / Secondary / Diploma / Degree / Postgrad) — categorical ordinal\n**DV**: Vaccine_Acceptance (Yes / No) — categorical binary\n\n**Why it matters**: Categorical DV + categorical IV → Chi-square test' },
          ]},

        { type: 'callout', tone: 'gold', title: 'The IV-DV test matching rule',
          body: [
            '**Step 1**: Identify your DV (what are you trying to explain/predict?)',
            '**Step 2**: Identify your IV (what do you think affects the DV?)',
            '**Step 3**: What TYPE of variable is your DV? (categorical? ordinal? continuous?)',
            '**Step 4**: What TYPE of variable is your IV? (categorical? ordinal? continuous? How many groups?)',
            '**Step 5**: Match the combination to the right test (see the decision table below)',
          ]},
      ],
    },

    /* ════════════════════ 4. DECISION TABLE ════════════════════ */
    {
      id: 'decision-table',
      title: 'The Variable Type → Test Decision Table',
      blocks: [
        { type: 'heading', level: 2, text: 'Once you know your variable types, the test choice is obvious' },

        { type: 'comparison',
          headers: ['DV Type', 'IV Type', 'Number of Groups/IVs', 'Right Test'],
          rows: [
            ['Continuous', 'Categorical', '2 independent groups', 'Independent t-test'],
            ['Continuous', 'Categorical', '2 paired groups (same people)', 'Paired t-test'],
            ['Continuous', 'Categorical', '3+ independent groups', '**One-way ANOVA**'],
            ['Continuous', 'Categorical', '3+ time points (same people)', '**Repeated Measures ANOVA**'],
            ['Continuous', 'Continuous', '1 IV', '**Pearson correlation** or **Simple regression**'],
            ['Continuous', 'Continuous', '2+ IVs', '**Multiple regression**'],
            ['Categorical', 'Categorical', 'Any', '**Chi-square**'],
            ['Categorical (binary)', 'Any', 'Any', '**Logistic regression**'],
            ['Ordinal', 'Any', 'Any', '**Non-parametric tests** (Mann-Whitney, Kruskal-Wallis, Spearman)'],
          ]},

        { type: 'callout', tone: 'brand', title: 'Memorize this table',
          body: [
            'This table is the KEY to choosing the right test.',
            'If you know your DV type and IV type, you can instantly narrow down to 1-2 possible tests.',
            'The rest of this course teaches you how to run each test and interpret the output.',
          ]},

        { type: 'reveal',
          prompt: 'Quick test: Your DV is "exam score" (continuous). Your IV is "study method" (3 groups: lecture, group discussion, flipped classroom). Which test do you use?',
          answer: '**One-way ANOVA.**\n\nDV = continuous (exam score)\nIV = categorical with 3 independent groups\n→ Matches row 3 of the decision table → ANOVA' },

        { type: 'reveal',
          prompt: 'Quick test: Your DV is "vaccine acceptance" (Yes/No). Your IV is "education level" (5 categories). Which test?',
          answer: '**Chi-square test.**\n\nDV = categorical (binary: Yes/No)\nIV = categorical (5 categories)\n→ Matches row 7 → Chi-square' },

        { type: 'reveal',
          prompt: 'Quick test: Your DV is "blood pressure" (continuous). You measured it at 3 time points (before, after 4 weeks, after 8 weeks) on the SAME 45 people. Which test?',
          answer: '**Repeated Measures ANOVA.**\n\nDV = continuous (blood pressure)\nIV = time (3 measurements, same people)\n→ Matches row 4 → Repeated Measures ANOVA' },
      ],
    },

    /* ════════════════════ 5. READING OUTPUT BEFORE RUNNING ════════════════════ */
    {
      id: 'reading-output',
      title: 'Priority 2: Read the output BEFORE you run the test',
      blocks: [
        { type: 'heading', level: 2, text: 'Most students run the test first, then try to understand the output. Do the opposite.' },

        { type: 'paragraph', text:
          'Before you click a single button in SPSS, look at a SAMPLE OUTPUT from the lesson. Understand what each number means. Then run the test on YOUR data and compare.' },

        { type: 'workedExample', title: 'Example: ANOVA output for Kiambu Maize',
          body: [
            { label: 'The ANOVA table (from the lesson)',
              text: 'Source         | SS       | df | MS      | F      | p\n---------------|----------|----|---------|--------|------\nBetween Groups | 478,800  | 2  | 239,400 | 22.40  | <.001\nWithin Groups  | 1,892,400| 177| 10,688  |        |\nTotal          | 2,371,200| 179|         |        |' },
            { label: 'What each number means',
              text: '**df (degrees of freedom)**: 2 for between (3 groups - 1), 177 for within (180 farms - 3 groups)\n\n**F-statistic**: 22.40 — this is the RATIO of between-group variance to within-group variance. A large F means the groups are very different from each other compared to the natural variation within groups.\n\n**p-value**: <.001 — this means there\'s less than a 0.1% chance that the fertilizer differences are due to random luck. Since p < .05, the result is STATISTICALLY SIGNIFICANT.\n\n**Interpretation**: "Fertilizer type significantly affects maize yield, F(2, 177) = 22.40, p < .001."' },
          ]},

        { type: 'callout', tone: 'gold', title: 'The 3 numbers you MUST understand',
          body: [
            '**1. p-value**: Is the result statistically significant? (p < .05 = yes)\n**2. Effect size**: How BIG is the effect? (η² = .20 means fertilizer explains 20% of yield variation)\n**3. Confidence interval**: What\'s the range of plausible values? (e.g., "mean yield for DAP is 1,840 kg, 95% CI [1,770, 1,910]")',
            'If you understand these 3 numbers, you can interpret ANY statistical output.',
          ]},
      ],
    },

    /* ════════════════════ 6. NEXT STEPS ════════════════════ */
    {
      id: 'next-steps',
      title: 'What to do next',
      blocks: [
        { type: 'callout', tone: 'success', title: 'You now understand Priority 1',
          body: [
            '✅ You can identify variable types (categorical, ordinal, continuous)',
            '✅ You can identify the IV and DV in any research question',
            '✅ You can use the decision table to choose the right test',
            '✅ You understand what p-values, effect sizes, and confidence intervals mean',
          ]},

        { type: 'paragraph', text:
          'Now you\'re ready for Priority 3-5:\n**Priority 3**: Choose the right test (you just learned this — use the decision table)\n**Priority 4**: Run the test in SPSS (each lesson shows you the exact clicks)\n**Priority 5**: Write up findings in academic language (each lesson provides APA templates)' },

        { type: 'callout', tone: 'brand', title: 'Your next step',
          body: [
            'Go to the **Learning Pathway** page and choose your track:\n• Beginner Track → Start with "SPSS Interface" lesson\n• Intermediate Track → Jump to "Pearson Correlation" or "One-way ANOVA"\n• Advanced Track → Start with "Repeated Measures ANOVA" or "Logistic Regression"\n\nEach lesson will teach you Priority 3-5 for that specific test.',
          ]},
      ],
    },
  ],
};
