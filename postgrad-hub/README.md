# The Postgraduate Data Hub, Kenya

**From research idea to graduation.** A SaaS platform for Kenyan postgraduate students and researchers, offering research instrument refinement, statistical test selection, an SPSS Academy with rich lessons, done-for-you analysis and interpretation, and expert consultations.

---

## Tech stack

- **Vite** 5.4 + **React** 18.3 + **Tailwind** 3.4
- **React Router** 6.26 for routing
- **@supabase/supabase-js** 2.45 (auth + optional cloud data)
- Data layer: **localStorage** (default) or **Supabase** (production)

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
