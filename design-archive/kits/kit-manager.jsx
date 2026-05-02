// Manager dashboard — operational overview

function KitManager() {
  return (
    <KitShell>
      <div style={{ display: 'flex', height: '100%' }}>
        <SideRail items={['◉','📊','👥','💰','🗓','⚙']} active={1}/>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <TopBar role="لوحة المدير" user="م.ع"/>

          {/* Body */}
          <div style={{ flex: 1, padding: 16, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
                  مرحباً، الأستاذ محمد
                </h2>
                <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>
                  ٢٢ رمضان ١٤٤٧ هـ · الثلاثاء
                </div>
              </div>
              <Btn size="sm" variant="ghost">تصدير تقرير</Btn>
            </div>

            {/* KPI row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 14 }}>
              {[
                { n: '٤٥', l: 'الطلاب', d: '+١٢', pos: true },
                { n: '٩٦٪', l: 'الحضور', d: '+٢', pos: true },
                { n: '٣٢', l: 'المعلمين', d: '—', pos: null },
                { n: '٦٨٪', l: 'حملة البناء', d: '+٥', pos: true },
              ].map((k, i) => (
                <div key={i} style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: '10px 12px',
                }}>
                  <div style={{ fontSize: 9, color: 'var(--fg-3)', fontFamily: 'Reem Kufi', letterSpacing: '0.1em' }}>{k.l}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                    <span style={{ fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>{k.n}</span>
                    {k.pos !== null && (
                      <span style={{ fontSize: 9.5, color: k.pos ? 'var(--success)' : 'var(--fg-3)', fontWeight: 600 }}>
                        {k.pos ? '↑' : ''} {k.d}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Two-col: attendance + tasks */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10, marginTop: 12 }}>
              <Card eyebrow="الحضور الأسبوعي" title="آخر ٧ أيام" style={{ padding: 12 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 90, marginTop: 6 }}>
                  {[86, 92, 88, 96, 94, 90, 96].map((v, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: '100%', height: `${v}%`, background: i === 6 ? 'var(--accent)' : 'var(--green-300)', borderRadius: '3px 3px 0 0' }}/>
                      <span style={{ fontSize: 8.5, color: 'var(--fg-3)', fontVariantNumeric: 'tabular-nums' }}>{v}٪</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card eyebrow="مهام اليوم" title="٤ مفتوحة" style={{ padding: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { t: 'مراجعة ميزانية شعبان', tag: 'عاجل', tone: 'danger' },
                    { t: 'اجتماع أولياء الأمور', tag: 'اليوم', tone: 'warm' },
                    { t: 'توظيف معلم جديد', tag: 'قيد المراجعة', tone: 'default' },
                  ].map((t, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, borderRadius: 4, border: '1.5px solid var(--border)', flexShrink: 0 }}/>
                      <span style={{ fontSize: 11.5, color: 'var(--fg-1)', flex: 1 }}>{t.t}</span>
                      <Chip tone={t.tone}>{t.tag}</Chip>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Donations table */}
            <Card eyebrow="التبرعات الأخيرة" title="هذا الأسبوع"
              action={<Chip tone="success">+٢٣ تبرعاً</Chip>}
              style={{ marginTop: 10 }}>
              {[
                { name: 'أحمد الحسيني', purpose: 'زكاة', amt: '٢٬٥٠٠', time: 'قبل ساعة' },
                { name: 'فاطمة الزهراء', purpose: 'حملة البناء', amt: '١٬٠٠٠', time: 'قبل ٣ س' },
                { name: 'خالد عبدالله', purpose: 'كفالة طالب', amt: '٦٠٠', time: 'أمس' },
              ].map((d, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 0', borderTop: i ? '1px solid var(--divider)' : 'none',
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 999, background: 'var(--bg-card-hover)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontFamily: 'Reem Kufi', color: 'var(--accent-press)',
                  }}>{d.name[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11.5, color: 'var(--fg-1)', fontFamily: 'Reem Kufi', fontWeight: 500 }}>{d.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--fg-3)' }}>{d.purpose} · {d.time}</div>
                  </div>
                  <div style={{ fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: 700, color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>
                    {d.amt} ₪
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </KitShell>
  );
}

window.KitManager = KitManager;
