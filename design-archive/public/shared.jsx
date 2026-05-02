// Shared components for public site — Mint Garden theme
// All use semantic tokens from colors_and_type.css .theme-mint

const NAV_LINKS = [
  { ar: 'الرئيسية', en: 'Home', href: 'index.html' },
  // { ar: 'عنّا', en: 'About', href: 'about.html' },
  // { ar: 'البرامج', en: 'Programs', href: 'programs.html' },
  // { ar: 'الأخبار', en: 'News', href: 'news.html' },
  { ar: 'تواصل', en: 'Contact', href: 'contact.html' },
];

const LangCtx = React.createContext({ lang: 'ar', setLang: () => {} });
function useLang() { return React.useContext(LangCtx); }

function LangProvider({ children }) {
  const [lang, setLang] = React.useState(() => localStorage.getItem('awa-lang') || 'ar');
  React.useEffect(() => { localStorage.setItem('awa-lang', lang); }, [lang]);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  React.useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [dir, lang]);
  return React.createElement(LangCtx.Provider, { value: { lang, setLang, dir } }, children);
}

function T({ ar, en }) {
  const { lang } = useLang();
  return lang === 'ar' ? ar : en;
}

// 8-point star
function Star8({ size = 16, color = 'currentColor' }) {
  const cx=50,cy=50,rO=42,rI=17,pts=[];
  for(let i=0;i<16;i++){const r=i%2===0?rO:rI;const a=(Math.PI/8)*i-Math.PI/2;
    pts.push(`${(cx+r*Math.cos(a)).toFixed(1)} ${(cy+r*Math.sin(a)).toFixed(1)}`);}
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{flexShrink:0}}>
      <path d={'M'+pts.join(' L')+' Z'} fill={color} fillOpacity="0.2" stroke={color} strokeWidth="4" strokeLinejoin="round"/>
    </svg>
  );
}

// Top utility bar
function UtilBar() {
  const { lang, setLang } = useLang();
  return (
    <div style={{
      background: 'var(--green-800)', color: '#fff', fontSize: 12,
      padding: '6px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: 'Reem Kufi, sans-serif',
    }}>
      <span style={{ letterSpacing: '0.06em', opacity: 0.9 }}>
        <T ar="☎ 052-5534466, 053-8084944" en="☎ 04-623-8891"/>
      </span>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {['AR','EN'].map(l => (
          <button key={l} onClick={() => setLang(l.toLowerCase())}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: lang === l.toLowerCase() ? 'var(--brass-300)' : 'rgba(255,255,255,0.6)',
              fontFamily: 'Reem Kufi', fontSize: 11, fontWeight: lang === l.toLowerCase() ? 700 : 400,
              padding: 0,
            }}>{l} {lang === l.toLowerCase() ? '●' : ''}</button>
        ))}
      </div>
    </div>
  );
}

// Main navigation
function Navbar({ activePage }) {
  const { lang } = useLang();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <nav style={{
      background: 'var(--bg-elev)', borderBottom: '1px solid var(--border)',
      padding: '0 24px', position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        {/* Logo */}
        <a href="index.html" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Star8 size={28} color="var(--accent)"/>
          <div>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: 16, fontWeight: 700, color: 'var(--fg-1)', lineHeight: 1 }}>
              المهاجرين والأنصار
            </div>
            <div style={{ fontSize: 9, color: 'var(--accent-warm)', letterSpacing: '0.15em', fontFamily: 'Reem Kufi', marginTop: 2 }}>
              MADRASA · EST 1426H
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="nav-links-desktop" style={{
          display: 'flex', gap: 28, alignItems: 'center',
        }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} style={{
              fontFamily: 'Reem Kufi', fontSize: 14, fontWeight: activePage === l.href ? 700 : 500,
              color: activePage === l.href ? 'var(--accent)' : 'var(--fg-2)',
              textDecoration: 'none',
              borderBottom: activePage === l.href ? '2px solid var(--accent)' : '2px solid transparent',
              paddingBottom: 4,
              transition: 'color 0.15s',
            }}>{lang === 'ar' ? l.ar : l.en}</a>
          ))}
        </div>

        {/* CTA */}
        <a href="contact.html" className="nav-cta-desktop" style={{
          background: 'var(--accent)', color: 'var(--on-accent)',
          padding: '10px 20px', borderRadius: 8, fontFamily: 'Reem Kufi',
          fontSize: 13, fontWeight: 600, textDecoration: 'none',
          boxShadow: 'var(--shadow-accent)',
        }}>
          <T ar="سجّل الآن" en="Register Now"/>
        </a>

        {/* Mobile hamburger */}
        <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'none', border: 'none', fontSize: 24, color: 'var(--fg-1)', cursor: 'pointer', padding: 8, display: 'none' }}>
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="nav-mobile-menu" style={{
          padding: '12px 24px 20px', background: 'var(--bg-elev)',
          borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} style={{
              fontFamily: 'Reem Kufi', fontSize: 16, fontWeight: activePage === l.href ? 700 : 500,
              color: activePage === l.href ? 'var(--accent)' : 'var(--fg-2)',
              textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid var(--divider)',
            }}>{lang === 'ar' ? l.ar : l.en}</a>
          ))}
          <a href="contact.html" style={{
            background: 'var(--accent)', color: 'var(--on-accent)',
            padding: '12px', borderRadius: 8, fontFamily: 'Reem Kufi',
            fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center',
            marginTop: 4,
          }}>
            <T ar="سجّل الآن" en="Register Now"/>
          </a>
        </div>
      )}
    </nav>
  );
}

