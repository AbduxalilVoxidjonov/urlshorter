// Thin client for the Worker API. Same-origin, so no base URL needed.

const MESSAGES = {
  invalid_url: 'Please enter a valid URL.',
  url_too_long: 'That URL is too long.',
  invalid_slug: 'Custom slug: 1–64 letters, numbers, - or _.',
  slug_taken: 'That custom slug is already taken.',
  invalid_json: 'Something went wrong, try again.',
  try_again: 'Please try again.',
  not_found: 'Not found.',
}

export async function shorten({ url, slug, expiresInDays }) {
  const res = await fetch('/api/links', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ url, slug: slug || undefined, expiresInDays: expiresInDays || undefined }),
  })
  let data = {}
  try {
    data = await res.json()
  } catch {}
  if (!res.ok) {
    const err = new Error(data.message || MESSAGES[data.error] || 'Could not shorten this link.')
    err.code = data.error
    throw err
  }
  return data
}
