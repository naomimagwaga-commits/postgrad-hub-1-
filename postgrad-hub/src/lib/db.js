/**
 * Unified data layer.
 * - Default backend: localStorage (works out of the box, no setup).
 * - Switch by setting VITE_BACKEND=supabase in .env.
 */

import { createClient } from '@supabase/supabase-js';

const BACKEND = import.meta.env.VITE_BACKEND || 'local';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabase = BACKEND === 'supabase' && SUPABASE_URL && SUPABASE_KEY;
export const supabase = isSupabase ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

/* ---------------- Single-active-session helpers ---------------- */
const SESSION_TOKEN_KEY = 'pgh_session_token';
const DEVICE_ID_KEY = 'pgh_device_id';
const DEVICE_NAME_KEY = 'pgh_device_name';

// Max devices allowed per account (phone + laptop = 2).
export const MAX_DEVICES_PER_USER = 2;

// Access duration for paid lesson unlocks — 1 year from purchase approval.
export const ACCESS_DURATION_DAYS = 365;

/**
 * ADMIN ALLOW-LIST
 * Any email in this list becomes admin automatically on register OR login.
 * Case-insensitive. Add more emails here if you ever need co-admins.
 */
const ADMIN_EMAILS = [
  'postgraduatedatahub@gmail.com',
];

// Also allow legacy "admin@" prefix so the demo account still works.
export const isAdminEmail = (email) => {
  if (!email) return false;
  const e = String(email).toLowerCase().trim();
  if (ADMIN_EMAILS.includes(e)) return true;
  if (e.startsWith('admin@')) return true;
  return false;
};

/* ═════════════════════════════════════════════════════════════════════
 *  REFERRAL SYSTEM
 *  Rewards trigger only for premium (KES 1,750) lesson purchases.
 *  Each successful referral awards KES 100 to BOTH sides.
 *  Credits auto-apply as a discount on the next purchase.
 * ═════════════════════════════════════════════════════════════════════ */

// Minimum purchase price that triggers a referral reward.
export const REFERRAL_TRIGGER_PRICE_KES = 1750;
// Amount credited to referrer AND referred student per successful referral.
export const REFERRAL_REWARD_KES = 100;

/**
 * Generate a memorable referral code from the user's name.
 * Format: "FIRSTNAME-XXXX" (e.g. "NAOMI-K3R7", "MARY-9P2L").
 * The random 4-char suffix ensures uniqueness even if names collide.
 */
export const generateReferralCode = (name) => {
  const cleanName = String(name || 'friend')
    .trim()
    .split(/\s+/)[0]                    // first word only
    .toUpperCase()
    .replace(/[^A-Z]/g, '')             // strip anything non-alpha
    .slice(0, 8) || 'FRIEND';
  // Random 4-char suffix — letters + digits, no lookalikes (0/O/1/I).
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 4; i++) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `${cleanName}-${suffix}`;
};

/**
 * Validate a referral code the student typed at signup.
 * Returns { ok: true, ownerId } if the code exists, { ok: false } if not.
 * Case-insensitive comparison.
 */
export const validateReferralCode = async (code) => {
  const normalized = String(code || '').trim().toUpperCase();
  if (!normalized) return { ok: false, reason: 'empty' };
  if (isSupabase) {
    const { data } = await supabase.from('profiles')
      .select('id, name, referral_code').ilike('referral_code', normalized).maybeSingle();
    if (data) return { ok: true, ownerId: data.id, ownerName: data.name };
    return { ok: false, reason: 'not_found' };
  }
  const d = read();
  const owner = d.users.find((u) => (u.referral_code || '').toUpperCase() === normalized);
  if (owner) return { ok: true, ownerId: owner.id, ownerName: owner.name };
  return { ok: false, reason: 'not_found' };
};

const genSessionToken = () =>
  'st_' + Math.random().toString(36).slice(2) + '_' + Date.now().toString(36);
const getBrowserSessionToken = () => {
  try { return localStorage.getItem(SESSION_TOKEN_KEY); } catch { return null; }
};
const setBrowserSessionToken = (t) => {
  try { localStorage.setItem(SESSION_TOKEN_KEY, t); } catch {}
};
const clearBrowserSessionToken = () => {
  try { localStorage.removeItem(SESSION_TOKEN_KEY); } catch {}
};

/**
 * Generate (or read) a stable per-browser device ID.
 * This survives logout — so the same physical device is recognised on next login.
 */
export const getOrCreateDeviceId = () => {
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id = 'dev_' + Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch { return 'dev_ephemeral'; }
};

/**
 * Best-effort friendly device name (e.g. "Chrome on Windows").
 * User can override this in Profile Settings.
 */
