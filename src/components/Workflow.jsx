import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'
import { workflow, workflowNote } from '../data/workflow'
import { Reveal, SectionHeading, ease } from './ui'

export default function Workflow() {
  const [active, setActive] = useState(0)
  const step = workflow[active]
  const ActiveIcon = step.icon

  return (
    <section id="workflow" className="relative py-24 md:py-32">
      <div className="container-site">
        <SectionHeading eyebrow="06 · How I work" title="My QA workflow" sub="Eight steps from spec to release. Tap a step." />

        {/* Steps */}
        <div className="relative">
          {/* connector line — horizontal on desktop */}
          <div className="absolute left-[6%] right-[6%] top-7 hidden h-px bg-line lg:block" aria-hidden="true" />
          <motion.div
            aria-hidden="true"
            className="absolute left-[6%] top-7 hidden h-px origin-left bg-gradient-to-r from-blue to-violet lg:block"
            style={{ right: '6%' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.6, ease }}
          />

          <motion.ol
            className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8 lg:gap-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            {workflow.map((s, i) => {
              const Icon = s.icon
              const on = i === active
              return (
                <motion.li key={s.title} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}>
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-pressed={on}
                    className="group flex w-full flex-col items-center gap-3 rounded-2xl p-3 text-center"
                  >
                    <span
                      className={`relative grid h-14 w-14 place-items-center rounded-2xl border transition-all duration-300 ${
                        on ? 'scale-110 border-transparent bg-gradient-to-br from-blue to-violet text-white shadow-lg shadow-violet/30' : 'border-line bg-surface text-muted group-hover:text-ink'
                      }`}
                    >
                      <Icon size={22} />
                      <span className={`absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full font-mono text-[10px] ${on ? 'bg-bg text-ink' : 'bg-raised text-muted'}`}>
                        {i + 1}
                      </span>
                    </span>
                    <span className={`text-xs font-medium leading-tight sm:text-[13px] ${on ? 'text-ink' : 'text-muted'}`}>{s.title}</span>
                  </button>
                </motion.li>
              )
            })}
          </motion.ol>
        </div>

        {/* Detail */}
        <div className="mx-auto mt-8 max-w-2xl">
          <div className="glass relative min-h-[120px] overflow-hidden rounded-2xl p-6" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease }}
                className="flex items-start gap-4"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue/15 text-blue">
                  <ActiveIcon size={20} />
                </span>
                <div>
                  <p className="font-mono text-xs text-muted">
                    Step {String(active + 1).padStart(2, '0')} / {String(workflow.length).padStart(2, '0')}
                  </p>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1 text-muted">{step.text}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Reveal className="mx-auto mt-10 flex max-w-3xl items-start gap-4 rounded-2xl border border-violet/30 bg-violet/5 p-6">
          <Lightbulb className="mt-0.5 shrink-0 text-violet" size={22} />
          <p className="leading-relaxed">
            <span className="font-semibold">Why the dev skills matter: </span>
            <span className="text-muted">{workflowNote}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
