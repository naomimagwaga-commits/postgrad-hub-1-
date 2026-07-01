# Curriculum Gap Analysis
**Guidebook (80 chapters) vs. SPSS Academy on the live site (24 lessons)**

Date: 2026‑06‑30

The site currently teaches 24 lessons across 6 courses (SPSS Basics, Descriptive Statistics, Correlation, Reliability, Regression, ANOVA). Below is a chapter‑by‑chapter comparison so you can see exactly what is already covered, what is **partially** covered (mentioned inside a lesson but not its own lesson), and what is **not covered at all**.

Legend:
- ✅ Covered as a full lesson
- 🟡 Partially covered (touched inside another lesson)
- ❌ Not in the site

---

## PART ONE — Foundations: Statistics and Variables
| # | Chapter | Status | Where (if any) |
|---|---|---|---|
| 1 | What statistics actually are | ❌ | — |
| 2 | Populations, samples, why we can't measure everyone | ❌ | — |
| 3 | Variables: the building blocks | 🟡 | mentioned in `basics-3` |
| 4 | Levels of measurement (nominal/ordinal/interval/ratio) | 🟡 | mentioned in `basics-2` Measure setting |
| 5 | Independent, dependent, control, mediator, moderator | ❌ | — |
| 6 | Continuous, discrete, categorical | 🟡 | mentioned in `basics-2` |

**Verdict:** Part One is essentially missing as standalone lessons. The whole "Foundations" course is absent.

---

## PART TWO — Research Design and Its Statistical Consequences
| # | Chapter | Status |
|---|---|---|
| 7 | What a research design actually is | ❌ |
| 8 | Cross‑sectional studies | ❌ |
| 9 | Longitudinal studies (panel, cohort, time‑series) | ❌ |
| 10 | True experimental studies | ❌ |
| 11 | Quasi‑experimental studies | ❌ |
| 12 | Correlational studies | ❌ |
| 13 | Survey studies | ❌ |
| 14 | Case studies and mixed methods | ❌ |
| 15 | How design dictates the test you may legally use | ❌ |

**Verdict:** Entire "Research Design" course missing. This is significant because the Test Selector module presumes students know their design.

---

## PART THREE — The SPSS Environment, Button by Button
| # | Chapter | Status | Where |
|---|---|---|---|
| 16 | Installing SPSS / opening it for the first time | ❌ | — |
| 17 | Data Editor: Data View & Variable View | ✅ | `basics-2` |
| 18 | The menu bar in full | ❌ | — |
| 19 | The toolbar icons in full | ❌ | — |
| 20 | The Output Viewer window | 🟡 | mentioned in `basics-1` |
| 21 | The Syntax Editor | ❌ | — |
| 22 | The Chart Builder window | 🟡 | touched in `desc-4` |
| 23 | Options and preferences to set on day one | ❌ | — |

**Verdict:** Only 1 of the 8 environment chapters has its own lesson.

---

## PART FOUR — Creating Datasets the Right Way
| # | Chapter | Status | Where |
|---|---|---|---|
| 24 | Planning your dataset before you touch SPSS | ❌ | — |
| 25 | Variable View column by column (Name/Type/Width/Decimals/Label/Values/Missing/Columns/Align/Measure/Role) | 🟡 | partial in `basics-3` |
| 26 | Naming conventions that survive a defence | ❌ | — |
| 27 | Value labels and missing‑value codes | 🟡 | partial in `basics-3` & `basics-5` |
| 28 | Entering data in Data View without errors | ❌ | — |
| 29 | Importing from Excel, CSV, Google Forms, KoboToolbox, ODK, REDCap | 🟡 | `basics-4` covers Excel only |
| 30 | Saving, backing up, version‑controlling your dataset | ❌ | — |

**Verdict:** 1 covered narrowly (Excel import). Kobo / ODK / REDCap / Google Forms — all relevant to Kenyan field research — are missing.

---

## PART FIVE — Data Cleaning and Preparation
| # | Chapter | Status | Where |
|---|---|---|---|
| 31 | The philosophy of clean data | 🟡 | covered in `clean-1` (Data Cleaning Basics — **FREE with any purchase**) |
| 32 | Detecting impossible values, typos, out‑of‑range entries | 🟡 | covered in `clean-1` |
| 33 | Outliers — when to keep, when to remove | ❌ | — |
| 34 | Missing values: MCAR, MAR, MNAR, patterns, treatments | 🟡 | `basics-5` (intro) + `clean-1` (MCAR/MAR/MNAR classification) |
| 35 | Duplicate cases | 🟡 | covered in `clean-1` |
| 36 | Recoding variables and reverse‑coding Likert items | 🟡 | covered in `clean-1` (reverse Likert deeply, recode briefly) |
| 37 | Compute Variable: totals, means, indices, dummies | 🟡 | covered in `clean-1` |
| 38 | Select Cases, Split File, Weight Cases | 🟡 | Select Cases in `clean-1`; Split File / Weight Cases still missing |
| 39 | Sort Cases, Aggregate, Restructure | ❌ | — |
| 40 | Merging files: adding cases / adding variables | ❌ | — |
| 41 | A complete data‑cleaning workflow | ✅ | `clean-1` includes the full 12-step workflow |

