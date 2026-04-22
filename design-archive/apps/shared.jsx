// Shared app shell components — all apps use theme-mint tokens
// Responsive: bottom tabs (mobile) → top bar (tablet) → side rail (desktop)

const AppLangCtx = React.createContext({ lang: 'ar', setLang: () => {} });
function useAppLang() { return React.useContext(AppLangCtx); }

function AppLangProvider({ children }) {
  const [lang, setLang] = React.useState(() => localStorage.getItem('awa-lang') || 'ar');
  React.useEffect(() => { localStorage.setItem('awa-lang', lang); }, [lang]);
  React.useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);
  return React.createElement(AppLangCtx.Provider, { value: { lang, setLang } }, children);
}

function AT({ ar, en }) {
  const { lang } = useAppLang();
  return lang === 'ar' ? ar : en;
}

// 8-point star
function AppStar({ size = 16, color = 'currentColor' }) {
  const cx=50,cy=50,rO=42,rI=17,pts=[];
  for(let i=0;i<16;i++){const r=i%2===0?rO:rI;const a=(Math.PI/8)*i-Math.PI/2;
    pts.push(`${(cx+r*Math.cos(a)).toFixed(1)} ${(cy+r*Math.sin(a)).toFixed(1)}`);}
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{flexShrink:0}}>
      <path d={'M'+pts.join(' L')+' Z'} fill={color} fillOpacity="0.2" stroke={color} strokeWidth="4" strokeLinejoin="round"/>
    </svg>
  );
}

function AppEyebrow({ children, color = 'var(--accent-warm)' }) {
  return (
    <div style={{
      fontFamily: 'Reem Kufi', fontSize: 10, fontWeight: 500,
      color, letterSpacing: '0.18em', textTransform: 'uppercase',
      display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4,
    }}>
      <span style={{ width: 14, height: 1, background: color, opacity: 0.6 }}/>
      {children}
    </div>
  );
}

function AppCard({ children, style, title, eyebrow, action }) {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 12, padding: 16, boxShadow: 'var(--shadow-sm)', ...style,
    }}>
      {(title || eyebrow || action) && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            {eyebrow && <AppEyebrow>{eyebrow}</AppEyebrow>}
            {title && <div style={{ fontFamily: 'Reem Kufi', fontSize: 15, fontWeight: 600, color: 'var(--fg-1)', marginTop: eyebrow ? 4 : 0 }}>{title}</div>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

function AppChip({ children, tone = 'default' }) {
  const tones = {
    default: { bg: 'var(--bg-card-hover)', fg: 'var(--fg-2)' },
    accent: { bg: 'color-mix(in srgb, var(--accent) 12%, transparent)', fg: 'var(--accent)' },
    warm: { bg: 'color-mix(in srgb, var(--accent-warm) 15%, transparent)', fg: 'var(--accent-warm)' },
    success: { bg: 'color-mix(in srgb, var(--success) 14%, transparent)', fg: 'var(--success)' },
    danger: { bg: 'color-mix(in srgb, var(--danger) 12%, transparent)', fg: 'var(--danger)' },
  };
  const t = tones[tone] || tones.default;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 12px', borderRadius: 999, fontSize: 11,
      fontFamily: 'Reem Kufi', fontWeight: 500, background: t.bg, color: t.fg,
    }}>{children}</span>
  );
}

function AppBtn({ children, variant = 'primary', size = 'md', onClick, style }) {
  const v = {
    primary: { bg: 'var(--accent)', fg: 'var(--on-accent)', border: 'none', shadow: 'var(--shadow-accent)' },
    ghost: { bg: 'transparent', fg: 'var(--fg-1)', border: '1px solid var(--border)', shadow: 'none' },
    warm: { bg: 'var(--accent-warm)', fg: '#fff', border: 'none', shadow: 'var(--shadow-md)' },
    danger: { bg: 'var(--danger)', fg: '#fff', border: 'none', shadow: 'none' },
  }[variant] || {};
  const s = { sm: { p: '7px 14px', fs: 11 }, md: { p: '10px 20px', fs: 13 }, lg: { p: '13px 26px', fs: 14 } }[size];
  return (
    <button onClick={onClick} style={{
      padding: s.p, fontSize: s.fs, fontFamily: 'Reem Kufi', fontWeight: 600,
      background: v.bg, color: v.fg, border: v.border, borderRadius: 8,
      boxShadow: v.shadow, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, ...style,
    }}>{children}</button>
  );
}

