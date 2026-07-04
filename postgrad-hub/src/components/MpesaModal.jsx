import { useState } from 'react';
import { MPESA, unlocks } from '../lib/db.js';
import { sendPaymentClaimEmails } from '../lib/emails.js';
import { useAuth } from '../context/AuthContext.jsx';
import { IconCheck, IconClose, IconArrow, IconPhone } from './Icons.jsx';

/**
 * Two-mode payment modal:
 *  1. "Manual" — student pays themselves via paybill, then clicks "I've paid"
 *  2. "Prompt my phone" — student enters number, gets the same instructions
 *     formatted as an SMS-style prompt (real STK push requires Daraja API)
 */
export default function MpesaModal({
  open, onClose, item, onClaimed, // item = { itemKey, itemType, itemName, format, priceKES?, packageInfo? }
}) {
  const { user } = useAuth();
  const [tab, setTab] = useState('paybill'); // paybill | prompt
  const [phone, setPhone] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | requested | promptSent | claimed
  const [requestId, setRequestId] = useState(null);
  // Actual (post-credit) amount + credit applied on this specific request.
  // Populated the moment the unlock row is created via unlocks.request().
  const [effectivePrice, setEffectivePrice] = useState(null);
  const [creditApplied, setCreditApplied] = useState(0);

  if (!open || !item) return null;

  // Display price: the effective (discounted) amount once request is created,
  // otherwise the original item.priceKES from the caller.
  const displayPrice = effectivePrice != null ? effectivePrice : item.priceKES;

  const sendPromptToPhone = async () => {
    if (!phone.match(/^(?:\+?254|0)?7\d{8}$/)) {
      alert('Enter a valid Safaricom number (e.g. 0712345678)'); return;
    }
    const u = await unlocks.request(item);
    setRequestId(u.id);
    setEffectivePrice(u.priceKES);
    setCreditApplied(u.creditApplied || 0);
    setPhase('promptSent');
  };

  const startManual = async () => {
    const u = await unlocks.request(item);
    setRequestId(u.id);
    setEffectivePrice(u.priceKES);
    setCreditApplied(u.creditApplied || 0);
    setPhase('requested');
  };

  const markAsPaid = async () => {
    if (requestId) await unlocks.claimPaid(requestId);
    // Fire-and-forget: send the receipt to the student AND alert to admin.
    // Never awaited — even if the email service is down, the payment claim still succeeds.
    sendPaymentClaimEmails({
      studentEmail: user?.email,
      studentName:  user?.name,
      studentPhone: user?.phone,
      itemName:     item.itemName,
      priceKES:     displayPrice,   // effective (post-credit) amount for the email
      claimedAt:    new Date().toISOString(),
    }).catch(() => { /* logged inside helper */ });
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
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {item.format && (
                <span className="badge bg-gold/15 text-gold-200 capitalize">{item.format}</span>
              )}
              {displayPrice != null && (
                <span className="badge bg-gold text-brand font-bold">
                  KES {displayPrice.toLocaleString('en-KE')}
                </span>
              )}
              {creditApplied > 0 && (
                <span className="badge bg-emerald-500 text-white font-bold text-[10px]">
                  🎁 KES {creditApplied} credit applied
                </span>
              )}
              {item.itemType === 'package' && (
                <span className="badge bg-emerald-500/20 text-emerald-300">Package deal</span>
              )}
            </div>
            {creditApplied > 0 && (
              <p className="text-[11px] text-gold-300 mt-2">
                Was KES {item.priceKES.toLocaleString('en-KE')} — you save KES {creditApplied} thanks to your referral credit.
              </p>
            )}
          </div>
        </div>

        <div className="p-6">
          {phase === 'claimed' ? (
            <SuccessPanel item={item} />
          ) : phase === 'requested' || phase === 'promptSent' ? (
            <PaymentInstructions
              promptSent={phase === 'promptSent'} phone={phone}
              amount={displayPrice}
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

function PaymentInstructions({ promptSent, phone, amount, onMarkPaid }) {
  return (
    <div className="space-y-5">
      {promptSent && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-800">
          📲 A payment instruction has been queued for <strong>{phone}</strong>.
          Follow the steps below to complete the payment.
        </div>
      )}

      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-800 flex items-start gap-2">
        <span className="text-lg leading-none">♾️</span>
        <div>
          <p className="font-bold">1 year access — from the day admin approves your payment</p>
          <p className="text-xs text-emerald-700 mt-0.5">
            Your access never expires. Log in from any device (one at a time).
          </p>
        </div>
      </div>

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
            <span>
              Enter amount{' '}
              {amount != null
                ? <strong className="font-mono text-brand">KES {amount.toLocaleString('en-KE')}</strong>
                : <span className="italic">(shown on the previous screen)</span>}
              , then your M-Pesa PIN
            </span>
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

function SuccessPanel() {
  return (
    <div className="text-center py-6">
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
        <IconCheck className="w-8 h-8"/>
      </div>
      <p className="display text-2xl text-brand mt-5">
        Payment received — thank you!
      </p>
      <p className="text-sm text-slate-600 mt-3 max-w-sm mx-auto leading-relaxed">
        We've been notified of your payment. Our team will verify it against our M-Pesa records and unlock your access — usually within a few minutes to a few hours.
      </p>
      <div className="mt-5 p-4 rounded-xl bg-gold/5 border border-gold/30 text-left max-w-sm mx-auto">
        <p className="text-xs font-bold uppercase tracking-wider text-gold-700 mb-2">What happens next</p>
        <ol className="text-xs text-slate-600 space-y-1.5 list-decimal pl-4">
          <li>You'll receive a confirmation email shortly.</li>
          <li>Our admin verifies your M-Pesa payment.</li>
          <li>You'll get another email once your access is live.</li>
          <li>Reload your dashboard — the unlock appears immediately.</li>
        </ol>
      </div>
      <p className="text-xs text-emerald-700 mt-4 font-semibold">
        ✓ 1 year access — from the day admin approves your payment
      </p>
      <p className="text-xs text-slate-400 mt-5">
        Payment issue or waiting more than 24 hours?{' '}
        <a href="https://wa.me/254779568272?text=I%27m%20having%20trouble%20with%20a%20payment."
           target="_blank" rel="noopener noreferrer"
           className="text-gold-700 font-semibold hover:underline">
          WhatsApp us on +254 779 568 272
        </a>
      </p>
    </div>
  );
}
