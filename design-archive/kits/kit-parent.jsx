// Parent — child overview, messages, tuition

function KitParent() {
  return (
    <KitShell>
      <TopBar role="واجهة ولي الأمر" user="خ.ع"/>

      <div style={{ padding: '14px 16px 0' }}>
        {/* Child switcher */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {[
            { n: 'عبدالله', grade: 'الرابع', active: true, color: 'var(--accent)' },
            { n: 'مريم', grade: 'الثاني', active: false, color: 'var(--accent-warm)' },
          ].map((c, i) => (
            <div key={i} style={{
              flex: 1, padding: '10px 12px', borderRadius: 10,
              background: c.active ? 'var(--bg-card)' : 'transparent',
              border: c.active ? '1.5px solid var(--accent)' : '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: c.active ? 'var(--shadow-sm)' : 'none',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 999,
                background: c.color, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Reem Kufi', fontSize: 12, fontWeight: 700,
              }}>{c.n[0]}</div>
              <div>
                <div style={{ fontFamily: 'Reem Kufi', fontSize: 12, fontWeight: 600, color: 'var(--fg-1)' }}>
                  {c.n}
                </div>
                <div style={{ fontSize: 9.5, color: 'var(--fg-3)' }}>الصف {c.grade}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today snapshot */}
      <div style={{ padding: '12px 16px 0' }}>
        <Card eyebrow="اليوم في المدرسة" title="عبدالله · الصف الرابع" style={{ padding: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { n: '✓', l: 'حاضر', tone: 'var(--success)' },
              { n: '٣', l: 'آيات محفوظة', tone: 'var(--accent)' },
              { n: '٢', l: 'واجبات', tone: 'var(--accent-warm)' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '8px 0', background: 'var(--bg-card-hover)', borderRadius: 6 }}>
                <div style={{ fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: s.tone, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 9.5, color: 'var(--fg-3)', marginTop: 4, fontFamily: 'Reem Kufi' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Messages */}
      <div style={{ padding: '12px 16px 0' }}>
        <Card eyebrow="الرسائل" title="من المعلمين"
          action={<Chip tone="accent">٢ جديدة</Chip>}>
          {[
            { name: 'الأستاذ سعيد', role: 'معلم التحفيظ', msg: 'أبدى عبدالله تحسّناً ملحوظاً في التلاوة، ماشاء الله…', time: 'قبل ساعة', unread: true },
            { name: 'الأستاذة نور', role: 'معلمة الرياضيات', msg: 'يرجى مراجعة واجب الكسور مع عبدالله قبل…', time: 'أمس', unread: true },
            { name: 'إدارة المدرسة', role: '', msg: 'تذكير: اجتماع أولياء الأمور يوم الخميس', time: '٣ أيام', unread: false },
          ].map((m, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, padding: '10px 0',
              borderTop: i ? '1px solid var(--divider)' : 'none',
              position: 'relative',
            }}>
              {m.unread && (
                <div style={{ position: 'absolute', right: -6, top: 14, width: 6, height: 6, borderRadius: 999, background: 'var(--accent)' }}/>
              )}
              <div style={{
                width: 32, height: 32, borderRadius: 999,
                background: 'var(--green-100)', color: 'var(--accent-press)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Reem Kufi', fontSize: 11, fontWeight: 700, flexShrink: 0,
              }}>{m.name.split(' ').pop()[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'Reem Kufi', fontSize: 11.5, fontWeight: 600, color: 'var(--fg-1)' }}>{m.name}</span>
                  <span style={{ fontSize: 9.5, color: 'var(--fg-3)' }}>{m.time}</span>
                </div>
                {m.role && <div style={{ fontSize: 9.5, color: 'var(--accent-warm)', fontFamily: 'Reem Kufi', marginTop: 1 }}>{m.role}</div>}
                <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 3, lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {m.msg}
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Tuition */}
      <div style={{ padding: '12px 16px 70px' }}>
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 10, padding: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        }}>
          <div>
            <Eyebrow>الرسوم الدراسية</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
              <span style={{ fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>٨٥٠</span>
              <span style={{ fontSize: 11, color: 'var(--fg-3)' }}>₪ · شعبان</span>
            </div>
            <div style={{ fontSize: 10, color: 'var(--accent-warm)', marginTop: 2 }}>
              يستحق في ٢٨ من الشهر
            </div>
          </div>
          <Btn size="md">ادفع الآن</Btn>
        </div>
      </div>
    </KitShell>
  );
}

window.KitParent = KitParent;
