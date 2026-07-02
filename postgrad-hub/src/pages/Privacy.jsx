import PublicNav from '../components/PublicNav.jsx';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-parchment">
      <PublicNav />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <span className="eyebrow">— Legal</span>
        <h1 className="display text-4xl lg:text-5xl text-brand mt-3">Privacy Policy</h1>
        <div className="gold-rule mt-6"/>
        <p className="mt-6 text-sm text-slate-500">
          Last updated: 2 July 2026 · Compliant with the Data Protection Act, 2019 (Kenya)
        </p>

        <div className="prose prose-slate mt-10 max-w-none space-y-8 text-slate-700 leading-relaxed">

          <div>
            <h2 className="display text-2xl text-brand mb-3">1. Who we are (the Data Controller)</h2>
            <p>
              The Postgraduate Data Hub, Kenya (the "Platform") is a research-support service based in Nairobi, Kenya.
              For the purposes of the <strong>Data Protection Act, 2019</strong> of Kenya, we are the Data Controller
              of information collected via <code className="text-sm bg-slate-100 px-1.5 py-0.5 rounded">postgraduatedatahub.vercel.app</code> and its
              linked domains. You can contact us at <a href="mailto:postgraduatedatahub@gmail.com" className="text-gold-700 font-semibold hover:underline">postgraduatedatahub@gmail.com</a> or WhatsApp
              +254 779 568 272 for any privacy-related enquiry.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">2. What personal data we collect</h2>
            <p>To provide our services, we collect the following categories of personal data:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Account information:</strong> full name, personal email address, phone number, institution (optional), course of study (optional), year of study (optional).</li>
              <li><strong>Payment records:</strong> M-Pesa reference number, amount paid, timestamp, item/service purchased. We do NOT store your M-Pesa PIN or full mobile-money credentials.</li>
              <li><strong>Service submissions:</strong> questionnaires, research objectives, datasets (Excel/SPSS files) you upload for our Analysis service, and any notes you attach to consultations or bookings.</li>
              <li><strong>Learning activity:</strong> which lessons you unlock, which quizzes you complete, which pages you visit, timestamp of activity.</li>
              <li><strong>Technical data:</strong> browser type, device type, IP address (used solely for security and abuse prevention), and standard web-log data.</li>
            </ul>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">3. How we use your personal data</h2>
            <p>We use your data ONLY for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>To create and manage your account and authenticate your login</li>
              <li>To deliver the services you have purchased (refined instruments, unlocked lessons, analysis outputs, etc.)</li>
              <li>To verify M-Pesa payments and activate corresponding services</li>
              <li>To communicate about your submissions, orders and account (e.g. "your analysis is ready")</li>
              <li>To improve the Platform (aggregated, anonymised usage patterns only)</li>
              <li>To meet legal, tax, and regulatory obligations</li>
            </ul>
            <p className="mt-3">
              We do <strong>NOT</strong> use your data for third-party advertising, we do <strong>NOT</strong> sell it,
              and we do <strong>NOT</strong> share it with marketers.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">4. Legal basis for processing</h2>
            <p>Under the Data Protection Act, 2019 (Kenya), our lawful bases for processing your data are:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Contract:</strong> processing necessary to deliver the services you purchase from us</li>
              <li><strong>Consent:</strong> you give explicit consent when registering an account</li>
              <li><strong>Legitimate interest:</strong> for security, fraud prevention, and service improvement</li>
              <li><strong>Legal obligation:</strong> for tax records and any lawful request from Kenyan authorities</li>
            </ul>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">5. Third-party services we use</h2>
            <p>
              To deliver the Platform, we rely on the following third-party processors, each of whom has their own
              privacy policy governing the handling of your data:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Supabase</strong> (Ireland/EU region) — stores your account and platform data securely with encryption at rest and in transit</li>
              <li><strong>Vercel</strong> (US) — hosts the Platform's front-end and processes browser requests</li>
              <li><strong>Safaricom M-Pesa</strong> (Kenya) — processes your payments; we receive only the confirmation reference, not your PIN or account details</li>
              <li><strong>Google Gmail</strong> — receives correspondence sent to our email address</li>
            </ul>
            <p className="mt-3">
              None of these third parties are permitted to use your data for their own marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">6. How long we keep your data</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Account data:</strong> for as long as your account is active, plus 12 months after last activity</li>
              <li><strong>Payment records:</strong> 7 years, as required by Kenyan tax law</li>
              <li><strong>Service submissions</strong> (questionnaires, datasets): 12 months after service delivery, then permanently deleted</li>
              <li><strong>Learning progress:</strong> until you delete your account</li>
              <li><strong>Technical logs:</strong> 90 days</li>
            </ul>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">7. Your rights under the Data Protection Act, 2019</h2>
            <p>As a data subject in Kenya, you have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
              <li><strong>Rectification</strong> — request correction of any inaccurate data</li>
              <li><strong>Erasure</strong> — request deletion of your data (subject to tax-record retention obligations)</li>
              <li><strong>Restriction</strong> — request limitation of processing in certain circumstances</li>
              <li><strong>Portability</strong> — request export of your data in a machine-readable format</li>
              <li><strong>Objection</strong> — object to processing based on legitimate interest</li>
              <li><strong>Withdraw consent</strong> — at any time, without affecting the lawfulness of past processing</li>
              <li><strong>Lodge a complaint</strong> with the Office of the Data Protection Commissioner (Kenya) — <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer" className="text-gold-700 font-semibold hover:underline">www.odpc.go.ke</a></li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email <a href="mailto:postgraduatedatahub@gmail.com" className="text-gold-700 font-semibold hover:underline">postgraduatedatahub@gmail.com</a> from
              the address linked to your account. We aim to respond within 7 business days.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">8. Security</h2>
            <p>
              We use industry-standard technical measures to protect your data, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>HTTPS/TLS encryption for all data in transit</li>
              <li>Passwords stored using strong one-way hashing (bcrypt/argon2 via Supabase Auth)</li>
              <li>Database access controlled via Row-Level Security policies</li>
              <li>Aggressive anti-download protections on lesson content</li>
              <li>Regular security patches and platform monitoring</li>
            </ul>
            <p className="mt-3">
              No system is 100% secure. In the unlikely event of a data breach affecting your personal data, we will
              notify you and the Office of the Data Protection Commissioner within 72 hours as required by law.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">9. Cookies &amp; tracking</h2>
            <p>
              We use a minimal set of essential cookies to keep you signed in and remember your preferences. We do
              not use tracking cookies for advertising purposes. Where analytics are used, they are configured for
              aggregated statistics only and do not identify individual users.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">10. Children</h2>
            <p>
              The Platform is intended for adults engaged in postgraduate research (typically 21+). We do not
              knowingly collect data from individuals under 18. If we learn we have inadvertently done so, we will
              delete the data promptly.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">11. International transfers</h2>
            <p>
              Our third-party processors (Supabase, Vercel) may store data on servers located outside Kenya
              (primarily in the EU and US). These jurisdictions provide adequate data-protection safeguards
              equivalent to those under the Data Protection Act, 2019.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">12. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be communicated via email
              to registered users at least 14 days before taking effect.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">13. Contact</h2>
            <p>
              For any privacy-related enquiry, complaint, or to exercise your rights:
            </p>
            <ul className="list-none mt-3 space-y-1">
              <li>📧 <a href="mailto:postgraduatedatahub@gmail.com" className="text-gold-700 font-semibold hover:underline">postgraduatedatahub@gmail.com</a></li>
              <li>💬 WhatsApp: <a href="https://wa.me/254779568272" target="_blank" rel="noopener noreferrer" className="text-gold-700 font-semibold hover:underline">+254 779 568 272</a></li>
              <li>📍 Nairobi, Kenya</li>
            </ul>
            <p className="mt-3 text-sm text-slate-500">
              For unresolved complaints, you may also contact the Office of the Data Protection Commissioner (Kenya):
              <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer" className="text-gold-700 font-semibold hover:underline"> www.odpc.go.ke</a>
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              See also: <Link to="/terms" className="text-gold-700 font-semibold hover:underline">Terms of Service</Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