**Verdict:** The single foundational lesson (`clean-1`) now covers the survival essentials for thesis-level cleaning. Deeper coverage (outliers, full Select Cases/Split File/Weight Cases, Restructure, Merge) is on the roadmap as separate paid lessons.

---

## PART SIX — Descriptive Statistics and Visual Summaries
| # | Chapter | Status | Where |
|---|---|---|---|
| 42 | Central tendency: mean, median, mode | ✅ | `desc-2` |
| 43 | Dispersion: range, variance, SD, IQR | ✅ | `desc-3` |
| 44 | Frequencies, percentages, cross‑tabulations | 🟡 | `desc-1` covers frequencies; **cross‑tabs missing** |
| 45 | Bar/pie/histograms/stem‑and‑leaf/boxplots | ✅ | `desc-4` |
| 46 | Shape of a distribution: skewness, kurtosis | ❌ | — |
| 47 | Normality (visual + statistical checks — K‑S, Shapiro‑Wilk, Q‑Q) | 🟡 | mentioned in `reg-3` |
| 48 | Standard scores, z‑scores, percentiles | ❌ | — |
| 49 | Writing the descriptive‑statistics section of Chapter 4 | ❌ | — |

**Verdict:** Best‑covered part of the guidebook, but skewness/kurtosis, z‑scores, normality testing, and APA write‑up of descriptives are missing.

---

