import { useEffect, useState } from 'react';
import { admin, bookings, BOOKING_STATUSES } from '../lib/db.js';
import {
  IconCalendar, IconArrow, IconCheck, IconClose,
} from '../components/Icons.jsx';

const SERVICE_DESCS = {
  'srv-quest': 'One-on-one help building a defensible research instrument.',
  'srv-anal':  'Run the right analysis on your dataset — with you, step by step.',
  'srv-int':   'Translate SPSS output into a publishable findings section.',
  'srv-thes':  'Critical reading of your chapters with actionable feedback.',
  'srv-cons':  'General methodology guidance for any stage of your project.',
};
const SERVICE_ICONS = {
  'srv-quest': '📋', 'srv-anal': '📊', 'srv-int': '🔍', 'srv-thes': '📚', 'srv-cons': '🎓',
};

export default function Consultations() {
  const [view, setView] = useState('catalog');
  const [services, setServices] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [activeService, setActiveService] = useState(null);

  const refresh = async () => {
    setServices(await admin.getServices());
    setMyBookings(await bookings.list());
  };
  useEffect(() => { refresh(); }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <span className="eyebrow">— Module 04</span>
          <h1 className="display text-4xl lg:text-5xl text-brand mt-2">Expert Consultations</h1>
          <p className="mt-3 text-slate-600 max-w-2xl leading-relaxed">
            Book one-on-one sessions with our research team. Sessions are tailored to each learner's needs and held over Zoom or Google Meet.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView('catalog')}
            className={view === 'catalog' ? 'btn-primary' : 'btn-outline'}>
            Services
          </button>
          <button onClick={() => setView('mine')}
            className={view === 'mine' ? 'btn-primary' : 'btn-outline'}>
            My bookings ({myBookings.length})
          </button>
        </div>
      </div>

      {view === 'catalog' && (
        <Catalog services={services.filter((s) => s.active)}
          onBook={(s) => { setActiveService(s); setView('book'); }}/>
      )}
      {view === 'book' && activeService && (
        <BookingFlow service={activeService}
          onDone={async () => { await refresh(); setView('mine'); }}
          onCancel={() => setView('catalog')}/>
      )}
      {view === 'mine' && (
        <MyBookings list={myBookings} onBookNew={() => setView('catalog')}/>
      )}
    </div>
  );
}

