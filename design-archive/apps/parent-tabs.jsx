// Parent app — all tab contents

function ParentHomeTab() {
  const [activeChild, setActiveChild] = React.useState(0);
  const children = [
    { name: 'عبدالله', nameEn: 'Abdullah', grade: 'الرابع', gradeEn: '4th', color: 'var(--accent)' },
    { name: 'مريم', nameEn: 'Maryam', grade: 'الثاني', gradeEn: '2nd', color: 'var(--accent-warm)' },
  ];
  const c = children[activeChild];

  return (
    <div>
      {/* Child switcher */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {children.map((ch, i) => (
          <button key={i} onClick={() => setActiveChild(i)} style={{
            flex: 1, padding: '12px 14px', borderRadius: 10, cursor: 'pointer',
            background: i === activeChild ? 'var(--bg-card)' : 'transparent',
            border: i === activeChild ? '2px solid var(--accent)' : '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: i === activeChild ? 'var(--shadow-sm)' : 'none',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 999, background: ch.color,
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: 700,
            }}>{ch.name[0]}</div>
            <div style={{ textAlign: 'start' }}>
              <div style={{ fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: 600, color: 'var(--fg-1)' }}>
                <AT ar={ch.name} en={ch.nameEn}/>
              </div>
              <div style={{ fontSize: 10, color: 'var(--fg-3)' }}>
                <AT ar={`الصف ${ch.grade}`} en={`Grade ${ch.gradeEn}`}/>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Today snapshot */}
      <AppCard eyebrow={<AT ar="اليوم في المدرسة" en="Today at School"/>}
        title={<AT ar={`${c.name} · الصف ${c.grade}`} en={`${c.nameEn} · Grade ${c.gradeEn}`}/>}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { n: '✓', l: 'حاضر', lEn: 'Present', tone: 'var(--success)' },
            { n: activeChild === 0 ? '٣' : '٢', l: 'آيات محفوظة', lEn: 'Verses Memorized', tone: 'var(--accent)' },
            { n: '٢', l: 'واجبات', lEn: 'Homework', tone: 'var(--accent-warm)' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '10px 0', background: 'var(--bg-card-hover)', borderRadius: 8 }}>
              <div style={{ fontFamily: 'Reem Kufi', fontSize: 22, fontWeight: 700, color: s.tone, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 4, fontFamily: 'Reem Kufi' }}>
                <AT ar={s.l} en={s.lEn}/>
              </div>
            </div>
          ))}
        </div>
      </AppCard>

      {/* Recent messages */}
      <AppCard eyebrow={<AT ar="الرسائل" en="Messages"/>} title={<AT ar="من المعلمين" en="From Teachers"/>}
        action={<AppChip tone="accent"><AT ar="٢ جديدة" en="2 New"/></AppChip>}
        style={{ marginTop: 12 }}>
        {[
          { name: 'الأستاذ سعيد', nameEn: 'Mr. Saeed', role: 'معلم التحفيظ', roleEn: 'Quran Teacher', msg: 'أبدى عبدالله تحسّناً ملحوظاً في التلاوة، ماشاء الله…', msgEn: 'Abdullah showed notable improvement in recitation, mashallah...', time: 'قبل ساعة', timeEn: '1h ago', unread: true },
          { name: 'الأستاذة نور', nameEn: 'Ms. Noor', role: 'معلمة الرياضيات', roleEn: 'Math Teacher', msg: 'يرجى مراجعة واجب الكسور مع عبدالله قبل…', msgEn: 'Please review the fractions homework with Abdullah before...', time: 'أمس', timeEn: 'Yesterday', unread: true },
          { name: 'إدارة المدرسة', nameEn: 'School Admin', role: '', roleEn: '', msg: 'تذكير: اجتماع أولياء الأمور يوم الخميس', msgEn: 'Reminder: Parents meeting on Thursday', time: '٣ أيام', timeEn: '3 days', unread: false },
        ].map((m, i) => (
          <div key={i} style={{
            display: 'flex', gap: 10, padding: '10px 0',
            borderTop: i ? '1px solid var(--divider)' : 'none',
          }}>
            {m.unread && <div style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)', flexShrink: 0, marginTop: 6 }}/>}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'Reem Kufi', fontSize: 12, fontWeight: 600, color: 'var(--fg-1)' }}>
                  <AT ar={m.name} en={m.nameEn}/>
                </span>
                <span style={{ fontSize: 10, color: 'var(--fg-3)' }}><AT ar={m.time} en={m.timeEn}/></span>
              </div>
              {m.role && <div style={{ fontSize: 10, color: 'var(--accent-warm)', fontFamily: 'Reem Kufi' }}><AT ar={m.role} en={m.roleEn}/></div>}
              <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <AT ar={m.msg} en={m.msgEn}/>
              </div>
            </div>
          </div>
        ))}
      </AppCard>

      {/* Tuition */}
      <div style={{
        marginTop: 12, background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 12, padding: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}>
        <div>
          <AppEyebrow><AT ar="الرسوم الدراسية" en="Tuition Fees"/></AppEyebrow>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <span style={{ fontFamily: 'Reem Kufi', fontSize: 22, fontWeight: 700, color: 'var(--fg-1)' }}>٨٥٠</span>
            <span style={{ fontSize: 12, color: 'var(--fg-3)' }}>₪ · <AT ar="شعبان" en="Sha'ban"/></span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--accent-warm)', marginTop: 2 }}>
            <AT ar="يستحق في ٢٨ من الشهر" en="Due on the 28th"/>
          </div>
        </div>
        <AppBtn><AT ar="ادفع الآن" en="Pay Now"/></AppBtn>
      </div>
    </div>
  );
}