## PART SEVEN — Inferential Statistics, One Test at a Time
| # | Chapter | Status | Where |
|---|---|---|---|
| 50 | The logic of inference | ❌ | — |
| 51 | Hypotheses, p‑values, alpha, Type I/II, power | ❌ | — |
| 52 | Effect size and confidence intervals | 🟡 | touched in `anova-1`, `reg-2` |
| 53 | **THE MASTER DECISION TREE** | ✅ | `master-1` (added 2026‑06‑30 · **FREE with SPSS Basics**) |
| 54 | Independent‑Samples t‑test | ✅ | `ttest-1` (added 2026‑06‑30) |
| 55 | Paired‑Samples t‑test | ✅ | `ttest-2` (added 2026‑06‑30) |
| 56 | One‑Sample t‑test | ✅ | `ttest-3` (added 2026‑06‑30) |
| 57 | One‑Way ANOVA (with post‑hoc) | ✅ | `anova-1` + `anova-2` |
| 58 | Two‑Way ANOVA | ✅ | `anova-3` |
| 59 | Repeated‑Measures ANOVA | ✅ | `anova-4` |
| 60 | Mixed ANOVA (between × within) | ✅ | `advanova-3` (added 2026‑06‑30) |
| 61 | ANCOVA | ✅ | `advanova-1` (added 2026‑06‑30) |
| 62 | MANOVA | ✅ | `advanova-2` (added 2026‑06‑30) |
| 63 | Chi‑square (goodness‑of‑fit, independence) + Fisher's Exact | ✅ | `chi-1` (added 2026‑06‑30) |
| 64 | Pearson correlation | ✅ | `cor-1` |
| 65 | Spearman and Kendall correlations | 🟡 | `cor-2` (Spearman only — Kendall missing) |
| 66 | Point‑biserial and partial correlations | 🟡 | `cor-3` (partial only — point‑biserial missing) |
| 67 | Simple linear regression | ✅ | `reg-1` |
| 68 | Multiple regression | ✅ | `reg-2` |
| 69 | Hierarchical and stepwise regression | ✅ | `advreg-1` (added 2026‑06‑30) |
| 70 | Binary logistic regression | ✅ | `reg-4` |
| 71 | Multinomial and ordinal logistic regression | ✅ | `advreg-2` (added 2026‑06‑30) |
| 72 | Reliability: Cronbach's α, McDonald's ω, split‑half | 🟡 | `rel-1`/`rel-3` (McDonald's ω missing) |
| 73 | Exploratory factor analysis / PCA | ❌ | — |
| 74 | Confirmatory factor analysis (AMOS pointer) | ❌ | — |
| 75 | Non‑parametric alternatives (Mann‑Whitney, Wilcoxon, Kruskal‑Wallis, Friedman) | ✅ | `np-1`, `np-2`, `np-3`, `np-4` (added 2026‑06‑30) |
| 76 | Mediation and moderation (PROCESS macro) | ❌ | — |

**Verdict:** This is where the biggest gap sits. **All three t‑tests, chi‑square, ANCOVA, MANOVA, Mixed ANOVA, hierarchical regression, multinomial/ordinal logistic, EFA/PCA/CFA, all non‑parametric tests, and PROCESS mediation/moderation are missing.** These are bread‑and‑butter for Kenyan postgrad theses.

---

## PART EIGHT — Interpretation, Writing, and Defence
| # | Chapter | Status |
|---|---|---|
| 77 | Line‑by‑line interpretation of every SPSS output table | ❌ |
| 78 | Writing Chapter 4 of a thesis (descriptive → inferential → discussion) | ✅ | `write-1` (added 2026‑06‑30) |
| 79 | APA 7 statistical reporting in full | ✅ | `write-2` (added 2026‑06‑30) |
| 80* | (Defence prep — implied in part name) | ❌ |

---

# Summary Scorecard
| Part | Chapters | ✅ Full | 🟡 Partial | ❌ Missing |
|---|---|---|---|---|
| 1 — Foundations | 6 | 0 | 3 | 3 |
| 2 — Research Design | 9 | 0 | 0 | 9 |
| 3 — SPSS Environment | 8 | 1 | 2 | 5 |
| 4 — Creating Datasets | 7 | 0 | 3 | 4 |
| 5 — Data Cleaning | 11 | 0 | 1 | 10 |
| 6 — Descriptive Statistics | 8 | 3 | 2 | 3 |
| 5 — Data Cleaning | 11 | 1 | 7 | 3 |
| 7 — Inferential Statistics | 27 | 18 | 4 | 5 |
| 8 — Interpretation & Writing | 3 | 2 | 0 | 1 |
| **TOTAL** | **79** | **24** | **21** | **34** |

**Coverage rate: roughly 30% fully covered, 27% partially, 43% missing.**
*(Updated 2026‑06‑30: added three t‑test lessons (Ch 54, 55, 56), the Master Decision Tree (Ch 53), the full Non‑parametric tests course (Ch 75), Chi‑square + Fisher's Exact (Ch 63), Data Cleaning Basics (covering Ch 31, 32, 34, 35, 36, 37, 38 partial, and Ch 41 fully), Hierarchical & stepwise regression (Ch 69), Multinomial & ordinal logistic regression (Ch 71), the full Advanced ANOVA course — Mixed ANOVA, ANCOVA, MANOVA (Ch 60, 61, 62), and the Writing Up course — Writing Chapter 4 and APA 7 statistical reporting (Ch 78, 79). Master Decision Tree is FREE with any SPSS Basics unlock; Data Cleaning Basics is FREE with any paid lesson.)*

---

# The Highest‑Impact Gaps (recommended priority)

If you want to fill the most painful gaps for a Kenyan postgrad first, in order:

1. **Master Decision Tree lesson (Ch 53)** — your Test Selector module needs a teaching companion.
2. **The three t‑tests (Ch 54–56)** — every undergrad thesis has at least one.
3. **Chi‑square + Fisher's Exact (Ch 63)** — second most common test in survey research.
4. **Non‑parametric tests (Ch 75)** — needed whenever normality fails (very common with small Kenyan samples).
5. **Data Cleaning workflow (Ch 31–41)** — at minimum: recoding, reverse‑coding Likert, Compute Variable, Select Cases, outliers, duplicates.
6. **Normality, skewness, kurtosis, z‑scores (Ch 46–48)** — required before any parametric test.
7. **Hypotheses, p‑values, Type I/II, power, effect sizes (Ch 50–52)** — the inferential foundation.
8. **Hierarchical regression + ordinal/multinomial logistic (Ch 69, 71)** — common in social‑science theses.
9. **EFA / PCA (Ch 73)** — needed for scale validation chapters.
10. **Mediation/moderation with PROCESS (Ch 76)** — increasingly demanded by supervisors.
11. **Writing Chapter 4 + APA 7 reporting lesson (Ch 78–79)** — turns analysis into a thesis.
12. **Research design course (Part 2)** — sits naturally as a prerequisite course before SPSS.

---

If you'd like, I can start building these as new lessons (same Pearson‑depth structure: scene → big idea → SPSS click path → output reading → worked example → APA write‑up → mistakes → knowledge check). Tell me which gap to tackle first and I'll add it to the curriculum.
