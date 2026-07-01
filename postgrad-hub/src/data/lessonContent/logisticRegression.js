/**
 * Regression Analysis · Lesson 4 — Logistic Regression
 * For binary (yes/no) outcomes. Closes the Regression course.
 */

export const LOGISTIC_REGRESSION_LESSON = {
  id: 'reg-4',
  title: 'Logistic regression',
  subtitle: 'Module 03 · Course: Regression Analysis · Lesson 4 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When your outcome is yes/no, pass/fail, alive/dead',
      blocks: [
        { type: 'scene', body: [
          'Lessons 1-3 covered linear regression — for continuous outcomes like exam scores or income. But many thesis questions have BINARY outcomes: did the pupil pass or fail? Did the customer buy or not? Did the patient recover or die? Did the small business survive its first 3 years or shut down? For these binary outcomes, linear regression is the WRONG tool. Predicting a 0-or-1 outcome with a straight line produces nonsensical predictions like "the probability of passing is 1.4" or "−0.3".',
          'The right tool is **logistic regression** — a regression variant designed for binary outcomes. Instead of predicting Y itself, logistic regression predicts the PROBABILITY that Y = 1. The output is always between 0 and 1, no matter the predictor values. The mathematics involve a special S-shaped curve called the logistic function, but the workflow in SPSS is almost identical to linear regression.',
          'This final lesson of the Regression Analysis course teaches you to run logistic regression in SPSS, interpret its unique output (especially the odds ratio Exp(B), which most beginners find confusing at first), check the model\'s goodness-of-fit, and write up the results in publishable form.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Recognise binary outcomes** and know to switch from linear to logistic regression.',
            '**Run logistic regression in SPSS** via Analyze → Regression → Binary Logistic.',
            '**Read the four key output tables** — Hosmer-Lemeshow, Model Summary, Classification Table, Variables in the Equation.',
            '**Interpret Exp(B) — the odds ratio** — the single most-confusing number in logistic regression, demystified.',
            '**Compute predicted probabilities** for specific cases from the logistic equation.',
            '**Distinguish significance from practical effect** in logistic regression using odds ratios.',
            '**Write up logistic results** following the APA template with all the numbers examiners expect.',
            '**Avoid the four mistakes** that derail logistic regression in theses.',
          ]},

        { type: 'why', body:
          'Binary outcomes appear in almost every discipline — pass/fail in education, buy/no-buy in marketing, recovered/not in health, default/no-default in finance, vote/abstain in political science. Knowing logistic regression dramatically expands the questions your thesis can answer. And once you have linear regression in your toolkit (Lessons 1-3), logistic is a natural extension.' },
      ],
    },

    /* ════════════════════ 2. WHEN TO USE ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When logistic regression is the right tool',
      blocks: [
        { type: 'heading', level: 2, text: 'A binary outcome — the single qualifying condition' },

        { type: 'paragraph', text:
          'The defining feature of logistic regression is the OUTCOME variable: it must be binary (exactly 2 categories). The PREDICTORS can be anything — continuous, ordinal, categorical, or a mix. The decision is purely about Y.' },

        { type: 'comparison',
          headers: ['Outcome variable', 'Right test', 'Why'],
          rows: [
            ['Exam score (0-100)',                    'Linear regression',     'Continuous outcome.'],
            ['Income in KSh',                          'Linear regression',     'Continuous outcome.'],
            ['Pass / fail (1/0)',                      '**Logistic regression**', 'Binary outcome.'],
            ['Bought product / did not (1/0)',         '**Logistic regression**', 'Binary outcome.'],
            ['Treatment group / control (1/0)',         '**Logistic regression**', 'Binary outcome.'],
            ['Form 1/2/3/4 (4 ordered groups)',        'Ordinal logistic regression', 'Ordinal multi-category — beyond this lesson.'],
            ['County of residence (47 unordered)',     'Multinomial logistic regression', 'Multi-category nominal — beyond this lesson.'],
          ]},

        { type: 'callout', tone: 'info', title: 'Coding the binary outcome',
          body: 'Standard convention: code the outcome as **1 = the event of interest** ("the thing you want to predict") and **0 = the absence of the event**. So for "passed exam": 1 = passed, 0 = failed. For "purchased product": 1 = bought, 0 = did not buy. SPSS treats 1 as the "event" and the model predicts the probability of that 1. Reverse coding (1 = failed, 0 = passed) does not break the math but makes the interpretation backwards — stick to the convention.' },
      ],
    },

    /* ════════════════════ 3. THE BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — predict a probability, not a value',
      blocks: [
        { type: 'heading', level: 2, text: 'Why a straight line does not work for 0/1 outcomes' },

        { type: 'paragraph', text:
          'Imagine you tried to fit a straight line through data where Y is 0 or 1. The line could predict Y = 1.4 for some pupils (above 100% probability) or Y = −0.2 for others (below 0% probability). Both are nonsensical for binary outcomes. You need a function that ALWAYS produces values between 0 and 1.' },

        { type: 'illustration', component: 'LogisticCurve',
          caption: 'Figure 1. The logistic (S-shaped) curve. Predicted probability is always between 0 and 1. As the predictor X increases, P(Y=1) approaches 1 smoothly; as X decreases, P(Y=1) approaches 0. The threshold for classification is conventionally .50: if predicted P ≥ .50, classify as Y = 1 (event); if P < .50, classify as Y = 0.' },

        { type: 'definition', term: 'Logistic regression',
          body: 'A regression method that models the PROBABILITY of a binary outcome Y as an S-shaped function of one or more predictors. The output is a predicted probability between 0 and 1. The mathematics involves the "logit" — the log of the odds of Y = 1 — which transforms the bounded probability into an unbounded value that can be modelled with a linear combination of predictors.' },

        { type: 'definition', term: 'Odds (and odds ratio)',
          body: 'The **odds** of an event are the ratio of the probability of the event to the probability of NOT the event: Odds = P / (1 − P). If P = .75, Odds = .75 / .25 = 3 (i.e. "3 to 1"). The **odds ratio (Exp(B) in SPSS)** is how many times higher the odds become for every one-unit increase in the predictor. Odds ratio = 2 means the odds DOUBLE for every unit increase. Odds ratio = 0.5 means the odds HALVE.' },

        { type: 'callout', tone: 'gold', title: 'In one sentence',
          body: '**Linear regression predicts a continuous value of Y. Logistic regression predicts a probability between 0 and 1. The interpretation focus shifts from "by how many units does Y change?" to "by what FACTOR do the ODDS change?".**' },

        { type: 'reveal',
          prompt: 'The odds of a pupil passing the exam are 4 (i.e. 4 to 1 in favour of passing). What does this mean for the probability?',
          answer: '**Probability = 4 / (1 + 4) = 4/5 = 0.80, or 80%.** Odds and probability are related but different: Odds = P / (1 − P), and P = Odds / (1 + Odds). Odds of 1 = 50% probability. Odds of 4 = 80% probability. Odds of 0.5 = 33% probability. Logistic regression coefficients are most easily interpreted using odds ratios (Exp(B)), but you can always convert to probabilities for a concrete example.' },
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running logistic regression in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'A separate menu from Linear Regression' },

        { type: 'paragraph', text:
          'Logistic regression has its own menu in SPSS — Analyze → Regression → Binary Logistic. The dialog is similar to linear regression but with a few important differences.' },

        { type: 'steps', steps: [
          { title: 'Open the dialog',
            body: 'Analyze → Regression → Binary Logistic.' },
          { title: 'Move your binary outcome to Dependent',
            body: 'Your outcome (e.g. passed_exam, coded 0/1) goes in the Dependent box. SPSS will use the higher value (1) as the "event" by default.' },
          { title: 'Move predictors to Covariates',
            body: 'NOTE: in logistic regression they are called "Covariates" not "Independents". Move continuous and binary predictors here as you would for linear regression.' },
          { title: 'Identify any categorical predictors',
            body: 'If you have a CATEGORICAL predictor with more than 2 levels (e.g. county with 3 categories), click **Categorical…** Move the categorical variable to the right; SPSS will automatically create dummy codes for you. Pick a Reference Category (usually First or Last). Click Continue.' },
          { title: 'Leave Method as "Enter"',
            body: 'Same as linear — use Enter unless you have a specific reason for hierarchical blocks. Avoid Stepwise/Forward/Backward for the same reasons as linear regression.' },
          { title: 'Click Options for the essentials',
            body: 'Tick **Classification plots**, **Hosmer-Lemeshow goodness-of-fit**, **CI for exp(B)** (set at 95%). Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces several output tables. The key ones: Hosmer-Lemeshow test (model fit), Model Summary (-2 log likelihood, Cox & Snell R², Nagelkerke R²), Classification Table (predictive accuracy), and **Variables in the Equation** (B coefficients with Exp(B) odds ratios).' },
        ]},
      ],
    },

    /* ════════════════════ 5. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading logistic regression output',
      blocks: [
        { type: 'heading', level: 2, text: 'Four tables that matter — in order' },

        { type: 'heading', level: 3, text: 'Table 1 — Omnibus Tests of Model Coefficients' },

        { type: 'paragraph', text:
          'The Omnibus Tests table is the logistic equivalent of the F-test in linear regression — it answers: **is the model significantly better than predicting the majority class for everyone?** Look at the chi-square (χ²) for "Model" and its Sig. value. If Sig. < .05, the model is significant overall.' },

        { type: 'heading', level: 3, text: 'Table 2 — Hosmer-Lemeshow Test (goodness of fit)' },

        { type: 'paragraph', text:
          'This test compares predicted probabilities to actual outcomes in groups (deciles by default). Counter-intuitively, you WANT this test to be **non-significant** (p > .05). A non-significant Hosmer-Lemeshow means: the predicted probabilities match the actual outcomes well — your model fits the data adequately.' },

        { type: 'callout', tone: 'warning', title: 'The "weird" significance direction',
          body: 'Most statistical tests want SIGNIFICANCE (p < .05). Hosmer-Lemeshow is the opposite: you want NON-significance (p > .05) because the null hypothesis is "the model fits well". A significant Hosmer-Lemeshow (p < .05) means your model does NOT fit well — bad news. A non-significant Hosmer-Lemeshow (p > .05) means fit is acceptable — good news. Get this direction right or your interpretation will be backwards.' },

        { type: 'heading', level: 3, text: 'Table 3 — Model Summary' },

        { type: 'comparison',
          headers: ['Statistic', 'What it shows', 'How to interpret'],
          rows: [
            ['**−2 Log likelihood**',  'Smaller = better fit. By itself just a number; useful for comparing models.', 'Lower is better.'],
            ['**Cox & Snell R²**',     'A pseudo-R² analogous to linear regression\'s R². Capped below 1.',           '"Pseudo" because logistic does not have a true R². Use as rough indicator only.'],
            ['**Nagelkerke R²**',      'Adjusted version of Cox & Snell that can reach 1.0.',                          'More common in publications. Treat as approximate variance explained.'],
          ]},

        { type: 'heading', level: 3, text: 'Table 4 — Classification Table' },

        { type: 'paragraph', text:
          'The Classification Table shows how often the model\'s predictions match the actual outcomes. It uses a default 0.50 probability threshold: if predicted P ≥ .50, classify as event. The table shows overall predictive accuracy plus accuracy for each class separately.' },

        { type: 'callout', tone: 'info', title: 'A worked example',
          body: [
            'Suppose 100 pupils sat the exam: 60 passed, 40 failed. Your logistic model classifies 70 of the 100 correctly. Overall accuracy = 70%. But look DEEPER: of the 60 actual passes, your model correctly predicted 55 (sensitivity = 91.7%). Of the 40 actual failures, your model correctly predicted 15 (specificity = 37.5%). The model is good at spotting pass but poor at spotting fail. The reverse pattern is common when the two classes are imbalanced.',
            'Compare the overall accuracy to the baseline of predicting the majority class for everyone. If you just predicted "everyone passes", you would get 60% right. Your 70% model is doing better, but only marginally.',
          ]},

        { type: 'heading', level: 3, text: 'Table 5 — Variables in the Equation (THE main table)' },

        { type: 'paragraph', text:
          'This is the most important table — the logistic equivalent of the Coefficients table in linear regression. It shows each predictor\'s coefficient and (critically) the **Exp(B)** odds ratio.' },

        { type: 'comparison',
          headers: ['Column', 'What it shows', 'How to interpret'],
          rows: [
            ['**B**',          'The logistic regression coefficient in LOG-ODDS units.',                              'Hard to interpret directly. Sign tells direction (positive = predictor increases odds of event).'],
            ['**S.E.**',       'Standard error of B.',                                                                'Used to compute the Wald test.'],
            ['**Wald**',       'The chi-square test for whether B differs from zero. Equivalent to t² in linear regression.', 'Bigger = stronger evidence the predictor matters.'],
            ['**df**',         'Degrees of freedom (usually 1 per continuous predictor).',                            'Used with Wald for the p-value.'],
            ['**Sig.**',       'The p-value for the Wald test.',                                                       'If p < .05, predictor is significant.'],
            ['**Exp(B)**',     'The ODDS RATIO. For every 1-unit increase in the predictor, the odds of the event multiply by Exp(B).', '**The KEY statistic — see below.**'],
            ['**95% CI for Exp(B)**', '95% confidence interval for the odds ratio.',                                  'If the CI includes 1.0, the predictor is non-significant.'],
          ]},

        { type: 'heading', level: 3, text: 'Interpreting Exp(B) — the odds ratio' },

        { type: 'paragraph', text:
          'The odds ratio (Exp(B)) is the single most-confused number in logistic regression. Here is the rule:' },

        { type: 'list', items: [
          '**Exp(B) = 1.0** → no effect — the predictor does not change the odds.',
          '**Exp(B) > 1.0** → predictor INCREASES the odds of the event. Exp(B) = 2 means odds DOUBLE for every 1-unit increase.',
          '**Exp(B) < 1.0** → predictor DECREASES the odds. Exp(B) = 0.5 means odds HALVE; Exp(B) = 0.25 means odds reduce to 25% (a 75% reduction).',
        ]},

        { type: 'callout', tone: 'gold', title: 'A quick translation trick',
          body: 'To convert Exp(B) to a "percent change in odds" — useful for plain-English write-ups — use: **percent change = (Exp(B) − 1) × 100**. Exp(B) = 1.45 → 45% increase in odds. Exp(B) = 2.5 → 150% increase. Exp(B) = 0.75 → 25% DECREASE. Examples: "for every additional hour of weekly study, the odds of passing increase by 45%."' },

        { type: 'reveal',
          prompt: 'Your logistic output shows: study_hrs B = 0.37, Wald = 12.4, p < .001, Exp(B) = 1.45, 95% CI for Exp(B) [1.18, 1.78]. How do you interpret this?',
          answer: '**For every additional hour of weekly study, the odds of passing the exam increase by 45%** (Exp(B) = 1.45, or "odds 1.45 times higher per hour"). The relationship is highly significant (Wald χ² = 12.4, p < .001). The 95% confidence interval [1.18, 1.78] does NOT include 1.0, confirming significance. To translate into probabilities: a pupil studying 0 hours might have a 30% chance of passing; each extra hour multiplies the odds by 1.45, so by 5 hours per week the odds are 1.45⁵ ≈ 6.4 times higher. Standard APA write-up: *"Weekly study hours significantly predicted the odds of passing the exam, B = 0.37, Wald χ²(1) = 12.4, p < .001, OR = 1.45, 95% CI [1.18, 1.78]. Each additional hour of weekly study was associated with a 45% increase in the odds of passing."*' },
      ],
    },

    /* ════════════════════ 6. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — predicting exam pass/fail',
      blocks: [
        { type: 'workedExample', title: 'A Master\'s study at the University of Nairobi',
          body: [
            { label: 'The research question',
              text: 'Do weekly study hours and class attendance predict whether a pupil PASSES the end-of-term mathematics exam (score ≥ 50 = pass)? Which is the stronger predictor?' },
            { label: 'The data',
              text: 'n = 118 Form 3 pupils. Outcome: **passed** (1 = passed, 0 = failed). Predictors: **study_hrs** (continuous, weekly hours studying maths), **attendance** (continuous, % class attendance).' },
            { label: 'Step 1 — Set up the binary outcome',
              text: 'Transform → Compute Variable → passed = 1 if math_score >= 50, else 0. Check Variable View → set value labels {1 = Passed, 0 = Failed}. Run Frequencies on passed to confirm sensible split: 78 passed (66%), 40 failed (34%).' },
            { label: 'Step 2 — Run logistic regression',
              text: 'Analyze → Regression → Binary Logistic → passed to Dependent, study_hrs and attendance to Covariates → Options: tick Classification plots, Hosmer-Lemeshow, 95% CI for exp(B) → OK.' },
            { label: 'Step 3 — Read the Omnibus Test',
              text: 'Chi-square (Model) = 22.3, df = 2, Sig. = .000. The model is highly significant overall.' },
            { label: 'Step 4 — Read Hosmer-Lemeshow',
              text: 'Chi-square = 6.45, df = 8, Sig. = .597. NON-SIGNIFICANT — the model fits the data adequately.' },
            { label: 'Step 5 — Read Model Summary',
              text: 'Nagelkerke R² = .242 — pseudo-R²; about 24% of variation in pass/fail is accounted for by the model.' },
            { label: 'Step 6 — Read Classification Table',
              text: 'Overall accuracy = 75.4%. Sensitivity (correctly predicting pass) = 87.2%. Specificity (correctly predicting fail) = 52.5%. The model is much better at identifying passes than failures — common when classes are imbalanced.' },
            { label: 'Step 7 — Read Variables in the Equation',
              text: 'study_hrs: B = 0.32, Wald = 9.1, p = .003, Exp(B) = 1.38, 95% CI [1.12, 1.71]. attendance: B = 0.06, Wald = 6.8, p = .009, Exp(B) = 1.06, 95% CI [1.02, 1.11]. BOTH significant. Constant B = −5.42.' },
            { label: 'Step 8 — Interpret',
              text: 'Each extra hour of weekly study INCREASES the odds of passing by 38% (Exp(B) = 1.38). Each 1-percentage-point increase in attendance increases the odds by 6% (Exp(B) = 1.06). Study hours has a bigger per-unit effect, but attendance matters across a wider range.' },
            { label: 'Step 9 — APA write-up',
              text: '*"A binary logistic regression was conducted to examine whether weekly study hours and class attendance predicted the odds of passing the end-of-term mathematics examination (1 = passed, 0 = failed) among 118 Form 3 pupils. The model was statistically significant, χ²(2) = 22.3, p < .001, with Nagelkerke R² = .24. The Hosmer-Lemeshow test indicated adequate model fit, χ²(8) = 6.45, p = .60. The model correctly classified 75.4% of cases. Both predictors were significant: each additional hour of weekly study was associated with a 38% increase in the odds of passing (B = 0.32, Wald χ²(1) = 9.1, p = .003, OR = 1.38, 95% CI [1.12, 1.71]), and each 1-percentage-point increase in class attendance was associated with a 6% increase in the odds of passing (B = 0.06, Wald χ²(1) = 6.8, p = .009, OR = 1.06, 95% CI [1.02, 1.11])."*' },
          ]},
      ],
    },

    /* ════════════════════ 7. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing logistic regression up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'A binary logistic regression was conducted to examine whether [PREDICTOR LIST] predicted the odds of [OUTCOME] (coded 1 = [event], 0 = [non-event]) among [N] [respondents]. The overall model was [significant/non-significant], χ²([df]) = [chi-square], p = [p-value], with Nagelkerke R² = [.XX]. The Hosmer-Lemeshow test [indicated adequate fit / suggested poor fit], χ²([df]) = [X.XX], p = [p-value]. The model correctly classified [XX]% of cases (sensitivity [XX]%, specificity [XX]%). [Then describe each significant predictor: each one-unit increase in [predictor] was associated with a [XX]% [increase/decrease] in the odds of [event] (B = [.XX], Wald χ²(1) = [X.XX], p = [.XXX], OR = [X.XX], 95% CI [LL, UL]).]' },

        { type: 'callout', tone: 'success', title: 'Seven numbers every logistic write-up needs',
          body: '**1.** Overall model χ² with df and p. **2.** Nagelkerke R² (pseudo R²). **3.** Hosmer-Lemeshow χ² with df and p (you want p > .05). **4.** Classification accuracy %. **5.** For each predictor: B, Wald χ², p. **6.** Exp(B) — the odds ratio — with 95% CI. **7.** Plain-English interpretation in "% change in odds" form. Examiners scan for all seven; missing any prompts a question.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why is the Hosmer-Lemeshow test \'good\' when it is NON-significant?',
              a: 'The Hosmer-Lemeshow test\'s null hypothesis is "the model fits the data well". A non-significant result (p > .05) means we cannot reject that null — so the model fit is acceptable. A SIGNIFICANT Hosmer-Lemeshow (p < .05) would indicate poor fit. The direction is the opposite of most significance tests, which is a common source of confusion but methodologically correct.' },
            { q: 'Why is your classification accuracy only 75% when the model is significant?',
              a: 'Significance and predictive accuracy are different. The model is significantly better than chance (overall χ² test). But 75% accuracy means 25% of cases are still misclassified. This is reasonable for a thesis-level model with two predictors — perfect prediction would require many more predictors or a deterministic outcome. I also report sensitivity (87.2%) and specificity (52.5%) so the reader can see the model is much better at predicting passes than failures, common with imbalanced classes.' },
            { q: 'What does Exp(B) = 1.38 actually mean in plain English?',
              a: 'For every additional hour of weekly study, the ODDS of passing increase by a factor of 1.38, or 38%. To translate into probability terms: a pupil with baseline odds of 1.0 (50% probability of passing) would, with one extra study hour, have odds of 1.38 — corresponding to a probability of 1.38 / 2.38 ≈ 58%. The effect compounds: 5 extra hours give odds 1.38⁵ ≈ 6.4 times the baseline, lifting probability from 50% to about 86%.' },
          ]},
      ],
    },

    /* ════════════════════ 8. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common logistic mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Reading Hosmer-Lemeshow in the wrong direction',
          body: 'Your Hosmer-Lemeshow is significant (p = .03) and you report "the model fits well, p = .03". You have inverted the interpretation — a significant Hosmer-Lemeshow means BAD fit.',
          fix: 'Hosmer-Lemeshow null hypothesis = "model fits well". You want p > .05 (NON-significant) to conclude fit is adequate. A significant result (p < .05) means your model is NOT fitting the data well. Always check the direction.' },

        { type: 'mistake',
          title: 'Mistake 2 — Interpreting Exp(B) as a probability instead of odds',
          body: 'You report "Exp(B) = 1.45 — so the probability of passing is 1.45 times higher". But Exp(B) is the ODDS ratio, not the probability ratio. Probabilities cannot exceed 1.',
          fix: 'Exp(B) is the ODDS RATIO. Say "the ODDS are 1.45 times higher" or "the odds increase by 45%". For probability translations, convert: P = Odds / (1 + Odds). Mixing odds and probability is the single most common interpretation error in logistic regression.' },

        { type: 'mistake',
          title: 'Mistake 3 — Reporting linear-regression R² instead of pseudo R²',
          body: 'You write "R² = .24" without mentioning that logistic regression does not have a true R² — that is the Nagelkerke pseudo-R², which is interpreted differently.',
          fix: 'Always label it explicitly: "Nagelkerke R² = .24" or "Cox & Snell R² = .19". These pseudo-R² values are NOT directly comparable to linear regression R². Treat them as rough indicators of effect size, not as variance explained in the traditional sense.' },

        { type: 'mistake',
          title: 'Mistake 4 — Running logistic regression on an ordinal outcome',
          body: 'Your outcome is a 4-point satisfaction scale (1-4). You binary-code it (1-2 = unsatisfied, 3-4 = satisfied) and run logistic regression. But you lost information by collapsing four levels into two.',
          fix: 'For ordinal outcomes (3+ ordered categories), use ORDINAL logistic regression (Analyze → Regression → Ordinal in SPSS). For nominal multi-category outcomes, use MULTINOMIAL logistic regression. Binary logistic is specifically for two-category outcomes. Forcing ordinal data into binary throws away information.' },
      ],
    },

    /* ════════════════════ 9. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Logistic regression is for BINARY outcomes (yes/no, pass/fail, alive/dead). Linear regression is for continuous outcomes.',
          'The output predicts a PROBABILITY between 0 and 1, using an S-shaped logistic curve rather than a straight line.',
          'Coefficients are interpreted using the **odds ratio Exp(B)**: for every 1-unit increase in the predictor, the odds of the event multiply by Exp(B).',
          'Exp(B) > 1 = increases odds; Exp(B) < 1 = decreases odds; Exp(B) = 1 = no effect.',
          'To convert Exp(B) to "% change in odds": (Exp(B) − 1) × 100.',
          'Run via Analyze → Regression → Binary Logistic → outcome to Dependent, predictors to Covariates → tick Hosmer-Lemeshow, Classification plots, CI for exp(B) under Options.',
          'Read four key tables: Omnibus Tests (overall model significance), Hosmer-Lemeshow (want p > .05 = good fit), Model Summary (Nagelkerke R² as pseudo R²), Classification Table (overall + sensitivity + specificity), Variables in the Equation (B, Wald, Exp(B), CI).',
          'Hosmer-Lemeshow direction is OPPOSITE most tests — non-significant (p > .05) = good fit; significant = bad fit.',
          'For each predictor, always report Exp(B) with 95% CI and convert to "% change in odds" for plain-English readers.',
          'For multi-category outcomes, use ordinal logistic (ordered categories) or multinomial logistic (unordered) — not binary logistic with collapsing.',
          'Avoid the four mistakes: inverting Hosmer-Lemeshow direction, confusing odds with probability, mislabelling pseudo R², forcing ordinal data into binary.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Course complete — Regression Analysis',
          body: 'This is the final lesson of the Regression Analysis course. Across four lessons you have mastered simple linear regression (one predictor, continuous outcome), multiple linear regression (many predictors, continuous outcome), regression assumptions & diagnostics (the methodological hygiene), and binary logistic regression (binary outcomes). Together with Correlation Analysis, you now have the predictive-modelling toolkit that powers most postgraduate quantitative theses.' },

        { type: 'callout', tone: 'success', title: 'Where to next',
          body: 'You have now mastered FIVE complete courses: SPSS Basics, Descriptive Statistics, Correlation Analysis, Reliability Testing, and Regression Analysis — 20 lessons in total. The one remaining course in the curriculum is **ANOVA** (Analysis of Variance) for comparing means across three or more groups. ANOVA is the natural complement to regression: regression is for continuous predictors, ANOVA is for categorical group comparisons.' },

        { type: 'paragraph', text:
          'Before finishing, take a binary outcome from your dataset (or create one by dichotomising a continuous outcome), pick 2 predictors, and run binary logistic regression. Interpret the Exp(B) values. Convert one to a "% change in odds". Write the APA paragraph. Then come back for the final knowledge check of this course.' },
      ],
    },

    /* ════════════════════ 10. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'Your outcome variable is "did the patient recover?" (1 = yes, 0 = no). Which regression should you use?',
          choices: [
            'Linear regression',
            'Binary logistic regression',
            'Pearson correlation',
            'Multiple regression',
          ],
          answer: 1,
          explanation: 'Binary outcomes (yes/no, pass/fail, alive/dead) require **binary logistic regression**. Linear regression would produce nonsensical predictions like "probability of recovery = 1.4" or "−0.2". Logistic regression produces probabilities between 0 and 1, using the S-shaped logistic curve.' },

        { type: 'check',
          question: 'Exp(B) = 2.0 for a predictor in your logistic regression. What does this mean?',
          choices: [
            'The probability doubles for every 1-unit increase in the predictor',
            'The ODDS of the event double for every 1-unit increase in the predictor',
            'The predictor is twice as important as the others',
            'R² is 2.0',
          ],
          answer: 1,
          explanation: 'Exp(B) is the ODDS RATIO. Exp(B) = 2 means the ODDS double for every 1-unit increase, NOT the probability. (Probability cannot exceed 1, so it cannot double if starting above 50%.) To convert odds back to probability: P = Odds / (1 + Odds). Confusing odds with probability is the single most common interpretation error in logistic regression.' },

        { type: 'check',
          question: 'You ran Hosmer-Lemeshow and got Chi-square = 4.2, p = .84. What does this tell you?',
          choices: [
            'The model fits POORLY — significant misfit',
            'The model fit is ADEQUATE — non-significant means good fit (the null is "model fits well")',
            'Re-run the analysis',
            'The model is over-fitted',
          ],
          answer: 1,
          explanation: 'Hosmer-Lemeshow\'s null hypothesis is "the model fits the data well" — so you WANT a non-significant result (p > .05). Here p = .84 is well above .05 — you cannot reject the null, so fit is adequate. A SIGNIFICANT Hosmer-Lemeshow (p < .05) would indicate POOR fit. This direction is opposite most stats tests, so it confuses many beginners.' },

        { type: 'check',
          question: 'Your Exp(B) = 1.45 for "weekly study hours". How do you write this in plain English?',
          choices: [
            'Study hours predict 45% of variance',
            'Each extra hour of weekly study is associated with a 45% INCREASE in the ODDS of passing',
            'Pupils studied 1.45 hours on average',
            'The correlation is 1.45',
          ],
          answer: 1,
          explanation: 'Translation rule: percent change in odds = (Exp(B) − 1) × 100 = (1.45 − 1) × 100 = 45% increase. The "increase in odds" wording is the most accurate plain English. Saying "45% increase in probability" would be wrong — probability and odds are related but different. Examiners look for the precise "odds" language.' },

        { type: 'check',
          question: 'Your binary logistic model has 75% classification accuracy. The classes are 80% passed and 20% failed. Is the model useful?',
          choices: [
            'Yes — 75% is excellent',
            'Probably not — predicting "everyone passes" gives 80% accuracy by default. Your 75% model is WORSE than the trivial baseline.',
            'Yes, because it is significant',
            'The accuracy is irrelevant',
          ],
          answer: 1,
          explanation: 'Always compare accuracy to the BASELINE of predicting the majority class for everyone. With 80% passed, predicting "everyone passes" gets 80% right with zero effort. Your 75% model performs WORSE than the baseline — it is adding noise, not value. This is why imbalanced classes need separate sensitivity/specificity analysis, not just overall accuracy.' },

        { type: 'check',
          question: 'Your outcome is satisfaction on a 1-5 ordinal Likert scale. Which regression is correct?',
          choices: [
            'Binary logistic — dichotomise the scale (1-2 vs 3-5)',
            'Linear regression',
            'ORDINAL logistic regression (Analyze → Regression → Ordinal in SPSS) — designed for ordered multi-category outcomes',
            'Pearson correlation',
          ],
          answer: 2,
          explanation: 'Ordinal outcomes with 3+ ordered categories should use ORDINAL logistic regression — it preserves the ordering information that binary collapsing destroys. Forcing ordinal data into binary loses information; linear regression treats the ordinal categories as equal-interval, which they may not be. Ordinal logistic is the methodologically correct choice for an ordered Likert outcome.' },
      ],
    },
  ],
};
