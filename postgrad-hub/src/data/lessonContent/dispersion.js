/**
 * Descriptive Statistics · Lesson 3 — Standard Deviation & Variance
 * Measures of spread. The partner to central tendency.
 */

export const DISPERSION_LESSON = {
  id: 'desc-3',
  title: 'Standard deviation & variance',
  subtitle: 'Module 03 · Course: Descriptive Statistics · Lesson 3 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'Why two classes with the same average can be very different',
      blocks: [
        { type: 'scene', body: [
          'Two Form 3 classes sat the same end-of-term mathematics exam. Class A averaged 70/100. Class B averaged 70/100. The principal looks at the report and thinks the two classes performed identically.',
          'Then a teacher comes in and says: "Wait — in Class A, everyone scored between 65 and 75. The lowest was 65, the highest was 75. They are remarkably consistent. In Class B, scores ranged from 20 to 100. Half the class failed badly and the other half got nearly perfect. The mean is exactly the same — 70 — but the *experience* in the two classrooms is completely different."',
          'The mean told you the centre. It said nothing about the **spread** — how scattered the values are around that centre. To tell Class A from Class B you need a second number: a measure of dispersion. That is what **standard deviation** is. And it is the single most-reported number in postgraduate research after the mean itself.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Explain in plain English** what standard deviation, variance, range, and IQR measure.',
            '**Recognise** that the mean alone is not enough — you must report a measure of spread alongside it.',
            '**Compute SD by hand** on a small dataset (you will only do this once — but doing it once cements the intuition).',
            '**Read SPSS output** for standard deviation, variance, range, minimum, maximum, and interquartile range.',
            '**Choose between SD and IQR** based on whether your data is symmetric or skewed.',
            '**Apply the empirical (68-95-99.7) rule** to interpret SD intuitively for approximately normal distributions.',
            '**Write up dispersion** following the four-element APA pattern every examiner expects.',
            '**Avoid the four mistakes** that make spread statistics look sloppy.',
          ]},

        { type: 'why', body:
          'Examiners regularly write in red ink across submitted theses: "Where is the SD?" or "Report SD alongside every mean". A mean without a measure of spread is incomplete. This lesson makes sure you never get that comment.' },
      ],
    },

    /* ════════════════════ 2. WHY SPREAD MATTERS ════════════════════ */
    {
      id: 'why-spread',
      title: 'Why a mean alone is not enough',
      blocks: [
        { type: 'heading', level: 2, text: 'Two classes, same mean, completely different reality' },

        { type: 'illustration', component: 'SameMeanDifferentSD',
          caption: 'Figure 1. Two classes with identical means (70/100). Class A on the left has a tight distribution — everyone scored close to 70 (SD = 5). Class B on the right has a wide distribution — scores all over the place (SD = 20). The mean alone hides this difference completely. Without SD, the principal cannot tell these two classes apart.' },

        { type: 'paragraph', text:
          'This is the most important visual in descriptive statistics. Look at it carefully. Both curves are centred on 70. But Class A clusters tightly; Class B is spread wide. The SD captures exactly that difference — and reports it as a single number.' },

        { type: 'callout', tone: 'gold', title: 'The rule that follows every mean',
          body: 'Every time you report a mean, you must report a measure of spread alongside it. For symmetric/normal data, that is the **standard deviation (SD)**. For skewed data or when you reported the median, it is the **interquartile range (IQR)** or the minimum-maximum range.' },

        { type: 'why', body:
          'Two professionals with the same mean income are not the same: one might be a salaried worker with stable monthly income (low SD), the other might be a freelancer with months of plenty and months of nothing (high SD). The mean hides the experience. The SD reveals it.' },
      ],
    },

    /* ════════════════════ 3. RANGE — THE SIMPLEST SPREAD ════════════════════ */
    {
      id: 'range',
      title: 'Range — the simplest measure of spread',
      blocks: [
        { type: 'heading', level: 2, text: 'Max minus Min' },

        { type: 'definition', term: 'Range',
          body: 'The difference between the largest and smallest value: Range = Maximum − Minimum. Simple to compute, easy to report, but very sensitive to outliers — a single extreme value can blow it up.' },

        { type: 'paragraph', text:
          'In our Class A example, the range is 75 − 65 = 10 marks. In Class B, the range is 100 − 20 = 80 marks. That 8× difference in range immediately tells you the classes are very different, even though both have the same mean.' },

        { type: 'callout', tone: 'info', title: 'When to use range',
          body: 'Always report the range (or the min and max separately) alongside the mean and SD. It anchors the reader: "the mean income was KSh 47,500 (SD = 18,200), ranging from KSh 12,000 to KSh 110,000". Now we know the data lives between 12K and 110K. The mean and SD describe the shape; the min/max describes the bounds.' },

        { type: 'mistake',
          title: 'Reporting range as a single number',
          body: 'You write "the range of income was KSh 98,000". The reader has no idea whether income runs from 0 to 98,000 or from 50,000 to 148,000.',
          fix: 'Always report **minimum AND maximum** separately, not just the range as one number. "ranging from KSh 12,000 to KSh 110,000" is informative; "range = 98,000" is not.' },
      ],
    },

    /* ════════════════════ 4. STANDARD DEVIATION ════════════════════ */
    {
      id: 'standard-deviation',
      title: 'Standard deviation — the workhorse spread measure',
      blocks: [
        { type: 'heading', level: 2, text: 'The average distance from the mean' },

        { type: 'definition', term: 'Standard deviation (SD or σ)',
          body: 'Roughly, the AVERAGE DISTANCE that each value sits away from the mean. Reported in the same units as the variable itself (years, KSh, marks). A small SD means values cluster tightly around the mean; a large SD means they are spread widely. Symbol: σ (sigma) for a population, s or SD for a sample.' },

        { type: 'analogy', title: 'A team running a relay race',
          body: 'Imagine a team of 5 runners. The mean finishing time is 60 seconds. If they finish at 58, 59, 60, 61, 62 — they are tightly bunched (SD ≈ 1.6 seconds). If they finish at 30, 45, 60, 75, 90 — they are wildly spread out (SD ≈ 23.7 seconds). The mean tells you the centre. The SD tells you how bunched-up the runners were around that centre.' },

        { type: 'heading', level: 3, text: 'Computing SD by hand — once, slowly, to build intuition' },

        { type: 'workedExample', title: 'SD for five test scores: 65, 68, 70, 72, 75',
          body: [
            { label: 'Step 1 — Compute the mean',
              text: 'Mean = (65 + 68 + 70 + 72 + 75) ÷ 5 = 350 ÷ 5 = **70**.' },
            { label: 'Step 2 — Compute the deviation of each score from the mean',
              text: '65 − 70 = **−5**. 68 − 70 = **−2**. 70 − 70 = **0**. 72 − 70 = **+2**. 75 − 70 = **+5**.' },
            { label: 'Step 3 — Square each deviation',
              text: 'We square so the negatives become positives (otherwise the sum would always be 0). (−5)² = 25. (−2)² = 4. (0)² = 0. (2)² = 4. (5)² = 25. Sum = 25 + 4 + 0 + 4 + 25 = **58**.' },
            { label: 'Step 4 — Divide by (n − 1) — this gives the variance',
              text: 'For a sample of 5, we divide by 5 − 1 = 4. Variance = 58 ÷ 4 = **14.5**. (We use n − 1 not n — this is called Bessel\'s correction; it gives a slightly more accurate estimate of the population variance.)' },
            { label: 'Step 5 — Take the square root — this gives the SD',
              text: 'SD = √14.5 = **3.81**. So the standard deviation is 3.81 marks. The values cluster within roughly ±3.81 of the mean of 70.' },
          ]},

        { type: 'paragraph', text:
          'You will never compute SD by hand for your thesis — SPSS does it instantly. But having done it once, the formula stops being a mystery. SD really is just "the typical distance from the mean", with a couple of mathematical adjustments to make it well-behaved.' },

        { type: 'reveal',
          prompt: 'Class A scores: 65, 68, 70, 72, 75 (computed SD = 3.81). Class B scores: 30, 50, 70, 90, 110. What do you predict — bigger or smaller SD for Class B?',
          answer: '**Much bigger.** The Class B scores deviate from the mean of 70 by −40, −20, 0, +20, +40. The deviations are 8× larger than in Class A, so the SD will be roughly 8× larger too. (Computing: variance = (1600 + 400 + 0 + 400 + 1600) ÷ 4 = 1000. SD = √1000 ≈ 31.6.) This is exactly the situation in Figure 1 — same mean, dramatically different SD.' },
      ],
    },

    /* ════════════════════ 5. VARIANCE ════════════════════ */
    {
      id: 'variance',
      title: 'Variance — the cousin of SD that no-one reports',
      blocks: [
        { type: 'heading', level: 2, text: 'Variance is SD squared' },

        { type: 'definition', term: 'Variance (s² or σ²)',
          body: 'The MEAN of the squared deviations from the mean. Mathematically equivalent to SD² — if SD = 3.81, then variance = 14.5. Reported in squared units (years², KSh², marks²) which makes it harder to interpret intuitively.' },

        { type: 'paragraph', text:
          'You almost NEVER report variance directly in a thesis. You report SD. Variance lives behind the scenes — it appears in ANOVA tables, in regression diagnostics, in factor analysis output — but for descriptive statistics in Chapter 4, SD is the front-of-house number.' },

        { type: 'callout', tone: 'info', title: 'Why use SD instead of variance for reporting?',
          body: '**Units.** SD is in the same units as your variable (KSh, years, marks). Variance is in SQUARED units (KSh², years², marks²) — which most people cannot interpret intuitively. A standard deviation of KSh 18,000 is meaningful; a variance of 324,000,000 KSh² is just a big number.' },

        { type: 'mistake',
          title: 'Reporting variance instead of SD in your write-up',
          body: 'Your Chapter 4 says "the variance of age was 82.81 years²". Examiners and readers stare at the squared-years and wonder what to do with it.',
          fix: 'For descriptive reporting, always use SD. Variance only goes into your write-up when it is part of an inferential test (e.g. an ANOVA where SPSS shows you Between-Groups Variance and Within-Groups Variance). For Chapter 4 descriptives, report SD.' },
      ],
    },

    /* ════════════════════ 6. INTERQUARTILE RANGE ════════════════════ */
    {
      id: 'iqr',
      title: 'Interquartile range — the partner of the median',
      blocks: [
        { type: 'heading', level: 2, text: 'When you report the median, report the IQR' },

        { type: 'definition', term: 'Interquartile Range (IQR)',
          body: 'The range covered by the MIDDLE 50% of your data. Computed as Q3 (75th percentile) minus Q1 (25th percentile). Robust to outliers, just like the median. When you report the median (because data is skewed), report the IQR alongside it instead of SD.' },

        { type: 'illustration', component: 'BoxplotAnatomy',
          caption: 'Figure 2. The anatomy of a boxplot. The BOX itself spans Q1 to Q3 — the middle 50% of your data. The line inside the box is the median. The whiskers extend to the min and max (excluding outliers). The red dot is an outlier. The width of the box IS the IQR.' },

        { type: 'paragraph', text:
          'The IQR is to the median what the SD is to the mean — its standard companion. When you report a skewed variable using the median, the spread description switches from SD to IQR.' },

        { type: 'comparison',
          headers: ['Central tendency', 'Spread measure', 'When to use'],
          rows: [
            ['**Mean**', '**SD** (and sometimes range)',  'Symmetric continuous data, no outliers.'],
            ['**Median**', '**IQR** (and sometimes range)', 'Skewed or outlier-rich data, ordinal variables.'],
            ['**Mode**', 'Range (or frequencies)',         'Nominal data.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'The pairing rule',
          body: '**Mean → SD.** **Median → IQR.** Never mix them. Reporting "median age 38, SD = 9.1" is a contradiction; if you chose median, the partner is IQR. Reporting "mean income KSh 47,500, IQR = KSh 32,000–71,500" is similarly mismatched; if you reported the mean, you partner it with SD.' },

        { type: 'reveal',
          prompt: 'Your income variable is positively skewed. You decide to report the median (KSh 49,000). What is the correct spread statistic to pair with it?',
          answer: '**The Interquartile Range (IQR).** Reported as either a single number (IQR = KSh 39,500) or, more informatively, as the actual Q1 and Q3 values: *"Median monthly income was KSh 49,000, with the middle 50% of respondents earning between KSh 32,000 (Q1) and KSh 71,500 (Q3)."* The IQR is robust to outliers in the same way the median is — they make a coherent pair. Reporting median with SD is a methodological inconsistency.' },
      ],
    },

    /* ════════════════════ 7. EMPIRICAL RULE ════════════════════ */
    {
      id: 'empirical-rule',
      title: 'The 68-95-99.7 rule — making SD intuitive',
      blocks: [
        { type: 'heading', level: 2, text: 'A useful approximation for normal data' },

        { type: 'paragraph', text:
          'For any approximately normal (bell-shaped) distribution, there is a beautiful rule of thumb that lets you interpret SD intuitively. It is called the **empirical rule** or the **68-95-99.7 rule**, and it works because of the mathematical properties of the normal distribution.' },

        { type: 'illustration', component: 'EmpiricalRule',
          caption: 'Figure 3. The empirical rule. About 68% of cases fall within ±1 SD of the mean. About 95% fall within ±2 SD. About 99.7% fall within ±3 SD. Anything beyond ±3 SD is rare — about 3 in 1,000.' },

        { type: 'comparison',
          headers: ['Range', 'Percentage of cases', 'What it means'],
          rows: [
            ['Mean ± 1 SD', '~68%',     'About two-thirds of your sample lives within 1 SD of the mean.'],
            ['Mean ± 2 SD', '~95%',     'The vast majority of your sample lives within 2 SD.'],
            ['Mean ± 3 SD', '~99.7%',   'Almost everyone. Values beyond ±3 SD are rare outliers.'],
          ]},

        { type: 'heading', level: 3, text: 'Using the rule in practice' },

        { type: 'paragraph', text:
          'Suppose your sample of 200 workers has a mean monthly income of KSh 50,000 with SD = KSh 10,000. The empirical rule tells you:' },

        { type: 'list', items: [
          'About **136 workers (68%)** earn between KSh 40,000 and KSh 60,000 (within 1 SD).',
          'About **190 workers (95%)** earn between KSh 30,000 and KSh 70,000 (within 2 SD).',
          'Almost **all 200 workers (99.7%)** earn between KSh 20,000 and KSh 80,000 (within 3 SD).',
          'If you find someone earning KSh 95,000, they are more than 4 SD above the mean — a clear outlier.',
        ]},

        { type: 'callout', tone: 'gold', title: 'A free outlier detector',
          body: 'Any value more than ±3 SD from the mean is statistically rare in normal data. SPSS uses this as one of its outlier-detection rules. After getting your mean and SD, take a moment to identify which (if any) values lie beyond ±3 SD — those are your outliers and they deserve investigation before any further analysis.' },

        { type: 'callout', tone: 'warning', title: 'The rule only works for approximately normal data',
          body: 'The 68-95-99.7 rule assumes a roughly bell-shaped distribution. If your data is heavily skewed, the rule does not apply — you might find 90% of cases bunched within ±1 SD on the short side, with a long tail extending way past ±3 SD. Always check skewness before applying the rule.' },
      ],
    },

    /* ════════════════════ 8. RUNNING IT IN SPSS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Getting SD, variance, and IQR in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'Three menu paths, again' },

        { type: 'paragraph', text:
          'You already met these in Lesson 2 (for mean/median/mode). Here is what each gives you for spread.' },

        { type: 'comparison',
          headers: ['Menu path', 'Gives you', 'Best for'],
          rows: [
            ['**Analyze → Descriptive Statistics → Frequencies → Statistics**', 'Tick Std deviation, Variance, Range, Minimum, Maximum.', 'Ordinal variables and small categorical sets where you also want the frequency table.'],
            ['**Analyze → Descriptive Statistics → Descriptives**', 'Mean, SD, Min, Max by default. Click Options for Variance, Range, Kurtosis, Skewness.', 'Many continuous variables at once. Compact summary table.'],
            ['**Analyze → Descriptive Statistics → Explore**', 'Mean, 5% Trimmed Mean, Median, **Variance, SD, Min, Max, Range, IQR**, Skewness, Kurtosis — all in one rich table.', '**Thesis-quality reporting.** This is the menu to use when writing Chapter 4.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Use Explore for Chapter 4',
          body: 'For your descriptive statistics chapter, **Explore is the best menu**. It gives you every measure of central tendency AND every measure of spread in one go, plus skewness and kurtosis for interpreting shape. It also produces histograms and Q-Q plots if you tick the Plots option — perfect for justifying your choice of mean vs median.' },

        { type: 'heading', level: 3, text: 'Running Explore — step by step' },

        { type: 'steps', steps: [
          { title: 'Open Explore',
            body: 'Analyze → Descriptive Statistics → Explore.' },
          { title: 'Move continuous variables to Dependent List',
            body: 'Move age, income, satisfaction_total, etc. Leave Factor List empty unless you want statistics split by a group like gender.' },
          { title: 'Click Statistics — leave at "Descriptives" (the default)',
            body: 'The Descriptives option is what gives you the rich table with mean, SD, IQR, etc. Leave it ticked. Click Continue.' },
          { title: 'Click Plots',
            body: 'Tick **Histogram** under "Descriptive". Tick **Normality plots with tests** if you want Shapiro-Wilk to test normality. Click Continue.' },
          { title: 'Click OK',
            body: 'For every variable you get a comprehensive Descriptives table plus optional histograms and normality tests. This single run gives you everything you need for a Chapter 4 descriptives section.' },
        ]},
      ],
    },

    /* ════════════════════ 9. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing dispersion for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The four-element sentence, completed' },

        { type: 'paragraph', text:
          'In Lesson 2 you saw the four-element sentence pattern: **measure + value + unit + spread**. Now you can fill in the spread element properly.' },

        { type: 'heading', level: 3, text: 'Template — symmetric variable, mean + SD' },

        { type: 'apa', text:
          'The mean [variable] was [X.X] [unit] (SD = [Y.Y]), ranging from [min] to [max].' },

        { type: 'apa', text:
          'The mean age of respondents was 38.4 years (SD = 9.1), ranging from 22 to 61 years.' },

        { type: 'heading', level: 3, text: 'Template — skewed variable, median + IQR' },

        { type: 'apa', text:
          'Because the [variable] distribution was [positively/negatively] skewed (skewness = [Z.ZZ]), the median is reported as the more representative measure. Median [variable] was [X] [unit], with an interquartile range of [Q1] to [Q3].' },

        { type: 'apa', text:
          'Because the income distribution was positively skewed (skewness = +1.34), the median is reported as the more representative measure. Median monthly household income was KSh 49,000, with an interquartile range of KSh 32,000 to KSh 71,500.' },

        { type: 'heading', level: 3, text: 'A complete descriptives table for Chapter 4' },

        { type: 'comparison',
          headers: ['Variable', 'N', 'Mean', 'SD', 'Min', 'Max', 'Skewness'],
          rows: [
            ['Age (years)',                '198', '38.4',     '9.1',  '22',     '61',     '+0.31'],
            ['Years of experience',         '196', '8.7',      '6.4',  '0',      '32',     '+1.12'],
            ['Monthly income (KSh)',        '189', '47,500',  '18,200','12,000','110,000','+1.34'],
            ['Job satisfaction (scale 10-50)', '197', '34.8',  '7.2',  '14',    '49',     '−0.42'],
          ]},

        { type: 'callout', tone: 'success', title: 'How examiners read this table',
          body: [
            '**They scan the N column** to check for inconsistent missing data — and notice that income has the most missing (189 vs 198), prompting a methodological question they will ask.',
            '**They compare Mean and Median visually** — when Mean is high and Skewness is positive, they wonder whether you should have reported median instead.',
            '**They check Min and Max** for plausibility — an age of 11 or income of negative ten thousand would suggest a data-entry error you missed.',
            '**They check Skewness** — values between −1 and +1 suggest approximately normal; outside that range suggests reporting median.',
            'Tables like this answer four questions before they are asked. Always include one in Chapter 4.',
          ]},

        { type: 'reviewerComments',
          items: [
            { q: 'Why did you report SD rather than IQR for age?',
              a: 'The age variable was approximately normally distributed (skewness = +0.31, within the conventional ±1 threshold for normality), so the mean and SD were appropriate. For income, which had skewness = +1.34, I reported median and IQR instead — this is documented in Section 4.2 of Chapter 4.' },
            { q: 'How did you check whether your data is normal enough for mean and SD?',
              a: 'I used Analyze → Descriptive Statistics → Explore, which provides skewness, kurtosis, the Shapiro-Wilk test of normality, and a histogram. For each variable I confirmed that skewness was within ±1 and inspected the histogram visually. Where these criteria failed, I switched to reporting median and IQR.' },
          ]},
      ],
    },

    /* ════════════════════ 10. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'heading', level: 2, text: 'What you should now be able to do' },

        { type: 'summary', items: [
          'Explain that two variables can have the same mean but completely different spread — and that reporting only the mean hides this.',
          'Define SD as roughly "the average distance values sit from the mean", expressed in the same units as the variable.',
          'Compute SD by hand on a small dataset: deviations → square → average → square root.',
          'Recognise variance as SD² — used in inferential tests, but rarely reported directly in Chapter 4.',
          'Choose IQR over SD when reporting the median (because the data is skewed) — match the spread to the central tendency.',
          'Apply the 68-95-99.7 empirical rule to interpret SD intuitively for approximately normal data.',
          'Use Explore as your default Chapter 4 menu — it gives you mean, median, SD, IQR, skewness, normality tests, and histograms in one rich output.',
          'Write up dispersion using the four-element APA pattern: measure + value + unit + spread.',
          'Build a complete Chapter 4 descriptives table with N, Mean, SD, Min, Max, Skewness for every continuous variable.',
          'Avoid the four mistakes — reporting variance instead of SD, reporting range as a single number, mixing mean with IQR, omitting SD entirely.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 4: Producing graphs & charts** — the final lesson of Descriptive Statistics — we tackle the SPSS Chart Builder and learn how to produce publishable bar charts, histograms, boxplots, and scatter plots for every variable type. By the end of Lesson 4 your Chapter 4 will have both the tables AND the figures examiners expect.' },

        { type: 'paragraph', text:
          'Before moving on, run Explore on three of your continuous variables. For each one, look at the Mean, the SD, the 5% Trimmed Mean, the Median, the IQR, and the Skewness in the output table. Write one sentence using the four-element pattern. Decide for each variable whether you should report mean+SD or median+IQR. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'heading', level: 2, text: 'Six quick questions' },

        { type: 'check',
          question: 'Why is reporting only the mean of a variable considered incomplete?',
          choices: [
            'The mean is always wrong',
            'Because two variables can have the same mean but completely different spread — you need a measure of dispersion (SD or IQR) alongside the mean',
            'Because SPSS does not compute the mean correctly',
            'Because examiners hate the mean',
          ],
          answer: 1,
          explanation: 'Two classes with mean 70 can be wildly different — Class A clustered tightly (SD = 5), Class B spread wide (SD = 20). Without a measure of spread, the mean tells only half the story. Every reported mean must be paired with SD (for symmetric data) or with IQR (when reporting the median for skewed data).' },

        { type: 'check',
          question: 'In plain English, what does standard deviation measure?',
          choices: [
            'The largest value in the data',
            'Roughly the average distance values sit from the mean, in the same units as the variable',
            'The number of cases in the dataset',
            'Half the range',
          ],
          answer: 1,
          explanation: 'SD is roughly the average distance from the mean. If the SD of age is 9.1 years, the typical person is about 9 years above or below the mean age. This makes SD intuitive to interpret because it is expressed in the original units (years, KSh, marks).' },

        { type: 'check',
          question: 'You reported the median income because the distribution was positively skewed. Which spread measure should partner with the median?',
          choices: [
            'Standard deviation',
            'Variance',
            'Interquartile range (IQR)',
            'The range (max − min)',
          ],
          answer: 2,
          explanation: '**Mean pairs with SD. Median pairs with IQR.** The IQR (Q3 − Q1) describes the middle 50% of cases and is robust to outliers — the same way the median is. Reporting median with SD is a methodological inconsistency examiners spot immediately.' },

        { type: 'check',
          question: 'Your test scores have Mean = 70 and SD = 10. According to the 68-95-99.7 rule, what proportion of pupils scored between 60 and 80?',
          choices: ['About 50%', 'About 68%', 'About 95%', 'All of them'],
          answer: 1,
          explanation: 'The 68-95-99.7 rule says about 68% of cases fall within ±1 SD of the mean for an approximately normal distribution. Mean ± 1 SD = 70 ± 10 = the range 60 to 80. So about 68% of pupils scored in that range. (95% scored between 50 and 90; 99.7% between 40 and 100.)' },

        { type: 'check',
          question: 'Which menu in SPSS gives you mean, median, SD, IQR, skewness, AND histograms all in one analysis — best for Chapter 4 work?',
          choices: [
            'Analyze → Descriptive Statistics → Frequencies',
            'Analyze → Descriptive Statistics → Descriptives',
            'Analyze → Descriptive Statistics → Explore',
            'Analyze → Compare Means',
          ],
          answer: 2,
          explanation: '**Explore** is the richest descriptive menu — it gives you mean, 5% Trimmed Mean, median, variance, SD, min, max, range, IQR, skewness, kurtosis, plus Shapiro-Wilk normality tests and histograms. One menu, complete output. Use it as your default for Chapter 4.' },

        { type: 'check',
          question: 'Which write-up is most professional?',
          choices: [
            '"Mean age = 38.4"',
            '"Mean age of respondents was 38.4 years (SD = 9.1), ranging from 22 to 61 years."',
            '"Average age was around 38, with some spread."',
            '"The variance of age was 82.81 years²."',
          ],
          answer: 1,
          explanation: 'Option B hits all four elements of the APA sentence: measure (mean), value (38.4), unit (years), spread (SD = 9.1), plus the range (22-61). Option A omits units and spread. Option C is vague. Option D reports variance in squared units, which is hard to interpret — always use SD for descriptive reporting.' },
      ],
    },
  ],
};
