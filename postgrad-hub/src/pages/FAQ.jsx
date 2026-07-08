import PublicNav from '../components/PublicNav.jsx';
import Footer from '../components/Footer.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';

const categories = [
  {
    heading: 'General',
    items: [
      {
        q: 'What is The Postgraduate Data Hub?',
        a: 'We are a Kenya-based research-support platform built specifically for postgraduate students — Masters, PhD, MPhil, and EdD candidates. We offer four core services: questionnaire refinement, a Statistical Test Selector, a 39-lesson SPSS Academy, and done-for-you analysis & interpretation. Everything is priced per service, so you only pay for what your project actually needs.'
      },
      {
        q: 'Who is this platform for?',
        a: 'Any postgraduate researcher in Kenya — or studying at a Kenyan institution remotely. Whether you are in Nairobi, Mombasa, Eldoret, or studying abroad, the platform works for you. Our content is tuned to the expectations of Kenyan exam panels, supervisors, and institutional guidelines.'
      },
      {
        q: 'Do I need to be in Nairobi to use your services?',
        a: 'Not at all. Everything is delivered online. We work with students from universities across Kenya — UoN, KU, JKUAT, Maseno, Egerton, Moi, Strathmore, Daystar, and many more. Consultations happen over Zoom or WhatsApp call, and analysis outputs are delivered digitally.'
      },
      {
        q: 'Is this only for Master\'s students?',
        a: 'No. Our services support all postgraduate levels — Masters, PhD, MPhil, and EdD. The SPSS lessons, for example, cover everything from basic descriptives (useful for coursework) right through to MANOVA and multinomial logistic regression (common in doctoral research).'
      }
    ]
  },
  {
    heading: 'SPSS Academy (Lessons)',
    items: [
      {
        q: 'Do I need to install SPSS to follow the lessons?',
        a: 'Yes — you will need access to IBM SPSS Statistics on your computer. The lessons work with any recent version (SPSS 20 and above is ideal). If your university provides a licensed copy, that works perfectly. The lessons show every click path in detail so you can follow along on your own machine.'
      },
      {
        q: 'What version of SPSS do the lessons use?',
        a: 'The screenshots and menus are based on SPSS version 25+, but the procedures work identically in any version from SPSS 20 upwards. If you are using an older or newer version, the menus and dialog boxes will look essentially the same.'
      },
      {
        q: 'How long do I have access to a lesson after purchasing?',
        a: 'Every lesson unlock gives you full access for one (1) year from the date your payment is approved. You can revisit the material as many times as you like within that period.'
      },
      {
        q: 'Are the lessons downloadable for offline study?',
        a: 'Currently the lessons are viewable within the platform. We are working on a PDF export feature so you can download notes for offline reading — this will be available soon.'
      },
      {
        q: 'Is there a free lesson I can try before paying?',
        a: 'Yes — the Master Decision Tree (a guided flowchart that helps you choose the right statistical test for your research design) unlocks free once you have purchased any 2 lessons. Additionally, Data Cleaning Basics drops to KES 250 once you own 3+ paid lessons.'
      },
      {
        q: 'Can I buy all lessons at once for a discount?',
        a: 'We don\'t currently offer a full-course bundle. The per-lesson pricing model keeps costs low — most notes packs cost less than a lunch. You buy only what your current project needs, when it needs it.'
      }
    ]
  },
  {
    heading: 'Payments',
    items: [
      {
        q: 'How do I pay?',
        a: 'All payments are via M-Pesa. Go to M-Pesa on your phone, select Lipa na M-Pesa → Paybill, enter Paybill number 4096483, Account number 7028M, enter the amount, and confirm with your PIN. You will receive an M-Pesa confirmation SMS.'
      },
      {
        q: 'Why does the M-Pesa SMS say "ETICA CAPITAL LTD"?',
        a: 'Etica Capital Ltd is the registered legal entity that operates The Postgraduate Data Hub, Kenya. The M-Pesa Paybill is registered under this company name, so all payment confirmations will show "ETICA CAPITAL LTD" — this is normal and expected. Your payment is going to the right place.'
      },
      {
        q: 'How long does it take for my payment to be verified?',
        a: 'We manually verify M-Pesa payments during business hours (Monday to Saturday, 8am–8pm EAT). Verification typically takes a few hours. Once verified, your lesson unlock or service is activated immediately.'
      },
      {
        q: 'What if my payment is not reflected after 24 hours?',
        a: 'WhatsApp us on +254 779 568 272 with your M-Pesa confirmation code (the 10-letter code in your SMS) and we will trace the payment immediately. Delays are rare but can happen during peak periods.'
      },
      {
        q: 'Do you accept bank transfer or card payments?',
        a: 'Currently we accept M-Pesa only. This keeps our costs low and is the most convenient method for Kenyan postgraduate students. If you have a specific need for an alternative payment method, please WhatsApp us to discuss.'
      },
      {
        q: 'Do you offer refunds?',
        a: 'Once a lesson is unlocked or a service has been delivered, refunds are not available. However, if you experience a technical issue or receive a service that does not match what was described, please contact us within 48 hours and we will work to resolve it.'
      }
    ]
  },
  {
    heading: 'Analysis Services',
    items: [
      {
        q: 'How long does analysis take?',
        a: 'Timelines depend on the service you order:\n• Questionnaire refinement: 3 days max\n• Analysis tables only: 3 weeks max\n• Analysis interpretation only (Chapter 4): 3 weeks max\n• Full analysis (Chapter 4 + Chapter 5): 6 weeks max\n• Consultation: same week\n\nThese are maximum timelines — we often deliver sooner.'
      },
      {
        q: 'What do I need to send for analysis?',
        a: 'You will need to provide: (1) your cleaned dataset (Excel or SPSS .sav file), (2) your research objectives or questions, (3) your conceptual/framework diagram if applicable, and (4) any specific instructions from your supervisor. The exact requirements are outlined in the order form after you register.'
      },
      {
        q: 'Who does the analysis?',
        a: 'All analyses are conducted by our team of PhD-level researchers with extensive experience in quantitative methods and SPSS. Every output is reviewed for accuracy before delivery.'
      },
      {
        q: 'Can I see a sample of your analysis work?',
        a: 'Yes — once you register, you can view sample outputs and formatting examples within the platform. You can also WhatsApp us for a brief sample tailored to your type of study.'
      },
      {
        q: 'What is the "loyalty rate" for full analysis?',
        a: 'If you collected your data through our questionnaire-refinement or online-survey service, your full analysis (Chapter 4 + 5) drops from KES 35,000 to KES 30,000. This is our way of rewarding students who work with us from the start of their project.'
      }
    ]
  },
  {
    heading: 'Statistical Test Selector',
    items: [
      {
        q: 'How does the Test Selector work?',
        a: 'You answer a series of simple questions about your research design — your variables, your objectives, your sample type — and the engine recommends the most appropriate statistical test(s). For each recommended test, you can unlock detailed guidance including assumptions, SPSS click-paths, interpretation tips, and APA write-up examples.'
      },
      {
        q: 'How much does it cost to unlock a test?',
        a: 'Each recommended test unlocks individually for KES 350 via M-Pesa. You only pay for the tests your project actually needs — not a bundled package.'
      },
      {
        q: 'Is the Test Selector different from the SPSS Academy lessons?',
        a: 'Yes, they complement each other. The Test Selector helps you figure out WHICH test to run based on your research questions. The SPSS Academy lessons then teach you HOW to run that test step by step, with full worked examples using real Kenyan data.'
      }
    ]
  },
  {
    heading: 'Questionnaire & Data Collection',
    items: [
      {
        q: 'How long does questionnaire refinement take?',
        a: 'A maximum of 3 business days from the time we receive your draft. You will receive back a refined, methodologically sound version plus a digital data-collection link you can use to gather responses online.'
      },
      {
        q: 'What if my supervisor does not approve the refined questionnaire?',
        a: 'We include one round of revisions based on supervisor feedback at no extra cost. Our goal is to deliver something your entire committee is satisfied with.'
      },
      {
        q: 'What is a "digital data-collection link"?',
        a: 'Instead of printing and distributing paper questionnaires, we convert your refined instrument into a digital data collection tool that respondents can fill in on their phones or computers. Responses are automatically captured in a structured dataset — no manual data entry needed. This saves you weeks of work.'
      },
      {
        q: 'How many respondent groups can the questionnaire support?',
        a: 'Our standard questionnaire-refinement service covers up to 4 respondent groups (e.g., teachers, students, principals, parents) at no additional cost. If you have more complex multi-group designs, please reach out for a custom quote.'
      }
    ]
  },
  {
    heading: 'Consultations',
    items: [
      {
        q: 'How do consultations work?',
        a: 'Consultations are one-on-one sessions with a research specialist. They can cover thesis review, data analysis guidance, methodology clarification, interpretation support, or any other research challenge. Sessions are conducted via Zoom or WhatsApp call at a time that suits you.'
      },
      {
        q: 'How much does a consultation cost?',
        a: 'Consultation pricing depends on the scope and duration of your project. Please email us at postgraduatedatahub@gmail.com or WhatsApp +254 779 568 272 with a brief description of what you need, and we will provide a quote.'
      },
      {
        q: 'How quickly can I get a consultation booked?',
        a: 'Consultations are typically available within the same week. Urgent requests (e.g., pre-submission review) are accommodated where possible — just let us know your timeline.'
      }
    ]
  }
];

