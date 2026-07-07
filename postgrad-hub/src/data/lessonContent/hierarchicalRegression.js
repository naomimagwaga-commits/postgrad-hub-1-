/**
 * Advanced Regression · Lesson 1 — Hierarchical & Stepwise Regression
 * Block-by-block model building and the (debated) automated alternative.
 */

export const HIERARCHICAL_REGRESSION_LESSON = {
  id: 'advreg-1',
  title: 'Hierarchical & stepwise regression',
  subtitle: 'Module 03 · Course: Advanced Regression · Lesson 1 of 2',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'Beyond simple "throw all predictors in at once"',
      blocks: [
        { type: 'scene', body: [
          'You are doing a PhD at Kenyatta University on what drives academic performance in Form 4 pupils across 320 students in three Kiambu schools. You have a list of plausible predictors — gender, age, school type, parental education, daily study hours, KCPE entry score, attendance rate, self-efficacy, intrinsic motivation, exam-anxiety score, and use of past papers. Eleven predictors, one outcome (KCSE mock score). You learned simple multiple regression in lesson `reg-2`. You ran Enter mode with all eleven predictors. R² came out at .47. You report it.',
          'Your supervisor reads the draft and frowns. "How much of that .47 is just demographics? How much is the schooling resources? How much is the PSYCHOLOGICAL stuff after controlling for the rest? Your model lumps everything together — I can\'t tell which variable BLOCK is actually doing the work." This is the question hierarchical regression answers. You add predictors in **theory-driven blocks** and watch the **ΔR²** (change in R²) tell you how much NEW variance each block adds beyond the previous blocks.',
          'A separate sub-plot: a colleague mentions she let SPSS pick the predictors automatically with "Stepwise" and got a model that explains the same .47 with only 4 variables. That sounds magical. It is not — Stepwise has serious problems modern methodologists keep warning about. This lesson teaches you BOTH approaches: hierarchical (the principled, theory-driven, supervisor-and-examiner-approved way) and stepwise (so you understand why journals increasingly reject it, and what to do when your supervisor still asks for it).',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Explain** the difference between Enter, Hierarchical, and Stepwise regression in one sentence each.',
            '**Design hierarchical blocks** based on theory — typically demographics first, then behavioural, then psychological.',
            '**Run hierarchical regression** in SPSS via Linear Regression → Next button → multiple blocks.',
            '**Read the Model Summary**, focusing on ΔR² and Sig. F Change for each block.',
            '**Report block-by-block results** in the standard APA hierarchical table format.',
            '**Recognise** the problems with Stepwise / Forward / Backward selection and defend why you used Hierarchical instead.',
            '**Run stepwise** correctly when supervisor insists — and report it with appropriate caveats.',
          ]},

        { type: 'why', body:
          'Hierarchical regression is the go-to method for any thesis question of the form "does X add explanatory power BEYOND Y?". It appears in nearly every social-science PhD that uses regression. Mastering it once unlocks a much richer set of research questions than simple Enter regression can answer.' },
      ],
    },

    /* ════════════════════ 1.5 WHAT/WHY/WHERE/WHEN — beginner-first primer ════════════════════ */
    {
      id: 'wwww',
      title: 'What / Why / Where / When — read THIS first',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'Before you touch any SPSS dialog, understand FOUR things: (1) What hierarchical regression actually IS, (2) Why you would use it instead of ordinary multiple regression, (3) Where a Kenyan postgraduate would use it, (4) When to CHOOSE it over alternatives.',
            'If you can answer all 4 in one sentence each, you\'re ready for the SPSS walkthrough. If not, spend 5 minutes here.',
          ]},

        { type: 'illustration', component: 'MachakosHrWWWW',
          caption: 'Figure 1. The Hierarchical Regression WHAT/WHY/WHERE/WHEN reference card. Bookmark this image — it answers the 4 questions your examiner will ask about why you chose hierarchical over multiple regression.' },

        { type: 'heading', level: 3, text: 'The 30-second summary' },

        { type: 'comparison',
          headers: ['Question', 'One-line answer'],
          rows: [
            ['**WHAT is it?**',   'A regression where you enter predictors in **ordered groups called BLOCKS** instead of all at once.'],
            ['**WHY use it?**',   'To test whether a new set of predictors adds unique value **BEYOND** what earlier blocks already explain.'],
            ['**WHERE is it used?**', 'In education, health, agriculture research where theory says "control for X first, then test whether Y matters."'],
            ['**WHEN to choose it?**', 'When you have a **theoretical ordering** to your predictors (controls first, test IVs second). If all IVs are theoretically equal, use ordinary multiple regression instead.'],
          ]},

        { type: 'callout', tone: 'brand', title: 'Key terms you\'ll meet in the walkthrough',
          body: [
            '**Block** — a group of predictors entered together. Like a chapter of your regression story.',
            '**ΔR² (delta R squared)** — the ADDITIONAL variance explained by the current block, over and above previous blocks. This is the "did adding this block matter?" number.',
            '**Sig. F Change** — the p-value for ΔR². If it\'s < .05, the current block significantly improves the model.',
          ]},
      ],
    },

    /* ════════════════════ 2. BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — predictors enter in theory-driven blocks',
      blocks: [
        { type: 'heading', level: 2, text: 'YOU control the order, not SPSS' },

        { type: 'paragraph', text:
          'In **Enter** regression, all predictors go in simultaneously. You get ONE row in the Model Summary and ONE R². You cannot tell which variables are doing the work; you only see the final coefficients.' },

        { type: 'paragraph', text:
          'In **hierarchical** regression, you specify the predictors in groups called BLOCKS, in an order you justify from theory. SPSS adds Block 1 first and computes R². Then it adds Block 2 and computes R² AGAIN, alongside the CHANGE (**ΔR²**) from Block 1 to Block 2 — i.e. the new variance Block 2 explains over and above Block 1. Then it does the same for Block 3, etc. The Model Summary now has one row PER BLOCK, and each row\'s **Sig. F Change** tells you whether that block added a statistically significant amount of new explanatory power.' },

        { type: 'illustration', component: 'MachakosThreeApproachesComparison',
          caption: 'Figure 1. Simple vs Multiple vs Hierarchical — three regression approaches compared using the same Machakos data. Simple: 1 IV, R² = .228. Multiple: 4 IVs entered together, R² = .381. Hierarchical: 2 baseline IVs in Block 1 (R² = .257), then 2 test IVs in Block 2 (R² = .381, ΔR² = .124). Each approach answers a different research question — pick based on your question, not fashion.' },

        { type: 'definition', term: 'ΔR² (change in R²)',
          body: 'The additional proportion of variance in the outcome explained by a new block of predictors, OVER AND ABOVE the variance already explained by all previous blocks. Computed as R²_current − R²_previous. The associated **F Change** test (with its p-value, Sig. F Change) tests whether ΔR² is significantly different from zero. ΔR² = .15 with Sig. F Change = .002 means "this block adds 15% new variance, and that addition is highly statistically significant."' },

        { type: 'analogy', title: 'Three layers of cake at a graduation',
          body: 'Imagine baking a three-layer cake for a graduation party. Layer 1 = sponge (the foundation everyone has). Layer 2 = cream filling (adds substance). Layer 3 = decorative icing (adds the finishing touch). You measure how much "cake satisfaction" each layer adds. The sponge alone gives a base satisfaction. Adding the cream visibly increases it (ΔR² is big — the filling is doing real work). Adding the icing increases it a bit more, but most of the cake\'s appeal was already in the first two layers. Hierarchical regression is exactly this: you measure the incremental value of each ingredient AFTER everything below it is already in.' },

        { type: 'reveal',
          prompt: 'You add a psychological block to your hierarchical regression. ΔR² = .002, Sig. F Change = .67. What do you conclude?',
          answer: '**The psychological predictors add essentially NO new explanatory power beyond the demographics and behavioural variables that were already in the model.** ΔR² = .002 means just 0.2% additional variance. Sig. F Change = .67 means that tiny addition is not statistically significant either. Your write-up: "The addition of the psychological block did not significantly improve the model, ΔR² = .002, F Change(3, 304) = 0.52, p = .67." Substantively, this would be an interesting null finding — perhaps the behavioural variables (study hours, attendance) already capture whatever the psychological constructs were measuring.' },
      ],
    },

    /* ════════════════════ 3. DESIGNING BLOCKS ════════════════════ */
    {
      id: 'designing-blocks',
      title: 'Designing your blocks — the standard ordering principle',
      blocks: [
        { type: 'heading', level: 2, text: 'Build from "least theoretically interesting" to "most"' },

        { type: 'paragraph', text:
          'The conventional principle: put your CONTROL variables (the ones you have to include but aren\'t your main interest) FIRST, and your VARIABLES OF SUBSTANTIVE INTEREST LAST. That way the ΔR² and Sig. F Change for the final block answer your real research question: "does my variable of interest explain anything BEYOND what we already know from age, gender, etc.?"' },

        { type: 'heading', level: 3, text: 'The standard 3-block social-science template' },

        { type: 'comparison',
          headers: ['Block', 'What goes in it', 'Why this order'],
          rows: [
            ['**Block 1 — Demographics / Controls**', 'Age, gender, school type, county, SES band — variables you must control for but are not your focus.',                'Removes their nuisance variance first so subsequent blocks aren\'t crediting demographic effects.'],
            ['**Block 2 — Background / Behavioural**', 'Study hours, attendance, prior achievement, work experience — observable behaviours.',                                    'These are usually well-established predictors. Adds them next so the final block isn\'t crediting their effects.'],
            ['**Block 3 — Variables of substantive interest**', 'Psychological constructs, intervention status, new theoretical variables — what your thesis is REALLY about.',         'Their ΔR² answers your core research question: "do these add value beyond everything else?"'],
          ]},

        { type: 'callout', tone: 'gold', title: 'The order MUST be defensible — write it down BEFORE running',
          body: 'Decide your block order from theory, in writing, BEFORE you run the regression. If you re-order based on what gives the prettiest results, you have data-dredged and your p-values are no longer trustworthy. Document the rationale in your methods chapter ("Demographics were entered first to control for their effects; behavioural variables were entered second based on Smith (2018); psychological constructs were entered last as the focal predictors of the study.").' },

        { type: 'heading', level: 3, text: 'Other valid orderings' },

        { type: 'list', items: [
          '**Time-based:** baseline measures (Block 1) → intervention exposure (Block 2) → post-intervention measures (Block 3).',
          '**Conceptual nesting:** individual-level variables (Block 1) → family-level (Block 2) → community-level (Block 3).',
          '**Method-based:** self-report measures (Block 1) → observed/objective measures (Block 2) → biomarkers (Block 3).',
          '**Mediation testing:** predictor only (Block 1) → predictor + mediator (Block 2) → look at whether predictor\'s coefficient drops when mediator enters.',
        ]},
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running hierarchical regression in SPSS — the 8-step click path',
      blocks: [
        { type: 'heading', level: 2, text: 'It is the standard Linear Regression dialog — with the Next button' },

        { type: 'steps', steps: [
          { title: 'Open Linear Regression',
            body: 'Analyze → Regression → Linear.' },
          { title: 'Move your outcome to Dependent',
            body: 'The continuous outcome variable (e.g. **kcse_mock_score**).' },
          { title: 'Add the Block 1 predictors',
            body: 'Move your demographic/control variables (e.g. **gender, age, school_type**) into the Independent(s) box. ABOVE the box you will see "Block 1 of 1 ▶ Next".' },
          { title: 'Click Next — Block 2 begins',
            body: 'Above the box now reads "Block 2 of 2 ▶ Next ▶ Previous". The Independent(s) box clears (Block 1 is stored). Add your Block 2 predictors (e.g. **study_hours, attendance, kcpe_score**).' },
          { title: 'Click Next again — Block 3',
            body: 'Add your final block (e.g. **self_efficacy, motivation, exam_anxiety**). Keep going for more blocks if you have them.' },
          { title: 'Click Statistics — tick R squared change',
            body: 'This is the single MOST IMPORTANT step. Without "R squared change" the entire point of hierarchical regression — the ΔR² and Sig. F Change per block — does not appear in your output. Also tick **Estimates**, **Model fit**, **Descriptives**, **Collinearity diagnostics** as usual. Click Continue.' },
          { title: 'Click Method — leave at "Enter" for EVERY block',
            body: 'IMPORTANT: each block should use Method = Enter (the default). This is what makes it HIERARCHICAL (theory-driven block-by-block) rather than STEPWISE (SPSS-driven within blocks).' },
          { title: 'Click OK',
            body: 'SPSS produces a Model Summary with one row per block, an ANOVA table per block, and a Coefficients table showing every variable\'s b, β, t, p in EACH block.' },
        ]},


        { type: 'illustration', component: 'MachakosHrStepBlock1',
          caption: 'Figure 2. **STEP 3 — Load Block 1 controls, click Next (not OK!)** — The Linear Regression dialog after moving InvestmentPerStudent and Internet_Connectivity into Independent(s). Block indicator shows "Block 1 of 1". CRITICAL: click [Next] (highlighted gold) to open Block 2 — do NOT click OK yet.' },

        { type: 'illustration', component: 'MachakosHrStepBlock2',
          caption: 'Figure 3. **STEP 4 — Load Block 2 test predictors, then Statistics, then OK** — The dialog after clicking Next. Block indicator now shows "Block 2 of 2". Independent(s) box shows the NEW test predictors (Digital_Devices, Teacher_Competency in green). Block 1 variables are saved internally (small note confirms this). Next click: Statistics... → tick R squared change. Then OK.' },

        { type: 'illustration', component: 'MachakosHierarchicalBlocks',
          caption: 'Figure 2. The Linear Regression dialog set up for HIERARCHICAL regression using blocks. Currently showing Block 2 of 2 (containing Digital_Devices and Teacher_Competency as test predictors). Block 1 previously contained InvestmentPerStudent and Internet_Connectivity as baseline controls. Use [Previous] and [Next] to move between blocks. Remember to tick R squared change in Statistics... to see ΔR² in the output.' },

        { type: 'callout', tone: 'warning', title: 'Common slip — forgetting to tick R squared change',
          body: 'Every semester students run hierarchical regression but forget to tick R squared change under Statistics. The Model Summary then shows only R² per block, NOT the ΔR² and Sig. F Change you need. If you see no "R Square Change" column in your Model Summary, you missed this option — re-run with it ticked.' },
      ],
    },

    /* ════════════════════ 5. READING OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the hierarchical Model Summary',
      blocks: [
        { type: 'heading', level: 2, text: 'The one table that does ALL the heavy lifting' },

        { type: 'illustration', component: 'MachakosHierarchicalR2Change',
          caption: 'Figure 3. Model Summary output for the Machakos hierarchical regression. Model 1 (Block 1 controls): R² = .257, F(2, 264) = 45.62, p < .001. Model 2 (adds Block 2 test IVs): R² = .381, ΔR² = **.124**, ΔF(2, 262) = 26.28, p < .001. The Δ (change) columns are the KEY output — they tell you whether Block 2 adds significant explanatory power beyond Block 1.' },

        { type: 'comparison',
          headers: ['Column', 'What it shows', 'How to interpret'],
          rows: [
            ['**Model**',          'Block number (1, 2, 3…)',                                                  'Each row = the model after that block has been added.'],
            ['**R**',              'Multiple correlation coefficient',                                          'Rarely reported. Use R² instead.'],
            ['**R Square**',       'CUMULATIVE proportion of variance explained after this block',              'In block 3 this is your final overall R² — the same number Enter would have given with the same predictors.'],
            ['**Adjusted R Square**', 'R² adjusted for the number of predictors',                                'Use this when comparing models with different numbers of predictors. Always lower than R².'],
            ['**R Square Change** (ΔR²)', 'NEW variance explained by this block alone',                                'The hero column. Big ΔR² = the new block adds substantial explanatory power.'],
            ['**F Change**',        'F statistic testing whether ΔR² is significantly > 0',                     'Compare to a standard F. Large F Change + small Sig. F Change = real addition.'],
            ['**df1, df2**',        'Numerator and denominator degrees of freedom for F Change',               'df1 = number of predictors added in this block. df2 = N − total predictors so far − 1. Report both: F(df1, df2).'],
            ['**Sig. F Change**',   'p-value for ΔR²',                                                          'The single number that decides "did this block add anything?". < .05 = significant addition.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'How to interpret the table in plain English',
          body: 'Walk down the rows asking: "Did THIS block significantly add to the model beyond previous blocks?" That is the Sig. F Change for that row. If yes → mention the ΔR² (e.g. "the behavioural block added a further 19% of variance, F Change(3, 313) = 28.7, p < .001"). If no → mention it didn\'t (e.g. "the psychological block did not significantly improve the model, ΔR² = .01, p = .42"). Then look at the Coefficients table in the FINAL model (block 3) to see which individual predictors are significant in the full model.' },

        { type: 'reveal',
          prompt: 'Your Block 3 row shows: R² = .47, ΔR² = .16, F Change = 18.4, df1 = 3, df2 = 304, Sig. F Change = .000. What do you report?',
          answer: '**The psychological block added a further 16% of variance to the prediction of KCSE mock score, beyond what demographics and behavioural variables explained.** Report: "Adding the psychological block (self-efficacy, motivation, anxiety) significantly improved the model, ΔR² = .16, F Change(3, 304) = 18.4, p < .001, taking the total variance explained to R² = .47." Then refer to the Coefficients table in Model 3 to identify WHICH psychological variable(s) are doing the work — likely the ones with the largest standardised β coefficients and p < .05.' },
      ],
    },

    /* ════════════════════ 6. STEPWISE ════════════════════ */
    {
      id: 'stepwise',
      title: 'Stepwise / Forward / Backward — and why journals avoid them',
      blocks: [
        { type: 'heading', level: 2, text: 'The "let SPSS choose" methods' },

        { type: 'paragraph', text:
          'The Method dropdown in Linear Regression offers four AUTOMATIC selection methods — Stepwise, Forward, Backward, Remove. They differ from hierarchical regression in one fundamental way: SPSS (not you, not theory) decides which predictors to keep, based purely on statistical significance at each step.' },

        { type: 'comparison',
          headers: ['Method', 'What it does',                                                                                                            'Status'],
          rows: [
            ['**Enter**',     'Puts all your chosen predictors in simultaneously. You decide which.',                                                       '✅ Standard for simple multiple regression.'],
            ['**Hierarchical** (via blocks + Next + Enter per block)', 'You specify the order of theory-driven blocks. SPSS adds them in that order and reports ΔR² per block.', '✅ Standard for theory-driven model building.'],
            ['**Forward**',   'Starts with no predictors. Adds the one with the lowest p-value. Repeats until no more predictors hit the entry criterion.',  '⚠️ Discouraged. Capitalises on chance.'],
            ['**Backward**',  'Starts with all predictors. Removes the one with the largest p-value. Repeats until no more predictors hit the removal criterion.', '⚠️ Discouraged. Same problems.'],
            ['**Stepwise**',  'Combines Forward and Backward: adds best new predictor, then checks whether any existing predictor can now be removed. Iterates.', '⚠️ Strongly discouraged in modern methodology. Atheoretical; unstable across samples; inflated false positives.'],
            ['**Remove**',     'Forces specified variables OUT of an existing model. Rarely used directly.',                                                  'Rare. Niche use.'],
          ]},

        { type: 'illustration', component: 'StepwiseProblems',
          caption: 'Figure 4. Why stepwise regression is dangerous. Top: a stepwise run on Sample A keeps predictors X1, X3, X7. Bottom: re-running on Sample B (drawn from the SAME population) keeps a DIFFERENT set: X2, X3, X5. Same population, same predictors, different "winners" — because stepwise is sample-dependent and capitalises on chance correlations. Hierarchical regression, by contrast, would have used the same theory-driven blocks on both samples and given comparable structural answers.' },

        { type: 'heading', level: 3, text: 'The four main objections to stepwise' },

        { type: 'list', items: [
          '**Atheoretical** — SPSS picks variables on p-values, not on theory. The resulting model has no scientific justification beyond "the algorithm chose these."',
          '**Unstable** — re-run on a slightly different sample (or even the same sample with a different random seed for cross-validation) and you typically get a different set of "winning" predictors.',
          '**Inflated Type I error** — the cumulative false-positive rate across the many tests stepwise performs is much higher than the nominal α = .05 reported per test.',
          '**Bias in coefficients and CIs** — coefficients of selected variables are biased away from zero; their standard errors and CIs do not account for the selection process. The reported p-values are too small.',
        ]},

        { type: 'heading', level: 3, text: 'When you might still use stepwise (rare cases)' },

        { type: 'list', items: [
          '**Pure exploration** with no theory, e.g. screening 200 candidate predictors before a follow-up study designs a confirmatory analysis. Always report results as exploratory.',
          '**Supervisor specifically demands it** (some older statistics traditions still teach it). Run it but ALSO run a hierarchical or theory-driven Enter model and report both.',
          '**Predictive modelling for non-causal purposes** (e.g. a quick predictive model where understanding which predictors matter doesn\'t matter — only out-of-sample accuracy does). Even here, machine-learning methods like LASSO usually outperform stepwise.',
        ]},

        { type: 'heading', level: 3, text: 'How to run stepwise in SPSS (if you must)' },

        { type: 'steps', steps: [
          { title: 'Open Linear Regression',
            body: 'Analyze → Regression → Linear. Move outcome to Dependent.' },
          { title: 'Add ALL candidate predictors in one block',
            body: 'Move every variable you want SPSS to consider into Independent(s).' },
          { title: 'Change Method to Stepwise',
            body: 'In the Method dropdown, select **Stepwise**. SPSS will use F-to-enter ≈ p < .05 and F-to-remove ≈ p > .10 by default. You can tighten these under Options.' },
          { title: 'Click OK',
            body: 'The Model Summary will have ONE ROW PER STEP showing the variable added/removed at each step, the cumulative R², and the ΔR². The final row is the "final model".' },
          { title: 'Report with appropriate caveats',
            body: '"A stepwise regression was conducted as a SECONDARY analysis to compare with the hierarchical model. Results should be interpreted with caution due to known limitations of stepwise selection (Babyak, 2004; Field, 2018)."' },
        ]},
      ],
    },

    /* ════════════════════ 7. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — predicting KCSE mock scores',
      blocks: [
        { type: 'workedExample', title: 'A PhD study at Kenyatta University',
          body: [
            { label: 'The research question',
              text: 'Do psychological factors (self-efficacy, motivation, exam anxiety) predict Form 4 pupils\' KCSE mock scores BEYOND what demographics and observable behaviours already explain?' },
            { label: 'The data',
              text: 'n = 320 Form 4 pupils across 3 Kiambu schools. Outcome: **kcse_mock_score** (continuous 0-500). 11 predictors organised into 3 theory-driven blocks.' },
            { label: 'Step 1 — Specify the blocks IN WRITING before running',
              text: 'Block 1 = demographics (gender, age, school_type). Block 2 = behavioural (study_hours, attendance_rate, kcpe_entry_score). Block 3 = psychological (self_efficacy, intrinsic_motivation, exam_anxiety, past_paper_use). Rationale documented in methods chapter.' },
            { label: 'Step 2 — Run hierarchical regression',
              text: 'Analyze → Regression → Linear → kcse_mock_score in Dependent. Block 1: add demographics → Next. Block 2: add behavioural → Next. Block 3: add psychological. Method = Enter for each block. Statistics → tick Estimates, Model fit, R squared change, Collinearity diagnostics → Continue → OK.' },
            { label: 'Step 3 — Read the Model Summary',
              text: 'Block 1: R² = .12, ΔR² = .12, F Change(3, 316) = 14.36, p < .001. Block 2: R² = .31, ΔR² = .19, F Change(3, 313) = 28.74, p < .001. Block 3: R² = .47, ΔR² = .16, F Change(4, 309) = 22.85, p < .001. All three blocks add significantly.' },
            { label: 'Step 4 — Look at Coefficients in the FINAL block (Model 3)',
              text: 'In the full model: school_type (β = .15, p = .002), kcpe_entry_score (β = .31, p < .001), study_hours (β = .19, p < .001), self_efficacy (β = .22, p < .001), exam_anxiety (β = −.18, p < .001) are all significant. Gender, age, attendance, motivation, past_paper_use not significant in the full model.' },
            { label: 'Step 5 — Check collinearity',
              text: 'All Tolerance values > .40, all VIFs < 2.5 (well below the 5/10 thresholds). No multicollinearity concern.' },
            { label: 'Step 6 — APA write-up (block-by-block format)',
              text: '*"A three-block hierarchical multiple regression was conducted to predict Form 4 pupils\' KCSE mock scores (n = 320). Demographics were entered in Block 1 to control for their effects; behavioural variables in Block 2 based on prior literature (Smith, 2018); psychological variables in Block 3 as the focal predictors of the study. Block 1 (demographics) significantly predicted mock score, R² = .12, F(3, 316) = 14.36, p < .001. Adding behavioural variables in Block 2 significantly improved the model, ΔR² = .19, F Change(3, 313) = 28.74, p < .001. Adding psychological variables in Block 3 further significantly improved the model, ΔR² = .16, F Change(4, 309) = 22.85, p < .001, taking the total variance explained to 47%. In the final model, KCPE entry score (β = .31, p < .001), study hours (β = .19, p < .001), self-efficacy (β = .22, p < .001), exam anxiety (β = −.18, p < .001), and school type (β = .15, p = .002) emerged as significant predictors. All Tolerance values exceeded .40 and all VIFs were below 2.5, indicating no multicollinearity concerns. The findings suggest that psychological factors — particularly self-efficacy and exam anxiety — predict academic performance over and above demographic and behavioural variables."*' },
          ]},
      ],
    },

    /* ════════════════════ 8. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing hierarchical regression up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A [k]-block hierarchical multiple regression was conducted to predict [OUTCOME] in [n] [participants description]. [Block 1 description] were entered in Block 1 [rationale]; [Block 2 description] in Block 2 [rationale]; [Block 3 description] in Block 3 [rationale]. Block 1 ([first block name]) significantly predicted [outcome], R² = [value], F([df1], [df2]) = [F-value], p = [p-value]. Adding [Block 2 name] in Block 2 [significantly / did not significantly] improve the model, ΔR² = [value], F Change([df1], [df2]) = [value], p = [value]. Adding [Block 3 name] in Block 3 [significantly / did not significantly] further improve the model, ΔR² = [value], F Change([df1], [df2]) = [value], p = [value], taking the total variance explained to [final R² × 100]%. In the final model, [list significant predictors with their β and p-values]. [Collinearity statement.] The findings suggest [substantive interpretation].' },

        { type: 'callout', tone: 'success', title: 'Eight things every hierarchical regression write-up must include',
          body: '**1.** Number of blocks and the rationale for the ordering. **2.** Block 1 R² with F, df, p. **3.** Each subsequent block: ΔR² with F Change, df1, df2, p. **4.** Final cumulative R² (and adjusted R²). **5.** Significant predictors in the FINAL model with standardised β and p. **6.** Collinearity check (Tolerance / VIF). **7.** Sample size. **8.** Substantive interpretation tying back to the research question.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why hierarchical regression rather than ordinary (Enter) multiple regression?',
              a: 'My research question was specifically whether psychological variables predict KCSE mock scores BEYOND demographic and behavioural predictors. Ordinary Enter regression would have produced a single combined model in which the unique contribution of the psychological block could not be isolated. Hierarchical regression — entering predictor blocks in a theoretically justified order and examining ΔR² for each — directly answers the "does this add value beyond what we already know?" question that motivates the study.' },
            { q: 'Why this particular order of blocks?',
              a: 'The conventional principle is to enter control variables first (so that subsequent blocks are not credited with their effects) and variables of substantive interest last (so that the final ΔR² answers the focal question). Demographics were entered in Block 1 because they are well-established but uninteresting confounders; observable behavioural predictors in Block 2 based on the prior literature (Smith, 2018); psychological constructs in Block 3 as the focal predictors of the study. The order was specified in writing before any data analysis began and was not adjusted in light of results.' },
            { q: 'Why not stepwise regression — wouldn\'t that give the most parsimonious model?',
              a: 'Stepwise selection is strongly discouraged in modern regression methodology (Babyak, 2004; Field, 2018; Harrell, 2015). It is atheoretical, produces models that change substantially across samples of the same population, inflates the cumulative Type I error rate well above the nominal alpha, and biases coefficient estimates and confidence intervals because the selection process itself is not accounted for. Hierarchical regression provides parsimony WHEN parsimony is theoretically justified (by retaining variables whose blocks add ΔR²) without the inferential problems of automated selection.' },
          ]},
      ],
    },

    /* ════════════════════ 9. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five common hierarchical regression mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Forgetting to tick "R squared change" under Statistics',
          body: 'You run hierarchical regression but the Model Summary shows only R² per block — no ΔR², no F Change, no Sig. F Change. You\'ve lost the entire point of the analysis.',
          fix: 'Always click Statistics in the Linear Regression dialog and tick "R squared change". This adds the Change Statistics columns to the Model Summary. Without them, hierarchical regression collapses to a series of ordinary regressions with no comparative information.' },

        { type: 'mistake',
          title: 'Mistake 2 — Re-ordering blocks after seeing the results',
          body: 'Block 3 (your focal predictors) did not significantly improve the model. You move them to Block 2 instead, hoping they look better with fewer competitors. They do — and you report that order.',
          fix: 'Specify your block order in writing BEFORE running. Re-ordering based on what gives the prettiest results is data-dredging and inflates Type I error. If your focal block does not significantly improve the model in the pre-specified order, report it honestly — that is a legitimate null finding.' },

        { type: 'mistake',
          title: 'Mistake 3 — Using Stepwise WITHIN each block instead of Enter',
          body: 'You set up hierarchical blocks but changed the Method dropdown to Stepwise. SPSS now uses stepwise selection WITHIN each block. This destroys the theory-driven structure — SPSS is picking variables within blocks rather than letting your theory dictate.',
          fix: 'Keep Method = Enter for every block. The hierarchical structure comes from the BLOCKS, not from any within-block automation. If you genuinely want stepwise too, run it as a separate secondary analysis.' },

        { type: 'mistake',
          title: 'Mistake 4 — Reporting only the final-block R², omitting the block-by-block story',
          body: 'You report "Hierarchical regression explained 47% of variance" and stop. You\'ve thrown away the entire incremental story that hierarchical regression was designed to tell.',
          fix: 'Walk the reader through each block: Block 1 R², Block 2 ΔR², Block 3 ΔR² — with F Change, df, and p for each. The reader cares about how the variance breakdown reflects your theory, not just the cumulative total.' },

        { type: 'mistake',
          title: 'Mistake 5 — Using stepwise as the primary analysis in a thesis',
          body: 'Your supervisor mentioned stepwise once and you ran it as your main analysis. The reviewer asks for the theoretical justification of the final variable set. You have none — SPSS chose them on p-values.',
          fix: 'Use HIERARCHICAL regression as your primary analysis. If your supervisor insists on stepwise, run it as a SECONDARY check, report it briefly with caveats (Babyak 2004 is the standard cite), and explain why the hierarchical model is your primary inferential model.' },
      ],
    },

    /* ════════════════════ 10. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Hierarchical regression adds predictors in theory-driven BLOCKS, with YOU controlling the order — answering "does this block add value BEYOND previous blocks?"',
          'The key statistic is ΔR² (change in R²) and its associated Sig. F Change p-value, reported for each block.',
          'Standard ordering: Block 1 = demographics/controls → Block 2 = behavioural/background → Block 3 = focal predictors of substantive interest.',
          'Always specify the block order IN WRITING before running, based on theory — never re-order based on results.',
          'Run via Analyze → Regression → Linear → add Block 1 → Next → add Block 2 → Next → add Block 3 → Statistics tick R squared change → Method = Enter for EVERY block → OK.',
          'Read the Model Summary row by row, reporting cumulative R², ΔR², F Change, df1, df2, Sig. F Change for each block.',
          'Stepwise / Forward / Backward selection is atheoretical, unstable, inflates Type I error, and is increasingly rejected by journals. Avoid as primary analysis.',
          'When supervisor demands stepwise, run it as a SECONDARY check with appropriate caveats (Babyak 2004, Field 2018).',
          'Report: number of blocks, rationale, per-block R²/ΔR²/F Change, final R², significant predictors in final model with β and p, collinearity (VIF), substantive interpretation.',
          'Five mistakes to avoid: forgetting R² change, re-ordering blocks, using Stepwise within blocks, omitting block-by-block story, stepwise as primary.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 2: Multinomial & ordinal logistic regression** we extend the logistic regression from lesson `reg-4` (binary outcomes) to OUTCOMES WITH 3+ CATEGORIES — either unordered (multinomial: which mode of transport?) or ordered (ordinal: poverty band low/medium/high?).' },

        { type: 'paragraph', text:
          'Before moving on, find a dataset with a continuous outcome and 5-10 predictors you could organise into theory-driven blocks. Run hierarchical regression with 2-3 blocks, tick R squared change, and write up the block-by-block story in APA. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'What is the KEY statistic that hierarchical regression provides that ordinary Enter regression does not?',
          choices: [
            'The standardised beta (β)',
            'ΔR² (R Square Change) for each block — the new variance explained by that block beyond previous blocks',
            'The F statistic',
            'Cohen\'s d',
          ],
          answer: 1,
          explanation: 'Enter regression gives you ONE R² for the whole model. Hierarchical regression gives you ONE R² per block PLUS the change between blocks (ΔR²). That change — and its associated F Change p-value — answers the focal question "does this block of predictors add value over and above what came before?" — which Enter cannot answer.' },

        { type: 'check',
          question: 'In a 3-block hierarchical regression studying psychological predictors of exam scores, what is the conventional order?',
          choices: [
            'Whichever order gives the best ΔR² values',
            'Block 1 = focal psychological predictors; Block 2 = behavioural; Block 3 = demographics',
            'Block 1 = demographics/controls; Block 2 = behavioural/background; Block 3 = focal psychological predictors',
            'Random order',
          ],
          answer: 2,
          explanation: 'Controls go FIRST so their variance is partialled out. Variables of substantive interest go LAST so their ΔR² answers "do they add value beyond everything else?". Specify the order in writing before running — never re-order based on results.' },

        { type: 'check',
          question: 'You set up hierarchical blocks but forgot to tick "R squared change" under Statistics. What goes wrong?',
          choices: [
            'Nothing — SPSS includes it by default',
            'The Model Summary shows only R² per block, not the ΔR² / F Change / Sig. F Change you need to test whether each block adds significantly',
            'SPSS crashes',
            'The coefficients become invalid',
          ],
          answer: 1,
          explanation: 'R Square Change is OFF by default. Without it, hierarchical regression collapses to a series of ordinary regressions with no comparative information. Always click Statistics and tick R squared change before clicking OK — without it you cannot report the block-by-block story.' },

        { type: 'check',
          question: 'Your Block 3 (focal predictors) row shows ΔR² = .16, F Change(4, 309) = 22.85, Sig. F Change < .001. What do you conclude?',
          choices: [
            'The focal predictors did not add anything',
            'Adding the focal-predictor block significantly improved the model, contributing an additional 16% of variance beyond demographics and behavioural variables — strong evidence the focal predictors matter',
            'Block 3 is redundant with Block 2',
            'Multicollinearity is present',
          ],
          answer: 1,
          explanation: 'ΔR² = .16 means Block 3 added 16% of new variance. F Change(4, 309) = 22.85, p < .001 confirms that 16% is statistically significant — not chance. Substantively the focal predictors are pulling real weight beyond demographics and behavioural variables. Then look at the Coefficients table in Model 3 to see which specific psychological variables are doing the work.' },

        { type: 'check',
          question: 'Why is stepwise regression strongly discouraged as the primary analysis in thesis-level work?',
          choices: [
            'It runs too slowly',
            'It is atheoretical, unstable across samples, inflates Type I error rate, and biases coefficient estimates and CIs because the selection process is not accounted for in the inference',
            'It always picks the wrong predictors',
            'SPSS does not support it',
          ],
          answer: 1,
          explanation: 'All four objections are real. The cumulative false-positive rate across stepwise\'s many tests is much higher than the nominal α. Re-runs on slightly different samples pick different variables. Coefficients of "selected" variables are biased away from zero. Reported p-values are too small. Modern methodologists (Babyak, Field, Harrell) recommend hierarchical or theory-driven Enter regression instead.' },

        { type: 'check',
          question: 'Your supervisor insists you also run stepwise. What is the appropriate way to handle it?',
          choices: [
            'Refuse',
            'Run stepwise as your primary analysis',
            'Use hierarchical/Enter regression as your PRIMARY analysis; run stepwise as a SECONDARY check, report it briefly with caveats citing Babyak (2004) and Field (2018), and explain why hierarchical is your primary inferential model',
            'Run stepwise and hide the hierarchical result',
          ],
          answer: 2,
          explanation: 'Modern best practice: theory-driven (hierarchical or Enter) regression as the primary inferential analysis; stepwise — if used at all — as a secondary exploratory check with appropriate caveats. Cite the standard methodological references explaining why hierarchical is preferred. This respects your supervisor\'s request while keeping the thesis methodologically defensible.' },
      ],
    },
  ],
};
