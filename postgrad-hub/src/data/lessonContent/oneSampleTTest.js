/**
 * T-Tests · Lesson 3 — One-Sample t-test
 * Comparing a sample mean to a known constant.
 */

export const ONE_SAMPLE_TTEST_LESSON = {
  id: 'ttest-3',
  title: 'One-sample t-test',
  subtitle: 'Module 03 · Course: T-Tests · Lesson 3 of 3',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When you compare YOUR sample to a known number',
      blocks: [
        { type: 'scene', body: [
          'You are doing a Master\'s study in public health at Moi University. The Kenya Demographic and Health Survey reports that the average systolic blood pressure of adult women in Kenya is **122 mmHg**. You sampled 45 women from a refugee settlement in Kakuma and measured their blood pressure. Your sample\'s mean came out at **129.4 mmHg, SD = 14.2**.',
          'You want to know: **is the Kakuma sample\'s blood pressure SIGNIFICANTLY higher than the national average of 122?** You only have ONE sample, not two. You don\'t want to compare two groups of your own — you want to compare your ONE group to a known constant published by the Ministry of Health.',
          'This is exactly what the **one-sample t-test** does. It is the simplest of the three t-tests but easily the most under-used. Whenever you need to compare your sample\'s mean to a benchmark (a population mean from an official report, a budget target, an industry standard, a hypothesised value), this is the test. This lesson teaches you when to reach for it and how to use it cleanly.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise** the one-sample t-test situation — one sample, one continuous outcome, one external benchmark number.',
            '**Distinguish** it cleanly from the independent and paired versions.',
            '**Find a sensible test value** from official reports, prior studies, or hypothesised norms.',
            '**Run** the test in SPSS via Analyze → Compare Means → One-Sample T Test.',
            '**Read** the two output tables and explain what the t-statistic represents here.',
            '**Compute and report** Cohen\'s d for a one-sample test (a slightly different formula).',
            '**Write up** the result in APA style with all the elements examiners want.',
          ]},

        { type: 'why', body:
          'Whenever official Kenyan statistics exist (KNBS, KDHS, KEMSA, MoH, UNESCO, World Bank, county profiles) you have a ready benchmark to test your own sample against. Master this test and you can frame your thesis as "does my population differ from the national norm?" — a question examiners love.' },
      ],
    },

    /* ════════════════════ 1.5 WHAT/WHY/WHERE/WHEN — beginner-first primer ════════════════════ */
    {
      id: 'wwww',
      title: 'What / Why / Where / When — read THIS first',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'Before you touch the SPSS dialog, understand: (1) What this t-test IS, (2) Why you use it instead of alternatives, (3) Where a Kenyan postgraduate would use it, (4) When to CHOOSE it.',
            'The WWWW card and key-terms callout below answer all 4 in 3 minutes.',
          ]},

        { type: 'illustration', component: 'KiambuOstWWWW',
          caption: 'Figure 0. One-Sample T-Test WHAT/WHY/WHERE/WHEN reference card using the Kiambu Maize case study. Compares Kiambu yield to the national benchmark of 1,750 kg/acre.' },

        { type: 'callout', tone: 'brand', title: 'Key terms you will meet in the walkthrough',
          body: [
            '**Test Value** — the benchmark you compare your sample mean against. Must come from a credible source (ministry stats, published study, policy target).',
            '**t-statistic** — how many standard errors your sample mean is FROM the test value. Big |t| = big difference. Sign tells direction (positive = sample > test value, negative = below).',
            '**df (degrees of freedom)** — always N minus 1 for one-sample t-test.',
            '**Sig.(2-tailed)** — the p-value. Below .05 = significantly different from the test value.',
            '**Mean Difference** — sample mean minus test value. Machakos example: -113.33 means Kiambu is 113 kg BELOW the national benchmark.',
            '**95% CI** — the range likely to contain the TRUE mean difference. If it does NOT include 0, the difference is significant.',
          ]},
      ],
    },

    /* ════════════════════ 2. BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — one sample, one number',
      blocks: [
        { type: 'heading', level: 2, text: 'How the one-sample t differs from the others' },

        { type: 'paragraph', text:
          'The independent-samples t-test compares the means of two DIFFERENT groups (e.g. men vs women). The paired-samples t-test compares two RELATED measurements (e.g. before vs after on the same people). The one-sample t-test compares ONE group\'s mean to a FIXED constant — a number you bring in from outside the dataset (e.g. the national average from a published report).' },

        { type: 'illustration', component: 'OneSampleTTestLogic',
          caption: 'Figure 1. The one-sample t-test compares your sample\'s mean to a known constant (μ₀). The dot represents your sample mean; the dashed vertical line is the test value (e.g. 122). The t-statistic asks: how many standard errors separate your sample mean from the test value? Far away = significant difference.' },

        { type: 'definition', term: 'One-sample t-statistic',
          body: 'The number of standard errors that separate your sample mean from the test value: **t = (M − μ₀) ÷ (SD ÷ √n)**, where M is your sample mean, μ₀ is the test value (the constant), SD is your sample standard deviation, and n is your sample size. SPSS converts t into a p-value using df = n − 1.' },

        { type: 'analogy', title: 'The boda-boda fare benchmark',
          body: 'Kenya\'s NTSA publishes that the average boda-boda fare for a 5-km city ride is KES 120. You survey 40 riders in Eldoret and find an average fare of KES 145, SD = 28. Is Eldoret really pricier than the national average, or could the difference (KES 25) just be sampling variation in your 40 riders? The one-sample t-test compares your 40-rider average to the published KES 120 benchmark and tells you whether the gap is bigger than chance would predict.' },

        { type: 'reveal',
          prompt: 'Why can\'t you just compare M = 145 to the benchmark of 120 and say "they\'re different"?',
          answer: '**Because any single sample of 40 riders will, by pure chance, give a slightly different mean every time you re-sample.** The question is not "are M and μ₀ exactly equal?" — they will essentially never be. The question is "is the GAP between them BIGGER than the random sampling fluctuation would produce?" The one-sample t-test formalises this: it converts the gap into standard-error units (t) and computes how unlikely a gap that big would be if the true population mean really were 120. Small p = the gap is unlikely under chance = the Eldoret population probably really does differ from the national benchmark.' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When the one-sample t-test is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The three telltale signs' },

        { type: 'steps', steps: [
          { title: 'You have ONE sample (no comparison group inside your data)',
            body: 'You only collected from one group of people. You are NOT comparing two groups of your own (that would be independent-samples), and you have NOT measured the same people twice (that would be paired).' },
          { title: 'Your outcome is CONTINUOUS',
            body: 'Y must be Scale (blood pressure, fare, weight, score, income, time). For binary outcomes use a binomial test or chi-square goodness-of-fit; for ordinal outcomes use a Wilcoxon signed-rank test against a hypothesised median.' },
          { title: 'You have a SENSIBLE TEST VALUE from outside your data',
            body: 'The test value is a published population mean, a budget figure, an industry standard, a regulatory threshold, or a hypothesised norm. It does NOT come from your own dataset. Examples: KDHS national mean blood pressure, KNBS county poverty rate, ministry hand-washing target, prior study\'s mean score.' },
        ]},

        { type: 'comparison',
          headers: ['Situation', 'Groups in your data', 'Right test'],
          rows: [
            ['Compare your sample\'s mean BP to KDHS national figure (122)',     '1 sample',           '**One-sample t-test (this lesson)**'],
            ['Compare your sample\'s mean income to the county poverty line',     '1 sample',           '**One-sample t-test**'],
            ['Compare your sample\'s mean exam score to the prior cohort\'s mean','1 sample (constant)','**One-sample t-test**'],
            ['Compare your urban vs rural respondents on a stress score',         '2 independent groups','Independent-samples t-test'],
            ['Compare your 30 patients before vs after treatment',                '2 paired conditions',  'Paired-samples t-test'],
            ['Compare urban, rural, and refugee samples',                         '3 independent groups', 'One-way ANOVA'],
          ]},

        { type: 'callout', tone: 'warning', title: 'The test value must be JUSTIFIED, not made up',
          body: 'Your examiner will ask "where did the test value 122 come from?" You must be able to point to a published source — Kenya Demographic and Health Survey 2022, p.45; KNBS Economic Survey 2023, Table 8.4; etc. Inventing a round number ("we tested against 120 because it seemed reasonable") is a defence killer. Always cite the source of the test value in your methods chapter.' },
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running it in SPSS — the 5-step click path',
      blocks: [
        { type: 'heading', level: 2, text: 'The simplest t-test dialog of all' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → Compare Means → One-Sample T Test.' },
          { title: 'Move your outcome to Test Variable(s)',
            body: 'The continuous variable you want to test (e.g. **systolic_bp**). You can include several outcomes at once — SPSS runs a separate one-sample test for each against the same test value.' },
          { title: 'Type the Test Value at the bottom',
            body: 'This is the constant you are comparing against (e.g. **122**). It defaults to 0 — change it to the value justified by your source. Use the actual number, not a placeholder.' },
          { title: 'Click Options (optional)',
            body: 'Leave Confidence Interval at 95%. Pick "Exclude cases analysis by analysis" for Missing Values. Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces two tables: **One-Sample Statistics** (your sample\'s M, SD, n, SE) and **One-Sample Test** (the t, df, p-value, mean difference from test value, and 95% CI of that difference).' },
        ]},

        { type: 'illustration', component: 'OneSampleTTestDialog',
          caption: 'Figure 2. The One-Sample T Test dialog. Test Variable(s) = your continuous outcome (systolic_bp). Test Value = the constant from your reference source (122 in this example). Default test value is 0 — almost never what you want, always type your actual benchmark.' },
        { type: 'illustration', component: 'KiambuOstDialog',
          caption: 'Figure 1. The One-Sample T Test dialog set up for Kiambu Maize. Yield_KgPerAcre is the Test Variable; 1750 (the national average per the Ministry of Agriculture) is the Test Value. The Options button lets you change the confidence level (default 95%).' },

        { type: 'illustration', component: 'KiambuOstOutput',
          caption: 'Figure 2. The output. Descriptives table (top) confirms N=180, Mean=1636.67, SD=443.21. Test table (bottom) shows t = -3.43, df = 179, p = .001, Mean Difference = -113.33, 95% CI [-178.51, -48.15]. Kiambu produces significantly LESS than the national benchmark. Chapter-4 write-up template in the gold callout.' },

      ],
    },

    /* ════════════════════ 5. ASSUMPTIONS ════════════════════ */
    {
      id: 'assumptions',
      title: 'Assumptions',
      blocks: [
        { type: 'heading', level: 2, text: 'Two things to check' },

        { type: 'steps', steps: [
          { title: 'CONTINUOUS outcome',
            body: 'Y is Scale (interval or ratio). Not ordinal, not binary.' },
          { title: 'APPROXIMATELY NORMAL outcome (or n large enough)',
            body: 'Run Shapiro-Wilk on your outcome (Analyze → Descriptive Statistics → Explore → tick Normality plots with tests). If Shapiro-Wilk p > .05 normality is met. If n ≥ 30 the test is robust to mild non-normality (Central Limit Theorem). If small n and badly non-normal, switch to **Wilcoxon signed-rank** comparing to your hypothesised median.' },
        ]},

        { type: 'callout', tone: 'gold', title: 'No Levene\'s, no pairing assumption',
          body: 'Because there is only ONE sample, there is no second group whose variance you could compare against — Levene\'s test does not exist in this output. And because no participant is measured twice, there is no pairing assumption either. The one-sample test is the cleanest of the three.' },
      ],
    },

    /* ════════════════════ 6. READING OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the SPSS output',
      blocks: [
        { type: 'heading', level: 2, text: 'The two output tables' },

        { type: 'illustration', component: 'OneSampleTTestOutput',
          caption: 'Figure 3. The One-Sample Test output. The "Test Value = 122" caption confirms you used the right benchmark. The key columns: t (the t-statistic), df = n − 1, Sig. (2-tailed) = your p-value, Mean Difference = M − μ₀ (your sample mean minus the test value), and the 95% CI of that difference. If the CI excludes zero the difference is significant.' },

        { type: 'heading', level: 3, text: 'Table 1 — One-Sample Statistics' },

        { type: 'comparison',
          headers: ['Column', 'What it shows'],
          rows: [
            ['**N**',               'Your sample size.'],
            ['**Mean**',            'Your sample mean (M). The headline number.'],
            ['**Std. Deviation**',  'SD of your sample. Reported alongside the mean.'],
            ['Std. Error Mean',     'SD ÷ √n. Precision of your sample mean (used as the denominator of t).'],
          ]},

        { type: 'heading', level: 3, text: 'Table 2 — One-Sample Test (caption shows Test Value)' },

        { type: 'comparison',
          headers: ['Column', 'What it shows'],
          rows: [
            ['**t**',                        'The t-statistic = (Mean − Test Value) ÷ Std. Error Mean.'],
            ['**df**',                       'Degrees of freedom = n − 1.'],
            ['**Sig. (2-tailed)**',         'Your p-value. If < .05 the sample mean differs significantly from the test value.'],
            ['**Mean Difference**',         'M − μ₀ (e.g. 129.4 − 122 = +7.4). Direction matters: positive = sample > benchmark; negative = sample < benchmark.'],
            ['**95% CI of the Difference (Lower / Upper)**', 'Plausible range for the true population mean MINUS the test value. If this CI excludes 0 the difference is significant.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'The CI is on the DIFFERENCE, not on the sample mean',
          body: 'A common confusion: the 95% CI in the One-Sample Test table is the confidence interval for (population mean − test value), NOT for the sample mean itself. So a CI of [3.13, 11.67] means we are 95% confident the true population mean is between 3.13 and 11.67 ABOVE the test value (i.e. between 125.13 and 133.67 mmHg). Since 0 is not inside [3.13, 11.67], the difference is significant.' },

        { type: 'reveal',
          prompt: 'Your output shows: N = 45, Mean = 129.4, SD = 14.2; Mean Difference = 7.40, 95% CI [3.13, 11.67], t = 3.49, df = 44, Sig. (2-tailed) = .001. What do you conclude?',
          answer: '**The Kakuma women\'s mean systolic BP (M = 129.4, SD = 14.2) is significantly higher than the national KDHS benchmark of 122 mmHg.** Report: t(44) = 3.49, p = .001, mean difference = 7.40 mmHg (95% CI [3.13, 11.67]). The 95% CI does NOT include zero, confirming significance — we are 95% confident the true population mean for Kakuma women is between 3.13 and 11.67 mmHg above the national average. Next: compute Cohen\'s d to express the magnitude of this gap.' },
      ],
    },

    /* ════════════════════ 7. EFFECT SIZE ════════════════════ */
    {
      id: 'effect-size',
      title: 'Effect size for a one-sample t-test',
      blocks: [
        { type: 'heading', level: 2, text: 'Cohen\'s d for one-sample tests' },

        { type: 'definition', term: 'Cohen\'s d (one-sample version)',
          body: '**d = (M − μ₀) ÷ SD**, where M is your sample mean, μ₀ is the test value, and SD is your sample standard deviation. It expresses the difference between your sample mean and the benchmark in standard-deviation units. Same Cohen benchmarks: **0.2 small, 0.5 medium, 0.8 large**.' },

        { type: 'workedExample', title: 'Computing Cohen\'s d from the One-Sample Statistics table',
          body: [
            { label: 'Read the sample mean, SD, and test value',
              text: 'M = 129.4, SD = 14.2, test value μ₀ = 122.' },
            { label: 'Compute',
              text: 'd = (129.4 − 122) ÷ 14.2 = 7.40 ÷ 14.2 = **0.52**.' },
            { label: 'Interpret',
              text: 'd = 0.52 is just above Cohen\'s 0.5 medium-effect benchmark. The Kakuma sample mean sits about half a standard deviation above the national norm — a meaningful elevation, not trivially small.' },
            { label: 'Report in APA',
              text: '"t(44) = 3.49, p = .001, d = 0.52 (medium effect)."' },
          ]},

        { type: 'callout', tone: 'gold', title: 'SPSS 27+ provides d automatically',
          body: 'On SPSS 27 and newer, look for the **One-Sample Effect Sizes** table at the bottom of your output — Cohen\'s d, Hedges\' correction, and 95% CI for the effect size are all listed. Use SPSS\'s value if you have it; the hand formula above gives the same number on older versions.' },
      ],
    },

    /* ════════════════════ 8. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — Kakuma blood pressure vs. KDHS benchmark',
      blocks: [
        { type: 'workedExample', title: 'A Master\'s study in public health at Moi University',
          body: [
            { label: 'The research question',
              text: 'Does the average systolic blood pressure of adult women in the Kakuma refugee settlement differ from the Kenyan national mean reported in the 2022 Kenya Demographic and Health Survey (122 mmHg)?' },
            { label: 'The design',
              text: 'Cross-sectional. n = 45 adult women, systematic sample within the settlement. Outcome: **systolic_bp** (continuous, mmHg). Test value: **122** (KDHS 2022, p.45).' },
            { label: 'Step 1 — Inspect descriptives',
              text: 'M = 129.4, SD = 14.2, n = 45. Visually higher than the benchmark of 122 by about 7 mmHg.' },
            { label: 'Step 2 — Check normality',
              text: 'Shapiro-Wilk on systolic_bp: W = .98, p = .42. NON-significant → outcome roughly normal → one-sample t-test is appropriate. (With n = 45 > 30 the test would have been robust anyway.)' },
            { label: 'Step 3 — Run the one-sample t-test',
              text: 'Analyze → Compare Means → One-Sample T Test → systolic_bp into Test Variable(s), Test Value = 122 → OK.' },
            { label: 'Step 4 — Read the output',
              text: 't(44) = 3.49, p = .001, Mean Difference = 7.40, 95% CI [3.13, 11.67]. CI excludes 0, so the difference is significant.' },
            { label: 'Step 5 — Compute Cohen\'s d',
              text: 'd = (129.4 − 122) ÷ 14.2 = 0.52 — medium effect.' },
            { label: 'Step 6 — APA write-up',
              text: '*"A one-sample t-test was conducted to compare the mean systolic blood pressure of adult women in the Kakuma refugee settlement (n = 45) against the Kenyan national mean of 122 mmHg reported in the 2022 Kenya Demographic and Health Survey. The sample mean (M = 129.4, SD = 14.2) was significantly higher than the national benchmark; t(44) = 3.49, p = .001, mean difference = 7.40 mmHg (95% CI [3.13, 11.67]), Cohen\'s d = 0.52, a medium-sized effect. Shapiro-Wilk indicated the outcome was approximately normally distributed (W = .98, p = .42). The findings suggest that adult women in this settlement experience elevated systolic blood pressure relative to the national average, with potential implications for cardiovascular screening and intervention in refugee health programmes."*' },
          ]},
      ],
    },

    /* ════════════════════ 9. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing the one-sample t-test up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A one-sample t-test was conducted to compare the mean [OUTCOME] of [SAMPLE description] (n = [n]) against [SOURCE OF TEST VALUE] of [μ₀] [units]. The sample mean (M = [M], SD = [SD]) was [significantly higher than / significantly lower than / not significantly different from] the benchmark; t([df]) = [t-value], p = [p-value], mean difference = [diff] (95% CI [[lower, upper]]), Cohen\'s d = [d-value], indicating a [small / medium / large] effect.' },

        { type: 'callout', tone: 'success', title: 'Six things every one-sample t-test write-up must include',
          body: '**1.** The test name and what was compared. **2.** The TEST VALUE and its source (e.g. KDHS 2022, KNBS 2023, ministry target). **3.** Sample size, mean, and SD. **4.** t with degrees of freedom. **5.** p-value, mean difference and 95% CI of the difference. **6.** Cohen\'s d with verbal interpretation. The single thing most students forget is citing where the test value came from.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why a one-sample t-test rather than an independent or paired t-test?',
              a: 'I had only one sample (45 women from the Kakuma settlement) and wanted to compare its mean systolic blood pressure to a single fixed benchmark from outside my data — the 2022 Kenya Demographic and Health Survey national figure of 122 mmHg. There were no two groups within my data to compare (independent-samples), and no repeated measurements on the same participants (paired-samples). The one-sample t-test is the correct framework for comparing a single sample mean to a known constant.' },
            { q: 'Where did the test value of 122 mmHg come from?',
              a: 'The Kenya Demographic and Health Survey (KDHS), 2022 edition, p.45, reports the national mean systolic blood pressure for adult women as 122 mmHg. I treated this published population estimate as the test value (μ₀) in my analysis. This is a methodologically sound source — KDHS is the standard nationally representative survey conducted by the Kenya National Bureau of Statistics in partnership with the Ministry of Health.' },
            { q: 'Did you check the normality assumption?',
              a: 'Yes — Shapiro-Wilk was non-significant (W = .98, p = .42), indicating the outcome was approximately normally distributed. Additionally, with a sample size of 45 (above the n ≥ 30 rule of thumb), the t-test is reasonably robust to mild departures from normality by virtue of the Central Limit Theorem.' },
          ]},
      ],
    },

    /* ════════════════════ 10. MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five common one-sample t-test mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Leaving the Test Value at 0',
          body: 'SPSS\'s default Test Value is 0. You forget to change it. The test now compares your sample mean (e.g. 129.4 mmHg) against zero. You get an astronomically significant p-value because of course the mean BP isn\'t 0 — and you have answered a question nobody asked.',
          fix: 'ALWAYS type your actual benchmark in the Test Value box. Double-check before clicking OK. And check the output caption ("Test Value = 122") to confirm SPSS used the right value.' },

        { type: 'mistake',
          title: 'Mistake 2 — Inventing a test value with no source',
          body: 'You write "we tested against 120 because that\'s about the normal mean for adults." Your examiner asks for the source. You have none. The test value loses all credibility and so does the analysis.',
          fix: 'Always justify the test value with a CITATION. Use KDHS, KNBS, KEMSA, WHO, MoH, a peer-reviewed prior study, or an established industry standard. Note the source in your methods chapter AND your discussion.' },

        { type: 'mistake',
          title: 'Mistake 3 — Using a one-sample t-test when you have two groups',
          body: 'You have urban and rural respondents in your sample. You compute their two means separately and run two one-sample t-tests against some external benchmark. You then claim "urban and rural differ".',
          fix: 'If your research question is whether two groups in your OWN data differ from each other, run an **independent-samples t-test** comparing the two groups directly. The one-sample test answers a different question (does each group differ from the external benchmark?) and cannot legitimately be used as a substitute for the between-groups comparison.' },

        { type: 'mistake',
          title: 'Mistake 4 — Misinterpreting the 95% CI as a CI on the sample mean',
          body: 'The output shows 95% CI [3.13, 11.67]. You write "we are 95% confident the population mean is between 3.13 and 11.67 mmHg." But the sample mean was 129.4, so a CI of [3.13, 11.67] is nonsensical for the BP itself.',
          fix: 'The 95% CI in the One-Sample Test table is for the (population mean − test value) — i.e. the DIFFERENCE from the benchmark. Interpret it accordingly: "the true population mean is between 3.13 and 11.67 mmHg ABOVE the benchmark of 122" (so between 125.13 and 133.67 in absolute terms).' },

        { type: 'mistake',
          title: 'Mistake 5 — Omitting effect size',
          body: 'With a large sample even a tiny departure from the benchmark becomes "significant". You report p = .001 and stop. The reader cannot tell whether the deviation is a clinically trivial 1 mmHg or a clinically meaningful 7 mmHg.',
          fix: 'Always report **Cohen\'s d = (M − μ₀) / SD** with the verbal interpretation (small / medium / large). For the Kakuma study d = 0.52 — medium effect, clinically relevant, not trivial.' },
      ],
    },

    /* ════════════════════ 11. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'One-sample t-test compares ONE sample\'s mean to a FIXED constant (a benchmark from outside your data).',
          'Use it whenever you want to test your sample against a published national mean, budget target, industry standard, or hypothesised value.',
          'The t-statistic = (sample mean − test value) ÷ standard error of the mean. df = n − 1.',
          'Assumptions: continuous outcome, approximately normal (or n ≥ 30 by CLT). No Levene\'s test, no pairing assumption.',
          'Run via Analyze → Compare Means → One-Sample T Test → drag your outcome into Test Variable(s), type your benchmark in Test Value, click OK.',
          'Always change the Test Value from the default 0 to your actual benchmark, and always cite the source.',
          'The 95% CI in the One-Sample Test table is on the DIFFERENCE (M − μ₀), not on the sample mean.',
          'Report t(df), p, Mean Difference, 95% CI, and Cohen\'s d = (M − μ₀) / SD.',
          'Effect-size benchmarks: 0.2 small, 0.5 medium, 0.8 large.',
          'Five mistakes to avoid: default Test Value of 0, no source for the benchmark, using it when two groups exist, misreading the CI, omitting effect size.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Course complete!',
          body: 'You\'ve now finished the **T-Tests** course — independent-samples, paired-samples, and one-sample. These three tests will carry you through the vast majority of two-condition comparisons in postgraduate research. Next time your data has three or more groups, jump to the **ANOVA** course. Next time your outcome is binary or your groups are tested with categorical data, the (forthcoming) Chi-square lesson is your friend.' },

        { type: 'paragraph', text:
          'Before moving on, find a continuous variable in your dataset and a credible external benchmark for it. Justify the benchmark with a citation, run the test, compute Cohen\'s d, and write the APA paragraph. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 12. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'You sampled 45 women in Kakuma and want to compare their mean BP to the KDHS national figure of 122 mmHg. Which test?',
          choices: [
            'Independent-samples t-test',
            'Paired-samples t-test',
            'One-sample t-test — one sample, one continuous outcome, one external benchmark',
            'One-way ANOVA',
          ],
          answer: 2,
          explanation: 'You have ONE sample (45 women) and want to compare its mean to a single FIXED value (122) coming from outside the data. That\'s the textbook one-sample t-test scenario. The independent-samples version would need two groups inside your data; the paired-samples version would need each person measured twice; ANOVA would need three or more groups.' },

        { type: 'check',
          question: 'In SPSS, you forgot to change the Test Value from its default. What value does SPSS use?',
          choices: [
            'The sample mean',
            'Zero (0) — almost never what you want',
            'The sample median',
            'The benchmark for the variable',
          ],
          answer: 1,
          explanation: 'The default Test Value in SPSS\'s One-Sample T Test dialog is 0. If you forget to change it, SPSS tests whether your sample mean differs from zero — which is almost always astronomically significant (a BP of 0 mmHg would mean death) and almost always not the question you wanted to answer. ALWAYS type your benchmark explicitly.' },

        { type: 'check',
          question: 'Your sample mean is 129.4 with a test value of 122. The Mean Difference in the output is 7.40, with 95% CI [3.13, 11.67]. What does the CI tell you?',
          choices: [
            'The sample mean is between 3.13 and 11.67',
            'The population mean is between 125.13 and 133.67 (= test value + the CI bounds), and because the CI excludes zero the difference from 122 is significant',
            'The test value is between 3.13 and 11.67',
            'p is between 3.13 and 11.67',
          ],
          answer: 1,
          explanation: 'The CI in the One-Sample Test output is on the DIFFERENCE (M − μ₀), not on the sample mean itself. CI of [3.13, 11.67] means we are 95% confident the true population mean is between 3.13 and 11.67 mmHg ABOVE the test value — i.e. between 125.13 and 133.67 in absolute BP terms. Because 0 is not inside [3.13, 11.67], the population mean significantly differs from the benchmark of 122.' },

        { type: 'check',
          question: 'You have a sample of 45 with M = 129.4, SD = 14.2, and test value 122. What is Cohen\'s d?',
          choices: [
            'd = SD / M = 14.2 / 129.4 = 0.11',
            'd = (M − μ₀) / SD = (129.4 − 122) / 14.2 = 7.40 / 14.2 = 0.52 — a medium effect',
            'd = n × p',
            'd = t / df',
          ],
          answer: 1,
          explanation: 'For a one-sample t-test, Cohen\'s d = (sample mean − test value) / sample SD. Here that\'s 7.40 / 14.2 = 0.52, just above the 0.5 medium-effect benchmark. The sample mean sits about half a standard deviation above the benchmark — a substantively meaningful elevation.' },

        { type: 'check',
          question: 'Your examiner asks "where did the test value of 122 come from?" What\'s the best answer?',
          choices: [
            '"It seemed like a reasonable round number."',
            '"From the Kenya Demographic and Health Survey, 2022 edition, page 45 — the published national mean systolic BP for adult women."',
            '"From a Google search."',
            '"I made it up to round things off."',
          ],
          answer: 1,
          explanation: 'The test value must be justified with a credible source — KDHS, KNBS, MoH, WHO, a peer-reviewed prior study. "Reasonable round number" or "Google" answers will sink your defence. Always cite the source of the test value in your methods chapter and be ready to defend it.' },

        { type: 'check',
          question: 'Which sentence is the most professional one-sample t-test report?',
          choices: [
            '"The t-test showed a difference."',
            '"p < .05 so the sample is different."',
            '"A one-sample t-test indicated that the mean systolic blood pressure of women in the Kakuma settlement (n = 45, M = 129.4, SD = 14.2) was significantly higher than the KDHS 2022 national mean of 122 mmHg; t(44) = 3.49, p = .001, mean difference = 7.40 mmHg (95% CI [3.13, 11.67]), Cohen\'s d = 0.52, a medium effect."',
            '"t was big."',
          ],
          answer: 2,
          explanation: 'Option C hits every element examiners want: names the test, identifies the sample and benchmark with its source, gives n / M / SD, t with df, p, mean difference with 95% CI, and Cohen\'s d with verbal interpretation. The other options are vague or missing critical components.' },
      ],
    },
  ],
};
