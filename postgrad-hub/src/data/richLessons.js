// Registry of lessons that have full IBM-SkillsBuild-style rich content.
// Other lessons fall back to the simple Notes+Resources+Quiz layout.
import { PEARSON_LESSON }              from './lessonContent/pearson.js';
import { SPEARMAN_LESSON }             from './lessonContent/spearman.js';
import { PARTIAL_LESSON }              from './lessonContent/partial.js';
import { MATRICES_LESSON }             from './lessonContent/matrices.js';
import { SPSS_INTERFACE_LESSON }       from './lessonContent/spssInterface.js';
import { DATA_VIEW_LESSON }            from './lessonContent/dataView.js';
import { DEFINING_VARIABLES_LESSON }   from './lessonContent/definingVariables.js';
import { IMPORTING_DATA_LESSON }       from './lessonContent/importingData.js';
import { MISSING_VALUES_LESSON }       from './lessonContent/missingValues.js';
import { FREQUENCIES_LESSON }          from './lessonContent/frequencies.js';
import { CENTRAL_TENDENCY_LESSON }     from './lessonContent/centralTendency.js';
import { DISPERSION_LESSON }           from './lessonContent/dispersion.js';
import { GRAPHS_LESSON }               from './lessonContent/graphs.js';
import { CRONBACH_ALPHA_LESSON }       from './lessonContent/cronbachAlpha.js';
import { ITEM_TOTAL_LESSON }           from './lessonContent/itemTotal.js';
import { SPLIT_HALF_LESSON }           from './lessonContent/splitHalf.js';
import { SIMPLE_REGRESSION_LESSON }    from './lessonContent/simpleRegression.js';
import { MULTIPLE_REGRESSION_LESSON }  from './lessonContent/multipleRegression.js';
import { REGRESSION_DIAGNOSTICS_LESSON } from './lessonContent/regressionDiagnostics.js';
import { LOGISTIC_REGRESSION_LESSON }  from './lessonContent/logisticRegression.js';
import { ONE_WAY_ANOVA_LESSON }        from './lessonContent/oneWayAnova.js';
import { POST_HOC_LESSON }             from './lessonContent/postHoc.js';
import { TWO_WAY_ANOVA_LESSON }        from './lessonContent/twoWayAnova.js';
import { REPEATED_MEASURES_LESSON }    from './lessonContent/repeatedMeasures.js';
import { INDEPENDENT_TTEST_LESSON }    from './lessonContent/independentTTest.js';
import { PAIRED_TTEST_LESSON }         from './lessonContent/pairedTTest.js';
import { ONE_SAMPLE_TTEST_LESSON }     from './lessonContent/oneSampleTTest.js';
import { MASTER_DECISION_TREE_LESSON } from './lessonContent/masterDecisionTree.js';
import { MANN_WHITNEY_LESSON }         from './lessonContent/mannWhitney.js';
import { WILCOXON_SIGNED_RANK_LESSON } from './lessonContent/wilcoxonSignedRank.js';
import { KRUSKAL_WALLIS_LESSON }       from './lessonContent/kruskalWallis.js';
import { FRIEDMAN_LESSON }             from './lessonContent/friedman.js';
import { CHI_SQUARE_LESSON }           from './lessonContent/chiSquare.js';
import { DATA_CLEANING_BASICS_LESSON } from './lessonContent/dataCleaningBasics.js';
import { HIERARCHICAL_REGRESSION_LESSON }       from './lessonContent/hierarchicalRegression.js';
import { MULTINOMIAL_ORDINAL_LOGISTIC_LESSON }  from './lessonContent/multinomialOrdinalLogistic.js';
import { ANCOVA_LESSON }       from './lessonContent/ancova.js';
import { MANOVA_LESSON }       from './lessonContent/manova.js';
import { MIXED_ANOVA_LESSON }  from './lessonContent/mixedAnova.js';
import { WRITING_CHAPTER_4_LESSON } from './lessonContent/writingChapter4.js';
import { APA7_REPORTING_LESSON }    from './lessonContent/apa7Reporting.js';
import { FOUNDATIONAL_PRINCIPLES_LESSON } from './lessonContent/foundationalPrinciples.js';

export const RICH_LESSONS = {
  /* SPSS Basics */
  'found-1':  FOUNDATIONAL_PRINCIPLES_LESSON,
  /* SPSS Basics */
  'basics-1': SPSS_INTERFACE_LESSON,
  'basics-2': DATA_VIEW_LESSON,
  'basics-3': DEFINING_VARIABLES_LESSON,
  'basics-4': IMPORTING_DATA_LESSON,
  'basics-5': MISSING_VALUES_LESSON,
  /* Descriptive Statistics */
  'desc-1':   FREQUENCIES_LESSON,
  'desc-2':   CENTRAL_TENDENCY_LESSON,
  'desc-3':   DISPERSION_LESSON,
  'desc-4':   GRAPHS_LESSON,
  /* Correlation Analysis */
  'cor-1':    PEARSON_LESSON,
  'cor-2':    SPEARMAN_LESSON,
  'cor-3':    PARTIAL_LESSON,
  'cor-4':    MATRICES_LESSON,
  /* Regression Analysis */
  'reg-1':    SIMPLE_REGRESSION_LESSON,
  'reg-2':    MULTIPLE_REGRESSION_LESSON,
  'reg-3':    REGRESSION_DIAGNOSTICS_LESSON,
  'reg-4':    LOGISTIC_REGRESSION_LESSON,
  /* ANOVA */
  'anova-1':  ONE_WAY_ANOVA_LESSON,
  'anova-2':  POST_HOC_LESSON,
  'anova-3':  TWO_WAY_ANOVA_LESSON,
  'anova-4':  REPEATED_MEASURES_LESSON,
  /* T-Tests */
  'ttest-1':  INDEPENDENT_TTEST_LESSON,
  'ttest-2':  PAIRED_TTEST_LESSON,
  'ttest-3':  ONE_SAMPLE_TTEST_LESSON,
  /* Master Decision Tree (FREE with SPSS Basics) */
  'master-1': MASTER_DECISION_TREE_LESSON,
  /* Non-parametric tests */
  'np-1':     MANN_WHITNEY_LESSON,
  'np-2':     WILCOXON_SIGNED_RANK_LESSON,
  'np-3':     KRUSKAL_WALLIS_LESSON,
  'np-4':     FRIEDMAN_LESSON,
  /* Chi-square */
  'chi-1':    CHI_SQUARE_LESSON,
  /* Data Cleaning Basics (FREE with any paid lesson) */
  'clean-1':  DATA_CLEANING_BASICS_LESSON,
  /* Advanced Regression */
  'advreg-1': HIERARCHICAL_REGRESSION_LESSON,
  'advreg-2': MULTINOMIAL_ORDINAL_LOGISTIC_LESSON,
  /* Advanced ANOVA */
  'advanova-1': ANCOVA_LESSON,
  'advanova-2': MANOVA_LESSON,
  'advanova-3': MIXED_ANOVA_LESSON,
  /* Writing Up */
  'write-1':    WRITING_CHAPTER_4_LESSON,
  'write-2':    APA7_REPORTING_LESSON,
  /* Reliability Testing */
  'rel-1':    CRONBACH_ALPHA_LESSON,
  'rel-2':    ITEM_TOTAL_LESSON,
  'rel-3':    SPLIT_HALF_LESSON,
};

export const isRichLesson = (lessonId) => Boolean(RICH_LESSONS[lessonId]);
