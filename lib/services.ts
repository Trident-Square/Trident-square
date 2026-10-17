export type Faq = { q: string; a: string }

export type GroupId = 'talks' | 'thinks' | 'ships' | 'base'

/** The trident: three prongs plus the shaft. Every service belongs to one. */
export const groups: { id: GroupId; n: string; verb: string; title: string; line: string }[] = [
  { id: 'talks', n: '01', verb: 'Talks', title: 'Conversational AI', line: 'AI that speaks to your customers' },
  { id: 'thinks', n: '02', verb: 'Thinks', title: 'AI & automation', line: 'Systems that do the work for you' },
  { id: 'ships', n: '03', verb: 'Ships', title: 'Software products', line: 'Software your business runs on' },
  { id: 'base', n: '04', verb: 'Base', title: 'Design & cloud', line: 'The shaft that holds it all' },
]

export type Service = {
  slug: string
  group: GroupId
  name: string
  /** Short noun used in cards and menus */
  short: string
  /** One-line promise shown under the name in menus */
  hook: string
  metaTitle: string
  metaDescription: string
  h1: string
  lede: string
  body: string[]
  /** What the client walks away with */
  deliverables: string[]
  useCases: { title: string; text: string }[]
  stack: string[]
  timeline: string
  faqs: Faq[]
  work: string[]
  keywords: string[]
}

