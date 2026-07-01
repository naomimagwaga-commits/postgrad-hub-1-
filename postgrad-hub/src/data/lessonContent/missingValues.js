/**
 * SPSS Basics · Lesson 5 — Handling Missing Values
 * The most misunderstood topic in data preparation. Covers MCAR/MAR/MNAR,
 * detection, handling strategies, and what to write in the methodology chapter.
 */

export const MISSING_VALUES_LESSON = {
  id: 'basics-5',
  title: 'Handling missing values',
  subtitle: 'Module 03 · Course: SPSS Basics · Lesson 5 of 5',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'The most-misunderstood topic in data preparation',
      blocks: [
        { type: 'scene', body: [
          'Imagine you handed out 200 questionnaires. 200 pupils filled them in. But not every pupil answered every question. Some skipped the income question (sensitive). Some skipped Q12 because they got bored. Some left blank cells by accident. By the time you have entered the data, 18% of your cells are empty.',
          'You open SPSS, set up your variables properly (you remembered Lesson 3!), and run your first analysis — a Pearson correlation between income and satisfaction. The output says N = 138. You expected N = 200. Where did the other 62 cases go?',
          'They were dropped. SPSS quietly removed every case that had a missing value for either income or satisfaction. Now your examiner is going to ask: "why was your effective sample size only 69% of your collected sample? How did you handle missing data?" And if you cannot answer with confidence, your methodology section has a hole in it.',
          '**Missing data is not a side issue.** It is a methodological topic in its own right, and how you handle it is the subject of one of the most-asked questions in any thesis defence. This lesson teaches you everything you need to defend your missing-data strategy.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Explain the three TYPES of missingness** (MCAR, MAR, MNAR) and recognise which one applies to your dataset.',
            '**Detect missingness patterns** in SPSS using frequencies, the Missing Values Analysis dialog, and crosstabs.',
            '**Choose the right handling strategy** for your situation — listwise deletion, pairwise deletion, mean substitution, or multiple imputation.',
            '**Configure missing codes correctly** in Variable View so SPSS treats 999/998/997 as missing, not as real values.',
            '**Write the missing-data section** of your thesis methodology chapter using the standard template.',
            '**Defend your missing-data strategy** against the most common examiner questions.',
          ]},

        { type: 'why', body:
          'A study with no missing data does not exist in real research. Examiners do not expect zero missing data — they expect you to have THOUGHT about it and made principled choices. The student who says "I had 18% missing and here is what I did about it and why" looks competent. The student who never mentions missing data looks like they did not notice it existed.' },
      ],
    },

    /* ════════════════════ 2. WHAT COUNTS AS MISSING ════════════════════ */
    {
      id: 'what-counts',
      title: 'What counts as missing — and the three kinds of missing codes',
      blocks: [
        { type: 'heading', level: 2, text: 'Not all missing is the same' },

        { type: 'paragraph', text:
          'A "missing" value in your dataset can come from very different sources, and a good researcher distinguishes them. The standard convention in social-science research uses three different numeric codes — 999, 998, 997 — for three meaningfully different kinds of missingness.' },

        { type: 'comparison',
          headers: ['Code', 'Meaning', 'Typical scenario'],
          rows: [
            ['**999**', 'Refused to answer',                'Respondent ticked nothing or wrote "no comment". Common for sensitive questions about income, sexual behaviour, drug use.'],
            ['**998**', 'Don\'t know',                       'Respondent answered "I don\'t know" or "I\'m not sure". Different from refusing — they tried but couldn\'t.'],
            ['**997**', 'Not applicable',                    'Skip-logic question. "If you have no children, skip Q12-Q15". Q12-Q15 are not missing — they were never asked of this respondent.'],
            ['Blank / system-missing', 'Data-entry error or no response recorded', 'Someone typed nothing in the cell. SPSS shows it as a period (.) in Data View. Use sparingly — convert to one of the codes above when possible.'],
          ]},

        { type: 'why', body:
          'Why three codes instead of just one? Because the analysis can be very different. A 5% "refused to answer income" rate is methodologically interesting — perhaps wealthier respondents refused, biasing your sample. A 5% "not applicable" rate from skip logic is meaningless — those respondents were never supposed to answer. Lumping them together would obscure the story.' },

        { type: 'illustration', component: 'MissingValuesDialog',
          caption: 'Figure 1. The Missing Values dialog in SPSS, accessed by clicking the small grey box in the Missing column of Variable View. Here we declared three discrete missing codes: 999, 998, and 997. From now on, anywhere SPSS encounters one of those values, it will treat it as missing rather than as a real value.' },

        { type: 'callout', tone: 'warning', title: 'The most expensive beginner mistake',
          body: 'You used 999 to mean "refused" in your Excel file but never declared it as missing in SPSS Variable View. SPSS treats 999 as a real value. When you compute the mean income, SPSS averages real incomes (25000, 47000, 80000…) WITH the missing codes (999, 999, 999…), giving you a meaningless number. **Every variable that has missing codes MUST have them declared in the Missing column of Variable View.**' },

        { type: 'mistake',
          title: 'Using 0 (zero) as a missing code',
          body: 'You decide blanks will be coded as 0. But 0 might be a real value for income (someone unemployed), or for number of children (no children), or for hours studied (didn\'t study). SPSS cannot tell what is real and what is missing.',
          fix: 'Always use values that CANNOT plausibly occur in your data. 999, 998, 997 are conventional because they are above the range of almost any real measurement. For variables that genuinely can reach 999 (like income in thousands), use 9999 or -1 instead.' },
      ],
    },

    /* ════════════════════ 3. THE THREE TYPES OF MISSINGNESS ════════════════════ */
    {
      id: 'mcar-mar-mnar',
      title: 'MCAR, MAR, MNAR — the three types of missingness',
      blocks: [
        { type: 'heading', level: 2, text: 'Why your examiner cares which one applies' },

        { type: 'paragraph', text:
          'Statisticians distinguish three types of missingness, each with a strange acronym and a precise meaning. The type you have determines which handling strategies are safe — so you need to be able to name and explain them. Below is the plain-English version.' },

        { type: 'illustration', component: 'MissingTypesGrid',
          caption: 'Figure 2. The three patterns of missingness. MCAR (green): missing cells scattered randomly across the dataset. MAR (gold): missing cells concentrated in one column, with the pattern explainable by another variable. MNAR (red): missing cells concentrated in one variable in a way that depends on the variable\'s own value.' },

        { type: 'heading', level: 3, text: 'MCAR — Missing Completely At Random' },

        { type: 'paragraph', text:
          '**Missingness is unrelated to anything** — not to the variable itself, not to any other variable. The classic example: a research assistant accidentally spilled coffee on 12 random questionnaires and could not transcribe them. There is no pattern; the missingness is pure bad luck.' },

        { type: 'callout', tone: 'success', title: 'If your data is MCAR',
          body: 'You have the most freedom. Any handling strategy (listwise, pairwise, mean substitution, imputation) gives unbiased results — although you lose statistical power because of the smaller effective sample. MCAR is the most forgiving case.' },

        { type: 'heading', level: 3, text: 'MAR — Missing At Random' },

        { type: 'paragraph', text:
          '**Missingness depends on OTHER variables in your dataset, but not on the missing variable itself.** Example: men in your sample are less willing to answer the "anxiety" question. So anxiety is more often missing for males. But within males, the missingness is random — it doesn\'t depend on how anxious they actually are.' },

        { type: 'callout', tone: 'info', title: 'If your data is MAR',
          body: 'You can still get unbiased results, but you need a smarter strategy than listwise deletion. Multiple imputation (or a method that uses other variables to predict the missing value) is recommended. Listwise deletion may bias your results because it systematically removes one group.' },

        { type: 'heading', level: 3, text: 'MNAR — Missing Not At Random' },

        { type: 'paragraph', text:
          '**Missingness depends on the missing variable itself.** Classic example: high-income respondents refuse to answer the income question because they are protective of their wealth. So income is missing precisely *because* of how high it is. The missing values are systematically different from the observed ones.' },

        { type: 'callout', tone: 'warning', title: 'If your data is MNAR',
          body: 'This is the hardest case. Any handling strategy that does not explicitly model the missingness mechanism will give biased results. Mean substitution will under-estimate (because missing values are systematically higher than observed). Listwise deletion biases towards lower-income respondents. The honest approach: acknowledge the MNAR pattern in your methodology, report results both with and without imputation, and discuss the limitation explicitly.' },

        { type: 'reveal',
          prompt: 'In a workplace burnout survey, you notice 22% of respondents skipped the "have you considered quitting?" question. Which of MCAR/MAR/MNAR is most likely?',
          answer: 'Most likely **MNAR** — respondents who HAVE considered quitting are more likely to skip the question (fear of being identified, fear of consequences). The missingness depends on the variable\'s own value. This is exactly the kind of question that triggers MNAR. In your methodology you should acknowledge this pattern, run sensitivity analyses with and without those cases, and explicitly note the potential bias in your findings.' },
      ],
    },

    /* ════════════════════ 4. DETECTING MISSINGNESS ════════════════════ */
    {
      id: 'detecting',
      title: 'Detecting missingness patterns in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'Three SPSS tools that reveal what is missing' },

        { type: 'paragraph', text:
          'Before deciding how to handle missing data, you have to know how much of it you have and where it lives. SPSS gives you three tools for this, in order of complexity.' },

        { type: 'heading', level: 3, text: 'Tool 1 — Frequencies (the quickest scan)' },

        { type: 'paragraph', text:
          'For every variable, run Analyze → Descriptive Statistics → Frequencies. The output table shows a "Missing" row at the bottom of each variable\'s frequency table — the count and percentage of missing values for that variable.' },

        { type: 'paragraph', text:
          'In two minutes you can scan all your variables and identify the ones with serious missingness (>10%). Those are the variables that need careful handling.' },

        { type: 'heading', level: 3, text: 'Tool 2 — Missing Values Analysis (MVA)' },

        { type: 'paragraph', text:
          'For a deeper look, Analyze → Missing Value Analysis (this menu item is only available if your SPSS licence includes the Missing Values add-on; many university installations do). MVA gives you:' },

        { type: 'list', items: [
          'A summary table of missing values per variable and per case.',
          'Patterns of missingness — which combinations of variables tend to be missing together.',
          'Little\'s MCAR test — a statistical test of whether your missingness pattern is consistent with MCAR. A non-significant result (p > .05) suggests MCAR; a significant result (p < .05) suggests your data is NOT MCAR.',
          'Options for imputation directly from the dialog.',
        ]},

        { type: 'heading', level: 3, text: 'Tool 3 — Crosstabs (testing MAR by hand)' },

        { type: 'paragraph', text:
          'If you do not have the MVA add-on, you can still test for MAR manually. For any variable with serious missingness, create a new binary "missing flag" variable (Transform → Compute Variable → income_missing = 1 if income is missing, else 0), then run crosstabs of that flag against other key variables.' },

        { type: 'paragraph', text:
          'If income_missing is significantly associated with gender (more males missing) or with education (more low-education missing), you have evidence of MAR. If income_missing is unrelated to every other variable, you have evidence of MCAR.' },

        { type: 'callout', tone: 'gold', title: 'The honest workflow',
          body: 'Most thesis-quality studies will use Frequencies to get the % missing per variable, then crosstabs to spot any MAR patterns, then make a principled choice. Little\'s MCAR test is a bonus when available but not essential.' },

        { type: 'reveal',
          prompt: 'You run Frequencies on your 24-variable dataset. Twenty variables have <2% missing each. Three variables have 12-18% missing. One variable has 45% missing. How do you proceed?',
          answer: 'Three different strategies for three different situations:\n\n**The 20 low-missing variables** — usually safe to use listwise or pairwise deletion. The lost power is small.\n\n**The three 12-18% missing variables** — investigate with crosstabs. Are they MAR (concentrated in a subgroup)? If yes, consider multiple imputation or a sensitivity analysis. If MCAR, listwise/pairwise is still fine.\n\n**The 45% missing variable** — too much for any standard handling. Options: (a) drop the variable from your analyses entirely and explain in methodology; (b) collect more data to fill in the gap; (c) acknowledge the variable as illustrative only, not for inferential analysis. Anything else risks misleading results.' },
      ],
    },

    /* ════════════════════ 5. HANDLING STRATEGIES ════════════════════ */
    {
      id: 'strategies',
      title: 'Four handling strategies — pros, cons, when to use each',
      blocks: [
        { type: 'heading', level: 2, text: 'There is no one right answer' },

        { type: 'paragraph', text:
          'Each handling strategy makes a different trade-off between bias, statistical power, and complexity. Below are the four most common strategies in plain English, with guidance on when each is appropriate.' },

        { type: 'comparison',
          headers: ['Strategy', 'What it does', 'When to use it', 'Drawbacks'],
          rows: [
            ['**Listwise deletion** (also called complete-case analysis)', 'Drops any case with a missing value on ANY of the variables in the current analysis.', 'When missingness is MCAR and you have plenty of cases (effective sample still > 100).', 'Wastes data. Can dramatically shrink your effective sample. Bias if data is MAR or MNAR.'],
            ['**Pairwise deletion**', 'For each pair of variables, uses all cases where BOTH are present. Different pairs can have different Ns.', 'For correlation matrices and similar pair-wise analyses, especially when missingness is MCAR.', 'Different correlations have different sample sizes — can produce a non-positive-definite matrix that breaks factor analysis or SEM.'],
            ['**Mean substitution**', 'Replaces each missing value with the mean of that variable.', 'Almost never recommended in modern research. Used historically when computing power was limited.', 'Reduces variance artificially. Biases correlations towards zero. Should rarely appear in a 2025 thesis.'],
            ['**Multiple imputation (MI)**', 'Creates several (typically 5-20) plausible "filled-in" datasets using the relationships among your variables, runs your analysis on each, and pools the results.', 'When missingness is MAR (or MCAR) and you have ≥ 5% missing on key variables. The modern gold standard.', 'More complex. Requires the SPSS Missing Values add-on or a tool like R. But the gain in unbiasedness is large.'],
          ]},

        { type: 'heading', level: 3, text: 'The decision tree for thesis work' },

        { type: 'decision', title: 'How should you handle your missing data?',
          branches: [
            { condition: '< 5%', action: 'Listwise or pairwise deletion is fine. Mention in methodology that less than 5% of cases were missing and complete-case analysis was used.' },
            { condition: '5-10%', action: 'Test whether your missingness is MCAR using Little\'s test or crosstabs. If MCAR, listwise/pairwise is still defensible. If not MCAR, consider multiple imputation.' },
            { condition: '10-20%', action: 'Strongly consider multiple imputation. Listwise deletion at this level can bias your results and dramatically reduce power. Report both with and without imputation as a sensitivity check.' },
            { condition: '> 20%', action: 'Multiple imputation is almost essential. Also seriously consider whether the affected variables can be salvaged at all — perhaps drop them, perhaps collect more data, perhaps reformulate the research question.' },
            { condition: '> 40% on a key variable', action: 'That variable is unlikely to support meaningful inference no matter what you do. Best honest path: report it descriptively only and remove it from inferential analyses, explaining in methodology.' },
          ]},

        { type: 'callout', tone: 'gold', title: 'The pragmatic default for most theses',
          body: 'For thesis-level work with overall missingness under 10% and no strong MAR patterns, **pairwise deletion** for correlations and **listwise deletion** for regression/ANOVA is defensible and common. Document your choice in the methodology. If overall missingness exceeds 10%, learn how to use multiple imputation — it is increasingly expected in published research.' },
      ],
    },

    /* ════════════════════ 6. CONFIGURING SPSS ════════════════════ */
    {
      id: 'configuring',
      title: 'Configuring SPSS to handle missing values correctly',
      blocks: [
        { type: 'heading', level: 2, text: 'Where the settings live and how to choose them' },

        { type: 'paragraph', text:
          'You have two layers of missing-value settings in SPSS: the **per-variable declaration** in Variable View (which we covered in Lessons 2-3), and the **per-analysis treatment** in each analysis dialog.' },

        { type: 'heading', level: 3, text: 'Layer 1 — Variable View Missing column (one-time setup)' },

        { type: 'paragraph', text:
          'For every variable that has missing codes, open Variable View → click the small grey box in the **Missing** cell → tick **Discrete missing values** → type your codes (999, 998, 997) → click OK. This tells SPSS, permanently for this dataset, that those codes are missing wherever they appear.' },

        { type: 'paragraph', text:
          'Once this is done, SPSS automatically skips those values in every analysis. You can do this for all variables at once using **Data → Define Variable Properties** (covered in Lesson 3).' },

        { type: 'heading', level: 3, text: 'Layer 2 — Per-analysis missing-value treatment' },

        { type: 'paragraph', text:
          'In almost every analysis dialog (correlations, regression, factor analysis, reliability), there is an **Options…** button. Inside Options there is a "Missing Values" section with the choice between **Exclude cases listwise** and **Exclude cases pairwise**.' },

        { type: 'list', items: [
          '**Exclude cases listwise** — drops the entire row if any variable in this analysis is missing. Use for regression, ANOVA, factor analysis (most procedures REQUIRE listwise).',
          '**Exclude cases pairwise** — uses each pair of variables independently. Use for correlation matrices and reliability analysis where each pair can have a different N.',
          '**Replace with mean** — never use this in 2025 thesis work; it biases variances and correlations towards zero.',
        ]},

        { type: 'callout', tone: 'info', title: 'Pairwise is the default for correlations',
          body: 'In Analyze → Correlate → Bivariate → Options, the default is "Exclude cases pairwise". Leave it there for correlation matrices. Switch to listwise only if you specifically need every correlation to use the same N (rare in thesis work).' },

        { type: 'heading', level: 3, text: 'Layer 3 — Recoding missing for special analyses' },

        { type: 'paragraph', text:
          'Sometimes you want to ANALYSE the missing-data pattern itself — for example, to check whether "refused to answer income" relates to gender. To do this:' },

        { type: 'steps', steps: [
          { title: 'Use Transform → Recode into Different Variables',
            body: 'Create a new variable income_missing = 1 if income = 999, else 0. Now income_missing is a binary indicator that you CAN analyse.' },
          { title: 'Run crosstabs of income_missing against other variables',
            body: 'Analyze → Descriptive Statistics → Crosstabs → income_missing in rows, gender in columns. Tick chi-square in Statistics. A significant chi-square indicates MAR — the missingness is associated with gender.' },
        ]},
      ],
    },

    /* ════════════════════ 7. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing the missing-data section of your methodology',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard template' },

        { type: 'paragraph', text:
          'Every thesis methodology chapter should include a paragraph on missing-data handling. Below is a template you can adapt. It covers the four things examiners look for: total missingness, the pattern, your handling strategy, and your justification.' },

        { type: 'apa', text:
          'Across the [N] cases and [k] variables in the dataset, the overall rate of missing data was [X%]. Frequencies analysis indicated that [most/some] variables had missingness below 5%, with [specific variables] showing higher rates of [Y%] and [Z%]. Inspection of missingness patterns using [crosstabs / Little\'s MCAR test / Missing Values Analysis] suggested the missingness was best characterised as [MCAR / MAR / MNAR]; specifically, [brief justification, e.g. "Little\'s test was non-significant (χ² = 14.2, df = 18, p = .65), supporting an MCAR assumption"]. Given this pattern and the modest overall rate, [listwise / pairwise / multiple-imputation] deletion was selected as the primary handling strategy. [Sensitivity analyses were conducted using an alternative strategy and produced substantively similar results / where appropriate].' },

        { type: 'heading', level: 3, text: 'A complete worked example' },

        { type: 'apa', text:
          'Across the 198 valid responses and 24 variables in the analysis, the overall rate of missing data was 4.3%. Twenty variables had missingness below 3% each. The "monthly household income" item had the highest rate (12.1%), followed by "supervisor support" (6.5%). Crosstabs analysis of an income-missing indicator against gender (χ²(1) = 1.12, p = .29) and education (χ²(3) = 3.41, p = .33) revealed no significant associations, supporting the assumption that missingness was completely at random (MCAR). Given the modest overall rate and the absence of detectable MAR patterns, pairwise deletion was used for correlation analyses and listwise deletion for the multiple regression. A sensitivity analysis using multiple imputation (5 imputed datasets) produced regression coefficients within 0.04 SD of the listwise estimates, supporting the robustness of the findings.' },

        { type: 'callout', tone: 'success', title: 'The four numbers your examiner expects',
          body: '**Overall missingness rate · highest-missing variable rate · pattern test result · handling strategy.** Hit all four and the missing-data question is closed before it is even asked.' },

        { type: 'reviewerComments',
          items: [
            { q: 'What was the overall rate of missing data in your sample?',
              a: 'The overall rate was 4.3% across all variables. Three variables had rates above 5% — income (12.1%), supervisor support (6.5%), and one item on the burnout scale (5.8%). These are reported individually in Table 3.2.' },
            { q: 'How do you know your missingness is MCAR?',
              a: 'I tested for systematic missingness patterns using crosstabs of an "income missing" indicator against the main demographic variables. None of the associations reached significance. I also ran Little\'s MCAR test where the SPSS Missing Values add-on was available; it was non-significant (χ² = 14.2, p = .65), consistent with an MCAR assumption.' },
            { q: 'Why did you choose pairwise rather than listwise deletion?',
              a: 'For the correlation matrices, pairwise deletion preserved the maximum N for each pair of variables, increasing statistical power. For the regression analyses, where every predictor must be simultaneously present, I used listwise deletion. This is the standard approach in the literature and is documented in Section 3.7 of the methodology chapter.' },
            { q: 'Did you consider multiple imputation?',
              a: 'Yes. Given the modest overall missingness rate (under 5%) and the lack of evidence for MAR or MNAR patterns, multiple imputation was not necessary as the primary strategy. However, I ran a sensitivity analysis using 5 imputed datasets for the main regression model, and the results were substantively unchanged — coefficients shifted by less than 0.04 standard deviations, p-values stayed in the same significance bands. This is reported in Appendix C.' },
          ]},
      ],
    },

    /* ════════════════════ 8. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common missing-data mistakes',
      blocks: [
        { type: 'heading', level: 2, text: 'Five mistakes that undermine your missing-data section' },

        { type: 'mistake',
          title: 'Mistake 1 — Not declaring missing codes in Variable View',
          body: 'You use 999 in Excel for missing income but never tell SPSS in Variable View Missing column. SPSS treats 999 as a real income value. Your mean income comes out at KSh 35,400 — a number that includes the missing codes.',
          fix: 'For every variable, set the Missing column in Variable View. Use Discrete missing values → type 999 (and 998, 997 if you used them). Do this once at the start of your project.' },

        { type: 'mistake',
          title: 'Mistake 2 — Using 0 as a missing code',
          body: 'You coded blanks as 0. But 0 might be a real value — for income (unemployed), number of children (none), or hours studied (didn\'t study). SPSS cannot distinguish real zeros from missing zeros.',
          fix: 'Always use codes that CANNOT occur in your real data. 999 / 998 / 997 are standard because they exceed the range of almost any measurement. For variables where 999 could occur, use 9999 or -1.' },

        { type: 'mistake',
          title: 'Mistake 3 — Saying "the data had no missing values"',
          body: 'You sheepishly claim there was no missing data — perhaps because admitting it feels like an admission of failure. The examiner runs Frequencies on your dataset and finds 14% missing on the burnout scale.',
          fix: 'Always REPORT your missingness honestly. There is no shame in having missing data — every real study has it. The shame is in pretending it does not exist.' },

        { type: 'mistake',
          title: 'Mistake 4 — Using mean substitution in 2025',
          body: 'You replace every missing value with the variable mean. SPSS lets you. But mean substitution biases variances downward and correlations towards zero. Modern reviewers will flag this as outdated practice.',
          fix: 'Either use listwise/pairwise deletion (for modest missingness) or multiple imputation (for more serious missingness). Never use mean substitution as your primary strategy in 2025.' },

        { type: 'mistake',
          title: 'Mistake 5 — Listwise deletion without checking the consequences',
          body: 'You run regression on 6 variables. SPSS drops every case with even one missing value across all 6, leaving you with effective N = 87 from your original 200. You analyse and report without noticing.',
          fix: 'After any listwise analysis, CHECK the effective N. If it shrinks dramatically, you either need to (a) acknowledge the loss honestly in methodology, (b) drop one of the high-missing variables from the model, or (c) switch to multiple imputation to preserve cases.' },
      ],
    },

    /* ════════════════════ 9. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'heading', level: 2, text: 'What you should now be able to do' },

        { type: 'summary', items: [
          'Distinguish the three kinds of missing codes (999 refused, 998 don\'t know, 997 not applicable) and code each appropriately in your Excel file.',
          'Declare missing codes in SPSS Variable View Missing column so SPSS treats them as missing, not as real values.',
          'Explain MCAR (random scatter), MAR (depends on another variable), and MNAR (depends on the variable itself) in plain English.',
          'Detect missingness patterns using Frequencies (quick scan), Missing Values Analysis (if licensed), and crosstabs of a missing-indicator variable (manual MAR test).',
          'Choose the right handling strategy: listwise/pairwise for < 5% MCAR, multiple imputation for higher rates or MAR/MNAR.',
          'Configure SPSS correctly — both the per-variable Missing declaration and the per-analysis Options → Missing Values setting.',
          'Write the missing-data section of your methodology chapter using the standard four-element template: overall rate, highest-missing variable, pattern test, handling strategy.',
          'Anticipate and answer examiner questions about your missing-data strategy.',
          'Avoid the five common mistakes — undeclared codes, using 0 as missing, denying missingness exists, mean substitution, ignoring sample loss from listwise deletion.',
        ]},

        { type: 'callout', tone: 'gold', title: 'You have completed SPSS Basics',
          body: 'This is the final lesson of the SPSS Basics course. Across five lessons you have moved from "I have no idea what I\'m doing" to confidently navigating the SPSS interface, distinguishing Data View from Variable View, defining variables professionally, importing real data cleanly from Excel and other tools, and handling missing data with methodological care. You are no longer a beginner — you are an SPSS user ready to start running real analyses.' },

        { type: 'callout', tone: 'success', title: 'Where to next',
          body: 'The next course in the curriculum is **Descriptive Statistics** — turning your cleaned dataset into the Chapter 4 frequency tables, means, and visualisations that examiners expect. After that come Correlation Analysis (Pearson is already available at full depth), Regression, ANOVA, and Reliability Testing. Each course builds on the foundation you now have. Welcome to the world of confident SPSS work.' },

        { type: 'paragraph', text:
          'Before finishing, take one more look at the dataset you are working with for your thesis. Run Frequencies on every variable. Count up the missing values. Decide on a handling strategy. Write a paragraph describing what you found and what you will do. This 30-minute exercise — done now, before any analysis — saves you from re-doing analyses later. Then come back for the final knowledge check of SPSS Basics.' },
      ],
    },

    /* ════════════════════ 10. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'heading', level: 2, text: 'Six final questions to close SPSS Basics' },

        { type: 'check',
          question: 'You used 999 in your Excel file to mean "refused to answer". After importing to SPSS, what must you do?',
          choices: [
            'Nothing — SPSS detects missing codes automatically',
            'Open Variable View → click the Missing cell → declare 999 as a discrete missing value',
            'Delete all the 999 entries from Data View',
            'Convert all 999s to blanks',
          ],
          answer: 1,
          explanation: 'SPSS has no way to know that 999 is your missing code unless you tell it. Declare 999 (and 998, 997 if used) in the Missing column of Variable View for every variable that uses them. Without this declaration, SPSS treats 999 as a real value and corrupts your analyses.' },

        { type: 'check',
          question: 'A workplace survey asks "have you considered quitting?" and 25% of respondents skip the question. Which type of missingness is this most likely to be?',
          choices: ['MCAR (Missing Completely At Random)', 'MAR (Missing At Random)', 'MNAR (Missing Not At Random)', 'None — 25% is too low to worry about'],
          answer: 2,
          explanation: 'This is a classic MNAR (Missing Not At Random) scenario. Respondents who HAVE considered quitting are more likely to skip the question — out of fear of being identified or facing consequences. The missingness depends on the variable\'s own value, which is the definition of MNAR. This needs explicit acknowledgement in your methodology.' },

        { type: 'check',
          question: 'Why is 0 a bad choice as a missing code?',
          choices: [
            'SPSS does not accept 0 as a missing code',
            '0 might be a real value (e.g. zero income for unemployed, zero children, zero hours studied) — SPSS cannot tell real zeros from missing zeros',
            '0 is the same as blank in SPSS',
            'It works fine — 0 is a good choice',
          ],
          answer: 1,
          explanation: 'Missing codes must be values that CANNOT plausibly occur in your real data. 0 is often a meaningful real value (unemployed = 0 income, no children = 0). The convention 999/998/997 is used because these values are above the range of almost any real measurement.' },

        { type: 'check',
          question: 'You run a regression with 6 predictors. Your sample was 200 but SPSS reports the analysis ran on N = 87. What happened and what should you do?',
          choices: [
            'SPSS made an error — re-run the analysis',
            'Listwise deletion dropped every case with a missing value on any of the 6 predictors — you need to either acknowledge the loss in methodology, drop a high-missing predictor, or use multiple imputation',
            'Just report N = 200 anyway',
            'Multiply your results by 200/87',
          ],
          answer: 1,
          explanation: 'Multiple regression requires every predictor to be present, so SPSS uses listwise deletion. With 6 predictors and even small missingness on each, the effective N can shrink dramatically. Solutions: (a) honestly report the loss, (b) drop a high-missing predictor and explain why, or (c) use multiple imputation to recover cases. Never inflate the reported N.' },

        { type: 'check',
          question: 'For a correlation matrix where you want to use each pair\'s maximum N, which option should you choose in the Bivariate Correlations Options dialog?',
          choices: ['Exclude cases listwise', 'Exclude cases pairwise', 'Replace with mean', 'Do not exclude any cases'],
          answer: 1,
          explanation: '**Exclude cases pairwise** uses every available pair of values for each correlation, even if some cases are missing for other variables. This preserves statistical power. Listwise would drop a case if ANY variable in the matrix is missing for that case — much more wasteful in correlation analysis.' },

        { type: 'check',
          question: 'Which of these is the SAFEST way to write up a study where 6% of your data was missing?',
          choices: [
            '"The dataset had no missing values."',
            '"Missing data was handled by the software."',
            '"Across the 24 variables, overall missingness was 6%. Crosstabs of missingness indicators against demographic variables revealed no significant patterns (all p > .15), supporting an MCAR assumption. Pairwise deletion was used for correlation analyses and listwise deletion for regression. A sensitivity analysis using multiple imputation produced substantively similar results."',
            '"6% was missing but it does not matter."',
          ],
          answer: 2,
          explanation: 'Option C hits all four elements examiners look for: overall rate (6%), pattern test (crosstabs, MCAR conclusion), handling strategy (pairwise + listwise), and sensitivity check (multiple imputation produced similar results). The other options are either dishonest or vague enough to invite reviewer pushback.' },
      ],
    },
  ],
};
