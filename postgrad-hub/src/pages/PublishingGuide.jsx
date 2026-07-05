import { Link } from 'react-router-dom';
import { usePageTitle } from '../lib/usePageTitle.js';
import { IconArrow, IconCheck, IconClose, IconSpark, IconCalendar, IconShield } from '../components/Icons.jsx';

/**
 * ═════════════════════════════════════════════════════════════════════
 *  PUBLISHING GUIDE — from thesis to peer-reviewed publication
 *
 *  Written for absolute beginners. All content is factually verifiable
 *  and points students to AUTHORITATIVE external sources (Beall's List,
 *  Think.Check.Submit, DOAJ, Scimago) rather than making original claims.
 *
 *  Positioning: FREE add for students — builds trust, no revenue expected.
 *  Future: monetized detailed lessons (KES 1,750 each) authored by
 *  published academics can be added here as they're developed.
 * ═════════════════════════════════════════════════════════════════════
 */

export default function PublishingGuide() {
  usePageTitle('Publishing Guide');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ─── Hero ─── */}
      <div>
        <span className="eyebrow">— Module</span>
        <h1 className="display text-4xl lg:text-5xl text-brand mt-2 leading-tight">
          From thesis to <span className="italic font-light text-gold">published paper</span>
        </h1>
        <p className="text-sm text-slate-600 mt-4 max-w-3xl leading-relaxed">
          Just finished your thesis? Great. Now let's turn your findings into a peer-reviewed
          publication — the <strong>right way</strong>, without getting scammed by predatory journals.
          This guide is written for absolute beginners. No jargon without translation.
        </p>
        <p className="text-xs text-slate-500 mt-3 max-w-3xl italic leading-relaxed">
          A note of honesty: this guide is a curated overview to help you get oriented. For field-specific
          journal recommendations, always consult your supervisor and your university librarian — they know
          your discipline better than any general resource can.
        </p>
      </div>

      {/* ─── Table of contents ─── */}
      <div className="card-elevated p-6 bg-slate-50/50">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">In this guide</p>
        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-brand list-decimal pl-5 marker:text-gold marker:font-bold">
          <li><a href="#manuscript" className="hover:text-gold-700 hover:underline">What is a manuscript?</a></li>
          <li><a href="#peer-review" className="hover:text-gold-700 hover:underline">What is peer review?</a></li>
          <li><a href="#rankings" className="hover:text-gold-700 hover:underline">Understanding journal rankings (Q1-Q4, impact factor)</a></li>
          <li><a href="#indexing" className="hover:text-gold-700 hover:underline">Where journals are indexed (Scopus, WoS, DOAJ)</a></li>
          <li><a href="#predatory" className="hover:text-gold-700 hover:underline">🚨 Spotting predatory journals</a></li>
          <li><a href="#apc" className="hover:text-gold-700 hover:underline">What are APCs? (Open Access charges)</a></li>
          <li><a href="#africa-journals" className="hover:text-gold-700 hover:underline">Legitimate African / Kenyan journals</a></li>
          <li><a href="#timelines" className="hover:text-gold-700 hover:underline">Realistic publication timelines</a></li>
        </ol>
      </div>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* Section 1 */}
      <Section id="manuscript" number="01" title="What is a manuscript?" icon="📄">
        <p>
          A <strong>manuscript</strong> is the version of your research work that you submit to a
          journal for possible publication. It is <em>not</em> the same thing as your thesis.
        </p>
        <SubHeading>Thesis vs manuscript — key differences</SubHeading>
        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <ComparisonCard title="Your thesis" tone="slate" items={[
            'Written for your examiners and supervisor',
            '80-200+ pages long',
            'Has 5+ chapters (intro, lit review, methods, findings, discussion)',
            'Includes ALL your findings, in full detail',
            'Uses your university\'s specific format',
            'Written to prove your competence as a researcher',
          ]}/>
          <ComparisonCard title="A manuscript" tone="gold" items={[
            'Written for the wider academic community',
            'Usually 3,000-8,000 words (much shorter)',
            'Has structured sections (Abstract, Intro, Methods, Results, Discussion, References)',
            'Focuses on ONE main finding or contribution',
            'Uses the target journal\'s specific format',
            'Written to advance knowledge in a field',
          ]}/>
        </div>
        <SubHeading>Turning a thesis chapter into a manuscript</SubHeading>
        <ul className="space-y-2 mt-3">
          <BulletItem>Choose ONE story to tell (a Masters thesis typically yields 1-2 papers; a PhD, 3-5).</BulletItem>
          <BulletItem>Cut your literature review to a tight 1-2 pages max — journals don't want your full literature survey.</BulletItem>
          <BulletItem>Present only the results that support your main story. Save others for a second paper.</BulletItem>
          <BulletItem>Rewrite the discussion to focus on your <strong>contribution</strong> and <strong>implications</strong>.</BulletItem>
          <BulletItem>Add an abstract (~250 words) — this is what everyone reads first.</BulletItem>
        </ul>
      </Section>

      {/* Section 2 */}
      <Section id="peer-review" number="02" title="What is peer review?" icon="🔬">
        <p>
          <strong>Peer review</strong> is the quality-control process journals use to decide whether to
          publish your work. When you submit a manuscript, the editor sends it to 2-4 anonymous
          reviewers — usually academics who have published in your field — who read it critically
          and recommend one of four outcomes.
        </p>
        <SubHeading>The four possible outcomes</SubHeading>
        <div className="mt-3 space-y-2">
          <OutcomeRow tone="emerald" label="Accept as-is (very rare)" desc="You're done. Usually happens 0-1% of the time on first submission."/>
          <OutcomeRow tone="brand" label="Minor revisions" desc="Make small changes (clarify a sentence, add a citation, tidy a table) and resubmit. Common outcome for good papers."/>
          <OutcomeRow tone="gold" label="Major revisions (R&R — 'revise and resubmit')" desc="Significant work needed — sometimes months of rewriting. If they invited you to revise, they're seriously considering the paper. This is a GOOD outcome, not a rejection."/>
          <OutcomeRow tone="red" label="Reject" desc="Most common outcome. Don't take it personally — top journals reject 80-95% of submissions. Read the reviewer comments carefully, improve the paper, submit to a different journal."/>
        </div>
        <SubHeading>Typical timeline for peer review</SubHeading>
        <ul className="space-y-2 mt-3">
          <BulletItem><strong>Submission → first decision:</strong> 1-6 months (varies wildly)</BulletItem>
          <BulletItem><strong>Revisions → resubmission:</strong> 1-3 months of your work</BulletItem>
          <BulletItem><strong>Resubmission → final decision:</strong> another 1-4 months</BulletItem>
          <BulletItem><strong>Acceptance → published online:</strong> 1-6 months</BulletItem>
          <BulletItem className="text-red-700 font-semibold">💡 Realistic total: expect 6-18 months from first submission to seeing your paper online.</BulletItem>
        </ul>
      </Section>

      {/* Section 3 */}
      <Section id="rankings" number="03" title="Understanding journal rankings" icon="📊">
        <p>
          Not all journals carry the same academic weight. Rankings help you gauge how prestigious
          a journal is. Higher-ranked journals are harder to publish in but boost your CV more.
        </p>

        <SubHeading>Q1, Q2, Q3, Q4 — the quartile system</SubHeading>
        <p>
          Within any academic field, all journals are ranked (usually by citation metrics) and split
          into four equal groups called <strong>quartiles</strong>:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
          <QuartileCard tone="emerald" q="Q1" label="Top 25%" desc="Elite journals. Very selective. Most impact." />
          <QuartileCard tone="brand" q="Q2" label="Next 25%" desc="Strong, respected journals. Realistic target for solid work." />
          <QuartileCard tone="gold" q="Q3" label="Next 25%" desc="Legitimate but less prestigious. Faster review often." />
          <QuartileCard tone="slate" q="Q4" label="Bottom 25%" desc="Legitimate journals, lower visibility. Still counts as a real publication." />
        </div>
        <p className="mt-4 text-sm">
          <strong>How to check a journal's quartile:</strong> use the free tool{' '}
          <ExternalLink href="https://www.scimagojr.com/journalrank.php">Scimago Journal &amp; Country Rank</ExternalLink>.
          Type the journal name, click the result, look at the ranking chart on the journal's page. Note that the same journal can be Q1 in one field and Q3 in another — the ranking is field-specific.
        </p>

        <SubHeading>Impact Factor (IF) &amp; h-index</SubHeading>
        <ul className="space-y-2 mt-3">
          <BulletItem>
            <strong>Impact Factor</strong> = average number of citations received per paper published in the journal over the last 2 years. Higher IF = journal papers are more cited. E.g. Nature has IF around 50, most Q1 social-science journals sit at IF 3-8.
          </BulletItem>
          <BulletItem>
            <strong>h-index</strong> = a measure of both productivity AND citation impact. A journal (or researcher) with h-index of 100 has 100 papers that have each been cited at least 100 times. It's cumulative and never decreases.
          </BulletItem>
        </ul>
      </Section>

      {/* Section 4 */}
      <Section id="indexing" number="04" title="Where journals are indexed" icon="📚">
        <p>
          When a journal is <strong>indexed</strong> by a major database, it means the database
          includes and tracks that journal's papers. Being indexed by a reputable database is a strong
          signal of legitimacy.
        </p>
        <div className="mt-4 space-y-3">
          <IndexRow name="Scopus" desc="Elsevier's database. Very selective — 40,000+ journals worldwide. Being 'Scopus-indexed' is the minimum bar most universities require for a publication to 'count'." link="https://www.scopus.com/sources"/>
          <IndexRow name="Web of Science (WoS)" desc="Clarivate's database. Even more selective than Scopus for some fields. Owner of the Impact Factor metric. Universities in Kenya (especially research-intensive ones) often prefer WoS-indexed publications." link="https://mjl.clarivate.com/search-results"/>
          <IndexRow name="DOAJ (Directory of Open Access Journals)" desc="Curated list of legitimate open-access journals. Vets journals for quality. If a journal claims to be OA but isn't in DOAJ, be suspicious." link="https://doaj.org/"/>
          <IndexRow name="PubMed" desc="Health &amp; medical sciences. If you're in Public Health, Nursing, Medicine — this is the one that matters most in your field." link="https://pubmed.ncbi.nlm.nih.gov/"/>
          <IndexRow name="Google Scholar" desc="Includes nearly everything, including predatory journals. Being 'in Google Scholar' means nothing — DON'T use this as a quality signal." link="https://scholar.google.com/"/>
        </div>
      </Section>

      {/* Section 5 — the MOST IMPORTANT one */}
      <Section id="predatory" number="05" title="🚨 Spotting predatory journals" icon="🚨" tone="red">
        <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200 mb-4">
          <p className="text-sm text-red-900 leading-relaxed">
            <strong>Read this section twice.</strong> Predatory journals prey on postgraduate students —
            they take your money (usually $200-$2,000), publish anything without real review, and your
            "publication" is worthless. It won't count toward your CV, promotion, or future PhD applications.
            Universities are also increasingly BLACKLISTING candidates who publish in known predatory outlets.
          </p>
        </div>

        <SubHeading>Common red flags — if you see 2 or more, walk away</SubHeading>
        <div className="mt-3 space-y-2">
          <RedFlag>Unsolicited email asking you to submit a paper (real journals almost never cold-email you)</RedFlag>
          <RedFlag>Promises "guaranteed publication" or "publication in 48 hours"</RedFlag>
          <RedFlag>Claims a fake or misleading Impact Factor (e.g. "Global Impact Factor" — this is not a real metric)</RedFlag>
          <RedFlag>Website looks amateurish; grammar/spelling errors on the About or Guidelines page</RedFlag>
          <RedFlag>Editorial board is vague or lists people who don't actually work with the journal (real ones are on the researchers' university pages)</RedFlag>
          <RedFlag>No clear peer-review process described, OR review is done in a few days</RedFlag>
          <RedFlag>Charges an APC BEFORE you even know if the paper will be reviewed</RedFlag>
          <RedFlag>Journal name mimics a famous journal (e.g. "International Journal of Nature" trying to look like "Nature")</RedFlag>
          <RedFlag>Not indexed in Scopus, WoS, or DOAJ — despite claiming to be a "leading" journal</RedFlag>
          <RedFlag>Contact address is a Gmail/Yahoo/Hotmail address rather than an official institutional/publisher domain</RedFlag>
        </div>

        <SubHeading>Free tools to verify a journal</SubHeading>
        <div className="mt-3 space-y-3">
          <VerifyTool
            name="Think. Check. Submit."
            desc="The gold standard 'is this journal safe?' checklist, run by a coalition of legitimate scholarly publishers. Go through the checklist before submitting anywhere new."
            link="https://thinkchecksubmit.org/"
          />
          <VerifyTool
            name="Beall's List (archived)"
            desc="Historical list of predatory journals + publishers. Not updated since 2017 but still useful for identifying known offenders."
            link="https://beallslist.net/"
          />
          <VerifyTool
            name="DOAJ Journal Search"
            desc="If a journal claims Open Access, check if it's in DOAJ. Being ABSENT from DOAJ is suspicious for any OA journal."
            link="https://doaj.org/search/journals"
          />
          <VerifyTool
            name="Scimago Journal Rank"
            desc="Verify a journal is real + indexed in Scopus. If Scimago doesn't have it, be extra cautious."
            link="https://www.scimagojr.com/journalrank.php"
          />
          <VerifyTool
            name="Retraction Watch database"
            desc="If a journal has a history of retracted papers, that's a warning sign."
            link="https://retractionwatch.com/retraction-watch-database-user-guide/"
          />
        </div>

        <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <p className="text-sm text-amber-900 leading-relaxed">
            💡 <strong>When in doubt, ask.</strong> Show the journal to your supervisor, your university librarian,
            or a senior colleague who has published in your field. A 5-minute email to the right person can save
            you 6 months and thousands of shillings.
          </p>
        </div>
      </Section>

      {/* Section 6 */}
      <Section id="apc" number="06" title="What are APCs? (Article Processing Charges)" icon="💰">
        <p>
          An <strong>APC (Article Processing Charge)</strong> is a fee some journals charge to publish
          your article as <strong>Open Access</strong> — meaning anyone in the world can read it for free.
        </p>
        <SubHeading>The two main journal models</SubHeading>
        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <ComparisonCard title="Subscription journals" tone="slate" items={[
            'You pay NOTHING to publish',
            'Only universities / libraries with subscriptions can read your paper',
            'Traditional model — still very common',
            'Includes many top Q1 journals in most fields',
            'Downside: limits who can actually read your work',
          ]}/>
          <ComparisonCard title="Open Access (OA) journals" tone="gold" items={[
            'You pay an APC (typically $500-$3,000)',
            'ANYONE in the world can read your paper',
            'Growing rapidly — many top journals now offer OA option',
            'Better visibility, more citations on average',
            'Predatory journals abuse this model — verify legitimacy first!',
          ]}/>
        </div>

        <SubHeading>Where to get APC funding as a Kenyan researcher</SubHeading>
        <ul className="space-y-2 mt-3">
          <BulletItem>Ask your <strong>supervisor</strong> — they may have research grant money that covers APCs.</BulletItem>
          <BulletItem>Ask your university's <strong>Directorate of Research / DVC Research office</strong> — many Kenyan universities have small publication support grants.</BulletItem>
          <BulletItem>Check if the journal offers a <strong>waiver for authors from developing countries</strong> — many legitimate OA journals do (Springer, PLOS, MDPI all have programs).</BulletItem>
          <BulletItem>Some journals offer <strong>free "diamond OA"</strong> (no APC, free to read). Great option — check DOAJ.</BulletItem>
          <BulletItem>Traditional subscription journals cost you nothing to publish — don't ignore them.</BulletItem>
        </ul>
      </Section>

      {/* Section 7 */}
      <Section id="africa-journals" number="07" title="Legitimate African / Kenyan journals" icon="🌍">
        <p>
          Publishing in African-based journals is a great option — often faster review, more supportive
          of regional research, and always legitimate publications. Below is a starting list of
          well-regarded, non-predatory journals by field. Always verify each with the tools in Section 5
          before submitting.
        </p>
        <div className="mt-4 space-y-3">
          <JournalGroup field="🏥 Health / Medicine / Public Health" journals={[
            { name: 'East African Medical Journal', url: 'https://www.ajol.info/index.php/eamj' },
            { name: 'African Journal of Health Sciences', url: 'https://www.ajol.info/index.php/ajhs' },
            { name: 'PAMJ (Pan African Medical Journal)', url: 'https://www.panafrican-med-journal.com/' },
            { name: 'BMC Public Health (open access)', url: 'https://bmcpublichealth.biomedcentral.com/' },
          ]}/>
          <JournalGroup field="💼 Business / Management / Economics" journals={[
            { name: 'African Journal of Business Management', url: 'https://academicjournals.org/journal/AJBM' },
            { name: 'DBA Africa Management Review (UoN)', url: 'https://journals.uonbi.ac.ke/damr' },
            { name: 'International Journal of Business &amp; Economic Development', url: 'https://ijbed.org/' },
          ]}/>
          <JournalGroup field="🎓 Education" journals={[
            { name: 'African Educational Research Journal', url: 'https://www.netjournals.org/aerj_index.html' },
            { name: 'Journal of Education and Practice', url: 'https://www.iiste.org/Journals/index.php/JEP' },
            { name: 'International Journal of African Higher Education', url: 'https://ejournals.bc.edu/index.php/ijahe' },
          ]}/>
          <JournalGroup field="🌱 Agriculture / Environment" journals={[
            { name: 'African Journal of Agricultural Research', url: 'https://academicjournals.org/journal/AJAR' },
            { name: 'African Crop Science Journal', url: 'https://www.ajol.info/index.php/acsj' },
            { name: 'Journal of Sustainable Development in Africa', url: 'https://jsd-africa.com/' },
          ]}/>
          <JournalGroup field="🔬 Engineering / Technology" journals={[
            { name: 'JKUAT Journal of Agriculture, Science &amp; Technology', url: 'https://ojs.jkuat.ac.ke/index.php/JAGST' },
            { name: 'African Journal of Science, Technology, Innovation &amp; Development', url: 'https://www.tandfonline.com/journals/rajs20' },
          ]}/>
          <JournalGroup field="🗣️ Social Sciences (broad)" journals={[
            { name: 'African Journal of Social Sciences', url: 'https://sachajournals.com/ajssc.php' },
            { name: 'AJOL portal (search 500+ African journals)', url: 'https://www.ajol.info/' },
          ]}/>
        </div>
        <p className="mt-4 text-xs text-slate-500 italic">
          Note: this list is a starting point, not an exhaustive recommendation. Journal quality changes
          over time. Always verify with your supervisor and the tools in Section 5. Being listed here does NOT
          constitute an endorsement by The Postgraduate Data Hub.
        </p>
      </Section>

      {/* Section 8 */}
      <Section id="timelines" number="08" title="Realistic publication timelines" icon="⏱️">
        <p>
          The single most common mistake postgrads make is <strong>underestimating how long publishing takes</strong>.
          Set realistic expectations from the start.
        </p>
        <SubHeading>Typical timeline breakdown</SubHeading>
        <ol className="mt-4 space-y-3 list-decimal pl-5 marker:text-gold marker:font-bold">
          <TimelineItem weeks="2-8 weeks" what="Turning thesis chapter into a manuscript"/>
          <TimelineItem weeks="1-2 weeks" what="Choosing target journal + formatting to their guidelines"/>
          <TimelineItem weeks="2-6 months" what="Editorial screening + first round of peer review"/>
          <TimelineItem weeks="1-3 months" what="Revisions (if invited to revise)"/>
          <TimelineItem weeks="1-4 months" what="Second review + final decision"/>
          <TimelineItem weeks="1-6 months" what="Production + online publication after acceptance"/>
        </ol>
        <div className="mt-5 p-4 rounded-xl bg-brand/5 border border-brand/10">
          <p className="text-sm text-slate-700 leading-relaxed">
            💡 <strong>Realistic total: 6-18 months</strong> from first submission to seeing your paper online.
            Fast journals: 3-6 months. Slow prestige journals: 12-24 months. Very rare to be faster than 3 months.
          </p>
        </div>
        <SubHeading>What to do while you wait</SubHeading>
        <ul className="space-y-2 mt-3">
          <BulletItem>Start on your next paper. Don't put your career on hold for 6-18 months.</BulletItem>
          <BulletItem>Present your work at a conference — often faster feedback + networking.</BulletItem>
          <BulletItem>Deposit a pre-print (e.g. SSRN, ResearchGate) if the journal permits — get your findings out there.</BulletItem>
          <BulletItem>Update your CV and LinkedIn — "manuscript under review at [Journal]" is a legitimate status.</BulletItem>
        </ul>
      </Section>

      {/* ─── "Coming soon" paid lessons teaser ─── */}
      <div className="card-elevated p-7 lg:p-9 bg-gradient-to-br from-brand/5 to-gold/5">
        <span className="eyebrow">— Coming soon</span>
        <h3 className="display text-2xl text-brand mt-3">Detailed publishing lessons</h3>
        <p className="text-sm text-slate-600 mt-3 leading-relaxed max-w-2xl">
          We're partnering with Kenyan academics who have published in Q1 &amp; Q2 journals to bring you
          deep, practical lessons on each step of publishing. Coming later this year:
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li className="flex items-start gap-2"><IconCheck className="w-4 h-4 text-gold shrink-0 mt-0.5"/> Turning your Chapter 4 into a manuscript (with template)</li>
          <li className="flex items-start gap-2"><IconCheck className="w-4 h-4 text-gold shrink-0 mt-0.5"/> Choosing the right journal — Q1 to Q4 decoded</li>
          <li className="flex items-start gap-2"><IconCheck className="w-4 h-4 text-gold shrink-0 mt-0.5"/> Writing an abstract that gets past desk-rejection</li>
          <li className="flex items-start gap-2"><IconCheck className="w-4 h-4 text-gold shrink-0 mt-0.5"/> Cover letters and response-to-reviewer templates</li>
        </ul>
        <a
          href="mailto:postgraduatedatahub@gmail.com?subject=Notify me: Publishing Lessons"
          className="btn-primary text-sm mt-6 inline-flex"
        >
          Email me when they're ready <IconArrow className="w-4 h-4"/>
        </a>
      </div>

      {/* ─── Consultation CTA ─── */}
      <div className="card-elevated p-6 lg:p-8 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-40"/>
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/20 rounded-full blur-3xl"/>
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="eyebrow text-gold-300">— Need personalized advice?</span>
            <h3 className="display text-2xl mt-2">Book a publishing strategy session</h3>
            <p className="text-brand-100/80 text-sm mt-3 max-w-lg">
              Discuss your specific paper, choose the right journal for your work, and get a submission-ready
              action plan. KES 2,000 per hour.
            </p>
          </div>
          <Link to="/app/consultations" className="btn-gold shrink-0">
            <IconCalendar className="w-4 h-4"/> Book a session
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
 *  Small component helpers (kept local for readability)
 * ═════════════════════════════════════════════════════════════════════ */

