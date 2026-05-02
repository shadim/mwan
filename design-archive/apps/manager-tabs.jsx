// Manager app — all tab contents

function ManagerDashTab() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'Reem Kufi', fontSize: 22, fontWeight: 700, color: 'var(--fg-1)' }}>
            <AT ar="مرحباً، الأستاذ محمد" en="Welcome, Mr. Mohammed"/>
          </h2>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>
            <AT ar="٢٢ رمضان ١٤٤٧ هـ · الثلاثاء" en="Ramadan 22, 1447H · Tuesday"/>
          </div>
        </div>
        <AppBtn size="sm" variant="ghost"><AT ar="تصدير تقرير" en="Export Report"/></AppBtn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 16 }}>
        <AppStat label="الطلاب" labelEn="Students" value="٤٥" valueEn="480" delta="+١٢" positive/>
        <AppStat label="الحضور" labelEn="Attendance" value="٩٦٪" valueEn="96%" delta="+٢" positive/>
        <AppStat label="المعلمين" labelEn="Teachers" value="٣٢" valueEn="32"/>
        <AppStat label="حملة البناء" labelEn="Campaign" value="٦٨٪" valueEn="68%" delta="+٥" positive/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12 }}>
        <AppCard eyebrow={<AT ar="الحضور الأسبوعي" en="Weekly Attendance"/>} title={<AT ar="آخر ٧ أيام" en="Last 7 Days"/>}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100, marginTop: 8 }}>
            {[86,92,88,96,94,90,96].map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', height: `${v}%`, background: i === 6 ? 'var(--accent)' : 'var(--green-200)', borderRadius: '4px 4px 0 0', transition: 'height 0.3s' }}/>
                <span style={{ fontSize: 9, color: 'var(--fg-3)', fontVariantNumeric: 'tabular-nums' }}>{v}٪</span>
              </div>
            ))}
          </div>
        </AppCard>

        <AppCard eyebrow={<AT ar="مهام اليوم" en="Today's Tasks"/>} title={<AT ar="٤ مفتوحة" en="4 Open"/>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { t: 'مراجعة ميزانية شعبان', tEn: 'Review Sha\'ban budget', tag: 'عاجل', tagEn: 'Urgent', tone: 'danger' },
              { t: 'اجتماع أولياء الأمور', tEn: 'Parents meeting', tag: 'اليوم', tagEn: 'Today', tone: 'warm' },
              { t: 'توظيف معلم جديد', tEn: 'Hire new teacher', tag: 'قيد المراجعة', tagEn: 'In Review', tone: 'default' },
              { t: 'تحديث الموقع الإلكتروني', tEn: 'Update website', tag: 'هذا الأسبوع', tagEn: 'This Week', tone: 'accent' },
            ].map((task, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, border: '2px solid var(--border)', flexShrink: 0, cursor: 'pointer' }}/>
                <span style={{ fontSize: 13, color: 'var(--fg-1)', flex: 1 }}><AT ar={task.t} en={task.tEn}/></span>
                <AppChip tone={task.tone}><AT ar={task.tag} en={task.tagEn}/></AppChip>
              </div>
            ))}
          </div>
        </AppCard>
      </div>

      <AppCard eyebrow={<AT ar="التبرعات الأخيرة" en="Recent Donations"/>}
        title={<AT ar="هذا الأسبوع" en="This Week"/>}
        action={<AppChip tone="success">+٢٣</AppChip>}
        style={{ marginTop: 12 }}>
        {[
          { name: 'أحمد الحسيني', nameEn: 'Ahmad Al-Husseini', purpose: 'زكاة', purposeEn: 'Zakat', amt: '٢٬٥٠٠', time: 'قبل ساعة', timeEn: '1h ago' },
          { name: 'فاطمة الزهراء', nameEn: 'Fatima Al-Zahraa', purpose: 'حملة البناء', purposeEn: 'Building Campaign', amt: '١٬٠٠٠', time: 'قبل ٣ س', timeEn: '3h ago' },
          { name: 'خالد عبدالله', nameEn: 'Khalid Abdullah', purpose: 'كفالة طالب', purposeEn: 'Student Sponsorship', amt: '٦٠٠', time: 'أمس', timeEn: 'Yesterday' },
        ].map((d, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 0', borderTop: i ? '1px solid var(--divider)' : 'none',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 999, background: 'var(--bg-card-hover)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontFamily: 'Reem Kufi', color: 'var(--accent)',
            }}>{d.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: 'var(--fg-1)', fontFamily: 'Reem Kufi', fontWeight: 500 }}>
                <AT ar={d.name} en={d.nameEn}/>
              </div>
              <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>
                <AT ar={d.purpose} en={d.purposeEn}/> · <AT ar={d.time} en={d.timeEn}/>
              </div>
            </div>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: 14, fontWeight: 700, color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>
              {d.amt} ₪
            </div>
          </div>
        ))}
      </AppCard>
    </div>
  );
}

