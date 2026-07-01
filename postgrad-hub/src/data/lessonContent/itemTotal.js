/**
 * Reliability Testing · Lesson 2 — Item-Total Statistics
 * The diagnostic table that lets you improve a scale by spotting weak items.
 */

export const ITEM_TOTAL_LESSON = {
  id: 'rel-2',
  title: 'Item-total statistics',
  subtitle: 'Module 03 · Course: Reliability Testing · Lesson 2 of 3',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When alpha is mediocre — diagnose, don\'t panic',
      blocks: [
        { type: 'scene', body: [
          'You ran Cronbach\'s alpha on your 10-item burnout scale. The output says α = .62. Just below the acceptable .70 threshold. You stare at the screen. Do you drop the whole scale? Redesign it? Push on and hope the examiner does not notice?',
          'None of those. The right next step is to look ONE table further down in the SPSS output — the **Item-Total Statistics** table. It tells you exactly which items are pulling alpha down, by how much, and what would happen if you removed each one. Often, removing a single weak item bumps alpha from .62 to .81 — and you have a publishable scale.',
          'This lesson teaches you to read the Item-Total Statistics table, identify weak items using the two diagnostic columns that matter, decide whether to drop them, and document the decision in your methodology. It is the difference between a thesis that says "the scale was unreliable" (which is bad) and one that says "iterative item analysis improved the scale\'s reliability from α = .62 to α = .81 by removing one item with poor item-total correlation" (which sounds expert).',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Read every column** of the SPSS Item-Total Statistics table and explain what each one shows.',
            '**Identify weak items** using the two diagnostic columns that matter: Corrected Item-Total Correlation and Cronbach\'s α if Item Deleted.',
            '**Decide systematically** whether to drop an item, using clear rules of thumb.',
            '**Iteratively improve** a scale by removing one weak item at a time, re-running alpha, and re-checking.',
            '**Know when to STOP** dropping items — over-pruning is its own mistake.',
            '**Document item-removal decisions** in your methodology chapter using the standard APA template.',
            '**Avoid the four mistakes** that turn item analysis from a strength into a weakness in your thesis.',
          ]},

        { type: 'why', body:
          'Examiners reward students who SHOW their reasoning. A student who runs alpha, gets .62, and reports "α = .62" looks like they did not investigate. A student who runs alpha, gets .62, examines the Item-Total Statistics, finds one weak item, removes it, gets .81, and DOCUMENTS the process looks like a real researcher. Same data, completely different impression.' },
      ],
    },

    /* ════════════════════ 2. THE TABLE EXPLAINED ════════════════════ */
    {
      id: 'the-table',
      title: 'The Item-Total Statistics table — every column explained',
      blocks: [
        { type: 'heading', level: 2, text: 'Five columns, two that really matter' },

        { type: 'paragraph', text:
          'When you tick "Scale if item deleted" in the Reliability Analysis Statistics dialog (Lesson 1), SPSS produces the Item-Total Statistics table. It has one row per item in your scale and five columns of diagnostics. Most beginners read it left to right and get lost in the first three columns. Save your attention for the last two — they are the only ones that drive decisions.' },

        { type: 'illustration', component: 'ItemTotalStatistics',
          caption: 'Figure 1. The Item-Total Statistics table for an 8-item job satisfaction scale. Item sa_04 is highlighted in red — its Corrected Item-Total Correlation is only .12 (well below .30), and Cronbach\'s α if Item Deleted is .88 (higher than the current overall α = .85). These two warning signs together say: dropping sa_04 would IMPROVE the scale.' },

        { type: 'comparison',
          headers: ['Column', 'What it shows', 'How much you care'],
          rows: [
            ['**Scale Mean if Item Deleted**',                  'What the scale total mean would become if you removed this item.',                                   'Low — informational only.'],
            ['**Scale Variance if Item Deleted**',              'What the scale variance would become if you removed this item.',                                    'Low — informational only.'],
            ['**Corrected Item-Total Correlation (CITC)**',      'How strongly this item correlates with the SUM of the other items. Higher = item belongs.',          '**HIGH — this is diagnostic 1.**'],
            ['**Squared Multiple Correlation**',                'How well this item can be predicted from the other items combined. Higher = more redundant.',         'Low — usually ignored.'],
            ['**Cronbach\'s α if Item Deleted**',                'What the scale\'s alpha would become if you removed this item.',                                     '**HIGH — this is diagnostic 2.**'],
          ]},

        { type: 'heading', level: 3, text: 'Diagnostic 1 — Corrected Item-Total Correlation (CITC)' },

        { type: 'paragraph', text:
          'The CITC is essentially the correlation between this item\'s scores and the total scores of all the OTHER items combined (the "corrected" part means the item itself is excluded from the total, so the correlation is not artificially inflated). It answers the question: *"How well does this item track with the rest of the scale?"*' },

        { type: 'list', items: [
          '**CITC ≥ .50** → item is strongly tracking the scale, definitely belongs.',
          '**CITC .30 to .50** → item is acceptable, belongs in most cases.',
          '**CITC .20 to .30** → item is weak, consider removing.',
          '**CITC < .20** → item is essentially unrelated to the scale, almost always remove.',
          '**CITC < 0 (negative)** → item is INVERSELY correlated with the scale — usually a forgotten reverse-code.',
        ]},

        { type: 'heading', level: 3, text: 'Diagnostic 2 — Cronbach\'s α if Item Deleted' },

        { type: 'paragraph', text:
          'This column shows what alpha would become if you removed each item, one at a time. Compare each value to the OVERALL alpha at the top of the output:' },

        { type: 'list', items: [
          'If "α if Item Deleted" is **LOWER than overall α** → keep the item (it is contributing positively).',
          'If "α if Item Deleted" is **about the same as overall α** → item is neutral; keeping or removing makes little difference.',
          'If "α if Item Deleted" is **HIGHER than overall α** → removing this item would IMPROVE the scale — strongly consider dropping it.',
        ]},

        { type: 'callout', tone: 'gold', title: 'The combined rule for dropping an item',
          body: 'Drop an item when BOTH diagnostics agree: **CITC < .30** AND **α if Item Deleted > overall α**. If only one of those signals fires, the case is weaker — investigate the item content but consider keeping it. If both fire together, removal is clearly justified.' },
      ],
    },

    /* ════════════════════ 3. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — rescuing a mediocre scale',
      blocks: [
        { type: 'workedExample', title: 'An 8-item job satisfaction scale with one weak item',
          body: [
            { label: 'The starting situation',
              text: 'You ran Cronbach\'s alpha on the 8-item Job Satisfaction Survey for your 198 respondents. The output: **α = .85, N = 8 items**. That is already "good" — but you notice from the Item-Total Statistics that one item looks suspicious.' },
            { label: 'Reading the diagnostic table (Figure 1 above)',
              text: 'Most items have CITC values between .49 and .71 — healthy contributors. But sa_04 stands out: **CITC = .12** (well below .30) and **α if Item Deleted = .88** (higher than overall .85). Two warning signs together.' },
            { label: 'Inspecting the item content',
              text: 'You re-read item sa_04: *"I receive enough training opportunities at work"*. The other 7 items are all about feelings towards the work itself, the supervisor, and colleagues. sa_04 is about training resources — a related but distinct topic. It is conceptually an outlier from the construct of "job satisfaction" as the rest of the scale measures it.' },
            { label: 'The decision',
              text: 'You decide to drop sa_04. You re-run Cronbach\'s alpha with only the remaining 7 items (sa_01, sa_02, sa_03, sa_05, sa_06, sa_07, sa_08). New output: **α = .88, N = 7 items**. Cleaner scale, slightly higher alpha, and a defensible reason for the change.' },
            { label: 'Writing it up',
              text: 'In Chapter 3 you write: *"Initial reliability analysis of the 8-item scale yielded α = .85. Item analysis revealed that item 4 (training opportunities) had a low Corrected Item-Total Correlation (.12) and removing it would increase alpha to .88, suggesting it tapped a related but distinct construct. The item was therefore dropped from the scale total, leaving 7 items with α = .88. All subsequent analyses use the 7-item version."*' },
          ]},

        { type: 'reveal',
          prompt: 'Your scale has α = .76. The Item-Total Statistics show one item with CITC = .25 but α if Item Deleted = .76 (same as overall). Should you drop this item?',
          answer: '**Probably keep it — the case for dropping is weak.** CITC is on the low side (.25) but α if Item Deleted is identical to overall α. Removing the item would change nothing — α stays at .76. The item is neutral, not harmful. Dropping it would simply make your scale shorter without improving reliability. Unless the item content is also clearly off-topic, leave it in. The two-condition rule (CITC < .30 AND α if Item Deleted > α) needs BOTH signals — when only one fires weakly, the safe choice is to keep.' },
      ],
    },

    /* ════════════════════ 4. ITERATIVE REFINEMENT ════════════════════ */
    {
      id: 'iterative',
      title: 'Iterative refinement — drop one at a time, then re-run',
      blocks: [
        { type: 'heading', level: 2, text: 'Never drop two items at once' },

        { type: 'paragraph', text:
          'A common temptation when you see a Item-Total Statistics table with three weak items is to drop all three at once. **Resist this.** Drop ONE item — the worst one — then re-run the analysis. Why? Because removing an item changes the entire scale, including the diagnostics for every other item. An item that looked weak with the full scale might look fine after the worst one is removed. Iterative refinement is more accurate.' },

        { type: 'steps', steps: [
          { title: 'Identify the WORST item',
            body: 'Lowest CITC + highest α if Item Deleted (relative to overall). Pick ONE.' },
          { title: 'Inspect its content',
            body: 'Re-read the actual question wording. Does it conceptually belong? Is it ambiguously worded? Does it ask two things at once? Sometimes the diagnostic flags an item that, on reflection, you can see was poorly written.' },
          { title: 'If you decide to drop it, re-run alpha WITHOUT that item',
            body: 'Open Reliability Analysis → remove the item from the Items box → click OK. New alpha + new Item-Total Statistics appear.' },
          { title: 'Check the new diagnostics',
            body: 'Are any other items still weak? Often the table looks completely different. The two items that looked weak before may now look fine because the truly-bad item is gone.' },
          { title: 'Stop dropping when alpha is acceptable AND no items are clearly weak',
            body: 'Reaching α ≥ .80 with all CITC values ≥ .30 is a healthy stopping point. Continuing to drop items below this becomes scale-mutilation.' },
        ]},

        { type: 'callout', tone: 'warning', title: 'Know when to stop',
          body: 'Each item you drop makes the scale shorter and the construct slightly narrower. A 10-item scale that becomes 5 items might have a higher alpha BUT measures only half of what the original scale was designed to measure. The published version of a scale almost always has higher validity than a stripped-down "high-alpha" version. If you must drop more than 20-30% of items to reach acceptable alpha, the scale itself may be the problem — consider whether it is appropriate for your sample at all.' },

        { type: 'heading', level: 3, text: 'When the original scale is established and validated' },

        { type: 'paragraph', text:
          "If you are using a well-established published scale (e.g. Maslach Burnout Inventory, Spector\'s Job Satisfaction Survey), think TWICE before dropping items. The scale was validated as a whole. Dropping items may technically raise alpha in your sample but breaks compatibility with prior research using the full scale. Many examiners prefer to see the published version reported AS-IS, with reliability honestly acknowledged, rather than a modified shorter version with cosmetically higher alpha." },

        { type: 'mistake',
          title: 'Dropping items just to push alpha above .70',
          body: "Your scale has α = .68. You drop two items to get α = .76. But the dropped items were essential parts of the original validated scale; you have changed the construct.",
          fix: "If a validated scale gives α = .68 in your sample, REPORT IT HONESTLY. Acknowledge in your Limitations: 'The Maslach Burnout Inventory yielded somewhat lower reliability in this sample (α = .68) than in published validation studies (typical α = .87), possibly due to translation effects or the specific sub-population studied. Findings using this scale should be interpreted with appropriate caution.' Honesty + caveat beats cosmetic surgery on a validated scale." },
      ],
    },

    /* ════════════════════ 5. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing item analysis up in your thesis',
      blocks: [
        { type: 'heading', level: 2, text: 'Two scenarios, two templates' },

        { type: 'heading', level: 3, text: 'Scenario A — All items retained' },

        { type: 'apa', text:
          'Cronbach\'s alpha for the [N]-item [scale name] was [.XX] in the present sample, indicating [acceptable/good/excellent] internal consistency. All items showed Corrected Item-Total Correlations above the conventional .30 threshold (range: .XX to .XX), and removing any single item would not have substantially improved alpha. All [N] items were therefore retained for the scale total.' },

        { type: 'apa', text:
          'Cronbach\'s alpha for the 10-item Workplace Engagement Scale was .82 in the present sample, indicating good internal consistency. All items showed Corrected Item-Total Correlations above the conventional .30 threshold (range: .42 to .71), and removing any single item would not have substantially improved alpha (all α if Item Deleted values fell between .79 and .82). All 10 items were therefore retained for the scale total.' },

        { type: 'heading', level: 3, text: 'Scenario B — Some items dropped after item analysis' },

        { type: 'apa', text:
          'Initial reliability analysis of the [N]-item scale yielded α = [.XX]. Item analysis revealed that item [X] ("[item wording]") had a Corrected Item-Total Correlation of only [.XX], substantially below the conventional .30 threshold, and removing it would raise alpha to [.XX]. Inspection of the item content suggested it tapped a related but distinct construct ([explain]). The item was therefore dropped from the scale total. The remaining [N−1] items demonstrated [good/acceptable] reliability, α = [.XX].' },

        { type: 'apa', text:
          'Initial reliability analysis of the 8-item Job Satisfaction Survey yielded α = .65. Item analysis revealed that item 4 ("I receive enough training opportunities at work") had a Corrected Item-Total Correlation of only .12, substantially below the conventional .30 threshold, and removing it would raise alpha to .81. Inspection of the item content suggested it tapped training resources, a related but conceptually distinct construct from the other items, which focused on satisfaction with work, supervisor, and colleagues. The item was therefore dropped from the scale total. The remaining 7 items demonstrated good reliability, α = .81.' },

        { type: 'callout', tone: 'success', title: 'Four ingredients of a strong item-analysis paragraph',
          body: [
            '**State the initial alpha** so the reader sees where you started.',
            '**Name the item being removed** AND quote its wording so the reader can judge whether the removal is reasonable.',
            '**Give the specific diagnostic values** (CITC and α if Item Deleted) so the decision is data-driven.',
            '**Explain WHY conceptually** — what the item was about and why removing it makes sense.',
            'Done in 3-4 sentences. The whole paragraph fits in a Methodology chapter without disrupting flow.',
          ]},

        { type: 'reviewerComments',
          items: [
            { q: 'You dropped item 4. Was this decision data-driven or post-hoc?',
              a: 'Both. The data showed item 4 had Corrected Item-Total Correlation = .12 (below the conventional .30 threshold) and that removing it would raise α from .65 to .81. I then inspected the item content and found it conceptually tapped a related but distinct construct (training resources rather than core job satisfaction). The decision combined statistical evidence with theoretical reasoning, both documented in Section 3.4.' },
            { q: 'Why did you not drop more items to push alpha even higher?',
              a: 'After removing item 4, all remaining items had Corrected Item-Total Correlations above .49, and no further single removal would raise alpha above .82. Further item removal would have shortened the scale without improving reliability and risked narrowing the construct beyond what the original scale developers intended. Seven items with α = .81 is a healthy stopping point.' },
            { q: 'How does your modified 7-item scale compare to the published 8-item version?',
              a: 'The 7-item version omits item 4 but retains the other seven items in their original form. Correlation between scale totals computed with and without item 4 was r = .98 in this sample, suggesting the two versions are essentially interchangeable for the constructs being measured here. Where comparisons with published findings are appropriate, I note this modification explicitly.' },
          ]},
      ],
    },

    /* ════════════════════ 6. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common item-analysis mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Dropping multiple items in one go',
          body: 'You see three items with CITC < .30 and remove all three at once. Your alpha jumps to .92. But you have no idea whether items 2 and 3 were really weak, or just looked weak because item 1 was contaminating the diagnostics.',
          fix: 'Drop ONE item at a time. Re-run alpha. Check the new Item-Total Statistics. Decide whether the second-worst item is still weak. Only then consider another removal. Iterative refinement is more accurate AND more defensible.' },

        { type: 'mistake',
          title: 'Mistake 2 — Dropping items to chase alpha above .70 with no theoretical reason',
          body: 'Your scale has α = .68. You drop the item with the lowest CITC and alpha rises to .73. You report .73. But the dropped item was a core part of the original validated scale, and you have not explained why removing it makes conceptual sense.',
          fix: 'Item removal must be both statistically supported AND theoretically defensible. If you cannot explain in one sentence why the item conceptually does not belong, do not remove it. Report the lower alpha honestly with a Limitations comment.' },

        { type: 'mistake',
          title: 'Mistake 3 — Looking at "Scale Mean if Item Deleted" instead of CITC',
          body: 'You spend ten minutes squinting at the first two columns of the Item-Total Statistics table, trying to figure out what they mean for item removal. They are essentially informational — they do not drive decisions.',
          fix: 'Focus on the last two columns: **Corrected Item-Total Correlation** and **Cronbach\'s α if Item Deleted**. Those are the diagnostics that matter. The mean and variance columns are just there for completeness.' },

        { type: 'mistake',
          title: 'Mistake 4 — Removing items without documenting in the methodology',
          body: 'You drop two items, get a higher alpha, and report only the final alpha. Your examiner notices the scale you ran is shorter than the published version and asks why.',
          fix: 'ALWAYS document item removal in Chapter 3 (Methodology). Name the items dropped, quote their wording, give the diagnostic values, explain conceptually why removal made sense. Transparency turns a potential criticism into a demonstration of methodological care.' },
      ],
    },

    /* ════════════════════ 7. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Read the Item-Total Statistics table\'s five columns, focusing on the two that drive decisions: Corrected Item-Total Correlation (CITC) and Cronbach\'s α if Item Deleted.',
          'Use CITC benchmarks: ≥.50 strong, .30-.50 acceptable, .20-.30 weak, <.20 essentially unrelated, <0 likely a forgotten reverse-code.',
          'Compare "α if Item Deleted" to overall α: if dropping the item would raise α, the item is dragging the scale down.',
          'Apply the combined rule: drop an item when BOTH diagnostics agree — CITC < .30 AND α if Item Deleted > overall α.',
          'Iteratively refine: drop ONE item at a time, re-run, check the new diagnostics. Never drop two items in one go.',
          'Know when to stop — reaching α ≥ .80 with all CITC values ≥ .30 is a healthy stopping point; further pruning is mutilation.',
          'For established validated scales, prefer reporting the original alpha honestly (with caveats if low) over modifying to chase higher numbers.',
          'Document item-removal decisions in the methodology with the four ingredients: initial α, item name + wording, diagnostic values, conceptual reason.',
          'Avoid the four mistakes — multi-item drops, alpha-chasing without theory, focusing on the wrong columns, undocumented removals.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 3: Split-half reliability** — the final lesson of the Reliability Testing course — we cover an alternative reliability method. Split-half divides your scale into two halves, correlates them, and adjusts the result. It is sometimes requested as a robustness check alongside Cronbach\'s alpha, especially when your scale has many items.' },

        { type: 'paragraph', text:
          'Before moving on, take a multi-item scale from your dataset, run Cronbach\'s alpha with "Scale if item deleted" ticked, and examine the Item-Total Statistics table. Identify the weakest item (lowest CITC). Decide — based on the two-diagnostic rule and your knowledge of the item content — whether you would drop it. Write one sentence explaining your decision. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 8. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'Which two columns of the Item-Total Statistics table actually drive item-removal decisions?',
          choices: [
            'Scale Mean if Item Deleted, Scale Variance if Item Deleted',
            'Corrected Item-Total Correlation, Cronbach\'s α if Item Deleted',
            'Item, Scale label',
            'Squared Multiple Correlation, Scale Mean if Item Deleted',
          ],
          answer: 1,
          explanation: 'The two columns that matter are **Corrected Item-Total Correlation (CITC)** — how well the item tracks with the rest of the scale — and **Cronbach\'s α if Item Deleted** — what alpha would become if you removed this item. Together they tell you whether dropping the item would improve the scale.' },

        { type: 'check',
          question: 'You see an item with Corrected Item-Total Correlation = .14 and α if Item Deleted = .89 (overall α = .76). Should you consider dropping it?',
          choices: [
            'No — CITC is fine',
            'Yes — both diagnostics agree: low CITC (< .30) AND α would improve if dropped (.89 > .76)',
            'No — never drop items',
            'Cannot tell from this information',
          ],
          answer: 1,
          explanation: 'Both warning signs are firing strongly. CITC of .14 is well below .30 (essentially unrelated to the rest of the scale). Dropping it would raise α from .76 to .89 — a substantial improvement. The combined rule says: drop it (after also checking the item content makes conceptual sense to remove).' },

        { type: 'check',
          question: 'You see three items with CITC < .30. What should you do?',
          choices: [
            'Drop all three at once',
            'Drop the WORST one (lowest CITC), re-run alpha, check the new Item-Total Statistics, then decide about the others',
            'Drop none — keep all items',
            'Average their CITCs',
          ],
          answer: 1,
          explanation: 'Always drop ONE item at a time. Removing an item changes the diagnostics for every other item — items that looked weak with the full scale may look fine after the worst is gone. Iterative refinement is more accurate. After dropping the worst, re-run and only consider another removal if its CITC is still weak.' },

        { type: 'check',
          question: 'You see an item with a NEGATIVE Corrected Item-Total Correlation (CITC = −.35). What is the most likely problem?',
          choices: [
            'The scale is broken',
            'You forgot to reverse-code a negatively-worded item',
            'Sample size too small',
            'SPSS has a bug',
          ],
          answer: 1,
          explanation: 'A negative CITC means the item is correlating in the OPPOSITE direction from the rest of the scale — the classic signature of an un-recoded reverse-worded item. Find the item, check its wording, reverse-code it using Transform → Recode into Different Variables, then re-run the alpha analysis using the recoded version.' },

        { type: 'check',
          question: 'Your scale has α = .68. You drop two items based on CITC alone (no conceptual review), getting α = .76. What is the methodological problem?',
          choices: [
            'There is no problem',
            'Item removal must be both statistically supported AND theoretically defensible. Cosmetic alpha-chasing without conceptual reasoning weakens the validity of your scale.',
            'You should have dropped more items',
            'You should have dropped fewer items',
          ],
          answer: 1,
          explanation: 'Statistical evidence alone is not enough. Each removed item must conceptually make sense to remove — perhaps it taps a related but distinct construct, or it is ambiguously worded. Without that conceptual justification, you have shortened a validated scale to chase a number, which examiners notice and criticise. Always combine statistical AND conceptual reasoning when removing items.' },
      ],
    },
  ],
};
