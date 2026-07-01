import { useState } from 'react';
import { MPESA, unlocks } from '../lib/db.js';
import { IconCheck, IconClose, IconArrow, IconPhone } from './Icons.jsx';

/**
 * Two-mode payment modal:
 *  1. "Manual" — student pays themselves via paybill, then clicks "I've paid"
 *  2. "Prompt my phone" — student enters number, gets the same instructions
 *     formatted as an SMS-style prompt (real STK push requires Daraja API)
 */
export default function MpesaModal({
  open, onClose, item, onClaimed, // item = { itemKey, itemType, itemName, format }
}) {
  const [tab, setTab] = useState('paybill'); // paybill | prompt
  const [phone, setPhone] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | requested | promptSent | claimed
  const [requestId, setRequestId] = useState(null);

  if (!open || !item) return null;

  const sendPromptToPhone = async () => {
    if (!phone.match(/^(?:\+?254|0)?7\d{8}$/)) {
      alert('Enter a valid Safaricom number (e.g. 0712345678)'); return;
    }
    const u = await unlocks.request(item);
    setRequestId(u.id);
    setPhase('promptSent');
    // In production, this is where you'd trigger an STK push via Safaricom Daraja API.
    // For now, we simulate that the student has received clear instructions.
  };

  const startManual = async () => {
    const u = await unlocks.request(item);
    setRequestId(u.id);
    setPhase('requested');
  };

  const markAsPaid = async () => {
    if (requestId) await unlocks.claimPaid(requestId);
    setPhase('claimed');
    setTimeout(() => { onClaimed?.(); onClose(); }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-elevated w-full max-w-md overflow-hidden reveal max-h-[90vh] overflow-y-auto">
        <div className="bg-ink text-white p-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/20 rounded-full blur-3xl"/>
          <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white">
            <IconClose className="w-5 h-5"/>
          </button>
          <div className="relative">
            <span className="eyebrow text-gold-300">— Pay with M-Pesa</span>
            <h3 className="display text-2xl mt-2">{item.itemName}</h3>
            {item.format && (
              <span className="badge bg-gold/15 text-gold-200 mt-2 capitalize">{item.format}</span>
            )}
          </div>
        </div>

        <div className="p-6">
          {phase === 'claimed' ? (
            <SuccessPanel item={item} />
          ) : phase === 'requested' || phase === 'promptSent' ? (
            <PaymentInstructions
              promptSent={phase === 'promptSent'} phone={phone}
              onMarkPaid={markAsPaid}
            />
          ) : (
            <>
              {/* Mode tabs */}
              <div className="flex gap-1 bg-slate-100 rounded-xl p-1 text-xs mb-5">
                <button onClick={() => setTab('paybill')}
                  className={`flex-1 px-3 py-2 rounded-lg font-bold transition ${
                    tab === 'paybill' ? 'bg-white shadow-sm text-brand' : 'text-slate-500'
                  }`}>I'll pay myself</button>
                <button onClick={() => setTab('prompt')}
                  className={`flex-1 px-3 py-2 rounded-lg font-bold transition ${
                    tab === 'prompt' ? 'bg-white shadow-sm text-brand' : 'text-slate-500'
                  }`}>Send prompt to my phone</button>
              </div>

              {tab === 'paybill' && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">
                    Use M-Pesa on your phone. You'll find these details on the next screen too.
                  </p>
                  <PaybillCard />
                  <button onClick={startManual} className="btn-gold w-full py-3.5">
                    Show full instructions <IconArrow className="w-4 h-4"/>
                  </button>
                </div>
              )}

              {tab === 'prompt' && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">
                    Enter your Safaricom number and we'll send a payment prompt straight to your phone.
                  </p>
                  <div>
                    <label className="label">Safaricom number</label>
                    <div className="relative">
                      <IconPhone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)}
                        placeholder="0712 345 678" className="input pl-11"/>
                    </div>
                  </div>
                  <button onClick={sendPromptToPhone} className="btn-gold w-full py-3.5">
                    Send prompt <IconArrow className="w-4 h-4"/>
                  </button>
                  <p className="text-[11px] text-center text-slate-400">
                    By proceeding you authorise us to send M-Pesa payment instructions to this number.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PaybillCard() {
  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/30 border border-emerald-200">
      <p className="text-xs uppercase tracking-wider font-bold text-emerald-700 mb-3">M-Pesa Paybill</p>
      <div className="space-y-3">
        <Row label="Business / Paybill no." value={MPESA.paybill}/>
        <Row label="Account number" value={MPESA.accountNumber}/>
        <Row label="Payee" value={MPESA.businessName}/>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  const copy = () => navigator.clipboard.writeText(value);
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-slate-600">{label}</span>
      <button onClick={copy}
        className="font-mono text-base font-bold text-brand bg-white px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition">
        {value}
      </button>
    </div>
  );
}

function PaymentInstructions({ promptSent, phone, onMarkPaid }) {
  return (
    <div className="space-y-5">
      {promptSent && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-800">
          📲 A payment instruction has been queued for <strong>{phone}</strong>.
          Follow the steps below to complete the payment.
        </div>
      )}

      <PaybillCard />

      <div>
        <p className="text-xs uppercase tracking-wider font-bold text-brand mb-3">How to pay</p>
        <ol className="space-y-2.5 text-sm text-slate-700">
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-gold text-brand font-bold text-xs flex items-center justify-center shrink-0">1</span>
            <span>Open <strong>M-Pesa</strong> on your phone</span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-gold text-brand font-bold text-xs flex items-center justify-center shrink-0">2</span>
            <span>Select <strong>Lipa na M-Pesa</strong> → <strong>Pay Bill</strong></span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-gold text-brand font-bold text-xs flex items-center justify-center shrink-0">3</span>
            <span>Enter Business Number: <strong className="font-mono text-brand">{MPESA.paybill}</strong></span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-gold text-brand font-bold text-xs flex items-center justify-center shrink-0">4</span>
            <span>Enter Account Number: <strong className="font-mono text-brand">{MPESA.accountNumber}</strong></span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-gold text-brand font-bold text-xs flex items-center justify-center shrink-0">5</span>
            <span>Enter the amount we'll send to your phone / email, then your M-Pesa PIN</span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-gold text-brand font-bold text-xs flex items-center justify-center shrink-0">6</span>
            <span>Once you receive the M-Pesa confirmation SMS, tap <strong>"I've paid"</strong> below</span>
          </li>
        </ol>
      </div>

      <button onClick={onMarkPaid} className="btn-gold w-full py-3.5">
        <IconCheck className="w-4 h-4"/> I've paid
      </button>
      <p className="text-[11px] text-center text-slate-400">
        We'll confirm receipt and unlock your access within a few minutes during business hours.
      </p>
    </div>
  );
}

function SuccessPanel({ item }) {
  const isInstant = item?.itemType === 'lesson' && item?.format === 'notes';
  return (
    <div className="text-center py-6">
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
        <IconCheck className="w-8 h-8"/>
      </div>
      <p className="display text-2xl text-brand mt-5">
        {isInstant ? 'Unlocked!' : 'Thank you!'}
      </p>
      <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">
        {isInstant
          ? '🎉 Your notes pack is now available. The lesson opens automatically in a moment.'
          : 'We\'ve noted your payment. You\'ll see your unlock appear as soon as our team confirms it.'}
      </p>
    </div>
  );
}
