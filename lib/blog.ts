import type { Faq } from './services'

/**
 * Blog posts live here as typed data, like services and case studies.
 * Body text supports **bold**, [links](/path) and `code` inline.
 */

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'ul' | 'ol'; items: string[] }
  | { t: 'quote'; text: string; by?: string }
  | { t: 'callout'; title: string; text: string; tone?: 'tip' | 'warn' }
  | { t: 'table'; head: string[]; rows: string[][]; caption?: string }
  | { t: 'stats'; items: { v: string; l: string }[] }
  | { t: 'cta'; title: string; text: string; href: string; label: string }

export type Category = 'Pricing' | 'Automation' | 'Voice AI'

export type Post = {
  slug: string
  title: string
  /** One or two sentences: card text, meta description and article lede. */
  excerpt: string
  category: Category
  /** ISO date (YYYY-MM-DD). */
  date: string
  updated?: string
  /** Big word on the generated cover art. */
  coverWord: string
  /** Short line set beside the big word, so the cover reads on its own. */
  coverLine: string
  /** Optional topic illustration on the cover. */
  art?: 'wave'
  tone: 'cobalt' | 'ink' | 'signal'
  /** Service the post leads into. */
  service: string
  keywords: string[]
  body: Block[]
  faqs?: Faq[]
}

export const categories: Category[] = ['Pricing', 'Automation', 'Voice AI']

