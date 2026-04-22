// Teacher app — all tab contents

function TeacherAttendanceTab() {
  const [attendance, setAttendance] = React.useState({});
  const students = [
    { id: 1, name: 'عبدالله أحمد الشامي', nameEn: 'Abdullah Ahmad', num: '٠٤٧١' },
    { id: 2, name: 'مريم يوسف الحسيني', nameEn: 'Maryam Yousuf', num: '٠٤٧٢' },
    { id: 3, name: 'محمد خالد القاسم', nameEn: 'Mohammed Khalid', num: '٠٤٧٣' },
    { id: 4, name: 'عائشة محمود', nameEn: 'Aisha Mahmoud', num: '٠٤٧٤' },
    { id: 5, name: 'يوسف إبراهيم', nameEn: 'Yousuf Ibrahim', num: '٠٤٧٥' },
    { id: 6, name: 'سارة عبدالرحمن', nameEn: 'Sara Abdulrahman', num: '٠٤٧٦' },
    { id: 7, name: 'أمير حسن', nameEn: 'Amir Hassan', num: '٠٤٧٧' },
    { id: 8, name: 'نور الدين علي', nameEn: 'Noureddine Ali', num: '٠٤٧٨' },
  ];
  const toggle = (id, status) => setAttendance(p => ({ ...p, [id]: p[id] === status ? null : status }));
  const presentCount = Object.values(attendance).filter(v => v === 'present').length;

  return (
    <div>
      <AppCard style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <AppEyebrow><AT ar="الفصل الحالي" en="Current Class"/></AppEyebrow>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: 18, fontWeight: 700, color: 'var(--fg-1)', marginTop: 4 }}>
              <AT ar="الصف الرابع — شعبة ب" en="Grade 4 — Section B"/>
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>
              <AT ar="التفسير · ٨:٣٠ — ٩:٢٠ صباحاً" en="Tafsir · 8:30 — 9:20 AM"/>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: 28, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
              {presentCount}<span style={{ color: 'var(--fg-3)', fontSize: 16, fontWeight: 500 }}> / {students.length}</span>
            </div>
            <div style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 4 }}><AT ar="حاضر" en="Present"/></div>
          </div>
        </div>
      </AppCard>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        {students.map((s, i) => {
          const st = attendance[s.id];
          return (
            <div key={s.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
              borderTop: i ? '1px solid var(--divider)' : 'none',
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 999, background: 'var(--green-100)',
                color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Reem Kufi', fontSize: 12, fontWeight: 700,
              }}>{s.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: 500, color: 'var(--fg-1)' }}>
                  <AT ar={s.name} en={s.nameEn}/>
                </div>
                <div style={{ fontSize: 10, color: 'var(--fg-3)' }}><AT ar="رقم" en="#"/>: {s.num}</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[
                  { key: 'present', ar: 'حاضر', en: '✓', tone: 'success' },
                  { key: 'late', ar: 'متأخر', en: 'Late', tone: 'warm' },
                  { key: 'absent', ar: 'غائب', en: '✕', tone: 'danger' },
                ].map(opt => (
                  <button key={opt.key} onClick={() => toggle(s.id, opt.key)} style={{
                    padding: '5px 10px', borderRadius: 6, fontSize: 10, fontFamily: 'Reem Kufi', fontWeight: 600,
                    cursor: 'pointer', border: 'none', transition: 'all 0.15s',
                    background: st === opt.key
                      ? (opt.key === 'present' ? 'var(--success)' : opt.key === 'late' ? 'var(--accent-warm)' : 'var(--danger)')
                      : 'var(--bg-card-hover)',
                    color: st === opt.key ? '#fff' : 'var(--fg-3)',
                  }}>
                    <AT ar={opt.ar} en={opt.en}/>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
        <AppBtn><AT ar="حفظ الحضور" en="Save Attendance"/></AppBtn>
        <AppBtn variant="ghost"><AT ar="إرسال للإدارة" en="Send to Admin"/></AppBtn>
      </div>
    </div>
  );
}

function TeacherLessonsTab() {
  const [activeLesson, setActiveLesson] = React.useState(null);
  const lessons = [
    { id: 0, titleAr: 'سورة الفيل — التفسير', titleEn: 'Surah Al-Fil — Tafsir', dateAr: 'اليوم', dateEn: 'Today', status: 'upcoming', objectives: ['فهم سبب النزول', 'معرفة المفردات', 'استخلاص العبر'], objectivesEn: ['Understand revelation context', 'Learn vocabulary', 'Extract lessons'] },
    { id: 1, titleAr: 'سورة قريش — التلاوة والحفظ', titleEn: 'Surah Quraysh — Recitation', dateAr: 'أمس', dateEn: 'Yesterday', status: 'done', objectives: ['تلاوة صحيحة', 'حفظ السورة', 'أحكام التجويد'], objectivesEn: ['Correct recitation', 'Memorize surah', 'Tajweed rules'] },
    { id: 2, titleAr: 'أركان الإسلام — مراجعة', titleEn: 'Pillars of Islam — Review', dateAr: 'الأحد القادم', dateEn: 'Next Sunday', status: 'upcoming', objectives: ['مراجعة شاملة', 'اختبار قصير', 'نشاط تفاعلي'], objectivesEn: ['Comprehensive review', 'Short quiz', 'Interactive activity'] },
  ];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
          <AT ar="خطط الدروس" en="Lesson Plans"/>
        </h2>
        <AppBtn size="sm"><AT ar="+ درس جديد" en="+ New Lesson"/></AppBtn>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {lessons.map(l => (
          <AppCard key={l.id} style={{ cursor: 'pointer' }}
            onClick={() => setActiveLesson(activeLesson === l.id ? null : l.id)}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'Reem Kufi', fontSize: 15, fontWeight: 600, color: 'var(--fg-1)' }}>
                  <AT ar={l.titleAr} en={l.titleEn}/>
                </div>
                <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>
                  <AT ar={l.dateAr} en={l.dateEn}/>
                </div>
              </div>
              <AppChip tone={l.status === 'done' ? 'success' : 'accent'}>
                <AT ar={l.status === 'done' ? 'مكتمل' : 'قادم'} en={l.status === 'done' ? 'Done' : 'Upcoming'}/>
              </AppChip>
            </div>
            {activeLesson === l.id && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--divider)' }}>
                <div style={{ fontSize: 11, color: 'var(--accent-warm)', fontFamily: 'Reem Kufi', letterSpacing: '0.12em', marginBottom: 8 }}>
                  <AT ar="أهداف الدرس" en="LESSON OBJECTIVES"/>
                </div>
                {(useAppLang().lang === 'ar' ? l.objectives : l.objectivesEn).map((o, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)', flexShrink: 0 }}/>
                    <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>{o}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <AppBtn size="sm"><AT ar="ابدأ الدرس" en="Start Lesson"/></AppBtn>
                  <AppBtn size="sm" variant="ghost"><AT ar="تعديل" en="Edit"/></AppBtn>
                </div>
              </div>
            )}
          </AppCard>
        ))}
      </div>
    </div>
  );
}