// Section wrapper
function Section({ children, bg, style, id }) {
  return (
    <section id={id} style={{ padding: '64px 24px', background: bg || 'transparent', ...style }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>{children}</div>
    </section>
  );
}

function SectionEyebrow({ children }) {
  return (
    <div style={{
      fontFamily: 'Reem Kufi', fontSize: 12, fontWeight: 500,
      color: 'var(--accent-warm)', letterSpacing: '0.18em', textTransform: 'uppercase',
      display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
    }}>
      <span style={{ width: 20, height: 1, background: 'currentColor', opacity: 0.6 }}/>
      {children}
    </div>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{
        fontFamily: 'Reem Kufi', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700,
        color: 'var(--fg-1)', margin: 0, lineHeight: 1.2,
      }}>{children}</h2>
      {sub && <p style={{ fontSize: 16, color: 'var(--fg-3)', marginTop: 8, lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

// Footer
function Footer() {
  const { lang } = useLang();
  return (
    <footer style={{
      background: 'var(--green-900)', color: 'rgba(255,255,255,0.7)',
      padding: '48px 24px 24px', fontFamily: 'Tajawal, sans-serif',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Star8 size={24} color="var(--brass-300)"/>
            <span style={{ fontFamily: 'Reem Kufi', fontSize: 16, fontWeight: 700, color: '#fff' }}>
              المهاجرين والأنصار
            </span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.8, opacity: 0.7, margin: 0 }}>
            <T ar="مدرسة قرآنية تعليمية تجمع بين الأصالة والعلوم الحديثة، تأسست عام ١٤٤٥ هـ"
               en="A Quranic educational school blending tradition and modern sciences, est. 1426H"/>
          </p>
        </div>
        <div>
          <div style={{ fontFamily: 'Reem Kufi', fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 12 }}>
            <T ar="روابط سريعة" en="Quick Links"/>
          </div>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} style={{
              display: 'block', color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
              fontSize: 13, padding: '4px 0', fontFamily: 'Reem Kufi',
            }}>{lang === 'ar' ? l.ar : l.en}</a>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: 'Reem Kufi', fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 12 }}>
            <T ar="تواصل معنا" en="Contact Us"/>
          </div>
          <div style={{ fontSize: 13, lineHeight: 2, opacity: 0.7 }}>
            <T ar="☎ 052-5534466, 053-8084944" en="☎ 04-623-8891"/><br/>
            <T ar="✉ almohagren96@gmail.com" en="✉ almohagren96@gmail.com"/><br/>
            <T ar="📍 كفرقرع، المثلث" en="📍 Negev, Palestine"/>
          </div>
        </div>
      </div>
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 32, paddingTop: 16,
        textAlign: 'center', fontSize: 11, opacity: 0.5,
      }}>
        <T ar="© ١٤٤٧ هـ / ٢٠٢٦ م · مدرسة المهاجرين والأنصار · جميع الحقوق محفوظة"
           en="© 1447H / 2026 · Almohajirin wel Ansar Madrasa · All rights reserved"/>
      </div>
    </footer>
  );
}

// Responsive CSS injected once
function ResponsiveStyles() {
  return (
    <style>{`
      @media (max-width: 768px) {
        .nav-links-desktop, .nav-cta-desktop { display: none !important; }
        .nav-hamburger { display: block !important; }
      }
      @media (min-width: 769px) {
        .nav-mobile-menu { display: none !important; }
      }
    `}</style>
  );
}

// Page wrapper
function PageShell({ activePage, children }) {
  return (
    <LangProvider>
      <div className="theme-mint" data-theme="mint" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <ResponsiveStyles/>
        <UtilBar/>
        <Navbar activePage={activePage}/>
        {children}
        <Footer/>
      </div>
    </LangProvider>
  );
}

Object.assign(window, {
  LangCtx, LangProvider, useLang, T, Star8, UtilBar, Navbar,
  Section, SectionEyebrow, SectionTitle, Footer, ResponsiveStyles, PageShell,
  NAV_LINKS,
});
