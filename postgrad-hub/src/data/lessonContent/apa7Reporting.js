/**
 * Writing Up · Lesson 2 — APA 7 statistical reporting in full
 * The exact formatting rules, per-test templates, and table/figure conventions.
 */

export const APA7_REPORTING_LESSON = {
  id: 'write-2',
  title: 'APA 7 statistical reporting — the complete reference',
  subtitle: 'Module 03 · Course: Writing Up · Lesson 2 of 2',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'The single most-used style rulebook in Kenyan postgrad work',
      blocks: [
        { type: 'scene', body: [
          'Your Chapter 4 structure is sound. Your analyses are correct. You upload the draft. Your supervisor sends it back with tracked changes on almost every number: **"t(58) = 3.42"** highlighted with the note *"italicise t"*. **"p = 0.001"** highlighted with *"APA style: p = .001 — no leading zero"*. **"R² = 0.47"** — *"drop the leading zero: R² = .47"*. **"F(2, 117) = 5.80"** — *"F is italicised, degrees of freedom NOT italicised"*. **"M= 34.2"** — *"space between M and ="*.',
          'None of this is about your analysis. It is about **APA 7** — the American Psychological Association\'s style manual (7th edition, 2020), which is the dominant reporting convention in Kenyan Master\'s and PhD work across psychology, education, business, public health, and most of the social sciences. Every examiner assumes you follow it. Almost no student is ever explicitly taught the rules. And so revision cycles get eaten by formatting notes that could have been avoided in the first draft.',
          'This lesson is your one-stop reference for APA 7 statistical reporting. It covers the general number-formatting rules (italics, decimals, leading zeros, spaces), then a per-test template for every inferential test in this SPSS Academy — copy the template, plug in your numbers, done. Then table formatting per APA 7 spec, figure captions, and reference conventions. Save this lesson, come back to it every time you write.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Apply the APA 7 number-formatting rules** — italics, decimals, leading zeros, spaces, capitalisation — from memory.',
            '**Report every test in the SPSS Academy** using the exact APA 7 template.',
            '**Format Chapter 4 tables** per APA 7 spec (title, headers, notes, borders).',
            '**Caption figures** in the standard APA 7 style.',
            '**Handle special cases** — very small p-values (p < .001), effect sizes, confidence intervals.',
            '**Avoid the ten formatting mistakes** that most often appear in supervisor revision notes.',
          ]},

        { type: 'why', body:
          'APA 7 formatting mistakes rarely change your findings but they always slow down your defence. A polished Chapter 4 in impeccable APA 7 sends a signal to examiners: "this student pays attention to detail". A Chapter 4 with inconsistent italics and leading zeros sends the opposite signal. This lesson eliminates the entire revision category of "formatting fixes" from your workflow.' },
      ],
    },

    /* ════════════════════ 2. THE GENERAL RULES ════════════════════ */
    {
      id: 'general-rules',
      title: 'The seven general number-formatting rules',
      blocks: [
        { type: 'heading', level: 2, text: 'Learn these once — they cover 90% of the mistakes' },

        { type: 'comparison',
          headers: ['Rule', 'Correct', 'Incorrect'],
          rows: [
            ['**1. Italicise statistical symbols** (single Roman/Greek letters that stand for something)', '*t*, *F*, *p*, *r*, *M*, *SD*, *N*, *n*, *df*, *R*², *χ*², *β*, *η*²', 't, F, p, r, M, SD, N, n, df, R², χ², β, η² (no italics)'],
            ['**2. Do NOT italicise degrees of freedom, subscripts, function names**', '*F*(2, 117) = 5.80 — F italic, dfs upright', '*F*(2, 117) — dfs italicised too'],
            ['**3. Report probability with NO leading zero** (because p cannot exceed 1)', 'p = .032, p = .001, p < .001', 'p = 0.032, p = 0.001'],
            ['**4. Also NO leading zero for other statistics bounded ±1**', 'r = .48, β = .32, η² = .14, R² = .47, α = .84', 'r = 0.48, β = 0.32'],
            ['**5. DO include leading zeros for statistics that can exceed 1**', 't = 3.42, F = 5.80, M = 34.20, SD = 6.10', 't = .42 (if actually 0.42, write 0.42)'],
            ['**6. Report to 2 decimals for most statistics; 3 decimals for very small p-values**', 'M = 34.20, SD = 6.10, r = .48, p = .032, p = .001, p < .001', 'M = 34.2000, SD = 6.100000'],
            ['**7. Space around every operator** (= < >)',                                                'M = 34.20, p < .001, F > 1', 'M=34.20, p<.001, F>1'],
          ]},

        { type: 'illustration', component: 'ApaFormattingRules',
          caption: 'Figure 1. The seven APA 7 formatting rules illustrated. LEFT column shows correct examples; RIGHT column shows common student errors. Print this and keep next to your keyboard while writing Chapter 4.' },

        { type: 'heading', level: 3, text: 'Special cases for p-values' },

        { type: 'comparison',
          headers: ['Situation', 'How to report'],
          rows: [
            ['p is between .01 and .999',           'Report exact value to 2 or 3 decimals: p = .032, p = .048, p = .217'],
            ['p is smaller than .001',              'Do NOT report zero. Write: p < .001'],
            ['p is exactly on the .05 boundary',   'Report the exact value: p = .050. Do not round to make it "significant".'],
            ['p is very close to but above .05',    'Report the exact value and let the reader interpret: p = .053. Do not describe as "marginally significant" or "trending" — those phrases are increasingly rejected by journals.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'The two commas — dfs and confidence intervals',
          body: 'For F-tests with two degrees of freedom, use comma-space: F(2, 117) — NOT F(2,117). For 95% CIs, use square brackets with comma-space: 95% CI [3.12, 6.85] — NOT (3.12, 6.85) or [3.12-6.85].' },
      ],
    },

    /* ════════════════════ 3. PER-TEST TEMPLATES ════════════════════ */
    {
      id: 'test-templates',
      title: 'Per-test APA 7 reporting templates',
      blocks: [

        { type: 'illustration', component: 'APATemplatesReference',
          caption: 'Figure 1. The master APA 7 statistical reporting cheat sheet — every major test with its template and a Kenyan example side by side. Print this and keep it beside your laptop while writing Chapter 4. Includes Pearson, Spearman, Partial correlation, all 3 t-tests, Mann-Whitney, Wilcoxon, Simple regression, Multiple regression, Binary logistic, Chi-square, One-way ANOVA, and Cronbach alpha.' },

        { type: 'heading', level: 2, text: 'Copy the template, plug in your numbers' },

        { type: 'paragraph', text:
          'Below is the exact APA 7 reporting template for every inferential test in this SPSS Academy. Each template gives the sentence stem, the statistical block, and a real example. Use these verbatim — supervisors will recognise them instantly.' },

        { type: 'heading', level: 3, text: 't-tests' },

        { type: 'illustration', component: 'ApaTestTemplates',
          caption: 'Figure 2. APA 7 reporting templates for the ten most-used tests in postgraduate research. Each row shows the statistical block in the exact format expected. Save this figure as a reference card.' },

        { type: 'comparison',
          headers: ['Test', 'Template', 'Example'],
          rows: [
            ['**Independent-samples t-test**',  'M and SD per group, then: *t*(df) = value, *p* = value, Cohen\'s *d* = value',
             'Nurses at the Level 5 hospital reported higher stress (M = 22.4, SD = 4.1) than nurses at Level 4 (M = 18.1, SD = 4.3); t(62) = 4.07, p < .001, Cohen\'s d = 1.02.'],
            ['**Paired-samples t-test**',        'M and SD per condition, then: *t*(df) = value, *p* = value, Cohen\'s *d* = value',
             'Anxiety scores decreased significantly from before (M = 14.2, SD = 3.1) to after (M = 11.8, SD = 4.7) the intervention; t(29) = 3.42, p = .002, Cohen\'s d = 0.62.'],
            ['**One-sample t-test**',            'Sample M and SD, then: *t*(df) = value, *p* = value, Cohen\'s *d* = value',
             'Sample income (M = 24,300, SD = 8,120 KES) differed significantly from the county median of 22,000; t(199) = 4.01, p < .001, d = 0.28.'],
          ]},

        { type: 'heading', level: 3, text: 'ANOVA family' },

        { type: 'comparison',
          headers: ['Test', 'Template', 'Example'],
          rows: [
            ['**One-way ANOVA**', 'Report: *F*(df1, df2) = value, *p* = value, η² = value or partial η² = value. Follow with Tukey HSD or Games-Howell pairwise where significant.',
             'There was a significant effect of teaching method on mock scores, F(2, 117) = 14.80, p < .001, η² = .20. Tukey HSD tests indicated that the Flipped method (M = 78.3) produced significantly higher scores than both Traditional (M = 60.2, p < .001) and Discussion (M = 71.6, p = .012).'],
            ['**Two-way (factorial) ANOVA**', 'Report each main effect and the interaction separately: *F*(df1, df2) = value, *p* = value, partial η² = value.',
             'There was a significant main effect of method, F(2, 114) = 12.30, p < .001, partial η² = .18; a significant main effect of gender, F(1, 114) = 4.20, p = .043, partial η² = .04; and a significant method × gender interaction, F(2, 114) = 3.85, p = .024, partial η² = .06.'],
            ['**ANCOVA**', 'Adjusted means and SEs, plus: *F*(df1, df2) = value, *p* = value, partial η² = value. Note the covariate result separately.',
             'After controlling for baseline KCPE score, F(1, 116) = 89.20, p < .001, partial η² = .43, teaching method remained a significant predictor of mock score, F(2, 116) = 4.10, p = .019, partial η² = .07. Adjusted means: Traditional M = 291 (SE = 5.2), Discussion M = 309 (SE = 5.1), Flipped M = 325 (SE = 5.3).'],
            ['**Repeated-measures ANOVA**', 'State sphericity result and which correction, then: *F*(df1, df2) = value, *p* = value, partial η² = value.',
             'Mauchly\'s test indicated a violation of sphericity, W = .81, p = .012; Greenhouse-Geisser corrected dfs are reported. HbA1c changed significantly over time, F(1.62, 46.98) = 25.60, p < .001, partial η² = .47.'],
            ['**Mixed ANOVA**', 'Report ALL THREE: between main, within main, and interaction.',
             'There was a significant main effect of time, F(1.62, 116.70) = 25.60, p < .001, partial η² = .26; the between-subjects main effect of treatment was non-significant, F(2, 72) = 0.80, p = .440, partial η² = .02; CRUCIALLY, there was a significant time × treatment interaction, F(3.24, 116.70) = 8.40, p < .001, partial η² = .19.'],
            ['**MANOVA**', 'Report Wilks\' Λ (or Pillai\'s if Box\'s M violated), plus the F approximation.',
             'There was a significant multivariate effect of treatment on the combined outcomes, Wilks\' Λ = .73, F(10, 166) = 2.85, p = .003, partial η² = .15.'],
          ]},

        { type: 'heading', level: 3, text: 'Correlation and regression' },

        { type: 'comparison',
          headers: ['Test', 'Template', 'Example'],
          rows: [
            ['**Pearson correlation**', 'r(df) = value, p = value. Optionally add 95% CI.',
             'Study hours were significantly positively correlated with exam scores, r(198) = .42, p < .001, 95% CI [.30, .53].'],
            ['**Spearman correlation**', 'r_s (rho) with df, p, and CI.',
             'The rank-order correlation between education level and household income was significant, r_s(198) = .38, p < .001.'],
            ['**Simple linear regression**', 'The equation, then: *R*² = value, *F*(df1, df2) = value, *p* = value; per predictor: *B* = value, *SE* = value, *β* = value, *t* = value, *p* = value.',
             'Study hours significantly predicted exam scores, R² = .18, F(1, 198) = 43.61, p < .001. For each additional hour of study, exam scores increased by 3.42 points (B = 3.42, SE = 0.52, β = .42, t = 6.60, p < .001).'],
            ['**Multiple regression**', 'Report the overall model, then a table of predictors (see Tables section below). Text summary: *R*² = value, *F* = value, *p* = value.',
             'The three-predictor model accounted for 34% of the variance in engagement, R² = .34, F(3, 236) = 40.51, p < .001. Perceived support was the strongest predictor (β = .45, p < .001).'],
            ['**Hierarchical regression**', 'Per block: cumulative R² and ΔR² with F Change and Sig. F Change.',
             'Block 1 (demographics) significantly predicted engagement, R² = .09, F(2, 237) = 11.72, p < .001. Adding POS in Block 2 significantly improved the model, ΔR² = .18, F Change(1, 236) = 55.31, p < .001, taking the total variance to R² = .27.'],
            ['**Binary logistic regression**', 'Per predictor: *B* = value, SE, Wald χ², *p*, and Exp(*B*) with 95% CI.',
             'Age significantly predicted M-Pesa adoption; each additional year decreased the odds of adoption by 3% (B = −0.03, SE = 0.01, Wald χ²(1) = 8.42, p = .004, OR = 0.97, 95% CI [0.95, 0.99]).'],
            ['**Multinomial / ordinal logistic**', 'One block per non-reference category (multinomial) or per predictor (ordinal). Report *B*, SE, Wald, *p*, and Exp(*B*) with 95% CI.',
             'In the ordinal model, years of education significantly predicted poverty band: each additional year of education reduced the odds of being in a higher poverty band by 33% (B = −0.40, SE = 0.06, Wald χ²(1) = 50.20, p < .001, OR = 0.67, 95% CI [0.60, 0.75]).'],
          ]},

        { type: 'heading', level: 3, text: 'Chi-square' },

        { type: 'comparison',
          headers: ['Test', 'Template', 'Example'],
          rows: [
            ['**Chi-square independence**', 'χ²(df, N = value) = value, p = value, Cramer\'s V = value.',
             'There was a significant association between age band and M-Pesa adoption, χ²(2, N = 240) = 28.34, p < .001, Cramer\'s V = .34.'],
            ['**Chi-square goodness-of-fit**', 'Observed vs expected, then: χ²(df, N = value) = value, p = value.',
             'The observed county distribution differed significantly from the 2019 census proportions, χ²(3, N = 200) = 12.60, p = .006.'],
            ['**Fisher\'s Exact Test**', 'Report the exact p-value (chi-square usually not required).',
             'Fisher\'s Exact Test was used because two cells had expected counts below 5; the association between clinic type and drop-out was significant, p = .018.'],
          ]},

        { type: 'heading', level: 3, text: 'Non-parametric tests' },

        { type: 'comparison',
          headers: ['Test', 'Template', 'Example'],
          rows: [
            ['**Mann-Whitney U**', 'MEDIAN and IQR per group, then: U = value, z = value, p = value, r = value.',
             'Manyatta households reported higher incomes (Mdn = 11,200 KES, IQR = 7,800-18,500) than Obunga (Mdn = 7,500, IQR = 4,200-12,000); U = 133.00, z = −2.21, p = .027, r = .34.'],
            ['**Wilcoxon signed-rank**', 'MEDIAN per condition, direction counts, then: z = value, p = value, r = value.',
             'Anxiety scores decreased from before (Mdn = 14) to after (Mdn = 12) the session; of 22 participants who changed, 18 improved and 4 worsened; z = −3.16, p = .002, r = .65.'],
            ['**Kruskal-Wallis**', 'MEDIANS and IQRs per group, then: H(df) = value (labelled Chi-Square in SPSS), p = value, η²_H = value.',
             'Digital chamas produced higher revenues (Mdn = 36,000) than accumulating (Mdn = 24,000) or traditional (Mdn = 18,000); H(2) = 12.84, p = .002, η²_H = .13.'],
            ['**Friedman**', 'MEDIANS per time point, then: χ²_F(df) = value, p = value, Kendall\'s W = value.',
             'HbA1c decreased significantly across baseline (Mdn = 8.4), month 3 (Mdn = 7.8), and month 6 (Mdn = 7.2), χ²_F(2) = 38.94, p < .001, Kendall\'s W = .61.'],
          ]},

        { type: 'heading', level: 3, text: 'Reliability' },

        { type: 'comparison',
          headers: ['Test', 'Template', 'Example'],
          rows: [
            ['**Cronbach\'s alpha**', 'α = value, k = number of items.',
             'The 10-item job satisfaction scale demonstrated good internal consistency, α = .84, k = 10.'],
            ['**Split-half reliability**', 'Spearman-Brown = value.',
             'Split-half reliability of the engagement scale was Spearman-Brown = .82.'],
          ]},
      ],
    },

    /* ════════════════════ 4. TABLES ════════════════════ */
    {
      id: 'tables',
      title: 'Table formatting per APA 7',
      blocks: [

        { type: 'illustration', component: 'APATableRules',
          caption: 'Figure 2. APA 7 table formatting — the 7 rules with a visual example. Only horizontal borders. Table number + italicized title on separate lines above. Bold column headers. Aligned numbers. Italic Note below. Bookmark this — you will need it every time you build a table for your thesis.' },


        { type: 'illustration', component: 'APABadVsGoodTable',
          caption: 'Figure 3. Raw SPSS output vs APA 7 reformatted — the same Machakos correlation matrix, two dramatically different presentations. NEVER paste SPSS directly into your thesis. Always reformat: strip vertical borders, use only the lower triangle, replace 1.000s with em dashes, use human-readable variable names, add proper Table number + italic title + Note.' },


        { type: 'heading', level: 2, text: 'The five APA 7 table rules' },

        { type: 'illustration', component: 'ApaTableExample',
          caption: 'Figure 3. An APA 7 compliant Chapter 4 table. (1) Table number in bold on its own line ABOVE the title. (2) Title in italics ON A SEPARATE LINE, in title case. (3) Only three horizontal borders — top, below header row, and bottom — NO vertical lines. (4) Numbers aligned by decimal. (5) A general Note (italic "Note.") below the table for abbreviations, sample size, and significance markers.' },

        { type: 'steps', steps: [
          { title: 'Rule 1 — Number and title on separate lines above the table',
            body: '**Table 4.7** on its own bolded line. Then on the next line, in *italics* and Title Case: *Hierarchical Regression Predicting Employee Engagement*. NO period after the title. NO "Table 4.7:" — the number and title go on separate lines.' },
          { title: 'Rule 2 — Horizontal borders only, no vertical lines',
            body: 'APA 7 tables have EXACTLY THREE horizontal borders: (1) at the top, (2) below the header row, (3) at the bottom. NO other borders — no vertical lines, no gridlines inside the body. This is the single most-broken APA rule in student work.' },
          { title: 'Rule 3 — Align numbers by decimal point',
            body: 'Right-align or decimal-align all numeric columns so decimals line up. Left-align text columns (predictor names).' },
          { title: 'Rule 4 — Report to consistent decimals',
            body: '2 decimals for most stats (M, SD, β, r). 3 decimals only for very small p-values (p = .001 vs p < .001). Do NOT mix 1-decimal, 2-decimal, and 5-decimal values in the same column.' },
          { title: 'Rule 5 — Use a Note. line under the table for abbreviations, N, and significance',
            body: 'Below the table, an italic "*Note.*" followed by expansions of any abbreviation, the sample size, and significance markers. Example: "*Note.* N = 240. POS = perceived organisational support. * p < .05. ** p < .01. *** p < .001."' },
        ]},

        { type: 'heading', level: 3, text: 'Common table types with APA 7 spec' },

        { type: 'comparison',
          headers: ['Table type', 'Column headers'],
          rows: [
            ['**Sample characteristics**',   'Variable | Category | Frequency (n) | Percentage (%)'],
            ['**Descriptive statistics (continuous)**', 'Variable | n | M | SD | Min | Max'],
            ['**Descriptive statistics (Likert items grouped)**', 'Item | n | M | SD | % Agree'],
            ['**Reliability**',              'Scale | k (items) | Cronbach\'s α'],
            ['**Correlation matrix**',         'Variable | 1 | 2 | 3 | ... (with M and SD in a separate top or side panel)'],
            ['**t-test**',                    'Group | n | M | SD | t | df | p | Cohen\'s d'],
            ['**One-way ANOVA**',              'Source | SS | df | MS | F | p | η²'],
            ['**Multiple regression**',        'Predictor | B | SE | β | t | p | 95% CI'],
            ['**Hierarchical regression**',    'Predictor | B | SE | β | t | p (columns grouped by block, with ΔR² row per block)'],
            ['**Logistic regression**',        'Predictor | B | SE | Wald | df | p | Exp(B) | 95% CI'],
            ['**Chi-square (crosstab)**',     'Row category × column category cells with n and % (row or column), Total row and column'],
          ]},
      ],
    },

    /* ════════════════════ 5. FIGURES ════════════════════ */
    {
      id: 'figures',
      title: 'Figure formatting per APA 7',
      blocks: [
        { type: 'heading', level: 2, text: 'Figures follow the same numbering + title format as tables' },

        { type: 'steps', steps: [
          { title: 'Number and title above the figure',
            body: '**Figure 4.1** on its own bolded line. Below that: *Interaction Between Treatment Arm and Time on HbA1c* — in italics, title case, no ending period.' },
          { title: 'Figure body — clean, high-contrast, no unnecessary chartjunk',
            body: 'Prefer line plots and bar charts over 3D pie charts. Every axis has a clear label. Legend clearly identifies each group. Use greyscale-friendly patterns (dashed vs solid lines, not just colours) so the figure works when printed.' },
          { title: 'Caption / Note beneath the figure',
            body: 'An italic "*Note.*" line below the figure explaining what the reader should notice. E.g.: "*Note.* Error bars represent 95% CIs. n = 25 per treatment arm. The Full Programme arm showed steepest decline across the 12-week period."' },
        ]},

        { type: 'callout', tone: 'gold', title: 'When to use a figure vs a table',
          body: 'Use a **table** when precise numbers matter (regression coefficients, means with SDs). Use a **figure** when patterns matter (interaction lines, trajectories, distributions). If the reader has to squint at the figure to guess numbers, use a table. If the reader has to eyeball a table to see a trend, use a figure. Never duplicate the same content in both.' },
      ],
    },

    /* ════════════════════ 6. WORKED EXAMPLE — REWRITTEN PARAGRAPH ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — a badly-written paragraph rewritten in APA 7',
      blocks: [
        { type: 'workedExample', title: 'Before vs After — one Chapter 4 paragraph',
          body: [
            { label: 'BEFORE (student\'s first draft)',
              text: '"A t-test was done to compare males and females on job satisfaction. The results showed that Males M=34.2 SD=6.1 was less than Females M=37.8 SD=5.9. The test was significant t = 3.42, df = 238, p = 0.001. This means females are more satisfied than males in this study which supports the findings of Kimani (2020) who also found females were more satisfied and this might be because women in Kenyan workplaces feel more supported by their peers."' },
            { label: 'Problems with the first draft',
              text: '(1) "A t-test was done" — passive/vague; specify **independent-samples** t-test. (2) M=34.2 — missing space around =. (3) Statistics not italicised. (4) Leading zero: p = 0.001 should be p = .001. (5) df in wrong place — APA format is t(238) = 3.42. (6) Cohen\'s d effect size missing. (7) Extensive interpretation and literature comparison — belongs in Chapter 5, not 4.' },
            { label: 'AFTER (APA 7 compliant Chapter 4 version)',
              text: '"An independent-samples t-test was conducted to compare male and female employees on job satisfaction. Female employees reported significantly higher satisfaction (M = 37.80, SD = 5.90) than male employees (M = 34.20, SD = 6.10); t(238) = 3.42, p = .001, Cohen\'s d = 0.60, indicating a medium-sized effect. Levene\'s test confirmed equal variances, p = .672."' },
            { label: 'What changed',
              text: '(1) Test name explicit ("independent-samples t-test"). (2) All statistical symbols italicised. (3) No leading zero on p. (4) t(238) = 3.42 format. (5) Effect size (Cohen\'s d) reported with interpretation. (6) Levene\'s check reported. (7) NO literature comparison — that entire sentence about Kimani (2020) and Kenyan workplace culture moves to Chapter 5. Chapter 4 sentence ends with "medium-sized effect", period.' },
          ]},
      ],
    },

    /* ════════════════════ 7. TEN COMMON APA MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'The ten APA 7 mistakes that fill supervisor tracked-change notes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Leading zeros on statistics bounded ±1',
          body: 'You wrote p = 0.032, r = 0.48, β = 0.32, R² = 0.47.',
          fix: 'Remove leading zeros for any statistic that mathematically cannot exceed 1: p = .032, r = .48, β = .32, R² = .47, Cramer\'s V = .34, η² = .14. Keep leading zeros on stats that CAN exceed 1: t = 3.42, F = 14.80, M = 34.20.' },

        { type: 'mistake',
          title: 'Mistake 2 — Statistical symbols not italicised',
          body: 'You wrote "t = 3.42, p = .001, R2 = .47" in plain text.',
          fix: 'Italicise every single Roman/Greek letter that stands for a statistic: *t* = 3.42, *p* = .001, *R*² = .47, *M* = 34.20, *SD* = 6.10, *F* = 5.80, *df* is italic too. Degrees of freedom in parentheses are NOT italic. In Word, select and Ctrl+I.' },

        { type: 'mistake',
          title: 'Mistake 3 — Reporting p = 0.000',
          body: 'You copied SPSS\'s output which shows p = .000.',
          fix: 'SPSS truncates to three decimals. p is never literally zero. Write p < .001 instead. This is the SINGLE most-corrected APA mistake in student drafts.' },

        { type: 'mistake',
          title: 'Mistake 4 — Missing degrees of freedom on F',
          body: 'You wrote "F = 14.80, p < .001".',
          fix: 'F ALWAYS requires two degrees of freedom in parentheses (numerator, denominator): F(2, 117) = 14.80, p < .001. Same for chi-square: χ²(2, N = 240) = 28.34.' },

        { type: 'mistake',
          title: 'Mistake 5 — No effect size reported',
          body: 'You reported the test statistic and p-value but no effect size.',
          fix: 'APA 7 requires an effect size for every inferential test. t-test → Cohen\'s d. ANOVA → η² or partial η². Correlation → r itself is the effect size. Regression → β and R². Chi-square → Cramer\'s V. Non-parametric → r = |z|/√N or η²_H. If unsure which, refer back to the specific test\'s lesson.' },

        { type: 'mistake',
          title: 'Mistake 6 — Vertical lines in tables',
          body: 'Your Chapter 4 tables have vertical lines separating every column (SPSS\'s default).',
          fix: 'Remove them. APA 7 tables have exactly THREE horizontal borders (top, below header, bottom) and NO vertical lines anywhere. In Word: right-click table → Table Properties → Borders and Shading → apply "None" to all inside borders, keep outside top and bottom.' },

        { type: 'mistake',
          title: 'Mistake 7 — "Marginally significant" or "trending toward significance"',
          body: 'Your p = .058 and you called it "marginally significant" or "approached significance".',
          fix: 'APA 7 discourages these phrases. Report the exact p-value and let the reader judge: "The effect was not statistically significant, p = .058." Alternatively, focus on the effect size and its confidence interval: "The effect was small (d = 0.22) with a 95% CI [−0.02, 0.46] that included zero." Do not creatively describe p-values > .05.' },

        { type: 'mistake',
          title: 'Mistake 8 — Missing spaces around operators',
          body: 'You wrote "M=34.20" or "p<.001".',
          fix: 'Always space around = < >. Write M = 34.20, p < .001, F > 1. This alone is 20-30% of a typical supervisor\'s tracked changes.' },

        { type: 'mistake',
          title: 'Mistake 9 — Inconsistent decimals within a column',
          body: 'One row of your table shows M = 34.2, another M = 37.85, another M = 22.100.',
          fix: 'Use the SAME number of decimals throughout each column. 2 decimals is standard for M, SD, β, r, R², partial η². Only use 3 decimals for very small p-values.' },

        { type: 'mistake',
          title: 'Mistake 10 — Sample size not reported alongside the test',
          body: 'You reported "t(238) = 3.42, p = .001" but the reader has to hunt for the n.',
          fix: 'For between-groups tests, report the per-group n in the descriptive part of the sentence ("Female n = 132, Male n = 108"). For overall model tests, include N in the chi-square parentheses (χ²(2, N = 240)) or state N at the start of the section. Never leave the reader guessing about sample size.' },
      ],
    },

    /* ════════════════════ 8. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'APA 7 is the dominant reporting convention in Kenyan postgrad research — supervisors and examiners assume you follow it.',
          'Seven general rules: italicise statistical symbols; do NOT italicise dfs, subscripts, or function names; NO leading zeros on stats bounded ±1 (p, r, β, R², η²); YES leading zeros on stats that can exceed 1 (t, F, M, SD); 2 decimals standard, 3 for tiny p-values; space around = < >.',
          'Never write p = .000 — SPSS truncation. Write p < .001.',
          'Report exact p-values (p = .032) except when p < .001.',
          'Every inferential test requires an effect size: Cohen\'s d (t-test), partial η² (ANOVA), r (correlation), R² and β (regression), Cramer\'s V (chi-square), r = |z|/√N (non-parametric).',
          'F always needs two dfs: F(df1, df2). Chi-square needs df and N: χ²(df, N = value).',
          'Tables: bolded number on its own line, italic Title Case title on the next line, three horizontal borders only (no vertical lines), decimal-aligned numbers, italic "Note." line below.',
          'Figures: same numbering/title format. Include a Note explaining what to look for. Prefer line/bar plots over 3D pie charts.',
          'Table vs figure: precise numbers → table; visual pattern → figure. Never duplicate the same content in both.',
          'Ten most-corrected APA mistakes: leading zeros, missing italics, p = 0.000, missing dfs on F, no effect size, vertical table lines, "marginally significant" language, missing operator spaces, inconsistent decimals, missing sample size.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Course complete — Writing Up',
          body: 'You\'ve now finished the **Writing Up** course — structuring the six-section Chapter 4 (Lesson 1) and reporting every test in perfect APA 7 (Lesson 2). Combined with the analytical lessons across the rest of the SPSS Academy, you now have the full pipeline: from data collection to defensible, publishable thesis chapter.' },

        { type: 'paragraph', text:
          'Before moving on, pick one paragraph from your own draft Chapter 4 and rewrite it applying the APA 7 rules from this lesson — italicise the statistical symbols, remove leading zeros, add the effect size, tighten the sentence. Then compare to your original and count the changes. Save this lesson as your reference card. Come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 9. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'Which of the following is written correctly in APA 7?',
          choices: [
            't = 3.42, df = 238, p = 0.001',
            't(238) = 3.42, p = .001',
            'T(238) = 3.42, P = .001',
            't = 3.42 (238), p < 0.001',
          ],
          answer: 1,
          explanation: 'APA 7: italicise t and p (shown as regular text here but should be italic in Word), degrees of freedom go in parentheses attached to the t, NO leading zero on p because p cannot exceed 1. The format is t(df) = value, p = value.' },

        { type: 'check',
          question: 'SPSS shows your p-value as .000. How do you report it in APA 7?',
          choices: [
            'p = 0.000',
            'p = .000',
            'p < .001 — SPSS truncates to three decimals; p is never literally zero',
            'p is significant',
          ],
          answer: 2,
          explanation: 'The most common APA mistake in student drafts. SPSS displays very small p-values as ".000" because it truncates to three decimals, but p mathematically cannot be zero. Always convert to p < .001. Never write p = .000 or p = 0.000.' },

        { type: 'check',
          question: 'Which stats need a leading zero in APA 7?',
          choices: [
            'All statistics need leading zeros',
            'NONE of them — always drop leading zeros',
            'Stats that can exceed 1 keep leading zeros (t, F, M, SD, z); stats bounded ±1 drop them (p, r, β, R², η², Cramer\'s V)',
            'Only p-values',
          ],
          answer: 2,
          explanation: 'The distinction is whether the statistic can mathematically exceed 1. Probabilities (p), correlations (r, β), variance-explained proportions (R², η², partial η², Cramer\'s V) are all bounded within [-1, 1] or [0, 1] and drop the leading zero: p = .032, r = .48. Statistics that can exceed 1 (t, F, M, SD, z, χ²) keep the leading zero: t = 3.42, M = 34.20.' },

        { type: 'check',
          question: 'APA 7 tables should have how many horizontal borders?',
          choices: [
            'None — modern tables are borderless',
            'One border below each row',
            'THREE — at the top, below the header row, and at the bottom. NO vertical lines anywhere',
            'Full grid — borders around every cell',
          ],
          answer: 2,
          explanation: 'APA 7 tables have exactly three horizontal borders and NO vertical lines. This is the single most-broken table rule in student drafts (SPSS default styling has vertical lines everywhere). In Word: Table Properties → Borders → set inside borders to None, keep top/bottom outside borders.' },

        { type: 'check',
          question: 'You ran an independent-samples t-test. Which effect size should you report in APA 7?',
          choices: [
            'None — the p-value is enough',
            'Cohen\'s d',
            'Cramer\'s V',
            'Kendall\'s W',
          ],
          answer: 1,
          explanation: 'APA 7 requires an effect size for every inferential test. For t-tests it is **Cohen\'s d**. For ANOVA use partial η². For correlation the r itself is the effect size. For regression use β and R². For chi-square use Cramer\'s V. For non-parametric tests use r = |z|/√N (Mann-Whitney/Wilcoxon), η²_H (Kruskal-Wallis), or Kendall\'s W (Friedman).' },

        { type: 'check',
          question: 'Your p-value came out at .058. How should you describe it in APA 7?',
          choices: [
            'Marginally significant',
            'Approaching significance',
            'Report the exact value and let the reader judge: "The effect was not statistically significant, p = .058." Consider reporting the effect size and 95% CI to convey magnitude',
            'Round down to .05 and call it significant',
          ],
          answer: 2,
          explanation: 'APA 7 discourages phrases like "marginally significant" and "approaching significance" — they attempt to soften a non-significant result. Report the exact p-value factually. If the effect size is substantial, mention it and its confidence interval so the reader sees the magnitude picture even if p > .05. Never round p to make a result appear significant.' },
      ],
    },
  ],
};
