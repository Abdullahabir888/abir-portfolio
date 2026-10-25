import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { about, profile } from '../data/profile'
import { Reveal, SectionHeading, item, stagger } from './ui'

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-site">
        <SectionHeading eyebrow="01 · About me" title="Quality first. Developer brain." />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5">
            {about.summary.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className={i === 0 ? 'font-display text-xl font-medium leading-snug sm:text-2xl' : 'text-base leading-relaxed text-muted sm:text-lg'}>
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="flex flex-wrap gap-2 pt-2">
              {['Telecom', 'Web', 'Mobile', 'REST APIs', 'Agile'].map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-6 sm:p-8">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold">What I bring</h3>
                <span className="font-mono text-xs text-muted">{profile.experience}</span>
              </div>
              <motion.ul
                className="grid gap-3 sm:grid-cols-2"
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
              >
                {about.highlights.map((h) => (
                  <motion.li key={h} variants={item} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-pass" />
                    <span>{h}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
