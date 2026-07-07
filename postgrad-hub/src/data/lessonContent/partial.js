/**
 * Correlation Analysis · Lesson 3 — Partial Correlation
 * Controlling for a third variable. Same depth as Pearson + Spearman.
 */

export const PARTIAL_LESSON = {
  id: 'cor-3',
  title: 'Partial correlation',
  subtitle: 'Module 03 · Course: Correlation Analysis · Lesson 3 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When a third variable is contaminating your correlation',
      blocks: [
        { type: 'scene', body: [
          'You ran Pearson on two variables that interest you — class size and exam scores in a sample of 80 secondary schools. You got r = −.42, p < .001: smaller classes correlate with higher scores. You write up the finding and your supervisor reads it.',
          'She circles your conclusion in red ink and writes: *"But what about school FUNDING? Wealthy schools tend to have smaller classes AND better resources AND better teachers. Maybe funding is doing all the work — the class size effect might disappear once you control for funding."*',
          'She is right to ask. Your apparent class-size effect might really be a funding effect in disguise. The third variable — funding — could be the LURKER behind the X-Y relationship. To answer your supervisor honestly, you need a way to statistically REMOVE funding\'s influence and then check whether class size still relates to exam scores on its own. That is exactly what **partial correlation** does. This lesson teaches you how, when, and why.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Explain in plain English** what a third variable problem is and how partial correlation solves it.',
            '**Recognise three classic scenarios** where partial correlation belongs in your thesis: spurious relationships, mediation hypotheses, confounder control.',
            '**Run partial correlation in SPSS** via Analyze → Correlate → Partial.',
            '**Read the output** and interpret partial r with its degrees of freedom.',
            '**Compare zero-order and partial correlations** to understand what the third variable was doing.',
            '**Write up partial correlation results** following the APA template every examiner expects.',
            '**Defend your choice of control variable(s)** under examiner questioning.',
          ]},

        { type: 'why', body:
          'Examiners and supervisors regularly ask: "Did you control for [demographic / confounder / other variable]?" Knowing how to ANSWER that question — and how to PROACTIVELY include partial correlations where they matter — separates a thorough thesis from a thin one. Even when partial correlation is not your main analysis, mentioning that you checked it shows methodological care.' },
      ],
    },

    /* ════════════════════ 1.5 WHAT/WHY/WHERE/WHEN — beginner-first primer ════════════════════ */
    {
      id: 'wwww',
      title: 'What / Why / Where / When — read THIS first',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'Partial correlation lets you TEST whether a bivariate relationship is REAL or just being driven by a lurking third variable. Before touching the SPSS dialog, understand: (1) What partial correlation IS, (2) Why you would use it instead of ordinary Pearson, (3) Where a Kenyan postgraduate would use it, (4) When to CHOOSE it.',
            'If you can answer all 4 in one sentence each, you are ready for the walkthrough. If not, spend 3 minutes here.',
          ]},

        { type: 'illustration', component: 'MachakosPartialWWWW',
          caption: 'Figure 0. Partial Correlation WHAT/WHY/WHERE/WHEN reference card. Includes the critical warning about defending your choice of control variable — examiners will ask.' },

        { type: 'callout', tone: 'brand', title: 'Key terms you will meet in the walkthrough',
          body: [
            '**Zero-order correlation** — the ordinary bivariate correlation with NO controls (just Pearson r between X and Y).',
            '**Partial correlation** — the correlation between X and Y AFTER removing the shared variance with a third variable Z.',
            '**Control variable / covariate** — the third variable whose effect you want to remove. Machakos example: InvestmentPerStudent.',
            '**Confounder** — a variable that causes BOTH X and Y, making them appear correlated even if they have no direct link.',
            '**Notation** — r(X,Y | Z) reads as "the correlation of X and Y, controlling for Z". The | means "given" or "holding constant".',
            '**Shrinkage** — the amount r shrinks when moving from bivariate to partial. Big shrinkage = your control variable was doing a lot of the work.',
          ]},
      ],
    },

    /* ════════════════════ 2. THE BIG IDEA ════════════════════ */
    {
      id: 'big-idea',
      title: 'The big idea — strip out the third variable\'s shadow',
      blocks: [
        { type: 'heading', level: 2, text: 'What partial correlation actually does' },

        { type: 'paragraph', text:
          'Imagine the relationship between class size (X) and exam scores (Y) as the overlap between two circles. If school funding (Z) also relates to both X and Y, it adds its own overlap to BOTH circles — inflating the apparent X-Y overlap. The straight Pearson correlation between X and Y reads that inflated overlap as if it were all about class size, when really part of it is funding\'s shadow.' },

        { type: 'illustration', component: 'PartialVenn',
          caption: 'Figure 1. Partial correlation visualised. LEFT: simple Pearson r between X and Y, with the third variable Z casting a shadow that inflates the apparent overlap. RIGHT: partial correlation removes Z\'s shadow from BOTH X and Y, leaving only the "true" X-Y association. The remaining overlap is the partial correlation.' },

        { type: 'definition', term: 'Partial correlation',
          body: 'The correlation between two variables X and Y AFTER mathematically removing the linear influence of one or more other variables (called control variables or covariates). Symbol: r_xy.z meaning "correlation between X and Y, controlling for Z". Ranges from −1 to +1, interpreted just like regular Pearson r.' },

        { type: 'analogy', title: 'Two students racing — but one had a head start',
          body: 'Two pupils ran a 100m race. Pupil A finished in 11.5 seconds; pupil B in 12.0 seconds. Looks like A is faster, right? Now you learn that pupil A started 5 metres ahead of pupil B (a head start). To know who is REALLY faster, you have to subtract the head start — adjust for it. Partial correlation does the same thing: it adjusts the X-Y relationship to remove the "head start" that the third variable provided.' },

        { type: 'heading', level: 3, text: 'What can happen when you control for a third variable' },

        { type: 'paragraph', text:
          'When you compare the SIMPLE correlation (Pearson r between X and Y, ignoring Z) with the PARTIAL correlation (X and Y after controlling for Z), one of four things happens:' },

        { type: 'comparison',
          headers: ['What happens to the correlation', 'Plain-English interpretation', 'Example'],
          rows: [
            ['**Partial r ≈ zero-order r** (similar magnitude)', 'The third variable does NOT confound the relationship. X really does relate to Y independently.', 'Study hours → exam scores stays strong after controlling for prior maths ability.'],
            ['**Partial r is MUCH SMALLER** than zero-order r', 'The third variable was responsible for much of the apparent relationship. The X-Y link was largely spurious.', 'Class size → exam scores shrinks dramatically after controlling for school funding. Funding was doing most of the work.'],
            ['**Partial r is essentially ZERO** while zero-order was strong', 'The X-Y relationship was ENTIRELY explained by the third variable. No independent X-Y effect remains.', 'Number of firefighters at a fire → property damage drops to zero after controlling for fire size. Both were caused by fire size.'],
            ['**Partial r is LARGER** than zero-order r', '"Suppression" effect — the third variable was hiding a true relationship. Removing it reveals a stronger link.', 'Less common but real. The third variable was masking the underlying association.'],
          ]},

        { type: 'reveal',
          prompt: 'Zero-order Pearson r between class size and exam scores = −.42 (p < .001). After controlling for school funding, partial r = −.08 (p = .47). What do you conclude?',
          answer: 'The apparent class size effect was largely SPURIOUS — driven by school funding rather than class size itself. Funding correlates with both smaller classes and higher scores; once you remove funding\'s influence, the class size effect shrinks to a tiny, non-significant −.08. Your honest write-up: *"While the zero-order correlation between class size and exam scores was moderate and significant (r = −.42, p < .001), this relationship was largely explained by school funding. After controlling for funding, the partial correlation reduced to r = −.08 (p = .47), suggesting class size has little independent effect on exam achievement in this sample."*' },
      ],
    },

    /* ════════════════════ 3. THREE SCENARIOS ════════════════════ */
    {
      id: 'scenarios',
      title: 'Three classic scenarios where partial correlation belongs',
      blocks: [
        { type: 'heading', level: 2, text: 'When to reach for partial correlation' },

        { type: 'steps', steps: [
          { title: 'Scenario 1 — Testing a SPURIOUS relationship hypothesis',
            body: [
              'You see a strong X-Y correlation but suspect a confounder is doing the work. Partial correlation lets you test that suspicion directly.',
              'Classic example: ice cream sales (X) and drownings (Y) correlate strongly. After controlling for outdoor temperature (Z), the partial correlation drops to near zero. Hot weather causes both ice cream sales AND swimming (and therefore drownings) — ice cream does not cause drownings.',
              'In thesis work: any time your supervisor asks "but couldn\'t X be explained by Z?", partial correlation provides the answer.',
            ]},
          { title: 'Scenario 2 — Controlling for DEMOGRAPHIC confounders',
            body: [
              'Most thesis surveys measure demographics (age, gender, education, years of experience) alongside the main constructs. These demographics often correlate with your variables of interest and can muddy the picture.',
              'Example: you find that job satisfaction correlates positively with workplace performance (r = .35). Is this really about satisfaction, or could it be that older workers happen to be both more satisfied AND more skilled? Partial correlation controlling for age tells you.',
              'In thesis work: showing that your X-Y finding holds AFTER controlling for demographics is a standard robustness check that examiners reward.',
            ]},
          { title: 'Scenario 3 — Testing MEDIATION (the simple way)',
            body: [
              'A mediator is a variable that lies BETWEEN your X and Y, on the causal chain. If X causes M and M causes Y, then M mediates the X-Y relationship.',
              'If the partial r between X and Y (controlling for M) drops substantially compared to the zero-order r, that\'s evidence M is acting as a mediator. The X effect runs THROUGH M.',
              'For formal mediation testing, the modern approach is the Hayes PROCESS macro (a separate, advanced tool). But comparing zero-order to partial correlations is the simplest first-pass check.',
            ]},
        ]},

        { type: 'callout', tone: 'warning', title: 'Choose your control variables BEFORE running, not AFTER',
          body: 'Partial correlation is a tool for testing pre-specified hypotheses, not for fishing. Decide upfront — based on theory and prior research — which variable(s) you want to control for, and why. Running partial correlations with every possible third variable until something interesting emerges is "p-hacking" and damages credibility. Document your reasoning in Chapter 3 BEFORE running the analyses.' },
      ],
    },

    /* ════════════════════ 4. RUNNING IT IN SPSS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running partial correlation in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'A separate menu from Bivariate' },

        { type: 'paragraph', text:
          'Partial correlation has its own menu in SPSS — it does not live inside the Bivariate dialog where Pearson and Spearman live. Find it at Analyze → Correlate → Partial.' },

        { type: 'steps', steps: [
          { title: 'Open the Partial Correlations dialog',
            body: 'Analyze → Correlate → Partial.' },
          { title: 'Move your two main variables into the "Variables" box',
            body: 'These are the X and Y you want to correlate AFTER controlling. Use the blue arrow at the top.' },
          { title: 'Move your control variable(s) into the "Controlling for" box',
            body: 'These are the Z variable(s) whose influence you want to remove. You can control for ONE variable (called first-order partial) or SEVERAL (second-order, third-order, etc.) — though one or two is usually enough.' },
          { title: 'Click Options for descriptives',
            body: 'Tick "Means and standard deviations" for context. Crucially, tick **"Zero-order correlations"** — this gives you BOTH the simple Pearson r AND the partial r side by side, so you can see what the controlling did.' },
          { title: 'Set missing-data handling',
            body: 'Pick "Exclude cases listwise" (the only option). With multiple variables involved, listwise is the standard. Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces a Correlations table with two sub-tables: one labelled "-none-" (the zero-order/simple Pearson) and one labelled by your control variable (the partial). Reading both together is where the insight comes from.' },
        ]},

        { type: 'callout', tone: 'info', title: 'Partial correlation in SPSS is always parametric (Pearson-based)',
          body: 'The SPSS Partial Correlations menu uses Pearson-style correlation on the residuals — there is no Spearman option for partial correlation in the standard menu. If your data is ordinal or non-normal, you need to either (a) rank-transform your variables first using Transform → Rank Cases, then run partial correlation on the ranks, or (b) use the more advanced PROCESS macro by Hayes. For most thesis work, option (a) is acceptable when needed.' },
      ],
    },

    /* ════════════════════ 4.4 BEFORE YOU CLICK — UNDERSTAND YOUR VARIABLES ════════════════════ */
    {
      id: 'variables-first',
      title: 'Before you click ANYTHING — understand your variables',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'Partial correlation is one of the most misused tests in postgraduate research. Students throw in a "control variable" because a supervisor mentioned it — without understanding what "controlling for" actually MEANS conceptually.',
            'This section teaches you the two questions to ask before you touch the Partial Correlations dialog — so your analysis is honest, defensible, and answers the RIGHT question.',
          ]},

        { type: 'heading', level: 2, text: 'What does "controlling for" actually mean?' },

        { type: 'paragraph', text:
          'Imagine you find that Digital_Devices correlates with Math_KCSE_Mean at r = .478 (medium-large positive). Great, digital devices help students learn — right?' },

        { type: 'paragraph', text:
          'But hold on. Well-funded schools tend to have BOTH more digital devices AND better academic outcomes overall (better teachers, better facilities, better nutrition programmes). What if the ENTIRE correlation between Digital_Devices and Math_KCSE_Mean is being caused by school funding? What if devices themselves add nothing on top of what wealth already provides?' },

        { type: 'callout', tone: 'brand', title: 'What partial correlation does',
          body: [
            'Partial correlation asks: "IF two schools had EXACTLY the same funding, would the one with more devices still have better Math scores?"',
            'It mathematically removes the influence of the control variable from BOTH the IV and the DV before calculating the correlation. What remains is the UNIQUE relationship between IV and DV — the part that isn\'t explained by the control.',
            'If the correlation stays roughly the same after controlling → the control variable wasn\'t driving things. If it drops significantly → your original correlation was partly (or entirely) spurious.',
          ]},

        { type: 'heading', level: 2, text: 'The TWO questions to ask before running partial correlation' },

        { type: 'comparison',
          headers: ['Question', 'How to answer', 'What if you can\'t answer?'],
          rows: [
            ['**1. Which variable is my CONTROL and WHY?**',
              'Pick a variable that could plausibly cause BOTH your IV and DV. (e.g. school funding causes both device availability AND academic outcomes.)',
              'If you can\'t justify why the control causes both → don\'t control for it. You\'ll be introducing bias, not removing it.'],
            ['**2. Are all my variables CONTINUOUS (Scale)?**',
              'Partial correlation in SPSS uses Pearson — so it needs Scale IV, Scale DV, and Scale control. Check each variable icon in the Variable View.',
              'If any is ordinal/nominal → rank-transform first (Transform → Rank Cases) or use regression with dummy variables instead.'],
          ]},

        { type: 'heading', level: 2, text: 'Applied to the Machakos study' },

        { type: 'paragraph', text:
          'Our earlier Pearson analysis found Digital_Devices ↔ Math_KCSE_Mean r = .478. Now we ask the deeper question: is that relationship REAL, or is it being propped up by school funding? We\'ll test using `InvestmentPerStudent` (funding) as our control variable.' },

        { type: 'comparison',
          headers: ['Variable name', 'Real data example', 'Role in this partial correlation', 'Measurement type'],
          rows: [
            ['**Digital_Devices**',           'Composite 1-5 Likert (M=3.51)',  'IV — the "cause" we\'re investigating',           '📏 Scale (ruler icon)'],
            ['**Math_KCSE_Mean**',            'KCSE mean 4.8 - 7.1 (M=5.92)',   'DV — the outcome we\'re predicting',              '📏 Scale (ruler icon)'],
            ['**InvestmentPerStudent**',      'KES 3,000 - 7,500 (M=4,820)',    'CONTROL — the confounder we\'re holding constant', '📏 Scale (ruler icon)'],
          ]},

        { type: 'callout', tone: 'brand', title: 'Locked in — 3 variables into the Partial dialog',
          body: 'Digital_Devices and Math_KCSE_Mean go in the top "Variables" box. InvestmentPerStudent goes in the bottom "Controlling for" box. Now we\'re ready to click.',
        },

        { type: 'callout', tone: 'warning', title: 'The examiner question you MUST be able to answer',
          body: [
            '_"Why did you choose to control for InvestmentPerStudent specifically? Why not Teacher_Competency or Internet_Connectivity?"_',
            '**Your answer:** "InvestmentPerStudent was chosen as the control because it is the plausible common cause of both digital device availability AND academic performance — well-funded schools purchase more devices AND generate better outcomes. Controlling for it isolates the UNIQUE contribution of device availability, over and above the effect of overall school wealth."',
            'Practise saying that out loud before your defence. It shows you didn\'t just click blindly.',
          ]},
      ],
    },

    /* ════════════════════ 4.5 THE MACHAKOS PROCEDURE ════════════════════ */
    {
      id: 'machakos-walkthrough',
      title: 'The Machakos procedure',
      blocks: [
        { type: 'callout', tone: 'brand', title: 'The research question we\'re answering',
          body: [
            '**Question:** After removing the influence of school funding, is there still a real relationship between digital devices and Math performance?',
            '**Test:** Partial correlation of `Digital_Devices` × `Math_KCSE_Mean`, controlling for `InvestmentPerStudent`.',
            '**What we expect:** If devices matter INDEPENDENTLY, the correlation should stay significant (though probably smaller). If devices are just a proxy for wealth, the correlation should disappear.',
          ]},

        /* ─────── STEP 1 — menu path ─────── */
        { type: 'heading', level: 3, text: 'STEP 1 — Open the Partial Correlations dialog' },

        { type: 'paragraph', text:
          'Partial correlation lives in a **DIFFERENT menu from Pearson and Spearman**. From the SPSS main menu:' },

        { type: 'callout', tone: 'brand', title: 'The click path',
          body: '**Analyze → Correlate → Partial…** (note the ellipsis — this is DIFFERENT from Bivariate)',
        },

        { type: 'illustration', component: 'MachakosPartialMenuPath',
          caption: 'Figure 1. The SPSS menu path for partial correlation. Analyze → Correlate → Partial. Notice this is a SEPARATE menu item from Bivariate — a common student mistake is to look for a control-variable option inside the Bivariate dialog. It doesn\'t exist there.' },

        /* ─────── STEP 2 — dialog ─────── */
        { type: 'heading', level: 3, text: 'STEP 2 — Populate the Variables AND Controlling for boxes' },

        { type: 'paragraph', text:
          'Unlike Bivariate, the Partial dialog has TWO right-side boxes stacked vertically:' },

        { type: 'comparison',
          headers: ['Setting', 'What to select', 'Why'],
          rows: [
            ['**Top box: "Variables"**', 'Move `Digital_Devices` and `Math_KCSE_Mean` here (use the TOP blue arrow)',
              'These are the two variables whose relationship you want to test AFTER controlling. IV and DV.'],
            ['**Bottom box: "Controlling for"**', 'Move `InvestmentPerStudent` here (use the BOTTOM blue arrow)',
              'This is the confounder to hold constant. You can control for one variable (first-order partial) or several (higher-order) — for thesis work, one or two is usually enough.'],
            ['**Test of Significance**', '⚫ Two-tailed', 'Standard for postgraduate work unless you have a strictly one-directional hypothesis.'],
            ['**Display actual significance level**', '☑ (leave ticked)', 'Shows exact p-values in the output — needed for reporting.'],
          ]},

        { type: 'illustration', component: 'MachakosPartialDialog',
          caption: 'Figure 2. The Partial Correlations dialog. Digital_Devices and Math_KCSE_Mean sit in the top Variables box. InvestmentPerStudent — highlighted yellow — sits in the bottom Controlling for box. The gold "THE KEY DIFFERENCE" callout points to what makes partial correlation distinct from bivariate.' },

        { type: 'callout', tone: 'mistake', title: 'Common mistake — throwing control variables into the wrong box',
          body: [
            'Students often accidentally put the CONTROL variable in the top box (making a 3-way bivariate matrix) instead of the bottom box (which is what actually triggers partial correlation logic).',
            'If your output looks like a normal Pearson matrix with 3 variables → you put them all in the wrong box. Go back to the dialog and MOVE InvestmentPerStudent to the Controlling for box.',
          ]},

        /* ─────── STEP 3 — options ─────── */
        { type: 'heading', level: 3, text: 'STEP 3 — Options sub-dialog (CRUCIAL setting)' },

        { type: 'paragraph', text:
          'Click **Options…** and configure:' },

        { type: 'callout', tone: 'brand', title: 'Options settings — pay attention to Zero-order correlations',
          body: [
            '☑ **Means and standard deviations** (adds context)',
            '☑ **Zero-order correlations** — CRITICAL. This is what makes SPSS show you BOTH the bivariate (uncontrolled) correlation AND the partial correlation in the same output, so you can compare them side by side.',
            '⚫ Exclude cases listwise (only option available for partial correlation)',
            'Click **Continue**.',
          ]},

        { type: 'callout', tone: 'gold', title: 'Why zero-order correlations matter for your thesis',
          body: [
            'Without ticking Zero-order correlations, SPSS gives you ONLY the partial r. But the whole POINT of running partial correlation is to compare it against the bivariate r — otherwise you can\'t say what "controlling for" actually changed.',
            'The comparison "r dropped from .478 to .285 after controlling for funding" is the interesting FINDING. Without both numbers, you have no story to tell in Chapter 4.',
          ]},

        /* ─────── STEP 4 — output ─────── */
        { type: 'heading', level: 3, text: 'STEP 4 — Click OK and read the output' },

        { type: 'paragraph', text:
          'Click **OK**. The Output Viewer opens with your Partial Correlations results — and it looks different from bivariate output:' },

        { type: 'illustration', component: 'MachakosPartialOutput',
          caption: 'Figure 3. The Partial Correlations output. TOP block "Control Variables: -none-" shows the ZERO-ORDER (bivariate) correlations — the same numbers you\'d get from Pearson. Digital_Devices × Math_KCSE_Mean = .478 (highlighted amber). BOTTOM block "Control Variables: InvestmentPerStudent" shows the PARTIAL correlations after removing funding\'s influence. Digital_Devices × Math_KCSE_Mean = .285 (highlighted gold), df = 271. The drop from .478 → .285 is the finding.' },

        { type: 'callout', tone: 'info', title: 'What each part of the output means',
          body: [
            '**"Control Variables: -none-a"** — this is the ZERO-ORDER block. Same as bivariate Pearson output. Uses the raw scores without removing any influence.',
            '**"Control Variables: InvestmentPerStudent"** — this is the PARTIAL block. Uses the RESIDUALS from Digital_Devices and Math_KCSE_Mean after removing InvestmentPerStudent\'s linear influence from both.',
            '**df = N - number of controls - 2** — so with N=274 and 1 control, df = 271 (not 272 like bivariate). This shift in df is normal.',
            '**The footnote "a. Cells contain zero-order (Pearson) correlations."** — SPSS is telling you the top block is un-controlled. Good.',
          ]},

        /* ─────── STEP 5 — the story of the numbers ─────── */
        { type: 'heading', level: 3, text: 'STEP 5 — Read the before-and-after side by side' },

        { type: 'paragraph', text:
          'The whole point of partial correlation is to compare the bivariate and partial coefficients. Here they are visually:' },

        { type: 'illustration', component: 'MachakosPartialComparison',
          caption: 'Figure 4. Bivariate vs Partial for Digital_Devices × Math_KCSE_Mean. LEFT (amber): bivariate r = .478, N = 274 — a medium-to-large positive relationship. RIGHT (gold): partial r = .285, df = 271 — a small-to-medium positive relationship AFTER controlling for InvestmentPerStudent. The correlation dropped by about 40% but did NOT disappear — meaning digital devices DO have a unique effect, but a smaller one than the raw correlation suggested. This is the finding worth writing about.' },

        { type: 'callout', tone: 'gold', title: 'The 3-part story every partial correlation tells',
          body: [
            '**Story 1: "The correlation stays roughly the same"** — e.g. r = .478 → .460 (small drop). Interpretation: the control variable wasn\'t driving things. Your bivariate finding was robust. Report both to be transparent.',
            '**Story 2: "The correlation drops significantly but stays significant"** — like our case: r = .478 → .285 (large drop, still significant). Interpretation: the control variable was inflating the raw correlation, but there IS still a unique relationship. Discuss both in Chapter 4/5.',
            '**Story 3: "The correlation disappears entirely"** — e.g. r = .478 → .020 (near zero). Interpretation: the original bivariate finding was SPURIOUS — it was entirely driven by the control variable. This is a genuine research finding: report it honestly, don\'t hide it.',
          ]},

        /* ─────── STEP 6 — write-up ─────── */
        { type: 'heading', level: 3, text: 'STEP 6 — Write it up for Chapter 4' },

        { type: 'callout', tone: 'brand', title: 'APA Chapter-4 template for partial correlation',
          body: [
            '_"A partial correlation was computed to assess the relationship between [IV] and [DV] while controlling for [control variable]. The zero-order (uncontrolled) correlation was significant, r([N-2]) = [bivariate r], p [< .001]. After controlling for [control], the partial correlation was [also/still/no longer] significant, r([N-3]) = [partial r], p [value]. This suggests that [interpretive sentence]."_',
            '',
            '**Example for our Machakos analysis:** _"A partial correlation was computed to assess the relationship between digital device availability and Mathematics KCSE performance while controlling for investment per student. The zero-order correlation was significant, **r(272) = .48, p < .001**. After controlling for per-student investment, the partial correlation remained significant but attenuated, **r(271) = .29, p < .001**. This suggests that digital device availability contributes uniquely to Math performance above and beyond the effect of overall school funding, though a substantial portion of the raw association was explained by shared variance with school investment levels."_',
            '',
            'Notice how the interpretive sentence names BOTH findings (unique contribution + shared variance). That balanced honesty is what examiners love.',
          ]},
      ],
    },

    /* ════════════════════ 5. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the partial correlation output',
      blocks: [
        { type: 'heading', level: 2, text: 'Two tables, one comparison' },

        { type: 'paragraph', text:
          'When you ticked "Zero-order correlations" in Options, the SPSS output contains two sub-tables stacked:' },

        { type: 'list', ordered: true, items: [
          'The first sub-table, labelled **Control Variables → -none-**, shows the SIMPLE Pearson correlation between X and Y (and any other variables in the analysis). The "no control" baseline.',
          'The second sub-table, labelled **Control Variables → [your Z variable]**, shows the PARTIAL correlation between X and Y after removing Z\'s influence.',
        ]},

        { type: 'paragraph', text:
          'You compare the two. The difference between them is what Z was doing.' },

        { type: 'workedExample', title: 'Reading a partial correlation output',
          body: [
            { label: 'The research question',
              text: 'Does class size (X) relate to exam scores (Y) in 80 schools, INDEPENDENTLY of school funding (Z)?' },
            { label: 'Zero-order sub-table',
              text: 'r(class_size, exam_score) = **−.42**, p < **.001**, N = 80. A moderate negative correlation: smaller classes correlate with higher scores.' },
            { label: 'Partial sub-table (controlling for funding)',
              text: 'partial r(class_size, exam_score | funding) = **−.08**, p = **.47**, df = **77**. Almost zero, and not statistically significant.' },
            { label: 'Notice the degrees of freedom',
              text: 'Partial correlation df = N − 2 − (number of control variables). With N = 80 and 1 control variable, df = 80 − 2 − 1 = **77**. Always report partial r with its degrees of freedom: r(77) = −.08.' },
            { label: 'Interpretation',
              text: 'The drop from −.42 to −.08 is dramatic. School funding was driving most of the apparent class-size effect. Once funding is controlled for, class size has essentially no independent association with exam scores in this sample.' },
            { label: 'What to write in Chapter 4',
              text: '*"The zero-order Pearson correlation between class size and exam scores was moderate and significant, r(78) = −.42, p < .001. However, partial correlation controlling for school funding reduced the association substantially, r(77) = −.08, p = .47, indicating that the apparent class size effect was largely explained by funding differences across schools."*' },
          ]},

        { type: 'reveal',
          prompt: 'Zero-order r(job satisfaction, performance) = .35. After controlling for age, partial r = .31. What do you conclude about age as a confounder?',
          answer: 'Age explains very little of the satisfaction-performance association. The drop from .35 to .31 is small — the partial correlation is essentially the same magnitude. This means satisfaction relates to performance independently of age; older workers do not just happen to be both more satisfied AND more skilled. The relationship is genuine. Standard write-up: *"After controlling for age, the satisfaction-performance association remained moderate and significant, r(195) = .31, p < .001 — closely matching the zero-order estimate (r = .35), indicating age does not substantially confound this relationship."*' },
      ],
    },

    /* ════════════════════ 6. ZERO-ORDER VS PARTIAL ════════════════════ */
    {
      id: 'comparing',
      title: 'Comparing zero-order and partial correlations',
      blocks: [
        { type: 'heading', level: 2, text: 'A four-pattern decoder' },

        { type: 'paragraph', text:
          'After running partial correlation, you have two numbers to compare: the zero-order r (no control) and the partial r (with control). The relationship between them tells you what the control variable was doing. Here are the four patterns, with what each one means and how to write it up.' },

        { type: 'comparison',
          headers: ['Pattern', 'What it means', 'Standard sentence'],
          rows: [
            ['**Partial r ≈ Zero-order r**',                     'Control variable does NOT confound. The X-Y link is genuine and independent.',                          '"The X-Y relationship remained stable after controlling for Z, suggesting Z is not a substantial confounder."'],
            ['**Partial r is much smaller** but still non-zero', 'Control variable partially confounds. Some of the X-Y link is genuine, some was Z\'s shadow.',          '"After controlling for Z, the X-Y correlation reduced from r = .XX to r = .XX, indicating Z accounts for part of the observed association."'],
            ['**Partial r ≈ 0** (and zero-order was strong)',     'Control variable FULLY explains the X-Y link. The relationship was entirely spurious.',                '"After controlling for Z, the previously significant X-Y correlation disappeared, suggesting the apparent association was driven entirely by Z."'],
            ['**Partial r > Zero-order r**',                      'Suppressor effect — Z was hiding a true relationship. Removing it reveals a stronger link.',          '"After controlling for Z, the X-Y correlation increased from r = .XX to r = .XX, suggesting Z was suppressing the underlying association."'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Always report BOTH numbers',
          body: 'Never report partial correlation alone. Always include the zero-order r alongside it so the reader can see the change. The COMPARISON is the insight — not either number on its own. Standard format: "r = .XX (zero-order), reducing to r = .XX after controlling for Z."' },

        { type: 'why', body:
          'A partial correlation in isolation tells you only what remains. The zero-order tells you what you started with. The CHANGE between them is the story — that\'s where the methodological insight lives.' },
      ],
    },

    /* ════════════════════ 7. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — supervisor support, burnout, and job tenure',
      blocks: [
        { type: 'workedExample', title: 'A PhD study of secondary school teachers',
          body: [
            { label: 'The research question',
              text: 'A doctoral candidate wants to test whether supervisor support (X) predicts teacher burnout (Y), INDEPENDENTLY of how long the teacher has been at the school (Z, job tenure in years). She suspects newer teachers might both feel less supported AND experience more burnout — so tenure might confound the relationship.' },
            { label: 'The data',
              text: 'n = 198 secondary school teachers from 12 schools. Variables: **sup_support** (8-item Likert scale, summed total 8-40), **burnout** (10-item burnout scale, summed total 10-50), **tenure_yrs** (years employed at current school, range 0.5-32).' },
            { label: 'Step 1 — Zero-order Pearson',
              text: 'Analyze → Correlate → Bivariate → all three variables → Pearson → OK. Output shows: r(sup_support, burnout) = **−.41**, p < .001. A moderate negative correlation: higher support associates with lower burnout, as theory predicts.' },
            { label: 'Step 2 — Partial correlation controlling for tenure',
              text: 'Analyze → Correlate → Partial → move sup_support and burnout to Variables → move tenure_yrs to Controlling For → tick Zero-order correlations under Options → OK.' },
            { label: 'Step 3 — Read the output',
              text: 'Zero-order sub-table: r(sup_support, burnout) = −.41. Partial sub-table: r(sup_support, burnout | tenure) = **−.38**, p < .001, df = **195**. Slight reduction, but the relationship remains moderately strong and highly significant.' },
            { label: 'Step 4 — Interpret honestly',
              text: 'The drop from −.41 to −.38 is small (about 7% of the original). Tenure explains a tiny fraction of the supervisor support → burnout relationship. The link is genuine: even comparing teachers with the same tenure, those with higher supervisor support report less burnout.' },
            { label: 'Step 5 — APA write-up',
              text: '*"A first-order partial correlation was computed to examine the relationship between perceived supervisor support and teacher burnout, controlling for job tenure. The zero-order correlation between supervisor support and burnout was moderate and significant, r(196) = −.41, p < .001. After controlling for job tenure, the partial correlation remained substantively unchanged, r(195) = −.38, p < .001, indicating that supervisor support relates to lower burnout independently of how long teachers have been at the school. Tenure was therefore not a substantial confounder of this association."*' },
          ]},
      ],
    },

    /* ════════════════════ 8. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing partial correlation up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard template' },

        { type: 'apa', text:
          'A [first-order/second-order] partial correlation was computed to examine the relationship between [VARIABLE X] and [VARIABLE Y], controlling for [CONTROL VARIABLE(S)]. The zero-order correlation between [X] and [Y] was [strong/moderate/weak] and [significant/non-significant], r([df]) = [.XX], p = [.XXX]. After controlling for [Z], the partial correlation [remained substantively unchanged / reduced substantially / dropped to near zero / increased], r([df]) = [.XX], p = [.XXX]. This [supports / weakens / refutes] the conclusion that the X-Y relationship is independent of [Z].' },

        { type: 'callout', tone: 'success', title: 'Five things to include in every partial correlation write-up',
          body: [
            '**1.** What you controlled for (and WHY — one phrase of justification).',
            '**2.** The zero-order r WITH its df and p-value.',
            '**3.** The partial r WITH its df and p-value (df = N − 2 − k controls).',
            '**4.** A plain-language description of what the controlling did (reduced? unchanged? eliminated?).',
            '**5.** A methodological conclusion (relationship is genuine / largely spurious / partially confounded).',
          ]},

        { type: 'heading', level: 3, text: 'Controlling for multiple variables at once' },

        { type: 'apa', text:
          'A second-order partial correlation was computed between job satisfaction and intention-to-quit, controlling simultaneously for age and job tenure. The zero-order correlation was strong and significant, r(196) = −.58, p < .001. After controlling for both demographic variables, the partial correlation remained strong, r(194) = −.54, p < .001, indicating that the satisfaction-intention relationship is robust to demographic confounding.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why did you control for [variable]?',
              a: '[Variable] was selected as a control based on prior literature (e.g. Smith, 2020; Mwangi, 2022) indicating it correlates with both my predictor and outcome. Controlling for it tests whether the X-Y relationship is independent of this potential confounder. The reasoning is documented in Section 3.6 of the methodology chapter.' },
            { q: 'Why didn\'t you use the PROCESS macro for mediation testing?',
              a: 'For my primary hypotheses, partial correlation was sufficient to test whether the predictor-outcome relationship survives controlling for a single potential confounder. PROCESS is the appropriate tool for formal mediation analysis with bootstrapped confidence intervals; I used it for the secondary mediation hypothesis reported in Section 4.7 of the results chapter.' },
            { q: 'Did you check assumptions before partial correlation?',
              a: 'Partial correlation in SPSS uses Pearson-style computation on residuals, so the same assumptions apply: continuous variables, linearity, approximate normality, no extreme outliers. I confirmed each assumption visually with scatter plots and statistically with Shapiro-Wilk normality tests prior to running partial correlation. Results are reported in Appendix B.' },
          ]},
      ],
    },

    /* ════════════════════ 9. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common partial correlation mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Choosing control variables based on what gives the result you want',
          body: 'You run partial correlation with one control variable; nothing interesting happens. You try another; still nothing. You keep trying until controlling for variable Z makes your relationship disappear (or appear). You report only the last analysis.',
          fix: 'Pre-specify your control variables BEFORE running, based on theory and prior literature. Document your reasoning in Chapter 3. Report all the partial correlations you ran, not just the interesting ones. This is the difference between hypothesis testing and p-hacking.' },

        { type: 'mistake',
          title: 'Mistake 2 — Reporting only the partial r without the zero-order',
          body: 'You write "Controlling for funding, class size correlated with scores, r = −.08, p = .47." But without knowing the zero-order was r = −.42, the reader has no idea that controlling for funding produced a dramatic drop.',
          fix: 'ALWAYS report BOTH numbers: "Zero-order r = X.XX, partial r controlling for Z = Y.YY". The COMPARISON is the insight. Reporting only the partial loses the entire point.' },

        { type: 'mistake',
          title: 'Mistake 3 — Forgetting to adjust df for the control variable(s)',
          body: 'You report partial r(78) for n = 80 with one control. The correct df is N − 2 − k = 80 − 2 − 1 = 77.',
          fix: 'Partial correlation df = N − 2 − k, where k = number of control variables. With one control variable, you lose one extra df. With two controls, two extra df. SPSS displays the correct df in the output table.' },

        { type: 'mistake',
          title: 'Mistake 4 — Confusing partial correlation with regression',
          body: 'Your supervisor asks if you ran a multiple regression to control for confounders. You answer "no, I ran partial correlation" and assume the two are equivalent. They are NOT — multiple regression gives you a richer model with predicted values and effect sizes, while partial correlation just gives you a single number.',
          fix: 'Partial correlation is a quick CHECK on whether a relationship survives controlling for one or two variables. Multiple regression is the proper tool for modelling X-Y while accounting for multiple covariates. For thesis work, use partial correlation for an exploratory check, then formal regression for the main analysis if your hypotheses require it.' },
      ],
    },

    /* ════════════════════ 10. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Partial correlation measures the linear relationship between X and Y AFTER mathematically removing the influence of one or more control variables.',
          'Three scenarios call for it: testing whether an X-Y relationship is spurious, controlling for demographic confounders, and first-pass mediation checks.',
          'Run partial correlation via Analyze → Correlate → Partial (a separate menu from Bivariate).',
          'Always tick "Zero-order correlations" in Options so you get both the simple Pearson AND the partial in one output.',
          'Compare the two numbers — the change between zero-order and partial is where the story lives.',
          'Four possible patterns: partial ≈ zero-order (no confounding), partial smaller (partial confounding), partial ≈ 0 (fully spurious), partial larger (suppressor effect).',
          'Always report BOTH the zero-order AND the partial r, never just one.',
          'Partial r degrees of freedom = N − 2 − k, where k is the number of control variables.',
          'Pre-specify your control variables BEFORE running — based on theory and prior research, not on what gives the most interesting result.',
          'For ordinal data, rank-transform variables first (Transform → Rank Cases) before running partial correlation.',
          'Avoid the four mistakes: fishing for the right control, reporting only the partial, forgetting df adjustment, conflating partial correlation with multiple regression.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 4: Interpreting correlation matrices** — the final lesson of the Correlation Analysis course — we focus on how to read and present a full correlation matrix in your thesis Chapter 4. We cover the symmetry of the matrix, the asterisk legends, the multiple-comparison problem when you run many correlations, and the publication-ready table format examiners expect.' },

        { type: 'paragraph', text:
          'Before moving on, identify one pair of variables in your dataset where you suspect a confounder. Decide on the confounder (based on theory). Run zero-order Pearson, then partial correlation controlling for the confounder. Compare the two. Write a one-sentence interpretation. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'What does partial correlation do?',
          choices: [
            'Computes correlation on a partial sample (e.g. only half the cases)',
            'Measures the linear relationship between X and Y after mathematically removing the influence of one or more control variables',
            'Combines two correlations into one number',
            'Runs Pearson on ranked data',
          ],
          answer: 1,
          explanation: 'Partial correlation tells you what the X-Y relationship looks like once you have "stripped out" the linear influence of a third variable. It is your statistical answer to the question "but isn\'t this just driven by Z?". The remaining correlation is the "pure" X-Y association independent of Z.' },

        { type: 'check',
          question: 'Zero-order Pearson r(class size, exam scores) = −.42, p < .001. After controlling for school funding, partial r = −.08, p = .47. What do you conclude?',
          choices: [
            'Class size has a strong independent effect on exam scores',
            'The apparent class size effect was largely SPURIOUS — driven mostly by school funding rather than class size itself',
            'Funding has no effect',
            'You need a bigger sample',
          ],
          answer: 1,
          explanation: 'The dramatic drop from −.42 to −.08 (essentially zero, and no longer significant) means funding was doing most of the work. Wealthy schools have smaller classes AND better-resourced classrooms AND better-paid teachers — funding is correlated with both class size and exam scores. Once you remove funding\'s influence, class size adds little of its own. The honest finding: class size is a marker, not a cause.' },

        { type: 'check',
          question: 'What is the degrees of freedom for a partial correlation with n = 100 and 2 control variables?',
          choices: ['98', '99', '96', '100'],
          answer: 2,
          explanation: 'Partial correlation df = N − 2 − k, where k is the number of control variables. With N = 100 and k = 2 controls, df = 100 − 2 − 2 = **96**. Each control variable costs you one extra degree of freedom because partial correlation effectively estimates k extra parameters.' },

        { type: 'check',
          question: 'You compute zero-order r = .35 (significant) and partial r = .31 (significant) after controlling for age. What do you conclude about age as a confounder?',
          choices: [
            'Age fully explains the relationship',
            'Age substantially confounds the relationship',
            'Age does NOT substantially confound the relationship — the partial r is essentially the same as the zero-order, so the X-Y link survives the control',
            'The relationship is spurious',
          ],
          answer: 2,
          explanation: 'The small drop from .35 to .31 (less than 12% reduction) shows age explains very little of the X-Y relationship. The link is genuine: even comparing respondents of the same age, X still relates to Y at similar magnitude. Standard write-up: "After controlling for age, the X-Y relationship remained moderate and significant, r = .31, suggesting age is not a substantial confounder."' },

        { type: 'check',
          question: 'Which of these reporting practices is the standard for partial correlation?',
          choices: [
            'Report only the partial r',
            'Report only the zero-order r',
            'Report BOTH the zero-order r AND the partial r side by side, so the reader sees the change',
            'Report neither — just describe in words',
          ],
          answer: 2,
          explanation: 'The COMPARISON between zero-order and partial is the insight. Reporting only the partial loses the story of what the control variable did. Standard format: "Zero-order r = X.XX, p = X.XX; partial r controlling for Z = Y.YY, p = Y.YY." Always show both numbers.' },

        { type: 'check',
          question: 'What is the methodologically WRONG way to use partial correlation?',
          choices: [
            'Pre-specifying control variables based on theory and prior literature',
            'Running partial correlations with every possible control variable until one gives an interesting result, then reporting only that one',
            'Reporting both zero-order and partial correlations together',
            'Documenting your control variable choices in the methodology chapter',
          ],
          answer: 1,
          explanation: 'Running many partial correlations and reporting only the "interesting" one is p-hacking — it inflates false-positive rates and damages credibility. Partial correlation is a tool for testing pre-specified hypotheses. Decide upfront which controls you will use (based on theory + prior research), document the reasoning, and report ALL the analyses you ran. Transparency is what separates rigorous from sloppy methodology.' },
      ],
    },
  ],
};
