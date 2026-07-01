/**
 * SPSS Basics · Lesson 2 — Data View vs. Variable View
 * The single most-confused topic in beginner SPSS. Voice: Magwaga + reassurance.
 */

export const DATA_VIEW_LESSON = {
  id: 'basics-2',
  title: 'Data View vs. Variable View',
  subtitle: 'Module 03 · Course: SPSS Basics · Lesson 2 of 5',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'The single most-confused topic in beginner SPSS',
      blocks: [
        { type: 'scene', body: [
          'You are sitting at your laptop with SPSS open. You\'ve typed your first piece of data — a pupil\'s name. You click the next cell to type their age, and suddenly the column says "VAR00002" with two decimal places, even though age is just a whole number. You wonder if you\'ve done something wrong. You click the bottom of the screen on "Variable View" out of curiosity, and the entire window changes. Now you are looking at a completely different table with columns called "Type", "Width", "Decimals", "Label", "Values"…',
          'You are now thoroughly lost. **You are not alone.** Almost every student goes through this exact confusion in their first week with SPSS. The reason is simple: SPSS shows you **two faces of the same dataset**, and beginners are rarely told this clearly.',
          'This lesson fixes that confusion forever. By the end of it, you will know exactly which view to be in for any task, and you will have set up a proper variable from scratch with a label, value codes, and the correct measurement level.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Explain in one sentence** the difference between Data View and Variable View.',
            '**Switch between them** confidently using the bottom tabs.',
            '**Read a Data View grid** and recognise what each row, each column, and each cell represents.',
            '**Read a Variable View grid** and explain what every one of its eleven columns is for.',
            '**Set up a new variable** end-to-end: name, label, type, decimals, value labels, missing codes, measurement level.',
            '**Choose the correct measurement level** (Scale, Ordinal, or Nominal) for any variable in your study.',
            '**Avoid the four mistakes** that ruin more datasets than any other.',
          ]},

        { type: 'why', body:
          'Getting Variable View right at the START of your project saves DAYS of cleanup later. Every common analysis problem — "SPSS says my analysis is invalid", "my output shows numbers instead of labels", "missing values are being counted as zero" — comes back to a Variable View setting that was never configured properly. Today, you learn how to never have those problems.' },
      ],
    },

    /* ════════════════════ 2. THE BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — two faces of the same dataset',
      blocks: [
        { type: 'heading', level: 2, text: 'Imagine a school class register' },

        { type: 'analogy', title: 'The class register',
          body: 'Picture a teacher\'s class register. On the **inside pages** the teacher writes the actual values: "Wanjiku — 78", "Otieno — 65", "Achieng — 82". One row per pupil, one column per subject. That is what **Data View** looks like in SPSS — actual values, one row per case, one column per variable.\n\nNow flip to the **front cover** of the same register. There you find the *settings* for the register itself: which class it is for, the term, the maximum score for each subject, what code "A" represents (Absent), what code "S" represents (Sick). The cover tells you how to *interpret* what you see inside. That is what **Variable View** is — the settings page for your dataset.' },

        { type: 'paragraph', text:
          'In SPSS, the same dataset has these two faces. **Data View** holds the values. **Variable View** holds the settings that tell SPSS how to interpret those values. They are not separate datasets — they are two ways of looking at the same dataset, just like the inside and the cover of a register.' },

        { type: 'illustration', component: 'DataVsVariableSideBySide',
          caption: 'Figure 1. The same five-pupil dataset shown from both angles. On the LEFT in Data View, the actual values for each pupil — id 1 is gender = 1 with math = 78. On the RIGHT in Variable View, the definitions — the variable called "gender" is labelled "Gender", has value labels {1=Male, 2=Female}, and is measured at the Nominal level. The numbers in Data View only make sense thanks to the labels in Variable View.' },

        { type: 'callout', tone: 'gold', title: 'In one sentence',
          body: '**Data View shows the data. Variable View shows the rules for interpreting that data.** Both views describe the same dataset; they just answer different questions.' },

        { type: 'reveal',
          prompt: 'A pupil has gender coded as "2" in Data View. How does SPSS know whether 2 means Male or Female?',
          answer: 'It looks at the **Values** column in Variable View. If you set the value labels {1=Male, 2=Female}, then SPSS knows 2 = Female. If you never set value labels, SPSS just shows the raw number "2" everywhere — and your output tables will be confusing because no-one knows what 2 means. This is why setting value labels in Variable View is one of the most important habits to learn early.' },
      ],
    },

    /* ════════════════════ 3. DATA VIEW IN DEPTH ════════════════════ */
    {
      id: 'data-view',
      title: 'Data View — where the values live',
      blocks: [
        { type: 'heading', level: 2, text: 'Reading the data grid' },

        { type: 'paragraph', text:
          'Click the **Data View** tab at the bottom-left of the SPSS window. You see a grid that looks like an Excel spreadsheet. Three things are happening on this grid at all times — learn to read them and Data View will hold no mystery for you.' },

        { type: 'illustration', component: 'DataViewGrid',
          caption: 'Figure 2. The Data View grid with six pupils\' data entered. The grey column on the far left is the row number (SPSS adds it automatically). Each row is one pupil — one CASE. Each named column is one VARIABLE.' },

        { type: 'steps', steps: [
          { title: 'Each ROW = one CASE',
            body: [
              'A *case* is whatever your unit of analysis is. If your study is about pupils, one case = one pupil. If it is about villages, one case = one village. If it is about hospital visits, one case = one visit.',
              'In Figure 2, row 1 is pupil number 1 (Wanjiku), row 2 is pupil 2 (Otieno), and so on. SPSS automatically numbers each row in the grey column on the far left.',
              'Important: the row number is just a position. It does not have to match an ID variable. If you sort your data, the row numbers stay 1, 2, 3 in order, but the pupil in each row changes.',
            ]},
          { title: 'Each COLUMN = one VARIABLE',
            body: [
              'A *variable* is something you measured about every case. In Figure 2 we measured four things about each pupil: their id, their gender (coded 1 or 2), their age in years, and their mathematics score.',
              'The names at the top of each column (id, gender, age_yrs, math_score) come from the Variable View — they were defined there. You cannot rename them directly from Data View.',
            ]},
          { title: 'Each CELL = one value',
            body: [
              'A *cell* is the intersection of a row and a column. The cell in row 3, column "math_score" holds the value 82.0 — pupil 3 (Achieng)\'s mathematics score.',
              'To enter a value, click the cell and type. To change a value, click the cell and type the new value. To delete a value, click the cell and press the Delete key — SPSS will record it as a *system-missing value* (more on this in the next lesson on Missing Values).',
            ]},
        ]},

        { type: 'illustration', component: 'CaseVsVariable',
          caption: 'Figure 3. Reading the grid: row 2 (highlighted in gold) is the case "Otieno" — all his information sits in that row. The "Age" column (highlighted in green at the bottom) is one variable — every cell in that column is a pupil\'s age. The intersection of row 2 and the "Age" column is the cell holding the value 24 — Otieno\'s age.' },

        { type: 'heading', level: 3, text: 'A few things Data View will NOT let you do' },

        { type: 'list', items: [
          'You cannot **rename** a variable from Data View. Go to Variable View → change the Name column.',
          'You cannot **change the type** of a variable (numeric to string, etc.) from Data View. Variable View → Type column.',
          'You cannot **add a value label** ("1 = Male") from Data View. Variable View → Values column.',
          'You cannot **mark a value as missing** from Data View. Variable View → Missing column.',
        ]},

        { type: 'why', body:
          'These restrictions exist on purpose. Data View is for the VALUES. Variable View is for the SETTINGS. Keeping them separate stops you from accidentally changing your data when you meant to change a setting (or vice versa). It feels restrictive at first; you grow to appreciate it after your first thesis-saving moment of "thank goodness I couldn\'t accidentally delete that variable from Data View".' },

        { type: 'mistake',
          title: 'Typing data into a column before defining the variable in Variable View',
          body: 'Beginners often launch SPSS, see the empty grid, and start typing values immediately. SPSS lets you do this, but then auto-creates variables called VAR00001, VAR00002, VAR00003 with default settings. Six months later you cannot remember what VAR00037 was supposed to measure.',
          fix: 'Always set up your variables in **Variable View first** — give them meaningful names, labels, and value codes — THEN switch to Data View and type the values. This is the single best habit you can build in your first week with SPSS.' },
      ],
    },

    /* ════════════════════ 4. VARIABLE VIEW IN DEPTH ════════════════════ */
    {
      id: 'variable-view',
      title: 'Variable View — where the rules live',
      blocks: [
        { type: 'heading', level: 2, text: 'The eleven columns explained' },

        { type: 'paragraph', text:
          'Click the **Variable View** tab at the bottom of the SPSS window. The grid changes completely. You are now looking at the *definitions* of your variables. In Variable View, the rules flip: each **row** is now one *variable*, and each **column** is one *property* of that variable.' },

        { type: 'illustration', component: 'VariableViewGrid',
          caption: 'Figure 4. Variable View with four variables defined. Each row is one variable (id, gender, age_yrs, math_score). Each column is a different setting for that variable. The red exclamation mark points to the "Values" cell for gender, which is where you set value labels like {1=Male, 2=Female}. This is the single most important cell beginners forget to fill in.' },

        { type: 'paragraph', text:
          'There are **eleven columns** in Variable View. You do not need to fill in every one for every variable — but you should understand what each is for. Here they are in order, with their plain-English purpose:' },

        { type: 'comparison',
          headers: ['Column', 'What it controls', 'Tip for beginners'],
          rows: [
            ['**Name**',     'The short technical name of the variable (e.g. age_yrs)',                           'Keep it short, no spaces, lowercase. Max 64 characters but aim for under 20.'],
            ['**Type**',     'Numeric, String (text), Date, Dollar, etc.',                                       'Default Numeric is correct 95% of the time. Use String only for free-text answers.'],
            ['**Width**',    'How many characters wide the column is when displayed',                            'Leave at 8 unless you have very long text.'],
            ['**Decimals**', 'How many decimal places to show',                                                  'Whole numbers (age, scores): 0. Continuous measurements (income): 2. Means/percentages: 2 or 3.'],
            ['**Label**',    'The human-readable name that appears in output tables',                            '**Always fill this in.** Example Name = q4_sa1, Label = "I am satisfied with my supervisor".'],
            ['**Values**',   'Value labels for categorical variables (1=Male, 2=Female)',                        '**Always fill in for nominal/ordinal variables.** Without this, output shows confusing numbers.'],
            ['**Missing**',  'Codes you used to indicate missing data (999, 998)',                               '**Always tell SPSS your missing codes** here, or it will treat 999 as a real value!'],
            ['**Columns**',  'Column width in the Data View display (cosmetic only)',                            'Leave at default. Adjust later if columns look too narrow.'],
            ['**Align**',    'Left, right, or centre alignment in Data View',                                    'Leave default — numeric right-aligned, text left-aligned.'],
            ['**Measure**',  'Scale, Ordinal, or Nominal — the measurement level',                               '**Critical for analyses.** Section 6 of this lesson covers how to pick the right one.'],
            ['**Role**',     'Input, Target, Both, etc. — used by some predictive procedures',                   'Leave as "Input" for almost every analysis. Ignore unless you use modeller.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'The four columns that matter most',
          body: 'If you are short on time, **focus on these four columns** for every variable: **Name** (so you can find it), **Label** (so your output is readable), **Values** (so categorical codes mean something), **Measure** (so SPSS knows what analyses are allowed). The other seven columns matter less for most thesis work.' },
      ],
    },

    /* ════════════════════ 5. WALKING THROUGH ONE VARIABLE ════════════════════ */
    {
      id: 'walkthrough',
      title: 'Walking through one variable end-to-end',
      blocks: [
        { type: 'heading', level: 2, text: 'Setting up the "gender" variable from scratch' },

        { type: 'paragraph', text:
          'Let us set up one complete variable together so the eleven columns stop feeling abstract. We will create a variable called **gender** that holds whether each pupil is Male or Female. By the end of this section you will have walked through every setting that matters and you will be able to set up any variable in your own dataset by following the same recipe.' },

        { type: 'workedExample', title: 'Setting up "gender" — a complete walkthrough',
          body: [
            { label: 'Step 1 — Switch to Variable View',
              text: 'Click the **Variable View** tab at the bottom-left. You are now in the definitions grid.' },
            { label: 'Step 2 — Click the first empty row in the Name column',
              text: 'If you already have variables defined, click the first empty row beneath them. Type **gender** (lowercase, no spaces). Press Tab or Enter — SPSS automatically fills in default values for the other columns (Type = Numeric, Width = 8, Decimals = 2).' },
            { label: 'Step 3 — Change Decimals to 0',
              text: 'Gender will be coded as a whole number (1 or 2), not 1.00 or 2.00. Click the Decimals cell for the gender row and change it from 2 to **0**.' },
            { label: 'Step 4 — Add a human-readable Label',
              text: 'Click the Label cell. Type something descriptive like **"Gender of pupil"**. This is what appears in output tables — you want it to be clear without referring back to a codebook.' },
            { label: 'Step 5 — Set the Value Labels (THE most important step)',
              text: 'Click the small grey box in the **Values** cell. A "Value Labels" dialog opens. In the "Value" box type **1** and in the "Label" box type **Male**. Click **Add**. Now type **2** in Value and **Female** in Label. Click **Add** again. Click OK.\n\nNow SPSS knows: whenever it sees a 1 in this column it means Male, and a 2 means Female. Your output tables will show "Male" and "Female" instead of "1" and "2".' },
            { label: 'Step 6 — Define your missing-value code',
              text: 'Click the small grey box in the **Missing** cell. A "Missing Values" dialog opens. Tick "Discrete missing values" and type **999**. Click OK. Now if a pupil refused to answer, you can enter 999 in Data View and SPSS will treat it as missing rather than as a real gender code.' },
            { label: 'Step 7 — Set the Measure to Nominal',
              text: 'In the **Measure** column for the gender row, click the small dropdown and choose **Nominal**. Gender is categorical with no natural ordering (Male is not "more than" Female), so Nominal is the correct measurement level. (Section 6 explains how to choose this for any variable.)' },
            { label: 'Step 8 — Switch to Data View and start typing values',
              text: 'Click the **Data View** tab. The gender column is now ready. Type 1 for a Male pupil, 2 for a Female pupil, 999 if the value is missing. If you click any cell once and then go to View → Value Labels (or press Ctrl+Alt+V), the column will display "Male"/"Female" instead of 1/2 — a useful sanity check.' },
          ]},

        { type: 'callout', tone: 'success', title: 'You have just set up a proper variable',
          body: 'Repeat this exact recipe for every variable in your dataset and you will avoid 90% of the data-quality problems that derail thesis projects. It takes about 60 seconds per variable. A dataset of 20 variables can be fully defined in twenty minutes — but those twenty minutes save days of confusion later.' },

        { type: 'reveal',
          prompt: 'Why is setting the Missing code (999) in Step 6 so important?',
          answer: 'Without setting the missing code, SPSS treats 999 as a *real* gender value. When you later compute the mean gender, SPSS averages 1s, 2s, AND 999s together — giving you a meaningless number like 4.7. When you cross-tabulate gender against another variable, SPSS shows a "999" category as if 999 were a real gender. The Missing column tells SPSS: "Anywhere you see 999 in this column, ignore it." This single setting prevents one of the most common analysis disasters in beginner SPSS work.' },
      ],
    },

    /* ════════════════════ 6. MEASUREMENT LEVELS ════════════════════ */
    {
      id: 'measurement-levels',
      title: 'Choosing the right measurement level',
      blocks: [
        { type: 'heading', level: 2, text: 'Scale, Ordinal, or Nominal — how to decide' },

        { type: 'paragraph', text:
          'The **Measure** column in Variable View asks you to choose one of three measurement levels for every variable: **Scale**, **Ordinal**, or **Nominal**. This is not a cosmetic setting. SPSS uses it to decide which statistical analyses are appropriate. Choosing wrong can either prevent SPSS from running the test you want, or — worse — let you run a test that is statistically inappropriate.' },

        { type: 'illustration', component: 'MeasurementLevels',
          caption: 'Figure 5. The three measurement levels in SPSS. Scale (📏) is numbers on a continuous scale. Ordinal (📊) is ranked categories where order matters. Nominal (🏷️) is named categories with no order.' },

        { type: 'heading', level: 3, text: 'Scale — true numbers' },

        { type: 'paragraph', text:
          'A **Scale** variable is a continuous numeric measurement where the gaps between numbers are meaningful and equal. The difference between 20 years old and 21 years old is the same as between 80 and 81. The difference between a score of 60 and 70 is the same as between 80 and 90.' },

        { type: 'list', items: [
          'Examples: **age in years**, **income in shillings**, **exam score out of 100**, **weight in kilograms**, **distance in metres**.',
          'A good test: can you meaningfully calculate an average? "The mean age was 24.3 years" makes sense. If yes, the variable is probably Scale.',
        ]},

        { type: 'heading', level: 3, text: 'Ordinal — ranked categories' },

        { type: 'paragraph', text:
          'An **Ordinal** variable has categories that have a meaningful order — but the gaps between categories may not be equal or known. "Strongly disagree → Disagree → Neutral → Agree → Strongly agree" has an order (Strongly agree is more agreement than Agree), but we cannot say the *gap* between Disagree and Neutral is the same as between Agree and Strongly agree.' },

        { type: 'list', items: [
          'Examples: **Form 1/2/3/4** (more advanced as you go up but the gaps in maturity are not equal), **satisfaction low/medium/high**, **education primary/secondary/tertiary**, **single Likert items**.',
          'A good test: would it make sense to sort the categories from "least" to "most"? If yes, and the gaps may not be equal, the variable is Ordinal.',
        ]},

        { type: 'heading', level: 3, text: 'Nominal — named categories' },

        { type: 'paragraph', text:
          'A **Nominal** variable has categories with no natural ordering. Male and Female are different but neither is "more than" the other. Nairobi and Kisumu are different counties but neither is "higher".' },

        { type: 'list', items: [
          'Examples: **gender**, **county**, **religion**, **marital status**, **treatment group (control / drug A / drug B)**.',
          'A good test: would it make any sense to "sort" the categories? "Sorting by gender" is meaningless. If sorting makes no sense, the variable is Nominal.',
        ]},

        { type: 'comparison',
          headers: ['Variable', 'Measurement level', 'Why'],
          rows: [
            ['Age in years (continuous)', 'Scale', 'A true number with equal gaps.'],
            ['Income in KSh', 'Scale', 'A true number with equal gaps.'],
            ['Form (1, 2, 3, 4)', 'Ordinal', 'Ordered but gaps in maturity not equal.'],
            ['Satisfaction (low/med/high)', 'Ordinal', 'Ordered but gaps may not be equal.'],
            ['A single Likert item (1–5)', 'Ordinal', 'Ordered but gaps between agreement levels are not necessarily equal.'],
            ['Total of 10 Likert items (10–50)', 'Scale', 'A summed scale is treated as continuous — Pearson is fine on it.'],
            ['Gender', 'Nominal', 'No natural ordering.'],
            ['County of residence', 'Nominal', 'No natural ordering.'],
            ['Treatment group', 'Nominal', 'Just labels, no order.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Why this matters for your analyses',
          body: [
            'SPSS uses your Measure setting to filter what analyses it offers you. If you incorrectly mark gender as "Scale", SPSS will let you compute the *mean* gender — which is nonsense.',
            'Conversely, if you incorrectly mark age as "Nominal", SPSS will not let you compute its mean or run a Pearson correlation on it.',
            'When you run a statistical test (Lessons in later courses), the test selector in this platform uses Measure to recommend the right analysis. Get Measure right and the rest follows.',
          ]},

        { type: 'reveal',
          prompt: 'You have a variable "monthly income in KSh" with values like 25000, 47500, 82000. What Measure should you choose?',
          answer: '**Scale**. Income is a true number with equal gaps — the difference between 25,000 and 30,000 is the same as between 75,000 and 80,000. Calculating a mean income is meaningful. This is a classic Scale variable.' },

        { type: 'reveal',
          prompt: 'A pupil rates their teacher on a single Likert item: 1 = Very poor, 2 = Poor, 3 = OK, 4 = Good, 5 = Excellent. What Measure should you choose?',
          answer: '**Ordinal**. The categories are clearly ordered (5 is better than 4 which is better than 3) but we cannot prove the gap between "Poor" and "OK" is the same as between "Good" and "Excellent". A single Likert item is the classic ordinal example.\n\nHowever — and this is important — if you SUM ten Likert items into a single 10–50 total score, the total can be treated as Scale because summation smooths out the unequal gaps.' },
      ],
    },

    /* ════════════════════ 7. NAMING CONVENTIONS ════════════════════ */
    {
      id: 'naming',
      title: 'Naming conventions that survive a thesis defence',
      blocks: [
        { type: 'heading', level: 2, text: 'How to name variables so future-you can read them' },

        { type: 'paragraph', text:
          'You will live with your variable names for the entire length of your thesis — sometimes longer. The names you choose today will appear in every output table, every syntax file, every chart. A few simple rules now save you constant frustration later.' },

        { type: 'steps', steps: [
          { title: 'Keep names short but meaningful',
            body: 'Aim for 8–20 characters. "age_yrs" is good. "a" is too short to be meaningful. "respondent_age_in_completed_years" is unnecessarily long.' },
          { title: 'No spaces — use underscores instead',
            body: 'SPSS does not allow spaces in variable names. Use underscore (age_yrs) or camelCase (ageYrs) — pick one style and stick with it across your whole dataset.' },
          { title: 'Lowercase, always',
            body: 'SPSS is case-insensitive for variable names — "AGE" and "age" are the same variable. But mixed case is harder to read in syntax. Stick to lowercase.' },
          { title: 'Start with a letter, not a number',
            body: 'SPSS does not allow names that start with a digit. "1st_year" is invalid. Use "yr_1" or "first_year" instead.' },
          { title: 'Use prefixes to group related variables',
            body: 'If you have ten satisfaction items, name them sa_1 to sa_10. Five demographic items can be dem_age, dem_gender, dem_county, etc. Prefixes make your dataset much easier to navigate.' },
          { title: 'For reverse-coded items, add _r at the end',
            body: 'If you later reverse-code item sa_3 (so high values mean the same thing as the other items), call it sa_3_r. The suffix is a visual reminder that this version is reversed.' },
        ]},

        { type: 'comparison',
          headers: ['Good name', 'Bad name', 'Why the bad one is bad'],
          rows: [
            ['age_yrs',   'Age in years',     'Spaces not allowed in SPSS variable names.'],
            ['gender',    'g',                'Single letter — meaningless in six months.'],
            ['sa_1',      '1_satisfaction',   'Starts with a digit — invalid in SPSS.'],
            ['math_score','Mathematics_Score_Out_Of_100_End_Of_Term_2024', 'Far too long. Use Label for the descriptive name.'],
            ['sa_3_r',    'sa_3_reverse_coded_now',                        'Use the short _r convention; descriptive part goes in the Label.'],
          ]},

        { type: 'why', body:
          'The point of a good name is that you (and any examiner or co-author) can glance at a syntax file and know what each variable is. "REGRESSION /DEPENDENT math_score /METHOD=ENTER age_yrs gender study_hrs" is readable. "REGRESSION /DEPENDENT v1 /METHOD=ENTER v2 v3 v4" is not.' },
      ],
    },

    /* ════════════════════ 8. THE FOUR COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'The four mistakes that ruin datasets',
      blocks: [
        { type: 'heading', level: 2, text: 'Avoid these and your dataset will be analysis-ready' },

        { type: 'mistake',
          title: 'Mistake 1 — Forgetting to set Value Labels',
          body: 'You code gender as 1 and 2 in Data View but never set the value labels {1=Male, 2=Female} in Variable View. Six months later you cannot remember which was Male and which was Female, and every output table shows confusing numbers.',
          fix: 'For every nominal or ordinal variable, fill in the **Values** column in Variable View before you start typing data. Use the Values dialog: type the code (1) and label (Male), click Add; repeat for each category; click OK.' },

        { type: 'mistake',
          title: 'Mistake 2 — Forgetting to declare Missing codes',
          body: 'You use 999 to mark "respondent refused to answer" but never tell SPSS in the Missing column. SPSS treats 999 as a real value of the variable. Means come out wildly wrong, crosstabs show a "999" category, correlations are corrupted.',
          fix: 'Decide your missing codes upfront (common: 999 = refused, 998 = don\'t know, 997 = not applicable). For every variable, declare these in the **Missing** column in Variable View.' },

        { type: 'mistake',
          title: 'Mistake 3 — Wrong Measure setting',
          body: 'You leave the default "Scale" for a Nominal variable like county, or you mark a continuous variable like age as "Ordinal". This either lets you run inappropriate analyses (mean county!) or stops you running appropriate ones.',
          fix: 'After defining every variable, scan down the **Measure** column and check each one. Scale for true numbers, Ordinal for ranked categories, Nominal for unordered categories. Section 6 of this lesson has a full reference table.' },

        { type: 'mistake',
          title: 'Mistake 4 — Typing data before defining variables',
          body: 'You launch SPSS, see the empty grid, and start typing. SPSS auto-creates variables called VAR00001, VAR00002… with default settings. You end up with a dataset whose variables have no names, no labels, no value labels, no missing codes, and possibly wrong measurement levels. Cleanup takes hours.',
          fix: 'Always **Variable View first, Data View second**. Define all your variables (Name, Label, Values, Missing, Measure) in Variable View. Only when every variable is set up properly do you switch to Data View and type values.' },
      ],
    },

    /* ════════════════════ 9. SWITCHING VIEWS QUICKLY ════════════════════ */
    {
      id: 'switching',
      title: 'Quick tips for switching and toggling views',
      blocks: [
        { type: 'heading', level: 2, text: 'Save mouse-clicks and your sanity' },

        { type: 'paragraph', text:
          'You will switch between Data View and Variable View dozens of times per session. A few small tricks make this smoother.' },

        { type: 'comparison',
          headers: ['Action', 'How', 'Saves time when…'],
          rows: [
            ['Switch view',                'Click bottom-left tab — or **Ctrl+T**',                                'You are jumping back and forth.'],
            ['Go to a specific variable',  '**Ctrl+F** (Find) in either view',                                     'Your dataset has 50+ variables.'],
            ['Show value labels in Data View', 'View menu → Value Labels (or **Ctrl+Alt+V**)',                     'You want to confirm that 1 = Male, 2 = Female without flipping to Variable View.'],
            ['Sort variables alphabetically', 'Right-click any column header in Variable View → Sort Ascending',  'You have so many variables you can\'t find one.'],
            ['Insert a new variable in the middle', 'Right-click the row number in Variable View → Insert Variable', 'You realised you forgot a variable and want it in a specific position.'],
          ]},

        { type: 'callout', tone: 'info', title: 'The "View → Value Labels" toggle is magic',
          body: 'In Data View, press **Ctrl+Alt+V** (or View → Value Labels). The gender column suddenly shows "Male" and "Female" instead of 1 and 2. Press it again and it goes back to numbers. Use it constantly to sanity-check that your value labels are set up correctly without leaving Data View.' },
      ],
    },

    /* ════════════════════ 10. SECTION SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'heading', level: 2, text: 'What you should now be able to do' },

        { type: 'summary', items: [
          'Explain Data View vs. Variable View in one sentence: Data View shows the values, Variable View shows the rules for interpreting them.',
          'Switch between the two views using the bottom-left tabs (or Ctrl+T).',
          'Read a Data View grid: rows = cases, columns = variables, cells = values.',
          'Read a Variable View grid: rows = variables, columns = settings for each variable.',
          'Name the four columns in Variable View that matter most for every variable: **Name**, **Label**, **Values**, **Measure**.',
          'Set up a brand new variable end-to-end following the 8-step recipe — name, decimals, label, value labels, missing code, measure, then enter values.',
          'Choose the correct measurement level for any variable: **Scale** for true numbers, **Ordinal** for ranked categories, **Nominal** for unordered categories.',
          'Follow naming conventions: short, lowercase, no spaces, no leading digits, prefixes for related variables.',
          'Avoid the four big mistakes — forgetting value labels, forgetting missing codes, wrong Measure, typing before defining.',
          'Use **Ctrl+Alt+V** in Data View to toggle between showing numeric codes and showing value labels.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 3: Defining variables & labels** we go even deeper into Variable View — specifically the rules for naming variables professionally, how to use Variable Sets to organise large datasets, and how to write labels that read well in published tables. Lesson 4 covers importing data from Excel, KoboToolbox, and Google Forms without losing your variable definitions in the process. Lesson 5 closes the SPSS Basics course with everything you need to know about missing data.' },

        { type: 'paragraph', text:
          'Before you move on, open SPSS right now and set up two practice variables using the 8-step recipe. Try one Nominal (e.g. county with codes 1=Nairobi, 2=Mombasa, 3=Kisumu) and one Scale (e.g. age in years). Switch between views. Use Ctrl+Alt+V to toggle labels. This 10 minutes of hands-on practice is worth more than reading another ten pages. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'heading', level: 2, text: 'Six quick questions' },

        { type: 'paragraph', text:
          'Answer all six questions to complete the lesson. After each one you will see whether you were right and a brief explanation. Retry as many times as you want.' },

        { type: 'check',
          question: 'In Data View, what does a single ROW represent?',
          choices: ['One variable', 'One case (e.g. one respondent)', 'One value label', 'One measurement level'],
          answer: 1,
          explanation: 'A row in Data View is **one case** — typically one respondent, pupil, village, or whatever your unit of analysis is. Variables are the COLUMNS in Data View. This row/column logic is the opposite in Variable View, where rows are variables and columns are settings.' },

        { type: 'check',
          question: 'You coded gender as 1 = Male, 2 = Female, but in your output tables it shows "1" and "2" instead of "Male" and "Female". What did you forget to do?',
          choices: [
            'Save the file',
            'Set the Value Labels in Variable View → Values column',
            'Switch to Data View',
            'Run the analysis again',
          ],
          answer: 1,
          explanation: 'Without value labels SPSS shows the raw numeric codes everywhere. Open Variable View → click the Values cell for gender → set 1=Male, 2=Female → OK. From now on every output table will show the labels.' },

        { type: 'check',
          question: 'You used 999 to indicate missing data but did not declare it in the Missing column. What goes wrong?',
          choices: [
            'Nothing — SPSS detects missing values automatically',
            'SPSS treats 999 as a real value: means come out wrong, crosstabs show a 999 category, correlations are corrupted',
            'The file becomes corrupted',
            'SPSS will not let you save the file',
          ],
          answer: 1,
          explanation: 'SPSS has no way of knowing what your missing code is — you have to tell it. Without declaring 999 in the Missing column, SPSS sees 999 as just another data value. Always set missing codes in Variable View before you analyse.' },

        { type: 'check',
          question: 'What is the correct Measure setting for a variable "monthly income in KSh" with values like 25000, 47500, 82000?',
          choices: ['Nominal', 'Ordinal', 'Scale', 'String'],
          answer: 2,
          explanation: 'Income is a true number with equal gaps (5,000 KSh difference is the same difference whether the base is 25,000 or 75,000). Calculating a mean is meaningful. That makes it **Scale**.' },

        { type: 'check',
          question: 'You launch SPSS and immediately start typing values into the empty grid in Data View. What is the problem?',
          choices: [
            'Nothing — that\'s the recommended approach',
            'SPSS auto-creates variables called VAR00001, VAR00002 with no labels, no value labels, no missing codes, default measure — you end up with a hard-to-clean dataset',
            'You will overwrite system files',
            'You can only enter data in Variable View',
          ],
          answer: 1,
          explanation: 'Always **Variable View first, Data View second**. Define every variable properly (Name, Label, Values, Missing, Measure) before entering a single value. This is the single best habit you can build in your first week with SPSS.' },

        { type: 'check',
          question: 'In Data View, you want to confirm that 1 = Male and 2 = Female without leaving Data View. What\'s the quickest way?',
          choices: [
            'Open Variable View and check the Values column',
            'Press **Ctrl+Alt+V** (or View → Value Labels) to toggle the display from numbers to labels',
            'Print the dataset',
            'Run a Frequencies analysis',
          ],
          answer: 1,
          explanation: '**Ctrl+Alt+V** instantly switches the Data View display from showing the raw codes (1, 2) to showing the value labels (Male, Female). Press it again to toggle back. It is the fastest sanity-check in all of SPSS.' },
      ],
    },
  ],
};
