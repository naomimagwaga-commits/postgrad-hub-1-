/**
 * Advanced Regression · Lesson 2 — Multinomial & Ordinal Logistic Regression
 * Extending logistic regression from binary to 3+ category outcomes.
 */

export const MULTINOMIAL_ORDINAL_LOGISTIC_LESSON = {
  id: 'advreg-2',
  title: 'Multinomial & ordinal logistic regression',
  subtitle: 'Module 03 · Course: Advanced Regression · Lesson 2 of 2',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When your outcome has more than two categories',
      blocks: [
        { type: 'scene', body: [
          'You are doing a Master\'s study at Strathmore on urban transport choice. You surveyed 480 commuters in Nairobi and asked one core outcome question: "What is your main mode of commuting?" The four options were **matatu**, **boda-boda**, **personal car**, and **walking**. Your predictors include age, gender, monthly income, distance from CBD, and whether they have a driving licence.',
          'You learned binary logistic regression in lesson `reg-4` — but that handles two categories (yes/no, pass/fail). Here you have four. You cannot just pick "matatu vs everything else" — that throws away the distinction between boda, car, and walking. You need a regression that handles **more than two outcome categories at once**.',
          'There are two such methods, and which one you use depends on whether your categories have a natural ORDER. **Multinomial logistic regression** is for UNORDERED categories — matatu vs boda vs car vs walking. There is no natural ranking. **Ordinal logistic regression** is for ORDERED categories — poverty band Low / Lower-Middle / Upper-Middle / High, where Low < Lower-Middle < Upper-Middle < High in a meaningful way. This lesson teaches both. By the end you\'ll know when each applies, how to run them in SPSS, how to read odds ratios across multiple comparison categories, and how to check the parallel-lines (proportional-odds) assumption that ordinal logistic critically depends on.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Tell multinomial and ordinal apart** in 10 seconds based on whether your outcome categories have natural order.',
            '**Run multinomial logistic regression** via Analyze → Regression → Multinomial Logistic.',
            '**Run ordinal logistic regression** via Analyze → Regression → Ordinal.',
            '**Read the multinomial output** — one set of coefficients per non-reference category, computed against your chosen reference category.',
            '**Read the ordinal output** — one set of coefficients PLUS k − 1 threshold cut-points.',
            '**Check the parallel-lines (proportional-odds) assumption** for ordinal — and switch to multinomial if it fails.',
            '**Compute and interpret odds ratios** with their 95% CIs — the key effect measure for both tests.',
            '**Write up** the result in APA style with all the elements your reviewer will look for.',
          ]},

        { type: 'why', body:
          'Survey research in Kenya routinely produces outcomes with 3+ categories — mode of transport, vaccination status (Full / Partial / None), poverty band, agreement-level Likert items used as outcomes. Binary logistic regression cannot handle them. Multinomial and ordinal logistic regression are the workhorses for these analyses; one or the other appears in nearly every social-science PhD that uses categorical outcomes with more than two levels.' },
      ],
    },

    /* ════════════════════ 2. CHOOSING ════════════════════ */
    {
      id: 'choosing',
      title: 'Multinomial vs ordinal — the one question that decides',
      blocks: [
        { type: 'heading', level: 2, text: 'Are your categories ordered?' },

        { type: 'paragraph', text:
          'The entire choice between multinomial and ordinal logistic regression comes down to a single question: **do my outcome categories have a meaningful natural order?**' },

        { type: 'illustration', component: 'MachakosRegWhenToUseWhich',
          caption: 'Figure 1. Which regression should I use? A decision tree based on DV type. CONTINUOUS DV → Linear (Lesson 1-2). BINARY DV → Binary Logistic (Lesson 4). ORDINAL DV → Ordinal Regression (this lesson). NOMINAL 3+ DV → Multinomial Logistic (this lesson). Each terminal box shows a Machakos example, the SPSS menu path, and the key output metric.' },

        { type: 'comparison',
          headers: ['', 'Multinomial', 'Ordinal'],
          rows: [
            ['**Outcome has natural order?**',  'NO',                                          'YES'],
            ['**Examples**',                     'Transport mode, religion, party voted for, marital status, county of residence', 'Education (None / Primary / Secondary / Tertiary), poverty band, agreement Likert, satisfaction level, disease severity (Mild / Moderate / Severe)'],
            ['**Test in SPSS**',                 'Analyze → Regression → **Multinomial Logistic**', 'Analyze → Regression → **Ordinal**'],
            ['**Coefficients per predictor**',  'k − 1 sets (one for each non-reference category vs the reference)', '1 set (single coefficient per predictor — uses ALL the ordering information)'],
            ['**Special assumption**',           'None special beyond the usual logistic assumptions', '**Parallel lines / proportional odds** assumption — must be checked'],
            ['**If you have continuous predictors with both**', 'Always works',                'Works, but check the assumption'],
            ['**Default reference category**',   'The HIGHEST coded value (you can change it)', 'The HIGHEST coded value'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Why ordinal is more powerful when applicable',
          body: 'Ordinal regression uses the ORDER information in your outcome — it knows Low < Medium < High. Multinomial throws that order away and treats Low, Medium, High as three unrelated categories. When the order is real AND the parallel-lines assumption holds, ordinal regression gives you tighter standard errors, fewer parameters, and a cleaner interpretation. Always TRY ordinal first when your outcome is ordered; fall back to multinomial only if the assumption fails or the categories are not really ordered after all.' },

        { type: 'reveal',
          prompt: 'Your outcome is "agreement with new transport policy" measured on a 5-point Likert: Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree. Multinomial or ordinal?',
          answer: '**Ordinal** — these five categories have a clear, meaningful order from low to high agreement. Use Analyze → Regression → Ordinal. You will get ONE coefficient per predictor (much cleaner than four coefficients per predictor for multinomial). BUT you must check the parallel-lines (proportional-odds) assumption in the output. If it fails (Sig. < .05 in the Test of Parallel Lines), the predictor effects differ across thresholds and you must either (a) collapse the Likert into fewer categories, (b) fall back to multinomial, or (c) use a more advanced partial-proportional-odds model.' },
      ],
    },

    /* ════════════════════ 3. MULTINOMIAL — BIG IDEA ════════════════════ */
    {
      id: 'multinomial-big-idea',
      title: 'Multinomial — the big idea',
      blocks: [
        { type: 'heading', level: 2, text: 'k − 1 binary comparisons against a reference category' },

        { type: 'paragraph', text:
          'Multinomial logistic regression handles a k-category outcome by running k − 1 simultaneous binary logistic comparisons, each AGAINST A REFERENCE CATEGORY of your choice. For our transport example with 4 categories (matatu, boda, car, walking), if we choose **matatu as the reference**, multinomial produces three sets of coefficients:' },

        { type: 'list', items: [
          '**Boda vs matatu** — what predicts choosing boda OVER matatu?',
          '**Car vs matatu** — what predicts choosing car OVER matatu?',
          '**Walking vs matatu** — what predicts choosing walking OVER matatu?',
        ]},

        { type: 'paragraph', text:
          'Each comparison gives you the same predictor coefficients you would get if you had run a binary logistic for that pair — but multinomial does all three SIMULTANEOUSLY using the entire dataset, which is more efficient and more powerful than three separate binary regressions.' },

        { type: 'definition', term: 'Reference category',
          body: 'The outcome category against which all other categories are compared. In SPSS Multinomial Logistic, by default the reference is the HIGHEST coded value. You should usually change it to a SUBSTANTIVELY MEANINGFUL baseline — e.g. the most common category in your sample, or the one your research question contrasts everything else against. Change via Analyze → Regression → Multinomial Logistic → Reference Category button.' },

        { type: 'callout', tone: 'warning', title: 'Always pick a sensible reference category',
          body: 'A poorly chosen reference makes interpretation painful. If 65% of commuters take matatus, make matatu the reference — every coefficient then answers "what predicts choosing alternative X over the dominant matatu?". If you leave the default and the reference becomes "walking" (highest code), your output reads "what predicts choosing car over walking?" — much less natural.' },
      ],
    },

    /* ════════════════════ 4. MULTINOMIAL — SPSS ════════════════════ */
    {
      id: 'multinomial-spss',
      title: 'Running multinomial logistic in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'The 7-step click path' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → Regression → Multinomial Logistic.' },
          { title: 'Move your outcome to Dependent',
            body: 'The categorical outcome variable (e.g. **transport_mode**, coded 1 = matatu, 2 = boda, 3 = car, 4 = walking).' },
          { title: 'Click Reference Category',
            body: 'IMPORTANT. By default SPSS uses the highest coded value. Change to "First Category" if your most meaningful baseline is coded 1 (e.g. matatu), or pick "Custom" to specify a code. Click Continue.' },
          { title: 'Move categorical predictors to Factor(s)',
            body: 'E.g. **gender, licence_held**. SPSS will automatically dummy-code these.' },
          { title: 'Move continuous predictors to Covariate(s)',
            body: 'E.g. **age, income, distance_to_cbd**.' },
          { title: 'Click Statistics — tick the essentials',
            body: 'Under Model: Pseudo R-square (Cox & Snell, Nagelkerke, McFadden), Goodness-of-fit. Under Parameters: Estimates, Likelihood ratio tests. Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces several tables. The KEY ones are Model Fitting Information (overall significance), Pseudo R-Square, Likelihood Ratio Tests (which predictors matter overall), and Parameter Estimates (the k − 1 sets of coefficients with odds ratios in the "Exp(B)" column).' },
        ]},

        { type: 'illustration', component: 'MultinomialDialog',
          caption: 'Figure 2. The Multinomial Logistic dialog. Dependent = transport_mode. Factor(s) = categorical predictors (gender, licence_held). Covariate(s) = continuous predictors (age, income, distance_to_cbd). Click Reference Category to pick a substantive baseline; click Statistics to enable the key output tables.' },
      ],
    },

    /* ════════════════════ 5. MULTINOMIAL — OUTPUT ════════════════════ */
    {
      id: 'multinomial-output',
      title: 'Reading multinomial output',
      blocks: [
        { type: 'heading', level: 2, text: 'Three coefficient tables in one' },

        { type: 'illustration', component: 'MultinomialOutput',
          caption: 'Figure 3. Multinomial Parameter Estimates with matatu as the reference. Three blocks of coefficients — one per non-reference category. For each predictor SPSS prints B (log-odds), Std. Error, Wald, df, Sig., and Exp(B) (the odds ratio) with its 95% CI. Read the table block by block: each block tells you what predicts choosing THAT mode over matatu.' },

        { type: 'heading', level: 3, text: 'Key tables to read in order' },

        { type: 'comparison',
          headers: ['Table', 'What it tells you'],
          rows: [
            ['**Model Fitting Information**',  'Compares your model to the intercept-only (null) model. Significant chi-square = your predictors collectively improve fit.'],
            ['**Goodness-of-Fit**',             'Pearson and Deviance tests of overall model fit. Both p > .05 = good fit. With continuous predictors these can be unreliable; rely on the other diagnostics.'],
            ['**Pseudo R-Square**',             'Nagelkerke R² is the most-reported. Treat as a rough analog of regression R² — values around .10–.20 are typical for behavioural multinomial models. McFadden also reported (lower values).'],
            ['**Likelihood Ratio Tests**',      'Whether each predictor (across ALL its comparison categories) contributes significantly to the model. The overall p for each predictor.'],
            ['**Parameter Estimates**',         'The heart of the output. k − 1 blocks, one per non-reference outcome category. Each block lists every predictor with B, Sig., Exp(B), and 95% CI for Exp(B).'],
          ]},

        { type: 'heading', level: 3, text: 'Reading a Parameter Estimates row' },

        { type: 'comparison',
          headers: ['Column', 'What it shows', 'Example'],
          rows: [
            ['**B**',           'Log-odds coefficient. Sign indicates direction (positive = higher odds of THIS category vs reference).', 'B = 1.18 for income predicting car vs matatu → log-odds rise by 1.18 per unit of income.'],
            ['**Std. Error**',  'Standard error of B.',                                                                                    '.32'],
            ['**Wald**',         'Test statistic: (B / SE)². Compared to chi-square with 1 df.',                                            '13.5'],
            ['**df**',           'Degrees of freedom (usually 1 for a single coefficient).',                                                 '1'],
            ['**Sig.**',         'p-value for this specific comparison. < .05 = significant predictor for THIS pair.',                       '< .001'],
            ['**Exp(B)**',       'The ODDS RATIO — the multiplicative change in odds per unit of the predictor. **This is what you report.**', 'Exp(1.18) = 3.25 → for every 1-unit increase in income, the odds of choosing car over matatu multiply by 3.25.'],
            ['**95% CI for Exp(B)**', 'Confidence interval for the odds ratio. If 1.0 is OUTSIDE the CI, the effect is significant.',           '[1.73, 6.12] — well above 1, large effect.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Odds-ratio interpretation in plain English',
          body: '**Exp(B) > 1** → predictor INCREASES odds of choosing THIS category over the reference. **Exp(B) < 1** → predictor DECREASES odds (e.g. Exp(B) = 0.50 means odds are halved per unit). **Exp(B) = 1** → no effect. The 95% CI tells you the plausible range; if it excludes 1.0, the effect is statistically significant.' },

        { type: 'reveal',
          prompt: 'In the Boda vs Matatu block, Exp(B) for "age" = 0.94 with 95% CI [0.91, 0.97]. What does this mean substantively?',
          answer: '**Each additional year of age reduces the odds of choosing boda over matatu by 6%.** Exp(B) = 0.94 means the odds are multiplied by 0.94 per year — equivalent to a 6% reduction. The 95% CI [0.91, 0.97] excludes 1.0, so the effect is statistically significant. Practically: a 30-year-old has odds (0.94)^10 ≈ 0.54 — about HALF — the odds of a 20-year-old of choosing boda over matatu. Younger commuters strongly prefer boda; older commuters strongly prefer matatu (among these two options).' },
      ],
    },

    /* ════════════════════ 6. ORDINAL — BIG IDEA ════════════════════ */
    {
      id: 'ordinal-big-idea',
      title: 'Ordinal — the big idea',
      blocks: [
        { type: 'heading', level: 2, text: 'One coefficient per predictor, k − 1 thresholds' },

        { type: 'paragraph', text:
          'Ordinal logistic regression (also called proportional-odds logistic regression) exploits the natural order of your outcome categories. Instead of producing k − 1 separate sets of coefficients (the multinomial approach), it produces ONE set of coefficients per predictor — a single coefficient that simultaneously describes how the predictor shifts the entire distribution UP the ordered outcome scale.' },

        { type: 'paragraph', text:
          'The model achieves this by imagining a latent continuous variable underlying your ordered outcome, then placing k − 1 THRESHOLDS (cut-points) along that continuum to define where one category ends and the next begins. Predictors shift the latent variable; the thresholds stay fixed. This is conceptually elegant and far more parsimonious than multinomial when the assumption holds.' },

        { type: 'illustration', component: 'OrdinalThresholds',
          caption: 'Figure 4. Ordinal logistic intuition. A latent continuous variable runs left-right. Three thresholds carve it into four ordered categories (Low / Lower-Middle / Upper-Middle / High poverty band). Predictors (e.g. years of education) SHIFT the latent variable left or right; the thresholds remain fixed. A negative coefficient (e.g. β = −0.4 for education) means more education shifts a respondent\'s latent value LEFT (toward Low) — lower poverty band.' },

        { type: 'definition', term: 'Proportional odds (parallel lines) assumption',
          body: 'The critical assumption of ordinal logistic regression: the effect of each predictor is the SAME ACROSS ALL THRESHOLDS. I.e. the coefficient for education that predicts "Low vs ≥ Lower-Middle" is the same coefficient that predicts "≤ Lower-Middle vs ≥ Upper-Middle" and "≤ Upper-Middle vs High". If this assumption holds, the single coefficient is valid. If it FAILS (Test of Parallel Lines comes back with p < .05), the predictor\'s effect actually differs across thresholds and ordinal logistic gives misleading results.' },

        { type: 'callout', tone: 'warning', title: 'What to do if proportional odds fails',
          body: '**Option 1 (simplest):** collapse adjacent outcome categories to reduce the number of thresholds (e.g. merge Lower-Middle and Upper-Middle into "Middle") and re-test. **Option 2:** fall back to **multinomial logistic** — it makes no proportional-odds assumption. You lose parsimony but gain validity. **Option 3 (advanced):** use a partial-proportional-odds model (PLUM in SPSS allows partial relaxation; in R the `vglm` function in package VGAM). For thesis work, Option 1 or 2 is usually sufficient.' },
      ],
    },

    /* ════════════════════ 7. ORDINAL — SPSS ════════════════════ */
    {
      id: 'ordinal-spss',
      title: 'Running ordinal logistic in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'The 6-step click path' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → Regression → Ordinal.' },
          { title: 'Move your ordered outcome to Dependent',
            body: 'E.g. **poverty_band** (1 = Low, 2 = Lower-Middle, 3 = Upper-Middle, 4 = High). Confirm Measure in Variable View is set to Ordinal.' },
          { title: 'Move categorical predictors to Factor(s)',
            body: 'E.g. **gender, urban_rural**. SPSS dummy-codes these.' },
          { title: 'Move continuous predictors to Covariate(s)',
            body: 'E.g. **age, years_education, household_size**.' },
          { title: 'Click Output — tick the essentials',
            body: 'Tick **Goodness of fit**, **Summary statistics** (Pseudo R-Square), **Parameter estimates**, and CRITICALLY **Test of parallel lines**. Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces Model Fitting Information, Goodness-of-Fit, Pseudo R-Square, Parameter Estimates (with thresholds and predictor coefficients), and Test of Parallel Lines (the assumption check).' },
        ]},

        { type: 'illustration', component: 'OrdinalDialog',
          caption: 'Figure 5. The Ordinal Regression dialog. Dependent = poverty_band (must be ordinal in Variable View). Factor(s) = categorical predictors. Covariate(s) = continuous predictors. CRITICAL: in the Output dialog, tick "Test of parallel lines" — this is the proportional-odds assumption check.' },
      ],
    },

    /* ════════════════════ 8. ORDINAL — OUTPUT ════════════════════ */
    {
      id: 'ordinal-output',
      title: 'Reading ordinal output',
      blocks: [
        { type: 'heading', level: 2, text: 'Thresholds, coefficients, and the assumption check' },

        { type: 'illustration', component: 'OrdinalOutput',
          caption: 'Figure 6. The ordinal Parameter Estimates table. The TOP section ("Threshold") lists the k − 1 cut-points — for 4 categories, 3 thresholds. The BOTTOM section ("Location") lists one coefficient per predictor (B, SE, Wald, df, Sig.) — these are the substantive results. Below the table sits the Test of Parallel Lines — Sig. > .05 means the proportional-odds assumption is met and the single coefficients are valid.' },

        { type: 'heading', level: 3, text: 'Parameter Estimates — Threshold rows' },

        { type: 'paragraph', text:
          'The top rows of the Parameter Estimates table show the k − 1 thresholds. For 4 categories these are labelled [outcome = 1], [outcome = 2], [outcome = 3]. They mark where on the latent variable one category ends and the next begins. You rarely interpret these substantively — they\'re structural; what matters is the predictor coefficients below.' },

        { type: 'heading', level: 3, text: 'Parameter Estimates — Location rows (the predictors)' },

        { type: 'paragraph', text:
          'The Location rows are the substantive coefficients — ONE per predictor (one per continuous predictor; k − 1 per categorical factor with k levels). For each: B (log-odds), Std. Error, Wald, df, Sig., 95% CI for B. **NOTE: SPSS does NOT print Exp(B) automatically for ordinal regression.** You compute it yourself: Exp(B) = e^B. SPSS Custom Tables or syntax can also produce it.' },

        { type: 'heading', level: 3, text: 'Interpreting an ordinal coefficient' },

        { type: 'paragraph', text:
          'The sign of B tells you direction: a NEGATIVE B means more of the predictor pushes respondents toward LOWER outcome categories. (This is SPSS\'s convention — confusing because it\'s opposite to what people intuit. Some software uses the opposite convention.) A POSITIVE B means more of the predictor pushes toward HIGHER categories.' },

        { type: 'paragraph', text:
          'Exp(B) is the proportional odds ratio: the multiplicative change in the odds of being in a HIGHER outcome category versus a LOWER one, per unit of the predictor. Exp(B) = 1 means no effect; Exp(B) > 1 means higher categories more likely; Exp(B) < 1 means lower categories more likely.' },

        { type: 'heading', level: 3, text: 'Test of Parallel Lines — the assumption check' },

        { type: 'comparison',
          headers: ['Test of Parallel Lines Sig.', 'What it means', 'What to do'],
          rows: [
            ['**p > .05 (non-significant)**',  'Proportional-odds assumption MET — the predictor effects are roughly equal across thresholds.', 'Report ordinal coefficients with confidence.'],
            ['**p < .05 (significant)**',       'Assumption VIOLATED — predictor effects DIFFER across thresholds. The single coefficients are misleading.', 'Collapse outcome categories OR fall back to **multinomial logistic** (Section 4 of this lesson) OR use a partial-proportional-odds model.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Pseudo R-Square benchmarks',
          body: 'Both Multinomial and Ordinal output Pseudo R² values (Cox & Snell, Nagelkerke, McFadden). For behavioural-science models, **Nagelkerke R² values around .10–.30 are typical**, with .30+ considered substantial. Treat as rough analogs of regression R²; they are not directly comparable across different model types. Report Nagelkerke as your primary pseudo R².' },

        { type: 'reveal',
          prompt: 'Your ordinal Test of Parallel Lines shows Chi-Square = 18.3, df = 8, Sig. = .019. What does this mean and what should you do?',
          answer: '**The proportional-odds assumption is VIOLATED.** With p = .019 < .05, the test rejects the null that predictor effects are equal across thresholds — at least one predictor has a different effect at different cut-points. Reporting the ordinal coefficients as-is would be misleading. Your options: (1) try collapsing adjacent outcome categories (e.g. merge Lower-Middle and Upper-Middle into one "Middle" band) and re-test; (2) switch to **multinomial logistic regression**, which makes no proportional-odds assumption — you trade parsimony for validity; (3) for advanced users, fit a partial-proportional-odds model (PLUM in SPSS, or VGAM in R). For most theses, option 2 is the cleanest defensible choice — fall back to multinomial and report the assumption-test result honestly.' },
      ],
    },

    /* ════════════════════ 9. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — predicting transport mode (multinomial)',
      blocks: [
        { type: 'workedExample', title: 'A Master\'s study at Strathmore University',
          body: [
            { label: 'The research question',
              text: 'What demographic and economic factors predict commuters\' main mode of transport in Nairobi?' },
            { label: 'The data',
              text: 'n = 480 commuters. Outcome: **transport_mode** (1 = matatu, 2 = boda, 3 = car, 4 = walking). Predictors: gender, age, monthly income (KES, log-transformed), distance to CBD (km), driving licence held (Y/N).' },
            { label: 'Step 1 — Pick multinomial because the outcome categories have no natural order',
              text: 'Matatu, boda, car, and walking are unordered alternatives. Multinomial logistic regression is the appropriate test.' },
            { label: 'Step 2 — Run multinomial in SPSS',
              text: 'Analyze → Regression → Multinomial Logistic. Dependent = transport_mode. Reference Category → "First Category" (matatu is coded 1 and dominates the sample). Factor(s) = gender, licence_held. Covariate(s) = age, log_income, distance_cbd. Statistics tick Pseudo R-Square, Goodness-of-fit, Likelihood ratio tests, Parameter estimates. OK.' },
            { label: 'Step 3 — Check overall fit',
              text: 'Model Fitting Information: Final Chi-Square = 142.6, df = 15, Sig. < .001 → model significantly improves over intercept-only. Nagelkerke Pseudo R² = .31 → substantial. Goodness-of-Fit Pearson p = .43, Deviance p = .51 → good fit.' },
            { label: 'Step 4 — Read Parameter Estimates (3 blocks; matatu = reference)',
              text: 'Boda vs matatu: AGE B = −0.06, Exp(B) = 0.94 [0.91, 0.97], p < .001 — older commuters less likely to choose boda. INCOME B = 0.21, Exp(B) = 1.23 [0.93, 1.63], p = .15 — n.s. LICENCE B = 0.85, Exp(B) = 2.34 [1.41, 3.88], p = .001 — having a licence more than doubles the odds of choosing boda over matatu. — Car vs matatu: INCOME B = 1.18, Exp(B) = 3.25 [1.73, 6.12], p < .001 — strong income effect. LICENCE B = 2.41, Exp(B) = 11.18 [5.62, 22.24], p < .001 — driving licence is the dominant predictor of car use, as expected. DISTANCE B = 0.04, Exp(B) = 1.04 [1.01, 1.07], p = .009 — longer commutes favour car. — Walking vs matatu: DISTANCE B = −0.18, Exp(B) = 0.84 [0.78, 0.90], p < .001 — every extra km of commute halves the walking odds within ~4 km.' },
            { label: 'Step 5 — APA write-up',
              text: '*"A multinomial logistic regression was conducted to examine predictors of commuters\' main transport mode (matatu, boda-boda, personal car, walking) in Nairobi (n = 480). Matatu was set as the reference category. The model significantly improved fit over the intercept-only baseline, χ²(15) = 142.6, p < .001, Nagelkerke R² = .31. Holding all other predictors constant: (a) Boda vs matatu — each additional year of age decreased the odds of choosing boda over matatu by 6% (OR = 0.94, 95% CI [0.91, 0.97], p < .001), and holding a driving licence more than doubled the odds (OR = 2.34, 95% CI [1.41, 3.88], p = .001). (b) Car vs matatu — log-income strongly increased the odds (OR = 3.25, 95% CI [1.73, 6.12], p < .001), driving licence overwhelmingly increased the odds (OR = 11.18, 95% CI [5.62, 22.24], p < .001), and longer commutes modestly increased the odds (OR = 1.04 per km, p = .009). (c) Walking vs matatu — each additional kilometre of commute decreased the odds of walking by 16% (OR = 0.84, 95% CI [0.78, 0.90], p < .001). The findings indicate that income and licence ownership predict car use, age predicts boda preference, and distance constrains walking — patterns consistent with the broader urban-transport literature in Sub-Saharan African cities."*' },
          ]},
      ],
    },

    /* ════════════════════ 10. MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five common mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Treating an ordered outcome as unordered (using multinomial when ordinal applies)',
          body: 'Your outcome is poverty band (Low / Lower-Middle / Upper-Middle / High) — clearly ordered — but you ran multinomial. You now have 3 sets of coefficients per predictor instead of 1, your model has many more parameters, and you have thrown away the order information.',
          fix: 'When the outcome is ordered, TRY ORDINAL FIRST. Check the parallel-lines assumption. If it holds, ordinal gives a much cleaner, more parsimonious model. Only fall back to multinomial if the assumption fails.' },

        { type: 'mistake',
          title: 'Mistake 2 — Forgetting to set a sensible reference category',
          body: 'You ran multinomial with default reference (highest code). Your outcome is coded 1 = matatu (65% of sample), 4 = walking (5% of sample). Default makes walking the reference, so every coefficient now answers "what predicts choosing X over walking" — odd and hard to interpret.',
          fix: 'Always click Reference Category → set to the most substantively meaningful baseline, usually the most common category in your sample. For our example: matatu (code 1) → "First Category". Your output now reads naturally: "what predicts choosing alternative X over the dominant matatu?".' },

        { type: 'mistake',
          title: 'Mistake 3 — Skipping the Test of Parallel Lines for ordinal',
          body: 'You ran ordinal logistic and reported the coefficients. You never ticked "Test of parallel lines" in the Output dialog. You don\'t know if the proportional-odds assumption was met. Reviewers will ask, and the answer might be that your model is invalid.',
          fix: 'Always tick Output → Test of parallel lines for ordinal regression. Report the result. If Sig. > .05, the assumption is met and you can use the ordinal coefficients. If Sig. < .05, collapse categories or fall back to multinomial — and report what you did and why.' },

        { type: 'mistake',
          title: 'Mistake 4 — Reporting B instead of Exp(B) as the effect size',
          body: 'You report "the coefficient for income was B = 1.18" and stop. Your reader has no idea what that means substantively. B is a log-odds coefficient — uninterpretable without exponentiating.',
          fix: 'Always report **Exp(B)** as the odds ratio, with its 95% CI. For multinomial, SPSS prints Exp(B) automatically. For ordinal, SPSS does NOT — compute it yourself (Exp(B) = e^B). Interpret in plain English: "each 1-unit increase in income multiplies the odds by X" or "increases the odds by (X − 1) × 100%".' },

        { type: 'mistake',
          title: 'Mistake 5 — Ignoring the 95% CI for Exp(B)',
          body: 'You report Exp(B) values without their confidence intervals. A reader cannot tell whether an OR of 1.05 is meaningful (CI = [1.02, 1.08]) or essentially zero (CI = [0.85, 1.30]).',
          fix: 'Always report **95% CI for Exp(B)** alongside the point estimate. If 1.0 is OUTSIDE the CI, the effect is statistically significant; if 1.0 is inside, the effect is not significant regardless of how extreme the point estimate looks.' },
      ],
    },

    /* ════════════════════ 11. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Multinomial logistic regression handles a k-category UNORDERED outcome by running k − 1 simultaneous binary comparisons against a reference category.',
          'Ordinal logistic regression handles a k-category ORDERED outcome with ONE coefficient per predictor PLUS k − 1 thresholds — much more parsimonious when applicable.',
          'Pick multinomial if categories have no natural order (transport mode, religion). Pick ordinal if there is meaningful order (poverty band, Likert agreement).',
          'For multinomial: Analyze → Regression → Multinomial Logistic. Always set a sensible reference category. Report Nagelkerke R², k − 1 coefficient blocks with B, Sig., Exp(B), and 95% CI.',
          'For ordinal: Analyze → Regression → Ordinal. ALWAYS tick Output → Test of parallel lines. Report Nagelkerke R², coefficients with Sig., and Exp(B) (compute yourself since SPSS doesn\'t print it).',
          'For ordinal: the **proportional-odds (parallel lines) assumption** is critical. Sig. > .05 = met; Sig. < .05 = collapse categories or switch to multinomial.',
          'Exp(B) is the odds ratio — the key effect-size measure. Report with 95% CI. > 1 = predictor increases odds; < 1 = decreases; CI excluding 1 = significant.',
          'In ordinal: the SIGN of B follows SPSS convention — negative B means more of the predictor pushes toward LOWER outcome categories.',
          'Pseudo R² (Nagelkerke) values around .10–.30 are typical for behavioural science.',
          'Five mistakes to avoid: treating ordered as unordered, forgetting reference category, skipping parallel-lines test, reporting raw B instead of Exp(B), omitting 95% CI.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Course complete — Advanced Regression',
          body: 'You\'ve now finished the Advanced Regression course — hierarchical regression for theory-driven block-by-block modelling of continuous outcomes, and multinomial/ordinal logistic for categorical outcomes with 3+ levels. Combined with the four base regression lessons (simple, multiple, diagnostics, binary logistic), you now have the regression toolkit for nearly any postgraduate research design.' },

        { type: 'paragraph', text:
          'Before moving on, find a dataset with a 3+-category outcome. If the categories are ordered, run ordinal — check the parallel-lines test — interpret the Exp(B)s. If unordered, run multinomial with a sensible reference — interpret the k − 1 coefficient blocks. Write up the result in APA. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 12. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'Your outcome is "main mode of commuting" with four categories: matatu, boda, car, walking. Which regression?',
          choices: [
            'Binary logistic regression',
            'Ordinal logistic regression',
            'Multinomial logistic regression — 3+ UNORDERED outcome categories',
            'Multiple linear regression',
          ],
          answer: 2,
          explanation: 'Four categories with no natural order = multinomial logistic. Binary logistic handles only 2 categories. Ordinal logistic requires meaningful order in the categories. Multiple linear regression requires a continuous outcome. Multinomial runs k − 1 simultaneous binary comparisons against a reference category of your choice.' },

        { type: 'check',
          question: 'Your outcome is "agreement with new policy" on a 5-point Likert (Strongly Disagree → Strongly Agree). Which regression?',
          choices: [
            'Multinomial logistic — five categories means use multinomial',
            'Ordinal logistic regression — categories have a meaningful natural order (low → high agreement)',
            'Binary logistic',
            'Multiple linear regression',
          ],
          answer: 1,
          explanation: 'The five categories are clearly ordered from Strongly Disagree (lowest agreement) to Strongly Agree (highest). Ordinal logistic exploits that order — ONE coefficient per predictor rather than four (which multinomial would produce). Always try ordinal first when the outcome is ordered, then verify the parallel-lines assumption.' },

        { type: 'check',
          question: 'You ran ordinal logistic. Your Test of Parallel Lines: Chi-Square = 18.3, df = 8, Sig. = .019. What does this mean?',
          choices: [
            'The model fits well',
            'The proportional-odds assumption is VIOLATED — predictor effects differ across thresholds, and the single ordinal coefficients are misleading',
            'You need more data',
            'The reference category is wrong',
          ],
          answer: 1,
          explanation: 'p = .019 < .05 rejects the null that predictor effects are equal across thresholds. The proportional-odds (parallel-lines) assumption fails. Reporting the ordinal coefficients as-is would be misleading. Options: (1) collapse adjacent outcome categories, (2) fall back to multinomial logistic, (3) advanced: fit a partial-proportional-odds model. For thesis work, options 1 or 2 are the standard defensible choices.' },

        { type: 'check',
          question: 'In a multinomial regression with matatu as reference, the Boda vs Matatu block shows: AGE Exp(B) = 0.94, 95% CI [0.91, 0.97]. What does this mean?',
          choices: [
            'Age has no effect',
            'Each additional year of age MULTIPLIES the odds of choosing boda over matatu by 0.94 — i.e. REDUCES the odds by 6% per year. The CI [0.91, 0.97] excludes 1.0, so the effect is statistically significant',
            'Boda riders are 94% younger',
            'Matatu is preferred by people under 0.94 years old',
          ],
          answer: 1,
          explanation: 'Exp(B) is the odds ratio. 0.94 means odds are multiplied by 0.94 per year — equivalent to a 6% reduction per year. CI [0.91, 0.97] excludes 1.0 → significant. Practically, a 30-year-old has odds (0.94)^10 ≈ 0.54 — about HALF — the odds of a 20-year-old of choosing boda. Younger commuters prefer boda; older commuters prefer matatu (among those two).' },

        { type: 'check',
          question: 'You ran ordinal logistic but the output does not show Exp(B). Where do you get it?',
          choices: [
            'It is impossible to compute',
            'SPSS prints it only for multinomial and binary logistic. For ordinal you compute it yourself: Exp(B) = e^B. Most calculators have an e^x button',
            'You must run a different test',
            'Ignore Exp(B) for ordinal regression',
          ],
          answer: 1,
          explanation: 'A quirk of SPSS: Ordinal Regression output does NOT print Exp(B), even though it\'s the most interpretable effect-size measure. Compute it yourself by exponentiating the B column. Exp(0.5) ≈ 1.65; Exp(−0.4) ≈ 0.67. Interpret as proportional odds ratios — the multiplicative change in the odds of being in a higher outcome category per unit of the predictor.' },

        { type: 'check',
          question: 'You ran multinomial with the default reference. Your outcome is coded 1 = matatu (65% of sample), 2 = boda (20%), 3 = car (10%), 4 = walking (5%). Why is the default a poor choice?',
          choices: [
            'It is fine',
            'The default makes the HIGHEST-coded category (walking, 5% of sample) the reference. Every coefficient now answers "what predicts choosing X over walking?" — unnatural and hard to interpret. Better to set reference = matatu (the dominant category)',
            'Default uses the median category',
            'You must always use the lowest code as reference',
          ],
          answer: 1,
          explanation: 'SPSS\'s multinomial default reference is the HIGHEST coded value (here, walking — the rarest category). Coefficients are then comparisons against a tiny baseline, which is statistically noisier AND less substantively interpretable. ALWAYS click Reference Category and set it to the most meaningful baseline — usually the most common category in your sample (matatu = First Category in this example).' },
      ],
    },
  ],
};
