/* =============================================================================
 *  SITE CONTENT — EDIT THIS FILE
 * =============================================================================
 *  Almost everything you see on the website (text, phone numbers, stats,
 *  products, images, FAQs, testimonials) lives in this one file.
 *
 *  How to edit safely:
 *    • Only change the text between quotes "like this".
 *    • Keep commas at the end of lines exactly where they are.
 *    • Search for  [PLACEHOLDER]  /  SWAP  to find
 *      everything that still needs your real information or photos.
 *
 *  After editing, run `npm run dev` to preview, or `npm run build` to create
 *  the final single-file website in the  dist/  folder.
 * ===========================================================================*/

/* -----------------------------------------------------------------------------
 *  1. GOOGLE SHEETS CONNECTION  (Book a Demo / Request a Quote form)
 * -----------------------------------------------------------------------------
 *  Paste the Web App URL you get after deploying the Apps Script in
 *  google-apps-script/Code.gs  (full step-by-step instructions are in that file).
 *  It looks like:  https://script.google.com/macros/s/AKfy.../exec
 * ---------------------------------------------------------------------------*/
export const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'

/* -----------------------------------------------------------------------------
 *  2. COMPANY DETAILS
 * ---------------------------------------------------------------------------*/
export const SITE = {
  companyName: 'IndiaDiarie',
  shortName: 'ID', // ← 2–3 letter monogram shown in the logo badge
  tagline: 'Crafted in Kolkata. Written Around the World.',
  founder: 'Sheikh Mohammed Ibrahim',
  foundedYear: '1985',
  phoneDisplay: '+91 93806 16278',
  phoneTel: '+919380616278', // used for click-to-call (no spaces)
  whatsappNumber: '919380616278', // used for WhatsApp (country code, no +)
  whatsappMessage:
    "Hello! I found your website and I'm interested in custom diaries. Could you please share details?",
  email: 'hello@indiadiarie.com',
  addressLine: 'Collins Street',
  city: 'Kolkata',
  region: 'West Bengal',
  postalCode: '[700016]', // ← confirm your PIN code
  country: 'India',
  mapQuery: 'Collins Street, Kolkata, West Bengal, India',
  hours: 'Mon – Sat, 10:00 AM – 7:00 PM IST',
}

export const whatsappLink = (msg = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(msg)}`

/* -----------------------------------------------------------------------------
 *  3. HERO VIDEO
 * -----------------------------------------------------------------------------
 *  SWAP: Put your own factory / paper close-up video here (an .mp4 link, or a
 *  file placed in the  public/  folder, e.g. '/factory.mp4').
 *  Leave it empty ('') to use the built-in animated paper background instead.
 *  Tip: keep it short (10–20 s), muted, under ~6 MB, 1080p or smaller.
 * ---------------------------------------------------------------------------*/
export const HERO_VIDEO_URL = ''
export const HERO_VIDEO_POSTER = img('1516414447565-b14be0adf13e', 1600)

/* -----------------------------------------------------------------------------
 *  4. STATS  (animated counters — replace with your real numbers)
 * ---------------------------------------------------------------------------*/
export const STATS = [
  { value: new Date().getFullYear() - 1985, suffix: '+', label: 'Years of craftsmanship' }, // counts automatically from 1985
  { value: 1000000, suffix: '+', label: 'Diaries produced' }, // [PLACEHOLDER]
  { value: 850, suffix: '+', label: 'Clients served' }, // [PLACEHOLDER]
  { value: 12, suffix: '+', label: 'Countries shipped to' }, // [PLACEHOLDER]
]

/* -----------------------------------------------------------------------------
 *  5. IMAGES
 * -----------------------------------------------------------------------------
 *  All photos are royalty-free from Unsplash. SWAP them with your real factory
 *  and product photos: put your photo in the  public/  folder (e.g.
 *  public/photos/leather-diary.jpg) and replace  img('...')  with
 *  '/photos/leather-diary.jpg'.
 * ---------------------------------------------------------------------------*/
function img(id, w = 900) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`
}

export const IMAGES = {
  about: img('1517971129774-8a2b38fa128e', 1000), // SWAP: your workshop / team photo
  heritage: img('1550399105-c4db5fb85c18', 900), // SWAP: Kolkata factory / heritage photo
  paper: img('1586075010923-2dd4570fb338', 1000), // SWAP: close-up of your paper stock
  writing: img('1455390582262-044cdead277a', 900), // SWAP: pen test on your paper
  ogImage: img('1516414447565-b14be0adf13e', 1200), // social share preview image
}

