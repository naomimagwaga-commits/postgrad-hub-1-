import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { analysisChecklist } from '../lib/db.js';
import { usePageTitle } from '../lib/usePageTitle.js';
import { STAGES, TOTAL_ITEMS, computeStageStats } from '../data/analysisStages.js';
import { IconCheck, IconArrow, IconSpark, IconBook, IconChart, IconCalendar } from '../components/Icons.jsx';

/**
 * ═════════════════════════════════════════════════════════════════
 *  ANALYSIS CHECKLIST — 9 stages, step-by-step post-data workflow
 *  Kenyan postgrad-specific. Every item ties back to a lesson/service.
 *  Stage definitions live in src/data/analysisStages.js (single source
 *  of truth — shared with Dashboard's Journey card).
 * ═════════════════════════════════════════════════════════════════
 */

export default function AnalysisChecklist() {
  usePageTitle('Data Analysis Checklist');
  const [ticked, setTicked] = useState([]);
  const [openStage, setOpenStage] = useState(1);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const list = await analysisChecklist.list();
      setTicked(Array.isArray(list) ? list : []);
    } catch (e) {
      console.warn('[Checklist] failed to load, showing empty state', e);
      setTicked([]);
    } finally {
      setLoading(false);   // ALWAYS clear the loading spinner
    }
  };
  useEffect(() => { refresh(); }, []);

  // If URL has a hash like #stage-4 (from Dashboard link), open that stage on load.
  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const match = hash.match(/^#stage-(\d+)$/);
    if (match) {
      const id = Number(match[1]);
      if (id >= 1 && id <= STAGES.length) setOpenStage(id);
    }
  }, []);

  const toggle = async (itemId) => {
    // Optimistic UI — flip immediately, persist in background
    setTicked((t) => t.includes(itemId) ? t.filter((x) => x !== itemId) : [...t, itemId]);
    await analysisChecklist.toggle(itemId);
  };

  const resetAll = async () => {
    if (!window.confirm('Reset ALL your ticks? This can\'t be undone.')) return;
    await analysisChecklist.reset();
    setTicked([]);
  };

  // Filter ticked IDs to only VALID ones (defensive — if we ever remove a stage item,
  // orphan IDs in Supabase shouldn't affect the count).
  const validTicked = ticked.filter((id) =>
    STAGES.some((s) => s.items.some((i) => i.id === id))
  );
  const completedCount = validTicked.length;
  const percent = TOTAL_ITEMS === 0 ? 0 : Math.round((completedCount / TOTAL_ITEMS) * 100);
  const stageStats = computeStageStats(validTicked);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ─── Header ─── */}
      <div>
        <span className="eyebrow">— Module</span>
        <h1 className="display text-4xl lg:text-5xl text-brand mt-2">
          Data Analysis Checklist
        </h1>
        <p className="text-sm text-slate-600 mt-3 max-w-2xl leading-relaxed">
          Every step from <strong>"I just finished collecting data"</strong> to <strong>"my Chapter 4 & 5 are ready to submit"</strong>. Tick items as you go — your progress is saved automatically. Free to use.
        </p>
      </div>

      {/* ─── Overall progress ─── */}
      <div className="card-elevated p-6 lg:p-8 bg-gradient-to-br from-brand/5 to-gold/5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-wider font-bold text-slate-500">Overall progress</p>
            <p className="display text-4xl text-brand font-bold mt-1">
              {completedCount}<span className="text-slate-400 text-2xl"> / {TOTAL_ITEMS}</span>
            </p>
            <p className="text-sm text-slate-600 mt-1">{percent}% complete</p>
          </div>
          <div className="flex items-center gap-3">
            {percent === 100 && (
              <span className="badge bg-emerald-100 text-emerald-700 font-bold">
                🎉 Ready for submission
              </span>
            )}
            {completedCount > 0 && (
              <button onClick={resetAll} className="text-xs text-slate-500 hover:text-red-600 underline">
                Reset all
              </button>
            )}
          </div>
        </div>
        <div className="h-2 bg-slate-100 rounded-full mt-5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gold-300 to-gold transition-all duration-700"
               style={{ width: `${percent}%` }}/>
        </div>
        {/* Stage dots */}
        <div className="mt-5 flex items-center gap-1.5 flex-wrap">
          {stageStats.map((s) => (
            <button
              key={s.id}
              onClick={() => setOpenStage(s.id)}
              className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition ${
                s.complete ? 'bg-gold text-brand' :
                s.done > 0 ? 'bg-gold/30 text-brand-700' :
                'bg-slate-200 text-slate-500 hover:bg-slate-300'
              }`}
              title={`Stage ${s.id}: ${s.done}/${s.total}`}
            >
              {s.complete ? '✓' : s.id}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="card-elevated p-10 text-center text-slate-500">Loading your progress…</div>
      ) : (
        /* ─── Stages ─── */
        <div className="space-y-4">
          {STAGES.map((stage) => {
            const stats = stageStats.find((x) => x.id === stage.id);
            const isOpen = openStage === stage.id;
            return (
              <div key={stage.id} className={`card-elevated overflow-hidden transition-all ${
                stats.complete ? 'border-2 border-emerald-300' : ''
              }`}>
                {/* Stage header — click to expand */}
                <button
                  onClick={() => setOpenStage(isOpen ? null : stage.id)}
                  className="w-full p-5 lg:p-6 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition text-left"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                      stats.complete ? 'bg-emerald-100' : stats.done > 0 ? 'bg-gold/20' : 'bg-slate-100'
                    }`}>
                      {stats.complete ? '✅' : stage.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider font-bold text-slate-500">
                        Stage {stage.id}
                      </p>
                      <h3 className="font-display font-bold text-brand text-lg lg:text-xl leading-tight truncate">
                        {stage.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-bold ${
                      stats.complete ? 'text-emerald-700' : 'text-slate-500'
                    }`}>
                      {stats.done}/{stats.total}
                    </span>
                    <span className={`text-xs text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
                  </div>
                </button>

                {/* Stage body — visible when open */}
                {isOpen && (
                  <div className="px-5 lg:px-6 pb-6 border-t border-slate-100">
                    <p className="text-sm text-slate-600 mt-4 leading-relaxed italic">{stage.intro}</p>

                    <ul className="mt-5 space-y-2.5">
                      {stage.items.map((item) => {
                        const checked = ticked.includes(item.id);
                        return (
                          <li key={item.id}>
                            <label className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition ${
                              checked ? 'bg-emerald-50/50' : 'hover:bg-slate-50'
                            }`}>
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggle(item.id)}
                                className="mt-0.5 w-5 h-5 rounded border-2 border-slate-300 text-brand focus:ring-brand-200 cursor-pointer shrink-0"
                              />
                              <span className={`text-sm leading-relaxed ${
                                checked ? 'text-slate-500 line-through' : 'text-slate-700'
                              }`}>
                                {item.text}
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>

                    {stage.links && stage.links.length > 0 && (
                      <div className="mt-5 pt-5 border-t border-slate-100">
                        <p className="text-[11px] uppercase tracking-wider font-bold text-gold-700 mb-3">
                          Related lessons & services
                        </p>
                        <ul className="space-y-2">
                          {stage.links.map((link, i) => (
                            <li key={i}>
                              <Link
                                to={link.to}
                                className="flex items-center justify-between gap-2 p-2 px-3 rounded-lg bg-brand/5 hover:bg-brand/10 text-sm text-brand font-semibold transition"
                              >
                                <span>{link.label}</span>
                                <IconArrow className="w-4 h-4 shrink-0 opacity-60"/>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ─── Bottom CTA ─── */}
      <div className="card-elevated p-6 lg:p-8 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-40"/>
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/20 rounded-full blur-3xl"/>
        <div className="relative">
          <span className="eyebrow text-gold-300">— Stuck?</span>
          <h3 className="display text-2xl mt-2">You don't have to do this alone.</h3>
          <p className="text-brand-100/80 text-sm mt-3 max-w-lg leading-relaxed">
            Every stage above links to the lesson that walks you through it. And if you're truly overwhelmed, our PhD team can take the analysis off your hands entirely.
          </p>
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <Link to="/app/spss" className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm">
              <IconBook className="w-4 h-4 text-gold"/> SPSS Academy
            </Link>
            <Link to="/app/tests" className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm">
              <IconChart className="w-4 h-4 text-gold"/> Test Selector
            </Link>
            <Link to="/app/analysis" className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm">
              <IconSpark className="w-4 h-4 text-gold"/> Analysis Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
