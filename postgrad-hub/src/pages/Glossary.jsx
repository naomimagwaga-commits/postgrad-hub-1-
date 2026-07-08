import { useState, useMemo } from 'react';
import PublicNav from '../components/PublicNav.jsx';
import Footer from '../components/Footer.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';

const CATEGORIES = ['All', 'Basics', 'Tests', 'Results', 'Diagnostics', 'Data'];

const TERMS = [
  // ─── BASICS ─────────────────────────────────────────
  { term: 'Variable', cat: 'Basics',
    plain: 'A column in your dataset — like a question on your questionnaire. "Age" is a variable. "Gender" is a variable. Every row (person) has a value for every variable.',
    example: 'In the Machakos dataset, "Teacher_Competency" is a variable — every one of the 274 respondents has a score for it.',
    where: 'Every lesson, especially SPSS Basics: Defining Variables' },
  { term: 'Mean', cat: 'Basics',
    plain: 'The average. Add up all the numbers, divide by how many there are. Like when you say "the class average was 7 out of 10."',
    example: 'In the Nakuru Wellness dataset, the average SBP at Time 0 was 142.4 mmHg.',
    where: 'Descriptive Statistics → Central Tendency' },
  { term: 'Median', cat: 'Basics',
    plain: 'The middle number when you line everyone up from smallest to largest. Half the people are above it, half below. Better than the mean when you have extreme values (like one person earning 10 million and the rest earning 50,000).',
    example: 'If 5 students scored 3, 4, 5, 6, 90 on a test, the median is 5 — not dragged up by that 90 like the mean would be.',
    where: 'Descriptive Statistics → Central Tendency' },
  { term: 'Standard Deviation (SD)', cat: 'Basics',
    plain: 'How spread out your numbers are. A small SD means everyone scored similarly. A big SD means scores were all over the place. Think of it as: "On average, how far is each person from the mean?"',
    example: 'In Kiambu Maize, DAP fertilizer had an average yield of ~1,840 kg/acre with an SD of ~280 — meaning most farms were within ±280 kg of that average.',
    where: 'Descriptive Statistics → Dispersion' },
  { term: 'Variance', cat: 'Basics',
    plain: 'The standard deviation squared. It\'s the same idea — how spread out things are — but in squared units. You rarely report variance; you report SD. But ANOVA literally stands for "Analysis of VARIANCE."',
    example: 'If SD = 5, then variance = 25.',
    where: 'ANOVA lessons' },
  { term: 'Frequency', cat: 'Basics',
    plain: 'How often something appears. "Out of 274 Machakos respondents, 54 were teachers" — 54 is the frequency for teachers.',
    example: 'In the Nyandarua Vaccine dataset, you might count: how many respondents had Primary education? Secondary? That\'s a frequency table.',
    where: 'Descriptive Statistics → Frequencies' },
  { term: 'Percentage', cat: 'Basics',
    plain: 'Frequency expressed "out of 100." If 54 out of 274 are teachers, that\'s 19.7%. Percentages make it easier to compare groups of different sizes.',
    example: '19.7% of Machakos respondents were teachers — that\'s roughly 1 in 5.',
    where: 'Descriptive Statistics → Frequencies' },
  { term: 'Outlier', cat: 'Basics',
    plain: 'A value that\'s way too high or way too low compared to the rest. Like if most students scored 5–8 on KCSE but one person scored 2.0 — that\'s an outlier. Outliers can mess up your results, so you need to check for them.',
    example: 'In Machakos, a school with InvestmentPerStudent of 500,000 when the rest are 1,000–25,000 would be an outlier.',
    where: 'Data Cleaning Basics' },
  { term: 'Missing Value', cat: 'Basics',
    plain: 'A blank spot in your data — a respondent who didn\'t answer a question, or data that got lost. SPSS marks these with a dot (.). You have to decide what to do with them before analyzing.',
    example: 'In the Mombasa Patient Satisfaction dataset, a patient who skipped question PSS_7 has a missing value for that item.',
    where: 'SPSS Basics → Missing Values' },
  { term: 'Categorical Variable', cat: 'Basics',
    plain: 'A variable where the answers are categories, not numbers. Like Gender (Male/Female), Fertilizer (DAP/CAN/Organic), or Vaccine_Acceptance (Yes/No). You can\'t average categories — you can only count them.',
    example: 'In Kiambu Maize, "Fertilizer" is categorical with 3 categories: DAP, CAN, Organic.',
    where: 'Used in t-tests, Chi-square, ANOVA' },
  { term: 'Continuous Variable', cat: 'Basics',
    plain: 'A variable that\'s a real number — you can have 5.3, 5.31, 5.312, etc. Things like age, yield in kg, blood pressure, or test scores. You CAN average these.',
    example: 'Yield_kg_per_acre in Kiambu is continuous — a farm can produce 1,840.5 kg.',
    where: 'Used in correlation, regression, t-tests' },
  { term: 'Ordinal Variable', cat: 'Basics',
    plain: 'Categories that have a natural order, but the gaps between them aren\'t necessarily equal. Like Likert scales: 1=Strongly Disagree, 2=Disagree, 3=Neutral, 4=Agree, 5=Strongly Agree. You know 5 > 4, but "the jump from 1 to 2" isn\'t necessarily the same as "the jump from 4 to 5."',
    example: 'PSS_1 through PSS_15 in Mombasa are ordinal (1–5 satisfaction ratings).',
    where: 'Reliability Testing, Non-parametric tests' },
  { term: 'Sample', cat: 'Basics',
    plain: 'The group of people you actually collected data from. Your sample is NOT the whole population — it\'s the people you reached. A good sample represents the bigger group you\'re trying to understand.',
    example: 'The 274 respondents in Machakos are the SAMPLE. You\'re using them to understand ALL students, teachers, and principals in Machakos County.',
    where: 'Every lesson' },
  { term: 'Population', cat: 'Basics',
    plain: 'EVERYONE you want to make conclusions about. You can\'t test everyone, so you take a sample and hope it represents the population.',
    example: 'In Machakos, the population is ALL principals + teachers + students in the county. Your 274 respondents are a sample of that population.',
    where: 'Every lesson' },

  // ─── TESTS ─────────────────────────────────────────
  { term: 't-test', cat: 'Tests',
    plain: 'A test that compares the MEANS of TWO groups. "Is there a real difference in yield between DAP and CAN farms?" — that\'s a t-test question.',
    example: 'Comparing maize yield between DAP (mean ~1,840) and Organic (mean ~1,450) in Kiambu — that needs an Independent Samples t-test.',
    where: 'T-Tests → Independent Samples t-test' },
  { term: 'One-sample t-test', cat: 'Tests',
    plain: 'Compares YOUR group\'s mean to a KNOWN number. "Is the average blood pressure of my patients different from the national average of 120 mmHg?"',
    example: 'If the national average SBP is 120, does the Nakuru group (mean 142.4 at Time 0) differ from that?',
    where: 'T-Tests → One-sample t-test' },
  { term: 'Paired t-test', cat: 'Tests',
    plain: 'Compares the SAME people measured TWICE. "Did blood pressure drop after the intervention?" — because you\'re measuring each person before AND after, the test is "paired."',
    example: 'Nakuru Wellness: SBP at Time 0 (142.4) vs Time 1 (138.9) for the same 45 people — paired t-test.',
    where: 'T-Tests → Paired t-test' },
  { term: 'ANOVA', cat: 'Tests',
    plain: 'Analysis of Variance — a t-test but for THREE OR MORE groups. "Do DAP, CAN, and Organic fertilizers produce different yields?" Three groups = ANOVA, not t-test.',
    example: 'Kiambu Maize: F(2, 177) = 22.40, p < .001 — the 3 fertilizers produce significantly different yields.',
    where: 'ANOVA → One-way ANOVA' },
  { term: 'Repeated Measures ANOVA', cat: 'Tests',
    plain: 'ANOVA but when the SAME people are measured THREE OR MORE times. "Did blood pressure change across Time 0, Time 1, AND Time 2?" Three time points on the same 45 people = Repeated Measures ANOVA.',
    example: 'Nakuru Wellness: SBP measured at T0, T1, and T2 for the same 45 participants.',
    where: 'ANOVA → Repeated Measures ANOVA' },
  { term: 'ANCOVA', cat: 'Tests',
    plain: 'ANOVA with a covariate — a variable you want to "control for." If farm size might affect yield, ANCOVA lets you compare fertilizers WHILE HOLDING farm size constant.',
    example: 'Kiambu: comparing fertilizer yields while controlling for FarmSizeAcres.',
    where: 'ANOVA → ANCOVA' },
  { term: 'MANOVA', cat: 'Tests',
    plain: 'ANOVA but with TWO OR MORE dependent variables at once. Instead of just yield, what if you also care about grain quality? MANOVA tests both together.',
    example: 'Kiambu: testing fertilizer effect on both Yield_kg_per_acre AND GrainQuality_Score simultaneously.',
    where: 'ANOVA → MANOVA' },
  { term: 'Chi-square', cat: 'Tests',
    plain: 'Tests if two CATEGORICAL variables are related. "Is education level linked to vaccine acceptance?" Both are categories (not numbers) — chi-square is your test.',
    example: 'Nyandarua Vaccine: Education (Primary/Secondary/Diploma/Degree/Postgrad) × Vaccine_Acceptance (Yes/No). N=320.',
    where: 'Chi-Square lesson' },
  { term: 'Pearson Correlation', cat: 'Tests',
    plain: 'Measures how strongly two CONTINUOUS variables move together in a straight line. r ranges from -1 (perfect negative) through 0 (no relationship) to +1 (perfect positive).',
    example: 'Machakos: does Internet_Connectivity relate to Math_KCSE_Mean? Pearson r tells you the strength and direction.',
    where: 'Correlation → Pearson' },
  { term: 'Spearman Correlation', cat: 'Tests',
    plain: 'Like Pearson, but for when your data isn\'t normally distributed OR when one/both variables are ordinal (ranked). It looks at ranks, not raw numbers.',
    example: 'If your satisfaction scores (1–5) are heavily skewed, use Spearman instead of Pearson.',
    where: 'Correlation → Spearman' },
  { term: 'Regression', cat: 'Tests',
    plain: 'Predicts one variable from another. "Can I predict Math_KCSE_Mean based on Digital_Devices, Teacher_Competency, and Internet_Connectivity?" Regression gives you an equation.',
    example: 'Machakos: predicting Math_KCSE_Mean from multiple digital-learning variables.',
    where: 'Regression → Simple & Multiple' },
  { term: 'Logistic Regression', cat: 'Tests',
    plain: 'Regression when your outcome is YES/NO (or any two categories). "Can we predict Vaccine_Acceptance (Yes/No) from Education and Age?"',
    example: 'Nyandarua: predicting Vaccine_Acceptance from Education level, age, gender, etc.',
    where: 'Regression → Logistic Regression' },
  { term: 'Cronbach\'s Alpha', cat: 'Tests',
    plain: 'Checks if all the items in your questionnaire are measuring the same thing. Alpha ranges from 0 to 1. Above 0.7 = acceptable. Above 0.8 = good. Above 0.9 = excellent.',
    example: 'Mombasa Patient Satisfaction: 15-item scale, α = .842 — meaning the items hang together well.',
    where: 'Reliability → Cronbach\'s Alpha' },
  { term: 'Friedman Test', cat: 'Tests',
    plain: 'The non-parametric version of Repeated Measures ANOVA. Use it when the same people are measured 3+ times BUT your data isn\'t normally distributed.',
    example: 'If Nakuru SBP data were heavily skewed, Friedman would replace RM-ANOVA.',
    where: 'ANOVA → Friedman' },
  { term: 'Mann-Whitney U', cat: 'Tests',
    plain: 'The non-parametric version of the Independent t-test. Use it when comparing TWO groups but your data isn\'t normally distributed.',
    example: 'Comparing satisfaction between Male vs Female patients when the satisfaction scores aren\'t normal.',
    where: 'T-Tests → Mann-Whitney' },
  { term: 'Wilcoxon Signed-Rank', cat: 'Tests',
    plain: 'The non-parametric version of the Paired t-test. Same people, two time points, but data isn\'t normal.',
    example: 'Nakuru SBP: Time 0 vs Time 1, if the differences aren\'t normally distributed.',
    where: 'T-Tests → Wilcoxon' },
  { term: 'Kruskal-Wallis', cat: 'Tests',
    plain: 'The non-parametric version of One-way ANOVA. Three or more groups, but data isn\'t normal.',
    example: 'Comparing Kiambu maize yields across 3 fertilizers when yield data is heavily skewed.',
    where: 'ANOVA → Kruskal-Wallis' },

  // ─── RESULTS ─────────────────────────────────────────
  { term: 'p-value', cat: 'Results',
    plain: 'The probability that your results happened by pure chance. p < .05 means there\'s less than a 5% chance the difference/relationship you found is just luck. If p < .05, we call it "statistically significant."',
    example: 'Kiambu: p < .001 — there\'s less than a 0.1% chance the fertilizer differences are due to luck.',
    where: 'Every test produces a p-value' },
  { term: 'Significance level (alpha, α)', cat: 'Results',
    plain: 'The threshold you set BEFORE running your test. Usually α = .05 (5%). If your p-value is below this threshold, the result is "significant." It\'s like a pass mark.',
    example: 'If α = .05 and your p = .03 → significant (you passed). If p = .07 → not significant (you didn\'t pass).',
    where: 'Every test uses α = .05 by default' },
  { term: 'Effect size', cat: 'Results',
    plain: 'How BIG the difference or relationship is — not just whether it exists. A result can be statistically significant (real) but tiny (not useful). Effect size tells you the practical importance.',
    example: 'Kiambu: η² = .20 — fertilizer type explains 20% of the variation in yield. That\'s a large effect.',
    where: 'Reported with every significant test' },
  { term: 'Confidence Interval (CI)', cat: 'Results',
    plain: 'A range that likely contains the "true" value in the whole population. A 95% CI means: if you repeated this study 100 times, about 95 of those intervals would contain the true value.',
    example: '"Mean yield for DAP = 1,840 kg, 95% CI [1,770, 1,910]" — we\'re 95% confident the true average is between 1,770 and 1,910.',
    where: 'Reported with means, differences, and regression coefficients' },
  { term: 'R-squared (R²)', cat: 'Results',
    plain: 'In regression: the percentage of variation in your outcome that your predictors explain. R² = .60 means your model explains 60% of the differences in the outcome.',
    example: 'If R² = .45 when predicting Math_KCSE_Mean, your predictors explain 45% of the variation in math scores.',
    where: 'Regression → Simple & Multiple' },
  { term: 'F-statistic', cat: 'Results',
    plain: 'The test statistic for ANOVA. It compares variation BETWEEN groups to variation WITHIN groups. A big F means the groups are more different from each other than from themselves.',
    example: 'Kiambu: F(2, 177) = 22.40 — that\'s a very large F, indicating strong differences between fertilizer groups.',
    where: 'ANOVA, Regression' },
  { term: 'Null Hypothesis (H₀)', cat: 'Results',
    plain: 'The "nothing is happening" assumption. "There is NO difference between DAP and CAN yields." Statistics tests try to REJECT this. If p < .05, you reject the null and say "something IS happening."',
    example: 'H₀: "Fertilizer type does NOT affect maize yield." If p < .05, you reject this and conclude fertilizer DOES matter.',
    where: 'Every test starts with a null hypothesis' },
  { term: 'Alternative Hypothesis (H₁)', cat: 'Results',
    plain: 'The opposite of the null. "There IS a difference between DAP and CAN yields." This is what you\'re usually trying to support.',
    example: 'H₁: "Fertilizer type DOES affect maize yield." You hope your data supports this.',
    where: 'Every test' },
  { term: 'Degrees of Freedom (df)', cat: 'Results',
    plain: 'The number of values in your calculation that are "free to vary." Think of it as how much independent information you have. It affects the critical values your test statistic is compared against.',
    example: 'Kiambu: F(2, 177) — the "2" and "177" are the degrees of freedom. 180 participants - 3 groups = 177.',
    where: 'Reported with every test statistic' },
  { term: 'Cohen\'s d', cat: 'Results',
    plain: 'Effect size for t-tests. d = 0.2 is small, 0.5 is medium, 0.8 is large. It tells you how different two groups are in standard deviation units.',
    example: 'If Cohen\'s d = 1.2 comparing DAP vs Organic yields, that\'s a very large difference.',
    where: 'T-tests, sometimes ANOVA' },
  { term: 'Eta-squared (η²)', cat: 'Results',
    plain: 'Effect size for ANOVA. The proportion of total variance explained by your grouping variable. .01 = small, .06 = medium, .14 = large.',
    example: 'Kiambu: η² = .20 — large effect. Fertilizer explains 20% of yield variation.',
    where: 'ANOVA → One-way & Repeated Measures' },
  { term: 'Cronbach\'s alpha (α)', cat: 'Results',
    plain: 'Internal consistency reliability. How well your scale items hang together. < .60 = poor, .60–.70 = questionable, .70–.80 = acceptable, .80–.90 = good, > .90 = excellent.',
    example: 'Mombasa PSS: α = .842 → good internal consistency.',
    where: 'Reliability → Cronbach\'s Alpha' },
  { term: 'Post-hoc test', cat: 'Results',
    plain: 'After ANOVA says "something is different," post-hoc tests tell you WHAT specifically is different. Like Tukey\'s HSD: it compares every pair of groups.',
    example: 'Kiambu ANOVA is significant — but is it DAP vs CAN? DAP vs Organic? Post-hoc tests answer that.',
    where: 'ANOVA → Post-hoc tests' },

  // ─── DIAGNOSTICS ─────────────────────────────────────────
  { term: 'Normality', cat: 'Diagnostics',
    plain: 'Whether your data forms a bell-shaped curve. Many tests (t-test, ANOVA, Pearson) assume normality. If your data is very skewed, use non-parametric tests instead.',
    example: 'If Kiambu yields are heavily right-skewed (a few farms with huge yields), normality is violated → use Kruskal-Wallis instead of ANOVA.',
    where: 'Assumption check for parametric tests' },
  { term: 'Homogeneity of Variance', cat: 'Diagnostics',
    plain: 'The groups you\'re comparing should have similar spread (SDs). If DAP yields vary a lot but CAN yields are very consistent, this assumption is violated.',
    example: 'Tested with Levene\'s test before running an independent t-test or ANOVA.',
    where: 'Assumption for t-tests, ANOVA' },
  { term: 'Multicollinearity', cat: 'Diagnostics',
    plain: 'When two predictor variables in regression are too highly correlated with EACH OTHER. If Digital_Devices and Internet_Connectivity are almost the same thing, the regression can\'t tell which one really matters.',
    example: 'Checked with VIF (Variance Inflation Factor). VIF > 10 = problem.',
    where: 'Regression → Diagnostics' },
  { term: 'Homoscedasticity', cat: 'Diagnostics',
    plain: 'The errors in your regression should be roughly the same size across all predicted values. If errors get bigger as predictions get bigger, you have heteroscedasticity — and your results might not be trustworthy.',
    example: 'Checked with a scatterplot of residuals vs predicted values.',
    where: 'Regression → Diagnostics' },
  { term: 'Residuals', cat: 'Diagnostics',
    plain: 'The gap between what your model PREDICTED and what ACTUALLY happened. "The model predicted a yield of 1,800 but the farm actually produced 1,600 — residual = -200."',
    example: 'If residuals are randomly scattered around zero, your model is good. If they show a pattern, the model is missing something.',
    where: 'Regression → Diagnostics' },
  { term: 'Sphericity', cat: 'Diagnostics',
    plain: 'For Repeated Measures ANOVA: the assumption that the variance of differences between all pairs of time points is equal. If violated, use Greenhouse-Geisser correction.',
    example: 'In Nakuru with 3 time points, sphericity is tested with Mauchly\'s test.',
    where: 'ANOVA → Repeated Measures' },

  // ─── DATA ─────────────────────────────────────────
  { term: 'Data Cleaning', cat: 'Data',
    plain: 'Fixing problems in your dataset BEFORE you analyze. Removing duplicates, fixing wrong entries, handling missing values, checking for outliers. Like proofreading an essay before submitting.',
    example: 'In Machakos, you might find a 200-year-old "student" or a negative InvestmentPerStudent — those need fixing.',
    where: 'Data Cleaning Basics lesson' },
  { term: 'Coding / Recoding', cat: 'Data',
    plain: 'Changing how values are represented. Converting "Male/Female" to 1/0, or grouping ages into categories (18–25, 26–35, etc.).',
    example: 'Recoding Gender: Male = 1, Female = 2 for SPSS analysis.',
    where: 'SPSS Basics → Data View' },
  { term: 'Scale / Composite Score', cat: 'Data',
    plain: 'Combining multiple items into one score by averaging or summing them. If your questionnaire has 15 satisfaction items, you can create one "Overall Satisfaction" score by averaging all 15.',
    example: 'Mombasa: average all 15 PSS items to get one "Patient Satisfaction Score" per patient.',
    where: 'Reliability → Item-Total, Split-Half' },
  { term: 'Likert Scale', cat: 'Data',
    plain: 'A rating scale, usually 1–5 or 1–7, where each number has a label. Named after psychologist Rensis Likert. E.g.: 1=Strongly Disagree, 2=Disagree, 3=Neutral, 4=Agree, 5=Strongly Agree.',
    example: 'Mombasa PSS items are 5-point Likert scales.',
    where: 'Reliability, many questionnaires' },
  { term: 'Dataset', cat: 'Data',
    plain: 'Your entire collection of data — one file with rows (cases/people) and columns (variables). In SPSS, it\'s called a .sav file.',
    example: 'The Machakos dataset has 274 rows (respondents) and 21 columns (variables).',
    where: 'Every lesson' },
  { term: 'Case', cat: 'Data',
    plain: 'One row in your dataset — one person, one farm, one hospital. Each case has values for every variable.',
    example: 'In Kiambu, each of the 180 farms is a case.',
    where: 'Every lesson' },
  { term: 'Digital Data Collection Tool', cat: 'Data',
    plain: 'A system (like an online form) where respondents fill in answers digitally on their phones or computers, instead of using paper questionnaires. Answers are automatically saved as a dataset — no manual data entry needed.',
    example: 'When you submit your questionnaire for refinement, we convert it into a digital data-collection link.',
    where: 'Questionnaire service' },
  { term: 'Parametric Test', cat: 'Data',
    plain: 'A test that assumes your data follows certain rules (normal distribution, equal variances). Examples: t-test, ANOVA, Pearson correlation. More powerful — but you need to meet the assumptions.',
    example: 'If Kiambu yields are normally distributed, use parametric ANOVA.',
    where: 'All parametric lessons' },
  { term: 'Non-parametric Test', cat: 'Data',
    plain: 'A test that DOESN\'T require normality or other strict assumptions. Use when your data is skewed, ordinal, or has small sample sizes. Less powerful, but safer.',
    example: 'Kruskal-Wallis (non-parametric ANOVA), Mann-Whitney (non-parametric t-test), Friedman (non-parametric RM-ANOVA).',
    where: 'ANOVA → Kruskal-Wallis, Friedman; T-Tests → Mann-Whitney, Wilcoxon' },
  { term: 'APA Style', cat: 'Data',
    plain: 'The formatting rules for writing up research in social sciences — created by the American Psychological Association. Covers how to report statistics, cite sources, format tables, etc. Your university almost certainly requires APA 7th edition.',
    example: 'F(2, 177) = 22.40, p < .001, η² = .20 — this is APA format for reporting an ANOVA result.',
    where: 'Writing Up → APA 7 Reporting' },
];

