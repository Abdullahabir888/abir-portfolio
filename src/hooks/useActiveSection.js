import { useEffect, useState } from 'react'

// Scroll-spy: returns the id of the section currently in view.
export function useActiveSection(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )
    els.forEach((el) => obs.observe(el))
    const onTop = () => window.scrollY < 200 && setActive('')
    window.addEventListener('scroll', onTop, { passive: true })
    return () => {
      obs.disconnect()
      window.removeEventListener('scroll', onTop)
    }
  }, [ids])

  return active
}