// Full app shell — responsive with side rail (desktop), top bar, bottom tabs (mobile)
function AppShell({ tabs, activeTab, onTabChange, role, roleEn, user, children }) {
  const { lang, setLang } = useAppLang();
  return (
    <div className="theme-mint" data-theme="mint" style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .app-side-rail { display: none; }
        .app-bottom-tabs { display: flex; }
        .app-body { padding-bottom: 72px; }
        @media (min-width: 768px) {
          .app-bottom-tabs { display: none !important; }
          .app-body { padding-bottom: 0; }
        }
        @media (min-width: 1024px) {
          .app-side-rail { display: flex !important; }
          .app-main-wrap { flex-direction: row !important; }
        }
      `}</style>

      {/* Top bar */}
      <div style={{
        height: 56, padding: '0 20px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', background: 'var(--bg-elev)',
        borderBottom: '1px solid var(--border)', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AppStar size={20} color="var(--accent)"/>
          <div style={{ lineHeight: 1.1 }}>
            <span style={{ fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: 700, color: 'var(--fg-1)' }}>
              المهاجرين والأنصار
            </span>
            <div style={{ fontSize: 9, color: 'var(--accent-warm)', letterSpacing: '0.12em', fontFamily: 'Reem Kufi' }}>
              <AT ar={role} en={roleEn}/>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} style={{
            background: 'var(--bg-card-hover)', border: 'none', borderRadius: 6,
            padding: '5px 10px', fontSize: 10, fontFamily: 'Reem Kufi', fontWeight: 600,
            color: 'var(--fg-2)', cursor: 'pointer',
          }}>{lang === 'ar' ? 'EN' : 'AR'}</button>
          <div style={{
            width: 32, height: 32, borderRadius: 999, background: 'var(--accent)',
            color: 'var(--on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Reem Kufi', fontSize: 11, fontWeight: 700,
          }}>{user}</div>
        </div>
      </div>

      {/* Main area */}
      <div className="app-main-wrap" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Side rail — desktop only */}
        <div className="app-side-rail" style={{
          width: 64, background: 'var(--bg-elev)', borderLeft: '1px solid var(--border)',
          flexDirection: 'column', alignItems: 'center', padding: '16px 0', gap: 4, flexShrink: 0,
        }}>
          {tabs.map((t, i) => (
            <button key={i} onClick={() => onTabChange(i)} title={lang === 'ar' ? t.ar : t.en}
              style={{
                width: 44, height: 44, borderRadius: 10, border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: i === activeTab ? 'var(--accent)' : 'transparent',
                color: i === activeTab ? 'var(--on-accent)' : 'var(--fg-3)',
                fontSize: 18, cursor: 'pointer', transition: 'all 0.15s',
              }}>{t.icon}</button>
          ))}
        </div>

        {/* Content */}
        <div className="app-body" style={{ flex: 1, padding: 20, overflow: 'auto' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>{children}</div>
        </div>
      </div>

      {/* Bottom tabs — mobile */}
      <div className="app-bottom-tabs" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: 64,
        background: 'var(--bg-elev)', borderTop: '1px solid var(--border)',
        justifyContent: 'space-around', alignItems: 'center', zIndex: 40,
      }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => onTabChange(i)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            border: 'none', background: 'transparent', cursor: 'pointer', padding: '6px 0',
            color: i === activeTab ? 'var(--accent)' : 'var(--fg-3)',
          }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            <span style={{ fontSize: 9, fontFamily: 'Reem Kufi', fontWeight: i === activeTab ? 600 : 400 }}>
              <AT ar={t.ar} en={t.en}/>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Stat tile
function AppStat({ label, labelEn, value, valueEn, delta, positive }) {
  const { lang } = useAppLang();
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '14px 16px',
    }}>
      <div style={{ fontSize: 10, color: 'var(--fg-3)', fontFamily: 'Reem Kufi', letterSpacing: '0.1em' }}>
        {lang === 'ar' ? label : labelEn}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
        <span style={{ fontFamily: 'Reem Kufi', fontSize: 24, fontWeight: 700, color: 'var(--fg-1)', fontVariantNumeric: 'tabular-nums' }}>
          {lang === 'ar' ? value : valueEn}
        </span>
        {delta && (
          <span style={{ fontSize: 10, color: positive ? 'var(--success)' : 'var(--fg-3)', fontWeight: 600 }}>
            {positive ? '↑' : ''} {delta}
          </span>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  AppLangCtx, AppLangProvider, useAppLang, AT, AppStar, AppEyebrow,
  AppCard, AppChip, AppBtn, AppShell, AppStat,
});
