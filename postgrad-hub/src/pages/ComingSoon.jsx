import { Link } from 'react-router-dom';
import { IconArrow, IconSpark } from '../components/Icons.jsx';

export default function ComingSoon({ title, blurb, module }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="card p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-gold/15 text-gold-600 mx-auto flex items-center justify-center">
          <IconSpark className="w-7 h-7"/>
        </div>
        <h1 className="font-serif text-3xl font-bold text-brand mt-5">{title}</h1>
        {module && <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mt-1">{module}</p>}
        <p className="mt-4 text-slate-600 max-w-xl mx-auto">{blurb}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/app/dashboard" className="btn-primary">
            Back to Dashboard <IconArrow className="w-4 h-4"/>
          </Link>
          <Link to="/app/questionnaire" className="btn-outline">
            Try Questionnaire Builder
          </Link>
        </div>
        <p className="mt-8 text-xs text-slate-400">
          Shipping next: full lesson player, quizzes, completion certificates, live calendar booking, and admin dashboard.
        </p>
      </div>
    </div>
  );
}
