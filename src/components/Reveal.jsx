import { useEffect, useRef, useState } from 'react'

// Fades children up when they scroll into view.
export default function Reveal({ children, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
