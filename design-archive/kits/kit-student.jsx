// Student — friendlier, more playful. Progress, today's lessons, hifz tracker.

function KitStudent() {
  return (
    <KitShell>
      <TopBar role="واجهة الطالب" user="ع.أ"/>

      <div style={{ padding: '16px 16px 10px' }}>
        {/* Greeting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 999,
            background: 'linear-gradient(135deg, var(--accent), var(--accent-press))',
            color: 'var(--on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Reem Kufi', fontSize: 16, fontWeight: 700,
            boxShadow: 'var(--shadow-accent)',
          }}>ع.أ</div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>السلام عليكم</div>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: 17, fontWeight: 700, color: 'var(--fg-1)', marginTop: 1 }}>
              عبدالله 👋
            </div>
          </div>
        </div>
      </div>

      {/* Hifz streak card */}
      <div style={{ padding: '6px 16px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--accent-press), var(--green-800))',
          borderRadius: 12, padding: 16, color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -12, left: -12, opacity: 0.22 }}>
            <Star size={80} color="var(--brass-300)"/>
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 10, color: 'var(--brass-300)', fontFamily: 'Reem Kufi', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              سلسلة الحفظ
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
              <span style={{ fontFamily: 'Reem Kufi', fontSize: 32, fontWeight: 800, lineHeight: 1, color: 'var(--brass-300)' }}>٢٣</span>
              <span style={{ fontSize: 13, fontFamily: 'Reem Kufi', color: '#fff', opacity: 0.9 }}>يوماً متتالياً 🔥</span>
            </div>
            <div style={{ marginTop: 12, fontSize: 11, color: '#F5ECD8', opacity: 0.85 }}>
              جزء عمّ · <span style={{ color: 'var(--brass-300)', fontWeight: 600 }}>١٨ / ٣٧</span> سورة محفوظة
            </div>
            <div style={{ height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 999, marginTop: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '48%', background: 'var(--brass-300)' }}/>
            </div>
          </div>
        </div>
      </div>

      {/* Today schedule */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <Eyebrow>جدول اليوم</Eyebrow>
          <span style={{ fontSize: 10, color: 'var(--fg-3)' }}>الثلاثاء · ٢٢ رمضان</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { time: '٨:٠٠', title: 'حلقة التحفيظ', sub: 'الأستاذ سعيد', state: 'done' },
            { time: '٩:٣٠', title: 'الرياضيات', sub: 'الكسور العشرية', state: 'now' },
            { time: '١١:٠٠', title: 'التفسير', sub: 'سورة الفيل', state: 'upcoming' },
            { time: '١:٠٠', title: 'العربية', sub: 'الإعراب', state: 'upcoming' },
          ].map((s, i) => {
            const border = s.state === 'now' ? 'var(--accent)' : 'var(--border)';
            const bg = s.state === 'now' ? 'var(--green-050)' : 'var(--bg-card)';
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: '10px 12px',
                position: 'relative',
              }}>
                {s.state === 'now' && (
                  <div style={{ position: 'absolute', right: -2, top: '50%', transform: 'translateY(-50%)', width: 3, height: '60%', background: 'var(--accent)', borderRadius: 2 }}/>
                )}
                <div style={{
                  fontFamily: 'Reem Kufi', fontSize: 12, fontWeight: 700,
                  color: s.state === 'done' ? 'var(--fg-3)' : 'var(--accent-press)',
                  width: 40, fontVariantNumeric: 'tabular-nums',
                  textDecoration: s.state === 'done' ? 'line-through' : 'none',
                }}>{s.time}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Reem Kufi', fontSize: 12.5, fontWeight: 600, color: 'var(--fg-1)' }}>{s.title}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--fg-3)', marginTop: 1 }}>{s.sub}</div>
                </div>
                {s.state === 'now' && <Chip tone="accent">الآن</Chip>}
                {s.state === 'done' && <span style={{ color: 'var(--success)', fontSize: 14 }}>✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 58,
        background: 'var(--bg-elev)', borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      }}>
        {[
          { icon: '🏠', label: 'الرئيسية', active: true },
          { icon: '📖', label: 'الحفظ', active: false },
          { icon: '📅', label: 'الجدول', active: false },
          { icon: '🏆', label: 'الإنجاز', active: false },
        ].map((t, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            color: t.active ? 'var(--accent)' : 'var(--fg-3)',
          }}>
            <span style={{ fontSize: 16 }}>{t.icon}</span>
            <span style={{ fontSize: 9.5, fontFamily: 'Reem Kufi', fontWeight: t.active ? 600 : 400 }}>{t.label}</span>
          </div>
        ))}
      </div>
    </KitShell>
  );
}

window.KitStudent = KitStudent;
