<div align="center">

# 🔗 snip.sh

### Short links with scannable QR codes — no sign-in, no tracking.

A tiny, fast, **sign-in-less URL shortener** built entirely on **Cloudflare Workers & Pages**.
Paste a long URL, get a tiny link and a downloadable QR code. That's it.

<br>

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)
![Workers KV](https://img.shields.io/badge/Storage-Workers%20KV-F38020?logo=cloudflare&logoColor=white)
![No Sign-in](https://img.shields.io/badge/Auth-none-00E599)
![License](https://img.shields.io/badge/License-MIT-black)

</div>

---

## ✨ Features

| | |
|---|---|
| ⚡ **Instant shortening** | Paste a URL, get a tiny link in milliseconds — created & served from the edge. |
| 🏷️ **Custom slugs** | Pick your own alias like `snip.sh/launch`, or get a short random one. |
| 📱 **Real QR codes** | Every link ships with a scannable QR you can download as a PNG. |
| 🌍 **Edge redirects** | Redirects run on Workers in 300+ cities — fast everywhere. |
| ⏳ **Optional expiry** | Flip a switch and the link self-destructs after 7 days. |
| 🛡️ **No sign-in, no tracking** | No accounts, no cookies, no click logging. Your recent links live only in your browser. |

---

## 🧱 How it works

Everything ships as **one Cloudflare Worker** — it serves the React app as static
assets *and* runs the redirect + API logic. Storage is **Workers KV** (`slug → url`),
which is edge-cached and needs no database to manage.

```
                 ┌──────────────────────────────────────────┐
   Browser  ───► │  Cloudflare Worker (worker/index.js)      │
                 │                                            │
   GET  /:slug   │   → look up slug in KV → 302 redirect      │
   POST /api/... │   → validate URL → store in KV            │
   GET  /  ...   │   → serve the React SPA (static assets)   │
                 └───────────────┬──────────────────────────┘
                                 │
                          ┌──────▼───────┐
                          │  Workers KV  │   slug → { url, createdAt }
                          └──────────────┘
```

---

## 📁 Project structure

```
snip.sh/
├── index.html          # Vite entry (loads the React app)
├── vite.config.js      # Vite + @cloudflare/vite-plugin
├── wrangler.jsonc      # Worker + static assets + KV config
├── worker/
│   └── index.js        # Redirects, /api/links, SPA fallback
└── src/
    ├── main.jsx        # React entry
    ├── App.jsx         # Page shell
    ├── index.css       # All styles (theme-aware, dark/light)
    ├── hooks/          # useTheme
    ├── lib/            # api client + localStorage history
    └── components/     # Nav, Hero, ShortenWidget, Qr, Features, Cta, Footer …
```

---

## 🚀 Quick start

### 1. Install

```bash
npm install
```

### 2. Run locally (full stack, with hot reload)

```bash
npm run dev
```

Open **http://localhost:5173**. The Worker runs inside Vite and **KV is emulated
locally**, so shortening, redirects and QR codes all work with zero cloud setup.
Shorten a URL, then open `http://localhost:5173/<slug>` to see the redirect.

### 3. Create your KV namespace (once)

```bash
npx wrangler login
npm run kv:create
```

Copy the printed `id` into **`wrangler.jsonc`** (replace `REPLACE_WITH_YOUR_KV_NAMESPACE_ID`).

### 4. Deploy 🎉

```bash
npm run deploy
```

Wrangler prints your live URL (e.g. `https://snip-sh.<your-subdomain>.workers.dev`).
It's live — anyone can shorten a link and scan its QR, no sign-in.

> **Custom domain:** Cloudflare dashboard → *Workers & Pages → snip-sh → Settings →
> Domains & Routes* → add your domain. Links then look like `https://snip.sh/az8kq2`.

---

## 🔌 API

No auth. Same-origin JSON.

| Method | Path | Body / result |
|--------|------|---------------|
| `POST` | `/api/links` | `{ url, slug?, expiresInDays? }` → `{ slug, shortUrl, url, createdAt, expiresAt }` |
| `GET`  | `/api/links/:slug` | link metadata |
| `GET`  | `/:slug` | `302` redirect to the original URL |

**Example**

```bash
curl -X POST https://snip.sh/api/links \
  -H "content-type: application/json" \
  -d '{ "url": "https://example.com/a/very/long/path", "slug": "launch" }'

# → { "slug": "launch", "shortUrl": "https://snip.sh/launch", ... }
```

Validation: `url` must be `http(s)` only (blocks `javascript:`, `data:`, …);
custom `slug` must match `[A-Za-z0-9_-]{1,64}`.

---

## 🧰 npm scripts

| Script | What it does |
|--------|--------------|
| `npm run dev` | Full-stack local dev (Vite + Worker + emulated KV) |
| `npm run build` | Build the React app + Worker bundle |
| `npm run deploy` | Build, then `wrangler deploy` |
| `npm run kv:create` | Create the `LINKS` KV namespace |

---

## 📄 License

MIT — do whatever you like. No rights reserved, go make links.
