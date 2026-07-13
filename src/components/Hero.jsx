import ShortenWidget from './ShortenWidget.jsx'
import Terminal from './Terminal.jsx'

const BRANDS = ['◆ Northwind', '▲ Vercell', '⬡ Hexstack', '✳ Lumina', '◇ Pixelpush', '⬢ Cobalt']

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">
            <span className="dot" />
            // short links + QR codes, no account
          </span>
          <h1 className="hero-h">
            Shorten links.
            <br />
            <em>Share anywhere.</em>
          </h1>
          <p className="hero-sub">
            snip.sh turns any long URL into a tiny link with a scannable QR code — instantly, from
            the edge. No sign-up, no tracking, no nonsense.
          </p>
          <ShortenWidget />
        </div>

        <Terminal />
      </div>

      <div className="wrap trust">
        <div className="trust-label">the same tiny link works everywhere</div>
        <div className="trust-row">
          {BRANDS.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
