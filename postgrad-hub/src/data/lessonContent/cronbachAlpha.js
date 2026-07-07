/**
 * Reliability Testing · Lesson 1 — Cronbach's alpha
 * Detailed for beginners. The most-reported reliability statistic in postgraduate work.
 */

export const CRONBACH_ALPHA_LESSON = {
  id: 'rel-1',
  title: "Cronbach's alpha",
  subtitle: 'Module 03 · Course: Reliability Testing · Lesson 1 of 3',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'The question every examiner asks about your scale',
      blocks: [
        { type: 'scene', body: [
          'You designed a 10-item scale to measure "job satisfaction" — ten Likert questions like *"I enjoy my work", "I feel valued at my job", "My workload is manageable"*. Your supervisor reads your draft Chapter 4 and writes a single comment in the margin: *"What was the Cronbach\'s alpha?"*',
          'You stare at the comment. You vaguely remember the term from a methods class. You know it has something to do with whether a scale "works". You google it. You get the formula. The formula has Greek letters and summations and looks like it requires a maths degree. Panic sets in.',
          'Take a breath. **You do not need to understand the formula to use Cronbach\'s alpha confidently.** You need to understand what it tells you, how to run it in SPSS, how to interpret the result, and how to write it up. That is what this lesson covers — slowly, with examples, and no Greek letters.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            "**Explain in plain English** what reliability is and why every Likert-based scale in a thesis needs a Cronbach's alpha.",
            "**Run Cronbach's alpha in SPSS** in 30 seconds via Analyze → Scale → Reliability Analysis.",
            "**Interpret the alpha value** using the standard benchmarks (.70 acceptable, .80 good, .90 excellent).",
            "**Recognise when alpha is too high** (above .95) and what that warns you about.",
            "**Handle reverse-coded items** correctly before running alpha — otherwise the result is wrong.",
            "**Write up the result** following the APA template every examiner expects.",
            "**Avoid the five mistakes** that ruin reliability sections in theses.",
          ]},

        { type: 'why', body:
          "Almost every quantitative thesis with a Likert-based questionnaire reports Cronbach's alpha. Examiners ALWAYS look for it. A scale without a reported alpha looks unvalidated — a scale with an alpha clearly explained looks professional. This one lesson covers what you need to never receive that red-ink margin comment again." },
      ],
    },

    /* ════════════════════ 1.5 WHAT/WHY/WHERE/WHEN — beginner-first primer ════════════════════ */
    {
      id: 'wwww',
      title: 'What / Why / Where / When — read THIS first',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'Cronbach Alpha is the reliability statistic every thesis needs. Before touching the SPSS dialog, understand: (1) What alpha IS, (2) Why you use it before analysing scale data, (3) Where a Kenyan postgraduate would use it, (4) When to CHOOSE it over alternatives.',
            'The WWWW card below answers all 4 in 3 minutes.',
          ]},

        { type: 'illustration', component: 'MombasaCronbachWWWW',
          caption: 'Figure 0. Cronbach Alpha WHAT/WHY/WHERE/WHEN reference card using the Mombasa Patient Satisfaction Scale (15 items, alpha = .84).' },

        { type: 'callout', tone: 'brand', title: 'Key terms you will meet in the walkthrough',
          body: [
            '**Alpha (a)** - the Cronbach reliability coefficient. Range 0 to 1.',
            '**Internal consistency** - how well the items of a scale MEASURE THE SAME THING.',
            '**Corrected item-total correlation** - how well each item correlates with the total of the OTHER items. Above .30 = good item.',
            '**Alpha if item deleted** - what alpha would become if you dropped that item. If higher than current alpha, item is hurting reliability.',
            '**Reverse-code** - flipping negatively-worded item scores BEFORE running alpha. Otherwise alpha will look artificially low.',
            '**Reliability thresholds** - .70 minimum for thesis, .80 very good, .90 excellent (check redundancy).',
          ]},
      ],
    },

