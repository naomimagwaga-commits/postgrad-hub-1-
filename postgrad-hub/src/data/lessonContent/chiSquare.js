/**
 * Chi-square · Lesson 1 — Chi-square tests (goodness-of-fit and independence)
 * + Fisher's Exact Test for small samples
 * Comparing observed counts to expected counts, and testing the association
 * between two categorical variables.
 */

export const CHI_SQUARE_LESSON = {
  id: 'chi-1',
  title: 'Chi-square tests (goodness-of-fit & independence) + Fisher\'s Exact',
  subtitle: 'Module 03 · Course: Chi-square · Lesson 1 of 1',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When both your variables are categorical',
      blocks: [
        { type: 'scene', body: [
          'You are doing a Master\'s study at JKUAT on mobile-money adoption among 240 small-business owners in Thika. You asked two simple questions: "What is your age band?" (under 35 / 35-49 / 50+) and "Do you accept M-Pesa payments?" (yes / no). You now have a dataset with two categorical columns and 240 rows.',
          'You want to know: **is age band associated with M-Pesa adoption?** Or are the proportions of yes/no roughly the same in every age band? You cannot use a t-test, ANOVA, or regression here — those all need a continuous outcome. Mobile-money adoption is binary; age band is categorical. **Both** variables are categorical.',
          'That is the textbook chi-square situation. This lesson teaches you the chi-square test in its two most common forms — **goodness-of-fit** (one categorical variable tested against expected proportions) and **independence / association** (two categorical variables tested for whether they\'re related) — plus **Fisher\'s Exact Test** for when your sample is small and chi-square\'s expected-count assumption fails. By the end you\'ll be able to run all three in SPSS, read their output, compute Cramer\'s V (the effect size), and write up the result in clean APA.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Tell the two forms apart** — goodness-of-fit (1 categorical variable) vs. independence (2 categorical variables).',
            '**Recognise** when chi-square is the right test (both variables categorical, counts of cases per cell).',
            '**Run** chi-square goodness-of-fit via Analyze → Nonparametric Tests → Legacy Dialogs → Chi-square.',
            '**Run** chi-square test of independence via Analyze → Descriptive Statistics → Crosstabs → Statistics → Chi-square.',
            '**Check the expected-count assumption** (every expected count ≥ 5, none below 1) and switch to **Fisher\'s Exact Test** when it fails.',
            '**Compute and report Cramer\'s V** — the standard effect size for chi-square.',
            '**Write up** the result in APA style with all the elements your reviewer will look for.',
            '**Spot and avoid** the five mistakes beginners make with chi-square.',
          ]},

        { type: 'why', body:
          'Chi-square is the second most-used inferential test in Kenyan postgrad survey research (after t-tests). Whenever you cross-tabulate two demographic or behavioural variables — gender × employment status, county × vaccination, age band × M-Pesa use — you are in chi-square territory. Master it once and an entire family of survey questions becomes answerable.' },
      ],
    },

    /* ════════════════════ 1.5 WHAT/WHY/WHERE/WHEN — beginner-first primer ════════════════════ */
    {
      id: 'wwww',
      title: 'What / Why / Where / When — read THIS first',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'Chi-Square is the go-to test whenever your DV is CATEGORICAL. Before touching the SPSS dialog, understand: (1) What Chi-Square IS, (2) Why you use it instead of alternatives, (3) Where a Kenyan postgraduate would use it, (4) When to CHOOSE it.',
            'The WWWW card and key-terms callout below answer all 4 in 3 minutes.',
          ]},

        { type: 'illustration', component: 'NyandaruaChiWWWW',
          caption: 'Figure 0. Chi-Square Test of Independence WHAT/WHY/WHERE/WHEN reference card using the Nyandarua Vaccine study (Education Level x Vaccine Acceptance, N=320 adults).' },

        { type: 'callout', tone: 'brand', title: 'Key terms you will meet in the walkthrough',
          body: [
            '**Observed count** — the actual number of cases in each cell of your crosstab.',
            '**Expected count** — the number you would see IF the two variables were independent. Chi-Square compares observed to expected.',
            '**Chi-Square (χ²) statistic** — a single number summarizing how much observed and expected differ. Bigger χ² = bigger deviation from independence.',
            '**df (degrees of freedom)** — for a 2-way chi-square, df = (rows - 1) × (columns - 1). Nyandarua: 4 education levels × 2 acceptance categories → df = 3.',
            '**Cramer V** — an effect size measure from 0 to 1. Small = .10, medium = .30, large = .50. Report alongside χ² so readers know how STRONG the association is.',
            '**Expected count assumption** — no more than 20% of cells with expected < 5, and NO cell with expected < 1. SPSS reports this at the bottom of the Chi-Square Tests table.',
          ]},
      ],
    },

    /* ════════════════════ 2. BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — compare observed to expected',
      blocks: [
        { type: 'heading', level: 2, text: 'Counts in cells, observed vs. expected' },

        { type: 'paragraph', text:
          'Every chi-square test boils down to the same logic. You count how many cases fall into each cell of a table. Then, under the null hypothesis ("the variables are unrelated" for independence, or "the proportions match the hypothesised ones" for goodness-of-fit), you compute how many cases you WOULD HAVE EXPECTED in each cell. The chi-square statistic measures how far the OBSERVED counts deviate from the EXPECTED counts, summed across all cells. A large χ² means observed and expected are far apart — strong evidence against the null.' },

        { type: 'illustration', component: 'ChiSquareLogic',
          caption: 'Figure 1. The chi-square logic. Left: a 3×2 contingency table of observed counts (age band × M-Pesa adoption). Middle: the expected counts under the null hypothesis of independence — computed for every cell as (row total × column total) / grand total. Right: the per-cell contribution to χ² = (Observed − Expected)² / Expected. Summed across all cells, this gives the test statistic.' },

        { type: 'definition', term: 'Chi-square statistic (χ²)',
          body: 'A measure of total deviation between observed and expected counts: **χ² = Σ [(O − E)² ÷ E]**, summed across all cells of the table. Compared to a chi-square distribution with degrees of freedom that depend on the test: for goodness-of-fit, df = k − 1 (where k = number of categories); for independence (r × c table), df = (r − 1) × (c − 1). A small χ² near 0 means observed counts match expected — no evidence of association. A large χ² with a small p-value means observed deviates meaningfully from expected — real association.' },

        { type: 'analogy', title: 'Counting matatu colours at the stage',
          body: 'You stand at a Nairobi matatu stage and count the colour scheme of every matatu that arrives in an hour. You think the proportions should be 50% red, 30% green, 20% other (based on Sacco licensing data from the County). You see 60 matatus: 25 red, 22 green, 13 other. EXPECTED counts under your hypothesis: 30 red, 18 green, 12 other. OBSERVED counts: 25, 22, 13. Chi-square asks: are observed counts close enough to expected that the differences could be explained by chance alone (just an unusual hour), or are they so far off that your hypothesised proportions must be wrong?' },

        { type: 'reveal',
          prompt: 'Your expected count in one cell of a chi-square independence table is 1.2 (because you have small sample size and a rare category). Why is this a problem?',
          answer: '**Chi-square\'s p-value calculation assumes the expected counts in every cell are reasonably large — at least 5 in most cells, and ideally none below 1.** When expected counts are tiny, the χ² statistic does not follow a chi-square distribution closely, and the p-value SPSS reports becomes unreliable. The fix: switch to **Fisher\'s Exact Test**, which computes an exact p-value by enumerating all possible tables with the same row and column totals. Fisher\'s is the default for 2×2 tables with small expected counts; SPSS reports it automatically alongside chi-square when you tick the right options.' },
      ],
    },

    /* ════════════════════ 3. THE TWO FORMS ════════════════════ */
    {
      id: 'two-forms',
      title: 'The two forms — goodness-of-fit vs. independence',
      blocks: [
        { type: 'heading', level: 2, text: 'Tell them apart in 10 seconds' },

        { type: 'paragraph', text:
          'Chi-square comes in two flavours that solve different problems. Knowing which one to reach for is the single most important skill in this lesson.' },

        { type: 'comparison',
          headers: ['', 'Goodness-of-Fit', 'Independence / Association'],
          rows: [
            ['**Number of variables**',  '1 categorical',                                       '2 categorical'],
            ['**Question answered**',     'Do my observed proportions match a hypothesised set?', 'Are these two variables related?'],
            ['**Example**',               'Do 50% of voters support Party A, 30% B, 20% C — as expected from a prior survey?', 'Is age band associated with M-Pesa adoption?'],
            ['**Hypothesised proportions**', 'You SUPPLY them (e.g. 50/30/20)',                   'Computed automatically from row & column totals'],
            ['**SPSS path**',             'Analyze → Nonparametric Tests → Legacy Dialogs → Chi-square', 'Analyze → Descriptive Statistics → Crosstabs → Statistics → Chi-square'],
            ['**Degrees of freedom**',     'k − 1 (k = number of categories)',                    '(r − 1) × (c − 1)'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Quick rule of thumb',
          body: '**Only one categorical variable to test → goodness-of-fit.** **Two categorical variables crossed → independence.** If you find yourself building a cross-tabulation of any sort, you are doing the independence test.' },
      ],
    },

    /* ════════════════════ 4. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When chi-square is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The four conditions' },

        { type: 'steps', steps: [
          { title: 'Both variables are CATEGORICAL',
            body: 'Nominal (gender, county, religion) or ordinal (education band, poverty band). Continuous outcomes need t-tests, ANOVA, or regression, NOT chi-square.' },
          { title: 'Each case is COUNTED ONCE',
            body: 'Each respondent (or unit of analysis) contributes to exactly one cell of the table. If respondents can fall into multiple cells (e.g. "tick all that apply" questions), chi-square is not appropriate without restructuring.' },
          { title: 'Cases are INDEPENDENT of each other',
            body: 'No paired or clustered data. For paired binary data (e.g. same patient classified as yes/no at two time points), use **McNemar\'s test** instead.' },
          { title: 'EXPECTED counts are reasonably large',
            body: 'Standard rule: every expected count ≥ 5, with NONE below 1. For 2×2 tables specifically: every expected count ≥ 5. If violated, switch to **Fisher\'s Exact Test** (covered in Section 8).' },
        ]},

        { type: 'comparison',
          headers: ['Situation', 'Variables', 'Right test'],
          rows: [
            ['Test whether M-Pesa adoption (Y/N) differs by age band',     '2 categorical',  '**Chi-square independence (this lesson)**'],
            ['Test whether observed county distribution matches 2019 census', '1 categorical', '**Chi-square goodness-of-fit (this lesson)**'],
            ['Test if 30 patients\' yes/no diagnosis differs before vs after', '2 binary, paired', 'McNemar\'s test'],
            ['Independence test on a 2×2 table with small expected counts', '2 categorical, small n', '**Fisher\'s Exact Test (this lesson)**'],
            ['Compare mean income across three counties',                   'continuous outcome', 'ANOVA — not chi-square'],
            ['Test if a continuous score predicts a binary outcome',        'continuous predictor', 'Logistic regression — not chi-square'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Chi-square uses COUNTS, not percentages',
          body: 'A surprisingly common mistake: students enter percentages into SPSS and run chi-square. Chi-square needs raw COUNTS (how many respondents fell into each cell), never percentages. Make sure your dataset has one row per respondent with categorical values, and let Crosstabs build the counts for you.' },
      ],
    },

    /* ════════════════════ 5. SPSS — GOODNESS-OF-FIT ════════════════════ */
    {
      id: 'spss-gof',
      title: 'Running chi-square goodness-of-fit in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'For ONE categorical variable' },

        { type: 'paragraph', text:
          'Goodness-of-fit tests whether the observed distribution of ONE categorical variable matches a hypothesised distribution. The classic example: testing whether your sample\'s county distribution matches the 2019 census proportions.' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → Nonparametric Tests → Legacy Dialogs → Chi-square.' },
          { title: 'Move your categorical variable to Test Variable List',
            body: 'E.g. **county** (1 = Nairobi, 2 = Kisumu, 3 = Mombasa).' },
          { title: 'Choose your Expected Values',
            body: '**All categories equal** if your null hypothesis is even proportions (e.g. 33%/33%/33%). **Values** if you have specific hypothesised proportions — type them in the order your value codes appear (e.g. type 50, type 30, type 20 → click Add after each → the test compares against 50/30/20).' },
          { title: 'Click OK',
            body: 'SPSS produces two tables: **[Variable Name]** (observed N, expected N, residual per category) and **Test Statistics** (chi-square, df, asymptotic significance).' },
        ]},

        { type: 'callout', tone: 'warning', title: 'Specify values in CODE order',
          body: 'If your variable is coded 1 = Nairobi, 2 = Kisumu, 3 = Mombasa and your hypothesised proportions are 60% Nairobi, 25% Kisumu, 15% Mombasa, type 60 first (for code 1), then 25 (for code 2), then 15 (for code 3). Getting the order wrong silently tests the wrong hypothesis.' },
      ],
    },

    /* ════════════════════ 6. SPSS — INDEPENDENCE ════════════════════ */
    {
      id: 'spss-indep',
      title: 'Running chi-square independence (Crosstabs) in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'For TWO categorical variables' },

        { type: 'paragraph', text:
          'The independence test is the workhorse — used in virtually every postgrad survey analysis. It runs from the Crosstabs dialog, which also produces the cross-tabulation table that goes straight into your Chapter 4.' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → Descriptive Statistics → Crosstabs.' },
          { title: 'Move one variable to Row(s)',
            body: 'Conventionally the predictor / independent variable (e.g. **age_band**).' },
          { title: 'Move the other variable to Column(s)',
            body: 'Conventionally the outcome / dependent variable (e.g. **mpesa_adopted**, coded 1 = Yes, 2 = No).' },
          { title: 'Click Statistics',
            body: 'Tick **Chi-square** (always). Tick **Phi and Cramer\'s V** for the effect size on the 2-variable test. Click Continue.' },
          { title: 'Click Cells',
            body: 'Under Counts tick **Observed** AND **Expected** (so you can verify the assumption). Under Percentages tick **Row** (so each row shows percentages — easier for interpretation). Click Continue.' },
          { title: 'Click Exact (optional but recommended for small samples)',
            body: 'Tick **Exact** if any expected count looks small. This tells SPSS to compute Fisher\'s Exact Test alongside chi-square. Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces four tables: **Case Processing Summary**, the **Crosstabulation** (counts + percentages + expected counts), **Chi-Square Tests** (Pearson chi-square, likelihood ratio, Fisher\'s Exact if requested), and **Symmetric Measures** (Phi, Cramer\'s V).' },
        ]},

        { type: 'illustration', component: 'CrosstabsDialog',
          caption: 'Figure 2. The Crosstabs dialog set up for the JKUAT example. Row(s) = age_band (the predictor). Column(s) = mpesa_adopted (the outcome). Click Statistics → tick Chi-square AND Phi and Cramer\'s V. Click Cells → tick Observed, Expected, and Row percentages.' },

        { type: 'illustration', component: 'NyandaruaCrosstabsDialog',
          caption: 'Figure 1. The Crosstabs dialog for the Nyandarua Vaccine chi-square. EducationLevel is moved to the Row(s) box (the IV/predictor), and VaccineAccept goes to the Column(s) box (the DV/outcome). The critical [Statistics...] button is highlighted gold — clicking it opens the sub-dialog where you actually enable the chi-square test.' },

        { type: 'illustration', component: 'NyandaruaChiStatsDialog',
          caption: 'Figure 2. The Crosstabs → Statistics sub-dialog. You MUST tick Chi-square (highlighted gold) — without this, SPSS only creates a pretty table with no significance test. Also tick Phi and Cramer V (highlighted amber) for the effect size. Click Continue to return to the main dialog, then OK.' },

        { type: 'illustration', component: 'NyandaruaChiOutput',
          caption: 'Figure 3. The full chi-square output. TOP: Crosstab shows vaccine acceptance rising from 47.5% (None) to 84.0% (Tertiary) — a clear education gradient. MIDDLE: Chi-Square Tests row shows Pearson chi-square = 26.72, df = 3, p < .001 (highly significant). The footnote confirms 0% of cells with expected < 5 — assumption met. BOTTOM: Cramer V = .289 = medium-strength association. Chapter-4 write-up template in the gold callout.' },
      ],
    },

    /* ════════════════════ 7. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the SPSS output',
      blocks: [
        { type: 'heading', level: 2, text: 'The four tables you produce' },

        { type: 'illustration', component: 'ChiSquareOutput',
          caption: 'Figure 3. The four chi-square output tables. (1) Case Processing Summary confirms your N. (2) Crosstabulation shows observed counts and expected counts per cell — check the footnote for the expected-count warning. (3) Chi-Square Tests gives Pearson chi-square, df, p; plus Continuity Correction (2×2 only) and Fisher\'s Exact Test. (4) Symmetric Measures gives the Cramer\'s V effect size.' },

        { type: 'heading', level: 3, text: 'Table 1 — Crosstabulation' },

        { type: 'paragraph', text:
          'Lists observed counts and expected counts in every cell, plus row percentages. The row percentages are the key descriptive — they show what fraction of each row falls into each column. For the JKUAT example: under-35 = 81% adopted M-Pesa, 35-49 = 64% adopted, 50+ = 40% adopted. That descending pattern strongly suggests association.' },

        { type: 'heading', level: 3, text: 'Table 2 — Chi-Square Tests' },

        { type: 'comparison',
          headers: ['Row', 'What it shows'],
          rows: [
            ['**Pearson Chi-Square**',     'The standard test statistic + df + asymptotic p. This is the main result you report for tables larger than 2×2.'],
            ['**Continuity Correction**',  'A Yates-corrected chi-square for **2×2 tables only**. Many journals prefer this for 2×2; SPSS reports it automatically.'],
            ['**Likelihood Ratio**',        'An alternative chi-square based on likelihood maths. Usually gives a similar p-value; rarely reported as the main result.'],
            ['**Fisher\'s Exact Test**',   'An exact p-value (no chi-square approximation). Reported automatically for 2×2 tables, and for larger tables if you ticked Exact. **Use this when expected counts are small.**'],
            ['**Linear-by-Linear Association**', 'A trend test, only meaningful when BOTH variables are ordinal. Ignore otherwise.'],
            ['**N of Valid Cases**',       'Your effective sample size after listwise deletion of missing values.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Read the FOOTNOTE under the chi-square table',
          body: 'SPSS prints a footnote like *"a. 0 cells (0.0%) have expected count less than 5. The minimum expected count is 28.13."* This is your assumption check — if the minimum expected count is ≥ 5 and 0% of cells have expected counts below 5, you can report standard chi-square. If 20% or more cells have expected counts below 5, switch to Fisher\'s Exact.' },

        { type: 'heading', level: 3, text: 'Table 3 — Symmetric Measures' },

        { type: 'comparison',
          headers: ['Statistic', 'When to use', 'Interpretation'],
          rows: [
            ['**Phi (φ)**',         'Only for 2×2 tables', 'Like a correlation: 0 = no association, ±1 = perfect. Cohen: .10 small, .30 medium, .50 large.'],
            ['**Cramer\'s V**',     'Any table size (2×2 or larger)', 'Ranges 0-1. Standard effect size — report this. Cohen: .10 small, .30 medium, .50 large.'],
            ['**Contingency Coefficient**', 'Rarely reported', 'Similar to Phi but with awkward upper bound; prefer Cramer\'s V.'],
          ]},

        { type: 'reveal',
          prompt: 'Your output shows: Pearson Chi-Square = 28.34, df = 2, Sig. = .000. Cramer\'s V = .344. Footnote: "0 cells (0.0%) have expected count less than 5. The minimum expected count is 28.13." What do you conclude?',
          answer: '**Age band is significantly associated with M-Pesa adoption, with a medium-to-large effect.** χ²(2, N = 240) = 28.34, p < .001. The expected-count assumption is well satisfied (all expected counts > 28, far above the minimum of 5), so the standard Pearson chi-square is the right one to report. Cramer\'s V = .344 sits between the medium (.30) and large (.50) benchmarks — a substantively meaningful association. To describe the direction, refer back to the row percentages: M-Pesa adoption drops from 81% in under-35s, to 64% in 35-49s, to 40% in 50+. Defence sentence: "Chi-square confirmed a significant association between age band and M-Pesa adoption, with adoption falling sharply across older age bands."' },
      ],
    },

    /* ════════════════════ 8. FISHER'S EXACT ════════════════════ */
    {
      id: 'fishers-exact',
      title: 'Fisher\'s Exact Test — when chi-square\'s assumption fails',
      blocks: [
        { type: 'heading', level: 2, text: 'The exact alternative for small samples' },

        { type: 'paragraph', text:
          'Chi-square\'s p-value relies on an asymptotic approximation that works well when expected counts are reasonably large. When they\'re not — typically with small samples or rare categories — the chi-square p-value becomes unreliable. Fisher\'s Exact Test computes the p-value EXACTLY by enumerating all possible 2×2 tables that have the same row and column totals as yours, then summing the probabilities of tables at least as extreme as the one you observed.' },

        { type: 'definition', term: 'Fisher\'s Exact Test',
          body: 'An exact test for 2×2 contingency tables (and, in SPSS, for larger tables when Exact is selected). It uses the hypergeometric distribution rather than a chi-square approximation, so it works at any sample size and does not require any minimum expected count. Computationally heavy for large tables, but trivial for 2×2.' },

        { type: 'comparison',
          headers: ['Situation', 'Which test to report'],
          rows: [
            ['2×2 table, all expected counts ≥ 5',           'Either Pearson chi-square (with continuity correction) OR Fisher\'s Exact — both will agree closely; many journals prefer Fisher\'s for 2×2.'],
            ['2×2 table, any expected count < 5',             '**Fisher\'s Exact Test** (chi-square p is unreliable).'],
            ['Larger table (e.g. 3×2, 3×3), all expected ≥ 5', 'Pearson chi-square.'],
            ['Larger table, > 20% of cells have expected < 5', '**Fisher\'s Exact Test** via the Exact button (or collapse rare categories into a larger group).'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Fisher\'s for 2×2 is automatic',
          body: 'SPSS reports Fisher\'s Exact Test automatically for any 2×2 table — you do NOT have to click the Exact button. For larger tables you do have to click Exact and tick the Exact option. Always report Fisher\'s when your data is small or sparse; report standard chi-square when your sample is reasonably sized.' },
      ],
    },

    /* ════════════════════ 9. EFFECT SIZE ════════════════════ */
    {
      id: 'effect-size',
      title: 'Effect size — Cramer\'s V',
      blocks: [
        { type: 'heading', level: 2, text: 'Significance is not enough — report magnitude too' },

        { type: 'definition', term: 'Cramer\'s V',
          body: '**V = √(χ² ÷ (N × min(r − 1, c − 1)))**, where N is the sample size, r is the number of rows, and c is the number of columns. Ranges from 0 (no association) to 1 (perfect association). Cohen benchmarks vary slightly by table size; the common simple rule is: **V ≈ .10 small, V ≈ .30 medium, V ≈ .50 large**.' },

        { type: 'paragraph', text:
          'SPSS computes Cramer\'s V automatically when you tick "Phi and Cramer\'s V" in the Crosstabs Statistics dialog — you do not need to hand-compute it. For a 2×2 table specifically, Phi = Cramer\'s V (they\'re the same number).' },

        { type: 'workedExample', title: 'Cramer\'s V for the JKUAT example',
          body: [
            { label: 'Read from output',
              text: 'χ² = 28.34, N = 240. Table is 3×2 (3 age bands × 2 adoption levels). min(r−1, c−1) = min(2, 1) = 1.' },
            { label: 'Compute (or read directly from Symmetric Measures table)',
              text: 'V = √(28.34 / (240 × 1)) = √(0.118) = **0.344**.' },
            { label: 'Interpret',
              text: 'V = 0.34 sits between the medium (.30) and large (.50) benchmarks — a meaningful association, not just statistically significant.' },
            { label: 'Report in APA',
              text: '"χ²(2, N = 240) = 28.34, p < .001, Cramer\'s V = .34 (medium-to-large effect)."' },
          ]},

        { type: 'callout', tone: 'gold', title: 'Always report V (or Phi for 2×2) with chi-square',
          body: 'With a large sample even tiny associations become statistically significant. Without Cramer\'s V, your reader cannot tell whether the association is trivial or substantial. Always report it alongside χ² and p.' },
      ],
    },

    /* ════════════════════ 10. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — age band × M-Pesa adoption',
      blocks: [
        { type: 'workedExample', title: 'A Master\'s study at JKUAT',
          body: [
            { label: 'The research question',
              text: 'Is age band associated with M-Pesa adoption among small-business owners in Thika?' },
            { label: 'The data',
              text: 'n = 240 business owners. Two categorical variables: **age_band** (1 = under 35, 2 = 35-49, 3 = 50+) and **mpesa_adopted** (1 = Yes, 2 = No). Sample sizes per age band: 90, 80, 70.' },
            { label: 'Step 1 — Run Crosstabs',
              text: 'Analyze → Descriptive Statistics → Crosstabs → age_band into Row(s), mpesa_adopted into Column(s) → Statistics tick Chi-square AND Phi and Cramer\'s V → Cells tick Observed, Expected, Row percentages → OK.' },
            { label: 'Step 2 — Read the Crosstabulation',
              text: 'Under 35: 73 Yes (81.1%), 17 No (18.9%). 35-49: 51 Yes (63.8%), 29 No (36.3%). 50+: 28 Yes (40.0%), 42 No (60.0%). Clear descending pattern of adoption across age bands.' },
            { label: 'Step 3 — Check the expected-count footnote',
              text: '"0 cells (0.0%) have expected count less than 5. The minimum expected count is 28.13." Assumption met — use Pearson chi-square.' },
            { label: 'Step 4 — Read the chi-square test',
              text: 'Pearson Chi-Square = 28.34, df = 2, Asymp. Sig. (2-sided) = .000.' },
            { label: 'Step 5 — Read Cramer\'s V',
              text: 'Cramer\'s V = .344, approximate Sig. = .000. Medium-to-large effect.' },
            { label: 'Step 6 — APA write-up',
              text: '*"A chi-square test of independence was conducted to examine the relationship between age band and M-Pesa adoption among 240 small-business owners in Thika. M-Pesa adoption decreased markedly across age bands: 81.1% of under-35s adopted M-Pesa, compared with 63.8% of 35-49 year-olds and 40.0% of those aged 50+. The association was statistically significant, χ²(2, N = 240) = 28.34, p < .001, Cramer\'s V = .34, indicating a medium-to-large effect. All expected counts exceeded 5 (minimum = 28.13), confirming the chi-square assumption was met. The findings suggest that age is a substantial predictor of mobile-money uptake in this small-business population, with younger owners adopting at roughly twice the rate of the oldest band."*' },
          ]},
      ],
    },

    /* ════════════════════ 11. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing chi-square up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template (independence)' },

        { type: 'apa', text:
          'A chi-square test of independence was conducted to examine the relationship between [Variable 1] and [Variable 2] in [n] [participants description]. [Describe the row percentages in plain English — what proportion of each row fell into each column]. The association was [statistically significant / not statistically significant], χ²([df], N = [N]) = [χ²-value], p = [p-value], Cramer\'s V = [V-value], indicating a [small / medium / large] effect. [If applicable: All expected counts exceeded 5 (minimum = X), confirming the chi-square assumption was met. / Fisher\'s Exact Test was used because Y cells had expected counts below 5; the result was p = Z.]' },

        { type: 'heading', level: 3, text: 'The standard APA template (goodness-of-fit)' },

        { type: 'apa', text:
          'A chi-square goodness-of-fit test was conducted to compare the observed distribution of [variable] in [n] [participants] against the hypothesised proportions of [list expected proportions and their source]. Observed counts were [list]; expected counts were [list]. The observed distribution [did / did not] differ significantly from the hypothesised, χ²([df], N = [N]) = [χ²-value], p = [p-value]. [Describe direction of deviation if significant.]' },

        { type: 'callout', tone: 'success', title: 'Seven things every chi-square write-up must include',
          body: '**1.** Test name (independence vs. goodness-of-fit). **2.** What you compared and the sample size. **3.** Row percentages (or observed counts) — the descriptive evidence. **4.** χ² with degrees of freedom AND N. **5.** The p-value. **6.** Cramer\'s V (or Phi for 2×2) with verbal interpretation. **7.** Either confirmation that the expected-count assumption was met OR justification for switching to Fisher\'s Exact.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why a chi-square test of independence rather than a t-test or correlation?',
              a: 'Both the predictor (age band — ordinal categorical) and the outcome (M-Pesa adoption — binary categorical) are CATEGORICAL variables. A t-test would require a continuous outcome; Pearson correlation would require two continuous variables; logistic regression would have been possible if I had wanted to control for additional covariates. With one categorical predictor and one categorical outcome, chi-square test of independence is the standard appropriate test.' },
            { q: 'Did you check the chi-square assumption that expected counts are ≥ 5?',
              a: 'Yes. SPSS prints the expected-count diagnostic as a footnote under the Chi-Square Tests table. In this analysis, 0 cells had expected counts below 5 (minimum expected count was 28.13), so the standard Pearson chi-square assumption was well satisfied. Had the assumption been violated (>20% of cells with expected counts below 5), I would have reported Fisher\'s Exact Test or collapsed adjacent age bands to increase expected counts.' },
            { q: 'Why Cramer\'s V rather than Phi as the effect size?',
              a: 'Phi is appropriate only for 2×2 tables. The current table is 3×2 (three age bands × two adoption outcomes), so Cramer\'s V is the correct effect size — it generalises Phi to any contingency-table size while preserving the same interpretation scale (0 = no association, 1 = perfect, Cohen benchmarks .10 / .30 / .50 small / medium / large).' },
          ]},
      ],
    },

    /* ════════════════════ 12. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five common chi-square mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Entering percentages instead of counts',
          body: 'You enter "81%" and "19%" in cells instead of raw counts (73 and 17). Chi-square has no way to back out the sample size from percentages; the test becomes meaningless.',
          fix: 'Enter raw COUNTS (or, in a respondent-level dataset, one row per respondent with categorical values). Let Crosstabs build the table from the raw data.' },

        { type: 'mistake',
          title: 'Mistake 2 — Ignoring the expected-count footnote',
          body: 'You report Pearson chi-square but never look at the footnote. The footnote says "5 cells (50.0%) have expected count less than 5". Your reported p-value is unreliable and a reviewer will flag it instantly.',
          fix: 'ALWAYS check the expected-count footnote. If > 20% of cells have expected counts below 5, switch to Fisher\'s Exact Test (for 2×2) or collapse rare categories (for larger tables). Report the assumption check in your write-up.' },

        { type: 'mistake',
          title: 'Mistake 3 — Using chi-square on paired data',
          body: 'You ran chi-square on the same patients\' yes/no diagnosis before and after a treatment. The cases are paired (each patient appears twice), violating the independence assumption.',
          fix: 'For paired binary data use **McNemar\'s test** (Analyze → Nonparametric Tests → Legacy Dialogs → 2 Related Samples → tick McNemar). Chi-square requires independent observations.' },

        { type: 'mistake',
          title: 'Mistake 4 — Reporting chi-square without an effect size',
          body: 'You report "χ²(2) = 28.34, p < .001 — age band is associated with M-Pesa adoption" and stop. With N = 240 even a trivial association becomes "significant"; without Cramer\'s V the reader cannot judge whether the effect is real and important or real and tiny.',
          fix: 'Always report **Cramer\'s V** (or Phi for 2×2 tables) alongside chi-square. Tick Phi and Cramer\'s V in the Statistics dialog; report the value with a verbal interpretation (small / medium / large).' },

        { type: 'mistake',
          title: 'Mistake 5 — Using chi-square when you really want logistic regression',
          body: 'Your outcome is binary (M-Pesa Yes/No), your predictor of interest is continuous (age in years), and you bin age into bands just so you can run chi-square. You\'ve thrown away most of the information in the age variable.',
          fix: 'When you have a binary outcome and a continuous predictor (or several predictors of mixed types), use **binary logistic regression** (lesson `reg-4`). Chi-square is for when both variables are genuinely categorical and you have no continuous information to lose.' },
      ],
    },

    /* ════════════════════ 13. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Chi-square comes in two flavours: **goodness-of-fit** (1 categorical variable vs. hypothesised proportions) and **independence** (2 categorical variables tested for association).',
          'The logic: count observed cases per cell, compute expected counts under the null, sum (O − E)² ÷ E across all cells. Large χ² → real deviation.',
          'Use when: both variables are categorical, each case counted once, observations independent, expected counts ≥ 5.',
          'Goodness-of-fit: Analyze → Nonparametric Tests → Legacy Dialogs → Chi-square. Specify expected values in code order.',
          'Independence: Analyze → Descriptive Statistics → Crosstabs → tick Chi-square AND Phi and Cramer\'s V → Cells tick Observed, Expected, Row percentages.',
          'ALWAYS check the expected-count footnote under the Chi-Square Tests table. >20% of cells with expected counts < 5 → switch to **Fisher\'s Exact Test**.',
          'Fisher\'s Exact is reported automatically for 2×2 tables; click the Exact button for larger tables.',
          'For paired binary data use McNemar\'s test instead.',
          'Report χ²(df, N) = value, p, Cramer\'s V (or Phi for 2×2) with verbal interpretation.',
          'Cramer\'s V benchmarks: .10 small, .30 medium, .50 large.',
          'Five mistakes to avoid: entering percentages, ignoring the expected-count footnote, using it on paired data, omitting effect size, using it when logistic regression is better.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Course complete — Chi-square',
          body: 'You\'ve now covered every common form of chi-square needed for Kenyan postgrad survey research, plus Fisher\'s Exact for small samples. Combined with the parametric tests (t-tests, ANOVA, regression), non-parametric tests (Mann-Whitney, Wilcoxon, Kruskal-Wallis, Friedman), and the Master Decision Tree, you now have a complete toolkit for inferential analysis across every variable-type combination.' },

        { type: 'paragraph', text:
          'Before moving on, find any two categorical variables in your dataset. Run chi-square via Crosstabs with all the recommended options ticked. Check the expected-count footnote, compute Cramer\'s V, and write the APA paragraph. If your variables are 2×2 and any expected count is low, switch to Fisher\'s. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 14. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'You want to test whether gender (M/F) is associated with smartphone ownership (Y/N) in 200 respondents. Which test?',
          choices: [
            'Independent-samples t-test',
            'Chi-square test of independence — both variables are categorical, you\'re testing for association in a 2×2 table',
            'Pearson correlation',
            'One-way ANOVA',
          ],
          answer: 1,
          explanation: 'Both gender and smartphone ownership are categorical (binary) variables — neither is continuous. The natural test for association between two categorical variables is chi-square test of independence (via Crosstabs). t-tests need a continuous outcome; correlation needs two continuous variables; ANOVA needs 3+ groups + a continuous outcome.' },

        { type: 'check',
          question: 'How do chi-square goodness-of-fit and chi-square independence differ?',
          choices: [
            'They are identical',
            'Goodness-of-fit tests ONE categorical variable against hypothesised proportions; independence tests TWO categorical variables for association',
            'Goodness-of-fit is for small samples only',
            'Independence requires normal data',
          ],
          answer: 1,
          explanation: 'Goodness-of-fit takes ONE variable and asks "do these counts match the proportions I hypothesised?" (e.g. does my sample\'s county distribution match the 2019 census?). Independence takes TWO variables and asks "are these two related?" (e.g. is age band associated with M-Pesa adoption?). Different SPSS dialogs, different degrees of freedom, different research questions.' },

        { type: 'check',
          question: 'Your chi-square output footnote says "3 cells (50.0%) have expected count less than 5. The minimum expected count is 1.8." What should you do?',
          choices: [
            'Report the standard Pearson chi-square anyway',
            'Switch to **Fisher\'s Exact Test** (for 2×2) or collapse rare categories (for larger tables) — the standard chi-square p-value is unreliable when too many expected counts are below 5',
            'Increase sample size by duplicating rows',
            'Run a t-test instead',
          ],
          answer: 1,
          explanation: 'The standard chi-square p-value relies on the approximation that expected counts are reasonably large. When >20% of cells have expected counts < 5 (or any cell has expected < 1), the approximation breaks down and the reported p-value is biased. Fisher\'s Exact Test is the appropriate replacement for 2×2 tables (and works for larger tables via the Exact button); alternatively, collapse adjacent rare categories to lift the expected counts.' },

        { type: 'check',
          question: 'You ran chi-square via Crosstabs. Your output shows Cramer\'s V = .12. How do you interpret this?',
          choices: [
            'Strong association',
            'Small association — Cohen\'s benchmarks for Cramer\'s V are .10 small, .30 medium, .50 large',
            'Perfect association',
            'No association at all',
          ],
          answer: 1,
          explanation: 'Cramer\'s V = 0.12 sits just above the .10 small benchmark. A statistically significant chi-square with V = .12 means the association is real but practically small — the two variables are only weakly related. Always report V (and its verbal interpretation) alongside the chi-square; with large samples even a tiny association becomes "significant".' },

        { type: 'check',
          question: 'You measured the same 30 patients\' yes/no diagnosis at baseline AND after treatment. Chi-square test of independence?',
          choices: [
            'Yes — two categorical variables, run Crosstabs',
            'No — the data is PAIRED (same patients twice). Use **McNemar\'s test** instead',
            'Yes, but only if expected counts are ≥ 5',
            'No — use Pearson correlation',
          ],
          answer: 1,
          explanation: 'Chi-square assumes independent observations. Measuring the same patient twice violates that — each patient contributes TWO related observations. The appropriate test for paired binary data is McNemar\'s test (Analyze → Nonparametric Tests → Legacy Dialogs → 2 Related Samples → tick McNemar). Running chi-square here would inflate the apparent sample size and produce an invalid p-value.' },

        { type: 'check',
          question: 'Which sentence is the most professional chi-square report?',
          choices: [
            '"Chi-square was significant."',
            '"p < .05 so they\'re related."',
            '"A chi-square test of independence indicated a significant association between age band and M-Pesa adoption, χ²(2, N = 240) = 28.34, p < .001, Cramer\'s V = .34 (medium-to-large effect). M-Pesa adoption was 81.1% in under-35s, 63.8% in 35-49s, and 40.0% in 50+. All expected counts exceeded 5 (minimum = 28.13), confirming the assumption was met."',
            '"There was a relationship between the two variables."',
          ],
          answer: 2,
          explanation: 'Option C hits every element examiners look for: names the test, identifies what was compared with sample size, reports the row percentages (descriptive evidence), χ² with df AND N, p, Cramer\'s V with verbal interpretation, and notes that the expected-count assumption was met. The other options are vague or missing critical components.' },
      ],
    },
  ],
};
