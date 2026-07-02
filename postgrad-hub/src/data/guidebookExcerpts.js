// Auto-generated from "The Complete SPSS Handbook for Beginners" (2026).
// Excerpts are placed per-lesson; full handbook content remains the property of the author.

export const GUIDEBOOK_EXCERPTS = {
  'basics-1': `--- From Chapter 16: Installing SPSS and opening it ---

Chapter 14 · Chapter 16.
Installing SPSS and opening it
for the first time
A scene before any clicking
A Master's student in Eldoret has just received a download link for SPSS from her
university IT department. She has never installed software more complex than a
WhatsApp update. She double-clicks the installer, an unfamiliar window opens asking
about "license codes" and "authorised users," and within five minutes she is
convinced she has broken something. She closes everything and goes for tea.
This scene is universal. SPSS is not difficult  it just looks unfamiliar the first time.
We will now walk through installation, first launch, and the safety net you need
before you do anything else.
What SPSS actually is
DEFINITION — SPSS
SPSS stands for "Statistical Package for the Social Sciences." It is a desktop
program owned by IBM that lets you store data in a spreadsheet-like grid, run
statistical tests through menus or written commands, and produce publication-
quality tables and charts. Current name: IBM SPSS Statistics. This book is written
against versions 28 and 29, but every instruction here works identically in versions
25, 26, and 27.

Editions you will encounter
Edition Who uses it Notes
IBM SPSS Statistics
Standard
Most thesis studentsHas everything in Parts One to
Seven of this book.
IBM SPSS Statistics
Professional
Researchers wanting more
advanced models
Adds Categories, Decision Trees,
Forecasting.
IBM SPSS Statistics
Premium
Doctoral and faculty
research
Adds Amos, Bootstrapping, Complex
Samples, Custom Tables.
IBM SPSS Statistics
Subscription
Anyone on a monthly planSame core menus, slightly different
login.
Free 14-day trialFirst-time evaluatorshttps://www.ibm.com/products/spss-
statistics
TIP — UNIVERSITY ACCESS
Most universities provide SPSS to enrolled students free of charge through the IT
department or library website. Ask before you pay. If your institution does not
provide SPSS, the open-source alternatives JASP (https://jasp-stats.org) and jamovi
(https://www.jamovi.org) use the same statistical engine (R) under the hood and
replicate most SPSS procedures with similar menus.
Installation in plain words
Download the installer (a .exe file on Windows, .dmg on Mac) from your
university's software portal or IBM's website.
Double-click the installer. Allow it to make changes when Windows asks.
Accept the licence agreement.
Choose Authorised User Licence if your university gave you a code; choose 
Concurrent User Licence if your university uses a campus licence server
(your IT department will tell you which).
Paste the licence code when asked.
Click Install. Wait. (515 minutes depending on your computer.)
Click Finish.
1. 
2. 
3. 
4. 
5. 
6. 
7. 

The first launch
When you open SPSS for the first time you will see a "Welcome" dialog. This small
dialog hides nothing important, but beginners often misclick it. Let us study it
carefully.
Figure 16.1 — The SPSS Welcome / Start dialog appears each time you launch SPSS. Arrow 1:
New Dataset — opens an empty Data Editor where you can start building a dataset from scratch.
We will click this in Chapter 17. Arrow 2: Open another file — opens a file browser so you can
open an existing .sav file (SPSS's native format) or import Excel, CSV , or other formats. Arrow 3:
"Don't show this dialog in the future" — once you are comfortable, tick this so SPSS opens
directly into the Data Editor next time.
WARNING — DO NOT TICK "DON'T SHOW" YET
Leave that checkbox alone for your first month. The Welcome dialog gives you a
convenient list of recently opened files, which is a small but useful safety net while
you are still learning where you saved things.

Chapter 16 — Summary
SPSS is a desktop program owned by IBM; versions 25 through 29 are
nearly identical for our purposes.
Universities almost always provide free access  ask before you pay.
The Welcome dialog has only three things you need to recognise: New
Dataset, Open file, and Don't-show-again.
JASP and jamovi are excellent free alternatives that follow similar
workflows.
 
 
 


--- From Chapter 17: The ---

Chapter 15 · Chapter 17. The
Data Editor — Data View and
Variable View
The Data Editor is the window you spend most of your SPSS life in. It looks like a
spreadsheet, but it is smarter than Excel: it knows the difference between a number,
a category, and a string of text, and it carries that information into every analysis you
run. The Data Editor has two views, accessed by two tabs at the bottom-left of the
window.
Tab What it shows When to use it
Data
View
The actual data: one row per case
(e.g. one pupil), one column per
variable. Looks like a spreadsheet.
Entering data, scrolling through
cases, spot-checking values.
Variable
View
The "rulebook" for each variable: its
name, type, label, value codes,
missing-value codes, and
measurement level.
Defining new variables, fixing labels,
setting measurement levels. Always
set up Variable View first, then enter
data.
ANALOGY — THE BUILDING AND ITS BLUEPRINT
Variable View is the blueprint of your dataset  it tells SPSS what each variable
should look like and how to treat it. Data View is the building itself  the actual
rows and columns of values. A wise builder finalises the blueprint before laying a
single brick. A wise analyst sets up Variable View before typing a single data value.
The Complete SPSS Handbook for
Beginners
Chapter 17. The Data Editor  Data View and Variable
View

Data View — the spreadsheet you see
Figure 17.1 — Data View. Each row is one case (one pupil), each column is one variable. Arrow 1
— a single cell holds one value (here, math_score for pupil 2 is 81). Arrow 2 — column headers
carry the short variable names (set in Variable View). Hover over a column header in real SPSS to
see the variable's full label. Arrow 3 — the two view tabs. Click "Variable View" to switch to the
rulebook; click "Data View" to return.
What you can do in Data View
Type values directly into cells.
Use arrow keys, Tab, or Enter to move between cells.
Right-click a column header to insert, copy, or delete variables.
Right-click a row number to insert, copy, or delete cases.
Press Ctrl+G to go to a specific case number.
Press Ctrl+F to find a specific value within the active column.
COMMON BEGINNER MISTAKE
Entering data in Data View before defining variables in Variable View. SPSS will let
you do it  it will create variables named VAR00001, VAR00002 and so on, with no
labels and no value codes. Three weeks later, when you reopen the file, you will have
no idea what they mean. Always define variables first.
 
 
 
 
 
 
The Complete SPSS Handbook for
Beginners
Chapter 17. The Data Editor  Data View and Variable
View

Variable View — the rulebook
We met Variable View briefly in Figure 1.1. Here is the same window with every
column explained. We will dedicate Chapter 25 to mastering it.
Column What it controls
Name Short variable name SPSS uses internally. Up to 64 characters, no spaces,
must start with a letter. Example: math_score.
Type Data type: Numeric (most common), String (text), Date, Currency, etc.
Width Total number of characters or digits allowed.
DecimalsNumber of decimal places shown.
Label Full human-readable description (up to 256 characters). Appears in every
output table. Example: "Mathematics end-of-term score, out of 100."
Values The lookup table for coded variables. Example: 1 = "Male", 2 = "Female".
Missing The codes you reserved for missing data. Example: 99 = "no answer".
ColumnsThe visible width of the column in Data View (cosmetic only).
Align Left / Right / Centre alignment in Data View (cosmetic).
MeasureThe level of measurement: Nominal, Ordinal, or Scale. Decides which menus
and graphs SPSS will offer.
Role Input (predictor), Target (DV), Both, None, Partition, Split. Used by some
automated procedures; safe to leave as Input.
Chapter 17 — Summary
The Data Editor has two tabs: Data View (the spreadsheet) 

[...continued in the full handbook...]`,
  'basics-2': `--- From Chapter 17: The ---

Chapter 15 · Chapter 17. The
Data Editor — Data View and
Variable View
The Data Editor is the window you spend most of your SPSS life in. It looks like a
spreadsheet, but it is smarter than Excel: it knows the difference between a number,
a category, and a string of text, and it carries that information into every analysis you
run. The Data Editor has two views, accessed by two tabs at the bottom-left of the
window.
Tab What it shows When to use it
Data
View
The actual data: one row per case
(e.g. one pupil), one column per
variable. Looks like a spreadsheet.
Entering data, scrolling through
cases, spot-checking values.
Variable
View
The "rulebook" for each variable: its
name, type, label, value codes,
missing-value codes, and
measurement level.
Defining new variables, fixing labels,
setting measurement levels. Always
set up Variable View first, then enter
data.
ANALOGY — THE BUILDING AND ITS BLUEPRINT
Variable View is the blueprint of your dataset  it tells SPSS what each variable
should look like and how to treat it. Data View is the building itself  the actual
rows and columns of values. A wise builder finalises the blueprint before laying a
single brick. A wise analyst sets up Variable View before typing a single data value.
The Complete SPSS Handbook for
Beginners
Chapter 17. The Data Editor  Data View and Variable
View

Data View — the spreadsheet you see
Figure 17.1 — Data View. Each row is one case (one pupil), each column is one variable. Arrow 1
— a single cell holds one value (here, math_score for pupil 2 is 81). Arrow 2 — column headers
carry the short variable names (set in Variable View). Hover over a column header in real SPSS to
see the variable's full label. Arrow 3 — the two view tabs. Click "Variable View" to switch to the
rulebook; click "Data View" to return.
What you can do in Data View
Type values directly into cells.
Use arrow keys, Tab, or Enter to move between cells.
Right-click a column header to insert, copy, or delete variables.
Right-click a row number to insert, copy, or delete cases.
Press Ctrl+G to go to a specific case number.
Press Ctrl+F to find a specific value within the active column.
COMMON BEGINNER MISTAKE
Entering data in Data View before defining variables in Variable View. SPSS will let
you do it  it will create variables named VAR00001, VAR00002 and so on, with no
labels and no value codes. Three weeks later, when you reopen the file, you will have
no idea what they mean. Always define variables first.
 
 
 
 
 
 
The Complete SPSS Handbook for
Beginners
Chapter 17. The Data Editor  Data View and Variable
View

Variable View — the rulebook
We met Variable View briefly in Figure 1.1. Here is the same window with every
column explained. We will dedicate Chapter 25 to mastering it.
Column What it controls
Name Short variable name SPSS uses internally. Up to 64 characters, no spaces,
must start with a letter. Example: math_score.
Type Data type: Numeric (most common), String (text), Date, Currency, etc.
Width Total number of characters or digits allowed.
DecimalsNumber of decimal places shown.
Label Full human-readable description (up to 256 characters). Appears in every
output table. Example: "Mathematics end-of-term score, out of 100."
Values The lookup table for coded variables. Example: 1 = "Male", 2 = "Female".
Missing The codes you reserved for missing data. Example: 99 = "no answer".
ColumnsThe visible width of the column in Data View (cosmetic only).
Align Left / Right / Centre alignment in Data View (cosmetic).
MeasureThe level of measurement: Nominal, Ordinal, or Scale. Decides which menus
and graphs SPSS will offer.
Role Input (predictor), Target (DV), Both, None, Partition, Split. Used by some
automated procedures; safe to leave as Input.
Chapter 17 — Summary
The Data Editor has two tabs: Data View (the spreadsheet) and Variable
View (the rulebook).
Always set up Variable View first; then enter data in Data View.
Variable View has eleven columns; the most consequential are Name,
Label, Values, Missing, and Measure.
 
 
 
The Complete SPSS Handbook for
Beginners
Chapter 17. The Data Editor  Data View and Variable
View

--- From Chapter 25: Variable View, column by ---

Chapter 23 · Chapter 25.
Variable View, column by
column
This is the chapter we have been promising since Chapter 1. Variable View has eleven
columns. Each one matters. We will study them one at a time, using the education
dataset we will load shortly.
Figure 25.1 — A fully completed Variable View for the students_motivation.sav practice
dataset. Arrow 1: Name — short variable name (no spaces, must start with a letter). Arrow 2:
Label — human-readable description that appears in every output table. Arrow 3: Values — the
lookup table that turns numeric codes back into words. Arrow 4: Measure — Scale (ruler icon),
Ordinal (three coloured bars), or Nominal (small bars). Setting this correctly is the single most
consequential choice you will make in this window.
1. Name
The short internal name. SPSS uses it to refer to the variable in syntax, output,
dialogs and dropdowns.

Rules
Maximum 64 characters (since SPSS 12).
Must start with a letter.
May contain letters, digits and underscores (_).
No spaces. Use underscore instead: math_score, not math score.
Case-insensitive for matching (Math_Score and math_score refer to the same
variable), but the case you typed is preserved in output.
Cannot be one of SPSS's reserved words (ALL, AND, BY, EQ, GE, GT, LE, LT, NE, NOT, 
OR, TO, WITH).
Best practice
Use lowercase with underscores: math_score, study_hours, school_type.
Keep names short but meaningful (under 15 characters where possible).
For multi-item scales, use a prefix: mot1, mot2, mot3 for motivation items 1, 2, 3,
then mot_total for the composite.
Avoid var1, q1, q2  six months later you will not know what they mean.
COMMON MISTAKES — VARIABLE NAMES
Names starting with a number (1stscore)  SPSS rejects them.
Names with spaces (math score)  SPSS rejects them.
Names with hyphens (math-score)  SPSS interprets the hyphen as minus.
Names that differ only by case (Gender and gender)  confusing for humans.
Cryptic codes (v1, q12b)  meaningless six months later.
2. Type
The data type. The dropdown offers eight choices; you will use only two.
 
 
 
 
 
 
 
 
 
 
1. 
2. 
3. 
4. 
5. 

Type What it stores When to use
Numeric A number (with
chosen decimal
places)
The default. Use for every numeric variable,
including coded categorical ones.
CommaNumber with
thousand separators
Rare. Cosmetic only.
Dot Comma-decimal
European format
Rare. Cosmetic only.
Scientific
notation
1.23E+04Rare.
Date A date or timeWhen you have actual dates (e.g. date of
admission).
DollarCurrency formattedRare.
Custom
currency
Other currenciesRare.
String Text (letters and
numbers)
Names, open-ended text, ID strings that begin with
letters. Use sparingly  SPSS cannot do most
statistics on strings.
WARNING — NEVER STORE CATEGORICAL DATA AS STRINGS
A beginner types "Male" and "Female" directly into a String variable. SPSS will not
run a chi-square test on it; cross-tabs will treat "Male", "male", "M", and " Male"
(with a leading space) as four different categories. Always store categorical data
as Numeric codes (1, 2, 3…) with Value labels. We will see how in section 6 of
this chapter.
3. Width
The total number of characters or digits stored. Default is 8  usually enough.
For an integer variable like gender (values 1 or 2): Width = 1 is plenty.
For a score 0100: Width = 3.
For a score with decimals like 87.5: Width = 4 (three digits + decimal point).
For a long ID string: increase Width.
This column is mostly cosmetic; SPSS will warn you if you exceed it.
 
 
 
 

4. Decimals
Number of decimal places shown.
For integer variables (gender, form, age): Decimals = 0.
For exam scores stored to 1 decimal (e.g. 87.5): Decimals = 1.
For motivation averages (e.g. 4.57): Decimals = 2.
TIP — CHANGE DECIMALS GLOBALLY
If yo

[...continued in the full handbook...]`,
  'basics-3': `--- From Chapter 25: Variable View, column by ---

Chapter 23 · Chapter 25.
Variable View, column by
column
This is the chapter we have been promising since Chapter 1. Variable View has eleven
columns. Each one matters. We will study them one at a time, using the education
dataset we will load shortly.
Figure 25.1 — A fully completed Variable View for the students_motivation.sav practice
dataset. Arrow 1: Name — short variable name (no spaces, must start with a letter). Arrow 2:
Label — human-readable description that appears in every output table. Arrow 3: Values — the
lookup table that turns numeric codes back into words. Arrow 4: Measure — Scale (ruler icon),
Ordinal (three coloured bars), or Nominal (small bars). Setting this correctly is the single most
consequential choice you will make in this window.
1. Name
The short internal name. SPSS uses it to refer to the variable in syntax, output,
dialogs and dropdowns.

Rules
Maximum 64 characters (since SPSS 12).
Must start with a letter.
May contain letters, digits and underscores (_).
No spaces. Use underscore instead: math_score, not math score.
Case-insensitive for matching (Math_Score and math_score refer to the same
variable), but the case you typed is preserved in output.
Cannot be one of SPSS's reserved words (ALL, AND, BY, EQ, GE, GT, LE, LT, NE, NOT, 
OR, TO, WITH).
Best practice
Use lowercase with underscores: math_score, study_hours, school_type.
Keep names short but meaningful (under 15 characters where possible).
For multi-item scales, use a prefix: mot1, mot2, mot3 for motivation items 1, 2, 3,
then mot_total for the composite.
Avoid var1, q1, q2  six months later you will not know what they mean.
COMMON MISTAKES — VARIABLE NAMES
Names starting with a number (1stscore)  SPSS rejects them.
Names with spaces (math score)  SPSS rejects them.
Names with hyphens (math-score)  SPSS interprets the hyphen as minus.
Names that differ only by case (Gender and gender)  confusing for humans.
Cryptic codes (v1, q12b)  meaningless six months later.
2. Type
The data type. The dropdown offers eight choices; you will use only two.
 
 
 
 
 
 
 
 
 
 
1. 
2. 
3. 
4. 
5. 

Type What it stores When to use
Numeric A number (with
chosen decimal
places)
The default. Use for every numeric variable,
including coded categorical ones.
CommaNumber with
thousand separators
Rare. Cosmetic only.
Dot Comma-decimal
European format
Rare. Cosmetic only.
Scientific
notation
1.23E+04Rare.
Date A date or timeWhen you have actual dates (e.g. date of
admission).
DollarCurrency formattedRare.
Custom
currency
Other currenciesRare.
String Text (letters and
numbers)
Names, open-ended text, ID strings that begin with
letters. Use sparingly  SPSS cannot do most
statistics on strings.
WARNING — NEVER STORE CATEGORICAL DATA AS STRINGS
A beginner types "Male" and "Female" directly into a String variable. SPSS will not
run a chi-square test on it; cross-tabs will treat "Male", "male", "M", and " Male"
(with a leading space) as four different categories. Always store categorical data
as Numeric codes (1, 2, 3…) with Value labels. We will see how in section 6 of
this chapter.
3. Width
The total number of characters or digits stored. Default is 8  usually enough.
For an integer variable like gender (values 1 or 2): Width = 1 is plenty.
For a score 0100: Width = 3.
For a score with decimals like 87.5: Width = 4 (three digits + decimal point).
For a long ID string: increase Width.
This column is mostly cosmetic; SPSS will warn you if you exceed it.
 
 
 
 

4. Decimals
Number of decimal places shown.
For integer variables (gender, form, age): Decimals = 0.
For exam scores stored to 1 decimal (e.g. 87.5): Decimals = 1.
For motivation averages (e.g. 4.57): Decimals = 2.
TIP — CHANGE DECIMALS GLOBALLY
If you find SPSS adding ".00" to every integer variable, go to Edit → Options → Data
and set "Default decimal places" to 0. You can still override per variable in Variable
View.
5. Label
The full human-readable description. Up to 256 characters. This is the single most
important column for thesis reporting.
Why
Every SPSS output table prints the label, not the short name. If your label says
"Mathematics test score (out of 100)" then your output reads beautifully. If your label
is blank, the output reads "math_score"  which is acceptable but slightly
unprofessional.
Good labels
Mathematics end-of-term test score (out of 100)
Self-reported weekly study hours
Type of school attended by the student
Academic motivation: mean of 7 Likert items
Bad labels
score (which score?)
Q5 (you will forget what Q5 was)
(blank)
 
 
 
 
 
 
 
 
 
 

TIP — WRITE LABELS AS FULL SENTENCES
A useful test: imagine the label printed as a row in a journal table. Does it explain
itself to a reader who has never seen your questionnaire? If yes, you have a good
label.
6. Values — the lookup table
For any categorical variable, you must tell SPSS what each numeric code means.
Click into the Values cell and a small dialog opens.
Figure 25.2 — The Value Labels dialog. Arrow 1: Value — type the numeric code (e.g. 1). Arrow
2: Add — type the label in the field above the button (e.g. "Male"), then click Add. Repeat for every
code. The list below grows as you add. Click OK when done.
Worked example — the gender variable
Click into the Values cell of the gender row.
In Value, type 1. In Label, type Male. Click Add.
In Value, type 2. In Label, type Female. Click Add.
In Value, type 9. In Label, type Missing / no answer. Click Add.
Click OK.
From this moment on, SPSS will show "Male" and "Female" in outputs, not "1" and
"2." In Data View, you can toggle between codes and labels with View → Value
Labels (or the small "price tag" icon).
1. 
2. 
3. 
4. 
5. 

COMMON MISTAKE — FORGETTING VALUE LABELS
A beginner enters all the data and runs a chi-square test. The output table shows: 
"Crosstab of gender x form_1, with rows 1 and 2." Even she does not remember
which is male. Six months from now her examiner will not either. Always add value
labels before entering data.
7. Missing — declaring missing-value codes
This column is the second most-skipped setting in Variable View, and the source of
subtle bugs in many theses. Click into the Missing cell and a small dialog opens.
Figure 25.3 — The Missing Values dialog. Arrow 1 — select "Discrete missing values" to declare
specific codes as missing. Arrow 2 — type up to three codes (here 9, 99, 999). Choose codes that
are impossible for the variable: 9 for a 1-digit Likert; 99 for age; 999 for a 3-digit score.
Why declared missing values matter
If you do not declare 9, 99, or 999 as missing, SPSS treats them as real numbers and
includes them in calculations. Your mean age becomes 31.4 instead of 16.2 because
three cases coded "99" were treated as 99-year-olds.
Two kinds of missing in SPSS
System-missing  an empty cell. SPSS shows it as a single dot (.) and
automatically excludes it from calculations.
 

User-missing  a real number that you have declared as missing (e.g. 99).
SPSS will exclude it from calculations only if you declared it in the Missing
column.
WHY USE USER-MISSING RATHER THAN BLANK CELLS?
Because missing data is information. The code 9 = "refused to answer" is different
from 99 = "skipped because not applicable." If you simply leave the cell blank you
lose this distinction, and later when reviewers ask "how many refused versus how
many were not applicable?" you cannot say.
8. Columns
The visible width of the column in Data View. Cosmetic only. Default 8 is fine for most
variables; widen for long string variables.
9. Align
Left, Right, or Centre alignment in Data View. Cosmetic only. The convention is right-
align numeric data, left-align string data.
10. Measure — the most consequential setting
You met this in Chapter 3. The three choices control which menus, chart options and
tests SPSS makes available.
MeasureUse for SPSS icon
Scale Interval or ratio variables (age, score, income,
weight)
Rule

[...continued in the full handbook...]`,
  'basics-4': `--- From Chapter 29: Importing data from elsewhere ---

Chapter 27 · Chapter 29.
Importing data from elsewhere
In real research you rarely type data manually. You import it from a spreadsheet
(Excel), a CSV file, an online form (Google Forms, Microsoft Forms), or a specialised
data-collection app (KoboToolbox, ODK, REDCap, SurveyMonkey).
Importing from Excel
File → Import Data → Excel...
Browse to your .xlsx file. Click Open.
The "Read Excel File" dialog appears.
Figure 29.1 — The Read Excel File dialog. Arrow 1: Worksheet — choose which sheet to import if
the file has several. Arrow 2: "Read variable names from the first row of data" — tick this if
your Excel sheet has column headers in row 1 (almost always). Arrow 3: Preview — confirms
SPSS read the columns correctly.
What SPSS does on import
Reads column headers from row 1 and uses them as variable Names.
Guesses the Type of each variable (Numeric or String).
1. 
2. 
3. 
 
 

Guesses the Measure (Scale, Ordinal, or Nominal).
Leaves all Labels blank.
Leaves all Value labels blank.
Leaves all Missing-value codes blank.
This is why importing is the start of the work, not the end. After every import you
must visit Variable View and fill in Labels, Values, Missing, and Measure.
Importing from CSV
File → Import Data → CSV Data... (or File → Open → Data, change file type
to CSV).
The Text Import Wizard appears. Step through it: - Confirm the delimiter is a
comma. - Confirm the first row contains variable names. - Click Finish.
TIP — CSV IS UNIVERSAL
CSV is the safest format for moving data between programs. Excel, Google Sheets,
SPSS, R, Python, Stata all read CSV reliably. When in doubt, export to CSV.
Importing from Google Forms, KoboToolbox,
ODK, REDCap
All of these export to either Excel or CSV. The workflow is the same:
In the platform: choose Export → CSV (or Excel).
Save the file locally.
In SPSS: File → Import Data → CSV / Excel.
Special considerations
Google Forms exports timestamps as the first column. Either delete it before
importing or import it as a Date variable.
KoboToolbox / ODK export choice variables as the chosen label text by default.
Change the export setting to "XML values and labels" so you get numeric codes
plus a separate labels file.
REDCap offers an "SPSS Syntax" export that produces a .sav file directly with
all labels and values pre-filled. Use it if available  it saves an hour of Variable
View work.
 
 
 
 
1. 
2. 
1. 
2. 
3. 
 
 
`,
  'basics-5': `--- From Chapter 27: The ---

Chapter 25 · Chapter 27. The
two settings beginners always
forget
If you remember only two settings from this whole Part Four, remember these:
Value Labels for every coded variable (Chapter 25, section 6).
Missing-value codes for every variable that can have missing data (Chapter
25, section 7).
Beginners skip both because everything seems to "work" without them. The bug
appears later: mean ages of 31; chi-square tables with rows labelled "1" and "2";
analyses silently including refusal codes.
THE SINGLE MOST COMMON DATASET BUG IN BEGINNER THESES
"My mean motivation score is 87." Investigation reveals: the researcher used 99
as the missing-value code for the motivation items, never declared it in Variable
View, and SPSS dutifully averaged a few real 5s with a few 99s. A two-minute fix
(declaring 99 as user-missing) prevents an entire thesis from being wrong.
1. 
2.

--- From Chapter 34: Missing values — types, ---

Chapter 32 · Chapter 34.
Missing values — types,
patterns, treatments
Missing data is the single most common analysis headache. This chapter teaches you
to recognise why data is missing and to choose a treatment that does not introduce
bias.
Three causes of missingness (Rubin, 1976)
The mechanism behind missing data  why a value is missing  decides which
treatment is safe.
Mechanism Plain English Treatment
MCAR 
Missing
Completely At
Random
The missingness has nothing to do
with anything: the pupil was
absent on test day for a random
reason.
Almost any treatment is safe
(deletion, simple imputation).
MAR  Missing
At Random
The missingness depends on other
observed variables but not on the
missing value itself. Example: girls
are more likely to skip the income
question, but among girls, who
skips is random.
Multiple imputation or maximum
likelihood (FIML); listwise
deletion will bias the estimate.
MNAR 
Missing Not At
Random
The missingness depends on the
missing value itself. Example:
students with very low math scores
are more likely to skip the math
test.
Hardest to handle. Requires a
model of the missingness
mechanism; sensitivity analyses;
honest acknowledgement in the
discussion.

WHY THIS DISTINCTION MATTERS
If you delete cases with missing values (the default in most SPSS procedures), you
assume MCAR. If MCAR does not hold, your estimates will be biased  usually in
the direction that flatters your hypothesis (the students who skipped the test were
probably the weakest, so the mean math score looks higher than it really is).
Knowing the mechanism is the first defence against this bias.
Detecting the pattern of missingness in SPSS
Analyze → Multiple Imputation → Analyze Patterns gives a beautiful overview of
which variables have missing values and which patterns of missingness occur
together.
For a quicker check: Analyze → Descriptive Statistics → Frequencies with
Statistics → tick N. The Missing row tells you how many missings each variable has.
Compare to your sample size to compute the missing percentage.
Rules of thumb for percentage of missing
% missing per
variable Generally acceptable treatment
< 5% Almost any treatment; bias risk small
515% Multiple imputation or mean substitution if MCAR; report
transparently
1530% Multiple imputation strongly recommended; investigate
mechanism
> 30% Consider dropping the variable; or admit it as a major limitation
A whole case missing more than half its variables is usually deleted (called listwise
deletion of incomplete cases).
Treatments — from simplest to safest
1. Listwise deletion (the SPSS default)
A case with any missing value on the variables in your analysis is dropped from that
analysis. Easy, but biases the result if missingness is not MCAR.

2. Pairwise deletion
A case is included in those calculations for which it has data, excluded for those it
doesn't. Gives different sample sizes for different statistics in the same output.
Convenient for correlations; confusing in regression.
3. Mean substitution
Replace each missing value with the mean of the variable. Quick. Reduces variability
(your standard deviations shrink). Acceptable only for very small amounts of missing
data and almost never for regression.
SPSS: Transform → Replace Missing Values → choose method Series mean.
4. Regression imputation
Predict the missing value from other variables using a regression model. Better than
the mean but still underestimates uncertainty.
5. Multiple imputation (the modern standard)
Create several (usually 520) complete datasets, each with a different plausible
imputation, run your analysis on each, and pool the results. SPSS offers this under
Analyze → Multiple Imputation → Impute Missing Data Values.
TIP — WHEN IN DOUBT, REPORT BOTH
For a thesis, run your main analysis with listwise deletion (the simple version) and
with multiple imputation, and compare. If the conclusions match, your finding is
robust. If they differ, you must investigate and report both.
A workflow for the practice dataset
In students_motivation.csv we have user-missing codes 9, 99, and 999. After
declaring them in Variable View (Chapter 25), run Frequencies → Statistics → tick N
to see how many missings each variable has. For each variable with a substantial
missing percentage:
Inspect the pattern: are the missings clustered in a particular form, gender, or
school type?
If MCAR is plausible and the percentage is small (< 5%), listwise deletion is
fine.
Document the percentage and your choice in your cleaning log.
1. 
2. 
3.`,
  'desc-1': `--- From Chapter 44: Frequencies, percentages, and ---

Chapter 42 · Chapter 44.
Frequencies, percentages, and
cross-tabulations
For categorical variables (nominal and ordinal), we cannot compute a mean. We
instead report how many cases fall into each category, and what percentage that is of
the total.
Frequencies
Analyze → Descriptive Statistics → Frequencies
Figure 44.1 — The Frequencies dialog. Arrow 1 — move categorical variables (here gender, form, 
school_type) into the Variable(s) box. Arrow 2 — Statistics… opens summary statistics (mean,
median, mode, percentiles). Arrow 3 — Charts… opens chart options (bar, pie, histogram).
Reading a Frequencies table
A typical Frequencies output for school_type looks like this:
The Complete SPSS Handbook for
Beginners
Chapter 44. Frequencies, percentages, and cross-
tabulations

Frequency Percent Valid Percent Cumulative Percent
Public82 68.3 68.9 68.9
Private37 30.8 31.1 100.0
Total Valid119 99.2 100.0
Missing 91 0.8
Total 120 100.0
Frequency  the count.
Percent  the count divided by the total number of cases (including missings).
Valid Percent  the count divided by the number of valid (non-missing) cases.
This is usually the column you report.
Cumulative Percent  the running total of Valid Percent. Useful for ordinal
variables ("80% of pupils are in Form 1 or 2").
TIP — ALWAYS REPORT VALID PERCENT, NOT PERCENT
"Valid Percent" excludes missing cases and is the number that matches what most
thesis examiners expect. If you report 68.3% Public from the Percent column, you
are implicitly saying the missing case was Private  which you do not actually know.
Cross-tabulations (contingency tables)
A cross-tabulation (or crosstab) shows the joint distribution of two categorical
variables. We use it to ask questions like: "Are private-school pupils more likely to be
in Form 4 than public-school pupils?"
Analyze → Descriptive Statistics → Crosstabs
Move the row variable (e.g. school_type) into Rows.
Move the column variable (e.g. form) into Columns.
Click Cells… and tick Row %, Column %, and Total %.
Click Statistics… if you want Chi-square (Chapter 63).
Click OK.
Reading a crosstab
A typical output looks like:
 
 
 
 
1. 
2. 
3. 
4. 
5. 
The Complete SPSS Handbook for
Beginners
Chapter 44. Frequencies, percentages, and cross-
tabulations

Form 1 Form 2 Form 3 Form 4 Total
Public Count 25 24 20 13 82
% within school_type30.5%29.3%24.4%15.9%100.0%
Private Count 8 8 10 11 37
% within school_type21.6%21.6%27.0%29.7%100.0%
Total Count 33 32 30 24 119
The row percentages (% within school_type) tell us: of public-school pupils, 16% are
in Form 4; of private-school pupils, 30% are in Form 4. That is a substantial-looking
difference  whether it is statistically significant is a question for chi-square
(Chapter 63).
COMMON MISTAKE — CONFUSING ROW %, COLUMN %, AND TOTAL %
Three percentages can be computed from each cell, and they answer different
questions. Row % = "of those in this row, what percentage fall in this column?". 
Column % = "of those in this column, what percentage fall in this row?". Total % =
"what percentage of the entire sample is in this cell?". Decide what you want to say 
before you report a percentage. Mixing them up changes the meaning of your
sentence.
The Complete SPSS Handbook for
Beginners
Chapter 44. Frequencies, percentages, and cross-
tabulations`,
  'desc-2': `--- From Chapter 42: Measures of central tendency — ---

Chapter 40 · Chapter 42.
Measures of central tendency —
mean, median, mode
A scene before any formula
A Form 4 teacher in Eldoret reports her end-of-term mathematics results. She has 30
pupils. She wants a single number that says "this is the typical performance of my
class." Three options exist:
The average (mean): add up all 30 scores and divide by 30.
The middle score (median): line the 30 scores from lowest to highest and pick
the one in the middle.
The most common score (mode): the score that appears most often.
Each option says something slightly different about her class. A good researcher
knows which one to report  and why.
DEFINITIONS — CENTRAL TENDENCY
A measure of central tendency is a single number that summarises the "centre" of
a distribution. The three classical measures are the mean, the median, and the 
mode.
The mean
The mean of a sample is the sum of all values divided by the number of values:
x̄ = (Σxᵢ) / n
Read "x-bar equals the sum of x-sub-i, divided by n." Don't be intimidated by the
symbols; they just say "add everything up, divide by how many."
Example
Five pupils scored: 60, 72, 78, 81, 95. Mean = (60 + 72 + 78 + 81 + 95) / 5 = 386 / 5
= 77.2.
 
 
 
The Complete SPSS Handbook for
Beginners
Chapter 42. Measures of central tendency  mean, median,
mode

When to use the mean
The variable is scale (interval or ratio).
The distribution is roughly symmetric (no extreme outliers).
You will go on to use parametric statistics (t-tests, ANOVA, regression).
When the mean misleads
The mean is sensitive to extreme values. If one pupil scored 5 instead of 95: new
mean = (60 + 72 + 78 + 81 + 5) / 5 = 296 / 5 = 59.2. A single low score dragged the
mean down by 18 points. The mean no longer reflects what most pupils achieved.
The median
The median is the value that splits the sorted data into two equal halves.
How to find it
Sort the values from lowest to highest.
If n is odd, the median is the middle value.
If n is even, the median is the average of the two middle values.
Example
The same five scores sorted: 60, 72, 78, 81, 95. n = 5 (odd), so the median is the 3rd
value: 78.
If the lowest score had been 5 instead of 60: 5, 72, 78, 81, 95. The median is still 78.
The median did not move at all. This is why we say the median is robust to outliers.
When to use the median
The variable is ordinal.
The variable is scale but has outliers or is skewed.
You are reporting income, house prices, exam scores in a difficult test 
anywhere a few extreme values would distort the mean.
The mode
The mode is the value that appears most often.
 
 
 
1. 
2. 
3. 
 
 
 
The Complete SPSS Handbook for
Beginners
Chapter 42. Measures of central tendency  mean, median,
mode

Example
In the dataset 4, 5, 5, 5, 6, 7, 7, the mode is 5.
A dataset can have no mode (all values different), one mode (unimodal), two modes
(bimodal), or more.
When to use the mode
The variable is nominal (the only legal central-tendency measure for nominal
data).
You want to report the most frequent category (e.g. "the modal school type was
Public").
A quick comparison table
MeasureBest for Affected by
outliers?
Legal for
nominal?
Legal for
ordinal?
Legal for
scale?
MeanScale,
symmetric
Yes (strongly)No DebatedYes
MedianScale
(skewed),
ordinal
No No Yes Yes
ModeNominal
categories
No Yes Yes Yes
ANALOGY — THREE WAYS TO DESCRIBE A VILLAGE
Imagine you want to describe the village by reporting "the typical income." The 
mean divides the total village income equally among all households  but is
dragged up by one millionaire. The median finds the household in the exact middle
of the income ladder  unaffected by the millionaire. The mode reports the single
income amount that most families happen to earn. All three are "the typical income";
each tells a different truth.
COMMON MISTAKE — REPORTING ONLY THE MEAN
A thesis student writes: "The mean attendance was 89%." If a few pupils attended
30% of the time, the mean was dragged down even though most pupils attended
over 90%. Without the median, the reader cannot tell. Best practice: report mean 
and median, and let your reader see if they agree.
 
 
The Complete SPSS Handbook for
Beginners
Chapter 42. Measures of central tendency  mean, median,
mode

Getting these in SPSS
Analyze → Descriptive Statistics → Frequencies → Statistics...
Tick Mean, Median, Mode. Click Continue, then OK.
For scale variables, you may also use Analyze → Descriptive Statistics →
Descriptives, which is faster but does not give the median or mode.
The Complete SPSS Handbook for
Beginners
Chapter 42. Measures of central tendency  mean, median,
mode`,
  'desc-3': `--- From Chapter 43: Measures of dispersion — range, ---

Chapter 41 · Chapter 43.
Measures of dispersion — range,
variance, standard deviation,
IQR
A mean of 70 might hide two very different classes. In Class A every pupil scored
between 65 and 75. In Class B half scored 30 and half scored 100. Both have a mean
of about 70, but they are utterly different classes. Dispersion is the second number
you must always report alongside the mean  it tells the reader how spread out the
values are.
DEFINITION — DISPERSION
A measure of dispersion (also called variability or spread) is a single number that
summarises how far the values in a distribution are from one another. Without
dispersion, a mean tells only half the story.
Range
The simplest measure: maximum minus minimum.
Range = max - min
For the five scores 60, 72, 78, 81, 95: Range = 95 - 60 = 35.
Easy to compute, but uses only two values and is extremely sensitive to outliers.
Rarely reported alone in a thesis.
Variance
The variance measures the average squared distance from the mean.
s² = Σ(xᵢ − x̄)² / (n − 1)
That formula sounds frightening. It just says: "for each score, find how far it is from
the mean; square that distance (to make it positive); add up all the squared distances;
divide by n-1."
The Complete SPSS Handbook for
Beginners
Chapter 43. Measures of dispersion  range, variance, standard
deviation, IQR

For our five scores (mean 77.2):
x x − x̄ (x − x̄)²
60 -17.2 295.84
72 -5.2 27.04
78 0.8 0.64
81 3.8 14.44
95 17.8 316.84
Sum of squared deviations = 654.80. Variance = 654.80 / (5 - 1) = 163.7.
Why squared?
Because if you just added the raw deviations, the positives and negatives would
cancel out and you would get zero every time. Squaring removes the signs.
Why divide by n − 1 instead of n?
For a sample (not the whole population), dividing by n underestimates the true
population variance. Dividing by n - 1 corrects this. The correction is called Bessel's
correction. You do not need to remember the name; you do need to remember to use
Sample Variance in SPSS, not Population Variance.
The problem with variance
Its units are weird. If our scores are in marks, the variance is in marks squared.
"163.7 marks squared" does not mean anything intuitive. This is why we usually
report the standard deviation instead.
Standard deviation
The standard deviation is the square root of the variance:
s = √s²
For our example: s = sqrt163.7 %æ 12.79.
Now we are back in the original units ("marks"). The standard deviation tells us, in
plain language, the typical distance of a score from the mean. Pupils typically score
about 12.8 marks above or below the mean of 77.2.
The Complete SPSS Handbook for
Beginners
Chapter 43. Measures of dispersion  range, variance, standard
deviation, IQR

ANALOGY — PEBBLES ON A STRING
Imagine you string out the test scores along a number line, like pebbles on a string.
The mean is the centre of gravity. The standard deviation is roughly the average
distance from each pebble to that centre. A small SD = pebbles clustered tightly
around the mean (a homogeneous class). A large SD = pebbles scattered far apart (a
heterogeneous class).
The interquartile range (IQR)
Like the median, the IQR is robust to outliers.
The 1st quartile (Q1) is the value below which 25% of the data lie.
The 3rd quartile (Q3) is the value below which 75% of the data lie.
The IQR = Q3 − Q1.
The middle 50% of pupils score within the IQR. Reported alongside the median when
the distribution is skewed.
Which dispersion to report?
If you reported the mean Report alongside
Mean Standard deviation (SD)
Median Interquartile range (IQR)
Mode Frequency / percentage
COMMON MISTAKE — REPORTING MEAN WITHOUT SD
"The mean motivation score was 4.62"  incomplete. Was everyone clustered
around 4.62, or were the scores all over the place? Always add the SD: "M = 4.62,
SD = 1.18." Two pairs of numbers. Always together.
 
 
 
The Complete SPSS Handbook for
Beginners
Chapter 43. Measures of dispersion  range, variance, standard
deviation, IQR`,
  'desc-4': `--- From Chapter 45: Charts ---

Chapter 43 · Chapter 45. Charts
— bar, pie, histogram, stem-and-
leaf, boxplot
Charts let your reader see what tables can only describe. The first rule is: match the
chart to the variable type.
Variable type Best charts
Nominal (categories)Bar chart, pie chart
Ordinal (ranks)Bar chart
Scale (continuous)Histogram, boxplot, stem-and-leaf
Two scale variablesScatterplot (preview of Chapter 64)
Bar chart
A bar chart shows the frequency or percentage of each category as a vertical bar. Use
for nominal and ordinal data. Each bar is separate (with a gap between them) to
remind the reader that the categories are distinct.
Graphs → Chart Builder → Bar → drag the first icon onto the canvas → drag
the variable to the x-axis.
Or simply: Analyze → Descriptive Statistics → Frequencies → Charts → Bar
chart → Continue → OK.
Pie chart
A pie chart shows percentages as slices of a circle. Use sparingly: pies are hard to
read accurately and almost never beat a bar chart in a thesis. Rule of thumb: use a
pie only when you have 24 categories and want to emphasise "share of total."
The Complete SPSS Handbook for
Beginners
Chapter 45. Charts  bar, pie, histogram, stem-and-leaf,
boxplot

Histogram
A histogram shows the distribution of a continuous variable. The x-axis is divided into
intervals (bins) and the height of each bar shows how many cases fall in each bin.
The bars touch (unlike a bar chart) because the underlying variable is continuous.
Figure 45.1 — Histogram of mathematics scores with a superimposed normal curve. Arrow 1 —
the modal bar (the most common range of scores, around 70). Arrow 2 — the bell curve SPSS
draws as a reference for what the distribution would look like if it were perfectly normal. Arrow 3
— the summary statistics SPSS adds in the corner.
Graphs → Chart Builder → Histogram → drag the first icon → drag the scale
variable to the x-axis. Or via Frequencies → Charts → Histogram → tick "Show
normal curve on histogram."
Boxplot
A boxplot summarises a scale variable's distribution in five numbers: minimum, Q1,
median, Q3, maximum  plus any outliers, which appear as separate dots.
You met one in Chapter 33 (Figure 33.x). Here is the anatomy:
The box runs from Q1 to Q3 (the middle 50%).
The line inside the box is the median.
The whiskers extend to the most extreme non-outlier values.
Outliers (more than 1.5 x IQR from the box) appear as small circles.
Extreme outliers (more than 3 x IQR) appear as asterisks.
 
 
 
 
 
The Complete SPSS Handbook for
Beginners
Chapter 45. Charts  bar, pie, histogram, stem-and-leaf,
boxplot

Graphs → Chart Builder → Boxplot → drag the variable to the y-axis.
Boxplots are especially useful for comparing groups: put a categorical variable on the
x-axis and a scale variable on the y-axis, and SPSS will draw one box per group.
Stem-and-leaf
A stem-and-leaf plot is a hybrid between a histogram and the raw data. Each value is
broken into a "stem" (its leading digit) and a "leaf" (its trailing digit). It is rarely
shown in modern papers but is useful for small datasets in teaching.
Analyze → Descriptive Statistics → Explore → Plots → Stem-and-leaf.
TIP — THE EXPLORE COMMAND DOES ALMOST EVERYTHING AT ONCE
Analyze → Descriptive Statistics → Explore produces descriptives, extreme values,
stem-and-leaf, histogram, boxplot, and tests of normality in a single run. For a quick
first look at any scale variable, it is unbeatable.
The Complete SPSS Handbook for
Beginners
Chapter 45. Charts  bar, pie, histogram, stem-and-leaf,
boxplot

--- From Chapter 22: The ---

Chapter 20 · Chapter 22. The
Chart Builder window
SPSS offers two ways to build graphs:
Chart Builder (Graphs → Chart Builder)  modern, drag-and-drop, powerful,
sometimes finicky.
Legacy Dialogs (Graphs → Legacy Dialogs)  older, simpler, faster for routine
charts.
Most thesis students survive on Legacy Dialogs. Chart Builder is what to learn when
you need a custom or complex graph.
Figure 22.1 — The Chart Builder dialog. Arrow 1 — the Gallery lists chart families (Bar, Line, Pie,
Scatter, Histogram, Boxplot, etc.). Click a category, then drag a chart icon up into the preview
canvas. Arrow 2 — your variables list. Drag a variable onto the canvas's X- or Y-axis "drop zones." 
Arrow 3 — the preview canvas; what you see here is roughly what your output chart will look like.
TIP — THE MEASURE LEVEL AFFECTS WHAT YOU CAN DRAW
SPSS will refuse to put a Nominal variable on a Y-axis where it expects a Scale
variable. If a chart will not build, your first suspect is always the Measure setting of
one of your variables (set in Variable View).
 
`,
  'cor-1': `--- From Chapter 64: Pearson correlation ---

Chapter 62 · Chapter 64.
Pearson correlation
Purpose
The Pearson correlation coefficient (r) measures the strength and direction of the
linear relationship between two continuous variables.
Key facts
r ranges from −1 (perfect negative linear) to +1 (perfect positive linear).
r = 0 means no linear association (but a curved relationship is still possible).
The sign shows direction; the absolute value shows strength.
Figure 64.1 — Four scatterplots illustrating Pearson correlation patterns. Top-left: strong positive.
Top-right: strong negative. Bottom-left: weak positive. Bottom-right: near zero.
When to use it
Both variables are continuous (scale).
 
 
 
 

The relationship is approximately linear (check scatterplot).
Both variables are approximately normal.
No extreme outliers.
When NOT to use it
One or both variables are ordinal → use Spearman's rho (Chapter 65).
The relationship is curved → fit a regression model or transform.
Outliers are present → Pearson can be very misleading.
The two variables are categorical → use chi-square (Chapter 63).
Hypotheses
H₀: W = 0 (no linear relationship in the population).
H₁: W ≠ 0.
Effect-size benchmarks (Cohen)
r Strength
.10 Small
.30 Medium
.50 Large
Running
Analyze → Correlate → Bivariate
Move two or more continuous variables into Variables.
Tick Pearson (default).
Tick Flag significant correlations.
Click Options… → tick Means and standard deviations. Continue.
OK.
Syntax
CORRELATIONS /VARIABLES=study_hours math_score motivation
 /PRINT=TWOTAIL NOSIG
 
 
 
 
 
 
 
 
 
1. 
2. 
3. 
4. 
5. 

 /STATISTICS DESCRIPTIVES
 /MISSING=PAIRWISE.
Worked example with real data
Research question:Are study hours, motivation, and attendance related
to mathematics performance in our 120-student sample?
We will request a single correlation matrix involving four continuous variables:
study_hours, math_score, motivation, attendance. This produces a 4 x 4 matrix with 6
unique pairs of correlations.
Figure 64.2 — Pearson correlation matrix. Arrow 1 — r between study_hours and math_score. 
Arrow 2 — its significance. Arrow 3 — sample size for that pair.

The output — Correlations table
study_hoursmath_scoremotivationattendance
study_hoursPearson
Correlation
1 .193* .082 .041
Sig. (2-tailed).038 .376 .660
N 119 116 118 119
math_scorePearson
Correlation
.193* 1 .154 -.178
Sig. (2-tailed).038 .098 .054
N 116 117 116 117
motivationPearson
Correlation
.082 .154 1 .029
Sig. (2-tailed).376 .098 .755
N 118 116 119 119
attendancePearson
Correlation
.041 -.178.029 1
Sig. (2-tailed).660 .054 .755
N 119 117 119 120
* Correlation is significant at the 0.05 level (2-tailed).
Line-by-line — what every number means
The matrix is symmetric (study_hours x math_score = math_score x study_hours),
so we read only the upper or lower triangle. There are 6 unique correlations.
study_hours x math_score: r = .193, p = .038, N = 116. - Sign is positive
→ more study hours, higher math scores. - Magnitude .193 is small (Cohen: .10
small, .30 medium, .50 large). - p = .038 < .05 → statistically significant. ✓
Asterisk confirms. - r² = .037 → study hours "explains" about 3.7% of the
variance in math scores. Most of math score is not about hours; only a sliver is. -
N = 116 for this pair (not 120  four students had missing data on one of the
two variables under pairwise deletion).
1. 

study_hours x motivation: r = .082, p = .376, N = 118. - Tiny positive
correlation, not significant. Students who study more aren't notably more
motivated and vice-versa. (Or perhaps the motivation scale's range is too
narrow to detect a relationship.)
study_hours x attendance: r = .041, p = .660, N = 119. - Essentially zero
correlation. Hours of study and attendance percentage are unrelated in this
sample.
math_score x motivation: r = .154, p = .098, N = 116. - A small positive
trend that does not reach the conventional .05 threshold. Often called
"marginally significant"  but APA 7 discourages that language; better to say
"did not reach statistical significance". - r² = .024  about 2.4% of variance
shared.
math_score x attendance: r = −.178, p = .054, N = 117. - Surprise! The
correlation is negative  students with higher attendance score slightly lower
in math. Just barely above the .05 cut-off (p = .054). - Counter-intuitive. Possible
explanations: (a) sampling noise  with r near zero in the population, samples
can flip sign. (b) a real but weak suppression effect  maybe the highest-
attending students include strugglers who attend because they need extra help.
Don't speculate beyond the data  flag it as needing further investigation.
motivation x attendance: r = .029, p = .755, N = 119. - Effectively zero. No
relationship.
The supervisor-narrative paragraph
"Six correlations. Let me scan the matrix... Only one is significant:
study_hours with math_score, r = .19, p = .038. That's small — only about
4% shared variance. Math x motivation is borderline (r = .15, p = .098)
and math x attendance is curiously negative (r = −.18, p = .054).
Everything else is near zero. So the picture is: weak relationships all
round, with study hours being the only reliable (if small) correlate of math
performance. Two things to note: (1) the negative attendance effect is
unusual and we'd want to investigate further — could be sample-specific;
(2) sample sizes vary between pairs (N from 116 to 120) because of
pairwise deletion of missing data. In a thesis I'd note that explicitly."
2. 
3. 
4. 
5. 
6. 

APA write-up
APA-STYLE PARAGRAPH
Pearson correlations were computed among study hours, mathematics
score, motivation, and attendance. Of the six bivariate associations
examined, only the correlation between study hours and mathematics
score was statistically significant, r(114) = .19, p = .038, 95% CI
[.01, .36], representing a small effect according to Cohen (1988).
Mathematics score correlated marginally with motivation (r = .15, p =
.098) and weakly negatively with attendance (r = −.18, p = .054),
although neither reached statistical significance. The remaining
correlations were small in magnitude (|r| ≤ .08) and non-significant.
Sample sizes ranged from 116 to 119 due to pairwise deletion of missing
values. 
What if the result had been different?
Scenario A — what if r had been .52 with N = 116?
"Then we'd have a large effect (Cohen), r² ≈ .27 — over a quarter of math-
score variance explained by study hours. We would report it as a strong,
reliable, theoretically meaningful relationship. But still resist saying 'study
hours cause higher math scores' — correlation is not causation. The right
phrasing is 'study hours predict math scores' or 'are associated with'."
Scenario B — what if r had been .19 but N had been 1,200?
"Same r, much bigger sample. p would be < .001 — strongly significant.
But the magnitude (.19) is still small. This is the 'large N trap': p is about
both effect size and sample size. Always look at r, not just p."
Scenario C — what if the scatterplot revealed an outlier driving r?
"One student with 60 study hours per week and 100 math score could
single-handedly drive a positive r. Always inspect a scatterplot before
reporting r. A trimmed correlation (after removing the outlier) might tell a
different story. SPSS path: Graphs → Chart Builder → Scatter/Dot."

WARNING — CORRELATION ≠ CAUSATION
A significant Pearson r tells you two variables move together. It does not tell you
that one causes the other. Three rival explanations are always possible:
1. X causes Y. 2. Y causes X. 3. A third variable Z causes both.
For our finding (study_hours %t math_score, r = .19): it could be that studying
improves math, OR that students who are already good at math choose to study
more, OR that conscientiousness (a third variable) drives both. 
COMMON MISTAKES — PEARSON CORRELATION
Inferring causation. Correlation alone cannot establish that X causes Y.
Computing r without inspecting the scatterplot. Pearson can be 0 even
when the

[...continued in the full handbook...]`,
  'cor-2': `--- From Chapter 65: Spearman and Kendall ---

Chapter 63 · Chapter 65.
Spearman and Kendall
correlations
Purpose
Non-parametric alternatives to Pearson  they work on ranks rather than raw
values.
CoefficientSymbol Use for
Spearman W (rho) or
rs
Two ordinal variables, or scale variables with outliers/skew
Kendall Z (tau)Same as Spearman but more conservative; preferred when
many tied ranks
How they work
Each value is replaced by its rank. Spearman then computes a Pearson r on the
ranks. Because ranks are bounded, the result is not affected by extreme values.
When to use one over the other
Spearman is the default non-parametric correlation; report it whenever
Pearson is unsuitable.
Kendall is preferred when many tied ranks occur (e.g. short Likert scales).
Running
Analyze → Correlate → Bivariate. Tick Spearman or Kendall's tau-b instead of
(or in addition to) Pearson.
 
 

Worked example with real data
Research question:Is form level (Form 1, 2, 3, 4 — an ordinal variable)
related to motivation? In other words, do students in higher forms tend to
be more (or less) motivated?
form is ordinal (Form 4 > Form 3 > Form 2 > Form 1 in years of schooling, but the
"distance" between Form 1 and Form 2 is not necessarily the same as between Form
3 and Form 4 in terms of any underlying quantity). Pearson, which treats numbers as
interval-scale, is not strictly appropriate. Spearman (working on ranks) is the right
tool.
The output — Spearman
form motivation
form Correlation Coefficient1.000.058
Sig. (2-tailed). .528
N 119 119
motivation Correlation Coefficient.058 1.000
Sig. (2-tailed).528 .
N 119 119
The output — Kendall's tau-b
form motivation
form Correlation Coefficient1.000.031
Sig. (2-tailed) . .650
N 119 119
Line-by-line — what every number means
N = 119. One student missing motivation, otherwise all there.
Spearman ρ = .058. Tiny positive correlation between form level and
motivation. Effectively zero.
Sig. (2-tailed) = .528. Massively above .05. We fail to reject HÔ: there is no
monotonic relationship between form level and motivation in this sample.
1. 
2. 
3. 

Kendall τ = .031, p = .650. Even smaller, also non-significant. Kendall and
Spearman almost always agree on direction; Kendall tends to give smaller
absolute values because it is more conservative.
Why both ρ and τ are near zero: they tell the same story. Older students
aren't notably more or less motivated than younger students. The two
coefficients converge when there's no real signal.
What ρ means substantively. Spearman W measures monotonic association
 if x increases, does y tend to increase (or decrease) too?  without requiring
the increase to be linear. W = .058 means: knowing a student's form gives you
essentially no information about their motivation rank.
The supervisor narrative
"Spearman ρ between form and motivation is .058, p = .528, N = 119.
Kendall τ is .031, p = .650 — same conclusion, different statistic. So:
across our four form levels, motivation is essentially flat. No tendency for
students to become more (or less) motivated as they progress through
secondary school. The two non-parametric coefficients converging is
reassuring."
APA write-up
APA-STYLE — SPEARMAN AND KENDALL
Because form is an ordinal variable (Form 1–4), the relationship between
form level and academic motivation was examined using non-parametric
rank-order correlations. Neither Spearman's rho (rs(117) = .06, p =
.528) nor Kendall's tau-b (τb = .03, p = .650) revealed a significant
monotonic association between form level and motivation in this sample,
indicating no systematic change in self-reported motivation across the
four secondary school year groups. 
What if the result had been different?
Scenario A — what if ρ had been .42, p < .001?
"Then we'd have a clear positive trend: older students (higher forms) tend
to be more motivated. We'd report it as a moderate, significant association.
Worth noting: Spearman and Kendall don't tell you how much by — a 1-
form jump might be linked to 0.1 or 0.5 motivation points; for that you'd
run regression."
Scenario B — what if ρ had been −.35?
4. 
5. 
6. 

"A moderate negative association — students becoming less motivated as
they progress through school. That would actually be more theoretically
interesting (and worrying for educators) than a positive trend, and would
motivate a follow-up: is the decline biggest between specific forms? Use a
Kruskal-Wallis (Chapter 75) to break it down."
Scenario C — Spearman = .40 but Pearson = .15 on the same data?
"A huge gap between Spearman and Pearson is a warning that the
relationship is monotonic but non-linear — maybe curved, or driven by a
few outliers. Plot a scatterplot before interpreting. The honest report uses
Spearman and notes the non-linearity."
Chapter 65 — Summary
Spearman and Kendall correlate ranks instead of raw values.
Use them for ordinal data, skewed scale data, or outlier-prone data.
Report rs or Z with df and p as for Pearson.
When Spearman and Kendall agree, you have a robust conclusion.
 
 
 
`,
  'cor-3': `--- From Chapter 66: Point- ---

Chapter 64 · Chapter 66. Point-
biserial and partial correlations
Point-biserial correlation
A special case of Pearson r used when one variable is continuous and the other is
binary (two categories coded 0 and 1). Mathematically identical to Pearson; just
describes a continuous-binary pair.
Example
Correlation between gender (coded 0 = male, 1 = female) and math_score. The
result tells you both the strength of association and the direction (positive r → girls
score higher on average).
Running
Treat the binary variable as numeric (0/1) and run a Pearson correlation as in
Chapter 64. SPSS calls it Pearson, but it is interpreted as point-biserial.
Partial correlation
The Pearson correlation between X and Y after statistically removing the linear
effect of one or more control variables (Z).
Why it matters — the analogy
ANALOGY — TWO DOORS OF A NOISY HOUSE
Imagine you want to know how strongly two people's voices are linked. You stand
outside a house with two windows and listen. But there is also a loud radio (the
control variable) blaring in the middle of the house, and its sound is leaking through
both windows. The voices seem correlated partly because they both correlate with
the radio.
Partial correlation is like turning the radio off, then listening again. What's left is the
"pure" association between the two voices. 

When to use it
Both X and Y are continuous.
You suspect a third (or more) continuous variable Z is "leaking" into the
relationship.
You want the XY association adjusted for Z.
Running it
Analyze → Correlate → Partial. Move X and Y into Variables and the control into
Controlling for.
Worked example with real data
Research question:We saw in Chapter 64 that study_hours and
math_score correlate at r = .19, p = .038. We also saw that motivation
correlates with both study_hours (r = −.11) and math_score (r = .15).
Could the study-hours/math relationship be partly explained by
motivation? In other words: among students with similar motivation, do
study hours still relate to math performance?
Variables: - X = study_hours - Y = math_score - Control Z = motivation - N (listwise)
= 115
The output — Correlations (controlling for motivation)
study_hours math_score
study_hours Correlation 1.000 .212
Significance (2-tailed). .023
df 0 112
math_score Correlation .212 1.000
Significance (2-tailed).023 .
df 112 0
Line-by-line — what every number means
Zero-order Pearson (no control) r = .193, p = .038, N = 116. (This is what
we computed in Chapter 64.)
 
 
 
1. 

Partial r = .212, p = .023, df = 112. After removing motivation from both X
and Y, the residual association is .212  actually slightly larger than the zero-
order .193.
df = 112 = N - 2 - k, where k = 1 (one control variable). So 115 - 2 - 1 =
112. ✓
The partial r went UP, not down. This means motivation is not explaining the
study_hours → math relationship. If anything, motivation was very slightly 
suppressing it (because study_hours and motivation correlate negatively at -.11
in this sample, controlling for motivation strengthens the study-math link a
touch).
Comparison rule of thumb:
If partial r vs zero-
order r is… Interpretation
Almost identicalThe control variable does not confound the relationship
Substantially smallerThe control variable explains a chunk of the apparent
association (confounding)
Drops to near zeroThe "relationship" between X and Y was actually entirely
through Z (full mediation/confounding)
Slightly larger Suppression  the control was masking part of the XY signal
The supervisor narrative
"Zero-order Pearson study_hours x math is r = .19, p = .038. After
partialling out motivation, the residual correlation is .21, p = .023 —
almost unchanged. So the modest study–math link is not explained by
motivation differences. Students with similar motivation levels still show
that more study hours go with higher math scores. The relationship
survives the control. Note the partial r is very slightly larger than the zero-
order one — that's a suppression effect, because study_hours and
motivation correlate negatively (r = −.11) in this sample. Nothing to worry
about."
2. 
3. 
4. 
5. 

APA write-up
APA-STYLE — PARTIAL CORRELATION
A partial correlation was conducted to examine the relationship between
weekly study hours and mathematics score, controlling for academic
motivation. The zero-order correlation between study hours and
mathematics score was significant, r(114) = .19, p = .038. After
controlling for motivation, the partial correlation remained
significant and was of similar magnitude, rpartial(112) = .21, p = .023.
The persistence of the association indicates that the study-hours/
mathematics-score relationship is not accounted for by individual
differences in motivation. 
What if the result had been different?
Scenario A — what if partial r had dropped from .19 to .04, p = .67?
"Then motivation would be 'eating' nearly all of the apparent study–math
relationship. That's classic confounding: students who are more motivated
study more and score higher, and once we level the playing field by
adjusting for motivation, the apparent study effect evaporates. We'd
conclude the original Pearson was misleading."
Scenario B — what if partial r had been .42 (much larger than zero-order
.19)?
"A strong suppression effect. The control variable was 'hiding' a real X–Y
link. After removing its disguise, the true association emerges. Rare but
possible — usually signals a complex theoretical relationship worth
digging into."
Scenario C — what if we controlled for TWO variables (motivation AND
attendance)?
"Same procedure; just move two variables to 'Controlling for'. The df drops
to 115 − 2 − 2 = 111. Each additional control eats one df. With small
samples, controlling for too many variables wastes power."

Chapter 66 — Summary
Point-biserial is Pearson with a binary variable; no new procedure.
Partial correlation removes the linear effect of one or more covariates.
Comparing original and partial r reveals confounding (drop) or
suppression (rise).
df for partial r = N - 2 - k, where k is the number of controls.
 
 
 
`,
  'cor-4': `--- From Chapter 64: Pearson correlation ---

Chapter 62 · Chapter 64.
Pearson correlation
Purpose
The Pearson correlation coefficient (r) measures the strength and direction of the
linear relationship between two continuous variables.
Key facts
r ranges from −1 (perfect negative linear) to +1 (perfect positive linear).
r = 0 means no linear association (but a curved relationship is still possible).
The sign shows direction; the absolute value shows strength.
Figure 64.1 — Four scatterplots illustrating Pearson correlation patterns. Top-left: strong positive.
Top-right: strong negative. Bottom-left: weak positive. Bottom-right: near zero.
When to use it
Both variables are continuous (scale).
 
 
 
 

The relationship is approximately linear (check scatterplot).
Both variables are approximately normal.
No extreme outliers.
When NOT to use it
One or both variables are ordinal → use Spearman's rho (Chapter 65).
The relationship is curved → fit a regression model or transform.
Outliers are present → Pearson can be very misleading.
The two variables are categorical → use chi-square (Chapter 63).
Hypotheses
H₀: W = 0 (no linear relationship in the population).
H₁: W ≠ 0.
Effect-size benchmarks (Cohen)
r Strength
.10 Small
.30 Medium
.50 Large
Running
Analyze → Correlate → Bivariate
Move two or more continuous variables into Variables.
Tick Pearson (default).
Tick Flag significant correlations.
Click Options… → tick Means and standard deviations. Continue.
OK.
Syntax
CORRELATIONS /VARIABLES=study_hours math_score motivation
 /PRINT=TWOTAIL NOSIG
 
 
 
 
 
 
 
 
 
1. 
2. 
3. 
4. 
5. 

 /STATISTICS DESCRIPTIVES
 /MISSING=PAIRWISE.
Worked example with real data
Research question:Are study hours, motivation, and attendance related
to mathematics performance in our 120-student sample?
We will request a single correlation matrix involving four continuous variables:
study_hours, math_score, motivation, attendance. This produces a 4 x 4 matrix with 6
unique pairs of correlations.
Figure 64.2 — Pearson correlation matrix. Arrow 1 — r between study_hours and math_score. 
Arrow 2 — its significance. Arrow 3 — sample size for that pair.

The output — Correlations table
study_hoursmath_scoremotivationattendance
study_hoursPearson
Correlation
1 .193* .082 .041
Sig. (2-tailed).038 .376 .660
N 119 116 118 119
math_scorePearson
Correlation
.193* 1 .154 -.178
Sig. (2-tailed).038 .098 .054
N 116 117 116 117
motivationPearson
Correlation
.082 .154 1 .029
Sig. (2-tailed).376 .098 .755
N 118 116 119 119
attendancePearson
Correlation
.041 -.178.029 1
Sig. (2-tailed).660 .054 .755
N 119 117 119 120
* Correlation is significant at the 0.05 level (2-tailed).
Line-by-line — what every number means
The matrix is symmetric (study_hours x math_score = math_score x study_hours),
so we read only the upper or lower triangle. There are 6 unique correlations.
study_hours x math_score: r = .193, p = .038, N = 116. - Sign is positive
→ more study hours, higher math scores. - Magnitude .193 is small (Cohen: .10
small, .30 medium, .50 large). - p = .038 < .05 → statistically significant. ✓
Asterisk confirms. - r² = .037 → study hours "explains" about 3.7% of the
variance in math scores. Most of math score is not about hours; only a sliver is. -
N = 116 for this pair (not 120  four students had missing data on one of the
two variables under pairwise deletion).
1. 

study_hours x motivation: r = .082, p = .376, N = 118. - Tiny positive
correlation, not significant. Students who study more aren't notably more
motivated and vice-versa. (Or perhaps the motivation scale's range is too
narrow to detect a relationship.)
study_hours x attendance: r = .041, p = .660, N = 119. - Essentially zero
correlation. Hours of study and attendance percentage are unrelated in this
sample.
math_score x motivation: r = .154, p = .098, N = 116. - A small positive
trend that does not reach the conventional .05 threshold. Often called
"marginally significant"  but APA 7 discourages that language; better to say
"did not reach statistical significance". - r² = .024  about 2.4% of variance
shared.
math_score x attendance: r = −.178, p = .054, N = 117. - Surprise! The
correlation is negative  students with higher attendance score slightly lower
in math. Just barely above the .05 cut-off (p = .054). - Counter-intuitive. Possible
explanations: (a) sampling noise  with r near zero in the population, samples
can flip sign. (b) a real but weak suppression effect  maybe the highest-
attending students include strugglers who attend because they need extra help.
Don't speculate beyond the data  flag it as needing further investigation.
motivation x attendance: r = .029, p = .755, N = 119. - Effectively zero. No
relationship.
The supervisor-narrative paragraph
"Six correlations. Let me scan the matrix... Only one is significant:
study_hours with math_score, r = .19, p = .038. That's small — only about
4% shared variance. Math x motivation is borderline (r = .15, p = .098)
and math x attendance is curiously negative (r = −.18, p = .054).
Everything else is near zero. So the picture is: weak relationships all
round, with study hours being the only reliable (if small) correlate of math
performance. Two things to note: (1) the negative attendance effect is
unusual and we'd want to investigate further — could be sample-specific;
(2) sample sizes vary between pairs (N from 116 to 120) because of
pairwise deletion of missing data. In a thesis I'd note that explicitly."
2. 
3. 
4. 
5. 
6. 

APA write-up
APA-STYLE PARAGRAPH
Pearson correlations were computed among study hours, mathematics
score, motivation, and attendance. Of the six bivariate associations
examined, only the correlation between study hours and mathematics
score was statistically significant, r(114) = .19, p = .038, 95% CI
[.01, .36], representing a small effect according to Cohen (1988).
Mathematics score correlated marginally with motivation (r = .15, p =
.098) and weakly negatively with attendance (r = −.18, p = .054),
although neither reached statistical significance. The remaining
correlations were small in magnitude (|r| ≤ .08) and non-significant.
Sample sizes ranged from 116 to 119 due to pairwise deletion of missing
values. 
What if the result had been different?
Scenario A — what if r had been .52 with N = 116?
"Then we'd have a large effect (Cohen), r² ≈ .27 — over a quarter of math-
score variance explained by study hours. We would report it as a strong,
reliable, theoretically meaningful relationship. But still resist saying 'study
hours cause higher math scores' — correlation is not causation. The right
phrasing is 'study hours predict math scores' or 'are associated with'."
Scenario B — what if r had been .19 but N had been 1,200?
"Same r, much bigger sample. p would be < .001 — strongly significant.
But the magnitude (.19) is still small. This is the 'large N trap': p is about
both effect size and sample size. Always look at r, not just p."
Scenario C — what if the scatterplot revealed an outlier driving r?
"One student with 60 study hours per week and 100 math score could
single-handedly drive a positive r. Always inspect a scatterplot before
reporting r. A trimmed correlation (after removing the outlier) might tell a
different story. SPSS path: Graphs → Chart Builder → Scatter/Dot."

WARNING — CORRELATION ≠ CAUSATION
A significant Pearson r tells you two variables move together. It does not tell you
that one causes the other. Three rival explanations are always possible:
1. X causes Y. 2. Y causes X. 3. A third variable Z causes both.
For our finding (study_hours %t math_score, r = .19): it could be that studying
improves math, OR that students who are already good at math choose to study
more, OR that conscientiousness (a third variable) drives both. 
COMMON MISTAKES — PEARSON CORRELATION
Inferring causation. Correlation alone cannot establish that X causes Y.
Computing r without inspecting the scatterplot. Pearson can be 0 even
when the

[...continued in the full handbook...]`,
  'reg-1': `--- From Chapter 67: Simple ---

Chapter 65 · Chapter 67. Simple
linear regression
Purpose
Simple linear regression models the linear relationship between one predictor
(X) and one continuous outcome (Y) with the equation:
Y = b₀ + b₁X + ε
where b₀ is the intercept (Y when X = 0), b₁ is the slope (change in Y per one-unit
change in X), and ε is the residual error.
It does everything a Pearson correlation does, plus produces a usable equation for
prediction.
When to use
One continuous outcome Y.
One continuous predictor X (categorical predictors require dummy coding).
Linear relationship.
Approximately normal residuals.
Assumptions
Assumption How to check
Linearity Scatterplot of Y vs X
Independence of errorsDesign; Durbin-Watson
Normality of residualsHistogram or Q-Q plot of residuals
Homoscedasticity (equal residual variance across
X)
Scatterplot of residuals vs predicted Y
No extreme outliersStandardised residuals; Cook's
distance
 
 
 
 

Running
Analyze → Regression → Linear
Move Y (e.g. math_score) into Dependent.
Move X (e.g. study_hours) into Independent(s).
Click Statistics… → tick Estimates, Confidence intervals, Model fit, 
Descriptives, Collinearity diagnostics (relevant for multiple regression).
Continue.
Click Plots… → put ZPRED on X-axis and ZRESID on Y-axis (residual
scatterplot). Tick Histogram and Normal probability plot under
Standardized Residual Plots. Continue.
OK.
Interpreting
Model Summary table
Column Meaning
R Multiple correlation =
R Square Proportion of variance in Y explained by X
Adjusted R SquareR² adjusted for sample size and number of predictors
Std. Error of the EstimateTypical size of residuals (in DV units)
ANOVA table
Tests whether the model explains significantly more variance than the mean alone. F-
statistic and Sig.
Coefficients table
For each predictor:
B  unstandardised coefficient (slope in original units).
Std. Error  standard error of B.
Beta (β)  standardised coefficient (slope if X and Y were both z-scored).
t, Sig.  test of whether the slope differs from 0.
95% CI for B  plausible range of the slope.
1. 
2. 
3. 
4. 
5. 
 
 
 
 
 

Worked example with real data
Research question:Can weekly study hours predict mathematics score?
After listwise deletion, 116 students have valid values for both variables.
The output — three tables
Model Summary
R R Square Adjusted R Square Std. Error of the Estimate
.193.037 .029 12.728
ANOVA
Source Sum of Squares df Mean Square F Sig.
Regression715.99 1 715.99 4.422 .038
Residual18459.96 114161.93
Total 19175.95 115
Coefficients
Predictor B SE β t Sig. 95% CI
Lower
95% CI
Upper
(Constant)55.8453.119 17.901<.00149.66762.023
study_hours0.4940.235.1932.103.0380.028 0.960
Line-by-line — what every number means
R = .193. In simple regression R equals |Pearson r|  and indeed we computed
r = .193 in Chapter 64. ✓
R² = .037. Study hours explain about 3.7% of the variance in math scores.
Small.
Adjusted R² = .029. Slightly lower than R²  it penalises the model for using
one predictor. The gap between R² and adjusted R² is small here because we
have lots of df.
Std. Error of the Estimate = 12.73. The typical size of the residuals (the gap
between predicted and observed math scores). For comparison, the SD of
1. 
2. 
3. 
4. 

math_score is 12.93. The model has reduced unexplained variation only
marginally  from 12.93 to 12.73.
ANOVA F = 4.42, df = (1, 114), p = .038. Tests whether the whole model
explains more variance than the mean alone. Significant.
(Constant) B = 55.845. The predicted math score for a student with zero
study hours. This is an extrapolation (the minimum study_hours in our data is
1.8), but it gives the line a y-intercept.
study_hours B = 0.494.The headline. Each additional hour of weekly study
is associated with a 0.49-point increase in predicted math score, on average.
Roughly: 10 extra study hours → 5 extra math marks.
SE of B = 0.235. Standard error of the slope.
β (Beta) = .193. The standardised coefficient  what the slope would be if
both variables were z-scored. In simple regression H = r = .193. ✓
t = 2.103. B/SE = 0.494/0.235 = 2.10. ✓
Sig. = .038. Same as the ANOVA p-value (always equal in simple regression
because one predictor means F = t²).
95% CI for B [0.028, 0.960]. We are 95% confident that the population slope
is between 0.03 and 0.96 marks per study hour. The interval excludes zero 
significant  but it's wide, including very small (basically negligible) and
modest values.
The regression equation
predicted math_score = 55.85 + 0.49 x study_hours
E.g., a student studying 15 hours per week is predicted to score: 55.85 + 0.49 x 15 =
63.2 marks.
Supervisor narrative
"Simple regression of math on study hours. R² is .037 — about 4% of math
variance explained. Tiny. But the model is statistically significant: F(1, 114)
= 4.42, p = .038. The slope is 0.49 marks per hour of weekly study, 95% CI
[0.03, 0.96], β = .19. The CI is wide and starts very near zero — so we
know the effect is non-zero, but it could be as small as 0.03 marks per
hour, which is practically nothing, or as large as ~1 mark per hour. The
equation predicts a 15-hour-per-week student gets about 63 marks.
Conclusion: study hours are reliably (but weakly) linked to math
performance. Most math variance lies elsewhere — innate ability, prior
knowledge, teaching quality, motivation, etc. This is exactly why we move
to multiple regression next — one predictor cannot do justice to
performance."
5. 
6. 
7. 
8. 
9. 
10. 
11. 
12. 

APA write-up
APA-STYLE — SIMPLE LINEAR REGRESSION
A simple linear regression was conducted to examine whether weekly
study hours predicted mathematics score. The model was statistically
significant, F(1, 114) = 4.42, p = .038, R² = .037, indicating that
approximately 3.7% of the variance in mathematics scores was accounted
for by study hours. The unstandardised regression equation was:
math_score = 55.85 + 0.49 x study_hours. Each additional hour of weekly
study was associated with a 0.49-point increase in mathematics score
(95% CI [0.03, 0.96]), β = .19, t(114) = 2.10, p = .038. Although
statistically reliable, the effect was small, and study hours alone
explained a modest proportion of variation in mathematics achievement. 
What if the result had been different?
Scenario A — what if R² had been .35 and B = 1.4?
"Strong, useful model — 35% of math-score variance explained by hours
alone, and each hour worth nearly 1.5 marks. We could confidently say
study hours are a major driver of performance and recommend a target
(e.g., 15+ hours per week)."
Scenario B — what if the constant had been negative (e.g., −5)?
"Then the predicted score at zero study hours would be −5.
Mathematically fine, but practically meaningless — you can't score below
zero. Useful reminder: the intercept is just where the regression line
crosses Y = 0 in math, not a real-world prediction for X = 0 unless X = 0 is
in your data range."
Scenario C — what if the residual plot showed a funnel shape
(heteroscedasticity)?
"Then the assumption of equal error variance is violated. The CIs and p-
values would be slightly off. Remedies: log-transform Y, use robust
standard errors (HC3), or weighted least squares. For a thesis it's enough
to report the violation and discuss it as a limitation."

Chapter 67 — Summary
Simple linear regression predicts Y from one X.
Report R², F, B and 95% CI, H, t, p.
Always check residual plots for assumption violations.
 
 
`,
  'reg-2': `--- From Chapter 68: Multiple regression ---

Chapter 66 · Chapter 68.
Multiple regression
Purpose
Multiple regression predicts a continuous outcome Y from two or more predictors
(X₁, X₂, …) simultaneously, isolating the unique contribution of each.
Y = b₀ + b₁X₁ + b₂X₂ + b₃X₃ + … + ε
Each coefficient b is interpreted as: the change in Y per one-unit increase in that
predictor, holding all other predictors constant.
When to use
One continuous outcome.
Two or more predictors (continuous, or categorical via dummy coding).
You want to estimate each predictor's unique effect.
Assumptions — the long list
Multiple regression has more assumptions than any other test in this book.
 
 
 

Assumption How to check
1. Linearity (each X with Y)Scatterplots; partial regression plots
2. Independence of errorsDurbin-Watson statistic (1.52.5 acceptable)
3. Normality of residualsHistogram + Q-Q plot of residuals
4. HomoscedasticityScatterplot of standardised residuals vs predicted
values
5. No multicollinearityTolerance > 0.10 and VIF < 10 (or < 5 for stricter)
6. No extreme outliers / influential
cases
Cook's distance < 1; standardised residuals within
±3
7. Adequate sample size%ß 20 cases per predictor; %ß 50 + 8k for testing R²
Multicollinearity in detail
Multicollinearity occurs when predictors are strongly correlated with each other.
The model still fits, but the individual coefficients become unstable and their
standard errors balloon.
Tolerance = 1 - R² (each predictor regressed on the others). Low tolerance =
bad.
VIF (Variance Inflation Factor) = 1 / Tolerance. High VIF = bad.
VIF Concern
< 5 Acceptable
510Worrying  consider dropping or combining predictors
> 10Serious multicollinearity
 
 

Homoscedasticity in detail
Figure 68.1 — Scatterplot of standardised residuals vs standardised predicted values. Arrow 1 —
an even rectangular cloud means homoscedasticity holds. A funnel shape (narrow on one end, wide
on the other) means heteroscedasticity, and the standard errors are unreliable. Arrow 2 — points
outside ±2 SD are potential outliers; outside ±3 SD should be investigated.
Running
Analyze → Regression → Linear

Figure 68.2 — The Linear Regression dialog. Arrow 1 — the DV . Arrow 2 — multiple predictors
entered together. Arrow 3 — Statistics… for confidence intervals, collinearity diagnostics, and
Durbin-Watson.
Steps as for simple regression, but move several predictors into Independent(s).
Worked example with real data
Research question:Jointly, how well do study hours, motivation, and
attendance predict mathematics score? Which is the strongest unique
predictor?
After listwise deletion across all four variables, 115 students remain.

Figure 68.3 — Multiple regression output for math_score predicted by study_hours, motivation,
attendance (N = 115). Arrow 1 — R². Arrow 2 — model F and Sig. Arrow 3 — each predictor's
significance. Arrow 4 — VIF column.
Model Summary
R R Square Adjusted R Square Std. Error of the Estimate
.297.088 .064 12.510
ANOVA
Source Sum of Squares df Mean Square F Sig.
Regression1685.04 3 561.68 3.589 .016
Residual17372.15 111156.51
Total 19057.19 114

Coefficients
Predictor B SE β t Sig.
95%
CI
Lower
95%
CI
Upper
ToleranceVIF
(Constant)71.96517.624 4.083<.00137.04106.89
study_hours0.5080.234.1932.175.032 0.0450.972.978 1.022
motivation2.0951.007.1842.080.040 0.0994.091.981 1.019
attendance-0.2960.189-.139-1.566.120-0.6700.078.987 1.013
Line-by-line — what every number means
I'll go through this output in the order an examiner would read it  global model
first, then assumptions, then individual predictors.
Stage 1: the overall model
R = .297. The multiple correlation between the model's predicted scores and
observed math scores. (Not interpretable in absolute terms; we look at R²
instead.)
R² = .088. The model explains 8.8% of the variance in math scores. A small
effect by Cohen's R² benchmarks (.02 small, .13 medium, .26 large).
Adjusted R² = .064. Penalised for using 3 predictors with N = 115. The gap of
about 2.4 percentage points (R² - adj R²) is normal.
Std. Error of the Estimate = 12.51. Typical residual size. Compare to SD of
math_score = 12.93 → model reduces unexplained variability only slightly.
ANOVA F(3, 111) = 3.59, p = .016. The whole model fits significantly better
than the mean alone. ✓ Reject the "all betas = 0" null.
Stage 2: assumption check — multicollinearity
All VIFs ≈ 1.02. Far below the warning threshold of 5 (and the alarm threshold
of 10). The three predictors are essentially independent of one another  each
carries unique information. ✓
All Tolerances ≈ .98. (= 1/VIF; same conclusion expressed differently.)
Stage 3: individual predictors
(Constant) B = 71.97, p < .001. The intercept. Predicted math score when all
three predictors are zero. Largely uninterpretable (no student has 0
study_hours, 0 motivation, 0% attendance), but used in the prediction equation.
1. 
2. 
3. 
4. 
5. 
1. 
2. 
1. 

study_hours B = 0.508, p = .032. Each extra hour of weekly study is
associated with a 0.51-point increase in math score, holding motivation and
attendance constant. Significant. - β = .193. When everything is z-scored, a 1-
SD increase in study hours is associated with a 0.19-SD increase in math score.
- 95% CI [0.045, 0.972]. The interval excludes zero (confirms significance) but
is wide.
motivation B = 2.095, p = .040. A 1-point increase on the 17 motivation
scale is associated with a 2.1-point increase in math score, holding the others
constant. Significant.
β = .184. Similar standardised magnitude to study hours.
95% CI [0.10, 4.09]. Wide, but excludes zero.
attendance B = −0.296, p = .120. A 1-percentage-point increase in
attendance is associated with a 0.30-point decrease in math score, holding the
others constant. Not significant. Negative direction matches the negative
correlation we saw in Chapter 64.
95% CI [−0.67, 0.08]. Spans zero, confirming non-significance.
Standardised β comparison. To rank predictor importance, compare |β|s, not
|B|s. Study hours ( H = .19), motivation ( H = .18), attendance ( H = .14). Study
hours is marginally the strongest unique predictor, but study hours and
motivation are essentially tied.
The regression equation
predicted math_score = 71.97 + 0.51 x study_hours + 2.10 x
motivation − 0.30 x attendance
E.g., a student with 15 study hours, motivation = 5, attendance = 90: 71.97 + 0.51 x
15 + 2.10 x 5 - 0.30 x 90 = 71.97 + 7.65 + 10.50 - 27.00 = 63.1 marks.
The supervisor-narrative paragraph
"Three-predictor model. R² is .088 — about 9% of math variance explained.
Adjusted R² .064. Model significant: F(3, 111) = 3.59, p = .016. VIFs all
near 1, so no multicollinearity worry. Looking at predictors: study_hours
significant (B = 0.51 per hour, p = .032), motivation significant (B = 2.10
per scale point, p = .040), attendance non-significant (B = −0.30, p =
.120) and counter-intuitively negative. Standardised betas roughly equal
for the two significant predictors (β ≈ .19 and .18). So the model paints
this picture: study hours and motivation each independently add to math
performance, by similar standardised amounts, but neither is a strong
predictor on its own and the model still leaves over 90% of math variance
2. 
3. 
'P 
'P 
4. 
'P 
5. 

unexplained. The negative attendance coefficient is worth flagging in the
discussion — possibly a sample anomaly or a suppression effect; we should
not over-interpret a non-significant result either way."
APA write-up
APA-STYLE PARAGRAPH — MULTIPLE REGRESSION
A multiple linear regression was conducted to examine whether weekly
study hours, academic motivation, and attendance percentage jointly
predicted mathematics score. The overall model was statistically
significant, F(3, 111) = 3.59, p = .016, accounting for 8.8% of the
variance in mathematics score (R² = .088, adjusted R² = .064).
Multicollinearity was not a concern (all VIF < 1.03). Two predictors
uniquely contributed to the model: study hours (B = 0.51, 95% CI [0.05,
0.97], β = .19,

[...continued in the full handbook...]`,
  'reg-3': `--- From Chapter 68: Multiple regression ---

Chapter 66 · Chapter 68.
Multiple regression
Purpose
Multiple regression predicts a continuous outcome Y from two or more predictors
(X₁, X₂, …) simultaneously, isolating the unique contribution of each.
Y = b₀ + b₁X₁ + b₂X₂ + b₃X₃ + … + ε
Each coefficient b is interpreted as: the change in Y per one-unit increase in that
predictor, holding all other predictors constant.
When to use
One continuous outcome.
Two or more predictors (continuous, or categorical via dummy coding).
You want to estimate each predictor's unique effect.
Assumptions — the long list
Multiple regression has more assumptions than any other test in this book.
 
 
 

Assumption How to check
1. Linearity (each X with Y)Scatterplots; partial regression plots
2. Independence of errorsDurbin-Watson statistic (1.52.5 acceptable)
3. Normality of residualsHistogram + Q-Q plot of residuals
4. HomoscedasticityScatterplot of standardised residuals vs predicted
values
5. No multicollinearityTolerance > 0.10 and VIF < 10 (or < 5 for stricter)
6. No extreme outliers / influential
cases
Cook's distance < 1; standardised residuals within
±3
7. Adequate sample size%ß 20 cases per predictor; %ß 50 + 8k for testing R²
Multicollinearity in detail
Multicollinearity occurs when predictors are strongly correlated with each other.
The model still fits, but the individual coefficients become unstable and their
standard errors balloon.
Tolerance = 1 - R² (each predictor regressed on the others). Low tolerance =
bad.
VIF (Variance Inflation Factor) = 1 / Tolerance. High VIF = bad.
VIF Concern
< 5 Acceptable
510Worrying  consider dropping or combining predictors
> 10Serious multicollinearity
 
 

Homoscedasticity in detail
Figure 68.1 — Scatterplot of standardised residuals vs standardised predicted values. Arrow 1 —
an even rectangular cloud means homoscedasticity holds. A funnel shape (narrow on one end, wide
on the other) means heteroscedasticity, and the standard errors are unreliable. Arrow 2 — points
outside ±2 SD are potential outliers; outside ±3 SD should be investigated.
Running
Analyze → Regression → Linear

Figure 68.2 — The Linear Regression dialog. Arrow 1 — the DV . Arrow 2 — multiple predictors
entered together. Arrow 3 — Statistics… for confidence intervals, collinearity diagnostics, and
Durbin-Watson.
Steps as for simple regression, but move several predictors into Independent(s).
Worked example with real data
Research question:Jointly, how well do study hours, motivation, and
attendance predict mathematics score? Which is the strongest unique
predictor?
After listwise deletion across all four variables, 115 students remain.

Figure 68.3 — Multiple regression output for math_score predicted by study_hours, motivation,
attendance (N = 115). Arrow 1 — R². Arrow 2 — model F and Sig. Arrow 3 — each predictor's
significance. Arrow 4 — VIF column.
Model Summary
R R Square Adjusted R Square Std. Error of the Estimate
.297.088 .064 12.510
ANOVA
Source Sum of Squares df Mean Square F Sig.
Regression1685.04 3 561.68 3.589 .016
Residual17372.15 111156.51
Total 19057.19 114

Coefficients
Predictor B SE β t Sig.
95%
CI
Lower
95%
CI
Upper
ToleranceVIF
(Constant)71.96517.624 4.083<.00137.04106.89
study_hours0.5080.234.1932.175.032 0.0450.972.978 1.022
motivation2.0951.007.1842.080.040 0.0994.091.981 1.019
attendance-0.2960.189-.139-1.566.120-0.6700.078.987 1.013
Line-by-line — what every number means
I'll go through this output in the order an examiner would read it  global model
first, then assumptions, then individual predictors.
Stage 1: the overall model
R = .297. The multiple correlation between the model's predicted scores and
observed math scores. (Not interpretable in absolute terms; we look at R²
instead.)
R² = .088. The model explains 8.8% of the variance in math scores. A small
effect by Cohen's R² benchmarks (.02 small, .13 medium, .26 large).
Adjusted R² = .064. Penalised for using 3 predictors with N = 115. The gap of
about 2.4 percentage points (R² - adj R²) is normal.
Std. Error of the Estimate = 12.51. Typical residual size. Compare to SD of
math_score = 12.93 → model reduces unexplained variability only slightly.
ANOVA F(3, 111) = 3.59, p = .016. The whole model fits significantly better
than the mean alone. ✓ Reject the "all betas = 0" null.
Stage 2: assumption check — multicollinearity
All VIFs ≈ 1.02. Far below the warning threshold of 5 (and the alarm threshold
of 10). The three predictors are essentially independent of one another  each
carries unique information. ✓
All Tolerances ≈ .98. (= 1/VIF; same conclusion expressed differently.)
Stage 3: individual predictors
(Constant) B = 71.97, p < .001. The intercept. Predicted math score when all
three predictors are zero. Largely uninterpretable (no student has 0
study_hours, 0 motivation, 0% attendance), but used in the prediction equation.
1. 
2. 
3. 
4. 
5. 
1. 
2. 
1. 

study_hours B = 0.508, p = .032. Each extra hour of weekly study is
associated with a 0.51-point increase in math score, holding motivation and
attendance constant. Significant. - β = .193. When everything is z-scored, a 1-
SD increase in study hours is associated with a 0.19-SD increase in math score.
- 95% CI [0.045, 0.972]. The interval excludes zero (confirms significance) but
is wide.
motivation B = 2.095, p = .040. A 1-point increase on the 17 motivation
scale is associated with a 2.1-point increase in math score, holding the others
constant. Significant.
β = .184. Similar standardised magnitude to study hours.
95% CI [0.10, 4.09]. Wide, but excludes zero.
attendance B = −0.296, p = .120. A 1-percentage-point increase in
attendance is associated with a 0.30-point decrease in math score, holding the
others constant. Not significant. Negative direction matches the negative
correlation we saw in Chapter 64.
95% CI [−0.67, 0.08]. Spans zero, confirming non-significance.
Standardised β comparison. To rank predictor importance, compare |β|s, not
|B|s. Study hours ( H = .19), motivation ( H = .18), attendance ( H = .14). Study
hours is marginally the strongest unique predictor, but study hours and
motivation are essentially tied.
The regression equation
predicted math_score = 71.97 + 0.51 x study_hours + 2.10 x
motivation − 0.30 x attendance
E.g., a student with 15 study hours, motivation = 5, attendance = 90: 71.97 + 0.51 x
15 + 2.10 x 5 - 0.30 x 90 = 71.97 + 7.65 + 10.50 - 27.00 = 63.1 marks.
The supervisor-narrative paragraph
"Three-predictor model. R² is .088 — about 9% of math variance explained.
Adjusted R² .064. Model significant: F(3, 111) = 3.59, p = .016. VIFs all
near 1, so no multicollinearity worry. Looking at predictors: study_hours
significant (B = 0.51 per hour, p = .032), motivation significant (B = 2.10
per scale point, p = .040), attendance non-significant (B = −0.30, p =
.120) and counter-intuitively negative. Standardised betas roughly equal
for the two significant predictors (β ≈ .19 and .18). So the model paints
this picture: study hours and motivation each independently add to math
performance, by similar standardised amounts, but neither is a strong
predictor on its own and the model still leaves over 90% of math variance
2. 
3. 
'P 
'P 
4. 
'P 
5. 

unexplained. The negative attendance coefficient is worth flagging in the
discussion — possibly a sample anomaly or a suppression effect; we should
not over-interpret a non-significant result either way."
APA write-up
APA-STYLE PARAGRAPH — MULTIPLE REGRESSION
A multiple linear regression was conducted to examine whether weekly
study hours, academic motivation, and attendance percentage jointly
predicted mathematics score. The overall model was statistically
significant, F(3, 111) = 3.59, p = .016, accounting for 8.8% of the
variance in mathematics score (R² = .088, adjusted R² = .064).
Multicollinearity was not a concern (all VIF < 1.03). Two predictors
uniquely contributed to the model: study hours (B = 0.51, 95% CI [0.05,
0.97], β = .19,

[...continued in the full handbook...]`,
  'reg-4': null,
  'anova-1': `--- From Chapter 57: One- ---

Chapter 55 · Chapter 57. One-
Way ANOVA (with post-hoc
tests)
Purpose
The one-way ANOVA (Analysis of Variance) compares the means of three or more
independent groups on one continuous variable to test whether at least one group
differs from the others.
When to use it
One continuous (scale) DV.
One categorical IV with three or more independent groups (e.g. Form 1,
Form 2, Form 3, Form 4).
Each pupil is in only one group.
When NOT to use it
Two groups → use independent-samples t-test (Chapter 54).
Same pupils across conditions → use repeated-measures ANOVA (Chapter 59).
Two or more IVs → use two-way ANOVA (Chapter 58).
DV is ordinal or strongly non-normal → use Kruskal-Wallis (Chapter 75).
Why "Analysis of Variance" — the name puzzle
The test compares means, but it is called "Analysis of Variance" because it works by
comparing two kinds of variance:
Between-group variance  how much the group means differ from the overall
(grand) mean.
Within-group variance  how much pupils inside the same group differ from
their group's mean.
The ratio of these two is the F-statistic:
 
 
 
 
 
 
 
 
 

F ≈ Between-group variance / Within-group variance
If group means are all similar, F will be near 1. If group means are very different
(relative to within-group noise), F will be large.
ANALOGY — DISTINGUISHING MUSIC FROM NOISE
You walk past four classrooms. In each, pupils are humming. If all four classrooms
hum the same tune (low between-classroom variance), the four classrooms sound
alike. If one classroom hums a clearly different tune, you can pick it out  but only if
the pupils within each classroom are humming together (low within-classroom
variance). ANOVA is the formal version of "can I hear a difference between rooms
above the background hum within each room?"
Research questions
Do mean mathematics scores differ across Forms 1, 2, 3, and 4?
Do four schools differ in mean motivation?
Do three teaching methods produce different mean exam results?
Hypotheses
H₀: RÕ = RÖ = Rx = ... (all population means are equal).
H₁: at least one mean differs from the others.
Notice HÕ is vague. ANOVA tells you "at least one group differs" but does not say
which one(s). That is the job of post-hoc tests.
Assumptions
Assumption How to check
1. IndependenceDesign feature  random sampling, no
clustering
2. Continuous DVVariable View
3. Approximate normality within each
group
Shapiro-Wilk per group; robust when n %ß 30 per
group
4. Homogeneity of variancesLevene's Test (in the output)
 
 
 
 
 

If homogeneity fails, use Welch's ANOVA (also reported in the output).
Running the test in SPSS
Analyze → Compare Means → One-Way ANOVA
Figure 57.1 — The One-Way ANOVA dialog. Arrow 1 — move the continuous DV into Dependent
List. Arrow 2 — move the categorical IV into Factor. Arrow 3 — click Post Hoc… to choose follow-
up comparisons.
Step-by-step
Analyze → Compare Means → One-Way ANOVA.
Move math_score into Dependent List.
Move form into Factor.
Click Options… → tick Descriptive, Homogeneity of variance test, Welch, 
Means plot. Continue.
Click Post Hoc… → tick Tukey (most common; safe choice). Continue.
Click OK.
Syntax
ONEWAY math_score BY form
 /STATISTICS DESCRIPTIVES HOMOGENEITY WELCH
 /PLOT MEANS
1. 
2. 
3. 
4. 
5. 
6. 

 /MISSING ANALYSIS
 /POSTHOC=TUKEY ALPHA(0.05).
Post-hoc tests — which one and why
After a significant overall F, you compare each pair of groups while controlling the
family-wise Type I error rate. Common choices:
Post-hoc When to use
Tukey HSD Default; equal sample sizes; equal variances
Bonferroni Conservative; small number of planned comparisons
Games-Howell Use when variances are unequal (Levene significant)
Scheffé Very conservative; complex contrasts
LSD (Fisher) Most liberal; do not use without strong justification
TIP — TUKEY BY DEFAULT, GAMES-HOWELL AS THE BACKUP
For most thesis work, run Tukey first. If Levene's test is significant, switch to
Games-Howell. Either is defensible if reported clearly.
Interpreting the real output — fully worked
Research question:In our 120-student dataset, do mean mathematics
scores differ across the four form levels (Form 1, 2, 3, 4)?
DV: math_score (continuous).
IV: form (4 categories).
Different students in each form group (between-subjects).
→ One-way ANOVA.
Hypotheses: - HÔ: R_F1 = R_F2 = R_F3 = R_F4 (all four population means are equal).
- HÕ: At least one form's mean differs from the others. - G = .05.
After cleaning (missing codes recoded, case 43's math=150 removed), 117 students
with both math_score and a valid form remain.
 
 
 
 

Figure 57.2 — One-way ANOVA output on math_score by form (N = 117). Arrow 1 — Levene's
Sig. Arrow 2 — F statistic. Arrow 3 — overall p-value.
Table 1 — Descriptives
Form N Mean SD SE 95% CI
Lower
95% CI
Upper Min Max
Form
1
3561.2611.721.9857.23 65.29 35.589.4
Form
2
3057.5712.022.1953.08 62.07 37.288.1
Form
3
2765.7512.642.4360.75 70.74 42.0100.0
Form
4
2563.5614.922.9857.41 69.72 38.092.6
Total 117 61.84 12.93 1.2059.47 64.22 35.5100.0
Table 2 — Test of Homogeneity of Variances
Levene Statistic df1 df2 Sig.
Based on Mean0.916 3 113 .436

Table 3 — ANOVA
Source Sum of Squares df Mean Square F Sig.
Between Groups1066.42 3 355.47 2.143 .099
Within Groups18742.30113165.86
Total 19808.72116
Line-by-line — what every number means
Group sizes (35, 30, 27, 25). All comfortably above 25 per group. We satisfy
the rule of thumb.
Group means look different at a glance: 61.26, 57.57, 65.75, 63.56. Form
3 has the highest mean (65.75); Form 2 has the lowest (57.57). The biggest gap
is Form 3 - Form 2 %æ 8.2 marks.
Group SDs (11.72, 12.02, 12.64, 14.92). Spread is similar across groups.
Ratio of largest to smallest SD = 14.92 / 11.72 %æ 1.27  well under the 2:1 rule.
We expect Levene to be non-significant.
Group 95% CIs overlap considerably. Form 1's CI [57.23, 65.29] overlaps
Form 2's [53.08, 62.07] and Form 3's [60.75, 70.74]. Visible overlap of CIs is a
strong hint the omnibus test will be non-significant. (Not a substitute for the
test, but a useful eyeball check.)
Levene F = 0.916, Sig. = .436. Variances are not significantly different. ✓ We
may read the standard ANOVA row (no need for Welch).
Between-Groups SS = 1066.42, df = 3. "Between" df = number of groups -
1 = 4 - 1 = 3. ✓
Within-Groups SS = 18742.30, df = 113. "Within" df = total N - number of
groups = 117 - 4 = 113. ✓
Mean Square Between = 1066.42 / 3 = 355.47. Average between-group
variance.
Mean Square Within = 18742.30 / 113 = 165.86. Average within-group
variance  the "error" or "noise".
F = MS_Between / MS_Within = 355.47 / 165.86 = 2.143. ✓ F is the signal-
to-noise ratio. F = 1 means signal equals noise. F = 2.14 means signal is roughly
2x noise  not nearly enough.
Sig. = .099. Our p-value. Greater than .05. We fail to reject H₀.
Effect size: η² = SS_between / SS_total = 1066.42 / 19808.72 = 0.054.
That's a small effect (Cohen's benchmarks: .01 small, .06 medium, .14 large).
About 5.4% of the variation in math scores is associated with form level  not
enough to be statistically detectable in this sample.
1. 
2. 
3. 
4. 
5. 
6. 
7. 
8. 
9. 
10. 
11. 
12. 

The supervisor-narbtative paragraph
"Four form groups, sizes 35, 30, 27, 25 — all healthy. Group means are
61.3, 57.6, 65.8, 63.6 — Form 3 highest, Form 2 lowest, but the gap is only
about 8 marks at most. SDs are similar; Levene confirms homogeneity (p =
.436). The ANOVA F is 2.14 on 3 and 113 degrees of freedom, p = .099.
Not significant. We don't have evidence that math scores differ across
forms in this sample. Eta-squared is .054 — about 5% of variance — a
small effect that the test couldn't reliably detect with this sample size.
Note we should not run post-hoc tests because the omnibus was non-
significant; doing so would be data-fishing. If we wanted to follow up
properly, we'd report this as a non-significant result and perhaps explore
whether a larger sample would change things."
What about post-hoc tests?
Do not re

[...continued in the full handbook...]`,
  'anova-2': `--- From Chapter 57: One- ---

Chapter 55 · Chapter 57. One-
Way ANOVA (with post-hoc
tests)
Purpose
The one-way ANOVA (Analysis of Variance) compares the means of three or more
independent groups on one continuous variable to test whether at least one group
differs from the others.
When to use it
One continuous (scale) DV.
One categorical IV with three or more independent groups (e.g. Form 1,
Form 2, Form 3, Form 4).
Each pupil is in only one group.
When NOT to use it
Two groups → use independent-samples t-test (Chapter 54).
Same pupils across conditions → use repeated-measures ANOVA (Chapter 59).
Two or more IVs → use two-way ANOVA (Chapter 58).
DV is ordinal or strongly non-normal → use Kruskal-Wallis (Chapter 75).
Why "Analysis of Variance" — the name puzzle
The test compares means, but it is called "Analysis of Variance" because it works by
comparing two kinds of variance:
Between-group variance  how much the group means differ from the overall
(grand) mean.
Within-group variance  how much pupils inside the same group differ from
their group's mean.
The ratio of these two is the F-statistic:
 
 
 
 
 
 
 
 
 

F ≈ Between-group variance / Within-group variance
If group means are all similar, F will be near 1. If group means are very different
(relative to within-group noise), F will be large.
ANALOGY — DISTINGUISHING MUSIC FROM NOISE
You walk past four classrooms. In each, pupils are humming. If all four classrooms
hum the same tune (low between-classroom variance), the four classrooms sound
alike. If one classroom hums a clearly different tune, you can pick it out  but only if
the pupils within each classroom are humming together (low within-classroom
variance). ANOVA is the formal version of "can I hear a difference between rooms
above the background hum within each room?"
Research questions
Do mean mathematics scores differ across Forms 1, 2, 3, and 4?
Do four schools differ in mean motivation?
Do three teaching methods produce different mean exam results?
Hypotheses
H₀: RÕ = RÖ = Rx = ... (all population means are equal).
H₁: at least one mean differs from the others.
Notice HÕ is vague. ANOVA tells you "at least one group differs" but does not say
which one(s). That is the job of post-hoc tests.
Assumptions
Assumption How to check
1. IndependenceDesign feature  random sampling, no
clustering
2. Continuous DVVariable View
3. Approximate normality within each
group
Shapiro-Wilk per group; robust when n %ß 30 per
group
4. Homogeneity of variancesLevene's Test (in the output)
 
 
 
 
 

If homogeneity fails, use Welch's ANOVA (also reported in the output).
Running the test in SPSS
Analyze → Compare Means → One-Way ANOVA
Figure 57.1 — The One-Way ANOVA dialog. Arrow 1 — move the continuous DV into Dependent
List. Arrow 2 — move the categorical IV into Factor. Arrow 3 — click Post Hoc… to choose follow-
up comparisons.
Step-by-step
Analyze → Compare Means → One-Way ANOVA.
Move math_score into Dependent List.
Move form into Factor.
Click Options… → tick Descriptive, Homogeneity of variance test, Welch, 
Means plot. Continue.
Click Post Hoc… → tick Tukey (most common; safe choice). Continue.
Click OK.
Syntax
ONEWAY math_score BY form
 /STATISTICS DESCRIPTIVES HOMOGENEITY WELCH
 /PLOT MEANS
1. 
2. 
3. 
4. 
5. 
6. 

 /MISSING ANALYSIS
 /POSTHOC=TUKEY ALPHA(0.05).
Post-hoc tests — which one and why
After a significant overall F, you compare each pair of groups while controlling the
family-wise Type I error rate. Common choices:
Post-hoc When to use
Tukey HSD Default; equal sample sizes; equal variances
Bonferroni Conservative; small number of planned comparisons
Games-Howell Use when variances are unequal (Levene significant)
Scheffé Very conservative; complex contrasts
LSD (Fisher) Most liberal; do not use without strong justification
TIP — TUKEY BY DEFAULT, GAMES-HOWELL AS THE BACKUP
For most thesis work, run Tukey first. If Levene's test is significant, switch to
Games-Howell. Either is defensible if reported clearly.
Interpreting the real output — fully worked
Research question:In our 120-student dataset, do mean mathematics
scores differ across the four form levels (Form 1, 2, 3, 4)?
DV: math_score (continuous).
IV: form (4 categories).
Different students in each form group (between-subjects).
→ One-way ANOVA.
Hypotheses: - HÔ: R_F1 = R_F2 = R_F3 = R_F4 (all four population means are equal).
- HÕ: At least one form's mean differs from the others. - G = .05.
After cleaning (missing codes recoded, case 43's math=150 removed), 117 students
with both math_score and a valid form remain.
 
 
 
 

Figure 57.2 — One-way ANOVA output on math_score by form (N = 117). Arrow 1 — Levene's
Sig. Arrow 2 — F statistic. Arrow 3 — overall p-value.
Table 1 — Descriptives
Form N Mean SD SE 95% CI
Lower
95% CI
Upper Min Max
Form
1
3561.2611.721.9857.23 65.29 35.589.4
Form
2
3057.5712.022.1953.08 62.07 37.288.1
Form
3
2765.7512.642.4360.75 70.74 42.0100.0
Form
4
2563.5614.922.9857.41 69.72 38.092.6
Total 117 61.84 12.93 1.2059.47 64.22 35.5100.0
Table 2 — Test of Homogeneity of Variances
Levene Statistic df1 df2 Sig.
Based on Mean0.916 3 113 .436

Table 3 — ANOVA
Source Sum of Squares df Mean Square F Sig.
Between Groups1066.42 3 355.47 2.143 .099
Within Groups18742.30113165.86
Total 19808.72116
Line-by-line — what every number means
Group sizes (35, 30, 27, 25). All comfortably above 25 per group. We satisfy
the rule of thumb.
Group means look different at a glance: 61.26, 57.57, 65.75, 63.56. Form
3 has the highest mean (65.75); Form 2 has the lowest (57.57). The biggest gap
is Form 3 - Form 2 %æ 8.2 marks.
Group SDs (11.72, 12.02, 12.64, 14.92). Spread is similar across groups.
Ratio of largest to smallest SD = 14.92 / 11.72 %æ 1.27  well under the 2:1 rule.
We expect Levene to be non-significant.
Group 95% CIs overlap considerably. Form 1's CI [57.23, 65.29] overlaps
Form 2's [53.08, 62.07] and Form 3's [60.75, 70.74]. Visible overlap of CIs is a
strong hint the omnibus test will be non-significant. (Not a substitute for the
test, but a useful eyeball check.)
Levene F = 0.916, Sig. = .436. Variances are not significantly different. ✓ We
may read the standard ANOVA row (no need for Welch).
Between-Groups SS = 1066.42, df = 3. "Between" df = number of groups -
1 = 4 - 1 = 3. ✓
Within-Groups SS = 18742.30, df = 113. "Within" df = total N - number of
groups = 117 - 4 = 113. ✓
Mean Square Between = 1066.42 / 3 = 355.47. Average between-group
variance.
Mean Square Within = 18742.30 / 113 = 165.86. Average within-group
variance  the "error" or "noise".
F = MS_Between / MS_Within = 355.47 / 165.86 = 2.143. ✓ F is the signal-
to-noise ratio. F = 1 means signal equals noise. F = 2.14 means signal is roughly
2x noise  not nearly enough.
Sig. = .099. Our p-value. Greater than .05. We fail to reject H₀.
Effect size: η² = SS_between / SS_total = 1066.42 / 19808.72 = 0.054.
That's a small effect (Cohen's benchmarks: .01 small, .06 medium, .14 large).
About 5.4% of the variation in math scores is associated with form level  not
enough to be statistically detectable in this sample.
1. 
2. 
3. 
4. 
5. 
6. 
7. 
8. 
9. 
10. 
11. 
12. 

The supervisor-narbtative paragraph
"Four form groups, sizes 35, 30, 27, 25 — all healthy. Group means are
61.3, 57.6, 65.8, 63.6 — Form 3 highest, Form 2 lowest, but the gap is only
about 8 marks at most. SDs are similar; Levene confirms homogeneity (p =
.436). The ANOVA F is 2.14 on 3 and 113 degrees of freedom, p = .099.
Not significant. We don't have evidence that math scores differ across
forms in this sample. Eta-squared is .054 — about 5% of variance — a
small effect that the test couldn't reliably detect with this sample size.
Note we should not run post-hoc tests because the omnibus was non-
significant; doing so would be data-fishing. If we wanted to follow up
properly, we'd report this as a non-significant result and perhaps explore
whether a larger sample would change things."
What about post-hoc tests?
Do not re

[...continued in the full handbook...]`,
  'anova-3': `--- From Chapter 58: Two- ---

Chapter 56 · Chapter 58. Two-
Way ANOVA (factorial designs
and interaction effects)
Purpose
A two-way ANOVA examines the effect of two categorical IVs (each with two or
more levels) on one continuous DV  and, crucially, whether the two IVs interact.
When to use it
One continuous DV.
Two categorical IVs.
Each pupil belongs to one combination of the two IVs.
Education examples
Effect of teaching method (lecture / discussion / mixed) and gender on exam
score.
Effect of school type (public / private) and form level (1, 2, 3, 4) on motivation.
Three effects, not one
A two-way ANOVA gives you three F-tests in a single run:
Main effect of IV₁  does method matter overall (averaging across genders)?
Main effect of IV₂  does gender matter overall (averaging across methods)?
Interaction effect (IV₁ x IV₂)  does the effect of method depend on gender?
 
 
 
 
 
1. 
2. 
3. 
The Complete SPSS Handbook for
Beginners
Chapter 58. Two-Way ANOVA (factorial designs and interaction
effects)

The interaction — the most important effect to
understand
Figure 58.1 — When the two lines are parallel, there is no interaction: both groups respond to the
method in the same way. When the lines cross or diverge, there is an interaction: the method's
effect depends on the group.
WHY INTERACTIONS MATTER MOST
A main effect tells you the average story. An interaction tells you the conditional
story: "the new method works for boys but not for girls" is a more useful sentence
than "the new method works on average." When an interaction is present, you
should report the main effects with caution  they may be misleading. Always plot
the interaction.
Hypotheses
HÔ (main A): all means of A are equal.
HÔ (main B): all means of B are equal.
HÔ (interaction): the effect of A is the same at every level of B (lines parallel).
Assumptions
Same as one-way ANOVA, but checked within each cell (each combination of the
two IVs).
 
 
 
The Complete SPSS Handbook for
Beginners
Chapter 58. Two-Way ANOVA (factorial designs and interaction
effects)

Running the test
Analyze → General Linear Model → Univariate
Move math_score into Dependent Variable.
Move teaching_method and gender into Fixed Factor(s).
Click Plots… → put one IV on Horizontal Axis, the other on Separate Lines → 
Add → Continue.
Click Post Hoc… → choose the IV with 3+ levels and tick Tukey.
Click Options… → tick Descriptive statistics, Estimates of effect size, 
Homogeneity tests. Continue.
Click OK.
Syntax
UNIANOVA math_score BY teaching_method gender
 /PLOT=PROFILE(teaching_method*gender) TYPE=LINE
 /EMMEANS=TABLES(teaching_method*gender)
 /PRINT=DESCRIPTIVE ETASQ HOMOGENEITY
 /CRITERIA=ALPHA(.05)
 /DESIGN=teaching_method gender teaching_method*gender.
Interpreting the Tests of Between-Subjects
Effects table
Source F Sig. Partial
η² What it means
Corrected Model Overall model
Intercept Tests whether grand mean is 0 (rarely
interesting)
teaching_method8.34.001.12 Main effect of method
gender 5.21.024.05 Main effect of gender
teaching_method *
gender
4.67.011.08 Interaction
Error Within-cell variability
1. 
2. 
3. 
4. 
5. 
6. 
The Complete SPSS Handbook for
Beginners
Chapter 58. Two-Way ANOVA (factorial designs and interaction
effects)

Order of reading the table
Read the interaction first. If it is significant, the main effects must be
qualified.
If interaction is significant: focus on the simple effects (the effect of method at
each gender separately).
If interaction is non-significant: report and interpret the main effects.
Effect size — partial η²
partial η² = SS_effect / (SS_effect + SS_error)
Small %æ .01, medium %æ .06, large %æ .14.
Reporting
APA-STYLE — WHEN INTERACTION IS SIGNIFICANT
A 3 (method) x 2 (gender) between-subjects ANOVA was conducted with
mathematics score as the DV. Levene's test was non-significant (p =
.42). There was a significant main effect of method, F(2, 114) = 8.34, 
p = .001, partial η² = .12, and a significant main effect of gender, 
F(1, 114) = 5.21, p = .024, partial η² = .05. These main effects were
qualified by a significant method x gender interaction, F(2, 114) =
4.67, p = .011, partial η² = .08. Simple-effects analyses indicated
that the active-learning method significantly outperformed the
traditional method for boys (p < .001) but not for girls (p = .312). 
Chapter 58 — Summary
Two-way ANOVA tests two IVs and their interaction on one continuous DV.
Always read the interaction first; main effects must be qualified if it is
significant.
Plot the interaction to interpret it visually.
Report each F, p, and partial M² separately.
1. 
2. 
3. 
 
 
 
 
The Complete SPSS Handbook for
Beginners
Chapter 58. Two-Way ANOVA (factorial designs and interaction
effects)`,
  'anova-4': `--- From Chapter 59: Repeated-Measures ANOVA ---

Chapter 57 · Chapter 59.
Repeated-Measures ANOVA
Purpose
Compares means of the same continuous variable measured 3+ times on the
same participants (or under 3+ within-subject conditions).
Education example
The same Form 3 class is measured on a mathematics test at three points: beginning
of term, mid-term, and end of term. Do scores change?
When to use it
One continuous DV.
One within-subjects IV with 3+ levels.
Each pupil contributes a score for every level.
For only 2 time points, use a paired-samples t-test (Chapter 55)  it is the two-level
special case.
Why it is powerful
Like the paired t-test, each pupil acts as their own control. Between-pupil differences
are mathematically removed.
 
 
 

Assumptions
Assumption How to check
Independence between pupilsDesign
Continuous DV Variable View
Approximate normality of the differences between levelsHistogram of differences
Sphericity  the variances of all pairwise differences between
levels are equal
Mauchly's test in the
output
Sphericity — the new assumption
Sphericity is a multivariate cousin of "homogeneity of variance" that applies when
you have 3+ repeated measures. If it fails, the F-statistic's degrees of freedom must
be corrected.
Mauchly's Sig.What to do
> .05 Sphericity assumed; read the "Sphericity Assumed" row
< .05 Sphericity violated; read the Greenhouse-Geisser corrected row
For a more conservative correction, use Greenhouse-Geisser if epsilon ( K) < .75;
Huynh-Feldt if K %ß .75.
Running the test
Analyze → General Linear Model → Repeated Measures
Within-Subject Factor Name: type time. Number of Levels: 3. Click Add,
then Define.
In the next dialog, move math_t1, math_t2, math_t3 into the slots (1), (2), (3).
Click Plots… → put time on horizontal axis → Add → Continue.
Click Options… → tick Descriptive statistics, Estimates of effect size, 
Compare main effects with Bonferroni adjustment. Continue.
OK.
1. 
2. 
3. 
4. 
5. 

Interpreting
Mauchly's Test of Sphericity
Read Sig. If > .05, you may use the standard F. If < .05, use Greenhouse-Geisser.
Tests of Within-Subjects Effects
Multiple rows for the same effect, one per correction. Read the row indicated by your
sphericity decision.
Source F df Sig. Partial η²
time (Sphericity Assumed)24.312 <.001.46
time (Greenhouse-Geisser)24.311.74<.001.46
Notice that under Greenhouse-Geisser, df becomes non-integer (1.74). This is the
correction.
Pairwise comparisons
If the overall test is significant, the Pairwise Comparisons table shows which time
points differ, with Bonferroni-adjusted p-values.
Reporting
APA-STYLE SENTENCE
A repeated-measures ANOVA was conducted to examine mathematics scores
at three time points (beginning, mid, and end of term). Mauchly's test
indicated that sphericity was met (χ² = 2.41, p = .299), so unadjusted
degrees of freedom were used. There was a significant main effect of
time, F(2, 56) = 24.31, p < .001, partial η² = .46. Pairwise
comparisons (Bonferroni-corrected) showed that end-of-term scores (M =
73.5) were significantly higher than both mid-term (M = 66.8, p < .001)
and beginning-of-term scores (M = 60.4, p < .001), and mid-term scores
were higher than beginning-of-term (p = .002). 

Chapter 59 — Summary
Repeated-measures ANOVA compares 3+ measurements on the same
people.
Check sphericity with Mauchly's test; correct df if sphericity fails.
Use pairwise comparisons (Bonferroni) to identify which time points differ.
 
 
`,
  'rel-1': null,
  'rel-2': null,
  'rel-3': null,
};
