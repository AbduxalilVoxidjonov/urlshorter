import Reveal from './Reveal.jsx'

export default function Cta() {
  const toShorten = (e) => {
    e.preventDefault()
    document.getElementById('shorten')?.scrollIntoView({ behavior: 'smooth' })
    document.querySelector('.shorten-input')?.focus()
  }
  return (
    <section className="cta-band">
      <div className="wrap">
        <Reveal className="cta-card">
          <div className="blob2" />
          <h2>
            Got a long link?
            <br />
            Make it tiny.
          </h2>
          <p>Free, unlimited, and no account required. Ever.</p>
          <div className="cta-actions">
            <a href="#shorten" className="btn btn-primary" onClick={toShorten}>
              Shorten a link →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
