'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n-context';
import styles from './register.module.css';

type FormType = 'student' | 'adult';

function T({ ar, en }: { ar: string; en: string }) {
  const { t } = useI18n();
  return <>{t(ar, en)}</>;
}

interface StudentForm {
  name: string;
  classLevel: string;
  birthDate: string;
  gender: string;
  fatherPhone: string;
  motherPhone: string;
  paymentChallenge: string;
  healthNotes: string;
}

interface AdultForm {
  name: string;
  birthDate: string;
  gender: string;
  phone: string;
  hifzLevel: string;
  tajwid: string;
  tafsir: string;
}

const INITIAL_STUDENT: StudentForm = {
  name: '', classLevel: '', birthDate: '', gender: '',
  fatherPhone: '', motherPhone: '', paymentChallenge: '', healthNotes: '',
};

const INITIAL_ADULT: AdultForm = {
  name: '', birthDate: '', gender: '', phone: '',
  hifzLevel: '', tajwid: '', tafsir: '',
};

const PHONE_RE = /^0\d{1,2}-?\d{3}-?\d{4}$/;

function isValidPhone(v: string): boolean {
  return PHONE_RE.test(v.replace(/\s/g, ''));
}

function isValidDate(v: string): boolean {
  if (!v) return false;
  const d = new Date(v);
  if (isNaN(d.getTime())) return false;
  return d < new Date();
}

function isMinWords(v: string, min: number): boolean {
  return v.trim().split(/\s+/).length >= min;
}

type Errors = Record<string, string>;

