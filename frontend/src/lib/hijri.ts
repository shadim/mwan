const arFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', { year: 'numeric' });
const enFormatter = new Intl.DateTimeFormat('en-SA-u-ca-islamic-umalqura', { year: 'numeric' });

export function getHijriYear(date: Date = new Date()) {
  const ar = arFormatter.format(date).replace(/\s*هـ\s*/, '');
  const en = enFormatter.format(date).replace(/\s*AH\s*/, '');
  return { ar, en, arH: `${ar} هـ`, enH: `${en}H` };
}

export function getGregorianYear(date: Date = new Date()) {
  return date.getFullYear();
}