export const guessDeviceName = () => {
  try {
    const saved = localStorage.getItem(DEVICE_NAME_KEY);
    if (saved) return saved;
    const ua = navigator.userAgent || '';
    let browser = 'Browser';
    if (/Edg\//.test(ua)) browser = 'Edge';
    else if (/Chrome\//.test(ua)) browser = 'Chrome';
    else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) browser = 'Safari';
    else if (/Firefox\//.test(ua)) browser = 'Firefox';
    let os = 'device';
    if (/Windows/.test(ua)) os = 'Windows';
    else if (/Android/.test(ua)) os = 'Android';
    else if (/iPhone|iPad/.test(ua)) os = 'iPhone/iPad';
    else if (/Mac OS/.test(ua)) os = 'Mac';
    else if (/Linux/.test(ua)) os = 'Linux';
    return `${browser} on ${os}`;
  } catch { return 'This device'; }
};

export const setDeviceName = (name) => {
  try { localStorage.setItem(DEVICE_NAME_KEY, name); } catch {}
};

// Custom exception raised when the current browser's session was invalidated
// by another login (another device logged in as this user).
export class SessionInvalidatedError extends Error {
  constructor() {
    super('Your session was ended because your account was signed in on another device.');
    this.name = 'SessionInvalidatedError';
    this.code = 'SESSION_INVALIDATED';
  }
}

// Raised when a user tries to sign in on a 3rd device (max is MAX_DEVICES_PER_USER).
export class DeviceLimitError extends Error {
  constructor(existingDevices = []) {
    super(`Your account is already registered on ${MAX_DEVICES_PER_USER} devices. Remove one from your Profile → My Devices to free up a slot.`);
    this.name = 'DeviceLimitError';
    this.code = 'DEVICE_LIMIT';
    this.existingDevices = existingDevices;
  }
}

/**
 * Given a list of device objects and this browser's deviceId,
 * decide whether login is allowed. If allowed, return the NEW device list to save.
 * If blocked (too many devices AND this one isn't already registered), throw DeviceLimitError.
 */
const reconcileDeviceList = (existingDevices, thisDeviceId, thisDeviceName) => {
  const list = Array.isArray(existingDevices) ? [...existingDevices] : [];
  const now = new Date().toISOString();
  const existing = list.find((d) => d.id === thisDeviceId);
  if (existing) {
    // This device is already registered — just bump last_seen.
    existing.last_seen = now;
    existing.name = existing.name || thisDeviceName;
    return list;
  }
  if (list.length >= MAX_DEVICES_PER_USER) {
    throw new DeviceLimitError(list);
  }
  // Room to add this new device.
  list.push({
    id: thisDeviceId,
    name: thisDeviceName,
    added_at: now,
    last_seen: now,
    user_agent: (typeof navigator !== 'undefined' ? navigator.userAgent : '').slice(0, 200),
  });
  return list;
};

/**
 * Compute the expiry ISO date for a new unlock, ACCESS_DURATION_DAYS from now.
 */
export const computeExpiryDate = (fromDate = new Date()) => {
  const d = new Date(fromDate);
  d.setDate(d.getDate() + ACCESS_DURATION_DAYS);
  return d.toISOString();
};

/**
 * Given an unlock row with { status, expires_at }, decide if it's still active.
 * An unlock is "usable" when status === 'unlocked' AND (no expires_at OR expires_at > now).
 */
export const isUnlockActive = (u) => {
  if (!u || u.status !== 'unlocked') return false;
  if (!u.expires_at && !u.expiresAt) return true;   // legacy row (grandfathered)
  const exp = new Date(u.expires_at || u.expiresAt);
  return exp.getTime() > Date.now();
};

/**
 * Days remaining until expiry (rounded down). Returns null if no expiry set.
 */
export const daysUntilExpiry = (u) => {
  const raw = u?.expires_at || u?.expiresAt;
  if (!raw) return null;
  const ms = new Date(raw).getTime() - Date.now();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
};

/* ---------------- M-Pesa config ---------------- */
export const MPESA = {
  paybill: '4096483',
  accountNumber: '7028M',
  businessName: 'The Postgraduate Data Hub Kenya',
};

/* ---------------- localStorage helpers ---------------- */
const KEY = 'pgh_kenya_v4';
const DEFAULT_AVAILABILITY = {
  monday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  tuesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  wednesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  thursday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  friday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
  saturday: [],
  sunday: [],
};
const defaultServices = [
  { id: 'srv-quest', name: 'Questionnaire Design', active: true },
  { id: 'srv-anal', name: 'Data Analysis', active: true },
  { id: 'srv-int', name: 'Interpretation', active: true },
  { id: 'srv-thes', name: 'Thesis Review', active: true },
  { id: 'srv-cons', name: 'Research Consultation', active: true },
];
const seedIfEmpty = () => {
  if (!localStorage.getItem(KEY)) {
    localStorage.setItem(KEY, JSON.stringify({
      users: [],
      sessions: { current: null },
      submissions: [],
      unlocks: [],
      bookings: [],
      lessonProgress: [],
      analysisOrders: [],
      activities: [],
      payments: [],
      settings: { availability: DEFAULT_AVAILABILITY, services: defaultServices },
    }));
  }
};
const read = () => { seedIfEmpty(); return JSON.parse(localStorage.getItem(KEY)); };
const write = (d) => localStorage.setItem(KEY, JSON.stringify(d));
const uid = () => 'id_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

/* ---------------- Auth ---------------- */
export const auth = {
  async register({ name, email, phone, institution, password, referralCode }) {
    const deviceId = getOrCreateDeviceId();
    const deviceName = guessDeviceName();

    // Generate this new user's OWN unique referral code (so they can refer others).
    const myReferralCode = generateReferralCode(name);
    // Normalise the incoming code (from "referred by" field), if any.
    const cleanReferredBy = String(referralCode || '').trim().toUpperCase() || null;

    if (isSupabase) {
      const { data, error } = await supabase.auth.signUp({
        email, password, options: { data: { name, phone, institution } },
      });
      if (error) throw error;
      // Profile row is auto-created by handle_new_user() trigger on auth.users.
      // Register this browser as the account's FIRST device.
      if (data.user) {
        const token = genSessionToken();
        const initialDevices = [{
          id: deviceId, name: deviceName,
          added_at: new Date().toISOString(),
          last_seen: new Date().toISOString(),
          user_agent: (typeof navigator !== 'undefined' ? navigator.userAgent : '').slice(0, 200),
        }];
        await supabase.from('profiles')
          .update({
            name, phone, institution,
            session_token: token,
            devices: initialDevices,
            referral_code: myReferralCode,
            referred_by: cleanReferredBy,
            last_login_at: new Date().toISOString(),
          })
          .eq('id', data.user.id);
        setBrowserSessionToken(token);
      }
      return data.user;
    }
    const d = read();
    if (d.users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }
    const token = genSessionToken();
    const user = {
      id: uid(), name, email, phone, institution, password,
      role: isAdminEmail(email) ? 'admin' : 'student',
      session_token: token,
      devices: [{
        id: deviceId, name: deviceName,
        added_at: new Date().toISOString(),
        last_seen: new Date().toISOString(),
        user_agent: (typeof navigator !== 'undefined' ? navigator.userAgent : '').slice(0, 200),
      }],
      referral_code: myReferralCode,
      referred_by: cleanReferredBy,
      credits_kes: 0,
      last_login_at: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    d.users.push(user);
    d.sessions.current = user.id;
    setBrowserSessionToken(token);
    write(d);
    activities.log('account', `Created your account${cleanReferredBy ? ' (referred by ' + cleanReferredBy + ')' : ''}`);
    return user;
  },

  async login({ email, password }) {
    const deviceId = getOrCreateDeviceId();
    const deviceName = guessDeviceName();

    if (isSupabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Reconcile the device list. If this is a 3rd unknown device, throw DeviceLimitError
      // BEFORE completing the login (and sign the user right back out to be safe).
      if (data.user) {
        const { data: profile } = await supabase.from('profiles')
          .select('devices, session_token, name, referral_code').eq('id', data.user.id).single();
        let newDevices;
        try {
          newDevices = reconcileDeviceList(profile?.devices || [], deviceId, deviceName);
        } catch (e) {
          await supabase.auth.signOut();
          throw e;
        }
        const token = genSessionToken();
        // Auto-promote to admin if this email is on the allow-list.
        const updatePayload = {
          session_token: token,
          devices: newDevices,
          last_login_at: new Date().toISOString(),
        };
        if (isAdminEmail(data.user.email)) {
          updatePayload.role = 'admin';
        }
        // Backfill referral_code for accounts created BEFORE the referral feature.
        if (!profile?.referral_code) {
          updatePayload.referral_code = generateReferralCode(profile?.name || data.user.email);
        }
        await supabase.from('profiles')
          .update(updatePayload)
          .eq('id', data.user.id);
        setBrowserSessionToken(token);
      }
      return data.user;
    }
    const d = read();
    const user = d.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) throw new Error('Invalid email or password.');
    // Reconcile the device list (throws DeviceLimitError if too many).
    const newDevices = reconcileDeviceList(user.devices || [], deviceId, deviceName);
    const token = genSessionToken();
    user.session_token = token;
    user.devices = newDevices;
    user.last_login_at = new Date().toISOString();
    // Auto-promote to admin if the email is on the allow-list
    // (handles the case where the account was created BEFORE the allow-list existed).
    if (isAdminEmail(user.email) && user.role !== 'admin') {
      user.role = 'admin';
    }
    // Backfill referral_code for accounts created BEFORE the referral feature existed.
    if (!user.referral_code) {
      user.referral_code = generateReferralCode(user.name);
    }
    if (user.credits_kes == null) user.credits_kes = 0;
    setBrowserSessionToken(token);
    d.sessions.current = user.id;
    write(d);
    activities.log('login', `Signed in on ${deviceName}`);
    return user;
  },

  async logout() {
    // Leave the device registered so the user can log back in on the same device
    // without consuming a new slot. Only session token is cleared.
    clearBrowserSessionToken();
    if (isSupabase) { await supabase.auth.signOut(); return; }
    const d = read();
    d.sessions.current = null;
    write(d);
  },

  async current() {
    const deviceId = getOrCreateDeviceId();
    if (isSupabase) {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
      // Device check: this browser's device_id must be in the profile's device list.
      // If not, another user has probably removed this device from their Profile Settings —
      // OR this account was hijacked. Either way, force sign-out.
      if (profile && Array.isArray(profile.devices) && profile.devices.length > 0) {
        const known = profile.devices.some((d) => d.id === deviceId);
        if (!known) {
          await supabase.auth.signOut();
          clearBrowserSessionToken();
          throw new SessionInvalidatedError();
        }
      }
      // Legacy session_token check kept as belt-and-braces.
      if (profile && profile.session_token) {
        const browserToken = getBrowserSessionToken();
        if (browserToken && browserToken !== profile.session_token) {
          // Bump last_seen for this device on token refresh (harmless if legacy).
        }
      }
      // Belt-and-braces: if this email is on the admin allow-list but the
      // profile row still shows 'student', override the returned role to 'admin'.
      const returnable = profile || data.user;
      if (returnable && isAdminEmail(returnable.email || data.user.email)) {
        returnable.role = 'admin';
      }
      return returnable;
    }
    const d = read();
    if (!d.sessions.current) return null;
    const user = d.users.find((u) => u.id === d.sessions.current);
    if (!user) return null;
    if (Array.isArray(user.devices) && user.devices.length > 0) {
      const known = user.devices.some((dev) => dev.id === deviceId);
      if (!known) {
        d.sessions.current = null;
        clearBrowserSessionToken();
        write(d);
        throw new SessionInvalidatedError();
      }
    }
    // Belt-and-braces for local backend too.
    if (isAdminEmail(user.email) && user.role !== 'admin') {
      user.role = 'admin';
      write(d);
    }
    return user;
  },

  async resetPassword({ email, newPassword }) {
    if (isSupabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return true;
    }
    const d = read();
    const user = d.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error('No account found with that email.');
    user.password = newPassword;
    write(d);
    return true;
  },

  async updateProfile(updates) {
    if (isSupabase) {
      const { data } = await supabase.auth.getUser();
      await supabase.from('profiles').update(updates).eq('id', data.user.id);
      return true;
    }
    const d = read();
    const user = d.users.find((u) => u.id === d.sessions.current);
    if (!user) throw new Error('Not signed in.');
    Object.assign(user, updates);
    write(d);
    activities.log('profile', 'Updated your profile');
    return user;
  },

  /* ── Device management (Profile → My Devices) ── */

  /** List devices registered on the current user's account. */
  async listDevices() {
    if (isSupabase) {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) return [];
      const { data } = await supabase.from('profiles').select('devices').eq('id', authData.user.id).single();
      return Array.isArray(data?.devices) ? data.devices : [];
    }
    const d = read();
    const user = d.users.find((u) => u.id === d.sessions.current);
    return Array.isArray(user?.devices) ? user.devices : [];
  },

  /** Remove a device by ID from the current user's account (frees up a slot). */
  async removeDevice(deviceId) {
    if (isSupabase) {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) throw new Error('Not signed in.');
      const { data: profile } = await supabase.from('profiles').select('devices').eq('id', authData.user.id).single();
      const remaining = (profile?.devices || []).filter((dev) => dev.id !== deviceId);
      await supabase.from('profiles').update({ devices: remaining }).eq('id', authData.user.id);
      // If the removed device is this browser, force sign-out on next check.
      if (deviceId === getOrCreateDeviceId()) {
        await supabase.auth.signOut();
        clearBrowserSessionToken();
      }
      return remaining;
    }
    const d = read();
    const user = d.users.find((u) => u.id === d.sessions.current);
    if (!user) throw new Error('Not signed in.');
    user.devices = (user.devices || []).filter((dev) => dev.id !== deviceId);
    if (deviceId === getOrCreateDeviceId()) {
      d.sessions.current = null;
      clearBrowserSessionToken();
    }
    write(d);
    activities.log('security', 'Removed a device from your account');
    return user.devices;
  },

  /** Rename a device (visible in the Profile → My Devices list). */
  async renameDevice(deviceId, newName) {
    const trimmed = (newName || '').trim().slice(0, 40);
    if (!trimmed) throw new Error('Please enter a name.');
    if (isSupabase) {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) throw new Error('Not signed in.');
      const { data: profile } = await supabase.from('profiles').select('devices').eq('id', authData.user.id).single();
      const updated = (profile?.devices || []).map((dev) =>
        dev.id === deviceId ? { ...dev, name: trimmed } : dev
      );
      await supabase.from('profiles').update({ devices: updated }).eq('id', authData.user.id);
      if (deviceId === getOrCreateDeviceId()) setDeviceName(trimmed);
      return updated;
    }
    const d = read();
    const user = d.users.find((u) => u.id === d.sessions.current);
    if (!user) throw new Error('Not signed in.');
    user.devices = (user.devices || []).map((dev) =>
      dev.id === deviceId ? { ...dev, name: trimmed } : dev
    );
    if (deviceId === getOrCreateDeviceId()) setDeviceName(trimmed);
    write(d);
    return user.devices;
  },

  /** Returns the current browser's device ID (so UI can mark it "this device"). */
  getThisDeviceId() { return getOrCreateDeviceId(); },
};

