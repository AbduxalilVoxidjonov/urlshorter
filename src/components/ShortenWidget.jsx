import { useEffect, useRef, useState } from 'react'
import { shorten } from '../lib/api.js'
import { addRecent, getRecent, clearRecent } from '../lib/history.js'
import Qr from './Qr.jsx'
import { Copy, Check, Download } from './Icons.jsx'

export default function ShortenWidget() {
  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [withQr, setWithQr] = useState(true)
  const [expires, setExpires] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [recent, setRecent] = useState(() => getRecent())
  const [toast, setToast] = useState('')
  const [copied, setCopied] = useState(false)
  const inputRef = useRef(null)
  const qrRef = useRef(null)
  const toastTimer = useRef(null)

  const flash = (msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 1800)
  }

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const submit = async () => {
    if (loading) return
    setError('')
    if (!url.trim()) {
      inputRef.current?.focus()
      setError('Paste a URL to shorten.')
      return
    }
    setLoading(true)
    try {
      const data = await shorten({
        url: url.trim(),
        slug: slug.trim(),
        expiresInDays: expires ? 7 : undefined,
      })
      setResult({ ...data, withQr })
      setCopied(false)
      setRecent(addRecent(data))
    } catch (e) {
      setError(e.message || 'Could not shorten this link.')
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter') submit()
  }

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {}
    flash('Copied to clipboard')
  }

  const copyResult = async () => {
    await copy(result.shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const downloadQr = () => {
    const canvas = qrRef.current?.querySelector('canvas')
    if (!canvas) return
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = `${result.slug}-qr.png`
    a.click()
  }

  const clearHistory = () => {
    clearRecent()
    setRecent([])
  }

  return (
    <div id="shorten">
      <div className="shorten">
        <div className="shorten-row">
          <input
            ref={inputRef}
            className={`shorten-input ${error && !url.trim() ? 'err' : ''}`}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={onKey}
            placeholder="https://your-very-long-url.example.com/path?ref=…"
            spellCheck="false"
            autoComplete="off"
          />
          <button className="btn btn-primary" onClick={submit} disabled={loading}>
            {loading ? <span className="spin" /> : 'Shorten →'}
          </button>
        </div>
        <div className="opts">
          <span className="opt">
            snip.sh/
            <input
              className="slug-in"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              onKeyDown={onKey}
              placeholder="custom-slug"
              spellCheck="false"
              autoComplete="off"
            />
          </span>
          <label className="opt">
            <input type="checkbox" checked={withQr} onChange={(e) => setWithQr(e.target.checked)} /> QR code
          </label>
          <label className="opt">
            <input type="checkbox" checked={expires} onChange={(e) => setExpires(e.target.checked)} /> expires in 7d
          </label>
        </div>
      </div>

      {result ? (
        <div className="result">
          <div className="result-card">
            {result.withQr && (
              <div className="result-qr" ref={qrRef}>
                <Qr text={result.shortUrl} size={96} />
              </div>
            )}
            <div className="result-main">
              <div className="result-link">{result.shortUrl.replace(/^https?:\/\//, '')}</div>
              <div className="result-orig">→ {result.url}</div>
            </div>
            <div className="result-actions">
              <button className="mini-btn" onClick={copyResult}>
                {copied ? <Check /> : <Copy />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              {result.withQr && (
                <button className="mini-btn" onClick={downloadQr}>
                  <Download />
                  QR
                </button>
              )}
            </div>
          </div>
        </div>
      ) : error ? (
        <p className="err-msg">{error}</p>
      ) : (
        <p className="hint">↑ paste a link and hit Shorten — no signup, no tracking</p>
      )}

      {recent.length > 0 && (
        <div className="recent">
          <div className="recent-h">
            <span>Your recent links</span>
            <button onClick={clearHistory}>clear</button>
          </div>
          <div className="recent-list">
            {recent.map((l) => (
              <div className="recent-item" key={l.slug}>
                <a className="rl" href={l.shortUrl} target="_blank" rel="noreferrer">
                  /{l.slug}
                </a>
                <span className="ro">{l.url}</span>
                <button className="copy-x" onClick={() => copy(l.shortUrl)} aria-label="Copy short link">
                  <Copy />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {toast && (
        <div className="toast">
          <Check />
          {toast}
        </div>
      )}
    </div>
  )
}
