import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

// Renders a real, scannable QR code of `text` onto a canvas.
export default function Qr({ text, size = 120 }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || !text) return
    QRCode.toCanvas(ref.current, text, {
      width: size,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#04130C', light: '#ffffff' },
    }).catch(() => {})
  }, [text, size])

  return <canvas ref={ref} width={size} height={size} aria-label={`QR code for ${text}`} />
}
