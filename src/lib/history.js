// "My links" persisted in localStorage — the whole point of a sign-in-less app:
// the browser remembers what you made, no account required.

const KEY = 'snip-links'
const MAX = 12

export function getRecent() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export function addRecent(link) {
  const entry = {
    slug: link.slug,
    url: link.url,
    shortUrl: link.shortUrl,
    createdAt: link.createdAt || Date.now(),
  }
  const list = getRecent().filter((l) => l.slug !== entry.slug)
  list.unshift(entry)
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)))
  } catch {}
  return list.slice(0, MAX)
}

export function clearRecent() {
  try {
    localStorage.removeItem(KEY)
  } catch {}
}
