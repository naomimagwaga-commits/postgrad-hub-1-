/**
 * Regression Analysis · Lesson 1 — Simple linear regression
 * The natural next step after correlation — moving from "are they related?"
 * to "by how much does Y change when X changes?"
 */

export const SIMPLE_REGRESSION_LESSON = {
  id: 'reg-1',
  title: 'Simple linear regression',
  subtitle: 'Module 03 · Course: Regression Analysis · Lesson 1 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'From "are they related?" to "by how much?"',
      blocks: [
        { type: 'scene', body: [
          'You finished the Correlation Analysis course. You can confidently say: *"Study hours and exam scores correlate at r = .42, p < .001 — a moderate positive relationship."* Your supervisor reads it and asks the next obvious question: **"OK, so for every extra hour of study, how many extra exam marks does a pupil get?"**',
          'Correlation cannot answer that. Correlation tells you that two things move together — it does not tell you the rate of change. Regression does. Regression takes the relationship you discovered with correlation and turns it into an equation: **Exam score = 65.4 + 1.2 × (study hours)**. Now you can predict: a pupil who studies 5 hours per week will score roughly 65.4 + (1.2 × 5) = 71.4 marks.',
          'This lesson teaches you simple linear regression — the foundation of every regression model. Once you can read a single-predictor regression confidently, multiple regression (Lesson 2) and logistic regression (Lesson 4) are just extensions of the same logic.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Explain in plain English** what regression does and how it differs from correlation.',
            '**Recognise when simple linear regression is the right test** (one continuous predictor, one continuous outcome, linear relationship).',
            '**Run simple linear regression in SPSS** via Analyze → Regression → Linear.',
            '**Read every part of the output** — Model Summary (R, R², Adjusted R²), ANOVA (F, p), Coefficients (B, β, t, p, 95% CI).',
            '**Interpret B and β correctly** — the two coefficients students most often confuse.',
            '**Compute predicted values** using the regression equation.',
            '**Write up regression results** following the APA template every examiner expects.',
            '**Defend your model** under examiner questioning about assumptions and limitations.',
          ]},

        { type: 'why', body:
          'Regression is the workhorse of postgraduate quantitative research. Almost every thesis uses it somewhere. The student who understands B vs β, what R² actually means, and how to interpret a coefficient defends with confidence. The student who reports "regression was significant" without explaining the equation gets red ink in the margin.' },
      ],
    },

    /* ════════════════════ 2. THE BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — fitting a line through the cloud',
      blocks: [
        { type: 'heading', level: 2, text: 'From scatter plot to equation' },

        { type: 'paragraph', text:
          'In Lesson 1 of the Correlation course, you learned to look at a scatter plot — a cloud of dots representing pairs of values. Regression takes that scatter plot and draws the BEST POSSIBLE STRAIGHT LINE through the cloud. The line summarises the relationship: as X moves left to right, the line tells you how Y changes on average.' },

        { type: 'analogy', title: 'The line that minimises disappointment',
          body: 'Imagine a teacher trying to predict each pupil\'s exam score using only the number of hours they studied. Any straight line she draws will be wrong for every pupil — some scored better than predicted, some worse. The "best" line is the one where the TOTAL squared disappointment (the sum of squared distances from each point to the line) is as small as possible. That is the line of best fit, and that is exactly what regression computes for you.' },

        { type: 'illustration', component: 'MachakosRegScatterLine',
          caption: 'Figure 1. The line of best fit (gold) and the residuals (red dashed). Each red line is the distance from one pupil\'s actual score to the prediction the line would make. Regression finds the line that MINIMISES the sum of the SQUARED residuals — the "least squares" line.' },

        { type: 'definition', term: 'Simple linear regression',
          body: 'A statistical method for modelling the linear relationship between ONE predictor variable (X, also called the independent variable or IV) and ONE continuous outcome variable (Y, also called the dependent variable or DV). The output is an equation of the form **Y = a + bX**, where a is the intercept and b is the slope.' },

        { type: 'definition', term: 'Residual',
          body: 'The difference between an actual value of Y and the value the regression line predicts for that case. Residual = observed Y − predicted Y. Positive residuals sit ABOVE the line; negative residuals sit BELOW. The line of best fit is the one that makes the squared residuals add up to the smallest possible total.' },

        { type: 'heading', level: 3, text: 'The regression equation in plain English' },

        { type: 'paragraph', text:
          'A simple regression produces a tiny equation with just two numbers: an INTERCEPT (where the line crosses the Y axis when X = 0) and a SLOPE (how much Y changes for every one-unit change in X).' },

        { type: 'comparison',
          headers: ['Symbol', 'Name', 'Plain-English meaning'],
          rows: [
            ['**Y**',  'Predicted outcome',  'The value of the outcome variable we are estimating.'],
            ['**a**',  'Intercept (Constant)', 'The predicted Y when X = 0. Where the line crosses the Y axis.'],
            ['**b**',  'Slope (Unstandardized B)', 'How much Y changes for every ONE-UNIT increase in X — in the original units.'],
            ['**X**',  'Predictor value',    'The value of the predictor variable for the case you are predicting.'],
          ]},

        { type: 'reveal',
          prompt: 'A regression of exam score on study hours produces the equation: **score = 65.4 + 1.2 × (hours)**. What does the 1.2 mean in plain English?',
          answer: '**For every extra hour of study per week, the model predicts the exam score will increase by 1.2 marks, on average.** That is what the slope (b coefficient) tells you. It is in the original units (marks per hour). So a pupil who studies 5 hours scores 65.4 + (1.2 × 5) = 71.4 on average; a pupil who studies 10 hours scores 65.4 + (1.2 × 10) = 77.4. The slope IS the rate of change.' },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When simple linear regression is the right test',
      blocks: [
        { type: 'heading', level: 2, text: 'The four conditions to check' },

        { type: 'paragraph', text:
          'Simple linear regression is appropriate when you have ONE predictor, ONE continuous outcome, and the relationship is roughly linear. Like Pearson, it has assumptions that should hold for the results to be trustworthy.' },

        { type: 'steps', steps: [
          { title: 'The OUTCOME is continuous',
            body: 'Y must be a continuous Scale variable — age, income, exam score, weight. If Y is binary (yes/no, pass/fail), you need LOGISTIC regression (Lesson 4). If Y is ordinal (5-point satisfaction), the situation is more complex — ordinal regression is the strict answer, though many researchers use linear regression with caveats.' },
          { title: 'The PREDICTOR can be continuous OR dichotomous',
            body: 'X can be continuous (study hours, age) or a binary dummy variable (gender coded 0/1). It can NOT be a multi-category nominal variable like county — for that, you would either dummy-code it into multiple binary indicators OR run ANOVA.' },
          { title: 'The relationship is approximately LINEAR',
            body: 'The line of best fit assumes the relationship is straight. If your scatter plot shows a clear curve (U-shape, exponential), simple linear regression will be biased. Plot the scatter first; if you see a curve, you need polynomial regression or a transformation.' },
          { title: 'The residuals are approximately NORMAL with constant variance',
            body: 'After you fit the line, the residuals (errors) should be roughly normally distributed and have constant spread across all predicted values. We will check this properly in Lesson 3 (Assumptions & Diagnostics).' },
        ]},

        { type: 'comparison',
          headers: ['Situation', 'Right test', 'Why'],
          rows: [
            ['1 continuous predictor → 1 continuous outcome',     'Simple linear regression',     'Standard use case.'],
            ['2+ continuous predictors → 1 continuous outcome',   'Multiple regression (Lesson 2)', 'Same logic, more predictors.'],
            ['1 binary predictor → 1 continuous outcome',         'Simple linear regression (dummy-coded) OR independent t-test', 'Mathematically equivalent.'],
            ['1 categorical predictor (3+ groups) → 1 continuous outcome', 'One-way ANOVA',     'Compares means across groups.'],
            ['Predictors → 1 binary outcome (yes/no)',            'Logistic regression (Lesson 4)', 'Outcome is binary, not continuous.'],
            ['Curved relationship',                               'Polynomial regression',         'Linear assumption violated.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Regression does NOT prove causation',
          body: 'Even when you fit a beautiful regression with X predicting Y, you have NOT proven that X causes Y. The same correlation-is-not-causation rule from Pearson applies here. Regression establishes a predictive relationship; only experimental design with random assignment can establish causation. Always use language like "predicts", "is associated with", or "accounts for variance in" — reserve "causes" for experimental studies.' },
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running simple linear regression in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'The 6-step click path' },

        { type: 'steps', steps: [
          { title: 'Plot the scatter plot FIRST',
            body: 'Graphs → Chart Builder → Scatter/Dot → Simple Scatter. Drag the predictor (X) onto the X-axis and the outcome (Y) onto the Y-axis. Confirm the pattern looks linear. If it curves, do not proceed with linear regression.' },
          { title: 'Open the Linear Regression dialog',
            body: 'Analyze → Regression → Linear. A dialog opens with two main boxes: Dependent (the outcome Y) and Independent(s) (the predictor X).' },
          { title: 'Move your variables',
            body: 'Click your outcome variable → arrow to Dependent. Click your predictor → arrow to Independent(s).' },
          { title: 'Leave Method as "Enter"',
            body: '"Enter" simply means SPSS includes the predictor as-is. We will discuss other methods (Stepwise, Hierarchical) in Lessons 2-3.' },
          { title: 'Click Statistics for diagnostics',
            body: 'In the Statistics dialog, tick **Estimates**, **Confidence intervals (95%)**, **Model fit**, and **Descriptives**. Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces several tables in the Output Viewer: Descriptives, Correlations, Model Summary, ANOVA, and Coefficients. The last three are the key ones.' },
        ]},


        { type: 'illustration', component: 'MachakosRegMenu',
          caption: 'Figure 2a. The menu path to Linear Regression: Analyze → Regression → Linear. Note the submenu also contains Binary Logistic, Multinomial Logistic, and Ordinal — you\'ll use these in later lessons for different DV types.' },

        { type: 'illustration', component: 'MachakosSrNumberedClicks',
          caption: 'Figure 2. The full 6-click sequence for simple regression. Red numbered circles show each click in order: (1) Analyze → Regression → Linear from the menu, (2) move DV to Dependent, (3) move IV to Independent(s), (4) Method = Enter (default), (5) optional Statistics click for 95% CIs, (6) click OK. About 30 seconds total.' },

        { type: 'illustration', component: 'MachakosRegSimpleDialog',
          caption: 'Figure 2. The Linear Regression dialog set up for a SIMPLE regression — one DV (Math_KCSE_Mean) in the Dependent box, one IV (Digital_Devices) in the Independent(s) box, Method = Enter. Same dialog does multiple regression by adding more variables.' },
      ],
    },

    /* ════════════════════ 5. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the three key output tables',
      blocks: [
        { type: 'heading', level: 2, text: 'Model Summary, ANOVA, Coefficients — in order' },

        { type: 'paragraph', text:
          'SPSS produces three tables that work together to tell the regression story. Read them in this order: Model Summary (how well the model fits), ANOVA (is the overall model significant?), Coefficients (what are the exact regression equation values?).' },

        { type: 'illustration', component: 'MachakosRegSimpleOutput',
          caption: 'Figure 3. Simple regression output for Machakos. Model Summary: R = .478, R² = .228 (Digital_Devices explains 22.8% of KCSE variance). ANOVA: F(1, 265) = 78.14, p < .001 (model is significant). Coefficients: β = .478, unstandardized B = .566, t = 8.84, p < .001. Regression equation: Math_KCSE_Mean = 3.93 + 0.57 × Digital_Devices.' },

        { type: 'heading', level: 3, text: 'Table 1 — Model Summary' },

        { type: 'comparison',
          headers: ['Statistic', 'What it shows', 'Rule of thumb'],
          rows: [
            ['**R**',                'The correlation between X and Y. For simple regression, R = |Pearson r|.',           'Same Cohen benchmarks as r: .10 small, .30 medium, .50 large.'],
            ['**R²**',                'The proportion of variance in Y explained by X. Always between 0 and 1.',             'Multiply by 100 to get a percentage. R² = .25 means "X explains 25% of variance in Y."'],
            ['**Adjusted R²**',       'R² penalised slightly for sample size and number of predictors.',                     'For simple regression with 1 predictor, very close to R². Becomes more important with multiple predictors (Lesson 2).'],
            ['**Std. Error of Estimate**', 'The average size of the residuals — typical distance between actual and predicted Y values.', 'In the original units of Y. Smaller = better-fitting model.'],
          ]},

        { type: 'heading', level: 3, text: 'Table 2 — ANOVA (the model significance test)' },

        { type: 'paragraph', text:
          'The ANOVA table answers a single question: **is the regression model significantly better than just predicting the mean of Y for every case?** If yes (p < .05), the model has explanatory power. If no, the model is no better than a flat horizontal line at the mean.' },

        { type: 'list', items: [
          '**F-statistic** — the ratio of variance explained by the regression to variance left unexplained (residual). Bigger F = better model.',
          '**Sig.** — the p-value for the F-test. If p < .05, the model is significant overall.',
          '**df (Regression)** = number of predictors (= 1 for simple regression).',
          '**df (Residual)** = N − number of predictors − 1.',
        ]},

        { type: 'heading', level: 3, text: 'Table 3 — Coefficients (the equation itself)' },

        { type: 'paragraph', text:
          'The Coefficients table is where the actual regression equation lives. It usually has two rows: one for the Constant (the intercept a) and one for each predictor (the slope b).' },

        { type: 'comparison',
          headers: ['Column', 'What it shows', 'How to interpret'],
          rows: [
            ['**B (Unstandardized)**',     'The slope in ORIGINAL units. For every 1-unit increase in X, Y changes by B units.', 'This is the b in your regression equation. Use it for the equation Y = a + bX.'],
            ['**Std. Error of B**',         'The standard error of the slope estimate — uncertainty around B.',                  'Smaller = more precise estimate.'],
            ['**β (Beta — Standardized)**', 'The slope in STANDARDISED units (standard deviations).',                            'Compares predictors on equal footing — only really useful in multiple regression. For simple regression, β = Pearson r.'],
            ['**t**',                       'The test statistic for whether B is significantly different from 0.',               'Bigger absolute t = stronger evidence the predictor matters.'],
            ['**Sig.**',                    'The p-value for the t-test.',                                                        'If p < .05, the predictor is statistically significant.'],
            ['**95% Confidence Interval**', 'The range we are 95% confident the TRUE slope lies within.',                          'If the interval excludes 0, the slope is significant. Always report this.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'The most-confused pair — B vs β',
          body: '**B (Unstandardized)** is in the ORIGINAL units of your variables. *"For every extra hour of study, score increases by 1.2 marks."* That uses B = 1.2. **β (Standardised Beta)** is in STANDARD DEVIATIONS. *"For every one SD increase in study hours, score increases by 0.31 SD."* That uses β = .31. **Both report the slope — but B is intuitive in your original units; β is useful for comparing the relative importance of different predictors in a multiple regression.** For simple regression with one predictor, the standardised β EQUALS the Pearson correlation r.' },

        { type: 'reveal',
          prompt: 'Your output shows: R² = .18, F(1, 116) = 25.4, p < .001. The Coefficients table shows: Constant = 65.4, study_hrs B = 1.2, β = .42, p < .001. What is the regression equation, and how do you interpret it?',
          answer: 'The equation is: **exam_score = 65.4 + 1.2 × (study_hrs)**.\n\n**Interpretation:** Study hours significantly predict exam score, R² = .18, F(1, 116) = 25.4, p < .001. The model explains 18% of variance in exam scores. For every extra hour of weekly study, the model predicts an increase of 1.2 marks (B = 1.2, p < .001). The standardised β of .42 indicates a moderate-strength predictor. A pupil who studies 0 hours is predicted to score 65.4; a pupil who studies 10 hours is predicted to score 65.4 + 12 = 77.4.\n\nNote: R² = .18 means 82% of the variation in exam scores is still UNEXPLAINED by study hours alone — other factors (motivation, prior preparation, teaching quality) matter too.' },
      ],
    },

    /* ════════════════════ 6. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — predicting exam scores from study hours',
      blocks: [
        { type: 'workedExample', title: 'A Master of Education study at UoN',
          body: [
            { label: 'The research question',
              text: 'Does the number of hours pupils study per week predict their end-of-term mathematics score? If so, by how much?' },
            { label: 'The data',
              text: 'n = 118 Form 3 pupils across 3 secondary schools. Variables: **study_hrs** (continuous, 0-25), **math_score** (continuous, 0-100).' },
            { label: 'Step 1 — Plot first',
              text: 'Scatter plot shows an upward cloud of points with reasonable linearity and no extreme outliers. Linear regression is appropriate.' },
            { label: 'Step 2 — Run the regression',
              text: 'Analyze → Regression → Linear → math_score to Dependent, study_hrs to Independent(s) → Statistics: tick Estimates, 95% CI, Model fit → OK.' },
            { label: 'Step 3 — Read the Model Summary',
              text: 'R = .424, R² = .180, Adjusted R² = .173, Std. Error of Estimate = 11.42. Interpretation: study hours and exam scores are moderately correlated (R = .42); study hours explains 18% of the variance in scores; typical prediction error is about 11 marks.' },
            { label: 'Step 4 — Read the ANOVA',
              text: 'F(1, 116) = 25.4, p < .001. The model is highly significant — far better than predicting the mean for everyone.' },
            { label: 'Step 5 — Read the Coefficients',
              text: '(Constant) B = 65.40, p < .001, 95% CI [60.7, 70.1]. study_hrs B = 1.18, β = .42, p < .001, 95% CI [0.72, 1.64]. Interpretation: a pupil who studies 0 hours is predicted to score 65.4 marks. Each extra hour of study adds 1.18 marks on average.' },
            { label: 'Step 6 — Compute a prediction',
              text: 'For a pupil who studies 7 hours per week: predicted score = 65.40 + 1.18 × 7 = 65.40 + 8.26 = **73.66 marks**. Of course, the typical prediction error is about 11 marks (the Std. Error of Estimate), so the actual score could easily be anywhere from 62 to 85.' },
            { label: 'Step 7 — APA write-up',
              text: '*"A simple linear regression was conducted to examine the extent to which weekly study hours predict end-of-term mathematics scores. The model was statistically significant, F(1, 116) = 25.4, p < .001, with study hours explaining 18% of the variance in exam scores (R² = .18). Each additional hour of weekly study was associated with a 1.18-point increase in exam score (B = 1.18, 95% CI [0.72, 1.64], β = .42, p < .001). The regression equation was: predicted exam score = 65.4 + 1.18 × (weekly study hours). The standard error of estimate was 11.4 marks, indicating substantial unexplained variance — study hours alone does not predict exam performance precisely, and other factors likely play a role."*' },
          ]},
      ],
    },

    /* ════════════════════ 7. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing simple regression up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A simple linear regression was conducted to examine the extent to which [PREDICTOR] predicted [OUTCOME] among [N] [respondents]. The model was [significant/non-significant], F([df1], [df2]) = [F-value], p = [p-value], with [PREDICTOR] explaining [XX]% of the variance in [OUTCOME] (R² = [.XX]). Each one-unit increase in [PREDICTOR] was associated with a [B]-unit [increase/decrease] in [OUTCOME] (B = [X.XX], 95% CI [LL, UL], β = [.XX], p = [.XXX]). The regression equation was: predicted [OUTCOME] = [intercept] + [B] × ([PREDICTOR]).' },

        { type: 'callout', tone: 'success', title: 'The five numbers every regression sentence must include',
          body: '**F-value with df** (model significance) · **R²** (variance explained) · **B with 95% CI** (slope in original units) · **β** (standardised slope) · **p-value**. Missing any of these and the examiner will ask. Include all five and the question is closed.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why did you report both B and β?',
              a: 'B is the slope in the original units of the variables — it directly gives the regression equation and allows me to compute predicted values. β (standardised) reports the slope in standard deviation units, which becomes meaningful in multiple regression for comparing predictors on equal footing. Including both gives the reader the full picture.' },
            { q: 'Why is your R² only .18 when the relationship is "significant"?',
              a: 'Statistical significance and practical importance are different things. With n = 118 the relationship is detectable as non-zero (significant), but the predictor explains only 18% of the variance — meaning 82% of variation in the outcome is driven by factors NOT in this model. I report this honestly in the write-up and discuss likely unmeasured contributors in the Discussion chapter.' },
            { q: 'Did you check the regression assumptions?',
              a: 'Yes. Before fitting the model I plotted the scatter plot and confirmed approximate linearity with no extreme outliers. After fitting I examined the residuals plot for homoscedasticity, the histogram and P-P plot of residuals for normality, and checked the Durbin-Watson statistic for independence (DW = [X.XX], within the 1.5-2.5 acceptable range). Full diagnostics are reported in Appendix C.' },
          ]},
      ],
    },

    /* ════════════════════ 8. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common simple regression mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Confusing B and β in the interpretation',
          body: 'You write "for every standard deviation increase in study hours, the score increases by 1.2 marks". But 1.2 was the B value (in original units), not β. You have crossed wires.',
          fix: 'B uses ORIGINAL units (marks per hour). β uses STANDARD DEVIATIONS (SD of Y per SD of X). Get the units right in your interpretation, every time. For simple regression, β = Pearson r — a useful sanity check.' },

        { type: 'mistake',
          title: 'Mistake 2 — Treating "significant" as proof the model is good',
          body: 'Your model has R² = .03 (3% variance explained) but the F-test is significant (p = .04) because n = 500. You report "the model significantly predicts Y".',
          fix: 'Significance and effect size are different. With huge samples, almost any non-zero R² will reach significance. Always report R² alongside significance and discuss whether the variance explained is PRACTICALLY meaningful. R² = .03 is statistically significant but explains essentially nothing.' },

        { type: 'mistake',
          title: 'Mistake 3 — Reporting "regression" without giving the equation',
          body: 'Your Chapter 4 says "the regression was significant" without quoting the actual equation. The reader cannot compute predictions or assess the practical magnitude.',
          fix: 'Always include the regression equation in your write-up: *"predicted Y = a + b × X"* with actual numbers filled in. The equation is the regression — without it the analysis is incomplete.' },

        { type: 'mistake',
          title: 'Mistake 4 — Making claims about causation',
          body: 'You write "study hours CAUSE higher exam scores, B = 1.18". Regression is a predictive model on correlational data; it does not establish causation.',
          fix: 'Use predictive language: "predicts", "is associated with", "accounts for variance in". Reserve "causes" for experimental studies with random assignment. Examiners hunt for unwarranted causal claims.' },
      ],
    },

    /* ════════════════════ 9. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Simple linear regression models the linear relationship between ONE continuous predictor and ONE continuous outcome, producing an equation: Y = a + bX.',
          'The line of best fit minimises the sum of squared RESIDUALS (the vertical distances from each point to the line).',
          'Assumptions: outcome is continuous, predictor is continuous or dichotomous, relationship is linear, residuals are roughly normal with constant variance.',
          'Run via Analyze → Regression → Linear. Tick Estimates, 95% CI, Model fit, and Descriptives under Statistics.',
          'Read three output tables in order: Model Summary (R², Adjusted R²), ANOVA (F, p), Coefficients (B, β, t, p, CI).',
          'B is the slope in ORIGINAL units; β (standardised) is the slope in standard deviations. For simple regression, β equals Pearson r.',
          'R² × 100 = percentage of variance in the outcome explained by the predictor.',
          'Always include the regression equation, F-test, R², B with 95% CI, β, and p-value in your write-up.',
          'Regression establishes a PREDICTIVE relationship, NOT causation. Use cautious language.',
          'Avoid the four mistakes: confusing B and β, treating significance as quality, omitting the equation, claiming causation.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 2: Multiple regression** we extend simple regression to TWO OR MORE predictors. You learn how to fit a model where multiple variables predict an outcome together, how to interpret standardised vs unstandardised coefficients when comparing predictors, and how multicollinearity (predictors overlapping with each other) can confuse the picture. Then Lesson 3 covers diagnostics — checking that the assumptions actually hold. Lesson 4 closes the course with logistic regression for binary outcomes.' },

        { type: 'paragraph', text:
          'Before moving on, take a pair of continuous variables from your dataset where you suspect one predicts the other. Plot the scatter, confirm linearity, then run simple linear regression. Write the regression equation using your output. Compute a predicted Y for an X value of interest. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 10. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'What is the main difference between correlation and regression?',
          choices: [
            'They are exactly the same',
            'Correlation tells you that two variables move together; regression gives you an equation that lets you PREDICT one variable from the other',
            'Correlation is for nominal data, regression for continuous',
            'Regression always uses more variables',
          ],
          answer: 1,
          explanation: 'Correlation summarises the strength and direction of the relationship in a single number (r). Regression goes a step further: it produces an EQUATION you can use to predict Y from X, including the rate of change (slope) and the starting value (intercept). Both apply to continuous variables; correlation is symmetric (X-Y same as Y-X), while regression is directional (predicting Y from X).' },

        { type: 'check',
          question: 'Your regression equation is exam_score = 65.4 + 1.2 × (study_hrs). What does the 1.2 mean?',
          choices: [
            'Each pupil scored 1.2 marks on the exam',
            'The model explains 1.2% of the variance',
            'For every extra hour of weekly study, the predicted exam score increases by 1.2 marks',
            'Pupils studied 1.2 hours on average',
          ],
          answer: 2,
          explanation: 'The 1.2 is the slope (B, unstandardised). For every 1-unit increase in X (one extra hour of study), Y (exam score) increases by B units (1.2 marks). This is the rate of change in the original units. A pupil studying 5 hours scores 65.4 + 1.2 × 5 = 71.4 on average.' },

        { type: 'check',
          question: 'You see R² = .25 in your Model Summary. What does this mean?',
          choices: [
            'The correlation is .25',
            '25% of the variance in the outcome is explained by the predictor; 75% is unexplained',
            'The model is significant',
            'The slope is .25',
          ],
          answer: 1,
          explanation: 'R² (the coefficient of determination) tells you the proportion of variance in Y explained by your regression model. R² = .25 means 25% of variance is explained — leaving 75% unexplained, attributable to factors NOT in your model. R is the correlation (square root of R²); for simple regression, R = |Pearson r| = .50.' },

        { type: 'check',
          question: 'For simple regression with ONE predictor, what does the standardised β equal?',
          choices: [
            'Always zero',
            'The Pearson correlation r between the predictor and the outcome',
            'The unstandardised B',
            'The R²',
          ],
          answer: 1,
          explanation: 'For simple linear regression with one predictor, the standardised β coefficient equals the Pearson correlation r between X and Y. So if r = .42, then β = .42. This is a useful sanity check — they should match exactly in simple regression. (For multiple regression, β differs from r because it accounts for other predictors in the model.)' },

        { type: 'check',
          question: 'You ran a regression and got R² = .04, F(1, 998) = 41.6, p < .001. What is the most honest interpretation?',
          choices: [
            'The model is great — highly significant!',
            'The model is statistically significant due to the large sample (n = 1000), but explains only 4% of variance — practically very weak',
            'The model is wrong',
            'You need to drop the predictor',
          ],
          answer: 1,
          explanation: 'With a large sample (here n = 1000), even tiny effects become statistically significant. R² = .04 means the predictor explains only 4% of variance — practically very weak, even though p < .001. Always report and discuss BOTH significance AND effect size. A statistically significant but practically tiny finding deserves an honest "this is significant but small" interpretation.' },

        { type: 'check',
          question: 'Which sentence is most appropriate for a regression result?',
          choices: [
            '"Study hours caused higher exam scores."',
            '"Weekly study hours significantly predicted exam scores, B = 1.18, β = .42, p < .001, with R² = .18 indicating the model explained 18% of variance."',
            '"There was a relationship."',
            '"Regression was significant."',
          ],
          answer: 1,
          explanation: 'Option B hits all the elements: names the test (regression), reports B with units interpretation, reports β for standardised effect size, gives p-value, and notes R² with its variance interpretation. Crucially uses "predicted" not "caused" — regression is predictive, not causal. The other options either claim causation (A), are vague (C, D), or omit critical numbers.' },
      ],
    },
  ],
};
