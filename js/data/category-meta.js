/* ============================================================
   THE PROMPT GENERATION — Category Metadata
   Emoji, color, accent mappings for all 15+legacy categories
   ============================================================ */

'use strict';

window.CATEGORY_META = {
  'cat-01': {
    emoji: '💻', color: '#10B981', rgb: '16,185,129',  num: '01', short: 'Coding',
    desc: 'From debugging to system design — prompts for every stage of the software development lifecycle.',
  },
  'cat-02': {
    emoji: '📈', color: '#3B82F6', rgb: '59,130,246',  num: '02', short: 'Business',
    desc: 'Validate ideas, craft business plans, and build strategies to launch and scale your venture.',
  },
  'cat-03': {
    emoji: '📣', color: '#8B5CF6', rgb: '139,92,246',  num: '03', short: 'Marketing',
    desc: 'Create viral content, growth strategies, and campaigns that convert audiences into customers.',
  },
  'cat-04': {
    emoji: '✍️', color: '#F59E0B', rgb: '245,158,11',  num: '04', short: 'Content',
    desc: 'Write articles, scripts, newsletters, and social posts that engage and inform any audience.',
  },
  'cat-05': {
    emoji: '🤖', color: '#06B6D4', rgb: '6,182,212',   num: '05', short: 'AI & Auto',
    desc: 'Design AI agents, build automation workflows, and leverage LLMs for maximum productivity.',
  },
  'cat-06': {
    emoji: '🏆', color: '#EF4444', rgb: '239,68,68',   num: '06', short: 'Sports',
    desc: 'Training programs, nutrition plans, and performance strategies for athletes at every level.',
  },
  'cat-07': {
    emoji: '✈️', color: '#EC4899', rgb: '236,72,153',  num: '07', short: 'Travel',
    desc: 'Plan unforgettable trips, build a location-independent life, and design your ideal lifestyle.',
  },
  'cat-08': {
    emoji: '⚖️', color: '#94A3B8', rgb: '148,163,184', num: '08', short: 'Legal',
    desc: 'Analyse contracts, protect your IP, and navigate compliance frameworks with confidence.',
  },
  'cat-09': {
    emoji: '🏭', color: '#F97316', rgb: '249,115,22',  num: '09', short: 'Manufacturing',
    desc: 'Optimise operations, de-risk your supply chain, and apply Lean principles at scale.',
  },
  'cat-10': {
    emoji: '🎨', color: '#A855F7', rgb: '168,85,247',  num: '10', short: 'Art & Design',
    desc: 'Build brand identities, critique interfaces, and craft visual systems that captivate.',
  },
  'cat-11': {
    emoji: '💚', color: '#22C55E', rgb: '34,197,94',   num: '11', short: 'Health',
    desc: 'Science-backed protocols for sleep, nutrition, longevity, and peak mental performance.',
  },
  'cat-12': {
    emoji: '💰', color: '#EAB308', rgb: '234,179,8',   num: '12', short: 'Wealth',
    desc: 'Build diversified portfolios, create passive income streams, and architect lasting wealth.',
  },
  'cat-13': {
    emoji: '🧠', color: '#6366F1', rgb: '99,102,241',  num: '13', short: 'Psychology',
    desc: 'Decode cognitive biases, build lasting habits, and understand what drives human decisions.',
  },
  'cat-14': {
    emoji: '🏠', color: '#14B8A6', rgb: '20,184,166',  num: '14', short: 'Real Estate',
    desc: 'Analyse deals, optimise rental income, and build a scalable real estate portfolio.',
  },
  'cat-15': {
    emoji: '⚡', color: '#FBBF24', rgb: '251,191,36',  num: '15', short: 'Energy',
    desc: 'Plan solar projects, conduct energy audits, and navigate the clean-energy transition.',
  },
  /* Categories 16-19 — merged from legacy */
  'legacy-writing': {
    emoji: '📝', color: '#F59E0B', rgb: '245,158,11',  num: '16', short: 'Writing',
    desc: 'Craft professional emails, persuasive essays, and compelling narratives for any audience.',
  },
  'legacy-creative': {
    emoji: '🎭', color: '#EC4899', rgb: '236,72,153',  num: '17', short: 'Creative',
    desc: 'Build fictional worlds, develop complex characters, and master the craft of storytelling.',
  },
  'legacy-education': {
    emoji: '🎓', color: '#06B6D4', rgb: '6,182,212',   num: '18', short: 'Education',
    desc: 'Learn anything faster with the Feynman technique, spaced repetition, and custom study plans.',
  },
  'legacy-general': {
    emoji: '💡', color: '#8B5CF6', rgb: '139,92,246',  num: '19', short: 'Productivity',
    desc: 'Design productivity systems, make better decisions, and build habits that compound over time.',
  },
};

