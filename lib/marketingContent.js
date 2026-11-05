// All Week 4 marketing content lives here as plain data.
// It was written ahead of time. There is NO AI generation at runtime
// and no database call for this content.
//
// Every claim below comes from Ecova's real starter catalog (/core):
//   Reusable water bottle ($250 MXN one-time) vs bottled water ($20-30 MXN each)
//   Second-hand clothing ($100-200 MXN) vs fast-fashion online order ($300-500 MXN)
//   Public transit ($5-13 MXN per ride) vs rideshare ($80-150+ MXN per ride)
// No statistics, testimonials, or discounts are invented.

export const BRAND = {
  promise: 'Greener choices, without the guilt or the extra cost.',
  tone: ['Friendly', 'Simple', 'Practical'],
  colors: [
    { name: 'Forest', hex: '#1F3A2E', use: 'Headings and dark sections' },
    { name: 'Lake', hex: '#1F6F8B', use: 'Main buttons and links' },
    { name: 'Leaf', hex: '#3E9B6A', use: 'Positive accents and Save buttons' },
    { name: 'Mint', hex: '#D6EFE0', use: 'Soft green backgrounds' },
    { name: 'Sky', hex: '#DCEEF5', use: 'Soft blue backgrounds' },
  ],
  fonts: { headings: 'Fraunces', body: 'Inter' },
};

export const PERSONA = {
  name: 'Dana',
  age: 21,
  role: 'University student',
  city: 'Mexico City',
  wants: 'To make greener choices, but only if they are quick and cheap.',
  frustrations:
    'Little money and little time. Most sustainability advice feels long, expensive, or preachy.',
  channels: 'Instagram and TikTok',
};

export const LANDING_COPY = {
  headline: 'Make greener choices without spending more.',
  subheadline:
    'Pick two everyday options and Ecova shows which one is cheaper, easier, and better for the planet, in about ten seconds.',
  benefits: [
    { title: 'Fast answers', text: 'Compare two choices in seconds, not hours of research.' },
    { title: 'Price first', text: 'See the cost in pesos next to the impact.' },
    { title: 'No guilt trips', text: 'Clear, friendly guidance. You decide.' },
  ],
  button: 'Compare two choices',
};

export const POSTS = [
  {
    id: 'p1',
    platform: 'Instagram',
    hook: 'Bottled water: $20-30 each. A reusable bottle: $250 once.',
    caption:
      'Do the math over a semester. Ecova compares the two in seconds, with cost and impact side by side.',
    hashtags: ['#ecova', '#estudiantes', '#ahorro'],
  },
  {
    id: 'p2',
    platform: 'TikTok',
    hook: 'Is the cheap option also the green one?',
    caption:
      'Sometimes yes. Pick two choices on Ecova and see in ten seconds. Try Public transit vs Rideshare.',
    hashtags: ['#sustentable', '#tips', '#ecova'],
  },
  {
    id: 'p3',
    platform: 'Instagram',
    hook: 'A Metro ride: $5-13. A rideshare: $80-150+.',
    caption:
      'Same trip across the city, very different cost. Ecova shows the price and the impact together.',
    hashtags: ['#cdmx', '#ecova', '#movilidad'],
  },
  {
    id: 'p4',
    platform: 'TikTok',
    hook: 'Thrifted jacket vs new online order. Which one wins?',
    caption:
      'Second-hand: $100-200 per item. New fast-fashion: $300-500 per item. Ecova shows who wins on cost and impact.',
    hashtags: ['#thrift', '#ecova', '#ropa'],
  },
  {
    id: 'p5',
    platform: 'Instagram',
    hook: 'You do not need to be perfect. Just pick the better option.',
    caption:
      'Ecova turns confusing sustainability info into one simple comparison. No guilt, no jargon.',
    hashtags: ['#ecova', '#sinculpa', '#vidaverde'],
  },
  {
    id: 'p6',
    platform: 'TikTok',
    hook: 'Three swaps that save money and the planet.',
    caption:
      'Reusable bottle, second-hand clothes, public transit. Compare any two of them on Ecova.',
    hashtags: ['#ahorro', '#estudiantes', '#ecova'],
  },
  {
    id: 'p7',
    platform: 'Instagram',
    hook: 'Quick question: what is your most convenient choice this week?',
    caption:
      'Convenience matters. Ecova weighs impact, price, and convenience so the answer is not only about guilt.',
    hashtags: ['#ecova', '#pregunta', '#estudiantes'],
  },
  {
    id: 'p8',
    platform: 'TikTok',
    hook: 'Ten seconds. Two choices. One clear answer.',
    caption:
      'That is how Ecova works. Pick two everyday options and get a simple verdict.',
    hashtags: ['#ecova', '#10segundos', '#tips'],
  },
  {
    id: 'p9',
    platform: 'Instagram',
    hook: 'Fast fashion feels cheap until you count the wears.',
    caption:
      'New online order: $300-500 per item. Second-hand: $100-200. See the comparison on Ecova.',
    hashtags: ['#fastfashion', '#ecova', '#segundamano'],
  },
  {
    id: 'p10',
    platform: 'TikTok',
    hook: 'We are building Ecova for students like you.',
    caption:
      'Free to start, no account needed. Tell us which comparison you want to see next.',
    hashtags: ['#ecova', '#estudiantes', '#comunidad'],
  },
];

