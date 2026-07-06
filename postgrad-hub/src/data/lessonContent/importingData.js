/**
 * SPSS Basics · Lesson 4 — Importing Data from Excel
 * The single most common source of beginner panic. Walks through cleaning
 * the Excel file FIRST, then importing, then verifying the import worked.
 */

export const IMPORTING_DATA_LESSON = {
  id: 'basics-4',
  title: 'Importing data from Excel',
  subtitle: 'Module 03 · Course: SPSS Basics · Lesson 4 of 5',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'The moment most beginners panic — and how to avoid it',
      blocks: [
        { type: 'scene', body: [
          'Picture the scene. You have spent three months collecting data for your thesis. You typed it all into Excel because Excel is what you already know. You have 127 respondents and 24 questions. The file looks neat to you.',
          'Now you open SPSS and click **File → Import Data → Excel**. You navigate to your file, click OK, and… something is wrong. Your column headers became row 3 instead of row 1. Some columns are now strings of text where they should be numbers. SPSS has created variables called "Unnamed: 0" and "Q1.1". Your missing values became "999" everywhere. Three months of careful data entry suddenly looks like a mess.',
          'This is the moment most beginners panic and start over from scratch. **You do not need to.** The problem is not SPSS — the problem is the shape of the Excel file. If you clean the Excel file BEFORE importing, the import becomes a one-click operation that just works. This lesson teaches you how to do that.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Spot the seven common Excel sins** that break SPSS imports — title rows, merged cells, multiple worksheets, mixed data types, etc.',
            '**Clean an Excel file** so that it is "SPSS-ready" before you click Import.',
            '**Import an Excel file** correctly using File → Import Data → Excel, choosing the right options in the dialog.',
            '**Verify the import worked** by checking a four-item checklist before doing any analysis.',
            '**Import from Google Forms, KoboToolbox, REDCap, and ODK** — the workflow is the same once you have the data as an .xlsx or .csv.',
            '**Save the imported data as a .sav file** so you never have to re-import.',
            '**Define all the variables** properly after import using the techniques from Lesson 3.',
          ]},

        { type: 'why', body:
          'Almost every Kenyan postgraduate student collects data in Excel, Google Forms, or KoboToolbox. The single biggest reason analyses go wrong is that the data was never properly imported into SPSS. Twenty minutes of cleaning before import saves twenty hours of cleaning after.' },
      ],
    },

    /* ════════════════════ 1.5 BEFORE YOU IMPORT ANYTHING — THE MENTAL MAP ════════════════════ */
    {
      id: 'variables-first',
      title: 'Before you import ANYTHING — get the mental map right',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'The single biggest reason SPSS imports fail is that students treat "Excel" and "SPSS" as the same tool. They\'re not — and understanding the difference BEFORE you click File → Import saves hours of debugging later.',
            'This section takes 3 minutes. Read it. Then the walkthrough that follows will feel obvious.',
          ]},

        { type: 'heading', level: 2, text: 'Excel and SPSS are NOT the same thing' },

        { type: 'comparison',
          headers: ['', 'Excel', 'SPSS'],
          rows: [
            ['**Purpose**',              'Flexible general-purpose spreadsheet — invoices, budgets, lists, notes, anything', 'Statistical software — every column MUST be a properly-defined variable'],
            ['**Cell contents**',        'Can be anything — text, numbers, formulas, images, notes',                          'Each column can be ONLY ONE type — numeric or string, never mixed'],
            ['**Row structure**',        'Free-form — you can have titles, blank rows, subtotals wherever',                    'Strict: row 1 = variable names, row 2 onwards = one respondent per row, no exceptions'],
            ['**Missing data**',         'Blank cells, "?", "N/A", 999, "don\'t know" — anything goes',                        'Must be either genuinely blank OR a declared numeric missing code (like 999)'],
            ['**Multiple sheets**',      'Common — one file for data, notes, analysis, charts',                                'Imports ONE sheet at a time. The other sheets are invisible to SPSS'],
          ]},

        { type: 'callout', tone: 'brand', title: 'The insight that changes everything',
          body: [
            'Your Excel file is like a **flexible notebook**. Your SPSS file is like a **structured database**.',
            'To move from one to the other, you must first STRUCTURE your Excel file to look like what SPSS expects. That means one header row, no title, no blank rows, one worksheet, consistent data types per column, and a proper missing-value convention.',
            'The next section walks through the "7 Excel sins" that violate these rules — with the Machakos study as the worked example.',
          ]},

        { type: 'heading', level: 2, text: 'What the Machakos data looks like BEFORE and AFTER cleaning' },

        { type: 'paragraph', text:
          'To make this concrete, we\'ll follow ONE Excel file through the whole lesson — the raw Machakos study data as it was originally typed by the researcher, and then the same file after cleaning. You\'ll see the exact 7 sins in the raw file (Figure 1 in the next section), and the fixes in the cleaned file (Figure 2).' },

        { type: 'comparison',
          headers: ['Aspect', 'Machakos raw (messy) Excel', 'Machakos cleaned (SPSS-ready) Excel'],
          rows: [
            ['**Title row**',            '"Machakos Digital Learning Study - Data Collection 2024" merged across A1:H1', 'None. Row 1 = header names.'],
            ['**Variable names**',       '"Q1: Do you have devices?", "Age (yrs)", "Sex"',                                'Dev_1, Age, Gender (SPSS-friendly)'],
            ['**Gender values**',        '"M", "F", "male", "Female" all mixed',                                          '"Male" and "Female" only — consistent'],
            ['**Age values**',           '48, "thirty-four", 41, 16, "?"',                                                'All pure numbers: 48, 34, 41, 16'],
            ['**Missing entries**',      '"?", "--", "NOTE: follow up later", or completely random',                     'Blank cells (SPSS handles genuine blanks) or numeric 999'],
            ['**Number of worksheets**', '4 sheets: Sheet1, Raw Data, Analysis, Notes',                                   '1 sheet: "Machakos"'],
            ['**Bottom row**',           '"Sub-total | | | | 6.05"',                                                     'Deleted — no aggregate rows'],
          ]},

        { type: 'callout', tone: 'warning', title: 'The rule to memorise',
          body: [
            '**Every column in your Excel file must be able to answer "What ONE type of information am I?"**',
            'If the answer is "sometimes a number, sometimes a note, sometimes blank" — that column will break SPSS.',
            'Fix the Excel FIRST. Import SECOND. Never do it in the other order.',
          ]},

        { type: 'why', body:
          'The temptation is always to just click Import and "fix it in SPSS later". But every messy value that gets imported becomes a data-cleaning task inside SPSS — where the tools are less familiar and every mistake is harder to undo. Twenty minutes fixing Excel beats twenty hours fixing SPSS.' },
      ],
    },

    /* ════════════════════ 2. PREPARING THE EXCEL FILE ════════════════════ */
    {
      id: 'preparing',
      title: 'Step one — preparing the Excel file BEFORE you open SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'The seven Excel sins that break SPSS imports' },

        { type: 'paragraph', text:
          'An Excel file that looks neat to a human can be a disaster for SPSS to read. Before you open SPSS, open your Excel file and fix the seven problems below. We will look at each one, see what it looks like, and learn the fix.' },

        { type: 'illustration', component: 'MachakosImportMessy',
          caption: 'Figure 1. The Machakos study data typed into Excel by a beginner researcher — every one of the 7 Excel sins on display. Merged title row, blank rows at the top, mixed text/numbers ("thirty-four" in Age), inconsistent capitalization ("M", "F", "male", "Female"), words instead of decimals ("5 point 5"), notes/comments embedded in data cells, and multiple worksheet tabs at the bottom. Every red ❌ marks a problem that will break the SPSS import. We will fix all of them in the next few minutes.' },

        { type: 'heading', level: 3, text: 'Sin 1 — Title rows above the data' },
        { type: 'paragraph', text:
          'Researchers love adding a title like "My thesis data — collected Sept 2024" at the top of the worksheet, sometimes followed by a blank row, before the actual header row begins. SPSS does not know to skip these. It treats the first row as the variable names — so your variable becomes literally "My thesis data — collected Sept 2024".' },
        { type: 'callout', tone: 'success', title: 'Fix',
          body: 'Delete the title row(s) and any blank rows above the data. Your **column headers must be in row 1**, with actual data starting in row 2. No exceptions.' },

        { type: 'heading', level: 3, text: 'Sin 2 — Multiple worksheets in one file' },
        { type: 'paragraph', text:
          'Your Excel file has three sheets: "Data", "Codebook", "Charts". SPSS imports only ONE sheet at a time and you have to tell it which. If you forget to pick the right sheet, you end up importing your codebook as if it were data.' },
        { type: 'callout', tone: 'success', title: 'Fix',
          body: 'Keep your data on a single, clearly-named sheet (e.g. "Data"). Move codebook entries and charts to a separate file. When the SPSS import dialog asks "Worksheet", pick "Data".' },

        { type: 'heading', level: 3, text: 'Sin 3 — Merged cells' },
        { type: 'paragraph', text:
          'You merged the "Demographics" header across columns A-E so it spans them visually. To SPSS, that merged cell is a single value that confuses the column structure. The columns after the merge end up shifted or empty.' },
        { type: 'callout', tone: 'success', title: 'Fix',
          body: 'Unmerge every merged cell. In Excel: select the merged cell → Home tab → Merge & Center button → Unmerge Cells. Repeat for every merged cell in the file. Use real column headers in row 1 instead of decorative merged labels.' },

        { type: 'heading', level: 3, text: 'Sin 4 — Mixed numeric and text in the same column' },
        { type: 'paragraph', text:
          'Your "math_score" column has mostly numbers — 78, 65, 82 — but a few cells have "N/A" or "absent" typed in. SPSS sees the column has BOTH numbers and text, so it imports the whole column as STRING (text). You can no longer compute a mean, run a t-test, or do anything numeric with it.' },
        { type: 'callout', tone: 'success', title: 'Fix',
          body: 'Use **a single numeric missing code** instead of mixed text. Replace every "N/A", "absent", "missing", "?" with the same number — typically **999**. The whole column is now purely numeric. Later, in SPSS Variable View, you declare 999 as a missing value and the analyses skip it correctly.' },

        { type: 'heading', level: 3, text: 'Sin 5 — Inconsistent codes for the same category' },
        { type: 'paragraph', text:
          'In your gender column, some cells say "Male", others say "M", others say "1", others "male" (lowercase). To Excel they look fine. To SPSS, that is four different categories.' },
        { type: 'callout', tone: 'success', title: 'Fix',
          body: 'Use **one consistent code** per category before importing. Best practice: use numeric codes (1 = Male, 2 = Female) and keep a separate codebook describing what they mean. In Excel, use Find & Replace to standardise: Ctrl+H → Find "M" → Replace "1" → Replace All. Repeat for "Male" → 1, "F" → 2, "Female" → 2.' },

        { type: 'heading', level: 3, text: 'Sin 6 — Blank cells for missing values' },
        { type: 'paragraph', text:
          'When a respondent didn\'t answer Q5, you left the cell blank. SPSS reads blank cells as system-missing — which seems fine until you realise you cannot distinguish "didn\'t answer" from "refused" from "not applicable". You also cannot include the missing entries in frequency tables.' },
        { type: 'callout', tone: 'success', title: 'Fix',
          body: 'Replace blanks with explicit missing codes: **999** for refused/no-answer, **998** for don\'t know, **997** for not applicable. Use Excel Find & Replace: leave Find blank, type 999 in Replace. Now every blank becomes 999 and you can tell SPSS what they mean.' },

        { type: 'heading', level: 3, text: 'Sin 7 — Subtotal or summary rows mixed in with data' },
        { type: 'paragraph', text:
          'At the bottom of your data, helpfully, you added a row that says "Mean: 80". To SPSS this looks like one more case (respondent number 128) with the literal text "Mean:" in column A and the number 80 in the math column. It contaminates all subsequent analyses.' },
        { type: 'callout', tone: 'success', title: 'Fix',
          body: 'Remove every subtotal, mean, count, or summary row. Your data sheet should contain ONLY raw cases — one row per respondent, no totals at the bottom, no notes in the margins. Summaries belong in a separate file or sheet.' },

        { type: 'heading', level: 2, text: 'What a clean Excel file looks like' },

        { type: 'illustration', component: 'MachakosImportClean',
          caption: 'Figure 2. The SAME Machakos data after applying all 7 fixes. Headers in row 1 (RespID, SchoolID, Category, Gender, Age, Form, HighestQual, Dev_1, Math_KCSE_Mean). Variable names follow SPSS rules (underscores, no spaces). Every gender is consistently "Male" or "Female". Every Age is a pure number. Empty cells are genuinely blank (correct missing per study design — Form is blank for principals/teachers). ONE worksheet at the bottom called "Machakos". This file imports into SPSS perfectly.' },

        { type: 'reveal',
          prompt: 'Your Excel file has a column called "Age". Most cells have numbers like 22, 24, 31. But three cells have "twenty-five" and one has "?". When you import this into SPSS, what will happen — and how do you fix it?',
          answer: 'SPSS will detect mixed content (numbers + text) in the column and import the whole "Age" column as STRING type. You will not be able to compute a mean age, run a correlation with age, or use age in any numeric analysis. **The fix BEFORE importing:** open Excel → use Find & Replace → change "twenty-five" to 25 and "?" to 999 → save the file. Now the column is purely numeric. After importing, in SPSS Variable View, set 999 as a Missing value for the Age variable.' },
      ],
    },

    /* ════════════════════ 3. THE IMPORT DIALOG ════════════════════ */
    {
      id: 'import-dialog',
      title: 'Step two — running the import in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'File → Import Data → Excel' },

        { type: 'paragraph', text:
          'Once your Excel file is clean, the actual import takes 30 seconds. Open SPSS to a blank Data Editor and follow these steps.' },

        { type: 'illustration', component: 'MachakosImportMenuPath',
          caption: 'Figure 3. The menu path to import an Excel file. From the SPSS main menu: **File → Import Data → Excel…** The gold arrow shows exactly which item to click. (For CSV files, use "CSV Data..." — the next item on the same submenu.)' },

        { type: 'steps', steps: [
          { title: 'Open the import dialog',
            body: 'From the main menu: **File → Import Data → Excel…** A file-browser opens. Navigate to your cleaned Excel file and click Open.' },
          { title: 'Pick the worksheet',
            body: 'If your file has multiple worksheets, the next dialog asks which sheet to import. Pick the one with your data (e.g. "Data" or "Sheet1"). The Range field auto-fills with the bounds of your data.' },
          { title: 'Tick the critical checkboxes',
            body: [
              '**Read variable names from the first row of data** — TICK this. It tells SPSS that row 1 is column headers, not data.',
              '**Determine data type from data** — TICK this. SPSS scans every column and guesses whether it is numeric or string. Usually correct if your file is clean.',
              '**Percentage of values that determine data type** — leave at 95% (default). Means SPSS looks at 95% of values before deciding.',
              '**Ignore hidden rows and columns** — TICK if you hid any helper rows/columns in Excel.',
              '**Remove leading spaces from string values** — TICK if there is any chance of stray spaces (there usually is).',
            ]},
          { title: 'Check the preview',
            body: 'The dialog shows a small preview of how the imported data will look. Glance at it. Are the column headers what you expect? Do the first few rows look right? If yes, proceed. If something looks wrong, click Cancel and go back to clean the Excel file further.' },
          { title: 'Click OK',
            body: 'SPSS reads the file and populates the Data Editor. You should now see your data in Data View, with column headers matching your Excel headers.' },
        ]},

        { type: 'illustration', component: 'MachakosImportDialog',
          caption: 'Figure 4. The Read Excel File dialog with the MachakosData_CLEAN.xlsx file selected. SPSS has auto-detected the worksheet range A1:I275 (274 respondents + header row). The critical checkbox — **"Read variable names from first row of data"** — is ticked (highlighted gold). The PREVIEW panel at the bottom shows the first 5 rows of Machakos data with proper column names. ALWAYS check the preview before clicking OK — if the data looks wrong here, it will look wrong in SPSS.' },

        { type: 'callout', tone: 'info', title: 'You can use the same dialog for CSV files',
          body: 'CSV (comma-separated values) files import the same way: **File → Import Data → CSV Data…** The dialog is almost identical to the Excel one. The main difference is you may need to specify the field delimiter (comma vs semicolon vs tab) and the text qualifier (usually a double quote).' },
      ],
    },

    /* ════════════════════ 4. VERIFYING THE IMPORT ════════════════════ */
    {
      id: 'verifying',
      title: 'Step three — verifying the import worked',
      blocks: [
        { type: 'heading', level: 2, text: 'A four-item checklist before any analysis' },

        { type: 'paragraph', text:
          'SPSS does not warn you if the import went subtly wrong. A column could have imported as string when you expected numeric, or the row count might be one short because of a stray blank row in Excel. Spend 2 minutes running through this checklist every time you import.' },

        { type: 'illustration', component: 'MachakosImportSuccess',
          caption: 'Figure 5. The Machakos dataset just after a successful import — with the 4-item verification checklist overlaid. ✅ Cases = 274, ✅ Variables = 9 (both matching what we typed in Excel). ⚠️ Two warnings flagged: (1) Form was auto-detected as Scale — but it should be Ordinal (SPSS guessed wrong because Form has only 3 values); (2) Categorical variables like Gender came in as text ("Male", "Female") — you may want to recode to numeric 1/2 for cleaner analyses. Once verified, File → Save As → save as `.sav` so you never have to re-import.' },

        { type: 'steps', steps: [
          { title: 'Check the row count',
            body: 'At the bottom-right of the SPSS window, look at the case count. Does it match what you expect? If you collected 127 responses but SPSS shows 128 cases, you probably imported an extra blank or subtotal row. If it shows 125, you may have lost rows to a stray blank in the middle of your data.' },
          { title: 'Switch to Variable View and check the Type column',
            body: 'For every column you expected to be numeric (age, score, income), confirm the Type column says **Numeric**. If any of them say **String**, the column had mixed text/numbers in Excel — go back, clean it, re-import.' },
          { title: 'Run quick frequencies to spot weirdness',
            body: 'Analyze → Descriptive Statistics → Frequencies on every nominal variable (gender, county). Look at the unique values. Did you expect 2 gender categories and SPSS shows 4? That is your inconsistent codes problem (Male / M / male / 1 all appearing). Fix in Excel, re-import.' },
          { title: 'Check for unexpected missing values',
            body: 'Run Analyze → Descriptive Statistics → Descriptives on key numeric variables and look at the N column. If a variable you expected to have 127 values shows only 110, you have 17 unexpected missing values somewhere. Investigate before analysing.' },
        ]},

        { type: 'callout', tone: 'warning', title: 'If you spot problems — fix the Excel file, not the SPSS one',
          body: 'When verification reveals a problem, the temptation is to fix it directly in SPSS. Resist. Fix the original Excel file, then re-import. This way your original data file always matches what is in SPSS, and you can always reproduce the import from scratch.' },

        { type: 'mistake',
          title: 'Treating the imported SPSS file as the master copy',
          body: 'You import from Excel, then you tweak things in SPSS, save the .sav, and never go back. Six months later you realise the .sav and the Excel file are out of sync — and your supervisor wants the original raw data.',
          fix: 'Always keep the Excel file as your MASTER. Treat the .sav as a derived file. If you need to add or fix data, do it in Excel and re-import. Document the import steps so re-running them is easy.' },
      ],
    },

    /* ════════════════════ 5. DEFINING VARIABLES AFTER IMPORT ════════════════════ */
    {
      id: 'after-import',
      title: 'Step four — defining variables after import',
      blocks: [
        { type: 'heading', level: 2, text: 'Your import gave you the data — now give it the rules' },

        { type: 'paragraph', text:
          'Importing from Excel gets your VALUES into SPSS. But it does NOT set up labels, value labels, missing codes, or measurement levels. Every imported variable will have an empty Label, no value labels, no missing codes declared, and default Measure (usually Scale for numeric, Nominal for string).' },

        { type: 'paragraph', text:
          'This is where the techniques from Lesson 3 come in. After every import, walk through Variable View and set up the metadata properly — or use the **Define Variable Properties** power tool to do many variables at once.' },

        { type: 'steps', steps: [
          { title: 'Open Define Variable Properties',
            body: 'Data → Define Variable Properties… Move ALL your imported variables to the right list. Click Continue. SPSS scans the values.' },
          { title: 'For each variable, set the Label',
            body: 'The Name (e.g. "gender") imported from your Excel header. Now add a human-readable Label ("Gender of respondent"). This appears in every output table.' },
          { title: 'Set value labels using the auto-scanned grid',
            body: 'For nominal/ordinal variables, the grid shows the values SPSS found in your data (e.g. 1, 2, 999 for gender). Type the meaning for each: 1=Male, 2=Female, 999=Refused.' },
          { title: 'Tick the Missing column for missing codes',
            body: 'For each row in the value grid that is a missing code (999, 998, 997), tick the Missing checkbox. SPSS will treat them as missing in all analyses.' },
          { title: 'Set the Measure for each variable',
            body: 'Scale for true numbers (age, income, score), Ordinal for ranked categories (Form 1-4, satisfaction low/med/high), Nominal for unordered categories (gender, county).' },
          { title: 'Click OK and save as .sav',
            body: 'Apply all changes. Then File → Save As → choose .sav format → give it a meaningful name (e.g. "thesis_data_2024_v1.sav"). This .sav file now has all your data PLUS all the metadata. Future analyses load it instantly without re-importing.' },
        ]},

        { type: 'callout', tone: 'success', title: 'The handoff from Excel to SPSS is now complete',
          body: 'You have a clean Excel file (master copy), a cleanly-imported .sav file (working copy), and properly-defined variables (analysis-ready). From here on, you work with the .sav file. The Excel file lives in your project folder as evidence of where the data came from.' },
      ],
    },

    /* ════════════════════ 6. OTHER SOURCES ════════════════════ */
    {
      id: 'other-sources',
      title: 'Importing from Google Forms, KoboToolbox, ODK, REDCap',
      blocks: [
        { type: 'heading', level: 2, text: 'Same workflow, different export step' },

        { type: 'paragraph', text:
          'Online data-collection tools have largely replaced paper forms in Kenyan postgraduate research. The good news: every popular tool can export to Excel or CSV, so the import workflow into SPSS is exactly what we just learned. The difference is in the export step.' },

        { type: 'comparison',
          headers: ['Tool', 'How to export', 'What to watch for'],
          rows: [
            ['**Google Forms**', 'Open the form → Responses tab → green Sheets icon → opens in Google Sheets → File → Download → Microsoft Excel (.xlsx).', 'Google Forms exports the question TEXT as column headers. Rename them to short codes (gender, age_yrs, sa_01) before importing.'],
            ['**KoboToolbox**', 'Project → Data → Downloads tab → XLS format → Download. The export includes raw and labelled versions.', 'Always download the **XLS** (not the labels-only export). Use the column names as your variable names. Headers are clean already.'],
            ['**ODK Collect**', 'Aggregate server → form → Export → CSV or XLSX.', 'Column names from your XLSForm questions. Usually clean and import-ready.'],
            ['**REDCap**', 'Data Exports → "Export Data" → choose "Microsoft Excel (CSV)" → Export.', 'REDCap also offers a direct SPSS export (.sps file) — use it for the most complete metadata transfer.'],
            ['**SurveyMonkey**', 'Analyze Results → Save As → Export → XLS/CSV.', 'Often exports with verbose column headers. Rename in Excel before importing to SPSS.'],
            ['**Qualtrics**', 'Data & Analysis → Export & Import → Export Data → CSV / SPSS.', 'Qualtrics direct-to-SPSS (.sav) export is excellent and preserves variable labels — prefer it over Excel.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'When the tool offers direct-to-SPSS export — use it',
          body: 'KoboToolbox, REDCap, and Qualtrics can all export directly to .sav format. When available, this is far better than going through Excel — the export preserves variable labels, value labels, and missing codes that you defined in the data collection tool. Always check if direct export exists before defaulting to Excel.' },

        { type: 'why', body:
          'KoboToolbox is especially popular for Kenyan field research because it works offline on tablets. Field teams collect data in remote villages, sync when they get to a town with internet, and the data appears in the project. The export-to-XLSX path you just learned applies directly.' },
      ],
    },

    /* ════════════════════ 7. SAVING & VERSIONING ════════════════════ */
    {
      id: 'saving',
      title: 'Saving, backing up, and versioning',
      blocks: [
        { type: 'heading', level: 2, text: 'Three habits that save theses' },

        { type: 'paragraph', text:
          'Once you have a clean, well-defined .sav file, the next priority is making sure you never lose it. Three habits cover almost every disaster.' },

        { type: 'steps', steps: [
          { title: 'Save with version numbers',
            body: 'Never use a single file called "data.sav". Use names like "thesis_data_v1.sav", "thesis_data_v2_after_cleaning.sav", "thesis_data_v3_with_recoded_items.sav". Each major change becomes a new version. If you mess up v3, v2 is still there to roll back to.' },
          { title: 'Back up to the cloud daily',
            body: 'Store your project folder in Google Drive, OneDrive, or Dropbox — they sync automatically and keep version history. A laptop crash, a stolen bag, a corrupted hard drive — any of these can end your thesis. Cloud backup is the cheapest insurance you will ever buy.' },
          { title: 'Keep a README in your project folder',
            body: 'A simple README.txt file in your project folder, listing every file and what it is: "thesis_data_v3.sav is the current working file. Imported from thesis_data.xlsx (master). Cleaning steps documented in cleaning_syntax.sps." When you return in six months, the README tells you instantly where you were.' },
        ]},

        { type: 'callout', tone: 'warning', title: 'The two-day rule for backups',
          body: 'If you cannot afford to lose two days of work, you must back up at least every two days. For most postgraduate students this means: at the end of every work session, save and let Dropbox/Drive sync. The 30 seconds you spend protecting your work has saved more theses than any other single habit.' },
      ],
    },

    /* ════════════════════ 8. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common import mistakes',
      blocks: [
        { type: 'heading', level: 2, text: 'Four mistakes that derail imports' },

        { type: 'mistake',
          title: 'Mistake 1 — Importing without cleaning Excel first',
          body: 'You click File → Import → Excel on a messy file with title rows, merged cells, and "N/A" entries. SPSS imports a mess. You try to clean it inside SPSS — which is much harder than cleaning in Excel.',
          fix: 'Always clean Excel FIRST. The seven fixes in Section 2 take 10-15 minutes and save hours of post-import cleanup.' },

        { type: 'mistake',
          title: 'Mistake 2 — Not ticking "Read variable names from the first row"',
          body: 'You forget the checkbox. SPSS imports your column headers as the first row of data, creating variables called "V1", "V2", "V3" with the headers showing as actual values.',
          fix: 'In the Import dialog, ALWAYS confirm that "Read variable names from the first row of data" is ticked before clicking OK. Look at the preview to verify your column headers became variable names.' },

        { type: 'mistake',
          title: 'Mistake 3 — Forgetting to set up Variable View after import',
          body: 'Import works. You jump straight to running analyses. Output tables show cryptic variable names, codes appear as numbers instead of labels, missing values are counted as real values.',
          fix: 'After EVERY import, run **Data → Define Variable Properties** and set up Labels, Value Labels, Missing codes, and Measure for every variable. This is non-negotiable.' },

        { type: 'mistake',
          title: 'Mistake 4 — Not saving as .sav after defining variables',
          body: 'You define all your variables properly. You start analysing. SPSS crashes. You reopen the file — and all your variable definitions are gone because you never saved the .sav.',
          fix: 'After Define Variable Properties, immediately **File → Save As → .sav format**. Ctrl+S religiously after that. The .sav file is your working copy and it must be saved.' },
      ],
    },

    /* ════════════════════ 9. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'heading', level: 2, text: 'What you should now be able to do' },

        { type: 'summary', items: [
          'Spot the seven Excel sins (title rows, multiple sheets, merged cells, mixed types, inconsistent codes, blank cells, subtotal rows) and fix each one in Excel before importing.',
          'Use File → Import Data → Excel correctly, ticking "Read variable names from the first row" and "Determine data type from data".',
          'Check the import preview before clicking OK.',
          'Run the four-item post-import verification checklist (row count, Type column, frequencies, missing values).',
          'After import, use Data → Define Variable Properties to set Labels, Value Labels, Missing codes, and Measure for all variables in bulk.',
          'Save the cleaned, defined dataset as a .sav file with a meaningful version-numbered name.',
          'Export data from Google Forms, KoboToolbox, ODK, REDCap, SurveyMonkey, or Qualtrics into Excel/CSV, then import using the same workflow — or use direct-to-SPSS export when available.',
          'Keep the original Excel file as your master copy and the .sav as a derived working copy.',
          'Back up to the cloud daily and keep a README documenting your file versions.',
          'Avoid the four common import mistakes: skipping Excel cleanup, missing the header checkbox, forgetting Variable View setup, forgetting to save as .sav.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 5: Handling missing values** — the final lesson of SPSS Basics — we tackle the most-misunderstood topic in data preparation. We will cover the three TYPES of missing data (MCAR, MAR, MNAR), how to detect missingness patterns, the trade-offs of different handling strategies (listwise, pairwise, imputation), and the exact missing-data section you should write in your thesis methodology chapter.' },

        { type: 'paragraph', text:
          'Before moving on, find a real Excel file you have collected (or download a practice file). Apply the seven fixes from Section 2. Run the import. Run the four-item verification. Run Define Variable Properties. Save as .sav. This complete workflow, practised once on real data, makes every future import effortless. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 10. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'heading', level: 2, text: 'Six quick questions' },

        { type: 'check',
          question: 'Before importing your Excel file into SPSS, you should:',
          choices: [
            'Just click File → Import and let SPSS handle everything',
            'Clean the Excel file first — delete title rows, unmerge cells, use consistent codes, replace blanks with 999',
            'Convert the file to PDF',
            'Email the file to yourself',
          ],
          answer: 1,
          explanation: 'Cleaning Excel BEFORE importing is the single most important habit for smooth SPSS imports. The seven fixes (no title rows, no merged cells, consistent codes, 999 for missing, no subtotals, single sheet) take 10-15 minutes and save hours of post-import cleanup.' },

        { type: 'check',
          question: 'Your "age" column in Excel has mostly numbers but a few cells say "twenty-five" and "N/A". When you import to SPSS, what will happen?',
          choices: [
            'SPSS will convert the text to numbers automatically',
            'SPSS will import the whole column as STRING type — you will not be able to compute means or run numeric analyses on age',
            'SPSS will skip the rows with text values',
            'The import will fail completely',
          ],
          answer: 1,
          explanation: 'Mixed content (numbers + text) in a column forces SPSS to import the whole column as STRING. You cannot compute a mean, run a correlation, or use age in any numeric analysis until you fix it. The fix BEFORE importing: replace text with numeric codes (999 for missing, etc.) so the column is purely numeric.' },

        { type: 'check',
          question: 'In the SPSS Read Excel File dialog, which two checkboxes should you ALWAYS tick for a thesis dataset?',
          choices: [
            '"Remove leading spaces" and "Ignore hidden columns"',
            '"Read variable names from the first row of data" and "Determine data type from data"',
            'Neither — leave the defaults',
            'Only "Read variable names from the first row of data"',
          ],
          answer: 1,
          explanation: 'These two checkboxes are non-negotiable. Without "Read variable names from the first row of data", your column headers become row 1 of your data. Without "Determine data type from data", every column might import as String. Tick both, every time.' },

        { type: 'check',
          question: 'You collected 127 responses in Google Forms but after import SPSS shows 128 cases. What is the most likely explanation?',
          choices: [
            'SPSS added a phantom case',
            'Your Excel file had a stray blank or summary row at the bottom that imported as case 128',
            'Google Forms duplicated a response',
            'Your import failed — start over',
          ],
          answer: 1,
          explanation: 'The most common cause of "one extra case" is a leftover row at the bottom of the Excel file — a blank, a subtotal, or a note. Find and delete it in Excel, then re-import. This is exactly the kind of problem the four-item post-import verification catches.' },

        { type: 'check',
          question: 'After successfully importing your Excel file, what should you do BEFORE running any analyses?',
          choices: [
            'Run the analyses immediately',
            'Use Data → Define Variable Properties to set Labels, Value Labels, Missing codes, and Measure for every variable',
            'Print the dataset',
            'Email the file to your supervisor',
          ],
          answer: 1,
          explanation: 'Importing gives you the VALUES, not the metadata. Without proper Labels, Value Labels, Missing codes, and Measure settings, your output tables will be confusing and your analyses may be wrong. Always set up Variable View (or use Define Variable Properties) immediately after import.' },

        { type: 'check',
          question: 'What is the relationship between your original Excel file and the .sav file you created?',
          choices: [
            'They are the same file in different formats',
            'The Excel file is the MASTER (raw data). The .sav is the DERIVED working copy. Always edit the master and re-import.',
            'You can delete the Excel file after importing',
            'They have nothing to do with each other',
          ],
          answer: 1,
          explanation: 'Always keep your original Excel file as the MASTER. The .sav is a derived working copy with your variable definitions added. If you need to fix or add data, do it in Excel and re-import. This way the data trail is clear and you can always reproduce the import from scratch.' },
      ],
    },
  ],
};
