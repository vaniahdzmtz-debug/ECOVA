// Content for /docs: prompt library and build logs. Real prompts and real commit messages only.

export const PROMPTS = [
  {
    title: 'Macro-prompt pattern (every week)',
    when: 'Start of every week, before any code. Forces the plan before the code.',
    text: `ROLE: You are my disciplined AI-native product architect and coding partner.
COURSE RULE: Do not let me code before the plan is clear.
TASK: Help me complete this Build Discipline Packet, then create a precise implementation prompt for Codex or Claude Code.
CONSTRAINTS:
- Free tools only.
- Next.js/React + Tailwind + Vercel + GitHub + Supabase when data is needed.
- Build small, testable features.
- No paid APIs required. If AI output is simulated, label it clearly.
- Require acceptance criteria before coding.
OUTPUT FORMAT: problem, user, product spec, UX mockup prompt, architecture sketch, tech stack, DevOps plan, test plan, coding prompt, scope cuts.`,
  },
  {
    title: 'UX image prompt',
    when: 'To make a mockup before building a page.',
    text: `Create a clean, modern UX mockup for a student-built web app page. The page should be practical, buildable in Next.js and Tailwind, and include clear sections for user input, output, saved results, and testing evidence. Use a simple startup-product aesthetic. Avoid complex animations or expensive features.`,
  },
  {
    title: 'Week 5 coding prompt (chat), short version',
    when: 'To build the rule-based Ecova guide at /chat.',
    text: `ROLE: You are a senior front-end engineer. Build ONE new page for an existing Next.js app called Ecova. Implement only the scope below.
GOAL: A page /chat: a rule-based "Ecova guide" that helps a young person in Mexico choose between two everyday options, using ONLY the catalog data. It is NOT AI. Every answer says "Rule-based answer, not AI".
FLOW: intro, 3 questions, checkpoint 1 (Confirm or Edit), result, thumbs and optional comment.
GUARDRAILS: refuse off-topic, health, money and legal questions; harm words stop the chat and say to call 911; never save emails or phone numbers; off-topic questions can be saved for review only if the user says yes (checkpoint 2).
SUPABASE: tables chat_sessions and chat_feedback with select and insert only. If saving fails, the chat still works.
DO NOT: use AI APIs, add accounts or collect personal data.`,
  },
  {
    title: 'Week 6 coding prompt (final), short version',
    when: 'To integrate the site: /demo, /dashboard, /docs and Best balance.',
    text: `ROLE: You are a senior front-end engineer. Add the final pages to an existing Next.js app called Ecova. Implement only the agreed scope.
BUILD: /demo (7-step guided walkthrough plus tabs: Agent map, Impact check, Version 2), /dashboard (counts from Supabase tables, never free text, plus a testing summary), /docs (prompt library and build logs), and a fourth chat priority "Best balance" that scores Price, Impact and Effort from 0 to 2 and breaks ties toward the greener option.
RULES: free tools only, no new tables, no AI APIs, pages must work if Supabase is not connected, and label rule-based output clearly.
DONE WHEN: every old page still loads, nav links work, and npm run build passes.`,
  },
];

export const BUILD_LOGS = [
  {
    week: 'Week 3: Product and pricing',
    commits: [],
    note: 'Bug fixed: an "Invalid API key" error on the live site, caused by a wrong environment variable. The fix was to use the anon key from the same Supabase project.',
  },
  {
    week: 'Week 4: Marketing engine',
    commits: [
      'add marketing content file and new color tokens',
      'upgrade homepage with new hero and real comparisons',
      'add marketing page with brand, persona, posts and calendar',
      'add copy and export buttons',
      'add saving assets and A/B votes with Supabase',
      'limit A/B tests to one vote per browser',
      'use winning hook from A/B test 2 in post 3',
      'update README and ROADMAP with Week 4 pages',
      'update iteration log with Week 3 and Week 4 bugs',
    ],
    note: 'Bug fixed: one person could vote many times by clicking fast. Now each browser can vote once per test.',
  },
  {
    week: 'Week 5: Ecova guide (chat)',
    commits: [
      'add chat logic file',
      'add chat page with intake flow and checkpoint',
      'fix chat crash on checkpoint step',
      'add guardrail responses',
      'add saving chats and feedback',
      'clarify first question buttons with examples after tester feedback',
      'update README and roadmap with Week 5 chat results',
      'update iteration log with Week 5 bug and improvement',
    ],
    note: 'Bug fixed: the page crashed at the "Is this right?" step because of a missing import. Improvement: examples under each first-question button after a tester found them confusing.',
  },
  {
    week: 'Week 6: Final integration',
    commits: [
      'add best balance option to the chat',
      'add demo page with walkthrough, agent map, impact check and roadmap',
      'move demo page into the app folder',
      'add dashboard page with real records and testing summary',
      'add docs page with prompt library and build logs',
      'improve demo with tutorial, best-if lines and how Ecova decides after tester feedback',
      'finish testing summary, update build logs, README and roadmap for Week 6',
    ],
    note: 'Built the tester suggestion "more options" as Best balance. Improvement after 5 external testers: a short tutorial, "Best if..." lines and a "How Ecova decides" tab on /demo. Bug fixed: the demo page was placed outside the app folder and showed a 404 until it was moved.',
  },
];