export const SCRIPTS = [
  {
    id: 's1',
    title: 'Ten seconds to decide',
    platform: 'TikTok',
    length: '20 seconds',
    hook: '"You are about to buy a drink. Wait ten seconds."',
    beats: [
      'Show a bottle of water and a reusable bottle side by side.',
      'Open Ecova and pick the two items. Show the cost and the impact.',
      'Show the simple verdict on screen.',
    ],
    cta: '"Try it free. Link in bio."',
  },
  {
    id: 's2',
    platform: 'TikTok',
    title: 'Metro or rideshare?',
    length: '25 seconds',
    hook: '"Same trip. $5 or $150. Which one is greener?"',
    beats: [
      'Show a Metro ride and a rideshare app side by side.',
      'Compare the two on Ecova: price, impact, convenience.',
      'Reveal the verdict and say that convenience counts too.',
    ],
    cta: '"Pick your own two choices on Ecova."',
  },
  {
    id: 's3',
    title: 'Closet swap',
    platform: 'Instagram Reels',
    length: '20 seconds',
    hook: '"This jacket cost $150. This one cost $400."',
    beats: [
      'Hold up a second-hand piece and a new online order.',
      'Show the comparison on Ecova with the real price ranges.',
      'Say that you do not have to be perfect, just choose the better option.',
    ],
    cta: '"Compare your next purchase on Ecova."',
  },
];

// 14 days. Every post and every script appears at least once.
export const CALENDAR = [
  { day: 1, ref: 'p1', goal: 'Awareness' },
  { day: 2, ref: 's1', goal: 'Awareness' },
  { day: 3, ref: 'p3', goal: 'Awareness' },
  { day: 4, ref: 'p2', goal: 'Engagement' },
  { day: 5, ref: 'p5', goal: 'Engagement' },
  { day: 6, ref: 's2', goal: 'Awareness' },
  { day: 7, ref: 'p7', goal: 'Engagement' },
  { day: 8, ref: 'p4', goal: 'Awareness' },
  { day: 9, ref: 'p6', goal: 'Engagement' },
  { day: 10, ref: 's3', goal: 'Awareness' },
  { day: 11, ref: 'p9', goal: 'Engagement' },
  { day: 12, ref: 'p8', goal: 'Conversion' },
  { day: 13, ref: 'p10', goal: 'Conversion' },
  { day: 14, ref: 'p1', goal: 'Conversion' },
];

export const AB_TESTS = [
  {
    id: 1,
    title: 'Test 1: Which homepage headline do you prefer?',
    A: 'Make greener choices without spending more.',
    B: 'Compare two everyday choices in ten seconds.',
  },
  {
    id: 2,
    title: 'Test 2: Which opening line would make you stop scrolling?',
    A: 'A Metro ride: $5-13. A rideshare: $80-150+.',
    B: 'Quick question: which is cheaper and greener, Metro or rideshare?',
  },
];

export function findItem(ref) {
  return POSTS.find((p) => p.id === ref) || SCRIPTS.find((s) => s.id === ref) || null;
}

export function itemLabel(ref) {
  const item = findItem(ref);
  if (!item) return ref;
  return ref.startsWith('p') ? 'Post: ' + item.hook : 'Script: ' + item.title;
}

export function itemPlatform(ref) {
  const item = findItem(ref);
  return item ? item.platform : '';
}

// Plain text for the Copy and Export buttons.
export function toText(kind, item) {
  if (kind === 'post') {
    return item.hook + '\n\n' + item.caption + '\n\n' + item.hashtags.join(' ');
  }
  if (kind === 'script') {
    return (
      item.title +
      ' (' + item.platform + ', ' + item.length + ')\n\n' +
      'Hook: ' + item.hook + '\n' +
      item.beats.map((b, i) => 'Beat ' + (i + 1) + ': ' + b).join('\n') + '\n' +
      'Call to action: ' + item.cta
    );
  }
  if (kind === 'landing') {
    return (
      LANDING_COPY.headline + '\n\n' +
      LANDING_COPY.subheadline + '\n\n' +
      LANDING_COPY.benefits.map((b) => b.title + ': ' + b.text).join('\n') + '\n\n' +
      'Button: ' + LANDING_COPY.button
    );
  }
  if (kind === 'calendar') {
    return CALENDAR.map(
      (d) => 'Day ' + d.day + ' | ' + itemPlatform(d.ref) + ' | ' + itemLabel(d.ref) + ' | ' + d.goal
    ).join('\n');
  }
  return '';
}
