// All pricing math for Ecova lives in this one file.
// Rule-based formulas only — NOT AI. Prices are in Mexican pesos (MXN).

export const PRICES = {
  plusMonthly: 49, // MXN per month
  plusYearlyTotal: 480, // MXN per year
  plusYearlyPerMonth: 40, // MXN per month, effective
};

export const SCENARIOS = {
  conservative: {
    label: 'Conservative',
    students: 1500,
    studentPct: 2,
    others: 500,
    othersPct: 4,
    yearlyPct: 20,
  },
  expected: {
    label: 'Expected',
    students: 4000,
    studentPct: 3,
    others: 1000,
    othersPct: 6,
    yearlyPct: 30,
  },
  optimistic: {
    label: 'Optimistic',
    students: 8000,
    studentPct: 5,
    others: 2000,
    othersPct: 8,
    yearlyPct: 40,
  },
};

// Checks the five input boxes (raw text from the form).
// Returns a friendly message if something is wrong, or '' if all is fine.
export function validateInputs(raw) {
  const fields = [
    ['students', 'Students'],
    ['studentPct', 'Students paying %'],
    ['others', 'Others'],
    ['othersPct', 'Others paying %'],
    ['yearlyPct', 'Yearly plan %'],
  ];

  for (const [key, label] of fields) {
    const text = String(raw[key] ?? '').trim();
    if (text === '') return `Please fill in "${label}".`;
    const n = Number(text);
    if (!Number.isFinite(n)) return `"${label}" needs to be a number.`;
    if (n < 0) return `"${label}" can't be negative.`;
    if (key.toLowerCase().includes('pct') && n > 100) {
      return `"${label}" can't be more than 100.`;
    }
  }
  return '';
}

// Turns valid numbers into the revenue results.
export function calcRevenue(i) {
  const students = Number(i.students);
  const others = Number(i.others);
  const studentPct = Number(i.studentPct);
  const othersPct = Number(i.othersPct);
  const yearlyPct = Number(i.yearlyPct);

  const payingStudents = Math.round((students * studentPct) / 100);
  const payingOthers = Math.round((others * othersPct) / 100);
  const payers = payingStudents + payingOthers;
  const yearlyPayers = Math.round((payers * yearlyPct) / 100);
  const monthlyPayers = payers - yearlyPayers;
  const monthly =
    monthlyPayers * PRICES.plusMonthly + yearlyPayers * PRICES.plusYearlyPerMonth;

  return {
    payingStudents,
    payingOthers,
    payers,
    yearlyPayers,
    monthlyPayers,
    monthly,
    annual: monthly * 12,
  };
}

// Formats a number like $8,334 MXN
export function formatMXN(n) {
  return '$' + Number(n).toLocaleString('en-US') + ' MXN';
}
