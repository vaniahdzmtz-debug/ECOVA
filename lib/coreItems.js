// Fallback data used only if Supabase isn't seeded yet.
// The real data lives in the Supabase `core_items` table.
export const FALLBACK_ITEMS = [
  {
    id: 1,
    name: 'Reusable water bottle',
    category: 'water',
    impact_level: 'low',
    price_level: '$250 MXN one-time',
    convenience_level: 'medium',
  },
  {
    id: 2,
    name: 'Bottled water (disposable bottles/jugs)',
    category: 'water',
    impact_level: 'high',
    price_level: '$20-30 MXN each, adds up over time',
    convenience_level: 'high',
  },
  {
    id: 3,
    name: 'Second-hand clothing (thrift/flea market)',
    category: 'clothing',
    impact_level: 'low',
    price_level: '$100-200 MXN per item',
    convenience_level: 'medium',
  },
  {
    id: 4,
    name: 'New fast-fashion item (online order)',
    category: 'clothing',
    impact_level: 'high',
    price_level: '$300-500 MXN per item',
    convenience_level: 'high',
  },
  {
    id: 5,
    name: 'Public transit (Metro, MetrobÃºs, or bus)',
    category: 'transport',
    impact_level: 'low',
    price_level: '$5-13 MXN per ride',
    convenience_level: 'medium',
  },
  {
    id: 6,
    name: 'Rideshare app (Uber or DiDi)',
    category: 'transport',
    impact_level: 'high',
    price_level: '$80-150+ MXN per ride',
    convenience_level: 'high',
  },
];

const LEVEL_SCORE = { low: 2, medium: 1, high: 0 };

// Simple rule-based verdict â€” NOT AI-generated. Weighs impact and
// convenience into a score, then writes a plain sentence from a template.
// Price is shown to the user but described qualitatively rather than
// scored numerically, since it's stored as free text (e.g. "$250 MXN").
export function generateVerdict(a, b) {
  const scoreA = LEVEL_SCORE[a.impact_level] + LEVEL_SCORE[a.convenience_level];
  const scoreB = LEVEL_SCORE[b.impact_level] + LEVEL_SCORE[b.convenience_level];

  const winner = scoreA >= scoreB ? a : b;
  const loser = scoreA >= scoreB ? b : a;
  const winnerScore = Math.max(scoreA, scoreB);
  const loserScore = Math.min(scoreA, scoreB);

  const winnerLessConvenient =
    winner.convenience_level === 'medium' && loser.convenience_level === 'high';

  if (winnerScore === loserScore) {
    return `${a.name} and ${b.name} land pretty close together here â€” either is a reasonable choice depending on what matters more to you today.`;
  }

  if (winnerLessConvenient) {
    return `${winner.name} takes a little more effort or planning, but wins clearly on impact â€” worth it if you can make it a habit.`;
  }

  return `${winner.name} comes out ahead here, with a lower impact without giving up much on convenience compared to ${loser.name.toLowerCase()}.`;
}
