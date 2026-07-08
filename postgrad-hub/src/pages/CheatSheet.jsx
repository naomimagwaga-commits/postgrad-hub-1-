import PublicNav from '../components/PublicNav.jsx';
import Footer from '../components/Footer.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';

export default function CheatSheet() {
  usePageTitle('Quick Reference Cheat Sheet');

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-parchment print:bg-white">
      <div className="print:hidden">
        <PublicNav />
      </div>

      {/* Print button - hidden when printing */}
      <div className="print:hidden max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="eyebrow">— Free reference</span>
            <h1 className="display text-3xl lg:text-4xl text-brand mt-2">
              SPSS Quick-Reference <span className="italic font-light">Cheat Sheet</span>
            </h1>
          </div>
          <button onClick={handlePrint} className="btn-gold text-sm cursor-pointer">
            🖨️ Print / Save as PDF
          </button>
        </div>
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
          💡 Click the button above, then choose <strong>"Save as PDF"</strong> in your browser's print dialog to save an offline copy.
        </div>
      </div>

      {/* PRINTABLE CHEAT SHEET */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:py-0 print:max-w-none print:px-6">

        {/* Title block */}
        <div className="text-center mb-6 pb-4 border-b-2 border-brand print:mb-4 print:pb-3">
          <h2 className="display text-2xl sm:text-3xl text-brand">Which SPSS Test Should I Run?</h2>
          <p className="text-sm text-slate-500 mt-1">The Postgraduate Data Hub, Kenya — postgraduatedatahub@gmail.com</p>
        </div>

        {/* DECISION FLOWCHART */}
        <div className="mb-6 print:mb-4">
          <h3 className="display text-lg text-brand mb-3 border-b border-slate-200 pb-1">🗺️ Decision Flowchart</h3>
          <div className="bg-white border border-slate-300 rounded-lg p-4 print:p-3 text-sm space-y-3">
            <p><strong>Step 1:</strong> How many <em>dependent variables</em> (outcomes) do you have?</p>
            <div className="ml-4 pl-4 border-l-2 border-gold/40 space-y-2">
              <div>
                <p><strong>→ ONE outcome</strong> (e.g., yield, test score, blood pressure)</p>
                <div className="ml-4 pl-4 border-l-2 border-emerald-300 space-y-1.5 mt-1">
                  <p><strong>Step 2:</strong> How many <em>groups / predictors</em>?</p>
                  <p className="ml-4">• <strong>No groups — just relationships?</strong> → <span className="text-gold-700 font-bold">Pearson r</span> (continuous) or <span className="text-gold-700 font-bold">Spearman ρ</span> (ordinal / non-normal)</p>
                  <p className="ml-4">• <strong>2 groups?</strong> → <span className="text-gold-700 font-bold">Independent t-test</span> (different people) or <span className="text-gold-700 font-bold">Paired t-test</span> (same people, 2 time points)</p>
                  <p className="ml-4">• <strong>3+ groups?</strong> → <span className="text-gold-700 font-bold">One-way ANOVA</span> + post-hoc</p>
                  <p className="ml-4">• <strong>3+ time points (same people)?</strong> → <span className="text-gold-700 font-bold">Repeated Measures ANOVA</span></p>
                  <p className="ml-4">• <strong>Groups + time points mixed?</strong> → <span className="text-gold-700 font-bold">Mixed ANOVA</span></p>
                  <p className="ml-4">• <strong>Need to control a variable?</strong> → <span className="text-gold-700 font-bold">ANCOVA</span></p>
                  <p className="ml-4">• <strong>Predicting a continuous outcome from numbers?</strong> → <span className="text-gold-700 font-bold">Regression</span> (simple = 1 predictor; multiple = 2+)</p>
                </div>
              </div>
              <div>
                <p><strong>→ TWO OR MORE outcomes</strong> (e.g., yield AND grain quality)</p>
                <div className="ml-4 pl-4 border-l-2 border-rose-300 mt-1">
                  <p>→ <span className="text-gold-700 font-bold">MANOVA</span> (compares groups on multiple DVs at once)</p>
                </div>
              </div>
              <div>
                <p><strong>→ YES / NO outcome</strong> (binary)</p>
                <div className="ml-4 pl-4 border-l-2 border-violet-300 mt-1">
                  <p>→ <span className="text-gold-700 font-bold">Logistic Regression</span> (predicts probability of yes/no)</p>
                </div>
              </div>
              <div>
                <p><strong>→ Both variables are categories?</strong> (e.g., Education × Acceptance)</p>
                <div className="ml-4 pl-4 border-l-2 border-amber-300 mt-1">
                  <p>→ <span className="text-gold-700 font-bold">Chi-Square</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* APA REPORTING TEMPLATES */}
        <div className="mb-6 print:mb-4 print:break-before-page">
          <h3 className="display text-lg text-brand mb-3 border-b border-slate-200 pb-1">📝 APA 7 Reporting Templates</h3>
          <div className="grid md:grid-cols-2 gap-3 text-xs">
            {[
              { test: 'Independent t-test', fmt: 't(df) = [value], p = [.xxx], d = [.xx]', example: 't(58) = 2.41, p = .019, d = 0.62' },
              { test: 'Paired t-test', fmt: 't(df) = [value], p = [.xxx], d = [.xx]', example: 't(44) = 3.12, p = .003, d = 0.47' },
              { test: 'One-way ANOVA', fmt: 'F(dfB, dfW) = [value], p = [.xxx], η² = [.xx]', example: 'F(2, 177) = 22.40, p < .001, η² = .20' },
              { test: 'Repeated Measures ANOVA', fmt: 'F(df, dfE) = [value], p = [.xxx], ηp² = [.xx]', example: 'F(2, 88) = 14.52, p < .001, ηp² = .25' },
              { test: 'Pearson correlation', fmt: 'r(df) = [value], p = [.xxx]', example: 'r(272) = .54, p < .001' },
              { test: 'Chi-Square', fmt: 'χ²(df, N = [n]) = [value], p = [.xxx], φ = [.xx]', example: 'χ²(4, N = 320) = 28.41, p < .001, φ = .30' },
              { test: 'Simple regression', fmt: 'R² = [.xx], F(df1, df2) = [value], p = [.xxx]', example: 'R² = .32, F(1, 272) = 42.18, p < .001' },
              { test: 'Multiple regression', fmt: 'R² = [.xx], F(df1, df2) = [value], p = [.xxx]', example: 'R² = .45, F(3, 270) = 28.64, p < .001' },
              { test: 'Logistic regression', fmt: 'χ²(df) = [value], p = [.xxx], Nagelkerke R² = [.xx]', example: 'χ²(3) = 41.82, p < .001, Nagelkerke R² = .18' },
              { test: 'Cronbach\'s alpha', fmt: 'α = [.xxx] ([xx] items)', example: 'α = .842 (15 items)' },
              { test: 'ANCOVA', fmt: 'F(df, dfE) = [value], p = [.xxx], ηp² = [.xx]', example: 'F(2, 176) = 8.94, p < .001, ηp² = .09' },
              { test: 'MANOVA', fmt: 'Wilks\' Λ = [.xxx], F(df) = [value], p = [.xxx]', example: 'Wilks\' Λ = .72, F(4, 352) = 14.82, p < .001' },
            ].map((row) => (
              <div key={row.test} className="bg-white border border-slate-200 rounded p-2.5 print:p-2">
                <p className="font-bold text-brand text-xs">{row.test}</p>
                <p className="font-mono text-[10px] text-slate-600 mt-0.5">{row.fmt}</p>
                <p className="text-[10px] text-gold-700 mt-0.5 italic">e.g. {row.example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EFFECT SIZE GUIDE */}
        <div className="mb-6 print:mb-4">
          <h3 className="display text-lg text-brand mb-3 border-b border-slate-200 pb-1">📏 Effect Size Benchmarks</h3>
          <div className="grid md:grid-cols-3 gap-3 text-xs">
            <div className="bg-white border border-slate-200 rounded p-3 print:p-2">
              <p className="font-bold text-brand mb-1.5">Cohen's d (t-tests)</p>
              <table className="w-full text-[11px]">
                <tbody>
                  <tr className="border-b border-slate-100"><td className="py-0.5">Small</td><td className="text-right font-mono">0.20</td></tr>
                  <tr className="border-b border-slate-100"><td className="py-0.5">Medium</td><td className="text-right font-mono">0.50</td></tr>
                  <tr><td className="py-0.5">Large</td><td className="text-right font-mono">0.80</td></tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white border border-slate-200 rounded p-3 print:p-2">
              <p className="font-bold text-brand mb-1.5">Eta-squared / ηp² (ANOVA)</p>
              <table className="w-full text-[11px]">
                <tbody>
                  <tr className="border-b border-slate-100"><td className="py-0.5">Small</td><td className="text-right font-mono">.01</td></tr>
                  <tr className="border-b border-slate-100"><td className="py-0.5">Medium</td><td className="text-right font-mono">.06</td></tr>
                  <tr><td className="py-0.5">Large</td><td className="text-right font-mono">.14</td></tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white border border-slate-200 rounded p-3 print:p-2">
              <p className="font-bold text-brand mb-1.5">Pearson r (correlation)</p>
              <table className="w-full text-[11px]">
                <tbody>
                  <tr className="border-b border-slate-100"><td className="py-0.5">Small</td><td className="text-right font-mono">.10</td></tr>
                  <tr className="border-b border-slate-100"><td className="py-0.5">Medium</td><td className="text-right font-mono">.30</td></tr>
                  <tr><td className="py-0.5">Large</td><td className="text-right font-mono">.50</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ASSUMPTIONS QUICK CHECK */}
        <div className="mb-6 print:mb-4">
          <h3 className="display text-lg text-brand mb-3 border-b border-slate-200 pb-1">✅ Assumptions Checklist</h3>
          <div className="grid md:grid-cols-2 gap-3 text-xs">
            <div className="bg-white border border-slate-200 rounded p-3 print:p-2">
              <p className="font-bold text-brand mb-1.5">Parametric tests (t, ANOVA, Pearson, regression)</p>
              <ul className="space-y-1 text-[11px] text-slate-700">
                <li>□ Continuous dependent variable</li>
                <li>□ Normal distribution (Shapiro-Wilk p {'> .05'} or histogram)</li>
                <li>□ Homogeneity of variance (Levene's p {'> .05'})</li>
                <li>□ Independent observations</li>
                <li>□ No extreme outliers</li>
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded p-3 print:p-2">
              <p className="font-bold text-brand mb-1.5">If assumptions fail → use non-parametric</p>
              <ul className="space-y-1 text-[11px] text-slate-700">
                <li>• t-test → <strong>Mann-Whitney U</strong> (independent) or <strong>Wilcoxon</strong> (paired)</li>
                <li>• ANOVA → <strong>Kruskal-Wallis</strong> (independent) or <strong>Friedman</strong> (repeated)</li>
                <li>• Pearson → <strong>Spearman ρ</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* RELIABILITY BENCHMARKS */}
        <div className="mb-6 print:mb-4">
          <h3 className="display text-lg text-brand mb-3 border-b border-slate-200 pb-1">📊 Cronbach's Alpha Interpretation</h3>
          <div className="bg-white border border-slate-200 rounded p-3 print:p-2 text-xs">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="py-1 font-bold">Alpha value</th>
                  <th className="py-1 font-bold">Interpretation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-0.5">α {'>='} .90</td><td>Excellent (but check for redundancy)</td></tr>
                <tr className="border-b border-slate-100"><td className="py-0.5">.80 {'<='} α {'<'} .90</td><td>Good ✓</td></tr>
                <tr className="border-b border-slate-100"><td className="py-0.5">.70 {'<='} α {'<'} .80</td><td>Acceptable</td></tr>
                <tr className="border-b border-slate-100"><td className="py-0.5">.60 {'<='} α {'<'} .70</td><td>Questionable</td></tr>
                <tr><td className="py-0.5">α {'<'} .60</td><td>Poor — revise or remove items</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SIGNIFICANCE RULE */}
        <div className="bg-brand text-white rounded-lg p-4 print:p-3 text-center text-sm print:text-xs">
          <p className="font-bold text-lg print:text-base">🎯 The Golden Rule</p>
          <p className="mt-1">If <strong>p {'<'} .05</strong> → result is <strong>statistically significant</strong> (reject the null hypothesis).</p>
          <p>Always report: <strong>test statistic</strong>, <strong>degrees of freedom</strong>, <strong>p-value</strong>, and <strong>effect size</strong>.</p>
        </div>

        {/* Footer of print */}
        <div className="mt-4 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-500 print:mt-3">
          © The Postgraduate Data Hub, Kenya · postgraduatedatahub@gmail.com · postgrad-hub-1.vercel.app
        </div>
      </div>

      {/* Hidden for print */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
