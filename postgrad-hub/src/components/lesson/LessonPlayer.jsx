import { useEffect, useMemo, useRef, useState } from 'react';
import { Block } from './LessonRenderer.jsx';
import { IconCheck, IconArrow, IconClose, IconLock } from '../Icons.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

/**
 * IBM SkillsBuild-style lesson player.
 * Props:
 *   - lesson: { id, title, subtitle, sections: [{id, title, blocks: []}] }
 *   - onClose: callback when user exits
 *   - onComplete: called with completion percentage when user finishes
 */
export default function LessonPlayer({ lesson, onClose, onComplete }) {
  const { user } = useAuth();
  const [activeIdx, setActiveIdx] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));
  const containerRef = useRef(null);

  const sections = lesson.sections || [];
  const total = sections.length;
  const progress = Math.round((visited.size / total) * 100);
  const active = sections[activeIdx];

  // Mark current section as visited
  useEffect(() => {
    setVisited((v) => new Set([...v, activeIdx]));
    // scroll to top of content
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeIdx]);

  // Notify completion
  useEffect(() => {
    if (visited.size === total && total > 0) onComplete?.(100);
  }, [visited, total, onComplete]);

  /* ─────────── Anti-download protections (aggressive but accessible) ─────────── */
  useEffect(() => {
    const onContextMenu = (e) => {
      if (containerRef.current?.contains(e.target)) e.preventDefault();
    };
    const onKey = (e) => {
      // Block Ctrl/Cmd+S, Ctrl+P, Ctrl+U (view source), F12 (devtools), Ctrl+Shift+I/J/C
      const k = e.key.toLowerCase();
      const mod = e.ctrlKey || e.metaKey;
      if (
        (mod && ['s', 'p', 'u'].includes(k)) ||
        (e.key === 'F12') ||
        (mod && e.shiftKey && ['i', 'j', 'c'].includes(k))
      ) {
        e.preventDefault();
        // Show a brief toast
        flashToast('🔒 This content is protected and cannot be saved or printed.');
      }
    };
    const onCopy = (e) => {
      if (containerRef.current?.contains(e.target)) {
        e.preventDefault();
        flashToast('🔒 Copying is disabled. This lesson is for on-screen reading only.');
      }
    };
    const onDragStart = (e) => {
      if (containerRef.current?.contains(e.target)) e.preventDefault();
    };
    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('keydown', onKey);
    document.addEventListener('copy', onCopy);
    document.addEventListener('dragstart', onDragStart);

    // Inject print-blocking stylesheet
    const style = document.createElement('style');
    style.textContent = `
      @media print { .pgh-lesson-shell, .pgh-lesson-shell * { display: none !important; } body::after { content: "🔒 This lesson is protected and cannot be printed."; display: block; font-size: 18px; padding: 40px; color: #0A2E5D; text-align: center; } }
      .pgh-lesson-body { user-select: none !important; -webkit-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; }
      .pgh-lesson-body img, .pgh-lesson-body svg { pointer-events: none; -webkit-user-drag: none; user-drag: none; }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('copy', onCopy);
      document.removeEventListener('dragstart', onDragStart);
      document.head.removeChild(style);
    };
  }, []);

  const goNext = () => setActiveIdx((i) => Math.min(i + 1, total - 1));
  const goPrev = () => setActiveIdx((i) => Math.max(i - 1, 0));
  const isLast = activeIdx === total - 1;
  const isFirst = activeIdx === 0;

  return (
    <div className="pgh-lesson-shell fixed inset-0 z-50 bg-parchment flex flex-col">
      {/* Top bar */}
      <header className="h-14 bg-ink text-white flex items-center justify-between px-4 sm:px-6 border-b border-white/10 shrink-0 relative z-10">
        <button onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-bold transition">
          <IconClose className="w-4 h-4"/> Exit lesson
        </button>
        <div className="hidden sm:flex items-center gap-3 text-xs">
          <IconLock className="w-3.5 h-3.5 text-gold"/>
          <span className="text-brand-100">Protected content · For your eyes only</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-brand-100 hidden sm:inline">{progress}% complete</span>
          <div className="w-20 sm:w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gold transition-all duration-500" style={{ width: `${progress}%` }}/>
          </div>
        </div>
      </header>

      {/* Body: sidebar + content */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Sidebar nav */}
        <aside className="hidden md:flex w-72 lg:w-80 flex-col bg-brand text-white shrink-0 border-r border-white/10">
          <div className="p-5 border-b border-white/10">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-300">{lesson.subtitle}</p>
            <h2 className="display text-xl mt-2 leading-tight">{lesson.title}</h2>
            <div className="mt-4">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${progress}%` }}/>
              </div>
              <p className="text-[10px] text-brand-100/70 mt-1.5">
                {visited.size} of {total} sections viewed
              </p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <p className="px-5 text-[10px] uppercase tracking-[0.2em] font-bold text-brand-100/60 mb-2">
              Lesson outline
            </p>
            <ul>
              {sections.map((s, i) => {
                const isVisited = visited.has(i);
                const isActive = i === activeIdx;
                return (
                  <li key={s.id}>
                    <button onClick={() => setActiveIdx(i)}
                      className={`w-full text-left px-5 py-3 flex items-start gap-3 transition group ${
                        isActive ? 'bg-white/10' : 'hover:bg-white/5'
                      } ${isActive ? 'border-l-4 border-gold' : 'border-l-4 border-transparent'}`}>
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        isVisited && !isActive ? 'bg-gold text-brand' :
                        isActive ? 'bg-white text-brand' :
                        'bg-white/10 text-brand-100'
                      }`}>
                        {isVisited && !isActive ? <IconCheck className="w-3 h-3"/> : i + 1}
                      </div>
                      <span className={`text-sm leading-snug ${isActive ? 'text-white font-bold' : 'text-brand-100/85'}`}>
                        {s.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Watermark in sidebar */}
          <div className="p-5 border-t border-white/10 text-[10px] text-brand-100/50">
            <p className="font-bold">{user?.name}</p>
            <p>{user?.email}</p>
            <p className="mt-1 italic">Licensed to this user only.</p>
          </div>
        </aside>

        {/* Content */}
        <main ref={containerRef} className="flex-1 overflow-y-auto bg-parchment relative">
          {/* Diagonal watermark across content */}
          <Watermark user={user}/>

          <div className="pgh-lesson-body relative max-w-3xl mx-auto px-4 sm:px-8 py-10 lg:py-14">
            {/* Mobile section selector */}
            <div className="md:hidden mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-600">{lesson.subtitle}</p>
              <h1 className="display text-2xl text-brand mt-1">{lesson.title}</h1>
              <select value={activeIdx} onChange={(e) => setActiveIdx(parseInt(e.target.value))}
                className="input mt-3 text-sm">
                {sections.map((s, i) => (
                  <option key={s.id} value={i}>{i + 1}. {s.title}</option>
                ))}
              </select>
            </div>

            {/* Section header */}
            <div className="mb-6 pb-6 border-b border-slate-200">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-600">
                Section {activeIdx + 1} of {total}
              </p>
              <h1 className="display text-3xl lg:text-4xl text-brand mt-2">{active.title}</h1>
            </div>

            {/* Blocks */}
            <div key={active.id} className="reveal">
              {active.blocks.map((b, i) => <Block key={i} block={b}/>)}
            </div>

            {/* Navigation footer */}
            <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between gap-3">
              <button onClick={goPrev} disabled={isFirst}
                className={`btn-outline ${isFirst ? 'invisible' : ''}`}>
                ← Previous
              </button>

              <div className="text-xs text-slate-400 hidden sm:block">
                {activeIdx + 1} / {total}
              </div>

              {isLast ? (
                <button onClick={onClose} className="btn-gold">
                  <IconCheck className="w-4 h-4"/> Finish lesson
                </button>
              ) : (
                <button onClick={goNext} className="btn-primary">
                  Next: {sections[activeIdx + 1].title} <IconArrow className="w-4 h-4"/>
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* Diagonal watermark layer */
function Watermark({ user }) {
  if (!user) return null;
  const text = `${user.name} · ${user.email}`;
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="wm" patternUnits="userSpaceOnUse" width="380" height="180" patternTransform="rotate(-22)">
            <text x="0" y="40" fontSize="14" fontFamily="Inter, sans-serif" fontWeight="700" fill="#0A2E5D">
              {text}
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wm)"/>
      </svg>
    </div>
  );
}

/* Small floating toast */
let toastTimer;
function flashToast(message) {
  let el = document.getElementById('pgh-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'pgh-toast';
    el.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0A2E5D;color:#fff;padding:12px 20px;border-radius:12px;font-family:Inter,sans-serif;font-size:13px;font-weight:600;box-shadow:0 10px 30px rgba(10,46,93,0.3);z-index:9999;opacity:0;transition:opacity .2s;pointer-events:none;';
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.style.opacity = '1';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.style.opacity = '0'; }, 2200);
}
