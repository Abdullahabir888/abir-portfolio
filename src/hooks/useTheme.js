import { useCallback, useEffect, useState } from 'react'

// Dark by default. Remembers the visitor's choice.
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined' && !document.documentElement.classList.contains('dark') ? 'light' : 'dark',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0B0D1A' : '#F6F7FB')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage blocked — fine */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, toggle }
}