/* -----------------------------------------------------------------------------
 *  6. DIARY RANGE  (product cards)
 * -----------------------------------------------------------------------------
 *  categories → which filter tabs show the card:
 *    'corporate' | 'gifting' | 'daily' | 'academic'
 * ---------------------------------------------------------------------------*/
export const PRODUCT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'gifting', label: 'Gifting' },
  { id: 'daily', label: 'Daily Use' },
  { id: 'academic', label: 'Academic' },
]

export const PRODUCTS = [
  {
    id: 'corporate-executive',
    title: 'Corporate & Executive Diaries',
    categories: ['corporate'],
    desc: 'Dated and undated diaries with your logo, year planners and company pages, made for boardrooms and client gifting.',
    sizes: 'A4 · A5 · B5 · Dated / Undated',
    image: img('1542435503-956c469947f6'), // SWAP
  },
  {
    id: 'leather-premium',
    title: 'Leather & PU Premium Diaries',
    categories: ['corporate', 'gifting'],
    desc: 'Genuine and PU leather covers with stitched edges, foil or deboss branding and a soft-touch finish.',
    sizes: 'A5 · B5 · Pocket',
    image: img('1516414447565-b14be0adf13e'), // SWAP
  },
  {
    id: 'hardbound-softbound',
    title: 'Hardbound & Softbound Notebooks',
    categories: ['daily', 'academic'],
    desc: 'Case-bound and perfect-bound notebooks that lie flat, wear well and print beautifully in any quantity.',
    sizes: 'A4 · A5 · B5 · Custom',
    image: img('1497633762265-9d179a990aa6'), // SWAP
  },
  {
    id: 'planners',
    title: 'Planners — Daily, Weekly, Monthly',
    categories: ['daily', 'corporate'],
    desc: 'Daily, weekly, monthly and undated layouts, with goal pages and habit trackers designed to your brief.',
    sizes: 'A5 · B5 · Undated available',
    image: img('1506784983877-45594efa4cbe'), // SWAP
  },
  {
    id: 'spiral-wiro',
    title: 'Spiral & Wiro-bound Notebooks',
    categories: ['academic', 'daily'],
    desc: 'Double-wire and spiral bindings that open fully flat. Ideal for offices, schools and conferences.',
    sizes: 'A4 · A5 · A6',
    image: img('1531346878377-a5be20888e57'), // SWAP
  },
  {
    id: 'pocket-mini',
    title: 'Pocket Diaries & Mini Journals',
    categories: ['daily', 'gifting'],
    desc: 'Compact companions for on-the-go notes, popular as event giveaways and add-ons to gift sets.',
    sizes: 'A6 · A7 · 9×14 cm',
    image: img('1519682337058-a94d519337bc'), // SWAP
  },
  {
    id: 'journals',
    title: 'Journals — Dotted, Ruled, Plain, Grid',
    categories: ['daily'],
    desc: 'Writer-friendly journals on smooth, bleed-resistant paper with your choice of ruling.',
    sizes: 'A5 · B5 · Square',
    image: img('1611532736597-de2d4265fba3'), // SWAP
  },
  {
    id: 'eco-friendly',
    title: 'Eco-friendly Diaries',
    categories: ['corporate', 'gifting', 'daily'],
    desc: 'Recycled paper, kraft and cork covers, and plantable seed-paper covers, for brands with a sustainability goal.',
    sizes: 'A5 · B5 · Pocket',
    image: img('1544816155-12df9643f363'), // SWAP
  },
  {
    id: 'gift-sets',
    title: 'Gift Sets — Diary + Pen + Box',
    categories: ['gifting', 'corporate'],
    desc: 'Ready-to-gift sets with a matching pen and a rigid or magnetic box, branded inside and out.',
    sizes: 'A5 set · B5 set · Custom box',
    image: img('1513201099705-a9746e1e201f'), // SWAP
  },
  {
    id: 'academic',
    title: 'Academic Planners & School Diaries',
    categories: ['academic'],
    desc: 'School almanacs, student planners and college notebooks with your institution crest and calendar.',
    sizes: 'A5 · B5 · Custom',
    image: img('1503676260728-1c00da094a0b'), // SWAP
  },
  {
    id: 'hospitality',
    title: 'Hotel, Hospitality & Conference Notebooks',
    categories: ['corporate'],
    desc: 'Branded room notepads, conference notebooks and delegate kits, supplied on time for every event.',
    sizes: 'A5 · A6 · Notepads',
    image: img('1524178232363-1fb2b075b655'), // SWAP
  },
  {
    id: 'seasonal',
    title: 'Religious, Festival & Seasonal Diaries',
    categories: ['gifting'],
    desc: 'Diwali, Eid, Christmas and New Year editions, plus faith calendars and almanac diaries.',
    sizes: 'A5 · B5 · Pocket',
    image: img('1607344645866-009c320b63e0'), // SWAP
  },
]

