/**
 * ═════════════════════════════════════════════════════════════════════
 *  CASE STUDIES LIBRARY
 *
 *  A shared collection of realistic Kenyan research scenarios used
 *  throughout the SPSS Academy lessons. Each lesson picks the case
 *  that best fits the statistical test being taught.
 *
 *  Design principles:
 *   • All scenarios are FICTIONAL but structurally realistic (real KE
 *     places, plausible variable names, defensible sample sizes)
 *   • Each case has a demographic profile students can describe with
 *     frequencies + a set of Likert / continuous variables that support
 *     one or more specific inferential tests
 *   • Numbers used in "sample output" tables in the lessons are HAND-
 *     CRAFTED to be self-consistent (not randomly generated) so they
 *     make sense when students see them across multiple lessons
 * ═════════════════════════════════════════════════════════════════════
 */

/* ─────────────────────────────────────────────────────────────
 *  CASE 1 · MACHAKOS DIGITAL LEARNING
 *  Used for: Descriptives · Correlation · Regression · Reliability
 * ───────────────────────────────────────────────────────────── */
export const MACHAKOS_DIGITAL = {
  id: 'machakos-digital',
  shortName: 'Machakos Digital Study',
  title: "Influence of Digital Learning Resources on Students' Mathematics Performance in Public Secondary Schools in Machakos County, Kenya",
  county: 'Machakos',
  objectives: [
    'To investigate the influence of availability of digital devices on students\' Mathematics performance',
    'To determine the influence of teacher digital competency on students\' Mathematics performance',
    'To determine the influence of internet connectivity reliability on students\' Mathematics performance',
    'To investigate the influence of school digital infrastructure investment on students\' Mathematics performance',
  ],
  sample: {
    schools: 8,
    total: 274,
    principals: 8,
    teachers: 54,
    students: 212,
    responseRate: 77.0,
    responseRateBreakdown: [
      { group: 'Principals', administered: 8,   returned: 8,   rate: 100.0 },
      { group: 'Teachers',   administered: 99,  returned: 54,  rate: 54.5 },
      { group: 'Students',   administered: 249, returned: 212, rate: 85.1 },
    ],
  },
  variables: [
    { name: 'RespID',              type: 'String',  measure: 'Nominal', desc: 'Unique respondent ID (P01–P08, T01–T54, S001–S212)' },
    { name: 'SchoolID',            type: 'String',  measure: 'Nominal', desc: 'School code (SCH01–SCH08)' },
    { name: 'SchoolName',          type: 'String',  measure: 'Nominal', desc: 'Name of the school' },
    { name: 'Category',            type: 'String',  measure: 'Nominal', desc: 'Principal / Teacher / Student' },
    { name: 'Gender',              type: 'String',  measure: 'Nominal', desc: 'Male / Female' },
    { name: 'Age',                 type: 'Numeric', measure: 'Ratio',   desc: 'Age in years (students only)' },
    { name: 'Form',                type: 'Numeric', measure: 'Ordinal', desc: 'Form 2, 3, or 4 (students only)' },
    { name: 'HighestQual',         type: 'String',  measure: 'Ordinal', desc: 'Diploma / B.Ed / PGDE / M.Ed (staff only)' },
    { name: 'YearsAsPrincipal',    type: 'Numeric', measure: 'Ratio',   desc: 'Years in headship (principals only)' },
    { name: 'TeachingExperience',  type: 'Numeric', measure: 'Ratio',   desc: 'Years of teaching (teachers only)' },
    { name: 'SubjectTaught',       type: 'String',  measure: 'Nominal', desc: 'Main subject (teachers only)' },
    { name: 'Math_KCSE_Mean',      type: 'Numeric', measure: 'Scale',   desc: "School Math KCSE mean grade points (1–12 scale) — DEPENDENT variable" },
    { name: 'InvestmentPerStudent', type: 'Numeric', measure: 'Scale',  desc: 'KES invested in digital infrastructure per student per term' },
    { name: 'Dev_1', type: 'Numeric', measure: 'Ordinal', desc: 'Devices: Each student has access to a laptop/tablet (1=SD to 5=SA)' },
    { name: 'Dev_2', type: 'Numeric', measure: 'Ordinal', desc: 'Devices: The school has a functional computer lab (1=SD to 5=SA)' },
    { name: 'Dev_3', type: 'Numeric', measure: 'Ordinal', desc: 'Devices: Digital devices are available for all Maths lessons (1=SD to 5=SA)' },
    { name: 'Dev_4', type: 'Numeric', measure: 'Ordinal', desc: 'Devices: The school has a projector in every classroom (1=SD to 5=SA)' },
    { name: 'Dev_5', type: 'Numeric', measure: 'Ordinal', desc: 'Devices: Devices are well maintained and rarely faulty (1=SD to 5=SA)' },
    { name: 'Comp_1', type: 'Numeric', measure: 'Ordinal', desc: 'Competency: Teachers are trained to use digital tools (1=SD to 5=SA)' },
    { name: 'Comp_2', type: 'Numeric', measure: 'Ordinal', desc: 'Competency: Teachers use digital resources in Maths lessons (1=SD to 5=SA)' },
    { name: 'Comp_3', type: 'Numeric', measure: 'Ordinal', desc: 'Competency: Teachers integrate technology in their teaching methods (1=SD to 5=SA)' },
    { name: 'Comp_4', type: 'Numeric', measure: 'Ordinal', desc: 'Competency: Teachers receive regular ICT professional development (1=SD to 5=SA)' },
    { name: 'Comp_5', type: 'Numeric', measure: 'Ordinal', desc: 'Competency: Teachers are confident using digital learning platforms (1=SD to 5=SA)' },
    { name: 'Net_1', type: 'Numeric', measure: 'Ordinal', desc: 'Internet: The school has reliable internet connectivity (1=SD to 5=SA)' },
    { name: 'Net_2', type: 'Numeric', measure: 'Ordinal', desc: 'Internet: Internet speed supports online learning smoothly (1=SD to 5=SA)' },
    { name: 'Net_3', type: 'Numeric', measure: 'Ordinal', desc: 'Internet: Internet access is available across all classrooms (1=SD to 5=SA)' },
    { name: 'Net_4', type: 'Numeric', measure: 'Ordinal', desc: 'Internet: Internet outages are rare during lessons (1=SD to 5=SA)' },
    { name: 'Net_5', type: 'Numeric', measure: 'Ordinal', desc: 'Internet: Students can access online resources without difficulty (1=SD to 5=SA)' },
    { name: 'Digital_Devices',      type: 'Numeric', measure: 'Scale', desc: 'Composite (mean of Dev_1 to Dev_5) — INDEPENDENT variable 1' },
    { name: 'Teacher_Competency',   type: 'Numeric', measure: 'Scale', desc: 'Composite (mean of Comp_1 to Comp_5) — INDEPENDENT variable 2' },
    { name: 'Internet_Connectivity', type: 'Numeric', measure: 'Scale', desc: 'Composite (mean of Net_1 to Net_5) — INDEPENDENT variable 3' },
  ],
  // First 10 rows of the dataset — used at the top of every lesson so students
  // are never staring at unfamiliar numbers. Hand-crafted to be plausible.
  firstRows: [
    { RespID: 'P01', SchoolID: 'SCH01', Category: 'Principal', Gender: 'Male',   Age: null, Form: null, HighestQual: 'M.Ed',    Math_KCSE: 6.4 },
    { RespID: 'P02', SchoolID: 'SCH02', Category: 'Principal', Gender: 'Female', Age: null, Form: null, HighestQual: 'B.Ed',    Math_KCSE: 5.1 },
    { RespID: 'T01', SchoolID: 'SCH01', Category: 'Teacher',   Gender: 'Male',   Age: 42,   Form: null, HighestQual: 'M.Ed',    Math_KCSE: 6.4 },
    { RespID: 'T02', SchoolID: 'SCH01', Category: 'Teacher',   Gender: 'Female', Age: 31,   Form: null, HighestQual: 'B.Ed',    Math_KCSE: 6.4 },
    { RespID: 'T03', SchoolID: 'SCH02', Category: 'Teacher',   Gender: 'Male',   Age: 38,   Form: null, HighestQual: 'Diploma', Math_KCSE: 5.1 },
    { RespID: 'S001', SchoolID: 'SCH01', Category: 'Student',  Gender: 'Female', Age: 17,   Form: 3,    HighestQual: null,      Math_KCSE: 6.4 },
    { RespID: 'S002', SchoolID: 'SCH01', Category: 'Student',  Gender: 'Male',   Age: 18,   Form: 4,    HighestQual: null,      Math_KCSE: 6.4 },
    { RespID: 'S003', SchoolID: 'SCH02', Category: 'Student',  Gender: 'Female', Age: 16,   Form: 2,    HighestQual: null,      Math_KCSE: 5.1 },
    { RespID: 'S004', SchoolID: 'SCH03', Category: 'Student',  Gender: 'Male',   Age: 17,   Form: 3,    HighestQual: null,      Math_KCSE: 7.2 },
    { RespID: 'S005', SchoolID: 'SCH04', Category: 'Student',  Gender: 'Male',   Age: 16,   Form: 2,    HighestQual: null,      Math_KCSE: 5.8 },
  ],
  // Pre-computed frequency counts (used consistently across lessons).
  frequencies: {
    gender:   { Male: 128, Female: 146, total: 274 },
    category: { Principal: 8, Teacher: 54, Student: 212, total: 274 },
    form:     { 'Form 2': 71, 'Form 3': 74, 'Form 4': 67, missing: 62, total: 274 }, // Students only
    highestQual: { Diploma: 12, 'B.Ed': 34, PGDE: 8, 'M.Ed': 8, missing: 212, total: 274 }, // Staff only
  },
  // Pre-computed descriptive stats for composite + continuous variables.
  descriptives: {
    Digital_Devices:      { n: 274, mean: 3.51, sd: 0.82, min: 1.0, max: 5.0, skew: -0.21, kurt: -0.15 },
    Teacher_Competency:   { n: 274, mean: 3.72, sd: 0.78, min: 1.0, max: 5.0, skew: -0.35, kurt: 0.08 },
    Internet_Connectivity:{ n: 274, mean: 3.38, sd: 0.79, min: 1.0, max: 5.0, skew: -0.18, kurt: -0.22 },
    InvestmentPerStudent: { n: 274, mean: 4820, sd: 1150, min: 2200, max: 7800, skew: 0.12, kurt: -0.65 },
    Math_KCSE_Mean:       { n: 274, mean: 5.92, sd: 0.82, min: 4.8, max: 7.1, skew: -0.10, kurt: -1.25 },
  },
};

