/**
 * ================================================================
 *  CENTRAL PRICING CONFIGURATION
 *  All prices are in Kenyan Shillings (KES).
 *  To change any price, edit this file — only this file.
 * ================================================================
 *
 *  Locked in: 2026-07-03
 *  Currency: KES · Payments via M-Pesa Paybill 4096483 · Account 7028M
 */

/* ─────────── Per-lesson notes-pack prices ─────────── */
// Any lesson not listed here falls back to DEFAULT_LESSON_PRICE (below).
export const LESSON_PRICES = {
  /* SPSS Basics — foundational, cheap */
  'basics-1': 350,
  'basics-2': 350,
  'basics-3': 350,
  'basics-4': 350,
  'basics-5': 350,

  /* Descriptive Statistics — foundational */
  'desc-1': 350,   // Frequencies & percentages
  'desc-2': 350,   // Mean, median, mode
  'desc-3': 350,   // Standard deviation & variance
  'desc-4': 400,   // Producing graphs & charts (slightly higher)

  /* Correlation — 1750 default, 1350 for interpretation lesson */
  'cor-1': 1750,
  'cor-2': 1750,
  'cor-3': 1750,
  'cor-4': 1350,   // Interpreting correlation matrices

  /* Regression — 1750 default, 1350 for diagnostics */
  'reg-1': 1750,
  'reg-2': 1750,
  'reg-3': 1350,   // Assumptions & diagnostics
  'reg-4': 1750,

  /* Advanced Regression — all at 1750 */
  'advreg-1': 1750,
  'advreg-2': 1750,

  /* T-Tests */
  'ttest-1': 1750,
  'ttest-2': 1750,
  'ttest-3': 1750,

  /* ANOVA */
  'anova-1': 1750,
  'anova-2': 1750,
  'anova-3': 1750,
  'anova-4': 1750,

  /* Advanced ANOVA */
  'advanova-1': 1750,
  'advanova-2': 1750,
  'advanova-3': 1750,

  /* Non-parametric */
  'np-1': 1750,
  'np-2': 1750,
  'np-3': 1750,
  'np-4': 1750,

  /* Chi-square */
  'chi-1': 1750,

  /* Reliability Testing */
  'rel-1': 650,
  'rel-2': 650,
  'rel-3': 650,

  /* Writing Up — sold as a PACKAGE only. Both lessons unlock together.
     Individual lesson prices set to null so UI shows "package" state. */
  'write-1': null,
  'write-2': null,
};

// Fallback for any lesson not explicitly priced above.
export const DEFAULT_LESSON_PRICE = 1750;

/* ─────────── Package deals ─────────── */
// { packageId: { name, lessonIds: [], price, courseSlug (for UI hint) } }
export const LESSON_PACKAGES = {
  'writing-up': {
    id: 'writing-up',
    name: 'Writing Up (Chapter 4 + APA 7 reporting)',
    lessonIds: ['write-1', 'write-2'],
    price: 1250,
    courseSlug: 'writing',
    description: 'Both Writing Up lessons unlock together as a package. Better value than buying individually.',
  },
};

/* ─────────── Statistical Test Selector unlock price ─────────── */
// Each individual test recommendation costs this much
export const TEST_SELECTOR_UNLOCK_PRICE = 350;

/* ─────────── Service prices ─────────── */
export const SERVICE_PRICES = {
  questionnaireRefinement: 3500,
  consultation: 2000,
  analysisTablesOnly: 15000,
  analysisInterpretationOnly: 12000,   // Chapter 4 only
  analysisFull: 35000,                  // Chapter 4 + Chapter 5, fully written
  analysisFullLoyalty: 30000,           // For students who used our platform for their questionnaire/survey
};

/* ─────────── Service turnaround times (maximum promise, may deliver sooner) ───────────
   Single source of truth for delivery expectations shown on:
   - Catalog / pricing cards (before payment)
   - Order form (after payment)
   - Confirmation / detail views
   Always phrased as a MAXIMUM so we always look faster than promised. */
