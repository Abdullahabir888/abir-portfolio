import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Trophy } from 'lucide-react'
import { experience } from '../data/experience'
import { Reveal, SectionHeading } from './ui'

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="container-site">
        <SectionHeading eyebrow="03 · Experience" title="Where I've tested" sub="From junior analyst to QA project lead in telecom." />

        <div ref={ref} className="relative mx-auto max-w-4xl">
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-line md:left-1/2" aria-hidden="true" />
          <motion.div
            style={{ height }}
            className="absolute left-[15px] top-0 w-px bg-gradient-to-b from-blue to-violet md:left-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-10 md:space-y-14">
            {experience.map((job, i) => {
              const right = i % 2 === 1
              return (
                <li key={`${job.company}-${job.period}`} className="relative md:grid md:grid-cols-2 md:gap-12">
                  <span
                    className={`absolute left-0 top-6 z-10 grid h-[31px] w-[31px] place-items-center rounded-full border-2 md:left-1/2 md:-translate-x-1/2 ${
                      job.current ? 'border-blue bg-blue/20 text-blue' : 'border-line bg-surface text-muted'
                    }`}
                  >
                    <Briefcase size={13} />
                  </span>

                  <div className={`hidden md:block ${right ? 'md:order-2' : ''}`}>
                    <Reveal className={`pt-6 ${right ? 'text-left' : 'text-right'}`}>
                      <span className="font-mono text-sm text-blue">{job.period}</span>
                    </Reveal>
                  </div>

                  <Reveal className={`pl-12 md:pl-0 ${right ? 'md:order-1' : ''}`} y={30}>
                    <motion.article
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                      className="glass rounded-2xl p-6 transition-colors hover:border-blue/40"
                    >
                      <span className="mb-2 block font-mono text-xs text-blue md:hidden">{job.period}</span>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        {job.current && <span className="rounded-full bg-pass/15 px-2 py-0.5 text-[11px] font-semibold text-pass">Current</span>}
                      </div>
                      <p className="text-sm font-medium text-ink/80">{job.company}</p>
                      {job.note && <p className="text-xs text-muted">{job.note}</p>}

                      <ul className="mt-4 space-y-2 text-sm text-muted">
                        {job.responsibilities.map((r) => (
                          <li key={r} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>

                      {job.achievements.length > 0 && (
                        <ul className="mt-4 space-y-1.5 rounded-xl border border-pass/20 bg-pass/5 p-3 text-sm">
                          {job.achievements.map((a) => (
                            <li key={a} className="flex items-start gap-2">
                              <Trophy size={14} className="mt-0.5 shrink-0 text-pass" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {job.tools.map((t) => (
                          <span key={t} className="chip !py-0.5 font-mono !text-[11px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.article>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
