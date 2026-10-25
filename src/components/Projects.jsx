import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, X } from 'lucide-react'
import { projectFilters, projects } from '../data/projects'
import { GitHubIcon, SectionHeading, ease } from './ui'

function ProjectVisual({ project, large = false }) {
  const Icon = project.icon
  const [a, b] = project.accent
  if (project.image) {
    return <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" className="h-full w-full object-cover" />
  }
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: `linear-gradient(135deg, ${a}33, ${b}40)` }}>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(${a}55 1px, transparent 1px)`,
          backgroundSize: '18px 18px',
        }}
      />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl" style={{ background: `${b}66` }} />
      <div className="absolute -bottom-12 -left-6 h-40 w-40 rounded-full blur-3xl" style={{ background: `${a}55` }} />
      <div className="absolute inset-0 grid place-items-center">
        <div
          className={`grid place-items-center rounded-2xl text-white shadow-2xl ${large ? 'h-24 w-24' : 'h-16 w-16'}`}
          style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
        >
          <Icon size={large ? 44 : 30} strokeWidth={1.75} />
        </div>
      </div>
      <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-widest text-ink/60">
        {project.categories.map((c) => projectFilters.find((f) => f.id === c)?.label).join(' · ')}
      </span>
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [onClose])

  return (
    <motion.div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        layoutId={`card-${project.id}`}
        className="relative flex max-h-[92svh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-line bg-surface sm:rounded-3xl"
        transition={{ duration: 0.45, ease }}
      >
        <motion.div layoutId={`visual-${project.id}`} className="h-44 shrink-0 sm:h-56">
          <ProjectVisual project={project} large />
        </motion.div>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60"
        >
          <X size={18} />
        </button>

        <motion.div
          className="overflow-y-auto p-6 sm:p-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <h3 id="project-title" className="text-2xl font-bold sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1 text-blue">{project.tagline}</p>
          <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

          <h4 className="label-mono mt-6">What's inside</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {project.details.map((d) => (
              <li key={d} className="flex gap-2.5">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue to-violet" />
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <h4 className="label-mono mt-6">My role</h4>
          <p className="mt-2 text-sm">{project.role}</p>

          <h4 className="label-mono mt-6">Tech</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="chip font-mono">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.github ? (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-ghost">
                <GitHubIcon className="h-4 w-4" /> Source code
              </a>
            ) : (
              <span className="chip">Source: private / coming soon</span>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary">
                Live demo <ExternalLink size={15} />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)
  const shown = projects.filter((p) => filter === 'all' || p.categories.includes(filter))
  const open = projects.find((p) => p.id === openId)

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container-site">
        <SectionHeading eyebrow="05 · Projects" title="Things I've tested and built" sub="Click any card for the full story." />

        <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
          {projectFilters.map((f) => {
            const on = filter === f.id
            const count = f.id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(f.id)).length
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={on}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  on ? 'text-white' : 'border border-line bg-surface/60 text-muted hover:text-ink'
                }`}
              >
                {on && (
                  <motion.span layoutId="project-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-blue to-violet" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                )}
                <span className="relative">
                  {f.label} <span className={`font-mono text-xs ${on ? 'text-white/70' : 'text-muted/70'}`}>{count}</span>
                </span>
              </button>
            )
          })}
        </div>

        <LayoutGroup>
          <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((p, i) => (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease, delay: i * 0.05 } }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                >
                  <motion.article
                    layoutId={`card-${p.id}`}
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors hover:border-blue/50"
                  >
                    <motion.div layoutId={`visual-${p.id}`} className="relative h-44 overflow-hidden">
                      <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                        <ProjectVisual project={p} />
                      </div>
                      {p.draft && (
                        <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                          Details coming soon
                        </span>
                      )}
                    </motion.div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-semibold">{p.title}</h3>
                      <p className="mt-1 text-sm text-muted">{p.tagline}</p>
                      <p className="mt-3 text-xs text-muted">
                        <span className="font-semibold text-ink/80">Role: </span>
                        {p.role}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tech.slice(0, 4).map((t) => (
                          <span key={t} className="chip !py-0.5 font-mono !text-[11px]">
                            {t}
                          </span>
                        ))}
                        {p.tech.length > 4 && <span className="chip !py-0.5 font-mono !text-[11px]">+{p.tech.length - 4}</span>}
                      </div>
                      <div className="mt-auto flex items-center gap-2 pt-6">
                        <button onClick={() => setOpenId(p.id)} className="btn-primary !px-4 !py-2">
                          View Details <ArrowUpRight size={15} />
                        </button>
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted hover:text-ink" aria-label={`${p.title} on GitHub`}>
                            <GitHubIcon className="h-4 w-4" />
                          </a>
                        )}
                        {p.live && (
                          <a href={p.live} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted hover:text-ink" aria-label={`${p.title} live demo`}>
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          <AnimatePresence>{open && <ProjectModal key={open.id} project={open} onClose={() => setOpenId(null)} />}</AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  )
}
