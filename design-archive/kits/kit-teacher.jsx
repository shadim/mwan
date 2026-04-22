// Teacher — class roster + attendance taking + lesson plan

function KitTeacher() {
  return (
    <KitShell>
      <div style={{ display: 'flex', height: '100%' }}>
        <SideRail items={['📚','✓','📖','💬','📅','👤']} active={1}/>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <TopBar role="واجهة المعلم" user="أ.ف"/>

          <div style={{ flex: 1, padding: 16, overflow: 'hidden' }}>
            {/* Class header */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <Eyebrow>الفصل الحالي</Eyebrow>
                <div style={{ fontFamily: 'Reem Kufi', fontSize: 17, fontWeight: 700, color: 'var(--fg-1)', marginTop: 4 }}>
                  الصف الرابع — شعبة ب
                </div>
                <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>
                  التفسير · ٨:٣٠ — ٩:٢٠ صباحاً
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Reem Kufi', fontSize: 24, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                  ٢٤<span style={{ color: 'var(--fg-3)', fontSize: 14, fontWeight: 500 }}> / ٢٦</span>
                </div>
                <div style={{ fontSize: 9, color: 'var(--fg-3)', marginTop: 4, letterSpacing: '0.12em' }}>
                  حاضر
                </div>
              </div>
            </div>

            {/* Tab-ish row */}
            <div style={{ display: 'flex', gap: 4, marginTop: 14, padding: 3, background: 'var(--bg-card-hover)', borderRadius: 8 }}>
              {['الحضور', 'الدرس', 'الواجبات', 'الملاحظات'].map((t, i) => (
                <div key={i} style={{
                  flex: 1, padding: '7px 0', textAlign: 'center',
                  fontFamily: 'Reem Kufi', fontSize: 11, fontWeight: 600,
                  background: i === 0 ? 'var(--bg-elev)' : 'transparent',
                  color: i === 0 ? 'var(--accent-press)' : 'var(--fg-3)',
                  borderRadius: 6,
                  boxShadow: i === 0 ? 'var(--shadow-sm)' : 'none',
                }}>{t}</div>
              ))}
            </div>

            {/* Attendance roster */}
            <div style={{ marginTop: 12, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
              {[
                { name: 'عبدالله أحمد الشامي', id: '٠٤٧١', status: 'present' },
                { name: 'مريم يوسف الحسيني', id: '٠٤٧٢', status: 'present' },
                { name: 'محمد خالد القاسم', id: '٠٤٧٣', status: 'late' },
                { name: 'عائشة محمود', id: '٠٤٧٤', status: 'present' },
                { name: 'يوسف إبراهيم', id: '٠٤٧٥', status: 'absent' },
                { name: 'سارة عبدالرحمن', id: '٠٤٧٦', status: 'present' },
              ].map((s, i) => {
                const tone = s.status === 'present' ? 'success' : s.status === 'late' ? 'warm' : 'danger';
                const label = s.status === 'present' ? 'حاضر' : s.status === 'late' ? 'متأخر' : 'غائب';
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px',
                    borderTop: i ? '1px solid var(--divider)' : 'none',
                  }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 999,
                      background: 'var(--green-100)', color: 'var(--accent-press)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Reem Kufi', fontSize: 11, fontWeight: 700,
                    }}>{s.name[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Reem Kufi', fontSize: 12, fontWeight: 500, color: 'var(--fg-1)' }}>
                        {s.name}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--fg-3)', fontVariantNumeric: 'tabular-nums' }}>
                        رقم: {s.id}
                      </div>
                    </div>
                    <Chip tone={tone}>{label}</Chip>
                  </div>
                );
              })}
            </div>

            {/* Lesson plan prompt */}
            <Card style={{ marginTop: 10, background: 'var(--accent-press)', borderColor: 'var(--accent-press)', color: '#fff', padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Star size={24} color="var(--brass-300)"/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 9.5, color: 'var(--brass-300)', fontFamily: 'Reem Kufi', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    الدرس القادم
                  </div>
                  <div style={{ fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: 600, color: '#fff', marginTop: 3 }}>
                    سورة الفيل · التفسير والمفردات
                  </div>
                </div>
                <Btn variant="warm" size="sm">ابدأ</Btn>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </KitShell>
  );
}

window.KitTeacher = KitTeacher;