function TeacherHomeworkTab() {
  const assignments = [
    { titleAr: 'حفظ سورة الفيل', titleEn: 'Memorize Surah Al-Fil', dueAr: 'غداً', dueEn: 'Tomorrow', submitted: 18, total: 24, graded: 12 },
    { titleAr: 'تمارين الكسور العشرية', titleEn: 'Decimal Fractions Exercises', dueAr: 'بعد ٣ أيام', dueEn: 'In 3 days', submitted: 8, total: 24, graded: 0 },
    { titleAr: 'بحث عن أركان الإيمان', titleEn: 'Research: Pillars of Faith', dueAr: 'الأسبوع القادم', dueEn: 'Next week', submitted: 2, total: 24, graded: 0 },
  ];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
          <AT ar="الواجبات" en="Assignments"/>
        </h2>
        <AppBtn size="sm"><AT ar="+ واجب جديد" en="+ New Assignment"/></AppBtn>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {assignments.map((a, i) => (
          <AppCard key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontFamily: 'Reem Kufi', fontSize: 15, fontWeight: 600, color: 'var(--fg-1)' }}>
                  <AT ar={a.titleAr} en={a.titleEn}/>
                </div>
                <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>
                  <AT ar={`موعد التسليم: ${a.dueAr}`} en={`Due: ${a.dueEn}`}/>
                </div>
              </div>
              <AppChip tone={a.submitted === a.total ? 'success' : 'accent'}>
                {a.submitted}/{a.total}
              </AppChip>
            </div>
            <div style={{ height: 5, background: 'var(--bg-card-hover)', borderRadius: 999, overflow: 'hidden', marginBottom: 10 }}>
              <div style={{ height: '100%', width: `${(a.submitted / a.total) * 100}%`, background: 'var(--accent)', borderRadius: 999 }}/>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--fg-3)' }}>
              <span><AT ar={`${a.submitted} تسليم`} en={`${a.submitted} submitted`}/></span>
              <span><AT ar={`${a.graded} تم التصحيح`} en={`${a.graded} graded`}/></span>
              <span><AT ar={`${a.total - a.submitted} متبقي`} en={`${a.total - a.submitted} remaining`}/></span>
            </div>
          </AppCard>
        ))}
      </div>
    </div>
  );
}

