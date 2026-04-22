// Shared kit primitives — all use theme-mint semantic tokens
// Artboard: desktop-ish portrait so each surface reads as a real screen.

const KIT_W = 480;
const KIT_H = 820;

// 8-point khatam star
function Star({ size = 14, color = 'currentColor', opacity = 1 }) {
  const cx = 50, cy = 50, rO = 42, rI = 17;
  const pts = [];
  for (let i = 0; i < 16; i++) {
    const r = i % 2 === 0 ? rO : rI;
    const a = (Math.PI / 8) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }} aria-hidden>
      <path d={'M' + pts.join(' L') + ' Z'}
        fill={color} fillOpacity="0.18" stroke={color} strokeWidth="5" strokeLinejoin="round"/>
    </svg>
  );
}

// Top bar shared across apps — logo + role + actions
function TopBar({ role, user }) {
  return (
    <div style={{
      height: 52, padding: '0 18px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      background: 'var(--bg-elev)', borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Star size={18} color="var(--accent)"/>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ fontFamily: 'Reem Kufi', fontSize: 12, fontWeight: 700, color: 'var(--fg-1)' }}>
            المهاجرين والأنصار
          </span>
          <span style={{ fontSize: 9, color: 'var(--accent-warm)', letterSpacing: '0.12em', fontFamily: 'Reem Kufi' }}>
            {role}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          fontSize: 14, color: 'var(--fg-3)', width: 26, height: 26, display: 'flex',
          alignItems: 'center', justifyContent: 'center', borderRadius: 999,
          background: 'var(--bg-card-hover)',
        }}>🔔</div>
        <div style={{
          width: 28, height: 28, borderRadius: 999, background: 'var(--accent)',
          color: 'var(--on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Reem Kufi', fontSize: 11, fontWeight: 700,
        }}>{user}</div>
      </div>
    </div>
  );
}

function SideRail({ items, active }) {
  return (
    <div style={{
      width: 54, background: 'var(--bg-elev)', borderLeft: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '14px 0', gap: 4, flexShrink: 0,
    }}>
      {items.map((it, i) => (
        <div key={i} style={{
          width: 38, height: 38, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: i === active ? 'var(--accent)' : 'transparent',
          color: i === active ? 'var(--on-accent)' : 'var(--fg-3)',
          fontSize: 16, position: 'relative',
        }}>
          {it}
        </div>
      ))}
    </div>
  );
}

function Eyebrow({ children, color = 'var(--accent-warm)' }) {
  return (
    <div style={{
      fontFamily: 'Reem Kufi', fontSize: 9.5, fontWeight: 500,
      color, letterSpacing: '0.18em', textTransform: 'uppercase',
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <span style={{ width: 14, height: 1, background: color, opacity: 0.6 }}/>
      {children}
    </div>
  );
}

function Card({ children, style, title, eyebrow, action }) {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)', padding: 14,
      boxShadow: 'var(--shadow-sm)',
      ...style,
    }}>
      {(title || eyebrow || action) && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <div style={{ fontFamily: 'Reem Kufi', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)', marginTop: eyebrow ? 4 : 0 }}>{title}</div>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

function Chip({ children, tone = 'default' }) {
  const tones = {
    default: { bg: 'var(--bg-card-hover)', fg: 'var(--fg-2)' },
    accent:  { bg: 'color-mix(in srgb, var(--accent) 12%, transparent)', fg: 'var(--accent-press)' },
    warm:    { bg: 'color-mix(in srgb, var(--accent-warm) 15%, transparent)', fg: 'var(--accent-warm-hover)' },
    success: { bg: 'color-mix(in srgb, var(--success) 14%, transparent)', fg: 'var(--success)' },
    danger:  { bg: 'color-mix(in srgb, var(--danger) 12%, transparent)', fg: 'var(--danger)' },
  };
  const t = tones[tone] || tones.default;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 10px', borderRadius: 999, fontSize: 10.5,
      fontFamily: 'Reem Kufi', fontWeight: 500,
      background: t.bg, color: t.fg,
    }}>{children}</span>
  );
}

function Btn({ children, variant = 'primary', size = 'md', style }) {
  const variants = {
    primary: { bg: 'var(--accent)', fg: 'var(--on-accent)', border: 'none', shadow: 'var(--shadow-accent)' },
    ghost:   { bg: 'transparent', fg: 'var(--fg-1)', border: '1px solid var(--border)', shadow: 'none' },
    warm:    { bg: 'var(--accent-warm)', fg: '#fff', border: 'none', shadow: 'var(--shadow-md)' },
  };
  const sizes = { sm: { p: '6px 12px', fs: 11 }, md: { p: '9px 18px', fs: 12 }, lg: { p: '12px 22px', fs: 13 } };
  const v = variants[variant]; const s = sizes[size];
  return (
    <button style={{
      padding: s.p, fontSize: s.fs, fontFamily: 'Reem Kufi', fontWeight: 600,
      background: v.bg, color: v.fg, border: v.border, borderRadius: 6,
      boxShadow: v.shadow, cursor: 'pointer', ...style,
    }}>{children}</button>
  );
}

// Shell wrapper — sets body bg + font + dir and applies theme-mint
function KitShell({ children, style }) {
  return (
    <div className="theme-mint" data-theme="mint"
      dir="rtl" lang="ar"
      style={{
        width: KIT_W, height: KIT_H, overflow: 'hidden',
        fontFamily: 'Tajawal, sans-serif', position: 'relative',
        // The outer tokens bleed from the host page (design canvas uses light bg).
        // Applying theme-mint here means every kit previews in Mint Garden.
        background: 'var(--bg)', color: 'var(--fg-2)',
        ...style,
      }}>
      {children}
    </div>
  );
}

Object.assign(window, {
  KIT_W, KIT_H, Star, TopBar, SideRail, Eyebrow, Card, Chip, Btn, KitShell,
});
