// Testing summary shown on /dashboard. Update this file after each round of tests.
// Only real results go here.

export const SOFTWARE_TESTS = [
  { week: 5, name: 'S1 Recommendations', what: 'Three answer combinations (water, clothing) gave the expected recommendation.', result: 'Pass' },
  { week: 5, name: 'S2 Guardrails', what: 'Health and off-topic questions were refused, the off-topic question was saved as flagged, and an email was hidden and not saved.', result: 'Pass' },
  { week: 5, name: 'S3 Saving', what: 'A finished chat and a thumbs up created one row in each table.', result: 'Pass' },
  { week: 6, name: 'S4 Best balance', what: 'Best balance gives a valid result and a score table (water rarely: 4 points each, tie goes to the greener option).', result: 'Pass' },
  { week: 6, name: 'S5 Dashboard', what: 'Dashboard counts match the rows in Supabase (22 completed + 3 flagged = 25 rows; 13 saved assets).', result: 'Pass' },
  { week: 6, name: 'S6 Regression', what: 'All 10 menu pages load with no error and every nav link works.', result: 'Pass' },
];

export const EXTERNAL_TESTERS = [
  { week: 5, who: 'Tester 1', found: 'The first-question buttons were confusing.', action: 'Added a short example under each button.' },
  { week: 5, who: 'Tester 2', found: 'Wanted links or online examples with the recommendation.', action: 'Not built in Week 5 (out of scope). Version 2 idea.' },
  { week: 5, who: 'Tester 3', found: 'Wanted more options than price and impact.', action: 'Built in Week 6 as "Best balance".' },
  { week: 6, who: 'Tester 4', found: 'Wanted a short "Best if..." sentence on each demo step.', action: 'Added a "Best if..." line to every demo step.' },
  { week: 6, who: 'Tester 5', found: 'Was confused about what to do on the demo.', action: 'Added a "How this demo works" box at the top.' },
  { week: 6, who: 'Tester 6', found: 'Did not know how Ecova decides which option is better. Wanted more products and regularly updated prices.', action: 'Added the "How Ecova decides" tab. More products and updated prices: Version 2.' },
  { week: 6, who: 'Tester 7', found: 'Wanted to know where the environmental information comes from and why one option is greener.', action: 'Added an honest reliability note and a simple "why" for each item. Sources: Version 2.' },
  { week: 6, who: 'Tester 8', found: 'Did not know where to start and suggested a small tutorial.', action: 'The "How this demo works" box is the tutorial.' },
];
