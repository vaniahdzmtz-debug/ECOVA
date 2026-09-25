// Fallback data used only if Supabase isn't seeded yet.
// The real data lives in the Supabase `research_items` table.
export const FALLBACK_RESEARCH_ITEMS = [
  {
    id: 1,
    name: 'Good On You',
    type: 'competitor',
    scope: 'global',
    category: 'fashion',
    notes: 'Rates fashion brands from 1-5 based on their impact on people, the planet, and animals.',
    is_global_example: true,
  },
  {
    id: 2,
    name: 'Yuka',
    type: 'competitor',
    scope: 'global',
    category: 'food & beauty',
    notes: 'Scans product barcodes and rates ingredients for health and environmental impact.',
    is_global_example: true,
  },
  {
    id: 3,
    name: 'Think Dirty',
    type: 'competitor',
    scope: 'global',
    category: 'beauty',
    notes: 'Rates beauty products based on potentially toxic or harmful ingredients.',
    is_global_example: true,
  },
  {
    id: 4,
    name: 'Ecoly',
    type: 'competitor',
    scope: 'global',
    category: 'lifestyle',
    notes: 'A gamified app where users complete environmental challenges.',
    is_global_example: true,
  },
  {
    id: 5,
    name: 'Ethical Consumer',
    type: 'competitor',
    scope: 'global',
    category: 'multi-category',
    notes: 'UK-based research site rating companies on ethics and sustainability across categories.',
    is_global_example: true,
  },
  {
    id: 6,
    name: 'Google or social media search',
    type: 'substitute',
    scope: 'global',
    category: 'informal research',
    notes: 'The most common substitute — searching manually instead of using a dedicated app.',
    is_global_example: false,
  },
  {
    id: 7,
    name: 'Asking friends or family',
    type: 'substitute',
    scope: 'global',
    category: 'social validation',
    notes: 'Relying on personal recommendations instead of independent research.',
    is_global_example: false,
  },
  {
    id: 8,
    name: 'Buying based on price alone',
    type: 'substitute',
    scope: 'global',
    category: 'default behavior',
    notes: "No research at all — sustainability isn't factored into the decision.",
    is_global_example: false,
  },
];

// Risk map content is static and hand-written, not computed from data.
export const RISK_MAP = [
  {
    impact: 'High',
    likelihood: 'High',
    text: 'Price sensitivity outweighs sustainability for most students.',
  },
  {
    impact: 'High',
    likelihood: 'Medium',
    text: "Greenwashing distrust reduces trust in any rating system, including Ecova's.",
  },
  {
    impact: 'Medium',
    likelihood: 'High',
    text: 'A small catalog size limits usefulness in the early stages.',
  },
  {
    impact: 'Medium',
    likelihood: 'Medium',
    text: 'Users may be reluctant to change existing shopping habits.',
  },
];