export const SERVICE_TIMELINES = {
  questionnaireRefinement: {
    short: '3 days max',
    long:  'We deliver your refined instrument and digital survey link within 3 days of payment verification.',
  },
  analysisTablesOnly: {
    short: '3 weeks max',
    long:  'Complete SPSS output tables aligned to your objectives, delivered within 3 weeks of payment verification.',
  },
  analysisInterpretationOnly: {
    short: '3 weeks max',
    long:  'Full Chapter 4 write-up of your existing tables, delivered within 3 weeks of payment verification.',
  },
  analysisFull: {
    short: '6 weeks max',
    long:  'Full Chapter 4 and Chapter 5 (tables + interpretation + discussion), delivered within 6 weeks of payment verification.',
  },
  consultation: {
    short: 'Same week',
    long:  'One-on-one Zoom or in-person session, scheduled within the same week.',
  },
};

/* ─────────── Data Cleaning conditional pricing ─────────── */
// If the student has PAID_FOR at least this many lessons, they qualify for the discount
export const DATA_CLEANING_DISCOUNT_THRESHOLD = 3;
export const DATA_CLEANING_PRICE_FULL = 500;
export const DATA_CLEANING_PRICE_DISCOUNTED = 250;

/* ─────────── Master Decision Tree free-unlock rule ─────────── */
// Master Tree is FREE (KES 0) once the student has paid for this many lessons
export const MASTER_TREE_FREE_AFTER_LESSONS = 2;

/* ═══════════════════════════════════════════════════════════════
 *  HELPER FUNCTIONS
 *  These functions compute the correct price for any lesson,
 *  considering packages, free-unlock rules and conditional discounts.
 * ═══════════════════════════════════════════════════════════════ */

/**
 * How many paid lessons the student currently owns.
 * Counts only 'unlocked' lesson unlocks with format='notes'.
 * Used to evaluate Master Tree free-unlock and Data Cleaning discount.
 */
export const countPaidLessons = (unlocksArray) => {
  if (!Array.isArray(unlocksArray)) return 0;
  return unlocksArray.filter((u) =>
    u.itemType === 'lesson'
    && u.format === 'notes'
    && u.status === 'unlocked'
    && u.paymentStatus === 'confirmed'
    // Exclude free-included lessons from the count (they weren't PAID for)
    && !u.freeIncluded
  ).length;
};

/**
 * Find the package (if any) that this lesson belongs to.
 * Returns the package object, or null.
 */
export const packageForLesson = (lessonId) => {
  for (const pkg of Object.values(LESSON_PACKAGES)) {
    if (pkg.lessonIds.includes(lessonId)) return pkg;
  }
  return null;
};

/**
 * The primary function used everywhere in the UI.
 * Given a lesson ID and the student's current unlocks list, returns:
 *   { priceKES, isFree, isPackage, packageInfo, discountApplied, reason }
 */
export const priceForLesson = (lessonId, currentUnlocks = []) => {
  // Case 1: Master Decision Tree — free after N paid lessons
  if (lessonId === 'master-1') {
    const paidCount = countPaidLessons(currentUnlocks);
    if (paidCount >= MASTER_TREE_FREE_AFTER_LESSONS) {
      return {
        priceKES: 0, isFree: true, isPackage: false, packageInfo: null, discountApplied: false,
        reason: `Free — you've paid for ${paidCount} lessons`,
      };
    }
    return {
      priceKES: null, isFree: false, isPackage: false, packageInfo: null, discountApplied: false,
      reason: `Unlock any 2 paid lessons to access this free`,
    };
  }

  // Case 2: Data Cleaning — conditional discount
  if (lessonId === 'clean-1') {
    const paidCount = countPaidLessons(currentUnlocks);
    if (paidCount >= DATA_CLEANING_DISCOUNT_THRESHOLD) {
      return {
        priceKES: DATA_CLEANING_PRICE_DISCOUNTED,
        isFree: false, isPackage: false, packageInfo: null, discountApplied: true,
        reason: `Loyalty discount applied — you've paid for ${paidCount} lessons`,
      };
    }
    return {
      priceKES: DATA_CLEANING_PRICE_FULL,
      isFree: false, isPackage: false, packageInfo: null, discountApplied: false,
      reason: `Unlock 3+ paid lessons to drop to KES ${DATA_CLEANING_PRICE_DISCOUNTED}`,
    };
  }

  // Case 3: Package lesson
  const pkg = packageForLesson(lessonId);
  if (pkg) {
    return {
      priceKES: pkg.price, isFree: false, isPackage: true, packageInfo: pkg,
      discountApplied: false,
      reason: `Package: unlocks all ${pkg.lessonIds.length} lessons in this course`,
    };
  }

  // Case 4: Standard lesson price
  const price = LESSON_PRICES[lessonId] ?? DEFAULT_LESSON_PRICE;
  return {
    priceKES: price, isFree: false, isPackage: false, packageInfo: null,
    discountApplied: false, reason: null,
  };
};

