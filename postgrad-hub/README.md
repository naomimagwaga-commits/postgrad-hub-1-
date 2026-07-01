# The Postgraduate Data Hub, Kenya

The trusted research workspace for Kenya's Masters, PhD candidates, lecturers and researchers — from proposal to graduation.

> **Brand:** Deep Blue `#0A2E5D` · Parchment `#FAF7EF` · Gold `#D4AF37`
> **Stack:** React 18 · Vite · Tailwind CSS · React Router

---

## Quick start

```bash
cd postgrad-hub
npm install
npm run dev
```

Open <http://localhost:5173>.

### 🔑 Demo accounts

- **Student:** register with any personal email/password.
- **Admin:** register with an email starting with `admin@` (e.g. `admin@postgraddatahub.co.ke`).
  The Admin Dashboard link will appear in your sidebar.

---

## 💳 M-Pesa Payment Setup

All payments route through M-Pesa Paybill:

- **Paybill:** `4096483`
- **Account number:** `7028M`

Two student flows are supported:
1. **I'll pay myself** — student sees full Paybill instructions, pays from their own phone, taps "I've paid"
2. **Send prompt to my phone** — student enters their Safaricom number; the platform queues a request and shows the same instructions clearly formatted

> 🔌 **STK push (automatic):** When you're ready to enable real Daraja STK push, the unlock flow is structured for it. See `src/components/MpesaModal.jsx`.

---

## Modules

### Module 01 — Data Collection Tools (Questionnaires & Interviews)
Students upload draft questionnaires or interview guides. We refine them and deliver a digital data-collection link.

### Module 02 — Statistical Test Selector
4-question guided decision engine. Each test locked behind M-Pesa unlock.

### Module 03 — SPSS Academy
6 courses × 3–5 lessons. **Notes packs unlock INSTANTLY** after M-Pesa payment — no admin wait. **Video walkthroughs coming soon.**

Two lesson layouts:

1. **Rich Interactive Lessons** (IBM SkillsBuild style) — left sidebar with section list, "Next" pacing, custom SVG diagrams (SPSS dialogs with red arrows, scatter plots, output tables), callouts, key terms, click-to-reveal, embedded knowledge checks. **Pearson correlation** is currently the showcase lesson; others are rolling out next.
2. **Legacy Lessons** — concise notes + resources + standalone quiz. Used for lessons that don't yet have the rich layout.

Each lesson has a **📚 Resources** section populated with excerpts from "The Complete SPSS Handbook for Beginners" by N. K. Magwaga (2026) — split by topic — plus curated external links (Laerd, UCLA OARC, Andy Field, IBM docs).

#### 🔒 Content protection
All lessons run inside a hardened reader that disables right-click save, text copy, drag-to-save, print, devtools shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+S, Ctrl+P, Ctrl+U), and overlays a diagonal watermark with the student's name and email. A toast notification appears if any blocked shortcut is attempted.

### Module 04 — Done-for-You Analysis & Interpretation
Handled by **well-knowledgeable PhD researchers**. Three tiers:
- 📊 **Tables Only** — clean SPSS output
- ✍️ **Interpretation Only** — citation-rich narrative (requires SPSS tables + clean Excel)
- 🎯 **Analysis + Interpretation** — end-to-end findings chapter

Strict requirements surfaced in the order form: clean Excel sheet, objective, well-organised, no missing data.

### Module 05 — Expert Consultations
Slot-picker booking. No durations shown — session length tailored to the learner.

---

## 📖 Guidebook content per SPSS topic

Excerpts from N. K. Magwaga's 398-page guidebook are auto-loaded per lesson via `src/data/guidebookExcerpts.js`. The split was done by chapter:

| Lesson | Chapter(s) |
|---|---|
| SPSS Basics — interface | Ch 16, 17, 20 |
| Variable view | Ch 17, 25 |
| Defining variables | Ch 25, 26, 27 |
| Importing data | Ch 29 |
| Missing values | Ch 27, 34 |
| Frequencies | Ch 44 |
| Central tendency | Ch 42 |
| Dispersion | Ch 43 |
| Charts | Ch 45, 22 |
| Pearson | Ch 64 |
| Spearman | Ch 65 |
| Partial correlation | Ch 66 |
| Correlation matrices | Ch 64, 65 |
| Simple regression | Ch 67 |
| Multiple regression | Ch 68 |
| Regression diagnostics | Ch 68, 69 |
| One-way ANOVA | Ch 57 |
| Post-hoc | Ch 57 |
| Two-way ANOVA | Ch 58 |
| Repeated measures ANOVA | Ch 59 |

> **Reliability lessons** (Cronbach's α, item-total, split-half) — chapters not yet written in the source guidebook. Resources panel shows a placeholder until those are added.

---

## ✏️ Adding your own content per lesson

Edit `src/data/courses.js`. Each `makeLesson(...)` call accepts an extra resources object:

```js
makeLesson('reg-2', 'Multiple regression', '…', [...], [...], [...], 'regression', {
  notesPack: 'https://drive.google.com/your-pdf',
  videoUrl:  'https://www.youtube.com/embed/your-id',
  dataset:   'https://drive.google.com/your-data.sav',
  links: [
    { title: 'Custom link', url: 'https://...' },
  ],
}),
```

The guidebook excerpt is loaded automatically from `guidebookExcerpts.js`.

---

## 🛠️ Admin Operations Dashboard

Eight tabs: Overview · Users · Submissions · Unlock requests (with 💰 Payment claimed badge) · Analysis orders · Bookings · Services · Availability.

---

Built for Kenya's postgraduate community 🇰🇪
