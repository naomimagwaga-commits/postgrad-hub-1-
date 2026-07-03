/**
 * ────────────────────────────────────────────────────────────
 *  Vercel serverless function: send-email
 *  POST /api/send-email
 *  ────────────────────────────────────────────────────────────
 *  Uses Resend (https://resend.com) to send transactional emails.
 *
 *  ENV VARS required (set in Vercel Project → Settings → Environment Variables):
 *    RESEND_API_KEY   — your Resend API key (secret, never expose to browser)
 *    ADMIN_EMAIL      — postgraduatedatahub@gmail.com
 *    EMAIL_FROM       — onboarding@resend.dev  (until domain verified)
 *
 *  Request body (JSON):
 *    { template, to, data }
 *
 *  Templates supported:
 *    'payment_claim_student' — receipt for student who just clicked "I've paid"
 *    'payment_claim_admin'   — alert to admin about new claim
 *    'unlock_approved'       — student notification when admin approves
 *
 *  Notes:
 *    - Free tier limits: 100 emails/day, 3000/month
 *    - Errors are returned as JSON (never thrown) so the client can log & continue
 *    - Never blocks the payment flow — email failure MUST NOT prevent unlock
 * ────────────────────────────────────────────────────────────
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

// Basic HTML escaping so injected values can't break the template.
const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// Format KES amount for display (e.g. 1750 → "KES 1,750").
const fmtKES = (n) => {
  if (n == null || Number.isNaN(Number(n))) return '';
  return 'KES ' + Number(n).toLocaleString('en-KE');
};

// Shared HTML shell for all templates (brand-consistent).
const wrap = ({ preheader, title, bodyHtml, ctaLabel, ctaUrl }) => `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:#faf7f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
  <span style="display:none;font-size:1px;color:#faf7f0;">${esc(preheader || '')}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f0;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;box-shadow:0 4px 24px rgba(15,23,42,0.08);overflow:hidden;">
        <tr><td style="background:#0A2E5D;padding:24px 32px;">
          <div style="color:#D4AF37;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">— The Postgraduate Data Hub</div>
          <div style="color:#ffffff;font-size:14px;margin-top:4px;font-weight:600;">Kenya</div>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 16px 0;font-family:Georgia,serif;font-size:26px;color:#0A2E5D;font-weight:700;line-height:1.2;">${esc(title)}</h1>
          ${bodyHtml}
          ${ctaLabel && ctaUrl ? `
            <p style="margin:28px 0;">
              <a href="${esc(ctaUrl)}" style="display:inline-block;background:#D4AF37;color:#0A2E5D;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:12px;font-size:14px;">${esc(ctaLabel)}</a>
            </p>` : ''}
        </td></tr>
        <tr><td style="padding:24px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.6;">
          <p style="margin:0 0 8px 0;"><strong>The Postgraduate Data Hub, Kenya</strong></p>
          <p style="margin:0;">
            📧 <a href="mailto:postgraduatedatahub@gmail.com" style="color:#0A2E5D;">postgraduatedatahub@gmail.com</a>
            &nbsp;·&nbsp; 💬 <a href="https://wa.me/254779568272" style="color:#0A2E5D;">WhatsApp +254 779 568 272</a>
          </p>
          <p style="margin:12px 0 0 0;color:#94a3b8;">Nairobi, Kenya · postgrad-hub-1.vercel.app</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

/* ────────────── Templates ────────────── */

