/* ============================================================
   THE PROMPT GENERATION — Featured Prompts
   2 hand-picked, copy-ready prompts per category (19 cats = 38 total).
   Each is a complete, production-quality prompt with [BRACKETS]
   for user inputs.
   ============================================================ */

'use strict';

window.FEATURED_PROMPTS = [

  /* ── 01  Coding & Development ──────────────────────────── */
  {
    id: 'fp-01a', catId: 'cat-01', featured: true,
    title: 'Senior Code Reviewer',
    preview: 'Act as a senior engineer with 15 years of experience. Perform a line-by-line code review covering bugs, security, performance, and SOLID principles...',
    prompt: `Act as a senior software engineer with 15+ years of experience across [TECH STACK]. Perform a comprehensive code review of the code below.

[PASTE YOUR CODE HERE]

Evaluate and provide detailed, actionable feedback on:

1. **Bugs & Edge Cases** — logical errors, off-by-one issues, unhandled exceptions, null-pointer risks
2. **Security Vulnerabilities** — injection attacks, authentication flaws, exposed secrets, insecure dependencies
3. **Performance** — time/space complexity, unnecessary re-renders, N+1 query problems, memory leaks
4. **Readability & Maintainability** — naming conventions, function length, code duplication, inline comments
5. **Architecture & SOLID Principles** — single responsibility, dependency inversion, suggest design pattern improvements

Format each issue as:
• **Line:** [line number or range]
• **Severity:** Critical / High / Medium / Low
• **Problem:** [clear description]
• **Fix:** [corrected code snippet]

End with an overall quality score out of 10 and a summary of the top 3 priorities.`,
    tags: ['code review', 'debugging', 'security', 'best practices'],
    rating: 4.9, copies: 24300, likes: 3100, aiTool: 'ChatGPT, Claude',
  },
  {
    id: 'fp-01b', catId: 'cat-01', featured: false,
    title: 'System Architecture Designer',
    preview: 'You are a solutions architect. Design a complete, scalable system architecture for my project including tech stack, database schema, API design, and deployment strategy...',
    prompt: `You are a principal solutions architect at a top-tier tech company. Design a complete, production-ready system architecture for the following project:

**Project:** [DESCRIBE YOUR APP OR SYSTEM]
**Scale Target:** [EXPECTED USERS / REQUESTS PER SECOND]
**Budget Constraint:** [STARTUP / MID-MARKET / ENTERPRISE]
**Team Size:** [NUMBER OF ENGINEERS]

Deliver a full technical specification covering:

1. **Tech Stack** — frontend, backend, database, caching, message queue. Justify each choice.
2. **Database Schema** — key entities, relationships, indexing strategy, normalization decisions.
3. **API Design** — REST vs GraphQL vs gRPC recommendation, endpoint structure, auth approach (JWT / OAuth2 / API keys).
4. **Infrastructure & Deployment** — cloud provider recommendation, containerisation (Docker/K8s), CI/CD pipeline, environment strategy (dev / staging / prod).
5. **Scalability & Resilience** — horizontal scaling plan, CDN usage, rate limiting, circuit breakers, backup & disaster recovery.
6. **Security Architecture** — secrets management, network isolation, WAF, dependency scanning.
7. **Estimated Cost** — rough monthly cloud cost at target scale.

Format as a structured technical design document a senior engineer could hand to a team and start building from.`,
    tags: ['architecture', 'system design', 'scalability', 'devops'],
    rating: 4.8, copies: 18900, likes: 2400, aiTool: 'Claude, ChatGPT',
  },

  /* ── 02  Business & Entrepreneurship ───────────────────── */
  {
    id: 'fp-02a', catId: 'cat-02', featured: true,
    title: 'Startup Idea Validator',
    preview: 'Act as a seasoned VC who has evaluated 1,000+ startups. Validate my business idea with brutal honesty — market size, competition, moat, risks, and a final verdict...',
    prompt: `Act as a seasoned venture capitalist who has evaluated over 1,000 startups across [INDUSTRY / SECTOR]. Apply the same rigorous framework you use in deal screening.

**My Idea:** [DESCRIBE YOUR BUSINESS IDEA IN 2-3 SENTENCES]
**Target Market:** [WHO IS THE CUSTOMER?]
**Revenue Model:** [HOW DOES IT MAKE MONEY?]

Validate this idea across the following dimensions:

1. **Market Sizing** — TAM, SAM, SOM estimate with methodology. Is this a venture-scale opportunity?
2. **Problem Clarity** — Is the pain point real, frequent, and acute enough that people will pay to solve it?
3. **Competitive Landscape** — Name the top 5 existing competitors or alternatives. What is the unfair advantage / defensible moat?
4. **Business Model Viability** — Unit economics sanity check: estimated CAC vs LTV. Gross margin expectations.
5. **Go-to-Market** — Most realistic first 100 customers channel. Distribution leverage available.
6. **Key Risks** — Top 3 existential risks and how a founder should de-risk each.
7. **Team Requirements** — What founding team composition does this need to succeed?

**Final Verdict:** Fund ✅ / Pass ❌ / Needs Pivot 🔄 — with a clear one-paragraph rationale.`,
    tags: ['startup', 'validation', 'market research', 'venture capital'],
    rating: 4.9, copies: 31200, likes: 4800, aiTool: 'ChatGPT, Claude',
  },
  {
    id: 'fp-02b', catId: 'cat-02', featured: false,
    title: 'Investor Pitch Coach',
    preview: 'You are a pitch coach who has helped startups raise over $500M. Tear apart my pitch deck slide by slide and rebuild it into something that gets meetings...',
    prompt: `You are an elite startup pitch coach who has helped founders raise over $500M across seed to Series B rounds. Your job is to make my pitch irresistible to investors.

**My Startup:** [NAME AND ONE-LINE DESCRIPTION]
**Stage:** [PRE-SEED / SEED / SERIES A]
**Ask:** [$AMOUNT] for [EQUITY %]
**Current Traction:** [REVENUE / USERS / GROWTH RATE]

Evaluate and rewrite the following pitch content:

[PASTE YOUR PITCH DECK TEXT OR NARRATIVE]

For each section (Problem, Solution, Market, Business Model, Traction, Team, Ask), provide:
- **What's Weak:** specific language or claims that will trigger investor skepticism
- **What's Strong:** what to keep and amplify
- **Rewritten Version:** a sharper, more compelling version of that section

Then provide:
- The single most memorable one-liner I should open with
- The 3 questions an investor will definitely ask — and the ideal answers
- The one thing that would make you (as an investor) immediately want a second meeting`,
    tags: ['pitch deck', 'fundraising', 'investor', 'storytelling'],
    rating: 4.8, copies: 19700, likes: 2900, aiTool: 'Claude, ChatGPT',
  },

  /* ── 03  Marketing & Growth ─────────────────────────────── */
  {
    id: 'fp-03a', catId: 'cat-03', featured: true,
    title: 'Viral Content Hook Generator',
    preview: 'Generate 20 scroll-stopping hooks for my content across 4 proven frameworks — curiosity, controversy, specific outcome, and personal story openers...',
    prompt: `You are a world-class copywriter and viral content strategist who has created content generating over 500M organic impressions. Generate 20 scroll-stopping hooks for my content.

**Topic / Product / Brand:** [WHAT IS YOUR CONTENT ABOUT?]
**Target Audience:** [WHO ARE THEY? BE SPECIFIC — age, job, desires, fears]
**Platform:** [TWITTER/X / LINKEDIN / INSTAGRAM / TIKTOK / YOUTUBE]
**Desired Action:** [CLICK / COMMENT / SHARE / BUY / SIGN UP]

Generate 5 hooks using each of these 4 frameworks:

**Framework 1 — Curiosity Gap:** Make them feel they're missing critical information
**Framework 2 — Specific Outcome:** Promise a concrete, measurable result
**Framework 3 — Pattern Interrupt:** Open with something unexpected or counterintuitive
**Framework 4 — Shared Enemy:** Unite them against a common frustration or villain

For each hook, rate its expected engagement potential (1-10) and explain in one sentence why it works psychologically. Mark your top 3 with ⭐.`,
    tags: ['copywriting', 'viral', 'hooks', 'social media', 'content'],
    rating: 4.9, copies: 42100, likes: 6300, aiTool: 'ChatGPT, Claude, Gemini',
  },
  {
    id: 'fp-03b', catId: 'cat-03', featured: false,
    title: 'Full-Funnel Growth Strategy',
    preview: 'Build a complete 90-day growth strategy from zero — acquisition channels, content calendar, conversion optimization, and weekly KPIs with targets...',
    prompt: `You are a growth marketing director who has scaled [INDUSTRY] companies from $0 to $10M ARR. Build a complete 90-day growth strategy for my business.

**Business:** [DESCRIBE PRODUCT/SERVICE]
**Current State:** [MRR / USERS / MONTHLY WEBSITE TRAFFIC]
**Target in 90 Days:** [SPECIFIC GOAL — e.g., "$50K MRR" or "10,000 active users"]
**Budget:** [$MONTHLY MARKETING BUDGET]
**Team:** [SOLO FOUNDER / SMALL TEAM / MARKETING TEAM SIZE]

Deliver a complete growth playbook:

**Month 1 — Foundation (Days 1-30)**
- Top 2 acquisition channels to test (with rationale)
- Content strategy and posting cadence
- Key landing page and conversion optimizations
- Weekly targets and how to measure them

**Month 2 — Amplify (Days 31-60)**
- Double down on what's working from Month 1
- Introduce one paid acquisition experiment
- Email/retention flow to deploy
- Partnership or co-marketing opportunity to pursue

**Month 3 — Scale (Days 61-90)**
- Scale the highest-ROI channel
- Launch a referral or community flywheel
- Full-funnel metrics dashboard (what to track daily, weekly, monthly)

End with: the one metric that is the leading indicator of everything else for this business.`,
    tags: ['growth hacking', 'acquisition', 'funnel', 'SEO', 'strategy'],
    rating: 4.8, copies: 22600, likes: 3200, aiTool: 'ChatGPT, Claude',
  },

  /* ── 04  Content Creation ───────────────────────────────── */
  {
    id: 'fp-04a', catId: 'cat-04', featured: true,
    title: 'Long-Form Article Writer',
    preview: 'Write a comprehensive, SEO-optimised article with the depth of a subject-matter expert — proper structure, engaging narrative, and actionable insights throughout...',
    prompt: `You are a senior content strategist and writer with deep expertise in [TOPIC NICHE]. Write a comprehensive, authoritative long-form article.

**Topic:** [YOUR ARTICLE TOPIC]
**Target Keyword:** [PRIMARY SEO KEYWORD]
**Audience:** [WHO WILL READ THIS — skill level, job title, goals]
**Desired Outcome:** [What should readers be able to DO after reading?]
**Tone:** [PROFESSIONAL / CONVERSATIONAL / AUTHORITATIVE / INSPIRATIONAL]
**Word Count Target:** [1,500 / 2,500 / 4,000+ words]

Structure the article with:

1. **Magnetic Headline** — 3 options using different psychological triggers
2. **Hook Introduction** (150 words) — open with a surprising stat, bold claim, or relatable story; end with a clear preview of value
3. **Table of Contents** — linked H2 sections
4. **Body Sections** — each H2 section should have: a clear argument, supporting evidence or data, a practical example, and a key takeaway
5. **Expert Quotes / Data Points** — [INCLUDE REAL SOURCES / USE PLACEHOLDERS] to add credibility
6. **Actionable Summary** — bullet-point "What to do this week" section
7. **Strong CTA Conclusion** — what to do next

SEO requirements: use [TARGET KEYWORD] in headline, first paragraph, 2-3 H2s, and meta description. Include 3-5 semantically related terms naturally.`,
    tags: ['article writing', 'SEO', 'long-form', 'blogging'],
    rating: 4.8, copies: 28400, likes: 3900, aiTool: 'Claude, ChatGPT',
  },
  {
    id: 'fp-04b', catId: 'cat-04', featured: false,
    title: 'YouTube Script Generator',
    preview: 'Generate a full YouTube script with a hook that stops the scroll, a structured middle that keeps watch time high, and a CTA that converts viewers into subscribers...',
    prompt: `You are a YouTube scriptwriter who has written scripts for channels with over 10M subscribers. Write a complete, retention-optimised YouTube script.

**Channel Niche:** [YOUR CHANNEL TOPIC]
**Video Topic:** [SPECIFIC VIDEO TOPIC]
**Target Audience:** [WHO WATCHES — demographics, interests, pain points]
**Video Length Goal:** [5 min / 10 min / 20 min]
**Channel Goal:** [SUBSCRIBERS / VIEWS / PRODUCT SALES / BRAND AWARENESS]

Write the complete script including:

**[0:00–0:30] HOOK** — Open with the single most interesting or provocative thing from the entire video. No intro. No "hey guys welcome back." Promise the specific value they'll get by staying.

**[0:30–1:30] CREDIBILITY BRIDGE** — Quickly establish why they should listen to you specifically on this topic. Make it a story, not a resume.

**[MAIN CONTENT]** — Divide into [NUMBER] clear chapters. For each chapter:
- Chapter title (on-screen text)
- Spoken script (natural, conversational language — write how people talk, not how they write)
- B-roll suggestion in [BRACKETS]
- Pattern interrupt every 60–90 seconds (question, stat, visual change, tonal shift)

**[LAST 60 SECONDS] CTA** — Ask for ONE specific action. Make it feel earned, not begged for.

Include timestamps and scene directions throughout.`,
    tags: ['youtube', 'script', 'video', 'content creation'],
    rating: 4.7, copies: 19300, likes: 2800, aiTool: 'ChatGPT, Claude',
  },

  /* ── 05  AI & Automation ────────────────────────────────── */
  {
    id: 'fp-05a', catId: 'cat-05', featured: true,
    title: 'Custom AI Agent Designer',
    preview: 'Design a complete autonomous AI agent from scratch — persona, tools, memory architecture, decision logic, and failure modes — ready to hand to a developer...',
    prompt: `You are a senior AI systems architect specialising in autonomous agent design. Design a complete, production-ready AI agent for the following use case.

**Use Case:** [DESCRIBE WHAT THE AGENT SHOULD DO]
**End User:** [WHO WILL USE OR BE SERVED BY THIS AGENT?]
**Existing Tools / APIs Available:** [LIST ANY INTEGRATIONS — CRM, email, database, etc.]
**LLM Provider:** [OPENAI / ANTHROPIC / GOOGLE / LOCAL MODEL]
**Autonomy Level:** [FULLY AUTONOMOUS / HUMAN-IN-THE-LOOP / COPILOT ONLY]

Design the complete agent specification:

1. **Agent Persona & Instruction Set** — write the full system prompt this agent should run with, including its role, constraints, communication style, and escalation rules

2. **Tool Inventory** — list every tool/function the agent needs (name, description, input parameters, output format). Mark which require human approval.

3. **Memory Architecture** — short-term context window strategy, long-term memory store design (vector DB / structured DB), what to persist vs. discard

4. **Decision Logic** — step-by-step reasoning flow the agent should follow for its primary task. Include decision tree for edge cases.

5. **Guardrails & Failure Modes** — what the agent must NEVER do, how to handle ambiguous inputs, when to stop and ask for clarification

6. **Evaluation Framework** — 5 test scenarios to verify the agent works correctly before deployment

Output the system prompt as a ready-to-paste block.`,
    tags: ['AI agents', 'automation', 'LLM', 'system prompt', 'autonomous'],
    rating: 4.9, copies: 33800, likes: 5100, aiTool: 'Claude, ChatGPT',
  },
  {
    id: 'fp-05b', catId: 'cat-05', featured: false,
    title: 'Workflow Automation Planner',
    preview: 'Map out a complete no-code automation workflow using n8n or Zapier — trigger, data transforms, conditions, error handling, and exact node configuration...',
    prompt: `You are an automation engineer who has built 500+ workflows in n8n, Zapier, and Make. Design a complete, production-ready automation workflow.

**What I Want to Automate:** [DESCRIBE THE MANUAL PROCESS IN DETAIL]
**Tools I Use:** [LIST YOUR APPS — e.g., Notion, Gmail, Slack, HubSpot, Airtable]
**Preferred Automation Platform:** [N8N / ZAPIER / MAKE / ANY]
**Trigger:** [WHAT STARTS THE WORKFLOW? — e.g., "new form submission", "daily at 9am", "new row in spreadsheet"]
**End Goal:** [WHAT SHOULD BE DONE OR NOTIFIED WHEN IT COMPLETES?]

Deliver a complete workflow specification:

1. **Workflow Diagram** — describe the full flow in plain text with step numbers and arrows (→)

2. **Step-by-Step Node Configuration** — for each node/step:
   - Node type and app
   - Exact field mappings (what data goes where)
   - Filters or conditions to add
   - Data transformation logic (e.g., format date, concatenate fields)

3. **Error Handling** — what happens if step 3 fails? Retry logic, fallback actions, error notification setup

4. **Testing Checklist** — 5 test cases to run before going live

5. **Maintenance Notes** — what to monitor, common failure points, how to extend it later

Include any template variables or dynamic expressions needed in the correct syntax for [CHOSEN PLATFORM].`,
    tags: ['automation', 'n8n', 'zapier', 'workflow', 'no-code'],
    rating: 4.8, copies: 21500, likes: 3300, aiTool: 'ChatGPT, Claude',
  },

  /* ── 06  Sports & Athletic Performance ─────────────────── */
  {
    id: 'fp-06a', catId: 'cat-06', featured: true,
    title: 'Personalised Training Program',
    preview: 'Build a science-backed, periodized training program tailored to your exact goal, training history, schedule, and equipment — week by week for 12 weeks...',
    prompt: `You are a certified strength & conditioning coach (CSCS) with 10+ years of experience working with [SPORT / POPULATION TYPE] athletes. Design a complete 12-week training program.

**Athlete Profile:**
- Goal: [FAT LOSS / MUSCLE GAIN / STRENGTH / SPORT PERFORMANCE / ENDURANCE]
- Current Training Age: [BEGINNER / INTERMEDIATE / ADVANCED — years lifting]
- Available Days Per Week: [NUMBER]
- Session Length Available: [MINUTES]
- Equipment: [GYM / HOME / BODYWEIGHT ONLY]
- Injuries or Limitations: [LIST ANY]
- Current 1RM (if known): Squat [LBS/KG], Bench [LBS/KG], Deadlift [LBS/KG]

Design:

**Periodization Model** — explain the overarching structure (linear, undulating, block) and why it suits this athlete's goal

**Week-by-Week Progression Table** — intensity %, volume (sets × reps), and primary focus for all 12 weeks

**Sample Full Week (Week 4)** — complete sessions for all training days with:
- Exercise name
- Sets × Reps × Rest
- Coaching cue for the most important technique point
- RPE target

**Deload Protocol** — when and how to deload

**Progress Tracking** — which metrics to measure weekly and how to auto-regulate if progress stalls`,
    tags: ['training', 'strength', 'periodization', 'programming', 'fitness'],
    rating: 4.9, copies: 27600, likes: 4200, aiTool: 'ChatGPT, Claude',
  },
  {
    id: 'fp-06b', catId: 'cat-06', featured: false,
    title: 'Sports Nutrition Optimizer',
    preview: 'Design a complete, evidence-based nutrition plan for your sport and body composition goal — macros, meal timing, pre/intra/post-workout nutrition, and supplement stack...',
    prompt: `You are a registered sports dietitian (RD, CSSD) with expertise in [SPORT / FITNESS GOAL] performance nutrition. Design a complete evidence-based nutrition plan.

**Athlete Details:**
- Sport / Activity: [YOUR SPORT OR TRAINING TYPE]
- Goal: [PERFORMANCE / FAT LOSS / MUSCLE GAIN / BODY RECOMPOSITION]
- Body Weight: [LBS or KG]
- Body Fat % (estimate): [%]
- Training Schedule: [DAYS/WEEK, SESSION DURATION]
- Dietary Restrictions: [NONE / VEGETARIAN / VEGAN / GLUTEN-FREE / OTHER]
- Budget Per Day (food): [$USD]

Deliver:

1. **Caloric Target** — maintenance TDEE calculation, then adjusted target with rationale
2. **Macro Split** — protein / carbs / fats in grams and % with scientific justification for these exact numbers
3. **Meal Timing Strategy** — number of meals, spacing, and why for performance
4. **Pre-Workout Nutrition** — what to eat and when (2h before, 30min before)
5. **Intra-Workout Nutrition** — if applicable for session length
6. **Post-Workout Nutrition** — the anabolic window reality + optimal recovery meal
7. **Sample Full Day Meal Plan** — complete meals with portion sizes and macro breakdown
8. **Evidence-Based Supplement Stack** — only supplements with tier-1 research support: name, dose, timing, what the evidence actually says`,
    tags: ['nutrition', 'sports diet', 'macros', 'supplements', 'recovery'],
    rating: 4.7, copies: 18900, likes: 2700, aiTool: 'ChatGPT, Claude',
  },

  /* ── 07  Travel & Lifestyle Experiences ─────────────────── */
  {
    id: 'fp-07a', catId: 'cat-07', featured: true,
    title: 'Custom Travel Itinerary Planner',
    preview: 'Generate a day-by-day itinerary with the insider knowledge of a local guide — perfect pacing, hidden gems, restaurant picks, logistics, and backup plans included...',
    prompt: `You are an expert travel curator who has lived in or deeply researched [DESTINATION] and specialises in creating bespoke itineraries. Build my perfect trip.

**Trip Details:**
- Destination: [CITY / COUNTRY / REGION]
- Duration: [NUMBER OF DAYS]
- Travel Dates: [MONTH — helps with weather/events]
- Travellers: [SOLO / COUPLE / FAMILY with ages / GROUP SIZE]
- Travel Style: [ADVENTURE / LUXURY / BUDGET BACKPACKER / CULTURE & ART / FOODIE / RELAXATION]
- Budget Range: [$$ per day or total]
- Must-See / Must-Do: [ANY NON-NEGOTIABLES?]
- What to Avoid: [TOURIST TRAPS / CROWDED PLACES / SPECIFIC ACTIVITIES]

Build a complete itinerary:

**Day-by-Day Schedule** — for each day:
- Morning / Afternoon / Evening plan with timing
- 1 "insider tip" the guidebooks miss
- Recommended restaurant for each meal (name, why, price range, must-order dish)
- Estimated travel time between locations

**Logistics Cheat Sheet:**
- Best neighbourhoods to stay in (with hotel tier recommendation)
- Getting around (transport options, apps to download, costs)
- What to book in advance vs. just show up

**Budget Breakdown:** estimated daily spend across accommodation, food, activities, transport

**Contingency Plans:** rainy day alternatives for 2 main outdoor activities`,
    tags: ['travel', 'itinerary', 'trip planning', 'vacation', 'local tips'],
    rating: 4.9, copies: 38400, likes: 5900, aiTool: 'ChatGPT, Claude, Gemini',
  },
  {
    id: 'fp-07b', catId: 'cat-07', featured: false,
    title: 'Digital Nomad Setup Guide',
    preview: 'Build a complete location-independent work setup — visa strategy, best cities ranked for your criteria, co-working recommendations, tax considerations, and income protection...',
    prompt: `You are a digital nomad veteran who has worked remotely from 40+ countries over 8 years. Help me build a sustainable, legally compliant location-independent lifestyle.

**My Situation:**
- Current Country of Residence / Passport: [COUNTRY]
- Income Type: [FREELANCE / REMOTE EMPLOYEE / BUSINESS OWNER / CONTENT CREATOR]
- Monthly Income (approx): [$USD]
- Work Requirements: [HOURS/WEEK, TIMEZONE CONSTRAINTS, INTERNET NEEDS]
- Lifestyle Preferences: [CITY / BEACH / MOUNTAINS / VARIETY — CULTURE PRIORITIES]
- Budget Per Month (all-in): [$USD]
- Partner / Family: [SOLO / COUPLE / CHILDREN]
- Time Frame: [STARTING WHEN, HOW LONG PLANNING TO DO THIS]

Provide a complete nomad setup plan:

1. **Top 5 Base Locations Ranked** for my criteria — city, cost breakdown, visa path, internet reliability score, safety rating, community size

2. **Visa Strategy** — best legal pathways for my passport (digital nomad visa, tourist visa chaining, residency options)

3. **Tax Optimisation** — the key questions I need to ask a tax advisor, common structures for nomads with my income type, countries to consider for tax residency

4. **Remote Work Setup** — equipment list, VPN recommendations, backup internet solutions, co-working space strategy

5. **Income Protection** — health insurance options, emergency fund sizing, business continuity plan

6. **First 90 Days Roadmap** — exactly what to do before departure, week 1 in a new location, how to build routine and community`,
    tags: ['digital nomad', 'remote work', 'travel', 'visa', 'lifestyle design'],
    rating: 4.8, copies: 22100, likes: 3400, aiTool: 'Claude, ChatGPT',
  },

  /* ── 08  Legal & Regulatory Strategy ───────────────────── */
  {
    id: 'fp-08a', catId: 'cat-08', featured: true,
    title: 'Contract Risk Analyzer',
    preview: 'Analyse any contract clause by clause for red flags, unfair terms, missing protections, and negotiation leverage points — then rewrite the problematic sections...',
    prompt: `You are a seasoned commercial attorney with 15+ years of experience in [CONTRACT TYPE — e.g., SaaS agreements / freelance contracts / employment contracts]. Perform a thorough contract risk analysis.

[PASTE CONTRACT TEXT HERE]

Analyse this contract and deliver:

**1. Executive Risk Summary**
- Overall risk rating: Low / Medium / High / Critical
- The single most dangerous clause and why
- Top 3 issues requiring immediate attention before signing

**2. Clause-by-Clause Analysis**
For each significant clause, identify:
- What it means in plain language
- Risk level: 🟢 Acceptable / 🟡 Negotiable / 🔴 Reject or Rewrite
- Specific risk to me as [BUYER / SELLER / EMPLOYEE / CONTRACTOR]
- Suggested rewrite or alternative language

**3. Missing Protections**
Standard clauses that should be in this agreement but aren't — and model language to add

**4. Negotiation Strategy**
- Which terms are likely non-negotiable (boilerplate)
- Which terms have the most leverage to negotiate
- 5 specific asks I should make in the redline

**5. Questions for My Lawyer**
The 5 most important questions to ask a qualified attorney before signing

⚠️ Note: This is for educational purposes. Always have a licensed attorney review before signing.`,
    tags: ['contract', 'legal review', 'risk', 'negotiation', 'compliance'],
    rating: 4.9, copies: 19800, likes: 3100, aiTool: 'Claude, ChatGPT',
  },
  {
    id: 'fp-08b', catId: 'cat-08', featured: false,
    title: 'IP Protection Strategist',
    preview: 'Build a comprehensive intellectual property protection strategy for your business — trademarks, patents, trade secrets, and enforcement playbook tailored to your assets...',
    prompt: `You are an intellectual property attorney and business strategist with expertise in protecting [INDUSTRY] companies' intangible assets. Build a complete IP protection strategy.

**My Business:**
- Type: [PRODUCT / SOFTWARE / CONTENT / BRAND / INVENTION]
- Description: [WHAT DO YOU MAKE OR DO?]
- Stage: [IDEA / MVP / REVENUE-GENERATING / SCALING]
- Key IP Assets: [LIST WHAT YOU BELIEVE IS VALUABLE — e.g., brand name, algorithm, design, content]
- Budget for IP: [$LOW / MID / HIGH — or specific amount]
- Target Markets: [COUNTRIES WHERE YOU OPERATE OR PLAN TO]

Deliver a complete IP strategy:

1. **IP Audit** — categorise my assets into: Trademarks, Copyrights, Patents (utility/design), Trade Secrets. Identify what is currently unprotected.

2. **Priority Protection Plan** — ranked list of what to protect first based on business value and risk, with estimated costs and timelines

3. **Trademark Strategy** — classes to file in, jurisdictions, search considerations, monitoring approach

4. **Trade Secret Programme** — what qualifies, NDA/NCA framework, internal policies needed, employee onboarding changes

5. **Copyright Baseline** — automatic protections I already have vs. what requires registration and why

6. **Enforcement Playbook** — what to do if someone infringes: monitoring tools, cease & desist process, escalation path

7. **IP Agreement Checklist** — standard clauses needed in employment, contractor, and partnership agreements

⚠️ For educational purposes. Consult a licensed IP attorney for your specific situation.`,
    tags: ['intellectual property', 'trademark', 'patents', 'trade secrets', 'legal'],
    rating: 4.7, copies: 12300, likes: 1900, aiTool: 'Claude, ChatGPT',
  },

  /* ── 09  Manufacturing & Supply Chain ───────────────────── */
  {
    id: 'fp-09a', catId: 'cat-09', featured: true,
    title: 'Supply Chain Risk Audit',
    preview: 'Perform a comprehensive supply chain risk assessment — map single points of failure, score supplier dependencies, and build a resilience playbook with mitigation actions...',
    prompt: `You are a supply chain risk management expert with 20 years of experience in [INDUSTRY]. Perform a comprehensive supply chain risk audit.

**My Supply Chain Profile:**
- Industry / Product Type: [WHAT YOU MANUFACTURE OR SELL]
- Annual Revenue / Volume: [SCALE]
- Number of Key Suppliers: [APPROXIMATE]
- Geographic Footprint: [WHERE SUPPLIERS AND CUSTOMERS ARE LOCATED]
- Biggest Recent Disruption: [IF ANY]
- Current Risk Management Maturity: [NONE / BASIC / INTERMEDIATE / ADVANCED]

Deliver a complete risk audit:

**1. Risk Mapping**
Identify and score risks in each category (Likelihood × Impact, 1-5):
- Supply risks (supplier failure, quality, capacity)
- Demand risks (forecast errors, demand spikes/drops)
- Geopolitical & trade risks (tariffs, sanctions, logistics disruption)
- Financial risks (supplier insolvency, currency, payment terms)
- Environmental & force majeure risks

**2. Supplier Concentration Analysis**
- Single-source dependencies to address immediately
- Tier 2/3 supplier visibility gaps
- Recommended dual/multi-source strategy for top 5 critical components

**3. Resilience Scorecard**
Rate my current resilience (1-10) on: visibility, flexibility, redundancy, financial buffers, recovery speed

**4. 90-Day Mitigation Roadmap**
Prioritised actions with: what to do, who owns it, cost estimate, expected risk reduction

**5. KPI Dashboard**
10 supply chain KPIs I should track monthly with target benchmarks for my industry`,
    tags: ['supply chain', 'risk management', 'procurement', 'resilience', 'operations'],
    rating: 4.8, copies: 9400, likes: 1400, aiTool: 'ChatGPT, Claude',
  },
  {
    id: 'fp-09b', catId: 'cat-09', featured: false,
    title: 'Lean Manufacturing Advisor',
    preview: 'Apply Toyota Production System principles to your operation — identify the 8 wastes, map your value stream, and build a prioritised Kaizen improvement plan...',
    prompt: `You are a Lean Six Sigma Master Black Belt with deep experience in [MANUFACTURING SECTOR]. Apply Lean Manufacturing principles to transform my operation.

**My Operation:**
- What We Produce: [PRODUCT OR SERVICE]
- Production Volume: [UNITS/DAY OR MONTH]
- Team Size: [NUMBER OF WORKERS]
- Current Biggest Pain Points: [DESCRIBE — e.g., long lead times, high defect rate, excessive overtime]
- Current OEE (if known): [%]
- Previous Lean Exposure: [NONE / SOME / EXPERIENCED]

Deliver a complete Lean transformation roadmap:

**1. The 8 Wastes Audit (TIMWOODS)**
For each waste (Transport, Inventory, Motion, Waiting, Overproduction, Over-processing, Defects, Skills), identify likely manifestations in my operation and estimate the cost of each

**2. Value Stream Map (Text Format)**
Map my current state flow: raw material → customer delivery, including process steps, inventory buffers, information flows, cycle times, and wait times

**3. Future State Design**
The ideal flow after eliminating the top 3 wastes — what the value stream looks like and how to get there

**4. Prioritised Kaizen Roadmap**
10 specific improvement events ranked by: ease of implementation, expected ROI, and which waste they target

**5. Visual Management Setup**
Which visual controls and boards to implement first (5S areas, production boards, andon systems)

**6. 30-Day Quick Win Plan**
Improvements achievable in the first month with minimal investment that will show visible results`,
    tags: ['lean manufacturing', 'kaizen', 'six sigma', 'waste reduction', 'operations'],
    rating: 4.7, copies: 8200, likes: 1200, aiTool: 'ChatGPT, Claude',
  },

  /* ── 10  Art & Design Mastery ───────────────────────────── */
  {
    id: 'fp-10a', catId: 'cat-10', featured: true,
    title: 'Brand Identity System Designer',
    preview: 'Create a comprehensive brand identity from scratch — brand strategy, visual language, typography system, colour psychology, logo direction, and usage guidelines...',
    prompt: `You are a brand strategist and creative director who has built identities for [INDUSTRY] companies ranging from startups to Fortune 500. Design a complete brand identity system.

**Brand Brief:**
- Company Name: [NAME]
- What You Do: [PRODUCT / SERVICE DESCRIPTION]
- Target Audience: [AGE, PSYCHOGRAPHICS, WHAT THEY CARE ABOUT]
- Brand Personality (pick 3): Innovative / Trustworthy / Playful / Luxurious / Bold / Minimal / Warm / Expert / Rebellious / Sustainable
- Competitors to Differentiate From: [LIST 2-3]
- Brands You Admire (for reference): [LIST 2-3 WITH WHY]
- Budget Range: [STARTUP / MID / ENTERPRISE]

Deliver a complete brand identity brief:

**1. Brand Strategy Foundation**
- Brand positioning statement (fill-in-the-blank template completed for my brand)
- Brand voice: 3 personality traits × do this / never do this
- Tagline: 5 options with rationale

**2. Visual Identity Direction**
- Logo concept direction: describe the symbol/wordmark style, what it should evoke, what to avoid
- Colour palette: primary + secondary + neutral + accent colours with exact hex codes, psychological reasoning, and which competitor whitespace this occupies
- Typography system: heading font + body font + accent font (free alternatives included)
- Design motifs and patterns that reinforce the brand feeling

**3. Application Examples**
Describe how the identity should look on: business card, social media profile, website header, packaging (if applicable)

**4. Brand Don'ts**
Common misuses to explicitly prohibit in the brand guidelines`,
    tags: ['branding', 'identity', 'design', 'logo', 'visual design'],
    rating: 4.9, copies: 31700, likes: 4900, aiTool: 'Claude, ChatGPT',
  },
  {
    id: 'fp-10b', catId: 'cat-10', featured: false,
    title: 'UI/UX Design Critic',
    preview: 'Get a rigorous UX critique of your interface — usability heuristics evaluation, cognitive load analysis, conversion bottlenecks, and a prioritised redesign brief...',
    prompt: `You are a senior UX designer and product design lead with 12+ years of experience in [PRODUCT CATEGORY — e.g., SaaS / e-commerce / mobile apps]. Perform a rigorous UX critique.

**What I'm Submitting:** [DESCRIBE YOUR INTERFACE — paste a description or screenshot description of the key screen]
**User Goal on This Screen:** [WHAT IS THE USER TRYING TO ACCOMPLISH?]
**Current Problem:** [WHAT ARE USERS STRUGGLING WITH OR WHAT METRIC IS LOW?]
**Platform:** [WEB / IOS / ANDROID / DESKTOP APP]
**Primary User:** [DESCRIBE THE USER — technical sophistication, context of use]

Evaluate against:

**1. Nielsen's 10 Usability Heuristics** — score each 1-5 and explain the worst violations

**2. Cognitive Load Analysis** — where is the interface asking users to think too hard? What can be chunked, hidden, or removed?

**3. Visual Hierarchy Audit** — does the eye flow naturally toward the primary action? What's competing for attention?

**4. Conversion & Friction Points** — identify every micro-friction that increases drop-off (extra clicks, unclear labels, missing feedback, slow load perception)

**5. Accessibility Check** — colour contrast, touch target sizes, keyboard navigation, screen reader considerations

**6. Redesign Brief** — prioritised list of changes (Quick wins in <1 day / Medium changes 1 week / Bigger redesigns 1 sprint) with the expected UX improvement for each

**7. A/B Test Suggestions** — 3 specific hypotheses to test with success metrics`,
    tags: ['UX design', 'usability', 'UI critique', 'conversion', 'product design'],
    rating: 4.8, copies: 17600, likes: 2700, aiTool: 'Claude, ChatGPT',
  },

  /* ── 11  Health Optimization & Bio-Performance ──────────── */
  {
    id: 'fp-11a', catId: 'cat-11', featured: true,
    title: 'Personalised Health Protocol Designer',
    preview: 'Build a science-backed, holistic health optimization protocol — sleep, nutrition, exercise, stress management, and lab testing priorities based on your specific goals and biomarkers...',
    prompt: `You are a functional medicine practitioner and health optimisation coach with expertise in longevity and peak performance. Design a personalised health protocol.

**My Health Profile:**
- Age / Sex: [AGE] / [MALE / FEMALE / OTHER]
- Primary Goal: [LONGEVITY / ENERGY / FAT LOSS / MUSCLE / COGNITIVE PERFORMANCE / GENERAL HEALTH]
- Current Complaints: [LIST ANY SYMPTOMS OR ISSUES — e.g., poor sleep, low energy, brain fog, digestive issues]
- Known Lab Values (if any): [PASTE RECENT BLOODWORK OR "NONE"]
- Current Lifestyle: [ACTIVITY LEVEL, DIET TYPE, SLEEP HOURS, STRESS LEVEL 1-10]
- Medications / Supplements Currently Taking: [LIST]
- Budget for Health: [$LOW / MID / HIGH per month]

Design a comprehensive 12-week protocol:

**1. Lab Testing Priority List** — the 10 most important biomarkers to test given my goals and complaints, with what each reveals

**2. Nutrition Protocol** — dietary framework (not a specific diet, but principles), key foods to add, foods to eliminate for 30 days, intermittent fasting recommendation if appropriate

**3. Movement Protocol** — weekly exercise structure that balances strength, cardiovascular fitness, mobility, and recovery for my goal

**4. Sleep Architecture** — personalised sleep hygiene protocol, ideal sleep/wake times based on chronotype, the 3 highest-impact changes for better sleep quality

**5. Stress & Recovery** — HRV baseline approach, 2-3 evidence-based stress management techniques suited to my lifestyle, active recovery tools

**6. Evidence-Based Supplement Stack** — only include supplements with strong clinical evidence for my specific goal. Format: supplement, dose, timing, evidence quality (A/B/C)

**7. 12-Week Milestones** — how to know the protocol is working at week 4, 8, and 12

⚠️ This is educational. Consult your physician before making health changes, especially regarding supplements and medications.`,
    tags: ['biohacking', 'health optimization', 'longevity', 'supplements', 'protocol'],
    rating: 4.9, copies: 29400, likes: 4600, aiTool: 'Claude, ChatGPT',
  },
  {
    id: 'fp-11b', catId: 'cat-11', featured: false,
    title: 'Sleep Architecture Optimizer',
    preview: 'Diagnose your sleep problems and build a complete sleep optimization protocol — sleep staging, light exposure, temperature, chronotype alignment, and a 21-day implementation plan...',
    prompt: `You are a sleep scientist and certified sleep coach with expertise in sleep architecture optimisation. Help me achieve elite-level sleep quality.

**My Current Sleep Profile:**
- Average Bedtime / Wake Time: [TIME]
- Average Total Sleep Hours: [HOURS]
- Sleep Problems: [CHECK ALL THAT APPLY: trouble falling asleep / waking in night / early waking / unrefreshing sleep / vivid dreams / snoring]
- Chronotype (if known): [MORNING LARK / NIGHT OWL / INTERMEDIATE / UNSURE]
- Caffeine Intake: [AMOUNT AND LAST CONSUMPTION TIME]
- Evening Routine: [DESCRIBE YOUR LAST 2 HOURS BEFORE BED]
- Sleep Environment: [DESCRIBE ROOM — light, noise, temperature]
- HRV or Wearable Data (if available): [PASTE OR "NONE"]
- Goal: [FALL ASLEEP FASTER / SLEEP LONGER / DEEPER SLEEP / MORE ENERGY ON WAKING]

Deliver a complete sleep optimisation plan:

**1. Sleep Diagnosis** — based on my profile, identify the most likely root cause(s) of my sleep issues with the science behind each

**2. Chronotype Analysis** — my ideal sleep/wake window and how far I'm currently off it (social jetlag assessment)

**3. Light Exposure Protocol** — morning bright light (timing, intensity, duration), evening light blocking (when, what type), red light use

**4. Temperature Protocol** — bedroom temperature target, body temperature manipulation techniques (hot shower timing, cooling pad, etc.)

**5. Pre-Sleep Routine** — complete 90-minute wind-down sequence, minute-by-minute for the first week

**6. Supplement Protocol** — evidence-based only: what, dose, timing, expected effect and evidence grade

**7. 21-Day Implementation Plan** — week 1 changes, week 2 additions, week 3 refinements. What to track daily.

**8. When to See a Doctor** — signs that my sleep issues require clinical evaluation (sleep apnoea screening, etc.)`,
    tags: ['sleep', 'circadian rhythm', 'sleep optimization', 'chronotype', 'recovery'],
    rating: 4.8, copies: 21300, likes: 3500, aiTool: 'ChatGPT, Claude',
  },

  /* ── 12  Wealth Architecture & Asset Strategy ───────────── */
  {
    id: 'fp-12a', catId: 'cat-12', featured: true,
    title: 'Investment Portfolio Architect',
    preview: 'Build a personalised, diversified investment portfolio strategy — asset allocation by goal and timeline, specific vehicle recommendations, rebalancing triggers, and tax efficiency layering...',
    prompt: `You are a fee-only financial planner (CFP) and portfolio strategist with 20 years of experience. Design a complete investment portfolio strategy.

**My Financial Profile:**
- Age: [AGE]
- Annual Income: [$]
- Monthly Investable Income: [$]
- Total Current Portfolio Value: [$]
- Current Portfolio Composition: [LIST WHAT YOU HOLD]
- Investment Timeline: [SHORT <5yr / MEDIUM 5-15yr / LONG >15yr]
- Primary Goal: [RETIREMENT / WEALTH BUILDING / PASSIVE INCOME / CAPITAL PRESERVATION]
- Risk Tolerance: [CONSERVATIVE / MODERATE / AGGRESSIVE] (how would you feel if portfolio dropped 30%?)
- Tax Situation: [COUNTRY — for account type recommendations]
- Debt: [LIST ANY HIGH-INTEREST DEBT]

Design a complete portfolio strategy:

**1. Asset Allocation Blueprint** — target % for each asset class with rationale:
- Equities (domestic / international / emerging)
- Fixed income (government / corporate / duration mix)
- Alternatives (real estate, commodities, crypto if applicable)
- Cash & equivalents

**2. Implementation Vehicle Strategy** — specific account types to prioritise (tax-advantaged first), ETF/fund recommendations for each allocation bucket with expense ratio targets

**3. Portfolio Picks** — for each allocation bucket, suggest 2-3 low-cost index ETFs or funds with tickers, ER%, and why each suits my profile

**4. Rebalancing Rules** — calendar vs. threshold rebalancing — which is better for me and specific triggers to act on

**5. Tax Efficiency Layering** — which assets to hold in which account type (tax-loss harvesting basics, asset location strategy)

**6. First 90-Day Action Plan** — exact steps to implement this, in order, with estimated time and any one-time costs

⚠️ Educational only. Not financial advice. Consult a licensed financial advisor for personalised guidance.`,
    tags: ['investing', 'portfolio', 'asset allocation', 'ETF', 'wealth building'],
    rating: 4.9, copies: 34200, likes: 5400, aiTool: 'Claude, ChatGPT',
  },
  {
    id: 'fp-12b', catId: 'cat-12', featured: false,
    title: 'Passive Income System Engineer',
    preview: 'Design a realistic, diversified passive income blueprint based on your existing capital, skills, and time — with specific vehicles, timelines, and the exact income potential of each stream...',
    prompt: `You are a passive income strategist who has built multiple income streams generating $[X]/month. Design a realistic passive income blueprint for my situation.

**My Starting Point:**
- Capital Available to Deploy: [$]
- Monthly Time Available for Setup: [HOURS/WEEK]
- Skills / Expertise: [LIST YOUR PROFESSIONAL AND PERSONAL SKILLS]
- Current Active Income: [$MONTHLY]
- Passive Income Goal: [$MONTHLY within [TIMEFRAME]]
- Risk Tolerance: [LOW / MEDIUM / HIGH]
- Preference: [DIGITAL / REAL ASSETS / FINANCIAL / ANY]

Design a diversified passive income portfolio:

For each income stream recommended, provide:
- **Stream Name & Type:** (e.g., Dividend ETF portfolio — financial)
- **Setup Requirements:** capital, time, skills, tools needed
- **Realistic Setup Timeline:** weeks/months to first dollar
- **Income Potential:** monthly at 12 months, 36 months (conservative / realistic / optimistic estimates)
- **Effort After Setup:** hours/month to maintain
- **Failure Modes:** top 2 reasons this fails and how to avoid them
- **My Fit Score:** 1-10 based on my profile, with explanation

Then provide:
**Portfolio Stack:** the optimal combination of 3-4 streams for my situation, sequenced in the order to build them (which first, which to layer in later)

**Month 1 Action Plan:** the first 4 weekly milestones to start generating income within 90 days`,
    tags: ['passive income', 'financial freedom', 'investing', 'business', 'side income'],
    rating: 4.8, copies: 28700, likes: 4300, aiTool: 'ChatGPT, Claude',
  },

  /* ── 13  Psychology & Human Behavior Mastery ────────────── */
  {
    id: 'fp-13a', catId: 'cat-13', featured: true,
    title: 'Cognitive Bias Detector',
    preview: 'Analyse a decision, belief, or situation for cognitive biases at play — identify the specific distortions, show how they are affecting your thinking, and provide a debiased perspective...',
    prompt: `You are a cognitive psychologist and decision scientist specialising in identifying and correcting cognitive biases. Analyse my thinking for distortions.

**The Situation / Decision / Belief I Want Analysed:**
[DESCRIBE THE SITUATION, DECISION YOU MADE OR ARE MAKING, OR BELIEF YOU HOLD IN AS MUCH DETAIL AS POSSIBLE]

**Additional Context:**
- What outcome do I want / fear?
- What information did I use to reach this conclusion?
- What did I NOT consider?
- Who else is involved and what are their incentives?

Perform a complete cognitive bias audit:

**1. Bias Inventory** — for each relevant bias detected:
- Bias name and one-sentence definition
- Exactly how it is showing up in my situation (be specific — quote my words back if applicable)
- The emotional driver underneath this bias (fear of loss, need for certainty, desire for belonging, etc.)
- Severity in this case: Mild / Moderate / Severe — is it likely changing my decision?

**2. The Steelman** — argue the strongest possible case AGAINST my current position. What would a brilliant, unbiased analyst who has studied this situation see differently?

**3. Pre-Mortem** — if I proceed with my current thinking and I am wrong, what exactly went wrong and why? What were the signs I ignored?

**4. Debiased Decision Framework** — 5 specific questions to ask myself before finalising this decision, designed to counteract the biases identified

**5. System 2 Slow-Thinking Prompt** — one written exercise (takes 10 minutes) that forces me to engage deliberate thinking on this specific situation`,
    tags: ['cognitive bias', 'decision making', 'psychology', 'critical thinking', 'mental models'],
    rating: 4.9, copies: 26800, likes: 4100, aiTool: 'Claude, ChatGPT',
  },
  {
    id: 'fp-13b', catId: 'cat-13', featured: false,
    title: 'Habit System Engineer',
    preview: 'Build a science-backed habit installation system for any goal — habit stack design, environment architecture, identity-based anchoring, and a 66-day implementation protocol...',
    prompt: `You are a behavioural scientist and habit coach who applies the research of BJ Fogg, James Clear, and Nir Eyal to build lasting behaviour change. Engineer a habit system for my goal.

**My Goal:** [WHAT HABIT DO YOU WANT TO BUILD OR BREAK?]
**Current Situation:** [DESCRIBE YOUR CURRENT BEHAVIOUR AROUND THIS AREA]
**Past Attempts:** [WHAT HAVE YOU TRIED BEFORE AND WHY DID IT FAIL?]
**Motivation Type:** [ARE YOU MORE MOTIVATED BY REWARDS / AVOIDING PAIN / IDENTITY / ACHIEVEMENT?]
**Daily Schedule:** [DESCRIBE A TYPICAL DAY — when you wake, key anchor points in your day]
**Environment:** [HOME / OFFICE / GYM / MIXTURE — describe your physical surroundings briefly]

Design a complete habit installation system:

**1. Habit Diagnosis** — analyse why previous attempts failed using the Habit Loop model (Cue → Craving → Response → Reward). Where did the chain break?

**2. Minimum Viable Habit (MVH)** — the smallest possible version of this habit that still moves the needle. Why starting small is non-negotiable.

**3. Habit Stack Design** — the exact anchor routine: [EXISTING BEHAVIOUR] → [NEW TINY HABIT] → [IMMEDIATE REWARD]. 3 stack options for me to choose from.

**4. Environment Architecture** — specific changes to my physical and digital environment that make the habit easier to do and harder to skip (choice architecture)

**5. Identity Reframe** — the identity statement to adopt ("I am a person who...") and how to build evidence for it in the first 2 weeks

**6. 66-Day Protocol** — week-by-week progression, when to increase difficulty, how to handle missed days without breaking the streak mentally

**7. Anti-Relapse System** — the top 3 triggers that will try to derail this habit and the pre-planned "if-then" response for each`,
    tags: ['habits', 'behaviour change', 'psychology', 'productivity', 'mindset'],
    rating: 4.8, copies: 23900, likes: 3700, aiTool: 'ChatGPT, Claude',
  },

  /* ── 14  Real Estate & Built Environment ────────────────── */
  {
    id: 'fp-14a', catId: 'cat-14', featured: true,
    title: 'Real Estate Deal Analyzer',
    preview: 'Perform a complete investment analysis on any property — cash flow projections, cap rate, cash-on-cash return, stress tests, exit scenarios, and a buy/pass/negotiate verdict...',
    prompt: `You are a real estate investment analyst with a portfolio of [PROPERTY TYPE] across [MARKET]. Perform a complete investment analysis on the following deal.

**Property Details:**
- Address / Market: [CITY, STATE/COUNTRY]
- Property Type: [SINGLE FAMILY / MULTI-FAMILY / COMMERCIAL / SHORT-TERM RENTAL]
- Asking Price: [$]
- Estimated ARV (After Repair Value): [$] (if applicable)
- Estimated Repair Costs: [$]
- Gross Rent (current / market): [$MONTHLY]
- HOA / Strata Fees: [$MONTHLY]
- Property Tax (annual): [$]
- Insurance (annual): [$]
- Current Vacancy Rate in Area: [%]
- My Financing: [ALL CASH / % DOWN at % INTEREST RATE over YEARS]

Analyse this deal completely:

**1. Full P&L Projection**
Year 1 monthly and annual: Gross Income → Vacancy Loss → Net Rental Income → All Expenses → NOI → Debt Service → Cash Flow

**2. Key Metrics**
- Cap Rate (NOI / Purchase Price): calculated
- Cash-on-Cash Return: calculated
- Gross Rent Multiplier: calculated
- Break-even Occupancy: calculated
- Payback Period: estimated

**3. 5-Year Projection**
Assume [3% / 5%] annual rent growth and [2%] expense inflation. Show cumulative cash flow and equity position at Year 5.

**4. Stress Tests**
What happens if: (a) vacancy hits 20%? (b) interest rates rise 2%? (c) repair costs double? Can the deal survive?

**5. Exit Scenarios**
Value if sold in 3 years / 7 years assuming [3%] annual appreciation. Total return vs. alternative (index fund at 10%).

**6. Verdict:** Strong Buy / Buy / Negotiate / Pass — with the one most important reason`,
    tags: ['real estate', 'investment analysis', 'cash flow', 'cap rate', 'property'],
    rating: 4.9, copies: 27300, likes: 4200, aiTool: 'ChatGPT, Claude',
  },
  {
    id: 'fp-14b', catId: 'cat-14', featured: false,
    title: 'Short-Term Rental Optimizer',
    preview: 'Maximise Airbnb or VRBO revenue with a complete STR strategy — market analysis, pricing algorithm design, listing optimisation, guest experience system, and monthly revenue projections...',
    prompt: `You are a short-term rental (STR) expert who has optimised 100+ Airbnb/VRBO listings across [MARKET TYPE]. Build a complete STR optimisation strategy.

**My Property:**
- Location: [CITY, NEIGHBOURHOOD]
- Property Type: [ENTIRE HOME / APARTMENT / ROOM / UNIQUE STAY]
- Bedrooms / Bathrooms / Max Guests: [DETAILS]
- Unique Features: [POOL / HOT TUB / VIEWS / PROXIMITY TO ATTRACTIONS]
- Current Status: [NEW LISTING / EXISTING — current monthly revenue if applicable]
- My Goal: [$MONTHLY REVENUE or OCCUPANCY RATE TARGET]
- Self-Manage or Co-Host: [SELF / CONSIDERING CO-HOST / PROPERTY MANAGER]

Build a complete optimisation playbook:

**1. Market Analysis**
- Comparable properties (comp set) profile: what the top 10% of listings in my market look like
- Peak / shoulder / low season breakdown with typical revenue for each
- Realistic ADR (average daily rate) and occupancy rate targets for my property type

**2. Dynamic Pricing Strategy**
- Base price recommendation and how to set it
- Minimum night stay rules by season
- Last-minute discount triggers
- Gap-fill pricing logic
- Which pricing tool to use (Wheelhouse / PriceLabs / Beyond) and why

**3. Listing Optimisation**
- Title formula: [write me 3 optimised title options]
- The 5 photos that determine 80% of booking decisions and how to take/arrange them
- Description structure with the highest-converting flow
- Amenities to add that have the highest ROI under $500

**4. Guest Experience System**
- Pre-arrival message sequence (timing + content outline for each)
- House manual must-haves
- 5-star review generation strategy

**5. 12-Month Revenue Projection** — conservative / base / optimistic scenarios`,
    tags: ['Airbnb', 'STR', 'short-term rental', 'property management', 'real estate'],
    rating: 4.8, copies: 19100, likes: 2900, aiTool: 'Claude, ChatGPT',
  },

  /* ── 15  Energy & Infrastructure Systems ────────────────── */
  {
    id: 'fp-15a', catId: 'cat-15', featured: true,
    title: 'Solar Energy Project Planner',
    preview: 'Design a complete solar installation business case — system sizing, financial modelling, financing options, permitting checklist, contractor selection criteria, and 25-year ROI projection...',
    prompt: `You are a solar energy project developer with experience in [RESIDENTIAL / COMMERCIAL / UTILITY SCALE] solar across [REGION]. Design a complete solar project business case.

**My Project:**
- Property Type: [HOME / COMMERCIAL BUILDING / LAND FOR GROUND-MOUNT]
- Location: [CITY, STATE/COUNTRY — for irradiance and policy data]
- Current Electricity Bill: [$MONTHLY / KWH MONTHLY]
- Roof Area or Land Available: [SQ FT / ACRES]
- Primary Goal: [OFFSET BILL / NET ZERO / SELL POWER BACK / BACKUP POWER]
- Budget: [$] or [FINANCING PREFERRED]
- Grid Connection: [GRID-TIED / OFF-GRID / HYBRID with battery]

Deliver a complete project plan:

**1. System Sizing**
- Recommended system size in kW
- Estimated annual generation in kWh
- Percentage of current usage offset
- Panel count and space required

**2. Financial Model**
- Gross system cost estimate ($/W benchmark for my market)
- Available federal, state, and local incentives (as of [CURRENT YEAR])
- Net cost after incentives
- Annual electricity savings
- Simple payback period
- 25-year NPV and IRR
- Year-by-year cash flow table (Years 1, 5, 10, 15, 20, 25)

**3. Financing Options**
Compare: Cash purchase / Solar loan / Lease / PPA — pros, cons, and which suits my goal

**4. Battery Storage Decision**
Should I add storage? Cost/benefit analysis, recommended battery sizing if yes

**5. Implementation Roadmap**
- Permitting checklist for my jurisdiction
- Contractor selection criteria and questions to ask
- Installation timeline (weeks from contract to energisation)
- Monitoring setup recommendations`,
    tags: ['solar', 'renewable energy', 'clean energy', 'ROI', 'sustainability'],
    rating: 4.8, copies: 14200, likes: 2200, aiTool: 'ChatGPT, Claude',
  },
  {
    id: 'fp-15b', catId: 'cat-15', featured: false,
    title: 'Energy Efficiency Auditor',
    preview: 'Conduct a virtual energy audit of your home or building — identify the highest-ROI efficiency upgrades, calculate exact savings, and produce a prioritised implementation roadmap...',
    prompt: `You are a certified energy auditor (BPI/RESNET) with expertise in building science and energy efficiency. Conduct a comprehensive virtual energy audit.

**My Property:**
- Type: [SINGLE FAMILY HOME / APARTMENT / COMMERCIAL BUILDING / INDUSTRIAL]
- Size: [SQ FT / SQ M]
- Year Built: [YEAR]
- Climate Zone: [CITY, STATE/COUNTRY]
- Current Annual Energy Bill: [$] split [ELECTRICITY %] / [GAS %]
- Heating System: [TYPE + AGE — e.g., Gas furnace, 15 years old]
- Cooling System: [TYPE + AGE]
- Insulation (if known): [ATTIC / WALL / BASEMENT — R-value or "unknown"]
- Windows: [SINGLE / DOUBLE / TRIPLE pane, approximate age]
- Current Pain Points: [DRAFTY ROOMS / HIGH BILLS / UNEVEN TEMPERATURES / OTHER]
- Goals: [REDUCE BILLS / INCREASE COMFORT / PREPARE FOR SOLAR / ELECTRIFICATION]
- Budget for Upgrades: [$]

Conduct the full audit:

**1. Energy Loss Diagnosis** — ranked list of where energy is escaping based on my building profile, with % contribution to energy waste

**2. Upgrade Menu** — for each potential improvement:
   - Upgrade name and description
   - Estimated cost (materials + installation)
   - Annual energy savings (kWh and $)
   - Simple payback period
   - Available rebates/tax credits
   - ROI score (1-10)

**3. Prioritised Roadmap** — ordered by payback period and impact:
   - Immediate (DIY, under $500)
   - Short-term (under $5,000)
   - Major investments ($5,000+)

**4. Electrification Readiness** — if I want to remove fossil fuels, what's the correct upgrade sequence and panel upgrade requirements

**5. Rebate & Incentive Cheat Sheet** — federal and state programmes available for my upgrades`,
    tags: ['energy efficiency', 'audit', 'home upgrade', 'sustainability', 'savings'],
    rating: 4.7, copies: 8900, likes: 1400, aiTool: 'ChatGPT, Claude',
  },

  /* ── 16  Writing & Communication ────────────────────────── */
  {
    id: 'fp-16a', catId: 'legacy-writing', featured: true,
    title: 'Professional Email Composer',
    preview: 'Craft a high-impact professional email that achieves your specific goal — whether negotiating, requesting, persuading, or following up — with perfect tone and structure...',
    prompt: `You are an executive communication coach who has helped C-suite leaders and professionals master written communication. Write a high-impact professional email.

**Email Context:**
- My Role / Title: [YOUR POSITION]
- Recipient: [THEIR NAME, ROLE, AND MY RELATIONSHIP TO THEM — e.g., "my manager Sarah, who controls my promotion"]
- Primary Goal: [WHAT OUTCOME DO YOU WANT FROM THIS EMAIL? Be specific — "approval for a $50K budget increase"]
- Core Message: [IN 1-2 SENTENCES, WHAT DO I NEED TO SAY?]
- Tone Required: [ASSERTIVE / DIPLOMATIC / WARM / FORMAL / URGENT]
- Key Constraint: [MUST BE UNDER 200 WORDS / CANNOT MENTION X / DEADLINE IS Y]
- What Has Been Tried Before: [ANY PREVIOUS CONVERSATIONS OR EMAILS ON THIS TOPIC?]
- Stakes: [WHY DOES THIS EMAIL MATTER?]

Write 3 versions of this email:

**Version A — Direct:** Gets to the point in the first sentence. Best for busy executives.
**Version B — Relationship-First:** Opens with rapport before the ask. Best when the relationship needs warming.
**Version C — Problem-Solution:** Frames around a problem they care about. Best for persuasion.

For each version, include:
- Subject line (2 options: one safe, one bold)
- Full email body
- One-line explanation of the psychology behind this approach

Then recommend which version to send for my specific situation and why.`,
    tags: ['email', 'business writing', 'professional communication', 'persuasion'],
    rating: 4.9, copies: 47200, likes: 7100, aiTool: 'ChatGPT, Claude, Gemini',
  },
  {
    id: 'fp-16b', catId: 'legacy-writing', featured: false,
    title: 'Persuasive Essay & Argument Builder',
    preview: 'Build an airtight, persuasive argument on any topic — thesis construction, evidence hierarchy, counterargument handling, rhetorical devices, and a compelling conclusion...',
    prompt: `You are a master debater and rhetoric professor who has trained award-winning arguers. Build a complete persuasive essay and argument structure.

**My Position:** [STATE YOUR ARGUMENT OR THE SIDE YOU ARE ARGUING]
**Topic:** [THE FULL TOPIC OR QUESTION]
**Audience:** [WHO NEEDS TO BE PERSUADED — their likely starting belief and values]
**Purpose:** [ACADEMIC ESSAY / DEBATE / PRESENTATION / OPINION PIECE / LEGAL ARGUMENT]
**Length:** [WORD COUNT TARGET]
**Evidence Available:** [LIST ANY FACTS, STATISTICS, OR EXAMPLES YOU ALREADY HAVE]
**Strongest Opposing Argument:** [WHAT IS THE BEST ARGUMENT AGAINST YOUR POSITION?]

Build the complete persuasive case:

**1. Thesis Statement** — 3 versions: declarative, rhetorical question, and provocative claim. Recommend which to use.

**2. Argument Architecture** — the logical structure of the full argument:
- Claim 1 (strongest emotional appeal) + 3 pieces of supporting evidence ranked by persuasive power
- Claim 2 (strongest logical/statistical appeal) + evidence
- Claim 3 (values/identity appeal — why good people believe this) + evidence

**3. Counterargument Map** — for the top 3 opposing arguments: state it as strongly as possible, then provide the refutation

**4. Rhetorical Devices** — suggest where to deploy: anaphora, tricolon, anecdote, appeal to authority, concession-then-pivot

**5. Opening Hook** (3 options) — each using a different opener: story, statistic, question

**6. Closing Paragraph** — a memorable conclusion that ends on an action or vision, not a summary

**7. Full Draft** — assembled complete essay using the above structure`,
    tags: ['persuasion', 'essay writing', 'argument', 'rhetoric', 'debate'],
    rating: 4.7, copies: 19600, likes: 2900, aiTool: 'Claude, ChatGPT',
  },

  /* ── 17  Creative Writing & Fiction ─────────────────────── */
  {
    id: 'fp-17a', catId: 'legacy-creative', featured: true,
    title: 'Story World Builder',
    preview: 'Build a fully realized fictional world from scratch — geography, history, political systems, cultures, magic or technology rules, and the internal logic that makes it feel real...',
    prompt: `You are a master worldbuilder who has created immersive fictional universes. Build a fully realised world for my story.

**Story Brief:**
- Genre: [FANTASY / SCI-FI / DYSTOPIAN / HISTORICAL FICTION / CONTEMPORARY / HYBRID]
- Tone: [DARK & GRITTY / EPIC & HOPEFUL / COSY & MAGICAL / SATIRICAL / MYSTERIOUS]
- Central Conflict of the Story: [WHAT IS THE STORY ULTIMATELY ABOUT?]
- Protagonist Type: [A BRIEF DESCRIPTION — e.g., "a disillusioned soldier", "an AI discovering consciousness"]
- Elements I Know I Want: [LIST ANY SPECIFIC IDEAS YOU HAVE]
- Elements to Avoid: [OVERUSED TROPES OR THINGS YOU DON'T WANT]

Build the complete world:

**1. Geography & Environment**
- World overview (size, continents, key regions)
- 3 key locations that will appear in the story — name, physical description, atmosphere, why it matters narratively

**2. History & Mythology**
- The 3 historical events that shaped this world most profoundly
- The founding myth or creation story (2 versions — what people believe and what actually happened)
- Scars the past has left on the present

**3. Political & Social Systems**
- Who holds power and how (governments, factions, religion, corporations)
- Class structure and how it feels to live at each level
- The central injustice or tension in society that your story exploits

**4. Culture & Daily Life**
- What people eat, celebrate, fear, and believe
- 3 specific cultural details (traditions, phrases, customs) that make the world feel real
- Art, music, or stories that exist within your world

**5. Rules of Reality**
- Magic system / technology / special physics: the rules, costs, and limitations (Sanderson's Laws applied)
- What is possible and — crucially — what is impossible

**6. Narrative Hooks**
- 5 world-specific conflicts, mysteries, or questions your story can explore`,
    tags: ['worldbuilding', 'fantasy', 'sci-fi', 'creative writing', 'fiction'],
    rating: 4.9, copies: 35600, likes: 5600, aiTool: 'Claude, ChatGPT',
  },
  {
    id: 'fp-17b', catId: 'legacy-creative', featured: false,
    title: 'Character Development Coach',
    preview: 'Build a psychologically complex, three-dimensional character from the inside out — backstory, trauma, contradictions, voice, relationships, and the arc that makes readers care...',
    prompt: `You are a character development expert and narrative psychologist who helps writers create unforgettable characters. Build a fully realized character.

**Character Brief:**
- Story Role: [PROTAGONIST / ANTAGONIST / SUPPORTING — and their function in the plot]
- Genre: [GENRE OF YOUR STORY]
- Starting Situation: [WHERE ARE THEY AT THE BEGINNING OF THE STORY?]
- Ending Situation: [WHERE SHOULD THEY END UP — or "undecided"]
- One Trait I Know They Have: [ANY STARTING POINT]

Build the complete character:

**1. The Wound** — the single formative experience that shaped everything about this character. Not just what happened, but what they decided it meant, and the lie they've believed ever since.

**2. Contradictions** — 3 pairs of contradictory traits they hold simultaneously (e.g., deeply caring but unable to show vulnerability). Great characters contain contradiction.

**3. Desire vs. Need** — what they consciously WANT (outer goal) vs. what they unconsciously NEED (inner truth they must accept to grow or fail to grow)

**4. Backstory Architecture**
- Childhood in 5 sentences (the 2 most formative relationships)
- The moment that broke them / made them
- The coping mechanism they developed that once worked but now limits them

**5. Voice Profile**
- How they talk (vocabulary, sentence length, what they do when nervous)
- What they say vs. what they mean (subtext pattern)
- 5 sample lines of dialogue that could only come from this character

**6. Relationships Web** — their dynamic with 3 key characters in the story (how they push/pull each other's growth)

**7. Character Arc Outline** — the belief they hold at the start, the events that challenge it, and the moment of transformation (or tragic refusal to transform)`,
    tags: ['character development', 'fiction writing', 'storytelling', 'creative writing'],
    rating: 4.8, copies: 26400, likes: 4100, aiTool: 'Claude, ChatGPT',
  },

  /* ── 18  Education & Learning ───────────────────────────── */
  {
    id: 'fp-18a', catId: 'legacy-education', featured: true,
    title: 'Feynman Technique Teacher',
    preview: 'Understand any concept deeply using the Feynman Technique — explained at 5 progressive levels from ELI5 to expert, with analogies, common misconceptions, and mastery questions...',
    prompt: `You are a master teacher who specialises in making complex ideas crystal clear using the Feynman Technique and progressive disclosure learning.

**Concept I Want to Master:** [TOPIC OR CONCEPT]
**My Current Understanding:** [COMPLETE BEGINNER / I KNOW THE BASICS / INTERMEDIATE — describe what you already know]
**Why I'm Learning This:** [CONTEXT — career, curiosity, exam, application]
**Field / Domain:** [SUBJECT AREA]

Teach me this concept using 5 progressive levels:

**Level 1 — ELI5 (Explain Like I'm 5)**
Use a simple story or everyday metaphor a child could understand. No jargon whatsoever.

**Level 2 — The Non-Expert**
Assume I'm intelligent but have zero background in this field. Use analogies to things I already know.

**Level 3 — The Informed Layperson**
Introduce the proper terminology with brief definitions. Show how the pieces connect.

**Level 4 — The Practitioner**
How this actually works in practice. Edge cases, nuances, and exceptions to the simple rules.

**Level 5 — The Expert**
The deep structure, unresolved questions in the field, and what experts debate about this concept.

Then provide:

**The Misconception Trap:** The most common wrong understanding of this concept — and why it's wrong
**The Aha! Moment:** The single analogy or reframe that unlocks deep understanding for most people
**Mastery Test:** 5 questions — if I can answer all 5, I genuinely understand this concept
**What to Learn Next:** The 3 adjacent concepts that deepen understanding of this one`,
    tags: ['learning', 'feynman', 'education', 'explanation', 'mastery'],
    rating: 4.9, copies: 38100, likes: 5900, aiTool: 'Claude, ChatGPT, Gemini',
  },
  {
    id: 'fp-18b', catId: 'legacy-education', featured: false,
    title: 'Personalised Study Plan Generator',
    preview: 'Build a complete, science-backed study system for any subject or exam — spaced repetition schedule, active recall techniques, weekly calendar, and progress benchmarks...',
    prompt: `You are a learning scientist and academic coach specialising in evidence-based study systems. Build a complete study plan.

**My Study Goal:**
- Subject / Exam / Skill: [WHAT ARE YOU STUDYING?]
- Deadline: [EXAM DATE or GOAL DATE]
- Current Level: [BEGINNER / SOME KNOWLEDGE / INTERMEDIATE — what you know now]
- Target Level: [PASS EXAM / PROFESSIONAL COMPETENCY / MASTERY]
- Daily Time Available: [HOURS/DAY — and which days]
- Learning Style Preferences: [VISUAL / READING / PRACTICE PROBLEMS / VIDEO / MIXED]
- Past Study Struggles: [PROCRASTINATION / RETENTION / FOCUS / STAYING CONSISTENT / OTHER]
- Resources Available: [TEXTBOOKS / COURSES / VIDEOS / PRACTICE TESTS — list what you have]

Build a complete study system:

**1. Learning Architecture**
- Total hours needed estimate for my goal
- Phase breakdown: Foundation → Core → Mastery → Review
- Week-by-week topic progression map

**2. Spaced Repetition System**
- How to implement SR for this subject (Anki / physical cards / software recommendation)
- Review schedule: new card daily target + review time allocation
- What to put on each card for this specific subject

**3. Active Recall Strategy**
- The 3 best active recall techniques for this subject specifically
- How to use them in a study session (template session structure)

**4. Weekly Calendar Template**
- Day-by-day study schedule for a typical week
- How to distribute topic study vs. practice problems vs. review

**5. Progress Benchmarks**
- Measurable milestones at 25% / 50% / 75% / 100% of my timeline
- How to know if I'm on track vs. need to adjust

**6. Anti-Procrastination Protocol**
- Implementation intention for starting each session
- The minimum viable study session (for hard days)
- How to handle missed days without spiralling`,
    tags: ['studying', 'learning', 'exam prep', 'spaced repetition', 'education'],
    rating: 4.8, copies: 24700, likes: 3800, aiTool: 'ChatGPT, Claude',
  },

  /* ── 19  Productivity & Daily Life ──────────────────────── */
  {
    id: 'fp-19a', catId: 'legacy-general', featured: true,
    title: 'Productivity System Designer',
    preview: 'Build a complete personal productivity operating system — task capture, prioritisation framework, weekly review ritual, deep work blocks, and an energy management layer that fits your life...',
    prompt: `You are a productivity systems designer and executive coach who has helped 500+ high performers build sustainable workflows. Design my personal productivity operating system.

**My Situation:**
- Role / Work Type: [JOB TITLE / SOLOPRENEUR / STUDENT / OTHER]
- Biggest Time Sinks: [LIST WHERE YOUR TIME GOES THAT DOESN'T MOVE THE NEEDLE]
- Biggest Productivity Failure: [WHERE DO YOU CONSISTENTLY BREAK DOWN? — e.g., inbox zero obsession, constant context-switching, no system at all]
- Tools Currently Using: [NOTION / TODOIST / CALENDAR APP / PAPER / OTHER]
- Energy Pattern: [MORNING PERSON / NIGHT OWL / INCONSISTENT]
- Work Hours: [HOURS/DAY, DAYS/WEEK]
- Top Goal Right Now: [THE ONE THING YOU NEED TO MAKE PROGRESS ON MOST]

Design a complete productivity OS:

**1. Capture System** — single trusted inbox for all tasks, ideas, and commitments. How to capture on-the-go. Weekly processing ritual.

**2. Prioritisation Framework** — the exact decision matrix for what to do NOW, SCHEDULE, DELEGATE, or ELIMINATE. Applied to my work type.

**3. Daily Structure**
- Ideal day template: time blocks for deep work, admin, meetings, rest
- Morning activation routine (5-15 min — not 2 hours)
- Evening shutdown ritual to close loops and pre-load tomorrow

**4. Weekly Review System** — a 30-minute Sunday/Monday ritual to: clear inboxes, update projects, identify the Week's 3 Critical Outcomes, and block the calendar

**5. Deep Work Protocol** — how to protect and maximise focus blocks: environment design, app blocking, communication norms, session warm-up technique

**6. Energy Management Layer** — how to align task type (creative / analytical / administrative) with energy level throughout the day

**7. Implementation Plan** — don't change everything at once. Which ONE element to install first, and the trigger to add the next layer.`,
    tags: ['productivity', 'time management', 'systems', 'deep work', 'GTD'],
    rating: 4.9, copies: 41300, likes: 6400, aiTool: 'ChatGPT, Claude, Gemini',
  },
  {
    id: 'fp-19b', catId: 'legacy-general', featured: false,
    title: 'Decision Framework Builder',
    preview: 'Build a rigorous decision-making framework for any important choice — criteria weighting, option scoring, second-order consequences, reversibility analysis, and regret minimisation...',
    prompt: `You are a decision scientist and strategic advisor who specialises in high-stakes personal and professional decisions. Build a rigorous framework for my decision.

**My Decision:**
[DESCRIBE THE DECISION YOU NEED TO MAKE IN AS MUCH DETAIL AS POSSIBLE — the options, the stakes, the timeline, what you've already considered]

**Context:**
- Decision Type: [CAREER / FINANCIAL / RELATIONSHIP / BUSINESS / MAJOR PURCHASE / LIFE DIRECTION]
- Stakes: [LOW / MEDIUM / HIGH / IRREVERSIBLE]
- Timeline: [WHEN MUST THIS BE DECIDED?]
- Who Else Is Affected: [LIST PEOPLE AND HOW THEY ARE IMPACTED]
- What I Am Leaning Toward: [YOUR GUT INSTINCT — and what's driving it]
- What Is Holding Me Back: [FEARS, UNCERTAINTY, OR CONFLICTING VALUES]

Build a complete decision framework:

**1. Decision Clarification** — restate the real decision I'm facing (it may not be what I described — the stated decision is often not the actual decision)

**2. Option Generation** — am I considering all real options? Suggest 2-3 alternatives I may not have considered, including "do nothing" and hybrid options

**3. Criteria Weighting Matrix**
- Identify the 5-7 criteria that matter most for this decision
- Assign weights (must sum to 100%)
- Score each option 1-10 on each criterion
- Calculate weighted total — does the "winner" match my gut? If not, why not?

**4. Second-Order Consequences**
- For my top 2 options: what happens in 1 year, 5 years, 10 years if I choose each?
- What do the people closest to me think? (even if I disagree — name their likely perspective)

**5. Reversibility Test** — can this be undone? If yes, the cost of being wrong is lower. If no, what is the minimum viable test before full commitment?

**6. Regret Minimisation** — Bezos Framework: which choice will 80-year-old me regret more?

**7. Recommended Decision** — my assessment of what you should do and why, based on all of the above`,
    tags: ['decision making', 'frameworks', 'productivity', 'strategy', 'clarity'],
    rating: 4.8, copies: 29800, likes: 4600, aiTool: 'Claude, ChatGPT',
  },

];

