/**
 * Descriptive Statistics · Lesson 4 — Producing Graphs & Charts
 * Final lesson of Descriptive Statistics. Chart Builder, choosing the right chart,
 * polishing for publication.
 */

export const GRAPHS_LESSON = {
  id: 'desc-4',
  title: 'Producing graphs & charts',
  subtitle: 'Module 03 · Course: Descriptive Statistics · Lesson 4 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'A good chart is worth a thousand cells of a table',
      blocks: [
        { type: 'scene', body: [
          'You hand your supervisor 28 pages of Chapter 4 — pure tables. Tables of frequencies, tables of means, tables of standard deviations. She thanks you politely. The next day she emails: "This is comprehensive, but it is hard to *see* what is going on. Could you add some figures?"',
          'Tables answer the question "what are the numbers?". Charts answer the question "what is the pattern?". A pie chart of gender shows the imbalance instantly. A histogram of income shows the skew in a single image. A boxplot of math scores by gender shows the comparison in a way no table can. Examiners look at the figures FIRST and the tables SECOND.',
          'This lesson teaches you to produce publishable charts using the SPSS **Chart Builder** — the modern, drag-and-drop chart tool that has replaced the older menus. By the end you will know which chart type fits which variable, how to build it in 30 seconds, and how to polish it so it looks like it belongs in a published journal article.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Choose the right chart type** for any variable (or pair of variables) using a clear decision rule.',
            '**Use the SPSS Chart Builder** confidently — drag variables onto axes, pick chart types from the gallery.',
            '**Produce bar charts and pie charts** for categorical variables.',
            '**Produce histograms** for continuous variables, showing distribution shape.',
            '**Produce boxplots** for spotting outliers and comparing groups.',
            '**Produce scatter plots** for visualising relationships between two continuous variables.',
            '**Polish charts** by editing titles, axis labels, colours, and removing chart-junk so they look publication-ready.',
            '**Export charts** into Word for your thesis without losing quality.',
            '**Avoid the five chart sins** that make figures look amateurish.',
          ]},

        { type: 'why', body:
          'Examiners and journal reviewers expect charts. A Chapter 4 with only tables looks rushed. A Chapter 4 with thoughtful, clean, well-labelled charts looks like the work of a researcher who cares about communicating results, not just producing them. Figures are also memorable — long after the reader has forgotten your exact numbers, they remember the shape of your histogram.' },
      ],
    },

    /* ════════════════════ 2. CHOOSING THE RIGHT CHART ════════════════════ */
    {
      id: 'choosing',
      title: 'Choosing the right chart for your variable',
      blocks: [
        { type: 'heading', level: 2, text: 'The decision rule' },

        { type: 'paragraph', text:
          'Picking the right chart is mostly about matching the chart to the variable type. There are only six chart types you need for a thesis, and each one fits a specific situation. Here is the full decision rule.' },

        { type: 'comparison',
          headers: ['What you want to show', 'Variable type(s)', 'Best chart'],
          rows: [
            ['Count of cases in each category',          'One nominal/ordinal variable',                'Bar chart (or pie chart if ≤ 5 categories)'],
            ['Distribution shape of a continuous variable', 'One continuous (Scale)',                  'Histogram'],
            ['Spread and outliers of a continuous variable', 'One continuous, optionally split by group', 'Boxplot'],
            ['Relationship between two continuous variables', 'Two continuous',                         'Scatter plot'],
            ['Trend over time',                            'Continuous variable measured at multiple time points', 'Line chart'],
            ['Comparing means across groups',              'Continuous Y by categorical X',               'Bar chart (clustered) or boxplot'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Your six chart types',
          body: [
            '**Bar chart** — counts or means by category',
            '**Pie chart** — proportions, only when ≤ 5 categories',
            '**Histogram** — distribution shape of a continuous variable',
            '**Boxplot** — spread, outliers, and group comparisons',
            '**Scatter plot** — relationship between two continuous variables',
            '**Line chart** — change over time',
            'Master these six and you have everything you need for any thesis chapter.',
          ]},
      ],
    },

    /* ════════════════════ 3. THE CHART BUILDER ════════════════════ */
    {
      id: 'chart-builder',
      title: 'Meet the Chart Builder',
      blocks: [
        { type: 'heading', level: 2, text: 'The modern way to make charts in SPSS' },

        { type: 'paragraph', text:
          'For many years SPSS had two chart menus: an old one called "Legacy Dialogs" and a newer one called "Chart Builder". The Chart Builder is the modern, recommended tool — it lets you drag variables onto a preview area and see the chart take shape live. Always use Chart Builder. Ignore Legacy Dialogs unless you have a specific reason.' },

        { type: 'illustration', component: 'ChartBuilderDialog',
          caption: 'Figure 1. The Chart Builder dialog. The left panel lists your variables. The centre is the chart preview area where you drag variables onto the axes. The right gallery shows the available chart types — click a type to start building. The bottom of the dialog has tabs for further customisation (Element Properties, Chart Appearance, Options).' },

        { type: 'heading', level: 3, text: 'The Chart Builder workflow — the same for every chart' },

        { type: 'steps', steps: [
          { title: 'Open Chart Builder',
            body: 'Graphs → Chart Builder. The first time you open it, SPSS may pop up a warning reminding you to set the correct Measure level for your variables. Click OK. (This is why getting Variable View right in SPSS Basics matters — Chart Builder uses Measure to filter what charts you can make.)' },
          { title: 'Pick the chart type from the Gallery',
            body: 'At the bottom-left, the Gallery shows tabbed groups: Bar, Line, Area, Pie/Polar, Scatter/Dot, Histogram, etc. Click the tab you want, then double-click the specific chart preview to add it to the canvas at the top.' },
          { title: 'Drag your variables onto the axes',
            body: 'The canvas shows placeholders ("X-Axis?", "Y-Axis?", "Distribution Variable?"). From the variable list on the left, drag each variable onto the matching placeholder. The chart updates live.' },
          { title: 'Adjust statistics (Element Properties tab)',
            body: 'For mean or median bar charts, click the Element Properties tab at the bottom. Pick "Statistic: Mean" (or Median) and tick "Display error bars" if you want SD or 95% CI shown.' },
          { title: 'Click OK',
            body: 'The chart appears in the Output Viewer. From there you can edit it further (next section) or copy/paste it into Word.' },
        ]},

        { type: 'callout', tone: 'info', title: 'When the chart type you want is greyed out',
          body: 'The Chart Builder enforces the Measure setting. If you try to make a histogram of "gender", the histogram option is unavailable because gender is Nominal. The fix: either pick a chart that fits your variable type (a bar chart for gender), or open Variable View and correct the Measure setting if it is wrong.' },
      ],
    },

    /* ════════════════════ 4. BAR CHARTS ════════════════════ */
    {
      id: 'bar-charts',
      title: 'Bar charts — the workhorse for categories',
      blocks: [
        { type: 'heading', level: 2, text: 'When to use a bar chart' },

        { type: 'paragraph', text:
          'Bar charts are the most flexible and most-used chart type. Use a bar chart whenever you want to compare counts, percentages, or means across categories.' },

        { type: 'list', items: [
          '**Simple bar chart** — counts or percentages of a single nominal/ordinal variable (e.g. number of respondents per county).',
          '**Clustered bar chart** — two categorical variables together (e.g. employment status × gender, with side-by-side bars for males and females).',
          '**Stacked bar chart** — same as clustered, but bars stacked on top of each other rather than side by side. Use sparingly — harder to read than clustered.',
          '**Bar chart of means** — mean of a continuous variable across categories (e.g. mean income by education level).',
        ]},

        { type: 'steps', steps: [
          { title: 'Build a simple bar chart of counts',
            body: 'Graphs → Chart Builder → Gallery → Bar → double-click "Simple Bar". Drag your categorical variable (e.g. gender) onto the X-Axis. The Y-Axis auto-fills with "Count". Click OK.' },
          { title: 'Switch counts to percentages',
            body: 'On the Element Properties tab, change "Statistic" from "Count" to "Percentage (?)". This is what you usually want for thesis charts.' },
          { title: 'Build a clustered bar chart',
            body: 'Gallery → Bar → "Clustered Bar". Drag gender onto X-Axis. Drag employment_status onto "Cluster on X: set color". The chart now shows two grouped bars per category.' },
          { title: 'Build a bar chart of means',
            body: 'Gallery → Bar → "Simple Bar". Drag the categorical variable to X-Axis. Drag the continuous variable (e.g. income) to Y-Axis. Element Properties → set Statistic to "Mean". Optionally tick "Display error bars" → choose Confidence interval at 95%.' },
        ]},

        { type: 'callout', tone: 'gold', title: 'Sort bars by frequency for long category lists',
          body: 'If your bar chart has many categories (12 counties, 8 job titles), sort the bars from largest to smallest by clicking the chart in Output Viewer → Edit → right-click X axis → Sort by → Mean (or Count). Sorted bar charts are MUCH easier to read than alphabetical ones.' },
      ],
    },

    /* ════════════════════ 5. HISTOGRAMS ════════════════════ */
    {
      id: 'histograms',
      title: 'Histograms — the shape of a continuous variable',
      blocks: [
        { type: 'heading', level: 2, text: 'What a histogram is, and what it tells you' },

        { type: 'definition', term: 'Histogram',
          body: 'A bar chart where the bars represent ranges (called bins) of a continuous variable. The height of each bar shows the count of cases falling into that range. Histograms reveal the SHAPE of the distribution — symmetric, skewed, bimodal, etc.' },

        { type: 'paragraph', text:
          'A histogram is the single most-useful chart for any continuous variable. It shows you instantly whether your data is roughly normal (bell-shaped), skewed (long tail one side), bimodal (two peaks), uniform (flat), or has outliers (isolated bars at the extremes). Looking at a histogram should be your reflex any time you encounter a new continuous variable.' },

        { type: 'illustration', component: 'DistributionShapes',
          caption: 'Figure 2. Three classic distribution shapes that a histogram reveals. LEFT: left-skewed — long tail on the left. Mean < Median < Mode. CENTRE: symmetric — Mean ≈ Median ≈ Mode. RIGHT: right-skewed — long tail on the right. Mean > Median > Mode. The skewness statistic from Explore confirms what the histogram suggests visually.' },

        { type: 'steps', steps: [
          { title: 'Build a histogram in Chart Builder',
            body: 'Graphs → Chart Builder → Gallery → Histogram → double-click "Simple Histogram". Drag your continuous variable onto the X-Axis. Click OK.' },
          { title: 'Add a normal curve overlay',
            body: 'On the Element Properties tab, tick "Display normal curve". SPSS overlays the bell curve corresponding to your data\'s mean and SD. If your bars closely match the curve, the data is approximately normal. If they diverge dramatically, the data is not normal.' },
          { title: 'Adjust the number of bins (bars)',
            body: 'Too few bins hide pattern; too many make the chart noisy. SPSS picks a reasonable default. To override: edit the chart → double-click any bar → Properties → Binning → set Number of intervals (typically 8-15 works well for samples of 100-300).' },
        ]},

        { type: 'callout', tone: 'gold', title: 'Always include a histogram alongside the descriptive table',
          body: 'For every continuous variable you describe in Chapter 4, include a histogram as Figure X.Y. The reader can SEE the shape instantly — much faster than parsing skewness statistics. A histogram of income makes the positive skew obvious; the table only HINTS at it.' },
      ],
    },

    /* ════════════════════ 6. BOXPLOTS ════════════════════ */
    {
      id: 'boxplots',
      title: 'Boxplots — outliers and group comparisons',
      blocks: [
        { type: 'heading', level: 2, text: 'The most informative single chart' },

        { type: 'paragraph', text:
          'A **boxplot** (also called a box-and-whisker plot) packs a huge amount of information into a small space: the median, the middle 50% (IQR), the min, the max, and any outliers — all in one diagram. Once you learn to read a boxplot, it becomes the fastest way to summarise a continuous variable visually.' },

        { type: 'illustration', component: 'BoxplotAnatomy',
          caption: 'Figure 3. Anatomy of a boxplot. The BOX itself spans Q1 to Q3 — the middle 50% of cases (the IQR). The vertical line inside the box is the MEDIAN. The whiskers extend from the box to the smallest and largest "non-outlier" values. Dots beyond the whiskers are individual OUTLIERS — typically more than 1.5 × IQR away from the box. This single chart shows the centre, the spread, and the outliers all at once.' },

        { type: 'steps', steps: [
          { title: 'Build a single-variable boxplot',
            body: 'Graphs → Chart Builder → Gallery → Boxplot → double-click "Simple Boxplot". Drag your continuous variable onto the Y-Axis. (No X-Axis needed for a single boxplot.) Click OK.' },
          { title: 'Build a comparing-groups boxplot',
            body: 'Gallery → Boxplot → "Simple Boxplot". Drag the continuous variable to the Y-Axis. Drag the categorical grouping variable (e.g. gender) onto the X-Axis. Now you get one box per group — perfect for visual comparison of, say, male vs female math scores.' },
        ]},

        { type: 'callout', tone: 'success', title: 'Boxplots are an outlier-spotting tool',
          body: 'Any case shown as a dot beyond the whiskers is statistically an outlier (more than 1.5 × IQR from the box). Boxplots show you these immediately. If you see outlier dots, investigate them — are they data-entry errors? Genuine but rare cases? This is part of data cleaning before any inferential analysis.' },

        { type: 'mistake',
          title: 'Confusing the line inside the box with the mean',
          body: 'You glance at a boxplot and report "the mean is shown by the line in the middle of the box". It is NOT — the line in the box is the **median**, not the mean.',
          fix: 'The line inside the box is always the median. If you want to overlay the mean as well, edit the chart → Element Properties → tick "Show data labels" or add a mean marker. Boxplots are inherently a median-based chart.' },
      ],
    },

    /* ════════════════════ 7. SCATTER PLOTS ════════════════════ */
    {
      id: 'scatter',
      title: 'Scatter plots — relationships between two continuous variables',
      blocks: [
        { type: 'heading', level: 2, text: 'The "always plot first" rule' },

        { type: 'paragraph', text:
          'When you have two continuous variables and want to know whether they are related, the FIRST thing to do — before any correlation or regression — is plot a scatter plot. Each point on the scatter plot is one case, positioned by its values on the X and Y variables. The pattern of points tells you whether the relationship is linear, curved, strong, weak, or non-existent.' },

        { type: 'illustration', component: 'ScatterAnnotated',
          caption: 'Figure 4. A scatter plot with line of best fit. Each blue dot is one pupil; the X axis is weekly study hours, the Y axis is end-of-term math score. The cloud of points slopes upward → positive relationship. The line of best fit (gold) shows the average trend. You can see considerable scatter — the relationship is real but not perfect.' },

        { type: 'steps', steps: [
          { title: 'Build a scatter plot',
            body: 'Graphs → Chart Builder → Gallery → Scatter/Dot → double-click "Simple Scatter". Drag one continuous variable to X-Axis (the predictor, if you have a causal hypothesis). Drag the other continuous variable to Y-Axis (the outcome). Click OK.' },
          { title: 'Add a line of best fit',
            body: 'Edit the chart in Output Viewer → double-click → from the toolbar choose Elements → Fit Line at Total → tick Linear → Close. A line through the cloud of points appears.' },
          { title: 'Colour or shape points by a third variable',
            body: 'In Chart Builder, drag a categorical variable (e.g. gender) into the "Set color" slot. The dots are now coloured by gender, making it easy to see whether the relationship differs across groups.' },
        ]},

        { type: 'callout', tone: 'gold', title: 'Always plot before correlation',
          body: 'Before running Pearson, Spearman, or regression — ALWAYS plot the scatter first. It takes 30 seconds and reveals whether the relationship is linear (Pearson is fine), curved (use polynomial regression or transform), or has outliers (consider Spearman). Skipping this step is the #1 reason correlation results mislead researchers.' },
      ],
    },

    /* ════════════════════ 7.5 THE MACHAKOS PROCEDURE (Chart Builder) ════════════════════ */
    {
      id: 'machakos-walkthrough',
      title: 'The Machakos procedure — every chart, every screenshot',
      blocks: [
        { type: 'callout', tone: 'brand', title: 'The 4th and final lesson in the Descriptives course',
          body: [
            'By now you have built THREE essential Chapter-4 tables using the Machakos study:',
            '**Table 1** — Demographics frequencies (Frequencies lesson)',
            '**Table 2** — Composite descriptives (Central Tendency lesson)',
            '**Table 3** — Per-item Likert breakdowns (Standard Deviation lesson)',
            'This lesson adds the **visual layer** — the charts that go alongside those tables and make your findings easy to grasp at a glance.',
          ]},

        { type: 'heading', level: 2, text: 'The 4 chart types every Kenyan Master\'s Chapter 4 uses' },

        { type: 'comparison',
          headers: ['Chart type', 'When to use', 'Which Machakos variable'],
          rows: [
            ['**Bar chart**',           'Compare counts across categorical categories',       'Category (Principal / Teacher / Student)'],
            ['**Histogram**',           'Show the distribution of a CONTINUOUS variable',      'Math_KCSE_Mean (bell curve check)'],
            ['**Boxplot**',             'Compare medians + spot outliers across groups',       'Math_KCSE_Mean split by Category'],
            ['**Clustered bar chart**', 'Compare counts across TWO categorical variables at once', 'Category × Gender (male/female within each group)'],
          ]},

        { type: 'paragraph', text:
          'You could build all these with the classic Frequencies dialog\'s Charts button (that\'s what we did in the Frequencies lesson). But for anything more sophisticated than a plain bar chart, you need the **Chart Builder**. Let\'s walk through it.' },

        /* ─────── STEP 1 — Menu path ─────── */
        { type: 'heading', level: 3, text: 'STEP 1 — Open the Chart Builder' },

        { type: 'paragraph', text:
          'This is a DIFFERENT menu from everything we\'ve done so far. Charts live under the **Graphs** menu (not Analyze). Click:' },

        { type: 'callout', tone: 'brand', title: 'The click path',
          body: '**Graphs → Chart Builder…**' },

        { type: 'illustration', component: 'MachakosGraphsMenuPath',
          caption: 'Figure 1. The SPSS menu path for opening the Chart Builder. Notice this is under the Graphs menu — NOT Analyze. Ignore "Legacy Dialogs" — that\'s the older, harder-to-use way of building charts.' },

        { type: 'callout', tone: 'info', title: 'The first time you open Chart Builder',
          body: 'SPSS may pop up a warning saying "Before you use this dialog, measurement level should be set properly for each variable". If you followed the Data View lesson, your measurement levels are already correct — just click OK to dismiss the warning. If not, cancel, fix your measurement levels (Variable View → Measure column), then reopen Chart Builder.' },

        /* ─────── STEP 2 — Chart Builder interface ─────── */
        { type: 'heading', level: 3, text: 'STEP 2 — Understand the Chart Builder interface' },

        { type: 'paragraph', text:
          'The Chart Builder dialog is more complex than the ones you\'ve seen before. It has FOUR main areas — take a moment to identify each in the screenshot below:' },

        { type: 'illustration', component: 'MachakosGraphsChartBuilder',
          caption: 'Figure 2. The Chart Builder dialog has four main panels. TOP-LEFT: your Variables list (drag a variable to the axis). TOP-RIGHT: the chart preview area (drag chart types here). BOTTOM-LEFT: Gallery of chart types (Bar, Line, Area, Pie, Scatter, Histogram, Boxplot, etc.). BOTTOM-MIDDLE: sub-types for the chosen gallery item. BOTTOM-RIGHT: Element Properties (fine-tune what\'s on each axis).' },

        { type: 'comparison',
          headers: ['Chart Builder panel', 'What you do here'],
          rows: [
            ['**Variables list** (top-left)',      'Find your variable, then DRAG it onto the chart preview or an axis label.'],
            ['**Chart preview** (top-right)',      'The empty canvas where your chart takes shape. Drag chart types and variables here.'],
            ['**Gallery** (bottom-left)',          'Choose your chart TYPE — Bar, Histogram, Boxplot, etc. Then drag the sub-type from the middle panel to the preview.'],
            ['**Sub-types** (bottom-middle)',      'Once you pick a chart type, this panel shows variations — simple bar, clustered bar, stacked bar. DRAG one to the preview.'],
            ['**Element Properties** (bottom-right)', 'Configure what statistic to display (Count, Mean, Median), edit axis labels, change colors.'],
          ]},

        /* ─────── STEP 3 — Bar chart for Category ─────── */
        { type: 'heading', level: 3, text: 'STEP 3 — Build a simple bar chart for Category' },

        { type: 'paragraph', text:
          'The workflow is drag-and-drop. To build a bar chart of Category counts:' },

        { type: 'steps', steps: [
          { title: 'Click "Bar" in the Gallery panel', body: 'The Gallery is the bottom-left panel. Bar becomes highlighted with a blue border.' },
          { title: 'Drag the SIMPLE bar sub-type (top-left of the sub-types panel) onto the chart preview area', body: 'The preview area shows an empty template with "X-Axis?" and "Y-Axis?" labels.' },
          { title: 'Drag "Category" from the Variables list onto the X-Axis label in the preview', body: 'The preview updates immediately — you now see 3 bars for Principal, Teacher, Student. This is called "drag-and-drop" chart building.' },
          { title: 'Element Properties defaults to Statistic = "Count"', body: 'That\'s what we want — count of respondents in each category. If you wanted mean instead, you\'d change this dropdown.' },
          { title: 'Click OK', body: 'The bar chart appears in the Output Viewer. You already saw this chart in the Frequencies lesson (Figure 6 there).' },
        ]},

        /* ─────── STEP 4 — Histogram ─────── */
        { type: 'heading', level: 3, text: 'STEP 4 — Build a histogram for Math_KCSE_Mean' },

        { type: 'paragraph', text:
          'Histograms show the **distribution** of a continuous variable — the shape of the data. This is CRUCIAL to check before running Pearson correlation, t-tests, or regression, because those tests assume roughly normal (bell-shaped) distributions.' },

        { type: 'paragraph', text:
          'Open Chart Builder again (Graphs → Chart Builder). Then:' },

        { type: 'steps', steps: [
          { title: 'Click "Histogram" in the Gallery', body: 'Down the gallery list, click Histogram.' },
          { title: 'Drag the FIRST histogram sub-type onto the preview', body: 'The simple histogram — no bells and whistles.' },
          { title: 'Drag "Math_KCSE_Mean" onto the X-Axis label', body: 'The preview updates. Y-axis auto-fills with Frequency.' },
          { title: 'In the Element Properties panel (right), tick "Display normal curve"', body: 'This overlays a bell-shaped dashed line — makes it easy to see if your data is approximately normal.' },
          { title: 'Click OK', body: 'The histogram appears in the Output Viewer, showing the distribution of school Math KCSE means across all 274 respondents.' },
        ]},

        { type: 'illustration', component: 'MachakosGraphsHistogram',
          caption: 'Figure 3. Histogram of Math_KCSE_Mean for the Machakos study. The bars form a rough bell curve peaking around 5.5-6.0 KCSE points. The dashed normal-distribution overlay confirms the distribution is approximately normal (Mean = 5.92, SD = 0.82, N = 274). This tells you it\'s safe to use Pearson correlation, t-tests, and regression on this variable — no need for non-parametric alternatives.' },

        { type: 'callout', tone: 'gold', title: 'The 30-second normality check',
          body: [
            'The histogram is the fastest normality check you can do. Look for:',
            '**Roughly bell-shaped** = safe for parametric tests (Pearson, t-test, ANOVA, regression) ✅',
            '**Skewed to one side (long tail left or right)** = consider log-transformation or non-parametric alternatives (Spearman, Mann-Whitney) ⚠️',
            '**Multiple peaks** = you may have subgroups mixed in your data — split by group and analyse separately',
            '**Extreme peak/very flat** = check for data-entry errors (are you sure the values are correct?)',
          ]},

        /* ─────── STEP 5 — Boxplot ─────── */
        { type: 'heading', level: 3, text: 'STEP 5 — Build a boxplot to compare groups' },

        { type: 'paragraph', text:
          'A boxplot compares the median + spread of a continuous variable across categorical groups. In the Machakos study, we\'d use it to see: **Do Principals, Teachers, and Students rate the school\'s Math KCSE mean similarly?** (In principle they should be reporting the SAME school\'s actual KCSE mean — but real answers vary.)' },

        { type: 'paragraph', text:
          'In Chart Builder: Gallery → **Boxplot** → drag the "Simple Boxplot" sub-type to preview → drag **Category** to X-Axis → drag **Math_KCSE_Mean** to Y-Axis → click OK.' },

        { type: 'paragraph', text:
          'Boxplots pack a lot of information into a small space. Here\'s the anatomy — study this image and you\'ll be able to read any boxplot for the rest of your research career:' },

        { type: 'illustration', component: 'MachakosGraphsBoxplot',
          caption: 'Figure 4. Boxplot of Math_KCSE_Mean by Category, with the STUDENT boxplot annotated. Gold = Q3 (75th percentile). Navy = Median. Green = Q1 (25th percentile). Grey = Whiskers (highest/lowest non-outlier values). Red = Outlier (value more than 1.5× IQR beyond the box).' },

        { type: 'callout', tone: 'info', title: 'Why boxplots earn marks in a defence',
          body: 'Examiners LOVE boxplots because they show medians (not just means), spread, AND outliers all in one image. If you present a boxplot alongside your Chapter-4 mean/SD table, you demonstrate that you actually LOOKED at your data — not just ran automated stats. This is worth points.' },

        /* ─────── STEP 6 — Clustered bar for X-tabs ─────── */
        { type: 'heading', level: 3, text: 'STEP 6 — Build a clustered bar chart (Category × Gender)' },

        { type: 'paragraph', text:
          'Sometimes you want to show TWO categorical variables at once — for example, how gender distribution differs within each respondent category. That\'s where clustered bar charts shine.' },

        { type: 'paragraph', text:
          'In Chart Builder: Gallery → **Bar** → drag the "**Clustered bar**" sub-type to preview → drag **Category** to X-Axis → drag **Gender** onto the "Cluster on X: set color" drop zone (near the top of the preview) → click OK.' },

        { type: 'illustration', component: 'MachakosGraphsClusteredBar',
          caption: 'Figure 5. Clustered bar chart showing respondent distribution by Category and Gender in the Machakos study. Two clear stories emerge: (1) male teachers outnumber female teachers roughly 2:1 (38 vs 16), and (2) female students slightly outnumber male students (127 vs 85). Principal representation is balanced (5M/3F). This kind of nuance is invisible in a simple frequency table.' },

        { type: 'callout', tone: 'gold', title: 'The one-figure secret',
          body: 'Notice how ONE clustered bar chart replaced what would have been a 2-way table with 6 cells. Chapter-4 examiners consistently prefer well-labelled charts over text-heavy tables — as long as the chart is clearly captioned and the numbers are readable.' },

        /* ─────── Wrap-up ─────── */
        { type: 'heading', level: 3, text: '🎉 Your Descriptive Statistics section is now VISUALLY complete' },

        { type: 'paragraph', text:
          'You\'ve now built the FULL descriptive package for your Chapter 4 — tables AND charts. Here\'s the complete inventory you should have ready to paste into your thesis after finishing all 4 Descriptives lessons:' },

        { type: 'comparison',
          headers: ['Chapter-4 element', 'Which lesson taught you to build it'],
          rows: [
            ['Response Rate table',                                'Frequencies lesson (bonus)'],
            ['Demographics tables (Gender, Category, Form, Qual)', 'Frequencies lesson'],
            ['Bar chart of Category',                              'Frequencies + Producing Graphs (this) lessons'],
            ['Composite Descriptives table (Mean, SD, Skew, Kurt)', 'Central Tendency lesson'],
            ['Per-item Likert breakdown tables (1 per objective)', 'Standard Deviation lesson'],
            ['Histogram of the dependent variable',                'THIS lesson (Producing Graphs)'],
            ['Boxplots for group comparisons',                     'THIS lesson (Producing Graphs)'],
            ['Clustered bar chart of cross-tab',                   'THIS lesson (Producing Graphs)'],
          ]},

        { type: 'paragraph', text:
          'With all of these built, your Chapter 4 "Descriptive Statistics" section is complete, defensible, and matches the style of published Kenyan Master\'s and PhD theses. **Next: Inferential Statistics** — we\'ll use the SAME Machakos dataset to run Correlation, Chi-square, and Regression in the upcoming lessons.' },
      ],
    },

    /* ════════════════════ 8. POLISHING CHARTS ════════════════════ */
    {
      id: 'polishing',
      title: 'Polishing charts for publication',
      blocks: [
        { type: 'heading', level: 2, text: 'Editing charts in the Chart Editor' },

        { type: 'paragraph', text:
          'SPSS\'s default charts are functional but not publication-ready. They have a default title ("Histogram"), grey gridlines, awkward axis labels, and sometimes a chart-junk legend. Spend 90 seconds polishing each chart and they look professional.' },

        { type: 'steps', steps: [
          { title: 'Open the Chart Editor',
            body: 'In the Output Viewer, double-click any chart. The Chart Editor opens in a new window with editing toolbars.' },
          { title: 'Edit the title',
            body: 'Double-click the title at the top of the chart → type a clear, sentence-case title (e.g. "Figure 4.3 — Distribution of monthly household income (n = 189)"). Press Enter.' },
          { title: 'Edit axis labels',
            body: 'Double-click the X-axis label → change to a human-readable version with units in brackets (e.g. "Monthly household income (KSh)"). Repeat for Y-axis if needed.' },
          { title: 'Remove unnecessary gridlines',
            body: 'Right-click any gridline → Properties → uncheck Major Gridlines. Less visual clutter, easier to read.' },
          { title: 'Change colours to match your thesis style',
            body: 'Double-click any bar/element → Properties → Fill & Border → pick your colour (deep blue or muted grey works well for theses). Avoid bright primary colours — they look amateurish.' },
          { title: 'Close the Chart Editor',
            body: 'File → Close. The polished chart now appears in the Output Viewer and is ready to copy into Word.' },
        ]},

        { type: 'heading', level: 3, text: 'Exporting to Word' },

        { type: 'steps', steps: [
          { title: 'Right-click the chart in the Output Viewer',
            body: 'Choose "Copy" or "Copy as image" (the latter pastes as a static image).' },
          { title: 'Paste into Word',
            body: 'In your thesis Word doc, place cursor → Ctrl+V. The chart appears. Right-click → Wrap Text → In Line With Text (standard for thesis figures).' },
          { title: 'Add a caption',
            body: 'Beneath the figure, type "Figure 4.3 — [Title]" in italic. Number figures sequentially within each chapter (4.1, 4.2, 4.3 for Chapter 4 figures).' },
        ]},

        { type: 'callout', tone: 'info', title: 'For higher-quality export, save as PNG',
          body: 'For better print quality, right-click the chart → Export → choose PNG format → save with a meaningful filename (e.g. "fig_4_3_income_histogram.png"). Then in Word, Insert → Pictures → select the PNG. PNGs scale and print cleanly; copy-pasted charts sometimes pixelate.' },
      ],
    },

    /* ════════════════════ 9. COMMON CHART MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five chart sins that make figures look amateurish',
      blocks: [
        { type: 'heading', level: 2, text: 'Avoid these and your figures look published' },

        { type: 'mistake',
          title: 'Sin 1 — Pie chart with too many slices',
          body: 'You put 12 counties into a pie chart. Adjacent slices of similar size are indistinguishable. The legend is huge. The reader cannot extract any specific number.',
          fix: 'Pie charts are only acceptable with ≤ 5 categories AND large size differences between them. For everything else, use a horizontal bar chart sorted by frequency.' },

        { type: 'mistake',
          title: 'Sin 2 — 3D effects on charts',
          body: 'You add 3D shadows or perspective to your bar chart because it "looks fancy". The 3D effect distorts comparison — bars at the back look smaller than equivalent bars at the front.',
          fix: 'Never use 3D charts in academic work. Flat, 2D charts are the published standard. They are also easier to read accurately.' },

        { type: 'mistake',
          title: 'Sin 3 — Default chart title left as "Histogram"',
          body: 'Your figure caption says "Figure 4.3 — Income histogram" but the chart title in the image itself just says "Histogram". Looks like you forgot to edit it.',
          fix: 'Always edit the chart title (or remove it, if your figure caption already names the chart). Default titles in chart images look unprofessional.' },

        { type: 'mistake',
          title: 'Sin 4 — Missing units on the axes',
          body: 'Your scatter plot has Y axis labelled "Income". Income in what — KSh? USD? Thousands? Millions?',
          fix: 'Always include units on the axes: "Monthly income (KSh)", "Age (years)", "Score (/100)". Units in brackets at the end is the published convention.' },

        { type: 'mistake',
          title: 'Sin 5 — Using bar charts for continuous variables',
          body: 'You make a bar chart of income with one bar per respondent. The result is a meaningless forest of vertical lines.',
          fix: 'For continuous variables, use a histogram (shows distribution) or a boxplot (shows centre, spread, outliers) — not a bar chart of every raw value.' },
      ],
    },

    /* ════════════════════ 10. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'heading', level: 2, text: 'What you should now be able to do' },

        { type: 'summary', items: [
          'Choose the right chart for any variable: bar chart (categorical counts), pie chart (≤ 5 categories), histogram (continuous shape), boxplot (continuous spread + outliers), scatter plot (two continuous), line chart (over time).',
          'Open the Chart Builder via Graphs → Chart Builder and use the drag-and-drop workflow: pick chart from Gallery, drag variables onto axes, click OK.',
          'Build a simple bar chart for categorical variables, switching from counts to percentages via the Element Properties tab.',
          'Build a clustered bar chart for two categorical variables together.',
          'Build a histogram for any continuous variable, optionally overlaid with a normal curve to assess approximate normality.',
          'Build a boxplot, and read its five parts (median, Q1, Q3, whiskers, outliers).',
          'Build a scatter plot for two continuous variables, adding a line of best fit and optionally colouring points by a third variable.',
          'Polish charts in the Chart Editor: edit titles, axis labels, units, remove gridlines, change colours.',
          'Export charts to Word as PNG for high quality, and add APA-style figure captions (Figure 4.3 — ...).',
          'Avoid the five chart sins: too-many-slice pies, 3D effects, default titles, missing units, bar charts for continuous data.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Course complete — Descriptive Statistics',
          body: 'This is the final lesson of the Descriptive Statistics course. Across four lessons you now know how to produce frequency tables, choose between mean and median, report SD and IQR alongside them, and build publishable charts for every variable type. Your Chapter 4 has all the tools it needs.' },

        { type: 'callout', tone: 'success', title: 'Where to next',
          body: 'You have now mastered SPSS Basics AND Descriptive Statistics — the foundations of every postgraduate analysis. The next courses in the curriculum move into inferential statistics: **Correlation Analysis** (Pearson is already at full depth), **Regression**, **ANOVA**, and **Reliability Testing**. Each builds on the foundation you now have. Welcome to the world of confident statistical analysis.' },

        { type: 'paragraph', text:
          'Before finishing, open your dataset. Produce one chart of each type for variables that fit them. Polish each chart in the Chart Editor. Export to Word. By the end of this practice your Chapter 4 figures will be complete. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'heading', level: 2, text: 'Six final questions to close Descriptive Statistics' },

        { type: 'check',
          question: 'Which chart should you use to show the distribution shape of a continuous variable like age?',
          choices: ['Bar chart', 'Pie chart', 'Histogram', 'Line chart'],
          answer: 2,
          explanation: 'A **histogram** is the standard chart for showing the shape of a continuous variable. Each bar represents a range (bin) of values, and the height shows the count in that range. You can immediately see whether the distribution is symmetric, skewed, bimodal, etc.' },

        { type: 'check',
          question: 'You want to show the proportion of respondents in each of 12 counties. What is the best chart?',
          choices: [
            'A 12-slice pie chart',
            'A horizontal bar chart sorted from largest to smallest frequency',
            'A scatter plot',
            'A histogram',
          ],
          answer: 1,
          explanation: 'Pie charts get unreadable beyond ~5 slices — adjacent counties of similar size become indistinguishable. A horizontal bar chart sorted by frequency is far easier to read: each county has its own clearly-readable bar, and sorting puts the most common at the top.' },

        { type: 'check',
          question: 'In a boxplot, the line inside the box represents:',
          choices: ['The mean', 'The median', 'The minimum', 'The mode'],
          answer: 1,
          explanation: 'The line inside the box is always the **median** (Q2 — the 50th percentile). The box itself spans Q1 to Q3 (the middle 50% of cases, also called the IQR). Many students confuse this with the mean; boxplots are inherently median-based.' },

        { type: 'check',
          question: 'Before running Pearson correlation on two continuous variables, what should you ALWAYS do first?',
          choices: [
            'Check normality with Shapiro-Wilk',
            'Plot a scatter plot to confirm the relationship is linear and there are no outliers',
            'Run a t-test',
            'Recode the variables',
          ],
          answer: 1,
          explanation: 'The first thing to do before any correlation or regression is plot the scatter plot. It takes 30 seconds and tells you whether the relationship is linear (Pearson is fine), curved (use polynomial), or has outliers (consider Spearman). Skipping this step is the #1 reason correlation results mislead researchers.' },

        { type: 'check',
          question: 'Which of these is a chart sin to avoid in academic work?',
          choices: [
            'Sorting bars by frequency',
            'Including units on axis labels',
            'Adding 3D effects to bar charts because they look fancy',
            'Editing the default chart title',
          ],
          answer: 2,
          explanation: '**3D effects distort comparison** — bars at the back look smaller than equivalent bars at the front. Academic charts are always flat 2D. The other options are all GOOD practices: sort by frequency, label units, edit titles.' },

        { type: 'check',
          question: 'You produced a histogram with the default SPSS title "Histogram" and axis label "math_score". What should you do before putting it in your thesis?',
          choices: [
            'Use it as-is',
            'Double-click the chart in Output Viewer to open the Chart Editor; edit the title to something meaningful and the axis label to a human-readable name with units',
            'Take a screenshot',
            'Run the analysis again',
          ],
          answer: 1,
          explanation: 'Always polish charts before putting them in a thesis. Open the Chart Editor by double-clicking the chart. Edit the title (or remove it), change axis labels to human-readable versions with units (e.g. "End-of-term math score (/100)"), remove unnecessary gridlines, and choose academic-looking colours. Default chart elements look unprofessional.' },
      ],
    },
  ],
};