/* ─────────────────────────────────────────────────────────────
 *  CASE 2 · KIAMBU MAIZE YIELD  (used for T-tests, ANOVA)
 *  Two-group comparison → Independent-samples t-test
 *  Three-group comparison → One-way ANOVA
 * ───────────────────────────────────────────────────────────── */
export const KIAMBU_MAIZE = {
  id: 'kiambu-maize',
  shortName: 'Kiambu Maize Study',
  title: 'Effect of Fertilizer Type on Maize Yield among Smallholder Farmers in Kiambu County, Kenya',
  county: 'Kiambu',
  objectives: [
    'To compare maize yield between farmers using DAP fertilizer vs organic manure',
    'To compare maize yield across three fertilizer types (DAP, CAN, organic manure)',
    'To determine whether farm size influences the relationship between fertilizer type and yield',
  ],
  sample: { farms: 180, groups: 3 },
  variables: [
    { name: 'FarmID',        type: 'String',  measure: 'Nominal', desc: 'Farm identifier (F001–F180)' },
    { name: 'Ward',          type: 'String',  measure: 'Nominal', desc: 'Ward in Kiambu (Githunguri, Lari, Limuru, etc.)' },
    { name: 'FertilizerType', type: 'String', measure: 'Nominal', desc: '1=DAP, 2=CAN, 3=Organic manure' },
    { name: 'FarmSizeAcres', type: 'Numeric', measure: 'Ratio',   desc: 'Farm size in acres' },
    { name: 'RainfallMm',    type: 'Numeric', measure: 'Ratio',   desc: 'Season rainfall (mm)' },
    { name: 'Yield_KgPerAcre', type: 'Numeric', measure: 'Ratio', desc: 'Maize yield (kg per acre) — DEPENDENT variable' },
  ],
  descriptives: {
    yield_by_fertilizer: {
      DAP:     { n: 60, mean: 1840, sd: 320 },
      CAN:     { n: 60, mean: 1620, sd: 290 },
      Organic: { n: 60, mean: 1450, sd: 380 },
    },
  },
};