function ParentProgressTab() {
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        <AT ar="تقدم عبدالله" en="Abdullah's Progress"/>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 16 }}>
        <AppStat label="الحضور الشهري" labelEn="Monthly Attendance" value="٩٨٪" valueEn="98%"/>
        <AppStat label="الحفظ" labelEn="Hifz Progress" value="١٨/٣٧" valueEn="18/37"/>
        <AppStat label="المعدل" labelEn="GPA" value="٩٢" valueEn="92"/>
        <AppStat label="السلوك" labelEn="Behavior" value="ممتاز" valueEn="Excellent"/>
      </div>

      <AppCard eyebrow={<AT ar="التقييمات الأخيرة" en="Recent Evaluations"/>} title={<AT ar="هذا الشهر" en="This Month"/>}>
        {[
          { subj: 'التحفيظ', subjEn: 'Quran', grade: 'ممتاز', gradeEn: 'Excellent', color: 'var(--success)' },
          { subj: 'الرياضيات', subjEn: 'Mathematics', grade: 'جيد جداً', gradeEn: 'Very Good', color: 'var(--accent)' },
          { subj: 'التفسير', subjEn: 'Tafsir', grade: 'ممتاز', gradeEn: 'Excellent', color: 'var(--success)' },
          { subj: 'العربية', subjEn: 'Arabic', grade: 'جيد جداً', gradeEn: 'Very Good', color: 'var(--accent)' },
          { subj: 'العلوم', subjEn: 'Science', grade: 'جيد', gradeEn: 'Good', color: 'var(--accent-warm)' },
        ].map((e, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0', borderTop: i ? '1px solid var(--divider)' : 'none',
          }}>
            <span style={{ fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: 500, color: 'var(--fg-1)' }}>
              <AT ar={e.subj} en={e.subjEn}/>
            </span>
            <span style={{ fontFamily: 'Reem Kufi', fontSize: 12, fontWeight: 600, color: e.color }}>
              <AT ar={e.grade} en={e.gradeEn}/>
            </span>
          </div>
        ))}
      </AppCard>
    </div>
  );
}

function ParentMessagesTab() {
  const [replyTo, setReplyTo] = React.useState(null);
  const msgs = [
    { from: 'الأستاذ سعيد', fromEn: 'Mr. Saeed', time: 'قبل ساعة', timeEn: '1h ago', msg: 'أبدى عبدالله تحسّناً ملحوظاً في التلاوة هذا الأسبوع، ماشاء الله. يرجى تشجيعه على المراجعة اليومية في البيت.', msgEn: 'Abdullah showed notable improvement in recitation this week, mashallah. Please encourage daily review at home.', unread: true },
    { from: 'الأستاذة نور', fromEn: 'Ms. Noor', time: 'أمس', timeEn: 'Yesterday', msg: 'يرجى مراجعة واجب الكسور مع عبدالله قبل يوم الأحد. يحتاج إلى مزيد من التمرين على القسمة.', msgEn: 'Please review the fractions homework with Abdullah before Sunday. He needs more practice on division.', unread: true },
    { from: 'إدارة المدرسة', fromEn: 'School Admin', time: '٣ أيام', timeEn: '3 days', msg: 'تذكير: اجتماع أولياء الأمور يوم الخميس القادم الساعة ٥:٠٠ مساءً. نرجو تأكيد الحضور.', msgEn: 'Reminder: Parents meeting next Thursday at 5:00 PM. Please confirm attendance.', unread: false },
  ];
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        <AT ar="الرسائل" en="Messages"/>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {msgs.map((m, i) => (
          <AppCard key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {m.unread && <div style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--accent)' }}/>}
                <span style={{ fontFamily: 'Reem Kufi', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>
                  <AT ar={m.from} en={m.fromEn}/>
                </span>
              </div>
              <span style={{ fontSize: 11, color: 'var(--fg-3)' }}><AT ar={m.time} en={m.timeEn}/></span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.7, margin: 0 }}>
              <AT ar={m.msg} en={m.msgEn}/>
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <AppBtn size="sm" onClick={() => setReplyTo(replyTo === i ? null : i)}><AT ar="رد" en="Reply"/></AppBtn>
            </div>
            {replyTo === i && (
              <div style={{ marginTop: 10 }}>
                <textarea rows={3} style={{
                  width: '100%', padding: 10, borderRadius: 8, border: '1px solid var(--border)',
                  background: 'var(--bg-card-hover)', color: 'var(--fg-1)', fontSize: 13,
                  fontFamily: 'Tajawal', outline: 'none', resize: 'vertical',
                }} placeholder={useAppLang().lang === 'ar' ? 'اكتب ردك...' : 'Write your reply...'}/>
                <AppBtn size="sm" style={{ marginTop: 8 }}><AT ar="إرسال" en="Send"/></AppBtn>
              </div>
            )}
          </AppCard>
        ))}
      </div>
    </div>
  );
}

