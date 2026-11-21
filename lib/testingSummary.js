// Testing summary shown on /dashboard. Update this file after each round of tests.
// Only real results go here.

export const SOFTWARE_TESTS = [
  { week: 5, name: 'S1 Recommendations', what: 'Three answer combinations (water, clothing) gave the expected recommendation.', result: 'Pass' },
  { week: 5, name: 'S2 Guardrails', what: 'Health and off-topic questions were refused, the off-topic question was saved as flagged, and an email was hidden and not saved.', result: 'Pass' },
  { week: 5, name: 'S3 Saving', what: 'A finished chat and a thumbs up created one row in each table.', result: 'Pass' },
  { week: 6, name: 'S4 Best balance', what: 'Best balance gives a valid result and a score table for water, clothing and getting around.', result: 'Pending' },
  { week: 6, name: 'S5 Dashboard', what: 'Dashboard counts match the rows in Supabase.', result: 'Pending' },
  { week: 6, name: 'S6 Regression', what: 'Every page loads, every nav link works and nothing breaks at phone width.', result: 'Pending' },
];

export const EXTERNAL_TESTERS = [
  { week: 5, who: 'Tester 1', found: 'The first-question buttons were confusing.', action: 'Added a short example under each button.' },
  { week: 5, who: 'Tester 2', found: 'Wanted links or online examples with the recommendation.', action: 'Not built in Week 5 (out of scope). Version 2 idea.' },
  { week: 5, who: 'Tester 3', found: 'Wanted more options than price and impact.', action: 'Built in Week 6 as "Best balance".' },
  { week: 6, who: 'Tester 4', found: 'Pending', action: 'Pending' },
  { week: 6, who: 'Tester 5', found: 'Pending', action: 'Pending' },
  { week: 6, who: 'Tester 6', found: 'Pending', action: 'Pending' },
  { week: 6, who: 'Tester 7', found: 'Pending', action: 'Pending' },
  { week: 6, who: 'Tester 8', found: 'Pending', action: 'Pending' },
];
