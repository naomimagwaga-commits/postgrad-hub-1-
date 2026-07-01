/**
 * Writing Up · Lesson 1 — Writing Chapter 4 of a thesis
 * Structuring the results chapter from raw output to defensible narrative.
 */

export const WRITING_CHAPTER_4_LESSON = {
  id: 'write-1',
  title: 'Writing Chapter 4 — from SPSS output to defensible thesis chapter',
  subtitle: 'Module 03 · Course: Writing Up · Lesson 1 of 2',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'The chapter that decides whether all your work counts',
      blocks: [
        { type: 'scene', body: [
          'You have finished data collection. You have cleaned your dataset. You have run the analyses. Your SPSS output window has 47 tables and 12 figures. You open a blank Word document, type "CHAPTER FOUR: DATA ANALYSIS AND FINDINGS" at the top, and stop. What goes next? Which tables to include? Which to leave out? How do you turn hundreds of numbers into a paragraph that an examiner will actually read?',
          'This is where most Kenyan postgraduate students stumble. Not because the analyses were wrong — but because the CHAPTER was assembled the way SPSS spat it out: table, table, table, table, tiny bit of narrative, table. Examiners read it once, get lost, and send it back for restructure. Weeks of your life disappear into iteration cycles that had nothing to do with your actual research.',
          'Chapter 4 has a standard structure. Every Kenyan supervisor recognises it. Every examiner expects it. Once you know the structure, writing the chapter becomes a mechanical exercise of filling in the sections in the right order — not a creative act of guessing what to say next. This lesson teaches that structure end-to-end: the standard sections, the descending-detail rule (from sample → variables → assumptions → inferential → interpretation), which tables belong in the chapter body vs the appendix, how to write the mandatory narrative that ties tables together, and the five structural mistakes that cost students entire defence sessions.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Outline** a standard Chapter 4 with all six conventional sections.',
            '**Order** your results using the descending-detail principle (sample → variables → assumptions → inferential → interpretation).',
            '**Decide** which tables go in the chapter body and which belong in the appendix.',
            '**Write the mandatory narrative paragraphs** that tie every table to the research question.',
            '**Use signposting** so examiners can navigate your chapter without getting lost.',
            '**Structure** a hypothesis-by-hypothesis (or research-question-by-research-question) results section.',
            '**Distinguish** results from interpretation — and know where each belongs.',
            '**Spot and avoid** the five structural mistakes that most often trigger revision requests.',
          ]},

        { type: 'why', body:
          'Chapter 4 is where every one of your prior decisions — sampling, instruments, data cleaning, test selection, analysis — finally becomes VISIBLE to your examiners. It is also the shortest-to-fix chapter if written well and the longest-to-fix if written badly. Getting the STRUCTURE right cuts your revision cycles from months to weeks.' },
      ],
    },

    /* ════════════════════ 2. THE STANDARD STRUCTURE ════════════════════ */
    {
      id: 'structure',
      title: 'The standard Chapter 4 structure',
      blocks: [
        { type: 'heading', level: 2, text: 'Six sections. Same order. Every thesis.' },

        { type: 'paragraph', text:
          'Kenyan universities differ in cosmetic details, but the six-section Chapter 4 structure below is universally recognised. Deviating from it without reason is a red flag; following it makes your chapter feel professional and familiar the moment an examiner opens it.' },

        { type: 'illustration', component: 'Chapter4Structure',
          caption: 'Figure 1. The standard six-section Chapter 4 structure with typical page proportions. Section 4.1 (introduction) is short — half a page. Section 4.2 (sample) is one page. Section 4.3 (descriptives) is 3-5 pages. Section 4.4 (assumptions) is 2-3 pages. Section 4.5 (inferential, organised by hypothesis or research question) is the longest — 8-15 pages. Section 4.6 (chapter summary) is half a page. Total ≈ 15-25 pages for a Master\'s Chapter 4; 20-35 for a PhD.' },

        { type: 'comparison',
          headers: ['Section', 'Purpose', 'Typical length'],
          rows: [
            ['**4.1 Introduction**',                'A short paragraph reminding the reader of the research questions/hypotheses and previewing the chapter\'s structure.', '½ page'],
            ['**4.2 Response rate & sample characteristics**', 'How many questionnaires were sent out and returned; the demographic profile of the analysed sample (age, gender, education, etc.).', '1 page'],
            ['**4.3 Descriptive statistics**',      'Frequencies, percentages, means, SDs (or medians and IQRs) for every variable used in the analyses. Grouped tables by construct.', '3-5 pages'],
            ['**4.4 Preliminary analyses / assumption checks**', 'Reliability (Cronbach\'s α), normality (Shapiro-Wilk), multicollinearity (VIF), Levene\'s, Mauchly\'s, Box\'s M — whichever apply to your subsequent tests. Report the results and confirm which tests you proceeded with.', '2-3 pages'],
            ['**4.5 Inferential analyses**',        'One sub-section per RESEARCH QUESTION or HYPOTHESIS. For each: the test used, the table with numbers, and a narrative paragraph interpreting them. This is where the bulk of your analysis lives.', '8-15 pages'],
            ['**4.6 Chapter summary**',              'A ½-page recap of the key findings, prefiguring Chapter 5 (Discussion).', '½ page'],
          ]},

        { type: 'callout', tone: 'gold', title: 'Results, not discussion',
          body: 'Chapter 4 reports WHAT you found. Chapter 5 (Discussion) explains WHY the findings matter, links them to prior literature, and acknowledges limitations. A common mistake is to interpret findings extensively inside Chapter 4 — then Chapter 5 has nothing left to say. Keep interpretive narrative in Chapter 4 tight and factual: "Group A scored significantly higher than Group B" is Chapter 4; "This finding aligns with Smith (2018) and suggests that…" is Chapter 5.' },
      ],
    },

    /* ════════════════════ 3. SECTION 4.1 — INTRODUCTION ════════════════════ */
    {
      id: 'section-4-1',
      title: 'Section 4.1 — Introduction (½ page)',
      blocks: [
        { type: 'heading', level: 2, text: 'A signposting paragraph, not a mini-Chapter-1' },

        { type: 'paragraph', text:
          'The Chapter 4 introduction has two jobs: (1) briefly restate the research questions or hypotheses the chapter will answer, so the reader is oriented; (2) preview the chapter\'s structure, so the reader knows what is coming. That is it. Do not re-introduce the study, do not re-review the literature, do not re-explain your methods. All three have their own chapters.' },

        { type: 'heading', level: 3, text: 'Template sentence stems' },

        { type: 'apa', text:
          '"This chapter presents the findings of the study on [topic]. The analyses were guided by [n] research questions: (i) [RQ1], (ii) [RQ2], (iii) [RQ3]. The chapter begins by reporting the response rate and demographic profile of the analysed sample (Section 4.2), followed by descriptive statistics for all study variables (Section 4.3) and preliminary assumption checks (Section 4.4). Sections 4.5.1 to 4.5.3 then present the inferential analyses corresponding to each research question in turn, using [tests used, e.g. Pearson correlations, hierarchical multiple regression, and independent-samples t-tests]. Section 4.6 summarises the chapter\'s findings and prefigures the discussion in Chapter 5."' },
      ],
    },

    /* ════════════════════ 4. SECTION 4.2 — SAMPLE ════════════════════ */
    {
      id: 'section-4-2',
      title: 'Section 4.2 — Response rate & sample characteristics (1 page)',
      blocks: [
        { type: 'heading', level: 2, text: 'How many actually responded, and who were they?' },

        { type: 'paragraph', text:
          'Two required components: the response rate (with any exclusions), and a demographics table. Both should appear in every thesis regardless of design.' },

        { type: 'heading', level: 3, text: '4.2.1 Response rate' },

        { type: 'apa', text:
          '"Of the [X] questionnaires distributed, [Y] were returned, representing a response rate of [Y/X × 100]%. Of the returned questionnaires, [Z] were excluded due to [reason: incomplete responses / failed attention checks / duplicate entries], leaving a final analysed sample of n = [final N]. The response rate exceeds Mugenda and Mugenda\'s (2003) 50% threshold for good social-science survey research, providing adequate statistical power for the planned analyses."' },

        { type: 'callout', tone: 'gold', title: 'Justify exclusions transparently',
          body: 'For every excluded case, state the reason. Reviewers will ask. If you dropped 12 respondents because they answered only 3 items, say so — "Twelve respondents were excluded because they completed fewer than 50% of the items, following the standard threshold (Field, 2018, p.226)."' },

        { type: 'heading', level: 3, text: '4.2.2 Sample demographics' },

        { type: 'paragraph', text:
          'Present a single **Sample Characteristics** table with rows for each demographic variable (gender, age band, education, county, occupation, etc.) and columns for Frequency and Percentage. Follow it with a 2-3 sentence narrative pointing out the salient features — "The sample was predominantly female (68%), with the majority aged 25-34 (54%). Educational attainment was high, with 82% holding an undergraduate degree or higher." Do NOT go on for pages describing every demographic; a table + short paragraph is enough.' },
      ],
    },

    /* ════════════════════ 5. SECTION 4.3 — DESCRIPTIVES ════════════════════ */
    {
      id: 'section-4-3',
      title: 'Section 4.3 — Descriptive statistics (3-5 pages)',
      blocks: [
        { type: 'heading', level: 2, text: 'The numbers the reader needs BEFORE the inferential tests' },

        { type: 'paragraph', text:
          'For every variable that appears in a later inferential test, report the appropriate descriptive statistics. This lets the reader (a) understand the raw pattern of your data before any test, and (b) later see how the inferential result relates to the descriptive picture.' },

        { type: 'comparison',
          headers: ['Variable type', 'Report'],
          rows: [
            ['**Categorical (nominal, binary)**', 'Frequency (n) and percentage (%) per category. E.g. "Male 108 (45%), Female 132 (55%)."'],
            ['**Ordinal (Likert single items, education band)**', 'Frequency and percentage per category, plus the MEDIAN if the ordinal scale has enough levels to be informative.'],
            ['**Continuous (normally distributed)**',  'Mean (M) and standard deviation (SD). Report both to 2 decimal places.'],
            ['**Continuous (non-normally distributed)**', 'MEDIAN and interquartile range (IQR). Do NOT report M ± SD if you plan to use a non-parametric test — that would be inconsistent.'],
            ['**Composite scale scores**', 'Mean and SD PLUS the range (min-max) and the number of items in the scale. E.g. "The 10-item satisfaction scale (range 10-50): M = 34.2, SD = 6.1."'],
          ]},

        { type: 'heading', level: 3, text: 'Grouping tables by construct — a professional touch' },

        { type: 'paragraph', text:
          'A common student mistake: one table per variable, so 20 variables produce 20 tables. This is unreadable. Group related variables into a single table per CONSTRUCT — e.g. one table for "Job satisfaction items" listing all 10 items down the rows, with columns for M, SD, and % agreeing; one table for "Demographics"; one table for "Composite scale scores". This turns 20 tables into 4-5 tables.' },

        { type: 'callout', tone: 'gold', title: 'Every table needs a narrative',
          body: 'Never insert a table with no accompanying text. Before or after each table, write 2-3 sentences pointing out its most important features. Example: "Table 4.3 presents descriptive statistics for the five satisfaction sub-scales. Job security received the highest mean rating (M = 4.02, SD = 0.71), while career-development opportunities received the lowest (M = 2.84, SD = 1.03), suggesting employees felt secure but stagnant." Without narrative, the reader has to interpret every table alone — and examiners hate that.' },
      ],
    },

    /* ════════════════════ 6. SECTION 4.4 — ASSUMPTIONS ════════════════════ */
    {
      id: 'section-4-4',
      title: 'Section 4.4 — Preliminary analyses & assumption checks (2-3 pages)',
      blocks: [
        { type: 'heading', level: 2, text: 'Prove your inferential tests are legitimate BEFORE running them' },

        { type: 'paragraph', text:
          'This section presents the evidence that your subsequent inferential tests are defensible. What appears here depends on which tests you plan to run — but a standard checklist covers the vast majority of theses.' },

        { type: 'heading', level: 3, text: 'The standard assumption-check checklist' },

        { type: 'comparison',
          headers: ['If you plan to run…', 'Report in Section 4.4…'],
          rows: [
            ['**Any parametric test** (t-test, ANOVA, regression)', 'Normality: Shapiro-Wilk per outcome (or per group for t-test/ANOVA). Include a note about robustness for large n. Report skewness and kurtosis for composite scales.'],
            ['**Any test using multi-item scales**', 'Reliability: Cronbach\'s α per scale (aim for α ≥ .70). Report per composite in a single table.'],
            ['**Any regression (multiple, hierarchical, logistic)**', 'Multicollinearity: Tolerance and VIF for each predictor set. Confirm all Tolerance > 0.2 and all VIF < 5.'],
            ['**Independent t-test, ANOVA, ANCOVA**', 'Homogeneity of variance: Levene\'s test per outcome.'],
            ['**Repeated-measures ANOVA, mixed ANOVA**', 'Sphericity: Mauchly\'s test. Report which sphericity correction (Greenhouse-Geisser, Huynh-Feldt, none) applied.'],
            ['**MANOVA**', 'Box\'s M test of equality of covariance matrices (use lenient p > .001 threshold).'],
            ['**Ordinal logistic regression**', 'Test of parallel lines (proportional-odds assumption).'],
          ]},

        { type: 'heading', level: 3, text: 'Reporting reliability — the standard template' },

        { type: 'apa', text:
          '"Internal consistency reliability was assessed for the four composite scales using Cronbach\'s alpha. All four scales exceeded the .70 threshold recommended by Nunnally (1978): job satisfaction (α = .84, 10 items), organisational commitment (α = .79, 8 items), work engagement (α = .91, 12 items), and turnover intention (α = .77, 5 items). These values indicate good internal consistency for all measures used in the subsequent inferential analyses."' },

        { type: 'callout', tone: 'warning', title: 'If an assumption fails, say so — then say what you did',
          body: 'A dishonest thesis is a fatal thesis. If Shapiro-Wilk failed for one outcome, report it: "Shapiro-Wilk was significant for [outcome] (W = .89, p = .001), indicating a departure from normality. Given the sample size (n = 240) the parametric test is robust to mild non-normality (Central Limit Theorem; Field, 2018, p.174), so the t-test was retained." Or: "…so the non-parametric Mann-Whitney U test was used instead." Never hide a failed assumption.' },
      ],
    },

    /* ════════════════════ 7. SECTION 4.5 — INFERENTIAL ════════════════════ */
    {
      id: 'section-4-5',
      title: 'Section 4.5 — Inferential analyses (8-15 pages, the bulk of the chapter)',
      blocks: [
        { type: 'heading', level: 2, text: 'One sub-section per research question. Same structure every time.' },

        { type: 'paragraph', text:
          'Section 4.5 is where the vast majority of your analytic work is presented. The single most important structural rule: **one sub-section per research question or hypothesis**. Do not organise this section by test type ("all my correlations", "all my regressions"). Organise it by the QUESTIONS your reader cares about.' },

        { type: 'illustration', component: 'InferentialSectionStructure',
          caption: 'Figure 2. The internal structure of Section 4.5. Each research question / hypothesis becomes a numbered sub-section (4.5.1, 4.5.2, 4.5.3…). Within each sub-section: restate the RQ/H → name the test used and why → present the table → write the 1-2 paragraph interpretation. Same structure repeated for every research question. Reader always knows where they are.' },

        { type: 'heading', level: 3, text: 'The four-step within-sub-section template' },

        { type: 'steps', steps: [
          { title: 'Step 1 — Restate the research question or hypothesis',
            body: 'One sentence. "**Research Question 3: To what extent does perceived organisational support predict employee engagement, controlling for tenure and job level?**" Bold or italicise for scannability.' },
          { title: 'Step 2 — Name the test used and briefly justify it',
            body: 'One or two sentences. "A hierarchical multiple regression was conducted, entering tenure and job level in Block 1 as controls and perceived organisational support in Block 2 as the focal predictor. The block structure allowed the unique contribution of perceived organisational support to be isolated after controlling for the two demographic variables."' },
          { title: 'Step 3 — Present the results table',
            body: 'Insert the ONE table that captures the finding — regression coefficients, ANOVA F-tests, chi-square + Cramer\'s V, etc. Follow APA 7 formatting (Lesson 2 covers this in detail). Number and title it: "Table 4.7. Hierarchical regression predicting employee engagement (n = 240)."' },
          { title: 'Step 4 — Interpret in 1-2 narrative paragraphs',
            body: 'Walk the reader through the table\'s most important numbers, tying them back to the research question. Report the test statistics inline in APA format. End with a one-sentence conclusion about the research question. NO extensive comparison to prior literature — that\'s Chapter 5.' },
        ]},

        { type: 'heading', level: 3, text: 'Example — a complete Section 4.5.3 for one research question' },

        { type: 'apa', text:
          '**4.5.3 Predictors of employee engagement.**\n\nResearch Question 3 asked to what extent perceived organisational support predicts employee engagement after controlling for tenure and job level. A hierarchical multiple regression was conducted, entering tenure (years) and job level (junior / mid / senior) in Block 1 and perceived organisational support (POS) in Block 2. Assumption checks reported in Section 4.4 confirmed the analysis was appropriate.\n\nBlock 1 significantly predicted engagement, R² = .09, F(2, 237) = 11.72, p < .001, with senior-level employees reporting higher engagement (β = .21, p = .001) than junior counterparts. Adding POS in Block 2 significantly improved the model, ΔR² = .18, F Change(1, 236) = 55.31, p < .001, taking the total variance explained to R² = .27. In the final model, POS was the strongest predictor (β = .45, p < .001), with job level remaining significant (β = .17, p = .008); tenure was not significant (β = .04, p = .49). See Table 4.7.\n\n[Table 4.7 here.]\n\nThe findings indicate that, after controlling for tenure and job level, perceived organisational support accounts for an additional 18% of the variance in employee engagement — a substantial incremental contribution, and the largest single predictor in the final model.' },

        { type: 'callout', tone: 'gold', title: 'Signposting sentences save examiners\' patience',
          body: 'Between sub-sections, drop a one-line transition: "Section 4.5.4 turns to the second predictor of engagement — supervisor communication quality." These sentences take 5 seconds to write and save examiners from having to re-orient every time they turn a page. Chapters without signposting feel like a wall of numbers; chapters WITH signposting feel professionally guided.' },
      ],
    },

    /* ════════════════════ 8. TABLES vs APPENDIX ════════════════════ */
    {
      id: 'tables-appendix',
      title: 'Chapter body vs appendix — what goes where',
      blocks: [
        { type: 'heading', level: 2, text: 'The three-second rule' },

        { type: 'paragraph', text:
          'Every table faces a decision: chapter body (where every reader will see it) or appendix (where only interested readers will look). The three-second rule: if the reader\'s understanding of a research question DEPENDS on the table, it goes in the chapter body. If the table is supporting evidence that most readers can skip, it goes in the appendix.' },

        { type: 'comparison',
          headers: ['Belongs in Chapter 4 body', 'Belongs in Appendix'],
          rows: [
            ['Sample characteristics table (Section 4.2)',                                'The raw questionnaire instrument'],
            ['Descriptive statistics per construct (Section 4.3)',                        'Item-level frequencies for every Likert item if you have space limits'],
            ['Reliability table (Cronbach\'s α per scale)',                                'The full inter-item correlation matrices'],
            ['Assumption-check summary table (Shapiro-Wilk, Levene, VIF, etc.)',           'Per-group Q-Q plots and histograms'],
            ['One main results table per research question (regression coefficients, ANOVA table, etc.)', 'Complete SPSS output syntax and full model comparison tables'],
            ['Key figures — profile plots, interaction plots, forest plots',              'Additional plots that duplicate findings shown in body tables'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Not everything from SPSS goes in the chapter',
          body: 'SPSS is exhaustive; your chapter cannot be. A single hierarchical regression produces 6+ tables in SPSS output. In Chapter 4 you typically show ONE consolidated regression table (predictors × Block 1 / Block 2 columns) and put the full SPSS Model Summary, ANOVA, Coefficients, and Collinearity tables in the appendix. Editing SPSS output for readability is a professional skill; copy-pasting raw SPSS tables is amateur.' },
      ],
    },

    /* ════════════════════ 9. RESULTS vs INTERPRETATION ════════════════════ */
    {
      id: 'results-vs-interpretation',
      title: 'Keeping results and discussion separate',
      blocks: [
        { type: 'heading', level: 2, text: 'The bright line between Chapter 4 and Chapter 5' },

        { type: 'paragraph', text:
          'The most common structural mistake in Kenyan Master\'s theses: Chapter 4 turns into a mini-Chapter-5, extensively comparing findings to prior literature, speculating about mechanisms, and drawing policy implications. Then Chapter 5 has nothing new to say and becomes a redundant summary. Keep the line bright.' },

        { type: 'comparison',
          headers: ['Chapter 4 (Results)', 'Chapter 5 (Discussion)'],
          rows: [
            ['**States what was found**', '**Explains why it matters**'],
            ['"Group A scored significantly higher than Group B (t(58) = 3.42, p = .001, d = 0.88, large effect)."', '"This finding is consistent with Smith (2018) and Otieno (2021), both of whom reported similar advantages for [group description]. A plausible mechanism is [explanation]."'],
            ['"Perceived support was the strongest predictor of engagement (β = .45, p < .001)."', '"The dominance of perceived support in the final model challenges the assumption in the Kenyan HR literature that pay is the primary driver of engagement (KIPS, 2020) and suggests…"'],
            ['"The intervention arm showed a steeper decline in HbA1c than the control arm (interaction F = 8.4, p < .001, partial η² = .19)."', '"Practically, this finding implies that Ministry of Health guidelines for community health-worker programmes should…"'],
          ]},

        { type: 'callout', tone: 'gold', title: 'The one-sentence rule for Chapter 4 interpretation',
          body: 'You may (should) end each Section 4.5 sub-section with ONE conclusion sentence that answers the research question. "Perceived support was therefore the strongest predictor of engagement." That is Chapter 4. Anything more elaborate — connecting to theory, comparing to prior studies, drawing implications — is Chapter 5. If you find yourself writing more than one interpretive sentence per sub-section, move the extra content to Chapter 5.' },
      ],
    },

    /* ════════════════════ 10. WORKED EXAMPLE ════════════════════ */
    {
      id: 'worked-example',
      title: 'Worked example — full mini Chapter 4 skeleton',
      blocks: [
        { type: 'workedExample', title: 'A Master\'s thesis at Kenyatta University',
          body: [
            { label: 'The study',
              text: 'Predictors of employee engagement among 240 staff in three Nairobi hospitals. Three research questions: (RQ1) descriptive levels of engagement; (RQ2) demographic differences in engagement (gender, hospital); (RQ3) does perceived organisational support (POS) predict engagement beyond demographics?' },
            { label: 'Section 4.1 Introduction (½ page)',
              text: 'Two paragraphs: restate the three RQs, preview the chapter sections.' },
            { label: 'Section 4.2 Sample (1 page)',
              text: '4.2.1 Response rate: 240 usable of 300 distributed = 80%. Twelve excluded (>50% missing items). 4.2.2 Demographics table (age, gender, hospital, tenure, job level) + 3-sentence narrative.' },
            { label: 'Section 4.3 Descriptives (3-4 pages)',
              text: '4.3.1 Categorical (demographics already in 4.2). 4.3.2 Composite scales table: engagement M/SD, POS M/SD, plus range and n_items. 4.3.3 Per-item Likert frequencies grouped by construct (2 tables, one per composite).' },
            { label: 'Section 4.4 Preliminary analyses (2-3 pages)',
              text: 'Reliability table (Cronbach\'s α for engagement and POS scales). Normality: Shapiro-Wilk per outcome + note on Central Limit Theorem given n = 240. Multicollinearity: VIF table for the RQ3 regression (all VIF < 2). Levene\'s for the RQ2 group comparisons.' },
            { label: 'Section 4.5 Inferential analyses (8-10 pages)',
              text: '4.5.1 [RQ1] Levels of engagement: descriptive summary already in 4.3; one paragraph interpreting engagement M relative to scale midpoint. 4.5.2 [RQ2] Demographic differences: independent-samples t-test for gender (Table 4.5); one-way ANOVA + Tukey for hospital (Table 4.6); one paragraph per test. 4.5.3 [RQ3] POS as predictor: two-block hierarchical regression (Table 4.7); two-paragraph interpretation.' },
            { label: 'Section 4.6 Chapter summary (½ page)',
              text: 'One paragraph recapping the three headline findings, ending with a bridge to Chapter 5: "These findings are discussed in relation to the prior literature and their practical implications for Kenyan hospital HR practice in Chapter 5."' },
            { label: 'Appendix items (referenced from Chapter 4)',
              text: 'Full SPSS Model Summary / ANOVA / Coefficients output for the hierarchical regression; Q-Q plots per outcome; inter-item correlation matrices; the questionnaire instrument.' },
          ]},
      ],
    },

    /* ════════════════════ 11. MISTAKES ════════════════════ */
    {
      id: 'mistakes',
      title: 'Five structural mistakes that trigger revision cycles',
      blocks: [
        { type: 'mistake',
          title: 'Mistake 1 — Copy-pasting raw SPSS tables directly into the chapter',
          body: 'Every table in your Chapter 4 has SPSS\'s default styling — grey headers, "Model 1a", "Adjusted R Square", "Std. Error of the Estimate" columns nobody reads. It looks like SPSS output, not a professional thesis chapter.',
          fix: 'Rebuild every table in Word (or Excel then paste as picture) using clean, APA 7 formatting. Remove columns you don\'t interpret. Bold the KEY numbers. Give it a proper table number, title, and note. Lesson 2 (APA 7 reporting) covers the exact table format.' },

        { type: 'mistake',
          title: 'Mistake 2 — Organising Section 4.5 by test type instead of by research question',
          body: 'Your Section 4.5 has sub-sections "4.5.1 T-tests", "4.5.2 ANOVAs", "4.5.3 Regressions". The reader has to hunt across three sub-sections to find the results relevant to RQ2. Chapter loses coherence.',
          fix: 'Organise by RESEARCH QUESTION or HYPOTHESIS. "4.5.1 Gender differences in engagement (RQ2a)", "4.5.2 Hospital differences in engagement (RQ2b)", "4.5.3 POS as a predictor of engagement (RQ3)". Each sub-section may use different tests, and that\'s fine — reader never has to hunt.' },

        { type: 'mistake',
          title: 'Mistake 3 — Presenting tables without accompanying narrative',
          body: 'Your chapter is a wall of 15 tables with two-sentence paragraphs between them. Examiners cannot tell what you think the tables show or how they answer your questions.',
          fix: 'Every table needs 2-3 sentences of narrative BEFORE or AFTER pointing out its key features. "Table 4.5 shows that female employees reported significantly higher engagement (M = 4.12) than male employees (M = 3.78), t(238) = 2.94, p = .004, Cohen\'s d = 0.38." Never leave a table unnarrated.' },

        { type: 'mistake',
          title: 'Mistake 4 — Extensive literature comparison inside Chapter 4',
          body: 'Your Section 4.5.3 interprets the regression for two paragraphs, then goes on for another three paragraphs comparing to Smith (2018), Otieno (2021), and the Kenyan HR literature more broadly. Chapter 5 then has nothing to say and becomes a redundant recap.',
          fix: 'One concluding interpretive sentence per sub-section in Chapter 4. All literature comparison, mechanism speculation, and implication drawing move to Chapter 5. Chapter 4 reports what was found; Chapter 5 explains why it matters.' },

        { type: 'mistake',
          title: 'Mistake 5 — Skipping the Section 4.4 assumption-check evidence',
          body: 'You ran a hierarchical regression but Section 4.4 is empty except for one line about Cronbach\'s alpha. Examiners have no evidence that your VIF, normality, and homoscedasticity assumptions held. They will ask.',
          fix: 'For every inferential test in Section 4.5, verify the corresponding assumption check appears in Section 4.4. Present them as a summary table if you have many. This section is not optional decoration; it is your defence that Section 4.5\'s inferential results are trustworthy.' },
      ],
    },

    /* ════════════════════ 12. SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'summary', items: [
          'Chapter 4 has a standard six-section structure: 4.1 Introduction, 4.2 Sample, 4.3 Descriptives, 4.4 Preliminary analyses (assumption checks), 4.5 Inferential analyses (bulk of chapter), 4.6 Chapter summary.',
          'Follow descending-detail: sample → variables → assumptions → inferential → summary. Never skip 4.4.',
          'Section 4.5 is organised by RESEARCH QUESTION / HYPOTHESIS, not by test type. Each sub-section uses the four-step template: restate RQ → name and justify test → present table → 1-2 paragraph interpretation.',
          'Every table needs 2-3 sentences of narrative — never insert a table with no accompanying text.',
          'Group descriptive statistics into 3-5 tables by CONSTRUCT, not 20 tables (one per variable).',
          'Chapter body = tables essential to understanding each research question. Appendix = raw SPSS output, supporting instruments, additional plots.',
          'Results (Ch 4) reports WHAT was found. Discussion (Ch 5) explains WHY it matters. Keep the line bright — one interpretive sentence per sub-section in Ch 4.',
          'Use signposting sentences between sub-sections so examiners can navigate.',
          'Report failed assumptions honestly and state what you did (retained the test / switched to non-parametric / used a correction).',
          'Five mistakes to avoid: raw SPSS tables, organising by test type, no narrative, extensive lit comparison, missing assumption checks.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 2: APA 7 statistical reporting** we drill into the EXACT number-formatting rules, per-test reporting templates for every test in the SPSS Academy, table formatting per APA 7 spec, figure captions, and reference conventions.' },

        { type: 'paragraph', text:
          'Before moving on, sketch a Chapter 4 outline for your own thesis using the six-section structure. Map each research question to a sub-section under 4.5, and note which table + test each sub-section will contain. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 13. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'check',
          question: 'How should you organise Section 4.5 (Inferential analyses)?',
          choices: [
            'By test type — one sub-section for all t-tests, one for all ANOVAs, one for all regressions',
            'By RESEARCH QUESTION or HYPOTHESIS — one sub-section per RQ, using whatever test is appropriate for that RQ',
            'In chronological order of when you ran the analyses',
            'Alphabetically by variable name',
          ],
          answer: 1,
          explanation: 'Organising by test type forces the reader to hunt across sub-sections to find results relevant to each RQ. Organising by RQ means every sub-section directly answers a question the reader cares about. Within a sub-section, use the four-step template: restate RQ → name/justify test → present table → 1-2 paragraph interpretation. Same structure every sub-section = reader always oriented.' },

        { type: 'check',
          question: 'Which of the following belongs in Section 4.4 (Preliminary analyses & assumption checks) rather than Section 4.5?',
          choices: [
            'The main hierarchical regression coefficients table',
            'Cronbach\'s alpha for each composite scale, plus Shapiro-Wilk / Levene\'s / VIF results for the planned inferential tests',
            'The final significant t-test result',
            'The chapter summary',
          ],
          answer: 1,
          explanation: 'Section 4.4 presents the evidence that your subsequent inferential tests are legitimate — reliability (Cronbach\'s α), normality (Shapiro-Wilk), multicollinearity (VIF), homogeneity of variance (Levene\'s), sphericity (Mauchly\'s), etc. — depending on which tests you plan to run in Section 4.5. Without Section 4.4, examiners have no basis for trusting Section 4.5.' },

        { type: 'check',
          question: 'Your Section 4.5.3 reports a significant regression result. How much interpretation belongs in Chapter 4 vs Chapter 5?',
          choices: [
            'Report everything — findings, comparison to prior literature, mechanisms, and implications all in Chapter 4',
            'Report results factually with ONE concluding sentence per sub-section; save literature comparison, mechanism speculation, and policy implications for Chapter 5',
            'Skip interpretation entirely — Chapter 4 is just tables',
            'Report only the p-value',
          ],
          answer: 1,
          explanation: 'Chapter 4 = results (WHAT was found). Chapter 5 = discussion (WHY it matters). One concluding interpretive sentence per Section 4.5 sub-section is enough for Chapter 4. Extensive comparison to Smith (2018), theoretical mechanisms, and policy implications all belong in Chapter 5. If you write it all in Chapter 4, Chapter 5 becomes a redundant recap and both chapters suffer.' },

        { type: 'check',
          question: 'You have 20 variables and are tempted to make one descriptive table per variable. Better approach?',
          choices: [
            '20 separate tables is fine',
            'Group related variables into 3-5 tables by CONSTRUCT — e.g. one table for demographics, one for engagement items, one for POS items, one for composite scale scores. Each construct-table gets a narrative paragraph',
            'Skip descriptives',
            'Put all 20 in one massive table',
          ],
          answer: 1,
          explanation: '20 separate tables is unreadable. Group by CONSTRUCT: one table for demographics (with age, gender, education, hospital as rows), one per multi-item scale (with all items as rows and M/SD/% agree as columns), one for composite scale scores. This turns 20 tables into 4-5 readable tables and lets you write one meaningful narrative paragraph per construct.' },

        { type: 'check',
          question: 'Every table in your Chapter 4 body should…',
          choices: [
            'Come directly from raw SPSS output with default styling',
            'Have a proper number and title, be reformatted in Word/Excel using clean APA 7 style, and be accompanied by 2-3 sentences of narrative pointing out its key features',
            'Include every column SPSS produced',
            'Be placed at the end of the chapter as a batch',
          ],
          answer: 1,
          explanation: 'Raw SPSS tables look like SPSS output, not a professional thesis chapter. Rebuild each table in Word (or Excel-to-picture) using APA 7 formatting: proper number and title, only the columns you interpret, key numbers bold, professional layout. And every table needs 2-3 sentences of narrative naming its key features and tying it to the research question. Never insert an unnarrated table.' },

        { type: 'check',
          question: 'Your Shapiro-Wilk test for one outcome is significant (p = .01) with n = 240. What should you write in Section 4.4?',
          choices: [
            'Nothing — hide the failed assumption',
            'Report the result honestly and state what you did: "Shapiro-Wilk was significant for [outcome] (W = .93, p = .01), indicating a departure from normality. Given the sample size (n = 240), the parametric t-test is robust to mild non-normality via the Central Limit Theorem (Field, 2018), so the parametric test was retained." OR switch to non-parametric and say so',
            'Reduce the sample size to make it pass',
            'Drop the outcome from the analysis',
          ],
          answer: 1,
          explanation: 'Honesty is non-negotiable. Report failed assumptions transparently and state what you did in response — either retained the parametric test (with justification, e.g. large n and CLT) or switched to a non-parametric alternative. Hiding a failed assumption is a defence killer if examiners re-run your analysis. Documenting the response is a defence strengthener.' },
      ],
    },
  ],
};
