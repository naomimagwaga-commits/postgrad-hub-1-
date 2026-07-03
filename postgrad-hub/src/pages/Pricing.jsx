import { Link } from 'react-router-dom';
import PublicNav from '../components/PublicNav.jsx';
import Footer from '../components/Footer.jsx';
import { IconArrow, IconCheck, IconSpark } from '../components/Icons.jsx';
import { PUBLIC_PRICING, formatKES } from '../data/prices.js';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-parchment">
      <PublicNav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-8 text-center">
        <span className="eyebrow">— Pricing</span>
        <h1 className="display text-4xl sm:text-5xl lg:text-6xl text-brand mt-4">
          Fair, transparent, pay-per-service.
        </h1>
        <div className="gold-rule mx-auto mt-6"/>
        <p className="mt-6 text-slate-600 max-w-2xl mx-auto leading-relaxed">
          No subscriptions, no monthly locks. Pay only for what your project actually needs — most notes packs cost less than a lunch, and services are priced for postgraduate budgets in Kenya.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full font-semibold">
            🗓️ 1 year access on all lesson unlocks
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gold/10 text-gold-700 rounded-full font-semibold">
            💰 M-Pesa Paybill 4096483 · Account 7028M
          </span>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="display text-2xl text-brand mb-6">Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PUBLIC_PRICING.services.map((s) => (
            <article key={s.id} className="card-elevated p-7 hover:border-gold/40 hover:-translate-y-1 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-bold text-brand text-lg leading-tight">{s.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{s.unit}</p>
                </div>
              </div>
              {s.price != null ? (
                <p className="display text-3xl text-brand mt-5">{formatKES(s.price)}</p>
              ) : (
                <p className="display text-xl text-slate-500 mt-5 italic">Price on request</p>
              )}
              <p className="text-sm text-slate-600 mt-3 leading-relaxed min-h-[3rem]">{s.blurb}</p>
              {s.note && (
                <p className="text-xs text-emerald-700 mt-3 font-semibold bg-emerald-50 border border-emerald-100 rounded-lg p-2">
                  🎉 {s.note}
                </p>
              )}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                {s.price != null ? (
                  <Link to="/register" className="btn-primary text-sm">
                    Get started <IconArrow className="w-4 h-4"/>
                  </Link>
                ) : (
                  <a href={`mailto:postgraduatedatahub@gmail.com?subject=${encodeURIComponent('Quote request — ' + s.name)}`}
                     className="btn-gold text-sm">
                    Request a quote <IconArrow className="w-4 h-4"/>
                  </a>
                )}
                <a href={`https://wa.me/254779568272?text=${encodeURIComponent('Hi, I would like to know more about: ' + s.name)}`}
                   target="_blank" rel="noopener"
                   className="text-sm font-semibold text-brand hover:text-gold-600">
                  WhatsApp →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Statistical Test Selector */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card-elevated p-8 lg:p-10 bg-gradient-to-br from-brand/5 to-gold/5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="eyebrow">— Statistical Test Selector</span>
              <h2 className="display text-2xl lg:text-3xl text-brand mt-3">
                {formatKES(PUBLIC_PRICING.testSelector.perTest)} per test unlock
              </h2>
              <p className="mt-3 text-slate-600 max-w-xl leading-relaxed">
                {PUBLIC_PRICING.testSelector.blurb}
              </p>
            </div>
            <Link to="/register" className="btn-gold shrink-0">
              Try the selector <IconArrow className="w-4 h-4"/>
            </Link>
          </div>
        </div>
      </section>

      {/* SPSS Academy lesson prices */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="display text-2xl text-brand mb-2">SPSS Academy — lesson prices</h2>
        <p className="text-sm text-slate-500 mb-6">
          Notes packs unlock via M-Pesa. Each unlock gives you <strong>1 full year of access</strong> from the day admin approves your payment. Some lessons are grouped by course; some come with loyalty discounts.
        </p>
        <div className="card-elevated overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-brand text-white text-left">
                <tr>
                  <th className="p-4 font-semibold uppercase text-xs tracking-wider">Course</th>
                  <th className="p-4 font-semibold uppercase text-xs tracking-wider">Lessons</th>
                  <th className="p-4 font-semibold uppercase text-xs tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody>
                {PUBLIC_PRICING.lessons.map((row, i) => (
                  <tr key={row.course} className={i % 2 === 0 ? 'bg-parchment/50' : 'bg-white'}>
                    <td className="p-4 font-display font-bold text-brand">{row.course}</td>
                    <td className="p-4 text-slate-500">{row.lessons}</td>
                    <td className="p-4 font-semibold text-brand">{row.priceLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500 italic">
          Notes on discounted pricing: <strong>Master Decision Tree</strong> unlocks free once you've paid for 2 lessons.
          <strong> Data Cleaning Basics</strong> is KES 500, but drops to KES 250 once you own 3 or more paid lessons.
          <strong> Writing Up</strong> is sold as a package — both lessons together for KES 1,500.
        </p>
      </section>

      {/* Not sure CTA */}
      <section className="max-w-3xl mx-auto px-4 mt-8 mb-16 text-center">
        <h3 className="display text-2xl text-brand">Not sure what you need?</h3>
        <p className="mt-2 text-slate-600">
          Tell us about your project — we'll point you to the right service.
        </p>
        <a href="mailto:postgraduatedatahub@gmail.com?subject=Project enquiry"
           className="btn-gold mt-6 inline-flex">
          Get a recommendation <IconArrow className="w-4 h-4"/>
        </a>
        <p className="mt-4 text-xs text-slate-400">
          Or WhatsApp us on <a href="https://wa.me/254779568272" className="text-gold-700 font-semibold hover:underline">+254 779 568 272</a>
        </p>
      </section>

      <Footer />
    </div>
  );
}
