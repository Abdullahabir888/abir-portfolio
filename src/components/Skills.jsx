import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skillCategories } from '../data/skills'
import { SectionHeading, ease } from './ui'

export default function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id)
  const active = skillCategories.find((c) => c.id === activeId)
  const Icon = active.icon

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-72 max-w-3xl rounded-full bg-violet/10 blur-[120px]" />
      <div className="container-site relative">
        <SectionHeading
          eyebrow="02 · Skills"
          title="Tools of the trade"
          sub="QA is the core. Automation speeds it up. Dev skills help me dig deeper."
        />

        <div role="tablist" aria-label="Skill categories" className="mx-auto mb-10 flex max-w-4xl flex-wrap justify-center gap-2">
          {skillCategories.map((c) => {
            const I = c.icon
            const on = c.id === activeId
            return (
              <button
                key={c.id}
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={on}
                aria-controls="skills-panel"
                onClick={() => setActiveId(c.id)}
                className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  on ? 'text-white' : 'border border-line bg-surface/60 text-muted hover:text-ink'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="skill-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue to-violet"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <I size={16} className="relative" />
                <span className="relative">{c.label}</span>
              </button>
            )
          })}
        </div>

        <div id="skills-panel" role="tabpanel" aria-labelledby={`tab-${activeId}`} className="glass mx-auto max-w-5xl rounded-3xl p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease }}
            >
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue/20 to-violet/20 text-blue">
                    <Icon size={24} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold sm:text-2xl">{active.label}</h3>
                    <p className="text-sm text-muted">{active.blurb}</p>
                  </div>
                </div>
                <span className="chip self-start font-mono !text-blue sm:self-auto">{active.depth}</span>
              </div>

              <motion.ul
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}
              >
                {active.skills.map((s) => (
                  <motion.li
                    key={s}
                    variants={{ hidden: { opacity: 0, y: 14, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
                    whileHover={{ y: -3 }}
                    className="group flex items-center gap-3 rounded-2xl border border-line bg-bg/50 px-4 py-3.5 transition-colors hover:border-blue/50"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue to-violet transition-transform group-hover:scale-150" />
                    <span className="text-sm font-medium">{s}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