/* ─────────────────────────────────────────────────────────────
 *  CASE 3 · NYANDARUA VACCINE HESITANCY  (used for Chi-square)
 *  Two categorical variables → test of independence
 * ───────────────────────────────────────────────────────────── */
export const NYANDARUA_VACCINE = {
  id: 'nyandarua-vaccine',
  shortName: 'Nyandarua Vaccine Study',
  title: 'Association between Education Level and COVID-19 Vaccine Acceptance among Adults in Nyandarua County, Kenya',
  county: 'Nyandarua',
  objectives: [
    'To determine whether there is a significant association between education level and vaccine acceptance',
    'To describe vaccine acceptance patterns across gender and age groups',
  ],
  sample: { adults: 320 },
  variables: [
    { name: 'AdultID',        type: 'String',  measure: 'Nominal', desc: 'Respondent ID' },
    { name: 'Gender',         type: 'String',  measure: 'Nominal', desc: 'Male / Female' },
    { name: 'AgeGroup',       type: 'String',  measure: 'Ordinal', desc: '18-29 / 30-44 / 45-59 / 60+' },
    { name: 'EducationLevel', type: 'String',  measure: 'Ordinal', desc: 'None / Primary / Secondary / Tertiary' },
    { name: 'VaccineAccept',  type: 'String',  measure: 'Nominal', desc: 'Accepted / Refused — DEPENDENT variable' },
  ],
  crosstab: {
    // rows = EducationLevel, cols = VaccineAccept
    None:      { Accepted:  38, Refused: 42, total:  80 },
    Primary:   { Accepted:  55, Refused: 45, total: 100 },
    Secondary: { Accepted:  68, Refused: 22, total:  90 },
    Tertiary:  { Accepted:  42, Refused:  8, total:  50 },
    columnTotals: { Accepted: 203, Refused: 117, total: 320 },
  },
};

