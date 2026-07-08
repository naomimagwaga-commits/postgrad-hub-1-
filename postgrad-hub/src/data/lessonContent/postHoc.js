/**
 * ANOVA · Lesson 2 — Post-hoc tests
 * The follow-up that tells you WHICH specific group pairs differ.
 */

export const POST_HOC_LESSON = {
  id: 'anova-2',
  title: 'Post-hoc tests',
  subtitle: 'Module 03 · Course: ANOVA · Lesson 2 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'Pinning down WHICH groups actually differ',
      blocks: [
        { type: 'scene', body: [
          'In Lesson 1 you ran a one-way ANOVA on three teaching methods. F(2, 114) = 14.8, p < .001 — highly significant. You wrote "the methods differed significantly" and showed the means: A = 60, B = 72, C = 78. Then you stopped.',
          'Your supervisor circles your conclusion and writes: *"Which methods differ from which? Did A differ from B? From C? Did B differ from C? The ANOVA cannot answer this — you need a POST-HOC test."*',
          'She is right. The ANOVA F-test is an overall test: it tells you SOMETHING differs, not WHICH specific pairs. To go from "the groups differ" to "Method C scored significantly higher than both A and B, while B was significantly higher than A", you need post-hoc tests. This lesson covers the four most common post-hoc options — Tukey HSD, Bonferroni, Games-Howell, and LSD — and teaches you when to use each.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Explain what post-hoc tests do** and why they are necessary after a significant ANOVA.',
            '**Choose the right post-hoc test** for your situation — Tukey, Bonferroni, Games-Howell, or LSD.',
            '**Run post-hoc tests in SPSS** alongside one-way ANOVA.',
            '**Read the Multiple Comparisons output table** — mean differences, standard errors, p-values, asterisks.',
            '**Build a clean summary of which pairs differ** for your Chapter 4.',
            '**Report post-hoc results** in APA style following the standard template.',
            '**Avoid the four common mistakes** that mislead post-hoc interpretation.',
          ]},

        { type: 'why', body:
          'Examiners ALWAYS ask which specific groups differ after a significant ANOVA. Reporting only the overall F is incomplete and looks unfinished. Post-hoc tests turn a one-line "groups differ" into a full picture of which methods, treatments, or categories actually outperform which.' },
      ],
    },

    /* ════════════════════ 1.5 WHAT/WHY/WHERE/WHEN — beginner-first primer ════════════════════ */
    {
      id: 'wwww',
      title: 'What / Why / Where / When — read THIS first',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'Post-Hoc testing is the required follow-up to any significant ANOVA. Before diving into the output, understand: (1) What it IS, (2) Why you run it, (3) Where a postgraduate would use it, (4) When to CHOOSE Tukey vs Games-Howell.',
            'The WWWW card below answers all 4 in 3 minutes.',
          ]},

        { type: 'illustration', component: 'PostHocWWWW',
          caption: 'Figure 0. Post-Hoc Tests WHAT/WHY/WHERE/WHEN reference card. Bookmark this — it explains exactly why an ANOVA F-test isn\'t enough on its own.' },
      ]
    },

    /* ════════════════════ 2. WHY POST-HOC ════════════════════ */
    {
      id: 'why-post-hoc',
      title: 'Why ANOVA alone is not enough',
      blocks: [
        { type: 'heading', level: 2, text: 'The "significant F" tells you only HALF the story' },

        { type: 'paragraph', text:
          'Imagine your supervisor gives you a sealed envelope and says: *"Inside is a number telling you the result of a sports tournament. The number is 14.8."* That tells you SOMETHING happened, but not who won, who lost, or what the score was. A significant ANOVA F is similar: it says "something is going on among the groups", but the specifics are inside another envelope — the post-hoc table.' },

        { type: 'paragraph', text:
          'With three groups, there are THREE possible pairs: A-B, A-C, B-C. A significant F could mean: (1) all three pairs differ, (2) only one pair differs, (3) two pairs differ but the third does not, or (4) any combination. You cannot distinguish these scenarios from the F-test alone.' },

        { type: 'comparison',
          headers: ['What ANOVA tells you', 'What post-hoc adds'],
          rows: [
            ['Is there ANY difference among the groups? (Overall test)',                 'WHICH specific pairs of groups differ from each other?'],
            ['Yes/no answer at p < .05',                                                   'A p-value for every pair, adjusted to keep the overall error rate at .05'],
            ['Single F-statistic with two degrees of freedom',                             'A multiple-comparisons table with one row per pair'],
            ['Useful when you only need to know "do groups differ?"',                       'Necessary when you need to identify which specific groups differ'],
          ]},

        { type: 'callout', tone: 'gold', title: 'The order matters',
          body: '**Always run ANOVA FIRST, then post-hoc.** If the ANOVA F is NOT significant (p > .05), do NOT run post-hoc — there is no overall difference to follow up. Running post-hoc on a non-significant ANOVA is fishing for a significant pair that statistical inflation guarantees you will eventually find by chance.' },
      ],
    },

    /* ════════════════════ 3. THE FOUR POST-HOC TESTS ════════════════════ */
    {
      id: 'four-tests',
      title: 'The four post-hoc tests you should know',
      blocks: [
        { type: 'heading', level: 2, text: 'When to use each one' },

        { type: 'paragraph', text:
          'SPSS offers around 18 post-hoc tests under the Post Hoc button. You only need to know four. Each is appropriate for a different situation. Memorise the four and the choice becomes easy.' },

        { type: 'comparison',
          headers: ['Test', 'When to use', 'Pros', 'Cons'],
          rows: [
            ['**Tukey HSD**', 'Equal variances (Levene\'s p > .05), roughly equal group sizes. The DEFAULT for most thesis work.', 'Well-balanced control of Type I error; widely accepted.', 'Less powerful than LSD; assumes equal variances.'],
            ['**Bonferroni**', 'A few specific PRE-PLANNED comparisons. Or when you want maximum protection against false positives.', 'Very conservative — strong protection against Type I error.', 'Often too strict, missing real effects (more Type II errors).'],
            ['**Games-Howell**', 'UNEQUAL variances (Levene\'s p < .05). Use this when Tukey is inappropriate.', 'Robust to variance heterogeneity; safe choice when assumptions wobble.', 'Slightly less powerful than Tukey when variances ARE equal.'],
            ['**LSD (Least Significant Difference)**', 'Almost never recommended. Equivalent to multiple t-tests with no correction.', 'Most powerful (highest chance of detecting real effects).', 'No control of family-wise error rate — inflates false positives. Avoid in published research.'],
          ]},

        { type: 'callout', tone: 'gold', title: 'The two-test rule for thesis work',
          body: '**If Levene\'s test is NON-significant (variances equal) → use Tukey HSD.** **If Levene\'s is significant (variances unequal) → use Games-Howell.** This single rule covers ~95% of postgraduate ANOVA situations. Bonferroni is fine if you have a small number of pre-specified comparisons. Avoid LSD — it inflates errors and many journals reject it.' },

        { type: 'reveal',
          prompt: 'You ran ANOVA. Levene\'s test was significant (p = .02). Which post-hoc should you use, and why?',
          answer: '**Games-Howell.** When Levene\'s is significant, the variances differ across groups — Tukey HSD assumes equal variances and would give biased p-values. Games-Howell is specifically designed for unequal variances. The pair-by-pair p-values from Games-Howell will be more accurate. Standard write-up: *"Because Levene\'s test indicated unequal variances (p = .02), post-hoc comparisons used the Games-Howell test, which does not assume homogeneity of variance."*' },
      ],
    },

    /* ════════════════════ 4. SPSS STEPS ════════════════════ */
    {
      id: 'spss-steps',
      title: 'Running post-hoc tests in SPSS',
      blocks: [
        { type: 'heading', level: 2, text: 'Same dialog as one-way ANOVA' },

        { type: 'paragraph', text:
          'Post-hoc tests live INSIDE the One-Way ANOVA dialog (or the GLM dialog for two-way ANOVA). You tick them as part of the ANOVA setup. SPSS produces the post-hoc output ALONGSIDE the ANOVA output in the same run.' },

        { type: 'steps', steps: [
          { title: 'Open the One-Way ANOVA dialog',
            body: 'Analyze → Compare Means → One-Way ANOVA. Set up the outcome and factor as in Lesson 1.' },
          { title: 'Click Post Hoc…',
            body: 'A new dialog opens with the 18 post-hoc options grouped into "Equal Variances Assumed" (top half) and "Equal Variances Not Assumed" (bottom half).' },
          { title: 'Tick Tukey AND Games-Howell',
            body: 'Tukey lives in the top half. Games-Howell lives in the bottom half. Ticking BOTH at the same time gives you both output tables — you pick the right one to interpret AFTER checking Levene\'s.' },
          { title: 'Leave Significance level at 0.05',
            body: 'The conventional alpha. Only change if you have a specific reason.' },
          { title: 'Click Continue, then OK',
            body: 'SPSS produces a "Multiple Comparisons" output table for EACH post-hoc test you ticked. Find the one matching your Levene\'s result and ignore the other.' },
        ]},

        { type: 'callout', tone: 'info', title: 'Tick both Tukey and Games-Howell every time',
          body: 'You only know which is appropriate AFTER seeing Levene\'s test result. Save yourself a second run by ticking BOTH every time. The output has both tables; you simply read the one that matches your variance situation. Two extra clicks = a complete analysis in one go.' },
      ],
    },

    /* ════════════════════ 5. READING THE OUTPUT ════════════════════ */
    {
      id: 'reading-output',
      title: 'Reading the Multiple Comparisons table',
      blocks: [
        { type: 'heading', level: 2, text: 'One row per pairwise comparison' },

        { type: 'illustration', component: 'PostHocOutput',
          caption: 'Figure 1. A Tukey HSD multiple comparisons output. Each row shows one pairwise comparison: (I) the first group, (J) the second group, the mean difference (I-J), the standard error, and the significance level. Asterisks flag significant pairs. Here: A vs B and A vs C are both significant (p < .001), but B vs C is NOT (p = .090).' },

        { type: 'comparison',
          headers: ['Column', 'What it shows'],
          rows: [
            ['**(I) Group**',                 'The first group in the comparison.'],
            ['**(J) Group**',                 'The second group in the comparison.'],
            ['**Mean Difference (I-J)**',     'Mean of group I minus mean of group J. Sign tells direction: positive = I scored higher.'],
            ['**Std. Error**',                 'Standard error of the mean difference.'],
            ['**Sig.**',                       'The p-value for whether the two groups differ. Adjusted for multiple comparisons.'],
            ['**95% Confidence Interval**',   'Range for the true mean difference. If interval excludes 0, the difference is significant.'],
            ['**Asterisk (*)**',               'Flags significant comparisons at p < .05.'],
          ]},

        { type: 'heading', level: 3, text: 'Notice the table is doubled' },

        { type: 'paragraph', text:
          'SPSS shows EVERY pair twice — once as I vs J and once as J vs I. The numbers are identical except the sign of the Mean Difference flips. So with 3 groups you see 6 rows instead of 3. This is for completeness; just read each pair once.' },

        { type: 'heading', level: 3, text: 'Building a clean summary' },

        { type: 'paragraph', text:
          'For your Chapter 4, convert the SPSS table into a cleaner summary using means with significance letters or a simple text summary. Here are two common formats.' },

        { type: 'heading', level: 3, text: 'Format 1 — Means with significance letters' },

        { type: 'comparison',
          headers: ['Group', 'M', 'SD', 'n'],
          rows: [
            ['Method A',  '60.2ᵃ',   '9.4',   '38'],
            ['Method B',  '71.6ᵇ',   '10.1',  '40'],
            ['Method C',  '78.3ᶜ',   '9.7',   '39'],
          ]},

        { type: 'paragraph', text:
          'Note: Different superscript letters (a, b, c) indicate significantly different means at p < .05 (Tukey HSD). Means sharing a letter are not significantly different. This is the standard format for journal-style ANOVA tables.' },

        { type: 'heading', level: 3, text: 'Format 2 — Narrative summary' },

        { type: 'apa', text:
          'Post-hoc Tukey HSD comparisons revealed that Method C (M = 78.3) scored significantly higher than Method B (M = 71.6, p = .009) and Method A (M = 60.2, p < .001). Method B also scored significantly higher than Method A (p < .001). All three pairwise comparisons were significant.' },

        { type: 'reveal',
          prompt: 'In the post-hoc output, A vs B shows Mean Difference = −12.5, p = .000. What does this mean?',
          answer: '**A scored 12.5 points LOWER than B on average, and this difference is highly significant.** The negative mean difference (−12.5) tells you A is LOWER than B (the I value, A, minus the J value, B, is negative because A is smaller). p = .000 (which SPSS rounds — actual p < .001) confirms the difference is statistically significant. Translation: pupils taught with Method B scored about 12.5 marks higher on average than those taught with Method A.' },
      ],
    },

    /* ════════════════════ 6. BONFERRONI — A QUICK NOTE ════════════════════ */
    {
      id: 'bonferroni',
      title: 'A quick word on Bonferroni',
      blocks: [
        { type: 'heading', level: 2, text: 'When the most conservative test is right' },

        { type: 'paragraph', text:
          'Bonferroni is the simplest post-hoc adjustment: divide your overall alpha by the number of comparisons. With 3 comparisons at α = .05, Bonferroni-corrected alpha = .05 / 3 = .017. A pair must have p < .017 to be significant.' },

        { type: 'paragraph', text:
          'SPSS Bonferroni-corrected p-values appear higher in the output table than the raw p-values — that\'s the correction in action. A pair with raw p = .04 might show as p = .12 (Bonferroni) — pushed above the .05 threshold by the correction.' },

        { type: 'callout', tone: 'info', title: 'When Bonferroni is the right choice',
          body: '**Choose Bonferroni when:** (a) you have a SMALL number of PRE-PLANNED comparisons (say, you only care about A vs B and ignore A vs C), or (b) you want maximum protection against false positives because the consequences of being wrong are severe (e.g. medical research). Bonferroni\'s downside is conservatism: it can miss real effects (Type II errors). For typical thesis ANOVA work with 3-4 groups, Tukey HSD or Games-Howell is usually preferred over Bonferroni — same protection, more power.' },

        { type: 'paragraph', text:
          'Bonferroni in the SPSS Post Hoc dialog produces the same multiple-comparison output table format as Tukey — just with adjusted p-values. You report it the same way, but mention you used Bonferroni in your methodology.' },
      ],
    },

    /* ════════════════════ 7. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — three teaching methods, continued',
      blocks: [
        { type: 'workedExample', title: 'Following up the Lesson 1 example',
          body: [
            { label: 'The setup',
              text: 'Lesson 1: one-way ANOVA on three teaching methods (n = 117 pupils). F(2, 114) = 14.8, p < .001, η² = .21. Levene\'s F = 0.41, p = .67 (non-significant — homogeneity met). Means: A = 60.2 (SD = 9.4), B = 71.6 (SD = 10.1), C = 78.3 (SD = 9.7).' },
            { label: 'Step 1 — Choose the post-hoc',
              text: 'Levene\'s non-significant → use **Tukey HSD** (read the Tukey table, ignore Games-Howell).' },
            { label: 'Step 2 — Read the Multiple Comparisons table',
              text: '**A vs B**: Mean Difference = −11.4, SE = 2.8, p < .001, 95% CI [−17.9, −4.9]. **A vs C**: Mean Difference = −18.1, SE = 2.9, p < .001, 95% CI [−24.7, −11.5]. **B vs C**: Mean Difference = −6.7, SE = 2.7, p = .009, 95% CI [−12.9, −0.5]. All three pairwise comparisons are significant.' },
            { label: 'Step 3 — Interpret each pair',
              text: 'C > B by 6.7 marks (significant, p = .009). C > A by 18.1 marks (highly significant, p < .001). B > A by 11.4 marks (highly significant, p < .001). The pattern is clear: C is best, B is middle, A is worst, and ALL three differences are statistically reliable.' },
            { label: 'Step 4 — Build a clean summary table',
              text: 'For Chapter 4, present the means with significance letters: Method A: 60.2ᵃ, Method B: 71.6ᵇ, Method C: 78.3ᶜ (different superscripts indicate significantly different means at p < .05 per Tukey HSD).' },
            { label: 'Step 5 — APA write-up of the post-hoc',
              text: '*"Post-hoc Tukey HSD comparisons revealed that all three pairwise differences were statistically significant. Method C (M = 78.3, SD = 9.7) scored significantly higher than both Method B (M = 71.6, SD = 10.1; mean difference = 6.7, 95% CI [0.5, 12.9], p = .009) and Method A (M = 60.2, SD = 9.4; mean difference = 18.1, 95% CI [11.5, 24.7], p < .001). Method B also scored significantly higher than Method A (mean difference = 11.4, 95% CI [4.9, 17.9], p < .001). The flipped-classroom approach (Method C) produced the strongest outcomes; group discussion (Method B) was intermediate; traditional lecture (Method A) produced the lowest scores."*' },
          ]},
      ],
    },

    /* ════════════════════ 8. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing post-hoc results up for Chapter 4',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA template' },

        { type: 'apa', text:
          'Post-hoc [Tukey HSD / Games-Howell / Bonferroni] comparisons revealed that [describe significant pairs]. [Group X] (M = [X.X], SD = [X.X]) scored significantly higher than [Group Y] (M = [X.X], SD = [X.X]; mean difference = [X.X], 95% CI [LL, UL], p = [.XXX]). [Continue for each pair. End with a one-sentence summary of the overall pattern.]' },

        { type: 'callout', tone: 'success', title: 'Four things every post-hoc write-up needs',
          body: '**1.** Which post-hoc test you used (Tukey, Games-Howell, Bonferroni) and WHY. **2.** For each pair: mean difference, 95% CI, p-value. **3.** A clean summary identifying which group(s) were highest/lowest. **4.** Significance letters or a narrative pattern statement to make the pattern obvious. The four together turn raw output into thesis-quality prose.' },

        { type: 'reviewerComments',
          items: [
            { q: 'Why did you use Tukey HSD rather than Bonferroni?',
              a: 'Tukey HSD is the conventional post-hoc test for one-way ANOVA when homogeneity of variance is met (Levene\'s non-significant) and group sizes are roughly balanced — both conditions held in this study. Tukey balances Type I error control with statistical power; Bonferroni is more conservative and would have missed the borderline B vs C difference (p = .009). For my exploratory ANOVA following the omnibus F, Tukey was the appropriate choice.' },
            { q: 'What if I have a significant Levene\'s test?',
              a: 'If Levene\'s test is significant, the variances across groups are unequal — Tukey HSD assumes equal variances and could give biased results. The appropriate post-hoc in that case is **Games-Howell**, which does not assume equal variances. SPSS provides Games-Howell in the same Post Hoc dialog (under "Equal Variances Not Assumed").' },
            { q: 'Why didn\'t you use the LSD test?',
              a: 'LSD (Least Significant Difference) does NOT correct for multiple comparisons — it is essentially the same as running multiple uncorrected t-tests. Modern methodological guidance discourages LSD because it inflates the family-wise Type I error rate. Tukey HSD is the standard recommendation for typical one-way ANOVA work.' },
          ]},
      ],
    },

    /* ════════════════════ 9. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common post-hoc mistakes',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Running post-hoc when the ANOVA F is NOT significant',
          body: 'Your ANOVA F-test was p = .12 (not significant), but you ran Tukey anyway and found one pair with p = .04. You report it as significant.',
          fix: 'Post-hoc tests follow a SIGNIFICANT ANOVA. If the overall F is non-significant, do not fish for pairwise differences — any p < .05 you find is unprotected and likely a Type I error. Report "The overall ANOVA was non-significant, F(...) = ..., p = ..., so post-hoc tests were not conducted."' },

        { type: 'mistake',
          title: 'Mistake 2 — Reading Tukey when Levene\'s was significant',
          body: 'Your Levene\'s test was significant (p = .03) but you read the Tukey HSD post-hoc output anyway. The p-values are biased because Tukey assumes equal variances.',
          fix: 'Match the post-hoc to Levene\'s. Non-significant Levene\'s → use Tukey. Significant Levene\'s → use Games-Howell. Tick both Tukey AND Games-Howell upfront so both tables are available; read the right one based on Levene\'s.' },

        { type: 'mistake',
          title: 'Mistake 3 — Reporting only some pairs (cherry-picking)',
          body: 'Your post-hoc shows 3 significant pairs and 3 non-significant. You report only the significant ones, hoping the reader will not ask about the others.',
          fix: 'Report ALL pairwise comparisons, both significant and non-significant. Transparency strengthens credibility. A table with significance letters or a complete narrative makes the full pattern visible.' },

        { type: 'mistake',
          title: 'Mistake 4 — Using LSD without realising it does not correct for multiple comparisons',
          body: 'You ticked LSD because it was first in the alphabetical list. The p-values look great. But LSD is essentially uncorrected — your family-wise error rate is inflated, and modern reviewers will flag it.',
          fix: 'Avoid LSD in thesis work. Use Tukey HSD (equal variances) or Games-Howell (unequal variances) as your default. Bonferroni is fine if you have specific pre-planned comparisons. LSD is rarely the right answer in modern research.' },
      ],
    },

    /* ════════════════════ 10. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Post-hoc tests follow a SIGNIFICANT ANOVA F-test to identify WHICH specific pairs of groups differ.',
          'Never run post-hoc if the overall ANOVA F is non-significant — there is no overall effect to follow up.',
          'The two main choices for thesis work: **Tukey HSD** if Levene\'s p > .05 (equal variances); **Games-Howell** if Levene\'s p < .05 (unequal variances).',
          'Bonferroni is fine for a small number of pre-planned comparisons; LSD is discouraged because it does not correct for multiple comparisons.',
          'Tick BOTH Tukey AND Games-Howell in the SPSS Post Hoc dialog every time — read the appropriate one based on Levene\'s result.',
          'The Multiple Comparisons table shows mean differences, standard errors, p-values, and confidence intervals for every pair (doubled — read each pair once).',
          'For Chapter 4, present results either as means with significance letters (M ᵃ ᵇ ᶜ) OR as a narrative summary of significant pairs.',
          'Always report: which post-hoc used + reason; for each significant pair the mean difference, 95% CI, and p; a one-sentence overall pattern summary.',
          'Avoid the four mistakes: running post-hoc after non-significant ANOVA, reading the wrong post-hoc for your Levene\'s, cherry-picking significant pairs, using LSD.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 3: Two-way ANOVA** we extend to TWO grouping factors at once — for example, teaching method × gender. You learn about main effects, interactions, and the powerful "interaction plot" that visualises whether the effect of one factor depends on the level of the other. Then **Lesson 4** closes the course with repeated-measures ANOVA — for when the same people are measured at multiple time points.' },

        { type: 'paragraph', text:
          'Before moving on, take the ANOVA you ran in Lesson 1 and tick both Tukey and Games-Howell in Post Hoc. Read the appropriate table based on Levene\'s. Identify which specific pairs differ. Write the APA paragraph. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'What do post-hoc tests do that the ANOVA F-test does not?',
          choices: [
            'They compute the means',
            'They identify WHICH SPECIFIC PAIRS of groups differ — the ANOVA F tells you only that SOMETHING differs overall',
            'They are the same as ANOVA',
            'They check assumptions',
          ],
          answer: 1,
          explanation: 'The ANOVA F-test is an overall test — it tells you that SOMETHING is going on among the groups but not which specific pairs differ. Post-hoc tests perform all the pairwise comparisons (A vs B, A vs C, B vs C, etc.) with adjusted p-values to keep the family-wise error rate at .05. Always run post-hoc after a significant ANOVA to identify the specific differences.' },

        { type: 'check',
          question: 'Your Levene\'s test was non-significant (p = .42). Which post-hoc test is the appropriate default?',
          choices: ['LSD', 'Bonferroni', 'Tukey HSD', 'Games-Howell'],
          answer: 2,
          explanation: 'Non-significant Levene\'s (p > .05) means variances across groups are roughly equal — homogeneity met. **Tukey HSD** is the conventional default post-hoc for this situation. It balances Type I error control with statistical power. Games-Howell would be needed if Levene\'s were significant; Bonferroni is fine for specific pre-planned comparisons; LSD does not correct for multiple comparisons and is discouraged.' },

        { type: 'check',
          question: 'Your overall ANOVA F-test was p = .14 (NOT significant). Should you run post-hoc tests?',
          choices: [
            'Yes — post-hoc might find something the F missed',
            'No — post-hoc tests follow a SIGNIFICANT ANOVA. With a non-significant F, any pairwise differences are likely Type I errors. Report the non-significant ANOVA and stop.',
            'Only if Levene\'s is significant',
            'Yes, but only Bonferroni',
          ],
          answer: 1,
          explanation: 'Post-hoc tests are follow-up tests — they require a significant overall ANOVA to be meaningful. With a non-significant F, you have no evidence of any overall group difference; running post-hoc and reporting any p < .05 you find is "fishing" and the family-wise error rate is unprotected. The correct write-up: "The overall ANOVA was non-significant, F(...) = ..., p = .14, so post-hoc tests were not conducted."' },

        { type: 'check',
          question: 'Your post-hoc shows A vs B Mean Difference = −12.5, p < .001. What does this mean?',
          choices: [
            'Group A scored 12.5 points higher than Group B',
            'Group A scored 12.5 points LOWER than Group B, and this difference is highly significant',
            'There is no significant difference',
            'You need more groups',
          ],
          answer: 1,
          explanation: 'The sign of the Mean Difference (I-J) tells you direction. Negative means I < J — so A is LOWER than B (mean of A minus mean of B is negative). p < .001 confirms the difference is statistically significant. Plain English: "Group B scored about 12.5 points higher than Group A on average."' },

        { type: 'check',
          question: 'Why is LSD discouraged in postgraduate research?',
          choices: [
            'It is mathematically wrong',
            'It does NOT adjust for multiple comparisons — essentially equivalent to running uncorrected t-tests, inflating the family-wise Type I error rate',
            'It is too slow',
            'SPSS does not include it',
          ],
          answer: 1,
          explanation: 'LSD (Least Significant Difference) performs all pairwise comparisons WITHOUT adjusting the p-values for the multiple-comparison problem. The family-wise error rate is NOT controlled at .05 — it inflates with the number of comparisons. Modern methodological guidance favours Tukey HSD (or Games-Howell, or Bonferroni) which all provide appropriate error-rate protection. Many journals now reject LSD findings.' },

        { type: 'check',
          question: 'Which is the most professional post-hoc write-up?',
          choices: [
            '"Some groups differed."',
            '"A was different."',
            '"Post-hoc Tukey HSD revealed Method C scored significantly higher than Method A (mean difference = 18.1, 95% CI [11.5, 24.7], p < .001) and Method B (mean difference = 6.7, 95% CI [0.5, 12.9], p = .009). Method B also scored significantly higher than Method A (mean difference = 11.4, 95% CI [4.9, 17.9], p < .001)."',
            '"p was significant."',
          ],
          answer: 2,
          explanation: 'Option C hits every element: names the post-hoc test, identifies each significant pair, reports the mean difference, 95% CI, and exact p-value for every comparison, and presents them in a clear pattern. The other options are too vague to be useful to a reader.' },
      ],
    },
  ],
};
