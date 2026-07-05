import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  submissions, activities, unlocks, lessons as lessonsApi,
  analysisChecklist,
  auth, daysUntilExpiry, isUnlockActive,
  SUBMISSION_STATUSES, REFERRAL_REWARD_KES,
} from '../lib/db.js';
import { COURSES } from '../data/courses.js';
import { priceForLesson } from '../data/prices.js';
import {
  STAGES as CHECKLIST_STAGES, TOTAL_ITEMS as CHECKLIST_TOTAL,
  computeStageStats, computeOverallProgress,
} from '../data/analysisStages.js';
import {
  IconForm, IconChart, IconBook, IconCalendar, IconCheck, IconArrow,
  IconClock, IconSpark,
} from '../components/Icons.jsx';

export default function Dashboard() {
  const { user, refresh: refreshUser } = useAuth();
  const [subs, setSubs] = useState([]);
  const [acts, setActs] = useState([]);
  const [rawUnlocks, setRawUnlocks] = useState([]);
  const [progress, setProgress] = useState([]);
  const [streak, setStreak] = useState(0);
  const [checklistTicks, setChecklistTicks] = useState([]);
  const [savingDeadline, setSavingDeadline] = useState(false);

  useEffect(() => {
    (async () => {
      setSubs(await submissions.list());
      setActs(await activities.list());
      setRawUnlocks(await unlocks.list());
      setProgress(await lessonsApi.listProgress());
      setStreak(await lessonsApi.currentStreak());
      try { setChecklistTicks(await analysisChecklist.list()); } catch { setChecklistTicks([]); }
    })();
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  /* ─── DERIVED DATA ─── */

  const activeUnlocks = rawUnlocks.filter(isUnlockActive);

  // Analysis Journey progress — pulled from the shared checklist stages.
  // This IS the student's progress, in the chronological order they'll do it.
  const journeyOverall = computeOverallProgress(checklistTicks);
  const journeyStages = computeStageStats(checklistTicks);
  const overallProgress = journeyOverall.percent;
  const nextStage = journeyOverall.nextStage;

  // Lessons stats
  const lessonsCompleted = progress.filter((p) => p.completed).length;
  const quizzesAced = progress.filter((p) => p.quizScore !== null && p.quizScore >= 80).length;
  const quizScores = progress.filter((p) => p.quizScore !== null).map((p) => p.quizScore);
  const avgQuiz = quizScores.length ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : null;

  // Continue where you left off — most recently opened lesson that isn't completed
  const continueLesson = (() => {
    const openedSorted = [...progress]
      .filter((p) => p.openedAt)
      .sort((a, b) => new Date(b.openedAt) - new Date(a.openedAt));
    for (const p of openedSorted) {
      const found = findLessonMeta(p.lessonId);
      if (found) return { ...found, progress: p };
    }
    return null;
  })();

  // Recommended lesson — first paid unlock's "next in course", or first uncompleted lesson in a purchased course
  const recommendedLesson = (() => {
    const unlockedLessonIds = new Set(
      activeUnlocks
        .filter((u) => u.itemType === 'lesson')
        .map((u) => u.itemKey.split(':')[1])
    );
    const completedIds = new Set(progress.filter((p) => p.completed).map((p) => p.lessonId));
    // Find a lesson they've unlocked but haven't completed
    for (const c of COURSES) {
      for (const l of c.lessons) {
        if (unlockedLessonIds.has(l.id) && !completedIds.has(l.id) && (!continueLesson || continueLesson.lesson.id !== l.id)) {
          return { course: c, lesson: l };
        }
      }
    }
    // Otherwise recommend first cheap SPSS Basics lesson to get them started
    const basics = COURSES.find((c) => c.slug === 'basics');
    if (basics) return { course: basics, lesson: basics.lessons[0] };
    return null;
  })();

  // Expiring alerts — any unlocks expiring within 60 days
  const expiringAlerts = activeUnlocks
    .map((u) => ({ unlock: u, days: daysUntilExpiry(u) }))
    .filter(({ days }) => days !== null && days > 0 && days <= 60)
    .sort((a, b) => a.days - b.days);

  // Available credit
  const credits = user?.credits_kes || 0;

  // Thesis deadline countdown
  const thesisDeadline = user?.thesis_deadline || user?.thesisDeadline;
  const daysToDeadline = thesisDeadline
    ? Math.ceil((new Date(thesisDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  const saveDeadline = async (dateStr) => {
    setSavingDeadline(true);
    try {
      await auth.updateProfile({ thesis_deadline: dateStr, thesisDeadline: dateStr });
      await refreshUser();
    } finally { setSavingDeadline(false); }
  };

  /* ─── RENDER ─── */

  return (
    <div className="space-y-8">
      {/* ═════════ Welcome hero ═════════ */}
      <div className="relative rounded-3xl bg-gradient-to-br from-brand-700 via-brand to-brand-600 text-white p-8 lg:p-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-40"/>
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gold/20 rounded-full blur-3xl animate-glow"/>
        <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-brand-400/20 rounded-full blur-3xl"/>

        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-gold-300">— {greeting}</span>
            <h1 className="display text-3xl sm:text-4xl lg:text-5xl mt-3">
              Welcome back, <span className="italic font-light text-gold">{user?.name?.split(' ')[0]}</span>
            </h1>
            <p className="mt-4 text-brand-100/80 max-w-xl">
              {nextStage
                ? <>Next up in your analysis journey: <span className="text-gold font-semibold">{nextStage.title}</span>.</>
                : '🎉 All 9 analysis stages complete — you\'re ready to write.'}
            </p>
            {daysToDeadline !== null && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gold/20 border border-gold/40 text-gold-100 rounded-full text-sm font-semibold">
                📅 {daysToDeadline > 0
                    ? `${daysToDeadline} days until your thesis deadline`
                    : daysToDeadline === 0
                      ? 'Your thesis deadline is TODAY'
                      : `Deadline passed ${Math.abs(daysToDeadline)} days ago`}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/app/questionnaire" className="btn-gold">
              <IconForm className="w-4 h-4"/> Submit instrument
            </Link>
            <Link to="/app/tests" className="btn glass text-white hover:bg-white/15">
              <IconChart className="w-4 h-4"/> Pick a test
            </Link>
          </div>
        </div>
      </div>

      {/* ═════════ URGENT ALERTS strip ═════════ */}
      {(expiringAlerts.length > 0 || credits > 0 || !thesisDeadline) && (
        <div className="space-y-2">
          {/* Expiring access */}
          {expiringAlerts.slice(0, 2).map(({ unlock, days }) => (
            <div key={unlock.id} className={`p-4 rounded-2xl border flex items-start justify-between gap-3 flex-wrap ${
              days <= 30 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className="text-sm">
                <strong>{days <= 30 ? '⏰' : '🗓️'} {unlock.itemName}</strong> expires in <strong>{days} days</strong>
              </div>
              <Link to="/app/spss" className="text-xs font-bold underline hover:no-underline">
                Renew now →
              </Link>
            </div>
          ))}

          {/* Credit balance */}
          {credits > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start justify-between gap-3 flex-wrap">
              <div className="text-sm text-emerald-900">
                🎁 <strong>KES {credits.toLocaleString('en-KE')}</strong> credit ready — automatically applies to your next purchase.
              </div>
              <Link to="/app/spss" className="text-xs font-bold text-emerald-900 underline hover:no-underline">
                Use it now →
              </Link>
            </div>
          )}

          {/* Set thesis deadline prompt (only if not set) */}
          {!thesisDeadline && (
            <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10 flex items-center justify-between gap-3 flex-wrap">
              <div className="text-sm text-slate-700 flex items-center gap-2">
                📅 <span><strong>Set your thesis deadline</strong> and we'll show you a live countdown.</span>
              </div>
              <input
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => e.target.value && saveDeadline(e.target.value)}
                disabled={savingDeadline}
                className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 focus:border-brand focus:ring-1 focus:ring-brand outline-none"
              />
            </div>
          )}
        </div>
      )}

      {/* ═════════ Continue Learning + Recommended (2 cards side by side) ═════════ */}
      <div className="grid md:grid-cols-2 gap-5">
        <ContinueCard entry={continueLesson}/>
        <RecommendedCard entry={recommendedLesson} continueEntry={continueLesson}/>
      </div>

      {/* ═════════ KPI strip (upgraded) ═════════ */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi label="Analysis progress" value={`${overallProgress}%`} icon={IconSpark} bar={overallProgress}
          hint={nextStage ? `Next: ${nextStage.title.slice(0, 24)}${nextStage.title.length > 24 ? '…' : ''}` : 'All stages complete'}/>
        <Kpi label="Lessons completed" value={lessonsCompleted} icon={IconBook}
          hint={avgQuiz !== null ? `Quiz avg ${avgQuiz}%` : null}/>
        <Kpi label="Quizzes aced (≥80%)" value={quizzesAced} icon={IconCheck}/>
        <Kpi label="Study streak" value={`${streak} day${streak === 1 ? '' : 's'}`} icon={IconSpark}
          hint={streak > 0 ? '🔥 Keep it going!' : 'Open a lesson to start your streak'}/>
      </div>

      {/* ═════════ Analysis Journey + Activity ═════════ */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card-elevated p-7 lg:col-span-2">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <span className="eyebrow">— Analysis Journey</span>
              <h3 className="display text-2xl text-brand mt-2">Your data analysis, step-by-step</h3>
              <p className="text-xs text-slate-500 mt-1">The chronological workflow — click any stage to jump into it.</p>
            </div>
            <div className="text-right shrink-0">
              <p className="display text-2xl text-brand font-bold">{journeyOverall.done}<span className="text-slate-400 text-base">/{journeyOverall.total}</span></p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Items done</p>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="h-2 bg-slate-100 rounded-full mt-5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gold-300 to-gold transition-all duration-700"
                 style={{ width: `${overallProgress}%` }}/>
          </div>

          {/* Compact stage list — chronological */}
          <ol className="mt-6 space-y-2">
            {CHECKLIST_STAGES.map((stage) => {
              const s = journeyStages.find((x) => x.id === stage.id);
              const isNext = nextStage && nextStage.id === stage.id;
              return (
                <li key={stage.id}>
                  <Link
                    to={`/app/checklist#stage-${stage.id}`}
                    className={`flex items-center gap-3 p-3 rounded-xl transition group border ${
                      s.complete ? 'bg-emerald-50/50 border-emerald-200 hover:bg-emerald-50' :
                      isNext ? 'bg-gold/10 border-gold/40 hover:bg-gold/15' :
                      s.inProgress ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' :
                      'bg-white border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {/* Stage number circle */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                      s.complete ? 'bg-emerald-500 text-white' :
                      isNext ? 'bg-gold text-brand shadow-gold' :
                      s.inProgress ? 'bg-gold/30 text-brand' :
                      'bg-slate-100 text-slate-400'
                    }`}>
                      {s.complete ? '✓' : stage.id}
                    </div>

                    {/* Title + item count */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-display font-bold truncate ${
                        s.complete ? 'text-emerald-700' :
                        isNext ? 'text-brand' :
                        s.inProgress ? 'text-brand' :
                        'text-slate-500'
                      }`}>
                        {stage.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {s.done} of {s.total} items
                        {isNext && !s.complete && <span className="ml-2 font-bold text-gold-700">← next up</span>}
                      </p>
                    </div>

                    {/* Right-side status label + arrow */}
                    <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition shrink-0">
                      Open →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>

          <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
            <p className="text-xs text-slate-500 italic">
              {overallProgress === 100
                ? '🎉 All 9 stages complete. You are ready to write Chapter 4 & 5.'
                : overallProgress === 0
                  ? 'Not started yet. Open the full checklist to begin ticking items.'
                  : `${overallProgress}% of your analysis journey complete.`}
            </p>
            <Link to="/app/checklist" className="btn-primary text-sm shrink-0">
              Open full checklist <IconArrow className="w-4 h-4"/>
            </Link>
          </div>
        </div>

        <div className="card-elevated p-7">
          <Header title="Recent Activity"/>
          <ul className="mt-6 space-y-4">
            {acts.length === 0 && (
              <li className="text-sm text-slate-500">No activity yet. Submit your first instrument or open a lesson to begin.</li>
            )}
            {acts.slice(0, 8).map((a) => (
              <li key={a.id} className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/15 text-gold-700 flex items-center justify-center shrink-0">
                  <IconClock className="w-4 h-4"/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">{a.message}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{new Date(a.at).toLocaleString('en-GB')}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ═════════ Submissions + Quick actions ═════════ */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card-elevated p-7 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <Header title="Your submissions"/>
            <Link to="/app/questionnaire" className="text-sm text-brand font-semibold hover:text-gold-600 flex items-center gap-1">
              New <IconArrow className="w-4 h-4"/>
            </Link>
          </div>
          {subs.length === 0 ? (
            <div className="mt-6 text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
              <IconForm className="w-12 h-12 mx-auto text-slate-300"/>
              <p className="mt-4 text-sm text-slate-500">No submissions yet.</p>
              <Link to="/app/questionnaire" className="btn-primary mt-5 inline-flex">
                Submit your first instrument
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {subs.slice(0, 5).map((s) => {
                const statusObj = SUBMISSION_STATUSES.find((x) => x.id === s.status);
                return (
                  <li key={s.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-display font-bold text-brand truncate">{s.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 capitalize">
                        {s.researchType} · Updated {new Date(s.updatedAt).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                    <span className={`badge shrink-0 ${
                      s.status === 'ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-gold/15 text-gold-700'
                    }`}>{statusObj?.label}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="card-elevated p-7 bg-ink text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dark opacity-40"/>
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/20 rounded-full blur-3xl"/>
          <div className="relative">
            <span className="eyebrow text-gold-300">— Quick start</span>
            <h3 className="display text-2xl mt-2">What do you need today?</h3>
            <ul className="mt-6 space-y-3">
              {[
                { to: '/app/questionnaire', label: 'Refine my questionnaire / interview', icon: IconForm },
                { to: '/app/tests', label: 'Find the right test', icon: IconChart },
                { to: '/app/spss', label: 'Learn an SPSS technique', icon: IconBook },
                { to: '/app/analysis', label: 'Order analysis or interpretation', icon: IconSpark },
                { to: '/app/consultations', label: 'Book a consultation', icon: IconCalendar },
              ].map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link to={to} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition text-sm">
                    <div className="w-8 h-8 rounded-lg bg-gold/20 text-gold flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4"/>
                    </div>
                    <span className="flex-1">{label}</span>
                    <IconArrow className="w-4 h-4 text-white/40"/>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Small tip about earning credits (only if they haven't already earned some) */}
      {credits === 0 && user?.referral_code && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-gold/10 via-gold/5 to-transparent border border-gold/20 flex items-center justify-between gap-3 flex-wrap">
          <div className="text-sm text-slate-700">
            💡 Refer a friend and you BOTH get <strong>KES {REFERRAL_REWARD_KES} credit</strong> when they buy their first KES 1,750 lesson.
          </div>
          <Link to="/app/profile" className="text-xs font-bold text-brand hover:text-gold-700 underline">
            Get your referral code →
          </Link>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Small component helpers (kept inside the file for locality)
 * ───────────────────────────────────────────────────────────── */

function findLessonMeta(lessonId) {
  for (const c of COURSES) {
    const l = c.lessons.find((x) => x.id === lessonId);
    if (l) return { course: c, lesson: l };
  }
  return null;
}

function ContinueCard({ entry }) {
  if (!entry) {
    return (
      <div className="card-elevated p-7 border-l-4 border-l-slate-200">
        <span className="eyebrow">— Continue learning</span>
        <h3 className="display text-xl text-brand mt-3">Ready when you are</h3>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          You haven't opened any lessons yet. The SPSS Basics course is the perfect starting point.
        </p>
        <Link to="/app/spss" className="btn-primary text-sm mt-5 inline-flex">
          Browse the academy <IconArrow className="w-4 h-4"/>
        </Link>
      </div>
    );
  }
  const { course, lesson, progress } = entry;
  const done = progress?.completed;
  return (
    <div className="card-elevated p-7 border-l-4 border-l-gold">
      <span className="eyebrow">— {done ? 'Recently completed' : 'Continue where you left off'}</span>
      <h3 className="display text-xl text-brand mt-3 leading-tight">{lesson.name}</h3>
      <p className="text-xs text-slate-500 mt-1">{course.name}</p>
      <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
        <span>📖 Opened {new Date(progress.openedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
        {progress.quizScore !== null && progress.quizScore !== undefined && (
          <span>· Quiz {progress.quizScore}%</span>
        )}
      </div>
      <Link to="/app/spss" className="btn-gold text-sm mt-5 inline-flex">
        {done ? 'Review' : 'Continue'} <IconArrow className="w-4 h-4"/>
      </Link>
    </div>
  );
}

function RecommendedCard({ entry, continueEntry }) {
  if (!entry) return null;
  // Don't duplicate the "continue" lesson as "recommended"
  if (continueEntry && continueEntry.lesson.id === entry.lesson.id) return null;
  const { course, lesson } = entry;
  return (
    <div className="card-elevated p-7 border-l-4 border-l-brand bg-brand/5">
      <span className="eyebrow">— Recommended next</span>
      <h3 className="display text-xl text-brand mt-3 leading-tight">{lesson.name}</h3>
      <p className="text-xs text-slate-500 mt-1">{course.name}</p>
      <p className="text-sm text-slate-600 mt-3 leading-relaxed line-clamp-2">
        {lesson.intro ? lesson.intro.slice(0, 140) + '…' : 'Pick up where the curriculum naturally continues.'}
      </p>
      <Link to="/app/spss" className="btn-primary text-sm mt-5 inline-flex">
        View lesson <IconArrow className="w-4 h-4"/>
      </Link>
    </div>
  );
}

function Kpi({ label, value, icon: Icon, bar, hint }) {
  return (
    <div className="card-elevated p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
          <p className="display text-3xl text-brand mt-2">{value}</p>
          {hint && <p className="text-[11px] text-slate-500 mt-1">{hint}</p>}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold-700 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5"/>
          </div>
        )}
      </div>
      {bar !== undefined && (
        <div className="h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gold-300 to-gold transition-all duration-700"
               style={{ width: `${bar}%` }}/>
        </div>
      )}
    </div>
  );
}

function Header({ title, sub }) {
  return (
    <div>
      <h3 className="display text-xl text-brand">{title}</h3>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}
