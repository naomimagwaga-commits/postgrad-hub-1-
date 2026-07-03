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

// Custom exception raised when the current browser's session was invalidated
// by another login (another device logged in as this user).
export class SessionInvalidatedError extends Error {
  constructor() {
    super('Your session was ended because your account was signed in on another device.');
    this.name = 'SessionInvalidatedError';
    this.code = 'SESSION_INVALIDATED';
  }
}

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
  async register({ name, email, phone, institution, password }) {
    if (isSupabase) {
      const { data, error } = await supabase.auth.signUp({
        email, password, options: { data: { name, phone, institution } },
      });
      if (error) throw error;
      // Profile row is auto-created by the handle_new_user() trigger on auth.users.
      // We UPDATE it here to add the phone + institution the trigger didn't have,
      // AND write a fresh session_token for this brand-new browser session.
      if (data.user) {
        const token = genSessionToken();
        await supabase.from('profiles')
          .update({ name, phone, institution, session_token: token, last_login_at: new Date().toISOString() })
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
      role: email.toLowerCase().startsWith('admin@') ? 'admin' : 'student',
      session_token: token,
      last_login_at: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    d.users.push(user);
    d.sessions.current = user.id;
    setBrowserSessionToken(token);
    write(d);
    activities.log('account', 'Created your account');
    return user;
  },

  async login({ email, password }) {
    if (isSupabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // Single-active-session: generate a new token, write to the profile,
      // and save it in THIS browser. Any other device holding an OLD token
      // will fail the check on next `current()` call and be forced to sign in again.
      if (data.user) {
        const token = genSessionToken();
        await supabase.from('profiles')
          .update({ session_token: token, last_login_at: new Date().toISOString() })
          .eq('id', data.user.id);
        setBrowserSessionToken(token);
      }
      return data.user;
    }
    const d = read();
    const user = d.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) throw new Error('Invalid email or password.');
    // Same single-session logic for the local (non-Supabase) backend.
    const token = genSessionToken();
    user.session_token = token;
    user.last_login_at = new Date().toISOString();
    setBrowserSessionToken(token);
    d.sessions.current = user.id;
    write(d);
    activities.log('login', 'Signed in to your account');
    return user;
  },

  async logout() {
    clearBrowserSessionToken();
    if (isSupabase) { await supabase.auth.signOut(); return; }
    const d = read();
    d.sessions.current = null;
    write(d);
  },

  async current() {
    if (isSupabase) {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
      // Single-active-session check: if the profile's session_token exists
      // and does NOT match what this browser holds, another device has taken
      // over. Force sign-out here and raise the special error so the UI
      // can show the "signed out because another device signed in" message.
      if (profile && profile.session_token) {
        const browserToken = getBrowserSessionToken();
        if (browserToken && browserToken !== profile.session_token) {
          await supabase.auth.signOut();
          clearBrowserSessionToken();
          throw new SessionInvalidatedError();
        }
      }
      return profile || data.user;
    }
    const d = read();
    if (!d.sessions.current) return null;
    const user = d.users.find((u) => u.id === d.sessions.current);
    if (!user) return null;
    // Same session-token check for the local backend.
    if (user.session_token) {
      const browserToken = getBrowserSessionToken();
      if (browserToken && browserToken !== user.session_token) {
        d.sessions.current = null;
        clearBrowserSessionToken();
        write(d);
        throw new SessionInvalidatedError();
      }
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
      && u.itemKey === itemKey && u.status === 'unlocked');
  },
  async request({ itemKey, itemType, itemName, format = null, priceKES = null, packageInfo = null }) {
    const d = read();
    const existing = d.unlocks.find((u) => u.userId === d.sessions.current && u.itemKey === itemKey);
    if (existing) return existing;
    const u = {
      id: uid(),
      userId: d.sessions.current,
      itemKey, itemType, itemName, format,
      priceKES,                     // for admin's benefit: shows amount to verify against M-Pesa
      packageLessonIds: packageInfo ? packageInfo.lessonIds : null,
      status: 'pending',
      paymentStatus: 'unpaid', // unpaid | claimed | confirmed
      requestedAt: new Date().toISOString(),
    };
    d.unlocks.push(u);
    write(d);
    activities.log('unlock', `Requested unlock for ${itemName}${format ? ' ('+format+')' : ''}${priceKES ? ' (KES '+priceKES+')' : ''}`);
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
      u.status = 'unlocked';
      u.paymentStatus = 'confirmed';
      u.approvedAt = new Date().toISOString();
      // If this was a package unlock, also create matching 'unlocked' rows for every lesson in the package.
      // This makes SpssAcademy's per-lesson check see them as unlocked without special-case code.
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
              approvedAt: new Date().toISOString(),
              includedInPackage: u.id,  // trace back to the package purchase
            });
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
    name: 'Tables Only',
    blurb: 'Pure SPSS output tables — descriptives, frequencies, and the inferential tables your study requires. Run by well-knowledgeable PhD researchers. No narrative — just clean, publication-ready tables.',
    deliverables: [
      'SPSS output (.spv) and .docx tables',
      'All requested analyses run end-to-end by experienced PhD researchers',
      'Codebook of variables analysed',
    ],
    requires: 'You must supply a clean Excel sheet (.xlsx) that is objective, well organised, and contains no missing data.',
  },
  {
    id: 'interpretation',
    name: 'Interpretation Only',
    blurb: 'Polished, citation-rich narrative built from tables you already have. Handled by well-knowledgeable PhD researchers experienced in thesis-level writing. Perfect for students who ran their own analyses but need professional write-up.',
    deliverables: [
      'Findings chapter narrative aligned to your objectives',
      'APA-style in-text citations and reference list',
      'Discussion section that links findings to prior literature',
      'Written by PhD researchers familiar with your discipline',
    ],
    requires: 'You must supply your SPSS output tables AND a clean Excel sheet that is objective, well organised, and contains no missing data. Disorganised or incomplete datasets cannot be processed.',
  },
  {
    id: 'full',
    name: 'Analysis + Interpretation',
    blurb: 'End-to-end: well-knowledgeable PhD researchers run your analyses AND deliver the polished findings + discussion chapter.',
    deliverables: [
      'Everything in Tables Only',
      'Everything in Interpretation Only',
      'Handled throughout by experienced PhD researchers',
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
