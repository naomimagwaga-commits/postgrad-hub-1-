import Logo from './Logo.jsx';
import { Link } from 'react-router-dom';
import { IconMail, IconPhone, IconWhatsApp, IconLocation } from './Icons.jsx';

export default function Footer() {
  return (
    <footer className="relative bg-ink text-brand-100 overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-gold to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-16">
          <div className="md:col-span-5">
            <Logo variant="light" size="lg" />
            <p className="mt-6 text-base text-brand-100/80 leading-relaxed max-w-md">
              The trusted research workspace for Kenya's Masters, PhD candidates, lecturers and independent researchers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="btn-gold text-sm">Start free</Link>
              <Link to="/pricing" className="btn glass text-white hover:bg-white/15 text-sm">See services</Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-5">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/app/questionnaire" className="hover:text-gold transition">Data Collection Tools</Link></li>
              <li><Link to="/app/tests" className="hover:text-gold transition">Test Selector</Link></li>
              <li><Link to="/app/spss" className="hover:text-gold transition">SPSS Academy</Link></li>
              <li><Link to="/app/analysis" className="hover:text-gold transition">Analysis &amp; Interpretation</Link></li>
              <li><Link to="/app/consultations" className="hover:text-gold transition">Consultations</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/#about" className="hover:text-gold transition">About</a></li>
              <li><Link to="/pricing" className="hover:text-gold transition">Pricing</Link></li>
              <li><Link to="/faq" className="hover:text-gold transition">FAQ</Link></li>
              <li><Link to="/glossary" className="hover:text-gold transition">Glossary</Link></li>
              <li><Link to="/pathway" className="hover:text-gold transition">Pathway</Link></li>
              <li><Link to="/datasets" className="hover:text-gold transition">Datasets</Link></li>
              <li><Link to="/cheatsheet" className="hover:text-gold transition">Cheat Sheet</Link></li>
              <li><Link to="/privacy" className="hover:text-gold transition">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-gold transition">Terms</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-5">Get in touch</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:postgraduatedatahub@gmail.com"
                   className="flex items-center gap-2.5 hover:text-gold transition">
                  <IconMail className="w-4 h-4 text-gold/70"/>
                  postgraduatedatahub@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/254779568272"
                   target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2.5 hover:text-gold transition">
                  <IconWhatsApp className="w-4 h-4 text-gold/70"/>
                  WhatsApp +254 779 568 272
                </a>
              </li>
              <li>
                <a href="tel:+254779568272"
                   className="flex items-center gap-2.5 hover:text-gold transition">
                  <IconPhone className="w-4 h-4 text-gold/70"/>
                  +254 779 568 272
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-brand-100/70 pt-1">
                <IconLocation className="w-4 h-4 text-gold/70"/>
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-brand-100/60">
          <p>© {new Date().getFullYear()} The Postgraduate Data Hub, Kenya. All rights reserved.</p>
          <p>Built for Kenya's postgraduate research community.</p>
        </div>
      </div>
    </footer>
  );
}
