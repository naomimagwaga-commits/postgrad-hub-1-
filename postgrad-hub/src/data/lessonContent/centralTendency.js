/**
 * Descriptive Statistics · Lesson 2 — Mean, Median, Mode
 * The three measures of central tendency. Beginner-paced with Kenyan examples.
 */

export const CENTRAL_TENDENCY_LESSON = {
  id: 'desc-2',
  title: 'Mean, median, mode',
  subtitle: 'Module 03 · Course: Descriptive Statistics · Lesson 2 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'The three ways to summarise a typical value',
      blocks: [
        { type: 'scene', body: [
          'Imagine you walk into a small Nairobi office at lunchtime and ask: "What is a typical monthly salary here?" One person tells you, "Most of us earn around 50,000". Another says, "If you line us up by salary, the person in the middle earns about 48,000". A third says, "Take everyone\'s salary, add them up, divide by the number of people — you get 47,500 on average". A fourth person walks past muttering, "The boss earns 2 million a month, so the *average* is 195,000, but that\'s nonsense because no normal employee earns that".',
          'Each person just used a different measure of *central tendency* — a different way of describing the "typical" value of a variable. **Mode** is the most common value. **Median** is the middle value. **Mean** is the arithmetic average. And the last person noticed something important: the mean can be misleading when one value is far from the others.',
          'This lesson teaches you the three measures, when each one is appropriate, and the single most-important judgement call in descriptive statistics: **when to report the mean and when to report the median instead.** Get this right and your Chapter 4 is honest. Get it wrong and your "average" tells the wrong story.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Define mean, median, and mode** in plain English and compute each by hand on a small dataset.',
            '**Run all three in SPSS** via Analyze → Descriptive Statistics → Frequencies (with Statistics) or Descriptives or Explore.',
            '**Choose the right measure** for any variable based on its measurement level and the shape of its distribution.',
            '**Recognise when the mean is misleading** (skewed data, outliers) and switch to the median.',
            '**Read SPSS output** correctly — especially when SPSS reports a mean for a variable where median would be better.',
            '**Write up central-tendency results** following the APA template every examiner expects.',
            '**Avoid the four mistakes** that make descriptive statistics look careless.',
          ]},

        { type: 'why', body:
          'Almost every quantitative thesis reports means somewhere. Most of those reports use the wrong measure for the wrong variable. Examiners spot this immediately. A student who confidently explains "I report the median for income because the distribution is positively skewed" looks like a researcher. A student who reports a mean income of 195,000 KSh because the CEO is in the sample looks like they did not think about it.' },
      ],
    },

    /* ════════════════════ 2. THE THREE DEFINITIONS ════════════════════ */
    {
      id: 'definitions',
      title: 'The three measures, defined slowly',
      blocks: [
        { type: 'heading', level: 2, text: 'Mean, median, mode — one at a time' },

        { type: 'definition', term: 'Mean (arithmetic average)',
          body: 'Add up all the values, then divide by how many values there are. Symbol: x̄ (read as "x-bar") for a sample, μ (the Greek letter mu) for a population. Used for continuous (Scale) variables when the distribution is approximately symmetric.' },

        { type: 'definition', term: 'Median',
          body: 'The MIDDLE value when you line up all the cases from lowest to highest. If you have 99 cases, the median is the 50th case. If you have 100 cases, the median is the average of the 50th and 51st. Used for ordinal variables and for continuous variables when the distribution is skewed or has outliers.' },

        { type: 'definition', term: 'Mode',
          body: 'The MOST FREQUENTLY OCCURRING value. The value that appears most often in your data. Used mostly for nominal variables — there is no "average gender" or "middle religion", but there is a "most common" one.' },

        { type: 'heading', level: 3, text: 'Working through a small example by hand' },

        { type: 'workedExample', title: 'Seven test scores from a small class',
          body: [
            { label: 'The data',
              text: 'Seven pupils sat a 100-mark test. Their scores: **52, 60, 65, 70, 72, 78, 95**.' },
            { label: 'Mean (the arithmetic average)',
              text: 'Add them up: 52 + 60 + 65 + 70 + 72 + 78 + 95 = **492**. Divide by 7 (the number of pupils): 492 ÷ 7 = **70.3**. The mean test score is 70.3.' },
            { label: 'Median (the middle value)',
              text: 'Already sorted lowest to highest. With 7 values, the middle one is the 4th: 52, 60, 65, **70**, 72, 78, 95. The median is **70**.' },
            { label: 'Mode (the most common value)',
              text: 'Every value appears exactly once, so technically there is no mode. If two pupils had scored 70, then 70 would be the mode. In this dataset, the mode is undefined.' },
            { label: 'What if a single value changes?',
              text: 'Suppose one pupil scored 195 instead of 95 (someone made a typo, but pretend it is real). The mean jumps to (492 − 95 + 195) ÷ 7 = **84.6**. The median stays at **70**. This is the key insight: the mean is sensitive to extreme values; the median is not.' },
          ]},

        { type: 'reveal',
          prompt: 'Quick computation. Six staff members reported their years of experience: 2, 3, 4, 4, 6, 9. What are the mean, median, and mode?',
          answer: '**Mean** = (2 + 3 + 4 + 4 + 6 + 9) ÷ 6 = 28 ÷ 6 = **4.67 years**.\n**Median** = with 6 values, average of the 3rd and 4th: (4 + 4) ÷ 2 = **4 years**.\n**Mode** = the value that appears most often = **4** (it appears twice; the rest only once). All three measures agree closely here, suggesting the distribution is roughly symmetric — no skew, no outliers. Either mean or median would honestly describe this group.' },
      ],
    },

    /* ════════════════════ 3. WHEN MEAN AND MEDIAN DISAGREE ════════════════════ */
    {
      id: 'mean-vs-median',
      title: 'When mean and median disagree — outliers and skew',
      blocks: [
        { type: 'heading', level: 2, text: 'The single most-important judgement call' },

        { type: 'paragraph', text:
          'Most of the time, mean and median tell roughly the same story. When they DISAGREE substantially, something interesting is going on in your data — usually outliers or skewed distribution. Recognising the disagreement and choosing the right measure to report is one of the most-important skills in descriptive statistics.' },

        { type: 'illustration', component: 'MeanVsMedian',
          caption: 'Figure 1. Two scenarios. LEFT: five typical incomes (in KSh thousands). Mean = 48.4, Median = 48 — they agree, either is fine. RIGHT: the same five people plus one tycoon earning 2.5 million. Mean shoots up to 457; median stays at 48. The mean is mathematically correct but tells a misleading story about a "typical" salary.' },

        { type: 'callout', tone: 'gold', title: 'The rule of thumb',
          body: 'If mean and median are close (within ~10% of each other), report the mean. If they are far apart, report the median (and explain why). When in doubt, report both and let the reader see the divergence.' },

        { type: 'heading', level: 3, text: 'Why does this happen mathematically?' },

        { type: 'paragraph', text:
          'The **mean** is computed by adding every value, so every value contributes equally to the total. One extreme value (2,500,000) contributes much more to the sum than five normal values (35,000 + 42,000 + 48,000 + 55,000 + 62,000). The mean is dragged towards the extreme.' },

        { type: 'paragraph', text:
          'The **median** only cares about position, not magnitude. Whether the highest value is 62,000 or 62,000,000, the middle value is still the middle value. The median is **robust** to outliers — a fancy way of saying it does not flinch when one value is extreme.' },

        { type: 'heading', level: 3, text: 'Skewness — the shape of the distribution' },

        { type: 'paragraph', text:
          'When data has a long tail on ONE side, we call it **skewed**. Skewed distributions almost always have mean and median in different positions.' },

        { type: 'illustration', component: 'DistributionShapes',
          caption: 'Figure 2. Three classic distribution shapes. LEFT: negatively (left) skewed — long tail on the LEFT. Mean < Median < Mode. CENTRE: symmetric — Mean ≈ Median ≈ Mode. RIGHT: positively (right) skewed — long tail on the RIGHT. Mean > Median > Mode.' },

        { type: 'comparison',
          headers: ['Variable type', 'Typical shape', 'Recommended measure'],
          rows: [
            ['Test scores (most pupils pass)',           'Left-skewed (negative)',          'Median or mean — both close.'],
            ['Income (most people earn modest, few earn huge)', 'Right-skewed (positive)', '**Median** — mean is misleading.'],
            ['Age in a working-age sample (25-55)',      'Symmetric',                       'Mean.'],
            ['Number of children per household',         'Right-skewed (few have many)',    '**Median**.'],
            ['Years of experience',                       'Often right-skewed',              '**Median** if the long tail is pronounced, mean otherwise.'],
            ['Standardised test score (e.g. IQ)',         'Symmetric (by design)',           'Mean.'],
          ]},

        { type: 'why', body:
          'Examiners love when a student writes: *"Because the distribution of income was positively skewed (skewness = +1.34) and the mean was inflated by a small number of high-earning respondents, the median is reported as the more representative measure of central tendency."* That single sentence demonstrates statistical maturity and prevents two follow-up questions in the viva.' },
      ],
    },

    /* ════════════════════ 4. CHOOSING BY MEASUREMENT LEVEL ════════════════════ */
    {
      id: 'choosing',
      title: 'Choosing by measurement level',
      blocks: [
        { type: 'heading', level: 2, text: 'Which measures even MAKE SENSE for each variable type' },

        { type: 'paragraph', text:
          'Before worrying about skew and outliers, there is a more basic question: does the measure even make sense for this variable? You cannot compute a meaningful mean for nominal data. You cannot meaningfully compute a mode for a continuous variable with hundreds of unique values. The measurement level (Scale, Ordinal, Nominal) tells you which measures are even valid.' },

        { type: 'comparison',
          headers: ['Measurement level', 'Examples', 'Mean?', 'Median?', 'Mode?', 'Recommended'],
          rows: [
            ['**Scale** (continuous)', 'Age, income, exam score', '✓', '✓', '(✓ but usually unhelpful)', 'Mean if symmetric; median if skewed.'],
            ['**Ordinal**', 'Likert items, Form 1-4, satisfaction low/med/high', '✗ (technically inappropriate)', '✓', '✓', 'Median and mode. (Many researchers report the mean of individual Likert items anyway — controversial but common.)'],
            ['**Nominal**', 'Gender, county, religion', '✗ (meaningless)', '✗ (meaningless)', '✓', 'Mode only. Frequencies + mode tell the story.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Mean of an ordinal variable — the ongoing controversy',
          body: [
            'Strictly speaking, you cannot meaningfully average ordinal data. The mean of "Disagree (2), Neutral (3), Agree (4)" is 3 — but is the *distance* between Disagree and Neutral really the same as between Neutral and Agree? Probably not. So averaging treats unequal intervals as equal.',
            'In practice, many published studies DO report the mean of single Likert items. It is so common that examiners often accept it — especially when the item is treated as approximately continuous. The safer alternative is to report the median, or to sum 5-10 Likert items into a total scale score (which can then be treated as continuous).',
            'Our advice for thesis work: report both mean AND median for single Likert items, or sum into a scale first. For multi-item scales (the total of 10 Likert items), mean is fine.',
          ]},

        { type: 'reveal',
          prompt: 'You are summarising the variable "county" (47 categories, no order). Which measure(s) of central tendency are appropriate?',
          answer: '**Only the mode.** County is a nominal variable — there is no natural order between Nairobi and Kisumu, so a median ("middle county") is meaningless. There is no numeric meaning either, so a mean is impossible. The honest summary is: "the modal county was Nairobi (n = 78, 39%)". You can also report frequencies for the top 5 most-common counties, with the rest grouped as "Other".' },
      ],
    },

    /* ════════════════════ 4.5 THE MACHAKOS CASE STUDY ════════════════════ */
    {
      id: 'case-machakos',
      title: 'The Machakos Study — the continuous variables we\'ll describe',
      blocks: [
        { type: 'callout', tone: 'brand', title: 'Same running case study as the previous lesson',
          body: [
            'Same fictional study, same 274 respondents from 8 Machakos public secondary schools. In the previous lesson we described the **categorical** variables (Gender, Category, Form, HighestQual) with Frequencies.',
            'In THIS lesson, we\'ll describe the **continuous** variables — the ones where computing a mean, median, and standard deviation actually makes sense.',
          ]},

        { type: 'heading', level: 2, text: 'The 5 continuous variables in the Machakos dataset' },

        { type: 'paragraph', text:
          'A quick reminder: **continuous variables** are numeric variables where the numbers have real quantitative meaning (unlike Gender where "1" and "2" are just labels). For continuous variables we can meaningfully compute a mean, standard deviation, minimum, maximum, and so on. Here are the 5 continuous variables in the Machakos dataset:' },

        { type: 'comparison',
          headers: ['Variable name in SPSS', 'What it measures', 'Scale / range', 'Role in the study'],
          rows: [
            ['**Digital_Devices**',        'Composite: mean of 5 Likert items on digital device availability (Dev_1 to Dev_5)', '1.00 – 5.00', 'Independent variable 1'],
            ['**Teacher_Competency**',     'Composite: mean of 5 Likert items on teacher digital competency (Comp_1 to Comp_5)', '1.00 – 5.00', 'Independent variable 2'],
            ['**Internet_Connectivity**',  'Composite: mean of 5 Likert items on internet reliability (Net_1 to Net_5)', '1.00 – 5.00', 'Independent variable 3'],
            ['**InvestmentPerStudent**',   'KES invested in digital infrastructure per student per term', '≥ 0 (typically KES 2,000 – 8,000)', 'Independent variable 4'],
            ['**Math_KCSE_Mean**',         'School\'s Mathematics KCSE mean grade points', '1 – 12', 'DEPENDENT variable (outcome)'],
          ],
        },

        { type: 'callout', tone: 'info', title: 'Why we use COMPOSITE scores for the first 3',
          body: [
            'Each of the first 3 variables is built from 5 individual Likert items. For example, `Digital_Devices` is the mean of `Dev_1` through `Dev_5` (5 items each rated 1-5).',
            'Combining items this way turns 5 ORDINAL (Likert) variables into 1 approximately-CONTINUOUS composite — which is why we can now meaningfully compute mean, SD, etc.',
            'You\'ll learn how to CREATE composites in the Data Cleaning lesson (Transform → Compute Variable). For now, just accept that our dataset already has them.',
          ]},

        { type: 'paragraph', text:
          'The full frequency-and-percent breakdown of the DEMOGRAPHIC variables lived in the previous lesson. Now we describe the CONTINUOUS ones — Mean, Standard Deviation, Range, Skewness, Kurtosis — in ONE go using the SPSS Descriptives procedure.' },
      ],
    },

    /* ════════════════════ 5. RUNNING IT IN SPSS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Three ways to get central tendency in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'Frequencies (with Statistics), Descriptives, or Explore' },

        { type: 'paragraph', text:
          'SPSS gives you three different menu paths to mean/median/mode. Each is best for a slightly different situation. Learn all three and you can always pick the most efficient one for your task.' },

        { type: 'heading', level: 3, text: 'Method 1 — Frequencies with Statistics (good for Likert and small categorical sets)' },

        { type: 'steps', steps: [
          { title: 'Open Frequencies',
            body: 'Analyze → Descriptive Statistics → Frequencies.' },
          { title: 'Move your variables to the right',
            body: 'Pick the variables you want central tendency for.' },
          { title: 'Click Statistics…',
            body: 'A small dialog opens. Under "Central Tendency" tick Mean, Median, and Mode. Under "Dispersion" tick Std. deviation, Minimum, Maximum (for next lesson). Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces the frequency table PLUS a small summary table at the top showing mean, median, and mode for each variable.' },
        ]},

        { type: 'heading', level: 3, text: 'Method 2 — Descriptives (fast for many continuous variables)' },

        { type: 'steps', steps: [
          { title: 'Open Descriptives',
            body: 'Analyze → Descriptive Statistics → Descriptives.' },
          { title: 'Move continuous variables to the right',
            body: 'This menu is for Scale variables only. Move several at once.' },
          { title: 'Click Options if you want to customise',
            body: 'By default you get Mean, SD, Min, Max. Click Options to add other statistics. Note: Descriptives does NOT give you the median by default — for that use Frequencies or Explore.' },
          { title: 'Click OK',
            body: 'SPSS produces a compact summary table with one row per variable — ideal for putting straight into Chapter 4.' },
        ]},

        { type: 'heading', level: 3, text: 'Method 3 — Explore (richest output, best for thesis-quality work)' },

        { type: 'steps', steps: [
          { title: 'Open Explore',
            body: 'Analyze → Descriptive Statistics → Explore.' },
          { title: 'Move variables to Dependent List',
            body: 'Move the continuous variables you want to explore.' },
          { title: 'Optionally move a grouping variable to Factor List',
            body: 'If you move gender to Factor List, you get descriptive statistics separately for males and females. Powerful for comparing groups.' },
          { title: 'Click OK',
            body: 'SPSS produces a rich output: Descriptives table with mean, median, 5% trimmed mean, variance, SD, min, max, range, IQR, skewness, kurtosis. PLUS optional Q-Q plots and tests of normality. This is the most comprehensive central-tendency tool in SPSS.' },
        ]},

        { type: 'callout', tone: 'gold', title: 'Which method when?',
          body: [
            '**For a few Likert items or categorical variables:** use **Frequencies with Statistics** — you get the central tendencies AND the frequency tables in one run.',
            '**For many continuous variables at once:** use **Descriptives** — compact, fast, one summary row per variable.',
            '**For thesis-quality reporting:** use **Explore** — gives you mean, median, skewness, normality tests in one output.',
          ]},
      ],
    },

    /* ════════════════════ 5.5 THE MACHAKOS PROCEDURE (WALK-THROUGH) ════════════════════ */
    {
      id: 'machakos-walkthrough',
      title: 'The Machakos procedure',
      blocks: [
        { type: 'heading', level: 2, text: 'Step-by-step: describing all 5 continuous variables at once' },

        { type: 'paragraph', text:
          'We\'ll now run **Descriptives** on all 5 continuous variables in the Machakos dataset — `Digital_Devices`, `Teacher_Competency`, `Internet_Connectivity`, `InvestmentPerStudent`, and `Math_KCSE_Mean` — in ONE go. This produces the "Descriptive Statistics of Study Variables" table that every quantitative Chapter 4 needs.' },

        /* ─────── STEP 1 (menu path) ─────── */
        { type: 'heading', level: 3, text: 'STEP 1 — Open the Descriptives dialog' },

        { type: 'paragraph', text:
          'From the SPSS main menu bar at the top of your Data Editor window, click:' },

        { type: 'callout', tone: 'brand', title: 'The click path',
          body: '**Analyze → Descriptive Statistics → Descriptives…**' },

        { type: 'callout', tone: 'info', title: '⚠️ Watch out — Descriptives is NOT Frequencies',
          body: [
            'Both live under the same "Descriptive Statistics" menu. But they do different things:',
            '**Frequencies** = for CATEGORICAL variables (Gender, Category) — counts of each category',
            '**Descriptives** = for CONTINUOUS variables (Mean, SD, Min, Max) — one summary row per variable',
            'A common beginner mistake is picking the wrong one. If your variable has more than about 10 distinct numeric values, you want Descriptives.',
          ]},

        { type: 'illustration', component: 'MachakosCTMenuPath',
          caption: 'Figure 1. The SPSS menu path for opening the Descriptives dialog. (1) Click "Analyze" — it becomes highlighted. (2) Hover "Descriptive Statistics" (turns blue). (3) The submenu flies out — click "Descriptives…" (NOT Frequencies).' },

        /* ─────── STEP 2 (main dialog) ─────── */
        { type: 'heading', level: 3, text: 'STEP 2 — Move the 5 continuous variables into the box' },

        { type: 'paragraph', text:
          'In the left-hand variable list, find your 5 continuous variables. Click the first one, then hold **Ctrl** and click each of the others: `Digital_Devices`, `Teacher_Competency`, `Internet_Connectivity`, `InvestmentPerStudent`, and `Math_KCSE_Mean`. Then click the blue **▶** arrow to move them into the **Variable(s)** box on the right.' },

        { type: 'illustration', component: 'MachakosCTDialog',
          caption: 'Figure 2. The Descriptives dialog after selecting the 5 continuous variables (3 highlighted in blue on the left, all 5 moved into the Variable(s) box on the right). The 3 composite scores at the bottom of the left list (Digital_Devices, Teacher_Competency, Internet_Connectivity) have a "ruler" icon indicating they are Scale variables.' },

        { type: 'callout', tone: 'info', title: 'Reading the variable icons',
          body: [
            '📏 **Yellow ruler** = Scale/Continuous variable (Age, InvestmentPerStudent, composites) — safe for Descriptives',
            '📊 **Small bar chart** = Ordinal variable (Form 2/3/4) — technically we should use Frequencies for this',
            '🔴 **Red circle** = Nominal/String variable (Gender, Category, HighestQual) — never use Descriptives on these',
            'Only move variables with the yellow ruler icon into a Descriptives dialog.',
          ]},

        /* ─────── STEP 3 (options sub-dialog) ─────── */
        { type: 'heading', level: 3, text: 'STEP 3 — Click Options… and tick the statistics you want' },

        { type: 'paragraph', text:
          'By default, Descriptives only produces Mean, Standard Deviation, Minimum, and Maximum. To get everything a thesis examiner expects — including Variance, Range, Skewness, and Kurtosis — click the **Options…** button in the main dialog.' },

        { type: 'paragraph', text:
          'The Options sub-dialog opens. Tick these 8 boxes:' },

        { type: 'illustration', component: 'MachakosCTOptions',
          caption: 'Figure 3. The Descriptives: Options sub-dialog. Under "Statistics", tick: Mean, Std. deviation, Variance, Range, Minimum, Maximum. Under "Distribution", tick: Kurtosis, Skewness. Under "Display Order", leave "Variable list" selected. Click Continue.' },

        { type: 'callout', tone: 'gold', title: 'Why we tick Skewness and Kurtosis',
          body: 'Almost every inferential test you\'ll run next (Pearson correlation, t-tests, regression, ANOVA) ASSUMES your variables are approximately normally distributed. Skewness and Kurtosis are the two quickest checks for that. Their VALUES between -2 and +2 (some sources say ±1) indicate approximate normality — meaning you\'re cleared to use parametric tests. Always report them.' },

        /* ─────── STEP 4 (output) ─────── */
        { type: 'heading', level: 3, text: 'STEP 4 — Click OK and read the output' },

        { type: 'paragraph', text:
          'You\'re back at the main Descriptives dialog. **Click OK.** The Output Viewer opens with your Descriptive Statistics table — a single compact table with one row per variable and one column per statistic:' },

        { type: 'illustration', component: 'MachakosCTOutput',
          caption: 'Figure 4. The complete Descriptive Statistics table for the 5 continuous variables in the Machakos dataset. Each row is one variable; each column is one statistic. N = 274 for every variable (nobody missing). The bottom "Valid N (listwise)" row confirms 274 cases have complete data across ALL 5 variables — important for later inferential analyses.' },

        { type: 'heading', level: 3, text: 'Interpretation — the 3 composite scores' },

        { type: 'comparison',
          headers: ['Variable', 'Mean', 'SD', 'Interpretation'],
          rows: [
            ['**Teacher_Competency**',  '3.72', '.78', 'HIGHEST mean → respondents leaned "Agree" — teachers are generally competent with digital tools'],
            ['**Digital_Devices**',     '3.51', '.82', 'Between Neutral and Agree — devices are moderately available'],
            ['**Internet_Connectivity**','3.38','.79', 'LOWEST mean — closer to Neutral, suggesting internet reliability is the weakest institutional dynamic'],
          ],
        },

        { type: 'heading', level: 3, text: 'Interpretation — the 2 continuous variables' },

        { type: 'comparison',
          headers: ['Variable', 'Mean', 'Min – Max', 'Interpretation'],
          rows: [
            ['**InvestmentPerStudent**', 'KES 4,820', 'KES 2,200 – 7,800', 'Wide variation across schools — some invest 3.5× more per student than others'],
            ['**Math_KCSE_Mean**',       '5.92',      '4.80 – 7.10',      'On the 12-point KCSE scale (C+ average) — the outcome variable we\'ll model later'],
          ],
        },

        /* ─────── STEP 5 (annotated) ─────── */
        { type: 'heading', level: 3, text: 'STEP 5 — Read ONE row column-by-column' },

        { type: 'paragraph', text:
          'The table above has 5 rows × 11 columns = 55 numbers. To not feel overwhelmed, learn to read ONE row first. Below is the row for `Digital_Devices` with color-coded callouts pointing to each key statistic — study this image and you\'ll be able to read any Descriptives table for the rest of your career:' },

        { type: 'illustration', component: 'MachakosCTAnnotated',
          caption: 'Figure 5. The Digital_Devices row with 6 color-coded annotations. Gold = N (report always). Blue = Mean (average score). Green = SD (spread around the mean, report as M = 3.51, SD = 0.82). Grey = Min/Max (range used). Purple = Skewness (normal if between ±2). Orange = Kurtosis (normal if between ±2).' },

        { type: 'callout', tone: 'gold', title: 'The one-sentence Chapter 4 template',
          body: [
            'Once you know how to read one row, every descriptive result becomes ONE sentence:',
            '_"Digital_Devices had a mean of 3.51 (SD = 0.82, N = 274), ranging from 1.00 to 5.00. Skewness (-0.21) and kurtosis (-0.15) were within the acceptable range of ±2, indicating an approximately normal distribution."_',
            'Repeat this template for every variable. Your entire "Descriptive Statistics of Study Variables" section writes itself.',
          ]},
      ],
    },

    /* ════════════════════ 6. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading',
      title: 'Reading the output and the 5% trimmed mean',
      blocks: [
        { type: 'heading', level: 2, text: 'A bonus value worth knowing — the trimmed mean' },

        { type: 'paragraph', text:
          'When you run **Explore**, the output table includes a value called **"5% Trimmed Mean"** — a number that often catches beginners off guard. Here is what it is and why it is useful.' },

        { type: 'definition', term: '5% Trimmed Mean',
          body: 'Calculated by removing the top 5% and bottom 5% of values from your data, then computing the mean of the remaining 90%. This middle-90% mean is far less sensitive to outliers than the regular mean — it is a "compromise" between the mean and the median.' },

        { type: 'paragraph', text:
          'If your regular Mean and your 5% Trimmed Mean are close together, your data has no influential outliers. If they differ substantially, you have outliers at one or both extremes that are pulling the regular mean. This is one of the fastest outlier-detection tools in SPSS.' },

        { type: 'reveal',
          prompt: 'Your Explore output shows Mean = 87,500 KSh, 5% Trimmed Mean = 52,000 KSh, Median = 49,000 KSh. What does this tell you?',
          answer: '**Strong evidence of high-end outliers (high-earning respondents) skewing the mean.** The regular mean (87,500) is dragged up by a small number of very high incomes. The 5% Trimmed Mean (52,000) removes the top and bottom 5%, giving you a value much closer to the median (49,000). The honest report: *"Income was positively skewed, with the mean (KSh 87,500) inflated by a small number of high-earning respondents. The median (KSh 49,000) is a more representative summary of typical respondent income."* You report the median and explicitly explain why.' },
      ],
    },

    /* ════════════════════ 7. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing central tendency for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'Standard sentence patterns' },

        { type: 'heading', level: 3, text: 'Template — symmetric continuous variable' },

        { type: 'apa', text:
          'The mean [variable] was [X.X] ([unit], SD = [Y.Y]), ranging from [min] to [max] across the [N] respondents.' },

        { type: 'apa', text:
          'The mean age of respondents was 38.4 years (SD = 9.1), ranging from 22 to 61 years across the 198 respondents.' },

        { type: 'heading', level: 3, text: 'Template — skewed continuous variable' },

        { type: 'apa', text:
          'The [variable] distribution was [positively/negatively] skewed (skewness = [X.XX]). The median is therefore reported as the more representative measure of central tendency: median [variable] was [X.X] [unit], interquartile range [Q1] to [Q3].' },

        { type: 'apa', text:
          'The income distribution was positively skewed (skewness = +1.34). The median is therefore reported as the more representative measure of central tendency: median monthly household income was KSh 49,000, interquartile range KSh 32,000 to KSh 71,500.' },

        { type: 'heading', level: 3, text: 'Template — ordinal variable (Likert item)' },

        { type: 'apa', text:
          'On the satisfaction item ("I am satisfied with my supervisor"), the median response was [X] ([label]), with [%]% of respondents agreeing or strongly agreeing.' },

        { type: 'apa', text:
          'On the satisfaction item ("I am satisfied with my supervisor"), the median response was 4 (Agree), with 67% of respondents agreeing or strongly agreeing.' },

        { type: 'heading', level: 3, text: 'Template — nominal variable' },

        { type: 'apa', text:
          'The modal [variable] was [category] (n = [count], [XX]%).' },

        { type: 'apa', text:
          'The modal county of residence was Nairobi (n = 78, 39%), followed by Kiambu (n = 32, 16%) and Machakos (n = 24, 12%).' },

        { type: 'callout', tone: 'success', title: 'The four-element thesis sentence',
          body: 'For continuous variables, every Chapter 4 sentence should include: **measure + value + unit + spread**. "The mean age was 38.4 years (SD = 9.1)" hits all four. For skewed data, swap mean for median and SD for IQR (Lesson 3 covers IQR). Examiners look for this four-element structure.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why did you report the median rather than the mean for income?',
              a: 'The income distribution was positively skewed (skewness = +1.34), with a small number of high-earning respondents inflating the mean. The median (KSh 49,000) is more representative of typical respondent income than the mean (KSh 87,500). I reported both in the descriptive statistics table for full transparency.' },
            { q: 'Did you check for outliers before reporting the mean?',
              a: 'Yes — I ran Analyze → Descriptive Statistics → Explore, which provides a 5% trimmed mean alongside the regular mean. The two values were within 3% of each other for most variables, suggesting no influential outliers. For income, the trimmed mean diverged substantially from the mean, which is why I switched to reporting the median for that variable.' },
            { q: 'Why did you report a mean for the Likert satisfaction item — those are ordinal, not continuous.',
              a: 'I am aware of the controversy. For single Likert items I reported both the median and the mean for transparency; the median is the strictly correct summary for ordinal data. For multi-item Likert scales (the 10-item satisfaction scale summed into a total score), the sum behaves as continuous and the mean is the appropriate summary.' },
          ]},
      ],
    },

    /* ════════════════════ 8. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common central-tendency mistakes',
      blocks: [
        { type: 'heading', level: 2, text: 'Four mistakes that undermine your descriptive section' },

        { type: 'mistake',
          title: 'Mistake 1 — Reporting the mean of a skewed variable without comment',
          body: 'You report "the mean monthly income was KSh 87,500" because that is what SPSS said. But 75% of your sample earns less than that — the mean is being dragged up by a few high earners. The number is mathematically correct but practically misleading.',
          fix: 'Always check skewness before reporting a mean. Run Explore. If skewness exceeds about |1.0| OR if the mean differs substantially from the 5% trimmed mean, switch to reporting the median and explain why in one sentence.' },

        { type: 'mistake',
          title: 'Mistake 2 — Reporting the mean of a nominal variable',
          body: 'You compute the mean of "gender" coded 1=Male, 2=Female. SPSS gives you 1.62. You report "the average gender was 1.62". The reader has no idea what to do with this.',
          fix: 'Nominal variables have no meaningful mean. Report frequencies and the mode instead: "the modal gender was female (n = 122, 61.6%)". Always check the measurement level before reporting any central tendency.' },

        { type: 'mistake',
          title: 'Mistake 3 — Forgetting to report the spread',
          body: 'You write "the mean age was 38.4 years" without an SD. The reader has no idea whether ages clustered tightly around 38 (everyone is 36-40) or were spread widely (range 22-61).',
          fix: 'Always report a measure of spread alongside central tendency. Mean → SD. Median → IQR. The sentence "the mean age was 38.4 years (SD = 9.1)" tells the full story.' },

        { type: 'mistake',
          title: 'Mistake 4 — Reporting median to two decimal places when the data is integers',
          body: 'You report "median number of children = 2.00". The .00 is meaningless and looks unprofessional — number of children is a whole number, not a continuous measurement.',
          fix: 'Round to the precision of your data. For counts and integer variables, report whole numbers. For continuous variables, one decimal place is usually enough. Reserve two-decimal precision for variables actually measured with that precision (e.g. weights in kg).' },
      ],
    },

    /* ════════════════════ 9. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'heading', level: 2, text: 'What you should now be able to do' },

        { type: 'summary', items: [
          'Define mean (arithmetic average), median (middle value), and mode (most common value) in plain English and compute each by hand on a small dataset.',
          'Recognise that the mean is sensitive to outliers and skew, while the median is robust.',
          'Look at a histogram and identify whether it is symmetric, positively skewed, or negatively skewed — and predict the relative positions of mean, median, and mode.',
          'Apply the rule of thumb: report mean if mean and median agree (within ~10%); report median if they disagree substantially.',
          'Match the measure to the measurement level: mean and median for Scale, median and mode for Ordinal, mode only for Nominal.',
          'Run central tendency in SPSS three ways: Frequencies with Statistics (for Likert), Descriptives (fast for many continuous), Explore (richest output for thesis quality).',
          'Read the 5% Trimmed Mean as an outlier-detection tool — if it differs substantially from the regular Mean, you have outliers.',
          'Write up central tendency using the four-element sentence: measure + value + unit + spread.',
          'Avoid the four common mistakes — reporting mean for skewed data without comment, computing means for nominal variables, forgetting to report SD, over-precision in decimals.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 3: Standard deviation & variance** we cover measures of spread — the partner to mean and median. Then **Lesson 4** closes the Descriptive Statistics course with producing publishable graphs and charts using the Chart Builder.' },

        { type: 'paragraph', text:
          'Before moving on, open your dataset. Run Explore on three continuous variables. For each one, compare the Mean to the 5% Trimmed Mean and to the Median. Note which variables have all three values close together (report the mean) and which have them diverging (report the median). Write one sentence about each. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 10. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'heading', level: 2, text: 'Six quick questions' },

        { type: 'check',
          question: 'You have the values 4, 6, 8, 10, 12. What is the mean?',
          choices: ['8', '10', '40', '6'],
          answer: 0,
          explanation: 'Add them up: 4 + 6 + 8 + 10 + 12 = 40. Divide by 5: 40 ÷ 5 = **8**. The mean is the arithmetic average — sum of values divided by number of values.' },

        { type: 'check',
          question: 'Five values: 22, 24, 26, 28, 30. Now add an outlier of 200. What happens to the mean vs the median?',
          choices: [
            'Both jump dramatically',
            'The mean jumps a lot (from 26 to 55); the median barely moves (from 26 to 27)',
            'Both stay the same',
            'Only the median moves',
          ],
          answer: 1,
          explanation: 'The mean is sensitive to outliers — adding 200 to the sum pulls the mean from 26 to 55. The median only depends on POSITION, so it shifts only slightly. This is exactly why we prefer the median for skewed data or data with outliers — it tells a more representative story.' },

        { type: 'check',
          question: 'Your income distribution has skewness = +1.62 and Mean (KSh 95,000) much higher than Median (KSh 48,000). What should you report?',
          choices: [
            'Report the mean — it is the standard measure',
            'Report the median and explain that the distribution is positively skewed',
            'Report neither — describe only frequencies',
            'Report the mode',
          ],
          answer: 1,
          explanation: 'Strong positive skew and a mean dramatically higher than the median means a small number of high-income respondents are pulling the mean upward. The median (KSh 48,000) is more representative of typical respondent income. Report the median and explain the skew in one sentence — examiners reward this kind of methodological awareness.' },

        { type: 'check',
          question: 'You want to summarise "county of residence" (47 categories, no natural order). Which measure of central tendency should you report?',
          choices: [
            'Mean — average county code',
            'Median — middle county',
            'Mode — most common county',
            'All three',
          ],
          answer: 2,
          explanation: 'County is **nominal** — no natural order, no numeric meaning. Mean and median are meaningless here ("average county" is nonsense). Only the **mode** applies: report the most common county along with frequencies of the top few. *"The modal county was Nairobi (n = 78, 39%)."*' },

        { type: 'check',
          question: 'SPSS Explore output shows Mean = 87, 5% Trimmed Mean = 52, Median = 49. What does this tell you?',
          choices: [
            'No outliers — all three values agree',
            'High-end outliers are inflating the regular mean — switch to median for reporting',
            'The data is normally distributed',
            'The analysis is wrong',
          ],
          answer: 1,
          explanation: 'When the regular Mean is much higher than the 5% Trimmed Mean AND the Median, you have high-end outliers pulling the mean upward. The Trimmed Mean removes the top and bottom 5% and is much closer to the Median. The honest report: switch to the Median and explain the skew.' },

        { type: 'check',
          question: 'Which write-up is the most professional?',
          choices: [
            '"The mean was 38.4."',
            '"Mean age = 38.4."',
            '"The mean age of respondents was 38.4 years (SD = 9.1), ranging from 22 to 61."',
            '"Average age was around 38 or so."',
          ],
          answer: 2,
          explanation: 'Option C hits all four elements: measure (mean) + value (38.4) + unit (years) + spread (SD = 9.1) + range. This is the publishable APA-style sentence. The other options either omit units, omit spread, or use casual language unsuitable for a thesis.' },
      ],
    },
  ],
};