/* -----------------------------------------------------------------------------
 *  7. CUSTOMIZATION STUDIO OPTIONS
 * ---------------------------------------------------------------------------*/
export const STUDIO = {
  materials: [
    { id: 'leather', label: 'Genuine Leather' },
    { id: 'pu', label: 'PU Leather' },
    { id: 'linen', label: 'Linen' },
    { id: 'fabric', label: 'Fabric' },
    { id: 'kraft', label: 'Kraft', fixedColor: '#b8915f' },
    { id: 'cork', label: 'Cork', fixedColor: '#b98a5a' },
    { id: 'printed', label: 'Hard Printed' },
  ],
  colors: [
    { id: 'navy', label: 'Ink Navy', hex: '#1b2a41' },
    { id: 'forest', label: 'Forest Green', hex: '#24402f' },
    { id: 'oxblood', label: 'Oxblood', hex: '#5e1f23' },
    { id: 'tan', label: 'Tan', hex: '#9b6a3f' },
    { id: 'black', label: 'Black', hex: '#1a1a1a' },
    { id: 'grey', label: 'Slate Grey', hex: '#4b5563' },
    { id: 'blush', label: 'Blush', hex: '#c99a95' },
    { id: 'ivory', label: 'Ivory', hex: '#e9e0cc' },
  ],
  branding: [
    { id: 'deboss', label: 'Debossing' },
    { id: 'emboss', label: 'Embossing' },
    { id: 'foil', label: 'Foil Stamping' },
    { id: 'uv', label: 'UV Print' },
    { id: 'screen', label: 'Screen Print' },
    { id: 'laser', label: 'Laser Engraving' },
  ],
  sizes: [
    { id: 'A4', label: 'A4', note: '210 × 297 mm', scale: 1 },
    { id: 'B5', label: 'B5', note: '176 × 250 mm', scale: 0.88 },
    { id: 'A5', label: 'A5', note: '148 × 210 mm', scale: 0.78 },
    { id: 'A6', label: 'Pocket A6', note: '105 × 148 mm', scale: 0.6 },
  ],
  paperTypes: [
    'Natural Cream Woodfree',
    'Bright White Maplitho',
    'Recycled',
    'Premium Bond',
    'Art Paper (for printed pages)',
  ],
  rulings: [
    { id: 'ruled', label: 'Ruled' },
    { id: 'plain', label: 'Plain' },
    { id: 'dotted', label: 'Dotted' },
    { id: 'grid', label: 'Grid' },
  ],
  addOns: [
    { id: 'elastic', label: 'Elastic band' },
    { id: 'ribbon', label: 'Ribbon marker' },
    { id: 'penloop', label: 'Pen loop' },
    { id: 'pocket', label: 'Back pocket' },
    { id: 'magnetic', label: 'Magnetic flap' },
    { id: 'gilded', label: 'Gilded edges' },
    { id: 'innerpages', label: 'Custom inner pages' },
    { id: 'logoevery', label: 'Logo on every page' },
    { id: 'qr', label: 'QR code page' },
    { id: 'giftbox', label: 'Gift box' },
  ],
}

/* -----------------------------------------------------------------------------
 *  8. CERTIFICATIONS  (placeholders — confirm or remove)
 * ---------------------------------------------------------------------------*/
export const CERTIFICATIONS = [
  { label: 'FSC® Certified Paper', note: '[confirm or remove]' },
  { label: 'ISO 9001:2015', note: '[confirm or remove]' },
  { label: 'IEC — Import Export Code', note: '[confirm or remove]' },
  { label: 'MSME / Udyam Registered', note: '[confirm or remove]' },
]