/* ════════════════════ 2. WHAT IS RELIABILITY ════════════════════ */
    {
      id: 'what-is-reliability',
      title: 'What "reliability" actually means',
      blocks: [
        { type: 'heading', level: 2, text: 'The everyday meaning of a tricky word' },

        { type: 'paragraph', text:
          'In everyday English, "reliable" means dependable, trustworthy — a reliable car starts every morning, a reliable friend keeps their promises. In statistics, "reliability" has a very specific meaning: a measurement is reliable if it gives you the SAME answer when you measure the same thing the same way.' },

        { type: 'analogy', title: 'The bathroom scale',
          body: 'Step on your bathroom scale three times in a row. If it says 68 kg, then 68 kg, then 68 kg — the scale is RELIABLE. It gives the same reading for the same object. Now imagine it says 68, then 73, then 65. The scale is UNRELIABLE — the reading bounces around even though your weight has not changed. A Likert questionnaire is exactly the same idea: if the items all measure the same underlying thing, the scale is reliable. If the items measure different things or random noise, the scale is unreliable.' },

        { type: 'definition', term: 'Internal consistency reliability',
          body: "The specific kind of reliability that Cronbach's alpha measures. It asks: do all the items in my scale move TOGETHER? When a respondent agrees strongly with item 1, do they also tend to agree with items 2, 3, 4, …? If yes, the scale is internally consistent — the items are all tapping into the same underlying construct (job satisfaction, anxiety, customer loyalty, whatever you are measuring)." },

        { type: 'illustration', component: 'ReliabilityAnalogy',
          caption: 'Figure 1. Three scenarios. LEFT: high reliability — all 8 items in the scale point the same way, all measuring the same underlying construct. CENTRE: medium reliability — most items align but a couple are noisy. RIGHT: low reliability — items point all over the place, suggesting they are measuring different things or just noise.' },

        { type: 'callout', tone: 'info', title: 'Reliability vs validity — they are NOT the same',
          body: "**Reliability** = does the scale give consistent results? **Validity** = does the scale measure what it claims to measure? A bathroom scale that always reads 5 kg too high is reliable (same answer every time) but not valid (it lies about your weight). Cronbach\'s alpha only tells you about reliability — it tells you nothing about validity. You need separate evidence for validity (covered in advanced courses)." },

        { type: 'reveal',
          prompt: "You measured 'workplace anxiety' with 10 items. Cronbach\'s alpha = .85. Your supervisor says: *'Good — the scale is reliable. So it definitely measures workplace anxiety.'* Is your supervisor right?",
          answer: "**Not quite.** The alpha of .85 tells you the scale is INTERNALLY CONSISTENT — the items move together, all measuring the same underlying construct. But it does not prove that this construct is specifically 'workplace anxiety'. The scale could be measuring 'general unhappiness' or 'tiredness' or 'dislike of the survey itself' — anything that the items happen to share. Validity (what the scale actually measures) requires separate evidence: comparison with established scales, expert review, factor analysis, predictive checks. Cronbach\'s α is necessary but not sufficient." },
      ],
    },

    /* ════════════════════ 3. WHEN TO USE IT ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When to use Cronbach\'s alpha (and when not to)',
      blocks: [
        { type: 'heading', level: 2, text: 'The right tool for the right scale' },

        { type: 'paragraph', text:
          "Cronbach\'s alpha is designed for one specific situation: a SCALE made up of several items that all measure the same construct. Use it whenever you have a multi-item Likert scale. Do NOT use it for anything else." },

        { type: 'comparison',
          headers: ['Situation', "Cronbach\'s alpha?", 'Why'],
          rows: [
            ['A 10-item job satisfaction Likert scale (1–5 each)', '✓ Yes — perfect use case.', 'Multiple items measuring one construct.'],
            ['A 15-item burnout inventory across 3 subscales',     '✓ Yes — but run alpha SEPARATELY for each subscale.', 'Each subscale measures a different construct.'],
            ['A 20-item knowledge test (correct/incorrect)',       '✓ Yes — uses the related Kuder-Richardson formula (which SPSS computes as alpha for binary items).', 'Binary items work the same way mathematically.'],
            ['A single Likert item',                               '✗ No — alpha needs ≥ 2 items.',                       'Reliability of a single item cannot be computed this way.'],
            ['Demographic variables (age, gender, county)',         '✗ No — these are not measuring a construct.',         'Demographics are stand-alone variables, not a scale.'],
            ['Two scales that measure different things',            '✗ No — never combine items from different constructs.','Mixing items destroys interpretability.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Run alpha SEPARATELY for each subscale',
          body: "If your questionnaire has a 'Job Satisfaction' subscale (8 items) and a 'Workplace Stress' subscale (6 items), you run Cronbach\'s alpha TWICE — once for each subscale. Never combine items from different subscales into one alpha calculation. That would give you a meaningless number for an artificial 'combined' scale that does not exist in your study." },

        { type: 'mistake',
          title: 'Running one alpha for all 30 items of a multi-subscale questionnaire',
          body: "Your questionnaire has 30 items across 4 subscales (Satisfaction, Stress, Engagement, Commitment). You run Cronbach\'s alpha on all 30 items together and get α = .76. You report it as the scale\'s reliability.",
          fix: 'Run alpha SEPARATELY for each subscale: Satisfaction (8 items), Stress (6 items), Engagement (8 items), Commitment (8 items). Report four alphas in your Chapter 4. Each subscale measures a different construct and deserves its own reliability check.' },
      ],
    },

    /* ════════════════════ 4. REVERSE CODING ════════════════════ */
    {
      id: 'reverse-coding',
      title: 'BEFORE running alpha — handle reverse-coded items',
      blocks: [
        { type: 'heading', level: 2, text: 'The most common reason alpha comes out wrong' },

        { type: 'paragraph', text:
          'Many well-designed Likert scales include items worded in the OPPOSITE direction to check that respondents are reading carefully. For a "job satisfaction" scale of mostly positive items like *"I enjoy my work"*, a researcher might insert one or two negative items like *"My supervisor IGNORES my concerns"*. A satisfied respondent should agree with the positive items and DISAGREE with the negative items.' },

        { type: 'paragraph', text:
          "But if you run Cronbach\'s alpha without first REVERSE-CODING the negative items, the alpha will come out low — because the negative items are pulling in the opposite direction from the rest. You will conclude the scale is unreliable when actually the items are perfectly consistent — you just had a coding direction issue." },

        { type: 'illustration', component: 'ReverseCoding',
          caption: 'Figure 2. Reverse-coding a negatively-worded item. On the LEFT: the original item asks about a NEGATIVE behaviour ("ignores my concerns"). A high score means a BAD supervisor — opposite to the rest of the scale. On the RIGHT: after recoding (1↔5, 2↔4, 3↔3), a high score now means a GOOD supervisor, matching the direction of the other items. Always recode before computing alpha.' },

        { type: 'heading', level: 3, text: 'How to reverse-code in SPSS' },

        { type: 'steps', steps: [
          { title: 'Open the recoding dialog',
            body: 'Transform → Recode into Different Variables… (NEVER use "Recode into Same Variables" — that overwrites your raw data permanently).' },
          { title: 'Move the negative item into the dialog',
            body: 'Click the negative item (e.g. sa_07) → click the arrow to move it to "Input Variable → Output Variable". On the right side, type a new name **sa_07_r** and a label **"I am ignored by my supervisor (REVERSE-CODED)"**. Click Change.' },
          { title: 'Click "Old and New Values…"',
            body: 'Define the recode mappings: Old=1 → New=5. Old=2 → New=4. Old=3 → New=3. Old=4 → New=2. Old=5 → New=1. Click Add after each pair. Then Continue.' },
          { title: 'Click OK',
            body: 'A new variable sa_07_r appears in your dataset. The original sa_07 is unchanged. Use sa_07_r (not sa_07) when running Cronbach\'s alpha.' },
        ]},

        { type: 'callout', tone: 'warning', title: 'Watch for negative items in YOUR questionnaire',
          body: "Before running alpha, read through your scale items carefully. For any item where DISAGREEING means more of the construct (e.g. high job satisfaction), that item needs reverse-coding. Common red flags: words like \"not\", \"never\", \"ignores\", \"avoids\", \"hates\", \"disappointed\". A scale of 10 items where 3 are negatively worded needs 3 recodes before you run alpha." },

        { type: 'reveal',
          prompt: "You ran Cronbach\'s alpha on a 10-item satisfaction scale and got α = .42. The Item-Total Statistics show item sa_07 has a Corrected Item-Total Correlation of −0.34 (NEGATIVE). What\'s most likely going on?",
          answer: "**sa_07 is a reverse-worded item that you forgot to recode.** Negative item-total correlations are the classic signature of an un-recoded reverse item — the item is correlating negatively with the rest of the scale because it asks the OPPOSITE question. The fix: identify the item, reverse-code it (Transform → Recode), and re-run alpha using the recoded version. The alpha will likely jump from .42 to .80 or higher." },
      ],
    },

    /* ════════════════════ 5. RUNNING IN SPSS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running Cronbach\'s alpha in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'The 6-step click path' },

        { type: 'paragraph', text:
          "Once reverse-coded items are handled, computing Cronbach\'s alpha takes under a minute." },

        { type: 'steps', steps: [
          { title: 'Open the Reliability dialog',
            body: 'Analyze → Scale → Reliability Analysis…' },
          { title: 'Move ALL the items of your scale into the "Items" box',
            body: 'Click each item (sa_01, sa_02, …, sa_07_r if reverse-coded, …, sa_10) and click the blue arrow. You need all items of THIS scale — and only this scale.' },
          { title: 'Confirm Model is set to "Alpha"',
            body: 'The "Model" dropdown defaults to "Alpha" (which IS Cronbach\'s alpha). Leave it. The other options (Split-half, Guttman, Parallel) are covered in the next lessons.' },
          { title: 'Type a scale label (optional but helpful)',
            body: 'In the "Scale label" field type a name like "Job satisfaction (8 items)". This appears in the output header.' },
          { title: 'Click Statistics… for Item-Total Statistics',
            body: 'A new dialog opens. Tick **"Scale if item deleted"** (essential for the next lesson). Tick **"Item"**, **"Scale"**, **"Correlations"**, and **"Inter-item Correlations"** if you want extra detail. Click Continue.' },
          { title: 'Click OK',
            body: 'SPSS produces three tables in the Output Viewer: Reliability Statistics (the alpha itself), Item Statistics, and Item-Total Statistics. The first table is what you report; the third is for diagnostic refinement (Lesson 2).' },
        ]},

        { type: 'illustration', component: 'MombasaCronbachDialog',
          caption: 'Figure 3. The Reliability Analysis dialog. The exclamation mark points to the "Statistics…" button — ALWAYS click this and tick "Scale if item deleted". Without it, you get only the alpha value and miss the diagnostic information that tells you which items might be problematic.' },


        { type: 'illustration', component: 'MombasaCronbachStats',
          caption: 'Figure 3. The Statistics sub-dialog. Tick Item + Scale + Scale if item deleted (highlighted gold as CRITICAL — without it you cannot do item-total analysis in the next lesson). Also tick Correlations under Summaries to see the inter-item correlation matrix.' },

      ],
    },

    /* ════════════════════ 6. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the Reliability Statistics output',
      blocks: [
        { type: 'heading', level: 2, text: 'The first table you look at' },

        { type: 'paragraph', text:
          "The most important output is the small **Reliability Statistics** table at the top. It contains two numbers: Cronbach\'s Alpha and the N of Items. That\'s it. From these two numbers you decide whether your scale is acceptable." },

        { type: 'illustration', component: 'MombasaCronbachOutput',
          caption: 'Figure 4. The Reliability Statistics output table. Two numbers: Cronbach\'s Alpha (.847 here — "good") and N of Items (8 in this scale). This is the table you report in your Chapter 4 methodology section.' },

        { type: 'heading', level: 3, text: 'Interpreting the alpha value' },

        { type: 'paragraph', text:
          'Alpha ranges from 0 to 1 (technically it can go slightly negative when items conflict badly, but that signals serious problems). Higher = better. Here are the widely-accepted benchmarks used in postgraduate research worldwide.' },

        { type: 'comparison',
          headers: ['Alpha value', 'Interpretation', 'What to do'],
          rows: [
            ['α ≥ .90', '**Excellent** — but watch out for redundancy', 'Report and use. But check the warning below about "too high".'],
            ['α ≥ .80', '**Good** reliability',                          'Report and use. Standard acceptable range for published research.'],
            ['α ≥ .70', '**Acceptable**',                                'Report and use. The minimum many journals accept for new scales.'],
            ['α ≥ .60', '**Questionable**',                              'Use with caution. Acknowledge in methodology. Consider improving items.'],
            ['α < .60', '**Unacceptable** for inferential analysis',     'Do NOT use the scale total in correlations/regression. Either drop weak items (Lesson 2) or redesign.'],
            ['α < 0',   '**Items conflict badly** — usually a recoding error', 'Check for un-recoded reverse items. Re-run after fixing.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'When alpha is "too high" — the redundancy warning',
          body: 'An alpha above .95 is suspicious. It usually means your items are NEARLY IDENTICAL — they ask the same thing in slightly different words. Examples: *"I am satisfied with my supervisor", "I feel good about my supervisor", "My supervisor is satisfactory to me"*. Three items, one essential question. Very high alpha = redundant items = wasted respondent time and effort. The ideal range for a well-designed scale is .80 to .90. If yours is .98, consider whether some items can be dropped.' },

        { type: 'why', body:
          'Alpha works by checking how much each item correlates with every other item. If 8 items all correlate highly with each other, alpha is high — the scale is internally consistent. If 8 items correlate weakly with each other, alpha is low — the scale is measuring different things or just noise. The "average inter-item correlation" is essentially what alpha summarises, adjusted for the number of items.' },

        { type: 'reveal',
          prompt: 'Your output shows Cronbach\'s Alpha = .73, N of Items = 10. How do you describe this in Chapter 4?',
          answer: "α = .73 falls in the **'acceptable' range** (≥ .70). The scale is reliable enough to use, though not in the 'good' (.80+) range. Standard write-up: *\"The 10-item job satisfaction scale demonstrated acceptable internal consistency reliability, Cronbach\'s α = .73.\"* You can use the scale total in further analyses (correlations, regression). If you want to push the alpha higher, Lesson 2 covers how to identify and remove weak items." },
      ],
    },

    /* ════════════════════ 7. CREATING THE SCALE TOTAL ════════════════════ */
    {
      id: 'creating-total',
      title: 'Creating the scale total or mean for further analysis',
      blocks: [
        { type: 'heading', level: 2, text: 'After alpha — compute the total' },

        { type: 'paragraph', text:
          "Once you have an acceptable alpha, the next step is to combine your 10 individual items into a single 'job satisfaction total' that you can use in correlations, regressions, t-tests, and ANOVAs. SPSS provides two options: sum the items into a TOTAL, or average them into a MEAN. Both are valid; pick one and stick with it." },

        { type: 'steps', steps: [
          { title: 'Open Compute Variable',
            body: 'Transform → Compute Variable…' },
          { title: 'Type a new variable name',
            body: 'In "Target Variable" type **sa_total** (or **sa_mean** if you prefer the average).' },
          { title: 'Type the formula in "Numeric Expression"',
            body: [
              '**For a total:** type `SUM(sa_01, sa_02, sa_03, sa_04_r, sa_05, sa_06, sa_07_r, sa_08)` (replacing names with your actual items, using the reverse-coded versions where applicable).',
              '**For a mean:** type `MEAN(sa_01, sa_02, sa_03, sa_04_r, sa_05, sa_06, sa_07_r, sa_08)` instead.',
            ]},
          { title: 'Click Type & Label and fill in a Label',
            body: 'Label = "Job satisfaction total score". Click Continue, then OK.' },
          { title: 'Verify in Variable View',
            body: 'Check that the new variable was created with Measure = Scale. You can now use sa_total in correlations, regressions, etc.' },
        ]},

        { type: 'comparison',
          headers: ['Use TOTAL', 'Use MEAN'],
          rows: [
            ['Range = items × min to items × max (e.g. 8 to 40 for 8 items 1–5)', 'Range = min to max of original scale (e.g. 1 to 5)'],
            ['Easier to compare with other studies using same scale',              'Easier to interpret intuitively ("average response was 4.2")'],
            ['Most published research reports totals',                             'Useful when items have missing data (mean handles them gracefully)'],
            ['Sensitive to missing data — one missing item = whole total missing', 'Robust to missing data — MEAN uses what is available'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Recommendation',
          body: 'For thesis work, **use MEAN if any items have missing data**, otherwise **use SUM**. Both give the same correlations and regression results (they are linearly related), so it does not matter mathematically — but mean is more forgiving when data is incomplete.' },
      ],
    },

    /* ════════════════════ 8. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing it up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'paragraph', text:
          'Reliability statements appear in your Methodology chapter (introducing the scale) and again briefly in your Results chapter (confirming the alpha for your specific sample).' },

        { type: 'heading', level: 3, text: 'Template — methodology chapter' },

        { type: 'apa', text:
          '[Scale name] was measured using the [N]-item [name of established scale or "custom-developed"] scale, with responses on a [1–5] Likert format ranging from [Strongly disagree] to [Strongly agree]. Sample items include "[example positive item]" and "[example negative item, marked as reverse-coded]". Negative items were reverse-coded prior to analysis. The scale demonstrated [acceptable/good/excellent] internal consistency reliability in the present study, Cronbach\'s α = [.XX].' },

        { type: 'heading', level: 3, text: 'A complete worked example' },

        { type: 'apa', text:
          'Job satisfaction was measured using the 8-item Job Satisfaction Survey (Spector, 1985), with responses on a 1–5 Likert format ranging from Strongly disagree to Strongly agree. Sample items include "I enjoy doing the things I do at work" and "My supervisor ignores my concerns" (reverse-coded). Negative items (items 4 and 7) were reverse-coded prior to analysis. The scale demonstrated good internal consistency reliability in the present study, Cronbach\'s α = .85.' },

        { type: 'heading', level: 3, text: 'Template — when you have multiple subscales' },

        { type: 'apa', text:
          'The questionnaire comprised [N] subscales. Internal consistency reliability for each subscale, computed in the present sample, was: [Subscale 1] α = .XX, [Subscale 2] α = .XX, [Subscale 3] α = .XX, [Subscale 4] α = .XX. All subscales met the conventional threshold for acceptable reliability (α ≥ .70).' },

        { type: 'callout', tone: 'success', title: 'The three details examiners look for',
          body: '**Number of items** (so they can verify against your questionnaire). **Direction of items** (so they know reverse-coding was handled). **Alpha value AND the descriptor** (e.g. ".85, good"). Hit all three and the reliability question is closed.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Did you reverse-code any items before computing alpha?',
              a: 'Yes — items 4 and 7 were negatively worded (e.g. "My supervisor ignores my concerns"). I created reverse-coded versions (sa_04_r and sa_07_r) using Transform → Recode into Different Variables, then included the reverse-coded versions in the alpha calculation. This is documented in Section 3.4 of the methodology chapter.' },
            { q: 'Why is your alpha for the Engagement subscale only .68?',
              a: 'The Engagement subscale, while close to the conventional .70 threshold, falls slightly below. I retained it because (a) it is a published scale with established validity from prior research; (b) two of the four items had marginally lower Corrected Item-Total Correlations (.31, .29), suggesting the scale is short — and short scales naturally yield lower alphas. I interpreted Engagement results with appropriate caution and noted this limitation in Chapter 5.' },
            { q: 'Why didn\'t you report alpha for individual demographic variables?',
              a: 'Cronbach\'s alpha is designed for multi-item scales measuring a single construct. Demographic variables (age, gender, county) are stand-alone variables, not part of a scale — alpha is not applicable. I reported descriptives (frequencies, means) for demographics instead.' },
          ]},
      ],
    },

    /* ════════════════════ 9. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five common mistakes',
      blocks: [
        { type: 'mistake',
          title: "Mistake 1 — Forgetting to reverse-code negative items",
          body: "Your alpha comes out at .42 and you panic, thinking the scale is broken. The Item-Total Statistics show one item has a NEGATIVE Corrected Item-Total Correlation — the classic sign of an un-recoded reverse item.",
          fix: 'BEFORE running alpha, identify every negatively-worded item in your scale. Use Transform → Recode into Different Variables to create _r versions. Use the _r versions (not the originals) in the Reliability dialog.' },

        { type: 'mistake',
          title: 'Mistake 2 — Running one alpha for a multi-subscale questionnaire',
          body: 'Your 30-item questionnaire has 4 subscales but you ran one alpha for all 30 items together and got .76. The number is meaningless because the items measure different constructs.',
          fix: 'Run alpha SEPARATELY for each subscale. Report 4 alphas in Chapter 4, one per subscale. The whole-questionnaire alpha (which is what you computed) is not a valid statistic.' },

        { type: 'mistake',
          title: 'Mistake 3 — Reporting alpha for a single Likert item',
          body: "Your supervisor asks for the reliability of the 'overall satisfaction' question — a single Likert item. You report alpha. But alpha requires AT LEAST two items.",
          fix: 'A single item has no internal consistency to measure. Either report test-retest reliability (re-administer the item to the same respondents weeks later and correlate) or acknowledge the limitation in your methodology. For thesis work, single-item measures are usually defended on the grounds of their face validity and existing literature.' },

        { type: 'mistake',
          title: 'Mistake 4 — Treating alpha as evidence of validity',
          body: 'You write: "The high alpha (.89) demonstrates that the scale validly measures customer loyalty." But alpha only shows reliability (consistency) — not validity (whether the scale actually measures customer loyalty rather than, say, general satisfaction).',
          fix: 'Report alpha as evidence of reliability ONLY. For validity, cite the original scale developers, report convergent/discriminant validity with other measures, or run a confirmatory factor analysis. Reliability is necessary but not sufficient for validity.' },

        { type: 'mistake',
          title: "Mistake 5 — Reporting alpha to four decimal places",
          body: 'Your output shows α = .8473. You report it as .8473 in Chapter 4. The extra decimals suggest false precision.',
          fix: "Always round Cronbach\'s alpha to **two decimal places** in your write-up. .85, not .8473. Reliability statistics are estimates; the third and fourth decimals are noise." },
      ],
    },

    /* ════════════════════ 10. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'heading', level: 2, text: 'What you should now be able to do' },

        { type: 'summary', items: [
          'Explain reliability as the property of giving the same answer when measuring the same thing the same way.',
          'Distinguish reliability from validity — alpha measures reliability ONLY.',
          'Recognise that Cronbach\'s alpha is for multi-item scales measuring ONE construct — never for single items, demographics, or multi-construct questionnaires.',
          'BEFORE running alpha, identify and reverse-code every negatively-worded item using Transform → Recode into Different Variables, creating _r versions.',
          'Run Cronbach\'s alpha via Analyze → Scale → Reliability Analysis, moving all items into the Items box and ticking "Scale if item deleted" in Statistics.',
          'Interpret alpha using the standard benchmarks: ≥.90 excellent (but watch redundancy), ≥.80 good, ≥.70 acceptable, ≥.60 questionable, <.60 unacceptable, <0 likely recoding error.',
          'Run alpha SEPARATELY for each subscale of a multi-subscale questionnaire and report each one.',
          'Compute the scale total or mean using Transform → Compute Variable for use in further analyses.',
          'Write up reliability using the APA template: scale name, number of items, direction of items, alpha value with descriptor.',
          'Avoid the five common mistakes — forgotten reverse coding, single-alpha for multi-subscale, alpha for single items, alpha as evidence of validity, over-precision in decimals.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: "In **Lesson 2: Item-total statistics** we dive into the diagnostic information from the same SPSS dialog. You\'ll learn how to identify weak items, when to drop them, and how to systematically improve a scale\'s alpha through item analysis. Then **Lesson 3** covers split-half reliability — an alternative reliability method that is sometimes requested as a robustness check." },

        { type: 'paragraph', text:
          "Before moving on, take a real multi-item scale from your own questionnaire. Identify any negatively-worded items. Reverse-code them. Run Cronbach\'s alpha. Note the value. Write one sentence in APA style. Then come back for the knowledge check." },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'heading', level: 2, text: 'Six quick questions' },

        { type: 'check',
          question: "Cronbach\'s alpha measures which of the following?",
          choices: [
            'Whether your scale measures what it claims to measure (validity)',
            'Whether your scale items are internally consistent — moving together to measure one construct (reliability)',
            'The size of your sample',
            'The mean of your scale',
          ],
          answer: 1,
          explanation: 'Cronbach\'s alpha measures **internal consistency reliability** — do all the items in the scale move together, suggesting they tap into the same underlying construct? It does NOT measure validity (whether the scale measures what it CLAIMS to measure). High alpha + evidence of validity = a trustworthy scale.' },

        { type: 'check',
          question: 'Your scale has 10 items. Three of them are negatively worded. What MUST you do before computing alpha?',
          choices: [
            'Delete the negative items',
            'Reverse-code the negative items using Transform → Recode into Different Variables, then use the recoded versions in the alpha calculation',
            'Nothing — SPSS handles this automatically',
            'Run alpha twice and average the results',
          ],
          answer: 1,
          explanation: 'Negative items must be reverse-coded before alpha. Otherwise they pull in the opposite direction from positive items, dragging alpha way down. Create _r versions using Transform → Recode into Different Variables (NEVER overwrite originals), then use the _r versions in the Reliability dialog. The classic symptom of a forgotten reverse-code is a NEGATIVE Corrected Item-Total Correlation in the output.' },

        { type: 'check',
          question: "Your output shows Cronbach\'s α = .73 for a 10-item scale. How would you describe this in Chapter 4?",
          choices: [
            'Excellent reliability — the scale is publishable',
            'Acceptable internal consistency reliability — the scale is usable for further analysis',
            'Unacceptable — redesign the scale',
            'Cannot be interpreted',
          ],
          answer: 1,
          explanation: 'α = .73 falls in the **"acceptable" range** (≥ .70). It is usable for further analysis (correlations, regression). The standard descriptors: ≥.90 excellent, ≥.80 good, ≥.70 acceptable, ≥.60 questionable, <.60 unacceptable. Always use these descriptors alongside the number.' },

        { type: 'check',
          question: "You ran alpha and got α = −.31. What\'s the most likely explanation?",
          choices: [
            'The scale is unusually bad',
            'You forgot to reverse-code one or more negatively-worded items, so they correlate negatively with the rest of the scale',
            'SPSS has a bug',
            'Your sample is too small',
          ],
          answer: 1,
          explanation: 'A negative alpha is almost always a coding error. The most common cause: one or more reverse-worded items were not recoded before computing alpha. Check the Item-Total Statistics — any item with a negative Corrected Item-Total Correlation is the culprit. Recode it, re-run alpha, and the value should jump back to a sensible positive number.' },

        { type: 'check',
          question: 'Your questionnaire has 4 subscales: Satisfaction (8 items), Stress (6 items), Engagement (8 items), Commitment (8 items). How many alphas should you report?',
          choices: [
            'One for all 30 items together',
            'Four — one alpha per subscale, since each measures a different construct',
            'One for each item (30 alphas)',
            'No alpha needed',
          ],
          answer: 1,
          explanation: 'Alpha measures the consistency of items measuring ONE construct. With 4 subscales measuring 4 different constructs, you run alpha 4 times — once per subscale. Report all four in Chapter 4. A single alpha for all 30 items would be mathematically valid but conceptually meaningless because the items measure different things.' },

        { type: 'check',
          question: 'Your alpha = .97 for an 8-item scale. What does this WARN you about?',
          choices: [
            'Your alpha is too low',
            'Your items may be REDUNDANT — they ask almost the same question in slightly different words. Consider whether some items can be dropped.',
            'The scale is perfect — report as-is',
            'You need more respondents',
          ],
          answer: 1,
          explanation: 'Alpha above .95 is suspiciously high. It usually means items are near-duplicates. While not "wrong", redundant items waste respondent time and add no information. The ideal range for a well-designed scale is .80–.90. If your alpha is .97, look at the items — chances are you can drop 1 or 2 without losing meaning, and your scale will become more efficient.' },
      ],
    },
  ],
};