function Catalog({ services, onBook }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {services.map((s, i) => (
        <div key={s.id}
          className="card-elevated p-7 hover:border-gold/40 hover:-translate-y-1 transition-all reveal"
          style={{ animationDelay: `${i * 0.06}s` }}>
          <div className="text-4xl">{SERVICE_ICONS[s.id] || '🎓'}</div>
          <h3 className="display text-xl text-brand mt-4">{s.name}</h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed min-h-[3rem]">
            {SERVICE_DESCS[s.id] || 'Tailored research support.'}
          </p>
          <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between gap-2">
            <span className="text-xs text-gold-700 font-semibold uppercase tracking-wider">Price on request</span>
            <button onClick={() => onBook(s)} className="btn-gold text-sm">
              Book <IconArrow className="w-4 h-4"/>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function BookingFlow({ service, onDone, onCancel }) {
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState(null);
  const [notes, setNotes] = useState('');
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  const minDate = new Date().toISOString().slice(0, 10);
  const maxDateObj = new Date(); maxDateObj.setDate(maxDateObj.getDate() + 30);
  const maxDate = maxDateObj.toISOString().slice(0, 10);

  useEffect(() => {
    if (!date) { setSlots([]); return; }
    setLoading(true);
    bookings.availableSlots(date).then((s) => { setSlots(s); setLoading(false); });
  }, [date]);

  const submit = async () => {
    if (!date || !slot) return;
    const b = await bookings.create({
      serviceId: service.id, serviceName: service.name,
      date, time: slot, notes,
    });
    setConfirmed(b);
  };

  if (confirmed) {
    return (
      <div className="card-elevated p-10 lg:p-14 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
          <IconCheck className="w-8 h-8"/>
        </div>
        <h2 className="display text-3xl text-brand mt-6">Booking received</h2>
        <p className="text-slate-600 mt-3 max-w-md mx-auto">
          We'll confirm your slot and send a meeting link within 24 hours. You'll see it under <strong>My bookings</strong>.
        </p>
        <div className="mt-8 inline-block text-left p-5 rounded-2xl bg-brand/5 border border-brand/10">
          <p className="font-display font-bold text-brand">{confirmed.serviceName}</p>
          <p className="text-sm text-slate-600 mt-1">
            {new Date(confirmed.date + 'T' + confirmed.time).toLocaleDateString('en-GB',
              { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            {' at '}{confirmed.time}
          </p>
        </div>
        <div className="mt-8">
          <button onClick={onDone} className="btn-primary">View my bookings <IconArrow className="w-4 h-4"/></button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-elevated p-8 lg:p-10">
      <button onClick={onCancel} className="text-sm text-slate-500 hover:text-brand mb-6">← Back to services</button>
      <div className="flex items-start gap-4">
        <div className="text-4xl">{SERVICE_ICONS[service.id] || '🎓'}</div>
        <div>
          <span className="eyebrow">— Booking</span>
          <h2 className="display text-3xl text-brand mt-2">{service.name}</h2>
          <p className="text-sm text-slate-500 mt-1">Online or in person · Length tailored to your needs</p>
        </div>
      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="label">Pick a date</label>
            <input type="date" min={minDate} max={maxDate} value={date}
              onChange={(e) => { setDate(e.target.value); setSlot(null); }}
              className="input"/>
            <p className="text-xs text-slate-500 mt-1.5">Available within the next 30 days.</p>
          </div>
          <div>
            <label className="label">Notes for our team (optional)</label>
            <textarea rows={4} className="input" value={notes} onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 'I want help interpreting my regression output' or 'Working on Chapter 4'"/>
          </div>
        </div>

        <div>
          <label className="label">Pick a time slot</label>
          {!date && (
            <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center text-sm text-slate-500">
              Select a date first to see available slots.
            </div>
          )}
          {date && loading && (
            <div className="p-6 text-center text-sm text-slate-500">Loading slots…</div>
          )}
          {date && !loading && slots.length === 0 && (
            <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center text-sm text-slate-500">
              No slots available on this day. Try another date.
            </div>
          )}
          {date && slots.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {slots.map((t) => (
                <button key={t} onClick={() => setSlot(t)}
                  className={`py-3 rounded-xl text-sm font-bold transition border-2 ${
                    slot === t ? 'bg-gold text-brand border-gold shadow-gold' :
                    'border-slate-200 hover:border-gold/50 text-brand'
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-slate-500">No payment required to book. We'll send an invoice once your session is confirmed.</p>
        <button onClick={submit} disabled={!date || !slot} className="btn-gold">
          Confirm booking <IconArrow className="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
}

function MyBookings({ list, onBookNew }) {
  if (list.length === 0) {
    return (
      <div className="card-elevated p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-brand/5 mx-auto flex items-center justify-center">
          <IconCalendar className="w-8 h-8 text-brand"/>
        </div>
        <h2 className="display text-2xl text-brand mt-5">No bookings yet</h2>
        <p className="text-slate-600 mt-2 max-w-md mx-auto">
          Pick a service and lock in a session that fits your timeline.
        </p>
        <button onClick={onBookNew} className="btn-gold mt-6">
          Browse services <IconArrow className="w-4 h-4"/>
        </button>
      </div>
    );
  }

  const sorted = [...list].sort((a, b) =>
    new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));

  return (
    <div className="space-y-3">
      {sorted.map((b) => {
        const stat = BOOKING_STATUSES.find((s) => s.id === b.status);
        const colorMap = {
          amber: 'bg-amber-100 text-amber-700',
          emerald: 'bg-emerald-100 text-emerald-700',
          brand: 'bg-brand/10 text-brand',
          slate: 'bg-slate-100 text-slate-600',
        };
        return (
          <div key={b.id} className="card-elevated p-5 lg:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-ink text-gold flex flex-col items-center justify-center shrink-0">
              <span className="text-[10px] uppercase tracking-wider font-bold">
                {new Date(b.date).toLocaleDateString('en-GB', { month: 'short' })}
              </span>
              <span className="text-2xl font-display font-bold leading-none">
                {new Date(b.date).getDate()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-brand text-lg">{b.serviceName}</p>
              <p className="text-sm text-slate-500">
                {new Date(b.date + 'T' + b.time).toLocaleDateString('en-GB',
                  { weekday: 'long', day: 'numeric', month: 'long' })}
                {' · '}{b.time}
              </p>
              {b.notes && <p className="text-xs text-slate-400 mt-1 line-clamp-1">"{b.notes}"</p>}
            </div>
            <span className={`badge ${colorMap[stat.color]} shrink-0`}>{stat.label}</span>
          </div>
        );
      })}
    </div>
  );
}