/* ---------------- Submissions ---------------- */
export const SUBMISSION_STATUSES = [
  { id: 'submitted',  label: 'Submitted',     desc: 'We\'ve received your draft.' },
  { id: 'review',     label: 'Under review',  desc: 'Our research team is reviewing your instrument.' },
  { id: 'refining',   label: 'Being refined', desc: 'Edits in progress to align with your objectives.' },
  { id: 'ready',      label: 'Survey ready',  desc: 'Your refined instrument & digital data-collection link are ready.' },
];

export const submissions = {
  async list() {
    const d = read();
    return d.submissions.filter((s) => s.userId === d.sessions.current);
  },
  async listAll() { return read().submissions; },
  async create(payload) {
    const d = read();
    const item = {
      id: uid(),
      userId: d.sessions.current,
      ...payload,
      status: 'submitted',
      surveyLink: null,
      adminNote: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    d.submissions.push(item);
    write(d);
    activities.log('submission', `Submitted "${item.title}" for refinement`);
    return item;
  },
  async get(id) {
    const d = read();
    return d.submissions.find((s) => s.id === id);
  },
  async update(id, patch) {
    const d = read();
    const sub = d.submissions.find((s) => s.id === id);
    if (!sub) return null;
    Object.assign(sub, patch, { updatedAt: new Date().toISOString() });
    write(d);
    return sub;
  },
};

/* ---------------- Unlocks (with dual formats: notes / video) ---------------- */
// itemKey examples: "lesson:basics-1:notes", "lesson:basics-1:video", "test:pearson"
export const unlocks = {
  async list() {
    const d = read();
    return d.unlocks.filter((u) => u.userId === d.sessions.current);
  },
  async listAll() { return read().unlocks; },
  async has(itemKey) {
    const d = read();
    return d.unlocks.some((u) => u.userId === d.sessions.current
      && u.itemKey === itemKey
      && isUnlockActive(u));   // status='unlocked' AND not expired
  },
  async request({ itemKey, itemType, itemName, format = null, priceKES = null, packageInfo = null }) {
    const d = read();
    const existing = d.unlocks.find((u) => u.userId === d.sessions.current && u.itemKey === itemKey);
    const buyer = d.users.find((x) => x.id === d.sessions.current);

    // Auto-apply available referral credits to reduce the M-Pesa amount.
    // (Never below KES 0. Credits are consumed permanently once used on a request.)
    const availableCredit = buyer?.credits_kes || 0;
    const originalPrice = priceKES ?? 0;
    const creditApplied = Math.min(availableCredit, originalPrice);
    const finalPrice = Math.max(0, originalPrice - creditApplied);

    // REUSE the existing row only if it's STILL ACTIVE (pending, or unlocked-and-not-expired).
    // If it's expired (student is renewing), we RESET it back to a fresh pending state
    // so admin sees a new claim to verify and the emails fire correctly.
    if (existing) {
      const isRenewal = existing.status === 'unlocked' && !isUnlockActive(existing);
      if (!isRenewal) return existing;   // still active OR still pending — no re-request needed

      // Renewal path — reset the existing row to a new pending claim.
      existing.status = 'pending';
      existing.paymentStatus = 'unpaid';
      existing.priceKES = finalPrice;
      existing.priceBeforeCredit = originalPrice;
      existing.creditApplied = creditApplied;
      existing.requestedAt = new Date().toISOString();
      existing.claimedAt = null;
      existing.approvedAt = null;
      existing.expires_at = null;
      existing.expiresAt  = null;
      existing.isRenewal  = true;
      // Consume credits (they're locked in the moment the request is made).
      if (buyer && creditApplied > 0) buyer.credits_kes = availableCredit - creditApplied;
      write(d);
      activities.log('unlock', `Requested RENEWAL for ${itemName} (KES ${finalPrice}${creditApplied ? `, ${creditApplied} credit applied` : ''})`);
      return existing;
    }

    const u = {
      id: uid(),
      userId: d.sessions.current,
      itemKey, itemType, itemName, format,
      priceKES: finalPrice,             // amount admin needs to see on M-Pesa
      priceBeforeCredit: originalPrice, // original price (for referral trigger check)
      creditApplied,                    // KES credit used on this purchase
      packageLessonIds: packageInfo ? packageInfo.lessonIds : null,
      status: 'pending',
      paymentStatus: 'unpaid',
      requestedAt: new Date().toISOString(),
    };
    d.unlocks.push(u);
    if (buyer && creditApplied > 0) buyer.credits_kes = availableCredit - creditApplied;
    write(d);
    activities.log('unlock',
      `Requested unlock for ${itemName}${format ? ' ('+format+')' : ''} (KES ${finalPrice}${creditApplied ? `, ${creditApplied} credit applied` : ''})`
    );
    return u;
  },
  async claimPaid(id) {
    const d = read();
    const u = d.unlocks.find((x) => x.id === id);
    if (u) {
      u.paymentStatus = 'claimed';
      u.claimedAt = new Date().toISOString();
      // 🔒 SECURITY: no auto-approve. ALL unlocks require admin verification
      // against actual M-Pesa records before the student gains access.
      // Admin approves via the Admin dashboard → Unlock requests tab.
      write(d);
    }
    return u;
  },
  async approve(id) {
    const d = read();
    const u = d.unlocks.find((x) => x.id === id);
    if (u) {
      const approvedAt = new Date();
      const expiresAt = computeExpiryDate(approvedAt);   // 1 year from approval
      u.status = 'unlocked';
      u.paymentStatus = 'confirmed';
      u.approvedAt = approvedAt.toISOString();
      u.expires_at = expiresAt;
      u.expiresAt  = expiresAt;   // camelCase alias for legacy readers
      // If this was a package unlock, also create matching 'unlocked' rows for every lesson in the package.
      // Each lesson row gets the SAME expiry as the package purchase.
      if (u.itemType === 'package' && Array.isArray(u.packageLessonIds)) {
        for (const lessonId of u.packageLessonIds) {
          const perLessonKey = `lesson:${lessonId}:notes`;
          const already = d.unlocks.find((x) => x.userId === u.userId && x.itemKey === perLessonKey);
          if (!already) {
            d.unlocks.push({
              id: uid(),
              userId: u.userId,
              itemKey: perLessonKey,
              itemType: 'lesson',
              itemName: `${u.itemName} — ${lessonId}`,
              format: 'notes',
              status: 'unlocked',
              paymentStatus: 'confirmed',
              approvedAt: approvedAt.toISOString(),
              expires_at: expiresAt,
              expiresAt: expiresAt,
              includedInPackage: u.id,  // trace back to the package purchase
            });
          }
        }
      }

      // 🎁 REFERRAL REWARD
      // Trigger conditions:
      //   1. This unlock's price (before any credit) was ≥ KES 1,750
      //   2. The buyer has a `referred_by` code pointing to another user
      //   3. This is the FIRST triggering purchase (award only once per referee)
      //   4. Not a renewal (renewals don't earn fresh referral rewards)
      const originalPrice = u.priceBeforeCredit ?? u.priceKES ?? 0;
      const eligibleAmount = originalPrice >= REFERRAL_TRIGGER_PRICE_KES;
      if (eligibleAmount && !u.isRenewal) {
        const buyer = d.users.find((x) => x.id === u.userId);
        if (buyer && buyer.referred_by && !buyer.referral_reward_paid) {
          const referrer = d.users.find((x) =>
            (x.referral_code || '').toUpperCase() === (buyer.referred_by || '').toUpperCase()
          );
          if (referrer) {
            referrer.credits_kes = (referrer.credits_kes || 0) + REFERRAL_REWARD_KES;
            buyer.credits_kes    = (buyer.credits_kes    || 0) + REFERRAL_REWARD_KES;
            buyer.referral_reward_paid = true;   // mark so we don't reward again
            activities.log('referral',
              `Referral reward: +KES ${REFERRAL_REWARD_KES} each to ${referrer.name} (referrer) and ${buyer.name} (referred)`
            );
          }
        }
      }

      write(d);
    }
    return u;
  },
  async decline(id) {
    const d = read();
    const u = d.unlocks.find((x) => x.id === id);
    if (u) { u.status = 'declined'; write(d); }
    return u;
  },
};

/* ---------------- Analysis & Interpretation orders ---------------- */
export const ANALYSIS_TIERS = [
  {
    id: 'tables',
    name: 'Analysis — Tables Only',
    blurb: 'SPSS output tables (descriptives + inferential) — no narrative. Run by well-knowledgeable PhD researchers. Clean, publication-ready tables you can drop straight into your thesis.',
    deliverables: [
      'SPSS output (.spv) and .docx tables',
      'All requested analyses run end-to-end by experienced PhD researchers',
      'Codebook of variables analysed',
    ],
    requires: 'You must supply a clean Excel sheet (.xlsx) that is objective, well organised, and contains no missing data.',
  },
  {
    id: 'interpretation',
    name: 'Analysis — Interpretation Only (Chapter 4)',
    blurb: 'Polished Chapter 4 write-up built from tables you already have. Citation-rich narrative aligned to your objectives, handled by PhD researchers experienced in thesis-level writing.',
    deliverables: [
      'Chapter 4 (Findings) narrative aligned to your objectives',
      'APA-style in-text citations and reference list',
      'Discussion of results linked to prior literature',
      'Written by PhD researchers familiar with your discipline',
    ],
    requires: 'You must supply your SPSS output tables AND a clean Excel sheet that is objective, well organised, and contains no missing data. Disorganised or incomplete datasets cannot be processed.',
  },
  {
    id: 'full',
    name: 'Analysis + Interpretation — Full (Chapter 4 + 5)',
    blurb: 'End-to-end: analysis + fully-written Chapter 4 (findings) AND Chapter 5 (discussion & recommendations). Handled throughout by well-knowledgeable PhD researchers.',
    deliverables: [
      'Everything in Analysis — Tables Only',
      'Fully-written Chapter 4 (findings, aligned to objectives, APA citations)',
      'Fully-written Chapter 5 (discussion, conclusions, recommendations)',
      'One round of revisions included',
    ],
    requires: 'You must supply a clean Excel sheet (.xlsx) that is objective, well organised, and contains no missing data.',
  },
];

export const ANALYSIS_STATUSES = [
  { id: 'submitted',  label: 'Submitted' },
  { id: 'review',     label: 'Under review' },
  { id: 'inprogress', label: 'In progress' },
  { id: 'delivered',  label: 'Delivered' },
];

export const analysisOrders = {
  async list() {
    const d = read();
    return d.analysisOrders.filter((o) => o.userId === d.sessions.current);
  },
  async listAll() { return read().analysisOrders; },
  async create(payload) {
    const d = read();
    const o = {
      id: uid(),
      userId: d.sessions.current,
      ...payload,
      status: 'submitted',
      adminNote: null,
      deliverableLink: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    d.analysisOrders.push(o);
    write(d);
    activities.log('analysis', `Ordered ${payload.tierName} — "${payload.title}"`);
    return o;
  },
  async update(id, patch) {
    const d = read();
    const o = d.analysisOrders.find((x) => x.id === id);
    if (o) { Object.assign(o, patch, { updatedAt: new Date().toISOString() }); write(d); }
    return o;
  },
};

/* ---------------- Bookings ---------------- */
export const BOOKING_STATUSES = [
  { id: 'pending',   label: 'Pending',   color: 'amber' },
  { id: 'confirmed', label: 'Confirmed', color: 'emerald' },
  { id: 'completed', label: 'Completed', color: 'brand' },
  { id: 'cancelled', label: 'Cancelled', color: 'slate' },
];

export const bookings = {
  async list() {
    const d = read();
    return d.bookings.filter((b) => b.userId === d.sessions.current);
  },
  async listAll() { return read().bookings; },
  async create({ serviceId, serviceName, date, time, notes }) {
    const d = read();
    const b = {
      id: uid(),
      userId: d.sessions.current,
      serviceId, serviceName, date, time, notes: notes || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    d.bookings.push(b);
    write(d);
    activities.log('booking', `Booked ${serviceName} on ${date} at ${time}`);
    return b;
  },
  async update(id, patch) {
    const d = read();
    const b = d.bookings.find((x) => x.id === id);
    if (b) { Object.assign(b, patch); write(d); }
    return b;
  },
  async availableSlots(dateStr) {
    const d = read();
    const date = new Date(dateStr + 'T00:00:00');
    const weekday = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'][date.getDay()];
    const template = d.settings.availability[weekday] || [];
    const taken = d.bookings
      .filter((b) => b.date === dateStr && b.status !== 'cancelled')
      .map((b) => b.time);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    return template.filter((t) => {
      if (taken.includes(t)) return false;
      if (isToday) {
        const [h, m] = t.split(':').map(Number);
        const slotTime = new Date(); slotTime.setHours(h, m, 0, 0);
        if (slotTime <= now) return false;
      }
      return true;
    });
  },
};

/* ---------------- Lesson progress ---------------- */
export const lessons = {
  async getProgress(lessonId) {
    const d = read();
    return d.lessonProgress.find(
      (p) => p.userId === d.sessions.current && p.lessonId === lessonId
    );
  },
  async listProgress() {
    const d = read();
    return d.lessonProgress.filter((p) => p.userId === d.sessions.current);
  },
  async markComplete(lessonId, quizScore = null) {
    const d = read();
    let p = d.lessonProgress.find(
      (x) => x.userId === d.sessions.current && x.lessonId === lessonId
    );
    if (!p) {
      p = { id: uid(), userId: d.sessions.current, lessonId, completed: true, quizScore, at: new Date().toISOString() };
      d.lessonProgress.push(p);
    } else {
      p.completed = true; p.quizScore = quizScore; p.at = new Date().toISOString();
    }
    write(d);
    activities.log('lesson', `Completed lesson`);
    return p;
  },
};

/* ---------------- Admin queries ---------------- */
export const admin = {
  async users() { return read().users.filter((u) => u.role !== 'admin'); },
  async submissions() {
    const d = read();
    return d.submissions.map((s) => ({
      ...s, user: d.users.find((u) => u.id === s.userId),
    })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  async unlocks() {
    const d = read();
    return d.unlocks.map((u) => ({
      ...u, user: d.users.find((x) => x.id === u.userId),
    })).sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt));
  },
  async bookings() {
    const d = read();
    return d.bookings.map((b) => ({
      ...b, user: d.users.find((u) => u.id === b.userId),
    })).sort((a, b) => new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));
  },
  async analysisOrders() {
    const d = read();
    return d.analysisOrders.map((o) => ({
      ...o, user: d.users.find((u) => u.id === o.userId),
    })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  async payments() {
    const d = read();
    return d.payments.map((p) => ({
      ...p, user: d.users.find((u) => u.id === p.userId),
    }));
  },
  async getAvailability() { return read().settings.availability; },
  async setAvailability(av) {
    const d = read();
    d.settings.availability = av;
    write(d);
  },
  async getServices() { return read().settings.services; },
  async setServices(services) {
    const d = read();
    d.settings.services = services;
    write(d);
  },

  /**
   * Admin can force-clear a user's device list.
   * Used when a student contacts support saying "I lost my phone AND laptop".
   * The user will be able to sign in on any device next time and it'll be
   * registered fresh as device #1.
   */
  async clearUserDevices(userId) {
    if (isSupabase) {
      const { error } = await supabase.from('profiles').update({ devices: [] }).eq('id', userId);
      if (error) throw error;
      return true;
    }
    const d = read();
    const u = d.users.find((x) => x.id === userId);
    if (u) { u.devices = []; write(d); }
    return true;
  },

  /**
   * Admin can also remove a SINGLE device from a user's account
   * (useful when the user says "I want to keep my phone but remove the laptop").
   */
  async removeUserDevice(userId, deviceId) {
    if (isSupabase) {
      const { data: profile } = await supabase.from('profiles').select('devices').eq('id', userId).single();
      const remaining = (profile?.devices || []).filter((d) => d.id !== deviceId);
      const { error } = await supabase.from('profiles').update({ devices: remaining }).eq('id', userId);
      if (error) throw error;
      return remaining;
    }
    const d = read();
    const u = d.users.find((x) => x.id === userId);
    if (u) {
      u.devices = (u.devices || []).filter((dev) => dev.id !== deviceId);
      write(d);
      return u.devices;
    }
    return [];
  },

  async metrics() {
    const d = read();
    return {
      users: d.users.filter((u) => u.role !== 'admin').length,
      submissions: d.submissions.length,
      submissionsPending: d.submissions.filter((s) => s.status !== 'ready').length,
      submissionsReady: d.submissions.filter((s) => s.status === 'ready').length,
      unlocksPending: d.unlocks.filter((u) => u.status === 'pending').length,
      unlocksClaimed: d.unlocks.filter((u) => u.paymentStatus === 'claimed').length,
      unlocksApproved: d.unlocks.filter((u) => u.status === 'unlocked').length,
      analysisOrders: d.analysisOrders.length,
      analysisOrdersOpen: d.analysisOrders.filter((o) => o.status !== 'delivered').length,
      bookingsPending: d.bookings.filter((b) => b.status === 'pending').length,
      bookingsUpcoming: d.bookings.filter((b) => b.status === 'confirmed' &&
        new Date(b.date + 'T' + b.time) >= new Date()).length,
    };
  },
};

/* ---------------- Activities ---------------- */
export const activities = {
  log(type, message) {
    const d = read();
    if (!d.sessions.current) return;
    d.activities.unshift({
      id: uid(), userId: d.sessions.current,
      type, message, at: new Date().toISOString(),
    });
    d.activities = d.activities.slice(0, 200);
    write(d);
  },
  async list(limit = 8) {
    const d = read();
    return d.activities.filter((a) => a.userId === d.sessions.current).slice(0, limit);
  },
};

/* ---------------- Payments ---------------- */
export const payments = {
  async record({ item, amount, method, phone, status = 'success' }) {
    const d = read();
    const p = {
      id: uid(), userId: d.sessions.current,
      item, amount, method, phone, status,
      at: new Date().toISOString(),
    };
    d.payments.push(p);
    write(d);
    return p;
  },
  async listMine() {
    const d = read();
    return d.payments.filter((p) => p.userId === d.sessions.current);
  },
};