const allServices: Service[] = [
  {
    slug: 'ai-agent-development',
    group: 'thinks',
    name: 'AI Agent Development',
    short: 'AI agents & automation',
    hook: 'Agents that act inside your tools',
    metaTitle: 'AI Agent Development Company in India',
    metaDescription:
      'We build production AI agents that read, decide and act inside your tools — CRM, WhatsApp, email, ERP. LLM agents, RAG and workflow automation from Noida, India.',
    h1: 'AI agents that do the work, not just the talking',
    lede:
      'We design and ship AI agents that plug into the systems you already run — your CRM, inbox, WhatsApp, sheets and internal APIs — and take real actions with guardrails, logs and a human in the loop where it matters.',
    body: [
      'Most “AI projects” stall at the demo. The hard part is everything after: connecting the agent to live data, making it reliable on messy inputs, deciding when it should hand off to a person, and proving it saves time. That is the part we specialise in.',
      'We start with one workflow that costs you hours every week — lead qualification, support triage, document processing, scheduling — map it step by step, then build an agent that handles it end to end. You get evaluation sets, cost tracking per run and an admin view, so you can see exactly what the agent did and why.',
    ],
    deliverables: [
      'Workflow audit and an agent design you can read in one page',
      'Tool-calling agent connected to your APIs, CRM and messaging channels',
      'Retrieval (RAG) over your documents with source citations',
      'Evaluation suite, guardrails and human-handoff rules',
      'Admin dashboard: conversations, actions, cost per run',
      'Deployment on your cloud or ours, with monitoring',
    ],
    useCases: [
      { title: 'Lead qualification', text: 'Agent replies to inbound leads in seconds, asks the right questions and books qualified calls into your calendar.' },
      { title: 'Support triage', text: 'Reads tickets and chats, answers from your knowledge base, escalates edge cases with full context.' },
      { title: 'Back-office automation', text: 'Extracts data from invoices, forms and PDFs, validates it and pushes it into your ERP or sheets.' },
      { title: 'Internal copilots', text: 'Lets your team query company data in plain language — orders, inventory, policies — with permissions.' },
    ],
    stack: ['OpenAI', 'Anthropic Claude', 'Gemini', 'LangGraph', 'Python', 'Node.js', 'PostgreSQL + pgvector', 'n8n', 'AWS'],
    timeline: 'First working agent in 3–5 weeks',
    faqs: [
      { q: 'How much does it cost to build an AI agent?', a: 'A focused agent for one workflow typically starts around ₹3–6 lakh (US$4k–8k) for the first production version. Multi-agent systems with several integrations cost more. Running costs (model usage and hosting) are estimated up front and shown per run in the dashboard.' },
      { q: 'Which AI model do you use?', a: 'Whichever fits the job. We benchmark OpenAI, Claude and Gemini on your real data and pick on accuracy, latency and cost. The agent is built so the model can be swapped later without a rewrite.' },
      { q: 'Is our data safe?', a: 'Your data stays in your accounts where possible. We use providers that do not train on API data, restrict the agent to the permissions it needs and log every action for audit.' },
      { q: 'What happens when the agent is unsure?', a: 'It hands off. Every agent we ship has explicit confidence thresholds and escalation rules — to a person on WhatsApp, email or your helpdesk — with the full conversation attached.' },
    ],
    work: ['gigtap', 'nowochat', 'instabus'],
    keywords: ['AI agent development company', 'AI automation agency India', 'LLM agent development', 'RAG development', 'AI workflow automation'],
  },
  {
    slug: 'voice-ai-agents',
    group: 'talks',
    name: 'Voice AI Agents',
    short: 'Voice AI agents',
    hook: 'Calls in Hindi & English, 24/7',
    metaTitle: 'Voice AI Agent Development — Hindi & English',
    metaDescription:
      'Phone and in-app voice AI agents that answer, call and follow up 24/7 in Hindi, English and regional languages. Built on Twilio, Exotel and modern speech models.',
    h1: 'Voice agents that pick up on the first ring — in Hindi and English',
    lede:
      'We build voice AI agents that make and take real phone calls: booking confirmations, reminders, feedback, support and lead follow-up. They speak naturally, switch languages mid-call and hand over to your team when needed.',
    body: [
      'Voice is where AI saves the most staff time, and where bad builds are most obvious. Latency over a second feels robotic; a wrong accent model breaks trust. We tune the full pipeline — telephony, speech-to-text, the language model and text-to-speech — for sub-two-second responses on Indian networks.',
      'Our voice agents have run for hotels, bus operators and hiring platforms: confirming bookings before travel, collecting post-trip feedback, guiding job seekers through forms by voice. Every call is recorded, transcribed and summarised into your dashboard or CRM.',
    ],
    deliverables: [
      'Call flows designed with your operations team',
      'Inbound and outbound calling on Twilio, Exotel or Plivo',
      'Multilingual speech (Hindi, English, Hinglish and more)',
      'Live transfer to a human with call context',
      'Call logs, transcripts and summaries in a dashboard',
      'Campaign scheduler for bulk outbound calls',
    ],
    useCases: [
      { title: 'Booking confirmation', text: 'Calls every customer before departure or check-in, confirms details and updates your system.' },
      { title: 'Receptionist & concierge', text: 'Answers guest and customer calls 24/7, handles FAQs and requests, routes the rest.' },
      { title: 'Feedback collection', text: 'Calls after service, asks a short survey in the customer’s language and flags unhappy customers instantly.' },
      { title: 'Voice-guided forms', text: 'Lets users with low literacy fill applications by speaking, inside your app or on a call.' },
    ],
    stack: ['Twilio', 'Exotel', 'Deepgram', 'ElevenLabs', 'Gemini', 'OpenAI Realtime', 'Python', 'WebRTC'],
    timeline: 'Pilot on a live number in 3–4 weeks',
    faqs: [
      { q: 'Can the voice agent speak Hindi?', a: 'Yes. Our agents handle Hindi, English and mixed Hinglish, and we can add Tamil, Telugu, Marathi, Bengali and other languages supported by current speech models.' },
      { q: 'How natural does it sound?', a: 'We target under two seconds between the caller finishing and the agent replying, use natural voices and let callers interrupt. We share sample calls before you go live.' },
      { q: 'What does a voice AI agent cost to run?', a: 'Running cost is usually a few rupees per minute including telephony, speech and model usage. We give you a per-minute estimate during scoping.' },
    ],
    work: ['instabus', 'aria-voice-agent', 'ai-voice-form-assistant'],
    keywords: ['voice AI agent development', 'AI calling agent India', 'Hindi voice bot', 'AI receptionist', 'voice bot development company'],
  },
  {
    slug: 'ai-chatbot-development',
    group: 'talks',
    name: 'AI Chatbot Development',
    short: 'AI chatbots',
    hook: 'Website & WhatsApp bots on your data',
    metaTitle: 'AI Chatbot Development for Website & WhatsApp',
    metaDescription:
      'Custom AI chatbots for websites, apps and WhatsApp that answer from your own documents, capture leads and hand off to humans. GPT, Claude and Gemini based.',
    h1: 'Chatbots trained on your business, not the whole internet',
    lede:
      'We build AI chatbots for your website, app and WhatsApp that answer from your documents, catalogue and policies — and say “I’ll connect you to the team” instead of making things up.',
    body: [
      'A good chatbot is mostly good retrieval. We clean and structure your content, index it properly and make the bot cite where every answer came from, so your team can trust it and fix gaps fast.',
      'Bots can also act: capture lead details into your CRM, check an order status, book a slot or create a ticket. Everything is visible in a dashboard with conversation history and unanswered questions.',
    ],
    deliverables: [
      'Knowledge base ingestion: PDFs, docs, website, sheets',
      'Web widget, in-app chat and WhatsApp Business integration',
      'Lead capture and CRM sync',
      'Answer citations and confidence-based handoff',
      'Analytics: top questions, gaps, conversions',
    ],
    useCases: [
      { title: 'Website sales assistant', text: 'Answers product and pricing questions and collects qualified leads around the clock.' },
      { title: 'WhatsApp support', text: 'Handles order status, FAQs and complaints on the channel your customers already use.' },
      { title: 'Document Q&A', text: 'Lets staff or customers upload documents and ask questions with precise, cited answers.' },
    ],
    stack: ['OpenAI', 'Claude', 'Gemini', 'WhatsApp Cloud API', 'Next.js', 'pgvector', 'Pinecone'],
    timeline: 'Live on your site in 2–4 weeks',
    faqs: [
      { q: 'Will the chatbot make up answers?', a: 'We design against it. The bot answers only from your approved sources, shows citations and hands off when confidence is low.' },
      { q: 'Can it work on WhatsApp?', a: 'Yes, through the official WhatsApp Business (Cloud) API, including templates for follow-ups and notifications.' },
      { q: 'Can we update what it knows?', a: 'Yes. Upload new documents or connect a source like Google Drive or Notion and the bot re-indexes automatically.' },
    ],
    work: ['nowochat', 'gigtap'],
    keywords: ['AI chatbot development company', 'WhatsApp chatbot development', 'custom GPT chatbot', 'RAG chatbot'],
  },
  {
    slug: 'custom-software-development',
    group: 'ships',
    name: 'Custom Software Development',
    short: 'Custom software',
    hook: 'CRMs, ERPs, SaaS & MVPs',
    metaTitle: 'Custom Software Development Company in Noida',
    metaDescription:
      'Custom CRMs, ERPs, internal tools, SaaS products and MVPs built around how your business actually works. Fixed-scope or dedicated team, from Noida, India.',
    h1: 'Software shaped around how your business actually runs',
    lede:
      'When off-the-shelf tools force you into spreadsheets and workarounds, we build the system you actually need — CRMs, ERPs, portals, internal tools and SaaS products — with AI built in where it pays off.',
    body: [
      'We begin with a short discovery sprint: interviews with the people who will use the software, a map of the current process and a prioritised scope with a fixed estimate. You see clickable designs before a line of production code is written.',
      'Then we ship in weekly increments you can log in to and test. Code is documented, tested and handed over in your repository, so you are never locked in to us.',
    ],
    deliverables: [
      'Discovery sprint with scope, estimate and clickable prototype',
      'Role-based web app with admin panel',
      'Integrations: payments, accounting, messaging, third-party APIs',
      'Automated tests, CI/CD and cloud deployment',
      'Documentation and full source-code handover',
      'Support and maintenance plans after launch',
    ],
    useCases: [
      { title: 'MVPs for startups', text: 'Go from idea to a launchable product in 8–12 weeks with room to scale.' },
      { title: 'CRM & sales tools', text: 'Pipelines, follow-ups and reporting built around your sales process.' },
      { title: 'Operations & ERP', text: 'Inventory, orders, field teams and approvals in one system instead of ten sheets.' },
      { title: 'Customer portals', text: 'Self-serve dashboards for your clients, vendors or partners.' },
    ],
    stack: ['Next.js', 'React', 'Node.js', 'NestJS', 'Python', 'Django', 'PostgreSQL', 'AWS', 'Docker'],
    timeline: 'MVP in 8–12 weeks',
    faqs: [
      { q: 'How much does custom software cost in India?', a: 'A focused MVP usually falls between ₹4–15 lakh (US$5k–18k) depending on scope and integrations. We give a fixed quote after a short discovery sprint.' },
      { q: 'Do we own the code?', a: 'Yes. Code lives in your repository from day one and full IP is transferred on payment.' },
      { q: 'Fixed price or hourly?', a: 'Both. Fixed scope works best for well-defined projects; a dedicated monthly team suits evolving products.' },
    ],
    work: ['gigtap', 'instabus', 'trendify'],
    keywords: ['custom software development company Noida', 'MVP development India', 'CRM development', 'ERP development company', 'software development company India'],
  },
  {
    slug: 'web-development',
    group: 'ships',
    name: 'Web Development',
    short: 'Web apps & websites',
    hook: 'Fast, SEO-ready sites & web apps',
    metaTitle: 'Web Development Company in Noida — Next.js & React',
    metaDescription:
      'Fast, SEO-ready websites, web apps and e-commerce built with Next.js and React. Core Web Vitals, CMS, payments and analytics included.',
    h1: 'Websites and web apps that load fast and rank',
    lede:
      'We build marketing sites, web applications and e-commerce stores on Next.js and React — fast on mobile, structured for search engines and easy for your team to update.',
    body: [
      'Speed and structure decide whether people stay and whether Google ranks you. Every site we ship passes Core Web Vitals, uses semantic HTML and structured data, and comes with analytics wired up from day one.',
      'For web apps we handle the full stack: authentication, dashboards, payments, APIs and the admin tools your team needs to run things without calling a developer.',
    ],
    deliverables: [
      'Responsive design and development',
      'Technical SEO: metadata, schema, sitemap, Core Web Vitals',
      'Headless CMS so your team edits content',
      'Payments, e-commerce and checkout (Razorpay, Stripe, Shopify)',
      'Analytics and conversion tracking',
    ],
    useCases: [
      { title: 'Company & marketing sites', text: 'Lead-focused sites with clear messaging, fast pages and proper tracking.' },
      { title: 'SaaS web apps', text: 'Dashboards, billing, roles and integrations for your product.' },
      { title: 'E-commerce', text: 'Shopify or custom storefronts with Razorpay/Stripe and inventory sync.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Sanity', 'Shopify', 'Vercel'],
    timeline: 'Sites in 3–6 weeks, web apps in 8+ weeks',
    faqs: [
      { q: 'Will my website be SEO friendly?', a: 'Yes. We handle technical SEO — page speed, metadata, structured data, sitemaps and clean URLs — and set up Search Console and analytics.' },
      { q: 'Can I edit the site myself?', a: 'Yes. We connect a headless CMS so your team can edit pages, blogs and products without code.' },
    ],
    work: ['gigtap', 'gamecam'],
    keywords: ['web development company Noida', 'Next.js development company', 'website development India', 'ecommerce website development'],
  },
  {
    slug: 'mobile-app-development',
    group: 'ships',
    name: 'Mobile App Development',
    short: 'iOS & Android apps',
    hook: 'iOS & Android, one codebase',
    metaTitle: 'Mobile App Development Company — iOS & Android',
    metaDescription:
      'Cross-platform iOS and Android apps in React Native and Flutter, from design to Play Store and App Store launch, with AI features built in.',
    h1: 'iOS and Android apps, from first sketch to store launch',
    lede:
      'We design and build cross-platform mobile apps in React Native and Flutter — one codebase, native feel, shipped to the Play Store and App Store with analytics and crash reporting in place.',
    body: [
      'We have shipped consumer apps with AI image generation, document chat and hiring flows used by blue-collar workers on low-end Android phones. That means designing for slow networks, small screens and first-time smartphone users as well as power users.',
      'We take care of the unglamorous parts too: push notifications, deep links, in-app purchases, store listings and review guidelines.',
    ],
    deliverables: [
      'UX flows and high-fidelity app design',
      'React Native or Flutter app for iOS and Android',
      'Backend APIs, auth and push notifications',
      'In-app AI features: chat, voice, image generation',
      'Play Store and App Store submission',
    ],
    useCases: [
      { title: 'Consumer apps', text: 'Social, lifestyle and creator apps with AI features users come back for.' },
      { title: 'Marketplace apps', text: 'Two-sided apps for jobs, services or bookings with chat and payments.' },
      { title: 'Companion apps', text: 'Mobile access to your existing platform for customers or field staff.' },
    ],
    stack: ['React Native', 'Expo', 'Flutter', 'Firebase', 'Node.js', 'Supabase'],
    timeline: 'Store-ready v1 in 10–14 weeks',
    faqs: [
      { q: 'React Native or Flutter?', a: 'Both are excellent. We recommend React Native when you also have a React web app (shared code and team) and Flutter for graphics-heavy apps.' },
      { q: 'Do you publish the app to the stores?', a: 'Yes, under your developer accounts, including store listing copy and screenshots.' },
    ],
    work: ['trendify', 'nowochat', 'gigtap'],
    keywords: ['mobile app development company Noida', 'React Native development company', 'Flutter app development India', 'Android app development'],
  },
  {
    slug: 'ui-ux-design',
    group: 'base',
    name: 'UI/UX Design',
    short: 'Product design',
    hook: 'Research, prototypes, design systems',
    metaTitle: 'UI/UX Design Agency for SaaS & AI Products',
    metaDescription:
      'Product design for SaaS, AI and mobile apps: research, flows, prototypes and design systems your developers can build from.',
    h1: 'Product design that makes complex things feel obvious',
    lede:
      'AI and SaaS products fail when users do not understand them. We design flows, interfaces and design systems that make powerful features easy to use — and hand them to engineers in a form they can build exactly.',
    body: [
      'We work in short loops: understand the user and the job, sketch flows, test a clickable prototype with real people, refine. Visual polish comes after the structure works.',
      'Because we also build software, our designs come with states, edge cases and components already thought through, which saves weeks in development.',
    ],
    deliverables: [
      'User interviews and journey mapping',
      'Information architecture and user flows',
      'Clickable Figma prototypes',
      'Design system and component library',
      'Developer-ready specs and handoff',
    ],
    useCases: [
      { title: 'AI product UX', text: 'Interfaces for chat, agents and generated content that users trust.' },
      { title: 'Redesigns', text: 'Modernise an existing product without losing what users rely on.' },
      { title: 'Design systems', text: 'A consistent component library that speeds up every future feature.' },
    ],
    stack: ['Figma', 'FigJam', 'Framer', 'Storybook', 'Tailwind CSS'],
    timeline: 'Prototype in 2–4 weeks',
    faqs: [
      { q: 'Can you design only, without development?', a: 'Yes. Many clients hire us for design and build with their own team; we stay available during development for questions.' },
    ],
    work: ['trendify', 'gamecam'],
    keywords: ['UI UX design agency India', 'SaaS product design', 'AI UX design', 'mobile app design company'],
  },
  {
    slug: 'business-process-automation',
    group: 'thinks',
    name: 'Business Process Automation',
    short: 'Workflow automation',
    hook: 'CRM, ERP, Tally, WhatsApp on autopilot',
    metaTitle: 'Business Process Automation Company in India',
    metaDescription:
      'End-to-end automation systems for operations, sales, finance and HR — connecting your CRM, ERP, Tally, WhatsApp, email and sheets so work moves without manual copy-paste.',
    h1: 'Automation systems that take the busywork off your team',
    lede:
      'We automate the repetitive work that eats your team’s week — order processing, invoicing, approvals, reporting, follow-ups, data entry — by connecting the tools you already pay for and adding AI where judgement is needed.',
    body: [
      'Every business has a dozen workflows where someone copies data from one screen to another: a new order becomes an invoice, a WhatsApp enquiry becomes a CRM entry, a PDF becomes a row in Tally. Each one is small. Together they cost you a full-time salary and a steady stream of mistakes.',
      'We map those workflows, rank them by hours saved, and build automations that run reliably — with retries, alerts when something breaks, and a dashboard that shows exactly what ran. Simple flows run on n8n, Make or Zapier; complex ones get custom code and AI steps for reading documents and making decisions.',
    ],
    deliverables: [
      'Process audit with hours-saved estimate per workflow',
      'Integrations across CRM, ERP, Tally, Zoho, HubSpot, Shopify, WhatsApp, email and sheets',
      'AI steps for reading invoices, forms, emails and PDFs',
      'Approval flows, alerts and exception handling',
      'Automated reports and dashboards',
      'Monitoring, logs and a runbook your team can follow',
    ],
    useCases: [
      { title: 'Order to invoice', text: 'New orders create invoices, update stock, notify the customer on WhatsApp and post to accounting automatically.' },
      { title: 'Lead routing', text: 'Leads from ads, website and WhatsApp land in your CRM, get scored and assigned, and receive an instant first reply.' },
      { title: 'Document processing', text: 'Invoices, KYC documents and purchase orders are read by AI, validated and pushed into your systems.' },
      { title: 'Reporting', text: 'Daily sales, cash and operations reports compiled and sent to your inbox or WhatsApp every morning.' },
    ],
    stack: ['n8n', 'Make', 'Zapier', 'Python', 'Node.js', 'Zoho', 'HubSpot', 'Tally', 'WhatsApp API', 'Google Workspace'],
    timeline: 'First automations live in 2–3 weeks',
    faqs: [
      { q: 'What business processes can you automate?', a: 'Almost anything that follows rules: order processing, invoicing, payment follow-ups, lead routing, onboarding, approvals, inventory updates, HR paperwork and reporting. If a person copies data between tools, it can usually be automated.' },
      { q: 'Do we need to change our existing software?', a: 'Usually not. We connect the tools you already use — CRM, ERP, Tally, Shopify, Google Sheets, WhatsApp — through their APIs or, where none exist, through careful scripted access.' },
      { q: 'n8n, Zapier or custom code?', a: 'We pick per workflow. No-code tools are fast and cheap for simple flows; custom code is better for high volume, complex logic or sensitive data. Many systems mix both.' },
      { q: 'What happens when an automation fails?', a: 'It retries, then alerts the right person with the details. Every run is logged so you can see what happened and replay it.' },
    ],
    work: ['instabus', 'gigtap'],
    keywords: ['business process automation company India', 'workflow automation services', 'n8n automation agency', 'RPA services India', 'Zoho automation', 'Tally automation'],
  },
  {
    slug: 'ecommerce-development',
    group: 'ships',
    name: 'E-commerce Development',
    short: 'Online stores',
    hook: 'Shopify, WooCommerce & custom',
    metaTitle: 'E-commerce Website Development — Shopify & Custom',
    metaDescription:
      'Shopify, WooCommerce and custom e-commerce stores with Razorpay/Stripe, inventory sync, WhatsApp order updates and automation built in.',
    h1: 'Online stores that sell — and run themselves',
    lede:
      'We build e-commerce stores on Shopify, WooCommerce or fully custom stacks, then wire them into your inventory, accounting, shipping and WhatsApp so orders flow without manual work.',
    body: [
      'A store is more than a theme. Conversion depends on speed, product pages and a checkout that works on every phone; profit depends on what happens after the order — stock, invoices, shipping labels, returns and customer updates.',
      'We handle both: a fast, search-friendly storefront and the automations behind it, so a growing order volume doesn’t mean a growing back office.',
    ],
    deliverables: [
      'Storefront design and development',
      'Payments: Razorpay, Stripe, PayU, COD',
      'Shipping integrations: Shiprocket, Delhivery and more',
      'Inventory, ERP and accounting sync',
      'WhatsApp and email order notifications',
      'SEO, analytics and conversion tracking',
    ],
    useCases: [
      { title: 'D2C brands', text: 'Fast Shopify or headless stores with subscriptions, bundles and reviews.' },
      { title: 'B2B ordering', text: 'Wholesale portals with customer-specific pricing, credit limits and bulk ordering.' },
      { title: 'Marketplace sync', text: 'One inventory across your store, Amazon and Flipkart.' },
    ],
    stack: ['Shopify', 'WooCommerce', 'Next.js', 'Medusa', 'Razorpay', 'Stripe', 'Shiprocket'],
    timeline: 'Store live in 4–8 weeks',
    faqs: [
      { q: 'Shopify or custom?', a: 'Shopify is the fastest route for most D2C brands. Custom or headless builds make sense for complex B2B pricing, very high traffic or unusual product logic.' },
      { q: 'Can you migrate our existing store?', a: 'Yes — products, customers, orders and URLs, with redirects so you keep your search rankings.' },
    ],
    work: ['trendify', 'gigtap'],
    keywords: ['ecommerce website development company India', 'Shopify development agency', 'WooCommerce developer', 'headless ecommerce'],
  },
  {
    slug: 'cloud-devops',
    group: 'base',
    name: 'Cloud & DevOps',
    short: 'Cloud & DevOps',
    hook: 'AWS & GCP, CI/CD, lower bills',
    metaTitle: 'Cloud & DevOps Services — AWS, GCP, Azure',
    metaDescription:
      'Cloud architecture, CI/CD, monitoring and cost optimisation on AWS, Google Cloud and Azure — so your software stays fast, secure and affordable.',
    h1: 'Infrastructure that stays up and stays cheap',
    lede:
      'We set up and run the cloud behind your product — deployments, databases, monitoring, backups and security — and keep the monthly bill in check.',
    body: [
      'Most cloud bills are 30–50% higher than they need to be, and most outages come from manual deployments. We automate releases, right-size infrastructure and add the monitoring that tells you about problems before your customers do.',
      'Whether you are launching a new product or untangling an existing setup, you get infrastructure as code, documentation and a clear handover.',
    ],
    deliverables: [
      'Cloud architecture on AWS, GCP or Azure',
      'CI/CD pipelines and zero-downtime deploys',
      'Monitoring, alerting and uptime dashboards',
      'Backups, disaster recovery and security hardening',
      'Cloud cost review and optimisation',
    ],
    useCases: [
      { title: 'Launch setup', text: 'Production-ready infrastructure for a new product, done right the first time.' },
      { title: 'Cost cutting', text: 'Audit and right-size an existing setup to lower the monthly bill.' },
      { title: 'Managed operations', text: 'We watch, patch and scale your infrastructure on a monthly plan.' },
    ],
    stack: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Vercel'],
    timeline: 'Audit in 1 week',
    faqs: [
      { q: 'Can you reduce our cloud bill?', a: 'Usually, yes. A one-week audit identifies idle resources, oversized instances and cheaper pricing options, with an estimated monthly saving for each.' },
    ],
    work: ['gamecam', 'gigtap'],
    keywords: ['cloud devops services India', 'AWS consulting company', 'DevOps outsourcing', 'cloud cost optimization'],
  },
]

const groupOrder: GroupId[] = ['talks', 'thinks', 'ships', 'base']

/** Services in trident order, so every list on the site reads prong by prong. */
export const services = [...allServices].sort((a, b) => groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group))

export function getService(slug: string) {
  return services.find((s) => s.slug === slug)
}

export function servicesIn(group: GroupId) {
  return services.filter((s) => s.group === group)
}
