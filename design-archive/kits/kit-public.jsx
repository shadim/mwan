// Public site homepage — parents + community discovering the school

function KitPublic() {
  return (
    <KitShell>
      {/* Slim top utility bar */}
      <div style={{
        height: 36, background: 'var(--accent-press)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', fontSize: 10, fontFamily: 'Reem Kufi',
      }}>
        <span style={{ letterSpacing: '0.08em' }}>☎ ٠٤ ٦٢٣ ٨٨٩١</span>
        <span style={{ display: 'flex', gap: 14 }}>
          <span>EN</span>
          <span style={{ color: 'var(--brass-300)' }}>AR ●</span>
          <span>HE</span>
        </span>
      </div>

      {/* Main nav */}
      <div style={{
        padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--bg-elev)', borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Star size={22} color="var(--accent)"/>
          <div>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: 14, fontWeight: 700, color: 'var(--fg-1)', lineHeight: 1 }}>
              المهاجرين والأنصار
            </div>
            <div style={{ fontSize: 9, color: 'var(--accent-warm)', letterSpacing: '0.15em', fontFamily: 'Reem Kufi', marginTop: 2 }}>
              MADRASA · EST 1426H
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--fg-2)', fontFamily: 'Reem Kufi' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>الرئيسية</span>
          <span>عنّا</span>
          <span>البرامج</span>
          <span>الأخبار</span>
          <span>تواصل</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ position: 'relative', padding: '36px 24px 28px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-hero)' }}/>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} aria-hidden>
          <defs>
            <pattern id="pub-pat" x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
              <g stroke="var(--accent)" strokeWidth="0.7" fill="none">
                {(() => {
                  const cx=35, cy=35, rO=26, rI=10; const pts=[];
                  for (let i=0;i<16;i++) { const r=i%2===0?rO:rI; const a=(Math.PI/8)*i-Math.PI/2;
                    pts.push(`${(cx+r*Math.cos(a)).toFixed(1)} ${(cy+r*Math.sin(a)).toFixed(1)}`); }
                  return <path d={'M'+pts.join(' L')+' Z'}/>;
                })()}
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pub-pat)"/>
        </svg>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow>العام الدراسي ١٤٤٧ هـ</Eyebrow>
          <h1 style={{
            fontFamily: 'Reem Kufi', fontSize: 30, fontWeight: 700, color: 'var(--fg-1)',
            margin: '16px 0 8px', lineHeight: 1.15,
          }}>
            نور العلم<br/>
            <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontFamily: 'Amiri, serif', fontWeight: 400 }}>
              وبركة التربية
            </span>
          </h1>
          <p style={{ fontSize: 12, color: 'var(--fg-2)', margin: '8px 20px 0', lineHeight: 1.75 }}>
            مدرسة قرآنية تعليمية تجمع بين الأصالة والعلوم الحديثة
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 22 }}>
            <Btn size="md">ابدأ التسجيل ←</Btn>
            <Btn variant="ghost" size="md">جولة افتراضية</Btn>
          </div>
        </div>
      </div>

      {/* Program strip */}
      <div style={{ padding: '20px 20px 0' }}>
        <Eyebrow>برامجنا</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 10 }}>
          {[
            { icon: '📖', title: 'تحفيظ القرآن', desc: 'حلقات يومية' },
            { icon: '🕌', title: 'العلوم الشرعية', desc: 'عقيدة وفقه' },
            { icon: '🔬', title: 'العلوم الحديثة', desc: 'منهج متكامل' },
          ].map((p, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '14px 10px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 22 }}>{p.icon}</div>
              <div style={{ fontFamily: 'Reem Kufi', fontSize: 12, fontWeight: 600, color: 'var(--fg-1)', marginTop: 6 }}>
                {p.title}
              </div>
              <div style={{ fontSize: 9.5, color: 'var(--fg-3)', marginTop: 2 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign */}
      <div style={{ padding: '18px 20px 0' }}>
        <Card eyebrow="حملة مستمرة" title="بناء قاعة القرآن"
          action={<Chip tone="warm">عاجل</Chip>}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 11, color: 'var(--fg-3)' }}>
            <span><span style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 700 }}>٦٨٪</span> من الهدف</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>١٣٦٬٠٠٠ / ٢٠٠٬٠٠٠ ₪</span>
          </div>
          <div style={{ height: 4, background: 'color-mix(in srgb, var(--accent) 12%, transparent)', borderRadius: 999, marginTop: 8, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '68%', background: 'var(--accent)' }}/>
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
            <Btn size="sm">ساهم الآن</Btn>
            <Btn variant="ghost" size="sm">تفاصيل</Btn>
          </div>
        </Card>
      </div>

      {/* Verse */}
      <div style={{ margin: '18px 28px 0', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 10 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--divider)' }}/>
          <Star size={10} color="var(--accent-warm)"/>
          <div style={{ flex: 1, height: 1, background: 'var(--divider)' }}/>
        </div>
        <div style={{ fontFamily: 'Amiri, serif', fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.9 }}>
          ﴾ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴿
        </div>
        <div style={{ fontSize: 9, color: 'var(--accent-warm)', marginTop: 4, letterSpacing: '0.15em', fontFamily: 'Reem Kufi' }}>
          طه · ١١٤
        </div>
      </div>
    </KitShell>
  );
}

window.KitPublic = KitPublic;
