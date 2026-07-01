/**
 * Data Cleaning · Lesson 1 — Data Cleaning Basics
 * Covers the survival skills: impossible-value detection, missing patterns,
 * duplicates, recoding, reverse-coding Likert, Compute Variable, Select Cases.
 *
 * UNLOCK RULE: This lesson is FREE for any student who has unlocked ANY paid
 * lesson on the site. See SpssAcademy.jsx → accessReason() and freeWithAnyPaid.
 */

export const DATA_CLEANING_BASICS_LESSON = {
  id: 'clean-1',
  title: 'Data Cleaning Basics — from messy export to analysis-ready file',
  subtitle: 'Module 03 · Course: Data Cleaning · Lesson 1 of 1',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'The single most under-taught skill in postgrad analysis',
      blocks: [
        { type: 'scene', body: [
          'You finished six weeks of data collection at Kenyatta University. 312 Likert questionnaires, all entered into Excel by two research assistants. You open the file with the satisfaction of a job done — and stop. Three columns have age values like "29", "thirty", "20-ish", "?" and 999. Two reverse-coded items still need to be flipped before any reliability test will work. A handful of respondents seem to appear twice (or are they twins?). Some columns are 80% complete; one is 30% complete. There are values that simply could not exist — a "1" in a column that should only contain 1-5, and a "6" too.',
          'Your supervisor wants Chapter 4 in three weeks. You open SPSS, paste the Excel data in, and try to run Cronbach\'s alpha. SPSS returns a number that looks suspicious because you forgot to reverse-code item 7. You try Compare Means and SPSS warns you that 28% of cases are being dropped due to missing values. You haven\'t even started the analysis and you\'re already in trouble.',
          'This lesson teaches the **data-cleaning workflow** that separates the students who finish their theses cleanly from those who fight their dataset for months. None of the techniques are mathematically hard. All of them are essential. By the end you\'ll know how to spot impossible values, classify and handle missing data, find duplicates, recode variables (including the eternal reverse-coding Likert problem), build composite variables, and filter cases for sub-analyses. The same workflow every time. No more surprises in Chapter 4.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Spot impossible values, typos, and out-of-range entries** before they ever reach an analysis.',
            '**Classify missing data** as MCAR, MAR, or MNAR — and pick an appropriate handling strategy.',
            '**Find and resolve duplicate cases** without losing real twins or repeated measures.',
            '**Recode variables** including the most common case: reverse-coding negatively-worded Likert items.',
            '**Build composite variables** using Compute Variable — total scores, mean indices, dummy variables.',
            '**Subset your data** using Select Cases — for split analyses or excluding ineligible respondents.',
            '**Document every cleaning step in a syntax script** so your work is reproducible (and defendable).',
            '**Hand a clean dataset to a colleague (or a future you)** that runs without surprises.',
          ]},

        { type: 'why', body:
          'Most thesis pain happens at the data-cleaning stage, not at the analysis stage. Supervisors and examiners assume you know how to clean — they almost never teach it. This lesson is the unglamorous toolkit that makes every other lesson in the academy actually usable. Master this once and the rest of your degree gets dramatically easier.' },
      ],
    },

    /* ════════════════════ 2. PHILOSOPHY ════════════════════ */
    {
      id: 'philosophy',
      title: 'The philosophy of clean data',
      blocks: [
        { type: 'heading', level: 2, text: 'Two unbreakable rules' },

        { type: 'paragraph', text:
          'Before you touch a single value, internalise two rules that good researchers never break. Examiners will not always articulate these to you — but they will notice when you violate them.' },

        { type: 'steps', steps: [
          { title: 'Rule 1 — NEVER work directly on your raw data file',
            body: 'Make a copy of your raw export the moment it arrives, label it `..._RAW.sav`, and lock it in a folder you do not touch. Do ALL cleaning on a working copy (e.g. `..._WORKING.sav`). If you make a mistake (you will), you can always re-derive everything from the raw file. Students who clean directly on the raw file and lose months of work are unfortunately common.' },
            { title: 'Rule 2 — DOCUMENT every cleaning decision in syntax',
              body: 'Every recode, every excluded case, every computed variable: paste the SPSS syntax into a single .sps script. Comment WHY each step was done ("Reverse-coded items 4, 7, 12 because they were negatively worded — see questionnaire p.3"). When your examiner asks "how did you handle missing data?" or "why is this respondent excluded?", you open the syntax and the answer is right there.' },
        ]},

        { type: 'callout', tone: 'gold', title: 'The 60/40 rule',
          body: 'A standard data-analysis project spends roughly **60% of the time on cleaning** and **40% on actual analysis**. If you find yourself spending only 10-15% on cleaning, you are almost certainly skipping crucial checks. If you find yourself spending 90% on cleaning, your data-collection instrument needed more piloting. The 60/40 split is the healthy middle.' },
      ],
    },

    /* ════════════════════ 3. IMPOSSIBLE VALUES ════════════════════ */
    {
      id: 'impossible-values',
      title: 'Step 1 — Hunting impossible values and typos',
      blocks: [
        { type: 'heading', level: 2, text: 'The fastest way to catch them: Frequencies' },

        { type: 'paragraph', text:
          'The first cleaning pass on any new dataset is always the same: run Frequencies on every variable. The Frequencies table makes impossible values jump out immediately — a "6" in a column that should only contain 1-5, a "199" in an age column, a "0" in a height column. This single 5-minute step catches 80% of data-entry errors.' },

        { type: 'steps', steps: [
          { title: 'Run Frequencies on everything',
            body: 'Analyze → Descriptive Statistics → Frequencies → move EVERY variable into Variable(s) → click OK. SPSS produces one table per variable.' },
          { title: 'Scan for impossible values',
            body: 'Likert items coded 1-5: look for values outside 1-5. Gender coded 1/2: look for any other code. Age: look for values < 18 (if your sample is adults) or > 120. Negative values where they shouldn\'t exist.' },
          { title: 'Check for the SPSS system-missing dot (.)',
            body: 'A "." in a cell means SPSS knows nothing about that value. Count how many appear in each variable — this is your real missing-data picture.' },
          { title: 'Use Descriptives for range checks on continuous variables',
            body: 'Analyze → Descriptive Statistics → Descriptives → tick Minimum and Maximum. If your dataset has age range 18-105 but Min = 0 and Max = 999, you have data-entry errors AND undefined missing codes mixed together.' },
        ]},

        { type: 'illustration', component: 'ImpossibleValues',
          caption: 'Figure 1. Frequencies output revealing typos. The "satisfaction" item should be coded 1-5 but the frequency table shows codes 1, 2, 3, 4, 5, 6, AND 55. The 6 is probably a fat-finger error (meant 5); the 55 is probably a missed comma (meant 5.5? Or two separate values?). Either fix in the data file or recode them as system-missing before analysis.' },

        { type: 'callout', tone: 'warning', title: 'Fix in the cleaning script, not by retyping',
          body: 'When you find an impossible value, do NOT just retype the cell value in Data View. That breaks your audit trail. Use Transform → Recode into Same Variables → If condition (e.g. "satisfaction = 6") to write the change into syntax. Then if you ever re-run from raw, the fix re-applies automatically.' },
      ],
    },

    /* ════════════════════ 4. MISSING DATA ════════════════════ */
    {
      id: 'missing-data',
      title: 'Step 2 — Classifying and handling missing data',
      blocks: [
        { type: 'heading', level: 2, text: 'MCAR, MAR, MNAR — what they mean' },

        { type: 'paragraph', text:
          'Not all missing data is equal. Statistical convention recognises three mechanisms behind missingness, and your handling choice depends on which one you have. Understanding the difference will save you arguments with both supervisors and reviewers.' },

        { type: 'comparison',
          headers: ['Mechanism', 'What it means', 'Real example', 'Safe handling'],
          rows: [
            ['**MCAR** (Missing Completely At Random)', 'Probability of missingness is unrelated to anything in your data.', 'A questionnaire page was lost in transit at random.', 'Listwise or pairwise deletion is safe. Or mean/multiple imputation.'],
            ['**MAR** (Missing At Random)', 'Probability of missingness depends on OTHER observed variables but not on the missing value itself.', 'Younger respondents skipped the income question more often (missingness depends on observed age).', 'Multiple imputation (best), or model-based methods. Pairwise deletion biased.'],
            ['**MNAR** (Missing Not At Random)', 'Probability of missingness depends on the missing value itself.', 'High earners refused to disclose income (missingness depends on the unobserved income value).', 'Hard problem. Acknowledge in limitations; sensitivity analysis.'],
          ]},

        { type: 'heading', level: 3, text: 'Practical handling — what to do in SPSS' },

        { type: 'steps', steps: [
          { title: 'Quantify missingness FIRST',
            body: 'Analyze → Analyze Patterns → Missing Value Analysis (or Frequencies → check the "Missing" row). Report % missing per variable. Variables with > 30% missing should be flagged as a serious problem.' },
          { title: 'Decide a default policy and stick to it',
            body: 'For most thesis-level analyses: **listwise deletion** (each case dropped from any analysis where any used variable is missing) is the conservative default. SPSS does this automatically in most procedures. Report the analysis N every time.' },
          { title: 'Pairwise deletion — use sparingly',
            body: 'Pairwise keeps each case in the analyses where it has data. It gives a different effective N for every correlation in a matrix, which examiners often dislike. Use only when explicitly justified.' },
          { title: 'Mean imputation — usually a bad idea',
            body: 'Replacing missing values with the variable mean shrinks variance and biases correlations. Almost never the right answer at thesis level. Multiple imputation is far better, but more advanced.' },
          { title: 'Define proper missing codes in Variable View',
            body: 'If 999 means "Refused" and 998 means "Don\'t know", go to Variable View → Missing column → declare 999 and 998 as missing. Otherwise SPSS will treat them as the actual numeric values and bias every mean and correlation.' },
        ]},

        { type: 'callout', tone: 'gold', title: 'For the full lesson on missing values',
          body: 'See **SPSS Basics Lesson 5 (Handling missing values)** for the deeper coverage — including the Variable View Missing column, Define Missing Values dialog, and listwise vs pairwise deletion choices in each analysis dialog. The current lesson covers the cleaning-pipeline view; that one covers the SPSS mechanics.' },
      ],
    },

    /* ════════════════════ 5. DUPLICATES ════════════════════ */
    {
      id: 'duplicates',
      title: 'Step 3 — Finding and resolving duplicate cases',
      blocks: [
        { type: 'heading', level: 2, text: 'Detect them before they distort your analysis' },

        { type: 'paragraph', text:
          'Duplicates sneak in everywhere. The research assistant entered Mary\'s questionnaire twice. The online survey logged the same respondent\'s two attempts. The Excel file had a phantom row left over from a previous version. A single duplicate inflates your sample size, biases correlations, and gives the same respondent\'s opinion double weight. Find and resolve them BEFORE any analysis.' },

        { type: 'steps', steps: [
          { title: 'Use Identify Duplicate Cases',
            body: 'Data → Identify Duplicate Cases. Move your respondent ID (or, if you have no ID, ALL your variables) into "Define matching cases by". Make sure "Indicator of primary cases" is ticked. Click OK.' },
          { title: 'Review the flag variable SPSS creates',
            body: 'SPSS adds a new variable `PrimaryLast` (or similar) coded 1 for primary cases (kept) and 0 for duplicates (to drop). Sort by this variable to inspect every flagged duplicate.' },
          { title: 'Inspect each duplicate before deleting',
            body: 'Two cases with identical age + gender + responses to first 5 items might be true duplicates — OR might be two genuinely-similar respondents. If you have an ID variable, the ID match is decisive. Without one, exercise judgment.' },
          { title: 'Use Select Cases to drop confirmed duplicates',
            body: 'Data → Select Cases → If condition is satisfied → PrimaryLast = 1 → tick "Delete unselected cases". This permanently removes the duplicates. (Make sure you saved a backup before doing this.)' },
        ]},

        { type: 'callout', tone: 'warning', title: 'Distinguish duplicates from genuine repeated measures',
          body: 'If your design has the same person measured before and after (paired design), those two rows are NOT duplicates — they are the legitimate paired observations. Only consider duplicates in CROSS-SECTIONAL designs where each respondent should appear exactly once. For repeated-measures designs in wide format, each row is one person already; for long format, the same ID appearing across time is by design.' },
      ],
    },

    /* ════════════════════ 6. RECODING & REVERSE LIKERT ════════════════════ */
    {
      id: 'recoding',
      title: 'Step 4 — Recoding variables (especially reverse-coded Likert items)',
      blocks: [
        { type: 'heading', level: 2, text: 'The most-asked SPSS question of all time' },

        { type: 'paragraph', text:
          'A questionnaire scale usually mixes positively-worded items ("I enjoy my work") with negatively-worded items ("I find my work pointless"). Both are scored 1 = Strongly Disagree to 5 = Strongly Agree. But for the negatively-worded items, a HIGH score actually means LOW satisfaction — the opposite of the other items. Before you compute a total satisfaction score or run reliability analysis, you MUST reverse-code the negatively-worded items so all items point in the same direction.' },

        { type: 'illustration', component: 'ReverseLikertExample',
          caption: 'Figure 2. Why reverse-coding matters. Top: a respondent scores 5 on the positively-worded item ("I enjoy my work" = strongly agree) and 5 on the negatively-worded item ("My work is pointless" = strongly agree). Without reverse-coding, both 5s add to a "high satisfaction" total — but the second 5 actually means LOW satisfaction. Bottom: after reverse-coding item 2, the 5 becomes a 1, the totals add up correctly, and Cronbach\'s alpha works.' },

        { type: 'heading', level: 3, text: 'The recoding rule for 1-5 Likert' },

        { type: 'paragraph', text:
          'For a 5-point Likert (1-5): new_value = 6 − old_value. So 1 becomes 5, 2 becomes 4, 3 stays 3, 4 becomes 2, 5 becomes 1. For a 7-point Likert: new_value = 8 − old_value. For an n-point Likert: new_value = (n + 1) − old_value.' },

        { type: 'steps', steps: [
          { title: 'IMPORTANT — always recode into a NEW variable, never the original',
            body: 'Use **Transform → Recode into Different Variables** (NOT "Recode into Same Variables"). Give the new variable a clear name like `item7_r` ("r" for "reversed"). This preserves the original data and makes your work auditable.' },
          { title: 'Move the variable to recode',
            body: 'Drag your negatively-worded item (e.g. **item7**) into the Numeric Variable → Output Variable box.' },
          { title: 'Name the output variable',
            body: 'Under "Output Variable" type Name = **item7_r** and Label = "Item 7 (reverse-coded)". Click Change.' },
          { title: 'Click "Old and New Values"',
            body: 'For 1-5 Likert, type 1 → 5, 2 → 4, 3 → 3, 4 → 2, 5 → 1, each via the Add button. Also tick "System- or user-missing → System-missing" so missing stays missing. Click Continue → OK.' },
          { title: 'Verify by running Frequencies on both',
            body: 'The new variable\'s distribution should be the MIRROR of the original. If 80% of cases were "5" in the original, 80% should be "1" in the recoded version. Always verify visually.' },
        ]},

        { type: 'callout', tone: 'warning', title: 'Use the new variable from this point on',
          body: 'When you compute the total satisfaction score, include `item7_r` (the recoded version), NOT `item7` (the original). When you run Cronbach\'s alpha, include `item7_r`. The original item is now just a backup. Mixing the two will produce wrong results and an unhappy supervisor.' },
      ],
    },

    /* ════════════════════ 7. COMPUTE VARIABLE ════════════════════ */
    {
      id: 'compute-variable',
      title: 'Step 5 — Compute Variable: totals, means, dummies',
      blocks: [
        { type: 'heading', level: 2, text: 'Building composite variables from your raw items' },

        { type: 'paragraph', text:
          'Most thesis analyses do not run on raw questionnaire items — they run on COMPOSITE variables built from those items. A satisfaction scale becomes one total score. A health questionnaire becomes a mean health index. A categorical predictor becomes one or more dummy variables for regression. Compute Variable is the SPSS dialog that builds all of these.' },

        { type: 'heading', level: 3, text: 'Common compute formulas' },

        { type: 'comparison',
          headers: ['What you want', 'Compute formula', 'Example'],
          rows: [
            ['**Total score**',           'SUM(item1, item2, …, itemN)',                  '`SUM(sat1, sat2_r, sat3, sat4_r, sat5)` → total_sat'],
            ['**Mean index**',            'MEAN(item1, …, itemN) — useful if items have missing values; MEAN drops missing per case', '`MEAN(sat1, sat2_r, sat3, sat4_r, sat5)` → mean_sat'],
            ['**Difference (paired)**',   'after − before',                                '`anxiety_after − anxiety_before` → diff_anxiety'],
            ['**Dummy variable** (binary)','1 if condition met, else 0',                   '`gender = 1` → male_dummy (1 if male, 0 otherwise)'],
            ['**Re-categorisation**',      'Use IF conditions or RECODE',                  'Split continuous age into 3 bands → age_band'],
            ['**Logical flag**',          'expression returning 0 or 1',                   '`(income < 5000) AND (age >= 60)` → vulnerable_flag'],
          ]},

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Transform → Compute Variable.' },
          { title: 'Name your new variable',
            body: 'Type a clear name in Target Variable (e.g. **total_sat**). Click Type & Label to add a human-readable label.' },
          { title: 'Build the expression',
            body: 'In the Numeric Expression box type your formula. Use the buttons (+, −, *, /) or the Functions panel on the right. For SUM/MEAN, double-click the function then drag items into the parentheses, comma-separated.' },
          { title: 'Add an optional IF condition',
            body: 'Click If… → "Include if case satisfies condition" if you want this compute to apply only to a subset (e.g. only female respondents).' },
          { title: 'Click OK and verify',
            body: 'The new variable appears at the right end of Data View. Always run Frequencies or Descriptives on the new variable immediately to check it looks plausible (correct range, reasonable mean).' },
        ]},

        { type: 'callout', tone: 'gold', title: 'SUM vs MEAN — pick deliberately',
          body: 'SUM treats any missing item as a system-missing total (cautious, drops the whole case if even one item is missing). MEAN computes the average across whatever items are present (uses partial data, more permissive). For Likert SCALES with occasional skipped items, MEAN is often preferred because it preserves more cases. Make a deliberate choice and report it — "Total satisfaction was computed as the MEAN of the five item scores, allowing for up to 2 missing items per case."' },
      ],
    },

    /* ════════════════════ 8. SELECT CASES ════════════════════ */
    {
      id: 'select-cases',
      title: 'Step 6 — Select Cases: focused sub-analyses',
      blocks: [
        { type: 'heading', level: 2, text: 'Running analyses on a subset' },

        { type: 'paragraph', text:
          'Sometimes you want to run an analysis on a SUBSET of your data — only women, only adopters, only respondents from Nairobi county, only complete cases. Select Cases is the dialog that filters your dataset temporarily (or permanently) so that subsequent analyses run only on the chosen subset.' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Data → Select Cases.' },
          { title: 'Choose the selection method',
            body: '"If condition is satisfied" is the most flexible. "Random sample of cases" lets you take a percentage or a fixed number. "Based on time or case range" lets you keep rows N to M.' },
          { title: 'Type your condition',
            body: 'Click If… → type the expression (e.g. **gender = 1 AND age >= 18** → only adult women). Click Continue.' },
          { title: 'Choose what to do with unselected cases',
            body: '**Filter out** (default) is reversible — adds a filter variable, hides unselected cases from analyses, but keeps them in the dataset. **Copy selected to a new dataset** keeps your original intact. **Delete unselected cases** is permanent — only use this when you are sure (and after saving a backup).' },
          { title: 'A filter indicator appears in Data View',
            body: 'Filtered-out rows get a small diagonal line through the case number. Subsequent analyses will only use selected cases until you turn the filter off (Data → Select Cases → All cases).' },
        ]},

        { type: 'callout', tone: 'warning', title: 'Always TURN OFF the filter when done',
          body: 'A surprisingly common mistake: you filter to "only women", run one analysis, forget, and run the next ten analyses still on the female-only subset. Your "overall" results are actually only women. Always go back to Data → Select Cases → All cases when you finish a sub-analysis.' },
      ],
    },

    /* ════════════════════ 9. THE WORKFLOW ════════════════════ */
    {
      id: 'workflow',
      title: 'The complete cleaning workflow',
      blocks: [
        { type: 'heading', level: 2, text: 'A repeatable sequence' },

        { type: 'paragraph', text:
          'Below is the sequence to run on every new dataset. Following this order every time means you never miss a step and your cleaned files are consistent across projects.' },

        { type: 'illustration', component: 'CleaningWorkflow',
          caption: 'Figure 3. The data-cleaning workflow. Save a raw backup → import → declare types in Variable View → run Frequencies on everything → fix impossible values → declare missing codes → handle duplicates → reverse-code negatively-worded items → compute composites and indices → set up any sub-analysis filters with Select Cases → save your cleaned working file. Document every step in a syntax script as you go.' },

        { type: 'steps', steps: [
          { title: '1. Backup the raw file',
            body: 'Save as `..._RAW_locked.sav`. Never edit it.' },
          { title: '2. Open a working copy and set up Variable View',
            body: 'Define correct Type, Measure (Scale/Ordinal/Nominal), Label, Values, and Missing for every variable.' },
          { title: '3. Run Frequencies on every variable',
            body: 'Catch impossible values, typos, and unexpected codes.' },
          { title: '4. Recode impossible values to system-missing',
            body: 'Use Transform → Recode into Same Variables for genuine errors (e.g. "6" in a 1-5 Likert).' },
          { title: '5. Declare missing-data codes',
            body: 'In Variable View → Missing column, mark codes like 999, 998 as missing.' },
          { title: '6. Quantify and document missingness',
            body: 'Note % missing per variable; flag any variable above 20-30% as a concern.' },
          { title: '7. Identify and resolve duplicates',
            body: 'Data → Identify Duplicate Cases → inspect each flagged row → delete confirmed duplicates.' },
          { title: '8. Reverse-code negatively-worded Likert items',
            body: 'Transform → Recode into DIFFERENT Variables → save with `_r` suffix.' },
          { title: '9. Build composite variables',
            body: 'Transform → Compute Variable for total scores, mean indices, dummy variables.' },
          { title: '10. Run reliability on composite scales',
            body: 'Analyze → Scale → Reliability Analysis. Cronbach\'s alpha ≥ .70 confirms the scale items hang together (see lesson `rel-1`).' },
          { title: '11. Set up Select Cases filters for sub-analyses',
            body: 'Use Data → Select Cases when you need to restrict to a subset; always turn off when done.' },
          { title: '12. Save the cleaned dataset as `..._CLEAN_v1.sav`',
            body: 'And save the entire cleaning syntax as `..._CLEAN.sps`. Now you can begin your real analysis.' },
        ]},
      ],
    },

    /* ════════════════════ 10. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five common cleaning mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Cleaning directly on the raw file',
          body: 'You started recoding in the file the research assistants gave you. Two weeks in you realised you reverse-coded the wrong item — but you have no untouched copy to recover from.',
          fix: 'Save the raw file with `_RAW` in the name the moment it arrives. NEVER touch it. Do all cleaning on a `_WORKING` copy.' },

        { type: 'mistake',
          title: 'Mistake 2 — Forgetting to reverse-code negatively-worded items',
          body: 'You computed total satisfaction by summing all 10 items. Cronbach\'s alpha came back at 0.42 (terrible). You despaired and considered dropping the scale — when in reality you had simply forgotten to flip items 4 and 7.',
          fix: 'Re-read every Likert item. Mark which ones are negatively worded. Recode them with the (n+1) − x formula into new variables with `_r` suffix. Use only the recoded versions in your SUM/MEAN compute and your Cronbach\'s alpha. Alpha should now jump dramatically.' },

        { type: 'mistake',
          title: 'Mistake 3 — Ignoring missing-data codes',
          body: 'Your questionnaire used 999 for "Refused" and 998 for "Don\'t know". You never declared them as missing. Your "mean monthly income" is now KES 287,000 — because SPSS treated the 999s and 998s as actual amounts.',
          fix: 'Go to Variable View → Missing column → for every variable that uses out-of-range codes for refusal/don\'t-know, click the cell, choose Discrete missing values, type 998 and 999 (or your codes). Now SPSS knows to exclude them from means, correlations, and tests.' },

        { type: 'mistake',
          title: 'Mistake 4 — Leaving a Select Cases filter active',
          body: 'You filtered to "only urban respondents" for one comparison. You moved on, ran ten more analyses, and only later noticed all of them were urban-only. Your "overall" Chapter 4 numbers are wrong.',
          fix: 'Every time you finish a sub-analysis: Data → Select Cases → ALL cases → OK. Build the habit. Also: look for the diagonal slash through row numbers in Data View — it tells you a filter is still active.' },

        { type: 'mistake',
          title: 'Mistake 5 — Cleaning without a syntax script',
          body: 'You did all your cleaning through the menus. Your examiner asks "what did you exclude and why?" You vaguely remember dropping 12 cases but cannot recreate the decision. Your defence stalls.',
          fix: 'Every time SPSS shows you the OK button, also click Paste — it appends the syntax for that operation to a syntax window. Save the syntax as a `.sps` file. Add comments explaining each step. Now your cleaning is fully reproducible AND defensible.' },
      ],
    },

    /* ════════════════════ 11. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Data cleaning is 60% of a typical analysis project — skip it at your peril.',
          'Two unbreakable rules: never edit the raw file, document every step in syntax.',
          'Step 1: Frequencies on everything → catches impossible values and typos.',
          'Step 2: Classify missing data (MCAR / MAR / MNAR) → pick handling strategy. Declare missing codes in Variable View.',
          'Step 3: Identify Duplicate Cases → inspect → drop confirmed duplicates.',
          'Step 4: Reverse-code negatively-worded Likert items via Recode into DIFFERENT Variables with `_r` suffix. Formula for 1-n Likert: new = (n + 1) − old.',
          'Step 5: Compute Variable for totals, mean indices, dummy variables. SUM is cautious; MEAN tolerates missing items.',
          'Step 6: Select Cases for sub-analyses. ALWAYS turn the filter off when done.',
          'Follow the 12-step workflow on every new dataset — same order every time, no surprises.',
          'Five mistakes to avoid: cleaning on raw, forgetting reverse-code, ignoring missing codes, leaving filter active, no syntax script.',
        ]},

        { type: 'callout', tone: 'gold', title: 'This lesson is FREE for everyone on the site',
          body: 'Because clean data is essential for every other analysis lesson to actually work, this Data Cleaning Basics lesson is automatically unlocked for any student who has paid for ANY lesson on the platform. You do not pay separately for it — it is included once you have any other unlock. Lessons covering more advanced cleaning (Select Cases & Split File in depth, merging files, restructuring long↔wide, the full data-cleaning workflow from raw KoboToolbox/ODK exports) are on the curriculum roadmap and will be added as separate unlockable lessons.' },

        { type: 'paragraph', text:
          'Before moving on, take any one of your own datasets and walk through the 12-step workflow above. Save a raw backup, run Frequencies on every variable, fix impossible values, declare missing codes, handle duplicates, reverse-code Likert items, build your composites, run reliability, and save the result as a clean working file with an accompanying syntax script. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 12. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'What is the FIRST thing you should do when a new dataset arrives from your research assistants?',
          choices: [
            'Start running analyses immediately',
            'Save a backup copy of the raw file (labelled with _RAW), lock it, and do all cleaning on a working copy',
            'Delete any case with missing values',
            'Run a t-test to check normality',
          ],
          answer: 1,
          explanation: 'Before any analysis, before any cleaning, save the raw file untouched. Label it _RAW (or similar), lock it in a folder you do not edit. Do every subsequent change on a working copy. If you make a mistake (you will), you can always re-derive from the raw file. Students who clean directly on the raw file and lose work are unfortunately common.' },

        { type: 'check',
          question: 'Your questionnaire uses 999 for "Refused" in the income column. You did not declare 999 as a missing code in Variable View. What happens to your mean income?',
          choices: [
            'Nothing — SPSS ignores 999 automatically',
            'SPSS treats 999 as an actual income value of KES 999, biasing your mean dramatically downward',
            'SPSS treats 999 as an actual income value of KES 999, biasing your mean upward — and similarly distorting every correlation and regression involving income',
            'SPSS deletes those cases',
          ],
          answer: 2,
          explanation: 'Unless you declare 999 as missing in Variable View → Missing column, SPSS treats it as a real numeric value. With a typical income variable in the thousands, 999s will pull means UP (not down) and bias every analysis. Always declare your out-of-range refusal/don\'t-know codes as missing the moment you set up Variable View.' },

        { type: 'check',
          question: 'Your satisfaction scale has 10 items, 7 positively worded ("I enjoy my work") and 3 negatively worded ("My work is meaningless"). You computed total satisfaction by summing all 10 items. Cronbach\'s alpha = .42 (poor). Why?',
          choices: [
            'The scale is genuinely unreliable — abandon it',
            'You forgot to reverse-code the 3 negatively worded items before summing. A high score on a negatively worded item means LOW satisfaction, so summing them as-is mixes opposite directions and torpedoes reliability',
            'The sample size is too small',
            'You used SUM instead of MEAN',
          ],
          answer: 1,
          explanation: 'Negatively worded items must be reverse-coded BEFORE they go into any total/mean/reliability analysis. For a 1-5 Likert: new = 6 − old. Save the reversed item as `item_r` (Recode into Different Variables, never the same). Use only `item_r` in your SUM and Cronbach\'s. Alpha should jump dramatically once all items point in the same direction.' },

        { type: 'check',
          question: 'When recoding a Likert item, where should the new (reversed) value go?',
          choices: [
            'Overwrite the original variable using Recode into Same Variables',
            'Into a NEW variable using Recode into Different Variables, with a clear name like `item7_r` — never overwrite the original',
            'Into a text file',
            'Replace the cell values manually in Data View',
          ],
          answer: 1,
          explanation: 'ALWAYS reverse-code into a NEW variable (Transform → Recode into Different Variables → output variable name like `item7_r`). Overwriting the original destroys your audit trail — you cannot recover the original answers later. The `_r` suffix is the universally recognised convention for "reverse-coded". From that point on, use ONLY the `_r` versions in your SUM/MEAN/Cronbach\'s computes.' },

        { type: 'check',
          question: 'You ran Data → Select Cases → only female respondents for one comparison. What MUST you do before your next analysis on the full sample?',
          choices: [
            'Nothing — SPSS resets the filter automatically',
            'Go back to Data → Select Cases → choose "All cases" → OK to clear the filter. Otherwise every subsequent analysis runs only on females',
            'Delete the female respondents',
            'Re-import the dataset',
          ],
          answer: 1,
          explanation: 'Select Cases filters persist until you explicitly turn them off. The Data View shows a diagonal slash through filtered-out rows as a reminder. Forgetting to clear the filter is one of the most common cleaning mistakes — students run ten "overall" analyses that are actually subset-only. Make a habit: every time you finish a sub-analysis, Data → Select Cases → All cases → OK.' },

        { type: 'check',
          question: 'Your scale has 5 items but most respondents skipped 1 or 2 items. SUM(item1, …, item5) gives a missing total for any case with any missing item. What\'s a better approach?',
          choices: [
            'Drop everyone with any missing data',
            'MEAN(item1, …, item5) computes the average of whatever items are present per case — far more cases retained',
            'Set all missing values to 3 (the middle)',
            'Run the analysis with the missing values',
          ],
          answer: 1,
          explanation: 'MEAN tolerates missing items per case (computing across whatever is present), while SUM treats any missing item as a missing total. For Likert SCALES with occasional skipped items, MEAN preserves many more cases. Report your choice transparently: "Total satisfaction was computed as the mean of the five items, allowing up to 2 missing per case." Always verify the new variable with Frequencies afterward.' },
      ],
    },
  ],
};
