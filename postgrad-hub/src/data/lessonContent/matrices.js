/**
 * Correlation Analysis · Lesson 4 — Interpreting Correlation Matrices
 * Reading the full matrix, the multiple-comparison problem, and publication tables.
 */

export const MATRICES_LESSON = {
  id: 'cor-4',
  title: 'Interpreting correlation matrices',
  subtitle: 'Module 03 · Course: Correlation Analysis · Lesson 4 of 4',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'When you have 10 variables and 45 correlations to read',
      blocks: [
        { type: 'scene', body: [
          'You ran Bivariate Correlations on 10 variables from your survey. SPSS produced a beautiful 10×10 grid — 100 cells, with values, asterisks, and N counts scattered across. You scroll through. Some cells have one asterisk, some have two. Some are positive, some negative. Some have huge N values, others smaller. Your supervisor will want to know about ALL of them. Your examiner will scan the table looking for patterns.',
          'And there is a sneakier problem you may not have thought about. With 10 variables you have **45 unique pair-wise correlations**. At a 5% significance level, you would expect about 2-3 of those to come up "significant" purely by chance — even if no real relationships exist. How do you tell the real signals from the noise?',
          'This final lesson of the Correlation Analysis course teaches you to **read a full correlation matrix** confidently, present it in a publishable thesis table, handle the **multiple-comparisons problem**, and write up your matrix findings in a way that emphasises real patterns over chance flukes.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Read every part of a correlation matrix** — the diagonal, the triangles, the cells, the asterisks, the N counts.',
            '**Recognise matrix symmetry** and read only ONE triangle (not both) without losing information.',
            '**Spot the strongest and most interesting correlations** quickly using a systematic scanning approach.',
            '**Understand the multiple-comparisons problem** and apply a Bonferroni correction when you have run many correlations.',
            '**Build a publication-ready correlation table** for your thesis Chapter 4, following the standard APA format.',
            '**Write up matrix findings** in narrative form, highlighting key patterns without drowning readers in numbers.',
            '**Avoid the five common mistakes** that make matrix interpretation look amateurish.',
          ]},

        { type: 'why', body:
          'A well-presented correlation matrix is often the centrepiece of a thesis Chapter 4. It compresses dozens of relationships into a single readable table. Examiners use it to navigate your findings. Get it right and your results section reads beautifully. Get it wrong and the reader gets lost in a sea of numbers — and starts wondering if the patterns are even real.' },
      ],
    },

    /* ════════════════════ 2. THE ANATOMY ════════════════════ */
    {
      id: 'anatomy',
      title: 'The anatomy of a correlation matrix',
      blocks: [
        { type: 'heading', level: 2, text: 'Every part of the SPSS output, named' },

        { type: 'paragraph', text:
          'When you correlate 4 variables, SPSS produces a 4×4 grid. When you correlate 10 variables, you get a 10×10 grid. The structure is the same regardless of size. Learn to read the 4×4 confidently and you can read any larger version.' },

        { type: 'illustration', component: 'CorrelationMatrixAnatomy',
          caption: 'Figure 1. A clean 4-variable Pearson correlation matrix. Variables run down the rows AND across the columns — the same four in the same order both ways. Diagonal cells (highlighted) are always 1.000 (a variable correlated with itself). Off-diagonal cells show three numbers stacked: Pearson r, the p-value, and the N. Asterisks flag significance (* p<.05, ** p<.01).' },

        { type: 'heading', level: 3, text: 'The three parts of every cell' },

        { type: 'list', ordered: true, items: [
          '**Top — Pearson Correlation (r):** the strength and direction. Range −1 to +1.',
          '**Middle — Sig. (2-tailed):** the p-value. If it shows .000, report as p < .001.',
          '**Bottom — N:** the sample size used for this specific pair. May differ from cell to cell if you used pairwise deletion.',
        ]},

        { type: 'heading', level: 3, text: 'The diagonal — always 1.000' },

        { type: 'paragraph', text:
          'Every cell on the diagonal (top-left to bottom-right) shows r = 1.000. This is the correlation of each variable with itself, which is mathematically guaranteed to be perfect. Diagonal cells are essentially decorative — ignore them when reading the matrix.' },

        { type: 'heading', level: 3, text: 'The two triangles — same numbers, mirror image' },

        { type: 'illustration', component: 'MatrixSymmetry',
          caption: 'Figure 2. A correlation matrix is SYMMETRIC. The upper triangle (above the diagonal) and the lower triangle (below) contain identical numbers — the correlation between A and B is the same as between B and A. Read only ONE triangle and ignore the other.' },

        { type: 'paragraph', text:
          'Because correlations are symmetric (r_AB = r_BA), the upper-right triangle and lower-left triangle of the matrix contain the same numbers mirrored across the diagonal. You only need to read ONE triangle. By convention, most people read the upper-right (above the diagonal) — but it does not matter which you pick. Just pick one and ignore the redundant half.' },

        { type: 'reveal',
          prompt: 'In a 6-variable correlation matrix, how many UNIQUE correlations are there to interpret?',
          answer: '**15 unique correlations.** The formula is n × (n − 1) / 2, where n is the number of variables. For 6 variables: 6 × 5 / 2 = 15. The 6×6 grid has 36 cells, but 6 of those are on the diagonal (all r = 1), and the remaining 30 off-diagonal cells contain 15 pairs of identical values mirrored across the diagonal. So 15 unique correlations to interpret, not 30 or 36.' },
      ],
    },

    /* ════════════════════ 3. SCANNING THE MATRIX ════════════════════ */
    {
      id: 'scanning',
      title: 'A systematic way to scan a matrix',
      blocks: [
        { type: 'heading', level: 2, text: 'How to read 15-45 correlations without getting overwhelmed' },

        { type: 'paragraph', text:
          'Faced with a large correlation matrix, beginners read it cell by cell, top to bottom, left to right. That works for a 3×3 — for a 10×10 it is exhausting and you lose track of the patterns. A better approach is a TWO-PASS scan: first pass looks at significance, second pass looks at magnitude and direction.' },

        { type: 'steps', steps: [
          { title: 'First pass — find the ASTERISKS',
            body: [
              'Scan the upper triangle and circle (mentally or with a pen) every cell that has at least one asterisk. These are the statistically significant correlations.',
              'Count how many you found. With n variables, the maximum is n×(n−1)/2.',
              'For a 10-variable matrix that means up to 45 significant correlations.',
            ]},
          { title: 'Second pass — among the asterisked cells, find the STRONGEST',
            body: [
              'Within the significant correlations, identify the ones with |r| ≥ .50 (Cohen\'s "large"). These are the relationships worth discussing in detail.',
              '|r| .30-.50 (moderate) get a mention.',
              '|r| < .30 (weak) — significant but small. Mention briefly if relevant to your hypotheses; otherwise note in passing.',
            ]},
          { title: 'Third pass — look for PATTERNS, not just individual cells',
            body: [
              'Does a single variable correlate strongly with many others? (It may be a central construct.)',
              'Do variables cluster — some correlating strongly with each other but not with a different cluster? (Sign of multiple underlying constructs.)',
              'Are all the correlations in the expected direction? (A surprising sign — e.g. negative when you predicted positive — deserves discussion.)',
            ]},
          { title: 'Fourth pass — sanity check the N values',
            body: [
              'Look at the N at the bottom of each cell. They should all be roughly equal (close to your total sample). If some are dramatically smaller, those variables have a lot of missing data and the corresponding correlations are less reliable.',
            ]},
        ]},

        { type: 'callout', tone: 'gold', title: 'The 60-second rule',
          body: 'A trained eye can extract the key patterns from a 10×10 correlation matrix in about 60 seconds using the four-pass scan. Practice on your own dataset — the speed comes quickly once you have a system.' },
      ],
    },

    /* ════════════════════ 4. MULTIPLE COMPARISONS ════════════════════ */
    {
      id: 'multiple-comparisons',
      title: 'The multiple-comparisons problem',
      blocks: [
        { type: 'heading', level: 2, text: 'Why some "significant" correlations are flukes' },

        { type: 'paragraph', text:
          'When you set significance at α = .05, you are accepting a 5% chance of declaring a correlation significant when none truly exists (a Type I error or "false positive"). For ONE correlation, that 5% is reasonable. But you ran a MATRIX with many correlations — and the more tests you run, the more false positives you accumulate by pure chance.' },

        { type: 'comparison',
          headers: ['Number of variables in matrix', 'Number of unique correlations', 'Expected false positives at α = .05'],
          rows: [
            ['3',  '3',  '0.15 — basically zero'],
            ['5',  '10', '0.5 — one in two matrices will have a false positive'],
            ['7',  '21', '~1 false positive PER MATRIX, on average'],
            ['10', '45', '~2-3 false positives per matrix'],
            ['15', '105', '~5 false positives per matrix'],
            ['20', '190', '~10 false positives per matrix'],
          ]},

        { type: 'paragraph', text:
          'So if you run a 10-variable matrix and find, say, 8 significant correlations, you should EXPECT that about 2-3 of them might be flukes. That does not mean any specific one is — it means you should be cautious about getting excited over single weakly-significant findings (p = .04 with n = 80) when many tests were run.' },

        { type: 'heading', level: 3, text: 'The Bonferroni correction' },

        { type: 'paragraph', text:
          'The simplest fix is the **Bonferroni correction**: divide your significance threshold by the number of tests. With 45 correlations and a starting α of .05, the Bonferroni-corrected threshold becomes .05 / 45 = .0011. A correlation must now have p < .0011 (not just p < .05) to count as significant.' },

        { type: 'callout', tone: 'warning', title: 'Bonferroni is conservative',
          body: 'Bonferroni overshoots — it strongly protects against false positives but increases false negatives (missing real effects). For a thesis, applying Bonferroni to EVERY correlation in the matrix is often too strict. The pragmatic compromise: apply Bonferroni (or the less-strict Holm or Benjamini-Hochberg) only to the correlations that test your PRE-SPECIFIED hypotheses. For exploratory correlations, report uncorrected p-values but note the multiple-comparisons context in your discussion.' },

        { type: 'reveal',
          prompt: 'You ran a matrix of 8 variables (28 correlations). You found one correlation with p = .04 that you did not predict in advance. Should you trust it?',
          answer: '**Be cautious.** With 28 tests at α = .05, you would expect about 1.4 false positives by chance alone — and you have ONE marginal finding. The Bonferroni-corrected threshold is .05 / 28 = .0018; p = .04 is far above that. This single finding could easily be a fluke. Standard write-up: *"An unanticipated correlation was observed between [X] and [Y], r = .XX, p = .04, though this should be interpreted cautiously given the number of correlations tested (28) and the absence of an a-priori hypothesis. Replication in an independent sample would be needed before drawing firm conclusions."* That sentence demonstrates methodological maturity.' },

        { type: 'heading', level: 3, text: 'Pre-specifying hypotheses protects you' },

        { type: 'paragraph', text:
          'The cleanest way to handle multiple comparisons is to declare in your METHODOLOGY chapter exactly which correlations you predicted in advance, based on theory. For those PRE-SPECIFIED hypotheses, apply your alpha normally. For the rest of the matrix, report as "exploratory" and treat findings cautiously.' },
      ],
    },

    /* ════════════════════ 5. PUBLICATION-READY TABLE ════════════════════ */
    {
      id: 'publication-table',
      title: 'Building a publication-ready correlation table',
      blocks: [
        { type: 'heading', level: 2, text: 'The standard APA format' },

        { type: 'paragraph', text:
          "SPSS\'s default correlation output is dense and hard to read in a thesis. Most published research transforms it into a cleaner table that shows ONE triangle, with descriptives in the margins. Here is the standard APA format used in psychology, education, business, and health-sciences journals." },

        { type: 'comparison',
          headers: ['Variable', 'M', 'SD', '1', '2', '3', '4', '5'],
          rows: [
            ['1. Class size (pupils)',        '38.2', '8.1',  '—',     '',     '',      '',     ''],
            ['2. School funding (KSh, lakhs)', '12.4', '4.7', '−.71***', '—',  '',      '',     ''],
            ['3. Teacher experience (yrs)',    '11.5', '6.2', '−.18*',   '.32**', '—',  '',     ''],
            ['4. Time on homework (hrs/wk)',   '7.8',  '3.4', '−.09',    '.21*',  '.27**', '—', ''],
            ['5. Exam score (/100)',           '67.5', '12.8','−.42***', '.55***','.38***', '.31**', '—'],
          ]},

        { type: 'callout', tone: 'success', title: 'Five conventions of a publishable correlation table',
          body: [
            '**1. Number the variables** (1, 2, 3, …) and use the numbers as column headers.',
            '**2. Show only the LOWER triangle** — drop the redundant upper half completely.',
            '**3. Replace diagonal r = 1.000 cells with em-dashes** (—) to reduce visual noise.',
            '**4. Add columns for descriptives (M and SD)** between variable names and the correlations — anchors the reader.',
            '**5. Use asterisk significance flags:** `*p < .05, **p < .01, ***p < .001` (footnoted under the table).',
          ]},

        { type: 'heading', level: 3, text: 'How to build it from your SPSS output' },

        { type: 'steps', steps: [
          { title: 'Number your variables',
            body: 'In the order they appeared in your Bivariate dialog, number them 1, 2, 3, etc.' },
          { title: 'Create a Word table with rows = variables, columns = M, SD, 1, 2, 3, …',
            body: 'For 5 variables you need 8 columns: variable name, M, SD, and columns 1-5.' },
          { title: 'Fill in M and SD from your Descriptives output',
            body: 'Run Analyze → Descriptive Statistics → Descriptives on your variables to get means and SDs, then copy into your table.' },
          { title: 'Fill in the lower-triangle correlations from your SPSS Correlations output',
            body: 'Round to two decimal places. Add the appropriate asterisks for significance level.' },
          { title: 'Leave diagonals as em-dashes (—) and upper triangles blank',
            body: 'This dramatically improves readability over the raw SPSS output.' },
          { title: 'Add a footnote beneath the table',
            body: '"Note. N = [your sample size]. *p < .05, **p < .01, ***p < .001."' },
          { title: 'Number the table',
            body: 'Add a caption: "Table 4.X — Means, standard deviations, and intercorrelations among study variables."' },
        ]},

        { type: 'why', body:
          'The APA-style correlation table is a compressed information device. In a single half-page table, your examiner can see: how many variables you measured, their central tendency and spread, every relationship among them, and which relationships are statistically significant. No other thesis table packs more information per square centimetre. Getting it right pays dividends throughout your defence.' },
      ],
    },

    /* ════════════════════ 6. WRITING IT UP ════════════════════ */
    {
      id: 'writing',
      title: 'Writing up correlation matrix findings',
      blocks: [
        { type: 'heading', level: 2, text: 'Two strategies — by variable or by hypothesis' },

        { type: 'paragraph', text:
          'After presenting the full matrix in a table, your narrative needs to walk the reader through the key findings. You have two organising strategies — pick whichever fits your study better.' },

        { type: 'heading', level: 3, text: 'Strategy 1 — Organise by variable' },

        { type: 'paragraph', text:
          'Go through each variable in turn and describe its key correlations with the others. Best for descriptive Chapter 4 sections where you have not yet stated specific hypotheses.' },

        { type: 'apa', text:
          'Class size correlated negatively with school funding, r(78) = −.71, p < .001, with teacher experience, r(78) = −.18, p = .03, and most importantly with exam scores, r(78) = −.42, p < .001. School funding showed strong positive correlations with teacher experience, r(78) = .32, p < .01, and exam scores, r(78) = .55, p < .001. The strongest single association in the matrix was between school funding and exam scores, supporting the view that resource availability is a key determinant of pupil achievement in this sample.' },

        { type: 'heading', level: 3, text: 'Strategy 2 — Organise by hypothesis' },

        { type: 'paragraph', text:
          'Walk through your pre-specified hypotheses one at a time, reporting the supporting correlation. Best when your Chapter 3 has stated specific predictions.' },

        { type: 'apa', text:
          'H1 predicted that smaller class sizes would associate with higher exam scores. This was supported, r(78) = −.42, p < .001, indicating a moderate negative relationship — pupils in smaller classes achieved higher marks on average. H2 predicted that school funding would relate positively to exam scores. This too was strongly supported, r(78) = .55, p < .001 — the strongest single association in the matrix. H3 predicted that teacher experience would relate positively to exam scores. This was supported, r(78) = .38, p < .001, though the association was modestly weaker than the funding effect.' },

        { type: 'callout', tone: 'gold', title: 'Highlight, don\'t enumerate',
          body: 'Do NOT walk through every cell of the matrix in the narrative. With 45 correlations you would write 45 sentences and the reader would drown. Instead: present the full matrix as Table 4.X, then highlight in the narrative ONLY the correlations relevant to your hypotheses or the strongest few. Readers can scan the table for the rest.' },

        { type: 'reviewerComments',
          items: [
            { q: 'How did you handle the multiple-comparisons problem in your correlation matrix?',
              a: 'For correlations that tested pre-specified hypotheses (documented in Section 3.X), I used the conventional α = .05 threshold. For exploratory correlations, I report uncorrected p-values but flag them as exploratory and interpret cautiously, given that with [N] correlations at α = .05 one would expect about [X] false positives by chance alone. This is noted in Section 4.X of the results chapter.' },
            { q: 'Why didn\'t you apply a Bonferroni correction across the whole matrix?',
              a: 'Bonferroni applied to all 45 correlations would have set the threshold at .05 / 45 = .0011, which is highly conservative and would have substantially inflated the rate of false negatives. The pragmatic compromise — pre-specifying hypotheses and treating exploratory findings cautiously — is widely used in postgraduate research. Where exploratory findings are reported, I have flagged them and noted the need for independent replication before firm conclusions can be drawn.' },
            { q: 'Why are the N values different across cells?',
              a: 'I used pairwise deletion for missing data, which means each correlation uses all available cases for that specific pair. Some variables had slightly more missing data than others — for example, income had 12.1% missing while the demographics had less than 2%. The N for each correlation is reported in the full SPSS output (Appendix D). The table itself notes the total sample size at the bottom.' },
          ]},
      ],
    },

    /* ════════════════════ 7. COMMON MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Common matrix mistakes',
      blocks: [
        { type: 'mistake',
          title: "Mistake 1 — Showing the full matrix in your thesis (both triangles)",
          body: 'You paste the raw SPSS output directly into your thesis. The table has both upper and lower triangles filled with identical numbers, every diagonal cell shows 1.000, the table is twice the size it needs to be, and your readers cannot find anything.',
          fix: 'Show ONLY the lower triangle. Replace diagonals with em-dashes (—). Drop the upper triangle entirely. Add columns for M and SD. The result is half the size and much more readable.' },

        { type: 'mistake',
          title: 'Mistake 2 — Reporting every cell in the narrative',
          body: 'Your Chapter 4 narrative walks through all 45 correlations in your 10-variable matrix: "X correlated with Y at .31; X correlated with Z at .14; …" Three pages later the reader has lost the plot.',
          fix: 'Present the matrix as a table. In the narrative, highlight only correlations that (a) test your pre-specified hypotheses or (b) are the strongest in the matrix. Readers can scan the table for everything else.' },

        { type: 'mistake',
          title: 'Mistake 3 — Treating every significant finding as equally important',
          body: 'You report r = .14 (p = .04) and r = .67 (p < .001) in the same breath, both flagged as "significant findings". But the .14 explains 2% of variance, while .67 explains 45% — they are not in the same league.',
          fix: 'Always emphasise EFFECT SIZE (the r value) alongside SIGNIFICANCE (the p-value). The Cohen labels (small / medium / large) help. Write: "Strong positive correlation, r = .67 (p < .001), and a weak but statistically significant correlation, r = .14 (p = .04)." Different language for different magnitudes.' },

        { type: 'mistake',
          title: 'Mistake 4 — Ignoring the multiple-comparisons context',
          body: 'You ran a 12-variable matrix (66 correlations), found 4 significant ones at p < .05, and report them as discoveries without acknowledging that 3 false positives are expected by chance alone.',
          fix: 'Always acknowledge multiple comparisons when reporting matrix findings. Either apply a correction (Bonferroni for the strict version, Benjamini-Hochberg for a less-conservative alternative), or flag exploratory correlations as needing independent replication. Methodological awareness > pretending the problem does not exist.' },

        { type: 'mistake',
          title: 'Mistake 5 — Inconsistent N reporting',
          body: 'Your matrix has different N values across cells (because of pairwise deletion), but your text says "Pearson correlations were computed for the 200 respondents". The mismatch confuses readers.',
          fix: 'Either (a) acknowledge in the text that Ns vary slightly across pairs due to missing data, and report the range, or (b) use listwise deletion (in the Bivariate Options dialog) so every correlation uses the same reduced sample. Pick one and be consistent.' },
      ],
    },

    /* ════════════════════ 8. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'A correlation matrix is symmetric — read only ONE triangle (conventionally the upper), and ignore the diagonal (which is always 1).',
          'For n variables, you have n × (n − 1) / 2 unique correlations to interpret.',
          'Scan a matrix systematically in four passes: significance (asterisks first), then magnitude, then patterns, then N sanity-check.',
          'Be aware of the MULTIPLE-COMPARISONS problem: more tests = more false positives by chance. Expect about α × number-of-tests false positives.',
          'For correlations that test pre-specified hypotheses, use α = .05 normally. For exploratory findings, flag cautiously or apply a correction (Bonferroni is strict; Benjamini-Hochberg is more balanced).',
          'Build a publication-ready table: number the variables, lower-triangle only, em-dashes on diagonals, descriptives (M and SD) in adjacent columns, asterisks for significance, footnote with the levels.',
          'Write up findings using either by-variable or by-hypothesis organisation — highlight key correlations, do not enumerate every cell.',
          'Always describe BOTH strength (Cohen benchmarks) AND significance (p-values) for each correlation discussed.',
          'Avoid the five mistakes: showing both triangles, narrating every cell, conflating effect size with significance, ignoring multiple comparisons, inconsistent N reporting.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Course complete — Correlation Analysis',
          body: 'This is the final lesson of the Correlation Analysis course. Across four lessons you have mastered Pearson (the workhorse), Spearman (the non-parametric alternative), partial correlation (controlling for confounders), and matrix interpretation (presenting many correlations together). Your Chapter 4 now has every correlation tool a postgraduate thesis requires.' },

        { type: 'callout', tone: 'success', title: 'Where to next',
          body: 'You have now mastered four complete courses: SPSS Basics, Descriptive Statistics, Correlation Analysis, and Reliability Testing — the foundations of postgraduate quantitative research. The remaining courses in the curriculum are REGRESSION (predicting outcomes from one or more variables) and ANOVA (comparing means across three or more groups). Both build directly on the correlation foundations you now have. Welcome to the world of inferential modelling.' },

        { type: 'paragraph', text:
          'Before finishing, take a real correlation matrix from your dataset (or build one if you have not yet). Apply the four-pass scan. Build a publication-ready table for your thesis. Write a one-paragraph narrative highlighting the three strongest correlations. Then come back for the final knowledge check.' },
      ],
    },

    /* ════════════════════ 9. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'In a 5-variable correlation matrix, how many UNIQUE correlations are there?',
          choices: ['25', '20', '10', '5'],
          answer: 2,
          explanation: 'The formula is n × (n − 1) / 2 = 5 × 4 / 2 = **10 unique correlations**. The 5×5 grid has 25 cells, but 5 are on the diagonal (all r = 1) and the remaining 20 contain 10 pairs of identical values mirrored across the diagonal. Always 10 unique correlations to interpret for 5 variables.' },

        { type: 'check',
          question: 'Why is a correlation matrix SYMMETRIC?',
          choices: [
            "Because SPSS makes it that way for cosmetic reasons",
            "Because the correlation between A and B is mathematically the same as the correlation between B and A — so the upper and lower triangles are identical",
            "Because correlations cannot be negative",
            "Because of rounding",
          ],
          answer: 1,
          explanation: 'r(A, B) = r(B, A) by definition. The two triangles of a correlation matrix therefore contain identical values mirrored across the diagonal. You only need to read ONE triangle (conventionally upper-right). Showing both in a thesis table doubles the size with no extra information.' },

        { type: 'check',
          question: 'You ran a 10-variable correlation matrix and found 8 significant correlations at α = .05. About how many of those would you expect to be FALSE POSITIVES by chance alone?',
          choices: ['0', '2-3', '5', '8 — all of them'],
          answer: 1,
          explanation: 'With 10 variables you have 10 × 9 / 2 = 45 unique correlations. At α = .05 you expect 45 × .05 ≈ **2.3 false positives** purely by chance. So out of 8 "significant" findings, about 2-3 may be flukes — you have no way to tell which specifically. This is the multiple-comparisons problem. Pre-specifying hypotheses and applying a correction (or flagging exploratory findings) is how rigorous researchers handle it.' },

        { type: 'check',
          question: 'What is the Bonferroni-corrected significance threshold for a matrix of 6 variables (15 unique correlations) starting from α = .05?',
          choices: ['.05', '.025', '.0033', '.0011'],
          answer: 2,
          explanation: 'Bonferroni = α / number of tests = .05 / 15 = **.0033**. A correlation must have p < .0033 (not just p < .05) to count as significant under Bonferroni. This is conservative — for thesis work, many researchers apply Bonferroni only to pre-specified hypotheses and flag exploratory findings as cautious instead.' },

        { type: 'check',
          question: 'Which of these is the PUBLICATION-READY format for a correlation table in a thesis?',
          choices: [
            'Both triangles filled in with all the numbers SPSS produced',
            'Lower triangle only, with em-dashes on the diagonal, M and SD columns added, asterisks for significance, footnote explaining the levels',
            'Just the asterisks, no correlation values',
            'A pasted screenshot of the SPSS output',
          ],
          answer: 1,
          explanation: 'The APA-style correlation table shows ONLY the lower triangle (the upper is redundant), uses em-dashes on the diagonals (instead of meaningless 1.000s), adds M and SD columns for context, flags significance with asterisks, and has a footnote explaining the asterisk levels. Compressed, readable, professional — the centrepiece table of most Chapter 4 sections.' },

        { type: 'check',
          question: 'When narrating findings from a 10-variable correlation matrix in your Chapter 4, what should you do?',
          choices: [
            'Walk through every single one of the 45 unique correlations in detail',
            'Present the matrix as a table, then in the narrative highlight only the correlations that test your hypotheses or are the strongest few',
            'Report only the significant ones, ignore the rest',
            'Report only the non-significant ones',
          ],
          answer: 1,
          explanation: 'Enumerating 45 correlations in prose drowns the reader. The standard approach: present the full matrix as Table 4.X (where everything is visible), then in the narrative highlight ONLY the correlations relevant to your hypotheses or the few strongest associations. Readers can scan the table for the rest. Highlight, don\'t enumerate.' },
      ],
    },
  ],
};