function TeacherMessagesTab() {
  const [selected, setSelected] = React.useState(null);
  const msgs = [
    { from: 'خالد عبدالله (ولي أمر)', fromEn: 'Khalid Abdullah (Parent)', time: 'قبل ساعة', timeEn: '1h ago', msg: 'السلام عليكم، أرجو إعلامي عن أداء عبدالله في حلقة التحفيظ هذا الأسبوع.', msgEn: 'Assalamu alaikum, please update me on Abdullah\'s memorization performance this week.', unread: true },
    { from: 'إدارة المدرسة', fromEn: 'School Admin', time: 'قبل ٣ س', timeEn: '3h ago', msg: 'تذكير: اجتماع المعلمين غداً الساعة ٢:٠٠ ظهراً في قاعة الاجتماعات.', msgEn: 'Reminder: Teachers meeting tomorrow at 2:00 PM in the conference room.', unread: true },
    { from: 'أ. نور الهدى', fromEn: 'Ms. Noor Al-Huda', time: 'أمس', timeEn: 'Yesterday', msg: 'هل يمكننا تنسيق نشاط مشترك بين حصة الرياضيات والتفسير؟', msgEn: 'Can we coordinate a joint activity between math and tafsir classes?', unread: false },
  ];
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        <AT ar="الرسائل" en="Messages"/>
      </h2>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        {msgs.map((m, i) => (
          <div key={i} onClick={() => setSelected(selected === i ? null : i)} style={{
            padding: '14px 16px', borderTop: i ? '1px solid var(--divider)' : 'none', cursor: 'pointer',
            background: selected === i ? 'var(--bg-card-hover)' : 'transparent',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {m.unread && <div style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--accent)', flexShrink: 0 }}/>}
                <span style={{ fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: m.unread ? 700 : 500, color: 'var(--fg-1)' }}>
                  <AT ar={m.from} en={m.fromEn}/>
                </span>
              </div>
              <span style={{ fontSize: 10, color: 'var(--fg-3)' }}><AT ar={m.time} en={m.timeEn}/></span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4, lineHeight: 1.5 }}>
              <AT ar={m.msg} en={m.msgEn}/>
            </div>
            {selected === i && (
              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                <AppBtn size="sm"><AT ar="رد" en="Reply"/></AppBtn>
                <AppBtn size="sm" variant="ghost"><AT ar="أرشفة" en="Archive"/></AppBtn>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TeacherScheduleTab() {
  const days = [
    { ar: 'الأحد', en: 'Sun' }, { ar: 'الاثنين', en: 'Mon' }, { ar: 'الثلاثاء', en: 'Tue' },
    { ar: 'الأربعاء', en: 'Wed' }, { ar: 'الخميس', en: 'Thu' },
  ];
  const schedule = [
    [{ t: '٨:٠٠', s: 'تحفيظ — ٤ب' }, { t: '٩:٣٠', s: 'تفسير — ٤أ' }, { t: '١١:٠٠', s: 'تحفيظ — ٥أ' }],
    [{ t: '٨:٠٠', s: 'تحفيظ — ٣أ' }, { t: '٩:٣٠', s: 'تحفيظ — ٤ب' }, { t: '١١:٠٠', s: 'تفسير — ٦أ' }],
    [{ t: '٨:٠٠', s: 'تحفيظ — ٤ب' }, { t: '٩:٣٠', s: 'تفسير — ٤أ' }, { t: '١١:٠٠', s: 'تحفيظ — ٥أ' }],
    [{ t: '٨:٠٠', s: 'تحفيظ — ٣أ' }, { t: '١١:٠٠', s: 'تفسير — ٦أ' }],
    [{ t: '٨:٠٠', s: 'مراجعة — ٤ب' }, { t: '٩:٣٠', s: 'اختبارات' }],
  ];
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        <AT ar="الجدول الأسبوعي" en="Weekly Schedule"/>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
        {days.map((d, di) => (
          <div key={di} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{
              background: di === 2 ? 'var(--accent)' : 'var(--bg-card-hover)',
              color: di === 2 ? 'var(--on-accent)' : 'var(--fg-1)',
              padding: '10px 14px', fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: 600, textAlign: 'center',
            }}><AT ar={d.ar} en={d.en}/></div>
            <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {schedule[di].map((c, ci) => (
                <div key={ci} style={{
                  padding: '8px 10px', borderRadius: 8,
                  background: 'var(--bg-card-hover)', fontSize: 11, color: 'var(--fg-2)',
                }}>
                  <div style={{ fontFamily: 'Reem Kufi', fontWeight: 600, color: 'var(--accent)', fontSize: 10 }}>{c.t}</div>
                  <div style={{ marginTop: 2 }}>{c.s}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeacherProfileTab() {
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        <AT ar="الملف الشخصي" en="My Profile"/>
      </h2>
      <AppCard>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 999,
            background: 'linear-gradient(135deg, var(--accent), var(--green-700))',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Reem Kufi', fontSize: 22, fontWeight: 700,
          }}>أ.ف</div>
          <div>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: 18, fontWeight: 700, color: 'var(--fg-1)' }}>
              <AT ar="الأستاذ أحمد الفقيه" en="Mr. Ahmad Al-Faqih"/>
            </div>
            <AppChip tone="accent"><AT ar="معلم التحفيظ والتفسير" en="Quran & Tafsir Teacher"/></AppChip>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
          <AppStat label="سنوات الخبرة" labelEn="Years Experience" value="١٢" valueEn="12"/>
          <AppStat label="الفصول" labelEn="Classes" value="٣" valueEn="3"/>
          <AppStat label="الطلاب" labelEn="Students" value="٧٢" valueEn="72"/>
          <AppStat label="تقييم الأداء" labelEn="Rating" value="٤.٨" valueEn="4.8"/>
        </div>
      </AppCard>
    </div>
  );
}

Object.assign(window, { TeacherAttendanceTab, TeacherLessonsTab, TeacherHomeworkTab, TeacherMessagesTab, TeacherScheduleTab, TeacherProfileTab });