function Section({ id, number, title, icon, children, tone = 'default' }) {
  const toneClass = tone === 'red' ? 'border-red-200' : 'border-slate-100';
  return (
    <section id={id} className={`card-elevated p-7 lg:p-9 scroll-mt-8 border-2 ${toneClass}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl">{icon}</div>
        <div>
          <p className="text-xs uppercase tracking-wider font-bold text-slate-500">Section {number}</p>
          <h2 className="display text-2xl lg:text-3xl text-brand mt-1 leading-tight">{title}</h2>
        </div>
      </div>
      <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-3 [&_p]:leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function SubHeading({ children }) {
  return <h3 className="font-display font-bold text-brand text-base mt-6 mb-2">{children}</h3>;
}

function BulletItem({ children, className = '' }) {
  return (
    <li className={`flex items-start gap-2 text-sm text-slate-700 ${className}`}>
      <span className="text-gold mt-0.5 shrink-0">•</span>
      <span>{children}</span>
    </li>
  );
}

function ComparisonCard({ title, tone, items }) {
  const bg = tone === 'gold' ? 'bg-gold/5 border-gold/20' : 'bg-slate-50 border-slate-200';
  const titleColor = tone === 'gold' ? 'text-gold-700' : 'text-slate-600';
  return (
    <div className={`p-4 rounded-xl border ${bg}`}>
      <p className={`text-xs uppercase tracking-wider font-bold ${titleColor} mb-3`}>{title}</p>
      <ul className="space-y-2">
        {items.map((t, i) => (
          <li key={i} className="text-xs text-slate-700 leading-relaxed flex items-start gap-1.5">
            <span className="text-slate-400 mt-0.5">▸</span> {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function OutcomeRow({ tone, label, desc }) {
  const bg = {
    emerald: 'bg-emerald-50 border-emerald-200',
    brand:   'bg-brand/5 border-brand/20',
    gold:    'bg-gold/10 border-gold/30',
    red:     'bg-red-50 border-red-200',
  }[tone] || 'bg-slate-50 border-slate-200';
  return (
    <div className={`p-3 rounded-lg border ${bg}`}>
      <p className="font-bold text-brand text-sm">{label}</p>
      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{desc}</p>
    </div>
  );
}

function QuartileCard({ q, label, desc, tone }) {
  const bg = {
    emerald: 'bg-emerald-500 text-white',
    brand:   'bg-brand text-white',
    gold:    'bg-gold text-brand',
    slate:   'bg-slate-400 text-white',
  }[tone];
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200">
      <div className={`p-3 text-center ${bg}`}>
        <p className="display text-2xl font-bold">{q}</p>
        <p className="text-[10px] uppercase tracking-wider">{label}</p>
      </div>
      <p className="p-2 text-[11px] text-slate-600 leading-snug text-center">{desc}</p>
    </div>
  );
}

function IndexRow({ name, desc, link }) {
  return (
    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="font-bold text-brand text-sm">{name}</p>
        <ExternalLink href={link} small>Search →</ExternalLink>
      </div>
      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{desc}</p>
    </div>
  );
}

function RedFlag({ children }) {
  return (
    <div className="flex items-start gap-2 p-2 rounded-lg bg-red-50/50">
      <IconClose className="w-4 h-4 text-red-600 mt-0.5 shrink-0"/>
      <span className="text-sm text-slate-700">{children}</span>
    </div>
  );
}

function VerifyTool({ name, desc, link }) {
  return (
    <div className="p-4 rounded-xl bg-brand/5 border border-brand/10">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="font-bold text-brand text-sm flex items-center gap-1.5">
          <IconShield className="w-4 h-4 text-gold"/> {name}
        </p>
        <ExternalLink href={link} small>Open tool →</ExternalLink>
      </div>
      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{desc}</p>
    </div>
  );
}

function JournalGroup({ field, journals }) {
  return (
    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
      <p className="font-bold text-brand text-sm">{field}</p>
      <ul className="mt-2 space-y-1.5">
        {journals.map((j, i) => (
          <li key={i} className="flex items-center justify-between gap-2 text-xs">
            <span className="text-slate-700">{j.name}</span>
            <ExternalLink href={j.url} small>Visit →</ExternalLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimelineItem({ weeks, what }) {
  return (
    <li className="text-sm">
      <span className="font-bold text-brand">{weeks}:</span> {what}
    </li>
  );
}

function ExternalLink({ href, children, small }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-semibold text-brand hover:text-gold-700 underline ${small ? 'text-xs' : 'text-sm'}`}
    >
      {children}
    </a>
  );
}
