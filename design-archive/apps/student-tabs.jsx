// Student app — all tab contents

function StudentHomeTab() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 999,
          background: 'linear-gradient(135deg, var(--accent), var(--green-700))',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Reem Kufi', fontSize: 18, fontWeight: 700, boxShadow: 'var(--shadow-accent)',
        }}>ع.أ</div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)' }}><AT ar="السلام عليكم" en="Assalamu Alaikum"/></div>
          <div style={{ fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
            <AT ar="عبدالله" en="Abdullah"/> 👋
          </div>
        </div>
      </div>

      {/* Hifz streak */}
      <div style={{
        background: 'linear-gradient(135deg, var(--green-700), var(--green-900))',
        borderRadius: 14, padding: 20, color: '#fff', position: 'relative', overflow: 'hidden', marginBottom: 14,
      }}>
        <div style={{ position: 'absolute', top: -10, left: -10, opacity: 0.15 }}>
          <AppStar size={80} color="var(--brass-300)"/>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 10, color: 'var(--brass-300)', fontFamily: 'Reem Kufi', letterSpacing: '0.15em' }}>
            <AT ar="سلسلة الحفظ" en="MEMORIZATION STREAK"/>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
            <span style={{ fontFamily: 'Reem Kufi', fontSize: 36, fontWeight: 800, color: 'var(--brass-300)' }}>٢٣</span>
            <span style={{ fontSize: 14, opacity: 0.9 }}><AT ar="يوماً متتالياً 🔥" en="consecutive days 🔥"/></span>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: '#F5ECD8', opacity: 0.85 }}>
            <AT ar="جزء عمّ" en="Juz Amma"/> · <span style={{ color: 'var(--brass-300)', fontWeight: 600 }}>١٨ / ٣٧</span> <AT ar="سورة محفوظة" en="surahs memorized"/>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 999, marginTop: 8, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '48%', background: 'var(--brass-300)', borderRadius: 999 }}/>
          </div>
        </div>
      </div>

      {/* Today's schedule */}
      <AppEyebrow><AT ar="جدول اليوم" en="Today's Schedule"/></AppEyebrow>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
        {[
          { time: '٨:٠٠', title: 'حلقة التحفيظ', titleEn: 'Memorization Circle', sub: 'الأستاذ سعيد', subEn: 'Mr. Saeed', state: 'done' },
          { time: '٩:٣٠', title: 'الرياضيات', titleEn: 'Mathematics', sub: 'الكسور العشرية', subEn: 'Decimal fractions', state: 'now' },
          { time: '١١:٠٠', title: 'التفسير', titleEn: 'Tafsir', sub: 'سورة الفيل', subEn: 'Surah Al-Fil', state: 'upcoming' },
          { time: '١:٠٠', title: 'العربية', titleEn: 'Arabic', sub: 'الإعراب', subEn: 'Grammar', state: 'upcoming' },
        ].map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: s.state === 'now' ? 'var(--bg-elev)' : 'var(--bg-card)',
            border: `1.5px solid ${s.state === 'now' ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 10, padding: '11px 14px', position: 'relative',
          }}>
            {s.state === 'now' && <div style={{ position: 'absolute', right: -2, top: '50%', transform: 'translateY(-50%)', width: 3, height: '60%', background: 'var(--accent)', borderRadius: 2 }}/>}
            <div style={{
              fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: 700, width: 44,
              color: s.state === 'done' ? 'var(--fg-3)' : 'var(--accent)',
              textDecoration: s.state === 'done' ? 'line-through' : 'none',
              fontVariantNumeric: 'tabular-nums',
            }}>{s.time}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: 600, color: 'var(--fg-1)' }}>
                <AT ar={s.title} en={s.titleEn}/>
              </div>
              <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 1 }}><AT ar={s.sub} en={s.subEn}/></div>
            </div>
            {s.state === 'now' && <AppChip tone="accent"><AT ar="الآن" en="Now"/></AppChip>}
            {s.state === 'done' && <span style={{ color: 'var(--success)', fontSize: 16 }}>✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentHifzTab() {
  const surahs = [
    { name: 'الفاتحة', nameEn: 'Al-Fatiha', status: 'memorized' },
    { name: 'الناس', nameEn: 'An-Nas', status: 'memorized' },
    { name: 'الفلق', nameEn: 'Al-Falaq', status: 'memorized' },
    { name: 'الإخلاص', nameEn: 'Al-Ikhlas', status: 'memorized' },
    { name: 'المسد', nameEn: 'Al-Masad', status: 'memorized' },
    { name: 'النصر', nameEn: 'An-Nasr', status: 'memorized' },
    { name: 'الكافرون', nameEn: 'Al-Kafirun', status: 'memorized' },
    { name: 'الكوثر', nameEn: 'Al-Kawthar', status: 'memorized' },
    { name: 'الماعون', nameEn: 'Al-Ma\'un', status: 'memorized' },
    { name: 'قريش', nameEn: 'Quraysh', status: 'memorized' },
    { name: 'الفيل', nameEn: 'Al-Fil', status: 'in-progress' },
    { name: 'الهمزة', nameEn: 'Al-Humaza', status: 'in-progress' },
    { name: 'العصر', nameEn: 'Al-Asr', status: 'locked' },
    { name: 'التكاثر', nameEn: 'At-Takathur', status: 'locked' },
    { name: 'القارعة', nameEn: 'Al-Qari\'a', status: 'locked' },
  ];
  return (
    <div>
      <h2 style={{ margin: '0 0 6px', fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        <AT ar="سجل الحفظ" en="Memorization Log"/>
      </h2>
      <div style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 16 }}>
        <AT ar="جزء عمّ · ١٠ من ١٥ سورة" en="Juz Amma · 10 of 15 surahs"/>
      </div>
      <div style={{ height: 8, background: 'var(--bg-card-hover)', borderRadius: 999, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ height: '100%', width: '66%', background: 'var(--accent)', borderRadius: 999 }}/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
        {surahs.map((s, i) => (
          <div key={i} style={{
            background: s.status === 'memorized' ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'var(--bg-card)',
            border: `1px solid ${s.status === 'in-progress' ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 10, padding: '12px 14px', textAlign: 'center',
            opacity: s.status === 'locked' ? 0.5 : 1,
          }}>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>
              <AT ar={s.name} en={s.nameEn}/>
            </div>
            <div style={{ fontSize: 10, color: s.status === 'memorized' ? 'var(--success)' : s.status === 'in-progress' ? 'var(--accent)' : 'var(--fg-3)', marginTop: 4, fontFamily: 'Reem Kufi' }}>
              {s.status === 'memorized' ? '✓ ' : s.status === 'in-progress' ? '◐ ' : '🔒 '}
              <AT ar={s.status === 'memorized' ? 'محفوظة' : s.status === 'in-progress' ? 'قيد الحفظ' : 'قادمة'}
                 en={s.status === 'memorized' ? 'Memorized' : s.status === 'in-progress' ? 'In Progress' : 'Locked'}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentScheduleTab() {
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        <AT ar="جدول الأسبوع" en="Weekly Schedule"/>
      </h2>
      {['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس'].map((day, di) => {
        const daysEn = ['Sunday','Monday','Tuesday','Wednesday','Thursday'];
        const classes = [
          ['تحفيظ','رياضيات','تفسير','عربية'],
          ['تحفيظ','علوم','فقه','إنجليزية'],
          ['تحفيظ','رياضيات','تفسير','عربية'],
          ['تحفيظ','علوم','حديث','عبرية'],
          ['مراجعة','رياضيات','نشاط','—'],
        ][di];
        return (
          <div key={di} style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: 600, color: di === 2 ? 'var(--accent)' : 'var(--fg-1)', marginBottom: 6 }}>
              <AT ar={day} en={daysEn[di]}/>
              {di === 2 && <AppChip tone="accent" style={{ marginRight: 8 }}><AT ar="اليوم" en="Today"/></AppChip>}
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {classes.map((c, ci) => (
                <div key={ci} style={{
                  flex: 1, minWidth: 80, padding: '8px 10px', borderRadius: 8,
                  background: 'var(--bg-card)', border: '1px solid var(--border)', fontSize: 11, textAlign: 'center',
                  color: 'var(--fg-2)', fontFamily: 'Reem Kufi',
                }}>{c}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StudentHomeworkTab() {
  const [done, setDone] = React.useState({});
  const hw = [
    { titleAr: 'حفظ سورة الفيل', titleEn: 'Memorize Surah Al-Fil', subjectAr: 'التحفيظ', subjectEn: 'Quran', dueAr: 'غداً', dueEn: 'Tomorrow' },
    { titleAr: 'حل تمارين الكسور ص٤٥', titleEn: 'Solve fractions exercises p.45', subjectAr: 'الرياضيات', subjectEn: 'Math', dueAr: 'بعد يومين', dueEn: 'In 2 days' },
    { titleAr: 'كتابة فقرة عن أركان الإيمان', titleEn: 'Write paragraph about Pillars of Faith', subjectAr: 'العقيدة', subjectEn: 'Aqeedah', dueAr: 'الأسبوع القادم', dueEn: 'Next week' },
  ];
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        <AT ar="واجباتي" en="My Homework"/>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {hw.map((h, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '14px 16px',
            opacity: done[i] ? 0.5 : 1, textDecoration: done[i] ? 'line-through' : 'none',
          }}>
            <button onClick={() => setDone(p => ({ ...p, [i]: !p[i] }))} style={{
              width: 24, height: 24, borderRadius: 6, flexShrink: 0, cursor: 'pointer',
              border: done[i] ? 'none' : '2px solid var(--border)',
              background: done[i] ? 'var(--success)' : 'transparent',
              color: '#fff', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{done[i] ? '✓' : ''}</button>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: 600, color: 'var(--fg-1)' }}>
                <AT ar={h.titleAr} en={h.titleEn}/>
              </div>
              <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>
                <AT ar={h.subjectAr} en={h.subjectEn}/> · <AT ar={h.dueAr} en={h.dueEn}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentAchievementsTab() {
  const badges = [
    { ar: 'حافظ ١٠ سور', en: '10 Surahs Memorized', earned: true },
    { ar: 'حضور كامل — شعبان', en: 'Perfect Attendance — Sha\'ban', earned: true },
    { ar: 'نجم الأسبوع', en: 'Star of the Week', earned: true },
    { ar: 'متفوق في الرياضيات', en: 'Math Excellence', earned: true },
    { ar: 'حافظ ٢٠ سورة', en: '20 Surahs Memorized', earned: false },
    { ar: 'ختم جزء عمّ', en: 'Juz Amma Complete', earned: false },
  ];
  return (
    <div>
      <h2 style={{ margin: '0 0 6px', fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        <AT ar="إنجازاتي" en="My Achievements"/>
      </h2>
      <div style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 16 }}>
        <AT ar="٤ من ٦ شارات" en="4 of 6 badges earned"/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
        {badges.map((b, i) => (
          <div key={i} style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 12, padding: 18, textAlign: 'center',
            opacity: b.earned ? 1 : 0.4,
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{b.earned ? '⭐' : '🔒'}</div>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: 12, fontWeight: 600, color: 'var(--fg-1)' }}>
              <AT ar={b.ar} en={b.en}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { StudentHomeTab, StudentHifzTab, StudentScheduleTab, StudentHomeworkTab, StudentAchievementsTab });