/* Titles derived from TEMPLATE_GOALS (index 0-9) */
window.PROMPT_GOAL_TITLES = [
  'Complete Strategy',
  'Step-by-Step Workflow',
  'Process Audit & Improvement',
  'Beginner-to-Advanced Learning Path',
  'KPI Framework Design',
  'Risk Assessment & Mitigation',
  'Checklist & SOP Builder',
  'Stakeholder-Ready Summary',
  'Implementation Roadmap',
  'Troubleshooting & Optimization Guide',
];

/* Titles derived from TEMPLATE_OUTPUTS (index 0-4) */
window.PROMPT_OUTPUT_TITLES = [
  'Executive Brief',
  'Standard Operating Procedure',
  'Priority Table',
  '30-60-90 Day Plan',
  'Editable Template',
];

/**
 * Derive a readable title for a prompt template at index i (0–49).
 * goalIdx = floor(i / 5), outIdx = i % 5
 */
window.derivePromptTitle = function(i) {
  const goalIdx = Math.floor(i / 5);
  const outIdx  = i % 5;
  return `${window.PROMPT_GOAL_TITLES[goalIdx]} → ${window.PROMPT_OUTPUT_TITLES[outIdx]}`;
};

/**
 * Locally regenerate the 50 template strings for a given
 * category name + subcategory name. Mirrors marketplace-framework.js logic
 * so we never have to materialise the full 18,750-prompt dataset at once.
 */
window.generateFiftyTemplates = function(categoryName, subcategoryName) {
  const GOALS = [
    'Plan a complete strategy for {SUB}',
    'Generate a step-by-step execution workflow for {SUB}',
    'Audit and improve an existing process in {SUB}',
    'Create a beginner-to-advanced learning path for {SUB}',
    'Design a measurable KPI framework for {SUB}',
    'Build a risk assessment and mitigation plan for {SUB}',
    'Produce a checklist and SOP for {SUB}',
    'Draft a stakeholder-ready summary for {SUB}',
    'Create an implementation roadmap with milestones for {SUB}',
    'Develop a troubleshooting and optimization guide for {SUB}',
  ];
  const OUTPUTS = [
    'Output as a concise executive brief',
    'Output as a detailed standard operating procedure',
    'Output as a table with priorities, impact, and effort',
    'Output as a phased 30-60-90 day plan',
    'Output as a practical template with placeholders',
  ];
  const CONSTRAINTS = [
    'Assume budget: [BUDGET]',
    'Assume timeline: [TIMELINE]',
    'Assume team size: [TEAM_SIZE]',
    'Assume tools: [TOOLS]',
    'Assume risk tolerance: [RISK_TOLERANCE]',
  ];

  const templates = [];
  for (let g = 0; g < GOALS.length; g++) {
    for (let o = 0; o < OUTPUTS.length; o++) {
      const constraint = CONSTRAINTS[(g + o) % CONSTRAINTS.length];
      templates.push([
        `You are an elite specialist in ${categoryName}.`,
        GOALS[g].replace('{SUB}', subcategoryName) + '.',
        OUTPUTS[o] + '.',
        constraint + '.',
        'Include: assumptions, dependencies, common pitfalls, and next actions.',
        'Use placeholders in [BRACKETS] for all user-specific inputs.',
      ].join(' '));
    }
  }
  return templates; // exactly 50
};

