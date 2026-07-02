// Lightweight inline SVG icon set — no external deps.
const I = ({ children, className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
       className={className}>{children}</svg>
);

export const IconDashboard = (p) => <I {...p}><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></I>;
export const IconForm = (p) => <I {...p}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></I>;
export const IconChart = (p) => <I {...p}><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></I>;
export const IconBook = (p) => <I {...p}><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></I>;
export const IconCalendar = (p) => <I {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></I>;
export const IconUser = (p) => <I {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></I>;
export const IconLogout = (p) => <I {...p}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></I>;
export const IconCheck = (p) => <I {...p}><path d="M20 6L9 17l-5-5"/></I>;
export const IconPlus = (p) => <I {...p}><path d="M12 5v14M5 12h14"/></I>;
export const IconTrash = (p) => <I {...p}><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></I>;
export const IconDownload = (p) => <I {...p}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></I>;
export const IconArrow = (p) => <I {...p}><path d="M5 12h14M13 5l7 7-7 7"/></I>;
export const IconClock = (p) => <I {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></I>;
export const IconSpark = (p) => <I {...p}><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"/></I>;
export const IconShield = (p) => <I {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></I>;
export const IconStar = (p) => <I {...p}><path d="M12 2l3 7 7 .8-5.3 4.8L18 22l-6-3.5L6 22l1.3-7.4L2 9.8 9 9z"/></I>;
export const IconMenu = (p) => <I {...p}><path d="M3 6h18M3 12h18M3 18h18"/></I>;
export const IconClose = (p) => <I {...p}><path d="M18 6L6 18M6 6l12 12"/></I>;
export const IconMail = (p) => <I {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></I>;
export const IconPhone = (p) => <I {...p}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z"/></I>;
export const IconBuilding = (p) => <I {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01"/></I>;
export const IconLock = (p) => <I {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></I>;
export const IconWhatsApp = (p) => <I {...p}><path d="M20.5 3.5A11 11 0 003.4 17L2 22l5.2-1.4A11 11 0 1020.5 3.5zM12 20a8 8 0 01-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1112 20zm4.5-5.5c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.6 6.6 0 01-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.6c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.7 2.7 0 00-.9 2c0 1.2.9 2.4 1 2.5s1.7 2.7 4.2 3.7 2.5.7 3 .7a2.5 2.5 0 001.6-1.1 2 2 0 00.1-1.1c-.1-.1-.3-.2-.5-.3z"/></I>;
export const IconLocation = (p) => <I {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></I>;