const templates = {
  payment_claim_student: (data) => {
    const name = data.studentName || 'there';
    const item = data.itemName || 'your unlock';
    const amount = fmtKES(data.priceKES);
    return {
      subject: `✅ Payment received — verifying ${item}`,
      html: wrap({
        preheader: 'We got your M-Pesa claim. Verifying now.',
        title: 'Payment received — we\'re verifying it now',
        bodyHtml: `
          <p style="font-size:16px;line-height:1.6;color:#334155;">Hi ${esc(name)},</p>
          <p style="font-size:16px;line-height:1.6;color:#334155;">Thanks for your payment. We've received your claim and our team is verifying it against M-Pesa records right now.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
            <tr><td style="padding:16px 20px;">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#64748b;font-weight:700;margin-bottom:4px;">What you're unlocking</div>
              <div style="font-size:16px;font-weight:700;color:#0A2E5D;">${esc(item)}</div>
              ${amount ? `<div style="font-size:14px;color:#0A2E5D;margin-top:6px;"><strong>${esc(amount)}</strong> via M-Pesa Paybill 4096483 · Account 7028M</div>` : ''}
            </td></tr>
          </table>
          <p style="font-size:15px;line-height:1.6;color:#334155;">You'll get another email as soon as your access is live — usually within a few hours during working hours. If we can't match your payment, we'll reach out on WhatsApp.</p>
          <p style="font-size:14px;line-height:1.6;color:#64748b;margin-top:24px;">If you didn't make this request, please reply to this email or WhatsApp us on +254 779 568 272 straight away.</p>
        `,
      }),
    };
  },

  payment_claim_admin: (data) => {
    const name = data.studentName || 'Unknown';
    const email = data.studentEmail || 'no-email';
    const phone = data.studentPhone || '—';
    const item = data.itemName || 'Unknown item';
    const amount = fmtKES(data.priceKES);
    const claimedAt = data.claimedAt ? new Date(data.claimedAt).toLocaleString('en-GB', { timeZone: 'Africa/Nairobi' }) : new Date().toLocaleString('en-GB');
    return {
      subject: `🔔 Payment claim: ${amount || 'unknown amount'} — ${name}`,
      html: wrap({
        preheader: `${name} claims to have paid ${amount || ''} for ${item}`,
        title: '🔔 New payment claim — please verify',
        bodyHtml: `
          <p style="font-size:16px;line-height:1.6;color:#334155;">A student has clicked "I've paid" and is waiting for you to verify against M-Pesa records.</p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background:#fef3c7;border:2px solid #fde68a;border-radius:12px;">
            <tr><td style="padding:20px;">
              <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#92400e;font-weight:700;margin-bottom:12px;">Amount to verify</div>
              <div style="font-family:Georgia,serif;font-size:32px;font-weight:700;color:#0A2E5D;">${esc(amount || 'Unknown')}</div>
              <div style="font-size:13px;color:#78350f;margin-top:4px;">Paybill 4096483 · Account 7028M</div>
            </td></tr>
          </table>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
            <tr><td style="padding:16px 20px;line-height:1.9;font-size:14px;color:#334155;">
              <div><strong style="color:#64748b;">Student:</strong> ${esc(name)}</div>
              <div><strong style="color:#64748b;">Email:</strong> <a href="mailto:${esc(email)}" style="color:#0A2E5D;">${esc(email)}</a></div>
              <div><strong style="color:#64748b;">Phone:</strong> ${esc(phone)}</div>
              <div><strong style="color:#64748b;">Item:</strong> ${esc(item)}</div>
              <div><strong style="color:#64748b;">Claimed at:</strong> ${esc(claimedAt)}</div>
            </td></tr>
          </table>

          <p style="font-size:14px;line-height:1.6;color:#334155;"><strong>Next steps:</strong></p>
          <ol style="font-size:14px;line-height:1.8;color:#334155;padding-left:20px;">
            <li>Check your M-Pesa business SMS for a payment of <strong>${esc(amount || '???')}</strong></li>
            <li>Open the Admin Dashboard → Unlock requests</li>
            <li>Approve or decline this claim</li>
          </ol>
        `,
        ctaLabel: '→ Open Admin Dashboard',
        ctaUrl: (data.siteUrl || 'https://postgrad-hub-1.vercel.app') + '/app/admin',
      }),
    };
  },

  unlock_approved: (data) => {
    const name = data.studentName || 'there';
    const item = data.itemName || 'your unlock';
    const expiresAt = data.expiresAt
      ? new Date(data.expiresAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      : null;
    return {
      subject: `🎉 Your access is now live — ${item}`,
      html: wrap({
        preheader: 'Payment verified. Log in to start reading.',
        title: '🎉 Your access is live',
        bodyHtml: `
          <p style="font-size:16px;line-height:1.6;color:#334155;">Hi ${esc(name)},</p>
          <p style="font-size:16px;line-height:1.6;color:#334155;">Great news — we've matched your payment against our M-Pesa records and unlocked your access.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background:#ecfdf5;border:2px solid #86efac;border-radius:12px;">
            <tr><td style="padding:20px;">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#065f46;font-weight:700;margin-bottom:4px;">Now unlocked</div>
              <div style="font-size:18px;font-weight:700;color:#0A2E5D;">${esc(item)}</div>
              ${expiresAt ? `<div style="font-size:13px;color:#047857;margin-top:8px;">🗓️ 1 year access · until <strong>${esc(expiresAt)}</strong></div>` : ''}
            </td></tr>
          </table>
          <p style="font-size:15px;line-height:1.6;color:#334155;">Log in to your dashboard to open your notes, work through the examples, and tackle the knowledge check.</p>
          <p style="font-size:13px;line-height:1.6;color:#64748b;margin-top:24px;">Reminder: your account is registered on up to 2 devices (e.g. phone + laptop). Manage them any time in <em>Profile → My Devices</em>.</p>
        `,
        ctaLabel: '→ Open my dashboard',
        ctaUrl: (data.siteUrl || 'https://postgrad-hub-1.vercel.app') + '/app/spss-academy',
      }),
    };
  },
};

/* ────────────── Handler ────────────── */

export default async function handler(req, res) {
  // CORS — allow same-origin from our own site (Vercel handles this automatically for same-origin fetches).
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'Method not allowed' }); return; }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(500).json({ ok: false, error: 'Server missing RESEND_API_KEY env var. Set it in Vercel Project Settings.' });
    return;
  }

  let body = req.body;
  // Vercel usually parses JSON, but be defensive for string bodies.
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const { template, to, data = {} } = body || {};

  if (!template || !templates[template]) {
    res.status(400).json({ ok: false, error: `Unknown template: ${template}` });
    return;
  }
  if (!to) {
    res.status(400).json({ ok: false, error: 'Missing "to" recipient' });
    return;
  }

  const from = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const replyTo = process.env.ADMIN_EMAIL || 'postgraduatedatahub@gmail.com';
  const built = templates[template](data);

  try {
    const rsp = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `The Postgraduate Data Hub <${from}>`,
        to: Array.isArray(to) ? to : [to],
        reply_to: replyTo,
        subject: built.subject,
        html: built.html,
      }),
    });
    const json = await rsp.json().catch(() => ({}));
    if (!rsp.ok) {
      res.status(rsp.status).json({ ok: false, error: json.message || `Resend returned ${rsp.status}`, resend: json });
      return;
    }
    res.status(200).json({ ok: true, id: json.id });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message || 'Unknown fetch error' });
  }
}
