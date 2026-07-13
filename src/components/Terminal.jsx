import { useEffect, useRef, useState } from 'react'

// Cosmetic terminal that types itself out — pure decoration for the hero.
const LINES = [
  '<span class="tp">$</span> <span class="tk">snip</span> <span class="tw">new</span> <span class="ty">https://example.com/a/very/long/link?ref=share</span>',
  '<span class="tg">  ✓ shortened in 41ms · edge redirect</span>',
  '',
  '<span class="tw">  short  </span><span class="tk">→ snip.sh/az8kq2</span>',
  '<span class="tw">  qr     </span><span class="tb">→ scannable QR generated</span>',
  '',
  '<span class="tp">$</span> <span class="tk">snip</span> <span class="tw">open</span> <span class="ty">az8kq2</span>',
  '<span class="tg">  ● redirecting…</span><span class="cursor"></span>',
]

export default function Terminal() {
  const [count, setCount] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setInterval(() => {
      setCount((c) => {
        if (c >= LINES.length) {
          clearInterval(timer.current)
          return c
        }
        return c + 1
      })
    }, 360)
    return () => clearInterval(timer.current)
  }, [])

  return (
    <div className="term">
      <div className="term-bar">
        <span className="tdot" />
        <span className="tdot" />
        <span className="tdot" />
        <span className="ttl">~ snip-cli</span>
      </div>
      <div className="term-body">
        {LINES.slice(0, count).map((l, i) => (
          <div key={i} className="l" dangerouslySetInnerHTML={{ __html: l || '&nbsp;' }} />
        ))}
      </div>
    </div>
  )
}