export default function Glossary() {
  usePageTitle('Statistical Terms Glossary');
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');

  const filtered = useMemo(() => {
    return TERMS.filter(t => {
      const matchSearch = search === '' ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.plain.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCat === 'All' || t.cat === activeCat;
      return matchSearch && matchCat;
    });
  }, [search, activeCat]);

  const catColors = {
    Basics: 'bg-blue-100 text-blue-800',
    Tests: 'bg-emerald-100 text-emerald-800',
    Results: 'bg-amber-100 text-amber-800',
    Diagnostics: 'bg-rose-100 text-rose-800',
    Data: 'bg-violet-100 text-violet-800',
  };

  return (
    <div className="min-h-screen bg-parchment">
      <PublicNav />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 lg:pt-24 lg:pb-8">
        <span className="eyebrow">— Plain-English reference</span>
        <h1 className="display text-4xl lg:text-5xl text-brand mt-3">
          Statistical Terms <span className="italic font-light">Glossary</span>
        </h1>
        <div className="gold-rule mt-6"/>
        <p className="mt-6 text-slate-600 max-w-2xl leading-relaxed">
          Every term explained like you're 15 — no jargon without a real example. Search for a term, filter by category, or scroll through. Bookmark this page — you'll use it throughout your project.
        </p>
      </section>

      {/* Search + filter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sticky top-16 z-20 bg-parchment/90 backdrop-blur">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search any term... e.g. p-value, ANOVA, outlier"
              className="w-full pl-10 pr-4 py-3 bg-white/80 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition cursor-pointer ${
                activeCat === c
                  ? 'bg-brand text-white border-brand'
                  : 'bg-white/60 text-slate-600 border-slate-200 hover:border-gold'
              }`}
            >
              {c} {c !== 'All' && `(${TERMS.filter(t => t.cat === c).length})`}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2">{filtered.length} term{filtered.length !== 1 ? 's' : ''}</p>
      </section>

      {/* Terms */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p className="text-lg">No terms match your search.</p>
            <button onClick={() => { setSearch(''); setActiveCat('All'); }} className="mt-3 text-gold-700 underline cursor-pointer">Clear filters</button>
          </div>
        )}
        {filtered.map(t => (
          <article key={t.term} className="bg-white/70 backdrop-blur rounded-xl border border-slate-200 p-5 sm:p-6 hover:border-gold/40 transition">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="display text-xl text-brand">{t.term}</h3>
              <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${catColors[t.cat]}`}>{t.cat}</span>
            </div>
            <p className="text-slate-700 leading-relaxed">{t.plain}</p>
            <div className="mt-3 flex gap-2">
              <span className="text-xs font-bold text-gold-700 shrink-0">Example →</span>
              <p className="text-sm text-slate-600 italic">{t.example}</p>
            </div>
            <p className="mt-2 text-xs text-slate-400">📖 See: {t.where}</p>
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 text-center">
        <div className="bg-white/70 backdrop-blur rounded-xl border border-slate-200 p-8 sm:p-10">
          <h2 className="display text-2xl text-brand">Ready to practice these?</h2>
          <p className="mt-3 text-slate-600 max-w-lg mx-auto">
            Download our free practice datasets and try these terms in SPSS with real Kenyan data.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/datasets" className="btn-gold text-sm">Get practice datasets</a>
            <a href="/pathway" className="btn glass text-brand hover:bg-white/30 text-sm">See learning pathway</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
