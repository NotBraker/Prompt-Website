/* ============================================================
   THE PROMPT GENERATION — Prompt Data
   Central data source for all pages
   ============================================================ */

'use strict';

window.PROMPTS_DATA = [
  {
    id: 1,
    category: 'coding',
    categoryEmoji: '💻',
    title: 'Senior Code Reviewer',
    preview: 'Act as a senior software engineer. Review this code for bugs, security issues, performance, and best practices with actionable feedback...',
    prompt: `Act as a senior software engineer with 10+ years of experience. Review the following code for:

1. **Bugs & Logic Errors** — Any mistakes that could cause unexpected behavior
2. **Security Vulnerabilities** — SQL injection, XSS, exposed secrets, etc.
3. **Performance Issues** — Inefficiencies, unnecessary loops, memory leaks
4. **Best Practices** — Naming conventions, code structure, SOLID principles
5. **Readability** — Clarity, comments, documentation gaps

For each issue found:
- Quote the problematic code
- Explain WHY it's an issue
- Provide a corrected version with explanation

End with:
- Overall code quality score (1–10)
- Top 3 priorities to fix immediately
- Positive aspects worth keeping

Code to review:
[PASTE YOUR CODE HERE]

Language/Framework: [e.g., Python/Django]`,
    tags: ['code review', 'debugging', 'security', 'best practices'],
    likes: 2847,
    copies: 12430,
    rating: 4.9,
    aiTool: 'ChatGPT, Claude',
    featured: true,
  },
  {
    id: 2,
    category: 'writing',
    categoryEmoji: '✍️',
    title: 'Professional Email Composer',
    preview: 'Craft a professional, concise email that achieves your goal while maintaining the perfect tone for any business situation...',
    prompt: `Craft a professional email with the following details:

**Purpose:** [WHAT DO YOU NEED TO ACCOMPLISH?]
**Recipient:** [WHO — their role and relationship to you]
**Tone:** [Formal / Friendly / Assertive / Empathetic]
**Context:** [BACKGROUND INFORMATION]
**Main Request:** [SPECIFIC ASK OR ACTION NEEDED]
**Deadline:** [IF APPLICABLE]
**Desired Outcome:** [WHAT SHOULD HAPPEN AFTER THEY READ IT?]

Requirements:
- Compelling subject line (under 60 characters)
- Opening that establishes context immediately
- Clear, scannable body (use bullets if listing multiple items)
- Single, clear call-to-action
- Professional closing
- Maximum [LENGTH: e.g., 150] words

Also provide 2 alternative subject line options.`,
    tags: ['email', 'business writing', 'professional', 'communication'],
    likes: 1923,
    copies: 8765,
    rating: 4.7,
    aiTool: 'ChatGPT, Claude, Gemini',
    featured: false,
  },
  {
    id: 3,
    category: 'creative',
    categoryEmoji: '🎨',
    title: 'Immersive World Builder',
    preview: 'Create a richly detailed world for your story with history, geography, political systems, magic, and all the details that make fiction feel real...',
    prompt: `Create a richly detailed world for a [GENRE: fantasy/sci-fi/post-apocalyptic/historical] story.

**Geography & Environment**
- Major regions and their characteristics
- Climate zones and how they shape culture
- 3 iconic landmarks with backstory

**History**
- 3 pivotal events that shaped the world (include dates/eras)
- The "great wound" — a historical tragedy still felt today
- Lost golden age (what was lost and why)

**Power & Politics**
- Current power structures and governments
- 2–3 factions in conflict (their goals, methods, legitimacy)
- Who really controls things vs. who appears to

**Peoples & Cultures**
- 2–3 distinct civilizations (customs, values, taboos, aesthetics)
- Social hierarchies and how they function
- What everyday life looks like for common people

**Magic / Technology System**
- How it works and its fundamental rules
- What it CANNOT do (limitations are crucial)
- How it affects society, economics, and warfare

**Current Conflict**
- The central tension (what could spark a war?)
- What most people don't know about the real threat

**5 Unexpected Details** that make this world feel alive and original

Desired atmosphere: [DESCRIBE TONE — e.g., "grim realism with glimmers of hope"]`,
    tags: ['worldbuilding', 'fantasy', 'sci-fi', 'storytelling', 'fiction'],
    likes: 3421,
    copies: 9823,
    rating: 4.8,
    aiTool: 'Claude, ChatGPT',
    featured: true,
  },
  {
    id: 4,
    category: 'business',
    categoryEmoji: '📈',
    title: 'Strategic Business Analyst',
    preview: 'Comprehensive SWOT + Porter\'s Five Forces analysis with prioritized strategic recommendations for any business or idea...',
    prompt: `Perform a comprehensive strategic analysis of [COMPANY/BUSINESS IDEA].

**SWOT Analysis**
Strengths (internal positives):
Weaknesses (internal negatives):
Opportunities (external positives):
Threats (external negatives):

Weight each item by importance (High / Medium / Low).

**Porter's Five Forces**
1. Competitive Rivalry — intensity and key competitors
2. Supplier Power — leverage and dependency
3. Buyer Power — price sensitivity and alternatives
4. Threat of Substitution — alternatives available to customers
5. Threat of New Entry — barriers and how easily disrupted

**Strategic Recommendations**
Provide 5 specific, actionable recommendations ranked by:
- Expected impact (High/Medium/Low)
- Implementation difficulty (Easy/Medium/Hard)
- Time to see results (Quick win / 6 months / Long-term)

**Quick Wins** — 3 things to do in the next 30 days.

Context:
- Industry: [INDUSTRY]
- Target Market: [WHO THEY SERVE]
- Stage: [Idea/Startup/Growth/Mature]
- Biggest current challenge: [DESCRIBE]`,
    tags: ['SWOT', 'strategy', 'Porter', 'business analysis', 'consulting'],
    likes: 1456,
    copies: 6234,
    rating: 4.6,
    aiTool: 'ChatGPT, Claude',
    featured: false,
  },
  {
    id: 5,
    category: 'marketing',
    categoryEmoji: '📣',
    title: 'Viral Content Hook Generator',
    preview: 'Generate 20 scroll-stopping content hooks across 4 proven categories to maximize engagement on any platform...',
    prompt: `Generate 20 high-converting content hooks for [TOPIC/PRODUCT/SERVICE] targeting [AUDIENCE DESCRIPTION].

Create 5 hooks in each category:

**🕳️ Curiosity Gaps** — Make them desperately want to know more
**⚡ Bold Statements** — Counterintuitive, controversial, or shocking claims
**😤 Problem Agitation** — Name their pain, twist the knife gently
**🏆 Social Proof** — Authority, results, and transformation stories

Format each hook as:
- Hook text (1–2 lines max)
- Why it works (1 sentence)
- Engagement potential score (1–10)

Then provide:
- Top 3 hooks with suggested image/video concept
- A/B testing recommendation (which 2 to test first and why)

Details:
- Platform: [TikTok / Instagram Reels / YouTube Shorts / LinkedIn / Twitter]
- Tone: [Professional / Casual / Humorous / Inspirational / Urgent]
- Goal: [Awareness / Follower Growth / Leads / Sales]
- Current pain point of your audience: [DESCRIBE]`,
    tags: ['content', 'hooks', 'social media', 'viral', 'copywriting'],
    likes: 4102,
    copies: 18743,
    rating: 4.9,
    aiTool: 'ChatGPT, Claude, Gemini',
    featured: true,
  },
  {
    id: 6,
    category: 'education',
    categoryEmoji: '🎓',
    title: 'Feynman Technique Teacher',
    preview: 'Understand anything deeply with 5-level progressive explanations — from ELI5 to expert level — using the Feynman method...',
    prompt: `Explain [COMPLEX TOPIC] using the Feynman Technique with 5 levels of increasing depth:

**Level 1 — Eli5 (Child, age 5)**
Simple analogy, zero jargon. Could explain at a dinner table.

**Level 2 — Student (High School)**
Introduce key vocabulary. Use concrete examples from everyday life.

**Level 3 — Undergraduate**
Foundational concepts, mechanisms, and how parts relate.

**Level 4 — Graduate**
Nuances, edge cases, current academic debates, limitations.

**Level 5 — Expert**
Cutting-edge research, open questions, where the field is heading.

At EACH level include:
- 1 powerful analogy or example
- 1 common misconception to clear up
- 1 memory hook to remember the key insight

End with:
- A concept map showing how key ideas connect
- 5 thought-provoking questions to test deep understanding
- 3 recommended next steps to go deeper

Topic: [WHAT DO YOU WANT TO UNDERSTAND?]
Starting level: [BEGINNER / INTERMEDIATE / ADVANCED]`,
    tags: ['learning', 'feynman', 'education', 'explanation', 'teaching'],
    likes: 2234,
    copies: 7891,
    rating: 4.8,
    aiTool: 'Claude, ChatGPT',
    featured: false,
  },
  {
    id: 7,
    category: 'coding',
    categoryEmoji: '💻',
    title: 'API Integration Architect',
    preview: 'Design a production-ready API integration with authentication, error handling, retry logic, and full code examples...',
    prompt: `Design a production-ready API integration between [SERVICE A] and [SERVICE B].

**Architecture Overview**
- Integration pattern (webhook / polling / event-driven / GraphQL)
- Data flow description (step-by-step)
- Authentication strategy with security rationale

**Implementation Plan**
1. Auth setup (OAuth / API keys / JWT)
2. Core endpoints needed from each service
3. Data mapping and transformation layer
4. Error handling strategy (what errors, how to handle each)
5. Retry logic with exponential backoff
6. Rate limiting and throttling approach
7. Logging, monitoring, and alerting setup

**Code Examples** in [LANGUAGE/FRAMEWORK]:
\`\`\`
// Authentication setup
// Main integration function
// Error handler with retry
// Webhook receiver (if applicable)
\`\`\`

**Testing Strategy**
- Unit tests for core functions (provide examples)
- Integration test scenarios
- Edge cases and failure modes to test

**Production Checklist**
- Security considerations
- Performance optimization tips
- Deployment notes

Services to integrate: [SERVICE A] + [SERVICE B]
Language/Framework: [e.g., Node.js/Express]
Expected volume: [e.g., 1000 calls/day]`,
    tags: ['API', 'integration', 'backend', 'architecture', 'webhooks'],
    likes: 1876,
    copies: 5432,
    rating: 4.7,
    aiTool: 'Claude, ChatGPT',
    featured: false,
  },
  {
    id: 8,
    category: 'art',
    categoryEmoji: '🖼️',
    title: 'Midjourney Prompt Maestro',
    preview: 'Transform your creative vision into 5 highly detailed Midjourney prompts across different styles with perfect technical parameters...',
    prompt: `Create 5 detailed Midjourney prompts for: [DESCRIBE YOUR CONCEPT/VISION]

For EACH prompt include all elements:
- **Subject** — Detailed description of main subject with specifics
- **Environment** — Setting, background, atmosphere
- **Lighting** — Type, direction, quality (golden hour / rim light / etc.)
- **Mood** — Emotional tone and feeling
- **Style** — Art movement, artist reference, aesthetic direction
- **Camera** — Lens type, angle, composition (if photorealistic)
- **Color Palette** — Dominant colors and harmony
- **Technical params** — --ar X:X --v 6.1 --q 2 --stylize XXX

Create variations across these 5 styles:
1. 📷 Cinematic photorealistic
2. 🎨 Digital concept art
3. 🖌️ Oil painting / classical style
4. ✏️ Minimalist / graphic art
5. 🌌 Surreal / fantastical

Also provide:
- 5 powerful negative prompts (--no parameters) to avoid common issues
- 2 alternative color palette suggestions
- Tip for achieving consistency across a series

Concept: [YOUR DETAILED VISION]
Mood: [e.g., ethereal and melancholic, epic and triumphant]`,
    tags: ['Midjourney', 'AI art', 'image generation', 'prompts', 'creative'],
    likes: 5234,
    copies: 23891,
    rating: 5.0,
    aiTool: 'ChatGPT, Claude',
    featured: true,
  },
  {
    id: 9,
    category: 'writing',
    categoryEmoji: '✍️',
    title: 'Deep Character Creator',
    preview: 'Build psychologically complex, multi-dimensional characters with rich backstory, contradictions, fatal flaws, and a full character arc...',
    prompt: `Create a deeply complex, memorable character for [GENRE] fiction.

**Identity & Appearance**
- Name, age, distinctive appearance (include a unique physical tell)
- Mannerisms and habits others notice first

**Psychological Core**
- Core desire (what they truly want at their deepest level)
- Core fear (what they are terrified of becoming or losing)
- Fatal flaw (the thing that will destroy them if unchecked)
- Greatest contradiction (where they surprise even themselves)
- Defense mechanism (how they avoid confronting their flaw)

**Voice & Presence**
- Speech patterns and verbal tics
- How they act differently with: strangers / friends / enemies / alone
- What they notice first in a room (reveals character)
- Their dark sense of humor (if any)

**Backstory**
- 3 formative events that shaped them (with emotional weight)
- The wound they haven't admitted to themselves
- What they believe about the world that isn't quite true

**Character Arc**
- Emotional starting point
- The catalyst that forces them to change
- The moment of darkest choice
- Who they become (or fail to become)

**Relationships**
- 3 key relationships (how they love, fight, trust)
- 1 secret they will take to the grave
- Their relationship with the main conflict/antagonist

Inspiration: [DESCRIBE your ideal tone, e.g., "morally gray, darkly witty antihero"]`,
    tags: ['character', 'fiction', 'creative writing', 'character arc', 'psychology'],
    likes: 2891,
    copies: 10234,
    rating: 4.8,
    aiTool: 'Claude, ChatGPT',
    featured: false,
  },
  {
    id: 10,
    category: 'general',
    categoryEmoji: '✨',
    title: 'Decision Framework Builder',
    preview: 'Build a comprehensive decision-making framework using multiple mental models to navigate any important decision with clarity...',
    prompt: `Help me make a clear-headed decision about [DECISION TO MAKE].

**The Decision**
Options I'm considering:
1. [OPTION A]
2. [OPTION B]
3. [OPTION C — or "status quo"]

Constraints: [TIME / BUDGET / RESOURCES / OTHER]
Key stakeholders affected: [WHO AND HOW]

**Analysis for Each Option:**
1. Pros & cons (weight each by importance 1–5)
2. Short-term impact (0–3 months)
3. Long-term impact (1–5 years)
4. Risk assessment (likelihood × impact)
5. Reversibility score (1 = permanent, 10 = easily undone)
6. Alignment with my values and goals

**Apply These Mental Models:**
🕰️ **10/10/10 Rule** — How will I feel in 10 minutes / 10 months / 10 years?
💀 **Pre-mortem** — Imagine each option failed 1 year from now. What went wrong?
😔 **Regret Minimization** — What will 80-year-old me regret NOT doing?
🎲 **Expected Value** — If I could do this 100 times, which performs best?

**Final Recommendation**
Based on this analysis, which option do you recommend and why?
What information, if discovered, would change your recommendation?

My values/priorities: [WHAT MATTERS MOST TO YOU]`,
    tags: ['decision making', 'mental models', 'strategy', 'productivity', 'clarity'],
    likes: 1654,
    copies: 7234,
    rating: 4.6,
    aiTool: 'ChatGPT, Claude, Gemini',
    featured: false,
  },
  {
    id: 11,
    category: 'marketing',
    categoryEmoji: '📣',
    title: 'Complete Brand Identity',
    preview: 'Build a comprehensive brand identity system — from positioning and values to voice, messaging, and visual direction...',
    prompt: `Develop a complete brand identity system for [COMPANY/PRODUCT NAME].

**Brand Foundation**
- Mission statement (1 powerful sentence)
- Vision statement (where we're going in 10 years)
- Core values (5 values — each with a 2-sentence description)
- Brand positioning statement (fill-in-the-blank format)
- Unique Value Proposition (single sentence)

**Target Audiences**
Primary Persona:
- Name, age, occupation, income
- Goals and motivations
- Biggest frustrations and fears
- Where they spend time online
- What they tell friends about our brand

Secondary Persona: [repeat structure]

**Brand Personality**
- Archetype (Hero / Creator / Sage / Explorer / etc.) with explanation
- 5 personality adjectives
- "We are X but not Y" statements (3 examples)
- Celebrity or brand that captures the essence

**Voice & Tone Guide**
- Writing style (formal/conversational/witty/authoritative)
- We say: [5 phrases] / We never say: [5 phrases]
- Tone variations: social media vs. formal docs vs. support

**Messaging Framework**
- 5 tagline options (with emotional hook explanation)
- 30-second elevator pitch
- 3 core messages with proof points for each

**Visual Direction**
- Color palette (4–5 colors with hex codes and rationale)
- Typography direction (heading + body font suggestions)
- Imagery style guide (3 rules for photo/graphic selection)
- Logo concept directions (3 different approaches)

Industry: [INDUSTRY]
Key differentiator: [WHAT MAKES YOU UNIQUE]
Brand enemy: [WHAT FEELING OR PROBLEM YOU FIGHT AGAINST]`,
    tags: ['branding', 'identity', 'marketing', 'positioning', 'strategy'],
    likes: 2103,
    copies: 8901,
    rating: 4.7,
    aiTool: 'Claude, ChatGPT',
    featured: false,
  },
  {
    id: 12,
    category: 'education',
    categoryEmoji: '🎓',
    title: 'Socratic Study Partner',
    preview: 'Engage in a guided Socratic dialogue to deeply understand any topic through probing questions rather than passive answers...',
    prompt: `Act as a Socratic study partner to help me develop genuine mastery of [TOPIC/SUBJECT].

**Ground Rules:**
- Ask probing questions rather than giving direct answers
- Challenge my assumptions when they seem shaky
- Help me discover knowledge gaps through questioning, not lecturing
- Celebrate precise, well-reasoned answers
- Gently redirect when my reasoning has gaps
- Use the "5 Whys" to help me trace ideas to their roots

**Session Structure:**
1. Opening assessment — 3 questions to map my current knowledge
2. Identify the 5 core concepts we need to master
3. Deep dive each concept through Socratic dialogue
4. Challenge me to apply concepts to novel situations
5. Synthesis question connecting everything we covered
6. Close with my explanation back to you (teach-back method)

**At the End:**
- Learning summary of what I demonstrated I understand
- Knowledge gaps to address next session
- 3 recommended questions to research independently
- Confidence score on the topic (1–10)

Topic: [WHAT DO YOU WANT TO MASTER?]
My current level: [COMPLETE BEGINNER / SOME KNOWLEDGE / INTERMEDIATE]
Specific confusion: [WHAT PUZZLES YOU MOST — or "don't know what I don't know"]
Time available: [X MINUTES]

Start with your opening assessment now.`,
    tags: ['socratic', 'learning', 'study', 'critical thinking', 'mastery'],
    likes: 1432,
    copies: 5678,
    rating: 4.5,
    aiTool: 'Claude, ChatGPT',
    featured: false,
  },
];