/* -----------------------------------------------------------------------------
 *  9. EXPORT DETAILS  (placeholders)
 * ---------------------------------------------------------------------------*/
export const EXPORT_INFO = {
  moq: '[500] units per design', // [PLACEHOLDER]
  leadTime: '[25–35] days after sample approval', // [PLACEHOLDER]
  sampleTime: '[5–7] working days', // [PLACEHOLDER]
  shipping: 'Sea & air freight via Kolkata Port and CCU Airport',
  incoterms: 'EXW · FOB · CIF · DDP (on request)', // [PLACEHOLDER]
}

/* -----------------------------------------------------------------------------
 *  10. GALLERY  (masonry grid + lightbox) — SWAP with your own photos
 *      tall: true makes the tile taller in the grid.
 * ---------------------------------------------------------------------------*/
export const GALLERY = [
  { src: img('1516414447565-b14be0adf13e', 1200), alt: 'Dark hardcover notebook with pencil on a wooden desk', tall: true },
  { src: img('1517842645767-c639042777db', 1200), alt: 'Open ruled notebook with a fountain pen and glasses' },
  { src: img('1544377193-33dcf4d68fb5', 1200), alt: 'Stack of white notebooks with a gold pen' },
  { src: img('1528938102132-4a9276b8e320', 1200), alt: 'Pastel journal with gold lettering beside fern leaves', tall: true },
  { src: img('1471107340929-a87cd0f5b5f3', 1200), alt: 'Spiral notebook and fountain pen on wood' },
  { src: img('1484480974693-6ca0a78fb36b', 1200), alt: 'Hand writing a to-do list in a notebook' },
  { src: img('1452860606245-08befc0ff44b', 1200), alt: 'Craft tools: cutting mat, scissors and tape', tall: true },
  { src: img('1501504905252-473c47e087f8', 1200), alt: 'Open journal next to a laptop and coffee' },
  { src: img('1510070009289-b5bc34383727', 1200), alt: 'Envelopes and stationery on a yellow desk' },
  { src: img('1517971071642-34a2d3ecc9cd', 1200), alt: 'Person writing by hand on cream paper', tall: true },
  { src: img('1456735190827-d1262f71b8a3', 1200), alt: 'Box of colourful stationery supplies' },
  { src: img('1499750310107-5fef28a66643', 1200), alt: 'Notebook and coffee on a wooden workspace' },
]

/* -----------------------------------------------------------------------------
 *  11. TESTIMONIALS  — [PLACEHOLDER] replace with real client quotes
 * ---------------------------------------------------------------------------*/
export const TESTIMONIALS = [
  {
    quote:
      'Our 2,500 New Year diaries arrived a week early, and the foil logo looked better than our mock-up. Our clients still mention them.',
    name: '[Client Name]',
    role: 'Head of Marketing, [Bank / Insurance Co.]',
    location: 'Mumbai, India',
  },
  {
    quote:
      'They handled our private-label journals from samples to shipping, with clean export cartons and every document in order.',
    name: '[Client Name]',
    role: 'Founder, [Stationery Brand]',
    location: 'London, United Kingdom',
  },
  {
    quote:
      'Consistent paper quality across three reorders. That reliability is why we moved our full planner line to Kolkata.',
    name: '[Client Name]',
    role: 'Procurement Manager, [Distributor]',
    location: 'Dubai, UAE',
  },
  {
    quote:
      'Beautiful school almanacs with our crest debossed. The team was patient with every revision.',
    name: '[Client Name]',
    role: 'Principal, [School Name]',
    location: 'Kolkata, India',
  },
]

/* -----------------------------------------------------------------------------
 *  12. FAQ
 * ---------------------------------------------------------------------------*/
