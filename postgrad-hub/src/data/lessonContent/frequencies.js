/**
 * Descriptive Statistics · Lesson 1 — Frequencies & percentages
 * The foundation of every Chapter 4. Detailed for anxious true beginners.
 */

export const FREQUENCIES_LESSON = {
  id: 'desc-1',
  title: 'Frequencies & percentages',
  subtitle: 'Module 03 · Course: Descriptive Statistics · Lesson 1 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'The first table in every Chapter 4',
      blocks: [
        { type: 'scene', body: [
          'Your supervisor sits down with your draft Chapter 4 and turns to the first page of your Results section. She is looking for one specific thing — and almost every supervisor in every Kenyan university is looking for the same thing first.',
          'She wants to see a **frequency table**. Something like: *"Of the 200 respondents in this study, 120 (60%) were female and 80 (40%) were male. The majority (n = 88, 44%) were in the 25–34 age bracket, followed by..."* If your Chapter 4 does not open with frequency tables describing your sample, your supervisor will hand it back. Examiners do the same.',
          'Frequencies are not glamorous. They are not sophisticated. But they are the single most-requested output in postgraduate research. Every demographic variable, every categorical question, every Likert item — frequencies are how you describe them. This lesson teaches you to produce them properly, present them in publishable format, and write them up so examiners nod and move on.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Explain what a frequency table is** and when to use one (categorical and ordinal variables — not continuous).',
            '**Produce a frequency table in SPSS** in 30 seconds via Analyze → Descriptive Statistics → Frequencies.',
            '**Read every column** in the SPSS Frequencies output — Frequency, Percent, Valid Percent, Cumulative Percent.',
            '**Distinguish Percent from Valid Percent** and know which one to report (almost always Valid Percent).',
            '**Add bar charts** to the same dialog so you get visualisation alongside the table.',
            '**Run frequencies on multiple variables at once** for an efficient Chapter 4 workflow.',
            '**Write up frequency results** using the APA template that every examiner expects.',
            '**Avoid the four common mistakes** that make frequency tables look amateurish.',
          ]},

        { type: 'why', body:
          'Frequencies are the foundation. Every other descriptive statistic (mean, SD, correlation) describes how the data is distributed once you already know who is in your sample. Frequencies tell you who is in your sample in the first place. Get them right and your Chapter 4 has a strong opening. Get them wrong and the whole chapter feels shaky.' },
      ],
    },

    /* ════════════════════ 2. WHAT IS A FREQUENCY ════════════════════ */
    {
      id: 'what-is-frequency',
      title: 'What is a frequency, exactly?',
      blocks: [
        { type: 'heading', level: 2, text: 'Counting things — slowly, with intention' },

        { type: 'paragraph', text:
          'A **frequency** is just a count. How many pupils answered "yes"? How many respondents are from Nairobi? How many staff selected "Strongly Agree"? Each of those counts is a frequency. When you arrange the frequencies of every category of a variable into a table, you get a **frequency table** — also called a frequency distribution.' },

        { type: 'analogy', title: 'The class register at registration',
          body: 'Imagine a teacher calling the class register on the first day of term. As each pupil shouts "Present!", the teacher makes a tally mark. By the end she has: Boys = 18 tallies, Girls = 22 tallies. That is a frequency distribution for the variable "gender". She could go further: Form 1 = 12, Form 2 = 14, Form 3 = 9, Form 4 = 5 — that is a frequency distribution for "form". Frequencies are exactly that, with SPSS doing the tallying for you.' },

        { type: 'definition', term: 'Frequency table',
          body: 'A table that shows, for each category of a variable, how many cases fall into that category and what percentage of the sample that represents.' },

        { type: 'heading', level: 3, text: 'Frequencies are for categorical and ordinal variables — not continuous' },

        { type: 'paragraph', text:
          'Frequencies work best when your variable has a manageable number of distinct categories. Gender (2 categories), county (47 categories), satisfaction level (5 categories) — these all produce useful frequency tables.' },

        { type: 'paragraph', text:
          'For continuous variables like age in years, monthly income, or exam score, a frequency table can be unwieldy — imagine a table with 60 rows for every possible age from 18 to 78. For these variables you usually want descriptive statistics (mean, SD, median) instead — covered in the next two lessons. You CAN make a frequency table from continuous data by grouping into ranges (18-24, 25-34, 35-44…), and we will cover that technique below.' },

        { type: 'comparison',
          headers: ['Variable', 'Number of categories', 'Frequencies useful?'],
          rows: [
            ['Gender',                       '2 (Male / Female)',                    '✓ Yes — perfect use case.'],
            ['Age bracket (18-24, 25-34, …)', '5 brackets',                          '✓ Yes — bracketed continuous variables work well.'],
            ['County',                       '47 in Kenya',                          '✓ Yes — though the table is long; consider sorting by frequency.'],
            ['Likert item (1–5)',           '5 levels',                             '✓ Yes — frequencies are standard for Likert items.'],
            ['Age in years (continuous)',    '60+ unique values',                    '✗ No — produces a giant unhelpful table. Use Descriptives or bracket first.'],
            ['Monthly income (KSh)',         '200+ unique values',                   '✗ No — same problem.'],
          ]},

        { type: 'reveal',
          prompt: 'You have a variable "marital status" with categories Single, Married, Divorced, Widowed. Should you use frequencies to describe this in Chapter 4?',
          answer: '**Yes — perfectly.** Marital status is categorical with 4 distinct categories. A frequency table will show how many respondents fell into each category, plus the percentage. This is exactly what frequencies were designed for. The output will give you everything you need to write: *"Of the 198 respondents, 124 (62.6%) were married, 51 (25.8%) were single, 16 (8.1%) were divorced, and 7 (3.5%) were widowed."*' },
      ],
    },

    /* ════════════════════ 3. THE MACHAKOS CASE STUDY ════════════════════ */
    {
      id: 'case-machakos',
      title: 'The Machakos Study — meet the sample we\'ll describe together',
      blocks: [
        { type: 'callout', tone: 'brand', title: 'Running case study — used across the SPSS Academy',
          body: [
            'From this lesson onwards, most examples come from ONE fictional but realistic Kenyan study. This is deliberate — you build familiarity with a single dataset instead of learning new variables in every lesson.',
            '**📚 Study title:** *Influence of Digital Learning Resources on Students\' Mathematics Performance in Public Secondary Schools in Machakos County, Kenya*',
            '**👥 Sample:** 274 respondents from 8 public secondary schools — 8 principals, 54 teachers, and 212 students (Form 2, 3, and 4).',
            '**🎯 The four research objectives look at:** (1) availability of digital devices, (2) teacher digital competency, (3) internet connectivity reliability, and (4) school digital-infrastructure investment — each as a possible influence on the school\'s Mathematics KCSE mean grade.',
          ]},

        { type: 'heading', level: 2, text: 'What the dataset looks like in SPSS Data View' },

        { type: 'paragraph', text:
          'Here are the first 10 rows of the dataset — this is what you would see the moment you open the .sav file in SPSS. Notice how some cells are blank: `Form` is only meaningful for students, and `HighestQual` is only meaningful for staff. SPSS treats those as **system-missing** — perfectly normal.' },

        { type: 'comparison',
          headers: ['RespID', 'SchoolID', 'Category', 'Gender', 'Age', 'Form', 'HighestQual', 'Math_KCSE'],
          rows: [
            ['P01',  'SCH01', 'Principal', 'Male',   '—',  '—', 'M.Ed',    '6.4'],
            ['P02',  'SCH02', 'Principal', 'Female', '—',  '—', 'B.Ed',    '5.1'],
            ['T01',  'SCH01', 'Teacher',   'Male',   '42', '—', 'M.Ed',    '6.4'],
            ['T02',  'SCH01', 'Teacher',   'Female', '31', '—', 'B.Ed',    '6.4'],
            ['T03',  'SCH02', 'Teacher',   'Male',   '38', '—', 'Diploma', '5.1'],
            ['S001', 'SCH01', 'Student',   'Female', '17', '3', '—',       '6.4'],
            ['S002', 'SCH01', 'Student',   'Male',   '18', '4', '—',       '6.4'],
            ['S003', 'SCH02', 'Student',   'Female', '16', '2', '—',       '5.1'],
            ['S004', 'SCH03', 'Student',   'Male',   '17', '3', '—',       '7.2'],
            ['S005', 'SCH04', 'Student',   'Male',   '16', '2', '—',       '5.8'],
          ],
        },

        { type: 'paragraph', text:
          'The full dataset has **274 rows** (one per respondent) and **30+ columns** — the demographics you see above, plus 15 Likert items (5 each for devices, teacher competency, internet), the KES investment per student, and the composite scores we\'ll compute later. In this lesson we\'ll use only the demographic variables.' },

        { type: 'callout', tone: 'gold', title: 'What we\'ll describe with frequencies in this lesson',
          body: [
            '**`Gender`** — Male / Female — the classic demographic frequency',
            '**`Category`** — Principal / Teacher / Student — the respondent group',
            '**`Form`** — 2 / 3 / 4 — only meaningful for students (watch how Missing plays out)',
            '**`HighestQual`** — Diploma / B.Ed / PGDE / M.Ed — only meaningful for staff',
          ]},
      ],
    },

    /* ════════════════════ 3.5 RUNNING FREQUENCIES IN SPSS ════════════════════ */
    {
      id: 'running',
      title: 'Running Frequencies in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'The 30-second click path' },

        { type: 'paragraph', text:
          'Once your data is properly defined in Variable View (Lesson 2 of SPSS Basics), running frequencies is one of the fastest things you can do in SPSS. Follow these steps.' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'From the main menu click **Analyze → Descriptive Statistics → Frequencies…**. A small dialog opens showing your variables on the left.' },
          { title: 'Move variables into the Variable(s) box',
            body: [
              'Click each variable you want frequencies for, then click the blue arrow to move it across. You can move several at once — hold Ctrl while clicking to select multiple variables.',
              'There is no limit. You can move 15 variables at once and SPSS will produce 15 frequency tables in one go. This is the secret to a fast Chapter 4 workflow.',
            ]},
          { title: 'Make sure "Display frequency tables" is ticked',
            body: 'This checkbox is at the bottom-left of the dialog. It is ticked by default — but if you previously unticked it, the analysis runs without producing the tables. Always confirm it is ticked.' },
          { title: 'Click Charts… for visualisation',
            body: [
              'Click the **Charts…** button. A small Charts dialog opens. Pick **Bar charts** for categorical variables (gender, county) or **Histograms** for grouped continuous variables.',
              'For "Chart Values" choose **Percentages** rather than Frequencies — percentages let readers compare across studies with different sample sizes. Click Continue.',
            ]},
          { title: 'Click Statistics… if you want extras',
            body: 'Click the **Statistics…** button if you want the mean, median, percentiles, etc. alongside the frequencies. For pure categorical variables this is overkill. For ordinal variables (Likert items) the median can be useful. Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces the frequency tables (and any charts) in the Output Viewer. Each variable gets its own table.' },
        ]},

        { type: 'callout', tone: 'info', title: 'Tip — run all categorical variables together',
          body: 'For Chapter 4 it is far faster to move ALL your categorical demographic variables (gender, age bracket, county, education, marital status, employment) into the Variables box at once and produce all the frequency tables in a single run. You get a consistent set of outputs that you can copy straight into your thesis.' },
      ],
    },

    /* ════════════════════ 3.7 THE MACHAKOS PROCEDURE (WALK-THROUGH) ════════════════════ */
    {
      id: 'machakos-walkthrough',
      title: 'The Machakos procedure — every click, every output',
      blocks: [
        { type: 'heading', level: 2, text: 'Step-by-step with the case-study data' },

        { type: 'paragraph', text:
          'Now let\'s run frequencies on ALL four demographic variables in the Machakos dataset — `Gender`, `Category`, `Form`, and `HighestQual` — in ONE go. This is the workflow every real Kenyan Master\'s student uses: one procedure → four tables → four Chapter-4 paragraphs.' },

        { type: 'steps', steps: [
          { title: 'Open the Frequencies dialog',
            body: 'Menu path: **Analyze → Descriptive Statistics → Frequencies…** — the dialog opens with all your variables listed on the left.' },
          { title: 'Move the four demographic variables into the box',
            body: [
              'Click `Category`, then Ctrl-click `Gender`, `Form`, and `HighestQual` to select all four. Click the blue **▶** arrow to move them into the **Variable(s)** box on the right.',
              'The Variable(s) box should now show all 4 variables stacked vertically.',
            ]},
          { title: 'Add bar charts',
            body: 'Click **Charts…** → tick **Bar charts** → under Chart Values pick **Percentages** → click **Continue**.' },
          { title: 'Click OK',
            body: 'The Output Viewer opens with 4 separate frequency tables and 4 bar charts — one set per variable.' },
        ]},

        { type: 'heading', level: 3, text: 'Output Table 1 — Category (respondent group)' },

        { type: 'comparison',
          headers: ['', 'Frequency', 'Percent', 'Valid Percent', 'Cumulative Percent'],
          rows: [
            ['Principal', '8',   '2.9',   '2.9',   '2.9'],
            ['Teacher',   '54',  '19.7',  '19.7',  '22.6'],
            ['Student',   '212', '77.4',  '77.4',  '100.0'],
            ['**Total**', '**274**', '**100.0**', '**100.0**', ''],
          ],
        },

        { type: 'paragraph', text:
          'Straightforward — 274 respondents split into 8 principals (2.9%), 54 teachers (19.7%), and 212 students (77.4%). No missing values (`Percent` = `Valid Percent`) because every respondent has a Category.' },

        { type: 'heading', level: 3, text: 'Output Table 2 — Gender' },

        { type: 'comparison',
          headers: ['', 'Frequency', 'Percent', 'Valid Percent', 'Cumulative Percent'],
          rows: [
            ['Male',      '128', '46.7',  '46.7',  '46.7'],
            ['Female',    '146', '53.3',  '53.3',  '100.0'],
            ['**Total**', '**274**', '**100.0**', '**100.0**', ''],
          ],
        },

        { type: 'paragraph', text:
          'Also complete — 128 males (46.7%) and 146 females (53.3%). Fairly balanced. Again, no missing values.' },

        { type: 'heading', level: 3, text: 'Output Table 3 — Form (⚠️ watch the Missing!)' },

        { type: 'comparison',
          headers: ['', 'Frequency', 'Percent', 'Valid Percent', 'Cumulative Percent'],
          rows: [
            ['Missing (System)', '62', '22.6', '—', '—'],
            ['Form 2',   '71',  '25.9',  '33.5',  '33.5'],
            ['Form 3',   '74',  '27.0',  '34.9',  '68.4'],
            ['Form 4',   '67',  '24.5',  '31.6',  '100.0'],
            ['**Total**', '**274**', '**100.0**', '**100.0**', ''],
          ],
        },

        { type: 'callout', tone: 'gold', title: 'This is where Valid Percent matters',
          body: [
            '62 respondents (the 8 principals + 54 teachers) have **no Form value** — they\'re not students. SPSS labels these "Missing (System)".',
            '**If you report `Percent`** — Form 2 = 25.9% of ALL 274 respondents. Confusing, because non-students shouldn\'t be counted.',
            '**If you report `Valid Percent`** — Form 2 = 33.5% of the 212 students who DO have a Form. This is the "true" distribution of students across forms — the number your examiner wants.',
            'Rule of thumb: **Valid Percent** is almost always the right column to put in your Chapter 4.',
          ]},

        { type: 'heading', level: 3, text: 'Output Table 4 — HighestQualification' },

        { type: 'comparison',
          headers: ['', 'Frequency', 'Percent', 'Valid Percent', 'Cumulative Percent'],
          rows: [
            ['Missing (System)', '212', '77.4', '—', '—'],
            ['Diploma', '12', '4.4',  '19.4',  '19.4'],
            ['B.Ed',    '34', '12.4', '54.8',  '74.2'],
            ['PGDE',    '8',  '2.9',  '12.9',  '87.1'],
            ['M.Ed',    '8',  '2.9',  '12.9',  '100.0'],
            ['**Total**', '**274**', '**100.0**', '**100.0**', ''],
          ],
        },

        { type: 'paragraph', text:
          'Same pattern in reverse: only the 62 staff members (principals + teachers) have a qualification, so 212 students show as Missing. Among the 62 staff, most (54.8%) hold a B.Ed. **Valid Percent** is the column to report in Chapter 4.' },

        { type: 'heading', level: 3, text: 'Which column goes in your Chapter 4?' },

        { type: 'comparison',
          headers: ['SPSS Column', 'When to use in your thesis'],
          rows: [
            ['**Frequency**',           'ALWAYS report — the raw count.'],
            ['**Percent**',             'Use only when there are ZERO missing values (e.g. Gender, Category above).'],
            ['**Valid Percent**',       'Use whenever there ARE missing values (e.g. Form, HighestQual above). This is the "true" % of respondents who answered.'],
            ['**Cumulative Percent**',  'Skip in tables. Only mention in text when order matters (e.g. "68.4% of students were in Form 3 or below").'],
          ],
        },

        { type: 'callout', tone: 'info', title: 'Practical rule for Chapter 4 tables',
          body: 'Always show **Frequency + Percent (or Valid Percent)** as your two data columns. Skip Cumulative Percent unless the variable is ordinal AND cumulative meaning matters. Keep it clean — examiners appreciate readability.' },
      ],
    },

    /* ════════════════════ 4. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the Frequencies output table',
      blocks: [
        { type: 'heading', level: 2, text: 'Every column explained' },

        { type: 'paragraph', text:
          'A standard SPSS Frequencies table has four columns: **Frequency, Percent, Valid Percent, Cumulative Percent**. Most beginners glance at the first two and miss the importance of the third. Let us walk through each one.' },

        { type: 'illustration', component: 'FrequenciesOutput',
          caption: 'Figure 1. A standard SPSS Frequencies output table for the variable "form" with 120 respondents (118 valid + 2 missing). Each row shows one form level; each column shows a different way of counting it.' },

        { type: 'comparison',
          headers: ['Column', 'What it shows', 'Example interpretation'],
          rows: [
            ['**Frequency**', 'The raw count — how many cases fell into this category.', '35 respondents were in Form 1.'],
            ['**Percent**', 'The count as a percentage of the **TOTAL sample** (including missing).', '35 / 120 = 29.2% of all 120 cases were in Form 1.'],
            ['**Valid Percent**', 'The count as a percentage of the **non-missing sample only**.', '35 / 118 = 29.7% of the 118 valid (non-missing) cases were in Form 1.'],
            ['**Cumulative Percent**', 'The running total of Valid Percent as you read down the table.', 'By Form 2, 55.1% of valid cases have been counted (Form 1 + Form 2).'],
          ]},

        { type: 'heading', level: 3, text: 'Percent vs Valid Percent — which one do you report?' },

        { type: 'paragraph', text:
          '**Almost always report Valid Percent, not Percent.** Here is why. Percent includes the missing cases in its denominator — so it artificially shrinks the percentages of the real categories. Valid Percent excludes the missing cases, giving you the percentage among people who actually answered the question. The latter is what readers want.' },

        { type: 'callout', tone: 'gold', title: 'The rule',
          body: 'When you write *"Of the 118 respondents who answered this question, 30% were in Form 1"*, you are using **Valid Percent**. Use Valid Percent in your thesis write-ups by default. Only use Percent if you specifically want to highlight that some cases were missing.' },

        { type: 'heading', level: 3, text: 'Cumulative Percent — when it is useful' },

        { type: 'paragraph', text:
          'Cumulative Percent only makes sense for **ordinal** variables — variables with a meaningful order. For Form (Form 1 → Form 2 → Form 3 → Form 4), it is useful to say "by Form 3, 78% of pupils have been counted". For gender or county (no natural order), cumulative percent is meaningless and can be ignored.' },

        { type: 'reveal',
          prompt: 'In Figure 1, you see that Form 2 has Frequency = 30, Percent = 25.0%, Valid Percent = 25.4%. Why is Valid Percent slightly higher than Percent?',
          answer: 'Because Percent uses 120 (total cases) as the denominator while Valid Percent uses 118 (non-missing cases). 30 / 120 = 25.0% but 30 / 118 = 25.4%. The 2 missing cases are excluded from Valid Percent\'s denominator, which makes every Valid Percent slightly higher than its corresponding Percent. The smaller your sample, the bigger this difference becomes. Always report Valid Percent.' },
      ],
    },

    /* ════════════════════ 5. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing frequencies up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard sentence patterns' },

        { type: 'paragraph', text:
          'There are two acceptable ways to present frequencies in Chapter 4 — **in prose** (a paragraph) or **in a table**. Most theses use both: a table for the full breakdown, plus a short prose paragraph highlighting key findings. Below are the templates.' },

        { type: 'heading', level: 3, text: 'Template 1 — prose for a single variable' },

        { type: 'apa', text:
          'Of the [N] valid respondents, [X] ([XX.X%]) were [category 1], [Y] ([YY.Y%]) were [category 2], and [Z] ([ZZ.Z%]) were [category 3].' },

        { type: 'heading', level: 3, text: 'A worked example for gender' },

        { type: 'apa', text:
          'Of the 198 valid respondents, 122 (61.6%) were female and 76 (38.4%) were male. The female-male ratio reflects the workforce composition of the participating institutions, which is consistent with prior workforce surveys in the sector.' },

        { type: 'heading', level: 3, text: 'Template 2 — prose for multiple categories' },

        { type: 'apa', text:
          'The majority of respondents ([N], [XX%]) were [largest category], followed by [N] ([XX%]) in the [next-largest category]. [Then describe smaller categories in descending order.] These proportions broadly mirror [some external reference if available, e.g. the sector composition reported by KNBS].' },

        { type: 'heading', level: 3, text: 'A worked example for marital status' },

        { type: 'apa', text:
          'The majority of respondents were married (n = 124, 62.6%), followed by single (n = 51, 25.8%), divorced (n = 16, 8.1%), and widowed (n = 7, 3.5%). The high proportion of married respondents is consistent with the working-age sampling frame, where the median age was 38 years.' },

        { type: 'heading', level: 2, text: 'Presenting a full frequency table in Chapter 4' },

        { type: 'paragraph', text:
          'For longer variables (Likert items, county) or when you have several variables to present together, a table is cleaner than prose. The standard format used in Kenyan postgraduate theses is shown below.' },

        { type: 'comparison',
          headers: ['Demographic variable', 'Category', 'Frequency (n)', 'Valid Percent (%)'],
          rows: [
            ['**Gender** (n = 198)',  'Female', '122', '61.6'],
            ['',                       'Male',   '76',  '38.4'],
            ['**Age bracket** (n = 196)', '18–24', '24', '12.2'],
            ['',                          '25–34', '78', '39.8'],
            ['',                          '35–44', '52', '26.5'],
            ['',                          '45–54', '30', '15.3'],
            ['',                          '55+',   '12', '6.1'],
            ['**Education** (n = 197)', 'Diploma',     '34', '17.3'],
            ['',                        'Bachelor\'s', '108', '54.8'],
            ['',                        'Master\'s',   '46',  '23.4'],
            ['',                        'PhD',         '9',   '4.6'],
          ]},

        { type: 'callout', tone: 'success', title: 'Four habits of a publishable frequency table',
          body: [
            '**Always state the N at the top** of each variable (n = 198 for gender, n = 196 for age). Different variables may have different Ns because of missing data.',
            '**Always use Valid Percent**, not Percent. Round to one decimal place.',
            '**Use Sentence case** for category labels (Female, not FEMALE).',
            '**Number the table** ("Table 4.1 — Demographic profile of respondents") so your text can refer to it.',
          ]},
      ],
    },

    /* ════════════════════ 6. CHARTS ALONGSIDE FREQUENCIES ════════════════════ */
    {
      id: 'charts',
      title: 'Adding charts to the same dialog',
      blocks: [
        { type: 'heading', level: 2, text: 'Visualising the same data' },

        { type: 'paragraph', text:
          'A frequency table is precise but dense. A bar chart is intuitive but loses the exact counts. The best thesis presentations include **both** — and the SPSS Frequencies dialog can produce them in the same run.' },

        { type: 'steps', steps: [
          { title: 'In the Frequencies dialog, click Charts…',
            body: 'A small dialog opens with three radio buttons: None (the default), Bar charts, Pie charts, and Histograms.' },
          { title: 'Choose Bar charts',
            body: 'Bar charts are the most readable for categorical and ordinal variables. Pie charts are acceptable when you have 5 or fewer categories, but bar charts are almost always clearer.' },
          { title: 'For Chart Values, choose Percentages',
            body: 'Percentages are easier to compare across studies than raw counts. Click Continue, then OK.' },
        ]},

        { type: 'illustration', component: 'BarVsPie',
          caption: 'Figure 2. The same data shown as a bar chart (left) and a pie chart (right). Bar charts make it easier to see exact magnitudes and compare categories. Pie charts are familiar but harder to read accurately, especially when categories are similar in size. Default to bar charts in your thesis.' },

        { type: 'callout', tone: 'info', title: 'When pie charts are acceptable',
          body: 'Pie charts work when (a) you have 5 or fewer categories AND (b) the differences between them are large enough to see at a glance. They lose precision quickly when slices are similar in size. For most thesis work, bar charts are safer.' },

        { type: 'mistake',
          title: 'Including a 12-slice pie chart for county',
          body: 'You have 12 counties in your sample and you put them all in a pie chart. The result is a visual mess — adjacent slices of similar size are indistinguishable, the legend takes up half the chart, and the reader cannot extract any specific number.',
          fix: 'For variables with more than 5 categories, use a horizontal bar chart sorted from largest to smallest frequency. Readable, precise, professional.' },
      ],
    },

    /* ════════════════════ 7. GROUPED CONTINUOUS VARIABLES ════════════════════ */
    {
      id: 'grouping',
      title: 'Making frequency tables from continuous variables',
      blocks: [
        { type: 'heading', level: 2, text: 'When you need brackets, not raw values' },

        { type: 'paragraph', text:
          'Running Frequencies on a continuous variable like age (range 18–78) produces a 60-row table with one or two cases per row — useless for Chapter 4. The solution is to **bracket** the continuous variable first into meaningful groups (18–24, 25–34, 35–44, 45–54, 55+) and then run frequencies on the bracketed version.' },

        { type: 'steps', steps: [
          { title: 'Open the recoding dialog',
            body: 'Transform → Recode into Different Variables…' },
          { title: 'Move age into the Input Variable list',
            body: 'Click age_yrs in the left panel, then the arrow to move it to the Input Variable → Output Variable box.' },
          { title: 'Name the new bracketed variable',
            body: 'Under "Output Variable", in the Name field type **age_bracket**. In the Label field type **"Age bracket"**. Click **Change**.' },
          { title: 'Click "Old and New Values…"',
            body: 'A second dialog opens. This is where you define each bracket.' },
          { title: 'Define each bracket',
            body: [
              'Click "Range" → type 18 to 24 → in the "Value" box on the right type 1 → click Add. The bracket "18 thru 24 → 1" appears in the list.',
              'Repeat: Range 25 to 34 → 2 → Add. Range 35 to 44 → 3 → Add. Range 45 to 54 → 4 → Add. Range 55 to Highest → 5 → Add.',
              'Click Continue, then OK.',
            ]},
          { title: 'Add value labels in Variable View',
            body: 'Switch to Variable View → click the Values cell of age_bracket → add labels 1=18-24, 2=25-34, 3=35-44, 4=45-54, 5=55+. Now the bracket is ready for Frequencies.' },
          { title: 'Run Frequencies on age_bracket',
            body: 'Analyze → Descriptive Statistics → Frequencies → age_bracket → OK. You get a 5-row frequency table you can put straight into Chapter 4.' },
        ]},

        { type: 'callout', tone: 'gold', title: 'Common brackets used in Kenyan research',
          body: [
            '**Age (workforce):** 18-24 · 25-34 · 35-44 · 45-54 · 55+',
            '**Age (education):** Under 18 · 18-22 · 23-27 · 28+',
            '**Income (KSh, monthly):** Under 20,000 · 20,000-49,999 · 50,000-99,999 · 100,000+',
            '**Years of experience:** Less than 1 · 1-3 · 4-7 · 8-15 · More than 15',
          ]},

        { type: 'why', body:
          'Brackets are decisions, not facts. The 5 brackets you choose for age are not the only valid choices — you could pick 4 brackets, or 8, or different cutoffs. Pick brackets that (a) match how policy or prior research divides the variable, (b) give roughly balanced groups so no category is tiny, and (c) tell the story you want to tell. Document your bracket choices in your methodology chapter.' },
      ],
    },

    /* ════════════════════ 8. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common frequency mistakes',
      blocks: [
        { type: 'heading', level: 2, text: 'Four mistakes that age frequency tables badly' },

        { type: 'mistake',
          title: 'Mistake 1 — Reporting Percent instead of Valid Percent',
          body: 'Your write-up says "30% of respondents are in Form 1" using SPSS\'s Percent column — which divides by the total sample including missing cases. The number looks slightly low because missing cases dilute it.',
          fix: 'Always report **Valid Percent** in your thesis text. It excludes missing cases and gives the true breakdown among people who actually answered. The difference may be small but it matters for accuracy.' },

        { type: 'mistake',
          title: 'Mistake 2 — Running Frequencies on a continuous variable like age',
          body: 'You move age_yrs into Frequencies and get a 60-row table with one or two cases per age. The table fills three pages and tells the reader nothing useful.',
          fix: 'For continuous variables, either run Descriptives (Lesson 2 and 3 of this course) for mean/SD, OR bracket the variable first using Transform → Recode into Different Variables, then run Frequencies on the bracketed version.' },

        { type: 'mistake',
          title: 'Mistake 3 — Forgetting to declare missing codes before running Frequencies',
          body: 'Your data has 999 for "refused" but you never declared it in Variable View Missing column. The Frequencies output shows a "999" category as if it were a real value, alongside "Male" and "Female".',
          fix: 'Before running ANY analysis, declare your missing codes in Variable View → Missing column. Lesson 5 of SPSS Basics covers this in full. Without it, every output table will be contaminated.' },

        { type: 'mistake',
          title: 'Mistake 4 — Not stating the N for each variable',
          body: 'Your Chapter 4 says "30% of respondents were in Form 1" without saying how many respondents that was. The reader cannot verify the calculation or understand the precision.',
          fix: 'Always state the N alongside the percentage: "30% of the 118 valid respondents were in Form 1 (n = 35)". The triple of n + percent + total N is the published convention.' },
      ],
    },

    /* ════════════════════ 9. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'heading', level: 2, text: 'What you should now be able to do' },

        { type: 'summary', items: [
          'Define a frequency table as a count of how many cases fall into each category of a variable, with percentages.',
          'Recognise when to use frequencies (categorical and ordinal variables) and when not to (continuous variables — use Descriptives or bracket first).',
          'Run Frequencies in SPSS via Analyze → Descriptive Statistics → Frequencies, moving multiple variables at once for efficiency.',
          'Add bar charts via the Charts… button, choosing Percentages over raw frequencies.',
          'Read every column in the output — Frequency, Percent, Valid Percent, Cumulative Percent — and know that Valid Percent is what you almost always report.',
          'Bracket a continuous variable using Transform → Recode into Different Variables so you can run frequencies on it.',
          'Write up frequencies in APA style — *"Of the 198 valid respondents, 122 (61.6%) were female and 76 (38.4%) were male"* — for both single variables and multi-variable demographic tables.',
          'Present a publishable demographic frequency table with proper N statements, Valid Percents, sentence case, and a numbered title.',
          'Avoid the four common mistakes — using Percent instead of Valid Percent, running on raw continuous variables, missing-code declarations forgotten, no N stated.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 2: Mean, median, mode** we move from counting categories to summarising continuous variables. You will learn the three measures of central tendency, when each is appropriate, and why mean and median tell different stories when the data is skewed or has outliers.' },

        { type: 'paragraph', text:
          'Before moving on, open your own dataset (or a practice file) and run Frequencies on three of your categorical variables at once. Add a bar chart. Read the output carefully. Identify the Valid Percent for the largest category. Write one sentence describing it using the APA template. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 10. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'heading', level: 2, text: 'Six quick questions' },

        { type: 'check',
          question: 'Frequencies is the right analysis for which kind of variable?',
          choices: [
            'Continuous variables like age in years or income in KSh',
            'Categorical and ordinal variables like gender, county, or Likert items',
            'Only nominal variables, never ordinal',
            'Any variable as long as it is numeric',
          ],
          answer: 1,
          explanation: 'Frequencies works best with **categorical and ordinal** variables — gender, county, marital status, Likert items. For continuous variables (age, income), it produces a huge unwieldy table; use Descriptives (mean, SD) instead, or bracket the variable first.' },

        { type: 'check',
          question: 'Which column in the SPSS Frequencies output should you report in your thesis?',
          choices: [
            'Frequency only',
            'Percent only',
            'Valid Percent (excludes missing cases from the denominator)',
            'Cumulative Percent',
          ],
          answer: 2,
          explanation: 'Always report **Valid Percent**. Percent divides by the total sample including missing cases, which artificially shrinks each category. Valid Percent divides by the non-missing cases — giving you the true breakdown among people who actually answered.' },

        { type: 'check',
          question: 'You want to add a bar chart alongside your frequency tables. Where do you do this?',
          choices: [
            'Run a separate Graphs → Chart Builder analysis',
            'Click the Charts… button inside the Frequencies dialog and pick Bar charts',
            'Manually draw it in Word after the table',
            'It cannot be done in one step',
          ],
          answer: 1,
          explanation: 'The Charts… button inside the Frequencies dialog lets you produce bar charts (or pie charts or histograms) in the same run as the tables. Choose Bar charts and set "Chart Values" to Percentages.' },

        { type: 'check',
          question: 'You ran Frequencies on age_yrs (a continuous variable from 18 to 78) and got a 60-row table. What should you do instead?',
          choices: [
            'Print the 60-row table and put it in your appendix',
            'Use Transform → Recode into Different Variables to bracket age into groups (18-24, 25-34, …) then run Frequencies on the bracketed version',
            'Delete the variable from your dataset',
            'Use the Mean function instead',
          ],
          answer: 1,
          explanation: 'Continuous variables need bracketing before Frequencies. Use Transform → Recode into Different Variables to create age_bracket with 5 meaningful groups, add value labels, then run Frequencies on the bracketed version. The result is a clean 5-row table for Chapter 4.' },

        { type: 'check',
          question: 'Your output shows Form 2: Frequency = 30, Percent = 25.0%, Valid Percent = 25.4%. Why is Valid Percent slightly higher than Percent?',
          choices: [
            'Because of rounding error',
            'Because Percent uses the total sample (including missing) as the denominator, while Valid Percent uses only the non-missing cases',
            'Because Valid Percent counts each case twice',
            'Because Percent is always wrong',
          ],
          answer: 1,
          explanation: 'Percent divides 30 by 120 (the total including missing cases) = 25.0%. Valid Percent divides 30 by 118 (the non-missing only) = 25.4%. The 2 missing cases are excluded from Valid Percent\'s denominator, making it slightly higher. Always report Valid Percent in your thesis.' },

        { type: 'check',
          question: 'Which write-up is the most professional?',
          choices: [
            '"30% are Form 1"',
            '"Of the 118 valid respondents, 35 (29.7%) were in Form 1, 30 (25.4%) in Form 2, 27 (22.9%) in Form 3, and 26 (22.0%) in Form 4."',
            '"Form 1 had a lot of people"',
            '"Frequencies were run."',
          ],
          answer: 1,
          explanation: 'Option B is the publishable format: states the total N (118), gives raw counts and Valid Percents for every category, and uses correct sentence structure. The other options either omit critical information (N, exact counts) or use vague language ("a lot", "frequencies were run").' },
      ],
    },
  ],
};
