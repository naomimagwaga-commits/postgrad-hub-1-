/**
 * Pearson Correlation — fully fleshed out at proper teaching depth.
 * Voice: N. K. Magwaga's tutor-by-your-side voice (scenes, analogies, slow
 * "why before how", plain English then technical).
 * Coverage: everything a student needs to defend Pearson in a thesis viva.
 */

export const PEARSON_LESSON = {
  id: 'cor-1',
  title: 'Pearson correlation',
  subtitle: 'Module 03 · Course: Correlation Analysis · Lesson 1 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'Welcome and what you will learn',
      blocks: [
        { type: 'scene', body: [
          'Imagine you are a Master\'s student at the University of Nairobi. You have just finished collecting data from 120 secondary-school pupils. You wrote down two numbers for each pupil: how many hours they study per week, and the mark they got in their last mathematics test.',
          'You stare at the two columns of numbers. You suspect — like every teacher would — that pupils who study more should score higher. But "suspect" is not enough for your supervisor. She will ask you: *"How tightly are these two things linked? And how confident are you?"*',
          'The Pearson correlation coefficient is the single number that answers both questions at once. Learning to compute it, read it, and write about it is the focus of this lesson.',
        ]},

        { type: 'callout', tone: 'gold', title: 'By the end of this lesson you will be able to',
          body: [
            '**Explain in plain English** what r is, what it measures, and what it cannot tell you.',
            '**Decide for yourself** whether Pearson is the right test for any given pair of variables — or whether you should switch to Spearman, partial correlation, or regression.',
            '**Run it in SPSS** click-by-click without having to look anything up.',
            '**Read every number** in the SPSS Correlations output table — r, the asterisks, the p-value, the N — and explain each one out loud.',
            '**Write the result up in APA style** good enough to copy into Chapter 4 of your thesis.',
            '**Defend your choice** under examiner questioning — assumptions, limitations, alternatives.',
          ]},

        { type: 'why', body:
          'Pearson is the most-cited statistic in social science. It is also the most *misused*. Many theses get torn apart in the viva not because the student ran the wrong test, but because they could not explain *why* they ran it. This lesson is built so you never end up in that position.' },
      ],
    },

    /* ════════════════════ 2. WHAT IS A CORRELATION? ════════════════════ */
    {
      id: 'what-is-correlation',
      title: 'What "correlation" actually means',
      blocks: [
        { type: 'heading', level: 2, text: 'The intuition first, the maths later' },

        { type: 'paragraph', text:
          'Two things are *correlated* when they move together in a predictable way. When one goes up, the other tends to go up (or, less commonly, down). When one goes down, the other tends to do the same. Correlation is the science of measuring how tightly they move together.' },

        { type: 'analogy', title: 'The matatu and the rain',
          body: 'On a normal day in Nairobi, the moment heavy rain starts falling, matatu fares quietly creep up — and the longer the rain, the more they rise. Rain and fares move together. Nobody needs SPSS to see this; the *correlation* is obvious in everyday life. What SPSS gives you is a single, exact number that lets you say "yes, the link is strong" — or "actually, the link is weaker than I thought" — instead of guessing.' },

        { type: 'definition', term: 'Pearson product-moment correlation coefficient (r)',
          body: 'A single number, always between **−1 and +1**, that measures the strength and direction of the *straight-line* (linear) relationship between two continuous variables.' },

        { type: 'paragraph', text:
          'Three small words in that definition are doing all the heavy lifting. *Straight-line* means Pearson only sees patterns that fall along a line. *Continuous* means the variables must be numbers you could measure with a ruler or a stopwatch (height, income, exam score), not categories (yes/no, blue/red/green). And *two variables* means exactly two at a time — never three or more in a single Pearson calculation.' },

        { type: 'illustration', component: 'Scatter4',
          caption: 'Figure 1. Four scatter plots showing what different r values look like. Top-left: a strong positive relationship — as X goes up, Y goes up too, and the points cluster tightly around an imaginary upward line. Top-right: a strong negative relationship — as X goes up, Y goes down. Bottom-left: a weak positive trend with lots of scatter. Bottom-right: no relationship at all — the points are a cloud with no direction.' },

        { type: 'why', body:
          'Look at those four scatter plots and you have understood Pearson better than 80% of students who *only* learn the formula. Always plot your data first. Always.' },
      ],
    },

    /* ════════════════════ 3. THE r VALUE EXPLAINED ════════════════════ */
    {
      id: 'understanding-r',
      title: 'Reading the r value (sign and size)',
      blocks: [
        { type: 'heading', level: 2, text: 'Two pieces of information in one number' },

        { type: 'paragraph', text:
          'Every Pearson r value carries **two** separate pieces of information rolled together. You have to learn to read them separately, like reading the first name and the last name of a person.' },

        { type: 'twoCol',
          left: { title: 'The sign (+ or −) tells you DIRECTION',
            body: '**Positive (+)** means the two variables move in the *same* direction — both go up together. Example: hours of study and exam mark.\n\n**Negative (−)** means they move in *opposite* directions — when one goes up, the other goes down. Example: hours spent on social media and exam mark.' },
          right: { title: 'The number tells you STRENGTH',
            body: 'The absolute value (ignore the sign for a moment) tells you how *tight* the link is.\n\n**1.0** is a perfect link — knowing X tells you Y exactly.\n**0** is no link at all — knowing X tells you nothing about Y.\n**0.5** is a moderately tight link.' },
        },

        { type: 'heading', level: 3, text: 'Cohen\'s strength benchmarks (memorise these)' },

        { type: 'paragraph', text:
          'Jacob Cohen, an American psychologist, proposed in the 1980s a rough rule of thumb that the whole social science world now uses. You should commit it to memory because every examiner expects you to know it.' },

        { type: 'comparison',
          headers: ['Absolute value of r', 'Strength', 'Plain-English meaning'],
          rows: [
            ['|r| ≈ 0.10', 'Small / weak', 'A real but very faint link. Knowing X barely helps you predict Y.'],
            ['|r| ≈ 0.30', 'Medium / moderate', 'A noticeable link. Knowing X gives you a meaningful clue about Y.'],
            ['|r| ≈ 0.50', 'Large / strong', 'A strong link. Knowing X tells you a lot about Y.'],
            ['|r| ≈ 0.70+', 'Very strong', 'An obvious link. The two variables track each other closely.'],
            ['|r| = 1.00', 'Perfect', 'Almost never happens with real data. If you see this, check for a coding error.'],
          ]},

        { type: 'reveal',
          prompt: 'You compute r = −0.78 between hours of TV per week and last term\'s exam score. What does this mean in one sentence?',
          answer: 'There is a **strong negative** linear relationship between TV hours and exam score. As TV watching goes up, exam scores tend to go down — and the link is *tight*, not just suggestive. The minus sign tells you the direction (opposite), 0.78 is well above Cohen\'s 0.50 large benchmark, so the strength is large.' },

        { type: 'illustration', component: 'HowRWorks',
          caption: 'Figure 2. How Pearson r is computed, intuitively. The gold dashed lines mark the means of X and Y. For every point, SPSS measures how far it sits to the right/left of x̄ and how far above/below ȳ. Points in the bottom-left or top-right quadrants contribute POSITIVELY to r (their X and Y both deviate in the same direction). Points in the other two quadrants contribute negatively. The final r is essentially the average of all these contributions, rescaled to lie between −1 and +1.' },

        { type: 'why', body:
          'You will *never* compute Pearson r by hand in a thesis — SPSS does it in 0.4 seconds. But knowing it is essentially an average of how-much-each-point-deviates-together helps you understand *why* one weird outlier can drag the whole r value off course (more on this in two sections).' },
      ],
    },

    /* ════════════════════ 4. WHEN TO USE / WHEN NOT TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When to use Pearson — and when NOT to',
      blocks: [
        { type: 'heading', level: 2, text: 'Four conditions that must hold' },

        { type: 'paragraph', text:
          'Pearson r is built on four assumptions about your data. If any of them is grossly violated, your r value will lie to you — sometimes spectacularly. Walk through this checklist *before* you click OK in SPSS, not after.' },

        { type: 'steps', steps: [
          { title: 'Both variables are CONTINUOUS',
            body: [
              'Continuous means the variable can take many possible numeric values along a scale — age in years (or even months), income in shillings, exam score out of 100, weight in kilograms. In SPSS Variable View this is the *Scale* measurement level.',
              'If either variable is **ordinal** (a ranking like "low / medium / high", or a single Likert item), use **Spearman\'s rho** instead (next lesson). If either is **nominal** (gender, county, treatment group), Pearson cannot help you at all — you need chi-square or a t-test depending on your question.',
            ]},
          { title: 'The relationship is LINEAR (straight-line)',
            body: [
              'Pearson only measures *straight-line* trends. If your two variables follow a curve — a U-shape, an inverted U, an exponential rise — Pearson r will report a number close to zero even when the variables are tightly related. It is the single most embarrassing way to get a Pearson result wrong.',
              'The way to check is simple: **always plot a scatter plot first** (Graphs → Chart Builder → Scatter/Dot in SPSS). Eyeball the cloud of points. If you can imagine drawing a straight line through them, Pearson is fine. If the pattern is clearly curved, do *not* use Pearson — fit a regression with a polynomial term, or transform one of the variables (try taking the logarithm).',
            ]},
          { title: 'Both variables are approximately NORMALLY distributed',
            body: [
              'Normality means the values, when plotted as a histogram, form a roughly bell-shaped curve — most values cluster near the middle, with progressively fewer extreme values on either side.',
              'In SPSS you check this with **Analyze → Descriptive Statistics → Explore**, ticking "Normality plots with tests". You\'ll get the **Shapiro-Wilk** test (use it when n < 50) or **Kolmogorov-Smirnov** (use it when n ≥ 50). If p > .05, normality is acceptable. If p < .05 your data is non-normal — but in samples larger than about 30, Pearson is reasonably *robust* (forgiving) to mild non-normality, so don\'t panic.',
              'Two practical tip: if normality is badly violated and your sample is small, switch to Spearman. If your sample is large (n > 100), Pearson is usually fine even with non-normal data.',
            ]},
          { title: 'There are NO EXTREME OUTLIERS',
            body: [
              'A single far-out point can flip Pearson r from positive to negative, or shrink a large correlation to nearly zero. This is because r is an *average* of all the deviations from the means, and outliers contribute disproportionately to that average.',
              'Spot outliers visually on your scatter plot — they are the points that sit far away from the main cloud of dots. You can also use boxplots (Analyze → Descriptive Statistics → Explore → Plots → Boxplots).',
              'When you find one, your options are: (a) check whether it\'s a typo and correct it; (b) keep it and report Pearson *with and without* the outlier so the reader can judge; (c) switch to Spearman, which is less sensitive to outliers.',
            ]},
        ]},

        { type: 'illustration', component: 'OutlierImpact',
          caption: 'Figure 3. Why outliers matter. The left plot shows 10 pupils with a very tight positive link (r = +0.94). The right plot is exactly the same data PLUS one outlier in the top-right corner — perhaps a data-entry error. That single point drags Pearson r from +0.94 down to +0.42. Same data, completely different story. Always plot first.' },

        { type: 'illustration', component: 'CurvilinearWarning',
          caption: 'Figure 4. The most dangerous case of all. The two variables here are clearly related — they follow a perfect U-shape. But Pearson r is essentially zero. If you ran Pearson on this data without first plotting it, you would conclude "no relationship" and miss a real, important pattern. Use a polynomial regression or transform the variable instead.' },

        { type: 'mistake',
          title: 'Running Pearson on a Likert item (1=Strongly Disagree, 5=Strongly Agree)',
          body: 'Individual Likert items are *ordinal*, not continuous. The distance between "Disagree" and "Neutral" is not necessarily the same as the distance between "Agree" and "Strongly Agree". Running Pearson treats those distances as if they were identical — which they almost certainly are not.',
          fix: 'For a single Likert item, use Spearman\'s rho. For the **total** or **mean** of several Likert items added together (e.g. a 10-item motivation scale scored 10–50), Pearson is fine because the summed score behaves like a continuous variable.' },

        { type: 'mistake',
          title: 'Forgetting to plot the scatter plot first',
          body: 'You run Pearson, get r = 0.04, and conclude "no relationship". You move on with your thesis. Then in the viva your examiner says: "Did you check whether the relationship was linear?" — and you have nothing to say.',
          fix: 'Make it a personal rule: **no Pearson without a scatter plot first**. It takes 30 seconds in SPSS (Graphs → Chart Builder → Scatter/Dot) and protects you from the single most common mistake in the literature.' },
      ],
    },

    /* ════════════════════ 5. STATISTICAL SIGNIFICANCE ════════════════════ */
    {
      id: 'significance',
      title: 'Significance and sample size (the p-value)',
      blocks: [
        { type: 'heading', level: 2, text: 'r tells you strength · p tells you confidence' },

        { type: 'paragraph', text:
          'SPSS doesn\'t only give you r. It also gives you a **p-value** (printed as "Sig. (2-tailed)" in the output). These two numbers answer two completely different questions, and confusing them is one of the easiest ways to embarrass yourself.' },

        { type: 'comparison',
          headers: ['What it answers', 'How to read it'],
          rows: [
            ['**r** — *"How strong is the relationship in my sample?"*', 'Use Cohen\'s benchmarks. r = 0.10 small · 0.30 medium · 0.50 large.'],
            ['**p** — *"How likely is it that I see a relationship this large by chance alone, if there really were no relationship in the wider population?"*', 'If p < .05 we conclude the relationship is *statistically significant* — unlikely to be due to chance. If p > .05 we say it is *not statistically significant*.'],
          ]},

        { type: 'why', body:
          'A *significant* correlation does not automatically mean a *strong* one. With a sample of 1,000 pupils you might get r = 0.08 (essentially nothing) with p = .01 (highly significant). The honest write-up says: "the correlation was statistically significant but very weak; with such a large sample, even tiny associations reach significance". Always report and discuss both numbers.' },

        { type: 'callout', tone: 'warning', title: 'Sample size dramatically affects p',
          body: 'The bigger your sample, the smaller a correlation can be and still be "significant". This is not magic — it is mathematics. A correlation of r = 0.30 will be significant in a sample of 50 but might be marginal in a sample of 20. A correlation of r = 0.10 will be significant in a sample of 500 but laughably non-significant in a sample of 30.' },

        { type: 'heading', level: 3, text: 'How big a sample do you need?' },

        { type: 'comparison',
          headers: ['Expected effect size', 'Minimum sample (α = .05, power = .80)', 'In plain language'],
          rows: [
            ['Large (|r| ≈ .50)', 'n ≈ 28', 'A small thesis sample is enough.'],
            ['Medium (|r| ≈ .30)', 'n ≈ 84', 'A typical Master\'s sample is enough.'],
            ['Small (|r| ≈ .10)', 'n ≈ 783', 'You need a survey, not a thesis sample.'],
          ]},

        { type: 'paragraph', text:
          'These numbers come from an *a-priori power analysis* — a calculation that tells you, before you collect data, how big your sample needs to be to reliably detect an effect of a given size. Tools like **G\\*Power** (free) do this in two clicks. Every serious thesis should include a power-analysis sentence in the methodology chapter.' },

        { type: 'reveal',
          prompt: 'You run Pearson on a sample of n = 1,200 and find r = .08, p = .006. Your friend says "your relationship is significant — write it up as a finding!" Are they right?',
          answer: 'Technically yes (p < .05), but practically no. r = .08 is below Cohen\'s "small" benchmark and explains less than 1% of the variance in the outcome. The *only* reason it reached significance is the very large sample. The honest write-up: "Although the correlation was statistically significant, **r = .08, p = .006**, the effect size was trivial; the two variables share less than 1% of their variance. We do not interpret this as a meaningful association." Examiners *love* this kind of honest, sample-size-aware writing.' },
      ],
    },

    /* ════════════════════ 6. RUNNING IT IN SPSS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running Pearson in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'The 6-step click path' },

        { type: 'paragraph', text:
          'Now that you understand what Pearson is, running it in SPSS takes about 30 seconds. The procedure is identical whether you have two variables or twenty.' },

        { type: 'steps', steps: [
          { title: 'Open Bivariate Correlations',
            body: 'From the top menu click **Analyze → Correlate → Bivariate**. A dialog opens with two boxes — your variable list on the left, the empty "Variables" box on the right.' },
          { title: 'Move your variables into the "Variables" box',
            body: 'Click each continuous variable in the left list and click the blue arrow button to move it across. You need at least two; you can include more (SPSS will give you a full correlation matrix). For our example: study_hours, math_score, motivation, attendance.' },
          { title: 'Confirm the Pearson checkbox is ticked',
            body: 'Under "Correlation Coefficients", make sure **Pearson** is selected. It is ticked by default. Leave Kendall\'s tau-b and Spearman unticked unless you have a specific reason.' },
          { title: 'Tick "Flag significant correlations"',
            body: 'This adds asterisks (* and **) to significant correlations in the output table. It makes the output much easier to read at a glance.' },
          { title: 'Open Options for descriptives',
            body: 'Click the **Options…** button (top-right of the dialog). Tick **Means and standard deviations** so the descriptives appear above your correlation table — examiners will ask for them. For missing data, choose **Exclude cases pairwise** (this uses every available pair rather than dropping a whole row because of one missing value). Click **Continue**.' },
          { title: 'Click OK',
            body: 'SPSS sends the result to the Output Viewer. The correlation matrix appears as a table called "Correlations".' },
        ]},

        { type: 'illustration', component: 'BivariateDialog',
          caption: 'Figure 5. The SPSS Bivariate Correlations dialog. Arrow 1 points to your variable list. Arrow 2 points to the Variables box where you move the variables you want correlated. Arrow 3 is the Pearson checkbox. Arrow 4 is the Options button where you turn on descriptives and choose how to handle missing data.' },

        { type: 'callout', tone: 'info', title: 'Before you click OK — plot first',
          body: [
            'Before running Bivariate, do this every single time: **Graphs → Chart Builder → Scatter/Dot → Simple Scatter**. Drag one variable to the Y axis and the other to the X axis. Look at the cloud of points.',
            'You are asking yourself two questions: (1) Does the pattern look roughly straight-line, or curved? (2) Are there any obvious outliers far from the main cloud?',
            'If the answer to (1) is "curved" or (2) is "yes", you may need to switch tests or clean data before proceeding. Thirty seconds of plotting saves hours of rework.',
          ]},

        { type: 'mistake',
          title: 'Using "Exclude cases listwise" with missing data',
          body: 'The listwise option drops an entire pupil\'s row from ALL correlations if any one of their variables is missing. With four variables and a few scattered blanks, you can lose 30% of your sample without noticing.',
          fix: 'In the Options dialog, choose **Exclude cases pairwise** instead. This calculates each correlation using only the pairs where both variables have a value. You\'ll notice the N column in the output may differ between cells — that\'s a feature, not a bug.' },
      ],
    },

    /* ════════════════════ 7. WORKED EXAMPLE — EDUCATION ════════════════════ */
    {
      id: 'worked-example-1',
      title: 'Worked example 1 — Education',
      blocks: [
        { type: 'heading', level: 2, text: 'Study hours and mathematics performance' },

        { type: 'workedExample', title: 'A Master\'s thesis at the University of Nairobi',
          body: [
            { label: 'The research question',
              text: 'A Master of Education student wants to know: *Among Form 3 pupils, is there a relationship between weekly study hours and end-of-term mathematics score?* She suspects a positive relationship — more study, higher score — but she needs to test it formally.' },
            { label: 'The data',
              text: 'She collects data from **n = 117 pupils** across three Nairobi secondary schools. For each pupil she has two variables: **study_hours** (the number of hours they reported studying mathematics in the previous week, ranging from 0 to 20) and **math_score** (their mark out of 100 on the end-of-term mathematics test).' },
            { label: 'Step 1 — Plot the scatter plot',
              text: 'She runs Graphs → Chart Builder → Simple Scatter, with study_hours on the X axis and math_score on the Y axis. The points form a clear upward-sloping cloud with no obvious outliers and no curve. Pearson is appropriate.' },
            { label: 'Step 2 — Check normality',
              text: 'She runs Analyze → Descriptive Statistics → Explore for both variables. Shapiro-Wilk gives p = .31 for study_hours and p = .18 for math_score. Both are above .05, so normality is acceptable.' },
            { label: 'Step 3 — Run Pearson',
              text: 'Analyze → Correlate → Bivariate. She moves both variables into the box, ticks Pearson, ticks "Flag significant correlations", opens Options and ticks "Means and standard deviations", picks "Exclude cases pairwise", and clicks OK.' },
            { label: 'Step 4 — Read the output',
              text: 'The Correlations table shows **r = .19**, **Sig. (2-tailed) = .038**, **N = 117**. The r value is flagged with a single asterisk (*), meaning it is significant at p < .05.' },
            { label: 'Step 5 — Interpret honestly',
              text: 'r = .19 is *below* Cohen\'s small benchmark (0.10) but close to it — a small positive effect. The relationship reached significance (p = .038), partly because the sample size of 117 is reasonably large. The two variables share only about r² = .036 = 3.6% of their variance — meaning study hours alone explain only a tiny slice of the difference in maths scores. Other factors — teaching quality, prior preparation, motivation — must account for the rest.' },
          ]},

        { type: 'illustration', component: 'ScatterAnnotated',
          caption: 'Figure 6. The scatter plot from this worked example. Each blue dot is one pupil. The gold line is the line of best fit. You can see the upward trend (more study → higher score) but there is also a lot of scatter — some pupils studying many hours still scored low, and some who studied little still scored high. This matches the small r value.' },

        { type: 'illustration', component: 'CorrelationOutput',
          caption: 'Figure 7. The Correlations table as SPSS prints it. The asterisks flag significance: * is p < .05, ** is p < .01. The diagonal cells are always 1 (a variable correlated with itself). Each off-diagonal cell shows r on top, the significance below, and the N below that.' },

        { type: 'reveal',
          prompt: 'In Figure 7 you can see that **math_score × motivation** has r = .27**. What does the ** mean, and what is the plain-English interpretation?',
          answer: 'The double asterisk means the correlation is significant at the p < .01 level (more confident than just p < .05). r = .27 is just below Cohen\'s medium benchmark (.30), so we describe it as a **small-to-moderate positive correlation**. Pupils with higher motivation tended to score higher in mathematics, and the relationship is unlikely to be due to chance.' },
      ],
    },

    /* ════════════════════ 8. WORKED EXAMPLE — HEALTH ════════════════════ */
    {
      id: 'worked-example-2',
      title: 'Worked example 2 — Public health',
      blocks: [
        { type: 'heading', level: 2, text: 'Hand-washing frequency and diarrhoea cases' },

        { type: 'workedExample', title: 'A PhD field study in Kakamega County',
          body: [
            { label: 'The research question',
              text: 'A doctoral candidate in Public Health wants to know: *Across 60 villages in Kakamega County, is there a relationship between the average number of times residents wash their hands per day and the monthly number of reported diarrhoea cases per 1,000 people?*' },
            { label: 'The data',
              text: 'He collects two variables from each of **n = 60 villages**: **handwashing** (a continuous measure of mean hand-washes per person per day, ranging from 0.5 to 8) and **diarrhoea_rate** (cases per 1,000 residents per month, ranging from 0 to 35).' },
            { label: 'Step 1 — Scatter plot',
              text: 'The plot shows a clear downward trend — villages with more frequent hand-washing show fewer diarrhoea cases. The pattern is roughly linear with no extreme outliers.' },
            { label: 'Step 2 — Normality',
              text: 'Shapiro-Wilk gives p = .42 for handwashing and p = .12 for diarrhoea_rate. Both acceptable.' },
            { label: 'Step 3 — Pearson output',
              text: '**r = −0.64**, **Sig. (2-tailed) = .000** (which SPSS rounds — the actual p is < .001), **N = 60**. Flagged with two asterisks.' },
            { label: 'Step 4 — Interpret',
              text: 'r = −.64 is a *strong negative* correlation (well above Cohen\'s .50 large benchmark). The minus sign confirms direction: as hand-washing goes up, diarrhoea goes down. r² = .41 means hand-washing frequency accounts for about 41% of the variance in diarrhoea rates across villages — a substantively important finding worth investing in public-health messaging.' },
            { label: 'Step 5 — The crucial caveat',
              text: 'Correlation is **not causation**. We cannot conclude from this study that hand-washing *causes* lower diarrhoea rates. Maybe villages with better hand-washing also have cleaner water supplies, better latrines, or higher household incomes — and one of those *other* factors is the real driver. To make a causal claim, you would need a randomised intervention. A correlation establishes that the link exists; a controlled trial establishes that the link is causal.' },
          ]},

        { type: 'callout', tone: 'warning', title: 'The "correlation is not causation" sentence',
          body: 'Every single Pearson result in a thesis must be followed by a sentence that explicitly distinguishes the *correlation* you found from any *causal* claim. Examiners hunt for missing causation caveats. Default sentence to memorise: "Although the relationship was statistically significant, this is a correlational finding and does not establish that X causes Y. Other variables not measured in this study may underlie the observed association."' },
      ],
    },

    /* ════════════════════ 9. WORKED EXAMPLE — BUSINESS ════════════════════ */
    {
      id: 'worked-example-3',
      title: 'Worked example 3 — Business',
      blocks: [
        { type: 'heading', level: 2, text: 'Marketing spend and monthly revenue' },

        { type: 'workedExample', title: 'A small-business MBA project',
          body: [
            { label: 'The research question',
              text: 'An MBA student running a small fashion business on Instagram wants to know: *Over the past 24 months, has there been a relationship between my monthly marketing spend (KSh) and my monthly revenue (KSh)?*' },
            { label: 'The data',
              text: 'She has 24 monthly observations of **marketing_spend** (KSh 5,000 to KSh 80,000) and **revenue** (KSh 30,000 to KSh 410,000).' },
            { label: 'Output',
              text: '**r = +0.83**, **Sig. (2-tailed) = .000**, **N = 24**. Flagged with two asterisks.' },
            { label: 'Interpret',
              text: 'A *very strong* positive correlation (well above the .70 very-strong benchmark) and highly significant despite the small sample of 24 — exactly because the effect size is so large. r² = .69, so 69% of the variation in monthly revenue is shared with variation in marketing spend.' },
            { label: 'A practical recommendation',
              text: 'For her business plan, she can argue with confidence that marketing spend and revenue are tightly linked. But again — correlation, not causation. It is *possible* she spent more on marketing in months when she expected high revenue (causal arrow runs the other way), or that a third factor like seasonal demand drives both. The honest write-up acknowledges the strong link but recommends a small controlled experiment — e.g. randomly cutting marketing spend in half for one month — to establish whether the link is truly causal.' },
          ]},
      ],
    },

    /* ════════════════════ 10. WHEN ASSUMPTIONS FAIL ════════════════════ */
    {
      id: 'when-assumptions-fail',
      title: 'When the assumptions fail — what to do',
      blocks: [
        { type: 'heading', level: 2, text: 'A decision tree for the real world' },

        { type: 'paragraph', text:
          'In a textbook, every Pearson analysis goes smoothly. In real research, at least one assumption is usually shaky. Here is what to do depending on which one breaks.' },

        { type: 'decision', title: 'Your data violates an assumption — which test now?',
          branches: [
            { condition: '🧱', action: '**One or both variables are ordinal** (Likert items, ranks, low/medium/high) → switch to **Spearman\'s rho** (Lesson 2). No information lost; results are usually very similar.' },
            { condition: '📉', action: '**The relationship is curved** (U-shape, exponential) → either (a) transform one variable (try the natural log) and re-check linearity, or (b) fit a **regression with a quadratic (X²) term** (Lesson 4 of the Regression course).' },
            { condition: '📊', action: '**Normality violated but sample is large (n > 100)** → Pearson is robust enough; report it and note the violation in your methodology.' },
            { condition: '📊', action: '**Normality violated and sample is small (n < 50)** → switch to **Spearman\'s rho**, which makes no normality assumption.' },
            { condition: '🎯', action: '**One or more clear outliers** → report Pearson **with and without** the outlier(s) so the reader can judge whether your conclusion depends on them. Or switch to Spearman.' },
            { condition: '🔀', action: '**You want to control for a third variable** ("Does X relate to Y *after accounting for* Z?") → use **partial correlation** (Lesson 3) instead of Pearson.' },
          ]},

        { type: 'callout', tone: 'success', title: 'A safe default when in doubt',
          body: 'If you are unsure whether your data meets all four Pearson assumptions, run **both Pearson and Spearman**. If the two give very similar results, report Pearson (it\'s more familiar to most examiners). If they differ substantially, report Spearman — and explain in a sentence why you chose the non-parametric version. This pattern shows methodological care and almost always satisfies examiners.' },
      ],
    },

    /* ════════════════════ 11. READING THE FULL SPSS OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the SPSS output in full',
      blocks: [
        { type: 'heading', level: 2, text: 'Every number in the Correlations table' },

        { type: 'paragraph', text:
          'SPSS prints a square matrix called the Correlation Matrix. With four variables you get a 4×4 grid. The diagonal cells (top-left to bottom-right) are always r = 1, because every variable correlates perfectly with itself. The interesting cells are the off-diagonal ones, which appear *twice* — once above and once below the diagonal — because correlation is symmetric (the relationship between X and Y is identical to the relationship between Y and X).' },

        { type: 'illustration', component: 'CorrelationOutput',
          caption: 'Figure 8. A 4×4 correlation matrix from SPSS, annotated for full reading.' },

        { type: 'heading', level: 3, text: 'How to read a single off-diagonal cell' },

        { type: 'list', ordered: true, items: [
          '**Top number** — Pearson r. The strength and direction of the relationship. Round to two decimal places in your report.',
          '**Second row** — *Sig. (2-tailed)*. The p-value. If it shows ".000" SPSS has rounded — report as "p < .001". Otherwise report it exactly (e.g. p = .038).',
          '**Third row** — *N*. The number of pairs of values used in this specific cell. With pairwise deletion, N can differ from cell to cell — always report the actual N for each correlation.',
          '**Asterisks** — * means p < .05, ** means p < .01. These are SPSS\'s flags, not part of the r value itself.',
        ]},

        { type: 'reveal',
          prompt: 'In Figure 8 the **motivation × attendance** cell shows r = .15*. The asterisk tells you the relationship is significant at p < .05. Is this a strong, moderate, or weak relationship?',
          answer: '**Weak**. The absolute value 0.15 is between Cohen\'s small (0.10) and medium (0.30) benchmarks but closer to small. The asterisk tells you it is statistically *unlikely to be due to chance* — but "unlikely to be due to chance" is not the same as "large". The honest description is: "a statistically significant but weak positive correlation between motivation and attendance, r(N) = .15, p < .05".' },

        { type: 'why', body:
          'A surprising number of theses report only the asterisks ("the correlation was significant**") and never the actual r value. This is a red flag for examiners — it suggests the student does not understand the difference between strength and significance. Always report the number.' },
      ],
    },

    /* ════════════════════ 12. WRITING IT UP (APA + THESIS) ════════════════════ */
    {
      id: 'apa-writeup',
      title: 'Writing it up for your thesis (APA style)',
      blocks: [
        { type: 'heading', level: 2, text: 'The exact words to use' },

        { type: 'paragraph', text:
          'APA (American Psychological Association) style is the most widely accepted reporting standard in Kenyan postgraduate research. The format is strict. Memorise the skeleton sentence below and adapt it to your study.' },

        { type: 'apa', text:
          'A Pearson correlation coefficient was computed to assess the linear relationship between [VARIABLE 1] and [VARIABLE 2] among [N] [type of respondent]. There was a [strong / moderate / weak] [positive / negative] correlation between the two variables, **r([df]) = [.XX], p = [.XXX]**. A scatterplot summarised the results (see Figure X). Overall, [one-sentence plain-language interpretation tied to your research objective].' },

        { type: 'heading', level: 3, text: 'A complete worked write-up' },

        { type: 'apa', text:
          'A Pearson correlation coefficient was computed to assess the linear relationship between weekly study hours and end-of-term mathematics score among 117 Form 3 pupils. There was a small but statistically significant positive correlation between the two variables, **r(115) = .19, p = .038**. A scatterplot summarised the results (see Figure 6). Although study hours predicted higher mathematics scores in the expected direction, the modest strength of the association indicates that study time alone accounts for only about 3.6% of the variance in mathematics achievement; other factors — such as teaching quality, prior preparation, and motivation — likely play a larger role.' },

        { type: 'callout', tone: 'success', title: 'The four numbers you must always report',
          body: '**r value · degrees of freedom (always N − 2) · p value · effect size interpretation**. If you only report r and p without the df and a plain-language interpretation, expect reviewer comments. Bonus marks for adding a 95% confidence interval (Fisher\'s r-to-z transformation — SPSS does not give this by default but Jamovi or R do).' },

        { type: 'heading', level: 3, text: 'Where in your thesis does this go?' },

        { type: 'comparison',
          headers: ['Thesis chapter', 'What goes here'],
          rows: [
            ['**Methodology**', 'State that Pearson correlation will be used, name the variables, justify the choice (continuous + linear + normal), and report your power analysis.'],
            ['**Chapter 4 — Results**', 'A short paragraph stating descriptives first (means, SDs), then the Pearson result using the APA template above, then the scatter plot as a numbered figure, then the correlation matrix as a numbered table.'],
            ['**Chapter 5 — Discussion**', 'Interpret what the correlation MEANS in the context of your research question. Compare to previous studies. Acknowledge the correlation-not-causation limitation explicitly.'],
          ]},

        { type: 'reviewerComments',
          items: [
            { q: 'Why did you choose Pearson rather than Spearman?',
              a: 'Both variables were measured on a continuous scale, the scatter plot showed a linear pattern, normality tests (Shapiro-Wilk) were non-significant for both variables, and no extreme outliers were present. Pearson was therefore the most appropriate and most informative test.' },
            { q: 'Did you check linearity?',
              a: 'Yes — a scatter plot was inspected before the Pearson analysis was run. The pattern appeared linear with no curvature.' },
            { q: 'What was the effect size?',
              a: 'r = .19, which is below Cohen\'s small effect-size benchmark (|r| = .10). The relationship reached statistical significance largely due to the moderately large sample size (n = 117).' },
            { q: 'Are you claiming causation?',
              a: 'No. The relationship is correlational. A causal claim would require an experimental design with random assignment of the predictor variable.' },
            { q: 'How did you handle missing data?',
              a: 'Pairwise deletion was used (SPSS Options → Exclude cases pairwise), so each correlation was computed on all available pairs. The N is reported for each correlation in Table X.' },
          ]},
      ],
    },

    /* ════════════════════ 13. COMMON MISTAKES RECAP ════════════════════ */
    {
      id: 'common-mistakes',
      title: 'Common mistakes recap',
      blocks: [
        { type: 'heading', level: 2, text: 'Avoid these and you\'ll defend with confidence' },

        { type: 'mistake',
          title: 'Confusing "significant" with "important"',
          body: 'A correlation of r = .08 in a sample of 5,000 will be highly significant — but it explains less than 1% of the variance. "Significant" only means "unlikely to be due to chance"; it does not mean "big".',
          fix: 'Always discuss strength (r value, Cohen benchmark) and significance (p-value) separately. Comment on whether the effect is practically meaningful.' },

        { type: 'mistake',
          title: 'Claiming X causes Y',
          body: '"Study hours cause higher exam scores" is a causal claim. Pearson cannot support it. The relationship could run in the other direction (high-scoring pupils enjoy studying more), or both could be driven by a third variable (motivation, parental support).',
          fix: 'Use cautious language: "associated with", "predicted", "linked to", "shared variance with". Reserve "caused" for experimental studies.' },

        { type: 'mistake',
          title: 'Not reporting descriptives first',
          body: 'Examiners want to see the means and standard deviations of both variables BEFORE the correlation. Without them, the correlation is hard to interpret.',
          fix: 'Always report descriptives in Chapter 4 before any correlation. The "Means and standard deviations" tick-box in the Options dialog is your friend.' },

        { type: 'mistake',
          title: 'Running 20 correlations and only reporting the significant ones',
          body: 'This is called *p-hacking* or *cherry-picking* and it is academically dishonest. If you run 20 random correlations, on average 1 will be significant at p < .05 purely by chance.',
          fix: 'Report ALL the correlations you ran — typically in a full correlation matrix table. If you have a strong theoretical reason for testing many, consider a Bonferroni correction (divide your alpha by the number of tests).' },

        { type: 'mistake',
          title: 'Reporting r without df and N',
          body: 'A correlation reported as just "r = .42, p < .05" is incomplete. The reader cannot judge the precision of the estimate without knowing the sample size.',
          fix: 'Always report r(df) = .XX, p = .XXX — for example r(115) = .42, p = .003. The df = N − 2.' },
      ],
    },

    /* ════════════════════ 14. SECTION SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'heading', level: 2, text: 'What you should now be able to do' },

        { type: 'summary', items: [
          'Define Pearson\'s r in plain English as a single number between −1 and +1 measuring the strength and direction of a straight-line relationship between two continuous variables.',
          'List the four assumptions (continuous, linear, normal, no extreme outliers) and decide whether your data meets them.',
          'Recognise Cohen\'s benchmarks (.10 small · .30 medium · .50 large) and apply them when interpreting r.',
          'Distinguish *strength* (r value) from *significance* (p-value), and explain why large samples make even tiny correlations significant.',
          'Run Pearson in SPSS in 6 clicks: Analyze → Correlate → Bivariate → tick Pearson → Options for descriptives → OK.',
          'Read every number in the SPSS Correlations table — r, asterisks, Sig. (2-tailed), N.',
          'Decide what to do when an assumption fails (switch to Spearman, transform, fit polynomial regression, use partial correlation).',
          'Write the result up in APA style for your Chapter 4 — always reporting r, df, p, and a plain-language interpretation.',
          'Anticipate examiner questions and defend your choice of Pearson with confidence.',
          'Avoid the five most common mistakes — confusing significant with important, claiming causation, omitting descriptives, p-hacking, and forgetting df.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Next lesson',
          body: 'In **Lesson 2: Spearman rank correlation** we cover the non-parametric cousin of Pearson — what to use when your data is ordinal or non-normal. Spearman is essentially Pearson run on the *ranks* of your data rather than the raw values, so most of what you just learned transfers directly.' },

        { type: 'paragraph', text:
          'Take a short break. When you return, jump to the knowledge check — five questions covering everything in this lesson. You can retry as many times as you need.' },
      ],
    },

    /* ════════════════════ 15. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'heading', level: 2, text: 'Test what you\'ve learned' },

        { type: 'paragraph', text:
          'Answer all five questions to complete the lesson. After you submit each answer you will see whether you were right, and a brief explanation either way. You can retry as many times as you want.' },

        { type: 'check',
          question: 'A Pearson r of −0.72 between hours of TV and exam score indicates:',
          choices: [
            'A weak positive relationship',
            'A strong positive relationship',
            'A strong negative relationship',
            'No meaningful relationship',
          ],
          answer: 2,
          explanation: 'The minus sign indicates direction — as TV hours go UP, exam scores go DOWN. The absolute value 0.72 is well above Cohen\'s large benchmark (0.50), so we call this a STRONG NEGATIVE correlation.' },

        { type: 'check',
          question: 'Which of the following is NOT a Pearson assumption?',
          choices: [
            'Both variables are continuous',
            'The relationship is linear',
            'Both variables are approximately normally distributed',
            'The sample size must be at least 500',
          ],
          answer: 3,
          explanation: 'There is no minimum sample size of 500 for Pearson. With small samples (n = 30) you can still run Pearson — you just have less statistical power to detect smaller effects. The three valid assumptions are continuous data, linearity, and approximate normality (plus no extreme outliers).' },

        { type: 'check',
          question: 'You see a cell in the Correlations output: r = .42, Sig. (2-tailed) = .003, N = 198. The relationship is:',
          choices: [
            'Not statistically significant',
            'Significant and strong negative',
            'Significant and moderate positive',
            'Significant but trivially small',
          ],
          answer: 2,
          explanation: 'p = .003 is well below .05, so the relationship IS statistically significant. r = .42 is positive (no minus sign) and falls between Cohen\'s medium (.30) and large (.50) benchmarks — so we call it MODERATE POSITIVE.' },

        { type: 'check',
          question: 'Your scatter plot shows a clear U-shape between two continuous variables. What should you do?',
          choices: [
            'Use Pearson — it handles any pattern',
            'Use Pearson only if both variables are normal',
            'Switch to chi-square',
            'Do NOT use Pearson — it only measures linear relationships. Consider regression with a quadratic term or transform one variable.',
          ],
          answer: 3,
          explanation: 'Pearson only sees STRAIGHT lines. A U-shape is a curved (quadratic) relationship. Pearson might report r ≈ 0 even though the variables are clearly related. The right approach is a regression with a quadratic (X²) term, or a transformation like a logarithm to see if the curve straightens out.' },

        { type: 'check',
          question: 'You run Pearson on n = 2,000 and find r = .07, p = .002. How should you write this up?',
          choices: [
            '"There was a strong positive correlation, r = .07, p < .01."',
            '"There was a significant positive correlation, r(1998) = .07, p = .002. However, the effect size was trivially small, with the two variables sharing less than 1% of their variance — likely a consequence of the very large sample size."',
            '"The correlation was not significant."',
            '"r = .07 means a 7% relationship between the variables."',
          ],
          answer: 1,
          explanation: 'Option B is the honest, sample-size-aware write-up examiners reward. The relationship IS statistically significant (p < .05) — but with n = 2,000, almost any tiny correlation will reach significance. The effect size (r = .07, r² < 1%) is trivially small and should be flagged as such. Option A confuses significant with strong. Option C is wrong because p = .002 IS significant. Option D wildly misinterprets r as a percentage.' },
      ],
    },
  ],
};
