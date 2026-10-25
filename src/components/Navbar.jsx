import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import Logo from './Logo'
import { navLinks, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { ease } from './ui'

const ids = navLinks.map((l) => l.id)

export default function Navbar({ theme, onToggleTheme }) {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line/60 bg-bg/75 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="container-site flex h-16 items-center justify-between" aria-label="Main">
        <a href="#top" aria-label={`${profile.shortName} — home`}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  active === l.id ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
                aria-current={active === l.id ? 'true' : undefined}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-blue to-violet"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 text-muted transition-colors hover:text-ink"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a href="#contact" className="btn-primary hidden !py-2 sm:inline-flex">
            Hire me
          </a>
          <button
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>
    </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col border-l border-line bg-surface p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="label-mono">Menu</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full border border-line">
                  <X size={18} />
                </button>
              </div>
              <motion.ul
                className="flex flex-col gap-1"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
              >
                {navLinks.map((l, i) => (
                  <motion.li key={l.id} variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}>
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-baseline gap-3 rounded-xl px-3 py-3 font-display text-2xl font-semibold ${
                        active === l.id ? 'text-ink' : 'text-muted'
                      }`}
                    >
                      <span className="font-mono text-xs text-blue">0{i + 1}</span>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <a href={profile.resume} download className="btn-primary mt-auto">
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
