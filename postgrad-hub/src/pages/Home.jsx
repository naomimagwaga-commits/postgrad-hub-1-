import { Link } from 'react-router-dom';
import PublicNav from '../components/PublicNav.jsx';
import Footer from '../components/Footer.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';
import {
  IconForm, IconChart, IconBook, IconCalendar, IconCheck,
  IconArrow, IconSpark, IconShield,
  IconMail, IconWhatsApp, IconPhone, IconLocation,
} from '../components/Icons.jsx';

/* ── HERO illustration: editorial geometric mark ── */
function HeroMark() {
  return (
    <svg viewBox="0 0 480 480" className="w-full h-full">
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8E711F" />
        </linearGradient>
        <linearGradient id="g2" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#2C599E" />
          <stop offset="100%" stopColor="#0A2E5D" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="240" cy="240" r="220" fill="url(#glow)" />
      {/* outer ring */}
      <circle cx="240" cy="240" r="180" fill="none" stroke="#D4AF37" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 6" />
      <circle cx="240" cy="240" r="150" fill="none" stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="1" />
      {/* central tablet */}
      <rect x="140" y="120" width="200" height="240" rx="16" fill="#FAF7EF" stroke="#D4AF37" strokeWidth="2" />
      <rect x="160" y="142" width="100" height="8" rx="2" fill="#0A2E5D" />
      <rect x="160" y="160" width="160" height="4" rx="2" fill="#0A2E5D" opacity="0.35" />
      <rect x="160" y="170" width="140" height="4" rx="2" fill="#0A2E5D" opacity="0.35" />
      <rect x="160" y="180" width="120" height="4" rx="2" fill="#0A2E5D" opacity="0.35" />
      {/* mini chart */}
      <rect x="160" y="210" width="160" height="80" rx="4" fill="#0A2E5D" />
      <polyline points="170,275 195,250 220,260 245,235 270,245 295,220 310,228" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="310" cy="228" r="3" fill="#D4AF37" />
      {/* checkmarks */}
      <g fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M165 310 l8 8 l16 -16" />
        <path d="M165 330 l8 8 l16 -16" />
      </g>
      <rect x="195" y="306" width="120" height="6" rx="2" fill="#0A2E5D" opacity="0.5" />
      <rect x="195" y="326" width="100" height="6" rx="2" fill="#0A2E5D" opacity="0.3" />
      {/* graduation cap */}
      <g transform="translate(310,90)">
        <polygon points="0,20 40,0 80,20 40,40" fill="url(#g1)" />
        <path d="M20 30 V46 C20 52 60 52 60 46 V30" fill="url(#g1)" opacity="0.9" />
        <line x1="78" y1="20" x2="78" y2="44" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="78" cy="46" r="3" fill="#D4AF37" />
      </g>
      {/* orbiting dots */}
      <circle cx="60" cy="240" r="5" fill="#D4AF37">
        <animate attributeName="cy" values="240;245;240" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="420" cy="200" r="4" fill="#D4AF37" opacity="0.8" />
      <circle cx="100" cy="380" r="3" fill="#D4AF37" opacity="0.6" />
    </svg>
  );
}

const features = [
  {
    icon: IconForm,
    no: '01',
    title: 'Data Collection Tools',
    desc: 'Submit your draft questionnaire or interview guide. We refine it to align with your objectives and deliver a digital data-collection link — far faster than printing, distributing and re-entering paper forms.',
  },
  {
    icon: IconChart,
    no: '02',
    title: 'Statistical Test Selector',
    desc: 'A guided decision engine that recommends the right analysis for your research design, with assumptions, SPSS click-paths, and interpretation walkthroughs. Unlock each test individually.',
  },
  {
    icon: IconBook,
    no: '03',
    title: 'SPSS Academy',
    desc: 'Modular lessons across descriptives, correlation, regression, ANOVA, and reliability testing. Detailed notes packs with annotated screenshots, real-data worked examples and APA write-ups — purchased per lesson. Video walkthroughs coming soon.',
  },
  {
    icon: IconSpark,
    no: '04',
    title: 'Done-for-You Analysis & Interpretation',
    desc: 'Don\'t want to run analyses yourself? Our well-knowledgeable PhD researchers handle it for you — order pure SPSS tables, polished citation-rich interpretation, or both. Each tier priced separately.',
  },
  {
    icon: IconCalendar,
    no: '05',
    title: 'Expert Consultations',
    desc: 'One-on-one research support — thesis review, data analysis, interpretation, methodology. Book a session tailored to your needs.',
  },
];