function ManagerStudentsTab() {
  const [search, setSearch] = React.useState('');
  const students = [
    { name: 'عبدالله أحمد', nameEn: 'Abdullah Ahmad', grade: 'الرابع', gradeEn: '4th', status: 'active', hifz: '١٨/٣٧', att: '٩٨٪' },
    { name: 'مريم يوسف', nameEn: 'Maryam Yousuf', grade: 'الثاني', gradeEn: '2nd', status: 'active', hifz: '١٢/٣٧', att: '٩٥٪' },
    { name: 'محمد خالد', nameEn: 'Mohammed Khalid', grade: 'الخامس', gradeEn: '5th', status: 'active', hifz: '٢٥/٣٧', att: '٩٢٪' },
    { name: 'عائشة محمود', nameEn: 'Aisha Mahmoud', grade: 'الثالث', gradeEn: '3rd', status: 'active', hifz: '٨/٣٧', att: '٩٩٪' },
    { name: 'يوسف إبراهيم', nameEn: 'Yousuf Ibrahim', grade: 'السادس', gradeEn: '6th', status: 'warning', hifz: '٣٠/٣٧', att: '٧٨٪' },
    { name: 'سارة عبدالرحمن', nameEn: 'Sara Abdulrahman', grade: 'الأول', gradeEn: '1st', status: 'active', hifz: '٥/٣٧', att: '٩٦٪' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
          <AT ar="إدارة الطلاب" en="Student Management"/>
        </h2>
        <AppBtn size="sm"><AT ar="+ طالب جديد" en="+ New Student"/></AppBtn>
      </div>
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="🔍 بحث..."
        style={{
          width: '100%', padding: '10px 14px', borderRadius: 8, marginBottom: 14,
          border: '1px solid var(--border)', background: 'var(--bg-card)',
          color: 'var(--fg-1)', fontSize: 13, fontFamily: 'Tajawal', outline: 'none',
        }}/>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        {students.filter(s => s.name.includes(search) || s.nameEn.toLowerCase().includes(search.toLowerCase())).map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
            borderTop: i ? '1px solid var(--divider)' : 'none', cursor: 'pointer',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 999, background: 'var(--green-100)',
              color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: 700,
            }}>{s.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Reem Kufi', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>
                <AT ar={s.name} en={s.nameEn}/>
              </div>
              <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>
                <AT ar={`الصف ${s.grade}`} en={`Grade ${s.gradeEn}`}/> · <AT ar="حفظ" en="Hifz"/>: {s.hifz}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Reem Kufi', fontSize: 14, fontWeight: 700, color: s.status === 'warning' ? 'var(--danger)' : 'var(--accent)' }}>{s.att}</div>
              <div style={{ fontSize: 9, color: 'var(--fg-3)' }}><AT ar="حضور" en="Att."/></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManagerTeachersTab() {
  const teachers = [
    { name: 'أ. سعيد المصري', nameEn: 'Mr. Saeed Al-Masri', subj: 'التحفيظ', subjEn: 'Quran Memorization', classes: 3, students: 72 },
    { name: 'أ. نور الهدى', nameEn: 'Ms. Noor Al-Huda', subj: 'الرياضيات', subjEn: 'Mathematics', classes: 4, students: 96 },
    { name: 'أ. أحمد الفقيه', nameEn: 'Mr. Ahmad Al-Faqih', subj: 'العلوم الشرعية', subjEn: 'Islamic Studies', classes: 3, students: 68 },
    { name: 'أ. ليلى حسن', nameEn: 'Ms. Layla Hassan', subj: 'اللغة الإنجليزية', subjEn: 'English Language', classes: 5, students: 120 },
    { name: 'أ. خالد الأمين', nameEn: 'Mr. Khalid Al-Amin', subj: 'العلوم', subjEn: 'Science', classes: 3, students: 84 },
  ];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
          <AT ar="المعلمون" en="Teachers"/>
        </h2>
        <AppBtn size="sm"><AT ar="+ معلم جديد" en="+ New Teacher"/></AppBtn>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {teachers.map((t, i) => (
          <AppCard key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 999,
                background: 'linear-gradient(135deg, var(--accent), var(--green-700))',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Reem Kufi', fontSize: 14, fontWeight: 700,
              }}>{t.name.split(' ').pop()[0]}</div>
              <div>
                <div style={{ fontFamily: 'Reem Kufi', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>
                  <AT ar={t.name} en={t.nameEn}/>
                </div>
                <AppChip tone="accent"><AT ar={t.subj} en={t.subjEn}/></AppChip>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div>
                <div style={{ fontFamily: 'Reem Kufi', fontSize: 18, fontWeight: 700, color: 'var(--fg-1)' }}>{t.classes}</div>
                <div style={{ fontSize: 10, color: 'var(--fg-3)' }}><AT ar="فصول" en="Classes"/></div>
              </div>
              <div>
                <div style={{ fontFamily: 'Reem Kufi', fontSize: 18, fontWeight: 700, color: 'var(--fg-1)' }}>{t.students}</div>
                <div style={{ fontSize: 10, color: 'var(--fg-3)' }}><AT ar="طالب" en="Students"/></div>
              </div>
            </div>
          </AppCard>
        ))}
      </div>
    </div>
  );
}

function ManagerFinanceTab() {
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        <AT ar="النظرة المالية" en="Financial Overview"/>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 16 }}>
        <AppStat label="الإيرادات الشهرية" labelEn="Monthly Revenue" value="٤٨٬٠٠٠" valueEn="48,000" delta="+٨٪" positive/>
        <AppStat label="المصروفات" labelEn="Expenses" value="٣٥٬٠٠٠" valueEn="35,000"/>
        <AppStat label="التبرعات" labelEn="Donations" value="١٣٦٬٠٠٠" valueEn="136,000" delta="+١٥٪" positive/>
        <AppStat label="الرسوم المستحقة" labelEn="Due Fees" value="١٢٬٤٠٠" valueEn="12,400"/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12 }}>
        <AppCard eyebrow={<AT ar="توزيع الإيرادات" en="Revenue Distribution"/>} title={<AT ar="شعبان ١٤٤٧" en="Sha'ban 1447"/>}>
          {[
            { l: 'الرسوم الدراسية', lEn: 'Tuition', pct: 62, color: 'var(--accent)' },
            { l: 'التبرعات', lEn: 'Donations', pct: 28, color: 'var(--accent-warm)' },
            { l: 'أخرى', lEn: 'Other', pct: 10, color: 'var(--green-200)' },
          ].map((r, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--fg-2)', marginBottom: 4 }}>
                <span><AT ar={r.l} en={r.lEn}/></span>
                <span style={{ fontWeight: 600 }}>{r.pct}٪</span>
              </div>
              <div style={{ height: 6, background: 'var(--bg-card-hover)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${r.pct}%`, background: r.color, borderRadius: 999 }}/>
              </div>
            </div>
          ))}
        </AppCard>
        <AppCard eyebrow={<AT ar="آخر المعاملات" en="Recent Transactions"/>} title={<AT ar="هذا الشهر" en="This Month"/>}>
          {[
            { d: 'رواتب المعلمين', dEn: 'Teacher salaries', amt: '-٢٤٬٠٠٠', neg: true },
            { d: 'رسوم الصف الرابع', dEn: '4th grade fees', amt: '+٨٬٥٠٠', neg: false },
            { d: 'صيانة المبنى', dEn: 'Building maintenance', amt: '-٣٬٢٠٠', neg: true },
            { d: 'تبرع — أحمد الحسيني', dEn: 'Donation — Ahmad H.', amt: '+٢٬٥٠٠', neg: false },
          ].map((t, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0', borderTop: i ? '1px solid var(--divider)' : 'none',
            }}>
              <span style={{ fontSize: 13, color: 'var(--fg-2)' }}><AT ar={t.d} en={t.dEn}/></span>
              <span style={{ fontFamily: 'Reem Kufi', fontSize: 13, fontWeight: 700, color: t.neg ? 'var(--danger)' : 'var(--success)' }}>
                {t.amt} ₪
              </span>
            </div>
          ))}
        </AppCard>
      </div>
    </div>
  );
}

