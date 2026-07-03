import { useEffect, useState } from 'react';
import { unlocks, lessons as lessonsApi } from '../lib/db.js';
import { COURSES } from '../data/courses.js';
import { RICH_LESSONS, isRichLesson } from '../data/richLessons.js';
import MpesaModal from '../components/MpesaModal.jsx';
import RichLessonPlayer from '../components/lesson/LessonPlayer.jsx';
import {
  IconBook, IconCheck, IconLock, IconArrow, IconClose, IconSpark,
} from '../components/Icons.jsx';

const lessonKey = (lessonId, format) => `lesson:${lessonId}:${format}`;

export default function SpssAcademy() {
  const [unlockedKeys, setUnlockedKeys] = useState([]);
  const [progress, setProgress] = useState([]);
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [payItem, setPayItem] = useState(null);

  const refresh = async () => {
    const u = await unlocks.list();
    setUnlockedKeys(u.filter((x) => x.status === 'unlocked').map((x) => x.itemKey));
    setProgress(await lessonsApi.listProgress());
  };
  useEffect(() => { refresh(); }, []);

  // Find the lesson metadata across all courses by id.
  const findLesson = (lessonId) => {
    for (const c of COURSES) {
      const l = c.lessons.find((x) => x.id === lessonId);
      if (l) return { course: c, lesson: l };
    }
    return null;
  };

  // Per Naomi's rules: free-flagged lessons unlock automatically when the
  // student matches the lesson's eligibility rule:
  //   freeWithCourse: ['basics']  → must own any lesson in those courses
  //   freeWithAnyPaid: true       → must own ANY paid lesson on the site
  const hasUnlockedAnyInCourse = (slug) => {
    const course = COURSES.find((c) => c.slug === slug);
    if (!course) return false;
    return course.lessons.some((l) => unlockedKeys.includes(lessonKey(l.id, 'notes')));
  };

  const hasUnlockedAnythingPaid = () => {
    // Any unlock with status 'unlocked' that isn't itself a free-included lesson.
    // Simpler: any unlockedKeys entry counts, because free lessons never appear
    // in unlockedKeys (they bypass the M-Pesa flow entirely).
    return unlockedKeys.length > 0;
  };

  // Returns 'paid' | 'free' | null. 'free' means: included automatically by
  // one of the lesson's freeWith* rules; 'paid' means: the student bought it.
  const accessReason = (lessonId, format) => {
    if (unlockedKeys.includes(lessonKey(lessonId, format))) return 'paid';
    if (format !== 'notes') return null;
    const found = findLesson(lessonId);
    if (found && found.lesson.free) {
      const { freeWithCourse, freeWithAnyPaid } = found.lesson;
      let eligible = false;
      if (freeWithAnyPaid && hasUnlockedAnythingPaid()) eligible = true;
      if (!eligible && Array.isArray(freeWithCourse) && freeWithCourse.length > 0) {
        eligible = freeWithCourse.some((slug) => hasUnlockedAnyInCourse(slug));
      }
      if (eligible) return 'free';
    }
    return null;
  };

  // Friendly label for the free-with badge based on the lesson's rule.
  const freeWithLabel = (lesson) => {
    if (!lesson || !lesson.free) return null;
    if (lesson.freeWithAnyPaid) return 'FREE with any purchase';
    if (Array.isArray(lesson.freeWithCourse) && lesson.freeWithCourse.length > 0) {
      const names = lesson.freeWithCourse
        .map((slug) => COURSES.find((c) => c.slug === slug)?.name)
        .filter(Boolean).join(' or ');
      return names ? `FREE with ${names}` : 'FREE';
    }
    return 'FREE';
  };

  // Friendly hint for students who don't yet qualify.
  const freeUnlockHint = (lesson) => {
    if (!lesson || !lesson.free) return null;
    if (lesson.freeWithAnyPaid) return 'Unlock any lesson on the site to access this for free';
    if (Array.isArray(lesson.freeWithCourse) && lesson.freeWithCourse.length > 0) {
      const names = lesson.freeWithCourse
        .map((slug) => COURSES.find((c) => c.slug === slug)?.name)
        .filter(Boolean).join(' or ');
      return `Unlock any lesson in ${names} to access this for free`;
    }
    return 'Free to access';
  };

  const hasFormat = (lessonId, format) => accessReason(lessonId, format) !== null;
  const isCompleted = (lessonId) => progress.some((p) => p.lessonId === lessonId && p.completed);

  const openPayment = (lesson, format) => {
    setPayItem({
      itemKey: lessonKey(lesson.id, format),
      itemType: 'lesson',
      itemName: `${lesson.name} — ${format === 'notes' ? 'Notes pack' : 'Video walkthrough'}`,
      format,
    });
  };

  // Auto-open rich player if active lesson has rich content
  if (activeLesson) {
    const rich = RICH_LESSONS[activeLesson.id];
    const hasNotes = hasFormat(activeLesson.id, 'notes');

    if (rich && hasNotes) {
      return (
        <RichLessonPlayer
          lesson={rich}
          onClose={() => { setActiveLesson(null); refresh(); }}
          onComplete={async (score) => {
            await lessonsApi.markComplete(activeLesson.id, score);
            await refresh();
          }}
        />
      );
    }

    return (
      <>
        <LegacyLessonPlayer
          course={activeCourse} lesson={activeLesson}
          hasNotes={hasNotes}
          isCompleted={isCompleted(activeLesson.id)}
          onBack={() => setActiveLesson(null)}
          onComplete={async (score) => {
            await lessonsApi.markComplete(activeLesson.id, score);
            await refresh();
          }}
          onBuy={(format) => openPayment(activeLesson, format)}
        />
        <MpesaModal open={!!payItem} item={payItem}
          onClose={() => setPayItem(null)} onClaimed={async () => {
            await refresh();
            // If they just unlocked notes, the player will re-render in rich mode
          }}/>
      </>
    );
  }

  if (activeCourse) {
    return (
      <>
        <CourseDetail
          course={activeCourse}
          hasFormat={hasFormat}
          accessReason={accessReason}
          freeWithLabel={freeWithLabel}
          freeUnlockHint={freeUnlockHint}
          isCompleted={isCompleted}
          onBack={() => setActiveCourse(null)}
          onOpen={(lesson) => setActiveLesson(lesson)}
          onBuy={openPayment}
        />
        <MpesaModal open={!!payItem} item={payItem}
          onClose={() => setPayItem(null)} onClaimed={refresh}/>
      </>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <span className="eyebrow">— Module 03</span>
            <h1 className="display text-4xl lg:text-5xl text-brand mt-2">SPSS Academy</h1>
            <p className="mt-3 text-slate-600 max-w-3xl leading-relaxed">
              Modular lessons across the statistical techniques you actually need. Our <strong>Notes packs</strong> are
              <strong> detailed, example-rich and worked end-to-end</strong> — every lesson includes annotated SPSS diagrams, real-data worked examples, APA-style write-ups, and a knowledge check. <em>Video walkthroughs are coming soon.</em>
            </p>
          </div>
          <span className="badge-gold shrink-0">
            <IconBook className="w-3.5 h-3.5"/> Notes pack · Pay via M-Pesa · Lifetime access
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((c, i) => {
            const totalFormats = c.lessons.length;
            const unlockedCount = c.lessons.reduce((acc, l) =>
              acc + (hasFormat(l.id, 'notes') ? 1 : 0), 0);
            const completed = c.lessons.filter((l) => isCompleted(l.id)).length;
            const pct = (completed / c.lessons.length) * 100;
            const richCount = c.lessons.filter((l) => isRichLesson(l.id)).length;
            return (
              <button key={c.slug} onClick={() => setActiveCourse(c)}
                className="group text-left card-elevated p-7 hover:border-gold/40 hover:-translate-y-1 transition-all reveal"
                style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-brand text-gold flex items-center justify-center group-hover:rotate-6 transition-transform">
                    <IconBook className="w-6 h-6"/>
                  </div>
                  <span className="text-xs font-bold text-gold-700">{c.lessons.length} lessons</span>
                </div>
                <h3 className="display text-xl text-brand mt-5">{c.name}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed min-h-[3rem]">{c.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {richCount > 0 && (
                    <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-gold-700 bg-gold/10 px-2 py-1 rounded-full">
                      <IconSpark className="w-3 h-3"/> {richCount} interactive lesson{richCount > 1 ? 's' : ''}
                    </div>
                  )}
                  {c.lessons.some((l) => l.free) && (
                    <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                      ★ {freeWithLabel(c.lessons.find((l) => l.free)) || 'FREE'}
                    </div>
                  )}
                </div>
                <div className="mt-5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gold-300 to-gold rounded-full transition-all"
                       style={{ width: `${pct}%` }}/>
                </div>
                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>{unlockedCount}/{totalFormats} unlocked</span>
                  <span>{completed}/{c.lessons.length} completed</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <MpesaModal open={!!payItem} item={payItem}
        onClose={() => setPayItem(null)} onClaimed={refresh}/>
    </>
  );
}

/* ─────────── Course detail ─────────── */
function CourseDetail({ course, hasFormat, accessReason, freeWithLabel, freeUnlockHint, isCompleted, onBack, onOpen, onBuy }) {
  const completed = course.lessons.filter((l) => isCompleted(l.id)).length;
  const allDone = completed === course.lessons.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={onBack} className="btn-outline">← All courses</button>

      <div className="card-elevated p-8 lg:p-10">
        <span className="eyebrow">— Course</span>
        <h1 className="display text-4xl text-brand mt-3">{course.name}</h1>
        <p className="text-slate-600 mt-3 max-w-2xl">{course.desc}</p>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <Mini label="Lessons" value={course.lessons.length}/>
          <Mini label="Interactive" value={course.lessons.filter((l) => isRichLesson(l.id)).length}/>
          <Mini label="Completed" value={completed}/>
        </div>
        {allDone && (
          <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-between gap-3">
            <div>
              <p className="font-display font-bold text-brand text-lg">🎓 Course complete</p>
              <p className="text-sm text-slate-600">Your certificate is ready to claim.</p>
            </div>
            <button className="btn-gold">Download certificate</button>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {course.lessons.map((l, i) => {
          const reason = accessReason ? accessReason(l.id, 'notes') : (hasFormat(l.id, 'notes') ? 'paid' : null);
          const has = !!reason;
          const isFree = reason === 'free';
          const done = isCompleted(l.id);
          const rich = isRichLesson(l.id);
          const freeBadge = freeWithLabel ? freeWithLabel(l) : (l.free ? 'FREE with SPSS Basics' : null);
          const freeHint = freeUnlockHint ? freeUnlockHint(l) : (l.free ? 'Unlock any SPSS Basics lesson to access this for free' : null);

          return (
            <div key={l.id} className="card-elevated p-5">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                  done ? 'bg-emerald-100 text-emerald-700' :
                  has ? 'bg-gold/15 text-gold-700' :
                  'bg-slate-100 text-slate-400'
                }`}>
                  {done ? <IconCheck className="w-5 h-5"/> : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-display font-bold text-brand text-lg">{l.name}</p>
                    {rich && (
                      <span className="badge bg-gold/15 text-gold-700 text-[10px]">
                        <IconSpark className="w-3 h-3"/> Interactive
                      </span>
                    )}
                    {l.free && freeBadge && (
                      <span className="badge bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                        ★ {freeBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {done ? 'Completed' :
                     isFree ? 'Included free with your existing access' :
                     has ? 'Notes unlocked' :
                     l.free && freeHint ? freeHint :
                     'Locked'}
                  </p>
                </div>
                {has && (
                  <button onClick={() => onOpen(l)} className="btn-primary text-sm shrink-0">
                    {done ? 'Review' : 'Open'} <IconArrow className="w-4 h-4"/>
                  </button>
                )}
              </div>

              {/* Format options */}
              <div className="mt-4 pt-4 border-t border-slate-100 grid sm:grid-cols-2 gap-3">
                <FormatTile
                  type="notes" unlocked={has} reason={reason}
                  isFreeLesson={l.free}
                  freeBadge={freeBadge}
                  freeHint={freeHint}
                  onBuy={() => onBuy(l, 'notes')}
                  onOpen={() => onOpen(l)}
                />
                <FormatTile type="video" unlocked={false} onBuy={() => {}} onOpen={() => {}}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FormatTile({ type, unlocked, reason, isFreeLesson, freeBadge, freeHint, onBuy, onOpen }) {
  const isNotes = type === 'notes';
  const videoComingSoon = !isNotes;
  const isFreeAccess = reason === 'free';
  const badgeText = freeBadge || (isFreeLesson ? 'FREE with SPSS Basics' : null);
  const hintText  = freeHint  || (isFreeLesson ? 'Unlock any SPSS Basics lesson to access free' : null);

  return (
    <div className={`relative p-4 rounded-xl border-2 ${
      videoComingSoon ? 'border-slate-200 bg-slate-50/70 opacity-75' :
      isFreeAccess ? 'border-emerald-300 bg-emerald-50/60' :
      unlocked ? 'border-emerald-200 bg-emerald-50/40' :
      isFreeLesson ? 'border-emerald-300 bg-emerald-50/40' :
      'border-gold/40 bg-gold/5'
    }`}>
      {videoComingSoon && (
        <span className="absolute top-2 right-2 badge bg-slate-200 text-slate-600 text-[10px]">
          Coming soon
        </span>
      )}
      {isNotes && isFreeLesson && badgeText && (
        <span className="absolute top-2 right-2 badge bg-emerald-600 text-white text-[10px] font-bold">
          ★ {badgeText}
        </span>
      )}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-2xl">{isNotes ? '📄' : '🎬'}</p>
          <p className="font-display font-bold text-brand mt-1">
            {isNotes ? 'Notes pack' : 'Video walkthrough'}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {isNotes
              ? (isFreeLesson
                  ? `Detailed notes · diagrams · worked examples · APA write-ups · quiz · ${badgeText ? 'included automatically' : 'lifetime access after payment'}`
                  : 'Detailed notes · diagrams · worked examples · APA write-ups · quiz · lifetime access after payment')
              : 'Recorded video lessons — currently in production'}
          </p>
        </div>
        {unlocked && isNotes && <IconCheck className="w-5 h-5 text-emerald-500 shrink-0"/>}
      </div>
      <div className="mt-3">
        {videoComingSoon ? (
          <button disabled className="w-full text-sm py-2 px-3 rounded-lg bg-slate-200 text-slate-500 font-semibold cursor-not-allowed">
            Coming soon
          </button>
        ) : unlocked ? (
          <button onClick={onOpen}
            className="w-full text-sm py-2 px-3 rounded-lg bg-white border border-emerald-300 text-emerald-700 font-semibold hover:bg-emerald-50 flex items-center justify-center gap-1">
            {isFreeAccess && <span className="text-[11px]">★</span>}
            Open notes
          </button>
        ) : isFreeLesson ? (
          <button disabled
            className="w-full text-sm py-2 px-3 rounded-lg bg-emerald-100 text-emerald-700 font-semibold cursor-not-allowed text-left px-3 flex items-center gap-1.5">
            <IconLock className="w-3.5 h-3.5 shrink-0"/>
            <span className="truncate">{hintText}</span>
          </button>
        ) : (
          <button onClick={onBuy}
            className="w-full text-sm py-2 px-3 rounded-lg bg-gold text-brand font-bold hover:bg-gold-300 flex items-center justify-center gap-1">
            <IconLock className="w-3.5 h-3.5"/> Unlock with M-Pesa
          </button>
        )}
      </div>
    </div>
  );
}

function Mini({ label, value }) {
  return (
    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="display text-2xl text-brand mt-1">{value}</p>
    </div>
  );
}

/* ─────────── Legacy lesson player (for lessons without rich content yet) ─────────── */
function LegacyLessonPlayer({ course, lesson, hasNotes, isCompleted, onBack, onComplete, onBuy }) {
  const [tab, setTab] = useState(hasNotes ? 'notes' : 'notes');

  if (!hasNotes) {
    // shouldn't really hit this — but show a friendly locked screen
    return (
      <div className="max-w-3xl mx-auto card-elevated p-12 text-center">
        <IconLock className="w-12 h-12 mx-auto text-slate-300"/>
        <h2 className="display text-2xl text-brand mt-5">Lesson locked</h2>
        <p className="text-slate-600 mt-2">Unlock this lesson's notes pack with M-Pesa to start learning.</p>
        <button onClick={() => onBuy('notes')} className="btn-gold mt-6">Unlock with M-Pesa</button>
        <p className="mt-6"><button onClick={onBack} className="text-sm text-slate-500 hover:text-brand">← Back to course</button></p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={onBack} className="btn-outline">← {course.name}</button>

      <div className="card-elevated overflow-hidden">
        <div className="p-8 lg:p-10 border-b border-slate-100 bg-gradient-to-br from-brand-50/40 to-transparent">
          <span className="eyebrow">— Lesson</span>
          <h1 className="display text-3xl lg:text-4xl text-brand mt-3">{lesson.name}</h1>
          <p className="text-slate-600 mt-4 leading-relaxed">{lesson.intro}</p>
          <div className="mt-4 p-4 rounded-xl bg-gold/10 border border-gold/30 text-xs text-gold-700 flex items-start gap-2">
            <IconSpark className="w-4 h-4 shrink-0 mt-0.5"/>
            <span>
              <strong>Interactive lesson coming soon for this topic.</strong> In the meantime, the notes below cover everything you need. We're rolling out the full IBM-style interactive player to every lesson over the coming weeks.
            </span>
          </div>
        </div>

        <div className="flex gap-1 border-b border-slate-200 px-4 sm:px-8 overflow-x-auto">
          {[
            { id: 'notes', label: '📄 Notes' },
            { id: 'resources', label: '📚 Resources' },
            { id: 'quiz', label: '✏️ Quiz' },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 -mb-px transition flex items-center gap-1.5 ${
                tab === t.id ? 'border-gold text-brand' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-8 lg:p-10">
          {tab === 'notes' && <NotesSection lesson={lesson}/>}
          {tab === 'resources' && <ResourcesSection lesson={lesson}/>}
          {tab === 'quiz' && <QuizSection lesson={lesson} onComplete={onComplete}/>}
        </div>
      </div>
    </div>
  );
}

function NotesSection({ lesson }) {
  return (
    <div className="space-y-8 reveal pgh-lesson-body">
      <div>
        <h3 className="font-display font-bold text-brand text-lg">Key takeaways</h3>
        <ul className="mt-4 space-y-3">
          {lesson.notes.map((n, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-700">
              <span className="w-6 h-6 rounded-full bg-gold/15 text-gold-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed">{n}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ResourcesSection({ lesson }) {
  const r = lesson.resources;
  return (
    <div className="space-y-6 reveal pgh-lesson-body">
      <div>
        <h3 className="font-display font-bold text-brand text-lg">Topic resources</h3>
        <p className="text-sm text-slate-500 mt-1">
          Curated materials specific to <strong>{lesson.name}</strong>.
        </p>
      </div>

      {r.guidebookExcerpt && (
        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
          <p className="text-xs uppercase tracking-wider font-bold text-gold-700 flex items-center gap-2">
            <span>📖</span> From The Complete SPSS Handbook for Beginners (2026)
          </p>
          <div className="mt-3 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed max-h-[480px] overflow-y-auto pr-2 border-l-2 border-gold/30 pl-4">
            {r.guidebookExcerpt}
          </div>
        </div>
      )}

      {r.links?.length > 0 && (
        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
          <p className="text-xs uppercase tracking-wider font-bold text-gold-700 flex items-center gap-2">
            <span>🔗</span> Further reading
          </p>
          <ul className="mt-3 space-y-2">
            {r.links.map((l, i) => (
              <li key={i}>
                <a href={l.url} target="_blank" rel="noopener"
                   className="text-sm text-brand font-semibold hover:text-gold-600 underline underline-offset-2">
                  {l.title} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function QuizSection({ lesson, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    setSubmitted(true);
    const correct = lesson.quiz.filter((q, i) => answers[i] === q.answer).length;
    const score = Math.round((correct / lesson.quiz.length) * 100);
    onComplete(score);
  };

  return (
    <div className="space-y-5 reveal pgh-lesson-body">
      {lesson.quiz.map((q, i) => (
        <div key={i} className="p-5 rounded-2xl border border-slate-200">
          <p className="font-bold text-brand">{i + 1}. {q.q}</p>
          <div className="mt-3 space-y-2">
            {q.choices.map((c, ci) => {
              const picked = answers[i] === ci;
              const correct = submitted && ci === q.answer;
              const wrong = submitted && picked && ci !== q.answer;
              return (
                <button key={ci} onClick={() => !submitted && setAnswers({ ...answers, [i]: ci })}
                  className={`w-full text-left p-3 rounded-xl border-2 text-sm flex items-center gap-3 transition ${
                    correct ? 'border-emerald-400 bg-emerald-50 text-emerald-800' :
                    wrong ? 'border-red-300 bg-red-50 text-red-800' :
                    picked ? 'border-gold bg-gold/10 text-brand' :
                    'border-slate-200 hover:border-brand-200'
                  } ${submitted ? 'cursor-default' : ''}`}>
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                    correct ? 'border-emerald-500 bg-emerald-500 text-white' :
                    wrong ? 'border-red-400 bg-red-400 text-white' :
                    picked ? 'border-gold bg-gold text-brand' : 'border-slate-300'
                  }`}>
                    {String.fromCharCode(65 + ci)}
                  </span>
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {submitted ? (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 text-center">
          <p className="display text-2xl text-emerald-700">
            {Math.round((lesson.quiz.filter((q, i) => answers[i] === q.answer).length / lesson.quiz.length) * 100)}%
          </p>
          <p className="text-sm text-emerald-700 font-semibold mt-1">
            Lesson marked complete. Great work!
          </p>
        </div>
      ) : (
        <button onClick={submit} disabled={Object.keys(answers).length < lesson.quiz.length}
          className="btn-gold w-full py-3.5">
          Submit knowledge check
        </button>
      )}
    </div>
  );
}