/**
 * Formatting helper for displaying prices in the UI.
 * Uses "KES 1,750" format (with thousands separator).
 */
export const formatKES = (amount) => {
  if (amount === null || amount === undefined) return 'Price on request';
  if (amount === 0) return 'FREE';
  return `KES ${amount.toLocaleString('en-KE')}`;
};

/* ═══════════════════════════════════════════════════════════════
 *  PRICING SHOWN ON THE PUBLIC PRICING PAGE
 *  Static structure used by src/pages/Pricing.jsx to render tables.
 * ═══════════════════════════════════════════════════════════════ */

export const PUBLIC_PRICING = {
  services: [
    {
      id: 'questionnaire',
      name: 'Questionnaire & Interview refinement',
      price: SERVICE_PRICES.questionnaireRefinement,
      unit: '(applies to questionnaire and interview instruments, provided there are no more than 4 respondent groups)',
      blurb: 'Submit your draft and receive a refined, methodologically sound version — plus a digital data-collection link.',
    },
    {
      id: 'thesis-review',
      name: 'Thesis review',
      price: 2000,
      unit: 'per review',
      blurb: 'Detailed structural + methodological review of your thesis with actionable feedback.',
    },
    {
      id: 'research-consultation',
      name: 'Research consultation',
      price: null,   // Price on request
      unit: 'per session',
      blurb: 'One-to-one session with a research specialist. Scope varies with your project — reach out for a quote.',
    },
    {
      id: 'analysis-tables',
      name: 'Analysis — Tables Only',
      price: SERVICE_PRICES.analysisTablesOnly,
      unit: 'per project',
      blurb: 'SPSS output tables (descriptives + inferential) — no narrative. Run by PhD researchers.',
    },
    {
      id: 'analysis-interpretation',
      name: 'Analysis — Interpretation Only (Chapter 4)',
      price: SERVICE_PRICES.analysisInterpretationOnly,
      unit: 'per project',
      blurb: 'Polished Chapter 4 write-up built from tables you already have.',
    },
    {
      id: 'analysis-full',
      name: 'Analysis — Full (Chapter 4 + 5)',
      price: SERVICE_PRICES.analysisFull,
      unit: 'per project',
      blurb: 'End-to-end: analysis + fully-written Chapter 4 (findings) AND Chapter 5 (discussion).',
      note: 'Loyalty rate KES 30,000 if you collected your data via our questionnaire-refinement or online-survey service.',
    },
  ],

  lessons: [
    { course: 'SPSS Basics',           priceLabel: 'KES 350 each',       lessons: 5 },
    { course: 'Master Decision Tree',  priceLabel: 'FREE with any 2 paid lessons', lessons: 1 },
    { course: 'Data Cleaning',         priceLabel: 'KES 500 (or KES 250 after 3+ paid lessons)', lessons: 1 },
    { course: 'Descriptive Statistics', priceLabel: 'KES 350 each (Graphs KES 400)', lessons: 4 },
    { course: 'Correlation Analysis',  priceLabel: 'KES 1,750 each (Matrices KES 1,350)', lessons: 4 },
    { course: 'Regression Analysis',   priceLabel: 'KES 1,750 each (Diagnostics KES 1,350)', lessons: 4 },
    { course: 'Advanced Regression',   priceLabel: 'KES 1,750 each', lessons: 2 },
    { course: 'T-Tests',               priceLabel: 'KES 1,750 each', lessons: 3 },
    { course: 'ANOVA',                 priceLabel: 'KES 1,750 each', lessons: 4 },
    { course: 'Advanced ANOVA',        priceLabel: 'KES 1,750 each', lessons: 3 },
    { course: 'Non-parametric tests',  priceLabel: 'KES 1,750 each', lessons: 4 },
    { course: 'Chi-square',            priceLabel: 'KES 1,750',      lessons: 1 },
    { course: 'Reliability Testing',   priceLabel: 'KES 650 each',   lessons: 3 },
    { course: 'Writing Up (PACKAGE)',  priceLabel: 'KES 1,250 for both lessons together', lessons: 2 },
  ],

  testSelector: {
    perTest: TEST_SELECTOR_UNLOCK_PRICE,
    blurb: 'Each recommended test unlocks individually via M-Pesa — pay only for the tests your project actually needs.',
  },
};
