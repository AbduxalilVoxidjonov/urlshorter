import Reveal from './Reveal.jsx'
import { Bolt, Slug, Qr, Globe, Lock, Shield } from './Icons.jsx'

const FEATURES = [
  {
    tag: '/shorten',
    icon: <Bolt />,
    title: 'Instant shortening',
    body: 'Paste a URL, get a tiny link in milliseconds — created and served from Cloudflare’s edge.',
  },
  {
    tag: '/slug',
    icon: <Slug />,
    title: 'Custom slugs',
    body: 'Pick your own readable alias like snip.sh/launch — or let us generate a short random one.',
  },
  {
    tag: '/qr',
    icon: <Qr />,
    title: 'QR codes',
    body: 'Every link comes with a real, scannable QR code you can download as a PNG in one click.',
  },
  {
    tag: '/edge',
    icon: <Globe />,
    title: 'Edge redirects',
    body: 'Redirects run on Workers in 300+ cities, so your link resolves fast wherever it’s opened.',
  },
  {
    tag: '/expire',
    icon: <Lock />,
    title: 'Optional expiry',
    body: 'Flip a switch and your link self-destructs after 7 days — handy for one-off shares.',
  },
  {
    tag: '/private',
    icon: <Shield />,
    title: 'No sign-in, no tracking',
    body: 'No accounts, no cookies, no click logging. Your recent links live only in this browser.',
  },
]

export default function Features() {
  return (
    <section id="features">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="sec-tag">// features</div>
          <h2 className="sec-h">Everything you need to ship a link.</h2>
          <p className="sec-p">
            From a short slug to a downloadable QR code, snip handles the boring parts — so you can
            paste a link and move on.
          </p>
        </Reveal>
        <div className="feat-grid">
          {FEATURES.map((f) => (
            <Reveal className="feat" key={f.tag}>
              <span className="tagk">{f.tag}</span>
              <div className="ic">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