/* ─────────────────────────────────────────────────────────────
 *  CASE 4 · NAKURU WELLNESS INTERVENTION  (used for paired T-test + Repeated Measures ANOVA)
 *  Same participants measured over time (before/after; or 3+ time points)
 * ───────────────────────────────────────────────────────────── */
export const NAKURU_WELLNESS = {
  id: 'nakuru-wellness',
  shortName: 'Nakuru Wellness Study',
  title: 'Effect of a 12-week Workplace Wellness Programme on Systolic Blood Pressure among County Government Staff in Nakuru County, Kenya',
  county: 'Nakuru',
  objectives: [
    'To determine whether systolic BP differs significantly before and after a 12-week wellness programme',
    'To determine whether systolic BP changes across three time points (Baseline, Week 6, Week 12)',
  ],
  sample: { staff: 45 },
  variables: [
    { name: 'StaffID',    type: 'String',  measure: 'Nominal', desc: 'Staff ID' },
    { name: 'Gender',     type: 'String',  measure: 'Nominal', desc: 'Male / Female' },
    { name: 'Age',        type: 'Numeric', measure: 'Ratio',   desc: 'Age in years' },
    { name: 'SBP_T0',     type: 'Numeric', measure: 'Ratio',   desc: 'Systolic BP at baseline (mmHg)' },
    { name: 'SBP_T1',     type: 'Numeric', measure: 'Ratio',   desc: 'Systolic BP at week 6 (mmHg)' },
    { name: 'SBP_T2',     type: 'Numeric', measure: 'Ratio',   desc: 'Systolic BP at week 12 (mmHg)' },
  ],
  descriptives: {
    SBP_T0: { n: 45, mean: 142.4, sd: 12.1 },
    SBP_T1: { n: 45, mean: 138.9, sd: 11.7 },
    SBP_T2: { n: 45, mean: 134.2, sd: 11.3 },
  },
};

/* ─────────────────────────────────────────────────────────────
 *  CASE 5 · MOMBASA PATIENT SATISFACTION  (used for reliability, non-parametric)
 *  Multi-item Likert scale → Cronbach's Alpha
 *  Comparing 2 hospital types on non-normal satisfaction → Mann-Whitney U
 * ───────────────────────────────────────────────────────────── */
export const MOMBASA_SATISFACTION = {
  id: 'mombasa-satisfaction',
  shortName: 'Mombasa Patient Study',
  title: 'Patient Satisfaction with Outpatient Services in Public and Private Hospitals in Mombasa County, Kenya',
  county: 'Mombasa',
  objectives: [
    'To assess the internal reliability of a 15-item Patient Satisfaction Scale',
    'To compare patient satisfaction scores between public and private outpatient hospitals',
  ],
  sample: { patients: 240 },
  variables: [
    { name: 'PatientID',    type: 'String',  measure: 'Nominal', desc: 'Patient ID' },
    { name: 'HospitalType', type: 'String',  measure: 'Nominal', desc: '1=Public, 2=Private' },
    { name: 'PSS_1',        type: 'Numeric', measure: 'Ordinal', desc: 'Waiting time was reasonable (1–5 Likert)' },
    { name: 'PSS_2',        type: 'Numeric', measure: 'Ordinal', desc: 'Staff were friendly (1–5 Likert)' },
    // ... items 3-15 follow the same pattern
    { name: 'PSS_Total',    type: 'Numeric', measure: 'Scale',   desc: 'Composite mean of 15 satisfaction items' },
  ],
  descriptives: {
    cronbachAlpha: 0.84,
    itemCount: 15,
    validCases: 240,
    PSS_Total_by_type: {
      Public:  { n: 130, mean: 3.24, sd: 0.71 },
      Private: { n: 110, mean: 3.89, sd: 0.62 },
    },
  },
};

/* ─────────────────────────────────────────────────────────────
 *  LOOKUP HELPERS
 * ───────────────────────────────────────────────────────────── */
export const ALL_CASE_STUDIES = [
  MACHAKOS_DIGITAL, KIAMBU_MAIZE, NYANDARUA_VACCINE, NAKURU_WELLNESS, MOMBASA_SATISFACTION,
];

export const getCaseStudyById = (id) =>
  ALL_CASE_STUDIES.find((c) => c.id === id);