function ManagerCalendarTab() {
  const events = [
    { d: '٢٢', dEn: '22', m: 'رمضان', mEn: 'Ramadan', t: 'اجتماع أولياء الأمور', tEn: 'Parents Meeting', time: '٥:٠٠ م', type: 'event' },
    { d: '٢٥', dEn: '25', m: 'رمضان', mEn: 'Ramadan', t: 'حفل تخريج الحفّاظ', tEn: 'Huffaz Graduation', time: '٦:٣٠ م', type: 'ceremony' },
    { d: '٢٧', dEn: '27', m: 'رمضان', mEn: 'Ramadan', t: 'إحياء ليلة القدر', tEn: 'Laylat al-Qadr', time: '٩:٠٠ م', type: 'religious' },
    { d: '١', dEn: '1', m: 'شوال', mEn: 'Shawwal', t: 'عيد الفطر — إجازة', tEn: 'Eid al-Fitr — Holiday', time: '', type: 'holiday' },
    { d: '٤', dEn: '4', m: 'شوال', mEn: 'Shawwal', t: 'استئناف الدراسة', tEn: 'Classes Resume', time: '٧:٣٠ ص', type: 'academic' },
  ];
  const typeColors = { event: 'accent', ceremony: 'warm', religious: 'success', holiday: 'danger', academic: 'default' };
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        <AT ar="التقويم الأكاديمي" en="Academic Calendar"/>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {events.map((e, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '14px 18px',
          }}>
            <div style={{
              width: 50, height: 50, borderRadius: 10, flexShrink: 0,
              background: 'var(--accent)', color: 'var(--on-accent)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'Reem Kufi', fontSize: 18, fontWeight: 700, lineHeight: 1 }}>
                <AT ar={e.d} en={e.dEn}/>
              </span>
              <span style={{ fontSize: 8, opacity: 0.8, fontFamily: 'Reem Kufi' }}>
                <AT ar={e.m} en={e.mEn}/>
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Reem Kufi', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>
                <AT ar={e.t} en={e.tEn}/>
              </div>
              {e.time && <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>{e.time}</div>}
            </div>
            <AppChip tone={typeColors[e.type]}>{e.type}</AppChip>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManagerSettingsTab() {
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontFamily: 'Reem Kufi', fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>
        <AT ar="الإعدادات" en="Settings"/>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { ar: 'معلومات المدرسة', en: 'School Information', desc: 'الاسم، العنوان، الشعار', descEn: 'Name, address, logo' },
          { ar: 'إدارة المستخدمين', en: 'User Management', desc: 'الصلاحيات والأدوار', descEn: 'Permissions and roles' },
          { ar: 'الإشعارات', en: 'Notifications', desc: 'البريد، الرسائل، التنبيهات', descEn: 'Email, messages, alerts' },
          { ar: 'النظام المالي', en: 'Finance System', desc: 'طرق الدفع، الرسوم', descEn: 'Payment methods, fees' },
          { ar: 'التقارير', en: 'Reports', desc: 'إعدادات التقارير التلقائية', descEn: 'Automated report settings' },
        ].map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '16px 20px', cursor: 'pointer',
          }}>
            <div>
              <div style={{ fontFamily: 'Reem Kufi', fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>
                <AT ar={s.ar} en={s.en}/>
              </div>
              <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>
                <AT ar={s.desc} en={s.descEn}/>
              </div>
            </div>
            <span style={{ color: 'var(--fg-3)', fontSize: 16 }}>←</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ManagerDashTab, ManagerStudentsTab, ManagerTeachersTab, ManagerFinanceTab, ManagerCalendarTab, ManagerSettingsTab });
