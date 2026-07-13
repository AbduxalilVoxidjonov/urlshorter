// snip.sh — Cloudflare Worker
// Responsibilities:
//   1. POST /api/links      → create a short link (store slug -> url in KV)
//   2. GET  /api/links/:slug → look up a link's metadata
//   3. GET  /:slug          → 302 redirect to the original URL
//   4. everything else       → serve the built React app (static assets / SPA)
//
// No sign-in, no database, no click tracking. KV is the single source of truth.

const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789' // no confusing chars (0/o, 1/l/i)
const SLUG_RE = /^[A-Za-z0-9_-]{1,64}$/
const MAX_URL = 2048

// Paths that must never be treated as a short slug (they belong to the app).
const RESERVED = new Set([
  'api', 'assets', 'favicon.ico', 'robots.txt', 'sitemap.xml',
  'index.html', 'about', 'terms', 'privacy', 'docs', '_app',
])

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })

function randomSlug(len = 6) {
  const bytes = new Uint8Array(len)
  crypto.getRandomValues(bytes)
  let out = ''
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length]
  return out
}

// Accepts "example.com/x", "http://…", "https://…". Rejects anything that isn't
// a real http(s) URL (blocks javascript:, data:, mailto:, etc.).
function normalizeUrl(input) {
  let raw = String(input || '').trim()
  if (!raw) return null
  if (!/^https?:\/\//i.test(raw)) raw = 'https://' + raw
  let u
  try {
    u = new URL(raw)
  } catch {
    return null
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return null
  if (!u.hostname || !u.hostname.includes('.')) return null
  return u.toString()
}

async function createLink(request, env) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'invalid_json' }, 400)
  }

  const url = normalizeUrl(body.url)
  if (!url) return json({ error: 'invalid_url', message: 'Enter a valid http(s) URL.' }, 400)
  if (url.length > MAX_URL) return json({ error: 'url_too_long' }, 400)

  // Optional expiry — KV auto-deletes the key after this many seconds.
  let expirationTtl
  const days = Number(body.expiresInDays)
  if (Number.isFinite(days) && days > 0) {
    expirationTtl = Math.min(Math.round(days * 86400), 365 * 86400)
    if (expirationTtl < 60) expirationTtl = 60 // KV minimum
  }

  const createdAt = Date.now()
  const record = JSON.stringify({ url, createdAt })
  const putOpts = expirationTtl ? { expirationTtl } : undefined

  let slug = String(body.slug || '').trim()

  if (slug) {
    if (!SLUG_RE.test(slug) || RESERVED.has(slug.toLowerCase())) {
      return json({ error: 'invalid_slug', message: 'Use 1–64 letters, numbers, - or _.' }, 400)
    }
    const existing = await env.LINKS.get(slug)
    if (existing) return json({ error: 'slug_taken', message: 'That slug is already in use.' }, 409)
    await env.LINKS.put(slug, record, putOpts)
  } else {
    // Random slug with a few retries to dodge the (astronomically rare) collision.
    slug = null
    for (let i = 0; i < 6; i++) {
      const candidate = randomSlug(6)
      if (await env.LINKS.get(candidate)) continue
      await env.LINKS.put(candidate, record, putOpts)
      slug = candidate
      break
    }
    if (!slug) return json({ error: 'try_again', message: 'Could not allocate a slug, retry.' }, 503)
  }

  const origin = new URL(request.url).origin
  return json(
    {
      slug,
      url,
      shortUrl: `${origin}/${slug}`,
      createdAt,
      expiresAt: expirationTtl ? createdAt + expirationTtl * 1000 : null,
    },
    201,
  )
}

async function getLink(slug, request, env) {
  const raw = await env.LINKS.get(slug)
  if (!raw) return json({ error: 'not_found' }, 404)
  let rec
  try {
    rec = JSON.parse(raw)
  } catch {
    rec = { url: raw }
  }
  const origin = new URL(request.url).origin
  return json({ slug, url: rec.url, shortUrl: `${origin}/${slug}`, createdAt: rec.createdAt ?? null })
}

async function handleApi(request, env, url) {
  if (url.pathname === '/api/links' && request.method === 'POST') {
    return createLink(request, env)
  }
  const m = url.pathname.match(/^\/api\/links\/([A-Za-z0-9_-]{1,64})$/)
  if (m && request.method === 'GET') {
    return getLink(m[1], request, env)
  }
  return json({ error: 'not_found' }, 404)
}

// Serve the SPA shell for client-side routes / unknown paths.
async function serveApp(request, env) {
  const res = await env.ASSETS.fetch(request)
  if (res.status !== 404) return res
  const idx = new URL(request.url)
  idx.pathname = '/'
  return env.ASSETS.fetch(new Request(idx.toString(), request))
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const { pathname } = url

    if (pathname.startsWith('/api/')) {
      return handleApi(request, env, url)
    }

    // Short-link redirect: a single path segment that looks like a slug.
    if (request.method === 'GET' && pathname.length > 1) {
      const seg = pathname.slice(1)
      if (
        !seg.includes('/') &&
        !seg.includes('.') &&
        SLUG_RE.test(seg) &&
        !RESERVED.has(seg.toLowerCase())
      ) {
        const raw = await env.LINKS.get(seg)
        if (raw) {
          let target = raw
          try {
            target = JSON.parse(raw).url
          } catch {}
          if (target) {
            return new Response(null, {
              status: 302,
              headers: { Location: target, 'cache-control': 'no-store', 'referrer-policy': 'unsafe-url' },
            })
          }
        }
        // Unknown slug → fall through to the app, which shows a "not found" note.
      }
    }

    return serveApp(request, env)
  },
}
