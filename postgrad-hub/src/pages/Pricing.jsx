import { Link } from 'react-router-dom';
import PublicNav from '../components/PublicNav.jsx';
import Footer from '../components/Footer.jsx';
import {
  IconForm, IconChart, IconBook, IconCalendar, IconArrow, IconShield, IconCheck, IconSpark,
} from '../components/Icons.jsx';

const services = [
  {
    icon: IconForm,
    title: 'Data Collection Tools (Questionnaires & Interviews)',
    summary: 'Submit your draft questionnaire or interview guide and receive a refined, methodologically sound version — plus a digital data-collection link ready to share with respondents.',
    includes: [
      'Review against your research objectives & questions',
      'Re-wording for clarity, validity and bias removal',
      'Demographic, Likert and open-ended structuring',
      'Digital survey link — no printing, no manual data entry',
    ],
  },
  {
    icon: IconChart,
    title: 'Statistical Test Selector',
    summary: 'Answer a few questions and unlock a precise test recommendation with assumptions, SPSS steps and interpretation guidance. Each test purchased individually.',
    includes: [
      'Guided 4-question decision engine',
      'Unlock individual tests as you need them',
      'Full assumptions & SPSS click-paths',
      'Plain-language interpretation guides',
    ],
  },
  {
    icon: IconBook,
    title: 'SPSS Academy',
    summary: 'Modular lessons across every common SPSS technique. Detailed Notes packs are available now — purchased per lesson. Recorded video walkthroughs are coming soon.',
    includes: [
      'Detailed Notes pack per lesson — currently available',
      'Annotated screenshots & real-data worked examples',
      'Topic-specific guidebook excerpts & curated links',
      'Knowledge-check quizzes + completion certificate',
      'Video walkthroughs — coming soon',
    ],
  },
  {
    icon: IconSpark,
    title: 'Done-for-You Analysis & Interpretation',
    summary: 'Outsource the heavy lifting to our well-knowledgeable PhD researchers. Three tiers, each priced separately so you only pay for what you actually need.',
    includes: [
      'Tables Only — pure SPSS output, no narrative',
      'Interpretation Only — citation-rich narrative from your tables',
      'Analysis + Interpretation — end-to-end findings chapter',
      'Handled by experienced PhD researchers',
      'Clean Excel dataset required (no missing data)',
    ],
  },
  {
    icon: IconCalendar,
    title: 'Expert Consultations',
    summary: 'Book one-on-one sessions for thesis review, data analysis, interpretation or methodology guidance. Session length tailored to each learner\'s needs.',
    includes: [
      'Thesis & manuscript review',
      'Data analysis support',
      'Interpretation & write-up',
      'Methodology guidance',
    ],
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col bg-parchment">
      <PublicNav />

      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid-light opacity-60" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow">— Services</span>
          <h1 className="display text-5xl sm:text-6xl lg:text-7xl text-brand mt-5">
            Pay only for what <span className="italic font-light">you need.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            No bundled plans, no monthly fluff. Each service is purchased individually so your spending matches your project's actual needs. Pay easily via <strong>M-Pesa Paybill</strong>.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold-700 text-sm font-semibold">
            <IconShield className="w-4 h-4"/> Transparent pricing on request
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map(({ icon: Icon, title, summary, includes }, i) => (
            <article key={title}
              className="group relative bg-white rounded-3xl p-8 lg:p-10 shadow-card hover:shadow-elevated transition-all duration-500 border border-slate-100 hover:border-gold/30 reveal"
              style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="flex items-start justify-between gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand text-gold flex items-center justify-center group-hover:rotate-6 transition-transform">
                  <Icon className="w-7 h-7"/>
                </div>
                <span className="badge-gold">Price on request</span>
              </div>
              <h3 className="display text-2xl lg:text-3xl text-brand mt-6">{title}</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">{summary}</p>

              <ul className="mt-6 space-y-2.5">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <IconCheck className="w-4 h-4 text-gold mt-0.5 shrink-0"/>{item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <Link to="/register" className="btn-primary">
                  Get started <IconArrow className="w-4 h-4"/>
                </Link>
                <a href="mailto:postgraduatedatahub@gmail.com" className="text-sm font-semibold text-brand hover:text-gold-600">
                  Enquire →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="max-w-3xl mx-auto px-4 mt-16 text-center">
          <h3 className="display text-2xl text-brand">Not sure what you need?</h3>
          <p className="mt-2 text-slate-600">
            Tell us about your project and we'll point you to the right service.
          </p>
          <a href="mailto:postgraduatedatahub@gmail.com?subject=Project enquiry"
             className="btn-gold mt-6 inline-flex">
            Get a recommendation <IconArrow className="w-4 h-4"/>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
