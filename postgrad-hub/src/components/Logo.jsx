export default function Logo({ variant = 'dark', size = 'md' }) {
  const sizes = {
    sm: { title: 'text-base', tag: 'text-[9px]', svg: 'w-9 h-9' },
    md: { title: 'text-lg', tag: 'text-[10px]', svg: 'w-10 h-10' },
    lg: { title: 'text-2xl', tag: 'text-[11px]', svg: 'w-12 h-12' },
  };
  const s = sizes[size];
  const isLight = variant === 'light';

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <svg viewBox="0 0 40 40" className={s.svg}>
          <defs>
            <linearGradient id={`bg-${variant}`} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#0A2E5D" />
              <stop offset="100%" stopColor="#020A13" />
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="10" fill={`url(#bg-${variant})`} />
          <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" fill="none" stroke="#D4AF37" strokeOpacity="0.4" />
          <path d="M20 9 L6 17 L20 25 L31 19 V28 H34 V17 Z" fill="#D4AF37" />
          <path d="M10 21 V27 C10 29 14 31 20 31 C26 31 30 29 30 27 V21 L20 26 Z" fill="#D4AF37" opacity=".85" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className={`font-display font-bold ${s.title} tracking-tight ${isLight ? 'text-white' : 'text-brand'}`}>
          The Postgraduate Data Hub
        </div>
        <div className={`uppercase tracking-[0.25em] font-bold ${s.tag} ${isLight ? 'text-gold-300' : 'text-gold-600'}`}>
          Kenya
        </div>
      </div>
    </div>
  );
}
