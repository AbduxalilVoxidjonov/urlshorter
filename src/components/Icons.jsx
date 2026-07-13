// Small inline icon set (stroke = currentColor).
const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const LinkMark = () => (
  <svg viewBox="0 0 24 24" {...s} strokeWidth="2.2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

export const Sun = () => (
  <svg viewBox="0 0 24 24" {...s}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export const Moon = () => (
  <svg viewBox="0 0 24 24" {...s}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

export const Copy = () => (
  <svg viewBox="0 0 24 24" {...s}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

export const Check = () => (
  <svg viewBox="0 0 24 24" {...s} strokeWidth="2.4">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const Download = () => (
  <svg viewBox="0 0 24 24" {...s}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M7 10l5 5 5-5M12 15V3" />
  </svg>
)

export const Slug = () => (
  <svg viewBox="0 0 24 24" {...s}>
    <path d="M4 7V4h16v3" />
    <path d="M9 20h6" />
    <path d="M12 4v16" />
  </svg>
)

export const Qr = () => (
  <svg viewBox="0 0 24 24" {...s}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3zM21 14v7M17 21h4" />
  </svg>
)

export const Bolt = () => (
  <svg viewBox="0 0 24 24" {...s}>
    <path d="M13 2 3 14h9l-1 8 10-12h-9z" />
  </svg>
)

export const Lock = () => (
  <svg viewBox="0 0 24 24" {...s}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
)

export const Globe = () => (
  <svg viewBox="0 0 24 24" {...s}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
  </svg>
)

export const Shield = () => (
  <svg viewBox="0 0 24 24" {...s}>
    <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)