export const posts: Post[] = [
  {
    slug: 'ai-chatbot-cost-india',
    title: 'How much does an AI chatbot cost in India in 2026?',
    excerpt:
      'A straight answer with real ranges: what you pay to build a business chatbot, what it costs to run every month, and the five things that move the price.',
    category: 'Pricing',
    date: '2026-10-25',
    coverWord: '₹3–6L',
    coverLine: 'What a business AI chatbot really costs to build in India',
    tone: 'cobalt',
    service: 'ai-chatbot-development',
    keywords: ['AI chatbot cost India', 'chatbot development cost', 'WhatsApp chatbot price', 'AI chatbot for business India'],
    body: [
      {
        t: 'p',
        text: 'Short answer: a focused AI chatbot that answers from your own documents and hands over to a human usually costs **₹3–6 lakh** to build in India (roughly US$4k–8k), plus a monthly running cost that depends on how many conversations it handles. A simple FAQ widget can cost less; a multi-language bot wired into your CRM, payments and WhatsApp costs more.',
      },
      { t: 'p', text: 'This guide breaks that number down so you can sanity-check any quote you receive — including ours.' },
      {
        t: 'stats',
        items: [
          { v: '₹3–6L', l: 'typical build, focused chatbot' },
          { v: '2–4 wks', l: 'to go live on your site' },
          { v: 'Monthly', l: 'running cost that scales with usage' },
        ],
      },
      { t: 'h2', text: 'What you are actually paying for' },
      { t: 'p', text: 'A production chatbot is more than a prompt on top of ChatGPT. The build cost covers five pieces of work:' },
      {
        t: 'ol',
        items: [
          '**Knowledge setup** — collecting your FAQs, policies, product data and PDFs, cleaning them and making them searchable, so answers come from your content and not the model’s imagination.',
          '**Conversation design** — what the bot should and should not answer, its tone, fallbacks, and exactly when it hands over to a person.',
          '**Integrations** — the website widget, WhatsApp, your CRM (Zoho, HubSpot, Salesforce), order or booking lookups, and lead capture into Google Sheets.',
          '**Admin dashboard** — conversation logs, unanswered questions, cost per conversation, and a way for your team to update content without a developer.',
          '**Testing and guardrails** — an evaluation set of real customer questions, checks for wrong or risky answers, and load testing before launch.',
        ],
      },
      { t: 'h2', text: 'Typical price ranges' },
      {
        t: 'table',
        head: ['What you need', 'Typical build cost', 'Timeline'],
        rows: [
          ['FAQ bot on your website that answers from your documents', '₹1–3 lakh', '1–2 weeks'],
          ['Lead-qualifying chatbot with CRM and WhatsApp hand-off', '₹3–6 lakh', '2–4 weeks'],
          ['Multi-language bot with order or booking lookups and payments', '₹6–12 lakh', '4–8 weeks'],
          ['AI agent that takes actions across several systems', '₹10 lakh+', '6+ weeks'],
        ],
        caption: 'Indicative ranges for India-based engineering. The exact number depends on scope and is fixed after a free scoping call.',
      },
      { t: 'h2', text: 'The monthly running cost' },
      { t: 'p', text: 'Once the bot is live, you pay for three things every month:' },
      {
        t: 'ul',
        items: [
          '**AI model usage** — charged per token by OpenAI, Anthropic or Google. For most business chatbots this is the smallest line on the bill at moderate volume.',
          '**Hosting and database** — servers, the vector database that stores your knowledge, and logs.',
          '**WhatsApp messaging**, if you use it — Meta charges per message for business-initiated templates, while replies inside the customer-service window cost less. Check Meta’s current rate card for your category.',
        ],
      },
      {
        t: 'callout',
        tone: 'tip',
        title: 'Ask for the cost per conversation',
        text: 'A good vendor estimates what each conversation costs before launch and shows it in the dashboard after. If nobody can tell you that number up front, the running bill will surprise you.',
      },
      { t: 'h2', text: 'Five things that move the price' },
      { t: 'h3', text: '1. Where the answers come from' },
      {
        t: 'p',
        text: 'Ten clean FAQs are cheap. Two thousand pages of PDFs, spreadsheets and old emails take real work to clean, split and keep up to date — and that work decides whether the bot is accurate.',
      },
      { t: 'h3', text: '2. How many channels' },
      { t: 'p', text: 'A website widget is one build. Adding WhatsApp, Instagram or an in-app chat each adds integration, testing and edge cases.' },
      { t: 'h3', text: '3. Languages' },
      {
        t: 'p',
        text: 'Hindi, English and the Hinglish your customers actually type need separate testing. Bilingual bots cost a little more and are usually worth it in India.',
      },
      { t: 'h3', text: '4. Actions, not just answers' },
      {
        t: 'p',
        text: 'Answering “what are your timings?” is simple. Checking an order, rescheduling a booking or creating a ticket means secure connections to your systems — that is where most of the budget goes.',
      },
      { t: 'h3', text: '5. How wrong is too wrong' },
      {
        t: 'p',
        text: 'A café can live with an occasional odd reply. A clinic, lender or insurer cannot. Stricter guardrails, approvals and audit logs add cost and are non-negotiable in regulated work.',
      },
      { t: 'h2', text: 'How to keep the cost down' },
      {
        t: 'ul',
        items: [
          '**Start with one workflow** — the question your team answers fifty times a day — and prove it before adding more.',
          '**Reuse what you have.** Existing FAQs, policies and product sheets are the fastest training material.',
          '**Launch on one channel**, usually WhatsApp or the website, then expand.',
          '**Use the right model for each step.** Not every reply needs the most expensive model.',
          '**Insist on a fixed price** for a clearly written scope, paid by milestone.',
        ],
      },
      { t: 'h2', text: 'Chatbot or something simpler?' },
      {
        t: 'p',
        text: 'Sometimes a well-structured FAQ page, a form or a WhatsApp quick reply beats an AI chatbot. We will tell you when that is the case — it is one of the [principles we work by](/about).',
      },
      {
        t: 'cta',
        title: 'Get a fixed quote for your chatbot',
        text: '30 minutes with an engineer. You leave with a rough plan, a price range and an honest view on whether AI is the right tool.',
        href: '/contact',
        label: 'Book a free scoping call',
      },
    ],
    faqs: [
      {
        q: 'Can I build an AI chatbot for free?',
        a: 'No-code tools let you build a basic bot for free or a small monthly fee. For a business chatbot that answers reliably from your own data, hands over to your team and connects to your CRM or WhatsApp, expect a one-time build cost plus monthly running costs.',
      },
      { q: 'How long does it take to build?', a: 'A focused chatbot on one channel is usually live in 2–4 weeks. Multi-channel, multi-language bots with system integrations take 4–8 weeks.' },
      { q: 'Who owns the chatbot after it is built?', a: 'You should. With Trident Square the code lives in your repository from day one and full IP transfers to you on payment.' },
      { q: 'Do you build chatbots in Hindi?', a: 'Yes. We build bilingual Hindi–English bots and test them on the Hinglish customers actually type.' },
    ],
  },
  {
    slug: 'whatsapp-automation-for-business',
    title: 'WhatsApp automation for business: a practical guide for Indian SMEs',
    excerpt:
      'What you can automate on WhatsApp, the difference between the Business app and the official platform, what it costs, and how to start without getting your number banned.',
    category: 'Automation',
    date: '2026-10-25',
    coverWord: 'WA',
    coverLine: 'Automate the WhatsApp chats that eat your team’s day',
    tone: 'signal',
    service: 'business-process-automation',
    keywords: ['WhatsApp automation for business', 'WhatsApp Business API India', 'WhatsApp chatbot for SME', 'WhatsApp CRM integration'],
    body: [
      {
        t: 'p',
        text: 'Your customers already message you on WhatsApp. The problem is what happens next: someone on your team reads it, replies by hand, copies the details into Excel or the CRM, and forgets to follow up on Friday. Multiply that by a few hundred chats a week and you are paying a salary for copy-paste.',
      },
      {
        t: 'p',
        text: 'WhatsApp automation fixes the boring part. Messages get answered, sorted and logged automatically, and your team only steps in where a human actually helps.',
      },
      { t: 'h2', text: 'Business app or Business Platform?' },
      { t: 'p', text: 'There are two official ways to use WhatsApp for business, and they are built for different jobs.' },
      {
        t: 'table',
        head: ['', 'WhatsApp Business app', 'WhatsApp Business Platform (API)'],
        rows: [
          ['Best for', 'A shop owner or small team on a few phones', 'Teams, higher volume and real automation'],
          ['Automation', 'Greeting, away and quick-reply messages', 'Full chatbots, CRM sync, triggered updates'],
          ['Team inbox', 'Limited linked devices', 'Many agents on one shared inbox'],
          ['Bulk updates', 'Broadcast lists, with limits', 'Approved template messages at scale'],
          ['Cost', 'Free', 'Per-message fees from Meta, plus setup and hosting'],
        ],
        caption: 'Automation in this guide means the Business Platform, the only official way to connect WhatsApp to your systems.',
      },
      {
        t: 'callout',
        tone: 'warn',
        title: 'Avoid unofficial WhatsApp “automation” tools',
        text: 'Tools that drive a normal WhatsApp account through WhatsApp Web or a modified app break WhatsApp’s terms. Numbers get banned, often without warning — and that is usually the number your customers know. Use the official Business Platform.',
      },
      { t: 'h2', text: 'What you can automate' },
      { t: 'h3', text: 'Lead capture and qualification' },
      {
        t: 'p',
        text: 'A new enquiry gets an instant reply, a few qualifying questions (budget, city, requirement), a row in your CRM or Google Sheet, and an alert to the right salesperson. No lead waits until Monday.',
      },
      { t: 'h3', text: 'Order, booking and payment updates' },
      {
        t: 'p',
        text: 'Order confirmations, shipping updates from Shiprocket, Razorpay payment links and booking reminders go out the moment something changes in your system.',
      },
      { t: 'h3', text: 'Support triage' },
      {
        t: 'p',
        text: 'A bot answers the common questions from your own documents and hands everything else to a person with the full conversation attached.',
      },
      { t: 'h3', text: 'Alerts people actually read' },
      {
        t: 'p',
        text: 'For [Gigtap](/work/gigtap), job seekers get WhatsApp alerts for new nearby jobs — far more of them see it there than in an email or an app notification.',
      },
      { t: 'h2', text: 'How it works under the hood' },
      {
        t: 'ol',
        items: [
          '**Business verification** — your business is verified with Meta and a phone number is registered on the Business Platform.',
          '**Message templates** — any message you send first (reminders, updates, offers) is submitted to Meta for approval.',
          '**A webhook** — every incoming message is sent to your server or an automation tool like n8n or Make.',
          '**Your logic** — rules or an AI model decide the reply, and the data is written to your CRM, Sheet or database.',
          '**Hand-off** — a shared inbox lets your team take over any chat with the full history.',
        ],
      },
      { t: 'h2', text: 'What it costs' },
      {
        t: 'ul',
        items: [
          '**Meta’s message fees** — charged per message and priced by category (marketing, utility, authentication) and country. Replies inside the customer-service window cost less. Rates change, so check Meta’s current pricing page.',
          '**Setup and build** — business verification, templates, the automation itself and the CRM integration. A focused first flow is usually live in 2–3 weeks.',
          '**Running costs** — hosting, and AI model usage if a chatbot answers questions.',
        ],
      },
      { t: 'h2', text: 'Start with one flow' },
      {
        t: 'p',
        text: 'Pick the single conversation your team handles most — usually new enquiries or order status — automate it end to end, and measure two numbers: response time and how many chats needed a human. Then add the next flow.',
      },
      {
        t: 'cta',
        title: 'Automate your first WhatsApp flow',
        text: 'Tell us which chat eats your team’s day. We will map it and give you a fixed quote.',
        href: '/services/business-process-automation',
        label: 'See business automation',
      },
    ],
    faqs: [
      {
        q: 'Is the WhatsApp Business API free?',
        a: 'Access to the platform is free, but Meta charges per message based on category and country, and you pay for setup and hosting. Replies inside the customer-service window cost less than messages you start.',
      },
      {
        q: 'Can I use my existing business number?',
        a: 'Usually yes. The number is registered on the Business Platform; depending on your setup you may be able to keep using the WhatsApp Business app alongside it. We check eligibility before migrating.',
      },
      { q: 'Will my number get banned?', a: 'Not if you use the official Business Platform, send approved templates and only message people who opted in. Bans mostly hit unofficial tools and spammy bulk messaging.' },
      { q: 'Can the bot reply in Hindi?', a: 'Yes. Templates and bot replies can be in Hindi, English or both, and AI replies handle Hinglish well when tested properly.' },
    ],
  },
  {
    slug: 'what-is-a-voice-ai-agent',
    title: 'What is a voice AI agent, and when is it worth it?',
    excerpt:
      'How AI phone agents work, what they are good and bad at, real results from two deployments, and a checklist to decide whether your business needs one.',
    category: 'Voice AI',
    date: '2026-10-25',
    coverWord: 'Hello?',
    coverLine: 'AI that picks up the phone — and when it is worth it',
    art: 'wave',
    tone: 'ink',
    service: 'voice-ai-agents',
    keywords: ['voice AI agent', 'AI calling agent India', 'AI phone agent', 'Hindi voice bot', 'AI receptionist'],
    body: [
      {
        t: 'p',
        text: 'A voice AI agent is software that makes and answers phone calls and holds a natural conversation — understanding what the caller says, looking things up in your systems, and replying out loud in under two seconds. Think of it as an IVR that actually listens, instead of “press 1 for bookings”.',
      },
      {
        t: 'stats',
        items: [
          { v: '<2s', l: 'reply time on our deployments' },
          { v: '24/7', l: 'calling capacity' },
          { v: '2', l: 'languages — Hindi and English' },
        ],
      },
      { t: 'h2', text: 'How a voice agent works' },
      {
        t: 'ol',
        items: [
          '**Telephony** — the call comes in or goes out through a provider like Twilio or Exotel, on a normal phone number.',
          '**Speech-to-text** — the caller’s voice is turned into text in real time.',
          '**The brain** — a language model reads the text with your knowledge base and business rules, and decides what to say or do: confirm a booking, answer a question, escalate.',
          '**Text-to-speech** — the reply is spoken back in a natural voice.',
          '**Actions and logs** — results are written to your CRM or dashboard, and a human is pulled in when needed.',
        ],
      },
      { t: 'p', text: 'All of that has to happen fast. If the agent takes four seconds to answer, callers start talking over it — which is why latency is the first thing we engineer for.' },
      { t: 'h2', text: 'Two real deployments' },
      { t: 'h3', text: 'InstaBus: calling every passenger' },
      {
        t: 'p',
        text: 'The operator’s team was manually calling hundreds of passengers per route to confirm bookings, share boarding details and collect feedback. An outbound voice agent now calls passengers in their language before, during and after travel, with a call-status dashboard per route. Result: **50% faster passenger onboarding** and round-the-clock calling capacity. [Read the case study](/work/instabus).',
      },
      { t: 'h3', text: 'ARIA: a hotel front desk that never sleeps' },
      {
        t: 'p',
        text: 'Front desks get the same calls all night — towels, check-out times, restaurant hours. ARIA answers them over the phone, logs requests and routes them to the right department: **60% less front-desk call load** and **94% guest satisfaction**, with replies in under two seconds.',
      },
      { t: 'h2', text: 'When a voice agent is worth it' },
      {
        t: 'ul',
        items: [
          '**High volume, repetitive calls** — confirmations, reminders, status updates, first-level support.',
          '**A clear outcome per call** — confirmed, rescheduled, interested, escalated.',
          '**Customers who prefer calls to apps** — very common in India, especially outside metros.',
          '**Calls outside office hours** that currently go unanswered.',
        ],
      },
      { t: 'h2', text: 'When it is not' },
      {
        t: 'ul',
        items: [
          '**Low call volume** — if you get ten calls a day, a person is cheaper and better.',
          '**Complex or emotional conversations** — complaints, negotiations, sensitive health or money matters still need a human.',
          '**No system to connect to** — if bookings live in a notebook, digitise that first.',
        ],
      },
      {
        t: 'callout',
        tone: 'warn',
        title: 'Follow the calling rules',
        text: 'In India, promotional calls fall under TRAI’s commercial communication rules. Calling your own customers about their booking is very different from cold-calling a list. Design the use case with that line in mind.',
      },
      { t: 'h2', text: 'What it costs to run' },
      {
        t: 'p',
        text: 'Running cost is usually a few rupees per minute, covering telephony, speech and model usage. We estimate the per-minute cost during scoping, so you can compare it with what the same calls cost today. A pilot on a live number typically takes 3–4 weeks.',
      },
      { t: 'h2', text: 'A checklist before you start' },
      {
        t: 'ol',
        items: [
          'Write down the top five reasons people call you, and how many calls each gets per week.',
          'Pick one that is high volume and has a clear yes/no outcome.',
          'List the information the agent needs — and where it lives today.',
          'Decide when a human must take over, and who that human is.',
          'Agree the success metric before building: answer rate, time saved or conversions.',
        ],
      },
      {
        t: 'cta',
        title: 'Pilot a voice agent on a live number',
        text: 'Three to four weeks from scoping to real calls, with a per-minute cost estimate up front.',
        href: '/services/voice-ai-agents',
        label: 'See voice AI agents',
      },
    ],
    faqs: [
      { q: 'Does a voice AI agent work in Hindi?', a: 'Yes. Our agents handle Hindi and English, and we test them with real callers’ accents and code-switching before going live.' },
      { q: 'Will callers know they are talking to AI?', a: 'They should. We recommend the agent introduces itself as an assistant and offers a human at any point — it builds trust and avoids frustration.' },
      { q: 'Can it transfer the call to a person?', a: 'Yes. The agent escalates in real time based on rules you set, and passes the conversation summary to your staff.' },
      { q: 'How much does a voice agent cost to run?', a: 'Usually a few rupees per minute including telephony, speech and model usage. We give you a per-minute estimate during scoping.' },
    ],
  },
  {
    slug: 'app-development-cost-india',
    title: 'How much does it cost to build a mobile app in India in 2026?',
    excerpt:
      'Real price ranges for Android and iOS apps, from a simple business app to a full marketplace — plus the running costs nobody quotes and how to avoid paying twice.',
    category: 'Pricing',
    date: '2026-10-29',
    coverWord: '₹5–12L',
    coverLine: 'What a startup or business app really costs to build in India',
    tone: 'ink',
    service: 'mobile-app-development',
    keywords: [
      'app development cost India',
      'mobile app development cost',
      'cost to build an app in India',
      'Android app development cost',
      'app banwane ka kharcha',
    ],
    body: [
      {
        t: 'p',
        text: 'Short answer: a solid first version of a business or startup app — Android and iOS, with login, a backend, payments and an admin panel — usually costs **₹5–12 lakh** to build in India (roughly US$6k–15k) and takes **8–14 weeks**. A simple app with a handful of screens can cost less. A two-sided marketplace or an app with AI at its core costs more.',
      },
      {
        t: 'p',
        text: 'Quotes for the “same” app can range from ₹50,000 to ₹50 lakh, which tells you the quotes are not for the same app. This guide shows what goes into the number, so you can compare quotes properly — including ours.',
      },
      {
        t: 'stats',
        items: [
          { v: '₹5–12L', l: 'typical first version, Android + iOS' },
          { v: '8–14 wks', l: 'from design to store launch' },
          { v: '15–20%', l: 'of build cost per year to run and maintain' },
        ],
      },
      { t: 'h2', text: 'Typical price ranges' },
      {
        t: 'table',
        head: ['Type of app', 'Typical build cost', 'Timeline'],
        rows: [
          ['Simple business app: catalogue, enquiry form, login, basic admin', '₹2–5 lakh', '4–8 weeks'],
          ['Startup MVP: user accounts, core feature, payments, notifications, admin panel', '₹5–12 lakh', '8–12 weeks'],
          ['Marketplace or booking app: two user types, chat, payments, ratings, tracking', '₹12–25 lakh', '12–20 weeks'],
          ['AI-first or large platform: AI chat, voice or image features, many integrations', '₹20 lakh+', '16+ weeks'],
        ],
        caption: 'Indicative ranges for India-based engineering with one codebase for Android and iOS. Your exact price is fixed after scoping.',
      },
      {
        t: 'callout',
        tone: 'warn',
        title: 'Why the ₹50,000 app quote is rarely ₹50,000',
        text: 'Very low quotes usually mean a reskinned template, no backend you own, or a scope so vague that every real feature becomes a “change request”. Ask what is not included before you compare prices.',
      },
      { t: 'h2', text: 'What you are actually paying for' },
      { t: 'p', text: 'An app is not just the screens you see. Every quote should cover these six pieces of work:' },
      {
        t: 'ol',
        items: [
          '**Product scoping** — turning your idea into a written feature list, user flows and a clear “version 1” so nothing important is guessed later.',
          '**UI/UX design** — every screen, empty state and error, designed for real phones and real users, not just the happy path.',
          '**The app itself** — one codebase for Android and iOS in React Native or Flutter, built so it feels native on both.',
          '**Backend and admin panel** — the server, database, login, payments and the dashboard your team uses to manage users, orders and content.',
          '**Testing** — on low-end Android phones and slow networks, not only on the developer’s new iPhone.',
          '**Store launch** — Play Store and App Store listings, screenshots, review guidelines and fixes for rejections, published under your own developer accounts.',
        ],
      },
      { t: 'h2', text: 'Six things that move the price' },
      { t: 'h3', text: '1. Number of user types' },
      {
        t: 'p',
        text: 'An app for one kind of user is one product. A marketplace — customers and service providers, or riders and drivers — is really two apps plus an admin panel, and the price reflects that.',
      },
      { t: 'h3', text: '2. Payments and money flows' },
      {
        t: 'p',
        text: 'Taking a single payment through Razorpay is quick. Wallets, refunds, subscriptions, commissions and payouts to vendors need careful logic and testing, because mistakes cost real money.',
      },
      { t: 'h3', text: '3. Real-time features' },
      { t: 'p', text: 'Chat, live location tracking and instant updates need extra infrastructure and are among the most expensive features to get right.' },
      { t: 'h3', text: '4. Integrations' },
      {
        t: 'p',
        text: 'Every connection to something outside the app — WhatsApp, a CRM, a logistics partner, Aadhaar or KYC checks, your existing ERP — adds build and testing time.',
      },
      { t: 'h3', text: '5. AI features' },
      {
        t: 'p',
        text: 'A chatbot that answers from your documents, voice input in Hindi, or AI image generation can be the reason users choose your app. They also add a monthly usage cost, which a good team estimates before you build. We have shipped all three in apps like [NowoChat](/work/nowochat) and [Trendify](/work/trendify).',
      },
      { t: 'h3', text: '6. Who your users are' },
      {
        t: 'p',
        text: 'Apps for first-time smartphone users need larger buttons, local languages, small download sizes and offline handling. For [Gigtap](/work/gigtap) we designed the job app for workers on low-end Android phones who prefer Hindi — that care is part of the cost, and it is why people actually use the app.',
      },
      { t: 'h2', text: 'The running costs nobody quotes' },
      { t: 'p', text: 'The build is a one-time cost. After launch you will pay every year for:' },
      {
        t: 'ul',
        items: [
          '**Store accounts** — Google Play charges a one-time US$25 registration fee; Apple charges US$99 a year.',
          '**Hosting and database** — from a few thousand rupees a month for a new app, growing with your users.',
          '**Third-party services** — SMS OTPs, maps, push notifications, email and AI model usage, mostly charged per use.',
          '**Maintenance** — Android and iOS update every year, and your app must keep up. Budget around **15–20% of the build cost per year** for updates, fixes and small improvements.',
        ],
      },
      { t: 'h2', text: 'Freelancer, agency or in-house team?' },
      {
        t: 'table',
        head: ['', 'Freelancer', 'Agency', 'In-house team'],
        rows: [
          ['Cost', 'Lowest', 'Medium', 'Highest (salaries before launch)'],
          ['Design, backend and app together', 'Rarely one person', 'Yes', 'Only after you hire all roles'],
          ['If someone leaves', 'Project stalls', 'Team covers', 'You rehire'],
          ['Best for', 'Small, well-defined tasks', 'First version and fast launch', 'After product–market fit'],
        ],
      },
      {
        t: 'p',
        text: 'Whoever you choose, insist on two things: the code lives in **your** repository from day one, and the app is published under **your** store accounts. Founders who skip this end up paying twice when they change vendors.',
      },
      { t: 'h2', text: 'How to keep the cost down' },
      {
        t: 'ul',
        items: [
          '**Launch one core feature first.** Write down the one thing users must be able to do, build that well, and add the rest after real feedback.',
          '**Use one codebase.** React Native or Flutter gives you Android and iOS for a little more than the price of one.',
          '**Start on Android if your users are in India.** Most Indian users are on Android; iOS can follow a few weeks later from the same code.',
          '**Use a web admin panel**, not a second app, for your team.',
          '**Ask for a fixed price** on a written scope, paid by milestone, so you only pay for work you can see.',
        ],
      },
      { t: 'h2', text: 'Questions to ask before you sign' },
      {
        t: 'ol',
        items: [
          'Can I see two apps you have built that are live on the store today?',
          'Is the price fixed for this scope, and what counts as a change request?',
          'Who owns the code, the designs and the store accounts?',
          'What happens after launch — who fixes bugs, and for how long?',
          'What will it cost per month to run at 1,000 and at 10,000 users?',
        ],
      },
      {
        t: 'p',
        text: 'If a team cannot answer these clearly, the cheapest quote will not stay cheap. See the [apps we have shipped](/work) and [how we build mobile apps](/services/mobile-app-development).',
      },
      {
        t: 'cta',
        title: 'Get a fixed quote for your app',
        text: '30 minutes with an engineer. Share your idea and leave with a version-1 feature list, a price range and a timeline.',
        href: '/contact',
        label: 'Book a free scoping call',
      },
    ],
    faqs: [
      {
        q: 'How much does it cost to make an app in India?',
        a: 'A simple business app usually costs ₹2–5 lakh. A startup MVP with login, payments and an admin panel usually costs ₹5–12 lakh, and marketplace or booking apps ₹12–25 lakh. The exact price depends on features, integrations and design.',
      },
      {
        q: 'How long does it take to build an app?',
        a: 'A simple app takes 4–8 weeks. A full first version for Android and iOS usually takes 8–14 weeks from design to store launch.',
      },
      {
        q: 'Is it cheaper to build only an Android app?',
        a: 'Slightly. With React Native or Flutter, one codebase covers both platforms, so adding iOS costs much less than building a second app. Many Indian startups launch on Android first and add iOS from the same code.',
      },
      {
        q: 'What are the monthly costs after the app is live?',
        a: 'Hosting, SMS and other services usually start at a few thousand rupees a month and grow with users. Plan around 15–20% of the build cost per year for maintenance and updates.',
      },
      {
        q: 'Who owns the app after it is built?',
        a: 'You should. With Trident Square the code lives in your repository from day one, the app is published under your store accounts, and full IP transfers to you on payment.',
      },
    ],
  },
]

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

/** Newest first. */
export function sortedPosts() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function headings(post: Post) {
  return post.body.filter((b): b is Extract<Block, { t: 'h2' }> => b.t === 'h2').map((b) => ({ id: slugify(b.text), text: b.text }))
}

const strip = (s: string) => s.replace(/\*\*|`|\[([^\]]+)\]\([^)]+\)/g, '$1')

export function readingMinutes(post: Post) {
  const text = post.body
    .map((b) => {
      if ('text' in b) return b.text
      if ('items' in b) return b.items.map((i) => (typeof i === 'string' ? i : `${i.v} ${i.l}`)).join(' ')
      if (b.t === 'table') return [...b.head, ...b.rows.flat()].join(' ')
      return ''
    })
    .join(' ')
  return Math.max(1, Math.round(strip(text).split(/\s+/).length / 220))
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00+05:30`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })
}
