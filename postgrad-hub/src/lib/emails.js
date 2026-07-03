/**
 * Thin client wrapper around /api/send-email.
 *
 * IMPORTANT: email failures must NEVER block the user flow.
 * All functions swallow errors and log them, returning a boolean.
 */

const ADMIN_EMAIL = 'postgraduatedatahub@gmail.com';

const sendTemplate = async (template, to, data = {}) => {
  try {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const rsp = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ template, to, data: { ...data, siteUrl } }),
    });
    const json = await rsp.json().catch(() => ({}));
    if (!rsp.ok || !json.ok) {
      console.warn('[emails] send failed', template, json);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('[emails] fetch error', template, e);
    return false;
  }
};

/**
 * When a student clicks "I've paid" in the M-Pesa modal.
 * Sends BOTH the student receipt AND the admin alert (fire-and-forget).
 */
export const sendPaymentClaimEmails = async ({ studentEmail, studentName, studentPhone, itemName, priceKES, claimedAt }) => {
  // Student receipt.
  if (studentEmail) {
    sendTemplate('payment_claim_student', studentEmail, {
      studentName, itemName, priceKES,
    });
  }
  // Admin alert.
  sendTemplate('payment_claim_admin', ADMIN_EMAIL, {
    studentName, studentEmail, studentPhone, itemName, priceKES, claimedAt,
  });
};

/**
 * When admin clicks "Approve" in the admin dashboard.
 */
export const sendUnlockApprovedEmail = async ({ studentEmail, studentName, itemName, expiresAt }) => {
  if (!studentEmail) return false;
  return sendTemplate('unlock_approved', studentEmail, {
    studentName, itemName, expiresAt,
  });
};