export const FAQS = [
  {
    q: 'What is your minimum order quantity (MOQ)?',
    a: `Our standard MOQ is ${EXPORT_INFO.moq}. For stock designs with only a logo added, we can often go lower, so just ask. Export private-label orders are usually planned per design and size.`,
  },
  {
    q: 'Can I get a sample before placing a bulk order?',
    a: `Yes. We send pre-production samples in ${EXPORT_INFO.sampleTime}. Stock samples are free (you pay courier charges), and fully custom samples are charged at a nominal cost that is adjusted against your order.`,
  },
  {
    q: 'How much can I customize?',
    a: 'Almost everything: cover material and colour, size, paper type and GSM (70–120), ruling, inner pages, branding method, add-ons like elastic bands and ribbons, and packaging. If you can describe it, we can usually make it.',
  },
  {
    q: 'What are your lead times?',
    a: `Bulk production typically takes ${EXPORT_INFO.leadTime}, depending on quantity and finishing. For New Year and festival orders, we recommend confirming 6–8 weeks in advance.`,
  },
  {
    q: 'Do you ship internationally?',
    a: `Yes. We ship worldwide by sea and air freight, with export-grade cartons and full documentation. Supported terms: ${EXPORT_INFO.incoterms}.`,
  },
  {
    q: 'What are your payment terms?',
    a: '[PLACEHOLDER] Domestic: 50% advance, balance before dispatch. Export: 30–50% advance with the balance against documents, or LC at sight for larger orders.',
  },
  {
    q: 'Which file formats should I send for my logo?',
    a: 'Vector files are best: AI, EPS, PDF or SVG. For printed covers, send a high-resolution PDF (300 dpi, CMYK) with 3 mm bleed. Our design team can redraw simple logos if needed.',
  },
  {
    q: 'Do you offer private label / OEM manufacturing?',
    a: 'Absolutely. We manufacture under your brand, with no mention of us anywhere on the product or packaging, including your barcodes, inserts and retail-ready packing.',
  },
]

/* -----------------------------------------------------------------------------
 *  13. FORM DROPDOWN OPTIONS
 * ---------------------------------------------------------------------------*/
export const BUYER_TYPES = ['Corporate', 'Retailer', 'Distributor', 'Importer', 'Institution', 'Individual']

export const COUNTRY_CODES = [
  { code: '+91', label: 'IN +91' },
  { code: '+1', label: 'US/CA +1' },
  { code: '+44', label: 'UK +44' },
  { code: '+971', label: 'UAE +971' },
  { code: '+966', label: 'SA +966' },
  { code: '+974', label: 'QA +974' },
  { code: '+965', label: 'KW +965' },
  { code: '+968', label: 'OM +968' },
  { code: '+973', label: 'BH +973' },
  { code: '+49', label: 'DE +49' },
  { code: '+33', label: 'FR +33' },
  { code: '+34', label: 'ES +34' },
  { code: '+39', label: 'IT +39' },
  { code: '+31', label: 'NL +31' },
  { code: '+65', label: 'SG +65' },
  { code: '+60', label: 'MY +60' },
  { code: '+62', label: 'ID +62' },
  { code: '+66', label: 'TH +66' },
  { code: '+84', label: 'VN +84' },
  { code: '+63', label: 'PH +63' },
  { code: '+61', label: 'AU +61' },
  { code: '+880', label: 'BD +880' },
  { code: '+977', label: 'NP +977' },
  { code: '+94', label: 'LK +94' },
]

export const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Saudi Arabia', 'Qatar',
  'Kuwait', 'Oman', 'Bahrain', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Belgium',
  'Ireland', 'Sweden', 'Canada', 'Australia', 'New Zealand', 'Singapore', 'Malaysia', 'Indonesia',
  'Thailand', 'Vietnam', 'Philippines', 'Bangladesh', 'Nepal', 'Sri Lanka', 'South Africa',
  'Kenya', 'Nigeria', 'Egypt', 'Other',
]

/* -----------------------------------------------------------------------------
 *  14. SOCIAL MEDIA  — replace '#' with your profile links (or delete a line)
 * ---------------------------------------------------------------------------*/
export const SOCIALS = [
  { id: 'instagram', label: 'Instagram', href: '#' },
  { id: 'facebook', label: 'Facebook', href: '#' },
  { id: 'linkedin', label: 'LinkedIn', href: '#' },
  { id: 'youtube', label: 'YouTube', href: '#' },
]

/* -----------------------------------------------------------------------------
 *  15. NAVIGATION
 * ---------------------------------------------------------------------------*/
export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'range', label: 'Our Range' },
  { id: 'studio', label: 'Customize' },
  { id: 'process', label: 'Process' },
  { id: 'export', label: 'Export' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
]
