// Decision engine for the Statistical Test Selector.
// Each test entry has metadata + a `match` function that scores how well it fits
// the user's answers. We surface the top recommendations.

export const TESTS = {
  descriptive: {
    name: 'Descriptive Statistics',
    why: 'Use when your objective is simply to describe or summarize the data — means, frequencies, medians — without inferring relationships.',
    assumptions: ['No strict inferential assumptions', 'Choose measures of central tendency appropriate to the data type'],
    spssSteps: [
      'Analyze → Descriptive Statistics → Frequencies (for categorical variables).',
      'Analyze → Descriptive Statistics → Descriptives (for continuous variables).',
      'Select variables; tick Mean, Std. Deviation, Min, Max under Options.',
      'Click OK and review the output tables.',
    ],
    interpretation: 'Report frequencies and percentages for categorical variables; mean and standard deviation for continuous variables. Comment on dispersion and skewness.',
  },
  pearson: {
    name: 'Pearson Correlation',
    why: 'Use to assess the strength and direction of a linear relationship between two continuous, normally distributed variables.',
    assumptions: ['Both variables are continuous (interval/ratio)', 'Linear relationship', 'Approximately normal distribution', 'No major outliers'],
    spssSteps: [
      'Analyze → Correlate → Bivariate.',
      'Move both variables into the Variables box.',
      'Tick Pearson. Tick "Flag significant correlations".',
      'Click OK. Interpret the r value and Sig. (2-tailed).',
    ],
    interpretation: 'r ranges from -1 to +1. Above 0.5 = strong, 0.3–0.5 = moderate, below 0.3 = weak. p < 0.05 indicates a statistically significant relationship.',
  },
  spearman: {
    name: 'Spearman Rank Correlation',
    why: 'Use when the data is ordinal, or when continuous data violates normality assumptions — a non-parametric alternative to Pearson.',
    assumptions: ['Both variables at least ordinal', 'Monotonic relationship', 'Robust to non-normality'],
    spssSteps: [
      'Analyze → Correlate → Bivariate.',
      'Move both variables into the Variables box.',
      'Tick Spearman (uncheck Pearson).',
      'Click OK.',
    ],
    interpretation: 'Interpret rho (ρ) similarly to Pearson r. p < 0.05 indicates a significant monotonic association.',
  },
  ttest: {
    name: 'Independent Samples T-Test',
    why: 'Use to compare the mean of a continuous outcome between two independent groups.',
    assumptions: ['Continuous dependent variable', 'Two independent groups', 'Approximately normal distribution within each group', 'Homogeneity of variance (Levene\'s test)'],
    spssSteps: [
      'Analyze → Compare Means → Independent-Samples T Test.',
      'Move the continuous variable to Test Variable(s).',
      'Move the group variable to Grouping Variable; click Define Groups and enter codes.',
      'Click OK. Read Levene\'s test first, then the appropriate t-value row.',
    ],
    interpretation: 'If Levene\'s p > 0.05, use the "Equal variances assumed" row. Significant if t-test p < 0.05; report mean difference and 95% CI.',
  },
  anova: {
    name: 'One-Way ANOVA',
    why: 'Use to compare the mean of a continuous outcome across three or more independent groups.',
    assumptions: ['Continuous DV', 'Three+ independent groups', 'Normality within groups', 'Homogeneity of variance'],
    spssSteps: [
      'Analyze → Compare Means → One-Way ANOVA.',
      'Move the DV to Dependent List and the group variable to Factor.',
      'Click Post Hoc → tick Tukey (if variances are equal) or Games-Howell (if not).',
      'Click Options → tick Descriptive and Homogeneity of variance test.',
      'Click OK.',
    ],
    interpretation: 'F-statistic with p < 0.05 indicates at least one group mean differs. Use post-hoc tests to identify which pairs differ.',
  },
  chisquare: {
    name: 'Chi-Square Test of Independence',
    why: 'Use to test whether two categorical variables are independent or associated.',
    assumptions: ['Both variables categorical', 'Independent observations', 'Expected frequency ≥ 5 in at least 80% of cells'],
    spssSteps: [
      'Analyze → Descriptive Statistics → Crosstabs.',
      'Place one variable in Rows and one in Columns.',
      'Click Statistics → tick Chi-square and Phi/Cramer\'s V.',
      'Click Cells → tick Observed, Expected, Row/Column percentages.',
      'Click OK.',
    ],
    interpretation: 'Pearson Chi-Square p < 0.05 indicates a significant association. Report χ², df, p, and effect size (Cramer\'s V).',
  },
  regression: {
    name: 'Linear Regression',
    why: 'Use to model the predictive relationship of one or more independent variables on a continuous outcome.',
    assumptions: ['Linearity', 'Independence of residuals', 'Homoscedasticity', 'Normality of residuals', 'No multicollinearity (VIF < 10)'],
    spssSteps: [
      'Analyze → Regression → Linear.',
      'Place outcome in Dependent and predictor(s) in Independent(s).',
      'Click Statistics → tick Estimates, Confidence intervals, Model fit, Collinearity diagnostics.',
      'Click Plots → set ZRESID on Y axis and ZPRED on X axis; tick Histogram and Normal probability plot.',
      'Click OK.',
    ],
    interpretation: 'Report R² (variance explained), F-test of overall model, and standardized β coefficients with p-values for each predictor.',
  },
};

/**
 * Score how strongly each test fits the user's answers.
 * answers = { design, objective, variableType, numVariables }
 */
export function recommend(answers) {
  const { design, objective, variableType, numVariables } = answers;
  const score = Object.fromEntries(Object.keys(TESTS).map((k) => [k, 0]));

  // Objective drives the strongest signal
  if (objective === 'describe') score.descriptive += 5;
  if (objective === 'relationship') { score.pearson += 4; score.spearman += 3; score.regression += 2; }
  if (objective === 'difference') { score.ttest += 3; score.anova += 3; score.chisquare += 2; }
  if (objective === 'predict') { score.regression += 5; score.pearson += 1; }
  if (objective === 'association') { score.chisquare += 4; score.spearman += 2; }

  // Variable type
  if (variableType === 'continuous') { score.pearson += 2; score.ttest += 2; score.anova += 2; score.regression += 2; }
  if (variableType === 'ordinal') { score.spearman += 3; score.chisquare += 1; }
  if (variableType === 'categorical') { score.chisquare += 4; score.ttest += 1; score.anova += 2; }
  if (variableType === 'mixed') { score.regression += 2; score.anova += 1; }

  // Number of variables / groups
  if (numVariables === '1') { score.descriptive += 3; }
  if (numVariables === '2') { score.ttest += 2; score.pearson += 2; score.spearman += 2; score.chisquare += 2; }
  if (numVariables === '3+') { score.anova += 3; score.regression += 3; }

  // Design
  if (design === 'experimental') { score.ttest += 2; score.anova += 2; }
  if (design === 'crosssectional') { score.descriptive += 1; score.chisquare += 1; score.pearson += 1; }
  if (design === 'correlational') { score.pearson += 2; score.spearman += 2; score.regression += 2; }

  return Object.entries(score)
    .sort((a, b) => b[1] - a[1])
    .filter(([, s]) => s > 0)
    .slice(0, 3)
    .map(([k, s]) => ({ key: k, score: s, ...TESTS[k] }));
}