function AccordionItem({ q, a, open, onClick }) {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-brand group-hover:text-gold-700 transition pr-4">{q}</span>
        <span className={`shrink-0 mt-1 text-gold-700 text-xl transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[1000px] opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-600 leading-relaxed whitespace-pre-line">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  usePageTitle('FAQ');

  return (
    <div className="min-h-screen bg-parchment">
      <PublicNav />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 lg:pt-24 lg:pb-12">
        <span className="eyebrow">— Frequently asked questions</span>
        <h1 className="display text-4xl lg:text-5xl text-brand mt-3">
          Got questions? <span className="italic font-light">We have answers.</span>
        </h1>
        <div className="gold-rule mt-6"/>
        <p className="mt-6 text-slate-600 max-w-2xl leading-relaxed">
          Everything you need to know about our services, payments, timelines, and how the platform works.
          Can't find what you're looking for? <a href="https://wa.me/254779568272?text=Hello%2C%20I%20have%20a%20question%20not%20covered%20in%20the%20FAQ." target="_blank" rel="noopener noreferrer" className="text-gold-700 font-semibold hover:underline">WhatsApp us</a> — we reply within hours.
        </p>
      </section>

      {/* FAQ sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 space-y-12">
        {categories.map((cat) => (
          <div key={cat.heading}>
            <h2 className="display text-2xl text-brand mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-gold/20 text-gold-700 flex items-center justify-center text-sm font-bold">
                {cat.heading[0]}
              </span>
              {cat.heading}
            </h2>
            <div className="bg-white/70 backdrop-blur rounded-xl border border-slate-200 px-5 sm:px-6 divide-y-0">
              {cat.items.map((item, idx) => (
                <FaqItem key={idx} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 text-center">
        <div className="bg-white/70 backdrop-blur rounded-xl border border-slate-200 p-8 sm:p-10">
          <h2 className="display text-2xl text-brand">Still have questions?</h2>
          <p className="mt-3 text-slate-600 max-w-lg mx-auto">
            We respond to enquiries within a few hours during business days. WhatsApp is fastest for urgent thesis deadlines.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/254779568272?text=Hello%20Postgraduate%20Data%20Hub%2C%20I%20have%20a%20question."
               target="_blank" rel="noopener noreferrer"
               className="btn-gold text-sm">
              WhatsApp us
            </a>
            <a href="mailto:postgraduatedatahub@gmail.com?subject=FAQ%20enquiry"
               className="btn glass text-brand hover:bg-white/30 text-sm">
              Email us
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Paybill <strong>4096483</strong> · Account <strong>7028M</strong> · M-Pesa confirmations show <strong>ETICA CAPITAL LTD</strong>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* Individual accordion item with local toggle state */
function FaqItem({ q, a }) {
  const [open, setOpen] = useOpenState();
  return <AccordionItem q={q} a={a} open={open} onClick={() => setOpen(!open)} />;
}

/* Tiny hook so each item manages its own toggle */
import { useState } from 'react';
function useOpenState() {
  return useState(false);
}