function ParentFeesTab() {
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        <AT ar="الرسوم والمدفوعات" en="Fees & Payments"/>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 16 }}>
        <AppStat label="الرسوم الشهرية" labelEn="Monthly Fee" value="٨٥٠ ₪" valueEn="850 ₪"/>
        <AppStat label="المدفوع هذا العام" labelEn="Paid This Year" value="٥٬٩٥٠" valueEn="5,950"/>
        <AppStat label="المتبقي" labelEn="Remaining" value="٢٬٥٥٠" valueEn="2,550"/>
      </div>
      <AppCard eyebrow={<AT ar="سجل المدفوعات" en="Payment History"/>} title={<AT ar="آخر ٦ أشهر" en="Last 6 Months"/>}>
        {[
          { m: 'شعبان', mEn: 'Sha\'ban', status: 'pending', amt: '٨٥٠' },
          { m: 'رجب', mEn: 'Rajab', status: 'paid', amt: '٨٥٠' },
          { m: 'جمادى الآخرة', mEn: 'Jumada II', status: 'paid', amt: '٨٥٠' },
          { m: 'جمادى الأولى', mEn: 'Jumada I', status: 'paid', amt: '٨٥٠' },
          { m: 'ربيع الآخر', mEn: 'Rabi\' II', status: 'paid', amt: '٨٥٠' },
          { m: 'ربيع الأول', mEn: 'Rabi\' I', status: 'paid', amt: '٨٥٠' },
        ].map((p, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0', borderTop: i ? '1px solid var(--divider)' : 'none',
          }}>
            <span style={{ fontFamily: 'Reem Kufi', fontSize: 13, color: 'var(--fg-1)' }}>
              <AT ar={p.m} en={p.mEn}/>
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: 600 }}>{p.amt} ₪</span>
              <AppChip tone={p.status === 'paid' ? 'success' : 'warm'}>
                <AT ar={p.status === 'paid' ? 'مدفوع' : 'مستحق'} en={p.status === 'paid' ? 'Paid' : 'Due'}/>
              </AppChip>
            </div>
          </div>
        ))}
      </AppCard>
      <div style={{ marginTop: 14 }}>
        <AppBtn style={{ width: '100%', justifyContent: 'center' }}><AT ar="دفع رسوم شعبان — ٨٥٠ ₪" en="Pay Sha'ban Fee — 850 ₪"/></AppBtn>
      </div>
    </div>
  );
}

function ParentCalendarTab() {
  const events = [
    { d: '٢٢', dEn: '22', t: 'اجتماع أولياء الأمور', tEn: 'Parents Meeting', time: '٥:٠٠ م' },
    { d: '٢٥', dEn: '25', t: 'حفل تخريج الحفّاظ', tEn: 'Huffaz Graduation', time: '٦:٣٠ م' },
    { d: '٢٨', dEn: '28', t: 'آخر موعد لدفع الرسوم', tEn: 'Fee Payment Deadline', time: '' },
    { d: '١', dEn: '1', t: 'عيد الفطر — إجازة', tEn: 'Eid al-Fitr — Holiday', time: '' },
  ];
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        <AT ar="التقويم" en="Calendar"/>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {events.map((e, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '14px 18px',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 10, flexShrink: 0,
              background: 'var(--accent)', color: 'var(--on-accent)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'Reem Kufi', fontSize: 18, fontWeight: 700, lineHeight: 1 }}>
                <AT ar={e.d} en={e.dEn}/>
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Reem Kufi', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>
                <AT ar={e.t} en={e.tEn}/>
              </div>
              {e.time && <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>{e.time}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ParentHomeTab, ParentProgressTab, ParentMessagesTab, ParentFeesTab, ParentCalendarTab });
