/**
 * Regression Analysis · Lesson 2 — Multiple Regression
 * Multiple predictors entered together. The workhorse of social science.
 */

export const MULTIPLE_REGRESSION_LESSON = {
  id: 'reg-2',
  title: 'Multiple regression',
  subtitle: 'Module 03 · Course: Regression Analysis · Lesson 2 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When one predictor is not enough',
      blocks: [
        { type: 'scene', body: [
          'Lesson 1 taught you simple regression: study hours predict 18% of variance in exam scores. You proudly show your supervisor. She nods, then says: *"OK, but what about motivation? And attendance? And whether the pupil has access to a quiet study space at home? Those things probably matter too. Can you fit a model that includes all of them at once?"*',
          'You can. The tool is **multiple regression** — the extension of simple regression to TWO OR MORE predictors entered together. Instead of *"study hours predict exam scores"*, you can model *"study hours AND motivation AND attendance AND study space TOGETHER predict exam scores, accounting for each other"*. The result is a much richer, more realistic model — and the workhorse of social science research.',
          'This lesson teaches you to fit multiple regression in SPSS, read the output (which adds a new wrinkle — comparing predictors), interpret standardised vs unstandardised coefficients in a multi-predictor world, and handle the trap of MULTICOLLINEARITY (predictors that overlap with each other and confuse the model).',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Extend simple regression to multiple predictors** — the model is exactly the same idea, just with more X variables.',
            '**Run multiple regression in SPSS** via Analyze → Regression → Linear, moving multiple variables into the Independents box.',
            '**Read the output table** — Adjusted R² becomes essential, individual coefficients tell you each predictor\'s UNIQUE contribution.',
            '**Compare predictors using β** (standardised coefficients) — the only way to fairly compare predictors measured in different units.',
            '**Detect MULTICOLLINEARITY** using VIF and Tolerance — the warning signs that your predictors overlap too much.',
            '**Distinguish "Enter" from "Stepwise" methods** and know when each is appropriate.',
            '**Write up multiple regression** following the APA template with all the numbers examiners expect.',
            '**Avoid the five mistakes** that derail multiple regression models in theses.',
          ]},

        { type: 'why', body:
          'Most postgraduate research in education, psychology, business, and health uses multiple regression for the main hypothesis tests — there is rarely a single predictor that explains an outcome on its own. Examiners expect you to handle multiple predictors confidently, including the unglamorous diagnostics (Adjusted R², VIF) that separate a thorough analysis from a beginner attempt.' },
      ],
    },

    /* ════════════════════ 2. THE BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — partition variance among multiple predictors',
      blocks: [
        { type: 'heading', level: 2, text: 'From one slope to many' },

        { type: 'paragraph', text:
          'In simple regression, you had ONE equation: Y = a + bX. In multiple regression, you have ONE equation with MORE coefficients: Y = a + b₁X₁ + b₂X₂ + b₃X₃ + ... . The intercept a still represents Y when all predictors are zero. Each b coefficient represents the slope for ONE predictor while HOLDING THE OTHERS CONSTANT.' },

        { type: 'definition', term: 'Multiple linear regression',
          body: 'A statistical method for modelling the linear relationship between TWO OR MORE predictor variables (X₁, X₂, ...) and ONE continuous outcome variable Y. The result is one equation with one slope per predictor, plus an intercept. Each slope tells you how Y changes for a 1-unit change in that predictor, holding all the other predictors constant.' },

        { type: 'paragraph', text:
          'The phrase "holding the other predictors constant" is the heart of multiple regression. It means: if you imagine TWO pupils who have IDENTICAL motivation, IDENTICAL attendance, IDENTICAL study space — but DIFFERENT study hours — then the model predicts the more-studying pupil scores B₁ marks higher per extra hour. This is sometimes called the predictor\'s "unique contribution" or "partial effect".' },

        { type: 'analogy', title: 'Cooking the same dish with different ingredient changes',
          body: 'Imagine you bake bread with 4 ingredients: flour, water, yeast, salt. The final loaf depends on ALL of them. A simple regression of "loaf quality on flour" tells you how flour affects quality on its own. A multiple regression including all four ingredients tells you: if you keep water, yeast, and salt CONSTANT, how much does extra flour change the loaf? Each ingredient\'s "unique" effect — its contribution beyond the others — is what multiple regression isolates.' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When multiple regression is appropriate',
      blocks: [
        { type: 'heading', level: 2, text: 'Same assumptions as simple regression, plus one new one' },

        { type: 'paragraph', text:
          'Multiple regression carries all four assumptions from simple regression (continuous outcome, linearity, normality of residuals, homoscedasticity), with one additional assumption introduced because you now have more than one predictor.' },

        { type: 'steps', steps: [
          { title: 'Assumption 5 — NO MULTICOLLINEARITY',
            body: [
              'Predictors should not be too highly correlated with EACH OTHER. If two predictors are nearly identical (e.g. "total income" and "total income in USD"), the model cannot tell which one is doing the work — the coefficients become unstable and unreliable.',
              'Mild correlation between predictors is fine. Strong correlation (r > .8) between two predictors is a red flag. We diagnose this with the **VIF (Variance Inflation Factor)** statistic — covered in detail in Lesson 3.',
              'For now: just plot correlations BETWEEN your predictors before fitting multiple regression. If two are very highly correlated, consider dropping one.',
            ]},
        ]},

        { type: 'heading', level: 2, text: 'Sample size rule of thumb' },

        { type: 'paragraph', text:
          'Multiple regression needs more cases than simple regression because each predictor adds a parameter to estimate. The widely-cited rule of thumb is **at least 10-15 cases per predictor**, and ideally 20+. So a model with 5 predictors needs n ≥ 50, and ideally n ≥ 100.' },

        { type: 'comparison',
          headers: ['Number of predictors', 'Minimum n (rule of thumb)', 'Recommended n'],
          rows: [
            ['2',  '20',  '40+'],
            ['4',  '40',  '80+'],
            ['6',  '60',  '120+'],
            ['8',  '80',  '160+'],
            ['10', '100', '200+'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Why sample size matters',
          body: 'With too few cases per predictor, the model "overfits" — it learns idiosyncratic patterns from your specific sample that do not generalise. Coefficients become unstable. The model might look great in your data but fail miserably in a replication. Stick to the 10-15 cases per predictor rule (more is better) to avoid this trap.' },
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running multiple regression in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'Same dialog as simple regression, just more variables' },

        { type: 'steps', steps: [
          { title: 'Check correlations between predictors first',
            body: 'Run a Pearson correlation matrix (Analyze → Correlate → Bivariate) including ALL your predictors. If any pair correlates r > .8, you have a potential multicollinearity problem — consider dropping one or combining them.' },
          { title: 'Open Linear Regression',
            body: 'Analyze → Regression → Linear. The dialog is identical to simple regression.' },
          { title: 'Move outcome to Dependent',
            body: 'Same as before — your continuous outcome variable.' },
          { title: 'Move ALL predictors to Independent(s)',
            body: 'Select multiple variables (hold Ctrl while clicking) and move them across with the blue arrow. There is no upper limit — but remember the sample size rule.' },
          { title: 'Set Method to "Enter"',
            body: 'For most thesis work, "Enter" is the right choice — it puts all predictors into the model simultaneously. We will discuss Stepwise (an automated alternative — often discouraged) in Section 7.' },
          { title: 'Click Statistics for the essentials',
            body: 'Tick **Estimates**, **Confidence intervals (95%)**, **Model fit**, **Descriptives**, and CRUCIALLY **Collinearity diagnostics** (this gives you VIF). Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces the same three core tables (Model Summary, ANOVA, Coefficients) — plus collinearity diagnostics in the Coefficients table.' },
        ]},
      ],
    },

    /* ════════════════════ 5. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading multiple regression output',
      blocks: [
        { type: 'heading', level: 2, text: 'Adjusted R² becomes important' },

        { type: 'paragraph', text:
          'Most of the multiple regression output looks identical to simple regression. The new things to focus on:' },

        { type: 'illustration', component: 'MachakosRegMultiOutput',
          caption: 'Figure 1. Multiple regression output for Machakos with all 4 IVs entered together. R² jumps from .228 (Digital_Devices alone) to .381 (all 4 together). Teacher_Competency emerges as strongest UNIQUE predictor (β = .27, p = .001). Internet_Connectivity is no longer significant (β = .09, p = .184) — its bivariate effect was absorbed by other IVs. All VIF < 5 → no multicollinearity concern.' },

        { type: 'heading', level: 3, text: 'Model Summary — pay attention to Adjusted R²' },

        { type: 'paragraph', text:
          'Adjusted R² is critical for multiple regression. Plain R² always goes UP when you add predictors, even if those predictors are useless. Adjusted R² penalises you for adding predictors that do not contribute meaningfully — it can actually go DOWN when you add weak predictors. So Adjusted R² is the honest version of "how much variance does the model explain?"' },

        { type: 'callout', tone: 'gold', title: 'Always report Adjusted R² in multiple regression',
          body: 'For simple regression with one predictor, R² and Adjusted R² are nearly identical. For multiple regression they can diverge meaningfully. In your thesis, report Adjusted R² as the headline measure of model fit. The gap between R² and Adjusted R² tells you whether you have weak predictors inflating R².' },

        { type: 'heading', level: 3, text: 'Coefficients table — each predictor\'s unique contribution' },

        { type: 'paragraph', text:
          'For each predictor, the Coefficients table shows: B (slope in original units, holding others constant), Std. Error of B, β (standardised slope), t, p-value, 95% CI for B, and (because you ticked Collinearity diagnostics) Tolerance and VIF.' },

        { type: 'comparison',
          headers: ['Statistic', 'What it shows', 'Threshold to worry'],
          rows: [
            ['**B**',          'Slope in original units, holding other predictors constant.',                    'No threshold — depends on the variable.'],
            ['**β (Beta)**',   'Standardised slope. Compare across predictors on equal footing.',                'Magnitude tells you which predictors matter most.'],
            ['**Sig.**',       'p-value for whether B is significantly different from zero.',                    'p < .05 = significant predictor.'],
            ['**95% CI for B**', 'Range we are 95% confident the true B lies within.',                            'If CI includes 0, the predictor is non-significant.'],
            ['**Tolerance**',   'How much variance in THIS predictor is NOT shared with the other predictors.',  'Tolerance < .10 = serious multicollinearity warning.'],
            ['**VIF**',         '1 / Tolerance. How much the standard error is INFLATED by collinearity.',       'VIF > 5 = consider investigating. VIF > 10 = serious problem.'],
          ]},

        { type: 'heading', level: 3, text: 'Comparing predictors with β' },

        { type: 'paragraph', text:
          'In multiple regression, the standardised β is your best tool for comparing predictors. Because β is in standard deviation units, you can directly say "predictor X has a stronger effect than predictor Y" by comparing their |β| values. With unstandardised B coefficients, you cannot — B for income (per KSh) cannot be compared to B for age (per year).' },

        { type: 'reveal',
          prompt: 'In the Coefficients output: study_hrs B = 0.85, β = .21, p = .014. motivation B = 2.10, β = .32, p < .001. attendance B = 0.18, β = .16, p = .043. Which predictor has the strongest effect?',
          answer: '**Motivation** is the strongest predictor (largest |β| = .32). Even though motivation\'s B (2.10) is bigger than study hours\' B (0.85), you cannot compare them directly because they are in different units (motivation per scale point vs study hours per hour). But β is standardised, so direct comparison is valid. Standard write-up: *"Motivation was the strongest predictor (β = .32, p < .001), followed by study hours (β = .21, p = .014) and attendance (β = .16, p = .043). All three were significant contributors to exam scores in the model."*' },
      ],
    },

    /* ════════════════════ 6. MULTICOLLINEARITY ════════════════════ */
    {
      id: 'multicollinearity',
      title: 'Multicollinearity — when predictors overlap too much',
      blocks: [
        { type: 'heading', level: 2, text: 'The trap you need to watch for' },

        { type: 'paragraph', text:
          'Multicollinearity happens when two or more of your predictors are strongly correlated with each other — they carry overlapping information. The model cannot tell which one is "really" doing the work, so the coefficients become unstable. Tiny changes in your data can flip a B coefficient\'s sign or significance.' },

        { type: 'illustration', component: 'MachakosRegBetaComparison',
          caption: 'Figure 2. Standardized β comparison for all 4 Machakos IVs. Teacher_Competency wins (β = .27). Internet_Connectivity fails to reach significance (grey bar). The right-side table shows how each IV\'s effect SHRANK from its bivariate correlation to its multiple β — the shrinkage tells you how much of each IV\'s apparent effect was actually shared with the others.' },

        { type: 'heading', level: 3, text: 'How to detect multicollinearity' },

        { type: 'list', items: [
          '**Correlation matrix check** — if two predictors correlate r > .8, that\'s a red flag. Pearson matrix before running regression.',
          '**VIF (Variance Inflation Factor)** — appears in the Coefficients table when you tick Collinearity diagnostics. VIF > 5 is concerning; VIF > 10 is serious.',
          '**Tolerance** — the inverse of VIF. Tolerance < .20 corresponds to VIF > 5. Tolerance < .10 corresponds to VIF > 10.',
          '**Suspicious coefficients** — sometimes a predictor that has a strong simple correlation with Y becomes non-significant in the multiple regression, or even flips sign. This is often a multicollinearity symptom.',
        ]},

        { type: 'heading', level: 3, text: 'What to do when you find it' },

        { type: 'comparison',
          headers: ['Solution', 'When to use it'],
          rows: [
            ['**Drop one of the collinear predictors**', 'When two predictors essentially measure the same thing (e.g. "annual income" and "monthly income × 12"). Keep the one with the stronger theoretical importance.'],
            ['**Combine the collinear predictors**',     'When two predictors theoretically measure aspects of the same construct (e.g. height and weight → compute BMI). Use the combined variable.'],
            ['**Centre the predictors**',                'For interaction terms specifically — subtract the mean from each predictor before computing the interaction. Often eliminates artificial collinearity.'],
            ['**Larger sample**',                         'Sometimes multicollinearity is a sample-size problem — more cases stabilise the estimates.'],
            ['**Accept it and report it**',               'If the predictors genuinely measure different things but happen to correlate in your sample, report the VIF, acknowledge the limitation, and interpret cautiously.'],
          ]},

        { type: 'mistake',
          title: 'Ignoring high VIF and reporting the coefficients anyway',
          body: 'Your VIF for predictor X₁ is 14 and the coefficient flipped sign from your simple regression. You report it without noting the multicollinearity problem.',
          fix: 'High VIF is a warning that the coefficient is unreliable. Either fix the multicollinearity (drop, combine, centre) or report the VIF in your write-up and interpret the suspect coefficient cautiously. Examiners check the collinearity statistics — pretending the problem does not exist gets caught.' },
      ],
    },

    /* ════════════════════ 7. ENTRY METHODS ════════════════════ */
    {
      id: 'entry-methods',
      title: 'Enter vs Stepwise — choosing your method',
      blocks: [
        { type: 'heading', level: 2, text: 'Why "Enter" is almost always right for thesis work' },

        { type: 'paragraph', text:
          'The Method dropdown in the Linear Regression dialog offers several choices: **Enter** (the default), **Stepwise**, **Forward**, **Backward**, and **Remove**. For thesis work, almost always choose **Enter**. Here is why.' },

        { type: 'comparison',
          headers: ['Method', 'What it does', 'When to use'],
          rows: [
            ['**Enter** (recommended)', 'Puts all predictors in the model simultaneously. You decide which predictors based on theory.', 'Almost always — when you have a-priori hypotheses about which predictors to include.'],
            ['**Stepwise**',             'SPSS automatically adds predictors one at a time based on statistical significance, and removes ones that lose significance after each addition.', 'Discouraged in modern research. Atheoretical; produces unstable models; inflates false positives.'],
            ['**Forward**',              'Adds predictors one at a time. Each one stays once added.',                                          'Rare. Same problems as Stepwise.'],
            ['**Backward**',             'Starts with all predictors, removes the weakest one at a time.',                                     'Rare. Same problems as Stepwise.'],
            ['**Hierarchical** (Blocks)',  'YOU decide the order of predictor blocks — first demographics, then behavioural, etc. Each block\'s ΔR² shows new variance added.', 'When testing theory-driven hypotheses about the importance of variable sets.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Avoid Stepwise regression in your thesis',
          body: 'Many older statistics textbooks teach Stepwise as the default. Modern methodologists strongly DISCOURAGE it because: (1) it is atheoretical — SPSS chooses variables, not you; (2) results change wildly if you re-run on slightly different data; (3) it inflates false-positive rates; (4) journals increasingly reject Stepwise findings. If your supervisor specifically requests Stepwise, run it but always also run Enter for comparison. Use Enter as your primary analysis.' },

        { type: 'illustration', component: 'MachakosRegR2Breakdown',
          caption: 'Figure 3. R² = .381 unpacked as a pie chart. 38.1% (gold) is EXPLAINED by the 4 IVs — an excellent result for social-science research. 61.9% (grey) is UNEXPLAINED — everything you didn\'t measure (motivation, home environment, ability, luck). Small donut badges show each IV\'s squared-β contribution to the explained slice.' },

        { type: 'heading', level: 3, text: 'When hierarchical (block-by-block) regression is useful' },

        { type: 'paragraph', text:
          'Hierarchical regression is the principled cousin of Stepwise. Instead of letting SPSS decide, YOU specify the order of predictor blocks based on theory. Each new block shows ΔR² — the additional variance explained beyond the previous blocks.' },

        { type: 'paragraph', text:
          'Classic example: in education research, you often want to know "do psychological factors predict exam scores BEYOND what demographics already explain?" You enter Block 1 = demographics (gender, age, school type), then Block 2 = psychological (motivation, self-efficacy). The ΔR² for Block 2 tells you how much extra variance the psychological factors explain over and above the demographics.' },

        { type: 'steps', steps: [
          { title: 'Open Linear Regression',
            body: 'Analyze → Regression → Linear. Move your outcome to Dependent.' },
          { title: 'Add Block 1 predictors',
            body: 'Move the first set of predictors (e.g. demographics) into Independent(s).' },
          { title: 'Click Next to add Block 2',
            body: 'Above the Independent(s) box you see "Block 1 of 1 ▶ Next". Click Next. The Independent(s) box clears (Block 1 is now stored). Add the next set of predictors.' },
          { title: 'Repeat for additional blocks',
            body: 'Click Next again to add Block 3 if you have one.' },
          { title: 'Tick R squared change under Statistics',
            body: 'This is essential — it gives you ΔR² for each block. Statistics → tick "R squared change" → Continue → OK.' },
          { title: 'Read the Model Summary',
            body: 'You will see ONE row per block. Each row shows the cumulative R² AND the change in R² (ΔR²) from the previous block, with a Sig. F Change p-value. The blocks where ΔR² is significant are the ones that added meaningful explanatory power.' },
        ]},
      ],
    },

    /* ════════════════════ 8. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — predicting exam scores from three variables',
      blocks: [
        { type: 'workedExample', title: 'A PhD study at Kenyatta University',
          body: [
            { label: 'The research question',
              text: 'Do weekly study hours, motivation, and attendance TOGETHER predict end-of-term mathematics scores? Which is the strongest predictor?' },
            { label: 'The data',
              text: 'n = 119 Form 3 pupils. Outcome: **math_score** (0-100). Predictors: **study_hrs** (continuous), **motivation** (10-point scale), **attendance** (% attendance over the term).' },
            { label: 'Step 1 — Pre-check correlations',
              text: 'Run Bivariate Correlations among all four variables. Found: study_hrs × motivation r = .31, motivation × attendance r = .25, study_hrs × attendance r = .19. All moderate at most — no multicollinearity threat.' },
            { label: 'Step 2 — Run multiple regression',
              text: 'Analyze → Regression → Linear → math_score Dependent; study_hrs, motivation, attendance Independent(s) → Method Enter → Statistics: tick Estimates, 95% CI, Model fit, R squared change, Collinearity diagnostics → OK.' },
            { label: 'Step 3 — Read the Model Summary',
              text: 'R = .485, R² = .235, Adjusted R² = .222, Std. Error of Estimate = 9.84. The three predictors together explain 23.5% (Adj R² = 22.2%) of variance in exam scores. The Std. Error of Estimate of about 10 marks tells us typical prediction error.' },
            { label: 'Step 4 — Read the ANOVA',
              text: 'F(3, 115) = 11.78, p < .001. The overall model is highly significant — far better than predicting the mean for everyone.' },
            { label: 'Step 5 — Read the Coefficients',
              text: 'Constant B = 52.40, p < .001. study_hrs B = 0.85, β = .21, p = .014. motivation B = 2.10, β = .32, p < .001. attendance B = 0.18, β = .16, p = .043. ALL THREE are significant. VIF values are 1.12, 1.15, 1.08 — comfortably below 5, no multicollinearity.' },
            { label: 'Step 6 — Compare predictors using β',
              text: 'Motivation is the strongest (β = .32), then study hours (β = .21), then attendance (β = .16). A 1 SD increase in motivation predicts a .32 SD increase in exam scores — the largest unique contribution.' },
            { label: 'Step 7 — APA write-up',
              text: '*"A multiple linear regression was conducted to examine the extent to which weekly study hours, motivation, and class attendance predicted end-of-term mathematics scores among 119 Form 3 pupils. The overall model was statistically significant, F(3, 115) = 11.78, p < .001, with the three predictors together accounting for 23.5% of the variance in exam scores (Adjusted R² = .22). All three predictors were significant: motivation made the strongest unique contribution (B = 2.10, 95% CI [1.02, 3.18], β = .32, p < .001), followed by weekly study hours (B = 0.85, 95% CI [0.18, 1.52], β = .21, p = .014), and class attendance (B = 0.18, 95% CI [0.01, 0.35], β = .16, p = .043). Variance inflation factors were all below 1.20, indicating no multicollinearity concerns. The regression equation was: predicted math score = 52.40 + 0.85 × (study hours) + 2.10 × (motivation) + 0.18 × (attendance)."*' },
          ]},
      ],
    },

    /* ════════════════════ 9. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing multiple regression up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A multiple linear regression was conducted to examine the extent to which [PREDICTOR LIST] predicted [OUTCOME] among [N] [respondents]. The overall model was [significant/non-significant], F([df1], [df2]) = [F-value], p = [p-value], with the [N] predictors together accounting for [XX]% of the variance in [OUTCOME] (Adjusted R² = [.XX]). [Then describe each predictor in order of importance, using β to compare magnitude.] Variance inflation factors were all [below 5/within acceptable bounds], indicating no multicollinearity concerns.' },

        { type: 'callout', tone: 'success', title: 'Seven things to include in every multiple regression write-up',
          body: '**1.** Sample size and predictors. **2.** Overall F-test with df and p. **3.** R² AND Adjusted R². **4.** Each predictor\'s B with 95% CI. **5.** Each predictor\'s β (for comparison). **6.** Each predictor\'s p-value. **7.** VIF or a statement that multicollinearity was checked. Examiners scan for all seven — leave any out and expect a question.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Did you check for multicollinearity?',
              a: 'Yes. Variance inflation factors (VIF) ranged from 1.08 to 1.20 — well below the conventional threshold of 5 (or the stricter 2.5 some methodologists recommend). I also examined the correlation matrix among predictors before fitting the regression; no pair correlated above r = .35. Multicollinearity does not appear to be affecting the coefficients in this model.' },
            { q: 'Why didn\'t you use Stepwise regression?',
              a: 'Modern methodological guidance discourages Stepwise because it is atheoretical, produces unstable models, and inflates false-positive rates. I used the Enter method — including all three predictors simultaneously based on theoretical grounds documented in Chapter 2 — which is the standard recommendation for hypothesis-driven research.' },
            { q: 'Why is your sample size only 119 with 3 predictors?',
              a: 'The widely-used rule of thumb is at least 10-15 cases per predictor, suggesting a minimum of 30-45 cases for three predictors. With n = 119 (about 40 cases per predictor), I am well above the minimum and within the recommended range for stable estimates.' },
          ]},
      ],
    },

    /* ════════════════════ 10. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common multiple regression mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Reporting R² instead of Adjusted R² for the headline',
          body: 'You report "R² = .28" without mentioning Adjusted R² = .19. The difference (9 percentage points) is large, signalling that your model has weak predictors inflating R² artificially.',
          fix: 'Always report Adjusted R² as the headline statistic for multiple regression. If R² and Adjusted R² differ substantially, that gap itself is informative — it tells you some of your predictors are not pulling their weight.' },

        { type: 'mistake',
          title: 'Mistake 2 — Comparing predictors using B (unstandardised) instead of β',
          body: 'You write "Income has the biggest effect (B = 0.001) because its coefficient is non-zero". But B is in original units — income per KSh, age per year — they are not comparable.',
          fix: 'Always use β (standardised coefficients) to COMPARE predictors. β is in standard deviations, putting all predictors on equal footing. B is for the regression equation and interpreting effect in original units; β is for comparing relative importance.' },

        { type: 'mistake',
          title: 'Mistake 3 — Ignoring VIF / Tolerance in the output',
          body: 'You skim the Coefficients table for B and p-values but ignore the rightmost columns (Tolerance, VIF). A predictor with VIF = 14 has wildly unstable coefficients but you do not notice.',
          fix: 'Always check VIF for every predictor. VIF < 5 = comfortable. VIF 5-10 = investigate. VIF > 10 = serious problem requiring action (drop, combine, or report and interpret cautiously). Skipping this step is one of the easiest examiner-bait mistakes.' },

        { type: 'mistake',
          title: 'Mistake 4 — Using Stepwise regression for hypothesis testing',
          body: 'Your supervisor said "include the variables that matter most". You ran Stepwise and reported the resulting model. But Stepwise selected variables based on statistical significance in YOUR specific sample — the model will likely not replicate.',
          fix: 'Use Enter method with theory-driven predictor selection. If you genuinely need to compare predictor sets, use HIERARCHICAL regression with blocks you specified based on theory. Stepwise is rarely the right answer in modern research; many journals reject Stepwise findings outright.' },

        { type: 'mistake',
          title: 'Mistake 5 — Including too many predictors for your sample size',
          body: 'Your sample is n = 80 and you put 12 predictors in the model. Even before reading the output, the model is likely overfit and the coefficients unreliable.',
          fix: 'Follow the 10-15 cases per predictor rule. With n = 80, limit to 5-8 predictors. If you have more candidate predictors than your sample supports, reduce theoretically (drop the least-justified) or empirically (run preliminary correlations and keep the most-related to outcome).' },
      ],
    },

    /* ════════════════════ 11. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Multiple regression extends simple regression to 2+ predictors: Y = a + b₁X₁ + b₂X₂ + ... .',
          'Each B coefficient is the slope for ONE predictor while holding all OTHERS constant — the "unique contribution".',
          'Add one assumption beyond simple regression: NO MULTICOLLINEARITY among predictors.',
          'Sample size rule: at least 10-15 cases per predictor; ideally 20+.',
          'Run via Analyze → Regression → Linear → move outcome to Dependent, multiple predictors to Independent(s) → Method Enter → tick Estimates, 95% CI, Model fit, Collinearity diagnostics.',
          'Adjusted R² is the headline fit statistic for multiple regression — always report it.',
          'Use β (standardised) to compare predictors on equal footing; use B (unstandardised) for the regression equation.',
          'Detect multicollinearity with VIF (>5 concerning, >10 serious) or Tolerance (<.20 concerning, <.10 serious).',
          'Use Enter method by default. Avoid Stepwise. Use Hierarchical (blocks) for theory-driven block comparisons.',
          'Avoid the five mistakes: R² over Adjusted R², B for comparison, ignoring VIF, Stepwise for hypothesis testing, too many predictors for the sample.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 3: Assumptions & diagnostics** we deep-dive into the regression assumptions — how to CHECK them, how to interpret the residual plots SPSS produces, and what to do when assumptions are violated. Then **Lesson 4** closes the course with logistic regression — for when your outcome is binary (yes/no, pass/fail) rather than continuous.' },

        { type: 'paragraph', text:
          'Before moving on, take a multiple-predictor model from your dataset (or build one with 2-3 predictors for a continuous outcome). Run it with all the right options ticked. Identify the strongest predictor using β. Check the VIF values. Write a one-paragraph APA summary. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 12. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'In a multiple regression, the B coefficient for "study hours" is 0.85. What does it mean?',
          choices: [
            'Study hours alone explains 85% of variance',
            'For every extra hour of study, the predicted outcome increases by 0.85 units, HOLDING ALL OTHER PREDICTORS CONSTANT',
            'The correlation between study hours and the outcome is .85',
            'Study hours is the 85th most important predictor',
          ],
          answer: 1,
          explanation: 'In multiple regression, every B is interpreted "holding the other predictors constant". This is the key difference from simple regression — each predictor\'s coefficient now represents its UNIQUE contribution after accounting for what the other predictors explain.' },

        { type: 'check',
          question: 'Why should you ALWAYS check VIF in multiple regression?',
          choices: [
            'Because SPSS requires it',
            'To detect MULTICOLLINEARITY — when predictors overlap too much, coefficients become unstable. VIF > 5 is concerning; VIF > 10 is serious.',
            'It is the same as p-value',
            'It tells you the sample size needed',
          ],
          answer: 1,
          explanation: 'VIF (Variance Inflation Factor) tells you how inflated each predictor\'s standard error is due to overlap with other predictors. VIF = 1 means no collinearity; VIF > 5 means worth investigating; VIF > 10 means coefficients are unreliable and you should drop, combine, or report cautiously. Always tick "Collinearity diagnostics" under Statistics to get VIF.' },

        { type: 'check',
          question: 'When comparing the importance of three predictors in your model (study hours, motivation, attendance), which coefficient should you use?',
          choices: [
            'B (unstandardised) — bigger is better',
            'β (standardised) — because predictors are in different units, you need a common scale (standard deviations)',
            'p-value',
            'R²',
          ],
          answer: 1,
          explanation: 'Predictors in different units (hours, scale points, percentages) cannot be compared via B (which is in original units). β puts them all in standard-deviation units, allowing direct comparison. The predictor with the largest |β| has the strongest unique effect on the outcome.' },

        { type: 'check',
          question: 'Your model has R² = .30 and Adjusted R² = .18. What does the gap tell you?',
          choices: [
            'The model is great',
            'Some of your predictors are weak and adding them inflated R² without adding real explanatory power — Adjusted R² penalises this and is more honest',
            'The sample is too small',
            'There is multicollinearity',
          ],
          answer: 1,
          explanation: 'A large gap between R² (.30) and Adjusted R² (.18) signals that some predictors are not pulling their weight. R² always goes UP when you add predictors, even useless ones; Adjusted R² penalises adding weak predictors and can even go DOWN. The honest model fit statistic is Adjusted R². Consider dropping the weakest predictors and re-running.' },

        { type: 'check',
          question: 'Why is Stepwise regression discouraged in modern research?',
          choices: [
            'It is mathematically wrong',
            'It is atheoretical (SPSS picks variables, not you), produces models that change wildly with small data changes, and inflates false-positive rates',
            'It is too slow to run',
            'It does not give a p-value',
          ],
          answer: 1,
          explanation: 'Stepwise regression lets SPSS automatically add/remove predictors based on significance in YOUR specific sample. This is problematic because: (1) variable selection should be theory-driven, not data-driven; (2) Stepwise produces unstable models that change with small data changes; (3) it inflates Type I error rates; (4) many journals now reject Stepwise findings. Use Enter method for hypothesis testing; use Hierarchical (blocks) for theory-driven block comparisons.' },

        { type: 'check',
          question: 'You have n = 50 cases and want to fit a multiple regression with 8 predictors. Is this advisable?',
          choices: [
            'Yes, more predictors = better model',
            'No — the 10-15 cases per predictor rule means you need at least 80-120 cases for 8 predictors. With n = 50 your model will be overfit and coefficients unreliable.',
            'It does not matter',
            'Yes, but only if all predictors are continuous',
          ],
          answer: 1,
          explanation: 'The rule of thumb is at least 10-15 cases per predictor (ideally 20+). With n = 50 and 8 predictors, you have only ~6 cases per predictor — far too few for stable estimates. Either reduce predictors (drop the least-justified) or collect more data. Overfitting is a real and underrated thesis-breaker.' },
      ],
    },
  ],
};
