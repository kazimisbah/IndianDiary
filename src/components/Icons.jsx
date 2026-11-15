/* All icons are inline SVG (no external icon library).
 * Usage: <Icon name="phone" className="h-5 w-5" />                       */

const PATHS = {
  phone: 'M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  pin: 'M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4.5l3 2',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-14v2m0 16v2M4.2 4.2l1.4 1.4m12.8 12.8 1.4 1.4M2 12h2m16 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  arrow: 'M5 12h14m-5-5 5 5-5 5',
  chevronDown: 'm6 9 6 6 6-6',
  chevronLeft: 'm15 6-6 6 6 6',
  chevronRight: 'm9 6 6 6-6 6',
  star: 'm12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z',
  leaf: 'M5 19c0-9 6-14 15-14 0 9-5 15-14 15H5Zm0 0 8-8',
  truck: 'M3 6h11v9H3zM14 9h4l3 3v3h-7M7.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  award: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.5 4.5L8 21l4-2 4 2-.5-6.5M9 13.9 8 21m7-7.1 1 7.1',
  boxes: 'M3 8.5 12 4l9 4.5v7L12 20l-9-4.5v-7ZM3 8.5l9 4.5 9-4.5M12 13v7',
  pen: 'M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z',
  layers: 'm12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5',
  ship: 'M3 17c2 2 4 2 6 0 2 2 4 2 6 0 2 2 4 2 6 0M5 14l-1-4h16l-1 4M8 10V6h8v4M12 3v3',
  building: 'M4 21V5l8-2v18M12 8h8v13M4 21h16M7 8h2m-2 4h2m-2 4h2m6-4h2m-2 4h2',
  bank: 'M3 9 12 4l9 5M5 10v8m4-8v8m6-8v8m4-8v8M3 21h18',
  pharma: 'M10.5 20.5 3.5 13.5a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7ZM7 10l7 7',
  cap: 'm2 9 10-5 10 5-10 5L2 9Zm4 2v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6',
  hotel: 'M3 21V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14M3 21h18M7 9h2m6 0h2m-10 4h2m6 0h2M10 21v-4h4v4',
  calendar: 'M4 6h16v15H4zM4 10h16M8 3v4m8-4v4',
  store: 'M4 10v10h16V10M3 6l2-3h14l2 3v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V6Zm7 14v-5h4v5',
  gift: 'M4 11h16v10H4zM3 7h18v4H3zM12 7v14M12 7c-1.5-3-5-3.5-5-1.2C7 7 9.5 7 12 7Zm0 0c1.5-3 5-3.5 5-1.2C17 7 14.5 7 12 7Z',
  plane: 'M10.5 13.5 3 11l1.5-1.5 7 1L16 6a2 2 0 0 1 3 3l-4.5 4.5 1 7L14 22l-2.5-7.5L8 18v2.5L6.5 22l-1-3.5L2 17.5 3.5 16H6l3.5-3.5',
  shield: 'M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Zm-3.5 9 2.5 2.5 4.5-5',
  feather: 'M20 4c-8 0-14 6-14 14m14-14c0 8-6 13-11 13H6l-3 3m9-13H9',
  droplet: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Zm0 16a2 2 0 0 1 2-2h13v2H6',
  eye: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  sparkles: 'M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M6 18l2.5-2.5m7-7L18 6',
  factory: 'M3 21V10l6 3V10l6 3V6l6-3v18H3Zm4-4h2m4 0h2',
  scissors: 'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.2 7.8 20 18M8.2 16.2 20 6',
  printer: 'M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z',
  chat: 'M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12Z',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 5 5',
  users: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 10a7 7 0 0 1 14 0M16 3.5a4 4 0 0 1 0 7.5M22 21a7 7 0 0 0-4-6.3',
  palette: 'M12 21a9 9 0 1 1 9-9c0 2.5-2 3-3.5 3H15a2 2 0 0 0-1.5 3.3c.6.8.1 2.7-1.5 2.7ZM7.5 11a1 1 0 1 0 0-.1M10 7a1 1 0 1 0 0-.1m4.5.1a1 1 0 1 0 0-.1M17 10.5a1 1 0 1 0 0-.1',
  rupee: 'M6 4h12M6 9h12M14 4c3 0 3 10-3 10H7l8 7',
  handshake: 'M2 12l4-4 4 2 3-2 3 1 6 3M2 12l5 5 2-1 2 2 2-1 2 2 2-1 3-4M9 11l3 3',
  refresh: 'M20 11a8 8 0 0 0-14.7-4M4 4v4h4m-4 5a8 8 0 0 0 14.7 4M20 20v-4h-4',
  play: 'M7 4.5v15l12-7.5-12-7.5Z',
}

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.6, title }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      <path d={PATHS[name]} />
    </svg>
  )
}

/* Brand / social marks (filled) */
export function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.3-1.4A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3a8.2 8.2 0 1 1 7 3.9Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  )
}

const SOCIAL_PATHS = {
  instagram: 'M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2ZM17 6a1.1 1.1 0 1 0 0 2.3A1.1 1.1 0 0 0 17 6Zm4 1.1a5.5 5.5 0 0 0-1.5-3.9A5.5 5.5 0 0 0 15.6 2C14 2 10 2 8.4 2a5.5 5.5 0 0 0-3.9 1.5A5.5 5.5 0 0 0 3 7.1C2.9 8.7 2.9 15.3 3 17a5.5 5.5 0 0 0 1.5 3.9A5.5 5.5 0 0 0 8.4 22h7.2a5.5 5.5 0 0 0 3.9-1.5A5.5 5.5 0 0 0 21 17c.1-1.6.1-8.3 0-9.9Z',
  facebook: 'M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2a21 21 0 0 0-2.4-.1C12.2 2 10.6 3.5 10.6 6.2v2.3H8V12h2.6v10H14V12h2.7l.4-3.5H14Z',
  linkedin: 'M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.3 9h3.4v12H3.3V9Zm5.6 0h3.3v1.7c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.2 2.4 4.2 5.4V21h-3.4v-6c0-1.4 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V21H8.9V9Z',
  youtube: 'M22 12s0-3.3-.4-4.8a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.7 2 12 2 12s0 3.3.4 4.8c.2.9.9 1.6 1.8 1.8 1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.5.4-4.8.4-4.8ZM10 15V9l5.2 3L10 15Z',
}

export function SocialIcon({ name, className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={SOCIAL_PATHS[name]} />
    </svg>
  )
}

/* Logo mark: an open book with a gold nib — replace with your own logo SVG/PNG */
export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="1" y="1" width="38" height="38" rx="10" fill="#1b2a41" />
      <rect x="4.5" y="4.5" width="31" height="31" rx="7.5" fill="none" stroke="#d1b072" strokeDasharray="2 2" strokeWidth=".9" />
      <path d="M10 13.5c3.4-1.2 6.8-.9 10 1.2 3.2-2.1 6.6-2.4 10-1.2v13c-3.4-1.2-6.8-.9-10 1.2-3.2-2.1-6.6-2.4-10-1.2v-13Z" fill="#f8f3e8" />
      <path d="M20 14.7v13" stroke="#b08d57" strokeWidth="1.2" />
      <path d="M13 17.5h4.5M13 20h4.5M13 22.5h4.5M22.5 17.5H27M22.5 20H27" stroke="#1b2a41" strokeOpacity=".35" strokeWidth=".8" />
    </svg>
  )
}
