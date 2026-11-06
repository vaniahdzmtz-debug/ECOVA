// Rule-based chat logic for the Ecova guide. NOT AI: only fixed rules and the catalog.
import { FALLBACK_ITEMS } from './coreItems';

export const TOPICS = [
  { value: 'water', label: 'Water' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'transport', label: 'Getting around' },
  { value: 'other', label: 'Something else' },
];

export const PRIORITIES = [
  { value: 'price', label: 'Lowest price' },
  { value: 'effort', label: 'Least effort' },
  { value: 'impact', label: 'Lowest impact' },
];

export const FREQUENCIES = [
  { value: 'daily', label: 'Every day' },
  { value: 'weekly', label: 'A few times a week' },
  { value: 'rarely', label: 'Rarely' },
];

export const INTRO =
  "Hi! I'm the Ecova guide. I'm a rule-based guide, not AI. Please don't share personal information.";

export const LABEL = 'Rule-based answer, not AI';

export const TOPIC_HINT = 'I can help you compare water, clothing or getting around.';

export function labelFor(list, value) {
  const found = list.find((x) => x.value === value);
  return found ? found.label : value;
}

// ---------- Guardrails ----------

const HARM_WORDS = [
  'kill myself', 'suicide', 'suicidal', 'hurt myself', 'harm myself', 'want to die',
  'end my life', 'self harm', 'self-harm', 'me quiero morir', 'quitarme la vida',
  'being abused', 'someone is hurting me',
];
const HEALTH_WORDS = [
  'safe to drink', 'is it safe', 'sick', 'illness', 'disease', 'medicine', 'medical',
  'doctor', 'symptom', 'diarrhea', 'infection', 'pregnan', 'allergy', 'health', 'poison',
  'drink tap water', 'tap water',
];
const MONEY_WORDS = [
  'invest', 'stock', 'crypto', 'bitcoin', 'loan', 'credit card', 'mortgage', 'tax',
  'lawyer', 'legal', 'lawsuit', 'sue ', 'contract', 'insurance', 'savings account',
];

const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE_RE = /(?:\+?\d[\s\-().]?){7,}/;

// Returns one of: ok, harm, personal, health, money, offtopic
export function checkMessage(text) {
  const t = String(text || '').toLowerCase().trim();
  if (!t) return 'empty';
  if (HARM_WORDS.some((w) => t.includes(w))) return 'harm';
  if (EMAIL_RE.test(t) || PHONE_RE.test(t)) return 'personal';
  if (HEALTH_WORDS.some((w) => t.includes(w))) return 'health';
  if (MONEY_WORDS.some((w) => t.includes(w))) return 'money';
  return 'ok';
}

export function guardrailReply(kind) {
  switch (kind) {
    case 'harm':
      return "I'm really sorry you are going through this. I can't help with that here, but you deserve support. If you are in danger or thinking about hurting yourself, call 911 now or talk to someone you trust. This chat will stop now.";
    case 'personal':
      return `Please don't share personal information such as emails or phone numbers. I did not save that message. ${TOPIC_HINT}`;
    case 'health':
      return `I can't give health advice. Please ask a doctor or a local health service. ${TOPIC_HINT}`;
    case 'money':
      return `I can't give money, legal or investment advice. Please ask a qualified professional. ${TOPIC_HINT}`;
    default:
      return `That is outside what I can help with. ${TOPIC_HINT}`;
  }
}

// Maps typed words to a topic at question 1 (optional shortcut).
export function topicFromText(text) {
  const t = String(text || '').toLowerCase();
  if (/(water|bottle|agua)/.test(t)) return 'water';
  if (/(cloth|shirt|ropa|fashion|thrift)/.test(t)) return 'clothing';
  if (/(metro|bus|uber|didi|ride|transport|getting around|commute)/.test(t)) return 'transport';
  return null;
}

// ---------- Recommendation ----------

const PAIRS = {
  water: [1, 2],
  clothing: [3, 4],
  transport: [5, 6],
};

export function getPair(category, items = FALLBACK_ITEMS) {
  const ids = PAIRS[category];
  if (!ids) return null;
  const low = items.find((i) => i.id === ids[0]);
  const high = items.find((i) => i.id === ids[1]);
  return low && high ? { low, high } : null;
}

const FREQ_TEXT = {
  daily: 'You make this choice every day, so the difference adds up fast.',
  weekly: 'You make this choice a few times a week, so the difference adds up steadily.',
  rarely: 'You make this choice only rarely, so the difference stays small.',
};

export function recommend({ category, priority, frequency }, items = FALLBACK_ITEMS) {
  const pair = getPair(category, items);
  if (!pair) return null;
  const { low, high } = pair;
  let pick = low;
  let reason = '';
  let tip = '';

  if (priority === 'impact') {
    pick = low;
    reason = `${low.name} has low impact, while ${high.name} has high impact.`;
  } else if (priority === 'effort') {
    pick = high;
    reason = `${high.name} is the easiest option (convenience: ${high.convenience_level}).`;
    tip = `Greener tip: ${low.name} (${low.price_level}) has low impact if you can spare a little extra effort.`;
  } else {
    // price
    if (category === 'water' && frequency === 'rarely') {
      pick = high;
      reason = `${high.name} is cheaper upfront (${high.price_level}) when you only buy water rarely.`;
      tip = `Good to know: the reusable bottle ($250 MXN) pays for itself after about 9 to 13 bottles of bottled water.`;
    } else {
      pick = low;
      reason = `${low.name} costs ${low.price_level}, compared with ${high.price_level} for ${high.name}.`;
      if (category === 'water') {
        tip = 'Good to know: the reusable bottle ($250 MXN) pays for itself after about 9 to 13 bottles of bottled water.';
      }
    }
  }

  return {
    title: pick.name,
    reason,
    frequencyNote: FREQ_TEXT[frequency] || '',
    tip,
    options: [low, high],
    pickId: pick.id,
  };
}

export function summaryLine(answers) {
  return `Topic: ${labelFor(TOPICS, answers.category)} · Priority: ${labelFor(PRIORITIES, answers.priority)} · How often: ${labelFor(FREQUENCIES, answers.frequency)}`;
}
