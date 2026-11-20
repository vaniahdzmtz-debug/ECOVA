// All content for /demo lives here. Rule-based, NOT AI. Written to match what Ecova really does.

export const STEPS = [
  {
    title: 'Home: what Ecova is',
    path: '/',
    what: 'The landing page explains the idea: compare two everyday choices by price, effort and impact.',
    look: 'The hero, the example comparison card and the three-step explanation.',
  },
  {
    title: 'Core: compare two choices',
    path: '/core',
    what: 'The starter catalog of 6 everyday items (water, clothing, getting around) and a side-by-side comparison with a verdict.',
    look: 'Pick two items and read the verdict. Prices are approximate and in MXN.',
  },
  {
    title: 'Research: who else does this',
    path: '/research',
    what: 'Competitors and local examples, plus a risk map. It shows where Ecova fits in the market.',
    look: 'The competitor list and the risk map.',
  },
  {
    title: 'Product and Pricing',
    path: '/product',
    what: 'The feature map (live vs planned) and a pricing page with simple scenarios for revenue.',
    look: 'Which features are Live and which are Planned. Then open /pricing and try a scenario.',
  },
  {
    title: 'Marketing: content for Dana',
    path: '/marketing',
    what: 'Brand colors, a persona (Dana, 21), landing copy, social posts, video scripts and two A/B tests with real votes.',
    look: 'The A/B tests: each browser can vote only once.',
  },
  {
    title: 'Chat: the Ecova guide',
    path: '/chat',
    what: 'A rule-based guided assistant. Three questions, a checkpoint where you confirm your answers, then a recommendation. It now includes the Best balance option.',
    look: 'Try Water, Best balance, Rarely. Notice it says "Rule-based answer, not AI."',
  },
  {
    title: 'Dashboard: real records',
    path: '/dashboard',
    what: 'Counts from the database: chats, feedback, A/B votes and saved marketing assets. It never shows what people typed.',
    look: 'The totals and the testing summary.',
  },
];

export const AGENT_MAP = [
  { name: 'Catalog guide', page: '/core', job: 'Holds the 6 items and writes the comparison verdict.', input: 'Two chosen items', output: 'A verdict (rules)', human: 'None, it only compares' },
  { name: 'Research scanner', page: '/research', job: 'Lists competitors and risks.', input: 'Research items table', output: 'Cards and a risk map', human: 'I chose and checked each item' },
  { name: 'Pricing calculator', page: '/pricing', job: 'Calculates revenue scenarios with fixed formulas.', input: 'Five numbers from the user', output: 'Monthly and yearly revenue', human: 'I decided the prices' },
  { name: 'Marketing engine', page: '/marketing', job: 'Shows brand, persona, posts and scripts, and counts A/B votes.', input: 'Fixed content and votes', output: 'Copy-ready posts, vote results', human: 'I approved every post and picked the winner' },
  { name: 'Ecova guide', page: '/chat', job: 'Asks 3 questions and recommends one option. Refuses off-topic, health, money and legal questions.', input: 'Three button answers', output: 'A recommendation and a score', human: 'Checkpoint 1: user confirms. Checkpoint 2: user decides if a question is saved' },
  { name: 'Memory (Supabase)', page: '/dashboard', job: 'Stores chats, feedback, votes and saved assets.', input: 'Confirmed chats and votes', output: 'Counts on the dashboard', human: 'I review flagged questions in the Table Editor' },
];

export const AGENT_NOTE =
  'None of these parts uses AI inside the site. They are rule-based. AI (Claude) was used only as a coding assistant while I built the site.';

export const IMPACT = {
  benefits: [
    'Saves Dana time: one clear answer instead of reading a table.',
    'Shows real prices in pesos, so the choice also fits a student budget.',
    'Costs nothing to run: free tiers of Vercel and Supabase, and no paid API.',
  ],
  risks: [
    { risk: 'Prices change, so the numbers can become wrong.', fix: 'Prices are labeled approximate and shown in MXN. The catalog is easy to update.' },
    { risk: '"Low impact" is a simplification of a complex topic.', fix: 'The site only compares two options with fixed levels and says it is a simple guide.' },
    { risk: 'Someone could type private or sensitive information.', fix: 'The chat warns users, hides emails and phone numbers and never saves them. The dashboard shows counts only.' },
    { risk: 'Someone could ask for health, money or legal advice.', fix: 'The chat refuses and suggests a professional. Harm words stop the chat and point to 911.' },
    { risk: 'The database is public to read (no accounts).', fix: 'Only anonymous choices are stored, never names, emails or free text, except a question the user chooses to flag.' },
    { risk: 'Results might look like AI or expert advice.', fix: 'Every chat answer says "Rule-based answer, not AI."' },
  ],
  viability:
    'Running cost today is zero. The plan is a free version plus a Plus plan of $49 MXN per month (see /pricing). The main limit is that the catalog has only 6 items, so growth depends on adding verified data.',
};

export const ROADMAP = [
  { v: 'Version 2 (next)', items: ['Link each chat result to its comparison in /core.', 'More topics with verified data, such as food and energy.', 'Spanish version of the site and the chat.'] },
  { v: 'Version 3 (later)', items: ['A small admin page to review flagged questions.', 'Saved comparison history for users with an account.', 'More ways to choose, such as monthly budget or distance.'] },
];
