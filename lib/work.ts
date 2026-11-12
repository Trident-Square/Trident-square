export type Project = {
  slug: string
  name: string
  client: string
  industry: string
  services: string[]
  year: string
  summary: string
  challenge: string
  solution: string[]
  results: { value: string; label: string }[]
  stack: string[]
  /** Poster frame taken from the real product recording */
  poster?: string
  /** Short silent loop for cards */
  loop?: string
  /** Full demo recording */
  demo?: string
  orientation: 'landscape' | 'portrait'
  links?: { label: string; url: string }[]
  /** Live products we can show in a frame on the case-study page */
  live?: { site?: string; app?: string }
  /** Screenshot of the live site, shown until the visitor loads the frame */
  livePoster?: string
  /** Project-specific showcase section rendered on the case-study page */
  showcase?: 'richlook'
}

export const projects: Project[] = [
  {
    slug: 'rich-look-laminates',
    name: 'Rich Look Laminates',
    client: 'Rich Look Laminates',
    industry: 'Building materials · B2B',
    services: ['custom-software-development', 'business-process-automation', 'web-development', 'mobile-app-development', 'ui-ux-design'],
    year: '2026',
    summary:
      'Dealer platform for a laminates brand — website, partner app for dealers and staff, admin panel and WhatsApp automation — fixed, completed and launched.',
    challenge:
      'Rich Look’s dealer platform was already built, but it wasn’t working for the people who used it every day. Some dealers logged in and saw no data, staff couldn’t sign in with their own numbers, people were logged out in the middle of an order, screens were slow, and order alerts never reached WhatsApp.',
    solution: [
      'Took over the website, the Partner App and the Admin Panel, diagnosed every issue with real dealer, staff and admin logins, and fixed it all in a preview copy before anything went live.',
      'Dealer accounts that simply work: a set-new-password flow, WhatsApp OTP reset, and every dealer sees only their own stock, orders, ledger and invoices.',
      'WhatsApp automation on the Meta Cloud API: a PDF order slip to the party and the admin team on every order, plus OTPs, stock-available and cancellation messages.',
      'Accounts inside the app: ledgers imported from Tally for two companies, invoices and credit notes read straight from PDF and shareable on WhatsApp.',
      'Stock reserved first-come, first-served from the live stock sheet, with the party told the moment their stock arrives.',
      'Admin tools to delete a single invoice, schedule in-app pop-ups and manage WhatsApp numbers — plus a new cream-and-brown app theme, faster pages and Google indexing for all 110 design pages.',
    ],
    results: [
      { value: '42', label: 'items shipped — 18 quoted, 12 extra, go-live fixes' },
      { value: '0.66 s', label: 'Order Status load, down from 0.95 s' },
      { value: '110', label: 'design pages now in Google’s sitemap' },
    ],
    stack: ['React', 'React Router', 'Node.js', 'PocketBase', 'WhatsApp Cloud API', 'Google Sheets API', 'PDF parsing', 'Hostinger'],
    poster: '/work/richlook.jpg',
    loop: '/work/richlook-loop.mp4',
    orientation: 'landscape',
    links: [
      { label: 'richlooklaminates.com', url: 'https://richlooklaminates.com/' },
      { label: 'Partner portal', url: 'https://partner.richlooklaminates.com/' },
    ],
    live: { site: 'https://richlooklaminates.com/', app: 'https://partner.richlooklaminates.com/' },
    livePoster: '/work/richlook.jpg',
    showcase: 'richlook',
  },
  {
    slug: 'gigtap',
    name: 'Gigtap',
    client: 'Gigtap',
    industry: 'Hiring & HR tech',
    services: ['ai-agent-development', 'ai-chatbot-development', 'web-development', 'mobile-app-development'],
    year: '2025',
    summary: 'AI hiring platform connecting India’s blue- and grey-collar workers with verified nearby jobs.',
    challenge:
      'Most job platforms assume users are comfortable typing long forms in English. Gigtap’s users are security guards, delivery riders and factory workers — often first-time smartphone users who prefer Hindi and WhatsApp.',
    solution: [
      'Bilingual AI assistant that walks job seekers through sign-up, profile creation and applications in Hindi or English.',
      'AI job matching on skills, location and shift preferences, with WhatsApp alerts for new nearby jobs.',
      'Employer dashboard for posting jobs, screening applicants and tracking hires.',
      'Web app plus Android app published on the Play Store.',
    ],
    results: [
      { value: '3×', label: 'faster hiring for employers' },
      { value: '2', label: 'languages, one assistant' },
      { value: 'Web + Android', label: 'shipped together' },
    ],
    stack: ['Next.js', 'React Native', 'Node.js', 'OpenAI', 'WhatsApp API', 'PostgreSQL'],
    poster: '/work/gigtap.jpg',
    loop: '/work/gigtap-loop.mp4',
    demo: '/project/gigtap.mp4',
    orientation: 'landscape',
    links: [
      { label: 'gigtap.in', url: 'https://gigtap.in/' },
      { label: 'Play Store', url: 'https://play.google.com/store/search?q=gigtap&c=apps&hl=en_IN' },
    ],
    live: { site: 'https://gigtap.in/' },
    livePoster: '/work/gigtap-live.jpg',
  },
  {
    slug: 'instabus',
    name: 'InstaBus',
    client: 'InstaBus',
    industry: 'Travel & mobility',
    services: ['voice-ai-agents', 'custom-software-development'],
    year: '2025',
    summary: 'AI voice concierge that calls every bus passenger from booking confirmation to post-trip feedback.',
    challenge:
      'The operator’s team was manually calling hundreds of passengers per route to confirm bookings, share boarding details and collect feedback — slow, inconsistent and impossible to scale.',
    solution: [
      'Outbound voice agent that calls passengers in their language before, during and after travel.',
      'Call-status dashboard per route: confirmed, pending, failed, escalated.',
      'Real-time escalation to staff when a passenger needs a human.',
      'Feedback calls summarised automatically for the operations team.',
    ],
    results: [
      { value: '50%', label: 'faster passenger onboarding' },
      { value: '24/7', label: 'calling capacity' },
      { value: 'Multi', label: 'lingual conversations' },
    ],
    stack: ['Twilio', 'Gemini', 'Python', 'React', 'PostgreSQL'],
    poster: '/work/instabus.jpg',
    loop: '/work/instabus-loop.mp4',
    demo: '/project/Instabus vdo.mp4',
    orientation: 'landscape',
    links: [{ label: 'instabus.co.in', url: 'https://instabus.co.in/' }],
    live: { site: 'https://instabus.co.in/' },
    livePoster: '/work/instabus-live.jpg',
  },
  {
    slug: 'gamecam',
    name: 'Gamecam',
    client: 'Gamecam',
    industry: 'Sports analytics',
    services: ['ai-agent-development', 'web-development', 'ui-ux-design'],
    year: '2025',
    summary: 'Computer-vision analytics for padel: scores, rallies, shot types and per-player stats from match video.',
    challenge:
      'Padel clubs and players wanted professional-level match stats without wearables or manual tagging — just from a single court camera.',
    solution: [
      'Vision pipeline that tracks four players and the ball, detecting shots, rallies and scoring.',
      'Per-player performance breakdowns and match timelines.',
      'Web app for clubs and players to review matches and share highlights.',
    ],
    results: [
      { value: '4', label: 'players tracked at once' },
      { value: 'Live', label: 'score and shot detection' },
      { value: '0', label: 'wearables needed' },
    ],
    stack: ['Python', 'OpenCV', 'YOLO', 'React', 'Node.js'],
    poster: '/work/gamecam.jpg',
    loop: '/work/gamecam-loop.mp4',
    demo: '/project/padel_ai.mp4',
    orientation: 'landscape',
  },
  {
    slug: 'nowochat',
    name: 'NowoChat',
    client: 'NowoChat',
    industry: 'Productivity',
    services: ['ai-chatbot-development', 'mobile-app-development'],
    year: '2025',
    summary: 'Mobile assistant that lets people upload documents and get cited, context-aware answers in seconds.',
    challenge:
      'Users needed answers buried inside long PDFs and documents on their phones, without copying text into a generic chatbot that loses context.',
    solution: [
      'Document upload and retrieval pipeline with answers grounded in the source.',
      'Conversational memory across a session, with multi-document support.',
      'Clean mobile chat UI built for one-handed use.',
    ],
    results: [
      { value: 'Multi', label: 'document conversations' },
      { value: 'Cited', label: 'answers from source' },
      { value: 'iOS + Android', label: 'one codebase' },
    ],
    stack: ['React Native', 'OpenAI', 'Node.js', 'Vector search'],
    poster: '/work/nowochat.jpg',
    loop: '/work/nowochat-loop.mp4',
    demo: '/project/nowochat.mp4',
    orientation: 'portrait',
  },
  {
    slug: 'trendify',
    name: 'Trendify',
    client: 'Trendify',
    industry: 'Consumer AI',
    services: ['mobile-app-development', 'ui-ux-design'],
    year: '2025',
    summary: 'AI image app that turns curated prompts into one-tap viral styles, resume photos and event themes.',
    challenge:
      'Great AI images need great prompts. Most people don’t know how to write them — they just want the look they saw on Instagram.',
    solution: [
      'Prompt library managed by the Trendify team and exposed as one-tap styles.',
      'Guided “create” flow: pick a style, add a photo, tweak mood and weather.',
      'Admin tools to launch new trending styles without an app update.',
    ],
    results: [
      { value: '50+', label: 'styles at launch' },
      { value: '1 tap', label: 'from photo to result' },
      { value: 'Live', label: 'style updates, no release' },
    ],
    stack: ['Flutter', 'Firebase', 'Stable Diffusion', 'Node.js'],
    poster: '/work/trendify.jpg',
    loop: '/work/trendify-loop.mp4',
    demo: '/project/trendify.mp4',
    orientation: 'portrait',
  },
  {
    slug: 'aria-voice-agent',
    name: 'ARIA',
    client: 'Hospitality client',
    industry: 'Hospitality',
    services: ['voice-ai-agents'],
    year: '2025',
    summary: 'A 24/7 voice concierge for hotel guests — room service, amenities and requests over a phone call.',
    challenge:
      'Front desks get the same calls all night: towels, check-out times, restaurant hours, taxi bookings. Staff time was going to repetition instead of guests.',
    solution: [
      'Phone voice agent on Twilio with Gemini for conversation.',
      'Hotel knowledge base for amenities, policies and local information.',
      'Request logging and handoff to the right department.',
    ],
    results: [
      { value: '<2s', label: 'response time' },
      { value: '94%', label: 'guest satisfaction' },
      { value: '−60%', label: 'front-desk call load' },
    ],
    stack: ['Twilio', 'Gemini', 'Python', 'FastAPI'],
    orientation: 'landscape',
  },
  {
    slug: 'ai-voice-form-assistant',
    name: 'Voice Form Assistant',
    client: 'Gigtap',
    industry: 'Hiring & HR tech',
    services: ['voice-ai-agents', 'ai-agent-development'],
    year: '2025',
    summary: 'Speak instead of type: a voice assistant that fills job applications conversationally.',
    challenge:
      'Long forms were the biggest drop-off point for job seekers who are more comfortable speaking than typing.',
    solution: [
      'In-app voice assistant that asks one question at a time and fills the form as the user talks.',
      'Validation and confirmation read back to the user before submission.',
      'Guidance through the rest of the platform after sign-up.',
    ],
    results: [
      { value: '98%', label: 'field accuracy' },
      { value: 'Hands-free', label: 'form completion' },
      { value: 'Hindi + English', label: 'voice input' },
    ],
    stack: ['Web Speech', 'OpenAI', 'React', 'Node.js'],
    orientation: 'landscape',
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
