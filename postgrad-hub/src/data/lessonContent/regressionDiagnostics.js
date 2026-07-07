/**
 * Regression Analysis · Lesson 3 — Assumptions & Diagnostics
 * Checking that the assumptions actually hold. What to do when they fail.
 */

export const REGRESSION_DIAGNOSTICS_LESSON = {
  id: 'reg-3',
  title: 'Assumptions & diagnostics',
  subtitle: 'Module 03 · Course: Regression Analysis · Lesson 3 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'The check-ups every regression needs',
      blocks: [
        { type: 'scene', body: [
          'You ran a multiple regression with three predictors. R² = .24, F-test highly significant, all three predictors significant with sensible β values, VIF below 2 — looks great. You start writing up. Then your supervisor asks: *"Did you check the assumptions? Run the residual plots. Test for normality. Check Durbin-Watson. Examine influential cases."*',
          'You blink. You vaguely remember "assumptions" from a stats class but never actually verified them. You assumed (no pun intended) the test just works if the inputs look reasonable. Your supervisor is about to teach you a hard lesson: **a regression that LOOKS good can be quietly violating its assumptions, and the coefficients you reported may be biased or misleading.**',
          'This lesson teaches you the FIVE assumptions of linear regression, how to check each one in SPSS, what the diagnostic plots actually mean, and — crucially — what to DO when an assumption fails. Skipping diagnostics is the single biggest gap between a passing thesis and a credible one.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Name the five assumptions** of linear regression in plain English.',
            '**Generate the diagnostic plots** SPSS provides under the Plots and Save buttons.',
            '**Read the residuals scatter plot** to check linearity and homoscedasticity.',
            '**Read the histogram and P-P plot** of residuals to check normality.',
            '**Interpret the Durbin-Watson statistic** for independence of residuals.',
            '**Spot influential outliers** using Cook\'s distance and standardised residuals.',
            '**Decide what to do** when each assumption is violated — transform, switch test, or accept and caveat.',
            '**Write up the diagnostic findings** so your assumption-checking is visible to examiners.',
          ]},

        { type: 'why', body:
          'Examiners regularly ask: "How did you verify the regression assumptions?" The student who can show the plots, name the statistics, and explain what they checked looks methodologically thorough. The student who says "I assumed they were met" gets a difficult viva. This single lesson saves you from that conversation.' },
      ],
    },

    /* ════════════════════ 2. THE FIVE ASSUMPTIONS ════════════════════ */
    {
      id: 'five-assumptions',
      title: 'The five assumptions of linear regression',
      blocks: [
        { type: 'illustration', component: 'MachakosRegFiveAssumptions',
          caption: 'Figure 0. The 5 assumptions of linear regression as a printable reference card. Each panel: definition, how to check in SPSS, what to do if it fails. Every regression you run in your thesis needs ALL 5 checked before you write up. The navy banner at the bottom tells you exactly which boxes to tick in Plots... Statistics... and Save... to generate all the diagnostics in one run.' },


        { type: 'heading', level: 2, text: 'Each one in one paragraph' },

        { type: 'paragraph', text:
          'Linear regression rests on five assumptions. The first four are about the data and the relationship; the fifth (multicollinearity) only applies to multiple regression. We name each one, explain what it means, and preview how to check it. The rest of the lesson teaches the actual checking.' },

        { type: 'comparison',
          headers: ['#', 'Assumption', 'Plain English', 'How to check'],
          rows: [
            ['1', '**Linearity**',           'The relationship between X and Y is approximately straight-line — not curved.',           'Scatter plot of X vs Y BEFORE regression; residuals vs predicted values plot AFTER.'],
            ['2', '**Independence of errors**', 'One case\'s error tells you nothing about another case\'s error. No clustering or time-ordering pattern.', 'Durbin-Watson statistic (1.5-2.5 is acceptable).'],
            ['3', '**Homoscedasticity**',    'The spread of residuals is roughly constant across all predicted values — no funnel shape.', 'Residuals vs predicted values scatter plot — should look like a random cloud.'],
            ['4', '**Normality of residuals**', 'The residuals (not the raw variables) are approximately normally distributed.',          'Histogram and P-P plot of residuals.'],
            ['5', '**No multicollinearity** (multiple regression only)', 'Predictors are not too highly correlated with each other.',     'VIF (< 5 acceptable) and Tolerance (> .20 acceptable).'],
          ]},

        { type: 'callout', tone: 'info', title: 'Notice it is RESIDUALS, not raw variables',
          body: 'A common confusion: the normality and homoscedasticity assumptions are about the RESIDUALS (the errors from your fitted model), NOT about the raw X and Y variables. So even if your raw Y variable is non-normal, your model can still be fine — what matters is the residuals after the model is fitted. This is why diagnostics happen AFTER running the regression, not before.' },
      ],
    },

    /* ════════════════════ 3. GENERATING DIAGNOSTICS ════════════════════ */
    {
      id: 'generating',
      title: 'Generating the diagnostic plots in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'Click the right buttons in the Linear Regression dialog' },

        { type: 'paragraph', text:
          'Most of the diagnostics live behind two buttons in the Linear Regression dialog: **Plots…** and **Save…**. You need to tick the right options BEFORE running, or you get only the basic output without the diagnostics.' },

        { type: 'steps', steps: [
          { title: 'In Linear Regression, click Plots…',
            body: [
              'Under "Scatter 1 of 1", move **ZRESID** (standardised residuals) to the Y axis and **ZPRED** (standardised predicted values) to the X axis. This produces the most important diagnostic plot — residuals vs predicted values.',
              'Under "Standardized Residual Plots", tick **Histogram** and **Normal probability plot**. These check normality of residuals.',
              'Click Continue.',
            ]},
          { title: 'Click Save…',
            body: [
              'Under "Distances", tick **Cook\'s** and **Mahalanobis**. These help identify influential cases (Section 6).',
              'Under "Residuals", tick **Standardized**. Cases with |standardised residual| > 3 are potential outliers.',
              'Click Continue. (Note: "Save" doesn\'t mean save the file — it means save these diagnostic values as new variables in your dataset.)',
            ]},
          { title: 'Click Statistics…',
            body: 'Tick **Durbin-Watson** (under Residuals). This gives you the independence-of-errors statistic. Click Continue.' },
          { title: 'Click OK to run',
            body: 'SPSS produces the regression output PLUS the diagnostic plots (in the Output Viewer) AND adds new columns to your dataset for Cook\'s distance, standardised residuals, etc.' },
        ]},

        { type: 'callout', tone: 'gold', title: 'Make diagnostics a reflex',
          body: 'Every single time you run a regression for thesis work, click Plots and tick the residuals plot, histogram, and P-P plot. It adds 5 seconds and saves you from later asking "did I check that?". Make it a habit.' },
      ],
    },

    /* ════════════════════ 4. CHECKING LINEARITY & HOMOSCEDASTICITY ════════════════════ */
    {
      id: 'linearity-homoscedasticity',
      title: 'Checking linearity & homoscedasticity — the residual plot',
      blocks: [
        { type: 'heading', level: 2, text: 'Two assumptions, one plot' },

        { type: 'paragraph', text:
          'The scatter plot of **standardised residuals (Y axis) vs standardised predicted values (X axis)** is the most important diagnostic in regression. It checks TWO assumptions at once — linearity and homoscedasticity.' },

        { type: 'illustration', component: 'MachakosRegResidualScatter',
          caption: 'Figure 1. Three diagnostic patterns for the residuals vs predicted scatter plot. GOOD (left, green) = random cloud, assumptions met. BAD (middle, red) = U-shape means linearity is violated (need a transform or non-linear model). BAD (right, amber) = fan/funnel means homoscedasticity is violated (need robust standard errors or transform DV). Every regression needs this plot checked before Chapter 4.' },

        { type: 'illustration', component: 'MachakosDiagNormality',
          caption: 'Figure 2. NORMALITY of residuals — 2 diagnostic plots side by side. LEFT: histogram of standardized residuals with a red normal-curve overlay. If the bars roughly match the curve, normality is OK. RIGHT: Normal P-P plot. If the blue points hug the diagonal line, normality is OK. With N=267 (Machakos), mild deviations are tolerated by the Central Limit Theorem — only worry if bars are wildly asymmetric or PP points curve dramatically away. To generate: Linear Regression → Plots... → tick Histogram AND Normal probability plot.' },

        { type: 'illustration', component: 'MachakosDiagVIF',
          caption: 'Figure 3. MULTICOLLINEARITY diagnostics — the Tolerance and VIF columns from the Machakos Coefficients table. All 4 IVs have VIF between 1.64 (Internet_Connectivity) and 2.08 (InvestmentPerStudent) — well below the 5 threshold. Safe. **Rule: VIF < 5 = OK · VIF > 10 = drop the redundant IV.** To generate: Statistics... → tick Collinearity diagnostics.' },

        { type: 'illustration', component: 'MachakosDiagCooks',
          caption: 'Figure 4. INFLUENTIAL OUTLIERS — Cook distance for the Machakos study. Each dot is one respondent Cook D. 4 cases exceed the 4/N threshold (circled red) but NONE exceed the danger threshold of 1.0. Action: investigate the 4 flagged cases (are their raw values realistic?) and run a sensitivity analysis with and without them. To generate: Linear Regression → Save... → tick Cook distance. A new variable COO_1 appears in your Data View.' },


        { type: 'heading', level: 3, text: 'What to look for' },

        { type: 'list', items: [
          '**A random, even cloud around zero** → linearity and homoscedasticity both look fine. Move on.',
          '**A clear curve or arc pattern** → linearity is violated. Your relationship is not straight; the model is missing curvature. Consider polynomial terms or transforming a variable.',
          '**A funnel shape (spread widens as predicted values increase)** → heteroscedasticity. The variance of errors is not constant. Standard errors will be biased, p-values unreliable. Consider transforming Y (try log) or use robust standard errors.',
          '**A bow-tie or other systematic shape** → both assumptions likely violated. Investigate carefully — your model may be misspecified.',
        ]},

        { type: 'heading', level: 3, text: 'What to do if violated' },

        { type: 'comparison',
          headers: ['Pattern', 'Most likely problem', 'Common fix'],
          rows: [
            ['Clear curve in residuals',           'Linearity violated',                'Add a polynomial term (X²) or transform X with log/square root.'],
            ['Funnel widening to the right',       'Heteroscedasticity (rightward)',    'Try log(Y) or √Y transformation; or use robust standard errors.'],
            ['Funnel widening to the left',        'Heteroscedasticity (leftward)',     'Try Y² transformation; rare in practice.'],
            ['Two separate clouds',                'Possible omitted categorical predictor', 'Include the categorical variable as a dummy code.'],
          ]},

        { type: 'reveal',
          prompt: 'Your residuals plot shows a clear funnel shape — narrow on the left, wide on the right. Your DV is monthly income (KSh) and the model has 3 predictors. What is happening and what should you try?',
          answer: '**Heteroscedasticity — common with income data.** Larger predicted incomes have wider error spread; smaller predicted incomes are tightly predicted. This is typical of any variable that ranges over orders of magnitude (income, expenditure, sales). The standard fix: transform Y. Create a new variable **log_income = LN(income)** using Transform → Compute Variable. Re-run the regression with log_income as the outcome. The residuals plot should now look much more even. Report the transformation in your methodology and interpret coefficients in log units (a 1-unit change in X corresponds to a β-fold percentage change in income).' },
      ],
    },

    /* ════════════════════ 5. CHECKING NORMALITY ════════════════════ */
    {
      id: 'normality',
      title: 'Checking normality of residuals',
      blocks: [
        { type: 'heading', level: 2, text: 'Two visual tools — histogram and P-P plot' },

        { type: 'paragraph', text:
          'Linear regression assumes residuals (not the raw Y variable) are approximately normally distributed. SPSS provides two visual checks under Plots: the **histogram** of standardised residuals (with a normal curve overlay) and the **Normal P-P plot** (which compares your residuals against the perfect normal distribution).' },

        { type: 'heading', level: 3, text: 'Reading the histogram of residuals' },

        { type: 'paragraph', text:
          'Look at the histogram. Does it ROUGHLY follow the bell curve SPSS overlays? Perfect normality is rare; small departures are fine. Look for major problems: heavy skew, multiple peaks, dramatic deviations from the bell shape.' },

        { type: 'heading', level: 3, text: 'Reading the Normal P-P plot' },

        { type: 'paragraph', text:
          'The P-P plot ("probability-probability") plots your residuals against where they should fall if perfectly normal. If they are normal, the points fall on a straight 45° line. Deviations from this line indicate non-normality. Mild S-curves or slight bends are common and tolerable; large systematic departures (long curves, points well off the line) suggest the assumption is violated.' },

        { type: 'callout', tone: 'info', title: 'Normality matters less with large samples',
          body: 'Thanks to the Central Limit Theorem, in large samples (n > 100) regression is fairly robust to mild non-normality of residuals. In smaller samples (n < 50) normality matters more. So if your sample is large and the histogram looks "mostly bell-ish", you can usually proceed and note the assumption was approximately met. With small samples and visibly non-normal residuals, consider transforming Y or using a non-parametric alternative.' },

        { type: 'heading', level: 3, text: 'What to do if normality is violated' },

        { type: 'list', items: [
          '**Small samples (n < 50) with clear non-normality** — try transforming Y (log, square root, reciprocal). Re-check residuals after transformation.',
          '**Skewed Y variable (e.g. income)** — log transformation often helps both normality and homoscedasticity at the same time.',
          '**Outliers driving the non-normality** — investigate the outliers separately; they may be the real story.',
          '**Bimodal residuals (two peaks)** — usually indicates a missing categorical predictor. Add the relevant grouping variable.',
        ]},
      ],
    },

    /* ════════════════════ 6. INDEPENDENCE — DURBIN-WATSON ════════════════════ */
    {
      id: 'independence',
      title: 'Checking independence — the Durbin-Watson statistic',
      blocks: [
        { type: 'heading', level: 2, text: 'A single number to interpret' },

        { type: 'paragraph', text:
          'Independence of errors means: knowing one case\'s residual tells you nothing about another case\'s residual. This is usually true when cases are independent (different respondents, randomly sampled). It is most often violated in time-series data (today\'s error correlates with yesterday\'s) and clustered data (pupils in the same school correlate with each other).' },

        { type: 'paragraph', text:
          'The **Durbin-Watson statistic** (D-W) is the standard test for the first kind of violation — autocorrelation in time-ordered data. It ranges from 0 to 4.' },

        { type: 'comparison',
          headers: ['Durbin-Watson value', 'Interpretation'],
          rows: [
            ['~2.0',  '✓ No autocorrelation — independence assumption met.'],
            ['1.5-2.5', '✓ Generally acceptable for thesis work.'],
            ['< 1.5',  '⚠ Positive autocorrelation — successive errors are similar. Common in time-series.'],
            ['> 2.5', '⚠ Negative autocorrelation — successive errors flip sign. Less common.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'For most cross-sectional thesis data',
          body: 'If you collected data from a sample of respondents at one point in time (typical thesis survey), independence is usually satisfied by your sampling design — the Durbin-Watson value will typically fall in the 1.5-2.5 range and you can report "Durbin-Watson = X.XX, indicating independence of errors". If you have time-series data or clustered data (pupils within schools), you may need more advanced techniques (multilevel models, time-series regression).' },
      ],
    },

    /* ════════════════════ 7. INFLUENTIAL CASES ════════════════════ */
    {
      id: 'influential',
      title: 'Spotting influential outliers — Cook\'s distance & standardised residuals',
      blocks: [
        { type: 'heading', level: 2, text: 'A handful of cases can dominate a regression' },

        { type: 'paragraph', text:
          'Outliers in regression are special. An individual case can be UNUSUAL in two ways: it can have an extreme value on the predictors (called HIGH LEVERAGE), or it can have a much larger residual than other cases (called LARGE RESIDUAL). The cases that are BOTH unusual on predictors AND have large residuals are called INFLUENTIAL — they can single-handedly pull regression coefficients around.' },

        { type: 'heading', level: 3, text: 'Two key statistics to check' },

        { type: 'comparison',
          headers: ['Statistic', 'What it shows', 'Threshold to investigate'],
          rows: [
            ['**Standardised residual**', 'How far this case sits from its predicted value, in standard deviation units.',     '|value| > 3 — investigate this case.'],
            ['**Cook\'s distance**',      'Combined measure of leverage and residual — how much the model would change if this case were removed.', '> 1.0 (some say > 4/n) — investigate. Cook\'s > 1 means the case is highly influential.'],
          ]},

        { type: 'heading', level: 3, text: 'How to inspect them in SPSS' },

        { type: 'steps', steps: [
          { title: 'In Linear Regression → Save…',
            body: 'Tick **Cook\'s** under Distances and **Standardized** under Residuals. Click Continue → OK to run.' },
          { title: 'Look at your dataset',
            body: 'Two new variables appear: COO_1 (Cook\'s distance) and ZRE_1 (standardised residual). Each row now has these values.' },
          { title: 'Run Frequencies or Descriptives on the new columns',
            body: 'Analyze → Descriptive Statistics → Frequencies → COO_1 and ZRE_1. Look at the maximum values. If max Cook\'s > 1, OR max |ZRE_1| > 3, you have at least one potentially influential outlier.' },
          { title: 'Find the offending case',
            body: 'In Data View, sort by COO_1 descending (Data → Sort Cases). The top rows are your candidate influential cases. Investigate them: are they data-entry errors? Genuine but rare cases?' },
          { title: 'Decide what to do',
            body: 'Either (a) correct the case if it is a data-entry error, (b) keep it and report regression WITH and WITHOUT the case for transparency, or (c) drop it with a clear justification. NEVER drop cases just because they hurt your results.' },
        ]},

        { type: 'mistake',
          title: 'Dropping outliers without justification to "improve" results',
          body: 'You see a case with Cook\'s = 1.4 and a large residual that pulls your effect to non-significance. You delete it and re-run. Now you have a "clean" significant result.',
          fix: 'Deleting cases to improve results is data manipulation. The honest approach: report the regression WITH and WITHOUT the outlier, transparently. If the outlier appears to be a genuine data-entry error (impossible value), fix or remove it with documentation. If it is a real but rare case, keeping it tells the truer story — even if it weakens your effect.' },
      ],
    },

    /* ════════════════════ 8. SUMMARY DECISION TREE ════════════════════ */
    {
      id: 'decision-tree',
      title: 'What to do when an assumption fails',
      blocks: [
        { type: 'heading', level: 2, text: 'A practical decision guide' },

        { type: 'decision', title: 'Which assumption failed?',
          branches: [
            { condition: '↩', action: '**Linearity violated (curved pattern in residuals)** → Add a quadratic predictor (X²) or transform X (log, square root). Re-run and re-check.' },
            { condition: '🔺', action: '**Heteroscedasticity (funnel shape in residuals)** → Transform Y (log is the most common fix for right-funnels). Or use robust standard errors (PROCESS macro, or other software). Or accept and caveat.' },
            { condition: '📉', action: '**Non-normal residuals (small sample)** → Try transforming Y. For larger samples (n > 100) often safe to proceed with a caveat noting the violation.' },
            { condition: '🕒', action: '**Durbin-Watson outside 1.5-2.5** → Investigate for time-series or clustering. Consider multilevel models or time-series regression for serious violations.' },
            { condition: '⚠', action: '**Multicollinearity (VIF > 10)** → Drop one of the collinear predictors, combine them theoretically, centre interaction terms, or report and interpret cautiously.' },
            { condition: '🎯', action: '**Influential outliers (Cook\'s > 1)** → Investigate the cases. If genuine data errors, correct or remove with documentation. If real cases, report regression WITH and WITHOUT for transparency.' },
          ]},

        { type: 'callout', tone: 'success', title: 'When all five assumptions are met',
          body: 'Standard write-up sentence: *"Diagnostic checks confirmed that regression assumptions were met. Residuals were approximately normally distributed (visually inspected via histogram and Normal P-P plot); homoscedasticity was supported by the residuals scatter plot; Durbin-Watson = X.XX indicated independence; variance inflation factors were all below 5, indicating no multicollinearity; no cases exceeded Cook\'s distance of 1, indicating no individually influential outliers."* This one sentence answers the assumption-checking question before it is asked.' },
      ],
    },

    /* ════════════════════ 9. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing diagnostics up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'Where diagnostics belong in your thesis' },

        { type: 'paragraph', text:
          'Diagnostic results typically appear in the methodology chapter (announcing your intention to check) and the results chapter (reporting the outcome). The full plots and detailed values usually go in an Appendix to avoid cluttering Chapter 4.' },

        { type: 'heading', level: 3, text: 'Template — assumptions met' },

        { type: 'apa', text:
          'Before interpreting the regression coefficients, diagnostic checks were conducted to verify model assumptions. Residuals were approximately normally distributed, as confirmed by inspection of the standardised residual histogram and Normal P-P plot. The scatter plot of standardised residuals against standardised predicted values showed an even cloud with no funnel pattern, supporting linearity and homoscedasticity. The Durbin-Watson statistic was [X.XX], within the 1.5-2.5 range indicating independent errors. Variance inflation factors were all below [5/10], indicating no multicollinearity. No cases exceeded a Cook\'s distance of 1.0, suggesting no individually influential outliers. Full diagnostic plots are presented in Appendix [X].' },

        { type: 'heading', level: 3, text: 'Template — one assumption violated' },

        { type: 'apa', text:
          'Diagnostic checks indicated one notable assumption issue. The scatter plot of standardised residuals against standardised predicted values showed a clear funnel pattern, suggesting heteroscedasticity. To address this, the outcome variable [Y] was log-transformed (using natural logarithm) and the regression re-fitted. The transformed model showed a much improved residual pattern with no funnel shape, and other assumptions were satisfied. Coefficients in the final model are interpreted in log units; back-transformations are provided in Appendix [X] for substantive interpretation.' },

        { type: 'reviewerComments',
          items: [
            { q: 'How did you check that your regression assumptions were met?',
              a: 'Five diagnostic checks were performed. (1) Linearity was confirmed via the residuals scatter plot (random cloud, no curve). (2) Independence via Durbin-Watson = 2.04. (3) Homoscedasticity via the residuals scatter plot (even spread). (4) Normality of residuals via histogram (approximately bell-shaped) and Normal P-P plot (points close to the 45° line). (5) Multicollinearity via VIF, all below 2.0. No assumption was substantially violated. Full plots are in Appendix C.' },
            { q: 'Were there any influential outliers?',
              a: 'I computed Cook\'s distance for every case. The maximum value was [X.XX], well below the conventional threshold of 1.0. Examination of standardised residuals showed two cases with |residual| > 2.5 but none above 3.0. Sensitivity analysis re-running the regression without these two cases produced substantively identical results (coefficients within 0.05 SD; no change in significance). I retained all cases in the final model.' },
          ]},
      ],
    },

    /* ════════════════════ 10. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common diagnostic mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Not generating the diagnostic plots',
          body: 'You ran regression with the basic options ticked, got beautiful R² and significant coefficients, and never touched the Plots button. You wrote up the results without diagnostics.',
          fix: 'EVERY regression for thesis work needs Plots ticked: ZRESID vs ZPRED scatter, histogram of residuals, Normal P-P plot. It takes 5 extra seconds. Skipping diagnostics is the most common reviewer comment in postgraduate stats reviews.' },

        { type: 'mistake',
          title: 'Mistake 2 — Checking normality of the raw outcome variable',
          body: 'You ran Shapiro-Wilk on your Y variable, got p = .03, and concluded "my regression violates normality". You panic and abandon the analysis.',
          fix: 'Linear regression assumes normality of RESIDUALS, not raw variables. Even if Y is non-normal, the residuals can still be approximately normal after fitting the model. Always check residuals (using the histogram/P-P plot you ticked under Plots), not raw variables.' },

        { type: 'mistake',
          title: 'Mistake 3 — Dropping outliers to improve results',
          body: 'A case with Cook\'s = 1.3 reduces your effect to non-significance. You delete it. Now your result is significant. You report only the cleaned analysis.',
          fix: 'Never delete cases to improve results — this is data manipulation. The correct approach: report regression WITH and WITHOUT the outlier transparently. If the case is a clear data error, fix or remove with documentation. If it is a real (just rare) case, keeping it tells the more honest story.' },

        { type: 'mistake',
          title: 'Mistake 4 — Reporting "assumptions were met" without showing the work',
          body: 'You write "all regression assumptions were met" but provide no plots, no statistics, no evidence. The examiner cannot verify the claim.',
          fix: 'Either include the diagnostic plots in your write-up or, more commonly, place them in an Appendix and cite it ("Full diagnostic plots are in Appendix C"). Examiners may check the appendix; they almost certainly will if your results look suspicious.' },
      ],
    },

    /* ════════════════════ 11. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Five regression assumptions: linearity, independence of errors, homoscedasticity, normality of residuals, and (for multiple regression) no multicollinearity.',
          'Normality and homoscedasticity assumptions are about the RESIDUALS, not the raw variables.',
          'Generate diagnostics by clicking Plots in the Linear Regression dialog: ZRESID vs ZPRED scatter, histogram of residuals, Normal P-P plot. Also Save → Cook\'s and Standardised residuals. Statistics → Durbin-Watson.',
          'The residuals scatter plot checks BOTH linearity (no curve) AND homoscedasticity (no funnel). A clean random cloud = both met.',
          'Histogram and P-P plot of residuals check normality. Look for approximate bell shape and a 45° P-P line.',
          'Durbin-Watson between 1.5 and 2.5 = independence of errors. Outside this range = autocorrelation worth investigating.',
          'Cook\'s distance > 1.0 OR standardised residuals > |3| identify influential outliers. Investigate, do not delete blindly.',
          'When an assumption is violated: linearity → polynomial or transform X; heteroscedasticity → log Y; non-normality → log Y or accept in large samples; influential outliers → report with and without.',
          'Always write up your diagnostic findings — examiners reward visible methodological care. Put full plots in Appendix; one paragraph summary in Methodology.',
          'Avoid the four mistakes: skipping diagnostics, checking raw Y instead of residuals, dropping outliers for convenience, claiming assumptions met without evidence.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 4: Logistic regression** — the final lesson of this course — we cover the regression method for BINARY outcomes (yes/no, pass/fail, alive/dead). Logistic uses the same Predict-Y-from-X philosophy but adapts the equation to produce probabilities between 0 and 1 rather than continuous predictions.' },

        { type: 'paragraph', text:
          'Before moving on, re-run your multiple regression from Lesson 2 with all the diagnostic options ticked. Look at each plot. Identify any case with high Cook\'s distance. Write a one-paragraph assumption-checking summary. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 12. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'Linear regression assumes that the RESIDUALS are normally distributed. Why not the raw Y variable?',
          choices: [
            'They are the same thing',
            'Because the model fits a line through Y; what matters is whether the ERRORS (deviations from the line) are normal, not the raw Y',
            'Because SPSS prefers it',
            'Because residuals are always normal',
          ],
          answer: 1,
          explanation: 'Linear regression\'s normality assumption is specifically about residuals — the differences between observed Y and predicted Y. Even if your raw Y is non-normal (e.g. positively skewed income), the residuals can be approximately normal after the model is fitted. That is why diagnostics happen AFTER running the regression, examining the residuals output.' },

        { type: 'check',
          question: 'Your residuals scatter plot (ZRESID vs ZPRED) shows a clear FUNNEL widening to the right. What does this mean?',
          choices: [
            'Normality is violated',
            'Heteroscedasticity — the variance of errors is not constant; the assumption of homoscedasticity is violated',
            'Multicollinearity',
            'The sample is too small',
          ],
          answer: 1,
          explanation: 'A funnel shape (wider variance at one end) is the classic visual signature of heteroscedasticity. Common with income, expenditure, sales, or any Y that ranges over orders of magnitude. The standard fix: log-transform Y (Transform → Compute → LN(Y)). Re-run; the residuals plot usually becomes much more even.' },

        { type: 'check',
          question: 'Your Durbin-Watson statistic is 2.05. What does this indicate?',
          choices: [
            'Strong positive autocorrelation',
            'No autocorrelation — independence assumption met',
            'Multicollinearity',
            'Normality violated',
          ],
          answer: 1,
          explanation: 'Durbin-Watson ranges from 0 to 4. Values around 2.0 (typically 1.5-2.5 is acceptable) indicate no autocorrelation — successive residuals are independent of each other. Values < 1.5 suggest positive autocorrelation (errors cluster together, common in time-series); values > 2.5 suggest negative autocorrelation (less common). 2.05 is comfortably in the safe range.' },

        { type: 'check',
          question: 'A case in your dataset has Cook\'s distance = 1.4. What should you do?',
          choices: [
            'Delete it immediately to improve your results',
            'Investigate the case — is it a data-entry error or a genuine rare case? Report regression results WITH and WITHOUT it for transparency.',
            'Ignore Cook\'s distance — it is not important',
            'Run a different statistical test',
          ],
          answer: 1,
          explanation: 'Cook\'s distance > 1.0 indicates an influential outlier — a case that can pull regression coefficients around if removed. The HONEST approach: investigate it. If it is a data-entry error, correct or remove with documentation. If it is a real but rare case, report the regression both ways so the reader can see whether your conclusions depend on that single case. NEVER delete cases just because they hurt your results — that is data manipulation.' },

        { type: 'check',
          question: 'Where should the full diagnostic plots be placed in your thesis?',
          choices: [
            'In the Results chapter, taking up multiple pages',
            'In an Appendix, with a one-sentence summary citing it in Chapter 4',
            'Not included anywhere',
            'On the cover page',
          ],
          answer: 1,
          explanation: 'Full diagnostic plots (histograms, P-P plots, residual scatter plots) belong in an Appendix to avoid cluttering Chapter 4. In the main chapter, include a one-paragraph summary stating that diagnostics were checked, naming the key statistics (Durbin-Watson, VIF, Cook\'s max), and citing "Full diagnostic plots are in Appendix X". This shows methodological care without overwhelming the reader.' },

        { type: 'check',
          question: 'Which assumption should you check BEFORE running the regression (rather than from the output)?',
          choices: [
            'Normality of residuals',
            'Homoscedasticity',
            'Linearity — plot the scatter of X vs Y BEFORE running regression to confirm the relationship looks linear',
            'Durbin-Watson',
          ],
          answer: 2,
          explanation: 'Linearity should be checked BEFORE running regression by plotting the scatter of X vs Y. If the pattern is clearly curved, linear regression is the wrong tool — use polynomial regression or transform the variable. The OTHER assumptions (normality, homoscedasticity, independence, multicollinearity) all use information from the fitted model, so they are checked AFTER running. Linearity is the only pre-flight check.' },
      ],
    },
  ],
};