const steps = [
  { n: '01', t: 'Define your study', d: 'Set your research type, objectives and variables — establish a clear study profile.' },
  { n: '02', t: 'Submit your draft', d: 'Send us your questionnaire or interview guide. We refine it to match your research questions.' },
  { n: '03', t: 'Run the right analysis', d: 'Get a precise test recommendation with assumptions, SPSS steps and interpretation guidance.' },
  { n: '04', t: 'Book expert review', d: 'One-on-one consultation for thesis review, interpretation, or methodology fine-tuning.' },
];

export default function Home() {
  usePageTitle();   // default full site title
  return (
    <div className="min-h-screen flex flex-col bg-parchment">
      <PublicNav />

      {/* ─────────────────────────  HERO  ───────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-white">
        {/* Background layers */}
        <div className="absolute inset-0 bg-grid-dark opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-ink to-brand-800" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gold/10 blur-3xl animate-glow" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-400/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 reveal">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold-200 text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                Built for Kenyan postgraduates
              </div>

              <h1 className="display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mt-7">
                From research idea
                <br />
                to <span className="italic font-light shimmer-text">graduation.</span>
              </h1>

              <p className="mt-8 text-lg lg:text-xl text-brand-100/90 max-w-2xl leading-relaxed font-light">
                Refine your research instruments, pinpoint the right statistical tests, master SPSS one module at a time, and book expert consultations — purpose-built for Masters and PhD researchers.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link to="/register" className="btn-gold text-base px-7 py-4">
                  Get Started <IconArrow className="w-4 h-4"/>
                </Link>
                <a href="#features" className="btn glass text-white hover:bg-white/15 text-base px-7 py-4">
                  Learn More
                </a>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-brand-100/70">
                <span className="flex items-center gap-2"><IconCheck className="w-4 h-4 text-gold"/> Pay only for what you need</span>
                <span className="flex items-center gap-2"><IconCheck className="w-4 h-4 text-gold"/> M-Pesa supported</span>
                <span className="flex items-center gap-2"><IconCheck className="w-4 h-4 text-gold"/> Methodology-first</span>
              </div>
            </div>

            <div className="lg:col-span-5 reveal" style={{ animationDelay: '0.2s' }}>
              <div className="relative max-w-md mx-auto animate-float">
                <HeroMark />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom seam */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-parchment/40 pointer-events-none" />
      </section>

      {/* Free Resources */}
      <section className="py-16 lg:py-20 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="eyebrow">— Free resources</span>
            <h2 className="display text-3xl lg:text-4xl text-brand mt-3">
              Everything you need to <span className="italic font-light">get started.</span>
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">Free tools to help you learn SPSS, choose the right test, and practice with real Kenyan data — no payment required.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <a href="/pathway" className="group bg-white/70 backdrop-blur rounded-xl border border-slate-200 p-6 hover:border-gold transition block">
              <span className="text-3xl">🗺️</span>
              <h3 className="display text-lg text-brand mt-3 group-hover:text-gold-700 transition">Learning Pathway</h3>
              <p className="text-sm text-slate-600 mt-2">3-track roadmap: Beginner → Intermediate → Advanced. Know exactly which lesson to do next.</p>
            </a>
            <a href="/glossary" className="group bg-white/70 backdrop-blur rounded-xl border border-slate-200 p-6 hover:border-gold transition block">
              <span className="text-3xl">📖</span>
              <h3 className="display text-lg text-brand mt-3 group-hover:text-gold-700 transition">Glossary</h3>
              <p className="text-sm text-slate-600 mt-2">Every statistical term explained like you're 15. Searchable, filterable, bookmarkable.</p>
            </a>
            <a href="/datasets" className="group bg-white/70 backdrop-blur rounded-xl border border-slate-200 p-6 hover:border-gold transition block">
              <span className="text-3xl">📊</span>
              <h3 className="display text-lg text-brand mt-3 group-hover:text-gold-700 transition">Practice Datasets</h3>
              <p className="text-sm text-slate-600 mt-2">5 free Kenyan datasets ready for SPSS. Download, open, and practice with real data.</p>
            </a>
            <a href="/cheatsheet" className="group bg-white/70 backdrop-blur rounded-xl border border-slate-200 p-6 hover:border-gold transition block">
              <span className="text-3xl">📋</span>
              <h3 className="display text-lg text-brand mt-3 group-hover:text-gold-700 transition">Cheat Sheet</h3>
              <p className="text-sm text-slate-600 mt-2">One-page flowchart: which test, which template, which benchmarks. Print or save as PDF.</p>
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────  FEATURES  ───────────────────────── */}
      <section id="features" className="relative py-24 lg:py-32 bg-parchment">
        <div className="absolute inset-0 bg-grid-light opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow">— What we offer</span>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-brand mt-4">
              Five focused services. <span className="italic font-light">One trusted partner.</span>
            </h2>
          </div>

          <div className="mt-16 grid lg:grid-cols-2 gap-6 lg:gap-8">
            {features.map(({ icon: Icon, no, title, desc }, i) => (
              <article key={title}
                className="group relative bg-white rounded-3xl p-8 lg:p-10 shadow-card hover:shadow-elevated transition-all duration-500 border border-slate-100 hover:border-gold/30 overflow-hidden reveal"
                style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="absolute -top-6 -right-6 font-display font-bold text-[140px] text-brand/5 leading-none group-hover:text-gold/10 transition-colors">
                  {no}
                </div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-brand text-gold flex items-center justify-center group-hover:rotate-6 transition-transform">
                    <Icon className="w-7 h-7"/>
                  </div>
                  <h3 className="display text-2xl lg:text-3xl text-brand mt-6">{title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">{desc}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-600 group-hover:text-brand transition-colors">
                    Explore <IconArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────  HOW IT WORKS  ───────────────────────── */}
      <section className="relative py-24 lg:py-32 bg-brand text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-40" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow text-gold-300">— Your roadmap</span>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl mt-4">
              A clear path to <span className="italic font-light">graduation.</span>
            </h2>
          </div>

          <div className="mt-20 relative">
            {/* connecting line */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {steps.map((s, i) => (
                <div key={s.n} className="relative group">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-gold/10 group-hover:bg-gold/20 transition" />
                    <div className="absolute inset-2 rounded-full border-2 border-gold/40" />
                    <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-2xl text-gold">
                      {s.n}
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="font-display text-xl font-bold">{s.t}</h3>
                    <p className="mt-2 text-sm text-brand-100/80 leading-relaxed">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────  ABOUT / FOUNDER  ───────────────────────── */}
      <section id="about" className="py-24 lg:py-32 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="eyebrow">— About</span>
              <h2 className="display text-4xl sm:text-5xl text-brand mt-4">
                Built by a researcher,<br/>for researchers.
              </h2>
              <div className="gold-rule mt-6"/>
              <div className="mt-8 space-y-5 text-slate-700 leading-relaxed">
                <p className="text-lg">
                  The Postgraduate Data Hub, Kenya exists because the journey from a research idea to a defended thesis is rarely linear — and almost never well-supported.
                </p>
                <p>
                  We're a small, hands-on team of Kenyan researchers and data analysts who walk alongside Masters and PhD candidates through the moments where most projects stall: building a defensible instrument, choosing the right test, interpreting outputs, and writing up findings that hold up to scrutiny.
                </p>
                <p>
                  Every service on this platform exists because a real student asked for it.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  { t: 'Methodology-first', d: 'Every recommendation is grounded in research best practice.' },
                  { t: 'Pay per service', d: 'Buy only what your project needs — no bundled fluff.' },
                  { t: 'Kenya-focused', d: 'Tuned to local exam panels, supervisors and institutions.' },
                ].map((v) => (
                  <div key={v.t}>
                    <p className="font-display font-bold text-brand text-base">{v.t}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{v.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative">
                {/* Editorial founder block */}
                <div className="relative bg-ink text-white rounded-3xl p-10 lg:p-14 overflow-hidden">
                  <div className="absolute inset-0 bg-grid-dark opacity-50" />
                  <div className="absolute -top-20 -right-20 w-72 h-72 bg-gold/15 rounded-full blur-3xl" />
                  <div className="relative">
                    <svg className="w-12 h-12 text-gold/70" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 7H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3a4 4 0 0 1-4 4v2c4.4 0 8-3.6 8-8V9a2 2 0 0 0-2-2zm12 0h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3a4 4 0 0 1-4 4v2c4.4 0 8-3.6 8-8V9a2 2 0 0 0-2-2z"/>
                    </svg>
                    <p className="display text-2xl lg:text-3xl mt-6 leading-snug">
                      We believe a research degree should be defined by the <span className="italic text-gold">discovery</span>, not by the friction of getting through it.
                    </p>
                    <div className="mt-10 flex items-center gap-4 pt-6 border-t border-white/10">
                      <div className="w-12 h-12 rounded-full bg-gold text-brand font-bold flex items-center justify-center">PG</div>
                      <div>
                        <p className="font-semibold">The Postgraduate Data Hub team</p>
                        <p className="text-xs text-brand-100/70">Nairobi, Kenya</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating accent card */}
                <div className="hidden md:block absolute -bottom-8 -left-8 bg-white rounded-2xl p-5 shadow-elevated border border-slate-100 max-w-[240px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/15 text-gold-600 flex items-center justify-center">
                      <IconShield className="w-5 h-5"/>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand uppercase tracking-wider">Confidential</p>
                      <p className="text-xs text-slate-500">Your research stays yours.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────  CTA  ───────────────────────── */}

      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-brand-700 via-brand to-brand-600 text-white p-10 lg:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-grid-dark opacity-40" />
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-gold/25 rounded-full blur-3xl animate-glow"/>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl"/>

            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="eyebrow text-gold-300">— Start today</span>
                <h3 className="display text-3xl lg:text-5xl mt-4">
                  Take the next step in your research.
                </h3>
                <p className="mt-4 text-brand-100/80 text-lg">
                  Create your free account and explore the workspace built for Kenya's postgraduate community.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link to="/register" className="btn-gold px-7 py-4 text-base">Create free account</Link>
                <Link to="/pricing" className="btn glass text-white hover:bg-white/15 px-7 py-4 text-base">
                  See services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────  CONTACT  ───────────────────────── */}
      <section id="contact" className="py-20 lg:py-24 bg-parchment">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">— Contact us</span>
            <h2 className="display text-4xl sm:text-5xl text-brand mt-4">
              Have a question? Talk to us directly.
            </h2>
            <div className="gold-rule mx-auto mt-6"/>
            <p className="mt-6 text-slate-600 leading-relaxed">
              We respond to enquiries within a few hours during business days.
              WhatsApp is fastest for urgent thesis deadlines.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Email card */}
            <a href="mailto:postgraduatedatahub@gmail.com"
               className="group card-elevated p-7 hover:border-gold/40 hover:-translate-y-1 transition-all text-left">
              <div className="w-12 h-12 rounded-2xl bg-brand text-gold flex items-center justify-center group-hover:rotate-6 transition-transform">
                <IconMail className="w-6 h-6"/>
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">Email us</p>
              <p className="mt-2 font-display font-bold text-brand text-lg break-all">
                postgraduatedatahub@gmail.com
              </p>
              <p className="mt-2 text-sm text-slate-500">Best for enquiries, quotes and paperwork.</p>
            </a>

            {/* WhatsApp card */}
            <a href="https://wa.me/254779568272?text=Hello%20Postgraduate%20Data%20Hub%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services."
               target="_blank" rel="noopener noreferrer"
               className="group card-elevated p-7 hover:border-gold/40 hover:-translate-y-1 transition-all text-left">
              <div className="w-12 h-12 rounded-2xl bg-brand text-gold flex items-center justify-center group-hover:rotate-6 transition-transform">
                <IconWhatsApp className="w-6 h-6"/>
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">WhatsApp us</p>
              <p className="mt-2 font-display font-bold text-brand text-lg">
                +254 779 568 272
              </p>
              <p className="mt-2 text-sm text-slate-500">Fastest response · Mon-Sat 8am-8pm EAT.</p>
            </a>

            {/* Location card */}
            <div className="card-elevated p-7">
              <div className="w-12 h-12 rounded-2xl bg-brand text-gold flex items-center justify-center">
                <IconLocation className="w-6 h-6"/>
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">Based in</p>
              <p className="mt-2 font-display font-bold text-brand text-lg">
                Nairobi, Kenya
              </p>
              <p className="mt-2 text-sm text-slate-500">Serving postgraduate researchers across Kenya, remotely.</p>
            </div>
          </div>

          {/* M-Pesa info strip */}
          <div className="mt-10 rounded-2xl border border-gold/30 bg-gold/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gold-700">M-Pesa payments</p>
              <p className="text-sm text-slate-700 mt-1">
                <strong>Paybill 4096483</strong> · Account <strong>7028M</strong> · The Postgraduate Data Hub Kenya
              </p>
              <p className="text-xs text-slate-500 mt-1 italic">
                Your M-Pesa SMS confirmation will show <strong>ETICA CAPITAL LTD</strong> — that's the legal entity operating this platform.
              </p>
            </div>
            <a href="https://wa.me/254779568272?text=I%27m%20having%20trouble%20with%20a%20payment."
               target="_blank" rel="noopener noreferrer"
               className="btn-outline text-sm">
              Payment issue? WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
