import { LinkMark } from './Icons.jsx'

export default function Footer() {
  const top = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="logo" href="#" onClick={top}>
              <span className="mark">
                <LinkMark />
              </span>
              snip<span className="dim">.sh</span>
            </a>
            <p>Short links with scannable QR codes. Built on Cloudflare Workers — no account needed.</p>
          </div>
          <div className="foot-col">
            <h5>Product</h5>
            <a href="#shorten">Shorten</a>
            <a href="#features">Features</a>
            <a href="#features">QR codes</a>
          </div>
          <div className="foot-col">
            <h5>Built with</h5>
            <a href="https://developers.cloudflare.com/workers/" target="_blank" rel="noreferrer">
              Cloudflare Workers
            </a>
            <a href="https://developers.cloudflare.com/kv/" target="_blank" rel="noreferrer">
              Workers KV
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              React + Vite
            </a>
          </div>
          <div className="foot-col">
            <h5>Info</h5>
            <a href="#features">No tracking</a>
            <a href="#features">Open redirect safe</a>
            <a href="#shorten">Free forever</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} snip.sh — no rights reserved, go make links.</span>
          <div className="socials">
            <a href="https://github.com/AbduxalilVoxidjonov" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://github.com/AbduxalilVoxidjonov/urlshorter" target="_blank" rel="noreferrer">
              Repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