export default function RegisterPage() {
  const { t } = useI18n();
  const [formType, setFormType] = useState<FormType>('student');
  const [student, setStudent] = useState<StudentForm>(INITIAL_STUDENT);
  const [adult, setAdult] = useState<AdultForm>(INITIAL_ADULT);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setS = (k: keyof StudentForm, v: string) => setStudent(p => ({ ...p, [k]: v }));
  const setA = (k: keyof AdultForm, v: string) => setAdult(p => ({ ...p, [k]: v }));
  const touch = (k: string) => setTouched(p => ({ ...p, [k]: true }));

  function validateStudent(): Errors {
    const e: Errors = {};
    if (!isMinWords(student.name, 3)) e.name = t('يجب إدخال الاسم الثلاثي', 'Full name required (at least 3 words)');
    if (!student.classLevel) e.classLevel = t('يجب اختيار الصف', 'Class is required');
    if (!student.gender) e.gender = t('يجب اختيار الجنس', 'Gender is required');
    if (!isValidDate(student.birthDate)) e.birthDate = t('تاريخ ميلاد غير صالح', 'Invalid date of birth');
    if (!isValidPhone(student.fatherPhone)) e.fatherPhone = t('رقم هاتف غير صالح (مثال: 050-123-4567)', 'Invalid phone (e.g. 050-123-4567)');
    if (student.motherPhone && !isValidPhone(student.motherPhone)) e.motherPhone = t('رقم هاتف غير صالح', 'Invalid phone number');
    return e;
  }

  function validateAdult(): Errors {
    const e: Errors = {};
    if (!isMinWords(adult.name, 3)) e.name = t('يجب إدخال الاسم الثلاثي', 'Full name required (at least 3 words)');
    if (!isValidDate(adult.birthDate)) e.birthDate = t('تاريخ ميلاد غير صالح', 'Invalid date of birth');
    if (!adult.gender) e.gender = t('يجب اختيار الجنس', 'Gender is required');
    if (!isValidPhone(adult.phone)) e.phone = t('رقم هاتف غير صالح (مثال: 050-123-4567)', 'Invalid phone (e.g. 050-123-4567)');
    if (!adult.hifzLevel) e.hifzLevel = t('يجب اختيار مستوى الحفظ', 'Memorization level is required');
    return e;
  }

  const errors = formType === 'student' ? validateStudent() : validateAdult();
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = () => {
    const allFields = formType === 'student'
      ? Object.keys(student) as string[]
      : Object.keys(adult) as string[];
    const allTouched: Record<string, boolean> = {};
    allFields.forEach(k => { allTouched[k] = true; });
    setTouched(allTouched);
    if (isValid) setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setTouched({});
    setStudent(INITIAL_STUDENT);
    setAdult(INITIAL_ADULT);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 8,
    border: '1px solid var(--border)', background: 'var(--bg-card)',
    color: 'var(--fg-1)', fontSize: 14, fontFamily: 'var(--font-arabic-body)', outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: 'var(--font-arabic-display)',
    fontSize: 13, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 6,
  };

  return (
    <>
      <div style={{ background: 'var(--green-800)', color: '#fff', padding: 'clamp(48px,8vw,80px) 24px', textAlign: 'center' }}>
        <div className="pub-eyebrow" style={{ justifyContent: 'center', color: 'var(--accent-warm)' }}>
          <T ar="العام الدراسي ١٤٤٧ هـ" en="Academic Year 1447H" />
        </div>
        <h1 style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 700, margin: '16px 0 0' }}>
          <T ar="التسجيل" en="Registration" />
        </h1>
        <p style={{ fontSize: 'clamp(14px,2vw,16px)', color: 'rgba(255,255,255,0.75)', marginTop: 12, maxWidth: 500, marginInline: 'auto' }}>
          <T ar="اختر نوع التسجيل المناسب وأكمل البيانات" en="Choose the registration type and fill in the details" />
        </p>
      </div>

      <section style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {/* Type selector */}
          <div className={styles.tabs}>
            <button
              className={formType === 'student' ? styles.tabActive : styles.tab}
              onClick={() => { setFormType('student'); setSubmitted(false); setTouched({}); }}
            >
              <span className={styles.tabIcon}>🎒</span>
              <T ar="طلاب (بنين / بنات)" en="Students (Boys / Girls)" />
            </button>
            <button
              className={formType === 'adult' ? styles.tabActive : styles.tab}
              onClick={() => { setFormType('adult'); setSubmitted(false); setTouched({}); }}
            >
              <span className={styles.tabIcon}>📖</span>
              <T ar="كبار (رجال / نساء)" en="Adults (Men / Women)" />
            </button>
          </div>

          {/* Form card */}
          <div className={styles.card}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <div style={{ fontFamily: 'var(--font-arabic-display)', fontSize: 22, fontWeight: 700, color: 'var(--accent)' }}>
                  <T ar="تم إرسال الطلب بنجاح" en="Application Submitted Successfully" />
                </div>
                <p style={{ fontSize: 14, color: 'var(--fg-3)', marginTop: 8 }}>
                  <T ar="سنتواصل معك قريباً إن شاء الله" en="We'll contact you soon, insha'Allah" />
                </p>
                <button onClick={handleReset} className={styles.submitBtn} style={{ marginTop: 20, width: 'auto', padding: '10px 24px' }}>
                  <T ar="تسجيل جد��د" en="New Registration" />
                </button>
              </div>
            ) : formType === 'student' ? (
              /* ───── Student Form ───── */
              <div className={styles.formGrid}>
                <div className={styles.formTitle}>
                  <T ar="تسجيل طالب / طالبة" en="Student Registration" />
                </div>

                <div className={styles.fullWidth}>
                  <label style={labelStyle}><T ar="اسم الطالب/ة الكامل" en="Student Full Name" /> *</label>
                  <input style={inputStyle} className={touched.name && errors.name ? styles.inputError : undefined}
                    value={student.name} onChange={e => setS('name', e.target.value)} onBlur={() => touch('name')}
                    placeholder={t('الاسم الثلاثي', 'Full name')} />
                  {touched.name && errors.name && <div className={styles.fieldError}>{errors.name}</div>}
                </div>

                <div className={styles.row2}>
                  <div>
                    <label style={labelStyle}><T ar="الصف" en="Class" /> *</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} className={touched.classLevel && errors.classLevel ? styles.inputError : undefined}
                      value={student.classLevel} onChange={e => { setS('classLevel', e.target.value); touch('classLevel'); }}>
                      <option value="">{t('اختر الصف', 'Select class')}</option>
                      {[
                        { ar: 'الأول', en: 'First' },
                        { ar: 'الثاني', en: 'Second' },
                        { ar: 'الثالث', en: 'Third' },
                        { ar: 'الرابع', en: 'Fourth' },
                        { ar: 'الخامس', en: 'Fifth' },
                        { ar: 'السادس', en: 'Sixth' },
                        { ar: 'السابع', en: 'Seventh' },
                        { ar: 'الثامن', en: 'Eighth' },
                        { ar: 'التاسع', en: 'Ninth' },
                        { ar: 'العاشر', en: 'Tenth' },
                        { ar: 'الحادي عشر', en: 'Eleventh' },
                        { ar: 'الثاني عشر', en: 'Twelfth' },
                      ].map((c, i) => (
                        <option key={i + 1} value={String(i + 1)}>
                          {t(`الصف ${c.ar}`, `${c.en} Grade`)}
                        </option>
                      ))}
                    </select>
                    {touched.classLevel && errors.classLevel && <div className={styles.fieldError}>{errors.classLevel}</div>}
                  </div>
                  <div>
                    <label style={labelStyle}><T ar="الجنس" en="Gender" /> *</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} className={touched.gender && errors.gender ? styles.inputError : undefined}
                      value={student.gender} onChange={e => { setS('gender', e.target.value); touch('gender'); }}>
                      <option value="">{t('اختر', 'Select')}</option>
                      <option value="male">{t('ذكر', 'Male')}</option>
                      <option value="female">{t('أنثى', 'Female')}</option>
                    </select>
                    {touched.gender && errors.gender && <div className={styles.fieldError}>{errors.gender}</div>}
                  </div>
                </div>

                <div className={styles.fullWidth}>
                  <label style={labelStyle}><T ar="تاريخ الميلاد" en="Date of Birth" /> *</label>
                  <input type="date" style={inputStyle} className={touched.birthDate && errors.birthDate ? styles.inputError : undefined}
                    value={student.birthDate} onChange={e => setS('birthDate', e.target.value)} onBlur={() => touch('birthDate')} />
                  {touched.birthDate && errors.birthDate && <div className={styles.fieldError}>{errors.birthDate}</div>}
                </div>

                <div className={styles.row2}>
                  <div>
                    <label style={labelStyle}><T ar="هاتف الأب" en="Father's Phone" /> *</label>
                    <input type="tel" style={inputStyle} className={touched.fatherPhone && errors.fatherPhone ? styles.inputError : undefined}
                      value={student.fatherPhone} onChange={e => setS('fatherPhone', e.target.value)} onBlur={() => touch('fatherPhone')}
                      placeholder="05x-xxx-xxxx" />
                    {touched.fatherPhone && errors.fatherPhone && <div className={styles.fieldError}>{errors.fatherPhone}</div>}
                  </div>
                  <div>
                    <label style={labelStyle}><T ar="هاتف الأم / ولي أمر آخر" en="Mother / Other Guardian Phone" /></label>
                    <input type="tel" style={inputStyle} className={touched.motherPhone && errors.motherPhone ? styles.inputError : undefined}
                      value={student.motherPhone} onChange={e => setS('motherPhone', e.target.value)} onBlur={() => touch('motherPhone')}
                      placeholder="05x-xxx-xxxx" />
                    {touched.motherPhone && errors.motherPhone && <div className={styles.fieldError}>{errors.motherPhone}</div>}
                  </div>
                </div>

                <div className={styles.fullWidth}>
                  <label style={labelStyle}><T ar="هل هناك صعوبة في دفع رسوم التسجيل السنوية؟" en="Is there any challenge in paying the annual registration fee?" /></label>
                  <textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={student.paymentChallenge} onChange={e => setS('paymentChallenge', e.target.value)}
                    placeholder={t('اذكر التفاصيل إن وجدت...', 'Provide details if any...')} />
                </div>

                <div className={styles.fullWidth}>
                  <label style={labelStyle}><T ar="هل هناك أي صعوبات صحية أو نفسية؟" en="Are there any health or psychological difficulties?" /></label>
                  <textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={student.healthNotes} onChange={e => setS('healthNotes', e.target.value)}
                    placeholder={t('اذكر التفاصيل إن وجدت...', 'Provide details if any...')} />
                </div>

                <div className={styles.fullWidth}>
                  <button onClick={handleSubmit} className={styles.submitBtn} disabled={touched.name && !isValid}>
                    <T ar="إرسال طلب التسجيل" en="Submit Registration" />
                  </button>
                </div>
              </div>
            ) : (
              /* ───── Adult Form ───── */
              <div className={styles.formGrid}>
                <div className={styles.formTitle}>
                  <T ar="تسجيل كبار" en="Adult Registration" />
                </div>

                <div className={styles.fullWidth}>
                  <label style={labelStyle}><T ar="الاسم الكامل" en="Full Name" /> *</label>
                  <input style={inputStyle} className={touched.name && errors.name ? styles.inputError : undefined}
                    value={adult.name} onChange={e => setA('name', e.target.value)} onBlur={() => touch('name')}
                    placeholder={t('الاسم الثلاثي', 'Full name')} />
                  {touched.name && errors.name && <div className={styles.fieldError}>{errors.name}</div>}
                </div>

                <div className={styles.row2}>
                  <div>
                    <label style={labelStyle}><T ar="تاريخ الميلاد" en="Date of Birth" /> *</label>
                    <input type="date" style={inputStyle} className={touched.birthDate && errors.birthDate ? styles.inputError : undefined}
                      value={adult.birthDate} onChange={e => setA('birthDate', e.target.value)} onBlur={() => touch('birthDate')} />
                    {touched.birthDate && errors.birthDate && <div className={styles.fieldError}>{errors.birthDate}</div>}
                  </div>
                  <div>
                    <label style={labelStyle}><T ar="الجنس" en="Gender" /> *</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} className={touched.gender && errors.gender ? styles.inputError : undefined}
                      value={adult.gender} onChange={e => { setA('gender', e.target.value); touch('gender'); }}>
                      <option value="">{t('اختر', 'Select')}</option>
                      <option value="male">{t('رجل', 'Man')}</option>
                      <option value="female">{t('امرأة', 'Woman')}</option>
                    </select>
                    {touched.gender && errors.gender && <div className={styles.fieldError}>{errors.gender}</div>}
                  </div>
                </div>

                <div className={styles.fullWidth}>
                  <label style={labelStyle}><T ar="رقم الهاتف" en="Phone Number" /> *</label>
                  <input type="tel" style={inputStyle} className={touched.phone && errors.phone ? styles.inputError : undefined}
                    value={adult.phone} onChange={e => setA('phone', e.target.value)} onBlur={() => touch('phone')}
                    placeholder="05x-xxx-xxxx" />
                  {touched.phone && errors.phone && <div className={styles.fieldError}>{errors.phone}</div>}
                </div>

                <div className={styles.fullWidth}>
                  <label style={labelStyle}><T ar="ما مقدار حفظك من القرآن الكريم؟" en="How much of the Quran have you memorized?" /> *</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} className={touched.hifzLevel && errors.hifzLevel ? styles.inputError : undefined}
                    value={adult.hifzLevel} onChange={e => { setA('hifzLevel', e.target.value); touch('hifzLevel'); }}>
                    <option value="">{t('اختر', 'Select')}</option>
                    <option value="none">{t('لا شيء', 'None')}</option>
                    <option value="few_surahs">{t('بعض السور القصيرة', 'A few short surahs')}</option>
                    <option value="1_5_juz">{t('١ - ٥ أجزاء', '1 – 5 juz')}</option>
                    <option value="5_15_juz">{t('٥ - ١٥ جزء', '5 – 15 juz')}</option>
                    <option value="15_25_juz">{t('١٥ - ٢٥ جزء', '15 – 25 juz')}</option>
                    <option value="25_29_juz">{t('٢٥ - ٢٩ جزء', '25 – 29 juz')}</option>
                    <option value="full">{t('ختمت القرآن كاملاً', 'Full Quran')}</option>
                  </select>
                  {touched.hifzLevel && errors.hifzLevel && <div className={styles.fieldError}>{errors.hifzLevel}</div>}
                </div>

                <div className={styles.row2}>
                  <div>
                    <label style={labelStyle}><T ar="هل تدرس التجويد؟" en="Are you studying Tajwid?" /></label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} value={adult.tajwid} onChange={e => setA('tajwid', e.target.value)}>
                      <option value="">{t('اختر', 'Select')}</option>
                      <option value="no">{t('لا', 'No')}</option>
                      <option value="beginner">{t('مبتدئ', 'Beginner')}</option>
                      <option value="intermediate">{t('متوسط', 'Intermediate')}</option>
                      <option value="advanced">{t('متقدم', 'Advanced')}</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}><T ar="هل تدرس التفسير؟" en="Are you studying Tafsir?" /></label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} value={adult.tafsir} onChange={e => setA('tafsir', e.target.value)}>
                      <option value="">{t('اختر', 'Select')}</option>
                      <option value="no">{t('لا', 'No')}</option>
                      <option value="beginner">{t('مبتدئ', 'Beginner')}</option>
                      <option value="intermediate">{t('متوسط', 'Intermediate')}</option>
                      <option value="advanced">{t('متقدم', 'Advanced')}</option>
                    </select>
                  </div>
                </div>

                <div className={styles.fullWidth}>
                  <button onClick={handleSubmit} className={styles.submitBtn} disabled={touched.name && !isValid}>
                    <T ar="إرسال طلب التسجيل" en="Submit Registration" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
