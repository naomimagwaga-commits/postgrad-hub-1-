/**
 * Custom inline SVG illustrations for lesson content.
 * No external assets — all drawn with paths so they can never be downloaded as
 * standalone images via right-click without effort.
 */

export function Scatter4() {
  // Four mini scatter plots in a 2x2 grid
  const Plot = ({ x, y, label, points, line }) => (
    <g transform={`translate(${x},${y})`}>
      <rect width="180" height="140" rx="8" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>
      {/* axes */}
      <line x1="20" y1="120" x2="170" y2="120" stroke="#0A2E5D" strokeOpacity=".4" strokeWidth="1"/>
      <line x1="20" y1="20" x2="20" y2="120" stroke="#0A2E5D" strokeOpacity=".4" strokeWidth="1"/>
      {/* trend line */}
      {line && <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
        stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 3" opacity=".8"/>}
      {/* points */}
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#0A2E5D" opacity=".75"/>
      ))}
      <text x="90" y="138" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{label}</text>
    </g>
  );

  // Generate point sets (semi-random but deterministic)
  const seed = (n) => {
    const rnd = (s) => ((s * 9301 + 49297) % 233280) / 233280;
    return Array.from({ length: 22 }, (_, i) => rnd(n + i * 7));
  };

  // Strong positive: y closely follows x
  const sp = seed(1).map((r, i) => {
    const x = 30 + (i / 22) * 130;
    const y = 110 - (i / 22) * 80 + (r - 0.5) * 15;
    return [x, y];
  });
  // Strong negative
  const sn = seed(2).map((r, i) => {
    const x = 30 + (i / 22) * 130;
    const y = 30 + (i / 22) * 80 + (r - 0.5) * 15;
    return [x, y];
  });
  // Weak positive
  const wp = seed(3).map((r, i) => {
    const x = 30 + (i / 22) * 130;
    const y = 100 - (i / 22) * 30 + (r - 0.5) * 50;
    return [x, y];
  });
  // No relationship
  const no = seed(4).map((r, i) => {
    const x = 30 + (i / 22) * 130;
    const y = 30 + r * 80;
    return [x, y];
  });

  return (
    <svg viewBox="0 0 380 300" className="w-full h-auto">
      <Plot x={5}   y={5}   label="Strong positive  r ≈ +.85" points={sp} line={{x1:25,y1:108,x2:165,y2:32}}/>
      <Plot x={195} y={5}   label="Strong negative  r ≈ −.85" points={sn} line={{x1:25,y1:32,x2:165,y2:108}}/>
      <Plot x={5}   y={155} label="Weak positive  r ≈ +.25"   points={wp} line={{x1:25,y1:95,x2:165,y2:70}}/>
      <Plot x={195} y={155} label="No relationship  r ≈ 0"    points={no}/>
    </svg>
  );
}

export function BivariateDialog() {
  // Mock SPSS "Bivariate Correlations" dialog with red arrows
  return (
    <svg viewBox="0 0 480 320" className="w-full h-auto">
      {/* window chrome */}
      <rect width="480" height="320" rx="8" fill="#F4F4F5" stroke="#0A2E5D" strokeWidth="1"/>
      <rect width="480" height="28" rx="8" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Bivariate Correlations</text>
      <circle cx="464" cy="14" r="5" fill="#fff" opacity=".3"/>

      {/* left list */}
      <rect x="14" y="44" width="160" height="200" fill="#fff" stroke="#94A3B8" strokeWidth="1"/>
      <text x="14" y="38" fontSize="9" fill="#0A2E5D" fontWeight="700">Variables in dataset:</text>
      {['study_hours','math_score','motivation','attendance','english_score','gender'].map((v, i) => (
        <text key={v} x="22" y={62 + i * 18} fontSize="10" fill="#0A2E5D">📊 {v}</text>
      ))}

      {/* arrow button between lists */}
      <rect x="186" y="120" width="32" height="22" rx="3" fill="#fff" stroke="#94A3B8"/>
      <text x="202" y="135" fontSize="14" fill="#0A2E5D" textAnchor="middle">▶</text>

      {/* right Variables box */}
      <text x="232" y="38" fontSize="9" fill="#0A2E5D" fontWeight="700">Variables:</text>
      <rect x="232" y="44" width="160" height="100" fill="#fff" stroke="#94A3B8" strokeWidth="1"/>
      <text x="240" y="62" fontSize="10" fill="#0A2E5D" fontWeight="600">📊 study_hours</text>
      <text x="240" y="80" fontSize="10" fill="#0A2E5D" fontWeight="600">📊 math_score</text>
      <text x="240" y="98" fontSize="10" fill="#0A2E5D" fontWeight="600">📊 motivation</text>

      {/* Correlation coefficients group */}
      <text x="232" y="162" fontSize="9" fill="#0A2E5D" fontWeight="700">Correlation Coefficients:</text>
      <rect x="232" y="168" width="160" height="60" fill="#fff" stroke="#94A3B8" strokeWidth="1"/>
      <circle cx="244" cy="184" r="5" fill="#0A2E5D"/>
      <circle cx="244" cy="184" r="2.5" fill="#fff"/>
      <text x="254" y="188" fontSize="10" fill="#0A2E5D" fontWeight="700">Pearson</text>
      <circle cx="244" cy="204" r="5" fill="none" stroke="#94A3B8"/>
      <text x="254" y="208" fontSize="10" fill="#0A2E5D">Kendall's tau-b</text>
      <circle cx="244" cy="220" r="5" fill="none" stroke="#94A3B8"/>
      <text x="254" y="224" fontSize="10" fill="#0A2E5D">Spearman</text>

      {/* Options button */}
      <rect x="406" y="44" width="60" height="22" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="436" y="58" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Options…</text>

      {/* OK / Cancel */}
      <rect x="380" y="280" width="50" height="22" rx="3" fill="#0A2E5D"/>
      <text x="405" y="294" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="434" y="280" width="34" height="22" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="451" y="294" fontSize="9" fill="#0A2E5D" textAnchor="middle">Cancel</text>

      {/* Arrows */}
      <g stroke="#DC2626" strokeWidth="1.5" fill="none">
        {/* Arrow 1 — variable list */}
        <line x1="90" y1="252" x2="90" y2="245" markerEnd="url(#arrow)"/>
        <circle cx="90" cy="260" r="9" fill="#DC2626"/>
        <text x="90" y="263" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">1</text>

        {/* Arrow 2 — Variables box */}
        <line x1="310" y1="155" x2="310" y2="148" markerEnd="url(#arrow)"/>
        <circle cx="310" cy="163" r="9" fill="#DC2626"/>
        <text x="310" y="166" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">2</text>

        {/* Arrow 3 — Pearson */}
        <line x1="220" y1="184" x2="234" y2="184" markerEnd="url(#arrow)"/>
        <circle cx="210" cy="184" r="9" fill="#DC2626"/>
        <text x="210" y="187" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">3</text>

        {/* Arrow 4 — Options */}
        <line x1="436" y1="76" x2="436" y2="68" markerEnd="url(#arrow)"/>
        <circle cx="436" cy="84" r="9" fill="#DC2626"/>
        <text x="436" y="87" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">4</text>
      </g>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#DC2626"/>
        </marker>
      </defs>
    </svg>
  );
}

export function CorrelationOutput() {
  const headers = ['', 'study_hours', 'math_score', 'motivation', 'attendance'];
  const cells = [
    ['study_hours', '1', '.19*', '.08', '.04'],
    ['math_score',  '.19*', '1', '.27**', '.12'],
    ['motivation',  '.08', '.27**', '1', '.15*'],
    ['attendance',  '.04', '.12', '.15*', '1'],
  ];
  const sigRow = [
    ['Sig. (2-tailed)', '', '.038', '.376', '.660'],
    ['Sig. (2-tailed)', '.038', '', '.003', '.193'],
  ];
  return (
    <svg viewBox="0 0 540 280" className="w-full h-auto">
      <rect width="540" height="280" rx="8" fill="#fff" stroke="#0A2E5D" strokeOpacity=".15"/>
      {/* title bar */}
      <rect width="540" height="28" rx="8" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Output — Correlations</text>
      {/* table */}
      <g transform="translate(20,50)">
        {headers.map((h, i) => (
          <g key={i}>
            <rect x={i*100} y="0" width="100" height="28" fill="#0A2E5D" fillOpacity=".08"/>
            <text x={i*100 + 50} y="18" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{h}</text>
          </g>
        ))}
        {cells.map((row, ri) => row.map((v, ci) => (
          <g key={`${ri}-${ci}`}>
            <rect x={ci*100} y={28 + ri*40} width="100" height="40" fill={ri===ci ? '#FBF6E5' : '#fff'}
              stroke="#0A2E5D" strokeOpacity=".1"/>
            <text x={ci*100 + 50} y={28 + ri*40 + 18} fontSize="11"
              fill={ci===0 ? '#0A2E5D' : (v.includes('*') ? '#B8932A' : '#0A2E5D')}
              fontWeight={ci===0 || v.includes('*') ? 700 : 500}
              textAnchor="middle">{v}</text>
            {ci > 0 && ri !== ci - 1 && (
              <text x={ci*100 + 50} y={28 + ri*40 + 32} fontSize="8" fill="#64748B" textAnchor="middle">
                N = {115 + (ri+ci)}
              </text>
            )}
          </g>
        )))}
      </g>
      {/* legend */}
      <text x="20" y="252" fontSize="9" fill="#64748B" fontStyle="italic">
        * Correlation is significant at the .05 level (2-tailed).
      </text>
      <text x="20" y="266" fontSize="9" fill="#64748B" fontStyle="italic">
        ** Correlation is significant at the .01 level (2-tailed).
      </text>
    </svg>
  );
}

/* Placeholder illustrations for other lessons. Kept compact for now. */
export function PearsonFormula() {
  return (
    <svg viewBox="0 0 480 160" className="w-full h-auto">
      <rect width="480" height="160" rx="8" fill="#0A2E5D"/>
      <text x="240" y="60" fontSize="22" fill="#D4AF37" textAnchor="middle" fontFamily="serif" fontStyle="italic">
        r = Σ(xᵢ − x̄)(yᵢ − ȳ) / √[Σ(xᵢ − x̄)² · Σ(yᵢ − ȳ)²]
      </text>
      <text x="240" y="100" fontSize="12" fill="#FFF" textAnchor="middle" opacity=".8">
        The covariance of x and y, divided by the product of their standard deviations.
      </text>
      <text x="240" y="125" fontSize="11" fill="#D4AF37" textAnchor="middle" opacity=".9">
        You won't compute this by hand — but knowing it is a standardised covariance helps.
      </text>
    </svg>
  );
}

/* ── How r is computed: covariance over product of SDs ── */
export function HowRWorks() {
  // Show a small scatter with deviation lines from mean
  const pts = [
    [50, 100], [80, 130], [110, 90], [140, 170], [170, 60],
    [200, 110], [230, 150], [260, 70], [290, 130], [320, 50],
  ];
  // Strong positive set
  const sp = [
    [50, 200], [80, 195], [110, 170], [140, 160], [170, 140],
    [200, 130], [230, 110], [260, 95], [290, 75], [320, 50],
  ];
  const meanX = 185, meanY = 130;
  return (
    <svg viewBox="0 0 360 280" className="w-full h-auto">
      <rect width="360" height="280" rx="8" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>
      {/* axes */}
      <line x1="30" y1="240" x2="340" y2="240" stroke="#0A2E5D" strokeOpacity=".4" strokeWidth="1.5"/>
      <line x1="30" y1="30" x2="30" y2="240" stroke="#0A2E5D" strokeOpacity=".4" strokeWidth="1.5"/>
      <text x="185" y="262" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="600">X (e.g. study hours)</text>
      <text x="14" y="135" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="600" transform="rotate(-90, 14, 135)">Y (e.g. exam score)</text>
      {/* mean lines */}
      <line x1={meanX} y1="30" x2={meanX} y2="240" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="30" y1={meanY} x2="340" y2={meanY} stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3"/>
      <text x={meanX + 5} y="42" fontSize="10" fill="#B8932A" fontWeight="700">x̄</text>
      <text x="36" y={meanY - 5} fontSize="10" fill="#B8932A" fontWeight="700">ȳ</text>
      {/* points + their deviations */}
      {sp.map(([x, y], i) => (
        <g key={i}>
          {/* deviation lines from each point to the mean lines */}
          <line x1={x} y1={y} x2={meanX} y2={y} stroke="#2C599E" strokeOpacity=".2" strokeWidth="1"/>
          <line x1={x} y1={y} x2={x} y2={meanY} stroke="#2C599E" strokeOpacity=".2" strokeWidth="1"/>
          <circle cx={x} cy={y} r="4" fill="#0A2E5D"/>
        </g>
      ))}
      {/* Quadrant labels */}
      <text x="270" y="80"  fontSize="10" fill="#10B981" fontWeight="700">+ × +  (both above mean)</text>
      <text x="40"  y="220" fontSize="10" fill="#10B981" fontWeight="700">− × −  (both below mean)</text>
    </svg>
  );
}

/* ── Outlier impact illustration ── */
export function OutlierImpact() {
  const baseline = [
    [40, 200], [70, 180], [100, 160], [130, 145], [160, 130],
    [190, 120], [220, 105], [250, 90], [280, 75], [310, 60],
  ];
  return (
    <svg viewBox="0 0 720 240" className="w-full h-auto">
      {/* Left panel — without outlier */}
      <g transform="translate(0,0)">
        <rect width="340" height="240" rx="8" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>
        <line x1="30" y1="210" x2="320" y2="210" stroke="#0A2E5D" strokeOpacity=".4"/>
        <line x1="30" y1="20" x2="30" y2="210" stroke="#0A2E5D" strokeOpacity=".4"/>
        <line x1="40" y1="200" x2="310" y2="60" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 3"/>
        {baseline.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#0A2E5D"/>)}
        <text x="170" y="232" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">
          Without outlier → r = +0.94 (strong positive)
        </text>
      </g>
      {/* Right panel — with single outlier */}
      <g transform="translate(380,0)">
        <rect width="340" height="240" rx="8" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>
        <line x1="30" y1="210" x2="320" y2="210" stroke="#0A2E5D" strokeOpacity=".4"/>
        <line x1="30" y1="20" x2="30" y2="210" stroke="#0A2E5D" strokeOpacity=".4"/>
        {/* tilted/flattened line because of the outlier */}
        <line x1="40" y1="170" x2="310" y2="130" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 3"/>
        {baseline.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#0A2E5D"/>)}
        {/* the outlier */}
        <circle cx="290" cy="30" r="6" fill="#DC2626" stroke="#fff" strokeWidth="2"/>
        <text x="295" y="22" fontSize="10" fill="#DC2626" fontWeight="700">⚠ outlier</text>
        <text x="170" y="232" fontSize="11" fill="#DC2626" textAnchor="middle" fontWeight="700">
          With ONE outlier → r drops to +0.42
        </text>
      </g>
    </svg>
  );
}

/* ── Curvilinear (Pearson misses this) ── */
export function CurvilinearWarning() {
  // U-shape data
  const pts = Array.from({ length: 22 }, (_, i) => {
    const x = 30 + i * 14;
    const t = (i - 10) / 10; // -1 to +1
    const y = 200 - (1 - t * t) * 140 + Math.random() * 6;
    return [x, y];
  });
  return (
    <svg viewBox="0 0 360 240" className="w-full h-auto">
      <rect width="360" height="240" rx="8" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>
      <line x1="30" y1="210" x2="340" y2="210" stroke="#0A2E5D" strokeOpacity=".4"/>
      <line x1="30" y1="20" x2="30" y2="210" stroke="#0A2E5D" strokeOpacity=".4"/>
      {/* flat line that Pearson would draw */}
      <line x1="35" y1="120" x2="335" y2="120" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 3"/>
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" fill="#0A2E5D"/>)}
      <text x="180" y="234" fontSize="11" fill="#DC2626" textAnchor="middle" fontWeight="700">
        Clear U-shape · Pearson r ≈ 0.02 · "no relationship"
      </text>
      <text x="180" y="14" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontStyle="italic">
        Pearson only sees STRAIGHT lines — it misses curves entirely
      </text>
    </svg>
  );
}

/* ── Scatterplot + line of best fit, annotated ── */
export function ScatterAnnotated() {
  const pts = [
    [50, 200], [80, 180], [110, 175], [140, 160], [170, 150],
    [200, 140], [230, 125], [260, 110], [290, 100], [320, 85],
    [85, 195], [115, 165], [180, 145], [220, 130], [275, 105],
  ];
  return (
    <svg viewBox="0 0 360 250" className="w-full h-auto">
      <rect width="360" height="250" rx="8" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>
      <line x1="40" y1="220" x2="340" y2="220" stroke="#0A2E5D" strokeOpacity=".5" strokeWidth="1.5"/>
      <line x1="40" y1="20" x2="40" y2="220" stroke="#0A2E5D" strokeOpacity=".5" strokeWidth="1.5"/>
      {/* axes labels */}
      <text x="190" y="242" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Weekly study hours</text>
      <text x="20" y="120" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700" transform="rotate(-90, 20, 120)">Math score</text>
      {/* x-axis ticks */}
      {[0, 5, 10, 15, 20].map((v, i) => (
        <g key={v}>
          <line x1={50 + i * 70} y1="220" x2={50 + i * 70} y2="224" stroke="#0A2E5D" strokeOpacity=".5"/>
          <text x={50 + i * 70} y="234" fontSize="9" fill="#64748B" textAnchor="middle">{v}</text>
        </g>
      ))}
      {/* y-axis ticks */}
      {[40, 60, 80, 100].map((v, i) => (
        <g key={v}>
          <line x1="40" y1={210 - i * 50} x2="36" y2={210 - i * 50} stroke="#0A2E5D" strokeOpacity=".5"/>
          <text x="32" y={213 - i * 50} fontSize="9" fill="#64748B" textAnchor="end">{v}</text>
        </g>
      ))}
      {/* trend line */}
      <line x1="45" y1="200" x2="330" y2="85" stroke="#D4AF37" strokeWidth="2.5"/>
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4.5" fill="#0A2E5D" opacity=".75"/>)}
      {/* annotation */}
      <text x="240" y="40" fontSize="10" fill="#B8932A" fontWeight="700">Line of best fit</text>
      <line x1="240" y1="45" x2="250" y2="100" stroke="#B8932A" strokeWidth="1"/>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SPSS BASICS illustrations — for beginner lessons 1 & 2
   ════════════════════════════════════════════════════════════════════ */

/* ── The SPSS startup / launch dialog ── */
export function SpssStartScreen() {
  return (
    <svg viewBox="0 0 600 380" className="w-full h-auto">
      {/* desktop background */}
      <rect width="600" height="380" fill="#1E3A5F"/>
      <text x="300" y="25" fontSize="11" fill="#fff" opacity=".6" textAnchor="middle">Windows desktop</text>

      {/* SPSS launch window */}
      <rect x="80" y="50" width="440" height="300" rx="6" fill="#F8FAFC" stroke="#0A2E5D" strokeWidth="1.5"/>
      <rect x="80" y="50" width="440" height="32" rx="6" fill="#0A2E5D"/>
      <text x="100" y="71" fontSize="12" fill="#fff" fontWeight="700">IBM SPSS Statistics</text>
      <circle cx="500" cy="66" r="6" fill="#DC2626"/>
      <circle cx="484" cy="66" r="6" fill="#F59E0B"/>
      <circle cx="468" cy="66" r="6" fill="#10B981"/>

      {/* Welcome heading */}
      <text x="300" y="115" fontSize="18" fill="#0A2E5D" fontWeight="700" textAnchor="middle">Welcome to IBM SPSS Statistics</text>
      <text x="300" y="138" fontSize="11" fill="#64748B" textAnchor="middle">What would you like to do today?</text>

      {/* Three big buttons */}
      <rect x="110" y="160" width="180" height="60" rx="6" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
      <text x="200" y="185" fontSize="13" fill="#0A2E5D" fontWeight="700" textAnchor="middle">📂 Open an existing</text>
      <text x="200" y="203" fontSize="13" fill="#0A2E5D" fontWeight="700" textAnchor="middle">data file</text>

      <rect x="310" y="160" width="180" height="60" rx="6" fill="#fff" stroke="#94A3B8"/>
      <text x="400" y="185" fontSize="13" fill="#0A2E5D" fontWeight="600" textAnchor="middle">📊 Type in new</text>
      <text x="400" y="203" fontSize="13" fill="#0A2E5D" fontWeight="600" textAnchor="middle">data</text>

      <rect x="210" y="240" width="180" height="40" rx="6" fill="#fff" stroke="#94A3B8"/>
      <text x="300" y="265" fontSize="12" fill="#0A2E5D" textAnchor="middle">Run an existing query</text>

      {/* Don't show this again */}
      <rect x="110" y="305" width="12" height="12" rx="2" fill="#fff" stroke="#94A3B8"/>
      <text x="128" y="316" fontSize="11" fill="#64748B">Don't show this dialog in the future</text>

      <rect x="395" y="300" width="50" height="22" rx="3" fill="#0A2E5D"/>
      <text x="420" y="315" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="450" y="300" width="50" height="22" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="475" y="315" fontSize="11" fill="#0A2E5D" textAnchor="middle">Cancel</text>

      {/* Red arrow + annotation */}
      <g stroke="#DC2626" strokeWidth="2" fill="none">
        <line x1="40" y1="190" x2="105" y2="190" markerEnd="url(#aS)"/>
        <circle cx="22" cy="190" r="11" fill="#DC2626"/>
        <text x="22" y="194" fontSize="12" fill="#fff" textAnchor="middle" fontWeight="700">1</text>
      </g>
      <text x="22" y="220" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">First-time</text>
      <text x="22" y="232" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">tip: tick this</text>
      <text x="22" y="244" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">box to skip</text>
      <text x="22" y="256" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">this screen</text>
      <text x="22" y="268" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">next time</text>

      <defs>
        <marker id="aS" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#DC2626"/>
        </marker>
      </defs>
    </svg>
  );
}

/* ── The full SPSS interface, annotated ── */
export function SpssInterfaceMap() {
  return (
    <svg viewBox="0 0 720 460" className="w-full h-auto">
      <rect width="720" height="460" rx="6" fill="#F4F4F5" stroke="#0A2E5D" strokeWidth="1.5"/>

      {/* Title bar */}
      <rect width="720" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">*Untitled1 [DataSet0] - IBM SPSS Statistics Data Editor</text>
      <circle cx="690" cy="14" r="5" fill="#DC2626"/>
      <circle cx="676" cy="14" r="5" fill="#F59E0B"/>
      <circle cx="662" cy="14" r="5" fill="#10B981"/>

      {/* Menu bar */}
      <rect x="0" y="28" width="720" height="24" fill="#E2E8F0"/>
      {['File','Edit','View','Data','Transform','Analyze','Graphs','Utilities','Extensions','Window','Help'].map((m, i) => (
        <text key={m} x={14 + i * 60} y="44" fontSize="10" fill="#0A2E5D" fontWeight="600">{m}</text>
      ))}

      {/* Toolbar (icons row) */}
      <rect x="0" y="52" width="720" height="32" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.5"/>
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={10 + i * 24} y="58" width="20" height="20" rx="2" fill="#fff" stroke="#CBD5E1"/>
      ))}

      {/* Data grid area */}
      <rect x="0" y="84" width="720" height="340" fill="#fff"/>
      {/* Column headers */}
      <rect x="0" y="84" width="50" height="22" fill="#E2E8F0"/>
      <text x="25" y="99" fontSize="9" fill="#64748B" textAnchor="middle"></text>
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i}>
          <rect x={50 + i * 80} y="84" width="80" height="22" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.5"/>
          <text x={50 + i * 80 + 40} y="99" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="600">var</text>
        </g>
      ))}
      {/* Row numbers + empty cells */}
      {Array.from({ length: 14 }).map((_, r) => (
        <g key={r}>
          <rect x="0" y={106 + r * 22} width="50" height="22" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.5"/>
          <text x="25" y={120 + r * 22} fontSize="10" fill="#64748B" textAnchor="middle" fontWeight="600">{r + 1}</text>
          {Array.from({ length: 8 }).map((_, c) => (
            <rect key={c} x={50 + c * 80} y={106 + r * 22} width="80" height="22" fill="#fff" stroke="#E2E8F0" strokeWidth="0.5"/>
          ))}
        </g>
      ))}

      {/* Bottom tabs: Data View / Variable View */}
      <rect x="0" y="424" width="720" height="24" fill="#E2E8F0"/>
      <rect x="10" y="424" width="80" height="24" fill="#fff" stroke="#94A3B8"/>
      <text x="50" y="440" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Data View</text>
      <rect x="90" y="424" width="100" height="24" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="140" y="440" fontSize="10" fill="#64748B" textAnchor="middle">Variable View</text>

      {/* Annotations */}
      <g fill="#DC2626" stroke="#DC2626">
        <circle cx="370" cy="14"  r="10" stroke="none"/>
        <text x="370" y="18" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">1</text>

        <circle cx="370" cy="40"  r="10" stroke="none"/>
        <text x="370" y="44" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">2</text>

        <circle cx="370" cy="68"  r="10" stroke="none"/>
        <text x="370" y="72" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">3</text>

        <circle cx="370" cy="220" r="10" stroke="none"/>
        <text x="370" y="224" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">4</text>

        <circle cx="50"  cy="436" r="10" stroke="none"/>
        <text x="50"  y="440" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">5</text>

        <circle cx="140" cy="436" r="10" stroke="none"/>
        <text x="140" y="440" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">6</text>
      </g>
    </svg>
  );
}

/* ── A simple "case vs variable" explainer ── */
export function CaseVsVariable() {
  const headers = ['ID', 'Name', 'Age', 'Gender', 'Math Score'];
  const rows = [
    [1, 'Wanjiku', 22, 'F', 78],
    [2, 'Otieno',  24, 'M', 65],
    [3, 'Achieng', 21, 'F', 82],
    [4, 'Kamau',   23, 'M', 71],
  ];
  return (
    <svg viewBox="0 0 580 280" className="w-full h-auto">
      <rect width="580" height="280" fill="#fff"/>

      {/* Title strip */}
      <text x="290" y="20" fontSize="12" fill="#0A2E5D" fontWeight="700" textAnchor="middle">
        Each ROW = one case (pupil) · Each COLUMN = one variable
      </text>

      {/* Grid */}
      <g transform="translate(40,40)">
        {/* Header row */}
        {headers.map((h, i) => (
          <g key={i}>
            <rect x={i * 100} y="0" width="100" height="32" fill="#0A2E5D"/>
            <text x={i * 100 + 50} y="20" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">{h}</text>
          </g>
        ))}
        {/* Data rows */}
        {rows.map((row, r) => row.map((cell, c) => (
          <g key={`${r}-${c}`}>
            <rect x={c * 100} y={32 + r * 32} width="100" height="32"
              fill={r === 1 ? '#FBF6E5' : '#fff'}
              stroke="#CBD5E1" strokeWidth="0.5"/>
            <text x={c * 100 + 50} y={32 + r * 32 + 20} fontSize="11"
              fill={r === 1 ? '#B8932A' : '#0A2E5D'}
              fontWeight={r === 1 ? 700 : 400}
              textAnchor="middle">{cell}</text>
          </g>
        )))}
      </g>

      {/* "row = case" callout */}
      <g stroke="#DC2626" strokeWidth="2" fill="#DC2626">
        <line x1="540" y1="120" x2="545" y2="120"/>
        <path d="M540 120 L548 116 L548 124 Z" fill="#DC2626" stroke="none"/>
        <text x="552" y="124" fontSize="10" fill="#DC2626" fontWeight="700">← This row = Otieno's data</text>
      </g>

      {/* "column = variable" callout */}
      <g stroke="#10B981" strokeWidth="2" fill="none">
        <line x1="240" y1="245" x2="240" y2="255"/>
        <path d="M240 255 L236 247 L244 247 Z" fill="#10B981"/>
      </g>
      <text x="240" y="270" fontSize="10" fill="#10B981" fontWeight="700" textAnchor="middle">↑ This column = "Age" variable</text>
    </svg>
  );
}

/* ── Variable View, annotated ── */
export function VariableViewGrid() {
  const headers = ['Name', 'Type', 'Width', 'Decimals', 'Label', 'Values', 'Missing', 'Measure'];
  const rows = [
    ['id',        'Numeric', '8', '0', 'Pupil ID',         'None',        'None', 'Scale'],
    ['gender',    'Numeric', '8', '0', 'Gender of pupil',  '{1, Male}…',  '999',  'Nominal'],
    ['age_yrs',   'Numeric', '8', '0', 'Age in years',     'None',        '999',  'Scale'],
    ['math_score','Numeric', '8', '1', 'Maths score /100', 'None',        '999',  'Scale'],
  ];
  return (
    <svg viewBox="0 0 760 280" className="w-full h-auto">
      <rect width="760" height="280" rx="6" fill="#F4F4F5" stroke="#0A2E5D" strokeWidth="1"/>
      <rect width="760" height="24" rx="6" fill="#0A2E5D"/>
      <text x="14" y="17" fontSize="10" fill="#fff" fontWeight="700">Variable View — one row per variable</text>

      <g transform="translate(0,32)">
        {/* row number column */}
        <rect x="0" y="0" width="30" height="32" fill="#E2E8F0" stroke="#CBD5E1"/>
        {headers.map((h, i) => (
          <g key={i}>
            <rect x={30 + i * 90} y="0" width="90" height="32" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.5"/>
            <text x={30 + i * 90 + 45} y="20" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{h}</text>
          </g>
        ))}
        {rows.map((row, r) => (
          <g key={r}>
            <rect x="0" y={32 + r * 32} width="30" height="32" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.5"/>
            <text x="15" y={32 + r * 32 + 20} fontSize="10" fill="#64748B" textAnchor="middle" fontWeight="600">{r + 1}</text>
            {row.map((cell, c) => (
              <g key={c}>
                <rect x={30 + c * 90} y={32 + r * 32} width="90" height="32" fill="#fff" stroke="#E2E8F0" strokeWidth="0.5"/>
                <text x={30 + c * 90 + 45} y={32 + r * 32 + 20} fontSize="10" fill="#0A2E5D" textAnchor="middle">{cell}</text>
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* Bottom tab markers */}
      <rect x="0" y="224" width="760" height="24" fill="#E2E8F0"/>
      <rect x="10" y="224" width="80" height="24" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="50" y="240" fontSize="10" fill="#64748B" textAnchor="middle">Data View</text>
      <rect x="90" y="224" width="100" height="24" fill="#fff" stroke="#94A3B8"/>
      <text x="140" y="240" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Variable View</text>

      {/* Big red arrow pointing to "gender" Values cell */}
      <g>
        <circle cx="498" cy="92" r="11" fill="#DC2626"/>
        <text x="498" y="97" fontSize="12" fill="#fff" textAnchor="middle" fontWeight="700">!</text>
        <line x1="600" y1="92" x2="510" y2="92" stroke="#DC2626" strokeWidth="2"/>
        <text x="605" y="84" fontSize="9" fill="#DC2626" fontWeight="700">Always set</text>
        <text x="605" y="96" fontSize="9" fill="#DC2626" fontWeight="700">Value Labels for</text>
        <text x="605" y="108" fontSize="9" fill="#DC2626" fontWeight="700">categorical vars</text>
      </g>
    </svg>
  );
}

/* ── Data View grid populated with sample data ── */
export function DataViewGrid() {
  const cols = ['id', 'gender', 'age_yrs', 'math_score'];
  const data = [
    [1, 1, 22, 78.5],
    [2, 2, 24, 65.0],
    [3, 1, 21, 82.0],
    [4, 2, 23, 71.5],
    [5, 1, 25, 69.0],
    [6, 2, 20, 88.5],
  ];
  return (
    <svg viewBox="0 0 480 260" className="w-full h-auto">
      <rect width="480" height="260" rx="6" fill="#F4F4F5" stroke="#0A2E5D" strokeWidth="1"/>
      <rect width="480" height="24" rx="6" fill="#0A2E5D"/>
      <text x="14" y="17" fontSize="10" fill="#fff" fontWeight="700">Data View — one row per case (pupil)</text>

      <g transform="translate(0,32)">
        <rect x="0" y="0" width="40" height="28" fill="#E2E8F0" stroke="#CBD5E1"/>
        {cols.map((c, i) => (
          <g key={c}>
            <rect x={40 + i * 100} y="0" width="100" height="28" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.5"/>
            <text x={40 + i * 100 + 50} y="18" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{c}</text>
          </g>
        ))}
        {data.map((row, r) => (
          <g key={r}>
            <rect x="0" y={28 + r * 28} width="40" height="28" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.5"/>
            <text x="20" y={28 + r * 28 + 18} fontSize="10" fill="#64748B" textAnchor="middle" fontWeight="600">{r + 1}</text>
            {row.map((v, c) => (
              <g key={c}>
                <rect x={40 + c * 100} y={28 + r * 28} width="100" height="28" fill="#fff" stroke="#E2E8F0" strokeWidth="0.5"/>
                <text x={40 + c * 100 + 50} y={28 + r * 28 + 18} fontSize="11" fill="#0A2E5D" textAnchor="middle">{v}</text>
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* tabs */}
      <rect x="0" y="206" width="480" height="24" fill="#E2E8F0"/>
      <rect x="10" y="206" width="80" height="24" fill="#fff" stroke="#94A3B8"/>
      <text x="50" y="222" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Data View</text>
      <rect x="90" y="206" width="100" height="24" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="140" y="222" fontSize="10" fill="#64748B" textAnchor="middle">Variable View</text>
    </svg>
  );
}

/* ── Side-by-side: same dataset in Data View and Variable View ── */
export function DataVsVariableSideBySide() {
  return (
    <svg viewBox="0 0 760 300" className="w-full h-auto">
      <rect width="760" height="300" fill="#fff"/>

      {/* Left: Data View */}
      <text x="180" y="18" fontSize="11" fill="#0A2E5D" fontWeight="700" textAnchor="middle">DATA VIEW (the values)</text>
      <g transform="translate(20,28)">
        <rect width="320" height="240" fill="#F4F4F5" stroke="#0A2E5D" strokeWidth="1" rx="4"/>
        <rect width="320" height="20" fill="#0A2E5D" rx="4"/>
        <text x="160" y="14" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Data View</text>
        {/* header row */}
        {['id','gender','math'].map((h, i) => (
          <g key={h}>
            <rect x={20 + i * 100} y="20" width="100" height="24" fill="#E2E8F0" stroke="#CBD5E1"/>
            <text x={20 + i * 100 + 50} y="36" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{h}</text>
          </g>
        ))}
        <rect x="0" y="20" width="20" height="24" fill="#E2E8F0" stroke="#CBD5E1"/>
        {/* data */}
        {[[1,1,78],[2,2,65],[3,1,82],[4,2,71],[5,1,69]].map((row, r) => (
          <g key={r}>
            <rect x="0" y={44 + r * 32} width="20" height="32" fill="#F1F5F9" stroke="#CBD5E1"/>
            <text x="10" y={44 + r * 32 + 20} fontSize="9" fill="#64748B" textAnchor="middle">{r + 1}</text>
            {row.map((v, c) => (
              <g key={c}>
                <rect x={20 + c * 100} y={44 + r * 32} width="100" height="32" fill="#fff" stroke="#E2E8F0"/>
                <text x={20 + c * 100 + 50} y={44 + r * 32 + 20} fontSize="11" fill="#0A2E5D" textAnchor="middle">{v}</text>
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* Right: Variable View */}
      <text x="560" y="18" fontSize="11" fill="#0A2E5D" fontWeight="700" textAnchor="middle">VARIABLE VIEW (the definitions)</text>
      <g transform="translate(380,28)">
        <rect width="360" height="240" fill="#F4F4F5" stroke="#0A2E5D" strokeWidth="1" rx="4"/>
        <rect width="360" height="20" fill="#0A2E5D" rx="4"/>
        <text x="180" y="14" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Variable View</text>
        {['Name','Label','Values','Measure'].map((h, i) => (
          <g key={h}>
            <rect x={20 + i * 85} y="20" width="85" height="24" fill="#E2E8F0" stroke="#CBD5E1"/>
            <text x={20 + i * 85 + 42} y="36" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{h}</text>
          </g>
        ))}
        <rect x="0" y="20" width="20" height="24" fill="#E2E8F0" stroke="#CBD5E1"/>
        {[
          ['id',     'Pupil ID',     'None',         'Scale'],
          ['gender', 'Gender',       '{1,Male}{2,F}', 'Nominal'],
          ['math',   'Math /100',    'None',         'Scale'],
        ].map((row, r) => (
          <g key={r}>
            <rect x="0" y={44 + r * 32} width="20" height="32" fill="#F1F5F9" stroke="#CBD5E1"/>
            <text x="10" y={44 + r * 32 + 20} fontSize="9" fill="#64748B" textAnchor="middle">{r + 1}</text>
            {row.map((v, c) => (
              <g key={c}>
                <rect x={20 + c * 85} y={44 + r * 32} width="85" height="32" fill="#fff" stroke="#E2E8F0"/>
                <text x={20 + c * 85 + 42} y={44 + r * 32 + 20} fontSize="9" fill="#0A2E5D" textAnchor="middle">{v}</text>
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* Arrow between */}
      <g>
        <text x="380" y="280" fontSize="10" fill="#10B981" fontWeight="700" textAnchor="middle">
          Same dataset · two different "views" you can switch between with the bottom tabs
        </text>
      </g>
    </svg>
  );
}

/* ── Measurement levels: a card showing the 3 levels ── */
export function MeasurementLevels() {
  const levels = [
    { name: 'Scale',    icon: '📏', desc: 'Numbers on a continuous scale.\nExamples: age (yrs), income (KSh), score /100',         color: '#10B981' },
    { name: 'Ordinal',  icon: '📊', desc: 'Ranked categories — order matters but gaps may not be equal.\nExamples: Form 1/2/3/4, satisfaction low/med/high', color: '#D4AF37' },
    { name: 'Nominal',  icon: '🏷️', desc: 'Named categories with no order.\nExamples: gender, county, treatment group', color: '#2C599E' },
  ];
  return (
    <svg viewBox="0 0 720 180" className="w-full h-auto">
      <rect width="720" height="180" fill="#fff"/>
      {levels.map((lv, i) => (
        <g key={lv.name} transform={`translate(${20 + i * 230}, 20)`}>
          <rect width="220" height="140" rx="10" fill="#FAF7EF" stroke={lv.color} strokeWidth="2"/>
          <text x="20" y="40" fontSize="26">{lv.icon}</text>
          <text x="60" y="42" fontSize="18" fill="#0A2E5D" fontWeight="700">{lv.name}</text>
          {lv.desc.split('\n').map((line, li) => (
            <text key={li} x="20" y={75 + li * 18} fontSize="10" fill="#475569">{line}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SPSS BASICS lessons 3, 4, 5 — additional dialogs
   ════════════════════════════════════════════════════════════════════ */

/* ── Value Labels dialog ── */
export function ValueLabelsDialog() {
  return (
    <svg viewBox="0 0 480 340" className="w-full h-auto">
      <rect width="480" height="340" rx="6" fill="#F4F4F5" stroke="#0A2E5D" strokeWidth="1.5"/>
      <rect width="480" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Value Labels</text>
      <circle cx="464" cy="14" r="5" fill="#fff" opacity=".3"/>

      {/* Value Label section */}
      <text x="20" y="58" fontSize="10" fill="#0A2E5D" fontWeight="700">Value Labels</text>

      <text x="20" y="86" fontSize="10" fill="#0A2E5D">Value:</text>
      <rect x="80" y="74" width="80" height="22" fill="#fff" stroke="#94A3B8"/>
      <text x="86" y="89" fontSize="11" fill="#0A2E5D" fontFamily="monospace">2</text>

      <text x="180" y="86" fontSize="10" fill="#0A2E5D">Label:</text>
      <rect x="225" y="74" width="160" height="22" fill="#fff" stroke="#94A3B8"/>
      <text x="231" y="89" fontSize="11" fill="#0A2E5D" fontFamily="monospace">Female</text>

      {/* Add / Change / Remove buttons */}
      <rect x="395" y="74" width="65" height="22" rx="3" fill="#0A2E5D"/>
      <text x="427" y="89" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Add</text>
      <rect x="395" y="102" width="65" height="22" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="427" y="117" fontSize="10" fill="#0A2E5D" textAnchor="middle">Change</text>
      <rect x="395" y="130" width="65" height="22" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="427" y="145" fontSize="10" fill="#0A2E5D" textAnchor="middle">Remove</text>

      {/* List of value labels already added */}
      <rect x="20" y="110" width="365" height="160" fill="#fff" stroke="#94A3B8"/>
      <text x="28" y="130" fontSize="11" fill="#0A2E5D" fontFamily="monospace">1 = "Male"</text>
      <text x="28" y="150" fontSize="11" fill="#0A2E5D" fontFamily="monospace">2 = "Female"</text>
      <text x="28" y="170" fontSize="11" fill="#0A2E5D" fontFamily="monospace">999 = "Refused"</text>
      <rect x="20" y="142" width="365" height="16" fill="#FBF6E5" opacity=".5"/>

      {/* Buttons */}
      <rect x="280" y="290" width="60" height="26" rx="3" fill="#0A2E5D"/>
      <text x="310" y="307" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="346" y="290" width="60" height="26" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="376" y="307" fontSize="11" fill="#0A2E5D" textAnchor="middle">Cancel</text>
      <rect x="412" y="290" width="55" height="26" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="440" y="307" fontSize="11" fill="#0A2E5D" textAnchor="middle">Help</text>

      {/* Annotations */}
      <g>
        <circle cx="200" cy="85" r="11" fill="#DC2626"/>
        <text x="200" y="89" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">1</text>
        <text x="170" y="115" fontSize="9" fill="#DC2626" fontWeight="700">Type code + label</text>

        <circle cx="427" cy="60" r="11" fill="#DC2626"/>
        <text x="427" y="64" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">2</text>
        <text x="395" y="50" fontSize="9" fill="#DC2626" fontWeight="700">Click Add</text>

        <circle cx="200" cy="150" r="11" fill="#DC2626"/>
        <text x="200" y="154" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">3</text>
        <text x="220" y="154" fontSize="9" fill="#DC2626" fontWeight="700">Repeat for each</text>
      </g>
    </svg>
  );
}

/* ── Variable Properties dialog (Define Variable Properties shortcut) ── */
export function DefineVarPropertiesDialog() {
  return (
    <svg viewBox="0 0 540 360" className="w-full h-auto">
      <rect width="540" height="360" rx="6" fill="#F4F4F5" stroke="#0A2E5D" strokeWidth="1.5"/>
      <rect width="540" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Define Variable Properties</text>

      {/* Left: scanned variables */}
      <text x="14" y="54" fontSize="10" fill="#0A2E5D" fontWeight="700">Scanned variable list:</text>
      <rect x="14" y="60" width="150" height="240" fill="#fff" stroke="#94A3B8"/>
      {['gender','county','satisfaction','form','treatment'].map((v, i) => (
        <text key={v} x="22" y={80 + i * 22} fontSize="10"
          fill={i === 0 ? '#fff' : '#0A2E5D'}
          fontWeight={i === 0 ? 700 : 400}>
          {v}
        </text>
      ))}
      <rect x="14" y="66" width="150" height="20" fill="#0A2E5D" opacity=".85"/>

      {/* Right: properties for selected var */}
      <text x="180" y="54" fontSize="10" fill="#0A2E5D" fontWeight="700">Current Variable: gender</text>

      <text x="180" y="80" fontSize="10" fill="#0A2E5D">Label:</text>
      <rect x="230" y="68" width="290" height="22" fill="#fff" stroke="#94A3B8"/>
      <text x="236" y="84" fontSize="11" fill="#0A2E5D">Gender of respondent</text>

      <text x="180" y="108" fontSize="10" fill="#0A2E5D">Measure:</text>
      <rect x="230" y="96" width="120" height="22" fill="#fff" stroke="#94A3B8"/>
      <text x="236" y="112" fontSize="11" fill="#0A2E5D">Nominal ▾</text>

      <text x="180" y="138" fontSize="10" fill="#0A2E5D" fontWeight="700">Value Label grid:</text>

      {/* mini grid */}
      <rect x="180" y="148" width="340" height="120" fill="#fff" stroke="#94A3B8"/>
      <g transform="translate(180,148)">
        <rect width="60" height="20" fill="#E2E8F0"/>
        <rect x="60" width="160" height="20" fill="#E2E8F0"/>
        <rect x="220" width="40" height="20" fill="#E2E8F0"/>
        <rect x="260" width="80" height="20" fill="#E2E8F0"/>
        <text x="30" y="14" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Value</text>
        <text x="140" y="14" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Label</text>
        <text x="240" y="14" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Count</text>
        <text x="300" y="14" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Missing</text>

        {[
          { v: '1', l: 'Male',     c: 58 },
          { v: '2', l: 'Female',   c: 62 },
          { v: '999', l: 'Refused', c: 3, miss: true },
        ].map((row, i) => (
          <g key={i} transform={`translate(0, ${20 + i * 28})`}>
            <text x="30" y="18" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontFamily="monospace">{row.v}</text>
            <text x="68" y="18" fontSize="10" fill="#0A2E5D">{row.l}</text>
            <text x="240" y="18" fontSize="10" fill="#0A2E5D" textAnchor="middle">{row.c}</text>
            {row.miss && <text x="300" y="18" fontSize="10" fill="#DC2626" textAnchor="middle">✓</text>}
          </g>
        ))}
      </g>

      <text x="180" y="290" fontSize="9" fill="#64748B" fontStyle="italic">
        SPSS scanned your data and shows the unique values found.
      </text>

      <rect x="380" y="320" width="55" height="26" rx="3" fill="#0A2E5D"/>
      <text x="408" y="337" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="441" y="320" width="60" height="26" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="471" y="337" fontSize="11" fill="#0A2E5D" textAnchor="middle">Cancel</text>
    </svg>
  );
}

/* ── Excel import dialog ── */
export function ExcelImportDialog() {
  return (
    <svg viewBox="0 0 520 340" className="w-full h-auto">
      <rect width="520" height="340" rx="6" fill="#F4F4F5" stroke="#0A2E5D" strokeWidth="1.5"/>
      <rect width="520" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Read Excel File</text>

      {/* File path */}
      <text x="14" y="56" fontSize="10" fill="#0A2E5D" fontWeight="700">File:</text>
      <rect x="50" y="44" width="380" height="22" fill="#fff" stroke="#94A3B8"/>
      <text x="56" y="59" fontSize="10" fill="#0A2E5D" fontFamily="monospace">C:\Users\Naomi\Documents\thesis_data.xlsx</text>
      <rect x="436" y="44" width="70" height="22" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="471" y="59" fontSize="10" fill="#0A2E5D" textAnchor="middle">Browse…</text>

      {/* Worksheet */}
      <text x="14" y="92" fontSize="10" fill="#0A2E5D" fontWeight="700">Worksheet:</text>
      <rect x="100" y="80" width="220" height="22" fill="#fff" stroke="#94A3B8"/>
      <text x="106" y="95" fontSize="11" fill="#0A2E5D">Sheet1 [A1:G125] ▾</text>

      {/* Checkboxes */}
      <g>
        <rect x="14" y="120" width="14" height="14" fill="#0A2E5D" stroke="#0A2E5D"/>
        <path d="M 17 128 L 21 132 L 27 124" stroke="#fff" strokeWidth="2" fill="none"/>
        <text x="36" y="132" fontSize="11" fill="#0A2E5D" fontWeight="700">Read variable names from the first row of data</text>
      </g>
      <g>
        <rect x="14" y="142" width="14" height="14" fill="#0A2E5D" stroke="#0A2E5D"/>
        <path d="M 17 150 L 21 154 L 27 146" stroke="#fff" strokeWidth="2" fill="none"/>
        <text x="36" y="154" fontSize="11" fill="#0A2E5D">Determine data type from data</text>
      </g>
      <g>
        <rect x="14" y="164" width="14" height="14" fill="#fff" stroke="#94A3B8"/>
        <text x="36" y="176" fontSize="11" fill="#0A2E5D">Percentage of values that determine data type</text>
      </g>
      <g>
        <rect x="14" y="186" width="14" height="14" fill="#fff" stroke="#94A3B8"/>
        <text x="36" y="198" fontSize="11" fill="#0A2E5D">Ignore hidden rows and columns</text>
      </g>
      <g>
        <rect x="14" y="208" width="14" height="14" fill="#fff" stroke="#94A3B8"/>
        <text x="36" y="220" fontSize="11" fill="#0A2E5D">Remove leading spaces from string values</text>
      </g>

      {/* Preview area */}
      <text x="14" y="246" fontSize="10" fill="#0A2E5D" fontWeight="700">Preview:</text>
      <rect x="14" y="252" width="492" height="50" fill="#fff" stroke="#94A3B8"/>
      <g transform="translate(14,252)" fontSize="9" fontFamily="monospace" fill="#0A2E5D">
        <rect width="492" height="14" fill="#E2E8F0"/>
        <text x="20" y="11">id</text>
        <text x="80" y="11">gender</text>
        <text x="170" y="11">age</text>
        <text x="240" y="11">score</text>
        <text x="20" y="28">1</text>
        <text x="80" y="28">1</text>
        <text x="170" y="28">22</text>
        <text x="240" y="28">78.5</text>
        <text x="20" y="42">2</text>
        <text x="80" y="42">2</text>
        <text x="170" y="42">24</text>
        <text x="240" y="42">65.0</text>
      </g>

      <rect x="380" y="312" width="60" height="24" rx="3" fill="#0A2E5D"/>
      <text x="410" y="328" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="446" y="312" width="60" height="24" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="476" y="328" fontSize="11" fill="#0A2E5D" textAnchor="middle">Cancel</text>

      {/* Big red annotation on the critical checkboxes */}
      <g>
        <circle cx="540" cy="127" r="11" fill="#DC2626" display="none"/>
        <line x1="490" y1="127" x2="500" y2="127" stroke="#DC2626" strokeWidth="2"/>
        <text x="500" y="125" fontSize="9" fill="#DC2626" fontWeight="700" display="none">CRUCIAL</text>
      </g>
    </svg>
  );
}

/* ── Missing Values dialog ── */
export function MissingValuesDialog() {
  return (
    <svg viewBox="0 0 460 280" className="w-full h-auto">
      <rect width="460" height="280" rx="6" fill="#F4F4F5" stroke="#0A2E5D" strokeWidth="1.5"/>
      <rect width="460" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Missing Values</text>

      {/* Radio options */}
      <g transform="translate(20,50)">
        <circle cx="8" cy="8" r="5" fill="none" stroke="#94A3B8" strokeWidth="1.5"/>
        <text x="22" y="12" fontSize="11" fill="#0A2E5D">No missing values</text>
      </g>

      <g transform="translate(20,80)">
        <circle cx="8" cy="8" r="5" fill="#fff" stroke="#0A2E5D" strokeWidth="2"/>
        <circle cx="8" cy="8" r="2.5" fill="#0A2E5D"/>
        <text x="22" y="12" fontSize="11" fill="#0A2E5D" fontWeight="700">Discrete missing values</text>
      </g>

      {/* Three input boxes for discrete missing codes */}
      <g transform="translate(20,108)">
        <rect width="80" height="22" fill="#fff" stroke="#94A3B8"/>
        <text x="40" y="16" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontFamily="monospace">999</text>
        <rect x="90" width="80" height="22" fill="#fff" stroke="#94A3B8"/>
        <text x="130" y="16" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontFamily="monospace">998</text>
        <rect x="180" width="80" height="22" fill="#fff" stroke="#94A3B8"/>
        <text x="220" y="16" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontFamily="monospace">997</text>
      </g>

      <g transform="translate(20,150)">
        <circle cx="8" cy="8" r="5" fill="none" stroke="#94A3B8" strokeWidth="1.5"/>
        <text x="22" y="12" fontSize="11" fill="#0A2E5D">Range plus one optional discrete missing value</text>
      </g>

      {/* Buttons */}
      <rect x="280" y="232" width="55" height="26" rx="3" fill="#0A2E5D"/>
      <text x="308" y="249" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="341" y="232" width="60" height="26" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="371" y="249" fontSize="11" fill="#0A2E5D" textAnchor="middle">Cancel</text>
      <rect x="407" y="232" width="45" height="26" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="430" y="249" fontSize="11" fill="#0A2E5D" textAnchor="middle">Help</text>

      {/* Annotations */}
      <g>
        <circle cx="290" cy="119" r="11" fill="#DC2626"/>
        <text x="290" y="123" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">!</text>
        <text x="305" y="122" fontSize="9" fill="#DC2626" fontWeight="700">Declare ALL your</text>
        <text x="305" y="134" fontSize="9" fill="#DC2626" fontWeight="700">missing codes here</text>
      </g>
    </svg>
  );
}

/* ── Visualisation: kinds of missing data ── */
export function MissingTypesGrid() {
  // Mini illustration of three datasets: scattered, patterned, big gap
  const renderGrid = (x, y, label, color, missingPattern) => (
    <g transform={`translate(${x},${y})`}>
      <rect width="180" height="160" rx="6" fill="#FAF7EF" stroke={color} strokeWidth="2"/>
      <text x="90" y="18" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{label}</text>
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 5 }).map((_, c) => {
          const isMissing = missingPattern(r, c);
          return (
            <rect key={`${r}-${c}`}
              x={10 + c * 32} y={28 + r * 18}
              width="28" height="14"
              fill={isMissing ? color : '#fff'}
              opacity={isMissing ? 0.8 : 1}
              stroke="#CBD5E1" strokeWidth="0.5"/>
          );
        })
      )}
    </g>
  );
  return (
    <svg viewBox="0 0 600 200" className="w-full h-auto">
      {renderGrid(10,  10, 'MCAR — random scatter', '#10B981',
        (r, c) => (r === 1 && c === 2) || (r === 3 && c === 0) || (r === 5 && c === 4))}
      {renderGrid(210, 10, 'MAR — depends on another var', '#D4AF37',
        (r, c) => c === 3 && (r === 2 || r === 4 || r === 6))}
      {renderGrid(410, 10, 'MNAR — depends on itself', '#DC2626',
        (r, c) => (c === 4 && r > 3))}
    </svg>
  );
}

/* ── Excel "what NOT to do" — messy worksheet ── */
export function MessyExcelWarning() {
  return (
    <svg viewBox="0 0 600 280" className="w-full h-auto">
      <rect width="600" height="280" fill="#fff"/>
      {/* Excel-like header */}
      <rect width="600" height="20" fill="#107C41"/>
      <text x="10" y="14" fontSize="10" fill="#fff" fontWeight="700">thesis_data.xlsx</text>

      {/* Column letters */}
      <g transform="translate(0,24)">
        <rect width="30" height="20" fill="#E2E8F0"/>
        {['A','B','C','D','E','F','G'].map((l, i) => (
          <g key={l}>
            <rect x={30 + i * 80} width="80" height="20" fill="#E2E8F0" stroke="#CBD5E1"/>
            <text x={30 + i * 80 + 40} y="14" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{l}</text>
          </g>
        ))}
      </g>

      {/* Rows — illustrating bad practices */}
      <g transform="translate(0,44)" fontSize="10" fill="#0A2E5D">
        {/* Row 1: title (bad) */}
        <rect width="30" height="22" fill="#F1F5F9"/>
        <text x="15" y="16" textAnchor="middle">1</text>
        <text x="35" y="16" fontWeight="700">My thesis data — collected Sept 2024 by Naomi</text>
        {/* Row 2: empty */}
        <rect y="22" width="30" height="22" fill="#F1F5F9"/>
        <text x="15" y="38" textAnchor="middle">2</text>
        {/* Row 3: actual header */}
        <rect y="44" width="30" height="22" fill="#F1F5F9"/>
        <text x="15" y="60" textAnchor="middle">3</text>
        <text x="35" y="60">ID</text>
        <text x="115" y="60">Gender (M/F)</text>
        <text x="195" y="60">Age</text>
        <text x="275" y="60">County</text>
        <text x="355" y="60">Math Score (/100)</text>
        {/* Row 4: data */}
        <rect y="66" width="30" height="22" fill="#F1F5F9"/>
        <text x="15" y="82" textAnchor="middle">4</text>
        <text x="35" y="82">1</text>
        <text x="115" y="82">Male</text>
        <text x="195" y="82">22</text>
        <text x="275" y="82">Nairobi</text>
        <text x="355" y="82">78</text>
        {/* Row 5 */}
        <rect y="88" width="30" height="22" fill="#F1F5F9"/>
        <text x="15" y="104" textAnchor="middle">5</text>
        <text x="35" y="104">2</text>
        <text x="115" y="104">F</text>
        <text x="195" y="104"> </text>
        <text x="275" y="104">nairobi</text>
        <text x="355" y="104">N/A</text>
        {/* Row 6 */}
        <rect y="110" width="30" height="22" fill="#F1F5F9"/>
        <text x="15" y="126" textAnchor="middle">6</text>
        <text x="35" y="126">3</text>
        <text x="115" y="126">Female</text>
        <text x="195" y="126">24</text>
        <text x="275" y="126">Mombasa</text>
        <text x="355" y="126">82</text>
        {/* Row 7 - empty separator */}
        <rect y="132" width="30" height="22" fill="#F1F5F9"/>
        <text x="15" y="148" textAnchor="middle">7</text>
        {/* Row 8 - subtotal */}
        <rect y="154" width="30" height="22" fill="#F1F5F9"/>
        <text x="15" y="170" textAnchor="middle">8</text>
        <text x="35" y="170" fontWeight="700">Mean:</text>
        <text x="355" y="170" fontWeight="700">80.0</text>
      </g>

      {/* Big red X labels pointing at problems */}
      <g fontSize="9" fill="#DC2626" fontWeight="700">
        <text x="500" y="60">❌ Title row</text>
        <text x="500" y="76">(delete it)</text>

        <text x="500" y="105">❌ Inconsistent</text>
        <text x="500" y="121">codes Male/F</text>

        <text x="500" y="148">❌ Blank cell</text>
        <text x="500" y="164">(use 999)</text>

        <text x="500" y="195">❌ "N/A" as text</text>
        <text x="500" y="211">(use 999)</text>

        <text x="500" y="240">❌ Subtotal row</text>
        <text x="500" y="256">(remove)</text>
      </g>
    </svg>
  );
}

/* ── Clean dataset (what to import) ── */
export function CleanDatasetExample() {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-auto">
      <rect width="600" height="220" fill="#fff"/>
      <rect width="600" height="20" fill="#107C41"/>
      <text x="10" y="14" fontSize="10" fill="#fff" fontWeight="700">thesis_data_clean.xlsx</text>

      {/* Column letters */}
      <g transform="translate(0,24)">
        <rect width="30" height="20" fill="#E2E8F0"/>
        {['A','B','C','D','E'].map((l, i) => (
          <g key={l}>
            <rect x={30 + i * 110} width="110" height="20" fill="#E2E8F0" stroke="#CBD5E1"/>
            <text x={30 + i * 110 + 55} y="14" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{l}</text>
          </g>
        ))}
      </g>

      {/* Rows */}
      <g transform="translate(0,44)" fontSize="10" fill="#0A2E5D">
        {/* Row 1 = headers */}
        <rect width="30" height="22" fill="#F1F5F9"/>
        <text x="15" y="16" textAnchor="middle">1</text>
        {['id','gender','age_yrs','county','math_score'].map((h, i) => (
          <text key={h} x={30 + i * 110 + 55} y="16" textAnchor="middle" fontWeight="700" fontFamily="monospace">{h}</text>
        ))}

        {/* Data rows */}
        {[
          [1, 1, 22, 1, 78],
          [2, 2, 999, 1, 65],
          [3, 2, 24, 2, 82],
          [4, 1, 23, 1, 71],
          [5, 2, 25, 3, 69],
          [6, 1, 21, 2, 88],
        ].map((row, ri) => (
          <g key={ri}>
            <rect y={22 + ri * 22} width="30" height="22" fill="#F1F5F9"/>
            <text x="15" y={38 + ri * 22} textAnchor="middle">{ri + 2}</text>
            {row.map((v, ci) => (
              <text key={ci} x={30 + ci * 110 + 55} y={38 + ri * 22} textAnchor="middle" fontFamily="monospace">{v}</text>
            ))}
          </g>
        ))}
      </g>

      <text x="300" y="208" fontSize="10" fill="#10B981" textAnchor="middle" fontWeight="700">
        ✓ One header row · numeric codes · 999 for missing · short names · no titles or subtotals
      </text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════
   DESCRIPTIVE STATISTICS — illustrations for course
   ════════════════════════════════════════════════════════════════════ */

/* ── A clean Frequencies output table ── */
export function FrequenciesOutput() {
  const rows = [
    { v: 'Form 1', f: 35, p: 29.2, vp: 29.7, cp: 29.7 },
    { v: 'Form 2', f: 30, p: 25.0, vp: 25.4, cp: 55.1 },
    { v: 'Form 3', f: 27, p: 22.5, vp: 22.9, cp: 78.0 },
    { v: 'Form 4', f: 26, p: 21.7, vp: 22.0, cp: 100.0 },
  ];
  return (
    <svg viewBox="0 0 620 270" className="w-full h-auto">
      <rect width="620" height="270" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".15"/>
      <rect width="620" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Output — form (Form level of respondent)</text>

      <g transform="translate(0,40)">
        {/* Header row */}
        {['', 'Frequency', 'Percent', 'Valid Percent', 'Cumulative %'].map((h, i) => (
          <g key={i}>
            <rect x={i === 0 ? 0 : 110 + (i-1) * 120} y="0" width={i === 0 ? 110 : 120} height="32" fill="#0A2E5D" fillOpacity=".08"/>
            <text x={(i === 0 ? 55 : 110 + (i-1) * 120 + 60)} y="20" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{h}</text>
          </g>
        ))}

        {/* Valid header */}
        <rect x="0" y="32" width="110" height="22" fill="#FBF6E5"/>
        <text x="10" y="46" fontSize="10" fill="#0A2E5D" fontWeight="700">Valid</text>

        {/* Data rows */}
        {rows.map((row, ri) => (
          <g key={ri}>
            <rect x="0"   y={54 + ri * 32} width="110" height="32" fill={ri % 2 ? '#F8FAFC' : '#fff'} stroke="#E2E8F0" strokeWidth=".5"/>
            <text x="20"  y={54 + ri * 32 + 20} fontSize="11" fill="#0A2E5D">{row.v}</text>

            <rect x="110" y={54 + ri * 32} width="120" height="32" fill={ri % 2 ? '#F8FAFC' : '#fff'} stroke="#E2E8F0" strokeWidth=".5"/>
            <text x="170" y={54 + ri * 32 + 20} fontSize="11" fill="#0A2E5D" textAnchor="middle">{row.f}</text>

            <rect x="230" y={54 + ri * 32} width="120" height="32" fill={ri % 2 ? '#F8FAFC' : '#fff'} stroke="#E2E8F0" strokeWidth=".5"/>
            <text x="290" y={54 + ri * 32 + 20} fontSize="11" fill="#0A2E5D" textAnchor="middle">{row.p.toFixed(1)}</text>

            <rect x="350" y={54 + ri * 32} width="120" height="32" fill={ri % 2 ? '#F8FAFC' : '#fff'} stroke="#E2E8F0" strokeWidth=".5"/>
            <text x="410" y={54 + ri * 32 + 20} fontSize="11" fill="#0A2E5D" textAnchor="middle">{row.vp.toFixed(1)}</text>

            <rect x="470" y={54 + ri * 32} width="120" height="32" fill={ri % 2 ? '#F8FAFC' : '#fff'} stroke="#E2E8F0" strokeWidth=".5"/>
            <text x="530" y={54 + ri * 32 + 20} fontSize="11" fill="#0A2E5D" textAnchor="middle">{row.cp.toFixed(1)}</text>
          </g>
        ))}

        {/* Total row */}
        <rect x="0" y={54 + 4 * 32} width="110" height="32" fill="#FBF6E5"/>
        <text x="10" y={54 + 4 * 32 + 20} fontSize="11" fill="#0A2E5D" fontWeight="700">Total</text>
        <rect x="110" y={54 + 4 * 32} width="120" height="32" fill="#FBF6E5" stroke="#E2E8F0" strokeWidth=".5"/>
        <text x="170" y={54 + 4 * 32 + 20} fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">118</text>
        <rect x="230" y={54 + 4 * 32} width="120" height="32" fill="#FBF6E5" stroke="#E2E8F0" strokeWidth=".5"/>
        <text x="290" y={54 + 4 * 32 + 20} fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">98.3</text>
        <rect x="350" y={54 + 4 * 32} width="120" height="32" fill="#FBF6E5" stroke="#E2E8F0" strokeWidth=".5"/>
        <text x="410" y={54 + 4 * 32 + 20} fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">100.0</text>

        {/* Missing row */}
        <rect x="0" y={54 + 5 * 32 + 10} width="110" height="22" fill="#FEE2E2"/>
        <text x="10" y={54 + 5 * 32 + 24} fontSize="10" fill="#DC2626" fontWeight="700">Missing</text>
        <rect x="110" y={54 + 5 * 32 + 10} width="120" height="22" fill="#FEE2E2"/>
        <text x="170" y={54 + 5 * 32 + 24} fontSize="10" fill="#DC2626" textAnchor="middle">2</text>
      </g>
    </svg>
  );
}

/* ── A histogram showing distribution shape ── */
export function HistogramShape({ shape = 'normal' }) {
  // Generate bar heights based on shape
  let heights;
  if (shape === 'normal') {
    // Bell curve
    heights = [10, 25, 50, 80, 95, 80, 50, 25, 10];
  } else if (shape === 'right') {
    // Positive skew (long right tail)
    heights = [95, 85, 65, 40, 25, 15, 10, 6, 3];
  } else if (shape === 'left') {
    // Negative skew (long left tail)
    heights = [3, 6, 10, 15, 25, 40, 65, 85, 95];
  } else {
    heights = [10, 25, 50, 80, 95, 80, 50, 25, 10];
  }

  return (
    <svg viewBox="0 0 360 220" className="w-full h-auto">
      <rect width="360" height="220" rx="6" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>
      <line x1="30" y1="180" x2="340" y2="180" stroke="#0A2E5D" strokeOpacity=".5" strokeWidth="1.5"/>
      <line x1="30" y1="20" x2="30" y2="180" stroke="#0A2E5D" strokeOpacity=".5" strokeWidth="1.5"/>
      {heights.map((h, i) => (
        <rect key={i} x={36 + i * 32} y={180 - h * 1.5} width="28" height={h * 1.5}
          fill="#0A2E5D" opacity=".75" stroke="#0A2E5D" strokeWidth=".5"/>
      ))}
      {/* x-axis label */}
      <text x="185" y="206" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="600">Value of variable</text>
      <text x="20" y="100" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="600" transform="rotate(-90, 20, 100)">Frequency</text>
      {/* title */}
      <text x="185" y="14" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        {shape === 'normal' ? 'Symmetric / Normal' :
         shape === 'right' ? 'Positively skewed (long right tail)' :
         shape === 'left' ? 'Negatively skewed (long left tail)' : 'Shape'}
      </text>
    </svg>
  );
}

/* ── Three distributions side by side ── */
export function DistributionShapes() {
  return (
    <svg viewBox="0 0 740 220" className="w-full h-auto">
      <g transform="translate(0,0)"><HistogramShapeInline shape="left" /></g>
      <g transform="translate(250,0)"><HistogramShapeInline shape="normal" /></g>
      <g transform="translate(500,0)"><HistogramShapeInline shape="right" /></g>
    </svg>
  );
}
function HistogramShapeInline({ shape }) {
  let heights;
  if (shape === 'normal') heights = [10, 25, 50, 80, 95, 80, 50, 25, 10];
  else if (shape === 'right') heights = [95, 85, 65, 40, 25, 15, 10, 6, 3];
  else heights = [3, 6, 10, 15, 25, 40, 65, 85, 95];
  return (
    <g>
      <rect width="240" height="220" rx="6" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>
      <line x1="20" y1="180" x2="230" y2="180" stroke="#0A2E5D" strokeOpacity=".5"/>
      <line x1="20" y1="20" x2="20" y2="180" stroke="#0A2E5D" strokeOpacity=".5"/>
      {heights.map((h, i) => (
        <rect key={i} x={28 + i * 22} y={180 - h * 1.4} width="18" height={h * 1.4}
          fill="#0A2E5D" opacity=".75"/>
      ))}
      <text x="125" y="14" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        {shape === 'normal' ? 'Symmetric (skew ≈ 0)' :
         shape === 'right' ? 'Positively skewed (skew > 0)' :
         'Negatively skewed (skew < 0)'}
      </text>
      <text x="125" y="206" fontSize="9" fill="#64748B" textAnchor="middle" fontStyle="italic">
        {shape === 'normal' ? 'Mean ≈ Median ≈ Mode' :
         shape === 'right' ? 'Mean > Median > Mode' :
         'Mean < Median < Mode'}
      </text>
    </g>
  );
}

/* ── Mean vs Median: outlier impact ── */
export function MeanVsMedian() {
  // Show two scenarios side by side: with outlier vs without
  return (
    <svg viewBox="0 0 720 200" className="w-full h-auto">
      <rect width="720" height="200" fill="#fff"/>

      {/* Left scenario — no outlier */}
      <g transform="translate(0,0)">
        <rect width="340" height="200" rx="6" fill="#FAF7EF" stroke="#10B981" strokeWidth="2"/>
        <text x="170" y="22" fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
          Five typical incomes (KSh thousands)
        </text>

        {/* Dot plot */}
        <line x1="20" y1="115" x2="320" y2="115" stroke="#0A2E5D" opacity=".4" strokeWidth="1.5"/>
        {[35, 42, 48, 55, 62].map((v, i) => (
          <circle key={i} cx={20 + (v - 30) * 7} cy="115" r="8" fill="#0A2E5D" opacity=".7"/>
        ))}
        {[35, 42, 48, 55, 62].map((v, i) => (
          <text key={i} x={20 + (v - 30) * 7} cy="115" y="138" fontSize="9" fill="#64748B" textAnchor="middle">{v}</text>
        ))}

        <text x="170" y="170" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">
          Mean = 48.4 · Median = 48
        </text>
        <text x="170" y="188" fontSize="9" fill="#64748B" textAnchor="middle" fontStyle="italic">
          Both summaries agree → either is fine
        </text>
      </g>

      {/* Right scenario — with outlier */}
      <g transform="translate(380,0)">
        <rect width="340" height="200" rx="6" fill="#FAF7EF" stroke="#DC2626" strokeWidth="2"/>
        <text x="170" y="22" fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
          Same group + one tycoon (KSh thousands)
        </text>

        <line x1="20" y1="115" x2="320" y2="115" stroke="#0A2E5D" opacity=".4" strokeWidth="1.5"/>
        {[35, 42, 48, 55, 62].map((v, i) => (
          <circle key={i} cx={20 + (v - 30) * 4} cy="115" r="8" fill="#0A2E5D" opacity=".7"/>
        ))}
        {/* outlier */}
        <circle cx="300" cy="115" r="10" fill="#DC2626" stroke="#fff" strokeWidth="2"/>
        <text x="300" y="98" fontSize="9" fill="#DC2626" textAnchor="middle" fontWeight="700">2,500</text>

        {[35, 42, 48, 55, 62].map((v, i) => (
          <text key={i} x={20 + (v - 30) * 4} y="138" fontSize="9" fill="#64748B" textAnchor="middle">{v}</text>
        ))}

        <text x="170" y="170" fontSize="11" fill="#DC2626" textAnchor="middle" fontWeight="700">
          Mean = 457 · Median = 48
        </text>
        <text x="170" y="188" fontSize="9" fill="#64748B" textAnchor="middle" fontStyle="italic">
          Mean misleading → report the MEDIAN
        </text>
      </g>
    </svg>
  );
}

/* ── Standard deviation: same mean, different spread ── */
export function SameMeanDifferentSD() {
  return (
    <svg viewBox="0 0 720 240" className="w-full h-auto">
      <rect width="720" height="240" fill="#fff"/>

      {/* Class A — tight */}
      <g transform="translate(0,0)">
        <rect width="340" height="240" rx="6" fill="#FAF7EF" stroke="#10B981" strokeWidth="2"/>
        <text x="170" y="22" fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
          Class A — Mean = 70, SD = 5
        </text>
        {/* Bell curve, narrow */}
        <path d="M 60 180 Q 170 30 280 180 Z" fill="#10B981" opacity=".25" stroke="#10B981" strokeWidth="2"/>
        <line x1="170" y1="60" x2="170" y2="180" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3"/>
        <text x="170" y="200" fontSize="10" fill="#0A2E5D" textAnchor="middle">Mean</text>
        <text x="170" y="218" fontSize="10" fill="#10B981" textAnchor="middle" fontWeight="700">
          "Everyone scored close to 70"
        </text>
      </g>

      {/* Class B — wide */}
      <g transform="translate(380,0)">
        <rect width="340" height="240" rx="6" fill="#FAF7EF" stroke="#DC2626" strokeWidth="2"/>
        <text x="170" y="22" fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
          Class B — Mean = 70, SD = 20
        </text>
        {/* Bell curve, wide */}
        <path d="M 20 180 Q 170 100 320 180 Z" fill="#DC2626" opacity=".2" stroke="#DC2626" strokeWidth="2"/>
        <line x1="170" y1="125" x2="170" y2="180" stroke="#DC2626" strokeWidth="2" strokeDasharray="3 3"/>
        <text x="170" y="200" fontSize="10" fill="#0A2E5D" textAnchor="middle">Mean</text>
        <text x="170" y="218" fontSize="10" fill="#DC2626" textAnchor="middle" fontWeight="700">
          "Scores all over the place"
        </text>
      </g>
    </svg>
  );
}

/* ── Boxplot anatomy ── */
export function BoxplotAnatomy() {
  return (
    <svg viewBox="0 0 720 240" className="w-full h-auto">
      <rect width="720" height="240" fill="#fff"/>
      {/* Horizontal axis */}
      <line x1="40" y1="180" x2="680" y2="180" stroke="#0A2E5D" opacity=".4"/>
      {[0, 20, 40, 60, 80, 100].map((v, i) => (
        <g key={v}>
          <line x1={40 + i * 128} y1="180" x2={40 + i * 128} y2="184" stroke="#0A2E5D" opacity=".4"/>
          <text x={40 + i * 128} y="200" fontSize="10" fill="#64748B" textAnchor="middle">{v}</text>
        </g>
      ))}
      <text x="360" y="220" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Math score</text>

      {/* Whisker left */}
      <line x1="120" y1="100" x2="220" y2="100" stroke="#0A2E5D" strokeWidth="2"/>
      <line x1="120" y1="90"  x2="120" y2="110" stroke="#0A2E5D" strokeWidth="2"/>
      {/* Box */}
      <rect x="220" y="70" width="220" height="60" fill="#D4AF37" fillOpacity=".25" stroke="#0A2E5D" strokeWidth="2"/>
      {/* Median line */}
      <line x1="330" y1="70" x2="330" y2="130" stroke="#0A2E5D" strokeWidth="3"/>
      {/* Whisker right */}
      <line x1="440" y1="100" x2="540" y2="100" stroke="#0A2E5D" strokeWidth="2"/>
      <line x1="540" y1="90"  x2="540" y2="110" stroke="#0A2E5D" strokeWidth="2"/>
      {/* Outlier */}
      <circle cx="610" cy="100" r="6" fill="#DC2626"/>

      {/* Annotations */}
      <g fontSize="10" fill="#0A2E5D" fontWeight="700">
        <line x1="120" y1="60" x2="120" y2="85" stroke="#DC2626" strokeWidth="1"/>
        <text x="120" y="50" textAnchor="middle">Min (whisker)</text>

        <line x1="220" y1="40" x2="220" y2="68" stroke="#DC2626" strokeWidth="1"/>
        <text x="220" y="32" textAnchor="middle">Q1 (25th)</text>

        <line x1="330" y1="20" x2="330" y2="68" stroke="#DC2626" strokeWidth="1"/>
        <text x="330" y="14" textAnchor="middle">Median (Q2 — 50th)</text>

        <line x1="440" y1="40" x2="440" y2="68" stroke="#DC2626" strokeWidth="1"/>
        <text x="440" y="32" textAnchor="middle">Q3 (75th)</text>

        <line x1="540" y1="60" x2="540" y2="85" stroke="#DC2626" strokeWidth="1"/>
        <text x="540" y="50" textAnchor="middle">Max</text>

        <line x1="610" y1="80" x2="610" y2="92" stroke="#DC2626" strokeWidth="1"/>
        <text x="610" y="70" textAnchor="middle" fill="#DC2626">Outlier</text>

        <text x="330" y="155" textAnchor="middle" fontStyle="italic" fontWeight="400" fill="#64748B">
          The BOX = middle 50% of cases (IQR)
        </text>
      </g>
    </svg>
  );
}

/* ── Bar chart vs pie chart ── */
export function BarVsPie() {
  return (
    <svg viewBox="0 0 720 240" className="w-full h-auto">
      <rect width="720" height="240" fill="#fff"/>

      {/* Bar chart */}
      <g transform="translate(0,0)">
        <rect width="340" height="240" rx="6" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>
        <text x="170" y="20" fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Bar chart — Form distribution</text>
        <line x1="40" y1="200" x2="320" y2="200" stroke="#0A2E5D" opacity=".4"/>
        {[
          { l: 'Form 1', h: 100, n: 35 },
          { l: 'Form 2', h: 85,  n: 30 },
          { l: 'Form 3', h: 77,  n: 27 },
          { l: 'Form 4', h: 74,  n: 26 },
        ].map((b, i) => (
          <g key={i}>
            <rect x={60 + i * 60} y={200 - b.h} width="50" height={b.h} fill="#0A2E5D" opacity=".75"/>
            <text x={85 + i * 60} y={195 - b.h} fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{b.n}</text>
            <text x={85 + i * 60} y="218" fontSize="9" fill="#64748B" textAnchor="middle">{b.l}</text>
          </g>
        ))}
      </g>

      {/* Pie chart */}
      <g transform="translate(380,0)">
        <rect width="340" height="240" rx="6" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>
        <text x="170" y="20" fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Pie chart — Form distribution</text>

        {/* Pie slices — simple version */}
        <g transform="translate(170,125)">
          <path d="M 0 0 L 0 -70 A 70 70 0 0 1 60.6 35 Z" fill="#0A2E5D"/>
          <path d="M 0 0 L 60.6 35 A 70 70 0 0 1 -16.5 67.9 Z" fill="#D4AF37"/>
          <path d="M 0 0 L -16.5 67.9 A 70 70 0 0 1 -66.7 -21.4 Z" fill="#2C599E"/>
          <path d="M 0 0 L -66.7 -21.4 A 70 70 0 0 1 0 -70 Z" fill="#8EAAD3"/>
        </g>
        {/* Legend */}
        <g transform="translate(260,80)" fontSize="9">
          {[
            { c: '#0A2E5D', l: 'Form 1 (30%)' },
            { c: '#D4AF37', l: 'Form 2 (25%)' },
            { c: '#2C599E', l: 'Form 3 (23%)' },
            { c: '#8EAAD3', l: 'Form 4 (22%)' },
          ].map((it, i) => (
            <g key={i} transform={`translate(0, ${i * 18})`}>
              <rect width="10" height="10" fill={it.c}/>
              <text x="14" y="9" fill="#0A2E5D">{it.l}</text>
            </g>
          ))}
        </g>

        <text x="170" y="225" fontSize="9" fill="#10B981" textAnchor="middle" fontWeight="700">
          Both show the same data — bar charts are usually clearer
        </text>
      </g>
    </svg>
  );
}

/* ── Chart Builder dialog ── */
export function ChartBuilderDialog() {
  return (
    <svg viewBox="0 0 600 360" className="w-full h-auto">
      <rect width="600" height="360" rx="6" fill="#F4F4F5" stroke="#0A2E5D" strokeWidth="1.5"/>
      <rect width="600" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Chart Builder</text>

      {/* Left: variables */}
      <text x="14" y="54" fontSize="10" fill="#0A2E5D" fontWeight="700">Variables:</text>
      <rect x="14" y="60" width="120" height="200" fill="#fff" stroke="#94A3B8"/>
      {['gender','age_yrs','county','form','math_score','english_score','satisfaction'].map((v, i) => (
        <text key={v} x="22" y={80 + i * 22} fontSize="10" fill="#0A2E5D">📊 {v}</text>
      ))}

      {/* Centre: chart preview area */}
      <text x="150" y="54" fontSize="10" fill="#0A2E5D" fontWeight="700">Chart preview (drag a variable below):</text>
      <rect x="150" y="60" width="280" height="200" fill="#fff" stroke="#94A3B8" strokeDasharray="3 3"/>
      {/* Mini histogram preview */}
      <g transform="translate(170,80)">
        {[15, 35, 60, 80, 55, 30, 12].map((h, i) => (
          <rect key={i} x={i * 32} y={170 - h * 1.8} width="28" height={h * 1.8}
            fill="#0A2E5D" opacity=".75"/>
        ))}
      </g>
      {/* Drop zones */}
      <text x="290" y="280" fontSize="9" fill="#64748B" textAnchor="middle" fontStyle="italic">
        X-Axis: drag math_score here
      </text>

      {/* Right: gallery */}
      <text x="450" y="54" fontSize="10" fill="#0A2E5D" fontWeight="700">Gallery:</text>
      <rect x="450" y="60" width="140" height="200" fill="#fff" stroke="#94A3B8"/>
      {[
        { name: 'Bar',       y: 80 },
        { name: 'Pie',       y: 110 },
        { name: 'Line',      y: 140 },
        { name: 'Histogram', y: 170, active: true },
        { name: 'Boxplot',   y: 200 },
        { name: 'Scatter',   y: 230 },
      ].map((c) => (
        <g key={c.name}>
          <rect x="458" y={c.y - 12} width="124" height="22" rx="3"
            fill={c.active ? '#FBF6E5' : '#fff'} stroke={c.active ? '#D4AF37' : '#CBD5E1'}/>
          <text x="468" y={c.y + 2} fontSize="10" fill="#0A2E5D" fontWeight={c.active ? 700 : 400}>📊 {c.name}</text>
        </g>
      ))}

      {/* OK button */}
      <rect x="450" y="320" width="60" height="28" rx="3" fill="#0A2E5D"/>
      <text x="480" y="338" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="516" y="320" width="68" height="28" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="550" y="338" fontSize="11" fill="#0A2E5D" textAnchor="middle">Cancel</text>
    </svg>
  );
}

/* ── Empirical rule: 68-95-99.7 ── */
export function EmpiricalRule() {
  return (
    <svg viewBox="0 0 600 240" className="w-full h-auto">
      <rect width="600" height="240" fill="#fff"/>

      {/* Bell curve */}
      <path d="M 50 200 Q 150 200 200 80 Q 250 -10 300 -10 Q 350 -10 400 80 Q 450 200 550 200 Z"
        fill="#0A2E5D" opacity=".1" stroke="#0A2E5D" strokeWidth="1.5"/>

      {/* Vertical lines for ±1, ±2, ±3 SD */}
      {[150, 200, 250, 300, 350, 400, 450].map((x, i) => (
        <line key={i} x1={x} y1="200" x2={x} y2={x === 300 ? '-10' : x === 200 || x === 400 ? '60' : x === 250 || x === 350 ? '20' : '120'}
          stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3"/>
      ))}

      {/* Center mean */}
      <text x="300" y="216" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">μ</text>
      <text x="250" y="216" fontSize="10" fill="#64748B" textAnchor="middle">−1σ</text>
      <text x="350" y="216" fontSize="10" fill="#64748B" textAnchor="middle">+1σ</text>
      <text x="200" y="216" fontSize="10" fill="#64748B" textAnchor="middle">−2σ</text>
      <text x="400" y="216" fontSize="10" fill="#64748B" textAnchor="middle">+2σ</text>
      <text x="150" y="216" fontSize="10" fill="#64748B" textAnchor="middle">−3σ</text>
      <text x="450" y="216" fontSize="10" fill="#64748B" textAnchor="middle">+3σ</text>

      {/* Brackets and labels */}
      <text x="300" y="100" fontSize="13" fill="#10B981" textAnchor="middle" fontWeight="700">68%</text>
      <text x="300" y="60"  fontSize="11" fill="#D4AF37" textAnchor="middle" fontWeight="700">95% (within ±2σ)</text>
      <text x="300" y="30"  fontSize="11" fill="#DC2626" textAnchor="middle" fontWeight="700">99.7% (within ±3σ)</text>

      <text x="300" y="234" fontSize="9" fill="#64748B" textAnchor="middle" fontStyle="italic">
        The empirical (68-95-99.7) rule for any approximately normal distribution
      </text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════
   RELIABILITY TESTING — illustrations
   ════════════════════════════════════════════════════════════════════ */

/* ── Reliability Analysis dialog ── */
export function ReliabilityDialog() {
  return (
    <svg viewBox="0 0 540 360" className="w-full h-auto">
      <rect width="540" height="360" rx="6" fill="#F4F4F5" stroke="#0A2E5D" strokeWidth="1.5"/>
      <rect width="540" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Reliability Analysis</text>

      {/* Variables list */}
      <text x="14" y="54" fontSize="10" fill="#0A2E5D" fontWeight="700">Variables in dataset:</text>
      <rect x="14" y="60" width="160" height="220" fill="#fff" stroke="#94A3B8"/>
      {['gender','age_yrs','sa_01','sa_02','sa_03','sa_04','sa_05','sa_06','sa_07','sa_08'].map((v, i) => (
        <text key={v} x="22" y={80 + i * 22} fontSize="10" fill="#0A2E5D">📊 {v}</text>
      ))}

      {/* Arrow */}
      <rect x="186" y="160" width="32" height="22" rx="3" fill="#fff" stroke="#94A3B8"/>
      <text x="202" y="175" fontSize="14" fill="#0A2E5D" textAnchor="middle">▶</text>

      {/* Items box */}
      <text x="232" y="54" fontSize="10" fill="#0A2E5D" fontWeight="700">Items:</text>
      <rect x="232" y="60" width="280" height="170" fill="#fff" stroke="#94A3B8"/>
      {['sa_01','sa_02','sa_03','sa_04','sa_05','sa_06','sa_07','sa_08'].map((v, i) => (
        <text key={v} x="240" y={78 + i * 20} fontSize="10" fill="#0A2E5D" fontWeight="600">📊 {v}</text>
      ))}

      {/* Model dropdown */}
      <text x="232" y="252" fontSize="10" fill="#0A2E5D" fontWeight="700">Model:</text>
      <rect x="280" y="240" width="140" height="22" fill="#fff" stroke="#94A3B8"/>
      <text x="288" y="255" fontSize="11" fill="#0A2E5D">Alpha ▾</text>

      <text x="232" y="280" fontSize="10" fill="#0A2E5D" fontWeight="700">Scale label:</text>
      <rect x="312" y="268" width="200" height="22" fill="#fff" stroke="#94A3B8"/>
      <text x="320" y="283" fontSize="11" fill="#0A2E5D">Job satisfaction (8 items)</text>

      {/* Statistics button */}
      <rect x="448" y="60" width="80" height="22" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="488" y="74" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Statistics…</text>

      {/* OK */}
      <rect x="370" y="320" width="50" height="26" rx="3" fill="#0A2E5D"/>
      <text x="395" y="337" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="426" y="320" width="56" height="26" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="454" y="337" fontSize="11" fill="#0A2E5D" textAnchor="middle">Cancel</text>

      {/* Annotations */}
      <g>
        <circle cx="488" cy="46" r="11" fill="#DC2626"/>
        <text x="488" y="50" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">!</text>
        <text x="498" y="92" fontSize="9" fill="#DC2626" fontWeight="700">Click here for</text>
        <text x="498" y="104" fontSize="9" fill="#DC2626" fontWeight="700">"Scale if item deleted"</text>
      </g>
      <g>
        <circle cx="262" cy="252" r="11" fill="#DC2626"/>
        <text x="262" y="256" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">2</text>
        <text x="200" y="320" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">Pick "Alpha" (Cronbach\'s α)</text>
      </g>
    </svg>
  );
}

/* ── Reliability Statistics output table ── */
export function ReliabilityOutput() {
  return (
    <svg viewBox="0 0 500 130" className="w-full h-auto">
      <rect width="500" height="130" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".15"/>
      <rect width="500" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Reliability Statistics</text>

      <g transform="translate(0,40)">
        {/* Headers */}
        <rect width="220" height="32" fill="#0A2E5D" fillOpacity=".08" stroke="#E2E8F0"/>
        <text x="110" y="20" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Cronbach's Alpha</text>
        <rect x="220" width="160" height="32" fill="#0A2E5D" fillOpacity=".08" stroke="#E2E8F0"/>
        <text x="300" y="20" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">N of Items</text>

        {/* Values */}
        <rect y="32" width="220" height="44" fill="#FBF6E5" stroke="#E2E8F0"/>
        <text x="110" y="60" fontSize="24" fill="#0A2E5D" textAnchor="middle" fontWeight="700">.847</text>

        <rect x="220" y="32" width="160" height="44" fill="#fff" stroke="#E2E8F0"/>
        <text x="300" y="60" fontSize="20" fill="#0A2E5D" textAnchor="middle" fontWeight="700">8</text>
      </g>

      <text x="250" y="118" fontSize="9" fill="#10B981" textAnchor="middle" fontWeight="700" fontStyle="italic">
        α = .847 → Good reliability (≥ .80 is "good", ≥ .70 is "acceptable")
      </text>
    </svg>
  );
}

/* ── Item-Total Statistics table ── */
export function ItemTotalStatistics() {
  const items = [
    { name: 'sa_01', sm: 27.8, sv: 15.4, citc: .62, alpha: .82 },
    { name: 'sa_02', sm: 28.1, sv: 14.9, citc: .58, alpha: .82 },
    { name: 'sa_03', sm: 27.5, sv: 14.2, citc: .71, alpha: .81 },
    { name: 'sa_04', sm: 28.4, sv: 16.1, citc: .12, alpha: .88, problem: true },
    { name: 'sa_05', sm: 27.9, sv: 15.0, citc: .65, alpha: .82 },
    { name: 'sa_06', sm: 28.0, sv: 14.7, citc: .68, alpha: .81 },
    { name: 'sa_07', sm: 28.3, sv: 15.5, citc: .49, alpha: .83 },
    { name: 'sa_08', sm: 27.7, sv: 14.6, citc: .66, alpha: .82 },
  ];
  return (
    <svg viewBox="0 0 660 360" className="w-full h-auto">
      <rect width="660" height="360" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".15"/>
      <rect width="660" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Item-Total Statistics</text>

      <g transform="translate(0,40)">
        {/* Headers */}
        {[
          { lbl: 'Item', w: 80 },
          { lbl: 'Scale Mean if Item Deleted', w: 140 },
          { lbl: 'Scale Variance if Item Deleted', w: 140 },
          { lbl: 'Corrected Item-Total Correlation', w: 150 },
          { lbl: "Cronbach's α if Item Deleted", w: 150 },
        ].map((h, i, arr) => {
          const x = arr.slice(0, i).reduce((acc, c) => acc + c.w, 0);
          return (
            <g key={i}>
              <rect x={x} y="0" width={h.w} height="44" fill="#0A2E5D" fillOpacity=".08" stroke="#E2E8F0"/>
              <text x={x + h.w / 2} y="18" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
                {h.lbl.length > 28 ? h.lbl.slice(0, 28) : h.lbl}
              </text>
              {h.lbl.length > 28 && (
                <text x={x + h.w / 2} y="32" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
                  {h.lbl.slice(28)}
                </text>
              )}
            </g>
          );
        })}

        {/* Data rows */}
        {items.map((it, ri) => (
          <g key={it.name}>
            {[
              { val: it.name, w: 80,  align: 'start', bold: true },
              { val: it.sm,   w: 140, align: 'middle' },
              { val: it.sv,   w: 140, align: 'middle' },
              { val: it.citc, w: 150, align: 'middle', highlight: it.problem },
              { val: it.alpha, w: 150, align: 'middle', highlight: it.problem },
            ].map((cell, ci, arr) => {
              const x = arr.slice(0, ci).reduce((acc, c) => acc + c.w, 0);
              return (
                <g key={ci}>
                  <rect x={x} y={44 + ri * 32} width={cell.w} height="32"
                    fill={cell.highlight ? '#FEE2E2' : ri % 2 ? '#F8FAFC' : '#fff'}
                    stroke="#E2E8F0" strokeWidth=".5"/>
                  <text x={cell.align === 'middle' ? x + cell.w / 2 : x + 14}
                    y={44 + ri * 32 + 20}
                    fontSize="11"
                    fill={cell.highlight ? '#DC2626' : '#0A2E5D'}
                    fontWeight={cell.bold || cell.highlight ? 700 : 400}
                    textAnchor={cell.align}>
                    {typeof cell.val === 'number' ? cell.val.toFixed(2) : cell.val}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </g>

      {/* Problem annotation */}
      <g>
        <line x1="660" y1="184" x2="630" y2="184" stroke="#DC2626" strokeWidth="1.5"/>
        <text x="670" y="180" fontSize="10" fill="#DC2626" fontWeight="700" display="none">!</text>
      </g>
    </svg>
  );
}

/* ── Reverse-coding diagram ── */
export function ReverseCoding() {
  return (
    <svg viewBox="0 0 720 240" className="w-full h-auto">
      <rect width="720" height="240" fill="#fff"/>

      {/* Title */}
      <text x="360" y="22" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Reverse-coding a negatively-worded item
      </text>

      {/* Original item */}
      <g transform="translate(20, 50)">
        <rect width="320" height="170" rx="6" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2"/>
        <text x="160" y="22" fontSize="11" fill="#DC2626" textAnchor="middle" fontWeight="700">
          BEFORE reverse-coding
        </text>
        <text x="160" y="42" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontStyle="italic">
          "My supervisor IGNORES my concerns"
        </text>
        <text x="20" y="68" fontSize="10" fill="#0A2E5D" fontWeight="700">Original coding:</text>
        {[
          { v: 1, l: 'Strongly disagree', y: 84 },
          { v: 2, l: 'Disagree',          y: 100 },
          { v: 3, l: 'Neutral',           y: 116 },
          { v: 4, l: 'Agree',             y: 132 },
          { v: 5, l: 'Strongly agree',    y: 148 },
        ].map(opt => (
          <g key={opt.v}>
            <text x="30" y={opt.y} fontSize="10" fill="#0A2E5D" fontFamily="monospace">{opt.v}</text>
            <text x="48" y={opt.y} fontSize="10" fill="#0A2E5D">= {opt.l}</text>
          </g>
        ))}
        <text x="20" y="166" fontSize="9" fill="#DC2626" fontWeight="700">High score = BAD supervisor 😞</text>
      </g>

      {/* Arrow */}
      <g transform="translate(360, 130)">
        <text x="0" y="0" fontSize="22" fill="#10B981" fontWeight="700">➜</text>
        <text x="2" y="-22" fontSize="10" fill="#10B981" fontWeight="700">Recode:</text>
        <text x="2" y="22" fontSize="10" fill="#10B981">1→5, 2→4,</text>
        <text x="2" y="36" fontSize="10" fill="#10B981">3→3, 4→2, 5→1</text>
      </g>

      {/* Reversed item */}
      <g transform="translate(400, 50)">
        <rect width="300" height="170" rx="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="2"/>
        <text x="150" y="22" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">
          AFTER reverse-coding (sa_R)
        </text>
        <text x="150" y="42" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontStyle="italic">
          (interpretation flipped)
        </text>
        <text x="20" y="68" fontSize="10" fill="#0A2E5D" fontWeight="700">New coding:</text>
        {[
          { v: 5, l: 'Strongly disagree (was 1)', y: 84 },
          { v: 4, l: 'Disagree (was 2)',          y: 100 },
          { v: 3, l: 'Neutral (was 3)',           y: 116 },
          { v: 2, l: 'Agree (was 4)',             y: 132 },
          { v: 1, l: 'Strongly agree (was 5)',    y: 148 },
        ].map(opt => (
          <g key={opt.v}>
            <text x="30" y={opt.y} fontSize="10" fill="#0A2E5D" fontFamily="monospace">{opt.v}</text>
            <text x="48" y={opt.y} fontSize="10" fill="#0A2E5D">= {opt.l}</text>
          </g>
        ))}
        <text x="20" y="166" fontSize="9" fill="#10B981" fontWeight="700">High score now = GOOD supervisor 😊</text>
      </g>
    </svg>
  );
}

/* ── Split-half logic diagram ── */
export function SplitHalfLogic() {
  return (
    <svg viewBox="0 0 720 260" className="w-full h-auto">
      <rect width="720" height="260" fill="#fff"/>
      <text x="360" y="22" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Split-half reliability: divide and correlate
      </text>

      {/* Original 10 items */}
      <g transform="translate(20, 50)">
        <text x="0" y="14" fontSize="10" fill="#0A2E5D" fontWeight="700">Original 10-item scale:</text>
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={i}>
            <rect x={i * 60} y="24" width="50" height="28" rx="4" fill="#0A2E5D" opacity=".8"/>
            <text x={i * 60 + 25} y="42" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">sa_{i + 1}</text>
          </g>
        ))}
      </g>

      {/* Split arrows */}
      <line x1="160" y1="105" x2="160" y2="135" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#aSplit)"/>
      <line x1="490" y1="105" x2="490" y2="135" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#aSplit)"/>

      {/* Half A (odd) */}
      <g transform="translate(20, 150)">
        <text x="150" y="14" fontSize="11" fill="#D4AF37" textAnchor="middle" fontWeight="700">
          Half A (odd items): sa_1, sa_3, sa_5, sa_7, sa_9
        </text>
        {[1, 3, 5, 7, 9].map((n, i) => (
          <g key={n}>
            <rect x={i * 62} y="24" width="52" height="28" rx="4" fill="#D4AF37" opacity=".85"/>
            <text x={i * 62 + 26} y="42" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">sa_{n}</text>
          </g>
        ))}
        <text x="150" y="76" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontStyle="italic">Sum → Total A</text>
      </g>

      {/* Half B (even) */}
      <g transform="translate(380, 150)">
        <text x="150" y="14" fontSize="11" fill="#2C599E" textAnchor="middle" fontWeight="700">
          Half B (even items): sa_2, sa_4, sa_6, sa_8, sa_10
        </text>
        {[2, 4, 6, 8, 10].map((n, i) => (
          <g key={n}>
            <rect x={i * 62} y="24" width="52" height="28" rx="4" fill="#2C599E" opacity=".85"/>
            <text x={i * 62 + 26} y="42" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">sa_{n}</text>
          </g>
        ))}
        <text x="150" y="76" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontStyle="italic">Sum → Total B</text>
      </g>

      {/* Correlation arrow */}
      <line x1="170" y1="240" x2="530" y2="240" stroke="#10B981" strokeWidth="2"/>
      <text x="360" y="234" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">
        Correlate Total A with Total B → split-half reliability
      </text>

      <defs>
        <marker id="aSplit" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#D4AF37"/>
        </marker>
      </defs>
    </svg>
  );
}

/* ── What reliability is — a measurement analogy ── */
export function ReliabilityAnalogy() {
  return (
    <svg viewBox="0 0 720 220" className="w-full h-auto">
      <rect width="720" height="220" fill="#fff"/>
      <text x="360" y="22" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        A reliable scale measures the same construct, the same way, every time
      </text>

      {/* Three scenarios */}
      {[
        { x: 20,  title: 'High reliability',         desc: 'All 8 items point the same way',                   color: '#10B981', arrows: 'aligned' },
        { x: 260, title: 'Medium reliability',       desc: 'Most items aligned, some noisy',                   color: '#D4AF37', arrows: 'mixed' },
        { x: 500, title: 'Low reliability',          desc: 'Items point all over the place',                   color: '#DC2626', arrows: 'scattered' },
      ].map((s, i) => (
        <g key={i} transform={`translate(${s.x}, 50)`}>
          <rect width="200" height="160" rx="8" fill="#FAF7EF" stroke={s.color} strokeWidth="2"/>
          <text x="100" y="22" fontSize="11" fill={s.color} textAnchor="middle" fontWeight="700">{s.title}</text>

          {/* Circle of arrows */}
          <g transform="translate(100, 90)">
            {Array.from({ length: 8 }).map((_, ai) => {
              const angle = (ai / 8) * Math.PI * 2;
              let direction;
              if (s.arrows === 'aligned') {
                direction = -Math.PI / 2; // all pointing up
              } else if (s.arrows === 'mixed') {
                direction = ai < 6 ? -Math.PI / 2 : Math.random() * Math.PI * 2;
              } else {
                direction = (ai * 73 + 19) % (Math.PI * 2); // pseudo-random per-item
              }
              const x1 = Math.cos(angle) * 25;
              const y1 = Math.sin(angle) * 25;
              const x2 = x1 + Math.cos(direction) * 25;
              const y2 = y1 + Math.sin(direction) * 25;
              return (
                <line key={ai} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={s.color} strokeWidth="2"
                  markerEnd={`url(#arrowRel${i})`}/>
              );
            })}
          </g>

          <text x="100" y="150" fontSize="9" fill="#0A2E5D" textAnchor="middle">{s.desc}</text>
        </g>
      ))}

      <defs>
        {[0, 1, 2].map(i => (
          <marker key={i} id={`arrowRel${i}`} viewBox="0 0 10 10" refX="5" refY="5"
            markerWidth="4" markerHeight="4" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={['#10B981', '#D4AF37', '#DC2626'][i]}/>
          </marker>
        ))}
      </defs>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CORRELATION — additional lesson illustrations (Spearman, Partial, Matrices)
   ════════════════════════════════════════════════════════════════════ */

/* ── Spearman: raw values vs ranks ── */
export function SpearmanRanks() {
  const data = [
    { name: 'Wanjiku', x: 8,  y: 65, xr: 2, yr: 3 },
    { name: 'Otieno',  x: 12, y: 78, xr: 4, yr: 5 },
    { name: 'Achieng', x: 5,  y: 52, xr: 1, yr: 1 },
    { name: 'Kamau',   x: 15, y: 88, xr: 5, yr: 6 },
    { name: 'Mwende',  x: 10, y: 72, xr: 3, yr: 4 },
    { name: 'Hassan',  x: 18, y: 58, xr: 6, yr: 2 },
  ];
  return (
    <svg viewBox="0 0 720 280" className="w-full h-auto">
      <rect width="720" height="280" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Spearman works on RANKS, not raw values
      </text>

      {/* Raw values table */}
      <g transform="translate(20, 40)">
        <text x="160" y="14" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Raw values</text>
        <rect x="0" y="22" width="320" height="200" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".2"/>
        {/* Headers */}
        {['Pupil', 'Study hrs', 'Exam %'].map((h, i) => (
          <g key={h}>
            <rect x={i * 107} y="22" width={i === 0 ? 106 : 107} height="26" fill="#0A2E5D" fillOpacity=".08"/>
            <text x={i * 107 + 53} y="40" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{h}</text>
          </g>
        ))}
        {/* Data */}
        {data.map((row, ri) => (
          <g key={ri}>
            <rect x="0"   y={48 + ri * 28} width="106" height="28" fill="#fff" stroke="#E2E8F0" strokeWidth=".5"/>
            <text x="53"  y={48 + ri * 28 + 18} fontSize="11" fill="#0A2E5D" textAnchor="middle">{row.name}</text>
            <rect x="106" y={48 + ri * 28} width="107" height="28" fill="#fff" stroke="#E2E8F0" strokeWidth=".5"/>
            <text x="159" y={48 + ri * 28 + 18} fontSize="11" fill="#0A2E5D" textAnchor="middle">{row.x}</text>
            <rect x="213" y={48 + ri * 28} width="107" height="28" fill="#fff" stroke="#E2E8F0" strokeWidth=".5"/>
            <text x="266" y={48 + ri * 28 + 18} fontSize="11" fill="#0A2E5D" textAnchor="middle">{row.y}</text>
          </g>
        ))}
      </g>

      {/* Arrow */}
      <g transform="translate(355, 130)">
        <text x="0" y="6" fontSize="22" fill="#10B981" fontWeight="700">➜</text>
        <text x="-2" y="-12" fontSize="9" fill="#10B981" fontWeight="700">Convert to</text>
        <text x="-2" y="0" fontSize="9" fill="#10B981" fontWeight="700">RANKS</text>
        <text x="-2" y="32" fontSize="9" fill="#10B981" fontWeight="700">(1=lowest,</text>
        <text x="-2" y="44" fontSize="9" fill="#10B981" fontWeight="700">6=highest)</text>
      </g>

      {/* Ranks table */}
      <g transform="translate(400, 40)">
        <text x="160" y="14" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">Ranks (what Spearman uses)</text>
        <rect x="0" y="22" width="320" height="200" fill="#D1FAE5" stroke="#10B981" strokeOpacity=".4"/>
        {['Pupil', 'Rank hrs', 'Rank %'].map((h, i) => (
          <g key={h}>
            <rect x={i * 107} y="22" width={i === 0 ? 106 : 107} height="26" fill="#10B981" fillOpacity=".15"/>
            <text x={i * 107 + 53} y="40" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{h}</text>
          </g>
        ))}
        {data.map((row, ri) => (
          <g key={ri}>
            <rect x="0"   y={48 + ri * 28} width="106" height="28" fill="#fff" stroke="#10B981" strokeOpacity=".3" strokeWidth=".5"/>
            <text x="53"  y={48 + ri * 28 + 18} fontSize="11" fill="#0A2E5D" textAnchor="middle">{row.name}</text>
            <rect x="106" y={48 + ri * 28} width="107" height="28" fill="#fff" stroke="#10B981" strokeOpacity=".3" strokeWidth=".5"/>
            <text x="159" y={48 + ri * 28 + 18} fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">{row.xr}</text>
            <rect x="213" y={48 + ri * 28} width="107" height="28" fill="#fff" stroke="#10B981" strokeOpacity=".3" strokeWidth=".5"/>
            <text x="266" y={48 + ri * 28 + 18} fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">{row.yr}</text>
          </g>
        ))}
      </g>

      <text x="360" y="260" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontStyle="italic">
        Hassan studied the most (rank 6) but scored only 2nd-lowest — breaks the pattern
      </text>
    </svg>
  );
}

/* ── Partial correlation: Venn diagram of overlapping variance ── */
export function PartialVenn() {
  return (
    <svg viewBox="0 0 720 280" className="w-full h-auto">
      <rect width="720" height="280" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Partial correlation removes the shared variance of a third variable
      </text>

      {/* Without partial — left */}
      <g transform="translate(20, 40)">
        <text x="160" y="14" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
          BEFORE: simple correlation X ↔ Y
        </text>

        {/* Three overlapping circles */}
        <circle cx="100" cy="140" r="55" fill="#0A2E5D" fillOpacity=".35" stroke="#0A2E5D" strokeWidth="1.5"/>
        <circle cx="200" cy="140" r="55" fill="#D4AF37" fillOpacity=".4" stroke="#D4AF37" strokeWidth="1.5"/>
        <circle cx="150" cy="80" r="40" fill="#DC2626" fillOpacity=".35" stroke="#DC2626" strokeWidth="1.5"/>

        <text x="60"  y="148" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">X</text>
        <text x="240" y="148" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Y</text>
        <text x="150" y="62" fontSize="11" fill="#DC2626" textAnchor="middle" fontWeight="700">Z (lurker)</text>

        <text x="160" y="220" fontSize="10" fill="#0A2E5D" textAnchor="middle">
          Z\'s shadow inflates the X↔Y overlap.
        </text>
        <text x="160" y="234" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontStyle="italic">
          Pearson r looks larger than the "true" link.
        </text>
      </g>

      {/* With partial — right */}
      <g transform="translate(380, 40)">
        <text x="160" y="14" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">
          AFTER: partial correlation X ↔ Y (controlling Z)
        </text>

        {/* Same circles but Z is greyed and overlap shaded out */}
        <circle cx="100" cy="140" r="55" fill="#0A2E5D" fillOpacity=".35" stroke="#0A2E5D" strokeWidth="1.5"/>
        <circle cx="200" cy="140" r="55" fill="#D4AF37" fillOpacity=".4" stroke="#D4AF37" strokeWidth="1.5"/>
        <circle cx="150" cy="80" r="40" fill="#CBD5E1" fillOpacity=".4" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3"/>
        {/* Strike-through Z overlap region — approximate */}
        <line x1="120" y1="105" x2="180" y2="105" stroke="#DC2626" strokeWidth="2"/>

        <text x="60"  y="148" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">X</text>
        <text x="240" y="148" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Y</text>
        <text x="150" y="62" fontSize="11" fill="#94A3B8" textAnchor="middle" fontWeight="700" fontStyle="italic">Z removed</text>

        <text x="160" y="220" fontSize="10" fill="#10B981" textAnchor="middle">
          Z\'s overlap stripped from BOTH X and Y.
        </text>
        <text x="160" y="234" fontSize="10" fill="#10B981" textAnchor="middle" fontStyle="italic">
          What remains is the "true" X↔Y link.
        </text>
      </g>
    </svg>
  );
}

/* ── A clean, annotated 4x4 correlation matrix with asterisks ── */
export function CorrelationMatrixAnatomy() {
  const vars = ['Study\nhours', 'Math\nscore', 'Motivation', 'Attendance'];
  const cells = [
    ['1',     '.42**', '.18*',  '.04'],
    ['.42**', '1',     '.31**', '.12'],
    ['.18*',  '.31**', '1',     '.27**'],
    ['.04',   '.12',   '.27**', '1'],
  ];
  return (
    <svg viewBox="0 0 700 380" className="w-full h-auto">
      <rect width="700" height="380" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".15"/>
      <rect width="700" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Correlations</text>

      {/* corner cell */}
      <rect x="20" y="44" width="120" height="80" fill="#FBF6E5"/>
      <text x="80" y="80" fontSize="10" fill="#0A2E5D" textAnchor="middle">Pearson Correlation</text>
      <text x="80" y="98" fontSize="10" fill="#0A2E5D" textAnchor="middle">Sig. (2-tailed)</text>
      <text x="80" y="116" fontSize="10" fill="#0A2E5D" textAnchor="middle">N</text>

      {/* Header row */}
      {vars.map((v, ci) => (
        <g key={ci}>
          <rect x={140 + ci * 130} y="44" width="130" height="80" fill="#0A2E5D" fillOpacity=".08" stroke="#E2E8F0"/>
          {v.split('\n').map((line, li) => (
            <text key={li} x={140 + ci * 130 + 65} y={76 + li * 14} fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
              {line}
            </text>
          ))}
        </g>
      ))}

      {/* Header column + data rows */}
      {vars.map((rowVar, ri) => (
        <g key={ri}>
          {/* row label */}
          <rect x="20" y={124 + ri * 56} width="120" height="56" fill="#0A2E5D" fillOpacity=".08" stroke="#E2E8F0"/>
          {rowVar.split('\n').map((line, li) => (
            <text key={li} x="80" y={148 + ri * 56 + li * 14} fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
              {line}
            </text>
          ))}

          {/* cells */}
          {cells[ri].map((val, ci) => {
            const isDiag = ri === ci;
            const hasStars = val.includes('*');
            return (
              <g key={ci}>
                <rect x={140 + ci * 130} y={124 + ri * 56} width="130" height="56"
                  fill={isDiag ? '#FBF6E5' : '#fff'} stroke="#E2E8F0" strokeWidth=".5"/>
                <text x={140 + ci * 130 + 65} y={148 + ri * 56} fontSize="14"
                  fill={isDiag ? '#0A2E5D' : hasStars ? '#B8932A' : '#0A2E5D'}
                  fontWeight={isDiag || hasStars ? 700 : 400}
                  textAnchor="middle">{val}</text>
                {!isDiag && (
                  <>
                    <text x={140 + ci * 130 + 65} y={163 + ri * 56} fontSize="9" fill="#64748B" textAnchor="middle">
                      {val === '.42**' ? '.000' :
                       val === '.31**' ? '.001' :
                       val === '.27**' ? '.003' :
                       val === '.18*'  ? '.041' :
                       val === '.12'   ? '.18'  :
                       val === '.04'   ? '.66'  : '.'}
                    </text>
                    <text x={140 + ci * 130 + 65} y={175 + ri * 56} fontSize="9" fill="#64748B" textAnchor="middle">
                      N = {115 - (ri + ci)}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </g>
      ))}

      {/* Legend */}
      <text x="20" y="358" fontSize="10" fill="#64748B" fontStyle="italic">
        ** Correlation is significant at the .01 level (2-tailed).
      </text>
      <text x="20" y="372" fontSize="10" fill="#64748B" fontStyle="italic">
        * Correlation is significant at the .05 level (2-tailed).
      </text>
    </svg>
  );
}

/* ── Correlation matrix with annotations explaining symmetry ── */
export function MatrixSymmetry() {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto">
      <rect width="600" height="320" fill="#fff"/>
      <text x="300" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        A correlation matrix is symmetric — read only ONE triangle
      </text>

      {/* Small 4x4 grid */}
      <g transform="translate(120, 50)">
        {/* Headers */}
        {['', 'A', 'B', 'C', 'D'].map((h, i) => (
          <g key={i}>
            <rect x={i * 60} y="0" width="60" height="40" fill="#0A2E5D" fillOpacity=".08" stroke="#E2E8F0"/>
            <text x={i * 60 + 30} y="25" fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{h}</text>
          </g>
        ))}

        {/* Row labels and cells */}
        {['A', 'B', 'C', 'D'].map((row, ri) => (
          <g key={ri}>
            <rect x="0" y={40 + ri * 40} width="60" height="40" fill="#0A2E5D" fillOpacity=".08" stroke="#E2E8F0"/>
            <text x="30" y={65 + ri * 40} fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{row}</text>

            {[0, 1, 2, 3].map((ci) => {
              const isDiag = ri === ci;
              const isUpper = ci > ri;
              const isLower = ci < ri;
              return (
                <g key={ci}>
                  <rect x={60 + ci * 60} y={40 + ri * 40} width="60" height="40"
                    fill={isDiag ? '#FBF6E5' : isUpper ? '#D1FAE5' : '#FEE2E2'}
                    stroke="#E2E8F0" strokeWidth=".5"/>
                  <text x={60 + ci * 60 + 30} y={65 + ri * 40} fontSize="11"
                    fill="#0A2E5D" textAnchor="middle" fontWeight={isDiag ? 700 : 400}>
                    {isDiag ? '1.00' : isUpper ? `r${row}${['A','B','C','D'][ci]}` : `r${['A','B','C','D'][ci]}${row}`}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </g>

      {/* Annotations */}
      <g fontSize="10" fill="#0A2E5D" fontWeight="700">
        <line x1="380" y1="100" x2="440" y2="100" stroke="#10B981"/>
        <text x="446" y="103" fill="#10B981">Upper triangle — read these</text>

        <line x1="380" y1="180" x2="440" y2="180" stroke="#DC2626"/>
        <text x="446" y="183" fill="#DC2626">Lower triangle — same numbers (redundant)</text>

        <line x1="100" y1="60" x2="80" y2="60" stroke="#D4AF37"/>
        <text x="74" y="63" textAnchor="end" fill="#B8932A">Diagonal — always 1.00</text>
      </g>

      <text x="300" y="296" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontStyle="italic">
        Because the correlation between A and B = correlation between B and A,
      </text>
      <text x="300" y="310" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontStyle="italic">
        you only need to read one half of the matrix in your write-up.
      </text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════
   REGRESSION ANALYSIS — illustrations
   ════════════════════════════════════════════════════════════════════ */

/* ── Regression line of best fit with residuals shown as vertical drops ── */
export function RegressionLineResiduals() {
  // Sample points and the line y = 0.5x + 40 (approx)
  const pts = [
    { x: 50,  y: 70  }, { x: 80,  y: 78  }, { x: 110, y: 90  }, { x: 140, y: 105 },
    { x: 170, y: 100 }, { x: 200, y: 130 }, { x: 230, y: 145 }, { x: 260, y: 140 },
    { x: 290, y: 165 }, { x: 320, y: 170 },
  ];
  const line = (x) => 60 + (x - 40) * 0.42; // line of best fit

  return (
    <svg viewBox="0 0 380 260" className="w-full h-auto">
      <rect width="380" height="260" rx="6" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>
      {/* axes */}
      <line x1="30" y1="220" x2="360" y2="220" stroke="#0A2E5D" strokeOpacity=".5"/>
      <line x1="30" y1="20"  x2="30"  y2="220" stroke="#0A2E5D" strokeOpacity=".5"/>
      <text x="195" y="244" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="600">X (predictor)</text>
      <text x="14" y="120" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="600" transform="rotate(-90, 14, 120)">Y (outcome)</text>

      {/* line of best fit */}
      <line x1="40" y1={220 - line(40) + 20} x2="350" y2={220 - line(350) + 20}
        stroke="#D4AF37" strokeWidth="2.5"/>

      {/* points + their residual vertical lines */}
      {pts.map((p, i) => {
        const py = 220 - p.y;
        const ly = 220 - line(p.x) + 20;
        return (
          <g key={i}>
            <line x1={p.x} y1={py} x2={p.x} y2={ly}
              stroke="#DC2626" strokeWidth="1.2" strokeDasharray="2 2"/>
            <circle cx={p.x} cy={py} r="4.5" fill="#0A2E5D" opacity=".8"/>
          </g>
        );
      })}

      {/* Annotations */}
      <text x="180" y="34" fontSize="10" fill="#B8932A" textAnchor="middle" fontWeight="700">
        Line of best fit (regression line)
      </text>
      <text x="320" y="55" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">
        Red dashed = residuals
      </text>
      <text x="320" y="68" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">
        (distance from point to line)
      </text>
      <text x="180" y="200" fontSize="9" fill="#10B981" textAnchor="middle" fontStyle="italic">
        The line minimises the SUM of squared residuals
      </text>
    </svg>
  );
}

/* ── Linear Regression dialog ── */
export function LinearRegressionDialog() {
  return (
    <svg viewBox="0 0 540 380" className="w-full h-auto">
      <rect width="540" height="380" rx="6" fill="#F4F4F5" stroke="#0A2E5D" strokeWidth="1.5"/>
      <rect width="540" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Linear Regression</text>

      {/* Variables list */}
      <text x="14" y="54" fontSize="10" fill="#0A2E5D" fontWeight="700">Variables in dataset:</text>
      <rect x="14" y="60" width="150" height="240" fill="#fff" stroke="#94A3B8"/>
      {['id','gender','age_yrs','study_hrs','motivation','attendance','math_score','english_score'].map((v, i) => (
        <text key={v} x="22" y={80 + i * 22} fontSize="10" fill="#0A2E5D">📊 {v}</text>
      ))}

      {/* Dependent */}
      <text x="180" y="54" fontSize="10" fill="#0A2E5D" fontWeight="700">Dependent:</text>
      <rect x="180" y="60" width="240" height="32" fill="#fff" stroke="#94A3B8"/>
      <text x="190" y="82" fontSize="11" fill="#0A2E5D" fontWeight="600">📊 math_score</text>

      {/* Block / Independents */}
      <text x="180" y="116" fontSize="10" fill="#0A2E5D" fontWeight="700">Block 1 of 1   Previous   Next</text>
      <text x="180" y="138" fontSize="10" fill="#0A2E5D" fontWeight="700">Independent(s):</text>
      <rect x="180" y="144" width="240" height="120" fill="#fff" stroke="#94A3B8"/>
      <text x="190" y="164" fontSize="11" fill="#0A2E5D" fontWeight="600">📊 study_hrs</text>
      <text x="190" y="184" fontSize="11" fill="#0A2E5D" fontWeight="600">📊 motivation</text>
      <text x="190" y="204" fontSize="11" fill="#0A2E5D" fontWeight="600">📊 attendance</text>

      {/* Method */}
      <text x="180" y="284" fontSize="10" fill="#0A2E5D" fontWeight="700">Method:</text>
      <rect x="232" y="272" width="120" height="22" fill="#fff" stroke="#94A3B8"/>
      <text x="240" y="287" fontSize="11" fill="#0A2E5D">Enter ▾</text>

      {/* Right column - buttons */}
      <rect x="430" y="60"  width="100" height="22" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="480" y="74" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Statistics…</text>

      <rect x="430" y="86"  width="100" height="22" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="480" y="100" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Plots…</text>

      <rect x="430" y="112" width="100" height="22" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="480" y="126" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Save…</text>

      <rect x="430" y="138" width="100" height="22" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="480" y="152" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Options…</text>

      {/* OK / Cancel */}
      <rect x="380" y="338" width="50" height="26" rx="3" fill="#0A2E5D"/>
      <text x="405" y="355" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="436" y="338" width="56" height="26" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="464" y="355" fontSize="11" fill="#0A2E5D" textAnchor="middle">Cancel</text>

      {/* Annotations */}
      <g>
        <circle cx="425" cy="76" r="11" fill="#DC2626"/>
        <text x="425" y="80" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">!</text>
        <text x="500" y="190" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">Statistics → tick</text>
        <text x="500" y="202" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">Estimates, 95% CI,</text>
        <text x="500" y="214" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">Model fit,</text>
        <text x="500" y="226" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">Collinearity</text>
        <text x="500" y="238" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">diagnostics</text>
      </g>
    </svg>
  );
}

/* ── Simple regression Model Summary + ANOVA + Coefficients output ── */
export function RegressionOutput() {
  return (
    <svg viewBox="0 0 700 380" className="w-full h-auto">
      <rect width="700" height="380" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".15"/>
      <rect width="700" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Output — Linear Regression</text>

      {/* Model Summary table */}
      <text x="14" y="50" fontSize="11" fill="#0A2E5D" fontWeight="700">Model Summary</text>
      <g transform="translate(0,58)">
        {['Model','R','R Square','Adjusted R Square','Std. Error of the Estimate'].map((h, i, arr) => {
          const widths = [80, 100, 110, 150, 200];
          const x = widths.slice(0, i).reduce((acc, v) => acc + v, 14);
          return (
            <g key={i}>
              <rect x={x} y="0" width={widths[i]} height="28" fill="#0A2E5D" fillOpacity=".08" stroke="#E2E8F0"/>
              <text x={x + widths[i] / 2} y="18" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{h}</text>
            </g>
          );
        })}
        {[['1','.485','.235','.222','9.84']].map((row, ri) => row.map((v, ci, arr2) => {
          const widths = [80, 100, 110, 150, 200];
          const x = widths.slice(0, ci).reduce((acc, w) => acc + w, 14);
          return (
            <g key={ci}>
              <rect x={x} y="28" width={widths[ci]} height="28" fill="#fff" stroke="#E2E8F0"/>
              <text x={x + widths[ci] / 2} y="46" fontSize="11"
                fill={ci === 2 ? '#B8932A' : '#0A2E5D'}
                fontWeight={ci === 2 ? 700 : 400}
                textAnchor="middle">{v}</text>
            </g>
          );
        }))}
      </g>

      {/* ANOVA table */}
      <text x="14" y="135" fontSize="11" fill="#0A2E5D" fontWeight="700">ANOVA</text>
      <g transform="translate(0,143)">
        {['Model','Sum of Squares','df','Mean Square','F','Sig.'].map((h, i) => {
          const widths = [120, 130, 60, 130, 80, 100];
          const x = widths.slice(0, i).reduce((acc, w) => acc + w, 14);
          return (
            <g key={i}>
              <rect x={x} y="0" width={widths[i]} height="28" fill="#0A2E5D" fillOpacity=".08" stroke="#E2E8F0"/>
              <text x={x + widths[i] / 2} y="18" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{h}</text>
            </g>
          );
        })}
        {[
          ['Regression', '3422.5',  '3', '1140.8', '11.78', '.000'],
          ['Residual',   '11148.2', '115', '96.9',  '',     ''],
          ['Total',      '14570.7', '118', '',      '',     ''],
        ].map((row, ri) => row.map((v, ci) => {
          const widths = [120, 130, 60, 130, 80, 100];
          const x = widths.slice(0, ci).reduce((acc, w) => acc + w, 14);
          const isF = ci === 4 || ci === 5;
          return (
            <g key={ci}>
              <rect x={x} y={28 + ri * 24} width={widths[ci]} height="24"
                fill={ri === 0 && isF ? '#FBF6E5' : '#fff'} stroke="#E2E8F0"/>
              <text x={x + widths[ci] / 2} y={28 + ri * 24 + 16} fontSize="11"
                fill={ri === 0 && isF ? '#B8932A' : '#0A2E5D'}
                fontWeight={ri === 0 && isF ? 700 : 400}
                textAnchor="middle">{v}</text>
            </g>
          );
        }))}
      </g>

      {/* Coefficients table */}
      <text x="14" y="245" fontSize="11" fill="#0A2E5D" fontWeight="700">Coefficients</text>
      <g transform="translate(0,253)">
        {['Predictor','B','Std. Error','β (Beta)','t','Sig.'].map((h, i) => {
          const widths = [130, 100, 110, 100, 80, 100];
          const x = widths.slice(0, i).reduce((acc, w) => acc + w, 14);
          return (
            <g key={i}>
              <rect x={x} y="0" width={widths[i]} height="28" fill="#0A2E5D" fillOpacity=".08" stroke="#E2E8F0"/>
              <text x={x + widths[i] / 2} y="18" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{h}</text>
            </g>
          );
        })}
        {[
          ['(Constant)',   '52.40', '5.82', '',      '9.00', '.000'],
          ['study_hrs',    '0.85',  '0.34', '.21',   '2.50', '.014'],
          ['motivation',   '2.10',  '0.55', '.32',   '3.82', '.000'],
          ['attendance',   '0.18',  '0.09', '.16',   '2.05', '.043'],
        ].map((row, ri) => row.map((v, ci) => {
          const widths = [130, 100, 110, 100, 80, 100];
          const x = widths.slice(0, ci).reduce((acc, w) => acc + w, 14);
          const isSig = ci === 5 && ri > 0;
          return (
            <g key={ci}>
              <rect x={x} y={28 + ri * 24} width={widths[ci]} height="24"
                fill={isSig ? '#FBF6E5' : '#fff'} stroke="#E2E8F0"/>
              <text x={x + widths[ci] / 2} y={28 + ri * 24 + 16} fontSize="11"
                fill={isSig ? '#B8932A' : '#0A2E5D'}
                fontWeight={isSig || ci === 0 ? 700 : 400}
                textAnchor={ci === 0 ? 'middle' : 'middle'}>{v}</text>
            </g>
          );
        }))}
      </g>
    </svg>
  );
}

/* ── Residuals scatter plot: homoscedastic vs heteroscedastic ── */
export function ResidualsHomoVsHetero() {
  // Random-looking residuals around 0 for homoscedastic; funnel shape for hetero
  const rnd = (s) => ((s * 9301 + 49297) % 233280) / 233280;
  const homo = Array.from({ length: 50 }, (_, i) => {
    const x = 20 + i * 5;
    const y = 100 + (rnd(i + 1) - 0.5) * 80;
    return [x, y];
  });
  const hetero = Array.from({ length: 50 }, (_, i) => {
    const x = 20 + i * 5;
    const spread = 10 + (i / 50) * 80;  // increasing spread
    const y = 100 + (rnd(i + 5) - 0.5) * spread;
    return [x, y];
  });

  return (
    <svg viewBox="0 0 720 240" className="w-full h-auto">
      <rect width="720" height="240" fill="#fff"/>

      {/* Homoscedastic — left */}
      <g transform="translate(0,0)">
        <rect width="340" height="240" rx="6" fill="#FAF7EF" stroke="#10B981" strokeWidth="2"/>
        <text x="170" y="18" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">
          ✓ Homoscedastic — even cloud
        </text>
        <line x1="20" y1="100" x2="320" y2="100" stroke="#0A2E5D" strokeWidth="1" strokeDasharray="3 3"/>
        <line x1="20" y1="40" x2="20" y2="200" stroke="#0A2E5D" strokeOpacity=".4"/>
        <line x1="20" y1="200" x2="320" y2="200" stroke="#0A2E5D" strokeOpacity=".4"/>
        {homo.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#0A2E5D" opacity=".7"/>)}
        <text x="170" y="222" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontStyle="italic">Spread is constant across predicted values</text>
      </g>

      {/* Heteroscedastic — right */}
      <g transform="translate(380,0)">
        <rect width="340" height="240" rx="6" fill="#FAF7EF" stroke="#DC2626" strokeWidth="2"/>
        <text x="170" y="18" fontSize="11" fill="#DC2626" textAnchor="middle" fontWeight="700">
          ✗ Heteroscedastic — funnel shape
        </text>
        <line x1="20" y1="100" x2="320" y2="100" stroke="#0A2E5D" strokeWidth="1" strokeDasharray="3 3"/>
        <line x1="20" y1="40" x2="20" y2="200" stroke="#0A2E5D" strokeOpacity=".4"/>
        <line x1="20" y1="200" x2="320" y2="200" stroke="#0A2E5D" strokeOpacity=".4"/>
        {hetero.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#0A2E5D" opacity=".7"/>)}
        {/* Funnel outline */}
        <path d="M 20 100 L 320 50 L 320 150 Z" fill="#DC2626" fillOpacity=".08" stroke="#DC2626" strokeOpacity=".4" strokeDasharray="3 3"/>
        <text x="170" y="222" fontSize="9" fill="#DC2626" textAnchor="middle" fontStyle="italic">Spread fans out — assumption violated</text>
      </g>
    </svg>
  );
}

/* ── Multicollinearity Venn diagram ── */
export function MulticollinearityVenn() {
  return (
    <svg viewBox="0 0 720 260" className="w-full h-auto">
      <rect width="720" height="260" fill="#fff"/>
      <text x="360" y="22" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Multicollinearity — when predictors overlap too much
      </text>

      {/* Low collinearity — left */}
      <g transform="translate(0,40)">
        <rect width="340" height="220" rx="6" fill="#FAF7EF" stroke="#10B981" strokeWidth="2"/>
        <text x="170" y="18" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">
          ✓ Low collinearity — predictors mostly independent
        </text>
        {/* Y outcome circle */}
        <circle cx="170" cy="120" r="65" fill="#D4AF37" fillOpacity=".35" stroke="#D4AF37" strokeWidth="1.5"/>
        <text x="170" y="60" fontSize="11" fill="#B8932A" textAnchor="middle" fontWeight="700">Y</text>
        {/* X1 and X2 circles - mostly separate */}
        <circle cx="105" cy="155" r="35" fill="#0A2E5D" fillOpacity=".4" stroke="#0A2E5D" strokeWidth="1.5"/>
        <circle cx="235" cy="155" r="35" fill="#2C599E" fillOpacity=".4" stroke="#2C599E" strokeWidth="1.5"/>
        <text x="90"  y="160" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">X₁</text>
        <text x="250" y="160" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">X₂</text>
        <text x="170" y="208" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontStyle="italic">VIF &lt; 5 · coefficients stable</text>
      </g>

      {/* High collinearity — right */}
      <g transform="translate(380,40)">
        <rect width="340" height="220" rx="6" fill="#FAF7EF" stroke="#DC2626" strokeWidth="2"/>
        <text x="170" y="18" fontSize="11" fill="#DC2626" textAnchor="middle" fontWeight="700">
          ✗ High collinearity — predictors overlap heavily
        </text>
        {/* Y outcome circle */}
        <circle cx="170" cy="120" r="65" fill="#D4AF37" fillOpacity=".35" stroke="#D4AF37" strokeWidth="1.5"/>
        <text x="170" y="60" fontSize="11" fill="#B8932A" textAnchor="middle" fontWeight="700">Y</text>
        {/* X1 and X2 circles - almost overlapping */}
        <circle cx="150" cy="155" r="40" fill="#0A2E5D" fillOpacity=".4" stroke="#0A2E5D" strokeWidth="1.5"/>
        <circle cx="190" cy="155" r="40" fill="#2C599E" fillOpacity=".4" stroke="#2C599E" strokeWidth="1.5"/>
        <text x="125" y="160" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">X₁</text>
        <text x="215" y="160" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">X₂</text>
        <text x="170" y="208" fontSize="9" fill="#DC2626" textAnchor="middle" fontStyle="italic">VIF &gt; 10 · coefficients unstable</text>
      </g>
    </svg>
  );
}

/* ── Logistic regression S-curve ── */
export function LogisticCurve() {
  // Generate logistic curve y = 1/(1+exp(-(x-0)))
  const xs = Array.from({ length: 100 }, (_, i) => -5 + i * 0.1);
  const pts = xs.map(x => {
    const px = 50 + (x + 5) * 30;
    const py = 200 - (1 / (1 + Math.exp(-x))) * 160;
    return `${px},${py}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 400 260" className="w-full h-auto">
      <rect width="400" height="260" rx="6" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>

      {/* axes */}
      <line x1="50" y1="220" x2="370" y2="220" stroke="#0A2E5D" strokeOpacity=".5"/>
      <line x1="50" y1="20"  x2="50"  y2="220" stroke="#0A2E5D" strokeOpacity=".5"/>

      {/* probability lines at 0, 0.5, 1 */}
      <line x1="50" y1="200" x2="370" y2="200" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth=".5"/>
      <line x1="50" y1="120" x2="370" y2="120" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth=".5"/>
      <line x1="50" y1="40"  x2="370" y2="40"  stroke="#94A3B8" strokeDasharray="3 3" strokeWidth=".5"/>
      <text x="42" y="204" fontSize="10" fill="#64748B" textAnchor="end">0</text>
      <text x="42" y="124" fontSize="10" fill="#64748B" textAnchor="end">0.5</text>
      <text x="42" y="44"  fontSize="10" fill="#64748B" textAnchor="end">1.0</text>

      {/* S-curve */}
      <polyline points={pts} fill="none" stroke="#D4AF37" strokeWidth="3"/>

      {/* Threshold annotation */}
      <line x1="200" y1="220" x2="200" y2="120" stroke="#DC2626" strokeDasharray="3 3" strokeWidth="1"/>
      <text x="205" y="142" fontSize="9" fill="#DC2626" fontWeight="700">Decision threshold = .50</text>

      {/* labels */}
      <text x="210" y="244" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="600">X (predictor)</text>
      <text x="22" y="120" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="600" transform="rotate(-90, 22, 120)">P(Y = 1)</text>
      <text x="210" y="14" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Logistic regression — predicts a PROBABILITY between 0 and 1
      </text>
    </svg>
  );
}

/* ── Hierarchical regression: blocks of predictors ── */
export function HierarchicalBlocks() {
  return (
    <svg viewBox="0 0 720 260" className="w-full h-auto">
      <rect width="720" height="260" fill="#fff"/>
      <text x="360" y="22" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Hierarchical regression — add predictor BLOCKS in theory-driven order
      </text>

      {/* Three blocks */}
      {[
        { x: 30,  title: 'Block 1 — Demographics', vars: ['gender', 'age', 'county'], r2: 'ΔR² = .04', color: '#2C599E' },
        { x: 270, title: 'Block 2 — Behaviour',    vars: ['study_hrs', 'attendance'],   r2: 'ΔR² = .12**',  color: '#D4AF37' },
        { x: 510, title: 'Block 3 — Psychological', vars: ['motivation', 'self-eff.'], r2: 'ΔR² = .08**',  color: '#10B981' },
      ].map((b, i) => (
        <g key={i} transform={`translate(${b.x}, 60)`}>
          <rect width="180" height="160" rx="8" fill={b.color} fillOpacity=".12" stroke={b.color} strokeWidth="2"/>
          <text x="90" y="22" fontSize="11" fill={b.color} textAnchor="middle" fontWeight="700">{b.title}</text>
          {b.vars.map((v, vi) => (
            <g key={v}>
              <rect x="20" y={40 + vi * 28} width="140" height="22" rx="4" fill="#fff" stroke={b.color} strokeWidth="1"/>
              <text x="90" y={56 + vi * 28} fontSize="11" fill="#0A2E5D" textAnchor="middle">{v}</text>
            </g>
          ))}
          <text x="90" y="148" fontSize="12" fill={b.color} textAnchor="middle" fontWeight="700">{b.r2}</text>
        </g>
      ))}

      {/* Arrows between blocks */}
      {[210, 450].map((x, i) => (
        <line key={i} x1={x} y1="140" x2={x + 60} y2="140" stroke="#94A3B8" strokeWidth="2" markerEnd={`url(#aBlock${i})`}/>
      ))}
      <defs>
        {[0, 1].map(i => (
          <marker key={i} id={`aBlock${i}`} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#94A3B8"/>
          </marker>
        ))}
      </defs>

      <text x="360" y="244" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontStyle="italic">
        Each block\'s ΔR² shows what NEW variance it adds beyond previous blocks
      </text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════
   ANOVA — illustrations
   ════════════════════════════════════════════════════════════════════ */

/* ── ANOVA logic: between-groups vs within-groups variance ── */
export function AnovaLogic() {
  // Three groups, each a small cloud of points around its mean
  const groupMeans = [50, 70, 85];
  const groupColors = ['#0A2E5D', '#D4AF37', '#10B981'];
  const groupNames = ['Method A', 'Method B', 'Method C'];

  return (
    <svg viewBox="0 0 720 280" className="w-full h-auto">
      <rect width="720" height="280" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        ANOVA compares BETWEEN-group variance to WITHIN-group variance
      </text>

      {/* Axes */}
      <line x1="80" y1="240" x2="640" y2="240" stroke="#0A2E5D" strokeOpacity=".5"/>
      <line x1="80" y1="60"  x2="80"  y2="240" stroke="#0A2E5D" strokeOpacity=".5"/>
      <text x="20" y="150" fontSize="11" fill="#0A2E5D" fontWeight="600" textAnchor="middle"
        transform="rotate(-90, 20, 150)">Exam score</text>

      {/* Overall mean line */}
      <line x1="80" y1="170" x2="640" y2="170" stroke="#94A3B8" strokeDasharray="3 3"/>
      <text x="650" y="172" fontSize="9" fill="#64748B">Overall mean (~68)</text>

      {/* For each group: cluster of dots + mean line */}
      {groupMeans.map((m, gi) => {
        const cx = 180 + gi * 160;
        const meanY = 240 - m * 1.7;
        const points = Array.from({ length: 8 }, (_, i) => {
          const seed = (gi * 100 + i) * 9301 % 233280 / 233280;
          return [cx + (seed - 0.5) * 60, meanY + (seed - 0.5) * 50];
        });
        return (
          <g key={gi}>
            {points.map(([x, y], pi) => (
              <circle key={pi} cx={x} cy={y} r="4" fill={groupColors[gi]} opacity=".7"/>
            ))}
            {/* group mean line */}
            <line x1={cx - 50} y1={meanY} x2={cx + 50} y2={meanY}
              stroke={groupColors[gi]} strokeWidth="3"/>
            <text x={cx} y="262" fontSize="10" fill={groupColors[gi]} textAnchor="middle" fontWeight="700">
              {groupNames[gi]}
            </text>
            <text x={cx} y={meanY - 50} fontSize="10" fill={groupColors[gi]} textAnchor="middle" fontWeight="700">
              M = {m}
            </text>
          </g>
        );
      })}

      {/* Annotations */}
      <text x="120" y="100" fontSize="10" fill="#10B981" fontWeight="700">
        BETWEEN-group variance: group means differ from overall mean
      </text>
      <text x="120" y="112" fontSize="10" fill="#10B981" fontWeight="700">
        → How far apart are the colored lines?
      </text>
      <text x="120" y="125" fontSize="10" fill="#DC2626" fontWeight="700">
        WITHIN-group variance: dots scatter around their group mean
      </text>
      <text x="120" y="137" fontSize="10" fill="#DC2626" fontWeight="700">
        → How spread are the dots within each color?
      </text>
      <text x="120" y="152" fontSize="10" fill="#0A2E5D" fontStyle="italic">
        F = Between / Within   (large F = real group differences)
      </text>
    </svg>
  );
}

/* ── One-Way ANOVA dialog ── */
export function OneWayAnovaDialog() {
  return (
    <svg viewBox="0 0 540 380" className="w-full h-auto">
      <rect width="540" height="380" rx="6" fill="#F4F4F5" stroke="#0A2E5D" strokeWidth="1.5"/>
      <rect width="540" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">One-Way ANOVA</text>

      {/* Variables list */}
      <text x="14" y="54" fontSize="10" fill="#0A2E5D" fontWeight="700">Variables:</text>
      <rect x="14" y="60" width="150" height="240" fill="#fff" stroke="#94A3B8"/>
      {['id','gender','age_yrs','teaching_method','math_score','english_score','attendance'].map((v, i) => (
        <text key={v} x="22" y={80 + i * 22} fontSize="10" fill="#0A2E5D">📊 {v}</text>
      ))}

      {/* Dependent List */}
      <text x="180" y="54" fontSize="10" fill="#0A2E5D" fontWeight="700">Dependent List:</text>
      <rect x="180" y="60" width="240" height="100" fill="#fff" stroke="#94A3B8"/>
      <text x="190" y="80" fontSize="11" fill="#0A2E5D" fontWeight="600">📊 math_score</text>

      {/* Factor */}
      <text x="180" y="186" fontSize="10" fill="#0A2E5D" fontWeight="700">Factor:</text>
      <rect x="180" y="192" width="240" height="50" fill="#fff" stroke="#94A3B8"/>
      <text x="190" y="212" fontSize="11" fill="#0A2E5D" fontWeight="600">📊 teaching_method</text>
      <text x="190" y="228" fontSize="9" fill="#64748B" fontStyle="italic">(grouping variable with 3+ levels)</text>

      {/* Right column - buttons */}
      <rect x="430" y="60"  width="100" height="22" rx="3" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="1.5"/>
      <text x="480" y="74" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Contrasts…</text>

      <rect x="430" y="86"  width="100" height="22" rx="3" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="1.5"/>
      <text x="480" y="100" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Post Hoc…</text>

      <rect x="430" y="112" width="100" height="22" rx="3" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="1.5"/>
      <text x="480" y="126" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Options…</text>

      {/* OK / Cancel */}
      <rect x="380" y="338" width="50" height="26" rx="3" fill="#0A2E5D"/>
      <text x="405" y="355" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="436" y="338" width="56" height="26" rx="3" fill="#E2E8F0" stroke="#94A3B8"/>
      <text x="464" y="355" fontSize="11" fill="#0A2E5D" textAnchor="middle">Cancel</text>

      {/* Annotations */}
      <g>
        <circle cx="425" cy="97" r="11" fill="#DC2626"/>
        <text x="425" y="101" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">!</text>
        <text x="505" y="158" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">Post Hoc → tick</text>
        <text x="505" y="170" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">Tukey (or</text>
        <text x="505" y="182" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">Games-Howell</text>
        <text x="505" y="194" fontSize="9" fill="#DC2626" fontWeight="700" textAnchor="middle">if Levene\'s sig)</text>
      </g>
    </svg>
  );
}

/* ── ANOVA output table ── */
export function AnovaOutput() {
  return (
    <svg viewBox="0 0 700 200" className="w-full h-auto">
      <rect width="700" height="200" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".15"/>
      <rect width="700" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Output — One-Way ANOVA: math_score</text>

      <text x="14" y="50" fontSize="11" fill="#0A2E5D" fontWeight="700">ANOVA</text>

      <g transform="translate(0,58)">
        {/* Headers */}
        {['','Sum of Squares','df','Mean Square','F','Sig.'].map((h, i, arr) => {
          const widths = [180, 120, 60, 120, 80, 100];
          const x = widths.slice(0, i).reduce((acc, w) => acc + w, 14);
          return (
            <g key={i}>
              <rect x={x} y="0" width={widths[i]} height="28" fill="#0A2E5D" fillOpacity=".08" stroke="#E2E8F0"/>
              <text x={x + widths[i] / 2} y="18" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{h}</text>
            </g>
          );
        })}
        {[
          ['Between Groups', '2880.4', '2',   '1440.2', '14.8', '.000'],
          ['Within Groups',  '11136.5','114', '97.7',   '',     ''],
          ['Total',          '14016.9','116', '',       '',     ''],
        ].map((row, ri) => row.map((v, ci, arr2) => {
          const widths = [180, 120, 60, 120, 80, 100];
          const x = widths.slice(0, ci).reduce((acc, w) => acc + w, 14);
          const isF = (ci === 4 || ci === 5) && ri === 0;
          return (
            <g key={ci}>
              <rect x={x} y={28 + ri * 28} width={widths[ci]} height="28"
                fill={isF ? '#FBF6E5' : '#fff'} stroke="#E2E8F0"/>
              <text x={x + widths[ci] / 2} y={28 + ri * 28 + 18} fontSize="11"
                fill={isF ? '#B8932A' : '#0A2E5D'}
                fontWeight={isF || ci === 0 ? 700 : 400}
                textAnchor="middle">{v}</text>
            </g>
          );
        }))}
      </g>

      <text x="350" y="180" fontSize="10" fill="#10B981" textAnchor="middle" fontWeight="700" fontStyle="italic">
        F(2, 114) = 14.8, p &lt; .001 → at least ONE group mean differs significantly
      </text>
    </svg>
  );
}

/* ── Post-hoc output table (Tukey) ── */
export function PostHocOutput() {
  const rows = [
    { i: 'Method A', j: 'Method B', md: '-12.5', se: 2.8, sig: '.000', sigBool: true },
    { i: 'Method A', j: 'Method C', md: '-18.2', se: 2.9, sig: '.000', sigBool: true },
    { i: 'Method B', j: 'Method A', md: ' 12.5', se: 2.8, sig: '.000', sigBool: true },
    { i: 'Method B', j: 'Method C', md: ' -5.7', se: 2.7, sig: '.090', sigBool: false },
    { i: 'Method C', j: 'Method A', md: ' 18.2', se: 2.9, sig: '.000', sigBool: true },
    { i: 'Method C', j: 'Method B', md: '  5.7', se: 2.7, sig: '.090', sigBool: false },
  ];

  return (
    <svg viewBox="0 0 700 280" className="w-full h-auto">
      <rect width="700" height="280" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".15"/>
      <rect width="700" height="28" rx="6" fill="#0A2E5D"/>
      <text x="14" y="19" fontSize="11" fill="#fff" fontWeight="700">Multiple Comparisons — Tukey HSD</text>

      <g transform="translate(0,40)">
        {/* Headers */}
        {['(I) Method', '(J) Method', 'Mean Difference (I-J)', 'Std. Error', 'Sig.'].map((h, i) => {
          const widths = [130, 130, 180, 110, 130];
          const x = widths.slice(0, i).reduce((acc, w) => acc + w, 14);
          return (
            <g key={i}>
              <rect x={x} y="0" width={widths[i]} height="32" fill="#0A2E5D" fillOpacity=".08" stroke="#E2E8F0"/>
              <text x={x + widths[i] / 2} y="20" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{h}</text>
            </g>
          );
        })}

        {/* Rows */}
        {rows.map((row, ri) => (
          <g key={ri}>
            {[row.i, row.j, row.md, row.se.toFixed(1), row.sig].map((v, ci) => {
              const widths = [130, 130, 180, 110, 130];
              const x = widths.slice(0, ci).reduce((acc, w) => acc + w, 14);
              const isStar = (ci === 2 || ci === 4) && row.sigBool;
              const showStar = ci === 2 && row.sigBool;
              return (
                <g key={ci}>
                  <rect x={x} y={32 + ri * 28} width={widths[ci]} height="28"
                    fill={isStar ? '#FBF6E5' : ri % 2 ? '#F8FAFC' : '#fff'} stroke="#E2E8F0"/>
                  <text x={x + widths[ci] / 2} y={32 + ri * 28 + 18} fontSize="11"
                    fill={isStar ? '#B8932A' : '#0A2E5D'}
                    fontWeight={isStar ? 700 : 400}
                    textAnchor="middle">{showStar ? `${v}*` : v}</text>
                </g>
              );
            })}
          </g>
        ))}
      </g>

      <text x="20" y="240" fontSize="10" fill="#64748B" fontStyle="italic">* The mean difference is significant at the 0.05 level.</text>
      <text x="20" y="260" fontSize="10" fill="#10B981" fontWeight="700">
        → A vs B significant, A vs C significant, B vs C NOT significant
      </text>
    </svg>
  );
}

/* ── Interaction effect plot ── */
export function InteractionPlot({ kind = 'crossover' }) {
  // kind: 'crossover' (lines cross), 'parallel' (no interaction), 'fan' (different magnitudes)
  let line1, line2, title;
  if (kind === 'crossover') {
    line1 = [{x: 80, y: 60}, {x: 280, y: 180}];
    line2 = [{x: 80, y: 180}, {x: 280, y: 60}];
    title = 'CROSSOVER interaction — lines cross';
  } else if (kind === 'parallel') {
    line1 = [{x: 80, y: 80}, {x: 280, y: 60}];
    line2 = [{x: 80, y: 160}, {x: 280, y: 140}];
    title = 'NO interaction — lines parallel';
  } else { // fan
    line1 = [{x: 80, y: 120}, {x: 280, y: 60}];
    line2 = [{x: 80, y: 120}, {x: 280, y: 160}];
    title = 'FAN interaction — diverging effects';
  }

  return (
    <svg viewBox="0 0 360 240" className="w-full h-auto">
      <rect width="360" height="240" rx="6" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>
      <text x="180" y="20" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{title}</text>

      <line x1="60" y1="200" x2="320" y2="200" stroke="#0A2E5D" strokeOpacity=".5"/>
      <line x1="60" y1="40"  x2="60"  y2="200" stroke="#0A2E5D" strokeOpacity=".5"/>

      <text x="180" y="222" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="600">Factor A</text>
      <text x="80" y="234" fontSize="9" fill="#64748B" textAnchor="middle">Low</text>
      <text x="280" y="234" fontSize="9" fill="#64748B" textAnchor="middle">High</text>

      {/* Line 1 */}
      <line x1={line1[0].x} y1={line1[0].y} x2={line1[1].x} y2={line1[1].y}
        stroke="#0A2E5D" strokeWidth="2.5"/>
      <circle cx={line1[0].x} cy={line1[0].y} r="5" fill="#0A2E5D"/>
      <circle cx={line1[1].x} cy={line1[1].y} r="5" fill="#0A2E5D"/>

      {/* Line 2 */}
      <line x1={line2[0].x} y1={line2[0].y} x2={line2[1].x} y2={line2[1].y}
        stroke="#D4AF37" strokeWidth="2.5"/>
      <circle cx={line2[0].x} cy={line2[0].y} r="5" fill="#D4AF37"/>
      <circle cx={line2[1].x} cy={line2[1].y} r="5" fill="#D4AF37"/>

      {/* Legend */}
      <g transform="translate(70, 50)">
        <line x1="0" y1="0" x2="15" y2="0" stroke="#0A2E5D" strokeWidth="2.5"/>
        <text x="20" y="3" fontSize="9" fill="#0A2E5D" fontWeight="700">B = Low</text>
        <line x1="0" y1="14" x2="15" y2="14" stroke="#D4AF37" strokeWidth="2.5"/>
        <text x="20" y="17" fontSize="9" fill="#B8932A" fontWeight="700">B = High</text>
      </g>
    </svg>
  );
}

export function InteractionPlots() {
  return (
    <svg viewBox="0 0 1100 240" className="w-full h-auto">
      <g transform="translate(0,0)"><InteractionPlotInline kind="parallel"/></g>
      <g transform="translate(370,0)"><InteractionPlotInline kind="crossover"/></g>
      <g transform="translate(740,0)"><InteractionPlotInline kind="fan"/></g>
    </svg>
  );
}
function InteractionPlotInline({ kind }) {
  let line1, line2, title, subtitle;
  if (kind === 'crossover') {
    line1 = [{x: 80, y: 60}, {x: 280, y: 180}];
    line2 = [{x: 80, y: 180}, {x: 280, y: 60}];
    title = 'CROSSOVER';
    subtitle = 'Lines cross — strong interaction';
  } else if (kind === 'parallel') {
    line1 = [{x: 80, y: 80}, {x: 280, y: 60}];
    line2 = [{x: 80, y: 160}, {x: 280, y: 140}];
    title = 'NO interaction';
    subtitle = 'Lines parallel — only main effects';
  } else {
    line1 = [{x: 80, y: 130}, {x: 280, y: 60}];
    line2 = [{x: 80, y: 130}, {x: 280, y: 170}];
    title = 'FAN';
    subtitle = 'Diverging effect of B';
  }
  return (
    <g>
      <rect width="340" height="240" rx="6" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>
      <text x="170" y="18" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{title}</text>
      <line x1="50" y1="200" x2="310" y2="200" stroke="#0A2E5D" strokeOpacity=".5"/>
      <line x1="50" y1="40"  x2="50"  y2="200" stroke="#0A2E5D" strokeOpacity=".5"/>
      <text x="170" y="218" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="600">Factor A</text>
      <text x="70" y="230" fontSize="9" fill="#64748B">Low</text>
      <text x="290" y="230" fontSize="9" fill="#64748B">High</text>
      <line x1={line1[0].x} y1={line1[0].y} x2={line1[1].x} y2={line1[1].y} stroke="#0A2E5D" strokeWidth="2.5"/>
      <circle cx={line1[0].x} cy={line1[0].y} r="5" fill="#0A2E5D"/>
      <circle cx={line1[1].x} cy={line1[1].y} r="5" fill="#0A2E5D"/>
      <line x1={line2[0].x} y1={line2[0].y} x2={line2[1].x} y2={line2[1].y} stroke="#D4AF37" strokeWidth="2.5"/>
      <circle cx={line2[0].x} cy={line2[0].y} r="5" fill="#D4AF37"/>
      <circle cx={line2[1].x} cy={line2[1].y} r="5" fill="#D4AF37"/>
      <text x="170" y="34" fontSize="9" fill="#64748B" textAnchor="middle" fontStyle="italic">{subtitle}</text>
    </g>
  );
}

/* ── Repeated measures: same people, multiple times ── */
export function RepeatedMeasuresLogic() {
  return (
    <svg viewBox="0 0 720 280" className="w-full h-auto">
      <rect width="720" height="280" fill="#fff"/>
      <text x="360" y="22" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Repeated Measures — SAME people measured at MULTIPLE time points
      </text>

      {/* Three pupils, each connected across three time points */}
      <line x1="80" y1="240" x2="640" y2="240" stroke="#0A2E5D" strokeOpacity=".5"/>
      <line x1="80" y1="80"  x2="80"  y2="240" stroke="#0A2E5D" strokeOpacity=".5"/>

      <text x="180" y="260" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Pre-test</text>
      <text x="360" y="260" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Mid-term</text>
      <text x="540" y="260" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Post-test</text>

      {/* Three pupils with different trajectories */}
      {[
        { name: 'Wanjiku', scores: [60, 70, 80], color: '#0A2E5D' },
        { name: 'Otieno',  scores: [50, 65, 78], color: '#D4AF37' },
        { name: 'Achieng', scores: [70, 75, 88], color: '#10B981' },
      ].map((p, pi) => {
        const points = p.scores.map((s, i) => [180 + i * 180, 240 - s * 1.6]);
        return (
          <g key={pi}>
            {/* Connecting line shows ONE person's trajectory */}
            <polyline points={points.map(([x, y]) => `${x},${y}`).join(' ')}
              fill="none" stroke={p.color} strokeWidth="2"/>
            {points.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="6" fill={p.color}/>
            ))}
            <text x="100" y={points[0][1] + 3} fontSize="10" fill={p.color} textAnchor="end" fontWeight="700">{p.name}</text>
          </g>
        );
      })}

      <text x="40" y="160" fontSize="11" fill="#0A2E5D" fontWeight="700" textAnchor="middle"
        transform="rotate(-90, 40, 160)">Math score</text>

      <text x="360" y="62" fontSize="10" fill="#10B981" textAnchor="middle" fontStyle="italic" fontWeight="700">
        Each pupil is their own control — we track CHANGE WITHIN each person across time
      </text>
    </svg>
  );
}

/* ── Decision tree: which ANOVA to use ── */
export function AnovaDecisionTree() {
  return (
    <svg viewBox="0 0 720 320" className="w-full h-auto">
      <rect width="720" height="320" fill="#fff"/>
      <text x="360" y="22" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Which ANOVA should I use?
      </text>

      {/* Root */}
      <g transform="translate(280, 50)">
        <rect width="160" height="40" rx="6" fill="#0A2E5D"/>
        <text x="80" y="18" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">How many factors?</text>
        <text x="80" y="32" fontSize="9" fill="#fff" textAnchor="middle">(grouping variables)</text>
      </g>

      {/* Branch 1 — One factor */}
      <line x1="280" y1="105" x2="180" y2="140" stroke="#0A2E5D" strokeWidth="2"/>
      <text x="220" y="120" fontSize="10" fill="#0A2E5D" fontWeight="700">ONE</text>

      {/* Branch 2 — Two factors */}
      <line x1="440" y1="105" x2="540" y2="140" stroke="#0A2E5D" strokeWidth="2"/>
      <text x="500" y="120" fontSize="10" fill="#0A2E5D" fontWeight="700">TWO</text>

      {/* Sub-branch 1: One factor */}
      <g transform="translate(80, 145)">
        <rect width="220" height="40" rx="6" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
        <text x="110" y="18" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Same people measured</text>
        <text x="110" y="32" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">multiple times?</text>
      </g>

      <line x1="120" y1="195" x2="80" y2="240" stroke="#0A2E5D" strokeWidth="2"/>
      <text x="92" y="220" fontSize="10" fill="#0A2E5D" fontWeight="700">YES</text>

      <line x1="260" y1="195" x2="300" y2="240" stroke="#0A2E5D" strokeWidth="2"/>
      <text x="288" y="220" fontSize="10" fill="#0A2E5D" fontWeight="700">NO</text>

      <g transform="translate(10, 245)">
        <rect width="150" height="50" rx="6" fill="#10B981" fillOpacity=".2" stroke="#10B981" strokeWidth="2"/>
        <text x="75" y="20" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Repeated Measures</text>
        <text x="75" y="36" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">ANOVA</text>
        <text x="75" y="48" fontSize="8" fill="#64748B" textAnchor="middle">(Lesson 4)</text>
      </g>

      <g transform="translate(230, 245)">
        <rect width="150" height="50" rx="6" fill="#10B981" fillOpacity=".2" stroke="#10B981" strokeWidth="2"/>
        <text x="75" y="20" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">One-Way ANOVA</text>
        <text x="75" y="36" fontSize="9" fill="#0A2E5D" textAnchor="middle">(Lesson 1)</text>
      </g>

      {/* Sub-branch 2: Two factors */}
      <g transform="translate(440, 145)">
        <rect width="220" height="40" rx="6" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
        <text x="110" y="18" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Independent groups</text>
        <text x="110" y="32" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">at all levels?</text>
      </g>

      <line x1="540" y1="195" x2="540" y2="240" stroke="#0A2E5D" strokeWidth="2"/>
      <text x="555" y="220" fontSize="10" fill="#0A2E5D" fontWeight="700">YES</text>

      <g transform="translate(450, 245)">
        <rect width="180" height="50" rx="6" fill="#10B981" fillOpacity=".2" stroke="#10B981" strokeWidth="2"/>
        <text x="90" y="20" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Two-Way ANOVA</text>
        <text x="90" y="36" fontSize="9" fill="#0A2E5D" textAnchor="middle">(Lesson 3)</text>
      </g>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   T-TESTS — illustrations for the three t-test lessons
   ════════════════════════════════════════════════════════════ */

// Top: noisy two groups with small gap. Bottom: tight two groups with same gap.
export function TTestLogic() {
  const seed = (n) => {
    const rnd = (s) => ((s * 9301 + 49297) % 233280) / 233280;
    return Array.from({ length: 18 }, (_, i) => rnd(n + i * 11));
  };
  // Noisy points around y centres
  const noisy1 = seed(11).map((r) => 60 + (r - 0.5) * 70);
  const noisy2 = seed(12).map((r) => 95 + (r - 0.5) * 70);
  const tight1 = seed(13).map((r) => 60 + (r - 0.5) * 22);
  const tight2 = seed(14).map((r) => 95 + (r - 0.5) * 22);
  const xs = Array.from({ length: 18 }, (_, i) => 60 + i * 12);

  return (
    <svg viewBox="0 0 540 360" className="w-full h-auto">
      <rect width="540" height="360" fill="#fff"/>
      <text x="270" y="22" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        The t-test asks: how big is the gap relative to the noise?
      </text>

      {/* Top panel — noisy */}
      <g transform="translate(20, 40)">
        <rect width="500" height="135" rx="8" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>
        <text x="10" y="18" fontSize="11" fill="#0A2E5D" fontWeight="700">Noisy data → small t → likely chance</text>
        {xs.map((x, i) => <circle key={`a${i}`} cx={x} cy={noisy1[i]} r="3" fill="#0A2E5D" opacity=".75"/>)}
        {xs.map((x, i) => <circle key={`b${i}`} cx={x + 220} cy={noisy2[i]} r="3" fill="#D4AF37" opacity=".85"/>)}
        <line x1="60" y1="60" x2="270" y2="60" stroke="#0A2E5D" strokeWidth="2" strokeDasharray="4 3"/>
        <line x1="280" y1="95" x2="490" y2="95" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 3"/>
        <text x="50" y="63" fontSize="9" fill="#0A2E5D" textAnchor="end">M₁</text>
        <text x="500" y="98" fontSize="9" fill="#D4AF37" textAnchor="start">M₂</text>
        <text x="250" y="128" fontSize="10" fill="#0A2E5D" textAnchor="middle">gap = 35 · spread = HUGE</text>
      </g>

      {/* Bottom panel — tight */}
      <g transform="translate(20, 200)">
        <rect width="500" height="135" rx="8" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".15"/>
        <text x="10" y="18" fontSize="11" fill="#0A2E5D" fontWeight="700">Tight data → large t → real difference</text>
        {xs.map((x, i) => <circle key={`c${i}`} cx={x} cy={tight1[i]} r="3" fill="#0A2E5D" opacity=".85"/>)}
        {xs.map((x, i) => <circle key={`d${i}`} cx={x + 220} cy={tight2[i]} r="3" fill="#D4AF37" opacity=".9"/>)}
        <line x1="60" y1="60" x2="270" y2="60" stroke="#0A2E5D" strokeWidth="2" strokeDasharray="4 3"/>
        <line x1="280" y1="95" x2="490" y2="95" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 3"/>
        <text x="50" y="63" fontSize="9" fill="#0A2E5D" textAnchor="end">M₁</text>
        <text x="500" y="98" fontSize="9" fill="#D4AF37" textAnchor="start">M₂</text>
        <text x="250" y="128" fontSize="10" fill="#0A2E5D" textAnchor="middle">gap = 35 · spread = small</text>
      </g>
    </svg>
  );
}

// Mock SPSS Independent-Samples T-Test dialog
export function IndependentTTestDialog() {
  return (
    <svg viewBox="0 0 540 320" className="w-full h-auto">
      <rect width="540" height="320" fill="#F1F5F9"/>
      <rect x="10" y="10" width="520" height="300" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".4"/>
      <rect x="10" y="10" width="520" height="26" rx="6" fill="#0A2E5D"/>
      <text x="20" y="28" fontSize="12" fill="#fff" fontWeight="700">Independent-Samples T Test</text>

      {/* Variable list */}
      <rect x="20" y="50" width="160" height="240" rx="4" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".25"/>
      <text x="100" y="68" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Available variables</text>
      <text x="30" y="92" fontSize="10" fill="#0A2E5D">nurse_id</text>
      <text x="30" y="110" fontSize="10" fill="#0A2E5D">age</text>
      <text x="30" y="128" fontSize="10" fill="#0A2E5D">years_experience</text>
      <text x="30" y="146" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">stress_score ✓</text>
      <text x="30" y="164" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">hospital_level ✓</text>

      {/* Arrows */}
      <text x="195" y="100" fontSize="18" fill="#0A2E5D" fontWeight="700">▶</text>
      <text x="195" y="190" fontSize="18" fill="#0A2E5D" fontWeight="700">▶</text>

      {/* Test variable */}
      <rect x="220" y="58" width="170" height="50" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="74" fontSize="9" fill="#0A2E5D" fontWeight="700">Test Variable(s):</text>
      <rect x="228" y="80" width="155" height="22" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="234" y="95" fontSize="10" fill="#0A2E5D" fontWeight="700">stress_score</text>

      {/* Grouping variable */}
      <rect x="220" y="148" width="170" height="50" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="164" fontSize="9" fill="#0A2E5D" fontWeight="700">Grouping Variable:</text>
      <rect x="228" y="170" width="155" height="22" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="234" y="185" fontSize="10" fill="#0A2E5D" fontWeight="700">hospital_level(1 2)</text>

      {/* Define Groups button */}
      <rect x="220" y="208" width="120" height="22" rx="3" fill="#0A2E5D"/>
      <text x="280" y="223" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Define Groups…</text>

      {/* Right-side buttons */}
      <rect x="410" y="58"  width="110" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="465" y="74"  fontSize="10" fill="#0A2E5D" textAnchor="middle">Options…</text>
      <rect x="410" y="90"  width="110" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="465" y="106" fontSize="10" fill="#0A2E5D" textAnchor="middle">Bootstrap…</text>
      <rect x="410" y="250" width="50"  height="28" rx="3" fill="#10B981"/>
      <text x="435" y="269" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="465" y="250" width="55"  height="28" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="492" y="269" fontSize="10" fill="#0A2E5D" textAnchor="middle">Paste</text>
    </svg>
  );
}

// Mock SPSS Independent-Samples Test output
export function IndependentTTestOutput() {
  return (
    <svg viewBox="0 0 700 240" className="w-full h-auto">
      <rect width="700" height="240" fill="#fff"/>
      <text x="350" y="20" fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Independent Samples Test
      </text>

      {/* Section headers */}
      <rect x="10" y="34" width="700" height="20" fill="#0A2E5D"/>
      <text x="120" y="48" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Levene's Test</text>
      <text x="450" y="48" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">t-test for Equality of Means</text>

      {/* Column headers */}
      <rect x="10" y="55" width="700" height="22" fill="#E2E8F0"/>
      <text x="40"  y="70" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">F</text>
      <text x="100" y="70" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Sig.</text>
      <text x="170" y="70" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">t</text>
      <text x="230" y="70" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">df</text>
      <text x="310" y="70" fontSize="9"  fill="#0A2E5D" textAnchor="middle" fontWeight="700">Sig. (2-tailed)</text>
      <text x="400" y="70" fontSize="9"  fill="#0A2E5D" textAnchor="middle" fontWeight="700">Mean Diff.</text>
      <text x="480" y="70" fontSize="9"  fill="#0A2E5D" textAnchor="middle" fontWeight="700">SE Diff.</text>
      <text x="600" y="70" fontSize="9"  fill="#0A2E5D" textAnchor="middle" fontWeight="700">95% CI (Lower, Upper)</text>

      {/* Row 1 — Equal variances assumed */}
      <rect x="10" y="80" width="700" height="60" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
      <text x="15" y="100" fontSize="10" fill="#0A2E5D" fontWeight="700">Equal variances assumed ← read this row when Levene p &gt; .05</text>
      <text x="40"  y="125" fontSize="11" fill="#0A2E5D" textAnchor="middle">0.18</text>
      <text x="100" y="125" fontSize="11" fill="#0A2E5D" textAnchor="middle">.67</text>
      <text x="170" y="125" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">4.07</text>
      <text x="230" y="125" fontSize="11" fill="#0A2E5D" textAnchor="middle">62</text>
      <text x="310" y="125" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">.000</text>
      <text x="400" y="125" fontSize="11" fill="#0A2E5D" textAnchor="middle">4.31</text>
      <text x="480" y="125" fontSize="11" fill="#0A2E5D" textAnchor="middle">1.06</text>
      <text x="600" y="125" fontSize="11" fill="#0A2E5D" textAnchor="middle">2.20, 6.42</text>

      {/* Row 2 — Equal variances NOT assumed */}
      <rect x="10" y="145" width="700" height="60" fill="#fff" stroke="#0A2E5D" strokeOpacity=".3"/>
      <text x="15" y="165" fontSize="10" fill="#0A2E5D">Equal variances NOT assumed ← read this row when Levene p &lt; .05 (Welch)</text>
      <text x="170" y="190" fontSize="11" fill="#0A2E5D" textAnchor="middle">4.07</text>
      <text x="230" y="190" fontSize="11" fill="#0A2E5D" textAnchor="middle">61.92</text>
      <text x="310" y="190" fontSize="11" fill="#0A2E5D" textAnchor="middle">.000</text>
      <text x="400" y="190" fontSize="11" fill="#0A2E5D" textAnchor="middle">4.31</text>
      <text x="480" y="190" fontSize="11" fill="#0A2E5D" textAnchor="middle">1.06</text>
      <text x="600" y="190" fontSize="11" fill="#0A2E5D" textAnchor="middle">2.19, 6.43</text>

      <text x="10" y="225" fontSize="10" fill="#64748B">Caption: Test variable = stress_score. Grouping variable = hospital_level (1 = Level 5, 2 = Level 4).</text>
    </svg>
  );
}

// Per-person diff column logic illustration
export function PairedDifferenceLogic() {
  const people = Array.from({ length: 8 }, (_, i) => ({
    id: `P${i + 1}`,
    before: 18 + Math.round(((i * 7 + 3) % 13)) * 0.7,
    after:  30 + Math.round(((i * 5 + 9) % 11)) * 0.6,
  }));
  return (
    <svg viewBox="0 0 720 320" className="w-full h-auto">
      <rect width="720" height="320" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        The paired t-test secretly works on the per-person DIFFERENCE column
      </text>

      {/* Table 1 — wide layout */}
      <g transform="translate(20, 40)">
        <rect width="220" height="250" rx="6" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".25"/>
        <text x="110" y="18" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Your dataset</text>
        <rect x="10" y="28" width="200" height="20" fill="#E2E8F0"/>
        <text x="40"  y="42" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">ID</text>
        <text x="120" y="42" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">before</text>
        <text x="190" y="42" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">after</text>
        {people.map((p, i) => (
          <g key={i}>
            <text x="40"  y={62 + i * 23} fontSize="10" fill="#0A2E5D" textAnchor="middle">{p.id}</text>
            <text x="120" y={62 + i * 23} fontSize="10" fill="#0A2E5D" textAnchor="middle">{p.before.toFixed(1)}</text>
            <text x="190" y={62 + i * 23} fontSize="10" fill="#0A2E5D" textAnchor="middle">{p.after.toFixed(1)}</text>
          </g>
        ))}
      </g>

      {/* Arrow */}
      <g transform="translate(252, 165)">
        <text x="0" y="-10" fontSize="11" fill="#D4AF37" fontWeight="700">SPSS computes</text>
        <text x="0" y="2"   fontSize="11" fill="#D4AF37" fontWeight="700">diff = after − before</text>
        <text x="40" y="20" fontSize="22" fill="#D4AF37" fontWeight="700">▶</text>
      </g>

      {/* Table 2 — difference column */}
      <g transform="translate(330, 40)">
        <rect width="150" height="250" rx="6" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
        <text x="75" y="18" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">diff column</text>
        <rect x="10" y="28" width="130" height="20" fill="#E2E8F0"/>
        <text x="40"  y="42" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">ID</text>
        <text x="100" y="42" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">diff</text>
        {people.map((p, i) => (
          <g key={i}>
            <text x="40"  y={62 + i * 23} fontSize="10" fill="#0A2E5D" textAnchor="middle">{p.id}</text>
            <text x="100" y={62 + i * 23} fontSize="10" fill="#10B981" textAnchor="middle" fontWeight="700">
              +{(p.after - p.before).toFixed(1)}
            </text>
          </g>
        ))}
      </g>

      {/* Arrow */}
      <g transform="translate(492, 165)">
        <text x="40" y="20" fontSize="22" fill="#D4AF37" fontWeight="700">▶</text>
      </g>

      {/* Test panel */}
      <g transform="translate(540, 80)">
        <rect width="160" height="180" rx="6" fill="#0A2E5D" fillOpacity=".07" stroke="#0A2E5D"/>
        <text x="80" y="22" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">The actual test:</text>
        <text x="80" y="50" fontSize="11" fill="#0A2E5D" textAnchor="middle">Is the mean</text>
        <text x="80" y="66" fontSize="11" fill="#0A2E5D" textAnchor="middle">of the diff column</text>
        <text x="80" y="86" fontSize="14" fill="#10B981" textAnchor="middle" fontWeight="700">≠ 0 ?</text>
        <line x1="20" y1="100" x2="140" y2="100" stroke="#0A2E5D" strokeOpacity=".25"/>
        <text x="80" y="120" fontSize="10" fill="#0A2E5D" textAnchor="middle">M_d = +11.3</text>
        <text x="80" y="135" fontSize="10" fill="#0A2E5D" textAnchor="middle">SD_d = 6.8</text>
        <text x="80" y="155" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">t(27) = 8.79</text>
        <text x="80" y="170" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">p &lt; .001 ✓</text>
      </g>
    </svg>
  );
}

// Mock SPSS Paired-Samples T-Test dialog
export function PairedTTestDialog() {
  return (
    <svg viewBox="0 0 540 320" className="w-full h-auto">
      <rect width="540" height="320" fill="#F1F5F9"/>
      <rect x="10" y="10" width="520" height="300" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".4"/>
      <rect x="10" y="10" width="520" height="26" rx="6" fill="#0A2E5D"/>
      <text x="20" y="28" fontSize="12" fill="#fff" fontWeight="700">Paired-Samples T Test</text>

      {/* Variable list */}
      <rect x="20" y="50" width="160" height="240" rx="4" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".25"/>
      <text x="100" y="68" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Available variables</text>
      <text x="30" y="92"  fontSize="10" fill="#0A2E5D">entrepreneur_id</text>
      <text x="30" y="110" fontSize="10" fill="#0A2E5D">gender</text>
      <text x="30" y="128" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">score_before ✓</text>
      <text x="30" y="146" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">score_after ✓</text>

      {/* Arrow */}
      <text x="195" y="170" fontSize="18" fill="#0A2E5D" fontWeight="700">▶</text>

      {/* Paired variables box */}
      <rect x="220" y="58" width="200" height="180" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="74" fontSize="10" fill="#0A2E5D" fontWeight="700">Paired Variables:</text>

      {/* Column headers */}
      <rect x="225" y="80" width="190" height="20" fill="#E2E8F0"/>
      <text x="240" y="94" fontSize="9" fill="#0A2E5D" fontWeight="700">Pair</text>
      <text x="295" y="94" fontSize="9" fill="#0A2E5D" fontWeight="700">Variable1</text>
      <text x="370" y="94" fontSize="9" fill="#0A2E5D" fontWeight="700">Variable2</text>

      {/* Pair 1 row */}
      <text x="240" y="116" fontSize="10" fill="#0A2E5D" fontWeight="700">1</text>
      <rect x="270" y="105" width="65" height="18" rx="2" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="302" y="118" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">score_after</text>
      <rect x="345" y="105" width="65" height="18" rx="2" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="378" y="118" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">score_before</text>

      <text x="225" y="160" fontSize="9" fill="#64748B">SPSS computes diff = Variable1 − Variable2</text>
      <text x="225" y="174" fontSize="9" fill="#64748B">→ here that's after − before (positive = gain)</text>

      {/* Right-side buttons */}
      <rect x="440" y="58"  width="80" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="480" y="74"  fontSize="10" fill="#0A2E5D" textAnchor="middle">Options…</text>
      <rect x="440" y="250" width="40" height="28" rx="3" fill="#10B981"/>
      <text x="460" y="269" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="485" y="250" width="40" height="28" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="505" y="269" fontSize="10" fill="#0A2E5D" textAnchor="middle">Paste</text>
    </svg>
  );
}

// Mock SPSS Paired-Samples Test output — 3 tables
export function PairedTTestOutput() {
  return (
    <svg viewBox="0 0 720 360" className="w-full h-auto">
      <rect width="720" height="360" fill="#fff"/>

      {/* Table 1 — Paired Samples Statistics */}
      <text x="10" y="18" fontSize="11" fill="#0A2E5D" fontWeight="700">Table 1 — Paired Samples Statistics</text>
      <rect x="10" y="24" width="700" height="22" fill="#0A2E5D"/>
      <text x="120" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Mean</text>
      <text x="290" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">N</text>
      <text x="450" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Std. Deviation</text>
      <text x="620" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Std. Error Mean</text>

      <rect x="10" y="46" width="700" height="22" fill="#FAF7EF"/>
      <text x="40"  y="61" fontSize="10" fill="#0A2E5D">Pair 1   score_after</text>
      <text x="200" y="61" fontSize="10" fill="#0A2E5D" textAnchor="middle">32.90</text>
      <text x="290" y="61" fontSize="10" fill="#0A2E5D" textAnchor="middle">28</text>
      <text x="450" y="61" fontSize="10" fill="#0A2E5D" textAnchor="middle">8.40</text>
      <text x="620" y="61" fontSize="10" fill="#0A2E5D" textAnchor="middle">1.59</text>

      <rect x="10" y="68" width="700" height="22" fill="#fff"/>
      <text x="40"  y="83" fontSize="10" fill="#0A2E5D">             score_before</text>
      <text x="200" y="83" fontSize="10" fill="#0A2E5D" textAnchor="middle">21.60</text>
      <text x="290" y="83" fontSize="10" fill="#0A2E5D" textAnchor="middle">28</text>
      <text x="450" y="83" fontSize="10" fill="#0A2E5D" textAnchor="middle">7.90</text>
      <text x="620" y="83" fontSize="10" fill="#0A2E5D" textAnchor="middle">1.49</text>

      {/* Table 2 — Paired Samples Correlations */}
      <text x="10" y="115" fontSize="11" fill="#0A2E5D" fontWeight="700">Table 2 — Paired Samples Correlations</text>
      <rect x="10" y="121" width="700" height="22" fill="#0A2E5D"/>
      <text x="160" y="137" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">N</text>
      <text x="380" y="137" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Correlation</text>
      <text x="600" y="137" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Sig.</text>
      <rect x="10" y="143" width="700" height="22" fill="#FAF7EF"/>
      <text x="40"  y="158" fontSize="10" fill="#0A2E5D">Pair 1   score_after &amp; score_before</text>
      <text x="160" y="158" fontSize="10" fill="#0A2E5D" textAnchor="middle">28</text>
      <text x="380" y="158" fontSize="10" fill="#10B981" textAnchor="middle" fontWeight="700">.72</text>
      <text x="600" y="158" fontSize="10" fill="#0A2E5D" textAnchor="middle">.000</text>

      {/* Table 3 — Paired Samples Test */}
      <text x="10" y="190" fontSize="11" fill="#0A2E5D" fontWeight="700">Table 3 — Paired Samples Test</text>
      <rect x="10" y="196" width="700" height="22" fill="#0A2E5D"/>
      <text x="70"  y="212" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Mean</text>
      <text x="160" y="212" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">SD</text>
      <text x="240" y="212" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">SE Mean</text>
      <text x="380" y="212" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">95% CI (Lower, Upper)</text>
      <text x="540" y="212" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">t</text>
      <text x="600" y="212" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">df</text>
      <text x="670" y="212" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Sig. (2-t)</text>

      <rect x="10" y="218" width="700" height="40" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
      <text x="15" y="234" fontSize="9" fill="#0A2E5D" fontWeight="700">Pair 1  score_after − score_before</text>
      <text x="70"  y="250" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">+11.30</text>
      <text x="160" y="250" fontSize="11" fill="#0A2E5D" textAnchor="middle">6.80</text>
      <text x="240" y="250" fontSize="11" fill="#0A2E5D" textAnchor="middle">1.285</text>
      <text x="380" y="250" fontSize="11" fill="#0A2E5D" textAnchor="middle">8.66, 13.94</text>
      <text x="540" y="250" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">8.79</text>
      <text x="600" y="250" fontSize="11" fill="#0A2E5D" textAnchor="middle">27</text>
      <text x="670" y="250" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">.000</text>

      <text x="10" y="290" fontSize="10" fill="#64748B">Mean Difference = average per-person change. SD = how much that change varied. t and df drive the p-value.</text>
      <text x="10" y="308" fontSize="10" fill="#64748B">95% CI excludes 0 → significant. Cohen's d = M_d / SD_d = 11.30 / 6.80 = 1.66 (very large).</text>
    </svg>
  );
}

// One-sample t-test logic — number line with sample mean and benchmark
export function OneSampleTTestLogic() {
  return (
    <svg viewBox="0 0 540 220" className="w-full h-auto">
      <rect width="540" height="220" fill="#fff"/>
      <text x="270" y="22" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Compare YOUR sample mean to a known benchmark
      </text>

      {/* Number line */}
      <line x1="50" y1="130" x2="490" y2="130" stroke="#0A2E5D" strokeWidth="2"/>
      {[110, 115, 120, 125, 130, 135, 140].map((v, i) => {
        const x = 50 + i * 73;
        return (
          <g key={i}>
            <line x1={x} y1="125" x2={x} y2="135" stroke="#0A2E5D" strokeWidth="2"/>
            <text x={x} y="150" fontSize="10" fill="#0A2E5D" textAnchor="middle">{v}</text>
          </g>
        );
      })}

      {/* Test value (122) */}
      <line x1="195" y1="60" x2="195" y2="130" stroke="#0A2E5D" strokeWidth="2" strokeDasharray="5 3"/>
      <text x="195" y="50" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Test value (KDHS)</text>
      <text x="195" y="38" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">μ₀ = 122</text>

      {/* Sample mean (129.4) */}
      <circle cx="303" cy="130" r="9" fill="#D4AF37"/>
      <line x1="303" y1="130" x2="303" y2="170" stroke="#D4AF37" strokeWidth="2"/>
      <text x="303" y="190" fontSize="11" fill="#D4AF37" textAnchor="middle" fontWeight="700">Sample M = 129.4</text>
      <text x="303" y="204" fontSize="9" fill="#64748B" textAnchor="middle">(n = 45, SD = 14.2)</text>

      {/* Gap arrow */}
      <line x1="200" y1="90" x2="297" y2="90" stroke="#10B981" strokeWidth="2" markerEnd="url(#arr)"/>
      <defs>
        <marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <polygon points="0,0 10,5 0,10" fill="#10B981"/>
        </marker>
      </defs>
      <text x="245" y="82" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">gap = 7.4</text>

      {/* Bottom narration */}
      <text x="270" y="218" fontSize="10" fill="#0A2E5D" textAnchor="middle">
        t = (M − μ₀) ÷ SE  · is the gap big enough to be real?
      </text>
    </svg>
  );
}

// Mock One-Sample T Test dialog
export function OneSampleTTestDialog() {
  return (
    <svg viewBox="0 0 540 280" className="w-full h-auto">
      <rect width="540" height="280" fill="#F1F5F9"/>
      <rect x="10" y="10" width="520" height="260" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".4"/>
      <rect x="10" y="10" width="520" height="26" rx="6" fill="#0A2E5D"/>
      <text x="20" y="28" fontSize="12" fill="#fff" fontWeight="700">One-Sample T Test</text>

      <rect x="20" y="50" width="160" height="180" rx="4" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".25"/>
      <text x="100" y="68" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Available variables</text>
      <text x="30" y="92"  fontSize="10" fill="#0A2E5D">participant_id</text>
      <text x="30" y="110" fontSize="10" fill="#0A2E5D">age</text>
      <text x="30" y="128" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">systolic_bp ✓</text>
      <text x="30" y="146" fontSize="10" fill="#0A2E5D">diastolic_bp</text>

      <text x="195" y="120" fontSize="18" fill="#0A2E5D" fontWeight="700">▶</text>

      <rect x="220" y="58" width="200" height="60" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="74" fontSize="10" fill="#0A2E5D" fontWeight="700">Test Variable(s):</text>
      <rect x="228" y="80" width="185" height="22" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="234" y="95" fontSize="10" fill="#0A2E5D" fontWeight="700">systolic_bp</text>

      <rect x="220" y="135" width="200" height="55" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="151" fontSize="10" fill="#0A2E5D" fontWeight="700">Test Value:</text>
      <rect x="228" y="158" width="80" height="24" rx="3" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
      <text x="268" y="174" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">122</text>
      <text x="320" y="174" fontSize="9" fill="#64748B">← change from 0!</text>

      <rect x="440" y="58"  width="80" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="480" y="74"  fontSize="10" fill="#0A2E5D" textAnchor="middle">Options…</text>
      <rect x="440" y="200" width="40" height="28" rx="3" fill="#10B981"/>
      <text x="460" y="219" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="485" y="200" width="40" height="28" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="505" y="219" fontSize="10" fill="#0A2E5D" textAnchor="middle">Paste</text>
    </svg>
  );
}

// Mock One-Sample Test output
export function OneSampleTTestOutput() {
  return (
    <svg viewBox="0 0 720 260" className="w-full h-auto">
      <rect width="720" height="260" fill="#fff"/>
      <text x="360" y="20" fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        One-Sample Test  ·  Test Value = 122
      </text>

      {/* Table 1 */}
      <text x="10" y="42" fontSize="11" fill="#0A2E5D" fontWeight="700">Table 1 — One-Sample Statistics</text>
      <rect x="10" y="48" width="700" height="22" fill="#0A2E5D"/>
      <text x="120" y="64" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">N</text>
      <text x="300" y="64" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Mean</text>
      <text x="480" y="64" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Std. Deviation</text>
      <text x="630" y="64" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Std. Error Mean</text>
      <rect x="10" y="70" width="700" height="22" fill="#FAF7EF"/>
      <text x="40"  y="85" fontSize="10" fill="#0A2E5D">systolic_bp</text>
      <text x="120" y="85" fontSize="10" fill="#0A2E5D" textAnchor="middle">45</text>
      <text x="300" y="85" fontSize="10" fill="#10B981" textAnchor="middle" fontWeight="700">129.40</text>
      <text x="480" y="85" fontSize="10" fill="#0A2E5D" textAnchor="middle">14.20</text>
      <text x="630" y="85" fontSize="10" fill="#0A2E5D" textAnchor="middle">2.12</text>

      {/* Table 2 */}
      <text x="10" y="118" fontSize="11" fill="#0A2E5D" fontWeight="700">Table 2 — One-Sample Test</text>
      <rect x="10" y="124" width="700" height="22" fill="#0A2E5D"/>
      <text x="80"  y="140" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">t</text>
      <text x="160" y="140" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">df</text>
      <text x="260" y="140" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Sig. (2-tailed)</text>
      <text x="380" y="140" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Mean Difference</text>
      <text x="560" y="140" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">95% CI (Lower, Upper)</text>

      <rect x="10" y="146" width="700" height="40" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
      <text x="15" y="162" fontSize="9" fill="#0A2E5D" fontWeight="700">systolic_bp</text>
      <text x="80"  y="178" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">3.49</text>
      <text x="160" y="178" fontSize="11" fill="#0A2E5D" textAnchor="middle">44</text>
      <text x="260" y="178" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">.001</text>
      <text x="380" y="178" fontSize="11" fill="#0A2E5D" textAnchor="middle">+7.40</text>
      <text x="560" y="178" fontSize="11" fill="#0A2E5D" textAnchor="middle">3.13, 11.67</text>

      <text x="10" y="215" fontSize="10" fill="#64748B">Mean Difference = M − μ₀ = 129.40 − 122 = +7.40 mmHg. CI excludes 0 → sample significantly above benchmark.</text>
      <text x="10" y="233" fontSize="10" fill="#64748B">Cohen's d = (M − μ₀) / SD = 7.40 / 14.20 = 0.52  ·  medium effect.</text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   MASTER DECISION TREE — one large flowchart of the 12 tests
   ════════════════════════════════════════════════════════════ */

export function MasterDecisionTree() {
  // Reusable node styles
  const Q = ({ x, y, w = 200, h = 44, title, sub }) => (
    <g transform={`translate(${x},${y})`}>
      <rect width={w} height={h} rx="6" fill="#0A2E5D"/>
      <text x={w / 2} y="18" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">{title}</text>
      {sub && <text x={w / 2} y="33" fontSize="9" fill="#fff" textAnchor="middle">{sub}</text>}
    </g>
  );
  const Branch = ({ x, y, w = 180, h = 38, title, sub }) => (
    <g transform={`translate(${x},${y})`}>
      <rect width={w} height={h} rx="6" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
      <text x={w / 2} y="16" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{title}</text>
      {sub && <text x={w / 2} y="30" fontSize="9" fill="#0A2E5D" textAnchor="middle">{sub}</text>}
    </g>
  );
  const Leaf = ({ x, y, w = 160, h = 44, title, lesson, nonParam }) => (
    <g transform={`translate(${x},${y})`}>
      <rect width={w} height={h} rx="6" fill="#10B981" fillOpacity=".18" stroke="#10B981" strokeWidth="2"/>
      <text x={w / 2} y="17" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{title}</text>
      {lesson  && <text x={w / 2} y="29" fontSize="8" fill="#0A2E5D" textAnchor="middle">[{lesson}]</text>}
      {nonParam && <text x={w / 2} y="40" fontSize="8" fill="#64748B" textAnchor="middle" fontStyle="italic">np: {nonParam}</text>}
    </g>
  );
  const Edge = ({ x1, y1, x2, y2, label }) => (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0A2E5D" strokeOpacity=".5" strokeWidth="2"/>
      {label && <text x={(x1 + x2) / 2 + 6} y={(y1 + y2) / 2 + 4}
        fontSize="9" fill="#0A2E5D" fontWeight="700">{label}</text>}
    </g>
  );

  return (
    <svg viewBox="0 0 980 720" className="w-full h-auto">
      <rect width="980" height="720" fill="#fff"/>
      <text x="490" y="22" fontSize="14" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        The Master Decision Tree · choose your test in 60 seconds
      </text>
      <text x="490" y="40" fontSize="10" fill="#64748B" textAnchor="middle">
        Start at the top. Walk down. Land on the green test box. Switch to the italic non-parametric option if assumptions fail.
      </text>

      {/* ROOT — Q1: outcome type */}
      <Q x={390} y={55} w={200} h={44} title="Q1. What TYPE is your OUTCOME?" sub="(the variable you're trying to predict)"/>

      {/* Three Q1 branches */}
      <Edge x1={460} y1={99} x2={130}  y2={140}/>
      <Edge x1={490} y1={99} x2={490}  y2={140}/>
      <Edge x1={520} y1={99} x2={850}  y2={140}/>

      <Branch x={40}  y={140} w={180} title="CONTINUOUS"          sub="(Scale: score, age, KES…)"/>
      <Branch x={400} y={140} w={180} title="BINARY or CATEGORICAL" sub="(yes/no, county, type…)"/>
      <Branch x={760} y={140} w={180} title="SCALE VALIDATION"     sub="(reliability of a scale)"/>

      {/* ════════════════ Left subtree — CONTINUOUS outcome ════════════════ */}
      <Edge x1={130} y1={178} x2={130} y2={210}/>
      <Q x={40} y={210} w={180} title="Q2. What is your predictor?" sub=""/>

      {/* Continuous Q2 splits to: 1 sample / groups / continuous predictor */}
      <Edge x1={75}  y1={254} x2={45}  y2={290} label="1 sample"/>
      <Edge x1={130} y1={254} x2={130} y2={290} label="groups"/>
      <Edge x1={185} y1={254} x2={215} y2={290} label="continuous X"/>

      {/* 1-sample leaf */}
      <Leaf x={5}    y={290} w={130} title="One-sample t-test" lesson="ttest-3" nonParam="Wilcoxon"/>

      {/* Groups branch — Q3 independent vs paired */}
      <Branch x={70} y={290} w={120} title="Q3. Independent" sub="or paired groups?"/>

      {/* Continuous predictor — regression */}
      <Q x={195} y={290} w={120} h={38} title="Multiple X?"/>

      {/* Groups Q3 — independent / paired */}
      <Edge x1={100} y1={328} x2={60}  y2={365} label="INDEP"/>
      <Edge x1={160} y1={328} x2={185} y2={365} label="PAIRED"/>

      {/* Independent: 2 vs 3+ */}
      <Q x={10} y={365} w={110} h={36} title="How many?"/>
      <Edge x1={40}  y1={401} x2={20}  y2={430} label="2"/>
      <Edge x1={90}  y1={401} x2={110} y2={430} label="3+"/>
      <Leaf x={0}    y={430} w={100} title="Independent t-test" lesson="ttest-1" nonParam="Mann-Whitney"/>
      <Leaf x={100}  y={430} w={120} title="One-way ANOVA" lesson="anova-1" nonParam="Kruskal-Wallis"/>

      {/* Paired: 2 vs 3+ */}
      <Q x={150} y={365} w={110} h={36} title="How many?"/>
      <Edge x1={180} y1={401} x2={170} y2={430} label="2"/>
      <Edge x1={230} y1={401} x2={260} y2={430} label="3+"/>
      <Leaf x={150}  y={430} w={100} title="Paired t-test" lesson="ttest-2" nonParam="Wilcoxon"/>
      <Leaf x={250}  y={430} w={140} title="Repeated-measures ANOVA" lesson="anova-4" nonParam="Friedman"/>

      {/* Continuous-predictor branch (regression) */}
      <Edge x1={235} y1={328} x2={235} y2={365} label="NO"/>
      <Edge x1={275} y1={328} x2={295} y2={365} label="YES"/>
      <Leaf x={195}  y={365} w={80}  title="Pearson r" lesson="cor-1" nonParam="Spearman"/>
      <Leaf x={285}  y={365} w={110} title="Simple regression" lesson="reg-1"/>
      <Leaf x={285}  y={420} w={110} title="Multiple regression" lesson="reg-2"/>
      <Edge x1={340} y1={409} x2={340} y2={420}/>

      {/* Two-way ANOVA callout (overlay box) */}
      <g transform="translate(10, 520)">
        <rect width="380" height="56" rx="6" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
        <text x="190" y="20" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
          Two GROUPING factors at once?
        </text>
        <text x="190" y="36" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">→ Two-way ANOVA [anova-3]</text>
        <text x="190" y="50" fontSize="9" fill="#64748B" textAnchor="middle">e.g. method (A/B/C) × gender (M/F) on exam score</text>
      </g>

      {/* ════════════════ Middle subtree — Binary / Categorical outcome ════════════════ */}
      <Edge x1={490} y1={178} x2={490} y2={210}/>
      <Q x={400} y={210} w={180} title="Q2. What is your predictor?"/>

      <Edge x1={440} y1={254} x2={420} y2={290} label="categorical"/>
      <Edge x1={540} y1={254} x2={560} y2={290} label="mixed → binary Y"/>

      <Leaf x={350} y={290} w={170} h={50} title="Chi-square test" lesson="forthcoming" nonParam="Fisher's exact"/>
      <Leaf x={530} y={290} w={170} h={50} title="Binary logistic regression" lesson="reg-4"/>

      <Leaf x={350} y={355} w={170} title="Chi-square goodness-of-fit" lesson="forthcoming"/>
      <Edge x1={435} y1={340} x2={435} y2={355}/>

      <Leaf x={530} y={355} w={170} title="Multinomial / ordinal logistic" lesson="forthcoming"/>
      <Edge x1={615} y1={340} x2={615} y2={355}/>

      {/* ════════════════ Right subtree — Scale validation ════════════════ */}
      <Edge x1={850} y1={178} x2={850} y2={210}/>
      <Q x={760} y={210} w={180} title="Reliability of a multi-item scale"/>

      <Edge x1={800} y1={254} x2={790} y2={290}/>
      <Edge x1={850} y1={254} x2={850} y2={290}/>
      <Edge x1={900} y1={254} x2={910} y2={290}/>

      <Leaf x={720} y={290} w={140} title="Cronbach's alpha" lesson="rel-1"/>
      <Leaf x={780} y={355} w={140} title="Item-total statistics" lesson="rel-2"/>
      <Edge x1={850} y1={340} x2={850} y2={355}/>
      <Leaf x={870} y={290} w={120} title="Split-half" lesson="rel-3"/>

      {/* Legend */}
      <g transform="translate(420, 620)">
        <rect width="540" height="86" rx="6" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".2"/>
        <text x="270" y="20" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Legend</text>
        <rect x="20" y="30" width="20" height="14" fill="#0A2E5D"/>
        <text x="48" y="42" fontSize="10" fill="#0A2E5D">Question node (decision point)</text>
        <rect x="20" y="50" width="20" height="14" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
        <text x="48" y="62" fontSize="10" fill="#0A2E5D">Branch (an answer / category)</text>
        <rect x="20" y="70" width="20" height="14" fill="#10B981" fillOpacity=".18" stroke="#10B981" strokeWidth="2"/>
        <text x="48" y="82" fontSize="10" fill="#0A2E5D">Test (your destination — open the [lesson-id] for full walkthrough)</text>
        <text x="300" y="42" fontSize="10" fill="#64748B"><tspan fontStyle="italic">np: …</tspan> = non-parametric backup when assumptions fail</text>
        <text x="300" y="60" fontSize="10" fill="#64748B">forthcoming = lesson is on the curriculum roadmap</text>
        <text x="300" y="78" fontSize="10" fill="#64748B">Master Decision Tree © The Postgraduate Data Hub, Kenya</text>
      </g>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   NON-PARAMETRIC TESTS — illustrations for the four lessons
   ════════════════════════════════════════════════════════════ */

/* ──── Mann-Whitney: ranking logic ──── */
export function MannWhitneyRanks() {
  // Generate sorted income-like values for two groups
  const group1 = [3, 5, 7, 8, 10, 12, 14, 18, 22];          // Obunga (lower)
  const group2 = [6, 9, 11, 13, 16, 19, 24, 30, 45];        // Manyatta (higher)
  // Build combined ranked list
  const combined = [
    ...group1.map((v) => ({ v, g: 'A' })),
    ...group2.map((v) => ({ v, g: 'B' })),
  ].sort((a, b) => a.v - b.v).map((d, i) => ({ ...d, rank: i + 1 }));

  return (
    <svg viewBox="0 0 720 320" className="w-full h-auto">
      <rect width="720" height="320" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Mann-Whitney: pool both groups, rank everyone, compare rank sums
      </text>

      {/* Group A column */}
      <g transform="translate(20, 50)">
        <rect width="120" height="240" rx="6" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".2"/>
        <text x="60" y="18" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Group A (Obunga)</text>
        <text x="60" y="32" fontSize="9" fill="#64748B" textAnchor="middle">raw KES (thousands)</text>
        {group1.map((v, i) => (
          <text key={i} x="60" y={55 + i * 22} fontSize="11" fill="#0A2E5D" textAnchor="middle">{v}</text>
        ))}
      </g>

      {/* Group B column */}
      <g transform="translate(560, 50)">
        <rect width="120" height="240" rx="6" fill="#FBF6E5" stroke="#D4AF37" strokeOpacity=".5"/>
        <text x="60" y="18" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Group B (Manyatta)</text>
        <text x="60" y="32" fontSize="9" fill="#64748B" textAnchor="middle">raw KES (thousands)</text>
        {group2.map((v, i) => (
          <text key={i} x="60" y={55 + i * 22} fontSize="11" fill="#0A2E5D" textAnchor="middle">{v}</text>
        ))}
      </g>

      {/* Combined sorted ranking column */}
      <g transform="translate(180, 50)">
        <rect width="360" height="240" rx="6" fill="#10B981" fillOpacity=".08" stroke="#10B981" strokeWidth="2"/>
        <text x="180" y="18" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
          Pooled, sorted, and ranked
        </text>
        <text x="180" y="32" fontSize="9" fill="#64748B" textAnchor="middle">A = blue · B = gold</text>
        {combined.map((d, i) => (
          <g key={i} transform={`translate(0, ${50 + i * 12})`}>
            <text x="40" y="0" fontSize="9" fill="#64748B" textAnchor="end">rank {d.rank}</text>
            <text x="80" y="0" fontSize="10"
              fill={d.g === 'A' ? '#0A2E5D' : '#D4AF37'}
              fontWeight="700">{d.v}</text>
            <text x="120" y="0" fontSize="9"
              fill={d.g === 'A' ? '#0A2E5D' : '#D4AF37'}
              fontWeight="700">{d.g === 'A' ? 'Obunga' : 'Manyatta'}</text>
          </g>
        ))}
      </g>

      {/* Bottom narration */}
      <text x="360" y="312" fontSize="10" fill="#64748B" textAnchor="middle">
        Sum of ranks(A) = small? → A tends to outrank B = lower.  Sum of ranks(B) = large? → B = higher.
      </text>
    </svg>
  );
}

/* ──── Mann-Whitney: dialog ──── */
export function MannWhitneyDialog() {
  return (
    <svg viewBox="0 0 540 320" className="w-full h-auto">
      <rect width="540" height="320" fill="#F1F5F9"/>
      <rect x="10" y="10" width="520" height="300" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".4"/>
      <rect x="10" y="10" width="520" height="26" rx="6" fill="#0A2E5D"/>
      <text x="20" y="28" fontSize="12" fill="#fff" fontWeight="700">Two-Independent-Samples Tests</text>

      <rect x="20" y="50" width="160" height="240" rx="4" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".25"/>
      <text x="100" y="68" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Available variables</text>
      <text x="30" y="92" fontSize="10" fill="#0A2E5D">household_id</text>
      <text x="30" y="110" fontSize="10" fill="#0A2E5D">size</text>
      <text x="30" y="128" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">monthly_income ✓</text>
      <text x="30" y="146" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">settlement ✓</text>

      <text x="195" y="100" fontSize="18" fill="#0A2E5D" fontWeight="700">▶</text>
      <text x="195" y="190" fontSize="18" fill="#0A2E5D" fontWeight="700">▶</text>

      <rect x="220" y="58" width="190" height="60" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="74" fontSize="10" fill="#0A2E5D" fontWeight="700">Test Variable List:</text>
      <rect x="228" y="82" width="175" height="22" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="234" y="97" fontSize="10" fill="#0A2E5D" fontWeight="700">monthly_income</text>

      <rect x="220" y="135" width="190" height="60" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="151" fontSize="10" fill="#0A2E5D" fontWeight="700">Grouping Variable:</text>
      <rect x="228" y="159" width="175" height="22" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="234" y="174" fontSize="10" fill="#0A2E5D" fontWeight="700">settlement(1 2)</text>

      <rect x="220" y="205" width="130" height="22" rx="3" fill="#0A2E5D"/>
      <text x="285" y="220" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Define Groups…</text>

      {/* Test type checklist */}
      <rect x="220" y="240" width="190" height="60" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="256" fontSize="10" fill="#0A2E5D" fontWeight="700">Test Type</text>
      <rect x="228" y="263" width="10" height="10" fill="#10B981"/>
      <text x="244" y="272" fontSize="10" fill="#0A2E5D" fontWeight="700">Mann-Whitney U</text>
      <rect x="228" y="280" width="10" height="10" fill="#fff" stroke="#0A2E5D"/>
      <text x="244" y="289" fontSize="9" fill="#64748B">Kolmogorov-Smirnov Z</text>

      <rect x="425" y="58" width="100" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="475" y="74" fontSize="10" fill="#0A2E5D" textAnchor="middle">Options…</text>
      <rect x="425" y="270" width="45" height="28" rx="3" fill="#10B981"/>
      <text x="447" y="289" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="475" y="270" width="50" height="28" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="500" y="289" fontSize="10" fill="#0A2E5D" textAnchor="middle">Paste</text>
    </svg>
  );
}

/* ──── Mann-Whitney: output ──── */
export function MannWhitneyOutput() {
  return (
    <svg viewBox="0 0 700 280" className="w-full h-auto">
      <rect width="700" height="280" fill="#fff"/>

      {/* Table 1 — Ranks */}
      <text x="10" y="18" fontSize="11" fill="#0A2E5D" fontWeight="700">Table 1 — Ranks</text>
      <rect x="10" y="24" width="680" height="22" fill="#0A2E5D"/>
      <text x="120" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">settlement</text>
      <text x="280" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">N</text>
      <text x="440" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Mean Rank</text>
      <text x="610" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Sum of Ranks</text>

      <rect x="10" y="46" width="680" height="22" fill="#FAF7EF"/>
      <text x="50" y="61" fontSize="10" fill="#0A2E5D">monthly_income  Obunga</text>
      <text x="280" y="61" fontSize="10" fill="#0A2E5D" textAnchor="middle">22</text>
      <text x="440" y="61" fontSize="10" fill="#0A2E5D" textAnchor="middle">17.55</text>
      <text x="610" y="61" fontSize="10" fill="#0A2E5D" textAnchor="middle">386.00</text>

      <rect x="10" y="68" width="680" height="22" fill="#FBF6E5"/>
      <text x="180" y="83" fontSize="10" fill="#0A2E5D">Manyatta</text>
      <text x="280" y="83" fontSize="10" fill="#0A2E5D" textAnchor="middle">20</text>
      <text x="440" y="83" fontSize="10" fill="#10B981" textAnchor="middle" fontWeight="700">25.93</text>
      <text x="610" y="83" fontSize="10" fill="#0A2E5D" textAnchor="middle">518.50</text>

      <rect x="10" y="90" width="680" height="22" fill="#fff" stroke="#E2E8F0"/>
      <text x="180" y="105" fontSize="10" fill="#0A2E5D">Total</text>
      <text x="280" y="105" fontSize="10" fill="#0A2E5D" textAnchor="middle">42</text>

      {/* Table 2 — Test Statistics */}
      <text x="10" y="142" fontSize="11" fill="#0A2E5D" fontWeight="700">Table 2 — Test Statistics</text>
      <rect x="10" y="148" width="680" height="22" fill="#0A2E5D"/>
      <text x="350" y="164" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">monthly_income</text>

      <rect x="10" y="170" width="680" height="22" fill="#FAF7EF"/>
      <text x="40"  y="185" fontSize="10" fill="#0A2E5D">Mann-Whitney U</text>
      <text x="640" y="185" fontSize="11" fill="#10B981" textAnchor="end" fontWeight="700">133.0</text>

      <rect x="10" y="192" width="680" height="22" fill="#fff" stroke="#E2E8F0"/>
      <text x="40"  y="207" fontSize="10" fill="#0A2E5D">Wilcoxon W</text>
      <text x="640" y="207" fontSize="11" fill="#0A2E5D" textAnchor="end">386.0</text>

      <rect x="10" y="214" width="680" height="22" fill="#FAF7EF"/>
      <text x="40"  y="229" fontSize="10" fill="#0A2E5D">Z</text>
      <text x="640" y="229" fontSize="11" fill="#10B981" textAnchor="end" fontWeight="700">−2.21</text>

      <rect x="10" y="236" width="680" height="22" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
      <text x="40"  y="251" fontSize="10" fill="#0A2E5D" fontWeight="700">Asymp. Sig. (2-tailed)</text>
      <text x="640" y="251" fontSize="12" fill="#10B981" textAnchor="end" fontWeight="700">.027</text>

      <text x="10" y="275" fontSize="9" fill="#64748B">
        Manyatta\'s higher mean rank (25.93 vs 17.55) + significant p → Manyatta households tend to have higher incomes.
      </text>
    </svg>
  );
}

/* ──── Wilcoxon signed-rank: how signed ranks work ──── */
export function WilcoxonSignedRanks() {
  const rows = [
    { id: 'P1',  before: 16, after: 14, diff: -2, abs: 2, rank: 6,  sign: '−' },
    { id: 'P2',  before: 17, after: 12, diff: -5, abs: 5, rank: 11, sign: '−' },
    { id: 'P3',  before: 12, after: 12, diff:  0, abs: 0, rank: '—', sign: 'tie' },
    { id: 'P4',  before: 13, after: 14, diff: +1, abs: 1, rank: 2.5, sign: '+' },
    { id: 'P5',  before: 18, after: 10, diff: -8, abs: 8, rank: 12, sign: '−' },
    { id: 'P6',  before: 14, after: 11, diff: -3, abs: 3, rank: 8,  sign: '−' },
    { id: 'P7',  before: 11, after: 12, diff: +1, abs: 1, rank: 2.5, sign: '+' },
    { id: 'P8',  before: 15, after: 13, diff: -2, abs: 2, rank: 6,  sign: '−' },
  ];
  return (
    <svg viewBox="0 0 740 360" className="w-full h-auto">
      <rect width="740" height="360" fill="#fff"/>
      <text x="370" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Wilcoxon: rank |differences|, then re-attach the original signs
      </text>

      <rect x="10" y="36" width="720" height="22" fill="#0A2E5D"/>
      <text x="50"  y="51" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">ID</text>
      <text x="135" y="51" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Before</text>
      <text x="225" y="51" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">After</text>
      <text x="335" y="51" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Diff (After − Before)</text>
      <text x="455" y="51" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">|Diff|</text>
      <text x="560" y="51" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Rank of |Diff|</text>
      <text x="685" y="51" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Signed Rank</text>

      {rows.map((r, i) => {
        const y = 60 + i * 22;
        const bg = i % 2 === 0 ? '#FAF7EF' : '#fff';
        const isTie = r.sign === 'tie';
        const sign = r.sign === '−' ? '−' : r.sign === '+' ? '+' : '—';
        const signColor = isTie ? '#94A3B8' : (sign === '−' ? '#10B981' : '#EF4444');
        return (
          <g key={r.id}>
            <rect x="10" y={y} width="720" height="22" fill={bg}/>
            <text x="50"  y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.id}</text>
            <text x="135" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.before}</text>
            <text x="225" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.after}</text>
            <text x="335" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle"
              fontWeight={isTie ? "400" : "700"}>
              {isTie ? '0' : (r.diff > 0 ? '+' + r.diff : r.diff)}
            </text>
            <text x="455" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">
              {isTie ? '—' : r.abs}
            </text>
            <text x="560" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.rank}</text>
            <text x="685" y={y + 15} fontSize="10" fill={signColor} textAnchor="middle" fontWeight="700">
              {isTie ? 'DROPPED (tie)' : (sign + r.rank)}
            </text>
          </g>
        );
      })}

      {/* Rank-sum summary */}
      <g transform="translate(10, 250)">
        <rect width="720" height="50" rx="6" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
        <text x="20" y="22" fontSize="11" fill="#0A2E5D" fontWeight="700">
          Σ Negative ranks = 6 + 11 + 12 + 8 + 6 = <tspan fill="#10B981">43</tspan>
        </text>
        <text x="20" y="40" fontSize="11" fill="#0A2E5D" fontWeight="700">
          Σ Positive ranks = 2.5 + 2.5 = <tspan fill="#EF4444">5</tspan>
        </text>
        <text x="400" y="32" fontSize="11" fill="#0A2E5D" fontWeight="700">
          W = min(43, 5) = <tspan fill="#10B981" fontWeight="700">5</tspan>  → large imbalance → likely significant
        </text>
      </g>
      <text x="370" y="318" fontSize="10" fill="#64748B" textAnchor="middle">
        Most ranks are negative (After &lt; Before) → anxiety dropped. Tied case (P3) is dropped from the test.
      </text>
      <text x="370" y="335" fontSize="10" fill="#64748B" textAnchor="middle">
        Tied |Diff| values share the average rank (rank 2 and 3 both become 2.5).
      </text>
    </svg>
  );
}

/* ──── Wilcoxon: dialog ──── */
export function WilcoxonDialog() {
  return (
    <svg viewBox="0 0 540 320" className="w-full h-auto">
      <rect width="540" height="320" fill="#F1F5F9"/>
      <rect x="10" y="10" width="520" height="300" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".4"/>
      <rect x="10" y="10" width="520" height="26" rx="6" fill="#0A2E5D"/>
      <text x="20" y="28" fontSize="12" fill="#fff" fontWeight="700">Two-Related-Samples Tests</text>

      <rect x="20" y="50" width="160" height="240" rx="4" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".25"/>
      <text x="100" y="68" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Available variables</text>
      <text x="30" y="92"  fontSize="10" fill="#0A2E5D">student_id</text>
      <text x="30" y="110" fontSize="10" fill="#0A2E5D">year</text>
      <text x="30" y="128" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">anxiety_before ✓</text>
      <text x="30" y="146" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">anxiety_after ✓</text>

      <text x="195" y="170" fontSize="18" fill="#0A2E5D" fontWeight="700">▶</text>

      {/* Paired variables box */}
      <rect x="220" y="58" width="200" height="180" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="74" fontSize="10" fill="#0A2E5D" fontWeight="700">Test Pairs:</text>

      <rect x="225" y="80" width="190" height="20" fill="#E2E8F0"/>
      <text x="240" y="94" fontSize="9" fill="#0A2E5D" fontWeight="700">Pair</text>
      <text x="295" y="94" fontSize="9" fill="#0A2E5D" fontWeight="700">Variable 1</text>
      <text x="370" y="94" fontSize="9" fill="#0A2E5D" fontWeight="700">Variable 2</text>

      <text x="240" y="116" fontSize="10" fill="#0A2E5D" fontWeight="700">1</text>
      <rect x="265" y="105" width="75" height="18" rx="2" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="303" y="118" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">anxiety_before</text>
      <rect x="345" y="105" width="70" height="18" rx="2" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="380" y="118" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">anxiety_after</text>

      <text x="225" y="160" fontSize="9" fill="#64748B">SPSS computes diff = Variable 2 − Variable 1</text>
      <text x="225" y="174" fontSize="9" fill="#64748B">Negative ranks dominate when anxiety drops.</text>

      {/* Test type checklist */}
      <rect x="225" y="186" width="185" height="48" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="232" y="200" fontSize="9" fill="#0A2E5D" fontWeight="700">Test Type</text>
      <rect x="232" y="207" width="10" height="10" fill="#10B981"/>
      <text x="248" y="216" fontSize="10" fill="#0A2E5D" fontWeight="700">Wilcoxon</text>
      <rect x="232" y="222" width="10" height="10" fill="#fff" stroke="#0A2E5D"/>
      <text x="248" y="231" fontSize="9" fill="#64748B">Sign  ·  McNemar</text>

      <rect x="430" y="58" width="90" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="475" y="74" fontSize="10" fill="#0A2E5D" textAnchor="middle">Options…</text>
      <rect x="430" y="250" width="40" height="28" rx="3" fill="#10B981"/>
      <text x="450" y="269" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="475" y="250" width="45" height="28" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="497" y="269" fontSize="10" fill="#0A2E5D" textAnchor="middle">Paste</text>
    </svg>
  );
}

/* ──── Wilcoxon: output ──── */
export function WilcoxonOutput() {
  return (
    <svg viewBox="0 0 700 280" className="w-full h-auto">
      <rect width="700" height="280" fill="#fff"/>

      {/* Table 1 — Ranks */}
      <text x="10" y="18" fontSize="11" fill="#0A2E5D" fontWeight="700">Table 1 — Ranks</text>
      <rect x="10" y="24" width="680" height="22" fill="#0A2E5D"/>
      <text x="270" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">N</text>
      <text x="430" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Mean Rank</text>
      <text x="600" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Sum of Ranks</text>

      <rect x="10" y="46" width="680" height="22" fill="#FAF7EF"/>
      <text x="40" y="61" fontSize="10" fill="#0A2E5D" fontWeight="700">anxiety_after − anxiety_before</text>
      <text x="40" y="75" fontSize="9"  fill="#0A2E5D">Negative Ranks (improved)</text>
      <text x="270" y="75" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">18</text>
      <text x="430" y="75" fontSize="11" fill="#0A2E5D" textAnchor="middle">12.42</text>
      <text x="600" y="75" fontSize="11" fill="#0A2E5D" textAnchor="middle">223.50</text>

      <rect x="10" y="88" width="680" height="22" fill="#fff" stroke="#E2E8F0"/>
      <text x="40"  y="103" fontSize="9" fill="#0A2E5D">Positive Ranks (got worse)</text>
      <text x="270" y="103" fontSize="11" fill="#EF4444" textAnchor="middle" fontWeight="700">4</text>
      <text x="430" y="103" fontSize="11" fill="#0A2E5D" textAnchor="middle">7.13</text>
      <text x="600" y="103" fontSize="11" fill="#0A2E5D" textAnchor="middle">28.50</text>

      <rect x="10" y="110" width="680" height="22" fill="#FAF7EF"/>
      <text x="40"  y="125" fontSize="9" fill="#0A2E5D">Ties (no change)</text>
      <text x="270" y="125" fontSize="11" fill="#94A3B8" textAnchor="middle" fontWeight="700">2</text>

      <rect x="10" y="132" width="680" height="22" fill="#fff" stroke="#E2E8F0"/>
      <text x="40"  y="147" fontSize="9" fill="#0A2E5D" fontWeight="700">Total</text>
      <text x="270" y="147" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">24</text>

      {/* Table 2 — Test Statistics */}
      <text x="10" y="180" fontSize="11" fill="#0A2E5D" fontWeight="700">Table 2 — Test Statistics</text>
      <rect x="10" y="186" width="680" height="22" fill="#0A2E5D"/>
      <text x="350" y="202" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">anxiety_after − anxiety_before</text>

      <rect x="10" y="208" width="680" height="22" fill="#FAF7EF"/>
      <text x="40" y="223" fontSize="10" fill="#0A2E5D">Z</text>
      <text x="640" y="223" fontSize="12" fill="#10B981" textAnchor="end" fontWeight="700">−3.16</text>

      <rect x="10" y="230" width="680" height="22" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
      <text x="40" y="245" fontSize="10" fill="#0A2E5D" fontWeight="700">Asymp. Sig. (2-tailed)</text>
      <text x="640" y="245" fontSize="12" fill="#10B981" textAnchor="end" fontWeight="700">.002</text>

      <text x="10" y="270" fontSize="9" fill="#64748B">
        Strong negative-rank dominance (18 improved vs 4 got worse) + Z=−3.16 → anxiety reduced significantly.
      </text>
    </svg>
  );
}

/* ──── Kruskal-Wallis: ranking logic ──── */
export function KruskalWallisLogic() {
  const groups = [
    { name: 'Traditional',   colour: '#0A2E5D', ranks: [3, 4, 6, 9, 14, 15, 21, 26] },
    { name: 'Accumulating',  colour: '#D4AF37', ranks: [5, 8, 10, 13, 17, 22, 23, 28] },
    { name: 'Digital',       colour: '#10B981', ranks: [1, 2, 7, 11, 12, 16, 18, 19, 20, 24, 25, 27] },
  ];
  // For the dot plot, place each rank on a horizontal axis
  const xFor = (rank) => 60 + (rank - 1) * 22;

  return (
    <svg viewBox="0 0 720 320" className="w-full h-auto">
      <rect width="720" height="320" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Kruskal-Wallis: pool all k groups, rank everyone, compare per-group rank sums
      </text>

      {/* Axis */}
      <line x1="60" y1="270" x2="660" y2="270" stroke="#0A2E5D" strokeOpacity=".3"/>
      {[1, 5, 10, 15, 20, 25].map((tick) => (
        <g key={tick}>
          <line x1={xFor(tick)} y1="265" x2={xFor(tick)} y2="275" stroke="#0A2E5D" strokeOpacity=".3"/>
          <text x={xFor(tick)} y="288" fontSize="9" fill="#64748B" textAnchor="middle">rank {tick}</text>
        </g>
      ))}
      <text x="360" y="304" fontSize="10" fill="#64748B" textAnchor="middle">
        Pooled rank position (1 = lowest revenue, 28 = highest)
      </text>

      {/* Three rows of dots */}
      {groups.map((g, gi) => {
        const y = 70 + gi * 60;
        const rankSum = g.ranks.reduce((a, b) => a + b, 0);
        const meanRank = (rankSum / g.ranks.length).toFixed(1);
        return (
          <g key={g.name}>
            <text x="55" y={y + 5} fontSize="11" fill={g.colour} textAnchor="end" fontWeight="700">{g.name}</text>
            <text x="55" y={y + 22} fontSize="9" fill="#64748B" textAnchor="end">n = {g.ranks.length}</text>
            {g.ranks.map((r, ri) => (
              <circle key={ri} cx={xFor(r)} cy={y} r="7" fill={g.colour} opacity=".8"/>
            ))}
            <text x="680" y={y - 4} fontSize="10" fill={g.colour} textAnchor="start" fontWeight="700">
              ΣR = {rankSum}
            </text>
            <text x="680" y={y + 10} fontSize="9" fill="#64748B" textAnchor="start">
              meanR = {meanRank}
            </text>
          </g>
        );
      })}

      {/* Title strip */}
      <g transform="translate(60, 230)">
        <rect width="600" height="28" rx="4" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
        <text x="300" y="18" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
          Mean ranks differ markedly → H is large → at least one group differs
        </text>
      </g>
    </svg>
  );
}

/* ──── Kruskal-Wallis: dialog ──── */
export function KruskalWallisDialog() {
  return (
    <svg viewBox="0 0 540 320" className="w-full h-auto">
      <rect width="540" height="320" fill="#F1F5F9"/>
      <rect x="10" y="10" width="520" height="300" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".4"/>
      <rect x="10" y="10" width="520" height="26" rx="6" fill="#0A2E5D"/>
      <text x="20" y="28" fontSize="12" fill="#fff" fontWeight="700">Tests for Several Independent Samples</text>

      <rect x="20" y="50" width="160" height="240" rx="4" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".25"/>
      <text x="100" y="68" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Available variables</text>
      <text x="30" y="92"  fontSize="10" fill="#0A2E5D">entrepreneur_id</text>
      <text x="30" y="110" fontSize="10" fill="#0A2E5D">age</text>
      <text x="30" y="128" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">monthly_revenue ✓</text>
      <text x="30" y="146" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">chama_type ✓</text>

      <text x="195" y="100" fontSize="18" fill="#0A2E5D" fontWeight="700">▶</text>
      <text x="195" y="190" fontSize="18" fill="#0A2E5D" fontWeight="700">▶</text>

      <rect x="220" y="58" width="190" height="60" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="74" fontSize="10" fill="#0A2E5D" fontWeight="700">Test Variable List:</text>
      <rect x="228" y="82" width="175" height="22" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="234" y="97" fontSize="10" fill="#0A2E5D" fontWeight="700">monthly_revenue</text>

      <rect x="220" y="135" width="190" height="60" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="151" fontSize="10" fill="#0A2E5D" fontWeight="700">Grouping Variable:</text>
      <rect x="228" y="159" width="175" height="22" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="234" y="174" fontSize="10" fill="#0A2E5D" fontWeight="700">chama_type(1 3)</text>

      <rect x="220" y="205" width="120" height="22" rx="3" fill="#0A2E5D"/>
      <text x="280" y="220" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Define Range…</text>

      <rect x="220" y="240" width="190" height="60" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="256" fontSize="10" fill="#0A2E5D" fontWeight="700">Test Type</text>
      <rect x="228" y="263" width="10" height="10" fill="#10B981"/>
      <text x="244" y="272" fontSize="10" fill="#0A2E5D" fontWeight="700">Kruskal-Wallis H</text>
      <rect x="228" y="280" width="10" height="10" fill="#fff" stroke="#0A2E5D"/>
      <text x="244" y="289" fontSize="9" fill="#64748B">Median · Jonckheere-Terpstra</text>

      <rect x="425" y="58" width="100" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="475" y="74" fontSize="10" fill="#0A2E5D" textAnchor="middle">Options…</text>
      <rect x="425" y="270" width="45" height="28" rx="3" fill="#10B981"/>
      <text x="447" y="289" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="475" y="270" width="50" height="28" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="500" y="289" fontSize="10" fill="#0A2E5D" textAnchor="middle">Paste</text>
    </svg>
  );
}

/* ──── Kruskal-Wallis: output ──── */
export function KruskalWallisOutput() {
  return (
    <svg viewBox="0 0 700 300" className="w-full h-auto">
      <rect width="700" height="300" fill="#fff"/>

      <text x="10" y="18" fontSize="11" fill="#0A2E5D" fontWeight="700">Table 1 — Ranks</text>
      <rect x="10" y="24" width="680" height="22" fill="#0A2E5D"/>
      <text x="200" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">chama_type</text>
      <text x="430" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">N</text>
      <text x="600" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Mean Rank</text>

      <rect x="10" y="46" width="680" height="22" fill="#FAF7EF"/>
      <text x="40" y="61" fontSize="10" fill="#0A2E5D">monthly_revenue   Traditional</text>
      <text x="430" y="61" fontSize="10" fill="#0A2E5D" textAnchor="middle">30</text>
      <text x="600" y="61" fontSize="11" fill="#0A2E5D" textAnchor="middle">32.10</text>

      <rect x="10" y="68" width="680" height="22" fill="#fff" stroke="#E2E8F0"/>
      <text x="180" y="83" fontSize="10" fill="#0A2E5D">Accumulating</text>
      <text x="430" y="83" fontSize="10" fill="#0A2E5D" textAnchor="middle">28</text>
      <text x="600" y="83" fontSize="11" fill="#0A2E5D" textAnchor="middle">41.70</text>

      <rect x="10" y="90" width="680" height="22" fill="#FBF6E5"/>
      <text x="180" y="105" fontSize="10" fill="#0A2E5D">Digital</text>
      <text x="430" y="105" fontSize="10" fill="#0A2E5D" textAnchor="middle">29</text>
      <text x="600" y="105" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">58.40</text>

      <rect x="10" y="112" width="680" height="22" fill="#fff" stroke="#E2E8F0"/>
      <text x="180" y="127" fontSize="10" fill="#0A2E5D" fontWeight="700">Total</text>
      <text x="430" y="127" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">87</text>

      <text x="10" y="164" fontSize="11" fill="#0A2E5D" fontWeight="700">Table 2 — Test Statistics</text>
      <rect x="10" y="170" width="680" height="22" fill="#0A2E5D"/>
      <text x="350" y="186" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">monthly_revenue</text>

      <rect x="10" y="192" width="680" height="22" fill="#FAF7EF"/>
      <text x="40" y="207" fontSize="10" fill="#0A2E5D">Chi-Square (H)</text>
      <text x="640" y="207" fontSize="12" fill="#10B981" textAnchor="end" fontWeight="700">12.84</text>

      <rect x="10" y="214" width="680" height="22" fill="#fff" stroke="#E2E8F0"/>
      <text x="40" y="229" fontSize="10" fill="#0A2E5D">df</text>
      <text x="640" y="229" fontSize="11" fill="#0A2E5D" textAnchor="end">2</text>

      <rect x="10" y="236" width="680" height="22" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
      <text x="40" y="251" fontSize="10" fill="#0A2E5D" fontWeight="700">Asymp. Sig.</text>
      <text x="640" y="251" fontSize="12" fill="#10B981" textAnchor="end" fontWeight="700">.002</text>

      <text x="10" y="288" fontSize="9" fill="#64748B">
        Significant H → at least one chama differs. Mean-rank ordering Trad &lt; Acc &lt; Digital. Run pairwise Mann-Whitney + Bonferroni next.
      </text>
    </svg>
  );
}

/* ──── Friedman: within-row ranking ──── */
export function FriedmanRanks() {
  const patients = [
    { id: 'P1', vals: [8.4, 7.8, 7.2] },
    { id: 'P2', vals: [9.0, 8.1, 7.4] },
    { id: 'P3', vals: [11.2, 9.0, 6.8] },
    { id: 'P4', vals: [7.6, 7.5, 7.5] },     // partial tie
    { id: 'P5', vals: [10.4, 8.8, 6.2] },
    { id: 'P6', vals: [8.0, 7.9, 7.3] },
  ];
  const rankRow = (vs) => {
    const sorted = [...vs].map((v, i) => ({ v, i })).sort((a, b) => a.v - b.v);
    // assign ranks (with average for ties)
    const ranks = Array(vs.length).fill(0);
    let i = 0;
    while (i < sorted.length) {
      let j = i;
      while (j + 1 < sorted.length && sorted[j + 1].v === sorted[i].v) j++;
      const avg = (i + j + 2) / 2;
      for (let k = i; k <= j; k++) ranks[sorted[k].i] = avg;
      i = j + 1;
    }
    return ranks;
  };

  return (
    <svg viewBox="0 0 720 360" className="w-full h-auto">
      <rect width="720" height="360" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Friedman: rank each patient\'s row across the time points
      </text>

      {/* Raw values table */}
      <g transform="translate(20, 40)">
        <text x="160" y="14" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Raw HbA1c (%)</text>
        <rect x="0" y="20" width="320" height="22" fill="#0A2E5D"/>
        <text x="40"  y="35" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">ID</text>
        <text x="130" y="35" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Baseline</text>
        <text x="220" y="35" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Month 3</text>
        <text x="295" y="35" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Month 6</text>
        {patients.map((p, i) => {
          const y = 42 + i * 22;
          const bg = i % 2 === 0 ? '#FAF7EF' : '#fff';
          return (
            <g key={p.id}>
              <rect x="0" y={y} width="320" height="22" fill={bg}/>
              <text x="40"  y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{p.id}</text>
              {p.vals.map((v, j) => (
                <text key={j} x={[130, 220, 295][j]} y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">
                  {v.toFixed(1)}
                </text>
              ))}
            </g>
          );
        })}
      </g>

      {/* Arrow */}
      <g transform="translate(345, 130)">
        <text x="0" y="-12" fontSize="11" fill="#D4AF37" textAnchor="middle" fontWeight="700">Rank WITHIN</text>
        <text x="0" y="0"   fontSize="11" fill="#D4AF37" textAnchor="middle" fontWeight="700">each row</text>
        <text x="0" y="22" fontSize="22" fill="#D4AF37" textAnchor="middle" fontWeight="700">▶</text>
      </g>

      {/* Ranked table */}
      <g transform="translate(380, 40)">
        <text x="160" y="14" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Within-row ranks (1=low, 3=high)</text>
        <rect x="0" y="20" width="320" height="22" fill="#10B981" fillOpacity=".25"/>
        <text x="40"  y="35" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">ID</text>
        <text x="130" y="35" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Baseline</text>
        <text x="220" y="35" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Month 3</text>
        <text x="295" y="35" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Month 6</text>
        {patients.map((p, i) => {
          const y = 42 + i * 22;
          const ranks = rankRow(p.vals);
          const bg = i % 2 === 0 ? '#FBF6E5' : '#fff';
          return (
            <g key={p.id}>
              <rect x="0" y={y} width="320" height="22" fill={bg}/>
              <text x="40"  y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{p.id}</text>
              {ranks.map((r, j) => (
                <text key={j} x={[130, 220, 295][j]} y={y + 15} fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
                  {r}
                </text>
              ))}
            </g>
          );
        })}
        {/* Sum row */}
        <rect x="0" y={42 + patients.length * 22} width="320" height="24" fill="#0A2E5D"/>
        <text x="40"  y={42 + patients.length * 22 + 16} fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Σ ranks →</text>
        {(() => {
          // compute column sums
          const sums = [0, 0, 0];
          patients.forEach((p) => {
            const ranks = rankRow(p.vals);
            ranks.forEach((r, j) => { sums[j] += r; });
          });
          return sums.map((s, j) => (
            <text key={j} x={[130, 220, 295][j]} y={42 + patients.length * 22 + 16}
              fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">{s}</text>
          ));
        })()}
      </g>

      {/* Narration */}
      <g transform="translate(20, 290)">
        <rect width="680" height="56" rx="6" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
        <text x="340" y="22" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
          Baseline column sum is HIGHEST · Month 6 column sum is LOWEST → systematic improvement across time
        </text>
        <text x="340" y="42" fontSize="10" fill="#0A2E5D" textAnchor="middle">
          Friedman χ²_F measures how unequal these column sums are. Big imbalance → significant change.
        </text>
      </g>
    </svg>
  );
}

/* ──── Friedman: dialog ──── */
export function FriedmanDialog() {
  return (
    <svg viewBox="0 0 540 320" className="w-full h-auto">
      <rect width="540" height="320" fill="#F1F5F9"/>
      <rect x="10" y="10" width="520" height="300" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".4"/>
      <rect x="10" y="10" width="520" height="26" rx="6" fill="#0A2E5D"/>
      <text x="20" y="28" fontSize="12" fill="#fff" fontWeight="700">Tests for Several Related Samples</text>

      <rect x="20" y="50" width="160" height="240" rx="4" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".25"/>
      <text x="100" y="68" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Available variables</text>
      <text x="30" y="92"  fontSize="10" fill="#0A2E5D">patient_id</text>
      <text x="30" y="110" fontSize="10" fill="#0A2E5D">age</text>
      <text x="30" y="128" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">hba1c_baseline ✓</text>
      <text x="30" y="146" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">hba1c_month3  ✓</text>
      <text x="30" y="164" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">hba1c_month6  ✓</text>

      <text x="195" y="160" fontSize="18" fill="#0A2E5D" fontWeight="700">▶</text>

      <rect x="220" y="58" width="200" height="135" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="74" fontSize="10" fill="#0A2E5D" fontWeight="700">Test Variables:</text>
      <rect x="228" y="82" width="185" height="20" rx="2" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="234" y="96" fontSize="10" fill="#0A2E5D" fontWeight="700">hba1c_baseline</text>
      <rect x="228" y="106" width="185" height="20" rx="2" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="234" y="120" fontSize="10" fill="#0A2E5D" fontWeight="700">hba1c_month3</text>
      <rect x="228" y="130" width="185" height="20" rx="2" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="234" y="144" fontSize="10" fill="#0A2E5D" fontWeight="700">hba1c_month6</text>
      <text x="225" y="172" fontSize="9" fill="#64748B">Each row = one patient. Each column = one time point.</text>
      <text x="225" y="186" fontSize="9" fill="#64748B">SPSS ranks WITHIN rows across these k columns.</text>

      <rect x="220" y="205" width="200" height="60" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="220" fontSize="10" fill="#0A2E5D" fontWeight="700">Test Type</text>
      <rect x="228" y="227" width="10" height="10" fill="#10B981"/>
      <text x="244" y="236" fontSize="10" fill="#0A2E5D" fontWeight="700">Friedman</text>
      <rect x="228" y="244" width="10" height="10" fill="#fff" stroke="#0A2E5D"/>
      <text x="244" y="253" fontSize="9" fill="#64748B">Kendall\'s W · Cochran\'s Q</text>

      <rect x="430" y="58" width="90" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="475" y="74" fontSize="10" fill="#0A2E5D" textAnchor="middle">Statistics…</text>
      <rect x="430" y="270" width="40" height="28" rx="3" fill="#10B981"/>
      <text x="450" y="289" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="475" y="270" width="45" height="28" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="497" y="289" fontSize="10" fill="#0A2E5D" textAnchor="middle">Paste</text>
    </svg>
  );
}

/* ──── Friedman: output ──── */
export function FriedmanOutput() {
  return (
    <svg viewBox="0 0 700 280" className="w-full h-auto">
      <rect width="700" height="280" fill="#fff"/>

      <text x="10" y="18" fontSize="11" fill="#0A2E5D" fontWeight="700">Table 1 — Ranks</text>
      <rect x="10" y="24" width="680" height="22" fill="#0A2E5D"/>
      <text x="340" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Mean Rank</text>

      <rect x="10" y="46" width="680" height="22" fill="#FAF7EF"/>
      <text x="40" y="61" fontSize="10" fill="#0A2E5D">hba1c_baseline</text>
      <text x="640" y="61" fontSize="11" fill="#10B981" textAnchor="end" fontWeight="700">2.81</text>

      <rect x="10" y="68" width="680" height="22" fill="#fff" stroke="#E2E8F0"/>
      <text x="40" y="83" fontSize="10" fill="#0A2E5D">hba1c_month3</text>
      <text x="640" y="83" fontSize="11" fill="#0A2E5D" textAnchor="end">2.06</text>

      <rect x="10" y="90" width="680" height="22" fill="#FBF6E5"/>
      <text x="40" y="105" fontSize="10" fill="#0A2E5D">hba1c_month6</text>
      <text x="640" y="105" fontSize="11" fill="#10B981" textAnchor="end" fontWeight="700">1.13</text>

      <text x="10" y="142" fontSize="11" fill="#0A2E5D" fontWeight="700">Table 2 — Test Statistics</text>
      <rect x="10" y="148" width="680" height="22" fill="#0A2E5D"/>
      <text x="40" y="164" fontSize="10" fill="#fff" fontWeight="700">N</text>
      <text x="640" y="164" fontSize="11" fill="#fff" textAnchor="end" fontWeight="700">32</text>

      <rect x="10" y="170" width="680" height="22" fill="#FAF7EF"/>
      <text x="40" y="185" fontSize="10" fill="#0A2E5D">Chi-Square (χ²_F)</text>
      <text x="640" y="185" fontSize="12" fill="#10B981" textAnchor="end" fontWeight="700">38.94</text>

      <rect x="10" y="192" width="680" height="22" fill="#fff" stroke="#E2E8F0"/>
      <text x="40" y="207" fontSize="10" fill="#0A2E5D">df</text>
      <text x="640" y="207" fontSize="11" fill="#0A2E5D" textAnchor="end">2</text>

      <rect x="10" y="214" width="680" height="22" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
      <text x="40" y="229" fontSize="10" fill="#0A2E5D" fontWeight="700">Asymp. Sig.</text>
      <text x="640" y="229" fontSize="12" fill="#10B981" textAnchor="end" fontWeight="700">.000</text>

      <text x="10" y="266" fontSize="9" fill="#64748B">
        Mean ranks descend across time (2.81 → 2.06 → 1.13). χ²_F highly significant → HbA1c improved.
        Follow up with pairwise Wilcoxon + Bonferroni. Kendall\'s W = 38.94/(32×2) = .61 (large effect).
      </text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   CHI-SQUARE — three illustrations
   ════════════════════════════════════════════════════════════ */

/* ──── Chi-square logic — observed, expected, contribution per cell ──── */
export function ChiSquareLogic() {
  const observed = [[73, 17], [51, 29], [28, 42]];
  const rowTotals = observed.map((r) => r.reduce((a, b) => a + b));
  const colTotals = [0, 1].map((c) => observed.reduce((a, r) => a + r[c], 0));
  const N = rowTotals.reduce((a, b) => a + b);
  const expected = observed.map((r, i) =>
    r.map((_, j) => (rowTotals[i] * colTotals[j]) / N));
  const contributions = observed.map((r, i) =>
    r.map((o, j) => {
      const e = expected[i][j];
      return Math.pow(o - e, 2) / e;
    }));
  const labels = ['Under 35', '35–49', '50+'];

  const Tab = ({ title, data, colourFor, fmt }) => (
    <g>
      <text x="100" y="-8" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{title}</text>
      {/* Header */}
      <rect x="0" y="0" width="200" height="22" fill="#0A2E5D"/>
      <text x="80"  y="14" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Yes</text>
      <text x="160" y="14" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">No</text>
      {data.map((row, i) => (
        <g key={i} transform={`translate(0, ${22 + i * 26})`}>
          <rect x="0" y="0" width="200" height="26" fill={i % 2 === 0 ? '#FAF7EF' : '#fff'}/>
          <text x="40" y="17" fontSize="9" fill="#0A2E5D" textAnchor="middle">{labels[i]}</text>
          {row.map((v, j) => (
            <text key={j} x={80 + j * 80} y="17" fontSize="11"
              fill={colourFor ? colourFor(v) : '#0A2E5D'} textAnchor="middle" fontWeight="700">
              {fmt ? fmt(v) : v}
            </text>
          ))}
        </g>
      ))}
    </g>
  );

  const chi2 = contributions.flat().reduce((a, b) => a + b, 0);

  return (
    <svg viewBox="0 0 720 320" className="w-full h-auto">
      <rect width="720" height="320" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Chi-square = Σ (Observed − Expected)² ÷ Expected, across every cell
      </text>

      <g transform="translate(20, 60)">
        <Tab title="Observed (O)" data={observed}/>
      </g>
      <g transform="translate(255, 60)">
        <Tab title="Expected (E)" data={expected}
          fmt={(v) => v.toFixed(1)} colourFor={() => '#D4AF37'}/>
      </g>
      <g transform="translate(490, 60)">
        <Tab title="(O − E)² ÷ E" data={contributions}
          fmt={(v) => v.toFixed(2)} colourFor={(v) => v > 4 ? '#10B981' : '#0A2E5D'}/>
      </g>

      {/* Bottom narration */}
      <g transform="translate(20, 240)">
        <rect width="680" height="60" rx="6" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
        <text x="340" y="22" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
          Σ (O − E)² / E = χ² = {chi2.toFixed(2)}  ·  df = (3 − 1) × (2 − 1) = 2
        </text>
        <text x="340" y="42" fontSize="10" fill="#0A2E5D" textAnchor="middle">
          Large χ² with small p → observed differs from expected → variables are associated
        </text>
      </g>
    </svg>
  );
}

/* ──── Crosstabs dialog mock ──── */
export function CrosstabsDialog() {
  return (
    <svg viewBox="0 0 540 320" className="w-full h-auto">
      <rect width="540" height="320" fill="#F1F5F9"/>
      <rect x="10" y="10" width="520" height="300" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".4"/>
      <rect x="10" y="10" width="520" height="26" rx="6" fill="#0A2E5D"/>
      <text x="20" y="28" fontSize="12" fill="#fff" fontWeight="700">Crosstabs</text>

      <rect x="20" y="50" width="160" height="240" rx="4" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".25"/>
      <text x="100" y="68" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Available variables</text>
      <text x="30" y="92"  fontSize="10" fill="#0A2E5D">respondent_id</text>
      <text x="30" y="110" fontSize="10" fill="#0A2E5D">gender</text>
      <text x="30" y="128" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">age_band ✓</text>
      <text x="30" y="146" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">mpesa_adopted ✓</text>

      <text x="195" y="98"  fontSize="18" fill="#0A2E5D" fontWeight="700">▶</text>
      <text x="195" y="158" fontSize="18" fill="#0A2E5D" fontWeight="700">▶</text>

      <rect x="220" y="58" width="190" height="50" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="74" fontSize="10" fill="#0A2E5D" fontWeight="700">Row(s):</text>
      <rect x="228" y="80" width="175" height="22" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="234" y="95" fontSize="10" fill="#0A2E5D" fontWeight="700">age_band</text>

      <rect x="220" y="118" width="190" height="50" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="134" fontSize="10" fill="#0A2E5D" fontWeight="700">Column(s):</text>
      <rect x="228" y="140" width="175" height="22" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="234" y="155" fontSize="10" fill="#0A2E5D" fontWeight="700">mpesa_adopted</text>

      <rect x="220" y="180" width="190" height="50" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="225" y="196" fontSize="10" fill="#0A2E5D" fontWeight="700">Layer 1 of 1:</text>
      <text x="305" y="217" fontSize="10" fill="#94A3B8" textAnchor="middle">(empty)</text>

      {/* Right buttons */}
      <rect x="425" y="58"  width="100" height="24" rx="3" fill="#0A2E5D"/>
      <text x="475" y="74"  fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Statistics…</text>
      <rect x="425" y="90"  width="100" height="24" rx="3" fill="#0A2E5D"/>
      <text x="475" y="106" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Cells…</text>
      <rect x="425" y="122" width="100" height="24" rx="3" fill="#0A2E5D"/>
      <text x="475" y="138" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Exact…</text>
      <rect x="425" y="154" width="100" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="475" y="170" fontSize="10" fill="#0A2E5D" textAnchor="middle">Format…</text>

      <text x="220" y="248" fontSize="9" fill="#0A2E5D" fontWeight="700">In Statistics dialog, tick:</text>
      <text x="220" y="262" fontSize="9" fill="#10B981" fontWeight="700">✓ Chi-square</text>
      <text x="220" y="276" fontSize="9" fill="#10B981" fontWeight="700">✓ Phi and Cramer's V</text>

      <rect x="430" y="262" width="45" height="28" rx="3" fill="#10B981"/>
      <text x="452" y="281" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="480" y="262" width="45" height="28" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="502" y="281" fontSize="10" fill="#0A2E5D" textAnchor="middle">Paste</text>
    </svg>
  );
}

/* ──── Chi-square output (compact, focused on the test + Cramer's V) ──── */
export function ChiSquareOutput() {
  return (
    <svg viewBox="0 0 720 380" className="w-full h-auto">
      <rect width="720" height="380" fill="#fff"/>

      {/* Crosstabulation table */}
      <text x="10" y="18" fontSize="11" fill="#0A2E5D" fontWeight="700">Crosstabulation: age_band × mpesa_adopted</text>
      <rect x="10" y="24" width="700" height="22" fill="#0A2E5D"/>
      <text x="230" y="40" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">M-Pesa: Yes</text>
      <text x="370" y="40" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">M-Pesa: No</text>
      <text x="500" y="40" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Total (n)</text>
      <text x="635" y="40" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Row % adopted</text>

      {[
        { label: 'Under 35', count: '73 (37.6 exp.)', no: '17 (52.4 exp.)', total: 90, pct: '81.1%' },
        { label: '35–49',    count: '51 (33.4 exp.)', no: '29 (46.6 exp.)', total: 80, pct: '63.8%' },
        { label: '50+',      count: '28 (29.2 exp.)', no: '42 (40.8 exp.)', total: 70, pct: '40.0%' },
      ].map((r, i) => (
        <g key={i}>
          <rect x="10" y={46 + i * 26} width="700" height="26" fill={i % 2 === 0 ? '#FAF7EF' : '#fff'}/>
          <text x="40"  y={64 + i * 26} fontSize="10" fill="#0A2E5D">{r.label}</text>
          <text x="230" y={64 + i * 26} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.count}</text>
          <text x="370" y={64 + i * 26} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.no}</text>
          <text x="500" y={64 + i * 26} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.total}</text>
          <text x="635" y={64 + i * 26} fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">{r.pct}</text>
        </g>
      ))}

      {/* Chi-Square Tests */}
      <text x="10" y="158" fontSize="11" fill="#0A2E5D" fontWeight="700">Chi-Square Tests</text>
      <rect x="10" y="164" width="700" height="22" fill="#0A2E5D"/>
      <text x="200" y="180" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Value</text>
      <text x="400" y="180" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">df</text>
      <text x="600" y="180" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Asymp. Sig. (2-sided)</text>

      <rect x="10" y="186" width="700" height="22" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
      <text x="40"  y="201" fontSize="10" fill="#0A2E5D" fontWeight="700">Pearson Chi-Square</text>
      <text x="200" y="201" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">28.34</text>
      <text x="400" y="201" fontSize="11" fill="#0A2E5D" textAnchor="middle">2</text>
      <text x="600" y="201" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">.000</text>

      <rect x="10" y="208" width="700" height="22" fill="#fff" stroke="#E2E8F0"/>
      <text x="40"  y="223" fontSize="10" fill="#0A2E5D">Likelihood Ratio</text>
      <text x="200" y="223" fontSize="11" fill="#0A2E5D" textAnchor="middle">29.12</text>
      <text x="400" y="223" fontSize="11" fill="#0A2E5D" textAnchor="middle">2</text>
      <text x="600" y="223" fontSize="11" fill="#0A2E5D" textAnchor="middle">.000</text>

      <rect x="10" y="230" width="700" height="22" fill="#FAF7EF"/>
      <text x="40"  y="245" fontSize="10" fill="#0A2E5D">N of Valid Cases</text>
      <text x="200" y="245" fontSize="11" fill="#0A2E5D" textAnchor="middle">240</text>

      {/* Footnote */}
      <text x="10" y="270" fontSize="9" fill="#64748B" fontStyle="italic">
        a. 0 cells (0.0%) have expected count less than 5. The minimum expected count is 28.13.
      </text>

      {/* Symmetric Measures */}
      <text x="10" y="298" fontSize="11" fill="#0A2E5D" fontWeight="700">Symmetric Measures</text>
      <rect x="10" y="304" width="700" height="22" fill="#0A2E5D"/>
      <text x="350" y="320" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Value</text>
      <text x="600" y="320" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Approx. Sig.</text>

      <rect x="10" y="326" width="700" height="22" fill="#fff" stroke="#E2E8F0"/>
      <text x="40" y="341" fontSize="10" fill="#0A2E5D">Nominal — Phi</text>
      <text x="350" y="341" fontSize="11" fill="#0A2E5D" textAnchor="middle">.344</text>
      <text x="600" y="341" fontSize="11" fill="#0A2E5D" textAnchor="middle">.000</text>

      <rect x="10" y="348" width="700" height="22" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
      <text x="40" y="363" fontSize="10" fill="#0A2E5D" fontWeight="700">Cramer's V</text>
      <text x="350" y="363" fontSize="12" fill="#10B981" textAnchor="middle" fontWeight="700">.344</text>
      <text x="600" y="363" fontSize="11" fill="#0A2E5D" textAnchor="middle">.000</text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   DATA CLEANING — three illustrations
   ════════════════════════════════════════════════════════════ */

/* ──── Impossible values caught by Frequencies ──── */
export function ImpossibleValues() {
  const rows = [
    { value: '1',  label: 'Strongly Disagree', n: 12, valid: true },
    { value: '2',  label: 'Disagree',          n: 28, valid: true },
    { value: '3',  label: 'Neutral',           n: 84, valid: true },
    { value: '4',  label: 'Agree',             n: 96, valid: true },
    { value: '5',  label: 'Strongly Agree',    n: 78, valid: true },
    { value: '6',  label: '(impossible code)', n: 3,  valid: false },
    { value: '55', label: '(typo? missed comma?)', n: 1, valid: false },
    { value: '.',  label: 'System Missing',    n: 10, valid: true },
  ];
  return (
    <svg viewBox="0 0 720 320" className="w-full h-auto">
      <rect width="720" height="320" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Frequencies output: spot the impossible values immediately
      </text>
      <text x="360" y="36" fontSize="10" fill="#64748B" textAnchor="middle">
        Variable: satisfaction (should only contain values 1–5)
      </text>

      <rect x="40" y="56" width="640" height="22" fill="#0A2E5D"/>
      <text x="100" y="72" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Value</text>
      <text x="320" y="72" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Label</text>
      <text x="540" y="72" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Frequency</text>

      {rows.map((r, i) => {
        const y = 78 + i * 26;
        const bg = i % 2 === 0 ? '#FAF7EF' : '#fff';
        const colour = r.valid ? '#0A2E5D' : '#EF4444';
        return (
          <g key={i}>
            <rect x="40" y={y} width="640" height="26" fill={bg} stroke={r.valid ? 'none' : '#FCA5A5'} strokeWidth={r.valid ? 0 : 2}/>
            <text x="100" y={y + 17} fontSize="11" fill={colour} textAnchor="middle" fontWeight="700">{r.value}</text>
            <text x="320" y={y + 17} fontSize="10" fill={colour} textAnchor="middle"
              fontWeight={r.valid ? "400" : "700"}>{r.label}</text>
            <text x="540" y={y + 17} fontSize="11" fill={colour} textAnchor="middle" fontWeight="700">{r.n}</text>
            {!r.valid && (
              <text x="650" y={y + 17} fontSize="11" fill="#EF4444" textAnchor="end" fontWeight="700">⚠ FIX</text>
            )}
          </g>
        );
      })}

      <text x="360" y="306" fontSize="10" fill="#64748B" textAnchor="middle">
        Recode the 6 and 55 → system-missing (via Transform → Recode into Same Variables) before any analysis.
      </text>
    </svg>
  );
}

/* ──── Reverse-coding Likert: before vs after ──── */
export function ReverseLikertExample() {
  return (
    <svg viewBox="0 0 740 360" className="w-full h-auto">
      <rect width="740" height="360" fill="#fff"/>
      <text x="370" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Reverse-coding negatively-worded Likert items — why it matters
      </text>

      {/* BEFORE row */}
      <g transform="translate(20, 50)">
        <text x="350" y="0" fontSize="11" fill="#EF4444" textAnchor="middle" fontWeight="700">
          BEFORE reverse-coding (wrong!)
        </text>
        <rect x="0" y="10" width="700" height="22" fill="#0A2E5D"/>
        <text x="120" y="26" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Item 1 (positive)</text>
        <text x="120" y="36" fontSize="8"  fill="#fff" textAnchor="middle">"I enjoy my work"</text>
        <text x="350" y="26" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Item 2 (negative)</text>
        <text x="350" y="36" fontSize="8"  fill="#fff" textAnchor="middle">"My work is pointless"</text>
        <text x="580" y="26" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">SUM (interpretation)</text>

        <rect x="0" y="42" width="700" height="40" fill="#FAF7EF"/>
        <text x="120" y="58" fontSize="14" fill="#0A2E5D" textAnchor="middle" fontWeight="700">5</text>
        <text x="120" y="74" fontSize="9"  fill="#64748B" textAnchor="middle">strongly agree → HIGH job satisfaction</text>
        <text x="350" y="58" fontSize="14" fill="#0A2E5D" textAnchor="middle" fontWeight="700">5</text>
        <text x="350" y="74" fontSize="9"  fill="#64748B" textAnchor="middle">strongly agree → LOW job satisfaction</text>
        <text x="580" y="58" fontSize="14" fill="#EF4444" textAnchor="middle" fontWeight="700">5 + 5 = 10</text>
        <text x="580" y="74" fontSize="9"  fill="#EF4444" textAnchor="middle">"high satisfaction" — but it's contradictory!</text>
      </g>

      {/* Arrow */}
      <g transform="translate(370, 170)">
        <text x="0" y="0" fontSize="18" fill="#D4AF37" textAnchor="middle" fontWeight="700">▼</text>
        <text x="0" y="18" fontSize="11" fill="#D4AF37" textAnchor="middle" fontWeight="700">
          Recode item 2: new = 6 − old (1↔5, 2↔4, 3 stays, 4↔2, 5↔1)
        </text>
      </g>

      {/* AFTER row */}
      <g transform="translate(20, 210)">
        <text x="350" y="0" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">
          AFTER reverse-coding (correct)
        </text>
        <rect x="0" y="10" width="700" height="22" fill="#0A2E5D"/>
        <text x="120" y="26" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Item 1 (positive)</text>
        <text x="350" y="26" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Item 2_r (REVERSED)</text>
        <text x="350" y="36" fontSize="8"  fill="#fff" textAnchor="middle">"My work is pointless" — flipped</text>
        <text x="580" y="26" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">SUM (interpretation)</text>

        <rect x="0" y="42" width="700" height="40" fill="#FBF6E5"/>
        <text x="120" y="58" fontSize="14" fill="#0A2E5D" textAnchor="middle" fontWeight="700">5</text>
        <text x="120" y="74" fontSize="9"  fill="#64748B" textAnchor="middle">HIGH job satisfaction</text>
        <text x="350" y="58" fontSize="14" fill="#10B981" textAnchor="middle" fontWeight="700">1</text>
        <text x="350" y="74" fontSize="9"  fill="#10B981" textAnchor="middle">5 became 1 → now agrees: LOW satisfaction on this item</text>
        <text x="580" y="58" fontSize="14" fill="#10B981" textAnchor="middle" fontWeight="700">5 + 1 = 6</text>
        <text x="580" y="74" fontSize="9"  fill="#10B981" textAnchor="middle">consistent — mixed picture, both items pointing the same way</text>
      </g>

      <g transform="translate(20, 310)">
        <rect width="700" height="40" rx="6" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
        <text x="350" y="18" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
          For 1–5 Likert use new = 6 − old. For 1–n Likert use new = (n + 1) − old.
        </text>
        <text x="350" y="32" fontSize="10" fill="#0A2E5D" textAnchor="middle">
          ALWAYS use Recode into DIFFERENT Variables → save as `item_r`. Never overwrite the original.
        </text>
      </g>
    </svg>
  );
}

/* ──── Cleaning workflow diagram ──── */
export function CleaningWorkflow() {
  const steps = [
    { num: 1,  label: 'Backup raw',           sub: '_RAW.sav locked' },
    { num: 2,  label: 'Variable View setup',  sub: 'types, labels, missing codes' },
    { num: 3,  label: 'Frequencies on ALL',   sub: 'catch typos / impossible' },
    { num: 4,  label: 'Fix impossible values', sub: 'Recode → system-missing' },
    { num: 5,  label: 'Declare missing codes', sub: '999, 998, etc.' },
    { num: 6,  label: 'Quantify missingness', sub: 'flag > 30% variables' },
    { num: 7,  label: 'Find & drop duplicates', sub: 'Identify Duplicate Cases' },
    { num: 8,  label: 'Reverse-code Likert',   sub: 'Recode → DIFFERENT vars (_r)' },
    { num: 9,  label: 'Compute composites',    sub: 'SUM / MEAN / dummies' },
    { num: 10, label: 'Reliability check',     sub: 'Cronbach\'s α ≥ .70' },
    { num: 11, label: 'Select Cases as needed', sub: 'turn OFF when done' },
    { num: 12, label: 'Save _CLEAN + syntax',  sub: 'reproducible' },
  ];
  return (
    <svg viewBox="0 0 740 380" className="w-full h-auto">
      <rect width="740" height="380" fill="#fff"/>
      <text x="370" y="22" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        The 12-step data-cleaning workflow — same order every time
      </text>

      {steps.map((s, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 20 + col * 180;
        const y = 50 + row * 100;
        return (
          <g key={s.num} transform={`translate(${x},${y})`}>
            <rect width="170" height="80" rx="8" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
            <circle cx="22" cy="22" r="14" fill="#0A2E5D"/>
            <text x="22" y="27" fontSize="13" fill="#D4AF37" textAnchor="middle" fontWeight="700">{s.num}</text>
            <text x="85" y="44" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{s.label}</text>
            <text x="85" y="62" fontSize="9"  fill="#64748B" textAnchor="middle">{s.sub}</text>
          </g>
        );
      })}

      {/* Arrows between rows */}
      {[0, 1].map((row) => (
        <g key={row}>
          {[0, 1, 2].map((col) => {
            const x1 = 20 + col * 180 + 170;
            const y1 = 50 + row * 100 + 40;
            const x2 = 20 + (col + 1) * 180;
            return (
              <text key={col} x={(x1 + x2) / 2} y={y1 + 5} fontSize="14" fill="#D4AF37" textAnchor="middle" fontWeight="700">→</text>
            );
          })}
        </g>
      ))}
      {/* Wrap arrows down at end of each row */}
      <text x="370" y="155" fontSize="14" fill="#D4AF37" textAnchor="middle" fontWeight="700">↓</text>
      <text x="370" y="255" fontSize="14" fill="#D4AF37" textAnchor="middle" fontWeight="700">↓</text>

      <text x="370" y="370" fontSize="10" fill="#64748B" textAnchor="middle">
        After step 12, you have a clean dataset and a documented script — now begin your real analysis.
      </text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   ADVANCED REGRESSION — Hierarchical / Stepwise illustrations
   ════════════════════════════════════════════════════════════ */

/* ──── Hierarchical blocks (more detailed than the existing simple version) ──── */
export function HierarchicalBlocksDetailed() {
  const blocks = [
    { num: 1, label: 'Demographics',  vars: ['gender', 'age', 'school_type'],                  r2: 0.12, delta: 0.12, color: '#0A2E5D' },
    { num: 2, label: 'Behavioural',   vars: ['study_hours', 'attendance', 'kcpe_score'],       r2: 0.31, delta: 0.19, color: '#D4AF37' },
    { num: 3, label: 'Psychological', vars: ['self_efficacy', 'motivation', 'exam_anxiety', 'past_papers'], r2: 0.47, delta: 0.16, color: '#10B981' },
  ];
  const barX = (r2) => 60 + r2 * 540;

  return (
    <svg viewBox="0 0 720 320" className="w-full h-auto">
      <rect width="720" height="320" fill="#fff"/>
      <text x="360" y="22" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Hierarchical regression — each block adds variance beyond the previous
      </text>
      {/* Bar axis */}
      <line x1="60" y1="280" x2="600" y2="280" stroke="#0A2E5D" strokeOpacity=".3"/>
      {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((t) => (
        <g key={t}>
          <line x1={barX(t)} y1="276" x2={barX(t)} y2="284" stroke="#0A2E5D" strokeOpacity=".3"/>
          <text x={barX(t)} y="298" fontSize="9" fill="#64748B" textAnchor="middle">{(t * 100).toFixed(0)}%</text>
        </g>
      ))}
      <text x="330" y="312" fontSize="10" fill="#64748B" textAnchor="middle">Cumulative R² (variance explained)</text>

      {blocks.map((b, i) => {
        const y = 55 + i * 70;
        return (
          <g key={b.num}>
            {/* block label */}
            <rect x="10" y={y - 20} width="40" height="40" rx="4" fill={b.color}/>
            <text x="30" y={y + 5} fontSize="13" fill="#fff" textAnchor="middle" fontWeight="700">B{b.num}</text>
            <text x="60" y={y - 6} fontSize="11" fill="#0A2E5D" fontWeight="700">{b.label}</text>
            <text x="60" y={y + 9} fontSize="9" fill="#64748B">{b.vars.join(', ')}</text>
            {/* bar showing cumulative R² */}
            <rect x="60" y={y + 15} width={(barX(b.r2) - 60)} height="14" rx="3" fill={b.color} opacity=".75"/>
            <text x={barX(b.r2) + 6} y={y + 26} fontSize="10" fill="#0A2E5D" fontWeight="700">R² = {b.r2.toFixed(2)}</text>
            {/* ΔR² badge */}
            <g transform={`translate(${barX(b.r2) + 80}, ${y + 18})`}>
              <rect x="0" y="0" width="64" height="18" rx="9" fill="#10B981" opacity=".18"/>
              <text x="32" y="13" fontSize="10" fill="#10B981" textAnchor="middle" fontWeight="700">
                ΔR² = .{(b.delta * 100).toFixed(0).padStart(2, '0')}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

/* ──── Hierarchical dialog mock ──── */
export function HierarchicalDialog() {
  return (
    <svg viewBox="0 0 540 320" className="w-full h-auto">
      <rect width="540" height="320" fill="#F1F5F9"/>
      <rect x="10" y="10" width="520" height="300" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".4"/>
      <rect x="10" y="10" width="520" height="26" rx="6" fill="#0A2E5D"/>
      <text x="20" y="28" fontSize="12" fill="#fff" fontWeight="700">Linear Regression — Hierarchical (Block 3 of 3)</text>

      <rect x="20" y="50" width="160" height="240" rx="4" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".25"/>
      <text x="100" y="68" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Variables</text>
      <text x="30" y="92"  fontSize="10" fill="#0A2E5D" fillOpacity="0.4">gender ✓ B1</text>
      <text x="30" y="108" fontSize="10" fill="#0A2E5D" fillOpacity="0.4">age ✓ B1</text>
      <text x="30" y="124" fontSize="10" fill="#0A2E5D" fillOpacity="0.4">school_type ✓ B1</text>
      <text x="30" y="140" fontSize="10" fill="#0A2E5D" fillOpacity="0.4">study_hours ✓ B2</text>
      <text x="30" y="156" fontSize="10" fill="#0A2E5D" fillOpacity="0.4">attendance ✓ B2</text>
      <text x="30" y="172" fontSize="10" fill="#0A2E5D" fillOpacity="0.4">kcpe_score ✓ B2</text>
      <text x="30" y="188" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.7">self_efficacy ✓ B3</text>
      <text x="30" y="204" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.7">motivation ✓ B3</text>
      <text x="30" y="220" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.7">exam_anxiety ✓ B3</text>

      {/* Block indicator bar */}
      <rect x="200" y="50" width="210" height="26" rx="3" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
      <text x="305" y="68" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        ◀ Previous   Block 3 of 3   Next ▶
      </text>

      {/* Dependent */}
      <rect x="200" y="84" width="210" height="44" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="205" y="100" fontSize="10" fill="#0A2E5D" fontWeight="700">Dependent:</text>
      <rect x="208" y="105" width="195" height="20" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="214" y="119" fontSize="10" fill="#0A2E5D" fontWeight="700">kcse_mock_score</text>

      {/* Independent(s) showing Block 3 vars */}
      <rect x="200" y="136" width="210" height="100" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="205" y="152" fontSize="10" fill="#0A2E5D" fontWeight="700">Independent(s) [Block 3]:</text>
      <rect x="208" y="158" width="195" height="18" rx="2" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="214" y="171" fontSize="9" fill="#0A2E5D" fontWeight="700">self_efficacy</text>
      <rect x="208" y="178" width="195" height="18" rx="2" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="214" y="191" fontSize="9" fill="#0A2E5D" fontWeight="700">intrinsic_motivation</text>
      <rect x="208" y="198" width="195" height="18" rx="2" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="214" y="211" fontSize="9" fill="#0A2E5D" fontWeight="700">exam_anxiety</text>

      {/* Method */}
      <rect x="200" y="244" width="210" height="22" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="205" y="259" fontSize="10" fill="#0A2E5D"><tspan fontWeight="700">Method:</tspan> Enter</text>

      {/* Statistics button highlighted */}
      <rect x="425" y="50"  width="100" height="24" rx="3" fill="#10B981"/>
      <text x="475" y="66"  fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Statistics…</text>
      <text x="425" y="86"  fontSize="8" fill="#10B981" fontWeight="700">↑ tick "R squared change"</text>

      <rect x="425" y="100" width="100" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="475" y="116" fontSize="10" fill="#0A2E5D" textAnchor="middle">Plots…</text>
      <rect x="425" y="132" width="100" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="475" y="148" fontSize="10" fill="#0A2E5D" textAnchor="middle">Save…</text>
      <rect x="425" y="164" width="100" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="475" y="180" fontSize="10" fill="#0A2E5D" textAnchor="middle">Options…</text>

      <rect x="425" y="262" width="45" height="28" rx="3" fill="#10B981"/>
      <text x="447" y="281" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="475" y="262" width="50" height="28" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="500" y="281" fontSize="10" fill="#0A2E5D" textAnchor="middle">Paste</text>
    </svg>
  );
}

/* ──── Hierarchical Model Summary table ──── */
export function HierarchicalModelSummary() {
  const rows = [
    { model: 1, R: '.34', R2: '.12', adj: '.11', dR2: '.12', F: '14.36', df1: 3, df2: 316, sig: '< .001' },
    { model: 2, R: '.56', R2: '.31', adj: '.30', dR2: '.19', F: '28.74', df1: 3, df2: 313, sig: '< .001' },
    { model: 3, R: '.69', R2: '.47', adj: '.45', dR2: '.16', F: '22.85', df1: 4, df2: 309, sig: '< .001' },
  ];
  return (
    <svg viewBox="0 0 720 240" className="w-full h-auto">
      <rect width="720" height="240" fill="#fff"/>
      <text x="360" y="20" fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Model Summary — Hierarchical Multiple Regression
      </text>

      {/* Header rows */}
      <rect x="10" y="32" width="700" height="22" fill="#0A2E5D"/>
      <text x="40"  y="48" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Model</text>
      <text x="90"  y="48" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">R</text>
      <text x="140" y="48" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">R Square</text>
      <text x="210" y="48" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Adj. R²</text>
      <text x="335" y="48" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">R² Change (ΔR²)</text>
      <text x="445" y="48" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">F Change</text>
      <text x="520" y="48" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">df1</text>
      <text x="570" y="48" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">df2</text>
      <text x="650" y="48" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Sig. F Change</text>

      {/* Sub-header dividing line */}
      <rect x="270" y="32" width="2" height="22" fill="#fff"/>

      {/* Data rows */}
      {rows.map((r, i) => {
        const y = 54 + i * 32;
        const bg = i % 2 === 0 ? '#FAF7EF' : '#fff';
        const stroke = i === 2 ? '#D4AF37' : 'none';
        return (
          <g key={i}>
            <rect x="10" y={y} width="700" height="32" fill={bg} stroke={stroke} strokeWidth={i === 2 ? 2 : 0}/>
            <text x="40"  y={y + 19} fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{r.model}</text>
            <text x="90"  y={y + 19} fontSize="11" fill="#0A2E5D" textAnchor="middle">{r.R}</text>
            <text x="140" y={y + 19} fontSize="11" fill="#0A2E5D" textAnchor="middle">{r.R2}</text>
            <text x="210" y={y + 19} fontSize="11" fill="#0A2E5D" textAnchor="middle">{r.adj}</text>
            <text x="335" y={y + 19} fontSize="12" fill="#10B981" textAnchor="middle" fontWeight="700">{r.dR2}</text>
            <text x="445" y={y + 19} fontSize="11" fill="#0A2E5D" textAnchor="middle">{r.F}</text>
            <text x="520" y={y + 19} fontSize="11" fill="#0A2E5D" textAnchor="middle">{r.df1}</text>
            <text x="570" y={y + 19} fontSize="11" fill="#0A2E5D" textAnchor="middle">{r.df2}</text>
            <text x="650" y={y + 19} fontSize="12" fill="#10B981" textAnchor="middle" fontWeight="700">{r.sig}</text>
          </g>
        );
      })}

      <text x="10" y="170" fontSize="9" fill="#64748B" fontStyle="italic">
        Model 1: Demographics. Model 2: Demographics + Behavioural. Model 3: Demographics + Behavioural + Psychological.
      </text>
      <text x="10" y="186" fontSize="10" fill="#0A2E5D">
        <tspan fontWeight="700">Read row by row:</tspan> "Did THIS block significantly add to the model beyond previous blocks?"
      </text>
      <text x="10" y="202" fontSize="10" fill="#0A2E5D">
        All three Sig. F Change are &lt; .001 → every block adds significant new variance. The Psychological block alone adds 16%.
      </text>
    </svg>
  );
}

/* ──── Stepwise problems — same population, different selected variables ──── */
export function StepwiseProblems() {
  return (
    <svg viewBox="0 0 720 320" className="w-full h-auto">
      <rect width="720" height="320" fill="#fff"/>
      <text x="360" y="22" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Why stepwise is unstable: same population, different "winning" predictors
      </text>

      {/* Population box */}
      <g transform="translate(280, 40)">
        <rect width="160" height="48" rx="6" fill="#0A2E5D"/>
        <text x="80" y="20" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">Population</text>
        <text x="80" y="36" fontSize="10" fill="#fff" textAnchor="middle">8 candidate predictors (X1–X8)</text>
      </g>
      {/* Arrows down */}
      <text x="200" y="115" fontSize="14" fill="#D4AF37" fontWeight="700">↓ random sample A</text>
      <text x="440" y="115" fontSize="14" fill="#D4AF37" fontWeight="700">↓ random sample B</text>

      {/* Sample A */}
      <g transform="translate(60, 130)">
        <rect width="260" height="160" rx="8" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".3"/>
        <text x="130" y="22" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Sample A (n = 200)</text>
        <text x="130" y="40" fontSize="10" fill="#64748B" textAnchor="middle">Stepwise selects:</text>
        {/* Selected variables */}
        {['X1', 'X3', 'X7'].map((v, i) => (
          <g key={v} transform={`translate(${30 + i * 70}, 55)`}>
            <rect width="60" height="40" rx="6" fill="#10B981" fillOpacity=".22" stroke="#10B981" strokeWidth="2"/>
            <text x="30" y="25" fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{v}</text>
          </g>
        ))}
        <text x="130" y="118" fontSize="10" fill="#0A2E5D" textAnchor="middle">"Final model": X1, X3, X7</text>
        <text x="130" y="135" fontSize="9" fill="#64748B" textAnchor="middle" fontStyle="italic">R² = .47 — looks confident</text>
        <text x="130" y="150" fontSize="9" fill="#64748B" textAnchor="middle" fontStyle="italic">but is it the right answer?</text>
      </g>

      {/* Sample B */}
      <g transform="translate(400, 130)">
        <rect width="260" height="160" rx="8" fill="#FBF6E5" stroke="#D4AF37" strokeOpacity=".5"/>
        <text x="130" y="22" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Sample B (n = 200)</text>
        <text x="130" y="40" fontSize="10" fill="#64748B" textAnchor="middle">Stepwise selects:</text>
        {['X2', 'X3', 'X5'].map((v, i) => (
          <g key={v} transform={`translate(${30 + i * 70}, 55)`}>
            <rect width="60" height="40" rx="6" fill="#EF4444" fillOpacity=".18" stroke="#EF4444" strokeWidth="2"/>
            <text x="30" y="25" fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{v}</text>
          </g>
        ))}
        <text x="130" y="118" fontSize="10" fill="#0A2E5D" textAnchor="middle">"Final model": X2, X3, X5</text>
        <text x="130" y="135" fontSize="9" fill="#64748B" textAnchor="middle" fontStyle="italic">R² = .46 — also confident</text>
        <text x="130" y="150" fontSize="9" fill="#64748B" textAnchor="middle" fontStyle="italic">but completely different</text>
      </g>

      {/* Bottom narration */}
      <text x="360" y="312" fontSize="10" fill="#64748B" textAnchor="middle">
        Same population. Same predictor pool. Stepwise picks DIFFERENT "winners" — and that's the problem.
      </text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   MULTINOMIAL vs ORDINAL — illustrations
   ════════════════════════════════════════════════════════════ */

/* ──── Multinomial vs Ordinal — visual contrast ──── */
export function MultinomialVsOrdinal() {
  return (
    <svg viewBox="0 0 720 320" className="w-full h-auto">
      <rect width="720" height="320" fill="#fff"/>
      <text x="360" y="22" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Multinomial (unordered) vs Ordinal (ordered) — the one question that decides
      </text>

      {/* Multinomial side — unordered scatter of category bubbles */}
      <g transform="translate(40, 50)">
        <rect width="300" height="240" rx="10" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".2"/>
        <text x="150" y="22" fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">MULTINOMIAL — unordered</text>
        <text x="150" y="40" fontSize="10" fill="#64748B" textAnchor="middle">No natural ranking between categories</text>

        {/* Four free-floating bubbles */}
        <g>
          <circle cx="80"  cy="100" r="34" fill="#0A2E5D" fillOpacity=".18" stroke="#0A2E5D" strokeWidth="2"/>
          <text x="80"  y="105" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Matatu</text>
          <circle cx="200" cy="90"  r="34" fill="#D4AF37" fillOpacity=".22" stroke="#D4AF37" strokeWidth="2"/>
          <text x="200" y="95"  fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Boda</text>
          <circle cx="100" cy="180" r="34" fill="#10B981" fillOpacity=".18" stroke="#10B981" strokeWidth="2"/>
          <text x="100" y="185" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Car</text>
          <circle cx="220" cy="180" r="34" fill="#EF4444" fillOpacity=".18" stroke="#EF4444" strokeWidth="2"/>
          <text x="220" y="185" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Walking</text>
        </g>
        <text x="150" y="226" fontSize="9" fill="#64748B" textAnchor="middle">Transport mode · Religion · Party</text>
      </g>

      {/* Ordinal side — categories on a line */}
      <g transform="translate(380, 50)">
        <rect width="300" height="240" rx="10" fill="#FBF6E5" stroke="#D4AF37" strokeOpacity=".5"/>
        <text x="150" y="22" fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">ORDINAL — ordered</text>
        <text x="150" y="40" fontSize="10" fill="#64748B" textAnchor="middle">Natural ranking matters</text>

        {/* Number-line with four ranked categories */}
        <line x1="40" y1="140" x2="260" y2="140" stroke="#0A2E5D" strokeWidth="2"/>
        <polygon points="260,140 252,134 252,146" fill="#0A2E5D"/>
        <text x="150" y="125" fontSize="9" fill="#64748B" textAnchor="middle">low ←—— increasing poverty band ——→ high</text>
        {['Low', 'Lower-Mid', 'Upper-Mid', 'High'].map((label, i) => (
          <g key={label} transform={`translate(${40 + i * 70}, 140)`}>
            <circle cx="0" cy="0" r="14" fill="#D4AF37" stroke="#0A2E5D" strokeWidth="2"/>
            <text x="0" y="4" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{i + 1}</text>
            <text x="0" y="36" fontSize="9" fill="#0A2E5D" textAnchor="middle">{label}</text>
          </g>
        ))}
        <text x="150" y="200" fontSize="9" fill="#64748B" textAnchor="middle">"Low" is unambiguously lower than "High"</text>
        <text x="150" y="218" fontSize="9" fill="#64748B" textAnchor="middle">Poverty band · Likert · Severity · Education</text>
      </g>
    </svg>
  );
}

/* ──── Multinomial dialog mock ──── */
export function MultinomialDialog() {
  return (
    <svg viewBox="0 0 540 320" className="w-full h-auto">
      <rect width="540" height="320" fill="#F1F5F9"/>
      <rect x="10" y="10" width="520" height="300" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".4"/>
      <rect x="10" y="10" width="520" height="26" rx="6" fill="#0A2E5D"/>
      <text x="20" y="28" fontSize="12" fill="#fff" fontWeight="700">Multinomial Logistic Regression</text>

      <rect x="20" y="50" width="160" height="240" rx="4" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".25"/>
      <text x="100" y="68" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Available variables</text>
      <text x="30" y="92"  fontSize="10" fill="#0A2E5D">commuter_id</text>
      <text x="30" y="110" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">transport_mode ✓</text>
      <text x="30" y="128" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">gender ✓</text>
      <text x="30" y="146" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">licence_held ✓</text>
      <text x="30" y="164" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">age ✓</text>
      <text x="30" y="182" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">log_income ✓</text>
      <text x="30" y="200" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">distance_cbd ✓</text>

      {/* Dependent */}
      <rect x="200" y="50" width="200" height="44" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="205" y="66" fontSize="10" fill="#0A2E5D" fontWeight="700">Dependent:</text>
      <rect x="208" y="71" width="185" height="20" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="214" y="85" fontSize="10" fill="#0A2E5D" fontWeight="700">transport_mode</text>

      {/* Reference category button */}
      <rect x="200" y="100" width="200" height="22" rx="3" fill="#10B981"/>
      <text x="300" y="115" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Reference Category…</text>
      <text x="200" y="135" fontSize="8" fill="#10B981" fontWeight="700">↑ click → "First Category" (matatu)</text>

      {/* Factor(s) */}
      <rect x="200" y="142" width="200" height="50" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="205" y="158" fontSize="10" fill="#0A2E5D" fontWeight="700">Factor(s):</text>
      <rect x="208" y="164" width="90" height="20" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="253" y="178" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">gender</text>
      <rect x="300" y="164" width="95" height="20" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="347" y="178" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">licence_held</text>

      {/* Covariate(s) */}
      <rect x="200" y="200" width="200" height="70" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="205" y="216" fontSize="10" fill="#0A2E5D" fontWeight="700">Covariate(s):</text>
      <rect x="208" y="222" width="60" height="20" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="238" y="236" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">age</text>
      <rect x="270" y="222" width="80" height="20" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="310" y="236" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">log_income</text>
      <rect x="208" y="246" width="100" height="20" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="258" y="260" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">distance_cbd</text>

      {/* Right side buttons */}
      <rect x="415" y="50"  width="110" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="470" y="66"  fontSize="10" fill="#0A2E5D" textAnchor="middle">Model…</text>
      <rect x="415" y="82"  width="110" height="24" rx="3" fill="#10B981"/>
      <text x="470" y="98"  fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Statistics…</text>
      <rect x="415" y="114" width="110" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="470" y="130" fontSize="10" fill="#0A2E5D" textAnchor="middle">Criteria…</text>

      <rect x="415" y="262" width="50" height="28" rx="3" fill="#10B981"/>
      <text x="440" y="281" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="470" y="262" width="55" height="28" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="497" y="281" fontSize="10" fill="#0A2E5D" textAnchor="middle">Paste</text>
    </svg>
  );
}

/* ──── Multinomial output — three coefficient blocks ──── */
export function MultinomialOutput() {
  const block = (yOff, label, color, rows) => (
    <g transform={`translate(0, ${yOff})`}>
      <rect x="10" y="0" width="700" height="22" fill={color}/>
      <text x="20" y="15" fontSize="10" fill="#fff" fontWeight="700">{label}</text>
      <rect x="10" y="22" width="700" height="20" fill="#E2E8F0"/>
      <text x="120" y="36" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Predictor</text>
      <text x="270" y="36" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">B</text>
      <text x="350" y="36" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Sig.</text>
      <text x="450" y="36" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Exp(B)</text>
      <text x="600" y="36" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">95% CI for Exp(B)</text>
      {rows.map((r, i) => {
        const y = 42 + i * 20;
        const bg = i % 2 === 0 ? '#FAF7EF' : '#fff';
        const sigColor = r.sig.startsWith('<') || parseFloat(r.sig) < 0.05 ? '#10B981' : '#64748B';
        return (
          <g key={i}>
            <rect x="10" y={y} width="700" height="20" fill={bg}/>
            <text x="120" y={y + 14} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.var}</text>
            <text x="270" y={y + 14} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.B}</text>
            <text x="350" y={y + 14} fontSize="10" fill={sigColor} textAnchor="middle" fontWeight="700">{r.sig}</text>
            <text x="450" y={y + 14} fontSize="11" fill={sigColor} textAnchor="middle" fontWeight="700">{r.exp}</text>
            <text x="600" y={y + 14} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.ci}</text>
          </g>
        );
      })}
    </g>
  );

  return (
    <svg viewBox="0 0 720 380" className="w-full h-auto">
      <rect width="720" height="380" fill="#fff"/>
      <text x="360" y="18" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Parameter Estimates — Multinomial Logistic (Reference category: Matatu)
      </text>

      {block(28,  'Boda vs Matatu',     '#D4AF37', [
        { var: 'age',         B: '−0.06', sig: '< .001', exp: '0.94', ci: '[0.91, 0.97]' },
        { var: 'log_income',  B: '+0.21', sig: '.150',   exp: '1.23', ci: '[0.93, 1.63]' },
        { var: 'licence_held', B: '+0.85', sig: '.001',   exp: '2.34', ci: '[1.41, 3.88]' },
      ])}

      {block(150, 'Car vs Matatu',      '#10B981', [
        { var: 'age',         B: '+0.01', sig: '.640',   exp: '1.01', ci: '[0.97, 1.05]' },
        { var: 'log_income',  B: '+1.18', sig: '< .001', exp: '3.25', ci: '[1.73, 6.12]' },
        { var: 'licence_held', B: '+2.41', sig: '< .001', exp: '11.18', ci: '[5.62, 22.24]' },
        { var: 'distance_cbd', B: '+0.04', sig: '.009',   exp: '1.04', ci: '[1.01, 1.07]' },
      ])}

      {block(290, 'Walking vs Matatu',  '#EF4444', [
        { var: 'distance_cbd', B: '−0.18', sig: '< .001', exp: '0.84', ci: '[0.78, 0.90]' },
        { var: 'log_income',  B: '−0.42', sig: '.020',   exp: '0.66', ci: '[0.47, 0.93]' },
      ])}
    </svg>
  );
}

/* ──── Ordinal thresholds — latent variable carved into 4 categories ──── */
export function OrdinalThresholds() {
  return (
    <svg viewBox="0 0 720 280" className="w-full h-auto">
      <rect width="720" height="280" fill="#fff"/>
      <text x="360" y="22" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Ordinal logistic intuition: thresholds on a latent variable
      </text>

      {/* Bell curve (sketched as a gentle arch) for the latent distribution */}
      <path d="M 60 200 Q 360 60 660 200" fill="#FAF7EF" stroke="#0A2E5D" strokeWidth="2" strokeOpacity=".4"/>
      <line x1="60" y1="200" x2="660" y2="200" stroke="#0A2E5D" strokeWidth="2"/>

      {/* Thresholds */}
      {[
        { x: 210, label: 'τ₁' },
        { x: 360, label: 'τ₂' },
        { x: 510, label: 'τ₃' },
      ].map((t) => (
        <g key={t.label}>
          <line x1={t.x} y1="80" x2={t.x} y2="210" stroke="#D4AF37" strokeWidth="2" strokeDasharray="5 3"/>
          <text x={t.x} y="74" fontSize="11" fill="#D4AF37" textAnchor="middle" fontWeight="700">{t.label}</text>
        </g>
      ))}

      {/* Category labels under each region */}
      {[
        { x: 135, label: 'Low',           color: '#0A2E5D' },
        { x: 285, label: 'Lower-Mid',     color: '#D4AF37' },
        { x: 435, label: 'Upper-Mid',     color: '#10B981' },
        { x: 585, label: 'High',          color: '#EF4444' },
      ].map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy="225" r="12" fill={c.color} fillOpacity=".25" stroke={c.color} strokeWidth="2"/>
          <text x={c.x} y="229" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
            {['1','2','3','4'][[135,285,435,585].indexOf(c.x)]}
          </text>
          <text x={c.x} y="252" fontSize="10" fill="#0A2E5D" textAnchor="middle">{c.label}</text>
        </g>
      ))}

      {/* Latent label */}
      <text x="360" y="270" fontSize="10" fill="#64748B" textAnchor="middle">
        Latent variable Y* (unobserved continuous "poverty propensity")
      </text>

      {/* Predictor effect arrow */}
      <g transform="translate(20, 100)">
        <text x="0" y="0"  fontSize="11" fill="#10B981" fontWeight="700">More education</text>
        <text x="0" y="14" fontSize="11" fill="#10B981" fontWeight="700">→ shifts Y* LEFT</text>
        <text x="0" y="32" fontSize="10" fill="#64748B">(lower poverty band)</text>
        <polygon points="100,8 130,8 130,2 145,12 130,22 130,16 100,16" fill="#10B981" opacity=".7"/>
      </g>
    </svg>
  );
}

/* ──── Ordinal dialog mock ──── */
export function OrdinalDialog() {
  return (
    <svg viewBox="0 0 540 320" className="w-full h-auto">
      <rect width="540" height="320" fill="#F1F5F9"/>
      <rect x="10" y="10" width="520" height="300" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".4"/>
      <rect x="10" y="10" width="520" height="26" rx="6" fill="#0A2E5D"/>
      <text x="20" y="28" fontSize="12" fill="#fff" fontWeight="700">Ordinal Regression</text>

      <rect x="20" y="50" width="160" height="240" rx="4" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".25"/>
      <text x="100" y="68" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Available variables</text>
      <text x="30" y="92"  fontSize="10" fill="#0A2E5D">respondent_id</text>
      <text x="30" y="110" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">poverty_band ✓</text>
      <text x="30" y="128" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">gender ✓</text>
      <text x="30" y="146" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">urban_rural ✓</text>
      <text x="30" y="164" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">age ✓</text>
      <text x="30" y="182" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">years_education ✓</text>

      {/* Dependent */}
      <rect x="200" y="50" width="200" height="44" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="205" y="66" fontSize="10" fill="#0A2E5D" fontWeight="700">Dependent:</text>
      <rect x="208" y="71" width="185" height="20" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="214" y="85" fontSize="10" fill="#0A2E5D" fontWeight="700">poverty_band</text>

      <text x="200" y="108" fontSize="8" fill="#64748B">↑ must be ORDINAL in Variable View</text>

      {/* Factor(s) */}
      <rect x="200" y="118" width="200" height="50" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="205" y="134" fontSize="10" fill="#0A2E5D" fontWeight="700">Factor(s):</text>
      <rect x="208" y="140" width="80" height="20" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="248" y="154" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">gender</text>
      <rect x="290" y="140" width="105" height="20" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="343" y="154" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">urban_rural</text>

      {/* Covariate(s) */}
      <rect x="200" y="176" width="200" height="50" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="205" y="192" fontSize="10" fill="#0A2E5D" fontWeight="700">Covariate(s):</text>
      <rect x="208" y="198" width="60" height="20" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="238" y="212" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">age</text>
      <rect x="270" y="198" width="125" height="20" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="333" y="212" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontWeight="700">years_education</text>

      {/* Output button — highlighted */}
      <rect x="415" y="50"  width="110" height="24" rx="3" fill="#10B981"/>
      <text x="470" y="66"  fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Output…</text>
      <text x="415" y="84"  fontSize="8" fill="#10B981" fontWeight="700">↑ tick "Test of</text>
      <text x="415" y="94"  fontSize="8" fill="#10B981" fontWeight="700">   parallel lines"</text>

      <rect x="415" y="108" width="110" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="470" y="124" fontSize="10" fill="#0A2E5D" textAnchor="middle">Location…</text>
      <rect x="415" y="140" width="110" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="470" y="156" fontSize="10" fill="#0A2E5D" textAnchor="middle">Scale…</text>
      <rect x="415" y="172" width="110" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="470" y="188" fontSize="10" fill="#0A2E5D" textAnchor="middle">Options…</text>

      <rect x="415" y="262" width="50" height="28" rx="3" fill="#10B981"/>
      <text x="440" y="281" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="470" y="262" width="55" height="28" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="497" y="281" fontSize="10" fill="#0A2E5D" textAnchor="middle">Paste</text>
    </svg>
  );
}

/* ──── Ordinal output — thresholds + location coefficients + parallel-lines test ──── */
export function OrdinalOutput() {
  return (
    <svg viewBox="0 0 720 400" className="w-full h-auto">
      <rect width="720" height="400" fill="#fff"/>

      {/* Parameter Estimates header */}
      <text x="10" y="18" fontSize="11" fill="#0A2E5D" fontWeight="700">Parameter Estimates</text>
      <rect x="10" y="24" width="700" height="22" fill="#0A2E5D"/>
      <text x="160" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Predictor</text>
      <text x="340" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">B</text>
      <text x="430" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Sig.</text>
      <text x="540" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Exp(B) (computed)</text>
      <text x="660" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">95% CI for B</text>

      {/* Threshold section */}
      <rect x="10" y="46" width="700" height="20" fill="#E2E8F0"/>
      <text x="20" y="60" fontSize="10" fill="#0A2E5D" fontWeight="700">Threshold</text>
      {[
        { var: '[poverty_band = 1]',  B: '−2.43', sig: '< .001', exp: '0.088', ci: '[−3.10, −1.76]' },
        { var: '[poverty_band = 2]',  B: '−0.85', sig: '.003',   exp: '0.427', ci: '[−1.40, −0.30]' },
        { var: '[poverty_band = 3]',  B: '+0.92', sig: '.001',   exp: '2.509', ci: '[+0.38, +1.46]' },
      ].map((r, i) => {
        const y = 66 + i * 22;
        const bg = i % 2 === 0 ? '#FAF7EF' : '#fff';
        return (
          <g key={i}>
            <rect x="10" y={y} width="700" height="22" fill={bg}/>
            <text x="160" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.var}</text>
            <text x="340" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.B}</text>
            <text x="430" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.sig}</text>
            <text x="540" y={y + 15} fontSize="10" fill="#64748B" textAnchor="middle">{r.exp}</text>
            <text x="660" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.ci}</text>
          </g>
        );
      })}

      {/* Location section */}
      <rect x="10" y="134" width="700" height="20" fill="#E2E8F0"/>
      <text x="20" y="148" fontSize="10" fill="#0A2E5D" fontWeight="700">Location (predictors)</text>
      {[
        { var: 'years_education', B: '−0.40', sig: '< .001', exp: '0.670', ci: '[−0.51, −0.29]' },
        { var: 'age',              B: '+0.02', sig: '.083',   exp: '1.020', ci: '[+0.00, +0.04]' },
        { var: '[gender = 1]',    B: '+0.18', sig: '.310',   exp: '1.197', ci: '[−0.17, +0.53]' },
        { var: '[urban_rural=1]', B: '+0.62', sig: '.002',   exp: '1.859', ci: '[+0.23, +1.01]' },
      ].map((r, i) => {
        const y = 154 + i * 22;
        const bg = i % 2 === 0 ? '#FAF7EF' : '#fff';
        const sigSig = r.sig.startsWith('<') || parseFloat(r.sig) < 0.05;
        const sigColor = sigSig ? '#10B981' : '#64748B';
        return (
          <g key={i}>
            <rect x="10" y={y} width="700" height="22" fill={bg}/>
            <text x="160" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.var}</text>
            <text x="340" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.B}</text>
            <text x="430" y={y + 15} fontSize="10" fill={sigColor} textAnchor="middle" fontWeight="700">{r.sig}</text>
            <text x="540" y={y + 15} fontSize="11" fill={sigColor} textAnchor="middle" fontWeight="700">{r.exp}</text>
            <text x="660" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.ci}</text>
          </g>
        );
      })}

      <text x="10" y="262" fontSize="9" fill="#64748B" fontStyle="italic">
        Note: Exp(B) is not printed by SPSS for ordinal regression — compute manually as e^B.
      </text>
      <text x="10" y="276" fontSize="10" fill="#0A2E5D">
        Reading: years_education B = −0.40 (negative → more education shifts toward LOWER poverty bands). Exp(B) = 0.67 → each extra year of
      </text>
      <text x="10" y="290" fontSize="10" fill="#0A2E5D">
        education multiplies the odds of being in a HIGHER (worse) poverty band by 0.67, i.e. reduces those odds by 33%.
      </text>

      {/* Test of Parallel Lines */}
      <text x="10" y="318" fontSize="11" fill="#0A2E5D" fontWeight="700">Test of Parallel Lines</text>
      <rect x="10" y="324" width="700" height="22" fill="#0A2E5D"/>
      <text x="120" y="340" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Model</text>
      <text x="300" y="340" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Chi-Square</text>
      <text x="450" y="340" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">df</text>
      <text x="600" y="340" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Sig.</text>

      <rect x="10" y="346" width="700" height="22" fill="#FAF7EF"/>
      <text x="120" y="361" fontSize="10" fill="#0A2E5D" textAnchor="middle">Null Hypothesis</text>
      <text x="300" y="361" fontSize="10" fill="#0A2E5D" textAnchor="middle">152.3</text>

      <rect x="10" y="368" width="700" height="24" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
      <text x="120" y="384" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">General</text>
      <text x="300" y="384" fontSize="10" fill="#0A2E5D" textAnchor="middle">11.4</text>
      <text x="450" y="384" fontSize="10" fill="#0A2E5D" textAnchor="middle">8</text>
      <text x="600" y="384" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">.181  (≥ .05 → assumption MET ✓)</text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   ADVANCED ANOVA — ANCOVA, MANOVA, Mixed ANOVA illustrations
   ════════════════════════════════════════════════════════════ */

/* ──── ANCOVA: raw means → regression → adjusted means ──── */
export function AncovaLogic() {
  // Three groups, each with a different baseline (covariate) mean
  const groups = [
    { name: 'Traditional', color: '#0A2E5D', rawY: 280, kcpe: 295, adjY: 291 },
    { name: 'Discussion',  color: '#D4AF37', rawY: 310, kcpe: 315, adjY: 309 },
    { name: 'Flipped',     color: '#10B981', rawY: 335, kcpe: 340, adjY: 325 },
  ];
  return (
    <svg viewBox="0 0 720 320" className="w-full h-auto">
      <rect width="720" height="320" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        ANCOVA: adjust group means to a common covariate value, then compare
      </text>

      {/* LEFT — Unadjusted means */}
      <g transform="translate(30, 50)">
        <text x="100" y="-2" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Raw observed means</text>
        <rect width="200" height="220" rx="8" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".2"/>
        {groups.map((g, i) => {
          const x = 40 + i * 60;
          const h = (g.rawY - 250) * 4;
          return (
            <g key={g.name}>
              <rect x={x - 18} y={210 - h} width="36" height={h} fill={g.color} opacity=".75"/>
              <text x={x} y="225" fontSize="9" fill="#0A2E5D" textAnchor="middle">{g.name.slice(0, 4)}</text>
              <text x={x} y={205 - h} fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{g.rawY}</text>
            </g>
          );
        })}
        <text x="100" y="200" fontSize="9" fill="#64748B" textAnchor="middle">Gap = 55 pts</text>
      </g>

      {/* MIDDLE — regression of outcome on covariate */}
      <g transform="translate(260, 50)">
        <text x="100" y="-2" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Covariate → outcome</text>
        <rect width="200" height="220" rx="8" fill="#FBF6E5" stroke="#D4AF37" strokeOpacity=".4"/>
        {/* axes */}
        <line x1="20" y1="200" x2="180" y2="200" stroke="#0A2E5D" strokeOpacity=".4"/>
        <line x1="20" y1="40"  x2="20" y2="200" stroke="#0A2E5D" strokeOpacity=".4"/>
        <text x="100" y="218" fontSize="9" fill="#64748B" textAnchor="middle">KCPE entry score</text>
        {/* regression line */}
        <line x1="20" y1="170" x2="180" y2="50" stroke="#D4AF37" strokeWidth="2"/>
        {/* group dots on the line */}
        {groups.map((g, i) => {
          const x = 35 + i * 50;
          const y = 170 - i * 40;
          return (
            <g key={g.name}>
              <circle cx={x} cy={y} r="8" fill={g.color}/>
              <text x={x} y={y - 12} fontSize="9" fill={g.color} textAnchor="middle" fontWeight="700">{g.name.slice(0, 4)}</text>
            </g>
          );
        })}
        <text x="100" y="35" fontSize="9" fill="#0A2E5D" textAnchor="middle" fontStyle="italic">slope is the same in every group</text>
      </g>

      {/* RIGHT — Adjusted means */}
      <g transform="translate(490, 50)">
        <text x="100" y="-2" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">Adjusted means (at grand KCPE)</text>
        <rect width="200" height="220" rx="8" fill="#10B981" fillOpacity=".10" stroke="#10B981" strokeWidth="2"/>
        {groups.map((g, i) => {
          const x = 40 + i * 60;
          const h = (g.adjY - 250) * 4;
          return (
            <g key={g.name}>
              <rect x={x - 18} y={210 - h} width="36" height={h} fill={g.color} opacity=".85"/>
              <text x={x} y="225" fontSize="9" fill="#0A2E5D" textAnchor="middle">{g.name.slice(0, 4)}</text>
              <text x={x} y={205 - h} fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{g.adjY}</text>
            </g>
          );
        })}
        <text x="100" y="200" fontSize="9" fill="#10B981" textAnchor="middle" fontWeight="700">Gap = 34 pts (shrunk)</text>
      </g>

      <text x="360" y="298" fontSize="10" fill="#64748B" textAnchor="middle">
        Some of the raw 55-pt gap was just baseline ability. ANCOVA strips that out → a fairer 34-pt comparison.
      </text>
    </svg>
  );
}

/* ──── ANCOVA dialog mock ──── */
export function AncovaDialog() {
  return (
    <svg viewBox="0 0 540 320" className="w-full h-auto">
      <rect width="540" height="320" fill="#F1F5F9"/>
      <rect x="10" y="10" width="520" height="300" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".4"/>
      <rect x="10" y="10" width="520" height="26" rx="6" fill="#0A2E5D"/>
      <text x="20" y="28" fontSize="12" fill="#fff" fontWeight="700">Univariate (GLM) — set up for ANCOVA</text>

      <rect x="20" y="50" width="160" height="240" rx="4" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".25"/>
      <text x="100" y="68" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Variables</text>
      <text x="30" y="92"  fontSize="10" fill="#0A2E5D">pupil_id</text>
      <text x="30" y="110" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">mock_score ✓</text>
      <text x="30" y="128" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">teaching_method ✓</text>
      <text x="30" y="146" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">kcpe_entry_score ✓</text>
      <text x="30" y="164" fontSize="10" fill="#0A2E5D">gender</text>

      {/* Dependent */}
      <rect x="200" y="50" width="200" height="44" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="205" y="66" fontSize="10" fill="#0A2E5D" fontWeight="700">Dependent Variable:</text>
      <rect x="208" y="71" width="185" height="20" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="214" y="85" fontSize="10" fill="#0A2E5D" fontWeight="700">mock_score</text>

      {/* Fixed Factor */}
      <rect x="200" y="100" width="200" height="44" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="205" y="116" fontSize="10" fill="#0A2E5D" fontWeight="700">Fixed Factor(s):</text>
      <rect x="208" y="121" width="185" height="20" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="214" y="135" fontSize="10" fill="#0A2E5D" fontWeight="700">teaching_method</text>

      {/* Covariate */}
      <rect x="200" y="150" width="200" height="44" rx="4" fill="#10B981" fillOpacity=".10" stroke="#10B981" strokeWidth="2"/>
      <text x="205" y="166" fontSize="10" fill="#10B981" fontWeight="700">Covariate(s): ← the ANCOVA addition</text>
      <rect x="208" y="171" width="185" height="20" rx="3" fill="#10B981" fillOpacity=".18" stroke="#10B981"/>
      <text x="214" y="185" fontSize="10" fill="#0A2E5D" fontWeight="700">kcpe_entry_score</text>

      <rect x="200" y="200" width="200" height="44" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="205" y="216" fontSize="10" fill="#0A2E5D" fontWeight="700">Random Factor(s):</text>
      <text x="300" y="232" fontSize="9" fill="#94A3B8" textAnchor="middle">(empty)</text>

      {/* Right side buttons */}
      <rect x="415" y="50"  width="110" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="470" y="66"  fontSize="10" fill="#0A2E5D" textAnchor="middle">Model…</text>
      <rect x="415" y="82"  width="110" height="24" rx="3" fill="#10B981"/>
      <text x="470" y="98"  fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Options…</text>
      <text x="415" y="116" fontSize="8" fill="#10B981" fontWeight="700">↑ adjusted means,</text>
      <text x="415" y="126" fontSize="8" fill="#10B981" fontWeight="700">   Bonferroni, partial η²</text>
      <rect x="415" y="134" width="110" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="470" y="150" fontSize="10" fill="#0A2E5D" textAnchor="middle">Plots…</text>
      <rect x="415" y="166" width="110" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="470" y="182" fontSize="10" fill="#0A2E5D" textAnchor="middle">EM Means…</text>

      <rect x="415" y="262" width="50" height="28" rx="3" fill="#10B981"/>
      <text x="440" y="281" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="470" y="262" width="55" height="28" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="497" y="281" fontSize="10" fill="#0A2E5D" textAnchor="middle">Paste</text>
    </svg>
  );
}

/* ──── Homogeneity of slopes check — parallel vs divergent within-group regression lines ──── */
export function HomogeneitySlopesCheck() {
  const points = (slope, intercept, n = 8, jitter = 6) => {
    return Array.from({ length: n }, (_, i) => {
      const x = 20 + i * 18;
      const y = intercept + slope * (x - 20) + (((i * 13) % 7) - 3) * jitter / 2;
      return { x, y };
    });
  };
  const groupsParallel = [
    { color: '#0A2E5D', slope: -0.7, intercept: 150 },
    { color: '#D4AF37', slope: -0.7, intercept: 110 },
    { color: '#10B981', slope: -0.7, intercept: 70 },
  ];
  const groupsViolated = [
    { color: '#0A2E5D', slope: -0.2, intercept: 130 },
    { color: '#D4AF37', slope: -0.7, intercept: 100 },
    { color: '#10B981', slope: -1.4, intercept: 80 },
  ];

  const Panel = ({ x, y, title, status, groups }) => (
    <g transform={`translate(${x},${y})`}>
      <text x="160" y="-4" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{title}</text>
      <rect width="320" height="200" rx="8" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".2"/>
      {/* axes */}
      <line x1="20" y1="180" x2="300" y2="180" stroke="#0A2E5D" strokeOpacity=".4"/>
      <line x1="20" y1="20" x2="20" y2="180" stroke="#0A2E5D" strokeOpacity=".4"/>
      <text x="160" y="196" fontSize="9" fill="#64748B" textAnchor="middle">Covariate</text>
      {groups.map((g, i) => {
        const pts = points(g.slope, g.intercept);
        const x1 = 20, y1 = g.intercept;
        const x2 = 300, y2 = g.intercept + g.slope * 280;
        return (
          <g key={i}>
            {pts.map((p, j) => <circle key={j} cx={p.x} cy={p.y} r="3" fill={g.color} opacity=".6"/>)}
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={g.color} strokeWidth="2.5"/>
          </g>
        );
      })}
      <text x="160" y="218" fontSize="11" fill={status === 'met' ? '#10B981' : '#EF4444'}
            textAnchor="middle" fontWeight="700">{status === 'met' ? '✓ assumption MET — proceed with ANCOVA' : '✗ assumption VIOLATED — report interaction instead'}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 720 280" className="w-full h-auto">
      <rect width="720" height="280" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Homogeneity of regression slopes — parallel lines (left) vs divergent (right)
      </text>
      <Panel x={20} y={40}  title="Parallel slopes"  status="met"      groups={groupsParallel}/>
      <Panel x={380} y={40} title="Divergent slopes" status="violated" groups={groupsViolated}/>
    </svg>
  );
}

/* ──── ANCOVA output — three tables ──── */
export function AncovaOutput() {
  return (
    <svg viewBox="0 0 720 380" className="w-full h-auto">
      <rect width="720" height="380" fill="#fff"/>

      {/* Tests of Between-Subjects Effects */}
      <text x="10" y="18" fontSize="11" fill="#0A2E5D" fontWeight="700">Tests of Between-Subjects Effects</text>
      <rect x="10" y="24" width="700" height="22" fill="#0A2E5D"/>
      <text x="120" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Source</text>
      <text x="320" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">F</text>
      <text x="430" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">df</text>
      <text x="540" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Sig.</text>
      <text x="650" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Partial η²</text>
      {[
        { src: 'Corrected Model',  F: '34.6', df: '3',   sig: '< .001', eta: '.473',  bold: false },
        { src: 'kcpe_entry_score (covariate)', F: '89.2', df: '1', sig: '< .001', eta: '.435', bold: true },
        { src: 'teaching_method (factor)',     F: '4.1',  df: '2', sig: '.019',  eta: '.066', bold: true, highlight: true },
        { src: 'Error',            F: '',      df: '116', sig: '',       eta: '', bold: false },
      ].map((r, i) => {
        const y = 46 + i * 22;
        const bg = r.highlight ? '#FBF6E5' : (i % 2 === 0 ? '#FAF7EF' : '#fff');
        const stroke = r.highlight ? '#D4AF37' : 'none';
        return (
          <g key={i}>
            <rect x="10" y={y} width="700" height="22" fill={bg} stroke={stroke} strokeWidth={r.highlight ? 2 : 0}/>
            <text x="30" y={y + 15} fontSize="10" fill="#0A2E5D" fontWeight={r.bold ? '700' : '400'}>{r.src}</text>
            <text x="320" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight={r.bold ? '700' : '400'}>{r.F}</text>
            <text x="430" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.df}</text>
            <text x="540" y={y + 15} fontSize="10" fill={r.bold && r.sig ? '#10B981' : '#0A2E5D'} textAnchor="middle" fontWeight={r.bold ? '700' : '400'}>{r.sig}</text>
            <text x="650" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight={r.bold ? '700' : '400'}>{r.eta}</text>
          </g>
        );
      })}

      {/* Estimated Marginal Means */}
      <text x="10" y="170" fontSize="11" fill="#0A2E5D" fontWeight="700">Estimated Marginal Means (adjusted at grand mean KCPE = 317)</text>
      <rect x="10" y="176" width="700" height="22" fill="#0A2E5D"/>
      <text x="160" y="192" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">teaching_method</text>
      <text x="350" y="192" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Adjusted Mean</text>
      <text x="500" y="192" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Std. Error</text>
      <text x="630" y="192" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">95% CI</text>
      {[
        { name: 'Traditional',  m: '291', se: '5.2', ci: '[280, 301]' },
        { name: 'Discussion',   m: '309', se: '5.1', ci: '[299, 319]' },
        { name: 'Flipped',      m: '325', se: '5.3', ci: '[315, 336]' },
      ].map((r, i) => {
        const y = 198 + i * 22;
        const bg = i % 2 === 0 ? '#FAF7EF' : '#fff';
        return (
          <g key={i}>
            <rect x="10" y={y} width="700" height="22" fill={bg}/>
            <text x="160" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.name}</text>
            <text x="350" y={y + 15} fontSize="12" fill="#10B981" textAnchor="middle" fontWeight="700">{r.m}</text>
            <text x="500" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">({r.se})</text>
            <text x="630" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.ci}</text>
          </g>
        );
      })}

      {/* Pairwise Comparisons */}
      <text x="10" y="296" fontSize="11" fill="#0A2E5D" fontWeight="700">Pairwise Comparisons (Bonferroni-adjusted)</text>
      <rect x="10" y="302" width="700" height="22" fill="#0A2E5D"/>
      <text x="160" y="318" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Comparison</text>
      <text x="380" y="318" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Mean Diff. (adj.)</text>
      <text x="600" y="318" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Sig. (Bonferroni)</text>
      {[
        { pair: 'Traditional vs Discussion', md: '−18', sig: '.057', sigYes: false },
        { pair: 'Traditional vs Flipped',    md: '−34', sig: '.009', sigYes: true  },
        { pair: 'Discussion vs Flipped',     md: '−16', sig: '.120', sigYes: false },
      ].map((r, i) => {
        const y = 324 + i * 22;
        const bg = i % 2 === 0 ? '#FAF7EF' : '#fff';
        const color = r.sigYes ? '#10B981' : '#64748B';
        return (
          <g key={i}>
            <rect x="10" y={y} width="700" height="22" fill={bg}/>
            <text x="160" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.pair}</text>
            <text x="380" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.md}</text>
            <text x="600" y={y + 15} fontSize="11" fill={color} textAnchor="middle" fontWeight="700">{r.sig}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ──── MANOVA logic — diagonal separation axis ──── */
export function ManovaLogic() {
  // Three clusters in (anxiety, depression) space
  const cluster = (cx, cy, color, rotate = 0) => Array.from({ length: 14 }, (_, i) => {
    const t = (i / 14) * Math.PI * 2;
    const r = 22 + ((i * 13) % 11);
    const x = cx + r * Math.cos(t + rotate) * 0.8;
    const y = cy + r * Math.sin(t + rotate) * 0.6;
    return { x, y, color };
  });
  const groups = [
    ...cluster(180, 200, '#0A2E5D'),   // CBT
    ...cluster(260, 150, '#D4AF37'),   // Peer
    ...cluster(340, 100, '#10B981'),   // Control
  ];

  return (
    <svg viewBox="0 0 720 320" className="w-full h-auto">
      <rect width="720" height="320" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        MANOVA finds the diagonal axis that maximally separates groups
      </text>

      {/* axes */}
      <line x1="80" y1="260" x2="500" y2="260" stroke="#0A2E5D" strokeOpacity=".4"/>
      <line x1="80" y1="60"  x2="80" y2="260" stroke="#0A2E5D" strokeOpacity=".4"/>
      <text x="290" y="280" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Anxiety (X)</text>
      <text x="50"  y="160" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700" transform="rotate(-90, 50, 160)">Depression (Y)</text>

      {/* points */}
      {groups.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill={p.color} opacity=".75"/>
      ))}

      {/* diagonal separation line (the discriminant axis) */}
      <line x1="100" y1="250" x2="450" y2="60" stroke="#EF4444" strokeWidth="2" strokeDasharray="6 4"/>
      <text x="475" y="60" fontSize="10" fill="#EF4444" fontWeight="700">MANOVA's optimal</text>
      <text x="475" y="74" fontSize="10" fill="#EF4444" fontWeight="700">separation axis</text>

      {/* legend */}
      <g transform="translate(540, 130)">
        <text x="0" y="0" fontSize="10" fill="#0A2E5D" fontWeight="700">Three treatment groups:</text>
        <circle cx="10" cy="20" r="6" fill="#0A2E5D"/><text x="22" y="24" fontSize="10" fill="#0A2E5D">CBT</text>
        <circle cx="10" cy="40" r="6" fill="#D4AF37"/><text x="22" y="44" fontSize="10" fill="#0A2E5D">Peer Support</text>
        <circle cx="10" cy="60" r="6" fill="#10B981"/><text x="22" y="64" fontSize="10" fill="#0A2E5D">Control</text>
        <text x="0" y="92" fontSize="9" fill="#64748B" fontStyle="italic">Projecting onto the red axis</text>
        <text x="0" y="104" fontSize="9" fill="#64748B" fontStyle="italic">separates the groups maximally —</text>
        <text x="0" y="116" fontSize="9" fill="#64748B" fontStyle="italic">often more sharply than X or Y alone.</text>
      </g>
    </svg>
  );
}

/* ──── MANOVA dialog mock ──── */
export function ManovaDialog() {
  return (
    <svg viewBox="0 0 540 320" className="w-full h-auto">
      <rect width="540" height="320" fill="#F1F5F9"/>
      <rect x="10" y="10" width="520" height="300" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".4"/>
      <rect x="10" y="10" width="520" height="26" rx="6" fill="#0A2E5D"/>
      <text x="20" y="28" fontSize="12" fill="#fff" fontWeight="700">Multivariate (GLM) — set up for MANOVA</text>

      <rect x="20" y="50" width="160" height="240" rx="4" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".25"/>
      <text x="100" y="68" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Variables</text>
      <text x="30" y="92"  fontSize="10" fill="#0A2E5D">student_id</text>
      <text x="30" y="110" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">gad7_anxiety ✓</text>
      <text x="30" y="128" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">phq9_depression ✓</text>
      <text x="30" y="146" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">pss10_stress ✓</text>
      <text x="30" y="164" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">self_efficacy ✓</text>
      <text x="30" y="182" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">exam_avoidance ✓</text>
      <text x="30" y="200" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">treatment_group ✓</text>

      {/* Dependent Variables — multiple */}
      <rect x="200" y="50" width="200" height="120" rx="4" fill="#10B981" fillOpacity=".10" stroke="#10B981" strokeWidth="2"/>
      <text x="205" y="66" fontSize="10" fill="#10B981" fontWeight="700">Dependent Variables: ← MULTIPLE!</text>
      {['gad7_anxiety', 'phq9_depression', 'pss10_stress', 'self_efficacy', 'exam_avoidance'].map((v, i) => (
        <g key={v}>
          <rect x="208" y={73 + i * 18} width="185" height="16" rx="2" fill="#10B981" fillOpacity=".15" stroke="#10B981"/>
          <text x="214" y={85 + i * 18} fontSize="9" fill="#0A2E5D" fontWeight="700">{v}</text>
        </g>
      ))}

      {/* Fixed Factor */}
      <rect x="200" y="180" width="200" height="44" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="205" y="196" fontSize="10" fill="#0A2E5D" fontWeight="700">Fixed Factor(s):</text>
      <rect x="208" y="201" width="185" height="20" rx="3" fill="#FBF6E5" stroke="#D4AF37"/>
      <text x="214" y="215" fontSize="10" fill="#0A2E5D" fontWeight="700">treatment_group</text>

      <rect x="200" y="232" width="200" height="44" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="205" y="248" fontSize="10" fill="#0A2E5D" fontWeight="700">Covariate(s):</text>
      <text x="300" y="264" fontSize="9" fill="#94A3B8" textAnchor="middle">(empty for MANOVA; add for MANCOVA)</text>

      {/* Right side buttons */}
      <rect x="415" y="50"  width="110" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="470" y="66"  fontSize="10" fill="#0A2E5D" textAnchor="middle">Model…</text>
      <rect x="415" y="82"  width="110" height="24" rx="3" fill="#10B981"/>
      <text x="470" y="98"  fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Options…</text>
      <text x="415" y="116" fontSize="8" fill="#10B981" fontWeight="700">↑ Box's M, partial η²,</text>
      <text x="415" y="126" fontSize="8" fill="#10B981" fontWeight="700">   Bonferroni pairwise</text>
      <rect x="415" y="134" width="110" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="470" y="150" fontSize="10" fill="#0A2E5D" textAnchor="middle">Post Hoc…</text>
      <rect x="415" y="166" width="110" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="470" y="182" fontSize="10" fill="#0A2E5D" textAnchor="middle">EM Means…</text>

      <rect x="415" y="262" width="50" height="28" rx="3" fill="#10B981"/>
      <text x="440" y="281" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="470" y="262" width="55" height="28" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="497" y="281" fontSize="10" fill="#0A2E5D" textAnchor="middle">Paste</text>
    </svg>
  );
}

/* ──── MANOVA output — flow of tables ──── */
export function ManovaOutput() {
  return (
    <svg viewBox="0 0 720 380" className="w-full h-auto">
      <rect width="720" height="380" fill="#fff"/>

      {/* Box's M */}
      <text x="10" y="18" fontSize="11" fill="#0A2E5D" fontWeight="700">1. Box's Test of Equality of Covariance Matrices</text>
      <rect x="10" y="24" width="700" height="22" fill="#0A2E5D"/>
      <text x="100" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Box's M</text>
      <text x="300" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">F</text>
      <text x="500" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Sig. (use threshold .001)</text>
      <rect x="10" y="46" width="700" height="22" fill="#FAF7EF"/>
      <text x="100" y="61" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">28.6</text>
      <text x="300" y="61" fontSize="11" fill="#0A2E5D" textAnchor="middle">1.34</text>
      <text x="500" y="61" fontSize="12" fill="#10B981" textAnchor="middle" fontWeight="700">.140 ✓ &gt; .001 → assumption met → use Wilks' Λ</text>

      {/* Multivariate Tests */}
      <text x="10" y="92" fontSize="11" fill="#0A2E5D" fontWeight="700">2. Multivariate Tests (treatment_group effect)</text>
      <rect x="10" y="98" width="700" height="22" fill="#0A2E5D"/>
      <text x="100" y="114" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Statistic</text>
      <text x="250" y="114" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Value</text>
      <text x="350" y="114" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">F</text>
      <text x="450" y="114" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">df</text>
      <text x="560" y="114" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Sig.</text>
      <text x="660" y="114" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Partial η²</text>
      {[
        { stat: 'Pillai\'s Trace',   val: '.279', F: '2.79', df: '10, 168', sig: '.003', eta: '.142' },
        { stat: "Wilks' Λ",          val: '.730', F: '2.85', df: '10, 166', sig: '.003', eta: '.147', highlight: true },
        { stat: 'Hotelling\'s Trace', val: '.354', F: '2.90', df: '10, 164', sig: '.002', eta: '.151' },
        { stat: 'Roy\'s Largest Root', val: '.301', F: '5.06', df: '5, 84',  sig: '< .001', eta: '.232' },
      ].map((r, i) => {
        const y = 120 + i * 22;
        const bg = r.highlight ? '#FBF6E5' : (i % 2 === 0 ? '#FAF7EF' : '#fff');
        const stroke = r.highlight ? '#D4AF37' : 'none';
        return (
          <g key={i}>
            <rect x="10" y={y} width="700" height="22" fill={bg} stroke={stroke} strokeWidth={r.highlight ? 2 : 0}/>
            <text x="100" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight={r.highlight ? '700' : '400'}>{r.stat}</text>
            <text x="250" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight={r.highlight ? '700' : '400'}>{r.val}</text>
            <text x="350" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight={r.highlight ? '700' : '400'}>{r.F}</text>
            <text x="450" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.df}</text>
            <text x="560" y={y + 15} fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">{r.sig}</text>
            <text x="660" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight={r.highlight ? '700' : '400'}>{r.eta}</text>
          </g>
        );
      })}

      {/* Univariate follow-ups */}
      <text x="10" y="240" fontSize="11" fill="#0A2E5D" fontWeight="700">3. Tests of Between-Subjects Effects (univariate follow-ups · Bonferroni α = .05/5 = .01)</text>
      <rect x="10" y="246" width="700" height="22" fill="#0A2E5D"/>
      <text x="120" y="262" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Outcome</text>
      <text x="320" y="262" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">F(2, 87)</text>
      <text x="490" y="262" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Sig.</text>
      <text x="620" y="262" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Survives .01?</text>
      {[
        { o: 'gad7_anxiety',    F: '6.40', sig: '.003', pass: true },
        { o: 'phq9_depression', F: '3.40', sig: '.040', pass: false },
        { o: 'pss10_stress',    F: '2.20', sig: '.120', pass: false },
        { o: 'self_efficacy',   F: '5.10', sig: '.008', pass: true },
        { o: 'exam_avoidance',  F: '1.90', sig: '.150', pass: false },
      ].map((r, i) => {
        const y = 268 + i * 22;
        const bg = i % 2 === 0 ? '#FAF7EF' : '#fff';
        const color = r.pass ? '#10B981' : '#94A3B8';
        return (
          <g key={i}>
            <rect x="10" y={y} width="700" height="22" fill={bg}/>
            <text x="120" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.o}</text>
            <text x="320" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle">{r.F}</text>
            <text x="490" y={y + 15} fontSize="11" fill={color} textAnchor="middle" fontWeight="700">{r.sig}</text>
            <text x="620" y={y + 15} fontSize="11" fill={color} textAnchor="middle" fontWeight="700">{r.pass ? '✓ YES' : '✗ exploratory only'}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ──── Mixed ANOVA: three patterns of interaction ──── */
export function MixedAnovaInteraction() {
  // Three line-plots side by side: no effect, parallel decline (no interaction), divergent (interaction)
  const Panel = ({ x, y, title, status, lines }) => (
    <g transform={`translate(${x},${y})`}>
      <text x="110" y="-4" fontSize="11" fill="#0A2E5D" textAnchor="middle" fontWeight="700">{title}</text>
      <rect width="220" height="200" rx="8" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".2"/>
      <line x1="20" y1="180" x2="200" y2="180" stroke="#0A2E5D" strokeOpacity=".4"/>
      <line x1="20" y1="20" x2="20" y2="180" stroke="#0A2E5D" strokeOpacity=".4"/>
      {/* x labels */}
      {[ 'baseline', 'mid', 'end' ].map((lab, i) => (
        <text key={lab} x={30 + i * 80} y="196" fontSize="9" fill="#64748B" textAnchor="middle">{lab}</text>
      ))}
      {/* lines */}
      {lines.map((line, i) => {
        const pts = line.points.map((py, j) => ({ x: 30 + j * 80, y: py }));
        const d = pts.map((p, j) => `${j === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        return (
          <g key={i}>
            <path d={d} stroke={line.color} strokeWidth="2.5" fill="none"/>
            {pts.map((p, j) => <circle key={j} cx={p.x} cy={p.y} r="4" fill={line.color}/>)}
          </g>
        );
      })}
      <text x="110" y="222" fontSize="10" fill={status === 'interaction' ? '#10B981' : '#64748B'} textAnchor="middle" fontWeight="700">{status === 'interaction' ? '✓ interaction (focal)' : status === 'main' ? 'main effects only' : 'no effects'}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 720 280" className="w-full h-auto">
      <rect width="720" height="280" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Three patterns in a mixed ANOVA — the focal pattern is the INTERACTION
      </text>

      <Panel x={20} y={40} title="No effects (flat parallel)" status="none"
        lines={[
          { color: '#0A2E5D', points: [100, 100, 100] },
          { color: '#D4AF37', points: [110, 110, 110] },
          { color: '#10B981', points: [120, 120, 120] },
        ]}/>

      <Panel x={250} y={40} title="Main effects only (parallel decline)" status="main"
        lines={[
          { color: '#0A2E5D', points: [60, 100, 140] },
          { color: '#D4AF37', points: [70, 110, 150] },
          { color: '#10B981', points: [80, 120, 160] },
        ]}/>

      <Panel x={480} y={40} title="Interaction (divergent trajectories)" status="interaction"
        lines={[
          { color: '#0A2E5D', points: [80, 110, 160] },   // Full programme — steepest decline (high to low HbA1c looks like a rise on inverted y)
          { color: '#D4AF37', points: [80, 100, 130] },   // Abbreviated — moderate
          { color: '#10B981', points: [85, 90,  92] },    // Control — flat
        ]}/>
    </svg>
  );
}

/* ──── Mixed ANOVA dialog mock ──── */
export function MixedAnovaDialog() {
  return (
    <svg viewBox="0 0 540 320" className="w-full h-auto">
      <rect width="540" height="320" fill="#F1F5F9"/>
      <rect x="10" y="10" width="520" height="300" rx="6" fill="#fff" stroke="#0A2E5D" strokeOpacity=".4"/>
      <rect x="10" y="10" width="520" height="26" rx="6" fill="#0A2E5D"/>
      <text x="20" y="28" fontSize="12" fill="#fff" fontWeight="700">Repeated Measures — set up for Mixed ANOVA</text>

      <rect x="20" y="50" width="160" height="240" rx="4" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".25"/>
      <text x="100" y="68" fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight="700">Variables</text>
      <text x="30" y="92"  fontSize="10" fill="#0A2E5D">patient_id</text>
      <text x="30" y="110" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">hba1c_baseline ✓</text>
      <text x="30" y="128" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">hba1c_week6 ✓</text>
      <text x="30" y="146" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">hba1c_week12 ✓</text>
      <text x="30" y="164" fontSize="10" fill="#0A2E5D" fontWeight="700" fillOpacity="0.4">treatment_arm ✓</text>

      {/* Within-Subjects Variables — three columns mapped */}
      <rect x="200" y="50" width="200" height="100" rx="4" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
      <text x="205" y="66" fontSize="10" fill="#0A2E5D" fontWeight="700">Within-Subjects Variables (time):</text>
      {[
        { idx: '(1)', v: 'hba1c_baseline' },
        { idx: '(2)', v: 'hba1c_week6' },
        { idx: '(3)', v: 'hba1c_week12' },
      ].map((r, i) => (
        <g key={r.idx}>
          <text x="214" y={87 + i * 18} fontSize="9" fill="#D4AF37" fontWeight="700">{r.idx}</text>
          <rect x="240" y={75 + i * 18} width="155" height="16" rx="2" fill="#FBF6E5" stroke="#D4AF37"/>
          <text x="248" y={87 + i * 18} fontSize="9" fill="#0A2E5D" fontWeight="700">{r.v}</text>
        </g>
      ))}

      {/* Between-Subjects Factor */}
      <rect x="200" y="160" width="200" height="50" rx="4" fill="#10B981" fillOpacity=".12" stroke="#10B981" strokeWidth="2"/>
      <text x="205" y="176" fontSize="10" fill="#10B981" fontWeight="700">Between-Subjects Factor(s): ← MIXED!</text>
      <rect x="208" y="182" width="185" height="20" rx="3" fill="#10B981" fillOpacity=".18" stroke="#10B981"/>
      <text x="214" y="196" fontSize="10" fill="#0A2E5D" fontWeight="700">treatment_arm</text>

      <rect x="200" y="216" width="200" height="50" rx="4" fill="#fff" stroke="#0A2E5D"/>
      <text x="205" y="232" fontSize="10" fill="#0A2E5D" fontWeight="700">Covariates:</text>
      <text x="300" y="252" fontSize="9" fill="#94A3B8" textAnchor="middle">(optional — add for mixed ANCOVA)</text>

      {/* Right side buttons */}
      <rect x="415" y="50"  width="110" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="470" y="66"  fontSize="10" fill="#0A2E5D" textAnchor="middle">Model…</text>
      <rect x="415" y="82"  width="110" height="24" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="470" y="98"  fontSize="10" fill="#0A2E5D" textAnchor="middle">Contrasts…</text>
      <rect x="415" y="114" width="110" height="24" rx="3" fill="#10B981"/>
      <text x="470" y="130" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Plots…</text>
      <text x="415" y="148" fontSize="8" fill="#10B981" fontWeight="700">↑ time on X, arm</text>
      <text x="415" y="158" fontSize="8" fill="#10B981" fontWeight="700">   as separate lines</text>
      <rect x="415" y="166" width="110" height="24" rx="3" fill="#10B981"/>
      <text x="470" y="182" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Options…</text>
      <text x="415" y="200" fontSize="8" fill="#10B981" fontWeight="700">↑ EM means, partial η²</text>

      <rect x="415" y="262" width="50" height="28" rx="3" fill="#10B981"/>
      <text x="440" y="281" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">OK</text>
      <rect x="470" y="262" width="55" height="28" rx="3" fill="#fff" stroke="#0A2E5D"/>
      <text x="497" y="281" fontSize="10" fill="#0A2E5D" textAnchor="middle">Paste</text>
    </svg>
  );
}

/* ──── Mixed ANOVA output: focused on the three effects + profile plot ──── */
export function MixedAnovaOutput() {
  return (
    <svg viewBox="0 0 720 400" className="w-full h-auto">
      <rect width="720" height="400" fill="#fff"/>

      {/* Mauchly's */}
      <text x="10" y="18" fontSize="11" fill="#0A2E5D" fontWeight="700">1. Mauchly's Test of Sphericity</text>
      <rect x="10" y="24" width="700" height="22" fill="#0A2E5D"/>
      <text x="200" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Within Effect</text>
      <text x="380" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Mauchly's W</text>
      <text x="500" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Sig.</text>
      <text x="630" y="40" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">ε (G-G)</text>
      <rect x="10" y="46" width="700" height="22" fill="#FAF7EF"/>
      <text x="200" y="61" fontSize="10" fill="#0A2E5D" textAnchor="middle">time</text>
      <text x="380" y="61" fontSize="10" fill="#0A2E5D" textAnchor="middle">.89</text>
      <text x="500" y="61" fontSize="12" fill="#EF4444" textAnchor="middle" fontWeight="700">.015 ✗ → use G-G</text>
      <text x="630" y="61" fontSize="10" fill="#0A2E5D" textAnchor="middle">.81</text>

      {/* Within effects (G-G) */}
      <text x="10" y="92" fontSize="11" fill="#0A2E5D" fontWeight="700">2. Tests of Within-Subjects Effects (Greenhouse-Geisser rows)</text>
      <rect x="10" y="98" width="700" height="22" fill="#0A2E5D"/>
      <text x="200" y="114" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Source</text>
      <text x="380" y="114" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">F (df)</text>
      <text x="510" y="114" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Sig.</text>
      <text x="640" y="114" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Partial η²</text>
      {[
        { src: 'time', F: '25.6 (1.62, 116.7)', sig: '< .001', eta: '.260', big: true },
        { src: 'time × treatment_arm', F: '8.4 (3.24, 116.7)', sig: '< .001', eta: '.190', highlight: true, big: true },
      ].map((r, i) => {
        const y = 120 + i * 22;
        const bg = r.highlight ? '#FBF6E5' : (i % 2 === 0 ? '#FAF7EF' : '#fff');
        const stroke = r.highlight ? '#D4AF37' : 'none';
        return (
          <g key={i}>
            <rect x="10" y={y} width="700" height="22" fill={bg} stroke={stroke} strokeWidth={r.highlight ? 2 : 0}/>
            <text x="200" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight={r.big ? '700' : '400'}>{r.src}</text>
            <text x="380" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight={r.big ? '700' : '400'}>{r.F}</text>
            <text x="510" y={y + 15} fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">{r.sig}</text>
            <text x="640" y={y + 15} fontSize="10" fill="#0A2E5D" textAnchor="middle" fontWeight={r.big ? '700' : '400'}>{r.eta}</text>
          </g>
        );
      })}

      {/* Between effects */}
      <text x="10" y="188" fontSize="11" fill="#0A2E5D" fontWeight="700">3. Tests of Between-Subjects Effects</text>
      <rect x="10" y="194" width="700" height="22" fill="#0A2E5D"/>
      <text x="200" y="210" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Source</text>
      <text x="380" y="210" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">F (df)</text>
      <text x="510" y="210" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Sig.</text>
      <text x="640" y="210" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Partial η²</text>
      <rect x="10" y="216" width="700" height="22" fill="#FAF7EF"/>
      <text x="200" y="231" fontSize="10" fill="#0A2E5D" textAnchor="middle">treatment_arm</text>
      <text x="380" y="231" fontSize="10" fill="#0A2E5D" textAnchor="middle">0.8 (2, 72)</text>
      <text x="510" y="231" fontSize="11" fill="#64748B" textAnchor="middle">.44</text>
      <text x="640" y="231" fontSize="10" fill="#0A2E5D" textAnchor="middle">.020</text>
      <text x="10" y="258" fontSize="9" fill="#64748B" fontStyle="italic">
        Non-significant — expected because randomisation made arms equal at baseline. The interaction (above) is the headline.
      </text>

      {/* Profile plot mini */}
      <text x="10" y="288" fontSize="11" fill="#0A2E5D" fontWeight="700">4. Profile Plot — interaction visualised</text>
      <g transform="translate(10, 296)">
        <rect width="700" height="100" rx="6" fill="#FAF7EF" stroke="#0A2E5D" strokeOpacity=".2"/>
        <line x1="30" y1="80" x2="670" y2="80" stroke="#0A2E5D" strokeOpacity=".4"/>
        <line x1="30" y1="15" x2="30" y2="80" stroke="#0A2E5D" strokeOpacity=".4"/>
        {[ 'baseline', 'week 6', 'week 12' ].map((lab, i) => (
          <text key={lab} x={30 + i * 320} y="94" fontSize="9" fill="#64748B" textAnchor="middle">{lab}</text>
        ))}
        {/* three lines */}
        {[
          { color: '#0A2E5D', name: 'Full',  pts: [25, 50, 75] },
          { color: '#D4AF37', name: 'Abbr.', pts: [25, 40, 55] },
          { color: '#10B981', name: 'Control', pts: [28, 30, 32] },
        ].map((line, i) => {
          const pts = line.pts.map((py, j) => ({ x: 30 + j * 320, y: py }));
          const d = pts.map((p, j) => `${j === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
          return (
            <g key={i}>
              <path d={d} stroke={line.color} strokeWidth="2.5" fill="none"/>
              {pts.map((p, j) => <circle key={j} cx={p.x} cy={p.y} r="4" fill={line.color}/>)}
              <text x="690" y={pts[2].y + 4} fontSize="9" fill={line.color} fontWeight="700">{line.name}</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   WRITING UP — Chapter 4 structure and APA 7 formatting
   ════════════════════════════════════════════════════════════ */

/* ──── Chapter 4 six-section structure ──── */
export function Chapter4Structure() {
  const sections = [
    { num: '4.1', title: 'Introduction',                          pages: 0.5, sub: 'Restate RQs, preview chapter' },
    { num: '4.2', title: 'Response rate & sample',                pages: 1,   sub: 'How many responded; demographics table' },
    { num: '4.3', title: 'Descriptive statistics',                pages: 4,   sub: 'M, SD (or Mdn, IQR) for every variable used later' },
    { num: '4.4', title: 'Preliminary analyses / assumption checks', pages: 2.5, sub: 'Reliability, normality, VIF, Levene, Mauchly, Box\'s M' },
    { num: '4.5', title: 'Inferential analyses',                  pages: 12,  sub: 'One sub-section per research question · the bulk', hero: true },
    { num: '4.6', title: 'Chapter summary',                       pages: 0.5, sub: 'Recap findings; bridge to Chapter 5' },
  ];
  const maxPages = 12;
  return (
    <svg viewBox="0 0 720 380" className="w-full h-auto">
      <rect width="720" height="380" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        The standard six-section Chapter 4 structure
      </text>

      {sections.map((s, i) => {
        const y = 50 + i * 52;
        const barLen = (s.pages / maxPages) * 380;
        const barColor = s.hero ? '#D4AF37' : '#0A2E5D';
        return (
          <g key={s.num}>
            {/* section number & title */}
            <text x="20" y={y + 14} fontSize="13" fill={s.hero ? '#D4AF37' : '#0A2E5D'} fontWeight="700">{s.num}</text>
            <text x="65" y={y + 14} fontSize="12" fill="#0A2E5D" fontWeight="700">{s.title}</text>
            <text x="65" y={y + 30} fontSize="10" fill="#64748B" fontStyle="italic">{s.sub}</text>
            {/* page bar */}
            <rect x="320" y={y + 6} width={barLen} height="20" rx="4" fill={barColor} opacity={s.hero ? 0.9 : 0.6}/>
            <text x={320 + barLen + 8} y={y + 20} fontSize="11" fill="#0A2E5D" fontWeight="700">
              ≈ {s.pages < 1 ? '½' : s.pages} {s.pages === 1 ? 'page' : 'pages'}
            </text>
            {s.hero && (
              <text x={320 + barLen + 60} y={y + 20} fontSize="10" fill="#D4AF37" fontWeight="700">← the bulk</text>
            )}
          </g>
        );
      })}

      {/* Total */}
      <line x1="20" y1="365" x2="700" y2="365" stroke="#0A2E5D" strokeOpacity=".3"/>
      <text x="360" y="378" fontSize="10" fill="#64748B" textAnchor="middle">
        Total ≈ 15-25 pages (Master's) or 20-35 pages (PhD). Section 4.5 is always the largest.
      </text>
    </svg>
  );
}

/* ──── Inferential section (4.5) internal structure ──── */
export function InferentialSectionStructure() {
  const questions = [
    { num: '4.5.1', rq: 'RQ1: Descriptive levels of engagement',       test: 'Descriptive summary' },
    { num: '4.5.2', rq: 'RQ2: Demographic differences in engagement',   test: 'Independent t-test + one-way ANOVA' },
    { num: '4.5.3', rq: 'RQ3: POS as predictor beyond demographics',    test: 'Hierarchical multiple regression' },
  ];
  return (
    <svg viewBox="0 0 720 400" className="w-full h-auto">
      <rect width="720" height="400" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Section 4.5: one sub-section per research question — same four-step template every time
      </text>

      {/* Left column — the three RQ sub-sections */}
      {questions.map((q, i) => {
        const y = 55 + i * 100;
        return (
          <g key={q.num}>
            <rect x="20" y={y} width="240" height="82" rx="8" fill="#FBF6E5" stroke="#D4AF37" strokeWidth="2"/>
            <text x="30" y={y + 20} fontSize="13" fill="#D4AF37" fontWeight="700">{q.num}</text>
            <text x="30" y={y + 42} fontSize="11" fill="#0A2E5D" fontWeight="700">{q.rq}</text>
            <text x="30" y={y + 62} fontSize="10" fill="#64748B" fontStyle="italic">{q.test}</text>
          </g>
        );
      })}

      {/* Arrow to the template */}
      <text x="290" y="200" fontSize="24" fill="#0A2E5D" fontWeight="700">→</text>

      {/* Right column — the four-step template */}
      <rect x="330" y="70" width="370" height="290" rx="10" fill="#10B981" fillOpacity=".08" stroke="#10B981" strokeWidth="2"/>
      <text x="515" y="95" fontSize="12" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Four-step template (same for every sub-section)
      </text>

      {[
        { n: '1', title: 'Restate the RQ/H', body: 'One bolded/italicised sentence naming the research question this sub-section answers.' },
        { n: '2', title: 'Name & justify the test', body: 'One or two sentences: "A hierarchical multiple regression was conducted, entering demographics in Block 1 and POS in Block 2, to isolate POS\'s unique contribution."' },
        { n: '3', title: 'Present the results table', body: 'ONE consolidated APA 7 table (not raw SPSS output). Numbered "Table 4.7" with italic title.' },
        { n: '4', title: 'Interpret in 1-2 paragraphs', body: 'Walk the reader through the key numbers in APA format. End with ONE concluding sentence answering the RQ. Save literature comparison for Chapter 5.' },
      ].map((step, i) => {
        const y = 115 + i * 60;
        return (
          <g key={step.n}>
            <circle cx="360" cy={y} r="14" fill="#10B981"/>
            <text x="360" y={y + 5} fontSize="12" fill="#fff" textAnchor="middle" fontWeight="700">{step.n}</text>
            <text x="385" y={y - 2} fontSize="11" fill="#0A2E5D" fontWeight="700">{step.title}</text>
            <text x="385" y={y + 14} fontSize="9" fill="#64748B"><tspan>{step.body.slice(0, 68)}</tspan></text>
            {step.body.length > 68 && <text x="385" y={y + 26} fontSize="9" fill="#64748B">{step.body.slice(68, 135)}</text>}
          </g>
        );
      })}

      <text x="360" y="390" fontSize="10" fill="#64748B" textAnchor="middle">
        Same 4-step template repeated for every RQ. Reader always knows where they are in the chapter.
      </text>
    </svg>
  );
}

/* ──── APA 7 formatting rules card ──── */
export function ApaFormattingRules() {
  const rules = [
    { rule: 'Italicise statistical symbols', correct: 't, F, p, r, M, SD, R², β, η² (italic)', wrong: 't, F, p, r (not italic)' },
    { rule: 'No italics for dfs, subscripts, names', correct: 'F(2, 117) — F italic, dfs upright',      wrong: 'F(2, 117) all italic' },
    { rule: 'No leading zeros on stats bounded ±1', correct: 'p = .032, r = .48, β = .32, R² = .47',    wrong: 'p = 0.032, r = 0.48' },
    { rule: 'Leading zeros on stats that can exceed 1', correct: 't = 3.42, F = 5.80, M = 34.20',       wrong: 't = .42 (if actually 0.42)' },
    { rule: '2 decimals standard; 3 for tiny p', correct: 'M = 34.20, SD = 6.10, p = .032, p < .001',   wrong: 'M = 34.2000, SD = 6.1' },
    { rule: 'Space around every = < >', correct: 'M = 34.20, p < .001, F > 1',                          wrong: 'M=34.20, p<.001, F>1' },
    { rule: 'Never write p = .000', correct: 'p < .001 (SPSS truncates; p is never zero)',              wrong: 'p = .000, p = 0.000' },
  ];
  return (
    <svg viewBox="0 0 720 440" className="w-full h-auto">
      <rect width="720" height="440" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        The seven APA 7 formatting rules — print and keep next to your keyboard
      </text>

      {/* Header row */}
      <rect x="10" y="34" width="700" height="26" fill="#0A2E5D"/>
      <text x="130" y="52" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">Rule</text>
      <text x="380" y="52" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="700">✓ CORRECT (APA 7)</text>
      <text x="600" y="52" fontSize="11" fill="#EF4444" textAnchor="middle" fontWeight="700">✗ WRONG</text>

      {rules.map((r, i) => {
        const y = 60 + i * 52;
        const bg = i % 2 === 0 ? '#FAF7EF' : '#fff';
        return (
          <g key={i}>
            <rect x="10" y={y} width="700" height="52" fill={bg}/>
            <text x="20" y={y + 22} fontSize="10" fill="#0A2E5D" fontWeight="700">{i + 1}. {r.rule.slice(0, 32)}</text>
            {r.rule.length > 32 && <text x="20" y={y + 36} fontSize="10" fill="#0A2E5D" fontWeight="700">{r.rule.slice(32)}</text>}
            <text x="245" y={y + 28} fontSize="10" fill="#10B981" fontFamily="monospace">{r.correct.slice(0, 32)}</text>
            {r.correct.length > 32 && <text x="245" y={y + 42} fontSize="10" fill="#10B981" fontFamily="monospace">{r.correct.slice(32)}</text>}
            <text x="490" y={y + 28} fontSize="10" fill="#EF4444" fontFamily="monospace">{r.wrong.slice(0, 32)}</text>
            {r.wrong.length > 32 && <text x="490" y={y + 42} fontSize="10" fill="#EF4444" fontFamily="monospace">{r.wrong.slice(32)}</text>}
          </g>
        );
      })}
    </svg>
  );
}

/* ──── Per-test APA reporting templates card ──── */
export function ApaTestTemplates() {
  const templates = [
    { test: 'Ind. t-test',      block: 't(df) = X, p = X, d = X',                       eg: 't(238) = 3.42, p = .001, d = 0.60' },
    { test: 'Paired t-test',     block: 't(df) = X, p = X, d = X',                       eg: 't(29) = 3.42, p = .002, d = 0.62' },
    { test: 'One-way ANOVA',    block: 'F(df1, df2) = X, p = X, η² = X',                 eg: 'F(2, 117) = 14.80, p < .001, η² = .20' },
    { test: 'Two-way ANOVA',    block: 'Each effect: F(df1, df2), p, partial η²',        eg: 'F(2, 114) = 3.85, p = .024, partial η² = .06' },
    { test: 'ANCOVA',            block: 'Adj. M (SE), F(df1, df2), p, partial η²',        eg: 'F(2, 116) = 4.10, p = .019, partial η² = .07' },
    { test: 'Mixed ANOVA',       block: '3 effects: between, within, interaction',       eg: 'F(3.24, 116.70) = 8.40, p < .001, partial η² = .19' },
    { test: 'MANOVA',            block: "Wilks' Λ = X, F(df1, df2), p, partial η²",       eg: "Λ = .73, F(10, 166) = 2.85, p = .003, partial η² = .15" },
    { test: 'Pearson r',         block: 'r(df) = X, p = X, 95% CI [X, X]',                eg: 'r(198) = .42, p < .001, 95% CI [.30, .53]' },
    { test: 'Multiple regr.',   block: 'R² = X, F(df1, df2), p; per β and p',            eg: 'R² = .34, F(3, 236) = 40.51, p < .001; β = .45' },
    { test: 'Hier. regr.',      block: 'Per block: R², ΔR², F Change, Sig. F Change',    eg: 'ΔR² = .18, F Change(1, 236) = 55.31, p < .001' },
    { test: 'Binary logistic',   block: 'B, SE, Wald χ²(1), p, OR, 95% CI',                eg: 'B = −0.03, Wald χ²(1) = 8.42, p = .004, OR = 0.97' },
    { test: 'Chi-square indep.', block: 'χ²(df, N = X) = X, p = X, Cramer\'s V = X',       eg: 'χ²(2, N = 240) = 28.34, p < .001, V = .34' },
    { test: 'Mann-Whitney U',   block: 'Mdn (IQR) per gp; U, z, p, r',                    eg: 'U = 133.00, z = −2.21, p = .027, r = .34' },
    { test: 'Wilcoxon SR',       block: 'Mdn per cond; z, p, r',                           eg: 'z = −3.16, p = .002, r = .65' },
    { test: 'Kruskal-Wallis',    block: 'Mdn (IQR) per gp; H(df), p, η²_H',                eg: 'H(2) = 12.84, p = .002, η²_H = .13' },
    { test: 'Friedman',          block: 'Mdn per time; χ²_F(df), p, Kendall\'s W',         eg: 'χ²_F(2) = 38.94, p < .001, W = .61' },
    { test: 'Cronbach\'s α',      block: 'α = X, k = X',                                    eg: 'α = .84, k = 10' },
  ];
  return (
    <svg viewBox="0 0 720 540" className="w-full h-auto">
      <rect width="720" height="540" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        Per-test APA 7 reporting templates — copy the block, plug in your numbers
      </text>

      <rect x="10" y="34" width="700" height="24" fill="#0A2E5D"/>
      <text x="90"  y="50" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Test</text>
      <text x="290" y="50" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Reporting block</text>
      <text x="565" y="50" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Example</text>

      {templates.map((t, i) => {
        const y = 58 + i * 28;
        const bg = i % 2 === 0 ? '#FAF7EF' : '#fff';
        return (
          <g key={i}>
            <rect x="10" y={y} width="700" height="28" fill={bg}/>
            <text x="20"  y={y + 18} fontSize="10" fill="#0A2E5D" fontWeight="700">{t.test}</text>
            <text x="170" y={y + 18} fontSize="9"  fill="#0A2E5D" fontFamily="monospace">{t.block}</text>
            <text x="425" y={y + 18} fontSize="9"  fill="#10B981" fontFamily="monospace">{t.eg}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ──── APA 7 table example ──── */
export function ApaTableExample() {
  return (
    <svg viewBox="0 0 720 380" className="w-full h-auto">
      <rect width="720" height="380" fill="#fff"/>
      <text x="360" y="20" fontSize="13" fill="#0A2E5D" textAnchor="middle" fontWeight="700">
        An APA 7 compliant Chapter 4 table
      </text>

      {/* Table number on its own line */}
      <text x="80" y="55" fontSize="14" fill="#0A2E5D" fontWeight="700">Table 4.7</text>
      {/* Title in italics on the next line */}
      <text x="80" y="76" fontSize="12" fill="#0A2E5D" fontStyle="italic">Hierarchical Regression Predicting Employee Engagement</text>

      {/* TOP horizontal border */}
      <line x1="80" y1="95" x2="640" y2="95" stroke="#0A2E5D" strokeWidth="2"/>

      {/* Header row */}
      <text x="100" y="115" fontSize="11" fill="#0A2E5D" fontWeight="700">Predictor</text>
      <text x="270" y="115" fontSize="11" fill="#0A2E5D" fontWeight="700" fontStyle="italic">B</text>
      <text x="340" y="115" fontSize="11" fill="#0A2E5D" fontWeight="700" fontStyle="italic">SE</text>
      <text x="410" y="115" fontSize="11" fill="#0A2E5D" fontWeight="700" fontStyle="italic">β</text>
      <text x="470" y="115" fontSize="11" fill="#0A2E5D" fontWeight="700" fontStyle="italic">t</text>
      <text x="530" y="115" fontSize="11" fill="#0A2E5D" fontWeight="700" fontStyle="italic">p</text>

      {/* Second horizontal border (below header) */}
      <line x1="80" y1="122" x2="640" y2="122" stroke="#0A2E5D" strokeWidth="1"/>

      {/* Block 1 label */}
      <text x="100" y="142" fontSize="11" fill="#0A2E5D" fontWeight="700" fontStyle="italic">Block 1</text>

      {[
        { name: 'Tenure',         B: '0.15', SE: '0.09', b: '.08',  t: '1.67', p: '.096' },
        { name: 'Job level',       B: '0.42', SE: '0.13', b: '.21', t: '3.23', p: '.001**' },
      ].map((row, i) => {
        const y = 162 + i * 22;
        return (
          <g key={i}>
            <text x="115" y={y} fontSize="11" fill="#0A2E5D">{row.name}</text>
            <text x="288" y={y} fontSize="11" fill="#0A2E5D" textAnchor="end">{row.B}</text>
            <text x="358" y={y} fontSize="11" fill="#0A2E5D" textAnchor="end">{row.SE}</text>
            <text x="425" y={y} fontSize="11" fill="#0A2E5D" textAnchor="end">{row.b}</text>
            <text x="485" y={y} fontSize="11" fill="#0A2E5D" textAnchor="end">{row.t}</text>
            <text x="555" y={y} fontSize="11" fill="#0A2E5D" textAnchor="end">{row.p}</text>
          </g>
        );
      })}
      <text x="100" y="222" fontSize="10" fill="#64748B" fontStyle="italic">R² = .09, F(2, 237) = 11.72, p &lt; .001</text>

      {/* Block 2 label */}
      <text x="100" y="252" fontSize="11" fill="#0A2E5D" fontWeight="700" fontStyle="italic">Block 2</text>
      {[
        { name: 'Tenure',         B: '0.08',  SE: '0.09', b: '.04',  t: '0.89', p: '.375' },
        { name: 'Job level',       B: '0.34',  SE: '0.12', b: '.17',  t: '2.82', p: '.005**' },
        { name: 'POS',             B: '0.62',  SE: '0.08', b: '.45',  t: '7.44', p: '< .001***' },
      ].map((row, i) => {
        const y = 272 + i * 22;
        return (
          <g key={i}>
            <text x="115" y={y} fontSize="11" fill="#0A2E5D" fontWeight={row.name === 'POS' ? '700' : '400'}>{row.name}</text>
            <text x="288" y={y} fontSize="11" fill="#0A2E5D" textAnchor="end">{row.B}</text>
            <text x="358" y={y} fontSize="11" fill="#0A2E5D" textAnchor="end">{row.SE}</text>
            <text x="425" y={y} fontSize="11" fill={row.name === 'POS' ? '#10B981' : '#0A2E5D'} textAnchor="end" fontWeight={row.name === 'POS' ? '700' : '400'}>{row.b}</text>
            <text x="485" y={y} fontSize="11" fill="#0A2E5D" textAnchor="end">{row.t}</text>
            <text x="555" y={y} fontSize="11" fill={row.name === 'POS' ? '#10B981' : '#0A2E5D'} textAnchor="end" fontWeight={row.name === 'POS' ? '700' : '400'}>{row.p}</text>
          </g>
        );
      })}
      <text x="100" y="335" fontSize="10" fill="#64748B" fontStyle="italic">R² = .27, ΔR² = .18, F Change(1, 236) = 55.31, p &lt; .001</text>

      {/* BOTTOM horizontal border */}
      <line x1="80" y1="342" x2="640" y2="342" stroke="#0A2E5D" strokeWidth="2"/>

      {/* Note line */}
      <text x="80" y="360" fontSize="10" fill="#0A2E5D" fontStyle="italic">Note. </text>
      <text x="112" y="360" fontSize="10" fill="#0A2E5D">N = 240. POS = perceived organisational support.  ** p &lt; .01. *** p &lt; .001.</text>

      {/* Annotations */}
      <text x="660" y="55" fontSize="9" fill="#D4AF37" fontWeight="700">← number bold</text>
      <text x="660" y="76" fontSize="9" fill="#D4AF37" fontWeight="700">← title italic, Title Case</text>
      <text x="660" y="118" fontSize="9" fill="#D4AF37" fontWeight="700">← B, SE, β, t, p italic</text>
      <text x="660" y="342" fontSize="9" fill="#D4AF37" fontWeight="700">← ONLY 3 h-lines,</text>
      <text x="660" y="354" fontSize="9" fill="#D4AF37" fontWeight="700">   NO vertical lines</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  MACHAKOS CASE STUDY — Frequencies lesson photo-real screenshots
 *  These are AI-generated PNG mockups compressed to JPG (~50-100 KB each).
 *  All images live in /public/lesson-images/frequencies/ and are served
 *  as static assets by Vercel.
 *
 *  Pattern for future case-study screenshots:
 *    • Store the .jpg in /public/lesson-images/<lesson-slug>/
 *    • Register a component below that renders it via <ScreenshotFrame>
 *    • Reference in lesson JSON: { type: 'illustration', component: 'MachakosFreqDialog', caption: '...' }
 * ═══════════════════════════════════════════════════════════════════ */

// Consistent wrapper for all screenshot images — adds subtle border, keeps
// them responsive (max-w-full), and lets the user click to zoom in a new tab.
function ScreenshotFrame({ src, alt }) {
  return (
    <a href={src} target="_blank" rel="noopener noreferrer"
       className="block relative group"
       title="Click to open the full-size screenshot in a new tab">
      <img src={src} alt={alt}
        className="w-full h-auto rounded-lg border border-slate-200 shadow-sm group-hover:shadow-md transition"
        loading="lazy"/>
      <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition text-[10px] font-semibold bg-black/70 text-white px-2 py-1 rounded-full">
        🔍 Click to zoom
      </span>
    </a>
  );
}

export function MachakosFreqMenuPath() {
  return <ScreenshotFrame
    src="/lesson-images/frequencies/00-menu-path.jpg"
    alt="SPSS main menu showing the click path: Analyze menu open (boxed), Descriptive Statistics highlighted in blue with cascading submenu, Frequencies highlighted in blue as the item to click, with a gold arrow and CLICK HERE label pointing to Frequencies"/>;
}

/* ─── Machakos Spearman Correlation (rank-based, ordinal-friendly) ─── */
export function MachakosSpearmanDialog() {
  return <ScreenshotFrame
    src="/lesson-images/spearman/01-dialog.jpg"
    alt="SPSS Bivariate Correlations dialog configured for Spearman. Form (Ordinal) and Math_KCSE_Mean moved to the Variables box. Only the Spearman checkbox is ticked (Pearson and Kendall unticked)"/>;
}
export function MachakosSpearmanOutput() {
  return <ScreenshotFrame
    src="/lesson-images/spearman/02-output.jpg"
    alt="SPSS Output Viewer showing Nonparametric Correlations. Descriptive Statistics table for Form (N=212) and Math_KCSE_Mean (N=274). Main Correlations table headed Spearmans rho with correlation coefficient .284**, Sig .000, N=212"/>;
}
export function MachakosSpearmanAnnotated() {
  return <ScreenshotFrame
    src="/lesson-images/spearman/03-annotated.jpg"
    alt="Annotated Spearman correlation cell for Form x Math_KCSE_Mean with four color-coded callouts: rho = 0.284 explained (gold), significance asterisks (red), Sig 2-tailed p-value (navy), N=212 explaining the students-only sample (green)"/>;
}
export function MachakosSpearmanScatter() {
  return <ScreenshotFrame
    src="/lesson-images/spearman/04-scatter.jpg"
    alt="Scatter plot of Form vs Math_KCSE_Mean showing 3 vertical stacks of dots at Form 2, 3, and 4 across 212 students. Gold trend line shows the positive monotonic relationship. Spearmans rho = .284"/>;
}

/* ─── Regression · Simple, Multiple, Diagnostics ─── */
export function MachakosRegMenu() {
  return <ScreenshotFrame src="/lesson-images/regression/00-menu-path.jpg"
    alt="SPSS Analyze menu open showing Regression then Linear highlighted with a gold CLICK HERE arrow. Full submenu shown including Binary Logistic, Multinomial Logistic, Ordinal for reference"/>;
}
export function MachakosRegSimpleDialog() {
  return <ScreenshotFrame src="/lesson-images/regression/01-simple-dialog.jpg"
    alt="SPSS Linear Regression dialog set up for simple regression. Math_KCSE_Mean in the Dependent box. Digital_Devices in the Independent(s) box. Method = Enter"/>;
}
export function MachakosRegSimpleOutput() {
  return <ScreenshotFrame src="/lesson-images/regression/02-simple-output.jpg"
    alt="SPSS simple linear regression output for Machakos. Model Summary shows R=.478, R Square=.228. Coefficients table shows Digital_Devices B=.566, standardized beta=.478, t=8.84, Sig<.001"/>;
}
export function MachakosRegScatterLine() {
  return <ScreenshotFrame src="/lesson-images/regression/03-scatter-line.jpg"
    alt="Scatter plot of Digital_Devices vs Math_KCSE_Mean with a gold fitted regression line running from lower-left to upper-right. Equation y = 3.93 + 0.57x, R squared = .228, N = 267 shown in the corner"/>;
}
export function MachakosRegMultiDialog() {
  return <ScreenshotFrame src="/lesson-images/regression/04-multi-dialog.jpg"
    alt="SPSS Linear Regression dialog for multiple regression. Math_KCSE_Mean in Dependent. All 4 IVs (Digital_Devices, Teacher_Competency, Internet_Connectivity, InvestmentPerStudent) in Independent(s). Method = Enter"/>;
}
export function MachakosRegMultiOutput() {
  return <ScreenshotFrame src="/lesson-images/regression/05-multi-output.jpg"
    alt="SPSS multiple regression output for Machakos. Model Summary R=.617, R Square=.381. Coefficients table shows Teacher_Competency has strongest beta=.268 p=.001, Internet_Connectivity beta=.092 not significant. VIF all below 5"/>;
}
export function MachakosRegBetaComparison() {
  return <ScreenshotFrame src="/lesson-images/regression/06-beta-comparison.jpg"
    alt="Bar chart comparing standardized beta coefficients from Machakos multiple regression. Teacher_Competency biggest bar green beta=.27, InvestmentPerStudent gold beta=.19, Digital_Devices amber beta=.14, Internet_Connectivity smallest grey beta=.09 not significant. Comparison table shows bivariate r vs multiple beta for each"/>;
}
export function MachakosRegR2Breakdown() {
  return <ScreenshotFrame src="/lesson-images/regression/07-r2-breakdown.jpg"
    alt="Pie chart showing R squared of .381 breakdown. Gold slice 38.1 percent EXPLAINED by the 4 IVs. Grey slice 61.9 percent UNEXPLAINED residual. Smaller donuts show each IVs contribution to explained variance"/>;
}
export function MachakosRegFiveAssumptions() {
  return <ScreenshotFrame src="/lesson-images/regression/08-five-assumptions.jpg"
    alt="5-panel reference card of linear regression assumptions. 1 Linearity gold, 2 Normality green, 3 Homoscedasticity navy, 4 Independence amber, 5 No Multicollinearity red. Each panel has definition, how to check, and what to do if it fails"/>;
}
export function MachakosRegResidualScatter() {
  return <ScreenshotFrame src="/lesson-images/regression/09-residual-scatter.jpg"
    alt="3 side-by-side residuals scatter plots. Left green random cloud GOOD assumptions met. Middle red U-shape BAD linearity violated. Right amber funnel shape BAD homoscedasticity violated. Each labeled with fix advice"/>;
}
export function MachakosRegStatsDialog() {
  return <ScreenshotFrame src="/lesson-images/regression/10-stats-dialog.jpg"
    alt="SPSS Linear Regression Statistics sub-dialog with the essential checkboxes ticked: Estimates, Confidence intervals 95, Model fit, R squared change, Descriptives, and Collinearity diagnostics highlighted gold as critical. Continue Cancel Help buttons at the bottom"/>;
}
export function MachakosDiagNormality() {
  return <ScreenshotFrame src="/lesson-images/regression/11-diag-normality.jpg"
    alt="Two SPSS diagnostic plots side by side testing normality of residuals. Left histogram of standardized residuals showing a bell shape hugging a red normal-curve overlay. Right Normal PP plot with points closely tracing the diagonal line. Both marked with green checkmarks. Navy banner explains how to tick Histogram and Normal probability plot in Linear Regression Plots"/>;
}
export function MachakosDiagVIF() {
  return <ScreenshotFrame src="/lesson-images/regression/12-diag-vif.jpg"
    alt="SPSS Coefficients table for Machakos multiple regression showing the Tolerance and VIF columns highlighted green. All 4 IVs have VIF between 1.64 and 2.08 well below the 5 threshold. Gold callout explains how to read VIF: below 5 is safe, above 10 is a serious problem, drop one variable"/>;
}
export function MachakosDiagCooks() {
  return <ScreenshotFrame src="/lesson-images/regression/13-diag-cooks.jpg"
    alt="Cooks Distance scatter plot for the Machakos study with 4 outlier cases circled red above the 4 over N threshold. Reference table on the right explains Cooks D below .015 is safe, between .015 and 1 investigate, above 1 highly influential. Navy banner explains how to generate the plot from Linear Regression Save Cooks distance"/>;
}
export function MachakosLogisticMenu() {
  return <ScreenshotFrame src="/lesson-images/regression/00-menu-path.jpg"
    alt="SPSS Analyze menu open showing Regression submenu including Linear, Binary Logistic, Multinomial Logistic, and Ordinal all in the same menu house. Gold CLICK HERE arrow originally pointed at Linear but the same submenu shows Binary Logistic and Multinomial Logistic below"/>;
}
export function MachakosLogisticDialog() {
  return <ScreenshotFrame src="/lesson-images/regression/14-logistic-dialog.jpg"
    alt="SPSS Logistic Regression dialog for predicting Math_Pass binary outcome. Math_Pass in Dependent box, 4 Machakos IVs in Covariates box, Method Enter. Note SPSS uses Covariates for the IVs in Logistic Regression rather than Independent"/>;
}
export function MachakosLogisticOutput() {
  return <ScreenshotFrame src="/lesson-images/regression/15-logistic-output.jpg"
    alt="SPSS Logistic Regression output showing Model Summary with Nagelkerke R square .358, Classification Table with 81.6 percent correct, and Variables in the Equation table with the Exp(B) odds ratios highlighted gold. Teacher_Competency OR 1.79 and InvestmentPerStudent OR 1.30 significant. Gold callout explains how to interpret odds ratios and 95 percent confidence intervals"/>;
}
export function MachakosHierarchicalBlocks() {
  return <ScreenshotFrame src="/lesson-images/regression/16-hierarchical-blocks.jpg"
    alt="SPSS Linear Regression dialog set for hierarchical regression. Block 2 of 2 indicator visible. Block 1 previously had InvestmentPerStudent and Internet_Connectivity as baseline controls. Block 2 now has Digital_Devices and Teacher_Competency as test predictors. Gold callout explains how to add blocks and remember to tick R squared change in Statistics"/>;
}
export function MachakosHierarchicalR2Change() {
  return <ScreenshotFrame src="/lesson-images/regression/17-hierarchical-r2change.jpg"
    alt="SPSS Model Summary table for hierarchical regression showing 2 models. Model 1 R square .257 baseline. Model 2 R square .381 with Delta R square .124 F change 26.28 p less than .001. R Square Change and F Change columns highlighted gold with explanatory callout"/>;
}
export function MachakosThreeApproachesComparison() {
  return <ScreenshotFrame src="/lesson-images/regression/18-simple-multiple-hierarchical.jpg"
    alt="3-panel comparison card. Simple regression gold panel R square .228. Multiple regression green panel R square .381. Hierarchical navy panel Block 1 R square .257 Block 2 R square .381 Delta R square .124. Each panel shows research question, formula, Machakos results, and when to use it. Navy banner recommends Multiple as default for most Machakos-style thesis questions"/>;
}
export function MachakosRegWhenToUseWhich() {
  return <ScreenshotFrame src="/lesson-images/regression/19-when-to-use-which.jpg"
    alt="Decision tree for choosing regression type based on DV type. Continuous DV goes to Linear Regression. Binary DV goes to Binary Logistic. Ordinal DV goes to Ordinal Regression. Nominal 3+ categories goes to Multinomial Logistic. Each terminal box shows a Machakos example, the SPSS menu path, and the key output metric. Navy banner warns against using Linear on a binary or ordinal DV"/>;
}
/* ─── Beginner-first polish: What/Why/Where/When + per-step diagrams ─── */
export function MachakosHrWWWW() {
  return <ScreenshotFrame src="/lesson-images/regression/22-hr-wwww.jpg"
    alt="Hierarchical Regression What Why Where When 4-quadrant reference card. WHAT explains blocks and delta R squared. WHY explains testing add-value beyond controls. WHERE lists 4 Kenyan postgraduate scenarios. WHEN gives a decision table Hierarchical vs Multiple. Golden rule banner at bottom about defensible block order"/>;
}
export function MachakosHrStepBlock1() {
  return <ScreenshotFrame src="/lesson-images/regression/20-hr-step-block1.jpg"
    alt="SPSS Linear Regression dialog showing Hierarchical Step 3. Block 1 of 1 indicator visible. Independent(s) box has InvestmentPerStudent and Internet_Connectivity as baseline controls. Next button highlighted gold. Big callout says DO NOT click OK yet, click Next to open Block 2"/>;
}
export function MachakosHrStepBlock2() {
  return <ScreenshotFrame src="/lesson-images/regression/21-hr-step-block2.jpg"
    alt="SPSS Linear Regression dialog showing Hierarchical Step 4. Block 2 of 2 indicator visible. Independent(s) box now has Digital_Devices and Teacher_Competency highlighted green as the new test predictors. Info note shows Block 1 contains InvestmentPerStudent and Internet_Connectivity. Callout instructs to click Statistics for R squared change then OK"/>;
}
export function MachakosLgWWWW() {
  return <ScreenshotFrame src="/lesson-images/regression/23-lg-wwww.jpg"
    alt="Binary Logistic Regression What Why Where When 4-quadrant reference card. WHAT explains binary DV and odds ratios. WHY explains why linear regression fails on binary DVs. WHERE lists Kenyan postgraduate scenarios like pass/fail and adoption studies. WHEN gives a decision table for choosing logistic vs alternatives. Common trap warning at bottom about dichotomising continuous variables"/>;
}
export function MachakosLgStepMenu() {
  return <ScreenshotFrame src="/lesson-images/regression/24-lg-step-menu.jpg"
    alt="SPSS menu Analyze Regression Binary Logistic highlighted gold with STEP 1 CLICK HERE label. Full submenu also shows Multinomial Logistic and Ordinal below. Small note explains same menu house different DV types"/>;
}
export function MachakosLgStepOptions() {
  return <ScreenshotFrame src="/lesson-images/regression/25-lg-step-options.jpg"
    alt="SPSS Logistic Regression Options sub-dialog. Classification plots checked, Hosmer-Lemeshow goodness-of-fit checked highlighted gold, Iteration history checked. CI for exp B set to 95 percent highlighted gold. Two gold callouts explain Hosmer-Lemeshow interpretation and CI for exp B importance for reporting odds ratios"/>;
}
/* WWWW + numbered-click diagrams for Simple, Multiple, Multinomial/Ordinal Regression */
export function MachakosSrWWWW() {
  return <ScreenshotFrame src="/lesson-images/regression/26-sr-wwww.jpg"
    alt="Simple Linear Regression WWWW 4-quadrant reference card. WHAT explains fitting a line y=a+bx with Machakos regression equation. WHY explains prediction vs correlation. WHERE lists Kenyan postgraduate scenarios. WHEN gives decision table simple vs alternatives"/>;
}
export function MachakosSrNumberedClicks() {
  return <ScreenshotFrame src="/lesson-images/regression/27-sr-numbered-clicks.jpg"
    alt="SPSS Linear Regression dialog with red numbered click markers 2 through 6 overlaid showing the full simple regression setup sequence for Math_KCSE_Mean predicted by Digital_Devices. Gold callout at top lists all 6 steps"/>;
}
export function MachakosMrWWWW() {
  return <ScreenshotFrame src="/lesson-images/regression/28-mr-wwww.jpg"
    alt="Multiple Regression WWWW 4-quadrant reference card. WHAT explains the equation with multiple predictors. WHY explains unique-effect coefficients that control for shared variance. WHERE lists common Kenyan thesis scenarios. WHEN gives decision table with sample size rule N greater than 50 plus 8 times predictors"/>;
}
export function MachakosMrNumberedClicks() {
  return <ScreenshotFrame src="/lesson-images/regression/29-mr-numbered-clicks.jpg"
    alt="SPSS Linear Regression dialog with red numbered click markers 2 through 6 overlaid showing multiple regression setup with all 4 Machakos IVs. Statistics button highlighted as critical step 5 for Collinearity diagnostics"/>;
}
export function MachakosMnWWWW() {
  return <ScreenshotFrame src="/lesson-images/regression/30-mn-wwww.jpg"
    alt="Multinomial and Ordinal Regression WWWW 4-quadrant reference card. WHAT contrasts Multinomial for unordered categories vs Ordinal for ordered categories. WHY explains why linear or binary logistic wouldn't work. WHERE lists Kenyan examples. WHEN gives a decision table by DV type with common traps to avoid"/>;
}
export function MachakosMultinomialDialogFull() {
  return <ScreenshotFrame src="/lesson-images/regression/31-multinomial-dialog.jpg"
    alt="SPSS Multinomial Logistic Regression dialog for the Machakos study. Category as Dependent variable, with a Reference Category button highlighted. 3 continuous IVs in Covariates box: Age, Digital_Devices, Teacher_Competency. Gold callout explains reference-category selection and per-category odds ratio output"/>;
}
export function MachakosMultinomialOutputFull() {
  return <ScreenshotFrame src="/lesson-images/regression/32-multinomial-output.jpg"
    alt="SPSS Multinomial Logistic Regression output for Machakos Category prediction. Model Fitting Information, Goodness-of-Fit, Pseudo R-Square (Nagelkerke .518), and Parameter Estimates split into two blocks: Principal-vs-Student and Teacher-vs-Student. Age significant in both, Teacher_Competency significant in Teacher block. Exp(B) columns highlighted gold"/>;
}
export function MachakosOrdinalDialogFull() {
  return <ScreenshotFrame src="/lesson-images/regression/33-ordinal-dialog.jpg"
    alt="SPSS Ordinal Regression dialog for predicting Machakos Form (ordinal 2,3,4) from Gender in Factors and Age, Digital_Devices, Math_KCSE_Mean in Covariates. Gold callout explains the difference from Multinomial: Ordinal respects DV ordering with a cumulative logit link"/>;
}
export function MachakosOrdinalOutputFull() {
  return <ScreenshotFrame src="/lesson-images/regression/34-ordinal-output.jpg"
    alt="SPSS Ordinal Regression output for Machakos Form prediction. Model Fitting, Goodness-of-Fit, Pseudo R-Square (Nagelkerke .326), and Parameter Estimates with Threshold cutpoints and Location predictors. Digital_Devices (Est .324, p=.011) and Math_KCSE_Mean (Est .628, p<.001) both significant. Chapter 4 write-up template in the gold callout"/>;
}
/* Correlation course — WWWW primers for each lesson + decision map */
export function MachakosPearsonWWWW() {
  return <ScreenshotFrame src="/lesson-images/correlation-shared/00-pearson-wwww.jpg"
    alt="Pearson Correlation WWWW 4-quadrant reference card. WHAT explains r as strength of linear relationship. WHY explains needing a number to report. WHERE lists Kenyan postgraduate scenarios. WHEN gives decision table for Pearson vs Spearman vs alternatives"/>;
}
export function MachakosSpearmanWWWW() {
  return <ScreenshotFrame src="/lesson-images/correlation-shared/01-spearman-wwww.jpg"
    alt="Spearman Rank Correlation WWWW 4-quadrant reference card. WHAT explains rho and monotonic relationships using ranks. WHY explains why it works when Pearson assumptions fail. WHERE lists Likert-scale and skewed-data scenarios. WHEN gives a decision table"/>;
}
export function MachakosPartialWWWW() {
  return <ScreenshotFrame src="/lesson-images/correlation-shared/02-partial-wwww.jpg"
    alt="Partial Correlation WWWW 4-quadrant reference card. WHAT explains removing shared effect of a third variable using Machakos device-vs-investment example. WHY warns about spurious correlations. WHERE lists demographic-controlling scenarios. WHEN emphasises defending why the third variable is a confounder"/>;
}
export function MachakosMatricesWWWW() {
  return <ScreenshotFrame src="/lesson-images/correlation-shared/03-matrices-wwww.jpg"
    alt="Correlation Matrices WWWW 4-quadrant reference card. WHAT explains a matrix as a table of all pairwise correlations. WHY compares matrix vs separate paragraphs. WHERE lists multi-variable thesis scenarios. WHEN gives decision rules for matrix vs separate reporting"/>;
}
export function MachakosCorrelationDecision() {
  return <ScreenshotFrame src="/lesson-images/correlation-shared/04-decision-map.jpg"
    alt="Which correlation should I use decision map. Top branch asks how many variables. 2 variables branches into Pearson, Spearman, or Partial based on data type and control needs. 3+ variables branches into Correlation Matrix"/>;
}
/* T-Tests course — WWWW cards + dialogs + outputs + shared decision map */
export function KiambuOstWWWW() {
  return <ScreenshotFrame src="/lesson-images/ttests/00-ost-wwww.jpg"
    alt="One-Sample T-Test WWWW 4-quadrant reference card. WHAT explains comparing sample mean to a known value using Kiambu yield vs national 1750 kg/acre. WHY explains statistical significance. WHERE lists Kenyan scenarios. WHEN gives decision table"/>;
}
export function KiambuOstDialog() {
  return <ScreenshotFrame src="/lesson-images/ttests/01-ost-dialog.jpg"
    alt="SPSS One-Sample T Test dialog for Kiambu Maize. Yield_KgPerAcre in Test Variable, Test Value set to 1750 highlighted gold with note about national average benchmark"/>;
}
export function KiambuOstOutput() {
  return <ScreenshotFrame src="/lesson-images/ttests/02-ost-output.jpg"
    alt="SPSS One-Sample T Test output for Kiambu Maize. One-Sample Statistics shows N 180, Mean 1636.67, SD 443.21. Test table shows t equals -3.43, df 179, Sig .001, Mean Difference -113.33, 95 percent CI -178.51 to -48.15. Chapter 4 write-up template in the gold callout"/>;
}
export function KiambuItWWWW() {
  return <ScreenshotFrame src="/lesson-images/ttests/03-it-wwww.jpg"
    alt="Independent T-Test WWWW 4-quadrant reference card. WHAT explains comparing 2 separate groups. WHY explains checking Levene test for equal variances. WHERE lists 2-group comparisons. WHEN gives decision table"/>;
}
export function KiambuItDialog() {
  return <ScreenshotFrame src="/lesson-images/ttests/04-it-dialog.jpg"
    alt="SPSS Independent-Samples T Test dialog for Kiambu DAP vs CAN. Main dialog shows Yield_KgPerAcre in Test Variable and FertilizerType (1 2) as Grouping Variable. Define Groups sub-dialog visible below showing Group 1 = 1 (DAP), Group 2 = 2 (CAN)"/>;
}
export function KiambuItOutput() {
  return <ScreenshotFrame src="/lesson-images/ttests/05-it-output.jpg"
    alt="SPSS Independent-Samples T Test output for Kiambu Maize. Group Statistics: DAP mean 1840.42 SD 320.16, CAN mean 1620.28 SD 289.75. Independent Samples Test with Levene test not significant so top row read: t 3.95, df 118, Sig <.001, Mean Difference 220.13, 95 percent CI 109.71 to 330.56"/>;
}
export function NakuruPtWWWW() {
  return <ScreenshotFrame src="/lesson-images/ttests/06-pt-wwww.jpg"
    alt="Paired T-Test WWWW 4-quadrant reference card. WHAT explains comparing same people at 2 time points using Nakuru SBP baseline vs Week 12. WHY explains within-person power. WHERE lists before/after designs. WHEN gives decision table"/>;
}
export function NakuruPtDialog() {
  return <ScreenshotFrame src="/lesson-images/ttests/07-pt-dialog.jpg"
    alt="SPSS Paired-Samples T Test dialog for Nakuru Wellness. Paired Variables table shows Pair 1 with Variable 1 SBP_T0 and Variable 2 SBP_T2. Gold callout explains the 3-step selection workflow"/>;
}
export function NakuruPtOutput() {
  return <ScreenshotFrame src="/lesson-images/ttests/08-pt-output.jpg"
    alt="SPSS Paired-Samples T Test output for Nakuru Wellness. Paired Samples Statistics shows SBP_T0 mean 142.4 SD 12.1 and SBP_T2 mean 134.2 SD 11.3 for N 45. Paired Samples Correlations shows r .823 p <.001. Paired Samples Test shows Mean Difference 8.20, t 6.87, df 44, Sig <.001, 95 percent CI 5.79 to 10.61"/>;
}
export function TTestDecisionMap() {
  return <ScreenshotFrame src="/lesson-images/ttests/09-decision-map.jpg"
    alt="Which t-test do I need decision map. Top question asks how many groups or measurements. 3 branches: 1 sample vs known value goes to One-Sample T-Test (Lesson 1). 2 separate groups branches into Independent T-Test (Lesson 2) if normal or Mann-Whitney U (Lesson 5) if non-parametric. Same people measured twice branches into Paired T-Test (Lesson 3) if normal or Wilcoxon Signed-Rank (Lesson 4) if non-parametric"/>;
}
/* T-Tests non-parametric alternatives */
export function NakuruWilcoxonWWWW() {
  return <ScreenshotFrame src="/lesson-images/ttests/10-wilcoxon-wwww.jpg"
    alt="Wilcoxon Signed-Rank WWWW 4-quadrant reference card using Nakuru Wellness data. WHAT explains the rank-based comparison of paired measurements. WHY explains it works when difference scores fail normality. WHERE lists small-sample and ordinal-outcome scenarios. WHEN contrasts with paired t-test"/>;
}
export function NakuruWilcoxonDialog() {
  return <ScreenshotFrame src="/lesson-images/ttests/11-wilcoxon-dialog.jpg"
    alt="SPSS Two-Related-Samples Tests dialog for Nakuru Wellness. Test Pairs table shows Pair 1 with SBP_T0 and SBP_T2. Wilcoxon checkbox ticked highlighted gold. Other test types Sign, McNemar, Marginal Homogeneity unchecked"/>;
}
export function NakuruWilcoxonOutput() {
  return <ScreenshotFrame src="/lesson-images/ttests/12-wilcoxon-output.jpg"
    alt="SPSS Wilcoxon Signed-Rank output. Ranks table shows 40 Negative Ranks, 4 Positive Ranks, 1 Tie for SBP_T2 minus SBP_T0. Test Statistics table shows Z equals -5.31, Asymp Sig less than .001. Chapter 4 write-up template explains reporting medians not means"/>;
}
export function KiambuMannWhitneyWWWW() {
  return <ScreenshotFrame src="/lesson-images/ttests/13-mannwhitney-wwww.jpg"
    alt="Mann-Whitney U WWWW 4-quadrant reference card using Kiambu Maize data. WHAT explains rank-based comparison of 2 independent groups. WHY explains it works when independent t-test assumptions fail. WHERE lists ordinal-outcome and small-sample scenarios. WHEN contrasts with independent t-test"/>;
}
export function KiambuMannWhitneyDialog() {
  return <ScreenshotFrame src="/lesson-images/ttests/14-mannwhitney-dialog.jpg"
    alt="SPSS Two-Independent-Samples Tests dialog for Kiambu Maize. Yield_KgPerAcre in Test Variable, FertilizerType (1 2) as Grouping Variable with Define Groups button. Mann-Whitney U checkbox ticked highlighted gold"/>;
}
export function KiambuMannWhitneyOutput() {
  return <ScreenshotFrame src="/lesson-images/ttests/15-mannwhitney-output.jpg"
    alt="SPSS Mann-Whitney U output. Ranks table shows DAP mean rank 74.00 vs CAN mean rank 47.00. Test Statistics table shows U equals 990.00, Z equals -4.24, Asymp Sig less than .001. Chapter 4 write-up template explains reporting medians and mean ranks"/>;
}
/* Chi-Square course — Nyandarua Vaccine study */
export function NyandaruaChiWWWW() {
  return <ScreenshotFrame src="/lesson-images/chisquare/00-wwww.jpg"
    alt="Chi-Square WWWW 4-quadrant reference card using Nyandarua Vaccine study. WHAT explains testing whether two categorical variables are related. WHY explains it as the only option for 2-way categorical data. WHERE lists Kenyan scenarios. WHEN gives decision table with assumption warning about expected cell counts"/>;
}
export function NyandaruaCrosstabsDialog() {
  return <ScreenshotFrame src="/lesson-images/chisquare/01-crosstabs-dialog.jpg"
    alt="SPSS Crosstabs dialog for Nyandarua Vaccine. EducationLevel in Row(s), VaccineAccept in Column(s). Statistics button highlighted with a gold CLICK HERE arrow explaining the 4-step setup"/>;
}
export function NyandaruaChiStatsDialog() {
  return <ScreenshotFrame src="/lesson-images/chisquare/02-stats-subdialog.jpg"
    alt="SPSS Crosstabs Statistics sub-dialog. Chi-square checkbox ticked highlighted gold. Phi and Cramer's V ticked highlighted amber as the effect-size measure. Two gold callouts explain the critical role of ticking Chi-square and reporting Cramer's V"/>;
}
export function NyandaruaChiOutput() {
  return <ScreenshotFrame src="/lesson-images/chisquare/03-output.jpg"
    alt="SPSS chi-square output for Nyandarua Vaccine study. Crosstabulation shows acceptance rising from 47.5 percent None to 84 percent Tertiary education. Chi-Square Tests shows Pearson value 26.72, df 3, Sig less than .001. Symmetric Measures shows Cramer's V .289 medium effect size. Chapter 4 write-up template in the gold callout"/>;
}
/* Writing Up course — Chapter 4 + APA 7 (NEW image-based components) */
export function Chapter4StructureCard() {
  return <ScreenshotFrame src="/lesson-images/writing-up/00-c4-structure.jpg"
    alt="Chapter 4 blueprint showing the 6 standard sections in order with page-length guidance and rule against including discussion in Chapter 4"/>;
}
export function Chapter4ResponseRate() {
  return <ScreenshotFrame src="/lesson-images/writing-up/01-c4-response-rate.jpg"
    alt="Chapter 4 Section 4.2 example showing Response Rate and Sample Characteristics tables for the Machakos study"/>;
}
export function Chapter4GoodVsBad() {
  return <ScreenshotFrame src="/lesson-images/writing-up/02-c4-good-vs-bad.jpg"
    alt="Side-by-side comparison of bad vs good Chapter 4 writing using the Machakos Digital_Devices Math_KCSE finding"/>;
}
export function APATemplatesReference() {
  return <ScreenshotFrame src="/lesson-images/writing-up/03-apa-templates.jpg"
    alt="Master APA 7 statistical reporting templates cheat sheet showing every major test with template and Kenyan example"/>;
}
export function APATableRules() {
  return <ScreenshotFrame src="/lesson-images/writing-up/04-apa-table-rules.jpg"
    alt="APA 7 table formatting 7 rules with visual example of a correctly formatted Machakos correlation matrix"/>;
}
export function APABadVsGoodTable() {
  return <ScreenshotFrame src="/lesson-images/writing-up/05-apa-bad-vs-good.jpg"
    alt="Side-by-side comparison of raw SPSS output vs reformatted APA 7 table using the Machakos correlation matrix"/>;
}

/* ─── Reliability course — Cronbach + Item-Total + Split-Half ─── */
export function MombasaCronWWWW() {
  return <ScreenshotFrame src="/lesson-images/reliability/00-cron-wwww.jpg"
    alt="Cronbach Alpha WWWW 4-quadrant reference card using Mombasa 15-item Patient Satisfaction Scale. WHAT explains internal consistency. WHY explains why reliability testing is required before using a composite. WHERE lists Kenyan scenarios. WHEN gives the alpha interpretation table"/>;
}
export function MombasaCronDialog() {
  return <ScreenshotFrame src="/lesson-images/reliability/01-cron-dialog.jpg"
    alt="SPSS Reliability Analysis dialog for the Mombasa 15-item Patient Satisfaction Scale. All 15 PSS items in the Items box. Model set to Alpha. Statistics button highlighted gold to remind ticking Scale if item deleted"/>;
}
export function MombasaCronOutput() {
  return <ScreenshotFrame src="/lesson-images/reliability/02-cron-output.jpg"
    alt="SPSS Cronbach output. Reliability Statistics shows alpha .842 for 15 items highlighted gold. Item-Total Statistics table shows corrected item-total correlations and alpha if item deleted for each item. PSS_3 highlighted red as misfit with item-total .184 and alpha-if-deleted .851"/>;
}
export function ItemTotalWWWW() {
  return <ScreenshotFrame src="/lesson-images/reliability/03-itemtotal-wwww.jpg"
    alt="Item-Total Analysis WWWW 4-quadrant reference card. WHAT explains the diagnostic companion to Cronbach. WHY explains iterative item refinement. WHERE lists scenarios. WHEN gives decision table for keeping vs dropping items based on item-total correlation"/>;
}
export function ItemTotalTable() {
  return <ScreenshotFrame src="/lesson-images/reliability/04-itemtotal-table.jpg"
    alt="Fully annotated SPSS Item-Total Statistics table for the Mombasa 15-item scale. All 15 rows shown with corrected item-total correlations and alpha-if-deleted values. PSS_3 highlighted red as misfit, PSS_8 amber as borderline. Green/red/amber/gold callouts explain the interpretation rules"/>;
}
export function SplitHalfWWWW() {
  return <ScreenshotFrame src="/lesson-images/reliability/05-splithalf-wwww.jpg"
    alt="Split-Half Reliability WWWW 4-quadrant reference card. WHAT explains splitting the scale into 2 halves and correlating. WHY explains when to use it vs Cronbach. WHERE lists rare scenarios. WHEN gives decision table"/>;
}
export function SplitHalfOutput() {
  return <ScreenshotFrame src="/lesson-images/reliability/06-splithalf-output.jpg"
    alt="SPSS Split-Half Reliability output for Mombasa scale. Reliability Statistics shows Part 1 alpha .782 with 8 items, Part 2 alpha .741 with 7 items, Correlation Between Forms .742, Spearman-Brown Equal Length .852 highlighted gold, Guttman Split-Half .848 highlighted amber"/>;
}
export function ReliabilityDecisionMap() {
  return <ScreenshotFrame src="/lesson-images/reliability/07-decision-map.jpg"
    alt="Reliability testing decision map showing all 3 lessons in the course. Cronbach as default first step. Item-Total analysis if alpha is borderline. Split-half only if 2 clear halves or supervisor requests. Typical workflow described in the navy banner"/>;
}
/* ─── ANOVA course — One-way + Post-hoc + Kruskal-Wallis + decision map ─── */
export function KiambuAnovaWWWW() {
  return <ScreenshotFrame src="/lesson-images/anova/00-anova-wwww.jpg"
    alt="One-Way ANOVA WWWW 4-quadrant reference card using Kiambu Maize 3-fertilizer comparison. WHAT explains comparing 3+ group means. WHY explains why 3 t-tests inflates Type I error. WHERE lists Kenyan scenarios. WHEN gives decision table"/>;
}
export function KiambuAnovaDialog() {
  return <ScreenshotFrame src="/lesson-images/anova/01-anova-dialog.jpg"
    alt="SPSS One-Way ANOVA dialog for Kiambu. Yield_KgPerAcre in Dependent List, FertilizerType in Factor. Post Hoc and Options buttons highlighted gold as critical setup steps"/>;
}
export function KiambuAnovaOutput() {
  return <ScreenshotFrame src="/lesson-images/anova/02-anova-output.jpg"
    alt="SPSS One-Way ANOVA output for Kiambu Maize. Descriptives shows DAP mean 1840, CAN 1620, Organic 1450 across 60 farms each. Levene not significant p=.122. ANOVA F(2,177) equals 22.40, p less than .001. Eta squared calculation shown as .20 large effect"/>;
}
export function KiambuPostHocWWWW() {
  return <ScreenshotFrame src="/lesson-images/anova/03-posthoc-wwww.jpg"
    alt="Post-Hoc Tests WWWW 4-quadrant reference card. WHAT explains follow-up tests after significant ANOVA. WHY explains why not just multiple t-tests. WHERE and WHEN cover choosing Tukey vs Bonferroni vs Games-Howell vs Dunnett. Warning against LSD"/>;
}
export function KiambuPostHocDialog() {
  return <ScreenshotFrame src="/lesson-images/anova/04-posthoc-dialog.jpg"
    alt="SPSS Post Hoc Multiple Comparisons sub-dialog. Tukey checked highlighted gold as default. Games-Howell highlighted amber as alternative for unequal variances. Full grid of options shown with LSD, Bonferroni, Scheffe, Sidak, Dunnett etc"/>;
}
export function KiambuPostHocOutput() {
  return <ScreenshotFrame src="/lesson-images/anova/05-posthoc-output.jpg"
    alt="SPSS Tukey HSD Post-Hoc output for Kiambu 3-fertilizer comparison. Multiple Comparisons table shows all 3 pairwise comparisons significant: DAP vs CAN mean diff 220 p=.001, DAP vs Organic 390 p<.001, CAN vs Organic 170 p=.012. Homogeneous Subsets table places each group in own subset showing all differ"/>;
}
export function KiambuKWWWWW() {
  return <ScreenshotFrame src="/lesson-images/anova/06-kw-wwww.jpg"
    alt="Kruskal-Wallis H WWWW 4-quadrant reference card using Kiambu Maize. WHAT explains rank-based comparison of 3+ groups. WHY explains it as non-parametric alternative to one-way ANOVA. WHERE lists ordinal and non-normal scenarios. WHEN gives decision table with Dunn-Bonferroni for post-hoc"/>;
}
export function KiambuKWDialog() {
  return <ScreenshotFrame src="/lesson-images/anova/07-kw-dialog.jpg"
    alt="SPSS Tests for Several Independent Samples dialog for Kiambu Kruskal-Wallis. Yield_KgPerAcre in Test Variable List, FertilizerType (1 3) as Grouping Variable with Define Range button. Kruskal-Wallis H checkbox ticked highlighted gold"/>;
}
export function KiambuKWOutput() {
  return <ScreenshotFrame src="/lesson-images/anova/08-kw-output.jpg"
    alt="SPSS Kruskal-Wallis output for Kiambu. Ranks table shows DAP mean rank 128.72, CAN 92.15, Organic 50.63. Test Statistics shows H equals 42.15, df 2, Sig less than .001. Chapter 4 write-up explains reporting medians and Dunn-Bonferroni post-hoc"/>;
}
export function ANOVADecisionMap() {
  return <ScreenshotFrame src="/lesson-images/anova/09-decision-map.jpg"
    alt="Which ANOVA test do I need decision map showing all 9 ANOVA-family tests. One-way ANOVA + Post-hoc, Two-way ANOVA, Repeated Measures ANOVA, Mixed ANOVA, ANCOVA, MANOVA, Kruskal-Wallis, and Friedman. Branches show which to choose based on IVs, subjects, normality, and covariates"/>;
}
/* ANOVA Part 2 — Two-way + Repeated Measures + Friedman */
export function KiambuTwoWayWWWW() {
  return <ScreenshotFrame src="/lesson-images/anova/10-2way-wwww.jpg"
    alt="Two-Way ANOVA WWWW 4-quadrant reference card using Kiambu 2-factor example FertilizerType x Ward. WHAT explains main effects and interactions. WHY emphasises interaction as the key finding. WHERE lists Kenyan scenarios. WHEN gives decision table"/>;
}
export function KiambuTwoWayDialog() {
  return <ScreenshotFrame src="/lesson-images/anova/11-2way-dialog.jpg"
    alt="SPSS Univariate GLM dialog for Kiambu 2-factor ANOVA. Yield_KgPerAcre as Dependent, FertilizerType and Ward as Fixed Factors. Plots and Post Hoc buttons highlighted gold as critical steps"/>;
}
export function KiambuTwoWayOutput() {
  return <ScreenshotFrame src="/lesson-images/anova/12-2way-output.jpg"
    alt="SPSS Two-Way ANOVA Tests of Between-Subjects Effects output. FertilizerType main effect F(2,171) equals 34.58 p less than .001 partial eta squared .29. Ward main effect F(2,171) equals 13.82 p less than .001. FertilizerType by Ward interaction F(4,171) equals 6.64 p less than .001 partial eta squared .134. R squared .418"/>;
}
export function KiambuInteractionPlot() {
  return <ScreenshotFrame src="/lesson-images/anova/13-interaction-plot.jpg"
    alt="SPSS interaction plot for Kiambu FertilizerType by Ward on yield. Three colored lines DAP blue CAN red Organic green connecting 3 wards on the x-axis. Non-parallel lines with Organic winning in Lari but DAP winning in Githunguri clearly showing the interaction pattern"/>;
}
export function NakuruRMWWWW() {
  return <ScreenshotFrame src="/lesson-images/anova/14-rm-wwww.jpg"
    alt="Repeated Measures ANOVA WWWW 4-quadrant reference card using Nakuru Wellness 3-timepoint SBP data. WHAT explains within-subjects design. WHY explains statistical power over separate paired t-tests. WHERE lists longitudinal scenarios. WHEN emphasises sphericity assumption"/>;
}
export function NakuruRMDialog() {
  return <ScreenshotFrame src="/lesson-images/anova/15-rm-dialog.jpg"
    alt="SPSS Repeated Measures 2-step setup for Nakuru Wellness. Small Define Factors dialog first with Within-Subject Factor Name Time and Number of Levels 3. Main dialog second with 3 slots filled by SBP_T0, SBP_T1, SBP_T2"/>;
}
export function NakuruRMOutput() {
  return <ScreenshotFrame src="/lesson-images/anova/16-rm-output.jpg"
    alt="SPSS Repeated Measures ANOVA output for Nakuru Wellness. Mauchly test W .845 p .026 sphericity violated. Greenhouse-Geisser corrected F(1.73, 76.28) equals 42.15 p less than .001 partial eta squared .489 large effect. Pairwise Comparisons Bonferroni-adjusted showing T0 vs T1 3.5 mmHg p .001, T0 vs T2 8.2 mmHg p less than .001, T1 vs T2 4.7 mmHg p less than .001 all three significant"/>;
}
export function NakuruFriedmanWWWW() {
  return <ScreenshotFrame src="/lesson-images/anova/17-friedman-wwww.jpg"
    alt="Friedman Test WWWW 4-quadrant reference card using Nakuru SBP data. WHAT explains rank-based comparison across 3+ related samples. WHY explains it as non-parametric alternative to Repeated Measures ANOVA. WHERE lists ordinal and small-N scenarios. WHEN gives decision table with Wilcoxon Bonferroni post-hoc"/>;
}
export function NakuruFriedmanDialog() {
  return <ScreenshotFrame src="/lesson-images/anova/18-friedman-dialog.jpg"
    alt="SPSS Tests for Several Related Samples dialog for Nakuru Friedman. All 3 time-point variables SBP_T0 SBP_T1 SBP_T2 in the Test Variables box. Friedman checkbox ticked highlighted gold"/>;
}
export function NakuruFriedmanOutput() {
  return <ScreenshotFrame src="/lesson-images/anova/19-friedman-output.jpg"
    alt="SPSS Friedman output for Nakuru SBP. Ranks table shows SBP_T0 mean rank 2.71 (highest), SBP_T1 2.02, SBP_T2 1.27 (lowest). Test Statistics N 45, Chi-Square 71.24, df 2, Asymp Sig less than .001. Progressive downward trend"/>;
}

/* ─── Data Cleaning · Recoding + Reverse-coding ─── */
export function MachakosCleanRecodeMain() {
  return <ScreenshotFrame
    src="/lesson-images/data-cleaning/04-recode-main.jpg"
    alt="SPSS Recode into Different Variables dialog with Machakos Dev_3 highlighted in the left list and moved to the right box as Dev_3_r. Output Variable Name and Label filled in. Old and New Values button highlighted with a gold callout pointing to it as the next click"/>;
}
export function MachakosCleanOldNewValues() {
  return <ScreenshotFrame
    src="/lesson-images/data-cleaning/05-old-new-values.jpg"
    alt="SPSS Recode Old and New Values sub-dialog showing the full 1-to-5 Likert reversal rule already typed. Old Value 1 mapped to New Value 5, and the Old-to-New list showing 1 to 5, 2 to 4, 3 to 3, 4 to 2, 5 to 1, plus MISSING to SYSMIS"/>;
}
export function MachakosCleanReverseBeforeAfter() {
  return <ScreenshotFrame
    src="/lesson-images/data-cleaning/06-reverse-before-after.jpg"
    alt="Two-panel infographic showing a Machakos teacher answering two device questions. Left red panel WITHOUT reverse-coding sums to 10 out of 10 which is WRONG. Right green panel WITH reverse-coding sums to 6 out of 10 which correctly reflects mixed device availability"/>;
}
export function MachakosCleanComputeDialog() {
  return <ScreenshotFrame
    src="/lesson-images/data-cleaning/07-compute-dialog.jpg"
    alt="SPSS Compute Variable dialog set up to build the Machakos Digital_Devices composite. Target Variable Digital_Devices. Numeric Expression MEAN of Dev_1, Dev_2, Dev_3_r, Dev_4, Dev_5. Left variables list, calculator pad, functions list with MEAN highlighted"/>;
}
export function MachakosCleanThreeComposites() {
  return <ScreenshotFrame
    src="/lesson-images/data-cleaning/08-three-composites.jpg"
    alt="Three-card infographic showing all 3 Machakos composite variables with their formulas. Digital_Devices card gold, Teacher_Competency card green, Internet_Connectivity card navy. Each shows the MEAN formula, the Machakos mean and standard deviation, and notes on which items were reverse-coded"/>;
}
export function MachakosCleanCompositeVerification() {
  return <ScreenshotFrame
    src="/lesson-images/data-cleaning/09-composite-verification.jpg"
    alt="SPSS Data View showing the Machakos dataset with the newly computed Digital_Devices column highlighted gold on the right. Floating verification card in the top right shows Descriptives output confirming N=269, Min=1.00, Max=5.00, Mean=3.51, SD=0.82, with three green ticks"/>;
}
export function MachakosCleanSelectCases() {
  return <ScreenshotFrame
    src="/lesson-images/data-cleaning/10-select-cases-dialog.jpg"
    alt="SPSS Select Cases dialog set to filter Machakos students only. If condition is satisfied radio selected with Category = 3 typed as the condition. Filter out unselected cases option selected. Current Status shows 212 of 274 cases will be selected"/>;
}
export function MachakosCleanSubsetsWorkflow() {
  return <ScreenshotFrame
    src="/lesson-images/data-cleaning/11-subsets-workflow.jpg"
    alt="Three-card infographic showing the 3 Machakos sub-populations that need Select Cases. Students N=212 with Category=3, Teachers N=54 with Category=2, Principals N=8 with Category=1. Navy banner reminds users to turn the filter OFF when done"/>;
}

/* ─── Data Cleaning · Impossible Values + Duplicates ─── */
export function MachakosCleanImpossibleFreq() {
  return <ScreenshotFrame
    src="/lesson-images/data-cleaning/00-impossible-freq.jpg"
    alt="SPSS Frequencies output for a Machakos Dev_1 Likert item revealing impossible values. Rows for values 6 and 7 highlighted red because the scale only goes 1-5. Row 99 highlighted amber as an undeclared missing code. Gold callout explains how to fix using Select Cases or Recode"/>;
}
export function MachakosCleanDescriptivesRange() {
  return <ScreenshotFrame
    src="/lesson-images/data-cleaning/01-descriptives-range.jpg"
    alt="SPSS Descriptive Statistics table showing range checks for 6 Machakos continuous variables. Age min 13 and max 99, Dev_1 max 7, InvestmentPerStudent min 300 and max 50000 all highlighted red as impossible values. Gold callout gives specific fixes for each"/>;
}
export function MachakosCleanIdentifyDuplicates() {
  return <ScreenshotFrame
    src="/lesson-images/data-cleaning/02-identify-duplicates.jpg"
    alt="SPSS Identify Duplicate Cases dialog for the Machakos study. RespID moved to the Define matching cases by box highlighted yellow. PrimaryLast indicator variable set to be created. Behind the dialog Data View shows two duplicate rows highlighted"/>;
}
export function MachakosCleanWorkflow() {
  return <ScreenshotFrame
    src="/lesson-images/data-cleaning/03-cleaning-workflow.jpg"
    alt="The Machakos 5-step data-cleaning workflow. Step 1 Save Raw File. Step 2 Hunt Impossible Values with Frequencies and Descriptives. Step 3 Find and Resolve Duplicates. Step 4 Audit Missing Values. Step 5 Build Composite Scores with Transform Compute. Navy banner reminds to do these in order on a working copy"/>;
}

/* ─── SPSS Basics · Lesson 5 · Handling Missing Values ─── */
export function MachakosMissingMcarMarMnar() {
  return <ScreenshotFrame
    src="/lesson-images/missing-values/00-mcar-mar-mnar.jpg"
    alt="Three-panel infographic explaining MCAR, MAR, and MNAR missing data types. Each panel has a definition, an icon, a Machakos study example, and an impact statement. Green panel MCAR, gold panel MAR, red panel MNAR"/>;
}
export function MachakosMissingMvaMenu() {
  return <ScreenshotFrame
    src="/lesson-images/missing-values/01-mva-menu.jpg"
    alt="SPSS Analyze menu open showing Missing Value Analysis highlighted with a gold CLICK HERE arrow. Full click path is Analyze then Missing Value Analysis"/>;
}
export function MachakosMissingMvaOutput() {
  return <ScreenshotFrame
    src="/lesson-images/missing-values/02-mva-output.jpg"
    alt="SPSS Missing Value Analysis output showing the Univariate Statistics table for all 13 Machakos variables. Form 23.4 percent missing and HighestQual 77.4 percent missing highlighted amber. Gold callout explains these are structural missing values"/>;
}
export function MachakosMissingPairwiseListwise() {
  return <ScreenshotFrame
    src="/lesson-images/missing-values/03-pairwise-listwise.jpg"
    alt="Side-by-side comparison of Listwise versus Pairwise deletion using Machakos data. Left red panel shows Listwise drops the effective N from 274 to 164. Right green panel shows Pairwise varies from N=268 to 272 per variable pair. Navy banner recommends Pairwise for correlation"/>;
}
export function MachakosMissingDecisionTree() {
  return <ScreenshotFrame
    src="/lesson-images/missing-values/04-decision-tree.jpg"
    alt="Decision tree flowchart titled Which missing-data strategy should I use. Question 1 asks percentage missing (less than 5 percent, 5 to 15 percent, greater than 15 percent). Question 2 asks whether missingness is structural. Question 3 asks the analysis type (correlation, regression, or reliability). Final boxes recommend PAIRWISE or LISTWISE based on the path"/>;
}

/* ─── SPSS Basics · Lesson 4 · Importing Data from Excel ─── */
export function MachakosImportMessy() {
  return <ScreenshotFrame
    src="/lesson-images/importing-data/00-messy-excel.jpg"
    alt="Microsoft Excel showing a messy Machakos data file with 7 problems that break SPSS imports. Red X callouts point to merged title row, blank rows, mixed text/numbers, inconsistent capitalization, words instead of decimals, notes inside data cells, and multiple worksheet tabs"/>;
}
export function MachakosImportClean() {
  return <ScreenshotFrame
    src="/lesson-images/importing-data/01-clean-excel.jpg"
    alt="Microsoft Excel showing the SAME Machakos data properly formatted for SPSS import. Green checkmark callouts point to headers in row 1, SPSS-friendly variable names with underscores, consistent Male/Female spelling, pure numbers only in Age column, and a single worksheet tab"/>;
}
export function MachakosImportMenuPath() {
  return <ScreenshotFrame
    src="/lesson-images/importing-data/02-menu-path.jpg"
    alt="SPSS File menu open showing Import Data submenu with Excel highlighted and a gold CLICK HERE arrow. The full click path is File then Import Data then Excel"/>;
}
export function MachakosImportDialog() {
  return <ScreenshotFrame
    src="/lesson-images/importing-data/03-import-dialog.jpg"
    alt="The SPSS Read Excel File dialog with the Machakos file selected. File path visible, Worksheet dropdown showing Machakos A1 to I275 auto-detected. Read variable names from first row of data checkbox ticked and highlighted gold. Preview panel below shows the first five rows of Machakos data"/>;
}
export function MachakosImportSuccess() {
  return <ScreenshotFrame
    src="/lesson-images/importing-data/04-success-checklist.jpg"
    alt="SPSS Data Editor showing the successfully imported Machakos dataset with a 4-item verification checklist overlay. Cases equal 274 and Variables equal 9 both checked green. Two amber warnings flag the Measure column needs review and Value Labels are missing for categorical variables"/>;
}

/* ─── SPSS Basics · Lesson 3 · Defining Variables & Labels ─── */
export function MachakosDefineValueLabels() {
  return <ScreenshotFrame
    src="/lesson-images/defining-variables/00-value-labels-dialog.jpg"
    alt="SPSS Value Labels dialog for the Machakos Gender variable. Value field 2, Label field Female. List below shows 1 = Male and 2 = Female (highlighted). Behind the dialog Variable View grid with Gender row and its ... button visible"/>;
}
export function MachakosDefineMissingValues() {
  return <ScreenshotFrame
    src="/lesson-images/defining-variables/01-missing-values-dialog.jpg"
    alt="SPSS Missing Values dialog for a Machakos Likert item Dev_1. Discrete missing values radio button selected, first text box filled with 9. Range option greyed out. Gold callout explains why 9 not 5 as the missing code"/>;
}
export function MachakosDefineVariableType() {
  return <ScreenshotFrame
    src="/lesson-images/defining-variables/02-variable-type-dialog.jpg"
    alt="SPSS Variable Type dialog for Machakos Math_KCSE_Mean. Numeric radio button selected with format icon. Width 5 and Decimal Places 2 shown. Nine type options visible on the left (Numeric, Comma, Dot, Scientific, Date, Dollar, Custom currency, String, Restricted Numeric)"/>;
}
export function MachakosDefineProperties() {
  return <ScreenshotFrame
    src="/lesson-images/defining-variables/03-define-properties.jpg"
    alt="SPSS Define Variable Properties dialog scanning the Machakos Category variable. Value Label Grid shows auto-detected counts Principal 8, Teacher 54, Student 212 exactly matching the Machakos study frequencies. Left panel shows Scan variables checkboxes"/>;
}
export function MachakosDefineCodebook() {
  return <ScreenshotFrame
    src="/lesson-images/defining-variables/04-codebook.jpg"
    alt="SPSS Output Viewer showing an auto-generated Codebook report for Machakos variables. Gender block with position label type measurement value labels and frequency table 128 males 146 females. Category block with Principal 8 Teacher 54 Student 212. Age block with descriptive stats N=274"/>;
}

/* ─── SPSS Basics · Lesson 2 · Data View vs Variable View ─── */
export function MachakosDataViewSideBySide() {
  return <ScreenshotFrame
    src="/lesson-images/data-view/00-side-by-side.jpg"
    alt="The Machakos dataset shown in Data View (left, showing values like R001 Principal Male 48) and Variable View (right, showing the variable definitions and settings). Large gold arrow between them says SAME DATASET click bottom tab to switch"/>;
}
export function MachakosDataViewGrid() {
  return <ScreenshotFrame
    src="/lesson-images/data-view/01-data-view-grid.jpg"
    alt="The Machakos Data View grid with 4 color-coded callouts: gold arrow to row 1 explaining ONE ROW = ONE RESPONDENT, green arrow to Gender column explaining ONE COLUMN = ONE VARIABLE, navy arrow to a selected Age cell explaining ONE CELL = ONE VALUE, coral arrow to blank Form cells explaining BLANK CELLS = MISSING for principals and teachers"/>;
}
export function MachakosCaseVsVariable() {
  return <ScreenshotFrame
    src="/lesson-images/data-view/02-case-vs-variable.jpg"
    alt="Educational infographic explaining case vs variable. Left blue panel shows CASE = ONE PERSON with a horizontal strip of R004's data. Right gold panel shows VARIABLE = ONE QUESTION with a vertical Age column. Big navy arrow at bottom TOGETHER THEY FORM the dataset. Gold banner reminds Row = Case = Respondent"/>;
}
export function MachakosVariableViewGrid() {
  return <ScreenshotFrame
    src="/lesson-images/data-view/03-variable-view-grid.jpg"
    alt="The Machakos Variable View showing 11 variables defined across 11 metadata columns (Name, Type, Width, Decimals, Label, Values, Missing, Columns, Align, Measure, Role). Row 4 Gender highlighted. Four color-coded callouts explain Name, Label, Values, and Measure columns with Machakos examples"/>;
}
export function MachakosMeasurementLevels() {
  return <ScreenshotFrame
    src="/lesson-images/data-view/04-measurement-levels.jpg"
    alt="The 3 measurement levels in SPSS as a reference card. Gold column SCALE with Machakos examples like Age and Math_KCSE_Mean. Green column ORDINAL with Form and HighestQual. Red column NOMINAL with Gender and Category. Each column lists the appropriate statistical tests. Warning banner explains getting Measure wrong causes meaningless test results"/>;
}

/* ─── SPSS Basics · Lesson 1 · The SPSS Interface ─── */
export function MachakosInterfaceMap() {
  return <ScreenshotFrame
    src="/lesson-images/spss-interface/00-editor-map.jpg"
    alt="The SPSS Data Editor window annotated with 5 color-coded callouts. Gold for the menu bar, green for the toolbar, navy for the Data View grid, coral for the View tabs, and purple for the status bar"/>;
}
export function MachakosInterfaceFourWindows() {
  return <ScreenshotFrame
    src="/lesson-images/spss-interface/01-four-windows.jpg"
    alt="Four main SPSS windows shown side by side. Data Editor (green border), Output Viewer (gold border), Syntax Editor (navy border), Chart Builder (purple border). Each panel captioned with when to use it"/>;
}
export function MachakosInterfaceMenuMap() {
  return <ScreenshotFrame
    src="/lesson-images/spss-interface/02-menu-map.jpg"
    alt="The 11 SPSS menus shown as colored callouts under a real SPSS menu bar. Each callout describes what lives inside that menu. Analyze menu highlighted with a gold star as the most important"/>;
}
export function MachakosInterfaceMachakosLoaded() {
  return <ScreenshotFrame
    src="/lesson-images/spss-interface/03-machakos-loaded.jpg"
    alt="SPSS Data Editor showing the Machakos study dataset just opened. Column headers show variable-type icons for each of the 21 variables. First 15 rows show a realistic mix of principals, teachers, and students with age, form, qualification, Likert scores, and KCSE means. Status bar reads Cases 274 Variables 21"/>;
}

/* ─── Machakos Partial Correlation (Analyze → Correlate → Partial) ─── */
export function MachakosPartialMenuPath() {
  return <ScreenshotFrame
    src="/lesson-images/partial/00-menu-path.jpg"
    alt="SPSS menu path Analyze then Correlate then Partial highlighted with a gold CLICK HERE arrow, distinguishing it from the Bivariate option used in the Pearson lesson"/>;
}
export function MachakosPartialDialog() {
  return <ScreenshotFrame
    src="/lesson-images/partial/01-dialog.jpg"
    alt="SPSS Partial Correlations dialog with Digital_Devices and Math_KCSE_Mean in the Variables box, and InvestmentPerStudent highlighted in the Controlling for box with a gold THE KEY DIFFERENCE callout"/>;
}
export function MachakosPartialOutput() {
  return <ScreenshotFrame
    src="/lesson-images/partial/02-output.jpg"
    alt="SPSS output showing Partial Corr with two nested tables. Top table zero-order correlations with .478 highlighted amber. Bottom table controlling for InvestmentPerStudent with .285 highlighted gold. df = 271"/>;
}
export function MachakosPartialComparison() {
  return <ScreenshotFrame
    src="/lesson-images/partial/03-comparison.jpg"
    alt="Educational infographic titled Bivariate vs Partial. Two panels side by side. Left panel amber shows r = .478 medium-large. Right panel gold shows r = .285 small-medium after controlling for InvestmentPerStudent. Navy explanation card at the bottom explains how funding was inflating the bivariate relationship"/>;
}

/* ─── Machakos Correlation Matrices (READING the Pearson matrix) ─── */
export function MachakosMatrixAnnotated() {
  return <ScreenshotFrame
    src="/lesson-images/matrices/00-annotated.jpg"
    alt="Educational infographic showing a 5x5 Machakos Pearson correlation matrix with four color-coded callouts. Gold arrow to the diagonal (ignore 1.000s), green arrow to the lower triangle (symmetric, read one only), red arrow to asterisks (significance), navy arrow to the Math_KCSE_Mean column (the DV money row)"/>;
}
export function MachakosMatrixPublication() {
  return <ScreenshotFrame
    src="/lesson-images/matrices/01-publication.jpg"
    alt="APA 7 publication-ready Pearson correlation matrix table styled like a real thesis Chapter 4. Table 12 heading. Variables numbered 1 to 5. Only the lower triangle populated. Em dashes on the diagonal. Note at bottom N=274 and asterisk indicators"/>;
}

/* ─── Machakos Pearson Correlation (Bivariate Correlations walkthrough) ─── */
export function MachakosPearsonMenuPath() {
  return <ScreenshotFrame
    src="/lesson-images/pearson/00-menu-path.jpg"
    alt="SPSS main menu showing click path Analyze → Correlate → Bivariate. Correlate highlighted blue with cascading submenu showing Bivariate highlighted, gold arrow and CLICK HERE label for Pearson & Spearman correlations"/>;
}
export function MachakosPearsonDialog() {
  return <ScreenshotFrame
    src="/lesson-images/pearson/01-dialog.jpg"
    alt="SPSS Bivariate Correlations dialog with 5 continuous variables (Digital_Devices, Teacher_Competency, Internet_Connectivity, InvestmentPerStudent, Math_KCSE_Mean) moved to the Variables box on the right. Pearson checkbox ticked, Kendall and Spearman unticked, Two-tailed radio selected, Flag significant correlations ticked"/>;
}
export function MachakosPearsonOptions() {
  return <ScreenshotFrame
    src="/lesson-images/pearson/02-options.jpg"
    alt="SPSS Bivariate Correlations: Options sub-dialog. Means and standard deviations checkbox ticked under Statistics. Exclude cases pairwise radio selected under Missing Values"/>;
}
export function MachakosPearsonOutput() {
  return <ScreenshotFrame
    src="/lesson-images/pearson/03-output.jpg"
    alt="SPSS Output Viewer showing (1) a Descriptive Statistics table with Mean, SD, N for all 5 variables and (2) a full 5x5 Pearson Correlation matrix with correlation coefficients, Sig 2-tailed p-values, and N counts in each cell. All correlations flagged as significant at 0.01 level with red asterisks"/>;
}
export function MachakosPearsonAnnotated() {
  return <ScreenshotFrame
    src="/lesson-images/pearson/04-annotated.jpg"
    alt="Annotated single cell of a Pearson Correlation matrix (Digital_Devices × Math_KCSE_Mean) with four color-coded callouts: r = 0.478 explained with Cohens benchmarks (gold), significance asterisks explained (red), Sig 2-tailed p-value explained (navy), N sample size explained (green). Bottom shows Chapter 4 write-up template"/>;
}
export function MachakosPearsonScatter() {
  return <ScreenshotFrame
    src="/lesson-images/pearson/05-scatter.jpg"
    alt="Scatter plot showing the positive linear relationship between Digital_Devices (X-axis) and Math_KCSE_Mean (Y-axis) across 274 Machakos respondents. Clear upward trend with gold regression line, Pearson r = .478, R squared = 0.229"/>;
}

/* ─── Machakos Graphs & Charts (Chart Builder walkthrough) ─── */
export function MachakosGraphsMenuPath() {
  return <ScreenshotFrame
    src="/lesson-images/graphs/00-menu-path.jpg"
    alt="SPSS main menu showing click path Graphs → Chart Builder. The Graphs menu is boxed in red, Chart Builder is highlighted in blue, with a gold arrow and CLICK HERE label"/>;
}
export function MachakosGraphsChartBuilder() {
  return <ScreenshotFrame
    src="/lesson-images/graphs/01-chart-builder.jpg"
    alt="SPSS Chart Builder dialog. Top-left: variables list with Category highlighted. Top-right: chart preview area. Bottom-left: Gallery tab with 8 chart types (Bar selected). Bottom-middle: chart variations panel. Bottom-right: Element Properties panel"/>;
}
export function MachakosGraphsHistogram() {
  return <ScreenshotFrame
    src="/lesson-images/graphs/02-histogram.jpg"
    alt="SPSS Output Viewer showing a histogram of Math_KCSE_Mean. Bell-curve shape peaking around 5.5-6.0. Overlay text shows Mean = 5.92, Std. Dev = .82, N = 274. Dashed normal-distribution overlay confirms approximate normality"/>;
}
export function MachakosGraphsBoxplot() {
  return <ScreenshotFrame
    src="/lesson-images/graphs/03-boxplot-annotated.jpg"
    alt="Annotated boxplot diagram showing 3 boxplots (Principal, Teacher, Student) with 5 color-coded callouts on the Student boxplot: Q3 (gold), Median (navy), Q1 (green), Whiskers (grey), and Outlier (red)"/>;
}
export function MachakosGraphsClusteredBar() {
  return <ScreenshotFrame
    src="/lesson-images/graphs/04-clustered-bar.jpg"
    alt="Publication-ready clustered bar chart showing respondent counts by Category and Gender. Male bars (blue) and Female bars (gold) side-by-side within each of 3 categories: Principal (5M/3F), Teacher (38M/16F), Student (85M/127F)"/>;
}

/* ─── Machakos Standard Deviation & Variance (per-item Likert breakdown) ─── */
export function MachakosSDMenuPath() {
  return <ScreenshotFrame
    src="/lesson-images/standard-deviation/00-menu-path.jpg"
    alt="SPSS main menu showing click path Analyze → Descriptive Statistics → Frequencies (with a gold CLICK HERE arrow — for per-item Likert breakdown)"/>;
}
export function MachakosSDDialog() {
  return <ScreenshotFrame
    src="/lesson-images/standard-deviation/01-dialog.jpg"
    alt="SPSS Frequencies dialog with the 5 Dev_1 through Dev_5 items highlighted in blue and moved into the Variable(s) box. A gold callout arrow points to the Statistics button — the next click"/>;
}
export function MachakosSDStatistics() {
  return <ScreenshotFrame
    src="/lesson-images/standard-deviation/02-statistics.jpg"
    alt="SPSS Frequencies: Statistics sub-dialog. Under Central Tendency, Mean is checked. Under Dispersion, Std. deviation, Variance, Range, Minimum, and Maximum are all checked. Skewness and Kurtosis remain unchecked"/>;
}
export function MachakosSDOutput() {
  return <ScreenshotFrame
    src="/lesson-images/standard-deviation/03-output.jpg"
    alt="SPSS Output Viewer showing (1) a Statistics summary table with Mean, Std Deviation, Variance, Range, Min, Max for all 5 Dev items and (2) the beginning of the per-item Frequency Table for Dev_1 with SD/D/N/A/SA counts and percentages"/>;
}
export function MachakosSDThesisTable() {
  return <ScreenshotFrame
    src="/lesson-images/standard-deviation/04-thesis-table.jpg"
    alt="Chapter-4-ready APA table: Descriptive Statistics for Digital Devices Availability (N = 274). Rows: 5 Likert items. Columns: SD, D, N, A, SA counts with percentages, Mean, Std Dev. Bottom row shows the composite score (Mean = 3.51, SD = 0.824) highlighted in gold"/>;
}

/* ─── Machakos Central Tendency (Descriptives procedure) ─── */
export function MachakosCTMenuPath() {
  return <ScreenshotFrame
    src="/lesson-images/central-tendency/00-menu-path.jpg"
    alt="SPSS main menu showing click path Analyze → Descriptive Statistics → Descriptives (not Frequencies). Descriptives is highlighted in blue with a gold CLICK HERE arrow"/>;
}
export function MachakosCTDialog() {
  return <ScreenshotFrame
    src="/lesson-images/central-tendency/01-dialog.jpg"
    alt="SPSS Descriptives dialog with 5 continuous variables (Digital_Devices, Teacher_Competency, Internet_Connectivity, InvestmentPerStudent, Math_KCSE_Mean) already moved into the Variable(s) box on the right"/>;
}
export function MachakosCTOptions() {
  return <ScreenshotFrame
    src="/lesson-images/central-tendency/02-options.jpg"
    alt="SPSS Descriptives: Options sub-dialog with Mean, Std. deviation, Variance, Range, Minimum, Maximum, Kurtosis, and Skewness all checked. Variable list radio button selected under Display Order"/>;
}
export function MachakosCTOutput() {
  return <ScreenshotFrame
    src="/lesson-images/central-tendency/03-output.jpg"
    alt="SPSS Output Viewer showing the Descriptive Statistics table with 5 rows (Digital_Devices, Teacher_Competency, Internet_Connectivity, InvestmentPerStudent, Math_KCSE_Mean) and columns for N, Range, Min, Max, Mean, Std Deviation, Variance, Skewness and Kurtosis (with their Statistic and Std Error sub-columns). N=274 for all rows"/>;
}
export function MachakosCTAnnotated() {
  return <ScreenshotFrame
    src="/lesson-images/central-tendency/04-annotated.jpg"
    alt="Annotated single row of a Descriptives output table for Digital_Devices variable, with six color-coded callouts explaining N (gold), Mean (blue), Std Deviation (green), Min/Max (grey), Skewness (purple) and Kurtosis (orange)"/>;
}

export function MachakosFreqDialog() {
  return <ScreenshotFrame
    src="/lesson-images/frequencies/01-dialog-with-vars.jpg"
    alt="SPSS Frequencies dialog with Category, Gender, Form, and HighestQual variables selected on the left and already moved to the Variable(s) box on the right"/>;
}

export function MachakosFreqCharts() {
  return <ScreenshotFrame
    src="/lesson-images/frequencies/02-charts-subdialog.jpg"
    alt="SPSS Frequencies: Charts sub-dialog with Bar charts selected under Chart Type and Frequencies selected under Chart Values"/>;
}

export function MachakosFreqOutput() {
  return <ScreenshotFrame
    src="/lesson-images/frequencies/03-output-viewer.jpg"
    alt="SPSS Output Viewer showing the left navigation tree with Frequencies expanded, the Statistics table with N Valid and Missing counts for all four variables, and the beginning of the Category frequency table"/>;
}

export function MachakosFreqAnnotated() {
  return <ScreenshotFrame
    src="/lesson-images/frequencies/04-annotated-columns.jpg"
    alt="Annotated Category frequency table with color-coded callouts explaining each column: Frequency (gold), Percent (blue), Valid Percent (green), and Cumulative Percent (grey)"/>;
}

export function MachakosFreqBarChart() {
  return <ScreenshotFrame
    src="/lesson-images/frequencies/05-bar-chart.jpg"
    alt="SPSS-generated bar chart showing frequency counts for Category variable: Principal (8), Teacher (54), Student (212)"/>;
}

export const ILLUSTRATIONS = {
  /* Machakos Frequencies screenshots */
  MachakosFreqMenuPath, MachakosFreqDialog, MachakosFreqCharts, MachakosFreqOutput,
  MachakosFreqAnnotated, MachakosFreqBarChart,
  /* Machakos Central Tendency screenshots (Descriptives procedure) */
  MachakosCTMenuPath, MachakosCTDialog, MachakosCTOptions, MachakosCTOutput, MachakosCTAnnotated,
  /* Machakos Standard Deviation screenshots (per-item Likert breakdown) */
  MachakosSDMenuPath, MachakosSDDialog, MachakosSDStatistics, MachakosSDOutput, MachakosSDThesisTable,
  /* Machakos Graphs & Charts screenshots (Chart Builder walkthrough) */
  MachakosGraphsMenuPath, MachakosGraphsChartBuilder, MachakosGraphsHistogram,
  MachakosGraphsBoxplot, MachakosGraphsClusteredBar,
  /* Machakos Pearson Correlation screenshots (Bivariate walkthrough) */
  MachakosPearsonMenuPath, MachakosPearsonDialog, MachakosPearsonOptions,
  MachakosPearsonOutput, MachakosPearsonAnnotated, MachakosPearsonScatter,
  /* Machakos Spearman Correlation screenshots (reuses Pearson menu path) */
  MachakosSpearmanDialog, MachakosSpearmanOutput, MachakosSpearmanAnnotated, MachakosSpearmanScatter,
  /* Machakos Partial Correlation screenshots */
  MachakosPartialMenuPath, MachakosPartialDialog, MachakosPartialOutput, MachakosPartialComparison,
  /* Machakos Correlation Matrices — 2 unique images (menu path etc. reused from Pearson) */
  MachakosMatrixAnnotated, MachakosMatrixPublication,
  /* SPSS Basics · Lesson 1 · The SPSS Interface — 4 reference images */
  MachakosInterfaceMap, MachakosInterfaceFourWindows, MachakosInterfaceMenuMap, MachakosInterfaceMachakosLoaded,
  /* SPSS Basics · Lesson 2 · Data View vs Variable View — 5 reference images */
  MachakosDataViewSideBySide, MachakosDataViewGrid, MachakosCaseVsVariable, MachakosVariableViewGrid, MachakosMeasurementLevels,
  /* SPSS Basics · Lesson 3 · Defining Variables — 5 dialog screenshots */
  MachakosDefineValueLabels, MachakosDefineMissingValues, MachakosDefineVariableType, MachakosDefineProperties, MachakosDefineCodebook,
  /* SPSS Basics · Lesson 4 · Importing from Excel — 5 workflow images */
  MachakosImportMessy, MachakosImportClean, MachakosImportMenuPath, MachakosImportDialog, MachakosImportSuccess,
  /* SPSS Basics · Lesson 5 · Handling Missing Values — 5 concept + procedure images */
  MachakosMissingMcarMarMnar, MachakosMissingMvaMenu, MachakosMissingMvaOutput, MachakosMissingPairwiseListwise, MachakosMissingDecisionTree,
  /* Data Cleaning · Impossible Values + Duplicates — 4 workflow images */
  MachakosCleanImpossibleFreq, MachakosCleanDescriptivesRange, MachakosCleanIdentifyDuplicates, MachakosCleanWorkflow,
  /* Data Cleaning · Recoding + Reverse-coding — 3 images */
  MachakosCleanRecodeMain, MachakosCleanOldNewValues, MachakosCleanReverseBeforeAfter,
  /* Data Cleaning · Compute Variable — 3 images */
  MachakosCleanComputeDialog, MachakosCleanThreeComposites, MachakosCleanCompositeVerification,
  /* Data Cleaning · Select Cases — 2 images */
  MachakosCleanSelectCases, MachakosCleanSubsetsWorkflow,
  /* Regression · Simple + Multiple + Diagnostics + Logistic + Hierarchical + Multinomial/Ordinal — 20 images */
  MachakosRegMenu, MachakosRegSimpleDialog, MachakosRegSimpleOutput, MachakosRegScatterLine,
  MachakosRegMultiDialog, MachakosRegMultiOutput, MachakosRegBetaComparison, MachakosRegR2Breakdown,
  MachakosRegFiveAssumptions, MachakosRegResidualScatter, MachakosRegStatsDialog,
  MachakosDiagNormality, MachakosDiagVIF, MachakosDiagCooks,
  MachakosLogisticMenu, MachakosLogisticDialog, MachakosLogisticOutput,
  MachakosHierarchicalBlocks, MachakosHierarchicalR2Change, MachakosThreeApproachesComparison,
  MachakosRegWhenToUseWhich,
  /* Beginner-first polish — WWWW cards + per-step diagrams */
  MachakosHrWWWW, MachakosHrStepBlock1, MachakosHrStepBlock2,
  MachakosLgWWWW, MachakosLgStepMenu, MachakosLgStepOptions,
  /* Beginner-first polish (round 2) — Simple + Multiple + Multinomial/Ordinal */
  MachakosSrWWWW, MachakosSrNumberedClicks,
  MachakosMrWWWW, MachakosMrNumberedClicks,
  MachakosMnWWWW, MachakosMultinomialDialogFull, MachakosMultinomialOutputFull,
  MachakosOrdinalDialogFull, MachakosOrdinalOutputFull,
  /* Correlation course — WWWW cards + decision map */
  MachakosPearsonWWWW, MachakosSpearmanWWWW, MachakosPartialWWWW, MachakosMatricesWWWW,
  MachakosCorrelationDecision,
  /* T-Tests course — WWWW + dialogs + outputs + decision map */
  KiambuOstWWWW, KiambuOstDialog, KiambuOstOutput,
  KiambuItWWWW, KiambuItDialog, KiambuItOutput,
  NakuruPtWWWW, NakuruPtDialog, NakuruPtOutput,
  TTestDecisionMap,
  /* T-Tests non-parametric alternatives */
  NakuruWilcoxonWWWW, NakuruWilcoxonDialog, NakuruWilcoxonOutput,
  KiambuMannWhitneyWWWW, KiambuMannWhitneyDialog, KiambuMannWhitneyOutput,
  /* Chi-Square course — Nyandarua Vaccine study */
  NyandaruaChiWWWW, NyandaruaCrosstabsDialog, NyandaruaChiStatsDialog, NyandaruaChiOutput,
  /* Writing Up course — Chapter 4 + APA 7 */
  Chapter4StructureCard, Chapter4ResponseRate, Chapter4GoodVsBad,
  APATemplatesReference, APATableRules, APABadVsGoodTable,
  /* Reliability course — Cronbach + Item-Total + Split-Half */
  MombasaCronWWWW, MombasaCronDialog, MombasaCronOutput,
  ItemTotalWWWW, ItemTotalTable,
  SplitHalfWWWW, SplitHalfOutput,
  ReliabilityDecisionMap,
  /* ANOVA course Part 1 — One-way + Post-hoc + Kruskal-Wallis + decision map */
  KiambuAnovaWWWW, KiambuAnovaDialog, KiambuAnovaOutput,
  KiambuPostHocWWWW, KiambuPostHocDialog, KiambuPostHocOutput,
  KiambuKWWWWW, KiambuKWDialog, KiambuKWOutput,
  ANOVADecisionMap,
  /* ANOVA course Part 2 — Two-way + Repeated Measures + Friedman */
  KiambuTwoWayWWWW, KiambuTwoWayDialog, KiambuTwoWayOutput, KiambuInteractionPlot,
  NakuruRMWWWW, NakuruRMDialog, NakuruRMOutput,
  NakuruFriedmanWWWW, NakuruFriedmanDialog, NakuruFriedmanOutput,
  Scatter4, BivariateDialog, CorrelationOutput, PearsonFormula,
  HowRWorks, OutlierImpact, CurvilinearWarning, ScatterAnnotated,
  /* SPSS Basics 1-2 */
  SpssStartScreen, SpssInterfaceMap, CaseVsVariable,
  VariableViewGrid, DataViewGrid, DataVsVariableSideBySide, MeasurementLevels,
  /* SPSS Basics 3-5 */
  ValueLabelsDialog, DefineVarPropertiesDialog, ExcelImportDialog,
  MissingValuesDialog, MissingTypesGrid, MessyExcelWarning, CleanDatasetExample,
  /* Descriptive Statistics */
  FrequenciesOutput, HistogramShape, DistributionShapes,
  MeanVsMedian, SameMeanDifferentSD, BoxplotAnatomy, BarVsPie,
  ChartBuilderDialog, EmpiricalRule,
  /* Reliability */
  ReliabilityDialog, ReliabilityOutput, ItemTotalStatistics,
  ReverseCoding, SplitHalfLogic, ReliabilityAnalogy,
  /* Correlation extras */
  SpearmanRanks, PartialVenn, CorrelationMatrixAnatomy, MatrixSymmetry,
  /* Regression */
  RegressionLineResiduals, LinearRegressionDialog, RegressionOutput,
  ResidualsHomoVsHetero, MulticollinearityVenn, LogisticCurve,
  HierarchicalBlocks,
  /* ANOVA */
  AnovaLogic, OneWayAnovaDialog, AnovaOutput, PostHocOutput,
  InteractionPlot, InteractionPlots, RepeatedMeasuresLogic, AnovaDecisionTree,
  /* T-Tests */
  TTestLogic, IndependentTTestDialog, IndependentTTestOutput,
  PairedDifferenceLogic, PairedTTestDialog, PairedTTestOutput,
  OneSampleTTestLogic, OneSampleTTestDialog, OneSampleTTestOutput,
  /* Master Decision Tree */
  MasterDecisionTree,
  /* Non-parametric tests */
  MannWhitneyRanks, MannWhitneyDialog, MannWhitneyOutput,
  WilcoxonSignedRanks, WilcoxonDialog, WilcoxonOutput,
  KruskalWallisLogic, KruskalWallisDialog, KruskalWallisOutput,
  FriedmanRanks, FriedmanDialog, FriedmanOutput,
  /* Chi-square */
  ChiSquareLogic, CrosstabsDialog, ChiSquareOutput,
  /* Data Cleaning */
  ImpossibleValues, ReverseLikertExample, CleaningWorkflow,
  /* Advanced Regression — Hierarchical / Stepwise */
  HierarchicalBlocksDetailed, HierarchicalDialog, HierarchicalModelSummary, StepwiseProblems,
  /* Advanced Regression — Multinomial / Ordinal */
  MultinomialVsOrdinal, MultinomialDialog, MultinomialOutput,
  OrdinalThresholds, OrdinalDialog, OrdinalOutput,
  /* Advanced ANOVA — ANCOVA, MANOVA, Mixed ANOVA */
  AncovaLogic, AncovaDialog, HomogeneitySlopesCheck, AncovaOutput,
  ManovaLogic, ManovaDialog, ManovaOutput,
  MixedAnovaInteraction, MixedAnovaDialog, MixedAnovaOutput,
  /* Writing Up — Chapter 4 & APA 7 */
  Chapter4Structure, InferentialSectionStructure,
  ApaFormattingRules, ApaTestTemplates, ApaTableExample,
};
