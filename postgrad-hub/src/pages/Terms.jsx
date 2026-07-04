import PublicNav from '../components/PublicNav.jsx';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../lib/usePageTitle.js';

export default function Terms() {
  usePageTitle('Terms of Service');
  return (
    <div className="min-h-screen bg-parchment">
      <PublicNav />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <span className="eyebrow">— Legal</span>
        <h1 className="display text-4xl lg:text-5xl text-brand mt-3">Terms of Service</h1>
        <div className="gold-rule mt-6"/>
        <p className="mt-6 text-sm text-slate-500">Last updated: 2 July 2026 · Effective immediately for all users</p>

        <div className="prose prose-slate mt-10 max-w-none space-y-8 text-slate-700 leading-relaxed">

          <div>
            <h2 className="display text-2xl text-brand mb-3">1. Who we are</h2>
            <p>
              These Terms of Service ("Terms") govern your use of The Postgraduate Data Hub, Kenya (the "Platform"), a
              service based in Nairobi, Kenya that offers research instrument refinement, statistical test recommendations,
              SPSS lessons, done-for-you data analysis and interpretation, and expert consultations to postgraduate students
              and researchers. By registering an account or using any service, you agree to these Terms.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">2. Accounts &amp; device limits</h2>
            <p>
              You must register with a valid personal email address and a secure password. You are responsible for
              maintaining the confidentiality of your credentials and for all activity that occurs on your account.
            </p>
            <p className="mt-3">
              To protect the value of our paid content, each account is limited to a maximum of{' '}
              <strong>two (2) registered devices</strong> (for example, one phone plus one laptop). Attempting to sign in
              on a third device will be blocked until you remove an existing device from{' '}
              <em>Profile → My Devices</em>. If you lose access to both devices, contact our support team by
              WhatsApp (+254 779 568 272) or email (postgraduatedatahub@gmail.com) for manual assistance.
            </p>
            <p className="mt-3">
              Account sharing is prohibited — each account is for one individual only. We reserve the right to suspend
              or terminate accounts found to be shared, resold, or used to redistribute our content.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">2a. Access duration</h2>
            <p>
              Unless otherwise stated, all paid lesson unlocks and package purchases grant{' '}
              <strong>twelve (12) months of access</strong> from the date on which our team approves your payment.
              At the end of this period, access to that specific lesson or package will expire and you will be
              given the option to renew. Services such as Analysis &amp; Interpretation, Questionnaire Refinement,
              and Consultations are one-off deliverables and are not subject to access-duration limits.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">3. Services offered</h2>
            <p>The Platform provides the following services, each of which may require payment to unlock:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Data Collection Tools</strong> — refinement of questionnaires and interview guides</li>
              <li><strong>Statistical Test Selector</strong> — per-test recommendations with SPSS click paths</li>
              <li><strong>SPSS Academy</strong> — notes packs for individual lessons (video walkthroughs coming later)</li>
              <li><strong>Analysis &amp; Interpretation</strong> — done-for-you SPSS analysis, delivered as tables and/or written narrative</li>
              <li><strong>Expert Consultations</strong> — one-to-one sessions with our researchers</li>
            </ul>
            <p className="mt-3">
              Services are delivered digitally. Delivery timelines are stated per service; unforeseen delays are
              communicated promptly.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">4. Payments (M-Pesa)</h2>
            <p>
              All payments are made via M-Pesa to our Paybill <strong>4096483</strong>, Account <strong>7028M</strong>,
              Business Name <strong>The Postgraduate Data Hub Kenya</strong>. After payment, the student marks the
              payment as complete inside the Platform; certain unlocks (notes packs) activate instantly, while others
              (per-test unlocks, service orders) are verified by an administrator against our M-Pesa records before
              activation. Pricing per service is displayed at the point of purchase.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">5. Refunds</h2>
            <p className="p-4 rounded-lg bg-gold/5 border border-gold/30">
              <strong>All payments are final.</strong> Once a lesson has been unlocked, a service order confirmed, or
              a consultation scheduled, no refunds will be issued. Students are encouraged to review service
              descriptions carefully before purchase and to contact us via WhatsApp (+254 779 568 272) with any
              questions prior to paying.
            </p>
            <p className="mt-3">
              In the exceptional event that a payment is made but access is not granted within a reasonable time due
              to a fault on our end, we will either activate the access or issue a refund at our discretion — please
              reach out via WhatsApp with your M-Pesa confirmation SMS.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">6. Intellectual property &amp; user conduct</h2>
            <p>
              All lesson content, illustrations, curriculum design, worked examples, and platform features are the
              intellectual property of The Postgraduate Data Hub, Kenya. Purchasing a lesson grants you a personal,
              non-transferable licence to VIEW the content for your own study. You may not:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Download, screenshot, screen-record, print, or otherwise reproduce lesson content</li>
              <li>Share your account credentials with any other person</li>
              <li>Resell, redistribute, or make our content available to third parties</li>
              <li>Use our services to produce content on behalf of another person paying you for that work</li>
            </ul>
            <p className="mt-3">
              The Platform employs technical protections against these behaviours. Circumvention or attempted
              circumvention will result in account termination without refund and, where appropriate, legal action
              under the Copyright Act (Cap. 130, Laws of Kenya).
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">7. Academic integrity</h2>
            <p>
              Our Done-for-You Analysis service produces outputs and interpretations that support your research —
              you remain responsible for submitting your own thesis, defending your own findings, and complying
              with your institution's academic integrity policies. We do not write full theses, chapters, or coursework
              assignments on your behalf.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">8. Limitation of liability</h2>
            <p>
              The Platform, its services, and its content are provided "as is". We make reasonable efforts to ensure
              accuracy but do not guarantee that recommendations, interpretations, or analyses will be accepted by any
              particular supervisor, examiner, or institution. To the maximum extent permitted by law, our total
              liability arising from any claim relating to the Platform shall not exceed the total amount you paid us
              in the six (6) months preceding the claim.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">9. Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time. Material changes will be communicated via email to
              registered users. Continued use of the Platform after changes constitutes acceptance of the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">10. Governing law</h2>
            <p>
              These Terms are governed by the laws of the Republic of Kenya. Any dispute arising shall be resolved in
              the competent courts of Nairobi, Kenya, without prejudice to the right to first attempt informal
              resolution via WhatsApp or email.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl text-brand mb-3">11. Contact</h2>
            <p>
              For questions about these Terms, please contact us:
            </p>
            <ul className="list-none mt-3 space-y-1">
              <li>📧 <a href="mailto:postgraduatedatahub@gmail.com" className="text-gold-700 font-semibold hover:underline">postgraduatedatahub@gmail.com</a></li>
              <li>💬 WhatsApp: <a href="https://wa.me/254779568272" target="_blank" rel="noopener noreferrer" className="text-gold-700 font-semibold hover:underline">+254 779 568 272</a></li>
              <li>📍 Nairobi, Kenya</li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              See also: <Link to="/privacy" className="text-gold-700 font-semibold hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
