import { useState } from 'react';
import { ILLUSTRATIONS } from './Illustrations.jsx';
import { IconCheck, IconArrow } from '../Icons.jsx';

/**
 * Renders a single typed content block.
 * All text rendered via spans to make casual copy-paste harder.
 */
export function Block({ block, onCheckAnswered }) {
  switch (block.type) {
    case 'heading':
      return block.level === 3
        ? <h3 className="display text-xl text-brand mt-8 mb-3">{wrap(block.text)}</h3>
        : <h2 className="display text-2xl lg:text-3xl text-brand mt-2 mb-4">{wrap(block.text)}</h2>;

    case 'paragraph':
      return <p className="text-slate-700 leading-relaxed mb-4 text-[15px]">{renderInline(block.text)}</p>;

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag className={`mb-5 space-y-2 ${block.ordered ? 'list-decimal pl-6 marker:text-gold marker:font-bold' : 'pl-1'}`}>
          {block.items.map((it, i) => (
            <li key={i} className={`text-[15px] text-slate-700 leading-relaxed ${block.ordered ? '' : 'flex items-start gap-3'}`}>
              {!block.ordered && <span className="text-gold mt-1.5">●</span>}
              <span>{renderInline(it)}</span>
            </li>
          ))}
        </Tag>
      );
    }

    case 'callout': {
      const tones = {
        info:    { bg: 'bg-blue-50',    border: 'border-blue-200',    title: 'text-blue-800',    body: 'text-blue-900',    icon: 'ℹ️' },
        warning: { bg: 'bg-amber-50',   border: 'border-amber-200',   title: 'text-amber-800',   body: 'text-amber-900',   icon: '⚠️' },
        success: { bg: 'bg-emerald-50', border: 'border-emerald-200', title: 'text-emerald-800', body: 'text-emerald-900', icon: '✅' },
        gold:    { bg: 'bg-gold/10',    border: 'border-gold/40',     title: 'text-gold-700',    body: 'text-brand',       icon: '🎯' },
      };
      const t = tones[block.tone] || tones.info;
      return (
        <div className={`my-6 p-5 rounded-2xl border-2 ${t.bg} ${t.border}`}>
          <p className={`font-display font-bold flex items-center gap-2 ${t.title}`}>
            <span className="text-xl">{t.icon}</span> {wrap(block.title)}
          </p>
          <div className={`mt-2 text-[15px] leading-relaxed ${t.body} space-y-3`}>
            {Array.isArray(block.body)
              ? block.body.map((p, i) => <p key={i}>{renderInline(p)}</p>)
              : <p>{renderInline(block.body)}</p>}
          </div>
        </div>
      );
    }

    case 'twoCol':
      return (
        <div className="grid md:grid-cols-2 gap-4 my-6">
          {[block.left, block.right].map((side, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200">
              <p className="font-display font-bold text-brand">{wrap(side.title)}</p>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{renderInline(side.body)}</p>
            </div>
          ))}
        </div>
      );

    case 'keyterm':
      return (
        <div className="my-6 p-6 rounded-2xl bg-gradient-to-br from-brand to-brand-600 text-white relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/20 rounded-full blur-2xl"/>
          <p className="relative text-xs uppercase tracking-[0.2em] font-bold text-gold-300">Key term</p>
          <p className="relative display text-xl mt-2 text-gold">{wrap(block.term)}</p>
          <p className="relative mt-3 text-sm text-brand-100/90 leading-relaxed">{renderInline(block.definition)}</p>
        </div>
      );

    case 'reveal':
      return <RevealBlock prompt={block.prompt} answer={block.answer}/>;

    case 'illustration': {
      const Comp = ILLUSTRATIONS[block.component];
      if (!Comp) return null;
      return (
        <figure className="my-6">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 select-none">
            <Comp/>
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-xs text-slate-500 italic text-center">{renderInline(block.caption)}</figcaption>
          )}
        </figure>
      );
    }

    case 'steps':
      return (
        <ol className="my-6 space-y-3">
          {block.steps.map((s, i) => (
            <li key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-gold/30 transition">
              <div className="w-9 h-9 rounded-full bg-gold text-brand font-bold text-sm flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <div>
                <p className="font-display font-bold text-brand">{wrap(s.title)}</p>
                <div className="text-sm text-slate-600 mt-1 leading-relaxed space-y-2">
                  {Array.isArray(s.body)
                    ? s.body.map((p, j) => <p key={j}>{renderInline(p)}</p>)
                    : <p>{renderInline(s.body)}</p>}
                </div>
              </div>
            </li>
          ))}
        </ol>
      );

    case 'apa':
      return (
        <div className="my-6 p-6 rounded-2xl bg-parchment border-l-4 border-gold relative">
          <p className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gold text-brand text-xs font-bold uppercase tracking-wider">
            APA-style
          </p>
          <p className="text-[15px] text-slate-700 leading-relaxed font-serif italic">{renderInline(block.text)}</p>
        </div>
      );

    case 'check':
      return <CheckBlock block={block} onAnswered={onCheckAnswered}/>;

    /* ───── NEW DEEPER-TEACHING BLOCKS ───── */

    case 'scene':
      return (
        <div className="my-6 p-6 rounded-2xl bg-gradient-to-br from-parchment to-gold/5 border-l-4 border-gold/60">
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-gold-700 mb-3 flex items-center gap-2">
            <span className="text-base">🎬</span> A scene before any definition
          </p>
          <div className="space-y-3 text-[15px] text-slate-800 leading-relaxed font-serif">
            {Array.isArray(block.body)
              ? block.body.map((p, i) => <p key={i}>{renderInline(p)}</p>)
              : <p>{renderInline(block.body)}</p>}
          </div>
        </div>
      );

    case 'definition':
      return (
        <div className="my-6 p-6 rounded-2xl bg-white border-2 border-brand-100">
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand mb-2 flex items-center gap-2">
            <span className="text-base">📘</span> Plain-English definition
          </p>
          <p className="display text-xl text-brand">{wrap(block.term)}</p>
          <p className="mt-3 text-[15px] text-slate-700 leading-relaxed">{renderInline(block.body)}</p>
        </div>
      );

    case 'analogy':
      return (
        <div className="my-6 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-emerald-700 mb-2 flex items-center gap-2">
            <span className="text-base">💡</span> Analogy — {wrap(block.title)}
          </p>
          <p className="text-[15px] text-emerald-900 leading-relaxed">{renderInline(block.body)}</p>
        </div>
      );

    case 'why':
      return (
        <div className="my-5 p-5 rounded-xl bg-blue-50/60 border-l-4 border-blue-300">
          <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-blue-700 mb-2">
            Why this matters
          </p>
          <p className="text-[15px] text-blue-950 leading-relaxed">{renderInline(block.body)}</p>
        </div>
      );

    case 'workedExample':
      return (
        <div className="my-6 rounded-2xl border-2 border-slate-200 bg-white overflow-hidden">
          <div className="px-6 py-3 bg-brand text-white">
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-gold-300">Worked example</p>
            <p className="display text-lg mt-0.5">{wrap(block.title)}</p>
          </div>
          <div className="p-6 space-y-4">
            {block.body.map((step, i) => (
              <div key={i}>
                {step.label && (
                  <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-gold-700 mb-1.5">
                    {wrap(step.label)}
                  </p>
                )}
                <p className="text-[15px] text-slate-700 leading-relaxed">{renderInline(step.text)}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'comparison':
      return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-brand text-white">
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-display font-bold">{wrap(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {block.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-4 py-3 text-slate-700 align-top ${ci === 0 ? 'font-bold text-brand' : ''}`}>
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'mistake':
      return (
        <div className="my-6 p-5 rounded-2xl bg-red-50/60 border-l-4 border-red-400">
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-red-700 mb-2 flex items-center gap-2">
            <span className="text-base">🚫</span> Common student mistake
          </p>
          <p className="font-display font-bold text-red-900 text-base">{wrap(block.title)}</p>
          <p className="mt-2 text-[15px] text-red-950 leading-relaxed">{renderInline(block.body)}</p>
          {block.fix && (
            <p className="mt-3 text-[14px] text-emerald-800 leading-relaxed pt-3 border-t border-red-200">
              <span className="font-bold">✓ The fix:</span> {renderInline(block.fix)}
            </p>
          )}
        </div>
      );

    case 'reviewerComments':
      return (
        <div className="my-6 p-5 rounded-2xl bg-purple-50/60 border border-purple-200">
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span className="text-base">🎓</span> Reviewer / examiner comments to anticipate
          </p>
          <ul className="space-y-3">
            {block.items.map((it, i) => (
              <li key={i} className="text-sm text-purple-950 leading-relaxed">
                <p className="font-bold italic">"{wrap(it.q)}"</p>
                <p className="mt-1 text-purple-800">→ {renderInline(it.a)}</p>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'decision':
      return (
        <div className="my-6 p-6 rounded-2xl bg-gradient-to-br from-ink to-brand text-white">
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-gold-300 mb-3 flex items-center gap-2">
            <span className="text-base">🧭</span> Decision tree
          </p>
          <p className="display text-lg mb-4 text-gold">{wrap(block.title)}</p>
          <ul className="space-y-3">
            {block.branches.map((b, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="display text-lg text-gold shrink-0">{b.condition}</span>
                <span className="text-sm text-brand-100 leading-relaxed pt-1">→ {renderInline(b.action)}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'summary':
      return (
        <div className="my-6 p-6 rounded-2xl bg-gold/10 border-2 border-gold/30">
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-gold-700 mb-3">
            ✓ Section summary — what to remember
          </p>
          <ul className="space-y-2">
            {block.items.map((it, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] text-slate-800 leading-relaxed">
                <IconCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"/>
                <span>{renderInline(it)}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    default:
      return null;
  }
}

/* ───────── Reveal ───────── */
function RevealBlock({ prompt, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-6 p-5 rounded-2xl bg-white border-2 border-dashed border-gold/40">
      <p className="font-display font-bold text-brand flex items-center gap-2">
        <span className="text-xl">💡</span> {wrap(prompt)}
      </p>
      {!open ? (
        <button onClick={() => setOpen(true)} className="mt-3 btn-outline text-sm">
          Show answer <IconArrow className="w-4 h-4"/>
        </button>
      ) : (
        <div className="mt-4 p-4 rounded-xl bg-gold/10 text-[15px] text-brand leading-relaxed">
          {renderInline(answer)}
        </div>
      )}
    </div>
  );
}

/* ───────── Knowledge check (single question) ───────── */
function CheckBlock({ block, onAnswered }) {
  const [picked, setPicked] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (picked === null) return;
    setSubmitted(true);
    onAnswered?.(picked === block.answer);
  };

  return (
    <div className="my-5 p-5 rounded-2xl border-2 border-slate-200 bg-white">
      <p className="font-bold text-brand">{wrap(block.question)}</p>
      <div className="mt-4 space-y-2">
        {block.choices.map((c, ci) => {
          const correct = submitted && ci === block.answer;
          const wrong = submitted && picked === ci && ci !== block.answer;
          const sel = picked === ci;
          return (
            <button key={ci} onClick={() => !submitted && setPicked(ci)}
              className={`w-full text-left p-3 rounded-xl border-2 text-sm flex items-center gap-3 transition ${
                correct ? 'border-emerald-400 bg-emerald-50 text-emerald-800' :
                wrong ? 'border-red-300 bg-red-50 text-red-800' :
                sel ? 'border-gold bg-gold/10 text-brand' :
                'border-slate-200 hover:border-brand-200'
              } ${submitted ? 'cursor-default' : ''}`}>
              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                correct ? 'border-emerald-500 bg-emerald-500 text-white' :
                wrong ? 'border-red-400 bg-red-400 text-white' :
                sel ? 'border-gold bg-gold text-brand' : 'border-slate-300'
              }`}>{String.fromCharCode(65 + ci)}</span>
              <span>{wrap(c)}</span>
            </button>
          );
        })}
      </div>
      {!submitted ? (
        <button onClick={submit} disabled={picked === null}
          className="btn-primary mt-4 text-sm">Submit answer</button>
      ) : (
        <div className={`mt-4 p-4 rounded-xl text-sm leading-relaxed ${
          picked === block.answer ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900'
        }`}>
          <p className="font-bold mb-1">
            {picked === block.answer ? '✓ Correct' : '✕ Not quite'}
          </p>
          {renderInline(block.explanation)}
        </div>
      )}
    </div>
  );
}

/**
 * Render inline text with **bold** and *italic* markdown-lite support,
 * still wrapped in a copy-resisting span.
 */
function renderInline(text) {
  if (!text || typeof text !== 'string') return text;
  // Tokenise on **bold** and *italic*
  const parts = [];
  let i = 0;
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let m;
  let last = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ t: 'p', s: text.slice(last, m.index) });
    const seg = m[0];
    if (seg.startsWith('**')) parts.push({ t: 'b', s: seg.slice(2, -2) });
    else                       parts.push({ t: 'i', s: seg.slice(1, -1) });
    last = m.index + seg.length;
  }
  if (last < text.length) parts.push({ t: 'p', s: text.slice(last) });

  return (
    <span data-pgh="1">
      {parts.map((p, idx) => {
        if (p.t === 'b') return <strong key={idx} className="font-bold text-brand">{p.s}</strong>;
        if (p.t === 'i') return <em key={idx} className="italic">{p.s}</em>;
        return <span key={idx}>{p.s}</span>;
      })}
    </span>
  );
}

/* Simple wrapper for plain titles where we don't need markdown */
function wrap(text) {
  if (!text || typeof text !== 'string') return text;
  return <span data-pgh="1">{text}</span>;
}
