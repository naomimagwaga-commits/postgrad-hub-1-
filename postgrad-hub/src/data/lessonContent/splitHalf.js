/**
 * Reliability Testing · Lesson 3 — Split-half reliability
 * Alternative reliability method. The final lesson of Reliability Testing.
 */

export const SPLIT_HALF_LESSON = {
  id: 'rel-3',
  title: 'Split-half reliability',
  subtitle: 'Module 03 · Course: Reliability Testing · Lesson 3 of 3',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'A second opinion on your scale\'s reliability',
      blocks: [
        { type: 'scene', body: [
          'You report Cronbach\'s alpha = .82 for your 10-item engagement scale. Your supervisor reads Chapter 3, nods, then writes in the margin: *"Could you also report the split-half reliability as a robustness check?"*',
          'You stare at the comment. Split-half? You vaguely remember it from a methods class — something about dividing items into halves and comparing them. You wonder why anyone needs two reliability measures when alpha is already there.',
          'Split-half is the OLDER reliability method. It pre-dates Cronbach\'s alpha by about 30 years. It is conceptually simpler: split your scale in two, compute a total for each half, correlate the two halves. The correlation IS the split-half reliability. A supervisor or examiner who asks for split-half is usually requesting it as a **second opinion** alongside alpha — does a different method agree?',
          'This short lesson teaches you what split-half measures, how to run it in SPSS (it lives in the same Reliability menu), how to interpret the value, and when reporting it adds value to your thesis.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Explain what split-half reliability is** and how it differs from Cronbach\'s alpha.',
            '**Recognise when to report it** — usually as a robustness check alongside alpha, especially for long scales.',
            '**Run it in SPSS** via Analyze → Scale → Reliability Analysis → Model = Split-half.',
            '**Read the output** — the Spearman-Brown coefficient is what you typically report.',
            '**Interpret the value** using the same benchmarks as Cronbach\'s alpha (.70 acceptable, .80 good, .90 excellent).',
            '**Write up split-half results** in Chapter 4 alongside Cronbach\'s alpha.',
          ]},

        { type: 'why', body:
          'Split-half is less frequently reported than alpha in modern research, but it remains a useful robustness check — especially when supervisors specifically request it, when you have a long scale, or when you want to demonstrate that reliability holds up under different computation methods. Knowing both methods makes you a more complete researcher.' },
      ],
    },

    /* ════════════════════ 2. WHAT IS SPLIT-HALF ════════════════════ */
    {
      id: 'what-is-split-half',
      title: 'What split-half reliability actually measures',
      blocks: [
        { type: 'heading', level: 2, text: 'The intuition first' },

        { type: 'paragraph', text:
          'Imagine you take your 10-item engagement scale and split it into two halves of 5 items each. If the scale is reliable — measuring the same construct consistently — the two halves should give similar scores for the same person. A respondent with high engagement should score high on both halves. A respondent with low engagement should score low on both halves. The correlation between the two-half scores IS the split-half reliability.' },

        { type: 'analogy', title: 'Two referees scoring the same gymnast',
          body: 'In Olympic gymnastics, two referees score the same routine. If both are using the same criteria reliably, their scores should be close — a 9.4 from referee 1 and a 9.5 from referee 2. High agreement between referees means the scoring is reliable. Split-half is the same idea — two halves of your scale are like two referees scoring the same respondent. If the halves agree, the scale is reliable.' },

        { type: 'illustration', component: 'SplitHalfLogic',
          caption: 'Figure 1. How split-half reliability works. The 10-item scale is split into Half A (odd-numbered items) and Half B (even-numbered items). A total is computed for each half. The correlation between Total A and Total B — the split-half reliability — measures whether the two halves give consistent scores for the same respondents.' },

        { type: 'definition', term: 'Split-half reliability (Spearman-Brown corrected)',
          body: 'The correlation between two halves of a scale, mathematically adjusted using the Spearman-Brown formula to estimate what the reliability would be for the FULL-LENGTH scale. The Spearman-Brown correction is necessary because shorter scales are inherently less reliable than longer ones — without the correction, you would be reporting the reliability of HALF your scale, not the whole.' },

        { type: 'heading', level: 3, text: 'How SPSS splits the scale' },

        { type: 'paragraph', text:
          'SPSS uses a specific splitting rule: items are split based on their ORDER in the Items box. For a 10-item scale, items 1-5 go into Half 1 and items 6-10 go into Half 2. This is called a "first-half / second-half" split, and it works well if your items were ordered randomly. If your items follow a logical structure (the first 5 are easy and the last 5 are hard), this split is biased — Half 1 and Half 2 measure different things.' },

        { type: 'callout', tone: 'info', title: 'The odd-even alternative',
          body: 'Many textbooks describe split-half using ODD vs EVEN items (item 1 → Half A, item 2 → Half B, item 3 → Half A, etc.) because this is less likely to be biased by item ordering. SPSS does not do this automatically — it uses first-half / second-half. If item ordering in your scale matters, manually arrange the items in your Items box so the first half and second half are conceptually balanced.' },
      ],
    },

    /* ════════════════════ 3. CRONBACH VS SPLIT-HALF ════════════════════ */
    {
      id: 'comparison',
      title: 'Cronbach\'s alpha vs split-half — which to use',
      blocks: [
        { type: 'heading', level: 2, text: 'A quick comparison' },

        { type: 'comparison',
          headers: ['Feature', 'Cronbach\'s alpha', 'Split-half (Spearman-Brown)'],
          rows: [
            ['What it averages', 'The reliability across ALL possible ways of splitting the scale.', 'The reliability of ONE specific split.'],
            ['Year proposed', '1951 (Cronbach)',                       '1910 (Spearman & Brown)'],
            ['How often reported in modern research', 'Almost always',  'Less commonly — often as a robustness check.'],
            ['Sensitive to item ordering', 'No',                        'Yes (uses first half vs second half).'],
            ['Needs all items the same direction (reverse-coded)', 'Yes', 'Yes — same coding requirements as alpha.'],
            ['When to prefer it',  'Default reliability statistic for almost any multi-item scale.', 'When supervisor/journal requests it, when scale is very long (50+ items), as a robustness check.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'The practical answer',
          body: '**For almost every postgraduate thesis: report Cronbach\'s alpha as the primary reliability statistic.** Add split-half ONLY if (a) your supervisor or journal specifically requests it, or (b) you want to demonstrate robustness — that two different reliability methods give similar values. The two methods almost always agree closely, so reporting both is a "belt and braces" reassurance.' },

        { type: 'why', body:
          'If split-half agrees with alpha (both .82, say), it confirms reliability is real, not an artefact of one statistical method. If they disagree (alpha = .82 but split-half = .59), something is wrong — usually a biased first-half / second-half split because your items are ordered by difficulty or topic. Investigating the discrepancy is informative.' },
      ],
    },

    /* ════════════════════ 4. RUNNING IT IN SPSS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running split-half reliability in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'Same dialog, different Model setting' },

        { type: 'paragraph', text:
          'Split-half lives in the SAME menu as Cronbach\'s alpha. The only difference is the "Model" dropdown.' },

        { type: 'steps', steps: [
          { title: 'Open the Reliability dialog',
            body: 'Analyze → Scale → Reliability Analysis.' },
          { title: 'Move ALL items into the Items box',
            body: 'Same items you would use for Cronbach\'s alpha — including any reverse-coded versions.' },
          { title: 'Change the Model dropdown from "Alpha" to "Split-half"',
            body: 'This is the ONLY difference from running Cronbach\'s alpha. The dropdown is in the middle of the dialog.' },
          { title: 'Optional — verify your item ordering',
            body: 'Because SPSS uses first-half / second-half splitting, the order of items in the Items box matters. If your scale has items grouped by topic, rearrange so the first half and second half are balanced. You can drag items up and down in the Items box.' },
          { title: 'Click OK',
            body: 'SPSS produces a Reliability Statistics table containing multiple correlation values — see the next section for how to read them.' },
        ]},

        { type: 'callout', tone: 'info', title: 'You do NOT need to manually split the items',
          body: 'A common beginner mistake is to manually compute two SUM variables (sa_half1 = SUM of first 5 items, sa_half2 = SUM of last 5 items) and then run Pearson correlation. SPSS does all this internally when you pick Model = Split-half. Save yourself the work — let the menu do it.' },
      ],
    },

    /* ════════════════════ 5. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading',
      title: 'Reading the split-half output — six numbers, one that matters',
      blocks: [
        { type: 'heading', level: 2, text: 'What SPSS prints for split-half' },

        { type: 'paragraph', text:
          'The split-half Reliability Statistics output is busier than the simple alpha output. It contains six values. Most beginners are confused by them. Save your attention for ONE specific value — the **Spearman-Brown Coefficient (Equal Length)** — which is what you report.' },

        { type: 'comparison',
          headers: ['Output value', 'What it shows', 'Care about it?'],
          rows: [
            ['Cronbach\'s α (Part 1)',                          'The internal consistency of HALF 1 only.',                                       'Background info.'],
            ['Cronbach\'s α (Part 2)',                          'The internal consistency of HALF 2 only.',                                       'Background info.'],
            ['Correlation Between Forms',                       'The raw Pearson correlation between Total Half 1 and Total Half 2.',             'Step in the calculation.'],
            ['**Spearman-Brown Coefficient (Equal Length)**',    'The split-half reliability adjusted to estimate full-scale reliability when both halves have the same number of items.', '**This is the value you report when both halves have equal numbers of items.**'],
            ['Spearman-Brown Coefficient (Unequal Length)',     'Same as above but adjusted when halves have different numbers of items (odd-numbered scale).', 'Use this if your scale has an odd number of items.'],
            ['Guttman Split-Half Coefficient',                  'An alternative formula for split-half reliability that does not assume equal half-variances.', 'Optional — report alongside Spearman-Brown if you want extra robustness.'],
          ]},

        { type: 'heading', level: 3, text: 'The simple rule' },

        { type: 'list', items: [
          '**Even number of items in the scale** → report **Spearman-Brown (Equal Length)**.',
          '**Odd number of items** → report **Spearman-Brown (Unequal Length)**.',
          'Interpret using the SAME benchmarks as Cronbach\'s alpha: ≥ .90 excellent, ≥ .80 good, ≥ .70 acceptable, < .60 unacceptable.',
        ]},

        { type: 'reveal',
          prompt: 'Your output shows: Correlation Between Forms = .68, Spearman-Brown Coefficient (Equal Length) = .81, Guttman Split-Half = .79. What value do you report and what does it mean?',
          answer: '**Report Spearman-Brown (Equal Length) = .81.** The raw correlation between forms (.68) understates the true reliability because each half is only HALF the scale — shorter scales are inherently less reliable. The Spearman-Brown correction adjusts upward to estimate what reliability would be for the FULL-length scale. So .81 is the split-half reliability of your scale, falling in the "good" range. The Guttman value (.79) is similar — agreement between two formulas is reassuring.' },
      ],
    },

    /* ════════════════════ 6. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing split-half up alongside Cronbach\'s alpha',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard double-reporting sentence' },

        { type: 'paragraph', text:
          'When you report split-half, you almost always report it as a SECOND number alongside Cronbach\'s alpha — not instead of it. The two values give the reader complementary information.' },

        { type: 'heading', level: 3, text: 'Template' },

        { type: 'apa', text:
          'The [N]-item [scale name] demonstrated [acceptable/good/excellent] internal consistency reliability in the present sample, Cronbach\'s α = [.XX]. As a robustness check, split-half reliability was also computed; the Spearman-Brown coefficient was [.XX], consistent with the alpha estimate and supporting the conclusion that the scale measures its underlying construct reliably.' },

        { type: 'heading', level: 3, text: 'A worked example' },

        { type: 'apa', text:
          'The 10-item Workplace Engagement Scale demonstrated good internal consistency reliability in the present sample, Cronbach\'s α = .82. As a robustness check, split-half reliability was also computed; the Spearman-Brown coefficient was .81, consistent with the alpha estimate and supporting the conclusion that the scale measures workplace engagement reliably across the items.' },

        { type: 'heading', level: 3, text: 'If alpha and split-half DISAGREE' },

        { type: 'apa', text:
          'The [N]-item [scale name] showed Cronbach\'s α = [.XX] in the present sample, but split-half reliability was substantially lower (Spearman-Brown = [.XX]). This discrepancy likely reflects the structured ordering of items in the scale, where the first half assesses [topic A] and the second half assesses [topic B]. The first-half / second-half split therefore correlates two semi-independent subscales, yielding artificially low split-half reliability. Cronbach\'s alpha, which averages across all possible item splits, is the more appropriate reliability indicator here.' },

        { type: 'callout', tone: 'success', title: 'When the two methods agree, report both briefly',
          body: 'A one-sentence mention of split-half alongside alpha takes 15 seconds to write and signals methodological rigour to examiners. *"Cronbach\'s α = .82; split-half (Spearman-Brown) = .81."* That is it. Examiners notice the second number even if they do not comment on it.' },
      ],
    },

    /* ════════════════════ 7. WHEN TO USE SPLIT-HALF ════════════════════ */
    {
      id: 'when-to-use',
      title: 'When split-half adds genuine value (and when it does not)',
      blocks: [
        { type: 'heading', level: 2, text: 'Three situations where split-half is worth reporting' },

        { type: 'list', items: [
          '**Your supervisor or examiner asks for it specifically.** Sometimes traditional supervisors prefer split-half because it is the older, more "transparent" method. If asked, provide it.',
          '**Your scale has 50+ items.** With very long scales, dividing into halves of 25 items each gives a reliability estimate that is quite stable. Reporting both methods reassures the reader that reliability is high regardless of computation.',
          '**You want a robustness check.** If your alpha is on the lower side (around .70), reporting split-half as a second opinion can strengthen your case that reliability is at the boundary but consistent across methods.',
        ]},

        { type: 'heading', level: 2, text: 'When split-half does NOT add value' },

        { type: 'list', items: [
          '**Short scales (< 10 items).** With only 4-6 items, dividing into halves leaves you with 2-3 items per half — too few to give a stable estimate. Stick with alpha.',
          '**Scales with structured item ordering.** If your items go from easy to hard, or from one topic to another, the first-half / second-half split is biased. Alpha handles all possible splits and is more appropriate.',
          '**Modern journal submissions in most fields.** Today, Cronbach\'s alpha alone is sufficient for almost all journal submissions in psychology, education, business, and health sciences. Adding split-half is rarely required.',
        ]},

        { type: 'callout', tone: 'info', title: 'A modern alternative — McDonald\'s omega',
          body: 'A newer reliability statistic called **McDonald\'s omega (ω)** is increasingly recommended by methodologists as a more accurate alternative to Cronbach\'s alpha. SPSS does not compute it by default, but it can be calculated in R (psych package) or Jamovi. If your supervisor mentions omega, treat it as a step beyond split-half — a more modern robustness check. For most thesis work, Cronbach\'s alpha remains the standard expectation.' },
      ],
    },

    /* ════════════════════ 8. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Split-half reliability divides your scale into two halves, correlates them, and uses the Spearman-Brown formula to estimate full-scale reliability.',
          'It is the OLDER reliability method (1910), pre-dating Cronbach\'s alpha (1951). Alpha averages across ALL possible splits; split-half uses ONE specific split.',
          'Run it via Analyze → Scale → Reliability Analysis → change Model from "Alpha" to "Split-half".',
          'SPSS splits items first-half vs second-half based on order in the Items box — item ordering matters.',
          'Read the **Spearman-Brown (Equal Length)** coefficient as the value to report when your scale has an even number of items, or **Spearman-Brown (Unequal Length)** for odd-numbered scales.',
          'Interpret using the same benchmarks as Cronbach\'s alpha: ≥ .80 good, ≥ .70 acceptable, < .60 unacceptable.',
          'Report split-half ALONGSIDE Cronbach\'s alpha, not instead of it — a one-sentence robustness check.',
          'When alpha and split-half disagree, the discrepancy is usually due to structured item ordering — alpha is the more appropriate measure in that case.',
          'Use split-half when supervisor requests it, with very long scales (50+ items), or as a robustness check for borderline alpha values.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Course complete — Reliability Testing',
          body: 'This is the final lesson of the Reliability Testing course. Across three lessons you have mastered Cronbach\'s alpha (the workhorse), item-total analysis (the diagnostic tool), and split-half (the robustness check). Your scales are now methodologically defensible: properly reverse-coded, alpha-tested, item-refined where needed, and double-checked when valuable.' },

        { type: 'paragraph', text:
          'Before finishing, run split-half reliability on the same scale you used for Lesson 1. Compare the Spearman-Brown value to your Cronbach\'s alpha. If they agree closely, write the one-sentence APA combined statement. If they diverge substantially, think about why — and what that tells you about your item ordering. Then come back for the final knowledge check.' },
      ],
    },

    /* ════════════════════ 9. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'Split-half reliability is computed by:',
          choices: [
            'Running Cronbach\'s alpha twice',
            'Dividing the scale into two halves, computing a total for each half, and correlating the two halves (with Spearman-Brown adjustment)',
            'Removing half the items',
            'Doubling the sample size',
          ],
          answer: 1,
          explanation: 'Split-half divides your scale into two halves (Half A and Half B), computes a total score for each half, and correlates the two totals. The raw correlation underestimates true reliability because each half is shorter than the full scale, so the Spearman-Brown formula corrects upward to estimate full-scale reliability.' },

        { type: 'check',
          question: 'When you run split-half in SPSS for a 10-item scale, which output value do you report?',
          choices: [
            'Cronbach\'s α (Part 1)',
            'Correlation Between Forms',
            'Spearman-Brown Coefficient (Equal Length)',
            'Guttman Split-Half',
          ],
          answer: 2,
          explanation: 'For a scale with an EVEN number of items (10 items split as 5+5), the value to report is the **Spearman-Brown Coefficient (Equal Length)**. It is the Spearman-Brown-corrected split-half reliability — the estimate of full-scale reliability. The Correlation Between Forms is just an intermediate step; Cronbach\'s α (Part 1/2) are background info; Guttman is an alternative formula that some researchers also report.' },

        { type: 'check',
          question: 'Your Cronbach\'s α = .82 and Spearman-Brown split-half = .81. What does this combination tell you?',
          choices: [
            'Your scale is broken',
            'Two different reliability methods agree closely — strong evidence that the scale measures its construct consistently',
            'You need to drop items',
            'Re-run with more participants',
          ],
          answer: 1,
          explanation: 'Close agreement between Cronbach\'s alpha and split-half is reassuring — two different methods of estimating reliability are giving essentially the same answer. This robustness check strengthens your confidence that the scale measures its underlying construct consistently. Report both briefly in your Chapter 3.' },

        { type: 'check',
          question: 'Your Cronbach\'s α = .82 but Spearman-Brown split-half = .59. What is the most likely explanation?',
          choices: [
            'SPSS has a bug',
            'Your items have STRUCTURED ORDERING — the first half measures one thing and the second half measures another. The first-half / second-half split correlates two semi-independent subscales.',
            'You need to drop items',
            'Your sample is too small',
          ],
          answer: 1,
          explanation: 'A big discrepancy between alpha and split-half usually means structured item ordering. SPSS splits the scale into first half / second half — so if your scale has items grouped by topic (first 5 items on supervisor, next 5 on colleagues), the two halves measure semi-independent subscales and correlate poorly. Cronbach\'s alpha, which averages across all possible splits, is the more appropriate reliability statistic in that case. Acknowledge this in your write-up.' },

        { type: 'check',
          question: 'In which of these situations is reporting split-half MOST useful?',
          choices: [
            'A 4-item scale',
            'A 60-item scale with Cronbach\'s α = .92, as a robustness check',
            'A scale with structured item ordering',
            'A single-item measure',
          ],
          answer: 1,
          explanation: 'Split-half adds the most value for LONG scales as a robustness check — with 60 items splitting into 30+30 gives stable half-scale estimates. For short scales (< 10 items), each half becomes too small to be reliable. For structured-ordering scales, split-half is biased. For single-item measures, neither alpha nor split-half applies.' },
      ],
    },
  ],
};
