/**
 * SPSS Basics · Lesson 3 — Defining Variables & Labels
 * Builds on Lesson 2's recipe. Goes deep on professional Naming conventions,
 * Variable Sets for huge datasets, Define Variable Properties as a power tool,
 * writing publication-quality labels.
 */

export const DEFINING_VARIABLES_LESSON = {
  id: 'basics-3',
  title: 'Defining variables & labels',
  subtitle: 'Module 03 · Course: SPSS Basics · Lesson 3 of 5',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'Why this lesson matters more than it sounds',
      blocks: [
        { type: 'scene', body: [
          'You are six months into your PhD. You open the SPSS file you created last September and you stare at a column called **v37**. You have no memory of what v37 measured. You open another column: **q4_r2**. Was that the original question 4 or the reverse-coded version? Your supervisor emails: "can you run a quick correlation between supervisor support and burnout?" You scroll through 80 cryptic variable names hunting for the right ones. Twenty minutes pass. You still are not sure.',
          'This pain is preventable. It comes from one place: variables that were never properly defined when they were created. **The 30 minutes you spend setting up variable names and labels properly today saves you days of confusion over the lifetime of a thesis.** That is what this lesson is about.',
          'Lesson 2 taught you the 8-step recipe for setting up one variable. This lesson zooms in on the parts of that recipe that affect the readability and survivability of your dataset months from now: **naming conventions**, **labels that read well in output**, the **Define Variable Properties** shortcut for bulk setup, and **Variable Sets** for organising large datasets.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Name variables professionally** so that future-you, your supervisor, and your examiner can read your dataset without a codebook.',
            '**Write labels** that read well in published tables — not too long, not too short.',
            '**Use the Define Variable Properties shortcut** to set up many variables at once instead of doing them row-by-row in Variable View.',
            '**Group related variables** using SPSS Variable Sets so a dataset with 200 variables stops feeling overwhelming.',
            '**Handle reverse-coded items** with a consistent naming convention so you never confuse the original and reversed versions.',
            '**Maintain a codebook** that travels with your dataset and survives examiner scrutiny.',
          ]},

        { type: 'why', body:
          'Examiners and journal reviewers regularly ask: "How is variable X defined?" "What does this code 3 mean?" "What is the difference between sa_3 and sa_3_r?" If your dataset cannot answer these questions on its own — without you in the room — your work looks unprofessional. The fix is invisible: it lives in how you name and label things.' },
      ],
    },

    /* ════════════════════ 2. NAMING CONVENTIONS ════════════════════ */
    {
      id: 'naming',
      title: 'Naming variables — the rules and the conventions',
      blocks: [
        { type: 'heading', level: 2, text: 'The hard rules SPSS enforces' },

        { type: 'paragraph', text:
          'Before we talk about *good* names, here are the hard rules SPSS will not let you break. Try to break them and you get a red error message.' },

        { type: 'list', items: [
          '**Maximum 64 characters.** In practice keep it well under 20.',
          '**Must start with a letter** (or one of a few special characters like @). Cannot start with a digit. "1st_year" is invalid; "year_1" is fine.',
          '**No spaces.** "age in years" is invalid. Use underscore (age_in_years) or camelCase (ageInYears).',
          '**No special characters except underscore and a few others.** Avoid hyphens, slashes, parentheses, accented characters.',
          '**Case-insensitive.** "AGE" and "age" are treated as the same variable. Be consistent for readability.',
          '**Cannot end with a period.** "age." is invalid.',
          '**Cannot be a reserved word.** SPSS has a list of about 25 reserved words (ALL, AND, BY, EQ, GE, GT, LE, LT, NE, NOT, OR, TO, WITH, etc.). Trying to name a variable BY or TO will fail.',
        ]},

        { type: 'callout', tone: 'warning', title: 'The most common rule-break',
          body: 'Beginners type names like "Q1 — Satisfaction with supervisor" and get a confusing error because of the spaces, the hyphen, and the length. SPSS rejects the whole name. Always test by typing the name once in Variable View — if SPSS accepts it without complaint, the hard rules pass.' },

        { type: 'heading', level: 2, text: 'The soft conventions thesis examiners expect' },

        { type: 'paragraph', text:
          'The hard rules only stop you typing invalid characters. *Good* naming requires conventions on top. These are the conventions used by professional researchers and statistical-analysis textbooks. Adopt them and your dataset reads like a researcher\'s, not a beginner\'s.' },

        { type: 'steps', steps: [
          { title: 'Lowercase only',
            body: 'Mixed-case names (ageInYears) are harder to read in syntax than lowercase with underscores (age_in_years). Pick lowercase as your default.' },
          { title: 'Short but meaningful — aim for 6–15 characters',
            body: 'The Variable Name should let you guess the meaning in two seconds. "age_yrs" is good. "a" is too short. "respondent_age_in_completed_years_at_survey" is too long — that level of detail belongs in the Label.' },
          { title: 'Use prefixes to group related variables',
            body: 'If you have 10 satisfaction items, name them **sa_1** to **sa_10**. Demographics can use **dem_** (dem_age, dem_gender, dem_county). Treatments can use **t_** (t_pre, t_post). When your dataset has 80 variables, prefixes make finding things much easier.' },
          { title: 'Number consistently — zero-pad if you have ≥10 items',
            body: 'For 9 items use sa_1, sa_2, … sa_9. For 10 or more use sa_01, sa_02, … sa_10. The zero-padding (sa_01 not sa_1) means sorting works correctly — without it, sa_10 appears between sa_1 and sa_2 alphabetically.' },
          { title: 'Append _r to reverse-coded versions',
            body: 'If you reverse-code item sa_3 because it was worded negatively, name the new variable sa_3_r. The suffix is a permanent visual reminder. Some researchers use sa_3_rev or sa_3_R — pick one and stick with it.' },
          { title: 'Append _t (or _tot) to totals and _m to means',
            body: 'If you create a total satisfaction score by summing sa_1 through sa_10, call it sa_t or sa_tot. If it is the mean instead, call it sa_m. Future-you will instantly know which is which.' },
        ]},

        { type: 'comparison',
          headers: ['Good name', 'Bad name', 'Why the good one wins'],
          rows: [
            ['age_yrs',        'AgeInYears',         'Lowercase + underscore is the convention; easier to read in syntax.'],
            ['gender',         'g',                  'Single-letter names are unreadable in 6 months.'],
            ['sa_01',          'sa_1',               'Zero-pad when ≥10 items so sorting works correctly.'],
            ['sa_03_r',        'q3reverse',          'Prefix + number + _r convention is consistent and predictable.'],
            ['math_score',     'mathematics_score_out_of_one_hundred', 'Keep the name short; descriptive details belong in the Label.'],
            ['year_1',         '1st_year',           'Cannot start with a digit (SPSS rejects it).'],
            ['supervisor_supp','supervisor support', 'No spaces allowed; use underscore.'],
          ]},

        { type: 'reveal',
          prompt: 'You have 14 items measuring teaching quality. How should you name them?',
          answer: '**tq_01, tq_02, tq_03, …, tq_14**. The prefix `tq_` groups them. The zero-padding (`_01` not `_1`) means alphabetical sorting puts them in the right order. When you reverse-code item 7 because it was worded negatively, the new variable becomes `tq_07_r`. When you create the total score by summing all 14 (including the reversed one), call it `tq_tot`. Six months from now, anyone looking at your dataset can decode every name without asking you.' },
      ],
    },

    /* ════════════════════ 3. WRITING GOOD LABELS ════════════════════ */
    {
      id: 'labels',
      title: 'Writing labels that read well in published tables',
      blocks: [
        { type: 'heading', level: 2, text: 'The Label column is what your examiner actually sees' },

        { type: 'paragraph', text:
          'The variable Name is internal — it appears in syntax and Variable View. The variable **Label** is what appears in every output table, every chart, every report. If you forget to fill in the Label, SPSS falls back to showing the Name everywhere — and your output tables look like syntax dumps instead of academic prose.' },

        { type: 'paragraph', text:
          'Labels can be up to 256 characters, but in practice you want them between 15 and 80 characters. Too short and they are uninformative. Too long and they break the layout of output tables and figures.' },

        { type: 'steps', steps: [
          { title: 'Write the label as a phrase, not a sentence',
            body: '"Gender of respondent" is a good label. "What is the gender of the respondent?" is a question — wrong shape for a table cell. Phrases beat sentences.' },
          { title: 'Capitalise sentence-style (first word, proper nouns)',
            body: '"Age in years" — yes. "AGE IN YEARS" — shouting. "age in years" — too casual for a thesis. Sentence case is the published standard.' },
          { title: 'Spell out units of measurement',
            body: '"Monthly income (KSh)", "Distance to school (km)", "Age (years)". Units in brackets at the end is the published convention.' },
          { title: 'For Likert items, include the scale anchors',
            body: '"I am satisfied with my supervisor (1 = Strongly disagree, 5 = Strongly agree)". Long but the reader of your thesis appendix needs the scale.' },
          { title: 'For reverse-coded variables, say so in the label',
            body: 'Name = tq_07_r. Label = "My teacher rarely listens to me (REVERSE-CODED)". The capital R reminder is a lifesaver during analysis.' },
          { title: 'Avoid abbreviations only you understand',
            body: '"SES" might mean Socio-Economic Status to you, Statistical Expert System to a reviewer, or Spanish for "yes" to a translator. Spell it out the first time, then "SES" is fine in subsequent labels.' },
        ]},

        { type: 'comparison',
          headers: ['Variable name', 'Bad label', 'Good label'],
          rows: [
            ['age_yrs',       '(empty)',                                  'Age in years'],
            ['gender',        'g',                                        'Gender of respondent'],
            ['income_mth',    'income',                                   'Monthly household income (KSh)'],
            ['sa_03',         'Satisfaction Question Number Three',       'Sat. with supervisor responsiveness (1-5 Likert)'],
            ['sa_07_r',       'sa_7 reversed',                            'Sup. ignores my needs (REVERSE-CODED, 1-5)'],
            ['math_score',    'mathematics score in the end of term test out of 100 marks awarded',   'End-of-term mathematics score (/100)'],
          ]},

        { type: 'callout', tone: 'success', title: 'The label test',
          body: 'Read your label out loud. If it sounds like something a research paper would say in a Table 2 header — you are good. If it sounds like a question, or like a sentence missing words, or like an internal code — rewrite it.' },

        { type: 'why', body:
          'When you paste a frequency table from SPSS into your thesis Word document, the Label is what appears as the table heading. Good labels mean less editing in Word. Bad labels mean rewriting every table by hand.' },
      ],
    },

    /* ════════════════════ 4. VALUE LABELS DEEP DIVE ════════════════════ */
    {
      id: 'value-labels',
      title: 'Value labels — going deeper',
      blocks: [
        { type: 'heading', level: 2, text: 'A closer look at the Values dialog' },

        { type: 'paragraph', text:
          'Lesson 2 introduced the Value Labels dialog briefly. Now we go deeper — the keyboard shortcuts, how to copy value labels from one variable to many, and the conventions for coding categorical variables.' },

        { type: 'illustration', component: 'ValueLabelsDialog',
          caption: 'Figure 1. The Value Labels dialog. (1) Type the code in Value and the human meaning in Label. (2) Click Add to commit it to the list below. (3) Repeat for each category — including your missing codes if you want them to appear with labels.' },

        { type: 'heading', level: 3, text: 'Coding conventions for common categorical variables' },

        { type: 'paragraph', text:
          'Use the same codes consistently across your whole dataset. The conventions below are widely used in social-science research and make collaboration easier.' },

        { type: 'comparison',
          headers: ['Variable type', 'Coding convention', 'Why'],
          rows: [
            ['Gender (binary)',           '1 = Male, 2 = Female',                         'Long-standing convention. Avoid 0/1 unless you have a specific reason.'],
            ['Yes/No questions',          '1 = Yes, 0 = No',                              '0/1 lets you sum a column to get a count of "Yes" responses directly.'],
            ['Likert (5-point)',          '1 = Strongly disagree → 5 = Strongly agree',   'Higher number = more agreement. Standard direction.'],
            ['Likert (7-point)',          '1 = Strongly disagree → 7 = Strongly agree',   'Same logic, more granularity.'],
            ['Education',                 '1 = Primary, 2 = Secondary, 3 = Tertiary, 4 = Postgrad', 'Ordered from least to most education.'],
            ['Marital status',            '1 = Single, 2 = Married, 3 = Divorced, 4 = Widowed', 'No natural order — assign codes by frequency in your sample.'],
            ['Missing — refused to answer','999',                                          'Three digits to avoid colliding with real values.'],
            ['Missing — don\'t know',     '998',                                          'Different from refused; sometimes analytically important.'],
            ['Missing — not applicable',  '997',                                          'For skip-logic questions ("if no children, skip to Q5").'],
          ]},

        { type: 'heading', level: 3, text: 'Two power-user keyboard shortcuts' },

        { type: 'list', items: [
          '**Ctrl+Alt+V** in Data View — toggles between showing numeric codes (1, 2) and showing value labels (Male, Female). Use it constantly to sanity-check.',
          '**View → Variables** anywhere — opens a pop-up listing every variable in your dataset with its Label and Values. Faster than scrolling Variable View when you have 100+ variables.',
        ]},

        { type: 'heading', level: 3, text: 'Copying value labels from one variable to many' },

        { type: 'paragraph', text:
          'When you have 20 Likert items all using the same 1-5 scale, you do NOT want to type "1 = Strongly disagree, 2 = Disagree…" twenty times. There are two faster ways.' },

        { type: 'steps', steps: [
          { title: 'Method 1 — Copy the cell in Variable View',
            body: 'In Variable View, right-click the **Values** cell of the variable that already has the labels set up → Copy. Then select the Values cells of all the other variables that need the same labels → right-click → Paste. All twenty variables now share the identical value labels in one step.' },
          { title: 'Method 2 — Define Variable Properties (covered in Section 6)',
            body: 'For an even more powerful approach when setting up many similar variables at once, use **Data → Define Variable Properties**. It scans your data and lets you set value labels, missing codes, and measurement level for multiple variables in one dialog.' },
        ]},

        { type: 'mistake',
          title: 'Setting value labels on Scale variables',
          body: 'Variables like age_yrs (in years) or income (in KSh) should NOT have value labels. They are continuous numbers, not categorical codes. Setting value labels on them clutters output and confuses SPSS.',
          fix: 'Only set value labels for **Nominal** and **Ordinal** variables — gender, county, satisfaction levels, etc. Leave the Values cell empty (showing "None") for all Scale variables.' },
      ],
    },

    /* ════════════════════ 5. MEASURE & ROLE COLUMNS ════════════════════ */
    {
      id: 'measure-role',
      title: 'The Measure and Role columns — final touches',
      blocks: [
        { type: 'heading', level: 2, text: 'Measure — quick recap, then what changes when' },

        { type: 'paragraph', text:
          'Lesson 2 covered the three measurement levels (Scale, Ordinal, Nominal). Here we look at the practical consequences — what SPSS allows or blocks based on your Measure setting.' },

        { type: 'comparison',
          headers: ['If Measure is…', 'SPSS allows you to compute…', 'SPSS prevents you from computing…'],
          rows: [
            ['**Scale**',  'Mean, median, SD, Pearson correlation, t-test, ANOVA, regression — anything that needs a continuous variable.', 'Nothing — Scale is the most permissive setting.'],
            ['**Ordinal**', 'Median, frequencies, Spearman correlation, Mann-Whitney, Kruskal-Wallis, chi-square.', 'Pearson correlation, t-test, ANOVA (technically blocked in Chart Builder; manual menus may still allow them, with warnings).'],
            ['**Nominal**', 'Frequencies, chi-square, mode.', 'Mean, median, correlation, ANOVA — anything that assumes order or numeric meaning.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'The Chart Builder enforces Measure strictly',
          body: 'When you drag a variable into Chart Builder, it checks the Measure setting and only offers chart types that fit. If your "age" variable is mistakenly marked Nominal, Chart Builder will refuse to make a histogram — because histograms are for Scale variables. The fix: open Variable View, change Measure to Scale, try again.' },

        { type: 'heading', level: 2, text: 'The Role column (and why you can usually ignore it)' },

        { type: 'paragraph', text:
          'The eleventh column in Variable View is **Role**. It can be set to Input, Target, Both, None, Partition, or Split. It exists for SPSS Modeler and the predictive-modelling extensions — it tells those tools which variables are predictors (Input) and which are outcomes (Target).' },

        { type: 'paragraph', text:
          'For 95% of thesis work — t-tests, ANOVA, regression, factor analysis — you can leave every variable as **Input** (the default). The Role column does not affect standard analyses through the Analyze menu.' },

        { type: 'callout', tone: 'info', title: 'When Role matters',
          body: 'If you start using Auto-Models, Decision Trees, Neural Networks, or any extension under the Analyze → Classify menu, those tools READ the Role column to decide which variable is the outcome and which are predictors. Setting Role appropriately then saves you specifying it inside each dialog. For ordinary thesis work, leave it alone.' },
      ],
    },

    /* ════════════════════ 6. DEFINE VARIABLE PROPERTIES SHORTCUT ════════════════════ */
    {
      id: 'define-properties',
      title: 'The Define Variable Properties power tool',
      blocks: [
        { type: 'heading', level: 2, text: 'Set up many variables in one dialog' },

        { type: 'paragraph', text:
          'Setting up variables one at a time in Variable View works fine for small datasets — but if you have 50 or 100 variables to define, it becomes tedious. SPSS has a power-user shortcut called **Define Variable Properties** that scans your data and lets you set value labels, missing codes, measurement level, and labels for many variables at once.' },

        { type: 'illustration', component: 'DefineVarPropertiesDialog',
          caption: 'Figure 2. The Define Variable Properties dialog. On the left is the list of variables you brought in. On the right are the settings for whichever variable is selected — Label, Measure, and a grid of value labels with the actual counts SPSS found in your data. You can also tick the "Missing" column directly to mark codes as missing.' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'From the main menu choose **Data → Define Variable Properties…**. A first dialog asks which variables you want to set up. Select them all (or a group at a time) and click the blue arrow to move them to the right. Click Continue.' },
          { title: 'SPSS scans your data',
            body: 'SPSS looks at the actual values in your data file and lists every unique value it found for each selected variable. This is faster than typing value labels from memory because the codes are right in front of you.' },
          { title: 'Set Label and Measure',
            body: 'For each variable, type the Label and pick the Measure. The dialog shows them side by side, so you can move through your variables quickly.' },
          { title: 'Set value labels using the auto-scanned grid',
            body: 'For each value SPSS found, type its meaning in the Label column of the grid. The Count column tells you how many cases have that value — useful for spotting unexpected codes.' },
          { title: 'Tick the Missing column for codes that should be missing',
            body: 'For each row in the value grid, you can tick the Missing checkbox. SPSS will treat that code as a discrete missing value going forward. No need to also go to the Missing column in Variable View — this dialog handles both.' },
          { title: 'Click OK',
            body: 'All your changes are applied at once. Save the file (Ctrl+S). You have just defined what would have taken 30 minutes in Variable View — in 5 minutes.' },
        ]},

        { type: 'callout', tone: 'gold', title: 'When Define Variable Properties shines',
          body: [
            '**Right after importing from Excel/KoboToolbox/Google Forms** — your variables exist but have no labels, no value labels, no measure set. Define Variable Properties lets you fix all of that in one dialog.',
            '**When you have many similar Likert items** — select all 20 satisfaction items, see all their values in one place, copy labels between them.',
            '**When you inherit a dataset from someone else** and need to understand what is in it — the scanned value list shows you instantly.',
          ]},
      ],
    },

    /* ════════════════════ 7. VARIABLE SETS ════════════════════ */
    {
      id: 'variable-sets',
      title: 'Variable Sets — taming huge datasets',
      blocks: [
        { type: 'heading', level: 2, text: 'When 200 variables become unmanageable' },

        { type: 'paragraph', text:
          'A national survey can easily have 300 variables. Even a Master\'s thesis often has 80-120. Scrolling Variable View hunting for the right one becomes painful. SPSS has a feature called **Variable Sets** that lets you define named groups (Demographics, Satisfaction, Burnout, Outcomes) and show only one group at a time in dialogs.' },

        { type: 'steps', steps: [
          { title: 'Open Define Variable Sets',
            body: 'Utilities → Define Variable Sets…' },
          { title: 'Create a new set',
            body: 'Type a Set Name (e.g. "Demographics"). From the variable list on the left, move every demographic variable into the box on the right.' },
          { title: 'Click Add Set, then OK',
            body: 'Repeat for "Satisfaction", "Burnout", and any other groups.' },
          { title: 'Activate which sets you want to see',
            body: 'Utilities → Use Variable Sets. Tick only the sets you want active right now. Click OK. Every analysis dialog in SPSS now shows only the variables from active sets.' },
        ]},

        { type: 'callout', tone: 'info', title: 'Variable Sets are local to the file',
          body: 'When you save the .sav file, the sets are saved with it. Re-opening the file restores your sets. Sets are not transferred to other people unless they get your .sav file — they live inside it.' },

        { type: 'why', body:
          'Without Variable Sets, every dialog you open in SPSS shows a giant scrolling list of all 200 variables. With Variable Sets, you can show only the 12 Demographics variables when you are running descriptives, then switch to the 24 Satisfaction variables when running reliability analysis. Less scrolling, fewer mistakes.' },
      ],
    },

    /* ════════════════════ 8. CODEBOOK ════════════════════ */
    {
      id: 'codebook',
      title: 'Generating a codebook for your thesis appendix',
      blocks: [
        { type: 'heading', level: 2, text: 'The document that travels with your data' },

        { type: 'paragraph', text:
          'A **codebook** is a document that lists every variable in your dataset along with its definition: what the variable measures, how it is coded, what counts as missing, what the levels mean. Examiners often ask for it. Journals require it for replication. Future you — six months after submission — will thank past you for having one.' },

        { type: 'paragraph', text:
          'SPSS can auto-generate a codebook for you from your Variable View settings. This is one of the strongest reasons to fill in Labels, Values, and Missing properly: SPSS uses those settings to build the codebook automatically.' },

        { type: 'steps', steps: [
          { title: 'Open the Codebook tool',
            body: 'Analyze → Reports → Codebook…' },
          { title: 'Move the variables you want documented',
            body: 'From the left list, move every variable that should appear in the codebook to the right list. For a thesis, usually all of them.' },
          { title: 'Pick what information to include',
            body: 'On the **Output** tab, tick: Label, Type, Value labels, Missing values, Measurement level, Format. These give you a complete codebook entry per variable. The **Statistics** tab lets you include counts and means — useful for a quick sanity check too.' },
          { title: 'Click OK',
            body: 'SPSS produces a beautifully formatted Output Viewer document listing every variable with its full metadata. Right-click → Export to save as Word, PDF, or Excel for your thesis appendix.' },
        ]},

        { type: 'callout', tone: 'gold', title: 'The codebook is your insurance policy',
          body: 'When an examiner asks "how did you handle missing data for variable sa_07?" the codebook answers in one line. When you return to your data two years later for a journal paper, the codebook tells you exactly what every variable was. When you collaborate with someone new, you send them the dataset PLUS the codebook and they can hit the ground running. Generate it. Save it. Include it in your thesis appendix.' },
      ],
    },

    /* ════════════════════ 9. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common mistakes recap',
      blocks: [
        { type: 'heading', level: 2, text: 'Five mistakes that age badly' },

        { type: 'mistake',
          title: 'Mistake 1 — Cryptic variable names with no labels',
          body: 'Names like v1, v2, q3a fill your Variable View with no Labels filled in. Output tables show "v37" as a column header. You — and your examiner — have no idea what v37 measured.',
          fix: 'Always set a Label for every variable. If you must use cryptic names internally, the Label rescues them in output.' },

        { type: 'mistake',
          title: 'Mistake 2 — Inconsistent prefixes',
          body: 'Some satisfaction items are sa_1, others are sat_5, others are q4_satisfaction. When you later try to select "all satisfaction items" to compute a total, you spend ten minutes hunting them down.',
          fix: 'Pick ONE prefix per construct (sa_ for satisfaction, bo_ for burnout, dem_ for demographics) and use it consistently from variable 1.' },

        { type: 'mistake',
          title: 'Mistake 3 — Forgetting to mark reverse-coded items',
          body: 'You reverse-code item sa_07 because it was negatively worded. The new variable has the same Name as the old one — you overwrote it. Now you cannot tell whether sa_07 is the original or the reversed version. Your reliability analysis gives confusing results.',
          fix: 'Always create reverse-coded versions as NEW variables with the _r suffix. Never overwrite the original. The original stays as evidence; sa_07_r is the analysis-ready version.' },

        { type: 'mistake',
          title: 'Mistake 4 — Setting value labels on Scale variables',
          body: 'You set Values like "0 = no income, 50000 = good income" on the income variable. SPSS shows the labels in output and your tables become confusing.',
          fix: 'Only set value labels for Nominal and Ordinal variables. Leave Values empty (None) for true Scale variables.' },

        { type: 'mistake',
          title: 'Mistake 5 — Not generating a codebook',
          body: 'You submit your thesis and the examiner asks "where is your codebook?" You spend a weekend manually writing one in Word, when SPSS would have generated it in 30 seconds.',
          fix: 'Run Analyze → Reports → Codebook the moment your variables are properly defined. Export to Word. Include it in your thesis appendix. Update it whenever you add or change variables.' },
      ],
    },

    /* ════════════════════ 10. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'heading', level: 2, text: 'What you should now be able to do' },

        { type: 'summary', items: [
          'Name variables following the hard rules (no spaces, no leading digits, max 64 chars) and the soft conventions (lowercase, short, prefixes, zero-padded numbers, _r suffix for reverse-coded).',
          'Write labels as phrases (not sentences) in sentence case, including units of measurement and Likert scale anchors.',
          'Use the standard coding conventions: 1=Male/2=Female for gender, 1-5 for Likert, 1=Yes/0=No for binary, 999/998/997 for the three kinds of missing.',
          'Copy value labels from one variable to many using right-click → Copy/Paste in Variable View.',
          'Use **Ctrl+Alt+V** in Data View to toggle between numeric codes and value labels for sanity-checking.',
          'Understand which Measure setting allows which analyses — Scale is permissive, Nominal is restrictive, Ordinal is in between.',
          'Use **Data → Define Variable Properties** as a power tool to set Labels, Measure, Value labels, and Missing codes for many variables at once.',
          'Use **Utilities → Define Variable Sets** to group related variables in large datasets so analysis dialogs become manageable.',
          'Generate a codebook with **Analyze → Reports → Codebook** and export it for your thesis appendix.',
          'Avoid the five mistakes that age datasets badly: cryptic names without labels, inconsistent prefixes, overwriting reverse-coded items, value labels on Scale variables, and missing codebooks.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 4: Importing data from Excel** we tackle the moment most beginners panic — moving a real dataset out of Excel (or KoboToolbox, or Google Forms) and INTO SPSS without losing variable definitions, value labels, or missing data conventions. Lesson 5 closes the SPSS Basics course with everything you need to know about handling missing values.' },

        { type: 'paragraph', text:
          'Before moving on, open one of your existing datasets (or create a quick test file) and run **Analyze → Reports → Codebook** on it. Look at what SPSS produces. Notice which variables have rich entries (because you filled in Labels and Values) and which look bare. Fix any bare ones. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'heading', level: 2, text: 'Six quick questions' },

        { type: 'check',
          question: 'You have 12 satisfaction items in your survey. What is the best way to name them?',
          choices: [
            'satisfaction_1, satisfaction_2, …, satisfaction_12',
            'sa_01, sa_02, sa_03, …, sa_12',
            'sa_1, sa_2, …, sa_12',
            'q1_sat, q2_sat, q3_sat, …, q12_sat',
          ],
          answer: 1,
          explanation: '**sa_01, sa_02, …, sa_12** is best. The prefix `sa_` groups them. The zero-padding (`_01` instead of `_1`) means alphabetical sorting puts them in the correct order — without it, sa_10 appears between sa_1 and sa_2. Option A uses full word satisfaction which makes names too long. Option C breaks sorting at sa_10. Option D uses an inconsistent prefix pattern.' },

        { type: 'check',
          question: 'What is the correct Label for a variable named "income_mth" that holds monthly income in Kenya shillings?',
          choices: [
            '(leave empty — the name is descriptive enough)',
            'income',
            'INCOME MONTHLY',
            'Monthly household income (KSh)',
          ],
          answer: 3,
          explanation: '**"Monthly household income (KSh)"** is the published convention: sentence case, descriptive phrase, units in brackets at the end. Empty labels mean output tables show the cryptic Name. ALL CAPS is shouting. Just "income" is too vague.' },

        { type: 'check',
          question: 'You reverse-coded item sa_07. How should you name the new reversed version?',
          choices: [
            'sa_07 (overwrite the original)',
            'sa_07_r',
            'sa_07_reversed_now',
            'NewSA_7',
          ],
          answer: 1,
          explanation: '**sa_07_r** is the standard convention — short, predictable, instantly recognisable. NEVER overwrite the original (option A) because then you cannot tell which is which. Long descriptive suffixes (option C) belong in the Label, not the Name. Capital letters and inconsistent naming (option D) break your conventions.' },

        { type: 'check',
          question: 'You just imported 80 variables from KoboToolbox and need to define labels, value labels, missing codes, and measurement level for all of them. What is the fastest way?',
          choices: [
            'Type them into Variable View one row at a time',
            'Use **Data → Define Variable Properties** to set them up in bulk',
            'Save the file and start over from scratch',
            'Hire a research assistant',
          ],
          answer: 1,
          explanation: '**Define Variable Properties** is built exactly for this scenario. It scans your data, shows you the unique values for each variable, and lets you set labels, measure, value labels, and missing codes for many variables in one dialog. Far faster than row-by-row Variable View.' },

        { type: 'check',
          question: 'For a Likert satisfaction item coded 1-5, you should set value labels in the Values column. For an income variable in KSh, you should:',
          choices: [
            'Set value labels for common income brackets',
            'Leave the Values column empty — Scale variables don\'t need value labels',
            'Set value labels for at least the minimum and maximum',
            'Set 0 = "no income" and 100000 = "high income"',
          ],
          answer: 1,
          explanation: 'Scale variables (continuous numbers like income, age, score) should NOT have value labels — they are not categorical codes. Setting labels on them clutters output and confuses SPSS. Leave the Values cell as "None". Value labels are only for **Nominal** and **Ordinal** variables.' },

        { type: 'check',
          question: 'What is the easiest way to generate a complete codebook for your thesis appendix?',
          choices: [
            'Manually type one in Word',
            'Take a screenshot of Variable View',
            'Run **Analyze → Reports → Codebook**, tick Label, Values, Missing, Measure, then export to Word',
            'Ask the examiner to write one',
          ],
          answer: 2,
          explanation: 'SPSS auto-generates a complete codebook from the metadata you set in Variable View — Analyze → Reports → Codebook. This is one of the strongest reasons to fill in Labels, Values, and Missing properly. Export the output to Word for your thesis appendix. Saves hours and is more accurate than a hand-typed one.' },
      ],
    },
  ],
};
